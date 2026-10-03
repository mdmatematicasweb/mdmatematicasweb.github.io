#!/usr/bin/env python3
"""Verifica la relación de ejercicios ejercicios/2-bachillerato-ccss/11-muestreo-inferencia/index.qmd.

Cada ejercicio se resuelve aquí de forma independiente (aritmética exacta con sympy para intervalos y tamaños de muestra, y la
TABLA de la normal de `_tabla_normal.py`, con z redondeado a dos decimales, para las probabilidades); después se comprueba que
(1) los datos aparecen en el enunciado y (2) cada resultado calculado aparece en el bloque de su apartado de la solución
escrita, con recuento exacto y con mutación integrada. Los resultados con la tabla que difieren de los exactos se avisan
(AVISO), sin fallar. Estructura: 25 ejercicios, los PAU valen 2 puntos y no tienen opción A/B.

Uso:  python scripts/ccss/verificar_ej_11.py     (requiere `pip install sympy mpmath`)
Termina con código 0 si todo coincide y con código 1 si algo falla.
"""
import sys
from decimal import Decimal
from math import sqrt
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _ej_comun import Verificador, tx, dec  # noqa: E402
from _tabla_normal import T, z2, exacta, inversa, leer_z, aviso, informe  # noqa: E402
from sympy import Rational as R, ceiling, sqrt as ssqrt  # noqa: E402

QMD = Path(__file__).resolve().parents[2] / "ejercicios" / "2-bachillerato-ccss" / "11-muestreo-inferencia" / "index.qmd"
v = Verificador(QMD)
v.estructura(puntos=2, opciones=False)

# Recuentos explícitos de apariciones por apartado cuando un resultado se repite en el mismo bloque.
CNT = {}
RES = {}
Z95, Z90, Z99 = R('1.96'), R('1.645'), R('2.575')


def add(num, ap, *frags):
    RES.setdefault((num, ap), []).extend(frags)


def D(val):
    """Decimal exacto con coma y las cifras justas: 77,06 -> «77{,}06»; 2 -> «2»."""
    val = R(val)
    d = Decimal(val.p) / Decimal(val.q)
    return format(d.normalize(), "f").replace(".", "{,}")


def D4(val):
    return dec(val, 4)


def tb(z):
    return dec(T(z), 4)


def zz(xv, mu, sd):
    return z2((xv - mu) / sd)


def pp(num, ap, x_label, z_label, valor):
    add(num, ap, f"{x_label}={valor}")
    if z_label:
        add(num, ap, f"{z_label}={valor}")


def pexacta(z):
    return float(exacta(z))


def ic(num, ap, centro, E, texto_E=None):
    """Intervalo (centro-E; centro+E) escrito como (a;\\ b), con valores exactos."""
    a, b_ = R(centro) - R(E), R(centro) + R(E)
    add(num, ap, f"!({D(a)};\\ {D(b_)})")
    return a, b_


def tam(num, ap, expr, val, n):
    """«expr=val» (valor exacto sin redondear) y «n=entero superior»."""
    add(num, ap, f"{expr}={D(val)}", f"n={n}")


