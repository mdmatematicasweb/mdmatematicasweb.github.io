#!/usr/bin/env python3
"""Relación de ejercicios del tema 2 (Potencias y raíces)."""
from sympy import Rational as R, sqrt, cbrt, root, simplify, radsimp, nsimplify, Integer, latex, symbols
from _ej import Tema, L, D, miles

T = Tema(2, "02-potencias-raices", "Potencias y raíces")

# ---- básicos ----
a = R(2, 3)**-3; b = R(-2)**5; c = R(5)**-2; d = Integer(7)**0
T.b("Calcula: a) $(-2)^5$ b) $5^{-2}$ c) $\\left(\\frac{2}{3}\\right)^{-3}$ d) $7^0$ e) $-3^4$ f) $(-3)^4$.",
    f"a) ${L(b)}$. b) ${L(c)}$. c) $\\left(\\frac{{3}}{{2}}\\right)^3={L(a)}$. d) ${L(d)}$. e) $-81$ (el signo no entra en la base). f) $81$.",
    [f"${L(b)}$", f"${L(c)}$", f"={L(a)}$", "$-81$", "$81$"])

x = R(2)**7 * R(2)**-3 / R(2)**2
T.b("Simplifica y expresa como una sola potencia: $\\dfrac{2^7\\cdot2^{-3}}{2^2}$.",
    f"$2^{{7-3-2}}=2^2={L(x)}$.", ["$2^{7-3-2}=2^2=4$"])

v = R(3)**4 * R(3)**-2 * R(9)
T.b("Calcula escribiendo todo con base $3$: $\\dfrac{3^4\\cdot 9}{3^{2}}\\cdot 3^{-1}$.",
    f"$9=3^2$. Entonces $3^{{4+2-2-1}}=3^3={L(R(27))}$.", ["$3^{4+2-2-1}=3^3=27$"])

n1 = 4.5e7; n2 = 3.2e-5
T.b("Escribe en notación científica: a) $45\\,000\\,000$ b) $0{,}000\\,032$ c) $1\\,250\\,000\\,000$.",
    "a) $4{,}5\\cdot10^{7}$. b) $3{,}2\\cdot10^{-5}$. c) $1{,}25\\cdot10^{9}$.",
    ["4{,}5\\cdot10^{7}", "3{,}2\\cdot10^{-5}", "1{,}25\\cdot10^{9}"])

p = 3.2e5 * 2.5e-2
T.b("Calcula en notación científica: a) $(3{,}2\\cdot10^{5})\\cdot(2{,}5\\cdot10^{-2})$ b) $\\dfrac{6\\cdot10^{8}}{4\\cdot10^{3}}$ c) $5{,}1\\cdot10^{6}+8\\cdot10^{5}$.",
    "a) $3{,}2\\cdot2{,}5=8$ y $10^{5-2}=10^3$: $8\\cdot10^{3}$. b) $\\frac{6}{4}=1{,}5$ y $10^{8-3}=10^5$: $1{,}5\\cdot10^{5}$. c) $5{,}1\\cdot10^6+0{,}8\\cdot10^6=5{,}9\\cdot10^{6}$.",
    ["8\\cdot10^{3}", "1{,}5\\cdot10^{5}", "5{,}9\\cdot10^{6}"])

T.b("Calcula: a) $\\sqrt{169}$ b) $\\sqrt[3]{-64}$ c) $\\sqrt[4]{81}$ d) $\\sqrt{\\frac{49}{25}}$.",
    f"a) $13$ porque $13^2=169$. b) $-4$ porque $(-4)^3=-64$. c) $3$ porque $3^4=81$. d) $\\frac{{7}}{{5}}$.",
    ["a) $13$", "b) $-4$", "c) $3$", "\\frac{7}{5}$"])

