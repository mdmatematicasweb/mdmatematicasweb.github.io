/* Gráficas del resultado del simulacro: una función por tipo que convierte ex.data en un spec de MDPlot (graficas.js).
 * Sólo se ofrecen al corregir, nunca durante el examen.
 */
(function (root) {
  'use strict';
  const X = root.MDExam;
  const num = (x) => (x && typeof x === 'object' && 'n' in x ? x.n / x.d : x);
  const P3 = (p) => p.map(num);
  const pt = (p, label) => ({ p: P3(p), label });
  const caja = (pts) => Math.max(5, Math.ceil(Math.max(...[].concat(...pts.map(P3)).map(Math.abs)) + 1));
  const plano = (n, D) => ({ eq: [n[0], n[1], n[2], D] });
  const rango = (xs, pad) => { const a = Math.min(...xs), b = Math.max(...xs), w = Math.max(pad, (b - a) * 0.3); return [a - w, b + w]; };

  /* ---------- Geometría (3D) ---------- */
  X.grafica('rectas-posicion', (d) => {
    const Q = d.Q0.slice(); Q[d.k] += d.a0;
    return { type: '3d', lines: [{ p: d.P, v: d.u }, { p: Q, v: d.v }], points: [pt(d.I, 'P_c')], r: caja([d.P, Q, d.I]) };
  });
  X.grafica('plano-recta', (d) => {
    if (d.v === '3p') return { type: '3d', planes: [{ eq: d.eq }], lines: [{ p: d.Q, v: d.dv }], points: [pt(d.A, 'A'), pt(d.B, 'B'), pt(d.C, 'C'), pt(d.I, 'P')], r: caja([d.A, d.B, d.C, d.I]) };
    if (d.v === 'rp') return { type: '3d', planes: [{ eq: d.eq }], lines: [{ p: d.P0, v: d.u }], points: [pt(d.Q, 'Q'), pt(d.R, 'R')], r: caja([d.P0, d.Q, d.R]) };
    return { type: '3d', planes: [{ eq: d.eq }], lines: [{ p: d.P, v: d.u }, { p: d.Q, v: d.w }], r: caja([d.P, d.Q]) };
  });
  X.grafica('distancias', (d) => {
    if (d.v === 'rr') return { type: '3d', lines: [{ p: d.P, v: d.u }, { p: d.Q, v: d.w }], points: [pt(d.P, 'P'), pt(d.Q, 'Q')], r: caja([d.P, d.Q]) };
    if (d.v === 'pl') return { type: '3d', planes: [plano(d.n, d.D), plano(d.n, d.Ds[0])], points: [pt(d.P, 'P')], r: caja([d.P]) };
    return { type: '3d', lines: [{ p: d.Q, v: d.dv }], points: [pt(d.P, 'P'), pt(d.I, 'I')], segments: [{ a: P3(d.P), b: P3(d.I) }], r: caja([d.P, d.I, d.Q]) };
  });
  X.grafica('simetrico', (d) => {
    const base = { type: '3d', points: [pt(d.P, 'P'), pt(d.Ps, "P'")], segments: [{ a: P3(d.P), b: P3(d.Ps) }], r: caja([d.P, d.Ps]) };
    if (d.tipo === 'plano') base.planes = [{ eq: d.pl }]; else base.lines = [{ p: d.Q, v: d.v }];
    return base;
  });
  X.grafica('angulos', (d) => {
    if (d.v === 'rr') return { type: '3d', lines: [{ p: d.P, v: d.a }, { p: d.Q, v: d.b }], planes: [{ eq: d.eq }], r: caja([d.P, d.Q]) };
    if (d.v === 'rp') return { type: '3d', lines: [{ p: d.P, v: d.a }], planes: [plano(d.b, d.D1), { eq: d.eq }], r: caja([d.P]) };
    return { type: '3d', planes: [plano(d.a, d.D1), plano(d.b, d.D2)] };
  });
  X.grafica('areas-vol', (d) => {
    const D = d.D0.slice(); D[d.j] = d.k1;
    const V = [d.A, d.B, d.C, D];
    const segs = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]].map(([i, j]) => ({ a: V[i], b: V[j], solid: true }));
    return { type: '3d', points: V.map((p, i) => pt(p, 'ABCD'[i])), segments: segs, r: caja(V) };
  });
  X.grafica('vectores', (d) => {
    const u = d.u.slice(); u[d.k] = d.a0;
    return { type: '3d', points: [pt(u, 'u'), pt(d.v, 'v')], segments: [{ a: [0, 0, 0], b: u }, { a: [0, 0, 0], b: d.v }], r: caja([u, d.v]) };
  });

  /* ---------- Análisis (2D) ---------- */
  X.grafica('tangente-normal', (d) => ({
    type: '2d', x: rango([d.x0], 2.5), curves: [{ f: d.f, label: 'f' }],
    lines: [{ m: d.m, n: d.n, label: 'tangente' }, { m: d.mn, n: d.nn, label: 'normal' }], points: [{ x: d.x0, y: d.f(d.x0), label: '' }],
  }));
  X.grafica('primitiva', (d) => ({ type: '2d', x: rango([d.a, d.b], 1), curves: [{ f: d.fn, label: 'f' }], fill: [{ f: d.fn, a: d.a, b: d.b }], vlines: [d.a, d.b] }));
  X.grafica('extremos-abs', (d) => ({ type: '2d', x: rango([d.a, d.b], 0.5), curves: [{ f: d.f, label: 'f' }], vlines: [d.a, d.b] }));
  X.grafica('area-curvas', (d) => ({
    type: '2d', x: rango([d.a, d.b], 1), curves: [{ f: d.f, label: 'f' }, { f: d.g, label: 'g' }],
    fill: [{ f: d.f, g: d.g, a: d.a, b: d.b }], points: (d.cuts || []).filter((x) => Number.isFinite(x)).map((x) => ({ x, y: d.f(x), label: '' })),
  }));
  X.grafica('monotonia', (d) => (typeof d.f === 'function' ? { type: '2d', x: rango([d.r1, d.r2, d.p1, d.p2, d.p].filter(Number.isFinite), 1.5), curves: [{ f: d.f, label: 'f' }] } : null));
  X.grafica('optimizacion', (d) => ({ type: '2d', x: [d.lo, d.hi], curves: [{ f: d.obj, label: 'función a optimizar' }], points: [{ x: d.xo, y: d.obj(d.xo), label: 'óptimo' }] }));
})(typeof globalThis !== 'undefined' ? globalThis : this);
