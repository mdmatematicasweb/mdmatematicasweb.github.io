#!/usr/bin/env python3
"""Prueba de mutación de extremo a extremo de los verificadores de ejercicios.

Para cada tema: copia scripts/ccss y el .qmd a un directorio temporal, obtiene los resultados que comprueba el verificador
(CCSS_VOLCADO), y para una muestra de ellos cambia UNA sola aparición (un dígito) dentro de su apartado de la solución
escrita; el verificador debe terminar con código 1. Solo se usan resultados que aparecen literalmente en el .qmd.

Uso:  python scripts/ccss/prueba_mutacion_ej.py [muestra_por_tema [temas]]   (muestra por defecto 25, 0 = todos; temas: «01,02»)
Termina con código 1 si alguna mutación no hace fallar al verificador.
"""
import json
import os
import random
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parents[1]
TEMAS = {"01": "01-matrices-determinantes", "02": "02-sistemas-ecuaciones-lineales", "03": "03-programacion-lineal", "04": "04-funciones",
         "05": "05-limites-continuidad", "06": "06-derivadas", "07": "07-aplicaciones-derivada", "08": "08-integrales",
         "09": "09-probabilidad", "10": "10-distribuciones", "11": "11-muestreo-inferencia"}
sys.path.insert(0, str(AQUI))
from _ej_comun import Relacion  # noqa: E402


def correr(raiz, nn, volcado=None):
    env = dict(os.environ, **({"CCSS_VOLCADO": str(volcado)} if volcado else {}))
    return subprocess.run([sys.executable, str(raiz / "scripts" / "ccss" / f"verificar_ej_{nn}.py")], capture_output=True, text=True, env=env)


def mutar_literal(bloque, frag, i):
    """Cambia un dígito de la aparición número i de frag dentro del bloque (se ignoran las que son prefijo de un número
    más largo, como «x=4» dentro de «x=48»); None si no hay."""
    pos, vistas = -1, 0
    while True:
        pos = bloque.find(frag, pos + 1)
        if pos < 0:
            return None
        sig = bloque[pos + len(frag):pos + len(frag) + 1]
        if sig.isdigit() or sig in ("{", "^", "_"):
            continue
        if vistas == i:
            break
        vistas += 1
    for j in range(pos, pos + len(frag)):
        if bloque[j].isdigit():
            return bloque[:j] + str((int(bloque[j]) + 1) % 10) + bloque[j + 1:]
    return None


def main():
    muestra = int(sys.argv[1]) if len(sys.argv) > 1 else 25
    azar = random.Random(2024)
    malos = total = 0
    sel = sys.argv[2].split(",") if len(sys.argv) > 2 else list(TEMAS)
    for nn, tema in TEMAS.items():
        if nn not in sel:
            continue
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp)
            shutil.copytree(AQUI, tmp / "scripts" / "ccss", ignore=shutil.ignore_patterns("__pycache__"))
            qmd = tmp / "ejercicios" / "2-bachillerato-ccss" / tema / "index.qmd"
            qmd.parent.mkdir(parents=True)
            shutil.copy(RAIZ / "ejercicios" / "2-bachillerato-ccss" / tema / "index.qmd", qmd)
            original = qmd.read_text()
            volcado = tmp / "claims.json"
            r = correr(tmp, nn, volcado)
            if r.returncode != 0:
                print(f"tema {nn}: el verificador ya falla sin mutar:\n{r.stderr}")
                return 1
            rel = Relacion(qmd)
            candidatos = []
            for k, ap, frag, n in json.loads(volcado.read_text()):
                bloque = rel.ap_soluciones[k][ap]
                if frag in bloque and any(ch.isdigit() for ch in frag):
                    candidatos += [(k, ap, frag, i, bloque) for i in range(n)]
            azar.shuffle(candidatos)
            for k, ap, frag, i, bloque in (candidatos if muestra == 0 else candidatos[:muestra]):
                nuevo = mutar_literal(bloque, frag, i)
                if nuevo is None or original.count(bloque) != 1:
                    continue
                qmd.write_text(original.replace(bloque, nuevo))
                r = correr(tmp, nn)
                total += 1
                if r.returncode != 1:
                    malos += 1
                    print(f"NO DETECTADA: tema {nn}, ej. {k}, apartado {ap or '(único)'}, {frag!r}, aparición {i + 1}")
            qmd.write_text(original)
    print(f"{total - malos}/{total} mutaciones de una sola aparición detectadas" + ("" if not malos else f"; {malos} sin detectar"))
    return 1 if malos else 0


if __name__ == "__main__":
    sys.exit(main())
