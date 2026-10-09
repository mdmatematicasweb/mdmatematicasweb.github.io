// Verificadores independientes de los módulos de 3º ESO (assets/gym/eso3-*.js).
// Cada función recibe el reto y recalcula la respuesta con otro método (enteros, fuerza bruta, otra fórmula).
const gcdI = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const V = {};
const eqn = (assert, a, b) => assert(Math.abs(a - b) < 1e-9, a + ' ≠ ' + b);
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

// ---------- Tema 5 ----------
const horner = (c, x) => c.reduce((s, k) => s * x + k, 0);
const powSum = (c, x) => c.reduce((s, k, i) => s + k * Math.pow(x, c.length - 1 - i), 0);
V['eso3-pol-valor'] = (ch, { assert }) => {
  const { c, a } = ch.data;
  eqn(assert, fv(ch.answer.value), powSum(c, a));
  eqn(assert, horner(c, a), powSum(c, a));
};
V['eso3-pol-operar'] = (ch, { assert }) => {
  const d = ch.data, got = parts(ch);
  const pts = [-2, -1, 0, 1, 2, 3];
  const q = (r) => (x) => r[0] * x * x + r[1] * x + r[2];
  if (d.c !== undefined && d.r.length === 3 && d.a !== undefined && d.d !== undefined) pts.forEach((x) => eqn(assert, (d.a * x + d.b) * (d.c * x + d.d), q(got)(x)));
  else if (d.sign !== undefined) pts.forEach((x) => eqn(assert, Math.pow(d.a * x + d.sign * d.b, 2), q(got)(x)));
  else if (d.k !== undefined) pts.forEach((x) => eqn(assert, d.A[0] * x * x + d.A[1] * x + d.A[2] - d.k * (d.B[0] * x * x + d.B[1] * x + d.B[2]), q(got)(x)));
  else { eqn(assert, got[0], d.a * d.a); eqn(assert, got[1], -d.b * d.b); pts.forEach((x) => eqn(assert, (d.a * x + d.b) * (d.a * x - d.b), got[0] * x * x + got[1])); }
};
V['eso3-pol-division'] = (ch, { assert }) => {
  const { a, P } = ch.data, [q0, q1, q2, rem] = parts(ch);
  [-3, -1, 0, 2, 5].forEach((x) => eqn(assert, horner(P, x), (x - a) * (q0 * x * x + q1 * x + q2) + rem));
  eqn(assert, rem, horner(P, a));
};
V['eso3-pol-factorizar'] = (ch, { assert }) => {
  const d = ch.data, r = ch.answer.value.map(fv);
  eqn(assert, new Set(r).size, 2);
  if (d.c !== undefined) r.forEach((x) => assert(Math.abs(x * x + d.b * x + d.c) < 1e-9));
  else if (d.a !== undefined) r.forEach((x) => assert(Math.abs(d.a * d.a * x * x - d.b * d.b) < 1e-9));
  else r.forEach((x) => assert(Math.abs(d.k * x * x + d.k * d.r * x) < 1e-9));
};
// ---------- Tema 6 ----------
V['eso3-ec-1grado'] = (ch, { assert }) => {
  const d = ch.data, x = fv(ch.answer.value);
  if (d.e === undefined && d.pp === undefined) assert(Math.abs(d.a * x + d.b - (d.c * x + d.d)) < 1e-9);
  else if (d.pp === undefined) assert(Math.abs(d.a * (x + d.b) - (d.c * (x + d.d) + d.e)) < 1e-9);
  else assert(Math.abs((x + d.a) / d.pp - (x + d.b) / d.qq - d.r) < 1e-9);
};
V['eso3-ec-2grado'] = (ch, { assert }) => {
  const d = ch.data, r = ch.answer.value.map(fv);
  eqn(assert, new Set(r).size, 2);
  if (d.B !== undefined) r.forEach((x) => assert(Math.abs(d.a * x * x + d.B * x + d.C) < 1e-9));
  else if (d.a !== undefined) r.forEach((x) => assert(Math.abs(d.a * x * x - d.a * d.r * d.r) < 1e-9));
  else r.forEach((x) => assert(Math.abs(d.k * x * x - d.k * d.r * x) < 1e-9));
};
V['eso3-ec-discriminante'] = (ch, { assert }) => {
  const { a, b, c } = ch.data, v = Number(ch.answer.value);
  const t = 4 * a * c - b * b;                              // 4a·y_v, con y_v el valor del vértice
  const sgnV = Math.sign(t) * Math.sign(a);                 // signo de y_v
  const n = sgnV === 0 ? 1 : (a > 0 ? sgnV < 0 : sgnV > 0) ? 2 : 0;   // hay raíces si el vértice está al otro lado del eje que la apertura
  eqn(assert, v, n);
  // recuento numérico de cambios de signo
  let cambios = 0, prev = Math.sign(a * -50 * -50 + b * -50 + c);
  for (let x = -49.9; x <= 50; x += 0.1) { const s = Math.sign(a * x * x + b * x + c); if (s !== 0 && prev !== 0 && s !== prev) cambios++; if (s !== 0) prev = s; }
  if (v !== 1) eqn(assert, cambios, v === 2 ? 2 : 0);
};
V['eso3-ec-problema'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.n !== undefined && d.S !== undefined && d.x !== undefined) { let s = 0; for (let i = 0; i < d.n; i++) s += v + i; eqn(assert, s, d.S); }
  else if (d.madre !== undefined) eqn(assert, d.madre + v, d.k * (d.hij + v));
  else if (d.P !== undefined) eqn(assert, 2 * v + 2 * (v + d.k), d.P);
  else { eqn(assert, v * (v + d.k), d.A); assert(v > 0); }
};
// ---------- Tema 7 ----------
V['eso3-sis-resolver'] = (ch, { assert }) => {
  const { e } = ch.data, [x, y] = parts(ch);
  e.forEach(([a, b, c]) => eqn(assert, a * x + b * y, c));
  assert.notStrictEqual(e[0][0] * e[1][1] - e[1][0] * e[0][1], 0);
};
V['eso3-sis-clasificar'] = (ch, { assert }) => {
  const [[a1, b1, c1], [a2, b2, c2]] = ch.data.e, det = a1 * b2 - a2 * b1;
  const t = det !== 0 ? 0 : (a1 * c2 - a2 * c1 === 0 && b1 * c2 - b2 * c1 === 0 ? 1 : 2);
  eqn(assert, Number(ch.answer.value), t);
};
V['eso3-sis-problema'] = (ch, { assert }) => {
  const d = ch.data, [u, w] = parts(ch), has = (n) => ch.prompt.includes('$' + n + '$');
  if (d.ctx === 'entradas') { assert(has(u + w) && has(u * d.pa + w * d.pn) && has(d.pa) && has(d.pn)); }
  else if (d.ctx === 'animales') { assert(has(u + w) && has(2 * u + 4 * w)); }
  else if (d.ctx === 'mezcla') { assert(has(u + w) && has(u * d.pa + w * d.pb)); }
  else { assert(has(u + w) && has(u - w) && u > w); }
};

