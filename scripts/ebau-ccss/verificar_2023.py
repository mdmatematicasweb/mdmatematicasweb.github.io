#!/usr/bin/env python3
"""Verifica las soluciones PAU CCSS de 2023 (data/2023-*.md, soluciones/2023-*.md). Ver _verif.py.

Uso:  python scripts/ebau-ccss/verificar_2023.py     (requiere `pip install sympy`)
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _verif import Verificador, R, Matrix, tx, dec, mat, vertices  # noqa: E402
from sympy import symbols, solve, diff, integrate, sqrt, log, exp, simplify, eye, factor, expand, limit, oo  # noqa: E402

v = Verificador(2023)
x, y, a, b, c, t = symbols("x y a b c t")


def ic_prop(p, n, z):
    E = z * sqrt(p * (1 - p) / n)
    return E, p - E, p + E


def cerca(val, objetivo, tol=5e-5):
    return abs(float(val) - objetivo) < tol


# ======================= 2023-ord-a =======================
s = "2023-ord-a"
cons = [(2, -3, 1, "<="), (4, 1, 9, "<="), (1, 1, 5, "<="), (9, -1, 0, ">="), (0, 1, 0, ">=")]
V = vertices(cons)
Fv = {q: 5 * q[0] - 3 * q[1] for q in V}


def en_region(p):
    return all((A * p[0] + B * p[1] >= C if t_ == ">=" else A * p[0] + B * p[1] <= C) for A, B, C, t_ in cons)


v.ok(V == [(0, 0), (R(1, 2), 0), (R(1, 2), R(9, 2)), (R(4, 3), R(11, 3)), (2, 1)] and max(Fv.values()) == Fv[(2, 1)] == 7 and min(Fv.values()) == Fv[(R(1, 2), R(9, 2))] == -11
     and not en_region((2, 2)) and en_region((1, R(7, 2))) and 4 * 2 + 2 == 10, "2023-ord-a ej.1")
v.solucion(s, "1", "F\\left(\\tfrac{1}{2},0\\right)=\\tfrac{5}{2}", "F(2,1)=7", "F\\left(\\tfrac{4}{3},\\tfrac{11}{3}\\right)=-\\tfrac{13}{3}", "F\\left(\\tfrac{1}{2},\\tfrac{9}{2}\\right)=-11", "4x+y=4\\cdot2+2=10")

A = Matrix([[a, 1, 0], [0, a, 2], [0, 1, 1]])
B = Matrix([[2, -1], [a, -1]])
C = Matrix([[2, -1], [1, -1], [2, 0]])
A1, B1 = A.subs(a, 1), B.subs(a, 1)
X = A1.inv() * C * B1.inv()
v.ok(expand(A.det() - a * (a - 2)) == 0 and expand(B.det() - (a - 2)) == 0 and A1.det() == -1 and B1.det() == -1 and A1 * X * B1 == C and X == Matrix([[-3, 5], [4, -5], [-2, 3]]), "2023-ord-a ej.2")
v.solucion(s, "2", "|A|=a\\cdot(a-2)", "|B|=-2+a=a-2", mat(A1.inv()), mat(B1.inv()), mat(A1.inv() * C), mat(X))

f = x ** 3 - 3 * x ** 2 + 2 * x
rs = sorted(solve(diff(f, x), x), key=float)
v.ok(sorted(solve(f, x)) == [0, 1, 2] and simplify(rs[0] - (1 - sqrt(3) / 3)) == 0 and simplify(f.subs(x, rs[0]) - 2 * sqrt(3) / 9) == 0 and simplify(f.subs(x, rs[1]) + 2 * sqrt(3) / 9) == 0
     and expand(diff(f, x, 2) - (6 * x - 6)) == 0 and integrate(f, (x, 0, 1)) == R(1, 4) and integrate(f, (x, 1, 2)) == R(-1, 4), "2023-ord-a ej.3")
v.solucion(s, "3", "x=1\\pm\\dfrac{\\sqrt3}{3}", "f''(x)=6x-6", "A=\\frac{1}{2}")

vt = t ** 3 / 3 - R(5, 2) * t ** 2 + 6 * t + 10
v.ok(sorted(solve(t ** 2 - 5 * t + 6, t)) == [2, 3] and diff(vt, t) == t ** 2 - 5 * t + 6 and vt.subs(t, 0) == 10 and vt.subs(t, 2) == R(44, 3) and vt.subs(t, 4) == R(46, 3)
     and 3000 * (vt.subs(t, 4) - vt.subs(t, 2)) == 2000 and vt.subs(t, 3) == R(29, 2) and vt.subs(t, 6) == 28 and vt.subs(t, 6) - vt.subs(t, 0) == 18 and vt.subs(t, 6) - vt.subs(t, 3) == R(27, 2), "2023-ord-a ej.4")
v.solucion(s, "4", "v(t)=\\frac{t^3}{3}-\\frac{5t^2}{2}+6t+10", "v(2)=\\frac{8}{3}-10+12+10=\\frac{44}{3}", "v(4)=\\frac{64}{3}-40+24+10=\\frac{46}{3}", "3000\\cdot\\frac{2}{3}=2000", "v(6)-v(0)=18")

pc = R(2, 3)
v.ok(pc == 2 * (1 - pc) and 2 * pc * (1 - pc) == R(4, 9) and 1 - (1 - pc) ** 2 == R(8, 9) and pc ** 2 / (1 - (1 - pc) ** 2) == R(1, 2), "2023-ord-a ej.5")
v.solucion(s, "5", "P(\\text{cara})=\\frac{2}{3}", "\\frac{2}{3}\\cdot\\frac{1}{3}+\\frac{1}{3}\\cdot\\frac{2}{3}=\\frac{4}{9}", "1-P(\\text{dos cruces})=1-\\frac{1}{9}=\\frac{8}{9}", "P(\\text{dos caras}\\mid\\text{al menos una cara})=\\frac{1}{2}")

pL = R(2, 10) * R(4, 10) + R(8, 10) * R(6, 1000)
pLC = R(2, 10) * R(6, 10) + R(8, 10) * R(994, 1000)
v.ok(pL == R(848, 10000) and R(8, 100) / pL == R(50, 53) and cerca(R(50, 53), 0.9434) and pLC == R(9152, 10000) and cerca(R(7952, 10000) / pLC, 0.8689) and R(2, 10) * R(6, 10) + R(8, 10) * R(6, 1000) == R(1248, 10000), "2023-ord-a ej.6")
v.solucion(s, "6", "P(L)=0{,}0848", "P(S\\mid L)=\\frac{50}{53}", "\\approx0{,}9434", "P(L^C)=0{,}9152", "\\approx0{,}8689", "P=0{,}1248")

v.ok(250 + 300 + 400 + 350 == 1300 and R(20, 250) * 1300 == 104 and [R(20, 250) * q for q in (300, 400, 350)] == [24, 32, 28] and R(7, 10) / sqrt(49) == R(1, 10), "2023-ord-a ej.7a")
v.ok(R(63, 10) < R(68, 10) and (R(63, 10) - R(64, 10)) / R(1, 10) == -1 and (R(68, 10) - R(64, 10)) / R(1, 10) == 4 and R(99997, 100000) - (1 - R(8413, 10000)) == R(84127, 100000), "2023-ord-a ej.7b")
v.solucion(s, "7", "N=250+300+400+350=1\\,300", "n=0{,}08\\cdot1\\,300=104", "N(6{,}4,0{,}1)", "P=0{,}8413")

E8, lo8, hi8 = ic_prop(R(16, 100), 400, R(233, 100))
E8b = R(196, 100) * sqrt(R(16, 100) * R(84, 100) / 400)
v.ok(R(64, 400) == R(16, 100) and cerca(E8, 0.0427) and cerca(lo8, 0.1173) and cerca(hi8, 0.2027) and cerca(E8b, 0.0359) and E8b < E8, "2023-ord-a ej.8")
v.solucion(s, "8", "z_{\\alpha/2}=2{,}33", "E=0{,}0427", "(0{,}1173,0{,}2027)", "E=0{,}0359")

# ======================= 2023-ord-b =======================
s = "2023-ord-b"
A = Matrix([[1, 0, 0], [0, 2, 0], [0, -1, 1]])
Rm = Matrix([[1, 2, 0], [3, -1, 1]])
Xt = Rm * A.inv()
X = Xt.T
v.ok(A.inv() == (A ** 2 - 4 * A + 5 * eye(3)) / 2 and A.det() == 2 and X.shape == (3, 2) and X.T * A == Rm and X == Matrix([[1, 3], [1, 0], [0, 1]]), "2023-ord-b ej.1")
v.solucion(s, "1", mat(A ** 2), mat(A.inv()), mat(Xt), mat(X), "|A|=2")

V = vertices([(1, 3, 200, "<="), (2, 1, 150, "<="), (20, 50, 1900, ">="), (1, 0, 20, ">="), (0, 1, 0, ">=")])
Vv = {q: 21 * q[0] + 50 * q[1] for q in V}
v.ok(V == [(20, 30), (20, 60), (50, 50), (70, 10)] and max(Vv.values()) == Vv[(50, 50)] == 3550 and Vv[(20, 30)] == 1920 and Vv[(20, 60)] == 3420 and Vv[(70, 10)] == 1970, "2023-ord-b ej.2")
v.solucion(s, "2", "(20,30)", "(20,60)", "(50,50)", "(70,10)", "3\\,550")

fx, gx = (x - 1) ** 2, 5 - 2 * x
v.ok(sorted(solve(fx - gx, x)) == [-2, 2] and fx.subs(x, -2) == 9 and fx.subs(x, 2) == 1 and integrate(gx - fx, (x, -2, 2)) == R(32, 3) and R(32, 3) / R(2, 3) * 15 == 240, "2023-ord-b ej.3")
v.solucion(s, "3", "!x^2=4", "A=\\frac{32}{3}", "C=16", "16\\cdot15=240")

ft = (12 * t - 24) / (t + 3)
v.ok(solve(ft, t) == [2] and ft.subs(t, 0) == -8 and limit(ft, t, oo) == 12 and simplify(diff(ft, t) - 60 / (t + 3) ** 2) == 0 and simplify(diff(ft, t, 2) + 120 / (t + 3) ** 3) == 0, "2023-ord-b ej.4")
v.solucion(s, "4", "(2,0)", "(0,-8)", "y=12", "f'(t)=\\frac{60}{(t+3)^2}", "f''(t)=-\\frac{120}{(t+3)^3}")

from math import comb
tot = comb(9, 2)
azul2, verde2, mixto = comb(2, 2), comb(3, 2), 2 * 7
v.ok(tot == 36 and azul2 == 1 and verde2 == 3 and mixto == 14 and R(azul2 + verde2, tot) == R(1, 9) and R(mixto, tot) == R(7, 18) and R(mixto, azul2 + verde2 + mixto) == R(7, 9), "2023-ord-b ej.5")
v.solucion(s, "5", "\\frac{4}{36}=\\frac{1}{9}", "\\frac{14}{36}=\\frac{7}{18}", "\\frac{14}{18}=\\frac{7}{9}", "\\approx0{,}1111", "\\approx0{,}3889", "\\approx0{,}7778")

pAB = R(6, 10) * R(3, 10)
v.ok(pAB == R(18, 100) and R(6, 10) + R(3, 10) - pAB == R(72, 100) and (R(6, 10) - pAB) + (R(3, 10) - pAB) == R(54, 100) and (R(3, 10) - pAB) / (1 - R(6, 10)) == R(3, 10) and R(6, 10) * R(3, 10) == pAB, "2023-ord-b ej.6")
v.solucion(s, "6", "P(A\\cup B)=0{,}72", "P(A-B)=0{,}6-0{,}18=0{,}42", "P(B-A)=0{,}3-0{,}18=0{,}12", "P(A-B)+P(B-A)=0{,}54", "P(B\\mid A^C)=0{,}3")

d = [9, 11, 13, 18, 20]
mu = R(sum(d), 5)
var = sum((q - mu) ** 2 for q in d) / 5
import itertools as it
medias = [R(i + j, 2) for i, j in it.product(d, repeat=2)]
mm = sum(medias) / 25
vm = sum((q - mm) ** 2 for q in medias) / 25
v.ok(25 + 75 + 50 == 150 and [R(30, 150) * q for q in (25, 75, 50)] == [5, 15, 10] and mu == R(142, 10) and var == R(1736, 100) and vm == var / 2 == R(868, 100), "2023-ord-b ej.7")
v.solucion(s, "7", "5", "\\mu=\\frac{9+11+13+18+20}{5}=14{,}2", "17{,}36", "\\sigma_{\\bar x}^2=\\frac{\\sigma^2}{n}=\\frac{17{,}36}{2}=8{,}68")

E8, lo8, hi8 = ic_prop(R(65, 100), 500, R(217, 100))
n8 = R(175, 100) ** 2 * R(65, 100) * R(35, 100) / R(2, 100) ** 2
v.ok(cerca(E8, 0.0463) and cerca(lo8, 0.6037) and cerca(hi8, 0.6963) and lo8 < R(64, 100) < hi8 and cerca(n8, 1741.80, 5e-3) and int(n8) + 1 == 1742, "2023-ord-b ej.8")
v.solucion(s, "8", "E=0{,}0463", "(0{,}6037,0{,}6963)", "1\\,741{,}80", "n=1\\,742")

# ======================= 2023-ord-res-a =======================
s = "2023-ord-res-a"
Q = Matrix([[50, 40, 35], [0, 60, 55]])
P = Matrix([[40, 38, 42], [34, 37, 40]])
QP = Q * P.T
M = Matrix([[1, 0], [1, 1]])
N = Matrix([[5, 4], [3, 2]])
Vm = Matrix([[8, 7], [6, 5]])
X = M.inv() * (Vm - N)
v.ok(QP == Matrix([[4990, 4580], [4590, 4420]]) and QP.trace() == 9410 and 9410 * 10 == 94100 and 4990 * 10 == 49900 and 4420 * 10 == 44200 and X == Matrix([[3, 3], [0, 0]]) and M * X + N == Vm, "2023-ord-res-a ej.1")
v.solucion(s, "1", mat(QP), "4\\,990+4\\,420=9\\,410", "94\\,100", mat(M.inv()), mat(X), "X=M^{-1}(V-N)")

V = vertices([(15, 10, 360, "<="), (6, 10, 216, ">="), (3, -1, 0, ">="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
Cv = {q: 300 * q[0] + 600 * q[1] for q in V}
v.ok(V == [(6, 18), (8, 24), (16, 12)] and min(Cv.values()) == Cv[(16, 12)] == 12000 and Cv[(6, 18)] == 12600 and Cv[(8, 24)] == 16800, "2023-ord-res-a ej.2")
v.solucion(s, "2", "(6,18)", "(8,24)", "(16,12)", "12\\,600", "16\\,800", "12\\,000")

f = (3 * x ** 2 + 5 * x - 2) / (-3 * x + 7)
g = log(1 / (3 * x + 1))
v.ok(f.subs(x, 0) == R(-2, 7) and simplify(diff(f, x).subs(x, 0)) == R(29, 49) and g.subs(x, 0) == 0 and simplify(diff(g, x).subs(x, 0)) == -3
     and integrate(5 / (3 * x ** 4), (x, -2, -1)) == R(35, 72) and simplify(integrate(exp(x / 3) / 5, (x, -3, 0)) - (R(3, 5) - 3 / (5 * exp(1)))) == 0, "2023-ord-res-a ej.3")
v.solucion(s, "3", "f(0)=-\\frac{2}{7}", "f'(0)=\\frac{29}{49}", "g'(0)=-3", "\\frac{35}{72}", "\\frac{3}{5}-\\frac{3}{5e}")

f1, f2 = x ** 3 + 2 * x ** 2 - 3, 1 + 1 / (x - 2)
v.ok(f1.subs(x, 1) == 0 and f2.subs(x, 1) == 0 and diff(f1, x).subs(x, 1) == 7 and diff(f2, x).subs(x, 1) == -1 and limit(f2, x, 2, "+") == oo and limit(f2, x, 2, "-") == -oo and limit(f2, x, oo) == 1, "2023-ord-res-a ej.4")
v.solucion(s, "4", "f'(1^-)=7", "x=2", "y=1")

pI = R(3, 10) * R(2, 100) + R(2, 10) * R(1, 100) + R(5, 10) * R(5, 100)
v.ok(pI == R(33, 1000) and 1 - pI == R(967, 1000) and R(25, 1000) / pI == R(25, 33) and cerca(R(25, 33), 0.7576) and R(3, 10) * R(2, 100) * R(4, 10) == R(24, 10000), "2023-ord-res-a ej.5")
v.solucion(s, "5", "P(I)=0{,}033", "P(I^C)=0{,}967", "P(C\\mid I)=\\frac{25}{33}", "\\approx0{,}7576", "P(A\\cap I\\cap\\text{lluvia})=0{,}0024")

nz = R(4, 10) * R(4, 10)
nzz = R(4, 10) - nz
v.ok(nz == R(16, 100) and nzz == R(24, 100) and nzz / R(6, 10) == R(4, 10) and R(6, 10) * R(25, 100) == R(15, 100) and R(6, 10) - R(15, 100) - nzz == R(21, 100) and R(21, 100) + R(4, 10) * R(3, 10) == R(33, 100) and 1 - R(33, 100) == R(67, 100), "2023-ord-res-a ej.6")
v.solucion(s, "6", "P(N\\cap Z^C)=0{,}4\\cdot0{,}4=0{,}16", "P(N\\cap Z)=0{,}24", "P(N\\mid Z)=0{,}4", "P(\\text{menta})=0{,}21+0{,}12=0{,}33", "P(\\text{frutas})=1-0{,}33=0{,}67")

import itertools as it
pares = list(it.product(range(1, 7), repeat=2))
favor = [p for p in pares if R(p[0] + p[1], 2) <= 2]
n7 = R(196, 100) ** 2 * R(1, 4) / R(15, 100) ** 2
v.ok(len(pares) == 36 and len(favor) == 6 and R(len(favor), 36) == R(1, 6) and cerca(n7, 42.68, 5e-3) and int(n7) + 1 == 43, "2023-ord-res-a ej.7")
v.solucion(s, "7", "6\\cdot6=36", "\\frac{6}{36}=\\frac{1}{6}", "42{,}68", "n=43")

sd = R(1825, 100) / 19
E8 = R(181, 100) * sd
n8 = (R(170, 100) * R(1825, 100) / R(1, 2)) ** 2
v.ok(cerca(sd, 0.9605) and cerca(E8, 1.7386) and cerca(97 - E8, 95.2614) and cerca(97 + E8, 98.7386) and R(985, 10) - R(955, 10) == 3 and R(3, 2) / 3 == R(1, 2) and cerca(n8, 3850.20, 5e-3) and int(n8) + 1 == 3851, "2023-ord-res-a ej.8")
v.solucion(s, "8", "E=1{,}7386", "(95{,}2614,98{,}7386)", "3\\,850{,}20", "n=3\\,851")

# ======================= 2023-ord-res-b =======================
s = "2023-ord-res-b"
Rr = Matrix([[500, 300, 200], [600, 100, 300]])
Pp = Matrix([[R(5, 10), R(4, 10), R(6, 10)], [R(4, 10), R(5, 10), R(7, 10)]])
Mm = Rr * Pp.T / 1000
prod, trans, ben = [R(11, 100), R(9, 100)], [R(2, 100), R(3, 100)], R(5, 100)
precio = [[Mm[i, j] + prod[i] + trans[j] + ben for j in range(2)] for i in range(2)]
total = 5000 * precio[0][0] + 6000 * precio[0][1] + 6000 * precio[1][0] + 5000 * precio[1][1]
v.ok(Mm == Matrix([[R(49, 100), R(49, 100)], [R(52, 100), R(50, 100)]]) and precio == [[R(67, 100), R(68, 100)], [R(68, 100), R(67, 100)]] and total == 14860, "2023-ord-res-b ej.1")
v.solucion(s, "1", "0{,}49+0{,}11+0{,}02+0{,}05=0{,}67", "0{,}49+0{,}11+0{,}03+0{,}05=0{,}68", "0{,}52+0{,}09+0{,}02+0{,}05=0{,}68", "0{,}50+0{,}09+0{,}03+0{,}05=0{,}67", "3\\,350+4\\,080+4\\,080+3\\,350=14\\,860")

V = vertices([(1, 0, 14, "<="), (1, -1, 0, ">="), (1, 1, 10, ">="), (1, 1, 24, "<="), (0, 1, 0, ">=")])
Bv = {q: 15000 * q[0] + 17000 * q[1] for q in V}
v.ok(V == [(5, 5), (10, 0), (12, 12), (14, 0), (14, 10)] and max(Bv.values()) == Bv[(12, 12)] == 384000 and Bv[(5, 5)] == 160000 and Bv[(10, 0)] == 150000 and Bv[(14, 0)] == 210000 and Bv[(14, 10)] == 380000, "2023-ord-res-b ej.2")
v.solucion(s, "2", "(5,5)", "(10,0)", "(14,0)", "(14,10)", "(12,12)", "384\\,000")

fx = (-7 + x ** 2) ** 3 * exp(5 - x)
gx = log(x ** 4 - 2 * x ** 2) / (8 - x ** 3)
gp = ((4 * x ** 3 - 4 * x) / (x ** 4 - 2 * x ** 2) * (8 - x ** 3) + 3 * x ** 2 * log(x ** 4 - 2 * x ** 2)) / (8 - x ** 3) ** 2
v.ok(simplify(diff(fx, x) - (x ** 2 - 7) ** 2 * exp(5 - x) * (6 * x - x ** 2 + 7)) == 0 and simplify(diff(gx, x) - gp) == 0 and sorted(solve(-x ** 2 + 2 * x + 3 - (-2 * x + 6), x)) == [1, 3] and integrate(-x ** 2 + 4 * x - 3, (x, 1, 3)) == R(4, 3), "2023-ord-res-b ej.3")
v.solucion(s, "3", "\\left(x^2-7\\right)^2e^{5-x}\\left(6x-x^2+7\\right)", "A=\\frac{4}{3}", "(1,4)", "(3,0)")

ft = -t ** 2 + 12 * t - 20
v.ok(ft.subs(t, 1) == -9 and ft.subs(t, 11) == -9 and solve(diff(ft, t), t) == [6] and ft.subs(t, 6) == 16 and sorted(solve(ft, t)) == [2, 10] and 10 - 2 == 8 and 16 < 20, "2023-ord-res-b ej.4")
v.solucion(s, "4", "f(6)=-36+72-20=16", "t=1", "t=11", "10-2=8")

pM = R(8, 10) - (1 - R(4, 10)) + R(45, 100)
v.ok(pM == R(65, 100) and pM - R(45, 100) == R(2, 10) and (R(6, 10) - R(45, 100)) / (1 - pM) == R(3, 7) and (pM - R(45, 100)) + (R(6, 10) - R(45, 100)) == R(35, 100) and 1 - R(8, 10) == R(2, 10) and cerca(R(3, 7), 0.4286), "2023-ord-res-b ej.5")
v.solucion(s, "5", "P(M)=0{,}65", "P(M\\cap V^C)=0{,}2", "P(V\\mid M^C)=\\frac{3}{7}", "\\approx0{,}4286", "0{,}2+0{,}15=0{,}35", "P(M^C\\cap V^C)=0{,}2")

p6 = solve(R(4, 10) * a + R(25, 100) * (1 - a) - R(37, 100), a)
v.ok(p6 == [R(8, 10)] and R(8, 10) * R(6, 10) / (1 - R(37, 100)) == R(16, 21) and cerca(R(16, 21), 0.7619), "2023-ord-res-b ej.6")
v.solucion(s, "6", "p=0{,}8", "P(A\\mid E^C)=\\frac{16}{21}", "\\approx0{,}7619")

E7 = R(188, 100) * sqrt(8) / 10
n7 = R(188, 100) ** 2 * 8 / R(1, 10) ** 2
v.ok(4 * 12 + 2 == 50 and cerca(E7, 0.5317) and cerca(50 - E7, 49.4683) and cerca(50 + E7, 50.5317) and n7 == R(70688, 25) and int(n7) + 1 == 2828, "2023-ord-res-b ej.7")
v.solucion(s, "7", "E=0{,}5317", "(49{,}4683,50{,}5317)", "2\\,827{,}52", "n=2\\,828")

v.ok(R(25, 10) / 4 == R(625, 1000) and (12 - R(125, 10)) / R(625, 1000) == R(-8, 10) and R(25, 10) / 5 == R(1, 2) and (11 - R(125, 10)) / R(1, 2) == -3 and (13 - R(125, 10)) / R(1, 2) == 1 and R(8413, 10000) - (1 - R(99865, 100000)) == R(83995, 100000), "2023-ord-res-b ej.8")
v.solucion(s, "8", "N(12{,}5,0{,}625)", "P(\\bar X>12)=0{,}7881", "N(12{,}5,0{,}5)", "P(-3\\le Z\\le1)", "P\\approx0{,}8400")

# ======================= 2023-ord-sup-a =======================
s = "2023-ord-sup-a"
V = vertices([(1, 1, 10000, "<="), (0, 1, 3000, "<="), (1, -2, 0, ">="), (1, -4, 0, "<="), (0, 1, 0, ">=")])
Iv = {q: 40 * q[0] + 50 * q[1] for q in V}
v.ok(V == [(0, 0), (6000, 3000), (7000, 3000), (8000, 2000)] and max(Iv.values()) == Iv[(7000, 3000)] == 430000 and R(8, 10) * 50 == 40 and Iv[(6000, 3000)] == 390000 and Iv[(8000, 2000)] == 420000, "2023-ord-sup-a ej.1")
v.solucion(s, "1", "(0,0)", "(6\\,000,3\\,000)", "(7\\,000,3\\,000)", "(8\\,000,2\\,000)", "430\\,000", "0{,}8\\cdot50=40")

m_ = symbols("m")
A = Matrix([[1, -1, 0], [0, m_, -2], [1, m_, 4]])
A1 = A.subs(m_, 1)
Bs = Matrix([[2, 1], [0, 3]])
Xs = (Bs ** 2 - Bs) * Bs.inv()
v.ok(expand(A.det() - (6 * m_ + 2)) == 0 and solve(A.det(), m_) == [R(-1, 3)] and A1.det() == 8 and A1.inv() == Matrix([[R(3, 4), R(1, 2), R(1, 4)], [R(-1, 4), R(1, 2), R(1, 4)], [R(-1, 8), R(-1, 4), R(1, 8)]]) and Xs == Bs - eye(2) and Xs * Bs - Bs ** 2 + Bs == Matrix([[0, 0], [0, 0]]), "2023-ord-sup-a ej.2")
v.solucion(s, "2", "|A|=6m+2", "m\\neq-\\frac{1}{3}", "|A|=8", mat(A1.inv()), "X=B-I")

aa, bb = symbols("aa bb")
sol = solve([R(625, 100) * aa + R(25, 10) * bb + 6 - R(35, 10), 2 * aa + bb], [aa, bb])
g = -2 * x ** 2 + 2 * x + 4
v.ok(sol == {aa: -2, bb: 4} and (-2 * x ** 2 + 4 * x + 6).subs(x, R(5, 2)) == R(7, 2) == -R(14, 10) * R(5, 2) + 7 and (-2 * x ** 2 + 4 * x + 6).subs(x, 1) == 8
     and sorted(solve(g, x)) == [-1, 2] and integrate(g, (x, -1, 2)) == 9, "2023-ord-sup-a ej.3")
v.solucion(s, "3", "a=-2", "b=4", "f(1)=8", "A=9")

v.ok((x ** 2 / 3).subs(x, 2) == R(4, 3) == (4 / (x + 1)).subs(x, 2) and diff(x ** 2 / 3, x).subs(x, 2) == R(4, 3) and diff(4 / (x + 1), x).subs(x, 2) == R(-4, 9), "2023-ord-sup-a ej.4")
v.solucion(s, "4", "f'(2^-)=\\frac{4}{3}", "f'(2^+)=-\\frac{4}{9}", "\\left(2,\\frac{4}{3}\\right)")

pG = R(5, 8) * R(9, 10) + R(3, 8) * R(5, 10)
v.ok(pG == R(3, 4) and R(5, 8) * R(9, 10) / pG == R(3, 4) and 1 - R(9, 10) == R(1, 10), "2023-ord-sup-a ej.5")
v.solucion(s, "5", "P(G)=0{,}75", "P(G^C\\mid T)=0{,}1", "P(T\\mid G)=0{,}75")

pWC = R(32, 100) * R(3, 10)
pC = (1 - R(646, 1000)) - R(32, 100) + pWC
v.ok(1 - R(646, 1000) == R(354, 1000) and pWC == R(96, 1000) and pC == R(13, 100) and pC - pWC == R(34, 1000) and R(32, 100) * pC == R(416, 10000) != pWC, "2023-ord-sup-a ej.6")
v.solucion(s, "6", "P(W\\cup C)=0{,}354", "P(C)=0{,}13", "P(W^C\\cap C)=0{,}034", "P(W)P(C)=0{,}0416")

E7 = R(224, 100) * 5 / 10
v.ok(E7 == R(112, 100) and 53 - E7 == R(5188, 100) and 53 + E7 == R(5412, 100) and R(5, 8) == R(625, 1000) and (R(5325, 100) - 53) / R(625, 1000) == R(4, 10) and cerca(1 - R(6554, 10000), 0.3446), "2023-ord-sup-a ej.7")
v.solucion(s, "7", "E=1{,}12", "(51{,}88,54{,}12)", "N(53,0{,}625)", "P(\\bar X>53{,}25)=0{,}3446")

E8, lo8, hi8 = ic_prop(R(3, 10), 300, R(217, 100))
n8 = R(196, 100) ** 2 * R(3, 10) * R(7, 10) / R(3, 100) ** 2
v.ok(cerca(E8, 0.0574) and cerca(lo8, 0.2426) and cerca(hi8, 0.3574) and cerca(n8, 896.37, 5e-3) and int(n8) + 1 == 897, "2023-ord-sup-a ej.8")
v.solucion(s, "8", "E=0{,}0574", "(0{,}2426,0{,}3574)", "896{,}37", "n=897")

# ======================= 2023-ord-sup-b =======================
s = "2023-ord-sup-b"
V = vertices([(10, 5, 1000, "<="), (5, 5, 800, "<="), (5, 0, 300, "<="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
Bv = {q: 30 * q[0] + 20 * q[1] for q in V}
v.ok(V == [(0, 0), (0, 160), (40, 120), (60, 0), (60, 80)] and max(Bv.values()) == Bv[(40, 120)] == 3600 and Bv[(0, 160)] == 3200 and Bv[(60, 80)] == 3400 and Bv[(60, 0)] == 1800, "2023-ord-sup-b ej.1")
v.solucion(s, "1", "(0,0)", "(0,160)", "(40,120)", "(60,80)", "(60,0)", "3\\,600")

A = Matrix([[5, -7, 6], [7, 0, 4], [0, 3, -1]])
B = Matrix([[1, 2, -9], [-2, 0, 11], [0, 4, -7]])
C = Matrix([1, 2, -1])
X = (4 * A - 3 * B) / 17
Y = (3 * A + 2 * B) / 17
v.ok((C.T * A * C).shape == (1, 1) and (C * C.T * B).shape == (3, 3) and A.det() == 17 and B.det() == 0 and 2 * X + 3 * Y == A and -3 * X + 4 * Y == B and X == Matrix([[1, -2, 3], [2, 0, -1], [0, 0, 1]]) and Y == Matrix([[1, -1, 0], [1, 0, 2], [0, 1, -1]]), "2023-ord-sup-b ej.2")
v.solucion(s, "2", "|A|=17", mat(A.inv() * 17), "|B|=0", mat(X), mat(Y), "17X=4A-3B", "17Y=3A+2B")

f1, f2 = x ** 2 - 4 * x + 4, -x + 4
v.ok(f1.subs(x, 3) == 1 == f2.subs(x, 3) and diff(f1, x).subs(x, 3) == 2 and diff(f2, x) == -1 and integrate(f1, (x, 2, 3)) + integrate(f2, (x, 3, 4)) == R(5, 6), "2023-ord-sup-b ej.3")
v.solucion(s, "3", "f'(3^-)=2", "A=\\frac{5}{6}")

Bt = -t ** 2 + 21 * t - 20
It = -t ** 2 + 48 * t
v.ok(expand(It - Bt - (27 * t + 20)) == 0 and sorted(solve(Bt, t)) == [1, 20] and solve(diff(Bt, t), t) == [R(21, 2)] and Bt.subs(t, R(21, 2)) == R(361, 4) and Bt.subs(t, 15) == 70, "2023-ord-sup-b ej.4")
v.solucion(s, "4", "G(t)=27t+20", "B(10{,}5)=90{,}25", "B(15)=70")

pD = R(6, 10) * R(2, 10) + R(3, 10) * R(5, 10) + R(1, 10) * R(6, 10)
v.ok(R(6, 10) * R(2, 10) + R(3, 10) * R(5, 10) == R(27, 100) and pD == R(33, 100) and R(1, 10) * R(4, 10) / (1 - pD) == R(4, 67) and cerca(R(4, 67), 0.0597), "2023-ord-sup-b ej.5")
v.solucion(s, "5", "0{,}12+0{,}15=0{,}27", "P(D)=0{,}33", "P(C\\mid D^C)=\\frac{4}{67}", "\\approx0{,}0597")

pPE = R(75, 100) + R(4, 10) - (1 - R(15, 100))
v.ok(pPE == R(3, 10) and (R(75, 100) - pPE) + (R(4, 10) - pPE) == R(55, 100) and (R(75, 100) - pPE) / (1 - R(4, 10)) == R(3, 4) and R(75, 100) * R(4, 10) == pPE, "2023-ord-sup-b ej.6")
v.solucion(s, "6", "P(P\\cap E)=0{,}3", "0{,}45+0{,}1=0{,}55", "P(P\\mid E^C)=0{,}75", "P(P)P(E)=0{,}3")

E7 = R(243, 100) * 3 / 12
n7 = (R(243, 100) * 3 / R(45, 100)) ** 2
v.ok(E7 == R(6075, 10000) and cerca(81 - E7, 80.3925) and cerca(81 + E7, 81.6075) and cerca(n7, 262.44, 5e-3) and int(n7) + 1 == 263
     and R(3, 8) == R(375, 1000) and (R(795, 10) - R(804, 10)) / R(375, 1000) == R(-24, 10) and (R(807, 10) - R(804, 10)) / R(375, 1000) == R(8, 10) and cerca(R(7881, 10000) - (1 - R(9918, 10000)), 0.7799), "2023-ord-sup-b ej.7")
v.solucion(s, "7", "z_{\\alpha/2}=2{,}43", "E=0{,}6075", "(80{,}3925,81{,}6075)", "262{,}44", "n=263", "N(80{,}4,0{,}375)", "P(-2{,}4<Z<0{,}8)=0{,}7799")

E8, lo8, hi8 = ic_prop(R(6, 10), 300, R(196, 100))
n8 = R(196, 100) ** 2 * R(24, 100) / R(2, 100) ** 2
v.ok(cerca(E8, 0.0554) and cerca(lo8, 0.5446) and cerca(hi8, 0.6554) and (R(66, 100) - R(54, 100)) / 2 == R(6, 100) and R(6, 100) / 3 == R(2, 100) and cerca(n8, 2304.96, 5e-3) and int(n8) + 1 == 2305, "2023-ord-sup-b ej.8")
v.solucion(s, "8", "E=0{,}0554", "(0{,}5446,0{,}6554)", "2\\,304{,}96", "n=2\\,305")

v.fin()
