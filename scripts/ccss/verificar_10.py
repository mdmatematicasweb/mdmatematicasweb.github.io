#!/usr/bin/env python3
"""Verifica con sympy/mpmath todos los cálculos de apuntes/2-bachillerato-ccss/10-distribuciones/index.qmd.

Cada resultado con la normal se calcula de dos formas: «como un alumno» (con la tabla de la normal estándar: 4 decimales
hasta z = 2,6 y 5 decimales desde z = 2,7, z redondeado a 2 decimales) y con el valor exacto. Si difieren en el resultado
final tal y como se muestra en el texto, se imprime una línea AVISO (no es un fallo: el examen acepta la tabla).

Uso:  python scripts/ccss/verificar_10.py     (requiere `pip install sympy mpmath`)

Termina con código 0 si pasan todas las comprobaciones y con código 1 en cuanto falla alguna.
"""
import random
import sys
from decimal import Decimal, ROUND_HALF_UP

try:
    from mpmath import mp, mpf, erf, sqrt as msqrt, findroot, exp as mexp, pi as mpi
    from sympy import Rational as R, binomial as C, integrate, symbols, sqrt, simplify, N as sN
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
    """Redondeo 'de alumno' (mitades hacia arriba) de un número a nd decimales."""
    return float(Decimal(str(v)).quantize(Decimal(1).scaleb(-nd), rounding=ROUND_HALF_UP))


def tabla(z):
    """Valor impreso en la tabla de P(Z ≤ z) para z ≥ 0 con dos decimales."""
    z = round(z, 2)
    return r(Phi(z), 4 if z < 2.7 - 1e-9 else 5)


def T(z):
    """P(Z ≤ z) con la tabla, para cualquier z (z se redondea a dos decimales; z<0 por simetría)."""
    z = round(float(z), 2)
    return tabla(z) if z >= 0 else r(1 - tabla(-z), 5)


def aviso(nombre, con_tabla, exacto, nd=4):
    if r(exacto, nd) != con_tabla:
        avisos.append(f"{nombre}: con la tabla {con_tabla:.{nd}f}, exacto {r(exacto, nd):.{nd}f}")


x = symbols('x', real=True)