// ---------- Tema 8 ----------
V['eso3-pitagoras'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.tipo === 'hip') { assert(Math.abs(v - Math.hypot(d.a, d.b)) < 1e-9); }
  else if (d.tipo === 'cat') { assert(Math.abs(v * v + d.a * d.a - d.c * d.c) < 1e-9 && v === d.b); }
  else if (d.tipo === 'esc') { assert(Math.abs(v * v + d.x * d.x - d.z * d.z) < 1e-9 && v > 0); }
  else assert(Math.abs(v - Math.hypot(d.x, d.y)) < 1e-9);
  assert(Number.isInteger(v));
};
V['eso3-distancia'] = (ch, { assert }) => {
  const d = ch.data;
  if (d.tipo === 'dist') assert(Math.abs(fv(ch.answer.value) - Math.hypot(d.x2 - d.x1, d.y2 - d.y1)) < 1e-9);
  else if (d.tipo === 'medio') { const [x, y] = parts(ch); assert.strictEqual(x * 2, d.x1 + d.x2); assert.strictEqual(y * 2, d.y1 + d.y2); }
  else assert(Math.abs(fv(ch.answer.value) - (Math.abs(d.x2 - d.x1) + Math.abs(d.y2 - d.y1) + Math.hypot(d.x2 - d.x1, d.y2 - d.y1))) < 1e-9);
};
// Respuestas con π: [exacta, aproximada]; la aproximada es la exacta redondeada a 2 decimales.
const piPair = (ch, assert) => {
  const [e, a] = ch.answer.parts;
  assert.strictEqual(e.kind, 'pi'); assert(e.keypad, 'la casilla exacta lleva minitelado');
  assert(Math.abs(a.value - Math.round(e.value * 100) / 100) < 1e-9 && a.tol > 0.005 && a.tol < 0.0051);
  return e.value;
};
V['eso3-perimetros'] = (ch, { assert }) => {
  const d = ch.data;
  if (['rect', 'tri', 'trap', 'rombo'].includes(d.f)) {
    const v = fv(ch.answer.value);
    const exp = {
      rect: () => 2 * d.a + 2 * d.b,
      tri: () => d.x + d.y + Math.hypot(d.x, d.y),
      trap: () => d.B + d.b + 2 * Math.hypot(d.h, (d.B - d.b) / 2),
      rombo: () => 4 * Math.hypot(d.x, d.y),
    }[d.f]();
    return assert(Math.abs(v - exp) < 1e-9);
  }
  const v = piPair(ch, assert);
  const exp = { circ: () => 2 * Math.PI * d.r, arco: () => 2 * Math.PI * d.r * d.n / 360, sect: () => 2 * d.r + 2 * Math.PI * d.r * d.n / 360, semi: () => Math.PI * d.r + 2 * d.r }[d.f]();
  assert(Math.abs(v - exp) < 1e-9);
  assert(Math.abs(v - ((d.k.n !== undefined ? d.k.n / d.k.d : d.k) * Math.PI + d.c)) < 1e-9, 'k y c coherentes con la respuesta');
};
V['eso3-areas'] = (ch, { assert }) => {
  const d = ch.data;
  if (['tri', 'trap', 'rombo'].includes(d.f)) {
    const v = fv(ch.answer.value);
    return assert(Math.abs(v - { tri: () => d.b * d.h / 2, trap: () => (d.B + d.b) * d.h / 2, rombo: () => d.D * d.d / 2 }[d.f]()) < 1e-9);
  }
  const v = piPair(ch, assert);
  if (d.f === 'segm') {
    // integración numérica (punto medio) de la altura entre el arco y la cuerda, independiente de «sector − triángulo»
    const n = 200000; let A = 0;
    for (let i = 0; i < n; i++) { const x = (i + 0.5) * d.r / n; A += (Math.sqrt(d.r * d.r - x * x) - (d.r - x)) * d.r / n; }
    return assert(Math.abs(A - v) < 1e-4, 'segmento circular');
  }
  const exp = { circ: () => Math.PI * d.r * d.r, sect: () => Math.PI * d.r * d.r * (d.n / 360), corona: () => Math.PI * (d.R * d.R - d.r * d.r) }[d.f]();
  assert(Math.abs(v - exp) < 1e-9);
  // área del círculo por el límite de polígonos regulares inscritos (comprobación independiente de π r²)
  if (d.f === 'circ') { const n = 20000; const A = 0.5 * n * d.r * d.r * Math.sin(2 * Math.PI / n); assert(Math.abs(A - v) < 1e-3); }
};
V['eso3-problemas-areas'] = (ch, { assert }) => {
  const d = ch.data, a = ch.answer.value;
  const v = a.n !== undefined ? fv(a) : a;
  const exp = {
    valla: () => 2 * (d.a + d.b) * d.pr,
    pared: () => (d.w * d.h - d.vw * d.vh - 2) * d.pr,
    baldosas: () => (d.a * 100 / d.l) * (d.b * 100 / d.l),
    camino: () => { let c = 0; for (let x = 0; x < d.a + 2 * d.w; x++) for (let y = 0; y < d.b + 2 * d.w; y++) if (!(x >= d.w && x < d.a + d.w && y >= d.w && y < d.b + d.w)) c++; return c; },   // cuenta de cuadraditos de 1 m
    pista: () => 2 * d.L + Math.PI * (2 * d.r),
    fuente: () => Math.PI * (d.r + d.w) ** 2 - Math.PI * d.r ** 2,
    cesped: () => d.a * d.b - Math.PI * d.r ** 2,
  }[d.t]();
  if (['pista', 'fuente', 'cesped'].includes(d.t)) assert(Math.abs(v - Math.round(exp * 100) / 100) < 1e-9 && ch.answer.tol > 0, 'redondeo a 2 decimales');
  else assert(Math.abs(v - exp) < 1e-9 && Number.isInteger(v));
  if (d.t === 'cesped') assert(d.b >= 2 * d.r + 2, 'el parterre cabe en el jardín');
};
// ---------- Tema 9 ----------
V['eso3-movimientos'] = (ch, { assert }) => {
  const d = ch.data, [x, y] = parts(ch);
  const rot = (deg) => { const a = deg * Math.PI / 180; return [Math.round(d.x * Math.cos(a) - d.y * Math.sin(a)), Math.round(d.x * Math.sin(a) + d.y * Math.cos(a))]; };
  const exp = { tras: [d.x + d.a, d.y + d.b], g90: rot(90), g180: rot(180), sx: [d.x, -d.y], sy: [-d.x, d.y] }[d.mov];
  assert.deepStrictEqual([x + 0, y + 0], exp.map((n) => n + 0));
  if (d.mov !== 'tras') assert(Math.abs(Math.hypot(x, y) - Math.hypot(d.x, d.y)) < 1e-9, 'conserva la distancia al origen');
};
V['eso3-tales'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.h1) assert(Math.abs(v / fv(d.s2) - fv(d.h1) / fv(d.s1)) < 1e-9);
  else assert(Math.abs(v / d.b - fv(d.a2) / d.a) < 1e-9);
};
V['eso3-semejanza'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.tipo === 'area') assert.strictEqual(v, d.A * d.k * d.k);
  else if (d.tipo === 'vol') assert.strictEqual(v, d.V0 * Math.pow(d.k, 3));
  else if (d.tipo === 'razon') assert(Math.abs(v - d.A * (d.L / d.l) ** 2) < 1e-9);
  else { const real_cm = d.cm * d.E; assert(Math.abs(v * (d.val >= 1 && real_cm >= 100000 ? 100000 : 100) - real_cm) < 1e-6 * Math.max(1, real_cm)); }
};
// ---------- Tema 10 ----------
V['eso3-euler'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  assert.strictEqual(d.C + d.V, d.A + 2);
  assert.strictEqual(v, { C: d.C, V: d.V, A: d.A }[d.falta]);
  if (d.cuerpo === 'prisma') { assert.strictEqual(d.A, 3 * d.n); assert.strictEqual(d.A, (d.n * 2 + d.n * 4) / 2); }   // aristas = (suma de lados de las caras)/2
  else { assert.strictEqual(d.A, 2 * d.n); }
};
V['eso3-volumen'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  // integración numérica (suma de discos/secciones) del volumen
  const N = 20000, integ = (f, a, b) => { let s = 0; const h = (b - a) / N; for (let i = 0; i < N; i++) s += f(a + (i + 0.5) * h) * h; return s; };
  if (d.c === 'orto') assert.strictEqual(v, d.a * d.b * d.h);
  else if (d.c === 'pira') assert(Math.abs(v - integ((t) => Math.pow(d.l * t / d.h, 2), 0, d.h)) < 1e-3);
  else if (d.c === 'cil') assert(Math.abs(v * Math.PI - integ(() => Math.PI * d.r * d.r, 0, d.h)) < 1e-3);
  else if (d.c === 'cono') assert(Math.abs(v * Math.PI - integ((t) => Math.PI * Math.pow(d.r * t / d.h, 2), 0, d.h)) < 1e-3);
  else assert(Math.abs(v * Math.PI - integ((t) => Math.PI * (d.r * d.r - t * t), -d.r, d.r)) < 1e-3);
};
V['eso3-area-cuerpos'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.c === 'orto') assert.strictEqual(v, 2 * d.a * d.b + 2 * d.a * d.h + 2 * d.b * d.h);
  else if (d.c === 'cil') assert(Math.abs(v * Math.PI - (2 * Math.PI * d.r * d.h + 2 * Math.PI * d.r * d.r)) < 1e-9);
  else if (d.c === 'cono') { assert.strictEqual(d.g * d.g, d.r * d.r + d.h * d.h); assert(Math.abs(v * Math.PI - (Math.PI * d.r * d.g + Math.PI * d.r * d.r)) < 1e-9); }
  else if (d.c === 'pira') { assert.strictEqual(d.ap * d.ap, d.h * d.h + d.half * d.half); assert.strictEqual(v, 4 * (d.l * d.ap / 2) + d.l * d.l); }
  else assert(Math.abs(v - 4 * d.r * d.r) < 1e-9);
};

