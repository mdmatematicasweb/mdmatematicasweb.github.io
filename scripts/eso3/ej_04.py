#!/usr/bin/env python3
"""Relación de ejercicios del tema 4 (Proporcionalidad numérica)."""
from sympy import Rational as R
from _ej import Tema, L, D, miles

T = Tema(4, "04-proporcionalidad", "Proporcionalidad numérica")
E2 = lambda x: D(x, 2, False)

# ---- básicos ----
x = R(5 * 84, 12)
T.b("Calcula el valor desconocido: a) $\\frac{12}{5}=\\frac{84}{x}$ b) $\\frac{x}{9}=\\frac{35}{15}$.",
    f"a) $x=\\frac{{5\\cdot84}}{{12}}={x}$. b) $x=\\frac{{9\\cdot35}}{{15}}={R(9*35,15)}$.",
    [f"x=\\frac{{5\\cdot84}}{{12}}={x}$", f"={R(9*35,15)}$"])

T.b("Tres kilos de manzanas cuestan $5{,}40$ €. ¿Cuánto cuestan $8$ kg? ¿Cuántos kilos se pueden comprar con $27$ €?",
    f"Precio por kilo: $5{{,}}40:3=1{{,}}80$ €/kg. $8$ kg: ${E2(8*1.8)}$ €. Con $27$ €: $27:1{{,}}80={int(27/1.8)}$ kg.",
    [f"{E2(8*1.8)}$ €", f"={int(27/1.8)}$ kg"])

T.b("Seis obreros construyen un muro en $15$ días. ¿Cuántos días tardarían $9$ obreros? ¿Y $5$?",
    f"Magnitudes inversas: $6\\cdot15=90$. Con $9$: ${90//9}$ días. Con $5$: ${90//5}$ días.",
    [f"${90//9}$ días", f"${90//5}$ días"])

T.b("Calcula: a) el $18\\,\\%$ de $450$ b) ¿qué porcentaje es $63$ de $420$? c) ¿de qué número es $72$ el $24\\,\\%$?",
    f"a) $0{{,}}18\\cdot450={int(0.18*450)}$. b) $\\frac{{63}}{{420}}\\cdot100={int(63/420*100)}\\,\\%$ . c) $72:0{{,}}24={int(72/0.24)}$.",
    [f"={int(0.18*450)}$", f"={int(63/420*100)}\\,\\%$", f"={int(72/0.24)}$"])

T.b("Un abrigo cuesta $120$ € y tiene un descuento del $35\\,\\%$. Calcula el precio final y cuánto se ahorra.",
    f"Índice $1-0{{,}}35=0{{,}}65$. Precio: $120\\cdot0{{,}}65={int(120*0.65)}$ €. Ahorro: ${120-int(120*0.65)}$ €.",
    [f"={int(120*0.65)}$ €", f"{120-int(120*0.65)}$ €"])

T.b("Un televisor cuesta $480$ € sin IVA. Con el $21\\,\\%$ de IVA, ¿cuánto cuesta? Si cuesta $605$ € con IVA, ¿cuál es el precio sin IVA?",
    f"$480\\cdot1{{,}}21={E2(480*1.21)}$ €. Sin IVA: $605:1{{,}}21={int(605/1.21)}$ €.",
    [f"={E2(480*1.21)}$ €", f"={int(605/1.21)}$ €"])

T.b("Un precio sube un $20\\,\\%$ y después baja un $20\\,\\%$. ¿Queda igual? Calcula la variación porcentual total.",
    f"$1{{,}}20\\cdot0{{,}}80=0{{,}}96$: no queda igual, **baja un $4\\,\\%$**.",
    ["0{,}96", "baja un $4\\,\\%$"])

