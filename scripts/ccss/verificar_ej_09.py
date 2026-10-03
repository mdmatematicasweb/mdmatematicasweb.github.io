#!/usr/bin/env python3
"""Verifica la relación de ejercicios ejercicios/2-bachillerato-ccss/09-probabilidad/index.qmd.

Cada ejercicio se resuelve aquí con fracciones exactas (sympy), sin mirar el texto; después se comprueba que (1) los datos
aparecen en el enunciado y (2) cada resultado calculado aparece en el bloque de su apartado de la solución escrita, con
recuento exacto y con mutación integrada. Ver scripts/ccss/_ej_comun.py. Estructura: 25 ejercicios, los PAU valen 2 puntos y
no tienen opción A/B.

Uso:  python scripts/ccss/verificar_ej_09.py     (requiere `pip install sympy`)
Termina con código 0 si todo coincide y con código 1 si algo falla.
"""
import sys
from decimal import Decimal
from itertools import product
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _ej_comun import Verificador, tx, dec  # noqa: E402
from sympy import Rational as R  # noqa: E402

QMD = Path(__file__).resolve().parents[2] / "ejercicios" / "2-bachillerato-ccss" / "09-probabilidad" / "index.qmd"
v = Verificador(QMD)
v.estructura(puntos=2, opciones=False)

# Recuentos explícitos de apariciones por apartado cuando un resultado se repite en el mismo bloque.
CNT = {(5, ''): {'P(A\\mid B)=0{,}5': 2}}
RES = {}


def add(num, ap, *frags):
    RES.setdefault((num, ap), []).extend(frags)


def dm(val):
    """Decimal exacto con coma y las cifras justas: 0,7 -> «0{,}7»; 1 -> «1»."""
    val = R(val)
    d = Decimal(val.p) / Decimal(val.q)
    s = format(d.normalize(), "f")
    return s.replace(".", "{,}")


def eqd(label, val):
    return f"{label}={dm(val)}"


def eqf(label, val):
    return f"{label}={tx(val)}"


def aprox(label, val, nd=3):
    return f"{label}\\approx{dec(val, nd)}"


