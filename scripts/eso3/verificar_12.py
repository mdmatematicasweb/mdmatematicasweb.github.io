#!/usr/bin/env python3
"""Verifica con sympy los cálculos de apuntes/3-eso/12-funciones-lineales-cuadraticas/index.qmd."""
from sympy import symbols, solve, Rational as R, Eq, diff, expand, Poly
from _comun import ok, fin

x, t = symbols('x t')
ok(R(12, 10) * 5 == 6, "taxi 5 km")
r = 2 * x - 3
ok(r.subs(x, 0) == -3 and r.subs(x, 2) == 1, "y=2x-3")
m = R(9 - 3, 3 - 1); ok(m == 3 and expand(3 + m * (x - 1)) == 3 * x, "recta por A y B")
s = solve(Eq(2 * x - 3, -x + 4), x); ok(s == [R(7, 3)] and (2 * x - 3).subs(x, s[0]) == R(5, 3), "intersección")
# tarifas
ok(12 + R(5, 100) * 240 == 24 and R(1, 10) * 240 == 24 and solve(Eq(12 + R(5, 100) * x, R(1, 10) * x), x) == [240], "tarifas")
ok(12 + R(5, 100) * 300 < R(1, 10) * 300 and 12 + R(5, 100) * 100 > R(1, 10) * 100, "conviene la primera a partir de 240")
# parábola
p = x**2 - 4 * x + 3
xv = R(4, 2); ok(xv == 2 and p.subs(x, 2) == -1 and diff(p, x).subs(x, 2) == 0 and diff(p, x, 2) == 2, "vértice")
ok(sorted(solve(p, x)) == [1, 3] and p.subs(x, 0) == 3, "cortes")
# simetría respecto de x=2
for d in range(1, 6): ok(p.subs(x, 2 + d) == p.subs(x, 2 - d), f"simetría d={d}")
# pelota
h = -5 * t**2 + 20 * t
ok(R(-20, 2 * -5) == 2 and h.subs(t, 2) == 20 and sorted(solve(h, t)) == [0, 4], "pelota")
# diferencias
y = [k**2 for k in range(5)]
d1 = [y[i + 1] - y[i] for i in range(4)]; d2 = [d1[i + 1] - d1[i] for i in range(3)]
ok(y == [0, 1, 4, 9, 16] and d1 == [1, 3, 5, 7] and d2 == [2, 2, 2], "diferencias")
# vértice general: -b/2a para parábolas aleatorias
for (a, b, c) in [(1, 6, 1), (-2, 8, 3), (3, -9, 0), (R(1, 2), 2, 1)]:
    q = a * x**2 + b * x + c
    ok(solve(diff(q, x), x) == [R(-b, 2 * a)], f"xv {a},{b},{c}")
fin("tema 12")
