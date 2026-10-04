#!/usr/bin/env python3
"""Relación de ejercicios del tema 1 (Números racionales). Verifica y escribe ejercicios/3-eso/01-numeros-racionales/index.qmd."""
from math import gcd
from sympy import Rational as R, factorint, lcm, gcd as sgcd, Integer
from _ej import Tema, L, D, eur, miles

T = Tema(1, "01-numeros-racionales", "Números racionales")


def fact(n):
    return "\\cdot".join(f"{p}" + (f"^{e}" if e > 1 else "") for p, e in sorted(factorint(n).items()))


# ---- básicos ----
a, b = 84, 120
g, m = gcd(a, b), a * b // gcd(a, b)
T.b(f"Descompón en factores primos {a} y {b} y calcula su m.c.d. y su m.c.m.",
    f"${a}={fact(a)}$ y ${b}={fact(b)}$. El m.c.d. toma los factores comunes con el menor exponente: ${g}$. El m.c.m. toma todos con el mayor exponente: ${m}$.",
    [f"{a}={fact(a)}", f"{b}={fact(b)}", f"${g}$", f"${m}$"])

a, b = 90, 126
T.b(f"Simplifica hasta obtener la fracción irreducible: $\\frac{{{a}}}{{{b}}}$. ¿Cuál es el m.c.d. que has usado?",
    f"El m.c.d.$({a},{b})={gcd(a,b)}$. Dividiendo: $\\frac{{{a}}}{{{b}}}=\\frac{{{a//gcd(a,b)}}}{{{b//gcd(a,b)}}}$, que es irreducible.",
    [f"m.c.d.$({a},{b})={gcd(a,b)}$", f"\\frac{{{a//gcd(a,b)}}}{{{b//gcd(a,b)}}}$, que"])

x = R(7, 12) ; y = R(9, 16); z = R(5, 8)
orden = sorted([x, y, z])
T.b(f"Ordena de menor a mayor: $\\frac{{7}}{{12}},\\ \\frac{{9}}{{16}},\\ \\frac{{5}}{{8}}$.",
    f"Con denominador común $48$: $\\frac{{28}}{{48}},\\ \\frac{{27}}{{48}},\\ \\frac{{30}}{{48}}$. Por tanto ${L(orden[0])}<{L(orden[1])}<{L(orden[2])}$.",
    [f"{L(orden[0])}<{L(orden[1])}<{L(orden[2])}"])

x, y = R(5, 6), R(3, 4)
T.b(f"Calcula y simplifica: a) $\\frac{{5}}{{6}}+\\frac{{3}}{{4}}$ b) $\\frac{{5}}{{6}}-\\frac{{3}}{{4}}$ c) $\\frac{{5}}{{6}}\\cdot\\frac{{3}}{{4}}$ d) $\\frac{{5}}{{6}}:\\frac{{3}}{{4}}$.",
    f"a) $\\frac{{10}}{{12}}+\\frac{{9}}{{12}}={L(x+y)}$. b) $\\frac{{10}}{{12}}-\\frac{{9}}{{12}}={L(x-y)}$. c) $\\frac{{15}}{{24}}={L(x*y)}$. d) $\\frac{{5}}{{6}}\\cdot\\frac{{4}}{{3}}=\\frac{{20}}{{18}}={L(x/y)}$.",
    [f"={L(x+y)}$", f"={L(x-y)}$", f"={L(x*y)}$", f"={L(x/y)}$"])

e = R(1, 2) - (R(-2, 5) + R(3, 10)) * R(5, 3)
T.b("Calcula: $\\frac{1}{2}-\\left(-\\frac{2}{5}+\\frac{3}{10}\\right)\\cdot\\frac{5}{3}$.",
    f"Paréntesis: $-\\frac{{4}}{{10}}+\\frac{{3}}{{10}}=-\\frac{{1}}{{10}}$. Producto: $-\\frac{{1}}{{10}}\\cdot\\frac{{5}}{{3}}=-\\frac{{1}}{{6}}$. Resta: $\\frac{{1}}{{2}}+\\frac{{1}}{{6}}={L(e)}$.",
    [f"={L(e)}$"])