# --- 1. Variables aleatorias ---
xs = [0, 100, 200, 300]; ps = [R(1, 10), R(3, 10), R(4, 10), R(2, 10)]
mu = sum(a * b for a, b in zip(xs, ps)); ex2 = sum(a * a * b for a, b in zip(xs, ps))
ok(sum(ps) == 1 and mu == 170 and ex2 == 37000 and ex2 - mu**2 == 8100 and sqrt(8100) == 90, "discreta: μ=170, σ²=8100, σ=90")
f = (10 - x) / 50
ok(integrate(f, (x, 0, 10)) == 1 and R(1, 2) * 10 * R(1, 5) == 1, "densidad con área 1 (triángulo base 10, altura 0,2)")
ok(integrate(f, (x, 0, 2)) == R(9, 25) and float(R(9, 25)) == 0.36 and integrate(f, (x, 5, 10)) == R(1, 4), "P(X≤2)=0,36 y P(X>5)=0,25")
muc = integrate(x * f, (x, 0, 10)); e2 = integrate(x**2 * f, (x, 0, 10))
ok(muc == R(10, 3) and e2 == R(50, 3) and e2 - muc**2 == R(50, 9), "continua: μ=10/3, E[X²]=50/3, σ²=50/9")
ok(round(float(muc), 2) == 3.33 and round(float(sqrt(R(50, 9))), 2) == 2.36, "μ ≈ 3,33 y σ ≈ 2,36")
ok(all(f.subs(x, v) >= 0 for v in range(0, 11)) and f.subs(x, 0) == R(1, 5), "f ≥ 0 y f(0) = 0,2")
# --- 2. Binomial B(8; 0,3) ---
p3 = R(3, 10)
pb = lambda nn, pp, k: C(nn, k) * pp**k * (1 - pp)**(nn - k)
ok(C(8, 3) == 56 and R(3, 10)**3 == R(27, 1000) and R(7, 10)**5 == R(16807, 100000), "ingredientes de P(X=3)")
ok(round(float(pb(8, p3, 3)), 4) == 0.2541, "P(X=3) ≈ 0,2541")
p0, p1 = pb(8, p3, 0), pb(8, p3, 1)
ok(round(float(p0), 4) == 0.0576 and round(float(p1), 4) == 0.1977 and round(float(1 - p0 - p1), 4) == 0.7447, "P(X≥2) ≈ 0,7447")
ok(sum(pb(8, p3, k) for k in range(9)) == 1 and 8 * p3 == R(12, 5) and round(float(sqrt(R(168, 100))), 3) == 1.296, "suma 1; μ=2,4; σ≈1,296")
# --- 3. Tabla de la normal ---
filas = {
    0.7: [0.7580, 0.7611, 0.7642, 0.7673, 0.7704, 0.7734, 0.7764, 0.7794, 0.7823, 0.7852],
    1.0: [0.8413, 0.8438, 0.8461, 0.8485, 0.8508, 0.8531, 0.8554, 0.8577, 0.8599, 0.8621],
    1.2: [0.8849, 0.8869, 0.8888, 0.8907, 0.8925, 0.8944, 0.8962, 0.8980, 0.8997, 0.9015],
    1.6: [0.9452, 0.9463, 0.9474, 0.9484, 0.9495, 0.9505, 0.9515, 0.9525, 0.9535, 0.9545],
    2.7: [0.99653, 0.99664, 0.99674, 0.99683, 0.99693, 0.99702, 0.99711, 0.99720, 0.99728, 0.99736],
}
for fila, vals in filas.items():
    ok([tabla(round(fila + c / 100, 2)) for c in range(10)] == vals, f"fila {fila} del extracto de la tabla")
ok(tabla(2.6) == r(Phi(2.6), 4) and tabla(2.7) == r(Phi(2.7), 5) and tabla(2.69) == r(Phi(2.69), 4), "4 decimales hasta 2,6x y 5 desde 2,7")
ok(T(-0.5) == r(1 - 0.6915, 4) and abs(T(-1.25) - (1 - 0.8944)) < 1e-9, "simetría: P(Z≤-z) = 1 - P(Z≤z)")
mu_, sg_ = 150, 40
z = lambda v: (v - mu_) / sg_
# P(X ≤ 180)
ok(z(180) == 0.75 and T(0.75) == 0.7734, "P(X≤180) = 0,7734"); aviso("P(X≤180)", 0.7734, Phi(0.75))
ok(z(200) == 1.25 and r(1 - T(1.25), 4) == 0.1056, "P(X>200) = 0,1056"); aviso("P(X>200)", 0.1056, 1 - Phi(1.25))
ok((z(130), z(190)) == (-0.5, 1.0), "z de 130 y 190")
ok(r(T(1) - T(-0.5), 4) == 0.5328 and r(0.8413 - (1 - 0.6915), 4) == 0.5328, "P(130<X<190) = 0,5328"); aviso("P(130<X<190)", 0.5328, Phi(1) - Phi(-0.5))
ok(z(110) == -1.0 and r(T(-1), 4) == 0.1587, "P(X<110) = 0,1587"); aviso("P(X<110)", 0.1587, Phi(-1))
ok(r(T(1) - T(-1), 4) == 0.6826, "P(-1<Z<1) con la tabla = 0,6826"); aviso("P(-1<Z<1)", 0.6826, Phi(1) - Phi(-1))
ok(r(Phi(1) - Phi(-1), 4) == 0.6827, "P(-1<Z<1) exacto = 0,6827 (difiere: aviso en el texto)")
ok(z(165) == 0.375 and round(0.375, 2) in (0.38, 0.37) and T(0.375) == 0.6480 and r(Phi(0.375), 4) == 0.6462, "z=0,375 → 0,38: 0,6480 frente a 0,6462 exacto")
aviso("P(X≤165) con z=0,375", T(0.375), Phi(0.375))
# Figura de la normal estándar
ok(tabla(0.75) == 0.7734 and r(1 - tabla(1.25), 4) == 0.1056 and T(-1.25) == r(1 - 0.8944, 4), "datos de fig-normal-tabla: 0,7734 y 0,1056 en cada cola")
ok(r(Phi(-1.25), 4) == 0.1056 and r(1 - Phi(1.25), 4) == 0.1056, "colas exactas: 0,1056")
# --- Lectura inversa ---
def mas_cercano(p):
    cand = sorted((abs(tabla(c / 100) - p), c / 100) for c in range(0, 350))
    return cand
