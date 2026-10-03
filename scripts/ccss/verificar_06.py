#!/usr/bin/env python3
"""Verifica con sympy todos los cálculos de apuntes/2-bachillerato-ccss/06-derivadas/index.qmd,
incluidos los datos de las figuras (tangente al coste y pendientes laterales).

Uso:  python scripts/ccss/verificar_06.py     (requiere `pip install sympy`)

Termina con código 0 si pasan todas las comprobaciones y con código 1 en cuanto falla alguna.
"""
import sys

try:
    from sympy import (symbols, Function, Rational as R, sqrt, log, exp, diff, limit, oo, solve, simplify, expand, factor,
                       Abs, N, S, Piecewise, cancel)
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


x, h, a, b, c = symbols('x h a b c', real=True)
u = Function('u')(x)

# --- 1. Definición y coste marginal ---
C = R(2, 100)*x**2 + 5*x + 300
ok(C.subs(x, 50) == 600 and C.subs(x, 60) == 672 and (C.subs(x, 60) - C.subs(x, 50)) / 10 == R(36, 5), "TVM [50,60] = 7,2")
ok(expand((C.subs(x, 50 + h) - C.subs(x, 50)) / h) == 7 + R(1, 50)*h, "cociente incremental = 7 + 0,02h")
ok(limit((C.subs(x, 50 + h) - C.subs(x, 50)) / h, h, 0) == 7 and diff(C, x) == R(1, 25)*x + 5 and diff(C, x).subs(x, 50) == 7, "C'(50) = 7")
ok(limit(((3 + h)**2 - 9) / h, h, 0) == 6 and expand(((3 + h)**2 - 9) / h) == 6 + h, "(x^2)'(3) = 6")
# --- 2. Tabla y reglas ---
tabla = [(x**3, 3*x**2), (sqrt(x), 1 / (2*sqrt(x))), (exp(x), exp(x)), (2**x, 2**x*log(2)), (log(x), 1/x), (log(x, 3), 1 / (x*log(3))), (R(7), 0)]
ok(all(cero(diff(f, x) - d) for f, d in tabla), "tabla de derivadas")
nn = symbols('n', positive=True)
ok(cero(diff(x**nn, x) - nn*x**(nn - 1)), "x^n")
ok(cero(diff(u**nn, x) - nn*u**(nn - 1)*diff(u, x)), "(u^n)'")
ok(cero(diff(sqrt(u), x) - diff(u, x) / (2*sqrt(u))), "(sqrt u)'")
ok(cero(diff(exp(u), x) - diff(u, x)*exp(u)), "(e^u)'")
ok(cero(diff(5**u, x) - diff(u, x)*5**u*log(5)), "(a^u)'")
ok(cero(diff(log(u), x) - diff(u, x) / u), "(ln u)'")
ok(cero(diff(log(u, 4), x) - diff(u, x) / (u*log(4))), "(log_a u)'")
ejemplos = [
    (x**3 - 2*x**2 + 5*x - 1, 3*x**2 - 4*x + 5),
    ((2*x + 1)**5, 10*(2*x + 1)**4),
    ((x**2 + 1) / (x - 2), (x**2 - 4*x - 1) / (x - 2)**2),
    (sqrt(x**2 + 1), x / sqrt(x**2 + 1)),
    (exp(x**2), 2*x*exp(x**2)),
    (2**x, 2**x*log(2)),
    (log(x**2 + 1), 2*x / (x**2 + 1)),
    (log(x, 2), 1 / (x*log(2))),
    (x*exp(-x/10), (1 - x/10)*exp(-x/10)),
]
ok(all(cero(diff(f, x) - d) for f, d in ejemplos), "derivadas de los ejemplos")
ok(cero((2*x*(x - 2) - (x**2 + 1)) / (x - 2)**2 - (x**2 - 4*x - 1) / (x - 2)**2), "cociente sin simplificar")
ok(cero(1*exp(-x/10) + x*(-R(1, 10))*exp(-x/10) - (1 - x/10)*exp(-x/10)), "producto y cadena de V(x)")
# Comprobación numérica independiente (diferencias centradas)
for f, d in ejemplos:
    for x0 in (R(7, 4), R(5, 2), R(9, 2)):
        num = (f.subs(x, x0 + R(1, 10**6)) - f.subs(x, x0 - R(1, 10**6))) / (2*R(1, 10**6))
        exacto = float(N(d.subs(x, x0), 20))
        ok(abs(float(N(num, 20)) - exacto) <= 1e-6 * max(1.0, abs(exacto)), f"derivada numérica de {f} en {x0}")
