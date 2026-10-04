#!/usr/bin/env python3
"""Relación de ejercicios del tema 9 (Movimientos y semejanzas)."""
from math import sqrt, hypot, pi
from sympy import Rational as R, symbols, solve
from _ej import Tema, L, D

T = Tema(9, "09-movimientos-semejanzas", "Movimientos y semejanzas")
d2 = lambda v: D(v, 2, False)

# ---- básicos ----
tr = lambda P, v: (P[0] + v[0], P[1] + v[1])
T.b("Aplica la traslación de vector $\\vec v=(-3,4)$ a los puntos $A(2,1)$, $B(0,-5)$ y $C(-4,3)$.",
    f"$A'={tr((2,1),(-3,4))}$, $B'={tr((0,-5),(-3,4))}$, $C'={tr((-4,3),(-3,4))}$.",
    ["A'=(-1, 5)", "B'=(-3, -1)", "C'=(-7, 7)"])

T.b("¿Qué vector de traslación lleva $P(3,-2)$ a $P'(-1,6)$? Aplícalo a $Q(0,0)$.",
    "$\\vec v=P'-P=(-1-3,\\ 6-(-2))=(-4,8)$. Entonces $Q'=(-4,8)$.",
    ["\\vec v=P'-P=(-1-3,\\ 6-(-2))=(-4,8)$"])

T.b("Gira $90^\\circ$ en sentido antihorario alrededor del origen los puntos $A(4,1)$, $B(-2,3)$ y $C(0,-5)$.",
    "Con $(x,y)\\to(-y,x)$: $A'=(-1,4)$, $B'=(-3,-2)$, $C'=(5,0)$.",
    ["A'=(-1,4)", "B'=(-3,-2)", "C'=(5,0)"])

T.b("Calcula el simétrico de $P(5,-3)$ respecto de a) el eje $OX$ b) el eje $OY$ c) el origen d) la recta $y=x$.",
    "a) $(5,3)$. b) $(-5,-3)$. c) $(-5,3)$. d) $(-3,5)$.",
    ["a) $(5,3)$", "b) $(-5,-3)$", "c) $(-5,3)$", "d) $(-3,5)$"])

T.b("Indica el orden de la simetría de rotación (el menor ángulo de giro que deja la figura igual) de: a) un triángulo equilátero b) un cuadrado c) un hexágono regular d) un rectángulo no cuadrado.",
    "a) $120^\\circ$. b) $90^\\circ$. c) $60^\\circ$. d) $180^\\circ$.",
    ["a) $120^\\circ$", "b) $90^\\circ$", "c) $60^\\circ$", "d) $180^\\circ$"])

x = R(6 * 15, 9)
T.b("Los triángulos $ABC$ y $A'B'C'$ son semejantes. Si $AB=6$, $BC=9$ y $A'B'=10$, calcula $B'C'$ y la razón de semejanza.",
    f"$k=\\frac{{10}}{{6}}=\\frac{{5}}{{3}}$. $B'C'=9\\cdot\\frac{{5}}{{3}}=15$.",
    ["k=\\frac{10}{6}=\\frac{5}{3}$", "B'C'=9\\cdot\\frac{5}{3}=15$"])

T.b("Dos triángulos semejantes tienen razón de semejanza $k=3$. El pequeño tiene perímetro $14$ cm y área $6$ cm². Calcula perímetro y área del grande.",
    "Perímetro: $14\\cdot3=42$ cm. Área: $6\\cdot3^2=54$ cm².",
    ["=42$ cm", "=54$ cm²"])

T.b("Un mapa tiene escala $1:250\\,000$. Dos ciudades están a $6{,}4$ cm. ¿Qué distancia real hay? Otra ciudad está a $40$ km: ¿a cuántos cm se dibuja?",
    f"$6{{,}}4\\cdot250000=1\\,600\\,000$ cm $=16$ km. $40$ km $=4\\,000\\,000$ cm; $4\\,000\\,000:250\\,000=16$ cm.",
    ["=16$ km", "=16$ cm"])

