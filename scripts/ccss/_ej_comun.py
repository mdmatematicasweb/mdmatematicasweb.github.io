"""Utilidades comunes de los verificadores de ejercicios (scripts/ccss/verificar_ej_NN.py).

Un verificador resuelve cada ejercicio con sympy, de forma independiente del texto, y comprueba tres cosas sobre el .qmd:

1. Estructura: 25 ejercicios numerados, 9 básicos y 16 tipo PAU, con la mitad aproximadamente «competenciales»,
   y la puntuación de los apartados suma la total del ejercicio (en cada opción, si la hay).
2. Datos: los datos que usó sympy (matrices, parámetros) aparecen en el enunciado.
3. Respuestas: cada resultado final calculado por sympy aparece en la solución escrita del ejercicio.

Las comparaciones de texto se hacen sobre una forma normalizada (sin espacios, \\dfrac y \\tfrac como \\frac, coma decimal
con o sin llaves, signo menos Unicode como «-»).
"""
import re
import sys
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

try:
    from sympy import Rational, Integer, Matrix, S, sympify
except ImportError:
    sys.exit("Falta sympy: pip install sympy")


# ---------- formato de números y matrices (misma convención que el texto de los .qmd) ----------
def tx(v):
    """Número sympy como en el texto: entero, o \\frac{p}{q} con el signo delante."""
    v = sympify(v)
    if v.is_Integer:
        return str(int(v))
    if v.is_Rational:
        p, q = v.p, v.q
        return ("-" if p < 0 else "") + f"\\frac{{{abs(p)}}}{{{q}}}"
    raise ValueError(f"tx solo admite racionales, no {v!r}")


def dec(v, nd=2):
    """Decimal con coma y nd cifras, redondeo de alumno (mitades hacia arriba): 3.456 -> 3{,}46."""
    d = Decimal(str(sympify(v).evalf(30))).quantize(Decimal(1).scaleb(-nd), rounding=ROUND_HALF_UP)
    return str(d).replace(".", "{,}")


def mat(M):
    """Matriz como \\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}."""
    M = Matrix(M)
    filas = ["&".join(tx(M[i, j]) for j in range(M.cols)) for i in range(M.rows)]
    return "\\begin{pmatrix}" + "\\\\".join(filas) + "\\end{pmatrix}"


def igual(nombre, valor):
    """Fragmento «nombre=valor» con valor racional."""
    return f"{nombre}={tx(valor)}"


# ---------- normalización ----------
def norm(s):
    s = s.replace("−", "-").replace("−", "-")
    s = s.replace("\\dfrac", "\\frac").replace("\\tfrac", "\\frac")
    for t in ("\\displaystyle", "\\left", "\\right", "\\,", "\\;", "\\!", "\\ ", "\\quad", "\\qquad"):
        s = s.replace(t, "")
    s = s.replace("{,}", ",")
    return re.sub(r"[\s$]+", "", s)


# ---------- lectura del .qmd ----------
class Relacion:
    def __init__(self, ruta):
        self.ruta = Path(ruta)
        self.texto = self.ruta.read_text()
        cuerpo, _, soluciones = self.texto.partition("\n## Soluciones")
        if not soluciones:
            fallo("no hay sección «## Soluciones»")
        self.enunciados = self._partir(cuerpo)
        self.soluciones = self._soluciones(soluciones)

    @staticmethod
    def _partir(cuerpo):
        trozos = {}
        partes = re.split(r"^\*\*(\d+)\.\*\*", cuerpo, flags=re.M)
        for i in range(1, len(partes), 2):
            trozos[int(partes[i])] = partes[i + 1].split("\n## ")[0].strip()
        return trozos

    @staticmethod
    def _soluciones(texto):
        sol = {}
        for m in re.finditer(r"^::: \{\.callout-note collapse=\"true\"\}\n## (\d+)\n(.*?)\n:::\s*$", texto, flags=re.M | re.S):
            sol[int(m.group(1))] = m.group(2)
        return sol


def fallo(msg):
    print("FALLA:", msg, file=sys.stderr)
    sys.exit(1)