T.b("Clasifica estos decimales como exactos, periódicos puros o periódicos mixtos: $0{,}125$, $0{,}\\overline{36}$, $2{,}1\\overline{6}$, $5{,}\\overline{4}$.",
    "$0{,}125$ es **exacto**. $0{,}\\overline{36}$ es **periódico puro** (periodo $36$). $2{,}1\\overline{6}$ es **periódico mixto** (anteperiodo $1$, periodo $6$). $5{,}\\overline{4}$ es **periódico puro** (periodo $4$).",
    ["exacto", "periódico puro", "periódico mixto"])

f1, f2, f3 = R(125, 1000), R(36, 99), R(216 - 21, 90)
T.b("Halla la fracción generatriz de: a) $0{,}125$ b) $0{,}\\overline{36}$ c) $2{,}1\\overline{6}$. Simplifica.",
    f"a) $\\frac{{125}}{{1000}}={L(f1)}$. b) $\\frac{{36}}{{99}}={L(f2)}$. c) $\\frac{{216-21}}{{90}}=\\frac{{195}}{{90}}={L(f3)}$.",
    [f"={L(f1)}$", f"={L(f2)}$", f"={L(f3)}$"])

T.b("Escribe en forma decimal y di de qué tipo es: a) $\\frac{7}{8}$ b) $\\frac{5}{6}$ c) $\\frac{4}{11}$.",
    "a) $7:8=0{,}875$ (exacto). b) $5:6=0{,}8\\overline{3}$ (periódico mixto). c) $4:11=0{,}\\overline{36}$ (periódico puro).",
    ["0{,}875", "0{,}8\\overline{3}", "0{,}\\overline{36}"])

T.b("Calcula las fracciones: a) $\\frac{3}{5}$ de $350$ b) el $\\frac{2}{7}$ de $91$ c) ¿qué fracción de $60$ es $45$? Simplifica.",
    f"a) $\\frac{{3}}{{5}}\\cdot350={int(R(3,5)*350)}$. b) $\\frac{{2}}{{7}}\\cdot91={int(R(2,7)*91)}$. c) $\\frac{{45}}{{60}}={L(R(45,60))}$.",
    [f"={int(R(3,5)*350)}$", f"={int(R(2,7)*91)}$", f"={L(R(45,60))}$"])

x = R(5, 3)
T.b("Representa en la recta numérica $\\frac{5}{3}$, $-\\frac{3}{4}$ y $1{,}\\overline{3}$ e indica entre qué enteros están.",
    "$\\frac{5}{3}=1{,}\\overline{6}$ está entre $1$ y $2$. $-\\frac{3}{4}=-0{,}75$ está entre $-1$ y $0$. $1{,}\\overline{3}=\\frac{4}{3}$ está entre $1$ y $2$, antes que $\\frac{5}{3}$.",
    ["entre $1$ y $2$", "entre $-1$ y $0$"])

# ---- problemas ----
T.p("Un depósito está lleno de agua. El lunes se gasta $\\frac{1}{4}$, el martes $\\frac{2}{5}$ de lo que había al principio. ¿Qué fracción queda? Si el depósito tiene $2\\,000$ L, ¿cuántos litros quedan?",
    f"Se gasta $\\frac{{1}}{{4}}+\\frac{{2}}{{5}}={L(R(1,4)+R(2,5))}$. Quedan $1-{L(R(1,4)+R(2,5))}={L(1-R(1,4)-R(2,5))}$ del depósito, es decir, ${int((1-R(1,4)-R(2,5))*2000)}$ L.",
    [f"={L(R(1,4)+R(2,5))}$", f"{L(1-R(1,4)-R(2,5))}$ del", f"{int((1-R(1,4)-R(2,5))*2000)}$ L"])

