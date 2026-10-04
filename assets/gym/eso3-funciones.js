/* Ejercicios interactivos — 3º ESO, funciones (temas 11 y 12).
 * Tema 11: eso3-fun-valor, eso3-fun-dominio, eso3-fun-tvm, eso3-fun-tabla.
 * Tema 12: eso3-recta, eso3-recta-cortes, eso3-parabola, eso3-parabola-cortes, eso3-recta-problema.
 * Verificadores independientes: tests/verify-gym-eso3.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, ftex, d$, i$, gcd, fadd, fsub, fmul, fdiv } = G;
  const { dc, define, sg, again } = G.eso3;
  const nz = (lo, hi) => { let v; do { v = rnd.int(lo, hi); } while (v === 0); return v; };
  const co = (k, lit) => (k === 1 && lit ? '' : k === -1 && lit ? '-' : String(k)) + lit;
  /** a x² + b x + c en TeX. */
  function quad(a, b, c) {
    let s = '';
    [[a, 'x^2'], [b, 'x'], [c, '']].forEach(([k, lit]) => { if (k === 0) return; s += (k < 0 ? '-' : (s ? '+' : '')) + (Math.abs(k) === 1 && lit ? '' : Math.abs(k)) + lit; });
    return s || '0';
  }
  const line = (m, n) => quad(0, m, n);

  /* ===================== Tema 11 ===================== */
  define({
    id: 'eso3-fun-valor',
    title: 'Valor de una función en un punto',
    help: [
      '$f(a)$ es el valor que resulta de sustituir $x$ por $a$ en la fórmula. Cuidado con los signos y con los paréntesis al sustituir un número negativo.',
      'Ejemplo: $f(x)=x^2-3x+1$. $f(-2)=(-2)^2-3\\cdot(-2)+1=4+6+1=11$. Para $f(x)=\\frac{6}{x+1}$ no existe $f(-1)$ (no se puede dividir entre $0$).',
    ],
    params: [{ key: 'tipo', label: 'Tipo de función', options: [['lin', 'Lineal'], ['cuad', 'Cuadrática'], ['rac', 'Con fracción']] }],
    generate(p) {
      const a = nz(-4, 5);
      if (p.tipo === 'lin') { const m = nz(-5, 6), n = rnd.int(-9, 9); return { prompt: 'Si ' + i$('f(x)=' + line(m, n)) + ', calcula ' + i$('f(' + a + ')') + '.', answer: { kind: 'number', label: 'f(' + a + ')=', value: F(m * a + n) }, steps: [d$('f(' + a + ')=' + m + '\\cdot' + sg(a) + (n >= 0 ? '+' : '') + n + '=' + (m * a + n))], mistakes: [], data: { tipo: 'lin', m, n, a } }; }
      if (p.tipo === 'cuad') { const A = nz(-3, 3), B = rnd.int(-6, 6), C = rnd.int(-9, 9); return { prompt: 'Si ' + i$('f(x)=' + quad(A, B, C)) + ', calcula ' + i$('f(' + a + ')') + '.', answer: { kind: 'number', label: 'f(' + a + ')=', value: F(A * a * a + B * a + C) }, steps: [d$('f(' + a + ')=' + A + '\\cdot' + sg(a) + '^2' + (B >= 0 ? '+' : '') + B + '\\cdot' + sg(a) + (C >= 0 ? '+' : '') + C + '=' + (A * a * a + B * a + C))], mistakes: [{ value: F(A * a * 2 + B * a + C), msg: '$(' + a + ')^2$ es el producto del número por sí mismo, no su doble.' }].filter((m) => m.value.n !== A * a * a + B * a + C), data: { tipo: 'cuad', A, B, C, a } }; }
      let k, c;
      do { k = nz(-12, 12); c = nz(-5, 5); } while (a + c === 0);
      return { prompt: 'Si ' + i$('f(x)=\\dfrac{' + k + '}{x' + (c >= 0 ? '+' : '') + c + '}') + ', calcula ' + i$('f(' + a + ')') + '.', answer: { kind: 'number', label: 'f(' + a + ')=', value: F(k, a + c) }, steps: [d$('f(' + a + ')=\\frac{' + k + '}{' + sg(a) + (c >= 0 ? '+' : '') + c + '}=\\frac{' + k + '}{' + (a + c) + '}=' + ftex(F(k, a + c)))], mistakes: [], data: { tipo: 'rac', k, c, a } };
    },
  });

  define({
    id: 'eso3-fun-dominio',
    title: 'Dominio de una función',
    help: [
      'El **dominio** es el conjunto de valores de $x$ para los que se puede calcular $f(x)$. Hay que evitar dividir entre $0$ y las raíces cuadradas de números negativos.',
      'En $\\frac{1}{x-a}$ falla $x=a$. En $\\sqrt{x-a}$ hace falta $x-a\\ge0$, es decir, $x\\ge a$. Los polinomios tienen por dominio todos los reales $\\mathbb{R}$.',
    ],
    generate() {
      const a = nz(-6, 7), t = rnd.pick(['rac', 'raiz', 'rac2', 'pol']);
      const IR = '\\mathbb{R}';
      let f, correct, wrong;
      if (t === 'rac') { f = '\\dfrac{3}{x' + (a >= 0 ? '-' : '+') + Math.abs(a) + '}'; correct = IR + '\\setminus\\{' + a + '\\}'; wrong = [IR, '(' + a + ',+\\infty)', '[' + a + ',+\\infty)']; }
      else if (t === 'raiz') { f = '\\sqrt{x' + (a >= 0 ? '-' : '+') + Math.abs(a) + '}'; correct = '[' + a + ',+\\infty)'; wrong = [IR, IR + '\\setminus\\{' + a + '\\}', '(-\\infty,' + a + ']']; }
      else if (t === 'rac2') { const b = rnd.int(2, 7); f = '\\dfrac{1}{x^2-' + b * b + '}'; correct = IR + '\\setminus\\{-' + b + ',' + b + '\\}'; wrong = [IR + '\\setminus\\{' + b + '\\}', IR, '[-' + b + ',' + b + ']']; }
      else { const A = nz(1, 4), B = rnd.int(-5, 5); f = A + 'x^2' + (B >= 0 ? '+' : '') + B + 'x-1'; correct = IR; wrong = [IR + '\\setminus\\{0\\}', '[0,+\\infty)', '(-\\infty,0]']; }
      const opts = G.rnd.shuffle([correct].concat(wrong));
      const why = { rac: 'El denominador se anula en $x=' + a + '$: ese valor no pertenece al dominio.', raiz: 'Hace falta que el radicando no sea negativo: $x' + (a >= 0 ? '-' : '+') + Math.abs(a) + '\\ge0\\Rightarrow x\\ge' + a + '$.', pol: 'Un polinomio se puede calcular para cualquier $x$: el dominio es $\\mathbb{R}$.' };
      const explan = t === 'rac2' ? 'El denominador se anula cuando $x^2=' + correct.match(/\d+/)[0] ** 2 + '$, es decir, en $x=\\pm' + correct.match(/\d+/)[0] + '$.' : why[t];
      return { prompt: '¿Cuál es el dominio de ' + i$('f(x)=' + f) + '?', answer: { kind: 'choice', options: opts.map((o) => i$(o)), value: String(opts.indexOf(correct)) },
        steps: [explan, 'Dominio: ' + i$(correct) + '.'], mistakes: [], data: { t, a, correct } };
    },
  });

  define({
    id: 'eso3-fun-tvm',
    title: 'Tasa de variación media',
    help: [
      'La **tasa de variación media** de $f$ en $[a,b]$ es $\\text{T.V.M.}=\\frac{f(b)-f(a)}{b-a}$. Mide cuánto cambia $y$, de media, por cada unidad que cambia $x$. Si es positiva, la función crece de media; si es negativa, decrece.',
      'Ejemplo: $f(x)=x^2$ en $[1,4]$: $\\frac{16-1}{4-1}=5$. En una recta, la T.V.M. es siempre la pendiente.',
    ],
    params: [{ key: 'tipo', label: 'Función', options: [['cuad', 'Cuadrática'], ['lin', 'Lineal'], ['tabla', 'Dada por una tabla']] }],
    generate(p) {
      const a = rnd.int(-3, 2), b = a + rnd.int(1, 5);
      if (p.tipo === 'tabla') {
        const xs = [0, 2, 4, 6, 8], ys = xs.map(() => rnd.int(0, 30));
        const i = rnd.int(0, 2), j = i + rnd.int(1, 2);
        const t = F(ys[j] - ys[i], xs[j] - xs[i]);
        return { prompt: 'La tabla da la altura (cm) de una planta en distintas semanas: ' + d$('\\begin{array}{c|ccccc}\\text{semana}&' + xs.join('&') + '\\\\\\hline \\text{altura}&' + ys.join('&') + '\\end{array}') + 'Calcula la tasa de variación media entre las semanas ' + i$(xs[i]) + ' y ' + i$(xs[j]) + ' (cm por semana).', answer: { kind: 'number', label: '\\text{T.V.M.}=', value: t },
          steps: [d$('\\text{T.V.M.}=\\frac{' + ys[j] + '-' + sg(ys[i]) + '}{' + xs[j] + '-' + xs[i] + '}=' + ftex(t))], mistakes: [], data: { tipo: 'tabla', xs, ys, i, j } };
      }
      if (p.tipo === 'lin') { const m = nz(-6, 8), n = rnd.int(-9, 9); return { prompt: 'Calcula la tasa de variación media de ' + i$('f(x)=' + line(m, n)) + ' en ' + i$('[' + a + ',' + b + ']') + '.', answer: { kind: 'number', label: '\\text{T.V.M.}=', value: F(m) }, steps: [d$('f(' + b + ')=' + (m * b + n) + ',\\quad f(' + a + ')=' + (m * a + n)), d$('\\text{T.V.M.}=\\frac{' + (m * b + n) + '-' + sg(m * a + n) + '}{' + b + '-' + sg(a) + '}=' + m), 'En una recta la T.V.M. coincide con la pendiente.'], mistakes: [], data: { tipo: 'lin', m, n, a, b } }; }
      const A = nz(-3, 3), B = rnd.int(-5, 5), C = rnd.int(-6, 6), f = (x) => A * x * x + B * x + C;
      const t = F(f(b) - f(a), b - a);
      return { prompt: 'Calcula la tasa de variación media de ' + i$('f(x)=' + quad(A, B, C)) + ' en ' + i$('[' + a + ',' + b + ']') + '.', answer: { kind: 'number', label: '\\text{T.V.M.}=', value: t },
        steps: [d$('f(' + b + ')=' + f(b) + ',\\quad f(' + a + ')=' + f(a)), d$('\\text{T.V.M.}=\\frac{' + f(b) + '-' + sg(f(a)) + '}{' + b + '-' + sg(a) + '}=' + ftex(t))], mistakes: [], data: { tipo: 'cuad', A, B, C, a, b } };
    },
  });

  define({
    id: 'eso3-fun-tabla',
    title: 'Reconocer el tipo de función por su tabla',
    help: [
      'Si al aumentar $x$ en pasos iguales, $y$ aumenta (o disminuye) siempre lo mismo, la función es **lineal** (diferencias constantes). Si las diferencias no son constantes pero las **segundas diferencias** sí, es **cuadrática**.',
      'Ejemplo: $y=1,4,7,10$: diferencias $3,3,3$, lineal. $y=0,1,4,9$: diferencias $1,3,5$ y segundas $2,2$: cuadrática.',
    ],
    generate() {
      const tipo = rnd.pick([0, 1]), xs = [0, 1, 2, 3, 4];
      let ys;
      if (tipo === 0) { const m = nz(-5, 6), n = rnd.int(-6, 8); ys = xs.map((x) => m * x + n); }
      else { const a = nz(-3, 3), b = rnd.int(-5, 5), c = rnd.int(-5, 5); ys = xs.map((x) => a * x * x + b * x + c); }
      const d1 = ys.slice(1).map((v, i) => v - ys[i]);
      const d2 = d1.slice(1).map((v, i) => v - d1[i]);
      return { prompt: 'La tabla muestra una función: ' + d$('\\begin{array}{c|ccccc}x&' + xs.join('&') + '\\\\\\hline y&' + ys.join('&') + '\\end{array}') + '¿Es lineal o cuadrática?', answer: { kind: 'choice', options: ['Lineal', 'Cuadrática'], value: String(tipo) },
        steps: ['Primeras diferencias: ' + i$(d1.join(',\\ ')) + '.', tipo === 0 ? 'Son constantes: la función es lineal.' : 'No son constantes; segundas diferencias: ' + i$(d2.join(',\\ ')) + ', constantes: la función es cuadrática.'], mistakes: [], data: { ys, tipo } };
    },
  });

  /* ===================== Tema 12 ===================== */
  define({
    id: 'eso3-recta',
    title: 'Ecuación de la recta',
    help: [
      'La recta $y=mx+n$ tiene pendiente $m$ y ordenada en el origen $n$. Por dos puntos: $m=\\frac{y_2-y_1}{x_2-x_1}$ y después $n=y_1-m\\,x_1$. Rectas paralelas tienen la misma pendiente.',
      'Ejemplo: por $(1,2)$ y $(3,8)$: $m=\\frac{8-2}{3-1}=3$ y $n=2-3\\cdot1=-1$, luego $y=3x-1$.',
    ],
    params: [{ key: 'tipo', label: 'Datos', options: [['dos', 'Dos puntos'], ['pend', 'Pendiente y un punto'], ['par', 'Paralela a una recta por un punto']] }],
    generate(p) {
      const m = nz(-5, 6), n = rnd.int(-8, 8), x1 = rnd.int(-4, 4);
      let x2; do { x2 = rnd.int(-4, 6); } while (x2 === x1);
      const y1 = m * x1 + n, y2 = m * x2 + n;
      const parts = [{ kind: 'number', label: 'm=', value: F(m) }, { kind: 'number', label: 'n=', value: F(n) }];
      if (p.tipo === 'dos') return { prompt: 'Halla la recta que pasa por ' + i$('A(' + x1 + ',' + y1 + ')') + ' y ' + i$('B(' + x2 + ',' + y2 + ')') + ' en la forma ' + i$('y=mx+n') + '.', answer: { kind: 'multi', parts },
        steps: ['Pendiente: ' + d$('m=\\frac{' + y2 + '-' + sg(y1) + '}{' + x2 + '-' + sg(x1) + '}=' + m), 'Ordenada: ' + i$('n=y_1-m x_1=' + y1 + '-' + sg(m) + '\\cdot' + sg(x1) + '=' + n) + '.', 'La recta es ' + i$('y=' + line(m, n)) + '.'], mistakes: [], data: { tipo: 'dos', m, n, x1, y1, x2, y2 } };
      if (p.tipo === 'pend') return { prompt: 'Halla la recta de pendiente ' + i$(m) + ' que pasa por ' + i$('P(' + x1 + ',' + y1 + ')') + ' en la forma ' + i$('y=mx+n') + '.', answer: { kind: 'multi', parts },
        steps: ['Como pasa por ' + i$('P') + ': ' + i$(y1 + '=' + sg(m) + '\\cdot' + sg(x1) + '+n') + ', luego ' + i$('n=' + n) + '.', 'La recta es ' + i$('y=' + line(m, n)) + '.'], mistakes: [], data: { tipo: 'pend', m, n, x1, y1 } };
      const m0 = m, n0 = rnd.int(-6, 6);
      return { prompt: 'Halla la recta paralela a ' + i$('y=' + line(m0, n0)) + ' que pasa por ' + i$('P(' + x1 + ',' + y1 + ')') + ' (' + i$('y=mx+n') + ').', answer: { kind: 'multi', parts },
        steps: ['Una paralela tiene la misma pendiente: ' + i$('m=' + m0) + '.', 'Pasa por ' + i$('P') + ': ' + i$(y1 + '=' + sg(m0) + '\\cdot' + sg(x1) + '+n') + ', luego ' + i$('n=' + n) + '.'], mistakes: [], data: { tipo: 'par', m: m0, n, x1, y1 } };
    },
  });

  define({
    id: 'eso3-recta-cortes',
    title: 'Puntos de corte de una recta con los ejes',
    help: [
      'Con el eje $OY$ se hace $x=0$: el punto es $(0,n)$. Con el eje $OX$ se hace $y=0$ y se despeja $x$: $x=-\\frac{n}{m}$.',
      'Ejemplo: $y=2x-6$ corta a $OY$ en $(0,-6)$ y a $OX$ en $2x-6=0\\Rightarrow x=3$, es decir, $(3,0)$.',
    ],
    generate() {
      const x0 = nz(-6, 7), m = nz(-4, 5), n = -m * x0;
      const mm = m, nn = n === 0 ? 3 * mm : n;
      const cx = F(-nn, mm);
      return { prompt: 'Halla los puntos de corte de ' + i$('y=' + line(mm, nn)) + ' con los ejes. Da la ordenada del corte con ' + i$('OY') + ' y la abscisa del corte con ' + i$('OX') + '.', answer: { kind: 'multi', parts: [{ kind: 'number', label: '\\text{con }OY:\\ y=', value: F(nn) }, { kind: 'number', label: '\\text{con }OX:\\ x=', value: cx }] },
        steps: ['Con ' + i$('OY') + ' (' + i$('x=0') + '): ' + i$('y=' + nn) + ', punto ' + i$('(0,' + nn + ')') + '.', 'Con ' + i$('OX') + ' (' + i$('y=0') + '): ' + i$(line(mm, nn) + '=0') + ', luego ' + i$('x=' + ftex(cx)) + ', punto ' + i$('(' + ftex(cx) + ',0)') + '.'], mistakes: [], data: { m: mm, n: nn } };
    },
  });

  define({
    id: 'eso3-parabola',
    title: 'Vértice de una parábola',
    help: [
      'El vértice de $y=ax^2+bx+c$ está en $x_v=-\\frac{b}{2a}$; su ordenada es $y_v=f(x_v)$. Si $a>0$ es un mínimo (parábola hacia arriba) y si $a<0$ un máximo (hacia abajo). El eje de simetría es la recta $x=x_v$.',
      'Ejemplo: $y=x^2-6x+5$: $x_v=\\frac{6}{2}=3$ y $y_v=9-18+5=-4$. El vértice es $(3,-4)$, un mínimo.',
    ],
    generate() {
      const a = rnd.pick([1, 1, 2, -1, -2, 3]), xv = rnd.int(-5, 6), yv = rnd.int(-9, 9);
      const b = -2 * a * xv, c = a * xv * xv + yv;
      return { prompt: 'Halla el vértice de la parábola ' + i$('y=' + quad(a, b, c)) + '. Da su abscisa y su ordenada.', answer: { kind: 'multi', parts: [{ kind: 'number', label: 'x_v=', value: F(xv) }, { kind: 'number', label: 'y_v=', value: F(yv) }] },
        steps: [d$('x_v=-\\frac{b}{2a}=-\\frac{' + sg(b) + '}{' + 2 * a + '}=' + xv), d$('y_v=f(' + xv + ')=' + yv), 'Como ' + i$(a > 0 ? 'a>0' : 'a<0') + ', el vértice es un ' + (a > 0 ? 'mínimo' : 'máximo') + '.'], mistakes: [], data: { a, b, c, xv, yv } };
    },
  });

  define({
    id: 'eso3-parabola-cortes',
    title: 'Cortes de una parábola con el eje X',
    help: [
      'Los puntos de corte con el eje $OX$ son las soluciones de $ax^2+bx+c=0$. El corte con $OY$ es $(0,c)$. Las dos raíces son simétricas respecto del eje $x=x_v$.',
      'Ejemplo: $y=x^2-4x+3$: $x^2-4x+3=0\\Rightarrow x=\\frac{4\\pm2}{2}$, es decir, $x=1$ y $x=3$; el vértice está en $x=2$, justo en medio.',
    ],
    generate() {
      let r1, r2; do { r1 = rnd.int(-6, 6); r2 = rnd.int(-6, 6); } while (r1 === r2);
      const a = rnd.pick([1, 1, 2, -1]), b = -a * (r1 + r2), c = a * r1 * r2, D = b * b - 4 * a * c;
      return { prompt: 'Halla los puntos de corte de ' + i$('y=' + quad(a, b, c)) + ' con el eje ' + i$('OX') + ' (separa las abscisas con punto y coma).', answer: { kind: 'list', label: 'x=', value: [F(r1), F(r2)] },
        steps: [i$(quad(a, b, c) + '=0') + ': ' + i$('\\Delta=' + D) + '.', d$('x=\\frac{' + (-b) + '\\pm' + Math.sqrt(D) + '}{' + 2 * a + '}'), 'Cortes en ' + i$('x=' + r1) + ' y ' + i$('x=' + r2) + '. El corte con ' + i$('OY') + ' es ' + i$('(0,' + c + ')') + '.'], mistakes: [], data: { a, b, c, r1, r2 } };
    },
  });

  define({
    id: 'eso3-recta-problema',
    title: 'Funciones lineales en problemas',
    help: [
      'Un coste con cuota fija y precio por unidad es una función lineal: $C(x)=\\text{cuota}+\\text{precio}\\cdot x$. Para comparar dos opciones se igualan sus funciones y se resuelve la ecuación.',
      'Ejemplo: A cuesta $10+0{,}05x$ y B cuesta $0{,}15x$. Iguales cuando $10+0{,}05x=0{,}15x\\Rightarrow10=0{,}10x\\Rightarrow x=100$. Para más de $100$ unidades conviene A.',
    ],
    params: [{ key: 'tipo', label: 'Qué calcular', options: [['coste', 'Coste para un consumo'], ['igual', 'Cuándo cuestan lo mismo'], ['inversa', 'Consumo para un coste dado']] }],
    generate(p) {
      const fijo = rnd.pick([5, 8, 10, 12, 15, 20]), pr = rnd.pick([F(1, 2), F(1, 4), F(3, 4), F(3, 2), F(2)]);
      const t = (f) => dc(f.n / f.d);
      if (p.tipo === 'coste') { const x = pr.d * rnd.int(2, 12) * 2; const C = fadd(F(fijo), fmul(pr, F(x))); return { prompt: 'Una tarifa cobra ' + i$(fijo) + ' € fijos al mes más ' + i$(t(pr)) + ' € por unidad consumida. ¿Cuánto cuesta consumir ' + i$(x) + ' unidades (en €)?', answer: { kind: 'number', label: 'C=', value: C }, steps: [d$('C(x)=' + fijo + '+' + t(pr) + 'x'), d$('C(' + x + ')=' + fijo + '+' + t(pr) + '\\cdot' + x + '=' + t(C))], mistakes: [], data: { tipo: 'coste', fijo, pr, x } }; }
      if (p.tipo === 'inversa') { const x = pr.d * rnd.int(3, 14) * 2; const C = fadd(F(fijo), fmul(pr, F(x))); return { prompt: 'Una tarifa cobra ' + i$(fijo) + ' € fijos al mes más ' + i$(t(pr)) + ' € por unidad. Este mes se han pagado ' + i$(t(C)) + ' €. ¿Cuántas unidades se han consumido?', answer: { kind: 'number', label: 'x=', value: F(x) }, steps: [d$(fijo + '+' + t(pr) + 'x=' + t(C) + '\\ \\Rightarrow\\ ' + t(pr) + 'x=' + t(fsub(C, F(fijo))) + '\\ \\Rightarrow\\ x=' + x)], mistakes: [], data: { tipo: 'inversa', fijo, pr, x, C } }; }
      const pr2 = fadd(pr, F(rnd.pick([1, 2, 3, 4]), 4)), x = pr.d * pr2.d * rnd.int(2, 6) * 4;
      const fijo2 = fmul(fsub(pr2, pr), F(x));
      if (fijo2.d !== 1) return again('eso3-recta-problema', p);
      return { prompt: 'Dos tarifas: la A cobra ' + i$(fijo2.n) + ' € fijos más ' + i$(t(pr)) + ' € por unidad; la B cobra ' + i$(t(pr2)) + ' € por unidad sin cuota. ¿Para cuántas unidades cuestan lo mismo?', answer: { kind: 'number', label: 'x=', value: F(x) },
        steps: ['Igualamos: ' + d$(fijo2.n + '+' + t(pr) + 'x=' + t(pr2) + 'x'), 'Despejamos: ' + d$(fijo2.n + '=(' + t(pr2) + '-' + t(pr) + ')x=' + t(fsub(pr2, pr)) + 'x\\ \\Rightarrow\\ x=' + x)], mistakes: [], data: { tipo: 'igual', fijo: fijo2.n, pr, pr2, x } };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
