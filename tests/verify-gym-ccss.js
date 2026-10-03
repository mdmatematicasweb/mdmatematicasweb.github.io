// Verificadores independientes de los módulos propios del curso CCSS (assets/gym/ccss-*.js).
// Cada función recibe el reto y recalcula la respuesta con otro método (enteros, fuerza bruta, otra fórmula).
const fval = (f) => f.n / f.d;
const near = (a, b, e = 1e-9) => Math.abs(a - b) < e;

// ---------- Álgebra (temas 1-3) ----------
const mulI = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const sat = (cons, x, y) => cons.every((k) => (k.op === '<=' ? k.a * x + k.b * y <= k.c : k.a * x + k.b * y >= k.c)) && x >= 0 && y >= 0;
/** Vértices enteros por fuerza bruta: puntos de la malla de la región que cumplen con igualdad al menos dos restricciones independientes. */
function latticeVertices(cons, top = 60) {
  const all = cons.concat([{ a: 1, b: 0, c: 0 }, { a: 0, b: 1, c: 0 }]);
  const out = [];
  for (let x = 0; x <= top; x++) for (let y = 0; y <= top; y++) {
    if (!sat(cons, x, y)) continue;
    const tight = all.filter((k) => k.a * x + k.b * y === k.c);
    let indep = false;
    for (let i = 0; i < tight.length && !indep; i++) for (let j = i + 1; j < tight.length; j++) if (tight[i].a * tight[j].b - tight[j].a * tight[i].b !== 0) { indep = true; break; }
    if (indep) out.push([x, y]);
  }
  return out;
}
const latticeOpt = (cons, p, q, kind, top = 80) => {
  let best = null, at = null, count = 0;
  for (let x = 0; x <= top; x++) for (let y = 0; y <= top; y++) {
    if (!sat(cons, x, y)) continue;
    const v = p * x + q * y;
    if (best === null || (kind === 'max' ? v > best : v < best)) { best = v; at = [x, y]; count = 1; } else if (v === best) count++;
  }
  return { best, at, count };
};

