#!/usr/bin/env python3
"""Verifica la relación de ejercicios ejercicios/2-bachillerato-ccss/06-derivadas/index.qmd.

Cada ejercicio se resuelve aquí con sympy, sin mirar el texto (derivadas, tangentes, derivabilidad, parámetros, L'Hôpital);
después se comprueba que (1) los datos aparecen en el enunciado y (2) cada resultado calculado aparece en el bloque de su
apartado de la solución escrita, con recuento exacto y con mutación integrada. Ver scripts/ccss/_ej_comun.py.

Uso:  python scripts/ccss/verificar_ej_06.py     (requiere `pip install sympy`)
Termina con código 0 si todo coincide y con código 1 si algo falla.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _ej_comun import Verificador, tx, dec  # noqa: E402
from sympy import (symbols, Rational as R, solve, limit, oo, exp, log, sqrt, simplify, N, diff, Abs, S, E, Eq,  # noqa: E402
                   Piecewise, expand)

QMD = Path(__file__).resolve().parents[2] / "ejercicios" / "2-bachillerato-ccss" / "06-derivadas" / "index.qmd"
v = Verificador(QMD)
v.estructura()
x, t, h, a, b, c = symbols('x t h a b c', real=True)

# Recuentos explícitos de apariciones por apartado cuando un resultado se repite en el mismo bloque.
CNT = {}
RES = {}


def add(num, ap, *frags):
    RES.setdefault((num, ap), []).extend(frags)


def der(num, ap, label, f, texto, forma, var=x):
    """«label=texto»: `forma` es la expresión sympy de lo que dice el texto y debe ser igual a la derivada calculada."""
    v.ok(simplify(diff(f, var) - forma) == 0, f"ej. {num}{ap}: la forma escrita {texto!r} coincide con la derivada de {f}")
    add(num, ap, f"{label}={texto}")


def tangente(num, ap, f, x0, texto):
    """Recta tangente en x0: comprueba que `texto` (forma y=…) es la recta calculada (expr sympy en x)."""
    y0 = f.subs(x, x0); m0 = diff(f, x).subs(x, x0)
    return y0, m0


# ---------- 1 ----------
f1 = x**2 - 3 * x
tvm = (f1.subs(x, 4) - f1.subs(x, 1)) / 3
v.enunciado(1, ["x^2-3x", "[1,4]"])
add(1, 'a', f"\\frac{{f(4)-f(1)}}{{4-1}}=\\frac{{{f1.subs(x, 4)}-({f1.subs(x, 1)})}}{{3}}={tvm}")
d1 = limit((f1.subs(x, 2 + h) - f1.subs(x, 2)) / h, h, 0)
v.ok(expand(f1.subs(x, 2 + h)) == h**2 + h - 2 and expand(f1.subs(x, 2 + h) - f1.subs(x, 2)) == h**2 + h and d1 == 1, "ej. 1b: f(2+h) y f'(2)")
add(1, 'b', "f(2+h)=(2+h)^2-3(2+h)=h^2+h-2", f"f'(2)=\\lim_{{h\\to0}}\\frac{{f(2+h)-f(2)}}{{h}}=\\lim_{{h\\to0}}\\frac{{h^2+h}}{{h}}=\\lim_{{h\\to0}}(h+1)={d1}")
# ---------- 2 ----------
v.enunciado(2, ["3x^4-2x^2+7x", "\\sqrt{x}+\\dfrac{2}{x}", "5e^x-3\\ln x"])
der(2, 'a', "f'(x)", 3 * x**4 - 2 * x**2 + 7 * x, "12x^3-4x+7", 12 * x**3 - 4 * x + 7)
der(2, 'b', "g'(x)", sqrt(x) + 2 / x, "\\frac{1}{2\\sqrt{x}}-\\frac{2}{x^2}", 1 / (2 * sqrt(x)) - 2 / x**2)
der(2, 'c', "h'(x)", 5 * exp(x) - 3 * log(x), "5e^x-\\frac{3}{x}", 5 * exp(x) - 3 / x)
# ---------- 3 ----------
v.enunciado(3, ["x^2e^x", "\\dfrac{x+1}{x-2}", "x\\ln x"])
der(3, 'a', "f'(x)", x**2 * exp(x), "(x^2+2x)e^x", (x**2 + 2 * x) * exp(x))
der(3, 'b', "g'(x)", (x + 1) / (x - 2), "\\frac{-3}{(x-2)^2}", -3 / (x - 2)**2)
der(3, 'c', "h'(x)", x * log(x), "\\ln x+1", log(x) + 1)
# ---------- 4 ----------
v.enunciado(4, ["(3x-1)^5", "e^{x^2-x}", "\\ln(x^2+1)", "\\sqrt{2x+3}"])
der(4, 'a', "f'(x)", (3 * x - 1)**5, "15(3x-1)^4", 15 * (3 * x - 1)**4)
der(4, 'b', "g'(x)", exp(x**2 - x), "(2x-1)e^{x^2-x}", (2 * x - 1) * exp(x**2 - x))
der(4, 'c', "h'(x)", log(x**2 + 1), "\\frac{2x}{x^2+1}", 2 * x / (x**2 + 1))
der(4, 'd', "k'(x)", sqrt(2 * x + 3), "\\frac{1}{\\sqrt{2x+3}}", 1 / sqrt(2 * x + 3))
# ---------- 5 ----------
f5 = x**3 - 2 * x
y0, m0 = f5.subs(x, 1), diff(f5, x).subs(x, 1)
v.ok((y0, m0) == (-1, 1) and simplify(y0 + m0 * (x - 1) - (x - 2)) == 0, "ej. 5: tangente y=x-2")
v.enunciado(5, ["x^3-2x"])
add(5, '', "f(1)=1-2=-1", "f'(x)=3x^2-2", "f'(1)=1", "y-(-1)=1\\cdot(x-1)", "y=x-2")
# ---------- 6 ----------
f6 = x**2 - 4 * x + 1
x6 = solve(diff(f6, x) - 2, x)
v.ok(x6 == [3] and f6.subs(x, 3) == -2 and simplify(-2 + 2 * (x - 3) - (2 * x - 8)) == 0, "ej. 6: tangente y=2x-8")
v.enunciado(6, ["x^2-4x+1", "y=2x+5"])
add(6, '', "f'(x)=2x-4=2", "x=3", "f(3)=9-12+1=-2", "y-(-2)=2(x-3)", "y=2x-8")
# ---------- 7 ----------
v.ok(limit(x**2 + 1, x, 1, '-') == 2 == limit(3 * x - 1, x, 1, '+') == (1**2 + 1) and diff(x**2 + 1, x).subs(x, 1) == 2 and diff(3 * x - 1, x) == 3, "ej. 7: continua y no derivable")
v.enunciado(7, ["x^2+1&x\\le1", "3x-1&x>1"])
add(7, '', "f(1)=1^2+1=2", "f'(1^-)=2", "f'(1^+)=3", "no derivable")
# ---------- 8 ----------
s8 = solve([2 * 3 + a, 1 + a + b - 2], [a, b])
v.ok(s8 == {a: -6, b: 7}, "ej. 8: a=-6, b=7")
v.enunciado(8, ["x^2+ax+b", "(1,2)", "x=3"])
add(8, '', "f'(3)=6+a=0", f"a={s8[a]}", f"b=2-1+6={s8[b]}", "f(x)=x^2-6x+7")
# ---------- 9 ----------
v.enunciado(9, ["\\lim_{x\\to0}\\frac{e^{2x}-1}{x}", "\\lim_{x\\to+\\infty}\\frac{x^3}{e^x}", "\\lim_{x\\to1}\\frac{\\ln x}{x^2-1}"])
add(9, 'a', f"\\lim_{{x\\to0}}\\frac{{e^{{2x}}-1}}{{x}}=\\lim_{{x\\to0}}\\frac{{2e^{{2x}}}}{{1}}={limit((exp(2 * x) - 1) / x, x, 0)}")
add(9, 'b', f"\\lim_{{x\\to+\\infty}}\\frac{{x^3}}{{e^x}}=\\lim_{{x\\to+\\infty}}\\frac{{3x^2}}{{e^x}}=\\lim_{{x\\to+\\infty}}\\frac{{6x}}{{e^x}}=\\lim_{{x\\to+\\infty}}\\frac{{6}}{{e^x}}={limit(x**3 / exp(x), x, oo)}")
add(9, 'c', f"\\lim_{{x\\to1}}\\frac{{\\ln x}}{{x^2-1}}=\\lim_{{x\\to1}}\\frac{{1/x}}{{2x}}=\\lim_{{x\\to1}}\\frac{{1}}{{2x^2}}={tx(limit(log(x) / (x**2 - 1), x, 1))}")
# ---------- 10 ----------
C10 = R(5, 100) * x**2 + 4 * x + 500
v.enunciado(10, ["0{,}05x^2+4x+500", "100", "120"])
tm = (C10.subs(x, 120) - C10.subs(x, 100)) / 20
add(10, 'a', f"C(100)={C10.subs(x, 100)}", f"C(120)={C10.subs(x, 120)}", f"\\frac{{1700-1400}}{{120-100}}={tm}")
v.ok((C10.subs(x, 100), C10.subs(x, 120), tm) == (1400, 1700, 15), "ej. 10a")
der(10, 'b', "C'(x)", C10, "0{,}1x+4", R(1, 10) * x + 4)
add(10, 'b', f"C'(100)=0{{,}}1\\cdot100+4={diff(C10, x).subs(x, 100)}")
add(10, 'c', f"C(101)-C(100)={dec(C10.subs(x, 101), 2)}-{C10.subs(x, 100)}={dec(C10.subs(x, 101) - C10.subs(x, 100), 2)}")
m10 = diff(C10, x).subs(x, 100)
v.ok(simplify(C10.subs(x, 100) + m10 * (x - 100) - 14 * x) == 0 and 14 * 103 == 1442 and C10.subs(x, 103) == R(144245, 100), "ej. 10d: tangente y=14x; C(103)=1442,45")
add(10, 'd', "y-1400=14(x-100)", "y=14x", f"C(103)\\approx14\\cdot103={14 * 103}", f"C(103)={dec(C10.subs(x, 103), 2)}")
# ---------- 11 ----------
V11 = x * exp(-x / 10)
v.enunciado(11, ["x\\,e^{-x/10}"])
der(11, 'a', "V'(x)", V11, "(1-\\frac{x}{10})e^{-x/10}", (1 - x / 10) * exp(-x / 10))
v.ok(diff(V11, x).subs(x, 10) == 0 and diff(V11, x).subs(x, 20) == -exp(-2) and round(float(N(-exp(-2))), 2) == -0.14, "ej. 11b-c")
add(11, 'b', "V'(10)=(1-1)e^{-1}=0")
add(11, 'c', f"V'(20)=(1-2)e^{{-2}}=-e^{{-2}}\\approx{dec(N(-exp(-2)), 2)}")
v.ok(V11.subs(x, 0) == 0 and diff(V11, x).subs(x, 0) == 1, "ej. 11d: tangente y=x")
add(11, 'd', "V(0)=0", "V'(0)=1", "y=x")
# ---------- 12 ----------
s12 = solve([a + b - 2, 2 * a - 1], [a, b])
v.ok(s12 == {a: R(1, 2), b: R(3, 2)} and limit(3 - 1 / x, x, 1, '+') == 2 and diff(3 - 1 / x, x).subs(x, 1) == 1, "ej. 12A: a=1/2, b=3/2")
v.enunciado(12, ["ax^2+b&x\\le1", "3-\\dfrac1x&x>1", "\\dfrac{x^2+1}{x-2}"])
add(12, 'A.a', "f(1)=a+b", "a+b=2")
add(12, 'A.b', "f'(x)=2ax", "f'(1^-)=2a=f'(1^+)=1", f"a={tx(s12[a])}", f"b={tx(s12[b])}")
f2 = 3 - 1 / x
y2, m2 = f2.subs(x, 2), diff(f2, x).subs(x, 2)
v.ok((y2, m2) == (R(5, 2), R(1, 4)) and simplify(y2 + m2 * (x - 2) - (x / 4 + 2)) == 0, "ej. 12Ac: y=x/4+2")
add(12, 'A.c', "f(2)=3-\\frac{1}{2}=\\frac{5}{2}", "f'(2)=\\frac{1}{4}", "y-\\frac{5}{2}=\\frac{1}{4}(x-2)", "y=\\frac{x}{4}+2")
g12 = (x**2 + 1) / (x - 2)
v.ok(simplify(diff(g12, x) - (x**2 - 4 * x - 1) / (x - 2)**2) == 0, "ej. 12Ba: g'")
add(12, 'B.a', "g'(x)=\\frac{2x(x-2)-(x^2+1)\\cdot1}{(x-2)^2}=\\frac{x^2-4x-1}{(x-2)^2}")
y3, m3 = g12.subs(x, 3), diff(g12, x).subs(x, 3)
v.ok((y3, m3) == (10, -4) and simplify(y3 + m3 * (x - 3) - (-4 * x + 22)) == 0, "ej. 12Bb: y=-4x+22")
add(12, 'B.b', "g(3)=\\frac{10}{1}=10", "g'(3)=\\frac{9-12-1}{1}=-4", "y-10=-4(x-3)", "y=-4x+22")
x12 = sorted(solve(x**2 - 4 * x - 1, x), key=lambda z: float(z))
v.ok(x12 == [2 - sqrt(5), 2 + sqrt(5)], "ej. 12Bc: x=2±√5")
add(12, 'B.c', "x^2-4x-1=0", "x=2\\pm\\sqrt{5}")
# ---------- 13 ----------
B13 = -R(1, 2) * x**2 + 30 * x - 200
v.enunciado(13, ["-0{,}5x^2+30x-200"])
der(13, 'a', "B'(x)", B13, "-x+30", -x + 30)
add(13, 'b', f"B'(20)=-20+30={diff(B13, x).subs(x, 20)}")
x13 = solve(diff(B13, x), x)
add(13, 'c', f"x={x13[0]}", f"B(30)=-450+900-200={B13.subs(x, 30)}")
v.ok(B13.subs(x, 30) == 250, "ej. 13c: B(30)=250")
add(13, 'd', f"B'(40)=-40+30={diff(B13, x).subs(x, 40)}")
# ---------- 14 ----------
s14 = solve([2 * a + b, 4 + a + 2], [a, b])
v.ok(s14 == {a: -6, b: 12} and limit(8 / x, x, 2, '+') == 4 and diff(8 / x, x).subs(x, 2) == -2, "ej. 14: a=-6, b=12")
v.enunciado(14, ["x^2+ax+b&x\\le2", "\\dfrac8x&x>2"])
add(14, 'a', "f(2)=4+2a+b", "2a+b=0")
add(14, 'b', "f'(2^-)=4+a", "f'(2^+)=-\\frac{8}{4}=-2", f"a={s14[a]}", f"b=-2a={s14[b]}")
f14 = x**2 - 6 * x + 12
v.ok((f14.subs(x, 1), diff(f14, x).subs(x, 1)) == (7, -4) and simplify(7 - 4 * (x - 1) - (-4 * x + 11)) == 0, "ej. 14c: y=-4x+11")
add(14, 'c', "f(1)=7", "f'(1)=2-6=-4", "y-7=-4(x-1)", "y=-4x+11")
v.ok((8 / x).subs(x, 4) == 2 and diff(8 / x, x).subs(x, 4) == -R(1, 2) and simplify(2 - (x - 4) / 2 - (-x / 2 + 4)) == 0, "ej. 14d: y=-x/2+4")
add(14, 'd', "f(4)=2", "f'(4)=-\\frac{8}{16}=-\\frac{1}{2}", "y-2=-\\frac{1}{2}(x-4)", "y=-\\frac{x}{2}+4")
# ---------- 15 ----------
P15 = 200 * exp(R(3, 10) * t)
v.enunciado(15, ["200\\,e^{0{,}3t}"])
v.ok(simplify(diff(P15, t) - 60 * exp(R(3, 10) * t)) == 0 and diff(P15, t).subs(t, 0) == 60, "ej. 15a: P'(t)=60e^{0,3t}")
add(15, 'a', "P'(t)=200\\cdot0{,}3\\,e^{0{,}3t}=60\\,e^{0{,}3t}", "P'(0)=60")
add(15, 'b', f"P'(5)=60\\,e^{{1{{,}}5}}\\approx{dec(N(diff(P15, t).subs(t, 5)), 2)}")
v.ok(simplify(diff(P15, t) / P15 - R(3, 10)) == 0, "ej. 15c: P'/P=0,3")
add(15, 'c', "\\frac{P'(t)}{P(t)}=\\frac{60\\,e^{0{,}3t}}{200\\,e^{0{,}3t}}=0{,}3")
v.ok(P15.subs(t, 0) == 200 and round(float(N(P15.subs(t, R(1, 2)))), 2) == 232.37, "ej. 15d")
add(15, 'd', "y=200+60t", "P(0{,}5)\\approx230", f"P(0{{,}}5)=200\\,e^{{0{{,}}15}}\\approx{dec(N(P15.subs(t, R(1, 2))), 2)}")
# ---------- 16 ----------
v.enunciado(16, ["\\lim_{x\\to0}\\frac{e^{3x}-1}{x}", "\\lim_{x\\to1}\\frac{x^3-1}{\\ln x}", "\\lim_{x\\to+\\infty}\\frac{\\ln x}{x^2}", "\\lim_{x\\to+\\infty}\\frac{x^2}{e^{2x}}"])
add(16, 'a', f"\\lim_{{x\\to0}}\\frac{{e^{{3x}}-1}}{{x}}=\\lim_{{x\\to0}}\\frac{{3e^{{3x}}}}{{1}}={limit((exp(3 * x) - 1) / x, x, 0)}")
add(16, 'b', f"\\lim_{{x\\to1}}\\frac{{x^3-1}}{{\\ln x}}=\\lim_{{x\\to1}}\\frac{{3x^2}}{{1/x}}=\\lim_{{x\\to1}}3x^3={limit((x**3 - 1) / log(x), x, 1)}")
add(16, 'c', f"\\lim_{{x\\to+\\infty}}\\frac{{\\ln x}}{{x^2}}=\\lim_{{x\\to+\\infty}}\\frac{{1/x}}{{2x}}=\\lim_{{x\\to+\\infty}}\\frac{{1}}{{2x^2}}={limit(log(x) / x**2, x, oo)}")
add(16, 'd', f"\\lim_{{x\\to+\\infty}}\\frac{{x^2}}{{e^{{2x}}}}=\\lim_{{x\\to+\\infty}}\\frac{{2x}}{{2e^{{2x}}}}=\\lim_{{x\\to+\\infty}}\\frac{{1}}{{2e^{{2x}}}}={limit(x**2 / exp(2 * x), x, oo)}")
# ---------- 17 ----------
I17 = -R(2, 100) * x**2 + 8 * x
v.enunciado(17, ["-0{,}02x^2+8x"])
der(17, 'a', "I'(x)", I17, "-0{,}04x+8", -R(4, 100) * x + 8)
add(17, 'b', f"I'(50)=-2+8={diff(I17, x).subs(x, 50)}")
v.ok((I17.subs(x, 50), diff(I17, x).subs(x, 50)) == (350, 6) and simplify(350 + 6 * (x - 50) - (6 * x + 50)) == 0, "ej. 17c: y=6x+50")
add(17, 'c', f"I(50)=-50+400={I17.subs(x, 50)}", "y-350=6(x-50)", "y=6x+50")
v.ok(6 * 52 + 50 == 362 and I17.subs(x, 52) == R(36192, 100) and 362 - I17.subs(x, 52) == R(8, 100), "ej. 17d: 362 vs 361,92")
add(17, 'd', "I(52)\\approx6\\cdot52+50=362", f"I(52)=-0{{,}}02\\cdot2704+416={dec(I17.subs(x, 52), 2)}", f"{dec(362 - I17.subs(x, 52), 2)}")
# ---------- 18 ----------
v.enunciado(18, ["(2x-1)\\,e^{x^2}", "\\ln\\dfrac{x+1}{x-1}", "\\dfrac{x}{\\sqrt{x^2+1}}", "\\dfrac{e^x}{x^2+1}"])
der(18, 'a', "f'(x)", (2 * x - 1) * exp(x**2), "(4x^2-2x+2)e^{x^2}", (4 * x**2 - 2 * x + 2) * exp(x**2))
der(18, 'b', "g'(x)", log((x + 1) / (x - 1)), "\\frac{-2}{x^2-1}", -2 / (x**2 - 1))
der(18, 'c', "h'(x)", x / sqrt(x**2 + 1), "\\frac{1}{(x^2+1)\\sqrt{x^2+1}}", 1 / ((x**2 + 1) * sqrt(x**2 + 1)))
der(18, 'd', "k'(x)", exp(x) / (x**2 + 1), "\\frac{(x-1)^2e^x}{(x^2+1)^2}", (x - 1)**2 * exp(x) / (x**2 + 1)**2)
# ---------- 19 ----------
def T19(xv):
    return R(1, 10) * xv if xv <= 20000 else 2000 + R(1, 4) * (xv - 20000)


v.enunciado(19, ["0{,}1x&0\\le x\\le20000", "2000+0{,}25\\,(x-20000)&x>20000"])
add(19, 'a', f"T(10000)=0{{,}}1\\cdot10000={T19(10000)}", f"T(30000)=2000+0{{,}}25\\cdot10000={T19(30000)}")
v.ok(T19(20000) == 2000 and T19(20000 - R(1, 10**6)) < 2000 and abs(T19(20000 + R(1, 10**6)) - 2000) < R(1, 10**5), "ej. 19b: continua en 20000")
add(19, 'b', f"T(20000)=0{{,}}1\\cdot20000={T19(20000)}", "\\lim_{x\\to20000^-}0{,}1x=2000", "\\lim_{x\\to20000^+}(2000+0{,}25(x-20000))=2000")
v.ok(diff(R(1, 10) * x, x) == R(1, 10) and diff(2000 + R(1, 4) * (x - 20000), x) == R(1, 4), "ej. 19c: derivadas laterales")
add(19, 'c', "T'(20000^-)=0{,}1", "T'(20000^+)=0{,}25", "no es derivable")
add(19, 'd', "10\\,\\%", "25\\,\\%")
# ---------- 20 ----------
s20 = solve([3 + 2 * a + b, 1 + a + b + 1 + 1], [a, b])
f20 = x**3 + s20[a] * x**2 + s20[b] * x + 1
v.ok(s20 == {a: 0, b: -3} and f20.subs(x, 1) == -1 and diff(f20, x).subs(x, 1) == 0, "ej. 20: a=0, b=-3")
v.enunciado(20, ["x^3+ax^2+bx+c", "(0,1)", "(1,-1)"])
add(20, 'a', "c=1")
add(20, 'b', "f'(1)=3+2a+b=0", "a+b=-3")
add(20, 'c', f"a={s20[a]}y b={s20[b]}".replace("y b", " y b"), "f(x)=x^3-3x+1")
v.ok(sorted(solve(diff(f20, x), x)) == [-1, 1] and f20.subs(x, -1) == 3, "ej. 20d: (-1,3)")
add(20, 'd', "x=\\pm1", "f(-1)=3", "(-1,3)")
# ---------- 21 ----------
s21 = solve([80 * a + b, 1600 * a + 40 * b - 800], [a, b])
B21 = s21[a] * x**2 + s21[b] * x
v.ok(s21 == {a: -R(1, 2), b: 40} and diff(B21, x).subs(x, 40) == 0 and B21.subs(x, 40) == 800, "ej. 21: a=-1/2, b=40")
v.enunciado(21, ["ax^2+bx", "x=40", "800"])
add(21, 'a', "B'(40)=80a+b=0", "B(40)=1600a+40b=800")
add(21, 'b', f"a={tx(s21[a])}", f"b={s21[b]}", "B(x)=-\\frac{1}{2}x^2+40x")
add(21, 'c', f"B(30)=-450+1200={B21.subs(x, 30)}", f"B'(30)=-30+40={diff(B21, x).subs(x, 30)}")
add(21, 'd', f"unos {diff(B21, x).subs(x, 30)} mil euros")
# ---------- 22 ----------
f22 = x**2 + 1
a22 = solve(Eq(-(a**2 + 1), -2 * a**2), a)
v.ok(sorted(a22) == [-1, 1], "ej. 22: a=±1")
v.enunciado(22, ["x^2+1"])
add(22, 'a', "f'(x)=2x", "y-(a^2+1)=2a(x-a)")
add(22, 'b', "-(a^2+1)=-2a^2")
add(22, 'c', "a^2=1", "a=1", "a=-1")
v.ok(simplify(2 + 2 * (x - 1) - 2 * x) == 0 and simplify(2 - 2 * (x + 1) - (-2 * x)) == 0, "ej. 22d: y=2x e y=-2x")
add(22, 'd', "y=2x", "y=-2x")
# ---------- 23 ----------
R23 = 40 * log(t + 1)
v.enunciado(23, ["40\\ln(t+1)"])
der(23, 'a', "R'(t)", R23, "\\frac{40}{t+1}", 40 / (t + 1), var=t)
add(23, 'b', *[f"R'({tv})=\\frac{{40}}{{{tv + 1}}}={diff(R23, t).subs(t, tv)}" if tv else "R'(0)=40" for tv in (0, 3, 9)])
v.ok(simplify(R23.subs(t, 3) - 40 * log(4)) == 0 and diff(R23, t).subs(t, 3) == 10, "ej. 23d: tangente en t=3")
add(23, 'd', "R(3)=40\\ln4", "y=40\\ln4+10(t-3)")
add(23, 'c', f"{diff(R23, t).subs(t, 0)} puntos por hora al principio", f"{diff(R23, t).subs(t, 9)} puntos por hora hacia la hora 9")
# ---------- 24 ----------
Cm = R(1, 2) * x + 200 / x
v.enunciado(24, ["0{,}5x^2+200", "0{,}5x+\\dfrac{200}{x}"])
der(24, 'a', "C_m'(x)", Cm, "0{,}5-\\frac{200}{x^2}", R(1, 2) - 200 / x**2)
add(24, 'b', f"C_m'(10)=0{{,}}5-2={dec(diff(Cm, x).subs(x, 10), 1)}")
x24 = [r for r in solve(diff(Cm, x), x) if r > 0]
add(24, 'c', "x^2=400", f"x={x24[0]}")
Cc = R(1, 2) * x**2 + 200
v.ok(Cm.subs(x, 20) == 20 and diff(Cc, x).subs(x, 20) == 20 and simplify(Cc / x - Cm) == 0, "ej. 24d: C_m(20)=C'(20)=20")
add(24, 'd', f"C_m(20)=10+10={Cm.subs(x, 20)}", "C'(x)=x", f"C'(20)={diff(Cc, x).subs(x, 20)}")
# ---------- 25 ----------
f25a = x**2 - x
d25 = limit((f25a.subs(x, 3 + h) - f25a.subs(x, 3)) / h, h, 0)
v.ok(expand(f25a.subs(x, 3 + h)) == 6 + 5 * h + h**2 and d25 == 5, "ej. 25Aa")
add(25, 'A.a', "f(3)=9-3=6", "f(3+h)=(3+h)^2-(3+h)=6+5h+h^2", f"f'(3)=\\lim_{{h\\to0}}\\frac{{f(3+h)-f(3)}}{{h}}=\\lim_{{h\\to0}}\\frac{{5h+h^2}}{{h}}=\\lim_{{h\\to0}}(5+h)={d25}")
g25 = Piecewise((1 - x, x < 1), (x - 1, True))
v.ok(diff(1 - x, x) == -1 and diff(x - 1, x) == 1 and Abs(x - 1).subs(x, 1) == 0, "ej. 25Ab: derivadas laterales ∓1")
add(25, 'A.b', "g'(1^-)=-1", "g'(1^+)=1", "no derivable")
x25 = solve(1 / x - R(1, 2), x)
v.ok(x25 == [2] and log(2) == log(x25[0]) and simplify(log(2) + (x - 2) / 2 - (x / 2 + log(2) - 1)) == 0, "ej. 25Ac: y=x/2+ln2-1")
add(25, 'A.c', "h'(x)=\\frac{1}{x}=\\frac{1}{2}", "x=2", "h(2)=\\ln2", "y-\\ln2=\\frac{1}{2}(x-2)", "y=\\frac{x}{2}+\\ln2-1")
s25 = solve([a + b - 1, 2 * a + b + 1], [a, b])
v.ok(s25 == {a: -2, b: 3}, "ej. 25B: a=-2, b=3")
v.enunciado(25, ["(0,2)", "(1,3)", "-1"])
add(25, 'B.a', "c=2")
add(25, 'B.b', "a+b+2=3", "a+b=1", "f'(1)=2a+b=-1")
add(25, 'B.c', f"a={s25[a]}", f"b={s25[b]}", "f(x)=-2x^2+3x+2")

# ---------- comprobación de todos los resultados en su apartado ----------
for (num, ap), frags in RES.items():
    n = CNT.get((num, ap), {})
    v.solucion(num, [(f, n[f]) if f in n else f for f in frags], ap)
v.fin()