T.b("Calcula el interés simple producido por $4\\,000$ € al $3{,}5\\,\\%$ anual durante $4$ años, y el capital final con interés compuesto en el mismo tiempo.",
    f"Simple: $4000\\cdot0{{,}}035\\cdot4={int(4000*0.035*4)}$ €. Compuesto: $4000\\cdot1{{,}}035^4\\approx{E2(4000*1.035**4)}$ €.",
    [f"={int(4000*0.035*4)}$ €", f"\\approx{E2(4000*1.035**4)}$ €"])

T.b("Una escala de un mapa es $1:50\\,000$. a) Dos pueblos están a $7{,}5$ cm en el mapa; ¿qué distancia real hay en km? b) Una carretera mide $12$ km; ¿cuántos cm mide en el mapa?",
    f"a) $7{{,}}5\\cdot50000={miles(375000)}$ cm $=3{{,}}75$ km. b) $12$ km $=1\\,200\\,000$ cm; $1\\,200\\,000:50\\,000=24$ cm.",
    ["3{,}75$ km", "=24$ cm"])

T.b("Reparte $1\\,800$ € de forma directamente proporcional a $2$, $3$ y $4$.",
    f"Suma: $2+3+4=9$. Partes: $\\frac{{1800}}{{9}}=200$ €/unidad, luego ${200*2}$ €, ${200*3}$ € y ${200*4}$ €.",
    ["400$ €", "600$ €", "800$ €"])

# ---- problemas ----
T.p("Un coche gasta $6{,}4$ L cada $100$ km. ¿Cuántos litros necesita para un viaje de $350$ km? Si la gasolina cuesta $1{,}65$ €/L, ¿cuánto cuesta el viaje?",
    f"$\\frac{{6{{,}}4}}{{100}}=\\frac{{x}}{{350}}\\Rightarrow x={E2(6.4*3.5)}$ L. Coste: ${E2(6.4*3.5)}\\cdot1{{,}}65={E2(6.4*3.5*1.65)}$ €.",
    [f"x={E2(6.4*3.5)}$ L", f"={E2(6.4*3.5*1.65)}$ €"])

T.p("Una fotocopiadora hace $150$ copias en $6$ minutos. ¿Cuántas copias hace en un cuarto de hora? ¿Y dos fotocopiadoras iguales cuánto tardan en hacer $1\\,000$ copias?",
    f"Ritmo: $\\frac{{150}}{{6}}=25$ copias/min. En $15$ min: ${25*15}$. Dos máquinas: $50$ copias/min, luego $1000:50=20$ min.",
    [f"{25*15}$", "=20$ min"])

T.p("Para pintar una pared de $30$ m² se necesitan $4$ botes de pintura. ¿Cuántos botes hacen falta para otra de $52{,}5$ m²? (Los botes no se pueden partir.)",
    f"Rendimiento: $\\frac{{30}}{{4}}=7{{,}}5$ m²/bote. $52{{,}}5:7{{,}}5=7$ botes exactos.",
    ["=7$ botes"])

T.p("Ocho grifos llenan una piscina en $9$ horas. ¿Cuánto tardarían $6$ grifos? ¿Cuántos grifos harían falta para llenarla en $4$ horas y media?",
    f"Inverso: $8\\cdot9=72$. Con $6$: ${72//6}$ h. Para $4{{,}}5$ h: $72:4{{,}}5={int(72/4.5)}$ grifos.",
    [f"${72//6}$ h", f"={int(72/4.5)}$ grifos"])

T.p("En unas rebajas, una chaqueta de $85$ € se rebaja un $30\\,\\%$ y sobre ese precio se hace otro $10\\,\\%$ por pagar en efectivo. ¿Cuál es el precio final? ¿Es igual que un descuento único del $40\\,\\%$?",
    f"$85\\cdot0{{,}}70\\cdot0{{,}}90={E2(85*0.7*0.9)}$ €. Un descuento único del $40\\,\\%$ daría $85\\cdot0{{,}}60={E2(85*0.6)}$ €: **no** es igual. El descuento total equivale a un $37\\,\\%$.",
    [f"={E2(85*0.7*0.9)}$ €", f"{E2(85*0.6)}$ €", "$37\\,\\%$"])

