#!/usr/bin/env python3
"""Verifica con sympy los cálculos de apuntes/3-eso/06-ecuaciones/index.qmd."""
from sympy import symbols, solve, Eq, Rational as R, sqrt, expand, S
from _comun import ok, fin

x = symbols('x')
ok(solve(Eq((x - 1) / S(2) - (2 * x + 3) / S(3), x / S(6) - 2), x) == [R(3, 2)], "primer grado")
ok(expand(6 * ((x - 1) / S(2) - (2 * x + 3) / S(3))) == -x - 9 and expand(6 * (x / S(6) - 2)) == x - 12, "multiplicar por 6")
ok(solve(Eq(x + 1, x + 2), x) == [] , "imposible")
ok(expand(2 * (x + 1) - (2 * x + 2)) == 0, "identidad verificada")
ok(sorted(solve(x**2 - 5 * x + 6, x)) == [2, 3] and 25 - 24 == 1, "x^2-5x+6")
ok(solve(x**2 + 2 * x + 5, x, dict=False) != [] and (4 - 20) == -16 and not any(s.is_real for s in solve(x**2 + 2 * x + 5, x)), "Δ<0 sin real")
ok(sorted(solve(3 * x**2 - 48, x)) == [-4, 4], "b=0")
ok(sorted(solve(2 * x**2 - 8 * x, x)) == [0, 4], "c=0")
ok(solve(x**2 - 6 * x + 9, x) == [3], "Δ=0")
ok(2 + 3 == 5 and 2 * 3 == 6, "suma y producto")
for (a, b, c) in [(1, -5, 6), (2, -3, -5), (3, 1, -2), (1, -4, 4)]:
    s = solve(a * x**2 + b * x + c, x)
    if len(s) == 2: ok(s[0] + s[1] == R(-b, a) and s[0] * s[1] == R(c, a), f"Vieta {a},{b},{c}")
    else: ok(2 * s[0] == R(-b, a), f"Vieta doble {a},{b},{c}")
ok(solve(Eq(42 + x, 2 * (12 + x)), x) == [18] and 42 + 18 == 60 and 12 + 18 == 30, "edades")
ok(sorted(solve(x * (x + 5) - 84, x)) == [-12, 7] and 5**2 + 4 * 84 == 361 and 7 * 12 == 84, "campo")
fin("tema 06")
