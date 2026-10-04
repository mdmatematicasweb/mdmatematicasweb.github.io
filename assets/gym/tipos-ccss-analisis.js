/* Simulacro PAU CCSS — generadores del ejercicio 2 (análisis, 3 puntos): función a trozos, función cúbica,
 * función racional, optimización, primitiva e integral definida, y área entre una parábola y una recta.
 * Verificadores independientes: tests/verify-ccss-analisis.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym, X = root.MDExamCCSS;
  const { rnd, F, d$, i$, fstr, ftex } = G;
  const part = (texto, pts, answer, steps) => ({ texto, pts, answer, steps });
  const fr = (n, d = 1) => F(n, d);
  const num = (f) => f.n / f.d;

  /** Polinomio en x con coeficientes [c_n, …, c_0] (potencias decrecientes): «x^{3}-3x^{2}+2». */
  function poly(cs, v = 'x') {
    const n = cs.length - 1;
    let s = '';
    cs.forEach((c, i) => {
      const e = n - i;
      if (c === 0) return;
      const ab = Math.abs(c), cf = (ab === 1 && e > 0) ? '' : String(ab);
      s += (c < 0 ? '-' : (s ? '+' : '')) + cf + (e === 0 ? '' : e === 1 ? v : v + '^{' + e + '}');
    });
    return s || '0';
  };
  const par = (n) => (n < 0 ? '(' + n + ')' : String(n));
  const dec = (x) => String(Math.round(x * 1e4) / 1e4).replace('.', '{,}');
  const ev = (cs, x) => cs.reduce((s, c) => s * x + c, 0);

  /* ===================== Función a trozos ===================== */
  X.implementar({
    id: 'trozos',
    generate() {
      for (;;) {
        const c = rnd.int(1, 3), m = rnd.pick([-4, -3, -2, -1, 1, 2, 3, 4, 5]), n = rnd.int(-6, 6);
        const a = m - 2 * c, b = m * c + n - c * c - a * c;
        if (a === 0 || b === 0 || Math.abs(a) > 6 || Math.abs(b) > 9) continue;
        const f1 = (x) => x * x + a * x + b, f2 = (x) => m * x + n;
        const p1 = f1(c - 1), p2 = f2(c + 1);
        return {
          enunciado: 'Se considera la función ' + d$('f(x)=\\begin{cases}x^{2}+ax+b&\\text{si }x<' + c + '\\\\ ' + poly([m, n]) + '&\\text{si }x\\ge ' + c + '\\end{cases}') + 'donde ' + i$('a') + ' y ' + i$('b') + ' son números reales. Se quiere que ' + i$('f') + ' sea continua y derivable en ' + i$('x=' + c) + '.',
          partes: [
            part('Impón que las derivadas laterales en ' + i$('x=' + c) + ' coincidan y calcula ' + i$('a') + '.', 1, { kind: 'number', label: 'a=', value: fr(a) },
              ['Para ' + i$('x<' + c) + ': ' + i$('f\'(x)=2x+a') + '. Para ' + i$('x>' + c) + ': ' + i$('f\'(x)=' + m) + '.',
                d$('f\'(' + c + '^-)=2\\cdot' + c + '+a=' + (2 * c) + '+a\\qquad f\'(' + c + '^+)=' + m),
                d$((2 * c) + '+a=' + m + '\\ \\Rightarrow\\ a=' + a)]),
            part('Impón que ' + i$('f') + ' sea continua en ' + i$('x=' + c) + ' y calcula ' + i$('b') + ' (con el valor de ' + i$('a') + ' hallado).', 1, { kind: 'number', label: 'b=', value: fr(b) },
              [d$('\\lim_{x\\to' + c + '^-}f(x)=' + c + '^{2}+a\\cdot' + c + '+b=' + (c * c) + '+' + par(a) + '\\cdot' + c + '+b=' + (c * c + a * c) + '+b'),
                d$('f(' + c + ')=\\lim_{x\\to' + c + '^+}f(x)=' + m + '\\cdot' + c + '+' + par(n) + '=' + (m * c + n)),
                d$((c * c + a * c) + '+b=' + (m * c + n) + '\\ \\Rightarrow\\ b=' + b)]),
            part('Con esos valores, calcula ' + i$('f(' + (c - 1) + ')') + ' y ' + i$('f(' + (c + 1) + ')') + '.', 1, { kind: 'matrix', value: [[fr(p1), fr(p2)]], colLabels: ['f(' + (c - 1) + ')', 'f(' + (c + 1) + ')'] },
              [i$((c - 1) + '<' + c) + ': ' + d$('f(' + (c - 1) + ')=' + par(c - 1) + '^{2}+' + par(a) + '\\cdot' + par(c - 1) + '+' + par(b) + '=' + p1),
                i$((c + 1) + '\\ge' + c) + ': ' + d$('f(' + (c + 1) + ')=' + m + '\\cdot' + par(c + 1) + '+' + par(n) + '=' + p2)]),
          ],
          data: { c, m, n, a, b, p1, p2 },
        };
      }
    },
  });

  /* ===================== Función cúbica: extremos e inflexión ===================== */
  X.implementar({
    id: 'polinomica',
    generate() {
      for (;;) {
        const p = rnd.int(-4, 3), q = rnd.int(p + 2, 6);
        if ((p + q) % 2) continue;
        const s = (p + q) / 2, k = rnd.int(-9, 9);
        const cs = [1, -3 * s, 3 * p * q, k];
        if (Math.abs(3 * p * q) > 45 || cs[2] === 0) continue;
        const f = (x) => ev(cs, x);
        const fp = f(p), fq = f(q);
        const d1 = [3, -6 * s, 3 * p * q], d2 = [6, -6 * s];
        return {
          enunciado: 'Se considera la función ' + i$('f(x)=' + poly(cs)) + '.',
          partes: [
            part('Calcula los puntos críticos de ' + i$('f') + ' (donde ' + i$('f\'(x)=0') + '). <small>(Valores separados por punto y coma.)</small>', 1, { kind: 'list', label: 'x=', value: [fr(p), fr(q)] },
              [d$('f\'(x)=' + poly(d1) + '=3\\,(' + poly([1, -2 * s, p * q]) + ')'),
                d$('x^{2}' + (s ? (-2 * s < 0 ? '-' : '+') + Math.abs(2 * s) + 'x' : '') + (p * q < 0 ? '-' : '+') + Math.abs(p * q) + '=0\\ \\Rightarrow\\ x=' + p + ',\\ x=' + q)]),
            part('Estudia el crecimiento de ' + i$('f') + ' y calcula el valor de ' + i$('f') + ' en su máximo relativo y en su mínimo relativo.', 1, { kind: 'matrix', value: [[fr(fp), fr(fq)]], colLabels: ['f_{\\max}', 'f_{\\min}'] },
              [d$('f\'(x)=3(x-' + par(p) + ')(x-' + par(q) + ')>0\\text{ en }(-\\infty,' + p + ')\\cup(' + q + ',+\\infty)\\qquad f\'(x)<0\\text{ en }(' + p + ',' + q + ')'),
                'Crece, decrece y vuelve a crecer: hay un <b>máximo relativo en ' + i$('x=' + p) + '</b> y un <b>mínimo relativo en ' + i$('x=' + q) + '</b>.',
                d$('f(' + p + ')=' + fp + '\\qquad f(' + q + ')=' + fq)]),
            part('Halla la abscisa del punto de inflexión.', 1, { kind: 'number', label: 'x=', value: fr(s) },
              [d$('f\'\'(x)=' + poly(d2) + '=0\\ \\Rightarrow\\ x=' + s), 'Cambia de signo ' + i$('f\'\'') + ' en ' + i$('x=' + s) + ' (cóncava hacia abajo a la izquierda, hacia arriba a la derecha): es punto de inflexión.']),
          ],
          data: { cs, p, q, s },
        };
      }
    },
  });
  X.grafica('polinomica', (d) => ({ type: '2d', x: [d.p - 2.5, d.q + 2.5], curves: [{ f: (x) => ev(d.cs, x), label: 'f' }], points: [{ x: d.p, y: ev(d.cs, d.p), label: 'máx' }, { x: d.q, y: ev(d.cs, d.q), label: 'mín' }, { x: d.s, y: ev(d.cs, d.s), label: 'infl.' }] }));

  /* ===================== Función racional ===================== */
  X.implementar({
    id: 'racional',
    generate() {
      for (;;) {
        const a = rnd.pick([-3, -2, -1, 1, 2, 3, 4]), b = rnd.int(-6, 6), c = rnd.pick([-3, -2, -1, 1, 2, 3, 4]);
        if (a * c + b === 0) continue;
        const x0 = rnd.int(-2, 5);
        if (x0 === c) continue;
        const k = -(a * c + b);                                   // f'(x) = k/(x-c)^2
        const den = poly([1, -c]);
        const val = fr(k, (x0 - c) * (x0 - c));
        return {
          enunciado: 'Se considera la función ' + i$('f(x)=\\dfrac{' + poly([a, b]) + '}{' + den + '}') + '.',
          partes: [
            part('Calcula el dominio de ' + i$('f') + ': ¿qué valor de ' + i$('x') + ' no pertenece a él? ¿Qué asíntota vertical tiene? <small>(Escribe el valor de ' + i$('x') + '.)</small>', 1, { kind: 'number', label: 'x=', value: fr(c) },
              ['El denominador se anula en ' + i$(den + '=0\\ \\Rightarrow\\ x=' + c) + ': ' + i$('\\mathrm{Dom}\\,f=\\mathbb{R}\\setminus\\{' + c + '\\}') + '.',
                'Como el numerador no se anula en ' + i$('x=' + c) + ' (vale ' + i$(a * c + b) + '), la recta ' + i$('x=' + c) + ' es asíntota vertical.']),
            part('Calcula la asíntota horizontal ' + i$('y=L') + ': ' + i$('L=\\displaystyle\\lim_{x\\to+\\infty}f(x)') + '.', 1, { kind: 'number', label: 'L=', value: fr(a) },
              [d$('\\lim_{x\\to+\\infty}\\dfrac{' + poly([a, b]) + '}{' + den + '}=\\dfrac{' + a + '}{1}=' + a), 'Asíntota horizontal: ' + i$('y=' + a) + '.']),
            part('Calcula la pendiente de la recta tangente a la gráfica en ' + i$('x=' + x0) + ', es decir, ' + i$('f\'(' + x0 + ')') + '.', 1, { kind: 'number', label: 'f\'(' + x0 + ')=', value: val },
              [d$('f\'(x)=\\dfrac{' + a + '\\,(' + den + ')-(' + poly([a, b]) + ')\\cdot1}{(' + den + ')^{2}}=\\dfrac{' + k + '}{(' + den + ')^{2}}'),
                d$('f\'(' + x0 + ')=\\dfrac{' + k + '}{(' + x0 + (c < 0 ? '+' : '-') + Math.abs(c) + ')^{2}}=\\dfrac{' + k + '}{' + (x0 - c) * (x0 - c) + '}=' + ftex(val))]),
          ],
          data: { a, b, c, x0, k },
        };
      }
    },
  });

  /* ===================== Optimización: beneficio máximo ===================== */
  const OPT_CTX = [
    { s: 'Una empresa de mermeladas', v: 'frascos', u: 'miles de frascos', b: 'miles de euros' },
    { s: 'Un taller de bicicletas', v: 'bicicletas', u: 'decenas de bicicletas', b: 'cientos de euros' },
    { s: 'Una panadería', v: 'barras de pan', u: 'cientos de barras', b: 'cientos de euros' },
  ];
  X.implementar({
    id: 'optimizacion',
    generate() {
      for (;;) {
        const cx = rnd.pick(OPT_CTX);
        const a = rnd.pick([1, 1, 2, 3]), r1 = rnd.int(1, 5), r2 = rnd.int(r1 + 2, 10);
        const cs = [-a, a * (r1 + r2), -a * r1 * r2];
        const v = F(r1 + r2, 2), best = F(a * (r2 - r1) * (r2 - r1), 4);
        const B = (x) => ev(cs, x);
        return {
          enunciado: cx.s + ' estima que el beneficio, en ' + cx.b + ', al fabricar y vender ' + i$('x') + ' ' + cx.u + ' viene dado por ' + d$('B(x)=' + poly(cs) + ',\\qquad 0\\le x\\le ' + (r2 + 1) + '.'),
          partes: [
            part('¿Cuántas unidades (en ' + cx.u + ') hay que vender para que el beneficio sea máximo?', 1, { kind: 'number', label: 'x=', value: v },
              [d$('B\'(x)=' + poly([-2 * a, a * (r1 + r2)]) + '=0\\ \\Rightarrow\\ x=\\dfrac{' + a * (r1 + r2) + '}{' + 2 * a + '}=' + ftex(v)),
                'Es un máximo porque ' + i$('B\'\'(x)=' + (-2 * a) + '<0') + ' (parábola abierta hacia abajo).']),
            part('Calcula ese beneficio máximo (en ' + cx.b + ').', 1, { kind: 'number', label: 'B_{\\max}=', value: best },
              [d$('B\\left(' + ftex(v) + '\\right)=' + ftex(best))]),
            part('¿Entre qué dos valores de ' + i$('x') + ' el beneficio es positivo? <small>(Escribe primero el menor.)</small>', 1, { kind: 'matrix', value: [[fr(r1), fr(r2)]], colLabels: ['x_1', 'x_2'] },
              [d$('B(x)=0\\ \\Rightarrow\\ ' + poly([-a, a * (r1 + r2), -a * r1 * r2]) + '=0\\ \\Rightarrow\\ x=' + r1 + ',\\ x=' + r2),
                'Como la parábola está abierta hacia abajo, ' + i$('B(x)>0') + ' entre las dos raíces: ' + i$('' + r1 + '<x<' + r2) + '.']),
          ],
          data: { a, r1, r2, cs, v: num(v), best: num(best), tope: r2 + 1 },
        };
      }
    },
  });
  X.grafica('optimizacion', (d) => ({ type: '2d', x: [0, d.tope], curves: [{ f: (x) => ev(d.cs, x), label: 'B' }], points: [{ x: d.v, y: d.best, label: 'máximo' }, { x: d.r1, y: 0, label: '' }, { x: d.r2, y: 0, label: '' }] }));

  /* ===================== Primitiva, integral definida y área ===================== */
  const P3 = (p, q) => (x) => G.fadd(G.fadd(fr(x * x * x, 3), fr(p * x * x, 2)), fr(q * x));   // primitiva de x²+px+q con constante 0
  const shw = (f) => ftex(f);
  X.implementar({
    id: 'int-primitiva',
    generate() {
      for (;;) {
        const r = rnd.int(-2, 3), s = rnd.int(r + 2, r + 4);
        const p = -(r + s), q = r * s;
        const a = r - rnd.int(1, 2), b = r + rnd.int(1, Math.min(2, s - r - 1));
        const x0 = rnd.pick([2, 3, 4]), k = rnd.int(-3, 5);
        const P = P3(p, q);
        const Fx0 = G.fadd(P(x0), fr(k));
        const I = G.fsub(P(b), P(a));
        const area = G.fsub(G.fmul(fr(2), P(r)), G.fadd(P(a), P(b)));
        const cs = [1, p, q];
        if (Math.abs(p) > 7 || q === 0 && r === 0) continue;
        const show = (v) => ({ kind: 'expr', value: num(v), show: fstr(v) });
        return {
          enunciado: 'Se considera la función ' + i$('f(x)=' + poly(cs)) + '.',
          partes: [
            part('Halla la primitiva ' + i$('F') + ' de ' + i$('f') + ' que cumple ' + i$('F(0)=' + k) + ' y calcula ' + i$('F(' + x0 + ')') + '. <small>(Fracción o decimal.)</small>', 1, Object.assign(show(Fx0), { label: 'F(' + x0 + ')=' }),
              [d$('F(x)=\\int(' + poly(cs) + ')\\,dx=' + poly([1, 0, 0, 0]).replace('x^{3}', '\\dfrac{x^{3}}{3}') + (p ? (p < 0 ? '-' : '+') + (Math.abs(p) === 1 ? '' : Math.abs(p)) + '\\dfrac{x^{2}}{2}' : '') + (q ? (q < 0 ? '-' : '+') + (Math.abs(q) === 1 ? '' : Math.abs(q)) + 'x' : '') + '+C'),
                i$('F(0)=C=' + k) + ', luego ' + i$('F(' + x0 + ')=' + shw(P(x0)) + '+' + par(k) + '=' + shw(Fx0)) + '.']),
            part('Calcula la integral definida ' + i$('\\displaystyle\\int_{' + a + '}^{' + b + '}f(x)\\,dx') + '. <small>(Fracción o decimal.)</small>', 1, Object.assign(show(I), { label: 'I=' }),
              ['Regla de Barrow con ' + i$('G(x)=\\frac{x^{3}}{3}' + (p ? (p < 0 ? '-' : '+') + (Math.abs(p) === 1 ? '' : Math.abs(p)) + '\\frac{x^{2}}{2}' : '') + (q ? (q < 0 ? '-' : '+') + (Math.abs(q) === 1 ? '' : Math.abs(q)) + 'x' : '')) + ':',
                d$('\\int_{' + a + '}^{' + b + '}f(x)\\,dx=G(' + b + ')-G(' + a + ')=' + shw(P(b)) + '-\\left(' + shw(P(a)) + '\\right)=' + shw(I))]),
            part('La función ' + i$('f') + ' se anula en ' + i$('x=' + r) + ' dentro del intervalo ' + i$('[' + a + ',' + b + ']') + '. Calcula el área limitada por la gráfica de ' + i$('f') + ', el eje ' + i$('OX') + ' y las rectas ' + i$('x=' + a) + ' y ' + i$('x=' + b) + '. <small>(Fracción o decimal.)</small>', 1, Object.assign(show(area), { label: '\\text{Área}=' }),
              ['Como ' + i$('f') + ' cambia de signo en ' + i$('x=' + r) + ', se integra por separado en ' + i$('[' + a + ',' + r + ']') + ' y ' + i$('[' + r + ',' + b + ']') + ' y se suman los valores absolutos.',
                d$('\\int_{' + a + '}^{' + r + '}f=' + shw(G.fsub(P(r), P(a))) + '\\qquad \\int_{' + r + '}^{' + b + '}f=' + shw(G.fsub(P(b), P(r)))),
                d$('\\text{Área}=\\left|' + shw(G.fsub(P(r), P(a))) + '\\right|+\\left|' + shw(G.fsub(P(b), P(r))) + '\\right|=' + shw(area) + '\\ \\text{u}^{2}')]),
          ],
          data: { p, q, r, s, a, b, x0, k, F0: num(Fx0), I: num(I), area: num(area) },
        };
      }
    },
  });
  X.grafica('int-primitiva', (d) => ({ type: '2d', x: [d.a - 1.5, d.b + 1.5], curves: [{ f: (x) => x * x + d.p * x + d.q, label: 'f' }], fill: [{ f: (x) => x * x + d.p * x + d.q, g: () => 0, a: d.a, b: d.b }], points: [{ x: d.r, y: 0, label: '' }] }));

  /* ===================== Área entre una parábola y una recta ===================== */
  X.implementar({
    id: 'area-curvas',
    generate() {
      for (;;) {
        const x1 = rnd.int(-3, 2), x2 = rnd.int(x1 + 1, Math.min(x1 + 5, 5));
        const m = rnd.int(-3, 4), n = rnd.int(-3, 6);
        const p = m - (x1 + x2), q = n + x1 * x2;
        if (Math.abs(p) > 8 || Math.abs(q) > 12) continue;
        // H = primitiva de g - f (constante 0): H(x) = (m-p)x²/2 - x³/3 + (n-q)x
        const H = (x) => G.fadd(G.fsub(fr((m - p) * x * x, 2), fr(x * x * x, 3)), fr((n - q) * x));
        const h1 = H(x1), h2 = H(x2), area = G.fsub(h2, h1);
        const gf = [-1, m - p, n - q];
        return {
          enunciado: 'Se consideran la parábola ' + i$('f(x)=' + poly([1, p, q])) + ' y la recta ' + i$('g(x)=' + poly([m, n])) + '.',
          partes: [
            part('Calcula las abscisas de los puntos de corte de ambas gráficas. <small>(Escribe primero la menor.)</small>', 1, { kind: 'matrix', value: [[fr(x1), fr(x2)]], colLabels: ['x_1', 'x_2'] },
              [d$('f(x)=g(x)\\ \\Rightarrow\\ ' + poly([1, p - m, q - n]) + '=0\\ \\Rightarrow\\ x=' + x1 + ',\\ x=' + x2)]),
            part('Halla la primitiva ' + i$('H(x)') + ' de ' + i$('g(x)-f(x)') + ' con constante cero y calcula ' + i$('H(x_1)') + ' y ' + i$('H(x_2)') + '.', 1, { kind: 'matrix', value: [[h1, h2]], colLabels: ['H(x_1)', 'H(x_2)'] },
              [d$('g(x)-f(x)=' + poly(gf) + '\\ \\Rightarrow\\ H(x)=' + (m - p ? '\\dfrac{' + (m - p === 1 ? '' : m - p === -1 ? '-' : m - p) + 'x^{2}}{2}' : '') + '-\\dfrac{x^{3}}{3}' + (n - q ? (n - q < 0 ? '-' : '+') + (Math.abs(n - q) === 1 ? '' : Math.abs(n - q)) + 'x' : '')),
                d$('H(' + x1 + ')=' + shw(h1) + '\\qquad H(' + x2 + ')=' + shw(h2))]),
            part('Calcula el área de la región limitada por las dos gráficas. <small>(Fracción o decimal.)</small>', 1, { kind: 'expr', label: '\\text{Área}=', value: num(area), show: fstr(area) },
              ['Entre los cortes la recta está por encima de la parábola, así que el área es ' + i$('\\int_{' + x1 + '}^{' + x2 + '}(g-f)\\,dx') + '.',
                d$('\\text{Área}=H(' + x2 + ')-H(' + x1 + ')=' + shw(h2) + '-\\left(' + shw(h1) + '\\right)=' + shw(area) + '\\ \\text{u}^{2}')]),
          ],
          data: { p, q, m, n, x1, x2, h1: num(h1), h2: num(h2), area: num(area) },
        };
      }
    },
  });
  X.grafica('area-curvas', (d) => ({ type: '2d', x: [d.x1 - 1.5, d.x2 + 1.5], curves: [{ f: (x) => x * x + d.p * x + d.q, label: 'f' }, { f: (x) => d.m * x + d.n, label: 'g' }], fill: [{ f: (x) => x * x + d.p * x + d.q, g: (x) => d.m * x + d.n, a: d.x1, b: d.x2 }], points: [{ x: d.x1, y: d.m * d.x1 + d.n, label: '' }, { x: d.x2, y: d.m * d.x2 + d.n, label: '' }] }));
})(typeof globalThis !== 'undefined' ? globalThis : this);