T.b("En la figura, $r\\parallel s\\parallel t$ cortan a dos rectas. En una recta, los segmentos entre paralelas miden $3$ y $5$; en la otra, el primero mide $4{,}5$. ¿Cuánto mide el segundo?",
    f"Por Tales: $\\frac{{3}}{{5}}=\\frac{{4{{,}}5}}{{x}}\\Rightarrow x={D(5*4.5/3,2)}$.",
    [f"x={D(5*4.5/3,2)}$"])

T.b("¿Cómo cambian el área y el volumen de un cubo si su arista se multiplica por $2$? ¿Y si se divide entre $3$?",
    "Por $2$: el área se multiplica por $2^2=4$ y el volumen por $2^3=8$. Entre $3$: el área se divide entre $9$ y el volumen entre $27$.",
    ["$2^2=4$", "$2^3=8$"])

# ---- problemas ----
T.p("Un poste proyecta una sombra de $4{,}2$ m y, a la misma hora, una persona de $1{,}75$ m proyecta una sombra de $1{,}4$ m. ¿Qué altura tiene el poste?",
    f"Tales: $\\frac{{h}}{{4{{,}}2}}=\\frac{{1{{,}}75}}{{1{{,}}4}}\\Rightarrow h={D(4.2*1.75/1.4,2)}$ m.",
    [f"h={D(4.2*1.75/1.4,2)}$ m"])

T.p("En un plano a escala $1:150$ el salón mide $4{,}2$ cm por $3$ cm. Calcula las dimensiones reales y la superficie real en m².",
    f"$4{{,}}2\\cdot150=630$ cm $=6{{,}}3$ m y $3\\cdot150=450$ cm $=4{{,}}5$ m. Superficie: $6{{,}}3\\cdot4{{,}}5={D(6.3*4.5,2)}$ m².",
    [f"={D(6.3*4.5,2)}$ m²"])

T.p("Dos pantallas son semejantes. La pequeña mide $30$ cm de ancho y $40$ cm de alto y la grande tiene $90$ cm de ancho. ¿Cuánto mide de alto la grande y cuántas veces mayor es su área?",
    "Razón de semejanza: $k=\\frac{90}{30}=3$. Alto de la grande: $40\\cdot3=120$ cm. Su área es $k^2=9$ veces mayor: $90\\cdot120=10800$ cm² frente a $30\\cdot40=1200$ cm².",
    ["k=\\frac{90}{30}=3$", "=120$ cm", "$k^2=9$ veces"])

T.p("Una maqueta de un barco está a escala $1:60$. Si el barco mide $42$ m de eslora, ¿cuánto mide la maqueta? Si el casco de la maqueta tiene $0{,}5$ m² de superficie, ¿cuántos m² tiene el casco real?",
    f"Maqueta: $4200:60=70$ cm. Superficie real: $0{{,}}5\\cdot60^2={D(0.5*3600,0)}$ m².",
    ["=70$ cm", f"={D(0.5*3600,0)}$ m²"])

T.p("Halla las imágenes de los vértices del triángulo $A(1,1)$, $B(4,1)$, $C(1,3)$ tras girar $180^\\circ$ respecto del origen y luego trasladar con $\\vec v=(5,0)$. ¿Se conservan sus áreas?",
    "Giro de $180^\\circ$: $A'(-1,-1)$, $B'(-4,-1)$, $C'(-1,-3)$. Traslación: $A''(4,-1)$, $B''(1,-1)$, $C''(4,-3)$. Los movimientos conservan longitudes y áreas: el área sigue siendo $\\frac{3\\cdot2}{2}=3$.",
    ["A''(4,-1)", "B''(1,-1)", "C''(4,-3)"])

T.p("El punto $A(2,5)$ se transforma en $A'(-2,5)$ y $B(3,-1)$ en $B'(-3,-1)$. ¿Qué movimiento es? Halla el simétrico de $C(-4,7)$ con ese mismo movimiento.",
    "Cambia el signo de $x$: **simetría axial** respecto del eje $OY$. $C'=(4,7)$.",
    ["eje $OY$", "C'=(4,7)"])

