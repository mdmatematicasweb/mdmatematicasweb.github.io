#!/usr/bin/env python3
"""Relación de ejercicios del tema 5 (Lenguaje algebraico y polinomios)."""
from sympy import symbols, expand, factor, div, latex, Poly, cancel, simplify, Rational as R, solve, Eq
from _ej import Tema, L, D

T = Tema(5, "05-polinomios", "Lenguaje algebraico y polinomios")
x, y, a, b = symbols('x y a b')
lx = latex

# ---- básicos ----
T.b("Traduce a lenguaje algebraico: a) el triple de un número menos cinco b) la mitad de la suma de dos números c) tres números consecutivos cuya suma es $48$ d) el área de un cuadrado de lado $x+2$.",
    "a) $3x-5$. b) $\\frac{x+y}{2}$. c) $x+(x+1)+(x+2)=48$. d) $(x+2)^2$.",
    ["$3x-5$", "\\frac{x+y}{2}", "x+(x+1)+(x+2)=48", "(x+2)^2"])

P = 2 * x**3 - 5 * x**2 + x - 4
T.b("Para $P(x)=2x^3-5x^2+x-4$ indica el grado, el término independiente y calcula $P(0)$, $P(1)$ y $P(-2)$.",
    f"Grado $3$; término independiente $-4$. $P(0)=-4$, $P(1)=2-5+1-4={P.subs(x,1)}$, $P(-2)=-16-20-2-4={P.subs(x,-2)}$.",
    ["Grado $3$", f"P(1)=2-5+1-4={P.subs(x,1)}$", f"={P.subs(x,-2)}$"])

A = 3 * x**2 - 2 * x + 5; B = x**2 + 4 * x - 1
T.b("Dados $A(x)=3x^2-2x+5$ y $B(x)=x^2+4x-1$, calcula $A+B$, $A-B$ y $2A-3B$.",
    f"$A+B={lx(expand(A+B))}$. $A-B={lx(expand(A-B))}$. $2A-3B={lx(expand(2*A-3*B))}$.",
    [f"A+B={lx(expand(A+B))}$", f"A-B={lx(expand(A-B))}$", f"2A-3B={lx(expand(2*A-3*B))}$"])

T.b("Multiplica y reduce: a) $3x^2(2x-5)$ b) $(x+4)(x-3)$ c) $(2x-1)(x^2+3x-2)$.",
    f"a) ${lx(expand(3*x**2*(2*x-5)))}$. b) ${lx(expand((x+4)*(x-3)))}$. c) ${lx(expand((2*x-1)*(x**2+3*x-2)))}$.",
    [f"a) ${lx(expand(3*x**2*(2*x-5)))}$", f"b) ${lx(expand((x+4)*(x-3)))}$", f"c) ${lx(expand((2*x-1)*(x**2+3*x-2)))}$"])

T.b("Desarrolla con las identidades notables: a) $(x+7)^2$ b) $(3x-2)^2$ c) $(5x+4)(5x-4)$ d) $(a+2b)^2$.",
    f"a) ${lx(expand((x+7)**2))}$. b) ${lx(expand((3*x-2)**2))}$. c) ${lx(expand((5*x+4)*(5*x-4)))}$. d) ${lx(expand((a+2*b)**2))}$.",
    [f"a) ${lx(expand((x+7)**2))}$", f"b) ${lx(expand((3*x-2)**2))}$", f"c) ${lx(expand((5*x+4)*(5*x-4)))}$", f"d) ${lx(expand((a+2*b)**2))}$"])

D1 = 2 * x**3 - 3 * x**2 + 4 * x - 5
q, r = div(D1, x - 2, x)
T.b("Divide $2x^3-3x^2+4x-5$ entre $x-2$ y comprueba el resultado con la prueba de la división.",
    f"Cociente ${lx(q)}$ y resto ${lx(r)}$. Prueba: $(x-2)({lx(q)})+{lx(r)}={lx(expand((x-2)*q+r))}$.",
    [f"Cociente ${lx(q)}$", f"resto ${lx(r)}$"])

