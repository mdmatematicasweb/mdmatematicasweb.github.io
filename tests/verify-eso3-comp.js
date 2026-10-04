// Verificadores independientes de las situaciones competenciales de 3º ESO (assets/gym/tipos-eso3.js).
// Cada función recibe el ejercicio generado y recalcula las respuestas de los cuatro apartados con otro método.
const fv = (f) => f.n / f.d;
const val = (a) => (a.kind === 'number' ? fv(a.value) : a.kind === 'multi' ? a.parts.map(val) : a.value);
const med = (a) => { const s = a.slice().sort((x, y) => x - y), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const V = {};
/** Compara las respuestas esperadas con las del ejercicio; las aproximadas (expr) se redondean a nd decimales. */
function comparar(ex, esperado, { assert }, nds) {
  assert.strictEqual(ex.partes.length, 4);
  esperado.forEach((e, i) => {
    const a = ex.partes[i].answer;
    if (a.kind === 'expr') { const nd = (nds || {})[i]; assert(nd !== undefined, 'apartado ' + i + ': falta el número de decimales'); assert(Math.abs(a.value - Math.round(e * Math.pow(10, nd)) / Math.pow(10, nd)) < 1e-9, 'apartado ' + i + ': ' + a.value + ' vs ' + e); }
    else assert(Math.abs(val(a) - e) < 1e-9, 'apartado ' + i + ': ' + val(a) + ' vs ' + e);
  });
}
const en = (ex, n, { assert }) => assert(ex.enunciado.includes('$' + String(n).replace('.', '{,}') + '$') || ex.enunciado.includes(String(n).replace('.', '{,}')), 'el enunciado no contiene ' + n);

V.oferta = (ex, c) => { const d = ex.data; comparar(ex, [d.uA / 100, d.uB / 100, d.N * Math.abs(d.uA - d.uB) / 100, d.PC * (100 - d.r) / 10000], c); c.assert.strictEqual(d.PC, d.uA <= d.uB ? d.nA * d.uA : d.nB * d.uB); };
V.factura = (ex, c) => { const d = ex.data; comparar(ex, [d.n * d.p, d.n * d.p * d.d / 100, d.n * d.p * (100 - d.d) / 100 * 21 / 100, d.n * d.p * (100 - d.d) * 121 / 10000], c); en(ex, d.n, c); };
V.ahorro = (ex, c) => { const d = ex.data; let S = 0, a = d.a1; for (let i = 0; i < d.n; i++) { S += a; a += d.dd; } comparar(ex, [a - d.dd, S, d.obj - S, d.C * Math.pow(1 + d.r / 100, d.t)], c); c.assert(d.obj > S); };
V.receta = (ex, c) => { const d = ex.data; comparar(ex, [d.h * d.P1 / d.p0, d.az * d.P1 / d.p0, d.cx * d.E / 100, d.cx * d.E / 100 * d.cy * d.E / 100], c); };
V.tarifas = (ex, c) => { const d = ex.data; let x = 0; while (d.cuota + d.pa * x !== d.pb * x) x++; comparar(ex, [d.cuota + d.pa * d.n0, d.pb * d.n0, x, Math.abs((d.cuota + d.pa * d.nMas) - d.pb * d.nMas)], c); };
V.edades = (ex, c) => { const d = ex.data; let t = -1; for (let k = 1; k < d.H; k++) if (d.Pd - k === 3 * (d.H - k)) t = k; comparar(ex, [d.H, d.Pd, t, d.f], c); c.assert.strictEqual(d.H + d.Pd, d.S); };
V.parcela = (ex, c) => { const d = ex.data; let w = 0; for (let x = 1; x < 200; x++) if (x * (x + d.k) === d.A) w = x; comparar(ex, [w, w + d.k, 2 * (2 * w + d.k), 2 * (2 * w + d.k) * d.pm], c); };
V.mezcla = (ex, c) => { const d = ex.data; let a = -1; for (let x = 0; x <= d.T; x++) if (d.pa * x + d.pb * (d.T - x) === d.TP) a = x; comparar(ex, [a, d.T - a, d.TP / d.T, (d.T - a) / d.T * 100], c, { 2: 2, 3: 0 }); };
V.rampa = (ex, c) => { const d = ex.data; const R = Math.hypot(d.h, d.L); comparar(ex, [R, d.h + d.L + R, d.h * d.L / 2, d.h * d.L / 2 * d.pm], c); c.assert(Number.isInteger(R * 2)); };
V.deposito = (ex, c) => { const d = ex.data; const Vl = Math.PI * d.r * d.r * d.h; comparar(ex, [Vl, Vl / d.q, 2 * Math.PI * d.r * d.h / 100, 0.8 * Vl], c, { 0: 0, 1: 1, 2: 2, 3: 0 }); };
V.maqueta = (ex, c) => { const d = ex.data; comparar(ex, [d.L * d.E / 100, d.H * d.E / 100, d.L * d.E / 100 * d.W * d.E / 100, d.E * d.E], c); };
V.mapa = (ex, c) => { const d = ex.data; comparar(ex, [Math.hypot(d.x2 - d.x1, d.y2 - d.y1), (d.x1 + d.x2) / 2, (d.y1 + d.y2) / 2, fv(d.ph) * fv(d.sa) / fv(d.ps)], c); };
V.lanzamiento = (ex, c) => { const d = ex.data; const h = (t) => -5 * t * t + d.v0 * t; let tm = 0, best = -1; for (let t = 0; t <= 20; t += 0.5) if (h(t) > best) { best = h(t); tm = t; } let tf = 0; for (let t = 0.5; t <= 20; t += 0.5) if (h(t) === 0) { tf = t; break; } comparar(ex, [h(d.t1), tm, best, tf], c); };
V.coste = (ex, c) => { const d = ex.data; let xe = 0; while (d.p * xe - d.cf - d.cv * xe < 0) xe++; c.assert.strictEqual(d.p * xe - d.cf - d.cv * xe, 0); comparar(ex, [d.cf + d.cv * d.x0, d.p * d.x0 - d.cf - d.cv * d.x0, xe, d.p * d.x2 - d.cf - d.cv * d.x2], c); };
V.tabla = (ex, c) => { const d = ex.data; comparar(ex, [Math.max(...d.ys), d.ys.indexOf(Math.min(...d.ys)), (d.ys[d.j] - d.ys[d.i]) / (d.j - d.i), d.ys.reduce((s, y) => s + y, 0) / 5], c); };
V.ingresos = (ex, c) => { const d = ex.data; const I = (p) => p * (d.a - d.b * p); let pm = 0, best = -1; for (let p = 0; p <= d.a / d.b; p++) if (I(p) > best) { best = I(p); pm = p; } comparar(ex, [d.a - d.b * d.p1, I(d.p1), pm, best], c); };
V.encuesta = (ex, c) => { const d = ex.data; const cnt = (x) => d.d.filter((y) => y === x).length; const mo = [...new Set(d.d)].sort((a, b) => cnt(b) - cnt(a))[0]; comparar(ex, [d.d.reduce((s, x) => s + x, 0) / d.d.length, med(d.d), mo, Math.max(...d.d) - Math.min(...d.d)], c); };
V.frecuencias = (ex, c) => { const d = ex.data; c.assert.strictEqual(d.c.reduce((s, x) => s + x, 0), d.N); comparar(ex, [d.c[0] * 100 / d.N, d.c[2] / d.N, 360 * d.c[1] / d.N, d.c[0] - d.c[3]], c); };
V.bolsa = (ex, c) => { const d = ex.data; const bolsa = [].concat(Array(d.r).fill('r'), Array(d.a).fill('a'), Array(d.v).fill('v')); const P = (f) => bolsa.filter(f).length / bolsa.length; let x = 0; while ((d.r + x) / (bolsa.length + x) !== 0.5 && x < 100) x++; comparar(ex, [P((b) => b === 'r'), P((b) => b !== 'v'), P((b) => b === 'a' || b === 'v'), x], c); };
V.urnas = (ex, c) => { const d = ex.data; const bolsa = [].concat(Array(d.r).fill('r'), Array(d.a).fill('a')), n = bolsa.length; let rrC = 0, rrS = 0, dif = 0, totS = 0; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { if (bolsa[i] === 'r' && bolsa[j] === 'r') rrC++; if (i !== j) { totS++; if (bolsa[i] === 'r' && bolsa[j] === 'r') rrS++; if (bolsa[i] !== bolsa[j]) dif++; } } comparar(ex, [rrC / (n * n), rrS / totS, dif / totS, totS], c); };

module.exports = V;
