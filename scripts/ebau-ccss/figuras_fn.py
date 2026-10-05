#!/usr/bin/env python3
"""Dibuja las gráficas pedidas con «represente», «esboce» o «dibuje» en los ejercicios de funciones de la PAU CCSS y las enlaza en sus soluciones.

Uso:  python3 scripts/ebau-ccss/figuras_fn.py      (después, python3 scripts/ebau-ccss/build.py)

Cada figura es una función `e_...` con su examen y número de ejercicio; escribe SVG en ejercicios/2-bachillerato-ccss/ebau/fig/<examen>-e<n>.svg
(paleta de la marca, clase Fig de scripts/figuras/build.py) y añade la imagen a soluciones/<examen>.md. Es idempotente.
"""
import importlib.util
import math
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("figuras_build", HERE.parent / "figuras" / "build.py")
FB = importlib.util.module_from_spec(spec)
spec.loader.exec_module(FB)
Fig, NAVY, MINT, CORAL, YELLOW, INK, PAPER = FB.Fig, FB.NAVY, FB.MINT, FB.CORAL, FB.YELLOW, FB.INK, FB.PAPER
OUT = FB.ROOT / "ejercicios" / "2-bachillerato-ccss" / "ebau" / "fig"
SOLS = HERE / "soluciones"
S = math.sqrt
E = math.e
FIGS = []  # (examen, n, alt, nombre)


def hecho(g, exam, n, alt):
    name = f"{exam}-e{n.lower()}"
    OUT.mkdir(parents=True, exist_ok=True)
    g.save(OUT / f"{name}.svg", alt)
    FIGS.append((exam, n, alt, name))


def tag(g, x, y, s, color=NAVY, **kw):
    g.text(x, y, s, color=color, bold=True, **kw)


def abierto(g, x, y):
    g.el.append(f'<circle cx="{g.X(x):.1f}" cy="{g.Y(y):.1f}" r="5.5" fill="{PAPER}" stroke="{INK}" stroke-width="2"/>')


def pts(g, *ps, color=YELLOW):
    for p in ps:
        g.dot(p[0], p[1], color)


def vh(g, x=None, y=None):
    """Asíntota vertical x o horizontal y (trazo coral discontinuo a todo el marco)."""
    if x is not None:
        g.line((x, g.y0), (x, g.y1), color=CORAL, width=2, dash="7 5")
    if y is not None:
        g.line((g.x0, y), (g.x1, y), color=CORAL, width=2, dash="7 5")


def lin(a, b):
    return lambda x: a * x + b


# ---------------------------------------------------------------- 2021
def e_2021_ext_res_3():
    f1 = lambda x: 0.5; f2 = lambda x: x * x - x / 2
    g = Fig(-0.5, 2.6, -0.5, 3.6)
    g.region(f1, lambda x: 0, 0, 1); g.region(f2, lambda x: 0, 1, 2)
    g.axes(xt=(1, 2), yt=(0.5, 3))
    g.curve(f1, -0.5, 1); g.curve(f2, 1, 2.6)
    g.line((2, 0), (2, 3), color=INK, width=1.2)
    pts(g, (1, 0.5), (2, 3))
    tag(g, 0.4, 0.95, "f(x) = 1/2", anchor="middle"); tag(g, 1.5, 3.1, "f(x) = x² − x/2", anchor="end")
    hecho(g, "2021-ext-res", "3", "Gráfica de f para a=0 y b=1/2: tramo horizontal y=1/2 hasta x=1 y parábola x²−x/2 desde x=1; recinto sombreado entre x=0 y x=2")


def e_2021_ext_sup_3():
    f1 = lambda x: (x + 1) ** 2; f2 = lambda x: (x - 1) ** 2
    g = Fig(-2.6, 2.6, -0.6, 4.6)
    g.region(f1, lambda x: 0, -1, 0); g.region(f2, lambda x: 0, 0, 1)
    g.axes(xt=(-2, -1, 1, 2), yt=(1, 4))
    g.curve(f1, -2, 0); g.curve(f2, 0, 2)
    g.line((-1, 0), (-1, 1.15), color=INK, width=1.2); g.line((1, 0), (1, 1.15), color=INK, width=1.2)
    pts(g, (-2, 1), (0, 1), (2, 1), (-1, 0), (1, 0))
    tag(g, 0, 2.3, "A", size=22)
    hecho(g, "2021-ext-sup", "3", "Gráfica de f: dos arcos de parábola, (x+1)² en [−2,0) y (x−1)² en [0,2], con forma de W; recinto sombreado entre x=−1 y x=1")


def e_2021_ext_sup_4():
    f = lambda x: 8 - x * x / 2
    g = Fig(-6, 6, -9, 10)
    g.region(f, lambda x: 0, -4, 4)
    g.axes(xt=(-4, 4), yt=(8,))
    g.curve(f, -5.5, 5.5)
    pts(g, (-4, 0), (4, 0), (0, 8))
    tag(g, 0, -6.5, "f′(x) = 8 − x²/2")
    hecho(g, "2021-ext-sup", "4", "Gráfica de f′: parábola abierta hacia abajo con vértice (0,8) que corta al eje X en (−4,0) y (4,0); f′>0 entre −4 y 4")


