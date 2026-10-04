#!/usr/bin/env python3
"""Relación de ejercicios del tema 7 (Sistemas de ecuaciones)."""
from sympy import symbols, solve, Eq, Rational as R, linsolve, Matrix
from _ej import Tema, L, D

T = Tema(7, "07-sistemas-ecuaciones", "Sistemas de ecuaciones")
x, y, z = symbols('x y z')


def sol(e1, e2):
    s = solve([e1, e2], [x, y], dict=True)
    return s[0] if s else None


# ---- básicos ----
s1 = sol(Eq(x + y, 11), Eq(x - y, 3))
T.b("Comprueba si $(7,4)$ es solución de $\\begin{cases}x+y=11\\\\x-y=3\\end{cases}$ y resuélvelo por reducción.",
    f"$7+4=11$ y $7-4=3$: sí. Sumando las ecuaciones: $2x=14\\Rightarrow x={s1[x]}$; entonces $y={s1[y]}$.",
    [f"x={s1[x]}$", f"y={s1[y]}$"])

s2 = sol(Eq(y, 2 * x - 1), Eq(3 * x + y, 14))
T.b("Resuelve por sustitución: $\\begin{cases}y=2x-1\\\\3x+y=14\\end{cases}$.",
    f"$3x+2x-1=14\\Rightarrow5x=15\\Rightarrow x={s2[x]}$ e $y=2\\cdot3-1={s2[y]}$.",
    [f"x={s2[x]}$", f"y=2\\cdot3-1={s2[y]}$"])

s3 = sol(Eq(x + 3 * y, 7), Eq(x - y, -1))
T.b("Resuelve por igualación: $\\begin{cases}x+3y=7\\\\x-y=-1\\end{cases}$.",
    f"Despejando $x$: $x=7-3y$ y $x=y-1$. Igualando: $7-3y=y-1\\Rightarrow8=4y\\Rightarrow y={s3[y]}$ y $x={s3[x]}$.",
    [f"y={s3[y]}$", f"x={s3[x]}$"])

s4 = sol(Eq(3 * x + 2 * y, 13), Eq(5 * x - 3 * y, 9))
T.b("Resuelve por reducción: $\\begin{cases}3x+2y=13\\\\5x-3y=9\\end{cases}$.",
    f"Multiplicando por $3$ y por $2$: $9x+6y=39$ y $10x-6y=18$. Sumando: $19x=57\\Rightarrow x={s4[x]}$. Entonces $2y=13-9$ e $y={s4[y]}$.",
    [f"x={s4[x]}$", f"y={s4[y]}$"])

s5 = sol(Eq(2 * x + 3 * y, 12), Eq(4 * x - y, 10))
T.b("Resuelve el método que prefieras: $\\begin{cases}2x+3y=12\\\\4x-y=10\\end{cases}$.",
    f"De la segunda, $y=4x-10$. En la primera: $2x+12x-30=12\\Rightarrow14x=42\\Rightarrow x={s5[x]}$ e $y={s5[y]}$.",
    [f"x={s5[x]}$", f"y={s5[y]}$"])

T.b("Sin resolver, clasifica cada sistema (una solución, infinitas o ninguna): a) $\\begin{cases}x+y=3\\\\2x+2y=6\\end{cases}$ b) $\\begin{cases}x+y=3\\\\2x+2y=7\\end{cases}$ c) $\\begin{cases}x+y=3\\\\x-y=1\\end{cases}$.",
    "a) Coinciden (la segunda es el doble de la primera): infinitas. b) Paralelas: ninguna. c) Se cortan: una.",
    ["infinitas", "ninguna", "una"])

s6 = sol(Eq(x / 2 + y / 3, 4), Eq(x - y, 3))
T.b("Resuelve con denominadores: $\\begin{cases}\\dfrac{x}{2}+\\dfrac{y}{3}=4\\\\x-y=3\\end{cases}$.",
    f"Por $6$ en la primera: $3x+2y=24$. De la segunda $x=y+3$: $3y+9+2y=24\\Rightarrow y={s6[y]}$ y $x={s6[x]}$ (se comprueba: $\\frac{{{s6[x]}}}{{2}}+\\frac{{{s6[y]}}}{{3}}=4$).",
    [f"y={s6[y]}$", f"x={s6[x]}$"])

