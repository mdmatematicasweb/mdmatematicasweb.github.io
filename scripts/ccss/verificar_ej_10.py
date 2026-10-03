#!/usr/bin/env python3
"""Verifica la relación de ejercicios ejercicios/2-bachillerato-ccss/10-distribuciones/index.qmd.

Cada ejercicio se resuelve aquí de forma independiente (fracciones exactas, binomial exacta con sympy y la TABLA de la normal
de `_tabla_normal.py`, con z redondeado a dos decimales, no el valor exacto); después se comprueba que (1) los datos aparecen en
el enunciado y (2) cada resultado calculado aparece en el bloque de su apartado de la solución escrita, con recuento exacto y
con mutación integrada. Los resultados con la tabla que difieren de los exactos se avisan (AVISO), sin fallar.

Uso:  python scripts/ccss/verificar_ej_10.py     (requiere `pip install sympy mpmath`)
Termina con código 0 si todo coincide y con código 1 si algo falla.
"""
import sys
from decimal import Decimal
from math import sqrt
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _ej_comun import Verificador, tx, dec  # noqa: E402
from _tabla_normal import T, z2, tabla, exacta, inversa, leer_z, aviso, informe, r  # noqa: E402
from sympy import Rational as R, binomial, sqrt as ssqrt, integrate, symbols, N  # noqa: E402

QMD = Path(__file__).resolve().parents[2] / "ejercicios" / "2-bachillerato-ccss" / "10-distribuciones" / "index.qmd"
v = Verificador(QMD)
v.estructura(puntos=2, opciones=False)
x = symbols('x', real=True)

# Recuentos explícitos de apariciones por apartado cuando un resultado se repite en el mismo bloque.
CNT = {}
RES = {}


def add(num, ap, *frags):
    RES.setdefault((num, ap), []).extend(frags)


def D4(val):
    return dec(val, 4)


def pp(num, ap, x_label, z_label, valor):
    """Añade «P(X…)=valor» y «P(Z…)=valor»: ambas etiquetas deben terminar la cadena escrita en el valor de la tabla."""
    add(num, ap, f"{x_label}={valor}")
    if z_label:
        add(num, ap, f"{z_label}={valor}")


def D(val):
    """Decimal exacto con coma y las cifras justas: 0,7 -> «0{,}7»; 1,0 -> «1»; -0,65 -> «-0{,}65»."""
    val = R(str(round(float(val), 8)))
    d = Decimal(val.p) / Decimal(val.q)
    return format(d.normalize(), "f").replace(".", "{,}")


def zs(z):
    return D(z2(z))


def zz(xv, mu, sd):
    """z de la tabla: (x-mu)/sd redondeado a dos decimales."""
    return z2((xv - mu) / sd)


def tb(z):
    """P(Z<=z) con la tabla, formateado."""
    return dec(T(z), 4)


def pexacta(z):
    return float(exacta(z))


# ---------- 1 ----------
xs = [0, 1, 2, 3]; ps = [R(2, 10), R(4, 10), R(3, 10), R(1, 10)]
mu = sum(a * b for a, b in zip(xs, ps)); e2 = sum(a * a * b for a, b in zip(xs, ps)); var = e2 - mu**2
v.enunciado(1, ["0{,}2", "0{,}4", "0{,}3", "0{,}1"])
v.ok((sum(ps), mu, e2, var, ssqrt(var)) == (1, R(13, 10), R(5, 2), R(81, 100), R(9, 10)), "ej. 1")
add(1, '', "\\mu=0\\cdot0{,}2+1\\cdot0{,}4+2\\cdot0{,}3+3\\cdot0{,}1=0{,}4+0{,}6+0{,}3=1{,}3",
    "0{,}4+4\\cdot0{,}3+9\\cdot0{,}1=0{,}4+1{,}2+0{,}9=2{,}5", "\\sigma^2=2{,}5-1{,}3^2=0{,}81", "\\sigma=\\sqrt{0{,}81}=0{,}9")
