#!/usr/bin/env python3
"""Verifica las soluciones PAU CCSS de 2024 (data/2024-*.md, soluciones/2024-*.md). Ver _verif.py.

Uso:  python scripts/ebau-ccss/verificar_2024.py     (requiere `pip install sympy`)
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _verif import Verificador, R, Matrix, tx, dec, mat, vertices  # noqa: E402
from sympy import symbols, solve, diff, integrate, sqrt, log, exp, simplify, eye, factor, expand, limit, oo  # noqa: E402

v = Verificador(2024)
x, y, a, b, c, t = symbols("x y a b c t")


def ic_prop(p, n, z):
    E = z * sqrt(p * (1 - p) / n)
    return E, p - E, p + E


def cerca(val, objetivo, tol=5e-5):
    return abs(float(val) - objetivo) < tol


# ======================= 2024-ord-a =======================
s = "2024-ord-a"
A = Matrix([[1, 1, -2], [a - 3, a - 1, 1], [0, 2, a]])
A1 = A.subs(a, 1)
Bm = Matrix([[-1, 3, 2]])
Cm = Matrix([[-2, 1, 4]])
X = (Bm + Cm * A1) * A1.inv()
v.ok(expand(A.det() - (10 - 2 * a)) == 0 and solve(A.det(), a) == [5] and A1.det() == 8 and X * A1 - Bm == Cm * A1 and X == Matrix([[-2, R(3, 2), R(11, 2)]]) and Bm * A1.inv() == Matrix([[0, R(1, 2), R(3, 2)]])
     and (Bm * A1).shape == (1, 3) and (Cm.T * Bm).shape == (3, 3), "2024-ord-a ej.1")
v.solucion(s, "1", "|A|=-2(a-5)", "a\\neq5", "|A|=8", mat(A1.inv()), mat(X), "1\\times3")

V = vertices([(0, 1, 20, "<="), (100, 110, 5500, "<="), (50, 80, 3000, "<="), (1, 0, 20, ">="), (0, 1, 0, ">=")])
Pv = {q: 5000 * q[0] + 10000 * q[1] for q in V}
v.ok(V == [(20, 0), (20, 20), (28, 20), (44, 10), (55, 0)] and max(Pv.values()) == Pv[(28, 20)] == 340000 and Pv[(20, 0)] == 100000 and Pv[(20, 20)] == 300000 and Pv[(44, 10)] == 320000 and Pv[(55, 0)] == 275000, "2024-ord-a ej.2")
v.solucion(s, "2", "(20,0)", "(20,20)", "(28,20)", "(44,10)", "(55,0)", "340\\,000")

fx = (x ** 2 + 2) ** 3 * exp(-2 * x)
gx = log(1 - x ** 3) / (1 - 2 * x ** 2) ** 2
gp = (-3 * x ** 2 / (1 - x ** 3) * (1 - 2 * x ** 2) + 8 * x * log(1 - x ** 3)) / (1 - 2 * x ** 2) ** 3
hh = x ** 3 + a * x ** 2 + 3 * x + b
v.ok(simplify(diff(fx, x) - 2 * (x ** 2 + 2) ** 2 * exp(-2 * x) * (3 * x - x ** 2 - 2)) == 0 and simplify(diff(gx, x) - gp) == 0 and solve([diff(hh, x).subs(x, 1), hh.subs(x, 1) - 2], [a, b]) == {a: -3, b: 1}, "2024-ord-a ej.3")
v.solucion(s, "3", "2\\left(x^2+2\\right)^2e^{-2x}\\left(3x-x^2-2\\right)", "a=-3", "b=1", "\\left(1-2x^2\\right)^3")

v1, v2 = t ** 2 - 8 * t + 60, -t ** 2 + 32 * t - 140
v.ok(v1.subs(t, 10) == v2.subs(t, 10) == 80 and diff(v1, t).subs(t, 10) == diff(v2, t).subs(t, 10) == 12 and [v1.subs(t, 0), v1.subs(t, 4), v2.subs(t, 16), v2.subs(t, 24)] == [60, 44, 116, 52]
     and sorted(solve(v2 - 100, t)) == [12, 20] and v1.subs(t, 10) < 100 and 116 < 140, "2024-ord-a ej.4")
v.solucion(s, "4", "v(0)=60", "v'(10^-)=12", "t^2-32t+240\\le0", "116<140")

total, nuevos, jovenes, jv = 54, 19, 29, 21
viejos, seniors = total - nuevos, total - jovenes
jn, sv = jovenes - jv, viejos - jv
sn = nuevos - jn
v.ok((viejos, seniors, jn, sv, sn) == (35, 25, 8, 14, 11) and sn + jn + sv + jv == total and R(sv, total) == R(7, 27) and R(jv, viejos) == R(3, 5) and jn < sn and cerca(R(7, 27), 0.2593), "2024-ord-a ej.5")
v.solucion(s, "5", "\\frac{14}{54}=\\frac{7}{27}", "\\approx0{,}2593", "\\frac{21}{35}=\\frac{3}{5}", "11", "8<11")

pM = R(42, 100) * R(65, 100) + R(32, 100) * R(75, 100) + R(26, 100) * R(8, 10)
v.ok(1 - R(42, 100) - R(32, 100) == R(26, 100) and pM == R(721, 1000) and R(42, 100) * R(35, 100) == R(147, 1000) and R(26, 100) * R(2, 10) / (1 - pM) == R(52, 279) and cerca(R(52, 279), 0.1864), "2024-ord-a ej.6")
v.solucion(s, "6", "P(M)=0{,}721", "P(A\\cap M^C)=0{,}147", "P(X\\mid M^C)=\\frac{52}{279}", "\\approx0{,}1864")

import itertools as it
d = [-3, -1, 2, 5, 7]
mu = R(sum(d), 5)
var = sum((q - mu) ** 2 for q in d) / 5
medias = [R(i + j, 2) for i, j in it.product(d, repeat=2)]
mm = sum(medias) / 25
vm = sum((q - mm) ** 2 for q in medias) / 25
v.ok(R(30, 1) / R(5, 100) == 600 and R(100, 1) / R(2, 10) == 500 and R(25, 500) * 400 == 20 and R(80, 400) * 500 == 100 and R(80, 400) * 600 == 120 and 500 + 600 + 400 + 500 == 2000
     and mu == 2 and var == R(68, 5) and mm == 2 and vm == var / 2 == R(34, 5), "2024-ord-a ej.7")
v.solucion(s, "7", "\\frac{30}{0{,}05}=600", "\\frac{100}{0{,}2}=500", "0{,}05\\cdot400=20", "\\mu=\\frac{-3-1+2+5+7}{5}=2", "\\sigma^2=\\frac{25+9+0+9+25}{5}=\\frac{68}{5}=13{,}6", "\\sigma_{\\bar x}^2=\\frac{\\sigma^2}{2}=\\frac{13{,}6}{2}=6{,}8")

E8, lo8, hi8 = ic_prop(R(73, 100), 2500, R(196, 100))
n8 = R(217, 100) ** 2 * R(73, 100) * R(27, 100) / R(1, 100) ** 2
v.ok(R(1825, 2500) == R(73, 100) and cerca(E8, 0.0174) and cerca(lo8, 0.7126) and cerca(hi8, 0.7474) and cerca(n8, 9281.24, 5e-3) and int(n8) + 1 == 9282, "2024-ord-a ej.8")
v.solucion(s, "8", "E=0{,}0174", "(0{,}7126,0{,}7474)", "9\\,281{,}24", "n=9\\,282")

# ======================= 2024-ord-b =======================
s = "2024-ord-b"
A = Matrix([[1, 2, 0], [0, -1, 2], [-2, 0, 1]])
X = A.inv() - A ** 2
v.ok(A.det() == -9 and A ** 2 * X + A ** 4 == A and X == Matrix([[R(-8, 9), R(2, 9), R(-40, 9)], [R(40, 9), R(-10, 9), R(2, 9)], [R(38, 9), R(40, 9), R(-8, 9)]]), "2024-ord-b ej.1")
v.solucion(s, "1", "|A|=-9", "X=A^{-1}-A^2", mat(A.inv()), mat(A ** 2), mat(X))

V = vertices([(1, -1, 10, "<="), (-1, 1, 10, "<="), (1, 1, 10, ">="), (2400, 3600, 78000, "<="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
Au = {q: 34000 * q[0] + 72000 * q[1] for q in V}
v.ok(V == [(0, 10), (7, 17), (10, 0), (19, 9)] and max(Au.values()) == Au[(7, 17)] == 1462000 and Au[(0, 10)] == 720000 and Au[(10, 0)] == 340000 and Au[(19, 9)] == 1294000, "2024-ord-b ej.2")
v.solucion(s, "2", "(0,10)", "(10,0)", "(19,9)", "(7,17)", "1\\,462\\,000")

fx = (2 * x - 6) / (2 - x)
v.ok(simplify(diff(fx, x) + 2 / (2 - x) ** 2) == 0 and limit(fx, x, oo) == -2 and limit(fx, x, 2, "+") == oo and limit(fx, x, 2, "-") == -oo and solve(fx, x) == [3] and fx.subs(x, 0) == -3 and fx.subs(x, 1) == -4, "2024-ord-b ej.3")
v.solucion(s, "3", "f'(x)=\\frac{-2}{(2-x)^2}", "y=-2", "(3,0)", "(0,-3)", "(1,-4)")

f1, f2 = -x ** 2 + 4 * x + 3, 2 * x - 5
v.ok(f1.subs(x, 4) == f2.subs(x, 4) == 3 and diff(f1, x).subs(x, 4) == -4 and diff(f2, x) == 2 and solve(diff(f1, x), x) == [2] and f1.subs(x, 2) == 7 and integrate(f1, (x, 3, 4)) == R(14, 3) and integrate(f2, (x, 4, 5)) == 4 and R(14, 3) + 4 == R(26, 3), "2024-ord-b ej.4")
v.solucion(s, "4", "f'(4^-)=-4", "(2,7)", "(4,3)", "A=\\frac{26}{3}")

pC = R(7, 100) / R(28, 100)
pCn = 1 - pC
pCM = pCn * R(36, 100)
v.ok(pC == R(1, 4) and pCn == R(3, 4) and pCM == R(27, 100) and pCn - pCM == R(48, 100) and pC - R(7, 100) == R(18, 100) and R(48, 100) + R(18, 100) == R(66, 100) and 1 - R(7, 100) == R(93, 100) and 1 - R(36, 100) == R(64, 100)
     and pCn * (R(48, 100) + R(7, 100)) == R(4125, 10000) != R(48, 100), "2024-ord-b ej.5")
v.solucion(s, "5", "P(C)=0{,}75", "P(C\\cap M)=0{,}27", "P(C\\cap M^C)=0{,}48", "P(C^C\\cap M)=0{,}18", "0{,}48+0{,}18=0{,}66", "1-0{,}07=0{,}93", "1-0{,}36=0{,}64", "P(C)\\,P(M^C)=0{,}4125")

pT = (R(8749, 10000) - R(72, 100) * R(87, 100) - R(17, 100) * R(86, 100)) / R(11, 100)
pPM = R(17, 100) * R(86, 100) / R(8749, 10000)
v.ok(1 - R(72, 100) - R(11, 100) == R(17, 100) and pT == R(93, 100) and cerca(pPM, 0.1671) and cerca(1 - pPM, 0.8329), "2024-ord-b ej.6")
v.solucion(s, "6", "P(M\\mid T)=0{,}93", "\\approx0{,}1671", "0{,}8329")

v.ok(cerca(R(10, 22), 0.4545, 5e-5) and 2 * R(6736, 10000) - 1 == R(3472, 10000) and R(22, 4) == R(11, 2) and (R(140) - 145) / R(11, 2) < 0 and cerca(R(8621, 10000) - (1 - R(8186, 10000)), 0.6807), "2024-ord-b ej.7")
v.solucion(s, "7", "2\\,P(Z<0{,}45)-1=2\\cdot0{,}6736-1=0{,}3472", "N(145,5{,}5)", "P(-0{,}91<Z<1{,}09)=0{,}6807")

E8, lo8, hi8 = ic_prop(R(4, 100), 300, R(217, 100))
n8 = R(196, 100) ** 2 * R(4, 100) * R(96, 100) / R(2, 100) ** 2
v.ok(cerca(E8, 0.0246, 5e-5) and cerca(lo8, 0.0154, 5e-5) and cerca(hi8, 0.0646, 5e-5) and cerca(n8, 368.79, 5e-3) and int(n8) + 1 == 369, "2024-ord-b ej.8")
v.solucion(s, "8", "E=0{,}0246", "(0{,}0154,0{,}0646)", "368{,}79", "n=369")

# ======================= 2024-ord-res-a =======================
s = "2024-ord-res-a"
A = Matrix([[1, -1, 1], [-2, 1, 0]])
Bm = Matrix([[0, -1], [1, 0], [-1, 2]])
Cm = Matrix([[1, 3, 2], [1, 1, 1], [0, 3, 1]])
Ip = Matrix([[1, 0, 0], [0, 1, 0]])
X = (A * Bm).inv() * Ip * Cm.inv()
v.ok((A * Bm).det() == -5 and Cm.det() == 1 and A * Bm * X * Cm == Ip and X == Matrix([[R(3, 5), -1, R(-1, 5)], [R(-4, 5), 1, R(3, 5)]]), "2024-ord-res-a ej.1")
Dm, Em = Matrix.zeros(3, 2), Matrix.zeros(2, 3)
v.ok((A * Dm).shape == (Em * Bm).shape == (2, 2), "2024-ord-res-a ej.1b")
v.solucion(s, "1", mat(A * Bm), "|AB|=-5", mat((A * Bm).inv()), "|C|=1", mat(Cm.inv()), mat(X))

V = vertices([(1, 1, 160, "<="), (1, 1, 60, ">="), (1, 0, 20, ">="), (-1, 1, 0, ">="), (0, 1, 0, ">=")])
Gv = {q: R(3, 2) * q[0] + R(9, 10) * q[1] for q in V}
v.ok(V == [(20, 40), (20, 140), (30, 30), (80, 80)] and min(Gv.values()) == Gv[(20, 40)] == 66 and Gv[(20, 140)] == 156 and Gv[(30, 30)] == 72 and Gv[(80, 80)] == 192, "2024-ord-res-a ej.2")
v.solucion(s, "2", "(20,40)", "(20,140)", "(80,80)", "(30,30)", "66")

f = 90000 + 400 * t + 20 * t ** R(3, 2)
v.ok(simplify(diff(f, t) - (400 + 30 * sqrt(t))) == 0 and f.subs(t, 0) == 90000 and f.subs(t, 9) == 94140 and f.subs(t, 16) - f.subs(t, 9) == 3540 and f.subs(t, 36) - f.subs(t, 0) == 18720 and 18720 * 150 == 2808000, "2024-ord-res-a ej.3")
v.solucion(s, "3", "f(9)=94\\,140", "97\\,680-94\\,140=3\\,540", "18\\,720", "2\\,808\\,000")

fe = 3 + exp(x)
fa = x ** 2 - 3 * x + 2
v.ok(solve(3 + exp(1) - (3 + a), a) == [exp(1)] and diff(fe, x).subs(x, 1) == exp(1) and (2 + exp(1)) != exp(1) and fe.subs(x, 0) == 4 and diff(fe, x).subs(x, 0) == 1 and sorted(solve(fa, x)) == [1, 2] and integrate(fa, (x, 2, 4)) == R(14, 3), "2024-ord-res-a ej.4")
v.solucion(s, "4", "a=e", "f'(1^+)=2+a=2+e", "y=x+4", "A=\\frac{14}{3}")

pF = R(65, 100)
pM = pF * R(5, 10) + (1 - pF) * R(15, 100)
v.ok(1 - R(10, 100) == R(90, 100) and 1 - R(40, 100) == R(60, 100) and R(65, 100) * R(4, 10) + R(35, 100) * R(4, 10) == R(4, 10) and pM == R(3775, 10000) and pF * R(5, 10) / pM == R(130, 151) and cerca(R(130, 151), 0.8609), "2024-ord-res-a ej.5")
v.solucion(s, "5", "P(L)=0{,}4", "P(M)=0{,}3775", "P(F\\mid M)=\\frac{130}{151}", "\\approx0{,}8609")

pA, pB, pAB = R(75, 100), R(55, 100), R(35, 100)
pU = pA + pB - pAB
v.ok((pA - pAB) / pA == R(8, 15) and pU == R(95, 100) and 1 - pU == R(5, 100) and pA / pU == R(15, 19) and pA * pB == R(4125, 10000) != pAB and cerca(R(8, 15), 0.5333) and cerca(R(15, 19), 0.7895), "2024-ord-res-a ej.6")
v.solucion(s, "6", "P(B^C\\mid A)=\\frac{8}{15}", "\\approx0{,}5333", "P(A\\cup B)=0{,}95", "P(A^C\\cap B^C)=0{,}05", "P(A\\mid A\\cup B)=\\frac{15}{19}", "\\approx0{,}7895", "P(A)P(B)=0{,}4125")

E7, lo7, hi7 = ic_prop(R(355, 1000), 2000, R(211, 100))
n7 = R(233, 100) ** 2 * R(37, 100) * R(63, 100) / R(15, 1000) ** 2
v.ok(cerca(E7, 0.0226) and cerca(lo7, 0.3324) and cerca(hi7, 0.3776) and cerca(n7, 5624.34, 5e-3) and int(n7) + 1 == 5625, "2024-ord-res-a ej.7")
v.solucion(s, "7", "E=0{,}0226", "(0{,}3324,0{,}3776)", "5\\,624{,}34", "n=5\\,625")

xb = R(51765 + 55195, 200)
E8a = R(55195 - 51765, 200)
n8 = (R(196, 100) * 140 / E8a) ** 2
E8b = R(217, 100) * 140 / sqrt(78)
v.ok(xb == R(5348, 10) and E8a == R(1715, 100) and n8 == 256 and cerca(E8b, 34.3986, 5e-4) and R(8577, 10000) - R(6554, 10000) == R(2023, 10000) and (R(600) - 540) / 150 == R(4, 10), "2024-ord-res-a ej.8")
v.solucion(s, "8", "\\bar x=534{,}8", "E=17{,}15", "!n=256", "E=34{,}3986", "P(0{,}4<Z<1{,}07)=0{,}2023")


# ======================= 2024-ord-res-b =======================
s = "2024-ord-res-b"
A = Matrix([[0, 1], [1, 0]])
Bm = Matrix([[3, 2], [2, 0]])
Cm = Matrix([[1, 0], [1, 1]])
X = (4 * A + Bm) / 3
Y = Bm - X
D = Matrix.zeros(2, 3)
v.ok(2 * X - Y == 4 * A and X + Y == Bm and X == Matrix([[1, 2], [2, 0]]) and Y == Matrix([[2, 0], [0, 0]]) and all(Cm ** n == Matrix([[1, 0], [n, 1]]) for n in range(1, 12))
     and (A.T * Bm + D * D.T).shape == (2, 2) and D.shape[1] != Bm.T.shape[0] and (D.T * A.T).shape == (3, 2) != D.shape, "2024-ord-res-b ej.1")
v.solucion(s, "1", mat(4 * A + Bm), mat(X), mat(Y), "C^n=" + "\\begin{pmatrix}1&0\\\\n&1\\end{pmatrix}", mat(Matrix([[1, 0], [2024, 1]])))

V = vertices([(1, 2, 50, "<="), (2, 1, 40, "<="), (0, 1, 25, "<="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
Iv = {q: 150 * q[0] + 200 * q[1] for q in V}
v.ok(V == [(0, 0), (0, 25), (10, 20), (20, 0)] and max(Iv.values()) == Iv[(10, 20)] == 5500 and (50 - 10 - 40, 40 - 20 - 20, 25 - 20) == (0, 0, 5), "2024-ord-res-b ej.2")
v.solucion(s, "2", "(0,0)", "(0,25)", "(10,20)", "(20,0)", "5\\,500", "10+40=50", "20+20=40")

v.ok(solve([a - b, b / 3 - R(2, 3)], [a, b]) == {a: 2, b: 2} and 1 + 2 - 1 == 2 and diff(x ** 2 + 2 * x - 1, x).subs(x, 1) == 4 and diff(2 / x, x).subs(x, 1) == -2 and diff(2 / x, x).subs(x, 3) == R(-2, 9) and R(1, 3) != R(-2, 9)
     and simplify(integrate(2 / x, (x, 2, 3)) + integrate((x - 1) / 3, (x, 3, 4)) - 2 * log(R(3, 2)) - R(5, 6)) == 0 and cerca(2 * log(R(3, 2)) + R(5, 6), 1.6442, 5e-4), "2024-ord-res-b ej.3")
v.solucion(s, "3", "a=b=2", "f'(1^-)=4", "f'(1^+)=-2", "f'(3^-)=-\\frac{2}{9}", "A=2\\ln\\frac{3}{2}+\\frac{5}{6}")

f1, f2 = -x ** 2 / 2 + x + 1, 1 / (x - 1)
v.ok(f1.subs(x, 2) == f2.subs(x, 2) == 1 and diff(f1, x).subs(x, 2) == diff(f2, x).subs(x, 2) == -1 and f1.subs(x, 1) == R(3, 2) and integrate(f1, (x, 0, 2)) == R(8, 3) and simplify(integrate(f2, (x, 2, 4)) - log(3)) == 0 and cerca(R(8, 3) + log(3), 3.7653, 5e-4), "2024-ord-res-b ej.4")
v.solucion(s, "4", "f'(2^-)=-1", "\\left(1,\\frac{3}{2}\\right)", "A=\\frac{8}{3}+\\ln3")

pM = R(3, 10) * R(4, 10) / R(25, 100)
v.ok(1 - R(3, 10) - R(5, 10) == R(2, 10) and pM == R(48, 100) and 1 - pM == R(52, 100) and (R(3, 10) - R(12, 100)) + (pM - R(12, 100)) == R(54, 100), "2024-ord-res-b ej.5")
v.solucion(s, "5", "P(\\text{ninguna})=0{,}2", "P(M)=0{,}48", "P(R\\cap M^C)=0{,}18", "P(R^C\\cap M)=0{,}36", "0{,}18+0{,}36=0{,}54")

pD = R(3, 10) * R(75, 100) + R(25, 100) * R(6, 10) + R(45, 100) * R(15, 100)
v.ok(pD == R(4425, 10000) and 1 - pD == R(223, 400) and R(225, 1000) / pD == R(30, 59) and cerca(R(30, 59), 0.5085), "2024-ord-res-b ej.6")
v.solucion(s, "6", "P(D)=0{,}4425", "P(D^C)=0{,}5575", "P(E\\mid D)=\\frac{30}{59}", "\\approx0{,}5085")

v.ok(4000 - 1420 - 980 - 720 == 880 and [R(200, 4000) * q for q in (1420, 980, 720, 880)] == [71, 49, 36, 44] and R(132, 100) / 11 == R(12, 100) and (R(36, 10) - R(385, 100)) / R(12, 100) == R(-25, 12) and (4 - R(385, 100)) / R(12, 100) == R(5, 4) and R(8944, 10000) - (1 - R(9812, 10000)) == R(8756, 10000), "2024-ord-res-b ej.7")
v.solucion(s, "7", "0{,}05\\cdot1\\,420=71", "0{,}05\\cdot980=49", "0{,}05\\cdot720=36", "0{,}05\\cdot880=44", "N(3{,}85,0{,}12)", "P(-2{,}08<Z<1{,}25)=0{,}8756")

d = [20, 25, 30, 35, 35, 20, 20, 25, 30, 30]
E8 = R(233, 100) * 5 / sqrt(10)
v.ok(sum(d) == 270 and R(sum(d), 10) == 27 and cerca(E8, 3.684, 5e-4) and cerca(27 - E8, 23.316, 5e-4) and cerca(27 + E8, 30.684, 5e-4) and 27 + E8 < 35 and (R(20) - R(272, 10)) / 5 == R(-36, 25) and R(9251, 10000) == R(9251, 10000), "2024-ord-res-b ej.8")
v.solucion(s, "8", "\\bar x=\\frac{270}{10}=27", "E=3{,}684", "(23{,}316,30{,}684)", "P(X>20)=0{,}9251")


# ======================= 2024-ord-sup-a =======================
s = "2024-ord-sup-a"
P = Matrix([[1, 0, 1], [0, 1, 0], [1, -1, -1]])
J = Matrix([[2, 1, 0], [0, 2, 0], [0, 0, -1]])
A = P * J * P.inv()
v.ok(P.det() == -2 and P.inv() * A * P == J and A == Matrix([[R(1, 2), R(5, 2), R(3, 2)], [0, 2, 0], [R(3, 2), R(-1, 2), R(1, 2)]]) and A ** 3 == P * J ** 3 * P.inv() and J ** 3 == Matrix([[8, 12, 0], [0, 8, 0], [0, 0, -1]]), "2024-ord-sup-a ej.1")
v.solucion(s, "1", "|P|=-2", mat(P.inv()), mat(P * J), mat(A), mat(J ** 3), mat(P * J ** 3), mat(A ** 3))

V = vertices([(1, 1, 12, ">="), (1, 1, 40, "<="), (1, -3, 0, ">="), (0, 1, 0, ">="), (1, 0, 0, ">=")])
Iv = {q: 32 * q[0] + 35 * q[1] for q in V}
v.ok(V == [(9, 3), (12, 0), (30, 10), (40, 0)] and max(Iv.values()) == Iv[(30, 10)] == 1310 and Iv[(12, 0)] == 384 and Iv[(40, 0)] == 1280 and Iv[(9, 3)] == 393, "2024-ord-sup-a ej.2")
v.solucion(s, "2", "(12,0)", "(40,0)", "(30,10)", "(9,3)", "1\\,310")

fx, gx = -x ** 2 + 6 * x, x ** 2 / 5
Area = integrate(fx - gx, (x, 0, 5))
v.ok(sorted(solve(fx - gx, x)) == [0, 5] and fx.subs(x, 5) == gx.subs(x, 5) == 5 and Area == 25 and 25 * 100 == 2500 and 2500 * 75 == 187500, "2024-ord-sup-a ej.3")
v.solucion(s, "3", "(5,5)", "-50+75=25", "2\\,500\\cdot75=187\\,500")

f1, f2 = 2 - x ** 2, (x - 2) ** 2
v.ok(f1.subs(x, 1) == f2.subs(x, 1) == 1 and diff(f1, x).subs(x, 1) == diff(f2, x).subs(x, 1) == -2 and sorted(solve(f1 - 1, x)) == [-1, 1] and sorted(solve(f2 - 1, x)) == [1, 3]
     and integrate(f1 - 1, (x, -1, 1)) == R(4, 3) and integrate(1 - f2, (x, 1, 3)) == R(4, 3), "2024-ord-sup-a ej.4")
v.solucion(s, "4", "f'(1^-)=-2", "A=\\frac{8}{3}", "\\frac{4}{3}+\\frac{4}{3}")

pF = 1 - R(4, 10)
pHF = pF * R(3, 10)
pU = R(45, 100) + pF - pHF
v.ok(pHF == R(18, 100) and 1 - pU == R(13, 100) and (pF - pHF) / (1 - R(45, 100)) == R(42, 55) and cerca(R(42, 55), 0.7636), "2024-ord-sup-a ej.5")
v.solucion(s, "5", "P(H\\cap F)=0{,}18", "P(H^C\\cap F^C)=0{,}13", "\\frac{42}{55}", "\\approx0{,}7636")

pB = R(35, 100) * R(99, 100) / (1 - R(205, 10000))
p = (R(205, 10000) - R(35, 100) * R(1, 100)) / R(65, 100)
pAD = R(25, 100) * p / R(205, 10000)
v.ok(pB == R(231, 653) and p == R(17, 650) and pAD == R(170, 533) and cerca(pB, 0.3538) and cerca(pAD, 0.3189), "2024-ord-sup-a ej.6")
v.solucion(s, "6", "P(B\\mid D^C)=\\frac{231}{653}", "\\approx0{,}3538", "p=\\frac{17}{650}", "P(A\\mid D)=\\frac{170}{533}", "\\approx0{,}3189")

E7, lo7, hi7 = ic_prop(R(3, 4), 220, R(224, 100))
n7 = R(224, 100) ** 2 * R(3, 4) * R(1, 4) / R(25, 1000) ** 2
v.ok(R(165, 220) == R(3, 4) and cerca(E7, 0.0654) and cerca(lo7, 0.6846) and cerca(hi7, 0.8154) and lo7 < R(7, 10) < hi7 and cerca(n7, 1505.28, 5e-3) and int(n7) + 1 == 1506, "2024-ord-sup-a ej.7")
v.solucion(s, "7", "E=0{,}0654", "(0{,}6846,0{,}8154)", "1\\,505{,}28", "n=1\\,506")

d = [R(q) for q in "2.71 3.84 3.26 2.28 2.86 3.08 3.07 2.46 2.54 2.58".split()]
m8 = sum(d) / 10
E8 = R(185, 100) * R(36, 100) / sqrt(10)
n8 = (R(185, 100) * R(36, 100) / R(5, 100)) ** 2
v.ok(sum(d) == R(2868, 100) and m8 == R(2868, 1000) and cerca(E8, 0.2106) and cerca(m8 - E8, 2.6574) and cerca(m8 + E8, 3.0786) and cerca(n8, 177.42, 5e-3) and int(n8) + 1 == 178, "2024-ord-sup-a ej.8")
v.solucion(s, "8", "\\bar x=2{,}868", "E=0{,}2106", "(2{,}6574,3{,}0786)", "177{,}42", "n=178")


# ======================= 2024-ord-sup-b =======================
s = "2024-ord-sup-b"
M = Matrix([[1, 0, 1], [2, 1, 0], [1, 1, 1]])
N = Matrix([[3, 2, 2], [5, 2, 1], [7, 4, 0]])
Va = Matrix([5 - a ** 2, a - 1, a ** 2])
X = (N + eye(3)) * M.inv()
v.ok(solve(list(M.T * Va - Matrix([5, 1, 5])), a, dict=True) == [{a: 1}] and M.det() == 2 and X * M - eye(3) == N and X == Matrix([[1, 1, 1], [0, 2, 1], [0, 3, 1]]) and Va.shape == (3, 1) and (N + M.T).shape == (3, 3), "2024-ord-sup-b ej.1")
v.solucion(s, "1", "a=1", "|M|=2", mat(M.inv()), mat(N + eye(3)), mat(X), "3\\times1")

V = vertices([(2, 6, 150, "<="), (3, 4, 120, "<="), (0, 1, 6, ">="), (1, 0, 0, ">=")])
Fv = {q: q[0] + q[1] for q in V}
v.ok(V == [(0, 6), (0, 25), (12, 21), (32, 6)] and max(Fv.values()) == Fv[(32, 6)] == 38 and Fv[(12, 21)] == 33 and 2 * 32 + 6 * 6 == 100 and 3 * 32 + 4 * 6 == 120, "2024-ord-sup-b ej.2")
v.solucion(s, "2", "(0,6)", "(0,25)", "(12,21)", "(32,6)", "2\\cdot32+6\\cdot6=100", "3\\cdot32+4\\cdot6=120")

fx = 1 - 4 / (3 + x)
v.ok(solve(fx, x) == [1] and fx.subs(x, 0) == R(-1, 3) and limit(fx, x, oo) == 1 and limit(fx, x, -3, "+") == -oo and limit(fx, x, -3, "-") == oo and sorted(solve(diff(fx, x) - 1, x)) == [-5, -1] and fx.subs(x, -1) == -1 and fx.subs(x, -5) == 3
     and simplify(diff(fx, x, 2) + 8 / (3 + x) ** 3) == 0, "2024-ord-sup-b ej.3")
v.solucion(s, "3", "(1,0)", "\\left(0,-\\frac{1}{3}\\right)", "x=-3", "y=1", "(-1,-1)", "(-5,3)", "f''(x)=-\\frac{8}{(3+x)^3}")

f1, f2 = -x ** 2 + 2 * x, x ** 2 - 2 * x
v.ok(f1.subs(x, 2) == f2.subs(x, 2) == 0 and diff(f1, x).subs(x, 2) == -2 and diff(f2, x).subs(x, 2) == 2 and expand(2 * x - f1 - x ** 2) == 0 and integrate(x ** 2, (x, -1, 1)) == R(2, 3), "2024-ord-sup-b ej.4")
v.solucion(s, "4", "f'(2^-)=-2", "A=\\frac{2}{3}")

v.ok(R(3, 15) * R(2, 14) == R(1, 35) and R(5, 15) * R(4, 14) == R(2, 21) and R(2, 15) * R(1, 14) == R(1, 105) and (R(1, 105)) / R(2, 15) == R(1, 14), "2024-ord-sup-b ej.5")
v.solucion(s, "5", "\\frac{6}{210}=\\frac{1}{35}", "\\frac{20}{210}=\\frac{2}{21}", "P(L_1\\mid L_2)=\\frac{1}{14}")

pBI = R(6, 10) * R(3, 10)
pBn = R(6, 10) - pBI
pSn = R(8, 10) - pBn
pSI = R(4, 10) - pSn
v.ok(pBI == R(18, 100) and pBn == R(42, 100) and pSn == R(38, 100) and pSI == R(2, 100) and pSn / R(4, 10) == R(95, 100) and pBI / (1 - R(8, 10)) == R(9, 10) and pBI + pSn == R(56, 100), "2024-ord-sup-b ej.6")
v.solucion(s, "6", "P(B\\cap I)=0{,}18", "P(B\\cap I^C)=0{,}42", "P(S\\cap I^C)=0{,}38", "P(S\\cap I)=0{,}02", "P(I^C\\mid S)=0{,}95", "P(B\\mid I)=0{,}9", "0{,}18+0{,}38=0{,}56")

E7, lo7, hi7 = ic_prop(R(925, 1000), 400, R(181, 100))
n7 = R(196, 100) ** 2 * R(925, 1000) * R(75, 1000) / R(15, 1000) ** 2
v.ok(cerca(E7, 0.0238) and cerca(lo7, 0.9012) and cerca(hi7, 0.9488) and lo7 > R(88, 100) and cerca(n7, 1184.49, 5e-3) and int(n7) + 1 == 1185, "2024-ord-sup-b ej.7")
v.solucion(s, "7", "E=0{,}0238", "(0{,}9012,0{,}9488)", "1\\,184{,}49", "n=1\\,185")

v.ok(R(30, 10) == 3 and (54 - 60) / R(3) == -2 and R(9772, 10000) == R(9772, 10000) and R(217, 100) * 20 / 5 == R(868, 100) and 40 - R(868, 100) == R(3132, 100) and 40 + R(868, 100) == R(4868, 100), "2024-ord-sup-b ej.8")
v.solucion(s, "8", "N(60,3)", "P(\\bar X>54)=0{,}9772", "E=8{,}68", "(31{,}32,48{,}68)")


v.fin()