s7 = solve([x + y - 7, x * y - 12], [x, y])
T.b("Resuelve el sistema no lineal: $\\begin{cases}x+y=7\\\\x\\cdot y=12\\end{cases}$.",
    "De la primera, $y=7-x$. Entonces $x(7-x)=12\\Rightarrow x^2-7x+12=0\\Rightarrow x=3$ o $x=4$. Soluciones: $(3,4)$ y $(4,3)$.",
    ["$(3,4)$ y $(4,3)$"])

s8 = sol(Eq(x - 2 * y, 5), Eq(2 * x + y, 5))
T.b("Representa mentalmente las rectas de $\\begin{cases}x-2y=5\\\\2x+y=5\\end{cases}$ y halla su punto de corte.",
    f"Por sustitución: $x=5+2y\\Rightarrow10+4y+y=5\\Rightarrow y={s8[y]}$, $x={s8[x]}$. Se cortan en $({s8[x]},{s8[y]})$.",
    [f"({s8[x]},{s8[y]})"])

s9 = sol(Eq(5 * x + 3 * y, 1), Eq(2 * x - y, 7))
T.b("Resuelve: $\\begin{cases}5x+3y=1\\\\2x-y=7\\end{cases}$ y comprueba la solución.",
    f"Multiplicando la segunda por $3$ y sumando: $11x=22\\Rightarrow x={s9[x]}$; $y=2x-7={s9[y]}$. Comprobación: $5\\cdot2+3\\cdot(-3)=1$ y $2\\cdot2-(-3)=7$.",
    [f"x={s9[x]}$", f"y=2x-7={s9[y]}$"])

# ---- problemas ----
T.p("La suma de dos números es $52$ y su diferencia es $14$. ¿Cuáles son?",
    "$x+y=52$ y $x-y=14$. Sumando: $2x=66\\Rightarrow x=33$ e $y=19$.",
    ["x=33$ e $y=19"])

T.p("En una granja hay vacas y gallinas: $40$ cabezas y $116$ patas. ¿Cuántas hay de cada una?",
    "$v+g=40$ y $4v+2g=116$. De la primera $g=40-v$: $4v+80-2v=116\\Rightarrow v=18$, $g=22$. Hay $18$ vacas y $22$ gallinas.",
    ["$18$ vacas y $22$ gallinas"])

T.p("Una entrada de adulto cuesta $8$ € y una infantil $5$ €. Un sábado se vendieron $120$ entradas y se recaudaron $810$ €. ¿Cuántas de cada tipo?",
    "$a+n=120$ y $8a+5n=810$. De la primera $n=120-a$: $8a+600-5a=810\\Rightarrow3a=210\\Rightarrow a=70$, $n=50$. Fueron $70$ de adulto y $50$ infantiles.",
    ["$70$ de adulto y $50$ infantiles"])

T.p("Dentro de $6$ años, la edad de Marta será el doble que la de su hermano. Hace $2$ años, era el triple. ¿Qué edades tienen hoy?",
    "$m+6=2(h+6)$ y $m-2=3(h-2)$. Desarrollando: $m-2h=6$ y $m-3h=-4$. Restando: $h=10$ y $m=26$. Hoy tienen $26$ y $10$ años.",
    ["$26$ y $10$ años"])

T.p("Mezclamos café de $6$ €/kg con café de $9$ €/kg para obtener $30$ kg de mezcla a $7{,}50$ €/kg. ¿Cuántos kilos de cada tipo hacen falta?",
    "$a+b=30$ y $6a+9b=7{,}5\\cdot30=225$. De la primera $a=30-b$: $180-6b+9b=225\\Rightarrow b=15$, $a=15$. Quince kilos de cada tipo.",
    ["b=15$, $a=15"])

