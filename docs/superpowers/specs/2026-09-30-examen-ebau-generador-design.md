# Generador de exámenes interactivos tipo EBAU — diseño

Aprobado por el usuario el 2026-09-30.

## Objetivo
Un simulacro de examen de Matemáticas II (Andalucía) generado en el navegador, que emula el formato EBAU y deja elegir **tipos de ejercicio** (no temas) para poder usarlo al principio de curso. Con cronómetro y corrección automática. Ejercicios **generados** (datos aleatorios), con un generador para todos los tipos, construidos por fases.

## Decisiones del usuario
- Ejercicios generados, no los reales de la EBAU; un generador para cada tipo, despacio.
- Cronómetro (90 min) y corrección automática.
- Formato por defecto: EBAU 2026 (2 obligatorios + 2 bloques optativos de 2, se hace 1 de cada bloque). También 2025, 2024 y clásico.

## Piezas
- **Tipo de ejercicio**: `{id, nombre, area, tema, generate()}`; `generate()` devuelve `{enunciado, partes:[{texto, pts, answer, steps}]}` con apartados que suman 2,5 puntos y respuestas comprobables (`matrix|number|list|choice|multi|expr`).
- **Respuesta `expr`**: expresión numérica (`1/2+ln(2)`, `sqrt(3)`, `pi/4`, decimales) evaluada con un parser seguro y comparada con tolerancia (5e-4 relativa + 5e-4 absoluta).
- **Examen**: `armarExamen({formato, tipos, semilla})`. Reparto aleatorio sin repetir tipo dentro de un bloque cuando hay suficientes tipos marcados. Toda la generación usa un PRNG con semilla: el mismo **código** reproduce el mismo examen.
- **Formatos**: 2026 (2 obl. + 2 bloques×2), 2025 (1 obl. + 3 bloques×2), 2024 (4 bloques×2), clásico (2 bloques×4, se hacen 4 cualesquiera).
- **UI**: configuración (formato, tipos por área con «marcar todo», duración) → examen (cuenta atrás persistente, elegir ejercicio en cada bloque optativo, entregar) → resultado (nota sobre 10, corrección por apartado, resolución paso a paso, historial en localStorage).
- **Sin impersonar**: la hoja dice «Simulacro basado en el formato EBAU», sin logos oficiales.

## Taxonomía (≈27 tipos)
- Álgebra: discusión de sistema con parámetro; sistema de planteamiento; compatible indeterminado/homogéneo; ecuación matricial; potencias e inversa; rango e inversa con parámetro; determinantes por propiedades.
- Geometría: posición relativa de rectas y plano que las contiene; plano y recta (corte, ecuaciones); distancias; simétrico y proyección; ángulos; áreas y volúmenes / coplanarios; vectores (escalar, ortogonalidad, módulo).
- Análisis: límite con parámetros; asíntotas con parámetros; continuidad y derivabilidad a trozos; tangente y normal; monotonía y extremos; curvatura e inflexión; extremos absolutos; optimización; primitiva por un punto; integral definida; área entre curvas.
- Probabilidad: total y Bayes; tablas de contingencia; normal (probabilidades); normal (valor desconocido; tabla N(0,1) incluida).

## Fases
1. **Base + 7 tipos**: motor, formatos, cronómetro, respuesta `expr`, y los tipos discusión de sistema, ecuación matricial, determinantes, posición relativa de rectas, simétrico y distancia, tangente y normal, primitiva por un punto.
2. Resto de álgebra. 3. Resto de geometría. 4. Resto de análisis. 5. Probabilidad y normal.

## Pruebas
`tests/examen.test.js`: cada generador produce ejercicios cuyos apartados suman 2,5 y cuya respuesta se verifica con un cálculo independiente (álgebra lineal numérica, derivadas por diferencias finitas, integrales por Simpson...); el ensamblado cumple cada formato; la corrección da 10 con las respuestas correctas y 0 con las incorrectas; el mismo código regenera el mismo examen.

## Ubicación
`actividades/2-bachillerato-ciencias/examen/index.qmd`; `assets/gym/examen.js` (motor/UI), `assets/gym/tipos-*.js` (generadores).
