// Uso: node tests/gym.test.js   — genera cientos de retos por módulo y verifica respuestas.
const assert = require('assert');
const G = require('../assets/gym/gym.js');
require('../assets/gym/matrices.js');
require('../assets/gym/determinantes.js');
require('../assets/gym/sistemas.js');
require('../assets/gym/vectores.js');
require('../assets/gym/rectasplanos.js');

const N = Number(process.env.GYM_N || 300);
const { M, mmul, mI, det, rankOf, meq, flatten, checkAnswer, answerStrings } = G;

// Comprobación independiente (enteros/flotantes) de cada tipo de reto.
const toNum = (A) => A.map((r) => r.map((x) => x.n / x.d));
function mulNum(A, B) { return A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0))); }
function rankNum(A0) {
  const A = A0.map((r) => r.slice()); let r = 0;
  for (let c = 0; c < A[0].length && r < A.length; c++) {
    let p = -1; for (let i = r; i < A.length; i++) if (Math.abs(A[i][c]) > 1e-9 && (p < 0 || Math.abs(A[i][c]) > Math.abs(A[p][c]))) p = i;
    if (p < 0) continue; [A[r], A[p]] = [A[p], A[r]];
    for (let i = r + 1; i < A.length; i++) { const k = A[i][c] / A[r][c]; A[i] = A[i].map((x, j) => x - k * A[r][j]); }
    r++;
  }
  return r;
}
function detNum(A) {
  const n = A.length; const B = A.map((r) => r.slice()); let d = 1;
  for (let c = 0; c < n; c++) {
    let p = c; for (let i = c + 1; i < n; i++) if (Math.abs(B[i][c]) > Math.abs(B[p][c])) p = i;
    if (Math.abs(B[p][c]) < 1e-12) return 0;
    if (p !== c) { [B[p], B[c]] = [B[c], B[p]]; d = -d; }
    d *= B[c][c];
    for (let i = c + 1; i < n; i++) { const k = B[i][c] / B[c][c]; B[i] = B[i].map((x, j) => x - k * B[c][j]); }
  }
  return d;
}
const near = (a, b) => Math.abs(a - b) < 1e-6;
const nearM = (A, B) => A.every((r, i) => r.every((x, j) => near(x, B[i][j])));

const verify = {
  producto(ch) { assert(nearM(mulNum(toNum(ch.data.A), toNum(ch.data.B)), toNum(ch.answer.value))); },
  potencias(ch) {
    let R = toNum(mI(ch.data.A.length)); const A = toNum(ch.data.A);
    for (let i = 0; i < ch.data.N; i++) R = mulNum(R, A);
    assert(nearM(R, toNum(ch.answer.value)));
  },
  determinante(ch) { assert(near(detNum(toNum(ch.data.A)), ch.answer.value.n)); },
  inversa(ch) { const n = ch.data.A.length; assert(nearM(mulNum(toNum(ch.data.A), toNum(ch.answer.value)), toNum(mI(n)))); },
  rango(ch) { assert.strictEqual(rankNum(toNum(ch.data.A)), ch.answer.value.n); assert.strictEqual(ch.data.rank, ch.answer.value.n); },
  parametrica(ch) {
    ch.answer.value.forEach((r) => assert(near(detNum(ch.data.T.map((row) => row.map((e) => e.a * r.n + e.b))), 0)));
    // no hay otras raíces enteras en [-9,9]
    for (let m = -9; m <= 9; m++) {
      const z = near(detNum(ch.data.T.map((row) => row.map((e) => e.a * m + e.b))), 0);
      assert.strictEqual(z, ch.answer.value.some((r) => r.n === m), 'raíces m=' + m);
    }
  },
  ecuaciones(ch) {
    const { eq, A, B, C, X } = ch.data;
    assert(meq(X, ch.answer.value));
    if (eq === 'ax') assert(meq(mmul(A, X), B));
    if (eq === 'axb') assert(meq(mmul(mmul(A, X), B), C));
    if (eq === 'axx') assert(meq(G.madd(mmul(A, X), X), B));
  },
};

