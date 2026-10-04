#!/usr/bin/env python3
"""Relación de ejercicios del tema 14 (Probabilidad)."""
from itertools import product, permutations, combinations
from fractions import Fraction as Fr
from sympy import Rational as R
from _ej import Tema, L, D

T = Tema(14, "14-probabilidad", "Probabilidad")
d2 = lambda v: D(v, 2, False)


def P(ev, E): return R(sum(1 for e in E if ev(e)), len(E))


dado = list(range(1, 7))
dos = list(product(dado, repeat=2))

# ---- básicos ----
T.b("Clasifica como determinista o aleatorio: a) lanzar una moneda b) calcular el área de un cuadrado de lado $3$ c) la lotería de Navidad d) hervir agua a nivel del mar y medir su temperatura.",
    "a) Aleatorio. b) Determinista. c) Aleatorio. d) Determinista ($100\\,^\\circ$C).",
    ["a) Aleatorio", "b) Determinista", "c) Aleatorio", "d) Determinista"])

T.b("Se lanza un dado. Describe el espacio muestral y los sucesos $A=$«par», $B=$«mayor que $4$», $A\\cup B$, $A\\cap B$ y $A^C$.",
    "$E=\\{1,2,3,4,5,6\\}$. $A=\\{2,4,6\\}$, $B=\\{5,6\\}$. $A\\cup B=\\{2,4,5,6\\}$, $A\\cap B=\\{6\\}$, $A^C=\\{1,3,5\\}$.",
    ["A\\cup B=\\{2,4,5,6\\}", "A\\cap B=\\{6\\}", "A^C=\\{1,3,5\\}"])

T.b("En una bolsa hay $5$ bolas rojas, $3$ azules y $2$ verdes. Se extrae una al azar. Calcula la probabilidad de que sea: a) roja b) azul o verde c) no roja d) amarilla.",
    f"Total $10$. a) $\\frac{{5}}{{10}}={L(R(1,2))}$. b) $\\frac{{5}}{{10}}={L(R(1,2))}$. c) $1-\\frac{{1}}{{2}}={L(R(1,2))}$. d) $0$ (suceso imposible).",
    ["a) $\\frac{5}{10}=\\frac{1}{2}$", "d) $0$"])

T.b("Se lanzan dos monedas. Escribe el espacio muestral y calcula la probabilidad de: a) dos caras b) al menos una cara c) ninguna cara.",
    "$E=\\{CC,CX,XC,XX\\}$. a) $\\frac{1}{4}$. b) $\\frac{3}{4}$. c) $\\frac{1}{4}$.",
    ["a) $\\frac{1}{4}$", "b) $\\frac{3}{4}$", "c) $\\frac{1}{4}$"])

T.b("Se lanzan dos dados. Calcula la probabilidad de que la suma sea: a) $7$ b) $2$ c) $11$ d) mayor que $9$.",
    f"Hay $36$ casos. a) $\\frac{{6}}{{36}}={L(R(1,6))}$. b) $\\frac{{1}}{{36}}$. c) $\\frac{{2}}{{36}}={L(R(1,18))}$. d) Suma $10$ (3), $11$ (2), $12$ (1): $\\frac{{6}}{{36}}={L(R(1,6))}$.",
    ["a) $\\frac{6}{36}=\\frac{1}{6}$", "b) $\\frac{1}{36}$", "c) $\\frac{2}{36}=\\frac{1}{18}$"])

T.b("En una baraja española de $40$ cartas, calcula la probabilidad de sacar: a) un rey b) una carta de oros c) el rey de oros d) un rey o una carta de oros.",
    f"a) $\\frac{{4}}{{40}}={L(R(1,10))}$. b) $\\frac{{10}}{{40}}={L(R(1,4))}$. c) $\\frac{{1}}{{40}}$. d) $\\frac{{4}}{{40}}+\\frac{{10}}{{40}}-\\frac{{1}}{{40}}=\\frac{{13}}{{40}}$.",
    ["d) $\\frac{4}{40}+\\frac{10}{40}-\\frac{1}{40}=\\frac{13}{40}$"])

