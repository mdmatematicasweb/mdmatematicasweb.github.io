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

# ======================= 2021-ext =======================
s = "2021-ext"
a_ = symbols("a")
Aa = Matrix([[2, 1, 0], [1, 0, 2], [0, 2, a_]])
A1 = Aa.subs(a_, 1)
Xe = A1.inv() * Matrix([0, 1, -1])
v.ok(Aa.det() == -a_ - 8 and A1.det() == -9 and Xe == Matrix([R(1, 3), R(-2, 3), R(1, 3)]), "2021-ext ej.1")
v.solucion(s, "1", "|A|=-a-8", "a\\neq-8", "|A|=-9", mat(A1.inv()), mat(Xe))

V = vertices([(5, -4, -19, "<="), (3, -4, -13, "<="), (1, 0, -7, ">="), (1, 1, -2, "<=")])
G = {q: -q[0] / 5 + R(5, 2) * q[1] for q in V}
v.ok(V == [(-7, -2), (-7, 5), (-3, 1)] and G[(-7, -2)] == R(-18, 5) and G[(-7, 5)] == R(139, 10) and G[(-3, 1)] == R(31, 10) and R(47, 3) > R(139, 10), "2021-ext ej.2")
v.solucion(s, "2", "(-7,-2)", "(-7,5)", "(-3,1)", "G(-7,-2)=-\\frac{18}{5}", "G(-7,5)=\\frac{139}{10}", "G(-3,1)=\\frac{31}{10}")

v.ok(integrate(2 ** (x + 1), (x, -2, 0)) + integrate(x ** 2 - 2 * x, (x, 0, 2)) == 3 / (2 * log(2)) - R(4, 3) and abs(float(3 / (2 * log(2)) - R(4, 3)) - 0.8307) < 5e-5 and (2 ** (0 + 1)) == 2 and (x ** 2 - 2 * x).subs(x, 1) == -1, "2021-ext ej.3")
v.solucion(s, "3", "f(1)=-1", "\\approx0{,}8307", "f'(x)=2x-2")

t = symbols("t")
c1, c2, c3 = -t ** 2 + 2 * t - R(3, 10), R(1, 10) * t - R(12, 100), -R(1, 2) * t ** 2 + R(83, 10) * t - R(2862, 100)
v.ok(c1.subs(t, R(18, 10)) == c2.subs(t, R(18, 10)) == R(6, 100) and c2.subs(t, 5) == c3.subs(t, 5) == R(38, 100)
     and diff(c1, t).subs(t, R(18, 10)) == R(-8, 5) and diff(c2, t) == R(1, 10) and diff(c3, t).subs(t, 5) == R(33, 10)
     and solve(diff(c3, t), t) == [R(83, 10)] and c3.subs(t, R(83, 10)) == R(233, 40) == R(5825, 1000) and c3.subs(t, 10) == R(438, 100) and c1.subs(t, 1) == R(7, 10), "2021-ext ej.4")
v.solucion(s, "4", "f(1)=0{,}7", "f(8{,}3)=5{,}825", "f'(1{,}8^-)=-1{,}6", "f'(5^+)=3{,}3", "f(10)=4{,}38")

pP = R(15, 100) * R(92, 100) + R(85, 100) * R(4, 100)
v.ok(pP == R(172, 1000) and R(138, 1000) / pP == R(69, 86) and R(15, 100) * R(8, 100) == R(12, 1000) and R(12, 1000) / (1 - pP) == R(1, 69), "2021-ext ej.5")
v.solucion(s, "5", "P(+)=0{,}172", "P(E\\mid+)=\\frac{69}{86}", "\\approx0{,}8023", "P(E\\cap-)=0{,}012", "P(E\\mid-)=\\frac{1}{69}", "\\approx0{,}0145")

pVT = R(9, 10) + R(4, 10) - (1 - R(3, 100))
v.ok(1 - R(3, 100) == R(97, 100) and pVT == R(33, 100) and R(4, 10) - pVT == R(7, 100) and R(7, 100) / R(1, 10) == R(7, 10), "2021-ext ej.6")
v.solucion(s, "6", "P(V\\cup T)=0{,}97", "P(V\\cap T)=0{,}33", "P(T\\cap V^C)=0{,}07", "P(T\\mid V^C)=0{,}7")

