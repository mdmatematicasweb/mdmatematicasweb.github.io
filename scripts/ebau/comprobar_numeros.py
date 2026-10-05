#!/usr/bin/env python3
"""Red de seguridad de la reescritura de soluciones (fase B): ningún número de la solución antigua puede faltar en la nueva.

Uso:  python3 scripts/ebau/comprobar_numeros.py AAAA [referencia-git]     (por defecto HEAD)

Compara, ejercicio a ejercicio, el conjunto de números (enteros y decimales, con coma o punto) de
scripts/ebau/soluciones/AAAA-*.md en el árbol de trabajo con el de la referencia git. Si falta alguno, sale con código 1.
Reescribir con más pasos añade números, pero no debe perder ninguno: si cambia un resultado, hay que justificarlo a mano.
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SOLS = ROOT / "scripts" / "ebau" / "soluciones"


def bloques(txt):
    return {h.split("\n")[0].strip(): h for h in re.split(r"^@@ ", txt, flags=re.M)[1:]}


def numeros(txt):
    txt = re.sub(r"!\[.*?\]\(.*?\)(\{.*?\})?", "", txt)  # figuras
    return set(re.findall(r"\d+(?:[.,]\d+)?", txt.replace("{,}", ",").replace("\\,", "")))


def main():
    year = sys.argv[1]
    ref = sys.argv[2] if len(sys.argv) > 2 else "HEAD"
    fallos = 0
    for f in sorted(SOLS.glob(f"{year}-*.md")):
        antiguo = subprocess.run(["git", "show", f"{ref}:scripts/ebau/soluciones/{f.name}"], cwd=ROOT, capture_output=True, text=True)
        if antiguo.returncode:
            print(f"{f.name}: no está en {ref}")
            continue
        old, new = bloques(antiguo.stdout), bloques(f.read_text())
        for n, b in old.items():
            if n not in new:
                print(f"FALLA {f.name} ej. {n}: ha desaparecido")
                fallos += 1
                continue
            falta = numeros(b) - numeros(new[n])
            if falta:
                print(f"FALLA {f.name} ej. {n}: faltan los números {sorted(falta)}")
                fallos += 1
        for n in new.keys() - old.keys():
            print(f"FALLA {f.name} ej. {n}: ejercicio nuevo")
            fallos += 1
    print("OK" if not fallos else f"{fallos} fallos", year)
    sys.exit(1 if fallos else 0)


main()