c90 = mas_cercano(0.90)
ok(c90[0][1] == 1.28 and abs(c90[0][0] - 0.0003) < 1e-9 and c90[1][1] == 1.29 and abs(c90[1][0] - 0.0015) < 1e-9, "0,90: más cercanos 0,8997 (z=1,28) y 0,9015 (z=1,29)")
ok(tabla(1.28) == 0.8997 and tabla(1.29) == 0.9015, "valores de la tabla en 1,28 y 1,29")
z_int = 1.28 + 0.01 * (0.9000 - 0.8997) / (0.9015 - 0.8997)
ok(round(z_int, 4) == 1.2817, "interpolación: z ≈ 1,2817")
z_ex = float(findroot(lambda t: Phi(t) - mpf("0.9"), 1.3))
ok(round(z_ex, 5) == 1.28155, "z exacto 1,28155")
ks = [mu_ + sg_ * 1.28, mu_ + sg_ * z_int, mu_ + sg_ * z_ex]
ok(round(ks[0], 1) == 201.2 and round(ks[1], 2) == 201.27 and round(ks[2], 2) == 201.26, "k = 201,2; 201,27; 201,26")
ok({round(k) for k in ks} == {201}, "los tres dan k ≈ 201 minutos")
ok(tabla(1.50) == 0.9332 and mu_ + sg_ * 1.5 == 210, "0,9332 → z=1,50 → k=210")
ok(mas_cercano(0.9332)[0] == (0.0, 1.5), "0,9332 aparece en la tabla")
c95 = mas_cercano(0.95)
ok(tabla(1.64) == 0.9495 and tabla(1.65) == 0.9505 and abs(c95[0][0] - c95[1][0]) < 1e-9 and {c95[0][1], c95[1][1]} == {1.64, 1.65}, "0,95: empate entre 1,64 y 1,65")
ok(abs((1.64 + 0.01 * (0.95 - 0.9495) / (0.9505 - 0.9495)) - 1.645) < 1e-9, "interpolación z=1,645")
z95 = float(findroot(lambda t: Phi(t) - mpf("0.95"), 1.6))
k95 = [mu_ + sg_ * v for v in (1.64, 1.65, 1.645, z95)]
ok([round(k95[0], 1), round(k95[1], 1), round(k95[2], 1), round(k95[3], 2)] == [215.6, 216.0, 215.8, 215.79], "k = 215,6; 216,0; 215,8; exacto 215,79")
ok({round(k) for k in k95} == {216}, "los cuatro dan k ≈ 216 minutos")
ok(z(170) == 0.5 and 20 / 20 == 1 and tabla(1.00) == 0.8413 and mu_ + 20 * 1 == 170, "σ=20 con P(X≤170)=0,8413")
ok(abs(float(Phi(1)) - 0.8413) < 5e-5, "Φ(1) ≈ 0,8413")
# --- 4. Binomial → normal, B(150; 0,4) ---
nn, pp = 150, R(2, 5); qq = 1 - pp
ok(nn * pp == 60 and nn * qq == 90 and nn * pp >= 5 and nn * qq >= 5, "condiciones np=60 y nq=90")
ok(nn * pp * qq == 36 and sqrt(nn * pp * qq) == 6, "σ = 6")
cdf = lambda a, b: sum(pb(nn, pp, k) for k in range(a, b + 1))
ex1, ex2b, ex3 = cdf(68, 150), cdf(0, 55), cdf(53, 64)
ok((67.5 - 60) / 6 == 1.25 and r(1 - T(1.25), 4) == 0.1056, "P(X≥68) ≈ 0,1056"); aviso("P(X≥68) normal", 0.1056, 1 - Phi(1.25))
ok((55.5 - 60) / 6 == -0.75 and r(T(-0.75), 4) == 0.2266, "P(X≤55) ≈ 0,2266"); aviso("P(X≤55) normal", 0.2266, Phi(-0.75))
ok((52.5 - 60) / 6 == -1.25 and (64.5 - 60) / 6 == 0.75 and r(T(0.75) - T(-1.25), 4) == 0.6678, "P(53≤X≤64) ≈ 0,6678"); aviso("P(53≤X≤64) normal", 0.6678, Phi(0.75) - Phi(-1.25))
ok(r(float(ex1), 4) == 0.1061 and r(float(ex2b), 4) == 0.2274 and r(float(ex3), 4) == 0.6691, "binomiales exactas 0,1061; 0,2274; 0,6691")
ok(r(float(Phi(0.75) - Phi(-1.25)), 4) == 0.6677 and r(float(1 - Phi(1.25)), 4) == 0.1056 and r(float(Phi(-0.75)), 4) == 0.2266, "normal exacta 0,6677; 0,1056; 0,2266")
sin_cc = r(1 - T(round((68 - 60) / 6, 2)), 4)
ok(round((68 - 60) / 6, 2) == 1.33 and sin_cc == 0.0918, "sin corrección: P(Z≥1,33) = 0,0918")
ok(abs(sin_cc - float(ex1)) > abs(0.1056 - float(ex1)) * 10, "sin corrección el error es mucho mayor")
# Datos de la figura: barras y curva
pmf = lambda k: float(pb(nn, pp, k))
dens = lambda t: float(mexp(-((mpf(t) - 60) / 6) ** 2 / 2) / (6 * msqrt(2 * mpi)))
ok(all(abs(pmf(k) - dens(k)) < 0.0006 for k in range(46, 76)), "la curva N(60,6) sigue a las barras (error < 0,0006)")
ok(abs(sum(pmf(k) for k in range(68, 151)) - float(ex1)) < 1e-12, "área de las barras desde 68 = P(X≥68)")
# La aproximación con corrección mejora a la que no la tiene, en regiones aleatorias de colas
random.seed(10)
for _ in range(25):
    n_ = random.randint(100, 300); p_ = R(random.randint(30, 50), 100)
    mu2 = float(n_ * p_); sg2 = float(sqrt(n_ * p_ * (1 - p_))); k = round(mu2 + random.choice([1.0, 1.25, 1.5]) * sg2)
    cdf2 = lambda a, b: sum(pb(n_, p_, j) for j in range(a, b + 1))
    exacto = float(cdf2(k, n_)); con = float(1 - Phi((k - 0.5 - mu2) / sg2)); sin = float(1 - Phi((k - mu2) / sg2))
    ok(abs(con - exacto) < abs(sin - exacto), f"la corrección por continuidad acerca la aproximación (n={n_}, p={p_}, k={k})")
    ok(n_ * p_ >= 5 and n_ * (1 - p_) >= 5, "condiciones de la aproximación en los casos aleatorios")
ok(20 * R(1, 10) < 5 and 50 * R(1, 10) >= 5 and 50 * R(9, 10) >= 5, "ejemplos de condiciones: n=20,p=0,1 no vale; n=50,p=0,1 sí")
print(f"OK: {n} comprobaciones superadas")
for a in avisos:
    print("AVISO (tabla ≠ exacto):", a)
