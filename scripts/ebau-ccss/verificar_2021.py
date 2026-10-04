#!/usr/bin/env python3
"""Verifica las soluciones PAU CCSS de 2021 (data/2021-*.md, soluciones/2021-*.md). Ver _verif.py.

Uso:  python scripts/ebau-ccss/verificar_2021.py     (requiere `pip install sympy`)
"""
import itertools
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _verif import Verificador, R, Matrix, tx, dec  # noqa: E402
from sympy import symbols, solve, diff, integrate, sqrt, log, exp, simplify, eye, factor  # noqa: E402

v = Verificador(2021)
x, y, m, a = symbols("x y m a")


def vertices(cons):
    """Vértices de una región {a x + b y (>=|<=) c}: devuelve los puntos factibles."""
    def ok(p):
        return all((A * p[0] + B * p[1] >= C if t == ">=" else A * p[0] + B * p[1] <= C) for A, B, C, t in cons)
    out = set()
    for (a1, b1, c1, _), (a2, b2, c2, _) in itertools.combinations(cons, 2):
        s = solve([a1 * x + b1 * y - c1, a2 * x + b2 * y - c2], [x, y], dict=True)
        if s and ok((s[0][x], s[0][y])):
            out.add((s[0][x], s[0][y]))
    return sorted(out)


