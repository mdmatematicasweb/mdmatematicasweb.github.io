#!/usr/bin/env python3
"""Relación de ejercicios del tema 10 (Cuerpos geométricos)."""
from math import pi, sqrt, hypot
from _ej import Tema, L, D, miles

T = Tema(10, "10-cuerpos-geometricos", "Cuerpos geométricos")
d2 = lambda v: D(v, 2, False)
d1 = lambda v: D(v, 1, False)

# ---- básicos ----
T.b("Comprueba la relación de Euler ($C+V=A+2$) en un prisma pentagonal y en una pirámide hexagonal. Indica caras, vértices y aristas de cada uno.",
    "Prisma pentagonal: $7$ caras, $10$ vértices, $15$ aristas: $7+10=17=15+2$. Pirámide hexagonal: $7$ caras, $7$ vértices, $12$ aristas: $7+7=14=12+2$.",
    ["$7+10=17=15+2$", "$7+7=14=12+2$"])

T.b("Calcula el volumen, el área total y la diagonal de un ortoedro de $6\\times4\\times3$ cm.",
    f"$V=6\\cdot4\\cdot3=72$ cm³. $A=2(24+18+12)=108$ cm². Diagonal: $\\sqrt{{36+16+9}}=\\sqrt{{61}}\\approx{d2(sqrt(61))}$ cm.",
    ["=72$ cm³", "=108$ cm²", f"\\approx{d2(sqrt(61))}$ cm"])

T.b("Un cubo tiene $150$ cm² de área total. Calcula su arista y su volumen.",
    "$6a^2=150\\Rightarrow a^2=25\\Rightarrow a=5$ cm. $V=5^3=125$ cm³.",
    ["a=5$ cm", "=125$ cm³"])

T.b("Calcula el volumen y el área total de un prisma recto de base triangular rectángulo con catetos $3$ y $4$ cm y altura $10$ cm.",
    "Hipotenusa $5$. Base: $A_b=\\frac{3\\cdot4}{2}=6$ cm², perímetro $12$ cm. $V=6\\cdot10=60$ cm³. $A_L=12\\cdot10=120$ cm². $A_T=120+2\\cdot6=132$ cm².",
    ["V=6\\cdot10=60$ cm³", "A_T=120+2\\cdot6=132$ cm²"])

T.b("Una pirámide regular tiene base cuadrada de $10$ cm de lado y altura $12$ cm. Calcula la apotema de la pirámide, el área total y el volumen.",
    "Apotema de la base $5$; apotema de la pirámide $\\sqrt{12^2+5^2}=13$ cm. $A_L=\\frac{40\\cdot13}{2}=260$ cm². $A_T=260+100=360$ cm². $V=\\frac{100\\cdot12}{3}=400$ cm³.",
    ["=13$ cm", "A_T=260+100=360$ cm²", "=400$ cm³"])

T.b("Calcula el área lateral, el área total y el volumen de un cilindro de radio $4$ cm y altura $9$ cm (deja el resultado con $\\pi$ y aproximado).",
    f"$A_L=2\\pi\\cdot4\\cdot9=72\\pi\\approx{d2(72*pi)}$ cm². $A_T=72\\pi+2\\pi\\cdot16=104\\pi\\approx{d2(104*pi)}$ cm². $V=\\pi\\cdot16\\cdot9=144\\pi\\approx{d2(144*pi)}$ cm³.",
    [f"\\approx{d2(72*pi)}$ cm²", f"\\approx{d2(104*pi)}$ cm²", f"\\approx{d2(144*pi)}$ cm³"])

T.b("Un cono tiene radio $5$ cm y altura $12$ cm. Calcula la generatriz, el área total y el volumen.",
    f"$g=\\sqrt{{25+144}}=13$ cm. $A_T=\\pi\\cdot5\\cdot(13+5)=90\\pi\\approx{d2(90*pi)}$ cm². $V=\\frac{{\\pi\\cdot25\\cdot12}}{{3}}=100\\pi\\approx{d2(100*pi)}$ cm³.",
    ["g=\\sqrt{25+144}=13$ cm", f"\\approx{d2(90*pi)}$ cm²", f"\\approx{d2(100*pi)}$ cm³"])

