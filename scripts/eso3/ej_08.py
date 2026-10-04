#!/usr/bin/env python3
"""Relación de ejercicios del tema 8 (Lugares geométricos, áreas y perímetros)."""
from math import pi, sqrt, hypot
from sympy import Rational as R, sqrt as ssqrt, latex
from _ej import Tema, L, D

T = Tema(8, "08-lugares-geometricos", "Lugares geométricos, áreas y perímetros")
d2 = lambda v: D(v, 2, False)
d1 = lambda v: D(v, 1, False)

# ---- básicos ----
T.b("Calcula la hipotenusa de un triángulo rectángulo de catetos $9$ cm y $12$ cm, y el cateto que falta si la hipotenusa mide $17$ cm y un cateto $8$ cm.",
    f"$h=\\sqrt{{81+144}}=\\sqrt{{225}}={int(hypot(9,12))}$ cm. Cateto: $\\sqrt{{289-64}}=\\sqrt{{225}}={int(sqrt(289-64))}$ cm.",
    [f"={int(hypot(9,12))}$ cm", f"={int(sqrt(289-64))}$ cm"])

T.b("Indica cuáles de estas ternas son pitagóricas (lados de un triángulo rectángulo): a) $(6,8,10)$ b) $(7,24,25)$ c) $(5,10,12)$ d) $(9,40,41)$.",
    "a) $36+64=100$: sí. b) $49+576=625$: sí. c) $25+100=125\\neq144$: no. d) $81+1600=1681=41^2$: sí.",
    ["$36+64=100$: sí", "$49+576=625$: sí", "125\\neq144$: no", "$81+1600=1681"])

T.b("Calcula la diagonal de un rectángulo de $15$ cm de largo y $8$ cm de ancho, y la de un cuadrado de lado $6$ cm (deja la segunda con raíz y como decimal).",
    f"Rectángulo: $\\sqrt{{225+64}}=\\sqrt{{289}}=17$ cm. Cuadrado: $6\\sqrt2\\approx{d2(6*sqrt(2))}$ cm.",
    ["=17$ cm", f"\\approx{d2(6*sqrt(2))}$ cm"])

T.b("Halla la distancia entre $A(-2,1)$ y $B(4,9)$ y la longitud del segmento de $A(0,0)$ a $C(5,12)$.",
    f"$d(A,B)=\\sqrt{{6^2+8^2}}=\\sqrt{{100}}=10$. $d(A,C)=\\sqrt{{25+144}}=13$.",
    ["=\\sqrt{100}=10$", "=13$"])

T.b("Calcula el área y el perímetro de un trapecio con bases $12$ y $8$ cm, altura $5$ cm y lados no paralelos de $5{,}4$ y $5{,}4$ cm.",
    f"$A=\\frac{{(12+8)\\cdot5}}{{2}}=50$ cm². $P=12+8+5{{,}}4+5{{,}}4={d1(12+8+5.4+5.4)}$ cm.",
    ["=50$ cm²", f"={d1(12+8+5.4+5.4)}$ cm"])

T.b("Calcula la longitud y el área de una circunferencia y de su círculo de radio $7$ cm. Usa $\\pi\\approx3{,}14$.",
    f"$L=2\\pi r\\approx2\\cdot3{{,}}14\\cdot7={d2(2*3.14*7)}$ cm. $A=\\pi r^2\\approx3{{,}}14\\cdot49={d2(3.14*49)}$ cm².",
    [f"={d2(2*3.14*7)}$ cm", f"={d2(3.14*49)}$ cm²"])

ap = sqrt(5**2 - 2.5**2)
T.b("Un pentágono regular tiene lado $5$ cm y apotema $3{,}44$ cm. Calcula su perímetro y su área.",
    f"$P=5\\cdot5=25$ cm. $A=\\frac{{25\\cdot3{{,}}44}}{{2}}={d2(25*3.44/2)}$ cm².",
    ["=25$ cm", f"={d2(25*3.44/2)}$ cm²"])