T.p("Una fotografía de $10\\times15$ cm se amplía de modo que la copia tenga $24$ cm de alto. ¿Cuánto mide de ancho (se mantiene la forma)? ¿Cuántas veces aumenta el área?",
    f"El alto era $15$: $k=\\frac{{24}}{{15}}=1{{,}}6$. El ancho es $10\\cdot1{{,}}6=16$ cm. El área aumenta $1{{,}}6^2={D(1.6**2,2,False)}$ veces.",
    ["=16$ cm", f"{D(1.6**2,2,False)}$ veces"])

T.p("En un triángulo rectángulo de catetos $6$ y $8$, la altura sobre la hipotenusa mide $4{,}8$. Comprueba que los dos triángulos que forma son semejantes al grande y halla la razón con el de cateto $6$.",
    f"Hipotenusa: $10$. Los triángulos pequeños comparten un ángulo agudo con el grande y tienen un ángulo recto. Para el que tiene hipotenusa $6$: $k=\\frac{{6}}{{10}}=0{{,}}6$; su cateto mayor es $0{{,}}6\\cdot8=4{{,}}8$, que es la altura..",
    ["k=\\frac{6}{10}=0{,}6$"])

T.p("Dos jamones tienen la misma forma. El pequeño pesa $4$ kg y mide $30$ cm de largo. El grande pesa $32$ kg. ¿Cuánto mide de largo? (El peso es proporcional al volumen.)",
    "Los volúmenes están en razón $\\frac{32}{4}=8=k^3$, luego $k=2$. El grande mide $30\\cdot2=60$ cm de largo.",
    ["k=2$", "=60$ cm"])

T.p("Se quiere dibujar un cuadro de $2{,}4$ m $\\times$ $1{,}8$ m en un papel de $30\\times20$ cm sin deformarlo. ¿Qué escala es la máxima que se puede usar?",
    f"Escalas por lado: $\\frac{{30}}{{240}}=\\frac{{1}}{{8}}$ y $\\frac{{20}}{{180}}=\\frac{{1}}{{9}}$. Hay que usar la menor: $1:9$.",
    ["$1:9$"])

# ---- competenciales ----
T.c("**La altura del árbol.** Para medir un árbol, una niña de $1{,}5$ m se aleja del árbol hasta ver la copa alineada con la punta de un bastón de $2$ m clavado en el suelo. El bastón está a $3$ m de ella y a $12$ m del pie del árbol (los tres puntos del suelo en línea). a) Dibuja la situación con triángulos semejantes. b) Calcula la altura del árbol. c) Razona por qué los triángulos son semejantes.",
    f"b) Los ojos de la niña, la punta del bastón y la copa están alineados. Triángulos semejantes: $\\frac{{h-1{{,}}5}}{{2-1{{,}}5}}=\\frac{{15}}{{3}}\\Rightarrow h-1{{,}}5=2{{,}}5\\Rightarrow h=4$ m. c) Comparten un ángulo y los dos tienen un ángulo recto con el suelo (AA).",
    ["h=4$ m"])

T.c("**Reproducir un mosaico.** Un azulejo cuadrado se forma repitiendo cuatro veces una pieza, girada $90^\\circ$ cada vez alrededor del centro. a) ¿Cuántas copias de la pieza hacen falta para cerrar el giro completo? b) Si la pieza tiene un área de $25$ cm², ¿qué área y qué lado tiene el azulejo? c) Un muro de $2{,}4\\times1{,}8$ m se cubre con estos azulejos. ¿Cuántos hacen falta?",
    "a) $360:90=4$ copias. b) $4\\cdot25=100$ cm², es decir, lado $10$ cm. c) Filas: $240:10=24$ y columnas: $180:10=18$; son $24\\cdot18=432$ azulejos.",
    ["$360:90=4$ copias", "lado $10$ cm", "=432$ azulejos"])