T.p("El precio de un móvil subió un $15\\,\\%$ y ahora cuesta $391$ €. ¿Cuánto costaba antes? ¿Cuánto debería bajar un $15\\,\\%$ para quedar en el precio anterior? (Responde: ¿vuelve al precio inicial?)",
    f"Antes: $391:1{{,}}15={int(391/1.15)}$ €. Bajar un $15\\,\\%$ de $391$: $391\\cdot0{{,}}85={E2(391*0.85)}$ €, distinto de ${int(391/1.15)}$ €: no vuelve al precio inicial.",
    [f"={int(391/1.15)}$ €", f"={E2(391*0.85)}$ €"])

T.p("Un banco ofrece un $2{,}5\\,\\%$ anual con interés compuesto. ¿En cuántos años se duplica aproximadamente un capital? Prueba con $25,\\ 28$ y $30$ años.",
    f"$1{{,}}025^{{25}}\\approx{D(1.025**25,3,False)}$; $1{{,}}025^{{28}}\\approx{D(1.025**28,3,False)}$; $1{{,}}025^{{30}}\\approx{D(1.025**30,3,False)}$. Se duplica entre los años $28$ y $29$, hacia los $28$ años.",
    [f"\\approx{D(1.025**25,3,False)}$", f"\\approx{D(1.025**28,3,False)}$", f"\\approx{D(1.025**30,3,False)}$"])

T.p("Un artículo tiene un precio con IVA del $21\\,\\%$ de $72{,}60$ €. Calcula el precio sin IVA y la cantidad de IVA. Si el IVA bajara al $10\\,\\%$, ¿cuánto costaría?",
    f"Sin IVA: $72{{,}}60:1{{,}}21={int(72.6/1.21)}$ €. IVA: ${E2(72.6-72.6/1.21)}$ €. Con el $10\\,\\%$: $60\\cdot1{{,}}10={int(60*1.1)}$ €.",
    [f"={int(72.6/1.21)}$ €", f"{E2(72.6-72.6/1.21)}$ €", f"={int(60*1.1)}$ €"])

T.p("En una clase de $30$ alumnos, el $40\\,\\%$ son chicas. Se incorporan $5$ chicas más. ¿Qué porcentaje de chicas hay ahora?",
    f"Chicas: $0{{,}}4\\cdot30=12$. Ahora hay $17$ chicas de $35$: $\\frac{{17}}{{35}}\\cdot100\\approx{D(17/35*100,1)}\\,\\%$.",
    [f"\\approx{D(17/35*100,1)}\\,\\%$"])

T.p("Tres amigos montan un negocio aportando $2\\,000$ €, $3\\,000$ € y $5\\,000$ €. Al cabo del año ganan $4\\,500$ €. ¿Cuánto corresponde a cada uno? ¿Y si el reparto fuera inversamente proporcional a lo aportado? (Deja el segundo reparto con dos decimales.)",
    f"Directo: $\\frac{{4500}}{{10000}}=0{{,}}45$ por euro: ${int(2000*0.45)}$ €, ${int(3000*0.45)}$ € y ${int(5000*0.45)}$ €. Inverso: se reparte en proporción a $\\frac{{1}}{{2}},\\frac{{1}}{{3}},\\frac{{1}}{{5}}$, suma $\\frac{{31}}{{30}}$: ${E2(4500*(1/2)/(31/30))}$ €, ${E2(4500*(1/3)/(31/30))}$ € y ${E2(4500*(1/5)/(31/30))}$ €.",
    [f"{int(2000*0.45)}$ €", f"{int(5000*0.45)}$ €", f"{E2(4500*(1/2)/(31/30))}$ €", f"{E2(4500*(1/5)/(31/30))}$ €"])

