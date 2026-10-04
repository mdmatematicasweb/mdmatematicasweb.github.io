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


# ======================= 2026-ext =======================
s = "2026-ext"
A = Matrix([[2, a, 0], [-1, a, 2], [0, a, 1]])
A1 = A.subs(a, 1)
Bm = Matrix([[1, 0, 2], [0, 1, 1], [1, 0, 1]])
M = A1.T - 2 * eye(3)
X = M.inv() * Bm ** 2
Cm = Matrix([3, 1, -1])
v.ok(expand(A.det() + a) == 0 and solve(A.det(), a) == [0] and M.det() == -1 and A1.T * X - Bm ** 2 == 2 * X and X == Matrix([[6, 1, 9], [-3, 0, -4], [-8, 0, -11]]) and Bm ** 2 == Matrix([[3, 0, 4], [1, 1, 2], [2, 0, 3]]) and (Cm.T * A1).shape == (1, 3) and Bm.shape == (3, 3), "2026-ext ej.1")
v.solucion(s, "1", "|A|=-m", "m\\neq0", mat(M), "-1", mat(Bm ** 2), mat(X), "1\\times3")

f = -t ** 3 + R(21, 2) * t ** 2 - 30 * t + 80
v.ok(expand(diff(f, t) + 3 * (t - 2) * (t - 5)) == 0 and [f.subs(t, 1), f.subs(t, 2), f.subs(t, 5), f.subs(t, 6)] == [R(119, 2), 54, R(135, 2), 62] and solve(diff(f, t, 2), t) == [R(7, 2)] and f.subs(t, R(7, 2)) == R(243, 4) and diff(f, t).subs(t, R(7, 2)) == R(27, 4), "2026-ext ej.2A")
v.solucion(s, "2A", "f'(t)=-3(t-2)(t-5)", "f(1)=59{,}5", "f(2)=54", "f(5)=67{,}5", "f(6)=62", "f''(t)=-6t+21", "\\left(\\frac{7}{2},\\frac{243}{4}\\right)", "f'(3{,}5)=6{,}75")

Bx = 150 * x - (R(2, 10) * x ** 2 + 40 * x + 5000)
v.ok(expand(Bx - (-R(2, 10) * x ** 2 + 110 * x - 5000)) == 0 and solve(diff(Bx, x), x) == [275] and Bx.subs(x, 275) == 10125 and Bx.subs(x, 0) == -5000 and sorted(solve(Bx, x)) == [50, 500] and sorted(solve(Bx - 4000, x)) == [100, 450], "2026-ext ej.2B")
v.solucion(s, "2B", "B(x)=-0{,}2x^2+110x-5\\,000", "x=275", "B(275)=10\\,125", "B(0)=-5\\,000", "50<x<500", "x=\\frac{550\\pm350}{2}", "B'(x)=-0{,}4x+110")

p20 = R(3, 10) * R(1, 4) + R(5, 10) * R(2, 3)
psin = R(3, 10) * R(3, 4) + R(2, 10) * R(1, 2)
v.ok(p20 == R(49, 120) and psin == R(325, 1000) and R(2, 10) + psin - R(2, 10) * R(1, 2) == R(425, 1000) and psin / R(5, 10) == R(65, 100) and cerca(R(49, 120), 0.4083), "2026-ext ej.3A")
v.solucion(s, "3A", "P(20\\ €)=\\frac{49}{120}", "\\approx0{,}4083", "P(\\text{sin premio})=0{,}325", "P(W\\cup\\text{sin premio})=0{,}425", "\\frac{0{,}325}{0{,}5}=0{,}65")

