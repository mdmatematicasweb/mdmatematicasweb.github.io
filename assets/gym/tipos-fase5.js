/* Generadores de ejercicios tipo PAU — fase 5 (probabilidad).
 * Tipos: prob-total-bayes, prob-tablas, normal-prob, normal-desconocido.
 */
(function (root) {
  'use strict';
  const X = root.MDExam;
  const G = root.MDGym;
  const { rnd, F, ftex, d$, i$, fstr } = G;
  const part = (texto, pts, answer, steps) => ({ texto, pts, answer, steps });

  /* ---------- formato de decimales (coma española) ---------- */
  const trim = (x, nd = 4) => String(parseFloat(x.toFixed(nd)));
  const dtex = (x, nd = 4) => trim(x, nd).replace('.', '{,}');   // dentro de LaTeX
  const dtxt = (x, nd = 4) => (typeof x === 'string' ? x : trim(x, nd).replace('.', ','));     // texto plano
  const fix = (x, nd = 4) => x.toFixed(nd).replace('.', ',');    // decimales fijos, texto plano
  const fixt = (x, nd = 4) => x.toFixed(nd).replace('.', '{,}'); // decimales fijos, LaTeX
  const pr = (n, den) => dtex(n / den);                          // probabilidad n/den en LaTeX
  const frac = (n, d) => fstr(F(n, d));
  const fracTex = (n, d) => ftex(F(n, d));

  /* ===================== prob-total-bayes ===================== */
  const PRIORS3 = [[50, 30, 20], [40, 40, 20], [60, 25, 15], [45, 35, 20], [50, 25, 25], [40, 35, 25], [55, 30, 15]];
  const CTX_TB = [
    { n: 3, L: ['A', 'B', 'C'], s: 'D', nomC: ['la fábrica A', 'la fábrica B', 'la fábrica C'], q: [1, 7],
      intro: (pr3, q3) => 'Una empresa recibe un componente electrónico de tres fábricas, A, B y C, que suministran el ' + pr3.join(' %, el ') + ' % del total, respectivamente. Los porcentajes de componentes defectuosos son ' + q3.join(' %, ') + ' %, respectivamente.',
      Eind: 'el componente elegido es defectuoso', E: 'sea defectuoso', nE: 'no sea defectuoso', nEind: 'el componente elegido no es defectuoso', Cv: (c) => ('proceda de ' + c).replace('de el ', 'del '), item: 'un componente' },
    { n: 3, L: ['M', 'T', 'N'], s: 'E', nomC: ['el turno de mañana', 'el turno de tarde', 'el turno de noche'], q: [1, 9],
      intro: (pr3, q3) => 'En una fábrica de embutidos hay tres turnos: mañana, tarde y noche, que elaboran el ' + pr3.join(' %, el ') + ' % de la producción, respectivamente. La proporción de paquetes con defecto de envasado es del ' + q3.join(' %, del ') + ' % en cada turno, respectivamente.',
      Eind: 'el paquete elegido tiene defecto', E: 'tenga defecto de envasado', nE: 'no tenga defecto de envasado', nEind: 'el paquete elegido no tiene defecto', Cv: (c) => 'se haya elaborado en ' + c, item: 'un paquete' },
    { n: 3, L: ['A', 'B', 'C'], s: 'M', nomC: ['el proveedor A', 'el proveedor B', 'el proveedor C'], q: [2, 12],
      intro: (pr3, q3) => 'Un supermercado compra fruta a tres proveedores, A, B y C, que le sirven el ' + pr3.join(' %, el ') + ' % de los lotes, respectivamente. Llegan en mal estado el ' + q3.join(' %, el ') + ' % de los lotes de cada proveedor, respectivamente.',
      Eind: 'el lote elegido llegó en mal estado', E: 'llegue en mal estado', nE: 'no llegue en mal estado', nEind: 'el lote elegido no llegó en mal estado', Cv: (c) => ('proceda de ' + c).replace('de el ', 'del '), item: 'un lote' },
    { n: 2, L: ['E', 'S'], s: '+', nomC: ['una persona enferma', 'una persona sana'], q: null,
      intro: (pr3, q3) => 'Una enfermedad afecta al ' + pr3[0] + ' % de una población. Se dispone de una prueba diagnóstica que da positivo en el ' + q3[0] + ' % de las personas enfermas y en el ' + q3[1] + ' % de las personas sanas. Se elige una persona al azar.',
      Eind: 'la prueba da positivo', E: 'dé positivo', nE: 'dé negativo', nEind: 'la prueba da negativo', Cv: (c) => 'sea ' + c.replace('una persona ', ''), item: 'la prueba' , diag: true },
    { n: 2, L: ['A', 'B'], s: 'S', nomC: ['el grupo A', 'el grupo B'], q: [10, 40],
      intro: (pr3, q3) => 'En un instituto, el ' + pr3[0] + ' % de los alumnos de 2.º de Bachillerato pertenece al grupo A y el resto al grupo B. Suspende Matemáticas el ' + q3[0] + ' % de los alumnos del grupo A y el ' + q3[1] + ' % de los del grupo B. Se elige un alumno al azar.',
      Eind: 'el alumno elegido suspende Matemáticas', E: 'suspenda Matemáticas', nE: 'apruebe Matemáticas', nEind: 'el alumno elegido aprueba Matemáticas', Cv: (c) => 'pertenezca a ' + c, item: 'un alumno' },
  ];

  X.implementar({
    id: 'prob-total-bayes',
    generate() {
      const c = rnd.pick(CTX_TB);
      let pri;
      if (c.n === 3) pri = rnd.shuffle(rnd.pick(PRIORS3));
      else if (c.diag) pri = [rnd.pick([1, 2, 4, 5, 8, 10]), 0];
      else pri = [rnd.pick([30, 35, 40, 45, 55, 60, 65, 70]), 0];
      if (c.n === 2) pri[1] = 100 - pri[0];
      let q;
      if (c.diag) q = [rnd.pick([90, 92, 95, 96, 98]), rnd.pick([2, 4, 5, 8, 10])];
      else { do q = c.L.map(() => rnd.int(c.q[0], c.q[1])); while (new Set(q).size < q.length); }
      const n = c.n, L = c.L, s = c.s;
      const k = rnd.int(0, n - 1);
      let j = rnd.int(0, n - 1);
      if (rnd.int(0, 1)) j = k;
      const Pt = pri.reduce((t, p, i) => t + p * q[i], 0); // en diezmilésimas
      const ev = 'P(' + s + ')';
      const bar = '\\overline{' + s + '}';
      const arbol = L.map((l, i) => i$('P(' + l + ')=' + pr(pri[i], 100) + ',\\ P(' + s + '|' + l + ')=' + pr(q[i], 100) + ',\\ P(' + bar + '|' + l + ')=' + pr(100 - q[i], 100))).join('<br>');
      const sum = L.map((l, i) => pr(pri[i], 100) + '\\cdot' + pr(q[i], 100)).join('+');
      const sum2 = pri.map((p, i) => dtex(p * q[i] / 10000)).join('+');
      const bayes = frac(pri[k] * q[k], Pt);
      const vb = pri[k] * q[k] / Pt;
      const partC = rnd.int(0, 1) === 0;
      const stepsA = ['Árbol de probabilidades (cada rama: ' + i$('P(\\text{causa})') + ' y ' + i$('P(' + s + '|\\text{causa})') + '):<br>' + arbol,
        'Teorema de la probabilidad total: ' + d$(ev + '=' + L.map((l) => 'P(' + l + ')P(' + s + '|' + l + ')').join('+') + '=' + sum + '=' + sum2 + '=' + pr(Pt, 10000))];
      const stepsB = ['Teorema de Bayes: ' + d$('P(' + L[k] + '|' + s + ')=\\dfrac{P(' + L[k] + ')P(' + s + '|' + L[k] + ')}{P(' + s + ')}=\\dfrac{' + pr(pri[k], 100) + '\\cdot' + pr(q[k], 100) + '}{' + pr(Pt, 10000) + '}=\\dfrac{' + pr(pri[k] * q[k], 10000) + '}{' + pr(Pt, 10000) + '}=' + fracTex(pri[k] * q[k], Pt) + '\\approx' + dtex(vb)), 'Es decir, ' + i$(fix(vb * 100, 2).replace(',', '{,}') + '\\,\\%') + '.'];
      let pC, stepsC, answerC, textoC;
      const jn = pri[j] * (100 - q[j]);
      if (partC) {
        textoC = 'Calcula la probabilidad de que ' + c.item + ' ' + c.nE + ' y ' + c.Cv(c.nomC[j]) + '.';
        answerC = { kind: 'number', label: 'P(' + bar + '\\cap ' + L[j] + ')=', value: F(jn, 10000) };
        stepsC = [d$('P(' + bar + '\\cap ' + L[j] + ')=P(' + L[j] + ')\\,P(' + bar + '|' + L[j] + ')=' + pr(pri[j], 100) + '\\cdot' + pr(100 - q[j], 100) + '=' + pr(jn, 10000))];
        pC = jn;
      } else {
        textoC = 'Si ' + c.nEind + ', ¿cuál es la probabilidad de que ' + c.Cv(c.nomC[j]) + '? <small>(fracción o decimal con 4 cifras)</small>';
        const den = 10000 - Pt;
        answerC = { kind: 'expr', label: 'P(' + L[j] + '|' + bar + ')=', value: jn / den, show: frac(jn, den) };
        stepsC = [d$('P(' + bar + ')=1-' + pr(Pt, 10000) + '=' + pr(den, 10000)), d$('P(' + L[j] + '|' + bar + ')=\\dfrac{P(' + L[j] + ')P(' + bar + '|' + L[j] + ')}{P(' + bar + ')}=\\dfrac{' + pr(jn, 10000) + '}{' + pr(den, 10000) + '}=' + fracTex(jn, den) + '\\approx' + dtex(jn / den))];
        pC = jn / den;
      }
      return {
        enunciado: c.intro(c.n === 3 ? pri : pri, q),
        partes: [
          part('Calcula la probabilidad de que ' + c.item + ' ' + c.E + '. <small>(escribe la fracción o el decimal exacto)</small>', 0.75, { kind: 'number', label: ev + '=', value: F(Pt, 10000) }, stepsA),
          part('Si ' + c.Eind + ', ¿cuál es la probabilidad de que ' + c.Cv(c.nomC[k]) + '? <small>(fracción o decimal con 4 cifras)</small>', 1, { kind: 'expr', label: 'P(' + L[k] + '|' + s + ')=', value: vb, show: bayes }, stepsB),
          part(textoC, 0.75, answerC, stepsC),
        ],
        data: { pri, q, k, j, partC, ctx: CTX_TB.indexOf(c), Pt, pC },
      };
    },
  });

  /* ===================== prob-tablas ===================== */
  const CTX_PT = [
    { t: 'En un instituto se elige un alumno al azar y se consideran los sucesos A: «practica algún deporte» y B: «estudia un idioma extranjero fuera del horario escolar».' },
    { t: 'Se elige al azar un cliente de una tienda y se consideran los sucesos A: «compra por internet» y B: «es socio con tarjeta de fidelidad».' },
    { t: 'Se elige al azar un habitante de una ciudad y se consideran los sucesos A: «usa el transporte público a diario» y B: «tiene coche propio».' },
    { t: 'Se elige al azar un trabajador de una empresa y se consideran los sucesos A: «trabaja en remoto algún día» y B: «tiene más de 40 años».' },
  ];
  X.implementar({
    id: 'prob-tablas',
    generate() {
      const c = rnd.pick(CTX_PT);
      let nAB, nAb, naB, nab;
      const indep = rnd.int(0, 9) < 3;
      if (indep) {
        const i = rnd.int(2, 8), j = rnd.int(2, 8);
        nAB = i * j; nAb = i * (10 - j); naB = (10 - i) * j; nab = (10 - i) * (10 - j);
      } else {
        for (;;) {
          nAB = rnd.int(5, 45); nAb = rnd.int(5, 45); naB = rnd.int(5, 45); nab = 100 - nAB - nAb - naB;
          if (nab >= 5 && nAB * 100 !== (nAB + nAb) * (nAB + naB)) break;
        }
      }
      const nA = nAB + nAb, nB = nAB + naB, nU = nAB + nAb + naB, nC = nab;
      const v = rnd.pick(['inter', 'union', 'compB']);
      const askA = rnd.int(0, 1) === 0; // pedir P(A|B) o P(B|A)
      const p = (n) => pr(n, 100);
      let datos, a1, stepsA, ansA;
      if (v === 'inter') {
        datos = ['P(A)=' + p(nA), 'P(B)=' + p(nB), 'P(A\\cap B)=' + p(nAB)];
        a1 = ['P(A\\cup B)', nU, [d$('P(A\\cup B)=P(A)+P(B)-P(A\\cap B)=' + p(nA) + '+' + p(nB) + '-' + p(nAB) + '=' + p(nU))]];
      } else if (v === 'union') {
        datos = ['P(A)=' + p(nA), 'P(B)=' + p(nB), 'P(A\\cup B)=' + p(nU)];
        a1 = ['P(A\\cap B)', nAB, [d$('P(A\\cap B)=P(A)+P(B)-P(A\\cup B)=' + p(nA) + '+' + p(nB) + '-' + p(nU) + '=' + p(nAB))]];
      } else {
        datos = ['P(A)=' + p(nA), 'P(A\\cap B)=' + p(nAB), 'P(\\overline{B})=' + p(100 - nB)];
        a1 = ['P(A\\cup B)', nU, [d$('P(B)=1-P(\\overline{B})=1-' + p(100 - nB) + '=' + p(nB)), d$('P(A\\cup B)=P(A)+P(B)-P(A\\cap B)=' + p(nA) + '+' + p(nB) + '-' + p(nAB) + '=' + p(nU))]];
      }
      const aStep = a1[2];
      const cond = askA
        ? { lab: 'P(A|B)', n: nAB, d: nB, tex: 'P(A|B)=\\dfrac{P(A\\cap B)}{P(B)}=\\dfrac{' + p(nAB) + '}{' + p(nB) + '}' }
        : { lab: 'P(B|A)', n: nAB, d: nA, tex: 'P(B|A)=\\dfrac{P(A\\cap B)}{P(A)}=\\dfrac{' + p(nAB) + '}{' + p(nA) + '}' };
      const prod = nA * nB; // en 1/10000
      return {
        enunciado: c.t + ' Se sabe que ' + i$(datos[0]) + ', ' + i$(datos[1]) + ' y ' + i$(datos[2]) + '.',
        partes: [
          part('Calcula ' + i$(a1[0]) + '.', 0.5, { kind: 'number', label: a1[0] + '=', value: F(a1[1], 100) }, aStep),
          part('Calcula ' + i$(cond.lab) + '. <small>(fracción o decimal con 4 cifras)</small>', 0.75, { kind: 'expr', label: cond.lab + '=', value: cond.n / cond.d, show: frac(cond.n, cond.d) },
            [d$(cond.tex + '=' + fracTex(cond.n, cond.d) + '\\approx' + dtex(cond.n / cond.d))]),
          part('Calcula ' + i$('P(\\overline{A}\\cap\\overline{B})') + '.', 0.5, { kind: 'number', label: 'P(\\overline{A}\\cap\\overline{B})=', value: F(nC, 100) },
            [d$('P(\\overline{A}\\cap\\overline{B})=P(\\overline{A\\cup B})=1-P(A\\cup B)=1-' + p(nU) + '=' + p(nC))]),
          part('¿Son ' + i$('A') + ' y ' + i$('B') + ' independientes?', 0.75, { kind: 'choice', options: ['Sí, son independientes', 'No son independientes'], value: indep ? 0 : 1 },
            ['Son independientes si ' + i$('P(A\\cap B)=P(A)\\,P(B)') + '.', d$('P(A)P(B)=' + p(nA) + '\\cdot' + p(nB) + '=' + pr(prod, 10000) + (prod === nAB * 100 ? '=' : '\\neq') + pr(nAB * 100, 10000) + '=P(A\\cap B)'),
              indep ? 'Se cumple la igualdad: <b>son independientes</b>.' : 'No coinciden: <b>no son independientes</b>.']),
        ],
        data: { v, nAB, nAb, naB, nab, askA, indep, datos: { nA, nB, nU }, ctx: CTX_PT.indexOf(c) },
      };
    },
  });

  /* ===================== distribución normal ===================== */
  function Phi(z) {
    const a = Math.abs(z);
    let term = a, sum = a;
    for (let n = 1; n < 400; n++) { term *= a * a / (2 * n + 1); sum += term; if (term < 1e-17) break; }
    const p = 0.5 + sum * Math.exp(-a * a / 2) / Math.sqrt(2 * Math.PI);
    return z < 0 ? 1 - p : p;
  }
  const r4 = (x) => Math.round(x * 1e4 + 1e-9) / 1e4;
  const r2 = (x) => Math.round(x * 100 + 1e-9) / 100;
  /** Φ(z) tal como en la tabla (4 decimales; z<0 por simetría). */
  const tabla = (z) => (z >= 0 ? r4(Phi(z)) : r4(1 - r4(Phi(-z))));
  const zOf = (x, mu, sg) => r2((x - mu) / sg);
  /** P(Z<z) (op 'lt') o P(Z>z) (op 'gt') con la tabla. */
  const pZ = (op, z) => (op === 'lt' ? tabla(z) : tabla(-z));
  const pZtex = (op, z) => {
    const za = Math.abs(z), pa = tabla(za), zt = fixt(z, 2), at = fixt(za, 2);
    if (op === 'lt') return z >= 0 ? '\\Phi(' + zt + ')=' + fixt(pa) : '1-\\Phi(' + at + ')=1-' + fixt(pa) + '=' + fixt(r4(1 - pa));
    return z >= 0 ? '1-\\Phi(' + zt + ')=1-' + fixt(pa) + '=' + fixt(r4(1 - pa)) : '\\Phi(' + at + ')=' + fixt(pa);
  };
  const PZ = (op, z) => 'P(Z' + (op === 'lt' ? '<' : '>') + fixt(z, 2) + ')';

  let TABLA_HTML = null;
  function tablaHTML() {
    if (TABLA_HTML) return TABLA_HTML;
    let h = '<details class="mdx-tabla"><summary>Tabla N(0,1)</summary>'
      + '<div><table><thead><tr><th>z</th>';
    for (let c = 0; c < 10; c++) h += '<th>0,0' + c + '</th>';
    h += '</tr></thead><tbody>';
    for (let r = 0; r < 31; r++) {
      h += '<tr><th>' + fix(r / 10, 1) + '</th>';
      for (let c = 0; c < 10; c++) h += '<td>' + fix(r4(Phi(r / 10 + c / 100))) + '</td>';
      h += '</tr>';
    }
    TABLA_HTML = h + '</tbody></table></div><small>Φ(z) = P(Z ≤ z) para z ≥ 0. Para z &lt; 0: Φ(−z) = 1 − Φ(z).</small></details>';
    return TABLA_HTML;
  }

  const CTX_N = [
    { intro: (mu, sg) => 'El tiempo, en minutos, que tarda un repartidor en entregar un pedido sigue una distribución normal de media ' + dtxt(mu) + ' y desviación típica ' + dtxt(sg) + '.', nom: 'el tiempo de entrega', u: 'minutos', sing: 'un pedido', v: 'tarde', vp: 'tarden', pl: 'pedidos', mu: [20, 25, 30, 35, 40, 45], sg: [3, 4, 5, 6, 8] },
    { intro: (mu, sg) => 'El peso, en gramos, de los paquetes de arroz que envasa una máquina sigue una distribución normal de media ' + dtxt(mu) + ' y desviación típica ' + dtxt(sg) + '.', nom: 'el peso', u: 'gramos', sing: 'un paquete', v: 'pese', vp: 'pesen', pl: 'paquetes', mu: [500, 750, 1000], sg: [4, 5, 8, 10] },
    { intro: (mu, sg) => 'La duración, en horas, de la batería de un modelo de teléfono móvil sigue una distribución normal de media ' + dtxt(mu) + ' y desviación típica ' + dtxt(sg) + '.', nom: 'la duración', u: 'horas', sing: 'una batería', v: 'dure', vp: 'duren', pl: 'baterías', mu: [20, 24, 30, 36], sg: [2, 3, 4] },
    { intro: (mu, sg) => 'La altura, en centímetros, de los estudiantes de un centro sigue una distribución normal de media ' + dtxt(mu) + ' y desviación típica ' + dtxt(sg) + '.', nom: 'la altura', u: 'centímetros', sing: 'un estudiante', v: 'mida', vp: 'midan', pl: 'estudiantes', mu: [165, 168, 170, 172], sg: [5, 6, 7, 8] },
    { intro: (mu, sg) => 'La puntuación obtenida en una prueba de aptitud sigue una distribución normal de media ' + dtxt(mu) + ' puntos y desviación típica ' + dtxt(sg) + ' puntos.', nom: 'la puntuación', u: 'puntos', sing: 'un candidato', v: 'obtenga', vp: 'obtengan', pl: 'candidatos', mu: [60, 65, 70, 75], sg: [8, 10, 12] },
  ];
  const OPT = { lt: 'menos de', gt: 'más de' };
  const nice = (x) => Math.round(x * 100) / 100;
  const numtxt = (x) => dtxt(x, 2);

  X.implementar({
    id: 'normal-prob',
    generate() {
      for (;;) {
        const c = rnd.pick(CTX_N);
        const mu = rnd.pick(c.mu), sg = rnd.pick(c.sg);
        const zr = (lo, hi) => rnd.int(lo, hi) / 10;
        const a = nice(mu + zr(-22, 22) * sg);
        const b = nice(a + rnd.int(8, 28) / 10 * sg);
        const cc = nice(mu + zr(-22, 22) * sg);
        const opA = rnd.pick(['lt', 'gt']), opC = rnd.pick(['lt', 'gt']);
        const n = rnd.pick([200, 500, 1000, 2000]);
        const za = zOf(a, mu, sg), zb = zOf(b, mu, sg), zc = zOf(cc, mu, sg);
        if ([za, zb, zc].some((z) => Math.abs(z) > 3 || z === 0) || za >= zb) continue;
        const pA = pZ(opA, za), pB = r4(tabla(zb) - tabla(za)), pC = pZ(opC, zc);
        if (pB < 0.03 || pB > 0.97 || pA < 0.02 || pA > 0.98 || pC < 0.02 || pC > 0.98) continue;
        const cnt = n * pC;
        if (Math.abs(cnt - Math.floor(cnt) - 0.5) < 1e-6) continue;
        const esp = Math.round(cnt);
        const sA = ['Tipificamos ' + i$('Z=\\dfrac{X-\\mu}{\\sigma}\\sim N(0,1)') + ' con ' + i$('\\mu=' + dtex(mu) + ',\\ \\sigma=' + dtex(sg)) + ': ' + d$('P(X' + (opA === 'lt' ? '<' : '>') + dtex(a, 2) + ')=P\\left(Z' + (opA === 'lt' ? '<' : '>') + '\\dfrac{' + dtex(a, 2) + '-' + dtex(mu) + '}{' + dtex(sg) + '}\\right)=' + PZ(opA, za) + '=' + pZtex(opA, za))];
        const sB = [d$('P(' + dtex(a, 2) + '<X<' + dtex(b, 2) + ')=P(' + fixt(za, 2) + '<Z<' + fixt(zb, 2) + ')=P(Z<' + fixt(zb, 2) + ')-P(Z<' + fixt(za, 2) + ')'),
          d$('P(Z<' + fixt(zb, 2) + ')=' + fixt(tabla(zb)) + '\\qquad P(Z<' + fixt(za, 2) + ')=' + fixt(tabla(za))), d$('P=' + fixt(tabla(zb)) + '-' + fixt(tabla(za)) + '=' + fixt(pB))];
        const sC = [d$('P(X' + (opC === 'lt' ? '<' : '>') + dtex(cc, 2) + ')=' + PZ(opC, zc) + '=' + pZtex(opC, zc)),
          'Número esperado: ' + d$(n + '\\cdot' + fixt(pC) + '=' + dtex(cnt, 3) + '\\approx ' + esp)];
        return {
          enunciado: c.intro(mu, sg) + tablaHTML(),
          partes: [
            part('Calcula la probabilidad de que ' + c.sing + ' ' + c.v + ' ' + OPT[opA] + ' ' + numtxt(a) + ' ' + c.u + '. <small>(usa la tabla; 4 decimales)</small>', 0.75, { kind: 'expr', label: 'P=', value: pA, show: fix(pA) }, sA),
            part('Calcula la probabilidad de que ' + c.sing + ' ' + c.v + ' entre ' + numtxt(a) + ' y ' + numtxt(b) + ' ' + c.u + '.', 1, { kind: 'expr', label: 'P=', value: pB, show: fix(pB) }, sB),
            part('En un conjunto de ' + n + ' ' + c.pl + ', ¿cuántos cabe esperar que ' + c.vp + ' ' + OPT[opC] + ' ' + numtxt(cc) + ' ' + c.u + '? <small>(redondea al entero más próximo)</small>', 0.75, { kind: 'expr', label: '\\text{n.º}=', value: esp, show: String(esp) }, sC),
          ],
          data: { mu, sigma: sg, a, b, c: cc, opA, opC, n, ctx: CTX_N.indexOf(c) },
        };
      }
    },
  });

  /* ---- normal-desconocido ---- */
  X.implementar({
    id: 'normal-desconocido',
    generate() {
      for (;;) {
        const c = rnd.pick(CTX_N);
        const variante = rnd.pick(['mu', 'sigma']);
        const mu = rnd.pick(c.mu), sg = rnd.pick(c.sg);
        const op1 = rnd.pick(['lt', 'gt']);
        const mag = () => rnd.int(30, 250) / 100;
        const z1 = (rnd.int(0, 1) ? 1 : -1) * mag();
        if (Math.abs(z1) < 0.3) continue;
        const a = nice(mu + z1 * sg);
        const p1 = pZ(op1, z1);
        const z2 = (rnd.int(0, 1) ? 1 : -1) * mag();
        const b = nice(mu + z2 * sg);
        const op2 = rnd.pick(['lt', 'gt']);
        const p2 = pZ(op2, z2);
        const opk = rnd.pick(['lt', 'gt']);
        const z3 = (rnd.int(0, 1) ? 1 : -1) * mag();
        const pk = pZ(opk, z3);
        const k = nice(mu + z3 * sg);
        if ([p1, p2, pk].some((p) => p < 0.02 || p > 0.98) || Math.abs(z3) < 0.3) continue;
        if (Math.abs(z3 - z1) < 1e-9) continue;
        const sgn = (op) => (op === 'lt' ? '<' : '>');
        // pasos de lectura inversa de la tabla
        const inv = (op, z, p) => {
          const za = Math.abs(z), q = (op === 'lt') === (z >= 0) ? p : r4(1 - p);
          const nota = q === p ? '' : ' (la probabilidad es ' + (p < 0.5 ? 'menor' : 'mayor') + ' que 0,5, así que ' + i$('z' + (z < 0 ? '<0' : '>0')) + ' y se usa la simetría: ' + i$('\\Phi(' + fixt(za, 2) + ')=1-' + fixt(p) + '=' + fixt(q)) + ')';
          return 'En la tabla buscamos ' + i$('\\Phi(' + fixt(za, 2) + ')=' + fixt(q)) + nota + ': ' + i$('|z|=' + fixt(za, 2)) + ', luego ' + i$('z=' + fixt(z, 2)) + '.';
        };
        let aTxt, aAns, sA;
        if (variante === 'mu') {
          aTxt = 'Sabiendo que la desviación típica es ' + numtxt(sg) + ' ' + c.u + ' y que ' + i$('P(X' + sgn(op1) + dtex(a, 2) + ')=' + fixt(p1)) + ', halla la media μ.';
          aAns = { kind: 'expr', label: '\\mu=', value: mu, show: dtxt(mu) };
          sA = [d$('P(X' + sgn(op1) + dtex(a, 2) + ')=P\\left(Z' + sgn(op1) + '\\dfrac{' + dtex(a, 2) + '-\\mu}{' + dtex(sg) + '}\\right)=' + fixt(p1)), inv(op1, z1, p1),
            d$('\\dfrac{' + dtex(a, 2) + '-\\mu}{' + dtex(sg) + '}=' + fixt(z1, 2) + '\\ \\Rightarrow\\ \\mu=' + dtex(a, 2) + '-(' + fixt(z1, 2) + ')\\cdot' + dtex(sg) + '=' + dtex(mu))];
        } else {
          aTxt = 'Sabiendo que la media es ' + numtxt(mu) + ' ' + c.u + ' y que ' + i$('P(X' + sgn(op1) + dtex(a, 2) + ')=' + fixt(p1)) + ', halla la desviación típica σ.';
          aAns = { kind: 'expr', label: '\\sigma=', value: sg, show: dtxt(sg) };
          sA = [d$('P(X' + sgn(op1) + dtex(a, 2) + ')=P\\left(Z' + sgn(op1) + '\\dfrac{' + dtex(a, 2) + '-' + dtex(mu) + '}{\\sigma}\\right)=' + fixt(p1)), inv(op1, z1, p1),
            d$('\\dfrac{' + dtex(a, 2) + '-' + dtex(mu) + '}{\\sigma}=' + fixt(z1, 2) + '\\ \\Rightarrow\\ \\sigma=\\dfrac{' + dtex(nice(a - mu), 2) + '}{' + fixt(z1, 2) + '}=' + dtex(sg))];
        }
        const sB = ['Con ' + i$('\\mu=' + dtex(mu) + ',\\ \\sigma=' + dtex(sg)) + ': ' + d$('P(X' + sgn(op2) + dtex(b, 2) + ')=P\\left(Z' + sgn(op2) + '\\dfrac{' + dtex(b, 2) + '-' + dtex(mu) + '}{' + dtex(sg) + '}\\right)=' + PZ(op2, z2) + '=' + pZtex(op2, z2))];
        const sC = [d$('P(X' + sgn(opk) + 'k)=' + fixt(pk) + '\\ \\Rightarrow\\ P\\left(Z' + sgn(opk) + '\\dfrac{k-' + dtex(mu) + '}{' + dtex(sg) + '}\\right)=' + fixt(pk)), inv(opk, z3, pk),
          d$('k=\\mu+z\\sigma=' + dtex(mu) + '+(' + fixt(z3, 2) + ')\\cdot' + dtex(sg) + '=' + dtex(k, 2))];
        return {
          enunciado: c.intro('μ', 'σ') + tablaHTML(),
          partes: [
            part(aTxt, 1, aAns, sA),
            part('Con la distribución obtenida, calcula ' + i$('P(X' + sgn(op2) + dtex(b, 2) + ')') + '. <small>(usa la tabla; 4 decimales)</small>', 0.75, { kind: 'expr', label: 'P=', value: p2, show: fix(p2) }, sB),
            part('Halla el valor ' + i$('k') + ' tal que ' + i$('P(X' + sgn(opk) + 'k)=' + fixt(pk)) + '. <small>(2 decimales)</small>', 0.75, { kind: 'expr', label: 'k=', value: k, show: dtxt(k, 2) }, sC),
          ],
          data: { variante, mu, sigma: sg, a, p1, op1, b, op2, p2, opk, pk, k, ctx: CTX_N.indexOf(c) },
        };
      }
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
