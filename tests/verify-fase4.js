// Verificador independiente (numérico) de los tipos de la fase 4 (análisis). Lo carga tests/examen.test.js.
// Comprueba las respuestas a partir de ex.data: límites evaluando cerca, derivadas por diferencias finitas,
// integrales por Simpson y extremos muestreando el intervalo.
'use strict';

const d1 = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
const d2 = (f, x, h = 1e-4) => (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
function simpson(f, a, b, n = 4000) {
  const w = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * w) * (i % 2 ? 4 : 2);
  return (s * w) / 3;
}
/** Valor numérico de una respuesta simple. */
function val(a, G) {
  if (a.kind === 'number') return a.value.n / a.value.d;
  if (a.kind === 'expr') {
    if (a.show !== undefined) {
      const v = G.parseExpr(a.show);
      if (v === null || Math.abs(v - a.value) > 1e-9 * Math.max(1, Math.abs(a.value))) throw new Error('expr: show ' + a.show + ' ≠ ' + a.value);
    }
    return a.value;
  }
  if (a.kind === 'choice') return a.value;
  if (a.kind === 'list') return a.value.map((q) => q.n / q.d);
  throw new Error('respuesta no simple: ' + a.kind);
}
const vals = (a, G) => (a.kind === 'multi' ? a.parts.map((p) => val(p, G)) : [val(a, G)]);
/** {a: .., b: ..} a partir de las etiquetas «a=», «b=». */
function params(a, G) {
  const ps = a.kind === 'multi' ? a.parts : [a];
  const P = {};
  ps.forEach((p) => { P[p.label.replace('=', '')] = val(p, G); });
  return P;
}
const close = (a, b, tol) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

