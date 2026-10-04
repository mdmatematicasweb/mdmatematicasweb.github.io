/* Ejercicios interactivos — 3º ESO: utilidades comunes (G.eso3). Se carga después de gym.js y antes de los módulos eso3-*.js. */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const MARK = '\uE000';                                          // marca interna de la coma decimal
  const dc = (x) => String(Math.round(Number(x) * 1e8) / 1e8).replace('.', MARK);                // decimal con coma (se resuelve al publicar el texto)
  /** Dentro de una fórmula la coma decimal se escribe {,} (así KaTeX no deja espacio detrás); fuera, una coma normal. */
  const mathComma = (s) => s.replace(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$|([^$]+)/g, (m, a, b, c) => (a !== undefined ? '$$' + a.split(MARK).join('{,}') + '$$' : b !== undefined ? '$' + b.split(MARK).join('{,}') + '$' : c.split(MARK).join(',')));
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
  const approx = (x, nd) => String(Math.round(x * Math.pow(10, nd)) / Math.pow(10, nd)).replace('.', MARK);
  G.eso3 = { dc, mathComma, define, sg, money, again, approx };
})(typeof globalThis !== 'undefined' ? globalThis : this);
