#!/usr/bin/env python3
"""Relación de ejercicios del tema 13 (Estadística)."""
from collections import Counter
from math import sqrt
from statistics import mean, median, multimode, pvariance, pstdev, quantiles
from sympy import Rational as R
from _ej import Tema, L, D

T = Tema(13, "13-estadistica", "Estadística")
d1 = lambda v: D(v, 1, False)
d2 = lambda v: D(v, 2, False)


def lst(v): return ",\\ ".join(str(a) for a in v)


# ---- básicos ----
T.b("Clasifica cada variable (cualitativa, cuantitativa discreta o continua): a) color del pelo b) número de hermanos c) estatura d) nota en un examen (0 a 10, con decimales) e) deporte favorito f) número de móviles en casa.",
    "a) Cualitativa. b) Cuantitativa discreta. c) Cuantitativa continua. d) Cuantitativa continua. e) Cualitativa. f) Cuantitativa discreta.",
    ["a) Cualitativa", "b) Cuantitativa discreta", "c) Cuantitativa continua", "f) Cuantitativa discreta"])

d = [3, 5, 4, 5, 2, 3, 5, 4, 3, 5, 4, 4, 3, 5, 2, 4, 3, 4, 5, 4]
c = Counter(d)
T.b(f"Las notas de {len(d)} alumnos son: ${lst(d)}$. Construye la tabla de frecuencias (absoluta, relativa, porcentaje y acumulada).",
    "Tabla de frecuencias:\n\n| $x_i$ | $f_i$ | $h_i$ | % | $F_i$ |\n|---|---|---|---|---|\n" + "\n".join(f"| {k} | {c[k]} | ${D(c[k]/len(d),2,False)}$ | {int(c[k]/len(d)*100)} | {sum(c[j] for j in sorted(c) if j<=k)} |" for k in sorted(c)) + f"\n\nTotal: $N={len(d)}$.",
    [f"$N={len(d)}$"])

mm = lambda v: (mean(v), median(v), multimode(v))
T.b("Calcula la media, la mediana y la moda de $4,\\ 8,\\ 6,\\ 5,\\ 3,\\ 8,\\ 9,\\ 7$.",
    f"Media $=\\frac{{4+8+6+5+3+8+9+7}}{{8}}=\\frac{{50}}{{8}}={D(50/8,3,False)}$. Ordenados: $3,4,5,6,7,8,8,9$; mediana $=\\frac{{6+7}}{{2}}={D(6.5,1,False)}$. Moda $=8$.",
    [f"={D(50/8,3,False)}$", f"={D(6.5,1,False)}$", "Moda $=8$"])

v = [2, 4, 4, 5, 7, 8, 10]
T.b("Para los datos $2,\\ 4,\\ 4,\\ 5,\\ 7,\\ 8,\\ 10$ calcula el rango, la varianza y la desviación típica.",
    f"Media $=\\frac{{40}}{{7}}\\approx{D(40/7,3,False)}$. Rango $=10-2=8$. Varianza $=\\frac{{4+16+16+25+49+64+100}}{{7}}-({D(40/7,3,False)})^2\\approx{D(pvariance(v),2,False)}$. Desviación típica $\\approx{D(pstdev(v),2,False)}$.",
    ["Rango $=10-2=8$", f"\\approx{D(pvariance(v),2,False)}$", f"\\approx{D(pstdev(v),2,False)}$"])

T.b("En un diagrama de sectores, la categoría «fútbol» tiene frecuencia relativa $0{,}35$ y «baloncesto» $0{,}2$. ¿Qué ángulo corresponde a cada una? Si la muestra es de $80$ personas, ¿cuántas hay en cada una?",
    f"Fútbol: $0{{,}}35\\cdot360=126^\\circ$ y ${int(0.35*80)}$ personas. Baloncesto: $0{{,}}2\\cdot360=72^\\circ$ y ${int(0.2*80)}$ personas.",
    ["126^\\circ$", "72^\\circ$"])

T.b("Los pesos (kg) de $10$ alumnos son: $52,\\ 47,\\ 55,\\ 60,\\ 49,\\ 53,\\ 58,\\ 51,\\ 56,\\ 54$. Calcula la media y la mediana y di cuál es más representativa.",
    f"Suma $=535$; media $={D(53.5,1,False)}$. Ordenados: $47,49,51,52,53,54,55,56,58,60$; mediana $=\\frac{{53+54}}{{2}}={D(53.5,1,False)}$. Coinciden, así que ambas son representativas (no hay valores atípicos).",
    ["Suma $=535$"])

