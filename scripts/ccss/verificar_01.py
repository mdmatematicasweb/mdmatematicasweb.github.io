#!/usr/bin/env python3
"""Verifica con sympy todos los cálculos de apuntes/2-bachillerato-ccss/01-matrices-determinantes/index.qmd.

Uso:  python scripts/ccss/verificar_01.py     (requiere `pip install sympy`)

Termina con código 0 si pasan todas las comprobaciones y con código 1 en cuanto falla alguna.
"""
import sys

try:
    from sympy import Matrix, Rational as R, eye, symbols, factor, simplify
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
# --- 1-2. Operaciones ---
EA = M([[120, 95, 60], [80, 105, 140]]); EB = M([[70, 60, 40], [50, 65, 90]])
ok(EA[1, 2] == 140, "e23")
ok(EA + EB == M([[190, 155, 100], [130, 170, 230]]), "suma encuestas")
V = M([[40, 25, 10], [30, 35, 20]]); p = M([3, 2, 4])
ok(2 * V == M([[80, 50, 20], [60, 70, 40]]), "2V")
ok(V * p == M([210, 240]), "V·p"); ok(40*3 + 25*2 + 10*4 == 210, "fila 1 de V por p")
ok(V.T == M([[40, 30], [25, 35], [10, 20]]), "V^t")
A = M([[2, 1], [0, 1]]); B = M([[1, 3], [1, 0]])
ok(A * B == M([[3, 6], [1, 0]]), "A·B"); ok(B * A == M([[2, 4], [2, 1]]), "B·A"); ok(A * B != B * A, "no conmutativo")
L = M([[1, 0], [2, 1]])
for k in (2, 3, 4): ok(L**k == M([[1, 0], [2*k, 1]]), f"L^{k}")
for k in range(1, 9): ok(L**k == M([[1, 0], [2*k, 1]]), f"L^n patrón n={k}")
S = M([[0, 1], [1, 0]]); ok(S**2 == eye(2) and S**3 == S, "S^2=I, alterna")
# --- 3. Determinantes ---
ok(M([[5, 2], [3, 4]]).det() == 14 and 20 - 6 == 14, "det 2x2")
Ms = M([[1, 2, 3], [0, 1, 4], [2, 1, 0]])
pos = 1*1*0 + 2*4*2 + 3*0*1; neg = 3*1*2 + 1*4*1 + 2*0*0
ok((pos, neg) == (16, 10) and Ms.det() == 6 == pos - neg, "Sarrus ejemplo")
N = M([[3, 0, 2], [1, 4, -1], [2, 0, 5]])
ok(N.cofactor(1, 1) == 11 and M([[3, 2], [2, 5]]).det() == 11, "menor/adjunto a22")
ok(N.det() == 44 == 4 * 11, "det N por 2ª columna")
# Sarrus y desarrollo por adjuntos coinciden en matrices aleatorias (comprobación de la fórmula del texto)
import random
random.seed(1)
for _ in range(50):
    a = M(3, 3, [random.randint(-5, 5) for _ in range(9)])
    s = (a[0,0]*a[1,1]*a[2,2] + a[0,1]*a[1,2]*a[2,0] + a[0,2]*a[1,0]*a[2,1]
         - a[0,2]*a[1,1]*a[2,0] - a[0,0]*a[1,2]*a[2,1] - a[0,1]*a[1,0]*a[2,2])
    ok(s == a.det(), "fórmula de Sarrus")
    ok(a.det() == sum(a[i, 1] * a.cofactor(i, 1) for i in range(3)), "desarrollo por columna 2")
    b = M(3, 3, [random.randint(-5, 5) for _ in range(9)])
    ok(a.T.det() == a.det() and (a*b).det() == a.det()*b.det() and (2*a).det() == 8*a.det(), "propiedades")
    if a.det() != 0: ok(a.inv().det() == 1 / a.det(), "det inversa")
