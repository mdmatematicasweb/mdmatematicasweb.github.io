/* Ejercicios interactivos — 2º Bachillerato, tema 4: Vectores en el espacio.
 * Exporta G.geo con utilidades de geometría que reutiliza rectasplanos.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, M, ftex, d$, i$ } = G;
  const L = G.lib;

  /* ---------- Utilidades con vectores enteros [x,y,z] ---------- */
  const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  const cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const scal = (k, v) => v.map((x) => k * x);
  const norm2 = (v) => dot(v, v);
  const det3 = (a, b, c) => dot(a, cross(b, c));
  const isqrt = (n) => { const r = Math.round(Math.sqrt(n)); return r * r === n ? r : -1; };
  const isZero = (v) => v.every((x) => x === 0);
  const vrand = (lo, hi) => [rnd.int(lo, hi), rnd.int(lo, hi), rnd.int(lo, hi)];
  const vnz = (lo, hi) => { for (;;) { const v = vrand(lo, hi); if (!isZero(v)) return v; } };
  const gcdN = (a, b) => G.gcd(a, b);
  const gcdV = (v) => v.reduce((g, x) => gcdN(g, x), 0);
  const vt = (v) => '(' + v.join(',') + ')';
  const vtex = (name, v) => '\\vec{' + name + '}=' + vt(v);
  const ptex = (name, v) => name + vt(v);

  // Ternas pitagóricas en el espacio: a²+b²+c² = n²
  const QUADS = [[1, 2, 2], [2, 3, 6], [1, 4, 8], [2, 6, 9], [4, 4, 7], [0, 3, 4], [0, 5, 12], [2, 10, 11], [6, 6, 7], [3, 4, 12]];
  function pythVec() {
    const q = rnd.shuffle(rnd.pick(QUADS)).map((x) => x * rnd.pick([-1, 1]));
    return q;
  }
  const fr = (n, d) => F(n, d === undefined ? 1 : d);
  const row = (arr) => M([arr]);
  /** Fórmula "a + b t" para una coordenada de recta paramétrica. */
  function linTex(q, a, t) {
    const T = a === 0 ? '' : (a === 1 ? t : a === -1 ? '-' + t : a + t);
    if (!T) return String(q);
    if (q === 0) return T;
    return q + (a < 0 ? '' : '+') + T;
  }

  G.geo = { dot, cross, sub, add, scal, norm2, det3, isqrt, isZero, vrand, vnz, gcdV, vt, vtex, ptex, pythVec, fr, row, linTex, QUADS };

  const cross3tex = (u, v) => '\\begin{vmatrix}\\vec{i}&\\vec{j}&\\vec{k}\\\\' + u.join('&') + '\\\\' + v.join('&') + '\\end{vmatrix}';

  /* ===================== 1. Producto escalar, vectorial y mixto ===================== */
  G.define({
    id: 'vectorial',
    title: 'Productos de vectores',
    help: [
      '$\\vec u\\cdot\\vec v=u_1v_1+u_2v_2+u_3v_3$ (da un número) · $\\vec u\\times\\vec v$ = determinante con $\\vec i,\\vec j,\\vec k$ (da un vector perpendicular a ambos) · $[\\vec u,\\vec v,\\vec w]=\\vec u\\cdot(\\vec v\\times\\vec w)$ = determinante de las tres filas.',
      'Ejemplo con $\\vec u=(1,2,0)$ y $\\vec v=(0,1,3)$: $\\vec u\\cdot\\vec v=0+2+0=2$. ' + d$('\\vec u\\times\\vec v=\\begin{vmatrix}\\vec i&\\vec j&\\vec k\\\\1&2&0\\\\0&1&3\\end{vmatrix}=(6-0)\\vec i-(3-0)\\vec j+(1-0)\\vec k=(6,-3,1)') + 'Comprobación: $\\vec u\\cdot(\\vec u\\times\\vec v)=6-6+0=0$. Ojo: $\\vec v\\times\\vec u=-(\\vec u\\times\\vec v)$.',
    ],
    params: [{ key: 'op', label: 'Producto', options: [['esc', 'Escalar'], ['vec', 'Vectorial'], ['mix', 'Mixto']] }],
    generate(p) {
      const u = vnz(-4, 4), v = vnz(-4, 4), w = vnz(-4, 4);
      const defs = (names) => d$(names.map((n) => vtex(n, { u, v, w }[n])).join('\\qquad '));
      if (p.op === 'esc') {
        const r = dot(u, v);
        return {
          prompt: 'Calcula ' + i$('\\vec u\\cdot\\vec v') + ' con ' + defs(['u', 'v']),
          answer: { kind: 'number', label: '\\vec u\\cdot\\vec v=', value: fr(r) },
          steps: ['Multiplicamos componente a componente y sumamos: ' + d$('\\vec u\\cdot\\vec v=' + u.map((x, i) => '(' + x + ')(' + v[i] + ')').join('+') + '=' + r)],
          data: { op: 'esc', u, v },
        };
      }
      if (p.op === 'vec') {
        const c = cross(u, v);
        return {
          prompt: 'Calcula ' + i$('\\vec u\\times\\vec v') + ' con ' + defs(['u', 'v']),
          answer: { kind: 'matrix', label: '\\vec u\\times\\vec v=', value: row(c) },
          steps: [
            'Desarrollamos el determinante por la primera fila: ' + d$('\\vec u\\times\\vec v=' + cross3tex(u, v)),
            'Coeficientes: ' + d$('=(' + u[1] + '\\cdot' + '(' + v[2] + ')-(' + u[2] + ')(' + v[1] + '))\\vec i-(' + u[0] + '\\cdot(' + v[2] + ')-(' + u[2] + ')(' + v[0] + '))\\vec j+(' + u[0] + '\\cdot(' + v[1] + ')-(' + u[1] + ')(' + v[0] + '))\\vec k=' + vt(c)),
            'El resultado es perpendicular a ' + i$('\\vec u') + ' y a ' + i$('\\vec v') + '. Comprobación: ' + i$('\\vec u\\cdot(\\vec u\\times\\vec v)=' + dot(u, c)),
          ],
          mistakes: [{ value: row(scal(-1, c)), msg: 'has calculado $\\vec v\\times\\vec u$: el producto vectorial <b>no</b> es conmutativo, $\\vec v\\times\\vec u=-(\\vec u\\times\\vec v)$. Respeta el orden de las filas del determinante.' }],
          data: { op: 'vec', u, v },
        };
      }
      const r = det3(u, v, w);
      return {
        prompt: 'Calcula el producto mixto ' + i$('[\\vec u,\\vec v,\\vec w]') + ' con ' + defs(['u', 'v', 'w']),
        answer: { kind: 'number', label: '[\\vec u,\\vec v,\\vec w]=', value: fr(r) },
        steps: ['Es el determinante de la matriz cuyas filas son los tres vectores: ' + d$('[\\vec u,\\vec v,\\vec w]=' + G.mtex(M([u, v, w]), 'vmatrix') + '=' + r),
          'Si fuese 0, los tres vectores serían coplanarios.'],
        data: { op: 'mix', u, v, w },
      };
    },
  });

  /* ===================== 2. Ángulo entre vectores ===================== */
  G.define({
    id: 'angulo',
    title: 'Ángulo entre dos vectores',
    help: [
      '$\\cos\\alpha=\\dfrac{\\vec u\\cdot\\vec v}{|\\vec u|\\,|\\vec v|}$, con $|\\vec u|=\\sqrt{u_1^2+u_2^2+u_3^2}$. Si $\\vec u\\cdot\\vec v=0$ son perpendiculares.',
      'Ejemplo: $\\vec u=(1,2,2)$, $\\vec v=(2,3,6)$. Producto escalar: $2+6+12=20$. Módulos: $|\\vec u|=\\sqrt9=3$, $|\\vec v|=\\sqrt{49}=7$. Entonces ' + d$('\\cos\\alpha=\\frac{20}{3\\cdot7}=\\frac{20}{21}'),
    ],
    params: [],
    generate() {
      const u = pythVec(), v = pythVec();
      const nu = isqrt(norm2(u)), nv = isqrt(norm2(v));
      const d = dot(u, v);
      const c = fr(d, nu * nv);
      return {
        prompt: 'Calcula el coseno del ángulo que forman ' + d$(vtex('u', u) + '\\qquad ' + vtex('v', v)),
        answer: { kind: 'number', label: '\\cos\\alpha=', value: c },
        steps: [
          'Producto escalar: ' + d$('\\vec u\\cdot\\vec v=' + u.map((x, i) => '(' + x + ')(' + v[i] + ')').join('+') + '=' + d),
          'Módulos: ' + d$('|\\vec u|=\\sqrt{' + u.map((x) => '(' + x + ')^2').join('+') + '}=\\sqrt{' + norm2(u) + '}=' + nu + '\\qquad |\\vec v|=\\sqrt{' + norm2(v) + '}=' + nv),
          'Sustituimos: ' + d$('\\cos\\alpha=\\frac{' + d + '}{' + nu + '\\cdot ' + nv + '}=' + ftex(c)),
        ],
        mistakes: [
          { value: fr(d, nu), msg: 'falta dividir entre el módulo de $\\vec v$: $\\cos\\alpha=\\frac{\\vec u\\cdot\\vec v}{|\\vec u||\\vec v|}$.' },
          { value: fr(d, nv), msg: 'falta dividir entre el módulo de $\\vec u$: $\\cos\\alpha=\\frac{\\vec u\\cdot\\vec v}{|\\vec u||\\vec v|}$.' },
          { value: fr(d), msg: 'el producto escalar no es el coseno: hay que dividir entre $|\\vec u||\\vec v|$.' },
        ].filter((m) => !(m.value.n === c.n && m.value.d === c.d)),
        data: { u, v, nu, nv },
      };
    },
  });

  /* ===================== 3. Áreas y volúmenes ===================== */
  G.define({
    id: 'areas',
    title: 'Áreas y volúmenes',
    help: [
      'Área del paralelogramo $=|\\vec u\\times\\vec v|$ · del triángulo: la mitad · volumen del paralelepípedo $=|[\\vec u,\\vec v,\\vec w]|$ · del tetraedro: la sexta parte. Con puntos, los vectores salen de un vértice: $\\vec{AB},\\vec{AC},\\vec{AD}$.',
      'Ejemplo: $\\vec u=(2,0,0)$, $\\vec v=(0,3,0)$, $\\vec w=(0,0,4)$. $\\vec u\\times\\vec v=(0,0,6)$, así que el paralelogramo tiene área $6$ y el triángulo $3$. $[\\vec u,\\vec v,\\vec w]=24$: el paralelepípedo tiene volumen $24$ y el tetraedro $24/6=4$.',
    ],
    params: [{ key: 'fig', label: 'Figura', options: [['par', 'Paralelogramo'], ['tri', 'Triángulo'], ['pipe', 'Paralelepípedo'], ['tetra', 'Tetraedro']] }],
    generate(p) {
      if (p.fig === 'par' || p.fig === 'tri') {
        for (;;) {
          const A = vrand(-3, 3), u = vnz(-4, 4), v = vnz(-4, 4);
          const c = cross(u, v);
          const n = isqrt(norm2(c));
          if (n <= 0) continue;
          const crossTex = 'Producto vectorial: ' + d$('\\vec u\\times\\vec v=' + cross3tex(u, v) + '=' + vt(c));
          const modTex = 'Módulo: ' + d$('|\\vec u\\times\\vec v|=\\sqrt{' + c.map((x) => '(' + x + ')^2').join('+') + '}=\\sqrt{' + norm2(c) + '}=' + n);
          if (p.fig === 'par') {
            return {
              prompt: 'Halla el área del paralelogramo determinado por ' + d$(vtex('u', u) + '\\qquad ' + vtex('v', v)),
              answer: { kind: 'number', label: '\\text{Área}=', value: fr(n) },
              steps: [crossTex, modTex, 'El área es el módulo: ' + i$(n + '\\ \\text{u}^2')],
              mistakes: [{ value: fr(norm2(c)), msg: 'el área es el <b>módulo</b> del producto vectorial (con la raíz), no la suma de cuadrados.' }],
              data: { fig: 'par', u, v, n },
            };
          }
          const B = add(A, u), C = add(A, v);
          return {
            prompt: 'Halla el área del triángulo de vértices ' + i$(ptex('A', A) + ',\\ ' + ptex('B', B) + ',\\ ' + ptex('C', C)),
            answer: { kind: 'number', label: '\\text{Área}=', value: fr(n, 2) },
            steps: ['Vectores de los lados: ' + d$('\\vec{AB}=' + vt(u) + '\\qquad \\vec{AC}=' + vt(v)), crossTex.replace('\\vec u\\times\\vec v', '\\vec{AB}\\times\\vec{AC}'), modTex.replace(/\\vec u\\times\\vec v/, '\\vec{AB}\\times\\vec{AC}'),
              'El triángulo es la mitad del paralelogramo: ' + d$('\\text{Área}=\\frac{' + n + '}{2}=' + ftex(fr(n, 2)))],
            mistakes: [{ value: fr(n), msg: 'eso es el área del <b>paralelogramo</b>; el triángulo es la mitad.' }],
            data: { fig: 'tri', u, v, n },
          };
        }
      }
      for (;;) {
        const u = vnz(-3, 3), v = vnz(-3, 3), w = vnz(-3, 3);
        const d = det3(u, v, w);
        if (d === 0) continue;
        if (p.fig === 'pipe') {
          return {
            prompt: 'Halla el volumen del paralelepípedo determinado por ' + d$(vtex('u', u) + '\\quad ' + vtex('v', v) + '\\quad ' + vtex('w', w)),
            answer: { kind: 'number', label: 'V=', value: fr(Math.abs(d)) },
            steps: ['Producto mixto: ' + d$('[\\vec u,\\vec v,\\vec w]=' + G.mtex(M([u, v, w]), 'vmatrix') + '=' + d), 'El volumen es el valor absoluto: ' + i$('V=' + Math.abs(d))],
            mistakes: d < 0 ? [{ value: fr(d), msg: 'un volumen no puede ser negativo: se toma el valor absoluto del producto mixto.' }] : [],
            data: { fig: 'pipe', u, v, w, d },
          };
        }
        const A = vrand(-2, 2);
        const B = add(A, u), C = add(A, v), D = add(A, w);
        return {
          prompt: 'Halla el volumen del tetraedro de vértices ' + i$(ptex('A', A) + ',\\ ' + ptex('B', B) + ',\\ ' + ptex('C', C) + ',\\ ' + ptex('D', D)),
          answer: { kind: 'number', label: 'V=', value: fr(Math.abs(d), 6) },
          steps: ['Vectores desde ' + i$('A') + ': ' + d$('\\vec{AB}=' + vt(u) + '\\quad \\vec{AC}=' + vt(v) + '\\quad \\vec{AD}=' + vt(w)),
            'Producto mixto: ' + d$('[\\vec{AB},\\vec{AC},\\vec{AD}]=' + G.mtex(M([u, v, w]), 'vmatrix') + '=' + d),
            'El tetraedro es la sexta parte del paralelepípedo: ' + d$('V=\\frac{|' + d + '|}{6}=' + ftex(fr(Math.abs(d), 6)))],
          mistakes: [{ value: fr(Math.abs(d)), msg: 'eso es el volumen del <b>paralelepípedo</b>; el tetraedro es la sexta parte.' }, { value: fr(Math.abs(d), 3), msg: 'el tetraedro es la <b>sexta</b> parte del paralelepípedo (la tercera parte es de una pirámide de base igual a la del paralelepípedo, no la del tetraedro de 4 vértices).' }],
          data: { fig: 'tetra', u, v, w, d },
        };
      }
    },
  });

  /* ===================== 4. Puntos: medio, simétrico, cuarto vértice ===================== */
  G.define({
    id: 'puntos',
    title: 'Puntos: punto medio, simétrico y vértices',
    help: [
      'Punto medio: $M=\\frac{A+B}{2}$ · simétrico de $A$ respecto de $B$: $A^{\\prime}=2B-A$ · paralelogramo $ABCD$: $\\vec{AD}=\\vec{BC}$, luego $D=A+C-B$ · baricentro: $G=\\frac{A+B+C}{3}$.',
      'Ejemplo con $A(1,2,3)$ y $B(3,0,1)$: punto medio $\\left(\\frac{1+3}{2},\\frac{2+0}{2},\\frac{3+1}{2}\\right)=(2,1,2)$. Simétrico de $A$ respecto de $B$: $2(3,0,1)-(1,2,3)=(5,-2,-1)$.',
    ],
    params: [{ key: 'op', label: 'Calcular', options: [['med', 'Punto medio'], ['sim', 'Simétrico'], ['par', 'Cuarto vértice'], ['bar', 'Baricentro']] }],
    generate(p) {
      const A = vrand(-6, 6), B = vrand(-6, 6), C = vrand(-6, 6);
      const fe = (f) => row(f);
      if (p.op === 'med') {
        const r = A.map((x, i) => fr(x + B[i], 2));
        return { prompt: 'Halla el punto medio del segmento ' + i$(ptex('A', A) + ',\\ ' + ptex('B', B)), answer: { kind: 'matrix', label: 'M=', value: fe(r) },
          steps: ['Promedio de las coordenadas: ' + d$('M=\\left(\\frac{' + A[0] + '+(' + B[0] + ')}{2},\\frac{' + A[1] + '+(' + B[1] + ')}{2},\\frac{' + A[2] + '+(' + B[2] + ')}{2}\\right)=(' + r.map(ftex).join(',') + ')')],
          mistakes: [{ value: row(A.map((x, i) => fr(x + B[i]))), msg: 'falta dividir entre 2: el punto medio es $\\frac{A+B}{2}$.' }],
          data: { op: 'med', A, B, r } };
      }
      if (p.op === 'sim') {
        const r = A.map((x, i) => fr(2 * B[i] - x));
        return { prompt: 'Halla el simétrico de ' + i$(ptex('A', A)) + ' respecto de ' + i$(ptex('B', B)), answer: { kind: 'matrix', label: "A'=", value: fe(r) },
          steps: ['' + i$('B') + ' es el punto medio de ' + i$("AA'") + ', luego ' + i$("B=\\frac{A+A'}{2}\\Rightarrow A'=2B-A"), d$("A'=2" + vt(B) + '-' + vt(A) + '=' + vt(r.map((x) => x.n)))],
          mistakes: [{ value: row(A.map((x, i) => fr(x + B[i], 2))), msg: 'eso es el punto medio de $A$ y $B$. El simétrico de $A$ respecto de $B$ es $2B-A$ (está al otro lado de $B$).' }],
          data: { op: 'sim', A, B, r } };
      }
      if (p.op === 'par') {
        const r = A.map((x, i) => fr(x + C[i] - B[i]));
        return { prompt: 'Los puntos ' + i$(ptex('A', A) + ',\\ ' + ptex('B', B) + ',\\ ' + ptex('C', C)) + ' son vértices consecutivos de un paralelogramo ' + i$('ABCD') + '. Halla ' + i$('D') + '.', answer: { kind: 'matrix', label: 'D=', value: fe(r) },
          steps: ['En un paralelogramo ' + i$('ABCD') + ' se cumple ' + i$('\\vec{AD}=\\vec{BC}') + ', luego ' + i$('D=A+\\vec{BC}=A+C-B'), d$('D=' + vt(A) + '+' + vt(C) + '-' + vt(B) + '=' + vt(r.map((x) => x.n)))],
          data: { op: 'par', A, B, C, r } };
      }
      const r = A.map((x, i) => fr(x + B[i] + C[i], 3));
      return { prompt: 'Halla el baricentro del triángulo de vértices ' + i$(ptex('A', A) + ',\\ ' + ptex('B', B) + ',\\ ' + ptex('C', C)), answer: { kind: 'matrix', label: 'G=', value: fe(r) },
        steps: ['El baricentro es el promedio de los tres vértices: ' + d$('G=\\frac{A+B+C}{3}=\\frac{' + vt(add(add(A, B), C)) + '}{3}=(' + r.map(ftex).join(',') + ')')],
        data: { op: 'bar', A, B, C, r } };
    },
  });

  /* ===================== 5. Vectores con parámetro ===================== */
  G.define({
    id: 'vparam',
    title: 'Vectores con parámetro',
    help: [
      'Perpendiculares: $\\vec u\\cdot\\vec v=0$ · paralelos: componentes proporcionales · coplanarios: $[\\vec u,\\vec v,\\vec w]=0$. Se plantea la condición y se despeja $m$.',
      'Ejemplos. Perpendiculares: $\\vec u=(m,2,1)$, $\\vec v=(1,3,-2)$: $m+6-2=0\\Rightarrow m=-4$. Paralelos: $(m,2,4)\\parallel(1,1,2)$: $\\frac m1=\\frac21=\\frac42=2\\Rightarrow m=2$. Coplanarios: se iguala a 0 el determinante de los tres vectores y se resuelve la ecuación en $m$.',
    ],
    params: [{ key: 'tipo', label: 'Condición', options: [['perp', 'Perpendiculares'], ['par', 'Paralelos'], ['cop', 'Coplanarios']] }],
    generate(p) {
      if (p.tipo === 'perp') {
        for (;;) {
          const v = vnz(-4, 4), a = rnd.int(-4, 4), b = rnd.int(-4, 4);
          if (v[0] === 0) continue;
          const s = a * v[1] + b * v[2];
          const m = fr(-s, v[0]);
          return {
            prompt: 'Halla ' + i$('m') + ' para que ' + i$('\\vec u=(m,' + a + ',' + b + ')') + ' y ' + i$('\\vec v=' + vt(v)) + ' sean perpendiculares.',
            answer: { kind: 'number', label: 'm=', value: m },
            steps: ['Perpendiculares ' + i$('\\iff\\vec u\\cdot\\vec v=0') + ': ' + d$('\\vec u\\cdot\\vec v=' + v[0] + 'm+(' + a + ')(' + v[1] + ')+(' + b + ')(' + v[2] + ')=' + v[0] + 'm' + (s < 0 ? s : '+' + s) + '=0'),
              d$('m=' + ftex(m))],
            mistakes: s === 0 ? [] : [{ value: fr(s, v[0]), msg: 'cuidado con el signo al despejar: de $' + v[0] + 'm+' + s + '=0$ sale $m=' + ftex(fr(-s, v[0])) + '$, no $' + ftex(fr(s, v[0])) + '$.' }],
            data: { tipo: 'perp', a, b, v, m },
          };
        }
      }
      if (p.tipo === 'par') {
        for (;;) {
          const v = vnz(-3, 3), k = rnd.pick([-3, -2, -1, 2, 3]);
          if (v[0] === 0 || v[1] === 0 || v[2] === 0) continue;
          const u = scal(k, v);
          return {
            prompt: 'Halla ' + i$('m') + ' para que ' + i$('\\vec u=(m,' + u[1] + ',' + u[2] + ')') + ' y ' + i$('\\vec v=' + vt(v)) + ' sean paralelos.',
            answer: { kind: 'number', label: 'm=', value: fr(u[0]) },
            steps: ['Paralelos ' + i$('\\iff') + ' componentes proporcionales: ' + d$('\\frac{m}{' + v[0] + '}=\\frac{' + u[1] + '}{' + v[1] + '}=\\frac{' + u[2] + '}{' + v[2] + '}=' + k),
              d$('m=' + k + '\\cdot(' + v[0] + ')=' + u[0])],
            data: { tipo: 'par', u, v },
          };
        }
      }
      for (let tries = 0; tries < 20000; tries++) {
        const T = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ({ a: 0, b: rnd.int(-3, 3) })));
        const slots = rnd.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]).slice(0, rnd.pick([1, 2, 2]));
        slots.forEach((s) => { T[Math.floor(s / 3)][s % 3] = { a: rnd.pick([1, 1, -1, 2]), b: rnd.int(-3, 3) }; });
        const cs = L.polyFromDet(T);
        if (cs.some((x) => x.d !== 1)) continue;
        const f = L.factorPoly(cs.map((x) => x.n));
        if (!f || Math.abs(f.lead) > 6) continue;
        const vs = T.map((r) => '(' + r.map(L.entTex).join(',') + ')');
        return {
          prompt: 'Halla los valores de ' + i$('m') + ' para que ' + i$('\\vec u=' + vs[0]) + ', ' + i$('\\vec v=' + vs[1]) + ' y ' + i$('\\vec w=' + vs[2]) + ' sean coplanarios.',
          answer: { kind: 'list', label: 'm=', value: f.roots.map(({ r }) => F(r)) },
          steps: ['Coplanarios ' + i$('\\iff[\\vec u,\\vec v,\\vec w]=0') + ': ' + d$('\\begin{vmatrix}' + T.map((r) => r.map(L.entTex).join('&')).join('\\\\') + '\\end{vmatrix}=' + L.polyTex(cs) + '=' + L.factorTex(f)),
            d$(f.roots.map(({ r }) => 'm=' + r).join('\\ \\text{ o }\\ '))],
          data: { tipo: 'cop', T, roots: f.roots },
        };
      }
      throw new Error('no se pudo generar el ejercicio de coplanarios');
    },
  });

  /* ===================== 6. Operaciones con vectores (entrada) ===================== */
  G.define({
    id: 'voper',
    title: 'Operaciones con vectores',
    help: [
      'Las operaciones se hacen componente a componente: $a\\vec u+b\\vec v=(au_1+bv_1,\\,au_2+bv_2,\\,au_3+bv_3)$. El vector que une $A$ con $B$ es $\\vec{AB}=B-A$ (final menos origen). Módulo: $|\\vec u|=\\sqrt{u_1^2+u_2^2+u_3^2}$. Unitario: $\\vec u/|\\vec u|$.',
      'Ejemplo: $A(1,2,3)$, $B(4,0,1)$: $\\vec{AB}=(4-1,\\,0-2,\\,1-3)=(3,-2,-2)$, con módulo $\\sqrt{9+4+4}=\\sqrt{17}$. Para $\\vec u=(2,3,6)$: $|\\vec u|=\\sqrt{4+9+36}=7$ y el unitario es $\\left(\\frac27,\\frac37,\\frac67\\right)$.',
    ],
    params: [{ key: 'tipo', label: 'Operación', options: [['comb', 'Combinación lineal'], ['vab', 'Vector entre dos puntos'], ['mod', 'Módulo'], ['unit', 'Vector unitario']] }],
    generate(p) {
      if (p.tipo === 'comb') {
        const u = vnz(-4, 4), v = vnz(-4, 4), w = vnz(-4, 4);
        const [a, b, c] = [0, 0, 0].map(() => rnd.pick([-3, -2, -1, 1, 2, 3]));
        const r = u.map((x, i) => a * x + b * v[i] + c * w[i]);
        const cf = (k, n, first) => (k === 1 ? (first ? '' : '+') : k === -1 ? '-' : (k > 0 && !first ? '+' : '') + k) + n;
        const expr = cf(a, '\\vec u', true) + cf(b, '\\vec v', false) + cf(c, '\\vec w', false);
        return {
          prompt: 'Calcula ' + i$(expr) + ' con ' + d$(vtex('u', u) + '\\quad ' + vtex('v', v) + '\\quad ' + vtex('w', w)),
          answer: { kind: 'matrix', label: expr + '=', value: row(r) },
          steps: ['Multiplicamos cada vector por su número: ' + d$(a + '\\vec u=' + vt(scal(a, u)) + '\\quad ' + b + '\\vec v=' + vt(scal(b, v)) + '\\quad ' + c + '\\vec w=' + vt(scal(c, w))), 'Sumamos componente a componente: ' + d$(expr + '=' + vt(r))],
          data: { tipo: 'comb', u, v, w, a, b, c, r },
        };
      }
      if (p.tipo === 'vab') {
        const A = vrand(-6, 6), B = vrand(-6, 6);
        const r = sub(B, A);
        return {
          prompt: 'Halla el vector ' + i$('\\vec{AB}') + ' siendo ' + i$(ptex('A', A) + ',\\ ' + ptex('B', B)),
          answer: { kind: 'matrix', label: '\\vec{AB}=', value: row(r) },
          steps: ['Final menos origen: ' + d$('\\vec{AB}=B-A=' + vt(B) + '-' + vt(A) + '=' + vt(r))],
          mistakes: [{ value: row(sub(A, B)), msg: 'has calculado $A-B=\\vec{BA}$. El vector $\\vec{AB}$ es <b>final menos origen</b>: $B-A$.' }],
          data: { tipo: 'vab', A, B, r },
        };
      }
      const u = pythVec(), nu = isqrt(norm2(u));
      if (p.tipo === 'mod') {
        return {
          prompt: 'Calcula el módulo de ' + i$(vtex('u', u)),
          answer: { kind: 'number', label: '|\\vec u|=', value: fr(nu) },
          steps: ['Raíz de la suma de los cuadrados: ' + d$('|\\vec u|=\\sqrt{' + u.map((x) => '(' + x + ')^2').join('+') + '}=\\sqrt{' + norm2(u) + '}=' + nu)],
          mistakes: [{ value: fr(norm2(u)), msg: 'falta la raíz cuadrada: $|\\vec u|=\\sqrt{u_1^2+u_2^2+u_3^2}$.' }],
          data: { tipo: 'mod', u, nu },
        };
      }
      const r = u.map((x) => fr(x, nu));
      return {
        prompt: 'Halla el vector unitario en la dirección y sentido de ' + i$(vtex('u', u)),
        answer: { kind: 'matrix', label: '\\vec u_0=', value: row(r) },
        steps: ['Módulo: ' + d$('|\\vec u|=\\sqrt{' + norm2(u) + '}=' + nu), 'Dividimos cada componente entre el módulo: ' + d$('\\vec u_0=\\frac{\\vec u}{|\\vec u|}=\\left(' + r.map(ftex).join(',\\ ') + '\\right)')],
        data: { tipo: 'unit', u, nu, r },
      };
    },
  });

  /* ===================== 7. Dependencia lineal y bases ===================== */
  G.define({
    id: 'base',
    title: 'Dependencia lineal y bases',
    help: [
      'Tres vectores de $\\mathbb R^3$ son linealmente independientes (forman una base) si y sólo si su determinante es $\\neq0$. Si $[\\vec u,\\vec v,\\vec w]=0$, uno es combinación de los otros (coplanarios). Las coordenadas de $\\vec w$ en la base $\\{\\vec u,\\vec v,\\vec t\\}$ son los $(a,b,c)$ con $\\vec w=a\\vec u+b\\vec v+c\\vec t$.',
      'Ejemplo: $\\vec u=(1,0,0)$, $\\vec v=(0,1,0)$, $\\vec t=(1,1,1)$ y $\\vec w=(3,2,1)$. Se plantea $(3,2,1)=a(1,0,0)+b(0,1,0)+c(1,1,1)$: $a+c=3$, $b+c=2$, $c=1$. Luego $c=1$, $b=1$, $a=2$: coordenadas $(2,1,1)$.',
    ],
    params: [{ key: 'tipo', label: 'Ejercicio', options: [['li', '¿Forman base?'], ['coord', 'Coordenadas en una base']] }],
    generate(p) {
      if (p.tipo === 'li') {
        const dep = rnd.int(0, 1);
        let u, v, w;
        for (;;) {
          u = vnz(-3, 3); v = vnz(-3, 3);
          if (isZero(cross(u, v))) continue;
          if (dep) { const a = rnd.pick([-2, -1, 1, 2]), b = rnd.pick([-2, -1, 1, 2]); w = add(scal(a, u), scal(b, v)); if (isZero(w) || Math.max(...w.map(Math.abs)) > 8) continue; }
          else { w = vnz(-3, 3); if (det3(u, v, w) === 0) continue; }
          break;
        }
        const d = det3(u, v, w);
        const order = rnd.shuffle([0, 1, 2]);
        const vs = order.map((i) => [u, v, w][i]);
        return {
          prompt: 'Estudia si los vectores ' + d$(vtex('u', vs[0]) + '\\quad ' + vtex('v', vs[1]) + '\\quad ' + vtex('w', vs[2])) + 'son linealmente independientes.',
          answer: { kind: 'choice', options: ['Linealmente independientes (forman una base de $\\mathbb R^3$)', 'Linealmente dependientes'], value: dep },
          steps: ['Calculamos el determinante: ' + d$('[\\vec u,\\vec v,\\vec w]=' + G.mtex(M(vs), 'vmatrix') + '=' + d),
            dep ? 'Vale 0: los vectores son <b>linealmente dependientes</b> (son coplanarios, uno es combinación de los otros), no forman base.' : 'Es distinto de 0: son <b>linealmente independientes</b> y forman una base de $\\mathbb R^3$.'],
          data: { tipo: 'li', vs, dep },
        };
      }
      for (;;) {
        const u = vnz(-2, 2), v = vnz(-2, 2), t = vnz(-2, 2);
        const D = det3(u, v, t);
        if (D === 0 || Math.abs(D) > 12) continue;
        const co = [0, 0, 0].map(() => rnd.int(-3, 3));
        if (co.every((x) => x === 0)) continue;
        const w = add(add(scal(co[0], u), scal(co[1], v)), scal(co[2], t));
        if (Math.max(...w.map(Math.abs)) > 12) continue;
        const cols = [u, v, t];
        const A = [0, 1, 2].map((i) => cols.map((c) => c[i]));
        const dj = [0, 1, 2].map((j) => G.det(M(A.map((r, i) => r.map((x, c) => (c === j ? w[i] : x))))));
        return {
          prompt: 'Comprueba que ' + i$('\\{' + vtex('u', u).replace('\\vec{u}=', '\\vec u=') + ',\\ ' + vtex('v', v).replace('\\vec{v}=', '\\vec v=') + ',\\ ' + vtex('t', t).replace('\\vec{t}=', '\\vec t=') + '\\}') + ' es una base de ' + i$('\\mathbb R^3') + ' y halla las coordenadas de ' + i$(vtex('w', w)) + ' en ella.',
          answer: { kind: 'matrix', label: '(a,b,c)=', value: row(co) },
          steps: [
            'Es base porque el determinante no es 0: ' + d$('[\\vec u,\\vec v,\\vec t]=' + G.mtex(M([u, v, t]), 'vmatrix') + '=' + D),
            'Planteamos ' + i$('\\vec w=a\\vec u+b\\vec v+c\\vec t') + ', es decir, un sistema con los vectores como columnas: ' + d$('\\begin{cases}' + [0, 1, 2].map((i) => coefLine(A[i], w[i])).join('\\\\') + '\\end{cases}'),
            'Por Cramer: ' + d$('a=\\frac{' + dj[0].n + '}{' + D + '},\\quad b=\\frac{' + dj[1].n + '}{' + D + '},\\quad c=\\frac{' + dj[2].n + '}{' + D + '}'),
            'Coordenadas: ' + d$('\\vec w=(' + co.join(',') + ')_B'),
          ],
          data: { tipo: 'coord', u, v, t, w, co },
        };
      }
    },
  });
  const coefLine = (r, rhs) => {
    let out = '';
    ['a', 'b', 'c'].forEach((v, j) => {
      const k = r[j];
      if (k === 0) return;
      out += (k < 0 ? '-' : out ? '+' : '') + (Math.abs(k) === 1 ? '' : Math.abs(k)) + v;
    });
    return (out || '0') + '=' + rhs;
  };

  /* ===================== Gráficas 3D (JSXGraph, ver graficas.js) ===================== */
  const nn = (q) => (q && typeof q === 'object' && 'n' in q ? q.n / q.d : q);
  const seg = (a, b, solid) => ({ a, b, solid });
  function plotDe(id, d) {
    const O = [0, 0, 0];
    let pts = [], segments = [];
    if (id === 'vectorial' || id === 'angulo' || id === 'areas') {
      const vs = [['u', d.u], ['v', d.v], ['w', d.w]].filter(([, x]) => Array.isArray(x) && x.length === 3);
      if (vs.length < 2) return null;
      pts = vs.map(([n, x]) => ({ p: x, label: n }));
      segments = vs.map(([, x]) => seg(O, x, true));
      if (vs.length === 2) {            // paralelogramo / triángulo sobre u y v
        const [u, v] = [vs[0][1], vs[1][1]];
        if (d.fig !== 'tri') segments.push(seg(u, u.map((x, i) => x + v[i])), seg(v, u.map((x, i) => x + v[i])));
        else segments.push(seg(u, v));
      }
    } else if (id === 'puntos') {
      const P = [['A', d.A], ['B', d.B], ['C', d.C], [d.op === 'par' ? 'D' : d.op === 'bar' ? 'G' : d.op === 'med' ? 'M' : "A'", d.r && d.r.map(nn)]].filter(([, x]) => Array.isArray(x));
      pts = P.map(([n, x]) => ({ p: x, label: n }));
      if (d.op === 'med' || d.op === 'sim') segments = [seg(d.A, d.B, true)];
      else if (d.op === 'par') segments = [seg(d.A, d.B, true), seg(d.B, d.C, true), seg(d.C, P[3][1], true), seg(P[3][1], d.A, true)];
      else segments = [seg(d.A, d.B, true), seg(d.B, d.C, true), seg(d.C, d.A, true)];
    } else return null;
    const r = Math.ceil(Math.max(2, ...pts.flatMap((q) => q.p.map(Math.abs)))) + 1;
    return { type: '3d', r, points: pts, segments };
  }
  ['vectorial', 'angulo', 'areas', 'puntos'].forEach((id) => {
    const mod = G.modules[id];
    if (!mod) return;
    const gen = mod.generate;
    mod.generate = (p) => { const ch = gen(p); const pl = plotDe(id, ch.data || {}); if (pl) ch.plot = pl; return ch; };
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