T.p("De los $240$ alumnos de un instituto, $\\frac{3}{8}$ van en autobús, $\\frac{1}{6}$ en bicicleta y el resto andando. ¿Cuántos van andando? ¿Qué fracción representan?",
    f"Autobús: ${int(R(3,8)*240)}$. Bicicleta: ${int(R(1,6)*240)}$. Andando: $240-{int(R(3,8)*240)}-{int(R(1,6)*240)}={240-int(R(3,8)*240)-int(R(1,6)*240)}$ alumnos, que son $\\frac{{{240-int(R(3,8)*240)-int(R(1,6)*240)}}}{{240}}={L(R(240-int(R(3,8)*240)-int(R(1,6)*240),240))}$.",
    [f"={240-int(R(3,8)*240)-int(R(1,6)*240)}$ alumnos", f"={L(R(240-int(R(3,8)*240)-int(R(1,6)*240),240))}$"])

T.p("Una cuerda mide $\\frac{15}{2}$ m. Se corta en trozos de $\\frac{3}{4}$ m. ¿Cuántos trozos salen? ¿Sobra algo?",
    f"$\\frac{{15}}{{2}}:\\frac{{3}}{{4}}=\\frac{{15}}{{2}}\\cdot\\frac{{4}}{{3}}={L(R(15,2)/R(3,4))}$ trozos exactos, sin sobrante.",
    [f"={L(R(15,2)/R(3,4))}$ trozos"])

T.p("Dos farolas se encienden a la vez. Una parpadea cada $12$ segundos y otra cada $18$. ¿Cuándo coinciden por primera vez después? ¿Cuántas veces coinciden en $5$ minutos (sin contar el inicio)?",
    f"m.c.m.$(12,18)=36$ s. En $300$ s coinciden $\\left\\lfloor\\frac{{300}}{{36}}\\right\\rfloor={300//36}$ veces (a los $36,\\ 72,\\dots,{36*(300//36)}$ s).",
    ["m.c.m.$(12,18)=36$ s", f"={300//36}$ veces"])

T.p("Tengo $48$ caramelos de fresa y $72$ de limón. Quiero hacer bolsas iguales, sin que sobre ninguno y con el mayor número de bolsas. ¿Cuántas bolsas hago y qué lleva cada una?",
    f"m.c.d.$(48,72)={gcd(48,72)}$ bolsas. Cada una lleva ${48//gcd(48,72)}$ de fresa y ${72//gcd(48,72)}$ de limón.",
    [f"m.c.d.$(48,72)={gcd(48,72)}$ bolsas", f"${48//gcd(48,72)}$ de fresa y ${72//gcd(48,72)}$ de limón"])

T.p("Una receta usa $\\frac{3}{4}$ de litro de leche para $6$ personas. ¿Cuánta leche hace falta para $10$ personas? ¿Y para $4$?",
    f"Por persona: $\\frac{{3}}{{4}}:6={L(R(3,4)/6)}$ L. Para $10$: ${L(R(3,4)/6*10)}$ L. Para $4$: ${L(R(3,4)/6*4)}$ L.",
    [f"{L(R(3,4)/6*10)}$ L", f"{L(R(3,4)/6*4)}$ L"])

T.p("Pedro lee $\\frac{2}{5}$ de un libro el sábado y $\\frac{1}{3}$ del resto el domingo. ¿Qué fracción del libro ha leído en total? ¿Qué fracción le falta?",
    f"Sábado: $\\frac{{2}}{{5}}$; resto: $\\frac{{3}}{{5}}$. Domingo: $\\frac{{1}}{{3}}\\cdot\\frac{{3}}{{5}}=\\frac{{1}}{{5}}$. Total: $\\frac{{2}}{{5}}+\\frac{{1}}{{5}}={L(R(3,5))}$. Falta ${L(R(2,5))}$.",
    [f"={L(R(3,5))}$", f"Falta ${L(R(2,5))}$"])

T.p("Ana gasta $\\frac{1}{3}$ de su paga en cine y $\\frac{1}{4}$ en comida. Aún le quedan $15$ €. ¿Cuánto tenía?",
    f"Gasta $\\frac{{1}}{{3}}+\\frac{{1}}{{4}}=\\frac{{7}}{{12}}$, le queda $\\frac{{5}}{{12}}$. Si $\\frac{{5}}{{12}}$ es $15$ €, la paga es $15:\\frac{{5}}{{12}}={int(15/R(5,12))}$ €.",
    [f"={int(15/R(5,12))}$ €"])

