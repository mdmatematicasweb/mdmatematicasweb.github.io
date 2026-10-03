#!/usr/bin/env python3
"""Verifica con sympy/mpmath todos los cálculos de apuntes/2-bachillerato-ccss/11-muestreo-inferencia/index.qmd.

Cada resultado con la normal se calcula de dos formas: «como un alumno» (con la tabla de la normal estándar: 4 decimales
hasta z = 2,6 y 5 decimales desde z = 2,7, z redondeado a 2 decimales y valores críticos de la tabla o interpolados) y con
el valor exacto. Si difieren en el resultado final tal y como se muestra en el texto, se imprime una línea AVISO (no es un
fallo: el examen acepta la tabla).

Uso:  python scripts/ccss/verificar_11.py     (requiere `pip install sympy mpmath`)

Termina con código 0 si pasan todas las comprobaciones y con código 1 en cuanto falla alguna.
"""
import math
import random
import sys
from decimal import Decimal, ROUND_HALF_UP

try:
    from mpmath import mp, mpf, erf, sqrt as msqrt, findroot
    from sympy import Rational as R
except ImportError:
    sys.exit("Falta sympy/mpmath: pip install sympy mpmath")

mp.dps = 30
n = 0
avisos = []


def ok(cond, msg):
    """Cuenta una comprobación; si falla, lo dice y sale con código 1 (no usa assert, que `python -O` desactiva)."""
    global n
    if not cond:
        print("FALLA:", msg, file=sys.stderr)
        sys.exit(1)
    n += 1


def Phi(z):
    return (1 + erf(mpf(z) / msqrt(2))) / 2


def r(v, nd):
    return float(Decimal(str(v)).quantize(Decimal(1).scaleb(-nd), rounding=ROUND_HALF_UP))


def tabla(z):
    z = round(z, 2)
    return r(Phi(z), 4 if z < 2.7 - 1e-9 else 5)


def T(z):
    z = round(float(z), 2)
    return tabla(z) if z >= 0 else r(1 - tabla(-z), 5)


def zcrit(conf):
    """Valor crítico exacto z_{α/2} para un nivel de confianza dado."""
    return float(findroot(lambda t: Phi(t) - mpf(1 - (1 - conf) / 2), 1.9))


def aviso(nombre, con_tabla, exacto, nd=4):
    if r(exacto, nd) != con_tabla:
        avisos.append(f"{nombre}: con la tabla {con_tabla}, exacto {r(exacto, nd)}")


# --- 3. Distribuciones muestrales ---
mu, sg, n1 = 1200, 300, 100
se = sg / math.sqrt(n1)
ok(se == 30.0, "σ/√n = 30")
ok((1236 - mu) / se == 1.2 and r(1 - T(1.2), 4) == 0.1151, "P(X̄>1236) = 0,1151"); aviso("P(X̄>1236)", 0.1151, 1 - Phi(1.2))
ok((1185 - mu) / se == -0.5 and (1245 - mu) / se == 1.5 and r(T(1.5) - T(-0.5), 4) == 0.6247 and r(0.9332 - (1 - 0.6915), 4) == 0.6247, "P(1185<X̄<1245) = 0,6247")
aviso("P(1185<X̄<1245)", 0.6247, Phi(1.5) - Phi(-0.5))
p0, n2 = 0.4, 150
sep = math.sqrt(p0 * (1 - p0) / n2)
ok(abs(sep - 0.04) < 1e-12, "√(pq/n) = 0,04")
ok(abs((0.46 - p0) / sep - 1.5) < 1e-9 and r(1 - T(1.5), 4) == 0.0668, "P(p̂≥0,46) = 0,0668"); aviso("P(p̂≥0,46)", 0.0668, 1 - Phi(1.5))
ok(abs((0.35 - p0) / sep + 1.25) < 1e-9 and r(T(-1.25), 4) == 0.1056, "P(p̂≤0,35) = 0,1056"); aviso("P(p̂≤0,35)", 0.1056, Phi(-1.25))
# --- 4. Valores críticos y lectura de la tabla ---
ok(tabla(1.96) == 0.9750 and abs(zcrit(0.95) - 1.96) < 1e-4, "95 %: 0,975 aparece en la tabla (z=1,96)")
ok(tabla(1.64) == 0.9495 and tabla(1.65) == 0.9505 and abs(0.95 - 0.9495 - (0.9505 - 0.95)) < 1e-12, "90 %: 0,9495 y 0,9505 equidistan de 0,95")
ok(abs((1.64 + 0.01 * (0.95 - 0.9495) / (0.9505 - 0.9495)) - 1.645) < 1e-9 and abs(zcrit(0.90) - 1.6449) < 1e-4, "90 %: interpolación 1,645; exacto 1,6449")
ok(tabla(2.57) == 0.9949 and tabla(2.58) == 0.9951 and abs((0.995 - 0.9949) - (0.9951 - 0.995)) < 1e-12, "99 %: 0,9949 y 0,9951 equidistan de 0,995")
ok(abs((2.57 + 0.01 * (0.995 - 0.9949) / (0.9951 - 0.9949)) - 2.575) < 1e-9 and abs(zcrit(0.99) - 2.5758) < 1e-4, "99 %: interpolación 2,575; exacto 2,5758")
ok([tabla(1.96), tabla(1.64), tabla(1.65), tabla(2.57), tabla(2.58)] == [0.975, 0.9495, 0.9505, 0.9949, 0.9951], "valores de la tabla usados")
# --- IC para la media: x̄ = 420, σ = 60, n = 100 ---
xb, s, n3 = 420, 60, 100
sn = s / math.sqrt(n3)
ok(sn == 6.0, "σ/√n = 6")