T.b("En una empresa, 9 empleados cobran $1\\,400$ € y el jefe cobra $8\\,000$ €. Calcula la media y la mediana de los sueldos. ¿Cuál describe mejor lo típico?",
    f"Media: $\\frac{{9\\cdot1400+8000}}{{10}}={D((9*1400+8000)/10,0,False)}$ €. Mediana: $1400$ €. La mediana describe mejor lo típico, porque la media está inflada por el sueldo extremo.",
    [f"={D((9*1400+8000)/10,0,False)}$ €"])

T.b("Completa la tabla y calcula la media: $x_i=1,2,3,4,5$ con $f_i=3,5,8,6,2$.",
    f"$N=24$. $\\sum x_if_i=3+10+24+24+10=71$. Media $=\\frac{{71}}{{24}}\\approx{D(71/24,2,False)}$.",
    ["N=24$", f"\\approx{D(71/24,2,False)}$"])

T.b("Los datos ordenados de una muestra son: $2,\\ 3,\\ 5,\\ 6,\\ 7,\\ 9,\\ 10,\\ 12$. Calcula los cuartiles $Q_1$, $Q_2$ y $Q_3$ y el recorrido intercuartílico.",
    "$Q_2=\\frac{6+7}{2}=6{,}5$. $Q_1$ es la mediana de la mitad inferior $(2,3,5,6)$: $\\frac{3+5}{2}=4$. $Q_3$ es la mediana de la mitad superior $(7,9,10,12)$: $\\frac{9+10}{2}=9{,}5$. $Q_3-Q_1=5{,}5$.",
    ["\\frac{3+5}{2}=4", "=9{,}5$", "Q_3-Q_1=5{,}5"])

T.b("Dos jugadores de baloncesto meten en 6 partidos: A: $10,12,11,9,13,11$; B: $4,18,6,16,8,14$. Calcula la media y la desviación típica de cada uno y decide quién es más regular.",
    f"Ambos tienen media $11$. $\\sigma_A=\\sqrt{{{D(pvariance([10,12,11,9,13,11]),2,False)}}}\\approx{D(pstdev([10,12,11,9,13,11]),2,False)}$ y $\\sigma_B=\\sqrt{{{D(pvariance([4,18,6,16,8,14]),2,False)}}}\\approx{D(pstdev([4,18,6,16,8,14]),2,False)}$. A es más regular (menor dispersión).",
    [f"\\approx{D(pstdev([10,12,11,9,13,11]),2,False)}$", f"\\approx{D(pstdev([4,18,6,16,8,14]),2,False)}$", "A es más regular"])

# ---- problemas ----
m1 = [(150, 160, 4), (160, 170, 9), (170, 180, 5), (180, 190, 2)]
T.p("Las estaturas de 20 alumnos se agrupan: $[150,160)$: 4; $[160,170)$: 9; $[170,180)$: 5; $[180,190)$: 2. Calcula las marcas de clase, la media aproximada y el intervalo modal.",
    f"Marcas: $155,\\ 165,\\ 175,\\ 185$. Media $=\\frac{{155\\cdot4+165\\cdot9+175\\cdot5+185\\cdot2}}{{20}}=\\frac{{{155*4+165*9+175*5+185*2}}}{{20}}={D((155*4+165*9+175*5+185*2)/20,1,False)}$ cm. Intervalo modal: $[160,170)$.",
    [f"={D((155*4+165*9+175*5+185*2)/20,1,False)}$ cm", "$[160,170)$"])

T.p("Una profesora anota los minutos que tardan $10$ alumnos en llegar al instituto: $5,\\ 10,\\ 10,\\ 15,\\ 15,\\ 15,\\ 20,\\ 20,\\ 25,\\ 45$. Calcula media, mediana y moda. ¿Qué influye el dato $45$? ¿Y sin él?",
    f"Media $=\\frac{{180}}{{10}}=18$; mediana $=\\frac{{15+15}}{{2}}=15$; moda $=15$. Sin el $45$: media $=\\frac{{135}}{{9}}=15$, mediana $15$. El valor atípico sube la media pero no la mediana.",
    ["Media $=\\frac{180}{10}=18$", "media $=\\frac{135}{9}=15$"])

