#!/usr/bin/env python3
"""Relación de ejercicios del tema 6 (Ecuaciones de primer y segundo grado)."""
from sympy import symbols, solve, Eq, Rational as R, sqrt, latex, S, simplify
from _ej import Tema, L, D

T = Tema(6, "06-ecuaciones", "Ecuaciones de primer y segundo grado")
x, y = symbols('x y')
sol1 = lambda eq: solve(eq, x)[0]

# ---- básicos ----
e1 = Eq(5 * x - 7, 2 * x + 11)
T.b("Resuelve: a) $5x-7=2x+11$ b) $3(x-4)=2(x+1)-5$ c) $\\dfrac{x}{2}+\\dfrac{x}{3}=10$.",
    f"a) $3x=18\\Rightarrow x={sol1(e1)}$. b) $3x-12=2x-3\\Rightarrow x={sol1(Eq(3*(x-4),2*(x+1)-5))}$. c) Por $6$: $3x+2x=60\\Rightarrow x={sol1(Eq(x/2+x/3,10))}$.",
    [f"x={sol1(e1)}$", f"x={sol1(Eq(3*(x-4),2*(x+1)-5))}$", f"x={sol1(Eq(x/2+x/3,10))}$"])

e2 = Eq((x + 1) / 3 - (2 * x - 1) / 4, 1)
T.b("Resuelve: $\\dfrac{x+1}{3}-\\dfrac{2x-1}{4}=1$.",
    f"Por $12$: $4(x+1)-3(2x-1)=12\\Rightarrow4x+4-6x+3=12\\Rightarrow-2x=5\\Rightarrow x={L(sol1(e2))}$.",
    [f"x={L(sol1(e2))}$"])

T.b("Resuelve y di qué tipo de solución tienen: a) $2(x+3)=2x+5$ b) $3x-6=3(x-2)$.",
    "a) $2x+6=2x+5\\Rightarrow6=5$: **sin solución**. b) $3x-6=3x-6$: se cumple siempre, **infinitas soluciones**.",
    ["sin solución", "infinitas soluciones"])

T.b("Resuelve con la fórmula: a) $x^2-7x+10=0$ b) $2x^2+3x-2=0$ c) $x^2+4x+4=0$.",
    f"a) $\\Delta=9$, $x=\\frac{{7\\pm3}}{{2}}$: $x=5$ y $x=2$. b) $\\Delta=25$, $x=\\frac{{-3\\pm5}}{{4}}$: $x={L(R(1,2))}$ y $x=-2$. c) $\\Delta=0$: solución doble $x=-2$.",
    ["\\Delta=9$, $x=\\frac{7", "x=5$ y $x=2", f"x={L(R(1,2))}$ y $x=-2", "solución doble $x=-2$"])

T.b("Sin usar la fórmula completa: a) $x^2-49=0$ b) $3x^2-12x=0$ c) $4x^2=25$.",
    f"a) $x=\\pm7$. b) $3x(x-4)=0\\Rightarrow x=0$ o $x=4$. c) $x^2=\\frac{{25}}{{4}}\\Rightarrow x=\\pm\\frac{{5}}{{2}}$.",
    ["x=\\pm7", "x=0$ o $x=4", "x=\\pm\\frac{5}{2}"])

T.b("Calcula el discriminante y di cuántas soluciones reales tiene: a) $x^2-3x+5=0$ b) $x^2-6x+9=0$ c) $2x^2-x-3=0$.",
    f"a) $\\Delta=9-20=-11<0$: ninguna. b) $\\Delta=36-36=0$: una. c) $\\Delta=1+24=25>0$: dos.",
    ["\\Delta=9-20=-11", "\\Delta=36-36=0", "\\Delta=1+24=25"])

T.b("Sin resolverlas, halla la suma y el producto de las soluciones de $x^2-9x+14=0$ y comprueba resolviendo.",
    f"Suma $=9$, producto $=14$. Resolviendo: $x=\\frac{{9\\pm5}}{{2}}$, es decir, $7$ y $2$, y $7+2=9$, $7\\cdot2=14$.",
    ["Suma $=9$, producto $=14$"])

T.b("Despeja la incógnita indicada: a) $A=\\dfrac{b\\cdot h}{2}$, despeja $h$ b) $v=\\dfrac{e}{t}$, despeja $t$ c) $P=2a+2b$, despeja $b$.",
    "a) $h=\\frac{2A}{b}$. b) $t=\\frac{e}{v}$. c) $b=\\frac{P-2a}{2}$.",
    ["h=\\frac{2A}{b}", "t=\\frac{e}{v}", "b=\\frac{P-2a}{2}"])

T.b("Comprueba si $x=-2$ es solución de $x^2+x-2=0$ y de $2x^2-3x-14=0$.",
    f"$(-2)^2+(-2)-2=0$: sí. $2\\cdot4+6-14=0$: sí. Las dos se cumplen.",
    ["$(-2)^2+(-2)-2=0$"])