def e_2021_ord_sup_3():
    f1 = lambda x: 1 / x; f2 = lambda x: -3 * x * x + 4; f3 = lambda x: 2 * x - 1
    g = Fig(-4.2, 3.4, -4.5, 6)
    g.region(f2, lambda x: 0, 0, 1); g.region(f3, lambda x: 0, 1, 3)
    g.axes(xt=(-3, -1, 1, 2, 3), yt=(-1, 4))
    g.curve(f1, -4.1, -1); g.curve(f2, -1, 1); g.curve(f3, 1, 3.3)
    pts(g, (-1, -1), (1, 1), (0, 4)); abierto(g, -1, 1)
    tag(g, 1.5, 0.45, "A", size=18)
    hecho(g, "2021-ord-sup", "3", "Gráfica de f: hipérbola 1/x para x≤−1, parábola −3x²+4 en (−1,1) y recta 2x−1 para x≥1; salto en x=−1 y recinto sombreado entre x=0 y x=3")


def e_2021_ord_sup_4():
    f = lambda x: x * x - 6 * x + 10
    g = Fig(-0.8, 6.6, -7.5, 11.5)
    g.axes(xt=(3, 4), yt=(-6, 2, 10))
    g.curve(f, -0.5, 6.4); g.curve(lin(2, -6), 0, 6.2, color=CORAL)
    pts(g, (3, 1), (4, 2), (0, 10), (3, 0))
    tag(g, 1.0, 9.2, "f(x) = x² − 6x + 10", anchor="start"); tag(g, 6.2, 3.2, "y = 2x − 6", CORAL, anchor="end")
    hecho(g, "2021-ord-sup", "4", "Parábola de costes f(x)=x²−6x+10 con vértice (3,1) y su recta tangente y=2x−6 en el punto (4,2)")


def e_2021_ord_3():
    f = lambda x: x ** 3 - 4 * x * x + 4 * x
    g = Fig(-1, 3.5, -3, 5)
    g.region(f, lambda x: 0, 0, 2)
    g.axes(xt=(1, 2, 3), yt=(1, 2))
    g.curve(f, -0.9, 3.4)
    pts(g, (0, 0), (2, 0), (2 / 3, 32 / 27))
    tag(g, 1, 0.6, "A", size=20)
    tag(g, 0.67, 1.9, "máximo (2/3, 32/27)", anchor="start", dx=8)
    hecho(g, "2021-ord", "3", "Gráfica de f(x)=x³−4x²+4x: pasa por el origen, máximo en (2/3, 32/27), tangente al eje X en (2,0); recinto sombreado entre x=0 y x=2")


def e_2021_ord_4():
    f = lambda x: x * x + x + 1
    g = Fig(-2.6, 1.8, -0.8, 5)
    g.region(f, lambda x: 0, -0.5, 0)
    g.axes(xt=(-2, -1, 1), yt=(1, 3, 4))
    g.curve(f, -2.5, 1.7)
    pts(g, (-0.5, 0.75), (0, 1))
    tag(g, -0.5, 0.75, "vértice (−1/2, 3/4)", dx=-10, dy=22, anchor="end"); tag(g, 1.65, 4.4, "h(x) = x² + x + 1", anchor="end")
    hecho(g, "2021-ord", "4", "Parábola h(x)=x²+x+1 con vértice (−1/2, 3/4), sin cortes con el eje X y corte con el eje Y en (0,1); sombreada entre x=−1/2 y x=0")


# ---------------------------------------------------------------- 2022
def e_2022_ext_res_3():
    f1 = lambda x: (x + 1) ** 2; f2 = lambda x: x * x + 2
    g = Fig(-3.6, 2.7, -0.7, 7)
    g.region(f1, lambda x: 0, -2, 1)
    g.axes(xt=(-3, -2, -1, 1, 2), yt=(1, 4, 6))
    g.curve(f1, -3, 1); g.curve(f2, 1, 2)
    pts(g, (-3, 4), (-1, 0), (1, 4), (2, 6)); abierto(g, 1, 3)
    hecho(g, "2022-ext-res", "3", "Gráfica de f con (a, b) = (1, 2): parábola (x+1)² hasta x=1 y x²+2 desde x=1, con salto de 4 a 3; recinto sombreado entre x=−2 y x=1")


def e_2022_ext_res_4():
    f = lambda x: (x - 3) / (x + 2)
    g = Fig(-8, 8, -7, 5)
    g.axes(xt=(3,), yt=(1,))
    vh(g, x=-2, y=1)
    g.curve(f, -8, -2.12); g.curve(f, -1.9, 8)
    pts(g, (3, 0), (0, -1.5))
    tag(g, 7.5, 2.3, "f(x) = (x − 3)/(x + 2)", anchor="end")
    hecho(g, "2022-ext-res", "4", "Hipérbola f(x)=(x−3)/(x+2) con asíntotas x=−2 e y=1; corta a los ejes en (3,0) y (0,−3/2)")


