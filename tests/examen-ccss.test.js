// Uso: node tests/examen-ccss.test.js — verifica los generadores, el ensamblado, la corrección y la reproducibilidad del simulacro PAU CCSS.
const assert = require('assert');
const G = require('../assets/gym/gym.js');
require('../assets/gym/distribuciones.js');
require('../assets/gym/ccss-algebra.js');
const X = require('../assets/gym/examen-ccss.js');
['algebra', 'analisis', 'estadistica'].forEach((f) => require('../assets/gym/tipos-ccss-' + f + '.js'));
const verify = require('./verify-ccss-examen.js');

const N = Number(process.env.EXAM_N || 200);
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const num = (f) => f.n / f.d;
const ctx = { assert, G, X, near, num };
const PTS = { algebra: 3, analisis: 3, probabilidad: 2, inferencia: 2 };

// ---------- cada tipo: puntos, texto, corrector y verificador independiente ----------
let total = 0;
const ids = X.CATALOGO.filter((t) => t.listo).map((t) => t.id);
assert.strictEqual(ids.length, X.CATALOGO.length, 'hay tipos del catálogo sin generador: ' + X.CATALOGO.filter((t) => !t.listo).map((t) => t.id));
ids.forEach((id) => assert(verify[id], id + ': falta verificador'));
Object.keys(verify).forEach((id) => assert(X.tipos[id], 'verificador de un tipo inexistente: ' + id));
ids.forEach((id) => {
  const pts = PTS[X.tipos[id].area];
  const vistos = new Set();
  for (let i = 0; i < N; i++) {
    const prev = G.setRandom(G.seeded('t' + id + i));
    let ex;
    try { ex = X.tipos[id].generate(); } finally { G.setRandom(prev); }
    assert(Math.abs(ex.partes.reduce((s, p) => s + p.pts, 0) - pts) < 1e-9, id + ': los apartados deben sumar ' + pts);
    assert(ex.partes.every((p) => [0.5, 0.75, 1, 1.5].includes(p.pts)), id + ': puntuación de apartado inusual');
    const txt = [ex.enunciado].concat(ex.partes.map((p) => p.texto), ...ex.partes.map((p) => p.steps));
    txt.forEach((t) => {
      assert(!/NaN|undefined|Infinity|null/.test(t), id + ': texto con basura: ' + t);
      assert(((t.replace(/\$\$/g, '').match(/\$/g)) || []).length % 2 === 0, id + ': $ desparejados: ' + t);
      assert(!/\(\(-?\d+\)\)|\{,\}\{,\}|\+-|--\d/.test(t), id + ': formato dudoso: ' + t.slice(0, 200));
      assert(!/\\frac\{[^{}]*\}\{1\}/.test(t), id + ': fracción con denominador 1: ' + t.slice(0, 200));
    });
    ex.partes.forEach((p) => {
      const strs = G.answerStrings(p.answer);
      assert.strictEqual(strs.length, X.cellsOf(p.answer), id + ': celdas');
      assert.strictEqual(G.checkAnswer(p.answer, strs).status, 'ok', id + ': la solución no pasa el corrector');
      assert(p.steps.length >= 1 && p.steps.every((s) => s.length > 0));
    });
    verify[id](ex, ctx);
    vistos.add(ex.enunciado + ex.partes.map((p) => p.texto).join('|'));
    total++;
  }
  assert(vistos.size > N * 0.5, id + ': poca variedad (' + vistos.size + ' enunciados distintos de ' + N + ')');
});

// ---------- gráficas del resultado ----------
Object.keys(X.GRAFICAS).forEach((id) => {
  const prev = G.setRandom(G.seeded('gr' + id));
  let ex; try { ex = X.tipos[id].generate(); } finally { G.setRandom(prev); }
  const spec = X.GRAFICAS[id](ex.data);
  assert(spec && spec.type === '2d', id + ': gráfica');
  (spec.curves || []).forEach((c) => assert(Number.isFinite(c.f(spec.x[0] + 0.5)), id + ': curva'));
});