T.b("Resuelve: $(x+3)^2=x^2+5x+13$.",
    f"$x^2+6x+9=x^2+5x+13\\Rightarrow x=4$.",
    ["x=4$"])

# ---- problemas ----
T.p("La suma de tres números consecutivos es $87$. ¿Cuáles son?",
    f"$x+(x+1)+(x+2)=87\\Rightarrow3x=84\\Rightarrow x=28$. Los números son $28,\\ 29,\\ 30$.",
    ["$28,\\ 29,\\ 30$"])

T.p("Una madre tiene $38$ años y su hijo $10$. ¿Dentro de cuántos años la edad de la madre será el triple que la del hijo?",
    "$38+x=3(10+x)\\Rightarrow38+x=30+3x\\Rightarrow8=2x\\Rightarrow x=4$ años. Tendrán $42$ y $14$.",
    ["x=4$ años"])

T.p("En un corral hay gallinas y conejos: $30$ cabezas y $84$ patas. ¿Cuántos animales de cada tipo hay? (Plantea con una sola incógnita.)",
    "Gallinas $x$, conejos $30-x$: $2x+4(30-x)=84\\Rightarrow120-2x=84\\Rightarrow x=18$. Hay $18$ gallinas y $12$ conejos.",
    ["$18$ gallinas y $12$ conejos"])

T.p("Un rectángulo mide $4$ cm más de largo que de ancho y su perímetro es $48$ cm. Calcula sus dimensiones y su área.",
    "Ancho $x$, largo $x+4$: $2x+2(x+4)=48\\Rightarrow4x=40\\Rightarrow x=10$. Mide $10\\times14$ cm y su área es $140$ cm².",
    ["$10\\times14$ cm", "140$ cm²"])

T.p("El producto de dos números enteros consecutivos es $156$. Hállalos.",
    f"$x(x+1)=156\\Rightarrow x^2+x-156=0$, $\\Delta=625$, $x=\\frac{{-1\\pm25}}{{2}}$: $x=12$ o $x=-13$. Los números son $12$ y $13$ (o $-13$ y $-12$).",
    ["x=12$ o $x=-13"])

T.p("Un campo rectangular tiene $300$ m² y su largo mide $5$ m más que su ancho. ¿Cuánto miden sus lados?",
    "$x(x+5)=300\\Rightarrow x^2+5x-300=0$, $\\Delta=1225$, $x=\\frac{-5\\pm35}{2}$: $x=15$ (la solución $-20$ se descarta). Mide $15\\times20$ m.",
    ["$15\\times20$ m"])

T.p("Se lanza una pelota hacia arriba y su altura en metros es $h=-5t^2+30t$. ¿En qué instantes está a $40$ m de altura? ¿Cuándo vuelve al suelo?",
    f"$-5t^2+30t=40\\Rightarrow t^2-6t+8=0\\Rightarrow t=2$ s y $t=4$ s (sube y baja). Suelo: $-5t(t-6)=0\\Rightarrow t=6$ s.",
    ["t=2$ s y $t=4$ s", "t=6$ s"])

T.p("Un grifo llena un depósito en $x$ horas y otro lo hace en $x+3$ horas. Juntos lo llenan en $2$ horas. Plantea y resuelve la ecuación $\\frac{1}{x}+\\frac{1}{x+3}=\\frac{1}{2}$.",
    "$2(x+3)+2x=x(x+3)\\Rightarrow x^2-x-6=0\\Rightarrow x=3$ (se descarta $-2$). Uno tarda $3$ h y el otro $6$ h.",
    ["x=3$ (se descarta $-2$)"])

T.p("Un tren sale a $80$ km/h; $1$ hora después sale otro, en el mismo sentido, a $100$ km/h. ¿Cuánto tarda el segundo en alcanzar al primero y a qué distancia?",
    f"El segundo viaja $t$ horas: $80(t+1)=100t\\Rightarrow80=20t\\Rightarrow t=4$ h. Distancia: $100\\cdot4=400$ km.",
    ["t=4$ h", "400$ km"])

T.p("Halla dos números cuya suma es $17$ y la suma de sus cuadrados es $149$.",
    f"$x^2+(17-x)^2=149\\Rightarrow2x^2-34x+140=0\\Rightarrow x^2-17x+70=0$, $\\Delta=9$, $x=\\frac{{17\\pm3}}{{2}}$: $10$ y $7$.",
    ["$10$ y $7$"])

# ---- competenciales ----
T.c("**El cercado del huerto.** Quieres vallar un huerto rectangular pegado a una pared (la pared hace de cuarto lado) con $40$ m de valla. a) Si el lado paralelo a la pared mide $x$, expresa el otro lado. b) Plantea el área $A(x)$ y calcula las medidas para que el área sea de $200$ m². c) ¿Es posible un área de $250$ m²?",
    f"a) Los lados perpendiculares miden $\\frac{{40-x}}{{2}}$. b) $x\\cdot\\frac{{40-x}}{{2}}=200\\Rightarrow x^2-40x+400=0\\Rightarrow(x-20)^2=0\\Rightarrow x=20$ m: el huerto mide $20\\times10$ m (es el área máxima). c) $x^2-40x+500=0$, $\\Delta=1600-2000<0$: no es posible.",
    ["x=20$ m", "\\Delta=1600-2000<0"])