def e_2022_ext_sup_4():
    f1 = lambda x: -x * x + x + 2; f2 = lambda x: 4 / (x + 1)
    g = Fig(-2.6, 5.2, -1.2, 3.6)
    g.region(f1, lambda x: 0, -1, 1)
    g.axes(xt=(-1, 2, 3, 4), yt=(1, 2))
    g.curve(f1, -2.5, 1); g.curve(f2, 1, 5.1)
    pts(g, (-1, 0), (0, 2), (1, 2), (0.5, 2.25))
    hecho(g, "2022-ext-sup", "4", "Gráfica de f con (a, b) = (−1, 1): parábola −x²+x+2 hasta x=1 e hipérbola 4/(x+1) desde x=1; recinto sombreado entre x=−1 y x=1")


def e_2022_ext_3():
    f = lambda x: -x ** 3 - x * x + x + 1
    g = Fig(-2.4, 1.8, -2.6, 3.6)
    g.region(f, lambda x: 0, -1, 1)
    g.axes(xt=(-1, 1), yt=(1,))
    g.curve(f, -2.3, 1.7)
    pts(g, (-1, 0), (1, 0), (0, 1), (1 / 3, 32 / 27))
    tag(g, -2.3, -2.3, "g(x) = −x³ − x² + x + 1", anchor="start")
    hecho(g, "2022-ext", "3", "Gráfica de g(x)=−x³−x²+x+1: tangente al eje X en (−1,0), máximo en (1/3, 32/27) y corte con el eje X en (1,0); recinto sombreado entre x=−1 y x=1")


def e_2022_ext_4():
    f = lambda x: -0.02 * x * x + 1.3 * x - 15
    g = Fig(-5, 70, -20, 10)
    g.axes(xt=(15, 32.5, 50), yt=(-15,))
    g.curve(f, 0, 68)
    pts(g, (15, 0), (50, 0), (32.5, 6.125), (0, -15))
    tag(g, 32.5, 6.125, "máximo (32,5; 6,125)", dy=-12)
    tag(g, 36, -14, "B(x) = −0,02x² + 1,3x − 15")
    hecho(g, "2022-ext", "4", "Parábola de beneficio B(x)=−0,02x²+1,3x−15 con cortes en x=15 y x=50 y máximo en (32,5; 6,125)")


def e_2022_ord_res_3():
    f1 = lambda x: 4 * x * x + 16 * x + 17; f2 = lambda x: (10 - 5 * x) / 3; f3 = lambda x: 1.5
    g = Fig(-4, 4, -1.2, 9)
    g.region(f1, lambda x: 0, -2, -1); g.region(f2, lambda x: 0, -1, 2)
    g.axes(xt=(-3, -2, -1, 1, 2, 3), yt=(5,))
    g.curve(f1, -3.9, -1); g.curve(f2, -1, 2); g.curve(f3, 2, 3.9)
    pts(g, (-1, 5), (2, 0)); abierto(g, 2, 1.5)
    hecho(g, "2022-ord-res", "3", "Gráfica de f: parábola 4x²+16x+17 hasta x=−1, segmento de (−1,5) a (2,0) y recta horizontal y=3/2 desde x=2 (salto en x=2); recinto sombreado entre x=−2 y x=2")


# ---------------------------------------------------------------- 2023
def e_2023_ord_a_3():
    f = lambda x: x ** 3 - 3 * x * x + 2 * x
    g = Fig(-1, 2.7, -2, 2)
    g.region(f, lambda x: 0, 0, 1); g.region(lambda x: 0, f, 1, 2)
    g.axes(xt=(1, 2), yt=())
    g.curve(f, -0.95, 2.65)
    pts(g, (0, 0), (1, 0), (2, 0), (1 - S(3) / 3, 2 * S(3) / 9), (1 + S(3) / 3, -2 * S(3) / 9))
    hecho(g, "2023-ord-a", "3", "Gráfica de f(x)=x³−3x²+2x: cortes en x=0, 1, 2, máximo en x=1−√3/3 y mínimo en x=1+√3/3; recinto sombreado entre la curva y el eje X de 0 a 2")


def e_2023_ord_b_3():
    f = lambda x: (x - 1) ** 2; h = lambda x: 5 - 2 * x
    g = Fig(-3, 3.6, -1, 10)
    g.region(h, f, -2, 2)
    g.axes(xt=(-2, 2), yt=(1, 5, 9))
    g.curve(f, -2.9, 3.1); g.curve(h, -2.9, 2.9, color=CORAL)
    pts(g, (-2, 9), (2, 1))
    tag(g, 3.4, 5.3, "f(x) = (x − 1)²", anchor="end"); tag(g, 1.4, 9.2, "g(x) = 5 − 2x", CORAL, anchor="start")
    hecho(g, "2023-ord-b", "3", "Zona deteriorada: región entre la parábola f(x)=(x−1)² y la recta g(x)=5−2x, que se cortan en (−2,9) y (2,1)")


