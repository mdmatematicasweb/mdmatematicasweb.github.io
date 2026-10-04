#!/usr/bin/env python3
"""Verifica con sympy los cálculos de apuntes/3-eso/11-funciones/index.qmd."""
from sympy import symbols, solve, Rational as R, sqrt, S, Interval, oo, simplify, solveset, FiniteSet, Reals
from sympy.calculus.util import continuous_domain
from _comun import ok, fin

x = symbols('x', real=True)
ok([R(18, 10) * k for k in range(4)] == [0, R(18, 10), R(36, 10), R(54, 10)], "tabla naranjas")
f = 1 / (x - 2)
ok(continuous_domain(f, x, Reals) == S.Reals - FiniteSet(2), "dominio 1/(x-2)")
g = sqrt(x - 3)
ok(continuous_domain(g, x, Reals) == Interval(3, oo), "dominio sqrt(x-3)")
h = x**2 - 4
ok(sorted(solve(h, x)) == [-2, 2] and h.subs(x, 0) == -4, "cortes")
ok(simplify(h.subs(x, -x) - h) == 0, "par")
ok(solve(h.diff(x), x) == [0] and h.diff(x, 2) == 2 > 0, "mínimo en x=0")
ok(h.diff(x).subs(x, -1) < 0 and h.diff(x).subs(x, 1) > 0, "decrece antes y crece después")
ok(R(3**2 - 1**2, 3 - 1) == 4, "TVM x^2")
ok(R(26 - 8, 15 - 6) == 2, "TVM temperatura")
# par e impar
ok(simplify((x**3).subs(x, -x) + x**3) == 0 and simplify((x**2).subs(x, -x) - x**2) == 0, "impar y par")
# TVM de una recta = pendiente
m, n = 5, -2
for a, b in [(0, 1), (2, 7), (-3, 4)]:
    ok(R((m * b + n) - (m * a + n), b - a) == m, f"TVM recta [{a},{b}]")
fin("tema 11")