T.b("Calcula el área y el volumen de una esfera de radio $6$ cm. ¿Qué ocurre con el volumen si el radio se duplica?",
    f"$A=4\\pi\\cdot36=144\\pi\\approx{d2(144*pi)}$ cm². $V=\\frac{{4}}{{3}}\\pi\\cdot216=288\\pi\\approx{d2(288*pi)}$ cm³. Si el radio se duplica, el volumen se multiplica por $2^3=8$.",
    [f"\\approx{d2(144*pi)}$ cm²", f"\\approx{d2(288*pi)}$ cm³", "$2^3=8$"])

T.b("Pasa a litros: a) $2\\,500$ cm³ b) $0{,}8$ m³ c) $350$ dm³. Pasa a cm³: d) $1{,}2$ L.",
    "a) $2{,}5$ L. b) $800$ L. c) $350$ L. d) $1200$ cm³.",
    ["a) $2{,}5$ L", "b) $800$ L", "c) $350$ L", "d) $1200$ cm³"])

T.b("Una esfera de $10$ cm de diámetro está dentro de un cubo de $10$ cm de arista, tangente a sus caras. ¿Qué fracción del volumen del cubo ocupa la esfera (en %)?",
    f"$V_{{esf}}=\\frac{{4}}{{3}}\\pi\\cdot125\\approx{d2(4/3*pi*125)}$ cm³ y $V_{{cubo}}=1000$ cm³. Fracción: $\\approx{d1(4/3*pi*125/10)}\\,\\%$.",
    [f"\\approx{d1(4/3*pi*125/10)}\\,\\%$"])

# ---- problemas ----
T.p("Una piscina rectangular mide $12\\times5$ m y tiene $1{,}6$ m de profundidad. a) ¿Cuántos litros de agua caben? b) Si se llena hasta $10$ cm del borde, ¿cuántos litros? c) ¿Cuántos azulejos de $10\\times10$ cm hacen falta para revestir el suelo y las paredes?",
    f"a) $V=12\\cdot5\\cdot1{{,}}6=96$ m³ $=96\\,000$ L. b) $12\\cdot5\\cdot1{{,}}5=90$ m³ $=90\\,000$ L. c) Suelo $60$ m² y paredes $2(12+5)\\cdot1{{,}}6={d1(2*(12+5)*1.6)}$ m²: total ${d1(60+2*(12+5)*1.6)}$ m² $={miles((60+2*(12+5)*1.6)*100)}$ azulejos.",
    ["=96$ m³", "=90$ m³", f"={miles((60+2*(12+5)*1.6)*100)}$ azulejos"])

T.p("Una lata de refresco cilíndrica tiene $6{,}6$ cm de diámetro y $11{,}5$ cm de altura. ¿Cuántos mililitros caben? ¿Cuánto metal (área total) lleva?",
    f"$r=3{{,}}3$. $V=\\pi\\cdot3{{,}}3^2\\cdot11{{,}}5\\approx{d1(pi*3.3**2*11.5)}$ cm³ $={d1(pi*3.3**2*11.5)}$ mL. $A_T=2\\pi\\cdot3{{,}}3\\cdot(11{{,}}5+3{{,}}3)\\approx{d1(2*pi*3.3*(11.5+3.3))}$ cm².",
    [f"\\approx{d1(pi*3.3**2*11.5)}$ cm³", f"\\approx{d1(2*pi*3.3*(11.5+3.3))}$ cm²"])

