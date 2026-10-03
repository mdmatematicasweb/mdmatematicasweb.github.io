#!/usr/bin/env python3
"""Verifica con sympy todos los cálculos de apuntes/2-bachillerato-ccss/08-integrales/index.qmd,
incluidos los datos de las figuras (áreas 400, 4/3, 9/2 y 800).

Uso:  python scripts/ccss/verificar_08.py     (requiere `pip install sympy`)

Termina con código 0 si pasan todas las comprobaciones y con código 1 en cuanto falla alguna.
"""
import sys

try:
    from sympy import (symbols, Function, Rational as R, sqrt, log, exp, E, diff, integrate, solve, simplify, expand, N,
                       Abs, Piecewise)
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


x, q, t, K = symbols('x q t K', real=True)
u = Function('u')(x)

# --- 1. Primitivas y coste marginal ---
Cmg = R(4, 100)*x + 5
Cx = integrate(Cmg, x) + K
ok(expand(Cx) == R(1, 50)*x**2 + 5*x + K, "C(x) = 0,02x² + 5x + K")
ok(solve(Cx.subs(x, 0) - 300, K) == [300], "K = 300 con coste fijo 300")
C = R(1, 50)*x**2 + 5*x + 300
ok(diff(C, x) == Cmg, "C' = 0,04x + 5 (coincide con el tema 6)")
Ix = integrate(100 - 4*x, x)
ok(Ix == 100*x - 2*x**2 and Ix.subs(x, 0) == 0, "I(x) = 100x - 2x²")
ok(diff(100*x - 2*x**2, x) == 100 - 4*x, "I' = 100 - 4x (tema 7: I(p) = 100p - 2p²)")
# --- 2. Tabla de primitivas: se comprueba derivando ---
nn = symbols('n', positive=True)
ok(cero(diff(x**(nn + 1) / (nn + 1), x) - x**nn), "∫x^n")
ok(cero(diff(log(x), x) - 1/x) and cero(diff(log(-x), x) - 1/x), "∫1/x = ln|x| (x>0 y x<0)")
ok(cero(diff(exp(x), x) - exp(x)) and cero(diff(5**x / log(5), x) - 5**x), "∫e^x y ∫a^x")
ok(cero(diff(u**(nn + 1) / (nn + 1), x) - diff(u, x)*u**nn), "∫u'u^n")
ok(cero(diff(log(u), x) - diff(u, x) / u), "∫u'/u")
ok(cero(diff(exp(u), x) - diff(u, x)*exp(u)), "∫u'e^u")
ok(cero(diff(3**u / log(3), x) - diff(u, x)*3**u), "∫u'a^u")
ok(cero(diff(2*sqrt(u), x) - diff(u, x) / sqrt(u)), "∫u'/√u")
ejemplos = [
    (3*x**2 - 4*x + 5, x**3 - 2*x**2 + 5*x),
    (1/x + exp(x), log(x) + exp(x)),
    (sqrt(x), R(2, 3)*x**R(3, 2)),
    ((2*x + 1)**4, (2*x + 1)**5 / 10),
    (exp(3*x), exp(3*x) / 3),
    (1/(3*x + 2), log(3*x + 2) / 3),
    (2*x / (x**2 + 1), log(x**2 + 1)),
    (x*exp(x**2), exp(x**2) / 2),
    (x / sqrt(x**2 + 1), sqrt(x**2 + 1)),
]
ok(all(cero(diff(F, x) - f) for f, F in ejemplos), "todas las primitivas de los ejemplos derivan en el integrando")
ok(all(cero(diff(integrate(f, x) - F, x)) for f, F in ejemplos), "sympy da las mismas primitivas (difieren en una constante)")
ok(cero(R(1, 2)*(2*x + 1)**5 / 5 - (2*x + 1)**5 / 10), "forma (1/2)·u^5/5")
# --- 3. Integral definida y Barrow ---
ok(integrate(3*x**2 + 1, (x, 0, 2)) == 10 and (8 + 2) - 0 == 10, "∫(3x²+1) de 0 a 2")
ok(integrate(Cmg, (x, 50, 100)) == 400, "∫ coste marginal de 50 a 100 = 400")
ok((R(1, 50)*100**2 + 5*100) - (R(1, 50)*50**2 + 5*50) == 400 and (200 + 500) - (50 + 250) == 400, "Barrow a mano")
ok(C.subs(x, 100) == 1000 and C.subs(x, 50) == 600 and C.subs(x, 100) - C.subs(x, 50) == 400, "C(100) - C(50)")
ok(R(Cmg.subs(x, 50)) == 7 and Cmg.subs(x, 100) == 9 and (7 + 9) * 50 / 2 == 400, "trapecio de la figura: (7+9)/2 · 50")
s = 120*exp(-t/10)
ok(integrate(s, (t, 0, 10)) == 1200 - 1200*exp(-1), "socios: 1200(1 - e^-1)")
ok(round(float(1200*(1 - exp(-1))), 1) == 758.5 and int(float(1200*(1 - exp(-1)))) == 758, "≈ 758 socios")
ok(cero(diff(-1200*exp(-t/10), t) - s), "primitiva de 120e^(-0,1t)")
# --- 4. Áreas ---
f = x**2 - 4*x + 3
F = x**3/3 - 2*x**2 + 3*x
ok(cero(diff(F, x) - f) and solve(f, x) == [1, 3], "F primitiva de x²-4x+3; raíces 1 y 3")
ok([F.subs(x, v) for v in (0, 1, 3, 4)] == [0, R(4, 3), 0, R(4, 3)], "valores de F")
ok([integrate(f, (x, a, b)) for a, b in ((0, 1), (1, 3), (3, 4))] == [R(4, 3), -R(4, 3), R(4, 3)], "integrales por tramos")
ok(integrate(f, (x, 0, 4)) == R(4, 3), "integral total 4/3")
ok(sum(abs(integrate(f, (x, a, b))) for a, b in ((0, 1), (1, 3), (3, 4))) == 4, "área total 4")
ok(integrate(Abs(f), (x, 0, 4)) == 4, "∫|f| = 4")
fa, ga = -x**2 + 4*x, x
ok(sorted(solve(fa - ga, x)) == [0, 3] and fa.subs(x, 1) == 3 > ga.subs(x, 1) == 1, "cortes 0 y 3; f > g en (0,3)")
ok(integrate(fa - ga, (x, 0, 3)) == R(9, 2) and -9 + R(27, 2) == R(9, 2), "área parábola-recta = 9/2")
ok(cero(fa - ga - x*(3 - x)) and all((fa - ga).subs(x, R(k, 10)) > 0 for k in range(1, 30)), "f - g = x(3-x) > 0 en (0,3): no hace falta valor absoluto")
ok(sorted(solve(x - x**3, x)) == [-1, 0, 1], "cortes de x y x³")
ok(integrate(x**3 - x, (x, -1, 0)) == R(1, 4) and integrate(x - x**3, (x, 0, 1)) == R(1, 4), "dos mitades de área 1/4")
ok(integrate(Abs(x - x**3), (x, -1, 1)) == R(1, 2) and 2*(R(1, 2) - R(1, 4)) == R(1, 2), "área entre x y x³ = 1/2")
ok((-R(1, 2)) ** 3 > (-R(1, 2)) and R(1, 2) ** 3 < R(1, 2), "x³ arriba en [-1,0] y x arriba en [0,1]")
ok(integrate(exp(x) - x - 1, (x, 0, 1)) == E - R(5, 2) and round(float(E - R(5, 2)), 3) == 0.218, "área e^x - x - 1")
ok(all(exp(R(k, 10)) >= R(k, 10) + 1 for k in range(0, 11)), "e^x >= x + 1 en [0,1]")
# --- Excedente del consumidor ---
p_dem = 30 - q/4
ok(solve(q - (120 - 4*symbols("p", real=True)), symbols("p", real=True)) == [30 - q/4], "despejando p de q = 120 - 4p sale p = 30 - q/4")
ok(p_dem.subs(q, 80) == 10 and p_dem.subs(q, 0) == 30, "equilibrio (80, 10) y ordenada 30")
ok(120 - 4*10 == 80 and 120 - 4*30 == 0, "q = 120 - 4p en p=10 y p=30")
ok(integrate(p_dem - 10, (q, 0, 80)) == 800 and (1600 - 800) == 800 and R(1, 2)*80*20 == 800, "excedente del consumidor = 800")
ok(integrate(20*q - q**2/8, (q, 0, 0)) == 0 and (20*80 - 80**2/8) == 800, "primitiva evaluada en 80")
print(f"OK: {n} comprobaciones superadas")
