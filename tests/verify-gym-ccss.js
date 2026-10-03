// Verificadores independientes de los módulos propios del curso CCSS (assets/gym/ccss-*.js).
// Cada función recibe el reto y recalcula la respuesta con otro método (enteros, fuerza bruta, otra fórmula).
const fval = (f) => f.n / f.d;
const near = (a, b, e = 1e-9) => Math.abs(a - b) < e;

// ---------- Álgebra (temas 1-3) ----------
const mulI = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const sat = (cons, x, y) => cons.every((k) => (k.op === '<=' ? k.a * x + k.b * y <= k.c : k.a * x + k.b * y >= k.c)) && x >= 0 && y >= 0;
/** Vértices enteros por fuerza bruta: puntos de la malla de la región que cumplen con igualdad al menos dos restricciones independientes. */
function latticeVertices(cons, top = 60) {
  const all = cons.concat([{ a: 1, b: 0, c: 0 }, { a: 0, b: 1, c: 0 }]);
  const out = [];
  for (let x = 0; x <= top; x++) for (let y = 0; y <= top; y++) {
    if (!sat(cons, x, y)) continue;
    const tight = all.filter((k) => k.a * x + k.b * y === k.c);
    let indep = false;
    for (let i = 0; i < tight.length && !indep; i++) for (let j = i + 1; j < tight.length; j++) if (tight[i].a * tight[j].b - tight[j].a * tight[i].b !== 0) { indep = true; break; }
    if (indep) out.push([x, y]);
  }
  return out;
}
const latticeOpt = (cons, p, q, kind, top = 80) => {
  let best = null, at = null, count = 0;
  for (let x = 0; x <= top; x++) for (let y = 0; y <= top; y++) {
    if (!sat(cons, x, y)) continue;
    const v = p * x + q * y;
    if (best === null || (kind === 'max' ? v > best : v < best)) { best = v; at = [x, y]; count = 1; } else if (v === best) count++;
  }
  return { best, at, count };
};

module.exports = {
  'ccss-mat-contexto': (ch, { assert }) => {
    const d = ch.data;
    if (d.tipo === 'ventas') {
      const R = mulI(d.V, d.p.map((x) => [x])).map((r) => r[0]);
      assert(ch.answer.value.every((r, i) => near(fval(r[0]), R[i])));
    } else if (d.tipo === 'coste') {
      const R = mulI(d.A, d.q.map((x) => [x])).map((r) => r[0]);
      assert(ch.answer.value.every((r, i) => near(fval(r[0]), R[i])));
    } else {
      // r·A·q multiplicando en el otro orden: (r·A)·q
      const rA = mulI([d.r], d.A)[0];
      assert(near(fval(ch.answer.value), rA[0] * d.q[0] + rA[1] * d.q[1]));
    }
  },
  'ccss-sis-matricial': (ch, { assert }) => {
    const { A, B } = ch.data;
    const X = ch.answer.value.map((r) => fval(r[0]));
    assert(X.every((x) => Number.isInteger(x) && x >= 1));
    assert(A.every((r, i) => near(r.reduce((s, a, k) => s + a * X[k], 0), B[i])), 'AX = B');
    const d = A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
    assert(d !== 0 && Math.abs(d) <= 9);
  },
  'ccss-pl-vertices': (ch, { assert }) => {
    const { cons, V } = ch.data;
    const bruto = latticeVertices(cons).sort((u, v) => (u[0] - v[0]) || (u[1] - v[1]));
    const resp = ch.answer.value.map((r) => [fval(r[0]), fval(r[1])]);
    assert(JSON.stringify(bruto) === JSON.stringify(resp), 'vértices ' + JSON.stringify(bruto) + ' vs ' + JSON.stringify(resp));
    assert(JSON.stringify(V) === JSON.stringify(resp));
  },
  'ccss-pl-optimo': (ch, { assert }) => {
    const d = ch.data;
    const o = latticeOpt(d.cons, d.p, d.q, d.tipo);
    assert(o.count === 1, 'óptimo único');
    const [x, y, f] = ch.answer.parts.map((q) => fval(q.value));
    assert(x === o.at[0] && y === o.at[1] && f === o.best, 'óptimo ' + JSON.stringify(o) + ' vs ' + [x, y, f]);
  },
  'ccss-pl-problema': (ch, { assert }) => {
    const d = ch.data;
    const o = latticeOpt(d.cons, d.p, d.q, d.tipo);
    assert(o.count === 1);
    const [x, y, f] = ch.answer.parts.map((q) => fval(q.value));
    assert(x === o.at[0] && y === o.at[1] && f === o.best);
    d.cons.forEach((k) => assert(ch.prompt.includes(String(k.c)) || k.b === 0 || k.a === 0, 'falta c=' + k.c + ' en el enunciado'));
  },
};
