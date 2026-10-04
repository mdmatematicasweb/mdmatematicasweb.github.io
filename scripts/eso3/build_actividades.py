#!/usr/bin/env python3
"""Genera actividades/3-eso/NN-…/index.qmd (páginas de ejercicios interactivos) y el índice de actividades de 3º ESO.

Uso:  python3 scripts/eso3/build_actividades.py
Los módulos están en assets/gym/eso3-*.js; sus verificadores, en tests/verify-gym-eso3.js (node tests/gym-eso3.test.js).
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DIR = ROOT / "actividades" / "3-eso"

INTRO = ("Cada bloque genera ejercicios nuevos al azar y los corrige al instante en el navegador. Las opciones empiezan en **Aleatorio**; "
         "elige una concreta si quieres practicar sólo ese caso. **Ayuda** muestra la teoría en dos pasos (no suma ni quita racha), escribe la respuesta "
         "(enteros, fracciones `a/b` o decimales con coma) y pulsa **Comprobar** (o Intro). **Ver resolución** muestra el procedimiento paso a paso; "
         "usar ayuda rompe la racha. **Modo clase** pone el ejercicio a pantalla completa para proyectarlo.")

# (carpeta, título, fichero de módulos, [(encabezado, módulo)])
TEMAS = [
    ("01-numeros-racionales", "Números racionales", "eso3-numeros", [("m.c.d. y m.c.m.", "eso3-mcd-mcm"), ("Operaciones con fracciones", "eso3-frac-operar"), ("Fracción generatriz", "eso3-frac-generatriz"), ("Fracciones en problemas", "eso3-frac-problema")]),
    ("02-potencias-raices", "Potencias y raíces", "eso3-numeros", [("Potencias de exponente entero", "eso3-pot-calculo"), ("Notación científica", "eso3-notacion"), ("Radicales", "eso3-radicales")]),
    ("03-progresiones", "Sucesiones y progresiones", "eso3-numeros", [("Progresión aritmética", "eso3-prog-aritmetica"), ("Progresión geométrica", "eso3-prog-geometrica"), ("Progresiones en problemas", "eso3-prog-problema")]),
    ("04-proporcionalidad", "Proporcionalidad numérica", "eso3-numeros", [("Proporcionalidad directa, inversa y compuesta", "eso3-prop-regla3"), ("Porcentajes", "eso3-porcentajes"), ("Interés simple y compuesto", "eso3-interes")]),
    ("05-polinomios", "Lenguaje algebraico y polinomios", "eso3-algebra", [("Valor numérico", "eso3-pol-valor"), ("Operaciones e identidades notables", "eso3-pol-operar"), ("División de polinomios", "eso3-pol-division"), ("Raíces y factorización", "eso3-pol-factorizar")]),
    ("06-ecuaciones", "Ecuaciones de primer y segundo grado", "eso3-algebra", [("Ecuaciones de primer grado", "eso3-ec-1grado"), ("Ecuaciones de segundo grado", "eso3-ec-2grado"), ("Número de soluciones: el discriminante", "eso3-ec-discriminante"), ("Problemas con ecuaciones", "eso3-ec-problema")]),
    ("07-sistemas-ecuaciones", "Sistemas de ecuaciones", "eso3-algebra", [("Resolver un sistema", "eso3-sis-resolver"), ("Clasificar un sistema", "eso3-sis-clasificar"), ("Problemas con sistemas", "eso3-sis-problema")]),
    ("08-lugares-geometricos", "Lugares geométricos, áreas y perímetros", "eso3-geometria", [("Teorema de Pitágoras", "eso3-pitagoras"), ("Distancia entre puntos", "eso3-distancia"), ("Áreas de figuras planas", "eso3-areas")]),
    ("09-movimientos-semejanzas", "Movimientos y semejanzas", "eso3-geometria", [("Traslaciones, giros y simetrías", "eso3-movimientos"), ("Teorema de Tales", "eso3-tales"), ("Semejanza y escalas", "eso3-semejanza")]),
    ("10-cuerpos-geometricos", "Cuerpos geométricos", "eso3-geometria", [("Relación de Euler", "eso3-euler"), ("Volumen", "eso3-volumen"), ("Área total", "eso3-area-cuerpos")]),
    ("11-funciones", "Funciones", "eso3-funciones", [("Valor de una función", "eso3-fun-valor"), ("Dominio", "eso3-fun-dominio"), ("Tasa de variación media", "eso3-fun-tvm"), ("Tipo de función por su tabla", "eso3-fun-tabla")]),
    ("12-funciones-lineales-cuadraticas", "Funciones lineales y cuadráticas", "eso3-funciones", [("Ecuación de la recta", "eso3-recta"), ("Cortes de la recta con los ejes", "eso3-recta-cortes"), ("Funciones lineales en problemas", "eso3-recta-problema"), ("Vértice de una parábola", "eso3-parabola"), ("Cortes de la parábola con el eje X", "eso3-parabola-cortes")]),
    ("13-estadistica", "Estadística", "eso3-estadistica", [("Media, mediana y moda", "eso3-est-central"), ("Tablas de frecuencias", "eso3-est-tabla"), ("Medidas de dispersión", "eso3-est-dispersion"), ("Frecuencias, porcentajes y sectores", "eso3-est-frecuencias")]),
    ("14-probabilidad", "Probabilidad", "eso3-estadistica", [("Regla de Laplace", "eso3-prob-laplace"), ("Unión, intersección y contrario", "eso3-prob-union"), ("Experimentos compuestos", "eso3-prob-compuesta"), ("Técnicas de recuento", "eso3-prob-recuento")]),
]

HEAD = """---
title: "{titulo} — ejercicios interactivos"
format:
  html:
    include-in-header:
      - text: |
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
          <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
    css: ../../../assets/gym/gym.css
---

"""

TAIL = """
<script src="../../../assets/gym/gym.js"></script>
<script src="../../../assets/gym/eso3-base.js"></script>
<script src="../../../assets/gym/{fichero}.js"></script>
<script>document.addEventListener("DOMContentLoaded", function () {{ MDGym.mountAll(); }});</script>
"""

for carpeta, titulo, fichero, mods in TEMAS:
    out = HEAD.format(titulo=titulo) + INTRO + "\n\n"
    for h, m in mods:
        out += f"## {h}\n\n<div data-gym=\"{m}\"></div>\n\n"
    out += TAIL.format(fichero=fichero)
    d = DIR / carpeta
    d.mkdir(parents=True, exist_ok=True)
    (d / "index.qmd").write_text(out)
    print("escrito", (d / "index.qmd").relative_to(ROOT))

idx = ['---\ntitle: "Actividades — 3º ESO"\n---\n\nEjercicios interactivos que generan retos al azar y los corrigen en el navegador (14 temas, 50 módulos).\n']
for i, (carpeta, titulo, _, mods) in enumerate(TEMAS, 1):
    idx.append(f"{i}. [{titulo}]({carpeta}/index.qmd): " + ", ".join(h[0].lower() + h[1:] for h, _ in mods) + ".")
(DIR / "index.qmd").write_text("\n".join(idx) + "\n")
print("escrito", (DIR / "index.qmd").relative_to(ROOT))