# ---------- 1 ----------
v.enunciado(1, ["12 000", "150", "40\\,\\%", "38\\,\\%", "25"])
add(1, 'a', "!**No** es un muestreo aleatorio simple", "sesgada")
add(1, 'b', "p=0{,}4", "\\hat p=0{,}38")
v.ok(25 < 30, "ej. 1c: 25 < 30")
add(1, 'c', "!No: se consideran muestras grandes las de $n\\ge30$", "25<30")
# ---------- 2 ----------
mu2, sd2, n2 = 50, 12, 36
se2 = R(sd2) / ssqrt(n2)
v.enunciado(2, ["\\mu=50", "\\sigma=12", "n=36"])
v.ok(se2 == 2 and zz(52, 50, 2) == 1 and (zz(48, 50, 2), zz(53, 50, 2)) == (-1, 1.5), "ej. 2")
add(2, 'a', "!=N(50,\\,2)")
pp(2, 'b', "P(\\overline{X}>52)", "P(Z>1)", D4(1 - T(1)))
pp(2, 'c', "P(48<\\overline{X}<53)", "P(-1<Z<1{,}5)", D4(T(1.5) - T(-1)))
# ---------- 3 ----------
se3 = sqrt(.5 * .5 / 100)
v.enunciado(3, ["50\\,\\%", "n=100"])
v.ok(round(se3, 4) == 0.05 and zz(0.58, 0.5, se3) == 1.6 and zz(0.45, 0.5, se3) == -1, "ej. 3")
add(3, 'a', "!=N(0{,}5;\\,0{,}05)")
pp(3, 'b', "P(\\hat p\\ge0{,}58)", "P(Z\\ge1{,}6)", D4(1 - T(1.6)))
pp(3, 'c', "P(\\hat p\\le0{,}45)", "P(Z\\le-1)", D4(T(-1)))
# ---------- 4 ----------
se4 = R(15, 10); E4 = Z95 * se4
v.enunciado(4, ["\\sigma=15", "n=100", "80"])
v.ok(E4 == R('2.94') and abs(T(1.96) - 0.975) < 1e-12, "ej. 4")
add(4, '', "\\frac{\\sigma}{\\sqrt n}=\\frac{15}{10}=1{,}5", f"E=z_{{\\alpha/2}}\\frac{{\\sigma}}{{\\sqrt n}}=1{{,}}96\\cdot1{{,}}5={D(E4)}")
ic(4, '', 80, E4)
# ---------- 5 ----------
se5 = R(30, 12); E5 = Z99 * se5
v.enunciado(5, ["\\sigma=30", "n=144", "200", "2{,}575"])
v.ok(se5 == R(5, 2) and E5 == R('6.4375'), "ej. 5")
add(5, '', "\\frac{\\sigma}{\\sqrt n}=\\frac{30}{12}=2{,}5", f"E=2{{,}}575\\cdot2{{,}}5={D(E5)}")
ic(5, '', 200, E5)
# ---------- 6 ----------
se6 = ssqrt(R(2, 10) * R(8, 10) / 400); E6 = Z95 * se6
v.enunciado(6, ["400", "20\\,\\%"])
v.ok(se6 == R(1, 50) and E6 == R('0.0392'), "ej. 6")
add(6, '', "\\hat p=0{,}2", f"\\sqrt{{\\frac{{0{{,}}2\\cdot0{{,}}8}}{{400}}}}={D(se6)}", f"E=1{{,}}96\\cdot0{{,}}02={D(E6)}")
ic(6, '', R(2, 10), E6)
# ---------- 7 ----------
n7 = (Z95 * 20 / 4)**2
v.enunciado(7, ["\\sigma=20", "4", "95\\,\\%"])
v.ok(n7 == R('96.04') and ceiling(n7) == 97, "ej. 7")
add(7, '', "9{,}8^2=96{,}04", "n=97")
# ---------- 8 ----------
n8 = Z95**2 * R(1, 4) / R('0.04')**2
v.enunciado(8, ["0{,}04", "95\\,\\%"])
v.ok(n8 == R('600.25') and ceiling(n8) == 601, "ej. 8")
add(8, '', f"\\frac{{1{{,}}96^2\\cdot0{{,}}25}}{{0{{,}}04^2}}={D(n8)}", "n=601")
# ---------- 9 ----------
xb9 = R('46.08') + (R('53.92') - R('46.08')) / 2; E9 = (R('53.92') - R('46.08')) / 2; n9 = (Z95 * 20 / E9)**2
v.enunciado(9, ["(46{,}08;\\ 53{,}92)", "\\sigma=20"])
v.ok((xb9, E9, n9) == (50, R('3.92'), 100), "ej. 9")
add(9, '', "\\overline{x}=\\frac{46{,}08+53{,}92}{2}=50", "E=\\frac{53{,}92-46{,}08}{2}=3{,}92", "\\sqrt n=\\frac{1{,}96\\cdot20}{3{,}92}=10", "n=100")
# ---------- 10 ----------
se10 = 200 / sqrt(64)
v.enunciado(10, ["\\mu=1850", "\\sigma=200", "n=64"])
v.ok(se10 == 25 and zz(1890, 1850, 25) == 1.6 and (zz(1800, 1850, 25), zz(1900, 1850, 25)) == (-2, 2) and (zz(1800, 1850, 50), zz(1900, 1850, 50)) == (-1, 1), "ej. 10")
add(10, 'a', "!=N(1850,\\,25)")
pp(10, 'b', "P(\\overline{X}>1890)", "P(Z>1{,}6)", D4(1 - T(1.6)))
pp(10, 'c', "P(1800<\\overline{X}<1900)", "P(-2<Z<2)", D4(2 * T(2) - 1))
add(10, 'd', "!=N(1850,\\,50)", f"P(1800<\\overline{{X}}<1900)=P(-1<Z<1)={D4(2 * T(1) - 1)}", "!(un $95{,}44\\,\\%$ frente a un $68{,}26\\,\\%$)")
# ---------- 11 ----------
p11, n11 = .35, 200; se11 = sqrt(p11 * (1 - p11) / n11); z11 = zz(.40, p11, se11)
v.enunciado(11, ["35\\,\\%", "n=200"])
v.ok((round(se11, 4), z11, zz(.30, p11, se11)) == (0.0337, 1.48, -1.48), "ej. 11")
add(11, 'a', "!=N(0{,}35;\\,0{,}0337)")
pp(11, 'b', "P(\\hat p\\ge0{,}40)", "P(Z\\ge1{,}48)", D4(1 - T(z11)))
pp(11, 'c', "P(\\hat p\\le0{,}30)", "P(Z\\le-1{,}48)", D4(T(-z11)))
pp(11, 'd', "P(0{,}30<\\hat p<0{,}40)", "P(-1{,}48<Z<1{,}48)", D4(2 * T(z11) - 1))
add(11, 'd', "!el $86{,}12\\,\\%$")
aviso("ej. 11b", 1 - T(z11), 1 - pexacta((.40 - p11) / se11))
aviso("ej. 11d", 2 * T(z11) - 1, 2 * pexacta((.40 - p11) / se11) - 1)
# ---------- 12 ----------
se12 = R(12, 10)
v.enunciado(12, ["n=100", "62", "\\sigma=12"])
for ap, z, nom in (('a', Z90, "1{,}645"), ('b', Z95, "1{,}96"), ('c', Z99, "2{,}575")):
    E_ = z * se12
    add(12, ap, f"E={nom}\\cdot1{{,}}2={D(E_)}")
    ic(12, ap, 62, E_)
