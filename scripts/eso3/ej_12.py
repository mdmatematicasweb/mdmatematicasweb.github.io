#!/usr/bin/env python3
"""Relación de ejercicios del tema 12 (Funciones lineales y cuadráticas)."""
from sympy import symbols, solve, Eq, Rational as R, diff, expand, Matrix
from _ej import Tema, L, D

T = Tema(12, "12-funciones-lineales-cuadraticas", "Funciones lineales y cuadráticas")
x, t = symbols('x t')

# ---- básicos ----
T.b("Indica la pendiente y la ordenada en el origen de: a) $y=3x-2$ b) $y=-\\frac{1}{2}x+4$ c) $y=5$ d) $2x+y=6$. ¿Cuáles son crecientes?",
    "a) $m=3$, $n=-2$ (creciente). b) $m=-\\frac{1}{2}$, $n=4$ (decreciente). c) $m=0$, $n=5$ (constante). d) $y=-2x+6$: $m=-2$, $n=6$ (decreciente). Solo es creciente la a).",
    ["m=3$, $n=-2$", "m=-\\frac{1}{2}$, $n=4$", "m=-2$, $n=6$"])

T.b("Halla la ecuación de la recta que pasa por $A(1,2)$ y $B(4,11)$ y calcula dónde corta a los ejes.",
    "$m=\\frac{11-2}{4-1}=3$. $y-2=3(x-1)\\Rightarrow y=3x-1$. Con $OY$: $(0,-1)$. Con $OX$: $3x-1=0\\Rightarrow x=\\frac{1}{3}$.",
    ["y=3x-1", "(0,-1)", "x=\\frac{1}{3}"])

T.b("Halla la recta de pendiente $-2$ que pasa por $(3,5)$ y la recta paralela a ella que pasa por el origen.",
    "$y-5=-2(x-3)\\Rightarrow y=-2x+11$. Paralela: misma pendiente, $y=-2x$.",
    ["y=-2x+11", "y=-2x$"])

T.b("¿Se cortan las rectas $y=2x+1$ e $y=-x+7$? Halla el punto.",
    "Distinta pendiente: se cortan. $2x+1=-x+7\\Rightarrow3x=6\\Rightarrow x=2$, $y=5$. Punto $(2,5)$.",
    ["(2,5)"])

T.b("Para $y=x^2-6x+5$ calcula el vértice, los cortes con los ejes y el eje de simetría.",
    "$x_v=\\frac{6}{2}=3$, $y_v=9-18+5=-4$: $V(3,-4)$. Cortes con $OX$: $x^2-6x+5=0\\Rightarrow x=1,\\ 5$. Con $OY$: $(0,5)$. Eje: $x=3$.",
    ["V(3,-4)", "x=1,\\ 5", "(0,5)", "x=3$"])

T.b("Indica si estas parábolas tienen máximo o mínimo y en qué punto: a) $y=-x^2+4x$ b) $y=2x^2+4x+5$.",
    "a) $a<0$: máximo. $x_v=2$, $y_v=4$: $(2,4)$. b) $a>0$: mínimo. $x_v=-1$, $y_v=2-4+5=3$: $(-1,3)$.",
    ["(2,4)", "(-1,3)"])

T.b("Haz una tabla de valores y esboza $y=-x^2+2x+3$ con $x=-2,-1,0,1,2,3,4$.",
    "$y=-5,\\ 0,\\ 3,\\ 4,\\ 3,\\ 0,\\ -5$. Vértice $(1,4)$ (máximo). Cortes con $OX$: $-1$ y $3$.",
    ["$y=-5,\\ 0,\\ 3,\\ 4,\\ 3,\\ 0,\\ -5$", "(1,4)"])

T.b("¿Qué recta pasa por los puntos $(0,-3)$ y $(2,1)$? Haz una tabla con tres puntos más.",
    "$m=\\frac{1+3}{2}=2$, $n=-3$: $y=2x-3$. Tabla: $x=1\\to-1$; $x=3\\to3$; $x=-1\\to-5$.",
    ["y=2x-3"])

