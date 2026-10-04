"""Utilidades comunes de los verificadores de 3º ESO (apuntes y ejercicios)."""
import sys

try:
    import sympy  # noqa: F401
except ImportError:
    sys.exit("Falta sympy: pip install sympy")

n = 0


def ok(cond, msg):
    """Cuenta una comprobación; si falla sale con código 1 (no usa assert: `python -O` lo desactiva)."""
    global n
    if not cond:
        print("FALLA:", msg, file=sys.stderr)
        sys.exit(1)
    n += 1


def fin(nombre):
    print(f"{nombre}: {n} comprobaciones correctas")