T.p("Un barco recorre $60$ km río abajo en $3$ horas y los mismos $60$ km río arriba en $5$ horas. Halla la velocidad del barco en aguas tranquilas y la de la corriente.",
    "$b+c=20$ y $b-c=12$. Sumando: $2b=32\\Rightarrow b=16$ km/h y $c=4$ km/h.",
    ["b=16$ km/h y $c=4$ km/h"])

T.p("Un número de dos cifras suma $11$; si se invierten las cifras, el número aumenta en $27$. ¿Cuál es el número?",
    "Cifras $d$ (decenas) y $u$: $d+u=11$ y $10u+d=10d+u+27\\Rightarrow u-d=3$. Sumando: $2u=14\\Rightarrow u=7$, $d=4$. El número es $47$.",
    ["El número es $47$"])

T.p("Un rectángulo tiene $56$ cm de perímetro y el largo es $4$ cm más que el doble del ancho. Calcula sus dimensiones.",
    "$2l+2a=56$ y $l=2a+4$. Entonces $4a+8+2a=56\\Rightarrow6a=48\\Rightarrow a=8$ y $l=20$. Mide $8\\times20$ cm.",
    ["$8\\times20$ cm"])

T.p("Una empresa tiene dos tipos de máquinas. $3$ máquinas A y $2$ B producen $270$ piezas por hora; $2$ A y $5$ B producen $400$. ¿Cuánto produce cada tipo por hora?",
    "$3a+2b=270$ y $2a+5b=400$. Multiplicando por $5$ y por $2$: $15a+10b=1350$ y $4a+10b=800$. Restando: $11a=550\\Rightarrow a=50$ y $b=60$.",
    ["a=50$ y $b=60"])

T.p("Resuelve: dos números suman $20$ y su producto es $75$.",
    "$x(20-x)=75\\Rightarrow x^2-20x+75=0\\Rightarrow x=\\frac{20\\pm10}{2}$: $15$ y $5$.",
    ["$15$ y $5$"])

# ---- competenciales ----
T.c("**Dos planes de móvil.** El plan A cuesta $10$ € al mes fijos más $0{,}05$ € por minuto. El plan B no tiene cuota fija pero cuesta $0{,}15$ € por minuto. a) Escribe el coste de cada plan y resuelve el sistema para ver cuándo cuestan lo mismo. b) ¿Qué plan conviene si hablas $60$ minutos al mes? c) ¿Y si hablas $300$?",
    "a) $y=10+0{,}05x$ e $y=0{,}15x$. Igualando: $10=0{,}10x\\Rightarrow x=100$ min, y entonces $15$ €. b) Con $60$ min: A cuesta $13$ € y B $9$ €: conviene B. c) Con $300$ min: A cuesta $25$ € y B $45$ €: conviene A.",
    ["x=100$ min", "13$ € y B $9$ €", "25$ € y B $45$ €"])

T.c("**La excursión.** Para una excursión se alquilan autobuses de $50$ plazas y microbuses de $20$ plazas. Se necesitan $7$ vehículos y $230$ plazas exactamente. a) Plantea el sistema. b) ¿Cuántos vehículos de cada tipo? c) Si el autobús cuesta $300$ € y el microbús $150$ €, ¿cuánto cuesta el alquiler?",
    "a) $a+m=7$ y $50a+20m=230$. b) $m=7-a$: $50a+140-20a=230\\Rightarrow30a=90\\Rightarrow a=3$ y $m=4$. c) $3\\cdot300+4\\cdot150=900+600=1500$ €.",
    ["a=3$ y $m=4", "=1500$ €"])

