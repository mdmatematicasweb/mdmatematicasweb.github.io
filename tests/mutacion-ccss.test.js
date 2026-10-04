// Uso: node tests/mutacion-ccss.test.js — comprueba que los verificadores de tests/verify-ccss-examen.js detectan una respuesta alterada
// en CADA apartado de CADA tipo (si no lo detectan, el verificador no está comprobando ese apartado).
const assert = require('assert');
const G = require('../assets/gym/gym.js');
require('../assets/gym/distribuciones.js');
require('../assets/gym/ccss-algebra.js');
const X = require('../assets/gym/examen-ccss.js');
['algebra', 'analisis', 'estadistica'].forEach((f) => require('../assets/gym/tipos-ccss-' + f + '.js'));
const verify = require('./verify-ccss-examen.js');
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const ctx = { assert, G, X, near, num: (f) => f.n / f.d };
const F1 = G.F(1);

/** Altera la respuesta: suma 1 (o 0,05) al primer valor numérico que encuentra. Devuelve false si no hay nada que alterar. */
function mutar(a) {
  if (a.kind === 'number') { a.value = G.fadd(a.value, F1); return true; }
  if (a.kind === 'expr') { a.value += 0.05; a.alt = []; return true; }
  if (a.kind === 'choice') { a.value = a.value === '0' ? '1' : '0'; return true; }
  if (a.kind === 'matrix') { a.value = a.value.map((r) => r.slice()); a.value[0][0] = G.fadd(a.value[0][0], F1); return true; }
  if (a.kind === 'list') { a.value = a.value.slice(); a.value[0] = G.fadd(a.value[0], F1); return true; }
  if (a.kind === 'multi' || a.kind === 'matrixset') return mutar(a.parts[0]);
  return false;
}
let n = 0, sinCobertura = [];
X.CATALOGO.forEach((t) => {
  for (let semilla = 0; semilla < 12; semilla++) {
    const prev = G.setRandom(G.seeded('mut' + t.id + semilla));
    let ex; try { ex = t.generate(); } finally { G.setRandom(prev); }
    ex.partes.forEach((p, pi) => {
      // cada parte se prueba también en sus subpartes (multi): se muta la primera y, si hay más, cada una
      const subs = p.answer.kind === 'multi' ? p.answer.parts.length : 1;
      for (let sp = 0; sp < subs; sp++) {
        const clon = Object.assign({}, ex, { partes: ex.partes.map((q) => Object.assign({}, q)) });
        const copia = (a) => (a.kind === 'multi' ? Object.assign({}, a, { parts: a.parts.map((x) => Object.assign({}, x)) }) : Object.assign({}, a));
        clon.partes[pi].answer = copia(p.answer);
        const objetivo = p.answer.kind === 'multi' ? clon.partes[pi].answer.parts[sp] : clon.partes[pi].answer;
        if (!mutar(objetivo)) continue;
        let detectado = false;
        try { verify[t.id](clon, ctx); } catch (e) { detectado = true; }
        n++;
        if (!detectado) sinCobertura.push(t.id + ' apartado ' + 'abc'[pi] + (subs > 1 ? '.' + (sp + 1) : ''));
      }
    });
  }
});
const unicos = [...new Set(sinCobertura)];
assert.strictEqual(unicos.length, 0, 'el verificador no detecta alterar: ' + unicos.join('; '));
console.log('OK: ' + n + ' mutaciones detectadas');
