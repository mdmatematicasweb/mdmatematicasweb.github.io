"""Utilidades comunes de los verificadores de ejercicios (scripts/ccss/verificar_ej_NN.py).

Un verificador resuelve cada ejercicio con sympy, de forma independiente del texto, y comprueba tres cosas sobre el .qmd:

1. Estructura: 25 ejercicios numerados, 9 básicos y 16 tipo PAU, con la mitad aproximadamente «competenciales»,
   y la puntuación de los apartados suma la total del ejercicio (en cada opción, si la hay).
2. Datos: los datos que usó sympy (matrices, parámetros) aparecen en el enunciado.
3. Respuestas: cada resultado final calculado por sympy aparece en la solución escrita del ejercicio.

Las comparaciones de texto se hacen sobre una forma normalizada (sin espacios, \\dfrac y \\tfrac como \\frac, coma decimal
con o sin llaves, signo menos Unicode como «-»).
"""
import json
import os
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


def matl(M):
    """Matriz con entradas simbólicas (sympy.latex), p. ej. \\begin{pmatrix}1&0\\\\3n+3&1\\end{pmatrix}."""
    from sympy import latex
    M = Matrix(M)
    filas = ["&".join(latex(M[i, j]) for j in range(M.cols)) for i in range(M.rows)]
    return "\\begin{pmatrix}" + "\\\\".join(filas) + "\\end{pmatrix}"


def ec(coefs, rhs, var="xyz"):
    """Ecuación lineal como en el texto: [1, 3, 5], 200 -> «x+3y+5z=200» (coeficiente 1 implícito, signos al escribir)."""
    t = ""
    for c_, v_ in zip(coefs, var):
        c_ = sympify(c_)
        if c_ == 0:
            continue
        signo = "-" if c_ < 0 else ("+" if t else "")
        mod = abs(c_)
        t += signo + ("" if mod == 1 else tx(mod)) + v_
    return f"{t}={tx(rhs)}"


def ampliada(M, b):
    """Matriz ampliada como \\begin{array}{ccc|c}…\\end{array} (sin los paréntesis exteriores)."""
    M, b = Matrix(M), Matrix(b)
    filas = ["&".join([tx(M[i, j]) for j in range(M.cols)] + [tx(b[i])]) for i in range(M.rows)]
    return "\\begin{array}{" + "c" * M.cols + "|c}" + "\\\\".join(filas) + "\\end{array}"


def igual(nombre, valor):
    """Fragmento «nombre=valor» con valor racional."""
    return f"{nombre}={tx(valor)}"


# ---------- normalización ----------
def norm(s):
    s = s.replace("−", "-").replace("−", "-")
    s = s.replace("\\dfrac", "\\frac").replace("\\tfrac", "\\frac")
    for t in ("\\displaystyle", "\\left", "\\right", "\\,", "\\;", "\\!", "\\ ", "\\quad", "\\qquad"):
        s = s.replace(t, "")
    s = s.replace("{,}", "٫")   # coma decimal (distinta de la coma que separa elementos de una lista)
    return re.sub(r"[\s$]+", "", s)


# Tras el valor de un resultado «etiqueta=valor» debe terminar la expresión: fin del trozo $…$, otra igualdad o desigualdad,
# puntuación, un cierre, o un texto. Así «|B|=2» no se da por bueno dentro de «|B|=2\\cdot1-1\\cdot0=3».
_FIN = (r"(?=$|=|,(?![0-9])|;|\.(?![0-9])|<|>|\)|\}|&|\\\\|%|€"
        r"|\\(?:neq|ne|leq|le|geq|ge|lt|gt|approx|text|quad|Rightarrow|Longrightarrow|implies|mid|end|Leftrightarrow|land|wedge|lor|vee|mathrm|operatorname\{u\})"
        r"|\\(?:in|to)(?![a-zA-Z]))")


# ---------- búsqueda de un resultado en el bloque de un apartado ----------
def _patron(nf):
    """Patrón de un fragmento «etiqueta=valor» o «etiqueta\\approx valor» (cadena de igualdades), o None si es literal."""
    if nf.startswith("!"):   # «!texto»: aparición literal, sin lógica de cadenas (p. ej. una contradicción «0=1»)
        return None, None
    if "\\approx" in nf and nf.count("=") == 0 and nf.count("\\approx") == 1 and not nf.startswith("\\approx"):
        etiqueta, valor = nf.split("\\approx")
        op = "\\approx"
    elif nf.count("=") == 1:
        etiqueta, valor = nf.split("=")
        op = "="
        return re.compile(re.escape(etiqueta) + r"(?:=[^=]*?)*=" + re.escape(valor) + _FIN), valor
    else:
        return None, None
    return re.compile(re.escape(etiqueta) + r"(?:=[^=]*?)*" + re.escape(op) + re.escape(valor) + _FIN), valor


