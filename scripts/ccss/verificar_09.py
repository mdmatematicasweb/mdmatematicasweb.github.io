#!/usr/bin/env python3
"""Verifica con fracciones exactas y sympy todos los cálculos de apuntes/2-bachillerato-ccss/09-probabilidad/index.qmd,
incluidos los datos de las figuras (diagrama de Venn y árbol) y las propiedades generales en espacios aleatorios.

Uso:  python scripts/ccss/verificar_09.py     (requiere `pip install sympy`)

Termina con código 0 si pasan todas las comprobaciones y con código 1 en cuanto falla alguna.
"""
import random
import sys
from fractions import Fraction as Fr
from itertools import combinations

try:
    import sympy  # noqa: F401  (se exige como en el resto de verificadores del curso)
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


# --- 2. Encuesta de 200 personas (Venn) ---
N, A, B, AB = 200, 120, 90, 40
solo_A, solo_B, ninguno = A - AB, B - AB, N - (A + B - AB)
ok((solo_A, AB, solo_B, ninguno) == (80, 40, 50, 30) and solo_A + AB + solo_B + ninguno == N, "datos del Venn: 80, 40, 50, 30")
pA, pB, pAB = Fr(A, N), Fr(B, N), Fr(AB, N)
ok((pA, pB, pAB) == (Fr(3, 5), Fr(9, 20), Fr(1, 5)), "P(A), P(B), P(A∩B)")
ok(pA + pB - pAB == Fr(17, 20) == Fr(170, 200), "P(A∪B) = 0,85")
ok(1 - (pA + pB - pAB) == Fr(3, 20) == Fr(ninguno, N), "P(ninguno) = 0,15 = 30/200")
ok(pA - pAB == Fr(2, 5) == Fr(solo_A, N) and pB - pAB == Fr(1, 4) == Fr(solo_B, N), "P(A-B) = 0,4 y P(B-A) = 0,25")
ok(Fr(AB, B) == Fr(4, 9) and round(float(Fr(4, 9)), 3) == 0.444 and Fr(4, 9) != pA, "P(A|B) = 4/9 ≠ P(A)")
ok(pAB == Fr(1, 5) and pA * pB == Fr(27, 100) and pAB != pA * pB, "no independientes: 0,2 ≠ 0,27")
# --- 3. Comisión de 12 docentes (7 mujeres) ---
ok(Fr(7, 12) * Fr(6, 11) == Fr(7, 22) and round(float(Fr(7, 22)), 3) == 0.318, "dos mujeres sin reemplazamiento")
ok(Fr(7, 12) * Fr(5, 11) + Fr(5, 12) * Fr(7, 11) == Fr(35, 66) and round(float(Fr(35, 66)), 3) == 0.530, "una de cada, sin reemplazamiento")
ok(Fr(7, 12) ** 2 == Fr(49, 144) and round(float(Fr(49, 144)), 3) == 0.340, "dos mujeres con reemplazamiento")
ok(Fr(7, 12) + Fr(5, 12) == 1 and Fr(6, 11) + Fr(5, 11) == 1 and Fr(7, 11) + Fr(4, 11) == 1, "las ramas que salen de un nodo suman 1")
# --- 4. Tabla de contingencia ---
tab = {('H', 'I'): 70, ('H', 'T'): 40, ('M', 'I'): 45, ('M', 'T'): 45}
tot = sum(tab.values())
H = tab[('H', 'I')] + tab[('H', 'T')]; M = tab[('M', 'I')] + tab[('M', 'T')]
I = tab[('H', 'I')] + tab[('M', 'I')]; T = tab[('H', 'T')] + tab[('M', 'T')]
ok((tot, H, M, I, T) == (200, 110, 90, 115, 85), "totales de la tabla")
ok(Fr(I, tot) == Fr(23, 40) == Fr(575, 1000) and Fr(M, tot) == Fr(9, 20) and Fr(45, tot) == Fr(9, 40), "P(I), P(M), P(I∩M)")
ok(Fr(45, M) == Fr(1, 2) and Fr(70, H) == Fr(7, 11) and round(float(Fr(7, 11)), 3) == 0.636, "P(I|M) y P(I|H)")
ok(Fr(45, T) == Fr(9, 17) and round(float(Fr(9, 17)), 3) == 0.529, "P(M|T)")
ok(Fr(I, tot) * Fr(M, tot) == Fr(207, 800) and float(Fr(207, 800)) == 0.25875 and Fr(45, tot) != Fr(207, 800), "producto 0,25875 ≠ 0,225")
ok(Fr(45, M) != Fr(I, tot), "P(I|M) ≠ P(I): dependientes")
# Alarmas
a1, a2 = Fr(9, 10), Fr(8, 10)
ok(a1 * a2 == Fr(18, 25) and float(a1 * a2) == 0.72, "ambas funcionan: 0,72")
ok(1 - (1 - a1) * (1 - a2) == Fr(49, 50) and float(1 - (1 - a1) * (1 - a2)) == 0.98, "al menos una: 0,98")
ok(a1 * (1 - a2) + (1 - a1) * a2 == Fr(13, 50) and float(a1 * (1 - a2) + (1 - a1) * a2) == 0.26, "exactamente una: 0,26")
# --- 5. Aseguradora (y árbol de la figura) ---
pr = [Fr(50, 100), Fr(30, 100), Fr(20, 100)]; ps = [Fr(2, 100), Fr(5, 100), Fr(12, 100)]
ok(sum(pr) == 1, "partición: 0,5 + 0,3 + 0,2 = 1")
conj = [a * b for a, b in zip(pr, ps)]
ok([float(c) for c in conj] == [0.01, 0.015, 0.024], "caminos con siniestro: 0,010; 0,015; 0,024")
noS = [a * (1 - b) for a, b in zip(pr, ps)]
ok([float(c) for c in noS] == [0.49, 0.285, 0.176], "caminos sin siniestro: 0,490; 0,285; 0,176")
ok(sum(conj) + sum(noS) == 1, "los seis caminos del árbol suman 1")
PS = sum(conj)
ok(PS == Fr(49, 1000) and float(PS) == 0.049, "P(S) = 0,049")
post = [c / PS for c in conj]
ok(post == [Fr(10, 49), Fr(15, 49), Fr(24, 49)] and sum(post) == 1, "posteriores 10/49, 15/49, 24/49")
ok([round(float(p), 3) for p in post] == [0.204, 0.306, 0.49], "valores decimales de Bayes")
ok(round(float(post[2]) * 100) == 49 and pr[2] == Fr(1, 5), "20 % a priori sube a 49 % a posteriori")
# Detector de fraude
pf, pd, pfa = Fr(2, 100), Fr(95, 100), Fr(4, 100)
pl = pf * pd + (1 - pf) * pfa
ok(pf * pd == Fr(19, 1000) and (1 - pf) * pfa == Fr(392, 10000) and pl == Fr(291, 5000) and float(pl) == 0.0582, "P(L) = 0,0582")
ok(pf * pd / pl == Fr(95, 291) and round(float(pf * pd / pl), 3) == 0.326, "P(F|L) = 95/291 ≈ 0,326")
ok(float(pf * pd / pl) < 1 / 3 + 0.01 and 3 * Fr(95, 291) < 1 + Fr(1, 100), "aproximadamente una de cada tres alertas")
ok(round(float(pf * (1 - pd) / (1 - pl)), 3) == 0.001, "P(F|sin alerta) ≈ 0,001")
# --- Propiedades generales en espacios finitos aleatorios ---
random.seed(2026)
for _ in range(300):
    k = random.randint(4, 9)
    w = [random.randint(1, 9) for _ in range(k)]
    P = lambda S, w=w: Fr(sum(w[i] for i in S), sum(w))
    E = set(range(k))
    Aset = {i for i in E if random.random() < 0.5}; Bset = {i for i in E if random.random() < 0.5}
    ok(P(E) == 1 and P(set()) == 0 and P(Aset) >= 0, "axiomas 1 y 2")
    ok(P(Aset) + P(E - Aset) == 1 and P(E - Aset) == 1 - P(Aset), "P(A^C) = 1 - P(A)")
    ok(P(Aset | Bset) == P(Aset) + P(Bset) - P(Aset & Bset), "P(A∪B)")
    ok(Aset - Bset == Aset & (E - Bset) and P(Aset - Bset) == P(Aset) - P(Aset & Bset), "A - B = A∩B^C")
    ok(E - (Aset | Bset) == (E - Aset) & (E - Bset) and E - (Aset & Bset) == (E - Aset) | (E - Bset), "De Morgan")
    if not (Aset & Bset):
        ok(P(Aset | Bset) == P(Aset) + P(Bset), "axioma 3 con incompatibles")
    if Aset <= Bset:
        ok(P(Aset) <= P(Bset), "monotonía")
    if P(Bset) > 0:
        cond = Fr(sum(w[i] for i in Aset & Bset), sum(w[i] for i in Bset))   # P(A|B) contando pesos dentro de B
        ok(cond == P(Aset & Bset) / P(Bset) and P(Aset & Bset) == P(Bset) * cond, "P(A|B) y regla del producto")
        ok((cond == P(Aset)) == (P(Aset & Bset) == P(Aset) * P(Bset)), "independencia: P(A|B)=P(A) ⇔ P(A∩B)=P(A)P(B)")
    # sistema completo de 3 sucesos y Bayes
    idx = list(E); random.shuffle(idx); c1, c2 = sorted(random.sample(range(1, k), 2)) if k > 2 else (1, 2)
    parts = [set(idx[:c1]), set(idx[c1:c2]), set(idx[c2:])]
    parts = [q for q in parts if q]
    if P(Bset) > 0 and parts:
        ok(sum(P(q) * (P(Bset & q) / P(q)) for q in parts) == P(Bset), "probabilidad total")
        ok(sum(P(Bset & q) / P(Bset) for q in parts) == 1, "las probabilidades a posteriori suman 1")
        total = sum(P(q) * (P(Bset & q) / P(q)) for q in parts)
        for q in parts:
            directa = Fr(sum(w[i] for i in q & Bset), sum(w[i] for i in Bset))        # P(q|B) contando pesos dentro de B
            bayes = P(q) * (P(Bset & q) / P(q)) / total
            ok(directa == bayes, "Bayes coincide con la probabilidad condicionada directa")
# Independencia y complementarios (construcción explícita)
for _ in range(60):
    x, y = Fr(random.randint(1, 9), 10), Fr(random.randint(1, 9), 10)
    ok((1 - x) * y == y - x * y and (1 - x) * (1 - y) == 1 - x - y + x * y, "independencia con complementarios")
print(f"OK: {n} comprobaciones superadas")