// ---------- Tema 11 ----------
V['eso3-fun-valor'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.tipo === 'lin') assert.strictEqual(v, d.m * d.a + d.n);
  else if (d.tipo === 'cuad') assert.strictEqual(v, d.A * Math.pow(d.a, 2) + d.B * d.a + d.C);
  else { assert(d.a + d.c !== 0); assert(Math.abs(v - d.k / (d.a + d.c)) < 1e-12); }
};
V['eso3-fun-dominio'] = (ch, { assert }) => {
  const d = ch.data, opts = ch.answer.options, i = Number(ch.answer.value);
  assert(opts.length === 4 && new Set(opts).size === 4);
  assert(opts[i].includes(d.correct));
  // comprobación numérica del dominio correcto
  const f = { rac: (x) => 1 / (x - d.a), raiz: (x) => Math.sqrt(x - d.a), rac2: null, pol: (x) => x }[d.t];
  if (d.t === 'rac') { assert(!Number.isFinite(f(d.a))); assert(Number.isFinite(f(d.a + 0.5))); }
  if (d.t === 'raiz') { assert(Number.isNaN(f(d.a - 0.5)) && !Number.isNaN(f(d.a))); }
  if (d.t === 'pol') assert(d.correct === '\\mathbb{R}');
};
V['eso3-fun-tvm'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.tipo === 'tabla') assert(Math.abs(v - (d.ys[d.j] - d.ys[d.i]) / (d.xs[d.j] - d.xs[d.i])) < 1e-12);
  else if (d.tipo === 'lin') { assert.strictEqual(v, d.m); assert(Math.abs(((d.m * d.b + d.n) - (d.m * d.a + d.n)) / (d.b - d.a) - v) < 1e-12); }
  else { const f = (x) => d.A * x * x + d.B * x + d.C; assert(Math.abs((f(d.b) - f(d.a)) / (d.b - d.a) - v) < 1e-12); }
};
V['eso3-fun-tabla'] = (ch, { assert }) => {
  const ys = ch.data.ys, d1 = ys.slice(1).map((v, i) => v - ys[i]), d2 = d1.slice(1).map((v, i) => v - d1[i]);
  const lineal = d1.every((v) => v === d1[0]);
  assert.strictEqual(Number(ch.answer.value), lineal ? 0 : 1);
  if (!lineal) assert(d2.every((v) => v === d2[0]) && d2[0] !== 0);
};
// ---------- Tema 12 ----------
V['eso3-recta'] = (ch, { assert }) => {
  const d = ch.data, [m, n] = parts(ch);
  if (d.tipo === 'dos') { assert.strictEqual(m * d.x1 + n, d.y1); assert.strictEqual(m * d.x2 + n, d.y2); assert.strictEqual(m, (d.y2 - d.y1) / (d.x2 - d.x1)); }
  else { assert.strictEqual(m * d.x1 + n, d.y1); assert.strictEqual(m, d.m); }
};
V['eso3-recta-cortes'] = (ch, { assert }) => {
  const { m, n } = ch.data, [yo, xo] = parts(ch);
  assert.strictEqual(yo, n);
  assert(Math.abs(m * xo + n) < 1e-9);
};
V['eso3-parabola'] = (ch, { assert }) => {
  const { a, b, c } = ch.data, [xv, yv] = parts(ch), f = (x) => a * x * x + b * x + c;
  assert.strictEqual(f(xv), yv);
  // es el extremo: los puntos vecinos están más abajo (a>0) o más arriba (a<0)
  [-2, -1, 1, 2].forEach((h) => assert(a > 0 ? f(xv + h) > yv : f(xv + h) < yv));
  assert.strictEqual(f(xv + 3), f(xv - 3));
};
V['eso3-parabola-cortes'] = (ch, { assert }) => {
  const { a, b, c } = ch.data, r = ch.answer.value.map(fv);
  r.forEach((x) => assert(Math.abs(a * x * x + b * x + c) < 1e-9));
  assert(r[0] !== r[1]);
};
V['eso3-recta-problema'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value), pr = fv(d.pr);
  if (d.tipo === 'coste') assert(Math.abs(v - (d.fijo + pr * d.x)) < 1e-9);
  else if (d.tipo === 'inversa') { assert(Math.abs(d.fijo + pr * v - fv(d.C)) < 1e-9); assert.strictEqual(v, d.x); }
  else assert(Math.abs(d.fijo + pr * v - fv(d.pr2) * v) < 1e-9 && v > 0);
};

