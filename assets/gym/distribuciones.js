/* Ejercicios interactivos — 2º Bachillerato, tema 11: Distribuciones binomial y normal.
 * Módulos: dis-binom, dis-binompar, dis-tipif, dis-tabla, dis-normal, dis-inversa, dis-aprox.
 * Exporta G.normal = { Phi, T, r4, zr } y G.normalTable(el) (tabla N(0,1) en HTML).
 * La normal imita la tabla del libro: z redondeado a centésimas y Φ(z) con 4 decimales.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, ftex, d$, i$ } = G;

  /* ---------- Φ(z): serie  Φ(z) = 1/2 + φ(z)·Σ z^(2n+1)/(2n+1)!!  (error < 1e-12 para |z| ≤ 6) ---------- */
  function Phi(z) {
    if (z < 0) return 1 - Phi(-z);
    if (z > 8) return 1;
    let term = z, sum = z;
    for (let n = 1; n < 400 && Math.abs(term) > 1e-18 * Math.abs(sum); n++) { term *= z * z / (2 * n + 1); sum += term; }
    return 0.5 + Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI) * sum;
  }
  const r4 = (x) => Math.round(x * 1e4) / 1e4;
  const zr = (z) => Math.round(z * 100) / 100;
  /** Valor de la tabla: Φ(z) a 4 decimales (z<0 por simetría: 1-Φ(-z) con la tabla). */
  const T = (z) => (z >= 0 ? r4(Phi(z)) : r4(1 - r4(Phi(-z))));
  G.normal = { Phi, T, r4, zr };

  /** Rellena un elemento con la tabla N(0,1): Φ(z) para z = 0,00 … 3,09. */
  G.normalTable = function (el) {
    let h = '<table class="gym-ntab"><thead><tr><th>z</th>';
    for (let j = 0; j < 10; j++) h += '<th>0,0' + j + '</th>';
    h += '</tr></thead><tbody>';
    for (let i = 0; i <= 30; i++) {
      h += '<tr><th>' + (i / 10).toFixed(1).replace('.', ',') + '</th>';
      for (let j = 0; j < 10; j++) h += '<td>' + T(i / 10 + j / 100).toFixed(4).replace('.', ',') + '</td>';
      h += '</tr>';
    }
    el.innerHTML = h + '</tbody></table>';
  };

  /* ---------- utilidades ---------- */
  const c2 = (x) => x.toFixed(2).replace('.', '{,}');                 // z con 2 decimales
  const c4 = (x) => x.toFixed(4).replace('.', '{,}');                 // Φ con 4 decimales
  const dn = (x) => String(Math.round(x * 1e6) / 1e6).replace('.', '{,}');   // decimal sin ceros sobrantes
  const dF = (x) => F(Math.round(x * 100), 100);                      // decimal con ≤ 2 cifras -> fracción exacta
  const emist = (ans, list) => list.filter((m) => Number.isFinite(m.value) && Math.abs(m.value - ans) > 2e-3);
  const fmist = (ans, list) => list.filter((m, i) => m.value && !(m.value.n === ans.n && m.value.d === ans.d) && list.findIndex((q) => q.value.n === m.value.n && q.value.d === m.value.d) === i);
  const SIGMAS = [2, 4, 5, 10, 20, 25, 50];   // z = m/σ tiene a lo sumo 2 decimales
  const norm = (mu, sg) => '\\mathrm{N}(' + mu + ',' + sg + ')';
  const PHI = (z) => '\\Phi(' + c2(z) + ')';

  /* ===================== 1. Binomial ===================== */
  const PS = [[1, 10], [1, 5], [1, 4], [3, 10], [2, 5], [1, 2], [3, 5], [7, 10], [3, 4], [4, 5]];
  const SITS = [
    (n, p) => 'Un jugador encesta un tiro libre con probabilidad ' + p + '. Realiza ' + n + ' tiros independientes y $X$ es el número de aciertos.',
    (n, p) => 'Cada semilla germina con probabilidad ' + p + ', de forma independiente. Se siembran ' + n + ' semillas y $X$ es el número de las que germinan.',
    (n, p) => 'La probabilidad de que una pieza sea defectuosa es ' + p + '. Se revisan ' + n + ' piezas y $X$ es el número de piezas defectuosas.',
    (n, p) => 'Un test tiene ' + n + ' preguntas y cada una se acierta (al azar) con probabilidad ' + p + '. $X$ es el número de aciertos.',
  ];
  const choose = (n, k) => { let c = 1; for (let i = 1; i <= k; i++) c = c * (n - k + i) / i; return Math.round(c); };
  const pmf = (n, p, k) => choose(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);

  G.define({
    id: 'dis-binom',
    title: 'Distribución binomial',
    help: [
      'Si $X\\sim B(n,p)$ cuenta los éxitos en $n$ pruebas independientes, cada una con probabilidad de éxito $p$ (y $q=1-p$): $P(X=k)=\\binom nk p^k q^{n-k}$ con $\\binom nk=\\frac{n!}{k!\\,(n-k)!}$. Para $P(X\\le k)$ se suman las probabilidades de $0,1,\\dots,k$; «al menos» se calcula con el suceso contrario.',
      'Ejemplo: $X\\sim B(4,0{,}5)$. $P(X=1)=\\binom41\\,0{,}5^1\\,0{,}5^3=4\\cdot0{,}0625=0{,}25$. $P(X\\ge1)=1-P(X=0)=1-0{,}5^4=0{,}9375$. Da el resultado con 4 decimales.',
    ],
    params: [{ key: 'tipo', label: 'Calcular', options: [['eq', 'P(X=k)'], ['le', 'P(X≤k)'], ['ge', 'P(X≥k)'], ['rango', 'P(a≤X≤b)']] }],
    generate(p) {
      const n = rnd.int(5, 12);
      const [pn, pd] = rnd.pick(PS), pp = pn / pd, qq = 1 - pp;
      const ptx = dn(pp);
      let S, ask, mist = [];
      let k = 0, a = 0, b = 0;
      if (p.tipo === 'eq') { k = rnd.int(1, n - 1); S = [k]; ask = 'P(X=' + k + ')'; }
      else if (p.tipo === 'le') { k = rnd.int(1, n - 2); S = Array.from({ length: k + 1 }, (_, i) => i); ask = 'P(X\\le' + k + ')'; }
      else if (p.tipo === 'ge') { k = rnd.int(2, n - 1); S = Array.from({ length: n - k + 1 }, (_, i) => k + i); ask = 'P(X\\ge' + k + ')'; }
      else { a = rnd.int(1, n - 3); b = a + rnd.int(1, 3); S = Array.from({ length: b - a + 1 }, (_, i) => a + i); ask = 'P(' + a + '\\le X\\le' + b + ')'; }
      const ans = S.reduce((s, i) => s + pmf(n, pp, i), 0);
      const term = (i) => '\\binom{' + n + '}{' + i + '}\\,' + ptx + '^{' + i + '}\\,' + dn(qq) + '^{' + (n - i) + '}';
      const steps = ['$X\\sim B(' + n + ',' + ptx + ')$ y $P(X=k)=\\binom{' + n + '}{k}\\,' + ptx + '^k\\,' + dn(qq) + '^{' + n + '-k}$.'];
      if (p.tipo === 'eq') {
        steps.push(d$(ask + '=' + term(k) + '=' + c4(ans)));
        mist = [{ value: Math.pow(pp, k) * Math.pow(qq, n - k), msg: 'falta el número combinatorio $\\binom{' + n + '}{' + k + '}$: hay varias formas de colocar los éxitos.' }];
      } else if (S.length <= (n + 1) / 2 + 1 || p.tipo === 'rango') {
        steps.push(d$(ask + '=' + S.map((i) => 'P(X=' + i + ')').join('+')));
        steps.push(d$('=' + S.map((i) => c4(pmf(n, pp, i))).join('+') + '=' + c4(ans)));
      } else {
        const rest = Array.from({ length: n + 1 }, (_, i) => i).filter((i) => !S.includes(i));
        steps.push('Es más corto usar el contrario: ' + d$(ask + '=1-P(X\\le' + (S[0] - 1) + ')=1-(' + rest.map((i) => c4(pmf(n, pp, i))).join('+') + ')=' + c4(ans)));
      }
      if (p.tipo === 'le') mist = [{ value: S.slice(0, -1).reduce((s, i) => s + pmf(n, pp, i), 0), msg: '$P(X\\le k)$ incluye el término $k$: suma desde $0$ hasta $' + k + '$ ambos incluidos.' }];
      if (p.tipo === 'ge') mist = [{ value: S.slice(1).reduce((s, i) => s + pmf(n, pp, i), 0), msg: '«al menos ' + k + '» incluye el ' + k + ': eso es $P(X>' + k + ')$.' }];
      if (p.tipo === 'rango') mist = [{ value: S.slice(1, -1).reduce((s, i) => s + pmf(n, pp, i), 0), msg: 'los extremos ' + a + ' y ' + b + ' están incluidos ($\\le$): suma también $P(X=' + a + ')$ y $P(X=' + b + ')$.' }];
      return {
        prompt: rnd.pick(SITS)(n, '$' + ptx + '$') + ' Entonces $X\\sim B(' + n + ',' + ptx + ')$. Calcula ' + i$(ask) + ' <small>(4 decimales)</small>.',
        answer: { kind: 'expr', label: ask + '=', value: ans },
        steps, mistakes: emist(ans, mist), data: { tipo: p.tipo, n, pn, pd, S },
      };
    },
  });

  /* ===================== 2. Media y desviación de la binomial ===================== */
  const PQ = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [4, 5], [1, 10], [9, 10], [3, 10], [7, 10], [2, 5], [3, 5]];
  const CLEAN = [];   // (n,p) con media entera y desviación entera
  PQ.forEach(([pn, pd]) => { for (let n = 4; n <= 100; n++) { const v = n * pn * (pd - pn) / (pd * pd), mu = n * pn / pd, s = Math.round(Math.sqrt(v)); if (Number.isInteger(mu) && Number.isInteger(v) && s * s === v && s >= 1) CLEAN.push([n, pn, pd, mu, s]); } });
  G.define({
    id: 'dis-binompar',
    title: 'Media y desviación de una binomial',
    help: [
      'Para $X\\sim B(n,p)$: media $\\mu=np$, varianza $\\sigma^2=npq$ y desviación típica $\\sigma=\\sqrt{npq}$, con $q=1-p$. Si te dan $\\mu$ y $\\sigma$, despeja: $q=\\dfrac{\\sigma^2}{\\mu}$, $p=1-q$ y $n=\\dfrac{\\mu}{p}$.',
      'Ejemplo: $X\\sim B(20,0{,}3)$: $\\mu=20\\cdot0{,}3=6$, $\\sigma=\\sqrt{20\\cdot0{,}3\\cdot0{,}7}=\\sqrt{4{,}2}\\approx2{,}05$. Si $\\mu=8$ y $\\sigma=2$: $q=\\frac48=0{,}5$, $p=0{,}5$ y $n=\\frac{8}{0{,}5}=16$.',
    ],
    params: [{ key: 'caso', label: 'Caso', options: [['dir', 'Hallar media y desviación'], ['inv', 'Hallar n y p']] }],
    generate(p) {
      if (p.caso === 'inv') {
        const [n, pn, pd, mu, s] = rnd.pick(CLEAN);
        const pF = F(pn, pd), qF = F(pd - pn, pd);
        return {
          prompt: 'Una variable binomial $X\\sim B(n,p)$ tiene media $\\mu=' + mu + '$ y desviación típica $\\sigma=' + s + '$. Halla $n$ y $p$.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'n=', value: F(n) }, { kind: 'number', label: 'p=', value: pF }] },
          steps: ['Datos: ' + i$('np=' + mu) + ' y ' + i$('npq=\\sigma^2=' + s * s) + '.', 'Dividiendo: ' + d$('q=\\frac{npq}{np}=\\frac{' + s * s + '}{' + mu + '}=' + ftex(qF) + '\\ \\Rightarrow\\ p=1-q=' + ftex(pF)), d$('n=\\frac{\\mu}{p}=\\frac{' + mu + '}{' + ftex(pF) + '}=' + n)],
          mistakes: [],
          data: { caso: 'inv', n, pn, pd, mu, s },
        };
      }
      const n = rnd.int(10, 60), [pn, pd] = rnd.pick(PQ);
      const useClean = rnd.pick([true, false]);
      let nn = n, pnn = pn, pdd = pd;
      if (useClean) { const c = rnd.pick(CLEAN); nn = c[0]; pnn = c[1]; pdd = c[2]; }
      const pF = F(pnn, pdd), qF = F(pdd - pnn, pdd);
      const mu = F(nn * pnn, pdd), v = F(nn * pnn * (pdd - pnn), pdd * pdd);
      const sig = Math.sqrt(v.n / v.d);
      const vtx = ftex(v), ptx = pdd % 10 === 0 || pdd === 5 || pdd === 2 || pdd === 4 ? dn(pnn / pdd) : ftex(pF), qtx = pdd % 10 === 0 || pdd === 5 || pdd === 2 || pdd === 4 ? dn(1 - pnn / pdd) : ftex(qF);
      return {
        prompt: 'Sea $X\\sim B(' + nn + ',' + ptx + ')$. Calcula su media y su desviación típica <small>(la desviación como raíz, p. ej. <code>sqrt(2.4)</code>, o con 3 decimales o más)</small>.',
        answer: { kind: 'multi', parts: [{ kind: 'number', label: '\\mu=', value: mu }, { kind: 'expr', label: '\\sigma=', value: sig }] },
        steps: ['Media: ' + i$('\\mu=np=' + nn + '\\cdot' + ptx + '=' + ftex(mu)), 'Varianza: ' + i$('\\sigma^2=npq=' + nn + '\\cdot' + ptx + '\\cdot' + qtx + '=' + vtx), d$('\\sigma=\\sqrt{' + vtx + '}\\approx' + dn(Math.round(sig * 1e4) / 1e4))],
        mistakes: [],
        data: { caso: 'dir', n: nn, pn: pnn, pd: pdd },
      };
    },
  });

  /* ===================== 3. Tipificación ===================== */
  G.define({
    id: 'dis-tipif',
    title: 'Tipificación',
    help: [
      'Si $X\\sim N(\\mu,\\sigma)$, la variable tipificada $Z=\\dfrac{X-\\mu}{\\sigma}$ sigue una $N(0,1)$. Así $P(X<a)=P\\left(Z<\\dfrac{a-\\mu}{\\sigma}\\right)$. Para recuperar el valor de $X$: $x=\\mu+z\\,\\sigma$. En la tabla se usa $z$ redondeado a centésimas.',
      'Ejemplo: $X\\sim N(50,8)$. Para $x=62$: $z=\\frac{62-50}{8}=1{,}5$. Y el valor que corresponde a $z=-0{,}25$ es $x=50+(-0{,}25)\\cdot8=48$.',
    ],
    params: [{ key: 'dir', label: 'Calcular', options: [['z', 'z a partir de x'], ['x', 'x a partir de z']] }],
    generate(p) {
      const mu = rnd.int(10, 180), sg = rnd.pick(SIGMAS);
      const lim = Math.round(2.9 * sg);
      let m = 0; while (m === 0) m = rnd.int(-lim, lim);
      const x = mu + m, z = m / sg;
      const zc = dF(z);
      if (p.dir === 'z') {
        return {
          prompt: 'Sea $X\\sim' + norm(mu, sg) + '$. Tipifica el valor $x=' + x + '$, es decir, calcula $z=\\dfrac{x-\\mu}{\\sigma}$.',
          answer: { kind: 'number', label: 'z=', value: zc },
          steps: ['Resta la media y divide entre la desviación típica: ' + d$('z=\\frac{x-\\mu}{\\sigma}=\\frac{' + x + '-' + mu + '}{' + sg + '}=\\frac{' + m + '}{' + sg + '}=' + c2(z))],
          mistakes: fmist(zc, [{ value: dF(-z), msg: 'cuidado con el signo: es $x-\\mu$ (no $\\mu-x$).' }, { value: F(m, sg * sg), msg: 'se divide entre $\\sigma$, no entre $\\sigma^2$.' }, { value: F(m), msg: 'falta dividir entre $\\sigma=' + sg + '$.' }]),
          data: { dir: 'z', mu, sg, x },
        };
      }
      return {
        prompt: 'Sea $X\\sim' + norm(mu, sg) + '$. ¿Qué valor $x$ de $X$ corresponde a $z=' + c2(z) + '$?',
        answer: { kind: 'number', label: 'x=', value: F(x) },
        steps: ['Despeja de $z=\\frac{x-\\mu}{\\sigma}$: ' + d$('x=\\mu+z\\,\\sigma=' + mu + '+(' + c2(z) + ')\\cdot' + sg + '=' + x)],
        mistakes: fmist(F(x), [{ value: F(mu - m), msg: 'el signo de $z\\sigma$ se suma a la media: $x=\\mu+z\\sigma$.' }, { value: dF(mu + z), msg: 'falta multiplicar $z$ por $\\sigma=' + sg + '$.' }]),
        data: { dir: 'x', mu, sg, z },
      };
    },
  });

  /* ===================== 4. Tabla N(0,1) ===================== */
  G.define({
    id: 'dis-tabla',
    title: 'Uso de la tabla N(0,1)',
    help: [
      'La tabla da $\\Phi(z)=P(Z<z)$ para $z\\ge0$. Para $z<0$: $\\Phi(-z)=1-\\Phi(z)$. Además $P(Z>z)=1-\\Phi(z)$ y $P(a<Z<b)=\\Phi(b)-\\Phi(a)$. Redondea siempre $z$ a centésimas y trabaja con 4 decimales. Tienes la tabla desplegable más abajo.',
      'Ejemplo: $P(Z<-1{,}20)=1-\\Phi(1{,}20)=1-0{,}8849=0{,}1151$. $P(-1<Z<2)=\\Phi(2)-\\Phi(-1)=0{,}9772-(1-0{,}8413)=0{,}8185$.',
    ],
    params: [{ key: 'tipo', label: 'Calcular', options: [['lt', 'P(Z<z)'], ['gt', 'P(Z>z)'], ['entre', 'P(a<Z<b)']] }],
    generate(p) {
      const rz = () => { let z = 0; while (Math.abs(z) < 0.05) z = rnd.int(-290, 290) / 100; return z; };
      if (p.tipo === 'entre') {
        let a = rz(), b = rz(); while (Math.abs(a - b) < 0.1) b = rz();
        if (a > b) [a, b] = [b, a];
        const ans = r4(T(b) - T(a));
        return {
          prompt: 'Sea $Z\\sim\\mathrm{N}(0,1)$. Calcula $P(' + c2(a) + '<Z<' + c2(b) + ')$ con la tabla <small>(4 decimales)</small>.',
          answer: { kind: 'expr', label: 'P=', value: ans },
          steps: ['Diferencia de acumuladas: ' + d$('P(a<Z<b)=\\Phi(b)-\\Phi(a)'), 'De la tabla (con la simetría para $z<0$): ' + i$(PHI(b) + '=' + c4(T(b)) + ',\\ ' + PHI(a) + '=' + c4(T(a))), d$('P=' + c4(T(b)) + '-' + c4(T(a)) + '=' + c4(ans))],
          mistakes: emist(ans, [{ value: r4(T(a) + T(b)), msg: 'se <b>resta</b>: $\\Phi(b)-\\Phi(a)$.' }, { value: r4(1 - ans), msg: 'eso es la probabilidad de estar <b>fuera</b> del intervalo.' }]),
          data: { tipo: 'entre', a, b },
        };
      }
      const z = rz();
      const ans = p.tipo === 'lt' ? T(z) : T(-z);
      const sg = p.tipo === 'lt' ? '<' : '>';
      const steps = p.tipo === 'lt'
        ? [z >= 0 ? 'Directamente de la tabla: ' + d$('P(Z<' + c2(z) + ')=' + PHI(z) + '=' + c4(ans)) : 'Para $z<0$: ' + d$('P(Z<' + c2(z) + ')=1-\\Phi(' + c2(-z) + ')=1-' + c4(T(-z)) + '=' + c4(ans))]
        : ['«Mayor que» es el contrario: ' + d$('P(Z>' + c2(z) + ')=1-\\Phi(' + c2(z) + ')=1-' + c4(T(z)) + '=' + c4(ans))];
      const mist = p.tipo === 'lt' ? [{ value: T(Math.abs(z)), msg: 'con $z<0$ hay que usar la simetría: $\\Phi(-z)=1-\\Phi(z)$.' }] : [{ value: T(z), msg: 'eso es $P(Z<z)$; «mayor que» es $1-\\Phi(z)$.' }];
      return {
        prompt: 'Sea $Z\\sim\\mathrm{N}(0,1)$. Calcula $P(Z' + sg + c2(z) + ')$ con la tabla <small>(4 decimales)</small>.',
        answer: { kind: 'expr', label: 'P=', value: ans },
        steps, mistakes: emist(ans, mist), data: { tipo: p.tipo, z },
      };
    },
  });

  /* ===================== 5. Normal N(μ,σ) ===================== */
  const NCTX = [
    (mu, sg) => 'La altura (en cm) de los alumnos de un instituto sigue una distribución $X\\sim' + norm(mu, sg) + '$.',
    (mu, sg) => 'El tiempo (en minutos) que tarda un autobús en completar su ruta es $X\\sim' + norm(mu, sg) + '$.',
    (mu, sg) => 'La puntuación de un test de aptitud sigue una distribución $X\\sim' + norm(mu, sg) + '$.',
    (mu, sg) => 'El peso (en gramos) de las piezas de una fábrica es una variable $X\\sim' + norm(mu, sg) + '$.',
  ];
  G.define({
    id: 'dis-normal',
    title: 'Probabilidades en una normal',
    help: [
      'Para $X\\sim N(\\mu,\\sigma)$: tipifica con $z=\\frac{a-\\mu}{\\sigma}$ (a centésimas) y usa la tabla: $P(X<a)=\\Phi(z)$, $P(X>a)=1-\\Phi(z)$, $P(a<X<b)=\\Phi(z_b)-\\Phi(z_a)$. Con $z<0$: $\\Phi(-z)=1-\\Phi(z)$.',
      'Ejemplo: $X\\sim N(100,15)$. $P(X<115)=P(Z<1)=0{,}8413$. $P(X>85)=P(Z>-1)=\\Phi(1)=0{,}8413$. $P(85<X<130)=\\Phi(2)-\\Phi(-1)=0{,}9772-0{,}1587=0{,}8185$. Da 4 decimales.',
    ],
    params: [{ key: 'tipo', label: 'Calcular', options: [['lt', 'P(X<a)'], ['gt', 'P(X>a)'], ['entre', 'P(a<X<b)']] }],
    generate(p) {
      const mu = rnd.int(20, 180), sg = rnd.pick(SIGMAS);
      const lim = Math.round(2.8 * sg);
      const rm = () => { let m = 0; while (m === 0) m = rnd.int(-lim, lim); return m; };
      const ctx = rnd.pick(NCTX)(mu, sg);
      const ztx = (a) => '\\frac{' + a + '-' + mu + '}{' + sg + '}=' + c2((a - mu) / sg);
      if (p.tipo === 'entre') {
        let m1 = rm(), m2 = rm(); while (m1 === m2) m2 = rm();
        if (m1 > m2) [m1, m2] = [m2, m1];
        const a = mu + m1, b = mu + m2, za = zr(m1 / sg), zb = zr(m2 / sg);
        const ans = r4(T(zb) - T(za));
        return {
          prompt: ctx + ' Calcula $P(' + a + '<X<' + b + ')$ <small>(4 decimales)</small>.',
          answer: { kind: 'expr', label: 'P=', value: ans },
          steps: ['Tipifica los dos extremos: ' + d$('z_a=' + ztx(a) + ',\\qquad z_b=' + ztx(b)), d$('P(' + a + '<X<' + b + ')=P(' + c2(za) + '<Z<' + c2(zb) + ')=\\Phi(' + c2(zb) + ')-\\Phi(' + c2(za) + ')=' + c4(T(zb)) + '-' + c4(T(za)) + '=' + c4(ans))],
          mistakes: emist(ans, [{ value: r4(T(za) + T(zb)), msg: 'se <b>resta</b>: $\\Phi(z_b)-\\Phi(z_a)$.' }, { value: r4(1 - ans), msg: 'eso es la probabilidad de estar <b>fuera</b> del intervalo.' }]),
          data: { tipo: 'entre', mu, sg, a, b },
        };
      }
      const m = rm(), a = mu + m, z = zr(m / sg);
      const ans = p.tipo === 'lt' ? T(z) : T(-z);
      const steps = ['Tipifica: ' + d$('z=' + ztx(a)),
        p.tipo === 'lt' ? d$('P(X<' + a + ')=P(Z<' + c2(z) + ')=' + (z >= 0 ? PHI(z) + '=' + c4(ans) : '1-\\Phi(' + c2(-z) + ')=1-' + c4(T(-z)) + '=' + c4(ans)))
          : d$('P(X>' + a + ')=P(Z>' + c2(z) + ')=1-\\Phi(' + c2(z) + ')=1-' + c4(T(z)) + '=' + c4(ans))];
      const mist = p.tipo === 'lt'
        ? [{ value: T(Math.abs(z)), msg: 'con $z<0$ usa la simetría $\\Phi(-z)=1-\\Phi(z)$.' }, { value: T(m / (sg * sg)), msg: 'se divide entre $\\sigma=' + sg + '$, no entre $\\sigma^2$.' }]
        : [{ value: T(z), msg: 'eso es $P(X<a)$; «mayor que» es $1-\\Phi(z)$.' }, { value: T(m / (sg * sg)), msg: 'se divide entre $\\sigma=' + sg + '$, no entre $\\sigma^2$.' }];
      return {
        prompt: ctx + ' Calcula $P(X' + (p.tipo === 'lt' ? '<' : '>') + a + ')$ <small>(4 decimales)</small>.',
        answer: { kind: 'expr', label: 'P=', value: ans },
        steps, mistakes: emist(ans, mist), data: { tipo: p.tipo, mu, sg, a },
      };
    },
  });

  /* ===================== 6. Valor desconocido (tabla inversa) ===================== */
  G.define({
    id: 'dis-inversa',
    title: 'Valor desconocido (tabla inversa)',
    help: [
      'Si te dan la probabilidad y falta un valor: 1) pasa a $P(Z<z)$ (si piden «mayor que», usa $P(Z<z)=1-p$); 2) busca <b>dentro</b> de la tabla la probabilidad y lee el $z$ (tabla inversa); 3) deshaz la tipificación $z=\\frac{a-\\mu}{\\sigma}$ y despeja la incógnita ($a$, $\\mu$ o $\\sigma$).',
      'Ejemplo: $X\\sim N(40,5)$ y $P(X<a)=0{,}9332$. En la tabla, $\\Phi(1{,}50)=0{,}9332$, luego $z=1{,}5$ y $a=40+1{,}5\\cdot5=47{,}5$. Si en cambio $\\mu$ fuese la incógnita con $a=47{,}5$: $\\mu=a-z\\sigma=47{,}5-7{,}5=40$.',
    ],
    params: [{ key: 'inc', label: 'Incógnita', options: [['x', 'Valor a (percentil)'], ['mu', 'Media μ'], ['sg', 'Desviación σ']] }],
    generate(p) {
      const lado = rnd.pick(['lt', 'gt']);
      const zk = rnd.int(20, 260), z = zk / 100;
      const prob = lado === 'lt' ? T(z) : T(-z);
      let mu = rnd.int(20, 150), sg = rnd.pick(SIGMAS), a;
      if (p.inc === 'sg') sg = rnd.int(2, 30);
      a = Math.round((mu + z * sg) * 100) / 100;
      const cond = lado === 'lt' ? 'P(X<' + dn(a) + ')' : 'P(X>' + dn(a) + ')';
      const condA = lado === 'lt' ? 'P(X<a)' : 'P(X>a)';
      let prompt, ans, label, last, mist;
      if (p.inc === 'x') {
        prompt = 'Sea $X\\sim' + norm(mu, sg) + '$. Halla el valor $a$ tal que $' + condA + '=' + c4(prob) + '$.';
        ans = dF(a); label = 'a=';
        last = d$('a=\\mu+z\\,\\sigma=' + mu + '+' + c2(z) + '\\cdot' + sg + '=' + dn(a));
        mist = [{ value: dF(z), msg: 'ese es el valor de $z$; hay que deshacer la tipificación: $a=\\mu+z\\sigma$.' }, { value: dF(mu - z * sg), msg: 'revisa el signo: $a=\\mu+z\\sigma$.' }];
      } else if (p.inc === 'mu') {
        prompt = 'Sea $X\\sim N(\\mu,' + sg + ')$ y se sabe que $' + cond + '=' + c4(prob) + '$. Halla $\\mu$.';
        ans = F(mu); label = '\\mu=';
        last = d$('z=\\frac{' + dn(a) + '-\\mu}{' + sg + '}=' + c2(z) + '\\ \\Rightarrow\\ \\mu=' + dn(a) + '-' + c2(z) + '\\cdot' + sg + '=' + mu);
        mist = [{ value: dF(a + z * sg), msg: 'despeja bien: $\\mu=a-z\\sigma$ (no $a+z\\sigma$).' }];
      } else {
        prompt = 'Sea $X\\sim N(' + mu + ',\\sigma)$ y se sabe que $' + cond + '=' + c4(prob) + '$. Halla $\\sigma$.';
        ans = F(sg); label = '\\sigma=';
        last = d$('z=\\frac{' + dn(a) + '-' + mu + '}{\\sigma}=' + c2(z) + '\\ \\Rightarrow\\ \\sigma=\\frac{' + dn(a) + '-' + mu + '}{' + c2(z) + '}=' + sg);
        mist = [{ value: dF((a - mu) * z), msg: '$\\sigma$ está en el denominador: $\\sigma=\\frac{a-\\mu}{z}$.' }];
      }
      const steps = [lado === 'lt' ? 'Ya es de la forma $P(Z<z)=' + c4(prob) + '$.' : '«Mayor que»: ' + i$('P(X>a)=' + c4(prob) + '\\Rightarrow P(X<a)=1-' + c4(prob) + '=' + c4(1 - prob)) + '.',
        'Tabla inversa: ' + i$('\\Phi(' + c2(z) + ')=' + c4(T(z))) + ', luego ' + i$('z=' + c2(z)) + '.', last];
      return {
        prompt: prompt + ' <small>(usa la tabla al revés)</small>',
        answer: { kind: 'number', label, value: ans },
        steps, mistakes: fmist(ans, mist), data: { inc: p.inc, lado, mu, sg, a, prob, z },
      };
    },
  });

  /* ===================== 7. Aproximación de la binomial por la normal ===================== */
  const BN = [[100, 1, 2, 50, 5], [400, 1, 2, 200, 10], [625, 1, 5, 125, 10], [625, 4, 5, 500, 10]];   // n, pn, pd, np, sqrt(npq)
  G.define({
    id: 'dis-aprox',
    title: 'Aproximación de la binomial por la normal',
    help: [
      'Si $X\\sim B(n,p)$ con $np\\ge5$ y $nq\\ge5$, se aproxima por $X\'\\sim N(np,\\sqrt{npq})$ con <b>corrección de continuidad</b> (se ensancha $\\pm0{,}5$): $P(X\\le k)\\approx P(X\'<k+0{,}5)$, $P(X\\ge k)\\approx P(X\'>k-0{,}5)$, $P(X=k)\\approx P(k-0{,}5<X\'<k+0{,}5)$, $P(a\\le X\\le b)\\approx P(a-0{,}5<X\'<b+0{,}5)$.',
      'Ejemplo: $X\\sim B(100,0{,}4)$: $\\mu=40$, $\\sigma=\\sqrt{24}\\approx4{,}90$. $P(X\\ge45)\\approx P(X\'>44{,}5)=P\\left(Z>\\frac{44{,}5-40}{4{,}90}\\right)=P(Z>0{,}92)=1-0{,}8212=0{,}1788$.',
    ],
    params: [{ key: 'tipo', label: 'Calcular', options: [['le', 'P(X≤k)'], ['ge', 'P(X≥k)'], ['eq', 'P(X=k)'], ['entre', 'P(a≤X≤b)']] }],
    generate(p) {
      const [n, pn, pd, mu, sg] = rnd.pick(BN);
      const ptx = dn(pn / pd);
      const lim = Math.round(1.8 * sg);
      const km = () => mu + rnd.int(-lim, lim);
      let ask, lo = null, hi = null, ineq, k = 0, a = 0, b = 0;
      if (p.tipo === 'le') { k = km(); ask = 'P(X\\le' + k + ')'; hi = k + 0.5; ineq = 'P(X\'<' + dn(hi) + ')'; }
      else if (p.tipo === 'ge') { k = km(); ask = 'P(X\\ge' + k + ')'; lo = k - 0.5; ineq = 'P(X\'>' + dn(lo) + ')'; }
      else if (p.tipo === 'eq') { k = km(); ask = 'P(X=' + k + ')'; lo = k - 0.5; hi = k + 0.5; ineq = 'P(' + dn(lo) + '<X\'<' + dn(hi) + ')'; }
      else { a = km(); b = a + rnd.int(1, Math.round(sg)); ask = 'P(' + a + '\\le X\\le' + b + ')'; lo = a - 0.5; hi = b + 0.5; ineq = 'P(' + dn(lo) + '<X\'<' + dn(hi) + ')'; }
      const z = (x) => zr((x - mu) / sg);
      let ans, zt;
      if (lo === null) { ans = T(z(hi)); zt = 'P(Z<' + c2(z(hi)) + ')=' + (z(hi) >= 0 ? PHI(z(hi)) : '1-\\Phi(' + c2(-z(hi)) + ')') + '=' + c4(ans); }
      else if (hi === null) { ans = T(-z(lo)); zt = 'P(Z>' + c2(z(lo)) + ')=1-\\Phi(' + c2(z(lo)) + ')=1-' + c4(T(z(lo))) + '=' + c4(ans); }
      else { ans = r4(T(z(hi)) - T(z(lo))); zt = 'P(' + c2(z(lo)) + '<Z<' + c2(z(hi)) + ')=\\Phi(' + c2(z(hi)) + ')-\\Phi(' + c2(z(lo)) + ')=' + c4(T(z(hi))) + '-' + c4(T(z(lo))) + '=' + c4(ans); }
      let mist = [];
      if (p.tipo === 'le') mist = [{ value: T(z(k)), msg: 'falta la corrección de continuidad: $P(X\\le k)\\approx P(X\'<k+0{,}5)$.' }, { value: T(z(k - 0.5)), msg: 'la corrección es $+0{,}5$ en «$\\le$»: $P(X\'<k+0{,}5)$.' }];
      if (p.tipo === 'ge') mist = [{ value: T(-z(k)), msg: 'falta la corrección de continuidad: $P(X\\ge k)\\approx P(X\'>k-0{,}5)$.' }, { value: T(-z(k + 0.5)), msg: 'la corrección es $-0{,}5$ en «$\\ge$»: $P(X\'>k-0{,}5)$.' }];
      if (p.tipo === 'entre') mist = [{ value: r4(T(z(b)) - T(z(a))), msg: 'falta la corrección de continuidad en ambos extremos: de $a-0{,}5$ a $b+0{,}5$.' }];
      return {
        prompt: 'Sea $X\\sim B(' + n + ',' + ptx + ')$. Usando la aproximación por la normal con corrección de continuidad, calcula $' + ask + '$ <small>(4 decimales; z a centésimas)</small>.',
        answer: { kind: 'expr', label: ask + '\\approx', value: ans },
        steps: ['Condiciones: ' + i$('np=' + mu + '\\ge5') + ' y ' + i$('nq=' + (n - mu) + '\\ge5') + '. Aproximamos por ' + i$('X\'\\sim N(np,\\sqrt{npq})=' + norm(mu, sg)) + '.',
          'Corrección de continuidad: ' + d$(ask + '\\approx ' + ineq),
          'Tipifica con ' + i$('\\mu=' + mu + ',\\ \\sigma=' + sg) + ': ' + d$(zt)],
        mistakes: emist(ans, mist), data: { tipo: p.tipo, n, pn, pd, mu, sg, k, a, b, lo, hi },
      };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