def e_2023_ord_b_4():
    f = lambda t: (12 * t - 24) / (t + 3)
    g = Fig(-1, 30, -10, 14)
    g.axes(xt=(2, 10, 20), yt=(-8, 12))
    vh(g, y=12)
    g.curve(f, 0, 29.5)
    pts(g, (2, 0), (0, -8))
    tag(g, 28, 6, "f(t) = (12t − 24)/(t + 3)", anchor="end"); tag(g, 29, 12.6, "y = 12", CORAL, anchor="end")
    hecho(g, "2023-ord-b", "4", "Curva creciente y cóncava f(t)=(12t−24)/(t+3) para t≥0: parte de (0,−8), corta al eje en (2,0) y tiende a la asíntota y=12")


def e_2023_ord_res_b_3():
    h = lambda x: -2 * x + 6; p = lambda x: -x * x + 2 * x + 3
    g = Fig(-0.8, 4.4, -2, 8)
    g.region(p, h, 1, 3)
    g.axes(xt=(1, 3), yt=(3, 4, 6))
    g.curve(p, -0.5, 4.2); g.curve(h, -0.5, 4.2, color=CORAL)
    pts(g, (1, 4), (3, 0))
    tag(g, -0.6, -1.3, "y = −x² + 2x + 3", anchor="start"); tag(g, 0.2, 7.2, "y = −2x + 6", CORAL, anchor="start")
    hecho(g, "2023-ord-res-b", "3", "Región acotada entre la recta y=−2x+6 y la parábola y=−x²+2x+3, que se cortan en (1,4) y (3,0)")


def e_2023_ord_res_b_4():
    f = lambda t: -9 if (t <= 1 or t >= 11) else -t * t + 12 * t - 20
    g = Fig(-1.5, 25.5, -12, 19)
    g.axes(xt=(2, 6, 10, 20), yt=(-9, 16))
    g.curve(f, 0, 1); g.curve(lambda t: -t * t + 12 * t - 20, 1, 11); g.curve(f, 11, 24)
    pts(g, (1, -9), (11, -9), (6, 16), (2, 0), (10, 0))
    tag(g, 6, 16, "máximo (6, 16)", dy=-12)
    hecho(g, "2023-ord-res-b", "4", "Temperatura f(t): constante −9 °C hasta la hora 1, arco de parábola con máximo 16 °C en t=6 entre las horas 1 y 11, y de nuevo −9 °C hasta t=24")


def e_2023_ord_sup_a_3():
    f = lambda x: -2 * x * x + 2 * x + 4
    g = Fig(-2, 3.5, -3, 6)
    g.region(f, lambda x: 0, -1, 2)
    g.axes(xt=(-1, 2), yt=(4,))
    g.curve(f, -1.7, 2.7)
    pts(g, (-1, 0), (2, 0), (0, 4), (0.5, 4.5))
    tag(g, 2.7, 4.8, "g(x) = −2x² + 2x + 4", anchor="end")
    hecho(g, "2023-ord-sup-a", "3", "Parábola g(x)=−2x²+2x+4 con vértice (1/2, 9/2) y cortes con el eje X en x=−1 y x=2; recinto sombreado entre ambas raíces")


def e_2023_ord_sup_a_4():
    f1 = lambda x: x * x / 3; f2 = lambda x: 4 / (x + 1)
    g = Fig(-0.5, 6.2, -0.3, 2.1)
    g.axes(xt=(1, 2, 3, 4, 5), yt=(1,))
    g.curve(f1, 0, 2); g.curve(f2, 2, 6.1)
    pts(g, (0, 0), (2, 4 / 3), (3, 1))
    tag(g, 2, 4 / 3, "máximo (2, 4/3)", dy=-12)
    hecho(g, "2023-ord-sup-a", "4", "Gráfica de f: parábola x²/3 creciente hasta el máximo (2, 4/3) e hipérbola 4/(x+1) decreciente desde ese punto")


def e_2023_ord_sup_b_3():
    f1 = lambda x: (x - 2) ** 2; f2 = lambda x: -x + 4
    g = Fig(-1, 5.6, -2, 5)
    g.region(f1, lambda x: 0, 2, 3); g.region(f2, lambda x: 0, 3, 4)
    g.axes(xt=(2, 3, 4), yt=(1, 4))
    g.curve(f1, -0.7, 3); g.curve(f2, 3, 5.5)
    pts(g, (2, 0), (3, 1), (0, 4), (4, 0))
    hecho(g, "2023-ord-sup-b", "3", "Gráfica de f: parábola (x−2)² hasta x=3 y recta −x+4 desde x=3, continua en (3,1) pero con pico; recinto sombreado entre x=2 y x=4")