verify.propiedades = (ch) => {
  const { n, d, e, k, build } = ch.data;
  const U = G.lib.unimodular(n > 3 ? 3 : n, 9);
  // A con det = d y B con det = e, de orden n (bloques con unimodulares para que no sean triviales)
  const mk = (x) => { const Z = G.mz(n, n); for (let i = 0; i < n; i++) Z[i][i] = G.F(i === 0 ? x : 1); const P = G.lib.unimodular(n, 9); return G.mmul(G.mmul(P, Z), G.inverse(P)); };
  const A = mk(d), B = mk(e);
  assert.strictEqual(G.det(A).n, d);
  assert(G.feq(G.det(build(A, B, k)), ch.answer.value), 'propiedad incorrecta');
};
verify.filas = (ch) => {
  const { T, k } = ch.data;
  for (let t = 0; t < 5; t++) {
    const A0 = G.lib.randMat(3, 3, -4, 4);
    const d0 = detNum(toNum(A0));
    const TA = mulNum(T, toNum(A0));
    assert(near(detNum(TA) * k, detNum(T) * d0 * k));
    assert(near(detNum(T) * k, ch.answer.value.n));
  }
};
verify.clasificar = (ch) => {
  const { A, b, t } = ch.data;
  const rA = rankNum(A), rAm = rankNum(A.map((r, i) => r.concat([b[i]])));
  assert.strictEqual(t, rA < rAm ? 2 : rA === 3 ? 0 : 1);
  assert.strictEqual(ch.answer.value, t);
};
verify.resolver = (ch) => {
  const { A, b, sol } = ch.data;
  A.forEach((r, i) => assert.strictEqual(r.reduce((s, x, j) => s + x * sol[j], 0), b[i]));
  assert(ch.answer.value[0].every((x, j) => x.n === sol[j] && x.d === 1));
};
verify.discutir = (ch) => {
  const { T, b } = ch.data;
  const at = (m) => T.map((r) => r.map((e) => e.a * m + e.b));
  for (let m = -9; m <= 9; m++) {
    const A = at(m), crit = Math.abs(detNum(A)) < 1e-9;
    assert.strictEqual(ch.answer.value.some((r) => r.n === m), crit, 'crítico m=' + m);
    if (crit) {
      const info = ch.data.infos.find((q) => q.r === m);
      const rA = rankNum(A), rAm = rankNum(A.map((r, i) => r.concat([b[i]])));
      assert.strictEqual(info.t, rA < rAm ? 2 : 1);
    }
  }
};

