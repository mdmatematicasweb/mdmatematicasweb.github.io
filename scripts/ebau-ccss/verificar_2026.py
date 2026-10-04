#!/usr/bin/env python3
"""Verifica las soluciones PAU CCSS de 2026 (data/2026-*.md, soluciones/2026-*.md). Ver _verif.py.

Uso:  python scripts/ebau-ccss/verificar_2026.py     (requiere `pip install sympy`)
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _verif import Verificador, R, Matrix, tx, dec, mat, vertices  # noqa: E402
from sympy import symbols, solve, diff, integrate, sqrt, log, exp, simplify, eye, factor, expand, limit, oo, binomial  # noqa: E402

v = Verificador(2026)
x, y, a, b, c, t = symbols("x y a b c t")


def ic_prop(p, n, z):
    E = z * sqrt(p * (1 - p) / n)
    return E, p - E, p + E


def cerca(val, objetivo, tol=5e-5):
    return abs(float(val) - objetivo) < tol


# ======================= 2026-ord =======================
s = "2026-ord"
e, p, vv = symbols("e p vv")
sol = solve([20 * e + 5 * p + 20 * vv - 1800, 10 * e + 5 * p + 10 * vv - 1000, 4 * e + 20 * p + 12 * vv - 1560], [e, p, vv])
rec = {"E": (20 + 10 + 4) * 25, "P": (5 + 5 + 20) * 40, "V": (20 + 10 + 12) * 55}
v.ok(sol == {e: 25, p: 40, vv: 55} and 12 + 4 + 4 == 20 and 1800 + 1000 + 1560 == 4360 and rec == {"E": 850, "P": 1200, "V": 2310} and sum(rec.values()) == 4360 and max(rec.values()) == rec["V"], "2026-ord ej.1A")
v.solucion(s, "1A", "e+v=80", "p=40", "v=55", "4\\,360", "34\\cdot25=850", "30\\cdot40=1\\,200", "42\\cdot55=2\\,310")

V = vertices([(1, 0, 12, "<="), (0, 1, 18, "<="), (1, 1, 26, "<="), (10, 30, 600, "<="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
Bv = {q: 10 * q[0] + 20 * q[1] for q in V}
v.ok(V == [(0, 0), (0, 18), (6, 18), (9, 17), (12, 0), (12, 14)] and max(Bv.values()) == Bv[(9, 17)] == 430 and Bv[(0, 18)] == 360 and Bv[(6, 18)] == 420 and Bv[(12, 14)] == 400 and Bv[(12, 0)] == 120, "2026-ord ej.1B")
v.solucion(s, "1B", "(0,0)", "(0,18)", "(6,18)", "(9,17)", "(12,14)", "(12,0)", "430")

aa, bb = symbols("aa bb")
sol = solve([aa + 20 * bb - 20, aa + 50 * bb - 11], [aa, bb])
f1, f2, f3 = x ** 2 / 20, 26 - R(3, 10) * x, 36 - x ** 2 / 100
Area = integrate(f1, (x, 0, 20)) + integrate(f2, (x, 20, 50)) + integrate(f3, (x, 50, 60))
v.ok(sol == {aa: 26, bb: R(-3, 10)} and f1.subs(x, 20) == f2.subs(x, 20) == 20 and f2.subs(x, 50) == f3.subs(x, 50) == 11 and f3.subs(x, 60) == 0 and diff(f1, x).subs(x, 20) == 2 and diff(f2, x) == R(-3, 10) and Area == 655
     and integrate(f1, (x, 0, 20)) == R(400, 3) and integrate(f2, (x, 20, 50)) == 465 and integrate(f3, (x, 50, 60)) == R(170, 3), "2026-ord ej.2")
v.solucion(s, "2", "a=26", "b=-\\frac{3}{10}", "f'(20^-)=2", "\\frac{400}{3}+465+\\frac{170}{3}=655", "A=655")

import itertools as it
d = [-5, -2, 13, 18, 20]
mu = R(sum(d), 5)
var = sum((q - mu) ** 2 for q in d) / 5
medias = [R(i + j + k, 3) for i, j, k in it.product(d, repeat=3)]
mm = sum(medias) / 125
vm = sum((q - mm) ** 2 for q in medias) / 125
pB = 1 - R(8, 10)
pAB = R(6, 10) * pB
v.ok(mu == R(44, 5) and var == R(2674, 25) and mm == mu and vm == var / 3 == R(2674, 75) and cerca(vm, 35.65, 5e-3) and pAB == R(12, 100) and pB - pAB == R(8, 100) and R(75, 100) + pB - pAB == R(83, 100) and 1 - (R(75, 100) + pB - pAB) == R(17, 100), "2026-ord ej.3A")
v.solucion(s, "3A", "\\mu=\\frac{-5-2+13+18+20}{5}=\\frac{44}{5}=8{,}8", "534{,}8", "106{,}96", "P(A\\cap B)=0{,}12", "P(B-A)=0{,}08", "P(A\\cup B)=0{,}83", "P\\left(A^C\\cap B^C\\right)=0{,}17")

pA = R(2, 10) / (1 - R(75, 100))
pB3 = pA / 2
v.ok(pA == R(8, 10) and pB3 == R(4, 10) and pA + pB3 - R(2, 10) == 1 and 1 - (pA + pB3 - R(2, 10)) == 0 and 1350 * R(4, 10) == 540 and 1350 * R(6, 10) == 810 and 1350 * R(4, 10) * R(6, 10) == 324 and sqrt(324) == 18
     and (R(4995, 10) - 540) / 18 == R(-9, 4) and (R(5805, 10) - 540) / 18 == R(9, 4) and 2 * R(9878, 10000) - 1 == R(9756, 10000), "2026-ord ej.3B")
v.solucion(s, "3B", "P(A)=0{,}8", "P(B)=0{,}4", "P\\left(A^C\\cap B^C\\right)=0", "B(1\\,350;\\ 0{,}4)", "N(540,18)", "P(-2{,}25<Z<2{,}25)=0{,}9756")

E4 = R(217, 100) * 15 / 7
n4 = (R(2575, 1000) * 15 / 2) ** 2
v.ok(sqrt(225) == 15 and E4 == R(93, 20) and 325 - E4 == R(6407, 20) and 325 + E4 == R(6593, 20) and 310 < 325 - E4 and cerca(n4, 372.97, 5e-3) and int(n4) + 1 == 373, "2026-ord ej.4")
v.solucion(s, "4", "E=4{,}65", "(320{,}35,329{,}65)", "372{,}97", "n=373")

# ======================= 2026-ord-sup1 =======================
s = "2026-ord-sup1"
V = vertices([(10, 5, 3500, "<="), (1, 0, 260, "<="), (1, 2, 420, ">="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
Iv = {q: 800 * q[0] + 400 * q[1] for q in V}
v.ok(V == [(0, 210), (0, 700), (260, 80), (260, 180)] and max(Iv.values()) == Iv[(0, 700)] == Iv[(260, 180)] == 280000 and Iv[(0, 210)] == 84000 and Iv[(260, 80)] == 240000 and 800 * 260 == 208000 and 5 * 700 == 3500 and 20 * 700 >= 4200, "2026-ord-sup1 ej.1")
v.solucion(s, "1", "(0,210)", "(0,700)", "(260,180)", "(260,80)", "280\\,000", "5\\cdot700=3\\,500", "208\\,000")

f1 = x ** 3 + a * x ** 2 + 9 * x
sol_a = solve(f1.subs(x, 2) - 2, a)
a0 = sol_a[0]
sol_b = solve(f1.subs(a, a0).subs(x, 3) - (3 * b + 18) / 4, b)
fa = x ** 3 - 6 * x ** 2 + 9 * x
fb = (-6 * x + 18) / (x + 1)
v.ok(sol_a == [-6] and sol_b == [-6] and fa.subs(x, 3) == fb.subs(x, 3) == 0 and expand(diff(fa, x) - 3 * (x - 3) * (x - 1)) == 0 and fa.subs(x, 1) == 4 and simplify(diff(fb, x) + 24 / (x + 1) ** 2) == 0 and diff(fb, x).subs(x, 3) == R(-3, 2) and diff(fa, x).subs(x, 3) == 0 and limit(fb, x, oo) == -6 and fb.subs(x, 5) == -2, "2026-ord-sup1 ej.2A")
v.solucion(s, "2A", "a=-6", "b=-6", "y=-6", "(1,4)", "f'(3^+)=-\\tfrac{3}{2}", "\\left(5,-2\\right)")

g = 1 - (x - 6) / (2 + x)
v.ok(simplify(g - 8 / (x + 2)) == 0 and limit(g, x, oo) == 0 and simplify(diff(g, x) + 8 / (x + 2) ** 2) == 0 and simplify(diff(g, x, 2) - 16 / (x + 2) ** 3) == 0 and sorted(solve(diff(g, x) + 8, x)) == [-3, -1] and g.subs(x, -1) == 8 and g.subs(x, -3) == -8, "2026-ord-sup1 ej.2B")
v.solucion(s, "2B", "x=-2", "y=0", "f'(x)=-\\frac{8}{(x+2)^2}", "f''(x)=\\frac{16}{(x+2)^3}", "y=-8x", "y=-8x-32", "(0,4)")

E3 = R(243, 100) * 2 / 9
n3 = (R(243, 100) * 2 / R(108, 100)) ** 2
v.ok(E3 == R(54, 100) and 20 - E3 == R(1946, 100) and 20 + E3 == R(2054, 100) and n3 == R(81, 4) and int(n3) + 1 == 21, "2026-ord-sup1 ej.3A")
v.solucion(s, "3A", "E=0{,}54", "(19{,}46,20{,}54)", "20{,}25", "n=21")

pB = 1 - R(7, 10)
pAB = R(4, 10) + pB - R(58, 100)
v.ok(pAB == R(12, 100) and R(4, 10) * pB == pAB and 1 - pAB == R(88, 100) and (pB - pAB) / (1 - R(4, 10)) == R(3, 10) and (R(4, 10) - pAB) + (pB - pAB) == R(46, 100), "2026-ord-sup1 ej.3B")
v.solucion(s, "3B", "P(A\\cap B)=0{,}12", "P\\left(A^C\\cup B^C\\right)=0{,}88", "P\\left(B\\mid A^C\\right)=0{,}3", "0{,}28+0{,}18=0{,}46")

v.ok((15 - 18) / R(4) == R(-3, 4) and 1 - R(7734, 10000) == R(2266, 10000) and 120 * R(9, 10) == 108 and 120 * R(1, 10) == 12 and cerca(sqrt(R(1080, 100)), 3.2863, 5e-5) and (R(1095, 10) - 108) / sqrt(R(108, 10)) > 0.456 and 1 - R(6772, 10000) == R(3228, 10000), "2026-ord-sup1 ej.4")
v.solucion(s, "4", "P(X<15)=0{,}2266", "N(108,3{,}2863)", "P(Z>0{,}46)=0{,}3228")


# ======================= 2026-ord-sup2 =======================
s = "2026-ord-sup2"
A = Matrix([[a, 0, 1], [0, 1, 0], [2, 0, a + 1]])
A2 = A.subs(a, 2)
Cm = Matrix([[1, 0, 2], [0, 1, 3]])
X = Cm * A2.inv()
A1 = A.subs(a, 1)
Bc = Matrix([3, 2, 6])
v.ok(expand(A.det() - (a - 1) * (a + 2)) == 0 and sorted(solve(A.det(), a)) == [-2, 1] and A2.det() == 4 and X * A2 == Cm and X == Matrix([[R(-1, 4), 0, R(3, 4)], [R(-3, 2), 1, R(3, 2)]]) and A1.rank() == 2 and Matrix.hstack(A1, Bc).rank() == 2, "2026-ord-sup2 ej.1A")
v.solucion(s, "1A", "|A|=m^2+m-2", "m=1", "m=-2", "|A|=4", mat(A2.inv()), mat(X), "2<3")

V = vertices([(4, 2, 5, ">="), (2, 5, 9, "<="), (1, 1, 3, "<="), (0, 1, 0, ">=")])
fv = {q: 2 * q[0] + q[1] for q in V}
v.ok(V == [(R(7, 16), R(13, 8)), (R(5, 4), 0), (2, 1), (3, 0)] and max(fv.values()) == fv[(3, 0)] == 6 and min(fv.values()) == fv[(R(7, 16), R(13, 8))] == fv[(R(5, 4), 0)] == R(5, 2) and fv[(2, 1)] == 5
     and 4 * 1 + 2 * 1 >= 5 and 2 * 1 + 5 * 1 <= 9 and 1 + 1 <= 3, "2026-ord-sup2 ej.1B")
v.solucion(s, "1B", "\\left(\\tfrac{7}{16},\\tfrac{13}{8}\\right)", "\\left(\\tfrac{5}{4},0\\right)", "(3,0)", "(2,1)", "(1,1)", "f(2,1)=5")

Pt = 75 - 15 * t / (t + 120)
v.ok(simplify(diff(Pt, t) + 1800 / (t + 120) ** 2) == 0 and limit(Pt, t, oo) == 60 and solve(Pt - 64, t) == [330] and R(168, 100) ** 2 * 25 == R(70560, 1000) and cerca(R(75) / R(168, 100) ** 2, 26.57, 5e-3) and solve(Pt - R(7056, 100), t) == [R(555, 11)] and cerca(R(555, 11), 50.45, 5e-3), "2026-ord-sup2 ej.2")
v.solucion(s, "2", "P'(t)=-\\frac{1\\,800}{(t+120)^2}", "t=330", "70{,}56", "i(0)=\\frac{75}{2{,}8224}=26{,}57", "t=\\frac{532{,}8}{10{,}56}=50{,}45")

pA = 1 - R(35, 100)
pB = R(82, 100) - pA + R(38, 100)
v.ok(pB == R(55, 100) and (pB - R(38, 100)) / R(35, 100) == R(17, 35) and R(82, 100) - R(38, 100) == R(44, 100) and cerca(R(17, 35), 0.4857) and cerca(1 - R(35, 100) ** 10 - 10 * R(65, 100) * R(35, 100) ** 9, 0.9995, 5e-5), "2026-ord-sup2 ej.3A")
v.solucion(s, "3A", "P(B)=0{,}55", "P\\left(B\\mid A^C\\right)=\\frac{17}{35}", "\\approx0{,}4857", "0{,}82-0{,}38=0{,}44", "B(10;\\ 0{,}65)", "\\approx0{,}9995")

v.ok(sqrt(4) == 2 and (R(145, 10) - 16) / 2 == R(-3, 4) and (R(162, 10) - 16) / 2 == R(1, 10) and R(5398, 10000) - (1 - R(7734, 10000)) == R(3132, 10000) and 16 + 2 * R(675, 1000) == R(1735, 100) and R(2, 8) == R(1, 4) and (R(163, 10) - 16) / R(1, 4) == R(6, 5) and 1 - R(8849, 10000) == R(1151, 10000), "2026-ord-sup2 ej.3B")
v.solucion(s, "3B", "P(-0{,}75<Z<0{,}1)=0{,}3132", "a=17{,}35", "N(16,0{,}25)", "P(Z>1{,}2)=0{,}1151")

E4 = R(2575, 1000) * sqrt(R(24, 100) / 500)
n4 = R(2575, 1000) ** 2 * R(24, 100) / R(4, 100) ** 2
v.ok(20000 - 12000 - 6000 == 2000 and [R(500, 20000) * q for q in (12000, 6000, 2000)] == [300, 150, 50] and R(200, 500) == R(4, 10) and cerca(E4, 0.0564, 5e-5) and cerca(R(4, 10) - E4, 0.3436) and cerca(R(4, 10) + E4, 0.4564) and R(43, 100) < R(4, 10) + E4 and cerca(n4, 994.59, 5e-3) and int(n4) + 1 == 995, "2026-ord-sup2 ej.4")
v.solucion(s, "4", "300", "E=0{,}0564", "(0{,}3436,0{,}4564)", "994{,}59", "n=995")


v.fin()
