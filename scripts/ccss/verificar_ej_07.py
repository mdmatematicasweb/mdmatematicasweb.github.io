#!/usr/bin/env python3
"""Verifica la relación de ejercicios ejercicios/2-bachillerato-ccss/07-aplicaciones-derivada/index.qmd.

Cada ejercicio se resuelve aquí con sympy, sin mirar el texto (monotonía, extremos, curvatura, optimización); después se
comprueba que (1) los datos aparecen en el enunciado y (2) cada resultado calculado aparece en el bloque de su apartado de la
solución escrita, con recuento exacto y con mutación integrada. Ver scripts/ccss/_ej_comun.py.

Uso:  python scripts/ccss/verificar_ej_07.py     (requiere `pip install sympy`)
Termina con código 0 si todo coincide y con código 1 si algo falla.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _ej_comun import Verificador, tx, dec  # noqa: E402
from sympy import (symbols, Rational as R, solve, limit, oo, exp, log, sqrt, simplify, N, diff, S, E, Interval,  # noqa: E402
                   Union, factor, apart, expand, Eq)
from sympy import solve_univariate_inequality as ineq  # noqa: E402

QMD = Path(__file__).resolve().parents[2] / "ejercicios" / "2-bachillerato-ccss" / "07-aplicaciones-derivada" / "index.qmd"
v = Verificador(QMD)
v.estructura()
x, t, p, q, w = symbols('x t p q w', real=True)

# Recuentos explícitos de apariciones por apartado cuando un resultado se repite en el mismo bloque.
CNT = {(1, 'a'): {'(1,3)': 2}, (10, 'b'): {'(2,6)': 2}, (24, 'a'): {'(-\\infty,1)\\cup(3,+\\infty)': 2, '(1,3)': 2},
       (19, 'b'): {'t=4': 2}, (22, 'd'): {'y=0': 2}}
RES = {}


def add(num, ap, *frags):
    RES.setdefault((num, ap), []).extend(frags)


def forma(num, ap, label, f, texto, expr, var=x):
    """«label=texto»: `expr` es la expresión sympy de lo que dice el texto y debe igualar a `f`."""
    v.ok(simplify(f - expr) == 0, f"ej. {num}{ap}: la forma escrita {texto!r} coincide con {f}")
    add(num, ap, f"{label}={texto}")


def eq(a, b):
    return simplify(a - b) == 0


def signos(f, var=x, dom=S.Reals):
    """(intervalos donde f>0, donde f<0) con sympy."""
    return ineq(f > 0, var, relational=False, domain=dom), ineq(f < 0, var, relational=False, domain=dom)


# ---------- 1 ----------
f1 = x**3 - 6 * x**2 + 9 * x + 1
v.enunciado(1, ["x^3-6x^2+9x+1"])
forma(1, 'a', "f'(x)", diff(f1, x), "3x^2-12x+9", 3 * x**2 - 12 * x + 9)
pos, neg = signos(diff(f1, x))
v.ok(pos == Union(Interval.open(-oo, 1), Interval.open(3, oo)) and neg == Interval.open(1, 3), "ej. 1a: signo de f'")
add(1, 'a', "3(x-1)(x-3)", "(-\\infty,1)\\cup(3,+\\infty)", "(1,3)")
v.ok(sorted(solve(diff(f1, x), x)) == [1, 3] and (f1.subs(x, 1), f1.subs(x, 3)) == (5, 1) and diff(f1, x, 2).subs(x, 1) < 0 < diff(f1, x, 2).subs(x, 3), "ej. 1b: máx (1,5), mín (3,1)")
add(1, 'b', "(1,5)", "(3,1)")
# ---------- 2 ----------
f2 = x * exp(-x)
v.enunciado(2, ["x\\,e^{-x}"])
forma(2, 'a', "f'(x)", diff(f2, x), "(1-x)e^{-x}", (1 - x) * exp(-x))
v.ok(solve(diff(f2, x), x) == [1] and diff(f2, x, 2).subs(x, 1) < 0 and f2.subs(x, 1) == exp(-1), "ej. 2b: máximo (1,1/e)")
add(2, 'b', "x=1", "(1,\\frac{1}{e})")
forma(2, 'c', "f''(x)", diff(f2, x, 2), "(x-2)e^{-x}", (x - 2) * exp(-x))
v.ok(solve(diff(f2, x, 2), x) == [2] and simplify(f2.subs(x, 2) - 2 / exp(2)) == 0, "ej. 2c: inflexión (2,2/e^2)")
add(2, 'c', "(2,\\frac{2}{e^2})")
# ---------- 3 ----------
f3 = x**4 - 4 * x**3
v.enunciado(3, ["x^4-4x^3"])
v.ok(eq(diff(f3, x), 4 * x**2 * (x - 3)) and sorted(solve(diff(f3, x), x)) == [0, 3], "ej. 3a: f'=4x^2(x-3)")
pos3, neg3 = signos(diff(f3, x))
v.ok(pos3 == Interval.open(3, oo) and neg3 == Union(Interval.open(-oo, 0), Interval.open(0, 3)) and f3.subs(x, 3) == -27, "ej. 3a: mínimo en (3,-27), sin extremo en 0")
add(3, 'a', "f'(x)=4x^3-12x^2=4x^2(x-3)", "(3,-27)", "no hay extremo")
pos3b, neg3b = signos(diff(f3, x, 2))
v.ok(eq(diff(f3, x, 2), 12 * x * (x - 2)) and pos3b == Union(Interval.open(-oo, 0), Interval.open(2, oo)) and neg3b == Interval.open(0, 2), "ej. 3b: curvatura")
add(3, 'b', "f''(x)=12x^2-24x=12x(x-2)", "(-\\infty,0)\\cup(2,+\\infty)", "(0,2)")
v.ok(sorted(solve(diff(f3, x, 2), x)) == [0, 2] and (f3.subs(x, 0), f3.subs(x, 2)) == (0, -16), "ej. 3c: inflexiones (0,0) y (2,-16)")
add(3, 'c', "(0,0)", "(2,-16)")
# ---------- 4 ----------
v.enunciado(4, ["x^3-6x^2+9x+1", "[0,5]"])
vals4 = {k_: f1.subs(x, k_) for k_ in (0, 1, 3, 5)}
v.ok(vals4 == {0: 1, 1: 5, 3: 1, 5: 21}, "ej. 4a: valores")
add(4, 'a', "f(0)=1", "f(1)=5", "f(3)=1", f"f(5)=125-150+45+1={vals4[5]}")
v.ok(max(vals4.values()) == 21 and min(vals4.values()) == 1 and [k_ for k_ in vals4 if vals4[k_] == 1] == [0, 3], "ej. 4b: máx 21 en 5; mín 1 en 0 y 3")
add(4, 'b', "!máximo absoluto** en $x=5$", "!$x=0$ y en $x=3$")
# ---------- 5 ----------
f5 = x**3 - 3 * x**2 + 2
v.enunciado(5, ["x^3-3x^2+2"])
v.ok(eq(diff(f5, x, 2), 6 * (x - 1)) and f5.subs(x, 1) == 0, "ej. 5: f''=6(x-1), inflexión (1,0)")
add(5, '', "f''(x)=6x-6=6(x-1)", "(1,0)", "f(1)=1-3+2=0", "cóncava", "convexa")
# ---------- 6 ----------
P6 = x * (20 - x)
v.ok(solve(diff(P6, x), x) == [10] and diff(P6, x, 2) < 0 and P6.subs(x, 10) == 100, "ej. 6: 10 y 10, producto 100")
v.enunciado(6, ["20"])
add(6, '', "P(x)=x(20-x)=20x-x^2", "P'(x)=20-2x=0", "x=10", "P''=-2<0", "producto $100$")
# ---------- 7 ----------
A7 = x * (30 - x)
v.ok(solve(diff(A7, x), x) == [15] and diff(A7, x, 2) < 0 and A7.subs(x, 15) == 225, "ej. 7: 15x15, área 225")
v.enunciado(7, ["60"])
add(7, '', "A(x)=x(30-x)=30x-x^2", "A'(x)=30-2x=0", "x=15", "225")
# ---------- 8 ----------
B8 = -2 * x**2 + 40 * x - 100
v.ok(solve(diff(B8, x), x) == [10] and diff(B8, x, 2) < 0 and B8.subs(x, 10) == 100, "ej. 8: x=10, B=100")
v.enunciado(8, ["-2x^2+40x-100"])
add(8, '', "B'(x)=-4x+40=0", "x=10", f"B(10)=-200+400-100={B8.subs(x, 10)}")
# ---------- 9 ----------
f9 = log(x**2 + 1)
v.enunciado(9, ["\\ln(x^2+1)"])
forma(9, 'a', "f'(x)", diff(f9, x), "\\frac{2x}{x^2+1}", 2 * x / (x**2 + 1))
pos9, neg9 = signos(diff(f9, x))
v.ok(pos9 == Interval.open(0, oo) and neg9 == Interval.open(-oo, 0), "ej. 9a: monotonía")
add(9, 'a', "(-\\infty,0)", "(0,+\\infty)")
v.ok(f9.subs(x, 0) == 0 and diff(f9, x, 2).subs(x, 0) > 0, "ej. 9b: mínimo (0,0)")
add(9, 'b', "(0,0)", "f(0)=\\ln1=0")
f9pp = diff(f9, x, 2)
v.ok(simplify(f9pp - 2 * (1 - x**2) / (x**2 + 1)**2) == 0 and sorted(solve(f9pp, x)) == [-1, 1] and simplify(f9.subs(x, 1) - log(2)) == 0, "ej. 9c: f'' e inflexiones")
add(9, 'c', "f''(x)=\\frac{2(x^2+1)-2x\\cdot2x}{(x^2+1)^2}=\\frac{2(1-x^2)}{(x^2+1)^2}", "(-1,\\ln2)", "(1,\\ln2)")
# ---------- 10 ----------
B10 = t**3 - 12 * t**2 + 36 * t - 5
v.enunciado(10, ["t^3-12t^2+36t-5", "1\\le t\\le7"])
forma(10, 'a', "B'(t)", diff(B10, t), "3t^2-24t+36", 3 * t**2 - 24 * t + 36)
v.ok(sorted(solve(diff(B10, t), t)) == [2, 6] and eq(diff(B10, t), 3 * (t - 2) * (t - 6)), "ej. 10a")
add(10, 'a', "3(t-2)(t-6)", "t=2", "t=6")
pos10, neg10 = signos(diff(B10, t), t, Interval.open(1, 7))
v.ok(pos10 == Union(Interval.open(1, 2), Interval.open(6, 7)) and neg10 == Interval.open(2, 6) and (B10.subs(t, 2), B10.subs(t, 6)) == (27, -5), "ej. 10b: monotonía y extremos")
add(10, 'b', "(1,2)\\cup(6,7)", "(2,6)", "B(2)=27", "B(6)=-5")
v.ok(eq(diff(B10, t, 2), 6 * t - 24) and B10.subs(t, 4) == 11 and diff(B10, t, 2).subs(t, 4) == 0, "ej. 10c: inflexión en t=4")
add(10, 'c', "B''(t)=6t-24=6(t-4)", "B(4)=11", "cóncava en $(1,4)$", "convexa en $(4,7)$")
vals10 = {k_: B10.subs(t, k_) for k_ in (1, 2, 6, 7)}
v.ok(vals10 == {1: 20, 2: 27, 6: -5, 7: 2}, "ej. 10d: valores")
add(10, 'd', "B(1)=20", "B(2)=27", "B(6)=-5", "B(7)=2")
# ---------- 11 ----------
I11 = p * (400 - 40 * (p - 8))
v.ok(expand(I11) == 720 * p - 40 * p**2 and solve(diff(I11, p), p) == [9] and diff(I11, p, 2) < 0 and I11.subs(p, 9) == 3240 and 400 - 40 * (9 - 8) == 360 and I11.subs(p, 8) == 3200, "ej. 11")
v.enunciado(11, ["400 entradas", "8 €", "40 espectadores"])
add(11, 'a', "400-40(p-8)=720-40p", "I(p)=p(720-40p)=720p-40p^2")
add(11, 'b', "I'(p)=720-80p=0", "p=9")
add(11, 'c', "I''(p)=-80<0", "720-40\\cdot9=360", "I(9)=3240")
add(11, 'd', "I(8)=3200", "40 €")
# ---------- 12 ----------
P12 = 2 * x + 1800 / x
v.ok(solve(diff(P12, x), x) == [-30, 30] and diff(P12, x, 2).subs(x, 30) > 0 and P12.subs(x, 30) == 120, "ej. 12A: 30x30, 120")
v.enunciado(12, ["900", "x^3-3x^2"])
add(12, 'A.a', "P(x)=2x+\\frac{1800}{x}")
add(12, 'A.b', "P'(x)=2-\\frac{1800}{x^2}=0", "x^2=900", "x=30", "P''(x)=\\frac{3600}{x^3}>0")
add(12, 'A.c', "30\\times30", "P(30)=60+60=120")
f12 = x**3 - 3 * x**2
v.ok(eq(diff(f12, x), 3 * x * (x - 2)), "ej. 12B: f'")
pos12, neg12 = signos(diff(f12, x))
v.ok(pos12 == Union(Interval.open(-oo, 0), Interval.open(2, oo)) and neg12 == Interval.open(0, 2), "ej. 12Ba")
add(12, 'B.a', "f'(x)=3x^2-6x=3x(x-2)", "(-\\infty,0)\\cup(2,+\\infty)", "(0,2)")
v.ok((f12.subs(x, 0), f12.subs(x, 2)) == (0, -4), "ej. 12Bb")
add(12, 'B.b', "(0,0)", "(2,-4)")
v.ok(eq(diff(f12, x, 2), 6 * (x - 1)) and f12.subs(x, 1) == -2, "ej. 12Bc")
add(12, 'B.c', "f''(x)=6x-6=6(x-1)", "(1,-2)")
# ---------- 13 ----------
C13 = R(2, 100) * x**2 + 8 * x + 1800
Cm13 = C13 / x
v.enunciado(13, ["0{,}02x^2+8x+1800"])
forma(13, 'a', "C_m(x)", Cm13, "0{,}02x+8+\\frac{1800}{x}", R(2, 100) * x + 8 + 1800 / x)
v.ok([r for r in solve(diff(Cm13, x), x) if r > 0] == [300] and diff(Cm13, x, 2).subs(x, 300) > 0, "ej. 13b: x=300 mínimo")
add(13, 'b', "C_m'(x)=0{,}02-\\frac{1800}{x^2}=0", "x^2=90000", "x=300", "C_m''(x)=\\frac{3600}{x^3}>0")
v.ok(Cm13.subs(x, 300) == 20, "ej. 13c")
add(13, 'c', f"C_m(300)=6+8+6={Cm13.subs(x, 300)}")
v.ok(diff(C13, x).subs(x, 300) == 20, "ej. 13d")
add(13, 'd', "C'(x)=0{,}04x+8", f"C'(300)=12+8={diff(C13, x).subs(x, 300)}")
# ---------- 14 ----------
f14 = (x**2 + 1) / x
v.enunciado(14, ["\\dfrac{x^2+1}{x}"])
v.ok(apart(f14, x) == x + 1 / x and limit(f14, x, 0, '+') == oo and limit(f14, x, 0, '-') == -oo and limit(f14 - x, x, oo) == 0 and limit(f14 - x, x, -oo) == 0, "ej. 14a: asíntotas x=0, y=x")
add(14, 'a', "\\operatorname{Dom}f=\\mathbb{R}\\setminus\\{0\\}", "\\lim_{x\\to0^+}f(x)=+\\infty", "\\lim_{x\\to0^-}f(x)=-\\infty", "x=0", "y=x")
forma(14, 'b', "f'(x)", diff(f14, x), "1-\\frac{1}{x^2}=\\frac{x^2-1}{x^2}", (x**2 - 1) / x**2)
pos14, neg14 = signos(diff(f14, x), x, S.Reals - {0})
v.ok(pos14 == Union(Interval.open(-oo, -1), Interval.open(1, oo)) and neg14 == Union(Interval.open(-1, 0), Interval.open(0, 1)) and (f14.subs(x, -1), f14.subs(x, 1)) == (-2, 2), "ej. 14b")
add(14, 'b', "(-1,-2)", "(1,2)")
v.ok(simplify(diff(f14, x, 2) - 2 / x**3) == 0 and solve(diff(f14, x, 2), x) == [], "ej. 14c: f''=2/x^3")
add(14, 'c', "f''(x)=\\frac{2}{x^3}", "!No hay puntos de inflexión")
v.ok(solve(x**2 + 1, x, domain=S.Reals) == [], "ej. 14d: no corta a los ejes")
add(14, 'd', "x^2+1\\ne0", "(1,2)", "(-1,-2)")
# ---------- 15 ----------
I15 = x * (60 - x / 2)
B15 = I15 - (10 * x + 400)
v.ok(expand(I15) == 60 * x - x**2 / 2 and expand(B15) == -x**2 / 2 + 50 * x - 400 and solve(diff(B15, x), x) == [50] and diff(B15, x, 2) < 0 and B15.subs(x, 50) == 850 and (60 - x / 2).subs(x, 50) == 35, "ej. 15")
v.enunciado(15, ["60-\\dfrac{x}{2}", "10x+400"])
add(15, 'a', "I(x)=x(60-\\frac{x}{2})=60x-\\frac{x^2}{2}")
add(15, 'b', "B(x)=60x-\\frac{x^2}{2}-10x-400=-\\frac{x^2}{2}+50x-400")
add(15, 'c', "B'(x)=-x+50=0", "x=50", "B''(x)=-1<0", f"B(50)=-1250+2500-400={B15.subs(x, 50)}")
add(15, 'd', "p=60-\\frac{50}{2}=35")
# ---------- 16 ----------
f16 = x**3 - 3 * x**2 - 9 * x + 5
v.enunciado(16, ["x^3-3x^2-9x+5", "[-2,4]"])
forma(16, 'a', "f'(x)", diff(f16, x), "3x^2-6x-9=3(x^2-2x-3)=3(x-3)(x+1)", 3 * (x - 3) * (x + 1))
v.ok(sorted(solve(diff(f16, x), x)) == [-1, 3], "ej. 16b")
add(16, 'b', "x=-1", "x=3")
vals16 = {k_: f16.subs(x, k_) for k_ in (-2, -1, 3, 4)}
v.ok(vals16 == {-2: 3, -1: 10, 3: -22, 4: -15}, "ej. 16c")
add(16, 'c', f"f(-2)=-8-12+18+5={vals16[-2]}", f"f(-1)=-1-3+9+5={vals16[-1]}", f"f(3)=27-27-27+5={vals16[3]}", f"f(4)=64-48-36+5={vals16[4]}")
v.ok(max(vals16.values()) == 10 and min(vals16.values()) == -22, "ej. 16d")
add(16, 'd', "!máximo absoluto es $10$, en $x=-1$", "!mínimo absoluto es $-22$, en $x=3$")
# ---------- 17 ----------
C17 = 20000 / q + q / 2
v.enunciado(17, ["\\dfrac{20000}{q}+0{,}5q"])
add(17, 'a', "!(gestión) decrece con $q$", "!(almacenamiento) crece con $q$")
forma(17, 'b', "C'(q)", diff(C17, q), "-\\frac{20000}{q^2}+0{,}5", -20000 / q**2 + R(1, 2), var=q)
v.ok([r for r in solve(diff(C17, q), q) if r > 0] == [200] and diff(C17, q, 2).subs(q, 200) > 0, "ej. 17c")
add(17, 'c', "q^2=40000", "q=200", "C''(q)=\\frac{40000}{q^3}>0")
v.ok((C17.subs(q, 200), C17.subs(q, 100), C17.subs(q, 400)) == (200, 250, 250), "ej. 17d")
add(17, 'd', f"C(200)=100+100={C17.subs(q, 200)}", f"C(100)=200+50={C17.subs(q, 100)}", f"C(400)=50+200={C17.subs(q, 400)}")
# ---------- 18 ----------
f18 = x**4 - 6 * x**2
v.enunciado(18, ["x^4-6x^2"])
v.ok(sorted(solve(diff(f18, x), x), key=lambda z: float(z)) == [-sqrt(3), 0, sqrt(3)], "ej. 18a")
add(18, 'a', "f'(x)=4x^3-12x=4x(x^2-3)=0", "!=0\\Rightarrow x=0", "!x=\\pm\\sqrt{3}")
v.ok(eq(diff(f18, x, 2), 12 * x**2 - 12) and diff(f18, x, 2).subs(x, 0) == -12 and diff(f18, x, 2).subs(x, sqrt(3)) == 24 and f18.subs(x, sqrt(3)) == -9, "ej. 18b")
add(18, 'b', "f''(x)=12x^2-12", "f''(0)=-12<0", "f''(\\pm\\sqrt{3})=24>0", "(0,0)", "-9")
v.ok(sorted(solve(diff(f18, x, 2), x)) == [-1, 1] and f18.subs(x, 1) == -5, "ej. 18c")
add(18, 'c', "x=\\pm1", "(-1,-5)", "(1,-5)")
pos18, neg18 = signos(diff(f18, x, 2))
v.ok(pos18 == Union(Interval.open(-oo, -1), Interval.open(1, oo)) and neg18 == Interval.open(-1, 1), "ej. 18d")
add(18, 'd', "(-\\infty,-1)\\cup(1,+\\infty)", "(-1,1)")
# ---------- 19 ----------
G19 = 10 * t * exp(-t / 4)
v.enunciado(19, ["10\\,t\\,e^{-t/4}"])
forma(19, 'a', "G'(t)", diff(G19, t), "10(1-\\frac{t}{4})e^{-t/4}", 10 * (1 - t / 4) * exp(-t / 4), var=t)
v.ok(solve(diff(G19, t), t) == [4] and simplify(G19.subs(t, 4) - 40 * exp(-1)) == 0 and round(float(N(G19.subs(t, 4))), 2) == 14.72, "ej. 19b")
add(19, 'b', "t=4", f"G(4)=40e^{{-1}}\\approx{dec(N(G19.subs(t, 4)), 2)}")
forma(19, 'c', "G''(t)", diff(G19, t, 2), "\\frac{5}{8}(t-8)e^{-t/4}", R(5, 8) * (t - 8) * exp(-t / 4), var=t)
v.ok(solve(diff(G19, t, 2), t) == [8] and simplify(G19.subs(t, 8) - 80 * exp(-2)) == 0 and round(float(N(G19.subs(t, 8))), 2) == 10.83, "ej. 19d")
add(19, 'd', "t=8", f"(8;\\ {dec(N(G19.subs(t, 8)), 2)})")
# ---------- 20 ----------
a_, b_ = symbols('a b')
s20 = solve([3 + 2 * a_ + b_, 27 + 6 * a_ + b_], [a_, b_])
f20 = x**3 + s20[a_] * x**2 + s20[b_] * x
v.ok(s20 == {a_: -6, b_: 9} and diff(f20, x, 2).subs(x, 1) == -6 and diff(f20, x, 2).subs(x, 3) == 6 and (f20.subs(x, 1), f20.subs(x, 3)) == (4, 0), "ej. 20")
v.enunciado(20, ["x^3+ax^2+bx", "x=1", "x=3"])
add(20, 'a', "f'(1)=3+2a+b=0", "f'(3)=27+6a+b=0")
add(20, 'b', "24+4a=0", "a=-6", "b=-3-2a=9", "f(x)=x^3-6x^2+9x")
add(20, 'c', "f''(x)=6x+2a=6x-12", "f''(1)=-6<0", "f''(3)=6>0")
add(20, 'd', "f(1)=1-6+9=4", "f(3)=27-54+27=0")
# ---------- 21 ----------
C21 = 3600 / w + w / 4
v.enunciado(21, ["\\dfrac{3600}{v}+\\dfrac{v}{4}"])
forma(21, 'a', "C'(v)", diff(C21, w), "-\\frac{3600}{v^2}+\\frac{1}{4}", -3600 / w**2 + R(1, 4), var=w)
v.ok([r for r in solve(diff(C21, w), w) if r > 0] == [120] and diff(C21, w, 2).subs(w, 120) > 0, "ej. 21b")
add(21, 'b', "v^2=14400", "v=120", "C''(v)=\\frac{7200}{v^3}>0")
v.ok(C21.subs(w, 120) == 60, "ej. 21c")
add(21, 'c', f"C(120)=30+30={C21.subs(w, 120)}")
add(21, 'd', "el coste del conductor", "se gasta más combustible")
# ---------- 22 ----------
f22 = x / (x**2 + 1)
v.enunciado(22, ["\\dfrac{x}{x^2+1}"])
v.ok(f22.subs(x, 0) == 0 and solve(f22, x) == [0], "ej. 22a")
add(22, 'a', "\\operatorname{Dom}f=\\mathbb{R}", "f(0)=0", "x=0")
add(22, 'b', f"\\lim_{{x\\to\\pm\\infty}}f(x)={limit(f22, x, oo)}", "y=0")
v.ok(limit(f22, x, -oo) == 0, "ej. 22b: -∞")
forma(22, 'c', "f'(x)", diff(f22, x), "\\frac{1-x^2}{(x^2+1)^2}", (1 - x**2) / (x**2 + 1)**2)
pos22, neg22 = signos(diff(f22, x))
v.ok(pos22 == Interval.open(-1, 1) and neg22 == Union(Interval.open(-oo, -1), Interval.open(1, oo)) and (f22.subs(x, -1), f22.subs(x, 1)) == (-R(1, 2), R(1, 2)), "ej. 22c")
add(22, 'c', "(-1,-\\frac{1}{2})", "(1,\\frac{1}{2})")
add(22, 'd', "simétrica", "y=0")
# ---------- 23 ----------
R23 = 40 * log(t + 1) - 5 * t
v.enunciado(23, ["40\\ln(t+1)-5t"])
forma(23, 'a', "R'(t)", diff(R23, t), "\\frac{40}{t+1}-5", 40 / (t + 1) - 5, var=t)
v.ok(solve(diff(R23, t), t) == [7], "ej. 23b")
add(23, 'b', "t+1=8", "t=7")
v.ok(simplify(diff(R23, t, 2) + 40 / (t + 1)**2) == 0 and diff(R23, t, 2).subs(t, 7) == -R(5, 8) and round(float(N(R23.subs(t, 7))), 2) == 48.18, "ej. 23c")
add(23, 'c', "R''(t)=-\\frac{40}{(t+1)^2}", "R''(7)=-\\frac{40}{64}=-\\frac{5}{8}<0", f"R(7)=40\\ln8-35\\approx{dec(N(R23.subs(t, 7)), 2)}")
add(23, 'd', "empeora")
# ---------- 24 ----------
f24 = x**3 - 6 * x**2 + 9 * x + 2
v.enunciado(24, ["x^3-6x^2+9x+2"])
pos24, neg24 = signos(diff(f24, x))
v.ok(eq(diff(f24, x), 3 * (x - 1) * (x - 3)) and pos24 == Union(Interval.open(-oo, 1), Interval.open(3, oo)) and neg24 == Interval.open(1, 3), "ej. 24a")
add(24, 'a', "f'(x)=3x^2-12x+9=3(x-1)(x-3)", "(-\\infty,1)\\cup(3,+\\infty)", "(1,3)")
v.ok((f24.subs(x, 1), f24.subs(x, 3)) == (6, 2), "ej. 24b")
add(24, 'b', "(1,6)", "(3,2)", "f(1)=1-6+9+2=6", "f(3)=27-54+27+2=2")
v.ok(solve(diff(f24, x, 2), x) == [2] and f24.subs(x, 2) == 4, "ej. 24c")
add(24, 'c', "f''(x)=6x-12=0", "x=2", "(2,4)", "f(2)=8-24+18+2=4")
v.ok(diff(f24, x).subs(x, 2) == -3 and simplify(4 - 3 * (x - 2) - (-3 * x + 10)) == 0, "ej. 24d")
add(24, 'd', "f'(2)=12-24+9=-3", "y-4=-3(x-2)", "y=-3x+10")
# ---------- 25 ----------
P25 = x * (24 - x)**2
v.ok(sorted(solve(diff(P25, x), x)) == [8, 24] and eq(diff(P25, x), 3 * (x - 8) * (x - 24)) and diff(P25, x, 2).subs(x, 8) < 0 and P25.subs(x, 8) == 2048, "ej. 25A")
v.enunciado(25, ["24", "e^{-x^2}"])
add(25, 'A.a', "P(x)=x(24-x)^2", "0<x<24")
add(25, 'A.b', "P'(x)=(24-x)^2-2x(24-x)=(24-x)(24-3x)", "x=24", "x=8")
add(25, 'A.c', "P(8)=8\\cdot256=2048")
g25 = exp(-x**2)
forma(25, 'B.a', "g'(x)", diff(g25, x), "-2x\\,e^{-x^2}".replace("\\,", ""), -2 * x * exp(-x**2))
add(25, 'B.a', "(0,1)")
v.ok(sorted(solve(diff(g25, x, 2), x), key=lambda z: float(z)) == [-sqrt(2) / 2, sqrt(2) / 2] and simplify(diff(g25, x, 2) - (4 * x**2 - 2) * exp(-x**2)) == 0 and simplify(g25.subs(x, sqrt(2) / 2) - exp(-R(1, 2))) == 0, "ej. 25Bb")
add(25, 'B.b', "g''(x)=-2e^{-x^2}+4x^2e^{-x^2}=(4x^2-2)e^{-x^2}", "x=\\pm\\frac{\\sqrt{2}}{2}", "e^{-1/2}")
add(25, 'B.c', f"\\lim_{{x\\to\\pm\\infty}}g(x)={limit(g25, x, oo)}", "y=0")

# ---------- comprobación de todos los resultados en su apartado ----------
for (num, ap), frags in RES.items():
    n = CNT.get((num, ap), {})
    v.solucion(num, [(f, n[f]) if f in n else f for f in frags], ap)
v.fin()
