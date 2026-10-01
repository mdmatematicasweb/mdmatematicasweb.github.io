// Verificadores independientes de assets/gym/distribuciones.js.
// Φ por integración de Simpson (independiente de la serie del generador), tabla a 4 decimales y z a centésimas.
const phi = (t) => Math.exp(-t * t / 2) / Math.sqrt(2 * Math.PI);
const PhiPos = (z) => { const n = 4000, h = z / n; let s = phi(0) + phi(z); for (let i = 1; i < n; i++) s += phi(i * h) * (i % 2 ? 4 : 2); return 0.5 + s * h / 3; };
const r4 = (x) => Math.round(x * 1e4) / 1e4;
const T = (z) => (z >= 0 ? r4(PhiPos(z)) : r4(1 - r4(PhiPos(-z))));
const zz = (x, mu, sg) => Math.round(((x - mu) / sg) * 100) / 100;
const v = (ch) => ch.answer.value;
const fval = (f) => f.n / f.d;
// distribución binomial por convolución de pruebas de Bernoulli
const binomDist = (n, p) => { let d = [1]; for (let i = 0; i < n; i++) { const e = new Array(d.length + 1).fill(0); d.forEach((x, k) => { e[k] += x * (1 - p); e[k + 1] += x * p; }); d = e; } return d; };

module.exports = {
  'dis-binom': (ch, { assert }) => {
    const { n, pn, pd, S } = ch.data;
    const d = binomDist(n, pn / pd);
    assert(Math.abs(v(ch) - S.reduce((s, k) => s + d[k], 0)) < 1e-12);
    assert(Math.abs(d.reduce((s, x) => s + x, 0) - 1) < 1e-12);
  },
  'dis-binompar': (ch, { assert }) => {
    const d = ch.data;
    if (d.caso === 'inv') {
      const [N, P] = ch.answer.parts.map((x) => fval(x.value));
      assert(Number.isInteger(N) && P > 0 && P < 1);
      assert(Math.abs(N * P - d.mu) < 1e-9 && Math.abs(Math.sqrt(N * P * (1 - P)) - d.s) < 1e-9);
    } else {
      // media y varianza a partir de la distribución completa
      const dist = binomDist(d.n, d.pn / d.pd);
      const mu = dist.reduce((s, x, k) => s + k * x, 0), va = dist.reduce((s, x, k) => s + k * k * x, 0) - mu * mu;
      assert(Math.abs(fval(ch.answer.parts[0].value) - mu) < 1e-9);
      assert(Math.abs(ch.answer.parts[1].value - Math.sqrt(va)) < 1e-9);
    }
  },
  'dis-tipif': (ch, { assert }) => {
    const d = ch.data;
    if (d.dir === 'z') { assert(Math.abs(fval(v(ch)) - (d.x - d.mu) / d.sg) < 1e-12); assert(Math.abs(fval(v(ch)) * 100 - Math.round(fval(v(ch)) * 100)) < 1e-9); }
    else assert(Math.abs(fval(v(ch)) - (d.mu + d.z * d.sg)) < 1e-9 && Number.isInteger(fval(v(ch))));
  },
  'dis-tabla': (ch, { assert }) => {
    const d = ch.data;
    const exp = d.tipo === 'lt' ? T(d.z) : d.tipo === 'gt' ? r4(1 - T(d.z)) : r4(T(d.b) - T(d.a));
    assert(Math.abs(v(ch) - exp) < 1e-9, 'tabla ' + exp + ' vs ' + v(ch));
    // sanidad: la tabla da Φ(0)=0,5 y Φ(1)=0,8413
    assert(T(0) === 0.5 && T(1) === 0.8413 && T(-1) === 0.1587);
  },
  'dis-normal': (ch, { assert }) => {
    const d = ch.data;
    const exp = d.tipo === 'lt' ? T(zz(d.a, d.mu, d.sg)) : d.tipo === 'gt' ? r4(1 - T(zz(d.a, d.mu, d.sg))) : r4(T(zz(d.b, d.mu, d.sg)) - T(zz(d.a, d.mu, d.sg)));
    assert(Math.abs(v(ch) - exp) < 1e-9, 'normal ' + exp + ' vs ' + v(ch));
    // el z debe ser exactamente de 2 decimales (sin redondeo en la tipificación)
    assert(Math.abs((d.a - d.mu) / d.sg * 100 - Math.round((d.a - d.mu) / d.sg * 100)) < 1e-9);
  },
  'dis-inversa': (ch, { assert }) => {
    const d = ch.data;
    // tabla inversa independiente: z de la tabla más cercano a la probabilidad (de Φ<z)
    const target = d.lado === 'lt' ? d.prob : r4(1 - d.prob);
    let best = 0, err = 9;
    for (let k = 0; k <= 309; k++) { const e = Math.abs(T(k / 100) - target); if (e < err - 1e-12) { err = e; best = k / 100; } }
    assert(err < 1e-9, 'p no está en la tabla');
    assert(Math.abs(best - d.z) < 1e-9, 'z inverso ' + best + ' vs ' + d.z);
    // la respuesta satisface la ecuación tipificada
    const ans = fval(v(ch));
    if (d.inc === 'x') assert(Math.abs((ans - d.mu) / d.sg - best) < 1e-9);
    else if (d.inc === 'mu') assert(Math.abs((d.a - ans) / d.sg - best) < 1e-9);
    else assert(Math.abs((d.a - d.mu) / ans - best) < 1e-9);
    assert(Math.abs(d.a * 100 - Math.round(d.a * 100)) < 1e-9);
  },
  'dis-aprox': (ch, { assert }) => {
    const d = ch.data;
    const mu = d.n * d.pn / d.pd, sg = Math.sqrt(d.n * d.pn * (d.pd - d.pn) / d.pd / d.pd * 1);
    assert(Math.abs(mu - d.mu) < 1e-9 && Math.abs(sg - d.sg) < 1e-9);
    assert(mu >= 5 && d.n - mu >= 5);
    let lo = -Infinity, hi = Infinity;
    if (d.tipo === 'le') hi = d.k + 0.5; else if (d.tipo === 'ge') lo = d.k - 0.5;
    else if (d.tipo === 'eq') { lo = d.k - 0.5; hi = d.k + 0.5; } else { lo = d.a - 0.5; hi = d.b + 0.5; }
    const Pz = (x) => (x === Infinity ? 1 : x === -Infinity ? 0 : T(zz(x, mu, sg)));
    assert(Math.abs(v(ch) - r4(Pz(hi) - Pz(lo))) < 1e-9);
    // la aproximación debe estar cerca de la binomial exacta (comprobación de que se aplica la corrección)
    const dist = binomDist(d.n, d.pn / d.pd);
    let ex = 0;
    for (let k = 0; k <= d.n; k++) { const inside = d.tipo === 'le' ? k <= d.k : d.tipo === 'ge' ? k >= d.k : d.tipo === 'eq' ? k === d.k : k >= d.a && k <= d.b; if (inside) ex += dist[k]; }
    assert(Math.abs(v(ch) - ex) < 0.01, 'aprox ' + v(ch) + ' lejos de exacto ' + ex);
  },
};
