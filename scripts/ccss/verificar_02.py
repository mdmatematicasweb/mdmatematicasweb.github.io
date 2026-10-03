#!/usr/bin/env python3
"""Verifica con sympy todos los cálculos de apuntes/2-bachillerato-ccss/02-sistemas-ecuaciones-lineales/index.qmd.

Uso:  python scripts/ccss/verificar_02.py     (requiere `pip install sympy`)

Termina con código 0 si pasan todas las comprobaciones y con código 1 en cuanto falla alguna.
"""
import random
import sys

try:
    from sympy import Matrix, Rational as R, eye, symbols, factor, simplify, solve
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
x, y, z, m, lam, p, q = symbols('x y z m lam p q')


def reemplaza(A, i, B):
    """Matriz A con la columna i sustituida por B (regla de Cramer)."""
    Ai = A.copy(); Ai[:, i] = B
    return Ai


# --- 1. Equilibrio de mercado ---
ok(solve([q - (120 - 4*p), q - (20 + 6*p)], [p, q]) == {p: 10, q: 80}, "equilibrio")
Ae = M([[1, 4], [1, -6]]); Be = M([120, 20])
ok(Ae.det() == -10, "|A| equilibrio")
ok(reemplaza(Ae, 0, Be).det() == -800 and reemplaza(Ae, 0, Be).det() / Ae.det() == 80, "Cramer q")
ok(reemplaza(Ae, 1, Be).det() == -100 and reemplaza(Ae, 1, Be).det() / Ae.det() == 10, "Cramer p")
# --- Inversión: planteamiento (la 2ª ecuación del enunciado ×50) ---
ok(solve([x + y + z - 30000, R(2, 100)*x + R(4, 100)*y + R(6, 100)*z - 1400, y - 2*x], [x, y, z]) == {x: 5000, y: 10000, z: 15000}, "planteamiento inversión")
ok(50 * R(2, 100) == 1 and 50 * R(4, 100) == 2 and 50 * R(6, 100) == 3 and 50 * 1400 == 70000, "×50")
# --- 2. Forma matricial ---
A = M([[1, 1, 1], [1, 2, 3], [2, -1, 0]]); B = M([30000, 70000, 0])
ok(A.det() == 4, "|A| inversión")
ok(A.inv() * B == M([5000, 10000, 15000]), "X = A^-1 B")
# --- 3. Gauss (inversión) ---
aug = A.row_join(B)
g1 = aug.copy(); g1[1, :] = aug[1, :] - aug[0, :]; g1[2, :] = aug[2, :] - 2*aug[0, :]
ok(g1 == M([[1, 1, 1, 30000], [0, 1, 2, 40000], [0, -3, -2, -60000]]), "Gauss 1")
g2 = g1.copy(); g2[2, :] = g1[2, :] + 3*g1[1, :]
ok(g2 == M([[1, 1, 1, 30000], [0, 1, 2, 40000], [0, 0, 4, 60000]]), "Gauss 2")
zz = R(60000, 4); yy = 40000 - 2*zz; xx = 30000 - yy - zz
ok((xx, yy, zz) == (5000, 10000, 15000), "sustitución hacia atrás")
ok(R(2, 100)*5000 + R(4, 100)*10000 + R(6, 100)*15000 == 1400 and 100 + 400 + 900 == 1400, "intereses")
# --- Frutería: SI y SCI ---
F = M([[2, 3, 1], [1, 1, 2], [3, 4, 3]])
ok(F.det() == 0 and F.rank() == 2, "frutería |A|=0, rg 2")
ok(F.row(2) == F.row(0) + F.row(1), "pedido 3 = pedido 1 + pedido 2")
ok(14 + 9 == 23, "23 = 14 + 9")
Fa = M([[1, 1, 2, 9], [2, 3, 1, 14], [3, 4, 3, 24]])
h1 = Fa.copy(); h1[1, :] = Fa[1, :] - 2*Fa[0, :]; h1[2, :] = Fa[2, :] - 3*Fa[0, :]
ok(h1 == M([[1, 1, 2, 9], [0, 1, -3, -4], [0, 1, -3, -3]]), "Gauss SI 1")
h2 = h1.copy(); h2[2, :] = h1[2, :] - h1[1, :]
ok(h2 == M([[1, 1, 2, 9], [0, 1, -3, -4], [0, 0, 0, 1]]), "Gauss SI 2")
ok(F.rank() == 2 and F.row_join(M([14, 9, 24])).rank() == 3, "SI: rangos 2 y 3")
Fb = M([[1, 1, 2, 9], [2, 3, 1, 14], [3, 4, 3, 23]])
k1 = Fb.copy(); k1[1, :] = Fb[1, :] - 2*Fb[0, :]; k1[2, :] = Fb[2, :] - 3*Fb[0, :]
k2 = k1.copy(); k2[2, :] = k1[2, :] - k1[1, :]
ok(k2 == M([[1, 1, 2, 9], [0, 1, -3, -4], [0, 0, 0, 0]]), "Gauss SCI")
ok(F.rank() == 2 and F.row_join(M([14, 9, 23])).rank() == 2 < 3, "SCI: rangos 2 y 2")
sol = solve([2*x + 3*y + lam - 14, x + y + 2*lam - 9], [x, y])
ok(sol == {x: 13 - 5*lam, y: 3*lam - 4}, "solución general SCI")
for t in range(-3, 6):
    ok(list(F * M([13 - 5*t, 3*t - 4, t])) == [14, 9, 23], f"solución SCI λ={t}")
