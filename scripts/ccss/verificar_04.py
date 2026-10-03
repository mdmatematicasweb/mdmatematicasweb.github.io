#!/usr/bin/env python3
"""Verifica con sympy todos los cálculos de apuntes/2-bachillerato-ccss/04-funciones/index.qmd.

Uso:  python scripts/ccss/verificar_04.py     (requiere `pip install sympy`)

Termina con código 0 si pasan todas las comprobaciones y con código 1 en cuanto falla alguna.
"""
import random
import sys

try:
    from sympy import (symbols, Rational as R, S, Interval, Union, FiniteSet, sqrt, log, exp, ln, limit, oo, solve, simplify,
                       expand, apart, diff, N, Abs, Piecewise, factor, Eq)
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


def r2(v, d=2):
    return round(float(N(v, 20)), d)


x, t, p, w, q = symbols('x t p w q', real=True)

# --- 1. Dominios ---
d1 = continuous_domain((2*x + 1) / (x**2 - 4), x, S.Reals)
ok(d1 == S.Reals - FiniteSet(-2, 2), "Dom (2x+1)/(x^2-4)")
ok(solve(x**2 - 4, x) == [-2, 2], "ceros del denominador")
ok(continuous_domain(log(x - 3), x, S.Reals) == Interval.open(3, oo), "Dom ln(x-3)")
ok(continuous_domain(sqrt(6 - 2*x), x, S.Reals) == Interval(-oo, 3), "Dom sqrt(6-2x)")
ok(continuous_domain(x**3 - 2*x + 1, x, S.Reals) == S.Reals, "Dom polinómica")
ok(continuous_domain(exp(x), x, S.Reals) == S.Reals, "Dom exponencial")
# Simetrías
ok(simplify((-x)**2 - x**2) == 0 and simplify((-x)**3 + x**3) == 0, "x^2 par, x^3 impar")
# --- 2. Polinómicas ---
C = 2000 + 35*x; I = 60*x; B = I - C
ok(expand(B) == 25*x - 2000, "B = 25x - 2000")
ok(solve(I - C, x) == [80] and I.subs(x, 80) == 4800 and C.subs(x, 80) == 4800, "umbral de rentabilidad")
ok(B.subs(x, 100) == 500 and B.subs(x, 79) < 0 < B.subs(x, 81), "B(100) y signo del beneficio")
Ip = p*(120 - 4*p)
ok(expand(Ip) == -4*p**2 + 120*p, "I(p) expandido")
ok(solve(Ip, p) == [0, 30], "cortes de I(p)")
vert = -R(120) / (2*(-4)); ok(vert == 15 and solve(diff(Ip, p), p) == [15], "vértice de I(p)")
ok(Ip.subs(p, 15) == 900 and 120 - 4*15 == 60, "I(15)=900, q=60")
ok(all(Ip.subs(p, v) <= 900 for v in range(0, 31)), "máximo de I(p)")
Bp = (p - 5)*(120 - 4*p)
ok(expand(Bp) == -4*p**2 + 140*p - 600, "B(p) expandido")
ok(sorted(solve(Bp, p)) == [5, 30], "cortes de B(p)")
ok(-R(140) / (2*(-4)) == R(35, 2) == R(175, 10) and solve(diff(Bp, p), p) == [R(35, 2)] and Bp.subs(p, R(35, 2)) == 625, "vértice de B(p)")
# --- 3. Racionales ---
Cm = (500 + 20*x) / x
ok(simplify(Cm - (20 + 500/x)) == 0, "Cm = 20 + 500/x")
ok([Cm.subs(x, v) for v in (10, 25, 100, 500, 1000)] == [70, 40, 25, 21, R(41, 2)], "tabla de Cm")
ok(limit(Cm, x, oo) == 20 and all(Cm.subs(x, v) > 20 for v in (1, 10, 100, 10**6)), "Cm tiende a 20 por encima")
f = (x + 1) / (x - 1)
ok(apart(f, x) == 1 + 2/(x - 1), "f = 1 + 2/(x-1)")
ok(continuous_domain(f, x, S.Reals) == S.Reals - FiniteSet(1), "Dom f")
ok(limit(f, x, 1, '+') == oo and limit(f, x, 1, '-') == -oo, "asíntota vertical x=1")
ok(limit(f, x, oo) == 1 and limit(f, x, -oo) == 1, "asíntota horizontal y=1")
ok(f.subs(x, 0) == -1 and solve(f, x) == [-1], "cortes de f")
ok([f.subs(x, v) for v in (-3, -2, 0, 2, 3, 5)] == [R(1, 2), R(1, 3), -1, 3, 2, R(3, 2)], "tabla de f")
# --- 4. Exponenciales ---
for a in (2, R(1, 2), R(3, 2), R(9, 10)):
    ok(all((a**v) > 0 for v in range(-8, 9)) and a**0 == 1, f"a^x > 0 y a^0=1, a={a}")
    ok(all((a**(v + 1) > a**v) == (a > 1) for v in range(-8, 8)), f"crecimiento según a={a}")
