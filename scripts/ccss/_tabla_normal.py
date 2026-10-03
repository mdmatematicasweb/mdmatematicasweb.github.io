"""Tabla de la normal N(0,1) como la del examen de la Junta de Andalucía, para los verificadores de los temas 09-11.

- `tabla(z)`: P(Z ≤ z) para z ≥ 0 con z redondeado a 2 decimales; 4 decimales hasta z = 2,6 y 5 decimales desde z = 2,7.
- `T(z)`: P(Z ≤ z) para cualquier z (z < 0 por simetría: 1 − tabla(|z|)).
- `z2(z)`: z redondeado a dos decimales (mitades hacia arriba), como lo haría un alumno.
- `leer_z(p)`: z de la tabla cuya probabilidad es exactamente p, o None si p no aparece.
- `inversa(p)`: para p que NO aparece, dict con el z más cercano (o los dos, si equidistan) y el z interpolado.
- `exacta(z)`: valor exacto con mpmath (solo para avisar de diferencias con la tabla).

Al importar, comprueba que la tabla reproduce los valores oficiales de la Junta; si alguno no coincide, el programa termina.
"""
import sys
from decimal import Decimal, ROUND_HALF_UP

try:
    from mpmath import mp, mpf, erf, sqrt as msqrt
except ImportError:
    sys.exit("Falta mpmath: pip install mpmath")
mp.dps = 30


def exacta(z):
    return (1 + erf(mpf(z) / msqrt(2))) / 2


def r(v, nd):
    """Redondeo de alumno (mitades hacia arriba) a nd decimales."""
    return float(Decimal(str(v)).quantize(Decimal(1).scaleb(-nd), rounding=ROUND_HALF_UP))


def z2(z):
    """z redondeado a 2 decimales con mitades hacia arriba (en valor absoluto)."""
    z = float(z)
    return -r(abs(z), 2) if z < 0 else r(z, 2)


def tabla(z):
    z = z2(z)
    if z < 0:
        raise ValueError("tabla solo admite z >= 0")
    return r(exacta(z), 4 if z < 2.7 - 1e-9 else 5)


def T(z):
    z = z2(z)
    return tabla(z) if z >= 0 else r(1 - tabla(-z), 5)


def _valores():
    return [(k / 100, tabla(k / 100)) for k in range(0, 400)]


def leer_z(p):
    for z, val in _valores():
        if abs(val - p) < 1e-12:
            return z
    return None


def inversa(p):
    """Lectura inversa de p (0,5 < p < 1) que no aparece en la tabla."""
    vals = _valores()
    for (z1, p1), (z2_, p2) in zip(vals, vals[1:]):
        if p1 < p < p2:
            d1, d2 = p - p1, p2 - p
            cercano = [z1] if d1 < d2 - 1e-12 else [z2_] if d2 < d1 - 1e-12 else [z1, z2_]
            return {"z1": z1, "z2": z2_, "p1": p1, "p2": p2, "cercano": cercano, "interp": z1 + 0.01 * (p - p1) / (p2 - p1)}
    return None


OFICIALES = {0.38: 0.6480, 1.64: 0.9495, 1.65: 0.9505, 1.96: 0.9750, 2.57: 0.9949, 2.58: 0.9951, 2.70: 0.99653, 3.00: 0.99865}
for _z, _p in OFICIALES.items():
    if abs(tabla(_z) - _p) > 1e-12:
        sys.exit(f"La tabla no reproduce el valor oficial P(Z<={_z})={_p}: da {tabla(_z)}")

AVISOS = []


def aviso(nombre, con_tabla, exacto, nd=4):
    """Anota (sin fallar) si el resultado con la tabla difiere del exacto en el redondeo a nd decimales."""
    if abs(r(exacto, nd) - con_tabla) > 1e-12:
        AVISOS.append(f"{nombre}: con la tabla {con_tabla:.{nd}f}, exacto {r(exacto, nd):.{nd}f}")


def informe():
    for a in AVISOS:
        print("AVISO:", a)
