#!/usr/bin/env python3
"""Relación de ejercicios del tema 3 (Sucesiones y progresiones)."""
from sympy import Rational as R, symbols, solve, Eq
from _ej import Tema, L, D, miles, eur

T = Tema(3, "03-progresiones", "Sucesiones y progresiones")


def aritm(a1, d, n): return a1 + (n - 1) * d
def geom(a1, r, n): return a1 * r**(n - 1)
def sum_ar(a1, d, n): return R((2 * a1 + (n - 1) * d) * n, 2)
def sum_ge(a1, r, n): return a1 * (r**n - 1) / (r - 1)


# ---- básicos ----
T.b("Escribe los cinco primeros términos de la sucesión de término general $a_n=3n^2-2$ y calcula $a_{10}$.",
    f"$a_1=1$, $a_2=10$, $a_3=25$, $a_4=46$, $a_5=73$. $a_{{10}}=3\\cdot100-2={3*100-2}$.",
    ["$a_1=1$, $a_2=10$, $a_3=25$, $a_4=46$, $a_5=73$", f"={3*100-2}$"])

T.b("Halla la regla de formación y los tres términos siguientes: a) $4,\\ 9,\\ 14,\\ 19,\\dots$ b) $2,\\ 6,\\ 18,\\ 54,\\dots$ c) $1,\\ 4,\\ 9,\\ 16,\\dots$",
    "a) Se suma $5$: $24,\\ 29,\\ 34$. b) Se multiplica por $3$: $162,\\ 486,\\ 1458$. c) Cuadrados perfectos $a_n=n^2$: $25,\\ 36,\\ 49$.",
    ["$24,\\ 29,\\ 34$", "$162,\\ 486,\\ 1458$", "$25,\\ 36,\\ 49$"])

a1, d = 7, 4
T.b(f"En una progresión aritmética $a_1={a1}$ y $d={d}$. Halla el término general, $a_{{20}}$ y la suma de los $20$ primeros términos.",
    f"$a_n={a1}+{d}(n-1)=4n+3$. $a_{{20}}={aritm(a1,d,20)}$. $S_{{20}}=\\frac{{({a1}+{aritm(a1,d,20)})\\cdot20}}{{2}}={sum_ar(a1,d,20)}$.",
    ["$a_n=7+4(n-1)=4n+3$", f"={aritm(a1,d,20)}$", f"={sum_ar(a1,d,20)}$"])

a3, a7 = 11, 23
d = R(a7 - a3, 4); a1 = a3 - 2 * d
T.b("En una progresión aritmética $a_3=11$ y $a_7=23$. Calcula la diferencia, $a_1$ y $a_{15}$.",
    f"$a_7-a_3=4d\\Rightarrow d=\\frac{{12}}{{4}}={d}$. $a_1=11-2\\cdot3={a1}$. $a_{{15}}={a1}+14\\cdot3={a1+14*d}$.",
    [f"d=\\frac{{12}}{{4}}={d}$", f"a_1=11-2\\cdot3={a1}$", f"={a1+14*d}$"])

a1, r = 5, 2
T.b(f"En una progresión geométrica $a_1={a1}$ y $r={r}$. Halla $a_{{8}}$ y la suma de los $8$ primeros términos.",
    f"$a_8={a1}\\cdot{r}^7={geom(a1,r,8)}$. $S_8=\\frac{{{a1}({r}^8-1)}}{{{r}-1}}={sum_ge(a1,r,8)}$.",
    [f"={geom(a1,r,8)}$", f"={sum_ge(a1,r,8)}$"])

T.b("Calcula la razón y el término general de $\\ 81,\\ 27,\\ 9,\\ 3,\\dots$ y la suma de infinitos términos.",
    f"$r=\\frac{{27}}{{81}}=\\frac{{1}}{{3}}$. $a_n=81\\left(\\frac{{1}}{{3}}\\right)^{{n-1}}$. Como $|r|<1$: $S=\\frac{{81}}{{1-\\frac{{1}}{{3}}}}={L(R(81)/(1-R(1,3)))}$.",
    ["r=\\frac{27}{81}=\\frac{1}{3}", f"={L(R(81)/(1-R(1,3)))}$"])

