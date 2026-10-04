/* Simulacro PAU CCSS — generadores del ejercicio 1 (álgebra, 3 puntos): ecuación matricial, sistema matricial 3×3,
 * problema de planteamiento (sistema 3×3) y programación lineal. Verificadores independientes: tests/verify-ccss-algebra.js.
 * Requiere gym.js, examen-ccss.js y ccss-algebra.js (helpers de programación lineal en G.ccss).
 */
(function (root) {
  'use strict';
  const G = root.MDGym, X = root.MDExamCCSS;
  const { rnd, F, M, ftex, d$, i$, fstr } = G;
  const part = (texto, pts, answer, steps) => ({ texto, pts, answer, steps });
  const mt = (A) => G.mtex(A);
  const mtn = (rows) => G.mtex(M(rows));
  const idMat = (n) => M(Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))));
  const col = (xs) => M(xs.map((x) => [x]));

  /* ===================== Ecuación matricial ===================== */
  X.implementar({
    id: 'ec-matricial',
    generate() {
      const forma = rnd.pick(['ax', 'xa', 'ax2']);
      let A, d;
      do {
        A = Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd.int(-3, 3)));
        d = G.det(M(A));
      } while (d.n === 0 || Math.abs(d.n) > 3 || A.flat().filter((x) => x === 0).length > 1);
      const rm = (lo, hi) => Array.from({ length: 2 }, () => Array.from({ length: 2 }, () => rnd.int(lo, hi)));
      let Xs, B;
      do { Xs = rm(-3, 4); } while (Xs.flat().every((x) => x === 0) || Xs.flat().filter((x) => x === 0).length > 2);
      B = rm(-4, 4);
      const MA = M(A), MX = M(Xs), MB = M(B);
      let C, eq, despeje, Xpasos;
      const Ai = G.inverse(MA);
      if (forma === 'ax') {
        C = G.madd(G.mmul(MA, MX), MB);
        eq = 'A\\cdot X+B=C';
        despeje = 'A\\cdot X=C-B\\ \\Rightarrow\\ X=A^{-1}\\,(C-B)';
        const CB = G.msub(C, MB);
        Xpasos = [d$('C-B=' + mt(C) + '-' + mt(MB) + '=' + mt(CB)), d$('X=A^{-1}(C-B)=' + mt(Ai) + mt(CB) + '=' + mt(MX))];
      } else if (forma === 'xa') {
        C = G.msub(G.mmul(MX, MA), MB);
        eq = 'X\\cdot A-B=C';
        despeje = 'X\\cdot A=C+B\\ \\Rightarrow\\ X=(C+B)\\,A^{-1}\\ \\text{(la inversa va a la derecha)}';
        const CB = G.madd(C, MB);
        Xpasos = [d$('C+B=' + mt(C) + '+' + mt(MB) + '=' + mt(CB)), d$('X=(C+B)A^{-1}=' + mt(CB) + mt(Ai) + '=' + mt(MX))];
      } else {
        C = G.msub(G.mmul(MA, MX), G.mscale(MB, F(2)));
        eq = 'A\\cdot X-2B=C';
        despeje = 'A\\cdot X=C+2B\\ \\Rightarrow\\ X=A^{-1}\\,(C+2B)';
        const CB = G.madd(C, G.mscale(MB, F(2)));
        Xpasos = [d$('C+2B=' + mt(C) + '+' + mt(G.mscale(MB, F(2))) + '=' + mt(CB)), d$('X=A^{-1}(C+2B)=' + mt(Ai) + mt(CB) + '=' + mt(MX))];
      }
      const adj = G.mtex(M([[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]]));
      const sInv = [
        'Matriz de adjuntos traspuesta (se intercambian los elementos de la diagonal y se cambia el signo de los otros dos): ' + d$('\\mathrm{Adj}(A)^t=' + adj),
        d$('A^{-1}=\\dfrac{1}{|A|}\\,\\mathrm{Adj}(A)^t=\\dfrac{1}{' + d.n + '}' + adj + '=' + mt(Ai)),
      ];
      return {
        enunciado: 'Se consideran las matrices ' + d$('A=' + mtn(A) + ',\\qquad B=' + mtn(B) + ',\\qquad C=' + mt(C)) + 'y la ecuación matricial ' + i$(eq) + '.',
        partes: [
          part('Calcula el determinante de ' + i$('A') + ' y justifica que ' + i$('A') + ' tiene inversa.', 0.5,
            { kind: 'number', label: '|A|=', value: d }, [d$('|A|=' + A[0][0] + '\\cdot' + (A[1][1] < 0 ? '(' + A[1][1] + ')' : A[1][1]) + '-' + (A[0][1] < 0 ? '(' + A[0][1] + ')' : A[0][1]) + '\\cdot' + (A[1][0] < 0 ? '(' + A[1][0] + ')' : A[1][0]) + '=' + d.n), 'Como ' + i$('|A|\\neq0') + ', existe ' + i$('A^{-1}') + '.']),
          part('Calcula la matriz inversa ' + i$('A^{-1}') + '.', 1, { kind: 'matrix', label: 'A^{-1}=', value: Ai }, sInv),
          part('Resuelve la ecuación matricial y halla la matriz ' + i$('X') + '.', 1.5, { kind: 'matrix', label: 'X=', value: MX },
            ['Despejamos ' + i$('X') + ': ' + d$(despeje)].concat(Xpasos)),
        ],
        data: { forma, A, B, C: C.map((r) => r.map((x) => x.n)), Xs, det: d.n },
      };
    },
  });

  /* ===================== Sistema en forma matricial 3×3 ===================== */
  X.implementar({
    id: 'sis-matricial',
    generate() {
      const cx = rnd.pick(G.ccss.SIS_CTX);
      let A, d;
      do { A = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => rnd.int(0, 3))); d = G.det(M(A)); }
      while (d.n === 0 || Math.abs(d.n) > 6 || A.some((r) => r.every((x) => x === 0)) || A.flat().filter((x) => x === 0).length > 3);
      const Xs = [rnd.int(1, 8), rnd.int(1, 8), rnd.int(1, 8)];
      const B = A.map((r) => r.reduce((t, x, k) => t + x * Xs[k], 0));
      const Ai = G.inverse(M(A));
      const Xm = G.mmul(Ai, col(B));
      return {
        enunciado: cx.t + ' En ' + i$('A') + ', la fila ' + i$('i') + ' corresponde a una de las ' + cx.f + ' y la columna ' + i$('j') + ' a un producto: ' + i$('a_{ij}') + ' es la cantidad (en ' + cx.u + ') que necesita una unidad del producto ' + i$('j') + '. ' + i$('B') + ' recoge la cantidad disponible (en ' + cx.u + ') de cada una:'
          + d$('A=' + mtn(A) + ',\\qquad B=' + mtn(B.map((x) => [x]))) + 'Se emplea todo lo disponible, de modo que ' + i$('A\\cdot X=B') + ', donde ' + i$('X') + ' son las ' + cx.x + '.',
        partes: [
          part('Calcula ' + i$('|A|') + ' y comprueba que el sistema tiene solución única.', 0.5, { kind: 'number', label: '|A|=', value: d },
            [d$('|A|=' + d.n + '\\neq0'), 'Como el determinante no es nulo, ' + i$('A') + ' tiene inversa y el sistema es compatible determinado.']),
          part('Calcula la matriz inversa ' + i$('A^{-1}') + '.', 1.5, { kind: 'matrix', label: 'A^{-1}=', value: Ai },
            [d$('A^{-1}=\\dfrac{1}{|A|}\\,\\mathrm{Adj}(A)^t=\\dfrac{1}{' + d.n + '}\\,\\mathrm{Adj}(A)^t=' + mt(Ai))]),
          part('Resuelve el sistema: halla ' + i$('X=A^{-1}B') + '.', 1, { kind: 'matrix', label: 'X=', value: Xm },
            [d$('X=A^{-1}B=' + mt(Ai) + mtn(B.map((x) => [x])) + '=' + mt(Xm))]),
        ],
        data: { A, B, Xs, det: d.n },
      };
    },
  });

  /* ===================== Problema de planteamiento ===================== */
  const PLANT = [
    { t: 'Un cine vende entradas de tres tipos: infantil ($x$), de adulto ($y$) y de jubilado ($z$).', u: 'entradas', its: ['entradas infantiles', 'entradas de adulto', 'entradas de jubilado'], pr: [[3, 5], [7, 10], [4, 6]], unid: '€' },
    { t: 'Una frutería prepara cajas de tres frutas: manzanas ($x$), peras ($y$) y naranjas ($z$).', u: 'cajas', its: ['cajas de manzanas', 'cajas de peras', 'cajas de naranjas'], pr: [[4, 6], [5, 8], [3, 5]], unid: '€' },
    { t: 'Una cafetería sirve tres menús: básico ($x$), completo ($y$) y especial ($z$).', u: 'menús', its: ['menús básicos', 'menús completos', 'menús especiales'], pr: [[8, 10], [11, 14], [15, 20]], unid: '€' },
  ];
  const NOMB = ['x', 'y', 'z'];
  X.implementar({
    id: 'sistema-plant',
    generate() {
      for (;;) {
        const cx = rnd.pick(PLANT);
        const k = rnd.pick([2, 3]);
        const tipo = rnd.int(0, 2);          // 0: x=k·y   1: y=k·z   2: z=k·x
        const a = rnd.int(2, 8), b = rnd.int(3, 14);
        const sol = tipo === 0 ? [k * a, a, b] : tipo === 1 ? [b, k * a, a] : [a, b, k * a];
        const pr = cx.pr.map(([lo, hi]) => rnd.int(lo, hi));
        if (new Set(pr).size < 3) continue;
        const N = sol[0] + sol[1] + sol[2], T = pr.reduce((s, p, i) => s + p * sol[i], 0);
        const rel = tipo === 0 ? [1, -k, 0] : tipo === 1 ? [0, 1, -k] : [-k, 0, 1];
        const mayor = tipo === 0 ? 0 : tipo === 1 ? 1 : 2, menor = tipo === 0 ? 1 : tipo === 1 ? 2 : 0;
        const A = [[1, 1, 1], pr, rel], bb = [N, T, 0];
        if (G.det(M(A)).n === 0) continue;
        const relTxt = 'hay ' + (k === 2 ? 'el doble' : 'el triple') + ' de ' + cx.its[mayor] + ' que de ' + cx.its[menor];
        const ecRel = NOMB[mayor] + '=' + k + NOMB[menor];
        // reducción: se sustituye la variable "mayor" por k·menor
        const t3 = [0, 1, 2].find((i) => i !== mayor && i !== menor);
        const c1 = [k + 1, 1], c2 = [pr[mayor] * k + pr[menor], pr[t3]];            // coeficientes de (menor, t3)
        const sMenor = sol[menor], sT3 = sol[t3];
        const solM = G.mmul(G.inverse(M(A)), col(bb));
        const termino = (c, v) => (c === 1 ? '' : c) + v;
        const eqRed = (cs, rhs) => termino(cs[0], NOMB[menor]) + '+' + termino(cs[1], NOMB[t3]) + '=' + rhs;
        const dinero = pr[1] * sol[1];
        return {
          enunciado: cx.t + ' En total se han vendido ' + N + ' ' + cx.u + ' y se han recaudado ' + T + ' €. Los precios son ' + pr.map((p, i) => p + ' € (' + cx.its[i] + ')').join(', ') + '. Además, ' + relTxt + '.',
          partes: [
            part('Plantea el sistema de ecuaciones y escribe su matriz ampliada fila a fila: fila 1 (número de ' + cx.u + '), fila 2 (recaudación) y fila 3 (la relación entre las incógnitas con todos los términos a la izquierda, ' + i$(NOMB[mayor] + '-' + k + NOMB[menor] + '=0') + '; vale cualquier múltiplo de esa fila).', 1,
              { kind: 'multi', parts: [{ kind: 'matrix', label: 'F_1', value: M([[1, 1, 1, N]]), colLabels: ['x', 'y', 'z', 'b'] }, { kind: 'matrix', label: 'F_2', value: M([[pr[0], pr[1], pr[2], T]]), colLabels: ['x', 'y', 'z', 'b'] }, { kind: 'matrix', label: 'F_3', value: M([rel.concat([0])]), colLabels: ['x', 'y', 'z', 'b'], proportional: true }] },
              ['Incógnitas: ' + i$('x') + ', ' + i$('y') + ', ' + i$('z') + ' (número de ' + cx.u + ' de cada tipo).',
                d$('\\begin{cases}x+y+z=' + N + '\\\\ ' + pr.map((p, i) => p + NOMB[i]).join('+') + '=' + T + '\\\\ ' + ecRel + '\\end{cases}')]),
            part('Resuelve el sistema.', 1.5, { kind: 'matrix', label: 'X=', value: solM },
              ['Sustituimos ' + i$(ecRel) + ' en las otras dos ecuaciones: ' + d$('\\begin{cases}' + eqRed(c1, N) + '\\\\ ' + eqRed(c2, T) + '\\end{cases}'),
                'Resolviendo por reducción: ' + i$(NOMB[menor] + '=' + sMenor) + ', ' + i$(NOMB[t3] + '=' + sT3) + '.',
                'Y ' + i$(NOMB[mayor] + '=' + k + '\\cdot' + sMenor + '=' + sol[mayor]) + '. Solución: ' + i$('(x,y,z)=(' + sol.join(',\\ ') + ')') + '.']),
            part('¿Cuánto dinero se ha recaudado con la venta de ' + cx.its[1] + '?', 0.5, { kind: 'number', label: '\\text{€}=', value: F(dinero) },
              [d$(pr[1] + '\\cdot' + sol[1] + '=' + dinero + '\\ \\text{€}')]),
          ],
          data: { A, b: bb, sol, pr, N, T, k, tipo, dinero },
        };
      }
    },
  });

  /* ===================== Programación lineal ===================== */
  X.implementar({
    id: 'pl-problema',
    generate() {
      const C = G.ccss;
      const kind = rnd.pick(['max', 'max', 'min']);
      let R, o;
      do { R = C.genRegion(kind); o = C.pickObj(R, kind); } while (!o);
      const ctx = rnd.pick(kind === 'max' ? C.MAXCTX : C.MINCTX);
      const conTxt = R.cons.map((k, i) => {
        if (kind === 'max') {
          if (k.b === 0) return 'se pueden vender como mucho ' + k.c / k.a + ' unidades de ' + ctx.a;
          if (k.a === 0) return 'se pueden vender como mucho ' + k.c / k.b + ' unidades de ' + ctx.b;
          return ctx.sa + ' necesita ' + k.a + ' y ' + ctx.sb + ' necesita ' + k.b + ' ' + ctx.r[i % 2] + ', y se dispone de ' + k.c + ' ' + ctx.r[i % 2];
        }
        return 'cada kg de ' + ctx.a + ' aporta ' + k.a + (k.a === 1 ? ' unidad' : ' unidades') + ' de ' + ctx.r[i % 2] + ' y cada kg de ' + ctx.b + ' aporta ' + k.b + ', y se necesitan al menos ' + k.c + ' unidades';
      });
      const enun = kind === 'max'
        ? 'Un negocio fabrica ' + ctx.a + ' ($x$ unidades) y ' + ctx.b + ' ($y$ unidades). Restricciones: ' + conTxt.join('; ') + '. Cada unidad de ' + ctx.a + ' deja ' + o.p + ' € de beneficio y cada unidad de ' + ctx.b + ', ' + o.q + ' €.'
        : 'Se mezclan $x$ kg de ' + ctx.a + ' y $y$ kg de ' + ctx.b + '. Restricciones: ' + conTxt.join('; ') + '. El kg de ' + ctx.a + ' cuesta ' + o.p + ' € y el de ' + ctx.b + ', ' + o.q + ' €.';
      const opt = R.V[o.k];
      const palabra = kind === 'max' ? 'máximo' : 'mínimo';
      const plan = 'Función objetivo (' + (kind === 'max' ? 'maximizar el beneficio' : 'minimizar el coste') + '): ' + i$('F(x,y)=' + C.objTex(o)) + '. Restricciones: ' + C.restrTxt(R.cons) + '.';
      return {
        enunciado: enun + ' Se quiere ' + (kind === 'max' ? 'maximizar el beneficio' : 'minimizar el coste') + '.',
        partes: [
          part('Escribe la función objetivo y las restricciones, y calcula los vértices de la región factible. <small>(Escríbelos de menor a mayor ' + i$('x') + '; si dos tienen la misma ' + i$('x') + ', de menor a mayor ' + i$('y') + '.)</small>', 1,
            { kind: 'matrix', value: R.V.map((v) => [v.x, v.y]), colLabels: ['x', 'y'] }, [plan].concat(C.vertexSteps(R))),
          part('¿En qué punto se alcanza el ' + palabra + '?', 1, { kind: 'multi', parts: [{ kind: 'number', label: 'x=', value: opt.x }, { kind: 'number', label: 'y=', value: opt.y }] }, C.evalSteps(R, o, kind)),
          part('¿Cuál es el valor ' + (kind === 'max' ? 'máximo del beneficio' : 'mínimo del coste') + '?', 1, { kind: 'number', label: 'F=', value: F(o.best) },
            ['Valor óptimo: ' + i$('F' + C.ptTex(opt) + '=' + o.best) + (kind === 'max' ? ' € de beneficio.' : ' € de coste.')]),
        ],
        data: { tipo: kind, cons: R.cons, p: o.p, q: o.q, best: o.best, x: opt.x.n / opt.x.d, y: opt.y.n / opt.y.d, V: R.V.map((v) => [v.x.n / v.x.d, v.y.n / v.y.d]) },
      };
    },
  });
  X.grafica('pl-problema', (d) => {
    const C = G.ccss;
    const V = d.V.map((v) => ({ x: F(v[0]), y: F(v[1]) }));
    return C.planPL({ cons: d.cons, V }, [{ x: d.x, y: d.y, label: 'óptimo' }]);
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
