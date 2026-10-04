#!/usr/bin/env python3
"""Verifica con sympy los cálculos de apuntes/3-eso/09-movimientos-semejanzas/index.qmd."""
from math import isclose, sqrt, cos, sin, pi
from sympy import Rational as R, Matrix, Point, symbols, solve
from _comun import ok, fin

# traslación
v = (3, -2)
ok((1 + v[0], 4 + v[1]) == (4, 2) and (-2 + v[0], 0 + v[1]) == (1, -2), "traslación")
# giros (matriz de rotación) y fórmulas de la tabla
def giro(P, grados):
    a = grados * pi / 180
    return (round(P[0] * cos(a) - P[1] * sin(a), 9), round(P[0] * sin(a) + P[1] * cos(a), 9))
for P in [(3, 1), (2, -5), (-4, 7), (0, 6), (-3, -1)]:
    x, y = P
    ok(giro(P, 90) == (-y, x) and giro(P, 180) == (-x, -y) and giro(P, 270) == (y, -x), f"giros {P}")
ok(giro((3, 1), 90) == (-1, 3), "P(3,1) 90")
ok(isclose(sqrt(3**2 + 1), sqrt(1 + 3**2)), "OP = OP'")
ok(360 / 4 == 90 and 360 / 3 == 120 and 360 / 5 == 72, "simetrías de rotación")
# simetrías axiales: eje es mediatriz
for P in [(2, 5), (-3, 4), (6, -1)]:
    x, y = P
    for P2, eje in [((x, -y), 'OX'), ((-x, y), 'OY'), ((y, x), 'y=x')]:
        M = ((x + P2[0]) / 2, (y + P2[1]) / 2)
        dir_ = (P2[0] - x, P2[1] - y)
        if eje == 'OX': ok(M[1] == 0 and dir_[0] == 0, f"{eje} mediatriz {P}")
        if eje == 'OY': ok(M[0] == 0 and dir_[1] == 0, f"{eje} mediatriz {P}")
        if eje == 'y=x': ok(M[0] == M[1] and dir_[0] == -dir_[1], f"{eje} mediatriz {P}")
# Tales
ok(R(18, 10) * R(72, 12) == R(108, 10), "sombra 10,8")
x = symbols('x'); ok(solve(x / R(18, 10) - R(72, 10) / R(12, 10), x) == [R(108, 10)], "Tales árbol")
# semejanza
k = 3
ok(12 * k == 36 and 10 * k**2 == 90, "k=3")
# teoremas del cateto y de la altura en un triángulo 3-4-5 (hipotenusa 5, catetos 3 y 4)
c, a, b = 5, 3, 4; m = R(a**2, c); n = c - m; h2 = m * n
ok(a**2 == c * m and b**2 == c * n and h2 == R(144, 25) == (R(a * b, c))**2, "cateto y altura")
# escalas
ok(R(35, 10) * 200 == 700 and 700 / 100 == 7 and 2 * 200 / 100 == 4 and 7 * 4 == 28, "salón 7x4")
ok(R(1, 50)**2 == R(1, 2500) and R(1, 50)**3 == R(1, 125000), "maqueta")
fin("tema 09")