def e_2023_ord_sup_b_4():
    f = lambda t: -t * t + 21 * t - 20
    g = Fig(-1.5, 16.5, -27, 100)
    g.axes(xt=(1, 5, 10, 15), yt=(-20, 50, 90))
    g.curve(f, 0, 15)
    pts(g, (1, 0), (10.5, 90.25), (0, -20), (15, 70))
    tag(g, 10.5, 90.25, "máximo (10,5; 90,25)", dy=-12)
    hecho(g, "2023-ord-sup-b", "4", "Parábola de beneficio B(t)=−t²+21t−20 en [0,15]: parte de −20, corta al eje en t=1, alcanza el máximo 90,25 en t=10,5 y llega a 70 en t=15")


# ---------------------------------------------------------------- 2024
def e_2024_ord_a_4():
    f1 = lambda t: t * t - 8 * t + 60; f2 = lambda t: -t * t + 32 * t - 140
    g = Fig(-1.5, 25.5, 0, 125)
    g.axes(xt=(4, 10, 16, 24), yt=(44, 60, 80, 116))
    g.curve(f1, 0, 10); g.curve(f2, 10, 24)
    pts(g, (0, 60), (4, 44), (10, 80), (16, 116), (24, 52))
    tag(g, 4, 44, "mínimo (4, 44)", dy=18); tag(g, 16, 116, "máximo (16, 116)", dy=-12)
    hecho(g, "2024-ord-a", "4", "Velocidad del viento v(t): baja de 60 a 44 km/h en t=4, sube hasta el máximo 116 km/h en t=16 y baja a 52 km/h en t=24")


def e_2024_ord_b_3():
    f = lambda x: (2 * x - 6) / (2 - x)
    g = Fig(-6, 9, -10, 6)
    g.axes(xt=(3,), yt=(-3,))
    vh(g, x=2, y=-2)
    g.curve(f, -6, 1.93); g.curve(f, 2.07, 9)
    pts(g, (3, 0), (0, -3))
    tag(g, 8.5, -3.2, "f(x) = (2x − 6)/(2 − x)", anchor="end")
    hecho(g, "2024-ord-b", "3", "Hipérbola decreciente f(x)=(2x−6)/(2−x) con asíntota vertical en la abscisa 2 y horizontal en la ordenada −2; corta a los ejes en (3,0) y (0,−3)")


def e_2024_ord_b_4():
    f1 = lambda x: -x * x + 4 * x + 3; f2 = lambda x: 2 * x - 5
    g = Fig(-0.8, 6.2, -1.2, 8.4)
    g.region(f1, lambda x: 0, 3, 4); g.region(f2, lambda x: 0, 4, 5)
    g.axes(xt=(3, 4, 5), yt=(3, 7))
    g.curve(f1, -0.6, 4); g.curve(f2, 4, 6.1)
    g.line((3, 0), (3, 6), color=INK, width=1.2); g.line((5, 0), (5, 5), color=INK, width=1.2)
    pts(g, (2, 7), (4, 3), (3, 6), (5, 5))
    hecho(g, "2024-ord-b", "4", "Gráfica de f: parábola −x²+4x+3 con máximo (2,7) hasta x=4 y recta 2x−5 desde (4,3); sombreado entre x=3 y x=5")


def e_2024_ord_res_a_4():
    f1 = lambda x: 3 + math.exp(x); f2 = lambda x: x * x - 3 * x + 2
    g = Fig(-2, 4.6, -1, 9)
    g.region(f2, lambda x: 0, 2, 4)
    g.axes(xt=(1, 2, 4), yt=(4,))
    g.curve(f1, -2, 1); g.curve(f2, 1, 4.5); g.curve(lin(1, 4), -1.6, 1.4, color=CORAL)
    pts(g, (1, 0), (2, 0), (4, 6), (0, 4)); abierto(g, 1, 3 + E)
    tag(g, -1.9, 5.2, "y = x + 4", CORAL, anchor="start")
    hecho(g, "2024-ord-res-a", "4", "Gráfica de f para a=−3: 3+eˣ hasta x=1 (con salto) y parábola x²−3x+2 desde x=1; recta tangente y=x+4 en x=0 y recinto sombreado entre x=2 y x=4")


def e_2024_ord_res_b_3():
    f2 = lambda x: 2 / x; f3 = lambda x: (x - 1) / 3
    g = Fig(0.4, 5.2, -0.3, 2.6)
    g.region(f2, lambda x: 0, 2, 3); g.region(f3, lambda x: 0, 3, 4)
    g.axes(xt=(1, 2, 3, 4), yt=(1, 2))
    g.curve(f2, 1, 3); g.curve(f3, 3, 5.1); g.curve(lambda x: x * x + 5 * x - 1, 0.4, 1)
    pts(g, (2, 1), (3, 2 / 3), (4, 1)); abierto(g, 1, 2)
    hecho(g, "2024-ord-res-b", "3", "Gráfica de f para a=5 y b=2 entre x=1 y x=5: hipérbola 2/x hasta x=3 y recta (x−1)/3 desde (3,2/3); recinto sombreado entre x=2 y x=4")