T.b("Calcula el área de un sector circular de radio $10$ cm y ángulo $72^\\circ$ y la longitud de su arco.",
    f"$A=\\frac{{\\pi\\cdot10^2\\cdot72}}{{360}}=20\\pi\\approx{d2(20*pi)}$ cm². Arco: $\\frac{{2\\pi\\cdot10\\cdot72}}{{360}}=4\\pi\\approx{d2(4*pi)}$ cm.",
    [f"\\approx{d2(20*pi)}$ cm²", f"\\approx{d2(4*pi)}$ cm"])

T.b("Un cuadrado inscrito en una circunferencia tiene diagonal igual al diámetro. Si el radio es $5$ cm, calcula el lado y el área del cuadrado.",
    f"Diagonal $=10$ cm. Lado $l=\\frac{{10}}{{\\sqrt2}}=5\\sqrt2\\approx{d2(5*sqrt(2))}$ cm. Área $=l^2=50$ cm².",
    [f"\\approx{d2(5*sqrt(2))}$ cm", "=50$ cm²"])

T.b("Dibuja (mentalmente) un segmento $AB$ de $8$ cm. ¿A qué distancia de $A$ y de $B$ están los puntos de su mediatriz que están a $3$ cm del punto medio? ¿Qué lugar geométrico describe la mediatriz?",
    f"El punto medio $M$ está a $4$ cm de $A$ y $B$. Un punto de la mediatriz a $3$ cm de $M$ forma un triángulo rectángulo: $d=\\sqrt{{4^2+3^2}}=5$ cm de $A$ y de $B$. La mediatriz es el lugar geométrico de los puntos que equidistan de $A$ y $B$.",
    ["=5$ cm de $A$ y de $B$"])

# ---- problemas ----
T.p("Una escalera de $5$ m se apoya en una pared con el pie a $1{,}4$ m de ella. ¿A qué altura llega? Si el pie se aleja $1{,}6$ m más, ¿a qué altura llega ahora?",
    f"Altura: $\\sqrt{{25-1{{,}}96}}=\\sqrt{{23{{,}}04}}=4{{,}}8$ m. Con el pie a $3$ m: $\\sqrt{{25-9}}=4$ m.",
    ["=4{,}8$ m", "=4$ m"])

T.p("Una pantalla de cine tiene $12$ m de ancho y $5$ m de alto. ¿Cuánto mide la diagonal? ¿Cuánto cuesta enmarcarla con un cordón luminoso a $8$ € el metro (perímetro)?",
    f"Diagonal $\\sqrt{{144+25}}=13$ m. Perímetro $2(12+5)=34$ m, luego ${34*8}$ €.",
    ["=13$ m", f"{34*8}$ €"])

T.p("Un triángulo isósceles tiene los lados iguales de $13$ cm y la base de $10$ cm. Calcula su altura, su área y su perímetro.",
    "Altura: $\\sqrt{13^2-5^2}=12$ cm. Área: $\\frac{10\\cdot12}{2}=60$ cm². Perímetro: $13+13+10=36$ cm.",
    ["=12$ cm", "=60$ cm²", "=36$ cm"])

T.p("Una finca tiene forma de rombo con diagonales de $60$ m y $80$ m. Calcula su área y el lado (para el vallado completo).",
    "Área $=\\frac{60\\cdot80}{2}=2400$ m². El lado es la hipotenusa de un triángulo de catetos $30$ y $40$: $50$ m. Valla: $4\\cdot50=200$ m.",
    ["=2400$ m²", "$50$ m", "=200$ m"])

T.p("Una piscina circular de $6$ m de diámetro está rodeada por un camino de $1$ m de ancho. Calcula el área del camino (corona circular).",
    f"Radios: $3$ y $4$ m. $A=\\pi(16-9)=7\\pi\\approx{d2(7*pi)}$ m².",
    [f"\\approx{d2(7*pi)}$ m²"])

T.p("Una pista de atletismo tiene dos rectas de $100$ m y dos semicírculos de $30$ m de radio. Calcula el perímetro de la pista y su área interior.",
    f"Perímetro: $2\\cdot100+2\\pi\\cdot30\\approx{d2(200+60*pi)}$ m. Área: $100\\cdot60+\\pi\\cdot30^2\\approx{d2(6000+900*pi)}$ m².",
    [f"\\approx{d2(200+60*pi)}$ m", f"\\approx{d2(6000+900*pi)}$ m²"])

