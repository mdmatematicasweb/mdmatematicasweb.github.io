/* Ejercicios interactivos — 2º Bachillerato, tema 3: Sistemas de ecuaciones lineales.
 * Usa G.lib de matrices.js (Gauss, polinomios de parámetro...).
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const L = G.lib;
  const { rnd, F, M, fsub, fdiv, fmul, ftex, ftexp, mtex, det, rankOf, d$, i$ } = G;

  const VARS = ['x', 'y', 'z'];

  /* ---------- TeX del sistema ---------- */
  function coefTerm(c, v, first) {
    // c: entero o {a,b} con parámetro. Devuelve [op, término]
    if (typeof c === 'object' && c.a !== 0) return [first ? '' : '+', '(' + L.entTex(c) + ')' + v];
    const k = typeof c === 'object' ? c.b : c;
    if (k === 0) return ['', ''];
    const mag = Math.abs(k) === 1 ? '' : String(Math.abs(k));
    if (first) return ['', (k < 0 ? '-' : '') + mag + v];
    return [k < 0 ? '-' : '+', mag + v];
  }
  function sysTex(A, b) {
    const n = A[0].length;
    const rowsTex = A.map((row, i) => {
      const c = [];
      let first = true;
      row.forEach((e, j) => {
        const [op, t] = coefTerm(e, VARS[j], first);
        if (t) first = false;
        c.push(op, t);
      });
      c.push('=', String(b[i]));
      return c.join('&');
    });
    return '\\left\\{\\begin{array}{' + 'cr'.repeat(n + 1) + '}' + rowsTex.join('\\\\') + '\\end{array}\\right.';
  }
  const augTex = (R, n) => '\\left(\\begin{array}{' + 'c'.repeat(n) + '|c}' + R.map((r) => r.join('&')).join('\\\\') + '\\end{array}\\right)';
  const numRows = (A) => A.map((r) => r.map((x) => (typeof x === 'number' ? x : x.n)));
  const augOf = (A, b) => A.map((r, i) => r.concat([b[i]]));

  const SYS_LABELS = ['Compatible determinado (SCD)', 'Compatible indeterminado (SCI)', 'Incompatible (SI)'];
  const cls = (rA, rAm, n) => (rA < rAm ? 2 : rA === n ? 0 : 1);   // 0 SCD, 1 SCI, 2 SI

  /* ---------- Generadores de sistemas numéricos ---------- */
  function genSCD(n) {
    for (;;) {
      const A = L.randMat(n, n, -3, 3);
      const d = Math.abs(det(A).n);
      if (d < 1 || d > (n === 2 ? 9 : 12)) continue;
      const sol = Array.from({ length: n }, () => rnd.int(-4, 4));
      const b = A.map((r) => r.reduce((s, x, j) => s + x.n * sol[j], 0));
      return { A: numRows(A), b, sol };
    }
  }
  function genDeficient(incompat) {
    for (;;) {
      const r1 = Array.from({ length: 3 }, () => rnd.int(-3, 3));
      const r2 = Array.from({ length: 3 }, () => rnd.int(-3, 3));
      const b1 = rnd.int(-6, 6), b2 = rnd.int(-6, 6);
      const c1 = rnd.pick([-2, -1, 1, 2]), c2 = rnd.pick([-2, -1, 0, 1, 2]);
      const r3 = r1.map((x, j) => c1 * x + c2 * r2[j]);
      let b3 = c1 * b1 + c2 * b2;
      if (incompat) b3 += rnd.pick([-3, -2, -1, 1, 2, 3]);
      const order = rnd.shuffle([0, 1, 2]);
      const A = order.map((i) => [r1, r2, r3][i]), b = order.map((i) => [b1, b2, b3][i]);
      if (rankOf(M(A)) !== 2) continue;
      if (incompat && rankOf(M(augOf(A, b))) !== 3) continue;
      if (Math.max(...A.map((r) => Math.max(...r.map(Math.abs)))) > 7) continue;
      return { A, b };
    }
  }

  /* ===================== 1. Clasificar (Rouché–Fröbenius) ===================== */
  G.define({
    id: 'clasificar',
    title: 'Clasificar un sistema (Rouché–Fröbenius)',
    help: [
      'Rouché–Fröbenius con $n$ incógnitas: si $\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$, incompatible; si $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=n$, compatible determinado; si son iguales y menores que $n$, compatible indeterminado.',
      'Método: escribe la matriz ampliada $A^*$ (coeficientes | términos independientes), escalónala por Gauss y cuenta filas no nulas en $A$ y en $A^*$. Una fila $(0\\ 0\\ 0\\,|\\,c)$ con $c\\neq0$ significa $0=c$: incompatible. Ejemplo: ' + d$('\\left(\\begin{array}{cc|c}1&1&2\\\\2&2&5\\end{array}\\right)\\xrightarrow{F_2\\to F_2-2F_1}\\left(\\begin{array}{cc|c}1&1&2\\\\0&0&1\\end{array}\\right)') + '$\\operatorname{rg}(A)=1<\\operatorname{rg}(A^*)=2$: incompatible.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['0', 'Compatible determinado'], ['1', 'Compatible indeterminado'], ['2', 'Incompatible']] }],
    generate(p) {
      const t = Number(p.tipo);
      const s = t === 0 ? genSCD(3) : genDeficient(t === 2);
      const aug = augOf(s.A, s.b);
      const g = L.gaussSteps(M(aug));
      const rAm = g.rank;
      const rA = g.final.filter((r) => r.slice(0, 3).some((x) => x !== 0)).length;
      const steps = [
        'Matriz de coeficientes ' + i$('A') + ' y matriz ampliada ' + i$('A^*') + ': ' + d$('A^*=' + augTex(aug, 3)),
        'Escalonamos ' + i$('A^*') + ' con operaciones entre filas:',
      ];
      g.steps.forEach((st) => steps.push(i$(st.ops.join(',\\ ')) + d$('\\sim' + augTex(st.M, 3))));
      steps.push('Filas no nulas en la parte de ' + i$('A') + ': ' + i$('\\operatorname{rg}(A)=' + rA) + '. Filas no nulas en ' + i$('A^*') + ': ' + i$('\\operatorname{rg}(A^*)=' + rAm) + '. Número de incógnitas: ' + i$('n=3') + '.');
      steps.push(t === 2 ? 'Como ' + i$(rA + '\\neq ' + rAm) + ', el sistema es <b>incompatible</b>.'
        : t === 0 ? 'Como ' + i$('\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=n=3') + ', el sistema es <b>compatible determinado</b>.'
          : 'Como ' + i$('\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=' + rA + '<n=3') + ', el sistema es <b>compatible indeterminado</b>.');
      return {
        prompt: 'Clasifica el sistema: ' + d$(sysTex(s.A, s.b)),
        answer: { kind: 'choice', options: SYS_LABELS, value: t },
        steps,
        data: { A: s.A, b: s.b, t, rA, rAm },
      };
    },
  });

  /* ===================== 2. Resolver SCD (Cramer / Gauss) ===================== */
  G.define({
    id: 'resolver',
    title: 'Resolver un sistema compatible determinado',
    help: [
      'Cramer: $x_i=\\dfrac{|A_i|}{|A|}$, donde $A_i$ es $A$ con la columna $i$ cambiada por los términos independientes (vale si $|A|\\neq0$). Gauss: se escalona la matriz ampliada y se despeja de la última ecuación hacia arriba.',
      'Ejemplo Cramer: ' + d$('\\begin{cases}x+y=3\\\\x-y=1\\end{cases}\\quad |A|=\\begin{vmatrix}1&1\\\\1&-1\\end{vmatrix}=-2,\\ \\ x=\\frac{\\begin{vmatrix}3&1\\\\1&-1\\end{vmatrix}}{-2}=\\frac{-4}{-2}=2,\\ \\ y=\\frac{\\begin{vmatrix}1&3\\\\1&1\\end{vmatrix}}{-2}=\\frac{-2}{-2}=1') + 'Con Gauss: ' + i$('F_2\\to F_2-F_1') + ' da $-2y=-2$, luego $y=1$ y, sustituyendo arriba, $x=2$.',
    ],
    params: [
      { key: 'n', label: 'Incógnitas', options: [['2', '2'], ['3', '3']] },
      { key: 'metodo', label: 'Resolución', options: [['cramer', 'Cramer'], ['gauss', 'Gauss']] },
    ],
    generate(p) {
      const n = Number(p.n);
      const s = genSCD(n);
      const A = M(s.A);
      const vs = VARS.slice(0, n);
      const steps = [];
      if (p.metodo === 'cramer') {
        const D = det(A);
        steps.push('Determinante de la matriz de coeficientes: ' + d$('|A|=' + mtex(A, 'vmatrix') + '=' + ftex(D)) + 'Es distinto de 0: el sistema es compatible determinado.');
        vs.forEach((v, j) => {
          const Aj = s.A.map((r, i) => r.map((x, c) => (c === j ? s.b[i] : x)));
          const dj = det(M(Aj));
          steps.push('Sustituimos la columna de ' + i$(v) + ' por los términos independientes: ' + d$(v + '=\\frac{' + mtex(M(Aj), 'vmatrix') + '}{|A|}=\\frac{' + ftex(dj) + '}{' + ftex(D) + '}=' + ftex(fdiv(dj, D))));
        });
      } else {
        const aug = augOf(s.A, s.b);
        const g = L.gaussSteps(M(aug));
        steps.push('Matriz ampliada: ' + d$(augTex(aug, n)));
        g.steps.forEach((st) => steps.push(i$(st.ops.join(',\\ ')) + d$('\\sim' + augTex(st.M, n))));
        const U = g.final;
        steps.push('Sistema escalonado: ' + d$(sysTex(U.map((r) => r.slice(0, n)), U.map((r) => r[n]))) + 'Despejamos de abajo arriba:');
        const vals = [];
        for (let i = n - 1; i >= 0; i--) {
          let num = F(U[i][n]);
          let numTex = String(U[i][n]);
          for (let j = i + 1; j < n; j++) {
            if (U[i][j] === 0) continue;
            num = fsub(num, fmul(F(U[i][j]), vals[j]));
            numTex += '-' + (U[i][j] < 0 ? '(' + U[i][j] + ')' : U[i][j]) + '\\cdot' + ftexp(vals[j]);
          }
          vals[i] = fdiv(num, F(U[i][i]));
          steps.push(d$(vs[i] + '=\\frac{' + numTex + '}{' + U[i][i] + '}=' + ftex(vals[i])));
        }
      }
      const sol = M([s.sol]);
      steps.push('Solución: ' + d$('(' + vs.join(',') + ')=(' + s.sol.join(',') + ')'));
      return {
        prompt: 'Resuelve el sistema por ' + (p.metodo === 'cramer' ? 'la regla de Cramer' : 'el método de Gauss') + ': ' + d$(sysTex(s.A, s.b)),
        answer: { kind: 'matrix', label: '(' + vs.join(',') + ')=', value: sol },
        steps,
        data: { A: s.A, b: s.b, sol: s.sol },
      };
    },
  });

  /* ===================== 3. Discutir con parámetro ===================== */
  G.define({
    id: 'discutir',
    title: 'Discusión de un sistema con parámetro',
    help: [
      'Los valores críticos de $m$ son los que anulan $|A|$. Para cada uno se compara $\\operatorname{rg}(A)$ con $\\operatorname{rg}(A^*)$ (Rouché–Fröbenius). Para cualquier otro valor, $|A|\\neq0$ y el sistema es compatible determinado.',
      'Método: 1) calcula $|A(m)|$ y resuelve $|A|=0$; 2) sustituye cada valor crítico y calcula los dos rangos: distintos $\\Rightarrow$ incompatible, iguales (y $<3$) $\\Rightarrow$ compatible indeterminado; 3) los demás valores de $m$ dan sistema compatible determinado. Ejemplo: $|A|=m(m-1)\\Rightarrow$ casos críticos $m=0$ y $m=1$.',
    ],
    params: [],
    generate() {
      for (let tries = 0; tries < 20000; tries++) {
        const T = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ({ a: 0, b: rnd.int(-3, 3) })));
        const slots = rnd.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, rnd.pick([2, 2, 3]));
        slots.forEach((sl) => { T[Math.floor(sl / 3)][sl % 3] = { a: rnd.pick([1, 1, -1, 2]), b: rnd.int(-3, 3) }; });
        const cs = L.polyFromDet(T);
        if (cs.some((x) => x.d !== 1)) continue;
        const f = L.factorPoly(cs.map((x) => x.n));
        if (!f || Math.abs(f.lead) > 6 || f.roots.length > 3) continue;
        const b = Array.from({ length: 3 }, () => rnd.int(-5, 5));
        const at = (m) => M(T.map((r) => r.map((e) => e.a * m + e.b)));
        const infos = f.roots.map(({ r }) => {
          const A = at(r), aug = M(augOf(numRows(A), b));
          const rA = rankOf(A), rAm = rankOf(aug);
          return { r, rA, rAm, t: cls(rA, rAm, 3) };
        });
        const steps = [];
        steps.push('Determinante de la matriz de coeficientes: ' + d$('|A|=\\begin{vmatrix}' + T.map((r) => r.map(L.entTex).join('&')).join('\\\\') + '\\end{vmatrix}=' + L.polyTex(cs) + '=' + L.factorTex(f)));
        steps.push('Se anula en ' + i$(f.roots.map(({ r }) => 'm=' + r).join(',\\ ')) + '. Para cualquier otro valor, ' + i$('\\operatorname{rg}(A)=3=\\operatorname{rg}(A^*)=n') + ': sistema compatible determinado.');
        infos.forEach((q) => {
          steps.push('Si ' + i$('m=' + q.r) + ': ' + d$('A^*=' + augTex(numRows(at(q.r)).map((row, i) => row.concat([b[i]])), 3)) + i$('\\operatorname{rg}(A)=' + q.rA + '\\quad\\operatorname{rg}(A^*)=' + q.rAm) + ' → ' +
            (q.t === 2 ? '<b>incompatible</b>.' : '<b>compatible indeterminado</b>.'));
        });
        return {
          prompt: 'Dado el sistema ' + d$(sysTex(T, b)) + 'halla los valores de ' + i$('m') + ' para los que <b>no</b> es compatible determinado.',
          answer: { kind: 'list', label: 'm=', value: f.roots.map(({ r }) => F(r)) },
          steps,
          data: { T, b, infos },
        };
      }
      throw new Error('no se pudo generar el sistema con parámetro');
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