T.b("Extrae factores del radical: a) $\\sqrt{75}$ b) $\\sqrt{180}$ c) $\\sqrt[3]{250}$.",
    f"a) $75=3\\cdot5^2$, luego $\\sqrt{{75}}={latex(sqrt(75))}$. b) $180=2^2\\cdot3^2\\cdot5$, luego $\\sqrt{{180}}={latex(sqrt(180))}$. c) $250=2\\cdot5^3$, luego $\\sqrt[3]{{250}}={latex(cbrt(250))}$.",
    [f"={latex(sqrt(75))}$", f"={latex(sqrt(180))}$", f"={latex(cbrt(250))}$"])

e1 = sqrt(48) + sqrt(12) - sqrt(75)
T.b("Calcula: $\\sqrt{48}+\\sqrt{12}-\\sqrt{75}$.",
    f"$\\sqrt{{48}}=4\\sqrt3$, $\\sqrt{{12}}=2\\sqrt3$ y $\\sqrt{{75}}=5\\sqrt3$. Resultado: $(4+2-5)\\sqrt3={latex(e1)}$.",
    [f"={latex(e1)}$"])

r1, r2 = radsimp(10 / sqrt(5)), radsimp(3 / (sqrt(7) - 2))
T.b("Racionaliza: a) $\\dfrac{10}{\\sqrt5}$ b) $\\dfrac{3}{\\sqrt7-2}$.",
    f"a) $\\frac{{10\\sqrt5}}{{5}}={latex(r1)}$. b) Multiplicando por el conjugado: $\\frac{{3(\\sqrt7+2)}}{{7-4}}={latex(r2)}$.",
    [f"={latex(r1)}$", f"={latex(r2)}$"])

T.b("Redondea $\\sqrt{7}$ a las centésimas y calcula el error absoluto y el error relativo (en %) de la aproximación.",
    f"$\\sqrt7=2{{,}}6457\\ldots\\approx2{{,}}65$. $E_a=|2{{,}}6457-2{{,}}65|\\approx{D(abs(7**0.5-2.65),4)}$. $E_r=\\frac{{{D(abs(7**0.5-2.65),4)}}}{{2{{,}}6457}}\\approx{D(abs(7**0.5-2.65)/7**0.5*100,2)}\\,\\%$.",
    [f"\\approx{D(abs(7**0.5-2.65),4)}$", f"\\approx{D(abs(7**0.5-2.65)/7**0.5*100,2)}"])

# ---- problemas ----
T.p("La luz del Sol tarda unos $500$ s en llegar a la Tierra y viaja a $3\\cdot10^{5}$ km/s. ¿A qué distancia está el Sol? Exprésalo en notación científica.",
    "$d=v\\cdot t=3\\cdot10^5\\cdot5\\cdot10^2=15\\cdot10^7=1{,}5\\cdot10^{8}$ km.", ["1{,}5\\cdot10^{8}$ km"])

T.p("Una bacteria se divide en dos cada hora. Si empezamos con $1$ bacteria, ¿cuántas hay a las $12$ horas? ¿Y a las $24$? Exprésalo con potencias y en notación científica aproximada.",
    f"A las $12$ h hay $2^{{12}}={miles(2**12)}$. A las $24$ h hay $2^{{24}}={miles(2**24)}\\approx1{{,}}68\\cdot10^{{7}}$.",
    [f"2^{{12}}={miles(2**12)}$", f"{miles(2**24)}"])

T.p("Un virus mide $1{,}2\\cdot10^{-7}$ m y una bacteria $3\\cdot10^{-6}$ m. ¿Cuántas veces es mayor la bacteria que el virus?",
    "$\\dfrac{3\\cdot10^{-6}}{1{,}2\\cdot10^{-7}}=2{,}5\\cdot10^{1}=25$ veces.", ["25$ veces"])

T.p("El lado de un cuadrado mide $\\sqrt{50}$ cm. Calcula su perímetro y su área, dando el perímetro simplificado.",
    f"Área: $(\\sqrt{{50}})^2=50$ cm². Perímetro: $4\\sqrt{{50}}=4\\cdot5\\sqrt2={latex(20*sqrt(2))}$ cm $\\approx{D(20*2**0.5,2)}$ cm.",
    ["50$ cm²", f"{latex(20*sqrt(2))}$ cm"])

