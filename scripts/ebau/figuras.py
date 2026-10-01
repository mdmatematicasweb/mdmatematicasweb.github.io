#!/usr/bin/env python3
"""Dibuja los esbozos de los ejercicios PAU «esboza…» y los enlaza en sus soluciones.

Uso:  python3 scripts/ebau/figuras.py      (después, python3 scripts/ebau/build.py)

Escribe SVG en ejercicios/2-bachillerato-ciencias/ebau/fig/<examen>-e<n>.svg con la paleta de la marca
(reutiliza la clase Fig de scripts/figuras/build.py) y añade la imagen a soluciones/<examen>.md,
en el bloque «@@ n» del ejercicio. Es idempotente: si la imagen ya está enlazada, no la repite.
"""
import importlib.util
import math
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("figuras_build", HERE.parent / "figuras" / "build.py")
FB = importlib.util.module_from_spec(spec)
spec.loader.exec_module(FB)
Fig, NAVY, MINT, CORAL, YELLOW = FB.Fig, FB.NAVY, FB.MINT, FB.CORAL, FB.YELLOW
OUT = FB.ROOT / "ejercicios" / "2-bachillerato-ciencias" / "ebau" / "fig"
SOLS = HERE / "soluciones"
S = math.sqrt
FIGS = []  # (examen, n, descripción)


def pie(g, name, exam, n, alt):
    g.save(OUT / f"{name}.svg", alt)
    FIGS.append((exam, n, alt, name))


def tag(g, x, y, s, color=NAVY, **kw):
    g.text(x, y, s, color=color, bold=True, **kw)


def e_2025_ext_sup2_6():
    g = Fig(-3.5, 3.5, -4.5, 1.2)
    g.axes(xt=(-2, -1, 1, 2), yt=(-1, -2, -3))
    f = lambda x: -math.exp(x); h = lambda x: -math.exp(-x)
    g.curve(f, -3.5, 3.5); g.curve(h, -3.5, 3.5, color=CORAL)
    g.dot(0, -1, YELLOW)
    tag(g, 2.2, -3.6, "f(x) = −eˣ", NAVY, anchor="end"); tag(g, -2.2, -3.6, "g(x) = −e⁻ˣ", CORAL, anchor="start")
    pie(g, "2025-ext-sup2-e6", "2025-ext-sup2", 6, "Gráficas de f(x)=−eˣ y g(x)=−e⁻ˣ, simétricas respecto del eje Y y con asíntota y=0")


def e_2025_ord_sup1_2():
    a = 2
    f = lambda x: (x - 1) ** 2
    g = Fig(-1.2, 3.2, -0.7, 4)
    g.region(lambda x: a, f, 1 - S(a), 1 + S(a))
    g.axes(xt=(1,), yt=())
    tag(g, 0, a, "a", dx=-10, dy=4, anchor="end")
    g.curve(f, -1.1, 3.1)
    g.line((-1.2, a), (3.2, a), color=CORAL, width=2, dash="0")
    g.dot(1 - S(a), a, MINT); g.dot(1 + S(a), a, MINT)
    tag(g, -1.1, 3.6, "f(x) = (x − 1)²", NAVY, anchor="start"); tag(g, 3.1, a + 0.25, "y = a", CORAL, anchor="end")
    tag(g, 1, 1.35, "recinto", size=15)
    pie(g, "2025-ord-sup1-e2", "2025-ord-sup1", 2, "Recinto limitado por la parábola f(x)=(x−1)² y la recta y=a (a>0), con los cortes en x=1±√a")


def e_2021_ord_3():
    f = lambda x: 4 * x ** 3 - x ** 4
    g = Fig(-1.2, 5.2, -8, 32, w=560)
    g.region(f, lambda x: 0, 0, 4)
    g.axes(xt=(1, 2, 3, 4), yt=(16, 27))
    g.curve(f, -1.1, 5.1)
    g.dot(0, 0, MINT); g.dot(4, 0, MINT); g.dot(3, 27, YELLOW)
    tag(g, 3, 27, "máximo (3, 27)", dx=14, anchor="start", dy=4)
    tag(g, 2, 9, "A", size=22)
    tag(g, 5.1, 21, "f(x) = 4x³ − x⁴", anchor="end")
    pie(g, "2021-ord-e3", "2021-ord", 3, "Gráfica de f(x)=4x³−x⁴: cortes en x=0 y x=4, máximo en (3,27) y recinto sombreado entre la curva y el eje X")


