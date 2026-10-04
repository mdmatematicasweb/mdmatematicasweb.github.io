#!/usr/bin/env python3
"""Añade (o actualiza) al final de cada tema de apuntes de 3º ESO el apartado «Debes saber hacer» y los saberes básicos del BOJA.

Uso:  python3 scripts/eso3/objetivos_apuntes.py
Saberes: Orden de 30 de mayo de 2023 (BOJA nº 104), Anexo II, Matemáticas, 3.º ESO (códigos MAT.3.X.n.m).
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MARCA = "<!-- objetivos -->"

T = {
    "01-numeros-racionales": ("A.2.3, A.2.4, A.3.2, A.3.5, A.4.1, A.4.2",
        ["Descomponer en factores primos y calcular el m.c.d. y el m.c.m., y usarlos en problemas.",
         "Simplificar, comparar y ordenar fracciones, y reducirlas a común denominador.",
         "Sumar, restar, multiplicar y dividir fracciones, y resolver operaciones combinadas con la jerarquía correcta.",
         "Pasar una fracción a decimal y clasificar el decimal (exacto, periódico puro o mixto).",
         "Hallar la fracción generatriz de un decimal exacto o periódico.",
         "Resolver problemas con fracciones de una cantidad."]),
    "02-potencias-raices": ("A.2.1, A.2.3, A.2.2, A.3.3, A.3.5",
        ["Calcular potencias de exponente entero (positivo, cero y negativo) y aplicar sus propiedades.",
         "Expresar números muy grandes o muy pequeños en notación científica y operar con ellos.",
         "Calcular raíces, escribirlas como potencias y extraer factores de un radical.",
         "Sumar, restar, multiplicar y racionalizar radicales sencillos.",
         "Aproximar un número y calcular el error absoluto y el error relativo."]),
    "03-progresiones": ("D.1.1, A.4.4, D.2.1",
        ["Hallar la regla de formación de una sucesión y calcular términos.",
         "Reconocer progresiones aritméticas y geométricas y obtener su término general.",
         "Calcular la suma de los $n$ primeros términos de una progresión aritmética o geométrica.",
         "Calcular la suma de infinitos términos de una progresión geométrica con $|r|<1$.",
         "Resolver problemas con progresiones (ahorro, crecimiento, interés compuesto)."]),
    "04-proporcionalidad": ("A.5.1, A.5.2, A.5.3, A.2.5, A.6.1, A.6.2",
        ["Distinguir la proporcionalidad directa de la inversa y resolver reglas de tres simples y compuestas.",
         "Calcular porcentajes, aumentos y disminuciones porcentuales con índices de variación.",
         "Encadenar variaciones porcentuales y deshacer un aumento o un descuento.",
         "Calcular interés simple e interés compuesto.",
         "Comparar ofertas con el precio unitario, interpretar facturas (IVA) y usar escalas y cambios de divisas."]),
    "05-polinomios": ("D.2.1, D.2.2, D.3, D.4.2",
        ["Traducir enunciados al lenguaje algebraico y calcular el valor numérico de una expresión.",
         "Sumar, restar y multiplicar polinomios.",
         "Desarrollar y reconocer las identidades notables.",
         "Dividir polinomios y comprobar el resultado; relacionar el resto con el valor numérico.",
         "Factorizar sacando factor común, con identidades notables o por sus raíces."]),
    "06-ecuaciones": ("D.4.1, D.4.3, D.4.4, D.2.2",
        ["Resolver ecuaciones de primer grado con paréntesis y denominadores.",
         "Resolver ecuaciones de segundo grado, completas e incompletas, y usar el discriminante.",
         "Plantear y resolver problemas con ecuaciones e interpretar la solución en el contexto.",
         "Comprobar las soluciones y descartar las que no tienen sentido."]),
    "07-sistemas-ecuaciones": ("D.4.1, D.4.3, D.2.1, D.2.2",
        ["Resolver un sistema 2×2 por sustitución, igualación y reducción.",
         "Clasificar un sistema (una solución, infinitas o ninguna) y relacionarlo con la posición de las rectas.",
         "Resolver sistemas sencillos con una ecuación de segundo grado.",
         "Plantear y resolver problemas con sistemas de ecuaciones."]),
    "08-lugares-geometricos": ("B.2.1, C.1.2, C.1.3, C.2, C.4.1",
        ["Aplicar el teorema de Pitágoras para hallar lados, diagonales y distancias entre puntos.",
         "Reconocer la circunferencia, la mediatriz y la bisectriz como lugares geométricos.",
         "Situar el circuncentro, el incentro, el baricentro y el ortocentro de un triángulo.",
         "Calcular perímetros y áreas de figuras planas, de sectores circulares y de figuras compuestas."]),
    "09-movimientos-semejanzas": ("C.3, C.1.2, C.4.2, F.3.3",
        ["Aplicar una traslación, un giro o una simetría a un punto o a una figura y escribir sus coordenadas.",
         "Reconocer los movimientos y las simetrías en mosaicos y en el arte andalusí.",
         "Aplicar el teorema de Tales y los criterios de semejanza de triángulos.",
         "Usar escalas y la razón de semejanza: las longitudes se multiplican por $k$, las áreas por $k^2$ y los volúmenes por $k^3$."]),
    "10-cuerpos-geometricos": ("B.2.1, B.2.2, C.1.1, B.1",
        ["Reconocer prismas, pirámides, cilindros, conos y esferas, y comprobar la relación de Euler.",
         "Calcular áreas laterales y totales de los cuerpos geométricos.",
         "Calcular volúmenes y pasarlos a capacidades (litros).",
         "Resolver problemas de la vida real con cuerpos geométricos."]),
    "11-funciones": ("D.5.1, D.5.3, D.3",
        ["Reconocer si una correspondencia es una función y expresarla con tabla, fórmula o gráfica.",
         "Calcular el dominio y el recorrido de funciones sencillas.",
         "Hallar puntos de corte, crecimiento, extremos y simetría en una gráfica.",
         "Calcular e interpretar la tasa de variación media.",
         "Interpretar gráficas de situaciones reales."]),
    "12-funciones-lineales-cuadraticas": ("D.5.2, D.4.1, D.5.1",
        ["Representar rectas y hallar su ecuación a partir de dos puntos o de un punto y la pendiente.",
         "Reconocer rectas paralelas y hallar el punto de corte de dos rectas.",
         "Hallar vértice, eje de simetría y cortes de una parábola y representarla.",
         "Resolver problemas con funciones lineales y cuadráticas (tarifas, máximos y mínimos).",
         "Distinguir una tabla lineal de una cuadrática."]),
    "13-estadistica": ("E.1.1, E.1.2, E.1.3, E.1.4, E.1.5, E.1.6, E.1.7, E.3",
        ["Distinguir población y muestra, y tipos de variables.",
         "Construir tablas de frecuencias y representarlas en gráficos adecuados.",
         "Calcular e interpretar media, mediana, moda y cuartiles.",
         "Calcular el rango, la varianza y la desviación típica, y comparar dos conjuntos de datos.",
         "Detectar gráficos y muestras engañosos."]),
    "14-probabilidad": ("E.2.1, E.2.2, E.2.3, B.2.4",
        ["Distinguir fenómenos deterministas y aleatorios, y describir el espacio muestral y los sucesos.",
         "Calcular probabilidades con la regla de Laplace.",
         "Aplicar el suceso contrario y la probabilidad de la unión.",
         "Usar diagramas en árbol y técnicas de recuento en experimentos compuestos.",
         "Relacionar la frecuencia relativa con la probabilidad."]),
}

for carpeta, (saberes, items) in T.items():
    f = ROOT / "apuntes" / "3-eso" / carpeta / "index.qmd"
    txt = f.read_text()
    if MARCA in txt:
        txt = txt[:txt.index(MARCA)].rstrip() + "\n"
    cod = ", ".join("MAT.3." + c for c in [s.strip() for s in saberes.split(",")])
    bloque = (f"\n{MARCA}\n## Debes saber hacer\n\n" + "\n".join(f"- {i}" for i in items) +
              f"\n\n::: {{.callout-note collapse=\"true\"}}\n## Saberes básicos del currículo\nSaberes de la Orden de 30 de mayo de 2023 (BOJA nº 104) que se trabajan en este tema: {cod}.\n:::\n")
    f.write_text(txt.rstrip() + "\n" + bloque)
    print("actualizado", f.relative_to(ROOT))