T.b("Un experimento se repite $200$ veces y el suceso $A$ ocurre $54$ veces. ¿Cuál es su frecuencia relativa? ¿Qué probabilidad le asignarías? ¿Qué pasaría con más repeticiones?",
    f"$h=\\frac{{54}}{{200}}={D(54/200,2,False)}$. Se estima $P(A)\\approx0{{,}}27$. Con más repeticiones, la frecuencia relativa se estabiliza alrededor de la probabilidad real (ley de los grandes números).",
    [f"h=\\frac{{54}}{{200}}={D(54/200,2,False)}$"])

T.b("Si $P(A)=0{,}6$, $P(B)=0{,}5$ y $P(A\\cap B)=0{,}2$, calcula $P(A\\cup B)$, $P(A^C)$ y $P(B^C)$.",
    "$P(A\\cup B)=0{,}6+0{,}5-0{,}2=0{,}9$. $P(A^C)=0{,}4$. $P(B^C)=0{,}5$.",
    ["P(A\\cup B)=0{,}6+0{,}5-0{,}2=0{,}9$", "P(A^C)=0{,}4$"])

T.b("Un restaurante ofrece $4$ primeros, $5$ segundos y $3$ postres. ¿Cuántos menús distintos hay? ¿Cuántos si se puede elegir no tomar postre?",
    "$4\\cdot5\\cdot3=60$ menús. Con la opción de no tomar postre hay $4$ opciones de postre: $4\\cdot5\\cdot4=80$.",
    ["4\\cdot5\\cdot3=60$", "4\\cdot5\\cdot4=80$"])

T.b("Se lanza una moneda tres veces. Dibuja el árbol (mentalmente) y calcula: a) la probabilidad de tres caras b) exactamente dos caras c) al menos una cruz.",
    "Hay $2^3=8$ resultados equiprobables. a) $\\frac{1}{8}$. b) $\\{CCX,CXC,XCC\\}$: $\\frac{3}{8}$. c) $1-\\frac{1}{8}=\\frac{7}{8}$.",
    ["a) $\\frac{1}{8}$", "b) $\\{CCX,CXC,XCC\\}$: $\\frac{3}{8}$", "c) $1-\\frac{1}{8}=\\frac{7}{8}$"])

# ---- problemas ----
T.p("Se forma un número de dos cifras distintas con los dígitos $1,\\ 2,\\ 3,\\ 4$. ¿Cuántos números pueden formarse? ¿Cuál es la probabilidad de que sea par? ¿Y mayor que $30$?",
    "Total: $4\\cdot3=12$. Pares: terminan en $2$ o $4$: $2\\cdot3=6$; $P=\\frac{6}{12}=\\frac{1}{2}$. Mayores que $30$: empiezan en $3$ o $4$: $2\\cdot3=6$; $P=\\frac{6}{12}=\\frac{1}{2}$.",
    ["Total: $4\\cdot3=12$", "P=\\frac{6}{12}=\\frac{1}{2}$"])

T.p("En una clase de $30$ alumnos, $18$ practican fútbol, $12$ baloncesto y $5$ ambos. Se elige un alumno al azar. Calcula la probabilidad de que practique: a) fútbol o baloncesto b) ninguno de los dos c) solo fútbol.",
    f"a) $\\frac{{18}}{{30}}+\\frac{{12}}{{30}}-\\frac{{5}}{{30}}=\\frac{{25}}{{30}}={L(R(5,6))}$. b) $1-\\frac{{5}}{{6}}={L(R(1,6))}$. c) $\\frac{{18-5}}{{30}}=\\frac{{13}}{{30}}$.",
    ["a) $\\frac{18}{30}+\\frac{12}{30}-\\frac{5}{30}=\\frac{25}{30}=\\frac{5}{6}$", "b) $1-\\frac{5}{6}=\\frac{1}{6}$", "c) $\\frac{18-5}{30}=\\frac{13}{30}$"])

T.p("Una bolsa tiene $4$ bolas blancas y $6$ negras. Se extraen dos con reemplazamiento. Calcula la probabilidad de: a) dos blancas b) una de cada color c) ninguna blanca.",
    f"a) $\\frac{{4}}{{10}}\\cdot\\frac{{4}}{{10}}={L(R(4,25))}$. b) $2\\cdot\\frac{{4}}{{10}}\\cdot\\frac{{6}}{{10}}={L(R(12,25))}$. c) $\\frac{{6}}{{10}}\\cdot\\frac{{6}}{{10}}={L(R(9,25))}$. Comprobación: $\\frac{{4+12+9}}{{25}}=1$.",
    ["a) $\\frac{4}{10}\\cdot\\frac{4}{10}=\\frac{4}{25}$", "b) $2\\cdot\\frac{4}{10}\\cdot\\frac{6}{10}=\\frac{12}{25}$", "c) $\\frac{6}{10}\\cdot\\frac{6}{10}=\\frac{9}{25}$"])

