#!/usr/bin/env python3
"""Verifica con sympy los cálculos de apuntes/3-eso/02-potencias-raices/index.qmd."""
from sympy import Rational as R, sqrt, cbrt, root, real_root, simplify, radsimp, Integer, nsimplify, factorint, S
from _comun import ok, fin

ok(2**5 == 32 and (-3)**2 == 9 and (-3)**3 == -27 and -3**2 == -9, "signos")
ok(R(5)**-2 == R(1, 25) and R(2, 3)**-3 == R(27, 8), "negativos")
ok(2**3 * 2**4 == 2**7 and 3**5 // 3**2 == 3**3 and (5**2)**3 == 5**6, "propiedades")
ok(2**3 * 5**3 == 10**3 and 12**2 // 4**2 == 3**2, "igual exponente")
ok(R(2**5, 1) * R(4)**-1 / 8**2 == R(1, 8) == R(2)**-3, "simplificar")
ok(R(4)**-1 == R(1, 4) and R(2)**5 * R(2)**-2 == 8 and R(8, 64) == R(1, 8), "pasos")
# notación científica
ok(149_600_000 == R('1.496') * 10**8, "1,496e8"); ok(R('0.00000053') == R('5.3') * R(10)**-7, "5,3e-7")
ok(R('3.2e5') * R('2e-2') == R('6.4e3'), "producto n.c."); ok(R('4.5e6') + R('3e5') == R('4.8e6'), "suma n.c.")
# raíces
ok(sqrt(49) == 7 and real_root(-8, 3) == -2, "raices exactas")
ok(root(2**6, 3) == 4 and R(2)**(R(6, 3)) == 4, "fraccionario")
ok(sqrt(9 + 16) == 5 and sqrt(9) + sqrt(16) == 7 and sqrt(25) != 7, "sqrt(a+b)")
ok(simplify(sqrt(72) - 6 * sqrt(2)) == 0 and factorint(72) == {2: 3, 3: 2}, "sqrt72")
ok(simplify(cbrt(54) - 3 * cbrt(2)) == 0 and factorint(54) == {2: 1, 3: 3}, "cbrt54")
ok(simplify(3 * sqrt(2) + 5 * sqrt(2) - 8 * sqrt(2)) == 0, "semejantes")
ok(simplify(sqrt(50) - sqrt(18) - 2 * sqrt(2)) == 0 and 5 * sqrt(2) - 3 * sqrt(2) == 2 * sqrt(2), "50-18")
ok(simplify(6 / sqrt(3) - 2 * sqrt(3)) == 0, "racionalizar 6/sqrt3")
ok(simplify(1 / (2 + sqrt(3)) - (2 - sqrt(3))) == 0 and ((2 + sqrt(3)) * (2 - sqrt(3))).expand() == 1, "conjugado")
ok(simplify(sqrt(3) * sqrt(12) - 6) == 0, "producto de raíces")
ok(simplify(sqrt(2 * 3) - sqrt(2) * sqrt(3)) == 0 and simplify(root(root(64, 2), 3) - root(64, 6)) == 0, "propiedades radicales")
# errores
ea = abs(float(sqrt(2)) - 1.41); er = ea / float(sqrt(2))
ok(abs(ea - 0.0042) < 5e-5 and abs(er * 100 - 0.30) < 0.005, "errores")
fin("tema 02")
