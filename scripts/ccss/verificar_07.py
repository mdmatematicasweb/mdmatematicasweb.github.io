#!/usr/bin/env python3
"""Verifica con sympy todos los cálculos de apuntes/2-bachillerato-ccss/07-aplicaciones-derivada/index.qmd,
incluidos los datos de las figuras (extremos, inflexiones, asíntotas y puntos óptimos).

Uso:  python scripts/ccss/verificar_07.py     (requiere `pip install sympy`)

Termina con código 0 si pasan todas las comprobaciones y con código 1 en cuanto falla alguna.
"""
import sys

try:
    from sympy import (symbols, Rational as R, exp, E, diff, limit, oo, solve, simplify, factor, expand, apart, N, S,
                       Interval, Union, FiniteSet, sign, nsolve, Poly)
    from sympy.calculus.util import continuous_domain
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


def cero(expr):
    return simplify(expr) == 0


x, t, p = symbols('x t p', real=True)

# --- 1-3. Beneficio cúbico B(t) ---
B = t**3 - 9*t**2 + 24*t - 10
B1, B2 = diff(B, t), diff(B, t, 2)
ok(cero(B1 - 3*(t - 2)*(t - 4)) and expand(B1) == 3*t**2 - 18*t + 24, "B' = 3(t-2)(t-4)")
ok(sorted(solve(B1, t)) == [2, 4], "puntos críticos 2 y 4")
ok([B1.subs(t, v) > 0 for v in (1, 5)] == [True, True] and B1.subs(t, 3) < 0, "signos de B': +, -, +")
ok(cero(B2 - (6*t - 18)) and cero(B2 - 6*(t - 3)) and solve(B2, t) == [3], "B'' = 6(t-3), inflexión en t=3")
ok(B2.subs(t, 2) == -6 < 0 and B2.subs(t, 4) == 6 > 0, "B''(2)<0 y B''(4)>0")
ok((B.subs(t, 2), B.subs(t, 3), B.subs(t, 4)) == (10, 8, 6), "máx (2,10), inflexión (3,8), mín (4,6)")
ok(B2.subs(t, 2.5) < 0 < B2.subs(t, 3.5), "B'' cambia de signo en 3")
ok([B.subs(t, v) for v in (0, 2, 4, 8)] == [-10, 10, 6, 118], "tabla de extremos absolutos")
ok(max([(B.subs(t, v), v) for v in (0, 2, 4, 8)]) == (118, 8) and min([(B.subs(t, v), v) for v in (0, 2, 4, 8)]) == (-10, 0), "máx abs en 8 y mín abs en 0")
ok(all(B.subs(t, R(k, 10)) <= 118 and B.subs(t, R(k, 10)) >= -10 for k in range(0, 81)), "extremos absolutos en [0,8] por barrido")
ok(B1.subs(t, 2.5) < B1.subs(t, 2) and B1.subs(t, 3) < B1.subs(t, 2.5) and B1.subs(t, 3) < B1.subs(t, 3.5), "B' es mínima en t=3 (baja más deprisa hasta 3)")
# Datos de la figura: B(5,5) y valores de la gráfica
ok(R(B.subs(t, R(11, 2))) == R(129, 8) or abs(float(B.subs(t, R(11, 2))) - 16.125) < 1e-9, "B(5,5) = 16,125")
# --- Publicidad V(x) ---
V = x*exp(-x/10)
V1, V2 = diff(V, x), diff(V, x, 2)
ok(cero(V1 - (1 - x/10)*exp(-x/10)) and solve(V1, x) == [10], "V' y punto crítico 10")
ok(cero(V2 - (x - 20)/100*exp(-x/10)) and solve(V2, x) == [20], "V'' e inflexión en 20")
ok(V1.subs(x, 5) > 0 > V1.subs(x, 15) and V2.subs(x, 10) < 0 and V2.subs(x, 5) < 0 < V2.subs(x, 30), "signos de V' y V''")
ok(V.subs(x, 10) == 10/E and round(float(V.subs(x, 10)), 2) == 3.68, "V(10) = 10/e ≈ 3,68")
ok(V.subs(x, 20) == 20/E**2 and round(float(V.subs(x, 20)), 2) == 2.71, "V(20) = 20/e² ≈ 2,71")
ok(limit(V, x, oo) == 0 and V.subs(x, 0) == 0, "V -> 0 y V(0) = 0")
ok(all(V.subs(x, R(k, 2)) <= V.subs(x, 10) for k in range(0, 241)), "V(10) es el máximo")
# --- 4. Estudio de f = x²/(x-1) ---
f = x**2 / (x - 1)
ok(continuous_domain(f, x, S.Reals) == S.Reals - FiniteSet(1), "Dom f")
ok(f.subs(x, 0) == 0 and solve(f, x) == [0], "cortes: solo el origen")
ok(limit(f, x, 1, '+') == oo and limit(f, x, 1, '-') == -oo, "AV x=1")
ok(apart(f, x) == x + 1 + 1/(x - 1), "f = x + 1 + 1/(x-1)")
ok(limit(f/x, x, oo) == 1 and limit(f - x, x, oo) == 1 and limit(f/x, x, -oo) == 1 and limit(f - x, x, -oo) == 1, "AO y = x + 1")
f1, f2 = diff(f, x), diff(f, x, 2)
ok(cero(f1 - x*(x - 2)/(x - 1)**2) and cero((2*x*(x - 1) - x**2)/(x - 1)**2 - f1), "f' = x(x-2)/(x-1)²")
ok(sorted(solve(f1, x)) == [0, 2], "f' = 0 en 0 y 2")
ok([f1.subs(x, v) > 0 for v in (-1, 3)] == [True, True] and f1.subs(x, R(1, 2)) < 0 and f1.subs(x, R(3, 2)) < 0, "signos de f': +, -, -, +")
ok(cero(f2 - 2/(x - 1)**3) and solve(f2, x) == [], "f'' = 2/(x-1)³ sin ceros")
ok(f2.subs(x, 0) == -2 < 0 and f2.subs(x, 2) == 2 > 0 and f.subs(x, 2) == 4, "máx (0,0) y mín (2,4)")
ok(f2.subs(x, -3) < 0 and f2.subs(x, R(1, 2)) < 0 and f2.subs(x, 3) > 0, "cóncava en x<1 y convexa en x>1")
# --- 5. Optimización ---
Bp = -4*p**2 + 140*p - 600
ok(diff(Bp, p) == 140 - 8*p and solve(diff(Bp, p), p) == [R(35, 2)] and diff(Bp, p, 2) == -8 and Bp.subs(p, R(35, 2)) == 625, "beneficio máximo p = 17,5")
Ip = p*(100 - 2*p)
ok(100 - 2*20 == 60 and 60 - 2*(20 - 20) == 60, "a 20 € viajan 60 personas")
ok(expand(Ip) == 100*p - 2*p**2 and diff(Ip, p) == 100 - 4*p and solve(diff(Ip, p), p) == [25] and diff(Ip, p, 2) == -4, "ingreso: p=25")
ok(Ip.subs(p, 25) == 1250 and 100 - 2*25 == 50 and Ip.subs(p, 20) == 1200 and solve(Ip, p) == [0, 50], "I(25)=1250, I(20)=1200, raíces 0 y 50")
ok(all(Ip.subs(p, k) <= 1250 for k in range(0, 51)), "I(25) es el máximo")
C = R(1, 2)*x**2 + 200
Cm = C / x
ok(cero(Cm - (R(1, 2)*x + 200/x)), "Cm = 0,5x + 200/x")
ok(cero(diff(Cm, x) - (R(1, 2) - 200/x**2)) and solve(x**2 - 400, x) == [-20, 20], "Cm' = 0 -> x = 20")
ok(cero(diff(Cm, x, 2) - 400/x**3) and diff(Cm, x, 2).subs(x, 20) > 0, "Cm'' > 0")
ok(Cm.subs(x, 20) == 20 and diff(C, x).subs(x, 20) == 20 and Cm.subs(x, 20) == diff(C, x).subs(x, 20), "Cm(20) = C'(20) = 20")
ok(all(Cm.subs(x, R(k, 2)) >= 20 for k in range(1, 241)), "Cm(20) es el mínimo")
ok([v for v in solve(Cm - diff(C, x), x) if v > 0] == [20], "Cm y C' se cortan en x=20 (la otra raíz, -20, no está en el dominio x>0)")
A = x*(80 - 2*x)
ok(expand(A) == 80*x - 2*x**2 and diff(A, x) == 80 - 4*x and solve(diff(A, x), x) == [20] and diff(A, x, 2) == -4, "área máxima: x = 20")
ok(80 - 2*20 == 40 and A.subs(x, 20) == 800 and all(A.subs(x, k) <= 800 for k in range(0, 41)), "20 × 40 = 800 m²")
# --- Ampliación ---
ok([diff(x**4, x, k).subs(x, 0) for k in (1, 2, 3, 4)] == [0, 0, 0, 24], "x^4: primera derivada no nula en orden 4 (par) -> mínimo")
ok([diff(x**3, x, k).subs(x, 0) for k in (1, 2, 3)] == [0, 0, 6] and all(v**4 > 0 for v in (-2, -1, 1, 2)), "x^3: orden 3 (impar) -> inflexión; x^4 >= 0")
print(f"OK: {n} comprobaciones superadas")