// ---------- ensamblado, reproducibilidad, corrección ----------
const todos = (ex) => [].concat(...ex.grupos.map((g) => g.ejercicios));
const respOk = (ex) => { const r = {}; todos(ex).forEach((e) => { r[e.num] = e.partes.map((p) => G.answerStrings(p.answer)); }); return r; };
for (let i = 0; i < 60; i++) {
  const sel = ids.filter(() => Math.random() < 0.6); if (!sel.length) sel.push(ids[0]);
  const cfg = { tipos: sel, semilla: X.nuevaSemilla(), duracion: 90 };
  const ex = X.armarExamen(cfg), ej = todos(ex);
  const areas = ['algebra', 'analisis', 'probabilidad', 'inferencia'].filter((a) => sel.some((id) => X.tipos[id].area === a));
  assert.strictEqual(ex.grupos.length, areas.length);
  ej.forEach((e) => { assert(sel.includes(e.tipoId)); assert(Math.abs(e.partes.reduce((s, p) => s + p.pts, 0) - e.pts) < 1e-9); assert.strictEqual(e.pts, PTS[X.tipos[e.tipoId].area]); });
  ex.grupos.forEach((g) => {
    assert.strictEqual(g.n, g.area === 'algebra' || g.area === 'analisis' ? 2 : 1);
    if (g.n === 2) assert.deepStrictEqual(g.ejercicios.map((e) => e.num.slice(-1)), ['A', 'B']);
    const pool = sel.filter((id) => X.tipos[id].area === g.area);
    if (pool.length >= 2 && g.n === 2) assert.notStrictEqual(g.ejercicios[0].tipoId, g.ejercicios[1].tipoId, 'A y B de tipos distintos si se puede');
  });
  assert.deepStrictEqual(ex.grupos.map((g) => g.ejercicios[0].num.replace(/[AB]/, '')), ex.grupos.map((_, k) => String(k + 1)), 'numeración seguida');
  if (areas.length === 4) assert.deepStrictEqual(ej.map((e) => e.num), ['1A', '1B', '2A', '2B', '3', '4']);
  assert.strictEqual(ex.ptsTotal, areas.reduce((s, a) => s + PTS[a], 0));
  assert.strictEqual(ex.conTabla, areas.includes('probabilidad') || areas.includes('inferencia'));
  // mismo código, mismo examen
  const c = X.parseCodigo(ex.codigo);
  assert.deepStrictEqual(c.tipos.slice().sort(), sel.slice().sort());
  assert.deepStrictEqual(todos(X.armarExamen(c)).map((e) => e.enunciado), ej.map((e) => e.enunciado), 'reproducibilidad');
  // corrección: todo bien = 10, nada = 0, una parte mal resta sus puntos
  const resp = respOk(ex);
  let r = X.corregir(ex, resp, []);
  assert.strictEqual(r.sobre10, 10);
  assert(near(r.max, ex.ptsTotal));
  assert.strictEqual(r.ejercicios.filter((e) => e.evaluado).length, ex.grupos.length);
  r = X.corregir(ex, {}, []); assert.strictEqual(r.sobre10, 0);
  const ev1 = r.ejercicios.find((e) => e.evaluado).num;
  const resp2 = JSON.parse(JSON.stringify(resp)); resp2[ev1][0] = resp2[ev1][0].map(() => '999');
  r = X.corregir(ex, resp2, []);
  assert(near(r.nota, r.max - ej.find((e) => e.num === ev1).partes[0].pts) && r.sobre10 < 10);
  total++;
}
// código
assert.strictEqual(X.parseCodigo('hola'), null);
assert.strictEqual(X.parseCodigo('2026-abc123-1f-90'), null);
const cc = X.codigoDe({ semilla: 'abc123', tipos: ['trozos', 'binomial'], duracion: 75 });
assert.deepStrictEqual(X.parseCodigo(cc), { semilla: 'abc123', tipos: ['trozos', 'binomial'], duracion: 75 });
// elección entre las opciones A y B: sólo puntúa la elegida; sin elegir, la respondida; si no, la A
{
  const ex = X.armarExamen({ tipos: ids, semilla: 'elegir1', duracion: 90 });
  const g1 = ex.grupos[0].ejercicios, resp = respOk(ex);
  let r = X.corregir(ex, resp, [g1[1].num]);
  assert(r.ejercicios.find((e) => e.num === g1[1].num).evaluado && !r.ejercicios.find((e) => e.num === g1[0].num).evaluado);
  assert.strictEqual(r.sobre10, 10);
  const soloB = { [g1[1].num]: resp[g1[1].num] };
  r = X.corregir(ex, soloB, []);
  assert(r.ejercicios.find((e) => e.num === g1[1].num).evaluado, 'se evalúa la opción respondida');
  r = X.corregir(ex, {}, []);
  assert(r.ejercicios.find((e) => e.num === g1[0].num).evaluado, 'sin respuestas, la opción A');
}
console.log('OK: ' + total + ' ejercicios y exámenes CCSS verificados (' + ids.length + ' tipos)');