T.p("Un cubo tiene volumen $216$ cm³. Calcula su arista y la longitud de su diagonal (diagonal de una cara $=a\\sqrt2$, diagonal del cubo $=a\\sqrt3$).",
    f"Arista: $\\sqrt[3]{{216}}=6$ cm. Diagonal del cubo: $6\\sqrt3={latex(6*sqrt(3))}\\approx{D(6*3**0.5,2)}$ cm.",
    ["6$ cm", f"{latex(6*sqrt(3))}"])

T.p("Un campo cuadrado tiene $2\\,401$ m² de superficie. Calcula su lado y cuántos metros de valla necesita.",
    "Lado: $\\sqrt{2401}=49$ m. Valla: $4\\cdot49=196$ m.", ["49$ m", "196$ m"])

x = R(5)**3 * R(5)**-5 * R(5)**4
T.p("Simplifica y calcula: $\\dfrac{(2^3)^2\\cdot 4^{-1}}{2^{5}}$. Después, escribe el resultado como fracción.",
    f"$4^{{-1}}=2^{{-2}}$. Entonces $\\frac{{2^6\\cdot2^{{-2}}}}{{2^5}}=2^{{6-2-5}}=2^{{-1}}={L(R(1,2))}$.",
    ["2^{6-2-5}=2^{-1}=\\frac{1}{2}"])

T.p("La masa de la Tierra es $5{,}97\\cdot10^{24}$ kg y la de la Luna $7{,}35\\cdot10^{22}$ kg. ¿Cuántas veces es mayor la masa de la Tierra? ¿Cuánta masa tienen entre las dos?",
    f"Cociente: $\\frac{{5{{,}}97\\cdot10^{{24}}}}{{7{{,}}35\\cdot10^{{22}}}}\\approx{D(5.97/7.35*100,1)}$ veces. Suma: $5{{,}}97\\cdot10^{{24}}+0{{,}}0735\\cdot10^{{24}}=6{{,}}0435\\cdot10^{{24}}$ kg.",
    [f"\\approx{D(5.97/7.35*100,1)}$ veces", "6{,}0435\\cdot10^{24}$ kg"])

T.p("Calcula el perímetro de un rectángulo de lados $\\sqrt{18}$ cm y $\\sqrt{8}$ cm, y su área. Da los resultados simplificados.",
    f"$\\sqrt{{18}}=3\\sqrt2$ y $\\sqrt8=2\\sqrt2$. Perímetro: $2(3\\sqrt2+2\\sqrt2)=10\\sqrt2$ cm. Área: $3\\sqrt2\\cdot2\\sqrt2=12$ cm².",
    ["10\\sqrt2$ cm", "12$ cm²"])

T.p("Halla el valor exacto de $\\left(\\sqrt{5}+\\sqrt{3}\\right)\\left(\\sqrt5-\\sqrt3\\right)$ y de $\\left(\\sqrt5+\\sqrt3\\right)^2$.",
    f"La primera es una diferencia de cuadrados: $5-3=2$. La segunda: $5+2\\sqrt{{15}}+3={latex(8+2*sqrt(15))}$.",
    ["$5-3=2$", f"{latex(8+2*sqrt(15))}"])

# ---- competenciales ----
T.c("**Doblar un folio.** Un folio tiene un grosor de $0{,}1$ mm $=1\\cdot10^{-4}$ m. Si lo doblas por la mitad $n$ veces, el grosor se duplica cada vez. a) ¿Qué grosor tiene tras $10$ dobleces? b) ¿Y tras $42$ dobleces, aproximadamente (en notación científica)? c) La distancia de la Tierra a la Luna es de $3{,}84\\cdot10^{8}$ m. ¿Se llega a la Luna con $42$ dobleces?",
    f"a) $10^{{-4}}\\cdot2^{{10}}=1{{,}}024\\cdot10^{{-1}}$ m $\\approx0{{,}}1$ m. b) $10^{{-4}}\\cdot2^{{42}}\\approx4{{,}}4\\cdot10^{{8}}$ m. c) Sí: $4{{,}}4\\cdot10^8>3{{,}}84\\cdot10^8$ (en la práctica no es posible doblar tanto un folio).",
    ["1{,}024\\cdot10^{-1}", "4{,}4\\cdot10^{8}", "Sí"])