p7 = R(115, 250)
z7 = R(281, 100)
E7 = z7 * sqrt(p7 * (1 - p7) / 250)
n7 = z7 ** 2 * p7 * (1 - p7) / R(5, 100) ** 2
v.ok(p7 == R(46, 100) and abs(float(E7) - 0.0886) < 5e-5 and abs(float(p7 - E7) - 0.3714) < 5e-5 and abs(float(p7 + E7) - 0.5486) < 5e-5 and abs(float(n7) - 784.56) < 5e-3 and int(n7) + 1 == 785, "2021-ext ej.7")
v.solucion(s, "7", "z_{\\alpha/2}=2{,}81", "E=0{,}0886", "(0{,}3714,0{,}5486)", "n=785", "784{,}56")

datos = [R(q) for q in "11.8 10 9.8 12 9.7 10.8 9.6 11.3 10.4 12.2 9.1 10.5".split()]
mx = sum(datos) / 12
E8 = R(217, 100) * 4 / sqrt(12)
n8 = (R(217, 100) * 4 / R(12, 10)) ** 2
v.ok(sum(datos) == R(1272, 10) and mx == R(106, 10) and abs(float(4 / sqrt(12)) - 1.1547) < 5e-5 and abs(float(E8) - 2.5057) < 5e-5
     and abs(float(mx - E8) - 8.0943) < 5e-5 and abs(float(mx + E8) - 13.1057) < 5e-5 and abs(float(n8) - 52.32) < 5e-3 and int(n8) + 1 == 53, "2021-ext ej.8")
v.solucion(s, "8", "\\approx1{,}1547", "\\bar x=\\frac{127{,}2}{12}=10{,}6", "z_{\\alpha/2}=2{,}17", "(8{,}0943,13{,}1057)", "n=53", "52{,}32")

# ======================= 2021-ext-res =======================
s = "2021-ext-res"
V = vertices([(2, 1, 24, "<="), (2, 1, 20, ">="), (1, 0, 4, ">="), (2, -1, 0, "<=")])
Fm = {q: R(6, 10) * q[0] + R(4, 10) * q[1] for q in V}
v.ok(V == [(4, 12), (4, 16), (5, 10), (6, 12)] and max(Fm.values()) == Fm[(4, 16)] == R(44, 5), "2021-ext-res ej.1")
v.solucion(s, "1", "(4,12)", "(4,16)", "(5,10)", "(6,12)", "8{,}8")

Am = Matrix([[1, 0, 1], [0, 1, 0], [1, 0, 1]])
Bm = Matrix([[1, 0, 2], [1, 1, -1], [2, 1, 0]])
Xm = Bm.inv() * Matrix([1, -3, 1])
v.ok(Am ** 4 == Matrix([[8, 0, 8], [0, 1, 0], [8, 0, 8]]) and all(Am ** n == Matrix([[2 ** (n - 1), 0, 2 ** (n - 1)], [0, 1, 0], [2 ** (n - 1), 0, 2 ** (n - 1)]]) for n in range(1, 10))
     and Bm.det() == -1 and Xm == Matrix([7, -13, -3]), "2021-ext-res ej.2")
v.solucion(s, "2", mat(Am ** 2), mat(Am ** 3), mat(Am ** 4), "|B|=-1", mat(Bm.inv()), mat(Xm))

a_, b_ = symbols("a b")
g1, g2 = a_ * x + b_, x ** 2 - b_ * x + a_
v.ok(solve(g1.subs(x, 1) - g2.subs(x, 1), b_) == [R(1, 2)] and solve(diff(g1, x) - diff(g2, x).subs(b_, R(1, 2)).subs(x, 1), a_) == [R(3, 2)]
     and integrate(R(1, 2), (x, 0, 1)) + integrate(x ** 2 - x / 2, (x, 1, 2)) == R(25, 12), "2021-ext-res ej.3")
v.solucion(s, "3", "b=\\frac{1}{2}", "a=\\frac{3}{2}", "A=\\frac{1}{2}+\\frac{5}{3}-\\frac{1}{12}=\\frac{25}{12}" if False else "\\frac{1}{2}+\\frac{5}{3}-\\frac{1}{12}=\\frac{25}{12}")

t = symbols("t")
cp = R(3, 100) * t ** 2 - R(9, 10) * t + 6
ct = R(1, 100) * t ** 3 - R(45, 100) * t ** 2 + 6 * t + 50
v.ok(sorted(solve(cp, t)) == [10, 20] and diff(ct, t) == cp and ct.subs(t, 0) == 50 and cp.subs(t, 5) > 0 and cp.subs(t, 15) < 0 and cp.subs(t, 22) > 0, "2021-ext-res ej.4")
v.solucion(s, "4", "t=10", "t=20", "c(t)=0{,}01t^3-0{,}45t^2+6t+50")