T.p("Un equipo de natación tiene tiempos (s): $52,\\ 55,\\ 53,\\ 51,\\ 54,\\ 52,\\ 53$. Calcula la media y la desviación típica. ¿Qué porcentaje de datos está en $\\bar{x}\\pm\\sigma$?",
    f"Media $={D(mean([52,55,53,51,54,52,53]),2,False)}$. $\\sigma\\approx{D(pstdev([52,55,53,51,54,52,53]),2,False)}$. Intervalo: $[{D(mean([52,55,53,51,54,52,53])-pstdev([52,55,53,51,54,52,53]),2,False)},\\ {D(mean([52,55,53,51,54,52,53])+pstdev([52,55,53,51,54,52,53]),2,False)}]$ contiene ${sum(1 for a in [52,55,53,51,54,52,53] if mean([52,55,53,51,54,52,53])-pstdev([52,55,53,51,54,52,53]) <= a <= mean([52,55,53,51,54,52,53])+pstdev([52,55,53,51,54,52,53]))}$ de $7$ datos.",
    ["de $7$ datos"])

T.p("La nota media de 20 alumnos es 6,2. Se incorpora un alumno que saca un 9. ¿Cuál es la nueva media? Si en lugar de eso, se va un alumno con un 4, ¿cuál es la media de los 19 restantes?",
    f"Suma inicial: $20\\cdot6{{,}}2=124$. Con el nuevo: $\\frac{{124+9}}{{21}}\\approx{D(133/21,2,False)}$. Si se va el que sacó 4: $\\frac{{124-4}}{{19}}\\approx{D(120/19,2,False)}$.",
    [f"\\approx{D(133/21,2,False)}$", f"\\approx{D(120/19,2,False)}$"])

T.p("En una encuesta sobre el medio de transporte al instituto responden 200 alumnos: autobús 90, a pie 60, bici 30, coche 20. Calcula los porcentajes y el ángulo de cada sector.",
    "Autobús: $45\\,\\%$ y $162^\\circ$. A pie: $30\\,\\%$ y $108^\\circ$. Bici: $15\\,\\%$ y $54^\\circ$. Coche: $10\\,\\%$ y $36^\\circ$. Suman $100\\,\\%$ y $360^\\circ$.",
    ["$45\\,\\%$ y $162^\\circ$", "$30\\,\\%$ y $108^\\circ$", "$15\\,\\%$ y $54^\\circ$", "$10\\,\\%$ y $36^\\circ$"])

T.p("Una muestra tiene media $50$ y desviación típica $5$; otra tiene media $200$ y desviación típica $12$. Calcula el coeficiente de variación de cada una y razona cuál es más dispersa en términos relativos.",
    f"$CV_1=\\frac{{5}}{{50}}=10\\,\\%$ y $CV_2=\\frac{{12}}{{200}}=6\\,\\%$. La primera es relativamente más dispersa, aunque su $\\sigma$ sea menor.",
    ["CV_1=\\frac{5}{50}=10\\,\\%$", "CV_2=\\frac{12}{200}=6\\,\\%$"])

T.p("Una tienda registra las ventas diarias de camisetas en una semana: $12,\\ 15,\\ 9,\\ 20,\\ 14,\\ 30,\\ 10$. Calcula la media, la mediana, el rango y los cuartiles. ¿Hay algún valor atípico?",
    f"Ordenados: $9,10,12,14,15,20,30$. Media $={D(110/7,2,False)}$. Mediana $=14$. Rango $=21$. $Q_1=10$, $Q_3=20$. Recorrido intercuartílico $10$: el $30$ está por encima de $Q_3+1{{,}}5\\cdot10=35$? No, $30<35$: no es atípico.",
    ["Mediana $=14$", "Rango $=21$", "$Q_1=10$, $Q_3=20$"])

T.p("Las edades de las 12 personas de un equipo son: $22,\\ 25,\\ 24,\\ 22,\\ 30,\\ 28,\\ 25,\\ 22,\\ 26,\\ 27,\\ 24,\\ 25$. Calcula la moda (o modas), la mediana y la media.",
    "Ordenadas: $22,22,22,24,24,25,25,25,26,27,28,30$. Modas: $22$ y $25$ (3 veces cada una). Mediana $=\\frac{25+25}{2}=25$. Media $=\\frac{300}{12}=25$.",
    ["Modas: $22$ y $25$", "Media $=\\frac{300}{12}=25$"])

T.p("Se pregunta a 50 personas por el número de libros leídos al año: $0$: 8; $1$: 12; $2$: 15; $3$: 10; $4$: 5. Calcula la media, la mediana y la desviación típica.",
    f"$\\sum x_if_i=0+12+30+30+20=92$; media $={D(92/50,2,False)}$. La mediana está en los datos $25$ y $26$, ambos $2$: mediana $=2$. $\\sum x_i^2f_i=0+12+60+90+80=242$; varianza $=\\frac{{242}}{{50}}-{D(92/50,2,False)}^2={D(242/50-(92/50)**2,4,False)}$; $\\sigma\\approx{D(sqrt(242/50-(92/50)**2),2,False)}$.",
    [f"={D(92/50,2,False)}$", "mediana $=2$", f"\\approx{D(sqrt(242/50-(92/50)**2),2,False)}$"])