T.p("Una piscina se llena con un grifo en $6$ horas y con otro en $4$ horas. ¿Qué fracción llena cada uno en una hora? ¿Cuánto tardan abriendo los dos a la vez?",
    f"En una hora: $\\frac{{1}}{{6}}$ y $\\frac{{1}}{{4}}$. Juntos: $\\frac{{1}}{{6}}+\\frac{{1}}{{4}}={L(R(1,6)+R(1,4))}$ por hora. Tardan $1:{L(R(1,6)+R(1,4))}={L(1/(R(1,6)+R(1,4)))}$ h $=2$ h $24$ min.",
    [f"={L(R(1,6)+R(1,4))}$ por hora", f"={L(1/(R(1,6)+R(1,4)))}$ h"])

T.p("Halla el número que cumple: sus $\\frac{3}{5}$ más $14$ es igual al número menos $\\frac{1}{10}$ de él.",
    f"$\\frac{{3}}{{5}}x+14=x-\\frac{{x}}{{10}}\\Rightarrow14=x\\left(\\frac{{9}}{{10}}-\\frac{{6}}{{10}}\\right)=\\frac{{3x}}{{10}}\\Rightarrow x={L(R(140,3))}$.",
    [f"x={L(R(140,3))}$"])

# ---- competenciales ----
T.c("**Hojas de papel.** Los formatos de papel A se obtienen doblando por la mitad: un A3 tiene el doble de superficie que un A4, y un A4 el doble que un A5. Un A0 mide $1$ m² de superficie. a) ¿Qué fracción de m² mide un A4? b) Una resma tiene $500$ hojas A4; ¿cuántos m² de papel hay? c) ¿Cuántas hojas A5 se obtienen de un A0?",
    f"a) De A0 a A4 se dobla $4$ veces: $\\frac{{1}}{{2^4}}={L(R(1,16))}$ m². b) $500\\cdot\\frac{{1}}{{16}}={L(R(500,16))}$ m² $={D(500/16,2)}$ m². c) A5 es $\\frac{{1}}{{32}}$ de A0: $32$ hojas.",
    [f"={L(R(1,16))}$ m²", f"={L(R(500,16))}$ m²", "$32$ hojas"])

T.c("**El menú del comedor.** En el comedor, $\\frac{2}{5}$ de los $150$ alumnos eligen pasta, $\\frac{1}{3}$ eligen pescado y el resto, carne. a) ¿Cuántos eligen cada plato? b) El pescado cuesta $3{,}20$ € por ración, la pasta $2{,}50$ € y la carne $3{,}80$ €. ¿Cuánto cuesta el comedor un día? c) ¿Qué fracción de alumnos come carne?",
    f"a) Pasta ${int(R(2,5)*150)}$; pescado ${int(R(1,3)*150)}$; carne ${150-int(R(2,5)*150)-int(R(1,3)*150)}$. b) ${int(R(2,5)*150)}\\cdot2{{,}}50+{int(R(1,3)*150)}\\cdot3{{,}}20+{150-int(R(2,5)*150)-int(R(1,3)*150)}\\cdot3{{,}}80={D(int(R(2,5)*150)*2.5+int(R(1,3)*150)*3.2+(150-int(R(2,5)*150)-int(R(1,3)*150))*3.8,2,False)}$ €. c) $\\frac{{{150-int(R(2,5)*150)-int(R(1,3)*150)}}}{{150}}={L(R(150-int(R(2,5)*150)-int(R(1,3)*150),150))}$.",
    [f"carne ${150-int(R(2,5)*150)-int(R(1,3)*150)}$", f"={D(int(R(2,5)*150)*2.5+int(R(1,3)*150)*3.2+(150-int(R(2,5)*150)-int(R(1,3)*150))*3.8,2,False)}$ €", f"={L(R(150-int(R(2,5)*150)-int(R(1,3)*150),150))}$"])