T.p("La misma bolsa ($4$ blancas, $6$ negras), pero ahora las dos extracciones son sin reemplazamiento. Calcula la probabilidad de: a) dos blancas b) una de cada color.",
    f"a) $\\frac{{4}}{{10}}\\cdot\\frac{{3}}{{9}}={L(R(2,15))}$. b) $\\frac{{4}}{{10}}\\cdot\\frac{{6}}{{9}}+\\frac{{6}}{{10}}\\cdot\\frac{{4}}{{9}}=\\frac{{48}}{{90}}={L(R(8,15))}$.",
    ["a) $\\frac{4}{10}\\cdot\\frac{3}{9}=\\frac{2}{15}$", "=\\frac{48}{90}=\\frac{8}{15}$"])

T.p("En un instituto, el $60\\,\\%$ de los alumnos son chicas. Se eligen dos alumnos al azar (población grande, se supone independencia). Calcula la probabilidad de que sean: a) dos chicas b) un chico y una chica c) al menos una chica.",
    f"a) $0{{,}}6\\cdot0{{,}}6=0{{,}}36$. b) $2\\cdot0{{,}}6\\cdot0{{,}}4=0{{,}}48$. c) $1-0{{,}}4\\cdot0{{,}}4=0{{,}}84$.",
    ["a) $0{,}6\\cdot0{,}6=0{,}36$", "b) $2\\cdot0{,}6\\cdot0{,}4=0{,}48$", "c) $1-0{,}4\\cdot0{,}4=0{,}84$"])

T.p("Se lanza un dado $600$ veces. ¿Cuántas veces se espera que salga un múltiplo de $3$? ¿Y un número menor que $3$?",
    "Múltiplo de $3$: $\\frac{2}{6}\\cdot600=200$ veces. Menor que $3$ ($1$ o $2$): $\\frac{2}{6}\\cdot600=200$ veces.",
    ["\\frac{2}{6}\\cdot600=200$ veces"])

T.p("Con las cifras $1,\\ 2,\\ 3,\\ 4,\\ 5$ se forman números de tres cifras sin repetir. ¿Cuántos hay? ¿Cuál es la probabilidad de que sea múltiplo de $5$?",
    "Total: $5\\cdot4\\cdot3=60$. Terminan en $5$: $4\\cdot3=12$. $P=\\frac{12}{60}=\\frac{1}{5}$.",
    ["Total: $5\\cdot4\\cdot3=60$", "P=\\frac{12}{60}=\\frac{1}{5}$"])

T.p("En una tómbola hay $20$ boletos numerados del $1$ al $20$. Se extrae uno. Calcula la probabilidad de que sea: a) múltiplo de $4$ b) primo c) múltiplo de $4$ o primo.",
    "a) $\\{4,8,12,16,20\\}$: $\\frac{5}{20}=\\frac{1}{4}$. b) $\\{2,3,5,7,11,13,17,19\\}$: $\\frac{8}{20}=\\frac{2}{5}$. c) No hay ninguno en común: $\\frac{5+8}{20}=\\frac{13}{20}$.",
    ["a) $\\{4,8,12,16,20\\}$: $\\frac{5}{20}=\\frac{1}{4}$", "b) $\\{2,3,5,7,11,13,17,19\\}$: $\\frac{8}{20}=\\frac{2}{5}$", "c) No hay ninguno en común: $\\frac{5+8}{20}=\\frac{13}{20}$"])

T.p("Un test tiene $5$ preguntas de verdadero o falso. Si se contesta al azar, ¿cuál es la probabilidad de acertar todas? ¿Y de acertar exactamente $4$? (Cuenta los casos.)",
    "Hay $2^5=32$ respuestas posibles. Acertar todas: $\\frac{1}{32}$. Exactamente $4$: se falla una de las $5$: $5$ casos, $\\frac{5}{32}$.",
    ["\\frac{1}{32}", "\\frac{5}{32}"])

