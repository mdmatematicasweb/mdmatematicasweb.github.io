/* Generadores de ejercicios tipo PAU — fase 3 (geometría).
 * Tipos: plano-recta, distancias, angulos, areas-vol, vectores.
 */
(function (root) {
  'use strict';
  const X = root.MDExam;
  const G = root.MDGym;
  const { rnd, F, ftex, d$, i$ } = G;
  const { dot, cross, sub, add, scal, norm2, isqrt, isZero, vrand, vnz, gcdV, vt, ptex, pythVec, fr, row } = G.geo;
  const { eqTex, planeFrom, lineTex, par, crossTex } = G.rp;
  const part = (texto, pts, answer, steps) => ({ texto, pts, answer, steps });
  const EXPR = '<small>(valor exacto, p. ej. <code>sqrt(14)/2</code>, o decimal con 3 cifras)</small>';
  const GRADOS = '<small>(en grados, con dos decimales)</small>';
  const deg = (x) => (x * 180) / Math.PI;
  const r2 = (x) => (Math.round(x * 100) / 100).toFixed(2).replace('.', '{,}');
  const big = (v, m) => Math.max(...v.map(Math.abs)) > m;
  const planeAns = (eq) => ({ kind: 'matrix', label: '(a,b,c,d)=', value: row(eq), proportional: true });
  const PLANE_HINT = ' Escribe ' + i$('(a,b,c,d)') + ' de ' + i$('ax+by+cz+d=0') + ' (vale cualquier múltiplo).';
  /** √n simplificado en TeX y en texto para el corrector. */
  function sqrtTex(n, den) {
    let a = 1, b = n;
    for (let k = 2; k * k <= b; k++) while (b % (k * k) === 0) { b /= k * k; a *= k; }
    const g = G.gcd(a, den || 1); a /= g; const d = (den || 1) / g;
    const num = b === 1 ? String(a) : (a === 1 ? '' : a) + '\\sqrt{' + b + '}';
    const numS = b === 1 ? String(a) : (a === 1 ? '' : a + '*') + 'sqrt(' + b + ')';
    return { tex: d === 1 ? num : '\\dfrac{' + num + '}{' + d + '}', show: d === 1 ? numS : numS + '/' + d };
  }
  const planeSteps = (n, P, eq) => 'Tomamos como normal ' + i$(vt(n)) + ' (sirve cualquier múltiplo no nulo) y el punto ' + i$(vt(P)) + ': ' + d$(n.map((a, i) => par(a) + '(' + ['x', 'y', 'z'][i] + G.rp.shift(P[i]) + ')').join('+') + '=0\\ \\Rightarrow\\ ' + eqTex(eq));

  /* ===================== plano-recta ===================== */
  X.implementar({
    id: 'plano-recta',
    generate() {
      const v = rnd.pick(['3p', 'rp', 'par']);
      if (v === '3p') return tresPuntos();
      if (v === 'rp') return rectaPunto();
      return rectaParalela();
    },
  });

  function tresPuntos() {
    for (;;) {
      const A = vrand(-3, 3), B = vrand(-3, 3), C = vrand(-3, 3);
      const u = sub(B, A), w = sub(C, A), n0 = cross(u, w);
      if (isZero(n0) || big(n0, 15)) continue;
      const eq = planeFrom(n0, A), n = eq.slice(0, 3);
      const I = add(A, add(scal(rnd.int(-1, 1), u), scal(rnd.int(-1, 1), w)));
      const dv = vnz(-2, 2), t0 = rnd.pick([-2, -1, 1, 2]);
      if (dot(n, dv) === 0) continue;
      const Q = sub(I, scal(t0, dv));
      if (big(Q, 9) || big(I, 9)) continue;
      const nv = dot(n, dv), nq = dot(n, Q) + eq[3];
      return {
        enunciado: 'Considera los puntos ' + i$(ptex('A', A) + ',\\ ' + ptex('B', B) + ',\\ ' + ptex('C', C)) + ' y la recta ' + d$(lineTex('r', Q, dv)),
        partes: [
          part('Halla la ecuación general del plano ' + i$('\\pi') + ' que pasa por ' + i$('A') + ', ' + i$('B') + ' y ' + i$('C') + '.' + PLANE_HINT, 1.25, planeAns(eq),
            ['Dos vectores del plano: ' + d$('\\vec{AB}=' + vt(u) + '\\qquad\\vec{AC}=' + vt(w)), 'Normal: ' + d$('\\vec n=\\vec{AB}\\times\\vec{AC}=' + crossTex(u, w) + '=' + vt(n0)), planeSteps(n, A, eq)]),
          part('Halla el punto de corte de la recta ' + i$('r') + ' con el plano ' + i$('\\pi') + '.', 1.25, { kind: 'matrix', label: 'P=', value: row(I) },
            ['Sustituimos la recta en el plano: ' + d$(n.map((a, i) => par(a) + '(' + G.geo.linTex(Q[i], dv[i], 't') + ')').join('+') + '+(' + eq[3] + ')=0\\ \\Rightarrow\\ ' + nv + 't+(' + nq + ')=0\\ \\Rightarrow\\ t=' + t0),
              'Punto: ' + d$('P=' + vt(Q) + '+' + par(t0) + vt(dv) + '=' + vt(I))]),
        ],
        data: { v: '3p', A, B, C, eq, Q, dv, I },
      };
    }
  }

  function rectaPunto() {
    for (;;) {
      const P0 = vrand(-3, 3), u = vnz(-2, 2), Q = vrand(-3, 3);
      const w = sub(Q, P0), n0 = cross(u, w);
      if (isZero(n0) || big(n0, 15)) continue;
      const eq = planeFrom(n0, P0), n = eq.slice(0, 3);
      const R = add(Q, add(scal(rnd.int(-2, 2), u), scal(rnd.int(-1, 1), w)));
      const js = [0, 1, 2].filter((j) => n[j] !== 0);
      const j = rnd.pick(js);
      if (big(R, 9)) continue;
      const nm = ['x', 'y', 'z'];
      const Rtex = 'R(' + R.map((x, i) => (i === j ? 'k' : x)).join(',') + ')';
      const rest = dot(n, R) - n[j] * R[j] + eq[3];
      return {
        enunciado: 'Considera la recta ' + d$(lineTex('r', P0, u)) + 'y el punto ' + i$(ptex('Q', Q)) + '.',
        partes: [
          part('Halla la ecuación general del plano ' + i$('\\pi') + ' que contiene a la recta ' + i$('r') + ' y pasa por ' + i$('Q') + '.' + PLANE_HINT, 1.5, planeAns(eq),
            ['El plano contiene el director ' + i$('\\vec u=' + vt(u)) + ' y el vector ' + i$('\\vec{PQ}=' + vt(w)) + ', con ' + i$(ptex('P', P0)) + ' de ' + i$('r') + '.',
              'Normal: ' + d$('\\vec n=\\vec u\\times\\vec{PQ}=' + crossTex(u, w) + '=' + vt(n0)), planeSteps(n, P0, eq)]),
          part('Calcula el valor de ' + i$('k') + ' para que el punto ' + i$(Rtex) + ' pertenezca a ' + i$('\\pi') + '.', 1, { kind: 'number', label: 'k=', value: F(R[j]) },
            ['Sustituimos ' + i$(Rtex) + ' en ' + i$('\\pi') + ' (' + i$(nm[j] + '=k') + '): ' + d$(par(n[j]) + 'k+(' + rest + ')=0\\ \\Rightarrow\\ k=' + R[j])]),
        ],
        data: { v: 'rp', P0, u, Q, eq, R, j },
      };
    }
  }

  function rectaParalela() {
    for (;;) {
      const P = vrand(-3, 3), u = vnz(-2, 2), Q = vrand(-3, 3), w = vnz(-2, 2);
      const n0 = cross(u, w);
      if (isZero(n0) || big(n0, 12)) continue;
      const eq = planeFrom(n0, P), n = eq.slice(0, 3);
      const val = dot(n, Q) + eq[3], N2 = norm2(n);
      if (val === 0) continue;
      const dist = Math.abs(val) / Math.sqrt(N2);
      // |val|/√N2 = |val|·√N2 / N2
      const exact = sqrtTex(N2 * val * val, N2);
      return {
        enunciado: 'Considera las rectas ' + d$(lineTex('r', P, u) + '\\qquad ' + lineTex('s', Q, w)),
        partes: [
          part('Halla la ecuación general del plano ' + i$('\\pi') + ' que contiene a ' + i$('r') + ' y es paralelo a ' + i$('s') + '.' + PLANE_HINT, 1.5, planeAns(eq),
            ['El plano contiene a ' + i$('P') + ' y a los directores ' + i$('\\vec u') + ' y ' + i$('\\vec v') + ' de las dos rectas.', 'Normal: ' + d$('\\vec n=\\vec u\\times\\vec v=' + crossTex(u, w) + '=' + vt(n0)), planeSteps(n, P, eq)]),
          part('Calcula la distancia de la recta ' + i$('s') + ' al plano ' + i$('\\pi') + '. ' + EXPR, 1, { kind: 'expr', label: 'd=', value: dist, show: exact.show },
            ['Como ' + i$('s') + ' es paralela a ' + i$('\\pi') + ', basta tomar un punto suyo, ' + i$(ptex('Q', Q)) + ': ' + d$('d(s,\\pi)=d(Q,\\pi)=\\dfrac{|' + val + '|}{\\sqrt{' + N2 + '}}=' + exact.tex + '\\approx ' + dist.toFixed(4))]),
        ],
        data: { v: 'par', P, u, Q, w, eq, dist },
      };
    }
  }

  /* ===================== distancias ===================== */
  const LINE_LABELS = ['Paralelas', 'Coincidentes', 'Se cortan en un punto', 'Se cruzan'];
  X.implementar({
    id: 'distancias',
    generate() {
      const v = rnd.pick(['rr', 'pl', 'pr']);
      if (v === 'rr') {
        const g = G.modules.distancias.generate({ tipo: 'rr' });
        const { P, u, Q, v: w } = g.data;
        return {
          enunciado: 'Considera las rectas ' + d$(lineTex('r', P, u) + '\\qquad ' + lineTex('s', Q, w)),
          partes: [
            part('Estudia la posición relativa de ' + i$('r') + ' y ' + i$('s') + '.', 1, { kind: 'choice', options: LINE_LABELS, value: 3 },
              ['Los directores no son proporcionales: ' + i$('\\vec u\\times\\vec v=' + vt(cross(u, w)) + '\\neq\\vec 0') + '.', 'Producto mixto ' + i$('[\\vec u,\\vec v,\\vec{PQ}]=' + dot(sub(Q, P), cross(u, w)) + '\\neq0') + ': no son coplanarias, luego <b>se cruzan</b>.']),
            part('Calcula la distancia entre ' + i$('r') + ' y ' + i$('s') + '.', 1.5, g.answer, g.steps),
          ],
          data: { v: 'rr', P, u, Q, w, dist: g.data.dist },
        };
      }
      if (v === 'pl') {
        const n = pythVec(), D = rnd.int(-8, 8), P = vrand(-4, 4), N = isqrt(norm2(n));
        const val = dot(n, P) + D;
        if (val === 0) return this.generate();
        const k = rnd.int(1, 3);
        const Ds = [D + k * N, D - k * N];
        const eq = [n[0], n[1], n[2], D];
        return {
          enunciado: 'Considera el punto ' + i$(ptex('P', P)) + ' y el plano ' + i$('\\pi\\equiv ' + eqTex(eq)) + '.',
          partes: [
            part('Calcula la distancia de ' + i$('P') + ' a ' + i$('\\pi') + '.', 1, { kind: 'number', label: 'd=', value: fr(Math.abs(val), N) },
              [d$('d(P,\\pi)=\\dfrac{|' + n.map((a, i) => par(a) + '\\cdot' + par(P[i])).join('+') + '+' + par(D) + '|}{\\sqrt{' + norm2(n) + '}}=\\dfrac{' + Math.abs(val) + '}{' + N + '}=' + ftex(fr(Math.abs(val), N)))]),
            part('Halla los planos paralelos a ' + i$('\\pi') + ' que distan ' + k + ' unidad' + (k > 1 ? 'es' : '') + ' de él. Escríbelos como ' + i$(eqTex([n[0], n[1], n[2], 0]).replace('=0', '') + '+D=0') + ' y da los dos valores de ' + i$('D') + '.', 1.5, { kind: 'list', label: 'D=', value: Ds.map((x) => F(x)) },
              ['Un plano paralelo tiene la misma normal: ' + i$(eqTex([n[0], n[1], n[2], 0]).replace('=0', '') + '+D=0') + '.', 'Distancia entre planos paralelos: ' + d$('\\dfrac{|D-(' + D + ')|}{' + N + '}=' + k + '\\ \\Rightarrow\\ D-(' + D + ')=\\pm' + k * N), i$('D=' + Ds[0]) + ' o ' + i$('D=' + Ds[1]) + '.']),
          ],
          data: { v: 'pl', n, D, P, k, Ds, dist: Math.abs(val) / N },
        };
      }
      const g = G.modules.proyecciones.generate({ tipo: 'precta' });
      const { Q, v: dv, P, I } = g.data;
      const n2 = norm2(sub(P, I)), s = sqrtTex(n2, 1);
      return {
        enunciado: 'Considera el punto ' + i$(ptex('P', P)) + ' y la recta ' + d$(lineTex('r', Q, dv)),
        partes: [
          part('Halla el punto ' + i$('I') + ' de ' + i$('r') + ' más próximo a ' + i$('P') + ' (proyección ortogonal de ' + i$('P') + ' sobre ' + i$('r') + ').', 1.5, g.answer, g.steps),
          part('Calcula la distancia de ' + i$('P') + ' a la recta ' + i$('r') + '. ' + EXPR, 1, { kind: 'expr', label: 'd=', value: Math.sqrt(n2), show: s.show },
            ['La distancia es el módulo de ' + i$('\\vec{IP}=' + vt(sub(P, I))) + ': ' + d$('d(P,r)=|\\vec{IP}|=\\sqrt{' + n2 + '}' + (s.tex === '\\sqrt{' + n2 + '}' ? '' : '=' + s.tex) + '\\approx ' + Math.sqrt(n2).toFixed(4))]),
        ],
        data: { v: 'pr', Q, dv, P, I, dist: Math.sqrt(n2) },
      };
    },
  });

  /* ===================== angulos ===================== */
  X.implementar({
    id: 'angulos',
    generate() {
      for (;;) {
        const a = pythVec(), b = pythVec();
        const na = isqrt(norm2(a)), nb = isqrt(norm2(b)), dd = dot(a, b);
        const c = cross(a, b);
        if (dd === 0 || isZero(c) || big(c, 30)) continue;
        const val = fr(Math.abs(dd), na * nb), ang = deg(Math.acos(Math.abs(dd) / (na * nb)));
        // con dos decimales el error relativo ha de quedar bajo la tolerancia del corrector (5e-4)
        if (ang < 12 || ang > 78) continue;
        const tipo = rnd.pick(['rr', 'rp', 'pp']);
        const P = vrand(-3, 3), Q = vrand(-3, 3), D1 = rnd.int(-5, 5), D2 = rnd.int(-5, 5);
        const cg = gcdV(c), cr = c.map((x) => x / cg);
        if (tipo === 'rr') {
          const eq = planeFrom(cr, P);
          if (dot(eq.slice(0, 3), Q) + eq[3] === 0) continue; // s contenida: no sería «paralelo»
          return {
            enunciado: 'Considera las rectas ' + d$(lineTex('r', P, a) + '\\qquad ' + lineTex('s', Q, b)),
            partes: [
              part('Calcula el coseno del ángulo que forman ' + i$('r') + ' y ' + i$('s') + '.', 0.75, { kind: 'number', label: '\\cos\\alpha=', value: val },
                ['Directores ' + i$('\\vec u=' + vt(a)) + ', ' + i$('\\vec v=' + vt(b)) + ': ' + d$('\\cos\\alpha=\\dfrac{|\\vec u\\cdot\\vec v|}{|\\vec u||\\vec v|}=\\dfrac{|' + dd + '|}{' + na + '\\cdot' + nb + '}=' + ftex(val))]),
              part('Expresa ese ángulo en grados. ' + GRADOS, 0.5, { kind: 'expr', label: '\\alpha=', value: ang, show: ang.toFixed(2) },
                [d$('\\alpha=\\arccos\\left(' + ftex(val) + '\\right)\\approx ' + r2(ang) + '^{\\circ}')]),
              part('Halla el plano que contiene a ' + i$('r') + ' y es paralelo a ' + i$('s') + '.' + PLANE_HINT, 1.25, planeAns(eq),
                ['Normal: ' + d$('\\vec n=\\vec u\\times\\vec v=' + crossTex(a, b) + '=' + vt(c)), planeSteps(eq.slice(0, 3), P, eq)]),
            ],
            data: { v: 'rr', a, b, P, Q, eq, cos: Math.abs(dd) / (na * nb), ang },
          };
        }
        if (tipo === 'rp') {
          const eq = planeFrom(cr, P);
          const sAng = deg(Math.asin(Math.abs(dd) / (na * nb)));
          return {
            enunciado: 'Considera la recta ' + d$(lineTex('r', P, a)) + 'y el plano ' + i$('\\pi\\equiv ' + eqTex([b[0], b[1], b[2], D1])) + '.',
            partes: [
              part('Calcula el <b>seno</b> del ángulo que forman ' + i$('r') + ' y ' + i$('\\pi') + '.', 0.75, { kind: 'number', label: '\\operatorname{sen}\\alpha=', value: val },
                ['Director ' + i$('\\vec v=' + vt(a)) + ' y normal ' + i$('\\vec n=' + vt(b)) + '. El ángulo con el plano es el complementario del que forman ' + i$('\\vec v') + ' y ' + i$('\\vec n') + ': ' + d$('\\operatorname{sen}\\alpha=\\dfrac{|\\vec v\\cdot\\vec n|}{|\\vec v||\\vec n|}=\\dfrac{|' + dd + '|}{' + na + '\\cdot' + nb + '}=' + ftex(val))]),
              part('Expresa ese ángulo en grados. ' + GRADOS, 0.5, { kind: 'expr', label: '\\alpha=', value: sAng, show: sAng.toFixed(2) },
                [d$('\\alpha=\\operatorname{arcsen}\\left(' + ftex(val) + '\\right)\\approx ' + r2(sAng) + '^{\\circ}')]),
              part('Halla el plano que contiene a ' + i$('r') + ' y es perpendicular a ' + i$('\\pi') + '.' + PLANE_HINT, 1.25, planeAns(eq),
                ['El plano buscado contiene a ' + i$('\\vec v') + ' y a la normal ' + i$('\\vec n') + ' de ' + i$('\\pi') + ': ' + d$('\\vec n^{\\prime}=\\vec v\\times\\vec n=' + crossTex(a, b) + '=' + vt(c)), planeSteps(eq.slice(0, 3), P, eq)]),
            ],
            data: { v: 'rp', a, b, P, D1, eq, sin: Math.abs(dd) / (na * nb), ang: sAng },
          };
        }
        return {
          enunciado: 'Considera los planos ' + d$('\\pi_1\\equiv ' + eqTex([a[0], a[1], a[2], D1]) + '\\qquad \\pi_2\\equiv ' + eqTex([b[0], b[1], b[2], D2])),
          partes: [
            part('Calcula el coseno del ángulo que forman ' + i$('\\pi_1') + ' y ' + i$('\\pi_2') + '.', 0.75, { kind: 'number', label: '\\cos\\alpha=', value: val },
              ['Normales ' + i$('\\vec n_1=' + vt(a)) + ', ' + i$('\\vec n_2=' + vt(b)) + ': ' + d$('\\cos\\alpha=\\dfrac{|\\vec n_1\\cdot\\vec n_2|}{|\\vec n_1||\\vec n_2|}=\\dfrac{|' + dd + '|}{' + na + '\\cdot' + nb + '}=' + ftex(val))]),
            part('Expresa ese ángulo en grados. ' + GRADOS, 0.5, { kind: 'expr', label: '\\alpha=', value: ang, show: ang.toFixed(2) },
              [d$('\\alpha=\\arccos\\left(' + ftex(val) + '\\right)\\approx ' + r2(ang) + '^{\\circ}')]),
            part('Halla un vector director de la recta en que se cortan ' + i$('\\pi_1') + ' y ' + i$('\\pi_2') + '. <small>(vale cualquier múltiplo)</small>', 1.25, { kind: 'matrix', label: '\\vec d=', value: row(cr), proportional: true },
              ['La recta está en los dos planos, luego es perpendicular a las dos normales: ' + d$('\\vec d=\\vec n_1\\times\\vec n_2=' + crossTex(a, b) + '=' + vt(c))]),
          ],
          data: { v: 'pp', a, b, D1, D2, d: cr, cos: Math.abs(dd) / (na * nb), ang },
        };
      }
    },
  });

  /* ===================== areas-vol ===================== */
  X.implementar({
    id: 'areas-vol',
    generate() {
      for (;;) {
        const A = vrand(-3, 3), B = vrand(-3, 3), C = vrand(-3, 3);
        const u = sub(B, A), w = sub(C, A), n = cross(u, w);
        if (isZero(n) || big(n, 15)) continue;
        const j = rnd.pick([0, 1, 2].filter((i) => n[i] !== 0));
        const Dp = add(A, add(scal(rnd.int(-1, 1), u), scal(rnd.int(-1, 1), w)));
        const D0 = Dp.slice(); D0[j] = 0; // D(k) = D0 + k·e_j; coplanario si k = Dp[j]
        if (big(Dp, 7)) continue;
        const kc = Dp[j];
        const k1 = kc + rnd.pick([-3, -2, -1, 1, 2, 3]);
        const D1 = D0.slice(); D1[j] = k1;
        const mix = dot(n, sub(D1, A));
        const tetra = rnd.int(0, 1) === 0;
        const vol = fr(Math.abs(mix), tetra ? 6 : 1);
        const Dtex = 'D(' + D0.map((x, i) => (i === j ? 'k' : x)).join(',') + ')';
        const AD = sub(D0, A);
        const ADtex = AD.map((x, i) => (i === j ? (A[j] === 0 ? 'k' : 'k' + (A[j] > 0 ? '-' + A[j] : '+' + -A[j])) : String(x)));
        const N2 = norm2(n), s = sqrtTex(N2, 2);
        const c1 = n[j], c0 = dot(n, AD) - n[j] * AD[j] - n[j] * A[j];
        return {
          enunciado: 'Considera los puntos ' + i$(ptex('A', A) + ',\\ ' + ptex('B', B) + ',\\ ' + ptex('C', C)) + ' y ' + i$(Dtex) + '.',
          partes: [
            part('Halla el valor de ' + i$('k') + ' para que los cuatro puntos sean coplanarios.', 1, { kind: 'number', label: 'k=', value: F(kc) },
              ['Son coplanarios si ' + i$('[\\vec{AB},\\vec{AC},\\vec{AD}]=0') + ': ' + d$(G.mtexStr([u.map(String), w.map(String), ADtex], 'vmatrix') + '=' + (c1 === 1 ? '' : c1 === -1 ? '-' : c1) + 'k' + (c0 === 0 ? '' : (c0 > 0 ? '+' : '') + c0) + '=0\\ \\Rightarrow\\ k=' + kc)]),
            part('Para ' + i$('k=' + k1) + ', calcula el volumen del ' + (tetra ? 'tetraedro de vértices ' + i$('A,B,C,D') : 'paralelepípedo de aristas ' + i$('AB,\\ AC,\\ AD')) + '.', 0.75, { kind: 'number', label: 'V=', value: vol },
              ['Con ' + i$('k=' + k1) + ': ' + i$('\\vec{AD}=' + vt(sub(D1, A))) + ' y el producto mixto vale ' + i$(String(mix)) + '.',
                d$('V=' + (tetra ? '\\dfrac16' : '') + '|[\\vec{AB},\\vec{AC},\\vec{AD}]|=' + (tetra ? '\\dfrac{' + Math.abs(mix) + '}{6}=' : '') + ftex(vol))]),
            part('Calcula el área del triángulo ' + i$('ABC') + '. ' + EXPR, 0.75, { kind: 'expr', label: '\\text{Área}=', value: Math.sqrt(N2) / 2, show: s.show },
              [d$('\\vec{AB}\\times\\vec{AC}=' + crossTex(u, w) + '=' + vt(n)), d$('\\text{Área}=\\dfrac12|\\vec{AB}\\times\\vec{AC}|=\\dfrac{\\sqrt{' + N2 + '}}{2}' + (s.tex === '\\dfrac{\\sqrt{' + N2 + '}}{2}' ? '' : '=' + s.tex) + '\\approx ' + (Math.sqrt(N2) / 2).toFixed(4))]),
          ],
          data: { A, B, C, D0, j, kc, k1, tetra, vol: Math.abs(mix) / (tetra ? 6 : 1), area: Math.sqrt(N2) / 2 },
        };
      }
    },
  });

  /* ===================== vectores ===================== */
  X.implementar({
    id: 'vectores',
    generate() {
      for (;;) {
        const v = vnz(-3, 3), k = rnd.pick([0, 1, 2].filter((i) => v[i] !== 0));
        if (k === undefined) continue;
        const u = vrand(-3, 3);
        const rest = dot(u, v) - u[k] * v[k];
        if (rest % v[k] !== 0) continue;
        const a0 = -rest / v[k] || 0;
        if (Math.abs(a0) > 6) continue;
        u[k] = a0;
        const c = cross(u, v);
        if (isZero(c)) continue;
        const w = vrand(-3, 3), m = rnd.pick([0, 1, 2].filter((i) => c[i] !== 0));
        // det(u,v,w) = c·w, lineal en w[m]
        const restW = dot(c, w) - c[m] * w[m];
        if (restW % c[m] !== 0) continue;
        const b0 = -restW / c[m] || 0;
        if (Math.abs(b0) > 9) continue;
        const uTex = '(' + u.map((x, i) => (i === k ? 'a' : x)).join(',') + ')';
        const wTex = '(' + w.map((x, i) => (i === m ? 'b' : x)).join(',') + ')';
        const N2 = norm2(c), s = sqrtTex(N2, 1);
        const wb = w.slice(); wb[m] = b0;
        return {
          enunciado: 'Considera los vectores ' + i$('\\vec u=' + uTex + ',\\ \\vec v=' + vt(v) + ',\\ \\vec w=' + wTex) + '.',
          partes: [
            part('Halla ' + i$('a') + ' para que ' + i$('\\vec u') + ' y ' + i$('\\vec v') + ' sean ortogonales.', 0.75, { kind: 'number', label: 'a=', value: F(a0) },
              ['Ortogonales si su producto escalar es 0: ' + d$('\\vec u\\cdot\\vec v=' + par(v[k]) + 'a+(' + rest + ')=0\\ \\Rightarrow\\ a=' + a0)]),
            part('Para ese valor de ' + i$('a') + ', calcula el área del paralelogramo determinado por ' + i$('\\vec u') + ' y ' + i$('\\vec v') + '. ' + EXPR, 1, { kind: 'expr', label: '\\text{Área}=', value: Math.sqrt(N2), show: s.show },
              ['Con ' + i$('a=' + a0) + ': ' + i$('\\vec u=' + vt(u)) + '. ' + d$('\\vec u\\times\\vec v=' + crossTex(u, v) + '=' + vt(c)), d$('\\text{Área}=|\\vec u\\times\\vec v|=\\sqrt{' + N2 + '}' + (s.tex === '\\sqrt{' + N2 + '}' ? '' : '=' + s.tex) + '\\approx ' + Math.sqrt(N2).toFixed(4)),
                'Como son ortogonales, también ' + i$('|\\vec u|\\,|\\vec v|=\\sqrt{' + norm2(u) + '}\\sqrt{' + norm2(v) + '}') + '.']),
            part('Para ese valor de ' + i$('a') + ', halla ' + i$('b') + ' para que ' + i$('\\vec u,\\ \\vec v,\\ \\vec w') + ' sean linealmente dependientes.', 0.75, { kind: 'number', label: 'b=', value: F(b0) },
              ['Son dependientes si su determinante (producto mixto) es 0: ' + d$('[\\vec u,\\vec v,\\vec w]=(\\vec u\\times\\vec v)\\cdot\\vec w=' + par(c[m]) + 'b+(' + restW + ')=0\\ \\Rightarrow\\ b=' + b0), 'Es decir, ' + i$('\\vec w=' + vt(wb)) + ' está en el plano de ' + i$('\\vec u') + ' y ' + i$('\\vec v') + '.']),
          ],
          data: { u, v, k, a0, w, m, b0, area: Math.sqrt(N2) },
        };
      }
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