# --- 3. Recta tangente ---
ok(diff(C, x).subs(x, 50) == 7 and expand(600 + 7*(x - 50)) == 7*x + 250, "tangente al coste: y = 7x + 250")
ok(7*51 + 250 == 607 and C.subs(x, 51) == R(60702, 100), "estimación 607 vs exacto 607,02")
ok(cero(C - (7*x + 250) - R(1, 50)*(x - 50)**2), "la curva queda por encima de la tangente (convexa)")
f_ = x**2 - x
ok(solve(diff(f_, x) - 2, x) == [R(3, 2)] and f_.subs(x, R(3, 2)) == R(3, 4) and expand(R(3, 4) + 2*(x - R(3, 2))) == 2*x - R(9, 4), "tangente paralela a y = 2x + 1")
ok(expand(log(1) + diff(log(x), x).subs(x, 1)*(x - 1)) == x - 1, "tangente de ln x en 1")
# --- 4. Derivabilidad ---
ok(diff(5 + R(9, 10)*x, x) == R(9, 10) and diff(R(3, 2)*x - 1, x) == R(3, 2), "pendientes laterales del agua 0,9 y 1,5")
ok((5 + R(9, 10)*10) == 14 == R(3, 2)*10 - 1, "agua continua en 10")
g_izq = x**2 - 1; g_der = 2*x - 1
ok(g_izq.subs(x, 2) == 3 == g_der.subs(x, 2), "ejemplo a trozos continuo en 2")
ok(diff(g_izq, x).subs(x, 2) == 4 and diff(g_der, x).subs(x, 2) == 2, "derivadas laterales 4 y 2")
ok(limit(Abs(h) / h, h, 0, '-') == -1 and limit(Abs(h) / h, h, 0, '+') == 1, "|x| no derivable en 0")
# --- 5. Coeficientes ---
ok(solve([1 + a + b - 3, 2 + a - 1], [a, b]) == {a: -1, b: 3}, "a trozos con ln: a=-1, b=3")
ok(log(1) + 3 == 3 and (1 + (-1) + 3) == 3 and diff(x**2 - x + 3, x).subs(x, 1) == 1 == diff(log(x) + 3, x).subs(x, 1), "comprobación del caso anterior")
ok(solve([b - 1, a - 1], [a, b]) == {a: 1, b: 1} and diff(exp(x), x).subs(x, 0) == 1, "a trozos con e^x")
Cc = a*x**2 + b*x + c
ok(solve([Cc.subs(x, 0) - 200, Cc.subs(x, 10) - 420, diff(Cc, x).subs(x, 10) - 32], [a, b, c]) == {a: 1, b: 12, c: 200}, "C(x) = x^2 + 12x + 200")
ok(100*1 + 10*12 == 220 and 20*1 + 12 == 32, "ecuaciones 100a+10b=220 y 20a+b=32")
Ii = a*x**2 + b*x
ok(solve([diff(Ii, x).subs(x, 25), Ii.subs(x, 25) - 625], [a, b]) == {a: -1, b: 50}, "I(x) = -x^2 + 50x")
ok(all((-v**2 + 50*v) <= 625 for v in range(0, 51)), "I(25)=625 es el máximo")
# --- 6. L'Hôpital ---
casos = [((exp(x) - 1, x, 0), 1), ((log(x), x - 1, 1), 1), ((x**2, exp(x), oo), 0), ((log(x), sqrt(x), oo), 0)]
for (f, g, a0), val in casos:
    ok(limit(f / g, x, a0) == val and limit(diff(f, x) / diff(g, x), x, a0) == val, f"L'Hôpital {f}/{g}")
ok(limit(2*x / exp(x), x, oo) == 0 and limit(2 / exp(x), x, oo) == 0, "segunda aplicación en x^2/e^x")
ok(cero(diff(log(x), x) / diff(sqrt(x), x) - 2 / sqrt(x)), "ln x / sqrt x tras derivar")
# Ampliación
ok(limit(x*log(x), x, 0, '+') == 0 and limit(log(x) / (1/x), x, 0, '+') == 0 and cero(diff(log(x), x) / diff(1/x, x) + x), "x ln x -> 0")
ok(cero(diff(x**x, x) - x**x*(log(x) + 1)), "derivación logarítmica de x^x")
print(f"OK: {n} comprobaciones superadas")
