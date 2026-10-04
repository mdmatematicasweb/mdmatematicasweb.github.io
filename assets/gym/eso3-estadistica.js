/* Ejercicios interactivos — 3º ESO, estadística y probabilidad (temas 13 y 14).
 * Tema 13: eso3-est-central, eso3-est-tabla, eso3-est-dispersion, eso3-est-frecuencias.
 * Tema 14: eso3-prob-laplace, eso3-prob-union, eso3-prob-compuesta, eso3-prob-recuento.
 * Verificadores independientes: tests/verify-gym-eso3.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, ftex, d$, i$, gcd, fadd, fsub, fmul, fdiv } = G;
  const { dc, define, sg, again } = G.eso3;
  const nz = (lo, hi) => { let v; do { v = rnd.int(lo, hi); } while (v === 0); return v; };
  const lst = (a) => a.join(',\\ ');
  const sum = (a) => a.reduce((s, x) => s + x, 0);
  const median = (a) => { const s = a.slice().sort((x, y) => x - y), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
  const modes = (a) => { const c = {}; a.forEach((x) => { c[x] = (c[x] || 0) + 1; }); const m = Math.max(...Object.values(c)); return Object.keys(c).filter((k) => c[k] === m).map(Number); };

  /* ===================== Tema 13 ===================== */
  define({
    id: 'eso3-est-central',
    title: 'Media, mediana y moda',
    help: [
      '**Media**: suma de los datos entre el número de datos. **Mediana**: valor central de los datos ordenados (si hay un número par, la media de los dos centrales). **Moda**: el valor que más se repite.',
      'Ejemplo: $3,\\ 5,\\ 5,\\ 8,\\ 9$: media $=\\frac{30}{5}=6$; mediana $=5$; moda $=5$. La mediana no se ve afectada por valores extremos; la media sí.',
    ],
    params: [{ key: 'n', label: 'Número de datos', options: [['5', '5 datos'], ['8', '8 datos'], ['10', '10 datos']] }],
    generate(p) {
      const n = Number(p.n);
      for (;;) {
        const d = Array.from({ length: n }, () => rnd.int(1, 12));
        const mo = modes(d);
        if (mo.length !== 1 || d.filter((x) => x === mo[0]).length < 2) continue;
        const mean = sum(d) / n;
        if (Math.abs(mean * 100 - Math.round(mean * 100)) > 1e-9) continue;
        const s = d.slice().sort((a, b) => a - b), md = median(d);
        return { prompt: 'Calcula la media, la mediana y la moda de ' + i$(lst(d)) + '.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: '\\bar{x}=', value: G.parseFrac(String(mean)) }, { kind: 'number', label: 'Me=', value: G.parseFrac(String(md)) }, { kind: 'number', label: 'Mo=', value: F(mo[0]) }] },
          steps: ['Media: ' + d$('\\bar{x}=\\frac{' + d.join('+') + '}{' + n + '}=\\frac{' + sum(d) + '}{' + n + '}=' + dc(mean)),
            'Ordenados: ' + i$(lst(s)) + '. ' + (n % 2 ? 'La mediana es el dato central: ' : 'La mediana es la media de los dos centrales: ') + i$('Me=' + dc(md)) + '.',
            'El valor que más se repite es ' + i$(mo[0]) + ': ' + i$('Mo=' + mo[0]) + '.'], mistakes: [], data: { d, mean, md, mo: mo[0] } };
      }
    },
  });

  define({
    id: 'eso3-est-tabla',
    title: 'Media y tabla de frecuencias',
    help: [
      'Con una tabla de frecuencias, la media es $\\bar{x}=\\frac{\\sum x_i f_i}{N}$, donde $N=\\sum f_i$. La frecuencia relativa es $h_i=\\frac{f_i}{N}$ y el porcentaje, $100\\,h_i$.',
      'Ejemplo: $x_i=1,2,3$ con $f_i=2,5,3$: $N=10$ y $\\bar{x}=\\frac{1\\cdot2+2\\cdot5+3\\cdot3}{10}=\\frac{21}{10}=2{,}1$.',
    ],
    params: [{ key: 'tipo', label: 'Qué calcular', options: [['media', 'La media'], ['moda', 'La moda y la mediana']] }],
    generate(p) {
      for (;;) {
        const xs = [1, 2, 3, 4, 5].slice(0, rnd.pick([4, 5]));
        const fs = xs.map(() => rnd.int(1, 9));
        const N = sum(fs), sx = xs.reduce((s, x, i) => s + x * fs[i], 0);
        const tbl = '\\begin{array}{c|' + 'c'.repeat(xs.length) + '}x_i&' + xs.join('&') + '\\\\\\hline f_i&' + fs.join('&') + '\\end{array}';
        if (p.tipo === 'media') {
          if (Math.abs(sx / N * 1000 - Math.round(sx / N * 1000)) > 1e-9) continue;
          return { prompt: 'Calcula la media de esta distribución: ' + d$(tbl), answer: { kind: 'number', label: '\\bar{x}=', value: G.parseFrac(String(sx / N)) },
            steps: ['Total de datos: ' + i$('N=' + fs.join('+') + '=' + N) + '.', 'Suma de ' + i$('x_if_i') + ': ' + i$(xs.map((x, i) => x + '\\cdot' + fs[i]).join('+') + '=' + sx) + '.', d$('\\bar{x}=\\frac{' + sx + '}{' + N + '}=' + dc(sx / N))], mistakes: [{ value: G.parseFrac(String(xs.reduce((s, x) => s + x, 0) / xs.length)), msg: 'no basta promediar los valores $x_i$: hay que ponderar con las frecuencias.' }], data: { xs, fs, tipo: 'media' } };
        }
        const mo = xs.filter((x, i) => fs[i] === Math.max(...fs));
        if (mo.length !== 1) continue;
        const flat = []; xs.forEach((x, i) => { for (let k = 0; k < fs[i]; k++) flat.push(x); });
        const md = median(flat);
        return { prompt: 'Halla la moda y la mediana de esta distribución: ' + d$(tbl), answer: { kind: 'multi', parts: [{ kind: 'number', label: 'Mo=', value: F(mo[0]) }, { kind: 'number', label: 'Me=', value: G.parseFrac(String(md)) }] },
          steps: ['La moda es el valor con mayor frecuencia: ' + i$('Mo=' + mo[0]) + ' (' + i$(Math.max(...fs)) + ' veces).', 'Hay ' + i$(N) + ' datos; ' + (N % 2 ? 'la mediana es el dato nº ' + (N + 1) / 2 : 'la mediana es la media de los datos nº ' + N / 2 + ' y ' + (N / 2 + 1)) + ', y al acumular frecuencias ese dato vale ' + i$(dc(md)) + '.'], mistakes: [], data: { xs, fs, tipo: 'moda' } };
      }
    },
  });

  define({
    id: 'eso3-est-dispersion',
    title: 'Medidas de dispersión',
    help: [
      '**Rango** $=$ máximo $-$ mínimo. **Cuartiles**: $Q_2$ es la mediana; $Q_1$ y $Q_3$ son las medianas de la mitad inferior y de la superior. **Varianza**: $\\sigma^2=\\frac{\\sum(x_i-\\bar{x})^2}{N}$; **desviación típica** $\\sigma=\\sqrt{\\sigma^2}$.',
      'Ejemplo: $2,4,4,6$: $\\bar{x}=4$; desviaciones $-2,0,0,2$; $\\sigma^2=\\frac{4+0+0+4}{4}=2$. A menor $\\sigma$, más agrupados están los datos alrededor de la media.',
    ],
    params: [{ key: 'tipo', label: 'Qué calcular', options: [['rango', 'Rango y recorrido intercuartílico'], ['var', 'Varianza']] }],
    generate(p) {
      if (p.tipo === 'rango') {
        const n = rnd.pick([8, 10, 12]);
        const d = Array.from({ length: n }, () => rnd.int(2, 40)), s = d.slice().sort((a, b) => a - b);
        const h = n / 2, q1 = median(s.slice(0, h)), q3 = median(s.slice(h));
        return { prompt: 'Para los datos ' + i$(lst(d)) + ' calcula el rango y el recorrido intercuartílico ' + i$('Q_3-Q_1') + '.', answer: { kind: 'multi', parts: [{ kind: 'number', label: '\\text{rango}=', value: F(s[n - 1] - s[0]) }, { kind: 'number', label: 'Q_3-Q_1=', value: G.parseFrac(String(q3 - q1)) }] },
          steps: ['Ordenamos: ' + i$(lst(s)) + '.', 'Rango: ' + i$(s[n - 1] + '-' + s[0] + '=' + (s[n - 1] - s[0])) + '.', i$('Q_1') + ' es la mediana de la mitad inferior: ' + i$(dc(q1)) + '; ' + i$('Q_3') + ' la de la superior: ' + i$(dc(q3)) + '.', 'Recorrido intercuartílico: ' + i$(dc(q3) + '-' + dc(q1) + '=' + dc(q3 - q1)) + '.'], mistakes: [], data: { d, tipo: 'rango' } };
      }
      for (;;) {
        const n = rnd.pick([4, 5, 6, 8]), d = Array.from({ length: n }, () => rnd.int(1, 12));
        const m = sum(d) / n;
        if (!Number.isInteger(m)) continue;
        const v = d.reduce((s, x) => s + (x - m) * (x - m), 0) / n;
        if (!Number.isInteger(v) || v === 0) continue;
        return { prompt: 'Calcula la varianza de los datos ' + i$(lst(d)) + '.', answer: { kind: 'number', label: '\\sigma^2=', value: F(v) },
          steps: ['Media: ' + i$('\\bar{x}=\\frac{' + sum(d) + '}{' + n + '}=' + m) + '.', 'Cuadrados de las desviaciones: ' + i$(d.map((x) => '(' + x + '-' + m + ')^2=' + (x - m) * (x - m)).join(',\\ ')) + '.', d$('\\sigma^2=\\frac{' + d.map((x) => (x - m) * (x - m)).join('+') + '}{' + n + '}=' + v)], mistakes: [], data: { d, m, v, tipo: 'var' } };
      }
    },
  });

  define({
    id: 'eso3-est-frecuencias',
    title: 'Frecuencias, porcentajes y diagrama de sectores',
    help: [
      'La **frecuencia relativa** es $h=\\frac{f}{N}$. El **porcentaje** es $100\\,h$ y el **ángulo** en un diagrama de sectores es $360^\\circ\\cdot h$. Las frecuencias relativas suman $1$; los porcentajes, $100$; los ángulos, $360^\\circ$.',
      'Ejemplo: $12$ de $48$ alumnos van en bici: $h=\\frac{12}{48}=0{,}25$; es el $25\\,\\%$ y su sector mide $90^\\circ$.',
    ],
    params: [{ key: 'tipo', label: 'Qué calcular', options: [['rel', 'Frecuencia relativa'], ['pct', 'Porcentaje'], ['ang', 'Ángulo del sector']] }],
    generate(p) {
      const N = rnd.pick([20, 40, 50, 60, 80, 120, 200]), f = rnd.int(1, N / 2);
      const ctx = rnd.pick(['alumnos que prefieren el fútbol', 'personas que van al trabajo en bici', 'votos a una opción', 'familias con mascota']);
      if (p.tipo === 'rel') { if (Math.abs(f / N * 1000 - Math.round(f / N * 1000)) > 1e-9) return again('eso3-est-frecuencias', p); return { prompt: 'En una muestra de ' + i$(N) + ' personas hay ' + i$(f) + ' ' + ctx + '. ¿Cuál es la frecuencia relativa (como decimal)?', answer: { kind: 'number', label: 'h=', value: F(f, N) }, steps: [d$('h=\\frac{f}{N}=\\frac{' + f + '}{' + N + '}=' + dc(f / N))], mistakes: [], data: { tipo: 'rel', N, f } }; }
      if (p.tipo === 'pct') { if (Math.abs(f / N * 1000 - Math.round(f / N * 1000)) > 1e-9) return again('eso3-est-frecuencias', p); return { prompt: 'En una muestra de ' + i$(N) + ' personas hay ' + i$(f) + ' ' + ctx + '. ¿Qué porcentaje representan?', answer: { kind: 'number', label: '\\%=', value: G.parseFrac(String(f / N * 100)) }, steps: [d$('\\frac{' + f + '}{' + N + '}\\cdot100=' + dc(f / N * 100) + '\\,\\%')], mistakes: [], data: { tipo: 'pct', N, f } }; }
      const ang = 360 * f / N;
      if (Math.abs(ang - Math.round(ang * 10) / 10) > 1e-9) return again('eso3-est-frecuencias', p);
      return { prompt: 'En una muestra de ' + i$(N) + ' personas hay ' + i$(f) + ' ' + ctx + '. ¿Qué ángulo (en grados) tiene su sector en un diagrama de sectores?', answer: { kind: 'number', label: '\\alpha=', value: G.parseFrac(String(ang)) }, steps: [d$('\\alpha=360^\\circ\\cdot\\frac{' + f + '}{' + N + '}=' + dc(ang) + '^\\circ')], mistakes: [], data: { tipo: 'ang', N, f } };
    },
  });

  /* ===================== Tema 14 ===================== */
  define({
    id: 'eso3-prob-laplace',
    title: 'Regla de Laplace',
    help: [
      'Si todos los resultados son igual de probables: $P(A)=\\frac{\\text{casos favorables}}{\\text{casos posibles}}$. La probabilidad está siempre entre $0$ y $1$.',
      'Ejemplo: en un dado, $P(\\text{múltiplo de }3)=\\frac26=\\frac13$. Con dos dados hay $36$ casos posibles y la suma $7$ aparece en $6$ de ellos: $\\frac6{36}=\\frac16$.',
    ],
    params: [{ key: 'exp', label: 'Experimento', options: [['dado', 'Un dado'], ['dados', 'Dos dados'], ['baraja', 'Baraja española'], ['bolsa', 'Bolsa de bolas']] }],
    generate(p) {
      if (p.exp === 'dado') {
        const sets = [['un número par', [2, 4, 6]], ['un múltiplo de 3', [3, 6]], ['un número mayor que 4', [5, 6]], ['un número primo', [2, 3, 5]], ['un número menor que 3', [1, 2]], ['distinto de 6', [1, 2, 3, 4, 5]]];
        const [t, s] = rnd.pick(sets);
        return { prompt: 'Se lanza un dado de 6 caras. ¿Cuál es la probabilidad de obtener ' + t + '?', answer: { kind: 'number', label: 'P=', value: F(s.length, 6) }, steps: ['Casos posibles: ' + i$('6') + '. Casos favorables: ' + i$('\\{' + s.join(',') + '\\}') + ', es decir, ' + i$(s.length) + '.', d$('P=\\frac{' + s.length + '}{6}=' + ftex(F(s.length, 6)))], mistakes: [], data: { exp: 'dado', fav: s.length, tot: 6 } };
      }
      if (p.exp === 'dados') {
        const S = rnd.int(2, 12); let fav = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === S) fav++;
        return { prompt: 'Se lanzan dos dados. ¿Cuál es la probabilidad de que la suma sea ' + i$(S) + '?', answer: { kind: 'number', label: 'P=', value: F(fav, 36) }, steps: ['Casos posibles: ' + i$('6\\cdot6=36') + '. Parejas que suman ' + i$(S) + ': ' + i$(fav) + '.', d$('P=\\frac{' + fav + '}{36}=' + ftex(F(fav, 36)))], mistakes: [{ value: F(1, 11), msg: 'las 11 sumas posibles no son igual de probables: hay 36 parejas distintas.' }].filter((m) => !(fav * 11 === 36)), data: { exp: 'dados', S, fav } };
      }
      if (p.exp === 'baraja') {
        const sets = [['un as', 4], ['una carta de oros', 10], ['una figura (sota, caballo o rey)', 12], ['un rey o un as', 8], ['una carta que no sea de espadas', 30]];
        const [t, fav] = rnd.pick(sets);
        return { prompt: 'Se extrae una carta de una baraja española de 40 cartas. ¿Cuál es la probabilidad de sacar ' + t + '?', answer: { kind: 'number', label: 'P=', value: F(fav, 40) }, steps: ['Casos posibles: ' + i$('40') + '. Casos favorables: ' + i$(fav) + '.', d$('P=\\frac{' + fav + '}{40}=' + ftex(F(fav, 40)))], mistakes: [], data: { exp: 'baraja', fav, tot: 40 } };
      }
      const r = rnd.int(2, 8), a = rnd.int(2, 8), v = rnd.int(1, 6), tot = r + a + v;
      const col = rnd.pick([['roja', r], ['azul', a], ['verde', v], ['roja o azul', r + a], ['que no sea verde', r + a]]);
      return { prompt: 'Una bolsa tiene ' + i$(r) + ' bolas rojas, ' + i$(a) + ' azules y ' + i$(v) + ' verdes. Se saca una al azar. ¿Cuál es la probabilidad de que sea ' + (col[0].startsWith('que') ? col[0] : col[0]) + '?', answer: { kind: 'number', label: 'P=', value: F(col[1], tot) },
        steps: ['Casos posibles: ' + i$(r + '+' + a + '+' + v + '=' + tot) + '. Casos favorables: ' + i$(col[1]) + '.', d$('P=\\frac{' + col[1] + '}{' + tot + '}=' + ftex(F(col[1], tot)))], mistakes: [], data: { exp: 'bolsa', r, a, v, fav: col[1], tot } };
    },
  });

  define({
    id: 'eso3-prob-union',
    title: 'Unión, intersección y contrario',
    help: [
      '$P(A^C)=1-P(A)$. $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$. Si $A$ y $B$ son incompatibles ($A\\cap B=\\emptyset$): $P(A\\cup B)=P(A)+P(B)$. Y $P(\\text{ni }A\\text{ ni }B)=1-P(A\\cup B)$.',
      'Ejemplo: en una clase, $P(A)=0{,}6$ (usa gafas), $P(B)=0{,}5$ (juega al fútbol), $P(A\\cap B)=0{,}2$. Entonces $P(A\\cup B)=0{,}6+0{,}5-0{,}2=0{,}9$ y la probabilidad de no hacer ninguna cosa es $1-0{,}9=0{,}1$.',
    ],
    params: [{ key: 'tipo', label: 'Qué calcular', options: [['union', 'P(A ∪ B)'], ['ninguno', 'Ni A ni B'], ['inter', 'P(A ∩ B) a partir de la unión']] }],
    generate(p) {
      const pa = rnd.int(3, 8) * 10, pb = rnd.int(3, 8) * 10, pi = rnd.int(1, Math.min(pa, pb) / 10 - 1) * 10 || 10;
      const un = pa + pb - pi;
      if (un > 100) return again('eso3-prob-union', p);
      const pr = (x) => dc(x / 100);
      const base = 'Sean A y B dos sucesos con ' + i$('P(A)=' + pr(pa)) + ' y ' + i$('P(B)=' + pr(pb));
      if (p.tipo === 'union') return { prompt: base + ', y ' + i$('P(A\\cap B)=' + pr(pi)) + '. Calcula ' + i$('P(A\\cup B)') + '.', answer: { kind: 'number', label: 'P(A\\cup B)=', value: G.parseFrac(String(un / 100)) }, steps: [d$('P(A\\cup B)=P(A)+P(B)-P(A\\cap B)=' + pr(pa) + '+' + pr(pb) + '-' + pr(pi) + '=' + pr(un))], mistakes: [{ value: G.parseFrac(String((pa + pb) / 100)), msg: 'hay que restar la intersección, que se ha contado dos veces.' }].filter((m) => (pa + pb) <= 100 && (pa + pb) !== un), data: { tipo: 'union', pa, pb, pi, un } };
      if (p.tipo === 'ninguno') return { prompt: base + ', y ' + i$('P(A\\cap B)=' + pr(pi)) + '. Calcula la probabilidad de que no ocurra ni ' + i$('A') + ' ni ' + i$('B') + '.', answer: { kind: 'number', label: 'P=', value: G.parseFrac(String((100 - un) / 100)) }, steps: [i$('P(A\\cup B)=' + pr(pa) + '+' + pr(pb) + '-' + pr(pi) + '=' + pr(un)) + '.', 'Que no ocurra ninguno es el suceso contrario de la unión: ' + d$('1-' + pr(un) + '=' + pr(100 - un))], mistakes: [], data: { tipo: 'ninguno', pa, pb, pi, un } };
      return { prompt: base + ', y ' + i$('P(A\\cup B)=' + pr(un)) + '. Calcula ' + i$('P(A\\cap B)') + '.', answer: { kind: 'number', label: 'P(A\\cap B)=', value: G.parseFrac(String(pi / 100)) }, steps: ['De ' + i$('P(A\\cup B)=P(A)+P(B)-P(A\\cap B)') + ' despejamos: ' + d$('P(A\\cap B)=' + pr(pa) + '+' + pr(pb) + '-' + pr(un) + '=' + pr(pi))], mistakes: [], data: { tipo: 'inter', pa, pb, pi, un } };
    },
  });

  define({
    id: 'eso3-prob-compuesta',
    title: 'Experimentos compuestos: con y sin reemplazamiento',
    help: [
      'En un diagrama en árbol se **multiplican** las probabilidades a lo largo de cada camino y se **suman** los caminos que dan el suceso pedido. Con **reemplazamiento** la bolsa no cambia entre extracciones; **sin reemplazamiento**, sí (hay una bola menos).',
      'Ejemplo: bolsa con $3$ rojas y $2$ azules, dos extracciones. Con reemplazamiento, $P(RR)=\\frac35\\cdot\\frac35=\\frac9{25}$. Sin reemplazamiento, $P(RR)=\\frac35\\cdot\\frac24=\\frac3{10}$.',
    ],
    params: [{ key: 'rep', label: 'Extracciones', options: [['con', 'Con reemplazamiento'], ['sin', 'Sin reemplazamiento']] }, { key: 'suc', label: 'Suceso', options: [['dos', 'Las dos de un color'], ['dist', 'De distinto color']] }],
    generate(p) {
      const r = rnd.int(2, 7), a = rnd.int(2, 7), t = r + a, con = p.rep === 'con';
      const pRR = con ? fmul(F(r, t), F(r, t)) : fmul(F(r, t), F(r - 1, t - 1));
      const pAA = con ? fmul(F(a, t), F(a, t)) : fmul(F(a, t), F(a - 1, t - 1));
      const pDist = fsub(F(1), fadd(pRR, pAA));
      const dos = p.suc === 'dos';
      const val = dos ? pRR : pDist;
      const den2 = con ? t : t - 1;
      const stp = dos
        ? ['Dos rojas: ' + d$('P(RR)=\\frac{' + r + '}{' + t + '}\\cdot\\frac{' + (con ? r : r - 1) + '}{' + den2 + '}=' + ftex(pRR))]
        : ['Dos rojas: ' + i$('P(RR)=\\frac{' + r + '}{' + t + '}\\cdot\\frac{' + (con ? r : r - 1) + '}{' + den2 + '}=' + ftex(pRR)) + '. Dos azules: ' + i$('P(AA)=\\frac{' + a + '}{' + t + '}\\cdot\\frac{' + (con ? a : a - 1) + '}{' + den2 + '}=' + ftex(pAA)) + '.', 'De distinto color es el contrario de «las dos iguales»: ' + d$('1-\\left(' + ftex(pRR) + '+' + ftex(pAA) + '\\right)=' + ftex(pDist))];
      return { prompt: 'Una bolsa tiene ' + i$(r) + ' bolas rojas y ' + i$(a) + ' azules. Se extraen dos bolas ' + (con ? 'con reemplazamiento (se devuelve la primera antes de sacar la segunda)' : 'sin reemplazamiento') + '. ¿Cuál es la probabilidad de que ' + (dos ? 'las dos sean rojas' : 'sean de distinto color') + '?',
        answer: { kind: 'number', label: 'P=', value: val }, steps: stp, mistakes: [], data: { r, a, con, dos } };
    },
  });

  define({
    id: 'eso3-prob-recuento',
    title: 'Técnicas de recuento',
    help: [
      '**Principio de multiplicación**: si una elección se puede hacer de $m$ formas y otra de $n$, juntas hay $m\\cdot n$. Si se puede repetir, $m^k$; si no se puede repetir, $m\\cdot(m-1)\\cdots$. Un diagrama en árbol ayuda a no olvidar casos.',
      'Ejemplo: con $4$ camisetas y $3$ pantalones hay $4\\cdot3=12$ conjuntos. Números de $3$ cifras con las cifras $1$ a $5$ sin repetir: $5\\cdot4\\cdot3=60$; permitiendo repetir: $5^3=125$.',
    ],
    params: [{ key: 'tipo', label: 'Situación', options: [['mult', 'Combinar prendas o menús'], ['rep', 'Números con cifras repetidas'], ['sinrep', 'Números sin repetir cifras'], ['moneda', 'Lanzamientos de moneda']] }],
    generate(p) {
      if (p.tipo === 'mult') { const a = rnd.int(2, 6), b = rnd.int(2, 6), c = rnd.int(2, 5); return { prompt: 'Un menú se compone de un primero (' + i$(a) + ' opciones), un segundo (' + i$(b) + ' opciones) y un postre (' + i$(c) + ' opciones). ¿Cuántos menús distintos se pueden formar?', answer: { kind: 'number', label: '=', value: F(a * b * c) }, steps: [d$(a + '\\cdot' + b + '\\cdot' + c + '=' + a * b * c)], mistakes: [{ value: F(a + b + c), msg: 'las opciones se multiplican, no se suman.' }], data: { tipo: 'mult', a, b, c } }; }
      if (p.tipo === 'rep') { const n = rnd.int(3, 6), k = rnd.int(2, 4); return { prompt: '¿Cuántos números de ' + i$(k) + ' cifras se pueden formar con las cifras del ' + i$('1') + ' al ' + i$(n) + ', pudiendo repetir cifras?', answer: { kind: 'number', label: '=', value: F(Math.pow(n, k)) }, steps: ['Cada cifra se elige entre ' + i$(n) + ' posibilidades, ' + i$(k) + ' veces: ' + d$(n + '^{' + k + '}=' + Math.pow(n, k))], mistakes: [], data: { tipo: 'rep', n, k } }; }
      if (p.tipo === 'sinrep') { const n = rnd.int(4, 8), k = rnd.int(2, 3); let t = 1; for (let i = 0; i < k; i++) t *= n - i; return { prompt: '¿Cuántos números de ' + i$(k) + ' cifras distintas se pueden formar con las cifras del ' + i$('1') + ' al ' + i$(n) + '?', answer: { kind: 'number', label: '=', value: F(t) }, steps: ['La primera cifra tiene ' + i$(n) + ' opciones y cada una de las siguientes, una menos: ' + d$(Array.from({ length: k }, (_, i) => n - i).join('\\cdot') + '=' + t)], mistakes: [], data: { tipo: 'sinrep', n, k } }; }
      const k = rnd.int(3, 6), j = rnd.pick(['todas caras', 'ninguna cara', 'alguna cruz']);
      const pr = j === 'alguna cruz' ? F(Math.pow(2, k) - 1, Math.pow(2, k)) : F(1, Math.pow(2, k));
      return { prompt: 'Se lanza una moneda ' + i$(k) + ' veces. ¿Cuál es la probabilidad de obtener ' + (j === 'todas caras' ? 'cara en todos los lanzamientos' : j === 'ninguna cara' ? 'cruz en todos los lanzamientos' : 'al menos una cruz') + '?', answer: { kind: 'number', label: 'P=', value: pr },
        steps: ['Hay ' + i$('2^{' + k + '}=' + Math.pow(2, k)) + ' resultados igual de probables.', j === 'alguna cruz' ? 'El contrario de «al menos una cruz» es «ninguna cruz» (todas caras), de probabilidad ' + i$('\\frac1{' + Math.pow(2, k) + '}') + ': ' + d$('1-\\frac{1}{' + Math.pow(2, k) + '}=' + ftex(pr)) : 'Solo un resultado es favorable: ' + d$('P=\\frac1{' + Math.pow(2, k) + '}')], mistakes: [], data: { tipo: 'moneda', k, j } };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
