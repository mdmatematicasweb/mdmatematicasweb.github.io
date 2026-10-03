/* Ejercicios interactivos — 2º Bachillerato Ciencias Sociales, tema 11: Muestreo e inferencia.
 * Módulos propios: ccss-inf-zcritico, ccss-inf-xbar, ccss-inf-ic-media, ccss-inf-ic-prop, ccss-inf-tamano, ccss-inf-relacion.
 * Valores críticos de la Junta: 1,645 (90 %), 1,96 (95 %), 2,575 (99 %); se aceptan también 1,64 / 1,65 y 2,57 / 2,58 (alt).
 * La normal imita la tabla del examen: z a centésimas y Φ(z) con 4 decimales (aquí |z| ≤ 2,6).
 * Verificadores independientes: tests/verify-gym-ccss.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, d$, i$ } = G;

  /* ---------- Φ(z) por serie (igual que en distribuciones.js, para no depender de ese fichero) ---------- */
  function Phi(z) {
    if (z < 0) return 1 - Phi(-z);
    if (z > 8) return 1;
    let term = z, sum = z;
    for (let n = 1; n < 400 && Math.abs(term) > 1e-18 * Math.abs(sum); n++) { term *= z * z / (2 * n + 1); sum += term; }
    return 0.5 + Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI) * sum;
  }
  const r4 = (x) => Math.round(x * 1e4) / 1e4;
  const T = (z) => (z >= 0 ? r4(Phi(z)) : r4(1 - r4(Phi(-z))));
  const c2 = (x) => x.toFixed(2).replace('.', '{,}');
  const c4 = (x) => x.toFixed(4).replace('.', '{,}');
  const dp = (x) => String(Math.round(x * 1e6) / 1e6).replace('.', ',');       // decimal en texto normal (fuera de $…$)
  const dn = (x) => String(Math.round(x * 1e6) / 1e6).replace('.', '{,}');
  const emist = (ans, list) => list.filter((m) => Number.isFinite(m.value) && Math.abs(m.value - ans) > 2e-3);

  const NIV = { 90: { z: 1.645, alt: [1.64, 1.65], p: '0{,}95' }, 95: { z: 1.96, alt: [], p: '0{,}975' }, 99: { z: 2.575, alt: [2.57, 2.58], p: '0{,}995' } };
  const NIV_OPT = [['90', '90 %'], ['95', '95 %'], ['99', '99 %']];
  const zTxt = (z) => String(z).replace('.', '{,}');
  const bothZ = (nivel) => [NIV[nivel].z].concat(NIV[nivel].alt);

  /* ===================== Valor crítico ===================== */
  G.define({
    id: 'ccss-inf-zcritico',
    title: 'Valor crítico $z_{\\alpha/2}$',
    help: [
      'El valor crítico $z_{\\alpha/2}$ deja un área $\\frac\\alpha2$ en cada cola de la $N(0,1)$, es decir, cumple $P(Z\\le z_{\\alpha/2})=1-\\frac\\alpha2$. Se busca esa probabilidad <b>dentro</b> de la tabla (lectura inversa) y se lee el $z$.',
      'Ejemplo para el $95\\,\\%$: $\\alpha=0{,}05$, $1-\\frac\\alpha2=0{,}975$, que está en la tabla en $z=1{,}96$. Si la probabilidad cae justo entre dos valores de la tabla, se toma el punto medio o cualquiera de los dos.',
    ],
    params: [{ key: 'nivel', label: 'Nivel de confianza', options: NIV_OPT }],
    generate(p) {
      const nv = NIV[p.nivel], al = (100 - Number(p.nivel)) / 100;
      const steps = ['Nivel ' + i$(p.nivel + '\\,\\%') + ': ' + i$('\\alpha=' + dn(al) + ',\\ 1-\\frac{\\alpha}{2}=' + nv.p) + '.'];
      if (p.nivel === '95') steps.push('En la tabla aparece ' + i$('\\Phi(1{,}96)=0{,}9750') + ', luego ' + i$('z_{\\alpha/2}=1{,}96') + '.');
      else if (p.nivel === '90') steps.push('El ' + i$('0{,}95') + ' no está: la tabla tiene ' + i$('\\Phi(1{,}64)=0{,}9495') + ' y ' + i$('\\Phi(1{,}65)=0{,}9505') + ', a la misma distancia. Se toma el punto medio ' + i$('z_{\\alpha/2}=1{,}645') + ' (valen también $1{,}64$ y $1{,}65$).');
      else steps.push('El ' + i$('0{,}995') + ' no está: la tabla tiene ' + i$('\\Phi(2{,}57)=0{,}9949') + ' y ' + i$('\\Phi(2{,}58)=0{,}9951') + ', a la misma distancia. Se toma el punto medio ' + i$('z_{\\alpha/2}=2{,}575') + ' (valen también $2{,}57$ y $2{,}58$).');
      return {
        prompt: 'Halla el valor crítico $z_{\\alpha/2}$ para un nivel de confianza del $' + p.nivel + '\\,\\%$ usando la tabla de la normal al revés.',
        answer: { kind: 'expr', label: 'z_{\\alpha/2}=', value: nv.z, alt: nv.alt },
        steps, mistakes: [],
        data: { nivel: Number(p.nivel), z: nv.z, alt: nv.alt },
      };
    },
  });

  /* ===================== Distribución de la media y de la proporción muestrales ===================== */
  const SE_OK = [2, 3, 4, 5, 6, 10], N_OK = [36, 49, 64, 100, 144, 225, 400, 900];
  const PROP = [];   // (p, n, se) con error típico de a lo sumo 2 decimales exactos
  for (let pc = 10; pc <= 90; pc += 5) for (let n = 30; n <= 1200; n++) {
    const p = pc / 100, v = p * (1 - p) / n, se = Math.sqrt(v);
    if (Math.abs(Math.round(se * 100) / 100 - se) < 1e-12 && Math.round(se * 100) >= 1) PROP.push([p, n, Math.round(se * 100) / 100]);
  }
  const MCTX = [
    (mu, sg) => 'El gasto mensual en ocio (en euros) de los jóvenes de una ciudad tiene media $\\mu=' + mu + '$ y desviación típica $\\sigma=' + sg + '$.',
    (mu, sg) => 'El tiempo (en minutos) que tarda un reparto en llegar tiene media $\\mu=' + mu + '$ y desviación típica $\\sigma=' + sg + '$.',
    (mu, sg) => 'El peso (en gramos) de los paquetes de una máquina tiene media $\\mu=' + mu + '$ y desviación típica $\\sigma=' + sg + '$.',
  ];
  G.define({
    id: 'ccss-inf-xbar',
    title: 'Distribución de la media y la proporción muestrales',
    help: [
      'Con muestras de tamaño $n\\ge30$: $\\overline{X}\\approx N\\!\\left(\\mu,\\dfrac{\\sigma}{\\sqrt n}\\right)$ y $\\hat p\\approx N\\!\\left(p,\\sqrt{\\dfrac{p(1-p)}{n}}\\right)$. Después se tipifica $z=\\frac{x-\\text{media}}{\\text{desviación}}$ (a centésimas) y se usa la tabla.',
      'Ejemplo: $\\mu=1200$, $\\sigma=300$, $n=100$: $\\overline{X}\\approx N(1200,30)$. $P(\\overline{X}>1236)=P(Z>1{,}2)=1-0{,}8849=0{,}1151$. Cuidado: la desviación es $\\sigma/\\sqrt n$, no $\\sigma$.',
    ],
    params: [
      { key: 'var', label: 'Estadístico', options: [['media', 'Media muestral'], ['prop', 'Proporción muestral']] },
      { key: 'cola', label: 'Calcular', options: [['lt', 'P(X̄ < a)'], ['gt', 'P(X̄ > a)'], ['entre', 'P(a < X̄ < b)']] },
    ],
    generate(p) {
      let mu, se, n, sg, ctx, simb;
      if (p.var === 'media') {
        se = rnd.pick(SE_OK); n = rnd.pick(N_OK); sg = se * Math.sqrt(n); mu = rnd.int(20, 300);
        ctx = rnd.pick(MCTX)(mu, sg) + ' Se toma una muestra aleatoria de $n=' + n + '$.';
        simb = '\\overline{X}';
      } else {
        const [pp, nn, ss] = rnd.pick(PROP); mu = pp; n = nn; se = ss;
        ctx = 'En una población, la proporción de individuos con cierta característica es $p=' + dn(mu) + '$. Se toma una muestra aleatoria de $n=' + n + '$ y $\\hat p$ es la proporción muestral.';
        simb = '\\hat p';
      }
      const zk = () => { let k = 0; while (k === 0) k = rnd.int(-52, 52); return k / 20; };   // múltiplos de 0,05 hasta ±2,6
      const val = (z) => Math.round((mu + z * se) * 1e6) / 1e6;
      const dist = p.var === 'media'
        ? i$(simb + '\\approx N\\!\\left(' + mu + ',\\frac{' + sg + '}{\\sqrt{' + n + '}}\\right)=N(' + mu + ',' + se + ')')
        : i$(simb + '\\approx N\\!\\left(' + dn(mu) + ',\\sqrt{\\frac{' + dn(mu) + '\\cdot' + dn(1 - mu) + '}{' + n + '}}\\right)=N(' + dn(mu) + ',' + dn(se) + ')');
      const zt = (a, z) => '\\frac{' + dn(a) + '-' + dn(mu) + '}{' + dn(se) + '}=' + c2(z);
      let ans, steps, ask, mist = [], zA = null, zB = null;
      if (p.cola === 'entre') {
        zA = zk(); zB = zk(); while (Math.abs(zA - zB) < 0.2) zB = zk();
        if (zA > zB) [zA, zB] = [zB, zA];
        const a = val(zA), b = val(zB);
        ans = r4(T(zB) - T(zA)); ask = 'P(' + dn(a) + '<' + simb + '<' + dn(b) + ')';
        steps = [dist, 'Tipificamos: ' + d$('z_a=' + zt(a, zA) + ',\\qquad z_b=' + zt(b, zB)), d$(ask + '=\\Phi(' + c2(zB) + ')-\\Phi(' + c2(zA) + ')=' + c4(T(zB)) + '-' + c4(T(zA)) + '=' + c4(ans))];
        mist = [{ value: r4(T(zB) + T(zA)), msg: 'se <b>resta</b>: $\\Phi(z_b)-\\Phi(z_a)$.' }];
        if (p.var === 'media') { const w = (x) => (x - mu) / sg; mist.push({ value: r4(T(Math.round(w(b) * 100) / 100) - T(Math.round(w(a) * 100) / 100)), msg: 'la desviación de la media muestral es $\\sigma/\\sqrt n$, no $\\sigma$.' }); }
      } else {
        const z = zk(), a = val(z);
        ans = p.cola === 'lt' ? T(z) : r4(1 - T(z));
        ask = 'P(' + simb + (p.cola === 'lt' ? '<' : '>') + dn(a) + ')';
        steps = [dist, 'Tipificamos: ' + d$('z=' + zt(a, z)),
          p.cola === 'lt' ? d$(ask + '=\\Phi(' + c2(z) + ')=' + (z >= 0 ? c4(T(z)) : '1-\\Phi(' + c2(-z) + ')=1-' + c4(T(-z)) + '=' + c4(ans)))
            : d$(ask + '=1-\\Phi(' + c2(z) + ')=1-' + (z >= 0 ? c4(T(z)) : '(1-' + c4(T(-z)) + ')') + '=' + c4(ans))];
        mist = [{ value: p.cola === 'lt' ? r4(1 - T(z)) : T(z), msg: p.cola === 'lt' ? 'revisa el sentido: «menor que» es $\\Phi(z)$.' : '«mayor que» es el contrario: $1-\\Phi(z)$.' }];
        if (p.var === 'media') { const zz = Math.round(((a - mu) / sg) * 100) / 100; mist.push({ value: p.cola === 'lt' ? T(zz) : r4(1 - T(zz)), msg: 'la desviación de la media muestral es $\\sigma/\\sqrt n$, no $\\sigma$.' }); }
        zA = z;
      }
      return {
        prompt: ctx + ' Calcula $' + ask + '$ <small>(4 decimales; $z$ a centésimas)</small>.',
        answer: { kind: 'expr', label: ask + '=', value: ans },
        steps, mistakes: emist(ans, mist),
        data: { var: p.var, cola: p.cola, mu, se, n, sg, zA, zB, ans },
      };
    },
  });

  /* ===================== Intervalo de confianza para la media ===================== */
  const ICTX = [
    { s: 'El gasto mensual en alimentación (en euros) de los hogares de una ciudad', u: '€', mean: [250, 650], se: [3, 4, 5, 6, 8, 10] },
    { s: 'El tiempo diario (en minutos) que los adolescentes dedican a las redes sociales', u: 'min', mean: [60, 240], se: [2, 3, 4, 5] },
    { s: 'El consumo mensual de agua (en m³) de las viviendas de un barrio', u: 'm³', mean: [10, 30], se: [0.5, 1] },
    { s: 'La duración (en horas) de las baterías de un modelo de móvil', u: 'h', mean: [8, 16], se: [0.5, 1] },
  ];
  const round = (x, d) => Math.round(x * Math.pow(10, d)) / Math.pow(10, d);
  const fmtN = (x, d) => (round(x, d)).toFixed(d).replace('.', '{,}');
  G.define({
    id: 'ccss-inf-ic-media',
    title: 'Intervalo de confianza para la media',
    help: [
      'Con $\\sigma$ conocida y $n\\ge30$: el intervalo de confianza para $\\mu$ es $\\left(\\overline{x}-E,\\ \\overline{x}+E\\right)$ con error máximo $E=z_{\\alpha/2}\\dfrac{\\sigma}{\\sqrt n}$. Valores críticos: $1{,}645$ ($90\\,\\%$), $1{,}96$ ($95\\,\\%$) y $2{,}575$ ($99\\,\\%$).',
      'Ejemplo: $\\sigma=60$, $n=100$, $\\overline{x}=420$ al $95\\,\\%$: $E=1{,}96\\cdot\\frac{60}{10}=11{,}76$ y el intervalo es $(408{,}24;\\ 431{,}76)$. Se redondea a dos decimales.',
    ],
    params: [
      { key: 'nivel', label: 'Nivel de confianza', options: NIV_OPT },
      { key: 'pide', label: 'Calcular', options: [['int', 'Intervalo'], ['err', 'Error máximo']] },
    ],
    generate(p) {
      const cx = rnd.pick(ICTX), n = rnd.pick(N_OK.concat([196, 256, 625])), r = Math.sqrt(n);
      const se = rnd.pick(cx.se), sg = round(se * r, 2), xb = round(cx.mean[0] + rnd.int(0, Math.round((cx.mean[1] - cx.mean[0]) * 5)) / 5, 1);
      const nv = NIV[p.nivel], zs = bothZ(p.nivel);
      const E = (z) => z * se;
      const base = cx.s + ' tiene desviación típica $\\sigma=' + dn(sg) + '$ ' + cx.u + '. Con una muestra de $n=' + n + '$ se obtiene una media $\\overline{x}=' + dn(xb) + '$ ' + cx.u + '. ';
      const steps = ['Error típico: ' + i$('\\frac{\\sigma}{\\sqrt n}=\\frac{' + dn(sg) + '}{\\sqrt{' + n + '}}=\\frac{' + dn(sg) + '}{' + r + '}=' + dn(se)) + '. Valor crítico al ' + i$(p.nivel + '\\,\\%') + ': ' + i$('z_{\\alpha/2}=' + zTxt(nv.z)) + '.',
        'Error máximo: ' + d$('E=' + zTxt(nv.z) + '\\cdot' + dn(se) + '=' + fmtN(E(nv.z), 3))];
      if (p.pide === 'err') {
        return {
          prompt: base + 'Calcula el error máximo $E$ del intervalo de confianza al $' + p.nivel + '\\,\\%$ <small>(2 decimales)</small>.',
          answer: { kind: 'expr', label: 'E=', value: E(nv.z), alt: nv.alt.map(E) },
          steps, mistakes: [], data: { pide: 'err', nivel: Number(p.nivel), n, sg, se, xb, z: nv.z, alt: nv.alt },
        };
      }
      const lo = (z) => xb - E(z), hi = (z) => xb + E(z);
      steps.push('Intervalo: ' + d$('\\left(' + dn(xb) + '-' + fmtN(E(nv.z), 3) + ',\\ ' + dn(xb) + '+' + fmtN(E(nv.z), 3) + '\\right)=(' + fmtN(lo(nv.z), 2) + ';\\ ' + fmtN(hi(nv.z), 2) + ')'),
        'Con una confianza del ' + i$(p.nivel + '\\,\\%') + ', la media de la población está entre ' + i$(fmtN(lo(nv.z), 2)) + ' y ' + i$(fmtN(hi(nv.z), 2)) + ' ' + cx.u + '.');
      return {
        prompt: base + 'Halla el intervalo de confianza para la media poblacional al $' + p.nivel + '\\,\\%$ <small>(extremos con 2 decimales)</small>.',
        answer: { kind: 'multi', parts: [{ kind: 'expr', label: 'a=', value: lo(nv.z), alt: nv.alt.map(lo) }, { kind: 'expr', label: 'b=', value: hi(nv.z), alt: nv.alt.map(hi) }] },
        steps, mistakes: [], data: { pide: 'int', nivel: Number(p.nivel), n, sg, se, xb, z: nv.z, alt: nv.alt },
      };
    },
  });

  /* ===================== Intervalo de confianza para una proporción ===================== */
  const PCTX = [
    (n, k) => 'En una encuesta a ' + n + ' personas, ' + k + ' dicen que usan el transporte público a diario.',
    (n, k) => 'De ' + n + ' clientes de una tienda online elegidos al azar, ' + k + ' repetirían la compra.',
    (n, k) => 'En una muestra de ' + n + ' piezas de una fábrica, ' + k + ' resultan defectuosas.',
  ];
  G.define({
    id: 'ccss-inf-ic-prop',
    title: 'Intervalo de confianza para una proporción',
    help: [
      'Si en una muestra de $n\\ge30$ la proporción es $\\hat p$, el intervalo de confianza para $p$ es $\\left(\\hat p-E,\\ \\hat p+E\\right)$ con $E=z_{\\alpha/2}\\sqrt{\\dfrac{\\hat p(1-\\hat p)}{n}}$. Valores críticos: $1{,}645$, $1{,}96$ y $2{,}575$.',
      'Ejemplo: $n=400$ y $120$ éxitos: $\\hat p=0{,}3$, $\\sqrt{\\frac{0{,}3\\cdot0{,}7}{400}}\\approx0{,}0229$; al $95\\,\\%$: $E\\approx0{,}0449$ y el intervalo es $(0{,}2551;\\ 0{,}3449)$ (4 decimales).',
    ],
    params: [
      { key: 'nivel', label: 'Nivel de confianza', options: NIV_OPT },
      { key: 'pide', label: 'Calcular', options: [['int', 'Intervalo'], ['err', 'Error máximo']] },
    ],
    generate(p) {
      let n, ph, k;
      do { n = rnd.pick([100, 200, 250, 400, 500, 800, 1000]); ph = rnd.int(10, 90) / 100; k = Math.round(ph * n); } while (Math.abs(k / n - ph) > 1e-12);   // p̂ = k/n exacta
      const nv = NIV[p.nivel], zs = bothZ(p.nivel);
      const sd = Math.sqrt(ph * (1 - ph) / n), E = (z) => z * sd;
      const base = rnd.pick(PCTX)(n, k) + ' Estima la proporción de la población con un intervalo de confianza al $' + p.nivel + '\\,\\%$.';
      const steps = ['Proporción muestral: ' + i$('\\hat p=\\frac{' + k + '}{' + n + '}=' + dn(ph)) + '. Error típico: ' + d$('\\sqrt{\\frac{\\hat p(1-\\hat p)}{n}}=\\sqrt{\\frac{' + dn(ph) + '\\cdot' + dn(1 - ph) + '}{' + n + '}}\\approx' + c4(sd)),
        'Valor crítico: ' + i$('z_{\\alpha/2}=' + zTxt(nv.z)) + '. Error máximo: ' + d$('E=' + zTxt(nv.z) + '\\cdot' + c4(sd) + '\\approx' + c4(E(nv.z)))];
      if (p.pide === 'err') {
        return {
          prompt: base.replace('Estima la proporción de la población con un intervalo de confianza al', 'Calcula el error máximo del intervalo de confianza para la proporción, al').replace(/\.$/, '') + ' <small>(4 decimales)</small>.',
          answer: { kind: 'expr', label: 'E=', value: E(nv.z), alt: nv.alt.map(E) },
          steps, mistakes: [], data: { pide: 'err', nivel: Number(p.nivel), n, k, ph, z: nv.z, alt: nv.alt },
        };
      }
      const lo = (z) => ph - E(z), hi = (z) => ph + E(z);
      steps.push('Intervalo: ' + d$('(' + dn(ph) + '-' + c4(E(nv.z)) + ',\\ ' + dn(ph) + '+' + c4(E(nv.z)) + ')=(' + c4(lo(nv.z)) + ';\\ ' + c4(hi(nv.z)) + ')'),
        'Con una confianza del ' + i$(p.nivel + '\\,\\%') + ', la proporción de la población está entre el ' + i$(fmtN(lo(nv.z) * 100, 2) + '\\,\\%') + ' y el ' + i$(fmtN(hi(nv.z) * 100, 2) + '\\,\\%') + '.');
      return {
        prompt: base + ' <small>(extremos con 4 decimales)</small>',
        answer: { kind: 'multi', parts: [{ kind: 'expr', label: 'a=', value: lo(nv.z), alt: nv.alt.map(lo) }, { kind: 'expr', label: 'b=', value: hi(nv.z), alt: nv.alt.map(hi) }] },
        steps, mistakes: [], data: { pide: 'int', nivel: Number(p.nivel), n, k, ph, z: nv.z, alt: nv.alt },
      };
    },
  });

  /* ===================== Tamaño muestral mínimo ===================== */
  G.define({
    id: 'ccss-inf-tamano',
    title: 'Tamaño muestral mínimo',
    help: [
      'Para que el error no supere $E$: media, $n\\ge\\left(\\dfrac{z_{\\alpha/2}\\,\\sigma}{E}\\right)^2$; proporción, $n\\ge\\dfrac{z_{\\alpha/2}^2\\,p(1-p)}{E^2}$. Se toma siempre el <b>entero superior</b>. Si no se conoce $p$, se usa $p=0{,}5$ (da el mayor $n$).',
      'Ejemplo: $\\sigma=60$, $E=8$, $95\\,\\%$: $n\\ge\\left(\\frac{1{,}96\\cdot60}{8}\\right)^2=216{,}09$, luego $n=217$. Con $90\\,\\%$ o $99\\,\\%$ el resultado depende del $z$ elegido ($1{,}64$; $1{,}645$; $1{,}65$): se aceptan los tres.',
    ],
    params: [
      { key: 'tipo', label: 'Parámetro', options: [['media', 'Media'], ['prop', 'Proporción']] },
      { key: 'nivel', label: 'Nivel de confianza', options: NIV_OPT },
    ],
    generate(p) {
      const nv = NIV[p.nivel], zs = bothZ(p.nivel);
      for (let t = 0; t < 1000; t++) {
        let Ef, nfun, prompt, formula, data;
        if (p.tipo === 'media') {
          const sg = rnd.int(5, 80), E = rnd.int(1, 10);
          nfun = (z) => Math.pow(z * sg / E, 2);
          prompt = 'La desviación típica de una variable es $\\sigma=' + sg + '$. ¿Qué tamaño mínimo debe tener una muestra para estimar su media con un error máximo de ' + E + ' unidades y una confianza del $' + p.nivel + '\\,\\%$?';
          formula = (z) => d$('n\\ge\\left(\\frac{z_{\\alpha/2}\\,\\sigma}{E}\\right)^2=\\left(\\frac{' + zTxt(z) + '\\cdot' + sg + '}{' + E + '}\\right)^2=' + fmtN(nfun(z), 2));
          data = { tipo: 'media', sg, E };
        } else {
          const E = rnd.pick([0.01, 0.02, 0.03, 0.04, 0.05]), conocida = rnd.pick([true, false]), pp = conocida ? rnd.pick([0.2, 0.3, 0.4, 0.6, 0.7, 0.8]) : 0.5;
          nfun = (z) => z * z * pp * (1 - pp) / (E * E);
          prompt = 'Se quiere estimar una proporción con un error máximo de ' + dp(E) + ' y una confianza del $' + p.nivel + '\\,\\%$. ' + (conocida ? 'Un estudio previo la estima en ' + dp(pp) + '.' : 'No hay información previa sobre su valor.') + ' ¿Qué tamaño mínimo debe tener la muestra?';
          formula = (z) => d$('n\\ge\\frac{z_{\\alpha/2}^2\\,p(1-p)}{E^2}=\\frac{' + zTxt(z) + '^2\\cdot' + dn(pp) + '\\cdot' + dn(1 - pp) + '}{' + dn(E) + '^2}=' + fmtN(nfun(z), 2));
          data = { tipo: 'prop', E, pp };
        }
        const vals = zs.map((z) => nfun(z));
        if (vals.some((v) => Math.abs(v - Math.round(v)) < 1e-6)) continue;       // evita n exacto: el «entero superior» sería ambiguo
        if (Math.ceil(vals[0]) < 30 || Math.ceil(vals[0]) > 20000) continue;
        const ns = vals.map(Math.ceil);
        const steps = [(p.tipo === 'prop' && data.pp === 0.5 ? 'Sin información previa se toma ' + i$('p=0{,}5') + '. ' : '') + 'Valor crítico: ' + i$('z_{\\alpha/2}=' + zTxt(nv.z)) + '.', formula(nv.z),
          'Se redondea al entero superior: ' + i$('n=' + ns[0]) + '.'];
        if (nv.alt.length) steps.push('Con ' + nv.alt.map((z) => i$('z=' + zTxt(z))).join(' o ') + ' salen ' + ns.slice(1).map((v) => i$(v)).join(' y ') + ': también son válidos.');
        return {
          prompt, answer: { kind: 'expr', label: 'n\\ge', value: ns[0], alt: ns.slice(1), show: String(ns[0]) },
          steps, mistakes: [{ value: Math.floor(vals[0]), msg: 'hay que redondear <b>hacia arriba</b>: con $' + Math.floor(vals[0]) + '$ individuos el error sería algo mayor que el pedido.' }].filter((m) => !ns.includes(m.value)),
          data: Object.assign(data, { nivel: Number(p.nivel), z: nv.z, zs, ns }),
        };
      }
      throw new Error('no se pudo generar el reto de tamaño muestral');
    },
  });

  /* ===================== Relación entre confianza, error y tamaño ===================== */
  const INTERP = (a, b, u) => [
    'Con una confianza del $95\\,\\%$, la media de la población está entre ' + a + ' y ' + b + ' ' + u + '.',
    'El $95\\,\\%$ de los individuos de la población tiene un valor entre ' + a + ' y ' + b + ' ' + u + '.',
    'La media de la muestra está entre ' + a + ' y ' + b + ' ' + u + ' con probabilidad $0{,}95$.',
    'La probabilidad de que la media de otra muestra caiga entre ' + a + ' y ' + b + ' ' + u + ' es del $95\\,\\%$.',
  ];
  G.define({
    id: 'ccss-inf-relacion',
    title: 'Confianza, error y tamaño de la muestra',
    help: [
      'En $E=z_{\\alpha/2}\\dfrac{\\sigma}{\\sqrt n}$: con $n$ fijo, más confianza ($z$ mayor) da <b>más</b> error (intervalo más ancho); con la confianza fija, más $n$ da <b>menos</b> error. Como $E\\propto\\frac1{\\sqrt n}$, para dividir el error entre $2$ hay que <b>cuadruplicar</b> $n$.',
      'Interpretación: un intervalo al $95\\,\\%$ significa que, si se repitiera el muestreo muchas veces, aproximadamente el $95\\,\\%$ de los intervalos construidos contendría la media de la población. No dice que el $95\\,\\%$ de los individuos esté en el intervalo.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['numerica', 'Calcular el nuevo error'], ['cualitativa', 'Efecto cualitativo'], ['interpretacion', 'Interpretar un intervalo']] }],
    generate(p) {
      if (p.tipo === 'numerica') {
        const k = rnd.pick([2, 3, 4]), sube = rnd.pick([true, false]), base = rnd.pick([25, 36, 49, 64, 100, 144]);
        const n0 = sube ? base : base * k * k, n1 = sube ? base * k * k : base;
        const E0 = sube ? k * rnd.int(2, 9) : rnd.int(2, 9) * 2;
        const E1 = sube ? E0 / k : E0 * k;
        return {
          prompt: 'Con una muestra de $n=' + n0 + '$ el error máximo de un intervalo de confianza para la media es $E=' + E0 + '$. Si se mantienen la confianza y $\\sigma$ pero la muestra pasa a tener $n=' + n1 + '$, ¿cuál es el nuevo error máximo?',
          answer: { kind: 'number', label: 'E\'=', value: F(E1) },
          steps: ['El error es $E=z_{\\alpha/2}\\frac{\\sigma}{\\sqrt n}$, proporcional a $\\frac{1}{\\sqrt n}$.', 'El tamaño se ' + (sube ? 'multiplica por ' + k * k : 'divide entre ' + k * k) + ': ' + i$('\\sqrt{' + (k * k) + '}=' + k) + ', así que el error se ' + (sube ? 'divide entre ' : 'multiplica por ') + k + '.', d$('E\'=' + (sube ? '\\frac{' + E0 + '}{' + k + '}' : E0 + '\\cdot' + k) + '=' + E1)],
          data: { tipo: 'numerica', k, sube, n0, n1, E0, E1 },
        };
      }
      if (p.tipo === 'cualitativa') {
        const Q = [
          { q: 'Si se mantiene el tamaño de la muestra y se pasa de un nivel de confianza del $90\\,\\%$ al $99\\,\\%$, el error máximo del intervalo...', o: ['aumenta', 'disminuye', 'no cambia', 'se duplica exactamente'], c: 0 },
          { q: 'Si se mantiene la confianza y se aumenta el tamaño de la muestra, la amplitud del intervalo...', o: ['aumenta', 'disminuye', 'no cambia', 'depende solo de la media muestral'], c: 1 },
          { q: 'Para reducir el error máximo a la mitad, manteniendo la confianza, el tamaño de la muestra debe...', o: ['duplicarse', 'cuadruplicarse', 'reducirse a la mitad', 'multiplicarse por $\\sqrt2$'], c: 1 },
          { q: 'Se quiere más confianza sin aumentar el error máximo. Hay que...', o: ['disminuir el tamaño de la muestra', 'aumentar el tamaño de la muestra', 'aumentar $\\sigma$', 'no se puede'], c: 1 },
        ];
        const it = rnd.pick(Q);
        return {
          prompt: it.q,
          answer: { kind: 'choice', options: it.o, value: String(it.c) },
          steps: ['Se usa $E=z_{\\alpha/2}\\dfrac{\\sigma}{\\sqrt n}$: más confianza significa mayor $z_{\\alpha/2}$ (mayor $E$); más $n$ significa menor $E$, y $E$ depende de $\\frac1{\\sqrt n}$.', 'Respuesta correcta: ' + it.o[it.c] + '.'],
          data: { tipo: 'cualitativa', c: it.c, n: it.o.length },
        };
      }
      const a = rnd.int(100, 900), w = rnd.pick([10, 12, 15, 20, 24]), u = rnd.pick(['€', 'minutos', 'horas']);
      const opts = INTERP(i$(fmtN(a, 2)), i$(fmtN(a + w, 2)), u);
      const order = rnd.shuffle([0, 1, 2, 3]);
      return {
        prompt: 'En un estudio sobre la media de una población se obtiene el intervalo de confianza $(' + fmtN(a, 2) + ';\\ ' + fmtN(a + w, 2) + ')$ al $95\\,\\%$. ¿Qué interpretación es correcta?',
        answer: { kind: 'choice', options: order.map((i) => opts[i]), value: String(order.indexOf(0)) },
        steps: ['Un intervalo de confianza se refiere al <b>parámetro de la población</b> (la media $\\mu$), no a los individuos ni a la media de la muestra (que ya se conoce).', 'La confianza es la proporción de intervalos que contendrían a $\\mu$ si se repitiera el muestreo muchas veces. La correcta es: «' + opts[0] + '»'],
        data: { tipo: 'interpretacion', order },
      };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
