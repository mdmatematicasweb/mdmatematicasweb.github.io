/* Generadores de ejercicios tipo EBAU — fase 1.
 * Tipos: sistema-param, ec-matricial, det-prop, rectas-posicion, simetrico, tangente-normal, primitiva.
 * Cada generate() devuelve {enunciado, partes:[{texto, pts, answer, steps}], data}. Los apartados suman 2,5.
 */
(function (root) {
  'use strict';
  const X = root.MDExam;
  const G = root.MDGym;
  const L = G.lib, geo = G.geo;
  const { rnd, F, M, fadd, fsub, fmul, fdiv, fneg, feq, ftex, ftexp, mtex, mmul, madd, mI, det, inverse, rankOf, d$, i$ } = G;
  const { dot, cross, sub, add, scal, norm2, isqrt, vrand, vnz, vt, ptex, pythVec, fr, row } = geo;

  const part = (texto, pts, answer, steps) => ({ texto, pts, answer, steps });

  /* ===================== sistema-param ===================== */
  X.implementar({
    id: 'sistema-param',
    generate() {
      const { T, cs, f } = L.genParam3();
      const b = Array.from({ length: 3 }, () => rnd.int(-5, 5));
      const at = (m) => M(T.map((r) => r.map((e) => e.a * m + e.b)));
      const aug = (m) => M(at(m).map((r, i) => r.map((x) => x.n).concat([b[i]])));
      const roots = f.roots.map((q) => q.r);
      const r1 = roots[0];
      const t1 = L.cls(rankOf(at(r1)), rankOf(aug(r1)), 3);
      // valor no crítico para resolver
      const m0 = rnd.pick([-3, -2, -1, 0, 1, 2, 3, 4].filter((m) => !roots.includes(m)));
      const A0 = at(m0), D0 = det(A0);
      const vs = ['x', 'y', 'z'];
      const sol = vs.map((_, j) => fdiv(det(M(A0.map((r, i) => r.map((x, c) => (c === j ? F(b[i]) : x))))), D0));
      const dtex = '|A|=\\begin{vmatrix}' + T.map((r) => r.map(L.entTex).join('&')).join('\\\\') + '\\end{vmatrix}=' + L.polyTex(cs) + '=' + L.factorTex(f);
      const stepsA = ['Determinante de la matriz de coeficientes: ' + d$(dtex), 'Se anula en ' + i$(roots.map((r) => 'm=' + r).join(',\\ ')) + '. Para los demás valores de ' + i$('m') + ' el sistema es compatible determinado.'];
      const stepsB = ['Para ' + i$('m=' + r1) + ' tenemos ' + d$('A^*=' + L.augTex(aug(r1).map((r) => r.map((x) => x.n)), 3)),
        i$('\\operatorname{rg}(A)=' + rankOf(at(r1)) + '\\ ') + (t1 === 2 ? 'y ' + i$('\\operatorname{rg}(A^*)=' + rankOf(aug(r1)) + ' \\neq \\operatorname{rg}(A)') + ': incompatible.' : 'igual al de ' + i$('A^*') + ' y menor que 3: compatible indeterminado.')];
      const stepsC = ['Para ' + i$('m=' + m0) + ' el sistema es compatible determinado (' + i$('|A|=' + ftex(D0) + '\\neq0') + '). Por Cramer:'].concat(L.cramerSteps(A0.map((r) => r.map((x) => x.n)), b, vs));
      return {
        enunciado: 'Considera el sistema ' + d$(L.sysTex(T, b)),
        partes: [
          part('Halla los valores de ' + i$('m') + ' para los que el sistema <b>no</b> es compatible determinado.', 1, { kind: 'list', label: 'm=', value: roots.map((r) => F(r)) }, stepsA),
          part('Clasifica el sistema para ' + i$('m=' + r1) + '.', 0.75, { kind: 'choice', options: L.SYS_LABELS, value: t1 }, stepsB),
          part('Resuelve el sistema para ' + i$('m=' + m0) + '.', 0.75, { kind: 'matrix', label: '(x,y,z)=', value: [sol] }, stepsC),
        ],
        data: { T, b, roots, r1, t1, m0, sol },
      };
    },
  });

  /* ===================== ec-matricial ===================== */
  X.implementar({
    id: 'ec-matricial',
    generate() {
      for (let tries = 0; tries < 5000; tries++) {
        const { T, cs, f } = L.genParam3();
        const at = (m) => M(T.map((r) => r.map((e) => e.a * m + e.b)));
        const roots = f.roots.map((q) => q.r);
        const tipo = rnd.pick(['ax', 'axx', 'xa']);
        const cand = [-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((m) => !roots.includes(m) && (tipo !== 'axx' || det(madd(at(m), mI(3))).n !== 0));
        if (!cand.length) continue;
        const m0 = rnd.pick(cand);
        const A0 = at(m0);
        const Xs = L.randMat(3, 3, -2, 2);
        const P = tipo === 'axx' ? madd(A0, mI(3)) : A0;
        const B = tipo === 'xa' ? mmul(Xs, P) : mmul(P, Xs);
        const eqTex = tipo === 'ax' ? 'A\\,X=B' : tipo === 'axx' ? 'A\\,X+X=B' : 'X\\,A=B';
        const Pi = inverse(P);
        const despeje = tipo === 'ax' ? 'X=A^{-1}B' : tipo === 'axx' ? '(A+I)X=B\\ \\Rightarrow\\ X=(A+I)^{-1}B' : 'X=BA^{-1}';
        const prodTex = tipo === 'xa' ? mtex(B) + mtex(Pi) : mtex(Pi) + mtex(B);
        return {
          enunciado: 'Considera la matriz ' + i$('A=' + G.mtexStr(T.map((r) => r.map(L.entTex)))) + '.',
          partes: [
            part('Halla los valores de ' + i$('m') + ' para los que ' + i$('A') + ' <b>no</b> tiene inversa.', 1, { kind: 'list', label: 'm=', value: roots.map((r) => F(r)) },
              ['Una matriz no tiene inversa si su determinante es 0: ' + d$('|A|=' + G.mtexStr(T.map((r) => r.map(L.entTex)), 'vmatrix') + '=' + L.polyTex(cs) + '=' + L.factorTex(f)), i$(roots.map((r) => 'm=' + r).join(',\\ '))]),
            part('Para ' + i$('m=' + m0) + ' y ' + i$('B=' + mtex(B)) + ', resuelve la ecuación ' + i$(eqTex) + '.', 1.5, { kind: 'matrix', label: 'X=', value: Xs },
              ['Con ' + i$('m=' + m0) + ': ' + d$('A=' + mtex(A0)), 'Despejamos: ' + d$(despeje)].concat(L.invSteps(P, tipo === 'axx' ? 'A+I' : 'A'), ['Multiplicamos: ' + d$('X=' + prodTex + '=' + mtex(Xs))])),
          ],
          data: { T, roots, tipo, m0, A0, B, Xs },
        };
      }
      throw new Error('ec-matricial: sin ejercicio');
    },
  });

  /* ===================== det-prop ===================== */
  X.implementar({
    id: 'det-prop',
    generate() {
      const a = G.modules.filas.generate({});
      const b = G.modules.propiedades.generate({ n: '3', nivel: String(rnd.int(2, 3)), frac: 'no' });
      return {
        enunciado: 'Trabaja con matrices cuadradas y sus determinantes.',
        partes: [
          part(a.prompt, 1.5, a.answer, a.steps),
          part(b.prompt, 1, b.answer, b.steps),
        ],
        data: { a: a.data, b: b.data },
      };
    },
  });

  /* ===================== rectas-posicion ===================== */
  X.implementar({
    id: 'rectas-posicion',
    generate() {
      const shift = (v, p) => (p === 0 ? v : p > 0 ? v + '-' + p : v + '+' + (-p));
      const nz = () => rnd.pick([-3, -2, -1, 1, 2, 3]);
      for (;;) {
        const u = [nz(), nz(), nz()], v = vnz(-2, 2);
        const n = cross(u, v);
        if (geo.isZero(n)) continue;
        const k = rnd.int(0, 2);
        const e = [0, 0, 0]; e[k] = 1;
        if (dot(e, n) === 0) continue;
        const I = vrand(-4, 4);
        const t0 = rnd.pick([-2, -1, 1, 2]), s0 = rnd.pick([-2, -1, 1, 2]), a0 = rnd.pick([-3, -2, -1, 1, 2, 3]);
        const P = sub(I, scal(t0, u));
        const Q0 = sub(sub(I, scal(s0, v)), scal(a0, e));
        const PQ0 = sub(Q0, P);
        const c1 = dot(e, n), c0 = dot(PQ0, n);
        if (c1 * a0 + c0 !== 0) continue;           // coherencia interna
        // recta s en paramétricas con a
        const coord = (j) => {
          const parts = [];
          if (Q0[j] !== 0) parts.push(String(Q0[j]));
          if (j === k) parts.push((parts.length ? '+' : '') + 'a');
          if (v[j] !== 0) parts.push((v[j] < 0 ? '-' : parts.length ? '+' : '') + (Math.abs(v[j]) === 1 ? '' : Math.abs(v[j])) + '\\mu');
          return parts.join('') || '0';
        };
        const rTex = 'r\\equiv\\dfrac{' + shift('x', P[0]) + '}{' + u[0] + '}=\\dfrac{' + shift('y', P[1]) + '}{' + u[1] + '}=\\dfrac{' + shift('z', P[2]) + '}{' + u[2] + '}';
        const sTex = 's\\equiv\\begin{cases}x=' + coord(0) + '\\\\y=' + coord(1) + '\\\\z=' + coord(2) + '\\end{cases}';
        const pqStr = [0, 1, 2].map((j) => L.entTex({ a: j === k ? 1 : 0, b: PQ0[j] }));
        const detTex = G.mtexStr([u.map(String), v.map(String), pqStr], 'vmatrix');
        const lin = (c1 < 0 ? '(' + c1 + ')' : c1) + 'a' + (c0 < 0 ? '' : '+') + c0;
        return {
          enunciado: 'Considera las rectas ' + d$(rTex + '\\qquad\\text{y}\\qquad ' + sTex),
          partes: [
            part('Calcula el valor de ' + i$('a') + ' para que las rectas ' + i$('r') + ' y ' + i$('s') + ' se corten.', 1.5, { kind: 'number', label: 'a=', value: F(a0) },
              ['Un punto y un director de cada recta: ' + d$('P=' + vt(P) + ',\\ \\vec u=' + vt(u) + '\\qquad Q=(' + [0, 1, 2].map((j) => L.entTex({ a: j === k ? 1 : 0, b: Q0[j] })).join(',') + '),\\ \\vec v=' + vt(v)),
                'Se cortan si son coplanarias y no paralelas: ' + d$('[\\vec u,\\vec v,\\vec{PQ}]=' + detTex + '=' + lin + '=0\\ \\Rightarrow\\ a=' + a0),
                'Los directores no son proporcionales (' + i$('\\vec u\\times\\vec v=' + vt(n) + '\\neq\\vec0') + '), luego para ese ' + i$('a') + ' se cortan en un punto.']),
            part('Para ese valor de ' + i$('a') + ', calcula el punto de corte.', 1, { kind: 'matrix', label: 'P_c=', value: row(I) },
              ['Con ' + i$('a=' + a0) + ' igualamos las dos rectas (o sustituimos el parámetro de ' + i$('r') + '): ' + d$('P+t\\vec u=' + vt(P) + '+t' + vt(u) + '\\ \\Rightarrow\\ t=' + t0),
                'Punto de corte: ' + d$(vt(P) + '+' + (t0 < 0 ? '(' + t0 + ')' : t0) + vt(u) + '=' + vt(I))]),
          ],
          data: { P, u, Q0, k, v, a0, I },
        };
      }
    },
  });

  /* ===================== simetrico ===================== */
  X.implementar({
    id: 'simetrico',
    generate() {
      if (rnd.int(0, 1) === 0) {
        // simétrico respecto de un plano y distancia (racional)
        const n = pythVec(), D = rnd.int(-6, 6), P = vrand(-4, 4);
        const N = isqrt(norm2(n)), N2 = norm2(n);
        const val = dot(n, P) + D;
        if (val === 0) return this.generate();
        const t = fr(-val, N2);
        const I = P.map((x, i) => fadd(F(x), fmul(t, F(n[i]))));
        const Ps = P.map((x, i) => fsub(fmul(F(2), I[i]), F(x)));
        const dist = fr(Math.abs(val), N);
        const pl = [n[0], n[1], n[2], D];
        const eq = (() => { let s = ''; ['x', 'y', 'z'].forEach((vv, i) => { const k = n[i]; if (!k) return; s += (k < 0 ? '-' : s ? '+' : '') + (Math.abs(k) === 1 ? '' : Math.abs(k)) + vv; }); return s + (D ? (D < 0 ? '-' : '+') + Math.abs(D) : '') + '=0'; })();
        return {
          enunciado: 'Considera el punto ' + i$(ptex('P', P)) + ' y el plano ' + i$('\\pi\\equiv ' + eq) + '.',
          partes: [
            part('Halla el punto simétrico de ' + i$('P') + ' respecto de ' + i$('\\pi') + '.', 1.5, { kind: 'matrix', label: "P'=", value: [Ps] },
              ['Recta perpendicular a ' + i$('\\pi') + ' por ' + i$('P') + ': ' + d$('(x,y,z)=' + vt(P) + '+t\\,' + vt(n)),
                'La cortamos con el plano: ' + d$('(' + n.map((a, i) => '(' + a + ')(' + P[i] + '+' + (n[i] < 0 ? '(' + n[i] + ')' : n[i]) + 't)').join('+') + ')+(' + D + ')=0\\ \\Rightarrow\\ ' + N2 + 't+(' + val + ')=0\\ \\Rightarrow\\ t=' + ftex(t)),
                'Punto medio ' + i$('I=(' + I.map(ftex).join(',') + ')') + ' y simétrico ' + d$("P'=2I-P=" + '(' + Ps.map(ftex).join(',') + ')')]),
            part('Calcula la distancia de ' + i$('P') + ' al plano ' + i$('\\pi') + '.', 1, { kind: 'number', label: 'd=', value: dist },
              [d$('d(P,\\pi)=\\dfrac{|' + n.map((a, i) => '(' + a + ')(' + P[i] + ')').join('+') + '+(' + D + ')|}{\\sqrt{' + n.map((a) => '(' + a + ')^2').join('+') + '}}=\\dfrac{|' + val + '|}{' + N + '}=' + ftex(dist))]),
          ],
          data: { tipo: 'plano', P, pl, Ps, dist: dist.n / dist.d },
        };
      }
      // simétrico respecto de una recta y distancia (expresión)
      for (;;) {
        const v = vnz(-2, 2), Q = vrand(-3, 3), P = vrand(-4, 4);
        const w = sub(P, Q), v2 = norm2(v);
        const tt = fr(dot(v, w), v2);
        const I = Q.map((x, i) => fadd(F(x), fmul(tt, F(v[i]))));
        const Ps = P.map((x, i) => fsub(fmul(F(2), I[i]), F(x)));
        const c = cross(w, v), c2 = norm2(c);
        if (c2 === 0) continue;
        const dist = Math.sqrt(c2 / v2);
        const show = 'sqrt(' + c2 + '/' + v2 + ')';
        return {
          enunciado: 'Considera el punto ' + i$(ptex('P', P)) + ' y la recta ' + i$('r\\equiv(x,y,z)=' + vt(Q) + '+t\\,' + vt(v)) + '.',
          partes: [
            part('Halla el punto simétrico de ' + i$('P') + ' respecto de ' + i$('r') + '.', 1.5, { kind: 'matrix', label: "P'=", value: [Ps] },
              ['Plano perpendicular a ' + i$('r') + ' por ' + i$('P') + ' (normal = director): ' + d$(vt(v) + '\\cdot(X-P)=0'),
                'Lo cortamos con ' + i$('r') + ': ' + d$('t=\\dfrac{\\vec v\\cdot(P-Q)}{|\\vec v|^2}=\\dfrac{' + dot(v, w) + '}{' + v2 + '}=' + ftex(tt)),
                'Pie de la perpendicular ' + i$('I=(' + I.map(ftex).join(',') + ')') + ' y simétrico ' + d$("P'=2I-P=(" + Ps.map(ftex).join(',') + ')')]),
            part('Calcula la distancia de ' + i$('P') + ' a la recta ' + i$('r') + '. <small>(escribe el valor exacto, p. ej. <code>sqrt(7)/2</code>, o un decimal con 3 cifras)</small>', 1, { kind: 'expr', label: 'd=', value: dist, show },
              [d$('d(P,r)=\\dfrac{|\\vec{QP}\\times\\vec v|}{|\\vec v|}=\\dfrac{|' + vt(c) + '|}{\\sqrt{' + v2 + '}}=\\sqrt{\\dfrac{' + c2 + '}{' + v2 + '}}\\approx ' + dist.toFixed(4))]),
          ],
          data: { tipo: 'recta', P, Q, v, Ps, dist },
        };
      }
    },
  });

  /* ===================== tangente-normal ===================== */
  const PI = Math.PI;
  const TN = [
    { tex: 'x^{3}-2x+5', f: (x) => x ** 3 - 2 * x + 5, df: (x) => 3 * x * x - 2, dtex: '3x^{2}-2', dom: [[-2, '-2'], [-1, '-1'], [0, '0'], [1, '1'], [2, '2']] },
    { tex: '(x-1)e^{x}', f: (x) => (x - 1) * Math.exp(x), df: (x) => x * Math.exp(x), dtex: 'x\\,e^{x}', dom: [[0, '0'], [1, '1'], [2, '2']] },
    { tex: '\\ln(x^{2}+1)', f: (x) => Math.log(x * x + 1), df: (x) => 2 * x / (x * x + 1), dtex: '\\dfrac{2x}{x^{2}+1}', dom: [[1, '1'], [2, '2'], [-1, '-1'], [-2, '-2']] },
    { tex: 'x\\ln(x)', f: (x) => x * Math.log(x), df: (x) => Math.log(x) + 1, dtex: '\\ln(x)+1', dom: [[1, '1'], [Math.E, 'e']] },
    { tex: '\\dfrac{x}{x^{2}+1}', f: (x) => x / (x * x + 1), df: (x) => (1 - x * x) / ((x * x + 1) ** 2), dtex: '\\dfrac{1-x^{2}}{(x^{2}+1)^{2}}', dom: [[0, '0'], [2, '2'], [-2, '-2'], [3, '3']] },
    { tex: '\\sqrt{x+1}', f: (x) => Math.sqrt(x + 1), df: (x) => 1 / (2 * Math.sqrt(x + 1)), dtex: '\\dfrac{1}{2\\sqrt{x+1}}', dom: [[0, '0'], [3, '3'], [8, '8']] },
    { tex: 'e^{2x}-x', f: (x) => Math.exp(2 * x) - x, df: (x) => 2 * Math.exp(2 * x) - 1, dtex: '2e^{2x}-1', dom: [[0, '0'], [1, '1'], [-1, '-1']] },
    { tex: '\\operatorname{sen}(x)+\\cos(x)', f: (x) => Math.sin(x) + Math.cos(x), df: (x) => Math.cos(x) - Math.sin(x), dtex: '\\cos(x)-\\operatorname{sen}(x)', dom: [[0, '0'], [PI / 2, '\\pi/2'], [PI, '\\pi']] },
  ];
  X.implementar({
    id: 'tangente-normal',
    generate() {
      for (;;) {
        const T = rnd.pick(TN);
        const [x0, x0tex] = rnd.pick(T.dom);
        const m = T.df(x0);
        if (Math.abs(m) < 1e-9) continue;
        const y0 = T.f(x0), n = y0 - m * x0;
        const mn = -1 / m, nn = y0 - mn * x0;
        const r4 = (v) => (Math.round(v * 1e4) / 1e4);
        const inputs = (mv, nv) => ({ kind: 'multi', parts: [{ kind: 'expr', label: 'm=', value: mv }, { kind: 'expr', label: 'n=', value: nv }] });
        const expl = '<small>(escribe cada valor exacto, p. ej. <code>2*e-1</code>, o con 3 decimales)</small>';
        return {
          enunciado: 'Considera la función ' + i$('f(x)=' + T.tex) + '.',
          partes: [
            part('Halla la ecuación de la recta tangente a la gráfica de ' + i$('f') + ' en el punto de abscisa ' + i$('x=' + x0tex) + ', escrita como ' + i$('y=mx+n') + '. ' + expl, 1.25, inputs(m, n),
              ['Derivada: ' + i$('f^{\\prime}(x)=' + T.dtex), 'Pendiente y ordenada del punto: ' + i$('m=f^{\\prime}(' + x0tex + ')\\approx ' + r4(m)) + ', ' + i$('f(' + x0tex + ')\\approx ' + r4(y0)),
                'Recta tangente: ' + d$('y-f(x_0)=f^{\\prime}(x_0)(x-x_0)\\ \\Rightarrow\\ y\\approx ' + r4(m) + 'x+' + r4(n))]),
            part('Halla la ecuación de la recta normal en ese mismo punto, escrita como ' + i$('y=mx+n') + '.', 1.25, inputs(mn, nn),
              ['La normal es perpendicular a la tangente: ' + i$('m_n=-\\dfrac{1}{f^{\\prime}(x_0)}\\approx ' + r4(mn)), d$('y\\approx ' + r4(mn) + 'x+' + r4(nn))]),
          ],
          data: { tex: T.tex, f: T.f, df: T.df, x0, m, n, mn, nn },
        };
      }
    },
  });

  /* ===================== primitiva ===================== */
  const cp = (c) => (c === 1 ? '' : c + '\\,');
  const cn = (c) => (c === 1 ? '' : String(c));
  const PRIM = [
    { fn: (c) => (x) => c * x * Math.exp(x), f: (c) => cp(c) + 'x\\,e^{x}', G: (c) => (x) => c * (x - 1) * Math.exp(x), Gtex: (c) => cn(c) + '(x-1)e^{x}', pts: [0, 1], xs: [1, 2, 3], ab: [[0, 1], [0, 2], [1, 3]] },
    { fn: (c) => (x) => c / (x * x + 2 * x + 2), f: (c) => '\\dfrac{' + c + '}{x^{2}+2x+2}', G: (c) => (x) => c * Math.atan(x + 1), Gtex: (c) => cn(c) + '\\operatorname{arctg}(x+1)', pts: [0, -1], xs: [0, 1, 2], ab: [[-1, 0], [0, 1], [-1, 1]] },
    { fn: (c) => (x) => c * x * Math.cos(x), f: (c) => cp(c) + 'x\\cos(x)', G: (c) => (x) => c * (x * Math.sin(x) + Math.cos(x)), Gtex: (c) => cn(c) + '(x\\operatorname{sen}(x)+\\cos(x))', pts: [0, 1], xs: [1, 2], ab: [[0, 1], [0, 2]] },
    { fn: (c) => (x) => c * x * Math.log(x), f: (c) => cp(c) + 'x\\ln(x)', G: (c) => (x) => c * (x * x / 2 * Math.log(x) - x * x / 4), Gtex: (c) => cn(c) + '\\left(\\dfrac{x^{2}}{2}\\ln(x)-\\dfrac{x^{2}}{4}\\right)', pts: [1, 2], xs: [2, 3], ab: [[1, 2], [1, 3], [2, 3]], dom: 'para $x>0$' },
    { fn: (c) => (x) => c * Math.exp(x) * Math.cos(x), f: (c) => cp(c) + 'e^{x}\\cos(x)', G: (c) => (x) => c * Math.exp(x) * (Math.cos(x) + Math.sin(x)) / 2, Gtex: (c) => '\\dfrac{' + c + '}{2}e^{x}(\\cos(x)+\\operatorname{sen}(x))', pts: [0], xs: [1, 2], ab: [[0, 1], [0, 2]] },
    { fn: (c) => (x) => c * (x ** 3 + 1) / (x * x + 1), f: (c) => cp(c) + '\\dfrac{x^{3}+1}{x^{2}+1}', G: (c) => (x) => c * (x * x / 2 - Math.log(x * x + 1) / 2 + Math.atan(x)), Gtex: (c) => cn(c) + '\\left(\\dfrac{x^{2}}{2}-\\dfrac12\\ln(x^{2}+1)+\\operatorname{arctg}(x)\\right)', pts: [0, 1], xs: [1, 2], ab: [[0, 1], [0, 2]] },
    { fn: (c) => (x) => c / (x * x - 1), f: (c) => '\\dfrac{' + c + '}{x^{2}-1}', G: (c) => (x) => c / 2 * Math.log((x - 1) / (x + 1)), Gtex: (c) => '\\dfrac{' + c + '}{2}\\ln\\dfrac{x-1}{x+1}', pts: [2, 3], xs: [4, 5], ab: [[2, 3], [2, 4], [3, 5]], dom: 'para $x>1$' },
    { fn: (c) => (x) => c * (2 * x + 3) / (x * x + 3 * x + 2), f: (c) => cp(c) + '\\dfrac{2x+3}{x^{2}+3x+2}', G: (c) => (x) => c * Math.log((x + 1) * (x + 2)), Gtex: (c) => cn(c) + '\\ln\\big((x+1)(x+2)\\big)', pts: [0, 1], xs: [1, 2], ab: [[0, 1], [0, 2], [1, 3]], dom: 'para $x>-1$' },
  ];
  X.implementar({
    id: 'primitiva',
    generate() {
      const T = rnd.pick(PRIM);
      const c = rnd.pick([1, 1, 2, 3]);
      const Gf = T.G(c);
      const p = rnd.pick(T.pts), q = rnd.int(-3, 5);
      const x1 = rnd.pick(T.xs);
      const [a, b] = rnd.pick(T.ab);
      const C = q - Gf(p);
      const F1 = Gf(x1) + C, I = Gf(b) - Gf(a);
      const r4 = (v) => (Math.round(v * 1e4) / 1e4);
      return {
        enunciado: 'Considera la función ' + i$('f(x)=' + T.f(c)) + (T.dom ? ' ' + T.dom : '') + '.',
        partes: [
          part('Sea ' + i$('F') + ' la primitiva de ' + i$('f') + ' cuya gráfica pasa por el punto ' + i$('(' + p + ',' + q + ')') + '. Calcula ' + i$('F(' + x1 + ')') + '. <small>(valor exacto, p. ej. <code>2*e-1</code>, o decimal con 3 cifras)</small>', 1.5, { kind: 'expr', label: 'F(' + x1 + ')=', value: F1 },
            ['Una primitiva de ' + i$('f') + ' es ' + d$('G(x)=' + T.Gtex(c)), 'La primitiva pedida es ' + i$('F(x)=G(x)+C') + ' con ' + i$('F(' + p + ')=' + q) + ': ' + i$('C=' + q + '-G(' + p + ')\\approx ' + r4(C)),
              d$('F(' + x1 + ')=G(' + x1 + ')+C\\approx ' + r4(F1))]),
          part('Calcula ' + i$('\\displaystyle\\int_{' + a + '}^{' + b + '}f(x)\\,dx') + '.', 1, { kind: 'expr', label: '\\displaystyle\\int=', value: I },
            ['Regla de Barrow con ' + i$('G') + ': ' + d$('\\int_{' + a + '}^{' + b + '}f(x)\\,dx=G(' + b + ')-G(' + a + ')\\approx ' + r4(I))]),
        ],
        data: { c, tipo: PRIM.indexOf(T), fn: T.fn(c), G: Gf, p, q, x1, a, b, F1, I },
      };
    },
  });
  // plantillas accesibles para los tests
  X._plant = { TN, PRIM };
})(typeof globalThis !== 'undefined' ? globalThis : this);