T.p("Un depósito cilíndrico de $2$ m de diámetro y $3$ m de altura se llena con una manguera que echa $50$ L por minuto. ¿Cuántas horas tarda?",
    f"$V=\\pi\\cdot1^2\\cdot3\\approx{d2(3*pi)}$ m³ $\\approx{d1(3000*pi)}$ L. Tiempo: ${d1(3000*pi)}:50\\approx{d1(3000*pi/50)}$ min $\\approx{d2(3000*pi/50/60)}$ h.",
    [f"\\approx{d1(3000*pi)}$ L", f"\\approx{d2(3000*pi/50/60)}$ h"])

T.p("Un helado tiene forma de cono (radio $3$ cm, altura $10$ cm) rematado por media esfera del mismo radio. Calcula su volumen.",
    f"Cono: $\\frac{{\\pi\\cdot9\\cdot10}}{{3}}=30\\pi$. Semiesfera: $\\frac{{2}}{{3}}\\pi\\cdot27=18\\pi$. Total: $48\\pi\\approx{d2(48*pi)}$ cm³.",
    [f"48\\pi\\approx{d2(48*pi)}$ cm³"])

T.p("Una tienda de campaña tiene forma de pirámide regular de base cuadrada de $2$ m de lado y altura $1{,}5$ m. Calcula la tela necesaria para las cuatro caras y el volumen interior.",
    f"Apotema de la pirámide: $\\sqrt{{1{{,}}5^2+1^2}}=\\sqrt{{3{{,}}25}}\\approx{d2(sqrt(3.25))}$ m. $A_L=\\frac{{8\\cdot{d2(sqrt(3.25))}}}{{2}}\\approx{d2(4*sqrt(3.25))}$ m². $V=\\frac{{4\\cdot1{{,}}5}}{{3}}=2$ m³.",
    [f"\\approx{d2(4*sqrt(3.25))}$ m²", "=2$ m³"])

T.p("Se funde una esfera de plomo de $3$ cm de radio para hacer cubitos de $1$ cm de arista. ¿Cuántos cubitos salen, como máximo?",
    f"$V=\\frac{{4}}{{3}}\\pi\\cdot27=36\\pi\\approx{d2(36*pi)}$ cm³. Salen ${int(36*pi)}$ cubitos completos.",
    [f"{int(36*pi)}$ cubitos"])

T.p("Un cubo y una esfera tienen el mismo volumen, $1\\,000$ cm³. ¿Cuál tiene menos superficie? Calcúlala en cada caso.",
    f"Cubo: arista $10$ cm y $A=6\\cdot100=600$ cm². Esfera: $r=\\sqrt[3]{{\\frac{{3000}}{{4\\pi}}}}\\approx{d2((3000/(4*pi))**(1/3))}$ cm, $A=4\\pi r^2\\approx{d2(4*pi*(3000/(4*pi))**(2/3))}$ cm². La esfera tiene menos superficie.",
    ["A=6\\cdot100=600$ cm²", f"\\approx{d2(4*pi*(3000/(4*pi))**(2/3))}$ cm²"])

T.p("Una vela cónica de $12$ cm de altura y $4$ cm de radio se funde y se vuelve a moldear como una vela cilíndrica del mismo radio. ¿Qué altura tiene la nueva vela?",
    "Volumen del cono: $\\frac{\\pi\\cdot16\\cdot12}{3}=64\\pi$. Cilindro: $\\pi\\cdot16\\cdot h=64\\pi\\Rightarrow h=4$ cm.",
    ["h=4$ cm"])

T.p("Una pirámide de Egipto (base cuadrada de $230$ m de lado y altura $147$ m) se quiere comparar con un prisma de la misma base y altura. ¿Qué volumen tienen? ¿Qué fracción es la pirámide?",
    f"Prisma: $230^2\\cdot147={miles(230**2*147)}$ m³. Pirámide: un tercio, ${miles(230**2*147//3)}$ m³.",
    [f"{miles(230**2*147//3)}$ m³"])

