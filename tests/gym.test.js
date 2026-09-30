// Uso: node tests/gym.test.js   — genera cientos de retos por módulo y verifica respuestas.
const assert = require('assert');
const G = require('../assets/gym/gym.js');
require('../assets/gym/matrices.js');
require('../assets/gym/determinantes.js');
require('../assets/gym/sistemas.js');

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
      if (ch.answer.kind === 'matrix' && ch.answer.value.length * ch.answer.value[0].length > 1) {
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
