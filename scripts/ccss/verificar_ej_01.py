#!/usr/bin/env python3
"""Verifica la relación de ejercicios ejercicios/2-bachillerato-ccss/01-matrices-determinantes/index.qmd.

Cada ejercicio se resuelve aquí con sympy, sin mirar el texto; después se comprueba que (1) los datos aparecen en el
enunciado y (2) cada resultado calculado aparece en la solución escrita. Ver scripts/ccss/_ej_comun.py.

Uso:  python scripts/ccss/verificar_ej_01.py     (requiere `pip install sympy`)
Termina con código 0 si todo coincide y con código 1 en cuanto algo falla.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _ej_comun import Verificador, mat, tx, dec, fallo  # noqa: E402
from sympy import Matrix as M, Rational as R, symbols, solve, factor, diag, eye, zeros, simplify, expand  # noqa: E402

QMD = Path(__file__).resolve().parents[2] / "ejercicios" / "2-bachillerato-ccss" / "01-matrices-determinantes" / "index.qmd"
v = Verificador(QMD)
v.estructura()
m, a, b, t = symbols('m a b t')


def decmat(Mx, nd=2):
    """Matriz con coma decimal (para matrices con 0,9; 10,8...)."""
    Mx = M(Mx)
    return "\\begin{pmatrix}" + "\\\\".join("&".join(dec(Mx[i, j], nd) if Mx[i, j].is_Rational and Mx[i, j].q != 1 else str(int(Mx[i, j])) if Mx[i, j].is_Integer else dec(Mx[i, j], nd) for j in range(Mx.cols)) for i in range(Mx.rows)) + "\\end{pmatrix}"


# 1
A, B = M([[1, 2], [0, -1]]), M([[3, 0], [1, 2]])
v.enunciado(1, [mat(A), mat(B)])
v.ok(A * B != B * A, "ej. 1: A·B ≠ B·A")
v.solucion(1, [mat(A + B), mat(2 * A - B), mat(A * B), mat(B * A)])
# 2
A, B = M([[1, 0, 2], [-1, 3, 1]]), M([[2, 1], [0, -1], [1, 3]])
v.enunciado(2, [mat(A), mat(B)])
v.ok((A * B).shape == (2, 2) and (B * A).shape == (3, 3) and A.T.shape == (3, 2), "ej. 2: dimensiones")
v.solucion(2, [mat(A * B), mat(A.T), "2\\times2", "3\\times3", "3\\times2"])
# 3
A3 = M([[2, a, 1], [3, 1, b], [1, -2, 4]])
s3 = solve(list(A3 - A3.T), [a, b], dict=True)[0]
v.enunciado(3, ["\\begin{pmatrix}2&a&1\\\\3&1&b\\\\1&-2&4\\end{pmatrix}"])
v.solucion(3, [f"a={s3[a]}", f"b={s3[b]}"])
# 4
d1 = M([[3, -2], [1, 4]]).det(); d2 = M([[2, 1, 0], [-1, 3, 2], [1, 0, 4]]).det()
v.enunciado(4, ["\\begin{vmatrix}3&-2\\\\1&4\\end{vmatrix}", "\\begin{vmatrix}2&1&0\\\\-1&3&2\\\\1&0&4\\end{vmatrix}"])
v.solucion(4, [f"={d1}", f"={d2}"])
# 5
dA = -2
v.solucion(5, [f"|A^t|={dA}", f"|3A|={3**3 * dA}", f"|A^2|={dA**2}", f"|A^{{-1}}|={tx(R(1, dA))}", f"|A\\cdot A^t|={dA**2}"])
# 6
A6 = M([[2, 5], [1, 3]])
v.enunciado(6, [mat(A6)])
v.solucion(6, [f"|A|={A6.det()}", mat(A6.inv()), mat(A6 * A6.inv())])
# 7
A7 = M([[1, 0, 2], [0, 1, -1], [2, 1, 0]])
v.enunciado(7, [mat(A7)])
v.solucion(7, [f"={A7.det()}", mat(A7.cofactorMatrix()), mat(A7.adjugate()), mat(A7.inv())])
# 8
A8 = M([[1, 2, -1, 3], [2, 4, -2, 6], [0, 1, 1, 2]])
v.enunciado(8, [mat(A8)])
v.solucion(8, [f"\\operatorname{{rg}}A={A8.rank()}", "F_2-2F_1"])
# 9
A9, B9 = M([[1, 2], [3, 5]]), M([[1, 0], [2, 1]])
v.enunciado(9, [mat(A9), mat(B9)])
v.solucion(9, [f"|A|={A9.det()}", mat(A9.inv()), mat(A9.inv() * B9)])
# 10
V, W, p = M([[30, 20, 5], [25, 40, 10]]), M([[35, 15, 8], [20, 45, 12]]), M([12, 3, 25])
v.enunciado(10, [mat(V), mat(W), mat(p)])
S = V + W
v.solucion(10, [mat(S), f"{S[1, 2]}", mat(S * p), mat(W - V), decmat(R(9, 10) * p, 1), dec((W * R(9, 10) * p)[0], 1)])
v.ok((W - V)[0, 1] == -5 and (W - V)[1, 0] == -5 and all((W - V)[i, j] > 0 for i, j in ((0, 0), (0, 2), (1, 1), (1, 2))), "ej. 10: solo bajan cuadernos en T1 y libros en T2")
# 11
A11, q, r = M([[2, 1], [1, 3], [4, 2]]), M([5, 8]), M([[10, 20, 5]])
v.enunciado(11, [mat(A11), mat(q), mat(r)])
v.ok((r * A11 * q)[0] == (r * (A11 * q))[0], "ej. 11: asociativa")
q2 = M([5, 10])
v.solucion(11, [mat(A11 * q), mat(r * A11), f"={(r * A11 * q)[0]}", f"={(r * A11 * q2)[0]}", f"={(r * A11 * q2)[0] - (r * A11 * q)[0]}"])
# 12
A12, B12 = M([[1, 0], [3, 1]]), M([[2, 1], [0, 1]])
n_ = symbols('n', integer=True, positive=True)
v.enunciado(12, [mat(A12), mat(B12)])
v.ok(all(A12**k == M([[1, 0], [3 * k, 1]]) for k in range(1, 15)), "ej. 12A: A^n = [[1,0],[3n,1]] para n=1..14")
Z = B12**2 - 3 * B12 + 2 * eye(2)
v.ok(Z == zeros(2, 2) and B12 * (3 * eye(2) - B12) == 2 * eye(2) and B12.inv() == (3 * eye(2) - B12) / 2, "ej. 12B")
v.solucion(12, [mat(A12**2), mat(A12**3), "A^n=\\begin{pmatrix}1&0\\\\3n&1\\end{pmatrix}", mat(A12**10), mat(B12**2), mat(zeros(2, 2)), mat(B12.inv()), f"|B|={B12.det()}"])
# 13
A13 = M([[m, 1, 1], [1, m, 1], [1, 1, m]])
d13 = factor(A13.det())
v.enunciado(13, ["\\begin{pmatrix}m&1&1\\\\1&m&1\\\\1&1&m\\end{pmatrix}"])
v.ok(simplify(d13 - (m - 1)**2 * (m + 2)) == 0 and sorted(solve(A13.det(), m)) == [-2, 1], "ej. 13: |A_m| y raíces")
v.solucion(13, ["|A_m|=(m-1)^2(m+2)", "m^3-3m+2", "m=1", "m=-2", f"|A_2|={A13.subs(m, 2).det()}", mat(A13.subs(m, 2).inv()),
                f"\\operatorname{{rg}}A_1={A13.subs(m, 1).rank()}", f"\\operatorname{{rg}}A_{{-2}}={A13.subs(m, -2).rank()}"])
# 14
Mm = M([[R(9, 10), R(2, 10)], [R(1, 10), R(8, 10)]]); x0 = M([600, 400])
v.enunciado(14, ["\\begin{pmatrix}0{,}9&0{,}2\\\\0{,}1&0{,}8\\end{pmatrix}", mat(x0)])
v.ok(all(sum(Mm[:, j]) == 1 for j in range(2)), "ej. 14: columnas suman 1")
v.solucion(14, [mat(Mm * x0), decmat(Mm**2), mat(Mm**2 * x0), f"{sum(Mm * x0)}", f"{sum(Mm**2 * x0)}", "0{,}9+0{,}1=1", "0{,}2+0{,}8=1"])
# 15
A15, B15, C15 = M([[2, 1], [1, 1]]), M([[1, 0], [2, 3]]), M([[5, 4], [7, 6]])
X15 = A15.inv() * (C15 - B15)
v.enunciado(15, [mat(A15), mat(B15), mat(C15)])
v.ok(A15 * X15 + B15 == C15, "ej. 15: la solución cumple la ecuación")
v.solucion(15, [f"|A|={A15.det()}", mat(C15 - B15), mat(X15), mat(A15 * X15), mat(C15)])
# 16
A16, B16 = M([[3, 1], [1, 2]]), M([[2, 1], [3, 2]])
X16 = B16 * (A16 - eye(2)).inv()
v.enunciado(16, [mat(A16), mat(B16)])
v.ok(X16 * A16 - X16 == B16, "ej. 16: la solución cumple la ecuación")
v.solucion(16, [mat(A16 - eye(2)), f"|A-I_2|={(A16 - eye(2)).det()}", mat((A16 - eye(2)).inv()), mat(X16)])
# 17
B17 = M([[1, 1, 1], [1, 2, m], [1, 4, m**2]])
v.enunciado(17, ["\\begin{pmatrix}1&1&1\\\\1&2&m\\\\1&4&m^2\\end{pmatrix}"])
v.ok(simplify(B17.det() - (m - 1) * (m - 2)) == 0, "ej. 17: |B_m| = (m-1)(m-2)")
B3 = B17.subs(m, 3)
v.solucion(17, ["|B_m|=1\\cdot\\bigl(1\\cdot(m^2-1)-3\\cdot(m-1)\\bigr)=(m-1)(m+1-3)=(m-1)(m-2)", f"\\operatorname{{rg}}B_1={B17.subs(m, 1).rank()}",
                f"\\operatorname{{rg}}B_2={B17.subs(m, 2).rank()}", f"|B_3|={B3.det()}", mat(B3.inv())])
v.ok(B17.subs(m, 5).rank() == 3 and B17.subs(m, 0).rank() == 3, "ej. 17: rango 3 para m ≠ 1, 2")
# 18
A18 = M([[1, 2], [0, 1]])
v.enunciado(18, [mat(A18)])
v.ok(all(A18**k == M([[1, 2 * k], [0, 1]]) for k in range(1, 15)) and A18.inv() == M([[1, -2], [0, 1]]), "ej. 18: A^n y A^-1")
v.solucion(18, [mat(A18**2), mat(A18**3), "A^n=\\begin{pmatrix}1&2n\\\\0&1\\end{pmatrix}", mat(A18**10), mat(A18.inv())])
# 19
dA, dB = 2, -3
v.enunciado(19, [f"|A|={dA}", f"|B|={dB}"])
Dm = diag(2, 1, 1); Bm = diag(-2, 1, R(3, 2))
v.ok(Dm.det() == dA and Bm.det() == dB and (Dm + Bm).det() == 0, "ej. 19e: contraejemplo con |A|=2, |B|=-3 y |A+B|=0")
v.solucion(19, [f"={dA * dB}", f"={2**3 * dA}", f"={tx(R(dB) / dA)}", f"={dA**3}", mat(Dm), "\\frac{3}{2}", "|A+B|=0"])
# 20
C20 = M([[2, 1], [3, 2]])
v.enunciado(20, [mat(C20)])
v.solucion(20, [f"|C|={C20.det()}", mat(C20.inv()), mat(C20 * M([3, 5])), mat(C20.inv() * M([16, 27]))])
v.enunciado(20, [mat(M([3, 5])), mat(M([16, 27]))])
# 21
A21 = M([[1, 0, 1], [0, 1, 1], [1, 1, 0]])
v.enunciado(21, [mat(A21), "\\begin{pmatrix}1&a\\\\0&1\\end{pmatrix}", "\\begin{pmatrix}1&1\\\\0&b\\end{pmatrix}"])
Aa, Bb = M([[1, a], [0, 1]]), M([[1, 1], [0, b]])
v.ok(Aa * Bb == M([[1, 1 + a * b], [0, b]]) and Bb * Aa == M([[1, a + 1], [0, b]]), "ej. 21B: A·B y B·A")
sol21 = solve(list(Aa * Bb - Bb * Aa), [a, b], dict=True)
v.ok(sol21 in ([{a: 0}, {b: 1}], [{b: 1}, {a: 0}]), "ej. 21B: a=0 o b=1")
v.solucion(21, [f"|A|={A21.det()}", mat(A21.adjugate()), mat(A21.inv()), mat(A21 * A21.inv()),
                "\\begin{pmatrix}1&1+ab\\\\0&b\\end{pmatrix}", "\\begin{pmatrix}1&a+1\\\\0&b\\end{pmatrix}", "a=0", "b=1", "a(b-1)=0"])
# 22
A22, B22 = M([[1, 2], [0, 1]]), M([[3, 1], [2, 5]])
X22 = A22.T.inv() * B22
v.enunciado(22, [mat(A22), mat(B22)])
v.ok(A22.T * X22 == B22, "ej. 22: Aᵗ·X = B")
v.solucion(22, [mat(A22.T), f"|A^t|={A22.T.det()}", mat(A22.T.inv()), mat(X22)])
# 23
A23 = M([[1, m], [2, 3]]); B23 = M([[1], [2]])
v.enunciado(23, ["\\begin{pmatrix}1&m\\\\2&3\\end{pmatrix}", mat(B23)])
v.ok(solve(A23.det(), m) == [R(3, 2)], "ej. 23: m = 3/2")
A231 = A23.subs(m, 1); A23h = A23.subs(m, R(3, 2))
v.ok(A23h.rank() == 1 and A23h.row_join(B23).rank() == 1, "ej. 23: rangos 1 y 1")
x_, y_ = symbols('x y')
v.ok(simplify((A23h * M([1 - R(3, 2) * t, t]) - B23).norm()) == 0, "ej. 23: (1-3t/2, t) es solución")
v.solucion(23, [f"|A_m|=3-2m", f"m={tx(R(3, 2))}", mat(A231.inv()), mat(A231.inv() * B23), f"\\operatorname{{rg}}A_{{3/2}}={A23h.rank()}",
                f"\\operatorname{{rg}}(A_{{3/2}}|B)={A23h.row_join(B23).rank()}", "x=1-\\frac{3}{2}t"])
# 24
A24 = M([[0, 1, 1, 0], [1, 0, 1, 1], [1, 1, 0, 0], [0, 1, 0, 0]])
v.enunciado(24, [mat(A24)])
v.ok(A24.is_symmetric(), "ej. 24: simétrica")
A24s = A24**2
v.solucion(24, [mat(A24s), f"(A^2)_{{14}}={A24s[0, 3]}", f"(A^2)_{{22}}={A24s[1, 1]}", mat(A24 * M([1, 1, 1, 1]))])
# 25
A25, B25 = M([[2, 1], [1, 2]]), M([[100, 110], [80, 70]])
X25 = B25 * A25.inv()
v.enunciado(25, [mat(A25), mat(B25)])
v.ok(X25 * A25 == B25 and all(e.is_integer and e > 0 for e in X25), "ej. 25: X·A=B con unidades enteras positivas")
v.solucion(25, [f"|A|={A25.det()}", mat(A25.inv()), mat(X25)])
v.fin()