T.p("Una ruleta numerada del $0$ al $36$ se hace girar. ¿Cuál es la probabilidad de que salga: a) un número par distinto de $0$ b) un número mayor que $28$ c) el $0$ o un número impar?",
    "Total $37$. a) Pares del $2$ al $36$: $18$; $\\frac{18}{37}$. b) $29$ a $36$: $8$; $\\frac{8}{37}$. c) $1+18=19$; $\\frac{19}{37}$.",
    ["a) Pares del $2$ al $36$: $18$; $\\frac{18}{37}$", "\\frac{8}{37}", "\\frac{19}{37}"])

# ---- competenciales ----
T.c("**El seguro del móvil.** En un grupo de 400 personas, 60 han roto la pantalla del móvil alguna vez, 40 lo han mojado y 15 ambas cosas. Se elige una persona al azar. a) Calcula la probabilidad de que haya roto la pantalla o mojado el móvil. b) ¿De que no le haya pasado ninguna de las dos cosas? c) Si una aseguradora cobra $30$ € a cada persona y paga $120$ € a quien rompe o moja, ¿gana o pierde dinero en promedio?",
    f"a) $\\frac{{60+40-15}}{{400}}=\\frac{{85}}{{400}}={L(R(17,80))}$. b) $1-\\frac{{17}}{{80}}=\\frac{{63}}{{80}}$. c) Gasto medio: $120\\cdot\\frac{{17}}{{80}}={D(120*17/80,2,False)}$ €, menos de $30$ €: **gana** unos ${D(30-120*17/80,2,False)}$ € por persona.",
    ["a) $\\frac{60+40-15}{400}=\\frac{85}{400}=\\frac{17}{80}$", "b) $1-\\frac{17}{80}=\\frac{63}{80}$", "**gana**"])

T.c("**El examen tipo test.** Un examen tiene 4 preguntas con 4 opciones cada una (una correcta). Una alumna contesta todas al azar. a) ¿Cuántas formas de contestar hay? b) ¿Probabilidad de acertar las 4? c) ¿Probabilidad de no acertar ninguna? d) ¿Cuántas acertará de media?",
    f"a) $4^4=256$. b) $\\left(\\frac{{1}}{{4}}\\right)^4=\\frac{{1}}{{256}}$. c) $\\left(\\frac{{3}}{{4}}\\right)^4=\\frac{{81}}{{256}}\\approx{D(81/256,3,False)}$. d) De media $4\\cdot\\frac{{1}}{{4}}=1$ pregunta.",
    ["a) $4^4=256$", "\\frac{81}{256}\\approx0{,}316$", "d) De media $4\\cdot\\frac{1}{4}=1$ pregunta"])

T.c("**La ruleta del colegio.** Una ruleta tiene 8 sectores iguales: 3 rojos, 2 azules, 2 verdes y 1 amarillo. Se gira dos veces. a) ¿Probabilidad de rojo en la primera? b) ¿De rojo y después azul? c) ¿De que las dos tiradas sean del mismo color? d) Si se gira 160 veces, ¿cuántas veces se espera amarillo?",
    f"a) $\\frac{{3}}{{8}}$. b) $\\frac{{3}}{{8}}\\cdot\\frac{{2}}{{8}}=\\frac{{6}}{{64}}=\\frac{{3}}{{32}}$. c) $\\frac{{9+4+4+1}}{{64}}=\\frac{{18}}{{64}}=\\frac{{9}}{{32}}$. d) $\\frac{{1}}{{8}}\\cdot160=20$ veces.",
    ["a) $\\frac{3}{8}$", "b) $\\frac{3}{8}\\cdot\\frac{2}{8}=\\frac{6}{64}=\\frac{3}{32}$", "c) $\\frac{9+4+4+1}{64}=\\frac{18}{64}=\\frac{9}{32}$", "=20$ veces"])

T.c("**El horario del instituto.** El $70\\,\\%$ de los días de clase llueve poco o nada y el $30\\,\\%$ llueve bastante. Si llueve bastante, la probabilidad de llegar tarde es $0{,}4$; si no, es $0{,}1$. Calcula la probabilidad de llegar tarde un día cualquiera (diagrama en árbol: se multiplican las ramas y se suman los caminos).",
    f"Camino lluvia y tarde: $0{{,}}3\\cdot0{{,}}4=0{{,}}12$. Camino sin lluvia y tarde: $0{{,}}7\\cdot0{{,}}1=0{{,}}07$. Total: $0{{,}}12+0{{,}}07=0{{,}}19$.",
    ["0{,}3\\cdot0{,}4=0{,}12", "0{,}7\\cdot0{,}1=0{,}07", "0{,}12+0{,}07=0{,}19"])