anch = [2 * z * se12 for z in (Z90, Z95, Z99)]
v.ok(anch == [R('3.948'), R('4.704'), R('6.18')], "ej. 12d: amplitudes")
add(12, 'd', *[f"{D(a)}" for a in anch])
# ---------- 13 ----------
ph13 = R(140, 500); se13 = ssqrt(ph13 * (1 - ph13) / 500); E13 = Z95 * se13
v.enunciado(13, ["500", "140"])
v.ok((ph13, round(float(se13), 4), round(float(E13), 4), round(float(ph13 - E13), 4), round(float(ph13 + E13), 4)) == (R(28, 100), 0.0201, 0.0394, 0.2406, 0.3194), "ej. 13")
add(13, 'a', "\\hat p=\\frac{140}{500}=0{,}28")
add(13, 'b', "\\sqrt{\\frac{0{,}28\\cdot0{,}72}{500}}\\approx0{,}0201")
add(13, 'c', "E=1{,}96\\cdot0{,}0201\\approx0{,}0394", "!(0{,}28-0{,}0394;\\ 0{,}28+0{,}0394)=(0{,}2406;\\ 0{,}3194)")
add(13, 'd', "!entre el $24{,}06\\,\\%$ y el $31{,}94\\,\\%$", "no** se puede afirmar")
# ---------- 14 ----------
v.enunciado(14, ["\\sigma=25", "5", "1{,}645", "2{,}575"])
for ap, z, nom in (('a', Z95, "1{,}96"), ('b', Z90, "1{,}645"), ('c', Z99, "2{,}575")):
    nn = (z * 5)**2
    add(14, ap, f"({nom}\\cdot5)^2={dec(nn, 2)}", f"n={ceiling(nn)}")
