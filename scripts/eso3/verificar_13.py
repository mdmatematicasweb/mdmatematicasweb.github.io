#!/usr/bin/env python3
"""Verifica con sympy/statistics los cálculos de apuntes/3-eso/13-estadistica/index.qmd."""
from collections import Counter
from math import sqrt, isclose
from statistics import mean, median, mode, pvariance, pstdev
from sympy import Rational as R
from _comun import ok, fin

datos = [0, 1, 1, 2, 1, 0, 3, 2, 1, 4, 2, 0, 1, 2, 2, 1, 3, 1, 0, 2]
N = len(datos); c = Counter(datos)
ok(N == 20 and [c[k] for k in range(5)] == [4, 7, 6, 2, 1], "frecuencias absolutas")
ok([R(c[k], N) for k in range(5)] == [R(20, 100), R(35, 100), R(30, 100), R(10, 100), R(5, 100)] and sum(R(c[k], N) for k in range(5)) == 1, "frecuencias relativas")
F = [sum(c[j] for j in range(k + 1)) for k in range(5)]
ok(F == [4, 11, 17, 19, 20], "acumuladas")
ok([100 * R(c[k], N) for k in range(5)] == [20, 35, 30, 10, 5] and sum(100 * R(c[k], N) for k in range(5)) == 100, "porcentajes")
ok(360 * R(35, 100) == 126, "sector 126")
ok(R(sum(k * c[k] for k in range(5)), N) == R(29, 20) == R('1.45') and mean(datos) == 1.45, "media")
ok(median(datos) == 1 and mode(datos) == 1, "mediana y moda")
sx2 = sum(k * k * c[k] for k in range(5)); ok(sx2 == 65, "suma f x^2")
var = R(65, 20) - R(29, 20)**2
ok(var == R(11475, 10000) == R('1.1475') and isclose(pvariance(datos), 1.1475) and isclose(float(sqrt(var)), pstdev(datos)) and isclose(pstdev(datos), 1.07, abs_tol=0.005), "varianza y desviación")
ok(R(65, 20) == R('3.25') and R(29, 20)**2 == R('2.1025'), "pasos varianza")
# varianza = media de cuadrados - cuadrado de la media y por definición
ok(isclose(sum((x - 1.45)**2 for x in datos) / 20, 1.1475), "varianza por definición")
# mediana con N par: los dos centrales son el 10º y 11º
orden = sorted(datos); ok(orden[9] == 1 and orden[10] == 1, "centrales")
# efecto de un atípico
sal = [1500] * 9 + [30000]; ok(median(sal) == 1500 and mean(sal) == 4350, "salarios")
fin("tema 13")