# ---------- 2 ----------
v.enunciado(2, ["2x", "0\\le x\\le1"])
v.ok(integrate(2 * x, (x, 0, 1)) == 1 and integrate(2 * x, (x, 0, R(1, 2))) == R(1, 4) and integrate(x * 2 * x, (x, 0, 1)) == R(2, 3), "ej. 2")
add(2, '', "\\int_0^12x\\,dx=[x^2]_0^1=1".replace("\\,", ""), "P(X\\le0{,}5)=\\int_0^{0{,}5}2x\\,dx=0{,}5^2=0{,}25".replace("\\,", ""),
    "\\mu=\\int_0^1x\\cdot2x\\,dx=[\\frac{2x^3}{3}]_0^1=\\frac{2}{3}".replace("\\,", ""))
# ---------- 3 ----------
b = lambda n, p, k: binomial(n, k) * p**k * (1 - p)**(n - k)
p3 = R(4, 10)
v.enunciado(3, ["B(6;\\,0{,}4)"])
v.ok((b(6, p3, 2), 1 - b(6, p3, 0), 6 * p3, ssqrt(6 * p3 * (1 - p3))) == (R(31104, 100000), R(953344, 1000000), R(12, 5), R(6, 5)), "ej. 3")
add(3, 'a', "~P(X=2)=" + D(b(6, p3, 2)))
add(3, 'b', "P(X\\ge1)=" + D(1 - b(6, p3, 0)), "1-0{,}6^6=1-0{,}046656")
add(3, 'c', "\\mu=np=6\\cdot0{,}4=2{,}4", "\\sigma=\\sqrt{npq}=\\sqrt{6\\cdot0{,}4\\cdot0{,}6}=\\sqrt{1{,}44}=1{,}2")
# ---------- 4 ----------
v.enunciado(4, ["N(100,\\,15)"])
pp(4, 'a', "P(X\\le115)", "P(Z\\le1)", tb(zz(115, 100, 15)))
z = zz(130, 100, 15)
pp(4, 'b', "P(X>130)", "P(Z>2)", D4(1 - T(z)))
pp(4, 'c', "P(85<X<115)", "P(-1<Z<1)", D4(2 * T(1) - 1))
aviso("ej. 4c", 2 * T(1) - 1, 2 * pexacta(1) - 1)
# ---------- 5 ----------
v.enunciado(5, ["N(50,\\,8)"])
pp(5, 'a', "P(X\\le62)", "P(Z\\le1{,}5)", tb(1.5))
pp(5, 'b', "P(X\\ge44)", "P(Z\\le0{,}75)", tb(0.75))
pp(5, 'c', "P(40<X<56)", "P(-1{,}25<Z<0{,}75)", D4(T(0.75) - T(-1.25)))
v.ok(zz(62, 50, 8) == 1.5 and zz(44, 50, 8) == -0.75 and (zz(40, 50, 8), zz(56, 50, 8)) == (-1.25, 0.75), "ej. 5: z")
# ---------- 6 ----------
v.enunciado(6, ["N(70,\\,10)", "0{,}9332", "0{,}9772"])
za, zb = leer_z(0.9332), leer_z(0.9772)
v.ok((za, zb) == (1.5, 2.0) and 70 + 10 * za == 85 and 70 + 10 * zb == 90, "ej. 6")
add(6, 'a', "z=1{,}50", "k=70+10\\cdot1{,}5=85")
add(6, 'b', "z=2{,}00", "k=70+10\\cdot2=90")
# ---------- 7 ----------
iv = inversa(0.80)
v.enunciado(7, ["N(100,\\,20)", "0{,}80"])
k_c = 100 + 20 * iv["cercano"][0]; k_i = 100 + 20 * round(iv["interp"], 4)
v.ok(iv["cercano"] == [0.84] and (iv["p1"], iv["p2"]) == (0.7995, 0.8023) and round(iv["interp"], 4) == 0.8418 and round(k_c, 2) == 116.8 and round(k_i, 2) == 116.84, "ej. 7")
add(7, '', "\\Phi(0{,}84)=0{,}7995", "\\Phi(0{,}85)=0{,}8023", "z=0{,}84", "k=100+20\\cdot0{,}84=116{,}8", "!\\approx0{,}8418", "k\\approx100+20\\cdot0{,}8418=116{,}84", "k\\approx116{,}8")
# ---------- 8 ----------
mu8, sd8 = 50, sqrt(100 * 0.5 * 0.5)
v.enunciado(8, ["B(100;\\,0{,}5)"])
v.ok(100 * 0.5 >= 5 and 100 * 0.5 >= 5 and sd8 == 5 and (zz(57.5, 50, 5), zz(58.5, 50, 5), zz(50.5, 50, 5)) == (1.5, 1.7, 0.1), "ej. 8: condiciones y z")
add(8, 'a', "np=50\\ge5", "nq=50\\ge5", "N(50,\\,5)")
pp(8, 'b', "~P(X=50)", "P(-0{,}1<Z<0{,}1)", D4(2 * T(0.1) - 1))
pp(8, 'c', "P(X\\ge58)", "P(Z>1{,}5)", D4(1 - T(1.5)))
pp(8, 'd', "P(X>58)", "P(Z>1{,}7)", D4(1 - T(1.7)))
aviso("ej. 8b", 2 * T(0.1) - 1, 2 * pexacta(0.1) - 1)
# ---------- 9 ----------
v.enunciado(9, ["B(40;\\,0{,}1)", "B(60;\\,0{,}1)"])
sd9 = sqrt(60 * 0.1 * 0.9); z9 = zz(4.5, 6, sd9)
v.ok(40 * 0.1 < 5 and 60 * 0.1 >= 5 and 60 * 0.9 >= 5 and z9 == -0.65 and round(sd9, 4) == 2.3238, "ej. 9")
add(9, 'a', "np=4<5")
add(9, 'b', "np=6\\ge5", "nq=54\\ge5", "N(6;\\,2{,}3238)")
pp(9, 'b', "P(X\\le4)", "P(Z<-0{,}65)", D4(T(z9)))
# ---------- 10 ----------
v.enunciado(10, ["N(30,\\,6)"])
pp(10, 'a', "P(X\\le36)", "P(Z\\le1)", tb(zz(36, 30, 6)))
pp(10, 'b', "P(X>42)", "P(Z>2)", D4(1 - T(2)))
pp(10, 'c', "P(24<X<39)", "P(-1<Z<1{,}5)", D4(T(1.5) - T(-1)))
add(10, 'd', "!un $2{,}28\\,\\%$")
v.ok((zz(36, 30, 6), zz(42, 30, 6), zz(24, 30, 6), zz(39, 30, 6)) == (1, 2, -1, 1.5), "ej. 10: z")
# ---------- 11 ----------
v.enunciado(11, ["N(500,\\,12)", "488", "520"])
z11 = zz(520, 500, 12)
pp(11, 'a', "P(X<488)", "P(Z<-1)", D4(T(-1)))
pp(11, 'b', "P(X>520)", "P(Z>1{,}67)", D4(1 - T(z11)))
v.ok((zz(488, 500, 12), z11, leer_z(0.9032), 500 + 12 * leer_z(0.9032)) == (-1, 1.67, 1.3, 515.6), "ej. 11")
add(11, 'c', "z=1{,}30", "k=500+12\\cdot1{,}3=515{,}6")
add(11, 'd', "!El $15{,}87\\,\\%$", "!el $90{,}32\\,\\%$", "!solo el $4{,}75\\,\\%$")
aviso("ej. 11b", 1 - T(z11), 1 - pexacta(20 / 12))
# ---------- 12 ----------
p12 = R(2, 10)
v.enunciado(12, ["20\\,\\%", "10 clientes"])
v.ok((round(float(b(10, p12, 2)), 4), round(float(b(10, p12, 0) + b(10, p12, 1)), 4), round(float(1 - b(10, p12, 0)), 4), round(float(ssqrt(R(16, 10))), 2)) == (0.3020, 0.3758, 0.8926, 1.26)
     and round(float(b(10, p12, 0)), 4) == 0.1074 and round(float(10 * p12 * (1 - p12)**9), 4) == 0.2684, "ej. 12")