T.p("Se pinta una columna cilíndrica de $0{,}4$ m de radio y $3$ m de altura (sin las bases). ¿Cuántos metros cuadrados hay que pintar? Si un bote cubre $8$ m², ¿cuántos botes se necesitan para $12$ columnas?",
    f"$A=2\\pi\\cdot0{{,}}4\\cdot3\\approx{d2(2*pi*0.4*3)}$ m² por columna. Las $12$ columnas: $\\approx{d2(12*2*pi*0.4*3)}$ m². Botes: ${d2(12*2*pi*0.4*3)}:8\\approx{d2(12*2*pi*0.4*3/8)}$, es decir, $12$ botes.",
    [f"\\approx{d2(2*pi*0.4*3)}$ m²", "$12$ botes"])

# ---- competenciales ----
T.c("**El depósito de agua del instituto.** El instituto tiene un depósito cilíndrico de $2{,}4$ m de diámetro y $2{,}5$ m de altura. a) Calcula su capacidad en litros. b) El consumo diario es de $1\\,800$ L; ¿para cuántos días llega si está lleno? c) Si baja el nivel hasta $1$ m de altura, ¿cuántos litros quedan?",
    f"a) $V=\\pi\\cdot1{{,}}2^2\\cdot2{{,}}5\\approx{d2(pi*1.44*2.5)}$ m³ $\\approx{miles(pi*1.44*2.5*1000)}$ L. b) ${miles(pi*1.44*2.5*1000)}:1800\\approx{d2(pi*1.44*2.5*1000/1800)}$ días: llega para $6$ días completos. c) $\\pi\\cdot1{{,}}44\\cdot1\\approx{d2(pi*1.44)}$ m³ $={miles(pi*1.44*1000)}$ L.",
    [f"\\approx{miles(pi*1.44*2.5*1000)}$ L", "$6$ días", f"={miles(pi*1.44*1000)}$ L"])

T.c("**Un envase.** Un fabricante de cereales compara dos cajas de $1\\,000$ cm³: una en forma de ortoedro de $10\\times10\\times10$ cm (cubo) y otra de $20\\times10\\times5$ cm. a) Calcula la superficie de cartón de cada una. b) ¿Cuál gasta menos cartón? c) Si el cartón cuesta $0{,}0004$ €/cm², ¿cuánto se ahorra al fabricar $10\\,000$ cajas de la mejor?",
    f"a) Cubo: $6\\cdot100=600$ cm². Caja: $2(200+100+50)=700$ cm². b) El cubo. c) Ahorro por caja: $100$ cm² $\\cdot0{{,}}0004=0{{,}}04$ €; en $10\\,000$ cajas: $400$ €.",
    ["6\\cdot100=600$ cm²", "2(200+100+50)=700$ cm²", "400$ €"])

T.c("**Latas y cajas.** Una caja de cartón de $30\\times20\\times12$ cm se llena con latas cilíndricas de $6$ cm de diámetro y $12$ cm de altura, colocadas de pie. a) ¿Cuántas latas caben en la base? b) ¿Qué volumen ocupan las latas y qué fracción del volumen de la caja es? c) ¿Cuántos litros de refresco hay en la caja si las latas se llenan al $95\\,\\%$?",
    f"a) En el largo caben $30:6=5$ y en el ancho $20:6=3$ (quedan $2$ cm): $15$ latas. b) Cada lata: $\\pi\\cdot9\\cdot12\\approx{d1(pi*9*12)}$ cm³; $15$ latas: $\\approx{d1(15*pi*9*12)}$ cm³. La caja: $7200$ cm³. Fracción: $\\approx{d1(15*pi*9*12/7200*100)}\\,\\%$. c) $0{{,}}95\\cdot{d1(15*pi*9*12)}\\approx{d1(0.95*15*pi*9*12)}$ cm³ $\\approx{D(0.95*15*pi*9*12/1000,2,False)}$ L.",
    ["(quedan $2$ cm): $15$ latas", f"\\approx{d1(15*pi*9*12/7200*100)}\\,\\%$", f"\\approx{D(0.95*15*pi*9*12/1000,2,False)}$ L"])

