// Verificadores independientes de assets/gym/limites.js: recalculan los límites evaluando f numéricamente.
const rel = (a, b, tol) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const sign = Math.sign;
const val = (spec) => spec.value.n / spec.value.d;
const classify = (v, tol) => (v > 1e6 ? Infinity : v < -1e6 ? -Infinity : v);

module.exports = {
  'lim-infinito'(ch, { assert }) {
    const d = ch.data;
    if (d.tipo === 'raiz') {
      assert(rel(d.f(d.sx * 1e6), val(ch.answer), 1e-4), 'raíz: ' + d.f(d.sx * 1e6));
      assert(rel(d.f(d.sx * 1e7), val(ch.answer), 1e-5));
      return;
    }
    let claim;
    if (d.tipo === 'orden') {
      const o = d.f(d.big);
      claim = Math.abs(o) < 1e-6 ? 0 : o > 1e6 ? Infinity : NaN;
      assert(!Number.isNaN(claim), 'orden indecidible ' + o);
      assert.strictEqual(ch.answer.options.length, 3);
      assert.strictEqual(d.opts[ch.answer.value], claim);
      return;
    }
    const o = d.f(d.sx * 1e6);
    if (Math.abs(o) > 1e3) claim = o > 0 ? Infinity : -Infinity;
    else if (Math.abs(o) < 1e-3) claim = 0;
    else claim = o;
    const chosen = d.opts[ch.answer.value];
    if (Math.abs(claim) === Infinity || claim === 0) assert.strictEqual(chosen, claim);
    else assert(rel(chosen, claim, 1e-4), 'finito ' + chosen + ' vs ' + claim);
    assert.strictEqual(new Set(d.opts.map((x) => String(Math.round(x * 1e9) / 1e9))).size, 4, 'opciones repetidas');
    assert.strictEqual(ch.answer.options.length, 4);
  },
  'lim-punto'(ch, { assert }) {
    const d = ch.data;
    if (d.tipo === 'lat') {
      const o = d.f(d.a + d.side * 1e-7);
      assert(Math.abs(o) > 1e5);
      assert.strictEqual(ch.answer.value, o > 0 ? 0 : 1);
      assert.strictEqual(sign(o), d.sign);
      return;
    }
    const h = 1e-6;
    const L = d.f(d.a - h), R = d.f(d.a + h);
    assert(rel(L, d.val, 1e-4) && rel(R, d.val, 1e-4), d.tipo + ' ' + L + ' ' + R + ' ' + d.val);
    assert(rel((L + R) / 2, val(ch.answer), 1e-4));
  },
  'lim-infmenosinf'(ch, { assert }) {
    const d = ch.data;
    assert(rel(d.f(d.xe), val(ch.answer), 1e-4), d.tipo + ': ' + d.f(d.xe));
    assert(rel(d.f(d.xe / 10), val(ch.answer), 1e-3));
  },
  'lim-uno-infinito'(ch, { assert }) {
    const d = ch.data;
    const v = d.f(d.xe);
    assert(rel(v, ch.answer.value, 2e-3), d.tipo + ': ' + v + ' vs ' + ch.answer.value);
    assert(rel(Math.log(ch.answer.value), d.rex, 1e-9));
    if (d.tipo !== 'cero') assert(rel(d.f(-d.xe), ch.answer.value, 2e-3), 'en -inf');
  },
  'lim-hopital'(ch, { assert }) {
    const d = ch.data;
    const h = d.xe;
    const v = d.nivel === 'inf' ? d.f(h) : (d.f(h) + d.f(-h)) / 2;
    assert(rel(v, val(ch.answer), 2e-3), d.nivel + ': ' + v + ' vs ' + val(ch.answer));
  },
  'lim-continuidad'(ch, { assert }) {
    const d = ch.data;
    const cont = (v) => {
      const f = d.mk(v);
      return d.xs.every((x) => {
        const h = 1e-6, L = f(x - h), R = f(x + h), c = f(x);
        return Math.abs(L - R) < 1e-4 && Math.abs(c - (L + R) / 2) < 1e-4;
      });
    };
    const parts = ch.answer.kind === 'multi' ? ch.answer.parts.map(val) : [val(ch.answer)];
    assert.strictEqual(parts.length, d.sol.length);
    parts.forEach((x, i) => assert(Math.abs(x - d.sol[i]) < 1e-9));
    assert(cont(parts), 'no continua con la solución');
    parts.forEach((x, i) => { const w = parts.slice(); w[i] = x + 1; assert(!cont(w), 'la solución no es única en ' + i); });
  },
  'lim-discont'(ch, { assert }) {
    const d = ch.data, h = 1e-7;
    const L = d.f(d.a - h), R = d.f(d.a + h), c = d.f(d.a);
    let t;
    if (Math.abs(L) > 1e4 || Math.abs(R) > 1e4) t = 3;
    else if (Math.abs(L - R) > 1e-4) t = 2;
    else if (Number.isNaN(c) || Math.abs(c - L) > 1e-4) t = 1;
    else t = 0;
    assert.strictEqual(ch.answer.value, t, 'L=' + L + ' R=' + R + ' f(a)=' + c);
    assert.strictEqual(ch.answer.options.length, 4);
  },
  'lim-asintotas'(ch, { assert }) {
    const d = ch.data;
    if (d.tipo === 'vert') {
      const claimed = ch.answer.value.map((x) => x.n);
      const real = [];
      for (let x0 = -12; x0 <= 12; x0++) if (Math.abs(d.f(x0 + 1e-7)) > 1e4 || Math.abs(d.f(x0 - 1e-7)) > 1e4) real.push(x0);
      assert.deepStrictEqual(claimed.slice().sort((a, b) => a - b), real, 'verticales');
    } else if (d.tipo === 'horiz') {
      assert(rel(d.f(1e6), d.val, 1e-4) && rel(d.f(-1e6), d.val, 1e-4));
    } else if (d.tipo === 'obl') {
      const [m, n] = ch.answer.parts.map(val);
      assert(m === d.m && n === d.n);
      [1e6, -1e6].forEach((x) => assert(Math.abs(d.f(x) - (m * x + n)) < 1e-3));
      assert(rel(d.f(1e6) / 1e6, m, 1e-4));
    } else {
      const [yp, ym] = ch.answer.parts.map(val);
      assert(rel(d.f(40), yp, 1e-6) || rel(d.f(1e8), yp, 1e-6), 'y+ ' + d.f(40) + ' ' + yp);
      assert(rel(d.f(-40), ym, 1e-6) || rel(d.f(-1e8), ym, 1e-6), 'y- ' + d.f(-40) + ' ' + ym);
      assert(Math.abs(yp - d.yp) < 1e-9 && Math.abs(ym - d.ym) < 1e-9);
    }
  },
};