// ---- Geometría (temas 4 y 5): comprobaciones independientes ----
const dotN = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
const vals = (ch) => ch.answer.value[0].map((x) => x.n / x.d);
const planeAt = (c, P) => c[0] * P[0] + c[1] * P[1] + c[2] * P[2] + c[3];
const mixN = (a, b, c) => detNum([a, b, c]);
verify.vectorial = (ch) => {
  const { op, u, v, w } = ch.data;
  if (op === 'esc') assert.strictEqual(ch.answer.value.n, dotN(u, v));
  if (op === 'vec') {
    const c = vals(ch);
    assert(near(dotN(c, u), 0) && near(dotN(c, v), 0));
    // |u x v|^2 = |u|^2|v|^2 - (u.v)^2
    assert(near(dotN(c, c), dotN(u, u) * dotN(v, v) - dotN(u, v) ** 2));
  }
  if (op === 'mix') assert(near(mixN(u, v, w), ch.answer.value.n));
};
verify.angulo = (ch) => {
  const { u, v, nu, nv } = ch.data;
  assert.strictEqual(nu * nu, dotN(u, u)); assert.strictEqual(nv * nv, dotN(v, v));
  assert(near(ch.answer.value.n / ch.answer.value.d * nu * nv, dotN(u, v)));
};
verify.areas = (ch) => {
  const { fig, u, v, w, n, d } = ch.data; const a = ch.answer.value.n / ch.answer.value.d;
  const c = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  if (fig === 'par') assert(near(a * a, dotN(c, c)));
  if (fig === 'tri') assert(near(4 * a * a, dotN(c, c)));
  if (fig === 'pipe') assert(near(a, Math.abs(mixN(u, v, w))));
  if (fig === 'tetra') assert(near(6 * a, Math.abs(mixN(u, v, w))));
};
verify.puntos = (ch) => {
  const { op, A, B, C } = ch.data; const r = vals(ch);
  r.forEach((x, i) => {
    if (op === 'med') assert(near(2 * x, A[i] + B[i]));
    if (op === 'sim') assert(near((x + A[i]) / 2, B[i]));
    if (op === 'par') assert(near(x - A[i], C[i] - B[i]));
    if (op === 'bar') assert(near(3 * x, A[i] + B[i] + C[i]));
  });
};
verify.vparam = (ch) => {
  const d = ch.data;
  if (d.tipo === 'perp') { const m = ch.answer.value.n / ch.answer.value.d; assert(near(dotN([m, d.a, d.b], d.v), 0)); }
  if (d.tipo === 'par') { const m = ch.answer.value.n; const u = [m, d.u[1], d.u[2]]; assert(near(Math.hypot(...[u[1] * d.v[2] - u[2] * d.v[1], u[2] * d.v[0] - u[0] * d.v[2], u[0] * d.v[1] - u[1] * d.v[0]]), 0)); }
  if (d.tipo === 'cop') for (let m = -9; m <= 9; m++) {
    const z = near(detNum(d.T.map((r) => r.map((e) => e.a * m + e.b))), 0);
    assert.strictEqual(z, ch.answer.value.some((r) => r.n === m));
  }
};
verify.plano = (ch) => {
  const eq = vals(ch), d = ch.data;
  d.pts.forEach((P) => assert(near(planeAt(ch.data.eq, P), 0)));
  assert(near(Math.hypot(...eq.map((x, i) => x - ch.data.eq[i])), 0));
  // la normal es perpendicular a los vectores del plano
  d.pts.slice(1).forEach((P) => assert(near(dotN(ch.data.eq.slice(0, 3), [P[0] - d.pts[0][0], P[1] - d.pts[0][1], P[2] - d.pts[0][2]]), 0)));
  assert(near(Math.abs(dotN(ch.data.eq.slice(0, 3), d.n)), Math.sqrt(dotN(d.n, d.n) * dotN(ch.data.eq.slice(0, 3), ch.data.eq.slice(0, 3)))));
};
verify.interseccion = (ch) => {
  const { Q, v, pl } = ch.data; const I = vals(ch);
  assert(near(planeAt(pl, I), 0));
  const w = [I[0] - Q[0], I[1] - Q[1], I[2] - Q[2]];
  const c = [w[1] * v[2] - w[2] * v[1], w[2] * v[0] - w[0] * v[2], w[0] * v[1] - w[1] * v[0]];
  assert(near(Math.hypot(...c), 0), 'el punto no está en la recta');
};
verify.posicion = (ch) => {
  const d = ch.data;
  if (d.tipo === 'planos') {
    const rA = rankNum([d.c1.slice(0, 3), d.c2.slice(0, 3)]), rB = rankNum([d.c1, d.c2]);
    assert.strictEqual(d.t, rA === 2 ? 0 : rB === 2 ? 1 : 2);
  }
  if (d.tipo === 'rectas') {
    const PQ = [d.Q[0] - d.P[0], d.Q[1] - d.P[1], d.Q[2] - d.P[2]];
    const r1 = rankNum([d.u, d.v]), r2 = rankNum([d.u, d.v, PQ]);
    assert.strictEqual(d.t, r1 === 1 ? (r2 === 1 ? 1 : 0) : r2 === 2 ? 2 : 3);
  }
  if (d.tipo === 'rp') {
    const nv = dotN(d.n, d.v), onP = planeAt([d.n[0], d.n[1], d.n[2], d.D], d.P) === 0;
    assert.strictEqual(d.t, nv !== 0 ? 0 : onP ? 2 : 1);
  }
};
verify.distancias = (ch) => {
  const d = ch.data, a = ch.answer.value.n / ch.answer.value.d;
  assert(near(a, d.dist));
  if (d.tipo === 'pp') assert(near(a, Math.abs(planeAt([...d.n, d.D], d.P)) / Math.hypot(...d.n)));
  if (d.tipo === 'pr') {
    const w = [d.P[0] - d.Q[0], d.P[1] - d.Q[1], d.P[2] - d.Q[2]];
    const c = [w[1] * d.v[2] - w[2] * d.v[1], w[2] * d.v[0] - w[0] * d.v[2], w[0] * d.v[1] - w[1] * d.v[0]];
    assert(near(a, Math.hypot(...c) / Math.hypot(...d.v)));
  }
  if (d.tipo === 'pl') { // un punto del plano 1 cae a esa distancia del plano 2
    const n1 = d.c1.slice(0, 3), k = d.c2[0] / n1[0] || d.c2[1] / n1[1] || d.c2[2] / n1[2];
    const P = n1.map((x) => -d.c1[3] * x / dotN(n1, n1));
    assert(near(planeAt(d.c1, P), 0));
    assert(near(Math.abs(planeAt(d.c2, P)) / Math.hypot(...d.c2.slice(0, 3)), a));
  }
};
verify.simetrico = (ch) => {
  const { pl, P, Ps } = ch.data; const r = vals(ch);
  const M2 = P.map((x, i) => (x + r[i]) / 2);
  assert(near(planeAt(pl, M2), 0));
  assert(near(Math.hypot(...P.map((x, i) => x - r[i])), Math.hypot(...P.map((x, i) => x - Ps[i]))));
  const dv = P.map((x, i) => r[i] - x), n = pl.slice(0, 3);
  assert(near(Math.abs(dotN(dv, n)), Math.hypot(...dv) * Math.hypot(...n)));
};

