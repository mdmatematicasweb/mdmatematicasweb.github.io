#!/usr/bin/env python3
"""Verifica la relación de ejercicios ejercicios/2-bachillerato-ccss/05-limites-continuidad/index.qmd.

Cada ejercicio se resuelve aquí con sympy, sin mirar el texto (límites, continuidad, asíntotas); después se comprueba que
(1) los datos aparecen en el enunciado y (2) cada resultado calculado aparece en el bloque de su apartado de la solución
escrita, con recuento exacto y con mutación integrada. Ver scripts/ccss/_ej_comun.py.

Uso:  python scripts/ccss/verificar_ej_05.py     (requiere `pip install sympy`)
Termina con código 0 si todo coincide y con código 1 si algo falla.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _ej_comun import Verificador, tx, dec  # noqa: E402
from sympy import (symbols, Rational as R, solve, limit, oo, exp, log, sqrt, simplify, factor, apart, cancel, E, N,  # noqa: E402
                   Piecewise, Eq, S)

QMD = Path(__file__).resolve().parents[2] / "ejercicios" / "2-bachillerato-ccss" / "05-limites-continuidad" / "index.qmd"
v = Verificador(QMD)
v.estructura()
x, t, w, q, a, b, k = symbols('x t w q a b k', real=True)

# Recuentos explícitos de apariciones por apartado cuando un resultado se repite en el mismo bloque.
CNT = {(9, ''): {'x=2': 2}, (14, 'b'): {'x=2': 2, 'x=-2': 2}}
RES = {}


def tl(val):
    val = S(val)
    return "+\\infty" if val == oo else "-\\infty" if val == -oo else tx(val)


def add(num, ap, *frags):
    RES.setdefault((num, ap), []).extend(frags)


def lim(num, ap, label, expr, punto, lado='+-', var=x):
    """Añade «label=valor» con el límite calculado por sympy (independiente del texto)."""
    val = limit(expr, var, punto, lado)
    add(num, ap, f"{label}={tl(val)}")
    return val


# ---------- 1 ----------
v.enunciado(1, ["\\lim_{x\\to2}(x^2-3x+1)", "\\lim_{x\\to0}(e^x+\\ln(x+1))", "\\lim_{x\\to4}\\frac{\\sqrt{x+5}}{x-1}"])
lim(1, 'a', "\\lim_{x\\to2}(x^2-3x+1)", x**2 - 3 * x + 1, 2)
lim(1, 'b', "\\lim_{x\\to0}(e^x+\\ln(x+1))", exp(x) + log(x + 1), 0)
lim(1, 'c', "\\lim_{x\\to4}\\frac{\\sqrt{x+5}}{x-1}", sqrt(x + 5) / (x - 1), 4)
# ---------- 2 ----------
v.enunciado(2, ["\\lim_{x\\to3}\\frac{x^2-9}{x-3}", "\\lim_{x\\to-1}\\frac{x^2+x}{x+1}", "\\lim_{x\\to2}\\frac{x^2-5x+6}{x-2}"])
lim(2, 'a', "\\lim_{x\\to3}\\frac{x^2-9}{x-3}", (x**2 - 9) / (x - 3), 3)
lim(2, 'b', "\\lim_{x\\to-1}\\frac{x^2+x}{x+1}", (x**2 + x) / (x + 1), -1)
lim(2, 'c', "\\lim_{x\\to2}\\frac{x^2-5x+6}{x-2}", (x**2 - 5 * x + 6) / (x - 2), 2)
add(2, 'c', "x^2-5x+6=(x-2)(x-3)")
v.ok(factor(x**2 - 5 * x + 6) == (x - 2) * (x - 3), "ej. 2c: factorización")
# ---------- 3 ----------
v.enunciado(3, ["\\lim_{x\\to2}\\frac{x+1}{(x-2)^2}", "\\frac{1}{x-1}", "\\frac{2x}{x+3}"])
lim(3, 'a', "\\lim_{x\\to2}\\frac{x+1}{(x-2)^2}", (x + 1) / (x - 2)**2, 2)
lim(3, 'b', "\\lim_{x\\to1^-}\\frac{1}{x-1}", 1 / (x - 1), 1, '-')
lim(3, 'b', "\\lim_{x\\to1^+}\\frac{1}{x-1}", 1 / (x - 1), 1, '+')
lim(3, 'c', "\\lim_{x\\to-3^-}\\frac{2x}{x+3}", 2 * x / (x + 3), -3, '-')
lim(3, 'c', "\\lim_{x\\to-3^+}\\frac{2x}{x+3}", 2 * x / (x + 3), -3, '+')
v.ok(limit(1 / (x - 1), x, 1, '-') != limit(1 / (x - 1), x, 1, '+') and limit(2 * x / (x + 3), x, -3, '-') != limit(2 * x / (x + 3), x, -3, '+'), "ej. 3: laterales distintos, no existe el límite")
add(3, 'b', "no existe")
add(3, 'c', "No existe")
# ---------- 4 ----------
v.enunciado(4, ["\\lim_{x\\to4}\\frac{\\sqrt{x}-2}{x-4}", "\\lim_{x\\to0}\\frac{\\sqrt{x+9}-3}{x}"])
lim(4, 'a', "\\lim_{x\\to4}\\frac{\\sqrt{x}-2}{x-4}", (sqrt(x) - 2) / (x - 4), 4)
lim(4, 'b', "\\lim_{x\\to0}\\frac{\\sqrt{x+9}-3}{x}", (sqrt(x + 9) - 3) / x, 0)
# ---------- 5 ----------
v.enunciado(5, ["\\lim_{x\\to+\\infty}\\frac{3x^2-x}{x^2+5}", "\\lim_{x\\to+\\infty}\\frac{2x+1}{x^2+3}", "\\lim_{x\\to+\\infty}\\frac{x^3+1}{2x^2}", "\\lim_{x\\to-\\infty}\\frac{x^3+1}{2x^2}"])
lim(5, 'a', "\\lim_{x\\to+\\infty}\\frac{3x^2-x}{x^2+5}", (3 * x**2 - x) / (x**2 + 5), oo)
lim(5, 'b', "\\lim_{x\\to+\\infty}\\frac{2x+1}{x^2+3}", (2 * x + 1) / (x**2 + 3), oo)
lim(5, 'c', "\\lim_{x\\to+\\infty}\\frac{x^3+1}{2x^2}", (x**3 + 1) / (2 * x**2), oo)
lim(5, 'd', "\\lim_{x\\to-\\infty}\\frac{x^3+1}{2x^2}", (x**3 + 1) / (2 * x**2), -oo)
# ---------- 6 ----------
v.enunciado(6, ["\\lim_{x\\to+\\infty}\\frac{x^2}{e^x}", "\\lim_{x\\to+\\infty}\\frac{5x+\\ln x}{x}", "\\lim_{x\\to-\\infty}(2e^x+3)"])
lim(6, 'a', "\\lim_{x\\to+\\infty}\\frac{x^2}{e^x}", x**2 / exp(x), oo)
lim(6, 'b', "\\lim_{x\\to+\\infty}\\frac{5x+\\ln x}{x}", (5 * x + log(x)) / x, oo)
lim(6, 'c', "\\lim_{x\\to-\\infty}(2e^x+3)", 2 * exp(x) + 3, -oo)
v.ok(simplify((5 * x + log(x)) / x - (5 + log(x) / x)) == 0, "ej. 6b: (5x+ln x)/x = 5 + ln x/x")
add(6, 'b', "5+\\frac{\\ln x}{x}")
# ---------- 7 ----------
k7 = solve(6 + k - (3**2 - 4), k)
v.ok(k7 == [-1] and limit(2 * x + k7[0], x, 3, '-') == 3**2 - 4, "ej. 7: k=-1 hace continua en x=3")
v.enunciado(7, ["2x+k", "x^2-4"])
add(7, '', f"k={k7[0]}", f"6+k={3**2 - 4}", "\\lim_{x\\to3^-}(2x+k)=6+k", f"\\lim_{{x\\to3^+}}(x^2-4)=f(3)={3**2 - 4}")
# ---------- 8 ----------
v.enunciado(8, ["\\dfrac{x^2-1}{x-1}", "\\dfrac{1}{x+2}", "x+2&x<1", "5&x\\ge1"])
lim(8, 'a', "\\lim_{x\\to1}\\frac{x^2-1}{x-1}", (x**2 - 1) / (x - 1), 1)
lim(8, 'b', "\\lim_{x\\to-2^-}\\frac{1}{x+2}", 1 / (x + 2), -2, '-')
lim(8, 'b', "\\lim_{x\\to-2^+}\\frac{1}{x+2}", 1 / (x + 2), -2, '+')
lim(8, 'c', "\\lim_{x\\to1^-}(x+2)", x + 2, 1, '-')
lim(8, 'c', "\\lim_{x\\to1^+}5", 5 + 0 * x, 1, '+')
add(8, 'c', f"5-3={5 - 3}")
add(8, 'a', "evitable", "f(1)=2")
add(8, 'b', "salto infinito")
add(8, 'c', "salto finito")
# ---------- 9 ----------
f9 = (3 * x + 1) / (x - 2)
v.ok(limit(f9, x, 2, '-') == -oo and limit(f9, x, 2, '+') == oo and limit(f9, x, oo) == 3 and limit(f9, x, -oo) == 3 and (3 * 2 + 1) == 7, "ej. 9: asíntotas x=2 e y=3")
v.enunciado(9, ["\\dfrac{3x+1}{x-2}"])
lim(9, '', "\\lim_{x\\to\\pm\\infty}\\frac{3x+1}{x-2}", f9, oo)
add(9, '', "x=2", "y=3", "vale $7\\ne0$")
# ---------- 10 ----------
S10 = 100 * t / (t + 5)
v.enunciado(10, ["\\dfrac{100t}{t+5}"])
for tv in (5, 45, 95):
    add(10, 'a', f"S({tv})=\\frac{{{100 * tv}}}{{{tv + 5}}}={S10.subs(t, tv)}")
add(10, 'b', f"\\lim_{{t\\to+\\infty}}S(t)={tl(limit(S10, t, oo))}")
t10 = solve(S10 - 90, t)
v.ok(t10 == [45] and S10.subs(t, 45) == 90, "ej. 10c: t=45")
add(10, 'c', f"t={t10[0]}")
v.ok(solve(S10 - 100, t) == [] and simplify(S10 - (100 - 500 / (t + 5))) == 0, "ej. 10d: S=100 sin solución y S=100-500/(t+5)")
add(10, 'd', "S(t)=100-\\frac{500}{t+5}", "!0=500")
# ---------- 11 ----------
C11 = 12 + R(900) / x
v.enunciado(11, ["12+\\dfrac{900}{x}", "900 €", "12 €"])
for xv in (100, 300):
    add(11, 'a', f"C_m({xv})=12+\\frac{{900}}{{{xv}}}={C11.subs(x, xv)}")
add(11, 'b', f"\\lim_{{x\\to+\\infty}}C_m(x)={tl(limit(C11, x, oo))}")
x11 = solve(C11 - 14, x)
v.ok(x11 == [450], "ej. 11c: x=450")
add(11, 'c', f"x={x11[0]}")
add(11, 'd', f"\\lim_{{x\\to0^+}}C_m(x)={tl(limit(C11, x, 0, '+'))}")
# ---------- 12 ----------
a12 = solve(2 * a - 2 - (4 - a), a)
v.ok(a12 == [2], "ej. 12A: a=2")
v.enunciado(12, ["ax-2&x\\le2", "x^2-a&x>2", "\\dfrac{2x^2-2}{x^2-4x+3}"])
add(12, 'A.a', f"2a-2=4-a", f"a={a12[0]}")
f12 = x**2 - 2
add(12, 'A.b', f"\\lim_{{x\\to+\\infty}}f(x)=\\lim_{{x\\to+\\infty}}(x^2-2)={tl(limit(f12, x, oo))}",
    f"\\lim_{{x\\to-\\infty}}f(x)=\\lim_{{x\\to-\\infty}}(2x-2)={tl(limit(2 * x - 2, x, -oo))}")
v.ok(f12.subs(x, 3) == 7, "ej. 12Ac: f(3)=7")
add(12, 'A.c', f"\\lim_{{x\\to3}}\\frac{{f(x)-7}}{{x-3}}=\\lim_{{x\\to3}}\\frac{{x^2-9}}{{x-3}}=\\lim_{{x\\to3}}\\frac{{(x-3)(x+3)}}{{x-3}}=\\lim_{{x\\to3}}(x+3)={limit((f12 - 7) / (x - 3), x, 3)}")
g12 = (2 * x**2 - 2) / (x**2 - 4 * x + 3)
v.ok(sorted(solve(x**2 - 4 * x + 3, x)) == [1, 3] and cancel(g12) == 2 * (x + 1) / (x - 3), "ej. 12Ba: dominio y simplificación")
add(12, 'B.a', "x^2-4x+3=(x-1)(x-3)", "\\operatorname{Dom}g=\\mathbb{R}\\setminus\\{1,3\\}", f"\\lim_{{x\\to1}}g(x)=\\frac{{2\\cdot2}}{{-2}}={limit(g12, x, 1)}", "evitable", "salto infinito")
add(12, 'B.b', f"\\lim_{{x\\to3^-}}g(x)={tl(limit(g12, x, 3, '-'))}", f"\\lim_{{x\\to3^+}}g(x)={tl(limit(g12, x, 3, '+'))}")
add(12, 'B.c', f"\\lim_{{x\\to\\pm\\infty}}g(x)={tl(limit(g12, x, oo))}", "x=3", "y=2")
v.ok(limit(g12, x, -oo) == limit(g12, x, oo) == 2, "ej. 12Bc: límites en ±∞")
# ---------- 13 ----------
a13 = solve(a + R(2, 100) * 300 - (12 + R(1, 100) * 300), a)
v.ok(a13 == [9], "ej. 13a: a=9")
v.enunciado(13, ["a+0{,}02x", "12+0{,}01x", "300"])
add(13, 'a', f"a+6=15", f"a={a13[0]}", "\\lim_{x\\to300^-}(a+0{,}02x)=a+6", f"\\lim_{{x\\to300^+}}(12+0{{,}}01x)=12+3=15")
add(13, 'b', f"C(200)={tl(9 + R(2, 100) * 200)}".replace("C(200)=13", "C(200)=9+0{,}02\\cdot200=13"), "C(1000)=12+0{,}01\\cdot1000=22")
v.ok(9 + R(2, 100) * 200 == 13 and 12 + R(1, 100) * 1000 == 22, "ej. 13b: 13 € y 22 €")
add(13, 'c', f"\\lim_{{x\\to300^-}}C(x)=10+6={10 + 6}", f"\\lim_{{x\\to300^+}}C(x)=15", "salto finito", f"15-16=-1")
add(13, 'd', "16 €")
# ---------- 14 ----------
f14 = (2 * x**2 + 1) / (x**2 - 4)
v.enunciado(14, ["\\dfrac{2x^2+1}{x^2-4}"])
add(14, 'a', "x^2-4=(x-2)(x+2)", "\\operatorname{Dom}f=\\mathbb{R}\\setminus\\{-2,2\\}")
v.ok(sorted(solve(x**2 - 4, x)) == [-2, 2], "ej. 14a: x=±2")
for p_, d_, s_ in ((2, '-', "2^-"), (2, '+', "2^+"), (-2, '-', "-2^-"), (-2, '+', "-2^+")):
    add(14, 'b', f"\\lim_{{x\\to{s_}}}f(x)={tl(limit(f14, x, p_, d_))}")
add(14, 'b', "x=2", "x=-2")
add(14, 'c', f"\\lim_{{x\\to\\pm\\infty}}f(x)={tl(limit(f14, x, oo))}", "y=2")
v.ok(limit(f14, x, -oo) == 2 and solve(f14 - 2, x) == [], "ej. 14cd: y=2 y no corta")
add(14, 'd', "2x^2+1=2(x^2-4)", "!1=-8")
# ---------- 15 ----------
C15 = (x**2 + 2 * x + 5) / (x + 1)
v.enunciado(15, ["\\dfrac{x^2+2x+5}{x+1}"])
add(15, 'a', f"C(3)=\\frac{{9+6+5}}{{4}}={C15.subs(x, 3)}", f"C(99)=\\frac{{9801+198+5}}{{100}}={dec(C15.subs(x, 99), 2)}")
v.ok(9801 + 198 + 5 == 10004 and apart(C15, x) == x + 1 + 4 / (x + 1), "ej. 15: suma y división")
add(15, 'b', "C(x)=x+1+\\frac{4}{x+1}")
m15 = limit(C15 / x, x, oo); n15 = limit(C15 - m15 * x, x, oo)
v.ok((m15, n15) == (1, 1), "ej. 15c: y=x+1")
add(15, 'c', f"m={m15}", "y=x+1")
add(15, 'd', f"C(99)={dec(C15.subs(x, 99), 2)}", "99+1=100")
# ---------- 16 ----------
a16 = 1; b16 = solve(2 * b - 1 - (2**2 + 1), b)[0]
v.ok(b16 == 3 and limit(x + a16, x, 0, '-') == 0**2 + 1, "ej. 16: a=1, b=3")
v.enunciado(16, ["x+a&x<0", "x^2+1&0\\le x\\le2", "bx-1&x>2"])
add(16, 'a', f"a=1", "f(0)=1")
add(16, 'b', "f(2)=2^2+1=5", f"2b-1=5", f"b={b16}")
f16 = lambda xv: xv + a16 if xv < 0 else (xv**2 + 1 if xv <= 2 else b16 * xv - 1)
add(16, 'c', f"f(-1)=-1+1={f16(-1)}", f"f(1)=1+1={f16(1)}", f"f(3)=3\\cdot3-1={f16(3)}")
add(16, 'd', f"\\lim_{{x\\to-\\infty}}f(x)=\\lim_{{x\\to-\\infty}}(x+1)={tl(limit(x + 1, x, -oo))}", f"\\lim_{{x\\to+\\infty}}f(x)=\\lim_{{x\\to+\\infty}}(3x-1)={tl(limit(3 * x - 1, x, oo))}")
# ---------- 17 ----------
c17 = 60 * t / (t**2 + 9)
v.enunciado(17, ["\\dfrac{60t}{t^2+9}"])
for tv in (1, 3, 9):
    add(17, 'a', f"c({tv})=\\frac{{{60 * tv}}}{{{tv**2 + 9}}}={c17.subs(t, tv)}")
add(17, 'b', f"\\lim_{{t\\to+\\infty}}c(t)={tl(limit(c17, t, oo))}")
t17 = sorted(solve(c17 - 6, t))
v.ok(t17 == [1, 9], "ej. 17c: t=1 y t=9")
add(17, 'c', "t^2-10t+9=0", f"t={t17[0]}", f"t={t17[1]}")
v.ok(solve(t**2 - 10 * t + 9, t) == [1, 9], "ej. 17c: t^2-10t+9")
add(17, 'd', "y=0")
# ---------- 18 ----------
v.enunciado(18, ["\\lim_{x\\to+\\infty}(\\sqrt{x^2+3x}-x)", "\\lim_{x\\to1}\\frac{\\sqrt{x+3}-2}{x-1}", "\\lim_{x\\to+\\infty}\\frac{2x^2-x+1}{x^2+4}", "\\lim_{x\\to+\\infty}\\frac{e^x+x}{e^x}"])
lim(18, 'a', "\\lim_{x\\to+\\infty}(\\sqrt{x^2+3x}-x)", sqrt(x**2 + 3 * x) - x, oo)
lim(18, 'b', "\\lim_{x\\to1}\\frac{\\sqrt{x+3}-2}{x-1}", (sqrt(x + 3) - 2) / (x - 1), 1)
lim(18, 'c', "\\lim_{x\\to+\\infty}\\frac{2x^2-x+1}{x^2+4}", (2 * x**2 - x + 1) / (x**2 + 4), oo)
lim(18, 'd', "\\lim_{x\\to+\\infty}\\frac{e^x+x}{e^x}", (exp(x) + x) / exp(x), oo)
# ---------- 19 ----------
P19 = 5000 / (1 + 4 * exp(-t / 2))
v.enunciado(19, ["\\dfrac{5000}{1+4e^{-t/2}}"])
add(19, 'a', f"P(0)=\\frac{{5000}}{{1+4e^0}}=\\frac{{5000}}{{5}}={P19.subs(t, 0)}")
add(19, 'b', f"\\lim_{{t\\to+\\infty}}P(t)=\\frac{{5000}}{{1+0}}={tl(limit(P19, t, oo))}")
t19 = solve(P19 - 4000, t)[0]
v.ok(simplify(t19 - 8 * log(2)) == 0 and round(float(N(t19)), 2) == 5.55, "ej. 19c: t=8 ln 2 ≈ 5,55")
add(19, 'c', "t=2\\ln16=8\\ln2", f"\\approx{dec(N(t19), 2)}")
add(19, 'd', f"\\lim_{{t\\to-\\infty}}P(t)={tl(limit(P19, t, -oo))}", "y=0")
# ---------- 20 ----------
g20 = 3 * exp(-x) + 1
v.enunciado(20, ["\\ln(x-2)", "3e^{-x}+1"])
add(20, 'a', "\\operatorname{Dom}f=(2,+\\infty)")
add(20, 'b', f"\\lim_{{x\\to2^+}}\\ln(x-2)={tl(limit(log(x - 2), x, 2, '+'))}", "x=2")
add(20, 'c', f"\\lim_{{x\\to+\\infty}}(3e^{{-x}}+1)=0+1={tl(limit(g20, x, oo))}", "y=1")
v.ok(limit(g20 / x, x, oo) == 0, "ej. 20d: g(x)/x → 0, sin pendiente válida")
add(20, 'd', "y=1")
# ---------- 21 ----------
def E21(wv):
    return 5 if wv <= 1 else 7 if wv <= 3 else 7 + 2 * (wv - 3)


v.enunciado(21, ["5&0<w\\le1", "7&1<w\\le3", "7+2(w-3)&w>3"])
add(21, 'a', f"E(0{{,}}5)={E21(R(1, 2))}", f"E(1)={E21(1)}", f"E(2)={E21(2)}", f"E(4)=7+2(4-3)={E21(4)}")
add(21, 'b', f"\\lim_{{w\\to1^-}}E(w)=5", f"\\lim_{{w\\to1^+}}E(w)=7", f"\\lim_{{w\\to3^-}}E(w)=7", f"\\lim_{{w\\to3^+}}E(w)=7+2\\cdot0=7")
v.ok(E21(1) == 5 and E21(R(101, 100)) == 7 and E21(1 - R(1, 10**9)) == 5 and E21(3) == 7 and abs(E21(3 + R(1, 10**9)) - 7) < R(1, 10**8) and E21(3 - R(1, 10**9)) == 7, "ej. 21: saltos en 1 y continuidad en 3")
add(21, 'c', "salto finito", "E(3)=7", "continua")
add(21, 'd', "5 €", "7 €")
# ---------- 22 ----------
f22 = (x**2 + x - 6) / (x**2 - 4)
v.enunciado(22, ["\\dfrac{x^2+x-6}{x^2-4}"])
add(22, 'a', "x^2-4=(x-2)(x+2)", "\\operatorname{Dom}f=\\mathbb{R}\\setminus\\{-2,2\\}")
v.ok(factor(x**2 + x - 6) == (x - 2) * (x + 3) and cancel(f22) == (x + 3) / (x + 2), "ej. 22b: simplificación")
add(22, 'b', "x^2+x-6=(x-2)(x+3)", f"\\lim_{{x\\to2}}f(x)={tx(limit(f22, x, 2))}", f"\\lim_{{x\\to-2^-}}f(x)={tl(limit(f22, x, -2, '-'))}", f"\\lim_{{x\\to-2^+}}f(x)={tl(limit(f22, x, -2, '+'))}", "evitable", "salto infinito")
add(22, 'c', "x=-2", f"\\lim_{{x\\to\\pm\\infty}}f(x)={tl(limit(f22, x, oo))}", "y=1")
v.ok(limit(f22, x, -oo) == 1, "ej. 22c: y=1 en -∞")
add(22, 'd', f"f(2)={tx(limit(f22, x, 2))}")
# ---------- 23 ----------
R23 = (x**2 - 16) / (x - 4)
v.enunciado(23, ["\\dfrac{x^2-16}{x-4}"])
add(23, 'a', "R(x)=x+4", f"R(10)={cancel(R23).subs(x, 10)}")
add(23, 'b', f"\\lim_{{x\\to4}}R(x)=\\lim_{{x\\to4}}(x+4)={limit(R23, x, 4)}")
add(23, 'c', "evitable", f"R(4)={limit(R23, x, 4)}")
add(23, 'd', f"\\lim_{{x\\to+\\infty}}R(x)=\\lim_{{x\\to+\\infty}}(x+4)={tl(limit(R23, x, oo))}")
# ---------- 24 ----------
def P24(qv):
    return 10 if qv < 20 else 9 if qv < 50 else 8


v.enunciado(24, ["10&0<q<20", "9&20\\le q<50", "8&q\\ge50"])
add(24, 'a', *[f"P({qv})={P24(qv)}" for qv in (19, 20, 49, 50)])
add(24, 'b', "\\lim_{q\\to20^-}P(q)=10", "\\lim_{q\\to20^+}P(q)=9", "\\lim_{q\\to50^-}P(q)=9", "\\lim_{q\\to50^+}P(q)=8")
eps = R(1, 10**9)
v.ok(P24(20 - eps) == 10 and P24(20 + eps) == 9 and P24(50 - eps) == 9 and P24(50 + eps) == 8, "ej. 24b: laterales en 20 y en 50 (valores muy próximos)")
add(24, 'c', "salto finito", "-1")
add(24, 'd', f"19\\cdot10={19 * P24(19)}", f"20\\cdot9={20 * P24(20)}", "10 € más barato")
v.ok(19 * P24(19) - 20 * P24(20) == 10, "ej. 24d: 190-180=10")
# ---------- 25 ----------
f25 = (2 * exp(x) + 1) / (exp(x) + 1)
g25 = (2 * x**2 - x + 3) / (x - 1)
v.enunciado(25, ["\\dfrac{2e^x+1}{e^x+1}", "\\dfrac{2x^2-x+3}{x-1}"])
v.ok(solve(exp(x) + 1, x) == [] and simplify(f25 - (2 + exp(-x)) / (1 + exp(-x))) == 0, "ej. 25Aa-b: dominio y forma dividida")
add(25, 'A.a', "e^x+1>0", "\\operatorname{Dom}f=\\mathbb{R}")
add(25, 'A.b', "f(x)=\\frac{2+e^{-x}}{1+e^{-x}}", f"\\lim_{{x\\to+\\infty}}f(x)=\\frac{{2+0}}{{1+0}}={tl(limit(f25, x, oo))}")
add(25, 'A.c', f"\\lim_{{x\\to-\\infty}}f(x)=\\frac{{2\\cdot0+1}}{{0+1}}={tl(limit(f25, x, -oo))}", "y=2", "y=1")
add(25, 'B.a', "\\operatorname{Dom}g=\\mathbb{R}\\setminus\\{1\\}", f"\\lim_{{x\\to1^-}}g(x)={tl(limit(g25, x, 1, '-'))}", f"\\lim_{{x\\to1^+}}g(x)={tl(limit(g25, x, 1, '+'))}")
v.ok(apart(g25, x) == 2 * x + 1 + 4 / (x - 1), "ej. 25Bb: división")
add(25, 'B.b', "g(x)=2x+1+\\frac{4}{x-1}")
m25 = limit(g25 / x, x, oo); n25 = limit(g25 - m25 * x, x, oo)
v.ok((m25, n25) == (2, 1) and limit(g25 / x, x, -oo) == 2, "ej. 25Bc: y=2x+1")
add(25, 'B.c', f"m={m25}", f"n=\\lim_{{x\\to+\\infty}}(g(x)-2x)=\\lim_{{x\\to+\\infty}}(1+\\frac{{4}}{{x-1}})={n25}", "y=2x+1", "x=1")

# ---------- comprobación de todos los resultados en su apartado ----------
for (num, ap), frags in RES.items():
    n = CNT.get((num, ap), {})
    v.solucion(num, [(f, n[f]) if f in n else f for f in frags], ap)
v.fin()