# ======================= 2021-ord =======================
s = "2021-ord"
v.enunciado(s, "1", ["150", "100", "6000", "130", "140"])
V = vertices([(1, 1, 10, ">="), (-1, 1, 10, "<="), (150, 100, 6000, "<="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
B = {p: 130 * p[0] + 140 * p[1] for p in V}
v.ok(V == [(0, 10), (10, 0), (20, 30), (40, 0)] and max(B.values()) == 6800 and B[(20, 30)] == 6800, "2021-ord ej.1")
v.solucion(s, "1", "(20,30)", "(10,0)", "(40,0)", "(0,10)", "6\\,800")

A = Matrix([[1, -1, m], [0, 2, -3], [m, 1, 1]])
v.enunciado(s, "2", ["m", "I_3"])
dets = solve(A.det(), m)
v.ok(sorted(dets) == [-1, R(5, 2)], "2021-ord ej.2a")
A2 = A.subs(m, 2)
X = (eye(3) + A2 ** 2) * A2.inv()
v.ok(A2.det() == 3 and X * A2 - A2 ** 2 == eye(3), "2021-ord ej.2b")
from _ej_comun import mat  # noqa: E402
v.solucion(s, "2", "m\\neq-1", "m\\neq\\frac{5}{2}", "|A|=3", mat(A2 ** 2), mat(A2.inv()), mat(X))

f = x ** 3 - 4 * x ** 2 + 4 * x
cr = sorted(solve(diff(f, x), x))
v.ok(cr == [R(2, 3), 2] and f.subs(x, R(2, 3)) == R(32, 27) and f.subs(x, 2) == 0 and integrate(f, (x, 0, 2)) == R(4, 3), "2021-ord ej.3")
v.enunciado(s, "3", ["f(x)=x^{3}-4x^{2}+4x"])
v.solucion(s, "3", "\\left(\\frac{2}{3},\\frac{32}{27}\\right)", "(2,0)", "A=\\frac{4}{3}", "\\frac{x^4}{4}-\\frac{4x^3}{3}+2x^2+C")

fl = log((x - 1) / (x + 1))
g = x ** 3 * exp(2 * x ** 2)
v.ok(simplify(diff(fl, x) - 2 / (x ** 2 - 1)) == 0 and simplify(diff(g, x) - x ** 2 * exp(2 * x ** 2) * (3 + 4 * x ** 2)) == 0, "2021-ord ej.4a")
h = x ** 2 + x + 1
v.ok(solve(diff(h, x), x) == [R(-1, 2)] and h.subs(x, R(-1, 2)) == R(3, 4) and integrate(h, (x, R(-1, 2), 0)) == R(5, 12), "2021-ord ej.4bc")
v.solucion(s, "4", "f'(x)=\\frac{2}{x^2-1}", "g'(x)=x^2e^{2x^2}\\left(3+4x^2\\right)", "\\left(-\\frac{1}{2},\\frac{3}{4}\\right)", "(0,1)", "A=\\frac{5}{12}")

pG = R(6, 10) * R(9, 10) + R(3, 10) * R(95, 100)
v.ok(pG == R(33, 40) and R(1, 10) / (1 - pG) == R(4, 7), "2021-ord ej.5")
v.solucion(s, "5", "P(G)=0{,}825", "P(P\\mid G^C)=\\frac{4}{7}", "\\approx0{,}5714")

pE, pI = R(55, 100), R(72, 100)
pEI = pI * R(64, 100)
pU = pE + pI - pEI
v.ok(pEI == R(4608, 10000) and pU == R(8092, 10000) and (1 - pU) / (1 - pE) == R(424, 1000), "2021-ord ej.6")
v.solucion(s, "6", "P(E\\cap I)=0{,}4608", "P(E\\cup I)=0{,}8092", "0{,}424")

sizes = [60, 40, 30, 50, 20]
v.ok(sum(sizes) == 200 and [n // 5 for n in sizes] == [12, 8, 6, 10, 4] and solve((a + 51) / 5 - R(132, 10), a) == [15], "2021-ord ej.7")
v.solucion(s, "7", "N=60+40+30+50+20=200", "40", "a=15")

p, n = R(45, 100), 100
z = R(175, 100)
E = z * sqrt(p * (1 - p) / n)
v.ok(abs(float(E) - 0.0871) < 5e-5 and abs(float(p - E) - 0.3629) < 5e-5 and abs(float(p + E) - 0.5371) < 5e-5, "2021-ord ej.8a")
nmin = z ** 2 * p * (1 - p) / R(5, 100) ** 2
v.ok(nmin == R(3031875, 10000) and int(nmin) + 1 == 304, "2021-ord ej.8b")
v.solucion(s, "8", "(0{,}3629,0{,}5371)", "z_{\\alpha/2}=1{,}75", "n=304", "303{,}19")

# ======================= 2021-ord-res =======================
s = "2021-ord-res"
v.enunciado(s, "1", ["75", "100", "2,40", "1,80", "3,75", "x+4y\\ge5", "7x+5y\\le35", "F(x,y)=2x+y"])
V = vertices([(1, 4, 5, ">="), (1, 2, 4, ">="), (7, 5, 35, "<="), (1, 0, 0, ">=")])
Fm = {q: 2 * q[0] + q[1] for q in V}
v.ok(V == [(0, 2), (0, 7), (3, R(1, 2)), (5, 0)] and min(Fm.values()) == 2 and Fm[(0, 2)] == 2 and Fm[(3, R(1, 2))] == R(13, 2), "2021-ord-res ej.1b")
v.ok(R(75 * 50, 1) <= 3750 and 75 + 75 == 150, "2021-ord-res ej.1a")
v.solucion(s, "1", "F(x,y)=2{,}4x+1{,}8y", "x+y\\le50", "2x+y\\le80", "(0,7)", "(0,2)", "\\left(3,\\frac{1}{2}\\right)", "(5,0)")

Am = Matrix([[2, 1, 0], [4, 2, 0], [2, 2, 5]])
Mm = 10 * eye(3) - Am
Xm = Mm.inv() * Matrix([5, 20, -3])
v.ok(Mm.det() == 300 and Xm == Matrix([1, 3, 1]) and Mm * Xm == Matrix([5, 20, -3]), "2021-ord-res ej.2")
v.solucion(s, "2", "|10I_3-A|=300", mat(Mm.inv()), mat(Xm), "3\\times1")

a_, b_ = symbols("a b")
f1, f2, f3 = -2 * x + 2 * a_, -2 * x ** 2 - 4 * a_, -8 * x + b_
sol = solve([f1.subs(x, -2) - f2.subs(x, -2), f2.subs(x, 2) - f3.subs(x, 2)], [a_, b_])
v.ok(sol == {a_: -2, b_: 16}, "2021-ord-res ej.3a")
g1, g2, g3 = -2 * x - 4, -2 * x ** 2 + 8, -8 * x + 16
v.ok(diff(g1, x) == -2 and diff(g2, x).subs(x, -2) == 8 and diff(g2, x).subs(x, 2) == -8 and diff(g3, x) == -8
     and g1.subs(x, -4) == 4 and g3.subs(x, 3) == -8 and g2.subs(x, 0) == 8 and integrate(g2, (x, -2, 2)) == R(64, 3), "2021-ord-res ej.3bc")
v.solucion(s, "3", "a=-2", "b=16", "f'(-2^-)=-2", "(0,8)", "(-2,0)", "A=\\frac{64}{3}")

fx = (5 * x ** 3 + 4 * x - 2) ** 4 * log(2 * x ** 5 - 4 * x ** 3 + x)
fp = 4 * (5 * x ** 3 + 4 * x - 2) ** 3 * (15 * x ** 2 + 4) * log(2 * x ** 5 - 4 * x ** 3 + x) + (5 * x ** 3 + 4 * x - 2) ** 4 * (10 * x ** 4 - 12 * x ** 2 + 1) / (2 * x ** 5 - 4 * x ** 3 + x)
gx = exp(3 * x ** 2 - 5 * x) / (6 * x ** 2 + 2) ** 3
gp = exp(3 * x ** 2 - 5 * x) * (36 * x ** 3 - 30 * x ** 2 - 24 * x - 10) / (6 * x ** 2 + 2) ** 4
hx = x ** 4 + x ** 3 / 3 - 2 * x ** 2 - x - 5
v.ok(simplify(diff(fx, x) - fp) == 0 and simplify(diff(gx, x) - gp) == 0 and diff(hx, x) == 4 * x ** 3 + x ** 2 - 4 * x - 1 and hx.subs(x, 2) == R(11, 3), "2021-ord-res ej.4")
v.solucion(s, "4", "36x^3-30x^2-24x-10", "15x^2+4", "10x^4-12x^2+1", "C=-5", "h(x)=x^4+\\frac{x^3}{3}-2x^2-x-5")

pA = 1 - R(35, 100)
pAB = pA - R(3, 10)
pB = R(55, 100)
v.ok(pAB == R(35, 100) and pA + pB - pAB == R(85, 100) and (pB - pAB) / (1 - pA) == R(4, 7) and 1 - (pA + pB - pAB) == R(15, 100) and pA * pB != pAB, "2021-ord-res ej.5")
v.solucion(s, "5", "P(A\\cap B)=0{,}35", "P(A\\cup B)=0{,}85", "P(B\\mid A^C)=\\frac{4}{7}", "\\approx0{,}5714", "P(A^C\\cap B^C)=0{,}15", "0{,}3575")

pN = R(7, 10) * R(15, 100) + R(3, 10) * R(8, 10)
v.ok(pN == R(345, 1000) and R(24, 100) / pN == R(16, 23) and R(7, 10) * R(85, 100) == R(595, 1000), "2021-ord-res ej.6")
v.solucion(s, "6", "P(N)=0{,}345", "P(B\\mid N)=\\frac{16}{23}", "\\approx0{,}6957", "P(A\\cap N^C)=0{,}595")

tot = 15000 + 16800 + 11400 + 6000
fr = R(375, 15000)
v.ok(tot == 49200 and tot * fr == 1230 and [fr * k for k in (15000, 16800, 11400, 6000)] == [375, 420, 285, 150], "2021-ord-res ej.7a")
means = [R(i + j, 2) for i in (1, 3, 5) for j in (1, 3, 5)]
mu = sum(means) / 9
var = sum((q - mu) ** 2 for q in means) / 9
v.ok(mu == 3 and var == R(4, 3) and abs(float(sqrt(var)) - 1.1547) < 5e-5, "2021-ord-res ej.7b")
v.solucion(s, "7", "15\\,000+16\\,800+11\\,400+6\\,000=49\\,200", "0{,}025\\cdot49\\,200=1\\,230", "0{,}025\\cdot16\\,800=420", "\\mu_{\\bar x}=3", "\\sigma_{\\bar x}^2=\\frac{4}{3}", "\\approx1{,}1547")

p8, n8, z8 = R(12, 50), 50, R(196, 100)
E8 = z8 * sqrt(p8 * (1 - p8) / n8)
v.ok(abs(float(E8) - 0.1184) < 5e-5 and abs(float(p8 - E8) - 0.1216) < 5e-5 and abs(float(p8 + E8) - 0.3584) < 5e-5, "2021-ord-res ej.8a")
n8min = z8 ** 2 * p8 * (1 - p8) / R(1, 10) ** 2
v.ok(abs(float(n8min) - 70.07) < 5e-3 and int(n8min) + 1 == 71, "2021-ord-res ej.8b")
v.solucion(s, "8", "E=0{,}1184", "(0{,}1216,0{,}3584)", "n=71" if False else "\\approx70{,}07")

# ======================= 2021-ord-sup =======================
s = "2021-ord-sup"
A1 = Matrix([[1, 0], [-1, 1]])
At = A1.T
Xs = (At + eye(2)).inv() * (At - eye(2))
v.ok(A1 ** 40 == Matrix([[1, 0], [-40, 1]]) and At ** 30 == Matrix([[1, -30], [0, 1]]) and (A1.inv() + A1) ** 2 == 4 * eye(2)
     and (At + eye(2)).det() == 4 and Xs == Matrix([[0, R(-1, 2)], [0, 0]]), "2021-ord-sup ej.1")
v.enunciado(s, "1", ["\\begin{pmatrix}1&0\\\\-1&1\\end{pmatrix}", "A^{40}" if False else "A^{t}"])
v.solucion(s, "1", mat(A1 ** 40), mat(At ** 30), mat(4 * eye(2)), mat((At + eye(2)).inv()), mat(Xs))

V = vertices([(5, -3, -9, ">="), (1, 1, 11, "<="), (6, 1, 36, "<="), (1, 2, 6, ">=")])
Fv = {q: 10 * q[0] - 6 * q[1] for q in V}
v.ok(V == [(0, 3), (3, 8), (5, 6), (6, 0)] and max(Fv.values()) == 60 and min(Fv.values()) == -18 and Fv[(0, 3)] == Fv[(3, 8)] == -18 and 5 + 7 > 11, "2021-ord-sup ej.2")
v.solucion(s, "2", "(0,3)", "(3,8)", "(5,6)", "(6,0)", "F(0,3)=-18", "F(3,8)=-18", "F(5,6)=14", "F(6,0)=60", "5+7=12")

f1, f2, f3 = 1 / x, -3 * x ** 2 + 4, 2 * x - 1
v.ok(f1.subs(x, -1) == -1 and f2.subs(x, -1) == 1 and f2.subs(x, 1) == 1 and f3.subs(x, 1) == 1 and diff(f2, x).subs(x, 1) == -6 and diff(f3, x) == 2
     and integrate(f2, (x, 0, 1)) + integrate(f3, (x, 1, 3)) == 9, "2021-ord-sup ej.3")
v.solucion(s, "3", "f'(1^-)=-6", "A=3+6", "A=9")

fc = x ** 2 - 6 * x + 10
v.ok(solve(diff(fc, x), x) == [3] and fc.subs(x, 3) == 1 and fc.subs(x, 4) == 2 and diff(fc, x).subs(x, 4) == 2, "2021-ord-sup ej.4")
v.solucion(s, "4", "f(3)=1", "y=2x-6", "f(4)=2", "f'(4)=2")

mujeres = R(42, 100) * 1000 + R(20, 100) * 600 + R(50, 100) * 400
v.ok(mujeres == 740 and R(740, 2000) == R(37, 100) and R(480, 1260) == R(8, 21), "2021-ord-sup ej.5")
v.solucion(s, "5", "P(M)=\\frac{740}{2000}=0{,}37", "\\frac{480}{1260}=\\frac{8}{21}", "\\approx0{,}3810")

pS = R(10, 36)
rolls = sum(1 for i in range(1, 7) for j in range(1, 7) if i + j >= 9)
v.ok(rolls == 10 and (1 - pS) * R(3, 9) == R(13, 54) and pS * R(4, 9) + (1 - pS) * R(6, 9) == R(49, 81), "2021-ord-sup ej.6")
v.solucion(s, "6", "P(S)=\\frac{10}{36}=\\frac{5}{18}", "\\frac{13}{54}", "\\approx0{,}2407", "\\frac{49}{81}", "\\approx0{,}6049")

p7, n7 = R(15, 100), 1000
E7 = R(196, 100) * sqrt(p7 * (1 - p7) / n7)
nmin7 = R(196, 100) ** 2 * p7 * (1 - p7) / R(1, 100) ** 2
v.ok(abs(float(E7) - 0.0221) < 5e-5 and abs(float(p7 - E7) - 0.1279) < 5e-5 and abs(float(p7 + E7) - 0.1721) < 5e-5 and nmin7 == R(489804, 100) and int(nmin7) + 1 == 4899, "2021-ord-sup ej.7")
v.solucion(s, "7", "(0{,}1279,0{,}1721)", "4\\,898{,}04", "n=4\\,899")

v.ok(sqrt(256) == 16 and R(63744, 64) == 996 and abs(float(1 - R(9772, 10000)) - 0.0228) < 1e-12, "2021-ord-sup ej.8")
v.ok(R(1645, 1000) * 2 == R(329, 100) and 996 - R(329, 100) == R(99271, 100) and 996 + R(329, 100) == R(99929, 100), "2021-ord-sup ej.8b")
v.solucion(s, "8", "P(\\bar X<996)=0{,}0228", "\\bar x=\\frac{63\\,744}{64}=996", "E=1{,}645\\cdot\\frac{16}{\\sqrt{64}}=3{,}29", "(992{,}71,999{,}29)")

v.fin()
