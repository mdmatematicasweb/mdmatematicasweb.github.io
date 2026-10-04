/* Utilidades comunes de los generadores del simulacro CCSS (tipos-ccss-*.js): formato, polinomios y partes. */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, ftex, fstr, d$, i$ } = G;

  /** Las cadenas `show` son texto plano (se escriben en el campo de respuesta): la coma decimal LaTeX `{,}` pasa a `,`. */
  const limpia = (a) => {
    if (a && typeof a.show === 'string') a.show = a.show.replace(/\{,\}/g, ',');
    if (a && a.parts) a.parts.forEach(limpia);
    return a;
  };
  const part = (texto, pts, answer, steps) => ({ texto, pts, answer: limpia(answer), steps });

  /* ---------- decimales con coma española ---------- */
  const trim = (x, nd = 4) => String(parseFloat(x.toFixed(nd)));
  const dtex = (x, nd = 4) => trim(x, nd).replace('.', '{,}');          // dentro de LaTeX
  const dtxt = (x, nd = 4) => trim(x, nd).replace('.', ',');            // texto plano
  const fixt = (x, nd = 4) => x.toFixed(nd).replace('.', '{,}');        // decimales fijos (LaTeX)
  const fixp = (x, nd = 4) => x.toFixed(nd).replace('.', ',');          // decimales fijos (texto)
  const signed = (n) => (n < 0 ? '-' : '+') + Math.abs(n);

  /* ---------- polinomios con coeficientes enteros (grado mayor primero) ---------- */
  const pEval = (c, x) => c.reduce((s, a) => s * x + a, 0);
  const pDer = (c) => c.slice(0, -1).map((a, i) => a * (c.length - 1 - i));
  const pInt = (c) => c.map((a, i) => F(a, c.length - i));                // primitiva sin constante (coeficientes fracción)
  const pEvalF = (cf, x) => cf.reduce((s, a) => G.fadd(G.fmul(s, x), a), F(0)); // cf fracciones, x fracción
  function pTex(c, v = 'x') {
    const n = c.length - 1;
    let s = '';
    c.forEach((a, i) => {
      const e = n - i;
      if (a === 0) return;
      const mag = Math.abs(a);
      const term = e === 0 ? String(mag) : (mag === 1 ? '' : String(mag)) + v + (e === 1 ? '' : '^{' + e + '}');
      s += (a < 0 ? '-' : (s ? '+' : '')) + term;
    });
    return s || '0';
  }
  /** Coeficientes fracción (a/b) → LaTeX de polinomio. */
  function pTexF(cf, v = 'x') {
    const n = cf.length - 1;
    let s = '';
    cf.forEach((a, i) => {
      const e = n - i;
      if (a.n === 0) return;
      const neg = a.n < 0;
      const mag = F(Math.abs(a.n), a.d);
      const coef = e > 0 && mag.n === 1 && mag.d === 1 ? '' : ftex(mag);
      const term = e === 0 ? ftex(mag) : coef + v + (e === 1 ? '' : '^{' + e + '}');
      s += (neg ? '-' : (s ? '+' : '')) + term;
    });
    return s || '0';
  }
  /** Multiplica un polinomio entero por una constante. */
  const pScale = (c, k) => c.map((a) => a * k);
  const pAdd = (a, b) => { const n = Math.max(a.length, b.length); const A = Array(n - a.length).fill(0).concat(a), B = Array(n - b.length).fill(0).concat(b); return A.map((x, i) => x + B[i]); };
  const pMul = (a, b) => { const r = Array(a.length + b.length - 1).fill(0); a.forEach((x, i) => b.forEach((y, j) => { r[i + j] += x * y; })); return r; };

  /** Valor numérico de una fracción. */
  const num = (f) => f.n / f.d;

  /** Una combinación lineal a·m+b como texto LaTeX (para coeficientes con parámetro). */
  function linTex(a, b, v = 'm') {
    if (a === 0) return String(b);
    const pa = a === 1 ? v : a === -1 ? '-' + v : a + v;
    return b === 0 ? pa : pa + (b < 0 ? '-' : '+') + Math.abs(b);
  }

  /** Término «coef·var» para ecuaciones: coef es {a,b} (a·m+b) o número; se omite si es 0. */
  function termTex(coef, v, first) {
    const c = typeof coef === 'number' ? { a: 0, b: coef } : coef;
    if (c.a === 0 && c.b === 0) return '';
    let body;
    if (c.a === 0) body = Math.abs(c.b) === 1 ? '' : String(Math.abs(c.b));
    else if (c.b === 0) body = c.a === 1 || c.a === -1 ? 'm' : Math.abs(c.a) + 'm';
    else body = '(' + linTex(c.a, c.b) + ')';
    const neg = c.a === 0 ? c.b < 0 : (c.b === 0 ? c.a < 0 : false);
    if (c.a !== 0 && c.b !== 0) return (first ? '' : '+') + body + v;
    return (neg ? '-' : (first ? '' : '+')) + body + v;
  }

  /** Ecuación lineal de 3 incógnitas (x,y,z) con coeficientes numéricos o con parámetro. */
  function eqTex(coefs, rhs, vars = ['x', 'y', 'z']) {
    let s = '';
    coefs.forEach((c, i) => { s += termTex(c, vars[i], !s); });
    return (s || '0') + '=' + (typeof rhs === 'number' ? rhs : linTex(rhs.a, rhs.b));
  }
  function systemTex(rows, rhs, vars) { return '\\begin{cases}' + rows.map((r, i) => eqTex(r, rhs[i], vars)).join('\\\\') + '\\end{cases}'; }

  /** Matriz con entradas fracción → LaTeX. */
  const mt = (A) => G.mtex(A);

  /** Formato de un número racional como decimal exacto si es terminante (si no, fracción). */
  function exact(f) { return ftex(f); }

  root.MDExamCCSSUtil = { part, trim, dtex, dtxt, fixt, fixp, signed, pEval, pDer, pInt, pEvalF, pTex, pTexF, pScale, pAdd, pMul, num, linTex, termTex, eqTex, systemTex, mt, exact, G, rnd, F, ftex, fstr, d$, i$ };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.MDExamCCSSUtil;
})(typeof globalThis !== 'undefined' ? globalThis : this);