E3 = R(224, 100) * R(8, 100) / 4
sg = R(8, 100) / sqrt(7)
v.ok(E3 == R(448, 10000) and R(1458, 1000) - E3 == R(14132, 10000) and R(1458, 1000) + E3 == R(15028, 10000) and cerca(sg, 0.0302, 5e-5) and cerca((R(1383, 1000) - R(144, 100)) / sg, -1.885, 5e-3) and cerca((R(14523, 10000) - R(144, 100)) / sg, 0.4068, 5e-4) and R(6591, 10000) - (1 - R(9706, 10000)) == R(6297, 10000), "2026-ext ej.3B")
v.solucion(s, "3B", "E=0{,}0448", "(1{,}4132,1{,}5028)", "N(1{,}44;0{,}0302)", "P(-1{,}89<Z<0{,}41)=0{,}6297")

pA = 1 - R(35, 100)
pAB = pA - R(3, 10)
v.ok(pAB == R(35, 100) and pA + R(55, 100) - pAB == R(85, 100) and (R(55, 100) - pAB) / R(35, 100) == R(4, 7) and cerca(binomial(11, 8) * R(55, 100) ** 8 * R(45, 100) ** 3, 0.1259, 5e-5) and 11 * R(55, 100) == R(605, 100) and binomial(11, 8) == 165, "2026-ext ej.4")
v.solucion(s, "4", "P(A\\cap B)=0{,}35", "P(A\\cup B)=0{,}85", "P\\left(B\\mid A^C\\right)=\\frac{4}{7}", "\\approx0{,}5714", "B(11;\\ 0{,}55)", "\\approx0{,}1259", "E(X)=np=11\\cdot0{,}55=6{,}05")


