#!/usr/bin/env python3
"""Verifica con sympy los cálculos de apuntes/3-eso/04-proporcionalidad/index.qmd."""
from sympy import Rational as R
from _comun import ok, fin

ok(R(11 * 72, 18) == 44 and 18 * 44 == 11 * 72, "proporción")
ok(R(45, 10) / 3 == R(3, 2) and 7 * R(3, 2) == R(21, 2) and R(7 * 45, 10 * 3) == R(21, 2), "manzanas")
ok(6 * 10 == 15 * 4, "operarios")
ok(960 * R(5, 8) * R(9, 6) == 900, "regla de tres compuesta")
ok(960 / 8 / 6 == 20 and 20 * 5 * 9 == 900, "piezas por máquina y hora")
tot = 2000 + 3000 + 5000
ok(tot == 10000 and [1200 * R(a, tot) for a in (2000, 3000, 5000)] == [240, 360, 600] and 240 + 360 + 600 == 1200, "reparto")
ok(R(15, 100) * 240 == 36 and R(18, 120) * 100 == 15 and R(36) / R(15, 100) == 240, "porcentajes")
ok(30 * R(80, 100) == 24 and 80 * R(121, 100) == R(9680, 100) and R(9680, 100) / R(121, 100) == 80, "descuento e IVA")
ok(R(110, 100) * R(90, 100) == R(99, 100), "10% sube y baja")
ok(5000 * R(4, 100) * 3 == 600 and 5000 + 600 == 5600, "interés simple")
ok(5000 * R(104, 100)**3 == R(5000 * 104**3, 100**3) and abs(float(5000 * R(104, 100)**3) - 5624.32) < 1e-9, "interés compuesto")
ok(R(210, 6) == R(35, 100) * 100 and R(210, 600) == R(7, 20) and R(156, 400) == R(39, 100) and R(35, 100) < R(39, 100), "precio unitario")
ok(250 * R(108, 100) == 270, "divisas")
ok(4 * 25000 == 100000 and 100000 / 100 / 1000 == 1, "escala")
fin("tema 04")
