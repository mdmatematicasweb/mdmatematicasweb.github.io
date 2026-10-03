#!/usr/bin/env python3
"""Verifica la relación de ejercicios ejercicios/2-bachillerato-ccss/02-sistemas-ecuaciones-lineales/index.qmd.

Cada ejercicio se resuelve aquí con sympy, sin mirar el texto; después se comprueba que (1) los datos aparecen en el
enunciado y (2) cada resultado calculado aparece en la solución escrita. Ver scripts/ccss/_ej_comun.py.

Uso:  python scripts/ccss/verificar_ej_02.py     (requiere `pip install sympy`)
Termina con código 0 si todo coincide y con código 1 en cuanto algo falla.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _ej_comun import Verificador, mat, tx, dec, ec, ampliada  # noqa: E402
from sympy import Matrix as M, Rational as R, symbols, solve, simplify, factor, expand  # noqa: E402

QMD = Path(__file__).resolve().parents[2] / "ejercicios" / "2-bachillerato-ccss" / "02-sistemas-ecuaciones-lineales" / "index.qmd"
v = Verificador(QMD)
v.estructura()
m, lam, x, y, z = symbols('m lambda x y z')
VS = (x, y, z)


def sist(A, B, vs=VS):
    """Soluciones del sistema A·X = B (lista de dict; vacía si es incompatible)."""
    return solve(list(M(A) * M(vs[:M(A).cols]) - M(B)), vs[:M(A).cols], dict=True)


def rangos(A, B):
    return M(A).rank(), M(A).row_join(M(B)).rank()


def cramer(A, B):
    A = M(A); out = []
    for i in range(A.cols):
        Ai = A.copy(); Ai[:, i] = M(B); out.append(Ai.det())
    return A.det(), out


# 1
casos = [(M([[1, 1], [2, 2]]), M([3, 6]), "SCI"), (M([[1, 1], [2, 2]]), M([3, 7]), "SI"), (M([[1, 1], [1, -1]]), M([3, 1]), "SCD")]
for A, B, esperado in casos:
    ra, rb = rangos(A, B)
    clase = "SI" if ra != rb else ("SCD" if ra == A.cols else "SCI")
    v.ok(clase == esperado, f"ej. 1: clasificación {esperado}")
v.solucion(1, ["\\operatorname{rg}A=1", "\\operatorname{rg}A^*=1", "SCI"], 'a')
v.solucion(1, ["\\operatorname{rg}A^*=2", "SI"], 'b')
v.solucion(1, ["|A|=-2", "SCD"], 'c')
# 2
A2, B2 = M([[1, 1, 1], [2, -1, 1], [1, 2, -1]]), M([4, 8, -3])
s = sist(A2, B2)[0]
v.enunciado(2, ["x+y+z=4", "2x-y+z=8", "x+2y-z=-3"])
v.solucion(2, [(f"x={s[x]}", 2), (f"y={s[y]}", 2), (f"z={s[z]}", 2)])
# 3
A3, B3 = M([[1, 1, 1], [2, -1, 1], [3, 0, 2]]), M([6, 3, 9])
v.enunciado(3, ["x+y+z=6", "2x-y+z=3", "3x+2z=9"])
v.ok(rangos(A3, B3) == (2, 2), "ej. 3: rangos 2 y 2")
s3 = sist(A3, B3)[0]
lam_ = symbols('lam')
paramz = {k: simplify(val.subs(z, 3 * lam_)) for k, val in s3.items()}
v.ok(paramz == {x: 3 - 2 * lam_, y: 3 - lam_}, "ej. 3: x=3-2λ, y=3-λ con z=3λ")
v.solucion(3, [("x=3-2\\lambda", 2), ("y=3-\\lambda", 2), ("z=3\\lambda", 2), "\\operatorname{rg}A=\\operatorname{rg}A^*=2"])
# 4
A4, B4 = M([[1, 1, 1], [2, 2, 2], [1, -1, 0]]), M([1, 3, 0])
v.enunciado(4, ["x+y+z=1", "2x+2y+2z=3", "x-y=0"])
v.ok(sist(A4, B4) == [] and rangos(A4, B4) == (2, 3), "ej. 4: incompatible con rangos 2 y 3")
v.solucion(4, ["0=1", "\\operatorname{rg}A=2", "\\operatorname{rg}A^*=3"])
# 5
A5, B5 = M([[2, 1, -1], [1, -1, 2], [1, 2, 1]]), M([1, 4, 5])
d5, ds5 = cramer(A5, B5)
v.enunciado(5, ["2x+y-z=1", "x-y+2z=4", "x+2y+z=5"])
s5 = sist(A5, B5)[0]
v.solucion(5, [f"|A|={d5}", f"|A_x|={ds5[0]}", f"|A_y|={ds5[1]}", f"|A_z|={ds5[2]}", f"x={s5[x]}", f"y={s5[y]}", f"z={s5[z]}"])
v.ok([ds5[i] / d5 for i in range(3)] == [s5[x], s5[y], s5[z]], "ej. 5: Cramer coincide con solve")
# 6
A6, B6 = M([[2, 3], [1, 2]]), M([7, 4])
v.enunciado(6, ["2x+3y=7", "x+2y=4"])
X6 = A6.inv() * B6
v.solucion(6, [f"|A|={A6.det()}", mat(A6.inv()), mat(X6), f"x={X6[0]}", f"y={X6[1]}"])
# 7
s7 = solve([3 * x + 2 * y - 46, 2 * x + 3 * y - 44], [x, y], dict=True)[0]
v.enunciado(7, ["3camisetas", "46"])
v.solucion(7, ["3c+2g=46", "2c+3g=44", "c-g=2", f"g={s7[y]}", f"c={s7[x]}"])
# 8
A8, B8 = M([[1, 1, 1], [5, 7, 9], [0, 2, -1]]), M([100, 700, 0])
s8 = sist(A8, B8)[0]
v.enunciado(8, ["5, 7 y 9", "100kg"])
v.solucion(8, ["x+y+z=100", "5x+7y+9z=700", ("z=2y", 2), f"y={s8[y]}", f"x={s8[x]}", f"z={s8[z]}"])
# 9
A9, B9 = M([[1, 2, -1], [2, 4, -2], [3, 6, 1]]), M([1, 2, 5])
v.enunciado(9, ["x+2y-z=1", "2x+4y-2z=2", "3x+6y+z=5"])
ra, rb = rangos(A9, B9)
v.ok((ra, rb) == (2, 2), "ej. 9: rangos 2 y 2")
v.solucion(9, [mat(A9), (f"\\operatorname{{rg}}A={ra}", 2), (f"\\operatorname{{rg}}A^*={rb}", 2), f"3-{ra}=1", "SCI"])
# 10
A10 = M([[m, 0, 1], [2, 2, 3], [2, 0, m + 1]]); B10 = M([1, 2, 2])
d10 = factor(A10.det())
v.enunciado(10, ["mx+z=1", "2x+2y+3z=2", "2x+(m+1)z=2"])
v.ok(simplify(d10 - 2 * (m - 1) * (m + 2)) == 0 and sorted(solve(A10.det(), m)) == [-2, 1], "ej. 10: |A| = 2(m-1)(m+2)")
v.ok(rangos(A10.subs(m, 1), B10) == (2, 2) and rangos(A10.subs(m, -2), B10) == (2, 3), "ej. 10: m=1 SCI, m=-2 SI")
s10a = sist(A10.subs(m, 0), B10)[0]; s10b = sist(A10.subs(m, 1), B10)[0]
v.ok(simplify(s10b[x].subs(z, lam) - (1 - lam)) == 0 and simplify(s10b[y].subs(z, lam) + lam / 2) == 0, "ej. 10: m=1 → (1-λ, -λ/2, λ)")
v.solucion(10, ["|A|=2(m-1)(m+2)", ("m=1", 2), ("m=-2", 2), "SCD", "SCI", "SI"], 'a')
v.solucion(10, [f"x={tx(s10a[x])}", (f"y={s10a[y]}", 2), (f"z={s10a[z]}", 2)], 'b')
v.solucion(10, [("x=1-\\lambda", 2), ("y=-\\frac{\\lambda}{2}", 2), ("z=\\lambda", 2)], 'c')
# 11
A11, B11 = M([[1, 1, 1], [0, 1, -2], [1, -1, 0]]), M([12000, 0, 1000])
s11 = sist(A11, B11)[0]
s11b = sist(A11, M([15000, 0, 1000]))[0]
v.enunciado(11, ["12 000", "1 000", "doble"])
v.solucion(11, ["x+y+z=12000", "y-2z=0", "x-y=1000"], 'a')
v.ok(s11[x] + s11[y] + s11[z] == 12000 and s11[y] == 2 * s11[z] and s11[x] == s11[y] + 1000, "ej. 11c: la solución cumple las tres condiciones")
v.solucion(11, [f"{s11[x]}+{s11[y]}+{s11[z]}=12000", f"y=2z", f"x=y+1000", f"{s11[x]} € a material escolar", f"{s11[y]} € a comedor", f"{s11[z]} € a transporte"], 'c')
v.solucion(11, [f"z={s11[z]}", f"y={s11[y]}", f"x={s11[x]}"], 'b')
v.solucion(11, [f"z={s11b[z]}", f"y={s11b[y]}", f"x={s11b[x]}"], 'd')
# 12
A12a = M([[1, 1], [m, 3]]); B12a = M([2, 6])
v.enunciado(12, ["x+y=2", "mx+3y=6", "x+2y+z=4", "2x+y-z=2", "x-y+2z=2"])
v.ok(solve(A12a.det(), m) == [3] and rangos(A12a.subs(m, 3), B12a) == (1, 1), "ej. 12A: m=3 SCI")
s12m0 = sist(A12a.subs(m, 0), B12a, (x, y))[0]
A12b, B12b = M([[1, 2, 1], [2, 1, -1], [1, -1, 2]]), M([4, 2, 2])
d12, ds12 = cramer(A12b, B12b)
s12b = sist(A12b, B12b)[0]
v.solucion(12, ["|A|=3-m", "m=3", "\\operatorname{rg}A=\\operatorname{rg}A^*=1"], 'A.a')
v.solucion(12, ["x=2-\\lambda", "y=\\lambda", (f"y={s12m0[y]}", 2), f"x={s12m0[x]}"], 'A.b')
v.solucion(12, [f"|A|={d12}"], 'B.a')
v.solucion(12, [f"|A_x|={ds12[0]}", f"|A_y|={ds12[1]}", f"|A_z|={ds12[2]}", f"x={s12b[x]}", f"y={s12b[y]}", f"z={s12b[z]}"], 'B.b')
# 13
A13, B13 = M([[2, 3, 1], [1, 2, 2], [3, 2, 1]]), M([15, 10, 17])
d13, ds13 = cramer(A13, B13)
s13 = sist(A13, B13)[0]
v.enunciado(13, ["15", "10", "17"])
v.solucion(13, [mat(A13), mat(B13)], 'a')
v.solucion(13, [f"|A|={d13}", f"|A_x|={ds13[0]}", f"|A_y|={ds13[1]}", f"|A_z|={ds13[2]}", f"x={s13[x]}", f"y={s13[y]}", f"z={s13[z]}"], 'b')
v.solucion(13, [f"4\\cdot{s13[x]}+2\\cdot{s13[y]}+3\\cdot{s13[z]}={4 * s13[x] + 2 * s13[y] + 3 * s13[z]}"], 'c')
# 14
A14, B14 = M([[1, 1, 1], [2, 3, 5], [3, 4, 6]]), M([60, 200, 260])
v.enunciado(14, ["60", "2, 3 y 5", "200", "3x+4y+6z=260"])
v.ok(A14.row(2) == A14.row(0) + A14.row(1) and B14[2] == B14[0] + B14[1] and rangos(A14, B14) == (2, 2), "ej. 14: tercera = suma de las dos primeras")
s14 = sist(A14, B14)[0]
v.ok(simplify(s14[x].subs(z, lam) - (2 * lam - 20)) == 0 and simplify(s14[y].subs(z, lam) - (80 - 3 * lam)) == 0, "ej. 14: (2λ-20, 80-3λ, λ)")
enteros = [t for t in range(0, 100) if 2 * t - 20 >= 1 and 80 - 3 * t >= 1 and t >= 1]
v.ok(enteros == list(range(11, 27)) and len(enteros) == 16, "ej. 14: λ = 11..26 → 16 soluciones")
v.solucion(14, [("x=2\\lambda-20", 2), ("y=80-3\\lambda", 2), ("z=\\lambda", 2)], 'b')
v.solucion(14, ["11\\le\\lambda\\le26", f"26-11+1={len(enteros)}"], 'c')
v.solucion(14, ["x=20", "y=20"], 'd')
v.solucion(14, ["\\operatorname{rg}A=\\operatorname{rg}A^*=2"], 'a')
# 15
B15 = M([60, 200, 250])
v.enunciado(15, ["3x+4y+6z=250", "260"])
v.ok(rangos(A14, B15) == (2, 3) and sist(A14, B15) == [], "ej. 15: incompatible, rangos 2 y 3")
v.solucion(15, [ec(A14[0, :], B15[0]), ec(A14[1, :], B15[1]), ec(A14[2, :], B15[2]), ampliada(A14, B15)], 'a')
f2 = A14[1, :] - 2 * A14[0, :]; r2 = B15[1] - 2 * B15[0]
v.ok(list(f2) == [0, 1, 3] and r2 == 80 and B15[0] + B15[1] == 260 and (A14[0, :] + A14[1, :]) == A14[2, :], "ej. 15c: y+3z=80 y la tercera ecuación debería dar 260")
v.solucion(15, [ec(f2, r2), ec(A14[2, :], B15[0] + B15[1]), "250", "contradicción"], 'c')
v.solucion(15, [f"0={B15[2] - B15[0] - B15[1]}", "\\operatorname{rg}A=2", "\\operatorname{rg}A^*=3", "incompatible"], 'b')
# 16
A16, B16 = M([[2, 1, 0], [1, 1, 0], [1, 2, 1]]), M([5, 3, 8])
v.enunciado(16, [mat(A16), mat(B16)])
X16 = A16.inv() * B16
v.solucion(16, [f"|A|={A16.det()}"], 'a')
v.solucion(16, [mat(A16.cofactorMatrix()), mat(A16.inv())], 'b')
v.solucion(16, [f"x={X16[0]}", f"y={X16[1]}", f"z={X16[2]}"], 'c')
# 17
A17a = M([[1, 1, 1], [1, 2, 3], [2, 3, m]])
v.enunciado(17, ["x+y+z=0", "x+2y+3z=0", "2x+3y+mz=0", "x+y+z=a", "x-y=0", "2x+z=2"])
v.ok(simplify(A17a.det() - (m - 4)) == 0 and solve(A17a.det(), m) == [4], "ej. 17A: |A| = m-4")
s17a = sist(A17a.subs(m, 4), zeros := M([0, 0, 0]))[0]
v.ok(simplify(s17a[x].subs(z, lam) - lam) == 0 and simplify(s17a[y].subs(z, lam) + 2 * lam) == 0, "ej. 17A: (λ, -2λ, λ)")
a_ = symbols('a')
A17b = M([[1, 1, 1], [1, -1, 0], [2, 0, 1]])
v.ok(A17b.det() == 0 and A17b.rank() == 2 and A17b.row_join(M([2, 0, 2])).rank() == 2 and A17b.row_join(M([3, 0, 2])).rank() == 3, "ej. 17B: a=2 SCI, a≠2 SI")
s17b = sist(A17b, M([2, 0, 2]))[0]
v.ok(simplify(s17b[x].subs(z, 2 * lam) - (1 - lam)) == 0 and simplify(s17b[y].subs(z, 2 * lam) - (1 - lam)) == 0, "ej. 17B: (1-λ, 1-λ, 2λ)")
v.solucion(17, ["|A|=m-4", "m=4"], 'A.a')
v.solucion(17, [("x=\\lambda", 2), ("y=-2\\lambda", 2), ("z=\\lambda", 2), "\\operatorname{rg}A=2"], 'A.b')
v.solucion(17, ["F_3-F_1-F_2=(0,0,0\\,|\\,2-a)", "a=2"], 'B.a')
v.solucion(17, [("x=1-\\lambda", 2), "y=1-\\lambda", ("z=2\\lambda", 2)], 'B.b')
# 18
A18 = M([[2, 1, 1], [1, m, 1], [1, 1, 2]]); B18 = M([1, 1, m])
v.enunciado(18, ["2x+y+z=1", "x+my+z=1", "x+y+2z=m"])
v.ok(simplify(A18.det() - (3 * m - 2)) == 0 and rangos(A18.subs(m, R(2, 3)), B18.subs(m, R(2, 3))) == (2, 3), "ej. 18: |A| = 3m-2; m=2/3 SI")
minor = M([[2, 1, 1], [1, R(2, 3), 1], [1, 1, R(2, 3)]]).det()
s18 = sist(A18.subs(m, 1), B18.subs(m, 1))[0]
d18, ds18 = cramer(A18, B18)
v.ok(simplify(ds18[0] / d18 - (-m**2 + 3 * m - 2) / (3 * m - 2)) == 0 and simplify(ds18[1] / d18 - (2 - m) / (3 * m - 2)) == 0 and simplify(ds18[2] / d18 - (2 * m**2 - 2 * m) / (3 * m - 2)) == 0, "ej. 18: fórmulas de Cramer")
v.ok(simplify(ds18[0] + m**2 - 3 * m + 2) == 0 and simplify(ds18[1] - (2 - m)) == 0 and simplify(ds18[2] - (2 * m**2 - 2 * m)) == 0, "ej. 18: |A_x|, |A_y|, |A_z|")
v.solucion(18, ["|A|=3m-2", "m=\\frac{2}{3}", f"\\begin{{vmatrix}}2&1&1\\\\1&\\frac{{2}}{{3}}&1\\\\1&1&\\frac{{2}}{{3}}\\end{{vmatrix}}={tx(minor)}"], 'a')
v.solucion(18, [(f"x={s18[x]}", 2), (f"y={s18[y]}", 2), (f"z={s18[z]}", 2)], 'b')
v.solucion(18, ["x=\\frac{-m^2+3m-2}{3m-2}", "y=\\frac{2-m}{3m-2}", "z=\\frac{2m^2-2m}{3m-2}", "|A_x|=-m^2+3m-2", "|A_y|=2-m", "|A_z|=2m^2-2m"], 'c')
# 19
A19, B19 = M([[3, 1, 2], [2, 2, 1], [1, 3, 2]]), M([85, 70, 95])
d19, ds19 = cramer(A19, B19)
s19 = sist(A19, B19)[0]
v.enunciado(19, ["85 kg", "70 horas", "95 horas"])
v.solucion(19, ["3x+y+2z=85", "2x+2y+z=70", "x+3y+2z=95"], 'a')
v.solucion(19, [f"|A|={d19}", f"|A_x|={ds19[0]}", f"|A_y|={ds19[1]}", f"|A_z|={ds19[2]}", f"x={s19[x]}", f"y={s19[y]}", f"z={s19[z]}"], 'b')
v.solucion(19, ["\\operatorname{rg}A=\\operatorname{rg}A^*=3"], 'c')
v.solucion(19, [f"{s19[x]} tandas del primer pan", f"{s19[y]} del segundo", f"{s19[z]} del tercero"], 'd')
# 20
A20, B20 = M([[1, 1, 1], [1, 0, -2], [0, 1, -1]]), M([1200, 0, 100])
s20 = sist(A20, B20)[0]
v.enunciado(20, ["1200", "doble", "100votos"])
v.solucion(20, ["x+y+z=1200", "x=2z", "y=z+100"], 'a')
v.solucion(20, [f"z={s20[z]}", f"x={s20[x]}", f"y={s20[y]}"], 'b')
v.solucion(20, [dec(R(100) * s20[x] / 1200, 2) + "\\,\\%", dec(R(100) * s20[y] / 1200, 2) + "\\,\\%", dec(R(100) * s20[z] / 1200, 2) + "\\,\\%"], 'c')
v.solucion(20, [f"{s20[x]}<600"], 'd')
v.ok(s20[x] < 600 and sum(round(float(R(100) * s20[k] / 1200), 2) for k in (x, y, z)) == 100.0, "ej. 20: sin mayoría absoluta; porcentajes suman 100")
# 21
A21, B21 = M([[1, 1, 1], [3, 5, 8], [1, 0, -1]]), M([20000, 106000, 0])
s21 = sist(A21, B21)[0]
v.enunciado(21, ["20 000", "1 060", "3\\,\\%"])
v.ok(s21 == {x: 6000, y: 8000, z: 6000} and R(3, 100) * 6000 + R(5, 100) * 8000 + R(8, 100) * 6000 == 1060, "ej. 21: intereses 1060")
v.solucion(21, ["x+y+z=20000", "3x+5y+8z=106000", "z=x"], 'a')
v.solucion(21, [f"x={s21[x]}", f"y={s21[y]}", f"z={s21[z]}"], 'b')
v.solucion(21, ["5{,}3\\,\\%"], 'c')
v.solucion(21, ["3\\,\\%<5{,}3\\,\\%<8\\,\\%"], 'd')
# 22
A22 = M([[m, 1], [4, m]]); B22 = M([1, 2])
v.enunciado(22, ["\\begin{pmatrix}m&1\\\\4&m\\end{pmatrix}", mat(B22)])
v.ok(sorted(solve(A22.det(), m)) == [-2, 2], "ej. 22: m = ±2")
A221 = A22.subs(m, 1); X22 = A221.inv() * B22
v.ok(rangos(A22.subs(m, 2), B22) == (1, 1) and rangos(A22.subs(m, -2), B22) == (1, 2), "ej. 22: m=2 SCI y m=-2 SI")
v.ok((A22.subs(m, 2) * M([lam, 1 - 2 * lam]) - B22).applyfunc(simplify).is_zero_matrix, "ej. 22: m=2 → (λ, 1-2λ) cumple el sistema")
v.solucion(22, ["|A_m|=m^2-4"], 'a')
v.solucion(22, [f"|A_1|={A221.det()}", mat(A221.inv()), f"x={tx(X22[0])}", f"y={tx(X22[1])}"], 'b')
v.solucion(22, ["y=1-2\\lambda", "\\operatorname{rg}A_2=\\operatorname{rg}A^*_2=1", "\\operatorname{rg}A_{-2}=1", "\\operatorname{rg}A^*_{-2}=2"], 'c')
# 23
A23, B23 = M([[1, 1, 1], [10, 6, 2]]), M([200, 1000])
v.enunciado(23, ["200", "10, 6 y 2", "1000"])
v.ok((A23 * M([lam, 150 - 2 * lam, 50 + lam]) - B23).applyfunc(simplify).is_zero_matrix and A23.rank() == 2, "ej. 23: (λ, 150-2λ, 50+λ) cumple el sistema, rango 2")
sol23 = [t for t in range(-5, 100) if t >= 0 and 150 - 2 * t >= 0 and 50 + t >= 0]
v.ok(sol23 == list(range(0, 76)) and len(sol23) == 76, "ej. 23: 76 soluciones enteras no negativas")
s23c = sist(M([[1, 1, 1], [10, 6, 2], [0, 0, 1]]), M([200, 1000, 70]))[0]
v.solucion(23, [("x=\\lambda", 2), ("y=150-2\\lambda", 2), ("z=50+\\lambda", 2), "1000"], 'a')
v.solucion(23, ["0\\le\\lambda\\le75", f"{len(sol23)}"], 'b')
v.solucion(23, [f"{s23c[x]}+{s23c[y]}+{s23c[z]}=200", f"10\\cdot{s23c[x]}+6\\cdot{s23c[y]}+2\\cdot{s23c[z]}={10 * s23c[x]}+{6 * s23c[y]}+{2 * s23c[z]}=1000"], 'd')
v.solucion(23, [f"x={s23c[x]}", f"y={s23c[y]}", f"z={s23c[z]}"], 'c')
# 24
A24, B24 = M([[1, 1, 1], [2, 4, 10], [1, -1, 0]]), M([100, 460, -20])
s24 = sist(A24, B24)[0]
v.enunciado(24, ["100 litros", "0{,}46"])
v.ok(R(2, 10) * s24[x] + R(4, 10) * s24[y] + 1 * s24[z] == 46, "ej. 24: acidez media 0,46")
v.solucion(24, [("x+y+z=100", 2), "x+2y+5z=230", "y-x=20"], 'a')
v.solucion(24, [f"x={s24[x]}", f"y={s24[y]}", f"z={s24[z]}"], 'b')
v.solucion(24, ["0{,}46\\,\\%"], 'c')
# 25
A25 = M([[m, 0, 1], [2, 3, -2], [1, 0, m]]); B25 = M([3, 0, 3])
v.enunciado(25, ["mx+z=3", "2x+3y-2z=0", "x+mz=3"])
v.ok(simplify(A25.det() - 3 * (m**2 - 1)) == 0 and rangos(A25.subs(m, 1), B25) == (2, 2) and rangos(A25.subs(m, -1), B25) == (2, 3), "ej. 25: |A| = 3(m²-1); m=1 SCI; m=-1 SI")
s25a = sist(A25.subs(m, 1), B25)[0]
v.ok(simplify(s25a[x].subs(z, 3 * lam) - (3 - 3 * lam)) == 0 and simplify(s25a[y].subs(z, 3 * lam) - (4 * lam - 2)) == 0, "ej. 25: m=1 → (3-3λ, 4λ-2, 3λ)")
s25b = sist(A25.subs(m, 2), B25)[0]
v.solucion(25, ["|A|=3(m-1)(m+1)", "SCD", "SCI", "SI"], 'a')
v.solucion(25, [("x=3-3\\lambda", 2), ("y=4\\lambda-2", 2), ("z=3\\lambda", 2)], 'b')
v.solucion(25, [(f"x={s25b[x]}", 2), (f"y={s25b[y]}", 2), (f"z={s25b[z]}", 2)], 'c')
v.fin()
