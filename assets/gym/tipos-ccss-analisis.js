/* Generadores del simulacro CCSS — ejercicio 2 (análisis, 3 puntos).
 * Tipos: asintotas, trozos, tangente, monotonia, extremos-abs, optimizacion, primitiva-area, area-curvas.
 * Verificadores independientes: tests/examen-ccss.test.js.
 */
(function (root) {
  'use strict';
  const X = root.MDExamCCSS;
  const U = root.MDExamCCSSUtil;
  const { G, rnd, F, ftex, fstr, d$, i$, part, pEval, pDer, pInt, pEvalF, pTex, pTexF, pMul, pAdd, dtex, dtxt, fixt } = U;
  const { fadd, fsub, fmul, fdiv } = G;

  const sg = (n) => (n < 0 ? '-' : '+') + Math.abs(n);
  const co = (n) => (n === 1 ? '' : n === -1 ? '-' : String(n));
  const INF = ['$+\\infty$', '$-\\infty$'];
  /** (x - d) con signo correcto: x-3, x+2, x */
  const xm = (d) => (d === 0 ? 'x' : 'x' + (d > 0 ? '-' : '+') + Math.abs(d));
  /** a·x + b como LaTeX */
  const lin = (a, b) => (a === 0 ? String(b) : co(a) + 'x' + (b === 0 ? '' : sg(b)));

  /* ===================== asintotas ===================== */
  X.implementar({
    id: 'asintotas',
    generate() {
      const oblicua = rnd.int(0, 1) === 1;
      for (;;) {
        const d = rnd.int(-4, 4);
        if (!oblicua) {
          const p = rnd.pick([-3, -2, -1, 1, 2, 3, 4]), q = rnd.int(-6, 6);
          const nd = p * d + q;                     // numerador en x=d
          if (nd === 0) continue;
          const ftx = '\\dfrac{' + lin(p, q) + '}{' + xm(d) + '}';
          const dr = nd > 0 ? 0 : 1, il = nd > 0 ? 1 : 0;       // índice en INF de lím por la derecha / izquierda
          return {
            enunciado: 'Considera la función ' + d$('f(x)=' + ftx) + '.',
            partes: [
              part('Calcula el dominio de ' + i$('f') + ' y la ecuación de su asíntota vertical ' + i$('x=a') + '. Indica el valor de ' + i$('a') + '.', 1, { kind: 'number', label: 'a=', value: F(d) },
                ['El denominador se anula en ' + i$('x=' + d) + ', donde el numerador vale ' + i$(String(nd)) + '≠0.', 'Dominio ' + i$('\\mathbb{R}\\setminus\\{' + d + '\\}') + '; asíntota vertical ' + i$('x=' + d) + '.']),
              part('Calcula la asíntota horizontal ' + i$('y=b') + '. Indica el valor de ' + i$('b') + '.', 1, { kind: 'number', label: 'b=', value: F(p) },
                ['Numerador y denominador tienen el mismo grado: ' + d$('\\lim_{x\\to\\pm\\infty}f(x)=' + p) + 'Asíntota horizontal ' + i$('y=' + p) + '.']),
              part('Calcula ' + i$('\\displaystyle\\lim_{x\\to ' + d + '^+}f(x)') + '.', 0.5, { kind: 'choice', options: INF, value: dr },
                ['En ' + i$('x=' + d) + ' el numerador vale ' + i$(String(nd)) + (nd > 0 ? ' (positivo)' : ' (negativo)') + ' y, a la derecha, ' + i$(xm(d)) + '>0: el cociente es ' + (nd > 0 ? 'positivo' : 'negativo') + ' y ' + i$('\\to' + (nd > 0 ? '+' : '-') + '\\infty') + '.']),
              part('Calcula ' + i$('\\displaystyle\\lim_{x\\to ' + d + '^-}f(x)') + '.', 0.5, { kind: 'choice', options: INF, value: il },
                ['A la izquierda, ' + i$(xm(d)) + '<0 y el numerador vale ' + i$(String(nd)) + ': el cociente es ' + (nd > 0 ? 'negativo' : 'positivo') + ' y ' + i$('\\to' + (nd > 0 ? '-' : '+') + '\\infty') + '.']),
            ],
            data: { oblicua, d, p, q, nd },
          };
        }
        // oblicua: f(x) = (a x² + b x + c)/(x - d)
        const a = rnd.pick([1, 1, 2, -1]), b = rnd.int(-5, 5), c = rnd.int(-6, 6);
        const nd = a * d * d + b * d + c;
        if (nd === 0) continue;
        const m = a, n = b + a * d;
        const num = pTex([a, b, c]);
        const dr = nd > 0 ? 0 : 1, il = nd > 0 ? 1 : 0;
        const rem = nd;                    // resto de la división: f(x) = m·x + n + rem/(x−d)
        return {
          enunciado: 'Considera la función ' + d$('f(x)=\\dfrac{' + num + '}{' + xm(d) + '}') + '.',
          partes: [
            part('Calcula la ecuación de su asíntota vertical ' + i$('x=a') + '. Indica el valor de ' + i$('a') + '.', 1, { kind: 'number', label: 'a=', value: F(d) },
              ['El denominador se anula en ' + i$('x=' + d) + ' y el numerador vale ' + i$(String(nd)) + '≠0: asíntota vertical ' + i$('x=' + d) + '.']),
            part('Calcula la asíntota oblicua ' + i$('y=mx+n') + '. Indica ' + i$('m') + ' y ' + i$('n') + '.', 1,
              { kind: 'multi', parts: [{ kind: 'number', label: 'm=', value: F(m) }, { kind: 'number', label: 'n=', value: F(n) }] },
              ['El grado del numerador es una unidad mayor que el del denominador. Se divide: ' + d$('f(x)=' + lin(m, n) + (rem > 0 ? '+' : '-') + '\\dfrac{' + Math.abs(rem) + '}{' + xm(d) + '}'), 'Asíntota oblicua ' + i$('y=' + lin(m, n)) + ': ' + i$('m=\\displaystyle\\lim\\frac{f(x)}{x}=' + m) + ' y ' + i$('n=\\displaystyle\\lim(f(x)-mx)=' + n) + '.']),
            part('Calcula ' + i$('\\displaystyle\\lim_{x\\to ' + d + '^+}f(x)') + '.', 0.5, { kind: 'choice', options: INF, value: dr },
              ['El numerador vale ' + i$(String(nd)) + ' en ' + i$('x=' + d) + ' y, a la derecha, el denominador es positivo: el límite es ' + i$((nd > 0 ? '+' : '-') + '\\infty') + '.']),
            part('Calcula ' + i$('\\displaystyle\\lim_{x\\to ' + d + '^-}f(x)') + '.', 0.5, { kind: 'choice', options: INF, value: il },
              ['A la izquierda el denominador es negativo: el límite es ' + i$((nd > 0 ? '-' : '+') + '\\infty') + '.']),
          ],
          data: { oblicua, d, a, b, c, nd, m, n },
        };
      }
    },
  });

  /* ===================== trozos ===================== */
  X.implementar({
    id: 'trozos',
    generate() {
      for (;;) {
        const x0 = rnd.pick([1, 2]);
        const a = rnd.int(-5, 5), b = rnd.int(-5, 5);
        const L0 = x0 * x0 + a * x0 + b, L1 = 2 * x0 + a;
        const tipo = rnd.pick(x0 === 1 ? ['inv', 'log', 'lin'] : ['inv', 'lin']);
        let gtex, g0 = L0, k, c, g1x;           // g1x: derivada en x0+1
        let valorEn, derEn;
        if (tipo === 'inv') {
          k = -L1 * x0 * x0; c = L0 - k / x0;
          if (!Number.isInteger(c) || Math.abs(k) > 24 || Math.abs(c) > 20 || k === 0) continue;
          gtex = '\\dfrac{' + k + '}{x}' + (c === 0 ? '' : sg(c));
          derEn = F(-k, (x0 + 1) * (x0 + 1));
        } else if (tipo === 'log') {
          k = L1; c = L0;
          if (k === 0 || Math.abs(k) > 12) continue;
          gtex = co(k) + '\\ln x' + (c === 0 ? '' : sg(c));
          derEn = F(k, x0 + 1);
        } else {
          k = L1; c = L0 - k * x0;
          if (Math.abs(c) > 20) continue;
          gtex = lin(k, c);
          derEn = F(k);
        }
        const dg = tipo === 'inv' ? (k < 0 ? '\\dfrac{' + (-k) + '}{x^2}' : '-\\dfrac{' + k + '}{x^2}') : tipo === 'log' ? '\\dfrac{' + k + '}{x}' : String(k);
        const fm1 = 1 - a + b;                    // f(-1) con a, b reales
        return {
          enunciado: 'Considera la función ' + d$('f(x)=\\begin{cases}x^2+ax+b&\\text{si }x\\le ' + x0 + '\\\\' + gtex + '&\\text{si }x>' + x0 + '\\end{cases}') + 'donde ' + i$('a') + ' y ' + i$('b') + ' son números reales.',
          partes: [
            part('Halla ' + i$('a') + ' para que ' + i$('f') + ' sea derivable en ' + i$('x=' + x0) + '. <small>(La derivabilidad exige que las derivadas laterales coincidan.)</small>', 1, { kind: 'number', label: 'a=', value: F(a) },
              ['Derivadas: ' + i$('f\'(x)=2x+a') + ' si ' + i$('x<' + x0) + ' y ' + i$('f\'(x)=' + dg) + ' si ' + i$('x>' + x0) + '.',
                'Laterales en ' + i$('x=' + x0) + ': ' + i$('f\'(' + x0 + '^-)=' + (2 * x0) + '+a') + ' y ' + i$('f\'(' + x0 + '^+)=' + L1) + '. Igualando: ' + i$('a=' + a) + '.']),
            part('Halla ' + i$('b') + ' para que ' + i$('f') + ' sea continua en ' + i$('x=' + x0) + ' (con el valor de ' + i$('a') + ' anterior).', 1, { kind: 'number', label: 'b=', value: F(b) },
              ['Continuidad en ' + i$('x=' + x0) + ': ' + i$('x_0^2+ax_0+b=g(x_0)') + ', con ' + i$('g(' + x0 + ')=' + L0) + '.', d$(x0 * x0 + '+(' + a + ')\\cdot' + x0 + '+b=' + L0), 'Resulta ' + i$('b=' + b) + '.']),
            part('Con esos valores, calcula ' + i$('f(-1)') + '.', 0.5, { kind: 'number', label: 'f(-1)=', value: F(fm1) },
              [i$('f(-1)=1+(' + a + ')\\cdot(-1)+(' + b + ')=' + fm1) + '.']),
            part('Con esos valores, calcula la pendiente de la recta tangente a la gráfica en ' + i$('x=' + (x0 + 1)) + '.', 0.5, { kind: 'number', label: 'm=', value: derEn },
              ['En ' + i$('x=' + (x0 + 1)) + ' se usa el segundo trozo: ' + i$('m=f\'(' + (x0 + 1) + ')=' + fstr(derEn)) + '.']),
          ],
          data: { x0, a, b, tipo, k, c, L0, L1, fm1, der: [derEn.n, derEn.d] },
        };
      }
    },
  });

  /* ===================== tangente ===================== */
  X.implementar({
    id: 'tangente',
    generate() {
      if (rnd.int(0, 2) > 0) {
        // polinómica cúbica con tangente paralela a una recta dada
        for (;;) {
          const r1 = rnd.int(-4, 4), r2 = rnd.int(-4, 4);
          if (r1 >= r2 || (r1 + r2) % 2 !== 0) continue;
          const m1 = rnd.int(-3, 6), d0 = rnd.int(-5, 5);
          const bb = -3 * (r1 + r2) / 2, cc = 3 * r1 * r2 + m1;
          const f = [1, bb, cc, d0];
          const x0 = rnd.int(-2, 2);
          if (Math.abs(x0 - r1) + Math.abs(x0 - r2) === 0) continue;
          const y0 = pEval(f, x0), m = pEval(pDer(f), x0), n = y0 - m * x0;
          if (Math.abs(y0) > 30 || Math.abs(m) > 30 || m === m1) continue;
          const ftxt = pTex(f);
          return {
            enunciado: 'Considera la función ' + i$('f(x)=' + ftxt) + '.',
            partes: [
              part('Calcula ' + i$('f(' + x0 + ')') + ' y ' + i$('f\'(' + x0 + ')') + '.', 0.75,
                { kind: 'multi', parts: [{ kind: 'number', label: 'f(' + x0 + ')=', value: F(y0) }, { kind: 'number', label: 'f\'(' + x0 + ')=', value: F(m) }] },
                [d$('f\'(x)=' + pTex(pDer(f))), i$('f(' + x0 + ')=' + y0) + ' y ' + i$('f\'(' + x0 + ')=' + m) + '.']),
              part('Halla la recta tangente a la gráfica en ' + i$('x=' + x0) + ', escrita como ' + i$('y=mx+n') + '. Indica ' + i$('m') + ' y ' + i$('n') + '.', 1.25,
                { kind: 'multi', parts: [{ kind: 'number', label: 'm=', value: F(m) }, { kind: 'number', label: 'n=', value: F(n) }] },
                ['Recta tangente: ' + i$('y-' + (y0 < 0 ? '(' + y0 + ')' : y0) + '=' + m + '(x' + (x0 < 0 ? '+' + (-x0) : x0 === 0 ? '' : '-' + x0) + ')') + '.', 'Resulta ' + i$('y=' + lin(m, n)) + '.']),
              part('Halla las abscisas de los puntos de la gráfica en los que la tangente es paralela a la recta ' + i$('y=' + lin(m1, 7)) + '. <small>(valores separados por «;»)</small>', 1, { kind: 'list', value: [F(r1), F(r2)] },
                ['Pendiente ' + i$(String(m1)) + ': ' + i$('f\'(x)=' + pTex(pDer(f)) + '=' + m1) + ', es decir, ' + i$(pTex(pAdd(pDer(f), [-m1])) + '=0') + '.', 'Soluciones: ' + i$('x=' + r1) + ' y ' + i$('x=' + r2) + '.']),
            ],
            data: { f, x0, y0, m, n, m1, r1, r2 },
          };
        }
      }
      // logarítmica: f(x) = k·ln x + c·x en x0 = 1; tangente paralela a una recta
      for (;;) {
        const k = rnd.pick([-6, -4, -3, -2, 2, 3, 4, 6, 8]), c = rnd.int(-3, 4);
        const xp = rnd.pick([-4, -2, -1, 2, 4].filter((v) => v > 0 && k % v === 0));
        if (!xp) continue;
        const m1 = k / xp + c;
        const m = k + c, n = c - m;     // en x0=1: f(1)=c, f'(1)=k+c, n = f(1) - m*1
        return {
          enunciado: 'Considera la función ' + i$('f(x)=' + co(k) + '\\ln x' + (c === 0 ? '' : (c < 0 ? '-' : '+') + (Math.abs(c) === 1 ? '' : Math.abs(c)) + 'x')) + ', definida para ' + i$('x>0') + '.',
          partes: [
            part('Calcula ' + i$('f(1)') + ' y ' + i$('f\'(1)') + '.', 0.75, { kind: 'multi', parts: [{ kind: 'number', label: 'f(1)=', value: F(c) }, { kind: 'number', label: 'f\'(1)=', value: F(m) }] },
              [d$('f\'(x)=\\dfrac{' + k + '}{x}' + (c === 0 ? '' : sg(c))), i$('f(1)=' + c + '\\ (\\text{pues }\\ln1=0)') + ' y ' + i$('f\'(1)=' + k + (c === 0 ? '' : sg(c)) + '=' + m) + '.']),
            part('Halla la recta tangente en ' + i$('x=1') + ', escrita como ' + i$('y=mx+n') + '. Indica ' + i$('m') + ' y ' + i$('n') + '.', 1.25,
              { kind: 'multi', parts: [{ kind: 'number', label: 'm=', value: F(m) }, { kind: 'number', label: 'n=', value: F(n) }] },
              [d$('y-' + (c < 0 ? '(' + c + ')' : c) + '=' + m + '(x-1)'), 'Resulta ' + i$('y=' + lin(m, n)) + '.']),
            part('Halla la abscisa del punto de la gráfica en el que la tangente es paralela a la recta ' + i$('y=' + lin(m1, 3)) + '.', 1, { kind: 'number', label: 'x=', value: F(xp) },
              [i$('f\'(x)=\\dfrac{' + k + '}{x}' + (c === 0 ? '' : sg(c)) + '=' + m1) + ' ⟹ ' + i$('\\dfrac{' + k + '}{x}=' + (m1 - c)) + ' ⟹ ' + i$('x=' + xp) + '.']),
          ],
          data: { log: true, k, c, m, n, m1, xp },
        };
      }
    },
  });

  /* ===================== monotonia ===================== */
  /** Cúbica f = x³ + a x² + b x + c con f' = 3(x-r1)(x-r2), r1<r2 de la misma paridad. */
  function cubica() {
    for (;;) {
      const r1 = rnd.int(-4, 3), r2 = rnd.int(-3, 5);
      if (r1 >= r2 || (r1 + r2) % 2 !== 0 || r2 - r1 > 6) continue;
      const a = -3 * (r1 + r2) / 2, b = 3 * r1 * r2, c = rnd.int(-6, 6);
      const f = [1, a, b, c];
      const ys = [r1, r2].map((r) => pEval(f, r));
      if (ys.some((y) => Math.abs(y) > 40)) continue;
      return { r1, r2, f };
    }
  }
  X.implementar({
    id: 'monotonia',
    generate() {
      const { r1, r2, f } = cubica();
      const y1 = pEval(f, r1), y2 = pEval(f, r2), xi = (r1 + r2) / 2, yi = pEval(f, xi);
      const f1 = pDer(f), f2 = pDer(f1);
      return {
        enunciado: 'Considera la función ' + i$('f(x)=' + pTex(f)) + '.',
        partes: [
          part('Halla los puntos críticos de ' + i$('f') + ' (donde ' + i$('f\'(x)=0') + '). <small>(valores separados por «;»)</small>', 0.75, { kind: 'list', value: [F(r1), F(r2)] },
            [d$('f\'(x)=' + pTex(f1) + '=3(' + xm(r1) + ')(' + xm(r2) + ')'), 'Puntos críticos: ' + i$('x=' + r1) + ' y ' + i$('x=' + r2) + '.']),
          part('Estudia el signo de ' + i$('f\'') + ' y calcula las coordenadas del máximo y del mínimo relativos.', 1.5,
            { kind: 'multi', parts: [{ kind: 'number', label: 'x_{\\max}=', value: F(r1) }, { kind: 'number', label: 'f(x_{\\max})=', value: F(y1) }, { kind: 'number', label: 'x_{\\min}=', value: F(r2) }, { kind: 'number', label: 'f(x_{\\min})=', value: F(y2) }] },
            ['' + i$('f\'>0') + ' en ' + i$('(-\\infty,' + r1 + ')') + ', ' + i$('f\'<0') + ' en ' + i$('(' + r1 + ',' + r2 + ')') + ' y ' + i$('f\'>0') + ' en ' + i$('(' + r2 + ',+\\infty)') + '.',
              'Pasa de crecer a decrecer en ' + i$('x=' + r1) + ': máximo ' + i$('(' + r1 + ',' + y1 + ')') + '. Pasa de decrecer a crecer en ' + i$('x=' + r2) + ': mínimo ' + i$('(' + r2 + ',' + y2 + ')') + '.']),
          part('Calcula el punto de inflexión de ' + i$('f') + '. Indica sus coordenadas.', 0.75,
            { kind: 'multi', parts: [{ kind: 'number', label: 'x=', value: F(xi) }, { kind: 'number', label: 'y=', value: F(yi) }] },
            [d$('f\'\'(x)=' + pTex(f2) + '=0\\ \\Rightarrow\\ x=' + xi), 'Cambia de signo en ' + i$('x=' + xi) + ': inflexión ' + i$('(' + xi + ',' + yi + ')') + ' (cóncava a la izquierda, convexa a la derecha).']),
        ],
        data: { f, r1, r2, y1, y2, xi, yi },
      };
    },
  });

  /* ===================== extremos-abs ===================== */
  X.implementar({
    id: 'extremos-abs',
    generate() {
      for (;;) {
        const { r1, r2, f } = cubica();
        const lo = rnd.int(r1 - 3, r1 - 1), hi = rnd.int(r2 + 1, r2 + 3);
        const pts = [lo, r1, r2, hi];
        const ys = pts.map((x) => pEval(f, x));
        const mx = Math.max(...ys), mn = Math.min(...ys);
        if (ys.filter((y) => y === mx).length > 1 || ys.filter((y) => y === mn).length > 1) continue;
        if (Math.abs(mx) > 80 || Math.abs(mn) > 80) continue;
        const f1 = pDer(f);
        const tabla = pts.map((x, i) => i$('f(' + x + ')=' + ys[i])).join(',\\ ');
        return {
          enunciado: 'Considera la función ' + i$('f(x)=' + pTex(f)) + ' en el intervalo ' + i$('[' + lo + ',' + hi + ']') + '.',
          partes: [
            part('Halla los puntos críticos de ' + i$('f') + ' que están en el intervalo. <small>(valores separados por «;»)</small>', 0.75, { kind: 'list', value: [F(r1), F(r2)] },
              [d$('f\'(x)=' + pTex(f1) + '=3(' + xm(r1) + ')(' + xm(r2) + ')'), 'Ambos están en ' + i$('[' + lo + ',' + hi + ']') + '.']),
            part('Calcula el valor máximo de ' + i$('f') + ' en el intervalo.', 1.25, { kind: 'number', label: 'máximo=', value: F(mx) },
              ['Los extremos absolutos están entre los puntos críticos y los extremos del intervalo: ' + tabla + '.', 'El mayor valor es ' + i$(String(mx)) + '.']),
            part('Calcula el valor mínimo de ' + i$('f') + ' en el intervalo.', 1, { kind: 'number', label: 'mínimo=', value: F(mn) },
              ['De los valores anteriores, el menor es ' + i$(String(mn)) + '.']),
          ],
          data: { f, lo, hi, r1, r2, mx, mn },
        };
      }
    },
  });

  /* ===================== optimizacion ===================== */
  X.implementar({
    id: 'optimizacion',
    generate() {
      const v = rnd.pick(['ingreso', 'beneficio', 'costemedio', 'valla']);
      if (v === 'ingreso') {
        const B = rnd.pick([1, 2, 4, 5]), mm = rnd.int(3, 12), A = 2 * B * mm;
        const q0 = rnd.int(2, mm - 1) * 1, I = (q) => q * (A - B * q);
        const qo = mm, Io = I(qo);
        return {
          enunciado: 'Una empresa vende ' + i$('q') + ' unidades de un producto al precio de ' + i$('p=' + A + '-' + (B === 1 ? '' : B) + 'q') + ' euros por unidad (con ' + i$('0\\le q\\le' + (A / B) ) + ').',
          partes: [
            part('Escribe el ingreso ' + i$('I(q)') + ' y calcula el ingreso al vender ' + i$('q=' + q0) + ' unidades.', 1, { kind: 'number', label: 'I(' + q0 + ')=', value: F(I(q0)) },
              [d$('I(q)=q\\cdot p=q(' + A + '-' + (B === 1 ? '' : B) + 'q)=' + A + 'q-' + (B === 1 ? '' : B) + 'q^2'), i$('I(' + q0 + ')=' + I(q0)) + ' euros.']),
            part('¿Cuántas unidades hay que vender para que el ingreso sea máximo?', 1, { kind: 'number', label: 'q=', value: F(qo) },
              [d$('I\'(q)=' + A + '-' + 2 * B + 'q=0\\ \\Rightarrow\\ q=' + qo), 'Es un máximo porque ' + i$('I\'\'(q)=' + (-2 * B) + '<0') + '.']),
            part('Calcula el ingreso máximo.', 1, { kind: 'number', label: 'I_{\\max}=', value: F(Io) }, [i$('I(' + qo + ')=' + qo + '\\cdot(' + A + '-' + B * qo + ')=' + Io) + ' euros.']),
          ],
          data: { v, A, B, q0, qo, Io },
        };
      }
      if (v === 'beneficio') {
        for (;;) {
          const B = rnd.pick([1, 2, 5]), mm = rnd.int(4, 14), A = rnd.int(40, 120), c1 = A - 2 * B * mm, c0 = rnd.int(50, 400);
          if (c1 < 5 || c1 > 40) continue;
          const Bn = (q) => -B * q * q + (A - c1) * q - c0;
          const qo = mm, Bo = Bn(qo);
          if (Bo <= 0) continue;
          return {
            enunciado: 'Un taller fabrica ' + i$('q') + ' unidades de un artículo. El precio de venta depende de la cantidad: ' + i$('p=' + A + '-' + (B === 1 ? '' : B) + 'q') + ' euros por unidad, y el coste total de producción es ' + i$('C(q)=' + c0 + '+' + c1 + 'q') + ' euros.',
            partes: [
              part('Escribe el beneficio ' + i$('B(q)') + ' como función de ' + i$('q') + ' y calcula ' + i$('B(' + (qo - 1) + ')') + '.', 1, { kind: 'number', label: 'B(' + (qo - 1) + ')=', value: F(Bn(qo - 1)) },
                [d$('B(q)=q\\,p-C(q)=' + A + 'q-' + (B === 1 ? '' : B) + 'q^2-' + c0 + '-' + c1 + 'q=-' + (B === 1 ? '' : B) + 'q^2+' + (A - c1) + 'q-' + c0), i$('B(' + (qo - 1) + ')=' + Bn(qo - 1)) + '.']),
              part('Halla las unidades que dan el beneficio máximo.', 1, { kind: 'number', label: 'q=', value: F(qo) },
                [d$('B\'(q)=-' + 2 * B + 'q+' + (A - c1) + '=0\\ \\Rightarrow\\ q=' + qo), 'Máximo, pues ' + i$('B\'\'(q)=-' + 2 * B + '<0') + '.']),
              part('Calcula el beneficio máximo.', 1, { kind: 'number', label: 'B_{\\max}=', value: F(Bo) }, [i$('B(' + qo + ')=' + Bo) + ' euros.']),
            ],
            data: { v, A, B, c0, c1, qo, Bo, qm: qo - 1 },
          };
        }
      }
      if (v === 'costemedio') {
        for (;;) {
          const a = rnd.pick([1, 2, 3, 4, 5]) / 10, s = rnd.int(5, 30), bb = rnd.int(2, 12);
          const a10 = Math.round(a * 10), cF = a * s * s;
          const c0 = Math.round(cF);
          if (Math.abs(cF - c0) > 1e-9 || c0 < 10) continue;
          const Cm = (x) => a * x + bb + c0 / x;
          const o = s, vo = Cm(o);
          return {
            enunciado: 'El coste total de fabricar ' + i$('x') + ' unidades de un producto es ' + i$('C(x)=' + dtex(a) + 'x^2+' + bb + 'x+' + c0) + ' euros. El coste medio por unidad es ' + i$('C_m(x)=\\dfrac{C(x)}{x}') + ' (con ' + i$('x>0') + ').',
            partes: [
              part('Escribe ' + i$('C_m(x)') + ' y calcula el coste medio al fabricar ' + i$('x=' + (2 * s)) + ' unidades. <small>(Usa decimales si hace falta.)</small>', 1, { kind: 'expr', label: 'C_m(' + 2 * s + ')=', value: Cm(2 * s), show: dtxt(Cm(2 * s)) },
                [d$('C_m(x)=' + dtex(a) + 'x+' + bb + '+\\dfrac{' + c0 + '}{x}'), i$('C_m(' + 2 * s + ')=' + dtex(Cm(2 * s))) + ' euros por unidad.']),
              part('¿Cuántas unidades hay que fabricar para que el coste medio sea mínimo?', 1, { kind: 'number', label: 'x=', value: F(o) },
                [d$('C_m\'(x)=' + dtex(a) + '-\\dfrac{' + c0 + '}{x^2}=0\\ \\Rightarrow\\ x^2=' + (s * s) + '\\ \\Rightarrow\\ x=' + o), 'Es un mínimo porque ' + i$('C_m\'\'(x)=\\dfrac{' + 2 * c0 + '}{x^3}>0') + '.']),
              part('Calcula el coste medio mínimo.', 1, { kind: 'expr', label: 'C_{m,\\min}=', value: vo, show: dtxt(vo) }, [i$('C_m(' + o + ')=' + dtex(a * o) + '+' + bb + '+' + dtex(c0 / o) + '=' + dtex(vo)) + ' euros por unidad.']),
            ],
            data: { v, a, bb, c0, o, vo, x1: 2 * s },
          };
        }
      }
      // valla: rectángulo junto a un muro, P metros de valla
      const Pm = 4 * rnd.int(10, 40);
      const A = (x) => x * (Pm - 2 * x), xo = Pm / 4, Ao = A(xo);
      const x1 = rnd.int(2, xo - 1);
      return {
        enunciado: 'Se quiere vallar una parcela rectangular que limita por uno de sus lados con un muro (ese lado no necesita valla). Se dispone de ' + Pm + ' metros de valla. Sea ' + i$('x') + ' la longitud de cada uno de los lados perpendiculares al muro.',
        partes: [
          part('Escribe el área ' + i$('A(x)') + ' de la parcela y calcula ' + i$('A(' + x1 + ')') + '.', 1, { kind: 'number', label: 'A(' + x1 + ')=', value: F(A(x1)) },
            ['El lado paralelo al muro mide ' + i$(Pm + '-2x') + ': ' + d$('A(x)=x(' + Pm + '-2x)=' + Pm + 'x-2x^2'), i$('A(' + x1 + ')=' + A(x1)) + ' m².']),
          part('Halla el valor de ' + i$('x') + ' que hace máxima el área.', 1, { kind: 'number', label: 'x=', value: F(xo) },
            [d$('A\'(x)=' + Pm + '-4x=0\\ \\Rightarrow\\ x=' + xo), 'Es un máximo porque ' + i$('A\'\'(x)=-4<0') + '.']),
          part('Calcula el área máxima.', 1, { kind: 'number', label: 'A_{\\max}=', value: F(Ao) }, [i$('A(' + xo + ')=' + xo + '\\cdot' + (Pm - 2 * xo) + '=' + Ao) + ' m².']),
        ],
        data: { v, Pm, x1, xo, Ao },
      };
    },
  });

  /* ===================== primitiva-area ===================== */
  const cf = (fr) => { const t = ftex(fr); return t === '1' ? '' : t === '-1' ? '-' : t; };
  /** Plantillas de integrando: {ftex, Ftex, F(x) numérica de una primitiva, show}. */
  function integrando() {
    const t = rnd.pick(['poli', 'exp', 'lnx', 'xexp', 'rac', 'pot']);
    if (t === 'poli') {
      const a = rnd.pick([3, 6, -3, 9]), b = rnd.pick([2, 4, -2, 6, -4]), c = rnd.int(-5, 5);
      const f = [a, b, c], Fp = pInt(f).concat([F(0)]);   // primitiva sin constante: 2x³+3x²+3x+0
      return { t, f: pTex(f), fx: (x) => pEval(f, x), Fx: pTexF(Fp), Fn: (x) => pEvalF(Fp, F(x)), exacto: true };
    }
    if (t === 'exp') {
      const k = rnd.pick([2, 3, 4, 6, -2]), m = rnd.pick([1, 2, 3, -1, -2]);
      return { t, fx: (x) => k * Math.exp(m * x), f: co(k) + 'e^{' + (m === 1 ? '' : m) + 'x}', Fx: cf(F(k, m)) + 'e^{' + (m === 1 ? '' : m) + 'x}', Fn: (x) => (k / m) * Math.exp(m * x) };
    }
    if (t === 'lnx') {
      const k = rnd.pick([2, 3, 4, 6, -2, -3]), c = rnd.pick([1, 2, 3]);
      return { t, fx: (x) => k / (x + c), f: '\\dfrac{' + k + '}{x+' + c + '}', Fx: k + '\\ln(x+' + c + ')', Fn: (x) => k * Math.log(x + c) };
    }
    if (t === 'xexp') {
      const k = rnd.pick([2, 4, 6, -2]);
      return { t, fx: (x) => k * x * Math.exp(x * x), f: co(k) + 'x\\,e^{x^2}', Fx: cf(F(k, 2)) + 'e^{x^2}', Fn: (x) => (k / 2) * Math.exp(x * x) };
    }
    if (t === 'rac') {
      const k = rnd.pick([2, 4, 6, -2]), c = rnd.pick([1, 2, 3, 4]);
      return { t, fx: (x) => k * x / (x * x + c), f: '\\dfrac{' + co(k) + 'x}{x^2+' + c + '}', Fx: (k / 2) + '\\ln(x^2+' + c + ')', Fn: (x) => (k / 2) * Math.log(x * x + c) };
    }
    const c = rnd.pick([1, 2, 3]);
    return { t, fx: (x) => x * Math.pow(x * x + c, 3), f: 'x(x^2+' + c + ')^3', Fx: '\\dfrac{(x^2+' + c + ')^4}{8}', Fn: (x) => Math.pow(x * x + c, 4) / 8 };
  }
  X.implementar({
    id: 'primitiva-area',
    generate() {
      const I = integrando();
      const x0 = rnd.int(0, 1), y0 = rnd.int(-3, 5), x1 = x0 + rnd.int(1, 2);
      const p = 0, q = rnd.int(1, 2), r = q + rnd.int(1, 2);
      const val = (x) => I.Fn(x);                       // número (o fracción exacta en el caso polinómico)
      const dif = (u, v) => (I.exacto ? fsub(val(u), val(v)) : val(u) - val(v));
      const Fx1 = I.exacto ? fadd(dif(x1, x0), F(y0)) : dif(x1, x0) + y0;
      const i1 = dif(q, p), i2 = dif(r, q);
      const numv = (z) => (I.exacto ? z.n / z.d : z);
      const showv = (z) => (I.exacto ? fstr(z) : dtex(z));
      const ans = (z, label) => ({ kind: 'expr', label, value: numv(z), show: I.exacto ? fstr(z) : dtex(z) });
      return {
        enunciado: 'Considera la función ' + i$('f(x)=' + I.f) + '.',
        partes: [
          part('Halla la primitiva ' + i$('F') + ' de ' + i$('f') + ' que cumple ' + i$('F(' + x0 + ')=' + y0) + ' y calcula ' + i$('F(' + x1 + ')') + '. <small>(Da el resultado como fracción o como decimal con 4 cifras.)</small>', 1,
            ans(Fx1, 'F(' + x1 + ')='),
            ['Una primitiva es ' + i$('F_0(x)=' + I.Fx) + ', así que ' + i$('F(x)=' + I.Fx + '+C') + '.', 'Con ' + i$('F(' + x0 + ')=' + y0) + ' se obtiene ' + i$('C') + ' y ' + d$('F(' + x1 + ')=F_0(' + x1 + ')-F_0(' + x0 + ')+' + y0 + (I.exacto ? '=' + showv(Fx1) : '\\approx' + showv(Fx1)))]),
          part('Calcula ' + i$('\\displaystyle\\int_{' + p + '}^{' + q + '}f(x)\\,dx') + '.', 1, ans(i1, '\\displaystyle\\int='),
            ['Regla de Barrow con ' + i$('F_0(x)=' + I.Fx) + ': ' + d$('F_0(' + q + ')-F_0(' + p + ')' + (I.exacto ? '=' : '\\approx') + showv(i1))]),
          part('Calcula ' + i$('\\displaystyle\\int_{' + q + '}^{' + r + '}f(x)\\,dx') + '.', 1, ans(i2, '\\displaystyle\\int='),
            ['Regla de Barrow: ' + d$('F_0(' + r + ')-F_0(' + q + ')' + (I.exacto ? '=' : '\\approx') + showv(i2))]),
        ],
        data: { t: I.t, f: I.f, fx: I.fx, x0, y0, x1, p, q, r, Fx1: numv(Fx1), i1: numv(i1), i2: numv(i2) },
      };
    },
  });

  /* ===================== area-curvas ===================== */
  X.implementar({
    id: 'area-curvas',
    generate() {
      for (;;) {
        const t1 = rnd.int(-3, 2), t2 = t1 + rnd.int(2, 5);
        const r = rnd.int(-3, 3), s = rnd.int(-4, 6);
        // g(x) = r x + s ; f(x) = g(x) + (x-t1)(x-t2)  → f ≥ g fuera, f ≤ g entre cortes: área = ∫(g-f)
        const dif = pMul([1, -t1], [1, -t2]);                    // (x-t1)(x-t2)
        const f = pAdd([0, r, s], dif).slice(-3);
        const g = [r, s];
        const A = F((t2 - t1) ** 3, 6);
        const t = Math.floor((t1 + t2) / 2);
        // área de la parte con x ≥ t: ∫_t^{t2} -(x-t1)(x-t2) dx
        const negDif = dif.map((c) => -c), Pi = pInt(negDif).concat([F(0)]);
        const part2 = fsub(pEvalF(Pi, F(t2)), pEvalF(Pi, F(t)));
        if (Math.abs(f[0] - 1) > 0 || Math.abs(f[1]) > 12 || Math.abs(f[2]) > 20) continue;
        return {
          enunciado: 'Considera las funciones ' + i$('f(x)=' + pTex(f)) + ' y ' + i$('g(x)=' + (r === 0 ? s : lin(r, s))) + '.',
          partes: [
            part('Halla las abscisas de los puntos de corte de las gráficas. <small>(valores separados por «;»)</small>', 1, { kind: 'list', value: [F(t1), F(t2)] },
              [i$('f(x)=g(x)') + ' ⟹ ' + d$(pTex(dif) + '=0\\ \\Rightarrow\\ (' + xm(t1) + ')(' + xm(t2) + ')=0'), 'Cortes en ' + i$('x=' + t1) + ' y ' + i$('x=' + t2) + '.']),
            part('Calcula el área de la región limitada por las dos gráficas. <small>(fracción o decimal)</small>', 1, { kind: 'number', label: 'Área=', value: A },
              ['Entre los cortes, ' + i$('g\\ge f') + ' (en el punto medio la diferencia es negativa para ' + i$('f-g') + ').', d$('\\text{Área}=\\int_{' + t1 + '}^{' + t2 + '}(g-f)\\,dx=\\int_{' + t1 + '}^{' + t2 + '}\\left(' + pTex(dif.map((c) => -c)) + '\\right)dx=' + ftex(A))]),
            part('Calcula el área de la parte de esa región que cumple ' + i$('x\\ge' + t) + '.', 1, { kind: 'number', label: 'Área=', value: part2 },
              [d$('\\int_{' + t + '}^{' + t2 + '}(g-f)\\,dx=' + ftex(part2))]),
          ],
          data: { f, g, t1, t2, t, A: [A.n, A.d], part2: [part2.n, part2.d] },
        };
      }
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
