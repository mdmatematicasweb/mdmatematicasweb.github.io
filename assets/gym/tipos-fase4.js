/* Generadores de ejercicios tipo PAU — fase 4 (análisis).
 * Tipos: limite-param, asintotas, trozos, monotonia, inflexion, extremos-abs, optimizacion, integral-def, area-curvas.
 * Cada generate() devuelve {enunciado, partes:[{texto, pts, answer, steps}], data}. Los apartados suman 2,5.
 * Los datos se diseñan hacia atrás (se eligen primero las soluciones) para que los resultados sean limpios.
 */
(function (root) {
  'use strict';
  const X = root.MDExam;
  const G = root.MDGym;
  const { rnd, F, ftex, fstr, d$, i$ } = G;

  const part = (texto, pts, answer, steps) => ({ texto, pts, answer, steps });
  const toF = (c) => (typeof c === 'number' ? F(c) : c);
  const r4 = (v) => String(Math.round(v * 1e4) / 1e4);
  const range = (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; };
  const nz = (a, b) => rnd.pick(range(a, b).filter((x) => x !== 0));
  /** Polinomio con coeficientes enteros o fracciones, de mayor a menor grado. */
  function ptex(cs, v = 'x') {
    const n = cs.length - 1;
    let s = '';
    cs.forEach((c0, i) => {
      const c = toF(c0), k = n - i;
      if (c.n === 0) return;
      const a = F(Math.abs(c.n), c.d), one = a.n === 1 && a.d === 1;
      const coef = k === 0 ? ftex(a) : one ? '' : ftex(a);
      const pw = k === 0 ? '' : k === 1 ? v : v + '^{' + k + '}';
      s += (c.n < 0 ? '-' : s ? '+' : '') + coef + pw;
    });
    return s || '0';
  }
  const sg = (c) => { c = toF(c); return (c.n < 0 ? '' : '+') + ftex(c); };           // «+3», «-3»
  const cst = (c) => (toF(c).n === 0 ? '' : sg(c));                                      // constante opcional
  const tm = (c, v) => (c === 0 ? '' : (c < 0 ? '-' : '+') + (Math.abs(c) === 1 ? '' : Math.abs(c)) + v); // término con signo
  const kx = (k, v = 'x') => (k === 1 ? v : k === -1 ? '-' + v : k + v);
  const kc = (k) => (k === 1 ? '' : k === -1 ? '-' : String(k));
  const xs = (p) => (p === 0 ? 'x' : 'x' + sg(-p));                                       // «x-p»
  const fac = (p) => (p === 0 ? 'x' : '(' + xs(p) + ')');                        // «(x-p)» o «x»
  const pa = (c) => (c < 0 ? '(' + c + ')' : String(c));
  const SEN = (u) => '\\operatorname{sen}(' + u + ')';
  const COS = (u) => '\\cos(' + u + ')';
  const LIM0 = '\\lim_{x\\to 0}';
  const LINF = '\\lim_{x\\to +\\infty}';
  const N = (label, v) => ({ kind: 'number', label, value: toF(v) });
  const E = (label, value, show) => ({ kind: 'expr', label, value, show });
  const MU = (...parts) => ({ kind: 'multi', parts });
  const CH = (label, options, value) => ({ kind: 'choice', label, options, value });
  const HINT = ' <small>(valor exacto, p. ej. <code>2*e-1</code> o <code>ln(3)/2</code>, o decimal con 3 cifras)</small>';
  const LH = 'L’Hôpital';
  /** Término c·e^{x0} en TeX y en texto evaluable. */
  const expT = (c, x0) => (c === 0 ? '0' : x0 === 0 ? String(c) : kc(c) + (x0 === 1 ? 'e' : 'e^{' + x0 + '}'));
  const expS = (c, x0) => (c === 0 ? '0' : (c === 1 ? '' : c === -1 ? '-' : c + '*') + 'e^(' + x0 + ')');

  /* ===================== limite-param ===================== */
  const LIMS = [
    function () { // (e^{kx}+ax-1)/x^2
      const k = rnd.pick([-3, -2, -1, 1, 2, 3]), a = -k, L = F(k * k, 2);
      return {
        tex: '\\dfrac{e^{' + kx(k) + '}+ax-1}{x^{2}}', P: { a }, L,
        E: (x, P) => (Math.exp(k * x) + P.a * x - 1) / (x * x),
        s1: ['En ' + i$('x=0') + ' el límite es del tipo ' + i$('\\frac{0}{0}') + ' para cualquier ' + i$('a') + '. Aplicamos ' + LH + ': ' + d$(LIM0 + '\\dfrac{' + kc(k) + 'e^{' + kx(k) + '}+a}{2x}'),
          'El denominador tiende a 0; para que el límite sea finito el numerador también debe tender a 0: ' + d$(k + '+a=0\\ \\Rightarrow\\ a=' + a)],
        s2: ['Con ' + i$('a=' + a) + ' sigue siendo ' + i$('\\frac{0}{0}') + '; aplicamos de nuevo ' + LH + ': ' + d$(LIM0 + '\\dfrac{' + kc(k) + 'e^{' + kx(k) + '}' + sg(a) + '}{2x}=' + LIM0 + '\\dfrac{' + (k * k) + 'e^{' + kx(k) + '}}{2}=' + ftex(L))],
      };
    },
    function () { // ±(ax-sen(kx))/x^3
      const k = rnd.int(1, 3), s = rnd.pick([1, -1]), a = k, L = F(s * k * k * k, 6);
      const num = s === 1 ? 'ax-' + SEN(kx(k)) : SEN(kx(k)) + '-ax';
      return {
        tex: '\\dfrac{' + num + '}{x^{3}}', P: { a }, L,
        E: (x, P) => s * (P.a * x - Math.sin(k * x)) / (x * x * x),
        s1: ['Es una indeterminación ' + i$('\\frac{0}{0}') + '. Por ' + LH + ': ' + d$(LIM0 + '\\dfrac{' + (s === 1 ? 'a-' + kc(k) + COS(kx(k)) : kc(k) + COS(kx(k)) + '-a') + '}{3x^{2}}'),
          'Para que sea finito, el numerador debe anularse en ' + i$('x=0') + ': ' + d$('a-' + k + '=0\\ \\Rightarrow\\ a=' + a)],
        s2: ['Con ' + i$('a=' + a) + ' aplicamos ' + LH + ' dos veces más: ' + d$(LIM0 + '\\dfrac{' + (s === 1 ? '' : '-') + (k * k === 1 ? '' : k * k) + SEN(kx(k)) + '}{6x}=' + LIM0 + '\\dfrac{' + kc(s * k * k * k) + COS(kx(k)) + '}{6}=' + ftex(L))],
      };
    },
    function () { // (ln(1+kx)-ax)/x^2
      const k = rnd.pick([-2, -1, 1, 2, 3]), a = k, L = F(-k * k, 2);
      const lt = '\\ln(1' + (k < 0 ? '' : '+') + kx(k) + ')';
      const den = '1' + (k < 0 ? '' : '+') + kx(k);
      return {
        tex: '\\dfrac{' + lt + '-ax}{x^{2}}', P: { a }, L,
        E: (x, P) => (Math.log(1 + k * x) - P.a * x) / (x * x),
        s1: ['Indeterminación ' + i$('\\frac{0}{0}') + '. Por ' + LH + ': ' + d$(LIM0 + '\\dfrac{\\frac{' + k + '}{' + den + '}-a}{2x}'),
          'El denominador tiende a 0, así que el numerador también debe tender a 0: ' + d$(k + '-a=0\\ \\Rightarrow\\ a=' + a)],
        s2: ['Con ' + i$('a=' + a) + ', de nuevo ' + LH + ': ' + d$(LIM0 + '\\dfrac{\\frac{' + (-k * k) + '}{(' + den + ')^{2}}}{2}=' + ftex(L))],
      };
    },
    function () { // (a+bx^2-cos(kx))/x^4
      const k = rnd.int(1, 2), a = 1, b = F(-k * k, 2), L = F(-(k ** 4), 24);
      return {
        tex: '\\dfrac{a+bx^{2}-' + COS(kx(k)) + '}{x^{4}}', P: { a, b }, L, two: true,
        E: (x, P) => (P.a + P.b * x * x - Math.cos(k * x)) / (x ** 4),
        s1: ['En ' + i$('x=0') + ' el numerador vale ' + i$('a-1') + ' y el denominador 0: si ' + i$('a\\neq1') + ' el límite es infinito. Luego ' + i$('a=1') + '.',
          'Con ' + i$('a=1') + ', por ' + LH + ' dos veces: ' + d$(LIM0 + '\\dfrac{2bx+' + kc(k) + SEN(kx(k)) + '}{4x^{3}}=' + LIM0 + '\\dfrac{2b+' + (k * k === 1 ? '' : k * k) + COS(kx(k)) + '}{12x^{2}}'),
          'Para que sea finito: ' + d$('2b+' + k * k + '=0\\ \\Rightarrow\\ b=' + ftex(b))],
        s2: ['Con esos valores, ' + LH + ' dos veces más: ' + d$(LIM0 + '\\dfrac{' + kc(-k * k * k) + SEN(kx(k)) + '}{24x}=' + LIM0 + '\\dfrac{' + kc(-(k ** 4)) + COS(kx(k)) + '}{24}=' + ftex(L))],
      };
    },
  ];
  X.implementar({
    id: 'limite-param',
    generate() {
      const v = rnd.int(0, LIMS.length - 1);
      const T = LIMS[v]();
      const P = T.P;
      const ans = T.two ? MU(N('a=', P.a), N('b=', P.b)) : N('a=', P.a);
      const Pn = {}; Object.keys(P).forEach((k) => { Pn[k] = typeof P[k] === 'number' ? P[k] : P[k].n / P[k].d; });
      return {
        enunciado: 'Considera el límite ' + d$(LIM0 + T.tex) + 'donde ' + (T.two ? i$('a') + ' y ' + i$('b') + ' son números reales.' : i$('a') + ' es un número real.'),
        partes: [
          part('Calcula ' + (T.two ? 'los valores de ' + i$('a') + ' y ' + i$('b') : 'el valor de ' + i$('a')) + ' para que el límite sea finito.', 1.5, ans, T.s1),
          part('Para ' + (T.two ? 'esos valores' : 'ese valor') + ', calcula el límite.', 1, N('\\lim=', T.L), T.s2),
        ],
        data: { v, E: T.E, P: Pn, L: T.L.n / T.L.d },
      };
    },
  });

  /* ===================== asintotas ===================== */
  const INF = ['$+\\infty$', '$-\\infty$'];
  const ASI = [
    function () { // oblicua dada: (ax^2+bx+c)/(x-p)
      const m = rnd.pick([-2, -1, 1, 2, 3]), n = rnd.int(-4, 4), p = nz(-3, 3);
      const a = m, b = n - m * p;
      let c0, Np;
      do { c0 = rnd.int(-5, 5); Np = a * p * p + b * p + c0; } while (Np === 0);
      return {
        enunciado: 'Considera la función ' + i$('f(x)=\\dfrac{ax^{2}+bx' + cst(c0) + '}{' + xs(p) + '}') + ', definida para ' + i$('x\\neq ' + p) + ', con ' + i$('a,b\\in\\mathbb{R}') + '. Se sabe que la recta ' + i$('y=' + ptex([m, n])) + ' es una asíntota oblicua de la gráfica de ' + i$('f') + '.',
        partes: [
          part('Calcula ' + i$('a') + ' y ' + i$('b') + '.', 1.5, MU(N('a=', a), N('b=', b)),
            ['Pendiente: ' + d$('m=\\lim_{x\\to\\infty}\\dfrac{f(x)}{x}=\\lim_{x\\to\\infty}\\dfrac{ax^{2}+bx' + cst(c0) + '}{x^{2}' + tm(-p, 'x') + '}=a\\ \\Rightarrow\\ a=' + m),
              'Ordenada en el origen: ' + d$('n=\\lim_{x\\to\\infty}\\big(f(x)-ax\\big)=\\lim_{x\\to\\infty}\\dfrac{(b' + sg(a * p) + ')x' + cst(c0) + '}{' + xs(p) + '}=b' + sg(a * p)),
              'Como ' + i$('n=' + n) + ': ' + i$('b' + sg(a * p) + '=' + n + '\\ \\Rightarrow\\ b=' + b)]),
          part('Para esos valores, la gráfica tiene una asíntota vertical ' + i$('x=k') + '. Halla ' + i$('k') + ' y el límite lateral ' + i$('\\lim_{x\\to k^{+}}f(x)') + '.', 1,
            MU(N('k=', p), CH('\\lim_{x\\to k^{+}}f(x)=', INF, Np > 0 ? 0 : 1)),
            ['El denominador se anula en ' + i$('x=' + p) + ' y el numerador no: ' + i$(pa(a) + '\\cdot' + pa(p) + '^{2}' + sg(b) + '\\cdot' + pa(p) + cst(c0) + '=' + Np + '\\neq0') + '. Luego ' + i$('x=' + p) + ' es asíntota vertical.',
              'Por la derecha, ' + i$(xs(p) + '\\to0^{+}') + ' y el numerador tiende a ' + i$(String(Np)) + ': ' + d$('\\lim_{x\\to ' + p + '^{+}}f(x)=\\dfrac{' + Np + '}{0^{+}}=' + (Np > 0 ? '+' : '-') + '\\infty')]),
        ],
        data: { v: 0, mk: (P) => (x) => (P.a * x * x + P.b * x + c0) / (x - p), p, m, n, Np },
      };
    },
    function () { // vertical y pendiente dadas: (ax^2+c)/(x+b)
      const p = nz(-3, 3), m = rnd.pick([-2, -1, 1, 2, 3]);
      const a = m, b = -p;
      let c;
      do { c = nz(-4, 4); } while (a * p * p + c === 0);
      const n = -a * b;
      return {
        enunciado: 'Considera la función ' + i$('f(x)=\\dfrac{ax^{2}' + sg(c) + '}{x+b}') + ', con ' + i$('a,b\\in\\mathbb{R}') + '. Se sabe que la gráfica de ' + i$('f') + ' tiene una asíntota vertical en ' + i$('x=' + p) + ' y una asíntota oblicua de pendiente ' + i$(String(m)) + '.',
        partes: [
          part('Calcula ' + i$('a') + ' y ' + i$('b') + '.', 1.25, MU(N('a=', a), N('b=', b)),
            ['La asíntota vertical está donde se anula el denominador: ' + i$('x+b=0\\Rightarrow x=-b') + '. Como es ' + i$('x=' + p) + ', ' + i$('b=' + b) + ' (el numerador no se anula allí si ' + i$('a\\cdot' + pa(p) + '^{2}' + sg(c) + '\\neq0') + ').',
              'Pendiente de la oblicua: ' + d$('m=\\lim_{x\\to\\infty}\\dfrac{f(x)}{x}=\\lim_{x\\to\\infty}\\dfrac{ax^{2}' + sg(c) + '}{x^{2}+bx}=a\\ \\Rightarrow\\ a=' + a)]),
          part('Para esos valores, la asíntota oblicua es ' + i$('y=' + kx(m) + '+n') + '. Halla ' + i$('n') + '.', 1.25, N('n=', n),
            [d$('n=\\lim_{x\\to\\infty}\\big(f(x)' + tm(-a, 'x') + '\\big)=\\lim_{x\\to\\infty}\\dfrac{' + ptex([0, -a * b, c]) + '}{' + xs(-b) + '}=' + n),
              'La asíntota oblicua es ' + i$('y=' + ptex([m, n])) + '.']),
        ],
        data: { v: 1, mk: (P) => (x) => (P.a * x * x + c) / (x + P.b), p, m },
      };
    },
    function () { // horizontal y punto: (ax^2+kx+b)/(x^2-p^2)
      const p = rnd.int(1, 3), h = nz(-3, 3), k = nz(-3, 3);
      let q, b;
      do { q = rnd.int(-3, 3); b = -p * p * q; } while (h * p * p + k * p + b === 0 || h * p * p - k * p + b === 0);
      const a = h;
      const Nv = (x) => a * x * x + k * x + b;
      return {
        enunciado: 'Considera la función ' + i$('f(x)=\\dfrac{ax^{2}' + tm(k, 'x') + '+b}{x^{2}-' + p * p + '}') + ', con ' + i$('a,b\\in\\mathbb{R}') + '. Se sabe que la recta ' + i$('y=' + h) + ' es una asíntota horizontal de su gráfica y que ésta pasa por el punto ' + i$('(0,' + q + ')') + '.',
        partes: [
          part('Calcula ' + i$('a') + ' y ' + i$('b') + '.', 1.25, MU(N('a=', a), N('b=', b)),
            ['Asíntota horizontal: ' + d$('\\lim_{x\\to\\infty}f(x)=\\lim_{x\\to\\infty}\\dfrac{ax^{2}' + tm(k, 'x') + '+b}{x^{2}-' + p * p + '}=a\\ \\Rightarrow\\ a=' + a),
              'Pasa por ' + i$('(0,' + q + ')') + ': ' + d$('f(0)=\\dfrac{b}{-' + p * p + '}=' + q + '\\ \\Rightarrow\\ b=' + b)]),
          part('Para esos valores, halla las asíntotas verticales de la gráfica de ' + i$('f') + '. <small>(escribe las abscisas separadas por punto y coma)</small>', 1.25, { kind: 'list', label: 'x=', value: [F(-p), F(p)] },
            ['El denominador se anula en ' + i$('x=\\pm' + p) + '. El numerador ' + i$(ptex([a, k, b])) + ' vale ' + i$(String(Nv(p))) + ' en ' + i$('x=' + p) + ' y ' + i$(String(Nv(-p))) + ' en ' + i$('x=-' + p) + ', no nulos.',
              'Por tanto ' + i$('x=-' + p) + ' y ' + i$('x=' + p) + ' son asíntotas verticales (los límites laterales son infinitos).']),
        ],
        data: { v: 2, mk: (P) => (x) => (P.a * x * x + k * x + P.b) / (x * x - p * p), p, h, q },
      };
    },
    function () { // exponencial: (a e^x + b)/(e^x+1)
      let h, b;
      do { h = rnd.int(-3, 3); b = rnd.int(-3, 3); } while (h === b);
      const a = h, q = F(h + b, 2);
      return {
        enunciado: 'Considera la función ' + i$('f(x)=\\dfrac{a\\,e^{x}+b}{e^{x}+1}') + ', con ' + i$('a,b\\in\\mathbb{R}') + '. Se sabe que ' + i$('y=' + h) + ' es asíntota horizontal de la gráfica de ' + i$('f') + ' cuando ' + i$('x\\to+\\infty') + ' y que ' + i$('f(0)=' + ftex(q)) + '.',
        partes: [
          part('Calcula ' + i$('a') + ' y ' + i$('b') + '.', 1.5, MU(N('a=', a), N('b=', b)),
            ['Dividimos entre ' + i$('e^{x}') + ': ' + d$(LINF + 'f(x)=' + LINF + '\\dfrac{a+b\\,e^{-x}}{1+e^{-x}}=a\\ \\Rightarrow\\ a=' + a),
              d$('f(0)=\\dfrac{a+b}{2}=' + ftex(q) + '\\ \\Rightarrow\\ b=' + b)]),
          part('Para esos valores, halla la asíntota horizontal ' + i$('y=c') + ' cuando ' + i$('x\\to-\\infty') + '.', 1, N('c=', b),
            ['Cuando ' + i$('x\\to-\\infty') + ', ' + i$('e^{x}\\to0') + ': ' + d$('\\lim_{x\\to-\\infty}\\dfrac{' + (a === 0 ? String(b) : kc(a) + 'e^{x}' + cst(b)) + '}{e^{x}+1}=\\dfrac{' + b + '}{1}=' + b),
              'La asíntota horizontal en ' + i$('-\\infty') + ' es ' + i$('y=' + b) + '.']),
        ],
        data: { v: 3, mk: (P) => (x) => (P.a * Math.exp(x) + P.b) / (Math.exp(x) + 1), h, q: q.n / q.d },
      };
    },
  ];
  X.implementar({ id: 'asintotas', generate() { return rnd.pick(ASI)(); } });

  /* ===================== trozos ===================== */
  // Trozo derecho fijo: valor y derivada en x0 (limpios).
  const DER = [
    { x0: 1, tex: '\\ln(x)', dtex: '\\dfrac{1}{x}', f: Math.log, fv: F(0), dv: F(1) },
    { x0: 1, tex: '2\\ln(x)', dtex: '\\dfrac{2}{x}', f: (x) => 2 * Math.log(x), fv: F(0), dv: F(2) },
    { x0: 1, tex: '\\dfrac{2}{x}', dtex: '-\\dfrac{2}{x^{2}}', f: (x) => 2 / x, fv: F(2), dv: F(-2) },
    { x0: 1, tex: '\\dfrac{4}{x}', dtex: '-\\dfrac{4}{x^{2}}', f: (x) => 4 / x, fv: F(4), dv: F(-4) },
    { x0: 1, tex: '\\sqrt{x}', dtex: '\\dfrac{1}{2\\sqrt{x}}', f: Math.sqrt, fv: F(1), dv: F(1, 2) },
    { x0: 1, tex: '4\\sqrt{x}', dtex: '\\dfrac{2}{\\sqrt{x}}', f: (x) => 4 * Math.sqrt(x), fv: F(4), dv: F(2) },
    { x0: 1, tex: 'x\\ln(x)', dtex: '\\ln(x)+1', f: (x) => x * Math.log(x), fv: F(0), dv: F(1) },
    { x0: 0, tex: 'e^{x}', dtex: 'e^{x}', f: Math.exp, fv: F(1), dv: F(1) },
    { x0: 0, tex: 'e^{2x}', dtex: '2e^{2x}', f: (x) => Math.exp(2 * x), fv: F(1), dv: F(2) },
    { x0: 0, tex: 'e^{-x}', dtex: '-e^{-x}', f: (x) => Math.exp(-x), fv: F(1), dv: F(-1) },
    { x0: 0, tex: SEN('2x'), dtex: '2' + COS('2x'), f: (x) => Math.sin(2 * x), fv: F(0), dv: F(2) },
    { x0: 0, tex: '\\ln(1+x)', dtex: '\\dfrac{1}{1+x}', f: (x) => Math.log(1 + x), fv: F(0), dv: F(1) },
    { x0: 0, tex: '\\dfrac{1}{1+x}', dtex: '-\\dfrac{1}{(1+x)^{2}}', f: (x) => 1 / (1 + x), fv: F(1), dv: F(-1) },
    { x0: 0, tex: COS('x') + '+3x', dtex: '-' + SEN('x') + '+3', f: (x) => Math.cos(x) + 3 * x, fv: F(1), dv: F(3) },
  ];
  const casos = (l, r, x0) => 'f(x)=\\begin{cases}' + l + '&\\text{si } x\\le ' + x0 + '\\\\' + r + '&\\text{si } x>' + x0 + '\\end{cases}';
  function trozosA() {
    const R = rnd.pick(DER), x0 = R.x0, c2 = rnd.pick([-2, -1, 1, 2]);
    const aF = G.fsub(R.dv, F(2 * c2 * x0)), bF = G.fsub(G.fsub(R.fv, F(c2 * x0 * x0)), G.fmul(aF, F(x0)));
    const left = kc(c2) + 'x^{2}+ax+b';
    const s1 = x0 === 1
      ? ['Continuidad en ' + i$('x=1') + ': ' + d$('\\lim_{x\\to1^-}f(x)=' + c2 + '+a+b,\\qquad \\lim_{x\\to1^+}f(x)=' + ftex(R.fv) + '\\ \\Rightarrow\\ ' + c2 + '+a+b=' + ftex(R.fv)),
        'Derivabilidad: ' + d$("f'(x)=\\begin{cases}" + 2 * c2 + 'x+a&x<1\\\\' + R.dtex + '&x>1\\end{cases}\\ \\Rightarrow\\ ' + 2 * c2 + '+a=' + ftex(R.dv) + '\\ \\Rightarrow\\ a=' + ftex(aF)),
        'Sustituyendo en la primera ecuación: ' + i$('b=' + ftex(bF)) + '.']
      : ['Continuidad en ' + i$('x=0') + ': ' + d$('\\lim_{x\\to0^-}f(x)=b,\\qquad \\lim_{x\\to0^+}f(x)=' + ftex(R.fv) + '\\ \\Rightarrow\\ b=' + ftex(bF)),
        'Derivabilidad: ' + d$("f'(x)=\\begin{cases}" + 2 * c2 + 'x+a&x<0\\\\' + R.dtex + '&x>0\\end{cases}\\ \\Rightarrow\\ a=' + ftex(aF))];
    return {
      tex: casos(left, R.tex, x0), x0, aF, bF, s1,
      m: R.dv, n: G.fsub(R.fv, G.fmul(R.dv, F(x0))),
      mk: (P) => ({ L: (x) => c2 * x * x + P.a * x + P.b, R: R.f }),
    };
  }
  function trozosB() { // a e^x + b | x^2+kx+c en 0
    const k = nz(-3, 3), c = rnd.int(-3, 3), a = k, b = c - k;
    const r = ptex([1, k, c]);
    return {
      tex: casos('a\\,e^{x}+b', r, 0), x0: 0, aF: F(a), bF: F(b),
      s1: ['Continuidad en ' + i$('x=0') + ': ' + d$('\\lim_{x\\to0^-}f(x)=a+b,\\qquad \\lim_{x\\to0^+}f(x)=' + c + '\\ \\Rightarrow\\ a+b=' + c),
        'Derivabilidad: ' + d$("f'(x)=\\begin{cases}a\\,e^{x}&x<0\\\\2x" + sg(k) + '&x>0\\end{cases}\\ \\Rightarrow\\ a=' + k),
        'Luego ' + i$('b=' + c + '-' + pa(a) + '=' + b) + '.'],
      m: F(k), n: F(c),
      mk: (P) => ({ L: (x) => P.a * Math.exp(x) + P.b, R: (x) => x * x + k * x + c }),
    };
  }
  function trozosC() { // a sen x + b cos x | x^2+kx+c en 0
    const k = nz(-3, 3), c = nz(-3, 3), a = k, b = c;
    return {
      tex: casos('a\\,' + SEN('x') + '+b\\cos(x)', ptex([1, k, c]), 0), x0: 0, aF: F(a), bF: F(b),
      s1: ['Continuidad en ' + i$('x=0') + ': ' + d$('\\lim_{x\\to0^-}f(x)=a\\,' + SEN('0') + '+b\\cos(0)=b,\\qquad \\lim_{x\\to0^+}f(x)=' + c + '\\ \\Rightarrow\\ b=' + c),
        'Derivabilidad: ' + d$("f'(x)=\\begin{cases}a\\cos(x)-b\\," + SEN('x') + '&x<0\\\\2x' + sg(k) + '&x>0\\end{cases}\\ \\Rightarrow\\ a=' + k)],
      m: F(k), n: F(c),
      mk: (P) => ({ L: (x) => P.a * Math.sin(x) + P.b * Math.cos(x), R: (x) => x * x + k * x + c }),
    };
  }
  function trozosD() { // x^2+kx+c | a/x + b en 1
    const k = rnd.pick([-3, -1, 1, 2, 3]), c = rnd.int(-3, 3);
    const a = -(2 + k), b = 1 + k + c - a, v1 = 1 + k + c;
    return {
      tex: casos(ptex([1, k, c]), '\\dfrac{a}{x}+b', 1), x0: 1, aF: F(a), bF: F(b),
      s1: ['Continuidad en ' + i$('x=1') + ': ' + d$('\\lim_{x\\to1^-}f(x)=' + v1 + ',\\qquad \\lim_{x\\to1^+}f(x)=a+b\\ \\Rightarrow\\ a+b=' + v1),
        'Derivabilidad: ' + d$("f'(x)=\\begin{cases}2x" + sg(k) + '&x<1\\\\-\\dfrac{a}{x^{2}}&x>1\\end{cases}\\ \\Rightarrow\\ ' + (2 + k) + '=-a\\ \\Rightarrow\\ a=' + a),
        'Luego ' + i$('b=' + v1 + '-' + pa(a) + '=' + b) + '.'],
      m: F(2 + k), n: F(v1 - (2 + k)),
      mk: (P) => ({ L: (x) => x * x + k * x + c, R: (x) => P.a / x + P.b }),
    };
  }
  X.implementar({
    id: 'trozos',
    generate() {
      const T = rnd.pick([trozosA, trozosA, trozosB, trozosC, trozosD])();
      return {
        enunciado: 'Considera la función ' + d$(T.tex) + 'con ' + i$('a,b\\in\\mathbb{R}') + '.',
        partes: [
          part('Calcula ' + i$('a') + ' y ' + i$('b') + ' para que ' + i$('f') + ' sea continua y derivable en ' + i$('x=' + T.x0) + '.', 1.5, MU(N('a=', T.aF), N('b=', T.bF)), T.s1),
          part('Para esos valores, halla la recta tangente a la gráfica de ' + i$('f') + ' en el punto de abscisa ' + i$('x=' + T.x0) + ', escrita como ' + i$('y=mx+n') + '.', 1, MU(N('m=', T.m), N('n=', T.n)),
            ['Como ' + i$('f') + ' es derivable en ' + i$('x=' + T.x0) + ': ' + i$("m=f'(" + T.x0 + ')=' + ftex(T.m)) + ' y ' + i$('f(' + T.x0 + ')=' + ftex(G.fadd(T.n, G.fmul(T.m, F(T.x0))))) + '.',
              d$('y-f(' + T.x0 + ")=f'(" + T.x0 + ')' + fac(T.x0) + '\\ \\Rightarrow\\ y=' + ptex([T.m, T.n]))]),
        ],
        data: { x0: T.x0, mk: T.mk },
      };
    },
  });

  /* ===================== monotonia ===================== */
  const EXT = ['máximo relativo', 'mínimo relativo'];
  const MONO = [
    function () { // x^3+ax^2+bx+c con extremos en p1, p2
      let p1, p2;
      do { p1 = rnd.int(-3, 2); p2 = rnd.int(p1 + 1, 3); } while ((p1 + p2) % 2 !== 0);
      const a = -3 * (p1 + p2) / 2, b = 3 * p1 * p2, c = rnd.int(-4, 4);
      const f = (x) => x ** 3 + a * x * x + b * x + c;
      return {
        enunciado: 'Considera la función ' + i$('f(x)=x^{3}+ax^{2}+bx' + cst(c)) + ', con ' + i$('a,b\\in\\mathbb{R}') + '. Se sabe que ' + i$('f') + ' tiene extremos relativos en ' + i$('x=' + p1) + ' y en ' + i$('x=' + p2) + '.',
        partes: [
          part('Calcula ' + i$('a') + ' y ' + i$('b') + '.', 1.25, MU(N('a=', a), N('b=', b)),
            [i$("f'(x)=3x^{2}+2ax+b") + ' se anula en ' + i$('x=' + p1) + ' y ' + i$('x=' + p2) + ', luego ' + d$("f'(x)=3" + fac(p1) + fac(p2) + '=' + ptex([3, -3 * (p1 + p2), 3 * p1 * p2])),
              'Identificando coeficientes: ' + i$('2a=' + (-3 * (p1 + p2)) + ',\\ b=' + b) + ', es decir, ' + i$('a=' + a + ',\\ b=' + b) + '.']),
          part('Para esos valores, halla la abscisa del máximo relativo de ' + i$('f') + ' y el valor que alcanza.', 1.25, MU(N('x=', p1), N('f(x)=', f(p1))),
            ['El signo de ' + i$("f'") + ' es ' + i$('+') + ' en ' + i$('(-\\infty,' + p1 + ')') + ', ' + i$('-') + ' en ' + i$('(' + p1 + ',' + p2 + ')') + ' y ' + i$('+') + ' en ' + i$('(' + p2 + ',+\\infty)') + ': crece, decrece y crece.',
              'Hay un máximo relativo en ' + i$('x=' + p1) + ' (y un mínimo en ' + i$('x=' + p2) + '): ' + d$('f(' + p1 + ')=' + f(p1))]),
        ],
        data: { v: 0, mk: (P) => (x) => x ** 3 + P.a * x * x + P.b * x + c, p1, p2 },
      };
    },
    function () { // (x^2+bx+c)e^x
      const r1 = rnd.int(-3, 1), r2 = rnd.int(r1 + 1, 2);
      const b = -(r1 + r2) - 2, c = r1 * r2 - b;
      const Pv = r2 * r2 + b * r2 + c;
      const f = (x) => (x * x + b * x + c) * Math.exp(x);
      return {
        enunciado: 'Considera la función ' + i$('f(x)=(' + ptex([1, b, c]) + ')\\,e^{x}') + '.',
        partes: [
          part('Estudia la monotonía de ' + i$('f') + ' y halla las abscisas de sus extremos relativos.', 1.5, MU(N('x_{\\max}=', r1), N('x_{\\min}=', r2)),
            ['Derivamos: ' + d$("f'(x)=(" + ptex([2, b]) + ')e^{x}+(' + ptex([1, b, c]) + ')e^{x}=(' + ptex([1, b + 2, b + c]) + ')\\,e^{x}'),
              'Como ' + i$('e^{x}>0') + ', ' + i$("f'(x)=0\\iff " + ptex([1, b + 2, b + c]) + '=0\\iff x=' + r1 + ',\\ x=' + r2),
              i$("f'>0") + ' en ' + i$('(-\\infty,' + r1 + ')\\cup(' + r2 + ',+\\infty)') + ' (crece) y ' + i$("f'<0") + ' en ' + i$('(' + r1 + ',' + r2 + ')') + ' (decrece): máximo relativo en ' + i$('x=' + r1) + ' y mínimo relativo en ' + i$('x=' + r2) + '.']),
          part('Calcula el valor del mínimo relativo.' + HINT, 1, E('f(x_{\\min})=', f(r2), expS(Pv, r2)),
            [d$('f(' + r2 + ')=(' + pa(r2) + '^{2}' + sg(b) + '\\cdot' + pa(r2) + cst(c) + ')\\,e^{' + r2 + '}=' + expT(Pv, r2) + '\\approx ' + r4(f(r2)))]),
        ],
        data: { v: 1, f, r1, r2 },
      };
    },
    function () { // ax + b/x con extremo en (p,q)
      const a = rnd.pick([-2, -1, 1, 2, 3]), p = nz(-3, 3), b = a * p * p, q = 2 * a * p;
      const tipo = a * p > 0 ? 1 : 0;
      return {
        enunciado: 'Considera la función ' + i$('f(x)=ax+\\dfrac{b}{x}') + ' (' + i$('x\\neq0') + '), con ' + i$('a,b\\in\\mathbb{R}') + '. Se sabe que la gráfica de ' + i$('f') + ' tiene un extremo relativo en el punto ' + i$('(' + p + ',' + q + ')') + '.',
        partes: [
          part('Calcula ' + i$('a') + ' y ' + i$('b') + '.', 1.25, MU(N('a=', a), N('b=', b)),
            [i$("f'(x)=a-\\dfrac{b}{x^{2}}") + '. Extremo en ' + i$('x=' + p) + ': ' + i$("f'(" + p + ')=a-\\dfrac{b}{' + p * p + '}=0\\Rightarrow b=' + p * p + 'a'),
              'Pasa por el punto: ' + i$('f(' + p + ')=' + pa(p) + 'a+\\dfrac{b}{' + pa(p) + '}=' + q) + '. Sustituyendo ' + i$('b') + ': ' + i$(2 * p + 'a=' + q + '\\Rightarrow a=' + a + ',\\ b=' + b)]),
          part('Para esos valores, clasifica el extremo ' + i$('(' + p + ',' + q + ')') + ' e indica la abscisa del otro extremo relativo de ' + i$('f') + '.', 1.25,
            MU(CH('\\text{En }x=' + p + '\\text{ hay un}', EXT, tipo), N('x=', -p)),
            [i$("f''(x)=\\dfrac{2b}{x^{3}}") + ' y ' + i$("f''(" + p + ')=\\dfrac{' + 2 * b + '}{' + p ** 3 + '}') + (tipo ? '>0' : '<0') + ': ' + EXT[tipo] + '.',
              i$("f'(x)=0\\iff x^{2}=" + p * p) + ', así que el otro extremo está en ' + i$('x=' + -p) + '.']),
        ],
        data: { v: 2, mk: (P) => (x) => P.a * x + P.b / x, p, q },
      };
    },
    function () { // ax^2 + b ln x, f(1)=q y extremo en x=p
      const a = nz(-3, 3), p = rnd.int(1, 3), b = -2 * a * p * p;
      const tipo = a > 0 ? 1 : 0;
      const val = a * p * p + b * Math.log(p);
      const show = p === 1 ? String(a) : a * p * p + (b < 0 ? '-' : '+') + Math.abs(b) + '*ln(' + p + ')';
      const vtex = p === 1 ? String(a) : a * p * p + (b < 0 ? '-' : '+') + Math.abs(b) + '\\ln(' + p + ')';
      return {
        enunciado: 'Considera la función ' + i$('f(x)=ax^{2}+b\\ln(x)') + ' para ' + i$('x>0') + ', con ' + i$('a,b\\in\\mathbb{R}') + '. Se sabe que ' + i$('f(1)=' + a) + ' y que ' + i$('f') + ' tiene un extremo relativo en ' + i$('x=' + p) + '.',
        partes: [
          part('Calcula ' + i$('a') + ' y ' + i$('b') + '.', 1.25, MU(N('a=', a), N('b=', b)),
            [i$('f(1)=a+b\\ln(1)=a') + ', luego ' + i$('a=' + a) + '.',
              i$("f'(x)=2ax+\\dfrac{b}{x}") + ' y ' + i$("f'(" + p + ')=' + 2 * p + 'a+\\dfrac{b}{' + p + '}=0\\Rightarrow b=-' + 2 * p * p + 'a=' + b)]),
          part('Para esos valores, clasifica el extremo y calcula su valor.' + HINT, 1.25, MU(CH('\\text{En }x=' + p + '\\text{ hay un}', EXT, tipo), E('f(' + p + ')=', val, show)),
            [i$("f''(x)=2a-\\dfrac{b}{x^{2}}") + ', ' + i$("f''(" + p + ')=' + 2 * a + sg(-b / (p * p)) + '=' + 4 * a) + (tipo ? '>0' : '<0') + ': ' + EXT[tipo] + '.',
              d$('f(' + p + ')=' + vtex + '\\approx ' + r4(val))]),
        ],
        data: { v: 3, mk: (P) => (x) => P.a * x * x + P.b * Math.log(x), p, f1: a },
      };
    },
  ];
  X.implementar({ id: 'monotonia', generate() { return rnd.pick(MONO)(); } });

  /* ===================== inflexion ===================== */
  const CURV = ['Convexa ($\\cup$)', 'Cóncava ($\\cap$)'];
  const INFL = [
    function () { // x^4+ax^3+bx^2+cx+d, inflexión en p1, p2
      const p1 = rnd.int(-2, 1), p2 = rnd.int(p1 + 1, 2);
      const a = -2 * (p1 + p2), b = 6 * p1 * p2, c = rnd.int(-3, 3), d = rnd.int(-3, 3);
      const f = (x) => x ** 4 + a * x ** 3 + b * x * x + c * x + d;
      const df = (x) => 4 * x ** 3 + 3 * a * x * x + 2 * b * x + c;
      const m = df(p1), n = f(p1) - m * p1;
      return {
        enunciado: 'Considera la función ' + i$('f(x)=x^{4}+ax^{3}+bx^{2}' + tm(c, 'x') + cst(d)) + ', con ' + i$('a,b\\in\\mathbb{R}') + '. Se sabe que ' + i$('f') + ' tiene puntos de inflexión en ' + i$('x=' + p1) + ' y en ' + i$('x=' + p2) + '.',
        partes: [
          part('Calcula ' + i$('a') + ' y ' + i$('b') + '.', 1.25, MU(N('a=', a), N('b=', b)),
            [i$("f''(x)=12x^{2}+6ax+2b") + ' se anula (y cambia de signo) en ' + i$('x=' + p1) + ' y ' + i$('x=' + p2) + ': ' + d$("f''(x)=12" + fac(p1) + fac(p2) + '=' + ptex([12, -12 * (p1 + p2), 12 * p1 * p2])),
              'Identificando: ' + i$('6a=' + (-12 * (p1 + p2)) + ',\\ 2b=' + 12 * p1 * p2) + ', luego ' + i$('a=' + a + ',\\ b=' + b) + '.']),
          part('Para esos valores, halla la recta tangente a la gráfica de ' + i$('f') + ' en el punto de inflexión de abscisa ' + i$('x=' + p1) + ', escrita como ' + i$('y=mx+n') + '.', 1.25, MU(N('m=', m), N('n=', n)),
            [i$("f'(x)=" + ptex([4, 3 * a, 2 * b, c])) + ', ' + i$("f'(" + p1 + ')=' + m) + ' y ' + i$('f(' + p1 + ')=' + f(p1)) + '.',
              d$('y-' + pa(f(p1)) + '=' + pa(m) + '(x-' + pa(p1) + ')\\ \\Rightarrow\\ y=' + ptex([m, n]))]),
        ],
        data: { v: 0, mk: (P) => (x) => x ** 4 + P.a * x ** 3 + P.b * x * x + c * x + d, p1, p2 },
      };
    },
    function () { // kx^3+ax^2+bx+c con inflexión de tangente horizontal en (p,q)
      const k = rnd.pick([1, -1, 2]), p = rnd.int(-2, 2), q = rnd.int(-3, 3);
      const a = -3 * k * p, b = 3 * k * p * p, c = q - k * p ** 3;
      const ops = ['Es creciente en todo $\\mathbb{R}$ y no tiene extremos relativos', 'Es decreciente en todo $\\mathbb{R}$ y no tiene extremos relativos',
        'Tiene un máximo relativo en $x=' + p + '$', 'Tiene un mínimo relativo en $x=' + p + '$'];
      return {
        enunciado: 'Considera la función ' + i$('f(x)=' + kc(k) + 'x^{3}+ax^{2}+bx+c') + ', con ' + i$('a,b,c\\in\\mathbb{R}') + '. Se sabe que su gráfica tiene un punto de inflexión en ' + i$('(' + p + ',' + q + ')') + ' y que la recta tangente en ese punto es horizontal.',
        partes: [
          part('Calcula ' + i$('a') + ', ' + i$('b') + ' y ' + i$('c') + '.', 1.5, MU(N('a=', a), N('b=', b), N('c=', c)),
            [i$("f'(x)=" + 3 * k + 'x^{2}+2ax+b') + ', ' + i$("f''(x)=" + 6 * k + 'x+2a'),
              'Inflexión: ' + i$("f''(" + p + ')=' + 6 * k * p + '+2a=0\\Rightarrow a=' + a) + '. Tangente horizontal: ' + i$("f'(" + p + ')=' + 3 * k * p * p + sg(2 * a * p) + '+b=0\\Rightarrow b=' + b),
              'Pasa por el punto: ' + i$('f(' + p + ')=' + q + '\\Rightarrow c=' + c)]),
          part('Para esos valores, ¿qué ocurre con la monotonía de ' + i$('f') + '?', 1, CH('', ops, k > 0 ? 0 : 1),
            [d$("f'(x)=" + ptex([3 * k, 2 * a, b]) + '=' + kc(3 * k) + fac(p) + '^{2}'),
              i$("f'") + ' sólo se anula en ' + i$('x=' + p) + ' y no cambia de signo (' + (k > 0 ? i$("f'\\ge0") + '): es creciente' : i$("f'\\le0") + '): es decreciente') + ' y no tiene extremos relativos.']),
        ],
        data: { v: 1, mk: (P) => (x) => k * x ** 3 + P.a * x * x + P.b * x + P.c, p, q, k },
      };
    },
    function () { // (x^2+ax+b)e^x con inflexión en p1, p2
      const p1 = rnd.int(-3, 1), p2 = rnd.int(p1 + 1, 2);
      const a = -(p1 + p2) - 4, b = p1 * p2 - 2 * a - 2;
      const j = rnd.int(0, 2);
      const ivs = ['(-\\infty,' + p1 + ')', '(' + p1 + ',' + p2 + ')', '(' + p2 + ',+\\infty)'];
      const val = j === 1 ? 1 : 0;
      return {
        enunciado: 'Considera la función ' + i$('f(x)=(x^{2}+ax+b)\\,e^{x}') + ', con ' + i$('a,b\\in\\mathbb{R}') + '. Se sabe que ' + i$('f') + ' tiene puntos de inflexión en ' + i$('x=' + p1) + ' y en ' + i$('x=' + p2) + '.',
        partes: [
          part('Calcula ' + i$('a') + ' y ' + i$('b') + '.', 1.5, MU(N('a=', a), N('b=', b)),
            ['Derivando dos veces: ' + d$("f'(x)=\\big(x^{2}+(a+2)x+a+b\\big)e^{x},\\qquad f''(x)=\\big(x^{2}+(a+4)x+2a+b+2\\big)e^{x}"),
              'Como ' + i$('e^{x}>0') + ', el paréntesis debe ser ' + i$(fac(p1) + fac(p2) + '=' + ptex([1, -(p1 + p2), p1 * p2])) + ': ' + d$('a+4=' + (-(p1 + p2)) + ',\\quad 2a+b+2=' + p1 * p2 + '\\ \\Rightarrow\\ a=' + a + ',\\ b=' + b)]),
          part('Para esos valores, ¿cómo es la curvatura de ' + i$('f') + ' en el intervalo ' + i$(ivs[j]) + '?', 1, CH('', CURV, val),
            [i$("f''(x)=" + fac(p1) + fac(p2) + '\\,e^{x}') + ' es ' + (val ? 'negativa' : 'positiva') + ' en ' + i$(ivs[j]) + ': ' + (val ? 'cóncava ' + i$('(\\cap)') : 'convexa ' + i$('(\\cup)')) + '.']),
        ],
        data: { v: 2, mk: (P) => (x) => (x * x + P.a * x + P.b) * Math.exp(x), p1, p2, iv: [[-Infinity, p1], [p1, p2], [p2, Infinity]][j] },
      };
    },
  ];
  X.implementar({ id: 'inflexion', generate() { return rnd.pick(INFL)(); } });

  /* ===================== extremos-abs ===================== */
  const PI = Math.PI;
  const pt = (x, xt, xs0, vt, vs) => ({ x, xt, xs: xs0, vt, vs });
  const TRIG = [
    { ftex: 'x+2\\cos(x)', f: (x) => x + 2 * Math.cos(x), dtex: '1-2\\,' + SEN('x'), crit: '\\operatorname{sen}(x)=\\tfrac12\\Rightarrow x=\\tfrac{\\pi}{6},\\ x=\\tfrac{5\\pi}{6}',
      pts: [pt(0, '0', '0', '2', '2'), pt(PI / 6, '\\tfrac{\\pi}{6}', 'pi/6', '\\tfrac{\\pi}{6}+\\sqrt3', 'pi/6+sqrt(3)'), pt(5 * PI / 6, '\\tfrac{5\\pi}{6}', '5pi/6', '\\tfrac{5\\pi}{6}-\\sqrt3', '5pi/6-sqrt(3)'), pt(PI, '\\pi', 'pi', '\\pi-2', 'pi-2')] },
    { ftex: 'x-2\\,' + SEN('x'), f: (x) => x - 2 * Math.sin(x), dtex: '1-2\\cos(x)', crit: '\\cos(x)=\\tfrac12\\Rightarrow x=\\tfrac{\\pi}{3}',
      pts: [pt(0, '0', '0', '0', '0'), pt(PI / 3, '\\tfrac{\\pi}{3}', 'pi/3', '\\tfrac{\\pi}{3}-\\sqrt3', 'pi/3-sqrt(3)'), pt(PI, '\\pi', 'pi', '\\pi', 'pi')] },
    { ftex: SEN('x') + '+\\cos(x)', f: (x) => Math.sin(x) + Math.cos(x), dtex: '\\cos(x)-' + SEN('x'), crit: '\\cos(x)=\\operatorname{sen}(x)\\Rightarrow x=\\tfrac{\\pi}{4}',
      pts: [pt(0, '0', '0', '1', '1'), pt(PI / 4, '\\tfrac{\\pi}{4}', 'pi/4', '\\sqrt2', 'sqrt(2)'), pt(PI, '\\pi', 'pi', '-1', '-1')] },
    { ftex: 'x+2\\,' + SEN('x'), f: (x) => x + 2 * Math.sin(x), dtex: '1+2\\cos(x)', crit: '\\cos(x)=-\\tfrac12\\Rightarrow x=\\tfrac{2\\pi}{3}',
      pts: [pt(0, '0', '0', '0', '0'), pt(2 * PI / 3, '\\tfrac{2\\pi}{3}', '2pi/3', '\\tfrac{2\\pi}{3}+\\sqrt3', '2pi/3+sqrt(3)'), pt(PI, '\\pi', 'pi', '\\pi', 'pi')] },
  ];
  const EXA = [
    function () { // cúbica
      for (;;) {
        const r1 = rnd.int(-2, 2), r2 = rnd.int(r1 + 1, 3), s = rnd.pick([1, -1]), c = rnd.int(-4, 4);
        const al = r1 - rnd.int(0, 1), be = r2 + rnd.int(0, 1);
        const cs = [2 * s, -3 * s * (r1 + r2), 6 * s * r1 * r2, c];
        const f = (x) => cs[0] * x ** 3 + cs[1] * x * x + cs[2] * x + cs[3];
        const xsL = [...new Set([al, r1, r2, be])];
        const pts = xsL.map((x) => pt(x, String(x), String(x), String(f(x)), String(f(x))));
        const T = { ftex: ptex(cs), f, dtex: ptex([6 * s, -6 * s * (r1 + r2), 6 * s * r1 * r2]) + '=' + kc(6 * s) + fac(r1) + fac(r2), crit: 'x=' + r1 + ',\\ x=' + r2, a: al, b: be, at: String(al), bt: String(be), pts };
        if (unico(T)) return T;
      }
    },
    function () { // (x-c)^2 e^x
      const c = rnd.int(-1, 2);
      const [al, be] = rnd.pick([[c - 3, c + 1], [c - 3, c - 1], [c - 1, c + 1], [c - 4, c - 1]]);
      const f = (x) => (x - c) ** 2 * Math.exp(x);
      const xsL = [...new Set([al, c - 2, c, be])].filter((x) => x >= al && x <= be);
      const pts = xsL.map((x) => { const q = (x - c) ** 2; return pt(x, String(x), String(x), expT(q, x), expS(q, x)); });
      const fx = c === 0 ? 'x^{2}e^{x}' : fac(c) + '^{2}e^{x}';
      return { ftex: fx, f, dtex: fac(c) + fac(c - 2) + '\\,e^{x}', crit: 'x=' + (c - 2) + ',\\ x=' + c, a: al, b: be, at: String(al), bt: String(be), pts };
    },
    function () { // x - k ln x en [1, B]
      const k = rnd.int(2, 4), B = rnd.int(k + 1, k + 4);
      const f = (x) => x - k * Math.log(x);
      const pts = [pt(1, '1', '1', '1', '1'), pt(k, String(k), String(k), k + '-' + k + '\\ln(' + k + ')', k + '-' + k + '*ln(' + k + ')'), pt(B, String(B), String(B), B + '-' + k + '\\ln(' + B + ')', B + '-' + k + '*ln(' + B + ')')];
      return { ftex: 'x-' + k + '\\ln(x)', f, dtex: '1-\\dfrac{' + k + '}{x}', crit: 'x=' + k, a: 1, b: B, at: '1', bt: String(B), pts };
    },
    function () { const T = rnd.pick(TRIG); return Object.assign({ a: 0, b: PI, at: '0', bt: '\\pi' }, T); },
  ];
  function extremos(T) {
    const vals = T.pts.map((p) => T.f(p.x));
    const iM = vals.indexOf(Math.max(...vals)), im = vals.indexOf(Math.min(...vals));
    return { vals, iM, im };
  }
  function unico(T) {
    const { vals, iM, im } = extremos(T);
    return vals.every((v, i) => i === iM || v < vals[iM] - 1e-6) && vals.every((v, i) => i === im || v > vals[im] + 1e-6);
  }
  X.implementar({
    id: 'extremos-abs',
    generate() {
      let T;
      do { T = rnd.pick(EXA)(); } while (!unico(T));
      const { vals, iM, im } = extremos(T);
      const M = T.pts[iM], m = T.pts[im];
      const tabla = T.pts.map((p, i) => 'f(' + p.xt + ')=' + p.vt + (/^-?\d+$/.test(p.vt) ? '' : '\\approx ' + r4(vals[i]))).join(',\\quad ');
      const steps = ['Derivada: ' + i$("f'(x)=" + T.dtex) + '. Puntos críticos: ' + i$(T.crit) + '.',
        'Comparamos los valores en los puntos críticos del intervalo y en los extremos: ' + d$(tabla)];
      return {
        enunciado: 'Considera la función ' + i$('f(x)=' + T.ftex) + ' en el intervalo ' + i$('[' + T.at + ',' + T.bt + ']') + '.',
        partes: [
          part('Halla el máximo absoluto de ' + i$('f') + ' en ' + i$('[' + T.at + ',' + T.bt + ']') + ': abscisa y valor.' + HINT, 1.25, MU(E('x=', M.x, M.xs), E('f(x)=', vals[iM], M.vs)),
            steps.concat(['El mayor valor es ' + i$('f(' + M.xt + ')=' + M.vt) + ': máximo absoluto.'])),
          part('Halla el mínimo absoluto de ' + i$('f') + ' en ese intervalo: abscisa y valor.', 1.25, MU(E('x=', m.x, m.xs), E('f(x)=', vals[im], m.vs)),
            ['Con la misma tabla de valores, el menor es ' + i$('f(' + m.xt + ')=' + m.vt) + ': mínimo absoluto.']),
        ],
        data: { f: T.f, a: T.a, b: T.b },
      };
    },
  });

  /* ===================== optimizacion ===================== */
  const OPT = [
    function () { // terreno junto a un río
      const L = rnd.pick([40, 60, 80, 100, 120, 160, 200]);
      return {
        enunciado: 'Se dispone de ' + L + ' metros de valla para cercar un terreno rectangular situado junto a un río. El lado que da al río no se valla. Se quiere que el área del terreno sea máxima.',
        t1: 'Halla las dimensiones del terreno: ' + i$('x') + ' (cada lado perpendicular al río) e ' + i$('y') + ' (lado paralelo al río), en metros.',
        t2: 'Calcula el área máxima (en m²).',
        dims: (x) => [x, L - 2 * x], labs: ['x=', 'y='], vl: 'A=',
        obj: (x) => x * (L - 2 * x), lo: 0, hi: L / 2, kind: 'max', xo: F(L, 4),
        s1: ['Valla: ' + i$('2x+y=' + L + '\\Rightarrow y=' + L + '-2x') + '. Área: ' + i$('A(x)=x(' + L + '-2x)=' + L + 'x-2x^{2}') + ', con ' + i$('0<x<' + L / 2) + '.',
          i$("A'(x)=" + L + '-4x=0\\Rightarrow x=' + L / 4) + '; ' + i$("A''(x)=-4<0") + ': máximo. Entonces ' + i$('y=' + L / 2) + '.'],
        s2: [d$('A=' + L / 4 + '\\cdot' + L / 2 + '=' + L * L / 8 + '\\ \\text{m}^2')],
      };
    },
    function () { // caja sin tapa
      const L = rnd.pick([12, 18, 24, 30, 36]);
      return {
        enunciado: 'Con una lámina cuadrada de cartón de ' + L + ' cm de lado se quiere construir una caja sin tapa recortando un cuadrado de lado ' + i$('x') + ' en cada esquina y doblando los bordes. Se busca la caja de volumen máximo.',
        t1: 'Halla el lado ' + i$('x') + ' del cuadrado recortado y el lado ' + i$('\\ell') + ' de la base de la caja (en cm).',
        t2: 'Calcula el volumen máximo (en cm³).',
        dims: (x) => [x, L - 2 * x], labs: ['x=', '\\ell='], vl: 'V=',
        obj: (x) => x * (L - 2 * x) ** 2, lo: 0, hi: L / 2, kind: 'max', xo: F(L, 6),
        s1: ['Volumen: ' + i$('V(x)=x(' + L + '-2x)^{2}') + ', con ' + i$('0<x<' + L / 2) + '.',
          i$("V'(x)=(" + L + '-2x)^{2}-4x(' + L + '-2x)=(' + L + '-2x)(' + L + '-6x)') + '; se anula en ' + i$('x=' + L / 6) + ' (la otra raíz, ' + i$('x=' + L / 2) + ', da volumen 0).',
          i$("V'") + ' pasa de positiva a negativa en ' + i$('x=' + L / 6) + ': máximo. Lado de la base: ' + i$('\\ell=' + L + '-2\\cdot' + L / 6 + '=' + 2 * L / 3) + '.'],
        s2: [d$('V=' + L / 6 + '\\cdot' + 2 * L / 3 + '^{2}=' + 2 * L ** 3 / 27 + '\\ \\text{cm}^3')],
      };
    },
    function () { // coste medio mínimo
      const a = rnd.int(1, 3), s = rnd.pick([10, 20, 30]), b = rnd.pick([5, 10, 20]), c = a * s * s;
      return {
        enunciado: 'El coste total, en euros, de fabricar ' + i$('x') + ' unidades de un producto es ' + i$('C(x)=' + ptex([a, b, c])) + '. Se quiere minimizar el coste medio por unidad, ' + i$('\\dfrac{C(x)}{x}') + '.',
        t1: 'Halla el número de unidades ' + i$('x') + ' que hace mínimo el coste medio y el coste total ' + i$('C') + ' de esa producción.',
        t2: 'Calcula el coste medio mínimo (euros por unidad).',
        dims: (x) => [x, a * x * x + b * x + c], labs: ['x=', 'C='], vl: '\\overline{C}=',
        obj: (x) => a * x + b + c / x, lo: 0, hi: 10 * s, kind: 'min', xo: F(s),
        s1: ['Coste medio: ' + i$('\\overline{C}(x)=' + kx(a) + '+' + b + '+\\dfrac{' + c + '}{x}') + ', ' + i$('x>0') + '.',
          i$("\\overline{C}'(x)=" + a + '-\\dfrac{' + c + '}{x^{2}}=0\\Rightarrow x^{2}=' + s * s + '\\Rightarrow x=' + s) + '; ' + i$("\\overline{C}''(x)=\\dfrac{" + 2 * c + '}{x^{3}}>0') + ': mínimo.',
          'Coste total: ' + i$('C(' + s + ')=' + (2 * c + b * s)) + ' euros.'],
        s2: [d$('\\overline{C}(' + s + ')=' + a * s + '+' + b + '+' + c / s + '=' + (2 * a * s + b))],
      };
    },
    function () { // x + y = S, máx x·y²
      const S = rnd.pick([6, 9, 12, 15, 30]);
      return {
        enunciado: 'Se quiere descomponer el número ' + S + ' en dos sumandos positivos ' + i$('x') + ' e ' + i$('y') + ' de forma que el producto ' + i$('x\\,y^{2}') + ' sea máximo.',
        t1: 'Halla los sumandos ' + i$('x') + ' e ' + i$('y') + '.',
        t2: 'Calcula el valor máximo del producto ' + i$('x\\,y^{2}') + '.',
        dims: (y) => [S - y, y], labs: ['x=', 'y='], vl: 'x\\,y^{2}=',
        obj: (y) => (S - y) * y * y, lo: 0, hi: S, kind: 'max', xo: F(2 * S, 3),
        s1: [i$('x=' + S + '-y') + ', así que ' + i$('P(y)=(' + S + '-y)y^{2}=' + S + 'y^{2}-y^{3}') + ', con ' + i$('0<y<' + S) + '.',
          i$("P'(y)=" + 2 * S + 'y-3y^{2}=y(' + 2 * S + '-3y)=0\\Rightarrow y=' + 2 * S / 3) + '; ' + i$("P''(" + 2 * S / 3 + ')=' + 2 * S + '-' + 4 * S + '<0') + ': máximo. Entonces ' + i$('x=' + S / 3) + '.'],
        s2: [d$('x\\,y^{2}=' + S / 3 + '\\cdot' + 2 * S / 3 + '^{2}=' + 4 * S ** 3 / 27)],
      };
    },
    function () { // rectángulo bajo una parábola
      const s = rnd.int(1, 3), k = 3 * s * s;
      return {
        enunciado: 'Se inscribe un rectángulo en el recinto limitado por la parábola ' + i$('y=' + k + '-x^{2}') + ' y el eje ' + i$('OX') + ', con un lado sobre el eje y los otros dos vértices sobre la parábola. Se busca el de área máxima.',
        t1: 'Halla la base y la altura del rectángulo de área máxima.',
        t2: 'Calcula el área máxima.',
        dims: (x) => [2 * x, k - x * x], labs: ['\\text{base}=', '\\text{altura}='], vl: 'A=',
        obj: (x) => 2 * x * (k - x * x), lo: 0, hi: Math.sqrt(k), kind: 'max', xo: F(s),
        s1: ['Si los vértices son ' + i$('(\\pm x,0)') + ' y ' + i$('(\\pm x,' + k + '-x^{2})') + ': ' + i$('A(x)=2x(' + k + '-x^{2})=' + 2 * k + 'x-2x^{3}') + ', con ' + i$('0<x<\\sqrt{' + k + '}') + '.',
          i$("A'(x)=" + 2 * k + '-6x^{2}=0\\Rightarrow x^{2}=' + s * s + '\\Rightarrow x=' + s) + '; ' + i$("A''(x)=-12x<0") + ': máximo.',
          'Base ' + i$('2x=' + 2 * s) + ' y altura ' + i$(k + '-' + s * s + '=' + 2 * s * s) + '.'],
        s2: [d$('A=' + 2 * s + '\\cdot' + 2 * s * s + '=' + 4 * s ** 3)],
      };
    },
    function () { // ingresos de un cine
      let P, k, x0, N0;
      do { P = rnd.pick([8, 10, 12]); k = rnd.pick([20, 40, 50]); x0 = rnd.int(1, 3); N0 = k * (P - 2 * x0); } while (N0 <= 0);
      const pr = P - x0, ent = N0 + k * x0;
      return {
        enunciado: 'Un cine cobra ' + P + ' € por entrada y vende ' + N0 + ' entradas por sesión. Un estudio indica que por cada euro que rebaje el precio venderá ' + k + ' entradas más. Se quiere maximizar los ingresos por sesión.',
        t1: 'Halla el precio de la entrada (en €) que maximiza los ingresos y el número de entradas que se venderán.',
        t2: 'Calcula los ingresos máximos (en €).',
        dims: (x) => [P - x, N0 + k * x], labs: ['\\text{precio}=', '\\text{entradas}='], vl: 'I=',
        obj: (x) => (P - x) * (N0 + k * x), lo: 0, hi: P, kind: 'max', xo: F(x0),
        s1: ['Si se rebaja ' + i$('x') + ' euros: ' + i$('I(x)=(' + P + '-x)(' + N0 + '+' + k + 'x)=' + ptex([-k, k * P - N0, P * N0])) + '.',
          i$("I'(x)=" + ptex([-2 * k, k * P - N0]) + '=0\\Rightarrow x=' + x0) + '; ' + i$("I''(x)=" + -2 * k + '<0') + ': máximo.',
          'Precio ' + i$(P + '-' + x0 + '=' + pr) + ' € y ' + i$(N0 + '+' + k + '\\cdot' + x0 + '=' + ent) + ' entradas.'],
        s2: [d$('I=' + pr + '\\cdot' + ent + '=' + pr * ent + '\\ \\text{€}')],
      };
    },
  ];
  X.implementar({
    id: 'optimizacion',
    generate() {
      const T = rnd.pick(OPT)();
      const xo = T.xo.n / T.xo.d;
      const dv = T.dims(xo), val = T.obj(xo);
      const fr = (v) => { const q = F(Math.round(v * 3), 3); return q; };     // todos los resultados son múltiplos de 1/3
      return {
        enunciado: T.enunciado,
        partes: [
          part(T.t1, 1.5, MU(N(T.labs[0], fr(dv[0])), N(T.labs[1], fr(dv[1]))), T.s1),
          part(T.t2, 1, N(T.vl, fr(val)), T.s2),
        ],
        data: { obj: T.obj, dims: T.dims, lo: T.lo, hi: T.hi, kind: T.kind, xo },
      };
    },
  });

  /* ===================== integral-def ===================== */
  const SUST = [
    function () {
      const b = rnd.int(1, 2);
      return { tex: '\\int_{0}^{' + b + '}x\\,e^{x^{2}}\\,dx', f: (x) => x * Math.exp(x * x), a: 0, b, value: (Math.exp(b * b) - 1) / 2, show: '(e^' + b * b + '-1)/2',
        steps: ['Cambio ' + i$('t=x^{2},\\ dt=2x\\,dx') + ': ' + i$('\\int x\\,e^{x^{2}}dx=\\tfrac12\\int e^{t}dt=\\tfrac12e^{x^{2}}+C'), 'Barrow: ' + d$('\\Big[\\tfrac12e^{x^{2}}\\Big]_{0}^{' + b + '}=\\dfrac{e^{' + b * b + '}-1}{2}')] };
    },
    function () {
      const n = rnd.int(2, 4), cs = rnd.int(0, 1);
      const tex = cs ? SEN('x') + '\\cos^{' + n + '}(x)' : '\\cos(x)\\operatorname{sen}^{' + n + '}(x)';
      const f = cs ? (x) => Math.sin(x) * Math.cos(x) ** n : (x) => Math.cos(x) * Math.sin(x) ** n;
      const Gt = cs ? '-\\dfrac{\\cos^{' + (n + 1) + '}(x)}{' + (n + 1) + '}' : '\\dfrac{\\operatorname{sen}^{' + (n + 1) + '}(x)}{' + (n + 1) + '}';
      return { tex: '\\int_{0}^{\\pi/2}' + tex + '\\,dx', f, a: 0, b: PI / 2, value: 1 / (n + 1), show: '1/' + (n + 1),
        steps: ['Cambio ' + i$(cs ? 't=\\cos(x),\\ dt=-' + SEN('x') + 'dx' : 't=' + SEN('x') + ',\\ dt=\\cos(x)dx') + ': una primitiva es ' + i$(Gt), 'Barrow: ' + d$('\\Big[' + Gt + '\\Big]_{0}^{\\pi/2}=\\dfrac{1}{' + (n + 1) + '}')] };
    },
    function () {
      const n = rnd.int(1, 3), k = rnd.int(1, 2);
      const lt = n === 1 ? '\\ln(x)' : '\\ln^{' + n + '}(x)';
      const val = F(k ** (n + 1), n + 1);
      return { tex: '\\int_{1}^{' + (k === 1 ? 'e' : 'e^{2}') + '}\\dfrac{' + lt + '}{x}\\,dx', f: (x) => Math.log(x) ** n / x, a: 1, b: Math.exp(k), value: val.n / val.d, show: fstr(val),
        steps: ['Cambio ' + i$('t=\\ln(x),\\ dt=\\tfrac{dx}{x}') + ': ' + i$('\\int t^{' + n + '}dt=\\dfrac{\\ln^{' + (n + 1) + '}(x)}{' + (n + 1) + '}+C'), 'Barrow (' + i$('\\ln(1)=0,\\ \\ln(' + (k === 1 ? 'e' : 'e^{2}') + ')=' + k) + '): ' + d$('\\dfrac{' + k + '^{' + (n + 1) + '}}{' + (n + 1) + '}=' + ftex(val))] };
    },
    function () {
      const b = rnd.int(1, 3);
      return { tex: '\\int_{0}^{' + b + '}\\dfrac{x}{x^{2}+1}\\,dx', f: (x) => x / (x * x + 1), a: 0, b, value: Math.log(b * b + 1) / 2, show: 'ln(' + (b * b + 1) + ')/2',
        steps: ['Cambio ' + i$('t=x^{2}+1,\\ dt=2x\\,dx') + ': ' + i$('\\int\\dfrac{x}{x^{2}+1}dx=\\tfrac12\\ln(x^{2}+1)+C'), 'Barrow: ' + d$('\\tfrac12\\ln(' + (b * b + 1) + ')-\\tfrac12\\ln(1)=\\dfrac{\\ln(' + (b * b + 1) + ')}{2}')] };
    },
    function () {
      const s = rnd.int(2, 4), b = s * s - 1, val = F(2 * s ** 3 - 6 * s + 4, 3);
      return { tex: '\\int_{0}^{' + b + '}\\dfrac{x}{\\sqrt{x+1}}\\,dx', f: (x) => x / Math.sqrt(x + 1), a: 0, b, value: val.n / val.d, show: fstr(val),
        steps: ['Cambio ' + i$('t=\\sqrt{x+1}') + ', ' + i$('x=t^{2}-1,\\ dx=2t\\,dt') + '; los límites pasan a ' + i$('t=1') + ' y ' + i$('t=' + s) + ': ' + d$('\\int_{1}^{' + s + '}\\dfrac{t^{2}-1}{t}\\,2t\\,dt=\\int_{1}^{' + s + '}(2t^{2}-2)\\,dt'),
          'Barrow: ' + d$('\\Big[\\tfrac{2t^{3}}{3}-2t\\Big]_{1}^{' + s + '}=' + ftex(val))] };
    },
    function () {
      const [bt, b, show, vt] = rnd.pick([['1', 1, 'ln((e+1)/2)', '\\ln\\dfrac{e+1}{2}'], ['\\ln(3)', Math.log(3), 'ln(2)', '\\ln(2)'], ['\\ln(5)', Math.log(5), 'ln(3)', '\\ln(3)']]);
      return { tex: '\\int_{0}^{' + bt + '}\\dfrac{e^{x}}{e^{x}+1}\\,dx', f: (x) => Math.exp(x) / (Math.exp(x) + 1), a: 0, b, value: Math.log((Math.exp(b) + 1) / 2), show,
        steps: ['Cambio ' + i$('t=e^{x}+1,\\ dt=e^{x}dx') + ': ' + i$('\\int\\dfrac{e^{x}}{e^{x}+1}dx=\\ln(e^{x}+1)+C'), 'Barrow: ' + d$('\\ln(e^{' + bt + '}+1)-\\ln(2)=' + vt)] };
    },
    function () {
      const [b, c] = rnd.pick([[4, 9], [3, 16], [8, 36], [12, 25], [15, 64]]);
      const val = Math.sqrt(b * b + c) - Math.sqrt(c);
      return { tex: '\\int_{0}^{' + b + '}\\dfrac{x}{\\sqrt{x^{2}+' + c + '}}\\,dx', f: (x) => x / Math.sqrt(x * x + c), a: 0, b, value: val, show: String(val),
        steps: ['Cambio ' + i$('t=x^{2}+' + c + ',\\ dt=2x\\,dx') + ': ' + i$('\\int\\dfrac{x}{\\sqrt{x^{2}+' + c + '}}dx=\\sqrt{x^{2}+' + c + '}+C'), 'Barrow: ' + d$('\\sqrt{' + (b * b + c) + '}-\\sqrt{' + c + '}=' + Math.sqrt(b * b + c) + '-' + Math.sqrt(c) + '=' + val)] };
    },
  ];
  const PARTS = [
    function () {
      const b = rnd.int(1, 3);
      return { tex: '\\int_{0}^{' + b + '}x\\,e^{x}\\,dx', f: (x) => x * Math.exp(x), a: 0, b, value: (b - 1) * Math.exp(b) + 1, show: b === 1 ? '1' : (b - 1) + '*e^' + b + '+1',
        steps: ['Por partes con ' + i$('u=x,\\ dv=e^{x}dx') + ': ' + i$('\\int x\\,e^{x}dx=x\\,e^{x}-\\int e^{x}dx=(x-1)e^{x}+C'), 'Barrow: ' + d$('\\Big[(x-1)e^{x}\\Big]_{0}^{' + b + '}=' + (b === 1 ? '0' : expT(b - 1, b)) + '-(-1)=' + (b === 1 ? '1' : expT(b - 1, b) + '+1'))] };
    },
    function () {
      const b = rnd.int(1, 2);
      return { tex: '\\int_{0}^{' + b + '}x\\,e^{-x}\\,dx', f: (x) => x * Math.exp(-x), a: 0, b, value: 1 - (b + 1) * Math.exp(-b), show: '1-' + (b + 1) + '*e^(-' + b + ')',
        steps: ['Por partes con ' + i$('u=x,\\ dv=e^{-x}dx') + ': ' + i$('\\int x\\,e^{-x}dx=-x\\,e^{-x}+\\int e^{-x}dx=-(x+1)e^{-x}+C'), 'Barrow: ' + d$('\\Big[-(x+1)e^{-x}\\Big]_{0}^{' + b + '}=1-' + (b + 1) + 'e^{-' + b + '}')] };
    },
    function () {
      const n = rnd.int(1, 3), q = (n + 1) ** 2;
      const xn = n === 1 ? 'x' : 'x^{' + n + '}';
      return { tex: '\\int_{1}^{e}' + xn + '\\ln(x)\\,dx', f: (x) => x ** n * Math.log(x), a: 1, b: Math.E, value: (n * Math.exp(n + 1) + 1) / q, show: '(' + n + '*e^' + (n + 1) + '+1)/' + q,
        steps: ['Por partes con ' + i$('u=\\ln(x),\\ dv=' + xn + 'dx') + ': ' + d$('\\int ' + xn + '\\ln(x)dx=\\dfrac{x^{' + (n + 1) + '}}{' + (n + 1) + '}\\ln(x)-\\dfrac{x^{' + (n + 1) + '}}{' + q + '}+C'),
          'Barrow: ' + d$('\\dfrac{e^{' + (n + 1) + '}}{' + (n + 1) + '}-\\dfrac{e^{' + (n + 1) + '}}{' + q + '}+\\dfrac{1}{' + q + '}=\\dfrac{' + kc(n) + 'e^{' + (n + 1) + '}+1}{' + q + '}')] };
    },
    function () {
      const T = rnd.pick([
        { tex: 'x\\,' + SEN('x'), bt: '\\pi', b: PI, f: (x) => x * Math.sin(x), G: '-x\\cos(x)+' + SEN('x'), show: 'pi', vt: '\\pi' },
        { tex: 'x\\,' + SEN('x'), bt: '\\pi/2', b: PI / 2, f: (x) => x * Math.sin(x), G: '-x\\cos(x)+' + SEN('x'), show: '1', vt: '1' },
        { tex: 'x\\cos(x)', bt: '\\pi/2', b: PI / 2, f: (x) => x * Math.cos(x), G: 'x\\,' + SEN('x') + '+\\cos(x)', show: 'pi/2-1', vt: '\\dfrac{\\pi}{2}-1' },
        { tex: 'x\\cos(x)', bt: '\\pi', b: PI, f: (x) => x * Math.cos(x), G: 'x\\,' + SEN('x') + '+\\cos(x)', show: '-2', vt: '-2' },
      ]);
      return { tex: '\\int_{0}^{' + T.bt + '}' + T.tex + '\\,dx', f: T.f, a: 0, b: T.b, value: G.parseExpr(T.show), show: T.show,
        steps: ['Por partes con ' + i$('u=x') + ': una primitiva es ' + i$(T.G), 'Barrow: ' + d$('\\Big[' + T.G + '\\Big]_{0}^{' + T.bt + '}=' + T.vt)] };
    },
    function () {
      return { tex: '\\int_{0}^{1}x^{2}e^{x}\\,dx', f: (x) => x * x * Math.exp(x), a: 0, b: 1, value: Math.E - 2, show: 'e-2',
        steps: ['Por partes dos veces (' + i$('u=x^{2}') + ' y luego ' + i$('u=x') + '): ' + i$('\\int x^{2}e^{x}dx=(x^{2}-2x+2)e^{x}+C'), 'Barrow: ' + d$('(1-2+2)e-2=e-2')] };
    },
    function () {
      const k = rnd.int(1, 2);
      return { tex: '\\int_{1}^{' + (k === 1 ? 'e' : 'e^{2}') + '}\\ln(x)\\,dx', f: Math.log, a: 1, b: Math.exp(k), value: (k - 1) * Math.exp(k) + 1, show: k === 1 ? '1' : 'e^2+1',
        steps: ['Por partes con ' + i$('u=\\ln(x),\\ dv=dx') + ': ' + i$('\\int\\ln(x)dx=x\\ln(x)-x+C'), 'Barrow: ' + d$(k === 1 ? '(e-e)-(0-1)=1' : '(2e^{2}-e^{2})-(0-1)=e^{2}+1')] };
    },
    function () {
      return { tex: '\\int_{0}^{1}\\operatorname{arctg}(x)\\,dx', f: Math.atan, a: 0, b: 1, value: PI / 4 - Math.log(2) / 2, show: 'pi/4-ln(2)/2',
        steps: ['Por partes con ' + i$('u=\\operatorname{arctg}(x),\\ dv=dx') + ': ' + i$('\\int\\operatorname{arctg}(x)dx=x\\operatorname{arctg}(x)-\\tfrac12\\ln(1+x^{2})+C'), 'Barrow: ' + d$('\\dfrac{\\pi}{4}-\\dfrac{\\ln(2)}{2}')] };
    },
  ];
  X.implementar({
    id: 'integral-def',
    generate() {
      const A = rnd.pick(SUST)(), B = rnd.pick(PARTS)();
      return {
        enunciado: 'Calcula las siguientes integrales definidas.',
        partes: [
          part(i$('\\displaystyle' + A.tex) + ' <small>(sugerencia: cambio de variable)</small>' + HINT, 1.25, E('I_1=', A.value, A.show), A.steps),
          part(i$('\\displaystyle' + B.tex) + ' <small>(sugerencia: integración por partes)</small>', 1.25, E('I_2=', B.value, B.show), B.steps),
        ],
        data: { I: [A, B].map((t) => ({ f: t.f, a: t.a, b: t.b, value: t.value, show: t.show })) },
      };
    },
  });

  /* ===================== area-curvas ===================== */
  const AREA = [
    function () { // parábola-recta o dos parábolas
      const r1 = rnd.int(-3, 2), r2 = rnd.int(r1 + 1, Math.min(3, r1 + 4)), k = nz(-3, 3);
      const recta = rnd.int(0, 1) === 1;
      let c1 = k;
      if (!recta) do { c1 = nz(-2, 2); } while (c1 === k);
      const p = rnd.int(-3, 3), q = rnd.int(-3, 3);
      const fc = [c1, p, q], gc = [c1 - k, p + k * (r1 + r2), q - k * r1 * r2];
      const ev = (cs) => (x) => cs[0] * x * x + cs[1] * x + cs[2];
      const dc = [k, -k * (r1 + r2), k * r1 * r2];
      const Pr = (x) => G.fadd(G.fadd(G.fmul(F(k, 3), F(x ** 3)), G.fmul(F(-k * (r1 + r2), 2), F(x * x))), F(k * r1 * r2 * x));
      const I = G.fsub(Pr(r2), Pr(r1)), A = F(Math.abs(I.n), I.d);
      return {
        enunciado: 'Considera las funciones ' + i$('f(x)=' + ptex(fc)) + ' y ' + i$('g(x)=' + ptex(gc)) + '.',
        cuts: [r1, r2], f: ev(fc), g: ev(gc), a: r1, b: r2, A: A.n / A.d, show: fstr(A),
        s1: ['Igualamos: ' + i$('f(x)-g(x)=' + ptex(dc) + '=' + kc(k) + fac(r1) + fac(r2) + '=0') + ', luego ' + i$('x=' + r1) + ' y ' + i$('x=' + r2) + '.'],
        s2: ['El recinto está entre ' + i$('x=' + r1) + ' y ' + i$('x=' + r2) + ': ' + d$('\\int_{' + r1 + '}^{' + r2 + '}(' + ptex(dc) + ')\\,dx=\\Big[' + ptex([F(k, 3), F(-k * (r1 + r2), 2), F(k * r1 * r2), 0]) + '\\Big]_{' + r1 + '}^{' + r2 + '}=' + ftex(I)),
          'El área es el valor absoluto: ' + i$('A=' + ftex(A)) + ' u².'],
      };
    },
    function () { // e^x, e^-x y x = U
      const [ut, U, show, vt] = rnd.pick([['1', 1, 'e+1/e-2', 'e+e^{-1}-2'], ['2', 2, 'e^2+e^(-2)-2', 'e^{2}+e^{-2}-2'], ['\\ln(2)', Math.log(2), '1/2', '2+\\tfrac12-2=\\tfrac12'], ['\\ln(3)', Math.log(3), '4/3', '3+\\tfrac13-2=\\tfrac43']]);
      return {
        enunciado: 'Considera las funciones ' + i$('f(x)=e^{x}') + ' y ' + i$('g(x)=e^{-x}') + ', y el recinto limitado por sus gráficas y la recta ' + i$('x=' + ut) + '.',
        cuts: [0], f: Math.exp, g: (x) => Math.exp(-x), a: 0, b: U, A: Math.exp(U) + Math.exp(-U) - 2, show,
        s1: [i$('e^{x}=e^{-x}\\iff e^{2x}=1\\iff x=0') + '.'],
        s2: ['En ' + i$('(0,' + ut + ')') + ' se cumple ' + i$('e^{x}>e^{-x}') + ': ' + d$('A=\\int_{0}^{' + ut + '}(e^{x}-e^{-x})\\,dx=\\Big[e^{x}+e^{-x}\\Big]_{0}^{' + ut + '}=' + vt)],
      };
    },
    function () { // m ln x, eje OX y x = e^k
      const m = rnd.int(1, 2), k = rnd.int(1, 2);
      const A = m * ((k - 1) * Math.exp(k) + 1);
      const show = k === 1 ? String(m) : m === 1 ? 'e^2+1' : '2*e^2+2';
      const et = k === 1 ? 'e' : 'e^{2}';
      return {
        enunciado: 'Considera la función ' + i$('f(x)=' + kc(m) + '\\ln(x)') + ' y el recinto limitado por su gráfica, el eje ' + i$('OX') + ' y la recta ' + i$('x=' + et) + '.',
        eje: true, cuts: [1], f: (x) => m * Math.log(x), g: () => 0, a: 1, b: Math.exp(k), A, show,
        s1: [i$(kc(m) + '\\ln(x)=0\\iff x=1') + '.'],
        s2: ['Entre ' + i$('x=1') + ' y ' + i$('x=' + et) + ' la función es positiva. Por partes, ' + i$('\\int\\ln(x)dx=x\\ln(x)-x+C') + ': ' + d$('A=' + kc(m) + '\\Big[x\\ln(x)-x\\Big]_{1}^{' + et + '}=' + (k === 1 ? kc(m) + '(0+1)=' + m : kc(m) + '(e^{2}+1)'))],
      };
    },
    function () { // k/x y la recta y = s - x
      const [r1, r2] = rnd.pick([[1, 2], [1, 3], [1, 4], [2, 3], [1, 5], [2, 4]]);
      const k = r1 * r2, s = r1 + r2, h = F(s * (r2 - r1), 2), rt = F(r2, r1);
      return {
        enunciado: 'Considera las funciones ' + i$('f(x)=\\dfrac{' + k + '}{x}') + ' (' + i$('x>0') + ') y ' + i$('g(x)=' + s + '-x') + '.',
        cuts: [r1, r2], f: (x) => k / x, g: (x) => s - x, a: r1, b: r2, A: fv2(h) - k * Math.log(r2 / r1), show: fstr(h) + '-' + k + '*ln(' + fstr(rt) + ')',
        s1: [i$('\\dfrac{' + k + '}{x}=' + s + '-x\\iff x^{2}-' + s + 'x+' + k + '=0\\iff x=' + r1 + ',\\ x=' + r2) + '.'],
        s2: ['Entre ambas abscisas la recta está por encima: ' + d$('A=\\int_{' + r1 + '}^{' + r2 + '}\\Big(' + s + '-x-\\dfrac{' + k + '}{x}\\Big)dx=\\Big[' + s + 'x-\\dfrac{x^{2}}{2}-' + k + '\\ln(x)\\Big]_{' + r1 + '}^{' + r2 + '}=' + ftex(h) + '-' + k + (rt.d === 1 ? '\\ln(' + rt.n + ')' : '\\ln\\Big(' + ftex(rt) + '\\Big)'))],
      };
    },
  ];
  function fv2(q) { return q.n / q.d; }
  X.implementar({
    id: 'area-curvas',
    generate() {
      const T = rnd.pick(AREA)();
      return {
        enunciado: T.enunciado,
        partes: [
          part('Halla ' + (T.cuts.length > 1 ? 'las abscisas de los puntos de corte' : 'la abscisa del punto de corte') + (T.eje ? ' de la gráfica con el eje ' + i$('OX') : ' de las gráficas') + '.', 1, { kind: 'list', label: 'x=', value: T.cuts.map((c) => F(c)) }, T.s1),
          part('Calcula el área del recinto.' + HINT, 1.5, E('A=', T.A, T.show), T.s2),
        ],
        data: { f: T.f, g: T.g, a: T.a, b: T.b, cuts: T.cuts, A: T.A },
      };
    },
  });

  X._plant4 = { LIMS, ASI, MONO, INFL, EXA, OPT, SUST, PARTS, AREA };
})(typeof globalThis !== 'undefined' ? globalThis : this);
