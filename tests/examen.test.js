// Uso: node tests/examen.test.js — verifica generadores, formatos, corrección y reproducibilidad del simulacro.
const assert = require('assert');
const G = require('../assets/gym/gym.js');
['matrices', 'determinantes', 'sistemas', 'vectores', 'rectasplanos'].forEach((f) => require('../assets/gym/' + f + '.js'));
const X = require('../assets/gym/examen.js');
require('../assets/gym/tipos-fase1.js');
require('../assets/gym/tipos-fase2.js');
// Fases posteriores: cada tipos-faseN.js tiene su verificador en tests/verify-faseN.js (exporta {id: fn(ex, ctx)}).
const fs = require('fs'), path = require('path');
const extraVerify = {};
// EXAM_FASES=3,5 limita qué fases extra se cargan (útil mientras se desarrollan varias a la vez).
const soloFases = process.env.EXAM_FASES ? process.env.EXAM_FASES.split(',').map(Number) : null;
for (let n = 3; n <= 9; n++) {
  if (soloFases && !soloFases.includes(n)) continue;
  const gen = path.join(__dirname, '../assets/gym/tipos-fase' + n + '.js');
  if (!fs.existsSync(gen)) continue;
  require(gen);
  Object.assign(extraVerify, require('./verify-fase' + n + '.js'));
}

const N = Number(process.env.EXAM_N || 150);
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const num = (f) => f.n / f.d;
const dotN = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
const crossN = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
const subN = (a, b) => a.map((x, i) => x - b[i]);
const detN = (A) => { const n = A.length; const B = A.map((r) => r.slice()); let d = 1; for (let c = 0; c < n; c++) { let p = c; for (let i = c + 1; i < n; i++) if (Math.abs(B[i][c]) > Math.abs(B[p][c])) p = i; if (Math.abs(B[p][c]) < 1e-12) return 0; if (p !== c) { [B[p], B[c]] = [B[c], B[p]]; d = -d; } d *= B[c][c]; for (let i = c + 1; i < n; i++) { const k = B[i][c] / B[c][c]; B[i] = B[i].map((x, j) => x - k * B[c][j]); } } return d; };
const rankN = (A0) => { const A = A0.map((r) => r.slice()); let r = 0; for (let c = 0; c < A[0].length && r < A.length; c++) { let p = -1; for (let i = r; i < A.length; i++) if (Math.abs(A[i][c]) > 1e-9 && (p < 0 || Math.abs(A[i][c]) > Math.abs(A[p][c]))) p = i; if (p < 0) continue; [A[r], A[p]] = [A[p], A[r]]; for (let i = r + 1; i < A.length; i++) { const k = A[i][c] / A[r][c]; A[i] = A[i].map((x, j) => x - k * A[r][j]); } r++; } return r; };
const mulN = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const toN = (A) => A.map((r) => r.map(num));