def _num(e):
    """Valor exacto (sympy) de un paso numérico escrito en LaTeX, o None si no es una expresión puramente numérica."""
    from sympy import sympify
    from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application
    def _det(m):
        from sympy import Matrix
        filas = [[_num(c) for c in f.split("&")] for f in m.group(1).split("\\\\")]
        if any(c is None for f in filas for c in f) or len({len(f) for f in filas}) != 1 or len(filas) != len(filas[0]):
            return "?"
        return f"({Matrix(filas).det()})"
    e = re.sub(r"\\begin\{vmatrix\}(.*?)\\end\{vmatrix\}", _det, e)
    e = re.sub(r"(\d+)[٫.](\d+)", lambda m: f"({int(m.group(1) + m.group(2))}/{10 ** len(m.group(2))})", e)   # decimales exactos
    for _ in range(4):
        e = re.sub(r"\\frac\{([^{}]*)\}\{([^{}]*)\}", r"((\1)/(\2))", e)
    e = e.replace("\\cdot", "*").replace("\\times", "*").replace("\\div", "/").replace("^", "**").replace("{", "(").replace("}", ")")
    if not e or not re.fullmatch(r"[0-9+\-*/(). ]+", e):
        return None
    try:
        return sympify(parse_expr(e, transformations=standard_transformations + (implicit_multiplication_application,), evaluate=True), rational=True)
    except Exception:
        return None


def _coherente(cadena):
    """En una cadena de igualdades «a=b=c», todos los pasos puramente numéricos valen lo mismo (antes de un \\approx)."""
    cadena = cadena.split("\\approx")[0]
    vals = [_num(t) for t in cadena.split("=")]
    vals = [x for x in vals if x is not None]
    return len(set(vals)) <= 1


def contar(nf, segmentos, plano):
    """Número de apariciones del fragmento normalizado nf en el bloque (segmentos $…$ normalizados y texto plano).

    En un resultado «etiqueta=valor» solo cuenta la aparición si la cadena de igualdades es aritméticamente coherente:
    `|B|=3\\cdot1-1\\cdot0=2` no cuenta aunque termine en el valor correcto.
    """
    patron, _ = _patron(nf)
    if patron is None:
        return plano.count(nf.lstrip("!"))
    return sum(1 for seg in segmentos for m in patron.finditer(seg) if _coherente(m.group(0)))


def _cambiar(texto, ini, fin):
    """Cambia un carácter del trozo texto[ini:fin]: el primer dígito (+1) o, si no hay, la primera letra por «Z»."""
    for j in range(ini, fin):
        if texto[j].isdigit():
            return texto[:j] + str((int(texto[j]) + 1) % 10) + texto[j + 1:]
    return texto[:ini] + "Z" + texto[ini + 1:]


