// Verificadores independientes de assets/gym/integrales.js (tema 9). Integrales por Simpson / derivadas por diferencias finitas.
function simpson(f, a, b, n = 4000) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return s * h / 3;
}
const absInt = (h, a, b, n = 400000) => { // regla del punto medio sobre |h|
  const w = (b - a) / n; let s = 0;
  for (let i = 0; i < n; i++) s += Math.abs(h(a + (i + 0.5) * w));
  return s * w;
};
const d1 = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
const numVal = (ans) => (ans.kind === 'number' ? ans.value.n / ans.value.d : ans.value);
const close = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

function definida(ch, { assert }) {
  const { f, a, b } = ch.data;
  const I = simpson(f, a, b);
  assert(close(numVal(ch.answer), I, 1e-4), 'integral ' + numVal(ch.answer) + ' vs Simpson ' + I + ' :: ' + ch.prompt);
}

module.exports = {
  'int-indefinidas'(ch, { assert }) {
    const { f, cands, value } = ch.data;
    const xs = [0.31, 0.78, 1.25, 1.72, 2.19, 2.66, 3.13];
    xs.forEach((x) => assert(close(d1(cands[value], x), f(x), 1e-5), 'la primitiva correcta no deriva a f en x=' + x));
    cands.forEach((F, i) => {
      if (i === value) return;
      assert(xs.some((x) => Math.abs(d1(F, x) - f(x)) > 1e-3 * Math.max(1, Math.abs(f(x)))), 'la opción ' + i + ' también es primitiva');
    });
    assert.strictEqual(ch.answer.options.length, 4);
    assert.strictEqual(new Set(ch.answer.options).size, 4, 'opciones repetidas');
  },
  'int-barrow': definida,
  'int-sustitucion': definida,
  'int-partes': definida,
  'int-racionales'(ch, ctx) {
    const { assert } = ctx;
    const d = ch.data;
    if (d.tipo === 'coef') {
      const A = ch.answer.parts[0].value.n, B = ch.answer.parts[1].value.n;
      assert.strictEqual(A, d.A); assert.strictEqual(B, d.B);
      [-7.3, -1.7, 0.4, 2.9, 5.5].forEach((x) => {
        const lhs = (d.num[0] + d.num[1] * x) / ((x - d.r1) * (x - d.r2));
        assert(close(A / (x - d.r1) + B / (x - d.r2), lhs, 1e-9), 'descomposición');
      });
    } else definida(ch, ctx);
  },
  'int-primitiva'(ch, { assert }) {
    const { f, pp, q, r, ans } = ch.data;
    const exp = q + simpson(f, pp, r);       // F(r) = F(pp) + ∫_pp^r f
    assert(close(numVal(ch.answer), exp, 1e-6), 'F(r) ' + numVal(ch.answer) + ' vs ' + exp);
    assert(close(ans, exp, 1e-6));
  },
  'int-areas'(ch, { assert }) {
    const { h, a, b } = ch.data;
    const A = absInt(h, a, b);
    assert(close(numVal(ch.answer), A, 1e-6), 'área ' + numVal(ch.answer) + ' vs ' + A);
    assert(numVal(ch.answer) > 0);
  },
};