T.p("Se quiere colocar una farola a la misma distancia de tres casas situadas en los puntos $A(0,0)$, $B(8,0)$ y $C(0,6)$. ¿Dónde hay que ponerla (¿qué punto notable del triángulo es?) y a qué distancia estará de cada casa?",
    "Es el **circuncentro**: corte de las mediatrices. El triángulo es rectángulo en $A$, así que el circuncentro es el punto medio de la hipotenusa $BC$: $(4,3)$. Distancia: $\\sqrt{16+9}=5$ m a cada casa.",
    ["$(4,3)$", "=5$ m a cada casa"])

T.p("Un jardín cuadrado de $10$ m de lado tiene en el centro un estanque circular de $2$ m de radio. Calcula el área de césped.",
    f"$100-\\pi\\cdot4\\approx100-{d2(4*pi)}={d2(100-4*pi)}$ m².",
    [f"={d2(100-4*pi)}$ m²"])

T.p("Calcula el área de la parte coloreada: un cuadrado de lado $8$ cm con un círculo inscrito (tangente a los lados).",
    f"Círculo de radio $4$: $16\\pi\\approx{d2(16*pi)}$ cm². Parte coloreada: $64-16\\pi\\approx{d2(64-16*pi)}$ cm².",
    [f"\\approx{d2(64-16*pi)}$ cm²"])

T.p("Halla el área de un hexágono regular de lado $10$ cm sabiendo que la apotema es $a=\\sqrt{100-25}$.",
    f"$a=\\sqrt{{75}}=5\\sqrt3\\approx{d2(5*sqrt(3))}$ cm. $P=60$ cm. $A=\\frac{{60\\cdot{d2(5*sqrt(3))}}}{{2}}\\approx{d2(30*5*sqrt(3))}$ cm² (exacto: $150\\sqrt3$).",
    [f"\\approx{d2(30*5*sqrt(3))}$ cm²"])

# ---- competenciales ----
T.c("**La rampa.** Un edificio tiene una escalera de $3$ peldaños de $18$ cm de altura y se quiere sustituir por una rampa que arranque a $2{,}7$ m de la puerta. a) ¿Qué desnivel hay que salvar? b) ¿Cuánto mide la rampa (hipotenusa)? c) ¿Qué pendiente tiene (en %)?",
    f"a) $3\\cdot18=54$ cm $=0{{,}}54$ m. b) $\\sqrt{{2{{,}}7^2+0{{,}}54^2}}=\\sqrt{{{d2(2.7**2+0.54**2)}}}\\approx{d2(hypot(2.7,0.54))}$ m. c) $\\frac{{0{{,}}54}}{{2{{,}}7}}=0{{,}}2$, es decir, el $20\\,\\%$.",
    ["=0{,}54$ m", f"\\approx{d2(hypot(2.7,0.54))}$ m", "$20\\,\\%$"])

T.c("**Reparto de una finca.** Tres hermanos reciben una parcela triangular de lados $30$, $40$ y $50$ m. a) ¿Es rectángulo? b) Calcula su área. c) Quieren dividirla con un camino desde el vértice del ángulo recto hasta la hipotenusa, perpendicular a esta. ¿Cuánto mide el camino?",
    "a) $30^2+40^2=2500=50^2$: sí. b) $A=\\frac{30\\cdot40}{2}=600$ m². c) La altura sobre la hipotenusa cumple $\\frac{50\\cdot h}{2}=600\\Rightarrow h=24$ m.",
    ["$30^2+40^2=2500=50^2$", "=600$ m²", "h=24$ m"])

T.c("**El dron.** Un dron sube verticalmente $40$ m y luego se desplaza $30$ m en horizontal. a) ¿A qué distancia en línea recta está del punto de despegue? b) Si hubiera subido a la vez que avanzaba en línea recta hasta ese punto a $5$ m/s, ¿cuánto habría tardado? c) ¿Cuánto más corto es ese camino que el real recorrido?",
    "a) $\\sqrt{40^2+30^2}=50$ m. b) $50:5=10$ s. c) El real recorre $70$ m; el recto $50$ m: ahorra $20$ m.",
    ["=50$ m", "=10$ s", "ahorra $20$ m"])