// ---------- verificación independiente por tipo ----------
const verify = {
  'sistema-param'(ex) {
    const d = ex.data, at = (m) => d.T.map((r) => r.map((e) => e.a * m + e.b));
    for (let m = -9; m <= 9; m++) assert.strictEqual(Math.abs(detN(at(m))) < 1e-9, d.roots.includes(m), 'crítico m=' + m);
    const aug = (m) => at(m).map((r, i) => r.concat([d.b[i]]));
    const rA = rankN(at(d.r1)), rAm = rankN(aug(d.r1));
    assert.strictEqual(d.t1, rA < rAm ? 2 : rA === 3 ? 0 : 1);
    const A0 = at(d.m0), sol = d.sol.map(num);
    A0.forEach((r, i) => assert(near(dotN(r, sol), d.b[i])));
  },
  'ec-matricial'(ex) {
    const d = ex.data, A = toN(d.A0), Xn = toN(d.Xs), Bn = toN(d.B);
    const at = (m) => d.T.map((r) => r.map((e) => e.a * m + e.b));
    for (let m = -9; m <= 9; m++) assert.strictEqual(Math.abs(detN(at(m))) < 1e-9, d.roots.includes(m));
    if (d.tipo === 'ax') assert(mulN(A, Xn).every((r, i) => r.every((x, j) => near(x, Bn[i][j]))));
    if (d.tipo === 'axx') assert(mulN(A, Xn).every((r, i) => r.every((x, j) => near(x + Xn[i][j], Bn[i][j]))));
    if (d.tipo === 'xa') assert(mulN(Xn, A).every((r, i) => r.every((x, j) => near(x, Bn[i][j]))));
  },
  'det-prop'(ex) { assert.strictEqual(ex.partes[0].answer.kind, 'number'); assert.strictEqual(ex.partes[1].answer.kind, 'number'); },
  'rectas-posicion'(ex) {
    const { P, u, Q0, k, v, a0, I } = ex.data;
    const Qa = (a) => Q0.map((x, i) => x + (i === k ? a : 0));
    const onR = (X) => Math.hypot(...crossN(subN(X, P), u)) < 1e-9;
    assert(onR(I));
    const Q = Qa(a0); assert(Math.hypot(...crossN(subN(I, Q), v)) < 1e-9);
    for (let a = -8; a <= 8; a++) {
      const cop = Math.abs(dotN(subN(Qa(a), P), crossN(u, v))) < 1e-9;
      assert.strictEqual(cop, a === a0, 'coplanarias a=' + a);
    }
    assert(ex.partes[0].answer.value.n === a0 && ex.partes[1].answer.value[0].every((x, i) => x.n === I[i]));
  },
  simetrico(ex) {
    const d = ex.data;
    if (d.tipo === 'plano') {
      const Ps = d.Ps.map(num), n = d.pl.slice(0, 3), mid = d.P.map((x, i) => (x + Ps[i]) / 2);
      assert(near(dotN(n, mid) + d.pl[3], 0));
      assert(Math.hypot(...crossN(subN(Ps, d.P), n)) < 1e-9);
      assert(near(d.dist, Math.abs(dotN(n, d.P) + d.pl[3]) / Math.hypot(...n)));
      assert(near(num(ex.partes[1].answer.value), d.dist));
    } else {
      const Ps = d.Ps.map(num), mid = d.P.map((x, i) => (x + Ps[i]) / 2);
      assert(Math.hypot(...crossN(subN(mid, d.Q), d.v)) < 1e-9);
      assert(near(dotN(subN(Ps, d.P), d.v), 0));
      assert(near(d.dist, Math.hypot(...crossN(subN(d.P, d.Q), d.v)) / Math.hypot(...d.v)));
      assert(near(G.parseExpr(ex.partes[1].answer.show), d.dist));
    }
  },
  'tangente-normal'(ex) {
    const d = ex.data, h = 1e-6;
    const num_df = (d.f(d.x0 + h) - d.f(d.x0 - h)) / (2 * h);
    assert(near(num_df, d.m, 1e-5));
    assert(near(d.m * d.x0 + d.n, d.f(d.x0)));
    assert(near(d.mn * d.m, -1)); assert(near(d.mn * d.x0 + d.nn, d.f(d.x0)));
    const [pm, pn] = ex.partes[0].answer.parts; assert(near(pm.value, d.m) && near(pn.value, d.n));
  },
  primitiva(ex) {
    const d = ex.data, h = 1e-6;
    const dom = [d.p, d.x1, d.a, d.b];
    dom.forEach((x) => assert(near((d.G(x + h) - d.G(x - h)) / (2 * h), d.fn(x), 1e-5), 'G\'≠f en ' + x));
    assert(near(d.F1, d.G(d.x1) - d.G(d.p) + d.q));
    // Simpson
    const n = 2000, w = (d.b - d.a) / n; let s = d.fn(d.a) + d.fn(d.b);
    for (let i = 1; i < n; i++) s += d.fn(d.a + i * w) * (i % 2 ? 4 : 2);
    assert(near(s * w / 3, d.I, 1e-6), 'integral');
  },
};

