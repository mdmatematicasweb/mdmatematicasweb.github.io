#!/usr/bin/env python3
"""Verifica con sympy los cálculos de apuntes/3-eso/03-progresiones/index.qmd."""
from sympy import Rational as R, symbols, summation, oo, simplify, floor
from _comun import ok, fin

n = symbols('n', integer=True, positive=True)
ok([k**2 - 1 for k in range(1, 6)] == [0, 3, 8, 15, 24] and 10**2 - 1 == 99, "n^2-1")
fib = [1, 1]
for _ in range(4): fib.append(fib[-1] + fib[-2])
ok(fib == [1, 1, 2, 3, 5, 8], "Fibonacci")
ok([3 * k + 2 for k in range(1, 5)] == [5, 8, 11, 14] and 5 + 3 * 19 == 62 == 3 * 20 + 2, "aritmética 5,8,11")
ok(sum(range(1, 101)) == 5050 == (1 + 100) * 100 // 2, "Gauss")
a15 = 12 + 14 * 2; ok(a15 == 40 and sum(12 + 2 * k for k in range(15)) == 390 == (12 + 40) * 15 // 2, "teatro")
ok([3 * 2**(k - 1) for k in range(1, 5)] == [3, 6, 12, 24] and 3 * 2**7 == 384, "geométrica 3,6,12")
ok(sum(3 * 2**k for k in range(6)) == 189 == 3 * (2**6 - 1) // (2 - 1) and [3 * 2**k for k in range(6)][-1] == 96, "S6")
ok(summation(R(1, 2)**n, (n, 1, oo)) == 1 and 1 / (1 - R(1, 2)) == 2, "suma infinita 1/2")
ok(R(9, 10) / (1 - R(1, 10)) == 1, "0,999...")
ok(abs(2000 * 1.03**4 - 2251.02) < 0.006, "interés compuesto")
cuad = [k**2 for k in range(1, 5)]
dif = [cuad[i + 1] - cuad[i] for i in range(3)]; coc = [R(cuad[i + 1], cuad[i]) for i in range(3)]
ok(dif == [3, 5, 7] and coc == [4, R(9, 4), R(16, 9)] and len(set(dif)) > 1 and len(set(coc)) > 1, "cuadrados ni una ni otra")
# fórmulas generales con simbolos
a1, d, r, m = symbols('a1 d r m')
ok(simplify(summation(a1 + (n - 1) * d, (n, 1, m)) - (a1 + a1 + (m - 1) * d) * m / 2) == 0, "S_n aritmética general")
for r0 in (2, -3, R(1, 2), R(-2, 3)):
    for m0 in range(1, 9):
        ok(sum(5 * r0**k for k in range(m0)) == 5 * (r0**m0 - 1) / (r0 - 1), f"S_n geométrica r={r0} n={m0}")
fin("tema 03")
