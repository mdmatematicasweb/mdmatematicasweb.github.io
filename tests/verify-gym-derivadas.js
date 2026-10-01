// Verificadores independientes de assets/gym/derivadas.js: derivadas por diferencias finitas y variación de datos.
const rel = (a, b, tol) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const val = (spec) => (spec.value.n !== undefined ? spec.value.n / spec.value.d : spec.value);
const D1 = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
const D2 = (f, x, h = 1e-3) => (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
const D3a = (f, x, h) => (f(x + 2 * h) - 2 * f(x + h) + 2 * f(x - h) - f(x - 2 * h)) / (2 * h * h * h);
const D3 = (f, x) => (4 * D3a(f, x, 0.005) - D3a(f, x, 0.01)) / 3; // Richardson

// Variable compleja para la fórmula integral de Cauchy (derivada n-ésima en 0).
const C = (re, im = 0) => ({ re, im });
const cmul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const cdiv = (a, b) => { const d = b.re * b.re + b.im * b.im; return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
const cexp = (a) => C(Math.exp(a.re) * Math.cos(a.im), Math.exp(a.re) * Math.sin(a.im));
const csin = (a) => C(Math.sin(a.re) * Math.cosh(a.im), Math.cos(a.re) * Math.sinh(a.im));
const ccos = (a) => C(Math.cos(a.re) * Math.cosh(a.im), -Math.sin(a.re) * Math.sinh(a.im));
const clog = (a) => C(Math.log(Math.hypot(a.re, a.im)), Math.atan2(a.im, a.re));
const FN = {
  sin: (z, k) => csin(C(k * z.re, k * z.im)),
  cos: (z, k) => ccos(C(k * z.re, k * z.im)),
  exp: (z, k) => cexp(C(k * z.re, k * z.im)),
  geo: (z) => cdiv(C(1), C(1 - z.re, -z.im)),
  log: (z) => clog(C(1 + z.re, z.im)),
};
function cauchy(fn, k, n) {
  const N = 1024, rad = 0.5;
  let s = 0;
  for (let j = 0; j < N; j++) {
    const t = (2 * Math.PI * j) / N;
    const z = C(rad * Math.cos(t), rad * Math.sin(t));
    const v = FN[fn](z, k);
    // v * e^{-i n t}
    s += v.re * Math.cos(n * t) + v.im * Math.sin(n * t);
  }
  let fact = 1; for (let i = 2; i <= n; i++) fact *= i;
  return (fact * s) / (N * Math.pow(rad, n));
}

module.exports = {
  'der-reglas'(ch, { assert }) {
    const d = ch.data;
    const v = val(ch.answer);
    assert(rel(D1(d.f, d.x0), v, 1e-6), d.tipo + ': derivada numérica ' + D1(d.f, d.x0) + ' vs ' + v);
  },
  'der-tangente'(ch, { assert }) {
    const d = ch.data;
    if (d.tipo === 'paralela') {
      const claimed = ch.answer.value.map((x) => x.n).sort((a, b) => a - b);
      const real = [];
      for (let x = -30; x <= 30; x++) if (Math.abs(D1(d.f, x) - d.m) < 1e-6) real.push(x);
      assert.deepStrictEqual(claimed, real);
      return;
    }
    const [m, n] = ch.answer.parts.map(val);
    assert(rel(D1(d.f, d.x0), m, 1e-6), 'm ' + D1(d.f, d.x0) + ' vs ' + m);
    assert(rel(d.f(d.x0) - m * d.x0, n, 1e-6), 'n ' + (d.f(d.x0) - m * d.x0) + ' vs ' + n);
    // la recta debe tocar a la curva con contacto de segundo orden: f(x)-recta = O(h^2)
    const h = 1e-3;
    assert(Math.abs(d.f(d.x0 + h) - (m * (d.x0 + h) + n)) < 50 * h * h);
  },
  'der-trozos'(ch, { assert }) {
    const d = ch.data;
    const h = 1e-6;
    const check = (f) => {
      const x0 = d.x0, L = f(x0 - h), R = f(x0 + h), c = f(x0);
      const dl = (c - f(x0 - h)) / h, dr = (f(x0 + h) - c) / h;
      return { cont: Math.abs(L - c) < 1e-4 && Math.abs(R - c) < 1e-4, deriv: Math.abs(dl - dr) < 1e-3 };
    };
    if (d.tipo === 'pol' || d.tipo === 'rac') {
      const sol = ch.answer.parts.map(val);
      sol.forEach((x, i) => assert.strictEqual(x, d.sol[i]));
      const ok = check(d.mk(sol));
      assert(ok.cont && ok.deriv, d.tipo + ' no derivable con la solución');
      sol.forEach((x, i) => { const w = sol.slice(); w[i] = x + 1; const o = check(d.mk(w)); assert(!(o.cont && o.deriv), 'solución no única en ' + i); });
      return;
    }
    const o = check(d.f);
    const t = !o.cont ? 2 : o.deriv ? 0 : 1;
    assert.strictEqual(ch.answer.value, t);
    assert.strictEqual(d.caso, t);
  },
  'der-definicion'(ch, { assert }) {
    const d = ch.data;
    assert(rel(D1(d.f, d.a), val(ch.answer), 1e-6));
    // el cociente incremental converge: h y -h dan el mismo límite
    const q = (h) => (d.f(d.a + h) - d.f(d.a)) / h;
    assert(rel((q(1e-6) + q(-1e-6)) / 2, val(ch.answer), 1e-5));
  },
  'der-sucesivas'(ch, { assert }) {
    const d = ch.data;
    if (d.caso) {
      const v = cauchy(d.caso, d.k, d.n);
      assert(rel(v, val(ch.answer), 1e-7), d.caso + ' n=' + d.n + ': ' + v + ' vs ' + val(ch.answer));
      return;
    }
    const v = d.ord === 2 ? D2(d.f, d.x0) : D3(d.f, d.x0);
    assert(rel(v, val(ch.answer), 1e-4), 'orden ' + d.ord + ': ' + v + ' vs ' + val(ch.answer));
  },
  'der-parametro'(ch, { assert }) {
    const d = ch.data;
    const sol = ch.answer.parts.map(val);
    sol.forEach((x, i) => assert.strictEqual(x, d.sol[i]));
    const f = d.mk(sol);
    assert(Math.abs(f(d.x0) - d.y0) < 1e-9, 'no pasa por el punto');
    assert(Math.abs(D1(f, d.x0) - d.m) < 1e-6, 'pendiente');
    // unicidad: cambiar un parámetro rompe alguna condición
    sol.forEach((x, i) => {
      const w = sol.slice(); w[i] = x + 1; const g = d.mk(w);
      assert(Math.abs(g(d.x0) - d.y0) > 1e-6 || Math.abs(D1(g, d.x0) - d.m) > 1e-6);
    });
  },
};