T.c("**Memoria del móvil.** Un archivo de fotos ocupa $2^{23}$ bytes. Un móvil tiene $64$ GB, es decir, $64\\cdot2^{30}$ bytes. a) ¿Cuántas fotos caben? Escribe el cociente como potencia de $2$. b) Si cada foto ocupa $2^{23}$ bytes y se hacen $50$ fotos al día, ¿para cuántos días llega (redondea hacia abajo)?",
    f"a) $\\frac{{64\\cdot2^{{30}}}}{{2^{{23}}}}=2^{{6+30-23}}=2^{{13}}={miles(2**13)}$ fotos. b) ${miles(2**13)}:50={2**13//50}$ días.",
    [f"2^{{13}}={miles(2**13)}$ fotos", f"={2**13//50}$ días"])

T.c("**Una pantalla.** Una televisión de $55$ pulgadas es de formato $16:9$. La diagonal $d$, el ancho $16k$ y el alto $9k$ cumplen $d^2=(16k)^2+(9k)^2$. a) Calcula $k$ en pulgadas. b) Calcula el ancho y el alto. (Una pulgada son $2{,}54$ cm.) c) Da el área de la pantalla en m².",
    f"a) $55^2=337k^2\\Rightarrow k=\\frac{{55}}{{\\sqrt{{337}}}}\\approx{D(55/337**0.5,3)}$ pulgadas. b) Ancho $\\approx{D(16*55/337**0.5,1)}$ in $={D(16*55/337**0.5*2.54,1)}$ cm; alto $\\approx{D(9*55/337**0.5,1)}$ in $={D(9*55/337**0.5*2.54,1)}$ cm. c) $A\\approx{D(16*55/337**0.5*2.54/100*9*55/337**0.5*2.54/100,3)}$ m².",
    [f"\\approx{D(55/337**0.5,3)}$ pulgadas", f"{D(16*55/337**0.5*2.54,1)}$ cm", f"{D(16*55/337**0.5*2.54/100*9*55/337**0.5*2.54/100,3)}$ m²"])

T.c("**El Sol y la Tierra a escala.** El diámetro del Sol es $1{,}39\\cdot10^{9}$ m y el de la Tierra $1{,}27\\cdot10^{7}$ m. a) ¿Cuántas veces cabe el diámetro de la Tierra en el del Sol? b) Si el Sol se representara con una pelota de $1$ m de diámetro, ¿cuántos milímetros mediría la Tierra? c) La Tierra está a $1{,}5\\cdot10^{11}$ m del Sol. En esa misma maqueta, ¿a cuántos metros de la pelota habría que colocarla?",
    f"a) $\\frac{{1{{,}}39\\cdot10^9}}{{1{{,}}27\\cdot10^7}}\\approx{D(1.39e9/1.27e7,0)}$ veces. b) $\\frac{{1{{,}}27\\cdot10^7}}{{1{{,}}39\\cdot10^9}}\\cdot1000\\approx{D(1.27e7/1.39e9*1000,1)}$ mm. c) La escala es $1:1{{,}}39\\cdot10^9$, así que $\\frac{{1{{,}}5\\cdot10^{{11}}}}{{1{{,}}39\\cdot10^9}}\\approx{D(1.5e11/1.39e9,0)}$ m.",
    [f"\\approx{D(1.39e9/1.27e7,0)}$ veces", f"\\approx{D(1.27e7/1.39e9*1000,1)}$ mm", f"\\approx{D(1.5e11/1.39e9,0)}$ m"])

T.cerrar()
