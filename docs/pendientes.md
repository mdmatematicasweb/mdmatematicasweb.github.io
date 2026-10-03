# Pendientes

Actualizado el 2026-10-02.

## Archivado (decisión del autor, se retoma cuando lo diga)

- Hacer el repositorio privado (GitHub Pro para Pages privadas, o Cloudflare Pages / Netlify desde un repo privado).
- Registrar la marca «MD Matemáticas» y el logo en la OEPM (clase 41, educación).
- Contacto público en el aviso legal (`licencia.qmd`).

## Publicado

`main` subido a `origin` el 2026-10-02 (`93ea8d2`). GitHub Pages despliega desde ahí.

## Hecho el 2026-10-01 (para revisar)

- **Simulacro PAU completo**: los 29 tipos de ejercicio (fases 3, 4 y 5: geometría, análisis y probabilidad con tabla N(0,1)). Al corregir, los ejercicios de geometría y análisis tienen «Ver gráfica».
- **Actividades interactivas de los temas 6–11** (43 módulos nuevos; 77 en total).
- **Soluciones breves de los 270 ejercicios PAU** (`scripts/ebau/soluciones/*.md`), comprobadas con sympy y plegadas bajo cada enunciado. Dos enunciados oficiales tienen datos incoherentes y llevan una nota: 2023 Extraordinaria suplente ej. 8b y 2023 Extraordinaria reserva ej. 7.
- **Gráficas JSXGraph** (`assets/gym/graficas.js`, carga diferida desde cdnjs): 3D en Rectas y planos, 2D en Aplicaciones de la derivada e Integrales. Ver la gráfica cuenta como ayuda.
- **Figuras de geometría** en los apuntes del tema 5 (posiciones relativas y simétrico).
- **Gráficas en más módulos**: 2D en Límites (infinito, en un punto, discontinuidades, asíntotas) y en la tangente de Derivadas; 3D en Vectores (producto, ángulo, áreas, puntos). Falta revisarlas a ojo en el navegador.
- **Callouts con estilo de marca** (borde negro, sombra dura, cabecera de color por tipo) en `styles.css`. Falta verlos en el navegador.
- **Figuras nuevas en la teoría** (`scripts/figuras/build.py`): discontinuidades, secante/tangente, derivabilidad, Rolle y valor medio, área con signo, Venn, simetría de la normal y regla 68-95-99,7. Temas 2–4 también tienen ya (determinante como área, sistemas 2D, vectores suma/proyección, producto vectorial y mixto); el tema 1 (matrices) sigue sin figuras.
- **Esbozos en las soluciones PAU**: 15 ejercicios «esboza…» llevan ahora su dibujo (SVG con la paleta de la marca) dentro de la solución plegada. Se generan con `python3 scripts/ebau/figuras.py` y luego `python3 scripts/ebau/build.py`.
- **Revisión didáctica** de los generadores 6–11: paso erróneo «1−P(X≤−1)» en la binomial, «F((−2))», `v=e^{-x}/(-1)` y el signo perdido en por partes, `ln(4/2)`, coeficientes «1», dos soluciones con «está», pares degenerados N=D en límites. `tidyTex` (gym.js) quita ahora `\frac{x}{1}`, `^{1}`, `((n))` y coeficientes 1 delante de `e`, `\cos`, `\left(`.
- **Formas exactas en «Ver solución»** de las respuestas `expr` de integrales (derivadas y límites ya las tenían).
- **PDF**: los callouts ya no muestran «?» (iconos desactivados en Typst).

## En curso (oculto)

- **Curso 2º Bachillerato Ciencias Sociales** (`2-bachillerato-ccss`): fase 0 hecha (esqueleto oculto, 11 temas). Plan y decisiones en `docs/superpowers/specs/2026-10-03-curso-ccss.md`. Fase 1 (apuntes): los 11 temas de apuntes (fase 1) están escritos y verificados con `scripts/ccss/verificar_NN.py` (`verificar_10.py` y `verificar_11.py` avisan de las diferencias entre la tabla de la normal y el valor exacto), pendientes de revisión. Fase 2: relaciones de ejercicios de los 11 temas (25 cada una: 9 básicos + 16 tipo PAU, 8 competenciales), escritas en tres lotes (01–04, 05–08, 09–11) con `scripts/ccss/verificar_ej_NN.py`, que exige cada resultado esperado dentro del bloque de su apartado (`_ej_comun.py`) y se prueba con mutaciones (`scripts/ccss/prueba_mutacion_ej.py`). Los temas 09–11 usan la tabla de la normal de `_tabla_normal.py` (comprobada contra los valores oficiales) y sus PAU valen 2 puntos sin opciones. Pendientes de revisión por el usuario. Fase 3 (actividades) hecha el 2026-10-04: 11 páginas en `actividades/2-bachillerato-ccss/` con 63 módulos (45 reutilizados de Ciencias sin lo que sale del currículo CCSS, y 18 propios en `assets/gym/ccss-*.js`), tabla N(0,1) de la Junta y verificadores independientes en `tests/verify-gym-ccss.js`; pendiente de revisión. Siguiente: fase 4 (PAU CCSS) cuando se apruebe.

## Siguiente

Nada pendiente de la lista anterior. Hecho el 2026-10-02: repaso de los textos de los temas 1–5 (`tidyTex` quita `1A`, `1n`, `\frac{…}{1}` tras «=», `\sqrt{1}` y `+(2)`). Idea suelta: revisar a ojo en el navegador las gráficas nuevas y los callouts.
