#!/usr/bin/env python3
"""Verifica con sympy los cálculos de apuntes/3-eso/05-polinomios/index.qmd."""
from sympy import symbols, expand, factor, div, Poly, simplify, cancel, Rational as R
from _comun import ok, fin

x, y, a, b = symbols('x y a b')
ok((2 * x**2 - 5 * x + 1).subs(x, 3) == 4, "valor numérico")
ok(expand(5 * x**2 - 3 * x**2 + x**2 - 3 * x**2) == 0, "semejantes")
P = 4 * x**3 - 2 * x**2 + x - 7
ok(P.subs(x, 2) == 19 and Poly(P, x).degree() == 3 and Poly(-4 * x**3 * y, x, y).total_degree() == 4, "P(2) y grados")
ok(expand((3 * x**2 - x + 5) - (x**2 + 4 * x - 2)) == 2 * x**2 - 5 * x + 7, "resta")
ok(expand((x - 3) * (2 * x**2 + x - 1)) == 2 * x**3 - 5 * x**2 - 4 * x + 3, "producto")
ok(expand((-2 * x)**3) == -8 * x**3 and expand((x**2)**3) == x**6, "potencias")
D = x**3 + 2 * x**2 - 5 * x + 1
q, r = div(D, x - 2, x)
ok(q == x**2 + 4 * x + 3 and r == 7, "división")
ok(expand((x - 2) * (x**2 + 4 * x + 3) + 7) == D and D.subs(x, 2) == 7, "comprobación y resto")
ok(expand((a + b)**2) == a**2 + 2 * a * b + b**2 and expand((a - b)**2) == a**2 - 2 * a * b + b**2 and expand((a + b) * (a - b)) == a**2 - b**2, "notables")
ok((3 + 4)**2 == 49 and 3**2 + 4**2 == 25, "error frecuente")
ok(expand((x + 5)**2) == x**2 + 10 * x + 25 and expand((2 * x - 3)**2) == 4 * x**2 - 12 * x + 9 and expand((3 * x + 2) * (3 * x - 2)) == 9 * x**2 - 4, "ejemplos notables")
ok(factor(6 * x**3 - 9 * x**2) == 3 * x**2 * (2 * x - 3), "factor común")
ok(factor(x**2 - 16) == (x + 4) * (x - 4) and factor(x**2 + 6 * x + 9) == (x + 3)**2, "notables inversos")
ok(factor(x**2 - 5 * x + 6) == (x - 2) * (x - 3), "raíces 2 y 3")
ok(cancel((x**2 - 9) / (x**2 - 3 * x)) == (x + 3) / x, "fracción algebraica")
# resto de dividir entre x-a es P(a)
for aa in range(-4, 5):
    ok(div(D, x - aa, x)[1] == D.subs(x, aa), f"teorema del resto a={aa}")
# regla del área
ok(expand((a + b)**2 - a**2 - b**2 - 2 * a * b) == 0, "área del cuadrado")
fin("tema 05")
