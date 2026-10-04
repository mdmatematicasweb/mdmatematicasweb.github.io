/* Generadores del simulacro CCSS — ejercicios 3 y 4 (estadística, 2 puntos cada uno, sin opciones).
 * Probabilidad: prob-total-bayes, prob-tablas, prob-sucesos.
 * Distribuciones e inferencia: binomial, normal-prob, normal-inversa, binomial-normal, media-muestral, ic-media, ic-proporcion.
 * La normal imita la tabla del examen de la Junta: z a dos decimales; 4 decimales hasta z = 2,6 y 5 desde z = 2,7.
 * Verificadores independientes: tests/examen-ccss.test.js.
 */
(function (root) {
  'use strict';
  const X = root.MDExamCCSS;
  const U = root.MDExamCCSSUtil;
  const { G, rnd, F, ftex, fstr, d$, i$, part, dtex, dtxt, fixt } = U;

  /* ---------- tabla N(0,1) ---------- */
  function Phi(z) {
    if (z < 0) return 1 - Phi(-z);
    if (z > 8) return 1;
    let term = z, sum = z;
    for (let n = 1; n < 400 && Math.abs(term) > 1e-18 * Math.abs(sum); n++) { term *= z * z / (2 * n + 1); sum += term; }
    return 0.5 + Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI) * sum;
  }
  const z2 = (z) => (z < 0 ? -1 : 1) * Math.round(Math.abs(z) * 100 + 1e-9) / 100;
  const rd = (x, nd) => Math.round(x * Math.pow(10, nd) + 1e-9) / Math.pow(10, nd);
  const tabla0 = (z) => rd(Phi(z), z >= 2.7 - 1e-9 ? 5 : 4);                  // z ≥ 0 con dos decimales
  /** P(Z ≤ z) con la tabla (z ya redondeado a dos decimales o se redondea). */
  const T = (z) => { const zr = z2(z); return zr >= 0 ? tabla0(zr) : rd(1 - tabla0(-zr), 5); };
  const zt = (z) => dtex(z2(z), 2);                                            // z en LaTeX con coma
  const pr4 = (p) => fixt(p, 4);
  const num = (f) => f.n / f.d;

  /* ===================== prob-total-bayes ===================== */
  const CTX_PTB = [
    { n: 3, L: ['A', 'B', 'C'], s: 'D', causas: ['la fábrica A', 'la fábrica B', 'la fábrica C'], sujeto: 'un componente',
      intro: (pr, q) => 'Una empresa recibe un componente electrónico de tres fábricas, A, B y C, que suministran el ' + pr.join(' %, el ') + ' % del total, respectivamente. Resultan defectuosos el ' + q.join(' %, el ') + ' % de los componentes de A, B y C, respectivamente. Se elige un componente al azar.',
      ev: 'sea defectuoso', nev: 'no sea defectuoso', evi: 'es defectuoso', cv: (c) => 'proceda de ' + c },
    { n: 3, L: ['M', 'T', 'N'], s: 'E', causas: ['el turno de mañana', 'el turno de tarde', 'el turno de noche'], sujeto: 'un paquete',
      intro: (pr, q) => 'En una fábrica de embutidos hay tres turnos: mañana, tarde y noche, que elaboran el ' + pr.join(' %, el ') + ' % de la producción, respectivamente. Tienen defecto de envasado el ' + q.join(' %, el ') + ' % de los paquetes de cada turno. Se elige un paquete al azar.',
      ev: 'tenga defecto de envasado', nev: 'no tenga defecto de envasado', evi: 'tiene defecto de envasado', cv: (c) => 'se haya elaborado en ' + c },
    { n: 2, L: ['E', 'S'], s: '+', causas: ['una persona enferma', 'una persona sana'], sujeto: 'una persona',
      intro: (pr, q) => 'Una enfermedad afecta al ' + pr[0] + ' % de una población. Una prueba diagnóstica da positivo en el ' + q[0] + ' % de las personas enfermas y, por error, en el ' + q[1] + ' % de las sanas. Se elige una persona al azar y se le hace la prueba.',
      ev: 'dé positivo', nev: 'dé negativo', evi: 'da positivo', cv: (c) => 'sea ' + c.replace('una persona ', '') },
  ];
  X.implementar({
    id: 'prob-total-bayes',
    generate() {
      const c = rnd.pick(CTX_PTB);
      let pri, q;
      if (c.n === 3) pri = rnd.shuffle(rnd.pick([[50, 30, 20], [40, 40, 20], [60, 30, 10], [50, 25, 25], [45, 35, 20], [55, 30, 15]]));
      else { const a = rnd.pick([1, 2, 4, 5, 8, 10]); pri = [a, 100 - a]; }
      if (c.n === 3) { do q = c.L.map(() => rnd.int(1, 12)); while (new Set(q).size < 3); }
      else q = [rnd.pick([90, 92, 95, 98]), rnd.pick([2, 4, 5, 8])];
      const s = c.s, bar = '\\overline{' + s + '}';
      const k = rnd.int(0, c.n - 1), j = rnd.int(0, c.n - 1);
      const Pt = pri.reduce((t, p, i) => t + p * q[i], 0);                        // en diezmilésimas
      const den = 10000 - Pt;
      const conj = pri[k] * q[k];
      const partC = rnd.int(0, 1) === 0;
      const jn = pri[j] * (100 - q[j]);
      const pa = c.L.map((l, i) => 'P(' + l + ')=' + dtex(pri[i] / 100) + ',\\ P(' + s + '|' + l + ')=' + dtex(q[i] / 100)).join(';\\quad ');
      const sum = c.L.map((l, i) => dtex(pri[i] / 100) + '\\cdot' + dtex(q[i] / 100)).join('+');
      const pc = partC
        ? part('Calcula la probabilidad de que ' + c.sujeto + ' ' + c.nev + ' y ' + c.cv(c.causas[j]) + '.', 0.75, { kind: 'number', label: 'P(' + bar + '\\cap ' + c.L[j] + ')=', value: F(jn, 10000) },
          [d$('P(' + bar + '\\cap ' + c.L[j] + ')=P(' + c.L[j] + ')\\,P(' + bar + '|' + c.L[j] + ')=' + dtex(pri[j] / 100) + '\\cdot' + dtex((100 - q[j]) / 100) + '=' + dtex(jn / 10000))])
        : part('Si ' + c.sujeto + ' ' + c.nev.replace('sea', 'es').replace('tenga', 'tiene').replace('dé', 'da') + ', ¿cuál es la probabilidad de que ' + c.cv(c.causas[j]) + '? <small>(fracción o decimal con 4 cifras)</small>', 0.75,
          { kind: 'expr', label: 'P(' + c.L[j] + '|' + bar + ')=', value: jn / den, show: fstr(F(jn, den)) },
          [d$('P(' + bar + ')=1-' + dtex(Pt / 10000) + '=' + dtex(den / 10000)), d$('P(' + c.L[j] + '|' + bar + ')=\\dfrac{P(' + c.L[j] + ')P(' + bar + '|' + c.L[j] + ')}{P(' + bar + ')}=\\dfrac{' + dtex(jn / 10000) + '}{' + dtex(den / 10000) + '}=' + fstr(F(jn, den)))]);
      return {
        enunciado: c.intro(pri, q),
        partes: [
          part('Calcula la probabilidad de que ' + c.sujeto + ' ' + c.ev + '.', 0.5, { kind: 'number', label: 'P(' + s + ')=', value: F(Pt, 10000) },
            [d$(pa), 'Probabilidad total: ' + d$('P(' + s + ')=' + sum + '=' + dtex(Pt / 10000))]),
          part('Si ' + c.sujeto + ' ' + c.evi + ', ¿cuál es la probabilidad de que ' + c.cv(c.causas[k]) + '? <small>(fracción o decimal con 4 cifras)</small>', 0.75,
            { kind: 'expr', label: 'P(' + c.L[k] + '|' + s + ')=', value: conj / Pt, show: fstr(F(conj, Pt)) },
            ['Teorema de Bayes: ' + d$('P(' + c.L[k] + '|' + s + ')=\\dfrac{P(' + c.L[k] + ')P(' + s + '|' + c.L[k] + ')}{P(' + s + ')}=\\dfrac{' + dtex(conj / 10000) + '}{' + dtex(Pt / 10000) + '}=' + fstr(F(conj, Pt)))]),
          pc,
        ],
        data: { n: c.n, pri, q, k, j, Pt, partC },
      };
    },
  });

  /* ===================== prob-tablas ===================== */
  X.implementar({
    id: 'prob-tablas',
    generate() {
      const N = rnd.pick([100, 200, 400]);
      let nAB, nAb, naB, nab;
      for (;;) {
        const pA = rnd.pick([30, 40, 50, 60, 70]), pB = rnd.pick([20, 25, 40, 50, 60, 75]);
        const indep = rnd.int(0, 2) === 0;
        const cAB = indep ? N * pA * pB / 10000 : rnd.int(Math.ceil(N * 0.08), Math.floor(N * 0.45));
        if (!Number.isInteger(cAB) || cAB < 1) continue;
        const cA = N * pA / 100, cB = N * pB / 100;
        if (!Number.isInteger(cA) || !Number.isInteger(cB)) continue;
        nAB = cAB; nAb = cA - cAB; naB = cB - cAB; nab = N - cA - cB + cAB;
        if ([nAB, nAb, naB, nab].some((x) => x < 1)) continue;
        break;
      }
      const cA = nAB + nAb, cB = nAB + naB;
      const ctx = rnd.pick([
        { suj: 'personas de una localidad', A: 'usa el transporte público', B: 'tiene bicicleta', ns: 'Se elige una persona al azar.' },
        { suj: 'estudiantes de un instituto', A: 'practica algún deporte', B: 'saca buenas notas', ns: 'Se elige un estudiante al azar.' },
        { suj: 'clientes de una tienda', A: 'compra por internet', B: 'usa tarjeta fidelidad', ns: 'Se elige un cliente al azar.' },
      ]);
      const cond = rnd.int(0, 1);                      // P(A|B) o P(B|A)
      const pedirCap = rnd.int(0, 1) === 0;
      const aCap = pedirCap ? nAB : cA + cB - nAB;     // P(A∩B) o P(A∪B) en casos
      const pAB = nAB / N, pA = cA / N, pB = cB / N, indepOk = nAB * N === cA * cB;
      const cb = cond ? F(nAB, cA) : F(nAB, cB);
      const tabla = '\\begin{array}{c|cc|c} & B & B^C & \\text{Total}\\\\ \\hline A & ' + nAB + ' & ' + nAb + ' & ' + cA + '\\\\ A^C & ' + naB + ' & ' + nab + ' & ' + (naB + nab) + '\\\\ \\hline \\text{Total} & ' + cB + ' & ' + (nAb + nab) + ' & ' + N + '\\end{array}';
      return {
        enunciado: 'En un grupo de ' + N + ' ' + ctx.suj + ' se observan dos características: ' + i$('A') + ' = «' + ctx.A + '» y ' + i$('B') + ' = «' + ctx.B + '». Los resultados son: ' + d$(tabla) + ctx.ns,
        partes: [
          part('Calcula ' + i$(pedirCap ? 'P(A\\cap B)' : 'P(A\\cup B)') + '.', 0.5, { kind: 'number', label: pedirCap ? 'P(A\\cap B)=' : 'P(A\\cup B)=', value: F(aCap, N) },
            [pedirCap ? d$('P(A\\cap B)=\\dfrac{' + nAB + '}{' + N + '}=' + dtex(nAB / N)) : d$('P(A\\cup B)=P(A)+P(B)-P(A\\cap B)=\\dfrac{' + cA + '}{' + N + '}+\\dfrac{' + cB + '}{' + N + '}-\\dfrac{' + nAB + '}{' + N + '}=' + dtex(aCap / N))]),
          part('Calcula ' + i$(cond ? 'P(B\\mid A)' : 'P(A\\mid B)') + '. <small>(fracción o decimal con 4 cifras)</small>', 0.75, { kind: 'expr', label: cond ? 'P(B|A)=' : 'P(A|B)=', value: num(cb), show: fstr(cb) },
            [d$((cond ? 'P(B\\mid A)=\\dfrac{P(A\\cap B)}{P(A)}=\\dfrac{' + nAB + '}{' + cA + '}' : 'P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}=\\dfrac{' + nAB + '}{' + cB + '}') + '=' + fstr(cb))]),
          part('¿Son ' + i$('A') + ' y ' + i$('B') + ' independientes?', 0.75, { kind: 'choice', options: ['Sí son independientes', 'No son independientes'], value: indepOk ? 0 : 1 },
            [i$('P(A)=' + dtex(pA) + ',\\ P(B)=' + dtex(pB)) + ' ⟹ ' + i$('P(A)P(B)=' + dtex(pA * pB)) + ', y ' + i$('P(A\\cap B)=' + dtex(pAB)) + '. ' + (indepOk ? 'Coinciden: son independientes.' : 'No coinciden: no son independientes.')]),
        ],
        data: { N, nAB, nAb, naB, nab, pedirCap, cond, indepOk },
      };
    },
  });

  /* ===================== prob-sucesos ===================== */
  X.implementar({
    id: 'prob-sucesos',
    generate() {
      for (;;) {
        const a = rnd.int(30, 80), b = rnd.int(20, 70);
        const indep = rnd.int(0, 2) === 0;
        const i = indep ? a * b / 100 : rnd.int(5, Math.min(a, b) - 5);
        if (!Number.isInteger(i) || i < 5 || i > Math.min(a, b) - 3) continue;
        const u = a + b - i;
        if (u > 95) continue;
        const pc = (x) => dtex(x / 100, 2);
        const indOk = i * 100 === a * b;
        return {
          enunciado: 'Sean ' + i$('A') + ' y ' + i$('B') + ' dos sucesos de un experimento aleatorio con ' + i$('P(A)=' + pc(a)) + ', ' + i$('P(B)=' + pc(b)) + ' y ' + i$('P(A\\cup B)=' + pc(u)) + '.',
          partes: [
            part('Calcula ' + i$('P(A\\cap B)') + '.', 0.5, { kind: 'number', label: 'P(A\\cap B)=', value: F(i, 100) },
              [d$('P(A\\cap B)=P(A)+P(B)-P(A\\cup B)=' + pc(a) + '+' + pc(b) + '-' + pc(u) + '=' + pc(i))]),
            part('Calcula ' + i$('P(A-B)') + ', siendo ' + i$('A-B=A\\cap B^C') + '.', 0.5, { kind: 'number', label: 'P(A-B)=', value: F(a - i, 100) },
              [d$('P(A-B)=P(A)-P(A\\cap B)=' + pc(a) + '-' + pc(i) + '=' + pc(a - i))]),
            part('Calcula ' + i$('P(A^C\\cap B^C)') + '.', 0.5, { kind: 'number', label: 'P(A^C\\cap B^C)=', value: F(100 - u, 100) },
              ['Por la ley de De Morgan, ' + i$('A^C\\cap B^C=(A\\cup B)^C') + ': ' + d$('P(A^C\\cap B^C)=1-P(A\\cup B)=1-' + pc(u) + '=' + pc(100 - u))]),
            part('¿Son ' + i$('A') + ' y ' + i$('B') + ' independientes?', 0.5, { kind: 'choice', options: ['Sí son independientes', 'No son independientes'], value: indOk ? 0 : 1 },
              [i$('P(A)P(B)=' + pc(a) + '\\cdot' + pc(b) + '=' + dtex(a * b / 10000)) + ' y ' + i$('P(A\\cap B)=' + pc(i)) + '. ' + (indOk ? 'Coinciden: independientes.' : 'Son distintos: no independientes.')]),
          ],
          data: { a, b, i, u, indOk },
        };
      }
    },
  });

  /* ===================== binomial ===================== */
  const CTX_BIN = [
    { suj: 'clientes de una tienda', exito: 'paga con tarjeta', X: 'clientes que pagan con tarjeta' },
    { suj: 'piezas de un lote', exito: 'es defectuosa', X: 'piezas defectuosas' },
    { suj: 'hogares de un barrio', exito: 'tiene fibra óptica', X: 'hogares con fibra óptica' },
    { suj: 'personas encuestadas', exito: 'usa el transporte público', X: 'personas que lo usan' },
  ];
  const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
  const pmf = (n, p, k) => binom(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  X.implementar({
    id: 'binomial',
    generate() {
      const c = rnd.pick(CTX_BIN);
      const n = rnd.int(5, 10), pc = rnd.pick([10, 20, 25, 30, 40, 50, 60, 70]), p = pc / 100;
      const k = rnd.int(1, Math.min(4, n - 1));
      const pideAlMenos1 = rnd.int(0, 1) === 0;
      const prob2 = pideAlMenos1 ? 1 - Math.pow(1 - p, n) : [...Array(k + 1).keys()].reduce((s, i) => s + pmf(n, p, i), 0);
      const mu = n * p, sg = Math.sqrt(n * p * (1 - p));
      return {
        enunciado: 'El ' + pc + ' % de los ' + c.suj + ' ' + c.exito + '. Se eligen ' + n + ' al azar, de forma independiente, y sea ' + i$('X') + ' el número de ' + c.X + '.',
        partes: [
          part('Indica la distribución de ' + i$('X') + ' y calcula ' + i$('P(X=' + k + ')') + '. <small>(decimal con 4 cifras)</small>', 0.75, { kind: 'expr', label: 'P(X=' + k + ')=', value: pmf(n, p, k), show: fixt(pmf(n, p, k), 4) },
            [i$('X\\sim B(' + n + ';\\,' + dtex(p) + ')'), d$('P(X=' + k + ')=\\dbinom{' + n + '}{' + k + '}\\,' + dtex(p) + '^{' + k + '}\\,' + dtex(1 - p) + '^{' + (n - k) + '}=' + fixt(pmf(n, p, k), 4))]),
          part('Calcula ' + i$(pideAlMenos1 ? 'P(X\\ge1)' : 'P(X\\le' + k + ')') + '. <small>(decimal con 4 cifras)</small>', 0.75, { kind: 'expr', label: pideAlMenos1 ? 'P(X\\ge1)=' : 'P(X\\le' + k + ')=', value: prob2, show: fixt(prob2, 4) },
            [pideAlMenos1 ? d$('P(X\\ge1)=1-P(X=0)=1-' + dtex(1 - p) + '^{' + n + '}=' + fixt(prob2, 4)) : d$('P(X\\le' + k + ')=' + [...Array(k + 1).keys()].map((i) => 'P(X=' + i + ')').join('+') + '=' + fixt(prob2, 4))]),
          part('Calcula la media y la desviación típica de ' + i$('X') + '. <small>(la desviación típica con 4 decimales)</small>', 0.5,
            { kind: 'multi', parts: [{ kind: 'expr', label: '\\mu=', value: mu, show: dtxt(mu) }, { kind: 'expr', label: '\\sigma=', value: sg, show: dtxt(rd(sg, 4)) }] },
            [d$('\\mu=np=' + n + '\\cdot' + dtex(p) + '=' + dtex(mu)), d$('\\sigma=\\sqrt{npq}=\\sqrt{' + n + '\\cdot' + dtex(p) + '\\cdot' + dtex(1 - p) + '}=' + dtex(rd(sg, 4)))]),
        ],
        data: { n, p, k, pideAlMenos1, prob2 },
      };
    },
  });

  /* ===================== normal-prob ===================== */
  const CTX_NORM = [
    { v: 'El tiempo de entrega de un pedido, en minutos', u: 'min', mus: [30, 40, 45, 60], sds: [5, 6, 8, 10] },
    { v: 'El peso de un paquete de arroz, en gramos', u: 'g', mus: [500, 1000], sds: [10, 12, 20, 25] },
    { v: 'La duración de una batería, en horas', u: 'h', mus: [100, 200, 500], sds: [10, 20, 25, 40] },
    { v: 'El salario mensual en una empresa, en euros', u: '€', mus: [1500, 1800, 2000], sds: [200, 300, 250] },
    { v: 'La nota de una prueba de acceso, sobre 100,', u: 'puntos', mus: [60, 65, 70], sds: [8, 10, 12, 15] },
  ];
  const zs4 = (r) => rnd.pick(r);
  X.implementar({
    id: 'normal-prob',
    generate() {
      const c = rnd.pick(CTX_NORM);
      const mu = rnd.pick(c.mus), sd = rnd.pick(c.sds);
      const zA = rnd.pick([-1.5, -1.25, -1, -0.75, -0.5, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]);
      const zB = rnd.pick([0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5]);
      const zC1 = rnd.pick([-2, -1.5, -1.25, -1, -0.5]), zC2 = rnd.pick([0.5, 0.75, 1, 1.25, 1.5, 2]);
      const a = mu + zA * sd, b = mu + zB * sd, c1 = mu + zC1 * sd, c2 = mu + zC2 * sd;
      const pA = T(zA), pB = 1 - T(zB), pC = T(zC2) - T(zC1);
      const al = (z, exacta) => [exacta];   // alternativa con el valor exacto de la calculadora
      return {
        enunciado: c.v + ', sigue una distribución normal de media ' + mu + ' y desviación típica ' + sd + '.',
        partes: [
          part('Calcula la probabilidad de que sea menor o igual que ' + a + '. <small>(usa la tabla; decimal con 4 cifras)</small>', 0.5, { kind: 'expr', label: 'P(X\\le ' + a + ')=', value: pA, show: pr4(pA).replace('{,}', ',').replace('{,}', ','), alt: [Phi(zA)] },
            [d$('P(X\\le ' + a + ')=P\\!\\left(Z\\le\\dfrac{' + a + '-' + mu + '}{' + sd + '}\\right)=P(Z\\le ' + zt(zA) + ')=' + pr4(pA))]),
          part('Calcula la probabilidad de que sea mayor que ' + b + '.', 0.75, { kind: 'expr', label: 'P(X>' + b + ')=', value: pB, show: pr4(pB).replace('{,}', ','), alt: [1 - Phi(zB)] },
            [d$('P(X>' + b + ')=P(Z>' + zt(zB) + ')=1-P(Z\\le ' + zt(zB) + ')=1-' + pr4(T(zB)) + '=' + pr4(pB))]),
          part('Calcula la probabilidad de que esté entre ' + c1 + ' y ' + c2 + '.', 0.75, { kind: 'expr', label: 'P(' + c1 + '<X<' + c2 + ')=', value: pC, show: pr4(pC).replace('{,}', ','), alt: [Phi(zC2) - Phi(zC1)] },
            [d$('P(' + c1 + '<X<' + c2 + ')=P(' + zt(zC1) + '<Z<' + zt(zC2) + ')=P(Z\\le ' + zt(zC2) + ')-P(Z\\le ' + zt(zC1) + ')=' + pr4(T(zC2)) + '-' + pr4(T(zC1)) + '=' + pr4(pC))]),
        ],
        data: { mu, sd, a, b, c1, c2, zA, zB, zC1, zC2, pA, pB, pC },
      };
    },
  });

  /* ===================== normal-inversa ===================== */
  /** z cuya Φ aparece exactamente en la tabla (z a dos decimales) y con probabilidad entre 0,6 y 0,99. */
  const Z_INV = [0.52, 0.67, 0.84, 1, 1.04, 1.15, 1.28, 1.34, 1.5, 1.75, 1.88, 2, 2.17, 2.33].map((z) => z);
  X.implementar({
    id: 'normal-inversa',
    generate() {
      const c = rnd.pick(CTX_NORM);
      const mu = rnd.pick(c.mus), sd = rnd.pick(c.sds);
      const z1 = rnd.pick(Z_INV), z2v = rnd.pick(Z_INV.filter((z) => z !== z1 && z >= 1));
      const p1 = tabla0(z1), p2 = tabla0(z2v);
      const k1 = mu + z1 * sd;
      const sd2 = rnd.pick([2, 4, 5, 8, 10, 12, 20]), a2 = rnd.pick([1, 2, 3]) * sd2;      // P(X ≤ mu + a2) = tabla0(z2v) con σ' = a2 / z2v
      const sigma = a2 / z2v;
      const sd3 = rnd.pick([5, 10, 15, 20]), z3 = rnd.pick(Z_INV.filter((z) => z >= 1)), p3 = tabla0(z3), x3 = rnd.pick([30, 40, 50, 60]) + 0;
      const mu3 = x3 - z3 * sd3;
      return {
        enunciado: c.v + ', sigue una distribución normal de media ' + mu + ' y desviación típica ' + sd + '. Usa la tabla de la normal (en este ejercicio, todas las probabilidades que necesitas aparecen en la tabla).',
        partes: [
          part('Halla el valor ' + i$('k') + ' tal que ' + i$('P(X\\le k)=' + pr4(p1)) + '. <small>(decimal)</small>', 0.75, { kind: 'expr', label: 'k=', value: k1, show: dtxt(rd(k1, 2)) },
            ['En la tabla, ' + i$('P(Z\\le ' + zt(z1) + ')=' + pr4(p1)) + ', luego ' + i$('\\dfrac{k-' + mu + '}{' + sd + '}=' + zt(z1)) + ' y ' + d$('k=' + mu + '+' + sd + '\\cdot' + zt(z1) + '=' + dtex(rd(k1, 2))) + '.']),
          part('Otra variable ' + i$('Y\\sim N(\\mu,\\,\\sigma)') + ' cumple ' + i$('P(Y\\le ' + x3 + ')=' + pr4(p3)) + '. Si ' + i$('\\sigma=' + sd3) + ', halla ' + i$('\\mu') + '. <small>(decimal)</small>', 0.75, { kind: 'expr', label: '\\mu=', value: mu3, show: dtxt(rd(mu3, 2)) },
            ['En la tabla, ' + i$('P(Z\\le ' + zt(z3) + ')=' + pr4(p3)) + ', luego ' + i$('\\dfrac{' + x3 + '-\\mu}{' + sd3 + '}=' + zt(z3)) + ' y ' + d$('\\mu=' + x3 + '-' + sd3 + '\\cdot' + zt(z3) + '=' + dtex(rd(mu3, 2))) + '.']),
          part('Una variable ' + i$('W\\sim N(' + mu + ',\\,\\sigma)') + ' cumple ' + i$('P(W\\le ' + (mu + a2) + ')=' + pr4(p2)) + '. Halla ' + i$('\\sigma') + '. <small>(decimal)</small>', 0.5, { kind: 'expr', label: '\\sigma=', value: rd(sigma, 2), alt: [sigma], show: dtxt(rd(sigma, 2)) },
            ['En la tabla, ' + i$('P(Z\\le ' + zt(z2v) + ')=' + pr4(p2)) + ', luego ' + i$('\\dfrac{' + (mu + a2) + '-' + mu + '}{\\sigma}=' + zt(z2v)) + ' y ' + d$('\\sigma=\\dfrac{' + a2 + '}{' + zt(z2v) + '}=' + dtex(rd(sigma, 2))) + '.']),
        ],
        data: { mu, sd, z1, p1, k1, x3, sd3, z3, p3, mu3, a2, z2v, p2, sigma },
      };
    },
  });

  /* ===================== binomial-normal ===================== */
  X.implementar({
    id: 'binomial-normal',
    generate() {
      const c = rnd.pick(CTX_BIN);
      for (;;) {
        const n = rnd.pick([60, 80, 100, 120, 150, 200, 250, 300]), pc = rnd.pick([10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]);
        const p = pc / 100, mu = n * p, sg = Math.sqrt(n * p * (1 - p));
        if (n * p < 5 || n * (1 - p) < 5) continue;
        const mm = Math.round(mu);
        const k1 = mm + rnd.int(3, Math.max(4, Math.round(sg * 1.8)));
        const mayor = rnd.pick(['ge', 'gt']);
        const k2 = mm - rnd.int(2, Math.max(3, Math.round(sg * 1.4)));
        const tipo2 = rnd.pick(['eq', 'le', 'lt']);
        if (k2 < 1 || k1 >= n) continue;
        // apartado b: P(X ≥ k1) o P(X > k1)
        const lim1 = mayor === 'ge' ? k1 - 0.5 : k1 + 0.5;
        const z1 = z2((lim1 - mu) / sg), pb = 1 - T(z1), pbex = 1 - Phi((lim1 - mu) / sg);
        // apartado c
        let pcv, pcex, txtc, stepc;
        if (tipo2 === 'eq') {
          const l = z2((k2 - 0.5 - mu) / sg), u = z2((k2 + 0.5 - mu) / sg);
          pcv = T(u) - T(l); pcex = Phi((k2 + 0.5 - mu) / sg) - Phi((k2 - 0.5 - mu) / sg);
          txtc = 'P(X=' + k2 + ')'; stepc = d$('P(X=' + k2 + ')=P(' + (k2 - 0.5).toString().replace('.', '{,}') + '<Y<' + (k2 + 0.5).toString().replace('.', '{,}') + ')=P(' + zt(l) + '<Z<' + zt(u) + ')=' + pr4(T(u)) + '-' + pr4(T(l)) + '=' + pr4(pcv));
        } else {
          const lim = tipo2 === 'le' ? k2 + 0.5 : k2 - 0.5, z = z2((lim - mu) / sg);
          pcv = T(z); pcex = Phi((lim - mu) / sg);
          txtc = tipo2 === 'le' ? 'P(X\\le ' + k2 + ')' : 'P(X<' + k2 + ')';
          stepc = d$(txtc + '=P(Y<' + String(lim).replace('.', '{,}') + ')=P(Z<' + zt(z) + ')=' + pr4(pcv));
        }
        if (pb < 0.005 || pb > 0.995 || pcv < 0.005 || pcv > 0.995) continue;
        const sgs = rd(sg, 4);
        return {
          enunciado: 'El ' + pc + ' % de los ' + c.suj + ' ' + c.exito + '. Se eligen ' + n + ' al azar, de forma independiente, y sea ' + i$('X') + ' el número de ' + c.X + '.',
          partes: [
            part('Comprueba que ' + i$('X\\sim B(' + n + ';\\,' + dtex(p) + ')') + ' se puede aproximar por una normal y da sus parámetros ' + i$('\\mu') + ' y ' + i$('\\sigma') + '. <small>(' + i$('\\sigma') + ' con 4 decimales)</small>', 0.5,
              { kind: 'multi', parts: [{ kind: 'expr', label: '\\mu=', value: mu, show: dtxt(mu) }, { kind: 'expr', label: '\\sigma=', value: sg, show: dtxt(sgs) }] },
              [d$('np=' + dtex(mu) + '\\ge5,\\qquad nq=' + dtex(n * (1 - p)) + '\\ge5'), 'Entonces ' + i$('X\\approx Y\\sim N(' + dtex(mu) + ';\\,' + dtex(sgs) + ')') + ', con ' + i$('\\sigma=\\sqrt{npq}') + '.']),
            part('Calcula ' + i$(mayor === 'ge' ? 'P(X\\ge ' + k1 + ')' : 'P(X>' + k1 + ')') + ' con la corrección por continuidad. <small>(decimal con 4 cifras)</small>', 0.75,
              { kind: 'expr', label: mayor === 'ge' ? 'P(X\\ge ' + k1 + ')=' : 'P(X>' + k1 + ')=', value: pb, show: pr4(pb).replace('{,}', ','), alt: [pbex] },
              [d$((mayor === 'ge' ? 'P(X\\ge ' + k1 + ')=P(Y>' + String(lim1).replace('.', '{,}') + ')' : 'P(X>' + k1 + ')=P(X\\ge ' + (k1 + 1) + ')=P(Y>' + String(lim1).replace('.', '{,}') + ')') + '=P\\!\\left(Z>\\dfrac{' + String(lim1).replace('.', '{,}') + '-' + dtex(mu) + '}{' + dtex(sgs) + '}\\right)=P(Z>' + zt(z1) + ')=1-' + pr4(T(z1)) + '=' + pr4(pb))]),
            part('Calcula ' + i$(txtc) + ' con la corrección por continuidad. <small>(decimal con 4 cifras)</small>', 0.75, { kind: 'expr', label: txtc + '=', value: pcv, show: pr4(pcv).replace('{,}', ','), alt: [pcex] },
              [stepc]),
          ],
          data: { n, p, mu, sg, k1, mayor, lim1, z1, pb, k2, tipo2, pcv },
        };
      }
    },
  });

  /* ===================== media-muestral ===================== */
  X.implementar({
    id: 'media-muestral',
    generate() {
      const prop = rnd.int(0, 2) === 0;
      if (!prop) {
        const c = rnd.pick(CTX_NORM);
        const mu = rnd.pick(c.mus), n = rnd.pick([36, 49, 64, 100, 144, 225, 400]), sdp = rnd.pick(c.sds), s = Math.sqrt(n);
        const se = sdp / s;
        const zA = rnd.pick([0.5, 0.75, 1, 1.25, 1.5, 2]), zB = rnd.pick([-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2]);
        const a = mu + zA * se, b = mu + zB * se, dd = mu - zA * se;
        if (![a, b, dd].every((x) => Math.abs(x * 1000 - Math.round(x * 1000)) < 1e-6)) return this.generate();
        const pA = 1 - T(zA), pB = T(zA) - T(-zA);
        const seTxt = dtex(rd(se, 4));
        return {
          enunciado: c.v + ' tiene media ' + mu + ' y desviación típica ' + sdp + '. Se toman muestras de ' + n + ' individuos y sea ' + i$('\\overline{X}') + ' la media muestral.',
          partes: [
            part('Indica la distribución de ' + i$('\\overline{X}') + ': da su desviación típica ' + i$('\\dfrac{\\sigma}{\\sqrt n}') + '. <small>(decimal)</small>', 0.5, { kind: 'expr', label: '\\dfrac{\\sigma}{\\sqrt n}=', value: se, show: seTxt },
              ['Como ' + i$('n=' + n + '\\ge30') + ': ' + d$('\\overline{X}\\approx N\\!\\left(' + mu + ',\\ \\dfrac{' + sdp + '}{\\sqrt{' + n + '}}\\right)=N(' + mu + ';\\,' + seTxt + ')')]),
            part('Calcula ' + i$('P(\\overline{X}>' + dtex(a) + ')') + '. <small>(decimal con 4 cifras)</small>', 0.75, { kind: 'expr', label: 'P=', value: pA, show: pr4(pA).replace('{,}', ','), alt: [1 - Phi(zA)] },
              [d$('P(\\overline{X}>' + dtex(a) + ')=P\\!\\left(Z>\\dfrac{' + dtex(a) + '-' + mu + '}{' + seTxt + '}\\right)=P(Z>' + zt(zA) + ')=1-' + pr4(T(zA)) + '=' + pr4(pA))]),
            part('Calcula la probabilidad de que la media muestral difiera de ' + mu + ' en menos de ' + dtex(zA * se) + '.', 0.75, { kind: 'expr', label: 'P=', value: pB, show: pr4(pB).replace('{,}', ','), alt: [2 * Phi(zA) - 1] },
              [d$('P(' + dtex(dd) + '<\\overline{X}<' + dtex(a) + ')=P(-' + zt(zA) + '<Z<' + zt(zA) + ')=2\\cdot' + pr4(T(zA)) + '-1=' + pr4(pB))]),
          ],
          data: { prop: false, mu, sdp, n, se, a, zA, pA, pB },
        };
      }
      // proporción muestral
      for (;;) {
        const p = rnd.pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6]), n = rnd.pick([100, 200, 400, 600, 900]);
        const se = Math.sqrt(p * (1 - p) / n);
        const zA = rnd.pick([1, 1.25, 1.5, 1.75, 2]), zB = rnd.pick([-1, -1.5, -2, -1.25]);
        const a = p + zA * se, b = p + zB * se;
        const ar = Math.round(a * 1000) / 1000, br = Math.round(b * 1000) / 1000;
        const zAr = z2((ar - p) / se), zBr = z2((br - p) / se);
        const pA = 1 - T(zAr), pB = T(zBr);
        if (pA < 0.01 || pB < 0.01) continue;
        const seTxt = dtex(rd(se, 4));
        return {
          enunciado: 'El ' + Math.round(p * 100) + ' % de los usuarios de un servicio está satisfecho. Se toma una muestra aleatoria de ' + n + ' usuarios y sea ' + i$('\\hat p') + ' la proporción muestral de usuarios satisfechos.',
          partes: [
            part('Indica la distribución de ' + i$('\\hat p') + ': da su desviación típica ' + i$('\\sqrt{\\dfrac{p(1-p)}{n}}') + ' con 4 decimales.', 0.5, { kind: 'expr', label: '\\sigma_{\\hat p}=', value: se, show: seTxt },
              ['Como ' + i$('n=' + n + '\\ge30') + ': ' + d$('\\hat p\\approx N\\!\\left(' + dtex(p) + ',\\ \\sqrt{\\dfrac{' + dtex(p) + '\\cdot' + dtex(1 - p) + '}{' + n + '}}\\right)=N(' + dtex(p) + ';\\,' + seTxt + ')')]),
            part('Calcula ' + i$('P(\\hat p\\ge ' + dtex(ar) + ')') + '. <small>(decimal con 4 cifras)</small>', 0.75, { kind: 'expr', label: 'P=', value: pA, show: pr4(pA).replace('{,}', ','), alt: [1 - Phi((ar - p) / se)] },
              [d$('P(\\hat p\\ge ' + dtex(ar) + ')=P\\!\\left(Z\\ge\\dfrac{' + dtex(ar) + '-' + dtex(p) + '}{' + seTxt + '}\\right)=P(Z\\ge ' + zt(zAr) + ')=1-' + pr4(T(zAr)) + '=' + pr4(pA))]),
            part('Calcula ' + i$('P(\\hat p\\le ' + dtex(br) + ')') + '. <small>(decimal con 4 cifras)</small>', 0.75, { kind: 'expr', label: 'P=', value: pB, show: pr4(pB).replace('{,}', ','), alt: [Phi((br - p) / se)] },
              [d$('P(\\hat p\\le ' + dtex(br) + ')=P(Z\\le ' + zt(zBr) + ')=' + pr4(pB))]),
          ],
          data: { prop: true, p, n, se, ar, br, zAr, zBr, pA, pB },
        };
      }
    },
  });

  /* ===================== ic-media ===================== */
  const NIVEL = { 90: { z: 1.645, txt: '1{,}645' }, 95: { z: 1.96, txt: '1{,}96' }, 99: { z: 2.575, txt: '2{,}575' } };
  X.implementar({
    id: 'ic-media',
    generate() {
      const niv = rnd.pick([90, 95, 95, 99]), Z = NIVEL[niv];
      const sd = rnd.pick([5, 10, 12, 15, 20, 25, 30]), n = rnd.pick([36, 64, 100, 144, 225, 400]);
      const mean = rnd.pick([42, 50, 75, 120, 180, 250, 310]);
      const se = sd / Math.sqrt(n), E = Z.z * se;
      const Eobj = rnd.pick([1, 2, 3, 4, 5]) * (sd >= 15 ? 1 : 0.5), nmin = Math.ceil(Math.pow(Z.z * sd / Eobj, 2) - 1e-9);
      const lo = mean - E, hi = mean + E;
      const crit = niv === 95 ? '' : ' Usa el valor crítico ' + i$('z_{\\alpha/2}=' + Z.txt) + '.';
      return {
        enunciado: 'Se quiere estimar la media de una variable de una población con desviación típica conocida ' + i$('\\sigma=' + sd) + '. Con una muestra aleatoria de ' + i$('n=' + n) + ' individuos se obtiene una media muestral ' + i$('\\overline{x}=' + mean) + '. Se trabaja con una confianza del ' + niv + ' %.' + crit,
        partes: [
          part('Calcula el error máximo admisible ' + i$('E=z_{\\alpha/2}\\dfrac{\\sigma}{\\sqrt n}') + '. <small>(decimal)</small>', 0.5, { kind: 'expr', label: 'E=', value: E, show: dtxt(rd(E, 4)) },
            [d$('E=' + Z.txt + '\\cdot\\dfrac{' + sd + '}{\\sqrt{' + n + '}}=' + Z.txt + '\\cdot' + dtex(se) + '=' + dtex(rd(E, 4)))]),
          part('Halla el intervalo de confianza para la media. Escribe sus extremos.', 0.75,
            { kind: 'multi', parts: [{ kind: 'expr', label: 'extremo inferior=', value: lo, show: dtxt(rd(lo, 4)) }, { kind: 'expr', label: 'extremo superior=', value: hi, show: dtxt(rd(hi, 4)) }] },
            [d$('(\\overline{x}-E,\\ \\overline{x}+E)=(' + mean + '-' + dtex(rd(E, 4)) + ',\\ ' + mean + '+' + dtex(rd(E, 4)) + ')=(' + dtex(rd(lo, 4)) + ';\\ ' + dtex(rd(hi, 4)) + ')')]),
          part('¿Cuál es el tamaño muestral mínimo para que, con la misma confianza, el error máximo no supere ' + i$(dtex(Eobj)) + '? <small>(entero)</small>', 0.75, { kind: 'number', label: 'n=', value: F(nmin) },
            [d$('n\\ge\\left(\\dfrac{z_{\\alpha/2}\\,\\sigma}{E}\\right)^2=\\left(\\dfrac{' + Z.txt + '\\cdot' + sd + '}{' + dtex(Eobj) + '}\\right)^2=' + dtex(Math.pow(Z.z * sd / Eobj, 2), 4)), 'Se redondea hacia arriba: ' + i$('n=' + nmin) + '.']),
        ],
        data: { niv, z: Z.z, sd, n, mean, E, lo, hi, Eobj, nmin },
      };
    },
  });

  /* ===================== ic-proporcion ===================== */
  X.implementar({
    id: 'ic-proporcion',
    generate() {
      const niv = rnd.pick([90, 95, 95, 99]), Z = NIVEL[niv];
      for (;;) {
        const n = rnd.pick([200, 400, 500, 600, 800, 1000]), ph = rnd.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.55, 0.6, 0.65, 0.7]);
        const x = n * ph;
        if (!Number.isInteger(x)) continue;
        const se = Math.sqrt(ph * (1 - ph) / n), E = Z.z * se, lo = ph - E, hi = ph + E;
        const crit = niv === 95 ? '' : ' Usa el valor crítico ' + i$('z_{\\alpha/2}=' + Z.txt) + '.';
        return {
          enunciado: 'En una encuesta a ' + n + ' personas elegidas al azar, ' + x + ' declaran que han comprado algún producto por internet en el último mes. Se estima la proporción de la población que lo ha hecho con una confianza del ' + niv + ' %.' + crit,
          partes: [
            part('Calcula la proporción muestral ' + i$('\\hat p') + ' y el error típico ' + i$('\\sqrt{\\dfrac{\\hat p(1-\\hat p)}{n}}') + ' (con 4 decimales).', 0.5,
              { kind: 'multi', parts: [{ kind: 'expr', label: '\\hat p=', value: ph, show: dtxt(ph) }, { kind: 'expr', label: 'e.t.=', value: se, show: dtxt(rd(se, 4)) }] },
              [d$('\\hat p=\\dfrac{' + x + '}{' + n + '}=' + dtex(ph)), d$('\\sqrt{\\dfrac{' + dtex(ph) + '\\cdot' + dtex(1 - ph) + '}{' + n + '}}=' + dtex(rd(se, 4)))]),
            part('Calcula el error máximo admisible ' + i$('E') + '. <small>(decimal con 4 cifras)</small>', 0.5, { kind: 'expr', label: 'E=', value: E, show: dtxt(rd(E, 4)) },
              [d$('E=z_{\\alpha/2}\\sqrt{\\dfrac{\\hat p(1-\\hat p)}{n}}=' + Z.txt + '\\cdot' + dtex(rd(se, 4)) + '=' + dtex(rd(E, 4)))]),
            part('Halla el intervalo de confianza para la proporción. Escribe sus extremos (decimal con 4 cifras).', 0.75,
              { kind: 'multi', parts: [{ kind: 'expr', label: 'extremo inferior=', value: lo, show: dtxt(rd(lo, 4)) }, { kind: 'expr', label: 'extremo superior=', value: hi, show: dtxt(rd(hi, 4)) }] },
              [d$('(\\hat p-E,\\ \\hat p+E)=(' + dtex(rd(lo, 4)) + ';\\ ' + dtex(rd(hi, 4)) + ')')]),
            part('Interpreta el intervalo: ¿qué porcentaje de la población, como máximo, ha comprado por internet con esa confianza? <small>(porcentaje, con dos decimales)</small>', 0.25, { kind: 'expr', label: '\\%=', value: rd(hi * 100, 2), show: dtxt(rd(hi * 100, 2)) },
              ['Con una confianza del ' + niv + ' %, la proporción de la población está entre el ' + dtex(rd(lo * 100, 2)) + ' % y el ' + dtex(rd(hi * 100, 2)) + ' %.']),
          ],
          data: { niv, z: Z.z, n, x, ph, se, E, lo, hi },
        };
      }
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