T.c("**La pizza.** Una pizzería vende una pizza redonda de $30$ cm de diámetro por $9$ €, y una cuadrada de $28$ cm de lado por $9$ €. a) Calcula el área de cada una. b) ¿Cuál es más barata por cm²? c) Con la redonda cortada en $8$ porciones iguales, ¿cuál es el área y el perímetro de cada porción (usa el radio de la pizza)?",
    f"a) Redonda: $\\pi\\cdot15^2\\approx{d2(225*pi)}$ cm². Cuadrada: $28^2=784$ cm². b) La redonda: $9:{d2(225*pi)}\\approx{D(9/(225*pi),4,False)}$ €/cm² frente a $9:784\\approx{D(9/784,4,False)}$ €/cm²: la cuadrada es más barata. c) Área: ${d2(225*pi)}:8\\approx{d2(225*pi/8)}$ cm². Perímetro: arco $\\frac{{2\\pi\\cdot15}}{{8}}\\approx{d2(2*pi*15/8)}$ más dos radios $30$: ${d2(2*pi*15/8+30)}$ cm.",
    [f"\\approx{d2(225*pi)}$ cm²", "la cuadrada es más barata", f"\\approx{d2(225*pi/8)}$ cm²", f"{d2(2*pi*15/8+30)}$ cm"])

# comprobaciones independientes
T.chk(hypot(9, 12) == 15 and sqrt(289 - 64) == 15 and 15**2 == 225, "ex 1")
T.chk(36 + 64 == 100 and 49 + 576 == 625 and 25 + 100 != 144 and 81 + 1600 == 41**2, "ex 2")
T.chk(hypot(15, 8) == 17 and hypot(4 - -2, 9 - 1) == 10 and hypot(5, 12) == 13, "ex 3-4")
T.chk(R(12 + 8, 2) * 5 == 50, "ex 5")
T.chk(abs(2 * 3.14 * 7 - 43.96) < 1e-9 and abs(3.14 * 49 - 153.86) < 1e-9, "ex 6")
T.chk(abs(sqrt(25 - 6.25) - 4.33) < 0.01 and abs(25 * 3.44 / 2 - 43.0) < 1e-9, "ex 7")
T.chk(abs(pi * 100 * 72 / 360 - 20 * pi) < 1e-9, "ex 8")
T.chk(sqrt(5**2 + 5**2) == hypot(5, 5) and abs(hypot(5, 5)**2 - 50) < 1e-9, "ex 9")
T.chk(hypot(4, 3) == 5, "ex 10")
T.chk(abs(sqrt(25 - 1.96) - 4.8) < 1e-9 and sqrt(25 - 9) == 4 and abs(1.4 + 1.6 - 3.0) < 1e-12, "ex 11")
T.chk(hypot(12, 5) == 13, "ex 12")
T.chk(hypot(5, 12) == 13 and 10 * 12 / 2 == 60 and 13 + 13 + 10 == 36, "ex 13")
T.chk(hypot(30, 40) == 50 and 60 * 80 / 2 == 2400, "ex 14")
T.chk(abs(pi * (16 - 9) - 7 * pi) < 1e-12, "ex 15")
T.chk(hypot(8, 6) / 2 == 5 and hypot(4, 3) == 5 and hypot(4, 3 - 6) == 5, "ex 17 (circuncentro)")
T.chk(abs(sqrt(100 - 25) - 5 * sqrt(3)) < 1e-9, "ex 20")
T.chk(hypot(2.7, 0.54) < 2.76 and abs(0.54 / 2.7 - 0.2) < 1e-12, "ex 21")
T.chk(30**2 + 40**2 == 50**2 and 50 * 24 / 2 == 600, "ex 22")
T.chk(hypot(40, 30) == 50 and 40 + 30 - 50 == 20, "ex 23")
T.chk(9 / 784 < 9 / (225 * pi), "ex 24: la cuadrada sale más barata por cm²")
T.cerrar()