def e_2024_ord_res_b_4():
    f1 = lambda x: -x * x / 2 + x + 1; f2 = lambda x: 1 / (x - 1)
    g = Fig(-1.6, 5.2, -1.5, 2.2)
    g.region(f1, lambda x: 0, 0, 2); g.region(f2, lambda x: 0, 2, 4)
    g.axes(xt=(1, 2, 3, 4), yt=(1,))
    g.curve(f1, -1.5, 2); g.curve(f2, 2, 5.1)
    pts(g, (1, 1.5), (0, 1), (2, 1), (3, 0.5))
    tag(g, 1, 1.5, "máximo (1, 3/2)", dy=-12)
    hecho(g, "2024-ord-res-b", "4", "Gráfica de f: parábola con máximo (1, 3/2) hasta (2,1) y hipérbola 1/(x−1) decreciente desde ahí; recinto sombreado entre x=0 y x=4")


def e_2024_ord_sup_a_3():
    f = lambda x: -x * x + 6 * x; h = lambda x: x * x / 5
    g = Fig(-1, 7, -1.2, 10.5)
    g.region(f, h, 0, 5)
    g.axes(xt=(5, 6), yt=(5, 9))
    g.curve(f, -0.5, 6.5); g.curve(h, -0.8, 7, color=CORAL)
    pts(g, (0, 0), (5, 5), (3, 9))
    tag(g, -0.8, 9.6, "f(x) = −x² + 6x", anchor="start"); tag(g, -0.8, 8.4, "g(x) = x²/5", CORAL, anchor="start")
    hecho(g, "2024-ord-sup-a", "3", "Superficie de ampliación: región entre las parábolas f(x)=−x²+6x y g(x)=x²/5, que se cortan en (0,0) y (5,5)")


def e_2024_ord_sup_a_4():
    f1 = lambda x: 2 - x * x; f2 = lambda x: (x - 2) ** 2
    g = Fig(-1.6, 3.6, -0.3, 2.4)
    g.region(f1, lambda x: 1, -1, 1); g.region(lambda x: 1, f2, 1, 3)
    g.axes(xt=(-1, 1, 2, 3), yt=(1, 2))
    g.curve(f1, -1, 1); g.curve(f2, 1, 3); g.curve(lambda x: 1, -1, 3, color=CORAL)
    pts(g, (-1, 1), (1, 1), (3, 1), (0, 2), (2, 0))
    hecho(g, "2024-ord-sup-a", "4", "Recinto entre f (parábolas 2−x² en [−1,1] y (x−2)² en [1,3]) y la recta g(x)=1, con cortes en x=−1, 1 y 3")


def e_2024_ord_sup_b_4():
    f1 = lambda x: -x * x + 2 * x; f2 = lambda x: x * x - 2 * x
    g = Fig(-1.9, 3.6, -3.6, 4.6)
    g.region(lambda x: 2 * x, f1, -1, 1)
    g.axes(xt=(-1, 1, 2, 3), yt=(1, 2, -3))
    g.curve(f1, -1.8, 2); g.curve(f2, 2, 3.5); g.curve(lin(2, 0), -1.8, 2.2, color=CORAL)
    g.line((-1, -3), (-1, -2), color=INK, width=1.2); g.line((1, 1), (1, 2), color=INK, width=1.2)
    pts(g, (0, 0), (1, 1), (-1, -3), (2, 0), (1, 2), (-1, -2))
    tag(g, 3.4, 2.5, "y = 2x", CORAL, anchor="end")
    hecho(g, "2024-ord-sup-b", "4", "Recinto entre la recta y=2x y la parábola −x²+2x entre x=−1 y x=1, tangentes en el origen; la gráfica de f continúa con x²−2x desde x=2")


# ---------------------------------------------------------------- 2025
def e_2025_ord_a_2():
    f = lambda t: 500000 * (1 - math.exp(-0.2 * t))
    g = Fig(-2, 30, -50000, 560000)
    g.axes(xt=(5, 10, 20, 30))
    vh(g, y=500000)
    g.curve(f, 0, 29.5)
    pts(g, (11.51, 450000))
    tag(g, 29, 520000, "y = 500 000", CORAL, anchor="end"); tag(g, 11.5, 450000, "450 000 a las 11,51 h", dx=12, dy=22, anchor="start")
    hecho(g, "2025-ord-a", "2", "Curva creciente y cóncava N(t)=500000(1−e^(−0,2t)) que parte de 0 y tiende a la asíntota horizontal y=500000")