verify['sistema-plant'] = (ex) => {
  const { A, b, sol } = ex.data;
  A.forEach((r, i) => assert.strictEqual(r.reduce((s, x, j) => s + x * sol[j], 0), b[i]));
  assert(sol.every((x) => Number.isInteger(x) && x > 0));
  assert(Number.isInteger(ex.data.extra));
};
verify['sistema-sci'] = (ex) => {
  const d = ex.data;
  if (d.v === 'sci') {
    const sol = d.sol.map(num);
    d.A.forEach((r, i) => assert(near(dotN(r, sol), d.b[i]), 'sci: la solución no cumple'));
    [1, 2, 3].forEach((lam) => { const s2 = [num(d.x[0]) + num(d.x[1]) * lam, num(d.y[0]) + num(d.y[1]) * lam, lam]; d.A.forEach((r, i) => assert(near(dotN(r, s2), d.b[i]), 'familia')); });
  } else {
    const at = (m) => d.T.map((r) => r.map((e) => e.a * m + e.b));
    for (let m = -9; m <= 9; m++) assert.strictEqual(Math.abs(detN(at(m))) < 1e-9, d.roots.includes(m));
    const sol = d.sol.map(num); at(d.r1).forEach((r) => assert(near(dotN(r, sol), 0)));
    assert(near(sol[d.k], 1)); assert.strictEqual(rankN(at(d.r1)), 2);
  }
};
verify['matriz-pot-inv'] = (ex) => {
  const d = ex.data, A = toN(d.A);
  let P = A.map((r, i) => r.map((_, j) => (i === j ? 1 : 0)));
  for (let k = 0; k < d.n; k++) P = mulN(P, A);
  assert(P.every((r, i) => r.every((x, j) => near(x, num(d.An[i][j])))), 'A^n');
  const prod = mulN(A, toN(d.Ainv)); assert(prod.every((r, i) => r.every((x, j) => near(x, i === j ? 1 : 0))));
  let Q = A.map((r, i) => r.map((_, j) => (i === j ? 1 : 0))); for (let k = 0; k < d.p; k++) Q = mulN(Q, A);
  assert(Q.every((r, i) => r.every((x, j) => near(x, i === j ? d.eps : 0))));
};
verify['rango-inv-param'] = (ex) => {
  const d = ex.data, at = (m) => d.T.map((r) => r.map((e) => e.a * m + e.b));
  for (let m = -9; m <= 9; m++) assert.strictEqual(Math.abs(detN(at(m))) < 1e-9, d.roots.includes(m));
  d.roots.forEach((r, i) => assert.strictEqual(rankN(at(r)), d.ranks[i]));
  const prod = mulN(at(d.m0), toN(d.Ai)); assert(prod.every((r, i) => r.every((x, j) => near(x, i === j ? 1 : 0))));
};

const ctx = { assert, G, X, near, num, dotN, crossN, subN, detN, rankN, mulN, toN };
Object.keys(extraVerify).forEach((id) => { verify[id] = (ex) => extraVerify[id](ex, ctx); });

let total = 0;
const ids = X.CATALOGO.filter((t) => t.listo).map((t) => t.id);
ids.forEach((id) => assert(verify[id], id + ': falta verificador'));
ids.forEach((id) => {
  for (let i = 0; i < N; i++) {
    const prev = G.setRandom(G.seeded('t' + id + i));
    let ex;
    try { ex = X.tipos[id].generate(); } finally { G.setRandom(prev); }
    const suma = ex.partes.reduce((s, p) => s + p.pts, 0);
    assert(Math.abs(suma - 2.5) < 1e-9, id + ': puntos ' + suma);
    const txt = [ex.enunciado].concat(ex.partes.map((p) => p.texto), ...ex.partes.map((p) => p.steps));
    txt.forEach((t) => { assert(!/NaN|undefined|Infinity/.test(t), id + ': texto con basura: ' + t); assert(((t.replace(/\$\$/g, '').match(/\$/g)) || []).length % 2 === 0, id + ': $ desparejados: ' + t); });
    ex.partes.forEach((p) => {
      const strs = G.answerStrings(p.answer);
      assert.strictEqual(strs.length, X.cellsOf(p.answer), id + ': celdas');
      assert.strictEqual(G.checkAnswer(p.answer, strs).status, 'ok', id + ': la solución no pasa el corrector');
      assert(p.steps.length >= 1);
    });
    verify[id](ex);
    total++;
  }
});