T.b("Decide si la tabla es lineal o cuadrática: a) $x=0,1,2,3$; $y=1,4,7,10$ b) $x=0,1,2,3$; $y=1,2,5,10$.",
    "a) Diferencias: $3,3,3$. **Lineal**, $y=3x+1$. b) Primeras diferencias $1,3,5$ y segundas $2,2$. **Cuadrática**, $y=x^2+1$.",
    ["**Lineal**, $y=3x+1$", "**Cuadrática**, $y=x^2+1$"])

T.b("Resuelve gráficamente (con la tabla): ¿en qué puntos corta $y=x^2-4$ a la recta $y=x-2$?",
    "$x^2-4=x-2\\Rightarrow x^2-x-2=0\\Rightarrow x=2$ o $x=-1$. Puntos $(2,0)$ y $(-1,-3)$.",
    ["(2,0)", "(-1,-3)"])

# ---- problemas ----
T.p("Una tarifa de agua cobra $5$ € fijos más $1{,}2$ € por m³. Escribe la función, calcula la factura de $18$ m³ y cuántos m³ se consumieron si se pagaron $26{,}6$ €.",
    f"$C(x)=5+1{{,}}2x$. $C(18)=5+21{{,}}6={D(5+21.6,1,False)}$ €. $5+1{{,}}2x=26{{,}}6\\Rightarrow x=18$ m³.",
    [f"C(18)=5+21{{,}}6={D(5+21.6,1,False)}$ €", "x=18$ m³"])

T.p("Un coche circula a velocidad constante. A los $2$ h ha recorrido $150$ km y a las $5$ h, $375$ km. Halla la fórmula $e(t)$, la velocidad y dónde estaba al empezar.",
    "$m=\\frac{375-150}{5-2}=75$ km/h. $e=75t+n$: $150=150+n\\Rightarrow n=0$. $e(t)=75t$ y empezó en el origen.",
    ["e(t)=75t", "75$ km/h"])

T.p("Un fabricante vende un producto a $12$ € la unidad y tiene unos costes fijos de $900$ € y variables de $7$ € por unidad. Escribe las funciones de ingresos, costes y beneficio y halla el punto de equilibrio.",
    "$I=12x$, $C=900+7x$, $B=5x-900$. Equilibrio: $12x=900+7x\\Rightarrow x=180$ unidades.",
    ["B=5x-900", "x=180$ unidades"])

T.p("La altura (m) de una pelota lanzada es $h(t)=-5t^2+20t+1$. Calcula la altura máxima, cuándo la alcanza y cuándo cae al suelo (aproxima).",
    f"$t_v=2$ s y $h(2)=-20+40+1=21$ m. Suelo: $-5t^2+20t+1=0\\Rightarrow t=\\frac{{-20\\pm\\sqrt{{420}}}}{{-10}}$, la positiva es $t\\approx{D((20+420**0.5)/10,2,False)}$ s.",
    ["h(2)=-20+40+1=21$ m", f"t\\approx{D((20+420**0.5)/10,2,False)}$ s"])

T.p("Se dispone de $60$ m de valla para un corral rectangular. Si un lado mide $x$, expresa el área $A(x)$, halla $x$ para que sea máxima y calcula esa área.",
    "Otro lado: $30-x$. $A(x)=x(30-x)=-x^2+30x$. Vértice: $x=15$ y $A=225$ m². Es un cuadrado de $15$ m.",
    ["A(x)=x(30-x)=-x^2+30x", "A=225$ m²"])

T.p("Halla la parábola $y=x^2+bx+c$ que pasa por $(0,3)$ y por $(1,0)$ y calcula su vértice.",
    "$c=3$. $1+b+3=0\\Rightarrow b=-4$. $y=x^2-4x+3$. Vértice: $x=2$, $y=-1$: $(2,-1)$.",
    ["y=x^2-4x+3", "(2,-1)"])

T.p("Un cine tiene $400$ espectadores si cobra $6$ €. Por cada euro que sube el precio, pierde $40$ espectadores. Expresa los ingresos $I(x)$ si sube $x$ euros, y halla el precio que maximiza los ingresos.",
    "$I(x)=(6+x)(400-40x)=-40x^2+160x+2400$. Vértice: $x=2$, $I=8\\cdot320=2560$ €. El precio óptimo es $8$ €.",
    ["I(x)=(6+x)(400-40x)=-40x^2+160x+2400", "El precio óptimo es $8$ €"])

