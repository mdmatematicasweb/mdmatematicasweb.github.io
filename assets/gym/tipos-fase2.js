/* Generadores de ejercicios tipo EBAU — fase 2 (álgebra).
 * Tipos: sistema-plant, sistema-sci, matriz-pot-inv, rango-inv-param.
 */
(function (root) {
  'use strict';
  const X = root.MDExam;
  const G = root.MDGym;
  const L = G.lib, geo = G.geo;
  const { rnd, F, M, fadd, fsub, fmul, fdiv, feq, ftex, mtex, mmul, mpow, mI, meq, det, inverse, rankOf, d$, i$ } = G;
  const { cross } = geo;
  const part = (texto, pts, answer, steps) => ({ texto, pts, answer, steps });

  /* ===================== sistema-plant ===================== */
  X.implementar({
    id: 'sistema-plant',
    generate() {
      const tipo = rnd.pick(['precios', 'edades', 'monedas']);
      const g = G.modules.planteamiento.generate({ tipo });
      const { sol, set } = g.data;
      let extraTxt, extra, extraSteps;
      if (tipo === 'precios') {
        const c = [rnd.int(1, 4), rnd.int(1, 4), rnd.int(1, 3)];
        const nom = (j) => (c[j] === 1 ? set[j].s : set[j].p);
        extra = sol.reduce((s, x, j) => s + c[j] * x, 0);
        extraTxt = '¿Cuánto costaría comprar ' + c[0] + ' ' + nom(0) + ', ' + c[1] + ' ' + nom(1) + ' y ' + c[2] + ' ' + nom(2) + '? (en euros)';
        extraSteps = ['Con los precios ' + i$('x=' + sol[0] + ',\\ y=' + sol[1] + ',\\ z=' + sol[2]) + ': ' + d$(c[0] + '\\cdot' + sol[0] + '+' + c[1] + '\\cdot' + sol[1] + '+' + c[2] + '\\cdot' + sol[2] + '=' + extra)];
      } else if (tipo === 'edades') {
        const k = rnd.int(2, 6);
        extra = sol[0] + sol[1] + sol[2] + 3 * k;
        extraTxt = '¿Cuál será la suma de las edades de los tres hermanos dentro de ' + k + ' años?';
        extraSteps = ['Cada uno tendrá ' + k + ' años más: ' + d$('(' + sol[0] + '+' + k + ')+(' + sol[1] + '+' + k + ')+(' + sol[2] + '+' + k + ')=' + extra)];
      } else {
        extra = 2 * sol[1];
        extraTxt = '¿Cuántos euros hay en total en monedas de 2 €?';
        extraSteps = ['Hay ' + i$('y=' + sol[1]) + ' monedas de 2 €: ' + i$('2\\cdot' + sol[1] + '=' + extra) + ' euros.'];
      }
      return {
        enunciado: g.prompt,
        partes: [
          part('Plantea el sistema de ecuaciones y resuélvelo. Escribe ' + i$('(x,y,z)') + '.', 1.5, g.answer, g.steps),
          part(extraTxt, 1, { kind: 'number', label: '\\text{resultado}=', value: F(extra) }, extraSteps),
        ],
        data: { tipo, sol, extra, A: g.data.A, b: g.data.b },
      };
    },
  });

  /* ===================== sistema-sci ===================== */
  const fLam = (c0, c1) => (c1.n === 0 ? ftex(c0) : (c0.n === 0 ? '' : ftex(c0) + (c1.n < 0 ? '' : '+')) + (c1.n === 1 && c1.d === 1 ? '\\lambda' : c1.n === -1 && c1.d === 1 ? '-\\lambda' : ftex(c1) + '\\lambda'));
  X.implementar({
    id: 'sistema-sci',
    generate() {
      if (rnd.int(0, 1) === 0) return sciNumerico();
      return homogeneo();
    },
  });

  function sciNumerico() {
    for (;;) {
      const s = L.genDeficient(false);
      let pair = null;
      for (let i = 0; i < 3 && !pair; i++) for (let j = i + 1; j < 3 && !pair; j++) {
        if (s.A[i][0] * s.A[j][1] - s.A[j][0] * s.A[i][1] !== 0) pair = [i, j];
      }
      if (!pair) continue;
      const [i, j] = pair;
      const [p1, q1, c1] = s.A[i], [p2, q2, c2] = s.A[j];
      const d1 = s.b[i], d2 = s.b[j];
      const D = p1 * q2 - p2 * q1;
      const x0 = F(d1 * q2 - d2 * q1, D), x1 = F(-(c1 * q2 - c2 * q1), D);
      const y0 = F(p1 * d2 - p2 * d1, D), y1 = F(-(p1 * c2 - p2 * c1), D);
      const lam0 = rnd.pick([-2, -1, 1, 2, 3]);
      const at = (a0, a1) => fadd(a0, fmul(a1, F(lam0)));
      const sol = [at(x0, x1), at(y0, y1), F(lam0)];
      const aug = M(s.A.map((r, k) => r.concat([s.b[k]])));
      return {
        enunciado: 'Considera el sistema ' + d$(L.sysTex(s.A, s.b)),
        partes: [
          part('Calcula el rango de la matriz de coeficientes y el de la matriz ampliada. Escribe ' + i$('(\\operatorname{rg}A,\\ \\operatorname{rg}A^*)') + '.', 0.75, { kind: 'matrix', label: '(\\operatorname{rg}A,\\operatorname{rg}A^*)=', value: [[F(2), F(2)]] },
            ['Escalonando ' + i$('A^*') + ' queda una fila de ceros: ' + i$('\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=' + rankOf(aug)) + ', menor que el número de incógnitas (3): <b>compatible indeterminado</b>.']),
          part('Resuelve el sistema tomando ' + i$('z=\\lambda') + '. Escribe ' + i$('x=x_0+x_1\\lambda') + ' e ' + i$('y=y_0+y_1\\lambda') + ' dando ' + i$('(x_0,x_1,y_0,y_1)') + '.', 1, { kind: 'matrix', label: '(x_0,x_1,y_0,y_1)=', value: [[x0, x1, y0, y1]] },
            ['Nos quedamos con las ecuaciones ' + (i + 1) + 'ª y ' + (j + 1) + 'ª (la otra es combinación de ellas) y pasamos ' + i$('z=\\lambda') + ' al segundo miembro.',
              'Por Cramer: ' + d$('x=' + fLam(x0, x1) + '\\qquad y=' + fLam(y0, y1))]),
          part('Halla la solución del sistema que cumple ' + i$('z=' + lam0) + '.', 0.75, { kind: 'matrix', label: '(x,y,z)=', value: [sol] },
            ['Sustituimos ' + i$('\\lambda=' + lam0) + ': ' + d$('(x,y,z)=(' + sol.map(ftex).join(',\\ ') + ')')]),
        ],
        data: { v: 'sci', A: s.A, b: s.b, x: [x0, x1], y: [y0, y1], lam0, sol },
      };
    }
  }

  function homogeneo() {
    for (let tries = 0; tries < 5000; tries++) {
      const { T, cs, f } = L.genParam3();
      const at = (m) => M(T.map((r) => r.map((e) => e.a * m + e.b)));
      const roots = f.roots.map((q) => q.r);
      const r1 = roots.find((r) => rankOf(at(r)) === 2);
      if (r1 === undefined) continue;
      const A1 = at(r1).map((r) => r.map((x) => x.n));
      // vector núcleo = producto vectorial de dos filas independientes
      let nv = null;
      for (let i = 0; i < 3 && !nv; i++) for (let j = i + 1; j < 3 && !nv; j++) { const c = cross(A1[i], A1[j]); if (c.some((x) => x !== 0)) nv = c; }
      const k = nv.findIndex((x) => x !== 0);
      const sol = nv.map((x) => fdiv(F(x), F(nv[k])));
      const varN = ['x', 'y', 'z'][k];
      const b0 = [0, 0, 0];
      const detTex = '|A|=' + G.mtexStr(T.map((r) => r.map(L.entTex)), 'vmatrix') + '=' + L.polyTex(cs) + '=' + L.factorTex(f);
      return {
        enunciado: 'Considera el sistema homogéneo ' + d$(L.sysTex(T, b0)),
        partes: [
          part('Halla los valores de ' + i$('m') + ' para los que el sistema tiene soluciones distintas de la trivial.', 1, { kind: 'list', label: 'm=', value: roots.map((r) => F(r)) },
            ['Un sistema homogéneo es siempre compatible; tiene soluciones no triviales si y sólo si ' + i$('|A|=0') + ': ' + d$(detTex), i$(roots.map((r) => 'm=' + r).join(',\\ '))]),
          part('Para ' + i$('m=' + r1) + ' calcula el rango de la matriz de coeficientes.', 0.5, { kind: 'number', label: '\\operatorname{rg}(A)=', value: F(2) },
            ['Con ' + i$('m=' + r1) + ': ' + d$('A=' + mtex(M(A1))) + 'Como ' + i$('|A|=0') + ' y hay un menor de orden 2 no nulo, el rango es 2: el sistema tiene infinitas soluciones (una recta).']),
          part('Para ' + i$('m=' + r1) + ', halla la solución del sistema con ' + i$(varN + '=1') + '.', 1, { kind: 'matrix', label: '(x,y,z)=', value: [sol] },
            ['Las soluciones son los múltiplos del producto vectorial de dos filas independientes: ' + d$('\\vec v=' + geo.vt(nv)), 'Escalamos para que ' + i$(varN + '=1') + ': ' + d$('(x,y,z)=(' + sol.map(ftex).join(',\\ ') + ')')]),
        ],
        data: { v: 'hom', T, roots, r1, sol, k },
      };
    }
    throw new Error('homogeneo: sin ejercicio');
  }

  /* ===================== matriz-pot-inv ===================== */
  const BASES = [
    { M: M([[0, 1, 0], [0, 0, 1], [1, 0, 0]]), p: 3, eps: 1 },
    { M: M([[0, -1, 0], [0, 0, -1], [-1, 0, 0]]), p: 3, eps: -1 },
    { M: M([[0, 1, 0], [1, 0, 0], [0, 0, 1]]), p: 2, eps: 1 },
    { M: M([[-1, 0, 0], [0, 0, 1], [0, 1, 0]]), p: 2, eps: 1 },
    { M: M([[0, -1, 0], [1, 0, 0], [0, 0, 1]]), p: 4, eps: 1 },
    { M: M([[0, -1, 0], [1, 0, 0], [0, 0, -1]]), p: 4, eps: 1 },
    { M: M([[0, 1, 0], [-1, -1, 0], [0, 0, 1]]), p: 3, eps: 1 },
    { M: M([[0, 1, 0], [-1, -1, 0], [0, 0, -1]]), p: 6, eps: 1 },
  ];
  X.implementar({
    id: 'matriz-pot-inv',
    generate() {
      for (let tries = 0; tries < 400; tries++) {
        const B = rnd.pick(BASES);
        const P = L.unimodular(3, 3);
        const A = mmul(mmul(P, B.M), inverse(P));
        if (Math.max(...A.map((r) => Math.max(...r.map((x) => Math.abs(x.n))))) > 12) continue;
        // orden real: menor p con A^p = ±I
        let p = 0, eps = 0, Q = A;
        for (let k = 1; k <= 12; k++) {
          if (meq(Q, mI(3))) { p = k; eps = 1; break; }
          if (meq(Q, G.mscale(mI(3), F(-1)))) { p = k; eps = -1; break; }
          Q = mmul(Q, A);
        }
        if (!p) continue;
        const n = rnd.int(20, 120) * 1;
        const q = Math.floor(n / p), r = n % p;
        const An = mpow(A, n), Ainv = inverse(A);
        const Ap = mpow(A, p);
        const showN = n;
        const pot = [1, 2, 3].slice(0, Math.min(p, 3) - 1).map((k) => 'A^{' + (k + 1) + '}=' + mtex(mpow(A, k + 1))).join('\\qquad ');
        return {
          enunciado: 'Considera la matriz ' + d$('A=' + mtex(A)),
          partes: [
            part('Calcula ' + i$('A^{' + p + '}') + ' e indica a qué matriz es igual.', 0.75, { kind: 'choice', options: ['$I$ (la matriz identidad)', '$-I$', 'Ninguna de las dos'], value: eps === 1 ? 0 : 1 },
              ['Calculamos las potencias sucesivas: ' + d$(pot), 'Se obtiene ' + d$('A^{' + p + '}=' + mtex(Ap)) + 'es decir, ' + i$(eps === 1 ? 'A^{' + p + '}=I' : 'A^{' + p + '}=-I') + '.']),
            part('Calcula ' + i$('A^{-1}') + '.', 0.75, { kind: 'matrix', label: 'A^{-1}=', value: Ainv },
              ['Como ' + i$('A^{' + p + '}=' + (eps === 1 ? '' : '-') + 'I') + ', multiplicando por ' + i$('A^{-1}') + ': ' + d$('A^{-1}=' + (eps === 1 ? '' : '-') + 'A^{' + (p - 1) + '}=' + mtex(Ainv))]),
            part('Calcula ' + i$('A^{' + showN + '}') + '.', 1, { kind: 'matrix', label: 'A^{' + showN + '}=', value: An },
              ['Dividimos el exponente entre ' + p + ': ' + i$(showN + '=' + p + '\\cdot' + q + '+' + r) + '.',
                d$('A^{' + showN + '}=(A^{' + p + '})^{' + q + '}\\cdot A^{' + r + '}=' + (eps === 1 || q % 2 === 0 ? '' : '(-1)') + (r === 0 ? 'I' : 'A^{' + r + '}') + '=' + mtex(An))]),
          ],
          data: { A, p, eps, n, An, Ainv },
        };
      }
      throw new Error('matriz-pot-inv: sin ejercicio');
    },
  });

  /* ===================== rango-inv-param ===================== */
  X.implementar({
    id: 'rango-inv-param',
    generate() {
      for (let tries = 0; tries < 200; tries++) {
        const g = G.modules.rangoparam.generate({ tipo: rnd.pick(['mat', 'g1', 'g2', 'g3']) });
        const T = g.data.T;
        const roots = g.data.roots.map((q) => q.r);
        const at = (m) => M(T.map((r) => r.map((e) => e.a * m + e.b)));
        const cand = [-3, -2, -1, 0, 1, 2, 3].filter((m) => !roots.includes(m));
        if (!cand.length) continue;
        const m0 = rnd.pick(cand);
        const A0 = at(m0);
        const Ai = inverse(A0);
        return {
          enunciado: 'Considera la matriz ' + i$('A=' + G.mtexStr(T.map((r) => r.map(L.entTex)))) + '.',
          partes: [
            part('Halla el rango de ' + i$('A') + ' según los valores de ' + i$('m') + '. Escribe primero los valores críticos de menor a mayor y después el rango en cada caso, en el mismo orden, y para el resto de valores de ' + i$('m') + '.', 1.25, g.answer, g.steps),
            part('Para ' + i$('m=' + m0) + ', calcula la inversa de ' + i$('A') + '.', 1.25, { kind: 'matrix', label: 'A^{-1}=', value: Ai },
              ['Con ' + i$('m=' + m0) + ': ' + d$('A=' + mtex(A0))].concat(L.invSteps(A0, 'A'))),
          ],
          data: { T, roots, m0, A0, Ai, ranks: g.data.ranks },
        };
      }
      throw new Error('rango-inv-param: sin ejercicio');
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
