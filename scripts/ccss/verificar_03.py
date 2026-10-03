#!/usr/bin/env python3
"""Verifica con sympy todos los cálculos de apuntes/2-bachillerato-ccss/03-programacion-lineal/index.qmd.

Uso:  python scripts/ccss/verificar_03.py     (requiere `pip install sympy`)

Termina con código 0 si pasan todas las comprobaciones y con código 1 en cuanto falla alguna.
"""
import random
import sys
from itertools import combinations

try:
    from sympy import Matrix, Rational as R, symbols, solve
except ImportError:
    sys.exit("Falta sympy: pip install sympy")

n = 0


def ok(cond, msg):
    """Cuenta una comprobación; si falla, lo dice y sale con código 1 (no usa assert, que `python -O` desactiva)."""
    global n
    if not cond:
        print("FALLA:", msg, file=sys.stderr)
        sys.exit(1)
    n += 1


M = Matrix
x, y = symbols('x y')


def cumple(cons, px, py):
    return all((a*px + b*py <= k) if s == '<=' else (a*px + b*py >= k) for a, b, s, k in cons)


def cortes(cons):
    """Todos los cortes de pares de rectas (con el par que los produce) y cuáles cumplen todas las restricciones."""
    out = []
    for i, j in combinations(range(len(cons)), 2):
        a1, b1, _, k1 = cons[i]; a2, b2, _, k2 = cons[j]
        d = a1*b2 - a2*b1
        if d == 0:
            continue
        out.append(((R(k1*b2 - k2*b1, d), R(a1*k2 - a2*k1, d)), (i, j)))
    return out


def vertices(cons):
    return sorted({p for p, _ in cortes(cons) if cumple(cons, *p)})


# --- Ejemplo 1: panadería ---
C1 = [(2, 1, '<=', 80), (1, 2, '<=', 70), (0, 1, '>=', 10), (1, 0, '>=', 0)]
F1 = lambda a, b: 50*a + 40*b
V1 = vertices(C1)
ok(V1 == sorted([(0, 10), (0, 35), (30, 20), (35, 10)]), "vértices del ejemplo 1")
ok({p: F1(*p) for p in V1} == {(0, 10): 400, (0, 35): 1400, (30, 20): 2300, (35, 10): 2150}, "F en los vértices (ej. 1)")
ok(max(V1, key=lambda p: F1(*p)) == (30, 20) and F1(30, 20) == 2300, "máximo en C")
ok(2*30 + 20 == 80 and 30 + 2*20 == 70, "se usan todos los recursos en C")
# Cortes descartados que cita el texto
ok(not cumple(C1, 0, 80) and 0 + 160 > 70, "(0,80) incumple el horno")
ok(not cumple(C1, 50, 10) and 100 + 10 > 80, "(50,10) incumple la harina")
dcort = {p for p, _ in cortes(C1)}
ok((0, 80) in dcort and (50, 10) in dcort, "(0,80) y (50,10) son cortes de rectas")
# Punto de prueba (0,20) y puntos de las rectas
ok(2*0 + 20 <= 80 and 0 + 40 <= 70 and 20 >= 10, "punto de prueba (0,20)")
ok(2*0 + 80 == 80 and 2*40 + 0 == 80 and 0 + 2*35 == 70 and 70 + 0 == 70, "puntos de las rectas")
# Cramer para C
d = M([[2, 1], [1, 2]]).det()
ok(d == 3 and M([[80, 1], [70, 2]]).det() == 90 and M([[2, 80], [1, 70]]).det() == 60, "Cramer en C")
ok((M([[80, 1], [70, 2]]).det() / d, M([[2, 80], [1, 70]]).det() / d) == (30, 20), "C = (30, 20)")
ok(solve([2*x + y - 80, x + 2*y - 70], [x, y]) == {x: 30, y: 20}, "C con solve")
# Búsqueda exhaustiva en puntos enteros (independiente del método de vértices)
mejor = max((F1(a, b), a, b) for a in range(0, 100) for b in range(0, 100) if cumple(C1, a, b))
ok(mejor == (2300, 30, 20), "máximo entero por fuerza bruta")
# La recta de nivel F = 2300 deja la región en F <= 2300
ok(all(F1(a, b) <= 2300 for a in range(0, 100) for b in range(0, 100) if cumple(C1, a, b)), "F <= 2300 en toda la región")
# Recta de nivel F=2300: pasa por C
ok(50*30 + 40*20 == 2300, "recta de nivel pasa por C")

