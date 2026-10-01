/* Ejercicios interactivos — 2º Bachillerato, tema 8: Aplicaciones de la derivada.
 * Módulos: apl-criticos, apl-monotonia, apl-inflexion, apl-absolutos, apl-parametros, apl-optimizacion, apl-teoremas.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, ftex, d$, i$ } = G;

  /* ---------- Polinomios con coeficientes enteros c[i] de x^i ---------- */
  const pev = (c, x) => c.reduceRight((s, a) => s * x + a, 0);
  const pder = (c) => c.slice(1).map((a, i) => a * (i + 1));
  function pmul(a, b) {
    const r = Array(a.length + b.length - 1).fill(0);
    a.forEach((x, i) => b.forEach((y, j) => { r[i + j] += x * y; }));
    return r;
  }
  /** Coeficientes de q(x-h). */
  function pshift(q, h) {
    let r = [0];
    for (let i = q.length - 1; i >= 0; i--) { r = pmul(r, [-h, 1]); r[0] += q[i]; }
    return r;
  }
  function pt(c, v) {
    v = v || 'x';
    let s = '';
    for (let i = c.length - 1; i >= 0; i--) {
      const a = c[i];
      if (!a) continue;
      const ab = Math.abs(a);
      const pw = i === 0 ? '' : i === 1 ? v : v + '^{' + i + '}';
      const t = i === 0 ? String(ab) : ab === 1 ? pw : ab + pw;
      s += s === '' ? (a < 0 ? '-' : '') + t : (a < 0 ? '-' : '+') + t;
    }
    return s || '0';
  }
  const xm = (m) => (m === 0 ? 'x' : '(x' + (m > 0 ? '+' + m : m) + ')');
  const lin = (r) => (r === 0 ? 'x' : '(x' + (r < 0 ? '+' + (-r) : '-' + r) + ')');
  const par = (n) => (n < 0 ? '(' + n + ')' : String(n));
  const sg = (k) => (k < 0 ? '-' : '');
  const num = (n) => (n < 0 ? '-' + Math.abs(n) : String(n));
  const INF = '\\infty';
  const bound = (x) => (x === Infinity ? '+' + INF : x === -Infinity ? '-' + INF : String(x));
  const iv = (lo, hi) => '(' + bound(lo) + ',' + bound(hi) + ')';
  const fx = (n, d) => ftex(F(n, d));
  const sgn = (x) => (x > 0 ? 1 : -1);

  const tidy = (t) => (typeof t !== 'string' ? t : t.replace(/\\(?:d?)frac\{([^{}]*)\}\{1\}/g, '$1'));
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

  /* ===================== 1. Puntos críticos y su clasificación ===================== */
  function critCase(fun) {
    const k = rnd.pick([1, -1]);
    if (fun === 'cubica') {
      const p = rnd.int(-4, 3), q = rnd.int(p + 1, Math.min(p + 5, 4));
      const c = [rnd.int(-5, 5), 6 * p * q * k, -3 * (p + q) * k, 2 * k];
      const c2 = pder(pder(c));
      return {
        ftex: pt(c), fptex: pt(pder(c)), fpfac: sg(k) + '6' + lin(p) + lin(q), crit: [p, q], dom: '',
        f: (x) => pev(c, x), fpp: (x) => pev(c2, x), fpptex: pt(c2),
      };
    }
    if (fun === 'cuartica') {
      const a = rnd.int(1, 3), h = rnd.int(-2, 2);
      const c = pshift([0, 0, -2 * a * a, 0, 1], h).map((x) => x * k);
      c[0] += rnd.int(-4, 4);
      const c2 = pder(pder(c));
      return {
        ftex: pt(c), fptex: pt(pder(c)), fpfac: sg(k) + '4' + lin(h - a) + lin(h) + lin(h + a), crit: [h - a, h, h + a], dom: '',
        f: (x) => pev(c, x), fpp: (x) => pev(c2, x), fpptex: pt(c2),
      };
    }
    if (fun === 'racional') {
      const a = rnd.int(1, 4);
      return {
        ftex: sg(k) + '\\dfrac{x^2+' + a * a + '}{x}', fptex: sg(k) + '\\dfrac{x^2-' + a * a + '}{x^2}',
        fpfac: sg(k) + '\\dfrac{(x-' + a + ')(x+' + a + ')}{x^2}', crit: [-a, a], dom: ' (con $x\\neq0$)',
        f: (x) => k * (x * x + a * a) / x, fpp: (x) => k * 2 * a * a / (x * x * x), fpptex: sg(k) + '\\dfrac{' + 2 * a * a + '}{x^3}',
      };
    }
    // exp: f = k (x^2 - c) e^x ;  f' = k (x-p)(x-q) e^x  con p+q=-2
    const [p, q, c] = rnd.pick([[1, -3, 3], [2, -4, 8], [0, -2, 0], [3, -5, 15]]);
    return {
      ftex: sg(k) + (c ? '(x^2-' + c + ')' : 'x^2') + 'e^{x}', fptex: sg(k) + '(x^2+2x' + (c ? '-' + c : '') + ')e^{x}',
      fpfac: sg(k) + lin(p) + lin(q) + 'e^{x}', crit: [q, p], dom: '',
      f: (x) => k * (x * x - c) * Math.exp(x), fpp: (x) => k * (x * x + 4 * x + 2 - c) * Math.exp(x),
      fpptex: sg(k) + '(x^2+4x' + (2 - c > 0 ? '+' + (2 - c) : 2 - c < 0 ? String(2 - c) : '') + ')e^{x}',
    };
  }

  def({
    id: 'apl-criticos',
    title: 'Puntos críticos y extremos relativos',
    help: [
      'Los puntos críticos son las soluciones de $f\'(x)=0$ (dentro del dominio). Para clasificarlos: si $f\'\'(a)>0$ es un <b>mínimo</b> relativo y si $f\'\'(a)<0$ es un <b>máximo</b> relativo. Si $f\'\'(a)=0$ hay que estudiar el signo de $f\'$ a ambos lados.',
      'Ejemplo: $f(x)=x^3-3x$. $f\'(x)=3x^2-3=3(x-1)(x+1)$, así que los puntos críticos son $x=-1$ y $x=1$. Como $f\'\'(x)=6x$: $f\'\'(-1)=-6<0$ (máximo) y $f\'\'(1)=6>0$ (mínimo).',
    ],
    params: [
      { key: 'fun', label: 'Función', options: [['cubica', 'Polinómica de grado 3'], ['cuartica', 'Polinómica de grado 4'], ['racional', 'Racional'], ['exp', 'Con exponencial']] },
      { key: 'ask', label: 'Pregunta', options: [['puntos', 'Hallar los puntos críticos'], ['clas', 'Clasificarlos']] },
    ],
    generate(p) {
      const C = critCase(p.fun);
      const crit = C.crit;
      const kinds = crit.map((r) => (C.fpp(r) > 0 ? 'min' : 'max'));
      const steps = [
        'Derivamos: ' + d$('f\'(x)=' + C.fptex),
        'Factorizamos y resolvemos ' + i$('f\'(x)=0') + ': ' + d$('f\'(x)=' + C.fpfac + '=0\\ \\Rightarrow\\ ' + crit.map((r) => 'x=' + r).join(',\\ ')),
      ];
      let answer, mistakes = [];
      if (p.ask === 'puntos') {
        answer = { kind: 'list', label: 'x=', value: crit.map((r) => F(r)) };
        steps.push('Estos son los puntos críticos (todos están en el dominio' + (p.fun === 'racional' ? ', que excluye ' + i$('x=0') : '') + ').');
        mistakes.push({ value: crit.map((r) => F(-r)), msg: 'has cambiado el signo de las raíces: de $(x-a)=0$ sale $x=a$, y de $(x+a)=0$ sale $x=-a$.' });
        if (crit.length === 3) mistakes.push({ value: [F(crit[0]), F(crit[2])], msg: 'te falta un punto crítico: el factor $x$ (o $x-h$) que sale fuera del paréntesis también da una raíz.' });
        if (p.fun === 'racional') mistakes.push({ value: [F(crit[1])], msg: '$x^2=a^2$ tiene <b>dos</b> soluciones, $x=a$ y $x=-a$.' });
      } else {
        const mx = crit.filter((_, i) => kinds[i] === 'max').map((r) => F(r));
        const mn = crit.filter((_, i) => kinds[i] === 'min').map((r) => F(r));
        answer = {
          kind: 'multi', parts: [
            { kind: 'list', label: '\\text{máximos: }x=', value: mx.length ? mx : [F(0)] },
            { kind: 'list', label: '\\text{mínimos: }x=', value: mn.length ? mn : [F(0)] },
          ],
        };
        steps.push('Segunda derivada: ' + d$('f\'\'(x)=' + C.fpptex));
        steps.push('Signo de ' + i$('f\'\'') + ' en cada punto crítico: ' + crit.map((r, i) => i$('f\'\'(' + r + ')' + (kinds[i] === 'min' ? '>0' : '<0')) + (kinds[i] === 'min' ? ' (mínimo)' : ' (máximo)')).join('; ') + '.');
        if (!mx.length || !mn.length) throw new Error('caso sin máximo o sin mínimo');
      }
      return {
        prompt: 'Sea ' + i$('f(x)=' + C.ftex) + C.dom + '. ' + (p.ask === 'puntos' ? 'Halla sus puntos críticos (escribe las abscisas separadas por punto y coma).' : 'Halla las abscisas de sus máximos y de sus mínimos relativos.'),
        answer, steps, mistakes,
        data: { fun: p.fun, ask: p.ask, f: C.f, crit, kinds },
      };
    },
  });

  /* ===================== 2. Monotonía ===================== */
  def({
    id: 'apl-monotonia',
    title: 'Crecimiento y decrecimiento',
    help: [
      'Si $f\'>0$ en un intervalo, $f$ es creciente en él; si $f\'<0$, es decreciente. Se resuelve $f\'(x)=0$, se dividen el dominio en intervalos con esos puntos y se estudia el signo de $f\'$ en cada uno.',
      'Ejemplo: $f(x)=x^3-3x$, $f\'(x)=3(x-1)(x+1)$. Signo de $f\'$: $+$ en $(-\\infty,-1)$, $-$ en $(-1,1)$, $+$ en $(1,+\\infty)$. Luego $f$ crece en $(-\\infty,-1)\\cup(1,+\\infty)$ y decrece en $(-1,1)$.',
    ],
    params: [{ key: 'fun', label: 'Función', options: [['cubica', 'Polinómica de grado 3'], ['log', 'Con logaritmo'], ['exp', 'Con exponencial']] }],
    generate(p) {
      const k = rnd.pick([1, -1]);
      let ftxt, fptxt, fac, f, dom = '', correct, opts, ask, sgnText;
      let msgs = {};
      if (p.fun === 'cubica') {
        const a = rnd.int(-4, 3), b = rnd.int(a + 1, Math.min(a + 5, 4));
        const c = [rnd.int(-5, 5), 6 * a * b * k, -3 * (a + b) * k, 2 * k];
        ftxt = pt(c); fptxt = pt(pder(c)); fac = sg(k) + '6' + lin(a) + lin(b);
        f = (x) => pev(c, x);
        ask = k > 0 ? 'decrece' : 'crece';
        correct = [[a, b]];
        opts = [correct, [[-Infinity, a]], [[b, Infinity]], [[-Infinity, a], [b, Infinity]]];
        sgnText = 'Signo de ' + i$('f\'') + ': ' + i$(k > 0 ? '+' : '-') + ' en ' + i$(iv(-Infinity, a)) + ', ' + i$(k > 0 ? '-' : '+') + ' en ' + i$(iv(a, b)) + ', ' + i$(k > 0 ? '+' : '-') + ' en ' + i$(iv(b, Infinity)) + '.';
        var crit = [a, b];
      } else if (p.fun === 'log') {
        const a = rnd.int(2, 5);
        ftxt = k > 0 ? 'x-' + a + '\\ln x' : '-(x-' + a + '\\ln x)'; fptxt = k > 0 ? '1-\\dfrac{' + a + '}{x}' : '-\\left(1-\\dfrac{' + a + '}{x}\\right)'; fac = sg(k) + '\\dfrac{x-' + a + '}{x}';
        dom = ' en su dominio ' + i$('(0,+\\infty)');
        f = (x) => k * (x - a * Math.log(x));
        ask = rnd.pick(['crece', 'decrece']);
        const wantRight = (k > 0) === (ask === 'crece');
        correct = wantRight ? [[a, Infinity]] : [[0, a]];
        opts = [correct, wantRight ? [[0, a]] : [[a, Infinity]], [[0, Infinity]], [[0, 2 * a]]];
        sgnText = 'Signo de ' + i$('f\'') + ' (el denominador ' + i$('x') + ' es positivo en el dominio): ' + i$(k > 0 ? '-' : '+') + ' en ' + i$(iv(0, a)) + ' y ' + i$(k > 0 ? '+' : '-') + ' en ' + i$(iv(a, Infinity)) + '.';
        var crit = [a];
      } else {
        const a = rnd.int(1, 3);
        const ee = a === 1 ? 'e^{-x}' : 'e^{-x/' + a + '}';
        ftxt = sg(k) + 'x\\,' + ee; fptxt = sg(k) + (a === 1 ? '(1-x)' : '\\left(1-\\dfrac{x}{' + a + '}\\right)') + ee; fac = sg(k) + (a === 1 ? '(1-x)' : '\\dfrac{' + a + '-x}{' + a + '}') + '\\,' + ee;
        f = (x) => k * x * Math.exp(-x / a);
        ask = rnd.pick(['crece', 'decrece']);
        const wantLeft = (k > 0) === (ask === 'crece');
        correct = wantLeft ? [[-Infinity, a]] : [[a, Infinity]];
        opts = [correct, wantLeft ? [[a, Infinity]] : [[-Infinity, a]], [[-Infinity, Infinity]], [[-a, Infinity]]];
        sgnText = 'Como ' + i$(ee + '>0') + ', el signo de ' + i$('f\'') + ' es el de ' + i$(sg(k) + '(' + a + '-x)') + ': ' + i$(k > 0 ? '+' : '-') + ' en ' + i$(iv(-Infinity, a)) + ' y ' + i$(k > 0 ? '-' : '+') + ' en ' + i$(iv(a, Infinity)) + '.';
        var crit = [a];
      }
      const labels = opts.map((o) => i$(o.map(([lo, hi]) => iv(lo, hi)).join('\\cup')));
      const order = rnd.shuffle([0, 1, 2, 3]);
      const options = order.map((i) => labels[i]);
      const value = order.indexOf(0);
      const text = ask === 'crece' ? 'creciente' : 'decreciente';
      const mistakes = order.map((oi, pos) => ({ oi, pos })).filter((x) => x.oi !== 0).map(({ oi, pos }) => ({
        value: pos,
        msg: 'en ' + labels[oi] + ' la función no es ' + text + ' en todo el intervalo: revisa el signo de $f\'$ en cada tramo (el intervalo correcto es ' + labels[0] + ').',
      }));
      return {
        prompt: 'Sea ' + i$('f(x)=' + ftxt) + dom + '. ¿En cuál de estos intervalos es ' + i$('f') + ' <b>' + text + '</b>?',
        answer: { kind: 'choice', options, value },
        steps: [
          'Derivamos: ' + d$('f\'(x)=' + fptxt),
          'Factorizamos y resolvemos ' + i$('f\'(x)=0') + ': ' + d$('f\'(x)=' + fac + '\\ \\Rightarrow\\ ' + crit.map((r) => 'x=' + r).join(',\\ ')),
          sgnText,
          'Por tanto ' + i$('f') + ' es ' + text + ' en ' + labels[0] + '.',
        ],
        mistakes,
        data: { fun: p.fun, f, ask, options: order.map((i) => opts[i]), value, lowerLimit: p.fun === 'log' ? 0 : -Infinity },
      };
    },
  });

  /* ===================== 3. Puntos de inflexión ===================== */
  def({
    id: 'apl-inflexion',
    title: 'Puntos de inflexión',
    help: [
      'Un punto de inflexión es donde cambia la curvatura: $f\'\'$ se anula y <b>cambia de signo</b>. Se resuelve $f\'\'(x)=0$ y se comprueba el cambio de signo (o que $f\'\'\'(a)\\neq0$). Su ordenada es $f(a)$.',
      'Ejemplo: $f(x)=x^3-6x^2+x$. $f\'(x)=3x^2-12x+1$, $f\'\'(x)=6x-12=6(x-2)$. Se anula en $x=2$ y cambia de signo ($-$ a la izquierda, $+$ a la derecha). Inflexión en $(2,\\,f(2))=(2,-14)$.',
    ],
    params: [{ key: 'fun', label: 'Función', options: [['cubica', 'Polinómica de grado 3'], ['cuartica', 'Polinómica de grado 4'], ['exp', 'Con exponencial'], ['gauss', 'Campana']] }],
    generate(p) {
      const k = rnd.pick([1, -1]);
      if (p.fun === 'cubica') {
        const h = rnd.int(-3, 3), b = rnd.int(-6, 6), d = rnd.int(-5, 5);
        const c = [d, k * b, -3 * h * k, k];
        const y = pev(c, h);
        return {
          prompt: 'Halla el punto de inflexión de ' + i$('f(x)=' + pt(c)) + '.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'x=', value: F(h) }, { kind: 'number', label: 'y=', value: F(y) }] },
          steps: [
            'Derivamos dos veces: ' + d$('f\'(x)=' + pt(pder(c)) + '\\qquad f\'\'(x)=' + pt(pder(pder(c)))),
            'Resolvemos ' + i$('f\'\'(x)=0') + ': ' + d$(sg(k) + '6' + lin(h) + '=0\\ \\Rightarrow\\ x=' + h) + 'Cambia de signo en ese punto, así que es de inflexión.',
            'Ordenada: ' + i$('f(' + h + ')=' + y) + '.',
          ],
          data: { fun: 'cubica', f: (x) => pev(c, x), pts: [h], y },
        };
      }
      if (p.fun === 'cuartica') {
        let a, b;
        do { a = rnd.int(-3, 3); b = rnd.int(-3, 3); } while (a >= b);
        const c = [rnd.int(-4, 4), rnd.int(-5, 5), 6 * a * b * k, -2 * (a + b) * k, k];
        return {
          prompt: 'Halla las abscisas de los puntos de inflexión de ' + i$('f(x)=' + pt(c)) + '.',
          answer: { kind: 'list', label: 'x=', value: [F(a), F(b)] },
          steps: [
            'Derivamos dos veces: ' + d$('f\'(x)=' + pt(pder(c)) + '\\qquad f\'\'(x)=' + pt(pder(pder(c)))),
            'Factorizamos ' + i$('f\'\'') + ': ' + d$('f\'\'(x)=' + sg(k) + '12' + lin(a) + lin(b) + '=0\\ \\Rightarrow\\ x=' + a + ',\\ x=' + b),
            'Son raíces simples, luego ' + i$('f\'\'') + ' cambia de signo en ambas: hay dos inflexiones.',
          ],
          mistakes: [{ value: [F(-a), F(-b)], msg: 'cuidado con el signo: de $(x-a)=0$ sale $x=a$.' }, { value: [F(a)], msg: 'hay otra raíz de $f\'\'$ que también es inflexión.' }],
          data: { fun: 'cuartica', f: (x) => pev(c, x), pts: [a, b] },
        };
      }
      if (p.fun === 'exp') {
        const m = rnd.int(-3, 3);
        const x0 = -m - 2;
        return {
          prompt: 'Halla la abscisa del punto de inflexión de ' + i$('f(x)=' + xm(m) + 'e^{x}') + '.',
          answer: { kind: 'number', label: 'x=', value: F(x0) },
          steps: [
            'Derivamos: ' + d$('f\'(x)=e^x+' + xm(m) + 'e^x=' + xm(m + 1) + 'e^x'),
            'Otra vez: ' + d$('f\'\'(x)=e^x+' + xm(m + 1) + 'e^x=' + xm(m + 2) + 'e^x'),
            'Como ' + i$('e^x>0') + ', ' + i$('f\'\'=0') + ' sólo si ' + i$(pt([m + 2, 1]) + '=0') + ', es decir ' + i$('x=' + x0) + ', y ahí cambia de signo.',
          ],
          mistakes: [{ value: F(-m - 1), msg: 'ése es el punto crítico (donde se anula $f\'$). La inflexión se busca con $f\'\'$.' }],
          data: { fun: 'exp', f: (x) => (x + m) * Math.exp(x), pts: [x0] },
        };
      }
      const a = rnd.int(1, 3);
      return {
        prompt: 'Halla las abscisas de los puntos de inflexión de ' + i$('f(x)=e^{-x^2/' + 2 * a * a + '}') + '.',
        answer: { kind: 'list', label: 'x=', value: [F(-a), F(a)] },
        steps: [
          'Derivamos: ' + d$('f\'(x)=-' + (a === 1 ? '' : '\\frac{1}{' + a * a + '}') + 'x\\,e^{-x^2/' + 2 * a * a + '}'),
          'Otra vez (derivada de un producto): ' + d$('f\'\'(x)=\\left(-\\frac{1}{' + a * a + '}+\\frac{x^2}{' + a ** 4 + '}\\right)e^{-x^2/' + 2 * a * a + '}=\\frac{x^2-' + a * a + '}{' + a ** 4 + '}\\,e^{-x^2/' + 2 * a * a + '}'),
          i$('f\'\'=0') + ' implica ' + i$('x^2=' + a * a) + ', es decir ' + i$('x=-' + a) + ' y ' + i$('x=' + a) + '; en ambos ' + i$('f\'\'') + ' cambia de signo.',
        ],
        mistakes: [{ value: [F(a)], msg: '$x^2=' + a * a + '$ tiene dos soluciones, $x=\\pm' + a + '$.' }, { value: [F(0)], msg: '$x=0$ es el máximo (ahí $f\'=0$), no una inflexión.' }],
        data: { fun: 'gauss', f: (x) => Math.exp(-x * x / (2 * a * a)), pts: [-a, a] },
      };
    },
  });

  /* ===================== 4. Extremos absolutos en un intervalo ===================== */
  def({
    id: 'apl-absolutos',
    title: 'Extremos absolutos en un intervalo cerrado',
    help: [
      'Si $f$ es continua en $[a,b]$, tiene máximo y mínimo absolutos. Se calcula $f$ en los extremos $a$, $b$ y en los puntos críticos que estén <b>dentro</b> de $[a,b]$; el mayor valor es el máximo y el menor es el mínimo.',
      'Ejemplo: $f(x)=x^3-3x$ en $[0,3]$. $f\'(x)=3x^2-3=0\\Rightarrow x=\\pm1$; sólo $x=1$ está en el intervalo. Valores: $f(0)=0$, $f(1)=-2$, $f(3)=18$. Máximo absoluto $18$ (en $x=3$), mínimo absoluto $-2$ (en $x=1$).',
    ],
    params: [
      { key: 'fun', label: 'Función', options: [['cubica', 'Polinómica de grado 3'], ['racional', 'Racional']] },
      { key: 'ask', label: 'Pedir', options: [['valor', 'Valores'], ['abscisa', 'Abscisas']] },
    ],
    generate(p) {
      for (;;) {
        let f, ftxt, fptxt, crit, lo, hi, vals;
        if (p.fun === 'cubica') {
          const a = rnd.int(-3, 2), b = rnd.int(a + 1, Math.min(a + 4, 3));
          const k = rnd.pick([1, -1]);
          const c = [rnd.int(-5, 5), 6 * a * b * k, -3 * (a + b) * k, 2 * k];
          lo = rnd.int(-5, 2); hi = rnd.int(lo + 3, lo + 7);
          f = (x) => pev(c, x);
          ftxt = pt(c); fptxt = pt(pder(c)) + '=' + sg(k) + '6' + lin(a) + lin(b);
          crit = [a, b];
          vals = (x) => F(pev(c, x));
        } else {
          const a = rnd.int(1, 4);
          lo = rnd.int(1, a); hi = rnd.int(a, a + 5);
          if (lo === hi) continue;
          f = (x) => (x * x + a * a) / x;
          ftxt = '\\dfrac{x^2+' + a * a + '}{x}'; fptxt = '\\dfrac{x^2-' + a * a + '}{x^2}=\\dfrac{(x-' + a + ')(x+' + a + ')}{x^2}';
          crit = [-a, a];
          vals = (x) => F(x * x + a * a, x);
        }
        const cand = [lo].concat(crit.filter((r) => r > lo && r < hi), [hi]);
        const vs = cand.map(vals);
        const val = (q) => q.n / q.d;
        const mx = Math.max(...vs.map(val)), mn = Math.min(...vs.map(val));
        const imx = vs.map(val).map((v, i) => (Math.abs(v - mx) < 1e-9 ? i : -1)).filter((i) => i >= 0);
        const imn = vs.map(val).map((v, i) => (Math.abs(v - mn) < 1e-9 ? i : -1)).filter((i) => i >= 0);
        if (imx.length !== 1 || imn.length !== 1) continue;
        const inside = crit.filter((r) => r > lo && r < hi);
        const rows = cand.map((x, i) => i$('f(' + x + ')=' + ftex(vs[i])));
        const answer = p.ask === 'valor'
          ? { kind: 'multi', parts: [{ kind: 'number', label: '\\text{máximo}=', value: vs[imx[0]] }, { kind: 'number', label: '\\text{mínimo}=', value: vs[imn[0]] }] }
          : { kind: 'multi', parts: [{ kind: 'number', label: '\\text{máximo en }x=', value: F(cand[imx[0]]) }, { kind: 'number', label: '\\text{mínimo en }x=', value: F(cand[imn[0]]) }] };
        return {
          prompt: 'Halla los extremos absolutos de ' + i$('f(x)=' + ftxt) + ' en el intervalo ' + i$('[' + lo + ',' + hi + ']') + '. ' + (p.ask === 'valor' ? 'Escribe el valor máximo y el valor mínimo que alcanza.' : 'Escribe las abscisas donde se alcanzan.'),
          answer,
          steps: [
            'Puntos críticos: ' + d$('f\'(x)=' + fptxt + '=0\\ \\Rightarrow\\ x=' + crit.join(',\\ x=')) + 'En ' + i$('[' + lo + ',' + hi + ']') + (inside.length ? (inside.length > 1 ? ' están ' : ' está ') + inside.map((r) => i$('x=' + r)).join(' y ') + '.' : ' no hay ninguno (sólo cuentan los extremos).'),
            'Valores en los extremos y en los críticos interiores: ' + rows.join(', ') + '.',
            'El mayor valor es ' + i$(ftex(vs[imx[0]])) + ' (en ' + i$('x=' + cand[imx[0]]) + ') y el menor es ' + i$(ftex(vs[imn[0]])) + ' (en ' + i$('x=' + cand[imn[0]]) + ').',
          ],
          data: { f, lo, hi, ask: p.ask, xmax: cand[imx[0]], xmin: cand[imn[0]] },
        };
      }
    },
  });

  /* ===================== 5. Parámetros con condiciones ===================== */
  def({
    id: 'apl-parametros',
    title: 'Hallar parámetros con condiciones',
    help: [
      'Cada condición da una ecuación: «extremo en $x=p$» significa $f\'(p)=0$; «inflexión en $x=h$» significa $f\'\'(h)=0$; «pasa por $(q,s)$» significa $f(q)=s$. Se plantea el sistema con los parámetros y se resuelve.',
      'Ejemplo: $f(x)=x^3+ax$ con un extremo en $x=2$. $f\'(x)=3x^2+a$, y $f\'(2)=0$ da $12+a=0$, es decir $a=-12$.',
    ],
    params: [{ key: 'tipo', label: 'Condiciones', options: [['ext2', 'Dos extremos'], ['parab', 'Vértice y punto'], ['infl', 'Inflexión y extremo']] }],
    generate(p) {
      if (p.tipo === 'ext2') {
        let a, b;
        do { a = rnd.int(-3, 3); b = rnd.int(-3, 3); } while (a >= b || (a + b) % 2 !== 0);
        const A = -3 * (a + b) / 2, B = 3 * a * b;
        return {
          prompt: 'Halla ' + i$('a') + ' y ' + i$('b') + ' para que ' + i$('f(x)=x^3+ax^2+bx') + ' tenga extremos relativos en ' + i$('x=' + a) + ' y en ' + i$('x=' + b) + '.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'a=', value: F(A) }, { kind: 'number', label: 'b=', value: F(B) }] },
          steps: [
            'Derivamos: ' + i$('f\'(x)=3x^2+2ax+b') + '. Las dos condiciones son ' + i$('f\'(' + a + ')=0') + ' y ' + i$('f\'(' + b + ')=0') + '.',
            'Como ' + i$('f\'') + ' es una parábola con raíces ' + i$(a) + ' y ' + i$(b) + ': ' + d$('f\'(x)=3' + lin(a) + lin(b) + '=' + pt([B, -3 * (a + b), 3])),
            'Comparando coeficientes: ' + i$('2a=' + -3 * (a + b)) + ' y ' + i$('b=' + B) + ', luego ' + i$('a=' + A) + ', ' + i$('b=' + B) + '.',
          ],
          data: { tipo: 'ext2', f: (x) => x ** 3 + A * x * x + B * x, ext: [a, b] },
        };
      }
      if (p.tipo === 'parab') {
        const a = rnd.pick([-3, -2, -1, 1, 2, 3]), pp = rnd.pick([-3, -2, -1, 1, 2, 3]), c = rnd.int(-5, 5);
        const b = -2 * a * pp;
        const f = (x) => a * x * x + b * x + c;
        const r = f(pp);
        let q;
        do { q = rnd.int(-4, 4); } while (q === pp);
        const s = f(q);
        return {
          prompt: 'La parábola ' + i$('f(x)=ax^2+bx+c') + ' tiene un extremo en el punto ' + i$('(' + pp + ',' + r + ')') + ' y pasa por ' + i$('(' + q + ',' + s + ')') + '. Halla ' + i$('a,\\ b,\\ c') + '.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'a=', value: F(a) }, { kind: 'number', label: 'b=', value: F(b) }, { kind: 'number', label: 'c=', value: F(c) }] },
          steps: [
            'Tres condiciones: ' + d$('f\'(' + pp + ')=0:\\ 2a\\cdot' + par(pp) + '+b=0\\qquad f(' + pp + ')=' + r + '\\qquad f(' + q + ')=' + s),
            'Restando ' + i$('f(' + q + ')-f(' + pp + ')=a(' + q + '-' + par(pp) + ')(' + q + '+' + par(pp) + ')+b(' + q + '-' + par(pp) + ')') + ' y usando ' + i$('b=-2a\\cdot' + par(pp)) + ' queda ' + i$('a(' + q + '-' + par(pp) + ')^2=' + (s - r)) + ', luego ' + i$('a=' + a) + '.',
            'Entonces ' + i$('b=-2\\cdot' + par(a) + '\\cdot' + par(pp) + '=' + b) + ' y, de ' + i$('f(' + pp + ')=' + r) + ', ' + i$('c=' + c) + '.',
          ],
          data: { tipo: 'parab', f, ext: [pp], pts: [[pp, r], [q, s]], coef: [a, b, c] },
        };
      }
      let h, pp;
      do { h = rnd.int(-3, 3); pp = rnd.int(-3, 3); } while (pp === h);
      const A = -3 * h, B = -3 * pp * pp + 6 * h * pp;
      return {
        prompt: 'Halla ' + i$('a') + ' y ' + i$('b') + ' para que ' + i$('f(x)=x^3+ax^2+bx') + ' tenga un punto de inflexión en ' + i$('x=' + h) + ' y un extremo relativo en ' + i$('x=' + pp) + '.',
        answer: { kind: 'multi', parts: [{ kind: 'number', label: 'a=', value: F(A) }, { kind: 'number', label: 'b=', value: F(B) }] },
        steps: [
          'Derivadas: ' + i$('f\'(x)=3x^2+2ax+b') + ' y ' + i$('f\'\'(x)=6x+2a') + '.',
          'Inflexión: ' + i$('f\'\'(' + h + ')=0\\Rightarrow 6\\cdot' + par(h) + '+2a=0\\Rightarrow a=' + A) + '.',
          'Extremo: ' + i$('f\'(' + pp + ')=0\\Rightarrow 3\\cdot' + par(pp) + '^2+2\\cdot' + par(A) + '\\cdot' + par(pp) + '+b=0\\Rightarrow b=' + B) + '.',
        ],
        data: { tipo: 'infl', f: (x) => x ** 3 + A * x * x + B * x, ext: [pp], infl: [h] },
      };
    },
  });

  /* ===================== 6. Optimización ===================== */
  def({
    id: 'apl-optimizacion',
    title: 'Problemas de optimización',
    help: [
      'Método: (1) escribe la función a optimizar; (2) usa la condición del enunciado para dejarla con <b>una</b> variable; (3) indica el dominio; (4) resuelve $F\'(x)=0$; (5) comprueba con $F\'\'$ (o con los extremos del dominio) que es máximo o mínimo; (6) responde a lo que se pide.',
      'Ejemplo: dos números positivos suman $10$; ¿cuándo es máximo su producto? $P(x)=x(10-x)=10x-x^2$, $P\'(x)=10-2x=0\\Rightarrow x=5$, y $P\'\'=-2<0$ (máximo). Los números son $5$ y $5$ y el producto máximo es $25$.',
    ],
    params: [{ key: 'tipo', label: 'Problema', options: [['valla', 'Valla junto a un río'], ['caja', 'Caja sin tapa'], ['numeros', 'Dos números'], ['perimetro', 'Perímetro mínimo'], ['beneficio', 'Beneficio máximo']] }],
    generate(p) {
      const askX = rnd.pick([true, false]);
      let prompt, f, lo, hi, goal, xo, steps, bad, bad2 = null;
      if (p.tipo === 'valla') {
        const m = rnd.int(3, 12), L = 4 * m;
        xo = m; f = (x) => x * (L - 2 * x); lo = 0; hi = L / 2; goal = 'max';
        prompt = 'Un ganadero dispone de ' + i$(L + '\\ \\text{m}') + ' de valla para cercar un prado rectangular junto a un río (el lado del río no necesita valla). Si ' + i$('x') + ' es la longitud de cada lado perpendicular al río, ' + (askX ? 'halla ' + i$('x') + ' para que el área sea máxima.' : 'halla el área máxima que puede cercar.');
        steps = [
          'El lado paralelo al río mide ' + i$(L + '-2x') + '. Área: ' + i$('A(x)=x(' + L + '-2x)=' + L + 'x-2x^2') + ', con ' + i$('0<x<' + L / 2) + '.',
          i$('A\'(x)=' + L + '-4x=0\\Rightarrow x=' + m) + '. Como ' + i$('A\'\'=-4<0') + ', es un máximo.',
          'Área máxima: ' + i$('A(' + m + ')=' + m + '\\cdot' + (L - 2 * m) + '=' + f(m)) + '.',
        ];
        bad = askX ? { v: L / 2, msg: 'ése es el lado paralelo al río ($L-2x$), no el lado $x$ que se pide.' } : { v: m, msg: 'ése es el valor de $x$ que da el máximo; falta calcular el área $A(x)$.' };
      } else if (p.tipo === 'caja') {
        const m = rnd.int(1, 4), L = 6 * m;
        xo = m; f = (x) => x * (L - 2 * x) ** 2; lo = 0; hi = L / 2; goal = 'max';
        prompt = 'Con una cartulina cuadrada de ' + i$(L + '\\ \\text{cm}') + ' de lado se hace una caja sin tapa recortando un cuadrado de lado ' + i$('x') + ' en cada esquina. ' + (askX ? 'Halla ' + i$('x') + ' para que el volumen sea máximo.' : 'Halla el volumen máximo de la caja.');
        steps = [
          'La base mide ' + i$(L + '-2x') + ' y la altura ' + i$('x') + ': ' + i$('V(x)=x(' + L + '-2x)^2') + ', con ' + i$('0<x<' + L / 2) + '.',
          i$('V\'(x)=(' + L + '-2x)^2-4x(' + L + '-2x)=(' + L + '-2x)(' + L + '-6x)=0') + ', luego ' + i$('x=' + L / 2) + ' (volumen 0) o ' + i$('x=' + m) + '. Con ' + i$('x=' + m) + ' ' + i$('V') + ' pasa de crecer a decrecer: máximo.',
          'Volumen máximo: ' + i$('V(' + m + ')=' + m + '\\cdot' + (L - 2 * m) + '^2=' + f(m)) + '.',
        ];
        bad = askX ? { v: L / 2, msg: '$x=' + L / 2 + '$ también anula $V\'$, pero ahí el volumen es 0: es el mínimo.' } : { v: m, msg: 'ése es el valor de $x$; el volumen máximo es $V(x)$ evaluado en él.' };
      } else if (p.tipo === 'numeros') {
        const m = rnd.int(2, 8), S = 3 * m;
        xo = 2 * m; f = (x) => x * x * (S - x); lo = 0; hi = S; goal = 'max';
        prompt = 'Dos números positivos ' + i$('x') + ' e ' + i$('y') + ' suman ' + i$(S) + '. ' + (askX ? 'Halla ' + i$('x') + ' para que ' + i$('x^2y') + ' sea máximo.' : 'Halla el máximo valor de ' + i$('x^2y') + '.');
        steps = [
          'Con ' + i$('y=' + S + '-x') + ': ' + i$('P(x)=x^2(' + S + '-x)=' + S + 'x^2-x^3') + ', con ' + i$('0<x<' + S) + '.',
          i$('P\'(x)=' + 2 * S + 'x-3x^2=x(' + 2 * S + '-3x)=0\\Rightarrow x=' + 2 * m) + ' (la otra raíz, ' + i$('x=0') + ', está fuera del dominio). ' + i$('P\'\'(' + 2 * m + ')=' + 2 * S + '-6\\cdot' + 2 * m + '=' + (2 * S - 12 * m) + '<0') + ': máximo.',
          'Entonces ' + i$('y=' + m) + ' y ' + i$('P=' + 2 * m + '^2\\cdot' + m + '=' + f(2 * m)) + '.',
        ];
        bad = askX ? { v: S / 2, msg: 'repartir a partes iguales no maximiza $x^2y$: $x$ pesa al cuadrado. Deriva $P(x)=x^2(S-x)$.' } : { v: 2 * m, msg: 'ése es el valor de $x$; el máximo de $x^2y$ se obtiene al sustituirlo.' };
        bad2 = askX ? null : F(27 * m * m * m, 8);
      } else if (p.tipo === 'perimetro') {
        const s = rnd.int(2, 9), A = s * s;
        xo = s; f = (x) => 2 * x + 2 * A / x; lo = 0.001; hi = 20 * s; goal = 'min';
        prompt = 'De todos los rectángulos de área ' + i$(A + '\\ \\text{m}^2') + ', ' + (askX ? 'halla la longitud ' + i$('x') + ' de la base del que tiene perímetro mínimo.' : 'halla el perímetro mínimo.');
        steps = [
          'Base ' + i$('x') + ' y altura ' + i$(A + '/x') + '. Perímetro: ' + i$('P(x)=2x+\\dfrac{' + 2 * A + '}{x}') + ', con ' + i$('x>0') + '.',
          i$('P\'(x)=2-\\dfrac{' + 2 * A + '}{x^2}=0\\Rightarrow x^2=' + A + '\\Rightarrow x=' + s) + ' (' + i$('x>0') + '). ' + i$('P\'\'(x)=\\dfrac{' + 4 * A + '}{x^3}>0') + ': mínimo.',
          'Es un cuadrado de lado ' + i$(s) + ' y perímetro ' + i$('P=' + f(s)) + '.',
        ];
        bad = askX ? { v: A, msg: '$' + A + '$ es el área, no el lado: el lado sale de $x^2=' + A + '$.' } : { v: s, msg: 'ése es el lado; el perímetro de un cuadrado de lado $x$ es $4x$.' };
      } else {
        const k = rnd.int(1, 4);
        xo = 2 * k; f = (x) => -(x ** 3) + 3 * k * x * x; lo = 0; hi = 3 * k; goal = 'max';
        prompt = 'El beneficio (en miles de euros) de una empresa al fabricar ' + i$('x') + ' cientos de unidades es ' + i$('B(x)=-x^3+' + 3 * k + 'x^2') + ', con ' + i$('0\\le x\\le' + 3 * k) + '. ' + (askX ? 'Halla cuántos cientos de unidades dan el beneficio máximo.' : 'Halla el beneficio máximo (en miles de euros).');
        steps = [
          i$('B\'(x)=-3x^2+' + 6 * k + 'x=-3x(x-' + 2 * k + ')=0\\Rightarrow x=0') + ' o ' + i$('x=' + 2 * k) + '.',
          i$('B\'\'(x)=-6x+' + 6 * k) + ': ' + i$('B\'\'(0)=' + 6 * k + '>0') + ' (mínimo) y ' + i$('B\'\'(' + 2 * k + ')=' + -6 * k + '<0') + ' (máximo).',
          'Beneficio máximo: ' + i$('B(' + 2 * k + ')=-' + 8 * k ** 3 + '+' + 12 * k ** 3 + '=' + f(2 * k)) + '.',
        ];
        bad = askX ? { v: 0, msg: '$x=0$ también anula $B\'$, pero es el mínimo ($B\'\'(0)>0$).' } : { v: 2 * k, msg: 'ése es el valor de $x$ (cientos de unidades); el beneficio es $B(x)$ evaluado en él.' };
      }
      const vopt = f(xo);
      const val = askX ? xo : vopt;
      return {
        prompt,
        answer: { kind: 'number', label: askX ? 'x=' : (p.tipo === 'perimetro' ? 'P_{\\min}=' : p.tipo === 'caja' ? 'V_{\\max}=' : p.tipo === 'valla' ? 'A_{\\max}=' : p.tipo === 'numeros' ? 'P_{\\max}=' : 'B_{\\max}='), value: F(val) },
        steps, mistakes: [{ value: F(bad.v), msg: bad.msg }].concat(bad2 ? [{ value: bad2, msg: 'repartir a partes iguales no maximiza $x^2y$: $x$ pesa al cuadrado.' }] : []),
        data: { tipo: p.tipo, f, lo, hi, goal, xo, vopt, askX, val },
      };
    },
  });

  /* ===================== 7. Teoremas: Bolzano, Rolle y valor medio ===================== */
  def({
    id: 'apl-teoremas',
    title: 'Teoremas de Bolzano, Rolle y del valor medio',
    help: [
      '<b>Bolzano</b>: $f$ continua en $[a,b]$ con $f(a)\\cdot f(b)<0$ implica que existe $c\\in(a,b)$ con $f(c)=0$. <b>Rolle</b>: continua en $[a,b]$, derivable en $(a,b)$ y $f(a)=f(b)$ implica $f\'(c)=0$ para algún $c\\in(a,b)$. <b>Valor medio</b>: existe $c\\in(a,b)$ con $f\'(c)=\\dfrac{f(b)-f(a)}{b-a}$.',
      'Ejemplo (valor medio): $f(x)=x^2$ en $[1,5]$. $\\dfrac{f(5)-f(1)}{5-1}=\\dfrac{24}{4}=6$ y $f\'(c)=2c=6$, luego $c=3$, que está en $(1,5)$. Siempre hay que comprobar que $c$ cae dentro del intervalo abierto.',
    ],
    params: [{ key: 'tipo', label: 'Teorema', options: [['bolzano', 'Bolzano'], ['rolle', 'Rolle'], ['vm', 'Valor medio']] }],
    generate(p) {
      if (p.tipo === 'bolzano') {
        for (;;) {
          const a = rnd.int(1, 4), c0 = rnd.int(-30, 30);
          const f = (x) => x ** 3 + a * x + c0;
          let k = -9;
          while (k < 9 && !(f(k) < 0 && f(k + 1) > 0)) k++;
          if (k >= 9 || k < -4 || k > 3) continue;
          const ks = [k];
          while (ks.length < 4) { const t = rnd.int(-5, 4); if (!ks.includes(t)) ks.push(t); }
          const order = rnd.shuffle([0, 1, 2, 3]);
          const labels = ks.map((t) => i$('[' + t + ',' + (t + 1) + ']'));
          const options = order.map((i) => labels[i]);
          const mistakes = order.map((oi, pos) => ({ oi, pos })).filter((x) => x.oi !== 0).map(({ oi, pos }) => ({
            value: pos,
            msg: 'en ' + labels[oi] + ' los valores $f(' + ks[oi] + ')=' + f(ks[oi]) + '$ y $f(' + (ks[oi] + 1) + ')=' + f(ks[oi] + 1) + '$ tienen el mismo signo: Bolzano no asegura ninguna raíz ahí.',
          }));
          return {
            prompt: 'Sea ' + i$('f(x)=x^3' + (a === 1 ? '+x' : '+' + a + 'x') + (c0 >= 0 ? '+' + c0 : String(c0))) + ' (continua en ' + i$('\\mathbb{R}') + '). ¿En cuál de estos intervalos asegura el teorema de Bolzano que ' + i$('f(x)=0') + ' tiene solución?',
            answer: { kind: 'choice', options, value: order.indexOf(0) },
            steps: [
              'Bolzano pide ' + i$('f(a)\\cdot f(b)<0') + '. Calculamos ' + i$('f') + ' en los extremos de los intervalos:',
              ks.slice().sort((x, y) => x - y).map((t) => i$('f(' + t + ')=' + f(t) + ',\\ f(' + (t + 1) + ')=' + f(t + 1))).join('; ') + '.',
              'Sólo en ' + labels[0] + ' hay cambio de signo: ' + i$('f(' + k + ')=' + f(k) + '<0') + ' y ' + i$('f(' + (k + 1) + ')=' + f(k + 1) + '>0') + '.',
            ],
            mistakes,
            data: { tipo: 'bolzano', f, ks: order.map((i) => ks[i]), value: order.indexOf(0) },
          };
        }
      }
      if (p.tipo === 'rolle') {
        const a = rnd.int(-3, 2), b = rnd.int(a + 2, a + 6);
        const f = (x) => (x - a) ** 2 * (x - b);
        const c = F(a + 2 * b, 3);
        return {
          prompt: 'Comprueba que ' + i$('f(x)=' + xm(-a) + '^2' + xm(-b)) + ' cumple las hipótesis del teorema de Rolle en ' + i$('[' + a + ',' + b + ']') + ' y halla el valor ' + i$('c\\in(' + a + ',' + b + ')') + ' con ' + i$('f\'(c)=0') + '.',
          answer: { kind: 'number', label: 'c=', value: c },
          steps: [
            'Es un polinomio (continuo y derivable) y ' + i$('f(' + a + ')=0=f(' + b + ')') + ': se cumplen las hipótesis.',
            'Derivamos: ' + d$('f\'(x)=2(x-' + par(a) + ')(x-' + par(b) + ')+(x-' + par(a) + ')^2=(x-' + par(a) + ')(3x-' + par(a + 2 * b) + ')'),
            i$('f\'(x)=0') + ' da ' + i$('x=' + a) + ' (extremo del intervalo, no sirve) o ' + i$('x=' + ftex(c)) + ', que sí está en ' + i$('(' + a + ',' + b + ')') + '.',
          ],
          mistakes: [{ value: F(a), msg: '$x=' + a + '$ anula $f\'$ pero es un extremo del intervalo; $c$ debe estar en el intervalo <b>abierto</b>.' }],
          data: { tipo: 'rolle', f, lo: a, hi: b, c: (a + 2 * b) / 3 },
        };
      }
      const kind = rnd.pick(['inv', 'raiz', 'cuad']);
      if (kind === 'inv') {
        const pairs = [[1, 4], [1, 9], [2, 8], [4, 9], [1, 16], [3, 12], [4, 16], [9, 16], [2, 18], [1, 25], [4, 25], [3, 27]];
        const [m, n] = rnd.pick(pairs);
        const c = Math.round(Math.sqrt(m * n));
        return {
          prompt: 'Aplica el teorema del valor medio a ' + i$('f(x)=\\dfrac1x') + ' en ' + i$('[' + m + ',' + n + ']') + ' y halla el valor ' + i$('c') + ' que lo cumple.',
          answer: { kind: 'number', label: 'c=', value: F(c) },
          steps: [
            'Pendiente de la cuerda: ' + d$('\\frac{f(' + n + ')-f(' + m + ')}{' + n + '-' + m + '}=\\frac{\\frac1{' + n + '}-\\frac1{' + m + '}}{' + (n - m) + '}=-\\frac1{' + m * n + '}'),
            'Como ' + i$('f\'(x)=-\\dfrac1{x^2}') + ', imponemos ' + i$('-\\dfrac1{c^2}=-\\dfrac1{' + m * n + '}\\Rightarrow c^2=' + m * n) + '.',
            'Con ' + i$('c>0') + ' resulta ' + i$('c=' + c) + ', que está en ' + i$('(' + m + ',' + n + ')') + '.',
          ],
          mistakes: [{ value: F(m + n, 2), msg: 'el punto medio sólo sirve para parábolas. Aquí hay que resolver $f\'(c)=\\dfrac{f(b)-f(a)}{b-a}$.' }],
          data: { tipo: 'vm', f: (x) => 1 / x, lo: m, hi: n, c },
        };
      }
      if (kind === 'raiz') {
        let m, n;
        do { m = rnd.int(1, 5); n = rnd.int(m + 1, 7); } while ((m + n) % 2 !== 0);
        const c = F((m + n) * (m + n), 4);
        return {
          prompt: 'Aplica el teorema del valor medio a ' + i$('f(x)=\\sqrt x') + ' en ' + i$('[' + m * m + ',' + n * n + ']') + ' y halla el valor ' + i$('c') + ' que lo cumple.',
          answer: { kind: 'number', label: 'c=', value: c },
          steps: [
            'Pendiente de la cuerda: ' + d$('\\frac{\\sqrt{' + n * n + '}-\\sqrt{' + m * m + '}}{' + n * n + '-' + m * m + '}=\\frac{' + (n - m) + '}{' + (n * n - m * m) + '}=\\frac1{' + (n + m) + '}'),
            'Como ' + i$('f\'(x)=\\dfrac1{2\\sqrt x}') + ': ' + i$('\\dfrac1{2\\sqrt c}=\\dfrac1{' + (n + m) + '}\\Rightarrow\\sqrt c=' + ftex(F(n + m, 2))) + '.',
            'Luego ' + i$('c=' + ftex(c)) + ', que está en el intervalo.',
          ],
          mistakes: [{ value: F(m * m + n * n, 2), msg: 'el punto medio del intervalo no sirve aquí (sólo en parábolas). Resuelve $f\'(c)=\\dfrac{f(b)-f(a)}{b-a}$.' }],
          data: { tipo: 'vm', f: (x) => Math.sqrt(x), lo: m * m, hi: n * n, c: (c.n / c.d) },
        };
      }
      let a, b, A2, B1, C0;
      a = rnd.int(-3, 3); b = rnd.int(a + 2, a + 6); A2 = rnd.pick([1, 2, 3, -1, -2]); B1 = rnd.int(-4, 4); C0 = rnd.int(-3, 3);
      const f = (x) => A2 * x * x + B1 * x + C0;
      const c = F(a + b, 2);
      return {
        prompt: 'Aplica el teorema del valor medio a ' + i$('f(x)=' + pt([C0, B1, A2])) + ' en ' + i$('[' + a + ',' + b + ']') + ' y halla el valor ' + i$('c') + ' que lo cumple.',
        answer: { kind: 'number', label: 'c=', value: c },
        steps: [
          'Pendiente de la cuerda: ' + d$('\\frac{f(' + b + ')-f(' + a + ')}{' + b + '-' + par(a) + '}=\\frac{' + f(b) + '-' + par(f(a)) + '}{' + (b - a) + '}=' + ftex(F(f(b) - f(a), b - a))),
          i$('f\'(x)=' + pt([B1, 2 * A2])) + ', e imponemos ' + i$('f\'(c)=' + ftex(F(f(b) - f(a), b - a))) + '.',
          'Despejamos: ' + i$('c=' + ftex(c)) + ', que pertenece a ' + i$('(' + a + ',' + b + ')') + '.',
        ],
        mistakes: [{ value: F(f(b) - f(a), b - a), msg: 'ésa es la pendiente de la cuerda, no $c$: hay que igualarla a $f\'(c)$ y despejar $c$.' }],
        data: { tipo: 'vm', f, lo: a, hi: b, c: (a + b) / 2 },
      };
    },
  });

  /* ===================== Gráficas 2D (JSXGraph, ver graficas.js) ===================== */
  // Marca los puntos notables del reto (críticos, extremos, inflexiones, c de los teoremas).
  function plotDe(d) {
    if (typeof d.f !== 'function') return null;
    const xs = [];
    const add = (v) => { if (Array.isArray(v)) v.forEach(add); else if (typeof v === 'number' && Number.isFinite(v)) xs.push(v); else if (v && typeof v === 'object' && 'n' in v) xs.push(v.n / v.d); };
    ['crit', 'ext', 'infl', 'xmax', 'xmin', 'c', 'xo'].forEach((k) => add(d[k]));
    (d.pts || []).forEach((p) => add(Array.isArray(p) ? p[0] : p));
    const lo = Number.isFinite(d.lo) ? d.lo : null, hi = Number.isFinite(d.hi) ? d.hi : null;
    const all = xs.concat(lo !== null ? [lo] : [], hi !== null ? [hi] : []);
    if (!all.length) all.push(-2, 2);
    let a = Math.min(...all), b = Math.max(...all);
    const pad = Math.max(1, (b - a) * 0.35);
    a -= pad; b += pad;
    if (d.fun === 'log' || d.lowerLimit === 0) a = Math.max(a, 0.02);
    const points = xs.filter((x, i) => xs.indexOf(x) === i && Number.isFinite(d.f(x))).map((x) => ({ x, y: d.f(x), label: '' }));
    const spec = { type: '2d', x: [a, b], curves: [{ f: d.f, label: 'f' }], points };
    if (lo !== null && hi !== null) spec.vlines = [lo, hi];
    return spec;
  }
  Object.keys(G.modules).filter((id) => id.startsWith('apl-')).forEach((id) => {
    const mod = G.modules[id], gen = mod.generate;
    mod.generate = (p) => { const ch = gen(p); const pl = plotDe(ch.data || {}); if (pl) ch.plot = pl; return ch; };
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