# ======================= 2026-ext-sup1 =======================
s = "2026-ext-sup1"
V = vertices([(2, 1, 120, "<="), (2, 5, 160, "<="), (1, 1, 35, ">="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
Bv = {q: 45 * q[0] + 63 * q[1] for q in V}
v.ok(24 * 5 == 120 and 4 * 40 == 160 and V == [(5, 30), (35, 0), (55, 10), (60, 0)] and max(Bv.values()) == Bv[(55, 10)] == 3105 and Bv[(5, 30)] == 2115 and Bv[(35, 0)] == 1575 and Bv[(60, 0)] == 2700, "2026-ext-sup1 ej.1")
v.solucion(s, "1", "(5,30)", "(35,0)", "(60,0)", "(55,10)", "3\\,105", "2\\,115", "2\\,700")

f1 = (x - a) / (x - 1)
sol = solve([f1.subs(x, 0) - 3, diff(f1, x).subs(x, 0) - b], [a, b])
g = (x - 3) / (x - 1)
v.ok(sol == {a: 3, b: 2} and simplify(diff(g, x) - 2 / (x - 1) ** 2) == 0 and limit(g, x, oo) == 1 and limit(g, x, 1, "+") == -oo and limit(g, x, 1, "-") == oo and solve(g, x) == [3] and g.subs(x, 0) == 3 and integrate(x ** 2 - x - 6, (x, -2, 3)) == R(-125, 6), "2026-ext-sup1 ej.2A")
v.solucion(s, "2A", "a=3", "b=2", "f'(0^-)=a-1=2", "g'(x)=\\frac{2}{(x-1)^2}", "x=1", "y=1", "(3,0)", "(0,3)", "A=\\frac{125}{6}")

fa = x ** 3 - 3 * x + 2
v.ok(solve(fa.subs(x, 3) - 10 / (a - 3), a) == [R(7, 2)] and fa.subs(x, 3) == 20 and 10 / (4 - R(3)) == 10 and limit(10 / (4 - x), x, 4, "-") == oo and limit(10 / (4 - x), x, 4, "+") == -oo and limit(10 / (4 - x), x, oo) == 0
     and expand(diff(fa, x) - 3 * (x - 1) * (x + 1)) == 0 and fa.subs(x, 1) == 0 and simplify(diff(10 / (4 - x), x) - 10 / (4 - x) ** 2) == 0, "2026-ext-sup1 ej.2B")
v.solucion(s, "2B", "a=\\frac{7}{2}", "x=4", "y=0", "(1,0)", "(3,20)", "f'(x)=3x^2-3")

pAB = R(5, 10) - R(35, 100)
pAcB = R(5, 10) - R(35, 100)
v.ok(pAB == R(15, 100) and pAcB / R(5, 10) == R(3, 10) and R(35, 100) + pAcB == R(5, 10) and pAB + pAcB == R(3, 10) and R(5, 10) * R(3, 10) == pAB, "2026-ext-sup1 ej.3")
v.solucion(s, "3", "P(A\\cap B)=0{,}15", "P\\left(A^C\\cap B\\right)=0{,}15", "P\\left(B\\mid A^C\\right)=0{,}3", "0{,}35+0{,}15=0{,}5", "P(B)=0{,}3", "P(A)P(B)=0{,}15")

p8 = 9 * R(8, 10) ** 8 * R(2, 10)
p9 = 1 - R(8, 10) ** 9
sd = sqrt(R(1280, 100))
v.ok(cerca(p8, 0.3020, 5e-5) and cerca(p9, 0.8658, 5e-5) and 80 * R(2, 10) == 16 and 80 * R(8, 10) == 64 and cerca(sd, 3.5777, 5e-5) and cerca((R(105, 10) - 16) / sd, -1.5373, 5e-4) and cerca((R(195, 10) - 16) / sd, 0.9783, 5e-4) and R(8365, 10000) - (1 - R(9382, 10000)) == R(7747, 10000), "2026-ext-sup1 ej.4A")
v.solucion(s, "4A", "B(9;\\ 0{,}8)", "\\approx0{,}3020", "\\approx0{,}8658", "N(16,3{,}5777)", "P(-1{,}54<Z<0{,}98)=0{,}7747")

E4, lo4, hi4 = ic_prop(R(265, 1000), 400, R(243, 100))
n4 = R(217, 100) ** 2 * R(265, 1000) * R(735, 1000) / R(3, 100) ** 2
v.ok(R(106, 400) == R(265, 1000) and cerca(E4, 0.0536) and cerca(lo4, 0.2114) and cerca(hi4, 0.3186) and R(4, 100) < lo4 and cerca(n4, 1019.08, 5e-3) and int(n4) + 1 == 1020, "2026-ext-sup1 ej.4B")
v.solucion(s, "4B", "E=0{,}0536", "(0{,}2114,0{,}3186)", "1\\,019{,}08", "n=1\\,020")


# ======================= 2026-ext-sup2 =======================
s = "2026-ext-sup2"
M = Matrix([[4, -7, 5], [-2, 3, -1], [6, -11, 9]])
bb = Matrix([9, -4, 14])
z = symbols("z")
sol = solve([4 * x - 7 * y + 5 * z - 9, -2 * x + 3 * y - z + 4], [x, y], dict=True)[0]
v.ok(M.det() == 0 and M.rank() == 2 and Matrix.hstack(M, bb).rank() == 2 and M.row(2) == 2 * M.row(0) + M.row(1) and 2 * 9 + (-4) == 14 and sol == {x: 4 * z + R(1, 2), y: 3 * z - 1}
     and (4 * 1 + R(1, 2), 3 * 1 - 1) == (R(9, 2), 2) and (4 * -1 + R(1, 2), 3 * -1 - 1) == (R(-7, 2), -4)
     and 6 * R(9, 2) - 11 * 2 + 9 * 1 == 14 and 6 * R(-7, 2) - 11 * (-4) + 9 * (-1) == 14, "2026-ext-sup2 ej.1A")
v.solucion(s, "1A", "|M|=0", "E_3=2E_1+E_2", "y=3\\lambda-1", "x=4\\lambda+\\frac{1}{2}", "\\left(\\frac{9}{2},\\ 2,\\ 1\\right)", "\\left(-\\frac{7}{2},\\ -4,\\ -1\\right)")

V = vertices([(3, -4, 6, "<="), (1, 1, 9, "<="), (1, 4, 24, "<="), (3, 2, 6, ">="), (1, 0, 0, ">=")])
Fv = {q: 2 * q[0] + 3 * q[1] - 2 for q in V}


def en(p):
    return 3 * p[0] - 4 * p[1] <= 6 and p[0] + p[1] <= 9 and p[0] + 4 * p[1] <= 24 and 3 * p[0] + 2 * p[1] >= 6 and p[0] >= 0


v.ok(V == [(0, 3), (0, 6), (2, 0), (4, 5), (6, 3)] and max(Fv.values()) == Fv[(4, 5)] == 21 and min(Fv.values()) == Fv[(2, 0)] == 2 and Fv[(0, 3)] == 7 and Fv[(0, 6)] == 16 and Fv[(6, 3)] == 19 and en((3, R(9, 10))) and not en((1, R(59, 10))) and 1 + 4 * R(59, 10) == R(246, 10), "2026-ext-sup2 ej.1B")
v.solucion(s, "1B", "(0,3)", "(0,6)", "(2,0)", "(4,5)", "(6,3)", "1+4\\cdot5{,}9=24{,}6", "F(4,5)=21", "F(2,0)=2")

It = R(1, 100) * 2 ** t
v.ok(simplify(diff(It, t) - log(2) / 100 * 2 ** t) == 0 and solve(It - R(1024, 100), t) == [10] and cerca(diff(It, t).subs(t, 5), 0.2218, 5e-5) and R(2 ** 13, 100) == R(8192, 100) and R(8192, 100) < 90, "2026-ext-sup2 ej.2")
v.solucion(s, "2", "2^t=1\\,024=2^{10}", "I'(5)=\\frac{\\ln2}{100}\\cdot2^5=0{,}32\\ln2", "\\approx0{,}2218", "I(13)=\\frac{2^{13}}{100}=\\frac{8\\,192}{100}=81{,}92")

pAB = R(6, 10) * R(3, 10)
pU = 1 - R(15, 100)
pB = pU - R(6, 10) + pAB
v.ok(pU == R(85, 100) and pAB == R(18, 100) and pU - pAB == R(67, 100) and pB == R(43, 100) and R(6, 10) * pB == R(258, 1000) != pAB, "2026-ext-sup2 ej.3")
v.solucion(s, "3", "P(A\\cup B)=0{,}85", "P(A\\cap B)=0{,}18", "0{,}85-0{,}18=0{,}67", "P(B)=0{,}43", "P(A)P(B)=0{,}258")

p = R(1003, 10000)
q = 1 - p
pX = 10 * p ** 3 * q ** 2 + 5 * p ** 4 * q + p ** 5
v.ok((R(336, 10) - 40) / 5 == R(-32, 25) and 1 - R(8997, 10000) == p and cerca(pX, 0.0086, 5e-5) and cerca(80 * p, 8.02, 5e-3) and cerca(sqrt(80 * p * q), 2.687, 5e-4) and cerca((R(155, 10) - 80 * p) / sqrt(80 * p * q), 2.78, 5e-3), "2026-ext-sup2 ej.4A")
v.solucion(s, "4A", "P(Z<-1{,}28)=0{,}1003", "B(5;\\ 0{,}1003)", "\\approx0{,}0086", "N(8{,}02;\\ 2{,}687)", "P(Z<2{,}78)=0{,}9973")

d = [R(q_) for q_ in "6.6 5.9 6.2 5.7 5.8 6.4 6.4 6.3 5.7 6.0".split()]
E4 = R(217, 100) * R(3, 10) / sqrt(10)
n4 = (R(233, 100) * R(3, 10) / R(1, 10)) ** 2
v.ok(sqrt(R(9, 100)) == R(3, 10) and sum(d) == 61 and cerca(E4, 0.2059, 5e-5) and cerca(R(61, 10) - E4, 5.8941) and cerca(R(61, 10) + E4, 6.3059) and R(65, 10) > R(61, 10) + E4 and cerca(n4, 48.86, 5e-3) and int(n4) + 1 == 49, "2026-ext-sup2 ej.4B")
v.solucion(s, "4B", "\\bar x=6{,}1", "E=0{,}2059", "(5{,}8941,6{,}3059)", "48{,}86", "n=49")


v.fin()
