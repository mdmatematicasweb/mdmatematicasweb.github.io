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
    tip: '$\\vec u\\cdot\\vec v=u_1v_1+u_2v_2+u_3v_3$ · $\\vec u\\times\\vec v$ = determinante con $\\vec i,\\vec j,\\vec k$ · $[\\vec u,\\vec v,\\vec w]=\\det$ de las tres filas.',
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
    tip: '$\\cos\\alpha=\\dfrac{\\vec u\\cdot\\vec v}{|\\vec u|\\,|\\vec v|}$. Aquí los módulos salen enteros.',
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
        data: { u, v, nu, nv },
      };
    },
  });

  /* ===================== 3. Áreas y volúmenes ===================== */
  G.define({
    id: 'areas',
    title: 'Áreas y volúmenes',
    tip: 'Área del paralelogramo $=|\\vec u\\times\\vec v|$ · triángulo: la mitad · volumen del paralelepípedo $=|[\\vec u,\\vec v,\\vec w]|$ · tetraedro: la sexta parte.',
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
              data: { fig: 'par', u, v, n },
            };
          }
          const B = add(A, u), C = add(A, v);
          return {
            prompt: 'Halla el área del triángulo de vértices ' + i$(ptex('A', A) + ',\\ ' + ptex('B', B) + ',\\ ' + ptex('C', C)),
            answer: { kind: 'number', label: '\\text{Área}=', value: fr(n, 2) },
            steps: ['Vectores de los lados: ' + d$('\\vec{AB}=' + vt(u) + '\\qquad \\vec{AC}=' + vt(v)), crossTex.replace('\\vec u\\times\\vec v', '\\vec{AB}\\times\\vec{AC}'), modTex.replace(/\\vec u\\times\\vec v/, '\\vec{AB}\\times\\vec{AC}'),
              'El triángulo es la mitad del paralelogramo: ' + d$('\\text{Área}=\\frac{' + n + '}{2}=' + ftex(fr(n, 2)))],
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
          data: { fig: 'tetra', u, v, w, d },
        };
      }
    },
  });

  /* ===================== 4. Puntos: medio, simétrico, cuarto vértice ===================== */
  G.define({
    id: 'puntos',
    title: 'Puntos: punto medio, simétrico y vértices',
    tip: 'Punto medio: $\\frac{A+B}{2}$ · simétrico de $A$ respecto de $B$: $2B-A$ · paralelogramo $ABCD$: $D=A+\\vec{BC}=A+C-B$.',
    params: [{ key: 'op', label: 'Calcular', options: [['med', 'Punto medio'], ['sim', 'Simétrico'], ['par', 'Cuarto vértice'], ['bar', 'Baricentro']] }],
    generate(p) {
      const A = vrand(-6, 6), B = vrand(-6, 6), C = vrand(-6, 6);
      const fe = (f) => row(f);
      if (p.op === 'med') {
        const r = A.map((x, i) => fr(x + B[i], 2));
        return { prompt: 'Halla el punto medio del segmento ' + i$(ptex('A', A) + ',\\ ' + ptex('B', B)), answer: { kind: 'matrix', label: 'M=', value: fe(r) },
          steps: ['Promedio de las coordenadas: ' + d$('M=\\left(\\frac{' + A[0] + '+(' + B[0] + ')}{2},\\frac{' + A[1] + '+(' + B[1] + ')}{2},\\frac{' + A[2] + '+(' + B[2] + ')}{2}\\right)=(' + r.map(ftex).join(',') + ')')],
          data: { op: 'med', A, B, r } };
      }
      if (p.op === 'sim') {
        const r = A.map((x, i) => fr(2 * B[i] - x));
        return { prompt: 'Halla el simétrico de ' + i$(ptex('A', A)) + ' respecto de ' + i$(ptex('B', B)), answer: { kind: 'matrix', label: "A'=", value: fe(r) },
          steps: ['' + i$('B') + ' es el punto medio de ' + i$("AA'") + ', luego ' + i$("B=\\frac{A+A'}{2}\\Rightarrow A'=2B-A"), d$("A'=2" + vt(B) + '-' + vt(A) + '=' + vt(r.map((x) => x.n)))],
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
    tip: 'Perpendiculares: $\\vec u\\cdot\\vec v=0$ · paralelos: componentes proporcionales · coplanarios: $[\\vec u,\\vec v,\\vec w]=0$.',
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
})(typeof globalThis !== 'undefined' ? globalThis : this);