// ---------- ensamblado, formatos, reproducibilidad, corrección ----------
const esperados = { 2026: { n: 6, ev: 4 }, 2025: { n: 7, ev: 4 }, 2024: { n: 8, ev: 4 }, clasico: { n: 8, ev: 4 } };
for (const fm of Object.keys(esperados)) {
  for (let i = 0; i < 25; i++) {
    const sel = ids.filter(() => Math.random() < 0.6); if (!sel.length) sel.push(ids[0]);
    const cfg = { formato: fm, tipos: sel, semilla: X.nuevaSemilla(), duracion: 90 };
    const ex = X.armarExamen(cfg);
    const todos = [].concat(...ex.grupos.map((g) => g.ejercicios));
    assert.strictEqual(todos.length, esperados[fm].n, fm);
    todos.forEach((e) => { assert(sel.includes(e.tipoId)); assert(Math.abs(e.partes.reduce((s, p) => s + p.pts, 0) - 2.5) < 1e-9); });
    if (fm === '2026') assert.deepStrictEqual(todos.map((e) => e.num), ['1', '2', '3.1', '3.2', '4.1', '4.2']);
    // mismo código, mismo examen
    const c = X.parseCodigo(ex.codigo);
    assert.deepStrictEqual(c.tipos.slice().sort(), sel.slice().sort());
    const ex2 = X.armarExamen(c);
    assert.deepStrictEqual([].concat(...ex2.grupos.map((g) => g.ejercicios)).map((e) => e.enunciado), todos.map((e) => e.enunciado), 'reproducibilidad');
    // con muchos tipos, no se repite tipo dentro de un bloque
    if (sel.length >= 2) ex.grupos.forEach((g) => { const t = g.ejercicios.map((e) => e.tipoId); assert.strictEqual(new Set(t).size, Math.min(t.length, sel.length) >= t.length ? t.length : new Set(t).size); });
    // corrección: todo bien = 10; nada = 0; una parte mal resta sus puntos
    const resp = {};
    todos.forEach((e) => { resp[e.num] = e.partes.map((p) => G.answerStrings(p.answer)); });
    let r = X.corregir(ex, resp, []);
    assert.strictEqual(r.sobre10, 10, 'todo correcto = 10 (' + fm + ')');
    assert.strictEqual(r.ejercicios.filter((e) => e.evaluado).length, esperados[fm].ev);
    r = X.corregir(ex, {}, []);
    assert.strictEqual(r.sobre10, 0);
    const ev1 = r.ejercicios.find((e) => e.evaluado).num;
    const resp2 = JSON.parse(JSON.stringify(resp)); resp2[ev1][0] = resp2[ev1][0].map(() => '999');
    r = X.corregir(ex, resp2, []);
    const perdido = todos.find((e) => e.num === ev1).partes[0].pts;
    assert(near(r.nota, r.max - perdido), 'una parte mal resta sus puntos');
    assert(r.sobre10 < 10);
    total++;
  }
}
// códigos
assert.strictEqual(X.parseCodigo('hola'), null);
const cc = X.codigoDe({ formato: '2026', semilla: 'abc123', tipos: ['rectas-posicion', 'primitiva'], duracion: 75 });
assert.deepStrictEqual(X.parseCodigo(cc), { formato: '2026', semilla: 'abc123', tipos: ['rectas-posicion', 'primitiva'], duracion: 75 });
// elección en bloque optativo: sólo puntúa el elegido
{
  const ex = X.armarExamen({ formato: '2026', tipos: ids, semilla: 'elegir1', duracion: 90 });
  const b1 = ex.grupos[1].ejercicios;
  const resp = {}; [].concat(...ex.grupos.map((g) => g.ejercicios)).forEach((e) => { resp[e.num] = e.partes.map((p) => G.answerStrings(p.answer)); });
  const r = X.corregir(ex, resp, [b1[1].num]);
  assert(r.ejercicios.find((e) => e.num === b1[1].num).evaluado && !r.ejercicios.find((e) => e.num === b1[0].num).evaluado);
  assert.strictEqual(r.sobre10, 10);
}
console.log('OK: ' + total + ' ejercicios y exámenes verificados (' + ids.length + ' tipos)');
