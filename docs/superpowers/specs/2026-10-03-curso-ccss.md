# Curso 2º Bachillerato · Ciencias Sociales (Matemáticas Aplicadas a las CC. SS. II)

Estado: **fase 0 hecha** (esqueleto oculto). Curso oculto hasta completarlo.

## Decisiones

- Slug: `2-bachillerato-ccss`. Título visible: «2º Bachillerato Ciencias Sociales».
- Mismas tres áreas que Ciencias: `apuntes/`, `ejercicios/`, `actividades/` (+ `ejercicios/…/ebau/` en la fase 4 y `actividades/…/examen/` en la fase 5).
- Oculto con `"!**/2-bachillerato-ccss/**"` en `render` de `_quarto.yml` (como 3º ESO). Las secciones de barra lateral están preparadas y comentadas.
- Portada (`index.qmd`) y selector de curso: fase 6. No se toca antes.
- Exámenes PAU: web de la Junta de Andalucía. Soluciones verificadas con sympy, igual que en Ciencias.
- Trabajo en la rama `claude/serene-cray-7a24d0`; sin tocar `main` y sin PR.

## Fuente del currículo

«Orientaciones PAU 2025-2026, Matemáticas Aplicadas a las CC. SS. II» (Junta de Andalucía, `sel_2025-2026-Orientaciones_matematicas_aplicadas.pdf`), leído por el autor. El contraste de hipótesis **no** entra.

## Temas (11)

| # | Carpeta | Contenidos |
|---|---|---|
| 1 | `01-matrices-determinantes` | Matrices y determinantes hasta orden 3: operaciones, rango, inversa, ecuaciones matriciales con la inversa |
| 2 | `02-sistemas-ecuaciones-lineales` | Gauss, regla de Cramer (3×3), modelización con matrices |
| 3 | `03-programacion-lineal` | Región factible, vértices, solución óptima |
| 4 | `04-funciones` | Polinómicas, racionales, exponenciales, logarítmicas y a trozos; estudio y representación gráfica |
| 5 | `05-limites-continuidad` | Límites y continuidad; discontinuidades evitable, de salto finito y de salto infinito |
| 6 | `06-derivadas` | Cadena, irracionales, derivabilidad a trozos, derivadas laterales, recta tangente, hallar coeficientes |
| 7 | `07-aplicaciones-derivada` | Extremos, inflexión, concavidad, optimización |
| 8 | `08-integrales` | Primitivas inmediatas simples y compuestas, Barrow, áreas entre curvas |
| 9 | `09-probabilidad` | Condicionada, independencia, árbol, tablas de contingencia, total, Bayes, Venn |
| 10 | `10-distribuciones` | Binomial y normal; aproximación binomial→normal (n·p ≥ 5 y n·(1−p) ≥ 5) con corrección por continuidad |
| 11 | `11-muestreo-inferencia` | Muestreo, estimación puntual y por intervalo, IC para la media (σ conocida) y la proporción, tamaño muestral mínimo, relación confianza-error-tamaño |

## Formato del examen (para el simulacro, fase 5)

4 ejercicios, 1 h 30 min.

- Ej. 1: álgebra (3 pts, opción a/b).
- Ej. 2: análisis (3 pts, opción a/b).
- Ej. 3 y 4: estadística (2 pts cada uno).
- Dan la tabla de la normal. Calculadora no programable ni gráfica. Muestras grandes n ≥ 30.

## Fases

0. Esqueleto y ocultación (hecha).
1. Apuntes de los 11 temas (figuras y PDF Typst heredado de `apuntes/_metadata.yml`).
2. Relaciones de 25 ejercicios por tema, con soluciones verificadas con sympy.
3. Actividades interactivas (módulos `assets/gym/` propios del curso) y sus `tests/verify-*`.
4. PAU CCSS: exámenes oficiales de la Junta en `assets/pau-ccss/`, datos y soluciones en `scripts/ebau/` (parametrizar `build.py` por curso; los slugs de examen chocan con los de Ciencias).
5. Simulacro PAU CCSS (catálogo de tipos propio, pruebas).
6. Portada con selector de curso, navbar, barras laterales, índices raíz, README y `pendientes.md`; quitar la exclusión de `render`.

Cada fase termina con revisión del autor antes de seguir.