T.b("Indica si son progresiones aritméticas, geométricas o ninguna, y razona: a) $3,\\ 7,\\ 11,\\ 15$ b) $2,\\ 4,\\ 8,\\ 16$ c) $1,\\ 2,\\ 4,\\ 7$ d) $5,\\ 5,\\ 5,\\ 5$.",
    "a) Aritmética, $d=4$. b) Geométrica, $r=2$. c) Ninguna: diferencias $1,\\ 2,\\ 3$ y cocientes $2,\\ 2,\\ \\frac{7}{4}$. d) Aritmética con $d=0$ y también geométrica con $r=1$.",
    ["Aritmética, $d=4$", "Geométrica, $r=2$", "Ninguna", "$d=0$"])

T.b("Interpola tres términos entre $2$ y $34$ para que formen una progresión aritmética.",
    f"Hay $5$ términos: $34=2+4d\\Rightarrow d=8$. La progresión es $2,\\ 10,\\ 18,\\ 26,\\ 34$.",
    ["d=8$", "$2,\\ 10,\\ 18,\\ 26,\\ 34$"])

T.b("¿Cuántos términos de la progresión $5,\\ 8,\\ 11,\\dots$ hay que sumar para obtener $392$?",
    f"$S_n=\\frac{{(10+3(n-1))n}}{{2}}=392\\Rightarrow3n^2+7n-784=0\\Rightarrow n=\\frac{{-7\\pm97}}{{6}}$. Solo vale la positiva: $n=15$.",
    ["$n=15$"])

T.b("Calcula la suma $1+2+3+\\dots+60$ y la suma de los múltiplos de $5$ menores o iguales que $200$.",
    f"$S=\\frac{{(1+60)\\cdot60}}{{2}}={61*30}$. Múltiplos de $5$: $5,\\ 10,\\dots,200$ son $40$ términos: $\\frac{{(5+200)\\cdot40}}{{2}}={205*20}$.",
    [f"={61*30}$", f"={205*20}$"])

# ---- problemas ----
T.p("En un cine la primera fila tiene $14$ butacas y cada fila siguiente tiene $2$ más. Si hay $20$ filas, ¿cuántas butacas tiene la última? ¿Cuántas hay en total?",
    f"$a_{{20}}=14+19\\cdot2={aritm(14,2,20)}$. $S_{{20}}=\\frac{{(14+{aritm(14,2,20)})\\cdot20}}{{2}}={sum_ar(14,2,20)}$ butacas.",
    [f"={aritm(14,2,20)}$", f"={sum_ar(14,2,20)}$ butacas"])

T.p("Ahorras $5$ € la primera semana y cada semana $3$ € más que la anterior. ¿Cuánto ahorras en la semana $26$? ¿Y en un año (52 semanas)?",
    f"$a_{{26}}=5+25\\cdot3={aritm(5,3,26)}$ €. $S_{{52}}=\\frac{{(5+{aritm(5,3,52)})\\cdot52}}{{2}}={sum_ar(5,3,52)}$ €.",
    [f"={aritm(5,3,26)}$ €", f"={sum_ar(5,3,52)}$ €"])

T.p("Una pelota cae desde $2$ m y en cada rebote sube el $60\\,\\%$ de la altura anterior. ¿Qué altura alcanza tras el 5.º rebote? ¿Y qué recorrido total llevaría si siguiera rebotando infinitamente? (Suma las subidas y las bajadas.)",
    f"Alturas de rebote: $2\\cdot0{{,}}6^n$. Tras el 5.º: $2\\cdot0{{,}}6^5={D(2*0.6**5,4)}$ m. Recorrido: $2+2\\cdot\\frac{{1{{,}}2}}{{1-0{{,}}6}}=2+6=8$ m.",
    [f"={D(2*0.6**5,4)}$ m", "6=8$ m"])

