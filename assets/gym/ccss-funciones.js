/* Ejercicios interactivos — 2º Bachillerato Ciencias Sociales, funciones y su uso en economía (temas 4, 6 y 8).
 * Módulos propios: ccss-fun-dominio, ccss-fun-parabola, ccss-fun-trozos, ccss-fun-expolog, ccss-fun-rentabilidad (T4),
 * ccss-der-marginal (T6) y ccss-int-marginal (T8).
 * Verificadores independientes: tests/verify-gym-ccss.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, ftex, d$, i$, fstr } = G;
  const num = (f) => f.n / f.d;

  /** Polinomio en x a partir de [[coef, potencia], …] (potencias decrecientes): «-x^{2}+3x-2». */
  function poly(terms) {
    let s = '';
    terms.filter(([c]) => c !== 0).forEach(([c, e], i) => {
      const ab = Math.abs(c);
      const cf = (ab === 1 && e > 0) ? '' : String(ab);
      const xs = e === 0 ? '' : (e === 1 ? 'x' : 'x^{' + e + '}');
      s += (c < 0 ? '-' : (i ? '+' : '')) + cf + xs;
    });
    return s || '0';
  }
  const evalP = (terms, x) => terms.reduce((s, [c, e]) => s + c * Math.pow(x, e), 0);
  const withX = (terms, v) => terms.map(([c, e]) => [c, e]).filter(([c]) => c !== 0).map(([c, e], i) => {
    const t = e === 0 ? String(Math.abs(c)) : (Math.abs(c) === 1 ? '' : Math.abs(c) + '\\cdot') + '(' + v + ')' + (e > 1 ? '^{' + e + '}' : '');
    return (c < 0 ? '-' : (i ? '+' : '')) + t;
  }).join('');

  /* ===================== Dominio ===================== */
  G.define({
    id: 'ccss-fun-dominio',
    title: 'Dominio de una función',
    help: [
      'Una fracción no existe si el denominador vale $0$; una raíz cuadrada exige radicando $\\ge0$; un logaritmo exige argumento $>0$. El dominio es el conjunto de $x$ donde todo esto se cumple.',
      'Ejemplos: $f(x)=\\frac{1}{x-2}$ no está definida en $x=2$. Para $\\sqrt{2x-6}$: $2x-6\\ge0\\Rightarrow x\\ge3$, dominio $[3,+\\infty)$. Para $\\ln(4-x)$: $4-x>0\\Rightarrow x<4$, dominio $(-\\infty,4)$.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['rac', 'Racional (valores excluidos)'], ['raiz', 'Con raíz cuadrada'], ['log', 'Con logaritmo']] }],
    generate(p) {
      if (p.tipo === 'rac') {
        let r1, r2;
        do { r1 = rnd.int(-6, 6); r2 = rnd.int(-6, 6); } while (r1 === r2);
        const m = rnd.int(1, 4) * rnd.pick([1, -1]), n = rnd.int(-6, 6);
        const den = [[1, 2], [-(r1 + r2), 1], [r1 * r2, 0]];
        const roots = [r1, r2];
        return {
          prompt: 'Halla los valores de $x$ que <b>no</b> pertenecen al dominio de $f(x)=\\dfrac{' + poly([[m, 1], [n, 0]]) + '}{' + poly(den) + '}$. Escríbelos separados por punto y coma.',
          answer: { kind: 'list', label: 'x=', value: roots.map((r) => F(r)) },
          steps: ['El denominador no puede ser $0$: ' + d$(poly(den) + '=0'),
            'Se resuelve la ecuación de segundo grado: ' + d$('x=\\frac{' + (r1 + r2) + '\\pm\\sqrt{' + ((r1 + r2) * (r1 + r2) - 4 * r1 * r2) + '}}{2}=\\frac{' + (r1 + r2) + '\\pm' + Math.abs(r1 - r2) + '}{2}\\ \\Rightarrow\\ x=' + r1 + ',\\ x=' + r2),
            'Dominio: ' + i$('\\mathbb{R}\\setminus\\{' + r1 + ',' + r2 + '\\}') + '.'],
          data: { tipo: 'rac', den, roots },
        };
      }
      const c = rnd.int(-8, 8), a = rnd.pick([1, 2, 3]) * rnd.pick([1, -1]), b = -a * c;
      const lin = poly([[a, 1], [b, 0]]);
      const isRaiz = p.tipo === 'raiz';
      const fx = isRaiz ? '\\sqrt{' + lin + '}' : '\\ln(' + lin + ')';
      const cond = isRaiz ? '\\ge' : '>';
      const dir = a > 0 ? (isRaiz ? '\\ge' : '>') : (isRaiz ? '\\le' : '<');
      const dom = a > 0 ? (isRaiz ? '[' + c + ',+\\infty)' : '(' + c + ',+\\infty)') : (isRaiz ? '(-\\infty,' + c + ']' : '(-\\infty,' + c + ')');
      return {
        prompt: 'El dominio de $f(x)=' + fx + '$ es ' + (a > 0 ? 'una semirrecta que empieza en un valor $c$ (hacia la derecha)' : 'una semirrecta que termina en un valor $c$ (hacia la izquierda)') + '. Halla $c$.',
        answer: { kind: 'number', label: 'c=', value: F(c) },
        steps: [(isRaiz ? 'El radicando debe ser $\\ge0$: ' : 'El argumento del logaritmo debe ser $>0$: ') + d$(lin + cond + '0'),
          'Se despeja' + (a < 0 ? ' (al dividir entre un número negativo la desigualdad se invierte)' : '') + ': ' + d$('x' + dir + c),
          'Dominio: ' + i$(dom) + ', luego $c=' + c + '$.'],
        mistakes: c === 0 ? [] : [{ value: F(-c), msg: 'revisa el signo al despejar: ' + i$(lin + '=0') + ' da $x=' + c + '$.' }],
        data: { tipo: p.tipo, a, b, c },
      };
    },
  });

  /* ===================== Parábola ===================== */
  G.define({
    id: 'ccss-fun-parabola',
    title: 'Parábola: vértice y puntos de corte',
    help: [
      'La gráfica de $f(x)=ax^2+bx+c$ es una parábola con el vértice en $x_v=-\\frac{b}{2a}$ (después $y_v=f(x_v)$). Si $a>0$ es convexa (abre hacia arriba, el vértice es un mínimo) y si $a<0$ abre hacia abajo (máximo). Corta al eje $Y$ en $(0,c)$.',
      'Los cortes con el eje $X$ salen de $ax^2+bx+c=0$: $x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$. Ejemplo: $f(x)=x^2-4x+3$: $x_v=2$, $y_v=-1$; raíces $x=1$ y $x=3$.',
    ],
    params: [{ key: 'tipo', label: 'Calcular', options: [['vertice', 'Vértice'], ['raices', 'Cortes con el eje X']] }],
    generate(p) {
      let a = rnd.pick([1, 2, 3, -1, -2]), t, ans, steps, mist = [];
      if (p.tipo === 'vertice') {
        const h = rnd.int(-5, 5), k = rnd.int(-8, 8);
        const b = -2 * a * h, c = a * h * h + k;
        t = [[a, 2], [b, 1], [c, 0]];
        steps = ['Abscisa del vértice: ' + d$('x_v=-\\frac{b}{2a}=-\\frac{' + b + '}{2\\cdot' + (a < 0 ? '(' + a + ')' : a) + '}=' + h),
          'Ordenada: ' + d$('y_v=f(' + h + ')=' + withX(t, h) + '=' + k),
          'Como $a' + (a > 0 ? '>0' : '<0') + '$, el vértice es un ' + (a > 0 ? 'mínimo' : 'máximo') + '.'];
        return {
          prompt: 'Halla el vértice de la parábola $f(x)=' + poly(t) + '$.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'x_v=', value: F(h) }, { kind: 'number', label: 'y_v=', value: F(k) }] },
          steps, data: { tipo: 'vertice', t, h, k },
        };
      }
      let r1, r2;
      do { r1 = rnd.int(-6, 6); r2 = rnd.int(-6, 6); } while (r1 === r2);
      t = [[a, 2], [-a * (r1 + r2), 1], [a * r1 * r2, 0]];
      const [A, B, C] = t.map((q) => q[0]);
      ans = [F(r1), F(r2)];
      return {
        prompt: 'Halla los puntos de corte de $f(x)=' + poly(t) + '$ con el eje $X$ (separados por punto y coma).',
        answer: { kind: 'list', label: 'x=', value: ans },
        steps: ['Los cortes con $OX$ cumplen $f(x)=0$: ' + d$(poly(t) + '=0'),
          'Fórmula: ' + d$('x=\\frac{' + (-B) + '\\pm\\sqrt{' + B * B + '-4\\cdot' + (A < 0 ? '(' + A + ')' : A) + '\\cdot' + (C < 0 ? '(' + C + ')' : C) + '}}{' + 2 * A + '}=\\frac{' + (-B) + '\\pm' + Math.sqrt(B * B - 4 * A * C) + '}{' + 2 * A + '}'),
          'Soluciones: ' + i$('x=' + r1) + ' y ' + i$('x=' + r2) + '. Puntos ' + i$('(' + r1 + ',0)') + ' y ' + i$('(' + r2 + ',0)') + '.'],
        data: { tipo: 'raices', t },
        plot: { type: '2d', x: [Math.min(r1, r2) - 2, Math.max(r1, r2) + 2], curves: [{ f: (x) => evalP(t, x) }], points: [{ x: r1, y: 0, label: '(' + r1 + ', 0)' }, { x: r2, y: 0, label: '(' + r2 + ', 0)' }] },
      };
    },
  });

  /* ===================== Función a trozos: tarifas ===================== */
  const TARIF = [
    { que: 'una operadora de telefonía', u: 'minutos' },
    { que: 'una empresa de mensajería', u: 'kg' },
    { que: 'una compañía de agua', u: 'm³' },
  ];
  const dec = (x) => String(Math.round(x * 1e4) / 1e4).replace('.', '{,}');
  G.define({
    id: 'ccss-fun-trozos',
    title: 'Funciones a trozos: tarifas',
    help: [
      'Una función a trozos usa una fórmula distinta en cada tramo. Para evaluarla en un valor, primero se mira en qué tramo está (atención a si el extremo pertenece a un tramo o a otro) y después se sustituye en la fórmula de ese tramo.',
      'Ejemplo: $f(x)=\\begin{cases}2x+1&x\\le3\\\\ x^2-2&x>3\\end{cases}$. $f(3)=2\\cdot3+1=7$ (el $3$ cumple $x\\le3$) y $f(4)=16-2=14$ (el $4$ cumple $x>3$).',
    ],
    generate() {
      const cx = rnd.pick(TARIF);
      const fijo = rnd.int(5, 20), c = rnd.int(3, 6) * 10;
      const r1 = rnd.int(1, 6) * 0.5, r2 = rnd.int(1, 4) * 0.5;          // €/unidad en cada tramo (múltiplos de 0,5)
      const T = (x) => (x <= c ? fijo + r1 * x : fijo + r1 * c + r2 * (x - c));
      const xs = [rnd.int(1, c / 10 - 1) * 10 + rnd.pick([0, 5]), c, c + rnd.int(1, 4) * 10];
      const vals = xs.map((x) => F(Math.round(T(x) * 100), 100));
      const R1 = dec(r1), R2 = dec(r2);
      const sprint = (x, i) => (i === 2
        ? 'En $x=' + x + '$ (segundo tramo, $x>' + c + '$): ' + i$('T(' + x + ')=' + fijo + '+' + R1 + '\\cdot' + c + '+' + R2 + '\\cdot(' + x + '-' + c + ')=' + dec(T(x)))
        : 'En $x=' + x + '$ (' + (i === 1 ? 'el extremo $' + c + '$ pertenece al primer tramo, por el $\\le$' : 'primer tramo') + '): ' + i$('T(' + x + ')=' + fijo + '+' + R1 + '\\cdot' + x + '=' + dec(T(x))));
      return {
        prompt: 'El coste $T(x)$ (en euros) de ' + cx.que + ' por consumir $x$ ' + cx.u + ' es ' + d$('T(x)=\\begin{cases}' + fijo + '+' + R1 + '\\,x&\\text{si }0\\le x\\le ' + c + '\\\\ ' + fijo + '+' + R1 + '\\cdot ' + c + '+' + R2 + '\\,(x-' + c + ')&\\text{si }x>' + c + '\\end{cases}')
          + 'Calcula $T(' + xs[0] + ')$, $T(' + xs[1] + ')$ y $T(' + xs[2] + ')$.',
        answer: { kind: 'matrix', value: [vals], colLabels: xs.map((x) => 'T(' + x + ')') },
        steps: xs.map(sprint),
        mistakes: [],
        data: { fijo, r1, r2, c, xs },
      };
    },
  });

  /* ===================== Exponencial y logaritmo ===================== */
  G.define({
    id: 'ccss-fun-expolog',
    title: 'Ecuaciones exponenciales y logarítmicas',
    help: [
      'Exponencial: se escriben los dos lados como potencias de la misma base y se igualan los exponentes ($b^u=b^v\\Rightarrow u=v$). Logaritmo: $\\log_b N=k$ equivale a $N=b^k$ (y $\\log_b$ solo existe si $N>0$).',
      'Ejemplos: $2^{x-1}=16=2^4\\Rightarrow x-1=4\\Rightarrow x=5$. $\\log_3(x+1)=2\\Rightarrow x+1=3^2=9\\Rightarrow x=8$. En un modelo $P(t)=P_0\\,b^t$, se sustituye el valor de $P$ y se resuelve igual.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['exp', 'Ecuación exponencial'], ['log', 'Ecuación logarítmica'], ['modelo', 'Modelo de crecimiento']] }],
    generate(p) {
      if (p.tipo === 'exp') {
        const b = rnd.pick([2, 3, 5, 10]), e = rnd.int(2, 4), cf = rnd.pick([1, 2]), d = rnd.int(-3, 3);
        const x = (e - d) / cf;
        const exp = poly([[cf, 1], [d, 0]]).replace(/x\^\{1\}/, 'x');
        return {
          prompt: 'Resuelve $' + b + '^{' + exp + '}=' + Math.pow(b, e) + '$.',
          answer: { kind: 'number', label: 'x=', value: F(e - d, cf) },
          steps: [d$(Math.pow(b, e) + '=' + b + '^{' + e + '}'), 'Igualando los exponentes: ' + d$(exp + '=' + e + '\\ \\Rightarrow\\ x=' + ftex(F(e - d, cf)))],
          data: { tipo: 'exp', b, cf, d, e, x },
        };
      }
      if (p.tipo === 'log') {
        const b = rnd.pick([2, 3, 5, 10]), k = rnd.int(1, 3), d = rnd.int(-4, 6);
        const x = Math.pow(b, k) - d;
        return {
          prompt: 'Resuelve $\\log_{' + b + '}(' + poly([[1, 1], [d, 0]]) + ')=' + k + '$.',
          answer: { kind: 'number', label: 'x=', value: F(x) },
          steps: ['Por la definición de logaritmo: ' + d$(poly([[1, 1], [d, 0]]) + '=' + b + '^{' + k + '}=' + Math.pow(b, k) + '\\ \\Rightarrow\\ x=' + x),
            'Comprobación: el argumento ' + i$(Math.pow(b, k)) + ' es positivo.'],
          data: { tipo: 'log', b, k, d, x },
        };
      }
      const b = rnd.pick([2, 3]), P0 = rnd.pick([50, 100, 200, 500]), t = rnd.int(3, 6);
      const N = P0 * Math.pow(b, t);
      const ctx = rnd.pick([
        { s: 'Un cultivo de bacterias', u: 'bacterias', tt: 'horas', v: b === 2 ? 'se duplica cada hora' : 'se triplica cada hora' },
        { s: 'Una página web', u: 'visitas diarias', tt: 'semanas', v: b === 2 ? 'duplica sus visitas cada semana' : 'triplica sus visitas cada semana' },
      ]);
      return {
        prompt: ctx.s + ' parte de ' + P0 + ' ' + ctx.u + ' y ' + ctx.v + ': $P(t)=' + P0 + '\\cdot' + b + '^{t}$ (con $t$ en ' + ctx.tt + '). ¿Cuándo llega a ' + N + '?',
        answer: { kind: 'number', label: 't=', value: F(t) },
        steps: ['Se plantea $P(t)=' + N + '$: ' + d$(P0 + '\\cdot' + b + '^{t}=' + N), 'Se divide entre ' + P0 + ': ' + d$(b + '^{t}=' + Math.pow(b, t) + '=' + b + '^{' + t + '}'), 'Luego $t=' + t + '$ ' + ctx.tt + '.'],
        data: { tipo: 'modelo', b, P0, N, t },
      };
    },
  });

  /* ===================== Rentabilidad ===================== */
  G.define({
    id: 'ccss-fun-rentabilidad',
    title: 'Ingresos, costes y beneficio',
    help: [
      'Beneficio = ingresos − costes: $B(x)=I(x)-C(x)$. El <b>umbral de rentabilidad</b> es el $x$ donde $I(x)=C(x)$ (es decir, $B(x)=0$): a partir de ahí se gana dinero.',
      'Si $B(x)=-ax^2+bx-c$ es una parábola con $a>0$, el beneficio máximo está en el vértice $x=\\frac{b}{2a}$. Ejemplo: $B(x)=-2x^2+40x-100$: $x_v=10$ y $B(10)=100$.',
    ],
    params: [{ key: 'tipo', label: 'Situación', options: [['lineal', 'Ingresos y costes lineales'], ['beneficio', 'Ingreso con precio variable']] }],
    generate(p) {
      if (p.tipo === 'lineal') {
        const c = rnd.int(3, 12), pp = c + rnd.int(2, 8), xs = rnd.int(5, 40) * 10, fijo = xs * (pp - c), x1 = xs + rnd.int(1, 6) * 10;
        return {
          prompt: 'Un taller tiene unos costes fijos de ' + fijo + ' € y un coste de ' + c + ' € por unidad fabricada. Cada unidad se vende a ' + pp + ' €. Calcula el umbral de rentabilidad $x$ (unidades) y el beneficio si se fabrican y venden ' + x1 + ' unidades.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'x=', value: F(xs) }, { kind: 'number', label: 'B(' + x1 + ')=', value: F((pp - c) * (x1 - xs)) }] },
          steps: ['Ingresos y costes: ' + d$('I(x)=' + pp + 'x,\\qquad C(x)=' + fijo + '+' + c + 'x'),
            'Umbral: ' + d$('I(x)=C(x)\\ \\Rightarrow\\ ' + pp + 'x=' + fijo + '+' + c + 'x\\ \\Rightarrow\\ ' + (pp - c) + 'x=' + fijo + '\\ \\Rightarrow\\ x=' + xs),
            'Beneficio: ' + d$('B(' + x1 + ')=I-C=' + pp * x1 + '-' + (fijo + c * x1) + '=' + (pp - c) * (x1 - xs))],
          data: { tipo: 'lineal', c, pp, fijo, xs, x1 },
          plot: { type: '2d', x: [0, xs * 2], curves: [{ f: (x) => pp * x, label: 'I' }, { f: (x) => fijo + c * x, label: 'C' }], points: [{ x: xs, y: pp * xs, label: '(' + xs + ', ' + pp * xs + ')' }] },
        };
      }
      let n, h, c, m, fijo, Bmax;
      do { n = rnd.int(1, 3); h = rnd.int(5, 30); c = rnd.int(2, 10); m = c + 2 * n * h; fijo = rnd.int(1, 5) * 10; Bmax = n * h * h - fijo; } while (Bmax <= 0);
      const B = [[-n, 2], [m - c, 1], [-fijo, 0]];
      return {
        prompt: 'Una empresa vende $x$ unidades al precio de $' + m + '-' + (n === 1 ? '' : n) + 'x$ euros cada una, y fabricarlas le cuesta $C(x)=' + fijo + '+' + c + 'x$ euros. Halla cuántas unidades dan el beneficio máximo y cuánto vale.',
        answer: { kind: 'multi', parts: [{ kind: 'number', label: 'x=', value: F(h) }, { kind: 'number', label: 'B_{\\max}=', value: F(Bmax) }] },
        steps: ['Ingreso: ' + i$('I(x)=x\\,(' + m + '-' + (n === 1 ? '' : n) + 'x)=' + poly([[-n, 2], [m, 1]])) + '. Beneficio: ' + d$('B(x)=I(x)-C(x)=' + poly(B)),
          'Es una parábola con $a=' + -n + '<0$: el máximo está en el vértice ' + d$('x_v=-\\frac{b}{2a}=-\\frac{' + (m - c) + '}{2\\cdot(' + -n + ')}=' + h),
          'Beneficio máximo: ' + d$('B(' + h + ')=' + withX(B, h) + '=' + Bmax)],
        data: { tipo: 'beneficio', n, m, c, fijo, h, Bmax },
        plot: { type: '2d', x: [0, 2 * h + 2], curves: [{ f: (x) => evalP(B, x) }], points: [{ x: h, y: Bmax, label: '(' + h + ', ' + Bmax + ')' }] },
      };
    },
  });

  /* ===================== T6 · Coste marginal ===================== */
  G.define({
    id: 'ccss-der-marginal',
    title: 'Coste marginal',
    help: [
      'El <b>coste marginal</b> en $x_0$ es la derivada $C\'(x_0)$: aproxima lo que cuesta fabricar una unidad más. El incremento real es $C(x_0+1)-C(x_0)$, parecido pero no igual.',
      'Ejemplo: $C(x)=x^2+10x+50$. $C\'(x)=2x+10$, luego $C\'(20)=50$. El coste real de la unidad 21 es $C(21)-C(20)=701-650=51$.',
    ],
    params: [{ key: 'tipo', label: 'Función de coste', options: [['cuad', 'Cuadrática'], ['cubica', 'Cúbica']] }],
    generate(p) {
      const x0 = rnd.int(5, 30);
      let C, dC;
      if (p.tipo === 'cuad') {
        const a = rnd.int(1, 4), b = rnd.int(5, 30), c0 = rnd.int(1, 8) * 100;
        C = [[a, 2], [b, 1], [c0, 0]]; dC = [[2 * a, 1], [b, 0]];
      } else {
        const a = rnd.int(1, 3), b = rnd.int(-6, 6) * 2, c = rnd.int(10, 40), d0 = rnd.int(1, 8) * 100;
        C = [[a, 3], [b, 2], [c, 1], [d0, 0]]; dC = [[3 * a, 2], [2 * b, 1], [c, 0]];
      }
      const marg = evalP(dC, x0), real = evalP(C, x0 + 1) - evalP(C, x0);
      return {
        prompt: 'El coste (en euros) de fabricar $x$ unidades es $C(x)=' + poly(C) + '$. Calcula el coste marginal $C\'(' + x0 + ')$ y el coste real de fabricar la unidad número ' + (x0 + 1) + ', $C(' + (x0 + 1) + ')-C(' + x0 + ')$.',
        answer: { kind: 'multi', parts: [{ kind: 'number', label: 'C\'(' + x0 + ')=', value: F(marg) }, { kind: 'number', label: 'C(' + (x0 + 1) + ')-C(' + x0 + ')=', value: F(real) }] },
        steps: ['Derivada: ' + d$('C\'(x)=' + poly(dC)), 'Coste marginal: ' + d$('C\'(' + x0 + ')=' + withX(dC, x0) + '=' + marg),
          'Coste real: ' + d$('C(' + (x0 + 1) + ')-C(' + x0 + ')=' + evalP(C, x0 + 1) + '-' + evalP(C, x0) + '=' + real),
          'Los dos valores son parecidos: el coste marginal (' + i$(marg) + ' €) aproxima el coste real de la unidad siguiente (' + i$(real) + ' €).'],
        data: { tipo: p.tipo, C, x0 },
      };
    },
  });

  /* ===================== T8 · Del coste marginal al coste total ===================== */
  G.define({
    id: 'ccss-int-marginal',
    title: 'Del coste marginal al coste',
    help: [
      'Si $C\'(x)$ es el coste marginal, el coste de pasar de $a$ a $b$ unidades es el área bajo $C\'$: $\\int_a^b C\'(x)\\,dx=C(b)-C(a)$ (regla de Barrow). Para el coste total hace falta el coste fijo: $C(x)=C(0)+\\int_0^x C\'(t)\\,dt$.',
      'Ejemplo: $C\'(x)=0{,}04x+5$. De $50$ a $100$ unidades: $\\left[0{,}02x^2+5x\\right]_{50}^{100}=700-300=400$ €.',
    ],
    params: [{ key: 'pregunta', label: 'Calcular', options: [['incremento', 'Coste de pasar de a a b unidades'], ['total', 'Coste total de b unidades']] }],
    generate(p) {
      const a1 = rnd.pick([2, 4, 5, 10]) , b1 = rnd.int(3, 20);
      // C'(x) = (a1/ 10)·x + b1  →  primitiva (a1/20)x² + b1·x ; límites múltiplos de 10 para que salga entero
      const lo = rnd.int(1, 6) * 10, hi = lo + rnd.int(1, 6) * 10, F0 = rnd.int(1, 6) * 100;
      const prim = (x) => a1 * x * x / 20 + b1 * x;
      const inc = prim(hi) - prim(lo);
      const mg = dec(a1 / 10);
      const plot = { type: '2d', x: [0, hi + 10], curves: [{ f: (x) => a1 * x / 10 + b1, label: 'C\'' }], fill: [{ f: (x) => a1 * x / 10 + b1, a: p.pregunta === 'total' ? 0 : lo, b: hi }] };
      if (p.pregunta === 'incremento') {
        return {
          prompt: 'El coste marginal de una empresa es $C\'(x)=' + mg + 'x+' + b1 + '$ euros por unidad. ¿Cuánto aumenta el coste al pasar de ' + lo + ' a ' + hi + ' unidades?',
          answer: { kind: 'number', label: '\\Delta C=', value: F(Math.round(inc * 100), 100) },
          steps: ['El aumento es el área bajo $C\'$: ' + d$('\\int_{' + lo + '}^{' + hi + '}\\left(' + mg + 'x+' + b1 + '\\right)dx'),
            'Primitiva: ' + i$(ftex(F(a1, 20)) + 'x^2+' + b1 + 'x') + '. Por Barrow: ' + d$('\\left[' + ftex(F(a1, 20)) + 'x^2+' + b1 + 'x\\right]_{' + lo + '}^{' + hi + '}=' + prim(hi) + '-' + prim(lo) + '=' + inc)],
          data: { tipo: 'incremento', a1, b1, lo, hi, inc },
          plot,
        };
      }
      const tot = F0 + prim(hi);
      return {
        prompt: 'El coste marginal de una empresa es $C\'(x)=' + mg + 'x+' + b1 + '$ euros por unidad y los costes fijos son ' + F0 + ' €. Calcula el coste total de fabricar ' + hi + ' unidades.',
        answer: { kind: 'number', label: 'C(' + hi + ')=', value: F(Math.round(tot * 100), 100) },
        steps: ['Coste total = coste fijo + área bajo $C\'$ desde $0$: ' + d$('C(' + hi + ')=' + F0 + '+\\int_0^{' + hi + '}\\left(' + mg + 'x+' + b1 + '\\right)dx'),
          d$('=' + F0 + '+\\left[' + ftex(F(a1, 20)) + 'x^2+' + b1 + 'x\\right]_0^{' + hi + '}=' + F0 + '+' + prim(hi) + '=' + tot)],
        data: { tipo: 'total', a1, b1, F0, hi, tot },
        plot,
      };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
