#!/usr/bin/env python3
"""Verifica con sympy todos los cálculos de apuntes/2-bachillerato-ccss/05-limites-continuidad/index.qmd,
incluidos los datos de las figuras (hueco, saltos y asíntotas).

Uso:  python scripts/ccss/verificar_05.py     (requiere `pip install sympy`)

Termina con código 0 si pasan todas las comprobaciones y con código 1 en cuanto falla alguna.
"""
import sys

try:
    from sympy import (symbols, Rational as R, sqrt, log, exp, limit, oo, solve, simplify, cancel, apart, div, N,
                       Piecewise, S, factor)
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


x, t, a, nn, r, w = symbols('x t a n r w', real=True)

# --- 1. Límites laterales con las funciones del tema 4 ---
agua_izq = 5 + R(9, 10)*x; agua_der = R(3, 2)*x - 1
ok(agua_izq.subs(x, 10) == 14 == agua_der.subs(x, 10), "agua continua en x=10")
ok(limit(agua_izq, x, 10, '-') == 14 and limit(agua_der, x, 10, '+') == 14, "laterales del agua")
env = lambda v: 4 if v <= 2 else (7 if v <= 5 else 10)
ok(env(2) == 4 and env(R(21, 10)) == 7, "g(2)=4 y g(2+)=7: laterales 4 y 7")
# --- 2. Límites en un punto ---
ok(limit((x**2 - 4) / (x - 2), x, 2) == 4 and cancel((x**2 - 4) / (x - 2)) == x + 2, "(x^2-4)/(x-2)")
ok(limit((x + 2) / (x - 1)**2, x, 1, '-') == oo and limit((x + 2) / (x - 1)**2, x, 1, '+') == oo, "(x+2)/(x-1)^2 -> +oo")
ok(limit(1 / (x - 1), x, 1, '-') == -oo and limit(1 / (x - 1), x, 1, '+') == oo, "1/(x-1): -oo y +oo")
ok(limit((sqrt(x + 1) - 2) / (x - 3), x, 3) == R(1, 4), "límite con conjugado")
ok(simplify((sqrt(x + 1) - 2) * (sqrt(x + 1) + 2) - (x - 3)) == 0, "producto por el conjugado")
ok(simplify((sqrt(x + 1) - 2) / (x - 3) - 1 / (sqrt(x + 1) + 2)) == 0, "forma simplificada del cociente")
# --- 3. Límites en el infinito ---
ok(limit((3*x**2 + x) / (x**2 - 5), x, oo) == 3, "mismo grado")
ok(limit((2*x + 1) / (x**2 + 3), x, oo) == 0, "grado menor")
ok(limit((x**3 + 1) / (2*x**2), x, oo) == oo, "grado mayor")
ok(limit(x**3, x, oo) == oo and limit(x**3, x, -oo) == -oo, "x^3")
ok(limit(sqrt(x**2 + x) - x, x, oo) == R(1, 2), "∞-∞ con raíces")
ok(simplify((sqrt(x**2 + x) - x) - x / (sqrt(x**2 + x) + x)) == 0, "forma con conjugado")
ok(limit(x / exp(x), x, oo) == 0 and limit(log(x) / x, x, oo) == 0 and limit(exp(-x), x, oo) == 0 and limit(exp(x), x, -oo) == 0, "jerarquía de crecimiento")
S_ = lambda tt: R(80)*tt / (tt + 4)
ok([S_(4), S_(16), S_(96)] == [40, 64, R(384, 5)] and R(384, 5) == R(768, 10), "S(4), S(16), S(96)=76,8")
ok(limit(80*t / (t + 4), t, oo) == 80 and all(S_(v) < 80 for v in (1, 10, 100, 10**6)), "S -> 80 sin superarlo")
ok(limit(20 + 500 / x, x, oo) == 20, "coste medio -> 20")
# Ampliación: capitalización continua
ok(limit((1 + r / nn)**nn, nn, oo) == exp(r), "(1+r/n)^n -> e^r")
ok(round(float(5000 * exp(R(3, 100) * 10)), 2) == 6749.29 and round(float(5000 * R(103, 100)**10), 2) == 6719.58, "capitalización continua vs anual")
# --- 4. Continuidad ---
ok(solve(a + R(1, 100)*500 - (10 + R(5, 1000)*500), a) == [R(15, 2)], "comisión: a = 7,5")
ok(R(15, 2) + 5 == R(25, 2) == 10 + R(5, 2), "valor común 12,5")
ok(solve(2*a + 1 - (4 - a), a) == [1], "a = 1")
ok(2*1 + 1 == 4 - 1 == 3, "valor común 3")
# --- 5. Discontinuidades (y datos de la figura) ---
f_ev = (x**2 - 4) / (x - 2)
ok(limit(f_ev, x, 2) == 4 and f_ev.subs(x, 3) == 5, "evitable: límite 4, hueco en (2,4)")
h_izq = x + 1; h_der = 5
ok(limit(h_izq, x, 2) == 3 and h_der == 5 and h_der - h_izq.subs(x, 2) == 2, "salto finito: laterales 3 y 5, salto 2")
k = 1 / (x - 2)
ok(limit(k, x, 2, '-') == -oo and limit(k, x, 2, '+') == oo, "salto infinito de 1/(x-2)")
# --- 6. Asíntotas (y datos de la figura) ---
f1 = (2*x + 1) / (x - 3)
ok(limit(f1, x, 3, '+') == oo and limit(f1, x, 3, '-') == -oo, "f1: AV x=3")
ok(limit(f1, x, oo) == 2 and limit(f1, x, -oo) == 2, "f1: AH y=2")
g = (x**2 - 3*x + 3) / (x - 1)
ok(div(x**2 - 3*x + 3, x - 1, x) == (x - 2, 1) and apart(g, x) == x - 2 + 1/(x - 1), "g = x - 2 + 1/(x-1)")
ok(limit(g, x, 1, '+') == oo and limit(g, x, 1, '-') == -oo and (x**2 - 3*x + 3).subs(x, 1) == 1, "g: AV x=1")
ok(limit(g, x, oo) == oo and limit(g, x, -oo) == -oo, "g: sin AH")
ok(limit(g / x, x, oo) == 1 and limit(g - x, x, oo) == -2 and limit(g / x, x, -oo) == 1 and limit(g - x, x, -oo) == -2, "g: AO y = x - 2")
ok(limit(log(x), x, 0, '+') == -oo and limit(exp(-x) + 1, x, oo) == 1, "ln x: AV x=0; e^-x: AH")
# Valores concretos usados para dibujar
ok(g.subs(x, 2) == 1 and g.subs(x, 0) == -3 and f1.subs(x, 0) == R(-1, 3), "puntos de las gráficas")
print(f"OK: {n} comprobaciones superadas")
