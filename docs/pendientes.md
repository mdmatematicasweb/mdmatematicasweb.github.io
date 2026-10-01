# Pendientes

Actualizado el 2026-10-01 (tarde).

## En espera (decisión del autor)

1. **Hacer el repositorio privado.** Opciones: GitHub Pro para Pages privadas, o publicar con Cloudflare Pages / Netlify desde un repo privado. Mientras el repo sea público, el código y los generadores se pueden ver.
2. **Registrar la marca «MD Matemáticas»** y el logo en la OEPM (clase 41, educación).
3. **Contacto en el aviso legal** (`licencia.qmd`): decidir qué dirección pública usar.
4. **Publicar**: todo está en commits locales en `main`, sin `git push`.

## Hecho el 2026-10-01 (para revisar)

- **Simulacro PAU completo**: los 29 tipos de ejercicio (fases 3, 4 y 5: geometría, análisis y probabilidad con tabla N(0,1)). Al corregir, los ejercicios de geometría y análisis tienen «Ver gráfica».
- **Actividades interactivas de los temas 6–11** (43 módulos nuevos; 77 en total).
- **Soluciones breves de los 270 ejercicios PAU** (`scripts/ebau/soluciones/*.md`), comprobadas con sympy y plegadas bajo cada enunciado. Dos enunciados oficiales tienen datos incoherentes y llevan una nota: 2023 Extraordinaria suplente ej. 8b y 2023 Extraordinaria reserva ej. 7.
- **Gráficas JSXGraph** (`assets/gym/graficas.js`, carga diferida desde cdnjs): 3D en Rectas y planos, 2D en Aplicaciones de la derivada e Integrales. Ver la gráfica cuenta como ayuda.
- **Figuras de geometría** en los apuntes del tema 5 (posiciones relativas y simétrico).
- **Gráficas en más módulos**: 2D en Límites (infinito, en un punto, discontinuidades, asíntotas) y en la tangente de Derivadas; 3D en Vectores (producto, ángulo, áreas, puntos). Falta revisarlas a ojo en el navegador.
- **Formas exactas en «Ver solución»** de las respuestas `expr` de integrales (derivadas y límites ya las tenían).
- **PDF**: los callouts ya no muestran «?» (iconos desactivados en Typst).

## Siguiente

6. **Revisión didáctica** de los textos de los generadores nuevos (ya se corrigieron los fallos tipográficos más comunes).
7. **Estilo de los callouts** (Solución, Advertencia): ahora usan el estilo por defecto de Quarto, redondeado; se podría pasar al estilo de la marca.
