#!/usr/bin/env python3
"""Prueba de mutación de las relaciones de ejercicios de 3º ESO.

Para cada ejercicio y cada resultado esperado, cambia una cifra de ese resultado dentro de la solución y comprueba que el verificador
lo detecta (sale con error). Si una mutación pasa desapercibida, la verificación de ese apartado no sirve.

Uso:  python scripts/eso3/prueba_mutacion_ej.py [temas separados por comas, p. ej. 01,05]
"""
import contextlib
import copy
import io
import re
import runpy
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import _ej  # noqa: E402

AQUI = Path(__file__).resolve().parent
sel = sys.argv[1].split(",") if len(sys.argv) > 1 else [f"{i:02d}" for i in range(1, 15)]
capturado = {}


def captura(self):
    capturado["tema"] = self


_ej.Tema.cerrar = captura
tot = fallos = 0
for t in sel:
    capturado.clear()
    with contextlib.redirect_stdout(io.StringIO()):
        runpy.run_path(str(AQUI / f"ej_{t}.py"), run_name="__main__")
    T = capturado["tema"]
    T.verificar()                                   # sin mutar, debe pasar
    for k, it in enumerate(T.items, 1):
        for e in it["esp"]:
            pos = it["sol"].find(e)
            m = re.search(r"\d", e)
            if pos < 0 or not m:
                continue
            d = int(m.group())
            mut = e[:m.start()] + str((d + 5) % 10) + e[m.end():]
            T2 = copy.copy(T)
            T2.items = copy.deepcopy(T.items)
            T2.errores = []
            T2.items[k - 1]["sol"] = it["sol"].replace(e, mut, 1)
            tot += 1
            try:
                with contextlib.redirect_stderr(io.StringIO()):
                    T2.verificar()
                fallos += 1
                print(f"tema {t} ejercicio {k}: la mutación de «{e}» no se detecta")
            except SystemExit:
                pass
print(f"mutaciones: {tot}; sin detectar: {fallos}")
sys.exit(1 if fallos else 0)
