#!/usr/bin/env python3
"""Verifica con sympy los cálculos de apuntes/3-eso/07-sistemas-ecuaciones/index.qmd."""
from sympy import symbols, solve, Eq, Rational as R, linsolve, Matrix
from _comun import ok, fin

x, y, c, b = symbols('x y c b')
ok(2 * 2 + 3 == 7 and 2 - 3 == -1 and solve([2 * x + y - 7, x - y + 1], [x, y]) == {x: 2, y: 3}, "sistema base")
ok(2 * (3 - 1) + 3 == 7, "sustitución")
ok(7 - 2 * 2 == 2 + 1 == 3, "igualación")
ok(solve([3 * x + 2 * y - 12, 5 * x - 4 * y + 2], [x, y]) == {x: 2, y: 3} and 6 * 2 + 5 * 2 == 22, "reducción")
ok(linsolve([x + 2 * y - 4, 2 * x + 4 * y - 8], [x, y]) != set() and Matrix([[1, 2], [2, 4]]).rank() == 1 and Matrix([[1, 2, 4], [2, 4, 8]]).rank() == 1, "indeterminado")
ok(Matrix([[1, 2], [2, 4]]).rank() == 1 and Matrix([[1, 2, 4], [2, 4, 5]]).rank() == 2 and solve([x + 2 * y - 4, 2 * x + 4 * y - 5], [x, y]) == [], "incompatible")
ok(R(1, 2) == R(2, 4) == R(4, 8) and R(1, 2) == R(2, 4) != R(4, 5), "criterio de cocientes")
sol = solve([x + y - 5, x * y - 6], [x, y])
ok(sorted(sol) == [(2, 3), (3, 2)], "no lineal")
ok(solve([2 * c + 3 * b - R(810, 100), 3 * c + 2 * b - R(765, 100)], [c, b]) == {c: R(135, 100), b: R(180, 100)}, "cafetería")
ok(R(270, 100) + R(540, 100) == R(810, 100) and R(405, 100) + R(360, 100) == R(765, 100), "comprobación cafetería")
ok(6 * R(135, 100) + 9 * R(180, 100) == R(243, 10) and 6 * R(135, 100) + 4 * R(180, 100) == R(153, 10), "reducción cafetería")
fin("tema 07")