T.b("Saca factor común: a) $12x^3-18x^2$ b) $5ab+10a^2b-15ab^2$.",
    f"a) ${lx(factor(12*x**3-18*x**2))}$. b) ${lx(factor(5*a*b+10*a**2*b-15*a*b**2))}$.",
    [f"a) ${lx(factor(12*x**3-18*x**2))}$", f"b) ${lx(factor(5*a*b+10*a**2*b-15*a*b**2))}$"])

T.b("Factoriza: a) $x^2-25$ b) $x^2+10x+25$ c) $x^2-5x+6$.",
    f"a) ${lx(factor(x**2-25))}$. b) ${lx(factor(x**2+10*x+25))}$. c) Raíces $2$ y $3$: ${lx(factor(x**2-5*x+6))}$.",
    [f"a) ${lx(factor(x**2-25))}$", f"b) ${lx(factor(x**2+10*x+25))}$", f"c) Raíces $2$ y $3$: ${lx(factor(x**2-5*x+6))}$"])

T.b("Simplifica la fracción algebraica $\\dfrac{x^2-4}{x^2+2x}$ indicando para qué valores no está definida.",
    f"Numerador: $(x+2)(x-2)$. Denominador: $x(x+2)$. Resultado: ${lx(cancel((x**2-4)/(x**2+2*x)))}$, con $x\\neq0$ y $x\\neq-2$.",
    [f"{lx(cancel((x**2-4)/(x**2+2*x)))}$, con"])

T.b("Calcula el valor numérico de $E=3a^2-2ab+b^2$ para $a=2$ y $b=-3$.",
    f"$3\\cdot4-2\\cdot2\\cdot(-3)+9=12+12+9={(3*a**2-2*a*b+b**2).subs({a:2,b:-3})}$.",
    [f"={(3*a**2-2*a*b+b**2).subs({a:2,b:-3})}$"])

# ---- problemas ----
T.p("Un rectángulo tiene un lado que mide $x+3$ y el otro $x-1$. Escribe y simplifica el polinomio del perímetro y del área. ¿Cuánto valen si $x=5$?",
    f"Perímetro: $2(x+3)+2(x-1)={lx(expand(2*(x+3)+2*(x-1)))}$. Área: $(x+3)(x-1)={lx(expand((x+3)*(x-1)))}$. Con $x=5$: perímetro ${expand(2*(x+3)+2*(x-1)).subs(x,5)}$ y área ${expand((x+3)*(x-1)).subs(x,5)}$.",
    [f"{lx(expand(2*(x+3)+2*(x-1)))}$", f"{lx(expand((x+3)*(x-1)))}$", f"perímetro ${expand(2*(x+3)+2*(x-1)).subs(x,5)}$ y área ${expand((x+3)*(x-1)).subs(x,5)}$"])

T.p("Una caja sin tapa se forma con un cartón cuadrado de lado $x$ al cortar en cada esquina un cuadradito de lado $2$. Expresa el volumen en función de $x$ (la altura de la caja es $2$).",
    f"La base es un cuadrado de lado $x-4$. $V=2(x-4)^2=2(x^2-8x+16)={lx(expand(2*(x-4)**2))}$.",
    [f"V=2(x-4)^2=2(x^2-8x+16)={lx(expand(2*(x-4)**2))}$"])

T.p("Halla $k$ para que $P(x)=x^3+kx^2-4x+4$ sea divisible entre $x-2$.",
    f"Debe ser $P(2)=0$: $8+4k-8+4=0\\Rightarrow4k=-4\\Rightarrow k=-1$.",
    ["k=-1$"])