def e_2025_ord_b_3():
    f1 = lambda t: 5000 * (1 + 0.05 * t); f2 = lambda t: 5000 * 1.05 ** t
    g = Fig(-0.6, 8.6, 0, 7600)
    g.axes(xt=(1, 2, 3, 4, 5, 6, 7, 8), yt=(5000, 6000, 7000))
    g.curve(f1, 0, 1); g.curve(f2, 1, 8.5)
    pts(g, (0, 5000), (1, 5250), (2, 5512.5), (4, 6077.53))
    hecho(g, "2025-ord-b", "3", "Capital f(t): segmento de recta de 5000 a 5250 en el primer año y, después, curva exponencial 5000·1,05^t creciente")


def e_2025_ord_sup1_a_3():
    p = lambda x: -x * x + 5; h = lambda x: -x + 3
    g = Fig(-2.6, 3.6, -2, 6.2)
    g.region(p, h, -1, 2)
    g.axes(xt=(-1, 2), yt=(1, 3, 4, 5))
    g.curve(p, -2.4, 2.4); g.curve(h, -2.4, 3.4, color=CORAL)
    pts(g, (-1, 4), (2, 1), (0, 5))
    tag(g, 3.5, -1.3, "y = −x + 3", CORAL, anchor="end"); tag(g, -2.5, -1.3, "y = −x² + 5", anchor="start")
    hecho(g, "2025-ord-sup1-a", "3", "Recinto acotado entre la parábola y=−x²+5 y la recta y=−x+3, que se cortan en (−1,4) y (2,1)")


def e_2025_ord_sup1_a_4():
    f1 = lambda t: -t * t + 2 * t + 10; f2 = lambda t: t * t - 8 * t + 22.5
    g = Fig(-0.6, 5.6, 0, 12.4)
    g.axes(xt=(1, 2.5, 4, 5), yt=(6.5, 10, 11))
    g.curve(f1, 0, 2.5); g.curve(f2, 2.5, 5)
    pts(g, (0, 10), (1, 11), (2.5, 8.75), (4, 6.5), (5, 7.5))
    tag(g, 1, 11, "máximo (1, 11)", dy=-12); tag(g, 4, 6.5, "mínimo (4; 6,5)", dy=22)
    hecho(g, "2025-ord-sup1-a", "4", "Concentración f(t): sube de 10 a 11 en t=1, baja hasta el mínimo 6,5 en t=4 y sube a 7,5 en t=5; la gráfica es continua y suave en t=2,5")


def e_2025_ord_sup1_b_4():
    f = lambda t: 4 * t ** 3 - 24 * t * t + 36 * t + 100
    g = Fig(-0.6, 6.8, 0, 345)
    g.region(f, lambda t: 0, 0, 6)
    g.axes(xt=(1, 3, 6), yt=(100, 116, 200, 316))
    g.curve(f, 0, 6.6)
    pts(g, (0, 100), (1, 116), (3, 100), (6, 316))
    tag(g, 1.2, 116, "máx. rel. (1, 116)", dy=-12, anchor="start"); tag(g, 3, 100, "mín. rel. (3, 100)", dy=24)
    hecho(g, "2025-ord-sup1-b", "4", "Ventas V(t) en [0,6]: parte de 100, máximo relativo 116 en t=1, mínimo relativo 100 en t=3 y llega a 316 en t=6; sombreada el área bajo la curva")


def e_2025_ord_sup2_a_3():
    f = lambda t: -0.01 * t * t + 0.8 * t + 20
    g = Fig(-5, 65, -5, 40)
    g.axes(xt=(20, 40, 60), yt=(20, 32, 36))
    g.curve(f, 0, 60)
    pts(g, (0, 20), (40, 36), (60, 32), (20, 32))
    tag(g, 40, 36, "máximo (40, 36)", dy=-12)
    hecho(g, "2025-ord-sup2-a", "3", "Índice de audiencia f(t)=−0,01t²+0,8t+20: parte de 20, alcanza el máximo 36 a los 40 minutos y baja a 32 en t=60")


def e_2025_ord_sup2_a_4():
    f1 = lambda x: 10 + 2.5 * x; f2 = lambda x: x * x + 1; f3 = lambda x: 10 - 2.5 * x
    g = Fig(-5.4, 5.4, -1.6, 12)
    g.region(f1, lambda x: 0, -4, -2); g.region(f2, lambda x: 0, -2, 2); g.region(f3, lambda x: 0, 2, 4)
    g.axes(xt=(-4, -2, 2, 4), yt=(1, 5, 10))
    g.curve(f1, -4.4, -2); g.curve(f2, -2, 2); g.curve(f3, 2, 4.4)
    g.curve(lin(-1, 0.75), -2.5, 1.2, color=CORAL)
    pts(g, (-4, 0), (4, 0), (-2, 5), (2, 5), (0, 1), (-0.5, 1.25))
    tag(g, -1.5, -1.2, "tangente y = −x + 3/4", CORAL, anchor="start")
    hecho(g, "2025-ord-sup2-a", "4", "Gráfica de f: dos rectas y un arco de parábola x²+1 entre ellas, formando una tienda sobre el eje X de x=−4 a x=4; recta tangente y=−x+3/4 en x=−1/2")


