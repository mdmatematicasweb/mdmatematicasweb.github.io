#!/usr/bin/env python3
"""Verifica las soluciones PAU CCSS de 2025 (data/2025-*.md, soluciones/2025-*.md). Ver _verif.py.

Uso:  python scripts/ebau-ccss/verificar_2025.py     (requiere `pip install sympy`)
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _verif import Verificador, R, Matrix, tx, dec, mat, vertices  # noqa: E402
from sympy import symbols, solve, diff, integrate, sqrt, log, exp, simplify, eye, factor, expand, limit, oo, binomial  # noqa: E402

v = Verificador(2025)
x, y, a, b, c, t = symbols("x y a b c t")


def ic_prop(p, n, z):
    E = z * sqrt(p * (1 - p) / n)
    return E, p - E, p + E


def cerca(val, objetivo, tol=5e-5):
    return abs(float(val) - objetivo) < tol


# ======================= 2025-ord-a =======================
s = "2025-ord-a"
T = Matrix([[40, 10, 5], [80, 15, 8], [100, 25, 10]])
P = Matrix([75, 300, 250])
bruto = T * P
neto = [bruto[0] * R(85, 100), bruto[1] * R(82, 100), bruto[2] * R(82, 100)]
Am = Matrix([[-2, 2, 1], [3, a - 1, 2], [4, 0, 3]])
v.ok(bruto == Matrix([7250, 12500, 17500]) and neto == [R(12325, 2), 10250, 14350] and bruto[0] < 10000 <= bruto[1] and expand(Am.det() + 2 * (5 * a - 4)) == 0 and solve(Am.det(), a) == [R(4, 5)], "2025-ord-a ej.1")
v.solucion(s, "1", mat(T), mat(bruto), "0{,}85\\cdot7\\,250", "6\\,162{,}5", "10\\,250", "14\\,350", "|A|=-10a+8", "a\\neq\\frac{4}{5}")

Nt = 500000 * (1 - exp(-R(2, 10) * t))
v.ok(simplify(diff(Nt, t) - 100000 * exp(-t / 5)) == 0 and simplify(diff(Nt, t, 2) + 20000 * exp(-t / 5)) == 0 and limit(Nt, t, oo) == 500000 and simplify(solve(Nt - 450000, t)[0] - 5 * log(10)) == 0 and cerca(5 * log(10), 11.51, 5e-3)
     and cerca(diff(Nt, t).subs(t, 1), 81873, 1) and cerca(diff(Nt, t).subs(t, 10), 13534, 1), "2025-ord-a ej.2")
v.solucion(s, "2", "N'(t)=100\\,000\\,e^{-0{,}2t}", "N''(t)=-20\\,000\\,e^{-0{,}2t}", "y=500\\,000", "t=\\frac{\\ln10}{0{,}2}", "\\approx81\\,873", "\\approx13\\,534")

f1 = R(5, 6) * (t ** 3 / 3 - 12 * t ** 2 + 108 * t + 108)
f2 = t ** 2 - 40 * t + 546
v.ok(f1.subs(t, 12) == f2.subs(t, 12) == 210 and expand(diff(f1, t) - R(5, 6) * (t - 6) * (t - 18)) == 0 and [f1.subs(t, 0), f1.subs(t, 6), f2.subs(t, 20), f2.subs(t, 24)] == [90, 330, 146, 162] and sorted(solve(f2 - 155, t)) == [17, 23], "2025-ord-a ej.3")
v.solucion(s, "3", "f(0)=90", "f(6)=330", "f(20)=146", "f(24)=162", "t=\\frac{40\\pm6}{2}")

pT = R(1, 3) * (R(1, 7) + R(1, 8) + R(1, 5))
v.ok(pT == R(131, 840) and 1 - pT == R(709, 840) and R(1, 15) == R(1, 3) * R(1, 5) and (R(1, 21) + R(1, 15)) / pT == R(96, 131) and 1 - (R(1, 3) * R(6, 7)) / (1 - pT) == R(469, 709) and cerca(R(709, 840), 0.8440) and cerca(R(96, 131), 0.7328) and cerca(R(469, 709), 0.6615), "2025-ord-a ej.4")
v.solucion(s, "4", "P(T)=\\frac{131}{840}", "\\frac{709}{840}", "\\frac{1}{15}", "\\frac{96}{131}", "\\frac{240}{709}", "\\frac{469}{709}")

p10 = binomial(20, 10) * R(1, 5) ** 10 * R(4, 5) ** 10
p2 = 1 - R(4, 5) ** 20 - 20 * R(1, 5) * R(4, 5) ** 19
v.ok(binomial(20, 10) == 184756 and cerca(p10, 0.0020, 5e-5) and cerca(p2, 0.9308, 5e-5) and 20 * R(2, 10) == 4 and R(13) / R(2, 10) == 65 and cerca(R(4, 5) ** 20, 0.0115, 5e-5) and cerca(20 * R(1, 5) * R(4, 5) ** 19, 0.0576, 5e-5), "2025-ord-a ej.5")
v.solucion(s, "5", "184\\,756", "0{,}8^{20}", "E(X)=np=20\\cdot0{,}2=4", "n\\ge65")

v.ok(R(10794 + 13206, 2000) == 12 and R(13206 - 10794, 2000) == R(1206, 1000) and cerca(R(217, 100) * 5 / 9, 1.2056, 5e-4) and R(217, 100) * 5 / R(18, 10) == R(1085, 100) / R(18, 10) and (R(1085, 100) / R(18, 10)) ** 2 == R(47089, 1296) and int((R(1085, 100) / R(18, 10)) ** 2) == 36, "2025-ord-a ej.6")
v.solucion(s, "6", "\\bar x=12", "E=1{,}206", "n\\le36{,}33", "n=36")

E7 = R(205, 100) * R(22, 10) / sqrt(15)
n7 = (R(233, 100) * R(22, 10) / R(11, 10)) ** 2
d = [R(q) for q in "0 1.3 -2.1 -1.5 2 0.8 5 2.1 -3 1.8 3.1 4 -0.7 1.6 -5.4".split()]
v.ok(2 * R(6736, 10000) - 1 == R(3472, 10000) and sum(d) == 9 and R(sum(d), 15) == R(3, 5) and cerca(E7, 1.1645, 5e-4) and cerca(R(3, 5) - E7, -0.5645, 5e-4) and cerca(R(3, 5) + E7, 1.7645, 5e-4) and 2 > R(3, 5) + E7 and cerca(n7, 21.72, 5e-3) and int(n7) + 1 == 22, "2025-ord-a ej.7")
v.solucion(s, "7", "2\\cdot0{,}6736-1=0{,}3472", "\\bar x=\\frac{9}{15}=0{,}6", "E=1{,}1645", "(-0{,}5645,1{,}7645)", "21{,}72", "n=22")

# ======================= 2025-ord-b =======================
s = "2025-ord-b"
M = Matrix([[2, 1, 3], [1, 3, 2], [3, 2, 1]])
sol = M.inv() * Matrix([2960, 2990, 2870])
v.ok(M.det() == -18 and sol == Matrix([450, 500, 520]) and 2 * 450 + 500 + 3 * 520 == 2960 and Matrix([[1, 1], [0, -1]]) ** 2 == eye(2) and eye(2) * Matrix([4, 1]) / 2 == Matrix([2, R(1, 2)]), "2025-ord-b ej.1")
v.solucion(s, "1", mat(M), "|M|=-18", mat(sol), "900+500+1\\,560=2\\,960", mat(Matrix([2, R(1, 2)])))

V = vertices([(1, R(-1, 2), 0, ">="), (1, 0, 1500, "<="), (1, 1, 900, ">="), (1, 1, 2400, "<="), (0, 1, 0, ">=")])
Wv = {q: 15 * q[0] + 18 * q[1] for q in V}
v.ok(V == [(300, 600), (800, 1600), (900, 0), (1500, 0), (1500, 900)] and min(Wv.values()) == Wv[(900, 0)] == 13500 and Wv[(300, 600)] == 15300 and Wv[(800, 1600)] == 40800 and Wv[(1500, 900)] == 38700 and Wv[(1500, 0)] == 22500, "2025-ord-b ej.2")
v.solucion(s, "2", "(300,600)", "(800,1600)", "(1500,900)", "(1500,0)", "(900,0)", "13\\,500", "15\\,300")

ff = 5000 * R(105, 100) ** t
tt = log(R(593110, 500000)) / log(R(105, 100))
v.ok(cerca(tt, 3.5, 5e-3) and 5000 * R(105, 100) == 5250 < R(593110, 100) and cerca(ff.subs(t, 4) - ff.subs(t, 2), 565.03, 5e-3) and cerca(ff.subs(t, 4), 6077.53, 5e-3) and ff.subs(t, 2) == R(551250, 100)
     and 5000 * R(5, 100) == 250 and cerca(diff(ff, t).subs(t, 1), 256.15, 5e-3) and 250 != diff(ff, t).subs(t, 1), "2025-ord-b ej.3")
v.solucion(s, "3", "t\\approx3{,}5", "6\\,077{,}53-5\\,512{,}50=565{,}03", "f'(1^-)=250", "\\approx256{,}15")

pH, pM, pHM = R(5, 10), R(7, 10), R(3, 10)
v.ok((pH - pHM) + (pM - pHM) == R(6, 10) and 1 - pHM == R(7, 10) and (pH - pHM) / (1 - pM) == R(2, 3) and pH * pM == R(35, 100) != pHM and cerca(R(2, 3), 0.6667), "2025-ord-b ej.4")
v.solucion(s, "4", "0{,}2+0{,}4=0{,}6", "1-P(H\\cap M)=1-0{,}3=0{,}7", "P(H\\mid M^C)=\\frac{2}{3}", "\\approx0{,}6667", "P(H)P(M)=0{,}35")

pE = R(4, 9) * R(35, 100) + R(3, 9) * R(6, 10) + R(2, 9)
v.ok(pE == R(26, 45) and R(2, 9) / pE == R(5, 13) and pE - R(1, 3) * R(6, 10) == R(17, 45) and cerca(pE, 0.5778) and cerca(R(5, 13), 0.3846) and cerca(R(17, 45), 0.3778), "2025-ord-b ej.5")
v.solucion(s, "5", "P(E)=\\frac{26}{45}", "\\approx0{,}5778", "P(C\\mid E)=\\frac{5}{13}", "\\approx0{,}3846", "\\frac{17}{45}", "\\approx0{,}3778")

p6 = R(5616 + 7184, 20000)
E6 = R(7184 - 5616, 20000)
n6 = R(196, 100) ** 2 * p6 * (1 - p6) / E6 ** 2
v.ok(p6 == R(64, 100) and E6 == R(784, 10000) and n6 == 144, "2025-ord-b ej.6")
v.solucion(s, "6", "\\hat p=0{,}64", "E=0{,}0784", "n=144")

v.ok(R(15, 10) / 5 == R(3, 10) and (10 - R(105, 10)) / R(3, 10) == R(-5, 3) and cerca(R(5, 3), 1.6667, 5e-5) and R(9525, 10000) == R(9525, 10000) and (8 - R(105, 10)) / R(3, 10) < -8, "2025-ord-b ej.7")
v.solucion(s, "7", "N(10{,}5,0{,}3)", "P(\\bar X>10)=0{,}9525", "P(-8{,}33<Z<1{,}67)")


# ======================= 2025-ord-sup1-a =======================
s = "2025-ord-sup1-a"
A = Matrix([[2, 1, 0], [0, 1, 2], [2, 2, 2]])
I3 = eye(3)
X = (A + 2 * I3).inv() * A
Y = X - I3
v.ok((A + 2 * I3).det() == 36 and (A + I3) * X + Y == A - I3 and X - Y == I3 and (A + I3).det() == 10 and (A + I3).rank() == 3 and (A - I3).det() == 0 and (A - I3).rank() == 2, "2025-ord-sup1-a ej.1")
v.solucion(s, "1", "(A+2I_3)X=A", "|A+2I_3|=36", mat((A + 2 * I3).inv()), mat(X), mat(Y), "|A+I_3|=10", "|A-I_3|=0")

V = vertices([(2, 3, 58, "<="), (2, 1, 50, "<="), (1, 4, 60, "<="), (1, 0, 0, ">="), (0, 1, 0, ">=")])
Bv = {q: R(21, 2) * q[0] + R(11, 2) * q[1] for q in V}
v.ok(V == [(0, 0), (0, 15), (R(52, 5), R(62, 5)), (23, 4), (25, 0)] and max(Bv.values()) == Bv[(23, 4)] == R(527, 2) and Bv[(25, 0)] == R(525, 2) and Bv[(R(52, 5), R(62, 5))] == R(887, 5) and 23 + 16 <= 60, "2025-ord-sup1-a ej.2")
v.solucion(s, "2", "(0,0)", "(0,15)", "\\left(\\frac{52}{5},\\frac{62}{5}\\right)", "(23,4)", "(25,0)", "263{,}5", "262{,}5", "177{,}4")

fa = x ** 2 - 2
v.ok(fa.subs(x, -1) == -1 and fa.subs(x, 2) == 2 and sorted(solve(-x + 3 - (-x ** 2 + 5), x)) == [-1, 2] and integrate(-x ** 2 + x + 2, (x, -1, 2)) == R(9, 2), "2025-ord-sup1-a ej.3")
v.solucion(s, "3", "a=-1", "b=2", "(-1,4)", "(2,1)", "A=\\frac{9}{2}")

aa, bb = symbols("aa bb")
f1, f2 = -t ** 2 + 2 * t + 10, t ** 2 + aa * t + bb
sol = solve([diff(f1, t).subs(t, R(5, 2)) - diff(f2, t).subs(t, R(5, 2)), f1.subs(t, R(5, 2)) - f2.subs(t, R(5, 2))], [aa, bb])
g2 = t ** 2 - 8 * t + R(45, 2)
v.ok(f1.subs(t, 0) == 10 and sol == {aa: -8, bb: R(45, 2)} and f1.subs(t, 1) == 11 and g2.subs(t, 4) == R(13, 2) and g2.subs(t, 5) == R(15, 2) and f1.subs(t, R(5, 2)) == R(35, 4), "2025-ord-sup1-a ej.4")
v.solucion(s, "4", "f(0)=10", "a=-8", "b=22{,}5", "f(1)=11", "f(4)=6{,}5")

pR = R(62, 100) * R(7, 10) + R(25, 100) * R(75, 100) + R(13, 100) * R(15, 100)
v.ok(1 - R(62, 100) - R(25, 100) == R(13, 100) and pR == R(641, 1000) and R(25, 100) * R(25, 100) / (1 - pR) == R(125, 718) and R(62, 100) * R(7, 10) * R(55, 100) == R(2387, 10000) and cerca(R(125, 718), 0.1741), "2025-ord-sup1-a ej.5")
v.solucion(s, "5", "P(R)=0{,}641", "P(T\\mid R^C)=\\frac{125}{718}", "\\approx0{,}1741", "0{,}62\\cdot0{,}7\\cdot0{,}55=0{,}2387")

E6 = R(217, 100) * R(42, 10) / sqrt(30)
n6 = (R(196, 100) * R(42, 10) / R(6, 10)) ** 2
v.ok(cerca(E6, 1.664, 5e-4) and cerca(R(113, 10) - E6, 9.636, 5e-4) and cerca(R(113, 10) + E6, 12.964, 5e-4) and R(98, 10) > R(113, 10) - E6 and cerca(n6, 188.24, 5e-3) and int(n6) + 1 == 189, "2025-ord-sup1-a ej.6")
v.solucion(s, "6", "E=1{,}664", "(9{,}636,12{,}964)", "188{,}24", "n=189")

E7, lo7, hi7 = ic_prop(R(65, 100), 200, R(211, 100))
n7 = R(2575, 1000) ** 2 * R(65, 100) * R(35, 100) / R(2, 100) ** 2
v.ok(cerca(E7, 0.0712) and cerca(lo7, 0.5788) and cerca(hi7, 0.7212) and cerca(n7, 3771.17, 5e-3) and int(n7) + 1 == 3772, "2025-ord-sup1-a ej.7")
v.solucion(s, "7", "E=0{,}0712", "(0{,}5788,0{,}7212)", "z_{\\alpha/2}=2{,}575", "3\\,771{,}17", "n=3\\,772")


# ======================= 2025-ord-sup1-b =======================
s = "2025-ord-sup1-b"
A_, B_, C_, T_ = symbols("A_ B_ C_ T_")
sol = solve([A_ - T_ / 3, A_ + B_ - C_ - 6, C_ - B_ - 4, A_ + B_ + C_ - T_], [A_, B_, C_, T_])
v.ok(sol == {A_: 10, B_: 8, C_: 12, T_: 30} and 30 * 25 == 750 and 750 * R(236, 1000) == 177 and 750 * R(1236, 1000) == 927, "2025-ord-sup1-b ej.1")
v.solucion(s, "1", "a=10", "b=8", "c=12", "177", "750\\cdot1{,}236=927")

V = vertices([(3, 2, 150, "<="), (R(7, 2), 4, 210, "<="), (1, 0, 12, ">="), (0, 1, 15, ">=")])
Iv = {q: R(79, 4) * q[0] + R(37, 2) * q[1] for q in V}
v.ok(V == [(12, 15), (12, 42), (36, 21), (40, 15)] and max(Iv.values()) == Iv[(36, 21)] == R(2199, 2) and Iv[(12, 15)] == R(1029, 2) and Iv[(12, 42)] == 1014 and Iv[(40, 15)] == R(2135, 2), "2025-ord-sup1-b ej.2")
v.solucion(s, "2", "(12,15)", "(12,42)", "(36,21)", "(40,15)", "1\\,099{,}5", "514{,}5", "1\\,067{,}5")

Bt = 3 * t / (t + 2) - 1
v.ok(simplify(Bt - (2 * t - 2) / (t + 2)) == 0 and Bt.subs(t, 1) == 0 and Bt.subs(t, R(1, 2)) < 0 and simplify(diff(Bt, t) - 6 / (t + 2) ** 2) == 0 and Bt.subs(t, 10) == R(3, 2) and solve(Bt - R(8, 10), t) == [3] and limit(Bt, t, oo) == 2, "2025-ord-sup1-b ej.3")
v.solucion(s, "3", "B'(t)=\\frac{6}{(t+2)^2}", "B(10)=\\frac{30}{12}-1=\\frac{3}{2}", "t=3", "3-1=2")

Vt = 4 * t ** 3 - 24 * t ** 2 + 36 * t + 100
v.ok(expand(diff(Vt, t) - 12 * (t - 1) * (t - 3)) == 0 and [Vt.subs(t, k) for k in (0, 1, 3, 6)] == [100, 116, 100, 316] and integrate(Vt, (t, 0, 6)) == 816, "2025-ord-sup1-b ej.4")
v.solucion(s, "4", "V'(t)=12(t-1)(t-3)", "V(1)=116", "V(6)=316", "1\\,296-1\\,728+648+600=816")

pO, pI, pD = 1 - R(20, 100) - R(35, 100), R(35, 100), R(20, 100)
hombres = {"O": pO * R(8, 10), "I": pI * R(6, 10), "D": pD * R(7, 10)}
v.ok(pO == R(45, 100) and pI * R(4, 10) + pD * R(3, 10) == R(20, 100) and R(20, 100) / (1 - pO) == R(4, 11) and sum(hombres.values()) == R(71, 100) and max(hombres.values()) == hombres["O"] == R(36, 100) and cerca(hombres["O"] / R(71, 100), 0.507, 5e-4) and cerca(R(4, 11), 0.3636), "2025-ord-sup1-b ej.5")
v.solucion(s, "5", "0{,}14+0{,}06=0{,}2", "\\frac{4}{11}", "\\approx0{,}3636", "P(H)=0{,}71", "\\approx0{,}507")

E6 = R(2575, 1000) / sqrt(30)
n6 = (R(2575, 1000) / R(3, 10)) ** 2
v.ok(R(24045, 10) / 30 == R(8015, 100) and cerca(E6, 0.4701, 5e-4) and cerca(R(8015, 100) - E6, 79.6799, 5e-4) and cerca(R(8015, 100) + E6, 80.6201, 5e-4) and cerca(n6, 73.67, 5e-3) and int(n6) + 1 == 74, "2025-ord-sup1-b ej.6")
v.solucion(s, "6", "\\bar x=80{,}15", "E=0{,}4701", "(79{,}6799,80{,}6201)", "73{,}67", "n=74")

import itertools as it
d = [-4, -2, 1, 4, 6]
mu = R(sum(d), 5)
var = sum((q - mu) ** 2 for q in d) / 5
medias = [R(i + j, 2) for i, j in it.product(d, repeat=2)]
mm = sum(medias) / 25
vm = sum((q - mm) ** 2 for q in medias) / 25
v.ok(mu == 1 and var == R(68, 5) and vm == var / 2 == R(34, 5) and [R(2000, 10000) * q for q in (1000, 3000, 6000)] == [200, 600, 1200]
     and (200 * R(7, 10), 200 * R(3, 10)) == (140, 60) and (600 * R(55, 100), 600 * R(45, 100)) == (330, 270) and (1200 * R(45, 100), 1200 * R(55, 100)) == (540, 660), "2025-ord-sup1-b ej.7")
v.solucion(s, "7", "\\mu=\\frac{-4-2+1+4+6}{5}=1", "\\sigma^2=\\frac{25+9+0+9+25}{5}=\\frac{68}{5}=13{,}6", "\\sigma_{\\bar x}^2=\\frac{\\sigma^2}{2}=\\frac{13{,}6}{2}=6{,}8", "10\\,000-1\\,000-3\\,000=6\\,000")


v.fin()
