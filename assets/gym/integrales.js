/* Ejercicios interactivos — 2º Bachillerato, tema 9: Integrales.
 * Módulos: int-indefinidas, int-barrow, int-sustitucion, int-partes, int-racionales, int-primitiva, int-areas.
 * Las respuestas con «expr» no llevan `show`: así los errores típicos se detectan (el motor compara por valor).
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, ftex, d$, i$, fadd, fsub, fmul } = G;

  /* ---------- Utilidades ---------- */
  const par = (n) => (n < 0 ? '(' + n + ')' : String(n));
  const pi = Math.PI, E = Math.E;
  const nz = (lo, hi) => { let x; do { x = rnd.int(lo, hi); } while (x === 0); return x; };
  const cf = (a, t) => (a === 1 ? t : a === -1 ? '-' + t : a + t);        // coeficiente delante de un texto
  const cst = (a) => (a < 0 ? '-' : '+') + Math.abs(a);
  const sgnT = (a, t) => (a < 0 ? '-' : '+') + (Math.abs(a) === 1 ? t : Math.abs(a) + t);  // +3t / -t
  /** Polinomio entero c[i] x^i en TeX. */
  function pt(c) {
    let s = '';
    for (let i = c.length - 1; i >= 0; i--) {
      const a = c[i];
      if (!a) continue;
      const ab = Math.abs(a);
      const pw = i === 0 ? '' : i === 1 ? 'x' : 'x^{' + i + '}';
      const t = i === 0 ? String(ab) : ab === 1 ? pw : ab + pw;
      s += s === '' ? (a < 0 ? '-' : '') + t : (a < 0 ? '-' : '+') + t;
    }
    return s || '0';
  }
  /** Polinomio con coeficientes fraccionarios (lista de F) en TeX. */
  function ptq(cs) {
    let s = '';
    for (let i = cs.length - 1; i >= 0; i--) {
      const q = cs[i];
      if (q.n === 0) continue;
      const ab = F(Math.abs(q.n), q.d);
      const pw = i === 0 ? '' : i === 1 ? 'x' : 'x^{' + i + '}';
      const t = i === 0 ? ftex(ab) : (ab.n === 1 && ab.d === 1) ? pw : ftex(ab) + pw;
      s += s === '' ? (q.n < 0 ? '-' : '') + t : (q.n < 0 ? '-' : '+') + t;
    }
    return s || '0';
  }
  const pevN = (c, x) => c.reduceRight((s, a) => s * x + a, 0);
  const pevF = (cs, x) => cs.reduceRight((s, q) => fadd(fmul(s, F(x)), q), F(0));
  const pint = (c) => [F(0)].concat(c.map((a, i) => F(a, i + 1)));      // primitiva con C=0
  const pmul = (a, b) => { const r = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { r[i + j] += x * y; })); return r; };
  const lin = (r) => (r === 0 ? 'x' : '(x' + (r < 0 ? '+' + (-r) : '-' + r) + ')');
  const ansN = (label, v) => ({ kind: 'number', label, value: v });
  const ansE = (label, v) => ({ kind: 'expr', label, value: v });
  const val = (q) => q.n / q.d;
  /** Paréntesis alrededor de una suma/resta dentro de una integral: \int (…) dx. */
  const wrapSum = (t) => (/[+-]/.test(t.replace(/\{[^{}]*\}/g, '').replace(/\([^()]*\)/g, '').replace(/^-/, '')) ? '(' + t + ')' : t);
  /** Limpia restos de «k = 1» en los textos: 1x, \frac{a}{1}, e^{1}, \pi/1... */
  const tidy = (t) => (typeof t !== 'string' ? t : t
    .replace(/\\(?:d?)frac\{((?:[^{}]|\{[^{}]*\})*)\}\{1(?:\^2)?\}/g, '$1')
    .replace(/\\frac1\{1\}/g, '1')
    .replace(/(?<![0-9])1x/g, 'x')
    .replace(/\\pi\/1(?![0-9])/g, '\\pi')
    .replace(/e\^\{1\}/g, 'e')
    .replace(/(^|[^0-9a-zA-Z\\])1\\ln/g, '$1\\ln'));
  const def = (mod) => {
    const g = mod.generate;
    mod.generate = (p) => {
      const ch = g(p);
      ch.prompt = tidy(ch.prompt); ch.steps = ch.steps.map(tidy);
      (ch.mistakes || []).forEach((m) => { m.msg = tidy(m.msg); });
      return ch;
    };
    G.define(mod);
  };
  /** Término q·t con signo explícito (q fracción no nula); first = primer término de la expresión. */
  const cterm = (q, t, first) => (q.n < 0 ? '-' : first ? '' : '+') + (Math.abs(q.n) === 1 && q.d === 1 ? '' : ftex(F(Math.abs(q.n), q.d))) + t;
  const kk = (k) => (k === 1 ? '' : String(k)) + 'x';
  const co = (a) => (a === 1 ? '' : String(a));
  const lnT = (n, d) => (d === 1 ? '\\ln ' + n : '\\ln\\frac{' + n + '}{' + d + '}');

  /* ===================== 1. Integrales indefinidas (elegir la primitiva) ===================== */
  function tmplPol() {
    const A = nz(-3, 3), B = nz(-4, 4), C = nz(-5, 5);
    const f = [C, 2 * B, 3 * A];
    const fn = (c) => (x) => pevN(c, x);
    return {
      ftex: pt(f), f: fn(f),
      cands: [
        { t: pt([0, C, B, A]), F: fn([0, C, B, A]) },
        { t: pt([2 * B, 6 * A]), F: fn([2 * B, 6 * A]) },
        { t: pt([0, C, 2 * B, 3 * A]), F: fn([0, C, 2 * B, 3 * A]) },
        { t: pt([C, 0, B, A]), F: fn([C, 0, B, A]) },
      ],
      msgs: ['has <b>derivado</b> en vez de integrar.', 'al integrar $x^n$ hay que dividir entre $n+1$ (te falta dividir en cada término).', 'la integral de una constante $c$ es $cx$, no $c$.'],
    };
  }
  function tmplCadena() {
    const k = rnd.int(2, 5), b = nz(-3, 3), n = rnd.int(2, 4);
    let a;
    do { a = rnd.int(2, 4); } while (a === n + 1);
    const kx = k + 'x', axb = pt([b, a]);
    return rnd.pick([
      () => ({
        ftex: 'e^{' + kx + '}', f: (x) => Math.exp(k * x),
        cands: [
          { t: '\\dfrac{e^{' + kx + '}}{' + k + '}', F: (x) => Math.exp(k * x) / k },
          { t: 'e^{' + kx + '}', F: (x) => Math.exp(k * x) },
          { t: k + 'e^{' + kx + '}', F: (x) => k * Math.exp(k * x) },
          { t: '\\dfrac{e^{' + kx + '+1}}{' + kx + '+1}', F: (x) => Math.exp(k * x + 1) / (k * x + 1) },
        ],
        msgs: ['falta dividir entre la derivada del exponente: $\\int e^{kx}dx=\\frac{e^{kx}}{k}$.', 'para compensar la derivada del exponente se <b>divide</b> entre $k$, no se multiplica.', 'la exponencial no sigue la regla de las potencias: $\\int e^u\\,u\'\\,dx=e^u$.'],
      }),
      () => ({
        ftex: '\\cos ' + kx, f: (x) => Math.cos(k * x),
        cands: [
          { t: '\\dfrac{\\sin ' + kx + '}{' + k + '}', F: (x) => Math.sin(k * x) / k },
          { t: '-\\dfrac{\\sin ' + kx + '}{' + k + '}', F: (x) => -Math.sin(k * x) / k },
          { t: '\\sin ' + kx, F: (x) => Math.sin(k * x) },
          { t: k + '\\sin ' + kx, F: (x) => k * Math.sin(k * x) },
        ],
        msgs: ['la integral del coseno es $+\\sin$; el signo menos aparece al integrar el seno.', 'falta dividir entre $k$ (la derivada de $kx$).', 'hay que <b>dividir</b> entre $k$, no multiplicar.'],
      }),
      () => ({
        ftex: '\\sin ' + kx, f: (x) => Math.sin(k * x),
        cands: [
          { t: '-\\dfrac{\\cos ' + kx + '}{' + k + '}', F: (x) => -Math.cos(k * x) / k },
          { t: '\\dfrac{\\cos ' + kx + '}{' + k + '}', F: (x) => Math.cos(k * x) / k },
          { t: '-\\cos ' + kx, F: (x) => -Math.cos(k * x) },
          { t: '-' + k + '\\cos ' + kx, F: (x) => -k * Math.cos(k * x) },
        ],
        msgs: ['el signo: $\\int\\sin u\\,u\'\\,dx=-\\cos u$ (la derivada de $\\cos$ es $-\\sin$).', 'falta dividir entre $k$.', 'hay que <b>dividir</b> entre $k$, no multiplicar.'],
      }),
      () => ({
        ftex: '\\dfrac{1}{' + axb + '}', f: (x) => 1 / (a * x + b),
        cands: [
          { t: '\\dfrac{1}{' + a + '}\\ln|' + axb + '|', F: (x) => Math.log(Math.abs(a * x + b)) / a },
          { t: '\\ln|' + axb + '|', F: (x) => Math.log(Math.abs(a * x + b)) },
          { t: '-\\dfrac{' + a + '}{(' + axb + ')^2}', F: (x) => -a / ((a * x + b) ** 2) },
          { t: a + '\\ln|' + axb + '|', F: (x) => a * Math.log(Math.abs(a * x + b)) },
        ],
        msgs: ['falta dividir entre la derivada del denominador, $' + a + '$.', 'has <b>derivado</b> en vez de integrar.', 'hay que dividir entre $' + a + '$, no multiplicar.'],
      }),
      () => ({
        ftex: '(' + axb + ')^{' + n + '}', f: (x) => (a * x + b) ** n,
        cands: [
          { t: '\\dfrac{(' + axb + ')^{' + (n + 1) + '}}{' + a * (n + 1) + '}', F: (x) => (a * x + b) ** (n + 1) / (a * (n + 1)) },
          { t: '\\dfrac{(' + axb + ')^{' + (n + 1) + '}}{' + (n + 1) + '}', F: (x) => (a * x + b) ** (n + 1) / (n + 1) },
          { t: n * a + '(' + axb + ')' + (n === 2 ? '' : '^{' + (n - 1) + '}'), F: (x) => n * a * (a * x + b) ** (n - 1) },
          { t: '\\dfrac{(' + axb + ')^{' + (n + 1) + '}}{' + a + '}', F: (x) => (a * x + b) ** (n + 1) / a },
        ],
        msgs: ['falta dividir entre la derivada de la base, $' + a + '$: el denominador es $' + a + '\\cdot' + (n + 1) + '$.', 'has <b>derivado</b> en vez de integrar.', 'además de dividir entre $' + a + '$, hay que dividir entre el nuevo exponente $' + (n + 1) + '$.'],
      }),
    ])();
  }
  function tmplComp() {
    const k = rnd.int(1, 4), n = rnd.int(2, 4);
    return rnd.pick([
      () => ({
        ftex: '2x\\,e^{x^2}', f: (x) => 2 * x * Math.exp(x * x),
        cands: [
          { t: 'e^{x^2}', F: (x) => Math.exp(x * x) },
          { t: 'x^2e^{x^2}', F: (x) => x * x * Math.exp(x * x) },
          { t: '\\dfrac{e^{x^2}}{2x}', F: (x) => Math.exp(x * x) / (2 * x) },
          { t: 'xe^{x^2}', F: (x) => x * Math.exp(x * x) },
        ],
        msgs: ['no se integra factor a factor: $2x$ es justo la derivada de $x^2$, así que $\\int e^u u\'dx=e^u$.', 'no se divide entre $2x$: esa derivada ya está en el integrando.', 'el factor $2x$ es la derivada del exponente: no hace falta ningún coeficiente.'],
      }),
      () => ({
        ftex: '\\dfrac{2x}{x^2+' + k + '}', f: (x) => 2 * x / (x * x + k),
        cands: [
          { t: '\\ln(x^2+' + k + ')', F: (x) => Math.log(x * x + k) },
          { t: '\\dfrac{\\ln(x^2+' + k + ')}{2x}', F: (x) => Math.log(x * x + k) / (2 * x) },
          { t: '2\\ln(x^2+' + k + ')', F: (x) => 2 * Math.log(x * x + k) },
          { t: '\\dfrac{x^2}{x^3/3+' + (k === 1 ? '' : k) + 'x}', F: (x) => (x * x) / (x ** 3 / 3 + k * x) },
        ],
        msgs: ['no se divide entre la derivada: $2x$ ya aparece en el numerador, así que $\\int\\frac{u\'}{u}dx=\\ln|u|$.', 'el $2x$ del numerador es la derivada del denominador: sale $\\ln(u)$ sin coeficiente extra.', 'no se integra numerador y denominador por separado.'],
      }),
      () => ({
        ftex: '\\cos x\\,e^{\\sin x}', f: (x) => Math.cos(x) * Math.exp(Math.sin(x)),
        cands: [
          { t: 'e^{\\sin x}', F: (x) => Math.exp(Math.sin(x)) },
          { t: '\\sin x\\,e^{\\sin x}', F: (x) => Math.sin(x) * Math.exp(Math.sin(x)) },
          { t: '\\dfrac{e^{\\sin x}}{\\cos x}', F: (x) => Math.exp(Math.sin(x)) / Math.cos(x) },
          { t: 'e^{\\cos x}', F: (x) => Math.exp(Math.cos(x)) },
        ],
        msgs: ['no se integra factor a factor: $\\cos x$ es la derivada de $\\sin x$, luego $\\int e^u u\'dx=e^u$.', 'no se divide entre $\\cos x$: ese factor ya es la derivada del exponente.', 'el exponente es $\\sin x$ y no cambia al integrar.'],
      }),
      () => ({
        ftex: 'x\\sqrt{x^2+' + k + '}', f: (x) => x * Math.sqrt(x * x + k),
        cands: [
          { t: '\\dfrac{(x^2+' + k + ')^{3/2}}{3}', F: (x) => (x * x + k) ** 1.5 / 3 },
          { t: '(x^2+' + k + ')^{3/2}', F: (x) => (x * x + k) ** 1.5 },
          { t: '\\dfrac{2(x^2+' + k + ')^{3/2}}{3}', F: (x) => 2 * (x * x + k) ** 1.5 / 3 },
          { t: '\\sqrt{x^2+' + k + '}', F: (x) => Math.sqrt(x * x + k) },
        ],
        msgs: ['falta dividir entre el nuevo exponente $3/2$ y multiplicar por $1/2$ (por $u\'=2x$): el resultado es $\\frac{u^{3/2}}{3}$.', 'al dividir entre $\\frac32$ se multiplica por $\\frac23$, y como $u\'=2x$ hay que dividir entre $2$: queda $\\frac13$.', 'has <b>derivado</b> (o dejado la raíz) en vez de integrar.'],
      }),
      () => ({
        ftex: '\\dfrac{\\ln x}{x}', f: (x) => Math.log(x) / x,
        cands: [
          { t: '\\dfrac{\\ln^2x}{2}', F: (x) => Math.log(x) ** 2 / 2 },
          { t: '\\ln^2x', F: (x) => Math.log(x) ** 2 },
          { t: '\\dfrac{\\ln^2x}{2x}', F: (x) => Math.log(x) ** 2 / (2 * x) },
          { t: '\\dfrac{\\ln(x^2)}{2}', F: (x) => Math.log(x * x) / 2 },
        ],
        msgs: ['falta dividir entre el nuevo exponente: $\\int u\\,u\'dx=\\frac{u^2}{2}$ con $u=\\ln x$.', 'el factor $\\frac1x$ es $u\'$: ya está en el integrando, no se vuelve a dividir.', '$\\ln(x^2)=2\\ln x$ no es lo mismo que $\\ln^2x$: aquí la potencia afecta al logaritmo.'],
      }),
      () => ({
        ftex: '\\sin x\\cos^{' + n + '}x', f: (x) => Math.sin(x) * Math.cos(x) ** n,
        cands: [
          { t: '-\\dfrac{\\cos^{' + (n + 1) + '}x}{' + (n + 1) + '}', F: (x) => -(Math.cos(x) ** (n + 1)) / (n + 1) },
          { t: '\\dfrac{\\cos^{' + (n + 1) + '}x}{' + (n + 1) + '}', F: (x) => Math.cos(x) ** (n + 1) / (n + 1) },
          { t: '-\\cos^{' + (n + 1) + '}x', F: (x) => -(Math.cos(x) ** (n + 1)) },
          { t: '-\\dfrac{\\cos^{' + (n + 1) + '}x}{' + n + '}', F: (x) => -(Math.cos(x) ** (n + 1)) / n },
        ],
        msgs: ['el signo: aquí $u=\\cos x$ y $u\'=-\\sin x$, por eso aparece un menos.', 'falta dividir entre el nuevo exponente $' + (n + 1) + '$.', 'se divide entre el exponente <b>nuevo</b>, $' + (n + 1) + '$, no entre el antiguo.'],
      }),
    ])();
  }

  def({
    id: 'int-indefinidas',
    title: 'Primitivas: elige la correcta',
    help: [
      'Una primitiva $F$ de $f$ cumple $F\'=f$. Las reglas de las integrales inmediatas tienen su versión «compuesta»: $\\int u^n u\'dx=\\frac{u^{n+1}}{n+1}$, $\\int e^uu\'dx=e^u$, $\\int\\frac{u\'}{u}dx=\\ln|u|$, $\\int\\cos u\\,u\'dx=\\sin u$, $\\int\\sin u\\,u\'dx=-\\cos u$. Siempre se puede <b>derivar</b> el resultado para comprobarlo.',
      'Ejemplo: $\\int e^{3x}dx$. Aquí $u=3x$, $u\'=3$ no está en el integrando, así que se divide entre $3$: $\\dfrac{e^{3x}}{3}+C$. Comprobación: $\\left(\\dfrac{e^{3x}}{3}\\right)\'=\\dfrac{3e^{3x}}{3}=e^{3x}$.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['pol', 'Polinomios'], ['cadena', 'Con función lineal dentro'], ['comp', 'Con u\' en el integrando']] }],
    generate(p) {
      const T = p.tipo === 'pol' ? tmplPol() : p.tipo === 'cadena' ? tmplCadena() : tmplComp();
      const order = rnd.shuffle([0, 1, 2, 3]);
      const options = order.map((i) => i$(T.cands[i].t + '+C'));
      const value = order.indexOf(0);
      const mistakes = order.map((oi, pos) => ({ oi, pos })).filter((x) => x.oi !== 0).map(({ oi, pos }) => ({ value: pos, msg: T.msgs[oi - 1] }));
      return {
        prompt: 'Calcula ' + i$('\\displaystyle\\int ' + wrapSum(T.ftex) + '\\,dx') + '.',
        answer: { kind: 'choice', options, value },
        steps: [
          'Identificamos el tipo de integral y su regla: ' + (p.tipo === 'pol' ? 'se integra cada término con $\\int x^ndx=\\frac{x^{n+1}}{n+1}$ y $\\int c\\,dx=cx$.' : 'es de la forma «función de $u$ por $u\'$» (o $u\'$ falta sólo como constante).'),
          'Resultado: ' + d$('\\int ' + wrapSum(T.ftex) + '\\,dx=' + T.cands[0].t + '+C'),
          'Comprobación: derivando el resultado se obtiene de nuevo ' + i$(T.ftex) + '.',
        ],
        mistakes,
        data: { f: T.f, cands: order.map((i) => T.cands[i].F), value },
      };
    },
  });

  /* ===================== 2. Integral definida (Barrow) de funciones inmediatas ===================== */
  function barrowCase(tipo) {
    if (tipo === 'pol') {
      let c;
      do { c = [rnd.int(-5, 5), rnd.int(-5, 5), rnd.int(-5, 5), rnd.int(-3, 3)]; if (rnd.int(0, 1)) c[3] = 0; } while (!c[2] && !c[3] || c.filter((x) => x).length < 2);
      while (c.length > 1 && !c[c.length - 1]) c.pop();
      const a = rnd.int(-3, 1), b = rnd.int(a + 1, a + 4);
      const P = pint(c), Fb = pevF(P, b), Fa = pevF(P, a), v = fsub(Fb, Fa);
      return {
        ftex: pt(c), f: (x) => pevN(c, x), a, b, aT: String(a), bT: String(b), ans: ansN('I=', v), val: val(v),
        steps: ['Primitiva: ' + d$('F(x)=' + ptq(P)), 'Regla de Barrow: ' + d$('F(' + b + ')-F(' + par(a) + ')=' + ftex(Fb) + '-' + (Fa.n < 0 ? '(' + ftex(Fa) + ')' : ftex(Fa)) + '=' + ftex(v))],
        mistakes: [{ value: fadd(Fb, Fa), msg: 'Barrow es $F(b)-F(a)$: hay que <b>restar</b>, no sumar.' }, { value: fsub(Fa, Fb), msg: 'el orden es $F(b)-F(a)$ (extremo superior menos inferior); te ha salido el signo contrario.' }],
      };
    }
    if (tipo === 'pot') {
      const A = rnd.int(1, 5);
      const s = rnd.int(1, 3), t = rnd.int(s + 1, s + 3);
      const w = rnd.int(1, 3), z = rnd.int(w + 1, w + 4);
      return rnd.pick([
        () => { const v = fmul(F(A), fsub(F(1, w), F(1, z))); return { ftex: '\\dfrac{' + A + '}{x^2}', f: (x) => A / (x * x), a: w, b: z, aT: String(w), bT: String(z), ans: ansN('I=', v), val: val(v), steps: ['Primitiva: ' + i$('\\int ' + A + 'x^{-2}dx=-\\dfrac{' + A + '}{x}'), 'Barrow: ' + d$('\\left[-\\frac{' + A + '}{x}\\right]_{' + w + '}^{' + z + '}=-\\frac{' + A + '}{' + z + '}+\\frac{' + A + '}{' + w + '}=' + ftex(v))], mistakes: [{ value: fmul(F(A), fsub(F(1, z), F(1, w))), msg: 'el signo: $\\int x^{-2}dx=-x^{-1}$; has dejado la primitiva con signo positivo.' }] }; },
        () => { const v = fmul(F(2 * A, 3), F(t ** 3 - s ** 3)); return { ftex: A + '\\sqrt{x}', f: (x) => A * Math.sqrt(x), a: s * s, b: t * t, aT: String(s * s), bT: String(t * t), ans: ansN('I=', v), val: val(v), steps: ['Escribimos ' + i$(A + '\\sqrt x=' + A + 'x^{1/2}') + ' y su primitiva: ' + i$('\\dfrac{' + A + 'x^{3/2}}{3/2}=\\dfrac{' + 2 * A + '}{3}x\\sqrt x'), 'Barrow: ' + d$('\\frac{' + 2 * A + '}{3}\\left(' + t * t + '\\cdot' + t + '-' + s * s + '\\cdot' + s + '\\right)=\\frac{' + 2 * A + '}{3}\\cdot' + (t ** 3 - s ** 3) + '=' + ftex(v))], mistakes: [{ value: fmul(F(A, 2), F(t ** 3 - s ** 3)), msg: 'al integrar $x^{1/2}$ se divide entre $\\frac32$, es decir, se multiplica por $\\frac23$.' }] }; },
        () => { const v = F(2 * A * (t - s)); return { ftex: '\\dfrac{' + A + '}{\\sqrt{x}}', f: (x) => A / Math.sqrt(x), a: s * s, b: t * t, aT: String(s * s), bT: String(t * t), ans: ansN('I=', v), val: val(v), steps: ['Escribimos ' + i$('\\dfrac{' + A + '}{\\sqrt x}=' + A + 'x^{-1/2}') + ' y su primitiva: ' + i$('\\dfrac{' + A + 'x^{1/2}}{1/2}=' + 2 * A + '\\sqrt x'), 'Barrow: ' + d$(2 * A + '\\left(\\sqrt{' + t * t + '}-\\sqrt{' + s * s + '}\\right)=' + 2 * A + '(' + t + '-' + s + ')=' + 2 * A * (t - s))], mistakes: [{ value: F(A * (t - s)), msg: 'al integrar $x^{-1/2}$ se divide entre $\\frac12$, es decir, se multiplica por $2$.' }] }; },
        () => { const v = fmul(F(A, 2), fsub(F(1, w * w), F(1, z * z))); return { ftex: '\\dfrac{' + A + '}{x^3}', f: (x) => A / (x ** 3), a: w, b: z, aT: String(w), bT: String(z), ans: ansN('I=', v), val: val(v), steps: ['Primitiva: ' + i$('\\int ' + A + 'x^{-3}dx=\\dfrac{' + A + 'x^{-2}}{-2}=-\\dfrac{' + A + '}{2x^2}'), 'Barrow: ' + d$('-\\frac{' + A + '}{2\\cdot' + z * z + '}+\\frac{' + A + '}{2\\cdot' + w * w + '}=' + ftex(v))], mistakes: [{ value: fmul(F(A), fsub(F(1, w * w), F(1, z * z))), msg: 'al integrar $x^{-3}$ hay que dividir entre el nuevo exponente $-2$: aparece un $\\frac12$.' }] }; },
      ])();
    }
    if (tipo === 'exp') {
      return rnd.pick([
        () => {
          const A = rnd.int(1, 4), k = rnd.pick([1, 2, 3, -1, -2]), c = rnd.int(1, 2);
          const v = A * (Math.exp(k * c) - 1) / k;
          return {
            ftex: (A === 1 ? '' : A) + 'e^{' + (k === 1 ? '' : k === -1 ? '-' : k) + 'x}', f: (x) => A * Math.exp(k * x), a: 0, b: c, aT: '0', bT: String(c), ans: ansE('I=', v), val: v,
            steps: ['Primitiva: ' + i$('\\int ' + co(A) + 'e^{' + kk(k) + '}dx=' + cterm(F(A, k), 'e^{' + kk(k) + '}', true)), 'Barrow: ' + d$((k === 1 ? '' : '\\frac{') + co(A) + '\\left(' + (k * c === 1 ? 'e' : 'e^{' + k * c + '}') + '-1\\right)' + (k === 1 ? '' : '}{' + par(k) + '}') + '\\approx ' + String(Math.round(v * 1e4) / 1e4).replace('.', '{,}'))],
            mistakes: [{ value: A * (Math.exp(k * c) - 1), msg: 'falta dividir entre $' + k + '$ (la derivada del exponente $' + k + 'x$).' }],
          };
        },
        () => {
          const A = rnd.int(1, 4), B = nz(-4, 4), m = rnd.int(2, 5);
          const v = A * (m - 1) + B * Math.log(m);
          return {
            ftex: (A === 1 ? '' : A) + 'e^{x}' + cst(B), f: (x) => A * Math.exp(x) + B, a: 0, b: Math.log(m), aT: '0', bT: '\\ln ' + m, ans: ansE('I=', v), val: v,
            steps: ['Primitiva: ' + i$('F(x)=' + (A === 1 ? '' : A) + 'e^{x}' + (B < 0 ? '-' : '+') + (Math.abs(B) === 1 ? '' : Math.abs(B)) + 'x'), 'Con ' + i$('e^{\\ln ' + m + '}=' + m) + ': ' + d$('F(\\ln ' + m + ')-F(0)=' + A + '(' + m + '-1)' + (B < 0 ? '-' : '+') + Math.abs(B) + '\\ln ' + m)],
            mistakes: [{ value: A * (m - 1) + B, msg: 'la integral de la constante $' + B + '$ es $' + B + 'x$, y en el extremo superior $x=\\ln ' + m + '$ (no $1$).' }],
          };
        },
      ])();
    }
    if (tipo === 'trig') {
      return rnd.pick([
        () => { const A = nz(-4, 4), k = rnd.int(1, 3), v = F(A, k); return { ftex: cf(A, '\\cos ' + kk(k)), f: (x) => A * Math.cos(k * x), a: 0, b: pi / (2 * k), aT: '0', bT: '\\frac{\\pi}{' + (2 * k) + '}', ans: ansN('I=', v), val: val(v), steps: ['Primitiva: ' + i$(cterm(F(A, k), '\\sin ' + kk(k), true)), 'Barrow: ' + d$('\\left[' + cterm(F(A, k), '\\sin ' + kk(k), true) + '\\right]_0^{\\pi/' + 2 * k + '}=' + G.ftexp(F(A, k)) + '\\left(\\sin\\frac{\\pi}{2}-\\sin 0\\right)=' + ftex(v))], mistakes: [{ value: F(A), msg: 'falta dividir entre $' + k + '$, la derivada de $' + k + 'x$.' }] }; },
        () => { const A = nz(-4, 4), k = rnd.int(1, 3), v = F(2 * A, k); return { ftex: cf(A, '\\sin ' + kk(k)), f: (x) => A * Math.sin(k * x), a: 0, b: pi / k, aT: '0', bT: '\\frac{\\pi}{' + k + '}', ans: ansN('I=', v), val: val(v), steps: ['Primitiva: ' + i$(cterm(F(-A, k), '\\cos ' + kk(k), true)), 'Barrow: ' + d$('\\left[' + cterm(F(-A, k), '\\cos ' + kk(k), true) + '\\right]_0^{\\pi/' + k + '}=' + G.ftexp(F(-A, k)) + '\\left(\\cos\\pi-\\cos 0\\right)=' + G.ftexp(F(-A, k)) + '\\cdot(-2)=' + ftex(v))], mistakes: [{ value: F(-2 * A, k), msg: 'cuidado con el signo: $\\int\\sin u\\,u\'dx=-\\cos u$ y luego $\\cos\\pi-\\cos0=-2$.' }] }; },
        () => { const A = nz(-3, 3), B = nz(-3, 3); const v = 2 * A + B * pi * pi / 2; return { ftex: cf(A, '\\sin x') + sgnT(B, 'x'), f: (x) => A * Math.sin(x) + B * x, a: 0, b: pi, aT: '0', bT: '\\pi', ans: ansE('I=', v), val: v, steps: ['Primitiva: ' + i$('F(x)=' + cf(-A, '\\cos x') + (B < 0 ? '-' : '+') + '\\frac{' + Math.abs(B) + '}{2}x^2'), 'Barrow: ' + d$('F(\\pi)-F(0)=' + (-A) + '\\cdot(-1)-(' + (-A) + ')+\\frac{' + B + '\\pi^2}{2}=' + 2 * A + '+\\frac{' + B + '\\pi^2}{2}')], mistakes: [{ value: B * pi * pi / 2, msg: 'falta la parte del seno: $\\int_0^\\pi\\sin x\\,dx=2$.' }] }; },
      ])();
    }
    // lnarc
    return rnd.pick([
      () => {
        const A = rnd.int(1, 4), u0 = rnd.int(1, 3), u1 = rnd.int(u0 + 1, 9), m = rnd.int(-2, 2);
        const a = u0 - m, b = u1 - m, v = A * Math.log(u1 / u0);
        return { ftex: '\\dfrac{' + A + '}{' + pt([m, 1]) + '}', f: (x) => A / (x + m), a, b, aT: String(a), bT: String(b), ans: ansE('I=', v), val: v, steps: ['Primitiva: ' + i$('\\int\\dfrac{' + A + '}{' + pt([m, 1]) + '}dx=' + A + '\\ln|' + pt([m, 1]) + '|'), 'Barrow: ' + d$(A + '\\left(\\ln ' + u1 + '-\\ln ' + u0 + '\\right)=' + A + lnT(u1, u0))], mistakes: [{ value: A * (u1 - u0), msg: 'la integral de $\\frac1u$ es un logaritmo, no una potencia: $\\ln|u|$.' }] };
      },
      () => { const A = rnd.int(1, 4), up = rnd.pick(['1', '\\sqrt3']), v = A * (up === '1' ? pi / 4 : pi / 3); return { ftex: '\\dfrac{' + A + '}{1+x^2}', f: (x) => A / (1 + x * x), a: 0, b: up === '1' ? 1 : Math.sqrt(3), aT: '0', bT: up, ans: ansE('I=', v), val: v, steps: ['Primitiva: ' + i$('\\int\\dfrac{' + A + '}{1+x^2}dx=' + A + '\\arctan x'), 'Barrow: ' + d$(A + '\\left(\\arctan ' + up + '-\\arctan 0\\right)=' + A + '\\cdot' + (up === '1' ? '\\frac{\\pi}{4}' : '\\frac{\\pi}{3}')) ], mistakes: [{ value: A * (up === '1' ? 1 : Math.sqrt(3)), msg: '$\\int\\frac{1}{1+x^2}dx=\\arctan x$, no $x$: el resultado lleva $\\pi$.' }] }; },
      () => { const A = rnd.int(1, 4), [upT, upV, den] = rnd.pick([['\\frac12', 0.5, 6], ['\\frac{\\sqrt2}{2}', Math.SQRT1_2, 4], ['\\frac{\\sqrt3}{2}', Math.sqrt(3) / 2, 3]]), v = A * pi / den; return { ftex: '\\dfrac{' + A + '}{\\sqrt{1-x^2}}', f: (x) => A / Math.sqrt(1 - x * x), a: 0, b: upV, aT: '0', bT: upT, ans: ansE('I=', v), val: v, steps: ['Primitiva: ' + i$('\\int\\dfrac{' + A + '}{\\sqrt{1-x^2}}dx=' + A + '\\arcsin x'), 'Barrow: ' + d$(A + '\\left(\\arcsin ' + upT + '-\\arcsin 0\\right)=' + A + '\\cdot\\frac{\\pi}{' + den + '}')], mistakes: [{ value: A * upV, msg: '$\\int\\frac{1}{\\sqrt{1-x^2}}dx=\\arcsin x$ y su valor en el límite es un ángulo (con $\\pi$), no el propio límite.' }] }; },
    ])();
  }

  def({
    id: 'int-barrow',
    title: 'Integral definida (regla de Barrow)',
    help: [
      'Regla de Barrow: si $F$ es una primitiva de $f$, ' + '$\\displaystyle\\int_a^bf(x)\\,dx=F(b)-F(a)$. Primero se busca la primitiva (sin $+C$), después se evalúa en el extremo superior y se <b>resta</b> el valor en el inferior.',
      'Ejemplo: $\\displaystyle\\int_0^2(3x^2+1)\\,dx$. Primitiva $F(x)=x^3+x$. Entonces $F(2)-F(0)=(8+2)-0=10$. Con funciones como $\\cos x$, $e^x$ o $\\frac1x$ el resultado puede contener $\\pi$, $e$ o $\\ln$ (se escribe `pi`, `e^2`, `ln(3)`...).',
    ],
    params: [{ key: 'tipo', label: 'Función', options: [['pol', 'Polinomio'], ['pot', 'Potencias y raíces'], ['exp', 'Exponencial'], ['trig', 'Trigonométrica'], ['lnarc', 'Logaritmo y arcotangente']] }],
    generate(p) {
      const C = barrowCase(p.tipo);
      return {
        prompt: 'Calcula ' + i$('\\displaystyle\\int_{' + C.aT + '}^{' + C.bT + '}' + wrapSum(C.ftex) + '\\,dx') + '.' + (C.ans.kind === 'expr' ? ' (Exacto o con 3-4 decimales.)' : ''),
        answer: C.ans,
        steps: C.steps,
        mistakes: C.mistakes,
        data: { f: C.f, a: C.a, b: C.b },
      };
    },
  });

  /* ===================== 3. Sustitución / cambio de variable ===================== */
  function sustCase(tipo) {
    if (tipo === 'comp') {
      return rnd.pick([
        () => { const A = rnd.int(1, 4), b = rnd.int(1, 2); const v = A * (Math.exp(b * b) - 1) / 2; return { ftex: cf(A, 'x') + 'e^{x^2}', f: (x) => A * x * Math.exp(x * x), a: 0, b, aT: '0', bT: String(b), ans: ansE('I=', v), val: v, steps: ['Cambio ' + i$('t=x^2') + ', ' + i$('dt=2x\\,dx') + ', así que ' + i$('x\\,dx=\\frac{dt}{2}') + '. Límites: ' + i$('x=0\\to t=0') + ', ' + i$('x=' + b + '\\to t=' + b * b) + '.', d$('\\int_0^{' + b * b + '}\\frac{' + A + '}{2}e^t\\,dt=\\frac{' + A + '}{2}\\left(e^{' + b * b + '}-1\\right)')], mistakes: [{ value: A * (Math.exp(b * b) - 1), msg: 'al hacer $t=x^2$, $dt=2x\\,dx$: el $x\\,dx$ del integrando es $\\frac{dt}{2}$, falta el factor $\\frac12$.' }] }; },
        () => { const k = rnd.int(1, 3), b = rnd.int(1, 3); const v = Math.log((b * b + k) / k); return { ftex: '\\dfrac{2x}{x^2+' + k + '}', f: (x) => 2 * x / (x * x + k), a: 0, b, aT: '0', bT: String(b), ans: ansE('I=', v), val: v, steps: ['El numerador es la derivada del denominador: ' + i$('\\int\\frac{u\'}{u}dx=\\ln|u|') + ' con ' + i$('u=x^2+' + k) + '.', d$('\\Big[\\ln(x^2+' + k + ')\\Big]_0^{' + b + '}=\\ln ' + (b * b + k) + '-\\ln ' + k + '=' + lnT(b * b + k, k))], mistakes: [{ value: Math.log(b * b + k), msg: 'falta restar el valor en el extremo inferior: $F(b)-F(a)$ con $F(0)=\\ln ' + k + '$.' }] }; },
        () => { const A = rnd.int(1, 4), k = rnd.int(1, 3); const v = A * Math.log((k + 1) / k); return { ftex: '\\dfrac{' + A + '\\cos x}{' + k + '+\\sin x}', f: (x) => A * Math.cos(x) / (k + Math.sin(x)), a: 0, b: pi / 2, aT: '0', bT: '\\frac{\\pi}{2}', ans: ansE('I=', v), val: v, steps: ['Cambio ' + i$('t=' + k + '+\\sin x') + ', ' + i$('dt=\\cos x\\,dx') + '. Límites: ' + i$('t=' + k) + ' y ' + i$('t=' + (k + 1)) + '.', d$('\\int_{' + k + '}^{' + (k + 1) + '}\\frac{' + A + '}{t}dt=' + A + '\\ln ' + (k + 1) + '-' + A + '\\ln ' + k + '=' + A + lnT(k + 1, k))], mistakes: [{ value: A * Math.log(k + 1), msg: 'falta $F(a)$: en $x=0$ la primitiva vale $' + A + '\\ln ' + k + '$, y hay que restarlo.' }] }; },
        () => { const A = rnd.int(1, 3), n = rnd.int(2, 4); const v = F(A, n + 1); return { ftex: A + '\\sin x\\cos^{' + n + '}x', f: (x) => A * Math.sin(x) * Math.cos(x) ** n, a: 0, b: pi / 2, aT: '0', bT: '\\frac{\\pi}{2}', ans: ansN('I=', v), val: val(v), steps: ['Cambio ' + i$('t=\\cos x') + ', ' + i$('dt=-\\sin x\\,dx') + '. Límites: ' + i$('t=1') + ' (en ' + i$('x=0') + ') y ' + i$('t=0') + ' (en ' + i$('x=\\frac\\pi2') + ').', d$('\\int_1^0(-' + A + ')t^{' + n + '}dt=\\int_0^1' + A + 't^{' + n + '}dt=\\frac{' + A + '}{' + (n + 1) + '}=' + ftex(v))], mistakes: [{ value: F(-A, n + 1), msg: 'cuidado con el signo y los límites: $dt=-\\sin x\\,dx$ cambia el signo, y al invertir los límites ($1\\to0$) vuelve a cambiar.' }] }; },
        () => { const A = rnd.int(1, 3), k = rnd.int(1, 3); const v = A * (pi / 8); return { ftex: '\\dfrac{' + A + 'x}{1+x^4}', f: (x) => A * x / (1 + x ** 4), a: 0, b: 1, aT: '0', bT: '1', ans: ansE('I=', v), val: v, steps: ['Cambio ' + i$('t=x^2') + ', ' + i$('dt=2x\\,dx') + '. Límites: ' + i$('0') + ' y ' + i$('1') + '.', d$('\\int_0^1\\frac{' + A + '}{2}\\cdot\\frac{dt}{1+t^2}=\\frac{' + A + '}{2}\\Big[\\arctan t\\Big]_0^1=\\frac{' + A + '}{2}\\cdot\\frac{\\pi}{4}=\\frac{' + A + '\\pi}{8}')], mistakes: [{ value: A * pi / 4, msg: 'falta el factor $\\frac12$: $x\\,dx=\\frac{dt}{2}$.' }], k }; },
      ])();
    }
    if (tipo === 'raiz') {
      // ∫_a^b x√(x+k) dx con x+k = t^2
      const k = rnd.int(1, 4), s = rnd.int(1, 2), t = rnd.int(s + 1, 4);
      const a = s * s - k, b = t * t - k;
      const Fq = (u) => fmul(F(2), fsub(F(u ** 5, 5), F(k * u ** 3, 3)));
      const v = fsub(Fq(t), Fq(s));
      return {
        ftex: 'x\\sqrt{x+' + k + '}', f: (x) => x * Math.sqrt(x + k), a, b, aT: String(a), bT: String(b), ans: ansN('I=', v), val: val(v),
        steps: [
          'Cambio ' + i$('t=\\sqrt{x+' + k + '}') + ': ' + i$('x=t^2-' + k) + ', ' + i$('dx=2t\\,dt') + '. Límites: ' + i$('t=' + s) + ' y ' + i$('t=' + t) + '.',
          d$('\\int_{' + s + '}^{' + t + '}(t^2-' + k + ')\\,t\\,2t\\,dt=2\\int_{' + s + '}^{' + t + '}(t^4-' + k + 't^2)\\,dt=2\\left[\\frac{t^5}{5}-\\frac{' + k + 't^3}{3}\\right]_{' + s + '}^{' + t + '}=' + ftex(v)),
        ],
        mistakes: [{ value: fsub(F(2 * t ** 5, 5), F(2 * k * t ** 3, 3)), msg: 'no basta con evaluar en el límite superior: hay que restar el valor en $t=' + s + '$ (y recuerda que los límites cambian a $t$).' }],
      };
    }
    if (tipo === 'raiz2') {
      const s = rnd.int(0, 2), t = rnd.int(s + 1, 4);
      const v = 2 * (t - s) - 2 * Math.log((1 + t) / (1 + s));
      return {
        ftex: '\\dfrac{1}{1+\\sqrt{x}}', f: (x) => 1 / (1 + Math.sqrt(x)), a: s * s, b: t * t, aT: String(s * s), bT: String(t * t), ans: ansE('I=', v), val: v,
        steps: [
          'Cambio ' + i$('t=\\sqrt x') + ': ' + i$('x=t^2') + ', ' + i$('dx=2t\\,dt') + '. Límites: ' + i$('t=' + s) + ' y ' + i$('t=' + t) + '.',
          d$('\\int_{' + s + '}^{' + t + '}\\frac{2t}{1+t}dt=2\\int_{' + s + '}^{' + t + '}\\left(1-\\frac{1}{1+t}\\right)dt=2\\Big[t-\\ln(1+t)\\Big]_{' + s + '}^{' + t + '}'),
          'Resultado: ' + i$('2(' + t + '-' + s + ')-2\\left(\\ln ' + (1 + t) + '-\\ln ' + (1 + s) + '\\right)\\approx ' + String(Math.round(v * 1e4) / 1e4).replace('.', '{,}')) + '.',
        ],
        mistakes: [{ value: 2 * (t - s), msg: 'falta dividir $\\frac{2t}{1+t}$ antes de integrar: $\\frac{2t}{1+t}=2-\\frac{2}{1+t}$, y aparece un logaritmo.' }],
      };
    }
    if (tipo === 'expraiz') {
      const m = rnd.int(1, 3);
      const v = 2 * (m - 1) * Math.exp(m) + 2;
      return {
        ftex: 'e^{\\sqrt{x}}', f: (x) => Math.exp(Math.sqrt(x)), a: 0, b: m * m, aT: '0', bT: String(m * m), ans: ansE('I=', v), val: v,
        steps: [
          'Cambio ' + i$('t=\\sqrt x') + ': ' + i$('x=t^2') + ', ' + i$('dx=2t\\,dt') + '. Límites: ' + i$('t=0') + ' y ' + i$('t=' + m) + '.',
          'Queda ' + i$('\\int_0^{' + m + '}2te^t\\,dt') + ', que se hace por partes: ' + d$('\\Big[2(t-1)e^t\\Big]_0^{' + m + '}=2(' + m + '-1)e^{' + m + '}-2(-1)=' + 2 * (m - 1) + 'e^{' + m + '}+2'),
        ],
        mistakes: [{ value: 2 * (m - 1) * Math.exp(m), msg: 'falta restar $F(0)$: la primitiva $2(t-1)e^t$ vale $-2$ en $t=0$.' }].filter(() => m > 1),
      };
    }
    // exp: e^{2x}/(e^x+1), t=e^x
    const m = rnd.int(2, 5);
    const v = (m - 1) - Math.log((m + 1) / 2);
    return {
      ftex: '\\dfrac{e^{2x}}{e^x+1}', f: (x) => Math.exp(2 * x) / (Math.exp(x) + 1), a: 0, b: Math.log(m), aT: '0', bT: '\\ln ' + m, ans: ansE('I=', v), val: v,
      steps: [
        'Cambio ' + i$('t=e^x') + ': ' + i$('dt=e^x dx') + ', ' + i$('dx=\\frac{dt}{t}') + '. Límites: ' + i$('t=1') + ' y ' + i$('t=' + m) + '.',
        d$('\\int_1^{' + m + '}\\frac{t^2}{t+1}\\cdot\\frac{dt}{t}=\\int_1^{' + m + '}\\frac{t}{t+1}dt=\\int_1^{' + m + '}\\left(1-\\frac{1}{t+1}\\right)dt=\\Big[t-\\ln(t+1)\\Big]_1^{' + m + '}'),
        'Resultado: ' + i$((m - 1) + '-\\left(\\ln ' + (m + 1) + '-\\ln 2\\right)=' + (m - 1) + '-' + lnT(m + 1, 2)) + '.',
      ],
      mistakes: [{ value: m - 1, msg: 'falta la parte logarítmica: $\\frac{t}{t+1}=1-\\frac{1}{t+1}$.' }],
    };
  }

  def({
    id: 'int-sustitucion',
    title: 'Cambio de variable',
    help: [
      'Se llama $t=g(x)$ y se calcula $dt=g\'(x)\\,dx$. En una integral <b>definida</b> se cambian también los límites ($x=a\\to t=g(a)$, $x=b\\to t=g(b)$) y ya no hay que deshacer el cambio.',
      'Ejemplo: $\\displaystyle\\int_0^1\\frac{x}{x^2+1}dx$. Con $t=x^2+1$, $dt=2x\\,dx$ y los límites pasan a $t=1$ y $t=2$: $\\displaystyle\\int_1^2\\frac{1}{2t}dt=\\frac12\\Big[\\ln t\\Big]_1^2=\\frac{\\ln2}{2}$. Con raíces, $t=\\sqrt{\\cdots}$ elimina la raíz.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['comp', 'Función compuesta (u\' en el integrando)'], ['raiz', 'Raíz: x·√(x+k)'], ['raiz2', 'Raíz: 1/(1+√x)'], ['expraiz', 'Exponencial de raíz'], ['exp', 'Exponencial: t = e^x']] }],
    generate(p) {
      const C = sustCase(p.tipo);
      return {
        prompt: 'Calcula ' + i$('\\displaystyle\\int_{' + C.aT + '}^{' + C.bT + '}' + wrapSum(C.ftex) + '\\,dx') + ' con un cambio de variable.' + (C.ans.kind === 'expr' ? ' (Exacto o con 3-4 decimales.)' : ''),
        answer: C.ans,
        steps: C.steps,
        mistakes: C.mistakes,
        data: { f: C.f, a: C.a, b: C.b },
      };
    },
  });

  /* ===================== 4. Integración por partes ===================== */
  def({
    id: 'int-partes',
    title: 'Integración por partes',
    help: [
      '$\\displaystyle\\int u\\,dv=uv-\\int v\\,du$. Se elige $u$ con la regla ALPES (Arcotangente, Logaritmo, Polinomio, Exponencial, Seno/coseno): lo primero que aparezca es $u$, y el resto es $dv$. En una integral definida: $\\displaystyle\\int_a^bu\\,dv=\\Big[uv\\Big]_a^b-\\int_a^bv\\,du$.',
      'Ejemplo: $\\displaystyle\\int_0^1xe^x\\,dx$. Con $u=x$, $dv=e^xdx$: $du=dx$, $v=e^x$. Entonces $\\Big[xe^x\\Big]_0^1-\\int_0^1e^xdx=e-(e-1)=1$.',
    ],
    params: [{ key: 'tipo', label: 'Integral', options: [['xe', 'x · e^(kx)'], ['xtrig', 'x · sen(kx) o x · cos(kx)'], ['xln', 'xⁿ · ln x'], ['x2e', 'x² · eˣ'], ['arc', 'Arcotangente']] }],
    generate(p) {
      let ftex, f, a, b, aT, bT, v, steps, mistakes;
      if (p.tipo === 'xe') {
        const k = rnd.pick([1, 2, 3, -1]);
        v = ((k - 1) * Math.exp(k) + 1) / (k * k);
        ftex = 'x\\,e^{' + (k === 1 ? '' : k === -1 ? '-' : k) + 'x}'; f = (x) => x * Math.exp(k * x); a = 0; b = 1; aT = '0'; bT = '1';
        steps = [
          'Tomamos ' + i$('u=x') + ', ' + i$('dv=e^{' + k + 'x}dx') + ': ' + i$('du=dx') + ', ' + i$('v=\\dfrac{e^{' + k + 'x}}{' + par(k) + '}') + '.',
          d$('\\Big[\\frac{x\\,e^{' + k + 'x}}{' + par(k) + '}\\Big]_0^1-\\frac{1}{' + par(k) + '}\\int_0^1e^{' + k + 'x}dx=\\frac{e^{' + k + '}}{' + par(k) + '}-\\frac{e^{' + k + '}-1}{' + par(k * k) + '}'),
          'Valor: ' + i$('\\dfrac{(' + (k - 1) + ')e^{' + k + '}+1}{' + k * k + '}\\approx ' + String(Math.round(v * 1e4) / 1e4).replace('.', '{,}')) + '.',
        ];
        mistakes = [{ value: Math.exp(k) - (Math.exp(k) - 1) / k, msg: 'al integrar $e^{' + k + 'x}$ se obtiene $\\frac{e^{' + k + 'x}}{' + k + '}$: el $v$ también lleva el factor $\\frac1{' + k + '}$.' }];
      } else if (p.tipo === 'xtrig') {
        const k = rnd.int(1, 3), isSin = rnd.pick([true, false]);
        if (isSin) {
          v = pi / (k * k); ftex = 'x\\sin ' + (k === 1 ? '' : k) + 'x'; f = (x) => x * Math.sin(k * x); a = 0; b = pi / k; aT = '0'; bT = '\\frac{\\pi}{' + k + '}';
          steps = [
            'Tomamos ' + i$('u=x') + ', ' + i$('dv=\\sin ' + k + 'x\\,dx') + ': ' + i$('v=-\\dfrac{\\cos ' + k + 'x}{' + k + '}') + '.',
            d$('\\Big[-\\frac{x\\cos ' + k + 'x}{' + k + '}\\Big]_0^{\\pi/' + k + '}+\\frac1{' + k + '}\\int_0^{\\pi/' + k + '}\\cos ' + k + 'x\\,dx=\\frac{\\pi}{' + k + '^2}+\\frac{1}{' + k + '^2}\\Big[\\sin ' + k + 'x\\Big]_0^{\\pi/' + k + '}=\\frac{\\pi}{' + k * k + '}'),
          ];
          mistakes = [{ value: -pi / (k * k), msg: 'el signo: $\\int\\sin kx\\,dx=-\\frac{\\cos kx}{k}$, y en el límite superior $\\cos\\pi=-1$, así que los dos signos menos se cancelan.' }];
        } else {
          v = pi / (2 * k * k) - 1 / (k * k); ftex = 'x\\cos ' + (k === 1 ? '' : k) + 'x'; f = (x) => x * Math.cos(k * x); a = 0; b = pi / (2 * k); aT = '0'; bT = '\\frac{\\pi}{' + 2 * k + '}';
          steps = [
            'Tomamos ' + i$('u=x') + ', ' + i$('dv=\\cos ' + k + 'x\\,dx') + ': ' + i$('v=\\dfrac{\\sin ' + k + 'x}{' + k + '}') + '.',
            d$('\\Big[\\frac{x\\sin ' + k + 'x}{' + k + '}\\Big]_0^{\\pi/' + 2 * k + '}-\\frac1{' + k + '}\\int_0^{\\pi/' + 2 * k + '}\\sin ' + k + 'x\\,dx=\\frac{\\pi}{' + 2 * k * k + '}-\\frac{1}{' + k * k + '}\\Big[-\\cos ' + k + 'x\\Big]_0^{\\pi/' + 2 * k + '}=\\frac{\\pi}{' + 2 * k * k + '}-\\frac1{' + k * k + '}'),
          ];
          mistakes = [{ value: pi / (2 * k * k), msg: 'te falta la segunda parte: $-\\int v\\,du$ con $v=\\frac{\\sin kx}{k}$ aporta $-\\frac{1}{k^2}$.' }];
        }
        steps.push('Valor: ' + i$('\\approx ' + String(Math.round(v * 1e4) / 1e4).replace('.', '{,}')) + '.');
      } else if (p.tipo === 'xln') {
        const n = rnd.int(1, 3);
        v = (n * Math.exp(n + 1) + 1) / ((n + 1) * (n + 1));
        ftex = (n === 0 ? '' : n === 1 ? 'x' : 'x^{' + n + '}') + '\\ln x'; f = (x) => x ** n * Math.log(x); a = 1; b = E; aT = '1'; bT = 'e';
        steps = [
          'Por ALPES, ' + i$('u=\\ln x') + ' y ' + i$('dv=' + (n === 0 ? '1' : n === 1 ? 'x' : 'x^{' + n + '}') + 'dx') + ': ' + i$('du=\\dfrac{dx}{x}') + ', ' + i$('v=\\dfrac{x^{' + (n + 1) + '}}{' + (n + 1) + '}') + '.',
          d$('\\Big[\\frac{x^{' + (n + 1) + '}}{' + (n + 1) + '}\\ln x\\Big]_1^e-\\int_1^e\\frac{' + (n === 1 ? 'x' : 'x^{' + n + '}') + '}{' + (n + 1) + '}dx=\\frac{e^{' + (n + 1) + '}}{' + (n + 1) + '}-\\frac{e^{' + (n + 1) + '}-1}{' + (n + 1) * (n + 1) + '}'),
          'Valor: ' + i$('\\dfrac{' + (n === 1 ? '' : n) + 'e^{' + (n + 1) + '}+1}{' + (n + 1) * (n + 1) + '}\\approx ' + String(Math.round(v * 1e4) / 1e4).replace('.', '{,}')) + '.',
        ];
        mistakes = [{ value: Math.exp(n + 1) / (n + 1), msg: 'te falta la integral $-\\int v\\,du=-\\int_1^e\\frac{' + (n === 1 ? 'x' : 'x^{' + n + '}') + '}{' + (n + 1) + '}dx$.' }];
      } else if (p.tipo === 'x2e') {
        const m = rnd.int(1, 3);
        v = (m * m - 2 * m + 2) * Math.exp(m) - 2;
        ftex = 'x^2e^{x}'; f = (x) => x * x * Math.exp(x); a = 0; b = m; aT = '0'; bT = String(m);
        steps = [
          'Se aplica dos veces. Primero ' + i$('u=x^2') + ', ' + i$('dv=e^xdx') + ': ' + d$('\\int x^2e^xdx=x^2e^x-2\\int xe^xdx'),
          'Segunda vez, ' + i$('u=x') + ': ' + i$('\\int xe^xdx=xe^x-e^x') + '. Primitiva: ' + i$('(x^2-2x+2)e^x') + '.',
          'Barrow: ' + d$('(' + (m * m) + '-' + 2 * m + '+2)e^{' + m + '}-2=' + (m * m - 2 * m + 2) + 'e^{' + m + '}-2'),
        ];
        mistakes = [{ value: (m * m - 2 * m + 2) * Math.exp(m), msg: 'falta restar el valor de la primitiva en $x=0$: $(0-0+2)e^0=2$.' }];
      } else {
        const times = rnd.pick([false, true]);
        if (!times) {
          v = pi / 4 - Math.log(2) / 2; ftex = '\\arctan x'; f = (x) => Math.atan(x); a = 0; b = 1; aT = '0'; bT = '1';
          steps = [
            'Tomamos ' + i$('u=\\arctan x') + ', ' + i$('dv=dx') + ': ' + i$('du=\\dfrac{dx}{1+x^2}') + ', ' + i$('v=x') + '.',
            d$('\\Big[x\\arctan x\\Big]_0^1-\\int_0^1\\frac{x}{1+x^2}dx=\\frac\\pi4-\\frac12\\Big[\\ln(1+x^2)\\Big]_0^1=\\frac\\pi4-\\frac{\\ln2}{2}'),
          ];
          mistakes = [{ value: pi / 4, msg: 'te falta $-\\int v\\,du=-\\int_0^1\\frac{x}{1+x^2}dx=-\\frac{\\ln 2}{2}$.' }];
        } else {
          v = pi / 4 - 0.5; ftex = 'x\\arctan x'; f = (x) => x * Math.atan(x); a = 0; b = 1; aT = '0'; bT = '1';
          steps = [
            'Por ALPES, ' + i$('u=\\arctan x') + ', ' + i$('dv=x\\,dx') + ': ' + i$('du=\\dfrac{dx}{1+x^2}') + ', ' + i$('v=\\dfrac{x^2}{2}') + '.',
            d$('\\Big[\\frac{x^2}{2}\\arctan x\\Big]_0^1-\\frac12\\int_0^1\\frac{x^2}{1+x^2}dx=\\frac\\pi8-\\frac12\\int_0^1\\left(1-\\frac{1}{1+x^2}\\right)dx=\\frac\\pi8-\\frac12\\left(1-\\frac\\pi4\\right)=\\frac\\pi4-\\frac12'),
          ];
          mistakes = [{ value: pi / 8, msg: 'te falta $-\\int v\\,du$: $\\frac{x^2}{1+x^2}=1-\\frac{1}{1+x^2}$ aporta $-\\frac12+\\frac\\pi8$.' }];
        }
      }
      return {
        prompt: 'Calcula ' + i$('\\displaystyle\\int_{' + aT + '}^{' + bT + '}' + ftex + '\\,dx') + ' por partes. (Exacto o con 3-4 decimales.)',
        answer: ansE('I=', v), steps, mistakes,
        data: { f, a, b },
      };
    },
  });

  /* ===================== 5. Integrales racionales ===================== */
  def({
    id: 'int-racionales',
    title: 'Integrales racionales',
    help: [
      'Si $\\operatorname{gr}P\\ge\\operatorname{gr}Q$, se divide primero. Con raíces simples, $\\dfrac{px+q}{(x-r_1)(x-r_2)}=\\dfrac{A}{x-r_1}+\\dfrac{B}{x-r_2}$ ($A$ se obtiene evaluando en $x=r_1$ y $B$ en $x=r_2$); con raíz doble, $\\dfrac{A}{x-r}+\\dfrac{B}{(x-r)^2}$. Se integra con $\\int\\frac{dx}{x-r}=\\ln|x-r|$ y $\\int\\frac{dx}{(x-r)^2}=-\\frac{1}{x-r}$.',
      'Ejemplo: $\\dfrac{3x+5}{(x-1)(x+3)}=\\dfrac{A}{x-1}+\\dfrac{B}{x+3}$ implica $3x+5=A(x+3)+B(x-1)$. Con $x=1$: $8=4A$, $A=2$. Con $x=-3$: $-4=-4B$, $B=1$. Luego $\\int=2\\ln|x-1|+\\ln|x+3|+C$.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['coef', 'Descomponer en fracciones simples'], ['simples', 'Integral con raíces simples'], ['doble', 'Integral con raíz doble'], ['dividir', 'Hay que dividir antes']] }],
    generate(p) {
      if (p.tipo === 'coef') {
        let r1, r2;
        do { r1 = rnd.int(-3, 3); r2 = rnd.int(-3, 3); } while (r1 >= r2);
        const A = nz(-4, 4), B = nz(-4, 4);
        const num = [-(A * r2 + B * r1), A + B];
        return {
          prompt: 'Descompón ' + i$('\\dfrac{' + pt(num) + '}{' + lin(r1) + lin(r2) + '}') + ' como ' + i$('\\dfrac{A}{' + lin(r1) + '}+\\dfrac{B}{' + lin(r2) + '}') + ' y halla ' + i$('A') + ' y ' + i$('B') + '.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'A=', value: F(A) }, { kind: 'number', label: 'B=', value: F(B) }] },
          steps: [
            'Quitamos denominadores: ' + d$(pt(num) + '=A\\,' + lin(r2) + '+B\\,' + lin(r1)),
            'Con ' + i$('x=' + r1) + ': ' + i$(pevN(num, r1) + '=A(' + (r1 - r2) + ')') + ', luego ' + i$('A=' + A) + '.',
            'Con ' + i$('x=' + r2) + ': ' + i$(pevN(num, r2) + '=B(' + (r2 - r1) + ')') + ', luego ' + i$('B=' + B) + '.',
          ],
          data: { tipo: 'coef', num, r1, r2, A, B },
        };
      }
      if (p.tipo === 'simples') {
        let r1, r2;
        do { r1 = rnd.int(-2, 2); r2 = rnd.int(-2, 2); } while (r1 >= r2);
        const A = nz(-3, 4), B = nz(-3, 4);
        const num = [-(A * r2 + B * r1), A + B];
        const a = r2 + 1, b = a + rnd.int(1, 4);
        const v = A * Math.log((b - r1) / (a - r1)) + B * Math.log((b - r2) / (a - r2));
        const vSwap = B * Math.log((b - r1) / (a - r1)) + A * Math.log((b - r2) / (a - r2));
        return {
          prompt: 'Calcula ' + i$('\\displaystyle\\int_{' + a + '}^{' + b + '}\\dfrac{' + pt(num) + '}{' + lin(r1) + lin(r2) + '}\\,dx') + '. (Exacto o con 3-4 decimales.)',
          answer: ansE('I=', v),
          steps: [
            'Descomposición: ' + i$('\\dfrac{' + pt(num) + '}{' + lin(r1) + lin(r2) + '}=\\dfrac{A}{' + lin(r1) + '}+\\dfrac{B}{' + lin(r2) + '}') + ' con ' + i$('A=' + A) + ' (en ' + i$('x=' + r1) + ') y ' + i$('B=' + B) + ' (en ' + i$('x=' + r2) + ').',
            d$('\\int_{' + a + '}^{' + b + '}\\left(\\frac{' + A + '}{' + lin(r1) + '}+\\frac{' + B + '}{' + lin(r2) + '}\\right)dx=\\Big[' + A + '\\ln|' + (r1 === 0 ? 'x' : 'x' + (r1 < 0 ? '+' + -r1 : '-' + r1)) + '|+' + par(B) + '\\ln|' + (r2 === 0 ? 'x' : 'x' + (r2 < 0 ? '+' + -r2 : '-' + r2)) + '|\\Big]_{' + a + '}^{' + b + '}'),
            'Evaluando: ' + i$(A + '\\ln\\frac{' + (b - r1) + '}{' + (a - r1) + '}+' + par(B) + '\\ln\\frac{' + (b - r2) + '}{' + (a - r2) + '}\\approx ' + String(Math.round(v * 1e4) / 1e4).replace('.', '{,}')) + '.',
          ],
          mistakes: [{ value: vSwap, msg: 'has cruzado $A$ y $B$: $A$ es el coeficiente de $\\frac{1}{x-(' + r1 + ')}$ y se halla evaluando en $x=' + r1 + '$.' }],
          data: { f: (x) => pevN(num, x) / ((x - r1) * (x - r2)), a, b },
        };
      }
      if (p.tipo === 'doble') {
        let r, pp, q, B;
        do { r = rnd.int(-2, 2); pp = nz(-3, 3); q = rnd.int(-5, 5); B = q + pp * r; } while (B === 0);
        const a = r + 1, b = a + rnd.int(1, 4);
        const v = pp * Math.log((b - r) / (a - r)) + B * (1 / (a - r) - 1 / (b - r));
        const sq = '(x' + (r === 0 ? '' : r < 0 ? '+' + -r : '-' + r) + ')^2';
        const den = r === 0 ? 'x^2' : sq;
        return {
          prompt: 'Calcula ' + i$('\\displaystyle\\int_{' + a + '}^{' + b + '}\\dfrac{' + pt([q, pp]) + '}{' + den + '}\\,dx') + '. (Exacto o con 3-4 decimales.)',
          answer: ansE('I=', v),
          steps: [
            (r === 0 ? 'Separamos en dos fracciones: ' : 'Escribimos el numerador en función de ' + i$(lin(r)) + ': ' + i$(pt([q, pp]) + '=' + pp + lin(r) + cst(B)) + ', luego ') + d$('\\frac{' + pt([q, pp]) + '}{' + den + '}=\\frac{' + pp + '}{' + lin(r) + '}+\\frac{' + B + '}{' + den + '}'),
            d$('\\Big[' + pp + '\\ln|' + (r === 0 ? 'x' : 'x' + (r < 0 ? '+' + -r : '-' + r)) + '|-\\frac{' + B + '}{' + lin(r) + '}\\Big]_{' + a + '}^{' + b + '}'),
            'Evaluando: ' + i$('\\approx ' + String(Math.round(v * 1e4) / 1e4).replace('.', '{,}')) + '.',
          ],
          mistakes: [{ value: pp * Math.log((b - r) / (a - r)) + B * Math.log((b - r) / (a - r)), msg: 'la integral de $\\frac{1}{(x-r)^2}$ <b>no</b> es un logaritmo: es $-\\frac{1}{x-r}$ (sólo el grado 1 en el denominador da $\\ln$).' }],
          data: { f: (x) => (pp * x + q) / ((x - r) * (x - r)), a, b },
        };
      }
      let r, m, n, R;
      do { r = rnd.int(-2, 2); m = rnd.int(-3, 3); n = rnd.int(-4, 4); R = r * r + m * r + n; } while (R === 0);
      const a = r + 1, b = a + rnd.int(1, 3);
      const polyPart = 'x' + (m + r === 0 ? '' : cst(m + r));
      const v = (b * b - a * a) / 2 + (m + r) * (b - a) + R * Math.log((b - r) / (a - r));
      return {
        prompt: 'Calcula ' + i$('\\displaystyle\\int_{' + a + '}^{' + b + '}\\dfrac{' + pt([n, m, 1]) + '}{' + lin(r) + '}\\,dx') + '. (Exacto o con 3-4 decimales.)',
        answer: ansE('I=', v),
        steps: [
          'El grado del numerador es mayor: dividimos. ' + d$('\\frac{' + pt([n, m, 1]) + '}{' + lin(r) + '}=' + polyPart + (R < 0 ? '-' : '+') + '\\frac{' + Math.abs(R) + '}{' + lin(r) + '}'),
          'Integramos: ' + d$('\\int_{' + a + '}^{' + b + '}\\left(' + polyPart + '\\right)dx+' + par(R) + '\\Big[\\ln|' + (r === 0 ? 'x' : 'x' + (r < 0 ? '+' + -r : '-' + r)) + '|\\Big]_{' + a + '}^{' + b + '}'),
          'Resultado: ' + i$('\\approx ' + String(Math.round(v * 1e4) / 1e4).replace('.', '{,}')) + '.',
        ],
        mistakes: [{ value: R * Math.log((b - r) / (a - r)), msg: 'al ser el grado del numerador mayor hay que dividir primero: queda además la parte polinómica $' + polyPart + '$, que también se integra.' }],
        data: { f: (x) => (x * x + m * x + n) / (x - r), a, b },
      };
    },
  });

  /* ===================== 6. Primitiva que pasa por un punto ===================== */
  def({
    id: 'int-primitiva',
    title: 'Primitiva que pasa por un punto',
    help: [
      'Todas las primitivas de $f$ son $F(x)=\\int f(x)\\,dx+C$. La condición $F(p)=q$ fija la constante $C$: se sustituye $x=p$ en $F$ y se despeja $C$. Después ya se puede evaluar $F$ en cualquier otro punto.',
      'Ejemplo: $f(x)=2x+1$, $F(0)=3$. $F(x)=x^2+x+C$; $F(0)=C=3$, así que $F(x)=x^2+x+3$ y, por ejemplo, $F(2)=9$.',
    ],
    params: [{ key: 'tipo', label: 'Función', options: [['poli', 'Polinomio'], ['exp', 'Exponencial'], ['trig', 'Trigonométrica'], ['ln', 'Con 1/x']] }],
    generate(p) {
      if (p.tipo === 'poli') {
        const c = [rnd.int(-4, 4), rnd.int(-5, 5), nz(-4, 4)];
        const pp = rnd.int(-2, 2), q = rnd.int(-5, 5);
        let r; do { r = rnd.int(-3, 3); } while (r === pp);
        const P = pint(c);
        const C = fsub(F(q), pevF(P, pp));
        const v = fadd(pevF(P, r), C), v0 = pevF(P, r);
        return {
          prompt: 'Sea ' + i$('F') + ' la primitiva de ' + i$('f(x)=' + pt(c)) + ' que cumple ' + i$('F(' + pp + ')=' + q) + '. Calcula ' + i$('F(' + r + ')') + '.',
          answer: ansN('F(' + r + ')=', v),
          steps: [
            'Primitivas: ' + d$('F(x)=' + ptq(P) + '+C'),
            'Condición ' + i$('F(' + pp + ')=' + q) + ': ' + i$(ftex(pevF(P, pp)) + '+C=' + q) + ', luego ' + i$('C=' + ftex(C)) + '.',
            'Entonces ' + i$('F(' + r + ')=' + ftex(pevF(P, r)) + (C.n === 0 ? '' : (C.n < 0 ? '' : '+') + ftex(C)) + '=' + ftex(v)) + '.',
          ],
          mistakes: [{ value: v0, msg: 'te has olvidado de la constante $C$: la condición $F(' + pp + ')=' + q + '$ sirve para calcularla.' }],
          data: { f: (x) => pevN(c, x), pp, q, r, ans: val(v) },
        };
      }
      if (p.tipo === 'exp') {
        const A = rnd.int(1, 4), k = rnd.pick([1, 2, 3]), B = rnd.int(-3, 3), y0 = rnd.int(-4, 4);
        const v = A * (Math.exp(k) - 1) / k + B + y0, v0 = A * Math.exp(k) / k + B, Cq = fsub(F(y0), F(A, k));
        return {
          prompt: 'Sea ' + i$('F') + ' la primitiva de ' + i$('f(x)=' + (A === 1 ? '' : A) + 'e^{' + (k === 1 ? '' : k) + 'x}' + (B === 0 ? '' : cst(B))) + ' que cumple ' + i$('F(0)=' + y0) + '. Calcula ' + i$('F(1)') + '. (Exacto o con 3-4 decimales.)',
          answer: ansE('F(1)=', v),
          steps: [
            'Primitivas: ' + d$('F(x)=' + cterm(F(A, k), 'e^{' + kk(k) + '}', true) + (B === 0 ? '' : cterm(F(B), 'x')) + '+C'),
            'Condición: ' + i$('F(0)=' + ftex(F(A, k)) + '+C=' + y0) + ', luego ' + i$('C=' + ftex(fsub(F(y0), F(A, k)))) + '.',
            'Entonces ' + d$('F(1)=' + cterm(F(A, k), k === 1 ? 'e' : 'e^{' + k + '}', true) + (B === 0 ? '' : cst(B)) + (Cq.n === 0 ? '' : (Cq.n < 0 ? '' : '+') + ftex(Cq)) + '\\approx ' + String(Math.round(v * 1e4) / 1e4).replace('.', '{,}')),
          ],
          mistakes: [{ value: v0, msg: 'te falta la constante: $C=F(0)-\\frac{' + A + '}{' + k + '}e^0$ no es $0$.' }],
          data: { f: (x) => A * Math.exp(k * x) + B, pp: 0, q: y0, r: 1, ans: v },
        };
      }
      if (p.tipo === 'trig') {
        const k = rnd.int(1, 2), A = nz(-4, 4), B = nz(-4, 4), y0 = rnd.int(-4, 4);
        const v = fadd(F(A + B, k), F(y0)), v0 = F(A, k);
        return {
          prompt: 'Sea ' + i$('F') + ' la primitiva de ' + i$('f(x)=' + cf(A, '\\cos ' + (k === 1 ? '' : k) + 'x') + sgnT(B, '\\sin ' + (k === 1 ? '' : k) + 'x')) + ' que cumple ' + i$('F(0)=' + y0) + '. Calcula ' + i$('F\\left(\\dfrac{\\pi}{' + 2 * k + '}\\right)') + '.',
          answer: ansN('F\\left(\\tfrac{\\pi}{' + 2 * k + '}\\right)=', v),
          steps: [
            'Primitivas: ' + d$('F(x)=' + cterm(F(A, k), '\\sin ' + kk(k) , true) + cterm(F(-B, k), '\\cos ' + kk(k)) + '+C'),
            'Condición: ' + i$('F(0)=' + ftex(F(-B, k)) + '+C=' + y0) + ', luego ' + i$('C=' + ftex(fadd(F(y0), F(B, k)))) + '.',
            'En ' + i$('x=\\frac{\\pi}{' + 2 * k + '}') + ' (' + i$('\\sin=1') + ', ' + i$('\\cos=0') + '): ' + i$('F=' + ftex(F(A, k)) + (fadd(F(y0), F(B, k)).n === 0 ? '' : (fadd(F(y0), F(B, k)).n < 0 ? '' : '+') + ftex(fadd(F(y0), F(B, k)))) + '=' + ftex(v)) + '.',
          ],
          mistakes: [{ value: v0, msg: 'te falta la constante $C$, que sale de la condición $F(0)=' + y0 + '$.' }],
          data: { f: (x) => A * Math.cos(k * x) + B * Math.sin(k * x), pp: 0, q: y0, r: pi / (2 * k), ans: val(v) },
        };
      }
      const A = nz(-4, 4), B = rnd.int(-3, 3), y0 = rnd.int(-4, 4);
      const v = A + y0 + B * (E - 1), v0 = A + B * E;
      return {
        prompt: 'Sea ' + i$('F') + ' la primitiva de ' + i$('f(x)=\\dfrac{' + A + '}{x}' + (B === 0 ? '' : cst(B))) + ' (en ' + i$('x>0') + ') que cumple ' + i$('F(1)=' + y0) + '. Calcula ' + i$('F(e)') + '. (Exacto o con 3-4 decimales.)',
        answer: ansE('F(e)=', v),
        steps: [
          'Primitivas: ' + d$('F(x)=' + A + '\\ln x' + (B === 0 ? '' : (B < 0 ? '-' : '+') + (Math.abs(B) === 1 ? '' : Math.abs(B)) + 'x') + '+C'),
          'Condición: ' + i$('F(1)=' + B + '+C=' + y0) + ', luego ' + i$('C=' + (y0 - B)) + '.',
          'Entonces ' + i$('F(e)=' + A + (B === 0 ? '' : cst(B) + 'e') + (y0 - B === 0 ? '' : (y0 - B < 0 ? '' : '+') + (y0 - B)) + '\\approx ' + String(Math.round(v * 1e4) / 1e4).replace('.', '{,}')) + '.',
        ],
        mistakes: [{ value: v0, msg: 'te falta la constante: sale de $F(1)=' + y0 + '$ y vale $C=' + (y0 - B) + '$, no $0$.' }],
        data: { f: (x) => A / x + B, pp: 1, q: y0, r: E, ans: v },
      };
    },
  });

  /* ===================== 7. Áreas ===================== */
  def({
    id: 'int-areas',
    title: 'Áreas con integrales',
    help: [
      'Área entre $f$ y el eje $X$ en $[a,b]$: $\\int_a^b|f|$. Se hallan los cortes con el eje y se integra <b>por separado</b> en cada trozo donde $f$ no cambia de signo, sumando los valores absolutos. Entre dos curvas: $\\int(\\text{arriba}-\\text{abajo})$, entre los cortes $f(x)=g(x)$; si se cruzan dentro del intervalo, se parte en ese punto.',
      'Ejemplo: área entre $y=x^2$ e $y=x$. Cortes: $x^2=x\\Rightarrow x=0,\\ x=1$. En $(0,1)$ la recta está arriba: $\\displaystyle\\int_0^1(x-x^2)\\,dx=\\left[\\frac{x^2}{2}-\\frac{x^3}{3}\\right]_0^1=\\frac16$.',
    ],
    params: [{ key: 'tipo', label: 'Región', options: [['eje', 'Cúbica y el eje X'], ['entre', 'Parábola y recta'], ['cruce', 'Curvas que se cruzan en un intervalo'], ['trig', 'Seno o coseno y el eje X']] }],
    generate(p) {
      if (p.tipo === 'eje') {
        let r;
        do { r = [rnd.int(-3, 3), rnd.int(-3, 3), rnd.int(-3, 3)].sort((x, y) => x - y); } while (r[0] === r[1] || r[1] === r[2] || r[2] - r[0] < 3);
        const k = rnd.pick([1, -1]);
        const c = pmul(pmul([-r[0], 1], [-r[1], 1]), [-r[2], 1]).map((x) => x * k);
        const P = pint(c);
        const I1 = fsub(pevF(P, r[1]), pevF(P, r[0])), I2 = fsub(pevF(P, r[2]), pevF(P, r[1]));
        const abs = (q) => F(Math.abs(q.n), q.d);
        const A = fadd(abs(I1), abs(I2));
        return {
          prompt: 'Calcula el área de la región limitada por ' + i$('f(x)=' + pt(c)) + ' y el eje ' + i$('X') + '.',
          answer: ansN('A=', A),
          steps: [
            'Cortes con el eje: ' + i$('f(x)=' + (k < 0 ? '-' : '') + lin(r[0]) + lin(r[1]) + lin(r[2]) + '=0') + ', es decir ' + i$('x=' + r.join(',\\ x=')) + '. Hay dos recintos, uno a cada lado de ' + i$('x=' + r[1]) + '.',
            'Primitiva: ' + i$('F(x)=' + ptq(P)) + '. ' + d$('\\int_{' + r[0] + '}^{' + r[1] + '}f=' + ftex(I1) + '\\qquad\\int_{' + r[1] + '}^{' + r[2] + '}f=' + ftex(I2)),
            'Una integral es negativa y la otra positiva: el área suma los <b>valores absolutos</b>: ' + i$('A=' + ftex(abs(I1)) + '+' + ftex(abs(I2)) + '=' + ftex(A)) + '.',
          ],
          mistakes: [{ value: fadd(I1, I2), msg: 'has hecho $\\int_{' + r[0] + '}^{' + r[2] + '}f$, donde la parte negativa resta. El área suma los <b>valores absolutos</b> de cada recinto.' }],
          data: { tipo: 'eje', h: (x) => pevN(c, x), a: r[0], b: r[2] },
        };
      }
      if (p.tipo === 'entre') {
        let r1, r2;
        do { r1 = rnd.int(-3, 2); r2 = rnd.int(r1 + 1, r1 + 4); } while (r2 > 4);
        const k = rnd.pick([1, -1, 2, -2]);
        const m = rnd.int(-3, 3), n = rnd.int(-4, 4);
        const h = pmul([-r1, 1], [-r2, 1]).map((x) => x * k);
        const fcoef = [n + h[0], m + h[1], h[2]];
        const A = F(Math.abs(k) * (r2 - r1) ** 3, 6);
        const top = k > 0 ? 'g' : 'f';
        return {
          prompt: 'Calcula el área encerrada entre ' + i$('f(x)=' + pt(fcoef)) + ' y ' + i$('g(x)=' + pt([n, m])) + '.',
          answer: ansN('A=', A),
          steps: [
            'Cortes: ' + i$('f(x)=g(x)\\Rightarrow ' + pt(h) + '=0') + ', o sea ' + i$(sgnT(k, '').replace('+', '') + lin(r1) + lin(r2) + '=0') + ', ' + i$('x=' + r1) + ' y ' + i$('x=' + r2) + '.',
            'Entre los cortes, ' + i$(top) + ' está por encima. ' + d$('A=\\int_{' + r1 + '}^{' + r2 + '}\\big(' + (top === 'g' ? 'g-f' : 'f-g') + '\\big)dx=\\int_{' + r1 + '}^{' + r2 + '}' + '-' + (Math.abs(k) === 1 ? '' : Math.abs(k)) + lin(r1) + lin(r2) + '\\,dx'),
            'Resultado: ' + i$('A=\\dfrac{|' + k + '|\\,(' + r2 + '-' + par(r1) + ')^3}{6}=' + ftex(A)) + '.',
          ],
          mistakes: [{ value: F(-Math.abs(k) * (r2 - r1) ** 3, 6), msg: 'te ha salido negativo: has restado al revés. Entre los cortes se resta (curva de arriba) $-$ (curva de abajo) y el área es siempre positiva.' }],
          data: { tipo: 'entre', h: (x) => (pevN(fcoef, x) - pevN([n, m], x)), a: r1, b: r2 },
        };
      }
      if (p.tipo === 'cruce') {
        const a = rnd.int(-3, 0), r = rnd.int(a + 1, a + 3), b = rnd.int(r + 1, r + 3), s = b + rnd.int(1, 2);
        const k = rnd.pick([1, -1]);
        const h = pmul([-r, 1], [-s, 1]).map((x) => x * k);
        const m = rnd.int(-3, 3), n = rnd.int(-4, 4);
        const fcoef = [n + h[0], m + h[1], h[2]];
        const P = pint(h);
        const I1 = fsub(pevF(P, r), pevF(P, a)), I2 = fsub(pevF(P, b), pevF(P, r));
        const abs = (q) => F(Math.abs(q.n), q.d);
        const A = fadd(abs(I1), abs(I2));
        return {
          prompt: 'Calcula el área entre ' + i$('f(x)=' + pt(fcoef)) + ' y ' + i$('g(x)=' + pt([n, m])) + ' en el intervalo ' + i$('[' + a + ',' + b + ']') + '.',
          answer: ansN('A=', A),
          steps: [
            'Cortes: ' + i$('f-g=' + pt(h) + '=' + (k < 0 ? '-' : '') + lin(r) + lin(s) + '=0') + ' da ' + i$('x=' + r) + ' (dentro del intervalo) y ' + i$('x=' + s) + ' (fuera). Las curvas se cruzan en ' + i$('x=' + r) + ': hay que partir la integral.',
            'Con ' + i$('h=f-g') + ' y su primitiva ' + i$('H(x)=' + ptq(P)) + ': ' + d$('\\int_{' + a + '}^{' + r + '}h=' + ftex(I1) + '\\qquad\\int_{' + r + '}^{' + b + '}h=' + ftex(I2)),
            'Área: ' + i$('|' + ftex(I1) + '|+|' + ftex(I2) + '|=' + ftex(A)) + '.',
          ],
          mistakes: [{ value: fadd(I1, I2), msg: 'has hecho $\\int_{' + a + '}^{' + b + '}(f-g)$ sin partir en el corte $x=' + r + '$: las partes con signo contrario se restan. Suma los valores absolutos de cada trozo.' }],
          data: { tipo: 'cruce', h: (x) => (pevN(fcoef, x) - pevN([n, m], x)), a, b },
        };
      }
      const A0 = rnd.int(1, 4), k = rnd.int(1, 3), isSin = rnd.pick([true, false]);
      if (isSin) {
        const A = F(4 * A0, k);
        return {
          prompt: 'Calcula el área limitada por ' + i$('f(x)=' + (A0 === 1 ? '' : A0) + '\\sin ' + (k === 1 ? '' : k) + 'x') + ' y el eje ' + i$('X') + ' entre ' + i$('x=0') + ' y ' + i$('x=\\frac{2\\pi}{' + k + '}') + '.',
          answer: ansN('A=', A),
          steps: [
            'Corta al eje en ' + i$('x=0,\\ \\frac{\\pi}{' + k + '},\\ \\frac{2\\pi}{' + k + '}') + ': arco positivo y arco negativo, de igual tamaño.',
            'Primer arco: ' + d$('\\int_0^{\\pi/' + k + '}' + A0 + '\\sin ' + k + 'x\\,dx=\\Big[-\\frac{' + A0 + '}{' + k + '}\\cos ' + k + 'x\\Big]_0^{\\pi/' + k + '}=\\frac{' + 2 * A0 + '}{' + k + '}'),
            'El segundo arco aporta lo mismo en valor absoluto: ' + i$('A=2\\cdot\\dfrac{' + 2 * A0 + '}{' + k + '}=' + ftex(A)) + '.',
          ],
          mistakes: [{ value: F(0), msg: 'la integral $\\int_0^{2\\pi/' + k + '}f$ vale $0$ porque un arco cancela al otro; el área suma los dos arcos en valor absoluto.' }, { value: F(2 * A0, k), msg: 'ése es el área de un solo arco; hay dos (uno positivo y otro negativo).' }],
          data: { tipo: 'trig', h: (x) => A0 * Math.sin(k * x), a: 0, b: 2 * pi / k },
        };
      }
      const A = F(2 * A0, k);
      return {
        prompt: 'Calcula el área limitada por ' + i$('f(x)=' + (A0 === 1 ? '' : A0) + '\\cos ' + (k === 1 ? '' : k) + 'x') + ' y el eje ' + i$('X') + ' entre ' + i$('x=0') + ' y ' + i$('x=\\frac{\\pi}{' + k + '}') + '.',
        answer: ansN('A=', A),
        steps: [
          'Corta al eje en ' + i$('x=\\frac{\\pi}{' + 2 * k + '}') + ': positiva antes y negativa después, con la misma área.',
          'Primer trozo: ' + d$('\\int_0^{\\pi/' + 2 * k + '}' + A0 + '\\cos ' + k + 'x\\,dx=\\Big[\\frac{' + A0 + '}{' + k + '}\\sin ' + k + 'x\\Big]_0^{\\pi/' + 2 * k + '}=\\frac{' + A0 + '}{' + k + '}'),
          'El segundo trozo aporta lo mismo en valor absoluto: ' + i$('A=2\\cdot\\dfrac{' + A0 + '}{' + k + '}=' + ftex(A)) + '.',
        ],
        mistakes: [{ value: F(0), msg: 'la integral $\\int_0^{\\pi/' + k + '}f$ vale $0$ porque un trozo cancela al otro; el área suma los dos en valor absoluto.' }, { value: F(A0, k), msg: 'ése es el área de un solo trozo; hay dos (uno positivo y otro negativo).' }],
        data: { tipo: 'trig', h: (x) => A0 * Math.cos(k * x), a: 0, b: pi / k },
      };
    },
  });

  /* ===================== Gráficas 2D (JSXGraph, ver graficas.js) ===================== */
  // Sombrea la región entre la gráfica y el eje X en [a, b] (en las áreas entre curvas, la de f−g).
  function plotDe(d) {
    const f = typeof d.f === 'function' ? d.f : typeof d.h === 'function' ? d.h : null;
    if (!f || !Number.isFinite(d.a) || !Number.isFinite(d.b)) return null;
    const w = Math.max(1, (d.b - d.a) * 0.3);
    let x0 = d.a - w, x1 = d.b + w;
    if (!Number.isFinite(f(x0))) x0 = d.a;
    if (!Number.isFinite(f(x1))) x1 = d.b;
    return { type: '2d', x: [x0, x1], curves: [{ f, label: d.h && d.tipo !== 'eje' && d.tipo !== 'trig' ? 'f − g' : 'f' }], fill: [{ f, a: d.a, b: d.b }], vlines: [d.a, d.b] };
  }
  Object.keys(G.modules).filter((id) => id.startsWith('int-')).forEach((id) => {
    const mod = G.modules[id], gen = mod.generate;
    mod.generate = (p) => { const ch = gen(p); const pl = plotDe(ch.data || {}); if (pl) ch.plot = pl; return ch; };
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
