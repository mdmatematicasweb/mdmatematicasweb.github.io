/* Ejercicios interactivos — 2º Bachillerato, tema 2: Determinantes.
 * Reutiliza los módulos "determinante", "inversa" y "parametrica" de matrices.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, fmul, fdiv, ftex, ftexp, mT, mmul, mpow, mscale, inverse, d$, i$ } = G;

  /* ===================== Propiedades de los determinantes ===================== */
  const fpow = (x, n) => { let r = F(1); for (let i = 0; i < n; i++) r = fmul(r, x); return r; };
  // Cada factor: valor de su determinante a partir de |A|=d, |B|=e, y la matriz que representa.
  const FACTORS = [
    { base: 'A', tex: 'A', val: (d) => d, mat: (A) => A, why: '' },
    { base: 'B', tex: 'B', val: (d, e) => e, mat: (A, B) => B, why: '' },
    { base: 'A', tex: 'A^{t}', val: (d) => d, mat: (A) => mT(A), why: '|A^{t}|=|A|' },
    { base: 'B', tex: 'B^{t}', val: (d, e) => e, mat: (A, B) => mT(B), why: '|B^{t}|=|B|' },
    { base: 'A', tex: 'A^{-1}', val: (d) => fdiv(F(1), d), mat: (A) => inverse(A), why: '|A^{-1}|=\\frac{1}{|A|}', inv: true },
    { base: 'B', tex: 'B^{-1}', val: (d, e) => fdiv(F(1), e), mat: (A, B) => inverse(B), why: '|B^{-1}|=\\frac{1}{|B|}', inv: true },
    { base: 'A', tex: 'A^{2}', val: (d) => fmul(d, d), mat: (A) => mmul(A, A), why: '|A^{2}|=|A|^2' },
    { base: 'B', tex: 'B^{2}', val: (d, e) => fmul(e, e), mat: (A, B) => mmul(B, B), why: '|B^{2}|=|B|^2' },
  ];
  const DVALS = [-4, -3, -2, -1, 1, 2, 3, 4, 5].map((x) => F(x));
  const FRAC_VALS = [F(1, 2), F(-1, 2), F(1, 3), F(2, 3), F(-2, 3), F(3, 2), F(-3, 2), F(1, 4)];

  G.define({
    id: 'propiedades',
    title: 'Propiedades de los determinantes',
    help: [
      '$|A^t|=|A|$ · $|AB|=|A|\\,|B|$ · $|A^{-1}|=\\dfrac{1}{|A|}$ · $|A^m|=|A|^m$ · $|kA|=k^n|A|$ si $A$ es de orden $n$ (cada una de las $n$ filas se multiplica por $k$). <b>Nunca</b> es cierto que $|A+B|=|A|+|B|$.',
      'Método: separa la expresión en factores, aplica $|XY|=|X||Y|$, sustituye el valor de cada factor y multiplica. Ejemplo (orden 3, $|A|=2$, $|B|=-1$): ' +
        d$('|2A^{t}B^{-1}|=2^3\\cdot|A|\\cdot\\frac{1}{|B|}=8\\cdot2\\cdot(-1)=-16'),
    ],
    params: [
      { key: 'n', label: 'Orden n', options: [['2', '2'], ['3', '3'], ['4', '4']] },
      { key: 'nivel', label: 'Dificultad', options: [['1', 'Sencilla'], ['2', 'Media'], ['3', 'Compleja']] },
      { key: 'frac', label: 'Fracciones', options: [['no', 'No'], ['si', 'Sí']] },
    ],
    generate(p) {
      const n = Number(p.n), lvl = Number(p.nivel);
      const vals = p.frac === 'si' ? FRAC_VALS.concat(DVALS) : DVALS;
      const d = rnd.pick(vals), e = rnd.pick(vals);
      const count = lvl === 1 ? rnd.int(1, 2) : lvl === 2 ? rnd.int(2, 3) : rnd.int(3, 4);
      let chosen;
      for (;;) {
        chosen = Array.from({ length: count }, () => rnd.pick(FACTORS));
        const dup = new Set(chosen.map((f) => f.tex)).size !== chosen.length;
        const cancels = chosen.some((f) => f.inv && chosen.some((g) => g !== f && g.base === f.base && g.tex === f.base));
        if (dup || cancels) continue;
        if (lvl === 3 && !chosen.some((f) => f.inv || f.tex.endsWith('2}'))) continue;
        break;
      }
      const kOpts = p.frac === 'si' ? [2, 3, -1, -2, F(1, 2)] : [2, 3, -1, -2];
      const useK = lvl === 3 || (lvl === 2 && rnd.int(0, 1)) || (lvl === 1 && count === 1 && rnd.int(0, 1));
      const k = useK ? rnd.pick(kOpts) : null;
      const kF = k === null ? F(1) : (typeof k === 'number' ? F(k) : k);
      const kTex = k === null ? '' : typeof k === 'number' ? (k === -1 ? '-' : String(k)) : ftex(k);
      const usesB = chosen.some((f) => f.base === 'B');
      const tex = kTex + chosen.map((f) => f.tex).join('');
      const fv = chosen.map((f) => f.val(d, e));
      let prod = F(1);
      fv.forEach((x) => { prod = fmul(prod, x); });
      const kn = fpow(kF, n);
      const ans = fmul(kn, prod);
      // pasos
      const steps = [];
      if (k !== null) steps.push('Sacamos el escalar: cada una de las ' + n + ' filas se multiplica por ' + i$(ftex(kF)) + ', así que ' + d$('|' + tex + '|=' + ftexp(kF) + '^{' + n + '}\\,|' + chosen.map((f) => f.tex).join('') + '|=' + ftex(kn) + '\\,|' + chosen.map((f) => f.tex).join('') + '|'));
      if (chosen.length > 1) steps.push('El determinante de un producto es el producto de determinantes: ' + d$('|' + chosen.map((f) => f.tex).join('') + '|=' + chosen.map((f) => '|' + f.tex + '|').join('\\cdot')));
      const lines = chosen.map((f, i) => (f.why ? '|' + f.tex + '|=' + f.why.split('=').slice(1).join('=') + '=' + ftex(fv[i]) : '|' + f.tex + '|=' + ftex(fv[i])));
      steps.push('Valor de cada factor: ' + d$(lines.join('\\qquad ')));
      steps.push('Multiplicamos: ' + d$('|' + tex + '|=' + (k !== null ? ftexp(kn) + '\\cdot' : '') + fv.map(ftexp).join('\\cdot') + '=' + ftex(ans)));
      const mistakes = [];
      if (k !== null && n > 1 && !G.feq(kn, kF)) {
        const w = fmul(kF, prod);
        if (!G.feq(w, ans)) mistakes.push({ value: w, msg: 'el escalar sale elevado al orden: $|kA|=k^n|A|$, porque se multiplican las $n$ filas.' });
      }
      if (chosen.some((f) => f.inv)) {
        let prod2 = F(1);
        chosen.forEach((f, i) => { prod2 = fmul(prod2, f.inv ? (f.base === 'A' ? d : e) : fv[i]); });
        const w = fmul(kn, prod2);
        if (!G.feq(w, ans)) mistakes.push({ value: w, msg: '$|A^{-1}|$ no vale $|A|$: $|A^{-1}|=\\dfrac{1}{|A|}$.' });
      }
      const givens = usesB ? i$('|A|=' + ftex(d)) + ' y ' + i$('|B|=' + ftex(e)) : i$('|A|=' + ftex(d));
      return {
        prompt: 'Sean ' + i$('A') + (usesB ? ' y ' + i$('B') : '') + ' matrices cuadradas de orden ' + i$(String(n)) + ' con ' + givens + '. Calcula ' + i$('|' + tex + '|') + '.',
        answer: { kind: 'number', label: '|' + tex + '|=', value: ans },
        steps,
        mistakes,
        data: { n, d, e, kF, chosen, build: (A, B) => { let R = null; chosen.forEach((f) => { const Mx = f.mat(A, B); R = R ? mmul(R, Mx) : Mx; }); return mscale(R, kF); } },
      };
    },
  });

  /* ===================== Operaciones con filas ===================== */
  const LET = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
  function comboTex(coefs, j) {
    let s = '';
    coefs.forEach((c, k) => {
      if (!c) return;
      const L = LET[k][j];
      const body = c === 1 ? L : c === -1 ? '-' + L : c + L;
      s += s && c > 0 ? '+' + body : body;
    });
    return s || '0';
  }
  const rowsTex = (T) => '\\begin{vmatrix}' + [0, 1, 2].map((i) => [0, 1, 2].map((j) => comboTex(T[i], j)).join('&')).join('\\\\') + '\\end{vmatrix}';
  const origTex = '\\begin{vmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{vmatrix}';
  const detInt3 = (T) => G.det(G.M(T)).n;

  G.define({
    id: 'filas',
    title: 'Operaciones con filas',
    help: [
      'Intercambiar dos filas cambia el signo del determinante · multiplicar una fila por $c$ multiplica el determinante por $c$ · sumar a una fila un múltiplo de otra <b>no</b> lo cambia.',
      'Ejemplo con $|A|=3$: intercambiar $F_1\\leftrightarrow F_2$ da $-3$; $F_2\\to4F_2$ da $12$; $F_2\\to F_2+5F_1$ sigue valiendo $3$. Si haces varias operaciones seguidas, multiplica los factores de cada una: $3\\cdot(-1)\\cdot4=-12$.',
    ],
    params: [],
    generate() {
      for (;;) {
        const k = rnd.pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
        let T = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        let factor = 1;
        const log = [];
        const nOps = rnd.int(2, 3);
        for (let t = 0; t < nOps; t++) {
          const type = rnd.pick(['swap', 'mul', 'add', 'add']);
          const i = rnd.int(0, 2);
          let j = rnd.int(0, 2); if (j === i) j = (j + 1) % 3;
          if (type === 'swap') {
            [T[i], T[j]] = [T[j], T[i]]; factor *= -1;
            log.push({ type, op: 'F_' + (i + 1) + '\\leftrightarrow F_' + (j + 1), why: 'Intercambiar dos filas cambia el signo', f: -1, fl: '\\cdot(-1)' });
          } else if (type === 'mul') {
            const c = rnd.pick([2, 3, -1, -2]);
            T[i] = T[i].map((x) => x * c); factor *= c;
            log.push({ type, c, op: 'F_' + (i + 1) + '\\to ' + (c === -1 ? '-' : c) + 'F_' + (i + 1), why: 'Multiplicar una fila por ' + c + ' multiplica el determinante por ' + c, f: c, fl: '\\cdot(' + c + ')' });
          } else {
            const c = rnd.pick([-2, -1, 1, 2, 3]);
            T[i] = T[i].map((x, t2) => x + c * T[j][t2]);
            log.push({ type, c, op: 'F_' + (i + 1) + '\\to F_' + (i + 1) + (c === 1 ? '+' : c === -1 ? '-' : c < 0 ? c : '+' + c) + 'F_' + (j + 1), why: 'Sumar a una fila un múltiplo de otra no cambia el determinante', f: 1, fl: '' });
          }
        }
        const same = T.every((r, i) => r.every((x, j) => x === (i === j ? 1 : 0)));
        if (same || T.some((r) => r.every((x) => x === 0)) || factor === 0 || log.every((l) => l.f === 1)) continue;
        if (Math.abs(detInt3(T)) !== Math.abs(factor)) continue;   // coherencia interna
        const ans = factor * k;
        let run = k, steps = ['Partimos de ' + d$(origTex + '=' + k) + 'El determinante pedido se obtiene con estas operaciones entre filas, aplicadas en orden:'];
        log.forEach((l) => {
          const prev = run;
          run = run * l.f;
          steps.push(i$(l.op) + ': ' + l.why + '. ' + d$(prev + (l.fl || '\\ (\\text{sin cambio})') + '=' + run));
        });
        steps.push('Por tanto ' + d$(rowsTex(T) + '=' + ans));
        const mistakes = [];
        const alt = (fn) => log.reduce((acc, l) => acc * fn(l), k);
        const noSign = alt((l) => (l.type === 'swap' ? 1 : l.f));
        if (log.some((l) => l.type === 'swap') && noSign !== ans) mistakes.push({ value: F(noSign), msg: 'intercambiar dos filas <b>cambia el signo</b> del determinante.' });
        const addMul = alt((l) => (l.type === 'add' ? l.c : l.f));
        if (log.some((l) => l.type === 'add' && l.c !== 1) && addMul !== ans) mistakes.push({ value: F(addMul), msg: 'sumar a una fila un múltiplo de otra <b>no cambia</b> el determinante (sólo multiplicar una fila lo cambia).' });
        return {
          prompt: 'Sabiendo que ' + d$(origTex + '=' + k) + 'calcula, sin desarrollar, ' + d$(rowsTex(T)),
          answer: { kind: 'number', label: '\\text{valor}=', value: F(ans) },
          steps,
          mistakes,
          data: { T, k, factor },
        };
      }
    },
  });

  /* ===================== Ecuaciones con determinantes ===================== */
  G.define({
    id: 'deteq',
    title: 'Ecuaciones con determinantes',
    help: [
      'Desarrolla el determinante como polinomio en la incógnita, iguala al valor que te dan y resuelve la ecuación que sale (pasa todo a un miembro y factoriza).',
      'Ejemplo: $\\begin{vmatrix}x&1\\\\2&x\\end{vmatrix}=3$. Se desarrolla: $x^2-2=3\\Rightarrow x^2=5$. Otro: $x^2-x-2=4\\Rightarrow x^2-x-6=0\\Rightarrow(x-3)(x+2)=0\\Rightarrow x=3$ o $x=-2$. Comprueba siempre sustituyendo.',
    ],
    params: [],
    generate() {
      const L = G.lib;
      for (let tries = 0; tries < 40000; tries++) {
        const T = L.randParamT();
        const cs = L.polyFromDet(T);
        if (cs.some((x) => x.d !== 1)) continue;
        const r0 = rnd.int(-4, 4);
        const at = (m) => G.det(G.M(T.map((r) => r.map((e) => e.a * m + e.b)))).n;
        const k = at(r0);
        if (k === 0 || Math.abs(k) > 40) continue;
        const c2 = cs.map((x) => x.n); c2[0] -= k;
        const f = L.factorPoly(c2);
        if (!f || Math.abs(f.lead) > 6 || f.roots.length > 3) continue;
        return {
          prompt: 'Halla los valores de ' + i$('m') + ' para los que ' + d$('\\begin{vmatrix}' + T.map((r) => r.map(L.entTex).join('&')).join('\\\\') + '\\end{vmatrix}=' + k),
          answer: { kind: 'list', label: 'm=', value: f.roots.map(({ r }) => F(r)) },
          steps: [
            'Desarrollamos el determinante: ' + d$('\\begin{vmatrix}' + T.map((r) => r.map(L.entTex).join('&')).join('\\\\') + '\\end{vmatrix}=' + L.polyTex(cs)),
            'Igualamos a ' + i$(String(k)) + ' y pasamos todo al primer miembro: ' + d$(L.polyTex(cs) + '=' + k + '\\ \\Rightarrow\\ ' + L.polyTex(c2.map((x) => F(x))) + '=0'),
            'Factorizamos: ' + d$(L.factorTex(f) + '=0\\ \\Rightarrow\\ ' + f.roots.map(({ r }) => 'm=' + r).join('\\ \\text{ o }\\ ')),
          ],
          data: { T, k, roots: f.roots },
        };
      }
      throw new Error('no se pudo generar la ecuación con determinantes');
    },
  });

  /* ===================== Fila que es una suma ===================== */
  const L3 = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
  const vm3 = (rows) => '\\begin{vmatrix}' + rows.map((r) => r.join('&')).join('\\\\') + '\\end{vmatrix}';
  const cfx = (k, x, first) => (k === 1 ? (first ? '' : '+') : k === -1 ? '-' : (k > 0 && !first ? '+' : '') + k) + x;

  G.define({
    id: 'filasuma',
    title: 'Fila que es una suma',
    help: [
      'El determinante es <b>lineal en cada fila</b>: si una fila es suma de dos, el determinante se separa en dos determinantes (con las demás filas iguales); y si una fila está multiplicada por un número, ese número sale fuera: $|\\ldots\\ \\alpha F+\\beta F^{\\prime}\\ \\ldots|=\\alpha|\\ldots F\\ldots|+\\beta|\\ldots F^{\\prime}\\ldots|$.',
      'Ejemplo: si ' + d$('\\begin{vmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{vmatrix}=2\\quad\\text{y}\\quad\\begin{vmatrix}a^{\\prime}&b^{\\prime}&c^{\\prime}\\\\d&e&f\\\\g&h&i\\end{vmatrix}=5') + 'entonces ' + d$('\\begin{vmatrix}a+a^{\\prime}&b+b^{\\prime}&c+c^{\\prime}\\\\d&e&f\\\\g&h&i\\end{vmatrix}=2+5=7') + 'Cuidado: el determinante <b>no</b> es lineal en toda la matriz, sólo fila a fila.',
    ],
    params: [{ key: 'fila', label: 'Fila que varía', options: [['1', '1.ª'], ['2', '2.ª'], ['3', '3.ª']] }],
    generate(p) {
      const r = Number(p.fila) - 1;
      const al = rnd.pick([1, 1, 2, 3, -1]), be = rnd.pick([1, 2, -1, -2, 3]);
      const P = rnd.pick([-4, -3, -2, -1, 1, 2, 3, 4, 5]), Q = rnd.pick([-4, -3, -2, -1, 1, 2, 3, 4, 5]);
      const rowA = L3[r], rowB = rowA.map((x) => x + '^{\\prime}');
      const mat = (row) => L3.map((x, i) => (i === r ? row : x));
      const comb = rowA.map((x, j) => cfx(al, x, true) + cfx(be, rowB[j], false));
      const ans = al * P + be * Q;
      const mistakes = [];
      if (al !== 1 || be !== 1) mistakes.push({ value: F(P + Q), msg: 'cada determinante se multiplica por el número que acompaña a su fila: $\\alpha|\\ldots|+\\beta|\\ldots|$.' });
      if (P * Q !== ans) mistakes.push({ value: F(al * be * P * Q), msg: 'el determinante de una fila suma es la <b>suma</b> de determinantes, no el producto.' });
      return {
        prompt: 'Sabiendo que ' + d$(vm3(mat(rowA)) + '=' + P + '\\qquad\\text{y}\\qquad ' + vm3(mat(rowB)) + '=' + Q) + 'calcula ' + d$(vm3(mat(comb))),
        answer: { kind: 'number', label: '\\text{valor}=', value: F(ans) },
        steps: [
          'Sólo cambia la fila ' + (r + 1) + ' y es combinación de las filas de los dos determinantes dados. Por linealidad en esa fila: ' + d$(vm3(mat(comb)) + '=' + (al === 1 ? '' : al) + vm3(mat(rowA)) + (be < 0 ? '' : '+') + (be === 1 ? '' : be) + vm3(mat(rowB))),
          'Sustituimos los valores: ' + d$('=' + al + '\\cdot(' + P + ')' + (be < 0 ? '' : '+') + '(' + be + ')\\cdot(' + Q + ')=' + ans),
        ],
        mistakes,
        data: { P, Q, al, be },
      };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