T.p("Depositas $3\\,000$ € a un interés compuesto del $4\\,\\%$ anual. ¿Cuánto tendrás al cabo de $10$ años? Calcula también el interés ganado.",
    f"$C_{{10}}=3000\\cdot1{{,}}04^{{10}}\\approx{D(3000*1.04**10,2,False)}$ €. Intereses: ${D(3000*1.04**10-3000,2,False)}$ €.",
    [f"\\approx{D(3000*1.04**10,2,False)}$ €", f"{D(3000*1.04**10-3000,2,False)}$ €"])

T.p("Un virus se triplica cada día. Si hoy hay $100$ virus, ¿cuántos habrá dentro de $6$ días? ¿Y cuántos en total han existido durante esos días (sumando cada día, hoy incluido, hasta el día 6)?",
    f"Dentro de $6$ días: $100\\cdot3^6={miles(100*3**6)}$. Suma de los términos con $a_1=100$ y $r=3$, $7$ términos: $S_7=\\frac{{100(3^7-1)}}{{2}}={miles(sum_ge(100,3,7))}$.",
    [f"={miles(100*3**6)}$", f"={miles(sum_ge(100,3,7))}$"])

T.p("En una escalera de $12$ peldaños, el primero se apoya a $20$ cm del suelo y cada peldaño está $18$ cm más alto que el anterior. ¿A qué altura queda el peldaño $12$? ¿Cuál es la suma de las alturas de los $12$ peldaños?",
    "Altura del peldaño $12$: $20+11\\cdot18=218$ cm. Suma: $\\frac{(20+218)\\cdot12}{2}=1428$ cm.",
    ["218$ cm", "1428$ cm"])

T.p("Si $x-1$, $x+3$ y $2x+2$ son tres términos consecutivos de una progresión aritmética, halla $x$ y los términos.",
    f"La diferencia es la misma: $(x+3)-(x-1)=(2x+2)-(x+3)\\Rightarrow4=x-1\\Rightarrow x=5$. Los términos son $4,\\ 8,\\ 12$.",
    ["x=5$", "$4,\\ 8,\\ 12$"])

T.p("Un empleado cobra $18\\,000$ € el primer año y cada año le suben el sueldo un $3\\,\\%$. ¿Cuánto cobra en el año $10$? ¿Cuánto habrá cobrado en total en esos $10$ años?",
    f"Progresión geométrica con $r=1{{,}}03$. $a_{{10}}=18000\\cdot1{{,}}03^9\\approx{D(18000*1.03**9,2,False)}$ €. $S_{{10}}=18000\\cdot\\frac{{1{{,}}03^{{10}}-1}}{{0{{,}}03}}\\approx{D(18000*(1.03**10-1)/0.03,2,False)}$ €.",
    [f"\\approx{D(18000*1.03**9,2,False)}$ €", f"\\approx{D(18000*(1.03**10-1)/0.03,2,False)}$ €"])

T.p("El número de seguidores de un canal se duplica cada mes. Empieza con $150$. ¿En qué mes supera los $100\\,000$?",
    f"$150\\cdot2^{{n-1}}>100000\\Rightarrow2^{{n-1}}>666{{,}}7$. Como $2^9=512$ y $2^{{10}}=1024$, hace falta $n-1=10$: el mes $n=11$ tiene $150\\cdot2^{{10}}={miles(150*1024)}$ seguidores.",
    ["$n=11$", f"{miles(150*1024)}"])

T.p("Sumando los cuadrados de los primeros números, $1^2+2^2+3^2+\\dots$, ¿cuánto vale la suma de los $10$ primeros? (Pista: calcúlalo término a término.)",
    f"$1+4+9+16+25+36+49+64+81+100={sum(k*k for k in range(1,11))}$.",
    [f"={sum(k*k for k in range(1,11))}$"])