def ic(z):
    E = z * sn
    return round(E, 2), round(xb - E, 2), round(xb + E, 2)


filas = {0.90: (1.645, (9.87, 410.13, 429.87)), 0.95: (1.96, (11.76, 408.24, 431.76)), 0.99: (2.575, (15.45, 404.55, 435.45))}
for conf, (zt, esperado) in filas.items():
    ok(ic(zt) == esperado, f"IC {int(conf*100)} % con z={zt}")
    ze = zcrit(conf); Ee = ze * sn
    ex = (r(Ee, 2), r(xb - Ee, 2), r(xb + Ee, 2))
    ok(all(abs(a - b) < 0.011 for a, b in zip(ex, esperado)), f"el IC exacto difiere menos de 0,011 del de la tabla ({int(conf*100)} %)")
    for a, b, nom in zip(ex, esperado, ("E", "extremo inferior", "extremo superior")):
        if a != b:
            avisos.append(f"IC {int(conf*100)} % ({nom}): con la tabla {b}, exacto {a}")
ok(ic(1.64) == (9.84, 410.16, 429.84) and ic(1.65) == (9.9, 410.1, 429.9), "IC 90 % con z=1,64 y z=1,65")
ok(r(zcrit(0.90) * sn, 2) == 9.87 and r(xb - zcrit(0.90) * sn, 2) == 410.13 and r(xb + zcrit(0.90) * sn, 2) == 429.87, "IC 90 % con z exacto = (410,13; 429,87)")
ok(round(xb - 11.76, 2) == 408.24 and round(xb + 11.76, 2) == 431.76 and round(1.96 * 6, 2) == 11.76, "IC 95 % a mano")
ok(ic(2.57)[0] == 15.42 and ic(2.58)[0] == 15.48, "E con 2,57 y 2,58 (99 %)")
# --- 5. IC para la proporción ---
ph, n4 = R(120, 400), 400
ok(ph == R(3, 10), "p̂ = 0,3")
se4 = math.sqrt(0.3 * 0.7 / 400)
ok(round(se4, 4) == 0.0229, "error típico 0,0229")
E95, E90 = 1.96 * se4, 1.645 * se4
ok(round(E95, 4) == 0.0449 and (round(0.3 - E95, 4), round(0.3 + E95, 4)) == (0.2551, 0.3449), "IC 95 % para p = (0,2551; 0,3449)")
ok(round(E90, 4) == 0.0377 and (round(0.3 - E90, 4), round(0.3 + E90, 4)) == (0.2623, 0.3377), "IC 90 % para p = (0,2623; 0,3377)")
E95x = zcrit(0.95) * se4
ok((r(0.3 - E95x, 4), r(0.3 + E95x, 4)) == (0.2551, 0.3449), "IC 95 % exacto coincide")
ok(round((0.3 - E95) * 100, 1) == 25.5 and round((0.3 + E95) * 100, 1) == 34.5, "el IC al 95 % va del 25,5 % al 34,5 %")
# --- 6. Tamaño muestral mínimo ---
ok(1.96 * 60 / 8 == 14.7 and abs(14.7 ** 2 - 216.09) < 1e-9 and math.ceil(14.7 ** 2) == 217, "n ≥ 216,09 → 217")
ok(math.ceil((zcrit(0.95) * 60 / 8) ** 2) == 217, "n exacto (95 %) = 217")
p05 = 1.96 ** 2 * 0.25 / 0.03 ** 2
ok(abs(p05 - 1067.1111) < 1e-3 and math.ceil(p05) == 1068 and math.ceil(zcrit(0.95) ** 2 * 0.25 / 0.03 ** 2) == 1068, "n (p=0,5) = 1068")
p03 = 1.96 ** 2 * 0.3 * 0.7 / 0.03 ** 2
ok(abs(p03 - 896.3733) < 1e-3 and math.ceil(p03) == 897 and math.ceil(zcrit(0.95) ** 2 * 0.21 / 0.03 ** 2) == 897, "n (p=0,3) = 897")
ok(p05 > p03, "p = 0,5 da el mayor tamaño")
nm = lambda z: math.ceil((z * 60 / 8) ** 2)
ok([nm(1.64), nm(1.645), nm(1.65)] == [152, 153, 154] and nm(zcrit(0.90)) == 153, "n (90 %) = 152, 153, 154; exacto 153")
ok([nm(2.57), nm(2.575), nm(2.58)] == [372, 373, 375] and nm(zcrit(0.99)) == 374, "n (99 %) = 372, 373, 375; exacto 374")
avisos.append("n mínimo (99 %): con la tabla (z=2,575) 373, exacto (z=2,5758) 374; con 2,57 → 372 y con 2,58 → 375")
# --- 7. Relación confianza - error - tamaño ---
ok([round(1.96 * 60 / math.sqrt(k), 2) for k in (100, 400, 1600)] == [11.76, 5.88, 2.94], "E con n = 100, 400, 1600")
ok(abs(1.96 * 60 / math.sqrt(400) - 1.96 * 60 / math.sqrt(100) / 2) < 1e-12 and abs(1.96 * 60 / math.sqrt(1600) - 1.96 * 60 / math.sqrt(400) / 2) < 1e-12, "cuadruplicar n divide E entre 2")
ok(ic(1.645)[0] < ic(1.96)[0] < ic(2.575)[0], "más confianza, más error")
ok(all(1.96 * 60 / math.sqrt(k + 1) < 1.96 * 60 / math.sqrt(k) for k in range(30, 2000)), "E decrece con n")
# Datos de la figura: curva E(n) y valores críticos
ok(abs(Phi(1.96) - mpf("0.975")) < 1e-4 and abs((1 - 0.95) / 2 - 0.025) < 1e-12, "área central 0,95 y colas 0,025 entre ±1,96")
ok(abs(float(Phi(1.96) - Phi(-1.96)) - 0.95) < 1e-4, "P(-1,96 < Z < 1,96) ≈ 0,95")
# Simulación: la cobertura de los IC al 95 % es ≈ 0,95
random.seed(3)
cubre = 0; reps = 2000
for _ in range(reps):
    muestra = [random.gauss(420, 60) for _ in range(100)]
    m = sum(muestra) / 100
    if m - 1.96 * 6 <= 420 <= m + 1.96 * 6:
        cubre += 1
ok(0.93 < cubre / reps < 0.97, "simulación: ≈ 95 % de los intervalos contienen a la media")
cubre = 0
for _ in range(reps):
    exitos = sum(1 for _ in range(400) if random.random() < 0.3)
    q = exitos / 400; e = 1.96 * math.sqrt(q * (1 - q) / 400)
    if q - e <= 0.3 <= q + e:
        cubre += 1
ok(0.93 < cubre / reps < 0.97, "simulación: ≈ 95 % de los intervalos de la proporción contienen a p")
print(f"OK: {n} comprobaciones superadas")
for a in avisos:
    print("AVISO (tabla ≠ exacto):", a)