T.p("Comprueba que $x=3$ es raíz de $P(x)=x^3-6x^2+11x-6$ y factoriza el polinomio completamente.",
    f"$P(3)=27-54+33-6=0$. Dividiendo entre $x-3$: $x^2-3x+2=(x-1)(x-2)$. Entonces $P(x)={lx(factor(x**3-6*x**2+11*x-6))}$.",
    ["P(3)=27-54+33-6=0", f"{lx(factor(x**3-6*x**2+11*x-6))}"])

T.p("Demuestra con identidades notables que $(n+1)^2-n^2$ es siempre un número impar. ¿Cuánto vale para $n=49$?",
    f"$(n+1)^2-n^2=n^2+2n+1-n^2=2n+1$, que es impar. Para $n=49$: ${2*49+1}$.",
    ["=2n+1$, que es impar", f"Para $n=49$: ${2*49+1}$"])

T.p("Calcula mentalmente usando identidades notables: a) $101^2$ b) $99^2$ c) $52\\cdot48$.",
    f"a) $(100+1)^2=10000+200+1={101**2}$. b) $(100-1)^2=10000-200+1={99**2}$. c) $(50+2)(50-2)=2500-4={52*48}$.",
    [f"={101**2}$", f"={99**2}$", f"={52*48}$"])

T.p("El beneficio de una empresa en miles de euros es $B(x)=-x^2+8x-12$, donde $x$ son los meses. Calcula $B(2)$, $B(4)$, $B(6)$ y factoriza $B(x)$. ¿En qué meses el beneficio es cero?",
    f"$B(2)={(-x**2+8*x-12).subs(x,2)}$, $B(4)={(-x**2+8*x-12).subs(x,4)}$, $B(6)={(-x**2+8*x-12).subs(x,6)}$. $B(x)=-(x-2)(x-6)$. El beneficio es cero en los meses $2$ y $6$.",
    ["B(2)=0", "B(4)=4", "-(x-2)(x-6)"])

T.p("Simplifica: $\\dfrac{x^2+6x+9}{x^2-9}$ y calcula su valor para $x=5$.",
    f"$\\frac{{(x+3)^2}}{{(x+3)(x-3)}}={lx(cancel((x**2+6*x+9)/(x**2-9)))}$. Para $x=5$: ${cancel((x**2+6*x+9)/(x**2-9)).subs(x,5)}$.",
    [f"={lx(cancel((x**2+6*x+9)/(x**2-9)))}$", f"Para $x=5$: ${cancel((x**2+6*x+9)/(x**2-9)).subs(x,5)}$"])

T.p("La suma de un número y su cuadrado es $56$. Plantea la ecuación, factoriza el polinomio y halla los números.",
    f"$x^2+x-56=0\\Rightarrow(x+8)(x-7)=0$. Los números son $x=7$ y $x=-8$.",
    ["(x+8)(x-7)=0", "x=7$ y $x=-8"])

T.p("Halla el polinomio $P(x)$ de segundo grado que cumple $P(0)=3$, $P(1)=6$ y $P(-1)=4$.",
    f"$P(x)=ax^2+bx+c$ con $c=3$; $a+b+3=6$ y $a-b+3=4$. Sumando: $2a+6=10\\Rightarrow a=2$ y $b=1$. $P(x)=2x^2+x+3$.",
    ["P(x)=2x^2+x+3"])

# ---- competenciales ----
T.c("**La finca.** Una finca cuadrada de lado $x$ metros se amplía añadiendo $5$ m a un lado y $3$ m al contiguo. a) Expresa el área de la finca ampliada. b) ¿Cuánto terreno nuevo hay (diferencia de áreas)? c) Si $x=40$, ¿cuántos m² son?",
    f"a) $(x+5)(x+3)={lx(expand((x+5)*(x+3)))}$. b) Nuevo: ${lx(expand((x+5)*(x+3)-x**2))}$. c) $8\\cdot40+15={8*40+15}$ m².",
    [f"{lx(expand((x+5)*(x+3)))}$", f"{lx(expand((x+5)*(x+3)-x**2))}$", f"={8*40+15}$ m²"])