module.exports = {
  'limite-param'(ex, { assert, G }) {
    const d = ex.data;
    const P = params(ex.partes[0].answer, G);
    const L = val(ex.partes[1].answer, G);
    Object.keys(d.P).forEach((k) => assert(close(P[k], d.P[k], 1e-12), 'parámetro ' + k));
    const s = (h) => (d.E(h, P) + d.E(-h, P)) / 2;
    const R = (4 * s(0.01) - s(0.02)) / 3;           // Richardson
    assert(close(R, L, 1e-5), 'límite numérico ' + R + ' ≠ ' + L);
    // con otro valor del parámetro el límite deja de ser finito
    Object.keys(P).forEach((k) => {
      const Q = Object.assign({}, P); Q[k] += 1;
      assert(Math.abs(d.E(1e-3, Q)) > 100, 'con ' + k + '+1 debería divergir');
    });
  },

  asintotas(ex, { assert, G }) {
    const d = ex.data, A = ex.partes;
    const f = d.mk(params(A[0].answer, G));
    const vert = (v) => Math.abs(f(v + 1e-7)) > 1e3 && Math.abs(f(v - 1e-7)) > 1e3;
    if (d.v === 0) {
      [1e5, -1e5].forEach((X) => assert(Math.abs(f(X) - (d.m * X + d.n)) < 1e-3, 'oblicua'));
      const [k, ch] = vals(A[1].answer, G);
      assert(vert(k), 'vertical');
      assert.strictEqual(f(k + 1e-7) > 0, ch === 0, 'límite lateral');
    } else if (d.v === 1) {
      assert(vert(d.p), 'vertical');
      const X = 1e6, n = val(A[1].answer, G);
      assert(Math.abs(f(X) / X - d.m) < 1e-4, 'pendiente');
      assert(Math.abs(f(X) - d.m * X - n) < 1e-3, 'ordenada oblicua');
    } else if (d.v === 2) {
      assert(Math.abs(f(1e6) - d.h) < 1e-4, 'horizontal');
      assert(close(f(0), d.q, 1e-12), 'punto');
      const vs = val(A[1].answer, G);
      assert.strictEqual(new Set(vs).size, 2);
      vs.forEach((v) => assert(vert(v), 'vertical ' + v));
    } else {
      assert(Math.abs(f(40) - d.h) < 1e-9, 'horizontal +inf');
      assert(close(f(0), d.q, 1e-12), 'f(0)');
      assert(Math.abs(f(-40) - val(A[1].answer, G)) < 1e-9, 'horizontal -inf');
    }
  },

  trozos(ex, { assert, G }) {
    const d = ex.data, x0 = d.x0;
    const { L, R } = d.mk(params(ex.partes[0].answer, G));
    assert(close(L(x0), R(x0), 1e-9), 'continuidad');
    assert(close(d1(L, x0), d1(R, x0), 1e-6), 'derivabilidad');
    const [m, n] = vals(ex.partes[1].answer, G);
    assert(close(m, d1(R, x0), 1e-6) && close(n, R(x0) - m * x0, 1e-9), 'tangente');
  },

  monotonia(ex, { assert, G }) {
    const d = ex.data, A = ex.partes;
    const crit = (f, x) => Math.abs(d1(f, x)) < 1e-5 * Math.max(1, Math.abs(f(x)));
    const isMax = (f, x) => f(x - 0.01) < f(x) && f(x + 0.01) < f(x);
    const isMin = (f, x) => f(x - 0.01) > f(x) && f(x + 0.01) > f(x);
    if (d.v === 0) {
      const f = d.mk(params(A[0].answer, G));
      assert(crit(f, d.p1) && crit(f, d.p2), 'extremos en p1, p2');
      const [x, y] = vals(A[1].answer, G);
      assert(isMax(f, x) && crit(f, x) && close(f(x), y, 1e-9), 'máximo');
    } else if (d.v === 1) {
      const f = d.f, [xM, xm] = vals(A[0].answer, G);
      assert(crit(f, xM) && isMax(f, xM), 'máximo');
      assert(crit(f, xm) && isMin(f, xm), 'mínimo');
      assert(close(val(A[1].answer, G), f(xm), 1e-9), 'valor mínimo');
    } else {
      const f = d.mk(params(A[0].answer, G));
      assert(crit(f, d.p), 'extremo en p');
      if (d.v === 2) assert(close(f(d.p), d.q, 1e-9), 'pasa por (p,q)');
      else assert(close(f(1), d.f1, 1e-9), 'f(1)');
      const [tipo, otro] = vals(A[1].answer, G);
      assert(tipo === 0 ? isMax(f, d.p) : isMin(f, d.p), 'clasificación');
      if (d.v === 2) assert(otro !== d.p && crit(f, otro), 'otro extremo');
      else assert(close(otro, f(d.p), 1e-9), 'valor del extremo');
    }
  },

  inflexion(ex, { assert, G }) {
    const d = ex.data, A = ex.partes;
    const f = d.mk(params(A[0].answer, G));
    const infl = (x) => Math.abs(d2(f, x)) < 1e-3 * Math.max(1, Math.abs(f(x))) && d2(f, x - 0.1) * d2(f, x + 0.1) < 0;
    if (d.v === 0) {
      assert(infl(d.p1) && infl(d.p2), 'inflexión');
      const [m, n] = vals(A[1].answer, G);
      assert(close(m, d1(f, d.p1), 1e-6) && close(n, f(d.p1) - m * d.p1, 1e-9), 'tangente');
    } else if (d.v === 1) {
      assert(close(f(d.p), d.q, 1e-9), 'pasa por (p,q)');
      assert(Math.abs(d1(f, d.p)) < 1e-6, 'tangente horizontal');
      assert(Math.abs(d2(f, d.p)) < 1e-3 && d2(f, d.p - 0.1) * d2(f, d.p + 0.1) < 0, 'inflexión');
      const ch = val(A[1].answer, G);
      assert(ch === 0 || ch === 1, 'monótona');
      for (let x = -5; x <= 5; x += 0.05) assert(ch === 0 ? d1(f, x) > -1e-6 : d1(f, x) < 1e-6, 'monotonía');
    } else {
      assert(infl(d.p1) && infl(d.p2), 'inflexión');
      const [lo, hi] = d.iv;
      const xm = lo === -Infinity ? hi - 1 : hi === Infinity ? lo + 1 : (lo + hi) / 2;
      assert.strictEqual(val(A[1].answer, G), d2(f, xm) > 0 ? 0 : 1, 'curvatura');
    }
  },

  'extremos-abs'(ex, { assert, G }) {
    const { f, a, b } = ex.data, n = 200000;
    let iM = 0, im = 0, vM = -Infinity, vm = Infinity;
    for (let i = 0; i <= n; i++) { const x = a + ((b - a) * i) / n, y = f(x); if (y > vM) { vM = y; iM = x; } if (y < vm) { vm = y; im = x; } }
    const [xM, yM] = vals(ex.partes[0].answer, G), [xm, ym] = vals(ex.partes[1].answer, G);
    assert(close(yM, vM, 1e-6) && Math.abs(xM - iM) < 1e-3 * (b - a) && close(f(xM), yM, 1e-9), 'máximo absoluto');
    assert(close(ym, vm, 1e-6) && Math.abs(xm - im) < 1e-3 * (b - a) && close(f(xm), ym, 1e-9), 'mínimo absoluto');
  },

  optimizacion(ex, { assert, G }) {
    const d = ex.data, n = 200000, sgn = d.kind === 'max' ? 1 : -1;
    let best = -Infinity, xb = 0;
    for (let i = 1; i < n; i++) { const x = d.lo + ((d.hi - d.lo) * i) / n, y = sgn * d.obj(x); if (y > best) { best = y; xb = x; } }
    assert(Math.abs(xb - d.xo) < 1e-3 * (d.hi - d.lo), 'óptimo en ' + xb + ' y no en ' + d.xo);
    assert(sgn * d.obj(d.xo) >= best - 1e-9, 'valor óptimo');
    const dims = vals(ex.partes[0].answer, G);
    d.dims(d.xo).forEach((v, i) => assert(close(dims[i], v, 1e-9), 'dimensión ' + i));
    assert(close(val(ex.partes[1].answer, G), d.obj(d.xo), 1e-9), 'valor');
  },

  'integral-def'(ex, { assert, G }) {
    ex.data.I.forEach((t, i) => {
      const v = val(ex.partes[i].answer, G);
      assert(close(simpson(t.f, t.a, t.b), v, 1e-7), 'integral ' + i + ': ' + simpson(t.f, t.a, t.b) + ' ≠ ' + v);
    });
  },

  'area-curvas'(ex, { assert, G }) {
    const { f, g, a, b, cuts } = ex.data;
    const cs = val(ex.partes[0].answer, G);
    assert.deepStrictEqual(cs.slice().sort((x, y) => x - y), cuts.slice().sort((x, y) => x - y));
    cs.forEach((c) => assert(Math.abs(f(c) - g(c)) < 1e-9, 'corte en ' + c));
    // f-g no cambia de signo dentro del recinto
    const s0 = Math.sign(f((a + b) / 2) - g((a + b) / 2));
    for (let i = 1; i < 200; i++) { const x = a + ((b - a) * i) / 200; assert(Math.sign(f(x) - g(x)) === s0, 'cambio de signo'); }
    const A = simpson((x) => Math.abs(f(x) - g(x)), a, b);
    assert(close(val(ex.partes[1].answer, G), A, 1e-7), 'área ' + A);
  },
};