class Verificador:
    def __init__(self, ruta_qmd):
        self.rel = Relacion(ruta_qmd)
        self.n = 0
        self.fallos = []

    def ok(self, cond, msg):
        """Cuenta una comprobación; si falla, la anota (se muestran todas al final y se sale con código 1)."""
        if cond:
            self.n += 1
        else:
            self.fallos.append(msg)

    # --- estructura ---
    def estructura(self, n_basicos=9, n_pau=16, comp=(6, 10)):
        r = self.rel
        total = n_basicos + n_pau
        self.ok(sorted(r.enunciados) == list(range(1, total + 1)), f"los enunciados deben ser 1..{total}, hay {sorted(r.enunciados)}")
        self.ok(sorted(r.soluciones) == list(range(1, total + 1)), f"las soluciones deben ser 1..{total}, hay {sorted(r.soluciones)}")
        pau = [k for k, t in r.enunciados.items() if t.startswith("*(Tipo PAU")]
        self.ok(pau == list(range(n_basicos + 1, total + 1)), f"los ejercicios {n_basicos + 1}..{total} deben ser tipo PAU y los demás básicos; son PAU: {pau}")
        ncomp = sum(1 for k in pau if "competencial" in r.enunciados[k].split("\n")[0])
        self.ok(comp[0] <= ncomp <= comp[1], f"competenciales: {ncomp}, esperado entre {comp[0]} y {comp[1]}")
        self.competenciales = ncomp
        for k in pau:
            cab = re.match(r"\*\(Tipo PAU · (\d+(?:,\d+)?) puntos?", r.enunciados[k])
            self.ok(cab is not None, f"ej. {k}: falta «Tipo PAU · N puntos» en la cabecera")
            total_pts = float(cab.group(1).replace(",", "."))
            texto = r.enunciados[k]
            partes = re.split(r"\*\*Opción [AB]\.\*\*", texto)
            bloques = partes[1:] if len(partes) > 1 else [texto.split("\n", 1)[1] if "\n" in texto else ""]
            for b in bloques:
                pts = [float(x.replace(",", ".")) for x in re.findall(r"\((\d+(?:,\d+)?) puntos?\)", b)]
                self.ok(abs(sum(pts) - total_pts) < 1e-9 and len(pts) >= 2, f"ej. {k}: los apartados suman {sum(pts)} y la cabecera dice {total_pts}")
        for k in range(1, n_basicos + 1):
            self.ok(not r.enunciados[k].startswith("*(Tipo PAU"), f"ej. {k} debe ser básico")
        if self.fallos:   # sin una estructura correcta no tiene sentido seguir
            self.fin()

    # --- datos y respuestas ---
    def enunciado(self, k, fragmentos):
        t = norm(self.rel.enunciados[k])
        for f in fragmentos:
            self.ok(norm(f) in t, f"ej. {k}: el enunciado no contiene el dato {f!r}")

    def solucion(self, k, fragmentos):
        """Cada fragmento debe aparecer en la solución k.

        Un fragmento «etiqueta=valor» (un solo signo =) puede aparecer dentro de una cadena de igualdades de la misma
        fórmula, como «|A|=2\\cdot3-5\\cdot1=1»; el valor debe ser exactamente el calculado y no continuar con más cifras.
        El resto de fragmentos (matrices, fórmulas con varios =) deben aparecer tal cual.
        """
        texto = self.rel.soluciones[k]
        plano = norm(texto)
        segmentos = [norm(x) for x in texto.split("$") if x.strip()]
        for f in fragmentos:
            nf = norm(f)
            if "\\approx" in nf and nf.count("=") == 0 and nf.count("\\approx") == 1 and not nf.startswith("\\approx"):
                etiqueta, valor = nf.split("\\approx")
                patron = re.compile(re.escape(etiqueta) + r"(?:=[^=]*?)*" + re.escape("\\approx") + re.escape(valor) + r"(?![0-9.{^_]|\\frac)")
                hallado = any(patron.search(seg) for seg in segmentos)
            elif nf.count("=") == 1:
                etiqueta, valor = nf.split("=")
                patron = re.compile(re.escape(etiqueta) + r"(?:=[^=]*?)*=" + re.escape(valor) + r"(?![0-9.{^_]|\\frac)")
                hallado = any(patron.search(seg) for seg in segmentos)
            else:
                hallado = nf in plano
            self.ok(hallado, f"ej. {k}: la solución escrita no contiene el resultado calculado {f!r}")

    def fin(self):
        if self.fallos:
            for f in self.fallos:
                print("FALLA:", f, file=sys.stderr)
            print(f"{len(self.fallos)} comprobaciones fallidas ({self.n} superadas)", file=sys.stderr)
            sys.exit(1)
        print(f"OK: {self.n} comprobaciones superadas ({self.competenciales} ejercicios competenciales)")
