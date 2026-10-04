/* Ejercicios interactivos — 3º ESO, sentido algebraico (temas 5 a 7).
 * Tema 5: eso3-pol-valor, eso3-pol-operar, eso3-pol-division, eso3-pol-factorizar.
 * Tema 6: eso3-ec-1grado, eso3-ec-2grado, eso3-ec-discriminante, eso3-ec-problema.
 * Tema 7: eso3-sis-resolver, eso3-sis-clasificar, eso3-sis-problema.
 * Verificadores independientes: tests/verify-gym-eso3.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, ftex, d$, i$, gcd, fadd, fsub, fmul, fdiv } = G;
  const { dc, define, sg, again } = G.eso3;

  /** Polinomio (coeficientes de mayor a menor grado) en TeX. */
  function polyTex(c, v) {
    v = v || 'x';
    const n = c.length - 1; let out = '';
    c.forEach((k, i) => {
      if (k === 0) return;
      const e = n - i, a = Math.abs(k);
      const co = a === 1 && e > 0 ? '' : String(a);
      const lit = e === 0 ? '' : e === 1 ? v : v + '^{' + e + '}';
      out += (k < 0 ? '-' : (out ? '+' : '')) + co + lit;
    });
    return out || '0';
  }
  /** Suma de monomios k·lit con signos bien escritos (lit puede ser '' para el término independiente). */
  const sum = (items) => items.filter(([k]) => k !== 0).map(([k, lit], i) => (k < 0 ? '-' : (i ? '+' : '')) + (Math.abs(k) === 1 && lit ? '' : Math.abs(k)) + lit).join('') || '0';
  const evalP = (c, x) => c.reduce((s, k) => s * x + k, 0);
  const nz = (lo, hi) => { let v; do { v = rnd.int(lo, hi); } while (v === 0); return v; };

  /* ===================== Tema 5 ===================== */
  define({
    id: 'eso3-pol-valor',
    title: 'Valor numérico de un polinomio',
    help: [
      'El **valor numérico** de $P(x)$ en $x=a$ es el número que resulta de sustituir $x$ por $a$ y operar. Cuidado con los signos: $(-2)^2=4$ pero $(-2)^3=-8$.',
      'Ejemplo: $P(x)=x^3-2x^2+5$. $P(-1)=(-1)^3-2\\cdot(-1)^2+5=-1-2+5=2$. Si $P(a)=0$, $a$ es una **raíz** de $P$.',
    ],
    params: [{ key: 'grado', label: 'Grado', options: [['2', 'Segundo grado'], ['3', 'Tercer grado']] }],
    generate(p) {
      const g = Number(p.grado);
      const c = Array.from({ length: g + 1 }, (_, i) => (i === 0 ? nz(-3, 4) : rnd.int(-6, 6)));
      const a = nz(-3, 3), val = evalP(c, a);
      return {
        prompt: 'Calcula ' + i$('P(' + a + ')') + ' para ' + i$('P(x)=' + polyTex(c)) + '.',
        answer: { kind: 'number', label: 'P(' + a + ')=', value: F(val) },
        steps: ['Sustituimos ' + i$('x=' + a) + ': ' + d$('P(' + a + ')=' + c.map((k, i) => { const e = g - i; if (k === 0) return null; const pw = e === 0 ? '' : e === 1 ? sg(a) : sg(a) + '^{' + e + '}'; return [k, pw]; }).filter(Boolean).map(([k, pw], i) => (k < 0 ? '-' : (i ? '+' : '')) + (pw ? (Math.abs(k) === 1 ? '' : Math.abs(k) + '\\cdot') + pw : Math.abs(k))).join('')),
          'Operando: ' + d$('P(' + a + ')=' + val)],
        mistakes: [], data: { c, a, val },
      };
    },
  });

  define({
    id: 'eso3-pol-operar',
    title: 'Operaciones con polinomios e identidades notables',
    help: [
      'Producto: se multiplica cada término de un factor por cada término del otro y se reducen los semejantes. Identidades notables: $(a+b)^2=a^2+2ab+b^2$, $(a-b)^2=a^2-2ab+b^2$ y $(a+b)(a-b)=a^2-b^2$.',
      'Ejemplo: $(2x+3)^2=4x^2+12x+9$ (el doble producto es $2\\cdot2x\\cdot3=12x$). Y $(x+2)(x-5)=x^2-5x+2x-10=x^2-3x-10$.',
    ],
    params: [{ key: 'tipo', label: 'Operación', options: [['prod', 'Producto de binomios'], ['cuad', 'Cuadrado de un binomio'], ['dif', 'Suma por diferencia'], ['resta', 'Suma y resta de polinomios']] }],
    generate(p) {
      if (p.tipo === 'prod') {
        const a = nz(1, 3), b = nz(-6, 6), c = nz(1, 3), d = nz(-6, 6);
        const r = [a * c, a * d + b * c, b * d];
        return { prompt: 'Desarrolla y reduce ' + i$('(' + polyTex([a, b]) + ')(' + polyTex([c, d]) + ')') + '. Da los coeficientes de ' + i$('x^2') + ', ' + i$('x') + ' y el término independiente.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'x^2:', value: F(r[0]) }, { kind: 'number', label: 'x:', value: F(r[1]) }, { kind: 'number', label: '\\text{ind.}:', value: F(r[2]) }] },
          steps: ['Multiplicamos cada término del primer factor por cada término del segundo: ' + d$('(' + polyTex([a, b]) + ')(' + polyTex([c, d]) + ')=' + sum([[a * c, 'x^2'], [a * d, 'x'], [b * c, 'x'], [b * d, '']])),
            'Reducimos los términos en $x$: ' + d$(polyTex(r))],
          mistakes: [], data: { a, b, c, d, r } };
      }
      if (p.tipo === 'cuad') {
        const a = nz(1, 4), b = nz(1, 6), sign = rnd.pick([1, -1]);
        const r = [a * a, 2 * a * b * sign, b * b];
        return { prompt: 'Desarrolla ' + i$('(' + polyTex([a, sign * b]) + ')^2') + '. Da los coeficientes de ' + i$('x^2') + ', ' + i$('x') + ' y el término independiente.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'x^2:', value: F(r[0]) }, { kind: 'number', label: 'x:', value: F(r[1]) }, { kind: 'number', label: '\\text{ind.}:', value: F(r[2]) }] },
          steps: ['Cuadrado de una ' + (sign > 0 ? 'suma' : 'diferencia') + ': ' + d$('(A' + (sign > 0 ? '+' : '-') + 'B)^2=A^2' + (sign > 0 ? '+' : '-') + '2AB+B^2,\\quad A=' + polyTex([a, 0]) + ',\\ B=' + b),
            'Resultado: ' + d$('(' + polyTex([a, sign * b]) + ')^2=' + polyTex(r))],
          mistakes: [], data: { a, b, sign, r } };
      }
      if (p.tipo === 'dif') {
        const a = nz(1, 5), b = nz(1, 8);
        return { prompt: 'Desarrolla ' + i$('(' + polyTex([a, b]) + ')(' + polyTex([a, -b]) + ')') + '. Da el coeficiente de ' + i$('x^2') + ' y el término independiente.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'x^2:', value: F(a * a) }, { kind: 'number', label: '\\text{ind.}:', value: F(-b * b) }] },
          steps: ['Suma por diferencia: ' + d$('(A+B)(A-B)=A^2-B^2,\\quad A=' + polyTex([a, 0]) + ',\\ B=' + b), 'Resultado: ' + d$(polyTex([a * a, 0, -b * b]))], mistakes: [], data: { a, b } };
      }
      const A = [nz(-3, 4), rnd.int(-6, 6), rnd.int(-9, 9)], B = [rnd.int(-3, 4), rnd.int(-6, 6), rnd.int(-9, 9)];
      const k = rnd.pick([1, 2, 3]);
      const r = A.map((x, i) => x - k * B[i]);
      return { prompt: 'Dados ' + i$('A=' + polyTex(A)) + ' y ' + i$('B=' + polyTex(B)) + ', calcula ' + i$('A-' + (k > 1 ? k : '') + 'B') + '. Da los coeficientes de ' + i$('x^2') + ', ' + i$('x') + ' y el término independiente.',
        answer: { kind: 'multi', parts: [{ kind: 'number', label: 'x^2:', value: F(r[0]) }, { kind: 'number', label: 'x:', value: F(r[1]) }, { kind: 'number', label: '\\text{ind.}:', value: F(r[2]) }] },
        steps: ['Multiplicamos ' + i$('B') + ' por ' + k + ': ' + i$(k + 'B=' + polyTex(B.map((x) => k * x))) + '.', 'Restamos término a término (cuidado con los signos): ' + d$('A-' + (k > 1 ? k : '') + 'B=' + polyTex(r))], mistakes: [], data: { A, B, k, r } };
    },
  });

  define({
    id: 'eso3-pol-division',
    title: 'División de polinomios entre x − a',
    help: [
      'Se divide como los números: se divide el término de mayor grado del dividendo entre $x$, se multiplica por el divisor y se resta. También vale la **regla de Ruffini**: se baja el primer coeficiente y se multiplica por $a$ para sumarlo al siguiente.',
      'El resto de dividir $P(x)$ entre $x-a$ es $P(a)$. Ejemplo: $(x^2+3x+1):(x-2)$ da cociente $x+5$ y resto $11$, porque $P(2)=4+6+1=11$.',
    ],
    generate() {
      const a = nz(-3, 3), q = [nz(1, 3) * rnd.pick([1, 1, -1]), rnd.int(-5, 5), rnd.int(-5, 5)], rem = rnd.pick([0, 0, rnd.int(-9, 9)]);
      // dividendo = (x - a)(q) + rem
      const P = [q[0], q[1] - a * q[0], q[2] - a * q[1], rem - a * q[2]];
      const rows = []; let acc = P[0]; rows.push(acc); const bring = [acc];
      for (let i = 1; i < 4; i++) { acc = P[i] + a * acc; bring.push(acc); }
      return {
        prompt: 'Divide ' + i$('P(x)=' + polyTex(P)) + ' entre ' + i$('x' + (a < 0 ? '+' + (-a) : '-' + a)) + '. Da los coeficientes del cociente ' + i$('C(x)') + ' (de mayor a menor grado) y el resto.',
        answer: { kind: 'multi', parts: [{ kind: 'number', label: 'x^2:', value: F(q[0]) }, { kind: 'number', label: 'x:', value: F(q[1]) }, { kind: 'number', label: '\\text{ind.}:', value: F(q[2]) }, { kind: 'number', label: '\\text{resto}:', value: F(rem) }] },
        steps: ['Regla de Ruffini con ' + i$('a=' + a) + ' y coeficientes ' + i$(P.join(',\\ ')) + ': se baja ' + i$(P[0]) + ' y cada resultado se multiplica por ' + i$(a) + ' y se suma al siguiente coeficiente.',
          'Resultados sucesivos: ' + i$(bring.join(',\\ ')) + '. Los tres primeros son el cociente y el último, el resto.',
          'Cociente ' + i$('C(x)=' + polyTex(q)) + ' y resto ' + i$(rem) + '. Comprobación: el resto es ' + i$('P(' + a + ')=' + evalP(P, a)) + '.'],
        mistakes: [], data: { a, P, q, rem },
      };
    },
  });

  define({
    id: 'eso3-pol-factorizar',
    title: 'Raíces y factorización',
    help: [
      'Si $a$ es raíz de $P(x)$ (es decir, $P(a)=0$), entonces $(x-a)$ es un factor. Para un trinomio $x^2+bx+c$, las raíces son dos números cuya **suma** es $-b$ y cuyo **producto** es $c$.',
      'Ejemplo: $x^2-5x+6$: dos números que suman $5$ y multiplican $6$ son $2$ y $3$, luego $x^2-5x+6=(x-2)(x-3)$ y las raíces son $2$ y $3$.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['trinomio', 'Trinomio x² + bx + c'], ['notable', 'Diferencia de cuadrados'], ['comun', 'Factor común']] }],
    generate(p) {
      if (p.tipo === 'trinomio') {
        let r1, r2; do { r1 = nz(-7, 7); r2 = nz(-7, 7); } while (r1 === r2);
        const b = -(r1 + r2), c = r1 * r2;
        return { prompt: 'Halla las raíces de ' + i$('x^2' + (b ? (b > 0 ? '+' : '') + (b === 1 ? '' : b === -1 ? '-' : b) + 'x' : '') + (c >= 0 ? '+' : '') + c) + ' y factorízalo. Escribe las raíces separadas por punto y coma.',
          answer: { kind: 'list', label: '\\text{raíces}=', value: [F(r1), F(r2)] },
          steps: ['Buscamos dos números que sumen ' + i$(-b) + ' y multipliquen ' + i$(c) + ': son ' + i$(r1) + ' y ' + i$(r2) + '.', d$('x^2' + (b ? (b > 0 ? '+' : '') + b + 'x' : '') + (c >= 0 ? '+' : '') + c + '=(x' + (r1 < 0 ? '+' + (-r1) : '-' + r1) + ')(x' + (r2 < 0 ? '+' + (-r2) : '-' + r2) + ')'), 'Las raíces son ' + i$('x=' + r1) + ' y ' + i$('x=' + r2) + '.'],
          mistakes: [], data: { b, c, r1, r2 } };
      }
      if (p.tipo === 'notable') {
        const a = nz(1, 4), b = nz(1, 9);
        return { prompt: 'Halla las raíces de ' + i$((a * a === 1 ? '' : a * a) + 'x^2-' + b * b) + ' (escríbelas separadas por punto y coma, como fracción si hace falta).',
          answer: { kind: 'list', label: '\\text{raíces}=', value: [F(b, a), F(-b, a)] },
          steps: ['Es una diferencia de cuadrados: ' + d$((a * a === 1 ? '' : a * a) + 'x^2-' + b * b + '=(' + (a === 1 ? '' : a) + 'x+' + b + ')(' + (a === 1 ? '' : a) + 'x-' + b + ')'), 'Cada factor igualado a cero: ' + i$('x=' + ftex(F(b, a)) + '\\ \\text{y}\\ x=' + ftex(F(-b, a))) + '.'], mistakes: [], data: { a, b } };
      }
      const k = nz(2, 6), r = nz(-6, 6);
      return { prompt: 'Halla las raíces de ' + i$(k + 'x^2' + (r * k >= 0 ? '+' : '') + r * k + 'x') + ' sacando factor común (separadas por punto y coma).',
        answer: { kind: 'list', label: '\\text{raíces}=', value: [F(0), F(-r)] },
        steps: ['Factor común ' + i$(k + 'x') + ': ' + d$(k + 'x^2' + (r * k >= 0 ? '+' : '') + r * k + 'x=' + k + 'x\\,(x' + (r >= 0 ? '+' : '') + r + ')'), 'Cada factor igual a cero: ' + i$('x=0') + ' y ' + i$('x=' + (-r)) + '.'], mistakes: [], data: { k, r } };
    },
  });

  /* ===================== Tema 6 ===================== */
  define({
    id: 'eso3-ec-1grado',
    title: 'Ecuaciones de primer grado',
    help: [
      'Se quitan paréntesis, se quitan denominadores (multiplicando por el m.c.m.), se pasan los términos con $x$ a un lado y los números al otro, y se despeja. Lo que suma pasa restando, lo que multiplica pasa dividiendo.',
      'Ejemplo: $3(x-2)=x+8\\Rightarrow3x-6=x+8\\Rightarrow2x=14\\Rightarrow x=7$. Comprueba siempre sustituyendo.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['basica', 'Con x en los dos miembros'], ['parent', 'Con paréntesis'], ['denom', 'Con denominadores']] }],
    generate(p) {
      for (let t = 0; t < 200; t++) {
        let al, be, ga, de, eq, steps;
        if (p.tipo === 'basica') {
          const a = nz(-6, 9), b = rnd.int(-12, 12), c = nz(-6, 9), d = rnd.int(-12, 12);
          if (a === c) continue;
          eq = a + 'x' + (b >= 0 ? '+' : '') + b + '=' + c + 'x' + (d >= 0 ? '+' : '') + d;
          const x = fdiv(F(d - b), F(a - c));
          if (x.d > 4) continue;
          return { prompt: 'Resuelve ' + i$(eq.replace(/^1x/, 'x').replace(/(^|=)(-?)1x/g, '$1$2x')) + '.', answer: { kind: 'number', label: 'x=', value: x },
            steps: ['Pasamos los términos con $x$ a la izquierda y los números a la derecha: ' + d$(sum([[a - c, 'x']]) + '=' + (d - b)), 'Despejamos: ' + d$('x=\\frac{' + (d - b) + '}{' + (a - c) + '}=' + ftex(x))], mistakes: [], data: { a, b, c, d } };
        }
        if (p.tipo === 'parent') {
          const a = nz(2, 5), b = nz(-6, 6), c = nz(2, 5), d = nz(-6, 6), e = rnd.int(-8, 8);
          if (a === c) continue;
          const x = fdiv(F(c * d + e - a * b), F(a - c));
          if (x.d > 3) continue;
          return { prompt: 'Resuelve ' + i$(a + '(x' + (b >= 0 ? '+' : '') + b + ')=' + c + '(x' + (d >= 0 ? '+' : '') + d + ')' + (e >= 0 ? '+' : '') + e) + '.', answer: { kind: 'number', label: 'x=', value: x },
            steps: ['Quitamos paréntesis: ' + d$(a + 'x' + (a * b >= 0 ? '+' : '') + a * b + '=' + c + 'x' + (c * d + e >= 0 ? '+' : '') + (c * d + e)), 'Agrupamos: ' + d$(sum([[a - c, 'x']]) + '=' + (c * d + e - a * b)), 'Despejamos: ' + d$('x=' + ftex(x))], mistakes: [], data: { a, b, c, d, e } };
        }
        const pp = rnd.pick([2, 3, 4]), qq = rnd.pick([2, 3, 4, 6]);
        if (pp === qq) continue;
        const a = nz(-5, 5), b = nz(-5, 5), r = rnd.int(-4, 4);
        const al2 = fsub(F(1, pp), F(1, qq)), be2 = fadd(F(a, pp), F(-b, qq));
        const x = fdiv(fsub(F(r), be2), al2);
        if (x.d > 2 || x.n === 0) continue;
        const m = pp * qq / gcd(pp, qq);
        return { prompt: 'Resuelve ' + i$('\\frac{x' + (a >= 0 ? '+' : '') + a + '}{' + pp + '}-\\frac{x' + (b >= 0 ? '+' : '') + b + '}{' + qq + '}=' + r) + '.', answer: { kind: 'number', label: 'x=', value: x },
          steps: ['Multiplicamos por el m.c.m. ' + i$(m) + ': ' + d$((m / pp) + '(x' + (a >= 0 ? '+' : '') + a + ')-' + (m / qq) + '(x' + (b >= 0 ? '+' : '') + b + ')=' + (m * r)), 'Operamos y despejamos: ' + d$('x=' + ftex(x))], mistakes: [], data: { pp, qq, a, b, r } };
      }
      return again('eso3-ec-1grado', p);
    },
  });

  define({
    id: 'eso3-ec-2grado',
    title: 'Ecuaciones de segundo grado',
    help: [
      '$ax^2+bx+c=0$ tiene soluciones $x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$. Si $b=0$ se despeja $x^2$; si $c=0$ se saca factor común $x$.',
      'Ejemplo: $x^2-5x+6=0$: $\\Delta=25-24=1$ y $x=\\frac{5\\pm1}{2}$, es decir, $3$ y $2$. Comprueba con la suma ($5$) y el producto ($6$) de las raíces.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['completa', 'Completa'], ['sinb', 'Sin término en x'], ['sinc', 'Sin término independiente']] }],
    generate(p) {
      if (p.tipo === 'completa') {
        let r1, r2; do { r1 = nz(-6, 7); r2 = nz(-6, 7); } while (r1 === r2);
        const a = rnd.pick([1, 1, 1, 2, 3, -1]), B = -a * (r1 + r2), C = a * r1 * r2;
        const disc = B * B - 4 * a * C;
        return { prompt: 'Resuelve ' + i$(polyTex([a, B, C]) + '=0') + ' (separa las soluciones con punto y coma).', answer: { kind: 'list', label: 'x=', value: [F(r1), F(r2)] },
          steps: ['Discriminante: ' + i$('\\Delta=' + sg(B) + '^2-4\\cdot' + sg(a) + '\\cdot' + sg(C) + '=' + disc) + '.', d$('x=\\frac{' + (-B) + '\\pm\\sqrt{' + disc + '}}{' + 2 * a + '}=\\frac{' + (-B) + '\\pm' + Math.sqrt(disc) + '}{' + 2 * a + '}'), 'Soluciones: ' + i$('x=' + r1) + ' y ' + i$('x=' + r2) + '.'], mistakes: [], data: { a, B, C, r1, r2 } };
      }
      if (p.tipo === 'sinb') {
        const r = nz(2, 9), a = rnd.pick([1, 2, 3, 4, 5]);
        return { prompt: 'Resuelve ' + i$((a === 1 ? '' : a) + 'x^2-' + a * r * r + '=0') + ' (separa las soluciones con punto y coma).', answer: { kind: 'list', label: 'x=', value: [F(r), F(-r)] },
          steps: ['Despejamos: ' + d$('x^2=\\frac{' + a * r * r + '}{' + a + '}=' + r * r), 'Hay dos soluciones opuestas: ' + i$('x=\\pm' + r) + '.'], mistakes: [], data: { a, r } };
      }
      const k = nz(2, 6), r = nz(-8, 8);
      return { prompt: 'Resuelve ' + i$(k + 'x^2' + (-k * r >= 0 ? '+' : '') + (-k * r) + 'x=0') + ' (separa las soluciones con punto y coma).', answer: { kind: 'list', label: 'x=', value: [F(0), F(r)] },
        steps: ['Sacamos factor común ' + i$(k + 'x') + ': ' + d$(k + 'x\\,(x' + (-r >= 0 ? '+' : '') + (-r) + ')=0'), 'Un producto es cero si lo es algún factor: ' + i$('x=0') + ' o ' + i$('x=' + r) + '.'], mistakes: [], data: { k, r } };
    },
  });

  define({
    id: 'eso3-ec-discriminante',
    title: 'Número de soluciones: el discriminante',
    help: [
      'El discriminante $\\Delta=b^2-4ac$ decide: si $\\Delta>0$ hay dos soluciones reales distintas; si $\\Delta=0$, una solución doble; si $\\Delta<0$, ninguna solución real.',
      'Ejemplo: $x^2+2x+5=0$ tiene $\\Delta=4-20=-16<0$: no tiene solución real. $x^2-6x+9=0$ tiene $\\Delta=36-36=0$: solo $x=3$.',
    ],
    generate() {
      const a = nz(-3, 4), b = rnd.int(-8, 8), c = nz(-8, 8);
      const disc = b * b - 4 * a * c;
      const options = ['Ninguna solución real', 'Una solución (doble)', 'Dos soluciones distintas'];
      const val = disc < 0 ? 0 : disc === 0 ? 1 : 2;
      return { prompt: '¿Cuántas soluciones reales tiene ' + i$(polyTex([a, b, c]) + '=0') + '?', answer: { kind: 'choice', options, value: String(val) },
        steps: ['Calculamos ' + i$('\\Delta=b^2-4ac=' + sg(b) + '^2-4\\cdot' + sg(a) + '\\cdot' + sg(c) + '=' + disc) + '.', disc < 0 ? 'Como ' + i$('\\Delta<0') + ', no hay soluciones reales.' : disc === 0 ? 'Como ' + i$('\\Delta=0') + ', hay una solución doble.' : 'Como ' + i$('\\Delta>0') + ', hay dos soluciones reales distintas.'],
        mistakes: [], data: { a, b, c, disc } };
    },
  });

  define({
    id: 'eso3-ec-problema',
    title: 'Problemas con ecuaciones',
    help: [
      'Elige la incógnita, traduce el enunciado a una ecuación, resuélvela y **comprueba** que la solución tiene sentido (¿puede ser negativa? ¿entera?).',
      'Ejemplo: tres números consecutivos suman $54$: $x+(x+1)+(x+2)=54\\Rightarrow3x=51\\Rightarrow x=17$. Son $17,\\ 18,\\ 19$. En problemas de segundo grado hay que descartar la solución que no tiene sentido.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['consec', 'Números consecutivos'], ['edad', 'Edades'], ['rect', 'Rectángulo (perímetro)'], ['area', 'Rectángulo (área, segundo grado)']] }],
    generate(p) {
      if (p.tipo === 'consec') {
        const x = rnd.int(5, 40), n = rnd.pick([3, 4]), S = n * x + n * (n - 1) / 2;
        return { prompt: 'La suma de ' + n + ' números enteros consecutivos es ' + i$(S) + '. ¿Cuál es el menor de ellos?', answer: { kind: 'number', label: 'x=', value: F(x) },
          steps: ['Llamamos ' + i$('x') + ' al menor: ' + d$(Array.from({ length: n }, (_, k) => (k ? '(x+' + k + ')' : 'x')).join('+') + '=' + S), 'Reducimos: ' + i$(n + 'x+' + n * (n - 1) / 2 + '=' + S) + ', luego ' + i$(n + 'x=' + (S - n * (n - 1) / 2)) + ' y ' + i$('x=' + x) + '.'], mistakes: [], data: { x, n, S } };
      }
      if (p.tipo === 'edad') {
        const h = rnd.int(8, 16), k = rnd.pick([2, 3]), d = rnd.int(18, 32), m = k * h - (k - 1) * 0;
        const hij = h, madre = hij + d, x = (madre - k * hij) / (k - 1);
        if (!Number.isInteger(x) || x <= 0) return again('eso3-ec-problema', p);
        return { prompt: 'Una madre tiene ' + i$(madre) + ' años y su hijo ' + i$(hij) + '. ¿Dentro de cuántos años la edad de la madre será ' + (k === 2 ? 'el doble' : 'el triple') + ' que la del hijo?', answer: { kind: 'number', label: 'x=', value: F(x) },
          steps: ['Dentro de ' + i$('x') + ' años: ' + d$(madre + '+x=' + k + '(' + hij + '+x)'), 'Resolvemos: ' + i$(madre + '+x=' + k * hij + '+' + k + 'x') + ', luego ' + i$((madre - k * hij) + '=' + (k - 1) + 'x') + ' y ' + i$('x=' + x) + ' años.'], mistakes: [], data: { madre, hij, k, x } };
      }
      if (p.tipo === 'rect') {
        const w = rnd.int(4, 20), k = rnd.int(2, 9), P = 2 * (2 * w + k);
        return { prompt: 'Un rectángulo tiene ' + i$(P) + ' cm de perímetro y su largo mide ' + i$(k) + ' cm más que su ancho. ¿Cuánto mide el ancho?', answer: { kind: 'number', label: '\\text{ancho}=', value: F(w) },
          steps: ['Ancho ' + i$('x') + ', largo ' + i$('x+' + k) + ': ' + d$('2x+2(x+' + k + ')=' + P), 'Reducimos: ' + i$('4x+' + 2 * k + '=' + P) + ', luego ' + i$('x=' + w) + ' cm.'], mistakes: [], data: { w, k, P } };
      }
      const w = rnd.int(3, 15), k = rnd.int(2, 8), A = w * (w + k);
      return { prompt: 'Un rectángulo tiene ' + i$(A) + ' m² de área y su largo mide ' + i$(k) + ' m más que su ancho. ¿Cuánto mide el ancho?', answer: { kind: 'number', label: '\\text{ancho}=', value: F(w) },
        steps: ['Ancho ' + i$('x') + ': ' + d$('x(x+' + k + ')=' + A + '\\ \\Rightarrow\\ x^2+' + k + 'x-' + A + '=0'), 'Fórmula: ' + i$('x=\\frac{-' + k + '\\pm\\sqrt{' + (k * k + 4 * A) + '}}{2}=\\frac{-' + k + '\\pm' + (2 * w + k) + '}{2}') + ', es decir, ' + i$(w) + ' o ' + i$(-(w + k)) + '.', 'Una longitud no puede ser negativa: el ancho es ' + i$(w) + ' m.'], mistakes: [], data: { w, k, A } };
    },
  });

  /* ===================== Tema 7 ===================== */
  const sysTex = (e) => '\\begin{cases}' + e.map((q) => lin(q[0], 'x') + linY(q[1]) + '=' + q[2]).join('\\\\') + '\\end{cases}';
  function lin(a, v) { return a === 0 ? '' : a === 1 ? v : a === -1 ? '-' + v : a + v; }
  function linY(b) { return b === 0 ? '' : (b > 0 ? '+' : '-') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y'; }

  define({
    id: 'eso3-sis-resolver',
    title: 'Resolver un sistema 2×2',
    help: [
      '**Sustitución**: despejar una incógnita y sustituirla en la otra ecuación. **Igualación**: despejar la misma incógnita en las dos y igualar. **Reducción**: multiplicar para que una incógnita tenga coeficientes opuestos y sumar.',
      'Ejemplo: $\\begin{cases}x+y=7\\\\x-y=1\\end{cases}$. Sumando: $2x=8\\Rightarrow x=4$ y de la primera $y=3$. Comprueba siempre en las dos ecuaciones.',
    ],
    params: [{ key: 'met', label: 'Método sugerido', options: [['red', 'Reducción'], ['sus', 'Sustitución'], ['igu', 'Igualación']] }],
    generate(p) {
      for (;;) {
        const x0 = rnd.int(-5, 8), y0 = rnd.int(-5, 8);
        let a1, b1, a2, b2;
        if (p.met === 'red') { a1 = nz(1, 5); b1 = nz(-5, 5); a2 = nz(1, 5); b2 = nz(-5, 5); }
        else { a1 = 1; b1 = nz(-4, 4); a2 = nz(-4, 5); b2 = nz(-4, 5); }
        if (a1 * b2 - a2 * b1 === 0 || (p.met === 'igu' && (b1 === 0 || b2 === 0))) continue;
        const c1 = a1 * x0 + b1 * y0, c2 = a2 * x0 + b2 * y0;
        const e = [[a1, b1, c1], [a2, b2, c2]];
        const answer = { kind: 'multi', parts: [{ kind: 'number', label: 'x=', value: F(x0) }, { kind: 'number', label: 'y=', value: F(y0) }] };
        let steps;
        if (p.met === 'red') {
          const m1 = b2, m2 = -b1, g = gcd(m1, m2), k1 = m1 / g, k2 = m2 / g;
          steps = ['Para eliminar ' + i$('y') + ', multiplicamos la primera ecuación por ' + i$(k1) + ' y la segunda por ' + i$(k2) + ': ' + d$(sysTex([[a1 * k1, b1 * k1, c1 * k1], [a2 * k2, b2 * k2, c2 * k2]])),
            'Sumamos: ' + i$((a1 * k1 + a2 * k2) + 'x=' + (c1 * k1 + c2 * k2)) + ', luego ' + i$('x=' + x0) + '.', 'Sustituimos en la primera: ' + i$(sum([[a1, sg(x0)], [b1, 'y']]).replace(/^(-?)(\d+)\(/, '$1$2\\cdot(') + '=' + c1) + ', luego ' + i$('y=' + y0) + '.'];
        } else if (p.met === 'sus') {
          steps = ['De la primera despejamos ' + i$('x') + ': ' + i$('x=' + c1 + (-b1 >= 0 ? '+' : '') + (-b1) + 'y') + '.', 'Sustituimos en la segunda: ' + d$(a2 + '(' + c1 + (-b1 >= 0 ? '+' : '') + (-b1) + 'y)' + (b2 >= 0 ? '+' : '') + b2 + 'y=' + c2 + '\\ \\Rightarrow\\ ' + (b2 - a2 * b1) + 'y=' + (c2 - a2 * c1)),
            'Resulta ' + i$('y=' + y0) + ' y entonces ' + i$('x=' + c1 + (-b1 >= 0 ? '+' : '') + (-b1) + '\\cdot' + sg(y0) + '=' + x0) + '.'];
        } else {
          steps = ['Despejamos ' + i$('y') + ' en las dos: ' + d$('y=\\frac{' + c1 + '-' + sg(a1) + 'x}{' + b1 + '}\\qquad y=\\frac{' + c2 + '-' + sg(a2) + 'x}{' + b2 + '}'), 'Igualamos y resolvemos: ' + i$('x=' + x0) + ', y después ' + i$('y=' + y0) + '.'];
        }
        steps.push('Comprobación: ' + i$(a1 + '\\cdot' + sg(x0) + '+' + sg(b1) + '\\cdot' + sg(y0) + '=' + c1) + ' y ' + i$(a2 + '\\cdot' + sg(x0) + '+' + sg(b2) + '\\cdot' + sg(y0) + '=' + c2) + '.');
        return { prompt: 'Resuelve el sistema ' + d$(sysTex(e)), answer, steps, mistakes: [], data: { e, x0, y0 } };
      }
    },
  });

  define({
    id: 'eso3-sis-clasificar',
    title: 'Clasificar un sistema por sus rectas',
    help: [
      'Cada ecuación es una recta. Si se **cortan** en un punto: una solución. Si **coinciden**: infinitas soluciones. Si son **paralelas**: ninguna solución.',
      'Para $\\begin{cases}a_1x+b_1y=c_1\\\\a_2x+b_2y=c_2\\end{cases}$: si $\\frac{a_1}{a_2}\\neq\\frac{b_1}{b_2}$ se cortan; si $\\frac{a_1}{a_2}=\\frac{b_1}{b_2}=\\frac{c_1}{c_2}$ coinciden; si $\\frac{a_1}{a_2}=\\frac{b_1}{b_2}\\neq\\frac{c_1}{c_2}$ son paralelas.',
    ],
    generate() {
      const a1 = nz(1, 5), b1 = nz(-5, 5), c1 = rnd.int(-9, 9), k = rnd.pick([2, 3, -1, -2]);
      const tipo = rnd.pick([0, 1, 2]);
      let e;
      if (tipo === 0) { let a2, b2; do { a2 = nz(-5, 5); b2 = nz(-5, 5); } while (a1 * b2 === a2 * b1); e = [[a1, b1, c1], [a2, b2, rnd.int(-9, 9)]]; }
      else if (tipo === 1) e = [[a1, b1, c1], [k * a1, k * b1, k * c1]];
      else e = [[a1, b1, c1], [k * a1, k * b1, k * c1 + nz(-5, 5)]];
      const options = ['Una solución (rectas que se cortan)', 'Infinitas soluciones (rectas coincidentes)', 'Ninguna solución (rectas paralelas)'];
      const why = [
        'Los cocientes ' + i$('\\frac{' + e[0][0] + '}{' + e[1][0] + '}') + ' y ' + i$('\\frac{' + e[0][1] + '}{' + e[1][1] + '}') + ' son distintos: las rectas se cortan.',
        'La segunda ecuación es la primera multiplicada por ' + i$(k) + ': las rectas coinciden.',
        'La segunda tiene los coeficientes de la primera multiplicados por ' + i$(k) + ', pero el término independiente no: las rectas son paralelas.',
      ];
      return { prompt: 'Sin resolverlo, clasifica el sistema ' + d$(sysTex(e)), answer: { kind: 'choice', options, value: String(tipo) }, steps: [why[tipo]], mistakes: [], data: { e, tipo } };
    },
  });

  define({
    id: 'eso3-sis-problema',
    title: 'Problemas con sistemas',
    help: [
      'Elige **dos incógnitas**, escribe **dos ecuaciones** con los datos del enunciado y resuelve el sistema. Después comprueba que la solución cumple el enunciado.',
      'Ejemplo: $12$ entradas entre adultas ($5$ €) e infantiles ($3$ €) valen $44$ €: $a+n=12$ y $5a+3n=44$. De la primera $n=12-a$; $5a+36-3a=44\\Rightarrow a=4$, $n=8$.',
    ],
    params: [{ key: 'ctx', label: 'Situación', options: [['entradas', 'Entradas de dos precios'], ['animales', 'Cabezas y patas'], ['mezcla', 'Mezcla de dos productos'], ['suma', 'Dos números']] }],
    generate(p) {
      if (p.ctx === 'entradas') {
        const a = rnd.int(15, 80), n = rnd.int(15, 80), pa = rnd.int(6, 12), pn = rnd.int(3, pa - 1);
        return { prompt: 'En un concierto se vendieron ' + i$(a + n) + ' entradas, unas de adulto a ' + i$(pa) + ' € y otras infantiles a ' + i$(pn) + ' €. La recaudación fue de ' + i$(a * pa + n * pn) + ' €. ¿Cuántas entradas de cada tipo se vendieron?',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: '\\text{adulto}=', value: F(a) }, { kind: 'number', label: '\\text{infantil}=', value: F(n) }] },
          steps: ['Sean ' + i$('a') + ' y ' + i$('n') + ' las entradas de adulto e infantiles: ' + d$('\\begin{cases}a+n=' + (a + n) + '\\\\' + pa + 'a+' + pn + 'n=' + (a * pa + n * pn) + '\\end{cases}'), 'De la primera ' + i$('n=' + (a + n) + '-a') + '; sustituyendo: ' + i$((pa - pn) + 'a=' + (a * pa + n * pn - pn * (a + n))) + ', luego ' + i$('a=' + a) + ' y ' + i$('n=' + n) + '.'],
          mistakes: [], data: { ctx: 'entradas', a, n, pa, pn } };
      }
      if (p.ctx === 'animales') {
        const g = rnd.int(5, 30), c = rnd.int(5, 30);
        return { prompt: 'En una granja hay gallinas y conejos. Se cuentan ' + i$(g + c) + ' cabezas y ' + i$(2 * g + 4 * c) + ' patas. ¿Cuántas gallinas y cuántos conejos hay?',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: '\\text{gallinas}=', value: F(g) }, { kind: 'number', label: '\\text{conejos}=', value: F(c) }] },
          steps: ['Sistema: ' + d$('\\begin{cases}g+c=' + (g + c) + '\\\\2g+4c=' + (2 * g + 4 * c) + '\\end{cases}'), 'De la primera ' + i$('g=' + (g + c) + '-c') + '; sustituyendo: ' + i$((2 * (g + c)) + '+2c=' + (2 * g + 4 * c)) + ', luego ' + i$('c=' + c) + ' y ' + i$('g=' + g) + '.'],
          mistakes: [], data: { ctx: 'animales', g, c } };
      }
      if (p.ctx === 'mezcla') {
        const a = rnd.int(5, 25), b = rnd.int(5, 25), pa = rnd.int(3, 7), pb = rnd.int(pa + 1, 12);
        return { prompt: 'Se mezclan dos tipos de café, uno a ' + i$(pa) + ' €/kg y otro a ' + i$(pb) + ' €/kg, para obtener ' + i$(a + b) + ' kg de mezcla que cuestan en total ' + i$(a * pa + b * pb) + ' €. ¿Cuántos kg de cada tipo se mezclan?',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: '\\text{del barato}=', value: F(a) }, { kind: 'number', label: '\\text{del caro}=', value: F(b) }] },
          steps: ['Sistema: ' + d$('\\begin{cases}a+b=' + (a + b) + '\\\\' + pa + 'a+' + pb + 'b=' + (a * pa + b * pb) + '\\end{cases}'), 'De la primera ' + i$('a=' + (a + b) + '-b') + '; sustituyendo: ' + i$((pb - pa) + 'b=' + (a * pa + b * pb - pa * (a + b))) + ', luego ' + i$('b=' + b) + ' y ' + i$('a=' + a) + '.'],
          mistakes: [], data: { ctx: 'mezcla', a, b, pa, pb } };
      }
      const x = rnd.int(10, 40), y = rnd.int(3, x - 1);
      return { prompt: 'La suma de dos números es ' + i$(x + y) + ' y su diferencia es ' + i$(x - y) + '. ¿Cuáles son (primero el mayor)?',
        answer: { kind: 'multi', parts: [{ kind: 'number', label: '\\text{mayor}=', value: F(x) }, { kind: 'number', label: '\\text{menor}=', value: F(y) }] },
        steps: ['Sistema: ' + d$('\\begin{cases}x+y=' + (x + y) + '\\\\x-y=' + (x - y) + '\\end{cases}'), 'Sumando: ' + i$('2x=' + 2 * x) + ', luego ' + i$('x=' + x) + ' e ' + i$('y=' + y) + '.'], mistakes: [], data: { ctx: 'suma', x, y } };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
