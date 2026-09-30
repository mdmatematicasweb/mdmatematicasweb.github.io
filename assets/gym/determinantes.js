/* Ejercicios interactivos — 2º Bachillerato, tema 2: Determinantes.
 * Reutiliza los módulos "determinante", "inversa" y "parametrica" de matrices.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, fmul, fdiv, ftex, ftexp, mT, mmul, mpow, mscale, inverse, d$, i$ } = G;

  /* ===================== Propiedades de los determinantes ===================== */
  const pw = (x, n) => Math.pow(x, n);
  const PROPS = [
    { tex: '|A^{t}|', B: false, build: (A) => mT(A), val: (d) => F(d),
      prop: () => '|A^{t}|=|A|', calc: (d) => '=' + d },
    { tex: '|kA|', B: false, k: true, build: (A, B, k) => mscale(A, F(k)), val: (d, e, n, k) => F(pw(k, n) * d),
      prop: (n, k) => '|' + k + 'A|=' + ftexp(F(k)) + '^{' + n + '}\\,|A|\\quad(\\text{cada una de las }' + n + '\\text{ filas se multiplica por }' + k + ')',
      calc: (d, e, n, k) => '=' + ftexp(F(k)) + '^{' + n + '}\\cdot' + ftexp(F(d)) + '=' + pw(k, n) * d },
    { tex: '|A^{-1}|', B: false, build: (A) => inverse(A), val: (d) => F(1, d),
      prop: () => '|A^{-1}|=\\frac{1}{|A|}\\quad(\\text{pues }|A\\cdot A^{-1}|=|I|=1)',
      calc: (d) => '=' + ftex(F(1, d)) },
    { tex: '|A^{2}|', B: false, build: (A) => mmul(A, A), val: (d) => F(d * d),
      prop: () => '|A^{2}|=|A\\cdot A|=|A|\\cdot|A|', calc: (d) => '=' + ftexp(F(d)) + '^2=' + d * d },
    { tex: '|A^{3}|', B: false, build: (A) => mpow(A, 3), val: (d) => F(d * d * d),
      prop: () => '|A^{3}|=|A|^3', calc: (d) => '=' + ftexp(F(d)) + '^3=' + d * d * d },
    { tex: '|A\\cdot B|', B: true, build: (A, B) => mmul(A, B), val: (d, e) => F(d * e),
      prop: () => '|A\\cdot B|=|A|\\cdot|B|', calc: (d, e) => '=' + ftexp(F(d)) + '\\cdot' + ftexp(F(e)) + '=' + d * e },
    { tex: '|A^{t}\\cdot A|', B: false, build: (A) => mmul(mT(A), A), val: (d) => F(d * d),
      prop: () => '|A^{t}\\cdot A|=|A^{t}|\\cdot|A|=|A|\\cdot|A|', calc: (d) => '=' + ftexp(F(d)) + '^2=' + d * d },
    { tex: '|A^{-1}\\cdot B|', B: true, build: (A, B) => mmul(inverse(A), B), val: (d, e) => F(e, d),
      prop: () => '|A^{-1}\\cdot B|=|A^{-1}|\\cdot|B|=\\frac{|B|}{|A|}', calc: (d, e) => '=\\frac{' + e + '}{' + ftexp(F(d)) + '}=' + ftex(F(e, d)) },
    { tex: '|k\\,A\\cdot B^{t}|', B: true, k: true, build: (A, B, k) => mmul(mscale(A, F(k)), mT(B)), val: (d, e, n, k) => F(pw(k, n) * d * e),
      prop: (n, k) => '|' + k + 'A\\cdot B^{t}|=' + k + '^{' + n + '}\\,|A|\\cdot|B^{t}|=' + k + '^{' + n + '}\\,|A|\\cdot|B|',
      calc: (d, e, n, k) => '=' + ftexp(F(k)) + '^{' + n + '}\\cdot' + ftexp(F(d)) + '\\cdot' + ftexp(F(e)) + '=' + pw(k, n) * d * e },
  ];

  G.define({
    id: 'propiedades',
    title: 'Propiedades de los determinantes',
    tip: '$|A^t|=|A|$ · $|AB|=|A||B|$ · $|A^{-1}|=1/|A|$ · $|kA|=k^n|A|$ (si $A$ es de orden $n$). No se puede usar $|A+B|$.',
    params: [{ key: 'n', label: 'Orden n', options: [['2', '2'], ['3', '3'], ['4', '4']], default: '3' }],
    generate(p) {
      const n = Number(p.n);
      const d = rnd.pick([-4, -3, -2, -1, 1, 2, 3, 4, 5]);
      const e = rnd.pick([-3, -2, -1, 1, 2, 3, 4]);
      const k = rnd.pick([-2, -1, 2, 3]);
      const pr = rnd.pick(PROPS);
      const tex = pr.k ? pr.tex.replace(/k/, k) : pr.tex;
      const ans = pr.val(d, e, n, k);
      const givens = pr.B ? i$('|A|=' + d) + ' y ' + i$('|B|=' + e) : i$('|A|=' + d);
      return {
        prompt: 'Sean ' + i$('A') + (pr.B ? ' y ' + i$('B') : '') + ' matrices cuadradas de orden ' + i$(String(n)) + (pr.B ? ' con ' : ' con ') + givens + '. Calcula ' + i$(tex) + '.',
        answer: { kind: 'number', label: tex + '=', value: ans },
        steps: [
          'Propiedad que se aplica: ' + d$(pr.prop(n, k)),
          'Sustituimos los datos: ' + d$(tex + pr.calc(d, e, n, k)),
        ],
        data: { n, d, e, k, build: pr.build },
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
    tip: 'Intercambiar dos filas cambia el signo · multiplicar una fila por $c$ multiplica el determinante por $c$ · sumar a una fila un múltiplo de otra no lo cambia.',
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
            log.push({ op: 'F_' + (i + 1) + '\\leftrightarrow F_' + (j + 1), why: 'Intercambiar dos filas cambia el signo', f: -1, fl: '\\cdot(-1)' });
          } else if (type === 'mul') {
            const c = rnd.pick([2, 3, -1, -2]);
            T[i] = T[i].map((x) => x * c); factor *= c;
            log.push({ op: 'F_' + (i + 1) + '\\to ' + (c === -1 ? '-' : c) + 'F_' + (i + 1), why: 'Multiplicar una fila por ' + c + ' multiplica el determinante por ' + c, f: c, fl: '\\cdot(' + c + ')' });
          } else {
            const c = rnd.pick([-2, -1, 1, 2, 3]);
            T[i] = T[i].map((x, t2) => x + c * T[j][t2]);
            log.push({ op: 'F_' + (i + 1) + '\\to F_' + (i + 1) + (c === 1 ? '+' : c === -1 ? '-' : c < 0 ? c : '+' + c) + 'F_' + (j + 1), why: 'Sumar a una fila un múltiplo de otra no cambia el determinante', f: 1, fl: '' });
          }
        }
        const same = T.every((r, i) => r.every((x, j) => x === (i === j ? 1 : 0)));
        if (same || T.some((r) => r.every((x) => x === 0)) || factor === 0 || log.every((l) => l.f === 1)) continue;
        if (Math.abs(detInt3(T)) !== Math.abs(factor)) continue;   // coherencia interna
        const ans = factor * k;
        let run = k, steps = ['Partimos de ' + d$(origTex + '=' + k) + 'El determinante pedido se obtiene con estas operaciones entre filas, aplicadas en orden:'];
        log.forEach((l, n) => {
          const prev = run;
          run = run * l.f;
          steps.push(i$(l.op) + ': ' + l.why + '. ' + d$(prev + (l.fl || '\\ (\\text{sin cambio})') + '=' + run));
        });
        steps.push('Por tanto ' + d$(rowsTex(T) + '=' + ans));
        return {
          prompt: 'Sabiendo que ' + d$(origTex + '=' + k) + 'calcula, sin desarrollar, ' + d$(rowsTex(T)),
          answer: { kind: 'number', label: '\\text{valor}=', value: F(ans) },
          steps,
          data: { T, k, factor },
        };
      }
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
