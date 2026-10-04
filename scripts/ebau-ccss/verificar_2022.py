#!/usr/bin/env python3
"""Verifica las soluciones PAU CCSS de 2022 (data/2022-*.md, soluciones/2022-*.md). Ver _verif.py.

Uso:  python scripts/ebau-ccss/verificar_2022.py     (requiere `pip install sympy`)
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _verif import Verificador, R, Matrix, tx, dec, mat, vertices  # noqa: E402
from sympy import symbols, solve, diff, integrate, sqrt, log, exp, simplify, eye, factor, expand, limit, oo  # noqa: E402

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

# ======================= 2022-ext =======================
s = "2022-ext"
A = Matrix([[1, 1, 2], [-2, 0, 1], [0, -1, -1]])
B = Matrix([[-2, 1], [3, 1], [0, 2]])
C = Matrix([[1, 2], [-1, -1], [-2, 3]])
X = A.inv() * (A ** 2 * C - B)
v.ok(A.det() == 3 and A * X + B == A ** 2 * C, "2022-ext ej.1a")
v.ok((A.shape, C.shape, B.shape) == ((3, 3), (3, 2), (3, 2)) and (3, 3)[1] == 3, "2022-ext ej.1b")
v.solucion(s, "1", "|A|=3", mat(A ** 2), mat(A ** 2 * C), mat(A ** 2 * C - B), mat(A.inv()), mat(X), "P$ es $2\\times3")

V = vertices([(-2, 1, 7, "<="), (-1, 3, 21, "<="), (1, 2, 19, "<="), (1, 1, 14, "<="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
Fv = {q: q[0] + 4 * q[1] for q in V}
v.ok(V == [(0, 0), (0, 7), (3, 8), (9, 5), (14, 0)] and max(Fv.values()) == Fv[(3, 8)] == 35 and min(Fv.values()) == Fv[(0, 0)] == 0 and 4 + 16 == 20, "2022-ext ej.2")
v.solucion(s, "2", "(0,0)", "(0,7)", "(3,8)", "(9,5)", "(14,0)", "F(3,8)=35", "F(0,0)=0", "F(9,5)=29", "4+16=20")

b_, c_ = symbols("b c")
f = x ** 3 + b_ * x ** 2 + c_ * x - 1
sol = solve([diff(f, x).subs(x, R(1, 3)), f.subs(x, -2) + 3], [b_, c_])
g = -x ** 3 - x ** 2 + x + 1
v.ok(sol == {b_: 1, c_: -1} and expand(g + (x - 1) * (x + 1) ** 2) == 0 and sorted(solve(diff(g, x), x)) == [-1, R(1, 3)] and g.subs(x, R(1, 3)) == R(32, 27) and integrate(g, (x, -1, 1)) == R(4, 3), "2022-ext ej.3")
v.solucion(s, "3", "b=1", "c=-1", "\\left(\\frac{1}{3},\\frac{32}{27}\\right)", "A=\\frac{4}{3}")

Bx = -R(2, 100) * x ** 2 + R(13, 10) * x - 15
v.ok(sorted(solve(Bx, x)) == [15, 50] and solve(diff(Bx, x), x) == [R(65, 2)] and Bx.subs(x, R(65, 2)) == R(49, 8) and sorted(solve(Bx - 5, x)) == [25, 40], "2022-ext ej.4")
v.solucion(s, "4", "(15,0)", "(50,0)", "B(32{,}5)=6{,}125", "x=\\frac{65\\pm15}{2}")

pN = R(6, 10) * R(4, 10) + R(3, 10) * R(5, 10)
pNC = (R(395, 1000) - pN) / R(1, 10)
v.ok(pNC == R(5, 100) and 1 - pNC == R(95, 100) and (pN) / R(395, 1000) == R(78, 79) and cerca(R(78, 79), 0.9873), "2022-ext ej.5")
v.solucion(s, "5", "P(N\\mid C)=0{,}05", "\\frac{78}{79}", "\\approx0{,}9873")

pA, pB, pU = 1 - R(5, 7), 1 - R(2, 3), R(3, 7)
pAB = pA + pB - pU
v.ok(pA == R(2, 7) and pB == R(1, 3) and pAB == R(4, 21) and pA * pB == R(2, 21) and 1 - pU == R(4, 7) and (pB - pAB) / (1 - pA) == R(1, 5), "2022-ext ej.6")
v.solucion(s, "6", "P(A\\cap B)=\\frac{4}{21}", "P(A)P(B)=\\frac{2}{21}", "P(A^C\\cap B^C)=\\frac{4}{7}", "P(B\\mid A^C)=\\frac{1}{5}")

E7, lo7, hi7 = ic_prop(R(95, 100), 1500, R(217, 100))
n7 = R(217, 100) ** 2 * R(95, 100) * R(5, 100) / R(1, 100) ** 2
v.ok(cerca(E7, 0.0122) and cerca(lo7, 0.9378) and cerca(hi7, 0.9622) and cerca(n7, 2236.73, 5e-3) and int(n7) + 1 == 2237, "2022-ext ej.7")
v.solucion(s, "7", "E=0{,}0122", "(0{,}9378,0{,}9622)", "2\\,236{,}73", "n=2\\,237")

E8 = R(217, 100) * 3 / 10
n8 = (R(175, 100) * 3) ** 2
v.ok(E8 == R(651, 1000) and 8.1 - float(E8) == 7.449 and 8.1 + float(E8) == 8.751 and n8 == R(275625, 10000) and int(n8) + 1 == 28 and R(3, 6) == R(1, 2) and (8 - R(761, 100)) / R(1, 2) == R(78, 100), "2022-ext ej.8")
v.solucion(s, "8", "E=0{,}651", "(7{,}449,8{,}751)", "27{,}5625", "n=28", "N(7{,}61,0{,}5)", "P(\\bar X>8)=0{,}2177")

# ======================= 2022-ext-res =======================
s = "2022-ext-res"
A = Matrix([[2, -3, -a - 1], [-1, a, a + 1], [1, -3, -a]])
A4 = A.subs(a, 4)
A3 = A.subs(a, 3)
v.ok(expand(A.det() + a * (a - 4)) == 0 and A4 ** 2 == A4 and A4 ** 3 == A4 and A4 ** 2022 == A4 and A3.det() == 3 and A3.inv() * A3 == eye(3), "2022-ext-res ej.1")
v.solucion(s, "1", "|A|=-a(a-4)", mat(A4), "A^2=A^3=A^{2022}=A", "|A|=3", mat(A3.inv()))

V = vertices([(1, 2, 70, "<="), (3, 2, 150, "<="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
Bn = {q: 60 * q[0] + 70 * q[1] for q in V}
v.ok(V == [(0, 0), (0, 35), (40, 15), (50, 0)] and max(Bn.values()) == Bn[(40, 15)] == 3450, "2022-ext-res ej.2")
v.solucion(s, "2", "(0,0)", "(0,35)", "(40,15)", "(50,0)", "3\\,450")

aa, bb = symbols("aa bb")
sol = solve([4 * aa - bb / 2 - 2, 4 * aa - bb], [aa, bb])
v.ok(sol == {aa: 1, bb: 4} and integrate((x + 1) ** 2, (x, -2, 1)) == 3 and (1 + 1) ** 2 == 4 and 2 ** 2 / 1 - 1 == 3, "2022-ext-res ej.3")
v.solucion(s, "3", "a=1", "b=4", "A=3")

fx = (x - 3) / (x + 2)
v.ok(simplify(diff(fx, x) - 5 / (x + 2) ** 2) == 0 and simplify(diff(fx, x, 2) + 10 / (x + 2) ** 3) == 0 and fx.subs(x, 0) == R(-3, 2) and fx.subs(x, 3) == 0 and fx.subs(x, -3) == 6
     and limit(fx, x, oo) == 1 and limit(fx, x, -2, "+") == -oo and limit(fx, x, -2, "-") == oo, "2022-ext-res ej.4")
v.solucion(s, "4", "f'(x)=\\frac{5}{(x+2)^2}", "f''(x)=-\\frac{10}{(x+2)^3}", "(3,0)", "\\left(0,-\\frac{3}{2}\\right)", "f(-3)=6")

pTM = R(8, 10) + R(5, 10) - R(9, 10)
v.ok(1 - R(1, 10) == R(9, 10) and pTM == R(4, 10) and pTM / R(8, 10) == R(1, 2) and R(8, 10) * R(5, 10) == pTM, "2022-ext-res ej.5")
v.solucion(s, "5", "P(T\\cup M)=0{,}9", "P(T\\cap M)=0{,}8+0{,}5-0{,}9=0{,}4", "P(M\\mid T)=0{,}5", "P(T)\\cdot P(M)=0{,}4")

pB, pC = R(94, 1335), R(169, 1335)
pA_ = R(95, 100) - pB - pC
v.ok(1335 - 1054 - 99 == 182 and pA_ / R(95, 100) == R(4021, 5073) and cerca(R(4021, 5073), 0.7926) and cerca(pB / R(95, 100), 0.0741) and cerca(pC / R(95, 100), 0.1333) and pA_ == R(4021, 5340), "2022-ext-res ej.6")
v.solucion(s, "6", "182", "P(A\\mid NP)=\\frac{4021}{5073}", "\\approx0{,}7926", "\\approx0{,}0741", "\\approx0{,}1333")

import itertools as it
medias = [R(i + j, 2) for i, j in it.product([1, 4, 7], repeat=2)]
mu = sum(medias) / 9
var = sum((m - mu) ** 2 for m in medias) / 9
v.ok(60000 + 20000 + 24000 + 16000 == 120000 and R(144, 24000) * 120000 == 720 and [R(144, 24000) * q for q in (60000, 20000, 24000, 16000)] == [360, 120, 144, 96]
     and mu == 4 and var == 3 and cerca(sqrt(var), 1.7321), "2022-ext-res ej.7")
v.solucion(s, "7", "0{,}006\\cdot120\\,000=720", "0{,}006\\cdot60\\,000=360", "0{,}006\\cdot20\\,000=120", "0{,}006\\cdot16\\,000=96", "\\mu_{\\bar x}=4", "\\sigma_{\\bar x}^2=3", "\\approx1{,}7321")

E8, lo8, hi8 = ic_prop(R(3, 10), 2100, R(224, 100))
n8 = R(224, 100) ** 2 * R(3, 10) * R(7, 10) / R(1, 100) ** 2
v.ok(R(630, 2100) == R(3, 10) and E8 == R(224, 10000) and lo8 == R(2776, 10000) and hi8 == R(3224, 10000) and n8 == R(1053696, 100) and int(n8) + 1 == 10537, "2022-ext-res ej.8")
v.solucion(s, "8", "E=0{,}0224", "(0{,}2776,0{,}3224)", "10\\,536{,}96", "n=10\\,537")

# ======================= 2022-ext-sup =======================
s = "2022-ext-sup"
V = vertices([(1, 2, 7, ">="), (2, -1, 4, "<="), (4, -1, 1, ">="), (3, 2, 20, "<=")])
Fv = {q: q[0] + 3 * q[1] for q in V}
v.ok(V == [(1, 3), (2, 7), (3, 2), (4, 4)] and max(Fv.values()) == Fv[(2, 7)] == 23 and Fv[(1, 3)] == 10 and Fv[(3, 2)] == 9 and Fv[(4, 4)] == 16, "2022-ext-sup ej.1")
v.solucion(s, "1", "(1,3)", "(2,7)", "(3,2)", "(4,4)", "F(1,3)=10", "F(3,2)=9", "F(4,4)=16")

A = Matrix([[a, 2, 0], [8, a, 0], [0, 0, a]])
A5 = A.subs(a, 5)
X = A5.inv() * Matrix([1, -2, 10])
v.ok(expand(A.det() - a * (a - 4) * (a + 4)) == 0 and sorted(solve(A.det(), a)) == [-4, 0, 4] and A5.det() == 45 and X == Matrix([1, -2, 2]), "2022-ext-sup ej.2")
v.solucion(s, "2", "|A|=a\\left(a^2-16\\right)", "a=0", "a=4", "a=-4", mat(A5.inv()), mat(X))

Bx = (x ** 3 - x) - (x ** 3 - x ** 2 + 6)
v.ok(expand(Bx - (x ** 2 - x - 6)) == 0 and sorted(solve(Bx, x)) == [-2, 3] and solve(diff(Bx, x), x) == [R(1, 2)] and Bx.subs(x, R(1, 2)) == R(-25, 4) and Bx.subs(x, 0) == -6 and Bx.subs(x, 8) == 50, "2022-ext-sup ej.3")
v.solucion(s, "3", "B(x)=x^2-x-6", "B\\left(\\frac{1}{2}\\right)=\\frac{1}{4}-\\frac{1}{2}-6=-\\frac{25}{4}", "B(8)=64-8-6=50")

aa, bb = symbols("aa bb")
sol = solve([aa + bb + 2 - 2, 2 * aa + bb + 1], [aa, bb])
f1 = -x ** 2 + x + 2
v.ok(sol == {aa: -1, bb: 1} and diff(4 / (x + 1), x).subs(x, 1) == -1 and f1.subs(x, 1) == 2 and sorted(solve(f1, x)) == [-1, 2] and integrate(f1, (x, -1, 1)) == R(10, 3), "2022-ext-sup ej.4")
v.solucion(s, "4", "a=-1", "b=1", "A=\\frac{10}{3}")

pI = 1 - R(6, 10)
pD = R(8, 10) - pI + R(35, 100)
v.ok(pI == R(4, 10) and pD == R(75, 100) and pD - R(35, 100) == R(4, 10) and pI - R(35, 100) == R(5, 100) and R(4, 10) + R(5, 100) == R(45, 100) and 1 - R(8, 10) == R(2, 10) and pD * pI == R(3, 10) != R(35, 100), "2022-ext-sup ej.5")
v.solucion(s, "5", "P(D)=0{,}75", "P(D\\cap I^C)=0{,}4", "P(I\\cap D^C)=0{,}05", "P(\\text{solo una})=0{,}45", "P(D^C\\cap I^C)=0{,}2", "P(D)P(I)=0{,}3")

pE = R(48, 100) * R(7, 10) + R(35, 100) * R(95, 100) + R(17, 100) * R(94, 100)
v.ok(R(48, 100) * R(3, 10) == R(144, 1000) and pE == R(8283, 10000) and R(17, 100) * R(6, 100) / (1 - pE) == R(6, 101) and cerca(R(6, 101), 0.0594), "2022-ext-sup ej.6")
v.solucion(s, "6", "P(A\\cap E^C)=0{,}144", "P(E)=0{,}8283", "P(C\\mid E^C)=\\frac{6}{101}", "\\approx0{,}0594")

E7, lo7, hi7 = ic_prop(R(36, 100), 100, R(175, 100))
n7 = R(175, 100) ** 2 * R(36, 100) * R(64, 100) / R(25, 1000) ** 2
v.ok(E7 == R(84, 1000) and lo7 == R(276, 1000) and hi7 == R(444, 1000) and n7 == R(28224, 25) and int(n7) + 1 == 1129, "2022-ext-sup ej.7")
v.solucion(s, "7", "E=0{,}084", "(0{,}276,0{,}444)", "1\\,128{,}96", "n=1\\,129")

d = [R(q) for q in "30.6 30 31.3 29.7 32.3 32 32.8 31.5 31.2 30.5".split()]
m8 = sum(d) / 10
E8 = R(217, 100) * R(31, 10) / sqrt(10)
n8 = (R(217, 100) * R(31, 10) / R(15, 100)) ** 2
v.ok(sqrt(R(961, 100)) == R(31, 10) and sum(d) == R(3119, 10) and m8 == R(3119, 100) and cerca(E8, 2.1273) and cerca(m8 - E8, 29.0627) and cerca(m8 + E8, 33.3173) and cerca(n8, 2011.22, 5e-3) and int(n8) + 1 == 2012, "2022-ext-sup ej.8")
v.solucion(s, "8", "\\bar x=31{,}19", "E=2{,}1273", "(29{,}0627,33{,}3173)", "2\\,011{,}22", "n=2\\,012")

v.fin()
