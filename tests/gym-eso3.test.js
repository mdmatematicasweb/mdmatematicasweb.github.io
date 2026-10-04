// Uso: node tests/gym-eso3.test.js   — genera cientos de retos de cada módulo de 3º ESO y los verifica con un método independiente.
// Variable GYM_N: retos por combinación de parámetros (300 por defecto).
const assert = require('assert'), fs = require('fs'), path = require('path');
const G = require('../assets/gym/gym.js');
const FILES = ['eso3-base', 'eso3-numeros', 'eso3-algebra', 'eso3-geometria', 'eso3-funciones', 'eso3-estadistica'];
FILES.forEach((f) => { if (fs.existsSync(path.join(__dirname, '../assets/gym/' + f + '.js'))) require('../assets/gym/' + f + '.js'); });
const verify = require('./verify-gym-eso3.js');
const N = Number(process.env.GYM_N || 300);
const { checkAnswer, answerStrings, flatten } = G;
const near = (a, b, e = 1e-9) => Math.abs(a - b) <= e * Math.max(1, Math.abs(b));
const val = (f) => f.n / f.d;
const ctxv = { assert, G, near, val };

Object.keys(G.modules).forEach((id) => assert(/^eso3-/.test(id), id + ': los módulos de 3º ESO empiezan por eso3-'));
Object.keys(G.modules).forEach((id) => assert(verify[id], id + ': falta verificador'));
Object.keys(verify).forEach((id) => assert(G.modules[id], id + ': verificador sin módulo'));

let total = 0;
for (const id of Object.keys(G.modules)) {
  const mod = G.modules[id];
  assert(Array.isArray(mod.help) && mod.help.length === 2, id + ': la ayuda debe tener 2 fases');
  mod.help.forEach((h) => assert((h.match(/\$/g) || []).length % 2 === 0, id + ': $ desparejados en la ayuda'));
  const combos = (mod.params || []).reduce((acc, p) => acc.flatMap((c) => p.options.map(([v]) => Object.assign({}, c, { [p.key]: v }))), [{}]);
  for (const params of combos) {
    for (let i = 0; i < N; i++) {
      const ch = mod.generate(params);
      const ctx = id + ' ' + JSON.stringify(params);
      assert(ch.prompt && ch.steps.length, ctx + ': prompt/steps vacíos');
      [ch.prompt].concat(ch.steps).forEach((s) => {
        assert(!/NaN|undefined|null|Infinity/.test(s), ctx + ': texto con basura: ' + s);
        assert((s.match(/\$/g) || []).length % 2 === 0, ctx + ': $ desparejados en: ' + s);
        assert(!/\.\d/.test(s.replace(/\$\$[\s\S]*?\$\$|\$[^$]*\$/g, '')), ctx + ': decimal con punto fuera de fórmula: ' + s);
      });
      const r = checkAnswer(ch.answer, answerStrings(ch.answer));
      assert.strictEqual(r.status, 'ok', ctx + ': la respuesta correcta no pasa el corrector: ' + ch.prompt);
      // una respuesta alterada no debe pasar
      if (['number', 'multi'].includes(ch.answer.kind)) {
        const bad = answerStrings(ch.answer); bad[0] = String(G.parseFrac(bad[0]) ? val(G.parseFrac(bad[0])) + 1 : 1);
        assert.notStrictEqual(checkAnswer(ch.answer, bad).status, 'ok', ctx + ': respuesta alterada aceptada');
      }
      (ch.mistakes || []).forEach((m) => {
        assert(m.msg && (m.msg.match(/\$/g) || []).length % 2 === 0, ctx + ': mensaje de error típico inválido');
        const strs = answerStrings(Object.assign({}, ch.answer, { value: m.value, show: undefined }));
        assert.notStrictEqual(checkAnswer(ch.answer, strs).status, 'ok', ctx + ': el error típico coincide con la respuesta correcta');
      });
      verify[id](ch, ctxv);
      total++;
    }
  }
}
Object.values(G.modules).forEach((mod) => {
  for (let i = 0; i < 20; i++) {
    const rp = G.resolveParams(mod, Object.fromEntries((mod.params || []).map((p) => [p.key, 'rand'])));
    (mod.params || []).forEach((p) => assert(p.options.some(([v]) => v === rp[p.key]), mod.id + ': rand no resuelve a opción real'));
  }
});
console.log('OK: ' + total + ' retos verificados en ' + Object.keys(G.modules).length + ' módulos de 3º ESO');