def e_2023_ext_4():
    f = lambda x: 5 - x * x; h = lambda x: 4 / (x * x)
    g = Fig(-3.2, 3.2, -2, 7)
    g.axes(xt=(-2, -1, 1, 2), yt=(1, 4, 5))
    g.curve(f, -3.1, 3.1)
    g.curve(h, -3.2, -0.55, color=CORAL); g.curve(h, 0.55, 3.2, color=CORAL)
    g.line((0, -2), (0, 7), color=CORAL, width=1.2)
    for x, y in ((-2, 1), (-1, 4), (1, 4), (2, 1)):
        g.dot(x, y, YELLOW)
    tag(g, 0, -1.5, "f(x) = 5 − x²", NAVY); tag(g, 3.1, 6.3, "g(x) = 4/x²", CORAL, anchor="end")
    pie(g, "2023-ext-e4", "2023-ext", 4, "Gráficas de f(x)=5−x² y g(x)=4/x², que se cortan en (±1,4) y (±2,1)")


def e_2023_ord_sup_2():
    f = lambda x: 1 / (x * abs(x))
    g = Fig(-4, 4, -4, 4)
    g.axes(xt=(-2, -1, 1, 2), yt=(-2, -1, 1, 2))
    g.curve(f, -4, -0.5, color=NAVY); g.curve(f, 0.5, 4, color=NAVY)
    g.line((0, -4), (0, 4), color=CORAL, width=2); g.line((-4, 0), (4, 0), color=MINT, width=2)
    g.dot(1, 1, YELLOW); g.dot(-1, -1, YELLOW)
    tag(g, 0.3, 3.4, "x = 0", CORAL, anchor="start"); tag(g, 3.9, 0.45, "y = 0", "#2a8f82", anchor="end")
    tag(g, 3.9, 3.4, "f(x) = 1/(x|x|)", NAVY, anchor="end")
    pie(g, "2023-ord-sup-e2", "2023-ord-sup", 2, "Gráfica de f(x)=1/(x|x|): asíntota vertical x=0 y horizontal y=0, positiva a la derecha y negativa a la izquierda")


def e_2023_ord_sup_4():
    f = lambda x: abs(x * x - 1); h = lambda x: x + 5
    g = Fig(-3.2, 4.2, -1.5, 10.5, w=560)
    g.region(h, f, -2, 3)
    g.axes(xt=(-2, -1, 1, 2, 3), yt=(1, 5))
    g.curve(f, -3.1, 4.1); g.curve(h, -3.2, 4.2, color=CORAL)
    g.dot(-2, 3, YELLOW); g.dot(3, 8, YELLOW)
    tag(g, 4.1, 2.2, "f(x) = |x² − 1|", NAVY, anchor="end"); tag(g, -3.1, 2.4, "g(x) = x + 5", CORAL, anchor="start")
    pie(g, "2023-ord-sup-e4", "2023-ord-sup", 4, "Recinto entre f(x)=|x²−1| y g(x)=x+5, con cortes en (−2,3) y (3,8)")


def e_2022_ord_res_4():
    f = lambda x: 1 - x * x; h = lambda x: 2 * x * x
    x0 = 1 / S(3)
    g = Fig(-1.6, 1.6, -0.5, 2.2)
    g.region(f, h, -x0, x0)
    g.axes(xt=(-1, 1), yt=(1, 2))
    g.curve(f, -1.5, 1.5); g.curve(h, -1.05, 1.05, color=CORAL)
    g.dot(-x0, 2 / 3, YELLOW); g.dot(x0, 2 / 3, YELLOW)
    tag(g, 1.5, -0.3, "f(x) = 1 − x²", NAVY, anchor="end"); tag(g, 1.55, 2.05, "g(x) = 2x²", CORAL, anchor="end")
    pie(g, "2022-ord-res-e4", "2022-ord-res", 4, "Recinto entre f(x)=1−x² y g(x)=2x², con cortes en x=±1/√3")