add(12, 'a', "X\\sim B(10;\\,0{,}2)", "~P(X=2)\\approx0{,}3020")
add(12, 'b', "P(X\\le1)=0{,}3758", "!=0{,}1074+0{,}2684=0{,}3758")
add(12, 'c', "P(X\\ge1)=0{,}8926", "1-P(X=0)=1-0{,}8^{10}=1-0{,}1074")
add(12, 'd', "\\mu=np=10\\cdot0{,}2=2", "\\sigma=\\sqrt{1{,}6}\\approx1{,}26")
# ---------- 13 ----------
p13 = T(-1)
v.enunciado(13, ["N(1000,\\,100)", "5 bombillas"])
v.ok(p13 == 0.1587 and round(float(5 * R(str(p13)) * (1 - R(str(p13)))**4), 4) == 0.3975 and round(5 * p13, 4) == 0.7935, "ej. 13")
pp(13, 'a', "P(X<900)", "P(Z<-1)", D4(p13))
pp(13, 'b', "P(900<X<1100)", "P(-1<Z<1)", D4(2 * T(1) - 1))
add(13, 'c', "B(5;\\,0{,}1587)", "~P(Y=1)\\approx0{,}3975")
add(13, 'd', "\\mu=np=5\\cdot0{,}1587=0{,}7935")
# ---------- 14 ----------
n14, p14 = 200, 0.3; mu14 = n14 * p14; sd14 = sqrt(n14 * p14 * (1 - p14))
za, zb_, zc = zz(69.5, mu14, sd14), zz(55.5, mu14, sd14), z2(0.5 / sd14)
v.enunciado(14, ["30\\,\\%", "200 usuarios"])
v.ok((mu14, round(sd14, 4), za, zb_, zc) == (60, 6.4807, 1.47, -0.69, 0.08) and n14 * p14 >= 5 and n14 * (1 - p14) >= 5, "ej. 14")
add(14, 'a', "np=60\\ge5", "nq=140\\ge5", "N(60;\\,6{,}4807)")
pp(14, 'b', "P(X\\ge70)", "P(Z>1{,}47)", D4(1 - T(za)))
pp(14, 'c', "P(X\\le55)", "P(Z<-0{,}69)", D4(T(zb_)))
pp(14, 'd', "~P(X=60)", "P(-0{,}08<Z<0{,}08)", D4(2 * T(zc) - 1))
# ---------- 15 ----------
n15, p15 = 500, 0.02; mu15 = n15 * p15; sd15 = sqrt(n15 * p15 * (1 - p15))
za, zb_ = zz(14.5, mu15, sd15), zz(7.5, mu15, sd15)
v.enunciado(15, ["2\\,\\%", "150", "500"])
v.ok((150 * p15, mu15, round(sd15, 4), za, zb_) == (3.0, 10.0, 3.1305, 1.44, -0.8) and 150 * p15 < 5 and mu15 >= 5 and n15 * (1 - p15) >= 5, "ej. 15")
add(15, 'a', "np=3<5")
add(15, 'b', "np=10\\ge5", "nq=490\\ge5", "N(10;\\,3{,}1305)")
pp(15, 'c', "P(X\\ge15)", "P(Z>1{,}44)", D4(1 - T(za)))
pp(15, 'd', "P(X<8)", "P(Z<-0{,}80)", D4(T(zb_)))
# ---------- 16 ----------
v.enunciado(16, ["N(72,\\,\\sigma)", "0{,}9772"])
v.ok(leer_z(0.9772) == 2.0 and (80 - 72) / 2 == 4 and zz(76, 72, 4) == 1 and 72 + 4 * 2 == 80 and (zz(68, 72, 4), zz(76, 72, 4)) == (-1, 1), "ej. 16")
add(16, 'a', "z=2{,}00", "\\sigma=4")
pp(16, 'b', "P(X\\ge76)", "P(Z\\ge1)", D4(1 - T(1)))
add(16, 'c', "P(X\\le k)=0{,}9772", "k=72+4\\cdot2=80")
pp(16, 'd', "P(68<X<76)", "P(-1<Z<1)", D4(2 * T(1) - 1))
# ---------- 17 ----------
iv17 = inversa(0.90)
v.enunciado(17, ["N(1800,\\,300)", "2400", "10\\,\\%"])
k1 = 1800 + 300 * iv17["cercano"][0]; k2 = 1800 + 300 * round(iv17["interp"], 4)
v.ok(iv17["cercano"] == [1.28] and (iv17["p1"], iv17["p2"]) == (0.8997, 0.9015) and round(iv17["interp"], 4) == 1.2817 and k1 == 2184 and round(k2, 2) == 2184.51, "ej. 17c")
pp(17, 'a', "P(X>2400)", "P(Z>2)", D4(1 - T(2)))
pp(17, 'b', "P(1500<X<2100)", "P(-1<Z<1)", D4(2 * T(1) - 1))
add(17, 'c', "\\Phi(1{,}28)=0{,}8997", "\\Phi(1{,}29)=0{,}9015", "z=1{,}28", "k=1800+300\\cdot1{,}28=2184", "!\\approx1{,}2817", "k\\approx1800+300\\cdot1{,}2817=2184{,}5")
add(17, 'd', "!Solo el $2{,}28\\,\\%$")
# ---------- 18 ----------
n18, p18 = 120, 0.55; mu18 = n18 * p18; sd18 = sqrt(n18 * p18 * (1 - p18))
za, zb_, zc = zz(70.5, mu18, sd18), zz(59.5, mu18, sd18), zz(72.5, mu18, sd18)
v.enunciado(18, ["55\\,\\%", "120 votantes"])
v.ok((round(mu18, 6), round(sd18, 4), za, zb_, zc) == (66, 5.4498, 0.83, -1.19, 1.19), "ej. 18")
add(18, 'a', "np=66\\ge5", "nq=54\\ge5", "N(66;\\,5{,}4498)")
pp(18, 'b', "P(X>70)", "P(Z>0{,}83)", D4(1 - T(za)))
pp(18, 'c', "P(X\\ge60)", "P(Z<1{,}19)", tb(1.19))
pp(18, 'd', "P(60\\le X\\le72)", "P(-1{,}19<Z<1{,}19)", D4(2 * T(1.19) - 1))
# ---------- 19 ----------
v.enunciado(19, ["N(500,\\,4)", "N(500,\\,2)"])
pp(19, 'a', "P(497<X<503)", "P(-0{,}75<Z<0{,}75)", D4(2 * T(0.75) - 1))
pp(19, 'b', "P(497<X<503)", "P(-1{,}5<Z<1{,}5)", D4(2 * T(1.5) - 1))
pp(19, 'c', "P(X<495)", "P(Z<-1{,}25)", D4(T(-1.25)))
add(19, 'c', f"P(Z<-2{{,}}5)={D(T(-2.5))}")
add(19, 'd', "!el $86{,}64\\,\\%$", "!(frente al $54{,}68\\,\\%$)", "!solo el $0{,}62\\,\\%$", "!(frente al $10{,}56\\,\\%$)")
v.ok((zz(497, 500, 4), zz(503, 500, 2), zz(495, 500, 4), zz(495, 500, 2)) == (-0.75, 1.5, -1.25, -2.5), "ej. 19: z")
# ---------- 20 ----------
k20 = 1 - R(1, 10) - R(4, 10) - R(2, 10)
p20 = [R(1, 10), k20, R(4, 10), R(2, 10)]
mu20 = sum(a * b for a, b in zip(xs, p20)); e20 = sum(a * a * b for a, b in zip(xs, p20))
v.enunciado(20, ["0{,}1", "0{,}4", "0{,}2"])
v.ok((k20, mu20, e20, e20 - mu20**2, ssqrt(e20 - mu20**2), p20[2] + p20[3]) == (R(3, 10), R(17, 10), R(37, 10), R(81, 100), R(9, 10), R(6, 10)), "ej. 20")
add(20, 'a', "0{,}1+k+0{,}4+0{,}2=1", "k=0{,}3")
add(20, 'b', "\\mu=0\\cdot0{,}1+1\\cdot0{,}3+2\\cdot0{,}4+3\\cdot0{,}2=0{,}3+0{,}8+0{,}6=1{,}7")
add(20, 'c', "0{,}3+4\\cdot0{,}4+9\\cdot0{,}2=0{,}3+1{,}6+1{,}8=3{,}7", "\\sigma^2=3{,}7-1{,}7^2=0{,}81", "\\sigma=0{,}9")
add(20, 'd', "P(X\\ge2)=0{,}4+0{,}2=0{,}6")
# ---------- 21 ----------
g = [8, 0, -2]; pg = [R(1, 10), R(3, 10), R(6, 10)]
eg = sum(a * b for a, b in zip(g, pg)); eg2 = sum(a * a * b for a, b in zip(g, pg)); vg = eg2 - eg**2
v.enunciado(21, ["2 €", "0{,}1", "10 €", "0{,}3", "0{,}6"])
v.ok((eg, eg2, vg, round(float(ssqrt(vg)), 2)) == (R(-2, 5), R(44, 5), R(216, 25), 2.94), "ej. 21")
add(21, 'a', "G=8", "G=0", "G=-2")
add(21, 'b', "E[G]=8\\cdot0{,}1+0\\cdot0{,}3+(-2)\\cdot0{,}6=0{,}8+0-1{,}2=-0{,}4")
add(21, 'c', "E[G^2]=64\\cdot0{,}1+0+4\\cdot0{,}6=6{,}4+2{,}4=8{,}8", "\\sigma^2=8{,}8-(-0{,}4)^2=8{,}64", "\\sigma=\\sqrt{8{,}64}\\approx2{,}94")
add(21, 'd', "!pierde** 0,40 €")
# ---------- 22 ----------
k22 = R(1, 2)
v.enunciado(22, ["kx", "0\\le x\\le2"])
v.ok(integrate(k22 * x, (x, 0, 2)) == 1 and integrate(k22 * x, (x, 0, 1)) == R(1, 4) and integrate(k22 * x, (x, R(3, 2), 2)) == R(7, 16) and integrate(x * k22 * x, (x, 0, 2)) == R(4, 3), "ej. 22")
add(22, 'a', "2k=1", "k=\\frac{1}{2}")
add(22, 'b', "P(X\\le1)=\\frac{1}{4}")
add(22, 'c', "P(X>1{,}5)=\\frac{7}{16}", "1-\\frac{9}{16}=\\frac{7}{16}")
add(22, 'd', "\\mu=\\frac{4}{3}")
# ---------- 23 ----------
p23 = R(25, 100)
v.enunciado(23, ["25\\,\\%", "8 hogares"])
v.ok((round(float(b(8, p23, 2)), 4), round(float(1 - b(8, p23, 0)), 4), round(float(b(8, p23, 0) + b(8, p23, 1) + b(8, p23, 2)), 4), 8 * p23, round(float(ssqrt(8 * p23 * (1 - p23))), 2)) == (0.3115, 0.8999, 0.6785, 2, 1.22)
     and (round(float(b(8, p23, 0)), 5), round(float(b(8, p23, 1)), 5), round(float(b(8, p23, 2)), 5)) == (0.10011, 0.26697, 0.31146), "ej. 23")
