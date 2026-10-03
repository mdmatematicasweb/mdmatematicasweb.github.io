#!/usr/bin/env python3
"""Verifica la relación de ejercicios ejercicios/2-bachillerato-ccss/08-integrales/index.qmd.

Cada ejercicio se resuelve aquí con sympy, sin mirar el texto (primitivas, integrales definidas, áreas, excedentes); después
se comprueba que (1) los datos aparecen en el enunciado y (2) cada resultado calculado aparece en el bloque de su apartado de
la solución escrita, con recuento exacto y con mutación integrada. Ver scripts/ccss/_ej_comun.py.

Uso:  python scripts/ccss/verificar_ej_08.py     (requiere `pip install sympy`)
Termina con código 0 si todo coincide y con código 1 si algo falla.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _ej_comun import Verificador, tx, dec  # noqa: E402
from sympy import (symbols, Rational as R, solve, integrate, oo, exp, log, sqrt, simplify, N, diff, S, E, Interval,  # noqa: E402
                   factor, expand, Abs)

QMD = Path(__file__).resolve().parents[2] / "ejercicios" / "2-bachillerato-ccss" / "08-integrales" / "index.qmd"
v = Verificador(QMD)
v.estructura()
x, t, q, K, a = symbols('x t q K a', real=True)

# Recuentos explícitos de apariciones por apartado cuando un resultado se repite en el mismo bloque.
CNT = {(11, 'd'): {'232{,}54': 2}, (25, 'B.b'): {'C=3': 2}}
RES = {}


def add(num, ap, *frags):
    RES.setdefault((num, ap), []).extend(frags)


def prim(num, ap, label, f, texto, F, var=x):
    """Primitiva: `F` (expresión sympy de lo escrito) debe tener derivada f; se exige «label=texto+C» en la solución."""
    v.ok(simplify(diff(F, var) - f) == 0, f"ej. {num}{ap}: la primitiva escrita {texto!r} deriva en la función {f}")
    add(num, ap, f"{label}={texto}")


def defi(num, ap, label, f, a_, b_, texto, valor, var=x):
    """Integral definida: el valor sympy debe igualar `valor` (lo escrito); se exige «label=texto»."""
    real = integrate(f, (var, a_, b_))
    v.ok(simplify(real - valor) == 0, f"ej. {num}{ap}: la integral de {f} en [{a_},{b_}] vale {real} y el texto dice {valor}")
    add(num, ap, f"{label}={texto}")


# ---------- 1 ----------
v.enunciado(1, ["\\int(4x^3-6x+5)\\,dx", "\\int\\left(\\frac{1}{x}+3e^x\\right)dx", "\\int\\left(x^2+\\dfrac{1}{x^2}\\right)dx"])
prim(1, 'a', "\\int(4x^3-6x+5)dx", 4 * x**3 - 6 * x + 5, "x^4-3x^2+5x+C", x**4 - 3 * x**2 + 5 * x)
prim(1, 'b', "\\int(\\frac{1}{x}+3e^x)dx", 1 / x + 3 * exp(x), "\\ln|x|+3e^x+C", log(x) + 3 * exp(x))
prim(1, 'c', "\\int(x^2+x^{-2})dx", x**2 + x**-2, "\\frac{x^3}{3}-\\frac{1}{x}+C", x**3 / 3 - 1 / x)
# ---------- 2 ----------
v.enunciado(2, ["\\int(3x-1)^4\\,dx", "\\int e^{2x+1}\\,dx", "\\int\\dfrac{1}{5x-2}\\,dx"])
prim(2, 'a', "\\int(3x-1)^4dx", (3 * x - 1)**4, "\\frac{(3x-1)^5}{15}+C", (3 * x - 1)**5 / 15)
prim(2, 'b', "\\int e^{2x+1}dx", exp(2 * x + 1), "\\frac{e^{2x+1}}{2}+C", exp(2 * x + 1) / 2)
prim(2, 'c', "\\int\\frac{1}{5x-2}dx", 1 / (5 * x - 2), "\\frac{1}{5}\\ln|5x-2|+C", log(5 * x - 2) / 5)
# ---------- 3 ----------
v.enunciado(3, ["\\int x\\,(x^2+1)^3\\,dx", "\\int\\dfrac{x}{x^2+4}\\,dx", "\\int\\dfrac{x}{\\sqrt{x^2+9}}\\,dx"])
prim(3, 'a', "\\int x(x^2+1)^3dx", x * (x**2 + 1)**3, "\\frac{(x^2+1)^4}{8}+C", (x**2 + 1)**4 / 8)
prim(3, 'b', "\\int\\frac{x}{x^2+4}dx", x / (x**2 + 4), "\\frac{1}{2}\\ln(x^2+4)+C", log(x**2 + 4) / 2)
prim(3, 'c', "\\int\\frac{x}{\\sqrt{x^2+9}}dx", x / sqrt(x**2 + 9), "\\sqrt{x^2+9}+C", sqrt(x**2 + 9))
# ---------- 4 ----------
F4 = 2 * x**3 - 2 * x**2 + x + K
k4 = solve(F4.subs(x, 1) - 5, K)
v.ok(k4 == [4] and simplify(diff(F4, x) - (6 * x**2 - 4 * x + 1)) == 0, "ej. 4: F=2x^3-2x^2+x+4")
v.enunciado(4, ["6x^2-4x+1", "F(1)=5"])
add(4, '', "\\int(6x^2-4x+1)dx=2x^3-2x^2+x+C", f"F(1)=2-2+1+C=1+C=5", f"C={k4[0]}", "F(x)=2x^3-2x^2+x+4")
# ---------- 5 ----------
v.enunciado(5, ["\\int_0^3(2x+1)\\,dx", "\\int_1^e\\frac{1}{x}\\,dx", "\\int_0^1e^x\\,dx"])
defi(5, 'a', "\\int_0^3(2x+1)dx", 2 * x + 1, 0, 3, "[x^2+x]_0^3=12-0=12", 12)
defi(5, 'b', "\\int_1^e\\frac{1}{x}dx", 1 / x, 1, E, "[\\ln x]_1^e=1-0=1", 1)
defi(5, 'c', "\\int_0^1e^xdx", exp(x), 0, 1, "[e^x]_0^1=e-1", E - 1)
# ---------- 6 ----------
v.enunciado(6, ["\\int_0^1e^{2x}\\,dx", "\\int_1^4\\dfrac{1}{\\sqrt{x}}\\,dx"])
defi(6, 'a', "\\int_0^1e^{2x}dx", exp(2 * x), 0, 1, "[\\frac{e^{2x}}{2}]_0^1=\\frac{e^2-1}{2}", (exp(2) - 1) / 2)
defi(6, 'b', "\\int_1^4x^{-1/2}dx", x**R(-1, 2), 1, 4, "[2\\sqrt{x}]_1^4=4-2=2", 2)
# ---------- 7 ----------
v.enunciado(7, ["4-x^2"])
v.ok(sorted(solve(4 - x**2, x)) == [-2, 2] and integrate(4 - x**2, (x, -2, 2)) == R(32, 3), "ej. 7: área 32/3")
add(7, '', "x=\\pm2", "\\int_{-2}^2(4-x^2)dx=[4x-\\frac{x^3}{3}]_{-2}^2=\\frac{16}{3}-(-\\frac{16}{3})=\\frac{32}{3}")
# ---------- 8 ----------
f8 = x**2 - 2 * x
v.enunciado(8, ["x^2-2x", "[0,3]"])
v.ok(integrate(f8, (x, 0, 3)) == 0 and integrate(f8, (x, 0, 2)) == -R(4, 3) and integrate(f8, (x, 2, 3)) == R(4, 3), "ej. 8: integral 0, tramos ∓4/3, área 8/3")
add(8, '', "F(x)=\\frac{x^3}{3}-x^2", "\\int_0^3f=F(3)-F(0)=0", "\\int_0^2f=F(2)-F(0)=-\\frac{4}{3}", "\\int_2^3f=F(3)-F(2)=\\frac{4}{3}", "\\frac{4}{3}+\\frac{4}{3}=\\frac{8}{3}")
# ---------- 9 ----------
v.enunciado(9, ["y=x^2", "y=2x"])
v.ok(sorted(solve(x**2 - 2 * x, x)) == [0, 2] and integrate(2 * x - x**2, (x, 0, 2)) == R(4, 3), "ej. 9: área 4/3")
add(9, '', "x=0", "x=2", "\\int_0^2(2x-x^2)dx=[x^2-\\frac{x^3}{3}]_0^2=4-\\frac{8}{3}=\\frac{4}{3}")
# ---------- 10 ----------
C10 = integrate(R(6, 100) * x + 4, x) + 500
v.enunciado(10, ["0{,}06x+4", "500"])
v.ok(C10 == R(3, 100) * x**2 + 4 * x + 500 and C10.subs(x, 100) == 1200 and C10.subs(x, 200) == 2500 and integrate(R(6, 100) * x + 4, (x, 100, 200)) == 1300, "ej. 10")
add(10, 'a', "C(x)=\\int(0{,}06x+4)dx=0{,}03x^2+4x+K", "K=500", "C(x)=0{,}03x^2+4x+500")
add(10, 'b', "C(100)=300+400+500=1200")
add(10, 'c', "\\int_{100}^{200}(0{,}06x+4)dx=[0{,}03x^2+4x]_{100}^{200}=(1200+800)-(300+400)=1300")
add(10, 'd', "C(200)-C(100)=2500-1200=1300")
# ---------- 11 ----------
s11 = 200 * exp(-t / 5)
v.enunciado(11, ["200\\,e^{-t/5}"])
prim(11, 'a', "\\int200e^{-t/5}dt", s11, "-1000e^{-t/5}+C", -1000 * exp(-t / 5), var=t)
i10 = integrate(s11, (t, 0, 10)); i510 = integrate(s11, (t, 5, 10))
v.ok(simplify(i10 - 1000 * (1 - exp(-2))) == 0 and simplify(i510 - 1000 * (exp(-1) - exp(-2))) == 0, "ej. 11bc")
add(11, 'b', "\\int_0^{10}200e^{-t/5}dt=[-1000e^{-t/5}]_0^{10}=1000(1-e^{-2})", f"\\int_0^{{10}}200e^{{-t/5}}dt\\approx{dec(N(i10), 2)}")
add(11, 'c', "\\int_5^{10}200e^{-t/5}dt=1000(e^{-1}-e^{-2})", f"\\int_5^{{10}}200e^{{-t/5}}dt\\approx{dec(N(i510), 2)}")
v.ok(N(i510) < N(i10) / 2, "ej. 11d: 232,54 < 864,66/2")
add(11, 'd', f"{dec(N(i10 - i510), 2)}", f"{dec(N(i510), 2)}")
# ---------- 12 ----------
v.enunciado(12, ["x^2", "x+2"])
defi(12, 'A.a', "\\int_0^1xe^{x^2}dx", x * exp(x**2), 0, 1, "[\\frac{e^{x^2}}{2}]_0^1=\\frac{e-1}{2}", (E - 1) / 2)
defi(12, 'A.b', "\\int_0^2\\frac{2x}{x^2+1}dx", 2 * x / (x**2 + 1), 0, 2, "[\\ln(x^2+1)]_0^2=\\ln5-\\ln1=\\ln5", log(5))
defi(12, 'A.c', "\\int_0^3\\frac{x}{\\sqrt{x^2+16}}dx", x / sqrt(x**2 + 16), 0, 3, "[\\sqrt{x^2+16}]_0^3=5-4=1", 1)
v.ok(sorted(solve(x**2 - x - 2, x)) == [-1, 2] and (x + 2 - x**2).subs(x, 0) > 0 and integrate(x + 2 - x**2, (x, -1, 2)) == R(9, 2), "ej. 12B")
add(12, 'B.a', "x^2-x-2=0", "x=-1", "x=2")
add(12, 'B.b', "g(0)=2>f(0)=0")
add(12, 'B.c', "\\int_{-1}^2(x+2-x^2)dx=[\\frac{x^2}{2}+2x-\\frac{x^3}{3}]_{-1}^2=\\frac{10}{3}-(-\\frac{7}{6})=\\frac{9}{2}")
# ---------- 13 ----------
v.enunciado(13, ["60-\\dfrac{q}{5}", "24"])
q13 = solve(60 - q / 5 - 24, q)
ex13 = integrate(36 - q / 5, (q, 0, 180))
v.ok(q13 == [180] and ex13 == 3240 and R(1, 2) * 180 * 36 == 3240, "ej. 13")
add(13, 'a', f"q={q13[0]}")
add(13, 'b', "\\int_0^{180}(60-\\frac{q}{5}-24)dq=\\int_0^{180}(36-\\frac{q}{5})dq")
add(13, 'c', "[36q-\\frac{q^2}{10}]_0^{180}=6480-3240=3240")
add(13, 'd', "\\frac{1}{2}\\cdot180\\cdot36=3240")
# ---------- 14 ----------
I14 = integrate(120 - 6 * x, x)
v.ok(I14 == 120 * x - 3 * x**2 and I14.subs(x, 10) == 900 and solve(diff(I14, x), x) == [20] and I14.subs(x, 20) == 1200 and integrate(120 - 6 * x, (x, 10, 15)) == 225, "ej. 14")
v.enunciado(14, ["120-6x"])
add(14, 'a', "I(x)=\\int(120-6x)dx=120x-3x^2+K", "K=0", "I(x)=120x-3x^2")
add(14, 'b', "I(10)=1200-300=900")
add(14, 'c', "I'(x)=120-6x=0", "x=20", "I''=-6<0", "I(20)=2400-1200=1200")
add(14, 'd', "\\int_{10}^{15}(120-6x)dx=[120x-3x^2]_{10}^{15}=(1800-675)-(1200-300)=225")
# ---------- 15 ----------
b15 = t**2 - 6 * t + 5
F15 = t**3 / 3 - 3 * t**2 + 5 * t
parts = [integrate(b15, (t, a_, b_)) for a_, b_ in ((0, 1), (1, 5), (5, 6))]
v.ok(sorted(solve(b15, t)) == [1, 5] and parts == [R(7, 3), -R(32, 3), R(7, 3)] and integrate(b15, (t, 0, 6)) == -6 and parts[0] + parts[2] == R(14, 3), "ej. 15")
v.enunciado(15, ["t^2-6t+5"])
add(15, 'a', "t^2-6t+5=(t-1)(t-5)=0", "t=1", "t=5")
add(15, 'b', "\\int_0^1b=F(1)-F(0)=\\frac{7}{3}", "\\int_1^5b=F(5)-F(1)=-\\frac{32}{3}", "\\int_5^6b=F(6)-F(5)=\\frac{7}{3}")
add(15, 'c', "\\int_0^6b(t)dt=F(6)-F(0)=72-108+30=-6")
add(15, 'd', "\\frac{7}{3}+\\frac{7}{3}=\\frac{14}{3}", "\\frac{14}{3}-\\frac{32}{3}=-6")
# ---------- 16 ----------
v.enunciado(16, ["f(x)=4x", "g(x)=x^3"])
v.ok(sorted(solve(4 * x - x**3, x)) == [-2, 0, 2] and integrate(4 * x - x**3, (x, 0, 2)) == 4 and integrate(x**3 - 4 * x, (x, -2, 0)) == 4, "ej. 16")
add(16, 'a', "x=-2,\\ 0,\\ 2".replace(",\\ ", ","))
add(16, 'b', "4>1", "-1>-4")
add(16, 'c', "\\int_0^2(4x-x^3)dx=[2x^2-\\frac{x^4}{4}]_0^2=8-4=4")
add(16, 'd', "2\\cdot4=8")
# ---------- 17 ----------
v.enunciado(17, ["8+\\dfrac{q}{10}", "20"])
q17 = solve(8 + q / 10 - 20, q)
v.ok(q17 == [120] and integrate(12 - q / 10, (q, 0, 120)) == 720, "ej. 17")
add(17, 'a', f"q={q17[0]}")
add(17, 'b', "\\int_0^{120}(20-8-\\frac{q}{10})dq=\\int_0^{120}(12-\\frac{q}{10})dq")
add(17, 'c', "[12q-\\frac{q^2}{20}]_0^{120}=1440-720=720")
add(17, 'd', "dispuestos a vender")
# ---------- 18 ----------
v.enunciado(18, ["\\int(2x+1)\\,e^{x^2+x}\\,dx", "\\int\\dfrac{x^2}{x^3+1}\\,dx", "\\int\\dfrac{2x}{\\sqrt{x^2+1}}\\,dx", "\\int2^x\\,dx"])
prim(18, 'a', "\\int(2x+1)e^{x^2+x}dx", (2 * x + 1) * exp(x**2 + x), "e^{x^2+x}+C", exp(x**2 + x))
prim(18, 'b', "\\int\\frac{x^2}{x^3+1}dx", x**2 / (x**3 + 1), "\\frac{1}{3}\\ln|x^3+1|+C", log(x**3 + 1) / 3)
prim(18, 'c', "\\int\\frac{2x}{\\sqrt{x^2+1}}dx", 2 * x / sqrt(x**2 + 1), "2\\sqrt{x^2+1}+C", 2 * sqrt(x**2 + 1))
prim(18, 'd', "\\int2^xdx", 2**x, "\\frac{2^x}{\\ln2}+C", 2**x / log(2))
# ---------- 19 ----------
v.enunciado(19, ["0{,}3t+2"])
v19 = R(3, 10) * t + 2
v.ok((v19.subs(t, 0), v19.subs(t, 60)) == (2, 20) and integrate(v19, (t, 0, 60)) == 660 and integrate(v19, (t, 20, 40)) == 220 and R(660, 60) == 11 and R(2 + 20, 2) == 11, "ej. 19")
add(19, 'a', "v(0)=2", "v(60)=0{,}3\\cdot60+2=20")
add(19, 'b', "\\int_0^{60}(0{,}3t+2)dt=[0{,}15t^2+2t]_0^{60}=540+120=660")
add(19, 'c', "\\int_{20}^{40}(0{,}3t+2)dt=(240+80)-(60+40)=220")
add(19, 'd', "\\frac{660}{60}=11")
# ---------- 20 ----------
a20 = solve(8 + 2 * a - 14, a)
v.ok(a20 == [3] and integrate(3 * x**2 + 3 * x, (x, 0, 2)) == 14 and factor(3 * x**2 + 3 * x) == 3 * x * (x + 1), "ej. 20")
v.enunciado(20, ["3x^2+ax"])
add(20, 'a', "\\int(3x^2+ax)dx=x^3+\\frac{a}{2}x^2")
add(20, 'b', "\\int_0^2f(x)dx=[x^3+\\frac{a}{2}x^2]_0^2=8+2a=14")
add(20, 'c', f"a={a20[0]}")
add(20, 'd', "f(x)=3x^2+3x=3x(x+1)", "14")
# ---------- 21 ----------
v.enunciado(21, ["10+2t", "4t"])
t21 = solve(10 + 2 * t - 4 * t, t)
v.ok(t21 == [5] and (10 + 2 * t).subs(t, 0) > (4 * t).subs(t, 0) and integrate(10 - 2 * t, (t, 0, 5)) == 25, "ej. 21")
add(21, 'a', f"t={t21[0]}")
add(21, 'b', "A(t)>B(t)", "10>0")
add(21, 'c', "\\int_0^5(10+2t-4t)dt=\\int_0^5(10-2t)dt=[10t-t^2]_0^5=25")
add(21, 'd', "25 mil euros más")
# ---------- 22 ----------
f22 = x**3 - 4 * x
ints22 = [integrate(f22, (x, a_, b_)) for a_, b_ in ((-2, 0), (0, 2), (2, 3))]
v.enunciado(22, ["x^3-4x", "[-2,3]"])
v.ok(sorted(solve(f22, x)) == [-2, 0, 2] and ints22 == [4, -4, R(25, 4)] and integrate(f22, (x, -2, 3)) == R(25, 4) and sum(abs(i) for i in ints22) == R(57, 4), "ej. 22")
add(22, 'a', "x^3-4x=x(x-2)(x+2)=0", "x=-2,\\ 0,\\ 2".replace(",\\ ", ","))
add(22, 'b', "!En $(-2,0)$, $f>0$", "!en $(0,2)$, $f<0$", "!en $(2,3)$, $f>0$")
add(22, 'c', "\\int_{-2}^3f=F(3)-F(-2)=\\frac{9}{4}-(-4)=\\frac{25}{4}")
add(22, 'd', "4+4+\\frac{25}{4}=\\frac{57}{4}")
# ---------- 23 ----------
r23 = 100 / (t + 1)
v.enunciado(23, ["\\dfrac{100}{t+1}"])
prim(23, 'a', "\\int\\frac{100}{t+1}dt", r23, "100\\ln|t+1|+C", 100 * log(t + 1), var=t)
i03 = integrate(r23, (t, 0, 3)); i37 = integrate(r23, (t, 3, 7))
v.ok(simplify(i03 - 100 * log(4)) == 0 and simplify(i37 - 100 * log(2)) == 0 and round(float(N(i03)), 2) == 138.63 and round(float(N(i37)), 2) == 69.31, "ej. 23")
add(23, 'b', "\\int_0^3\\frac{100}{t+1}dt=[100\\ln(t+1)]_0^3=100\\ln4", f"\\int_0^3\\frac{{100}}{{t+1}}dt\\approx{dec(N(i03), 2)}")
add(23, 'c', "\\int_3^7\\frac{100}{t+1}dt=100\\ln8-100\\ln4=100\\ln2", f"\\int_3^7\\frac{{100}}{{t+1}}dt\\approx{dec(N(i37), 2)}")
add(23, 'd', "!138,63", "!69,31")
# ---------- 24 ----------
v.enunciado(24, ["2x&0\\le x\\le2", "4&x>2"])
v.ok(integrate(2 * x, (x, 0, 2)) == 4 and integrate(4, (x, 2, 5)) == 12 and R(2 * 4, 2) == 4 and 3 * 4 == 12, "ej. 24")
add(24, 'a', "\\int_0^22x\\,dx=[x^2]_0^2=4".replace("\\,", ""))
add(24, 'b', "\\int_2^54dx=[4x]_2^5=20-8=12")
add(24, 'c', "\\int_0^5f=\\int_0^2f+\\int_2^5f=4+12=16")
add(24, 'd', "\\frac{2\\cdot4}{2}=4")
# ---------- 25 ----------
v.ok(integrate(E - exp(x), (x, 0, 1)) == 1 and all(exp(x0) <= E for x0 in (0, R(1, 2), 1)), "ej. 25A")
v.enunciado(25, ["e^x", "\\dfrac{2x}{x^2+1}"])
add(25, 'A.a', "e^x\\le e")
add(25, 'A.b', "\\int_0^1(e-e^x)dx")
add(25, 'A.c', "\\int_0^1(e-e^x)dx=[ex-e^x]_0^1=(e-e)-(0-1)=1")
prim(25, 'B.a', "\\int\\frac{2x}{x^2+1}dx", 2 * x / (x**2 + 1), "\\ln(x^2+1)+C", log(x**2 + 1))
c25 = solve(log(1) + K - 3, K)
v.ok(c25 == [3] and (log(x**2 + 1) + 3).subs(x, 0) == 3 and simplify(diff(log(x**2 + 1) + 3, x) - 2 * x / (x**2 + 1)) == 0, "ej. 25B: C=3")
add(25, 'B.b', "F(0)=\\ln1+C=3", "C=3", "F(x)=\\ln(x^2+1)+3")
add(25, 'B.c', f"F(1)=\\ln2+3\\approx{dec(N(log(2) + 3), 2)}")

# ---------- comprobación de todos los resultados en su apartado ----------
for (num, ap), frags in RES.items():
    n = CNT.get((num, ap), {})
    v.solucion(num, [(f, n[f]) if f in n else f for f in frags], ap)
v.fin()