v.ok([ceiling((z * 5)**2) for z in (Z95, Z90, Z99)] == [97, 68, 166], "ej. 14")
add(14, 'd', "!Una mayor confianza exige un valor crítico mayor")
# ---------- 15 ----------
n15a = Z95**2 * R(1, 4) / R('0.025')**2; n15b = Z95**2 * R(3, 10) * R(7, 10) / R('0.025')**2; n15d = Z95**2 * R(1, 4) / R('0.05')**2
v.enunciado(15, ["0{,}025", "95\\,\\%", "0{,}3"])
v.ok((n15a, ceiling(n15a), n15b, ceiling(n15b), n15d, ceiling(n15d)) == (R('1536.64'), 1537, R('1290.7776'), 1291, R('384.16'), 385), "ej. 15")
add(15, 'a', f"\\frac{{1{{,}}96^2\\cdot0{{,}}25}}{{0{{,}}025^2}}={D(n15a)}", "n=1537")
add(15, 'b', "\\frac{1{,}96^2\\cdot0{,}3\\cdot0{,}7}{0{,}025^2}=1290{,}78", "n=1291")
v.ok(dec(n15b, 2) == "1290{,}78", "ej. 15b: 1290,78")
add(15, 'c', "p(1-p)", "máximo")
add(15, 'd', f"\\frac{{1{{,}}96^2\\cdot0{{,}}25}}{{0{{,}}05^2}}={D(n15d)}", "n=385", "!($1537$ frente a $385$)")
# ---------- 16 ----------
xb16 = R('97.06') + (R('102.94') - R('97.06')) / 2; E16 = (R('102.94') - R('97.06')) / 2; n16 = (Z95 * 15 / E16)**2; E16b = Z99 * 15 / 10
v.enunciado(16, ["(97{,}06;\\ 102{,}94)", "\\sigma=15"])
v.ok((xb16, E16, n16, E16b) == (100, R('2.94'), 100, R('3.8625')), "ej. 16")
add(16, 'a', "\\overline{x}=\\frac{97{,}06+102{,}94}{2}=100")
add(16, 'b', "E=\\frac{102{,}94-97{,}06}{2}=2{,}94")
add(16, 'c', "\\sqrt n=\\frac{1{,}96\\cdot15}{2{,}94}=10", "n=100")
add(16, 'd', f"E=2{{,}}575\\cdot\\frac{{15}}{{10}}={D(E16b)}")
ic(16, 'd', 100, E16b)
# ---------- 17 ----------
ph17 = R(252, 400); se17 = ssqrt(ph17 * (1 - ph17) / 400); E17 = Z90 * se17
v.enunciado(17, ["400", "252", "1{,}645"])
v.ok((ph17, round(float(se17), 4), round(float(E17), 4), round(float(ph17 - E17), 4), round(float(ph17 + E17), 4)) == (R(63, 100), 0.0241, 0.0397, 0.5903, 0.6697), "ej. 17")
add(17, 'a', "\\hat p=\\frac{252}{400}=0{,}63")
add(17, 'b', "E=1{,}645\\cdot0{,}0241\\approx0{,}0397", "!(0{,}63-0{,}0397;\\ 0{,}63+0{,}0397)=(0{,}5903;\\ 0{,}6697)")
add(17, 'c', "!entre el $59{,}03\\,\\%$ y el $66{,}97\\,\\%$", "!aproximadamente el $90\\,\\%$")
add(17, 'd', "!Sí: todo el intervalo está por encima de $0{,}5$")
# ---------- 18 ----------
v.enunciado(18, ["\\sigma=10", "n=25"])
v.ok(10 / sqrt(25) == 2 and (zz(3, 0, 2), zz(-3, 0, 2)) == (1.5, -1.5) and ceiling((Z95 * 10 / 2)**2) == 97 and (Z95 * 10 / 2)**2 == R('96.04'), "ej. 18")
add(18, 'a', "!=N(\\mu,\\,2)")
add(18, 'b', f"P(-1{{,}}5<Z<1{{,}}5)={D4(2 * T(1.5) - 1)}")
add(18, 'c', "z_{\\alpha/2}=1{,}96", "n>\\left(\\frac{1{,}96\\cdot10}{2}\\right)^2=96{,}04", "n=97")
add(18, 'd', "E=z_{\\alpha/2}\\sigma/\\sqrt n")
# ---------- 19 ----------
v.enunciado(19, ["\\sigma=40", "95\\,\\%"])
E19 = {n_: Z95 * 40 / ssqrt(n_) for n_ in (100, 400, 900)}
v.ok((E19[100], E19[400], round(float(E19[900]), 2)) == (R('7.84'), R('3.92'), 2.61), "ej. 19")
add(19, 'a', "E=1{,}96\\cdot\\frac{40}{\\sqrt{100}}=1{,}96\\cdot4=7{,}84")
add(19, 'b', "E=1{,}96\\cdot\\frac{40}{\\sqrt{400}}=1{,}96\\cdot2=3{,}92")
add(19, 'c', "E=1{,}96\\cdot\\frac{40}{\\sqrt{900}}\\approx2{,}61")
add(19, 'd', "!de $7{,}84$ a $3{,}92$", "cuadruplicar")
# ---------- 20 ----------
se20 = 10 / sqrt(40); za, zb_ = zz(77, 75, se20), zz(74, 75, se20)
v.enunciado(20, ["\\mu=75", "\\sigma=10", "n=40"])
v.ok((round(se20, 4), za, zb_) == (1.5811, 1.26, -0.63) and 40 >= 30, "ej. 20")
add(20, 'a', "n=40\\ge30", "!=N(75;\\,1{,}5811)")
pp(20, 'b', "P(\\overline{X}>77)", "P(Z>1{,}26)", D4(1 - T(za)))
pp(20, 'c', "P(\\overline{X}<74)", "P(Z<-0{,}63)", D4(T(zb_)))
pp(20, 'd', "P(73<\\overline{X}<77)", "P(-1{,}26<Z<1{,}26)", D4(2 * T(za) - 1))
aviso("ej. 20b", 1 - T(za), 1 - pexacta(2 / se20))
aviso("ej. 20c", T(zb_), pexacta(-1 / se20))
aviso("ej. 20d", 2 * T(za) - 1, pexacta(2 / se20) - pexacta(-2 / se20))
# ---------- 21 ----------
ph21 = R(54, 100); se21 = ssqrt(ph21 * (1 - ph21) / 600); E21 = Z95 * se21; n21 = Z95**2 * ph21 * (1 - ph21) / R('0.02')**2
v.enunciado(21, ["600", "54\\,\\%"])
v.ok((round(float(se21), 4), round(float(E21), 4), round(float(ph21 - E21), 4), round(float(ph21 + E21), 4), round(float(n21), 2), ceiling(n21)) == (0.0203, 0.0399, 0.5001, 0.5799, 2385.63, 2386), "ej. 21")
add(21, 'a', "\\sqrt{\\frac{0{,}54\\cdot0{,}46}{600}}\\approx0{,}0203")
add(21, 'b', "E=1{,}96\\cdot0{,}0203\\approx0{,}0399", "!(0{,}54-0{,}0399;\\ 0{,}54+0{,}0399)=(0{,}5001;\\ 0{,}5799)")
add(21, 'c', "!entre el $50{,}01\\,\\%$ y el $57{,}99\\,\\%$", "!muy ajustada")
add(21, 'd', "\\frac{1{,}96^2\\cdot0{,}54\\cdot0{,}46}{0{,}02^2}=2385{,}63", "n=2386")
# ---------- 22 ----------
v.enunciado(22, ["n=100", "250", "\\sigma=20"])
E22a, E22b = Z95 * 2, Z90 * 2; n22 = (Z95 * 20 / 2)**2
v.ok((E22a, E22b, 2 * E22a, 2 * E22b, n22, ceiling(n22)) == (R('3.92'), R('3.29'), R('7.84'), R('6.58'), R('384.16'), 385), "ej. 22")
add(22, 'a', "E=1{,}96\\cdot2=3{,}92")
ic(22, 'a', 250, E22a)
add(22, 'b', "E=1{,}645\\cdot2=3{,}29")
ic(22, 'b', 250, E22b)
add(22, 'c', "!$7{,}84$ g al $95\\,\\%$", "!$6{,}58$ g al $90\\,\\%$")
add(22, 'd', "n\\ge\\left(\\frac{1{,}96\\cdot20}{2}\\right)^2=384{,}16", "n=385")
# ---------- 23 ----------
v.enunciado(23, ["\\sigma=3", "n=36", "7{,}5"])
iv = inversa(0.995)
v.ok(iv["cercano"] == [2.57, 2.58] and (iv["p1"], iv["p2"]) == (0.9949, 0.9951) and round(iv["interp"], 3) == 2.575 and R(3, 1) / 6 == R(1, 2), "ej. 23")
add(23, 'a', "\\frac{\\sigma}{\\sqrt n}=\\frac{3}{6}=0{,}5")
add(23, 'b', "=0{,}995", "\\Phi(2{,}57)=0{,}9949", "\\Phi(2{,}58)=0{,}9951")
for z, nom in ((R('2.57'), "2{,}57"), (R('2.58'), "2{,}58"), (R('2.575'), "2{,}575")):
    E_ = z * R(1, 2)
    add(23, 'c', f"E={nom}\\cdot0{{,}}5={D(E_)}")
    a_, b_ = R('7.5') - E_, R('7.5') + E_
    add(23, 'c', f"!({D(a_)};\\ {D(b_)})")
