# Curso «2º Bachillerato · Matemáticas Aplicadas a las Ciencias Sociales II» (`2-bachillerato-ccss`)

Si el usuario dice «seguimos con lo pendiente»: lee `docs/pendientes.md` (estado) y
`docs/superpowers/specs/2026-10-03-curso-ccss.md` (plan y decisiones), y **pregunta si la última entrega está revisada
antes de empezar la siguiente fase**. Se trabaja fase a fase, con revisión del usuario al acabar cada una.

## Reglas fijas

- Trabajar solo en la rama `claude/serene-cray-7a24d0`. No tocar `main`. No crear PR. Un commit por tema.
- Mantener el curso oculto: `"!**/2-bachillerato-ccss/**"` en `render` de `_quarto.yml`. No tocar la portada ni los índices
  raíz hasta la fase 6.
- No descargar exámenes reales. No crear `ebau/` ni la tabla de exámenes reales hasta la fase 4.
- Slug `2-bachillerato-ccss`, título visible «Ciencias Sociales». 11 temas (01-matrices-determinantes … 11-muestreo-inferencia).
  No hay contraste de hipótesis. La t de Student es solo «Ampliación».
- Examen real: 4 ejercicios, 1 h 30 min. Ej. 1 álgebra (3 pts, opción a/b), ej. 2 análisis (3 pts, opción a/b),
  ej. 3 y 4 estadística (2 pts cada uno, **sin opciones**). Tabla de la normal, calculadora no programable ni gráfica, n ≥ 30.

## Fases

0 esqueleto (hecha) · 1 apuntes de los 11 temas (hecha) · 2 relaciones de ejercicios de los 11 temas (hecha, lotes 01–04,
05–08, 09–11; pendiente de revisión) · 3 actividades · 4 PAU CCSS (`assets/pau-ccss/`, `scripts/ebau`) · 5 simulacro ·
6 portada, navbar, sidebar y quitar la exclusión de `render`.

## Cómo se trabaja cada ejercicio o tema

- Primero se calcula con sympy (diseño y resultados), después se escribe el texto.
- Cada relación `ejercicios/2-bachillerato-ccss/NN-…/index.qmd` tiene 25 ejercicios: 9 básicos y 16 «Tipo PAU», con
  8 competenciales, soluciones colapsables paso a paso e interpretadas, y notación de la Junta (`A^C`, `A − B = A ∩ B^C`,
  convexa si f''>0 y cóncava si f''<0, `ln` y `log`). Fracciones siempre como `\frac{p}{q}`. Enunciados originales.
- Cada tema tiene `scripts/ccss/verificar_ej_NN.py` con el verificador por apartados de `scripts/ccss/_ej_comun.py`: cada
  resultado esperado debe aparecer dentro del bloque de su apartado, con recuentos exactos y mutación integrada. Sale con
  código 1 si falla. **No se relaja el verificador para que pase: si falla, se arregla el contenido.** Cero comprobaciones
  vacías (`or True`, tautologías, `if False`).
- Probar con `python scripts/ccss/verificar_ej_NN.py` y, de extremo a extremo, con
  `python scripts/ccss/prueba_mutacion_ej.py [muestra [temas]]` (el tema 03 tarda unos 25 s por ejecución).
- Estadística (temas 09–11): usar la tabla de `scripts/ccss/_tabla_normal.py` (z a 2 decimales, 4 decimales hasta 2,6 y
  5 desde 2,7, comprobada contra los valores oficiales), no el valor exacto. Si una lectura inversa no aparece en la tabla,
  el enunciado da el valor crítico o la solución muestra el valor más cercano y la interpolación. Tamaño muestral: se
  redondea hacia arriba. Binomial → normal solo con np ≥ 5 y nq ≥ 5 y con corrección por continuidad.
- No exigir nada que los apuntes del tema no hayan enseñado.

## Al terminar cada entrega, informar siempre de

- Número de ejercicios por tema (básicos y PAU).
- Los datos que se cambiaron para que saliera bonito.
- Qué ejercicios dieron problemas y cómo se arreglaron.
- Lo que no se ha podido comprobar (Quarto no está instalado: nada se ha renderizado).
- Y esperar la revisión del usuario.
