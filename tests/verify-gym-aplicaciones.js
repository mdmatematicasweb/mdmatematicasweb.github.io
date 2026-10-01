// Verificadores independientes de assets/gym/aplicaciones.js (tema 8). Todo se recalcula numéricamente desde ch.data.
const d1 = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
const d2 = (f, x, h = 1e-2) => (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
/** Cambios de signo de g en [lo,hi] (rejilla desplazada para no caer en enteros), refinados por bisección. */
function signChanges(g, lo, hi, step = 0.0371) {
  const out = [];
  let x = lo + 0.0123, gp = g(x);
  for (; x < hi; ) {
    const xn = x + step, gn = g(xn);
    if (Number.isFinite(gp) && Number.isFinite(gn) && gp * gn < 0 && Math.abs(gp) < 1e6 && Math.abs(gn) < 1e6) {
      let a = x, b = xn;
      for (let i = 0; i < 60; i++) { const m = (a + b) / 2; if (g(a) * g(m) <= 0) b = m; else a = m; }
      out.push({ x: (a + b) / 2, from: Math.sign(gp), to: Math.sign(gn) });
    }
    x = xn; gp = gn;
  }
  return out;
}
const val = (q) => q.n / q.d;
const sortNum = (a) => a.map((x) => x + 0).sort((x, y) => x - y);

module.exports = {
  'apl-criticos'(ch, { assert, near }) {
    const { f, crit, kinds, ask } = ch.data;
    const sc = signChanges((x) => d1(f, x), -7, 7);
    assert.strictEqual(sc.length, crit.length, 'nº de puntos críticos');
    sortNum(crit).forEach((r, i) => assert(Math.abs(sc[i].x - r) < 1e-3, 'crítico ' + r + ' vs ' + sc[i].x));
    if (ask === 'puntos') {
      assert.deepStrictEqual(sortNum(ch.answer.value.map(val)), sortNum(crit));
    } else {
      const mx = sc.filter((s) => s.from > 0).map((s) => Math.round(s.x) + 0), mn = sc.filter((s) => s.from < 0).map((s) => Math.round(s.x) + 0);
      assert.deepStrictEqual(sortNum(ch.answer.parts[0].value.map(val)), sortNum(mx), 'máximos');
      assert.deepStrictEqual(sortNum(ch.answer.parts[1].value.map(val)), sortNum(mn), 'mínimos');
    }
  },
  'apl-monotonia'(ch, { assert }) {
    const { f, ask, options, value, lowerLimit } = ch.data;
    const want = ask === 'crece' ? 1 : -1;
    const clip = (lo, hi) => [lo === -Infinity ? (hi === Infinity ? -8 : hi - 12) : lo, hi === Infinity ? (lo === -Infinity ? 8 : lo + 12) : hi];
    const ok = options.map((ivs) => ivs.every(([lo0, hi0]) => {
      const [lo, hi] = clip(lo0, hi0);
      for (let i = 0; i < 40; i++) {
        const x = lo + (hi - lo) * (i + 0.5) / 40;
        if (x <= lowerLimit) return false;
        if (Math.sign(d1(f, x)) !== want) return false;
      }
      return true;
    }));
    ok.forEach((o, i) => assert.strictEqual(o, i === value, 'opción ' + i + ' monotonía'));
  },
  'apl-inflexion'(ch, { assert }) {
    const { f, pts } = ch.data;
    const sc = signChanges((x) => d2(f, x), -7, 7, 0.0211);
    assert.strictEqual(sc.length, pts.length, 'nº de inflexiones');
    sortNum(pts).forEach((r, i) => assert(Math.abs(sc[i].x - r) < 5e-3, 'inflexión ' + r + ' vs ' + sc[i].x));
    if (ch.data.fun === 'cubica') {
      assert.strictEqual(ch.answer.parts[0].value.n, pts[0]);
      assert(Math.abs(f(pts[0]) - ch.answer.parts[1].value.n) < 1e-6);
    } else if (ch.answer.kind === 'list') assert.deepStrictEqual(sortNum(ch.answer.value.map(val)), sortNum(pts));
    else assert.strictEqual(ch.answer.value.n, pts[0]);
  },
  'apl-absolutos'(ch, { assert, near }) {
    const { f, lo, hi, ask, xmax, xmin } = ch.data;
    let bx = lo, bn = lo, mx = -Infinity, mn = Infinity;
    const N = 40000;
    for (let i = 0; i <= N; i++) {
      const x = lo + (hi - lo) * i / N, y = f(x);
      if (y > mx) { mx = y; bx = x; }
      if (y < mn) { mn = y; bn = x; }
    }
    const pa = ch.answer.parts;
    if (ask === 'valor') { assert(Math.abs(val(pa[0].value) - mx) < 1e-6, 'máximo'); assert(Math.abs(val(pa[1].value) - mn) < 1e-6, 'mínimo'); }
    else { assert(Math.abs(val(pa[0].value) - bx) < 2e-3, 'x máx'); assert(Math.abs(val(pa[1].value) - bn) < 2e-3, 'x mín'); }
    assert(Math.abs(xmax - bx) < 2e-3 && Math.abs(xmin - bn) < 2e-3);
  },
  'apl-parametros'(ch, { assert }) {
    const { f, ext, infl, pts } = ch.data;
    (ext || []).forEach((p) => assert(Math.abs(d1(f, p)) < 1e-4, 'f\'(p)=0'));
    (infl || []).forEach((h) => { assert(Math.abs(d2(f, h)) < 1e-3, 'f\'\'(h)=0'); assert(d2(f, h - 0.5) * d2(f, h + 0.5) < 0, 'cambio de signo'); });
    (pts || []).forEach(([x, y]) => assert(Math.abs(f(x) - y) < 1e-9, 'pasa por el punto'));
    if (ch.data.tipo !== 'parab') ext.forEach((p) => assert(d1(f, p - 0.3) * d1(f, p + 0.3) < 0, 'cambio de signo de f\''));
    // los parámetros de la respuesta reproducen f: comparamos coeficientes por valores
    const g = ch.data.tipo === 'parab'
      ? (x) => val(ch.answer.parts[0].value) * x * x + val(ch.answer.parts[1].value) * x + val(ch.answer.parts[2].value)
      : (x) => x ** 3 + val(ch.answer.parts[0].value) * x * x + val(ch.answer.parts[1].value) * x;
    [-2, -1, 0.5, 1, 3].forEach((x) => assert(Math.abs(f(x) - g(x)) < 1e-9, 'respuesta reproduce f'));
  },
  'apl-optimizacion'(ch, { assert }) {
    const { f, lo, hi, goal, askX, val: v, xo } = ch.data;
    let bx = lo, by = f(lo);
    const N = 200000;
    for (let i = 0; i <= N; i++) {
      const x = lo + (hi - lo) * i / N, y = f(x);
      if (goal === 'max' ? y > by : y < by) { by = y; bx = x; }
    }
    assert(Math.abs(bx - xo) < (hi - lo) * 1e-4 + 1e-6, 'óptimo en x=' + xo + ' vs ' + bx);
    assert(Math.abs(f(xo) - by) < 1e-6 * Math.max(1, Math.abs(by)), 'valor óptimo');
    assert(Math.abs(d1(f, xo)) < 1e-3 * Math.max(1, Math.abs(by)), 'f\'(xo)=0');
    assert(Math.abs(ch.answer.value.n / ch.answer.value.d - (askX ? bx : by)) < 1e-2 + (askX ? 0 : 1e-6), 'respuesta');
    assert(Math.abs(v - (askX ? xo : f(xo))) < 1e-9);
  },
  'apl-teoremas'(ch, { assert }) {
    const d = ch.data, a = ch.answer;
    if (d.tipo === 'bolzano') {
      const ok = d.ks.map((k) => d.f(k) * d.f(k + 1) < 0);
      ok.forEach((o, i) => assert.strictEqual(o, i === d.value, 'Bolzano opción ' + i));
      assert.strictEqual(ok.filter(Boolean).length, 1);
    } else {
      const { f, lo, hi } = d, c = val(a.value);
      assert(c > lo && c < hi, 'c en el intervalo abierto');
      const target = d.tipo === 'rolle' ? 0 : (f(hi) - f(lo)) / (hi - lo);
      if (d.tipo === 'rolle') assert(Math.abs(f(lo) - f(hi)) < 1e-9, 'f(a)=f(b)');
      assert(Math.abs(d1(f, c) - target) < 1e-4, 'f\'(c)=pendiente');
      // única solución en (lo,hi)
      const sc = signChanges((x) => d1(f, x) - target, lo, hi, (hi - lo) / 500);
      assert.strictEqual(sc.length, 1, 'c único');
      assert(Math.abs(sc[0].x - c) < 1e-3);
    }
  },
};
