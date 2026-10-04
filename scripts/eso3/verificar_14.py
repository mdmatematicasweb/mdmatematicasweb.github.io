#!/usr/bin/env python3
"""Verifica con sympy/itertools los cálculos de apuntes/3-eso/14-probabilidad/index.qmd."""
from itertools import product, permutations
from sympy import Rational as R
from _comun import ok, fin


def P(suceso, E):
    return R(sum(1 for e in E if suceso(e)), len(E))


dado = range(1, 7)
ok(R(185, 500) == R(37, 100), "chincheta")
ok(P(lambda d: d % 2 == 0, dado) == R(1, 2) and P(lambda d: d % 3 == 0, dado) == R(1, 3), "dado")
baraja = [(p, n) for p in ("oros", "copas", "espadas", "bastos") for n in range(1, 11)]
ok(len(baraja) == 40 and P(lambda c: c[1] == 1, baraja) == R(1, 10) and P(lambda c: c[0] == "oros", baraja) == R(1, 4), "baraja")
monedas = list(product("CX", repeat=2))
ok(monedas == [("C", "C"), ("C", "X"), ("X", "C"), ("X", "X")] and P(lambda m: set(m) == {"C", "X"}, monedas) == R(1, 2), "dos monedas")
dos = list(product(range(1, 7), repeat=2))
ok(P(lambda p: sum(p) == 7, dos) == R(6, 36) and P(lambda p: sum(p) == 2, dos) == R(1, 36), "suma 7 y suma 2")
A = lambda d: d % 2 == 0; B = lambda d: d > 4
ok(P(lambda d: A(d) or B(d), dado) == R(2, 3) and R(3, 6) + R(2, 6) - R(1, 6) == R(2, 3) and P(lambda d: A(d) and B(d), dado) == R(1, 6), "unión")
ok(P(lambda d: not A(d), dado) == 1 - P(A, dado), "contrario")
ok(3 * 4 == 12 and len(list(product(range(1, 6), repeat=3))) == 125 and len(list(permutations(range(1, 6), 3))) == 60, "recuento")
ok(R(1, 2) * R(1, 2) == R(1, 4), "CC")
bolsa = ["r"] * 3 + ["a"] * 2
con = list(product(bolsa, repeat=2)); sin = list(permutations(bolsa, 2))
ok(P(lambda p: p == ("r", "r"), con) == R(9, 25) == R(3, 5)**2, "con reemplazamiento")
ok(P(lambda p: p == ("r", "r"), sin) == R(3, 10) == R(3, 5) * R(2, 4), "sin reemplazamiento")
# ley de los grandes números (semilla fija)
import random
random.seed(0)
n = 20000; k = sum(1 for _ in range(n) if random.randint(1, 6) % 2 == 0)
ok(abs(k / n - 0.5) < 0.02, "frecuencia relativa ≈ 1/2")
fin("tema 14")