ok(F * M([3, 2, 2]) == M([14, 9, 23]), "λ=2 → (3, 2, 2)")
ok(13 - 5*2 == 3 and 3*2 - 4 == 2, "tomate 3, pimiento 2")
ok(M([[2, 3], [1, 1]]).det() == -1, "menor frutería")
cx = M([[14 - lam, 3], [9 - 2*lam, 1]]).det() / -1; cy = M([[2, 14 - lam], [1, 9 - 2*lam]]).det() / -1
ok(simplify(cx - (13 - 5*lam)) == 0 and simplify(cy - (3*lam - 4)) == 0, "Cramer sobre el sistema reducido")
# --- 4. Cramer inversión ---
ok([reemplaza(A, i, B).det() for i in range(3)] == [20000, 40000, 60000], "determinantes de Cramer")
ok([reemplaza(A, i, B).det() / A.det() for i in range(3)] == [5000, 10000, 15000], "Cramer inversión")
# --- 5. Parámetro ---
Am = M([[1, 1, 1], [1, -1, m], [2, 0, 1]]); Bm = M([3, 1, 5])
ok(factor(Am.det()) == 2*m, "|A(m)| = 2m")
sx = reemplaza(Am, 0, Bm).det() / Am.det(); sy = reemplaza(Am, 1, Bm).det() / Am.det(); sz = reemplaza(Am, 2, Bm).det() / Am.det()
ok(simplify(sx - (5*m + 1) / (2*m)) == 0 and simplify(sy - (m + 1) / (2*m)) == 0 and simplify(sz + 1/m) == 0, "fórmulas de Cramer con m")
ok(Am.subs(m, 1).inv() * Bm == M([3, 1, -1]), "m=1 → (3, 1, -1)")
for v in (-5, -2, -1, 1, 2, 3, 7):
    ok(Am.subs(m, v) * M([sx.subs(m, v), sy.subs(m, v), sz.subs(m, v)]) == Bm, f"solución con m={v}")
A0 = Am.subs(m, 0)
ok(A0.row(2) == A0.row(0) + A0.row(1) and A0.rank() == 2, "m=0: F3 = F1 + F2, rg A = 2")
ok(A0.row_join(Bm).rank() == 3 and 3 + 1 != 5, "m=0: rg A* = 3, incompatible")
ok(solve(list(A0 * M([x, y, z]) - Bm), [x, y, z]) == [], "m=0 sin solución")
# --- 6. Producción ---
A2 = M([[2, 3, 1], [1, 2, 1], [1, 1, 2]]); B2 = M([95, 60, 55])
ok(A2.det() == 2, "|A| producción")
ok(A2.adjugate() == M([[3, -5, 1], [-1, 3, -1], [-1, 1, 1]]) and A2.inv() == R(1, 2) * A2.adjugate(), "inversa producción")
ok(M([[3, -5, 1], [-1, 3, -1], [-1, 1, 1]]) * B2 == M([40, 30, 20]), "adj·B")
ok(A2.inv() * B2 == M([20, 15, 10]) and A2 * M([20, 15, 10]) == B2, "X producción")
ok(2*20 + 3*15 + 10 == 95, "horas de montaje")
# inversa de la inversión
ok(A.adjugate() == M([[3, -1, 1], [6, -2, -2], [-5, 3, 1]]) and A.inv() == R(1, 4) * A.adjugate(), "inversa inversión")
# --- Rouché-Fröbenius contra la resolución directa, en sistemas aleatorios ---
random.seed(7)
for _ in range(120):
    Ar = M(3, 3, [random.randint(-2, 2) for _ in range(9)]); Br = M([random.randint(-3, 3) for _ in range(3)])
    rA, rAs = Ar.rank(), Ar.row_join(Br).rank()
    sols = solve(list(Ar * M([x, y, z]) - Br), [x, y, z], dict=True)
    if rA != rAs: ok(sols == [], "Rouché SI")
    elif rA == 3: ok(len(sols) == 1 and len(sols[0]) == 3, "Rouché SCD")
    else: ok(rA == 0 or (len(sols) == 1 and len(sols[0]) == rA), "Rouché SCI: tantas incógnitas despejadas como rango")
    if Ar.det() != 0:
        ok(all(reemplaza(Ar, i, Br).det() / Ar.det() == (Ar.inv() * Br)[i] for i in range(3)), "Cramer = inversa")
print(f"OK: {n} comprobaciones superadas")
