"""Utilidades de los verificadores de las soluciones PAU CCSS (scripts/ebau-ccss/verificar_AAAA.py).

Cada verificador resuelve con sympy (sin mirar el texto) los ejercicios de un año y comprueba:
1. Datos: los datos usados aparecen en el enunciado transcrito (data/<slug>.md).
2. Resultados: cada resultado calculado aparece, con la misma lógica de «cadena de igualdades coherente» que
   scripts/ccss/_ej_comun.py, dentro de la solución escrita del ejercicio (soluciones/<slug>.md).
3. Cobertura: todos los ejercicios del examen tienen solución y al menos un resultado comprobado.
4. Mutación: cambiar una aparición de un resultado esperado hace fallar la comprobación.
No se relaja el verificador para que pase: si falla, se arregla el contenido.
"""
import os
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / "ccss"))
from _ej_comun import norm, contar, mutar, tx, dec, mat  # noqa: E402,F401

try:
    from sympy import Rational as R, Integer, Matrix, S, sympify  # noqa: E402,F401
except ImportError:
    sys.exit("Falta sympy: pip install sympy")


def vertices(cons):
    """Vértices de una región {a x + b y (>=|<=) c}; cons = [(a, b, c, '>=' | '<='), ...]. Devuelve los puntos factibles ordenados."""
    import itertools
    from sympy import solve, symbols
    x, y = symbols("x y")

    def ok(p):
        return all((A * p[0] + B * p[1] >= C if t == ">=" else A * p[0] + B * p[1] <= C) for A, B, C, t in cons)
    out = set()
    for (a1, b1, c1, _), (a2, b2, c2, _) in itertools.combinations(cons, 2):
        s = solve([a1 * x + b1 * y - c1, a2 * x + b2 * y - c2], [x, y], dict=True)
        if s and ok((s[0][x], s[0][y])):
            out.add((s[0][x], s[0][y]))
    return sorted(out)


def sin_negrita(texto):
    """Quita los \\mathbf{…} (con llaves equilibradas) para que no rompan las cadenas de igualdades."""
    while True:
        i = texto.find("\\mathbf{")
        if i < 0:
            return texto
        j, nivel = i + len("\\mathbf{"), 1
        while nivel:
            nivel += {"{": 1, "}": -1}.get(texto[j], 0)
            j += 1
        texto = texto[:i] + texto[i + len("\\mathbf{"):j - 1] + texto[j:]


def bloques(texto):
    """Divide un fichero de datos o de soluciones en {n: texto} por las líneas «@@ n …»."""
    m = re.match(r"---\n.*?\n---\n(.*)", texto, re.S)
    if m:
        texto = m.group(1)
    out = {}
    for blk in re.split(r"^@@ ", texto, flags=re.M)[1:]:
        head, _, body = blk.partition("\n")
        out[head.split("|")[0].strip()] = sin_negrita(body.strip())
    return out


class Verificador:
    def __init__(self, año):
        self.año = año
        self.fallos, self.n, self.mutaciones = [], 0, 0
        self.registro = []
        self.examenes = {}
        self.cubiertos = {}

    def ok(self, cond, msg):
        if cond:
            self.n += 1
        else:
            self.fallos.append(msg)

    def examen(self, slug):
        e = self.examenes.get(slug)
        if e is None:
            data = bloques((HERE / "data" / f"{slug}.md").read_text())
            sol = bloques((HERE / "soluciones" / f"{slug}.md").read_text())
            e = self.examenes[slug] = {"data": data, "sol": sol, "cub": set()}
            self.ok(set(data) == set(sol), f"{slug}: ejercicios con enunciado {sorted(data)} distintos de los que tienen solución {sorted(sol)}")
        return e

    def enunciado(self, slug, n, fragmentos):
        t = norm(self.examen(slug)["data"][n])
        for f in fragmentos:
            self.ok(norm(f) in t, f"{slug} ej. {n}: el enunciado no contiene el dato {f!r}")

    def solucion(self, slug, n, *fragmentos):
        """Cada fragmento esperado debe aparecer al menos una vez en la solución del ejercicio n."""
        e = self.examen(slug)
        if n not in e["sol"]:
            self.ok(False, f"{slug} ej. {n}: sin solución")
            return
        e["cub"].add(n)
        texto = e["sol"][n]
        segmentos = [norm(x) for x in texto.split("$") if x.strip()]
        plano = norm(texto)
        for f in fragmentos:
            self.registro.append((slug, n, f, segmentos, plano))
            hay = contar(norm(f), segmentos, plano)
            self.ok(hay >= 1, f"{slug} ej. {n}: el resultado calculado {f!r} no aparece en la solución")

    def mutacion(self):
        for slug, n, f, segmentos, plano in self.registro:
            nf = norm(f)
            hay = contar(nf, segmentos, plano)
            if hay < 1:
                continue
            for i in range(hay):
                seg2, plano2 = mutar(nf, segmentos, plano, i)
                self.ok(contar(nf, seg2, plano2) < hay, f"mutación no detectada: {slug} ej. {n}, {f!r}, aparición {i + 1}")
                self.mutaciones += 1

    def fin(self):
        for slug, e in self.examenes.items():
            falta = set(e["data"]) - e["cub"]
            self.ok(not falta, f"{slug}: ejercicios sin ningún resultado comprobado: {sorted(falta)}")
        self.mutacion()
        if self.fallos:
            for f in self.fallos:
                print("FALLA:", f, file=sys.stderr)
            print(f"{len(self.fallos)} comprobaciones fallidas ({self.n} superadas)", file=sys.stderr)
            sys.exit(1)
        print(f"OK {self.año}: {self.n} comprobaciones superadas en {len(self.examenes)} exámenes, {self.mutaciones} mutaciones detectadas")
