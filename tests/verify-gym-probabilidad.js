// Verificadores independientes de assets/gym/probabilidad.js. Recalculan desde ch.data por enumeración o conteo directo.
const val = (ch) => ch.answer.value.n / ch.answer.value.d;
const approx = (a, b) => Math.abs(a - b) < 1e-12;
// Universo de d casos con A = primeros a, B = c en A y b-c fuera: |A∩B|=c.
function build(d, a, b, c) {
  const A = new Set(), B = new Set();
  for (let i = 0; i < a; i++) A.add(i);
  for (let i = a - c; i < a - c + b; i++) B.add(i);
  return { A, B, U: Array.from({ length: d }, (_, i) => i) };
}
const cnt = (U, f) => U.filter(f).length;

module.exports = {
  'pro-laplace': (ch, { assert }) => {
    const d = ch.data, v = val(ch);
    if (d.ctx === 'dados') {
      const f = { suma: (a, b) => a + b === d.s, sumage: (a, b) => a + b >= d.s, iguales: (a, b) => a === b, alguno: (a, b) => a === d.k || b === d.k,
        par: (a, b) => (a * b) % 2 === 0, dif: (a, b) => Math.abs(a - b) === d.dd, mult: (a, b) => (a + b) % 3 === 0 }[d.kind];
      let fav = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (f(a, b)) fav++;
      const closed = { suma: 6 - Math.abs(d.s - 7), iguales: 6, alguno: 11, par: 27, dif: 2 * (6 - d.dd), mult: 12 }[d.kind];
      if (closed !== undefined) assert.strictEqual(fav, closed);
      if (d.kind === 'sumage') { let s = 0; for (let t = d.s; t <= 12; t++) s += 6 - Math.abs(t - 7); assert.strictEqual(fav, s); }
      assert(approx(v, fav / 36));
    } else if (d.ctx === 'urna') {
      const T = d.r + d.a + d.v;
      const fav = { roja: d.r, nov: d.a + d.r, roa: d.r + d.a, noroja: d.a + d.v }[d.kind];
      assert(approx(v, fav / T));
    } else {
      const fav = { palo: 10, figura: 12, rey: 4, figpalo: 19, nofig: 28, figdepalo: 3, asopalo: 13 }[d.kind];
      assert(approx(v, fav / 40));
    }
  },
  'pro-union': (ch, { assert }) => {
    const { op, d, a, b, c } = ch.data;
    const { A, B, U } = build(d, a, b, c);
    const f = {
      union: (x) => A.has(x) || B.has(x), inter: (x) => A.has(x) && B.has(x),
      ninguno: (x) => !A.has(x) && !B.has(x), nointer: (x) => !(A.has(x) && B.has(x)), solo: (x) => A.has(x) && !B.has(x),
    }[op];
    assert(approx(val(ch), cnt(U, f) / d));
    assert(cnt(U, (x) => A.has(x) && B.has(x)) === c);
  },
  'pro-cond': (ch, { assert }) => {
    const { op, d, a, b, c } = ch.data;
    const { A, B, U } = build(d, a, b, c);
    const AB = (x) => A.has(x) && B.has(x);
    const v = {
      cond: cnt(U, AB) / cnt(U, (x) => B.has(x)), prod: cnt(U, AB) / d, union: cnt(U, (x) => A.has(x) || B.has(x)) / d,
      inv: cnt(U, AB) / cnt(U, (x) => A.has(x)), compl: cnt(U, (x) => B.has(x) && !A.has(x)) / cnt(U, (x) => B.has(x)),
    }[op];
    assert(approx(val(ch), v));
  },
  'pro-indep': (ch, { assert }) => {
    const d = ch.data;
    if (d.caso === 'test') {
      assert.strictEqual(d.indep, Math.abs(d.pab - d.pa * d.pb) < 1e-12);
      assert.strictEqual(ch.answer.value, d.indep ? 0 : 1);
      assert(d.pab >= 0 && d.pab <= Math.min(d.pa, d.pb) + 1e-12);
    } else if (d.caso === 'inter') assert(approx(val(ch), d.pa * d.pb));
    else if (d.caso === 'union') assert(approx(val(ch), 1 - (1 - d.pa) * (1 - d.pb)));
    else { assert(approx(val(ch), d.pb)); assert(approx(1 - (1 - d.pa) * (1 - d.pb), d.pu)); }
  },
  'pro-tabla': (ch, { assert }) => {
    const { preg, w, x, y, z } = ch.data;
    const N = w + x + y + z;
    const pop = [];
    [[1, 1, w], [1, 0, x], [0, 1, y], [0, 0, z]].forEach(([A, B, n]) => { for (let i = 0; i < n; i++) pop.push([A, B]); });
    assert.strictEqual(pop.length, N);
    const c = (f) => pop.filter(f).length;
    const v = {
      inter: c((q) => q[0] && q[1]) / N, union: c((q) => q[0] || q[1]) / N,
      cond1: c((q) => q[0] && q[1]) / c((q) => q[1]), cond2: c((q) => q[0] && q[1]) / c((q) => q[0]),
      compl: c((q) => !q[0] && !q[1]) / c((q) => !q[1]),
    }[preg];
    assert(approx(val(ch), v));
  },
  'pro-total': (ch, { assert }) => {
    const { pr, cd } = ch.data;
    let tot = 0;
    pr.forEach((p, i) => { const n = p * 100; const b = n * cd[i] / 100; assert(Number.isInteger(b)); tot += b; });   // población de 10000
    assert(approx(val(ch), tot / 10000));
    assert.strictEqual(pr.reduce((s, x) => s + x, 0), 100);
  },
  'pro-bayes': (ch, { assert }) => {
    const { pr, cd, idx } = ch.data;
    const cells = pr.map((p, i) => p * 100 * cd[i] / 100);
    const tot = cells.reduce((s, x) => s + x, 0);
    assert(Math.abs(ch.answer.value - cells[idx] / tot) < 1e-12);
    assert.strictEqual(pr.reduce((s, x) => s + x, 0), 100);
  },
  'pro-extrac': (ch, { assert }) => {
    const { n, r, b, repl, suc } = ch.data;
    const T = r + b;
    let fav = 0, all = 0;
    const rec = (seq) => {   // secuencias de índices de bolas (0..r-1 rojas, resto blancas)
      if (seq.length === n) {
        all++;
        const k = seq.filter((i) => i < r).length;
        if (suc === 'todas' ? k === n : suc === 'ninguna' ? k === 0 : suc === 'alguna' ? k >= 1 : k === 1) fav++;
        return;
      }
      for (let i = 0; i < T; i++) if (repl || !seq.includes(i)) rec(seq.concat(i));
    };
    rec([]);
    assert(approx(val(ch), fav / all));
  },
};