T.c("**Tarifas de taxi.** Un taxi A cobra $3$ € de bajada de bandera más $1{,}2$ € por km. Otro taxi B cobra $2$ € más $1{,}4$ € por km. a) Escribe el coste de cada uno en función de los km $x$. b) ¿Cuándo es igual el coste? c) ¿Cuál es más barato para un trayecto de $12$ km?",
    f"a) $A(x)=3+1{{,}}2x$ y $B(x)=2+1{{,}}4x$. b) $3+1{{,}}2x=2+1{{,}}4x\\Rightarrow x=5$ km. c) A: ${D(3+1.2*12,2,False)}$ €; B: ${D(2+1.4*12,2,False)}$ €. Es más barato el A.",
    ["x=5$ km", "Es más barato el A"])

T.c("**Un truco de magia.** Piensa un número, multiplícalo por $2$, súmale $6$, divide entre $2$ y resta el número inicial. a) Prueba con $5$, $12$ y $-3$. b) Demuestra con álgebra por qué siempre sale lo mismo.",
    f"a) Con $5$: $(10+6):2-5=3$; con $12$: $(24+6):2-12=3$; con $-3$: $(-6+6):2+3=3$. b) $\\frac{{2x+6}}{{2}}-x=x+3-x=3$.",
    ["x+3-x=3"])

T.c("**El mosaico.** Un patio cuadrado de lado $a+b$ se pavimenta con un cuadrado grande de lado $a$, un cuadrado pequeño de lado $b$ y dos rectángulos de $a\\times b$. a) Escribe el área total de dos formas. b) Con $a=6$ m y $b=2$ m, ¿cuántos m² son? c) ¿Cuánto vale solo la parte de los dos rectángulos?",
    f"a) $(a+b)^2=a^2+2ab+b^2$. b) $(6+2)^2={(6+2)**2}$ m². c) $2ab=2\\cdot6\\cdot2={2*6*2}$ m².",
    ["(a+b)^2=a^2+2ab+b^2", f"={(6+2)**2}$ m²", f"={2*6*2}$ m²"])

# comprobaciones independientes de los datos escritos a mano
T.chk(sorted(solve(x**2 + x - 56, x)) == [-8, 7], "ex 19")
T.chk(factor(x**2 + x - 56) == (x + 8)*(x - 7), "ex 19 factor")
T.chk(P.subs(x, 0) == -4 and Poly(P, x).degree() == 3, "ex 2")
T.chk(solve((x**3 + symbols('k')*x**2 - 4*x + 4).subs(x, 2), symbols('k')) == [-1], "ex 14")
T.chk(factor(x**3 - 6*x**2 + 11*x - 6) == (x - 1)*(x - 2)*(x - 3), "ex 15")
T.chk(expand((x + 1)**2 - x**2) == 2*x + 1, "ex 16")
T.chk((-x**2 + 8*x - 12).subs(x, 4) == 4 and expand(-(x - 2)*(x - 6)) == -x**2 + 8*x - 12, "ex 18")
a2, b2, c2 = symbols('a2 b2 c2')
T.chk(solve([c2 - 3, a2 + b2 + c2 - 6, a2 - b2 + c2 - 4], [a2, b2, c2]) == {a2: 2, b2: 1, c2: 3}, "ex 20")
T.chk(expand((x + 5)*(x + 3) - x**2) == 8*x + 15 and 8*40 + 15 == 335, "ex 21")
T.chk(solve(Eq(3 + R(12, 10)*x, 2 + R(14, 10)*x), x) == [5], "ex 22")
T.chk(R(2*5 + 6, 2) - 5 == 3 and R(2*12 + 6, 2) - 12 == 3 and R(-6 + 6, 2) + 3 == 3, "ex 23")
T.chk((6 + 2)**2 == 64 and 2*6*2 == 24, "ex 24")
T.chk((3*a**2 - 2*a*b + b**2).subs({a: 2, b: -3}) == 33, "ex 10")
T.cerrar()