T.c("**Receta de bizcocho.** Para el almuerzo se hornean bizcochos de limón (usan $200$ g de harina y $3$ huevos) y de chocolate (usan $150$ g de harina y $2$ huevos). Se dispone de $1{,}7$ kg de harina y $24$ huevos y se quiere gastar todo. a) Plantea el sistema. b) ¿Cuántos bizcochos de cada tipo? c) Comprueba el resultado.",
    "a) $200l+150c=1700$ y $3l+2c=24$. b) De la segunda, $c=\\frac{24-3l}{2}$: $200l+75(24-3l)=1700\\Rightarrow200l+1800-225l=1700\\Rightarrow l=4$ y $c=6$. c) Harina: $800+900=1700$ g; huevos: $12+12=24$.",
    ["l=4$ y $c=6"])

T.c("**Dos hermanos y una herencia.** Dos hermanos reciben $9\\,000$ € y deciden repartirlo de modo que el mayor reciba $1\\,500$ € más que el doble de lo que recibe el menor. a) Plantea y resuelve el sistema. b) ¿Qué porcentaje del total recibe cada uno?",
    "a) $a+m=9000$ y $a=2m+1500$. Entonces $3m=7500\\Rightarrow m=2500$ y $a=6500$. b) El menor: $\\frac{2500}{9000}\\approx27{,}8\\,\\%$; el mayor: $\\frac{6500}{9000}\\approx72{,}2\\,\\%$.",
    ["m=2500$ y $a=6500", "27{,}8\\,\\%", "72{,}2\\,\\%"])

# comprobaciones independientes de los datos escritos a mano
a, b, v, g, d, u, m, n, l, c, h = symbols('a b v g d u m n l c h')
T.chk(solve([x + y - 52, x - y - 14], [x, y]) == {x: 33, y: 19}, "ex 11")
T.chk(solve([v + g - 40, 4*v + 2*g - 116], [v, g]) == {v: 18, g: 22}, "ex 12")
T.chk(solve([a + n - 120, 8*a + 5*n - 810], [a, n]) == {a: 70, n: 50}, "ex 13")
T.chk(solve([m + 6 - 2*(h + 6), m - 2 - 3*(h - 2)], [m, h]) == {m: 26, h: 10}, "ex 14")
T.chk(solve([a + b - 30, 6*a + 9*b - 225], [a, b]) == {a: 15, b: 15}, "ex 15")
T.chk(solve([b + c - 20, b - c - 12], [b, c]) == {b: 16, c: 4} and R(60, 3) == 20 and R(60, 5) == 12, "ex 16")
T.chk(solve([d + u - 11, 10*u + d - (10*d + u) - 27], [d, u]) == {d: 4, u: 7}, "ex 17")
T.chk(solve([2*l + 2*a - 56, l - 2*a - 4], [l, a]) == {l: 20, a: 8}, "ex 18")
T.chk(solve([3*a + 2*b - 270, 2*a + 5*b - 400], [a, b]) == {a: 50, b: 60}, "ex 19")
T.chk(sorted(solve(x * (20 - x) - 75, x)) == [5, 15], "ex 20")
T.chk(solve(Eq(10 + R(5, 100)*x, R(15, 100)*x), x) == [100] and 10 + 3 == 13 and 9 == R(15, 100)*60 and 10 + 15 == 25 and 45 == R(15, 100)*300, "ex 21")
T.chk(solve([a + m - 7, 50*a + 20*m - 230], [a, m]) == {a: 3, m: 4}, "ex 22")
T.chk(solve([200*l + 150*c - 1700, 3*l + 2*c - 24], [l, c]) == {l: 4, c: 6}, "ex 23")
T.chk(solve([a + m - 9000, a - 2*m - 1500], [a, m]) == {a: 6500, m: 2500} and abs(2500/9000*100 - 27.8) < 0.05 and abs(6500/9000*100 - 72.2) < 0.05, "ex 24")
T.chk(s1 == {x: 7, y: 4} and s2 == {x: 3, y: 5} and s3 == {x: 1, y: 2} and s4 == {x: 3, y: 2} and s5 == {x: 3, y: 2}, "ex 1-5")
T.chk(s6 == {x: 6, y: 3} and sorted(s7) == [(3, 4), (4, 3)] and s8 == {x: 3, y: -1} and s9 == {x: 2, y: -3}, "ex 7-10")
T.cerrar()