add(23, 'a', "X\\sim B(8;\\,0{,}25)", "~P(X=2)\\approx0{,}3115")
add(23, 'b', "P(X\\ge1)=0{,}8999", "1-P(X=0)=1-0{,}75^8=1-0{,}10011")
add(23, 'c', "P(X\\le2)=0{,}6785", "0{,}10011+0{,}26697+0{,}31146")
add(23, 'd', "\\mu=np=8\\cdot0{,}25=2", "\\sigma=\\sqrt{8\\cdot0{,}25\\cdot0{,}75}=\\sqrt{1{,}5}\\approx1{,}22")
# ---------- 24 ----------
mu24 = 100 - 12 * leer_z(0.9505)
za, zb_ = zz(90, mu24, 12), zz(70, mu24, 12)
v.enunciado(24, ["N(\\mu,\\,12)", "0{,}9505"])
v.ok((leer_z(0.9505), round(mu24, 1), za, zb_) == (1.65, 80.2, 0.82, -0.85), "ej. 24")
add(24, 'a', "z=1{,}65", "\\mu=100-12\\cdot1{,}65=80{,}2")
pp(24, 'b', "P(X\\ge90)", "P(Z\\ge0{,}82)", D4(1 - T(za)))
pp(24, 'c', "P(70<X<90)", "P(-0{,}85<Z<0{,}82)", D4(T(za) - T(zb_)))
pp(24, 'd', "P(X\\le70)", "P(Z\\le-0{,}85)", D4(T(zb_)))
# ---------- 25 ----------
n25, p25 = 260, 0.05; mu25 = n25 * p25; sd25 = sqrt(n25 * p25 * (1 - p25))
za, zb_ = z2(0.5 / sd25), zz(9.5, mu25, sd25)
v.enunciado(25, ["5\\,\\%", "260 billetes", "250 plazas"])
v.ok((mu25, round(sd25, 4), za, zb_) == (13, 3.5143, 0.14, -1.0), "ej. 25")
add(25, 'a', "np=13\\ge5", "nq=247\\ge5", "N(13;\\,3{,}5143)")
pp(25, 'b', "~P(X=13)", "P(-0{,}14<Z<0{,}14)", D4(2 * T(za) - 1))
pp(25, 'c', "P(X\\le9)", "P(Z<-1)", D4(T(zb_)))
add(25, 'd', "!el $15{,}87\\,\\%$")
# ---------- diferencias entre la tabla (z a 2 decimales) y el valor exacto ----------
def Ph(xv, mu_, sd_):
    return pexacta((xv - mu_) / sd_)