# ---- competenciales ----
T.c("**Comparar ofertas.** En el supermercado hay tres envases de zumo: A) $1$ L por $1{,}20$ €; B) pack de 3 de $200$ mL cada uno por $1{,}35$ €; C) $1{,}5$ L por $1{,}65$ €. a) Calcula el precio por litro de cada uno. b) ¿Cuál es el más barato? c) Si necesitas $6$ L, ¿cuánto te ahorras comprando el más barato frente al más caro?",
    f"a) A: $1{{,}}20$ €/L. B: $1{{,}}35:0{{,}}6=2{{,}}25$ €/L. C: $1{{,}}65:1{{,}}5=1{{,}}10$ €/L. b) El C. c) Con C: $6\\cdot1{{,}}10=6{{,}}60$ €; con B: $6\\cdot2{{,}}25=13{{,}}50$ €. Ahorro: ${E2(13.5-6.6)}$ €.",
    ["2{,}25$ €/L", "1{,}10$ €/L", f"{E2(13.5-6.6)}$ €"])

T.c("**El viaje a Londres.** Un grupo cambia $400$ € a libras esterlinas a razón de $1$ € $=0{,}86$ £ y cobran una comisión del $2\\,\\%$ sobre los euros cambiados. a) ¿Cuántas libras reciben? b) Gastan $250$ £ y quieren devolver el resto a euros al mismo cambio, sin comisión. ¿Cuántos euros recuperan? c) ¿Cuánto han pagado en total por la estancia en euros, comisión incluida?",
    f"a) Comisión: $0{{,}}02\\cdot400=8$ €; se cambian $392$ €: $392\\cdot0{{,}}86={E2(392*0.86)}$ £. b) Sobran ${E2(392*0.86-250)}$ £, que son ${E2((392*0.86-250)/0.86)}$ €. c) $400-{E2((392*0.86-250)/0.86)}={E2(400-(392*0.86-250)/0.86)}$ €.",
    [f"={E2(392*0.86)}$ £", f"son ${E2((392*0.86-250)/0.86)}$ €", f"={E2(400-(392*0.86-250)/0.86)}$ €"])

T.c("**La factura de la luz.** Una familia consume $280$ kWh al mes. El precio es $0{,}15$ €/kWh más $12$ € fijos, y se aplica un $5{,}1\\,\\%$ de impuesto eléctrico sobre el total y después un $21\\,\\%$ de IVA. a) ¿Cuánto es la base antes de impuestos? b) ¿Y el total a pagar? c) Si consiguen reducir el consumo un $15\\,\\%$, ¿cuánto ahorran al mes?",
    f"a) $280\\cdot0{{,}}15+12={E2(280*.15+12)}$ €. b) $54\\cdot1{{,}}051\\cdot1{{,}}21={E2(54*1.051*1.21)}$ €. c) Con $238$ kWh: base ${E2(238*.15+12)}$ €; total ${E2((238*.15+12)*1.051*1.21)}$ €. Ahorro: ${E2(54*1.051*1.21-(238*.15+12)*1.051*1.21)}$ €.",
    [f"={E2(280*.15+12)}$ €", f"={E2(54*1.051*1.21)}$ €", f"{E2(54*1.051*1.21-(238*.15+12)*1.051*1.21)}$ €"])

T.c("**Una hipoteca de juguete.** Pides prestados $12\\,000$ € para una reforma al $6\\,\\%$ anual de interés compuesto y lo devuelves de golpe a los $3$ años. a) ¿Cuánto devuelves? b) ¿Qué intereses pagas? c) Si el interés fuera simple, ¿cuánto pagarías de intereses? ¿Qué te conviene?",
    f"a) $12000\\cdot1{{,}}06^3={E2(12000*1.06**3)}$ €. b) Intereses: ${E2(12000*1.06**3-12000)}$ €. c) Simple: $12000\\cdot0{{,}}06\\cdot3={int(12000*0.06*3)}$ €, menos que con interés compuesto. Para quien pide el préstamo conviene el interés simple.",
    [f"={E2(12000*1.06**3)}$ €", f"{E2(12000*1.06**3-12000)}$ €", f"={int(12000*0.06*3)}$ €"])

T.cerrar()