T.c("**Autobuses.** Un autobús urbano sale de la cabecera cada $15$ minutos y otro, interurbano, cada $40$. Salen juntos a las $8{:}00$. a) ¿A qué hora vuelven a salir juntos? b) ¿Cuántas veces coinciden entre las $8{:}00$ y las $20{:}00$ (incluidas ambas horas)? c) ¿Cuántos viajes hace cada uno en ese tiempo, contando la salida de las $8{:}00$?",
    f"a) m.c.m.$(15,40)=120$ min: a las $10{{:}}00$. b) Cada $120$ min durante $720$ min: ${720//120+1}$ veces. c) El urbano: $720:15+1={720//15+1}$ viajes; el interurbano: $720:40+1={720//40+1}$ viajes.",
    ["m.c.m.$(15,40)=120$ min", f"{720//120+1}$ veces", f"={720//15+1}$ viajes", f"={720//40+1}$ viajes"])

T.c("**Escalas de música.** En una partitura, una redonda dura $1$ tiempo completo (4 pulsos), la blanca $\\frac{1}{2}$, la negra $\\frac{1}{4}$ y la corchea $\\frac{1}{8}$ (como fracción de la redonda). Un compás de $\\frac{3}{4}$ debe sumar $\\frac{3}{4}$. a) ¿Cuadra un compás con una blanca, una negra y dos corcheas? b) ¿Qué falta en un compás con una blanca y una corchea? c) Escribe otro compás con tres figuras distintas.",
    f"a) $\\frac{{1}}{{2}}+\\frac{{1}}{{4}}+2\\cdot\\frac{{1}}{{8}}={L(R(1,2)+R(1,4)+R(1,4))}$: no cuadra, es un compás completo de $4/4$. b) $\\frac{{1}}{{2}}+\\frac{{1}}{{8}}={L(R(5,8))}$; faltan $\\frac{{3}}{{4}}-\\frac{{5}}{{8}}={L(R(3,4)-R(5,8))}$, es decir, una corchea. c) Por ejemplo, blanca ($\\frac{{1}}{{2}}$) + corchea ($\\frac{{1}}{{8}}$) + corchea ($\\frac{{1}}{{8}}$) $=\\frac{{3}}{{4}}$ (respuesta abierta).",
    [f"={L(R(1,2)+R(1,4)+R(1,4))}$", f"={L(R(5,8))}$", f"={L(R(3,4)-R(5,8))}$"])

# comprobaciones independientes de los datos escritos a mano
from sympy import symbols, solve, Eq, factorint as _f
_x = symbols('x')
T.chk(solve(Eq(R(3, 5)*_x + 14, _x - _x/10), _x) == [R(140, 3)], "ex 20")
T.chk(R(1, 4) + R(2, 5) == R(13, 20) and 1 - R(13, 20) == R(7, 20) and R(7, 20)*2000 == 700, "ex 11")
T.chk(R(15, 2)/R(3, 4) == 10 and R(3, 4)/6*10 == R(5, 4) and R(3, 4)/6*4 == R(1, 2), "ex 13, 16")
T.chk(R(2, 5) + R(1, 3)*R(3, 5) == R(3, 5) and 15/(1 - R(1, 3) - R(1, 4)) == 36, "ex 17, 18")
T.chk(sorted([R(7, 12), R(9, 16), R(5, 8)]) == [R(9, 16), R(7, 12), R(5, 8)] and R(7, 12)*48 == 28 and R(9, 16)*48 == 27 and R(5, 8)*48 == 30, "ex 3")
T.chk(R('0.125') == R(1, 8) and R(7, 8) == R('0.875') and R(5, 6) == R(5, 6) and R(4, 11) * 99 == 36, "ex 6-8")
T.chk(R(1, 2) - (R(-2, 5) + R(3, 10))*R(5, 3) == R(2, 3), "ex 5")
T.chk(R(216 - 21, 90) == R(13, 6) and R(2*99 + 36 - 2, 99) == R(2*99 + 34, 99), "ex 7")
T.chk(R(5, 3) > 1 and R(5, 3) < 2 and R(-3, 4) > -1 and R(4, 3) == R('1.3333333333').limit_denominator(3), "ex 10")
T.cerrar()