# comprobaciones independientes
A = lambda d: d % 2 == 0; B = lambda d: d > 4
T.chk(sorted(e for e in dado if A(e) or B(e)) == [2, 4, 5, 6] and [e for e in dado if A(e) and B(e)] == [6] and [e for e in dado if not A(e)] == [1, 3, 5], "ex 2")
T.chk(P(lambda s: sum(s) == 7, dos) == R(1, 6) and P(lambda s: sum(s) == 2, dos) == R(1, 36) and P(lambda s: sum(s) == 11, dos) == R(1, 18) and P(lambda s: sum(s) > 9, dos) == R(1, 6), "ex 5")
bar = [(p, n) for p in range(4) for n in range(1, 11)]
T.chk(P(lambda c: c[1] == 10, bar) == R(1, 10) and P(lambda c: c[0] == 0, bar) == R(1, 4) and P(lambda c: c[1] == 10 or c[0] == 0, bar) == R(13, 40), "ex 6")
T.chk(abs(54/200 - 0.27) < 1e-12, "ex 7")
T.chk(abs(0.6 + 0.5 - 0.2 - 0.9) < 1e-12, "ex 8")
T.chk(4*5*3 == 60 and 4*5*4 == 80, "ex 9")
tres = list(product("CX", repeat=3))
T.chk(P(lambda t: t == ("C",)*3, tres) == R(1, 8) and P(lambda t: t.count("C") == 2, tres) == R(3, 8) and P(lambda t: "X" in t, tres) == R(7, 8), "ex 10")
nums = [a*10 + b for a, b in permutations([1, 2, 3, 4], 2)]
T.chk(len(nums) == 12 and sum(1 for n in nums if n % 2 == 0) == 6 and sum(1 for n in nums if n > 30) == 6, "ex 11")
T.chk(R(18 + 12 - 5, 30) == R(5, 6) and 1 - R(5, 6) == R(1, 6) and R(18 - 5, 30) == R(13, 30), "ex 12")
bolsa = ["b"]*4 + ["n"]*6
con = list(product(bolsa, repeat=2)); sin = list(permutations(bolsa, 2))
T.chk(P(lambda p: p == ("b", "b"), con) == R(4, 25) and P(lambda p: set(p) == {"b", "n"}, con) == R(12, 25) and P(lambda p: p == ("n", "n"), con) == R(9, 25), "ex 13")
T.chk(P(lambda p: p == ("b", "b"), sin) == R(2, 15) and P(lambda p: set(p) == {"b", "n"}, sin) == R(8, 15), "ex 14")
T.chk(abs(0.6*0.6 - 0.36) < 1e-12 and abs(2*0.6*0.4 - 0.48) < 1e-12 and abs(1 - 0.4*0.4 - 0.84) < 1e-12, "ex 15")
T.chk(R(2, 6)*600 == 200, "ex 16")
n3 = list(permutations([1, 2, 3, 4, 5], 3))
T.chk(len(n3) == 60 and sum(1 for p in n3 if p[2] == 5) == 12, "ex 17")
T.chk(len([n for n in range(1, 21) if n % 4 == 0]) == 5 and len([n for n in (2, 3, 5, 7, 11, 13, 17, 19)]) == 8 and all(n % 4 for n in (2, 3, 5, 7, 11, 13, 17, 19)), "ex 18")
T.chk(2**5 == 32 and len(list(combinations(range(5), 1))) == 5, "ex 19")
T.chk(len([n for n in range(2, 37, 2)]) == 18 and len(range(29, 37)) == 8 and 1 + 18 == 19, "ex 20")
T.chk(R(60 + 40 - 15, 400) == R(17, 80) and 120 * R(17, 80) == R(51, 2) < 30, "ex 21")
T.chk(4**4 == 256 and 3**4 == 81 and abs(81/256 - 0.316) < 5e-4, "ex 22")
T.chk(R(3, 8)*R(2, 8) == R(3, 32) and R(9 + 4 + 4 + 1, 64) == R(9, 32) and R(1, 8)*160 == 20, "ex 23")
T.chk(abs(0.3*0.4 + 0.7*0.1 - 0.19) < 1e-12, "ex 24")
T.cerrar()