def e_2021_ord_sup_4():
    f = lambda x: abs(x) - 2; h = lambda x: 4 - x * x
    g = Fig(-3.2, 3.2, -3.5, 5)
    g.region(h, f, -2, 2)
    g.axes(xt=(-2, -1, 1, 2), yt=(-2, 4))
    g.curve(f, -3.1, 3.1); g.curve(h, -2.9, 2.9, color=CORAL)
    g.dot(-2, 0, YELLOW); g.dot(2, 0, YELLOW)
    tag(g, 3.1, 1.3, "f(x) = |x| − 2", NAVY, anchor="end"); tag(g, 3.1, -2.6, "g(x) = 4 − x²", CORAL, anchor="end")
    pie(g, "2021-ord-sup-e4", "2021-ord-sup", 4, "Recinto entre f(x)=|x|−2 y g(x)=4−x², con cortes en (−2,0) y (2,0)")


def e_2021_ext_sup_4():
    f = lambda x: x * math.exp(x); h = lambda x: x
    g = Fig(-0.8, 2.8, -2, 17, w=520)
    g.region(f, h, 0, 2)
    g.axes(xt=(1, 2), yt=(2, 8, 14.8))
    g.curve(f, 0, 2.6); g.curve(h, -0.8, 2.8, color=CORAL)
    g.line((2, -2), (2, 17), color=FB.INK)
    g.dot(0, 0, YELLOW); g.dot(2, 2, YELLOW); g.dot(2, 2 * math.exp(2), YELLOW)
    tag(g, 1.0, 11, "f(x) = x·eˣ", NAVY, anchor="end"); tag(g, 2.7, 1.2, "y = x", CORAL, anchor="end"); tag(g, 2.05, 5, "x = 2", anchor="start")
    pie(g, "2021-ext-sup-e4", "2021-ext-sup", 4, "Recinto limitado por f(x)=x·eˣ, la recta y=x y la recta x=2")


def e_2025_ord_sup2_3():
    f = lambda x: x ** 3 - x; h = lambda x: 1 - x * x
    g = Fig(-2.2, 2.2, -2.2, 2.2)
    g.region(h, f, -1, 1)
    g.axes(xt=(-1, 1), yt=(1,))
    g.curve(f, -1.7, 1.7); g.curve(h, -1.5, 1.5, color=CORAL)
    g.dot(-1, 0, YELLOW); g.dot(1, 0, YELLOW)
    tag(g, 1.6, -1.9, "f(x) = x³ − x", NAVY, anchor="end"); tag(g, -2.1, -1.0, "g(x) = 1 − x²", CORAL, anchor="start")
    pie(g, "2025-ord-sup2-e3", "2025-ord-sup2", 3, "Recinto entre f(x)=x³−x y g(x)=1−x², que se cortan en (−1,0) (tangentes) y (1,0)")


def e_2024_ord_res_3():
    f = lambda x: x ** 3 - 6 * x ** 2 + 8 * x
    xm = 2 - 2 / S(3); xM = 2 + 2 / S(3)
    g = Fig(-1, 5, -6, 6)
    g.axes(xt=(1, 2, 3, 4), yt=(-3, 3))
    g.curve(f, -0.9, 4.9)
    for x in (0, 2, 4):
        g.dot(x, 0, MINT)
    g.dot(xm, f(xm), YELLOW); g.dot(xM, f(xM), YELLOW)
    tag(g, 5, -5, "f(x) = x³ − 6x² + 8x", NAVY, anchor="end")
    pie(g, "2024-ord-res-e3", "2024-ord-res", 3, "Gráfica de f(x)=x³−6x²+8x con cortes en x=0, 2 y 4 y sus extremos relativos")


def e_2024_ext_3():
    f = lambda x: -x * x + 7; h = lambda x: abs(x * x - 1)
    g = Fig(-3.2, 3.2, -1.5, 8.2)
    g.region(f, h, -2, 2)
    g.axes(xt=(-2, -1, 1, 2), yt=(1, 3, 7))
    g.curve(f, -3.1, 3.1); g.curve(h, -3.1, 3.1, color=CORAL)
    g.dot(-2, 3, YELLOW); g.dot(2, 3, YELLOW)
    tag(g, 3.1, -0.8, "f(x) = −x² + 7", NAVY, anchor="end"); tag(g, 3.1, 7.5, "g(x) = |x² − 1|", CORAL, anchor="end")
    pie(g, "2024-ext-e3", "2024-ext", 3, "Recinto entre f(x)=−x²+7 y g(x)=|x²−1|, con cortes en (±2,3)")


