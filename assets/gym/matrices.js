/* Ejercicios interactivos — 2º Bachillerato, tema 1: Matrices.
 * Cada generador devuelve {prompt, answer, steps, data}. `data` sólo lo usan los tests.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, M, mI, mmul, mpow, madd, msub, mT, det, cofactors, inverse, rankOf, meq,
    ftex, ftexp, mtex, mtexStr, d$, i$, minorM } = G;
  const gcd = G.gcd;

  const randMat = (r, c, lo, hi) => M(Array.from({ length: r }, () => Array.from({ length: c }, () => rnd.int(lo, hi))));
  const num = (A) => A.map((r) => r.map((x) => x.n));          // matriz de enteros
  const signed = (k, first) => (k < 0 ? '-' : first ? '' : '+');

  /** Matriz entera con det = ±1 (inversa entera), sin ser diagonal ni de permutación. */
  function unimodular(n, maxAbs) {
    maxAbs = maxAbs || 6;
    for (;;) {
      const A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
      const ops = n === 2 ? rnd.int(2, 3) : rnd.int(3, 5);
      for (let k = 0; k < ops; k++) {
        const i = rnd.int(0, n - 1);
        let j = rnd.int(0, n - 1);
        if (j === i) j = (j + 1) % n;
        const c = rnd.pick([-2, -1, 1, 2]);
        for (let t = 0; t < n; t++) A[i][t] += c * A[j][t];
      }
      if (rnd.int(0, 9) < 4) { const i = rnd.int(0, n - 1); A[i] = A[i].map((x) => -x); }
      if (rnd.int(0, 9) < 3) { const i = rnd.int(0, n - 1); const j = (i + 1) % n; [A[i], A[j]] = [A[j], A[i]]; }
      const off = A.reduce((s, r, i) => s + r.filter((x, j) => i !== j && x !== 0).length, 0);
      const big = Math.max(...A.map((r) => Math.max(...r.map(Math.abs))));
      if (off >= 2 && big <= maxAbs) return M(A);
    }
  }

  /* ---------- Pasos reutilizables ---------- */
  function invSteps(A, name) {
    name = name || 'A';
    const n = A.length;
    const d = det(A);
    const cof = cofactors(A);
    const inv = inverse(A);
    const adjT = mT(cof);
    return [
      'Calculamos el determinante: ' + d$('|' + name + '|=' + mtex(A, 'vmatrix') + '=' + ftex(d)) + 'Como es distinto de 0, existe la inversa.',
      'Matriz de adjuntos (cada elemento es $(-1)^{i+j}$ por el determinante del menor que queda al quitar su fila y su columna): ' +
        d$('\\operatorname{Adj}(' + name + ')=' + mtex(cof)),
      'Trasponemos la matriz de adjuntos: ' + d$('\\operatorname{Adj}(' + name + ')^{t}=' + mtex(adjT)),
      'Dividimos entre el determinante: ' + d$(name + '^{-1}=\\frac{1}{|' + name + '|}\\operatorname{Adj}(' + name + ')^{t}=' + (d.n === 1 && d.d === 1 ? '' : d.n === -1 && d.d === 1 ? '-' : '\\frac{1}{' + ftex(d) + '}') + mtex(adjT) + '=' + mtex(inv)),
    ];
  }

  /** Elimina por Gauss con operaciones enteras. Devuelve pasos [{ops, M}] y el rango. */
  function gaussSteps(A0) {
    const B = A0.map((r) => r.map((x) => x.n));
    const nr = B.length, nc = B[0].length;
    const out = [];
    let pr = 0;
    for (let c = 0; c < nc && pr < nr; c++) {
      let p = -1;
      for (let i = pr; i < nr; i++) if (B[i][c] !== 0 && (p < 0 || Math.abs(B[i][c]) < Math.abs(B[p][c]))) p = i;
      if (p < 0) continue;
      const ops = [];
      if (p !== pr) { [B[pr], B[p]] = [B[p], B[pr]]; ops.push('F_' + (pr + 1) + '\\leftrightarrow F_' + (p + 1)); }
      for (let j = pr + 1; j < nr; j++) {
        if (B[j][c] === 0) continue;
        const a = B[pr][c], b = B[j][c], g = gcd(a, b);
        let pj = a / g, q = b / g;
        if (pj < 0) { pj = -pj; q = -q; }
        B[j] = B[j].map((x, t) => pj * x - q * B[pr][t]);
        const lead = pj === 1 ? 'F_' + (j + 1) : pj + 'F_' + (j + 1);
        const tail = q === 1 ? '-F_' + (pr + 1) : q === -1 ? '+F_' + (pr + 1) : (q < 0 ? '+' : '-') + Math.abs(q) + 'F_' + (pr + 1);
        ops.push('F_' + (j + 1) + '\\to ' + lead + tail);
      }
      if (ops.length) out.push({ ops, M: B.map((r) => r.slice()) });
      pr++;
    }
    const rank = B.filter((r) => r.some((x) => x !== 0)).length;
    return { steps: out, rank, final: B };
  }

  function detSteps(A) {
    const n = A.length;
    if (n === 2) {
      const [a, b] = A[0], [c, d] = A[1];
      return ['Para 2×2: producto de la diagonal principal menos producto de la secundaria. ' +
        d$('|A|=' + ftexp(a) + '\\cdot' + ftexp(d) + '-' + ftexp(b) + '\\cdot' + ftexp(c) + '=' + ftex(det(A)))];
    }
    let best = { z: -1 };
    for (let i = 0; i < n; i++) {
      const zr = A[i].filter((x) => x.n === 0).length;
      if (zr > best.z) best = { z: zr, type: 'fila', idx: i };
      const zc = A.filter((r) => r[i].n === 0).length;
      if (zc > best.z) best = { z: zc, type: 'columna', idx: i };
    }
    const terms = [];
    for (let k = 0; k < n; k++) {
      const i = best.type === 'fila' ? best.idx : k;
      const j = best.type === 'fila' ? k : best.idx;
      if (A[i][j].n === 0) continue;
      const coef = (i + j) % 2 === 0 ? A[i][j] : G.fneg(A[i][j]);
      const mn = minorM(A, i, j);
      terms.push({ coef, mn, d: det(mn) });
    }
    const sym = terms.map((t) => ftexp(t.coef) + '\\cdot' + mtex(t.mn, 'vmatrix')).join('+');
    const valExpr = terms.map((t) => ftexp(t.coef) + '\\cdot' + ftexp(t.d)).join('+');
    return [
      'Desarrollamos por la ' + best.type + ' ' + (best.idx + 1) + ' (la que más ceros tiene). Cada término es el elemento por su signo $(-1)^{i+j}$ por el determinante del menor:' +
        d$('|A|=' + (sym || '0')),
      'Calculamos los determinantes de los menores y sumamos: ' + d$('|A|=' + (valExpr || '0') + '=' + ftex(det(A))),
    ];
  }

  const dimOpts = (list) => list.map(([v, t]) => [v, t]);

  /* ===================== 1. Producto ===================== */
  G.define({
    id: 'producto',
    title: 'Producto de matrices',
    tip: 'El elemento $c_{ij}$ es la fila $i$ de $A$ por la columna $j$ de $B$. Sólo se puede multiplicar si columnas de $A$ = filas de $B$.',
    params: [
      { key: 'dim', label: 'Dimensiones', options: dimOpts([['2,2,2', '2×2 · 2×2'], ['2,3,2', '2×3 · 3×2'], ['3,2,3', '3×2 · 2×3'], ['2,3,3', '2×3 · 3×3'], ['3,3,3', '3×3 · 3×3']]) },
      { key: 'rng', label: 'Coeficientes', options: [['3', '−3 a 3'], ['5', '−5 a 5'], ['9', '−9 a 9']] },
    ],
    generate(p) {
      const [m, n, q] = p.dim.split(',').map(Number);
      const r = Number(p.rng);
      const A = randMat(m, n, -r, r), B = randMat(n, q, -r, r);
      const C = mmul(A, B);
      const cell = (i, j) => Array.from({ length: n }, (_, k) => ftexp(A[i][k]) + '\\cdot' + ftexp(B[k][j])).join('+');
      const expanded = Array.from({ length: m }, (_, i) => Array.from({ length: q }, (_, j) => cell(i, j)));
      return {
        prompt: 'Calcula el producto ' + i$('A\\cdot B') + ' con ' + d$('A=' + mtex(A) + '\\qquad B=' + mtex(B)),
        answer: { kind: 'matrix', label: 'A\\cdot B=', value: C },
        steps: [
          'Dimensiones: ' + i$('A') + ' es ' + i$(m + '\\times' + n) + ' y ' + i$('B') + ' es ' + i$(n + '\\times' + q) + '. Las columnas de ' + i$('A') + ' coinciden con las filas de ' + i$('B') + ', luego se puede multiplicar y ' + i$('AB') + ' es ' + i$(m + '\\times' + q) + '.',
          'Cada elemento es la fila $i$ de $A$ por la columna $j$ de $B$: ' + d$('A\\cdot B=' + mtexStr(expanded)),
          'Hacemos las cuentas: ' + d$('A\\cdot B=' + mtex(C)),
        ],
        data: { A, B },
      };
    },
  });

  /* ===================== 2. Potencias ===================== */
  function potenciasCase(tipo) {
    if (tipo === 'nil') {
      if (rnd.int(0, 2) === 0) {
        const k = rnd.pick([-3, -2, -1, 1, 2, 3]);
        const A = rnd.int(0, 1) ? M([[k, -k], [k, -k]]) : M([[0, k], [0, 0]]);
        return { A, N: rnd.int(6, 60), upto: 2, rule: 'A^n=O\\ \\text{para todo }n\\ge 2' };
      }
      const a = rnd.pick([-3, -2, -1, 1, 2, 3]), c = rnd.pick([-3, -2, -1, 1, 2, 3]), b = rnd.int(-3, 3);
      return { A: M([[0, a, b], [0, 0, c], [0, 0, 0]]), N: rnd.int(6, 60), upto: 3, rule: 'A^n=O\\ \\text{para todo }n\\ge 3' };
    }
    if (tipo === 'per') {
      const A = rnd.pick([
        M([[0, 1], [1, 0]]), M([[0, -1], [1, 0]]), M([[0, 1], [-1, -1]]), M([[1, 1], [-1, 0]]),
        M([[1, 0], [0, -1]]), M([[0, 1, 0], [0, 0, 1], [1, 0, 0]]), M([[0, 0, 1], [0, 1, 0], [1, 0, 0]]), M([[-1, 0, 0], [0, 1, 0], [0, 0, -1]]),
      ]);
      let per = 1, P = A;
      while (!meq(P, mI(A.length))) { P = mmul(P, A); per++; }
      const N = rnd.int(20, 99);
      return { A, N, upto: per, per, rule: 'A^{' + per + '}=I\\ \\Rightarrow\\ \\text{las potencias se repiten cada }' + per };
    }
    // crecimiento con patrón
    const k = rnd.pick([-4, -3, -2, -1, 1, 2, 3, 4, 5]);
    const form = rnd.int(0, 3);
    if (form === 0) return { A: M([[1, k], [0, 1]]), N: rnd.int(5, 40), upto: 3, rule: 'A^n=\\begin{pmatrix}1&' + (k === 1 ? '' : k) + 'n\\\\0&1\\end{pmatrix}', lin: true };
    if (form === 1) return { A: M([[1, 0], [k, 1]]), N: rnd.int(5, 40), upto: 3, rule: 'A^n=\\begin{pmatrix}1&0\\\\' + (k === 1 ? '' : k) + 'n&1\\end{pmatrix}', lin: true };
    if (form === 2) return { A: M([[1, k, 0], [0, 1, 0], [0, 0, 1]]), N: rnd.int(5, 40), upto: 3, rule: 'A^n=\\begin{pmatrix}1&' + (k === 1 ? '' : k) + 'n&0\\\\0&1&0\\\\0&0&1\\end{pmatrix}', lin: true };
    const a = rnd.pick([-1, 2, 3]), b = rnd.pick([1, 2, -1]);
    return { A: M([[a, 0], [0, b]]), N: rnd.int(3, 7), upto: 3, rule: 'A^n=\\begin{pmatrix}' + a + '^n&0\\\\0&' + b + '^n\\end{pmatrix}' };
  }

  G.define({
    id: 'potencias',
    title: 'Potencias de una matriz',
    tip: 'Calcula $A^2$, $A^3$, … hasta ver el patrón. Si se repite (ciclo), usa el resto de dividir el exponente entre el periodo. Si crece, busca la fórmula en $n$.',
    params: [
      { key: 'tipo', label: 'Tipo', options: [['mix', 'Mezcla'], ['nil', 'Acaban en 0'], ['per', 'Se repiten'], ['gro', 'Con fórmula en n']] },
    ],
    generate(p) {
      const tipo = p.tipo === 'mix' ? rnd.pick(['nil', 'per', 'gro']) : p.tipo;
      const c = potenciasCase(tipo);
      const { A, N } = c;
      const R = mpow(A, N);
      const steps = ['Calculamos las primeras potencias para detectar el patrón:'];
      const k = Math.min(c.upto, 4);
      steps.push(d$(Array.from({ length: k - 1 }, (_, t) => 'A^{' + (t + 2) + '}=' + mtex(mpow(A, t + 2))).join('\\qquad ')));
      if (tipo === 'nil') {
        steps.push('Patrón: ' + i$(c.rule) + '. Como ' + i$(N + '\\ge ' + c.upto) + ', ' + d$('A^{' + N + '}=O'));
      } else if (tipo === 'per') {
        const q = Math.floor(N / c.per), r = N % c.per;
        steps.push('Periodo ' + c.per + ': ' + i$(c.rule.split('\\Rightarrow')[0]) + '.');
        steps.push('Dividimos el exponente: ' + i$(N + '=' + c.per + '\\cdot' + q + '+' + r) + '. Entonces ' + d$('A^{' + N + '}=(A^{' + c.per + '})^{' + q + '}\\cdot A^{' + r + '}=' + (r === 0 ? 'I' : 'A^{' + r + '}') + '=' + mtex(R)));
      } else {
        steps.push('Patrón (se comprueba por inducción): ' + d$(c.rule));
        steps.push('Sustituimos $n=' + N + '$: ' + d$('A^{' + N + '}=' + mtex(R)));
      }
      return {
        prompt: 'Calcula ' + i$('A^{' + N + '}') + ' siendo ' + d$('A=' + mtex(A)),
        answer: { kind: 'matrix', label: 'A^{' + N + '}=', value: R },
        steps,
        data: { A, N },
      };
    },
  });

  /* ===================== 3. Determinante ===================== */
  G.define({
    id: 'determinante',
    title: 'Determinante',
    tip: 'Elige la fila o columna con más ceros y desarrolla por ella (adjuntos). Para 2×2: $ad-bc$.',
    params: [
      { key: 'n', label: 'Tamaño', options: [['2', '2×2'], ['3', '3×3'], ['4', '4×4']], default: '3' },
      { key: 'ceros', label: 'Ceros', options: [['si', 'Con ceros'], ['no', 'Pocos ceros']] },
    ],
    generate(p) {
      const n = Number(p.n);
      const r = n === 4 ? 3 : 5;
      const lo = n === 4 ? -3 : -5;
      let A;
      for (;;) {
        A = randMat(n, n, lo, r);
        if (p.ceros === 'si' && n > 2) {
          const i = rnd.int(0, n - 1), keep = rnd.int(0, n - 1);
          for (let j = 0; j < n; j++) if (j !== keep) A[i][j] = F(0);
          const extra = rnd.int(0, n === 4 ? 4 : 2);
          for (let t = 0; t < extra; t++) A[rnd.int(0, n - 1)][rnd.int(0, n - 1)] = F(0);
        }
        if (n === 2 || Math.abs(det(A).n) > 0) break;
      }
      return {
        prompt: 'Calcula el determinante de ' + d$('A=' + mtex(A)),
        answer: { kind: 'number', label: '|A|=', value: det(A) },
        steps: detSteps(A),
        data: { A },
      };
    },
  });

  /* ===================== 4. Inversa ===================== */
  G.define({
    id: 'inversa',
    title: 'Matriz inversa',
    tip: '$A^{-1}=\\dfrac{1}{|A|}\\,\\operatorname{Adj}(A)^{t}$. Existe sólo si $|A|\\neq 0$.',
    params: [
      { key: 'n', label: 'Tamaño', options: [['2', '2×2'], ['3', '3×3']] },
      { key: 'frac', label: 'Resultado', options: [['no', 'Entero (|A|=±1)'], ['si', 'Con fracciones']] },
    ],
    generate(p) {
      const n = Number(p.n);
      let A;
      if (p.frac === 'no') A = unimodular(n);
      else {
        for (;;) {
          A = randMat(n, n, -4, 4);
          const d = Math.abs(det(A).n);
          if (d >= 2 && d <= (n === 2 ? 9 : 6)) break;
        }
      }
      return {
        prompt: 'Calcula la inversa de ' + d$('A=' + mtex(A)),
        answer: { kind: 'matrix', label: 'A^{-1}=', value: inverse(A) },
        steps: invSteps(A, 'A'),
        data: { A },
      };
    },
  });

  /* ===================== 5. Rango ===================== */
  G.define({
    id: 'rango',
    title: 'Rango',
    tip: 'Reduce por Gauss (operaciones entre filas) hasta una matriz escalonada. El rango es el número de filas no nulas.',
    params: [
      { key: 'dim', label: 'Dimensión', options: [['3,3', '3×3'], ['3,4', '3×4'], ['4,3', '4×3'], ['4,4', '4×4']] },
    ],
    generate(p) {
      const [m, n] = p.dim.split(',').map(Number);
      const mn = Math.min(m, n);
      const w = Math.random();
      const target = w < 0.3 ? mn : w < 0.85 ? mn - 1 : Math.max(1, mn - 2);
      let A;
      for (;;) {
        const base = randMat(target, n, -3, 3);
        if (rankOf(base) !== target) continue;
        const R = base.map((r) => r.slice());
        while (R.length < m) {
          let row = Array.from({ length: n }, () => F(0));
          for (let t = 0; t < target; t++) {
            const c = rnd.pick([-2, -1, 0, 1, 2]);
            row = row.map((x, j) => G.fadd(x, G.fmul(F(c), base[t][j])));
          }
          R.push(row);
        }
        A = rnd.shuffle(R);
        if (rankOf(A) === target && Math.max(...A.map((r) => Math.max(...r.map((x) => Math.abs(x.n))))) <= 8) break;
      }
      const g = gaussSteps(A);
      const steps = ['Partimos de ' + d$('A=' + mtex(A))];
      g.steps.forEach((s, i) => steps.push('Hacemos ceros bajo el pivote de la columna ' + (i + 1) + ': ' + i$(s.ops.join(',\\ ')) + d$('\\sim' + mtex(M(s.M)))));
      steps.push('La matriz escalonada tiene ' + g.rank + (g.rank === 1 ? ' fila no nula' : ' filas no nulas') + ', luego ' + d$('\\operatorname{rg}(A)=' + g.rank));
      return {
        prompt: 'Halla el rango de ' + d$('A=' + mtex(A)),
        answer: { kind: 'number', label: '\\operatorname{rg}(A)=', value: F(g.rank) },
        steps,
        data: { A, rank: target },
      };
    },
  });

  /* ===================== 6. Matriz con parámetro ===================== */
  const entTex = (e) => {
    if (e.a === 0) return String(e.b);
    const mp = e.a === 1 ? 'm' : e.a === -1 ? '-m' : e.a + 'm';
    return e.b === 0 ? mp : mp + (e.b > 0 ? '+' + e.b : String(e.b));
  };
  function polyFromDet(T) {
    const at = (m) => det(M(T.map((r) => r.map((e) => e.a * m + e.b))));
    const v = [0, 1, 2, 3].map(at);
    const d1 = G.fsub(v[1], v[0]);
    const d2 = G.fsub(G.fsub(v[2], v[1]), d1);
    const d3 = G.fsub(G.fsub(G.fsub(v[3], v[2]), G.fsub(v[2], v[1])), d2);
    const c0 = v[0];
    const c1 = G.fadd(G.fsub(d1, G.fdiv(d2, F(2))), G.fdiv(d3, F(3)));
    const c2 = G.fsub(G.fdiv(d2, F(2)), G.fdiv(d3, F(2)));
    const c3 = G.fdiv(d3, F(6));
    return [c0, c1, c2, c3];
  }
  function polyTex(c) {
    let s = '';
    for (let k = c.length - 1; k >= 0; k--) {
      const v = c[k];
      if (v.n === 0) continue;
      const mag = Math.abs(v.n);
      const body = k === 0 ? String(mag) : (mag === 1 ? '' : String(mag)) + 'm' + (k > 1 ? '^{' + k + '}' : '');
      s += (v.n < 0 ? '-' : s ? '+' : '') + body;
    }
    return s || '0';
  }
  function factorPoly(cf) {
    // cf: enteros [c0..c3]; devuelve {lead, roots:[{r,k}]} o null si no se factoriza con raíces enteras
    let c = cf.slice();
    while (c.length > 1 && c[c.length - 1] === 0) c.pop();
    if (c.length < 2) return null;
    const roots = [];
    for (let r = -9; r <= 9; r++) {
      let k = 0;
      while (c.length > 1) {
        const val = c.reduceRight((acc, x) => acc * r + x, 0);
        if (val !== 0) break;
        const q = new Array(c.length - 1);
        q[c.length - 2] = c[c.length - 1];
        for (let i = c.length - 3; i >= 0; i--) q[i] = c[i + 1] + r * q[i + 1];
        c = q; k++;
      }
      if (k) roots.push({ r, k });
    }
    if (c.length !== 1 || !roots.length) return null;
    return { lead: c[0], roots };
  }
  function factorTex(f) {
    const lead = f.lead === 1 ? '' : f.lead === -1 ? '-' : String(f.lead);
    return lead + f.roots.map(({ r, k }) => (r === 0 ? 'm' : '(m' + (r < 0 ? '+' + (-r) : '-' + r) + ')') + (k > 1 ? '^{' + k + '}' : '')).join('');
  }

  G.define({
    id: 'parametrica',
    title: 'Matriz con parámetro',
    tip: '$A$ no tiene inversa $\\iff |A|=0$. Calcula el determinante en función de $m$ y resuelve la ecuación.',
    params: [],
    generate() {
      for (let tries = 0; tries < 20000; tries++) {
        const T = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ({ a: 0, b: rnd.int(-3, 3) })));
        const slots = rnd.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, rnd.pick([2, 2, 3]));
        slots.forEach((s) => { T[Math.floor(s / 3)][s % 3] = { a: rnd.pick([1, 1, -1, 2]), b: rnd.int(-3, 3) }; });
        const cs = polyFromDet(T);
        if (cs.some((x) => x.d !== 1)) continue;
        const f = factorPoly(cs.map((x) => x.n));
        if (!f || Math.abs(f.lead) > 6 || f.roots.length > 3) continue;
        const rootsVal = f.roots.map(({ r }) => F(r));
        const exp = cs.map((x) => x.n);
        const Atex = mtexStr(T.map((r) => r.map(entTex)));
        const Dtex = mtexStr(T.map((r) => r.map(entTex)), 'vmatrix');
        return {
          prompt: 'Halla los valores de ' + i$('m') + ' para los que la matriz ' + i$('A') + ' <b>no</b> tiene inversa: ' + d$('A=' + Atex),
          answer: { kind: 'list', label: 'm=', value: rootsVal },
          steps: [
            'Una matriz cuadrada no es invertible cuando su determinante vale 0. Calculamos ' + d$('|A|=' + Dtex + '=' + polyTex(cs)),
            'Factorizamos (buscamos raíces enteras por Ruffini): ' + d$('|A|=' + factorTex(f)),
            'Igualamos a 0: ' + d$('|A|=0\\iff ' + f.roots.map(({ r }) => 'm=' + r).join('\\ \\text{ o }\\ ')),
            'Para esos valores de ' + i$('m') + ' la matriz no tiene inversa; para cualquier otro sí.',
          ],
          data: { T, coefs: exp, roots: f.roots },
        };
      }
      throw new Error('no se pudo generar una matriz paramétrica');
    },
  });

  /* ===================== 7. Ecuaciones matriciales ===================== */
  G.define({
    id: 'ecuaciones',
    title: 'Ecuaciones matriciales',
    tip: 'Despeja $X$ multiplicando por la inversa <b>por el mismo lado</b> en los dos miembros. El producto de matrices no es conmutativo.',
    params: [
      { key: 'tipo', label: 'Tipo', options: [['ax', 'AX = B'], ['axb', 'AXB = C'], ['axx', 'AX + X = B']] },
      { key: 'n', label: 'Tamaño', options: [['2', '2×2'], ['3', '3×3']] },
    ],
    generate(p) {
      const n = Number(p.n);
      const X = randMat(n, n, -4, 4);
      const big = n === 3 ? 4 : 6;
      if (p.tipo === 'ax') {
        const A = unimodular(n, big), B = mmul(A, X), Ai = inverse(A);
        return {
          prompt: 'Resuelve la ecuación ' + i$('A\\cdot X=B') + ' con ' + d$('A=' + mtex(A) + '\\qquad B=' + mtex(B)),
          answer: { kind: 'matrix', label: 'X=', value: X },
          steps: [
            'Multiplicamos por ' + i$('A^{-1}') + ' <b>por la izquierda</b>: ' + d$('A^{-1}AX=A^{-1}B\\ \\Rightarrow\\ X=A^{-1}B'),
            'Calculamos la inversa de ' + i$('A') + ':'].concat(invSteps(A, 'A'), [
            'Multiplicamos: ' + d$('X=A^{-1}B=' + mtex(Ai) + mtex(B) + '=' + mtex(X))]),
          data: { eq: 'ax', A, B, X },
        };
      }
      if (p.tipo === 'axb') {
        const A = unimodular(n, big), B = unimodular(n, big);
        const C = mmul(mmul(A, X), B);
        const Ai = inverse(A), Bi = inverse(B);
        return {
          prompt: 'Resuelve la ecuación ' + i$('A\\cdot X\\cdot B=C') + ' con ' + d$('A=' + mtex(A) + '\\quad B=' + mtex(B) + '\\quad C=' + mtex(C)),
          answer: { kind: 'matrix', label: 'X=', value: X },
          steps: [
            i$('A') + ' multiplica por la izquierda y ' + i$('B') + ' por la derecha, así que multiplicamos por ' + i$('A^{-1}') + ' a la izquierda y por ' + i$('B^{-1}') + ' a la derecha: ' + d$('A^{-1}AXBB^{-1}=A^{-1}CB^{-1}\\ \\Rightarrow\\ X=A^{-1}\\,C\\,B^{-1}'),
            'Inversas: ' + d$('A^{-1}=' + mtex(Ai) + '\\qquad B^{-1}=' + mtex(Bi)),
            'Multiplicamos en ese orden: ' + d$('X=' + mtex(Ai) + mtex(C) + mtex(Bi) + '=' + mtex(X)),
          ],
          data: { eq: 'axb', A, B, C, X },
        };
      }
      const P = unimodular(n, big);
      const A = msub(P, mI(n));
      const B = mmul(P, X);
      const Pi = inverse(P);
      return {
        prompt: 'Resuelve la ecuación ' + i$('A\\cdot X+X=B') + ' con ' + d$('A=' + mtex(A) + '\\qquad B=' + mtex(B)),
        answer: { kind: 'matrix', label: 'X=', value: X },
        steps: [
          'Sacamos factor común ' + i$('X') + ' por la derecha (recuerda que ' + i$('X=IX') + '): ' + d$('AX+X=(A+I)X=B'),
          'Sumamos: ' + d$('A+I=' + mtex(A) + '+' + mtex(mI(n)) + '=' + mtex(P)),
          'Despejamos: ' + d$('X=(A+I)^{-1}B') + 'Inversa de ' + i$('A+I') + ':',
        ].concat(invSteps(P, 'A+I').map((s) => s), [
          'Multiplicamos: ' + d$('X=' + mtex(Pi) + mtex(B) + '=' + mtex(X)),
        ]),
        data: { eq: 'axx', A, B, X },
      };
    },
  });

  // Utilidades compartidas con los demás temas de álgebra lineal.
  G.lib = { randMat, unimodular, invSteps, gaussSteps, detSteps, entTex, polyFromDet, polyTex, factorPoly, factorTex };
})(typeof globalThis !== 'undefined' ? globalThis : this);