T.p("Dos tarifas de móvil: A, $15$ € más $0{,}03$ €/min; B, $0{,}08$ €/min sin cuota. ¿Para qué minutos conviene cada una? Dibuja mentalmente las dos rectas.",
    "$15+0{,}03x=0{,}08x\\Rightarrow x=300$ min. Menos de $300$ min conviene B; más de $300$ min conviene A.",
    ["x=300$ min"])

T.p("La recta que une $(−1,4)$ y $(3,−4)$, ¿pasa por el punto $(1,0)$? Calcula su ecuación.",
    "$m=\\frac{-4-4}{3-(-1)}=-2$. $y-4=-2(x+1)\\Rightarrow y=-2x+2$. Para $x=1$: $y=0$. Sí pasa.",
    ["y=-2x+2"])

T.p("Una piedra se deja caer y su distancia recorrida es $d(t)=5t^2$ metros. ¿Qué distancia recorre en $1,\\ 2$ y $3$ s? ¿Cuántos segundos tarda en caer $80$ m? Observa si es proporcional al tiempo.",
    "$d(1)=5$, $d(2)=20$, $d(3)=45$ m. $5t^2=80\\Rightarrow t=4$ s. No es proporcional: al duplicar el tiempo (de $1$ a $2$), la distancia se multiplica por $4$.",
    ["d(1)=5$, $d(2)=20$, $d(3)=45$", "t=4$ s"])

# ---- competenciales ----
T.c("**Contratar internet.** Una compañía ofrece: plan A, $30$ € al mes con instalación gratis; plan B, $24$ € al mes más $60$ € de instalación (pago único). a) Escribe el coste acumulado de cada plan tras $m$ meses. b) ¿En qué mes iguala B a A? c) ¿Cuánto ahorras con B en 2 años?",
    "a) $A(m)=30m$; $B(m)=60+24m$. b) $30m=60+24m\\Rightarrow m=10$ meses. c) A los $24$ meses: A $=720$ € y B $=636$ €. Ahorras $84$ €.",
    ["m=10$ meses", "Ahorras $84$ €"])

T.c("**El puente colgante.** El cable de un puente describe la parábola $y=0{,}01x^2-0{,}6x+10$ (en metros, con $x$ medido desde el extremo izquierdo). a) ¿A qué altura está el cable en el extremo ($x=0$)? b) ¿Dónde está su punto más bajo y a qué altura? c) ¿A qué altura está en $x=60$?",
    f"a) $10$ m. b) $x_v=\\frac{{0{{,}}6}}{{0{{,}}02}}=30$ m y $y=0{{,}}01\\cdot900-18+10=1$ m. c) $y=36-36+10=10$ m: simétrico al extremo.",
    ["x_v=\\frac{0{,}6}{0{,}02}=30$ m", "y=36-36+10=10$ m"])

T.c("**La parabólica de la azotea.** Una antena parabólica tiene sección $y=\\frac{x^2}{16}$ (metros). a) Completa la tabla para $x=-4,-2,0,2,4$. b) ¿Qué profundidad tiene la antena si su diámetro es $8$ m? c) ¿Dónde cambia el signo de la pendiente?",
    "a) $y=1,\\ 0{,}25,\\ 0,\\ 0{,}25,\\ 1$. b) Para $x=\\pm4$: $y=1$ m de profundidad. c) En $x=0$, el vértice: a la izquierda decrece y a la derecha crece.",
    ["$y=1,\\ 0{,}25,\\ 0,\\ 0{,}25,\\ 1$", "$y=1$ m"])

T.c("**Un negocio de zumos.** Una tienda vende $x$ zumos al día a un precio de $(5-0{,}02x)$ € cada uno. a) Expresa los ingresos $I(x)$. b) ¿Cuántos zumos conviene vender para maximizar los ingresos y cuáles son? c) ¿Cuántos zumos hacen que los ingresos sean cero?",
    "a) $I(x)=x(5-0{,}02x)=5x-0{,}02x^2$. b) Vértice: $x=\\frac{-5}{-0{,}04}=125$ zumos, $I=312{,}5$ €. c) $5x-0{,}02x^2=0\\Rightarrow x=0$ o $x=250$.",
    ["I(x)=x(5-0{,}02x)=5x-0{,}02x^2", "=125$ zumos, $I=312{,}5$ €", "x=250$"])

