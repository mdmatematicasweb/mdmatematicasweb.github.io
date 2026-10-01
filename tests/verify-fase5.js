// Verificadores independientes de tipos-fase5.js (probabilidad). Recalculan todo desde ex.data.
module.exports = (() => {
  // Φ por integración de Simpson (independiente de la serie del generador), redondeada a 4 decimales como la tabla.
  const phi = (t) => Math.exp(-t * t / 2) / Math.sqrt(2 * Math.PI);
  const PhiPos = (z) => { const n = 4000, h = z / n; let s = phi(0) + phi(z); for (let i = 1; i < n; i++) s += phi(i * h) * (i % 2 ? 4 : 2); return 0.5 + s * h / 3; };
  const T = (z) => (z >= 0 ? Math.round(PhiPos(z) * 1e4) / 1e4 : Math.round((1 - Math.round(PhiPos(-z) * 1e4) / 1e4) * 1e4) / 1e4);
  const zz = (x, mu, sg) => Math.round(((x - mu) / sg) * 100) / 100;
  const pLT = (z) => T(z), pGT = (z) => T(-z);
  const pOp = (op, z) => (op === 'lt' ? pLT(z) : pGT(z));
  const r4 = (x) => Math.round(x * 1e4) / 1e4;
  const sgn = (op) => (op === 'lt' ? '<' : '>');

  return {
    'prob-total-bayes'(ex, { assert, near, num }) {
      const { pri, q, k, j, partC } = ex.data;
      assert.strictEqual(pri.reduce((s, x) => s + x, 0), 100);
      const P = pri.map((x) => x / 100), Q = q.map((x) => x / 100);
      const pE = P.reduce((s, x, i) => s + x * Q[i], 0);
      assert(near(num(ex.partes[0].answer.value), pE), 'P total');
      // Bayes comprobado por probabilidad conjunta sobre una población de 1e6
      const N = 1e6, conj = P.map((x, i) => N * x * Q[i]);
      const bay = conj[k] / conj.reduce((s, x) => s + x, 0);
      assert(near(ex.partes[1].answer.value, bay, 1e-9), 'Bayes');
      if (partC) assert(near(num(ex.partes[2].answer.value), P[j] * (1 - Q[j])), 'P(noE y Cj)');
      else assert(near(ex.partes[2].answer.value, P[j] * (1 - Q[j]) / (1 - pE), 1e-9), 'P(Cj|noE)');
      // la tabla de contingencia debe cuadrar
      assert(near(conj.reduce((s, x) => s + x, 0) + P.reduce((s, x, i) => s + N * x * (1 - Q[i]), 0), N));
    },
    'prob-tablas'(ex, { assert, near, num }) {
      const { nAB, nAb, naB, nab, askA, indep } = ex.data;
      assert.strictEqual(nAB + nAb + naB + nab, 100);
      assert([nAB, nAb, naB, nab].every((x) => x > 0));
      const pAB = nAB / 100, pA = (nAB + nAb) / 100, pB = (nAB + naB) / 100, pU = pA + pB - pAB;
      const [a, b, c, d] = ex.partes.map((p) => p.answer);
      const which = ex.partes[0].texto.includes('\\cap') ? 'cap' : 'cup';
      assert(near(num(a.value), which === 'cap' ? pAB : pU), 'primer apartado');
      assert(near(b.value, askA ? pAB / pB : pAB / pA, 1e-9), 'condicionada');
      assert(near(num(c.value), 1 - pU), 'P(no A y no B)');
      assert.strictEqual(d.value, Math.abs(pAB - pA * pB) < 1e-12 ? 0 : 1);
      assert.strictEqual(indep, d.value === 0);
      // los datos del enunciado son coherentes con la tabla
      const m = ex.enunciado.match(/P\([^=]*\)=\d+(?:\{,\}\d+)?/g);
      assert(m && m.length === 3);
    },
    'normal-prob'(ex, { assert }) {
      const { mu, sigma, a, b, c, opA, opC, n } = ex.data;
      assert(ex.enunciado.includes('<details class="mdx-tabla">') && !ex.enunciado.includes('$'), 'tabla');
      assert.strictEqual((ex.enunciado.match(/<tr>/g) || []).length, 32);
      const za = zz(a, mu, sigma), zb = zz(b, mu, sigma), zc = zz(c, mu, sigma);
      const [A, B, C] = ex.partes.map((p) => p.answer.value);
      assert(Math.abs(A - pOp(opA, za)) < 1e-9, 'P(X ' + sgn(opA) + ' a)');
      assert(Math.abs(B - r4(T(zb) - T(za))) < 1e-9, 'P(a<X<b)');
      assert.strictEqual(C, Math.round(n * pOp(opC, zc)));
      // contraste con la distribución exacta (sin redondeos): diferencia pequeña
      const exact = (x) => { const z = (x - mu) / sigma; return z >= 0 ? PhiPos(z) : 1 - PhiPos(-z); };
      assert(Math.abs(A - (opA === 'lt' ? exact(a) : 1 - exact(a))) < 0.01);
      assert(Math.abs(B - (exact(b) - exact(a))) < 0.01);
    },
    'normal-desconocido'(ex, { assert }) {
      const d = ex.data;
      assert(ex.enunciado.includes('<details class="mdx-tabla">') && !ex.enunciado.includes('$'), 'tabla');
      const [A, B, K] = ex.partes.map((p) => p.answer.value);
      const mu = d.variante === 'mu' ? A : d.mu, sg = d.variante === 'mu' ? d.sigma : A;
      assert(sg > 0);
      // con la respuesta, la probabilidad dada se reproduce exactamente con la tabla
      assert(Math.abs(pOp(d.op1, zz(d.a, mu, sg)) - d.p1) < 1e-9, 'p1 reproducida');
      assert(Math.abs(B - pOp(d.op2, zz(d.b, mu, sg))) < 1e-9, 'P(X ? b)');
      // k: P(X op k) = pk con la tabla
      assert(Math.abs(pOp(d.opk, zz(K, mu, sg)) - d.pk) < 1e-9, 'k reproduce pk');
      // y la búsqueda inversa por fuerza bruta en la tabla da el mismo z
      let best = null;
      for (let z = -3.09; z < 3.095; z += 0.01) { const zr = Math.round(z * 100) / 100; if (Math.abs(pOp(d.op1, zr) - d.p1) < 1e-9) best = zr; }
      assert(best !== null && Math.abs(best - (d.a - mu) / sg) < 1e-6, 'z inverso');
    },
  };
})();