D = M([[1, 0, 0], [0, 1, 0], [0, 0, 3]])
ok(D.det() == 3 and D.T.det() == 3 and (D**2).det() == 9 and D.inv().det() == R(1, 3) and (2*D).det() == 24 == 2**3 * 3, "ejemplo |A|=3")
# --- 4. Rango ---
Rm = M([[1, 2, 1], [2, 1, -1], [3, 3, 0]])
r2 = Rm.copy(); r2[1, :] = Rm[1, :] - 2*Rm[0, :]; r2[2, :] = Rm[2, :] - 3*Rm[0, :]
ok(r2 == M([[1, 2, 1], [0, -3, -3], [0, -3, -3]]), "Gauss paso 1")
r3 = r2.copy(); r3[2, :] = r2[2, :] - r2[1, :]
ok(r3 == M([[1, 2, 1], [0, -3, -3], [0, 0, 0]]), "Gauss paso 2")
ok(Rm.rank() == 2 and Rm.det() == 0 and M([[1, 2], [2, 1]]).det() == -3, "rango por menores")
ok(Rm.row(2) == Rm.row(0) + Rm.row(1), "F3=F1+F2")
m = symbols('m'); P = M([[1, 1, m], [1, m, 1], [m, 1, 1]])
ok(simplify(P.det() + (m - 1)**2 * (m + 2)) == 0, "|P(m)|")
ok(P.subs(m, 1).rank() == 1 and P.subs(m, 1) == M([[1,1,1]]*3), "m=1")
ok(P.subs(m, -2).rank() == 2 and P.subs(m, -2).det() == 0 and P.subs(m, -2).row(0) == M([[1, 1, -2]]) and P.subs(m, -2).row(1) == M([[1, -2, 1]]), "m=-2")
ok(all(P.subs(m, v).rank() == 3 for v in (-5, -3, -1, 0, 2, 3, 7)), "resto rango 3")
# --- 5. Inversa ---
H = M([[4, 6], [1, 2]]); ok(H.det() == 2 and H.inv() == M([[1, -3], [R(-1, 2), 2]]) and R(1, 2) * M([[2, -6], [-1, 4]]) == H.inv(), "inversa 2x2")
Q = M([[2, 1, 1], [1, 1, 0], [0, 1, 1]])
ok((2*1*1 + 1*0*0 + 1*1*1, 1*1*0 + 2*0*1 + 1*1*1) == (3, 1) and Q.det() == 2, "Sarrus Q")
cof = {(i+1, j+1): Q.cofactor(i, j) for i in range(3) for j in range(3)}
ok(cof == {(1,1):1,(1,2):-1,(1,3):1,(2,1):0,(2,2):2,(2,3):-2,(3,1):-1,(3,2):1,(3,3):1}, "adjuntos de Q")
ok(Q.cofactorMatrix() == M([[1, -1, 1], [0, 2, -2], [-1, 1, 1]]), "matriz de adjuntos")
ok(Q.adjugate() == M([[1, 0, -1], [-1, 2, 1], [1, -2, 1]]), "traspuesta de adjuntos")
Qi = M([[R(1, 2), 0, R(-1, 2)], [R(-1, 2), 1, R(1, 2)], [R(1, 2), -1, R(1, 2)]])
ok(Q.inv() == Qi and Q * Qi == eye(3) and Qi * Q == eye(3) and R(1, 2) * Q.adjugate() == Qi, "Q^-1")
Am = M([[m, 1], [4, m]]); ok(factor(Am.det()) == (m - 2) * (m + 2), "|A(m)|")
G = M([[3, 1], [5, 2]]); aug = G.row_join(eye(2))
s1 = aug.copy(); s1[1, :] = 3*aug[1, :] - 5*aug[0, :]; ok(s1 == M([[3, 1, 1, 0], [0, 1, -5, 3]]), "GJ 1")
s2 = s1.copy(); s2[0, :] = s1[0, :] - s1[1, :]; ok(s2 == M([[3, 0, 6, -3], [0, 1, -5, 3]]), "GJ 2")
s3 = s2.copy(); s3[0, :] = s2[0, :] / 3; ok(s3 == M([[1, 0, 2, -1], [0, 1, -5, 3]]), "GJ 3")
ok(G.inv() == M([[2, -1], [-5, 3]]) and G.det() == 1, "G^-1")
# --- 6. Ecuaciones matriciales ---
A1 = M([[2, 1], [1, 3]]); B1 = M([[100, 120], [105, 135]])
ok(A1.det() == 5 and A1.inv() == R(1, 5) * M([[3, -1], [-1, 2]]), "A^-1 ej.1")
ok(R(1, 5) * M([[3, -1], [-1, 2]]) * B1 == R(1, 5) * M([[195, 225], [110, 150]]) == M([[39, 45], [22, 30]]), "X ej.1")
X1 = M([[39, 45], [22, 30]]); ok(A1 * X1 == B1, "A·X=B ej.1")
ok(2*39 + 22 == 100 and 39 + 3*22 == 105, "semana 1 consumo M1, M2")
A2 = M([[2, 1], [1, 1]]); B2 = M([[5, 10], [5, 5]]); AI = A2 + eye(2)
ok(AI == M([[3, 1], [1, 2]]) and AI.det() == 5 and AI.inv() == R(1, 5) * M([[2, -1], [-1, 3]]), "(A+I) ej.2")
X2 = AI.inv() * B2; ok(R(1, 5) * M([[2, -1], [-1, 3]]) * B2 == X2 == M([[1, 3], [2, 1]]), "X ej.2")
ok(A2 * X2 + X2 == B2, "A·X+X=B ej.2")
A3 = M([[1, 2], [1, 3]]); B3 = M([[3, 1], [2, 5]])
ok(A3.det() == 1 and A3.inv() == M([[3, -2], [-1, 1]]) and B3 + 2*eye(2) == M([[5, 1], [2, 7]]), "datos ej.3")
X3 = (B3 + 2*eye(2)) * A3.inv(); ok(X3 == M([[14, -9], [-1, 3]]), "X ej.3")
ok(X3 * A3 - 2*eye(2) == B3, "X·A-2I=B ej.3")
print(f"OK: {n} comprobaciones superadas")
