/* Ejercicios interactivos — 3º ESO: utilidades comunes (G.eso3). Se carga después de gym.js y antes de los módulos eso3-*.js. */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const dc = (x) => String(x).replace('.', ',');                 // decimal con coma (texto)
  /** En las fórmulas, la coma decimal entre cifras se escribe {,} (así KaTeX no deja espacio detrás). */
  const mathComma = (s) => s.replace(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g, (m, a, b) => (a !== undefined ? '$$' + a.replace(/(\d),(\d)/g, '$1{,}$2') + '$$' : '$' + b.replace(/(\d),(\d)/g, '$1{,}$2') + '$'));
  const define = (mod) => {
    const gen = mod.generate;
    mod.generate = (p) => {
      const ch = gen(p);
      ch.prompt = mathComma(ch.prompt);
      ch.steps = ch.steps.map(mathComma);
      (ch.mistakes || []).forEach((m) => { m.msg = mathComma(m.msg); });
      return ch;
    };
    G.define(mod);
  };
  const sg = (n) => (n < 0 ? '(' + n + ')' : String(n));          // número entre paréntesis si es negativo
  const money = (x) => Math.round(x * 100) / 100;
  const again = (id, p) => G.modules[id].generate(p);             // volver a generar (descartar un reto poco bonito)
  const approx = (x, nd) => String(Math.round(x * Math.pow(10, nd)) / Math.pow(10, nd)).replace('.', ',');
  G.eso3 = { dc, mathComma, define, sg, money, again, approx };
})(typeof globalThis !== 'undefined' ? globalThis : this);
