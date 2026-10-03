#!/usr/bin/env python3
"""Verifica la relación de ejercicios ejercicios/2-bachillerato-ccss/03-programacion-lineal/index.qmd.

Cada problema se resuelve aquí con un resolutor propio (vértices = cortes de pares de rectas que cumplen todas las
restricciones; óptimo = mejor vértice), contrastado con una búsqueda independiente por fuerza bruta sobre una malla de
puntos. Después se comprueba que los datos aparecen en el enunciado y los resultados en la solución escrita.
Ver scripts/ccss/_ej_comun.py.

Uso:  python scripts/ccss/verificar_ej_03.py     (requiere `pip install sympy`)
Termina con código 0 si todo coincide y con código 1 en cuanto algo falla.
"""
import sys
from itertools import combinations
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _ej_comun import Verificador, tx, dec  # noqa: E402
from sympy import Rational as R  # noqa: E402

QMD = Path(__file__).resolve().parents[2] / "ejercicios" / "2-bachillerato-ccss" / "03-programacion-lineal" / "index.qmd"
v = Verificador(QMD)
v.estructura()

# Recuentos explícitos de apariciones por apartado cuando un resultado se repite en el mismo bloque (p. ej. un vértice
# que sale en la lista de vértices, en F(vértice)=… y en la conclusión). Fijarlos hace que alterar UNA aparición falle.
CNT = {
    (1, ''): {'(0,4)': 2, '(0,6)': 2, '(2,0)': 2, '(6,0)': 2},
    (2, ''): {'(0,0)': 2, '(0,5)': 2, '(4,3)': 3, '(5,0)': 2},
    (3, ''): {'(0,4)': 2, '(0,5)': 2, '(4,0)': 3, '(6,0)': 2, '(6,5)': 2},
    (5, ''): {'(4,0)': 2, '(0,2)': 2},
    (6, ''): {'(0,0)': 2, '(0,4)': 2, '(1,4)': 3, '(4,0)': 2, '(4,1)': 3},
    (7, ''): {'(0,3)': 3, '(3,0)': 2},
    (8, ''): {'(0,0)': 2, '(0,20)': 2, '(20,0)': 2, '(20,10)': 2},
    (15, 'b'): {'(0,4)': 2, '(0,12)': 2, '1482{,}93': 2},
    (15, 'd'): {'(6,3)': 2},
    (19, 'b'): {'k\\le3': 2},
}


def sol(k, frags, ap=""):
    n = CNT.get((k, ap), {})
    v.solucion(k, [(f, n.get(f, 1)) if isinstance(f, str) else f for f in frags], ap)

NN = [(1, 0, '>=', 0), (0, 1, '>=', 0)]


def cumple(cons, p):
    for a, b, s, c in cons:
        val = a * p[0] + b * p[1]
        if (s == '<=' and val > c) or (s == '>=' and val < c) or (s == '==' and val != c):
            return False
    return True


def vertices(cons):
    """Cortes de pares de rectas que cumplen todas las restricciones."""
    V = set()
    for (a1, b1, _, c1), (a2, b2, _, c2) in combinations(cons, 2):
        d = a1 * b2 - a2 * b1
        if d == 0:
            continue
        p = (R(c1 * b2 - c2 * b1, d), R(a1 * c2 - a2 * c1, d))
        if cumple(cons, p):
            V.add(p)
    return sorted(V)


def malla(cons, F, paso=R(1, 2), limite=300, sentido='max'):
    """Mejor valor de F entre los puntos de una malla de paso `paso` (comprobación independiente de los vértices)."""
    n = int(limite / paso)
    vals = [F(R(i) * paso, R(j) * paso) for i in range(n + 1) for j in range(n + 1) if cumple(cons, (R(i) * paso, R(j) * paso))]
    return (max if sentido == 'max' else min)(vals) if vals else None


def pt(p):
    return f"({tx(p[0])},{tx(p[1])})"


def fv(F, p, fmt=None):
    val = F(*p)
    return f"F{pt(p)}={fmt(val) if fmt else tx(val)}"