def mutar(nf, segmentos, plano, i):
    """Devuelve (segmentos, plano) con la aparición número i del fragmento alterada en un carácter."""
    patron, valor = _patron(nf)
    if patron is None:
        nf = nf.lstrip("!")
        pos = -1
        for _ in range(i + 1):
            pos = plano.index(nf, pos + 1)
        return segmentos, _cambiar(plano, pos, pos + len(nf))
    vistas = 0
    nuevos = list(segmentos)
    for s_i, seg in enumerate(segmentos):
        for m in patron.finditer(seg):
            if vistas == i:
                nuevos[s_i] = _cambiar(seg, m.end() - len(valor), m.end())
                return nuevos, plano
            vistas += 1
    raise ValueError("aparición inexistente")


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
        self.ap_enunciados = {k: self.apartados(t) for k, t in self.enunciados.items()}
        self.ap_soluciones = {k: self.apartados(t) for k, t in self.soluciones.items()}

    @staticmethod
    def apartados(texto):
        """Divide un enunciado o una solución en bloques por apartado.

        Claves: «a», «b»… si no hay opciones; «A.a», «B.b»… si hay «**Opción A.**/**Opción B.**»; «» (o «A», «B») si el
        ejercicio (o la opción) no tiene apartados «a) …». Un apartado empieza en una línea que comienza por «x) ».
        El texto anterior al primer apartado (introducción) no pertenece a ningún apartado.
        """
        partes = re.split(r"^\*\*Opción ([AB])\.\*\*", texto, flags=re.M)
        if len(partes) > 1:
            grupos = [(partes[i], partes[i + 1]) for i in range(1, len(partes), 2)]
        else:
            grupos = [("", texto)]
        res = {}
        for opc, cuerpo in grupos:
            trozos = re.split(r"^([a-f])\) ", cuerpo, flags=re.M)
            if len(trozos) == 1:
                # apartados en línea («…: a) …; b) …»): solo se reconocen sus letras
                en_linea = re.findall(r"(?:^|[:;.]\s)([a-f])\) ", cuerpo)
                if len(en_linea) >= 2 and en_linea[0] == "a":
                    for letra in en_linea:
                        res[f"{opc}.{letra}" if opc else letra] = cuerpo
                else:
                    res[opc] = cuerpo
                continue
            for i in range(1, len(trozos), 2):
                clave = f"{opc}.{trozos[i]}" if opc else trozos[i]
                res[clave] = trozos[i + 1]
        return res

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
        self.cubiertos = {}
        self.registro = []
        self.mutaciones = 0

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

    def solucion(self, k, fragmentos, ap=""):
        """Cada fragmento esperado debe aparecer en el bloque del apartado `ap` de la solución k, no en otro sitio.

        `ap` es la clave del apartado («a», «b», «A.a»…; «» si el ejercicio no tiene apartados). Un fragmento es un texto
        o un par (texto, n) si debe aparecer exactamente n veces en el bloque (por defecto 1: si aparece más veces el
        verificador lo exige explícito, para que cambiar una sola aparición lo haga fallar).

        Un fragmento «etiqueta=valor» (un solo =) puede aparecer dentro de una cadena de igualdades de la misma fórmula,
        como «|A|=2\\cdot3-5\\cdot1=1»; el valor debe ser exactamente el calculado y no seguir con más cifras.
        El resto (matrices, fórmulas con varios =) debe aparecer tal cual.
        """
        bloques = self.rel.ap_soluciones[k]
        if ap not in bloques:
            self.ok(False, f"ej. {k}: la solución no tiene apartado {ap!r} (tiene {sorted(bloques)})")
            return
        self.cubiertos.setdefault(k, set()).add(ap)
        segmentos = [norm(x) for x in bloques[ap].split("$") if x.strip()]
        plano = norm(bloques[ap])
        for f in fragmentos:
            f, n = f if isinstance(f, tuple) else (f, 1)
            self.registro.append((k, ap, f, n, segmentos, plano))
            hay = contar(norm(f), segmentos, plano)
            self.ok(hay == n, f"ej. {k}, apartado {ap or '(único)'}: el resultado calculado {f!r} debe aparecer {n} vez/veces en su apartado y aparece {hay}")

    def comprobar_apartados(self):
        """Los apartados del enunciado y de la solución coinciden y todos tienen al menos un resultado comprobado."""
        for k in sorted(self.rel.enunciados):
            e, s = set(self.rel.ap_enunciados[k]), set(self.rel.ap_soluciones[k])
            self.ok(e == s, f"ej. {k}: apartados del enunciado {sorted(e)} distintos de los de la solución {sorted(s)}")
            falta = s - self.cubiertos.get(k, set())
            self.ok(not falta, f"ej. {k}: apartados de la solución sin ningún resultado comprobado: {sorted(falta)}")

    def mutacion(self):
        """Prueba de mutación: cambiar UNA aparición de cada resultado, dentro de su apartado, debe hacer fallar la comprobación."""
        for k, ap, f, n, segmentos, plano in self.registro:
            nf = norm(f)
            if contar(nf, segmentos, plano) != n:   # ya anotado como fallo; no se puede mutar
                continue
            for i in range(n):
                seg2, plano2 = mutar(nf, segmentos, plano, i)
                self.ok(contar(nf, seg2, plano2) != n, f"mutación no detectada: ej. {k}, apartado {ap or '(único)'}, {f!r}, aparición {i + 1}")
                self.mutaciones += 1

    def fin(self):
        self.comprobar_apartados()
        self.mutacion()
        if os.environ.get("CCSS_VOLCADO"):   # lo usa prueba_mutacion_ej.py
            Path(os.environ["CCSS_VOLCADO"]).write_text(json.dumps([[k, ap, f, n] for k, ap, f, n, _, _ in self.registro]))
        if self.fallos:
            for f in self.fallos:
                print("FALLA:", f, file=sys.stderr)
            print(f"{len(self.fallos)} comprobaciones fallidas ({self.n} superadas)", file=sys.stderr)
            sys.exit(1)
        print(f"OK: {self.n} comprobaciones superadas, {self.mutaciones} mutaciones detectadas ({self.competenciales} ejercicios competenciales)")
