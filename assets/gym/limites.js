/* Ejercicios interactivos — 2º Bachillerato, tema 6: Límites y continuidad. */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, ftex, d$, i$ } = G;
  const r = rnd.int, pick = rnd.pick;

  /* ---------- Utilidades ---------- */
  const nz = (a, b) => { let v; do v = r(a, b); while (v === 0); return v; };
  const sg = (k) => (k < 0 ? '-' : '+');
  const pa = (k) => (k < 0 ? '(' + k + ')' : String(k));
  const tail = (k) => (k ? sg(k) + Math.abs(k) : '');
  /** Polinomio con coeficientes en orden descendente → TeX. */
  function polyTex(c, v) {
    v = v || 'x';
    const n = c.length - 1; let s = '';
    c.forEach((k, i) => {
      const e = n - i;
      if (!k) return;
      const ab = Math.abs(k);
      const vv = e === 0 ? '' : e === 1 ? v : v + '^{' + e + '}';
      const term = e === 0 ? String(ab) : (ab === 1 ? '' : String(ab)) + vv;
      s += (k < 0 ? '-' : s ? '+' : '') + term;
    });
    return s || '0';
  }
  const pev = (c, x) => c.reduce((s, k) => s * x + k, 0);
  const pmul = (A, B) => { const R = Array(A.length + B.length - 1).fill(0); A.forEach((a, i) => B.forEach((b, j) => { R[i + j] += a * b; })); return R; };
  const fac = (a) => (a === 0 ? 'x' : '(x' + (a > 0 ? '-' + a : '+' + (-a)) + ')');
  const frac = (n, d) => '\\dfrac{' + n + '}{' + d + '}';
  const lim = (to, e) => '\\lim_{x\\to ' + to + '}' + e;
  const eqf = (n, d) => { const q = F(n, d); return frac(n, d) + (q.n === n && q.d === d ? '' : '=' + ftex(q)); };
  const cf = (x) => (x === 1 ? '' : x === -1 ? '-' : x === 0 ? '0\\cdot ' : x < 0 ? '(' + x + ')' : String(x));
  const INF = '+\\infty', NINF = '-\\infty';
  const isInf = (v) => v === Infinity || v === -Infinity;
  const infTex = (v) => (v === Infinity ? INF : v === -Infinity ? NINF : String(v));
  const xTo = (a) => String(a);
  const clamp = (k) => (Math.abs(k) === 1 ? (k < 0 ? '-' : '') : String(k));
  const fexp = (f) => (f.n === 0 ? '0' : 'e^(' + (f.d === 1 ? f.n : f.n + '/' + f.d) + ')');
  const etex = (f) => 'e^{' + ftex(f) + '}';

  /* ===================== 1. Límites en el infinito ===================== */
  G.define({
    id: 'lim-infinito',
    title: 'Límites en el infinito',
    help: [
      'En $x\\to\\pm\\infty$ manda el término de mayor grado. Cociente de polinomios $\\frac{P}{Q}$ con grados $n$ y $m$: si $n<m$ el límite es $0$; si $n=m$ es el cociente de coeficientes principales; si $n>m$ es $\\pm\\infty$ (el signo sale de $\\frac{a}{b}x^{n-m}$). Orden de infinitos: $\\ln x\\ll x^n\\ll a^x$ ($a>1$). Con raíces, $\\sqrt{x^2}=|x|$, que vale $-x$ si $x\\to-\\infty$.',
      'Ejemplo: $\\displaystyle\\lim_{x\\to-\\infty}\\frac{\\sqrt{4x^2+1}}{x+7}$. La raíz se comporta como $\\sqrt{4x^2}=2|x|=-2x$. Entonces el cociente tiende a $\\frac{-2x}{x}=-2$. Otro: $\\displaystyle\\lim_{x\\to+\\infty}\\frac{x^3}{2x^2+1}$: $n=3>m=2$, y $\\frac12x\\to+\\infty$.',
    ],
    params: [
      { key: 'tipo', label: 'Tipo', options: [['rac', 'Cociente de polinomios'], ['raiz', 'Con raíz cuadrada'], ['orden', 'Órdenes de infinito']] },
      { key: 'sentido', label: 'Sentido', options: [['mas', 'x → +∞'], ['menos', 'x → −∞']] },
    ],
    generate(p) {
      const sx = p.sentido === 'menos' ? -1 : 1;
      const to = sx > 0 ? INF : NINF;
      if (p.tipo === 'raiz') {
        const m = r(1, 4), b = nz(-3, 3), c = r(-5, 5), pp = r(-6, 6), q = r(1, 9);
        const val = F(sx * m, b);
        const rad = polyTex([m * m, pp, q]);
        const den = polyTex([b, c]);
        return {
          prompt: 'Calcula ' + i$(lim(to, frac('\\sqrt{' + rad + '}', den))) + '.',
          answer: { kind: 'number', label: 'L=', value: val },
          steps: [
            'Para $|x|$ grande la raíz se comporta como ' + i$('\\sqrt{' + (m * m) + 'x^2}=' + m + '|x|') + '.',
            sx > 0 ? 'Con $x\\to+\\infty$, $|x|=x$: ' + d$(frac(m + 'x', clamp(b) + 'x') + '=' + ftex(F(m, b))) : 'Con $x\\to-\\infty$, $|x|=-x$: ' + d$(frac('-' + m + 'x', clamp(b) + 'x') + '=' + ftex(val)),
          ],
          mistakes: [{ value: F(-sx * m, b), msg: 'cuidado con el signo: $\\sqrt{x^2}=|x|$, que es $x$ si $x\\to+\\infty$ y $-x$ si $x\\to-\\infty$.' }, { value: F(m * m, b), msg: 'la raíz del coeficiente $' + (m * m) + '$ es $' + m + '$, no $' + (m * m) + '$.' }],
          data: { f: (x) => Math.sqrt(m * m * x * x + pp * x + q) / (b * x + c), sx, val: sx * m / b, tipo: 'raiz' },
        };
      }
      if (p.tipo === 'orden') {
        const kind = r(0, 5), n = r(2, 4), a = r(1, 3), b2 = pick([2, 3]);
        const xn = n === 1 ? 'x' : 'x^{' + n + '}';
        let tex, f, val, big, expl;
        if (kind === 0) { tex = frac(xn, 'e^{' + clamp(a) + 'x}'); f = (x) => Math.pow(x, n) / Math.exp(a * x); val = 0; big = 200; expl = 'la exponencial $e^{' + clamp(a) + 'x}$ crece más deprisa que cualquier potencia.'; }
        else if (kind === 1) { tex = frac('e^{' + clamp(a) + 'x}', xn); f = (x) => Math.exp(a * x) / Math.pow(x, n); val = Infinity; big = 200; expl = 'la exponencial gana a la potencia.'; }
        else if (kind === 2) { tex = frac('\\ln x', xn); f = (x) => Math.log(x) / Math.pow(x, n); val = 0; big = 1e12; expl = 'cualquier potencia gana al logaritmo.'; }
        else if (kind === 3) { tex = frac(xn, '\\ln x'); f = (x) => Math.pow(x, n) / Math.log(x); val = Infinity; big = 1e12; expl = 'la potencia gana al logaritmo.'; }
        else if (kind === 4) { tex = frac(b2 + '^{x}', xn); f = (x) => Math.pow(b2, x) / Math.pow(x, n); val = Infinity; big = 300; expl = 'una exponencial de base $' + b2 + '>1$ gana a cualquier potencia.'; }
        else { tex = frac(xn, b2 + '^{x}'); f = (x) => Math.pow(x, n) / Math.pow(b2, x); val = 0; big = 300; expl = 'la exponencial de base $' + b2 + '>1$ gana a la potencia.'; }
        const opts = [0, Infinity, 1];
        return {
          prompt: 'Calcula ' + i$(lim(INF, tex)) + '.',
          answer: { kind: 'choice', options: ['$0$', '$+\\infty$', '$1$'], value: val === 0 ? 0 : 1 },
          steps: ['Orden de infinitos: ' + i$('\\ln x\\ll x^n\\ll a^x') + ' para $a>1$.', 'Aquí ' + expl, 'Por tanto el límite es ' + i$(infTex(val)) + '.'],
          mistakes: [{ value: val === 0 ? 1 : 0, msg: val === 0 ? 'el numerador no gana: el denominador crece mucho más deprisa y el cociente se va a $0$.' : 'el numerador crece mucho más deprisa que el denominador: el cociente se va a $+\\infty$.' }],
          data: { f, big, val, opts, tipo: 'orden' },
        };
      }
      // racional
      const caso = pick(['menor', 'igual', 'mayor']);
      const dd = r(1, 3);
      const dn = caso === 'menor' ? r(0, dd - 1) : caso === 'igual' ? dd : dd + r(1, 2);
      const mk = (n, L) => { const c = [nz(-L, L)]; for (let i = 0; i < n; i++) c.push(r(-L, L)); return c; };
      const N = mk(dn, 5), D = mk(dd, 4);
      const a = N[0], b = D[0];
      let val;
      if (caso === 'menor') val = 0;
      else if (caso === 'igual') val = a / b;
      else val = Math.sign(a * b) * (sx > 0 || (dn - dd) % 2 === 0 ? 1 : -1) * Infinity;
      const ratio = a / b;
      const opts = rnd.shuffle([{ tex: '$0$', v: 0 }, { tex: '$+\\infty$', v: Infinity }, { tex: '$-\\infty$', v: -Infinity }, { tex: i$(ftex(F(a, b))), v: ratio }]);
      const idx = opts.findIndex((o) => (isInf(val) || val === 0 ? o.v === val : Math.abs(o.v - val) < 1e-12));
      const mist = opts.map((o, i) => ({ o, i })).filter((t) => t.i !== idx).map((t) => {
        let msg;
        if (t.o.v === 0) msg = 'el límite sólo es $0$ cuando el grado del denominador es mayor que el del numerador.';
        else if (!isInf(t.o.v)) msg = 'el cociente de coeficientes principales sólo es el límite cuando los grados coinciden.';
        else if (isInf(val)) msg = 'revisa el signo: $\\frac{a}{b}x^{n-m}$ cambia de signo con $x\\to-\\infty$ si $n-m$ es impar.';
        else msg = 'sólo es infinito cuando el grado del numerador es mayor que el del denominador.';
        return { value: t.i, msg };
      });
      const lead = (c, k) => (c[0] === 1 ? '' : c[0] === -1 ? '-' : String(c[0])) + (k === 0 ? (Math.abs(c[0]) === 1 ? '1' : '') : k === 1 ? 'x' : 'x^{' + k + '}');
      const st = ['Grados: numerador $n=' + dn + '$, denominador $m=' + dd + '$. Términos principales: ' + d$(frac(lead(N, dn), lead(D, dd)))];
      if (caso === 'menor') st.push('Como $n<m$, el denominador crece más deprisa: el límite es $0$.');
      else if (caso === 'igual') st.push('Como $n=m$, el límite es el cociente de coeficientes principales: ' + d$(frac(a, b) + '=' + ftex(F(a, b))));
      else st.push('Como $n>m$, el límite es infinito. El signo sale de ' + i$(ftex(F(a, b)) + (dn - dd === 1 ? 'x' : 'x^{' + (dn - dd) + '}')) + ' con $x\\to' + (sx > 0 ? '+' : '-') + '\\infty$: ' + i$(infTex(val)) + '.');
      return {
        prompt: 'Calcula ' + i$(lim(to, frac(polyTex(N), polyTex(D)))) + '.',
        answer: { kind: 'choice', options: opts.map((o) => o.tex), value: idx },
        steps: st,
        mistakes: mist,
        data: { f: (x) => pev(N, x) / pev(D, x), sx, val, opts: opts.map((o) => o.v), tipo: 'rac' },
      };
    },
  });

  /* ===================== 2. Límites en un punto ===================== */
  G.define({
    id: 'lim-punto',
    title: 'Límites en un punto',
    help: [
      'Si al sustituir sale $\\frac{0}{0}$ en un cociente de polinomios, se factoriza y se simplifica el factor común $(x-a)$. Si hay raíces, se multiplica y divide por el conjugado: $(\\sqrt{A}-s)(\\sqrt{A}+s)=A-s^2$. Si sale $\\frac{k}{0}$ con $k\\neq0$, el límite es infinito y su signo se estudia por cada lado: $(x-a)$ es positivo a la derecha y negativo a la izquierda.',
      'Ejemplo: $\\displaystyle\\lim_{x\\to1}\\frac{x^2-1}{x^2-3x+2}=\\lim\\frac{(x-1)(x+1)}{(x-1)(x-2)}=\\frac{2}{-1}=-2$. Otro: $\\displaystyle\\lim_{x\\to3^-}\\frac{5}{x-3}$: el numerador es $5>0$ y $x-3<0$, luego es $-\\infty$.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['fact', 'Factorizar (0/0)'], ['conj', 'Conjugado (0/0)'], ['lat', 'k/0 con signo']] }],
    generate(p) {
      if (p.tipo === 'conj') {
        const s = r(1, 4), a = r(-3, 5), k = r(1, 3), c = s * s - k * a;
        const rad = polyTex([k, c]);
        const sq = '\\sqrt{' + rad + '}';
        const inv = rnd.float() < 0.4;
        const den = polyTex([1, -a]);
        const val = inv ? F(2 * s, k) : F(k, 2 * s);
        const f = inv ? (x) => (x - a) / (Math.sqrt(k * x + c) - s) : (x) => (Math.sqrt(k * x + c) - s) / (x - a);
        const st = ['Al sustituir $x=' + a + '$ sale $\\frac00$. Multiplicamos por el conjugado ' + i$(sq + '+' + s) + ': ' + d$('(' + sq + '-' + s + ')(' + sq + '+' + s + ')=' + rad + '-' + (s * s) + '=' + (k === 1 ? '' : k) + fac(a))];
        if (!inv) st.push('Simplificamos: ' + d$(frac(k + fac(a), fac(a) + '(' + sq + '+' + s + ')') + '=' + frac(k, sq + '+' + s) + '\\to' + frac(k, s + '+' + s) + '=' + ftex(val)));
        else st.push('Simplificamos: ' + d$(frac(fac(a) + '(' + sq + '+' + s + ')', k + fac(a)) + '=' + frac(sq + '+' + s, k) + '\\to' + frac(s + '+' + s, k) + '=' + ftex(val)));
        return {
          prompt: 'Calcula ' + i$(lim(xTo(a), inv ? frac(polyTex([1, -a]), sq + '-' + s) : frac(sq + '-' + s, polyTex([1, -a])))) + '.',
          answer: { kind: 'number', label: 'L=', value: val },
          steps: st,
          mistakes: [{ value: inv ? F(s, k) : F(k, s), msg: 'al sumar $' + s + '+' + s + '$ del conjugado sale $' + (2 * s) + '$, no $' + s + '$.' }],
          data: { f, a, val: val.n / val.d, tipo: 'conj' },
        };
      }
      if (p.tipo === 'lat') {
        const a = r(-4, 4), m = r(1, 3), pp = nz(-3, 3), v = nz(-5, 5), q = v - pp * a, side = pick([1, -1]);
        const sign = Math.sign(v) * (side > 0 ? 1 : (m % 2 === 0 ? 1 : -1));
        const den = m === 1 ? polyTex([1, -a]) : '(' + polyTex([1, -a]) + ')^{' + m + '}';
        const tg = a + '^{' + (side > 0 ? '+' : '-') + '}';
        return {
          prompt: 'Calcula ' + i$(lim(tg, frac(polyTex([pp, q]), den))) + '.',
          answer: { kind: 'choice', options: ['$+\\infty$', '$-\\infty$'], value: sign > 0 ? 0 : 1 },
          steps: [
            'Sustituyendo, el numerador vale ' + i$(pp + '\\cdot' + pa(a) + tail(q) + '=' + v) + ', que es ' + (v > 0 ? 'positivo' : 'negativo') + ', y el denominador tiende a $0$: el límite es infinito.',
            'Signo del denominador para $x\\to' + tg + '$: ' + i$('x-' + pa(a) + (side > 0 ? '>0' : '<0')) + (m > 1 ? ', elevado a $' + m + '$ queda ' + (side > 0 || m % 2 === 0 ? 'positivo' : 'negativo') : '') + '.',
            'Signo del cociente: ' + (sign > 0 ? 'positivo, luego $+\\infty$.' : 'negativo, luego $-\\infty$.'),
          ],
          mistakes: [{ value: sign > 0 ? 1 : 0, msg: 'estudia el signo de cada factor: el del numerador en $x=' + a + '$ y el del denominador a ese lado de $' + a + '$.' }],
          data: { f: (x) => (pp * x + q) / Math.pow(x - a, m), a, side, sign, tipo: 'lat' },
        };
      }
      // factorizar
      const a = r(-4, 4);
      let pr, qq, rr;
      do { pr = r(-4, 4); } while (pr === a);
      do { qq = r(-4, 4); } while (qq === a);
      const tres = rnd.float() < 0.4;
      do { rr = r(-4, 4); } while (rr === a);
      const Nf = tres ? pmul(pmul([1, -a], [1, -pr]), [1, -rr]) : pmul([1, -a], [1, -pr]);
      const Df = pmul([1, -a], [1, -qq]);
      const val = F((a - pr) * (tres ? a - rr : 1), a - qq);
      const nfac = fac(a) + fac(pr) + (tres ? fac(rr) : ''), dfac = fac(a) + fac(qq);
      const left = fac(pr) + (tres ? fac(rr) : '');
      return {
        prompt: 'Calcula ' + i$(lim(xTo(a), frac(polyTex(Nf), polyTex(Df)))) + '.',
        answer: { kind: 'number', label: 'L=', value: val },
        steps: [
          'Al sustituir $x=' + a + '$ sale $\\frac00$: ambos polinomios tienen la raíz $' + a + '$, es decir, el factor ' + i$(fac(a)) + '.',
          'Factorizamos: ' + d$(frac(nfac, dfac) + '=' + frac(left, fac(qq))),
          'Sustituimos $x=' + a + '$: ' + d$(frac([a - pr].concat(tres ? [a - rr] : []).map(pa).join('\\cdot '), pa(a - qq)) + '=' + ftex(val)),
        ],
        mistakes: [{ value: F(-val.n, val.d), msg: 'revisa los signos al sustituir en los factores $(x-\\text{raíz})$.' }],
        data: { f: (x) => pev(Nf, x) / pev(Df, x), a, val: val.n / val.d, tipo: 'fact' },
      };
    },
  });

  /* ===================== 3. Indeterminación ∞ − ∞ ===================== */
  G.define({
    id: 'lim-infmenosinf',
    title: 'Indeterminación ∞ − ∞',
    help: [
      'Para $\\infty-\\infty$ con raíces se multiplica y divide por el conjugado: $\\sqrt{A}-\\sqrt{B}=\\frac{A-B}{\\sqrt{A}+\\sqrt{B}}$. Después se divide numerador y denominador entre la mayor potencia de $x$. Con fracciones algebraicas, se hace la resta como una sola fracción y se comparan grados.',
      'Ejemplo: $\\displaystyle\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+6x}-x\\right)=\\lim\\frac{6x}{\\sqrt{x^2+6x}+x}=\\lim\\frac{6}{\\sqrt{1+6/x}+1}=\\frac{6}{2}=3$.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['raizx', 'Raíz menos x'], ['raices', 'Dos raíces'], ['frac', 'Fracción menos polinomio']] }],
    generate(p) {
      if (p.tipo === 'frac') {
        const a = nz(-4, 5), b = r(-4, 5);
        const val = F(-(a + b));
        return {
          prompt: 'Calcula ' + i$(lim(INF, '\\left(' + frac('x^2', polyTex([1, a])) + '-(' + polyTex([1, b]) + ')\\right)')) + '.',
          answer: { kind: 'number', label: 'L=', value: val },
          steps: [
            'Restamos con denominador común: ' + d$(frac('x^2-(' + polyTex([1, b]) + ')(' + polyTex([1, a]) + ')', polyTex([1, a])) + '=' + frac(polyTex([-(a + b), -a * b]), polyTex([1, a]))),
            'Mismo grado en numerador y denominador: el límite es el cociente de los coeficientes principales, ' + i$(frac(-(a + b), 1) + '=' + (-(a + b))) + '.',
          ],
          mistakes: [{ value: F(0), msg: '$\\infty-\\infty$ no vale $0$ automáticamente: hay que operar antes de tomar el límite.' }, { value: F(a + b), msg: 'revisa el signo: el numerador es $x^2-(x+b)(x+a)$.' }],
          data: { f: (x) => (x * x) / (x + a) - (x + b), val: val.n / val.d, xe: 1e7, tipo: 'frac' },
        };
      }
      const m = r(1, 3), q = r(-5, 5);
      if (p.tipo === 'raices') {
        let pp, rr, ss;
        do { pp = r(-8, 8); rr = r(-8, 8); } while (pp === rr);
        ss = r(-5, 5);
        const val = F(pp - rr, 2 * m);
        const A = polyTex([m * m, pp, q]), B = polyTex([m * m, rr, ss]);
        return {
          prompt: 'Calcula ' + i$(lim(INF, '\\left(\\sqrt{' + A + '}-\\sqrt{' + B + '}\\right)')) + '.',
          answer: { kind: 'number', label: 'L=', value: val },
          steps: [
            'Multiplicamos y dividimos por el conjugado: ' + d$(frac('(' + A + ')-(' + B + ')', '\\sqrt{' + A + '}+\\sqrt{' + B + '}') + '=' + frac(polyTex([pp - rr, q - ss]), '\\sqrt{' + A + '}+\\sqrt{' + B + '}')),
            'Dividimos entre $x$: arriba queda ' + i$(pp - rr) + ' y abajo ' + i$(m + '+' + m) + '. Límite: ' + i$(eqf(pp - rr, 2 * m)) + '.',
          ],
          mistakes: [{ value: F(pp - rr, m), msg: 'abajo hay dos raíces que valen $' + m + 'x$ cada una: el denominador es $' + (2 * m) + '$.' }, { value: F(0), msg: '$\\infty-\\infty$ no es $0$: hay que usar el conjugado.' }],
          data: { f: (x) => Math.sqrt(m * m * x * x + pp * x + q) - Math.sqrt(m * m * x * x + rr * x + ss), val: val.n / val.d, xe: 1e7, tipo: 'raices' },
        };
      }
      let pp; do { pp = r(-8, 8); } while (pp === 0);
      const val = F(pp, 2 * m);
      const A = polyTex([m * m, pp, q]);
      return {
        prompt: 'Calcula ' + i$(lim(INF, '\\left(\\sqrt{' + A + '}-' + polyTex([m, 0]) + '\\right)')) + '.',
        answer: { kind: 'number', label: 'L=', value: val },
        steps: [
          'Multiplicamos y dividimos por el conjugado: ' + d$(frac('(' + A + ')-' + (m * m) + 'x^2', '\\sqrt{' + A + '}+' + polyTex([m, 0])) + '=' + frac(polyTex([pp, q]), '\\sqrt{' + A + '}+' + polyTex([m, 0]))),
          'Dividimos entre $x$: arriba ' + i$(pp) + ' y abajo ' + i$(m + '+' + m) + '. Límite: ' + i$(eqf(pp, 2 * m)) + '.',
        ],
        mistakes: [{ value: F(pp, m), msg: 'el denominador vale $' + m + '+' + m + '=' + (2 * m) + '$ (la raíz y el término $' + polyTex([m, 0]) + '$ aportan lo mismo).' }, { value: F(0), msg: '$\\infty-\\infty$ no es $0$: hay que usar el conjugado.' }],
        data: { f: (x) => Math.sqrt(m * m * x * x + pp * x + q) - m * x, val: val.n / val.d, xe: 1e7, tipo: 'raizx' },
      };
    },
  });

  /* ===================== 4. Indeterminación 1^∞ ===================== */
  G.define({
    id: 'lim-uno-infinito',
    title: 'Indeterminación 1^∞ (número e)',
    help: [
      'Si $f\\to1$ y $g\\to\\infty$, entonces $\\displaystyle\\lim f^{\\,g}=e^{\\lim g\\,(f-1)}$. Se calcula el límite del exponente $g\\,(f-1)$, que suele ser un cociente de polinomios. Caso base: $\\left(1+\\frac1x\\right)^x\\to e$.',
      'Ejemplo: $\\displaystyle\\lim_{x\\to\\infty}\\left(\\frac{x+3}{x+1}\\right)^{2x}$. Aquí $f-1=\\frac{2}{x+1}$ y $g\\,(f-1)=\\frac{4x}{x+1}\\to4$. El límite es $e^4$.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['clas', 'Cociente lineal en el infinito'], ['cuad', 'Cociente cuadrático'], ['cero', 'En x → 0']] }],
    generate(p) {
      let prompt, f, rex, st, xe, tipo = p.tipo;
      if (tipo === 'cuad') {
        let pp, qq; do { pp = r(-4, 4); qq = r(-4, 4); } while (pp === qq);
        const r0 = r(-3, 3), s0 = r(1, 4), k = nz(-3, 3);
        rex = F(k * (pp - qq));
        prompt = lim(INF, '\\left(' + frac(polyTex([1, pp, r0]), polyTex([1, qq, s0])) + '\\right)^{' + polyTex([k, 0]) + '}');
        f = (x) => Math.pow((x * x + pp * x + r0) / (x * x + qq * x + s0), k * x);
        xe = 1e6;
        st = ['La base tiende a $1$ y el exponente a $\\infty$: es $1^\\infty$. Usamos $e^{\\lim g(f-1)}$.',
          'Con ' + i$('f-1=' + frac(polyTex([pp - qq, r0 - s0]), polyTex([1, qq, s0]))) + ': ' + d$('\\lim ' + polyTex([k, 0]) + '\\cdot ' + frac(polyTex([pp - qq, r0 - s0]), polyTex([1, qq, s0])) + '=' + ftex(rex)),
          'El límite es ' + i$(etex(rex)) + '.'];
      } else if (tipo === 'cero') {
        if (rnd.float() < 0.35) {
          const a = r(1, 2);
          rex = F(-a * a, 2);
          prompt = lim('0', '(\\cos ' + polyTex([a, 0]) + ')^{1/x^2}');
          f = (x) => Math.pow(Math.cos(a * x), 1 / (x * x));
          xe = 1e-2;
          st = ['La base $\\cos(' + polyTex([a, 0]) + ')\\to1$ y el exponente $\\frac1{x^2}\\to\\infty$: es $1^\\infty$.',
            'Exponente: ' + d$('\\lim\\frac{\\cos ' + polyTex([a, 0]) + '-1}{x^2}=\\lim\\frac{-' + clamp(a) + '^2x^2/2}{x^2}=' + ftex(rex)) + '(usando $1-\\cos u\\sim u^2/2$).',
            'El límite es ' + i$(etex(rex)) + '.'];
        } else {
          const pp = nz(-3, 3), k = nz(-3, 3);
          rex = F(pp * k);
          prompt = lim('0', '(1+' + polyTex([pp, 0]) + ')^{' + frac(k, 'x') + '}');
          f = (x) => Math.pow(1 + pp * x, k / x);
          xe = 1e-6;
          st = ['La base tiende a $1$ y el exponente $\\frac{' + k + '}{x}\\to\\infty$: es $1^\\infty$.',
            'Exponente: ' + d$('\\lim\\frac{' + k + '}{x}\\cdot ' + polyTex([pp, 0]) + '=' + (pp * k)),
            'El límite es ' + i$(etex(rex)) + '.'];
        }
      } else {
        const a = r(1, 3), k = nz(-3, 4); let pp, qq; do { pp = r(-4, 4); qq = r(-4, 4); } while (pp === qq);
        rex = F(k * (pp - qq), a);
        prompt = lim(INF, '\\left(' + frac(polyTex([a, pp]), polyTex([a, qq])) + '\\right)^{' + polyTex([k, 0]) + '}');
        f = (x) => Math.pow((a * x + pp) / (a * x + qq), k * x);
        xe = 1e6;
        st = ['La base tiende a $1$ y el exponente a $\\infty$: es $1^\\infty$. Usamos $e^{\\lim g(f-1)}$.',
          'Con ' + i$('f-1=' + frac(pp - qq, polyTex([a, qq]))) + ': ' + d$('\\lim ' + polyTex([k, 0]) + '\\cdot ' + frac(pp - qq, polyTex([a, qq])) + '=' + frac(k * (pp - qq), a) + '=' + ftex(rex)),
          'El límite es ' + i$(etex(rex)) + '.'];
      }
      const val = Math.exp(rex.n / rex.d);
      return {
        prompt: 'Calcula ' + i$(prompt) + '. <small>(escribe, p. ej., <code>e^2</code> o <code>e^(-1/2)</code>)</small>',
        answer: { kind: 'expr', label: 'L=', value: val, show: fexp(rex) },
        steps: st,
        mistakes: [{ value: 1, msg: '$1^\\infty$ es una indeterminación: no vale $1$. Hay que calcular el límite del exponente.' }, { value: Math.exp(-rex.n / rex.d), msg: 'revisa el signo del exponente $\\lim g\\,(f-1)$.' }],
        data: { f, xe, rex: rex.n / rex.d, tipo },
      };
    },
  });

  /* ===================== 5. L'Hôpital ===================== */
  G.define({
    id: 'lim-hopital',
    title: "Regla de L'Hôpital",
    help: [
      "Si $\\frac{f}{g}$ da $\\frac00$ o $\\frac\\infty\\infty$ y existe $\\lim\\frac{f'}{g'}$, entonces $\\lim\\frac{f}{g}=\\lim\\frac{f'}{g'}$. Se deriva numerador y denominador por separado (no es la derivada del cociente). Si sigue la indeterminación, se repite. Una forma $0\\cdot\\infty$ se escribe como cociente, por ejemplo con $t=\\frac1x$.",
      "Ejemplo: $\\displaystyle\\lim_{x\\to0}\\frac{e^{x}-1-x}{x^2}\\overset{0/0}{=}\\lim\\frac{e^x-1}{2x}\\overset{0/0}{=}\\lim\\frac{e^x}{2}=\\frac12$.",
    ],
    params: [{ key: 'nivel', label: 'Tipo', options: [['una', 'Una aplicación'], ['dos', 'Repetida'], ['inf', '0·∞ en el infinito']] }],
    generate(p) {
      const a = r(1, 3), b = r(1, 4);
      const ax = polyTex([a, 0]), bx = polyTex([b, 0]);
      const apps = (...lines) => lines;
      let T;
      if (p.nivel === 'una') {
        const k = r(0, 4);
        if (k === 0) T = { tex: frac('\\operatorname{sen}(' + ax + ')', bx), f: (x) => Math.sin(a * x) / (b * x), val: F(a, b), st: apps('Sale $\\frac00$. Derivamos arriba y abajo: ' + d$(frac(a + '\\cos(' + ax + ')', b)), 'En $x=0$: ' + i$(frac(a, b) + '=' + ftex(F(a, b))) + '.') };
        else if (k === 1) T = { tex: frac('e^{' + ax + '}-1', bx), f: (x) => (Math.exp(a * x) - 1) / (b * x), val: F(a, b), st: apps('Sale $\\frac00$. Derivamos arriba y abajo: ' + d$(frac(a + 'e^{' + ax + '}', b)), 'En $x=0$: ' + i$(frac(a, b) + '=' + ftex(F(a, b))) + '.') };
        else if (k === 2) T = { tex: frac('\\ln(1+' + ax + ')', bx), f: (x) => Math.log(1 + a * x) / (b * x), val: F(a, b), st: apps('Sale $\\frac00$. Derivamos arriba y abajo: ' + d$(frac(frac(a, '1+' + ax), b)), 'En $x=0$: ' + i$(frac(a, b) + '=' + ftex(F(a, b))) + '.') };
        else if (k === 3) T = { tex: frac('\\operatorname{arctg}(' + ax + ')', bx), f: (x) => Math.atan(a * x) / (b * x), val: F(a, b), st: apps('Sale $\\frac00$. Derivamos arriba y abajo: ' + d$(frac(frac(a, '1+' + (a * a) + 'x^2'), b)), 'En $x=0$: ' + i$(frac(a, b) + '=' + ftex(F(a, b))) + '.') };
        else {
          let c = a; while (c === b) c = r(1, 4);
          T = { tex: frac('e^{' + ax + '}-e^{' + bx + '}', 'x'), f: (x) => (Math.exp(a * x) - Math.exp(c * x)) / x, val: F(a - c), st: null };
          const cx = polyTex([c, 0]);
          T.tex = frac('e^{' + ax + '}-e^{' + cx + '}', 'x');
          T.st = apps('Sale $\\frac00$. Derivamos arriba y abajo: ' + d$(frac(a + 'e^{' + ax + '}-' + c + 'e^{' + cx + '}', '1')), 'En $x=0$: ' + i$(a + '-' + c + '=' + (a - c)) + '.');
        }
        T.xe = 1e-5;
      } else if (p.nivel === 'dos') {
        const k = r(0, 3);
        if (k === 0) T = { tex: frac('1-\\cos(' + ax + ')', clamp(b) + 'x^2'), f: (x) => (1 - Math.cos(a * x)) / (b * x * x), val: F(a * a, 2 * b), st: apps('Sale $\\frac00$. Derivamos: ' + d$(frac(a + '\\operatorname{sen}(' + ax + ')', 2 * b + 'x')) + 'Sigue saliendo $\\frac00$. Derivamos otra vez: ' + d$(frac(a * a + '\\cos(' + ax + ')', 2 * b)), 'En $x=0$: ' + i$(ftex(F(a * a, 2 * b))) + '.') };
        else if (k === 1) T = { tex: frac('e^{' + ax + '}-1-' + ax, clamp(b) + 'x^2'), f: (x) => (Math.exp(a * x) - 1 - a * x) / (b * x * x), val: F(a * a, 2 * b), st: apps('Sale $\\frac00$. Derivamos: ' + d$(frac(a + 'e^{' + ax + '}-' + a, 2 * b + 'x')) + 'Sigue saliendo $\\frac00$. Derivamos otra vez: ' + d$(frac(a * a + 'e^{' + ax + '}', 2 * b)), 'En $x=0$: ' + i$(ftex(F(a * a, 2 * b))) + '.') };
        else if (k === 2) T = { tex: frac(ax + '-\\operatorname{sen}(' + ax + ')', 'x^3'), f: (x) => (a * x - Math.sin(a * x)) / (x * x * x), val: F(a * a * a, 6), st: apps('Sale $\\frac00$. Derivamos: ' + d$(frac(a + '-' + a + '\\cos(' + ax + ')', '3x^2')) + 'Sigue $\\frac00$. Derivamos: ' + d$(frac(a * a + '\\operatorname{sen}(' + ax + ')', '6x')) + 'Sigue $\\frac00$. Derivamos: ' + d$(frac(a * a * a + '\\cos(' + ax + ')', '6')), 'En $x=0$: ' + i$(ftex(F(a * a * a, 6))) + '.') };
        else T = { tex: frac('x-\\ln(1+x)', clamp(b) + 'x^2'), f: (x) => (x - Math.log(1 + x)) / (b * x * x), val: F(1, 2 * b), st: apps('Sale $\\frac00$. Derivamos: ' + d$(frac('1-\\frac{1}{1+x}', 2 * b + 'x') + '=' + frac('\\frac{x}{1+x}', 2 * b + 'x') + '=' + frac('1', 2 * b + '(1+x)')), 'En $x=0$: ' + i$(ftex(F(1, 2 * b))) + '.') };
        T.xe = 1e-3;
      } else {
        const k = r(0, 2);
        const tex0 = k === 0 ? bx + '\\,\\operatorname{sen}\\dfrac{' + a + '}{x}' : k === 1 ? bx + '\\left(e^{' + a + '/x}-1\\right)' : bx + '\\ln\\left(1+\\dfrac{' + a + '}{x}\\right)';
        const g = k === 0 ? (t) => Math.sin(a * t) : k === 1 ? (t) => Math.exp(a * t) - 1 : (t) => Math.log(1 + a * t);
        const dnum = k === 0 ? a + '\\cos(' + ax.replace(/x/, 't') + ')' : k === 1 ? a + 'e^{' + ax.replace(/x/, 't') + '}' : frac(a, '1+' + ax.replace(/x/, 't'));
        const gt = k === 0 ? '\\operatorname{sen}(' + ax.replace(/x/, 't') + ')' : k === 1 ? 'e^{' + ax.replace(/x/, 't') + '}-1' : '\\ln(1+' + ax.replace(/x/, 't') + ')';
        T = {
          tex: tex0, f: (x) => b * x * g(1 / x), val: F(a * b), xe: 1e6,
          st: apps('Es $\\infty\\cdot0$. Con $t=\\frac1x$ ($t\\to0^+$): ' + d$(b + '\\cdot ' + frac(gt, 't')) + 'Sale $\\frac00$. Derivamos: ' + d$(b + '\\cdot ' + frac(dnum, '1')), 'En $t=0$: ' + i$(b + '\\cdot' + a + '=' + (a * b)) + '.'),
        };
      }
      return {
        prompt: 'Calcula ' + i$(lim(p.nivel === 'inf' ? INF : '0', T.tex)) + '.',
        answer: { kind: 'number', label: 'L=', value: T.val },
        steps: T.st,
        mistakes: [{ value: F(-T.val.n, T.val.d), msg: 'revisa el signo al derivar.' }, { value: F(1), msg: 'no se puede aplicar un «límite notable» sin los coeficientes: deriva numerador y denominador.' }],
        data: { f: T.f, val: T.val.n / T.val.d, xe: T.xe, nivel: p.nivel },
      };
    },
  });

  /* ===================== 6. Continuidad con parámetros ===================== */
  const cases = (rows) => '\\begin{cases}' + rows.map((r0) => r0[0] + '&' + r0[1]).join('\\\\') + '\\end{cases}';
  G.define({
    id: 'lim-continuidad',
    title: 'Continuidad: valor de un parámetro',
    help: [
      '$f$ es continua en $x=a$ si $f(a)$ existe, existe $\\lim_{x\\to a}f(x)$ y ambos coinciden: $\\lim_{x\\to a^-}f=\\lim_{x\\to a^+}f=f(a)$. En una función a trozos, la continuidad en cada trozo es automática (son funciones elementales) y se impone en los puntos de unión. Eso da una ecuación (o un sistema) para los parámetros.',
      'Ejemplo: $f(x)=\\begin{cases}x+1&x<2\\\\ kx-3&x\\ge2\\end{cases}$. Izquierda: $2+1=3$. Derecha: $2k-3$. Igualamos: $2k-3=3$, luego $k=3$.',
    ],
    params: [{ key: 'tipo', label: 'Función', options: [['uno', 'Dos trozos, un parámetro'], ['cociente', 'Valor en el punto de un cociente'], ['dos', 'Tres trozos, dos parámetros']] }],
    generate(p) {
      if (p.tipo === 'cociente') {
        const raiz = rnd.float() < 0.4;
        let a, expr, g, val, st;
        if (raiz) {
          const s = r(1, 4); a = r(-3, 5); const c = s * s - a;
          expr = frac('\\sqrt{' + polyTex([1, c]) + '}-' + s, polyTex([1, -a]));
          g = (x) => (Math.sqrt(x + c) - s) / (x - a);
          val = F(1, 2 * s);
          st = ['Hay que imponer ' + i$('\\lim_{x\\to' + a + '}f(x)=f(' + a + ')=k') + '. Sale $\\frac00$: multiplicamos por el conjugado ' + i$('\\sqrt{' + polyTex([1, c]) + '}+' + s) + '.', d$(frac(fac(a), fac(a) + '(\\sqrt{' + polyTex([1, c]) + '}+' + s + ')') + '=' + frac(1, '\\sqrt{' + polyTex([1, c]) + '}+' + s) + '\\to' + frac(1, 2 * s)), '$k=' + ftex(val) + '$.'];
        } else {
          a = r(-4, 4); const m = r(-4, 4);
          const Nn = pmul([1, -a], [1, m]);
          expr = frac(polyTex(Nn), polyTex([1, -a]));
          g = (x) => pev(Nn, x) / (x - a);
          val = F(a + m);
          st = ['Hay que imponer ' + i$('\\lim_{x\\to' + a + '}f(x)=f(' + a + ')=k') + '. Factorizamos el numerador (tiene la raíz $' + a + '$):', d$(frac(fac(a) + fac(-m), fac(a)) + '=' + fac(-m) + '\\to' + (a + m)), '$k=' + (a + m) + '$.'];
        }
        const mk = (k) => (x) => (x === a ? k : g(x));
        return {
          prompt: 'Halla el valor de ' + i$('k') + ' para que ' + i$('f(x)=' + cases([[expr, 'x\\neq' + a], ['k', 'x=' + a]])) + ' sea continua en ' + i$('x=' + a) + '.',
          answer: { kind: 'number', label: 'k=', value: val },
          steps: st,
          mistakes: [{ value: F(0), msg: 'no basta con sustituir: da $\\frac00$. El valor de $k$ es el <b>límite</b> de la expresión.' }],
          data: { mk: (v) => mk(v[0]), xs: [a], sol: [val.n / val.d], tipo: 'cociente' },
        };
      }
      if (p.tipo === 'dos') {
        const x1 = r(-3, 0), x2 = x1 + r(1, 4);
        const a = nz(-3, 3), b = r(-5, 5);
        const V1 = a * x1 + b, V2 = a * x2 + b;
        const u1 = nz(-3, 3), u0 = V1 - u1 * x1, w1 = nz(-3, 3), w0 = V2 - w1 * x2;
        const mk = (v) => (x) => (x < x1 ? u1 * x + u0 : x <= x2 ? v[0] * x + v[1] : w1 * x + w0);
        return {
          prompt: 'Halla ' + i$('a') + ' y ' + i$('b') + ' para que ' + i$('f(x)=' + cases([[polyTex([u1, u0]), 'x<' + x1], ['ax+b', x1 + '\\le x\\le ' + x2], [polyTex([w1, w0]), 'x>' + x2]])) + ' sea continua en todo ' + i$('\\mathbb{R}') + '.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'a=', value: F(a) }, { kind: 'number', label: 'b=', value: F(b) }] },
          steps: [
            'Continuidad en $x=' + x1 + '$: ' + d$(cf(x1) + 'a+b=' + V1),
            'Continuidad en $x=' + x2 + '$: ' + d$(cf(x2) + 'a+b=' + V2),
            'Restando: ' + i$(cf(x2 - x1) + 'a=' + (V2 - V1)) + ', luego $a=' + a + '$ y $b=' + V1 + '-' + pa(x1 * a) + '=' + b + '$.',
          ],
          data: { mk, xs: [x1, x2], sol: [a, b], tipo: 'dos' },
        };
      }
      // uno
      const forma = pick(['lin', 'cuad', 'inv']);
      const a = forma === 'inv' ? pick([1, -1, 2, -2]) : nz(-3, 3);
      const L = [r(-2, 2), nz(-4, 4), r(-5, 5)];
      const La = pev(L, a);
      let R, Rtex, k, c3, eq;
      if (forma === 'lin') { k = nz(-4, 4); c3 = La - k * a; Rtex = 'kx' + tail(c3); R = (kk) => (x) => kk * x + c3; eq = [clamp(a) + 'k' + tail(c3) + '=' + La, 'k=' + frac(La - c3, a) + '=' + k]; }
      else if (forma === 'cuad') { k = nz(-4, 4); c3 = La - k * a * a; Rtex = 'kx^2' + tail(c3); R = (kk) => (x) => kk * x * x + c3; eq = [clamp(a * a) + 'k' + tail(c3) + '=' + La, 'k=' + frac(La - c3, a * a) + '=' + k]; }
      else {
        c3 = r(-4, 4); k = (La - c3) * a;
        if (k === 0) { c3 += 1; k = (La - c3) * a; }
        Rtex = frac('k', 'x') + tail(c3); R = (kk) => (x) => kk / x + c3;
        eq = [frac('k', a) + tail(c3) + '=' + La, 'k=(' + La + (c3 < 0 ? '+' + (-c3) : '-' + c3) + ')\\cdot' + pa(a) + '=' + k];
      }
      return build(a, La);
      function build(aa, Laa) {
        const mk = (v) => (x) => (x < aa ? pev(L, x) : R(v[0])(x));
        return {
          prompt: 'Halla ' + i$('k') + ' para que ' + i$('f(x)=' + cases([[polyTex(L), 'x<' + aa], [Rtex, 'x\\ge ' + aa]])) + ' sea continua en ' + i$('x=' + aa) + '.',
          answer: { kind: 'number', label: 'k=', value: F(k) },
          steps: [
            'Por la izquierda: ' + i$('\\lim_{x\\to' + aa + '^-}f=' + polyTex(L).replace(/x/g, '(' + aa + ')') + '=' + Laa) + '.',
            'Por la derecha, con $f(' + aa + ')$: ' + i$(Rtex.replace(/x/g, '(' + aa + ')')) + '.',
            'Igualamos: ' + d$(eq[0]) + 'Resolvemos: ' + i$(eq[1]) + '.',
          ],
          mistakes: [{ value: F(Laa), msg: 'el límite por la izquierda es $' + Laa + '$, pero $k$ es la incógnita que hay que despejar en la expresión de la derecha.' }],
          data: { mk, xs: [aa], sol: [k], tipo: 'uno' },
        };
      }
    },
  });

  /* ===================== 7. Tipo de discontinuidad ===================== */
  const DOPTS = ['Continua en el punto', 'Discontinuidad evitable', 'Discontinuidad de salto finito', 'Discontinuidad de salto infinito'];
  G.define({
    id: 'lim-discont',
    title: 'Tipo de discontinuidad',
    help: [
      'Se calculan $\\lim_{x\\to a^-}f$, $\\lim_{x\\to a^+}f$ y $f(a)$. Si los tres existen y coinciden, $f$ es continua. Si los laterales son finitos e iguales pero $f(a)$ no existe o es distinto: <b>evitable</b>. Si los laterales son finitos y distintos: <b>salto finito</b>. Si algún lateral es infinito: <b>salto infinito</b> (hay asíntota vertical).',
      'Ejemplo: $f(x)=\\frac{x^2-4}{x-2}$ en $x=2$. Para $x\\neq2$, $f(x)=x+2$, así que ambos laterales valen $4$, pero $f(2)$ no existe: discontinuidad evitable. En cambio $\\frac{1}{x-2}$ tiene laterales $\\mp\\infty$: salto infinito.',
    ],
    params: [{ key: 'tipo', label: 'Caso', options: [['cont', 'Continua'], ['evit', 'Evitable'], ['salto', 'Salto finito'], ['infin', 'Salto infinito']] }],
    generate(p) {
      const a = nz(-3, 4);
      let tex, f, Lt, Rt, Ft, tipo;
      const nn = (v) => String(v);
      if (p.tipo === 'cont') {
        tipo = 0;
        if (rnd.float() < 0.5) {
          tex = cases([[frac('x^2-' + (a * a), polyTex([1, -a])), 'x\\neq' + a], [2 * a, 'x=' + a]]).replace('x^2--', 'x^2+');
          f = (x) => (x === a ? 2 * a : (x * x - a * a) / (x - a));
          Lt = nn(2 * a); Rt = nn(2 * a); Ft = nn(2 * a);
        } else {
          const l1 = nz(-3, 3), l0 = r(-4, 4), La = l1 * a + l0, nn0 = La - a * a;
          tex = cases([[polyTex([l1, l0]), 'x<' + a], [polyTex([1, 0, nn0]), 'x\\ge ' + a]]);
          f = (x) => (x < a ? l1 * x + l0 : x * x + nn0);
          Lt = nn(La); Rt = nn(La); Ft = nn(La);
        }
      } else if (p.tipo === 'evit') {
        tipo = 1;
        const q = r(0, 2);
        if (q === 0) {
          let v = r(-6, 6); while (v === 2 * a) v = r(-6, 6);
          tex = cases([[frac('x^2-' + (a * a), polyTex([1, -a])), 'x\\neq' + a], [v, 'x=' + a]]).replace('x^2--', 'x^2+');
          f = (x) => (x === a ? v : (x * x - a * a) / (x - a));
          Lt = nn(2 * a); Rt = nn(2 * a); Ft = nn(v);
        } else if (q === 1) {
          tex = frac('x^2-' + (a * a), polyTex([1, -a])).replace('x^2--', 'x^2+');
          f = (x) => (x === a ? NaN : (x * x - a * a) / (x - a));
          Lt = nn(2 * a); Rt = nn(2 * a); Ft = '\\nexists';
        } else {
          tex = cases([[frac('\\operatorname{sen}(' + polyTex([1, -a]) + ')', polyTex([1, -a])), 'x\\neq' + a], ['0', 'x=' + a]]);
          f = (x) => (x === a ? 0 : Math.sin(x - a) / (x - a));
          Lt = '1'; Rt = '1'; Ft = '0';
        }
      } else if (p.tipo === 'salto') {
        tipo = 2;
        if (rnd.float() < 0.3) {
          tex = frac('|' + polyTex([1, -a]) + '|', polyTex([1, -a]));
          f = (x) => (x === a ? NaN : Math.abs(x - a) / (x - a));
          Lt = '-1'; Rt = '1'; Ft = '\\nexists';
        } else {
          const l1 = nz(-3, 3), l0 = r(-4, 4), La = l1 * a + l0;
          let d = nz(-5, 5);
          const Ra = La + d;
          tex = cases([[polyTex([l1, l0]), 'x<' + a], [polyTex([1, 0, Ra - a * a]), 'x\\ge ' + a]]);
          f = (x) => (x < a ? l1 * x + l0 : x * x + (Ra - a * a));
          Lt = nn(La); Rt = nn(Ra); Ft = nn(Ra);
        }
      } else {
        tipo = 3;
        const q = r(0, 2);
        if (q === 0) { tex = frac(1, polyTex([1, -a])); f = (x) => (x === a ? NaN : 1 / (x - a)); Lt = NINF; Rt = INF; Ft = '\\nexists'; }
        else if (q === 1) {
          let b = nz(-4, 4); while (a + b === 0) b = nz(-4, 4);
          const s = a + b > 0;
          tex = frac(polyTex([1, b]), '(' + polyTex([1, -a]) + ')^2');
          f = (x) => (x === a ? NaN : (x + b) / ((x - a) * (x - a)));
          Lt = s ? INF : NINF; Rt = Lt; Ft = '\\nexists';
        } else { tex = 'e^{' + frac(1, polyTex([1, -a])) + '}'; f = (x) => (x === a ? NaN : Math.exp(1 / (x - a))); Lt = '0'; Rt = INF; Ft = '\\nexists'; }
      }
      const concl = ['coinciden los tres: $f$ es continua en $x=' + a + '$.', 'los laterales son finitos e iguales, pero $f(' + a + ')$ no existe o es distinto del límite: discontinuidad <b>evitable</b>.', 'los laterales son finitos pero distintos: discontinuidad de <b>salto finito</b>.', 'un lateral es infinito: discontinuidad de <b>salto infinito</b> (asíntota vertical).'][tipo];
      const bad = [1, 0, 1, 2][tipo];
      const badMsg = ['hay que comprobar que $f(a)$ existe y vale lo mismo que el límite; aquí coinciden, no hay discontinuidad.', 'aquí $f(a)$ no existe o no coincide con los límites laterales, que sí son iguales entre sí: eso es evitable, no continua.', 'los límites laterales son finitos y <b>distintos</b>: no puede evitarse con un solo valor de $f(a)$.', 'un lateral es infinito: es salto infinito, no un salto finito.'][tipo];
      return {
        prompt: 'Clasifica la función ' + i$('f(x)=' + tex) + ' en ' + i$('x=' + a) + '.',
        answer: { kind: 'choice', options: DOPTS, value: tipo },
        steps: ['Límites laterales y valor de la función: ' + d$('\\lim_{x\\to' + a + '^-}f=' + Lt + ',\\quad \\lim_{x\\to' + a + '^+}f=' + Rt + ',\\quad f(' + a + ')=' + Ft), 'Conclusión: ' + concl],
        mistakes: [{ value: bad, msg: badMsg }],
        data: { f, a, tipo },
      };
    },
  });

  /* ===================== 8. Asíntotas ===================== */
  G.define({
    id: 'lim-asintotas',
    title: 'Asíntotas',
    help: [
      '<b>Vertical</b> $x=a$: si $\\lim_{x\\to a^\\pm}f=\\pm\\infty$ (el denominador se anula y el numerador no). <b>Horizontal</b> $y=L$: si $\\lim_{x\\to\\pm\\infty}f=L$. <b>Oblicua</b> $y=mx+n$: si $\\lim\\frac{f(x)}{x}=m\\neq0$ y $n=\\lim(f(x)-mx)$; en un cociente de polinomios con $n=m+1$ grados, se obtiene dividiendo.',
      'Ejemplo: $f(x)=\\frac{x^2+1}{x-1}=x+1+\\frac{2}{x-1}$. Es vertical en $x=1$ y oblicua $y=x+1$, porque $\\frac{2}{x-1}\\to0$. Para $f(x)=\\frac{3e^x+1}{e^x+2}$: con $x\\to+\\infty$, $y=3$; con $x\\to-\\infty$, $y=\\frac12$.',
    ],
    params: [{ key: 'tipo', label: 'Asíntota', options: [['vert', 'Verticales'], ['horiz', 'Horizontal'], ['obl', 'Oblicua'], ['dos', 'Horizontales en ±∞']] }],
    generate(p) {
      if (p.tipo === 'vert') {
        const caso = pick(['normal', 'hueco', 'tres']);
        let a = r(-4, 4), b, c = nz(-3, 3), pcoef = nz(-3, 3);
        do { b = r(-4, 4); } while (b === a);
        let Dn, roots, Dfac, Nf, hole = null;
        if (caso === 'tres') {
          let d; do { d = r(-4, 4); } while (d === a || d === b);
          Dn = pmul(pmul([1, -a], [1, -b]), [1, -d]); roots = [a, b, d]; Dfac = fac(a) + fac(b) + fac(d);
          Nf = [pcoef, r(-5, 5)];
        } else {
          Dn = pmul([1, -a], [1, -b]); roots = [a, b]; Dfac = fac(a) + fac(b);
          let cc;
          if (caso === 'hueco') { hole = pick([a, b]); cc = hole; } else { do { cc = r(-4, 4); } while (cc === a || cc === b); }
          Nf = [pcoef, -pcoef * cc];
        }
        const vs = roots.filter((x) => pev(Nf, x) !== 0);
        const f = (x) => pev(Nf, x) / pev(Dn, x);
        const st = ['El denominador se factoriza: ' + i$(polyTex(Dn) + '=' + Dfac) + '. Candidatos: ' + i$(roots.map((x) => 'x=' + x).join(',\\ ')) + '.'];
        if (hole !== null) st.push('El numerador ' + i$(polyTex(Nf) + '=' + pcoef + fac(hole).replace(/^/, '')) + ' se anula en $x=' + hole + '$: allí hay un hueco (el límite es finito), no una asíntota.');
        else st.push('El numerador no se anula en ninguno de ellos: en cada uno el límite es infinito.');
        st.push('Asíntotas verticales: ' + i$(vs.map((x) => 'x=' + x).join(',\\ ')) + '.');
        return {
          prompt: 'Halla las asíntotas verticales de ' + i$('f(x)=' + frac(polyTex(Nf), polyTex(Dn))) + '. Escribe sus abscisas separadas por «;».',
          answer: { kind: 'list', label: 'x=', value: vs.map((x) => F(x)) },
          steps: st,
          mistakes: hole !== null ? [{ value: roots.map((x) => F(x)), msg: 'si el numerador también se anula en $x=' + hole + '$, se simplifica el factor y allí no hay asíntota vertical (hay un hueco).' }] : [],
          data: { f, vs, tipo: 'vert' },
        };
      }
      if (p.tipo === 'horiz') {
        const g = r(1, 3);
        const mk = (L) => { const c = [nz(-L, L)]; for (let i = 0; i < g; i++) c.push(r(-L, L)); return c; };
        const N = mk(6), D = mk(4);
        const val = F(N[0], D[0]);
        return {
          prompt: 'Halla la asíntota horizontal ' + i$('y=L') + ' de ' + i$('f(x)=' + frac(polyTex(N), polyTex(D))) + '.',
          answer: { kind: 'number', label: 'L=', value: val },
          steps: ['Numerador y denominador tienen el mismo grado ' + i$(g) + ': ' + d$(lim('\\pm\\infty', frac(polyTex(N), polyTex(D))) + '=' + frac(N[0], D[0]) + '=' + ftex(val)), 'La asíntota horizontal es ' + i$('y=' + ftex(val)) + ' (la misma en $+\\infty$ y en $-\\infty$).'],
          mistakes: [{ value: F(D[0], N[0]), msg: 'el cociente de coeficientes principales va <b>numerador entre denominador</b>.' }],
          data: { f: (x) => pev(N, x) / pev(D, x), val: val.n / val.d, tipo: 'horiz' },
        };
      }
      if (p.tipo === 'obl') {
        const m = nz(-3, 3), n = r(-4, 4), a = nz(-3, 3), rr = nz(-4, 4);
        const Nn = [m, n - m * a, rr - n * a];
        return {
          prompt: 'Halla la asíntota oblicua ' + i$('y=mx+n') + ' de ' + i$('f(x)=' + frac(polyTex(Nn), polyTex([1, -a]))) + '.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'm=', value: F(m) }, { kind: 'number', label: 'n=', value: F(n) }] },
          steps: ['Dividimos los polinomios: ' + d$(polyTex(Nn) + '=(' + polyTex([1, -a]) + ')(' + polyTex([m, n]) + ')' + tail(rr)), 'Entonces ' + i$('f(x)=' + polyTex([m, n]) + '+' + frac(rr, polyTex([1, -a]))) + ' y el último sumando tiende a $0$.', 'Asíntota oblicua: ' + i$('y=' + polyTex([m, n])) + '.'],
          data: { f: (x) => pev(Nn, x) / (x - a), m, n, tipo: 'obl' },
        };
      }
      // dos horizontales
      if (rnd.float() < 0.5) {
        const a = nz(-6, 6), b = nz(-6, 6), c = r(1, 4), d = r(1, 4);
        const e = (k) => (k === 1 ? '' : String(k));
        return {
          prompt: 'Halla las asíntotas horizontales de ' + i$('f(x)=' + frac((Math.abs(a) === 1 ? (a < 0 ? '-' : '') : a) + 'e^x' + tail(b), e(c) + 'e^x+' + d)) + ' en $+\\infty$ y en $-\\infty$.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'y_{+\\infty}=', value: F(a, c) }, { kind: 'number', label: 'y_{-\\infty}=', value: F(b, d) }] },
          steps: ['Con $x\\to+\\infty$: $e^x\\to\\infty$ y manda el término con $e^x$: ' + i$(frac(a, c) + '=' + ftex(F(a, c)))  + '.', 'Con $x\\to-\\infty$: $e^x\\to0$ y quedan los términos constantes: ' + i$(frac(b, d) + '=' + ftex(F(b, d))) + '.'],
          data: { f: (x) => (a * Math.exp(x) + b) / (c * Math.exp(x) + d), yp: a / c, ym: b / d, tipo: 'dos' },
        };
      }
      const a = nz(-5, 5), b = r(-5, 5), c = r(1, 4), q = r(1, 6);
      return {
        prompt: 'Halla las asíntotas horizontales de ' + i$('f(x)=' + frac(polyTex([a, b]), '\\sqrt{' + polyTex([c * c, 0, q]) + '}')) + ' en $+\\infty$ y en $-\\infty$.',
        answer: { kind: 'multi', parts: [{ kind: 'number', label: 'y_{+\\infty}=', value: F(a, c) }, { kind: 'number', label: 'y_{-\\infty}=', value: F(-a, c) }] },
        steps: ['La raíz se comporta como ' + i$('\\sqrt{' + (c * c) + 'x^2}=' + c + '|x|') + '.', 'Con $x\\to+\\infty$, $|x|=x$: ' + i$(frac(a + 'x', c + 'x') + '=' + ftex(F(a, c))) + '.', 'Con $x\\to-\\infty$, $|x|=-x$: ' + i$(frac(a + 'x', '-' + c + 'x') + '=' + ftex(F(-a, c))) + '.'],
        data: { f: (x) => (a * x + b) / Math.sqrt(c * c * x * x + q), yp: a / c, ym: -a / c, tipo: 'dos' },
      };
    },
  });

  /* ===================== Gráficas 2D (JSXGraph, ver graficas.js) ===================== */
  const fin = Number.isFinite;
  function plotDe(id, d) {
    if (typeof d.f !== 'function') return null;
    const spec = { type: '2d', x: [-10, 10], curves: [{ f: d.f, label: 'f' }] };
    const hl = [];
    if (id === 'lim-infinito') {
      if (d.sx) spec.x = d.sx > 0 ? [-2, 14] : [-14, 2];
      if (fin(d.val)) hl.push(d.val);
    } else if (id === 'lim-punto') {
      if (!fin(d.a)) return null;
      spec.x = [d.a - 4, d.a + 4];
      spec.vlines = [d.a];
      if (fin(d.val)) hl.push(d.val);
    } else if (id === 'lim-discont') {
      if (!fin(d.a)) return null;
      spec.x = [d.a - 4, d.a + 4];
      spec.vlines = [d.a];
    } else if (id === 'lim-asintotas') {
      if (Array.isArray(d.vs) && d.vs.length) {
        const vs = d.vs.filter(fin);
        spec.x = [Math.min(...vs) - 4, Math.max(...vs) + 4];
        spec.vlines = vs;
      }
      [d.val, d.yp, d.ym].forEach((y) => { if (fin(y) && !hl.includes(y)) hl.push(y); });
      if (fin(d.m) && fin(d.n)) spec.lines = [{ m: d.m, n: d.n, label: 'asíntota' }];
    } else return null;
    if (hl.length) spec.hlines = hl;
    return spec;
  }
  Object.keys(G.modules).filter((id) => ['lim-infinito', 'lim-punto', 'lim-discont', 'lim-asintotas'].includes(id)).forEach((id) => {
    const mod = G.modules[id], gen = mod.generate;
    mod.generate = (p) => { const ch = gen(p); const pl = plotDe(id, ch.data || {}); if (pl) ch.plot = pl; return ch; };
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
