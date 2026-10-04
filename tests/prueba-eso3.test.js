// Uso: node tests/prueba-eso3.test.js — todos los tipos de situación, ensamblado de la prueba competencial, corrección y mutación.
// Variable PRUEBA_N: ejercicios por tipo (200 por defecto).
const assert = require('assert');
const G = require('../assets/gym/gym.js');
require('../assets/gym/eso3-base.js');
const P = require('../assets/gym/prueba-eso3.js');
globalThis.MDPrueba3 = P;
require('../assets/gym/tipos-eso3.js');
const verify = require('./verify-eso3-comp.js');
const N = Number(process.env.PRUEBA_N || 200);

// 1) catálogo completo, un verificador por tipo
const sin = P.CATALOGO.filter((t) => !t.listo).map((t) => t.id);
assert.strictEqual(sin.length, 0, 'tipos sin generador: ' + sin.join(', '));
P.CATALOGO.forEach((t) => assert(verify[t.id], t.id + ': falta verificador'));
Object.keys(verify).forEach((id) => assert(P.tipos[id], id + ': verificador sin tipo'));
assert.strictEqual(P.CATALOGO.length, 20);
P.BLOQUES.forEach((b) => assert(P.CATALOGO.filter((t) => t.area === b.area).length === 4, b.area + ': deben ser 4 tipos'));

// 2) cada tipo: apartados que suman 2 puntos, respuesta correcta aceptada, verificada con otro método
let total = 0;
P.CATALOGO.forEach((t) => {
  for (let i = 0; i < N; i++) {
    const ex = t.generate();
    assert(ex.enunciado && ex.partes.length === 4, t.id + ': cuatro apartados');
    assert(Math.abs(ex.partes.reduce((s, p) => s + p.pts, 0) - 2) < 1e-9, t.id + ': los apartados suman 2');
    [ex.enunciado].concat(...ex.partes.map((p) => [p.texto].concat(p.steps))).forEach((s) => {
      assert(!/NaN|undefined|null|Infinity|\d{6,}\d*\.\d{4,}|\.\d{9,}/.test(s), t.id + ': texto con basura: ' + s);
      assert((s.match(/\$/g) || []).length % 2 === 0, t.id + ': $ desparejados: ' + s);
      assert(!/\{,\}/.test(s.replace(/\$\$[\s\S]*?\$\$|\$[^$]*\$/g, '')), t.id + ': {,} fuera de fórmula: ' + s);
    });
    ex.partes.forEach((p, k) => {
      assert.strictEqual(G.checkAnswer(p.answer, G.answerStrings(p.answer)).status, 'ok', t.id + ' apartado ' + k + ': la respuesta correcta no pasa');
      // mutación: una respuesta alterada no se acepta
      if (p.answer.kind === 'number') { const bad = [String(p.answer.value.n / p.answer.value.d + 1)]; assert.notStrictEqual(G.checkAnswer(p.answer, bad).status, 'ok', t.id + ' apartado ' + k + ': respuesta alterada aceptada'); }
      assert(p.steps.length >= 1);
    });
    verify[t.id](ex, { assert });
    total++;
  }
});

// 3) ensamblado, código reproducible y corrección
for (let i = 0; i < 40; i++) {
  const cfg = { tipos: P.CATALOGO.map((t) => t.id), semilla: 'sem' + i, duracion: 60 };
  const a = P.armarExamen(cfg), b = P.armarExamen(cfg);
  assert.strictEqual(a.grupos.length, 5);
  assert.deepStrictEqual(a.grupos.map((g) => g.ejercicios[0].enunciado), b.grupos.map((g) => g.ejercicios[0].enunciado), 'misma semilla, misma prueba');
  assert.strictEqual(a.ptsTotal, 10);
  const parsed = P.parseCodigo(a.codigo);
  assert.deepStrictEqual(parsed.tipos.slice().sort(), cfg.tipos.slice().sort());
  // respuesta correcta → 10
  const resp = {}; a.grupos.forEach((g) => g.ejercicios.forEach((e) => { resp[e.num] = e.partes.map((p) => G.answerStrings(p.answer)); }));
  const r = P.corregir(a, resp, []);
  assert.strictEqual(r.sobre10, 10);
  // mutación: estropear un apartado baja exactamente 0,5
  a.grupos.forEach((g) => g.ejercicios.forEach((e) => e.partes.forEach((p, k) => {
    if (p.answer.kind !== 'number') return;
    const r2 = JSON.parse(JSON.stringify(resp)); r2[e.num][k] = [String(p.answer.value.n / p.answer.value.d + 3)];
    const nota = P.corregir(a, r2, []).nota;
    assert(Math.abs(nota - 9.5) < 1e-9, 'un apartado mal debe restar 0,5: ' + nota);
  })));
  // vacío → 0
  assert.strictEqual(P.corregir(a, {}, []).nota, 0);
}
// un bloque sin tipos no aparece y la nota se calcula sobre el resto
const sub = P.armarExamen({ tipos: P.CATALOGO.filter((t) => t.area !== 'funciones').map((t) => t.id), semilla: 'x', duracion: 45 });
assert.strictEqual(sub.grupos.length, 4);
const respSub = {}; sub.grupos.forEach((g) => g.ejercicios.forEach((e) => { respSub[e.num] = e.partes.map((p) => G.answerStrings(p.answer)); }));
assert.strictEqual(P.corregir(sub, respSub, []).sobre10, 10);
assert.throws(() => P.armarExamen({ tipos: [], semilla: 'x', duracion: 60 }));
console.log('OK: ' + total + ' situaciones verificadas en ' + P.CATALOGO.length + ' tipos; 40 pruebas armadas y corregidas');
