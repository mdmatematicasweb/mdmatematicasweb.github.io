/* Ejercicios interactivos — 2º Bachillerato, tema 10: Probabilidad.
 * Módulos: pro-laplace, pro-union, pro-cond, pro-indep, pro-tabla, pro-total, pro-bayes, pro-extrac.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, feq, ftex, i$ } = G;
  // display TeX; colapsa «\frac{a}{b}=\frac{a}{b}» cuando la fracción ya es irreducible
  const d$ = (s) => G.d$(s.replace(/(\\frac\{\d+\}\{\d+\})=\1/g, '$1'));

  /* ---------- utilidades ---------- */
  const terminating = (f) => { let d = f.d; while (d % 2 === 0) d /= 2; while (d % 5 === 0) d /= 5; return d === 1; };
  /** Fracción en TeX; si dec y es decimal exacto, en decimal con coma. */
  const pf = (f, dec) => (dec && f.d > 1 && terminating(f) ? String(f.n / f.d).replace('.', '{,}') : ftex(f));
  const num = (f) => f.n / f.d;
  /** Errores típicos con valor fracción: sin duplicados ni coincidencias con la respuesta. */
  const mist = (ans, list) => list.filter((m, i) => m.value && m.value.d !== 0 && !feq(m.value, ans) && list.findIndex((q) => q.value && feq(q.value, m.value)) === i);
  /** Errores típicos con valor real (respuestas expr): se descartan los cercanos a la respuesta. */
  const emist = (ans, list) => list.filter((m) => Number.isFinite(m.value) && Math.abs(m.value - ans) > 2e-3);
  const pct = (n) => n + '\\,\\%';
  const frN = (n, d) => F(n, d);

  /* ---------- Sucesos A, B con probabilidades enteras sobre un universo de d casos ---------- */
  function sets(dec) {
    for (;;) {
      const d = dec ? rnd.pick([10, 20, 20, 100]) : rnd.pick([12, 15, 18, 24, 30, 36]);
      const a = rnd.int(Math.ceil(d * 0.25), Math.floor(d * 0.7));
      const b = rnd.int(Math.ceil(d * 0.25), Math.floor(d * 0.7));
      const c = rnd.int(1, Math.min(a, b) - 1);
      const u = a + b - c;
      if (c < 1 || u >= d || u <= Math.max(a, b)) continue;
      if (d === 100 && (a % 5 || b % 5 || c % 5)) continue;
      return { d, a, b, c, u };
    }
  }

  /* ===================== 1. Regla de Laplace ===================== */
  const PALOS = ['oros', 'copas', 'espadas', 'bastos'];
  const FIG = (r) => r >= 10;
  G.define({
    id: 'pro-laplace',
    title: 'Regla de Laplace',
    help: [
      'Si todos los casos son equiprobables: $P(A)=\\dfrac{\\text{casos favorables}}{\\text{casos posibles}}$. Para «o» sin repetir casos usa $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$, y para «no» usa el suceso contrario $P(\\overline{A})=1-P(A)$.',
      'Ejemplo (otro suceso): al lanzar un dado, «salir número primo» tiene casos favorables $\\{2,3,5\\}$ y 6 posibles, luego $P=\\frac36=\\frac12$. Con dos dados hay $6\\cdot6=36$ casos posibles: cuenta los pares ordenados.',
    ],
    params: [{ key: 'ctx', label: 'Contexto', options: [['dados', 'Dos dados'], ['urna', 'Urna'], ['cartas', 'Baraja española']] }],
    generate(p) {
      if (p.ctx === 'dados') {
        const kind = rnd.pick(['suma', 'sumage', 'iguales', 'alguno', 'par', 'dif', 'mult']);
        const s = kind === 'suma' ? rnd.int(2, 12) : rnd.int(4, 10), k = rnd.int(1, 6), dd = rnd.int(1, 4);
        let txt, pred, extra = [];
        if (kind === 'suma') { txt = 'la suma de los puntos sea ' + s; pred = (a, b) => a + b === s; extra = [{ value: frN(1, 11), msg: 'los 11 resultados posibles de la suma (de 2 a 12) <b>no</b> son equiprobables: cuenta los 36 pares ordenados.' }]; }
        else if (kind === 'sumage') { txt = 'la suma de los puntos sea al menos ' + s; pred = (a, b) => a + b >= s; }
        else if (kind === 'iguales') { txt = 'los dos dados den el mismo número'; pred = (a, b) => a === b; extra = [{ value: frN(1, 36), msg: 'hay 6 casos favorables (1,1), (2,2), ..., (6,6), no uno solo.' }]; }
        else if (kind === 'alguno') { txt = 'salga al menos un ' + k; pred = (a, b) => a === k || b === k; extra = [{ value: frN(2, 6), msg: 'sumar $\\frac16+\\frac16$ cuenta dos veces el caso $(' + k + ',' + k + ')$: hay 11 casos favorables, no 12.' }]; }
        else if (kind === 'par') { txt = 'el producto de los dos números sea par'; pred = (a, b) => (a * b) % 2 === 0; extra = [{ value: frN(1, 2), msg: 'el producto es impar sólo si <b>los dos</b> son impares (9 casos de 36); el resto, 27 casos, es par.' }]; }
        else if (kind === 'dif') { txt = 'la diferencia (en valor absoluto) de los números sea ' + dd; pred = (a, b) => Math.abs(a - b) === dd; extra = [{ value: frN(6 - dd, 36), msg: 'cada diferencia puede darse en dos órdenes, $(a,b)$ y $(b,a)$: hay ' + 2 * (6 - dd) + ' casos favorables.' }]; }
        else { txt = 'la suma de los puntos sea múltiplo de 3'; pred = (a, b) => (a + b) % 3 === 0; extra = [{ value: frN(4, 11), msg: 'los resultados de la suma no son equiprobables: cuenta los 36 pares ordenados.' }]; }
        let fav = 0; const lst = [];
        for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (pred(a, b)) { fav++; lst.push('(' + a + ',' + b + ')'); }
        const ans = frN(fav, 36);
        if (kind === 'sumage') extra = [{ value: frN((function () { let c = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b > s) c++; return c; })(), 36), msg: '«al menos ' + s + '» incluye también la suma ' + s + ': usa $\\ge$, no $>$.' }];
        return {
          prompt: 'Se lanzan dos dados equilibrados. Halla la probabilidad de que ' + txt + '.',
          answer: { kind: 'number', label: 'P=', value: ans },
          steps: ['Casos posibles: ' + i$('6\\cdot6=36') + ' pares ordenados, todos equiprobables.',
            fav <= 12 ? 'Casos favorables (' + fav + '): ' + i$(lst.join(',\\ ')) : 'Casos favorables: ' + fav + ' (cuenta los pares que cumplen la condición, o usa el suceso contrario).',
            d$('P=\\frac{' + fav + '}{36}=' + ftex(ans))],
          mistakes: mist(ans, extra),
          data: { ctx: 'dados', kind, s, k, dd },
        };
      }
      if (p.ctx === 'urna') {
        const r = rnd.int(2, 8), a = rnd.int(2, 8), v = rnd.int(2, 6), T = r + a + v;
        const kind = rnd.pick(['roja', 'nov', 'roa', 'noroja']);
        const txt = { roja: 'sea roja', nov: 'no sea verde', roa: 'sea roja o azul', noroja: 'no sea roja' }[kind];
        const fav = { roja: r, nov: T - v, roa: r + a, noroja: T - r }[kind];
        const ans = frN(fav, T);
        const extra = {
          roja: [{ value: frN(r, T - r), msg: 'los casos posibles son <b>todas</b> las bolas (' + T + '), no sólo las que no son rojas.' }],
          nov: [{ value: frN(v, T), msg: 'eso es la probabilidad de que <b>sí</b> sea verde; «no verde» es el contrario.' }],
          roa: [{ value: frN(r * a, T * T), msg: 'en una sola extracción «o» se suma (casos incompatibles), no se multiplica.' }],
          noroja: [{ value: frN(r, T), msg: 'eso es la probabilidad de que <b>sí</b> sea roja; «no roja» es el contrario.' }],
        }[kind];
        return {
          prompt: 'Una urna contiene ' + r + ' bolas rojas, ' + a + ' azules y ' + v + ' verdes. Se extrae una bola al azar. Halla la probabilidad de que ' + txt + '.',
          answer: { kind: 'number', label: 'P=', value: ans },
          steps: ['Casos posibles: ' + i$(r + '+' + a + '+' + v + '=' + T) + ' bolas.', 'Casos favorables: ' + fav + '.', d$('P=\\frac{' + fav + '}{' + T + '}=' + ftex(ans))],
          mistakes: mist(ans, extra),
          data: { ctx: 'urna', kind, r, a, v },
        };
      }
      // Baraja española de 40 cartas
      const deck = []; PALOS.forEach((pl, i) => { [1, 2, 3, 4, 5, 6, 7, 10, 11, 12].forEach((r) => deck.push({ pl: i, r })); });
      const pal = rnd.int(0, 3);
      const kind = rnd.pick(['palo', 'figura', 'rey', 'figpalo', 'nofig', 'figdepalo', 'asopalo']);
      const nm = PALOS[pal];
      const def = {
        palo: { txt: 'sea de ' + nm, f: (c) => c.pl === pal },
        figura: { txt: 'sea una figura', f: (c) => FIG(c.r) },
        rey: { txt: 'sea un rey', f: (c) => c.r === 12 },
        figpalo: { txt: 'sea una figura o una carta de ' + nm, f: (c) => FIG(c.r) || c.pl === pal },
        nofig: { txt: 'no sea una figura', f: (c) => !FIG(c.r) },
        figdepalo: { txt: 'sea una figura de ' + nm, f: (c) => FIG(c.r) && c.pl === pal },
        asopalo: { txt: 'sea un as o una carta de ' + nm, f: (c) => c.r === 1 || c.pl === pal },
      }[kind];
      const fav = deck.filter(def.f).length;
      const ans = frN(fav, 40);
      const extra = {
        figpalo: [{ value: frN(22, 40), msg: 'las tres figuras de ' + nm + ' están contadas dos veces: $P(A\\cup B)=\\frac{12}{40}+\\frac{10}{40}-\\frac{3}{40}$.' }],
        asopalo: [{ value: frN(14, 40), msg: 'el as de ' + nm + ' se cuenta dos veces: $P(A\\cup B)=\\frac4{40}+\\frac{10}{40}-\\frac1{40}$.' }],
        nofig: [{ value: frN(12, 40), msg: 'eso es la probabilidad de que <b>sí</b> sea figura; «no figura» es el contrario.' }],
        figura: [{ value: frN(3, 40), msg: 'hay 3 figuras por palo (sota, caballo y rey) y 4 palos: 12 figuras.' }],
      }[kind] || [];
      return {
        prompt: 'De una baraja española de 40 cartas (las figuras son sota, caballo y rey) se extrae una carta al azar. Halla la probabilidad de que ' + def.txt + '.',
        answer: { kind: 'number', label: 'P=', value: ans },
        steps: ['Casos posibles: 40 cartas (4 palos de 10).', 'Casos favorables: ' + fav + '.', d$('P=\\frac{' + fav + '}{40}=' + ftex(ans))],
        mistakes: mist(ans, extra),
        data: { ctx: 'cartas', kind },
      };
    },
  });

  /* ===================== 2. Unión, intersección y De Morgan ===================== */
  G.define({
    id: 'pro-union',
    title: 'Unión, intersección y leyes de De Morgan',
    help: [
      '$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$ · $P(\\overline{A})=1-P(A)$ · leyes de De Morgan: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$ y $\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$ · $P(A\\cap\\overline{B})=P(A)-P(A\\cap B)=P(A\\cup B)-P(B)$.',
      'Ejemplo: si $P(A)=0{,}5$, $P(B)=0{,}4$ y $P(A\\cap B)=0{,}1$, entonces $P(A\\cup B)=0{,}5+0{,}4-0{,}1=0{,}8$ y $P(\\overline{A}\\cap\\overline{B})=P(\\overline{A\\cup B})=1-0{,}8=0{,}2$.',
    ],
    params: [{ key: 'op', label: 'Calcular', options: [['union', 'P(A∪B)'], ['inter', 'P(A∩B)'], ['ninguno', 'Ninguno (De Morgan)'], ['nointer', 'No ambos (De Morgan)'], ['solo', 'Sólo uno']] }],
    generate(p) {
      const dec = rnd.pick([true, false]);
      const { d, a, b, c, u } = sets(dec);
      const P = (n) => frN(n, d), t = (n) => pf(P(n), dec);
      let given, ask, ans, steps, extra = [];
      if (p.op === 'union') {
        given = 'P(A)=' + t(a) + ',\\ P(B)=' + t(b) + ',\\ P(A\\cap B)=' + t(c); ask = 'P(A\\cup B)'; ans = P(u);
        steps = ['Fórmula de la unión: ' + d$('P(A\\cup B)=P(A)+P(B)-P(A\\cap B)'), d$(ask + '=' + t(a) + '+' + t(b) + '-' + t(c) + '=' + t(u))];
        extra = [{ value: P(a + b), msg: 'falta restar $P(A\\cap B)$: la intersección está contada dos veces.' }];
      } else if (p.op === 'inter') {
        given = 'P(A)=' + t(a) + ',\\ P(B)=' + t(b) + ',\\ P(A\\cup B)=' + t(u); ask = 'P(A\\cap B)'; ans = P(c);
        steps = ['Despeja en la fórmula de la unión: ' + d$('P(A\\cap B)=P(A)+P(B)-P(A\\cup B)'), d$(ask + '=' + t(a) + '+' + t(b) + '-' + t(u) + '=' + t(c))];
        extra = [{ value: P(u - a), msg: 'eso es $P(B)-P(A\\cap B)$ o parecido; la intersección es $P(A)+P(B)-P(A\\cup B)$.' }];
      } else if (p.op === 'ninguno') {
        given = 'P(A)=' + t(a) + ',\\ P(B)=' + t(b) + ',\\ P(A\\cap B)=' + t(c); ask = 'P(\\overline{A}\\cap\\overline{B})'; ans = P(d - u);
        steps = ['De Morgan: ' + i$('\\overline{A}\\cap\\overline{B}=\\overline{A\\cup B}') + ', luego ' + i$('P=1-P(A\\cup B)') + '.', 'Unión: ' + i$('P(A\\cup B)=' + t(a) + '+' + t(b) + '-' + t(c) + '=' + t(u))
          , d$(ask + '=1-' + t(u) + '=' + t(d - u))];
        extra = [{ value: P(u), msg: 'eso es $P(A\\cup B)$; «ninguno» es el suceso contrario: $1-P(A\\cup B)$.' }, { value: P(d - c), msg: 'eso es $P(\\overline{A}\\cup\\overline{B})=1-P(A\\cap B)$; «ninguno» es $\\overline{A\\cup B}$.' }];
      } else if (p.op === 'nointer') {
        given = 'P(A)=' + t(a) + ',\\ P(B)=' + t(b) + ',\\ P(A\\cup B)=' + t(u); ask = 'P(\\overline{A}\\cup\\overline{B})'; ans = P(d - c);
        steps = ['De Morgan: ' + i$('\\overline{A}\\cup\\overline{B}=\\overline{A\\cap B}') + ', luego ' + i$('P=1-P(A\\cap B)') + '.', 'Intersección: ' + i$('P(A\\cap B)=' + t(a) + '+' + t(b) + '-' + t(u) + '=' + t(c)), d$(ask + '=1-' + t(c) + '=' + t(d - c))];
        extra = [{ value: P(d - u), msg: 'eso es $P(\\overline{A}\\cap\\overline{B})=1-P(A\\cup B)$; aquí es $\\overline{A\\cap B}$, el contrario de la intersección.' }, { value: P(c), msg: 'eso es $P(A\\cap B)$; se pide su contrario.' }];
      } else {
        given = 'P(B)=' + t(b) + ',\\ P(A\\cup B)=' + t(u); ask = 'P(A\\cap\\overline{B})'; ans = P(u - b);
        steps = [i$('A\\cup B') + ' se descompone en ' + i$('B') + ' y la parte de ' + i$('A') + ' fuera de ' + i$('B') + ': ' + d$('P(A\\cap\\overline{B})=P(A\\cup B)-P(B)'), d$(ask + '=' + t(u) + '-' + t(b) + '=' + t(u - b))];
        extra = [{ value: P(d - b), msg: 'eso es $P(\\overline{B})$. Lo pedido es lo que está en $A$ y fuera de $B$: $P(A\\cup B)-P(B)$.' }];
      }
      return {
        prompt: 'Sean $A$ y $B$ dos sucesos con ' + i$(given) + '. Calcula ' + i$(ask) + '.',
        answer: { kind: 'number', label: ask + '=', value: ans },
        steps, mistakes: mist(ans, extra), data: { op: p.op, d, a, b, c, u },
      };
    },
  });

  /* ===================== 3. Probabilidad condicionada ===================== */
  G.define({
    id: 'pro-cond',
    title: 'Probabilidad condicionada',
    help: [
      '$P(A|B)=\\dfrac{P(A\\cap B)}{P(B)}$ (con $P(B)>0$). De aquí: $P(A\\cap B)=P(B)\\,P(A|B)=P(A)\\,P(B|A)$. Además $P(\\overline{A}|B)=1-P(A|B)$.',
      'Ejemplo: con $P(B)=0{,}5$ y $P(A\\cap B)=0{,}2$, $P(A|B)=\\frac{0{,}2}{0{,}5}=0{,}4$. Si sabes $P(A|B)=0{,}4$ y $P(B)=0{,}5$, entonces $P(A\\cap B)=0{,}5\\cdot0{,}4=0{,}2$.',
    ],
    params: [{ key: 'op', label: 'Calcular', options: [['cond', 'P(A|B)'], ['prod', 'P(A∩B)'], ['union', 'P(A∪B)'], ['inv', 'P(B|A)'], ['compl', 'P(Ā|B)']] }],
    generate(p) {
      const dec = rnd.pick([true, false]);
      const { d, a, b, c, u } = sets(dec);
      const P = (n) => frN(n, d), t = (n) => pf(P(n), dec);
      const cab = frN(c, b), cba = frN(c, a);
      let given, ask, ans, steps, extra;
      if (p.op === 'cond') {
        given = 'P(B)=' + t(b) + ',\\ P(A\\cap B)=' + t(c); ask = 'P(A|B)'; ans = cab;
        steps = [d$('P(A|B)=\\frac{P(A\\cap B)}{P(B)}'), d$(ask + '=\\frac{' + t(c) + '}{' + t(b) + '}=' + ftex(ans))];
        extra = [{ value: P(c), msg: 'falta dividir entre $P(B)$: eso es $P(A\\cap B)$.' }, { value: cba, msg: 'has dividido entre $P(A)$, lo que da $P(B|A)$. En $P(A|B)$ el suceso que se sabe es $B$ y se divide entre $P(B)$.' }];
      } else if (p.op === 'prod') {
        given = 'P(B)=' + t(b) + ',\\ P(A|B)=' + ftex(cab); ask = 'P(A\\cap B)'; ans = P(c);
        steps = ['De la definición: ' + d$('P(A\\cap B)=P(B)\\cdot P(A|B)'), d$(ask + '=' + t(b) + '\\cdot' + ftex(cab) + '=' + t(c))];
        extra = [{ value: G.fadd(P(b), cab), msg: 'se multiplica, no se suma: $P(A\\cap B)=P(B)\\,P(A|B)$.' }];
      } else if (p.op === 'union') {
        given = 'P(A)=' + t(a) + ',\\ P(B)=' + t(b) + ',\\ P(A|B)=' + ftex(cab); ask = 'P(A\\cup B)'; ans = P(u);
        steps = ['Intersección: ' + i$('P(A\\cap B)=P(B)\\,P(A|B)=' + t(b) + '\\cdot' + ftex(cab) + '=' + t(c)), 'Unión: ' + d$(ask + '=' + t(a) + '+' + t(b) + '-' + t(c) + '=' + t(u))];
        extra = [{ value: P(a + b), msg: 'falta restar la intersección $P(A\\cap B)=P(B)P(A|B)$.' }];
      } else if (p.op === 'inv') {
        given = 'P(A)=' + t(a) + ',\\ P(B)=' + t(b) + ',\\ P(A|B)=' + ftex(cab); ask = 'P(B|A)'; ans = cba;
        steps = ['Intersección: ' + i$('P(A\\cap B)=P(B)\\,P(A|B)=' + t(c)), d$(ask + '=\\frac{P(A\\cap B)}{P(A)}=\\frac{' + t(c) + '}{' + t(a) + '}=' + ftex(cba))];
        extra = [{ value: cab, msg: 'ese es el dato $P(A|B)$; hay que dividir la intersección entre $P(A)$.' }, { value: P(c), msg: 'falta dividir entre $P(A)$: eso es $P(A\\cap B)$.' }];
      } else {
        given = 'P(B)=' + t(b) + ',\\ P(A\\cap B)=' + t(c); ask = 'P(\\overline{A}|B)'; ans = frN(b - c, b);
        steps = ['Contrario condicionado: ' + d$('P(\\overline{A}|B)=1-P(A|B)=1-\\frac{' + t(c) + '}{' + t(b) + '}'), d$(ask + '=' + ftex(ans))];
        extra = [{ value: cab, msg: 'eso es $P(A|B)$; se pide $P(\\overline{A}|B)=1-P(A|B)$.' }, { value: P(d - c), msg: 'no se puede hacer $1-P(A\\cap B)$: hay que condicionar a $B$ ($P(\\overline{A}|B)=1-P(A|B)$).' }];
      }
      return {
        prompt: 'Sean $A$ y $B$ dos sucesos con ' + i$(given) + '. Calcula ' + i$(ask) + '.',
        answer: { kind: 'number', label: ask + '=', value: ans },
        steps, mistakes: mist(ans, extra), data: { op: p.op, d, a, b, c, u },
      };
    },
  });

  /* ===================== 4. Independencia ===================== */
  const PRB = [[1, 2], [1, 3], [1, 4], [2, 3], [3, 4], [1, 5], [2, 5], [3, 5], [1, 6], [5, 6], [3, 10], [7, 10], [1, 10], [4, 5]];
  const OPT_IND = ['Independientes', 'No independientes'];
  G.define({
    id: 'pro-indep',
    title: 'Independencia de sucesos',
    help: [
      '$A$ y $B$ son independientes si $P(A\\cap B)=P(A)\\,P(B)$, o equivalentemente $P(A|B)=P(A)$. Si son independientes: $P(A\\cup B)=P(A)+P(B)-P(A)P(B)$. <b>Incompatibles</b> ($A\\cap B=\\varnothing$) no es lo mismo que independientes: dos sucesos incompatibles de probabilidad no nula son siempre dependientes.',
      'Ejemplo: $P(A)=0{,}5$, $P(B)=0{,}4$, $P(A\\cap B)=0{,}2$. Como $P(A)P(B)=0{,}2=P(A\\cap B)$, son independientes. Si fuese $P(A\\cap B)=0{,}3$, serían dependientes.',
    ],
    params: [{ key: 'caso', label: 'Caso', options: [['test', '¿Son independientes?'], ['inter', 'P(A∩B)'], ['union', 'P(A∪B)'], ['x', 'Probabilidad desconocida']] }],
    generate(p) {
      let pa = rnd.pick(PRB), pb = rnd.pick(PRB);
      for (let g = 0; g < 50 && pa[0] / pa[1] === pb[0] / pb[1]; g++) pb = rnd.pick(PRB);
      const A = frN(pa[0], pa[1]), B = frN(pb[0], pb[1]);
      const prod = G.fmul(A, B), uni = G.fsub(G.fadd(A, B), prod);
      if (p.caso === 'test') {
        const mode = rnd.pick(['int', 'int', 'cond', 'union', 'inc']);
        const indep = mode === 'inc' ? false : rnd.pick([true, false]);
        let AB = prod;
        if (!indep && mode !== 'inc') {
          const step = frN(1, prod.d * 10);
          AB = rnd.pick([-1, 1]) === 1 ? G.fadd(prod, step) : G.fsub(prod, step);
          if (num(AB) <= 0 || num(AB) > Math.min(num(A), num(B))) AB = G.fadd(prod, step);
          if (num(AB) > Math.min(num(A), num(B))) AB = G.fsub(prod, step);
        }
        if (mode === 'inc') AB = frN(0);
        let given, steps;
        if (mode === 'int' || mode === 'inc') {
          given = 'P(A)=' + ftex(A) + ',\\ P(B)=' + ftex(B) + ',\\ ' + (mode === 'inc' ? 'A\\cap B=\\varnothing' : 'P(A\\cap B)=' + ftex(AB));
          steps = ['Producto: ' + i$('P(A)P(B)=' + ftex(A) + '\\cdot' + ftex(B) + '=' + ftex(prod)), 'Intersección: ' + i$('P(A\\cap B)=' + ftex(AB)) + (indep ? ' (coincide).' : ' (no coincide).')];
        } else if (mode === 'cond') {
          const cond = G.fdiv(AB, B);
          given = 'P(A)=' + ftex(A) + ',\\ P(B)=' + ftex(B) + ',\\ P(A|B)=' + ftex(cond);
          steps = ['Independientes si ' + i$('P(A|B)=P(A)') + '.', i$('P(A|B)=' + ftex(cond)) + ' y ' + i$('P(A)=' + ftex(A)) + (indep ? ': coinciden.' : ': no coinciden.')];
        } else {
          const un = G.fsub(G.fadd(A, B), AB);
          given = 'P(A)=' + ftex(A) + ',\\ P(B)=' + ftex(B) + ',\\ P(A\\cup B)=' + ftex(un);
          steps = ['Intersección: ' + i$('P(A\\cap B)=P(A)+P(B)-P(A\\cup B)=' + ftex(AB)), 'Producto: ' + i$('P(A)P(B)=' + ftex(prod)) + (indep ? ': coinciden.' : ': no coinciden.')];
        }
        const val = indep ? 0 : 1;
        return {
          prompt: 'Sean $A$ y $B$ sucesos con ' + i$(given) + '. ¿Son independientes?',
          answer: { kind: 'choice', options: OPT_IND, value: val },
          steps: steps.concat([indep ? 'Se cumple ' + i$('P(A\\cap B)=P(A)P(B)') + ': son independientes.' : 'No se cumple ' + i$('P(A\\cap B)=P(A)P(B)') + ': son dependientes.']),
          mistakes: [{ value: 1 - val, msg: mode === 'inc' ? 'ser incompatibles <b>no</b> equivale a ser independientes: si $A\\cap B=\\varnothing$ y ambos tienen probabilidad no nula, $P(A\\cap B)=0\\ne P(A)P(B)$ (son dependientes).' : (indep ? 'comprueba el producto: $P(A)P(B)$ sí coincide con $P(A\\cap B)$.' : 'comprueba el producto: $P(A)P(B)$ no coincide con $P(A\\cap B)$.') }],
          data: { caso: 'test', mode, pa: num(A), pb: num(B), pab: num(AB), indep },
        };
      }
      if (p.caso === 'inter') {
        return {
          prompt: 'Los sucesos $A$ y $B$ son independientes, con ' + i$('P(A)=' + ftex(A) + ',\\ P(B)=' + ftex(B)) + '. Calcula ' + i$('P(A\\cap B)') + '.',
          answer: { kind: 'number', label: 'P(A\\cap B)=', value: prod },
          steps: ['Independientes: ' + d$('P(A\\cap B)=P(A)\\,P(B)'), d$('P(A\\cap B)=' + ftex(A) + '\\cdot' + ftex(B) + '=' + ftex(prod))],
          mistakes: mist(prod, [{ value: G.fadd(A, B), msg: 'para la intersección de independientes se <b>multiplica</b>; sumar es para la unión de incompatibles.' }, { value: uni, msg: 'eso es $P(A\\cup B)$; la intersección es el producto.' }]),
          data: { caso: 'inter', pa: num(A), pb: num(B) },
        };
      }
      if (p.caso === 'union') {
        return {
          prompt: 'Los sucesos $A$ y $B$ son independientes, con ' + i$('P(A)=' + ftex(A) + ',\\ P(B)=' + ftex(B)) + '. Calcula ' + i$('P(A\\cup B)') + '.',
          answer: { kind: 'number', label: 'P(A\\cup B)=', value: uni },
          steps: ['Intersección (independientes): ' + i$('P(A\\cap B)=' + ftex(A) + '\\cdot' + ftex(B) + '=' + ftex(prod)), d$('P(A\\cup B)=' + ftex(A) + '+' + ftex(B) + '-' + ftex(prod) + '=' + ftex(uni))],
          mistakes: mist(uni, [{ value: G.fadd(A, B), msg: 'falta restar $P(A\\cap B)=P(A)P(B)$.' }, { value: prod, msg: 'eso es $P(A\\cap B)$; la unión es $P(A)+P(B)-P(A)P(B)$.' }]),
          data: { caso: 'union', pa: num(A), pb: num(B) },
        };
      }
      // x: P(B) desconocida
      return {
        prompt: 'Los sucesos $A$ y $B$ son independientes, con ' + i$('P(A)=' + ftex(A) + '\\ \\text{y}\\ P(A\\cup B)=' + ftex(uni)) + '. Calcula ' + i$('P(B)') + '.',
        answer: { kind: 'number', label: 'P(B)=', value: B },
        steps: ['Sea ' + i$('x=P(B)') + '. Independientes: ' + d$('P(A\\cup B)=P(A)+x-P(A)\\,x=P(A)+x\\,(1-P(A))'),
          d$(ftex(uni) + '=' + ftex(A) + '+x\\left(1-' + ftex(A) + '\\right)\\ \\Rightarrow\\ x=\\frac{' + ftex(uni) + '-' + ftex(A) + '}{' + ftex(G.fsub(F(1), A)) + '}=' + ftex(B))],
        mistakes: mist(B, [{ value: G.fsub(uni, A), msg: 'al ser independientes $P(A\\cap B)\\neq0$: $P(A\\cup B)=P(A)+P(B)-P(A)P(B)$, no $P(A)+P(B)$.' }]),
        data: { caso: 'x', pa: num(A), pu: num(uni), pb: num(B) },
      };
    },
  });

  /* ===================== 5. Tablas de contingencia ===================== */
  const TCTX = [
    { n: 'alumnos de una clase', A: 'es chico', B: 'estudia inglés como 2.ª lengua' },
    { n: 'personas encuestadas', A: 'es mujer', B: 'va al trabajo en transporte público' },
    { n: 'socios de un club', A: 'es adulto', B: 'practica natación' },
    { n: 'estudiantes de Bachillerato', A: 'cursa Ciencias', B: 'tiene beca' },
    { n: 'clientes de una tienda', A: 'compra por internet', B: 'es menor de 30 años' },
  ];
  G.define({
    id: 'pro-tabla',
    title: 'Tablas de contingencia',
    help: [
      'En una tabla de contingencia, $P(\\text{suceso})=\\dfrac{\\text{casilla o total}}{\\text{total general}}$. Para $P(A|B)$ te restringes a la <b>columna (o fila) de $B$</b>: casos de $A\\cap B$ entre total de $B$. Para la unión: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.',
      'Ejemplo: de 50 personas, 20 son $A$ y 30 son $B$, y 10 son $A$ y $B$. Entonces $P(A\\cap B)=\\frac{10}{50}$, $P(A|B)=\\frac{10}{30}=\\frac13$, $P(B|A)=\\frac{10}{20}=\\frac12$, $P(A\\cup B)=\\frac{20+30-10}{50}=\\frac45$.',
    ],
    params: [{ key: 'preg', label: 'Pregunta', options: [['inter', 'Intersección'], ['union', 'Unión'], ['cond1', 'P(A|B)'], ['cond2', 'P(B|A)'], ['compl', 'P(Ā|B̄)']] }],
    generate(p) {
      const w = rnd.int(4, 30), x = rnd.int(4, 30), y = rnd.int(4, 30), z = rnd.int(4, 30);
      const ctx = rnd.pick(TCTX);
      const N = w + x + y + z;
      const a = w + x, b = w + y, na = y + z, nb = x + z;
      const tab = '\\begin{array}{c|cc|c} & B & \\overline{B} & \\text{Total}\\\\ \\hline A & ' + w + ' & ' + x + ' & ' + a + '\\\\ \\overline{A} & ' + y + ' & ' + z + ' & ' + na + '\\\\ \\hline \\text{Total} & ' + b + ' & ' + nb + ' & ' + N + '\\end{array}';
      const fr = (n, d) => frN(n, d);
      let ask, ans, steps, extra;
      if (p.preg === 'inter') {
        ask = 'P(A\\cap B)'; ans = fr(w, N);
        steps = [i$('A\\cap B') + ' es la casilla de la fila ' + i$('A') + ' y la columna ' + i$('B') + ': ' + w + ' casos.', d$(ask + '=\\frac{' + w + '}{' + N + '}=' + ftex(ans))];
        extra = [{ value: fr(w, b), msg: 'has dividido entre el total de $B$ (eso es $P(A|B)$); la intersección se divide entre el total general ' + N + '.' }];
      } else if (p.preg === 'union') {
        ask = 'P(A\\cup B)'; ans = fr(a + b - w, N);
        steps = [d$('P(A)=\\frac{' + a + '}{' + N + '},\\quad P(B)=\\frac{' + b + '}{' + N + '},\\quad P(A\\cap B)=\\frac{' + w + '}{' + N + '}'), d$(ask + '=\\frac{' + a + '+' + b + '-' + w + '}{' + N + '}=' + ftex(ans))];
        extra = [{ value: fr(a + b, N), msg: 'falta restar la intersección (' + w + ' casos contados dos veces).' }];
      } else if (p.preg === 'cond1') {
        ask = 'P(A|B)'; ans = fr(w, b);
        steps = ['Sabiendo que ocurre ' + i$('B') + ', sólo cuenta la columna ' + i$('B') + ' (total ' + b + ').', d$(ask + '=\\frac{' + w + '}{' + b + '}=' + ftex(ans))];
        extra = [{ value: fr(w, a), msg: 'has dividido entre el total de $A$ (eso es $P(B|A)$).' }, { value: fr(w, N), msg: 'has dividido entre el total general: con condición se divide entre el total de $B$.' }];
      } else if (p.preg === 'cond2') {
        ask = 'P(B|A)'; ans = fr(w, a);
        steps = ['Sabiendo que ocurre ' + i$('A') + ', sólo cuenta la fila ' + i$('A') + ' (total ' + a + ').', d$(ask + '=\\frac{' + w + '}{' + a + '}=' + ftex(ans))];
        extra = [{ value: fr(w, b), msg: 'has dividido entre el total de $B$ (eso es $P(A|B)$).' }, { value: fr(w, N), msg: 'has dividido entre el total general: con condición se divide entre el total de $A$.' }];
      } else {
        ask = 'P(\\overline{A}|\\overline{B})'; ans = fr(z, nb);
        steps = ['Sabiendo que ocurre ' + i$('\\overline{B}') + ', sólo cuenta la columna ' + i$('\\overline{B}') + ' (total ' + nb + '); dentro de ella, la casilla de ' + i$('\\overline{A}') + ' tiene ' + z + '.', d$(ask + '=\\frac{' + z + '}{' + nb + '}=' + ftex(ans))];
        extra = [{ value: fr(z, na), msg: 'has dividido entre el total de $\\overline{A}$ (eso es $P(\\overline{B}|\\overline{A})$).' }, { value: fr(x, nb), msg: 'esa casilla es $A\\cap\\overline{B}$; necesitas $\\overline{A}\\cap\\overline{B}$.' }];
      }
      return {
        prompt: 'En un grupo de ' + N + ' ' + ctx.n + ' se anota si cada uno cumple ' + i$('A') + ' («' + ctx.A + '») y ' + i$('B') + ' («' + ctx.B + '»):' + d$(tab) + 'Se elige uno al azar. Calcula ' + i$(ask) + '.',
        answer: { kind: 'number', label: ask + '=', value: ans },
        steps, mistakes: mist(ans, extra), data: { preg: p.preg, w, x, y, z },
      };
    },
  });

  /* ===================== 6 y 7. Probabilidad total y Bayes ===================== */
  const NAMES = ['A_1', 'A_2', 'A_3'];
  const CONTEXTS = [
    { k: [2, 3], f(k, pr, cd) { return 'Una fábrica tiene ' + k + ' máquinas, ' + NAMES.slice(0, k).map((n) => '$' + n + '$').join(', ') + '. Producen respectivamente el ' + pr.map((x) => x + ' %').join(', ') + ' de las piezas, y son defectuosas el ' + cd.map((x) => x + ' %').join(', ') + ' de las piezas de cada máquina (en ese orden).'; }, cause: (i) => 'proceda de la máquina $' + NAMES[i] + '$', ev: 'defectuosa', q: 'Se elige una pieza al azar', evq: 'sea defectuosa' },
    { k: [2, 3], f(k, pr, cd) { return 'En un instituto, los alumnos de ' + k + ' grupos ' + NAMES.slice(0, k).map((n) => '$' + n + '$').join(', ') + ' son el ' + pr.map((x) => x + ' %').join(', ') + ' del total, y han aprobado el examen el ' + cd.map((x) => x + ' %').join(', ') + ' de los alumnos de cada grupo (en ese orden).'; }, cause: (i) => 'pertenezca al grupo $' + NAMES[i] + '$', ev: 'aprobado', q: 'Se elige un alumno al azar', evq: 'haya aprobado' },
    { k: [2], f(k, pr, cd) { return 'Una enfermedad afecta al ' + pr[0] + ' % de la población. Un test da positivo en el ' + cd[0] + ' % de los enfermos y en el ' + cd[1] + ' % de los sanos.'; }, cause: (i) => (i === 0 ? 'esté enferma' : 'esté sana'), ev: 'positivo', q: 'Se elige una persona al azar', evq: 'dé positivo en el test', med: true },
  ];
  function treeData(k) {
    const cands = CONTEXTS.filter((c) => c.k.includes(k));
    const ctx = rnd.pick(cands);
    let pr;
    if (ctx.med) pr = [rnd.pick([2, 5, 10, 20, 30]), 0];
    else if (k === 2) { const a = rnd.pick([10, 20, 30, 40, 60, 70, 80]); pr = [a, 100 - a]; }
    else { for (;;) { const a = rnd.int(1, 6) * 10, b = rnd.int(1, 6) * 10; if (a + b < 100 && a + b >= 40) { pr = [a, b, 100 - a - b]; break; } } }
    if (ctx.med) pr[1] = 100 - pr[0];
    let cd;
    for (;;) {
      cd = ctx.med ? [rnd.pick([80, 85, 90, 95, 98]), rnd.pick([2, 3, 5, 8, 10])] : pr.map(() => rnd.pick([1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20]));
      if (cd.some((x, i) => x !== cd[0])) break;
    }
    return { ctx, pr, cd, k };
  }
  const tex = (n) => String(n / 100).replace('.', '{,}');
  const treeIntro = (t) => t.ctx.f(t.k, t.pr, t.cd);
  const sumTex = (t, dec) => t.pr.map((p, i) => tex(p) + '\\cdot' + tex(t.cd[i])).join('+');
  const totalVal = (t) => frN(t.pr.reduce((s, p, i) => s + p * t.cd[i], 0), 10000);
  const treeLine = (t) => 'Árbol: ' + t.pr.map((p, i) => i$('P(' + (t.ctx.med ? (i ? 'S' : 'E') : NAMES[i]) + ')=' + tex(p) + ',\\ P(B|' + (t.ctx.med ? (i ? 'S' : 'E') : NAMES[i]) + ')=' + tex(t.cd[i]))).join('; ') + '.';

  G.define({
    id: 'pro-total',
    title: 'Probabilidad total',
    help: [
      'Si $A_1,A_2,\\dots$ forman un sistema completo de sucesos (incompatibles y su unión es todo), $P(B)=\\sum_i P(A_i)\\,P(B|A_i)$: se multiplican las probabilidades a lo largo de cada rama del árbol que acaba en $B$ y se suman.',
      'Ejemplo: dos urnas elegidas con probabilidad $\\frac12$ cada una; $P(\\text{roja}|U_1)=0{,}2$ y $P(\\text{roja}|U_2)=0{,}6$. Entonces $P(\\text{roja})=0{,}5\\cdot0{,}2+0{,}5\\cdot0{,}6=0{,}4$.',
    ],
    params: [{ key: 'k', label: 'Número de causas', options: [[2, '2 ramas'], [3, '3 ramas']] }],
    generate(p) {
      const k = Number(p.k);
      const t = treeData(k);
      const ans = totalVal(t);
      const c = t.ctx;
      const lab = (i) => (c.med ? (i ? 'S' : 'E') : NAMES[i]);
      return {
        prompt: treeIntro(t) + ' ' + c.q + '. Halla la probabilidad de que ' + c.evq + ' <small>(en tanto por uno)</small>.',
        answer: { kind: 'number', label: 'P(B)=', value: ans },
        steps: [treeLine(t) + ' Aquí ' + i$('B') + ' es «' + c.ev + '».',
          'Probabilidad total: ' + d$('P(B)=\\sum_i P(A_i)\\,P(B|A_i)'),
          d$('P(B)=' + sumTex(t) + '=' + pf(ans, true))],
        mistakes: mist(ans, [{ value: frN(t.cd.reduce((s, x) => s + x, 0), 100 * k), msg: 'no basta con promediar los porcentajes: cada rama pesa según su probabilidad $P(A_i)$.' },
          { value: frN(t.cd.reduce((s, x) => s + x, 0), 100), msg: 'no se suman las probabilidades condicionadas directamente: hay que multiplicar cada una por $P(A_i)$.' }]),
        data: { pr: t.pr, cd: t.cd },
      };
    },
  });

  G.define({
    id: 'pro-bayes',
    title: 'Teorema de Bayes',
    help: [
      'Teorema de Bayes: $P(A_i|B)=\\dfrac{P(A_i)\\,P(B|A_i)}{P(B)}=\\dfrac{P(A_i)\\,P(B|A_i)}{\\sum_j P(A_j)\\,P(B|A_j)}$. El numerador es la rama del árbol que pasa por $A_i$ y acaba en $B$; el denominador es la probabilidad total de $B$.',
      'Ejemplo: con $P(A_1)=P(A_2)=0{,}5$, $P(B|A_1)=0{,}2$, $P(B|A_2)=0{,}6$: $P(B)=0{,}4$ y $P(A_2|B)=\\frac{0{,}5\\cdot0{,}6}{0{,}4}=0{,}75$. Puedes escribir la respuesta como fracción o decimal.',
    ],
    params: [{ key: 'k', label: 'Número de causas', options: [[2, '2 ramas'], [3, '3 ramas']] }],
    generate(p) {
      const k = Number(p.k);
      const t = treeData(k);
      const c = t.ctx;
      const tot = t.pr.reduce((s, x, i) => s + x * t.cd[i], 0);
      const idx = rnd.int(0, k - 1);
      const num_ = t.pr[idx] * t.cd[idx];
      const ans = num_ / tot;
      const lab = (i) => (c.med ? (i ? 'S' : 'E') : NAMES[i]);
      const frac = frN(num_, tot);
      const pv = totalVal(t);
      return {
        prompt: treeIntro(t) + ' ' + c.q + ' y resulta ser «' + c.ev + '». Calcula ' + i$('P(' + lab(idx) + '|B)') + ', es decir, la probabilidad de que ' + c.cause(idx) + '.',
        answer: { kind: 'expr', label: 'P(' + lab(idx) + '|B)=', value: ans },
        steps: [treeLine(t) + ' Aquí ' + i$('B') + ' es «' + c.ev + '».',
          'Probabilidad total: ' + d$('P(B)=' + sumTex(t) + '=' + pf(pv, true)),
          'Bayes: ' + d$('P(' + lab(idx) + '|B)=\\frac{P(' + lab(idx) + ')\\,P(B|' + lab(idx) + ')}{P(B)}=\\frac{' + tex(t.pr[idx]) + '\\cdot' + tex(t.cd[idx]) + '}{' + pf(pv, true) + '}=' + ftex(frac) + '\\approx' + String(Math.round(ans * 1e4) / 1e4).replace('.', '{,}'))],
        mistakes: emist(ans, [{ value: t.cd[idx] / 100, msg: 'eso es $P(B|' + lab(idx) + ')$ (dato del enunciado), no $P(' + lab(idx) + '|B)$: hay que invertir la condición con Bayes.' },
          { value: t.pr[idx] / 100, msg: 'eso es la probabilidad a priori $P(' + lab(idx) + ')$; al saber que ha ocurrido $B$ cambia.' },
          { value: num_ / 10000, msg: 'falta dividir entre $P(B)$ (probabilidad total).' },
          { value: 1 - ans, msg: 'eso es la probabilidad del suceso contrario.' }]),
        data: { pr: t.pr, cd: t.cd, idx },
      };
    },
  });

  /* ===================== 8. Extracciones con y sin reemplazamiento ===================== */
  G.define({
    id: 'pro-extrac',
    title: 'Extracciones con y sin reemplazamiento',
    help: [
      '<b>Con reemplazamiento</b> las extracciones son independientes y la composición de la urna no cambia: se multiplican las mismas fracciones. <b>Sin reemplazamiento</b> la urna cambia (una bola menos) en cada extracción: se multiplican probabilidades condicionadas $P(A_1)\\,P(A_2|A_1)\\cdots$ Para «al menos una» usa el contrario: $1-P(\\text{ninguna})$.',
      'Ejemplo: urna con 3 rojas y 2 blancas, dos extracciones. Con reemplazamiento: $P(RR)=\\frac35\\cdot\\frac35=\\frac9{25}$. Sin reemplazamiento: $P(RR)=\\frac35\\cdot\\frac24=\\frac3{10}$.',
    ],
    params: [
      { key: 'reem', label: 'Reemplazamiento', options: [['con', 'Con reemplazamiento'], ['sin', 'Sin reemplazamiento']] },
      { key: 'suc', label: 'Suceso', options: [['todas', 'Todas rojas'], ['ninguna', 'Ninguna roja'], ['alguna', 'Al menos una roja'], ['una', 'Exactamente una roja']] },
    ],
    generate(p) {
      const n = rnd.pick([2, 3]);
      const r = rnd.int(3, 6), b = rnd.int(3, 6), T = r + b;
      const seqP = (pat, repl) => {   // probabilidad de una secuencia concreta de colores (1 = roja, 0 = blanca)
        let pr = F(1), R = r, Bc = b, Tt = T;
        pat.forEach((x) => { pr = G.fmul(pr, x ? F(R, Tt) : F(Bc, Tt)); if (!repl) { if (x) R--; else Bc--; Tt--; } });
        return pr;
      };
      const pats = []; for (let m = 0; m < (1 << n); m++) pats.push(Array.from({ length: n }, (_, i) => (m >> i) & 1));
      const prob = (suc, repl) => pats.filter((q) => { const s = q.reduce((a, x) => a + x, 0); return suc === 'todas' ? s === n : suc === 'ninguna' ? s === 0 : suc === 'alguna' ? s >= 1 : s === 1; })
        .reduce((a, q) => G.fadd(a, seqP(q, repl)), F(0));
      const repl = p.reem === 'con';
      const ans = prob(p.suc, repl), other = prob(p.suc, !repl);
      const txt = { todas: 'las ' + n + ' bolas sean rojas', ninguna: 'ninguna de las ' + n + ' bolas sea roja', alguna: 'al menos una de las ' + n + ' bolas sea roja', una: 'exactamente una de las ' + n + ' bolas sea roja' }[p.suc];
      const f = (R, Tt) => '\\frac{' + R + '}{' + Tt + '}';
      const chain = (colorR, repl2) => { let R = r, Bc = b, Tt = T; const out = []; colorR.forEach((x) => { out.push(f(x ? R : Bc, Tt)); if (!repl2) { if (x) R--; else Bc--; Tt--; } }); return out.join('\\cdot'); };
      let steps;
      const rr = Array(n).fill(1), ww = Array(n).fill(0), one = [1].concat(Array(n - 1).fill(0));
      if (p.suc === 'todas') steps = [d$('P=' + chain(rr, repl) + '=' + ftex(ans))];
      else if (p.suc === 'ninguna') steps = [d$('P=' + chain(ww, repl) + '=' + ftex(ans))];
      else if (p.suc === 'alguna') { const none = prob('ninguna', repl); steps = ['Contrario: ninguna roja. ' + d$('P(\\text{ninguna})=' + chain(ww, repl) + '=' + ftex(none)), d$('P=1-' + ftex(none) + '=' + ftex(ans))]; }
      else { const one1 = seqP(one, repl); steps = ['Hay ' + n + ' posiciones posibles para la roja y todas tienen la misma probabilidad: ' + d$('P(R\\overline{R}\\cdots)=' + chain(one, repl) + '=' + ftex(one1)), d$('P=' + n + '\\cdot' + ftex(one1) + '=' + ftex(ans))]; }
      steps.unshift(repl ? 'Con reemplazamiento la urna no cambia: ' + i$('P(R)=' + f(r, T)) + ' y ' + i$('P(\\overline{R})=' + f(b, T)) + ' en cada extracción.' : 'Sin reemplazamiento, tras cada extracción queda una bola menos (inicial: ' + r + ' rojas y ' + b + ' blancas).');
      const oneSeq = seqP(one, repl);
      const extra = [{ value: other, msg: repl ? 'la urna <b>no cambia</b> (hay reemplazamiento): en cada extracción las probabilidades son las mismas.' : 'al no haber reemplazamiento la composición de la urna cambia: ' + (p.suc === 'ninguna' || p.suc === 'todas' ? 'el numerador y el denominador bajan en cada extracción.' : 'actualiza las bolas que quedan en cada extracción.') }];
      if (p.suc === 'una') extra.push({ value: oneSeq, msg: 'esa es la probabilidad de <b>un orden concreto</b> (roja primero); hay ' + n + ' órdenes posibles y se suman.' });
      if (p.suc === 'alguna') extra.push({ value: prob('ninguna', repl), msg: 'eso es «ninguna roja»; «al menos una» es su contrario ($1-P(\\text{ninguna})$).' });
      return {
        prompt: 'Una urna contiene ' + r + ' bolas rojas y ' + b + ' blancas. Se extraen ' + n + ' bolas ' + (repl ? 'con' : 'sin') + ' reemplazamiento. Halla la probabilidad de que ' + txt + '.',
        answer: { kind: 'number', label: 'P=', value: ans },
        steps, mistakes: mist(ans, extra), data: { n, r, b, repl, suc: p.suc },
      };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