def inter(cons):
    """Puntos de corte con los ejes de cada recta a·x+b·y=c de las restricciones (las que no pasan por el origen)."""
    pts = []
    for a_, b_, _, c_ in cons:
        if c_ != 0 and a_ != 0 and b_ != 0:
            pts += [(R(c_, a_), 0), (0, R(c_, b_))]
    return pts


def resolver(num, cons, F, sentido, enun, extra=None, fmt=None, grid_limit=None, esperado=None, ap_v="", ap_f=None):
    """Resuelve, contrasta con la malla y comprueba el texto. Devuelve (vértices, valor óptimo, vértices óptimos)."""
    V = vertices(cons)
    vals = [F(*p) for p in V]
    opt = (max if sentido == 'max' else min)(vals)
    ops = [p for p in V if F(*p) == opt]
    g = malla(cons, F, limite=grid_limit or 250, sentido=sentido)
    v.ok(g is not None and ((g <= opt) if sentido == 'max' else (g >= opt)), f"ej. {num}: ningún punto de la malla mejora el óptimo {opt}")
    if esperado is not None:
        v.ok((opt, ops) == esperado, f"ej. {num}: óptimo esperado {esperado}, calculado {(opt, ops)}")
    v.enunciado(num, enun)
    ap_f = ap_v if ap_f is None else ap_f
    por = {}
    por.setdefault(ap_v, []).extend(pt(p) for p in V)
    por.setdefault(ap_f, []).extend(fv(F, p, fmt) for p in V)
    for key, fr in (extra if isinstance(extra, dict) else {ap_v: list(extra or [])}).items():
        por.setdefault(key, []).extend(fr)
    for key, fr in por.items():
        sol(num, fr, key)
    return V, opt, ops


# 1: solo región
C1 = [(1, 1, '<=', 6), (2, 1, '>=', 4)] + NN
V1 = vertices(C1)
v.ok(V1 == sorted([(2, 0), (6, 0), (0, 6), (0, 4)]), "ej. 1: vértices")
v.enunciado(1, ["x+y\\le6", "2x+y\\ge4"])
sol(1, [pt(p) for p in V1] + ["(-2,8)"])
# 2
resolver(2, [(1, 2, '<=', 10), (3, 1, '<=', 15)] + NN, lambda x, y: 3 * x + 2 * y, 'max', ["x+2y\\le10", "3x+y\\le15", "F(x,y)=3x+2y"], esperado=(18, [(4, 3)]))
# 3
resolver(3, [(1, 1, '>=', 4), (1, 0, '<=', 6), (0, 1, '<=', 5)] + NN, lambda x, y: 2 * x + 5 * y, 'min', ["x+y\\ge4", "x\\le6", "y\\le5"], esperado=(8, [(4, 0)]))
# 4
C4 = [(1, 1, '>=', 2), (1, -1, '<=', 2), (1, 1, '<=', 6)] + NN
V4 = vertices(C4)
v.ok(V4 == sorted([(0, 2), (2, 0), (4, 2), (0, 6)]), "ej. 4: vértices")
v.ok(not cumple(C4, (6, 0)) and not cumple(C4, (0, -2)), "ej. 4: (6,0) y (0,-2) no son vértices")
v.enunciado(4, ["x+y\\ge2", "x-y\\le2", "x+y\\le6"])
sol(4, [pt(p) for p in V4] + ["(6,0)", "(0,-2)"])
# 5
V5 = [(0, 0), (4, 0), (3, 3), (0, 2)]
F5 = lambda x, y: 4 * x - y
v.ok(max(F5(*p) for p in V5) == 16 and min(F5(*p) for p in V5) == -2, "ej. 5: máximo 16 y mínimo -2")
v.enunciado(5, ["(0,0)", "(4,0)", "(3,3)", "(0,2)"])
sol(5, [fv(F5, p) for p in V5] + ["(4,0)", "(0,2)"])
# 6
C6 = [(1, 1, '<=', 5), (1, 0, '<=', 4), (0, 1, '<=', 4)] + NN
V6, o6, p6 = resolver(6, C6, lambda x, y: 2 * x + 2 * y, 'max', ["x+y\\le5", "x\\le4", "y\\le4"], esperado=(10, [(1, 4), (4, 1)]))
v.ok(all(2 * x + 2 * (5 - x) == 10 and cumple(C6, (R(x), 5 - R(x))) for x in range(1, 5)), "ej. 6: todo el segmento x+y=5 con 1≤x≤4 es óptimo")
# 7
C7 = [(1, 1, '>=', 3)] + NN
V7 = vertices(C7)
F7 = lambda x, y: 2 * x + y
v.ok(V7 == [(0, 3), (3, 0)] and min(F7(*p) for p in V7) == 3 and F7(1000, 0) == 2000 and cumple(C7, (1000, 0)), "ej. 7: mín 3 en (0,3); sin máximo")
v.enunciado(7, ["x+y\\ge3"])
sol(7, [pt(p) for p in V7] + [fv(F7, p) for p in V7] + ["(1000,0)", "2000"])
# 8
resolver(8, [(1, 2, '<=', 40), (1, 0, '<=', 20)] + NN, lambda x, y: 8 * x + 12 * y, 'max', ["8 €", "12 €", "40 horas", "20 bolsos"], esperado=(280, [(20, 10)]))
# 9
C9 = [(1, 1, '<=', 2), (1, 1, '>=', 5)] + NN
v.ok(vertices(C9) == [] and malla(C9, lambda x, y: x + y, limite=20) is None, "ej. 9: región vacía")
v.enunciado(9, ["x+y\\le2", "x+y\\ge5"])
sol(9, ["vacía", "no tiene solución"])
# 10
C10 = [(3, 2, '>=', 30), (1, 2, '>=', 14)] + NN
F10 = lambda x, y: R(9, 10) * x + R(12, 10) * y
resolver(10, C10, F10, 'min', ["0,90", "1,20", "30 unidades", "14"], fmt=lambda val: dec(val, 1) if val.q != 1 else str(val),
         extra={'a': ["3x+2y\\ge30", "x+2y\\ge14", "0{,}9x+1{,}2y"], 'b': [pt(q) for q in inter(C10)],
                'd': ["3\\cdot8+2\\cdot3=30", "8+2\\cdot3=14", "10{,}8 €"]}, esperado=(R(54, 5), [(8, 3)]), grid_limit=60, ap_v='c', ap_f='d')