let total = 0;
for (const id of Object.keys(G.modules)) {
  const mod = G.modules[id];
  const combos = (mod.params || []).reduce((acc, p) => acc.flatMap((c) => p.options.map(([v]) => Object.assign({}, c, { [p.key]: v }))), [{}]);
  for (const params of combos) {
    for (let i = 0; i < N; i++) {
      const ch = mod.generate(params);
      const ctx = id + ' ' + JSON.stringify(params);
      assert(ch.prompt && ch.steps.length, ctx + ': prompt/steps vacíos');
      [ch.prompt].concat(ch.steps).forEach((s) => assert(!/NaN|undefined|null|Infinity/.test(s), ctx + ': texto con basura: ' + s));
      ch.steps.forEach((s) => assert((s.match(/\$/g) || []).length % 2 === 0, ctx + ': $ desparejados'));
      const r = checkAnswer(ch.answer, answerStrings(ch.answer));
      assert.strictEqual(r.status, 'ok', ctx + ': la respuesta correcta no pasa el corrector');
      if (ch.answer.kind === 'matrix' && ch.answer.value.length * ch.answer.value[0].length > 1 && !(ch.answer.proportional && flatten(ch.answer.value).filter((x) => x.n !== 0).length < 2)) {
        const bad = answerStrings(ch.answer); bad[0] = String(Number(eval(bad[0].includes('/') ? bad[0] : bad[0])) + 1);
        assert.strictEqual(checkAnswer(ch.answer, bad).status, 'wrong', ctx + ': respuesta alterada aceptada');
      }
      verify[id](ch);
      total++;
    }
  }
}
// parseo
assert.strictEqual(G.fstr(G.parseFrac('1,5')), '3/2');
assert.strictEqual(G.fstr(G.parseFrac(' −2 ')), '-2');
assert.strictEqual(G.fstr(G.parseFrac('6/4')), '3/2');
assert.strictEqual(G.parseFrac('abc'), null);
assert.strictEqual(G.parseFrac('1/0'), null);
console.log('OK: ' + total + ' retos verificados en ' + Object.keys(G.modules).length + ' módulos');
