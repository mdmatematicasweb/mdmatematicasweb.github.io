/* Ejercicios interactivos — 2º Bachillerato, tema 3: Sistemas de ecuaciones lineales.
 * Usa G.lib de matrices.js (Gauss, polinomios de parámetro...).
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const L = G.lib;
  const { rnd, F, M, fsub, fadd, fdiv, fmul, ftex, ftexp, mtex, det, rankOf, d$, i$ } = G;

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
    params: [{ key: 'hom', label: 'Tipo', options: [['no', 'Con términos independientes'], ['si', 'Homogéneo']] }],
    generate(p) {
      for (let tries = 0; tries < 20000; tries++) {
        const T = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ({ a: 0, b: rnd.int(-3, 3) })));
        const slots = rnd.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, rnd.pick([2, 2, 3]));
        slots.forEach((sl) => { T[Math.floor(sl / 3)][sl % 3] = { a: rnd.pick([1, 1, -1, 2]), b: rnd.int(-3, 3) }; });
        const cs = L.polyFromDet(T);
        if (cs.some((x) => x.d !== 1)) continue;
        const f = L.factorPoly(cs.map((x) => x.n));
        if (!f || Math.abs(f.lead) > 6 || f.roots.length > 3) continue;
        const b = p.hom === 'si' ? [0, 0, 0] : Array.from({ length: 3 }, () => rnd.int(-5, 5));
        const at = (m) => M(T.map((r) => r.map((e) => e.a * m + e.b)));
        const infos = f.roots.map(({ r }) => {
          const A = at(r), aug = M(augOf(numRows(A), b));
          const rA = rankOf(A), rAm = rankOf(aug);
          return { r, rA, rAm, t: cls(rA, rAm, 3) };
        });
        const steps = [];
        steps.push('Determinante de la matriz de coeficientes: ' + d$('|A|=\\begin{vmatrix}' + T.map((r) => r.map(L.entTex).join('&')).join('\\\\') + '\\end{vmatrix}=' + L.polyTex(cs) + '=' + L.factorTex(f)));
        if (p.hom === 'si') steps.unshift('Un sistema homogéneo siempre es compatible (tiene la solución trivial ' + i$('x=y=z=0') + '). Tiene otras soluciones si y sólo si ' + i$('\\operatorname{rg}(A)<3') + ', es decir, ' + i$('|A|=0') + '.');
        steps.push('Se anula en ' + i$(f.roots.map(({ r }) => 'm=' + r).join(',\\ ')) + '. Para cualquier otro valor, ' + i$('\\operatorname{rg}(A)=3=\\operatorname{rg}(A^*)=n') + ': ' + (p.hom === 'si' ? 'sólo la solución trivial.' : 'sistema compatible determinado.'));
        infos.forEach((q) => {
          steps.push('Si ' + i$('m=' + q.r) + ': ' + d$('A^*=' + augTex(numRows(at(q.r)).map((row, i) => row.concat([b[i]])), 3)) + i$('\\operatorname{rg}(A)=' + q.rA + '\\quad\\operatorname{rg}(A^*)=' + q.rAm) + ' → ' +
            (q.t === 2 ? '<b>incompatible</b>.' : '<b>compatible indeterminado</b>.'));
        });
        return {
          prompt: (p.hom === 'si' ? 'Dado el sistema homogéneo ' : 'Dado el sistema ') + d$(sysTex(T, b)) + (p.hom === 'si' ? 'halla los valores de ' + i$('m') + ' para los que tiene soluciones distintas de la trivial.' : 'halla los valores de ' + i$('m') + ' para los que <b>no</b> es compatible determinado.'),
          answer: { kind: 'list', label: 'm=', value: f.roots.map(({ r }) => F(r)) },
          steps,
          data: { T, b, infos },
        };
      }
      throw new Error('no se pudo generar el sistema con parámetro');
    },
  });

  /* ===================== 4. Compatible indeterminado con parámetro λ ===================== */
  const linLam = (c0, c1) => {
    const lam = c1.n === 1 && c1.d === 1 ? '\\lambda' : c1.n === -1 && c1.d === 1 ? '-\\lambda' : ftex(c1) + '\\lambda';
    if (c1.n === 0) return ftex(c0);
    if (c0.n === 0) return lam;
    return ftex(c0) + (c1.n < 0 ? '' : '+') + lam;
  };

  const lin2 = (p, q) => { const t1 = coefTerm(p, 'x', true); const t2 = coefTerm(q, 'y', t1[1] === ''); return t1.join('') + t2.join(''); };
  const rhsLam = (d, c) => (c === 0 ? String(d) : d + (c > 0 ? '-' : '+') + (Math.abs(c) === 1 ? '' : Math.abs(c)) + '\\lambda');

  G.define({
    id: 'sci',
    title: 'Sistema compatible indeterminado',
    help: [
      'Si $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=r<n$, hay $n-r$ parámetros libres. Se descarta la ecuación que es combinación de las otras y se pasa al segundo miembro la incógnita que se toma como parámetro ($z=\\lambda$).',
      'Ejemplo: ' + d$('\\begin{cases}x+y+z=6\\\\x-y=0\\end{cases}') + 'Con $z=\\lambda$: $x+y=6-\\lambda$ y $x=y$, luego $x=y=\\frac{6-\\lambda}{2}$. Solución: $\\left(3-\\frac\\lambda2,\\,3-\\frac\\lambda2,\\,\\lambda\\right)$. Cada valor de $\\lambda$ da una solución distinta.',
    ],
    params: [],
    generate() {
      for (;;) {
        const s = genDeficient(false);
        let pair = null;
        for (let i = 0; i < 3 && !pair; i++) for (let j = i + 1; j < 3 && !pair; j++) {
          if (s.A[i][0] * s.A[j][1] - s.A[j][0] * s.A[i][1] !== 0) pair = [i, j];
        }
        if (!pair) continue;
        const [i, j] = pair;
        const [p1, q1, c1] = s.A[i], [p2, q2, c2] = s.A[j];
        const d1 = s.b[i], d2 = s.b[j];
        const D = p1 * q2 - p2 * q1;
        const x0 = F(d1 * q2 - d2 * q1, D), x1 = F(-(c1 * q2 - c2 * q1), D);
        const y0 = F(p1 * d2 - p2 * d1, D), y1 = F(-(p1 * c2 - p2 * c1), D);
        const lam0 = rnd.pick([-3, -2, -1, 1, 2, 3]);
        const at = (c0, c) => fadd(c0, fmul(c, F(lam0)));
        const sol = [at(x0, x1), at(y0, y1), F(lam0)];
        return {
          prompt: 'Resuelve el sistema ' + d$(sysTex(s.A, s.b)) + 'y da la solución que corresponde a ' + i$('z=\\lambda=' + lam0) + '.',
          answer: { kind: 'matrix', label: '(x,y,z)=', value: [sol] },
          steps: [
            'Comprobamos que es compatible indeterminado: ' + i$('\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2<3') + ', así que hay 1 parámetro libre.',
            'Una de las tres ecuaciones es combinación de las otras; nos quedamos con las ecuaciones ' + (i + 1) + 'ª y ' + (j + 1) + 'ª (sus coeficientes de ' + i$('x') + ' e ' + i$('y') + ' dan un determinante no nulo, ' + i$('' + D) + ').',
            'Tomamos ' + i$('z=\\lambda') + ' y la pasamos al segundo miembro: ' + d$('\\begin{cases}' + lin2(p1, q1) + '=' + rhsLam(d1, c1) + '\\\\' + lin2(p2, q2) + '=' + rhsLam(d2, c2) + '\\end{cases}'),
            'Resolvemos por Cramer: ' + d$('x=' + linLam(x0, x1) + '\\qquad y=' + linLam(y0, y1)),
            'Solución general: ' + d$('(x,y,z)=\\left(' + linLam(x0, x1) + ',\\ ' + linLam(y0, y1) + ',\\ \\lambda\\right),\\ \\lambda\\in\\mathbb R'),
            'Para ' + i$('\\lambda=' + lam0) + ': ' + d$('(x,y,z)=(' + sol.map(ftex).join(',\\ ') + ')'),
          ],
          data: { A: s.A, b: s.b, sol: sol.map((x) => x.n / x.d) },
        };
      }
    },
  });

  /* ===================== 5. Problemas de planteamiento ===================== */
  const NAMES = ['Ana', 'Luis', 'Marta', 'Pablo', 'Lucía', 'Diego'];
  const SETS = [
    [{ s: 'bolígrafo', p: 'bolígrafos', m: 1 }, { s: 'cuaderno', p: 'cuadernos', m: 2 }, { s: 'goma', p: 'gomas', m: 1 }],
    [{ s: 'refresco', p: 'refrescos', m: 1 }, { s: 'bocadillo', p: 'bocadillos', m: 2 }, { s: 'helado', p: 'helados', m: 1 }],
    [{ s: 'kilo de manzanas', p: 'kilos de manzanas', m: 1 }, { s: 'kilo de peras', p: 'kilos de peras', m: 1 }, { s: 'kilo de naranjas', p: 'kilos de naranjas', m: 1 }],
  ];
  function cramerSteps(A, b, vs) {
    const n = vs.length;
    const D = G.det(M(A));
    const out = ['Resolvemos por Cramer. Determinante de los coeficientes: ' + d$('|A|=' + mtex(M(A), 'vmatrix') + '=' + ftex(D))];
    vs.forEach((v, j) => {
      const Aj = A.map((r, i) => r.map((x, c) => (c === j ? b[i] : x)));
      const dj = G.det(M(Aj));
      out.push(d$(v + '=\\frac{' + mtex(M(Aj), 'vmatrix') + '}{' + ftex(D) + '}=\\frac{' + ftex(dj) + '}{' + ftex(D) + '}=' + ftex(fdiv(dj, D))));
    });
    return out;
  }

  G.define({
    id: 'planteamiento',
    title: 'Problemas de planteamiento',
    help: [
      'Pasos: 1) identifica las incógnitas y nómbralas ($x,y,z$); 2) traduce cada frase del enunciado a una ecuación; 3) resuelve el sistema (Gauss o Cramer); 4) interpreta la solución con sus unidades y comprueba que tiene sentido.',
      'Ejemplo: «La suma de tres números es 12; el segundo es el doble del primero; el tercero supera al segundo en 1». Con $x,y,z$: ' + d$('\\begin{cases}x+y+z=12\\\\y=2x\\\\z=y+1\\end{cases}') + 'Se ordena cada ecuación (incógnitas a la izquierda) antes de resolver: $2x-y=0$ y $y-z=-1$.',
    ],
    params: [{ key: 'tipo', label: 'Contexto', options: [['precios', 'Precios'], ['edades', 'Edades'], ['monedas', 'Monedas']] }],
    generate(p) {
      let prompt, A, b, sol, defs, vs = ['x', 'y', 'z'];
      if (p.tipo === 'precios') {
        const set = rnd.pick(SETS);
        const price = [0, 0, 0].map(() => rnd.int(1, 5));
        for (;;) {
          A = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => rnd.int(0, 4)));
          const d = Math.abs(G.det(M(A)).n);
          if (d >= 1 && d <= 14 && A.every((r) => r.filter((x) => x > 0).length >= 2)) break;
        }
        b = A.map((r) => r.reduce((t, x, j) => t + x * price[j], 0));
        sol = price;
        const who = rnd.shuffle(NAMES).slice(0, 3);
        const phrase = (r) => r.map((x, j) => (x ? x + ' ' + (x === 1 ? set[j].s : set[j].p) : null)).filter(Boolean).join(', ').replace(/, ([^,]*)$/, ' y $1');
        prompt = who.map((w, i) => w + ' compra ' + phrase(A[i]) + ' y paga ' + b[i] + ' €.').join(' ') + ' ¿Cuánto cuesta cada uno? Llama ' + i$('x') + ' al precio del ' + set[0].s + ', ' + i$('y') + ' al del ' + set[1].s + ' y ' + i$('z') + ' al del ' + set[2].s + ' (en euros).';
        defs = 'Incógnitas: ' + i$('x') + ' precio del ' + set[0].s + ', ' + i$('y') + ' del ' + set[1].s + ', ' + i$('z') + ' del ' + set[2].s + '. Cada compra da una ecuación: (nº de artículos)·(precio) sumados = total pagado.';
      } else if (p.tipo === 'edades') {
        const x = rnd.int(3, 10), k = rnd.pick([2, 3]), dd = rnd.int(2, 6);
        const y = k * x, z = y + dd;
        A = [[1, 1, 1], [k, -1, 0], [0, 1, -1]];
        b = [x + y + z, 0, -dd];
        sol = [x, y, z];
        prompt = 'La suma de las edades de tres hermanos es ' + (x + y + z) + ' años. El mediano tiene ' + (k === 2 ? 'el doble' : 'el triple') + ' de edad que el pequeño, y el mayor le lleva ' + dd + ' años al mediano. Halla las edades. Llama ' + i$('x') + ' al pequeño, ' + i$('y') + ' al mediano y ' + i$('z') + ' al mayor.';
        defs = 'Incógnitas: ' + i$('x') + ' (pequeño), ' + i$('y') + ' (mediano), ' + i$('z') + ' (mayor). «Mediano = ' + (k === 2 ? 'doble' : 'triple') + ' del pequeño»: ' + i$('y=' + k + 'x') + '. «El mayor le lleva ' + dd + ' al mediano»: ' + i$('z=y+' + dd) + '.';
      } else {
        const c = rnd.int(1, 6), k = rnd.pick([2, 4]), a = k * c, bb = rnd.int(1, 10);
        A = [[1, 1, 1], [1, 2, 5], [1, 0, -k]];
        b = [a + bb + c, a + 2 * bb + 5 * c, 0];
        sol = [a, bb, c];
        prompt = 'Una hucha tiene ' + b[0] + ' monedas de 1 €, 2 € y 5 €, y en total ' + b[1] + ' €. Hay ' + (k === 2 ? 'el doble' : 'el cuádruple') + ' de monedas de 1 € que de 5 €. ¿Cuántas monedas hay de cada valor? Llama ' + i$('x') + ', ' + i$('y') + ' y ' + i$('z') + ' al número de monedas de 1 €, 2 € y 5 €.';
        defs = 'Incógnitas: ' + i$('x') + ', ' + i$('y') + ', ' + i$('z') + ' = nº de monedas de 1 €, 2 € y 5 €. Total de monedas: ' + i$('x+y+z=' + b[0]) + '. Valor total: ' + i$('x+2y+5z=' + b[1]) + '. «Doble/cuádruple de 1 € que de 5 €»: ' + i$('x=' + k + 'z') + '.';
      }
      const steps = [defs, 'Sistema (incógnitas a la izquierda, números a la derecha): ' + d$(sysTex(A, b))].concat(cramerSteps(A, b, vs), ['Solución: ' + d$('(x,y,z)=(' + sol.join(',') + ')') + 'Comprobamos en el enunciado que todos los datos se cumplen.']);
      return {
        prompt,
        answer: { kind: 'matrix', label: '(x,y,z)=', value: M([sol]) },
        steps,
        data: { A, b, sol },
      };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