# ---------------------------------------------------------------- 2026
def e_2026_ext_sup1_2a():
    f = lambda x: (x - 3) / (x - 1)
    g = Fig(-5, 7, -5, 6)
    g.axes(xt=(3,), yt=(1, 3))
    vh(g, x=1, y=1)
    g.curve(f, -5, 0.92); g.curve(f, 1.08, 7)
    pts(g, (3, 0), (0, 3))
    tag(g, 6.8, 2, "g(x) = (x − 3)/(x − 1)", anchor="end")
    hecho(g, "2026-ext-sup1", "2A", "Hipérbola creciente g(x)=(x−3)/(x−1) con asíntota vertical en la abscisa 1 y horizontal en la ordenada 1; corta a los ejes en (3,0) y (0,3)")


def e_2026_ord_sup1_2a():
    f1 = lambda x: x ** 3 - 6 * x * x + 9 * x; f2 = lambda x: (-6 * x + 18) / (x + 1)
    g = Fig(-1.4, 8.4, -7.4, 6.2)
    g.axes(xt=(1, 3, 5), yt=(4, -6))
    vh(g, y=-6)
    g.curve(f1, -1.3, 3); g.curve(f2, 3, 8.3)
    pts(g, (0, 0), (1, 4), (3, 0), (5, -2))
    tag(g, 1, 4, "máximo (1, 4)", dx=14, anchor="start", dy=-4)
    hecho(g, "2026-ord-sup1", "2A", "Gráfica de f para a=b=−6: cúbica con máximo (1,4) que toca al eje X en (3,0) y, desde ahí, rama de hipérbola decreciente con asíntota horizontal y=−6")


def e_2026_ord_sup1_2b():
    f = lambda x: 8 / (x + 2)
    g = Fig(-9, 7, -9, 9)
    g.axes(xt=(-6, -4, 2), yt=(-4, 4))
    vh(g, x=-2, y=0)
    g.curve(f, -9, -2.1); g.curve(f, -1.9, 7)
    g.curve(lin(-8, 0), -2, 1.1, color=CORAL); g.curve(lin(-8, -32), -4.1, -2.9, color=CORAL)
    pts(g, (-1, 8), (-3, -8), (0, 4), (2, 2))
    tag(g, 6.8, 2.2, "f(x) = 8/(x + 2)", anchor="end")
    hecho(g, "2026-ord-sup1", "2B", "Hipérbola f(x)=8/(x+2) con asíntotas x=−2 e y=0 y las dos rectas tangentes de pendiente −8: y=−8x en (−1,8) e y=−8x−32 en (−3,−8)")


def e_2026_ord_2():
    f1 = lambda x: x * x / 20; f2 = lambda x: 26 - 0.3 * x; f3 = lambda x: 36 - x * x / 100
    g = Fig(-5, 65, -3, 24)
    g.region(f1, lambda x: 0, 0, 20); g.region(f2, lambda x: 0, 20, 50); g.region(f3, lambda x: 0, 50, 60)
    g.axes(xt=(20, 50, 60), yt=(11, 20))
    g.curve(f1, 0, 20); g.curve(f2, 20, 50); g.curve(f3, 50, 60)
    pts(g, (0, 0), (20, 20), (50, 11), (60, 0))
    tag(g, 20, 20, "máximo (20, 20)", dy=-12)
    hecho(g, "2026-ord", "2", "Gráfica de f: parábola x²/20 hasta el pico (20,20), recta decreciente hasta (50,11) y parábola 36−x²/100 hasta (60,0); sombreada el área bajo la curva")


def enlazar():
    for exam, n, alt, name in FIGS:
        p = SOLS / f"{exam}.md"
        txt = p.read_text()
        if f"fig/{name}.svg" in txt:
            continue
        m = re.search(rf"^@@ {re.escape(n)}\s*$", txt, re.M)
        assert m, (exam, n)
        nxt = re.search(r"^@@ \w+\s*$", txt[m.end():], re.M)
        end = m.end() + nxt.start() if nxt else len(txt)
        paras = re.split(r"\n\s*\n", txt[m.end():end].strip("\n"))
        pat = r"[Gg]ráfica|esbo|[Rr]egión|[Rr]ecinto|superficie|zona|[Pp]arábola"
        ks = [i for i, q in enumerate(paras) if re.search(pat, q) and not q.lstrip().startswith("|")]
        k = ks[0] if ks else len(paras) - 1
        img = f'![{alt}](fig/{name}.svg){{fig-alt="{alt}" width="75%" fig-align="center"}}'
        paras.insert(k + 1, img)
        p.write_text(txt[:m.end()] + "\n" + "\n\n".join(paras) + "\n\n" + txt[end:])


if __name__ == "__main__":
    for fn in [v for k, v in sorted(globals().items()) if k.startswith("e_20")]:
        fn()
    enlazar()
    print(f"OK: {len(FIGS)} gráficas de funciones")
