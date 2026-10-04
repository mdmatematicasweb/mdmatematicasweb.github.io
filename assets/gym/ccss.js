/* Ejercicios interactivos — 2º Bachillerato Ciencias Sociales (CCSS).
 * G.reuse(origen, {drop, ajustes}) crea «cs-<origen>» a partir de un módulo de Ciencias, sin las opciones fuera del currículo CCSS
 * (p. ej. matrices 4×4, L'Hôpital, trigonometría) y descartando los retos que mencionan funciones trigonométricas.
 * Cada página CCSS carga gym.js, el módulo de Ciencias del que reutiliza y este fichero (que ignora los orígenes no cargados).
 * Los módulos propios del curso se definen en ccss-*.js; sus verificadores, en tests/verify-gym-ccss.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const FUERA = /\\sin|\\cos|\\tan|\\arctan|\\arcsin|\\operatorname\{(?:sen|tg|arc)|\\sqrt\[|Hôpital|\\mathrm\{(?:sen|tg)/;
  G.ccssAlias = G.ccssAlias || {};

  /** drop: {clave: [valores de opción a quitar]}. Devuelve el módulo creado, o null si el origen no está cargado. */
  G.reuse = function (src, opts) {
    const m = G.modules[src];
    if (!m) return null;
    opts = opts || {};
    const drop = opts.drop || {};
    const params = (m.params || []).map((p) => Object.assign({}, p, {
      options: p.options.filter(([v]) => !(drop[p.key] || []).map(String).includes(String(v))),
    }));
    params.forEach((p) => { if (!p.options.length) throw new Error(src + ': sin opciones para ' + p.key); });
    const aj = (t) => (opts.ajustes || []).reduce((x, [de, a]) => { if (!x.includes(de)) return x; return x.split(de).join(a); }, t);
    (opts.ajustes || []).forEach(([de]) => { if (![m.title].concat(m.help || []).some((t) => t.includes(de))) throw new Error(src + ': el ajuste «' + de + '» no encaja'); });
    const base = m.generate;
    const id = 'cs-' + src;
    G.define(Object.assign({}, m, {
      id, params,
      title: aj(m.title),
      help: (m.help || []).map(aj),
      generate(p) {
        for (let i = 0; i < 500; i++) {
          const ch = base(p);
          if (!FUERA.test(ch.prompt + ' ' + ch.steps.join(' '))) return ch;
        }
        throw new Error(id + ': no hay retos dentro del currículo CCSS con ' + JSON.stringify(p));
      },
    }));
    G.ccssAlias[id] = src;
    return G.modules[id];
  };

  /** Tabla N(0,1) como la del examen de la Junta: 4 decimales hasta z = 2,6 y 5 decimales desde z = 2,7 (necesita distribuciones.js). */
  G.normalTableCCSS = function (el) {
    const Phi = G.normal.Phi;
    const dec = (z) => (z >= 2.7 - 1e-9 ? 5 : 4);
    const val = (z) => { const k = Math.pow(10, dec(z)); return (Math.round(Phi(z) * k + 1e-9) / k).toFixed(dec(z)).replace('.', ','); };
    let h = '<table class="gym-ntab"><thead><tr><th>z</th>';
    for (let j = 0; j < 10; j++) h += '<th>0,0' + j + '</th>';
    h += '</tr></thead><tbody>';
    for (let i = 0; i <= 30; i++) {
      h += '<tr><th>' + (i / 10).toFixed(1).replace('.', ',') + '</th>';
      for (let j = 0; j < 10; j++) h += '<td>' + val(Math.round(i * 10 + j) / 100) + '</td>';
      h += '</tr>';
    }
    el.innerHTML = h + '</tbody></table>';
  };

  const R = G.reuse;
  /* Tema 1 · Matrices y determinantes (hasta orden 3) */
  R('operaciones'); R('producto', { drop: { dim: ['3,4,2'] } }); R('determinante', { drop: { n: [4] }, ajustes: [['En 3×3 o 4×4: elige la fila o columna con más ceros y desarrolla por adjuntos:', 'En 3×3 puedes aplicar la regla de Sarrus o desarrollar por adjuntos eligiendo la fila o columna con más ceros:']] }); R('inversa');
  R('rango', { drop: { dim: ['3,4', '4,4', '5,3'] } }); R('parametrica'); R('ecuaciones');
  /* Tema 2 · Sistemas de ecuaciones lineales */
  R('clasificar', { ajustes: [['Clasificar un sistema (Rouché–Fröbenius)', 'Clasificar un sistema'], ['Rouché–Fröbenius con $n$ incógnitas:', 'Con $n$ incógnitas y los rangos de la matriz de coeficientes $A$ y de la ampliada $A^*$:']] }); R('resolver'); R('planteamiento');
  /* Tema 5 · Límites y continuidad */
  R('lim-infinito'); R('lim-punto'); R('lim-infmenosinf'); R('lim-continuidad'); R('lim-discont'); R('lim-asintotas');
  /* Tema 6 · Derivadas */
  R('der-reglas', { drop: { tipo: ['trans'] } }); R('der-tangente', { drop: { tipo: ['trasc'] } }); R('der-trozos'); R('der-parametro');
  /* Tema 7 · Aplicaciones de la derivada */
  R('apl-criticos'); R('apl-monotonia'); R('apl-inflexion', { drop: { fun: ['gauss'] } }); R('apl-absolutos'); R('apl-parametros'); R('apl-optimizacion');
  /* Tema 8 · Integrales */
  R('int-indefinidas'); R('int-barrow', { drop: { tipo: ['trig', 'lnarc'] } }); R('int-primitiva', { drop: { tipo: ['trig'] } }); R('int-areas', { drop: { tipo: ['trig'] } });
  /* Tema 9 · Probabilidad */
  ['pro-laplace', 'pro-union', 'pro-cond', 'pro-indep', 'pro-tabla', 'pro-total', 'pro-bayes', 'pro-extrac'].forEach((s) => R(s));
  /* Tema 10 · Distribuciones binomial y normal */
  ['dis-binom', 'dis-binompar', 'dis-tipif', 'dis-tabla', 'dis-normal', 'dis-inversa', 'dis-aprox'].forEach((s) => R(s));
})(typeof globalThis !== 'undefined' ? globalThis : this);