add(23, 'd', "!entre unos $6{,}2$ y $8{,}8$ minutos", "no es relevante")
# ---------- 24 ----------
v.enunciado(24, ["\\sigma=30", "5"])
n24a = (Z95 * 6)**2
v.ok(ceiling(n24a) == 139 and abs(n24a - R('138.2976')) == 0, "ej. 24a")
v.ok(dec(n24a, 2) == "138{,}30", "ej. 24a: 138,30")
add(24, 'a', "(1{,}96\\cdot6)^2=138{,}30", "n=139")
iv24 = inversa(0.95)
v.ok(iv24["cercano"] == [1.64, 1.65] and (iv24["p1"], iv24["p2"]) == (0.9495, 0.9505) and round(iv24["interp"], 3) == 1.645, "ej. 24b")
add(24, 'b', "=0{,}95", "\\Phi(1{,}64)=0{,}9495", "\\Phi(1{,}65)=0{,}9505")
for z, nom, valtxt in ((R('1.64'), "1{,}64", "96{,}83"), (R('1.65'), "1{,}65", "98{,}01"), (R('1.645'), "1{,}645", "97{,}42")):
    nn = (z * 6)**2
    v.ok(dec(nn, 2) == valtxt, f"ej. 24c: n con z={nom}")
    add(24, 'c', f"({nom}\\cdot6)^2={valtxt}", f"n={ceiling(nn)}")
