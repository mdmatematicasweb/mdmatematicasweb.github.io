// Verificadores independientes de los módulos de 3º ESO (assets/gym/eso3-*.js).
// Cada función recibe el reto y recalcula la respuesta con otro método (enteros, fuerza bruta, otra fórmula).
const gcdI = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const V = {};
const fv = (f) => f.n / f.d;
const parts = (ch) => ch.answer.parts.map((p) => fv(p.value));

// ---------- Tema 1 ----------
V['eso3-mcd-mcm'] = (ch, { assert }) => {
  const { a, b } = ch.data;
  let d = 1; for (let k = 1; k <= Math.min(a, b); k++) if (a % k === 0 && b % k === 0) d = k;     // mayor divisor común por fuerza bruta
  let m = Math.max(a, b); while (m % a || m % b) m++;                                               // menor múltiplo común por fuerza bruta
  const [x, y] = parts(ch);
  const got = ch.prompt.includes('Calcula, en segundos') || /Dos luces/.test(ch.prompt) ? [m, d] : [d, m];
  assert.deepStrictEqual([x, y], got);
};
V['eso3-frac-operar'] = (ch, { assert }) => {
  const { A, B, C, plus, mul, res } = ch.data, v = fv(ch.answer.value), a = fv(A), b = fv(B);
  if (plus !== undefined) assert(Math.abs(v - (plus ? a + b : a - b)) < 1e-9);
  else if (mul !== undefined) assert(Math.abs(v - (mul ? a * b : a / b)) < 1e-9);
  else assert(Math.abs(v - (0.5 - (b + fv(C)) * a)) < 1e-9);
};
V['eso3-frac-generatriz'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.txt && d.num !== undefined && d.ps === undefined) assert(Math.abs(v - Number(d.txt.replace(',', '.'))) < 1e-12);
  else if (d.as === undefined) { const s = d.ent + '.' + d.ps.repeat(40); assert(Math.abs(v - Number(s)) < 1e-12); }
  else { const s = d.ent + '.' + d.as + d.ps.repeat(40); assert(Math.abs(v - Number(s)) < 1e-12); }
};
V['eso3-frac-problema'] = (ch, { assert }) => {
  const { f1, f2, total, q } = ch.data;
  assert(Math.abs(q - total * (1 - fv(f1) - fv(f2))) < 1e-9 && Number.isInteger(q));
  assert(fv(ch.answer.value) === (ch.prompt.startsWith('De un depósito') ? q : total));
};
// ---------- Tema 2 ----------
V['eso3-pot-calculo'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.base) assert(Math.abs(v - Math.pow(fv(d.base), d.e)) < 1e-9 * Math.max(1, Math.abs(v)));
  else assert(Math.abs(v - Math.pow(d.b, d.m + d.n - d.k)) < 1e-12 * Math.max(1, v));
};
V['eso3-notacion'] = (ch, { assert }) => {
  const d = ch.data, [c, e] = parts(ch);
  assert(c >= 1 && c < 10 && Number.isInteger(e));
  if (d.mul !== undefined) { const target = d.mul ? d.a * Math.pow(10, d.n) * d.b * Math.pow(10, d.m) : d.a * Math.pow(10, d.n) / (d.b * Math.pow(10, d.m)); assert(Math.abs(c * Math.pow(10, e) - target) <= 1e-9 * target); }
  else assert(Math.abs(c * Math.pow(10, e) - d.a * Math.pow(10, d.n)) <= 1e-9 * Math.abs(d.a * Math.pow(10, d.n)));
};
V['eso3-radicales'] = (ch, { assert }) => {
  const d = ch.data;
  if (d.rad !== undefined) { const [a, b] = parts(ch); assert(a * a * b === d.rad && ![2, 3, 5, 6, 7, 10, 11, 13].some((q) => b % (q * q) === 0)); }
  else if (d.r1 !== undefined) { const k = fv(ch.answer.value); assert(Math.abs(k * Math.sqrt(d.sqfree) - (ch.prompt.includes('+\\sqrt') ? Math.sqrt(d.r1) + Math.sqrt(d.r2) : Math.sqrt(d.r1) - Math.sqrt(d.r2))) < 1e-9); }
  else { const [k, m] = parts(ch); assert(Math.abs(k * Math.sqrt(m) - Math.sqrt(d.a) * Math.sqrt(d.b)) < 1e-9); }
};
// ---------- Tema 3 ----------
V['eso3-prog-aritmetica'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.k !== undefined) { assert(v === (d.a_m - d.a_k) / (d.m - d.k)); assert(d.a_k + (d.m - d.k) * v === d.a_m); }
  else if (ch.answer.label.startsWith('S')) { let s = 0; for (let i = 0; i < d.n; i++) s += d.a1 + i * d.d; assert.strictEqual(v, s); }
  else assert.strictEqual(v, d.a1 + (d.n - 1) * d.d);
};
V['eso3-prog-geometrica'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.n === undefined) { let s = 0, t = fv(d.a1 === undefined ? { n: 0, d: 1 } : { n: d.a1, d: 1 }); for (let i = 0; i < 400; i++) { s += t; t *= fv(d.r); } assert(Math.abs(s - v) < 1e-9); }
  else if (ch.answer.label.startsWith('S')) { let s = 0; for (let i = 0; i < d.n; i++) s += d.a1 * Math.pow(d.r, i); assert.strictEqual(v, s); }
  else { let t = d.a1; for (let i = 1; i < d.n; i++) t *= d.r; assert.strictEqual(v, t); }
};
V['eso3-prog-problema'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.tot !== undefined) { let s = 0, t = 0; for (let i = 0; i < d.n; i++) { t = d.a1 + i * d.d; s += t; } assert.strictEqual(v, d.tot ? s : t); }
  else if (d.d !== undefined) { let s = 0; for (let i = 0; i < d.n; i++) s += d.a1 + i * d.d; assert.strictEqual(v, s); }
  else if (d.r !== undefined) { let t = d.a1; for (let i = 0; i < d.n; i++) t *= d.r; assert.strictEqual(v, t); }
  else { let c = d.C; for (let i = 0; i < d.n; i++) c = Math.round(c * (100 + d.t)) / 100; assert(Math.abs(v - c) < 0.006); }
};
// ---------- Tema 4 ----------
V['eso3-prop-regla3'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.prod !== undefined) assert(Math.abs(v * d.b - d.prod) < 1e-9 && Number.isInteger(v));
  else if (d.m1 !== undefined) assert(Math.abs(v - d.q1 / (d.m1 * d.h1) * d.m2 * d.h2) < 1e-9);
  else assert(Math.abs(v / d.x2 - fv(d.y1) / d.x1) < 1e-9);
};
V['eso3-porcentajes'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.fin !== undefined && d.r !== undefined && d.r1 === undefined) assert(Math.abs(v - d.P0 * (1 - d.r / 100)) < 1e-9);
  else if (d.up1 !== undefined) { let p = d.P0; p *= d.up1 ? 1 + d.r1 / 100 : 1 - d.r1 / 100; p *= d.up2 ? 1 + d.r2 / 100 : 1 - d.r2 / 100; assert(Math.abs(v - p) < 0.006); }
  else if (d.con !== undefined) assert(Math.abs(v - (d.con ? d.P0 * 1.21 : d.P0)) < 0.006);
  else { assert(v === d.tot && Math.abs(d.part - v * d.r / 100) < 1e-9); }
};
V['eso3-interes'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  let c = d.C; for (let i = 0; i < d.n; i++) c *= 1 + d.t / 100;
  const simple = d.C * d.t / 100 * d.n;
  if (d.simple !== undefined) assert(Math.abs(v - simple) < 0.006);
  else if (d.comp !== undefined) assert(Math.abs(v - c) < 0.006);
  else assert(Math.abs(v - (c - d.C - simple)) < 0.006);
};

module.exports = V;