pND = R(45, 100) * R(99, 100) + R(21, 100) * R(97, 100) + R(34, 100) * R(98, 100)
v.ok(R(34, 100) * R(98, 100) == R(3332, 10000) and pND == R(9824, 10000) and R(4455, 10000) / pND == R(4455, 9824) and abs(float(R(4455, 9824)) - 0.4535) < 5e-5, "2021-ext-res ej.5")
v.solucion(s, "5", "P(D^C\\cap C)=0{,}3332", "P(D^C)=0{,}9824", "P(A\\mid D^C)=\\frac{4455}{9824}", "\\approx0{,}4535")

pPos = R(8, 10) * R(9, 10) + R(2, 10) * R(5, 100)
v.ok(R(8, 10) ** 2 == R(64, 100) and 1 - R(2, 10) ** 2 == R(96, 100) and pPos == R(73, 100) and R(72, 100) / pPos == R(72, 73) and abs(float(R(72, 73)) - 0.9863) < 5e-5, "2021-ext-res ej.6")
v.solucion(s, "6", "0{,}8\\cdot0{,}8=0{,}64", "1-0{,}2\\cdot0{,}2=1-0{,}04=0{,}96", "P(+)=0{,}73", "P(C\\mid+)=\\frac{72}{73}", "\\approx0{,}9863")

p7 = R(35, 100)
E7 = R(188, 100) * sqrt(p7 * (1 - p7) / 500)
n7 = R(217, 100) ** 2 * p7 * (1 - p7) / R(2, 100) ** 2
v.ok(abs(float(E7) - 0.0401) < 5e-5 and abs(float(p7 - E7) - 0.3099) < 5e-5 and abs(float(p7 + E7) - 0.3901) < 5e-5 and abs(float(n7) - 2678.19) < 5e-3 and int(n7) + 1 == 2679, "2021-ext-res ej.7")
v.solucion(s, "7", "z_{\\alpha/2}=1{,}88", "(0{,}3099,0{,}3901)", "z_{\\alpha/2}=2{,}17", "n=2\\,679", "2\\,678{,}19")

E8 = R(217, 100) * 7 / sqrt(300)
n8 = (R(188, 100) * 7 / R(12, 10)) ** 2
v.ok(abs(float(E8) - 0.877) < 5e-4 and abs(float(168 - E8) - 167.123) < 5e-4 and abs(float(168 + E8) - 168.877) < 5e-4 and abs(float(n8) - 120.27) < 5e-3 and int(n8) + 1 == 121, "2021-ext-res ej.8")
v.solucion(s, "8", "(167{,}123,168{,}877)", "z_{\\alpha/2}=1{,}88", "120{,}27", "n=121")