ok(r2(5000*R(103, 100)**10) == 6719.58, "C(10)")
ok(r2(20000*R(85, 100)**5) == 8874.11, "V(5)")
ok(round(float(80000*R(985, 1000)**10)) == 68778, "P(10)")
# --- 5. Logaritmos ---
ok(r2(log(2) / log(R(103, 100))) == 23.45, "años en duplicar")
ok(r2(log(R(3, 4)) / log(R(985, 1000))) == 19.03, "años hasta bajar de 60000")
P = lambda tt: 80000*R(985, 1000)**tt
ok(round(float(P(19))) == 60031 and P(19) > 60000 and round(float(P(20))) == 59131 and P(20) < 60000, "P(19), P(20)")
ok(solve(log(x + 3, 2) - 4, x) == [13], "log2(x+3)=4")
ok(solve(3**(2*x - 1) - 81, x) == [R(5, 2)], "3^(2x-1)=81")
ok(r2(ln(7), 3) == 1.946 and exp(ln(7)) == 7, "e^x = 7")
ok(log(8, 2) == 3 and log(100, 10) == 2 and 2**4 == 16 and 16 - 3 == 13, "definición de logaritmo")
random.seed(5)
for _ in range(60):
    M_, N_ = R(random.randint(1, 50), random.randint(1, 9)), R(random.randint(1, 50), random.randint(1, 9)); k = random.randint(-3, 4); b = random.choice([2, 3, 5, 10])
    ok(abs(float(N(log(M_*N_, b) - log(M_, b) - log(N_, b), 25))) < 1e-12, "log del producto")
    ok(abs(float(N(log(M_/N_, b) - log(M_, b) + log(N_, b), 25))) < 1e-12, "log del cociente")
    ok(abs(float(N(log(M_**k, b) - k*log(M_, b), 25))) < 1e-12, "log de la potencia")
    ok(abs(float(N(log(M_, b) - ln(M_)/ln(b), 25))) < 1e-12, "cambio de base")
ok(all(abs(float(log(2**v, 2)) - v) < 1e-12 for v in range(-5, 6)), "log2 es inversa de 2^x")
ok(log(1, 5) == 0 and 5**0 == 1, "log(1)=0")
# --- 6. A trozos ---
def agua(v):
    return 5 + R(9, 10)*v if v <= 10 else 14 + R(3, 2)*(v - 10)
ok(expand(14 + R(3, 2)*(x - 10)) == R(3, 2)*x - 1, "segundo trozo = 1,5x - 1")
ok(5 + R(9, 10)*10 == 14 == R(3, 2)*10 - 1, "continuidad en x=10")
ok([agua(v) for v in (8, 10, 25)] == [R(122, 10), 14, R(73, 2)], "f(8), f(10), f(25)")
ok(agua(0) == 5, "cuota fija")
ok(solve(R(3, 2)*x - 1 - 32, x) == [22] and agua(22) == 32 and 32 > 14, "factura de 32 € = 22 m³")
def envio(pp):
    return 4 if pp <= 2 else (7 if pp <= 5 else 10)
ok([envio(v) for v in (R(1), R(2), R(5, 2), R(5), R(6))] == [4, 4, 7, 7, 10], "tarifa de envío")
ok(envio(2) == 4 and envio(R(5, 2)) == 7, "g(2)=4, g(2,5)=7")
tr = Piecewise((3 - x, x < 3), (x - 3, True))
ok(all(tr.subs(x, v) == Abs(v - 3) for v in range(-6, 12)), "|x-3| a trozos")
print(f"OK: {n} comprobaciones superadas")