T.c("**Dos tarifas.** Una academia cobra $30$ € de matrícula más $12$ € por clase. Otra cobra $18$ € por clase sin matrícula. a) Escribe y resuelve la ecuación para saber cuántas clases cuestan lo mismo. b) ¿Cuál conviene si vas a hacer $8$ clases? c) ¿Y si haces $3$?",
    "a) $30+12n=18n\\Rightarrow n=5$ clases. b) Con $8$ clases: $30+96=126$ € frente a $144$ €: conviene la primera. c) Con $3$: $66$ € frente a $54$ €: conviene la segunda.",
    ["n=5$ clases", "126$ €", "54$ €"])

T.c("**La cuesta.** Un ciclista sube un puerto a $12$ km/h y lo baja a $36$ km/h. El puerto mide $x$ km. a) Expresa el tiempo de subida y de bajada. b) Si tarda en total $1$ hora y $20$ minutos, plantea y resuelve la ecuación. c) ¿Cuál ha sido su velocidad media en el trayecto completo?",
    f"a) Subida $\\frac{{x}}{{12}}$ h; bajada $\\frac{{x}}{{36}}$ h. b) $\\frac{{x}}{{12}}+\\frac{{x}}{{36}}=\\frac{{4}}{{3}}\\Rightarrow3x+x=48\\Rightarrow x=12$ km. c) Recorre $24$ km en $\\frac{{4}}{{3}}$ h: $24:\\frac{{4}}{{3}}=18$ km/h (no es la media de $12$ y $36$).",
    ["x=12$ km", "=18$ km/h"])

T.c("**Una caja de cartón.** De un cartón cuadrado de lado $30$ cm se recortan cuadrados de lado $x$ en las esquinas y se dobla para hacer una caja sin tapa. a) Expresa el área de la base. b) ¿Qué $x$ hace que la base tenga $400$ cm²? c) ¿Cuánto vale entonces el volumen?",
    "a) Base: $(30-2x)^2$. b) $(30-2x)^2=400\\Rightarrow30-2x=20\\Rightarrow x=5$ cm (la otra raíz, $x=25$, da lado negativo y se descarta). c) $V=400\\cdot5=2000$ cm³ $=2$ litros.",
    ["x=5$ cm", "2000$ cm³"])

# comprobaciones independientes de los datos escritos a mano
T.chk(sorted(solve(x**2 - 7*x + 10, x)) == [2, 5] and sorted(solve(2*x**2 + 3*x - 2, x)) == [-2, R(1, 2)] and solve(x**2 + 4*x + 4, x) == [-2], "ex 4")
T.chk(sorted(solve(x**2 - 9*x + 14, x)) == [2, 7], "ex 7")
T.chk(solve(Eq((x + 3)**2, x**2 + 5*x + 13), x) == [4], "ex 10")
T.chk(solve(3*x + 3, x) == [-1] and solve(Eq(x + (x + 1) + (x + 2), 87), x) == [28], "ex 11")
T.chk(solve(Eq(38 + x, 3 * (10 + x)), x) == [4], "ex 12")
T.chk(solve(Eq(2 * x + 4 * (30 - x), 84), x) == [18], "ex 13")
T.chk(solve(Eq(2 * x + 2 * (x + 4), 48), x) == [10] and 10 * 14 == 140, "ex 14")
T.chk(sorted(solve(x * (x + 1) - 156, x)) == [-13, 12], "ex 15")
T.chk(sorted(solve(x * (x + 5) - 300, x)) == [-20, 15], "ex 16")
T.chk(sorted(solve(-5 * x**2 + 30 * x - 40, x)) == [2, 4] and sorted(solve(-5 * x**2 + 30 * x, x)) == [0, 6], "ex 17")
T.chk(sorted(solve(Eq(2 * (x + 3) + 2 * x, x * (x + 3)), x)) == [-2, 3], "ex 18")
T.chk(solve(Eq(80 * (x + 1), 100 * x), x) == [4], "ex 19")
T.chk(sorted(solve([x + y - 17, x**2 + y**2 - 149], [x, y])) == [(7, 10), (10, 7)], "ex 20")
T.chk(solve(Eq(x * (40 - x) / 2, 200), x) == [20] and (1600 - 2000) < 0, "ex 21")
T.chk(solve(Eq(30 + 12 * x, 18 * x), x) == [5] and 30 + 12 * 8 == 126 and 18 * 8 == 144 and 30 + 36 == 66 and 54 == 18 * 3, "ex 22")
T.chk(solve(Eq(x / 12 + x / 36, R(4, 3)), x) == [12] and R(24) / R(4, 3) == 18, "ex 23")
T.chk(sorted(solve(Eq((30 - 2 * x)**2, 400), x)) == [5, 25] and 400 * 5 == 2000, "ex 24")
T.cerrar()
