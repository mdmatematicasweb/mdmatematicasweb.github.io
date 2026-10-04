#!/usr/bin/env python3
"""Verifica las soluciones PAU CCSS de 2022 (data/2022-*.md, soluciones/2022-*.md). Ver _verif.py.

Uso:  python scripts/ebau-ccss/verificar_2022.py     (requiere `pip install sympy`)
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _verif import Verificador, R, Matrix, tx, dec, mat, vertices  # noqa: E402
from sympy import symbols, solve, diff, integrate, sqrt, log, exp, simplify, eye, factor, expand  # noqa: E402

v = Verificador(2022)
x, y, a, b, c, t = symbols("x y a b c t")


def ic_prop(p, n, z):
    E = z * sqrt(p * (1 - p) / n)
    return E, p - E, p + E


def cerca(val, objetivo, tol=5e-5):
    return abs(float(val) - objetivo) < tol


# ======================= 2022-ord =======================
s = "2022-ord"
V = vertices([(3, 4, 120, "<="), (1, 3, 75, "<="), (0, 1, 9, ">="), (1, 0, 0, ">=")])
tot = {q: q[0] + q[1] for q in V}
v.ok(V == [(0, 9), (0, 25), (12, 21), (28, 9)] and max(tot.values()) == tot[(28, 9)] == 37 and 3 * 28 + 4 * 9 == 120 and 2 * 28 + 6 * 9 == 110, "2022-ord ej.1")
v.solucion(s, "1", "(0,9)", "(0,25)", "(12,21)", "(28,9)", "3\\cdot28+4\\cdot9=120", "2\\cdot28+6\\cdot9=110")

A = Matrix([[a, 1, 0], [0, a, 1], [3, 4, 1]])
A2 = A.subs(a, 2)
M = Matrix([[2], [-1], [0]]) * Matrix([[1, 3, -1]])
X = (M - eye(3)) * A2.inv()
v.ok(factor(A.det()) == (a - 1) * (a - 3) and A2.det() == -1 and X * A2 + eye(3) == M, "2022-ord ej.2")
v.solucion(s, "2", "|A|=a^2-4a+3", mat(A2.inv()), mat(M), mat(X))

f = x ** 3 + a * x ** 2 + b * x + c
sol = solve([f.subs(x, 0) - 18, diff(f, x).subs(x, 0) + 3, diff(f, x).subs(x, 3)], [a, b, c])
g = x ** 3 - 4 * x ** 2 - 3 * x + 18
v.ok(sol == {a: -4, b: -3, c: 18} and expand(f.subs(sol) - g) == 0 and integrate(g, (x, -2, 3)) == R(625, 12) and g.subs(x, 3) == 0 and g.subs(x, -2) == 0, "2022-ord ej.3")
v.solucion(s, "3", "a=-4", "b=-3", "c=18", "A=\\frac{625}{12}")

aa, bb = symbols("aa bb")
sol4 = solve([aa + bb + 2 - 3, 2 * aa + bb - 6], [aa, bb])
g4 = -2 * x ** 2 + 8 * x - 6
v.ok(sol4 == {aa: 5, bb: -4} and integrate(g4, (x, 1, 3)) == R(8, 3) and sorted(solve(g4, x)) == [1, 3], "2022-ord ej.4")
v.solucion(s, "4", "a=5", "b=-4", "A=\\frac{8}{3}")

pH, pG, pHG = R(7, 10), R(25, 100), R(2, 10)
v.ok(1 - (pH + pG - pHG) == R(1, 4) and R(1, 4) / (1 - pH) == R(5, 6) and (pG - pHG) / pG == R(1, 5), "2022-ord ej.5")
v.solucion(s, "5", "P(H^C\\cap G^C)=0{,}25", "P(G^C\\mid H^C)=\\frac{5}{6}", "\\approx0{,}8333", "P(H^C\\mid G)=0{,}2")

pV, pL = R(65, 100), R(45, 100)
pU = 1 - R(15, 100)
pVL = pV + pL - pU
v.ok(pU == R(85, 100) and pVL == R(25, 100) and pV - pVL == R(4, 10) and (pL - pVL) / (1 - pV) == R(4, 7), "2022-ord ej.6")
v.solucion(s, "6", "P(V\\cup L)=0{,}85", "P(V\\cap L)=0{,}25", "P(V\\cap L^C)=0{,}4", "P(L\\mid V^C)=\\frac{4}{7}", "\\approx0{,}5714")

z = R(175, 100)
E7 = z * 15 / 10
n7 = (z * 15 / 2) ** 2
v.ok(E7 == R(2625, 1000) and 800 - E7 == R(797375, 1000) and 800 + E7 == R(802625, 1000) and cerca(n7, 172.27, 5e-3) and int(n7) + 1 == 173, "2022-ord ej.7")
v.solucion(s, "7", "E=2{,}625", "(797{,}375,802{,}625)", "172{,}27", "n=173")

E8, lo8, hi8 = ic_prop(R(8, 10), 400, z)
n8 = z ** 2 * R(8, 10) * R(2, 10) / R(2, 100) ** 2
v.ok(E8 == R(35, 1000) and lo8 == R(765, 1000) and hi8 == R(835, 1000) and n8 == 1225, "2022-ord ej.8")
v.solucion(s, "8", "E=0{,}035", "(0{,}765,0{,}835)", "1\\,225", "n=1\\,226")

# ======================= 2022-ord-res =======================
s = "2022-ord-res"
A = Matrix([[1, 0, 1], [-1, -1, 1], [2, -1, 0]])
B = Matrix([[1, -1, 1], [-1, -1, -1], [1, -1, 1]])
C = Matrix([3, -7, -2])
D = A - B
X = D.inv() * C
v.ok(D.det() == 2 and A * X == B * X + C and X == Matrix([R(-11, 2), 3, R(-7, 2)]) and C.T * B.T == Matrix([[8, 6, 8]]), "2022-ord-res ej.1")
v.solucion(s, "1", mat(A + B), mat(C.T * B.T), "|A-B|=2", mat(D.inv()), mat(X))

V = vertices([(2, 3, 400, "<="), (2, 1, 300, "<="), (0, 1, 100, "<="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
Vt = {q: 35 * q[0] + 45 * q[1] for q in V}
v.ok(V == [(0, 0), (0, 100), (50, 100), (125, 50), (150, 0)] and max(Vt.values()) == Vt[(125, 50)] == 6625, "2022-ord-res ej.2")
v.solucion(s, "2", "(0,0)", "(0,100)", "(50,100)", "(125,50)", "(150,0)", "6\\,625")

f1, f2 = 4 * x ** 2 + 16 * x + 17, (10 - 5 * x) / 3
v.ok(f1.subs(x, -1) == f2.subs(x, -1) == 5 and diff(f1, x).subs(x, -1) == 8 and diff(f2, x) == R(-5, 3) and f2.subs(x, 2) == 0, "2022-ord-res ej.3 (cont.)")
v.ok(integrate(f1, (x, -2, -1)) == R(7, 3) and integrate(f2, (x, -1, 2)) == R(15, 2) and R(7, 3) + R(15, 2) == R(59, 6) and 16 ** 2 - 4 * 4 * 17 < 0, "2022-ord-res ej.3")
v.solucion(s, "3", "f'(-1^-)=8", "f'(-1^+)=-\\frac{5}{3}", "A=\\frac{59}{6}")

fx = 3 * x ** 3 - 6 * x ** 2 + 5
rs = sorted(solve(diff(fx, x) + 3, x))
Fx = 3 * x ** 4 / 4 - 2 * x ** 3 + 5 * x - 2
v.ok(rs == [R(1, 3), 1] and fx.subs(x, 1) == 2 and fx.subs(x, R(1, 3)) == R(40, 9) and diff(Fx, x) == fx and Fx.subs(x, 2) == 4, "2022-ord-res ej.4")
v.solucion(s, "4", "y=-3x+5", "y=-3x+\\frac{49}{9}", "F(x)=\\frac{3x^4}{4}-2x^3+5x-2")

pAB = R(7, 10) + R(6, 10) - R(8, 10)
v.ok(pAB == R(5, 10) and 1 - R(8, 10) == R(2, 10) and R(7, 10) - pAB == R(2, 10) and R(2, 10) / R(4, 10) == R(1, 2), "2022-ord-res ej.5")
v.solucion(s, "5", "P(A\\cap B)=0{,}5", "P(A^C\\cap B^C)=0{,}2", "P(A\\cap B^C)=0{,}2", "P(A\\mid B^C)=0{,}5")

pPos = R(5, 100) * R(96, 100) + R(95, 100) * R(10, 100)
v.ok(pPos == R(143, 1000) and R(48, 1000) / pPos == R(48, 143) and R(95, 100) * R(90, 100) == R(855, 1000) and R(855, 1000) / (1 - pPos) == R(855, 857) and cerca(R(48, 143), 0.3357) and cerca(R(855, 857), 0.9977), "2022-ord-res ej.6")
v.solucion(s, "6", "P(+)=0{,}143", "P(A\\mid+)=\\frac{48}{143}", "\\approx0{,}3357", "P(-\\cap A^C)=0{,}855", "\\frac{855}{857}", "\\approx0{,}9977")

E7, lo7, hi7 = ic_prop(R(8, 10), 120, R(196, 100))
n7 = R(217, 100) ** 2 * R(8, 10) * R(2, 10) / R(5, 100) ** 2
v.ok(cerca(E7, 0.0716) and cerca(lo7, 0.7284) and cerca(hi7, 0.8716) and cerca(n7, 301.37, 5e-3) and int(n7) + 1 == 302, "2022-ord-res ej.7")
v.solucion(s, "7", "E=0{,}0716", "(0{,}7284,0{,}8716)", "301{,}37", "n=302")

E8 = R(175, 100) * 65 / 10
n8 = (R(233, 100) * 65 / 5) ** 2
v.ok(sqrt(4225) == 65 and E8 == R(11375, 1000) and 268.3 - float(E8) == 256.925 and 268.3 + float(E8) == 279.675 and cerca(n8, 917.48, 5e-3) and int(n8) + 1 == 918 and R(22408 + 25592, 200) == 240, "2022-ord-res ej.8")
v.solucion(s, "8", "\\sqrt{4225}=65", "E=11{,}375", "(256{,}925,279{,}675)", "917{,}48", "\\bar x=240")

# ======================= 2022-ord-sup =======================
s = "2022-ord-sup"
V = vertices([(1, 1, 3, ">="), (2, 1, 7, "<="), (4, 1, 9, "<="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
Gv = {q: 40 * q[0] + 15 * q[1] for q in V}
v.ok(V == [(0, 3), (0, 7), (1, 5), (2, 1)] and max(Gv.values()) == Gv[(1, 5)] == 115, "2022-ord-sup ej.1")
v.solucion(s, "1", "(0,3)", "(0,7)", "(1,5)", "(2,1)", "115")

A = Matrix([[7, -6, -2], [3, 1, 4], [-5, 0, -4]])
X = (A.T - 3 * eye(3)) * A.inv()
a_ = symbols("a")
CD = Matrix([[1, 2, -1], [-2, -3, 0]]).T * Matrix([[a_ ** 2, 0, -1], [1, -1, a_]])
Bm = Matrix([[2, 2, 3], [5, 3, 4], [-4, 0, 1]])
sol = solve(list(CD - Bm), a_, dict=True)
v.ok(A.det() == 10 and A.T - X * A == 3 * eye(3) and sol == [{a_: -2}], "2022-ord-sup ej.2")
v.solucion(s, "2", "|A|=10", mat(A.T - 3 * eye(3)), mat(A.inv()), mat(X), "a^2-2&2&-1-2a", "a=-2")

Bx = -x ** 2 + 16 * x - 48
v.ok(sorted(solve(Bx, x)) == [4, 12] and solve(diff(Bx, x), x) == [8] and Bx.subs(x, 8) == 16 and sorted(solve(Bx - 7, x)) == [5, 11], "2022-ord-sup ej.3")
v.solucion(s, "3", "B(8)=16", "x=5", "x=11")

aa, bb = symbols("aa bb")
sol4 = solve([aa + bb + 1 - 2, 2 * aa + bb + 2], [aa, bb])
f1 = -3 * x ** 2 + 4 * x + 1
fi = -2 * x ** 2 + 3 * x + 1
v.ok(sol4 == {aa: -3, bb: 4} and solve(diff(f1, x), x) == [R(2, 3)] and f1.subs(x, R(2, 3)) == R(7, 3) and diff(f1, x, 2) == -6
     and integrate(fi, (x, -1, 1)) == R(2, 3) and integrate(2 / x, (x, 1, 3)) == 2 * log(3) and abs(float(R(2, 3) + 2 * log(3)) - 2.864) < 5e-4, "2022-ord-sup ej.4")
v.solucion(s, "4", "a=-3", "b=4", "f\\left(\\frac{2}{3}\\right)=\\frac{7}{3}", "\\frac{2}{3}+2\\ln3")

import itertools as it
pares = list(it.product(range(1, 7), repeat=2))
w1 = sum(1 for p in pares if p[0] + p[1] == 2 or p[0] + p[1] > 7)
w2 = sum(1 for p in pares if p[0] + p[1] > 9)
v.ok(w1 == 16 and w2 == 6 and R(w1, 36) == R(4, 9) and (1 - R(4, 9)) * R(6, 36) == R(5, 54) and R(4, 9) + R(5, 54) == R(29, 54) and cerca(R(5, 54), 0.0926) and cerca(R(29, 54), 0.5370), "2022-ord-sup ej.5")
v.solucion(s, "5", "\\frac{16}{36}=\\frac{4}{9}", "\\frac{5}{54}", "\\approx0{,}0926", "\\frac{29}{54}", "\\approx0{,}5370")

pO, pT, pOT = R(6, 10), R(5, 10), R(2, 10)
pU = pO + pT - pOT
v.ok(pU == R(9, 10) and (1 - pU) / (1 - pO) == R(1, 4) and pO - pOT == R(4, 10) and pOT != 0 and pO * pT == R(3, 10) != pOT, "2022-ord-sup ej.6")
v.solucion(s, "6", "P(O\\cup T)=0{,}9", "P(T^C\\mid O^C)=0{,}25", "P(O\\cap T^C)=0{,}4", "P(O)P(T)=0{,}3")

E7, lo7, hi7 = ic_prop(R(7, 10), 540, R(217, 100))
n7 = R(217, 100) ** 2 * R(7, 10) * R(3, 10) / R(3, 100) ** 2
v.ok(R(378, 540) == R(7, 10) and cerca(E7, 0.0428) and cerca(lo7, 0.6572) and cerca(hi7, 0.7428) and cerca(n7, 1098.74, 5e-3) and int(n7) + 1 == 1099, "2022-ord-sup ej.7")
v.solucion(s, "7", "E=0{,}0428", "(0{,}6572,0{,}7428)", "1\\,098{,}74", "n=1\\,099")

d = [980, 1002, 950, 985, 1100, 1085, 895, 1000, 912, 1006]
m8 = R(sum(d), 10)
E8 = R(217, 100) * 11 / sqrt(10)
n8 = (R(188, 100) * 11 / 5) ** 2
v.ok(sum(d) == 9915 and m8 == R(1983, 2) and cerca(E8, 7.548, 5e-4) and cerca(m8 - E8, 983.95, 5e-3) and cerca(m8 + E8, 999.05, 5e-3) and cerca(n8, 17.11, 5e-3) and int(n8) + 1 == 18, "2022-ord-sup ej.8")
v.solucion(s, "8", "\\bar x=\\frac{9\\,915}{10}=991{,}5", "E=7{,}548", "(983{,}95,999{,}05)", "17{,}11", "n=18")

v.fin()
