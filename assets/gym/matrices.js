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
  const row = (arr) => M([arr]);
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

  /** Gauss-Jordan sobre (A|I) con fracciones exactas. Devuelve pasos [{ops, R}] e inversa. */
  function gjInvSteps(A) {
    const n = A.length;
    const I = mI(n);
    const R = A.map((r, i) => r.concat(I[i]));
    const out = [];
    const coef = (k, c) => {          // "F_i -> F_i - k F_c" con k fracción
      const a = G.fzero(k) ? null : k;
      const mag = ftex(a.n < 0 ? G.fneg(a) : a);
      return (a.n < 0 ? '+' : '-') + (mag === '1' ? '' : (a.d === 1 ? mag : '\\left(' + mag + '\\right)')) + 'F_' + (c + 1);
    };
    for (let c = 0; c < n; c++) {
      let p = -1;
      for (let i = c; i < n; i++) if (!G.fzero(R[i][c]) && (p < 0 || (R[i][c].n === 1 && R[i][c].d === 1))) p = i;
      const ops = [];
      if (p !== c) { [R[c], R[p]] = [R[p], R[c]]; ops.push('F_' + (c + 1) + '\\leftrightarrow F_' + (p + 1)); }
      const piv = R[c][c];
      if (!(piv.n === 1 && piv.d === 1)) {
        R[c] = R[c].map((x) => G.fdiv(x, piv));
        ops.push('F_' + (c + 1) + '\\to ' + (piv.n === -1 && piv.d === 1 ? '-' : '\\frac{1}{' + ftex(piv) + '}') + 'F_' + (c + 1));
      }
      for (let i = 0; i < n; i++) {
        if (i === c || G.fzero(R[i][c])) continue;
        const k = R[i][c];
        R[i] = R[i].map((x, j) => G.fsub(x, G.fmul(k, R[c][j])));
        ops.push('F_' + (i + 1) + '\\to F_' + (i + 1) + coef(k, c));
      }
      out.push({ ops, R: R.map((r) => r.slice()) });
    }
    return { steps: out, inv: R.map((r) => r.slice(n)) };
  }
  const augF = (R, n) => '\\left(\\begin{array}{' + 'c'.repeat(n) + '|' + 'c'.repeat(n) + '}' + R.map((r) => r.map(ftex).join('&')).join('\\\\') + '\\end{array}\\right)';

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
  const RNG_OPTS = [['2', '−2 a 2 (fácil)'], ['3', '−3 a 3'], ['5', '−5 a 5'], ['9', '−9 a 9'], ['12', '−12 a 12']];

  /* ===================== 1. Producto ===================== */
  G.define({
    id: 'producto',
    title: 'Producto de matrices',
    help: [
      '$A_{m\\times n}\\cdot B_{n\\times p}$ sólo existe si las columnas de $A$ coinciden con las filas de $B$, y da una matriz $m\\times p$. El elemento $c_{ij}$ es la fila $i$ de $A$ por la columna $j$ de $B$.',
      'Ejemplo: $\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}\\begin{pmatrix}0&1\\\\5&-1\\end{pmatrix}$. ' +
        d$('c_{11}=1\\cdot0+2\\cdot5=10,\\qquad c_{12}=1\\cdot1+2\\cdot(-1)=-1') + d$('c_{21}=3\\cdot0+4\\cdot5=20,\\qquad c_{22}=3\\cdot1+4\\cdot(-1)=-1') +
        'Resultado: $\\begin{pmatrix}10&-1\\\\20&-1\\end{pmatrix}$. Recuerda que en general $AB\\neq BA$.',
    ],
    params: [
      { key: 'dim', label: 'Dimensiones', options: dimOpts([['2,2,2', '2×2 · 2×2'], ['2,3,2', '2×3 · 3×2'], ['3,2,3', '3×2 · 2×3'], ['2,3,3', '2×3 · 3×3'], ['3,3,3', '3×3 · 3×3'], ['3,4,2', '3×4 · 4×2']]) },
      { key: 'rng', label: 'Coeficientes', options: RNG_OPTS },
    ],
    generate(p) {
      const [m, n, q] = p.dim.split(',').map(Number);
      const r = Number(p.rng);
      const A = randMat(m, n, -r, r), B = randMat(n, q, -r, r);
      const C = mmul(A, B);
      const cell = (i, j) => Array.from({ length: n }, (_, k) => ftexp(A[i][k]) + '\\cdot' + ftexp(B[k][j])).join('+');
      const expanded = Array.from({ length: m }, (_, i) => Array.from({ length: q }, (_, j) => cell(i, j)));
      const mistakes = [];
      if (m === n && n === q) {
        const BA = mmul(B, A);
        if (!meq(BA, C)) mistakes.push({ value: BA, msg: 'has calculado B·A; el producto de matrices no es conmutativo y aquí se pide A·B (filas de A por columnas de B).' });
        const H = M(A.map((row, i) => row.map((x, j) => G.fmul(x, B[i][j]))));
        if (!meq(H, C)) mistakes.push({ value: H, msg: 'has multiplicado elemento a elemento. El producto de matrices es fila por columna: $c_{ij}=\\sum_k a_{ik}b_{kj}$.' });
      }
      return {
        prompt: 'Calcula el producto ' + i$('A\\cdot B') + ' con ' + d$('A=' + mtex(A) + '\\qquad B=' + mtex(B)),
        answer: { kind: 'matrix', label: 'A\\cdot B=', value: C },
        steps: [
          'Dimensiones: ' + i$('A') + ' es ' + i$(m + '\\times' + n) + ' y ' + i$('B') + ' es ' + i$(n + '\\times' + q) + '. Las columnas de ' + i$('A') + ' coinciden con las filas de ' + i$('B') + ', luego se puede multiplicar y ' + i$('AB') + ' es ' + i$(m + '\\times' + q) + '.',
          'Cada elemento es la fila $i$ de $A$ por la columna $j$ de $B$: ' + d$('A\\cdot B=' + mtexStr(expanded)),
          'Hacemos las cuentas: ' + d$('A\\cdot B=' + mtex(C)),
        ],
        mistakes,
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
    if (tipo === 'inm') {
      const a = rnd.pick([-3, -2, -1, 1, 2, 3]), c = rnd.pick([-3, -2, -1, 1, 2, 3]), b = rnd.int(-3, 3);
      const Nm = M([[0, a, b], [0, 0, c], [0, 0, 0]]);
      return { A: madd(mI(3), Nm), N: rnd.int(4, 20), upto: 3, Nm };
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
    help: [
      'Calcula $A^2$, $A^3$, … hasta ver un patrón. Hay tres casos: se anula ($A^k=O$), se repite ($A^p=I$: usa el resto de dividir el exponente entre $p$) o crece con una fórmula en $n$. Si $A=I+N$ con $N^3=O$: $A^n=I+nN+\\binom n2N^2$.',
      'Ejemplos. Se repite: $A=\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$ cumple $A^2=I$, así que $A^{7}=(A^2)^3\\cdot A=A$. Se anula: $N=\\begin{pmatrix}0&2\\\\0&0\\end{pmatrix}$ cumple $N^2=O$, luego $N^{50}=O$. Nunca se eleva cada elemento a $n$: hay que multiplicar matrices.',
    ],
    params: [
      { key: 'tipo', label: 'Tipo', options: [['nil', 'Acaban en 0'], ['per', 'Se repiten'], ['gro', 'Con fórmula en n'], ['inm', 'I + N (binomio)']] },
    ],
    generate(p) {
      const tipo = p.tipo;
      const c = potenciasCase(tipo);
      const { A, N } = c;
      const R = mpow(A, N);
      const steps = [];
      if (tipo === 'inm') {
        const N2 = mmul(c.Nm, c.Nm);
        const C2 = N * (N - 1) / 2;
        steps.push('Descomponemos ' + i$('A=I+N') + ' con ' + d$('N=' + mtex(c.Nm)));
        steps.push('Calculamos las potencias de ' + i$('N') + ': ' + d$('N^2=' + mtex(N2) + '\\qquad N^3=O'));
        steps.push(i$('I') + ' y ' + i$('N') + ' conmutan, luego vale el binomio de Newton y sólo sobreviven los términos hasta ' + i$('N^2') + ': ' + d$('A^{n}=(I+N)^n=I+nN+\\binom{n}{2}N^2'));
        steps.push('Con ' + i$('n=' + N) + ': ' + i$('\\binom{' + N + '}{2}=' + C2) + '. ' + d$('A^{' + N + '}=I+' + N + mtex(c.Nm) + '+' + C2 + mtex(N2) + '=' + mtex(R)));
      } else {
        steps.push('Calculamos las primeras potencias para detectar el patrón:');
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
      }
      const mistakes = [];
      const E = A.map((r) => r.map((x) => Math.pow(x.n, N)));
      if (E.every((r) => r.every(Number.isSafeInteger))) {
        const Em = M(E);
        if (!meq(Em, R)) mistakes.push({ value: Em, msg: 'elevar una matriz a $n$ no es elevar cada elemento a $n$: hay que multiplicar la matriz por sí misma $n$ veces.' });
      }
      return {
        prompt: 'Calcula ' + i$('A^{' + N + '}') + ' siendo ' + d$('A=' + mtex(A)),
        answer: { kind: 'matrix', label: 'A^{' + N + '}=', value: R },
        steps,
        mistakes,
        data: { A, N },
      };
    },
  });

  /* ===================== 3. Determinante ===================== */
  G.define({
    id: 'determinante',
    title: 'Determinante',
    help: [
      'En 2×2: $|A|=ad-bc$. En 3×3 o 4×4: elige la fila o columna con más ceros y desarrolla por adjuntos: $|A|=\\sum_j a_{ij}(-1)^{i+j}|M_{ij}|$, donde $M_{ij}$ es la matriz que queda al quitar la fila $i$ y la columna $j$.',
      'Ejemplo: ' + d$('\\begin{vmatrix}2&0&1\\\\3&0&4\\\\1&5&2\\end{vmatrix}') + 'La columna 2 sólo tiene un elemento distinto de 0, el $5$ en la posición $(3,2)$, con signo $(-1)^{3+2}=-1$: ' +
        d$('=-5\\begin{vmatrix}2&1\\\\3&4\\end{vmatrix}=-5\\,(8-3)=-25'),
    ],
    params: [
      { key: 'n', label: 'Tamaño', options: [['2', '2×2'], ['3', '3×3'], ['4', '4×4']] },
      { key: 'rng', label: 'Coeficientes', options: [['3', '−3 a 3'], ['5', '−5 a 5'], ['9', '−9 a 9']] },
      { key: 'ceros', label: 'Ceros', options: [['si', 'Con ceros'], ['no', 'Pocos ceros']] },
    ],
    generate(p) {
      const n = Number(p.n);
      const r = n === 4 ? Math.min(3, Number(p.rng)) : Number(p.rng);
      const lo = -r;
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
      const d0 = det(A);
      const mistakes = [];
      if (n === 2) {
        const w = F(A[0][0].n * A[1][1].n + A[0][1].n * A[1][0].n);
        if (!G.feq(w, d0)) mistakes.push({ value: w, msg: 'en 2×2 el determinante es $ad-bc$ (diagonal principal menos secundaria), no $ad+bc$.' });
      } else {
        let w = F(0);
        for (let j = 0; j < n; j++) if (A[0][j].n !== 0) w = G.fadd(w, G.fmul(A[0][j], det(minorM(A, 0, j))));
        if (!G.feq(w, d0)) mistakes.push({ value: w, msg: 'cuidado con los signos de los adjuntos: $(-1)^{i+j}$ alterna $+,-,+,\\dots$ (como un tablero de ajedrez).' });
      }
      return {
        prompt: 'Calcula el determinante de ' + d$('A=' + mtex(A)),
        answer: { kind: 'number', label: '|A|=', value: d0 },
        steps: detSteps(A),
        mistakes,
        data: { A },
      };
    },
  });

  /* ===================== 4. Inversa ===================== */
  G.define({
    id: 'inversa',
    title: 'Matriz inversa',
    help: [
      '$A^{-1}=\\dfrac{1}{|A|}\\operatorname{Adj}(A)^{t}$ y existe sólo si $|A|\\neq0$. $\\operatorname{Adj}(A)$ es la matriz de adjuntos $(-1)^{i+j}|M_{ij}|$. También vale Gauss-Jordan: se escribe $(A\\,|\\,I)$ y se transforma en $(I\\,|\\,A^{-1})$.',
      'Ejemplo: $A=\\begin{pmatrix}2&1\\\\5&3\\end{pmatrix}$, $|A|=1$. Adjuntos: $\\begin{pmatrix}3&-5\\\\-1&2\\end{pmatrix}$; se traspone: $\\begin{pmatrix}3&-1\\\\-5&2\\end{pmatrix}$; se divide entre $|A|=1$. ' +
        d$('A^{-1}=\\begin{pmatrix}3&-1\\\\-5&2\\end{pmatrix}') + 'Comprobación: $A\\cdot A^{-1}=I$.',
    ],
    params: [
      { key: 'n', label: 'Tamaño', options: [['2', '2×2'], ['3', '3×3'], ['4', '4×4']] },
      { key: 'frac', label: 'Resultado', options: [['no', 'Entero (|A|=±1)'], ['si', 'Con fracciones']] },
      { key: 'met', label: 'Método', options: [['adj', 'Adjuntos'], ['gj', 'Gauss-Jordan']] },
    ],
    generate(p) {
      const n = Number(p.n);
      const gj = p.met === 'gj' || n === 4;      // 4×4 sólo por Gauss-Jordan
      let A;
      if (p.frac === 'no' || n === 4) A = unimodular(n);
      else {
        for (;;) {
          A = randMat(n, n, -4, 4);
          const d = Math.abs(det(A).n);
          if (d >= 2 && d <= (n === 2 ? 9 : 6)) break;
        }
      }
      const inv = inverse(A);
      let steps, mistakes = [];
      if (gj) {
        const g = gjInvSteps(A);
        steps = ['Escribimos ' + i$('(A\\,|\\,I)') + ' y hacemos operaciones entre filas hasta obtener ' + i$('(I\\,|\\,A^{-1})') + ': ' + d$(augF(A.map((r, i) => r.concat(mI(n)[i])), n))];
        g.steps.forEach((st, k) => steps.push('Columna ' + (k + 1) + ': ' + i$(st.ops.join(',\\ ')) + d$('\\sim' + augF(st.R, n))));
        steps.push('La parte derecha es la inversa: ' + d$('A^{-1}=' + mtex(inv)));
      } else {
        steps = invSteps(A, 'A');
        const d0 = det(A), cof = cofactors(A);
        const inv0 = G.fdiv(F(1), d0);
        const add = (value, msg) => { if (!meq(value, inv)) mistakes.push({ value, msg }); };
        add(G.mscale(cof, inv0), 'te falta <b>trasponer</b> la matriz de adjuntos antes de dividir entre $|A|$.');
        if (!(d0.n === 1 && d0.d === 1)) add(mT(cof), 'falta dividir entre el determinante: $A^{-1}=\\frac{1}{|A|}\\operatorname{Adj}(A)^{t}$.');
        const unsigned = A.map((r, i) => r.map((_, j) => det(minorM(A, i, j))));
        add(G.mscale(mT(unsigned), inv0), 'revisa los signos de los adjuntos: $(-1)^{i+j}$ cambia el signo en las posiciones $(1,2),(2,1),\\dots$');
      }
      return {
        prompt: 'Calcula la inversa de ' + d$('A=' + mtex(A)) + (gj ? 'por el método de Gauss-Jordan.' : 'por adjuntos.'),
        answer: { kind: 'matrix', label: 'A^{-1}=', value: inv },
        steps,
        mistakes,
        data: { A },
      };
    },
  });

  /* ===================== 5. Rango ===================== */
  G.define({
    id: 'rango',
    title: 'Rango',
    help: [
      'El rango es el número de filas (o columnas) linealmente independientes: el mayor orden de un menor distinto de 0. Por Gauss: el número de filas no nulas de la matriz escalonada.',
      'Método: haz ceros bajo cada pivote con $F_i\\to aF_i-bF_p$ (nunca multipliques una fila sólo por 0). Ejemplo: ' +
        d$('\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}\\xrightarrow{F_2\\to F_2-2F_1}\\begin{pmatrix}1&2\\\\0&0\\end{pmatrix}') + 'Una fila no nula: rango 1.',
    ],
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
    help: [
      '$A$ no tiene inversa $\\iff |A|=0$. Calcula el determinante en función de $m$ y resuelve la ecuación que resulta.',
      'Método: 1) desarrolla $|A|$ como polinomio en $m$; 2) factoriza (Ruffini con divisores del término independiente); 3) iguala cada factor a 0. Ejemplo: $|A|=m^2-m-2=(m-2)(m+1)\\Rightarrow m=2$ o $m=-1$.',
    ],
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
    help: [
      'Despeja $X$ multiplicando por la inversa <b>por el mismo lado</b> en los dos miembros: $AX=B\\Rightarrow X=A^{-1}B$, pero $XA=B\\Rightarrow X=BA^{-1}$. El producto de matrices no es conmutativo.',
      'Casos: ' + d$('AXB=C\\ \\Rightarrow\\ X=A^{-1}\\,C\\,B^{-1}') + d$('AX+X=B\\ \\Rightarrow\\ (A+I)X=B\\ \\Rightarrow\\ X=(A+I)^{-1}B') + 'Al sacar factor común escribe $X=IX$ (no $1\\cdot X$, que no tiene sentido entre matrices).',
    ],
    params: [
      { key: 'tipo', label: 'Tipo', options: [['ax', 'AX = B'], ['axb', 'AXB = C'], ['axx', 'AX + X = B']] },
      { key: 'n', label: 'Tamaño', options: [['2', '2×2'], ['3', '3×3']] },
    ],
    generate(p) {
      const n = Number(p.n);
      const X = randMat(n, n, -4, 4);
      const big = n === 3 ? 4 : 6;
      const mk = (cands) => cands.filter((c) => !meq(c.value, X));
      if (p.tipo === 'ax') {
        const A = unimodular(n, big), B = mmul(A, X), Ai = inverse(A);
        return {
          prompt: 'Resuelve la ecuación ' + i$('A\\cdot X=B') + ' con ' + d$('A=' + mtex(A) + '\\qquad B=' + mtex(B)),
          answer: { kind: 'matrix', label: 'X=', value: X },
          steps: [
            'Multiplicamos por ' + i$('A^{-1}') + ' <b>por la izquierda</b>: ' + d$('A^{-1}AX=A^{-1}B\\ \\Rightarrow\\ X=A^{-1}B'),
            'Calculamos la inversa de ' + i$('A') + ':'].concat(invSteps(A, 'A'), [
            'Multiplicamos: ' + d$('X=A^{-1}B=' + mtex(Ai) + mtex(B) + '=' + mtex(X))]),
          mistakes: mk([{ value: mmul(B, Ai), msg: 'has multiplicado $B\\cdot A^{-1}$. Como $A$ está a la <b>izquierda</b> de $X$, $A^{-1}$ también va a la izquierda: $X=A^{-1}B$.' }]),
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
          mistakes: mk([
            { value: mmul(mmul(Ai, Bi), C), msg: 'el orden importa: $A^{-1}$ va a la izquierda de $C$ y $B^{-1}$ a la derecha, $X=A^{-1}\\,C\\,B^{-1}$.' },
            { value: mmul(mmul(C, Ai), Bi), msg: '$A^{-1}$ debe multiplicar por la <b>izquierda</b> de $C$, no por la derecha.' },
          ]),
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
        ].concat(invSteps(P, 'A+I'), [
          'Multiplicamos: ' + d$('X=' + mtex(Pi) + mtex(B) + '=' + mtex(X)),
        ]),
        mistakes: mk([
          { value: mmul(B, Pi), msg: 'la inversa de $A+I$ va a la <b>izquierda</b> de $B$: $X=(A+I)^{-1}B$.' },
        ]),
        data: { eq: 'axx', A, B, X },
      };
    },
  });

  /* ===================== 8. Sistema matricial (X, Y) ===================== */
  const coefVar = (a, v) => (a === 1 ? v : a === -1 ? '-' + v : a + v);
  const sumTex = (a, X, b, Y) => coefVar(a, X) + (b < 0 ? '' : '+') + coefVar(b, Y);
  G.define({
    id: 'sistemaxy',
    title: 'Sistema de ecuaciones matriciales (X, Y)',
    help: [
      'Trata $X$ e $Y$ como incógnitas de un sistema 2×2, pero con matrices en los términos independientes. Se resuelve igual que un sistema normal: por reducción (multiplicar ecuaciones por números y sumar) o por sustitución.',
      'Ejemplo: ' + d$('\\begin{cases}X+Y=A\\\\X-Y=B\\end{cases}') + 'Sumando: $2X=A+B\\Rightarrow X=\\frac{A+B}{2}$. Restando: $2Y=A-B\\Rightarrow Y=\\frac{A-B}{2}$. Los números multiplican a las matrices; no hace falta ninguna inversa.',
    ],
    params: [
      { key: 'dim', label: 'Tamaño', options: [['2,2', '2×2'], ['2,3', '2×3']] },
      { key: 'rng', label: 'Coeficientes', options: [['3', '−3 a 3'], ['4', '−4 a 4'], ['6', '−6 a 6']] },
    ],
    generate(p) {
      const [r, c] = p.dim.split(',').map(Number);
      const k = Number(p.rng);
      const X = randMat(r, c, -k, k), Y = randMat(r, c, -k, k);
      let a1, b1, a2, b2;
      do { [a1, b1, a2, b2] = [0, 0, 0, 0].map(() => rnd.pick([-2, -1, 1, 2, 3])); } while (a1 * b2 - a2 * b1 === 0);
      const lin = (a, b) => madd(G.mscale(X, F(a)), G.mscale(Y, F(b)));
      const A = lin(a1, b1), B = lin(a2, b2);
      const D = a1 * b2 - a2 * b1;
      const numX = msub(G.mscale(A, F(b2)), G.mscale(B, F(b1)));   // b2 A - b1 B = D X
      const numY = msub(G.mscale(B, F(a1)), G.mscale(A, F(a2)));   // a1 B - a2 A = D Y
      const steps = [
        'Eliminamos ' + i$('Y') + ': multiplicamos la 1.ª ecuación por ' + i$(String(b2)) + ' y la 2.ª por ' + i$(String(b1)) + ' y restamos: ' +
          d$('(' + a1 * b2 + ')X-(' + a2 * b1 + ')X=' + b2 + 'A-' + (b1 < 0 ? '(' + b1 + ')' : b1) + 'B\\ \\Rightarrow\\ ' + D + 'X=' + b2 + 'A-' + (b1 < 0 ? '(' + b1 + ')' : b1) + 'B'),
        'Sustituimos ' + i$('A') + ' y ' + i$('B') + ': ' + d$('X=\\frac{1}{' + D + '}\\left[' + mtex(G.mscale(A, F(b2))) + '-' + mtex(G.mscale(B, F(b1))) + '\\right]=\\frac{1}{' + D + '}' + mtex(numX) + '=' + mtex(X)),
        'Eliminamos ' + i$('X') + ' de forma parecida: ' + d$(D + 'Y=' + a1 + 'B-' + (a2 < 0 ? '(' + a2 + ')' : a2) + 'A\\ \\Rightarrow\\ Y=\\frac{1}{' + D + '}' + mtex(numY) + '=' + mtex(Y)),
        'Comprobación en la 1.ª ecuación: ' + i$(sumTex(a1, 'X', b1, 'Y') + '=A') + '.',
      ];
      return {
        prompt: 'Resuelve el sistema ' + d$('\\begin{cases}' + sumTex(a1, 'X', b1, 'Y') + '=A\\\\' + sumTex(a2, 'X', b2, 'Y') + '=B\\end{cases}') + 'siendo ' + d$('A=' + mtex(A) + '\\qquad B=' + mtex(B)),
        answer: { kind: 'matrixset', parts: [{ label: 'X=', value: X }, { label: 'Y=', value: Y }] },
        steps,
        data: { X, Y, A, B, coef: [a1, b1, a2, b2] },
      };
    },
  });

  /* ===================== 9. Rango con parámetro ===================== */
  /** Matriz 3×3 con parámetro m y determinante con raíces enteras. */
  function genParam3() {
    for (let tries = 0; tries < 20000; tries++) {
      const T = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ({ a: 0, b: rnd.int(-3, 3) })));
      const slots = rnd.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, rnd.pick([2, 2, 3]));
      slots.forEach((s) => { T[Math.floor(s / 3)][s % 3] = { a: rnd.pick([1, 1, -1, 2]), b: rnd.int(-3, 3) }; });
      const cs = polyFromDet(T);
      if (cs.some((x) => x.d !== 1)) continue;
      const f = factorPoly(cs.map((x) => x.n));
      if (!f || Math.abs(f.lead) > 6 || f.roots.length > 3) continue;
      return { T, cs, f };
    }
    throw new Error('no se pudo generar la matriz con parámetro');
  }
  const evalT = (T, m) => M(T.map((r) => r.map((e) => e.a * m + e.b)));
  const paramTex = (T) => mtexStr(T.map((r) => r.map(entTex)));

  /** Un menor 2×2 no nulo de A (o null) y su texto. */
  function minor2(A) {
    for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) for (let k = 0; k < 3; k++) for (let l = k + 1; l < 3; l++) {
      const sub = [[A[i][k], A[i][l]], [A[j][k], A[j][l]]];
      const d = det(sub);
      if (d.n !== 0) return { sub, d };
    }
    return null;
  }

  G.define({
    id: 'rangoparam',
    title: 'Rango con parámetro y propiedades',
    help: [
      'Rango según $m$: calcula $|A|$ (si es $\\neq0$ el rango es 3), halla los $m$ que lo anulan y estudia cada uno por separado: rango 2 si hay algún menor $2\\times2$ no nulo; rango 1 si todas las filas son proporcionales. Propiedades: $\\operatorname{rg}(A^t)=\\operatorname{rg}(A)$, $\\operatorname{rg}(kA)=\\operatorname{rg}(A)$ si $k\\neq0$, $\\operatorname{rg}(AB)=\\operatorname{rg}(A)$ si $B$ es invertible.',
      'Ejemplo: $|A|=(m-1)(m+2)$. Si $m\\neq1,-2$: rango 3. Si $m=1$: se sustituye y se busca un menor de orden 2 distinto de 0: si existe, rango 2. Si una fila es suma de otras, $|A|=0$ para todo $m$ y el rango baja a 2 como mucho. Si $A$ es invertible, $\\operatorname{rg}(A^{-1})=n$.',
    ],
    params: [
      { key: 'tipo', label: 'Tipo', options: [['gen', 'Según m (determinante)'], ['suma', 'Fila que es suma'], ['prop', 'Propiedades: producto, traspuesta, inversa, k·A']] },
    ],
    generate(p) {
      if (p.tipo === 'gen') {
        const { T, cs, f } = genParam3();
        const ranks = f.roots.map(({ r }) => rankOf(evalT(T, r)));
        const steps = ['Determinante: ' + d$('|A|=\\begin{vmatrix}' + T.map((r) => r.map(entTex).join('&')).join('\\\\') + '\\end{vmatrix}=' + polyTex(cs) + '=' + factorTex(f)),
          'Si ' + i$('m\\notin\\{' + f.roots.map(({ r }) => r).join(',') + '\\}') + ', ' + i$('|A|\\neq0') + ' y ' + i$('\\operatorname{rg}(A)=3') + '.'];
        f.roots.forEach(({ r }, i) => {
          const Ar = evalT(T, r);
          const mn = minor2(Ar);
          steps.push('Si ' + i$('m=' + r) + ': ' + d$('A=' + mtex(Ar)) + (ranks[i] === 2 && mn
            ? 'Como ' + i$('|A|=0') + ' y hay un menor de orden 2 no nulo, ' + i$('\\begin{vmatrix}' + mn.sub.map((row) => row.map(ftex).join('&')).join('\\\\') + '\\end{vmatrix}=' + ftex(mn.d) + '\\neq0') + ', el rango es <b>2</b>.'
            : 'Todos los menores de orden 2 son nulos (las filas son proporcionales) y hay elementos no nulos: el rango es <b>' + ranks[i] + '</b>.'));
        });
        return {
          prompt: 'Halla el rango de ' + d$('A=' + paramTex(T)) + 'según los valores de ' + i$('m') + '.',
          answer: { kind: 'matrix', value: row(ranks.concat([3]).map((x) => F(x))), colLabels: f.roots.map(({ r }) => '\\operatorname{rg}\\ (m=' + r + ')').concat(['\\operatorname{rg}\\ (\\text{otro }m)']) },
          steps,
          data: { T, roots: f.roots, ranks },
        };
      }
      if (p.tipo === 'suma') {
        for (;;) {
          const r1 = Array.from({ length: 3 }, () => rnd.int(-3, 3));
          if (r1.filter((x) => x !== 0).length < 2) continue;
          const j = rnd.pick([0, 1, 2].filter((x) => r1[x] !== 0));
          const lam = rnd.pick([-2, 2, 3, 1]);
          const m0 = lam * r1[j];
          const T = [
            r1.map((x) => ({ a: 0, b: x })),
            r1.map((x, k) => (k === j ? { a: 1, b: 0 } : { a: 0, b: lam * x })),
            r1.map((x, k) => (k === j ? { a: 1, b: x } : { a: 0, b: (1 + lam) * x })),
          ];
          return {
            prompt: 'Halla el rango de ' + d$('A=' + paramTex(T)) + 'según los valores de ' + i$('m') + '.',
            answer: { kind: 'matrix', value: row([F(1), F(2)]), colLabels: ['\\operatorname{rg}\\ (m=' + m0 + ')', '\\operatorname{rg}\\ (\\text{otro }m)'] },
            steps: [
              'Observa que ' + i$('F_3=F_1+F_2') + ': por tanto ' + i$('|A|=0') + ' para todo ' + i$('m') + ' y ' + i$('\\operatorname{rg}(A)\\le2') + '.',
              'El rango es 1 sólo si ' + i$('F_2') + ' es proporcional a ' + i$('F_1') + '. Con las componentes que no dependen de ' + i$('m') + ', ' + i$('F_2=' + lam + '\\,F_1') + '.',
              'Entonces ' + i$('m=' + lam + '\\cdot(' + r1[j] + ')=' + m0) + ': en ese caso ' + i$('F_2') + ' y ' + i$('F_3') + ' son múltiplos de ' + i$('F_1') + ' y el rango es <b>1</b>.',
              'Para cualquier otro ' + i$('m') + ' las filas ' + i$('F_1') + ' y ' + i$('F_2') + ' no son proporcionales, así que el rango es <b>2</b>.',
            ],
            data: { T, m0, r1, lam },
          };
        }
      }
      // propiedades
      const r = rnd.pick([2, 3]);
      let A;
      for (;;) {
        if (r === 3) { A = randMat(3, 3, -3, 3); if (rankOf(A) !== 3) continue; }
        else {
          const base = randMat(2, 3, -3, 3);
          if (rankOf(base) !== 2) continue;
          const c1 = rnd.pick([-2, -1, 1, 2]), c2 = rnd.pick([-2, -1, 0, 1, 2]);
          const third = base[0].map((x, j) => G.fadd(G.fmul(F(c1), x), G.fmul(F(c2), base[1][j])));
          A = rnd.shuffle([base[0], base[1], third]);
          if (rankOf(A) !== 2) continue;
        }
        break;
      }
      const B = unimodular(3, 4);
      const k = rnd.pick([2, 3, -2, -1]);
      const opts = [
        { tex: 'A^{t}', M: mT(A), why: 'la traspuesta tiene el mismo rango: ' + i$('\\operatorname{rg}(A^t)=\\operatorname{rg}(A)') },
        { tex: k + 'A', M: G.mscale(A, F(k)), why: 'multiplicar por ' + i$('k=' + k + '\\neq0') + ' no cambia el rango: ' + i$('\\operatorname{rg}(kA)=\\operatorname{rg}(A)') },
        { tex: 'A\\cdot B', M: mmul(A, B), why: i$('B') + ' es invertible (' + i$('|B|=' + det(B).n) + '), y multiplicar por una matriz invertible no cambia el rango: ' + i$('\\operatorname{rg}(AB)=\\operatorname{rg}(A)') },
        { tex: 'B\\cdot A', M: mmul(B, A), why: i$('B') + ' es invertible (' + i$('|B|=' + det(B).n) + '), y multiplicar por una matriz invertible no cambia el rango: ' + i$('\\operatorname{rg}(BA)=\\operatorname{rg}(A)') },
        { tex: 'A^{t}B', M: mmul(mT(A), B), why: 'la traspuesta conserva el rango y ' + i$('B') + ' es invertible (' + i$('|B|=' + det(B).n) + '): ' + i$('\\operatorname{rg}(A^tB)=\\operatorname{rg}(A)') },
      ];
      if (r === 3) opts.push({ tex: 'A^{-1}', M: inverse(A), why: i$('A') + ' es invertible (rango 3), luego ' + i$('A^{-1}') + ' también lo es: rango 3' });
      const o = rnd.pick(opts);
      const g = gaussSteps(A);
      return {
        prompt: 'Sabiendo que ' + d$('A=' + mtex(A) + '\\qquad B=' + mtex(B)) + 'calcula ' + i$('\\operatorname{rg}(' + o.tex + ')') + ' <b>sin hacer el producto</b>.',
        answer: { kind: 'number', label: '\\operatorname{rg}(' + o.tex + ')=', value: F(rankOf(o.M)) },
        steps: [
          'Rango de ' + i$('A') + ' por Gauss: ' + (g.steps.length ? d$('A\\sim' + mtex(M(g.steps[g.steps.length - 1].M))) : '') + i$('\\operatorname{rg}(A)=' + g.rank) + '.',
          'Propiedad: ' + o.why + '.',
          'Por tanto ' + d$('\\operatorname{rg}(' + o.tex + ')=' + rankOf(o.M)),
        ],
        data: { A, B, expr: o.M },
      };
    },
  });

  // Utilidades compartidas con los demás temas de álgebra lineal.
  G.lib = { randMat, unimodular, invSteps, gjInvSteps, gaussSteps, detSteps, entTex, polyFromDet, polyTex, factorPoly, factorTex, genParam3 };
})(typeof globalThis !== 'undefined' ? globalThis : this);