module.exports = {
  'ccss-mat-contexto': (ch, { assert }) => {
    const d = ch.data;
    if (d.tipo === 'ventas') {
      const R = mulI(d.V, d.p.map((x) => [x])).map((r) => r[0]);
      assert(ch.answer.value.every((r, i) => near(fval(r[0]), R[i])));
    } else if (d.tipo === 'coste') {
      const R = mulI(d.A, d.q.map((x) => [x])).map((r) => r[0]);
      assert(ch.answer.value.every((r, i) => near(fval(r[0]), R[i])));
    } else {
      // r·A·q multiplicando en el otro orden: (r·A)·q
      const rA = mulI([d.r], d.A)[0];
      assert(near(fval(ch.answer.value), rA[0] * d.q[0] + rA[1] * d.q[1]));
    }
  },
  'ccss-sis-matricial': (ch, { assert }) => {
    const { A, B } = ch.data;
    const X = ch.answer.value.map((r) => fval(r[0]));
    assert(X.every((x) => Number.isInteger(x) && x >= 1));
    assert(A.every((r, i) => near(r.reduce((s, a, k) => s + a * X[k], 0), B[i])), 'AX = B');
    const d = A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
    assert(d !== 0 && Math.abs(d) <= 9);
  },
  'ccss-pl-vertices': (ch, { assert }) => {
    const { cons, V } = ch.data;
    const bruto = latticeVertices(cons).sort((u, v) => (u[0] - v[0]) || (u[1] - v[1]));
    const resp = ch.answer.value.map((r) => [fval(r[0]), fval(r[1])]);
    assert(JSON.stringify(bruto) === JSON.stringify(resp), 'vértices ' + JSON.stringify(bruto) + ' vs ' + JSON.stringify(resp));
    assert(JSON.stringify(V) === JSON.stringify(resp));
  },
  'ccss-pl-optimo': (ch, { assert }) => {
    const d = ch.data;
    const o = latticeOpt(d.cons, d.p, d.q, d.tipo);
    assert(o.count === 1, 'óptimo único');
    const [x, y, f] = ch.answer.parts.map((q) => fval(q.value));
    assert(x === o.at[0] && y === o.at[1] && f === o.best, 'óptimo ' + JSON.stringify(o) + ' vs ' + [x, y, f]);
  },
  'ccss-pl-problema': (ch, { assert }) => {
    const d = ch.data;
    const o = latticeOpt(d.cons, d.p, d.q, d.tipo);
    assert(o.count === 1);
    const [x, y, f] = ch.answer.parts.map((q) => fval(q.value));
    assert(x === o.at[0] && y === o.at[1] && f === o.best);
    d.cons.forEach((k) => assert(ch.prompt.includes(String(k.c)) || k.b === 0 || k.a === 0, 'falta c=' + k.c + ' en el enunciado'));
  },

  // ---------- Funciones y economía (temas 4, 6 y 8) ----------
  'ccss-fun-dominio': (ch, { assert }) => {
    const d = ch.data;
    if (d.tipo === 'rac') {
      const den = (x) => d.den.reduce((s, [c, e]) => s + c * Math.pow(x, e), 0);
      const dado = ch.answer.value.map(fval).sort((a, b) => a - b);
      const bruto = []; for (let x = -30; x <= 30; x++) if (den(x) === 0) bruto.push(x);
      assert(JSON.stringify(dado) === JSON.stringify(bruto), 'excluidos ' + bruto + ' vs ' + dado);
    } else {
      const c = fval(ch.answer.value);
      const arg = (x) => d.a * x + d.b;
      assert(arg(c) === 0 && c === -d.b / d.a);
      const dentro = d.a > 0 ? c + 1 : c - 1, fuera = d.a > 0 ? c - 1 : c + 1;
      assert(arg(dentro) > 0 && arg(fuera) < 0);
    }
  },
  'ccss-fun-parabola': (ch, { assert }) => {
    const f = (x) => ch.data.t.reduce((s, [c, e]) => s + c * Math.pow(x, e), 0);
    if (ch.data.tipo === 'vertice') {
      const [h, k] = ch.answer.parts.map((q) => fval(q.value));
      assert(f(h) === k);
      const a = ch.data.t[0][0];
      for (const e of [0.5, 1, 2]) assert(a > 0 ? f(h + e) > k && f(h - e) > k : f(h + e) < k && f(h - e) < k, 'no es extremo');
    } else {
      const r = ch.answer.value.map(fval);
      assert(r.length === 2 && r[0] !== r[1] && r.every((x) => f(x) === 0));
    }
  },
  'ccss-fun-trozos': (ch, { assert }) => {
    const { fijo, r1, r2, c, xs } = ch.data;
    const T = (x) => (x <= c ? fijo + r1 * x : fijo + r1 * c + r2 * (x - c));
    ch.answer.value[0].forEach((v, i) => assert(near(fval(v), T(xs[i]), 1e-9), 'T(' + xs[i] + ')'));
    assert(xs[0] < c && xs[1] === c && xs[2] > c);
  },
  'ccss-fun-expolog': (ch, { assert }) => {
    const d = ch.data;
    const ans = fval(ch.answer.value);
    if (d.tipo === 'exp') assert(near(Math.pow(d.b, d.cf * ans + d.d), Math.pow(d.b, d.e), 1e-6 * Math.pow(d.b, d.e)));
    else if (d.tipo === 'log') { assert(ans + d.d > 0 && near(Math.log(ans + d.d) / Math.log(d.b), d.k, 1e-9)); }
    else { assert(Number.isInteger(ans) && d.P0 * Math.pow(d.b, ans) === d.N); for (let t = 0; t < ans; t++) assert(d.P0 * Math.pow(d.b, t) < d.N); }
  },
  'ccss-fun-rentabilidad': (ch, { assert }) => {
    const d = ch.data;
    if (d.tipo === 'lineal') {
      const [xs, b] = ch.answer.parts.map((q) => fval(q.value));
      assert(d.pp * xs === d.fijo + d.c * xs, 'I = C en el umbral');
      for (let x = 0; x < xs; x += 10) assert(d.pp * x < d.fijo + d.c * x);
      assert(b === d.pp * d.x1 - (d.fijo + d.c * d.x1));
    } else {
      const [h, bm] = ch.answer.parts.map((q) => fval(q.value));
      const B = (x) => x * (d.m - d.n * x) - (d.fijo + d.c * x);
      let best = -Infinity, at = -1; for (let x = 0; x <= 200; x++) if (B(x) > best) { best = B(x); at = x; }
      assert(at === h && best === bm, 'máximo ' + at + ',' + best + ' vs ' + h + ',' + bm);
      assert(d.m - d.n * h > 0);
    }
  },
  'ccss-der-marginal': (ch, { assert }) => {
    const { C, x0 } = ch.data;
    const f = (x) => C.reduce((s, [c, e]) => s + c * Math.pow(x, e), 0);
    const [m, r] = ch.answer.parts.map((q) => fval(q.value));
    const e = 1e-4;
    assert(near(m, (f(x0 + e) - f(x0 - e)) / (2 * e), 1e-3), 'derivada numérica');
    assert(r === f(x0 + 1) - f(x0));
  },
  'ccss-int-marginal': (ch, { assert }) => {
    const d = ch.data;
    const g = (x) => d.a1 * x / 10 + d.b1;
    const simpson = (a, b, n = 2000) => { const h = (b - a) / n; let s = g(a) + g(b); for (let i = 1; i < n; i++) s += g(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; };
    const ans = fval(ch.answer.value);
    if (d.tipo === 'incremento') assert(near(ans, simpson(d.lo, d.hi), 1e-6));
    else assert(near(ans, d.F0 + simpson(0, d.hi), 1e-6));
  },
};
