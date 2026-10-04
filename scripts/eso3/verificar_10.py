#!/usr/bin/env python3
"""Verifica con sympy los cálculos de apuntes/3-eso/10-cuerpos-geometricos/index.qmd."""
from math import pi, sqrt, isclose
from sympy import Rational as R, pi as PI, sqrt as ssqrt, N
from _comun import ok, fin

# Euler y sólidos platónicos
platonicos = {"tetraedro": (4, 4, 6), "cubo": (6, 8, 12), "octaedro": (8, 6, 12), "dodecaedro": (12, 20, 30), "icosaedro": (20, 12, 30)}
for nom, (C, V, A) in platonicos.items(): ok(C + V == A + 2, f"Euler {nom}")
ok(12 * 5 // 2 == 30 and 12 * 5 // 3 == 20 and 20 * 3 // 2 == 30 and 20 * 3 // 5 == 12, "aristas y vértices del dodecaedro y el icosaedro")
ok(4 * 3 // 2 == 6 and 6 * 4 // 2 == 12 and 8 * 3 // 2 == 12, "aristas")
# ortoedro
ok(4 * 3 * 5 == 60 and 2 * (12 + 20 + 15) == 94 and isclose(sqrt(50), 7.07, abs_tol=0.005), "ortoedro")
# pirámide regular base cuadrada l=6, h=4
ap = sqrt(4**2 + 3**2); ok(ap == 5 and 24 * 5 / 2 == 60 and 60 + 36 == 96 and 36 * 4 / 3 == 48, "pirámide")
# cilindro, cono, esfera
ok(isclose(90 * pi, 282.74, abs_tol=0.005) and isclose(90 * pi / 1000, 0.28, abs_tol=0.005), "lata volumen")
ok(isclose(2 * pi * 3 * 13, 245.04, abs_tol=0.005) and 2 * 3 * 13 == 78, "lata área")
g = sqrt(3**2 + 4**2); ok(g == 5 and isclose(pi * 3 * (5 + 3), 75.40, abs_tol=0.005) and 24 == 3 * 8 and isclose(pi * 9 * 4 / 3, 37.70, abs_tol=0.005), "cono")
ok(isclose(4 * pi * 25, 314.16, abs_tol=0.005) and isclose(4 / 3 * pi * 125, 523.60, abs_tol=0.005), "esfera")
ok(8 * 4 * 1.5 == 48 and 48 * 1000 == 48000, "piscina")
# semejanza
ok(R(1, 2)**2 == R(1, 4) and R(1, 2)**3 == R(1, 8), "k=1/2")
# número de planos de simetría de un cubo = 9 (3 paralelos a caras + 6 diagonales)
ok(3 + 6 == 9, "planos de simetría del cubo")
# volumen de un cono = 1/3 del cilindro: verificación por integración con sympy
from sympy import symbols, integrate
t, r, h = symbols('t r h', positive=True)
ok(integrate(PI * (r * t / h)**2, (t, 0, h)) == PI * r**2 * h / 3, "V del cono por integración")
ok(integrate(PI * (r**2 - t**2), (t, -r, r)) == R(4, 3) * PI * r**3, "V de la esfera por integración")
fin("tema 10")
