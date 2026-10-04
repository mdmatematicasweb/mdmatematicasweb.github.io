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
05–08, 09–11; revisada) · 3 actividades (hecha y cerrada el 2026-10-04: 11 páginas, 63 módulos; diseño en
`docs/superpowers/specs/2026-10-04-ccss-fase3-actividades.md`; pruebas `node tests/gym.test.js` y `node tests/ccss-paginas.test.js`) · 4 PAU CCSS (hecha el 2026-10-04, pendiente de revisión: ver abajo) · 5 simulacro ·
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
- Lo que no se ha podido comprobar (Quarto 1.10.18 está instalado: `quarto render ruta/index.qmd` renderiza un tema suelto).
- Y esperar la revisión del usuario.

## Fase 4: PAU CCSS (`scripts/ebau-ccss/`)

- 36 exámenes oficiales de la Junta (2021-2026; las extraordinarias de 2023-2025 no están en su web), copiados en `assets/pau-ccss/<slug>/`
  (`examen.pdf`, `criterios.pdf`; las tablas N(0,1) están en `assets/pau-ccss/tablas/`, una por contenido). `python3 scripts/ebau-ccss/oficial.py <carpeta con los zip>`
  los extrae y escribe `oficial.json`. Origen: `https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/examanes_anios_anteriores/selectividad/sel_AAAA_matematicas_aplicadas.zip`.
- Slug: `AAAA-ord|ext[-res|-sup|-sup1|-sup2][-a|-b]` (a/b: modelos A y B de 2023-2025, que son dos exámenes distintos). Cada examen es
  `data/<slug>.md` (enunciados) + `soluciones/<slug>.md` (resolución breve). Ejercicios de 2026 con opción A)/B): `1A`, `1B`, etc.
- `python3 scripts/ebau-ccss/build.py` genera `ejercicios/2-bachillerato-ccss/ebau/` (índice y una página por tema). No editar esas páginas a mano.
- `python scripts/ebau-ccss/verificar_AAAA.py` (uno por año) resuelve con sympy y comprueba que cada resultado aparece en la solución
  (misma lógica y mutación que `scripts/ccss/_ej_comun.py`; ver `_verif.py`). Los criterios de la Junta solo dan el reparto de puntos: las soluciones son propias.
- Notas de lectura de enunciados: 2022 ext. titular ej. 2 no dice `x≥0, y≥0` y se supone (si no, `F` no tendría mínimo); `log` es decimal (2025 sup1-A ej. 3 y 2026 sup1);
  para 99 % se usa `z=2,575` (interpolación) y para 92 % `z=1,75`; 2025 sup2-B ej. 7b: «10 %» se lee como el 10 % de la media muestral (se da también la lectura 0,1 kg).
- Figuras en `ejercicios/2-bachillerato-ccss/ebau/fig/`: `python3 scripts/ebau-ccss/figuras_pl.py` (región factible de los 34 de programación lineal, con el vértice óptimo marcado; lee las restricciones y el objetivo de los verificadores) y `python3 scripts/ebau-ccss/figuras_fn.py` (42 gráficas de «represente/esboce/dibuje», una función `e_…` a mano por figura). Ambos enlazan la imagen en `soluciones/` (idempotentes); después, `build.py`.

## Fase 5: simulacro PAU CCSS

- Motor `assets/gym/examen-ccss.js` (`MDExamCCSS`, adaptado de `examen.js`): un solo formato, 4 ejercicios en 90 min. Bloques: álgebra y análisis (3 pts, opción A/B), probabilidad y distribuciones, inferencia (2 pts, sin opciones). Un bloque sin tipos marcados no aparece y la nota se calcula sobre el resto. Código reproducible `ccss-semilla-mask-duración`; el orden de `CATALOGO` fija la máscara, no reordenar.
- Generadores en `tipos-ccss-{algebra,analisis,estadistica}.js` (`X.implementar`); contrato `{enunciado, partes:[{texto, pts, answer, steps}], data}` con los apartados sumando los puntos del bloque. Convención de la tabla: z a centésimas, Φ a 4 decimales, |z| ≤ 2,6; valores críticos 1,645/1,96/2,575 con `alt`.
- Tests: `node tests/examen-ccss.test.js` (todos los tipos, ensamblado, corrección), `node tests/mutacion-ccss.test.js` (cada apartado de cada tipo debe estar cubierto por su verificador) y `node tests/ccss-paginas.test.js`. Un tipo nuevo necesita su verificador en `tests/verify-ccss-examen.js`; no relajar tolerancias.

## Fase 6: publicación

- Hecha en la rama: sin exclusión en `_quarto.yml`, selector de curso en `index.qmd` (+ `assets/home.js`/`home.css`), navbar con menú del simulacro, sidebars e índices. Pendiente: merge a `main` y push cuando el usuario lo pida.


## Curso 3º ESO (`3-eso`)

- Spec y decisiones: `docs/superpowers/specs/2026-10-04-curso-3eso.md`. Fuentes: Orden de 30 de mayo de 2023 (BOJA nº 104, currículo de ESO en Andalucía; Matemáticas de 3.º, saberes `MAT.3.*`) y, como guía de orden, nivel y estilo, el libro de Santillana «Matemáticas Académicas 3.º ESO» (14 unidades; los enunciados son siempre originales). No hay PAU ni pruebas por trimestre: en su lugar, pruebas competenciales.
- Rama de trabajo de esta sesión: `claude/admiring-clarke-tgsd2o` (la regla de `serene-cray` de arriba es solo del curso CCSS). Fase 6 hecha en la rama: curso publicado (sin exclusión en `render`), tercera cabecera en la portada, selector de tres cursos y menú «★ Simulacros». Pendiente: merge a `main` y push solo si el usuario lo pide.
- 14 temas: 01-numeros-racionales, 02-potencias-raices, 03-progresiones, 04-proporcionalidad, 05-polinomios, 06-ecuaciones, 07-sistemas-ecuaciones, 08-lugares-geometricos, 09-movimientos-semejanzas, 10-cuerpos-geometricos, 11-funciones, 12-funciones-lineales-cuadraticas, 13-estadistica, 14-probabilidad. La carpeta antigua `14-parametros-estadisticos` (solo `.gitkeep`) sobra y se puede borrar.
- Notación: coma decimal (`0{,}25` en fórmulas), fracciones `\frac{p}{q}`, `:` para dividir. Primero se calcula con sympy y después se escribe el texto; los verificadores no se relajan.
- Comandos: `python scripts/eso3/verificar_NN.py` (apuntes), `python scripts/eso3/ej_NN.py` (verifica y escribe la relación de ejercicios; no editar `ejercicios/3-eso/NN-…/index.qmd` a mano), `python scripts/eso3/prueba_mutacion_ej.py` (cambia una cifra de cada resultado esperado dentro de su solución y exige que el verificador lo detecte), `python3 scripts/eso3/figuras.py`, `python3 scripts/eso3/build_actividades.py`, `node tests/gym-eso3.test.js`, `node tests/eso3-paginas.test.js`, `node tests/prueba-eso3.test.js`.
- Un módulo nuevo de actividades (`eso3-*`) necesita su verificador en `tests/verify-gym-eso3.js` y su sitio en `scripts/eso3/build_actividades.py`; un tipo nuevo de situación competencial necesita su verificador en `tests/verify-eso3-comp.js`.
