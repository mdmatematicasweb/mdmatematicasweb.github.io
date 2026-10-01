// Verificadores independientes de los tipos de la fase 3 (geometría). Los usa tests/examen.test.js.
const crossV = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
const dotV = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
const subV = (a, b) => a.map((x, i) => x - b[i]);
const addV = (a, b) => a.map((x, i) => x + b[i]);
const scalV = (k, v) => v.map((x) => k * x);
const zero = (v) => v.every((x) => Math.abs(x) < 1e-9);
const onPlane = (eq, P) => Math.abs(dotV(eq.slice(0, 3), P) + eq[3]) < 1e-9;
const ansRow = (p) => p.answer.value[0].map((f) => f.n / f.d);
const parallel = (a, b) => zero(crossV(a, b));
const exprVal = (G, p) => G.parseExpr(p.answer.show);

module.exports = {
  'plano-recta'(ex, { assert, near, G }) {
    const d = ex.data, eq = ansRow(ex.partes[0]);
    if (d.v === '3p') {
      [d.A, d.B, d.C].forEach((P) => assert(onPlane(eq, P), 'A,B,C en el plano'));
      const I = ansRow(ex.partes[1]);
      assert(onPlane(eq, I) && parallel(subV(I, d.Q), d.dv), 'corte recta-plano');
    } else if (d.v === 'rp') {
      assert(onPlane(eq, d.P0) && onPlane(eq, addV(d.P0, d.u)) && onPlane(eq, d.Q), 'plano por r y Q');
      const k = ex.partes[1].answer.value; const R = d.R.slice(); R[d.j] = k.n / k.d;
      assert(onPlane(eq, R), 'R en el plano');
      const R2 = R.slice(); R2[d.j] += 1; assert(!onPlane(eq, R2), 'k único');
    } else {
      assert(onPlane(eq, d.P) && onPlane(eq, addV(d.P, d.u)), 'contiene r');
      assert(Math.abs(dotV(eq.slice(0, 3), d.w)) < 1e-9, 'paralelo a s');
      const dist = Math.abs(dotV(eq.slice(0, 3), d.Q) + eq[3]) / Math.hypot(...eq.slice(0, 3));
      assert(near(dist, d.dist) && near(exprVal(G, ex.partes[1]), dist, 1e-9), 'distancia s-plano');
    }
  },
  distancias(ex, { assert, near, G }) {
    const d = ex.data;
    if (d.v === 'rr') {
      const c = crossV(d.u, d.w); assert(!zero(c) && Math.abs(dotV(subV(d.Q, d.P), c)) > 1e-9, 'se cruzan');
      assert.strictEqual(ex.partes[0].answer.value, 3);
      const dist = Math.abs(dotV(subV(d.Q, d.P), c)) / Math.hypot(...c);
      const a = ex.partes[1].answer.value; assert(near(a.n / a.d, dist));
    } else if (d.v === 'pl') {
      const N = Math.hypot(...d.n);
      const a = ex.partes[0].answer.value; assert(near(a.n / a.d, Math.abs(dotV(d.n, d.P) + d.D) / N));
      const Ds = ex.partes[1].answer.value.map((f) => f.n / f.d);
      assert.strictEqual(Ds.length, 2);
      Ds.forEach((D2) => assert(near(Math.abs(D2 - d.D) / N, d.k), 'plano paralelo a distancia k'));
    } else {
      const I = ansRow(ex.partes[0]);
      assert(parallel(subV(I, d.Q), d.dv) && Math.abs(dotV(subV(d.P, I), d.dv)) < 1e-9, 'proyección');
      const dist = Math.hypot(...crossV(subV(d.P, d.Q), d.dv)) / Math.hypot(...d.dv);
      assert(near(exprVal(G, ex.partes[1]), dist, 1e-9));
    }
  },
  angulos(ex, { assert, near, G }) {
    const d = ex.data;
    const c = Math.abs(dotV(d.a, d.b)) / (Math.hypot(...d.a) * Math.hypot(...d.b));
    const v0 = ex.partes[0].answer.value; assert(near(v0.n / v0.d, c));
    const ang = (d.v === 'rp' ? Math.asin(c) : Math.acos(c)) * 180 / Math.PI;
    assert(near(exprVal(G, ex.partes[1]), ang, 5e-4), 'ángulo en grados');
    assert(ang > 0 && ang < 90);
    if (d.v === 'pp') {
      const dir = ansRow(ex.partes[2]);
      assert(Math.abs(dotV(dir, d.a)) < 1e-9 && Math.abs(dotV(dir, d.b)) < 1e-9 && !zero(dir));
    } else {
      const eq = ansRow(ex.partes[2]);
      assert(onPlane(eq, d.P) && onPlane(eq, addV(d.P, d.a)), 'contiene r');
      assert(Math.abs(dotV(eq.slice(0, 3), d.b)) < 1e-9, d.v === 'rp' ? 'perpendicular a π' : 'paralelo a s');
      if (d.v === 'rr') assert(!onPlane(eq, d.Q), 's no contenida');
    }
  },
  'areas-vol'(ex, { assert, near, G, detN }) {
    const d = ex.data;
    const Dk = (k) => { const D = d.D0.slice(); D[d.j] = k; return D; };
    const mix = (k) => detN([subV(d.B, d.A), subV(d.C, d.A), subV(Dk(k), d.A)]);
    const k = ex.partes[0].answer.value.n;
    assert(Math.abs(mix(k)) < 1e-9 && Math.abs(mix(k + 1)) > 1e-9, 'coplanarios');
    const V = ex.partes[1].answer.value;
    assert(near(V.n / V.d, Math.abs(mix(d.k1)) / (d.tetra ? 6 : 1)), 'volumen');
    assert(V.n !== 0);
    const area = Math.hypot(...crossV(subV(d.B, d.A), subV(d.C, d.A))) / 2;
    assert(near(exprVal(G, ex.partes[2]), area, 1e-9), 'área');
  },
  vectores(ex, { assert, near, G, detN }) {
    const d = ex.data;
    const a = ex.partes[0].answer.value.n; const u = d.u.slice(); u[d.k] = a;
    assert(Math.abs(dotV(u, d.v)) < 1e-9, 'ortogonales');
    assert(near(exprVal(G, ex.partes[1]), Math.hypot(...crossV(u, d.v)), 1e-9), 'área');
    const b = ex.partes[2].answer.value.n; const w = d.w.slice(); w[d.m] = b;
    assert(Math.abs(detN([u, d.v, w])) < 1e-9, 'dependientes');
    w[d.m] = b + 1; assert(Math.abs(detN([u, d.v, w])) > 1e-9);
  },
};