# ---------- 1 ----------
pA, pB, pAB = R(5, 10), R(4, 10), R(2, 10)
v.enunciado(1, ["P(A)=0{,}5", "P(B)=0{,}4", "P(A\\cap B)=0{,}2"])
pU = pA + pB - pAB
v.ok(pU == R(7, 10) and 1 - pA == R(1, 2) and pA - pAB == R(3, 10) and 1 - pU == R(3, 10), "ej. 1")
add(1, 'a', eqd("P(A\\cup B)", pU))
add(1, 'b', eqd("P(A^C)", 1 - pA))
add(1, 'c', eqd("P(A-B)", pA - pAB))
add(1, 'd', eqd("P(A^C\\cap B^C)", 1 - pU))
# ---------- 2 ----------
pA, pB, pU = R(6, 10), R(5, 10), R(8, 10)
pAB = pA + pB - pU
v.enunciado(2, ["P(A)=0{,}6", "P(B)=0{,}5", "P(A\\cup B)=0{,}8"])
v.ok(pAB == R(3, 10) and 1 - pAB == R(7, 10) and 1 - pU == R(2, 10), "ej. 2")
add(2, 'a', eqd("P(A\\cap B)", pAB))
add(2, 'b', "A^C\\cup B^C=(A\\cap B)^C", eqd("P(A^C\\cup B^C)", 1 - pAB))
add(2, 'c', "A^C\\cap B^C=(A\\cup B)^C", eqd("P(A^C\\cap B^C)", 1 - pU))
# ---------- 3 ----------
dados = list(product(range(1, 7), repeat=2))
s8 = sum(1 for a, b in dados if a + b == 8); s10 = sum(1 for a, b in dados if a + b >= 10); s6 = sum(1 for a, b in dados if 6 in (a, b))
v.ok((len(dados), s8, s10, s6) == (36, 5, 6, 11), "ej. 3: recuento de casos")
v.enunciado(3, ["dos dados"])
add(3, 'a', eqf("P", R(s8, 36)))
add(3, 'b', eqf("P", R(s10, 36)))
add(3, 'c', eqf("P", R(s6, 36)))
# ---------- 4 ----------
v.enunciado(4, ["5 bolas rojas y 3 azules"])
c_rr = R(5, 8) * R(5, 8); s_rr = R(5, 8) * R(4, 7); s_d = R(5, 8) * R(3, 7) + R(3, 8) * R(5, 7)
v.ok((c_rr, s_rr, s_d) == (R(25, 64), R(5, 14), R(15, 28)), "ej. 4")
add(4, 'a', eqf("P(\\text{dos rojas})", c_rr))
add(4, 'b', eqf("P(\\text{dos rojas})", s_rr))
add(4, 'c', eqf("P(\\text{distinto color})", s_d))
# ---------- 5 ----------
pA, pB, pAB = R(5, 10), R(4, 10), R(2, 10)
v.enunciado(5, ["P(A)=0{,}5", "P(B)=0{,}4", "P(A\\cap B)=0{,}2"])
v.ok(pAB / pB == R(1, 2) and pAB / pA == R(2, 5) and pAB == pA * pB, "ej. 5: independientes")
add(5, '', eqd("P(A\\mid B)", pAB / pB), eqd("P(B\\mid A)", pAB / pA), "independientes")
# ---------- 6 ----------
pA, pB = R(3, 10), R(5, 10)
v.enunciado(6, ["P(A)=0{,}3", "P(B)=0{,}5"])
v.ok((pA * pB, pA + pB - pA * pB, (1 - pA) * pB) == (R(15, 100), R(65, 100), R(35, 100)), "ej. 6")
add(6, 'a', eqd("P(A\\cap B)", pA * pB))
add(6, 'b', eqd("P(A\\cup B)", pA + pB - pA * pB))
add(6, 'c', eqd("P(A^C\\cap B)", (1 - pA) * pB))
# ---------- 7 ----------
HF, HN, MF, MN = 30, 25, 20, 45
N7 = HF + HN + MF + MN
pF, pM, pFM = R(HF + MF, N7), R(MF + MN, N7), R(MF, N7)
v.enunciado(7, ["120", "federad"])
v.ok(N7 == 120 and (pF, pM, pFM) == (R(5, 12), R(13, 24), R(1, 6)) and pFM / pM == R(4, 13) and pFM / pF == R(2, 5) and pFM != pF * pM and pF * pM == R(65, 288), "ej. 7")
add(7, 'a', eqf("P(F)", pF), eqf("P(M)", pM))
add(7, 'b', eqf("P(F\\cap M)", pFM))
add(7, 'c', eqf("P(F\\mid M)", pFM / pM), eqf("P(M\\mid F)", pFM / pF))
add(7, 'd', "\\frac{65}{288}", "no son independientes")
# ---------- 8 ----------
pR = R(1, 2) * R(3, 5) + R(1, 2) * R(1, 5)
v.enunciado(8, ["3 bolas rojas y 2 blancas", "1 roja y 4 blancas"])
v.ok(pR == R(2, 5), "ej. 8")
add(8, '', eqf("P(R)", pR))
# ---------- 9 ----------
p9 = R(1, 2) * R(3, 5) / pR
v.enunciado(9, ["ejercicio 8"])
v.ok(p9 == R(3, 4), "ej. 9")
add(9, '', eqf("P(U_1\\mid R)", p9))


# ---------- utilidades Bayes ----------
def total_bayes(priors, probs):
    tot = sum(a * b for a, b in zip(priors, probs))
    return tot, [a * b / tot for a, b in zip(priors, probs)]