# ======================= 2021-ext-sup =======================
s = "2021-ext-sup"
V = vertices([(1, 1, 10, "<="), (1, 1, 4, ">="), (1, -1, 2, "<="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
Bn = {q: 60 * q[0] + 25 * q[1] for q in V}
v.ok(V == [(0, 4), (0, 10), (3, 1), (6, 4)] and max(Bn.values()) == Bn[(6, 4)] == 460 and Bn[(0, 4)] == 100 and Bn[(0, 10)] == 250 and Bn[(3, 1)] == 205, "2021-ext-sup ej.1")
v.solucion(s, "1", "(0,4)", "(0,10)", "(6,4)", "(3,1)", "460")

a_ = symbols("a")
Am = Matrix([[a_, 4], [6, 8]])
Bm = Matrix([[2, 2], [3, 3]])
A3 = Am.subs(a_, 3)
Xm = Matrix([[1, 2]]) * (A3 - Bm).inv()
v.ok(Am.det() == 8 * a_ - 24 and solve(Am.det(), a_) == [3] and (A3 - Bm).det() == -1 and Xm == Matrix([[1, 0]]) and Xm * A3 - Xm * Bm == Matrix([[1, 2]])
     and A3 ** 2 == 11 * A3 and A3 ** 8 == 11 ** 7 * A3 and 11 ** 7 == 19487171, "2021-ext-sup ej.2")
v.solucion(s, "2", "|A|=8a-24", "a=3", mat((A3 - Bm).inv()), mat(Xm), mat(A3 ** 2), "A^8=11^7A=19\\,487\\,171A")

fa, fb = (x + 1) ** 2, (x - 1) ** 2
v.ok(fa.subs(x, 0) == fb.subs(x, 0) == 1 and diff(fa, x).subs(x, 0) == 2 and diff(fb, x).subs(x, 0) == -2
     and [fa.subs(x, -2), fa.subs(x, -1), fb.subs(x, 0), fb.subs(x, 1), fb.subs(x, 2)] == [1, 0, 1, 0, 1]
     and integrate(fa, (x, -1, 0)) + integrate(fb, (x, 0, 1)) == R(2, 3), "2021-ext-sup ej.3")
v.solucion(s, "3", "f'(0^-)=2", "A=\\frac{2}{3}", "(-1,0)", "(1,0)", "(0,1)")

fp = 8 - x ** 2 / 2
g = (x ** 2 - 3) * exp(2 * x - 1)
v.ok(fp.subs(x, 0) == 8 and fp.subs(x, 4) == 0 and fp.subs(x, -4) == 0 and fp.subs(x, 0) == 8 and simplify(diff(g, x) - exp(2 * x - 1) * (2 * x ** 2 + 2 * x - 6)) == 0, "2021-ext-sup ej.4")
v.solucion(s, "4", "f'(x)=8-\\frac{x^2}{2}", "y=8x", "e^{2x-1}\\left(2x^2+2x-6\\right)")

pV = R(4, 10) * R(6, 10) + R(6, 10) * R(3, 10)
v.ok(pV == R(42, 100) and R(16, 100) / (1 - pV) == R(8, 29) and R(4, 10) * R(6, 10) * R(1, 10) + R(6, 10) * R(3, 10) * R(2, 10) == R(6, 100) and abs(float(R(8, 29)) - 0.2759) < 5e-5, "2021-ext-sup ej.5")
v.solucion(s, "5", "P(V)=0{,}42", "\\frac{8}{29}", "\\approx0{,}2759", "0{,}024+0{,}036=0{,}06")

pA = 1 - R(4, 10)
pAB = pA - R(12, 100)
pB = pAB / pA
v.ok(pA == R(6, 10) and pAB == R(48, 100) and pB == R(8, 10) and pA + pB - pAB == R(92, 100) and 1 - pAB == R(52, 100) and R(12, 100) / R(2, 10) == R(6, 10) and 1 - R(2, 10) == pB, "2021-ext-sup ej.6")
v.solucion(s, "6", "P(A)=0{,}6", "P(A\\cap B)=0{,}6-0{,}12=0{,}48", "P(B)=0{,}8", "P(A\\cup B)=0{,}92", "P(A^C\\cup B^C)=0{,}52", "P(A\\mid B^C)=0{,}6")

import itertools as it
pares = list(it.product(range(1, 10), repeat=2))
suma10 = [p for p in pares if p[0] + p[1] == 10]
p7 = R(500, 10000)
E7 = R(217, 100) * sqrt(p7 * (1 - p7) / 10000)
v.ok(len(pares) == 81 and len(suma10) == 9 and R(len(suma10), 81) == R(1, 9) and abs(float(E7) - 0.0047) < 5e-5 and abs(float(p7 - E7) - 0.0453) < 5e-5 and abs(float(p7 + E7) - 0.0547) < 5e-5 and R(6, 100) > p7 + E7, "2021-ext-sup ej.7")
v.solucion(s, "7", "9\\cdot9=81", "P(\\bar x=5)=\\frac{9}{81}=\\frac{1}{9}", "(0{,}0453,0{,}0547)", "z_{\\alpha/2}=2{,}17")

datos = [30, 42, 38, 45, 52, 60, 21, 26, 33, 44, 28, 49, 32, 51, 49, 40]
n8 = (R(233, 100) * 9 / 2) ** 2
E8 = R(196, 100) * 9 / 4
v.ok(sum(datos) == 640 and R(sum(datos), 16) == 40 and E8 == R(441, 100) and abs(float(n8) - 109.93) < 1e-2 and int(n8) + 1 == 110, "2021-ext-sup ej.8")
v.solucion(s, "8", "\\bar x=\\frac{640}{16}=40", "E=1{,}96\\cdot\\frac{9}{\\sqrt{16}}=4{,}41", "(35{,}59,44{,}41)", "z_{\\alpha/2}=2{,}33", "n=110" if False else "109{,}93")

v.fin()