T.p("Una clase tiene notas medias de 6,5 (chicas, 14 alumnas) y 5,5 (chicos, 11 alumnos). Calcula la nota media de toda la clase.",
    f"$\\frac{{14\\cdot6{{,}}5+11\\cdot5{{,}}5}}{{25}}=\\frac{{{14*6.5+11*5.5}}}{{25}}={D((14*6.5+11*5.5)/25,2,False)}$.",
    [f"={D((14*6.5+11*5.5)/25,2,False)}$"])

# ---- competenciales ----
T.c("**Elegir un portero.** Dos porteros han encajado estos goles en 8 partidos: Luis: $0,\\ 3,\\ 1,\\ 0,\\ 4,\\ 0,\\ 2,\\ 2$; Pablo: $1,\\ 2,\\ 1,\\ 2,\\ 1,\\ 2,\\ 1,\\ 2$. a) Calcula la media y la desviación típica de cada uno. b) Si el entrenador quiere el menor número medio de goles, ¿a quién elige? c) Si quiere regularidad, ¿a quién?",
    f"a) Luis: media $={D(mean([0,3,1,0,4,0,2,2]),2,False)}$, $\\sigma\\approx{D(pstdev([0,3,1,0,4,0,2,2]),2,False)}$. Pablo: media $={D(mean([1,2,1,2,1,2,1,2]),2,False)}$, $\\sigma\\approx{D(pstdev([1,2,1,2,1,2,1,2]),2,False)}$. b) Pablo: $1{{,}}5$ goles frente a $1{{,}}5$ de Luis: **empatan** en la media. c) Pablo, mucho más regular ($\\sigma$ menor).",
    ["empatan", "Pablo, mucho más regular"])

T.c("**El tiempo de reacción.** En una prueba de reflejos, un grupo de 12 personas obtiene (en milisegundos): $210,\\ 230,\\ 250,\\ 225,\\ 240,\\ 215,\\ 235,\\ 245,\\ 220,\\ 260,\\ 232,\\ 238$. a) Calcula la media y la mediana. b) Calcula el rango. c) ¿Qué porcentaje de las personas tarda menos de $240$ ms?",
    f"a) Suma $={sum([210,230,250,225,240,215,235,245,220,260,232,238])}$; media $={D(mean([210,230,250,225,240,215,235,245,220,260,232,238]),2,False)}$ ms. Ordenados: $210,215,220,225,230,232,235,238,240,245,250,260$; mediana $=\\frac{{232+235}}{{2}}={D(233.5,1,False)}$ ms. b) $260-210=50$ ms. c) Menos de $240$: {sum(1 for a in [210,230,250,225,240,215,235,245,220,260,232,238] if a<240)} de $12$, es decir, el ${D(sum(1 for a in [210,230,250,225,240,215,235,245,220,260,232,238] if a<240)/12*100,1,False)}\\,\\%$.",
    ["b) $260-210=50$ ms"])

T.c("**La encuesta de ocio.** Se pregunta a 120 alumnos cuántas horas semanales dedican a videojuegos. Resultados por intervalos: $[0,2)$: 30; $[2,4)$: 42; $[4,6)$: 30; $[6,8)$: 12; $[8,10)$: 6. a) Calcula la media (con marcas de clase). b) ¿En qué intervalo está la mediana? c) ¿Qué porcentaje dedica $6$ horas o más?",
    f"a) Marcas $1,3,5,7,9$: $\\frac{{30+126+150+84+54}}{{120}}=\\frac{{444}}{{120}}={D(444/120,2,False)}$ h. b) Acumuladas $30,72,102,\\dots$; la posición $60$ y $61$ cae en $[2,4)$. c) $\\frac{{12+6}}{{120}}=15\\,\\%$.",
    [f"={D(444/120,2,False)}$ h", "cae en $[2,4)$", "=15\\,\\%$"])