T.c("**Zoom de un mapa digital.** Un mapa a escala $1:50\\,000$ se amplía en pantalla hasta una escala $1:10\\,000$. a) ¿Por cuánto se multiplican las longitudes? b) ¿Y las superficies? c) Un lago ocupaba $3$ cm² en la primera escala; ¿qué área ocupa en la segunda?",
    "a) $k=\\frac{50000}{10000}=5$. b) $k^2=25$. c) $3\\cdot25=75$ cm².",
    ["k=\\frac{50000}{10000}=5$", "=75$ cm²"])

T.c("**El dibujo de la Alhambra.** Un artesano repite un motivo en forma de triángulo con vértices $A(0,0)$, $B(2,0)$, $C(0,1)$. a) Traslada el motivo con $\\vec v=(3,0)$. b) Obtén su simétrico respecto del eje $OY$ del motivo original. c) Gira el motivo original $90^\\circ$ respecto del origen. Escribe las coordenadas de cada resultado.",
    "a) $A'(3,0)$, $B'(5,0)$, $C'(3,1)$. b) $A(0,0)$, $B''(-2,0)$, $C(0,1)$. c) $(x,y)\\to(-y,x)$: $A(0,0)$, $B'''(0,2)$, $C'''(-1,0)$.",
    ["A'(3,0)", "B''(-2,0)", "B'''(0,2)"])

T.chk(tr((2, 1), (-3, 4)) == (-1, 5) and tr((0, -5), (-3, 4)) == (-3, -1) and tr((-4, 3), (-3, 4)) == (-7, 7), "ex 1")
T.chk((-1 - 3, 6 + 2) == (-4, 8), "ex 2")
T.chk([(-y, x) for x, y in [(4, 1), (-2, 3), (0, -5)]] == [(-1, 4), (-3, -2), (5, 0)], "ex 3")
T.chk(R(10, 6) == R(5, 3) and 9 * R(5, 3) == 15 and 14 * 3 == 42 and 6 * 9 == 54, "ex 6-7")
T.chk(6.4 * 250000 / 100 / 1000 == 16 and 40 * 1000 * 100 / 250000 == 16, "ex 8")
T.chk(abs(5 * 4.5 / 3 - 7.5) < 1e-12, "ex 9")
T.chk(abs(4.2 * 1.75 / 1.4 - 5.25) < 1e-12, "ex 11")
T.chk(abs(6.3 * 4.5 - 28.35) < 1e-9, "ex 12")
T.chk(4200 / 60 == 70 and 0.5 * 3600 == 1800, "ex 14")
T.chk([(-x, -y) for x, y in [(1, 1), (4, 1), (1, 3)]] == [(-1, -1), (-4, -1), (-1, -3)] and [(x + 5, y) for x, y in [(-1, -1), (-4, -1), (-1, -3)]] == [(4, -1), (1, -1), (4, -3)], "ex 15")
T.chk(R(24, 15) * 10 == 16 and abs(1.6**2 - 2.56) < 1e-12, "ex 17")
T.chk(abs(0.6 * 8 - 4.8) < 1e-12 and abs(hypot(6, 8) - 10) < 1e-12 and 90 // 30 == 3 and 40 * 3 == 120 and 90 * 120 == 10800 and 30 * 40 == 1200 and 32 // 4 == 8 and 2**3 == 8 and 30 * 2 == 60, "ex 13, 18, 19")
T.chk(R(30, 240) == R(1, 8) and R(20, 180) == R(1, 9) and R(1, 9) < R(1, 8), "ex 20")
T.chk(R(15, 3) == 5 and 5 * R(1, 2) == R(5, 2) and R(5, 2) + R(3, 2) == 4, "ex 21")
T.chk(360 // 90 == 4 and 4 * 25 == 100 and 100**0.5 == 10 and 240 // 10 * (180 // 10) == 432, "ex 22")
T.chk(50000 // 10000 == 5 and 3 * 25 == 75, "ex 23")
T.chk([(-y, x) for x, y in [(0, 0), (2, 0), (0, 1)]] == [(0, 0), (0, 2), (-1, 0)], "ex 24")
T.cerrar()