# --- Casos especiales: F = 40x + 20y ---
F3 = lambda a, b: 40*a + 20*b
ok({p: F3(*p) for p in V1} == {(0, 10): 200, (0, 35): 700, (30, 20): 1600, (35, 10): 1600}, "F=40x+20y en los vértices")
optimos = [(a, b) for a in range(0, 100) for b in range(0, 100) if cumple(C1, a, b) and F3(a, b) == 1600]
ok(optimos == [(a, 80 - 2*a) for a in range(30, 36)] and len(optimos) == 6, "6 soluciones enteras sobre el lado CD")
ok(max(F3(a, b) for a in range(0, 100) for b in range(0, 100) if cumple(C1, a, b)) == 1600, "máximo 1600")
ok(cumple(C1, 31, 18) and F3(31, 18) == 1600 and 31 + 2*18 == 67, "(31,18) óptimo")
ok(all(cumple(C1, a, 80 - 2*a) for a in range(30, 36)) and not cumple(C1, 29, 22) and not cumple(C1, 36, 8), "extremos del lado CD")

# --- Ejemplo 2: comedor social ---
C2 = [(3, 1, '>=', 12), (1, 1, '>=', 8), (1, 0, '>=', 0), (0, 1, '>=', 0)]
F2 = lambda a, b: 4*a + 3*b
V2 = vertices(C2)
ok(V2 == sorted([(0, 12), (2, 6), (8, 0)]), "vértices del ejemplo 2")
ok({p: F2(*p) for p in V2} == {(0, 12): 36, (2, 6): 26, (8, 0): 32}, "F en los vértices (ej. 2)")
ok(min(V2, key=lambda p: F2(*p)) == (2, 6), "mínimo en Q")
ok(solve([3*x + y - 12, x + y - 8], [x, y]) == {x: 2, y: 6}, "Q con solve")
ok(not cumple(C2, 0, 8) and 3*0 + 8 < 12, "(0,8) incumple la proteína")
ok(not cumple(C2, 4, 0) and 4 + 0 < 8, "(4,0) incumple el total")
ok(not cumple(C2, 0, 0) and 3*0 + 0 < 12, "punto de prueba (0,0) no cumple")
ok(min((F2(a, b), a, b) for a in range(0, 80) for b in range(0, 80) if cumple(C2, a, b)) == (26, 2, 6), "mínimo entero por fuerza bruta")
# No acotada: sin máximo
ok(all(cumple(C2, 2 + t, 6 + t) for t in range(0, 500)) and F2(1000, 1000) == 7000, "(1000,1000) en la región, F=7000")
ok(F2(2 + 500, 6 + 500) > F2(2 + 100, 6 + 100) > F2(2, 6), "F crece sin límite en la dirección (1,1)")
ok(all(F2(a, b) >= 0 for a in range(0, 60) for b in range(0, 60) if cumple(C2, a, b)), "F >= 0 (el mínimo existe)")

# --- Teorema: en regiones acotadas aleatorias el máximo de F está en un vértice ---
random.seed(11)
for _ in range(40):
    cons = [(random.randint(1, 4), random.randint(1, 4), '<=', random.randint(8, 40)) for _ in range(random.randint(2, 4))] + [(1, 0, '>=', 0), (0, 1, '>=', 0)]
    V = vertices(cons)
    ok(len(V) >= 3, "región con al menos 3 vértices")
    fa, fb = random.randint(1, 9), random.randint(1, 9)
    F = lambda a, b: fa*a + fb*b
    fmax = max(F(*p) for p in V)
    pts = [(R(i, 2), R(j, 2)) for i in range(0, 90) for j in range(0, 90)]
    ok(all(F(a, b) <= fmax for a, b in pts if cumple(cons, a, b)), "el máximo está en un vértice")
print(f"OK: {n} comprobaciones superadas")
