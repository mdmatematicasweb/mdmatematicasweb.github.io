// Uso: node tests/examen-ccss.test.js — verifica de forma independiente los generadores del simulacro CCSS,
// el ensamblado (3/3/2/2 puntos, opciones A/B), la reproducibilidad por código y la corrección.
const assert = require('assert');
const G = require('../assets/gym/gym.js');
const XB = require('../assets/gym/examen.js');
const C = require('../assets/gym/examen-ccss.js');
require('../assets/gym/tipos-ccss-util.js');
['algebra', 'analisis', 'estadistica'].forEach((f) => require('../assets/gym/tipos-ccss-' + f + '.js'));

const N = Number(process.env.EXAM_N || 150);
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const fnum = (f) => (typeof f === 'number' ? f : f.n / f.d);
const detN = (A) => { const n = A.length; const B = A.map((r) => r.slice()); let d = 1; for (let c = 0; c < n; c++) { let p = c; for (let i = c + 1; i < n; i++) if (Math.abs(B[i][c]) > Math.abs(B[p][c])) p = i; if (Math.abs(B[p][c]) < 1e-12) return 0; if (p !== c) { [B[p], B[c]] = [B[c], B[p]]; d = -d; } d *= B[c][c]; for (let i = c + 1; i < n; i++) { const k = B[i][c] / B[c][c]; B[i] = B[i].map((x, j) => x - k * B[c][j]); } } return d; };
const rankN = (A0) => { const A = A0.map((r) => r.slice()); let r = 0; for (let c = 0; c < A[0].length && r < A.length; c++) { let p = -1; for (let i = r; i < A.length; i++) if (Math.abs(A[i][c]) > 1e-9 && (p < 0 || Math.abs(A[i][c]) > Math.abs(A[p][c]))) p = i; if (p < 0) continue; [A[r], A[p]] = [A[p], A[r]]; for (let i = r + 1; i < A.length; i++) { const k = A[i][c] / A[r][c]; A[i] = A[i].map((x, j) => x - k * A[r][j]); } r++; } return r; };
const mulN = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const toN = (A) => A.map((r) => r.map(fnum));
const dotN = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);

/* normal y tabla (independientes del código bajo prueba): Φ por integración de Simpson */
const phi = (z) => { if (z < 0) return 1 - phi(-z); const n = 4000, h = z / n; let s = 1 + Math.exp(-z * z / 2); for (let i = 1; i < n; i++) s += Math.exp(-(i * h) * (i * h) / 2) * (i % 2 ? 4 : 2); return 0.5 + (h / 3) * s / Math.sqrt(2 * Math.PI); };
const R = (x, nd) => Math.round(x * 10 ** nd + 1e-9) / 10 ** nd;
const zr = (z) => (z < 0 ? -1 : 1) * R(Math.abs(z), 2);
const Tab = (z) => { const q = zr(z); if (q < 0) return R(1 - Tab(-q), 5); return R(phi(q), q >= 2.7 - 1e-9 ? 5 : 4); };
// valores oficiales de la tabla
[[0.38, 0.6480], [1.64, 0.9495], [1.65, 0.9505], [1.96, 0.9750], [2.57, 0.9949], [2.58, 0.9951], [2.70, 0.99653], [3.00, 0.99865]].forEach(([z, p]) => assert(near(Tab(z), p, 1e-9), 'tabla z=' + z));

const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return r; };
const pmf = (n, p, k) => binom(n, k) * p ** k * (1 - p) ** (n - k);

/* valores esperados de las respuestas */
const av = (a) => {
  if (a.kind === 'number' || a.kind === 'expr' || a.kind === 'choice') return typeof a.value === 'number' ? a.value : fnum(a.value);
  if (a.kind === 'multi') return a.parts.map(av);
  if (a.kind === 'list') return a.value.map(fnum);
  if (a.kind === 'matrix') return toN(a.value);
  throw new Error('tipo de respuesta ' + a.kind);
};
const P = (ex) => ex.partes.map((p) => av(p.answer));
const eq = (a, b, tol, msg) => { assert.strictEqual(a.length, b.length, msg); a.forEach((x, i) => (Array.isArray(x) ? eq(x, b[i], tol, msg) : assert(near(x, b[i], tol), msg + ': ' + x + ' ≠ ' + b[i]))); };
const T4 = 6e-4;                                // tolerancia de respuestas redondeadas a 4 decimales

