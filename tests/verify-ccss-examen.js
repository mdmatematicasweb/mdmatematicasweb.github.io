// Verificadores independientes de los generadores del simulacro PAU CCSS (assets/gym/tipos-ccss-*.js).
// Recalculan cada respuesta desde ex.data con métodos distintos a los del generador (eliminación gaussiana, Simpson, fuerza bruta, derivación numérica…).
module.exports = (() => {
  const phi = (t) => Math.exp(-t * t / 2) / Math.sqrt(2 * Math.PI);
  const PhiPos = (z) => { const n = 4000, h = z / n; let s = phi(0) + phi(z); for (let i = 1; i < n; i++) s += phi(i * h) * (i % 2 ? 4 : 2); return 0.5 + s * h / 3; };
  const T = (z) => (z >= 0 ? Math.round(PhiPos(z) * 1e4) / 1e4 : Math.round((1 - Math.round(PhiPos(-z) * 1e4) / 1e4) * 1e4) / 1e4);
  const r4 = (x) => Math.round(x * 1e4) / 1e4;
  const simpson = (f, a, b, n = 4000) => { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; };
  const ev = (cs, x) => cs.reduce((s, c) => s * x + c, 0);
  const dd = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
  const solve = (A0, b0) => { const n = A0.length, A = A0.map((r, i) => r.concat([b0[i]])); for (let c = 0; c < n; c++) { let p = c; for (let i = c + 1; i < n; i++) if (Math.abs(A[i][c]) > Math.abs(A[p][c])) p = i; [A[c], A[p]] = [A[p], A[c]]; for (let i = 0; i < n; i++) if (i !== c) { const k = A[i][c] / A[c][c]; A[i] = A[i].map((x, j) => x - k * A[c][j]); } } return A.map((r, i) => r[n] / r[i]); };
  const mulN = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
  const toN = (A) => A.map((r) => r.map((f) => f.n / f.d));
  const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const det3 = (A) => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
  const v = (f) => (f && typeof f === 'object' && 'n' in f ? f.n / f.d : f);
  const comb = (n, k) => { let r = 1; for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1); return r; };
  // pmf de B(n,p) en escala logarítmica (evita el desbordamiento por defecto con n grande)
  const pmfRec = (n, p) => { const lf = [0]; for (let i = 1; i <= n; i++) lf.push(lf[i - 1] + Math.log(i)); return Array.from({ length: n + 1 }, (_, k) => Math.exp(lf[n] - lf[k] - lf[n - k] + k * Math.log(p) + (n - k) * Math.log(1 - p))); };

  return {
    'ec-matricial'(ex, { assert, near }) {
      const d = ex.data, A = d.A, X = d.Xs, B = d.B, C = d.C;
      const AX = mulN(A, X), XA = mulN(X, A);
      const esperado = d.forma === 'ax' ? AX.map((r, i) => r.map((x, j) => x + B[i][j])) : d.forma === 'xa' ? XA.map((r, i) => r.map((x, j) => x - B[i][j])) : AX.map((r, i) => r.map((x, j) => x - 2 * B[i][j]));
      assert.deepStrictEqual(esperado, C, 'C no cuadra con la ecuación');
      assert.strictEqual(det2(A), d.det); assert(d.det !== 0);
      assert(near(v(ex.partes[0].answer.value), det2(A)));
      const Ai = toN(ex.partes[1].answer.value), I = mulN(A, Ai);
      assert(I.every((r, i) => r.every((x, j) => near(x, i === j ? 1 : 0))), 'A·A^-1');
      const Xr = toN(ex.partes[2].answer.value);
      assert(Xr.every((r, i) => r.every((x, j) => near(x, X[i][j]))), 'X');
      assert(ex.enunciado.includes(d.forma === 'ax' ? 'A\\cdot X+B=C' : d.forma === 'xa' ? 'X\\cdot A-B=C' : 'A\\cdot X-2B=C'));
    },
    'sis-matricial'(ex, { assert, near }) {
      const d = ex.data, { A, B, Xs } = d;
      assert(near(det3(A), d.det) && d.det !== 0);
      A.forEach((r, i) => assert.strictEqual(r.reduce((s, x, k) => s + x * Xs[k], 0), B[i]));
      assert(near(v(ex.partes[0].answer.value), d.det));
      const Ai = toN(ex.partes[1].answer.value);
      assert(mulN(A, Ai).every((r, i) => r.every((x, j) => near(x, i === j ? 1 : 0))), 'inversa');
      const X = toN(ex.partes[2].answer.value).map((r) => r[0]);
      assert(X.every((x, i) => near(x, Xs[i])));
      assert.deepStrictEqual(solve(A, B).map((x) => Math.round(x * 1e9) / 1e9), Xs);
    },
    'sistema-plant'(ex, { assert, near }) {
      const d = ex.data, { A, b, sol, pr, N, T: Tt, k, tipo } = d;
      assert(sol.every((x) => Number.isInteger(x) && x > 0));
      A.forEach((r, i) => assert.strictEqual(r.reduce((s, x, j) => s + x * sol[j], 0), b[i], 'fila ' + i));
      assert(near(det3(A), det3(A)) && Math.abs(det3(A)) > 0);
      assert.deepStrictEqual(solve(A, b).map(Math.round), sol);
      assert.strictEqual(sol[0] + sol[1] + sol[2], N); assert.strictEqual(pr.reduce((s, p, i) => s + p * sol[i], 0), Tt);
      if (tipo === 0) assert.strictEqual(sol[0], k * sol[1]); if (tipo === 1) assert.strictEqual(sol[1], k * sol[2]); if (tipo === 2) assert.strictEqual(sol[2], k * sol[0]);
      const rows = ex.partes[0].answer.parts.map((p) => p.value[0].map(v));
      assert.deepStrictEqual(rows[0], [1, 1, 1, N]); assert.deepStrictEqual(rows[1], pr.concat([Tt]));
      assert(rows[2].slice(0, 3).reduce((s, x, i) => s + x * sol[i], 0) === 0, 'fila relación');
      assert.deepStrictEqual(ex.partes[1].answer.value.map((r) => v(r[0])), sol);
      assert.strictEqual(v(ex.partes[2].answer.value), pr[1] * sol[1]);
      [N, Tt].forEach((x) => assert(ex.enunciado.includes(String(x))));
    },
    'pl-problema'(ex, { assert, near }) {
      const d = ex.data;
      const cons = d.cons.concat([{ a: 1, b: 0, op: '>=', c: 0 }, { a: 0, b: 1, op: '>=', c: 0 }]);
      const ok = (x, y) => cons.every((k) => { const l = k.a * x + k.b * y; return k.op === '<=' ? l <= k.c + 1e-9 : l >= k.c - 1e-9; });
      const Vs = [];
      for (let i = 0; i < cons.length; i++) for (let j = i + 1; j < cons.length; j++) {
        const D = cons[i].a * cons[j].b - cons[j].a * cons[i].b; if (!D) continue;
        const x = (cons[i].c * cons[j].b - cons[j].c * cons[i].b) / D, y = (cons[i].a * cons[j].c - cons[j].a * cons[i].c) / D;
        if (ok(x, y) && !Vs.some((q) => near(q[0], x) && near(q[1], y))) Vs.push([x, y]);
      }
      Vs.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
      const got = ex.partes[0].answer.value.map((r) => r.map(v));
      assert.strictEqual(got.length, Vs.length); got.forEach((r, i) => assert(near(r[0], Vs[i][0]) && near(r[1], Vs[i][1]), 'vértices'));
      const F = (q) => d.p * q[0] + d.q * q[1], vals = Vs.map(F);
      const best = d.tipo === 'max' ? Math.max(...vals) : Math.min(...vals);
      assert.strictEqual(vals.filter((x) => x === best).length, 1, 'óptimo único');
      const opt = Vs[vals.indexOf(best)];
      const [px, py] = ex.partes[1].answer.parts.map((p) => v(p.value));
      assert(near(px, opt[0]) && near(py, opt[1]) && near(v(ex.partes[2].answer.value), best));
      // el óptimo se confirma muestreando puntos factibles de la malla
      for (let x = 0; x <= 80; x += 0.5) for (let y = 0; y <= 80; y += 0.5) {
        if (!ok(x, y)) continue;
        if (d.tipo === 'max') assert(F([x, y]) <= best + 1e-9, 'hay un punto mejor'); else assert(F([x, y]) >= best - 1e-9, 'hay un punto mejor');
      }
    },
    trozos(ex, { assert, near }) {
      const { c, m, n, a, b, p1, p2 } = ex.data;
      const f1 = (x) => x * x + a * x + b, f2 = (x) => m * x + n;
      assert(near(f1(c), f2(c)), 'continuidad'); assert(near(dd(f1, c), dd(f2, c), 1e-4), 'derivabilidad');
      assert(near(v(ex.partes[0].answer.value), a) && near(v(ex.partes[1].answer.value), b));
      const [q1, q2] = ex.partes[2].answer.value[0].map(v);
      assert(near(q1, f1(c - 1)) && near(q2, f2(c + 1)) && near(p1, q1) && near(p2, q2));
      assert(ex.enunciado.includes('x<' + c) && ex.enunciado.includes('x\\ge ' + c));
    },
    polinomica(ex, { assert, near }) {
      const { cs, p, q, s } = ex.data, f = (x) => ev(cs, x);
      assert(near(dd(f, p, 1e-4), 0, 1e-5) && near(dd(f, q, 1e-4), 0, 1e-5));
      const crit = ex.partes[0].answer.value.map(v).sort((x, y) => x - y); assert.deepStrictEqual(crit, [p, q]);
      assert(f(p) > f(p - 0.1) && f(p) > f(p + 0.1) && f(q) < f(q - 0.1) && f(q) < f(q + 0.1), 'máx en p y mín en q');
      const [fm, fn] = ex.partes[1].answer.value[0].map(v); assert(near(fm, f(p)) && near(fn, f(q)));
      const f2 = (x) => (f(x + 1e-3) - 2 * f(x) + f(x - 1e-3)) / 1e-6;
      assert(near(f2(s), 0, 1e-3) && f2(s - 0.5) < 0 && f2(s + 0.5) > 0); assert(near(v(ex.partes[2].answer.value), s));
    },
    racional(ex, { assert, near }) {
      const { a, b, c, x0, k } = ex.data, f = (x) => (a * x + b) / (x - c);
      assert(near(v(ex.partes[0].answer.value), c)); assert(Math.abs(f(c + 1e-6)) > 1e4 && Math.abs(f(c - 1e-6)) > 1e4);
      assert(near(f(1e7), a, 1e-5) && near(v(ex.partes[1].answer.value), a));
      assert(near(dd(f, x0, 1e-5), v(ex.partes[2].answer.value), 1e-4)); assert.strictEqual(k, -(a * c + b));
    },
    optimizacion(ex, { assert, near }) {
      const { cs, r1, r2, v: vx, best, tope } = ex.data, B = (x) => ev(cs, x);
      assert(near(B(r1), 0) && near(B(r2), 0));
      let mx = -Infinity, ax = 0; for (let x = 0; x <= tope; x += 0.001) if (B(x) > mx) { mx = B(x); ax = x; }
      assert(near(ax, vx, 1e-3) && near(mx, best, 1e-5), 'máximo por barrido');
      assert(near(v(ex.partes[0].answer.value), vx) && near(v(ex.partes[1].answer.value), best));
      assert.deepStrictEqual(ex.partes[2].answer.value[0].map(v), [r1, r2]); assert(B((r1 + r2) / 2) > 0 && B(r1 - 0.5) < 0 && B(r2 + 0.5) < 0);
    },
    'int-primitiva'(ex, { assert, near }) {
      const { p, q, r, s, a, b, x0, k } = ex.data, f = (x) => x * x + p * x + q;
      assert(near(f(r), 0) && near(f(s), 0) && a < r && r < b && b < s);
      assert(near(ex.partes[0].answer.value, simpson(f, 0, x0) + k, 1e-6), 'F(x0)');
      assert(near(ex.partes[1].answer.value, simpson(f, a, b), 1e-6), 'integral');
      assert(near(ex.partes[2].answer.value, simpson((x) => Math.abs(f(x)), a, b, 20000), 1e-5), 'área');
      assert(ex.partes[2].answer.show.length > 0);
    },
    'area-curvas'(ex, { assert, near }) {
      const { p, q, m, n, x1, x2 } = ex.data, f = (x) => x * x + p * x + q, g = (x) => m * x + n;
      assert(near(f(x1), g(x1)) && near(f(x2), g(x2)) && x1 < x2);
      assert.deepStrictEqual(ex.partes[0].answer.value[0].map(v), [x1, x2]);
      const H = (x) => simpson((t) => g(t) - f(t), 0, x);
      const [h1, h2] = ex.partes[1].answer.value[0].map(v); assert(near(h1, H(x1), 1e-6) && near(h2, H(x2), 1e-6));
      assert(near(ex.partes[2].answer.value, simpson((x) => Math.abs(g(x) - f(x)), x1, x2, 20000), 1e-5));
      for (let x = x1 + 0.01; x < x2; x += 0.05) assert(g(x) >= f(x), 'la recta debe estar por encima');
    },
    'prob-total-bayes'(ex, { assert, near }) {
      const { pri, q, j, k } = ex.data;
      assert.strictEqual(pri.reduce((s, x) => s + x, 0), 100);
      const N = 1e6, conj = pri.map((x, i) => N * x / 100 * q[i] / 100), total = conj.reduce((s, x) => s + x, 0);
      assert(near(v(ex.partes[0].answer.value), conj[j] / N, 1e-9)); assert(near(v(ex.partes[1].answer.value), total / N, 1e-9));
      assert(near(ex.partes[2].answer.value, conj[k] / total, 1e-9));
      assert(ex.enunciado.includes(pri[0] + ' %') && ex.enunciado.includes(q[0] + ' %'));
    },
    'prob-tablas'(ex, { assert, near }) {
      const { T0, nAB, nAb, naB, nab, askA, indep } = ex.data;
      assert.strictEqual(nAB + nAb + naB + nab, T0); assert([nAB, nAb, naB, nab].every((x) => x > 0));
      const pA = (nAB + nAb) / T0, pB = (nAB + naB) / T0, pAB = nAB / T0;
      const [x1, x2] = ex.partes[0].answer.value[0].map(v); assert(near(x1, pAB) && near(x2, pA));
      assert(near(ex.partes[1].answer.value, askA ? pAB / pB : pAB / pA, 1e-9));
      assert.strictEqual(ex.partes[2].answer.value, Math.abs(pAB - pA * pB) < 1e-12 ? '0' : '1'); assert.strictEqual(indep, ex.partes[2].answer.value === '0');
      [nAB, nAb, naB, nab].forEach((x) => assert(ex.enunciado.includes('<td>' + x + '</td>')));
    },
    binomial(ex, { assert, near }) {
      const { n, p, k, k2, op } = ex.data, pm = pmfRec(n, p);
      assert(near(pm.reduce((s, x) => s + x, 0), 1) && near(ex.partes[0].answer.value, comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k), 1e-9) && near(ex.partes[0].answer.value, pm[k], 1e-9));
      const P2 = op === 'ge' ? pm.slice(k2).reduce((s, x) => s + x, 0) : pm.slice(0, k2 + 1).reduce((s, x) => s + x, 0);
      assert(near(ex.partes[1].answer.value, P2, 1e-9));
      const [mu, sd] = ex.partes[2].answer.parts.map((x) => x.value); assert(near(mu, n * p) && near(sd, Math.sqrt(n * p * (1 - p))));
      assert(ex.enunciado.includes('B(' + n + ',')); assert(n * p >= 0.5);
    },
    'binom-normal'(ex, { assert, near }) {
      const { n, p, kA, k2, zA, zB, mu, s } = ex.data, q = 1 - p;
      assert(n * p >= 5 && n * q >= 5); assert(near(mu, n * p) && near(s, Math.sqrt(n * p * q)));
      const [m1, s1] = ex.partes[0].answer.parts.map((x) => x.value); assert(near(m1, mu) && near(s1, s));
      const za = Math.round((kA + 0.5 - mu) / s * 100) / 100, zb = Math.round((k2 - 0.5 - mu) / s * 100) / 100;
      assert(near(za, zA) && near(zb, zB));
      assert(near(ex.partes[1].answer.value, T(za), 1e-9) && near(ex.partes[2].answer.value, r4(1 - T(zb)), 1e-9));
      // contraste con la binomial exacta: la aproximación debe quedar cerca
      const pm = pmfRec(n, p), exA = pm.slice(0, kA + 1).reduce((x, y) => x + y, 0), exB = pm.slice(k2).reduce((x, y) => x + y, 0);
      assert(Math.abs(exA - ex.partes[1].answer.value) < 0.03 && Math.abs(exB - ex.partes[2].answer.value) < 0.03, "aproximación lejana");
    },
    'normal-prob'(ex, { assert, near }) {
      const { mu, sd, a, b1, b2, opA, opC, pk, kopt } = ex.data;
      const zOf = (x) => Math.round((x - mu) / sd * 100) / 100;
      const pOp = (op, z) => (op === 'lt' ? T(z) : T(-z));
      assert(near(ex.partes[0].answer.value, pOp(opA, zOf(a)), 1e-9));
      assert(near(ex.partes[1].answer.value, r4(T(zOf(b2)) - T(zOf(b1))), 1e-9));
      const zc = zOf(kopt); assert(near(pOp(opC, zc), pk, 1e-9)); assert(near(ex.partes[2].answer.value, kopt, 1e-9));
      const exact = (x) => { const z = (x - mu) / sd; return z >= 0 ? PhiPos(z) : 1 - PhiPos(-z); };
      assert(Math.abs(ex.partes[1].answer.value - (exact(b2) - exact(b1))) < 0.01);
      assert(b1 < b2);
    },
    'normal-param'(ex, { assert, near }) {
      const d = ex.data, A = ex.partes[0].answer.value, B = ex.partes[1].answer.value;
      const mu = d.variante === 'mu' ? A : d.mu, sd = d.variante === 'mu' ? d.sd : A; assert(sd > 0);
      const zOf = (x) => Math.round((x - mu) / sd * 100) / 100, pOp = (op, z) => (op === 'lt' ? T(z) : T(-z));
      assert(near(pOp(d.op1, zOf(d.a)), d.p1, 1e-9), 'dato del enunciado coherente con μ y σ');
      assert(near(B, pOp(d.op2, zOf(d.b)), 1e-9));
      assert(near(A, d.variante === 'mu' ? d.mu : d.sd));
    },
    'ic-media'(ex, { assert, near }) {
      const { nivel, n, sd, xb, z, alt } = ex.data;
      const zt = { 90: 1.645, 95: 1.96, 99: 2.575 }[nivel]; assert(near(z, zt)); assert(n >= 30);
      assert(near(ex.partes[0].answer.value, zt));
      const E = (zz) => zz * sd / Math.sqrt(n);
      assert(near(ex.partes[1].answer.value, E(zt), 1e-9) && ex.partes[1].answer.alt.every((x, i) => near(x, E(alt[i]))));
      const [lo, hi] = ex.partes[2].answer.parts.map((x) => x.value); assert(near(lo, xb - E(zt)) && near(hi, xb + E(zt)));
      assert(ex.enunciado.includes('n=' + n));
    },
    'ic-prop'(ex, { assert, near }) {
      const { nivel, n, k, ph, z } = ex.data, zt = { 90: 1.645, 95: 1.96, 99: 2.575 }[nivel]; assert(near(z, zt) && n >= 30);
      assert(near(v(ex.partes[0].answer.value), k / n) && near(ph, k / n));
      const E = zt * Math.sqrt(ph * (1 - ph) / n); assert(near(ex.partes[1].answer.value, E, 1e-9));
      const [lo, hi] = ex.partes[2].answer.parts.map((x) => x.value); assert(near(lo, ph - E) && near(hi, ph + E) && lo > 0 && hi < 1);
      assert(ex.enunciado.includes(String(k)) && ex.enunciado.includes(String(n)));
    },
    'ic-inverso'(ex, { assert, near }) {
      const { n, sd, lo, hi, xb, E } = ex.data;
      assert(near(ex.partes[0].answer.value, (lo + hi) / 2) && near(ex.partes[1].answer.value, (hi - lo) / 2, 1e-6) && near(E, (hi - lo) / 2, 1e-6));
      assert(near(1.96 * sd / Math.sqrt(n), (hi - lo) / 2, 1e-6), 'E y n compatibles'); assert.strictEqual(v(ex.partes[2].answer.value), n); assert(n >= 30);
      assert(ex.enunciado.includes('\\sigma=' + sd));
    },
    tamano(ex, { assert, near }) {
      const d = ex.data, Z = { 90: [1.645, 1.64, 1.65], 95: [1.96], 99: [2.575, 2.57, 2.58] };
      const nf = (z) => (d.tipo === 'media' ? Math.pow(z * d.sd / d.E, 2) : z * z * d.pp * (1 - d.pp) / (d.E * d.E));
      assert(d.niv1 !== d.niv2);
      [d.niv1, d.niv2].forEach((nl, i) => {
        const ns = Z[nl].map((z) => Math.ceil(nf(z) - 1e-9)); Z[nl].forEach((z) => assert(Math.abs(nf(z) - Math.round(nf(z))) > 1e-6));
        const ans = ex.partes[i + 1].answer; assert.strictEqual(ans.value, ns[0]); assert.deepStrictEqual(ans.alt, ns.slice(1));
      });
      assert(near(ex.partes[0].answer.value, Z[d.niv1][0]));
    },
    'media-muestral'(ex, { assert, near }) {
      const { n, se, sd, mu, cc, a, b, zc, z1, z2 } = ex.data;
      assert(near(sd / Math.sqrt(n), se) && n >= 30 && near(v(ex.partes[0].answer.value), se));
      const zOf = (x) => Math.round((x - mu) / se * 100) / 100;
      assert(near(zOf(cc), zc) && near(ex.partes[1].answer.value, T(zc), 1e-9));
      assert(near(zOf(a), z1) && near(zOf(b), z2) && near(ex.partes[2].answer.value, r4(T(z2) - T(z1)), 1e-9));
      assert(ex.enunciado.includes(String(n)));
    },
  };
})();