T.c("**Una encuesta que engaña.** Un periódico titula: «El 80 % de los españoles está a favor de las clases por la tarde». Se preguntó a 50 personas a la salida de un gimnasio vespertino. a) ¿Cuál es la población y cuál la muestra? b) ¿Es una muestra representativa? Razona. c) Propón una forma mejor de elegir la muestra.",
    "a) Población: todos los españoles. Muestra: las 50 personas del gimnasio. b) No: está **sesgada** (son personas que ya van por la tarde) y es demasiado pequeña. c) Elegir al azar personas de distintas edades, ciudades y horarios (muestreo aleatorio), con un tamaño mayor.",
    ["está **sesgada**"])

T.chk(d.count(5) == 6 and len(d) == 20 and sum(c.values()) == 20, "ex 2")
T.chk(R(50, 8) == R(25, 4) and abs(25/4 - 6.25) < 1e-12 and median([4, 8, 6, 5, 3, 8, 9, 7]) == 6.5 and multimode([4, 8, 6, 5, 3, 8, 9, 7]) == [8], "ex 3")
T.chk(abs(mean(v) - 40/7) < 1e-12 and 10 - 2 == 8 and abs(pvariance(v) - (4+16+16+25+49+64+100)/7 + (40/7)**2) < 1e-12, "ex 4")
T.chk(abs(0.35*360 - 126) < 1e-9 and abs(0.2*360 - 72) < 1e-9 and 0.35*80 == 28 and 0.2*80 == 16, "ex 5")
T.chk(sum([52, 47, 55, 60, 49, 53, 58, 51, 56, 54]) == 535 and median([52, 47, 55, 60, 49, 53, 58, 51, 56, 54]) == 53.5, "ex 6")
T.chk((9*1400 + 8000)/10 == 2060 and median([1400]*9 + [8000]) == 1400, "ex 7")
T.chk(3+5+8+6+2 == 24 and 3 + 10 + 24 + 24 + 10 == 71, "ex 8")
T.chk(median([2, 3, 5, 6, 7, 9, 10, 12]) == 6.5 and (3+5)/2 == 4 and (9+10)/2 == 9.5, "ex 9")
T.chk(mean([10, 12, 11, 9, 13, 11]) == 11 and mean([4, 18, 6, 16, 8, 14]) == 11 and pstdev([10, 12, 11, 9, 13, 11]) < pstdev([4, 18, 6, 16, 8, 14]), "ex 10")
T.chk((155*4 + 165*9 + 175*5 + 185*2)/20 == 167.5, "ex 11")
t12 = [5, 10, 10, 15, 15, 15, 20, 20, 25, 45]
T.chk(mean(t12) == 18 and median(t12) == 15 and multimode(t12) == [15] and mean(t12[:-1]) == 15 and median(t12[:-1]) == 15, "ex 12")
T.chk(sum(c for c in [90, 60, 30, 20]) == 200 and [x/200*360 for x in (90, 60, 30, 20)] == [162, 108, 54, 36], "ex 15")
T.chk(5/50 == 0.1 and 12/200 == 0.06, "ex 16")
vt = sorted([12, 15, 9, 20, 14, 30, 10])
T.chk(vt == [9, 10, 12, 14, 15, 20, 30] and median(vt) == 14 and 30 - 9 == 21 and median(vt[:3]) == 10 and median(vt[4:]) == 20, "ex 17")
ed = [22, 25, 24, 22, 30, 28, 25, 22, 26, 27, 24, 25]
T.chk(sorted(multimode(ed)) == [22, 25] and median(ed) == 25 and mean(ed) == 25 and sum(ed) == 300, "ex 18")
T.chk(0 + 12 + 30 + 30 + 20 == 92 and 0 + 12 + 60 + 90 + 80 == 242 and abs(pvariance([0]*8 + [1]*12 + [2]*15 + [3]*10 + [4]*5) - (242/50 - (92/50)**2)) < 1e-12, "ex 19")
T.chk(median([0]*8 + [1]*12 + [2]*15 + [3]*10 + [4]*5) == 2, "ex 19 mediana")
T.chk(14*6.5 + 11*5.5 == 151.5, "ex 20")
T.chk(mean([0,3,1,0,4,0,2,2]) == 1.5 and mean([1,2,1,2,1,2,1,2]) == 1.5 and pstdev([1,2,1,2,1,2,1,2]) < pstdev([0,3,1,0,4,0,2,2]), "ex 21")
rr = [210,230,250,225,240,215,235,245,220,260,232,238]
T.chk(median(rr) == 233.5 and max(rr) - min(rr) == 50, "ex 22")
T.chk(30*1 + 42*3 + 30*5 + 12*7 + 6*9 == 444 and 30 + 42 == 72 and 30 < 60 <= 72 and (12 + 6)/120 == 0.15, "ex 23")
T.cerrar()