// ---------- Tema 13 ----------
const med = (a) => { const s = a.slice().sort((x, y) => x - y), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
V['eso3-est-central'] = (ch, { assert }) => {
  const { d } = ch.data, [m, me, mo] = parts(ch);
  assert(Math.abs(m - d.reduce((s, x) => s + x, 0) / d.length) < 1e-12);
  assert.strictEqual(me, med(d));
  const cnt = (v) => d.filter((x) => x === v).length;
  assert(d.every((x) => cnt(x) <= cnt(mo)) && cnt(mo) >= 2);
};
V['eso3-est-tabla'] = (ch, { assert }) => {
  const { xs, fs, tipo } = ch.data, flat = [];
  xs.forEach((x, i) => { for (let k = 0; k < fs[i]; k++) flat.push(x); });
  if (tipo === 'media') assert(Math.abs(fv(ch.answer.value) - flat.reduce((s, x) => s + x, 0) / flat.length) < 1e-12);
  else { const [mo, me] = parts(ch); assert.strictEqual(me, med(flat)); const cnt = (v) => flat.filter((x) => x === v).length; assert(flat.every((x) => cnt(x) <= cnt(mo))); }
};
V['eso3-est-dispersion'] = (ch, { assert }) => {
  const d = ch.data;
  if (d.tipo === 'rango') {
    const [r, iqr] = parts(ch), s = d.d.slice().sort((a, b) => a - b), n = s.length;
    assert.strictEqual(r, Math.max(...s) - Math.min(...s));
    const q1 = med(s.slice(0, n / 2)), q3 = med(s.slice(n / 2));
    assert.strictEqual(iqr, q3 - q1);
    assert(iqr >= 0);
  } else {
    const n = d.d.length, m = d.d.reduce((s, x) => s + x, 0) / n;
    const v2 = d.d.reduce((s, x) => s + x * x, 0) / n - m * m;        // fórmula alternativa: media de cuadrados menos cuadrado de la media
    assert(Math.abs(fv(ch.answer.value) - v2) < 1e-9);
  }
};
V['eso3-est-frecuencias'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  assert(d.f > 0 && d.f < d.N);
  if (d.tipo === 'rel') assert(Math.abs(v - d.f / d.N) < 1e-12);
  else if (d.tipo === 'pct') assert(Math.abs(v - 100 * d.f / d.N) < 1e-9);
  else assert(Math.abs(v - 360 * d.f / d.N) < 1e-9);
};
// ---------- Tema 14 ----------
const prod = (a, b) => { const out = []; a.forEach((x) => b.forEach((y) => out.push([x, y]))); return out; };
V['eso3-prob-laplace'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.exp === 'dados') { const todos = prod([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6]); assert(Math.abs(v - todos.filter(([a, b]) => a + b === d.S).length / todos.length) < 1e-12); }
  else if (d.exp === 'dado') assert(Math.abs(v - d.fav / 6) < 1e-12 && d.tot === 6);
  else if (d.exp === 'baraja') {
    const baraja = []; ['o', 'c', 'e', 'b'].forEach((p) => { for (let n = 1; n <= 10; n++) baraja.push([p, n]); });   // 1 = as, 8 = sota, 9 = caballo, 10 = rey
    const pr = ch.prompt;
    const cond = pr.includes('un as') && !pr.includes('rey') ? (c) => c[1] === 1 : pr.includes('de oros') ? (c) => c[0] === 'o' : pr.includes('figura') ? (c) => c[1] >= 8 : pr.includes('rey o un as') ? (c) => c[1] === 10 || c[1] === 1 : (c) => c[0] !== 'e';
    assert(Math.abs(v - baraja.filter(cond).length / 40) < 1e-12);
  } else { assert.strictEqual(d.tot, d.r + d.a + d.v); assert(Math.abs(v - d.fav / d.tot) < 1e-12); }
};
V['eso3-prob-union'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value), c = (x) => x / 100;
  // construimos un espacio de 100 casos que cumpla los datos y contamos
  const A = d.pa, B = d.pb, I = d.pi;
  const U = A + B - I;
  assert(I <= Math.min(A, B) && U <= 100);
  if (d.tipo === 'union') assert(Math.abs(v - c(U)) < 1e-12);
  else if (d.tipo === 'ninguno') assert(Math.abs(v - c(100 - U)) < 1e-12);
  else assert(Math.abs(v - c(I)) < 1e-12);
};
V['eso3-prob-compuesta'] = (ch, { assert }) => {
  const { r, a, con, dos } = ch.data, v = fv(ch.answer.value);
  const bolsa = Array(r).fill('R').concat(Array(a).fill('A')), t = r + a;
  let fav = 0, tot = 0;
  for (let i = 0; i < t; i++) for (let j = 0; j < t; j++) {
    if (!con && i === j) continue;
    tot++;
    const same = bolsa[i] === bolsa[j];
    if (dos ? (bolsa[i] === 'R' && bolsa[j] === 'R') : !same) fav++;
  }
  assert(Math.abs(v - fav / tot) < 1e-12);
};
V['eso3-prob-recuento'] = (ch, { assert }) => {
  const d = ch.data, v = fv(ch.answer.value);
  if (d.tipo === 'mult') { let n = 0; for (let i = 0; i < d.a; i++) for (let j = 0; j < d.b; j++) for (let k = 0; k < d.c; k++) n++; assert.strictEqual(v, n); }
  else if (d.tipo === 'rep') { let n = 0; const rec = (k) => { if (k === d.k) { n++; return; } for (let c = 1; c <= d.n; c++) rec(k + 1); }; rec(0); assert.strictEqual(v, n); }
  else if (d.tipo === 'sinrep') { let n = 0; const rec = (k, used) => { if (k === d.k) { n++; return; } for (let c = 1; c <= d.n; c++) if (!used.includes(c)) rec(k + 1, used.concat(c)); }; rec(0, []); assert.strictEqual(v, n); }
  else { let fav = 0; const tot = 1 << d.k; for (let m = 0; m < tot; m++) { const caras = [...Array(d.k).keys()].filter((i) => (m >> i) & 1).length; if (d.j === 'todas caras' ? caras === d.k : d.j === 'ninguna cara' ? caras === 0 : caras < d.k) fav++; } assert(Math.abs(v - fav / tot) < 1e-12); }
};

module.exports = V;
