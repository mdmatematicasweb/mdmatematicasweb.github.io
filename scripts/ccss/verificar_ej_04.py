#!/usr/bin/env python3
"""Verifica la relación de ejercicios ejercicios/2-bachillerato-ccss/04-funciones/index.qmd.

Cada ejercicio se resuelve aquí con sympy, sin mirar el texto; después se comprueba que (1) los datos aparecen en el
enunciado y (2) cada resultado calculado aparece en la solución escrita. Ver scripts/ccss/_ej_comun.py.

Uso:  python scripts/ccss/verificar_ej_04.py     (requiere `pip install sympy`)
Termina con código 0 si todo coincide y con código 1 en cuanto algo falla.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _ej_comun import Verificador, tx, dec  # noqa: E402
from sympy import (symbols, Rational as R, solve, log, exp, E, sqrt, ln, Abs, simplify, expand, diff, N, S, FiniteSet, Interval, oo,  # noqa: E402
                   limit, factor, Piecewise)
from sympy.calculus.util import continuous_domain  # noqa: E402

QMD = Path(__file__).resolve().parents[2] / "ejercicios" / "2-bachillerato-ccss" / "04-funciones" / "index.qmd"
v = Verificador(QMD)
v.estructura()
x, t, p, m_, a, b, c = symbols('x t p m a b c', real=True)


def aprox(val, nd=2):
    return dec(N(val, 30), nd)


# 1
d1a = continuous_domain((x + 3) / (x**2 - 9), x, S.Reals); d1b = continuous_domain(log(2 * x - 6), x, S.Reals); d1c = continuous_domain(sqrt(8 - 2 * x), x, S.Reals)
v.ok(d1a == S.Reals - FiniteSet(-3, 3) and d1b == Interval.open(3, oo) and d1c == Interval(-oo, 4), "ej. 1: dominios")
v.enunciado(1, ["\\dfrac{x+3}{x^2-9}", "\\ln(2x-6)", "\\sqrt{8-2x}"])
v.solucion(1, ["\\mathbb{R}\\setminus\\{-3,3\\}", "(3,+\\infty)", "(-\\infty,4]"])
# 2
sol2 = solve([a + b - 3, 4 * a + b - 9], [a, b])
f2 = sol2[a] * x + sol2[b]
v.ok(f2 == 2 * x + 1 and solve(f2, x) == [R(-1, 2)] and f2.subs(x, 10) == 21, "ej. 2")
v.enunciado(2, ["(1,3)", "(4,9)"])
v.solucion(2, [f"y={f2}".replace("*", ""), "(0,1)", "(-\\frac{1}{2},0)", f"f(10)={f2.subs(x, 10)}"])
# 3
f3 = x**2 - 6 * x + 5
vx = -R(-6, 2)
v.ok(vx == 3 and f3.subs(x, 3) == -4 and sorted(solve(f3, x)) == [1, 5] and f3.subs(x, 0) == 5, "ej. 3")
v.enunciado(3, ["x^2-6x+5"])
v.solucion(3, ["(3,-4)", "(1,0)", "(5,0)", "(0,5)", "mínimo"])
# 4
f4 = (2 * x - 1) / (x + 2)
v.ok(continuous_domain(f4, x, S.Reals) == S.Reals - FiniteSet(-2) and f4.subs(x, 0) == R(-1, 2) and solve(f4, x) == [R(1, 2)], "ej. 4: dominio y cortes")
v.ok(limit(f4, x, oo) == 2, "ej. 4: asíntota horizontal y=2")
v.enunciado(4, ["\\dfrac{2x-1}{x+2}"])
v.solucion(4, ["\\mathbb{R}\\setminus\\{-2\\}", "(0,-\\frac{1}{2})", "(\\frac{1}{2},0)"] + [f"f({k})={tx(f4.subs(x, k))}" for k in (-4, -3, -1, 0, 2)] + ["x=-2", "y=2"])
# 5
f5 = 3 * 2**x
v.ok(f5.subs(x, 0) == 3 and f5.subs(x, 3) == 24 and solve(f5 - 48, x) == [4] and diff(f5, x).subs(x, 0) > 0, "ej. 5")
v.enunciado(5, ["3\\cdot2^x"])
v.solucion(5, ["f(0)=3", "f(3)=24", "x=4", "creciente"])
# 6
V6 = 12000 * R(9, 10)**t
t6 = N(log(R(1, 2)) / log(R(9, 10)), 20)
v.ok(V6.subs(t, 3) == 8748, "ej. 6: V(3)")
v.enunciado(6, ["12000\\cdot0{,}9^t"])
v.solucion(6, ["V(3)=8748", f"t\\approx{aprox(t6)}"])
# 7
v.ok(continuous_domain(log(x - 2), x, S.Reals) == Interval.open(2, oo) and solve(log(x + 1, 2) - 3, x) == [7] and solve(log(x) - 2, x) == [E**2], "ej. 7")
v.enunciado(7, ["\\log(x-2)", "\\log_2(x+1)=3", "\\ln x=2"])
v.solucion(7, ["(2,+\\infty)", "x=7", "x=\\mathrm{e}^2", f"\\approx{aprox(E**2)}"])
# 8
f8 = lambda val: 2 * val + 1 if val < 1 else val**2 + 2
v.ok([f8(-1), f8(1), f8(3)] == [-1, 3, 11] and limit(2 * x + 1, x, 1) == 3 and (x**2 + 2).subs(x, 1) == 3, "ej. 8")
v.enunciado(8, ["\\begin{cases}2x+1&x<1\\\\x^2+2&x\\ge1\\end{cases}"])
v.solucion(8, ["f(-1)=-1", "f(1)=3", "f(3)=11", "no hay salto"])
# 9
fs = [("f", x**4 - 3 * x**2, "par"), ("g", x**3 - x, "impar"), ("h", x**2 + x, "ninguna")]
clases = []
for nombre, e, esperado in fs:
    neg = e.subs(x, -x)
    clase = "par" if simplify(neg - e) == 0 else ("impar" if simplify(neg + e) == 0 else "ninguna")
    clases.append(clase == esperado)
v.ok(all(clases), "ej. 9: par, impar y ninguna")
v.enunciado(9, ["x^4-3x^2", "x^3-x", "x^2+x"])
v.solucion(9, ["f(-x)=x^4-3x^2", "g(-x)=-x^3+x", "h(-x)=x^2-x", "par", "impar"])
# 10
C10, I10 = 1500 + 25 * x, 45 * x
B10 = expand(I10 - C10)
v.ok(B10 == 20 * x - 1500 and solve(B10, x) == [75] and B10.subs(x, 100) == 500 and solve(50 * x - C10, x) == [60], "ej. 10")
v.enunciado(10, ["1500+25x", "45x", "50"])
v.solucion(10, [f"B(x)={B10}".replace("*", ""), "x=75", "B(100)=500", "x=60", "20", "-1500"])
# 11
I11 = expand(p * (150 - 5 * p))
v.ok(I11 == -5 * p**2 + 150 * p and sorted(solve(I11, p)) == [0, 30] and solve(diff(I11, p), p) == [15] and I11.subs(p, 15) == 1125 and 150 - 5 * 15 == 75 and I11.subs(p, 20) == 1000, "ej. 11")
v.enunciado(11, ["q=150-5p"])
v.solucion(11, ["I(p)=-5p^2+150p", "p=0", "p=30", "p=15", "I(15)=1125", "q=75", "I(20)=1000"])
# 12
def f12(val):
    return 5 + R(12, 100) * val if val <= 200 else 29 + R(2, 10) * (val - 200)
v.ok(f12(150) == 23 and f12(300) == 49 and f12(200) == 29 and (29 + R(2, 10) * 0) == 29 and solve(29 + R(2, 10) * (x - 200) - 59, x) == [350] and f12(350) == 59, "ej. 12")
v.enunciado(12, ["5+0{,}12x", "29+0{,}2\\,(x-200)"])
v.solucion(12, ["f(150)=23", "f(300)=49", "f(200)=29", "x=350", "0{,}12", "0{,}2"])
# 13
Cm = (800 + 16 * x) / x
v.ok(simplify(Cm - (16 + 800 / x)) == 0 and Cm.subs(x, 40) == 36 and solve(Cm - 20, x) == [200] and limit(Cm, x, oo) == 16 and all(Cm.subs(x, k) > 16 for k in (1, 10, 1000, 10**6)), "ej. 13")
v.enunciado(13, ["800+16x"])
v.solucion(13, ["C_m(40)=36", "x=200", "y=16"])
# 14
U = 2000 * R(5, 4)**t
v.ok(U.subs(t, 0) == 2000 and round(float(U.subs(t, 4)), 2) == 4882.81, "ej. 14: U(0) y U(4)")
t14c = N(log(5) / log(R(5, 4)), 20); t14d = N(log(2) / log(R(5, 4)), 20)
v.enunciado(14, ["2000\\cdot1{,}25^t"])
v.solucion(14, ["U(0)=2000", f"U(4)\\approx{aprox(U.subs(t, 4))}", "25\\,\\%", f"t\\approx{aprox(t14c)}", f"t\\approx{aprox(t14d)}"])
# 15
W = 24000 * R(85, 100)**t
t15 = N(log(R(1, 2)) / log(R(85, 100)), 20)
v.ok(W.subs(t, 3) == 14739 and 24000 - W.subs(t, 3) == 9261, "ej. 15")
v.enunciado(15, ["24000\\cdot0{,}85^t", "15\\,\\%"])
v.solucion(15, ["V(3)=14739", f"V(5)\\approx{aprox(W.subs(t, 5))}", "9261", f"t\\approx{aprox(t15)}"])
# 16
def L(I):
    return 10 * log(I / R(1, 10**12), 10)
v.ok(simplify(L(R(1, 10**5))) == 70 and simplify(L(R(1, 10**3))) == 90, "ej. 16: 70 y 90 dB")
dif = N(10 * log(2, 10), 20)
v.ok(abs(float(N(L(2 * R(1, 10**5)) - L(R(1, 10**5)), 20)) - float(dif)) < 1e-12 and abs(float(N(L(2 * R(1, 10**3)) - L(R(1, 10**3)), 20)) - float(dif)) < 1e-12, "ej. 16: duplicar suma 10 log 2 siempre")
v.enunciado(16, ["10\\cdot\\log\\dfrac{I}{10^{-12}}", "10^{-5}", "10^{-3}"])
v.solucion(16, ["L(10^{-5})=70", "L(10^{-3})=90", aprox(dif), "73{,}01", "93{,}01"])
# 17
x_ = symbols('x_', positive=True)
v.ok(solve(2**(x + 1) - 32, x) == [4] and sorted(solve(3**(2 * x) - 4 * 3**x + 3, x)) == [0, 1], "ej. 17 a), b)")
v.ok(sorted(solve(x**2 - 2 * x - 3, x)) == [-1, 3] and solve(log(x_) + log(x_ - 2) - log(3), x_) == [3] and solve(log(x_, 2) + log(x_ - 2, 2) - 3, x_) == [4], "ej. 17 c), d)")
v.ok(sorted(solve(x**2 - 2 * x - 8, x)) == [-2, 4], "ej. 17 d): raíces -2 y 4")
v.enunciado(17, ["2^{x+1}=32", "3^{2x}-4\\cdot3^x+3=0", "\\ln x+\\ln(x-2)=\\ln 3", "\\log_2 x+\\log_2(x-2)=3"])
v.solucion(17, ["x=4", "x=0", "x=1", "x=3", "x=-1", "x=-2"])
# 18
s18 = solve([c - 3, a + b + c - 2, 9 * a + 3 * b + c - 6], [a, b, c])
f18 = s18[a] * x**2 + s18[b] * x + s18[c]
v.ok(s18 == {a: 1, b: -2, c: 3} and f18.subs(x, 1) == 2 and (4 - 12) < 0, "ej. 18")
v.enunciado(18, ["(0,3)", "(1,2)", "(3,6)"])
v.solucion(18, ["c=3", "a=1", "b=-2", "f(x)=x^2-2x+3", "(1,2)"])
# 19
a19 = R(1, 10) * 12000
T19 = 1200 + R(2, 10) * (20000 - 12000)
v.ok(a19 == 1200 and T19 == 2800 and R(T19, 20000) == R(14, 100), "ej. 19")
v.enunciado(19, ["0{,}10\\,x", "a+0{,}2\\,(x-12000)"])
v.solucion(19, ["a=1200", "T(20000)=2800", "14\\,\\%"])
# 20
f20 = (x**2 - 4) / (x - 1)
v.ok(continuous_domain(f20, x, S.Reals) == S.Reals - FiniteSet(1) and f20.subs(x, 0) == 4 and sorted(solve(f20, x)) == [-2, 2], "ej. 20: dominio y cortes")
signos = [(-3, -1), (0, 1), (R(3, 2), -1), (3, 1)]
v.ok(all((f20.subs(x, k) > 0) == (sg > 0) for k, sg in signos), "ej. 20: signos en los cuatro intervalos")
v.ok(limit(f20, x, 1, '-') == oo and limit(f20, x, 1, '+') == -oo, "ej. 20: asíntota x=1 (+∞ a la izquierda, -∞ a la derecha)")
v.enunciado(20, ["\\dfrac{x^2-4}{x-1}"])
v.solucion(20, ["(0,4)", "(-2,0)", "(2,0)", f"f(-3)={tx(f20.subs(x, -3))}", f"f(\\frac{{1}}{{2}})={tx(f20.subs(x, R(1, 2)))}", f"f(3)={tx(f20.subs(x, 3))}", "x=1"])
# 21
A21, B21 = 10 + R(5, 100) * m_, R(12, 100) * m_
m21 = solve(A21 - B21, m_)[0]
v.ok(m21 == R(1000, 7) and round(float(m21), 2) == 142.86 and A21.subs(m_, 100) == 15 and B21.subs(m_, 100) == 12 and A21.subs(m_, 200) == 20 and B21.subs(m_, 200) == 24, "ej. 21")
v.enunciado(21, ["10 €", "0,05 €", "0,12 €"])
v.solucion(21, ["A(m)=10+0{,}05m", "B(m)=0{,}12m", "m=\\frac{1000}{7}", "142{,}86", "A(100)=15", "B(100)=12", "A(200)=20", "B(200)=24"])
# 22
f22 = 30 + 10 * log(x)
v.ok(f22.subs(x, 1) == 30 and f22.subs(x, E) == 40 and simplify(f22.subs(x, E**2)) == 50 and solve(f22 - 60, x) == [E**3] and simplify(f22.subs(x, E * x) - f22 - 10) == 0, "ej. 22")
v.enunciado(22, ["30+10\\ln t"])
v.solucion(22, ["f(1)=30", "f(\\mathrm{e})=40", "f(\\mathrm{e}^2)=50", "t=\\mathrm{e}^3", aprox(E**3)])
# 23
simple = 1000 + 1000 * R(4, 100) * 10
comp = 1000 * R(104, 100)**10
t23 = N(log(3) / log(R(104, 100)), 20)
v.ok(simple == 1400 and round(float(comp), 2) == 1480.24, "ej. 23")
v.enunciado(23, ["1000 €", "4\\,\\%"])
v.solucion(23, ["1400", aprox(comp), "C(t)=1000\\cdot1{,}04^t", f"t\\approx{aprox(t23)}", aprox(comp - simple)])
# 24
f24 = Abs(x - 2) + 1
v.ok(solve(f24 - 4, x) == [-1, 5] and f24.subs(x, 2) == 1 and all(f24.subs(x, k) >= 1 for k in range(-10, 11)), "ej. 24")
v.ok(all(f24.subs(x, k) == (3 - k if k < 2 else k - 1) for k in range(-6, 8)), "ej. 24: la definición a trozos coincide con |x-2|+1")
v.enunciado(24, ["|x-2|+1"])
v.solucion(24, ["f(x)=\\begin{cases}3-x&x<2\\\\x-1&x\\ge2\\end{cases}", "(2,1)", "x=5", "x=-1"])
# 25
B25 = expand((-x**2 + 12 * x) - (2 * x + 16))
v.ok(B25 == -x**2 + 10 * x - 16 and sorted(solve(B25, x)) == [2, 8] and solve(diff(B25, x), x) == [5] and B25.subs(x, 5) == 9, "ej. 25")
v.ok((-x**2 + 12 * x).subs(x, 2) == (2 * x + 16).subs(x, 2) == 20 and (-x**2 + 12 * x).subs(x, 8) == (2 * x + 16).subs(x, 8) == 32, "ej. 25: ingresos = costes en 2 y 8")
v.enunciado(25, ["-x^2+12x", "2x+16"])
v.solucion(25, ["B(x)=-x^2+10x-16", "x=5", "B(5)=9", "I(2)=20", "C(2)=20", "I(8)=32", "C(8)=32"])
v.fin()