# 11
C11 = [(1, 2, '<=', 40), (3, 1, '<=', 60)] + NN
F11 = lambda x, y: 30 * x + 50 * y
resolver(11, C11, F11, 'max', ["40 horas de carpintería", "60 de barnizado", "30 €", "50 €"], extra={'a': ["x+2y\\le40", "3x+y\\le60"], 'd': ["16+2\\cdot12=40", "3\\cdot16+12=60"]}, esperado=(1080, [(16, 12)]), ap_v='b', ap_f='c')
# 12 A y B
C12a = [(2, 1, '<=', 60), (1, 1, '<=', 50), (1, 0, '<=', 25)] + NN
resolver(12, C12a, lambda x, y: 20 * x + 15 * y, 'max', ["2x+y\\le60", "x+y\\le50", "x\\le25"], esperado=(800, [(10, 40)]),
         extra={'A.a': ["2x+y=60", "x+y=50", "x=25"] + [pt(q) for q in [(30, 0), (0, 60), (50, 0), (0, 50)]]}, ap_v='A.b', ap_f='A.c')
C12b = [(1, 1, '>=', 8), (2, 1, '>=', 12)] + NN
F12b = lambda x, y: R(3, 2) * x + 2 * y
V12b = vertices(C12b)
o12 = min(F12b(*p) for p in V12b)
v.ok(o12 == 12 and [p for p in V12b if F12b(*p) == o12] == [(8, 0)] and malla(C12b, F12b, limite=40, sentido='min') >= o12, "ej. 12B: mínimo 12 en (8,0)")
v.enunciado(12, ["2x+y\\ge12", "1,5", "al menos 8"])
sol(12, ["F(x,y)=1{,}5x+2y", "x+y\\ge8", "2x+y\\ge12", "x+y=8", "2x+y=12"], 'B.a')
sol(12, [pt(p) for p in V12b], 'B.b')
sol(12, [fv(F12b, p, lambda val: dec(val, 1) if val.q != 1 else str(val)) for p in V12b if p != (8, 0)] + ["F(8,0)=12"], 'B.c')
# 13
C13 = [(1, 1, '>=', 10), (1, 3, '>=', 18)] + NN
F13 = lambda x, y: 60 * x + 80 * y
resolver(13, C13, F13, 'min', ["60 €", "80 €", "x+3y\\ge18"], extra={'a': ["x+y\\ge10", "x+3y\\ge18"], 'd': ["F(1000,0)=60000"]}, esperado=(680, [(6, 4)]), grid_limit=60, ap_v='b', ap_f='c')
v.ok(cumple(C13, (1000, 0)) and F13(1000, 0) == 60000, "ej. 13: región no acotada, F(1000,0)=60000")
# 14
C14 = [(1, 2, '<=', 12), (1, 0, '<=', 8)] + NN
V14, o14, p14 = resolver(14, C14, lambda x, y: 3 * x + 6 * y, 'max', ["x+2y\\le12", "x\\le8"], esperado=(36, [(0, 6), (8, 2)]), ap_v='a', ap_f='b')
v.ok(cumple(C14, (4, 4)) and 3 * 4 + 6 * 4 == 36, "ej. 14: (4,4) es factible y óptimo")
sol(14, ["F(4,4)=36", "(8,2)", "(0,6)", "x+2y=12"], 'c')
v.ok(all(3 * xx + 6 * yy == 3 * (xx + 2 * yy) for xx in range(0, 9) for yy in range(0, 7)), "ej. 14d: 3x+6y = 3(x+2y), la recta de nivel es paralela a x+2y=12")
sol(14, ["3x+6y=3(x+2y)"], 'd')
# 15
C15 = [(9, 50, '>=', 200), (1, 1, '<=', 12)] + NN
F15 = lambda x, y: 60 * x + 400 * y
V15 = vertices(C15)
v.ok(V15 == sorted([(0, 4), (0, 12), (R(400, 41), R(92, 41))]), "ej. 15: vértices")
v.ok(min(F15(*p) for p in V15) == R(60800, 41) and not all(c.is_integer for c in (R(400, 41), R(92, 41))), "ej. 15: óptimo real fraccionario 60800/41")
ent = min((F15(x, y), x, y) for x in range(0, 13) for y in range(0, 13) if cumple(C15, (x, y)))
v.ok(ent == (1560, 6, 3), "ej. 15: óptimo entero (6,3) con 1560")
v.enunciado(15, ["9 plazas", "60 €", "50 plazas", "400 €", "200 personas", "12 vehículos"])
sol(15, ["9x+50y\\ge200", "x+y\\le12", "F(x,y)=60x+400y"], 'a')
sol(15, ["(0,4)", "(0,12)", "(\\frac{400}{41},\\frac{92}{41})", "F(0,4)=1600", "F(0,12)=4800", "\\frac{60800}{41}", dec(R(60800, 41), 2)], 'b')
sol(15, [f"x={tx(R(400, 41))}\\approx{dec(R(400, 41), 2)}", f"y={tx(R(92, 41))}\\approx{dec(R(92, 41), 2)}"], 'c')
sol(15, ["F(6,3)=1560", "(6,3)", "(0,4)", "1600"], 'd')
# 16
C16 = [(2, 1, '<=', 100), (1, 1, '<=', 70), (1, 0, '<=', 45)] + NN
V16, o16, _ = resolver(16, C16, lambda x, y: 40 * x + 25 * y, 'max', ["40 €", "25 €", "100 horas", "70 horas", "45 oficinas"], extra={'a': ["2x+y\\le100", "x+y\\le70", "x\\le45"]}, esperado=(2200, [(30, 40)]), ap_v='b', ap_f='c')
F16b = lambda x, y: 20 * x + 25 * y
v.ok(max(F16b(*p) for p in V16) == 1750 and [p for p in V16 if F16b(*p) == 1750] == [(0, 70)], "ej. 16d: con 20 € el máximo pasa a (0,70)")
sol(16, [fv(F16b, p) for p in V16], 'd')
# 17
C17 = [(2, 1, '<=', 60), (1, 3, '<=', 75), (0, 1, '<=', 20)] + NN
V17, o17, _ = resolver(17, C17, lambda x, y: 40 * x + 30 * y, 'max', ["60 kg de harina", "75 horas", "20 bizcochos"], extra={'a': ["2x+y\\le60", "x+3y\\le75", "y\\le20"], 'c': ["2\\cdot21+18=60", "21+3\\cdot18=75"]}, esperado=(1380, [(21, 18)]), ap_v='a', ap_f='b')
v.ok(2 * 21 + 18 == 60 and 21 + 3 * 18 == 75 and 20 - 18 == 2, "ej. 17: se agotan harina y horas; sobran 2 bizcochos")
sol(17, ["sobran $2$ bizcochos"], 'd')
# 18
C18 = [(1, 2, '<=', 10), (3, 1, '<=', 15)] + NN
V18 = vertices(C18)
v.ok(V18 == sorted([(0, 0), (5, 0), (0, 5), (4, 3)]), "ej. 18: vértices")
F18a, F18b = (lambda x, y: 3 * x + 2 * y), (lambda x, y: x + 3 * y)
v.ok(max(F18a(*p) for p in V18) == 18 and max(F18b(*p) for p in V18) == 15, "ej. 18: máximos 18 y 15")
v.enunciado(18, ["x+2y\\le10", "3x+y\\le15", "F_1(x,y)=3x+2y", "F_2(x,y)=x+3y"])
sol(18, [pt(p) for p in V18], 'a')
sol(18, [f"F_1{pt(p)}={F18a(*p)}" for p in V18], 'b')
sol(18, [f"F_2{pt(p)}={F18b(*p)}" for p in V18], 'c')
# 19
k = R(1)
Vk = [(0, 0), (5, 0), (4, 3), (0, 5)]
def donde_max(kv):
    vals = {p: kv * p[0] + p[1] for p in Vk}
    m_ = max(vals.values())
    return [p for p in vals if vals[p] == m_]
