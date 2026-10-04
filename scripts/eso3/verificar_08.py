#!/usr/bin/env python3
"""Verifica con sympy los cálculos de apuntes/3-eso/08-lugares-geometricos/index.qmd."""
from math import pi, sqrt, hypot, isclose, cos, sin, radians
from sympy import Rational as R, sqrt as ssqrt, Point, Triangle, symbols, solve, simplify, nsimplify
from _comun import ok, fin

ok(hypot(6, 8) == 10 and sqrt(13**2 - 5**2) == 12, "hipotenusa y cateto")
ok(5**2 + 12**2 == 13**2 and 4**2 + 5**2 == 41 != 6**2 and 3**2 + 4**2 == 5**2, "reconocer rectángulo")
ok(isclose(hypot(48, 27), 55.07, abs_tol=0.005), "diagonal pantalla")
ok(sqrt(5**2 - 3**2) == 4, "altura isósceles")
ok(hypot(5 - 1, 5 - 2) == 5, "distancia")
oct_R = 1 / (2 * sin(pi / 8)) # radio circunscrito/lado del octógono regular
ok(isclose(oct_R, 1.3066, abs_tol=5e-5), "proporción cordobesa")
ok(isclose((1 + sqrt(5)) / 2, 1.618, abs_tol=5e-4), "número de oro")
# puntos notables de un triángulo concreto
A, B, C = Point(0, 0), Point(6, 0), Point(2, 4)
T = Triangle(A, B, C)
cc = T.circumcenter
ok(A.distance(cc) == B.distance(cc) == C.distance(cc), "circuncentro equidista de los vértices")
ic = T.incenter
ok(simplify(T.incircle.radius - T.area * 2 / T.perimeter) == 0, "radio inscrito = 2A/P")
bc = T.centroid
ok(bc == Point(R(8, 3), R(4, 3)) and simplify(bc.distance(C) - 2 * C.distance(Point(3, 0)) / 3) == 0, "baricentro a 2/3 del vértice")
ok(T.orthocenter == Point(2, 2), "ortocentro")
# áreas
ap = sqrt(6**2 - 3**2); ok(isclose(ap, 5.196, abs_tol=0.001), "apotema hexágono")
ok(isclose(6 * 6 * 5.20 / 2, 93.6, abs_tol=0.1) and isclose(6 * 6 * ap / 2, 93.53, abs_tol=0.005), "hexágono")
ok(isclose(pi * 81 * 60 / 360, 42.41, abs_tol=0.005), "sector")
ok(isclose(60 * 30 + pi * 15**2, 2506.86, abs_tol=0.005), "pista")
ok(1 * 100 * 100 == 10_000, "m2 a cm2")
# fórmulas de áreas con un ejemplo
ok(R(1, 2) * 6 * 4 == 12 and R(1, 2) * (7 + 3) * 4 == 20 and R(1, 2) * 8 * 6 == 24, "triángulo, trapecio, rombo")
ok(isclose(pi * (5**2 - 3**2), 50.265, abs_tol=0.001), "corona")
fin("tema 08")