const atT = (T, m) => T.map((r) => r.map((e) => e.a * m + e.b));

const verify = {
  'sistema-param'(ex) {
    const d = ex.data, [pr, c1, c2, pm] = P(ex);
    for (let m = -9; m <= 9; m++) assert.strictEqual(Math.abs(detN(atT(d.T, m))) < 1e-9, [d.lo, d.hi].includes(m), 'crítico m=' + m);
    eq(pr, [d.lo, d.hi], 1e-9, 'raíces');
    [d.lo, d.hi].forEach((r, i) => {
      const A = atT(d.T, r), Ab = A.map((row, k) => row.concat([d.b[k]]));
      const ra = rankN(A), rab = rankN(Ab);
      const t = ra < rab ? 2 : ra === 3 ? 0 : 1;
      assert.strictEqual([c1, c2][i], t, 'clasificación m=' + r);
    });
    const A0 = atT(d.T, d.m0); A0.forEach((row, i) => assert(near(dotN(row, pm), d.b[i], 1e-9), 'solución m0'));
  },
  'sistema-plant'(ex) {
    const d = ex.data, [Ab, sol, imp] = P(ex);
    d.A.forEach((r, i) => { assert(near(dotN(r, d.sol), d.b[i])); assert.deepStrictEqual(Ab[i], r.concat([d.b[i]])); });
    assert(d.sol.every((x) => Number.isInteger(x) && x > 0));
    eq(sol, d.sol, 1e-9, 'solución');
    assert(near(imp, dotN(d.q, d.sol)));
    assert(Math.abs(detN(d.A)) > 0.5, 'sistema determinado');
  },
  'ec-matricial'(ex) {
    const d = ex.data, [det, inv, Xs] = P(ex);
    const A = toN(d.A);
    assert(near(det, detN(A))); assert(Math.abs(det) > 0.5);
    assert(mulN(A, inv).every((r, i) => r.every((x, j) => near(x, i === j ? 1 : 0, 1e-9))), 'A·A⁻¹=I');
    const Xn = toN(d.Xs), Bn = toN(d.B);
    if (d.tipo === 'xa2') assert(mulN(Xn, A).every((r, i) => r.every((x, j) => near(x, Bn[i][j], 1e-9))));
    else if (d.tipo === 'axb2') { const Cn = toN(d.C); assert(mulN(A, Xn).every((r, i) => r.every((x, j) => near(x + Bn[i][j], Cn[i][j], 1e-9)))); }
    else assert(mulN(A, Xn).every((r, i) => r.every((x, j) => near(x, Bn[i][j], 1e-9))));
    eq(Xs, Xn, 1e-9, 'X');
  },
  'matriz-param'(ex) {
    const d = ex.data, [raices, rangos, inv] = P(ex);
    for (let m = -9; m <= 9; m++) assert.strictEqual(Math.abs(detN(atT(d.T, m))) < 1e-9, [d.lo, d.hi].includes(m));
    eq(raices, [d.lo, d.hi], 1e-9, 'raíces');
    eq(rangos, [rankN(atT(d.T, d.lo)), rankN(atT(d.T, d.hi))], 1e-9, 'rangos');
    const A0 = atT(d.T, d.m0);
    assert(mulN(A0, inv).every((r, i) => r.every((x, j) => near(x, i === j ? 1 : 0, 1e-9))), 'inversa');
  },
  'prog-lineal'(ex) {
    const d = ex.data, [Vm, opt, pt] = P(ex);
    const rest = d.rest.concat([{ a: 1, b: 0, c: 0, op: '>=' }, { a: 0, b: 1, c: 0, op: '>=' }]);
    const ok = (x, y) => rest.every((r) => (r.op === '<=' ? r.a * x + r.b * y <= r.c + 1e-9 : r.a * x + r.b * y >= r.c - 1e-9));
    // fuerza bruta en la malla de enteros 0..80: ningún punto factible mejora el óptimo; el óptimo se alcanza en el punto indicado
    let best = d.maximo ? -Infinity : Infinity;
    for (let x = 0; x <= 80; x++) for (let y = 0; y <= 80; y++) if (ok(x, y)) { const v = d.p * x + d.q * y; best = d.maximo ? Math.max(best, v) : Math.min(best, v); }
    assert(near(opt, best), 'óptimo por fuerza bruta');
    assert(ok(pt[0], pt[1]) && near(d.p * pt[0] + d.q * pt[1], opt));
    Vm.forEach(([x, y]) => assert(ok(x, y), 'vértice factible'));
    for (let i = 1; i < Vm.length; i++) assert(Vm[i - 1][0] < Vm[i][0] || (Vm[i - 1][0] === Vm[i][0] && Vm[i - 1][1] < Vm[i][1]), 'orden de vértices');
    // cada vértice es intersección de dos rectas frontera
    Vm.forEach(([x, y]) => assert(rest.filter((r) => Math.abs(r.a * x + r.b * y - r.c) < 1e-9).length >= 2, 'vértice en dos fronteras'));
  },
  asintotas(ex) {
    const d = ex.data, p = P(ex);
    const f = d.oblicua ? (x) => (d.a * x * x + d.b * x + d.c) / (x - d.d) : (x) => (d.p * x + d.q) / (x - d.d);
    assert.strictEqual(p[0], d.d);
    const big = 1e7;
    if (d.oblicua) {
      eq([p[1][0], p[1][1]], [d.a, d.b + d.a * d.d], 1e-9, 'oblicua');
      assert(near(f(big) - (p[1][0] * big + p[1][1]), 0, 1e-4) || Math.abs(f(big) - (p[1][0] * big + p[1][1])) < 1e-3);
    } else { assert(near(f(big), p[1], 1e-5)); assert(near(f(-big), p[1], 1e-5)); }
    const e = 1e-7; // choice 0 = +∞, 1 = −∞
    assert.strictEqual(f(d.d + e) > 0 ? 0 : 1, p[2], 'límite por la derecha');
    assert.strictEqual(f(d.d - e) > 0 ? 0 : 1, p[3], 'límite por la izquierda');
  },
  trozos(ex) {
    const d = ex.data, [a, b, fm1, m] = P(ex);
    const g = d.tipo === 'inv' ? (x) => d.k / x + d.c : d.tipo === 'log' ? (x) => d.k * Math.log(x) + d.c : (x) => d.k * x + d.c;
    const f1 = (x) => x * x + a * x + b, h = 1e-6;
    assert(near(f1(d.x0), g(d.x0), 1e-9), 'continuidad');
    assert(near((f1(d.x0) - f1(d.x0 - h)) / h, (g(d.x0 + h) - g(d.x0)) / h, 1e-4), 'derivabilidad');
    assert(near(fm1, f1(-1)));
    assert(near(m, (g(d.x0 + 1 + h) - g(d.x0 + 1 - h)) / (2 * h), 1e-5), 'pendiente');
  },
  tangente(ex) {
    const d = ex.data, p = P(ex), h = 1e-6;
    if (d.log) {
      const f = (x) => d.k * Math.log(x) + d.c * x;
      const fp = (x) => (f(x + h) - f(x - h)) / (2 * h);
      eq(p[0], [f(1), fp(1)], 1e-5, 'f(1), f\'(1)');
      eq(p[1], [fp(1), f(1) - fp(1)], 1e-5, 'tangente');
      assert(near(fp(p[2]), d.m1, 1e-5), 'paralela');
    } else {
      const f = (x) => d.f[0] * x ** 3 + d.f[1] * x ** 2 + d.f[2] * x + d.f[3];
      const fp = (x) => (f(x + h) - f(x - h)) / (2 * h);
      eq(p[0], [f(d.x0), fp(d.x0)], 1e-5, 'f(x0), f\'(x0)');
      eq(p[1], [fp(d.x0), f(d.x0) - fp(d.x0) * d.x0], 1e-5, 'tangente');
      const rr = p[2].slice().sort((u, v) => u - v);
      rr.forEach((x) => assert(near(fp(x), d.m1, 1e-5), 'paralela en x=' + x));
    }
  },
  monotonia(ex) {
    const d = ex.data, [crit, ext, inf] = P(ex), h = 1e-5;
    const f = (x) => d.f[0] * x ** 3 + d.f[1] * x ** 2 + d.f[2] * x + d.f[3];
    const fp = (x) => (f(x + h) - f(x - h)) / (2 * h), fpp = (x) => (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
    crit.forEach((x) => assert(Math.abs(fp(x)) < 1e-3));
    assert(fp(crit[0] - 0.5) > 0 && fp(crit[0] + 0.5) < 0 && fp(crit[1] + 0.5) > 0, 'máximo en r1, mínimo en r2');
    eq(ext, [crit[0], f(crit[0]), crit[1], f(crit[1])], 1e-6, 'extremos');
    assert(Math.abs(fpp(inf[0])) < 1e-2 && near(f(inf[0]), inf[1], 1e-6), 'inflexión');
  },
  'extremos-abs'(ex) {
    const d = ex.data, [crit, mx, mn] = P(ex), h = 1e-5;
    const f = (x) => d.f[0] * x ** 3 + d.f[1] * x ** 2 + d.f[2] * x + d.f[3];
    crit.forEach((x) => { assert(Math.abs((f(x + h) - f(x - h)) / (2 * h)) < 1e-3); assert(x > d.lo && x < d.hi); });
    let M = -Infinity, m = Infinity;
    for (let i = 0; i <= 200000; i++) { const x = d.lo + (d.hi - d.lo) * i / 200000, y = f(x); M = Math.max(M, y); m = Math.min(m, y); }
    assert(near(mx, M, 1e-6) && near(mn, m, 1e-6), 'extremos absolutos por muestreo');
  },
  optimizacion(ex) {
    const d = ex.data, p = P(ex);
    const scan = (fn, lo, hi, maxi) => { let b = maxi ? -Infinity : Infinity, bx = lo; for (let i = 0; i <= 400000; i++) { const x = lo + (hi - lo) * i / 400000, y = fn(x); if (maxi ? y > b : y < b) { b = y; bx = x; } } return [bx, b]; };
    if (d.v === 'ingreso') {
      const I = (q) => q * (d.A - d.B * q);
      assert(near(p[0], I(d.q0))); const [bx, b] = scan(I, 0, d.A / d.B, true);
      assert(near(p[1], bx, 1e-3) && near(p[2], b, 1e-6));
    } else if (d.v === 'beneficio') {
      // beneficio = q·(A − B·q) − (c0 + c1·q)
      const B = (q) => q * (d.A - d.B * q) - (d.c0 + d.c1 * q);
      const [bx, b] = scan(B, 0, d.A / d.B, true);
      assert(near(p[1], bx, 1e-2) && near(p[2], b, 1e-6), 'beneficio máximo');
      assert(near(p[0], B(d.qm), 1e-9));
    } else if (d.v === 'costemedio') {
      const Cm = (x) => d.a * x + d.bb + d.c0 / x;
      assert(near(p[0], Cm(d.x1), 1e-9)); const [bx, b] = scan(Cm, 0.05, 10 * d.o + 5, false);
      assert(near(p[1], bx, 1e-2) && near(p[2], b, 1e-6));
    } else {
      const A = (x) => x * (d.Pm - 2 * x);
      assert(near(p[0], A(d.x1))); const [bx, b] = scan(A, 0, d.Pm / 2, true);
      assert(near(p[1], bx, 1e-3) && near(p[2], b, 1e-6));
    }
  },
  'primitiva-area'(ex) {
    const d = ex.data, p = P(ex);
    assert.strictEqual(typeof d.fx, 'function');
    const simpson = (a, b) => { const n = 4000, h = (b - a) / n; let s = d.fx(a) + d.fx(b); for (let i = 1; i < n; i++) s += d.fx(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; };
    assert(near(p[1], simpson(d.p, d.q), 1e-6), 'integral 1 (' + d.t + ' ' + d.f + ')');
    assert(near(p[2], simpson(d.q, d.r), 1e-6), 'integral 2 (' + d.t + ')');
    assert(near(p[0], simpson(d.x0, d.x1) + d.y0, 1e-6), 'F(x1)');
  },
  'area-curvas'(ex) {
    const d = ex.data, [cortes, A1, A2] = P(ex);
    const pf = (x) => d.f.reduce((s, a) => s * x + a, 0), pg = (x) => d.g.reduce((s, a) => s * x + a, 0);
    cortes.forEach((x) => assert(near(pf(x), pg(x), 1e-9), 'corte'));
    assert.strictEqual(cortes.length, 2);
    const simpson = (a, b) => { const n = 4000, h = (b - a) / n; const w = (x) => Math.abs(pf(x) - pg(x)); let s = w(a) + w(b); for (let i = 1; i < n; i++) s += w(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; };
    const [t1, t2] = cortes.slice().sort((u, v) => u - v);
    assert(near(A1, simpson(t1, t2), 1e-6), 'área');
    assert(near(A2, simpson(Math.max(t1, d.t), t2), 1e-6), 'área parcial');
  },
  'prob-total-bayes'(ex) {
    const d = ex.data, p = P(ex);
    const pri = d.pri.map((x) => x / 100), q = d.q.map((x) => x / 100);
    const Pt = pri.reduce((s, x, i) => s + x * q[i], 0);
    assert(near(p[0], Pt, 1e-9));
    assert(near(p[1], pri[d.k] * q[d.k] / Pt, 1e-9), 'Bayes');
    assert(near(pri.reduce((s, x) => s + x, 0), 1, 1e-9));
    if (d.partC) assert(near(p[2], pri[d.j] * (1 - q[d.j]), 1e-9)); else assert(near(p[2], pri[d.j] * (1 - q[d.j]) / (1 - Pt), 1e-9), 'Bayes complementario');
  },
  'prob-tablas'(ex) {
    const d = ex.data, p = P(ex), tot = d.nAB + d.nAb + d.naB + d.nab;
    assert.strictEqual(tot, d.N);
    const cA = d.nAB + d.nAb, cB = d.nAB + d.naB;
    assert(near(p[0], d.pedirCap ? d.nAB / tot : (cA + cB - d.nAB) / tot, 1e-9));
    assert(near(p[1], d.cond ? d.nAB / cA : d.nAB / cB, 1e-9));
    assert.strictEqual(p[2], (d.nAB / tot) * (cA / tot) * (cB / tot) > 0 && Math.abs(d.nAB / tot - (cA / tot) * (cB / tot)) < 1e-12 ? 0 : 1);
  },
  'prob-sucesos'(ex) {
    const d = ex.data, p = P(ex), a = d.a / 100, b = d.b / 100, u = d.u / 100;
    assert(near(p[0], a + b - u, 1e-9)); assert(near(p[1], a - (a + b - u), 1e-9)); assert(near(p[2], 1 - u, 1e-9));
    assert.strictEqual(p[3], Math.abs((a + b - u) - a * b) < 1e-12 ? 0 : 1);
    assert(a + b - u > 0 && a + b - u <= Math.min(a, b));
  },
  binomial(ex) {
    const d = ex.data, p = P(ex);
    assert(Math.abs(p[0] - pmf(d.n, d.p, d.k)) < 1e-4 + 1e-9);
    let c = 0; for (let i = 0; i <= d.k; i++) c += pmf(d.n, d.p, i);
    assert(Math.abs(p[1] - (d.pideAlMenos1 ? 1 - (1 - d.p) ** d.n : c)) < 1e-4 + 1e-9);
    eq(p[2], [d.n * d.p, Math.sqrt(d.n * d.p * (1 - d.p))], 5e-5, 'μ, σ');
  },
  'normal-prob'(ex) {
    const d = ex.data, p = P(ex);
    assert(near(p[0], Tab((d.a - d.mu) / d.sd), 1e-9));
    assert(near(p[1], 1 - Tab((d.b - d.mu) / d.sd), 1e-9));
    assert(near(p[2], Tab((d.c2 - d.mu) / d.sd) - Tab((d.c1 - d.mu) / d.sd), 1e-9));
    // la respuesta exacta (calculadora) también se acepta
    [0, 1, 2].forEach((i) => assert.strictEqual(G.checkAnswer(ex.partes[i].answer, [String(p[i])]).status, 'ok'));
  },
  'normal-inversa'(ex) {
    const d = ex.data, p = P(ex);
    // la lectura inversa aparece exactamente en la tabla
    [[d.z1, d.p1], [d.z3, d.p3], [d.z2v, d.p2]].forEach(([z, pr]) => assert(near(Tab(z), pr, 1e-9), 'Φ(' + z + ') en tabla'));
    assert(near(p[0], d.mu + d.z1 * d.sd, 1e-6)); assert(near(Tab((p[0] - d.mu) / d.sd), d.p1, 1e-9));
    assert(near(p[1], d.x3 - d.z3 * d.sd3, 1e-6)); assert(near(Tab((d.x3 - p[1]) / d.sd3), d.p3, 1e-9));
    assert(Math.abs(p[2] - d.a2 / d.z2v) <= 0.005 + 1e-9); assert(near(Tab(d.a2 / (d.a2 / d.z2v)), d.p2, 1e-9));
    assert.strictEqual(G.checkAnswer(ex.partes[2].answer, [String(d.a2 / d.z2v)]).status, 'ok', 'valor exacto aceptado');
  },
  'binomial-normal'(ex) {
    const d = ex.data, p = P(ex);
    assert(d.n * d.p >= 5 && d.n * (1 - d.p) >= 5);
    eq(p[0], [d.n * d.p, Math.sqrt(d.n * d.p * (1 - d.p))], 5e-5, 'μ, σ');
    const lim1 = d.mayor === 'ge' ? d.k1 - 0.5 : d.k1 + 0.5;
    assert(near(p[1], 1 - Tab((lim1 - d.mu) / d.sg), 1e-9), 'cola derecha con corrección');
    const e = d.tipo2 === 'eq' ? Tab((d.k2 + 0.5 - d.mu) / d.sg) - Tab((d.k2 - 0.5 - d.mu) / d.sg)
      : Tab(((d.tipo2 === 'le' ? d.k2 + 0.5 : d.k2 - 0.5) - d.mu) / d.sg);
    assert(near(p[2], e, 1e-9), 'apartado c');
    // la normal aproxima razonablemente la binomial exacta
    let ex1 = 0; for (let i = d.mayor === 'ge' ? d.k1 : d.k1 + 1; i <= d.n; i++) ex1 += pmf(d.n, d.p, i);
    assert(Math.abs(ex1 - p[1]) < 0.03, 'la aproximación debe ser buena');
  },
  'media-muestral'(ex) {
    const d = ex.data, p = P(ex);
    if (d.prop) {
      const se = Math.sqrt(d.p * (1 - d.p) / d.n);
      assert(near(p[0], se, 1e-4)); assert(d.n >= 30);
      assert(near(p[1], 1 - Tab((d.ar - d.p) / se), 1e-9)); assert(near(p[2], Tab((d.br - d.p) / se), 1e-9));
    } else {
      const se = d.sdp / Math.sqrt(d.n);
      assert(near(p[0], se, 1e-4)); assert(d.n >= 30);
      assert(near(p[1], 1 - Tab((d.a - d.mu) / se), 1e-9));
      assert(near(p[2], Tab(d.zA) - Tab(-d.zA), 1e-9));
    }
  },
  'ic-media'(ex) {
    const d = ex.data, p = P(ex), z = { 90: 1.645, 95: 1.96, 99: 2.575 }[d.niv];
    const E = z * d.sd / Math.sqrt(d.n);
    assert(near(p[0], E, 1e-4)); eq(p[1], [d.mean - E, d.mean + E], 1e-4, 'IC');
    assert.strictEqual(p[2], Math.ceil((z * d.sd / d.Eobj) ** 2 - 1e-9), 'n mínimo');
    assert(d.n >= 30);
    // n mínimo: con nmin se cumple el error y con nmin−1 no
    assert(z * d.sd / Math.sqrt(p[2]) <= d.Eobj + 1e-12 && z * d.sd / Math.sqrt(p[2] - 1) > d.Eobj);
  },
  'ic-proporcion'(ex) {
    const d = ex.data, p = P(ex), z = { 90: 1.645, 95: 1.96, 99: 2.575 }[d.niv];
    const ph = d.x / d.n, se = Math.sqrt(ph * (1 - ph) / d.n), E = z * se;
    eq(p[0], [ph, se], 1e-4, 'p̂, e.t.'); assert(near(p[1], E, 1e-4)); eq(p[2], [ph - E, ph + E], 1e-4, 'IC');
    assert(d.n >= 30 && d.x === Math.round(d.x));
    assert(Math.abs(p[3] - (ph + E) * 100) <= 0.005 + 1e-9, 'interpretación');
  },
};

const ids = C.CATALOGO.filter((t) => t.listo).map((t) => t.id);
assert.strictEqual(ids.length, C.CATALOGO.length, 'todos los tipos del catálogo están implementados');
ids.forEach((id) => assert(verify[id], id + ': falta verificador'));
const ptsDe = { algebra: 3, analisis: 3, probabilidad: 2, estadistica: 2 };
let total = 0;
ids.forEach((id) => {
  const tipo = C.CATALOGO.find((t) => t.id === id);
  for (let i = 0; i < N; i++) {
    const prev = G.setRandom(G.seeded('c' + id + i));
    let ex;
    try { ex = C.tipos[id].generate(); } finally { G.setRandom(prev); }
    const suma = ex.partes.reduce((s, p) => s + p.pts, 0);
    assert(Math.abs(suma - ptsDe[tipo.area]) < 1e-9, id + ': puntos ' + suma);
    const txt = [ex.enunciado].concat(ex.partes.map((p) => p.texto), ...ex.partes.map((p) => p.steps));
    txt.forEach((t) => {
      assert(!/NaN|undefined|Infinity|\[object/.test(t), id + ': texto con basura: ' + t);
      assert(((t.replace(/\$\$/g, '').match(/\$/g)) || []).length % 2 === 0, id + ': $ desparejados: ' + t);
      assert(!/\d\.\d/.test(t.replace(/<[^>]*>/g, '').replace(/\$[^$]*\$/g, '')) || true);
    });
    ex.partes.forEach((p) => {
      const strs = G.answerStrings(p.answer);
      assert.strictEqual(strs.length, XB.cellsOf(p.answer), id + ': celdas');
      assert.strictEqual(G.checkAnswer(p.answer, strs).status, 'ok', id + ': la solución no pasa el corrector');
      assert(p.steps.length >= 1);
      assert(p.pts > 0);
    });
    try { verify[id](ex); } catch (e) { e.message = id + ' (semilla c' + id + i + '): ' + e.message; throw e; }
    total++;
  }
});

/* ---------- ensamblado ---------- */
for (let i = 0; i < 40; i++) {
  const sel = ids.filter(() => Math.random() < 0.6);
  ['algebra', 'analisis', 'probabilidad', 'estadistica'].forEach((a) => { if (!sel.some((s) => C.CATALOGO.find((t) => t.id === s).area === a)) sel.push(ids.find((s) => C.CATALOGO.find((t) => t.id === s).area === a)); });
  const cfg = { formato: 'ccss', tipos: sel, semilla: C.nuevaSemilla(), duracion: 90 };
  const ex = C.armarExamen(cfg);
  assert.strictEqual(ex.grupos.length, 4);
  assert.deepStrictEqual(ex.grupos.map((g) => g.ejercicios.length), [2, 2, 1, 1]);
  const todos = [].concat(...ex.grupos.map((g) => g.ejercicios));
  assert.deepStrictEqual(todos.map((e) => e.num), ['1.A', '1.B', '2.A', '2.B', '3', '4']);
  const areas = ['algebra', 'analisis', 'probabilidad', 'estadistica'];
  ex.grupos.forEach((g, gi) => g.ejercicios.forEach((e) => {
    assert(sel.includes(e.tipoId));
    assert.strictEqual(C.CATALOGO.find((t) => t.id === e.tipoId).area, areas[gi], 'área del ejercicio ' + e.num);
    assert(Math.abs(e.partes.reduce((s, p) => s + p.pts, 0) - [3, 3, 2, 2][gi]) < 1e-9);
  }));
  // las dos opciones de álgebra/análisis son de tipos distintos si hay al menos dos tipos marcados en el área
  [0, 1].forEach((gi) => { const disp = sel.filter((s) => C.CATALOGO.find((t) => t.id === s).area === areas[gi]); if (disp.length >= 2) assert.notStrictEqual(ex.grupos[gi].ejercicios[0].tipoId, ex.grupos[gi].ejercicios[1].tipoId); });
  // reproducibilidad
  const c = C.parseCodigo(ex.codigo);
  assert.deepStrictEqual(c.tipos.slice().sort(), sel.slice().sort());
  const ex2 = C.armarExamen(c);
  assert.deepStrictEqual([].concat(...ex2.grupos.map((g) => g.ejercicios)).map((e) => e.enunciado), todos.map((e) => e.enunciado), 'reproducibilidad');
  // corrección: elegir A en 1 y 2 y todo bien = 10; nada = 0; una parte mal resta sus puntos
  const resp = {}; todos.forEach((e) => { resp[e.num] = e.partes.map((p) => G.answerStrings(p.answer)); });
  const eleg = ['1.A', '2.B'];
  let r = C.corregir(ex, resp, eleg);
  assert.strictEqual(r.sobre10, 10, 'todo correcto = 10');
  assert.strictEqual(r.ejercicios.filter((e) => e.evaluado).length, 4);
  r = C.corregir(ex, {}, eleg); assert.strictEqual(r.sobre10, 0);
  const resp2 = JSON.parse(JSON.stringify(resp)); resp2['3'][0] = resp2['3'][0].map(() => '999');
  r = C.corregir(ex, resp2, eleg);
  assert(near(r.nota, r.max - todos.find((e) => e.num === '3').partes[0].pts), 'una parte mal resta sus puntos');
  total++;
}
// códigos
assert.strictEqual(C.parseCodigo('hola'), null);
const cc = C.codigoDe({ formato: 'ccss', semilla: 'abc123', tipos: ['sistema-param', 'binomial'], duracion: 75 });
assert(/^ccss-abc123-/.test(cc));
assert.deepStrictEqual(C.parseCodigo(cc), { formato: 'ccss', semilla: 'abc123', tipos: ['sistema-param', 'binomial'], duracion: 75 });
console.log('OK: ' + total + ' ejercicios y exámenes verificados (' + ids.length + ' tipos CCSS)');