def e_2023_ord_res_4():
    f = lambda x: x * x + 1; h = lambda x: 4 * x - 3
    g = Fig(-1, 3.4, -4.5, 8)
    g.region(f, h, 0, 2)
    g.axes(xt=(1, 2), yt=(1, 5, -3))
    g.curve(f, -0.9, 3.1); g.curve(h, -0.5, 3.3, color=CORAL)
    g.dot(2, 5, YELLOW); g.dot(0, -3, MINT); g.dot(0, 1, MINT)
    tag(g, 3.3, 7, "f(x) = x² + 1", NAVY, anchor="end"); tag(g, 3.3, 9.4 - 12, "y = 4x − 3", CORAL, anchor="end", dy=0)
    tag(g, 2.05, 5, "(2, 5)", anchor="start", dx=6, dy=18)
    pie(g, "2023-ord-res-e4", "2023-ord-res", 4, "Recinto entre f(x)=x²+1, su tangente y=4x−3 en (2,5) y el eje de ordenadas")


def e_2022_ord_3():
    f = lambda x: 2 * x + 4 if x < 0 else (x - 2) ** 2
    g = Fig(-3.2, 4, -1.2, 5.5)
    g.axes(xt=(-2, 2), yt=(4,))
    g.curve(f, -3.1, -0.001); g.curve(f, 0, 3.9)
    g.dot(-2, 0, MINT); g.dot(2, 0, MINT); g.dot(0, 4, YELLOW)
    tag(g, -3.1, 4.5, "2x + 4  si x < 0", NAVY, anchor="start"); tag(g, 3.9, 4.2, "(x − 2)²  si x ≥ 0", NAVY, anchor="end")
    pie(g, "2022-ord-e3", "2022-ord", 3, "Gráfica de la función definida a trozos: recta 2x+4 hasta x=0 y parábola (x−2)² desde x=0; cortes en x=−2 y x=2")


def e_2022_ext_4():
    f = lambda x: x ** 3 + 2; h = lambda x: -x * x + 2 * x + 2
    g = Fig(-3, 2.4, -7, 7)
    g.axes(xt=(-2, -1, 1, 2), yt=(2, 3, -6))
    g.curve(f, -2.2, 1.6); g.curve(h, -2.2, 2.3, color=CORAL)
    for x, y in ((-2, -6), (0, 2), (1, 3)):
        g.dot(x, y, YELLOW)
    tag(g, 1.5, 6.3, "f(x) = x³ + 2", NAVY, anchor="end"); tag(g, 2.3, -3.5, "g(x) = −x² + 2x + 2", CORAL, anchor="end")
    pie(g, "2022-ext-e4", "2022-ext", 4, "Gráficas de f(x)=x³+2 y g(x)=−x²+2x+2, que se cortan en (−2,−6), (0,2) y (1,3)")


def enlazar():
    for exam, n, alt, name in FIGS:
        p = SOLS / f"{exam}.md"
        txt = p.read_text()
        if f"fig/{name}.svg" in txt:
            continue
        m = re.search(rf"^@@ {n}\s*$", txt, re.M)
        assert m, (exam, n)
        nxt = re.search(r"^@@ \d+", txt[m.end():], re.M)
        end = m.end() + nxt.start() if nxt else len(txt)
        bloque = txt[m.end():end]
        paras = re.split(r"\n\s*\n", bloque.strip("\n"))
        k = next((i for i, q in enumerate(paras) if re.search(r"esbo|gráfica", q, re.I)), 0)
        img = f'![{alt}](fig/{name}.svg){{fig-alt="{alt}" width="75%" fig-align="center"}}'
        paras.insert(k + 1, img)
        nuevo = "\n" + "\n\n".join(paras) + "\n\n"
        p.write_text(txt[:m.end()] + nuevo + txt[end:])
        print("enlazado", exam, n, "tras el párrafo", k + 1)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for fn in [v for k, v in sorted(globals().items()) if k.startswith("e_20")]:
        fn()
    enlazar()
