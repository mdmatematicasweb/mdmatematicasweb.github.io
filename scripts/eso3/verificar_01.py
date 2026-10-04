#!/usr/bin/env python3
"""Verifica con sympy los cálculos de apuntes/3-eso/01-numeros-racionales/index.qmd.

Uso:  python scripts/eso3/verificar_01.py     (código 1 si falla alguna comprobación)
"""
from math import gcd
from sympy import Rational as R, factorint, lcm, Integer, nsimplify, floor
from _comun import ok, fin


def mcm(a, b): return a * b // gcd(a, b)


# 1. Factorización, mcd y mcm
ok(factorint(210) == {2: 1, 3: 1, 5: 1, 7: 1}, "210")
ok(factorint(270) == {2: 1, 3: 3, 5: 1}, "270")
ok(factorint(66) == {2: 1, 3: 1, 11: 1}, "66")
ok(factorint(18) == {2: 1, 3: 2} and factorint(20) == {2: 2, 5: 1}, "18 y 20")
ok(gcd(18, 20) == 2 and mcm(18, 20) == 180 == 2**2 * 3**2 * 5, "mcd/mcm 18,20")
ok(180 / 60 == 3, "3 horas")
# 2. Fracciones
ok(R(3, 5) * 9600 == 5760, "3/5 de 9600")
ok(-6 * 15 == -90 == 5 * (-18), "producto cruzado -6/5=-18/15")
ok(R(-6, 5) == R(-18, 15), "equivalentes")
ok(8 * 17 == 136 and 7 * 4 == 28 and R(8, 7) != R(4, 17), "8/7 y 4/17")
ok(R(12, 18) == R(2, 3) == R(10, 15), "12/18 y 10/15")
ok(R(7, 14) == R(1, 2) and R(165, 11) == 15, "primo no implica irreducible")
ok(sorted([R(5, 6), R(3, 4), R(7, 9)]) == [R(3, 4), R(7, 9), R(5, 6)], "orden")
ok(mcm(mcm(6, 4), 9) == 36 and (R(5, 6) * 36, R(3, 4) * 36, R(7, 9) * 36) == (30, 27, 28), "común denominador 36")
# 3. Operaciones
ok(R(1, 2) + R(5, 3) == R(13, 6), "suma"); ok(R(3, 4) - R(5, 6) == R(-1, 12), "resta")
ok(R(4, 9) * R(3, 10) == R(2, 15), "producto"); ok(R(3, 5) / R(9, 10) == R(2, 3), "cociente")
ok(R(1, 2) - R(-2, 5) * R(1, 3) == R(19, 30), "combinada")
ok(R(1, 2) + R(2, 15) == R(19, 30) and R(15, 30) + R(4, 30) == R(19, 30), "pasos combinada")


# 4. Decimales
def periodo(p, q, n=40):
    """Devuelve (parte entera, parte decimal no periódica, periodo) de p/q positiva."""
    ent, r = divmod(p, q); vistos = {}; dig = []
    while r and r not in vistos:
        vistos[r] = len(dig); r *= 10; dig.append(r // q); r %= q
    if not r: return ent, ''.join(map(str, dig)), ''
    i = vistos[r]
    return ent, ''.join(map(str, dig[:i])), ''.join(map(str, dig[i:]))


ok(periodo(3, 4) == (0, '75', ''), "3/4 exacto")
ok(periodo(1, 3) == (0, '', '3'), "1/3 puro")
ok(periodo(7, 6) == (1, '1', '6'), "7/6 mixto")
ok(R(325, 100) == R(13, 4) and R(13, 4) == R('3.25'), "3,25")
ok(periodo(7, 9) == (0, '', '7'), "0,7 periodo")
ok(periodo(26, 11) == (2, '', '36') and R(234, 99) == R(26, 11), "2,36 periodico")
ok(R(116 - 11, 90) == R(7, 6), "1,16 mixto")
ok(periodo(27, 110) == (0, '2', '45') and R(245 - 2, 990) == R(27, 110) and R(243, 990) == R(27, 110), "0,245 mixto")
ok(round(2 / 3, 2) == 0.67 and int(2 / 3 * 100) / 100 == 0.66, "redondeo y truncamiento")
# denominadores solo con 2 y 5 -> exacto
for q in range(2, 60):
    for p in range(1, q):
        if gcd(p, q) != 1: continue
        f = set(factorint(q))
        ok((periodo(p, q)[2] == '') == (f <= {2, 5}), f"exacto sii 2 y 5: {p}/{q}")
ok(R(7, 4) == R('1.75'), "7/4 recta")
fin("tema 01")
