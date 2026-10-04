/* Simulacro de examen PAU de Matemáticas Aplicadas a las Ciencias Sociales II (Andalucía).
 * Perfil CCSS del motor de examen.js: 4 ejercicios en 1 h 30 min.
 *   Ejercicio 1: álgebra, 3 puntos, a elegir entre dos opciones (A o B).
 *   Ejercicio 2: análisis, 3 puntos, a elegir entre dos opciones (A o B).
 *   Ejercicio 3: probabilidad, 2 puntos, sin opciones.
 *   Ejercicio 4: distribuciones e inferencia, 2 puntos, sin opciones.
 * Los generadores de ejercicios están en tipos-ccss.js y se registran con MDExamCCSS.implementar().
 */
(function (root) {
  'use strict';
  const X = root.MDExam;

  const AREAS = [['algebra', 'Álgebra (ejercicio 1)'], ['analisis', 'Análisis (ejercicio 2)'], ['probabilidad', 'Probabilidad (ejercicio 3)'], ['estadistica', 'Distribuciones e inferencia (ejercicio 4)']];
  /* El orden es estable: fija el código del examen (máscara de bits). No reordenar: añadir siempre al final. */
  const CATALOGO = [
    { id: 'sistema-param', nombre: 'Discusión de un sistema con parámetro', area: 'algebra', tema: 2 },
    { id: 'sistema-plant', nombre: 'Problema de planteamiento (sistema de ecuaciones)', area: 'algebra', tema: 2 },
    { id: 'ec-matricial', nombre: 'Ecuación matricial e inversa', area: 'algebra', tema: 1 },
    { id: 'matriz-param', nombre: 'Matriz con parámetro: determinante, rango e inversa', area: 'algebra', tema: 1 },
    { id: 'prog-lineal', nombre: 'Programación lineal', area: 'algebra', tema: 3 },
    { id: 'asintotas', nombre: 'Asíntotas y límites de una función racional', area: 'analisis', tema: 5 },
    { id: 'trozos', nombre: 'Continuidad y derivabilidad de una función a trozos', area: 'analisis', tema: 6 },
    { id: 'tangente', nombre: 'Recta tangente', area: 'analisis', tema: 6 },
    { id: 'monotonia', nombre: 'Monotonía, extremos e inflexión de un polinomio', area: 'analisis', tema: 7 },
    { id: 'extremos-abs', nombre: 'Extremos absolutos en un intervalo', area: 'analisis', tema: 7 },
    { id: 'optimizacion', nombre: 'Problema de optimización', area: 'analisis', tema: 7 },
    { id: 'primitiva-area', nombre: 'Primitiva e integral definida', area: 'analisis', tema: 8 },
    { id: 'area-curvas', nombre: 'Área entre dos curvas', area: 'analisis', tema: 8 },
    { id: 'prob-total-bayes', nombre: 'Probabilidad total y teorema de Bayes', area: 'probabilidad', tema: 9 },
    { id: 'prob-tablas', nombre: 'Probabilidad con tablas de contingencia', area: 'probabilidad', tema: 9 },
    { id: 'prob-sucesos', nombre: 'Operaciones con sucesos y propiedades de la probabilidad', area: 'probabilidad', tema: 9 },
    { id: 'binomial', nombre: 'Distribución binomial', area: 'estadistica', tema: 10 },
    { id: 'normal-prob', nombre: 'Distribución normal: probabilidades', area: 'estadistica', tema: 10 },
    { id: 'normal-inversa', nombre: 'Distribución normal: valor desconocido', area: 'estadistica', tema: 10 },
    { id: 'binomial-normal', nombre: 'Aproximación de la binomial por la normal', area: 'estadistica', tema: 10 },
    { id: 'media-muestral', nombre: 'Distribución de la media y de la proporción muestrales', area: 'estadistica', tema: 11 },
    { id: 'ic-media', nombre: 'Intervalo de confianza para la media y tamaño muestral', area: 'estadistica', tema: 11 },
    { id: 'ic-proporcion', nombre: 'Intervalo de confianza para una proporción', area: 'estadistica', tema: 11 },
  ];

  const FORMATOS = {
    ccss: {
      nombre: 'PAU CCSS · 4 ejercicios, 1 h 30 min',
      grupos: [
        { titulo: 'EJERCICIO 1 · ÁLGEBRA', consigna: 'Resuelve sólo una de las dos opciones:', n: 2, elegir: 1, pts: 3, area: 'algebra' },
        { titulo: 'EJERCICIO 2 · ANÁLISIS', consigna: 'Resuelve sólo una de las dos opciones:', n: 2, elegir: 1, pts: 3, area: 'analisis' },
        { titulo: 'EJERCICIO 3 · PROBABILIDAD', consigna: '', n: 1, elegir: 1, pts: 2, area: 'probabilidad' },
        { titulo: 'EJERCICIO 4 · DISTRIBUCIONES E INFERENCIA', consigna: '', n: 1, elegir: 1, pts: 2, area: 'estadistica' },
      ],
      num: (gi, k) => (gi < 2 ? (gi + 1) + '.' + 'AB'[k] : String(gi + 1)),
      instr: ['Este examen consta de cuatro ejercicios: álgebra (3 puntos), análisis (3 puntos) y dos de estadística (2 puntos cada uno).',
        'En los ejercicios 1 y 2 hay que elegir una de las dos opciones, A o B. Los ejercicios 3 y 4 son obligatorios.'],
      puntos: 'Los ejercicios 1 y 2 valen 3 puntos y los ejercicios 3 y 4 valen 2 puntos.',
    },
  };

  const PERFIL = {
    id: 'ccss', AREAS, CATALOGO, FORMATOS, FMT_ORDEN: ['ccss'], ptsEj: 3, formatoInicial: 'ccss',
    claves: { curso: 'mdexam:ccss:curso', hist: 'mdexam:ccss:historial' },
    reCodigo: /^(ccss)-([a-z0-9]{3,12})-([0-9a-f]{1,8})-(\d{1,3})$/i,
    asignatura: 'MATEMÁTICAS APLICADAS A LAS CIENCIAS SOCIALES II',
    extraInstr: ['Se permite calculadora no programable ni gráfica. Se facilita la tabla de la normal N(0,1) (desplegable al principio del examen).',
      'Con la tabla, redondea z a dos decimales. Cuando se pida un intervalo de confianza con confianza del 90 % o del 99 %, el enunciado indica el valor crítico que debes usar.'],
    intro: 'Marca los <b>tipos de ejercicio</b> que ya has estudiado: cada ejercicio del examen saldrá de los tipos marcados en su área.',
    placeholder: 'ej.: ccss-k3j9ab-7fffff-90',
    tablaNormal: true,
  };

  root.MDExamCCSS = X.crear(PERFIL);
  if (typeof module !== 'undefined' && module.exports) module.exports = root.MDExamCCSS;
})(typeof globalThis !== 'undefined' ? globalThis : this);
