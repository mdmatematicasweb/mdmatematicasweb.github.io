"""Marco común de las relaciones de ejercicios de 3º ESO.

Cada `ej_NN.py` construye un `Tema`, añade ejercicios con los datos calculados por sympy y llama a `Tema.cerrar()`:

  python scripts/eso3/ej_NN.py          # verifica y (si todo pasa) escribe ejercicios/3-eso/NN-.../index.qmd

Un ejercicio lleva su solución escrita con los valores calculados y una lista `esp` de resultados esperados (texto LaTeX
que sale de sympy). La verificación exige que cada `esp` aparezca dentro del bloque de solución de su ejercicio, que no
sea tan genérico como para aparecer también al perturbarlo (anti-vacío) y que los recuentos sean exactos.
Sale con código 1 si algo falla. No se relaja para que pase: se arregla el contenido.
"""
import re
import sys
from pathlib import Path
from sympy import latex, Rational, Integer, Float

ROOT = Path(__file__).resolve().parents[2]
NB, NP, NC = 10, 10, 4    # básicos, problemas y competenciales por tema


def L(x):
    """LaTeX de un valor exacto de sympy (fracciones como \\frac{p}{q}, enteros sin ceros de más)."""
    s = latex(x)
    return s.replace("\\dfrac", "\\frac")


def D(x, nd=2, quitar=True):
    """Decimal con coma: D(3.5) -> '3{,}5'; con quitar=False mantiene los ceros finales."""
    s = f"{float(x):.{nd}f}"
    if quitar and "." in s:
        s = s.rstrip("0").rstrip(".")
    return s.replace(".", "{,}").replace("-", "-")


def eur(x):
    return D(x, 2, quitar=False) if float(x) != int(float(x)) else str(int(float(x)))


def miles(n):
    """Entero con separador de millares fino (\\,)."""
    s = f"{int(n):,}".replace(",", "\\,")
    return s


class Tema:
    def __init__(self, num, carpeta, titulo, intro=""):
        self.num, self.carpeta, self.titulo, self.intro = num, carpeta, titulo, intro
        self.items = []
        self.errores = []

    def _add(self, tipo, enun, sol, esp):
        if isinstance(esp, str):
            esp = [esp]
        self.items.append(dict(tipo=tipo, enun=enun.strip(), sol=sol.strip(), esp=list(esp)))

    def b(self, enun, sol, esp): self._add("b", enun, sol, esp)
    def p(self, enun, sol, esp): self._add("p", enun, sol, esp)
    def c(self, enun, sol, esp): self._add("c", enun, sol, esp)

    # ---- verificación ----
    def _falla(self, msg):
        self.errores.append(msg)

    @staticmethod
    def _perturba(s):
        """Cambia el primer dígito del resultado esperado por otro distinto (para comprobar que no es vacío)."""
        m = re.search(r"\d", s)
        if not m:
            return s + "9"
        d = int(m.group())
        return s[:m.start()] + str((d + 1) % 10) + s[m.end():]

    def verificar(self):
        t = [i["tipo"] for i in self.items]
        if (t.count("b"), t.count("p"), t.count("c")) != (NB, NP, NC):
            self._falla(f"recuento {t.count('b')}/{t.count('p')}/{t.count('c')} en vez de {NB}/{NP}/{NC}")
            print(f"FALLA tema {self.num:02d}: {self.errores[-1]}", file=sys.stderr); sys.exit(1)
        if t != ["b"] * NB + ["p"] * NP + ["c"] * NC:
            self._falla("los ejercicios deben ir en orden: básicos, problemas, competenciales")
        n = 0
        for k, it in enumerate(self.items, 1):
            if not it["esp"]:
                self._falla(f"ejercicio {k} sin resultados esperados")
            for e in it["esp"]:
                if not e.strip():
                    self._falla(f"ejercicio {k}: resultado esperado vacío")
                if e not in it["sol"]:
                    self._falla(f"ejercicio {k}: «{e}» no aparece en su solución")
                mut = self._perturba(e)
                if mut != e and mut in it["sol"]:
                    self._falla(f"ejercicio {k}: «{e}» no es discriminante (su perturbación «{mut}» también aparece)")
                n += 1
            for campo in ("enun", "sol"):
                txt = it[campo]
                if "nan" in txt.split() or "None" in txt or "zoo" in txt or "oo" in re.findall(r"\\infty|\boo\b", txt):
                    self._falla(f"ejercicio {k}: texto sospechoso en {campo}")
                if txt.count("$") % 2:
                    self._falla(f"ejercicio {k}: número impar de $ en {campo}")
                if re.search(r"\\frac\{[^{}]*\}\{1\}(?![0-9])", txt):
                    self._falla(f"ejercicio {k}: fracción con denominador 1 en {campo}")
        if self.errores:
            for e in self.errores:
                print(f"FALLA tema {self.num:02d}: {e}", file=sys.stderr)
            sys.exit(1)
        return n

    # ---- salida ----
    def render(self):
        o = [f'---\ntitle: "{self.titulo} — relación de ejercicios"\n---\n']
        o.append(self.intro.strip() or (
            f"Relación de {NB + NP + NC} ejercicios: del 1 al {NB} son básicos, del {NB + 1} al {NB + NP} son problemas "
            f"y los {NC} últimos son competenciales (situaciones de la vida cotidiana en el estilo de las pruebas de "
            "diagnóstico). Las soluciones están al final, plegadas."))
        sec = [("b", "Ejercicios básicos"), ("p", "Problemas"), ("c", "Competenciales")]
        k = 0
        for tipo, nombre in sec:
            o.append(f"\n## {nombre}\n")
            for it in self.items:
                if it["tipo"] != tipo:
                    continue
                k += 1
                o.append(f"**{k}.** {it['enun']}\n")
        o.append("\n## Soluciones\n")
        for k, it in enumerate(self.items, 1):
            o.append(f'::: {{.callout-note collapse="true"}}\n## {k}\n{it["sol"]}\n:::\n')
        return "\n".join(o)

    def cerrar(self):
        n = self.verificar()
        out = ROOT / "ejercicios" / "3-eso" / self.carpeta / "index.qmd"
        out.write_text(self.render())
        print(f"tema {self.num:02d}: {len(self.items)} ejercicios, {n} resultados comprobados -> {out.relative_to(ROOT)}")