# ---------- 10 ----------
pri10 = [R(50, 100), R(30, 100), R(20, 100)]; d10 = [R(2, 100), R(3, 100), R(6, 100)]
t10, post10 = total_bayes(pri10, d10)
v.enunciado(10, ["50\\,\\%", "30\\,\\%", "20\\,\\%", "6\\,\\%"])
v.ok(t10 == R(31, 1000) and post10 == [R(10, 31), R(9, 31), R(12, 31)] and max(post10) == post10[2], "ej. 10: M3 es el origen más probable")
add(10, 'a', "0{,}5\\cdot0{,}02+0{,}3\\cdot0{,}03+0{,}2\\cdot0{,}06=0{,}010+0{,}009+0{,}012=" + dm(t10))
add(10, 'b', eqf("P(M_1\\mid D)", post10[0]), aprox("P(M_1\\mid D)", post10[0]))
add(10, 'c', eqf("P(M_3\\mid D)", post10[2]), aprox("P(M_3\\mid D)", post10[2]), aprox("P(M_2\\mid D)", post10[1]), "!El origen más probable es $M_3$")
add(10, 'd', "!sube al $38{,}7\\,\\%$", "a priori", "a posteriori")
# ---------- 11 ----------
pre, sen, fp = R(1, 100), R(9, 10), R(5, 100)
pP = pre * sen + (1 - pre) * fp
pEP = pre * sen / pP
pEN = pre * (1 - sen) / (1 - pP)
v.enunciado(11, ["1\\,\\%", "90\\,\\%", "5\\,\\%"])
v.ok(pP == R(117, 2000) and pEP == R(2, 13) and pEN == R(2, 1883), "ej. 11")
add(11, 'a', "P(P)=0{,}01\\cdot0{,}9+0{,}99\\cdot0{,}05=0{,}009+0{,}0495=" + dm(pP))
add(11, 'b', eqf("P(E\\mid P)", pEP), aprox("P(E\\mid P)", pEP))
add(11, 'c', aprox("P(E\\mid P^C)", pEN, 4))
add(11, 'd', "!el $15{,}4\\,\\%$ de los positivos", "confirmar", "!apenas el $0{,}11\\,\\%$")
# ---------- 12 ----------
pA, pB, pU = R(55, 100), R(40, 100), R(70, 100)
pAB = pA + pB - pU
v.enunciado(12, ["P(A)=0{,}55", "P(B)=0{,}4", "P(A\\cup B)=0{,}7"])
v.ok((pAB, pA - pAB, 1 - pU, pA * pB) == (R(25, 100), R(3, 10), R(3, 10), R(22, 100)) and pA * pB != pAB, "ej. 12")
add(12, 'a', eqd("P(A\\cap B)", pAB))
add(12, 'b', eqd("P(A-B)", pA - pAB))
add(12, 'c', eqd("P(A^C\\cap B^C)", 1 - pU))
add(12, 'd', "0{,}55\\cdot0{,}4=" + dm(pA * pB), "no son independientes")
# ---------- 13 ----------
UC, UP, RC, RP = 80, 170, 190, 60
N13 = UC + UP + RC + RP
pC, pUu = R(UC + RC, N13), R(UC + UP, N13)
v.enunciado(13, ["500", "80 viven en zona urbana"])
v.ok(N13 == 500 and (pC, pUu) == (R(54, 100), R(1, 2)) and R(UC, UC + UP) == R(32, 100) and R(RC, RC + RP) == R(76, 100) and R(UC, N13) == R(16, 100) and pC * pUu == R(27, 100), "ej. 13")
add(13, 'a', eqd("P(C)", pC), eqd("P(U)", pUu))
add(13, 'b', eqd("P(C\\mid U)", R(UC, UC + UP)), eqd("P(C\\mid U^C)", R(RC, RP + RC)))
add(13, 'c', eqd("P(C\\cap U)", R(UC, N13)), "0{,}54\\cdot0{,}5=" + dm(pC * pUu), "no son independientes")
add(13, 'd', "!solo el $32\\,\\%$", "!frente al $76\\,\\%$")
# ---------- 14 ----------
vv, aa = R(4, 6), R(2, 6)
a14 = vv * R(3, 5); b14 = vv * R(2, 5) + aa * R(4, 5); c14 = 1 - a14; d14 = aa * R(1, 5)
v.enunciado(14, ["4 bolas verdes y 2 amarillas", "sin reemplazamiento"])
v.ok((a14, b14, c14, d14) == (R(2, 5), R(8, 15), R(3, 5), R(1, 15)) and a14 + b14 + d14 == 1, "ej. 14")
add(14, 'a', eqf("P(\\text{dos verdes})", a14))
add(14, 'b', eqf("P(\\text{distinto color})", b14))
add(14, 'c', eqf("P(\\text{al menos una amarilla})", c14))
add(14, 'd', eqf("P(\\text{dos amarillas})", d14), "\\frac{6+8+1}{15}=1")
# ---------- 15 ----------
a15, b15 = R(9, 10), R(85, 100)
v.enunciado(15, ["0{,}9", "0{,}85"])
v.ok((a15 * b15, 1 - (1 - a15) * (1 - b15), a15 * (1 - b15) + (1 - a15) * b15, (1 - a15) * (1 - b15)) == (R(765, 1000), R(985, 1000), R(22, 100), R(15, 1000)), "ej. 15")
add(15, 'a', f"P(\\text{{ambos}})=0{{,}}9\\cdot0{{,}}85={dm(a15 * b15)}")
add(15, 'b', f"P(\\text{{al menos uno}})=1-P(\\text{{ninguno}})=1-0{{,}}1\\cdot0{{,}}15={dm(1 - (1 - a15) * (1 - b15))}")
add(15, 'c', f"P(\\text{{exactamente uno}})=0{{,}}9\\cdot0{{,}}15+0{{,}}1\\cdot0{{,}}85=0{{,}}135+0{{,}}085={dm(a15 * (1 - b15) + (1 - a15) * b15)}")
add(15, 'd', f"0{{,}}1\\cdot0{{,}}15={dm((1 - a15) * (1 - b15))}")
# ---------- 16 ----------
t16, post16 = total_bayes([R(60, 100), R(40, 100)], [R(10, 100), R(25, 100)])
v.enunciado(16, ["60\\,\\%", "40\\,\\%", "10\\,\\%", "25\\,\\%"])
v.ok(t16 == R(16, 100) and post16 == [R(3, 8), R(5, 8)] and 1 - t16 == R(84, 100), "ej. 16")
add(16, 'a', "P(R)=0{,}6\\cdot0{,}1+0{,}4\\cdot0{,}25=0{,}06+0{,}10=" + dm(t16))
add(16, 'b', eqd("P(A_1\\mid R)", post16[0]))
add(16, 'c', eqd("P(A_2\\mid R)", post16[1]))
add(16, 'd', eqd("P(R^C)", 1 - t16))
# ---------- 17 ----------
nA, nB, nAB, N17 = 150, 120, 60, 300
pA, pB, pAB = R(nA, N17), R(nB, N17), R(nAB, N17)
pU = pA + pB - pAB
v.enunciado(17, ["300", "150", "120", "60"])
v.ok((pU, 1 - pU, pA - pAB, pAB / pB, pA * pB) == (R(7, 10), R(3, 10), R(3, 10), R(1, 2), R(1, 5)) and pA * pB == pAB, "ej. 17: independientes")
add(17, 'a', eqd("P(A\\cup B)", pU), "!$1-0{,}7=0{,}3$")
add(17, 'b', eqd("P(A-B)", pA - pAB))
add(17, 'c', eqd("P(A\\mid B)", pAB / pB))
add(17, 'd', "0{,}5\\cdot0{,}4=" + dm(pA * pB), "son independientes")
# ---------- 18 ----------
pRr, pOo, pRO, pF_O, pF = R(4, 40), R(10, 40), R(1, 40), R(3, 10), R(12, 40)
v.enunciado(18, ["40 cartas"])
v.ok((pRr, pOo, pRO, pF_O, pF) == (R(1, 10), R(1, 4), R(1, 40), R(3, 10), R(3, 10)) and pRr * pOo == pRO and R(4, 40) * R(3, 39) == R(1, 130), "ej. 18")
add(18, 'a', eqf("P(R)", pRr), eqf("P(O)", pOo))
add(18, 'b', eqf("P(R\\cap O)", pRO), "\\frac{1}{10}\\cdot\\frac{1}{4}=\\frac{1}{40}", "son independientes")
add(18, 'c', eqf("P(F\\mid O)", pF_O), "P(F)=\\frac{12}{40}=\\frac{3}{10}")
add(18, 'd', "P(\\text{dos reyes})=\\frac{4}{40}\\cdot\\frac{3}{39}=\\frac{1}{130}")
# ---------- 19 ----------
t19, post19 = total_bayes([R(60, 100), R(30, 100), R(10, 100)], [R(1, 100), R(4, 100), R(15, 100)])
v.enunciado(19, ["60\\,\\%", "30\\,\\%", "10\\,\\%", "0{,}01", "0{,}04", "0{,}15"])
v.ok(t19 == R(33, 1000) and post19 == [R(2, 11), R(4, 11), R(5, 11)], "ej. 19")
add(19, 'a', "P(S)=0{,}6\\cdot0{,}01+0{,}3\\cdot0{,}04+0{,}1\\cdot0{,}15=0{,}006+0{,}012+0{,}015=" + dm(t19))
add(19, 'b', eqf("P(\\text{alto}\\mid S)", post19[2]), aprox("P(\\text{alto}\\mid S)", post19[2]))
add(19, 'c', eqf("P(\\text{bajo}\\mid S)", post19[0]), aprox("P(\\text{bajo}\\mid S)", post19[0]))
add(19, 'd', "a priori", "a posteriori", "!suben al $45{,}5\\,\\%$")
# ---------- 20 ----------
p20 = R(7, 10)
v.enunciado(20, ["0{,}7", "tres tiros libres"])
v.ok((p20**3, (1 - p20)**3, 1 - (1 - p20)**3, 3 * p20**2 * (1 - p20)) == (R(343, 1000), R(27, 1000), R(973, 1000), R(441, 1000)), "ej. 20")
add(20, 'a', eqd("P(\\text{tres})", p20**3).replace("P(\\text{tres})=", "P(\\text{tres})=0{,}7^3="))
add(20, 'b', eqd("P(\\text{ninguno})", (1 - p20)**3).replace("P(\\text{ninguno})=", "P(\\text{ninguno})=0{,}3^3="))
add(20, 'c', eqd("P(\\text{al menos uno})", 1 - (1 - p20)**3).replace("P(\\text{al menos uno})=", "P(\\text{al menos uno})=1-0{,}027="))
add(20, 'd', "P(\\text{dos})=3\\cdot0{,}7^2\\cdot0{,}3=" + dm(3 * p20**2 * (1 - p20)))
# ---------- 21 ----------
pl, pa1, pa0 = R(3, 10), R(8, 10), R(1, 10)
pV = pl * pa1 + (1 - pl) * pa0
pLV = pl * pa1 / pV
pLN = pl * (1 - pa1) / (1 - pV)
v.enunciado(21, ["0{,}3", "80\\,\\%", "10\\,\\%"])
v.ok((pV, pLV, pLN) == (R(31, 100), R(24, 31), R(2, 23)), "ej. 21")
add(21, 'a', "P(V)=0{,}3\\cdot0{,}8+0{,}7\\cdot0{,}1=0{,}24+0{,}07=" + dm(pV))
add(21, 'b', eqf("P(L\\mid V)", pLV), aprox("P(L\\mid V)", pLV))
add(21, 'c', eqf("P(L\\mid V^C)", pLN), aprox("P(L\\mid V^C)", pLN))
add(21, 'd', "!conviene llevar paraguas", "!Sin aviso, solo con probabilidad $0{,}087$")
# ---------- 22 ----------
pA, pB = R(3, 10), R(45, 100)
v.enunciado(22, ["incompatibles", "P(A)=0{,}3", "P(B)=0{,}45"])
v.ok((pA + pB, 1 - pA - pB, pA * pB) == (R(75, 100), R(25, 100), R(135, 1000)), "ej. 22")
add(22, 'a', eqd("P(A\\cup B)", pA + pB).replace("P(A\\cup B)=", "P(A\\cup B)=0{,}3+0{,}45="))
add(22, 'b', eqd("P(A^C\\cap B^C)", 1 - pA - pB))
add(22, 'c', "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}=\\frac{0}{0{,}45}=0")
add(22, 'd', "0{,}3\\cdot0{,}45=" + dm(pA * pB), "no son independientes")
# ---------- 23 ----------
f1, f2 = R(6, 10), R(5, 10)
pH = f1 * f2
v.enunciado(23, ["60\\,\\%", "0{,}5"])
v.ok((pH, 1 - pH, f1 * (1 - f2) / (1 - pH)) == (R(3, 10), R(7, 10), R(3, 7)), "ej. 23")
add(23, 'a', "P(H)=0{,}6\\cdot0{,}5=" + dm(pH))
add(23, 'b', "P(H^C)=1-0{,}3=" + dm(1 - pH))
add(23, 'c', eqf("P(F_1\\mid H^C)", R(3, 7)), aprox("P(F_1\\mid H^C)", R(3, 7)))
add(23, 'd', "!el $42{,}9\\,\\%$", "!el $57{,}1\\,\\%$")
# ---------- 24 ----------
pA, pB, pU = R(7, 10), R(6, 10), R(9, 10)
pAB = pA + pB - pU
v.enunciado(24, ["P(A)=0{,}7", "P(B)=0{,}6", "P(A\\cup B)=0{,}9"])
v.ok((pAB, 1 - pU, 1 - pAB, pB - pAB, pA * pB) == (R(4, 10), R(1, 10), R(6, 10), R(2, 10), R(42, 100)), "ej. 24")
add(24, 'a', eqd("P(A\\cap B)", pAB))
add(24, 'b', eqd("P(A^C\\cap B^C)", 1 - pU))
add(24, 'c', "A^C\\cup B^C=(A\\cap B)^C", eqd("P(A^C\\cup B^C)", 1 - pAB).replace("P(A^C\\cup B^C)=", "P(A^C\\cup B^C)=1-0{,}4="))
add(24, 'd', eqd("P(B-A)", pB - pAB), "0{,}7\\cdot0{,}6=" + dm(pA * pB), "no son independientes")
# ---------- 25 ----------
t25, post25 = total_bayes([R(40, 100), R(60, 100)], [R(15, 100), R(5, 100)])
v.enunciado(25, ["40\\,\\%", "60\\,\\%", "15\\,\\%", "5\\,\\%"])
v.ok(t25 == R(9, 100) and post25 == [R(2, 3), R(1, 3)] and 1 - t25 == R(91, 100), "ej. 25")
add(25, 'a', "P(D)=0{,}4\\cdot0{,}15+0{,}6\\cdot0{,}05=0{,}06+0{,}03=" + dm(t25))
add(25, 'b', eqf("P(I\\mid D)", post25[0]), aprox("P(I\\mid D)", post25[0]))
add(25, 'c', eqf("P(I^C\\mid D)", post25[1]), aprox("P(I^C\\mid D)", post25[1]))
add(25, 'd', eqd("P(D^C)", 1 - t25).replace("P(D^C)=", "P(D^C)=1-0{,}09="))

# ---------- comprobación de todos los resultados en su apartado ----------
for (num, ap), frags in RES.items():
    n = CNT.get((num, ap), {})
    v.solucion(num, [(f, n[f]) if f in n else f for f in frags], ap)
v.fin()