T.c("**La Tierra y la naranja.** La Tierra se puede aproximar por una esfera de radio $6\\,371$ km. a) Calcula su superficie (en notación científica, km²). b) Si el $71\\,\\%$ está cubierto por agua, ¿cuánta superficie es tierra firme? c) Una naranja de $4$ cm de radio es una esfera semejante: ¿qué escala hay entre la Tierra y la naranja?",
    f"a) $4\\pi\\cdot6371^2\\approx{D(4*pi*6371**2/1e8,3,False)}\\cdot10^8$ km². b) Tierra firme: $0{{,}}29\\cdot{D(4*pi*6371**2/1e8,3,False)}\\cdot10^8\\approx{D(0.29*4*pi*6371**2/1e8,2,False)}\\cdot10^8$ km². c) $6371$ km $=6{{,}}371\\cdot10^8$ cm; escala $4:6{{,}}371\\cdot10^8$, es decir, $1:{D(6.371e8/4/1e7,2,False)}\\cdot10^7$.",
    [f"\\approx{D(4*pi*6371**2/1e8,3,False)}\\cdot10^8$ km²", f"\\approx{D(0.29*4*pi*6371**2/1e8,2,False)}\\cdot10^8$ km²"])

# comprobaciones independientes
T.chk(7 + 10 == 15 + 2 and 7 + 7 == 12 + 2 and 5 * 3 == 15 and 5 + 2 == 7, "ex 1")
T.chk(6 * 4 * 3 == 72 and 2 * (24 + 18 + 12) == 108, "ex 2")
T.chk(150 / 6 == 25 and 5**3 == 125, "ex 3")
T.chk(3 * 4 / 2 == 6 and 12 * 10 == 120 and 120 + 12 == 132 and hypot(3, 4) == 5, "ex 4")
T.chk(hypot(12, 5) == 13 and 40 * 13 / 2 == 260 and 100 * 12 / 3 == 400, "ex 5")
T.chk(abs(pi * 25 * 12 / 3 - 100 * pi) < 1e-9 and hypot(5, 12) == 13 and abs(pi * 5 * 18 - 90 * pi) < 1e-9, "ex 7")
T.chk(abs(4 / 3 * pi * 216 - 288 * pi) < 1e-9 and 2**3 == 8, "ex 8")
T.chk(2500 / 1000 == 2.5 and 0.8 * 1000 == 800 and 1.2 * 1000 == 1200, "ex 9")
T.chk(12 * 5 * 1.6 == 96 and 12 * 5 * 1.5 == 90 and abs(2 * 17 * 1.6 + 60 - 114.4) < 1e-9, "ex 11")
T.chk(abs(36 * pi - 113.097) < 1e-3 and int(36 * pi) == 113, "ex 16")
T.chk(abs(pi * 9 * 10 / 3 + 2 / 3 * pi * 27 - 48 * pi) < 1e-9, "ex 14")
T.chk(abs(pi * 16 * 12 / 3 - pi * 16 * 4) < 1e-9, "ex 18")
T.chk(230**2 * 147 % 3 == 0, "ex 19")
T.chk(abs(2 * pi * 0.4 * 3 * 12 / 8 - 11.3) < 0.1, "ex 20")
T.chk(abs(pi * 1.44 * 2.5 * 1000 - 11309.7) < 0.1 and abs(11309.7 / 1800 - 6.28) < 0.01, "ex 21")
T.chk(2 * (200 + 100 + 50) == 700 and (700 - 600) * 0.0004 * 10000 == 400, "ex 22")
T.chk(30 // 6 == 5 and 20 // 6 == 3 and 30 * 20 * 12 == 7200, "ex 23")
T.chk(abs(4 * pi * 6371**2 - 5.1e8) < 0.01e8, "ex 24")
T.cerrar()