# comprobaciones independientes
T.chk(R(11 - 2, 4 - 1) == 3 and solve(3*x - 1, x) == [R(1, 3)] and expand(2 + 3*(x - 1)) == 3*x - 1, "ex 2")
T.chk(expand(5 - 2*(x - 3)) == -2*x + 11, "ex 3")
T.chk(solve(Eq(2*x + 1, -x + 7), x) == [2], "ex 4")
p5 = x**2 - 6*x + 5
T.chk(p5.subs(x, 3) == -4 and sorted(solve(p5, x)) == [1, 5], "ex 5")
T.chk(solve(diff(-x**2 + 4*x, x), x) == [2] and (-x**2 + 4*x).subs(x, 2) == 4 and solve(diff(2*x**2 + 4*x + 5, x), x) == [-1] and (2*x**2 + 4*x + 5).subs(x, -1) == 3, "ex 6")
T.chk([(-x**2 + 2*x + 3).subs(x, v) for v in range(-2, 5)] == [-5, 0, 3, 4, 3, 0, -5], "ex 7")
T.chk([2*v - 3 for v in (0, 1, 2, 3, -1)] == [-3, -1, 1, 3, -5] and R(1 + 3, 2) == 2, "ex 8")
T.chk([3*v + 1 for v in range(4)] == [1, 4, 7, 10] and [v**2 + 1 for v in range(4)] == [1, 2, 5, 10], "ex 9")
T.chk(sorted(solve(x**2 - 4 - (x - 2), x)) == [-1, 2], "ex 10")
T.chk(abs(5 + 1.2*18 - 26.6) < 1e-9 and solve(Eq(5 + R(12, 10)*x, R(266, 10)), x) == [18], "ex 11")
T.chk(R(375 - 150, 5 - 2) == 75 and 75*2 == 150, "ex 12")
T.chk(solve(Eq(12*x, 900 + 7*x), x) == [180], "ex 13")
T.chk(solve(diff(-5*t**2 + 20*t + 1, t), t) == [2] and (-5*t**2 + 20*t + 1).subs(t, 2) == 21 and abs(max(solve(-5*t**2 + 20*t + 1, t), key=lambda v: float(v)).evalf() - 4.05) < 0.01, "ex 14")
T.chk(solve(diff(x*(30 - x), x), x) == [15] and (x*(30 - x)).subs(x, 15) == 225, "ex 15")
T.chk(1 + (-4) + 3 == 0, "ex 16")
T.chk(expand((6 + x)*(400 - 40*x)) == -40*x**2 + 160*x + 2400 and solve(diff((6 + x)*(400 - 40*x), x), x) == [2] and ((6 + x)*(400 - 40*x)).subs(x, 2) == 2560, "ex 17")
T.chk(solve(Eq(15 + R(3, 100)*x, R(8, 100)*x), x) == [300], "ex 18")
T.chk(R(-4 - 4, 3 + 1) == -2 and expand(4 - 2*(x + 1)) == -2*x + 2 and (-2*1 + 2) == 0, "ex 19")
T.chk([5*v**2 for v in (1, 2, 3)] == [5, 20, 45] and solve(5*t**2 - 80, t) == [-4, 4], "ex 20")
T.chk(solve(Eq(30*x, 60 + 24*x), x) == [10] and 30*24 == 720 and 60 + 24*24 == 636 and 720 - 636 == 84, "ex 21")
y = R(1, 100)*x**2 - R(6, 10)*x + 10
T.chk(solve(diff(y, x), x) == [30] and y.subs(x, 30) == 1 and y.subs(x, 0) == 10 and y.subs(x, 60) == 10, "ex 22")
T.chk([R(v**2, 16) for v in (-4, -2, 0, 2, 4)] == [1, R(1, 4), 0, R(1, 4), 1], "ex 23")
T.chk(solve(diff(x*(5 - R(2, 100)*x), x), x) == [125] and (x*(5 - R(2, 100)*x)).subs(x, 125) == R(625, 2) and sorted(solve(x*(5 - R(2, 100)*x), x)) == [0, 250], "ex 24")
T.cerrar()