n24d = (Z99 * 6)**2
v.ok(ceiling(n24d) == 239 and dec(n24d, 2) == "238{,}70", "ej. 24d")
add(24, 'd', "(2{,}575\\cdot6)^2=238{,}70", "n=239", "!$97$, $98$ y $99$")
# ---------- 25 ----------
p25, n25 = .08, 200; se25 = sqrt(p25 * (1 - p25) / n25); za, zb_ = zz(.12, p25, se25), zz(.05, p25, se25)
ph25 = R(1, 10); se25b = ssqrt(ph25 * (1 - ph25) / 200); E25 = Z95 * se25b
v.enunciado(25, ["8\\,\\%", "n=200", "10\\,\\%"])
v.ok((round(se25, 4), za, zb_, round(float(se25b), 4), round(float(E25), 4), round(float(ph25 - E25), 4), round(float(ph25 + E25), 4)) == (0.0192, 2.09, -1.56, 0.0212, 0.0416, 0.0584, 0.1416), "ej. 25")
add(25, 'a', "!=N(0{,}08;\\,0{,}0192)")
pp(25, 'b', "P(\\hat p>0{,}12)", "P(Z>2{,}09)", D4(1 - T(za)))
pp(25, 'c', "P(\\hat p<0{,}05)", "P(Z<-1{,}56)", D4(T(zb_)))
add(25, 'd', "\\hat p=0{,}1", "E=1{,}96\\cdot0{,}0212\\approx0{,}0416", "!(0{,}1-0{,}0416;\\ 0{,}1+0{,}0416)=(0{,}0584;\\ 0{,}1416)")
aviso("ej. 25b", 1 - T(za), 1 - pexacta((.12 - p25) / se25))
aviso("ej. 25c", T(zb_), pexacta((.05 - p25) / se25))
aviso("ej. 3b", 1 - T(1.6), 1 - pexacta(1.6))

# ---------- comprobación de todos los resultados en su apartado ----------
for (num, ap), frags in RES.items():
    n = CNT.get((num, ap), {})
    v.solucion(num, [(f, n[f]) if f in n else f for f in frags], ap)
v.fin()
informe()
