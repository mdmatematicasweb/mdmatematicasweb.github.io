# Fase 3 · Actividades interactivas del curso Ciencias Sociales

Estado: en curso (rama `claude/serene-cray-7a24d0`). Curso oculto; pendiente de revisión del autor al terminar.

## Diseño

- Mismo motor que Ciencias (`assets/gym/gym.js`). Dos tipos de módulo:
  - **Reutilizados** (`cs-<origen>`): `assets/gym/ccss.js` envuelve con `G.reuse()` los módulos de Ciencias que encajan en el currículo CCSS, quita las opciones fuera de él (matrices 4×4, L'Hôpital, trigonometría, integrales por partes, etc.) y descarta los retos que mencionan funciones trigonométricas. Su verificador es el del módulo de origen (`G.ccssAlias`).
  - **Propios** (`ccss-*`): `assets/gym/ccss-algebra.js` (temas 1–3), `ccss-funciones.js` (tema 4 y contextos de los temas 6 y 8), `ccss-inferencia.js` (tema 11). Verificadores independientes en `tests/verify-gym-ccss.js`.
- Estadísticas de racha separadas de las de Ciencias (clave `mdgym:cs-…`).
- La tabla N(0,1) de las actividades es la del examen de la Junta (4 decimales hasta z = 2,6 y 5 desde 2,7): `G.normalTableCCSS`. Los textos de los pasos de los módulos reutilizados de distribuciones muestran 4 decimales también para z ≥ 2,7; la respuesta se acepta con tolerancia de 5·10⁻⁴ y vale con 4 o 5 decimales.
- Páginas: `actividades/2-bachillerato-ccss/NN-…/index.qmd`. `tests/ccss-paginas.test.js` comprueba que todos los `data-gym` existen y son `cs-*`/`ccss-*`.

## Pruebas

- `node tests/gym.test.js` (todo el motor, incluidos los módulos CCSS; `GYM_N` controla los retos por combinación).
- `node tests/ccss-paginas.test.js`.

## Qué incluye cada tema

| Tema | Módulos |
|---|---|
| 1 | reutilizados: operaciones, producto, determinante (≤3×3), inversa, rango, matriz con parámetro, ecuaciones matriciales · propios: matrices en contexto |
| 2 | reutilizados: clasificar, resolver (Gauss/Cramer), planteamiento · propios: sistema 3×3 en contexto |
| 3 | propios: vértices, óptimo de una región, problema de programación lineal (con gráfica) |
| 4 | propios: dominio, parábola, función a trozos, exponencial y logaritmo, rentabilidad |
| 5 | reutilizados: límites en el infinito y en un punto, ∞−∞, continuidad con parámetro, tipo de discontinuidad, asíntotas |
| 6 | reutilizados: reglas, tangente, a trozos, parámetros · propios: coste marginal |
| 7 | reutilizados: críticos, monotonía, inflexión, absolutos, parámetros, optimización |
| 8 | reutilizados: primitivas, Barrow, primitiva por un punto, áreas · propios: del coste marginal al coste total |
| 9 | reutilizados: Laplace, unión/intersección, condicionada, independencia, tablas, total, Bayes, extracciones |
| 10 | reutilizados: binomial, parámetros, tipificación, tabla, normal, inversa, aproximación |
| 11 | propios: media muestral, IC media, IC proporción, tamaño mínimo, valor crítico, relación confianza-error-tamaño |