aviso("ej. 9b", T(z2((4.5 - 6) / sqrt(5.4))), Ph(4.5, 6, sqrt(5.4)))
aviso("ej. 14b", 1 - T(z2((69.5 - 60) / sd14)), 1 - Ph(69.5, 60, sd14))
aviso("ej. 14c", T(z2((55.5 - 60) / sd14)), Ph(55.5, 60, sd14))
aviso("ej. 14d", 2 * T(z2(0.5 / sd14)) - 1, 2 * Ph(60.5, 60, sd14) - 1)
aviso("ej. 15c", 1 - T(z2((14.5 - 10) / sd15)), 1 - Ph(14.5, 10, sd15))
aviso("ej. 15d", T(z2((7.5 - 10) / sd15)), Ph(7.5, 10, sd15))
aviso("ej. 18b", 1 - T(z2((70.5 - 66) / sd18)), 1 - Ph(70.5, 66, sd18))
aviso("ej. 18c", 1 - T(z2((59.5 - 66) / sd18)), 1 - Ph(59.5, 66, sd18))
aviso("ej. 18d", 2 * T(1.19) - 1, Ph(72.5, 66, sd18) - Ph(59.5, 66, sd18))
aviso("ej. 25b", 2 * T(z2(0.5 / sd25)) - 1, 2 * Ph(13.5, 13, sd25) - 1)
aviso("ej. 25c", T(z2((9.5 - 13) / sd25)), Ph(9.5, 13, sd25))
aviso("ej. 24b", 1 - T(0.82), 1 - Ph(90, 80.2, 12))
aviso("ej. 24c", T(0.82) - T(-0.85), Ph(90, 80.2, 12) - Ph(70, 80.2, 12))

# ---------- comprobación de todos los resultados en su apartado ----------
for (num, ap), frags in RES.items():
    n = CNT.get((num, ap), {})
    v.solucion(num, [(f, n[f]) if f in n else f for f in frags], ap)
v.fin()
informe()