ok19 = all(((4, 3) in donde_max(R(i, 20))) == (R(1, 2) <= R(i, 20) <= 3) for i in range(1, 101))
v.ok(ok19 and donde_max(R(5)) == [(5, 0)] and donde_max(R(1, 4)) == [(0, 5)] and set(donde_max(R(1, 2))) == {(0, 5), (4, 3)} and set(donde_max(R(3))) == {(4, 3), (5, 0)}, "ej. 19: (4,3) es óptimo exactamente si 1/2 ≤ k ≤ 3")
v.enunciado(19, ["F(x,y)=kx+y"])
sol(19, ["F(5,0)=5k", "F(4,3)=4k+3", "F(0,5)=5"], 'a')
sol(19, ["k\\le3", "k\\ge\\frac12"], 'b')
sol(19, ["F(5,0)=25", "F(4,3)=23", "F(0,5)=5", "F(4,3)=4"], 'c')
# 20
V20 = [(0, 0), (6, 0), (4, 3), (0, 5)]
C20 = [(3, 2, '<=', 18), (1, 2, '<=', 10)] + NN
v.ok(sorted(vertices(C20)) == sorted(V20), "ej. 20: las inecuaciones dan el cuadrilátero")
F20 = lambda x, y: 5 * x + 4 * y
v.ok(cumple(C20, (3, 3)) and F20(3, 3) == 27 and max(F20(*p) for p in V20) == 32, "ej. 20: (3,3) pertenece y F=27<32")
v.enunciado(20, ["(0,0)", "(6,0)", "(4,3)", "(0,5)"])
sol(20, ["3x+2y=18", "x+2y=10"], 'a')
sol(20, [fv(F20, p) for p in V20], 'b')
sol(20, ["F(3,3)=27", "3\\cdot3+2\\cdot3=15\\le18"], 'c')
# 21
C21 = [(1, 1, '<=', 20000), (1, 0, '>=', 5000), (0, 1, '>=', 2000), (-1, 1, '<=', 4000)]
F21 = lambda x, y: R(4, 100) * x + R(7, 100) * y
V21 = vertices(C21)
v.ok(V21 == sorted([(5000, 2000), (18000, 2000), (8000, 12000), (5000, 9000)]), "ej. 21: vértices")
v.ok(max(F21(*p) for p in V21) == 1160 and [p for p in V21 if F21(*p) == 1160] == [(8000, 12000)] and malla(C21, F21, paso=R(500), limite=20000) <= 1160, "ej. 21: máximo 1160 en (8000,12000)")
v.enunciado(21, ["20 000 €", "5 000 €", "2 000 €", "4 000 €"])
sol(21, ["F(x,y)=0{,}04x+0{,}07y", "x+y\\le20000", "y\\le x+4000"], 'a')
sol(21, [pt(p) for p in V21], 'b')
sol(21, ["F(5000,2000)=340", "F(18000,2000)=860", "F(8000,12000)=1160", "F(5000,9000)=830"], 'c')
sol(21, ["5{,}8\\,\\%", "\\frac{1160}{20000}=0{,}058", "8000+12000=20000"], 'd')
v.ok(R(1160, 20000) == R(29, 500) and float(R(1160, 20000)) == 0.058, "ej. 21: rentabilidad total 5,8 %")
# 22
C22 = [(1, 1, '>=', 10), (1, 0, '<=', 8), (0, 1, '<=', 9)] + NN
F22 = lambda x, y: 40 * x + 30 * y
resolver(22, C22, F22, 'min', ["40 €", "30 €", "al menos 10 sesiones"], extra={'a': ["x+y\\ge10", "x\\le8", "y\\le9"], 'd': ["y=10"]}, esperado=(310, [(1, 9)]), grid_limit=30, ap_v='b', ap_f='c')
v.ok(not cumple(C22, (0, 10)) and (0, 10) not in vertices(C22), "ej. 22: (0,10) no cumple y≤9")
# 23
C23 = [(1, 2, '<=', 50), (3, 1, '<=', 60)] + NN
F23 = lambda x, y: 30 * x + 50 * y
V23, o23, _ = resolver(23, C23, F23, 'max', ["40 a 50"], extra={'a': ["x+2y\\le50", "3x+y\\le60"], 'c': ["1320-1080=240"], 'd': ["\\frac{240}{10}=24", "24-20=4"]}, esperado=(1320, [(14, 18)]), ap_v='a', ap_f='b')
v.ok(1320 - 1080 == 240 and R(240, 10) == 24 and 24 - 20 == 4 and 4 * 10 == 40, "ej. 23: +240 en total, 24 €/h, neto 4 €/h")
# 24
C24 = [(1, 1, '==', 10), (1, 0, '>=', 2), (0, 1, '>=', 1)]
F24 = lambda x, y: 3 * x + 2 * y
extremos = [(2, 8), (9, 1)]
v.ok(all(cumple(C24, p) for p in extremos) and [F24(*p) for p in extremos] == [22, 29], "ej. 24: extremos del segmento")
v.ok(all(F24(R(x), 10 - R(x)) == 20 + R(x) for x in range(2, 10)) and min(F24(R(x), 10 - R(x)) for x in range(2, 10)) == 22 and max(F24(R(x), 10 - R(x)) for x in range(2, 10)) == 29, "ej. 24: F = 20 + x en [2,9]")
v.enunciado(24, ["x+y=10", "3x+2y"])
sol(24, ["x+y=10", "x\\ge2", "y\\ge1"], 'a')
sol(24, ["(2,8)", "(9,1)"], 'b')
sol(24, ["F(2,8)=22", "F(9,1)=29"], 'c')
sol(24, ["F=20+x", "20+2=22", "20+9=29"], 'd')
# 25
C25 = [(40, 60, '<=', 11000), (1, 0, '>=', 50), (0, 1, '>=', 30), (1, 0, '<=', 200)]
F25 = lambda x, y: x + y
V25, o25, _ = resolver(25, C25, F25, 'max', ["11 000 €", "50 becas", "30", "200"], extra={'a': ["40x+60y\\le11000"], 'd': ["40\\cdot200+60\\cdot50=11000"]}, esperado=(250, [(200, 50)]), grid_limit=250, ap_v='b', ap_f='c')
v.fin()
