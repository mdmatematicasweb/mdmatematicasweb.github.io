/* Ejercicios interactivos — 2º Bachillerato, tema 7: Derivadas. */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, fadd, fmul, ftex, d$, i$ } = G;
  const r = rnd.int, pick = rnd.pick;

  /* ---------- Utilidades ---------- */
  const nz = (a, b) => { let v; do v = r(a, b); while (v === 0); return v; };
  const sg = (k) => (k < 0 ? '-' : '+');
  const pa = (k) => (k < 0 ? '(' + k + ')' : String(k));
  const tail = (k) => (k ? sg(k) + Math.abs(k) : '');
  const clamp = (k) => (Math.abs(k) === 1 ? (k < 0 ? '-' : '') : String(k));
  const lead = (k) => (Math.abs(k) === 1 ? '' : String(Math.abs(k)));
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
  const frac = (n, d) => '\\dfrac{' + n + '}{' + d + '}';
  const isF = (q) => q && typeof q === 'object' && 'n' in q && 'd' in q;
  const num = (q) => (isF(q) ? q.n / q.d : q);
  const fd = (x0tex) => "f'(" + x0tex + ')';
  /** Sustituye la variable x por un valor (texto TeX) en una expresión sin otras x. */
  const subst = (tex, x0tex) => tex.replace(/\^x/g, '^{' + x0tex + '}').replace(/x/g, '(' + x0tex + ')');
  const fsum = (...qs) => qs.reduce((s, q) => fadd(s, q), F(0));
  const ex = (f) => (f.d === 1 ? String(f.n) : f.n + '/' + f.d);
  /** Parte de una respuesta multi: F → number; {v,show} → expr. */
  const part = (label, q) => (isF(q) ? { kind: 'number', label, value: q } : { kind: 'expr', label, value: q.v, show: q.show });
  const qtex = (q) => (isF(q) ? ftex(q) : q.tex);
  const cases = (rows) => '\\begin{cases}' + rows.map((r0) => r0[0] + '&' + r0[1]).join('\\\\') + '\\end{cases}';
  const par2 = (t) => (/^\d+$/.test(t) ? t : '(' + t + ')');
  const numK = (k) => (k === 1 ? 'e' : 'e^{' + k + '}');
  const eStr = (k) => (k === 1 ? 'e' : 'e^(' + k + ')');

  /* ===================== 1. Reglas de derivación ===================== */
  const RULES = {
    poly: 'Derivamos término a término con $(x^n)\'=nx^{n-1}$ y $(\\sqrt{x})\'=\\frac{1}{2\\sqrt{x}}$.',
    prod: 'Regla del producto: $(u\\cdot v)\'=u\'v+u\\,v\'$.',
    coc: 'Regla del cociente: $\\left(\\frac{u}{v}\\right)\'=\\frac{u\'v-u\\,v\'}{v^2}$.',
    cadena: 'Regla de la cadena: $(f\\circ g)\'(x)=f\'(g(x))\\cdot g\'(x)$. No olvides derivar lo de dentro.',
    trans: 'Derivadas básicas: $(e^x)\'=e^x$, $(\\ln x)\'=\\frac1x$, $(\\operatorname{sen}x)\'=\\cos x$, $(\\cos x)\'=-\\operatorname{sen}x$, $(\\operatorname{tg}x)\'=\\frac{1}{\\cos^2x}$, $(\\operatorname{arctg}x)\'=\\frac{1}{1+x^2}$.',
  };
  const T_POLY = [
    () => {
      const a = nz(-3, 3), b = r(-4, 4), c = r(-5, 5), d = r(-5, 5), x0 = r(-2, 3);
      const co = [a, b, c, d], dc = [3 * a, 2 * b, c];
      return { ftex: polyTex(co), f: (x) => pev(co, x), dtex: polyTex(dc), x0, val: F(pev(dc, x0)), mist: [{ value: F(pev(co, x0)), msg: 'has calculado $f(x_0)$, no la derivada $f\'(x_0)$.' }] };
    },
    () => {
      const a = nz(-4, 4), b = nz(-5, 5), x0 = pick([1, 4, 9]), s = Math.sqrt(x0);
      const t1 = (a < 0 ? '-' : '') + frac(lead(a) || '1', '2\\sqrt{x}');
      return {
        ftex: clamp(a) + '\\sqrt{x}' + sg(b) + frac(Math.abs(b), 'x'), f: (x) => a * Math.sqrt(x) + b / x,
        dtex: t1 + (b < 0 ? '+' : '-') + frac(Math.abs(b), 'x^2'), x0, val: fsum(F(a, 2 * s), F(-b, x0 * x0)),
        mist: [{ value: fsum(F(a, 2 * s), F(b, x0 * x0)), msg: 'la derivada de $\\frac{b}{x}$ es $-\\frac{b}{x^2}$ (signo menos).' }],
      };
    },
    () => {
      const a = nz(-4, 4), b = nz(-3, 3), x0 = pick([1, -1, 2, -2]);
      return {
        ftex: frac(a, 'x^2') + sg(b) + clamp(Math.abs(b)) + 'x^4', f: (x) => a / (x * x) + b * Math.pow(x, 4),
        dtex: frac(-2 * a, 'x^3') + sg(4 * b) + Math.abs(4 * b) + 'x^3', x0, val: fsum(F(-2 * a, x0 * x0 * x0), F(4 * b * x0 * x0 * x0)),
        mist: [{ value: fsum(F(2 * a, x0 * x0 * x0), F(4 * b * x0 * x0 * x0)), msg: '$\\frac{a}{x^2}=ax^{-2}$ y su derivada es $-2ax^{-3}$.' }],
      };
    },
  ];
  const R4 = [
    { n: 1, t: '\\operatorname{sen}', d: '\\operatorname{sen}x+x\\cos x', v: { '\\frac{\\pi}{2}': ['1', 1], '\\pi': ['-pi', -Math.PI] } },
    { n: 1, t: '\\cos', d: '\\cos x-x\\operatorname{sen}x', v: { '\\frac{\\pi}{2}': ['-pi/2', -Math.PI / 2], '\\pi': ['-1', -1] } },
    { n: 2, t: '\\operatorname{sen}', d: '2x\\operatorname{sen}x+x^2\\cos x', v: { '\\frac{\\pi}{2}': ['pi', Math.PI], '\\pi': ['-pi^2', -Math.PI * Math.PI] } },
    { n: 2, t: '\\cos', d: '2x\\cos x-x^2\\operatorname{sen}x', v: { '\\frac{\\pi}{2}': ['-pi^2/4', -Math.PI * Math.PI / 4], '\\pi': ['-2*pi', -2 * Math.PI] } },
  ];
  const T_PROD = [
    () => {
      const p = nz(-3, 3), q = r(-4, 4), rr = nz(-3, 3), s = r(-4, 4), x0 = r(-2, 3);
      const u = [p, q], v = [rr, 0, s];
      const val = p * pev(v, x0) + pev(u, x0) * 2 * rr * x0;
      return {
        ftex: '(' + polyTex(u) + ')(' + polyTex(v) + ')', f: (x) => pev(u, x) * pev(v, x),
        dtex: pa(p) + '(' + polyTex(v) + ')+(' + polyTex(u) + ')\\cdot ' + pa(2 * rr) + 'x', x0, val: F(val),
        mist: [{ value: F(p * 2 * rr * x0), msg: 'la derivada de un producto no es el producto de las derivadas: $(uv)\'=u\'v+uv\'$.' }],
      };
    },
    () => {
      const k = pick([1, 2, -1, 3]), n = k === -1 ? pick([2, 3]) : pick([1, 2, 3]);
      const xn = n === 1 ? 'x' : 'x^{' + n + '}', ek = 'e^{' + clamp(k) + 'x}';
      const vv = n + k;
      return {
        ftex: xn + ek, f: (x) => Math.pow(x, n) * Math.exp(k * x),
        dtex: (n === 1 ? '' : n + (n === 2 ? 'x' : 'x^{' + (n - 1) + '}')) + ek + '+' + xn + '\\cdot ' + (k < 0 ? '(' + k + ')' : clamp(k)) + ek, x0: 1,
        num: vv * Math.exp(k), show: vv + '*' + eStr(k), valtex: (vv === 1 ? '' : vv) + numK(k),
      };
    },
    () => {
      const n = r(1, 3), vv = n + 1;
      return {
        ftex: (n === 1 ? 'x' : 'x^{' + n + '}') + '\\ln x', f: (x) => Math.pow(x, n) * Math.log(x),
        dtex: (n === 1 ? '' : n + (n === 2 ? 'x' : 'x^{' + (n - 1) + '}')) + '\\ln x+' + (n === 1 ? '1' : n === 2 ? 'x' : 'x^{' + (n - 1) + '}'), x0: Math.E, x0tex: 'e',
        num: vv * Math.pow(Math.E, n - 1), show: vv + '*e^(' + (n - 1) + ')', valtex: n === 1 ? '2' : vv + numK(n - 1),
      };
    },
    () => {
      const t = pick(R4), x0tex = pick(['\\frac{\\pi}{2}', '\\pi']);
      const x0 = x0tex === '\\pi' ? Math.PI : Math.PI / 2;
      const fn = t.t === '\\cos' ? Math.cos : Math.sin;
      const sh = t.v[x0tex];
      return {
        ftex: (t.n === 1 ? 'x' : 'x^2') + t.t + (t.t === '\\cos' ? ' x' : 'x'), f: (x) => Math.pow(x, t.n) * fn(x), dtex: t.d, x0, x0tex,
        num: sh[1], show: sh[0], valtex: sh[0].replace('pi', '\\pi').replace(/^(-?)(.*)\/(.*)$/, (_, s0, a, b) => s0 + '\\frac{' + a + '}{' + b + '}'),
      };
    },
  ];
  const T_COC = [
    () => {
      let p, q, rr, s, x0;
      do { p = nz(-4, 4); q = r(-5, 5); rr = nz(-3, 3); s = r(-5, 5); x0 = r(-2, 3); } while (p * s - q * rr === 0 || rr * x0 + s === 0);
      const val = F(p * s - q * rr, Math.pow(rr * x0 + s, 2));
      return {
        ftex: frac(polyTex([p, q]), polyTex([rr, s])), f: (x) => (p * x + q) / (rr * x + s),
        dtex: frac(pa(p) + '(' + polyTex([rr, s]) + ')-(' + polyTex([p, q]) + ')\\cdot ' + pa(rr), '(' + polyTex([rr, s]) + ')^2'), x0, val,
        mist: [{ value: F(p, rr), msg: 'la derivada de un cociente no es el cociente de las derivadas: $\\left(\\frac{u}{v}\\right)\'=\\frac{u\'v-uv\'}{v^2}$.' }, { value: F(-val.n, val.d), msg: 'en el numerador va $u\'v-uv\'$, en ese orden (revisa el signo).' }],
      };
    },
    () => {
      const a = r(-4, 4), b = r(-3, 3); let x0; do { x0 = r(-3, 4); } while (x0 === b);
      return {
        ftex: frac('x^2' + tail(a), polyTex([1, -b])), f: (x) => (x * x + a) / (x - b),
        dtex: frac('2x(' + polyTex([1, -b]) + ')-(x^2' + tail(a) + ')', '(' + polyTex([1, -b]) + ')^2'), x0, val: F(x0 * x0 - 2 * b * x0 - a, Math.pow(x0 - b, 2)),
      };
    },
    () => {
      const n = pick([1, 3, 4]);
      return {
        ftex: frac('e^x', n === 1 ? 'x' : 'x^{' + n + '}'), f: (x) => Math.exp(x) / Math.pow(x, n),
        dtex: frac('e^x\\cdot x^{' + n + '}-e^x\\cdot ' + n + 'x^{' + (n - 1) + '}', 'x^{' + 2 * n + '}'), x0: 2,
        num: (2 - n) * Math.exp(2) / Math.pow(2, n + 1), show: '(' + (2 - n) + ')*e^2/' + Math.pow(2, n + 1),
        valtex: frac((2 - n) === 1 ? 'e^2' : (2 - n) + 'e^2', Math.pow(2, n + 1)),
      };
    },
    () => {
      const n = pick([2, 3]);
      return {
        ftex: frac('\\ln x', 'x^{' + n + '}'), f: (x) => Math.log(x) / Math.pow(x, n),
        dtex: frac('\\frac{1}{x}\\cdot x^{' + n + '}-\\ln x\\cdot ' + n + 'x^{' + (n - 1) + '}', 'x^{' + 2 * n + '}'), x0: Math.E, x0tex: 'e',
        num: (1 - n) / Math.pow(Math.E, n + 1), show: '(' + (1 - n) + ')/e^(' + (n + 1) + ')', valtex: frac(1 - n, 'e^{' + (n + 1) + '}'),
      };
    },
    () => {
      const x0tex = pick(['\\frac{\\pi}{2}', '\\pi']);
      const piHalf = x0tex !== '\\pi';
      return {
        ftex: frac('\\operatorname{sen}x', 'x'), f: (x) => Math.sin(x) / x, dtex: frac('x\\cos x-\\operatorname{sen}x', 'x^2'),
        x0: piHalf ? Math.PI / 2 : Math.PI, x0tex,
        num: piHalf ? -4 / (Math.PI * Math.PI) : -1 / Math.PI, show: piHalf ? '-4/pi^2' : '-1/pi', valtex: piHalf ? frac('-4', '\\pi^2') : frac('-1', '\\pi'),
      };
    },
  ];
  const T_CAD = [
    () => {
      const p = nz(-3, 3), q = r(-4, 4), n = r(3, 5), x0 = r(-2, 3);
      const u = p * x0 + q; if (u === 0) return T_CAD[0]();
      const val = F(n * p * Math.pow(u, n - 1));
      return {
        ftex: '(' + polyTex([p, q]) + ')^{' + n + '}', f: (x) => Math.pow(p * x + q, n), dtex: n + '\\cdot ' + pa(p) + '(' + polyTex([p, q]) + ')^{' + (n - 1) + '}', x0, val,
        mist: [{ value: F(n * Math.pow(u, n - 1)), msg: 'falta multiplicar por la derivada de lo de dentro, $(' + polyTex([p, q]) + ')\'=' + p + '$.' }],
      };
    },
    () => {
      const s = r(1, 4), x0 = r(-2, 6), a = nz(-3, 3), b = s * s - a * x0;
      return {
        ftex: '\\sqrt{' + polyTex([a, b]) + '}', f: (x) => Math.sqrt(a * x + b), dtex: frac(a, '2\\sqrt{' + polyTex([a, b]) + '}'), x0, val: F(a, 2 * s),
        mist: [{ value: F(1, 2 * s), msg: 'falta multiplicar por la derivada de lo de dentro, $(' + polyTex([a, b]) + ')\'=' + a + '$.' }],
      };
    },
    () => {
      const p = nz(-3, 3), q = r(-4, 4), n = r(2, 3); let x0; do { x0 = r(-2, 3); } while (p * x0 + q === 0);
      const u = p * x0 + q;
      return {
        ftex: frac(1, '(' + polyTex([p, q]) + ')^{' + n + '}'), f: (x) => Math.pow(p * x + q, -n), dtex: frac(-n + '\\cdot ' + pa(p), '(' + polyTex([p, q]) + ')^{' + (n + 1) + '}'), x0,
        val: F(-n * p, Math.pow(u, n + 1)),
        mist: [{ value: F(-n, Math.pow(u, n + 1)), msg: 'falta multiplicar por la derivada de lo de dentro, $(' + polyTex([p, q]) + ')\'=' + p + '$.' }],
      };
    },
    () => {
      const x0 = pick([1, 2, -1, -2, 3]), a = nz(-2, 2), b = r(-3, 3), c = -(a * x0 * x0 + b * x0);
      const g = polyTex([a, b, c]);
      return {
        ftex: 'e^{' + g + '}', f: (x) => Math.exp(a * x * x + b * x + c), dtex: '(' + polyTex([2 * a, b]) + ')e^{' + g + '}', x0, val: F(2 * a * x0 + b),
        mist: [{ value: F(1), msg: 'falta multiplicar por la derivada del exponente, $(' + g + ')\'=' + polyTex([2 * a, b]) + '$.' }],
      };
    },
    () => {
      const a = r(1, 3), b = r(1, 5), x0 = nz(-3, 3), g = a * x0 * x0 + b;
      return {
        ftex: '\\ln(' + polyTex([a, 0, b]) + ')', f: (x) => Math.log(a * x * x + b), dtex: frac(polyTex([2 * a, 0]), polyTex([a, 0, b])), x0, val: F(2 * a * x0, g),
        mist: [{ value: F(1, g), msg: 'la derivada de $\\ln g$ es $\\frac{g\'}{g}$: falta el numerador $g\'=' + polyTex([2 * a, 0]) + '$.' }],
      };
    },
    () => {
      const a = r(1, 4), sen = rnd.float() < 0.5;
      const x0tex = sen ? (a === 1 ? '\\pi' : '\\frac{\\pi}{' + a + '}') : (a === 1 ? '\\frac{\\pi}{2}' : '\\frac{\\pi}{' + 2 * a + '}');
      const x0 = sen ? Math.PI / a : Math.PI / (2 * a);
      return {
        ftex: (sen ? '\\operatorname{sen}(' : '\\cos(') + polyTex([a, 0]) + ')', f: sen ? (x) => Math.sin(a * x) : (x) => Math.cos(a * x),
        dtex: sen ? clamp(a) + '\\cos(' + polyTex([a, 0]) + ')' : '-' + clamp(a) + '\\operatorname{sen}(' + polyTex([a, 0]) + ')', x0, x0tex, val: F(-a),
        mist: [{ value: F(-1), msg: 'falta multiplicar por la derivada de lo de dentro: $(' + polyTex([a, 0]) + ')\'=' + a + '$.' }],
      };
    },
    () => {
      const a = r(1, 3), x0 = nz(-2, 2), den = 1 + a * a * x0 * x0;
      return {
        ftex: '\\operatorname{arctg}(' + polyTex([a, 0]) + ')', f: (x) => Math.atan(a * x), dtex: frac(a, '1+' + (a === 1 ? '' : a * a) + 'x^2'), x0, val: F(a, den),
        mist: [{ value: F(1, den), msg: 'falta multiplicar por la derivada de lo de dentro, $(' + polyTex([a, 0]) + ')\'=' + a + '$.' }],
      };
    },
    () => {
      const a = r(-3, 3), n = r(2, 4), x0 = r(-2, 2), u = x0 * x0 + a;
      if (u === 0) return T_CAD[7]();
      return {
        ftex: '(x^2' + tail(a) + ')^{' + n + '}', f: (x) => Math.pow(x * x + a, n), dtex: n + '(x^2' + tail(a) + ')^{' + (n - 1) + '}\\cdot 2x', x0, val: F(2 * n * x0 * Math.pow(u, n - 1)),
        mist: [{ value: F(n * Math.pow(u, n - 1)), msg: 'falta multiplicar por la derivada de lo de dentro, $(x^2' + tail(a) + ')\'=2x$.' }],
      };
    },
  ];
  const T_TRANS = [
    () => {
      const a = nz(-3, 3), b = nz(-4, 4), k = pick([1, 2, 3, -1]);
      const vv = a * k;
      return {
        ftex: clamp(a) + 'e^{' + clamp(k) + 'x}' + sg(b) + clamp(Math.abs(b)) + '\\ln x', f: (x) => a * Math.exp(k * x) + b * Math.log(x),
        dtex: clamp(vv) + 'e^{' + clamp(k) + 'x}' + sg(b) + frac(Math.abs(b), 'x'), x0: 1,
        num: vv * Math.exp(k) + b, show: vv + '*' + eStr(k) + (b < 0 ? '' : '+') + b, valtex: clamp(vv) + numK(k) + tail(b),
      };
    },
    () => {
      let a, b; do { a = nz(-4, 4); b = nz(-4, 4); } while (a === b);
      return {
        ftex: clamp(a) + '\\operatorname{sen}x' + sg(b) + clamp(Math.abs(b)) + '\\cos x', f: (x) => a * Math.sin(x) + b * Math.cos(x),
        dtex: clamp(a) + '\\cos x' + (b < 0 ? '+' : '-') + clamp(Math.abs(b)) + '\\operatorname{sen}x', x0: Math.PI / 4, x0tex: '\\frac{\\pi}{4}',
        num: (a - b) * Math.SQRT2 / 2, show: '(' + (a - b) + ')*sqrt(2)/2', valtex: frac(clamp(a - b) + '\\sqrt{2}', 2),
      };
    },
    () => {
      const a = nz(-3, 3), x0tex = pick(['\\frac{\\pi}{4}', '\\frac{\\pi}{3}']);
      const k = x0tex === '\\frac{\\pi}{4}' ? 2 : 4;
      return {
        ftex: clamp(a) + '\\operatorname{tg}x+x', f: (x) => a * Math.tan(x) + x, dtex: frac(a, '\\cos^2x') + '+1', x0: k === 2 ? Math.PI / 4 : Math.PI / 3, x0tex,
        val: F(k * a + 1),
        mist: [{ value: F(a * 1 + 1), msg: 'la derivada de $\\operatorname{tg}x$ es $\\frac{1}{\\cos^2x}$ y $\\cos^2(x_0)=\\frac{1}{' + k + '}$: no vale $1$.' }],
      };
    },
    () => {
      const b = pick([2, 3, 5]);
      return {
        ftex: b + '^x', f: (x) => Math.pow(b, x), dtex: b + '^x\\ln ' + b, x0: 1,
        num: b * Math.log(b), show: b + '*ln(' + b + ')', valtex: b + '\\ln ' + b,
      };
    },
    () => ({
      ftex: 'x^x', f: (x) => Math.pow(x, x), dtex: 'x^x(\\ln x+1)', x0: 2, num: 4 * (1 + Math.log(2)), show: '4*(1+ln(2))', valtex: '4(1+\\ln 2)',
      note: 'Derivación logarítmica: $\\ln y=x\\ln x\\Rightarrow\\frac{y\'}{y}=\\ln x+1$.',
    }),
    () => ({
      ftex: 'x\\operatorname{arctg}x', f: (x) => x * Math.atan(x), dtex: '\\operatorname{arctg}x+' + frac('x', '1+x^2'), x0: 1,
      num: Math.PI / 4 + 0.5, show: 'pi/4+1/2', valtex: frac('\\pi', 4) + '+' + frac(1, 2),
    }),
    () => ({
      ftex: 'e^{-x^2}', f: (x) => Math.exp(-x * x), dtex: '-2xe^{-x^2}', x0: 1, num: -2 * Math.exp(-1), show: '-2*e^(-1)', valtex: frac('-2', 'e'),
    }),
  ];
  const TIPOS_REGLAS = { poly: T_POLY, prod: T_PROD, coc: T_COC, cadena: T_CAD, trans: T_TRANS };
  G.define({
    id: 'der-reglas',
    title: 'Derivadas con las reglas',
    help: [
      'Reglas: $(u\\pm v)\'=u\'\\pm v\'$; producto $(uv)\'=u\'v+uv\'$; cociente $\\left(\\frac uv\\right)\'=\\frac{u\'v-uv\'}{v^2}$; cadena $(f\\circ g)\'=f\'(g)\\,g\'$. Básicas: $(x^n)\'=nx^{n-1}$, $(e^x)\'=e^x$, $(\\ln x)\'=\\frac1x$, $(\\operatorname{sen}x)\'=\\cos x$, $(\\cos x)\'=-\\operatorname{sen}x$, $(\\operatorname{tg}x)\'=\\frac1{\\cos^2x}$, $(\\operatorname{arctg}x)\'=\\frac1{1+x^2}$.',
      'Ejemplo: $f(x)=(3x-1)^4$ en $x_0=1$. Por la cadena, $f\'(x)=4(3x-1)^3\\cdot3=12(3x-1)^3$. Sustituyendo, $f\'(1)=12\\cdot2^3=96$. Con un producto, $f(x)=x\\,e^{x}$: $f\'(x)=e^x+x\\,e^x=e^x(1+x)$.',
    ],
    params: [{ key: 'tipo', label: 'Reglas', options: [['poly', 'Potencias y raíces'], ['prod', 'Producto'], ['coc', 'Cociente'], ['cadena', 'Cadena'], ['trans', 'Exponenciales, logaritmos y trigonométricas']] }],
    generate(p) {
      const T = pick(TIPOS_REGLAS[p.tipo])();
      const x0tex = T.x0tex || String(T.x0);
      const value = T.val ? F(T.val.n, T.val.d) : null;
      const valtex = T.val ? ftex(T.val) : T.valtex;
      const answer = T.val ? { kind: 'number', label: "f'(x_0)=", value } : { kind: 'expr', label: "f'(x_0)=", value: T.num, show: T.show };
      const steps = [RULES[p.tipo]];
      if (T.note) steps.push(T.note);
      steps.push('Derivada: ' + d$("f'(x)=" + T.dtex));
      steps.push('Evaluamos en $x_0=' + x0tex + '$: ' + d$(fd(x0tex) + '=' + (T.x0tex ? valtex : subst(T.dtex, x0tex) + '=' + valtex)));
      return {
        prompt: 'Calcula ' + i$(fd(x0tex)) + ' para ' + i$('f(x)=' + T.ftex) + '.' + (T.val ? '' : ' <small>(valor exacto, p. ej. <code>2*e</code>, <code>pi/4+1/2</code>, <code>sqrt(2)/2</code>)</small>'),
        answer,
        steps,
        mistakes: T.val ? T.mist || [] : [],
        data: { f: T.f, x0: T.x0, tipo: p.tipo },
      };
    },
  });

  /* ===================== 2. Recta tangente ===================== */
  const TRASC = [
    () => ({ ftex: 'e^x', f: Math.exp, dtex: 'e^x', x0: 1, x0tex: '1', fx: { tex: 'e', v: Math.E }, m: { v: Math.E, show: 'e', tex: 'e' }, n: F(0) }),
    () => ({ ftex: '\\ln x', f: Math.log, dtex: frac(1, 'x'), x0: Math.E, x0tex: 'e', fx: { tex: '1', v: 1 }, m: { v: 1 / Math.E, show: 'e^(-1)', tex: frac(1, 'e') }, n: F(0) }),
    () => ({ ftex: '\\ln x', f: Math.log, dtex: frac(1, 'x'), x0: 1, x0tex: '1', fx: { tex: '0', v: 0 }, m: F(1), n: F(-1) }),
    () => ({ ftex: 'x\\ln x', f: (x) => x * Math.log(x), dtex: '\\ln x+1', x0: 1, x0tex: '1', fx: { tex: '0', v: 0 }, m: F(1), n: F(-1) }),
    () => ({ ftex: 'x\\,e^{x}', f: (x) => x * Math.exp(x), dtex: 'e^x(1+x)', x0: 1, x0tex: '1', fx: { tex: 'e', v: Math.E }, m: { v: 2 * Math.E, show: '2*e', tex: '2e' }, n: { v: -Math.E, show: '-e', tex: '-e' } }),
    () => { const k = pick([2, 3, -1]); return { ftex: 'e^{' + clamp(k) + 'x}', f: (x) => Math.exp(k * x), dtex: (k < 0 ? '(' + k + ')' : clamp(k)) + 'e^{' + clamp(k) + 'x}', x0: 0, x0tex: '0', fx: { tex: '1', v: 1 }, m: F(k), n: F(1) }; },
    () => ({ ftex: '\\operatorname{sen}x', f: Math.sin, dtex: '\\cos x', x0: Math.PI, x0tex: '\\pi', fx: { tex: '0', v: 0 }, m: F(-1), n: { v: Math.PI, show: 'pi', tex: '\\pi' } }),
    () => ({ ftex: '\\cos x', f: Math.cos, dtex: '-\\operatorname{sen}x', x0: Math.PI / 2, x0tex: '\\frac{\\pi}{2}', fx: { tex: '0', v: 0 }, m: F(-1), n: { v: Math.PI / 2, show: 'pi/2', tex: '\\frac{\\pi}{2}' } }),
    () => ({ ftex: '\\operatorname{arctg}x', f: Math.atan, dtex: frac(1, '1+x^2'), x0: 1, x0tex: '1', fx: { tex: '\\frac{\\pi}{4}', v: Math.PI / 4 }, m: F(1, 2), n: { v: Math.PI / 4 - 0.5, show: 'pi/4-1/2', tex: frac('\\pi', 4) + '-' + frac(1, 2) } }),
    () => ({ ftex: 'e^{x^2}', f: (x) => Math.exp(x * x), dtex: '2xe^{x^2}', x0: 1, x0tex: '1', fx: { tex: 'e', v: Math.E }, m: { v: 2 * Math.E, show: '2*e', tex: '2e' }, n: { v: -Math.E, show: '-e', tex: '-e' } }),
    () => ({ ftex: '\\ln(x^2+1)', f: (x) => Math.log(x * x + 1), dtex: frac('2x', 'x^2+1'), x0: 1, x0tex: '1', fx: { tex: '\\ln 2', v: Math.LN2 }, m: F(1), n: { v: Math.LN2 - 1, show: 'ln(2)-1', tex: '\\ln 2-1' } }),
  ];
  G.define({
    id: 'der-tangente',
    title: 'Recta tangente',
    help: [
      'La pendiente de la tangente en $x_0$ es $m=f\'(x_0)$. La tangente pasa por $(x_0,f(x_0))$, luego $y-f(x_0)=f\'(x_0)(x-x_0)$. Escrita como $y=mx+n$, el término independiente es $n=f(x_0)-m\\,x_0$. Si piden las tangentes paralelas a una recta de pendiente $m$, se resuelve $f\'(x)=m$.',
      'Ejemplo: $f(x)=x^2-3x$ en $x_0=2$. $f(2)=-2$ y $f\'(x)=2x-3$, así que $m=f\'(2)=1$. Entonces $y+2=1\\cdot(x-2)$, es decir $y=x-4$: $m=1$, $n=-4$.',
    ],
    params: [{ key: 'tipo', label: 'Función', options: [['pol', 'Polinomio'], ['rac', 'Racional o con raíz'], ['trasc', 'Exponencial, log, trigonométrica'], ['paralela', 'Paralela a una recta dada']] }],
    generate(p) {
      if (p.tipo === 'paralela') {
        let r1, r2; do { r1 = r(-3, 3); r2 = r(-3, 3); } while (r1 === r2 || (r1 + r2) % 2 !== 0);
        const pp = -3 * (r1 + r2) / 2, m = r(-6, 6), q = m + 3 * r1 * r2, c = r(-5, 5), j = r(-6, 6);
        const co = [1, pp, q, c];
        return {
          prompt: 'Halla las abscisas de los puntos de la gráfica de ' + i$('f(x)=' + polyTex(co)) + ' donde la tangente es paralela a la recta ' + i$('y=' + polyTex([m, j])) + '. Escríbelas separadas por «;».',
          answer: { kind: 'list', label: 'x=', value: [F(r1), F(r2)] },
          steps: ['Rectas paralelas tienen la misma pendiente: hay que resolver ' + i$("f'(x)=" + m) + '.', "Derivada: " + d$("f'(x)=" + polyTex([3, 2 * pp, q]) + '=' + m + '\\ \\Longrightarrow\\ ' + polyTex([3, 2 * pp, q - m]) + '=0'), 'Soluciones: ' + i$('x=' + r1) + ' y ' + i$('x=' + r2) + '.'],
          mistakes: [],
          data: { f: (x) => pev(co, x), m, sols: [r1, r2], tipo: 'paralela' },
        };
      }
      let T;
      if (p.tipo === 'trasc') T = pick(TRASC)();
      else if (p.tipo === 'rac') {
        if (rnd.float() < 0.5) {
          const a = nz(-4, 4), b = nz(-3, 3), x0 = pick([1, -1, 2, -2, 3]);
          const m = fadd(F(-a, x0 * x0), F(b)), fx = fadd(F(a, x0), F(b * x0));
          T = { ftex: frac(a, 'x') + sg(b) + clamp(Math.abs(b)) + 'x', f: (x) => a / x + b * x, dtex: frac(-a, 'x^2') + sg(b) + Math.abs(b), x0, x0tex: String(x0), fx: { tex: ftex(fx), v: num(fx) }, m, n: fadd(fx, fmul(m, F(-x0))) };
        } else {
          const s = r(1, 5), a = nz(-4, 4), b = r(-4, 4), x0 = s * s;
          const m = F(a, 2 * s), fx = F(a * s + b), n = fsum(F(a * s, 2), F(b));
          T = { ftex: clamp(a) + '\\sqrt{x}' + tail(b), f: (x) => a * Math.sqrt(x) + b, dtex: frac(a, '2\\sqrt{x}'), x0, x0tex: String(x0), fx: { tex: ftex(fx), v: num(fx) }, m, n };
        }
      } else {
        const a = nz(-2, 2), b = r(-4, 4), c = r(-4, 4), d = r(-4, 4), x0 = r(-2, 3), cub = rnd.float() < 0.5;
        const co = cub ? [a, b, c, d] : [a, b, c], dc = cub ? [3 * a, 2 * b, c] : [2 * a, b];
        const mm = pev(dc, x0), fv = pev(co, x0);
        T = { ftex: polyTex(co), f: (x) => pev(co, x), dtex: polyTex(dc), x0, x0tex: String(x0), fx: { tex: String(fv), v: fv }, m: F(mm), n: F(fv - mm * x0) };
      }
      const x0tex = T.x0tex;
      const mtex = qtex(T.m), ntex = qtex(T.n);
      return {
        prompt: 'Halla la recta tangente a ' + i$('f(x)=' + T.ftex) + ' en ' + i$('x_0=' + x0tex) + ', escrita como ' + i$('y=mx+n') + '.' + (isF(T.m) && isF(T.n) ? '' : ' <small>(valores exactos, p. ej. <code>2*e</code>, <code>pi/2</code>, <code>e^(-1)</code>)</small>'),
        answer: { kind: 'multi', parts: [part('m=', T.m), part('n=', T.n)] },
        steps: [
          'Pendiente: ' + d$("f'(x)=" + T.dtex + '\\ \\Longrightarrow\\ m=' + fd(x0tex) + '=' + mtex),
          'Punto de tangencia: ' + d$('f(' + x0tex + ')=' + T.fx.tex),
          'Ordenada en el origen: ' + d$('n=f(' + x0tex + ')-m\\,x_0=' + T.fx.tex + '-' + par2(mtex) + '\\cdot ' + par2(x0tex) + '=' + ntex),
          'La tangente es ' + i$('y=' + (mtex === '0' ? ntex : (mtex === '1' ? '' : mtex === '-1' ? '-' : mtex) + 'x' + (ntex === '0' ? '' : (ntex[0] === '-' ? '' : '+') + ntex))) + '.',
        ],
        data: { f: T.f, x0: T.x0, tipo: p.tipo },
      };
    },
  });

  /* ===================== 3. Derivabilidad de funciones a trozos ===================== */
  const DOPT = ['Derivable en el punto', 'Continua pero no derivable', 'No continua (y por tanto no derivable)'];
  G.define({
    id: 'der-trozos',
    title: 'Derivabilidad de funciones a trozos',
    help: [
      'Una función a trozos es derivable en el punto de unión $x_0$ si es <b>continua</b> ($f(x_0^-)=f(x_0^+)$) y las derivadas laterales coinciden ($f\'(x_0^-)=f\'(x_0^+)$). Derivable implica continua, pero no al revés (un pico, como $|x|$, es continuo y no derivable). Con parámetros, cada condición da una ecuación.',
      'Ejemplo: $f(x)=\\begin{cases}x^2&x<1\\\\ ax+b&x\\ge1\\end{cases}$. Continuidad: $a+b=1$. Derivadas: $2x=2$ por la izquierda y $a$ por la derecha, así que $a=2$. Entonces $b=-1$.',
    ],
    params: [{ key: 'tipo', label: 'Problema', options: [['pol', 'Parámetros en un trozo cuadrático'], ['rac', 'Parámetros en un trozo con 1/x'], ['clasif', 'Clasificar el punto']] }],
    generate(p) {
      if (p.tipo === 'clasif') {
        const caso = pick([0, 1, 2]);
        const x0 = r(-2, 3), l2 = r(-2, 2), l1 = nz(-4, 4), l0 = r(-4, 4), r2 = r(-2, 2);
        const Lv = pev([l2, l1, l0], x0), Ld = 2 * l2 * x0 + l1;
        let r1 = Ld - 2 * r2 * x0;
        if (caso === 1) r1 += nz(-3, 3);
        let r0 = Lv - r2 * x0 * x0 - r1 * x0;
        if (caso === 2) r0 += nz(-4, 4);
        const R = [r2, r1, r0], L = [l2, l1, l0];
        const Rv = pev(R, x0), Rd = 2 * r2 * x0 + r1;
        const f = (x) => (x < x0 ? pev(L, x) : pev(R, x));
        const st = ['Continuidad en $x_0=' + x0 + '$: ' + d$('f(' + x0 + '^-)=' + Lv + ',\\quad f(' + x0 + '^+)=f(' + x0 + ')=' + Rv)];
        if (caso === 2) st.push('Los valores son distintos: no es continua, luego tampoco es derivable.');
        else st.push('Derivadas laterales: ' + d$("f'(" + x0 + '^-)=' + Ld + ',\\quad f\'(' + x0 + '^+)=' + Rd), caso === 0 ? 'Coinciden: $f$ es derivable en $x_0$.' : 'Son distintas: hay un pico, $f$ es continua pero no derivable.');
        return {
          prompt: 'Estudia la continuidad y la derivabilidad de ' + i$('f(x)=' + cases([[polyTex(L), 'x<' + x0], [polyTex(R), 'x\\ge ' + x0]])) + ' en ' + i$('x_0=' + x0) + '.',
          answer: { kind: 'choice', options: DOPT, value: caso },
          steps: st,
          mistakes: [{ value: [1, 0, 1][caso], msg: caso === 0 ? 'las derivadas laterales sí coinciden, así que no hay pico: es derivable.' : caso === 1 ? 'derivable exige que las derivadas laterales coincidan, y aquí valen distinto.' : 'continua exige que los límites laterales coincidan, y aquí no lo hacen.' }],
          data: { f, x0, caso },
        };
      }
      let x0 = pick([1, -1, 2, -2]);
      const l2 = r(-2, 2);
      if (p.tipo === 'pol') {
        const a = nz(-3, 3), l1 = nz(-4, 4), l0 = r(-5, 5);
        const Lv = pev([l2, l1, l0], x0), Ld = 2 * l2 * x0 + l1;
        const b = Ld - 2 * a * x0, r0 = Lv - a * x0 * x0 - b * x0;
        const mk = (v) => (x) => (x < x0 ? pev([l2, l1, l0], x) : v[0] * x * x + v[1] * x + r0);
        return {
          prompt: 'Halla ' + i$('a') + ' y ' + i$('b') + ' para que ' + i$('f(x)=' + cases([[polyTex([l2, l1, l0]), 'x<' + x0], ['ax^2+bx' + tail(r0), 'x\\ge ' + x0]])) + ' sea derivable en ' + i$('x=' + x0) + '.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'a=', value: F(a) }, { kind: 'number', label: 'b=', value: F(b) }] },
          steps: [
            'Continuidad en $x=' + x0 + '$: ' + d$(clamp(x0 * x0) + 'a' + sg(x0) + clamp(Math.abs(x0)) + 'b' + tail(r0) + '=' + Lv),
            "Derivadas: $f'(x)=" + polyTex([2 * l2, l1]) + '$ si $x<' + x0 + "$, y $f'(x)=2ax+b$ si $x>" + x0 + '$. Igualamos en $x=' + x0 + '$: ' + d$(clamp(2 * x0) + 'a+b=' + Ld),
            'Resolvemos el sistema: ' + i$('a=' + a) + ', ' + i$('b=' + b) + '.',
          ],
          data: { mk, x0, sol: [a, b], tipo: 'pol' },
        };
      }
      const ap = nz(-3, 3), a = x0 * x0 * ap, b = nz(-3, 3);
      const Lv = x0 * ap + b * x0, Ld = -ap + b;
      const l1 = Ld - 2 * l2 * x0, l0 = Lv - l2 * x0 * x0 - l1 * x0;
      const L = [l2, l1, l0];
      const mk = (v) => (x) => (x < x0 ? pev(L, x) : v[0] / x + v[1] * x);
      return {
        prompt: 'Halla ' + i$('a') + ' y ' + i$('b') + ' para que ' + i$('f(x)=' + cases([[polyTex(L), 'x<' + x0], [frac('a', 'x') + '+bx', 'x\\ge ' + x0]])) + ' sea derivable en ' + i$('x=' + x0) + '.',
        answer: { kind: 'multi', parts: [{ kind: 'number', label: 'a=', value: F(a) }, { kind: 'number', label: 'b=', value: F(b) }] },
        steps: [
          'Continuidad en $x=' + x0 + '$: ' + d$(frac('a', x0) + sg(x0) + clamp(Math.abs(x0)) + 'b=' + Lv),
          "Derivadas: $f'(x)=" + polyTex([2 * l2, l1]) + "$ a la izquierda y $f'(x)=-\\frac{a}{x^2}+b$ a la derecha: " + d$('-' + frac('a', x0 * x0) + '+b=' + Ld),
          'Resolvemos el sistema: ' + i$('a=' + a) + ', ' + i$('b=' + b) + '.',
        ],
        data: { mk, x0, sol: [a, b], tipo: 'rac' },
      };
    },
  });

  /* ===================== 4. Derivada por definición ===================== */
  G.define({
    id: 'der-definicion',
    title: 'Derivada por la definición',
    help: [
      'La derivada en $a$ es $f\'(a)=\\displaystyle\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}$. Se calcula $f(a+h)-f(a)$, se simplifica el factor $h$ y se hace $h\\to0$. Con fracciones se reduce a común denominador; con raíces se multiplica por el conjugado.',
      'Ejemplo: $f(x)=x^2$ en $a=3$. $\\frac{(3+h)^2-9}{h}=\\frac{6h+h^2}{h}=6+h\\to6$. Así $f\'(3)=6$.',
    ],
    params: [{ key: 'tipo', label: 'Función', options: [['pol2', 'Cuadrática'], ['pol3', 'Cúbica'], ['rac', 'Racional'], ['raiz', 'Con raíz']] }],
    generate(p) {
      let T;
      if (p.tipo === 'pol2') {
        const a = r(-3, 4), pp = nz(-3, 3), q = r(-4, 4), c = r(-4, 4);
        const val = F(2 * pp * a + q);
        T = {
          ftex: polyTex([pp, q, c]), f: (x) => pp * x * x + q * x + c, a, val,
          q: frac('f(' + a + '+h)-f(' + a + ')', 'h') + '=' + frac(pp + '\\left(' + (2 * a) + 'h+h^2\\right)' + (q ? sg(q) + Math.abs(q) + 'h' : ''), 'h') + '=' + pp + '(' + (2 * a) + '+h)' + tail(q),
          lim: pp + '\\cdot ' + pa(2 * a) + tail(q) + '=' + val.n,
          mist: [{ value: F(pp * a * a + q * a + c), msg: 'has calculado $f(a)$; la derivada es el límite del cociente incremental.' }],
        };
      } else if (p.tipo === 'pol3') {
        const a = r(-2, 3), pp = nz(-2, 2), q = r(-4, 4);
        const val = F(3 * pp * a * a + q);
        T = {
          ftex: polyTex([pp, 0, q, 0]), f: (x) => pp * x * x * x + q * x, a, val,
          q: frac('f(' + a + '+h)-f(' + a + ')', 'h') + '=' + frac(pp + '\\left(' + (3 * a * a) + 'h+' + (3 * a) + 'h^2+h^3\\right)' + (q ? sg(q) + Math.abs(q) + 'h' : ''), 'h') + '=' + pp + '\\left(' + (3 * a * a) + '+' + pa(3 * a) + 'h+h^2\\right)' + tail(q),
          lim: pp + '\\cdot ' + (3 * a * a) + tail(q) + '=' + val.n,
          mist: [{ value: F(3 * pp * a * a), msg: 'no olvides el término $' + polyTex([q, 0]) + '$: su cociente incremental vale $' + q + '$.' }],
        };
      } else if (p.tipo === 'rac') {
        let k, a; do { k = r(-3, 4); a = r(-3, 4); } while (a + k === 0);
        const c = nz(-3, 3), d = a + k, val = F(-c, d * d);
        T = {
          ftex: frac(c, polyTex([1, k])), f: (x) => c / (x + k), a, val,
          q: frac('f(' + a + '+h)-f(' + a + ')', 'h') + '=' + frac(frac(c, d + '+h') + '-' + frac(c, d), 'h') + '=' + frac(-c, '(' + d + '+h)\\cdot ' + pa(d)),
          lim: frac(-c, d + '\\cdot ' + pa(d)) + '=' + ftex(val),
          mist: [{ value: F(c, d * d), msg: 'revisa el signo: al restar $\\frac{' + c + '}{' + d + '+h}-\\frac{' + c + '}{' + d + '}$ el numerador es $' + (-c) + 'h$.' }],
        };
      } else {
        const s = r(1, 4), a = r(-3, 5), kk = s * s - a, c = nz(-3, 3), val = F(c, 2 * s);
        T = {
          ftex: (c === 1 ? '' : c === -1 ? '-' : c) + '\\sqrt{' + polyTex([1, kk]) + '}', f: (x) => c * Math.sqrt(x + kk), a, val,
          q: frac('f(' + a + '+h)-f(' + a + ')', 'h') + '=' + c + '\\cdot ' + frac('\\sqrt{' + s * s + '+h}-' + s, 'h') + '=' + c + '\\cdot ' + frac('h', 'h\\left(\\sqrt{' + s * s + '+h}+' + s + '\\right)') + '=' + frac(c, '\\sqrt{' + s * s + '+h}+' + s),
          lim: frac(c, s + '+' + s) + '=' + ftex(val),
          mist: [{ value: F(c, s), msg: 'el denominador es $\\sqrt{' + s * s + '}+' + s + '=' + (2 * s) + '$, no $' + s + '$.' }],
        };
      }
      return {
        prompt: 'Calcula, usando la definición de derivada (límite del cociente incremental), ' + i$("f'(" + T.a + ')') + ' para ' + i$('f(x)=' + T.ftex) + '.',
        answer: { kind: 'number', label: "f'(" + T.a + ')=', value: T.val },
        steps: ['Cociente incremental: ' + d$(T.q), 'Hacemos $h\\to0$: ' + d$("f'(" + T.a + ')=' + T.lim)],
        mistakes: T.mist,
        data: { f: T.f, a: T.a },
      };
    },
  });

  /* ===================== 5. Derivadas sucesivas ===================== */
  const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
  const ordTex = (n) => (n <= 3 ? "f" + "'".repeat(n) : 'f^{(' + n + ')}');
  G.define({
    id: 'der-sucesivas',
    title: 'Derivadas sucesivas',
    help: [
      'Se deriva $f$, luego $f\'$, etc.: $f\'\'=(f\')\'$ y $f\'\'\'=(f\'\')\'$. Conviene simplificar cada derivada antes de seguir. Para la derivada $n$-ésima se deriva varias veces buscando el patrón: $\\operatorname{sen}$ y $\\cos$ se repiten cada 4 derivadas, $(e^{kx})^{(n)}=k^ne^{kx}$.',
      'Ejemplo: $f(x)=x^3-2x$. $f\'=3x^2-2$, $f\'\'=6x$, $f\'\'\'=6$. Así $f\'\'(2)=12$. Otro: $(\\operatorname{sen}x)\'=\\cos x$, $(\\operatorname{sen}x)\'\'=-\\operatorname{sen}x$, $(\\operatorname{sen}x)\'\'\'=-\\cos x$ y $(\\operatorname{sen}x)^{(4)}=\\operatorname{sen}x$.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['pol', 'Polinomios y 1/x'], ['trasc', 'Con e^x, ln, sen'], ['patron', 'Derivada n-ésima en 0']] }],
    generate(p) {
      if (p.tipo === 'patron') {
        const caso = pick(['sin', 'cos', 'exp', 'geo', 'log']);
        let k = 1, n, tex, cells;
        if (caso === 'sin' || caso === 'cos') { k = r(1, 2); n = r(3, 9); }
        else if (caso === 'exp') { k = pick([-1, 2, 3]); n = r(3, 5); }
        else n = r(3, 7);
        let val, st;
        const kx = polyTex([k, 0]);
        if (caso === 'sin') {
          tex = '\\operatorname{sen}(' + kx + ')';
          val = n % 2 === 0 ? 0 : Math.pow(k, n) * (((n - 1) / 2) % 2 === 0 ? 1 : -1);
          st = ['Derivando: $f\'=' + clamp(k) + '\\cos(' + kx + ')$, $f\'\'=-' + (k * k === 1 ? '' : k * k) + '\\operatorname{sen}(' + kx + ')$, y el patrón se repite cada 4 derivadas multiplicando por $' + k + '$ cada vez.', 'En $x=0$: con $n$ par vale $0$ (queda un seno). Con $n=' + n + '$: ' + (n % 2 === 0 ? 'es par, vale $0$.' : 'es impar, queda ' + i$('\\pm' + k + '^{' + n + '}') + ' con signo ' + (((n - 1) / 2) % 2 === 0 ? '$+$' : '$-$') + ': $' + val + '$.')];
        } else if (caso === 'cos') {
          tex = '\\cos(' + kx + ')';
          val = n % 2 === 1 ? 0 : Math.pow(k, n) * ((n / 2) % 2 === 0 ? 1 : -1);
          st = ['Derivando: $f\'=-' + clamp(k) + '\\operatorname{sen}(' + kx + ')$, $f\'\'=-' + (k * k === 1 ? '' : k * k) + '\\cos(' + kx + ')$, y el patrón se repite cada 4 derivadas multiplicando por $' + k + '$ cada vez.', 'En $x=0$: con $n$ impar vale $0$ (queda un seno). Con $n=' + n + '$: ' + (n % 2 === 1 ? 'es impar, vale $0$.' : 'es par, queda ' + i$('\\pm' + k + '^{' + n + '}') + ' con signo ' + ((n / 2) % 2 === 0 ? '$+$' : '$-$') + ': $' + val + '$.')];
        } else if (caso === 'exp') {
          tex = 'e^{' + kx + '}';
          val = Math.pow(k, n);
          st = ['Cada derivada multiplica por $' + k + '$: ' + i$('(e^{' + kx + '})^{(n)}=' + pa(k) + '^{n}e^{' + kx + '}') + '.', 'En $x=0$, $e^0=1$: ' + i$(pa(k) + '^{' + n + '}=' + val) + '.'];
        } else if (caso === 'geo') {
          tex = frac(1, '1-x');
          val = fact(n);
          st = ['$f\'=(1-x)^{-2}$, $f\'\'=2(1-x)^{-3}$, $f\'\'\'=6(1-x)^{-4}$: en general $f^{(n)}=n!\\,(1-x)^{-(n+1)}$.', 'En $x=0$: ' + i$(n + '!=' + val) + '.'];
        } else {
          tex = '\\ln(1+x)';
          val = (n % 2 === 1 ? 1 : -1) * fact(n - 1);
          st = ['$f\'=(1+x)^{-1}$, $f\'\'=-(1+x)^{-2}$, $f\'\'\'=2(1+x)^{-3}$: en general $f^{(n)}=(-1)^{n-1}(n-1)!\\,(1+x)^{-n}$.', 'En $x=0$: ' + i$('(-1)^{' + (n - 1) + '}\\cdot ' + (n - 1) + '!=' + val) + '.'];
        }
        return {
          prompt: 'Calcula ' + i$('f^{(' + n + ')}(0)') + ' para ' + i$('f(x)=' + tex) + '.',
          answer: { kind: 'number', label: 'f^{(' + n + ')}(0)=', value: F(val) },
          steps: st,
          mistakes: val === 0 ? [] : [{ value: F(-val), msg: 'revisa el signo: el patrón de derivadas de seno y coseno cambia de signo cada dos derivadas.' }],
          data: { caso, k, n, val },
        };
      }
      if (p.tipo === 'pol') {
        const ord = pick([2, 3]);
        if (rnd.float() < 0.5) {
          const co = [nz(-2, 2), r(-3, 3), r(-4, 4), r(-4, 4), r(-5, 5)], x0 = r(-2, 3);
          const d1 = [4 * co[0], 3 * co[1], 2 * co[2], co[3]], d2 = [12 * co[0], 6 * co[1], 2 * co[2]], d3 = [24 * co[0], 6 * co[1]];
          const fn = (x) => pev(co, x), fv = ord === 2 ? pev(d2, x0) : pev(d3, x0);
          return {
            prompt: 'Calcula ' + i$(ordTex(ord) + '(' + x0 + ')') + ' para ' + i$('f(x)=' + polyTex(co)) + '.',
            answer: { kind: 'number', label: ordTex(ord) + '(' + x0 + ')=', value: F(fv) },
            steps: ["$f'(x)=" + polyTex(d1) + '$', "$f''(x)=" + polyTex(d2) + '$' + (ord === 3 ? ", $f'''(x)=" + polyTex(d3) + '$' : ''), 'Evaluamos: ' + i$(ordTex(ord) + '(' + x0 + ')=' + fv) + '.'],
            mistakes: [{ value: F(pev(d1, x0)), msg: 'te has quedado en la derivada primera: hay que derivar ' + ord + ' veces.' }],
            data: { f: fn, x0, ord },
          };
        }
        const a = nz(-3, 3), b = nz(-4, 4), x0 = pick([1, 2, -1]);
        const fv = ord === 2 ? 12 * a * x0 * x0 + 2 * b / Math.pow(x0, 3) : 24 * a * x0 - 6 * b / Math.pow(x0, 4);
        const val = ord === 2 ? fsum(F(12 * a * x0 * x0), F(2 * b, Math.pow(x0, 3))) : fsum(F(24 * a * x0), F(-6 * b, Math.pow(x0, 4)));
        return {
          prompt: 'Calcula ' + i$(ordTex(ord) + '(' + x0 + ')') + ' para ' + i$('f(x)=' + clamp(a) + 'x^4' + sg(b) + frac(Math.abs(b), 'x')) + '.',
          answer: { kind: 'number', label: ordTex(ord) + '(' + x0 + ')=', value: val },
          steps: ["Escribimos $f(x)=" + clamp(a) + 'x^4' + sg(b) + Math.abs(b) + 'x^{-1}$.', "$f'(x)=" + clamp(4 * a) + 'x^3' + sg(-b) + Math.abs(b) + "x^{-2}$, $f''(x)=" + clamp(12 * a) + 'x^2' + sg(2 * b) + Math.abs(2 * b) + 'x^{-3}$' + (ord === 3 ? ", $f'''(x)=" + clamp(24 * a) + 'x' + sg(-6 * b) + Math.abs(6 * b) + 'x^{-4}$' : '') + '.', 'Evaluamos en $x=' + x0 + '$: ' + i$(ftex(val)) + '.'],
          mistakes: [],
          data: { f: (x) => a * Math.pow(x, 4) + b / x, x0, ord },
        };
      }
      // trasc
      const E = pick([0, 1, 2, 3, 4, 5]);
      let T;
      if (E === 0) { const k = pick([1, 2, -1, 3]); T = { tex: 'x\\,e^{' + clamp(k) + 'x}', f: (x) => x * Math.exp(k * x), ord: 2, x0: 1, x0tex: '1', num: (2 * k + k * k) * Math.exp(k), show: '(' + (2 * k + k * k) + ')*e^(' + k + ')', valtex: (2 * k + k * k === 1 ? '' : 2 * k + k * k) + numK(k), st: ["$f'(x)=e^{" + clamp(k) + "x}(1+" + clamp(k) + 'x)$, $f\'\'(x)=e^{' + clamp(k) + 'x}(' + 2 * k + '+' + clamp(k * k) + 'x)$.'] }; }
      else if (E === 1) { const e = rnd.float() < 0.5; T = { tex: 'x^2\\ln x', f: (x) => x * x * Math.log(x), ord: 2, x0: e ? Math.E : 1, x0tex: e ? 'e' : '1', val: F(e ? 5 : 3), st: ["$f'(x)=2x\\ln x+x$, $f''(x)=2\\ln x+2+1=2\\ln x+3$."], valtex: e ? '5' : '3' }; }
      else if (E === 2) { const x0 = pick([1, 2, 4]); T = { tex: 'x^2\\ln x', f: (x) => x * x * Math.log(x), ord: 3, x0, x0tex: String(x0), val: F(2, x0), st: ["$f'(x)=2x\\ln x+x$, $f''(x)=2\\ln x+3$, $f'''(x)=\\frac{2}{x}$."], valtex: ftex(F(2, x0)) }; }
      else if (E === 3) { const z = rnd.float() < 0.5; T = { tex: 'e^{x}\\operatorname{sen}x', f: (x) => Math.exp(x) * Math.sin(x), ord: 2, x0: z ? 0 : Math.PI, x0tex: z ? '0' : '\\pi', ...(z ? { val: F(2), valtex: '2' } : { num: -2 * Math.exp(Math.PI), show: '-2*e^pi', valtex: '-2e^{\\pi}' }), st: ["$f'(x)=e^x(\\operatorname{sen}x+\\cos x)$, $f''(x)=e^x(2\\cos x)=2e^x\\cos x$."] }; }
      else if (E === 4) { const z = rnd.float() < 0.5; T = { tex: 'x\\operatorname{sen}x', f: (x) => x * Math.sin(x), ord: 2, x0: z ? Math.PI : Math.PI / 2, x0tex: z ? '\\pi' : '\\frac{\\pi}{2}', ...(z ? { val: F(-2), valtex: '-2' } : { num: -Math.PI / 2, show: '-pi/2', valtex: '-\\frac{\\pi}{2}' }), st: ["$f'(x)=\\operatorname{sen}x+x\\cos x$, $f''(x)=2\\cos x-x\\operatorname{sen}x$."] }; }
      else { const x0 = pick([1, 2, -1]), o = pick([2, 3]); const den = 1 + x0 * x0; const v = o === 2 ? F(-2 * x0, den * den) : F(6 * x0 * x0 - 2, den * den * den); T = { tex: '\\operatorname{arctg}x', f: Math.atan, ord: o, x0, x0tex: String(x0), val: v, valtex: ftex(v), st: ["$f'(x)=\\frac{1}{1+x^2}$, $f''(x)=\\frac{-2x}{(1+x^2)^2}$" + (o === 3 ? ", $f'''(x)=\\frac{6x^2-2}{(1+x^2)^3}$" : '') + '.'] }; }
      return {
        prompt: 'Calcula ' + i$(ordTex(T.ord) + '(' + T.x0tex + ')') + ' para ' + i$('f(x)=' + T.tex) + '.' + (T.val ? '' : ' <small>(valor exacto, p. ej. <code>2*e</code>, <code>-pi/2</code>)</small>'),
        answer: T.val ? { kind: 'number', label: ordTex(T.ord) + '(' + T.x0tex + ')=', value: T.val } : { kind: 'expr', label: ordTex(T.ord) + '(' + T.x0tex + ')=', value: T.num, show: T.show },
        steps: T.st.concat(['Evaluamos en $x=' + T.x0tex + '$: ' + i$(ordTex(T.ord) + '(' + T.x0tex + ')=' + T.valtex) + '.']),
        mistakes: [],
        data: { f: T.f, x0: T.x0, ord: T.ord },
      };
    },
  });

  /* ===================== 6. Parámetros a partir de la tangente ===================== */
  G.define({
    id: 'der-parametro',
    title: 'Hallar parámetros con la derivada',
    help: [
      'Cada dato sobre la gráfica da una ecuación: «pasa por $(x_0,y_0)$» es $f(x_0)=y_0$; «pendiente $m$ en $x_0$» es $f\'(x_0)=m$; «extremo relativo (o tangente horizontal) en $x_0$» es $f\'(x_0)=0$. Con dos parámetros se resuelve un sistema $2\\times2$.',
      'Ejemplo: $f(x)=ax^2+bx$ pasa por $(1,5)$ y su tangente en $x=1$ tiene pendiente $4$. Entonces $a+b=5$ y $f\'(1)=2a+b=4$. Restando, $a=-1$ y $b=6$.',
    ],
    params: [{ key: 'tipo', label: 'Datos', options: [['recta', 'Punto y pendiente de la tangente'], ['extremo', 'Extremo relativo en un punto']] }],
    generate(p) {
      const x0 = pick([1, 2, 3, -1, -2]);
      if (p.tipo === 'extremo') {
        const a = r(-4, 4), b = -3 * x0 * x0 - 2 * a * x0, y0 = x0 * x0 * x0 + a * x0 * x0 + b * x0;
        return {
          prompt: 'La función ' + i$('f(x)=x^3+ax^2+bx') + ' tiene un extremo relativo en el punto ' + i$('(' + x0 + ',' + y0 + ')') + '. Halla ' + i$('a') + ' y ' + i$('b') + '.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'a=', value: F(a) }, { kind: 'number', label: 'b=', value: F(b) }] },
          steps: [
            'Pasa por el punto: ' + d$('f(' + x0 + ')=' + y0 + '\\ \\Rightarrow\\ ' + clamp(x0 * x0) + 'a' + sg(x0) + clamp(Math.abs(x0)) + 'b=' + (y0 - x0 * x0 * x0)),
            "Extremo relativo: $f'(" + x0 + ")=0$, con $f'(x)=3x^2+2ax+b$: " + d$((3 * x0 * x0) + sg(x0) + clamp(Math.abs(2 * x0)) + 'a+b=0'),
            'Resolviendo: ' + i$('a=' + a) + ', ' + i$('b=' + b) + '.',
          ],
          data: { mk: (v) => (x) => x * x * x + v[0] * x * x + v[1] * x, x0, y0, m: 0, sol: [a, b], tipo: 'extremo' },
        };
      }
      const a = nz(-3, 3), b = r(-5, 5), y0 = a * x0 * x0 + b * x0, m = 2 * a * x0 + b;
      return {
        prompt: 'La gráfica de ' + i$('f(x)=ax^2+bx') + ' pasa por el punto ' + i$('(' + x0 + ',' + y0 + ')') + ' y su tangente en ' + i$('x=' + x0) + ' tiene pendiente ' + i$(String(m)) + '. Halla ' + i$('a') + ' y ' + i$('b') + '.',
        answer: { kind: 'multi', parts: [{ kind: 'number', label: 'a=', value: F(a) }, { kind: 'number', label: 'b=', value: F(b) }] },
        steps: [
          'Pasa por el punto: ' + d$('f(' + x0 + ')=' + y0 + '\\ \\Rightarrow\\ ' + clamp(x0 * x0) + 'a' + sg(x0) + clamp(Math.abs(x0)) + 'b=' + y0),
          "Pendiente: $f'(x)=2ax+b$ y $f'(" + x0 + ')=' + m + '$: ' + d$(clamp(2 * x0) + 'a+b=' + m),
          'Resolviendo: ' + i$('a=' + a) + ', ' + i$('b=' + b) + '.',
        ],
        data: { mk: (v) => (x) => v[0] * x * x + v[1] * x, x0, y0, m, sol: [a, b], tipo: 'recta' },
      };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