# ---- competenciales ----
T.c("**Plan de ahorro para un viaje.** Lucía quiere ahorrar para un viaje de fin de curso de $1\\,200$ €. Empieza ingresando $20$ € el primer mes y cada mes ingresa $10$ € más que el anterior. a) ¿Cuánto ingresa el mes $12$? b) ¿Cuánto ha ahorrado al acabar el año? c) ¿Cuántos meses necesita para llegar a $1\\,200$ €?",
    f"a) $a_{{12}}=20+11\\cdot10={aritm(20,10,12)}$ €. b) $S_{{12}}=\\frac{{(20+{aritm(20,10,12)})\\cdot12}}{{2}}={sum_ar(20,10,12)}$ €. c) $S_n=5n^2+15n\\ge1200\\Rightarrow n^2+3n-240\\ge0$; con $n=14$: $S_{{14}}={sum_ar(20,10,14)}$ y con $n=15$: $S_{{15}}={sum_ar(20,10,15)}$. Necesita $15$ meses (con $14$ solo llega a ${sum_ar(20,10,14)}$ €).",
    [f"={aritm(20,10,12)}$ €", f"={sum_ar(20,10,12)}$ €", "Necesita $15$ meses"])

T.c("**La hoja de papel doblada.** Cada vez que se dobla un folio por la mitad, el número de capas se duplica. a) ¿Cuántas capas hay tras $6$ dobleces? b) Cada capa mide $0{,}1$ mm. ¿Qué grosor tiene tras $10$ dobleces, en cm? c) ¿Cuántos dobleces hacen falta para superar los $2$ m de altura?",
    f"a) $2^6=64$ capas. b) $2^{{10}}\\cdot0{{,}}1=102{{,}}4$ mm $={D(102.4/10,2,False)}$ cm. c) Hay que superar $2000$ mm $\\Rightarrow2^n\\cdot0{{,}}1>2000\\Rightarrow2^n>20000$; como $2^{{14}}={miles(2**14)}$ y $2^{{15}}={miles(2**15)}$, hacen falta $15$ dobleces.",
    ["$2^6=64$ capas", f"={D(102.4/10,2,False)}$ cm", "$15$ dobleces"])

T.c("**Sueldos.** Una empresa ofrece dos contratos. Contrato A: $24\\,000$ € el primer año y $1\\,200$ € más cada año. Contrato B: $22\\,000$ € el primer año y una subida del $5\\,\\%$ anual. a) ¿Cuánto se cobra en el año $10$ con cada contrato? b) ¿Cuánto se acumula en $10$ años con cada uno? c) ¿Cuál conviene a $10$ años vista?",
    f"a) A: $24000+9\\cdot1200={aritm(24000,1200,10)}$ €. B: $22000\\cdot1{{,}}05^9\\approx{D(22000*1.05**9,0)}$ €. b) A: $S=\\frac{{(24000+{aritm(24000,1200,10)})\\cdot10}}{{2}}={sum_ar(24000,1200,10)}$ €. B: $22000\\cdot\\frac{{1{{,}}05^{{10}}-1}}{{0{{,}}05}}\\approx{D(22000*(1.05**10-1)/0.05,0)}$ €. c) Conviene {'A' if sum_ar(24000,1200,10) > 22000*(1.05**10-1)/0.05 else 'B'} en el acumulado de {10} años.",
    [f"={aritm(24000,1200,10)}$ €", f"\\approx{D(22000*1.05**9,0)}$ €", f"={sum_ar(24000,1200,10)}$ €", f"\\approx{D(22000*(1.05**10-1)/0.05,0)}$ €"])

T.c("**Una cuenta atrás.** Para una fiesta se apilan vasos en pirámide: $1$ en la cima, $2$ en la fila siguiente, $3$, etc. a) ¿Cuántos vasos hay en una pirámide de $8$ filas? b) ¿Cuántos vasos tiene la fila de abajo si se usan $120$ vasos en total? c) ¿Cuántos vasos se necesitan si se quieren $15$ filas?",
    f"a) $1+2+\\dots+8=\\frac{{9\\cdot8}}{{2}}={sum_ar(1,1,8)}$ vasos. b) $\\frac{{n(n+1)}}{{2}}=120\\Rightarrow n=15$ filas, y la de abajo tiene $15$ vasos. c) $\\frac{{16\\cdot15}}{{2}}={sum_ar(1,1,15)}$ vasos.",
    [f"={sum_ar(1,1,8)}$ vasos", "n=15$ filas", f"={sum_ar(1,1,15)}$ vasos"])

T.cerrar()
