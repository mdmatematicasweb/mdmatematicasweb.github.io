/* Simulacro PAU CCSS — generadores de los ejercicios 3 (probabilidad y distribuciones) y 4 (inferencia), de 2 puntos cada uno.
 * La normal imita la tabla de la Junta: z a centésimas y Φ(z) con 4 decimales (aquí |z| ≤ 2,6). Valores críticos: 1,645 (90 %), 1,96 (95 %) y 2,575 (99 %);
 * se aceptan también 1,64 / 1,65 y 2,57 / 2,58 (alt). Verificadores independientes: tests/verify-ccss-estadistica.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym, X = root.MDExamCCSS;
  const { rnd, F, d$, i$, fstr } = G;
  const part = (texto, pts, answer, steps) => ({ texto, pts, answer, steps });

  /* ---------- Φ(z) y tabla ---------- */
  function Phi(z) {
    if (z < 0) return 1 - Phi(-z);
    if (z > 8) return 1;
    let term = z, sum = z;
    for (let n = 1; n < 400 && Math.abs(term) > 1e-18 * Math.abs(sum); n++) { term *= z * z / (2 * n + 1); sum += term; }
    return 0.5 + Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI) * sum;
  }
  const r4 = (x) => Math.round(x * 1e4 + 1e-9) / 1e4;
  const r2 = (x) => Math.round(x * 100 + 1e-9) / 100;
  const T = (z) => (z >= 0 ? r4(Phi(z)) : r4(1 - r4(Phi(-z))));          // Φ(z) como en la tabla
  const pZ = (op, z) => (op === 'lt' ? T(z) : T(-z));
  const c2 = (x) => x.toFixed(2).replace('.', '{,}');
  const c4 = (x) => x.toFixed(4).replace('.', '{,}');
  const dn = (x) => String(Math.round(x * 1e6) / 1e6).replace('.', '{,}');       // decimal dentro de $…$
  const dp = (x) => String(Math.round(x * 1e6) / 1e6).replace('.', ',');         // decimal en texto normal
  const sg = (op) => (op === 'lt' ? '<' : '>');
  /** P(Z op z) leído en la tabla, con los pasos. */
  const lectura = (op, z) => {
    const za = Math.abs(z), pa = T(za), tz = c2(z), ta = c2(za);
    if (op === 'lt') return z >= 0 ? '\\Phi(' + tz + ')=' + c4(pa) : '1-\\Phi(' + ta + ')=1-' + c4(pa) + '=' + c4(r4(1 - pa));
    return z >= 0 ? '1-\\Phi(' + tz + ')=1-' + c4(pa) + '=' + c4(r4(1 - pa)) : '\\Phi(' + ta + ')=' + c4(pa);
  };
  /** Lectura inversa: P(Z op z)=p ⇒ z (con z a centésimas). */
  const inversa = (op, z, p) => {
    const q = (op === 'lt') === (z >= 0) ? p : r4(1 - p);
    const nota = q === p ? '' : ' (como ' + i$('p' + (p < 0.5 ? '<0{,}5' : '>0{,}5')) + ', ' + i$('z' + (z < 0 ? '<0' : '>0')) + ' y se usa ' + i$('\\Phi(' + c2(Math.abs(z)) + ')=1-' + c4(p) + '=' + c4(q)) + ')';
    return 'Buscamos en la tabla ' + i$('\\Phi(' + c2(Math.abs(z)) + ')=' + c4(q)) + nota + ': ' + i$('z=' + c2(z)) + '.';
  };
  const round = (x, d) => Math.round(x * Math.pow(10, d)) / Math.pow(10, d);
  const fmtN = (x, d) => round(x, d).toFixed(d).replace('.', '{,}');
  const zk = (lo, hi) => { let k = 0; while (k === 0) k = rnd.int(lo, hi); return k / 20; };   // múltiplos de 0,05

  /* ===================== Probabilidad total y Bayes ===================== */
  const CTX_PT = [
    { t: (n) => 'Una fábrica produce piezas con ' + n + ' máquinas, ', ent: 'máquina', nom: (i) => 'la máquina ' + 'ABC'[i], suj: 'una pieza', evdef: 'la pieza es defectuosa', evtxt: 'sea defectuosa', hecho: 'es defectuosa', de: 'proceda de', sipr: 'procede de' },
    { t: (n) => 'Un instituto tiene ' + n + ' grupos de 2.º de Bachillerato, ', ent: 'grupo', nom: (i) => 'el grupo ' + 'ABC'[i], suj: 'un estudiante', evdef: 'el estudiante suspende matemáticas', evtxt: 'suspenda matemáticas', hecho: 'ha suspendido matemáticas', de: 'pertenezca a', sipr: 'pertenece a' },
    { t: (n) => 'Una empresa de reparto usa ' + n + ' rutas, ', ent: 'ruta', nom: (i) => 'la ruta ' + 'ABC'[i], suj: 'un paquete', evdef: 'el paquete llega con retraso', evtxt: 'llegue con retraso', hecho: 'ha llegado con retraso', de: 'vaya por', sipr: 'va por' },
  ];
  const PRI3 = [[50, 30, 20], [40, 35, 25], [60, 25, 15], [45, 35, 20], [30, 30, 40], [55, 30, 15], [25, 25, 50]];
  const PRI2 = [[60, 40], [70, 30], [55, 45], [65, 35], [80, 20]];
  X.implementar({
    id: 'prob-total-bayes',
    generate() {
      for (;;) {
        const c = rnd.pick(CTX_PT), n = rnd.pick([2, 3, 3]);
        const pri = rnd.pick(n === 3 ? PRI3 : PRI2);
        const q = pri.map(() => rnd.int(1, 12));
        if (new Set(q).size < n) continue;
        const nombres = pri.map((_, i) => c.nom(i));
        const conj = pri.map((x, i) => x * q[i]);                      // en 1/10000
        const tot = conj.reduce((s, x) => s + x, 0);
        const j = rnd.int(0, n - 1), k = rnd.int(0, n - 1);
        const pct = (x) => x + '\\,\\%';
        const lista = (a) => a.length === 2 ? a.join(' y ') : a.slice(0, -1).join(', ') + ' y ' + a[a.length - 1];
        const enun = c.t(n) + lista(nombres.map((x) => 'ABC'[nombres.indexOf(x)])) + ', que ' + (c.ent === 'ruta' ? 'transportan' : c.ent === 'grupo' ? 'reúnen' : 'producen') + ' el ' + lista(pri.map((x) => x + ' %')) + ' del total, respectivamente. La probabilidad de que ' + c.suj + ' ' + c.evtxt + ' es ' + lista(q.map((x, i) => 'del ' + x + ' % si ' + c.sipr + ' ' + nombres[i])) + '. Se elige ' + c.suj + ' al azar.';
        const bayesSteps = [
          d$('P(' + 'ABC'[k] + '\\mid E)=\\dfrac{P(' + 'ABC'[k] + ')\\,P(E\\mid ' + 'ABC'[k] + ')}{P(E)}=\\dfrac{' + dn(pri[k] / 100) + '\\cdot' + dn(q[k] / 100) + '}{' + dn(tot / 10000) + '}=\\dfrac{' + dn(conj[k] / 10000) + '}{' + dn(tot / 10000) + '}\\approx' + c4(conj[k] / tot)),
        ];
        return {
          enunciado: enun + ' Sea ' + i$('E') + ' el suceso «' + c.evdef + '».',
          partes: [
            part('Calcula la probabilidad de que ' + c.suj + ' ' + c.de + ' ' + nombres[j] + ' y ' + c.evtxt + '. <small>(Decimal con 4 cifras.)</small>', 0.5, { kind: 'number', label: 'P(' + 'ABC'[j] + '\\cap E)=', value: F(conj[j], 10000) },
              [d$('P(' + 'ABC'[j] + '\\cap E)=P(' + 'ABC'[j] + ')\\,P(E\\mid ' + 'ABC'[j] + ')=' + dn(pri[j] / 100) + '\\cdot' + dn(q[j] / 100) + '=' + dn(conj[j] / 10000))]),
            part('Calcula la probabilidad de que ' + c.suj + ' ' + c.evtxt + '. <small>(Decimal con 4 cifras.)</small>', 0.75, { kind: 'number', label: 'P(E)=', value: F(tot, 10000) },
              ['Probabilidad total: ' + d$('P(E)=' + pri.map((x, i) => dn(x / 100) + '\\cdot' + dn(q[i] / 100)).join('+') + '=' + dn(tot / 10000))]),
            part('Si ' + c.suj + ' ' + c.hecho + ', ¿cuál es la probabilidad de que ' + c.de + ' ' + nombres[k] + '? <small>(Fracción o decimal con 4 cifras.)</small>', 0.75, { kind: 'expr', label: 'P(' + 'ABC'[k] + '\\mid E)=', value: conj[k] / tot, show: fstr(F(conj[k], tot)) },
              ['Teorema de Bayes:'].concat(bayesSteps)),
          ],
          data: { n, pri, q, j, k, tot, conj },
        };
      }
    },
  });

  /* ===================== Tablas de contingencia ===================== */
  const CTX_TB = [
    { t: 'En un grupo de {T} personas se han recogido el sexo y el medio de transporte habitual:', A: 'mujer', nA: 'hombre', B: 'va en transporte público', nB: 'no va en transporte público', suj: 'persona' },
    { t: 'En una encuesta a {T} estudiantes se han recogido si practican deporte y si tienen móvil con tarifa de datos ilimitada:', A: 'practica deporte', nA: 'no practica deporte', B: 'tiene datos ilimitados', nB: 'no tiene datos ilimitados', suj: 'estudiante' },
    { t: 'Entre {T} clientes de una tienda se han anotado si compran online y si son socios:', A: 'compra online', nA: 'no compra online', B: 'es socio', nB: 'no es socio', suj: 'cliente' },
  ];
  X.implementar({
    id: 'prob-tablas',
    generate() {
      for (;;) {
        const c = rnd.pick(CTX_TB), T0 = rnd.pick([100, 200, 400]);
        const indep = rnd.pick([true, false]);
        const nA = rnd.int(2, T0 / 10 - 2) * 10, nB = rnd.int(2, T0 / 10 - 2) * 10;
        let nAB;
        if (indep) { if ((nA * nB) % T0) continue; nAB = nA * nB / T0; } else { nAB = rnd.int(1, Math.min(nA, nB) - 1); if (nAB * T0 === nA * nB) continue; }
        const nAb = nA - nAB, naB = nB - nAB, nab = T0 - nA - nB + nAB;
        if ([nAB, nAb, naB, nab].some((x) => x <= 0)) continue;
        const askA = rnd.pick([true, false]);                        // P(A|B) o P(B|A)
        const tabla = '<table class="mdx-tab"><thead><tr><th></th><th>' + c.B + '</th><th>' + c.nB + '</th><th>Total</th></tr></thead><tbody>'
          + '<tr><th>' + c.A + '</th><td>' + nAB + '</td><td>' + nAb + '</td><td>' + nA + '</td></tr>'
          + '<tr><th>' + c.nA + '</th><td>' + naB + '</td><td>' + nab + '</td><td>' + (T0 - nA) + '</td></tr>'
          + '<tr><th>Total</th><td>' + nB + '</td><td>' + (T0 - nB) + '</td><td>' + T0 + '</td></tr></tbody></table>';
        const pA = nA / T0, pB = nB / T0, pAB = nAB / T0;
        const cond = askA ? { lab: 'P(A\\mid B)', n: nAB, d: nB } : { lab: 'P(B\\mid A)', n: nAB, d: nA };
        const pc = (x) => dn(x);
        return {
          enunciado: c.t.replace('{T}', T0) + tabla + 'Se elige una ' + c.suj + ' al azar. Sean ' + i$('A') + ' el suceso «' + c.A + '» y ' + i$('B') + ' el suceso «' + c.B + '».',
          partes: [
            part('Calcula ' + i$('P(A\\cap B)') + ' y ' + i$('P(A)') + '. <small>(Decimales.)</small>', 0.5, { kind: 'matrix', value: [[F(nAB, T0), F(nA, T0)]], colLabels: ['P(A\\cap B)', 'P(A)'] },
              [d$('P(A\\cap B)=\\dfrac{' + nAB + '}{' + T0 + '}=' + pc(pAB) + '\\qquad P(A)=\\dfrac{' + nA + '}{' + T0 + '}=' + pc(pA))]),
            part('Calcula ' + i$(cond.lab) + '. <small>(Fracción o decimal con 4 cifras.)</small>', 0.75, { kind: 'expr', label: cond.lab + '=', value: cond.n / cond.d, show: fstr(F(cond.n, cond.d)) },
              [d$(cond.lab + '=\\dfrac{P(A\\cap B)}{P(' + (askA ? 'B' : 'A') + ')}=\\dfrac{' + nAB + '}{' + cond.d + '}\\approx' + c4(cond.n / cond.d)), 'También se puede leer en la tabla: casos favorables entre casos posibles de la condición.']),
            part('¿Son ' + i$('A') + ' y ' + i$('B') + ' independientes?', 0.75, { kind: 'choice', options: ['Sí, son independientes', 'No son independientes'], value: indep ? '0' : '1' },
              ['Son independientes si ' + i$('P(A\\cap B)=P(A)\\,P(B)') + '.', d$('P(A)\\,P(B)=' + pc(pA) + '\\cdot' + pc(pB) + '=' + pc(pA * pB) + (indep ? '=' : '\\neq') + pc(pAB) + '=P(A\\cap B)'),
                indep ? 'Se cumple la igualdad: <b>son independientes</b>.' : 'No coinciden: <b>no son independientes</b>.']),
          ],
          data: { T0, nAB, nAb, naB, nab, askA, indep },
        };
      }
    },
  });

  /* ===================== Binomial ===================== */
  const comb = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
  const pmf = (n, p, k) => comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  const CTX_BIN = [
    (n, p) => 'Un jugador de baloncesto acierta cada tiro libre con probabilidad ' + dp(p) + ', con independencia de los demás. Lanza ' + n + ' tiros libres. Sea ' + 'X' + ' el número de aciertos.',
    (n, p) => 'Un test de ' + n + ' preguntas se responde al azar y cada respuesta es correcta con probabilidad ' + dp(p) + '. Sea X el número de respuestas correctas.',
    (n, p) => 'Un lote de ' + n + ' piezas se revisa y cada pieza es defectuosa con probabilidad ' + dp(p) + ', de forma independiente. Sea X el número de piezas defectuosas.',
  ];
  X.implementar({
    id: 'binomial',
    generate() {
      for (;;) {
        const n = rnd.int(5, 10), p = rnd.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8]), q = 1 - p;
        const k = rnd.int(1, n - 1), k2 = rnd.int(1, n - 1), op = rnd.pick(['ge', 'le']);
        if (k === k2) continue;
        const pk = pmf(n, p, k), P2 = op === 'ge' ? 1 - Array.from({ length: k2 }, (_, i) => pmf(n, p, i)).reduce((s, x) => s + x, 0) : Array.from({ length: k2 + 1 }, (_, i) => pmf(n, p, i)).reduce((s, x) => s + x, 0);
        if (pk < 0.03 || P2 < 0.05 || P2 > 0.97) continue;
        const mu = n * p, sd = Math.sqrt(n * p * q);
        const idx = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
        const directo = op === 'ge' ? idx(k2, n) : idx(0, k2), compl = op === 'ge' ? idx(0, k2 - 1) : idx(k2 + 1, n);
        const sumTxt = (ks) => ks.map((i) => c4(pmf(n, p, i))).join('+');
        const short = directo.length <= compl.length + 1 ? sumTxt(directo) : '1-' + (compl.length === 1 ? 'P(X=' + compl[0] + ')=1-' + sumTxt(compl) : '(' + sumTxt(compl) + ')');
        return {
          enunciado: CTX_BIN[rnd.int(0, 2)](n, p).replace(/\bX\b/, '$X$') + ' Entonces ' + i$('X\\sim B(' + n + ',' + dn(p) + ')') + '.',
          partes: [
            part('Calcula ' + i$('P(X=' + k + ')') + '. <small>(4 decimales.)</small>', 0.75, { kind: 'expr', label: 'P(X=' + k + ')=', value: pk },
              [d$('P(X=' + k + ')=\\binom{' + n + '}{' + k + '}\\,' + dn(p) + '^{' + k + '}\\,' + dn(q) + '^{' + (n - k) + '}=' + comb(n, k) + '\\cdot' + dn(p) + '^{' + k + '}\\cdot' + dn(q) + '^{' + (n - k) + '}\\approx' + c4(pk))]),
            part('Calcula ' + i$('P(X' + (op === 'ge' ? '\\ge' : '\\le') + k2 + ')') + '. <small>(4 decimales.)</small>', 0.75, { kind: 'expr', label: 'P=', value: P2 },
              [d$('P(X' + (op === 'ge' ? '\\ge' : '\\le') + k2 + ')=' + short + '\\approx' + c4(P2)), 'Cada término es ' + i$('P(X=i)=\\binom{' + n + '}{i}\\,' + dn(p) + '^{i}\\,' + dn(q) + '^{' + n + '-i}') + '.']),
            part('Calcula la media y la desviación típica de ' + i$('X') + '. <small>(La desviación, con 4 decimales.)</small>', 0.5, { kind: 'multi', parts: [{ kind: 'expr', label: '\\mu=', value: mu }, { kind: 'expr', label: '\\sigma=', value: sd }] },
              [d$('\\mu=np=' + n + '\\cdot' + dn(p) + '=' + dn(mu) + '\\qquad \\sigma=\\sqrt{npq}=\\sqrt{' + n + '\\cdot' + dn(p) + '\\cdot' + dn(q) + '}=\\sqrt{' + dn(round(n * p * q, 4)) + '}\\approx' + c4(sd))]),
          ],
          data: { n, p, k, k2, op },
        };
      }
    },
  });

  /* ===================== Binomial → normal ===================== */
  const BN = [];
  [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9].forEach((p) => { for (let n = 40; n <= 600; n++) {
    const v = n * p * (1 - p), s = Math.sqrt(v);
    if (n * p >= 5 && n * (1 - p) >= 5 && Math.abs(s * 10 - Math.round(s * 10)) < 1e-9 && Math.abs(n * p * 100 - Math.round(n * p * 100)) < 1e-9) BN.push([n, p]);
  } });
  X.implementar({
    id: 'binom-normal',
    generate() {
      for (;;) {
        const [n, p] = rnd.pick(BN), q = 1 - p, mu = n * p, s = Math.sqrt(n * p * q);
        const op = rnd.pick(['le', 'ge']), kA = Math.round(mu + zk(-40, 40) * s);
        const k2lo = Math.round(mu + zk(-40, 40) * s), k2 = Math.max(1, k2lo);
        const zA = r2((kA + 0.5 - mu) / s), zB = r2((k2 - 0.5 - mu) / s);
        const f100 = (v) => Math.abs(v * 100 - Math.round(v * 100) - 0.5) < 0.05 || Math.abs(v * 100 - Math.round(v * 100) + 0.5) < 0.05;
        if (f100((kA + 0.5 - mu) / s) || f100((k2 - 0.5 - mu) / s)) continue;
        if (Math.abs(zA) > 2.6 || Math.abs(zB) > 2.6 || Math.abs(zA) < 0.1 || Math.abs(zB) < 0.1 || kA === k2) continue;
        const pA = T(zA), pB = r4(1 - T(zB));
        if (pA < 0.03 || pA > 0.97 || pB < 0.03 || pB > 0.97) continue;
        return {
          enunciado: 'Una variable ' + i$('X') + ' sigue una distribución binomial ' + i$('B(' + n + ',' + dn(p) + ')') + '. Como ' + i$('np=' + dn(mu) + '\\ge5') + ' y ' + i$('nq=' + dn(n * q) + '\\ge5') + ', se puede aproximar por una normal.',
          partes: [
            part('Indica la distribución normal ' + i$('N(\\mu,\\sigma)') + ' que aproxima a ' + i$('X') + '.', 0.5, { kind: 'multi', parts: [{ kind: 'expr', label: '\\mu=', value: mu }, { kind: 'expr', label: '\\sigma=', value: s }] },
              [d$('\\mu=np=' + n + '\\cdot' + dn(p) + '=' + dn(mu) + '\\qquad \\sigma=\\sqrt{npq}=\\sqrt{' + n + '\\cdot' + dn(p) + '\\cdot' + dn(q) + '}=\\sqrt{' + dn(round(n * p * q, 4)) + '}=' + dn(s)), 'Aproximación: ' + i$('X\\approx Y\\sim N(' + dn(mu) + ',' + dn(s) + ')') + '.']),
            part('Calcula, con la aproximación normal y la corrección de continuidad, ' + i$('P(X\\le' + kA + ')') + '. <small>(4 decimales; ' + i$('z') + ' a centésimas.)</small>', 0.75, { kind: 'expr', label: 'P=', value: pA },
              ['Corrección de continuidad: ' + i$('P(X\\le' + kA + ')\\approx P(Y\\le' + dn(kA + 0.5) + ')') + '.', d$('z=\\dfrac{' + dn(kA + 0.5) + '-' + dn(mu) + '}{' + dn(s) + '}=' + c2(zA) + '\\ \\Rightarrow\\ P(Z\\le' + c2(zA) + ')=' + lectura('lt', zA))]),
            part('Calcula, del mismo modo, ' + i$('P(X\\ge' + k2 + ')') + '. <small>(4 decimales; ' + i$('z') + ' a centésimas.)</small>', 0.75, { kind: 'expr', label: 'P=', value: pB },
              ['Corrección de continuidad: ' + i$('P(X\\ge' + k2 + ')\\approx P(Y\\ge' + dn(k2 - 0.5) + ')') + '.', d$('z=\\dfrac{' + dn(k2 - 0.5) + '-' + dn(mu) + '}{' + dn(s) + '}=' + c2(zB) + '\\ \\Rightarrow\\ P(Z\\ge' + c2(zB) + ')=' + lectura('gt', zB))]),
          ],
          data: { n, p, kA, k2, zA, zB, mu, s },
        };
      }
    },
  });

  /* ===================== Distribución normal ===================== */
  const CTX_N = [
    { intro: (mu, sd) => 'El tiempo, en minutos, que tarda un repartidor en entregar un pedido sigue una distribución normal de media ' + mu + ' y desviación típica ' + sd + '.', sing: 'un pedido', v: 'tarde', vp: 'tarden', pl: 'pedidos', u: 'minutos', mu: [20, 25, 30, 35, 40], sd: [3, 4, 5, 6, 8] },
    { intro: (mu, sd) => 'El peso, en gramos, de los paquetes de arroz que envasa una máquina sigue una distribución normal de media ' + mu + ' y desviación típica ' + sd + '.', sing: 'un paquete', v: 'pese', vp: 'pesen', pl: 'paquetes', u: 'gramos', mu: [500, 750, 1000], sd: [4, 5, 8, 10] },
    { intro: (mu, sd) => 'La duración, en horas, de la batería de un modelo de móvil sigue una distribución normal de media ' + mu + ' y desviación típica ' + sd + '.', sing: 'una batería', v: 'dure', vp: 'duren', pl: 'baterías', u: 'horas', mu: [20, 24, 30, 36], sd: [2, 3, 4] },
    { intro: (mu, sd) => 'La altura, en centímetros, de los estudiantes de un centro sigue una distribución normal de media ' + mu + ' y desviación típica ' + sd + '.', sing: 'un estudiante', v: 'mida', vp: 'midan', pl: 'estudiantes', u: 'centímetros', mu: [165, 168, 170, 172], sd: [5, 6, 7, 8] },
    { intro: (mu, sd) => 'La puntuación en una prueba de aptitud sigue una distribución normal de media ' + mu + ' puntos y desviación típica ' + sd + ' puntos.', sing: 'un candidato', v: 'obtenga', vp: 'obtengan', pl: 'candidatos', u: 'puntos', mu: [60, 65, 70, 75], sd: [8, 10, 12] },
  ];
  const OPT = { lt: 'menos de', gt: 'más de' };
  const val = (mu, z, sd) => round(mu + z * sd, 2);

  X.implementar({
    id: 'normal-prob',
    generate() {
      for (;;) {
        const c = rnd.pick(CTX_N), mu = rnd.pick(c.mu), sd = rnd.pick(c.sd);
        const zA = zk(-48, 48), zB = zk(-48, 48), zC = zk(-48, 48);
        const opA = rnd.pick(['lt', 'gt']), opC = rnd.pick(['lt', 'gt']);
        let z1 = Math.min(zA, zB), z2 = Math.max(zA, zB);
        if (z2 - z1 < 0.4) continue;
        const a = val(mu, zA, sd), b1 = val(mu, z1, sd), b2 = val(mu, z2, sd);
        const pA = pZ(opA, zA), pB = r4(T(z2) - T(z1)), pC = pZ(opC, zC);
        if ([pA, pB, pC].some((x) => x < 0.03 || x > 0.97) || Math.abs(zC) < 0.3 || Math.abs(zA) < 0.2) continue;
        const sA = ['Tipificamos ' + i$('Z=\\dfrac{X-\\mu}{\\sigma}\\sim N(0,1)') + ': ' + d$('P(X' + sg(opA) + dn(a) + ')=P\\left(Z' + sg(opA) + '\\dfrac{' + dn(a) + '-' + dn(mu) + '}{' + dn(sd) + '}\\right)=P(Z' + sg(opA) + c2(zA) + ')=' + lectura(opA, zA))];
        const sB = [d$('P(' + dn(b1) + '<X<' + dn(b2) + ')=P(' + c2(z1) + '<Z<' + c2(z2) + ')=\\Phi(' + c2(z2) + ')-\\Phi(' + c2(z1) + ')'),
          d$('\\Phi(' + c2(z2) + ')=' + c4(T(z2)) + '\\qquad \\Phi(' + c2(z1) + ')=' + c4(T(z1))), d$('P=' + c4(T(z2)) + '-' + c4(T(z1)) + '=' + c4(pB))];
        const pk = pC;
        const kopt = val(mu, zC, sd);
        const sC = [d$('P(X' + sg(opC) + 'k)=' + c4(pk) + '\\ \\Rightarrow\\ P\\left(Z' + sg(opC) + '\\dfrac{k-' + dn(mu) + '}{' + dn(sd) + '}\\right)=' + c4(pk)), inversa(opC, zC, pk),
          d$('k=\\mu+z\\sigma=' + dn(mu) + '+(' + c2(zC) + ')\\cdot' + dn(sd) + '=' + dn(kopt))];
        return {
          enunciado: c.intro(dp(mu), dp(sd)),
          partes: [
            part('Calcula la probabilidad de que ' + c.sing + ' ' + c.v + ' ' + OPT[opA] + ' ' + dp(a) + ' ' + c.u + '. <small>(4 decimales.)</small>', 0.5, { kind: 'expr', label: 'P=', value: pA }, sA),
            part('Calcula la probabilidad de que ' + c.sing + ' ' + c.v + ' entre ' + dp(b1) + ' y ' + dp(b2) + ' ' + c.u + '.', 0.75, { kind: 'expr', label: 'P=', value: pB }, sB),
            part('Halla el valor ' + i$('k') + ' tal que ' + i$('P(X' + sg(opC) + 'k)=' + c4(pk)) + '. <small>(Con la tabla al revés; resultado con 2 decimales como máximo.)</small>', 0.75, { kind: 'expr', label: 'k=', value: kopt }, sC),
          ],
          data: { mu, sd, a, b1, b2, opA, opC, pk, kopt, zA, z1, z2, zC },
        };
      }
    },
  });

  X.implementar({
    id: 'normal-param',
    generate() {
      for (;;) {
        const c = rnd.pick(CTX_N), variante = rnd.pick(['mu', 'sigma']);
        const mu = rnd.pick(c.mu), sd = rnd.pick(c.sd);
        const z1 = zk(-48, 48), z2 = zk(-48, 48), op1 = rnd.pick(['lt', 'gt']), op2 = rnd.pick(['lt', 'gt']);
        if (Math.abs(z1) < 0.3 || Math.abs(z2) < 0.2 || Math.abs(z1 - z2) < 0.2) continue;
        const a = val(mu, z1, sd), b = val(mu, z2, sd);
        const p1 = pZ(op1, z1), p2 = pZ(op2, z2);
        if (p1 < 0.03 || p1 > 0.97 || p2 < 0.03 || p2 > 0.97) continue;
        let aTxt, aAns, sA, intro;
        if (variante === 'mu') {
          intro = c.intro('desconocida μ', dp(sd));
          aTxt = 'Si ' + i$('P(X' + sg(op1) + dn(a) + ')=' + c4(p1)) + ', halla la media ' + i$('\\mu') + '.';
          aAns = { kind: 'expr', label: '\\mu=', value: mu };
          sA = [d$('P(X' + sg(op1) + dn(a) + ')=P\\left(Z' + sg(op1) + '\\dfrac{' + dn(a) + '-\\mu}{' + dn(sd) + '}\\right)=' + c4(p1)), inversa(op1, z1, p1),
            d$('\\dfrac{' + dn(a) + '-\\mu}{' + dn(sd) + '}=' + c2(z1) + '\\ \\Rightarrow\\ \\mu=' + dn(a) + '-(' + c2(z1) + ')\\cdot' + dn(sd) + '=' + dn(mu))];
        } else {
          intro = c.intro(dp(mu), 'desconocida σ');
          aTxt = 'Si ' + i$('P(X' + sg(op1) + dn(a) + ')=' + c4(p1)) + ', halla la desviación típica ' + i$('\\sigma') + '.';
          aAns = { kind: 'expr', label: '\\sigma=', value: sd };
          sA = [d$('P(X' + sg(op1) + dn(a) + ')=P\\left(Z' + sg(op1) + '\\dfrac{' + dn(a) + '-' + dn(mu) + '}{\\sigma}\\right)=' + c4(p1)), inversa(op1, z1, p1),
            d$('\\dfrac{' + dn(a) + '-' + dn(mu) + '}{\\sigma}=' + c2(z1) + '\\ \\Rightarrow\\ \\sigma=\\dfrac{' + dn(round(a - mu, 2)) + '}{' + c2(z1) + '}=' + dn(sd))];
        }
        return {
          enunciado: intro,
          partes: [
            part(aTxt, 1, aAns, sA),
            part('Con la distribución obtenida, calcula ' + i$('P(X' + sg(op2) + dn(b) + ')') + '. <small>(4 decimales.)</small>', 1, { kind: 'expr', label: 'P=', value: p2 },
              ['Con ' + i$('\\mu=' + dn(mu) + ',\\ \\sigma=' + dn(sd)) + ': ' + d$('P(X' + sg(op2) + dn(b) + ')=P\\left(Z' + sg(op2) + '\\dfrac{' + dn(b) + '-' + dn(mu) + '}{' + dn(sd) + '}\\right)=P(Z' + sg(op2) + c2(z2) + ')=' + lectura(op2, z2))]),
          ],
          data: { variante, mu, sd, a, p1, op1, b, op2, p2, z1, z2 },
        };
      }
    },
  });

  /* ===================== Inferencia ===================== */
  const NIV = { 90: { z: 1.645, alt: [1.64, 1.65] }, 95: { z: 1.96, alt: [] }, 99: { z: 2.575, alt: [2.57, 2.58] } };
  const zTxt = (z) => String(z).replace('.', '{,}');
  const N_OK = [36, 49, 64, 81, 100, 121, 144, 196, 225, 400];
  const ICTX = [
    { s: 'El gasto mensual en alimentación (en euros) de los hogares de una ciudad', u: '€', mean: [250, 650], se: [3, 4, 5, 6, 8, 10] },
    { s: 'El tiempo diario (en minutos) que los adolescentes dedican a las redes sociales', u: 'minutos', mean: [60, 240], se: [2, 3, 4, 5] },
    { s: 'La duración (en horas) de las baterías de un modelo de móvil', u: 'horas', mean: [8, 16], se: [0.5, 1] },
  ];
  const zPart = (nivel) => ({ kind: 'expr', label: 'z_{\\alpha/2}=', value: NIV[nivel].z, alt: NIV[nivel].alt });
  const zStep = (nivel) => {
    const al = (100 - nivel) / 100;
    const s = ['Nivel ' + i$(nivel + '\\,\\%') + ': ' + i$('\\alpha=' + dn(al) + ',\\ 1-\\frac{\\alpha}{2}=' + dn(1 - al / 2)) + '.'];
    if (nivel === 95) s.push('En la tabla: ' + i$('\\Phi(1{,}96)=0{,}9750') + ', luego ' + i$('z_{\\alpha/2}=1{,}96') + '.');
    else if (nivel === 90) s.push('El ' + i$('0{,}95') + ' queda entre ' + i$('\\Phi(1{,}64)=0{,}9495') + ' y ' + i$('\\Phi(1{,}65)=0{,}9505') + ': ' + i$('z_{\\alpha/2}=1{,}645') + ' (valen también $1{,}64$ y $1{,}65$).');
    else s.push('El ' + i$('0{,}995') + ' queda entre ' + i$('\\Phi(2{,}57)=0{,}9949') + ' y ' + i$('\\Phi(2{,}58)=0{,}9951') + ': ' + i$('z_{\\alpha/2}=2{,}575') + ' (valen también $2{,}57$ y $2{,}58$).');
    return s;
  };
  const NIVEL_TXT = (nivel) => 'del ' + nivel + ' %';
  const mapAlt = (f, nivel) => NIV[nivel].alt.map(f);

  X.implementar({
    id: 'ic-media',
    generate() {
      const cx = rnd.pick(ICTX), n = rnd.pick(N_OK), r = Math.sqrt(n), nivel = rnd.pick([90, 95, 95, 99]);
      const se = rnd.pick(cx.se), sd = round(se * r, 2), xb = round(cx.mean[0] + rnd.int(0, Math.round((cx.mean[1] - cx.mean[0]) * 5)) / 5, 1);
      const nv = NIV[nivel], E = (z) => z * se, lo = (z) => xb - E(z), hi = (z) => xb + E(z);
      return {
        enunciado: cx.s + ' sigue una distribución normal con desviación típica $\\sigma=' + dn(sd) + '$ ' + cx.u + '. Con una muestra aleatoria de $n=' + n + '$ se obtiene una media muestral $\\overline{x}=' + dn(xb) + '$ ' + cx.u + '. Se estima la media poblacional con un intervalo de confianza ' + NIVEL_TXT(nivel) + '.',
        partes: [
          part('Halla el valor crítico ' + i$('z_{\\alpha/2}') + ' con la tabla.', 0.5, zPart(nivel), zStep(nivel)),
          part('Calcula el error máximo ' + i$('E') + ' de la estimación. <small>(Hasta 3 decimales.)</small>', 0.5, { kind: 'expr', label: 'E=', value: E(nv.z), alt: mapAlt(E, nivel) },
            [d$('E=z_{\\alpha/2}\\dfrac{\\sigma}{\\sqrt n}=' + zTxt(nv.z) + '\\cdot\\dfrac{' + dn(sd) + '}{\\sqrt{' + n + '}}=' + zTxt(nv.z) + '\\cdot' + dn(se) + '=' + fmtN(E(nv.z), 3))]),
          part('Escribe el intervalo de confianza. <small>(Extremos con 2 decimales.)</small>', 1, { kind: 'multi', parts: [{ kind: 'expr', label: 'a=', value: lo(nv.z), alt: mapAlt(lo, nivel) }, { kind: 'expr', label: 'b=', value: hi(nv.z), alt: mapAlt(hi, nivel) }] },
            [d$('\\left(\\overline{x}-E,\\ \\overline{x}+E\\right)=\\left(' + dn(xb) + '-' + fmtN(E(nv.z), 3) + ',\\ ' + dn(xb) + '+' + fmtN(E(nv.z), 3) + '\\right)=(' + fmtN(lo(nv.z), 2) + ';\\ ' + fmtN(hi(nv.z), 2) + ')'),
              'Con una confianza ' + NIVEL_TXT(nivel) + ', la media de la población está entre ' + i$(fmtN(lo(nv.z), 2)) + ' y ' + i$(fmtN(hi(nv.z), 2)) + ' ' + cx.u + '.']),
        ],
        data: { nivel, n, sd, se, xb, z: nv.z, alt: nv.alt },
      };
    },
  });

  const PCTX = [
    (n, k) => 'En una encuesta a ' + n + ' personas elegidas al azar, ' + k + ' dicen que usan el transporte público a diario.',
    (n, k) => 'De ' + n + ' clientes de una tienda online elegidos al azar, ' + k + ' repetirían la compra.',
    (n, k) => 'En una muestra aleatoria de ' + n + ' piezas de una fábrica, ' + k + ' resultan defectuosas.',
  ];
  X.implementar({
    id: 'ic-prop',
    generate() {
      let n, ph, k;
      do { n = rnd.pick([100, 200, 250, 400, 500, 800, 1000]); ph = rnd.int(10, 90) / 100; k = Math.round(ph * n); } while (Math.abs(k / n - ph) > 1e-12);
      const nivel = rnd.pick([90, 95, 95, 99]), nv = NIV[nivel];
      const sd = Math.sqrt(ph * (1 - ph) / n), E = (z) => z * sd, lo = (z) => ph - E(z), hi = (z) => ph + E(z);
      return {
        enunciado: rnd.pick(PCTX)(n, k) + ' Se estima la proporción en la población con un intervalo de confianza ' + NIVEL_TXT(nivel) + '.',
        partes: [
          part('Calcula la proporción muestral ' + i$('\\hat p') + '. <small>(Decimal.)</small>', 0.5, { kind: 'number', label: '\\hat p=', value: F(k, n) },
            [d$('\\hat p=\\dfrac{' + k + '}{' + n + '}=' + dn(ph))]),
          part('Halla ' + i$('z_{\\alpha/2}') + ' y calcula el error máximo ' + i$('E') + '. <small>(4 decimales; escribe aquí ' + i$('E') + '.)</small>', 0.5, { kind: 'expr', label: 'E=', value: E(nv.z), alt: mapAlt(E, nivel) },
            zStep(nivel).concat([d$('E=z_{\\alpha/2}\\sqrt{\\dfrac{\\hat p(1-\\hat p)}{n}}=' + zTxt(nv.z) + '\\sqrt{\\dfrac{' + dn(ph) + '\\cdot' + dn(1 - ph) + '}{' + n + '}}\\approx' + zTxt(nv.z) + '\\cdot' + c4(sd) + '\\approx' + c4(E(nv.z)))])),
          part('Escribe el intervalo de confianza. <small>(Extremos con 4 decimales.)</small>', 1, { kind: 'multi', parts: [{ kind: 'expr', label: 'a=', value: lo(nv.z), alt: mapAlt(lo, nivel) }, { kind: 'expr', label: 'b=', value: hi(nv.z), alt: mapAlt(hi, nivel) }] },
            [d$('(\\hat p-E,\\ \\hat p+E)=(' + dn(ph) + '-' + c4(E(nv.z)) + ',\\ ' + dn(ph) + '+' + c4(E(nv.z)) + ')=(' + c4(lo(nv.z)) + ';\\ ' + c4(hi(nv.z)) + ')'),
              'Con una confianza ' + NIVEL_TXT(nivel) + ', la proporción de la población está entre el ' + i$(fmtN(lo(nv.z) * 100, 2) + '\\,\\%') + ' y el ' + i$(fmtN(hi(nv.z) * 100, 2) + '\\,\\%') + '.']),
        ],
        data: { nivel, n, k, ph, z: nv.z, alt: nv.alt },
      };
    },
  });

  /* ---- a partir de un intervalo ---- */
  X.implementar({
    id: 'ic-inverso',
    generate() {
      for (;;) {
        const n = rnd.pick(N_OK), r = Math.sqrt(n), sd = rnd.pick([10, 12, 15, 20, 25, 30, 40, 50, 60, 70, 80]);
        const E = 1.96 * sd / r;
        if (Math.abs(E * 100 - Math.round(E * 100)) > 1e-9 || E < 1) continue;
        const xb = round(rnd.int(50, 900) + rnd.int(0, 19) / 20, 2);
        const lo = round(xb - E, 2), hi = round(xb + E, 2);
        const ncalc = Math.round(Math.pow(1.96 * sd / E, 2));
        return {
          enunciado: 'Para estimar la media ' + i$('\\mu') + ' de una variable normal con desviación típica ' + i$('\\sigma=' + sd) + ' se toma una muestra aleatoria y se obtiene el intervalo de confianza ' + i$('(' + dn(lo) + ';\\ ' + dn(hi) + ')') + ' al ' + i$('95\\,\\%') + '.',
          partes: [
            part('Calcula la media muestral ' + i$('\\overline{x}') + '.', 0.5, { kind: 'expr', label: '\\overline{x}=', value: xb },
              [d$('\\overline{x}=\\dfrac{' + dn(lo) + '+' + dn(hi) + '}{2}=' + dn(xb))]),
            part('Calcula el error máximo ' + i$('E') + ' del intervalo.', 0.5, { kind: 'expr', label: 'E=', value: E },
              [d$('E=\\dfrac{' + dn(hi) + '-' + dn(lo) + '}{2}=' + dn(round(E, 2)))]),
            part('¿De qué tamaño era la muestra? <small>(Entero.)</small>', 1, { kind: 'number', label: 'n=', value: F(ncalc) },
              [i$('z_{\\alpha/2}=1{,}96') + ' y ' + d$('E=z_{\\alpha/2}\\dfrac{\\sigma}{\\sqrt n}\\ \\Rightarrow\\ \\sqrt n=\\dfrac{1{,}96\\cdot' + sd + '}{' + dn(round(E, 2)) + '}=' + dn(r) + '\\ \\Rightarrow\\ n=' + ncalc)]),
          ],
          data: { n: ncalc, sd, lo, hi, xb, E },
        };
      }
    },
  });

  /* ---- tamaño mínimo de la muestra ---- */
  X.implementar({
    id: 'tamano',
    generate() {
      for (let t = 0; t < 2000; t++) {
        const lv = rnd.shuffle([90, 95, 99]), niv1 = lv[0], niv2 = lv[1];
        const tipo = rnd.pick(['media', 'prop']);
        let nfun, enun, fform, data;
        if (tipo === 'media') {
          const sd = rnd.int(5, 60), E = rnd.int(1, 10);
          nfun = (z) => Math.pow(z * sd / E, 2);
          enun = 'La desviación típica de una variable normal es ' + i$('\\sigma=' + sd) + '. Se quiere estimar su media con un error máximo de ' + E + ' unidades.';
          fform = (z) => d$('n\\ge\\left(\\dfrac{z_{\\alpha/2}\\,\\sigma}{E}\\right)^{2}=\\left(\\dfrac{' + zTxt(z) + '\\cdot' + sd + '}{' + E + '}\\right)^{2}=' + fmtN(nfun(z), 2));
          data = { tipo, sd, E };
        } else {
          const E = rnd.pick([0.01, 0.02, 0.03, 0.04, 0.05]), pp = rnd.pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.7]);
          nfun = (z) => z * z * pp * (1 - pp) / (E * E);
          enun = 'Se quiere estimar una proporción con un error máximo de ' + dp(E) + '. ' + (pp === 0.5 ? 'No hay información previa sobre su valor.' : 'Un estudio previo la sitúa en ' + dp(pp) + '.');
          fform = (z) => d$('n\\ge\\dfrac{z_{\\alpha/2}^{2}\\,p(1-p)}{E^{2}}=\\dfrac{' + zTxt(z) + '^{2}\\cdot' + dn(pp) + '\\cdot' + dn(1 - pp) + '}{' + dn(E) + '^{2}}=' + fmtN(nfun(z), 2));
          data = { tipo, E, pp };
        }
        const all = [niv1, niv2].map((nl) => [NIV[nl].z].concat(NIV[nl].alt).map(nfun));
        if (all.some((vs) => vs.some((v) => Math.abs(v - Math.round(v)) < 1e-6 || v < 30 || v > 20000))) continue;
        const ns = all.map((vs) => vs.map(Math.ceil));
        const nz = (nl) => NIV[nl];
        const part2 = (nl, idx, pts, intro) => part(intro, pts, { kind: 'expr', label: 'n\\ge', value: ns[idx][0], alt: ns[idx].slice(1), show: String(ns[idx][0]) },
          [zStep(nl)[1], fform(nz(nl).z), 'Se redondea al entero superior: ' + i$('n=' + ns[idx][0]) + '.'].concat(nz(nl).alt.length ? ['Con ' + nz(nl).alt.map((z) => i$('z=' + zTxt(z))).join(' o ') + ' salen ' + ns[idx].slice(1).map((v) => i$(v)).join(' y ') + ': también son válidos.'] : []));
        return {
          enunciado: enun,
          partes: [
            part('Halla ' + i$('z_{\\alpha/2}') + ' para un nivel de confianza del ' + niv1 + ' %.', 0.5, zPart(niv1), zStep(niv1)),
            part2(niv1, 0, 0.75, '¿Qué tamaño mínimo debe tener la muestra con una confianza del ' + niv1 + ' %?'),
            part2(niv2, 1, 0.75, 'Y si la confianza fuese del ' + niv2 + ' % (con el mismo error), ¿cuál sería el tamaño mínimo?'),
          ],
          data: Object.assign(data, { niv1, niv2, ns }),
        };
      }
      throw new Error('tamano: no se pudo generar');
    },
  });

  /* ---- distribución de la media muestral ---- */
  const MCTX = [
    (mu, sd) => 'El gasto mensual en ocio (en euros) de los jóvenes de una ciudad tiene media ' + mu + ' y desviación típica ' + sd + '.',
    (mu, sd) => 'El tiempo (en minutos) que tarda un reparto en llegar tiene media ' + mu + ' y desviación típica ' + sd + '.',
    (mu, sd) => 'El peso (en gramos) de los paquetes que llena una máquina tiene media ' + mu + ' y desviación típica ' + sd + '.',
  ];
  X.implementar({
    id: 'media-muestral',
    generate() {
      for (;;) {
        const n = rnd.pick([36, 49, 64, 100, 144, 225, 400]), se = rnd.pick([2, 3, 4, 5, 6, 10]), sd = se * Math.sqrt(n), mu = rnd.int(20, 300);
        const zc = zk(-48, 48), zA = zk(-48, 48), zB = zk(-48, 48);
        const z1 = Math.min(zA, zB), z2 = Math.max(zA, zB);
        if (z2 - z1 < 0.4 || Math.abs(zc) < 0.2) continue;
        const cc = val(mu, zc, se), a = val(mu, z1, se), b = val(mu, z2, se);
        const pc = T(zc), pab = r4(T(z2) - T(z1));
        if ([pc, pab].some((x) => x < 0.03 || x > 0.97)) continue;
        return {
          enunciado: rnd.pick(MCTX)(mu, sd) + ' Se toma una muestra aleatoria de ' + n + ' elementos y se considera su media ' + i$('\\overline{X}') + '.',
          partes: [
            part('Indica la desviación típica de la distribución de ' + i$('\\overline{X}') + ' (error típico).', 0.5, { kind: 'number', label: '\\sigma_{\\overline{X}}=', value: F(se) },
              [d$('\\overline{X}\\approx N\\!\\left(\\mu,\\dfrac{\\sigma}{\\sqrt n}\\right)=N\\!\\left(' + mu + ',\\dfrac{' + sd + '}{\\sqrt{' + n + '}}\\right)=N(' + mu + ',' + se + ')')]),
            part('Calcula ' + i$('P(\\overline{X}<' + dn(cc) + ')') + '. <small>(4 decimales.)</small>', 0.75, { kind: 'expr', label: 'P=', value: pc },
              [d$('P(\\overline{X}<' + dn(cc) + ')=P\\left(Z<\\dfrac{' + dn(cc) + '-' + mu + '}{' + se + '}\\right)=P(Z<' + c2(zc) + ')=' + lectura('lt', zc))]),
            part('Calcula ' + i$('P(' + dn(a) + '<\\overline{X}<' + dn(b) + ')') + '. <small>(4 decimales.)</small>', 0.75, { kind: 'expr', label: 'P=', value: pab },
              [d$('P(' + c2(z1) + '<Z<' + c2(z2) + ')=\\Phi(' + c2(z2) + ')-\\Phi(' + c2(z1) + ')=' + c4(T(z2)) + '-' + c4(T(z1)) + '=' + c4(pab))]),
          ],
          data: { n, se, sd, mu, cc, a, b, zc, z1, z2, pc, pab },
        };
      }
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
