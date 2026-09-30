/* Ejercicios interactivos — 2º Bachillerato, tema 5: Rectas y planos en el espacio.
 * Requiere vectores.js (G.geo).
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, M, ftex, d$, i$ } = G;
  const { dot, cross, sub, add, scal, norm2, isqrt, isZero, vrand, vnz, gcdV, vt, ptex, pythVec, fr, row, linTex } = G.geo;

  /* ---------- Planos y rectas en TeX ---------- */
  function eqTex(c) {
    let s = '';
    ['x', 'y', 'z'].forEach((v, i) => {
      const k = c[i];
      if (!k) return;
      const mag = Math.abs(k) === 1 ? '' : String(Math.abs(k));
      s += (k < 0 ? '-' : s ? '+' : '') + mag + v;
    });
    if (c[3]) s += (c[3] < 0 ? '-' : '+') + Math.abs(c[3]);
    return s + '=0';
  }
  /** [A,B,C,D] primitivo con el primer coeficiente no nulo positivo. */
  function planeFrom(n, P) {
    let c = [n[0], n[1], n[2], -dot(n, P)];
    const g = gcdV(c) || 1;
    c = c.map((x) => x / g);
    const i0 = c.findIndex((x) => x !== 0);
    return c[i0] < 0 ? c.map((x) => -x) : c;
  }
  const lineTex = (name, P, v) => name + ':\\ (x,y,z)=' + vt(P) + '+t\\,' + vt(v);
  const paramTex = (P, v) => '\\begin{cases}x=' + linTex(P[0], v[0], 't') + '\\\\ y=' + linTex(P[1], v[1], 't') + '\\\\ z=' + linTex(P[2], v[2], 't') + '\\end{cases}';
  const shift = (x0) => (x0 === 0 ? '' : x0 < 0 ? '+' + (-x0) : '-' + x0);
  const par = (k) => (k < 0 ? '(' + k + ')' : String(k));
  const crossTex = (u, v) => '\\begin{vmatrix}\\vec{i}&\\vec{j}&\\vec{k}\\\\' + u.join('&') + '\\\\' + v.join('&') + '\\end{vmatrix}';
  const normalFrom = (u, v, nameU, nameV) =>
    'Un vector normal al plano es el producto vectorial: ' + d$('\\vec n=' + nameU + '\\times' + nameV + '=' + crossTex(u, v) + '=' + vt(cross(u, v)));
  const reduceV = (v) => { const g = gcdV(v) || 1; return v.map((x) => x / g); };

  /* ===================== 1. Ecuación del plano ===================== */
  G.define({
    id: 'plano',
    title: 'Ecuación del plano',
    help: [
      'Un plano $Ax+By+Cz+D=0$ tiene vector normal $\\vec n=(A,B,C)$. Con dos vectores del plano (p. ej. $\\vec{AB}$ y $\\vec{AC}$), $\\vec n=\\vec u\\times\\vec v$. Luego $D=-\\vec n\\cdot P$ con cualquier punto $P$ del plano.',
      'Ejemplo: $A(1,0,0)$, $B(0,1,0)$, $C(0,0,1)$. $\\vec{AB}=(-1,1,0)$, $\\vec{AC}=(-1,0,1)$, $\\vec n=\\vec{AB}\\times\\vec{AC}=(1,1,1)$. $D=-(1,1,1)\\cdot(1,0,0)=-1$. Plano: $x+y+z-1=0$. Cualquier múltiplo sirve.',
    ],
    params: [{ key: 'dato', label: 'Datos', options: [['3p', 'Tres puntos'], ['pn', 'Punto y normal'], ['pd', 'Punto y dos direcciones']] }],
    generate(p) {
      let P, n, prompt, steps, data;
      if (p.dato === 'pn') {
        P = vrand(-4, 4); n = vnz(-4, 4);
        prompt = 'Halla la ecuación general del plano que pasa por ' + i$(ptex('P', P)) + ' y tiene vector normal ' + i$('\\vec n=' + vt(n)) + '.';
        steps = [];
        data = { P, n, pts: [P] };
      } else if (p.dato === 'pd') {
        let u, v;
        do { u = vnz(-3, 3); v = vnz(-3, 3); } while (isZero(cross(u, v)));
        P = vrand(-4, 4); n = cross(u, v);
        prompt = 'Halla la ecuación general del plano que pasa por ' + i$(ptex('P', P)) + ' y contiene a los vectores ' + i$('\\vec u=' + vt(u)) + ' y ' + i$('\\vec v=' + vt(v)) + '.';
        steps = [normalFrom(u, v, '\\vec u', '\\vec v')];
        data = { P, n, pts: [P, add(P, u), add(P, v)] };
      } else {
        let A, B, C;
        do { A = vrand(-4, 4); B = vrand(-4, 4); C = vrand(-4, 4); } while (isZero(cross(sub(B, A), sub(C, A))));
        const u = sub(B, A), v = sub(C, A);
        P = A; n = cross(u, v);
        prompt = 'Halla la ecuación general del plano que pasa por ' + i$(ptex('A', A) + ',\\ ' + ptex('B', B) + ',\\ ' + ptex('C', C)) + '.';
        steps = ['Dos vectores del plano: ' + d$('\\vec{AB}=' + vt(u) + '\\qquad \\vec{AC}=' + vt(v)), normalFrom(u, v, '\\vec{AB}', '\\vec{AC}')];
        data = { P, n, pts: [A, B, C] };
      }
      const nn = n;
      const eq = planeFrom(nn, P);
      steps.push('Plano que pasa por ' + i$(ptex('P', P)) + ' con normal ' + i$('\\vec n=' + vt(nn)) + ': ' + d$(nn.map((a, i) => par(a) + '(' + ['x', 'y', 'z'][i] + shift(P[i]) + ')').join('+') + '=0'));
      steps.push('Desarrollamos: ' + d$(nn[0] + 'x+' + par(nn[1]) + 'y+' + par(nn[2]) + 'z+(' + (-dot(nn, P)) + ')=0') + 'Simplificando: ' + d$(eqTex(eq)));
      return {
        prompt: prompt + ' Escribe ' + i$('(A,B,C,D)') + ' de ' + i$('Ax+By+Cz+D=0') + ' (vale cualquier múltiplo).',
        answer: { kind: 'matrix', label: '(A,B,C,D)=', value: row(eq), proportional: true },
        steps,
        data: Object.assign(data, { eq }),
      };
    },
  });

  /* ===================== 2. Intersección recta-plano ===================== */
  G.define({
    id: 'interseccion',
    title: 'Punto de corte de recta y plano',
    help: [
      'Escribe la recta en paramétricas $x=x_0+at$, $y=y_0+bt$, $z=z_0+ct$, sustituye en la ecuación del plano y despeja $t$. Con ese $t$, vuelve a la recta para obtener el punto.',
      'Ejemplo: $r:\\ (x,y,z)=(1,0,2)+t(1,1,-1)$ y $\\pi:\\ x+y+z-5=0$. ' + d$('(1+t)+t+(2-t)-5=0\\ \\Rightarrow\\ t-2=0\\ \\Rightarrow\\ t=2\\ \\Rightarrow\\ P=(3,2,0)') + 'Si el coeficiente de $t$ fuese 0, no habría un único punto.',
    ],
    params: [],
    generate() {
      for (;;) {
        const I = vrand(-4, 4), v = vnz(-2, 2), t0 = rnd.pick([-3, -2, -1, 1, 2, 3]);
        const Q = sub(I, scal(t0, v));
        const n = vnz(-3, 3);
        if (dot(n, v) === 0) continue;
        const pl = planeFrom(n, I);
        const nn = pl.slice(0, 3), D = pl[3];
        const nv = dot(nn, v), nq = dot(nn, Q) + D;
        return {
          prompt: 'Halla el punto donde la recta ' + d$('r:' + paramTex(Q, v)) + 'corta al plano ' + i$('\\pi:\\ ' + eqTex(pl)),
          answer: { kind: 'matrix', label: 'P=', value: row(I) },
          steps: [
            'Sustituimos las paramétricas en la ecuación del plano: ' + d$(nn.map((a, i) => par(a) + '(' + linTex(Q[i], v[i], 't') + ')').join('+') + '+(' + D + ')=0'),
            'Agrupamos: ' + d$('(' + nv + ')t+(' + nq + ')=0\\ \\Rightarrow\\ t=' + ftex(fr(-nq, nv))),
            'Sustituimos ' + i$('t=' + t0) + ' en la recta: ' + d$('P=' + vt(Q) + '+' + par(t0) + vt(v) + '=' + vt(I)),
          ],
          data: { Q, v, pl, I },
        };
      }
    },
  });

  /* ===================== 3. Posición relativa ===================== */
  const classifyLines = (P, u, Q, v) => {
    const PQ = sub(Q, P);
    if (isZero(cross(u, v))) return isZero(cross(PQ, u)) ? 1 : 0;
    return dot(PQ, cross(u, v)) === 0 ? 2 : 3;
  };
  const LINE_LABELS = ['Paralelas', 'Coincidentes', 'Se cortan en un punto', 'Se cruzan'];
  const PLANE_LABELS = ['Secantes', 'Paralelos', 'Coincidentes'];
  const RP_LABELS = ['Secantes (un punto)', 'Paralelos (ningún punto común)', 'La recta está contenida en el plano'];

  G.define({
    id: 'posicion',
    title: 'Posición relativa',
    help: [
      'Dos planos: compara los coeficientes $(A,B,C)$; si no son proporcionales, secantes. Dos rectas: compara los directores; si no son proporcionales, mira $[\\vec u,\\vec v,\\vec{PQ}]$ (0: se cortan, distinto de 0: se cruzan). Recta y plano: calcula $\\vec n\\cdot\\vec v$ (distinto de 0: secantes).',
      'Método. Planos: $(A,B,C)$ proporcionales y $D$ también $\\Rightarrow$ coincidentes; sólo los tres primeros $\\Rightarrow$ paralelos. Rectas con directores proporcionales: si $Q$ está en $r$, coincidentes; si no, paralelas. Recta y plano con $\\vec n\\cdot\\vec v=0$: sustituye un punto de la recta en el plano; si lo cumple, la recta está contenida; si no, es paralela.',
    ],
    params: [{ key: 'tipo', label: 'Elementos', options: [['rectas', 'Dos rectas'], ['planos', 'Dos planos'], ['rp', 'Recta y plano']] }],
    generate(p) {
      if (p.tipo === 'planos') {
        const t = rnd.int(0, 2);
        const n1 = vnz(-3, 3), D1 = rnd.int(-5, 5);
        let n2, D2, stp;
        if (t === 0) { do { n2 = vnz(-3, 3); } while (isZero(cross(n1, n2))); D2 = rnd.int(-5, 5); stp = ['Los vectores normales ' + i$('\\vec n_1=' + vt(n1)) + ' y ' + i$('\\vec n_2=' + vt(n2)) + ' <b>no</b> son proporcionales (' + i$('\\vec n_1\\times\\vec n_2=' + vt(cross(n1, n2)) + '\\neq\\vec 0') + ').', 'Luego los planos se cortan en una recta: <b>secantes</b>.']; }
        else {
          const k = rnd.pick([-3, -2, 2, 3]);
          n2 = scal(k, n1);
          if (t === 1) { D2 = k * D1 + rnd.pick([-4, -3, -2, -1, 1, 2, 3, 4]); stp = ['Los coeficientes ' + i$('(A,B,C)') + ' son proporcionales: ' + i$('\\vec n_2=' + k + '\\,\\vec n_1') + '.', 'Pero ' + i$('D_2=' + D2 + '\\neq ' + k + '\\cdot ' + par(D1) + '=' + k * D1) + ', no es la misma proporción: <b>paralelos</b>.']; }
          else { D2 = k * D1; stp = ['Todos los coeficientes cumplen ' + i$('(A_2,B_2,C_2,D_2)=' + k + '\\,(A_1,B_1,C_1,D_1)') + ': mismo plano, <b>coincidentes</b>.']; }
        }
        const c1 = [n1[0], n1[1], n1[2], D1], c2 = [n2[0], n2[1], n2[2], D2];
        return {
          prompt: 'Estudia la posición relativa de los planos ' + d$('\\pi_1:\\ ' + eqTex(c1) + '\\qquad \\pi_2:\\ ' + eqTex(c2)),
          answer: { kind: 'choice', options: PLANE_LABELS, value: t },
          steps: stp,
          data: { tipo: 'planos', c1, c2, t },
        };
      }
      if (p.tipo === 'rectas') {
        for (;;) {
          const t = rnd.int(0, 3);
          let P = vrand(-3, 3), u = vnz(-2, 2), Q, v;
          if (t === 0 || t === 1) { v = scal(rnd.pick([-2, -1, 1, 2]), u); Q = t === 1 ? add(P, scal(rnd.pick([-2, -1, 1, 2, 3]), u)) : add(P, vnz(-3, 3)); }
          else {
            v = vnz(-2, 2);
            if (isZero(cross(u, v))) continue;
            if (t === 2) { const I = vrand(-3, 3); P = sub(I, scal(rnd.pick([-2, -1, 1, 2]), u)); Q = sub(I, scal(rnd.pick([-2, -1, 1, 2]), v)); }
            else Q = add(P, vnz(-3, 3));
          }
          if (classifyLines(P, u, Q, v) !== t) continue;
          const PQ = sub(Q, P), c = cross(u, v);
          const st = ['Punto y vector director de cada recta: ' + d$('P=' + vt(P) + ',\\ \\vec u=' + vt(u) + '\\qquad Q=' + vt(Q) + ',\\ \\vec v=' + vt(v)), 'Vector que une los puntos: ' + i$('\\vec{PQ}=' + vt(PQ))];
          if (t <= 1) {
            st.push('Los directores son proporcionales (' + i$('\\vec v=' + ftex(fr(v.find((x) => x) , u[v.findIndex((x) => x)])) + '\\vec u') + '), así que las rectas son paralelas o coincidentes.');
            st.push(t === 1 ? i$('\\vec{PQ}') + ' también es proporcional a ' + i$('\\vec u') + ' (' + i$('\\vec{PQ}\\times\\vec u=\\vec 0') + '): ' + i$('Q') + ' está en ' + i$('r') + '. <b>Coincidentes</b>.' : i$('\\vec{PQ}\\times\\vec u=' + vt(cross(PQ, u)) + '\\neq\\vec 0') + ': ' + i$('Q') + ' no está en ' + i$('r') + '. <b>Paralelas</b>.');
          } else {
            st.push('Los directores no son proporcionales: ' + i$('\\vec u\\times\\vec v=' + vt(c) + '\\neq\\vec 0') + '. Miramos el producto mixto: ' + d$('[\\vec u,\\vec v,\\vec{PQ}]=' + G.mtex(M([u, v, PQ]), 'vmatrix') + '=' + dot(PQ, c)));
            st.push(t === 2 ? 'Es 0: las rectas son coplanarias y no paralelas, luego <b>se cortan</b> en un punto.' : 'No es 0: no son coplanarias, luego <b>se cruzan</b>.');
          }
          return {
            prompt: 'Estudia la posición relativa de las rectas ' + d$(lineTex('r', P, u) + '\\qquad ' + lineTex('s', Q, v)),
            answer: { kind: 'choice', options: LINE_LABELS, value: t },
            steps: st,
            data: { tipo: 'rectas', P, u, Q, v, t },
          };
        }
      }
      // recta y plano
      for (;;) {
        const t = rnd.int(0, 2);
        const n = vnz(-3, 3), P = vrand(-3, 3);
        let v;
        if (t === 0) { v = vnz(-3, 3); if (dot(n, v) === 0) continue; }
        else { const w = vnz(-2, 2); v = reduceV(cross(n, w)); if (isZero(v)) continue; }
        const D = t === 2 ? -dot(n, P) : t === 1 ? -dot(n, P) + rnd.pick([-4, -3, -2, -1, 1, 2, 3, 4]) : rnd.int(-5, 5);
        const nv = dot(n, v);
        const st = ['Vector director ' + i$('\\vec v=' + vt(v)) + ' y normal ' + i$('\\vec n=' + vt(n)) + '. Producto escalar: ' + i$('\\vec n\\cdot\\vec v=' + nv) + '.'];
        if (t === 0) st.push('Es distinto de 0: la recta no es paralela al plano, luego son <b>secantes</b>.');
        else {
          const val = dot(n, P) + D;
          st.push('Es 0: la recta es paralela al plano o está contenida en él. Probamos el punto ' + i$(ptex('P', P)) + ' de la recta: ' + i$('A x_0+By_0+Cz_0+D=' + val));
          st.push(t === 2 ? 'Vale 0: ' + i$('P') + ' está en el plano, luego la recta está <b>contenida</b>.' : 'No vale 0: ' + i$('P') + ' no está en el plano, luego la recta es <b>paralela</b>.');
        }
        return {
          prompt: 'Estudia la posición relativa de ' + d$(lineTex('r', P, v)) + 'y el plano ' + i$('\\pi:\\ ' + eqTex([n[0], n[1], n[2], D])),
          answer: { kind: 'choice', options: RP_LABELS, value: t },
          steps: st,
          data: { tipo: 'rp', P, v, n, D, t },
        };
      }
    },
  });

  /* ===================== 4. Distancias ===================== */
  G.define({
    id: 'distancias',
    title: 'Distancias',
    help: [
      '$d(P,\\pi)=\\dfrac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}$ · $d(P,r)=\\dfrac{|\\vec{QP}\\times\\vec v|}{|\\vec v|}$ con $Q$ en la recta y $\\vec v$ su director · planos paralelos: $d=\\dfrac{|D_1-D_2|}{\\sqrt{A^2+B^2+C^2}}$ (con los mismos $A,B,C$).',
      'Ejemplo: $P(1,2,2)$ y $\\pi:\\ 2x-y+2z+3=0$. ' + d$('d=\\frac{|2\\cdot1-2+2\\cdot2+3|}{\\sqrt{4+1+4}}=\\frac{7}{3}') + 'Los denominadores salen enteros en estos ejercicios.',
    ],
    params: [{ key: 'tipo', label: 'Distancia', options: [['pp', 'Punto a plano'], ['pr', 'Punto a recta'], ['pl', 'Entre planos paralelos']] }],
    generate(p) {
      if (p.tipo === 'pp') {
        const n = pythVec(), D = rnd.int(-8, 8), P = vrand(-4, 4);
        const N = isqrt(norm2(n)), val = dot(n, P) + D;
        const ans = fr(Math.abs(val), N);
        return {
          prompt: 'Calcula la distancia del punto ' + i$(ptex('P', P)) + ' al plano ' + i$('\\pi:\\ ' + eqTex([n[0], n[1], n[2], D])),
          answer: { kind: 'number', label: 'd=', value: ans },
          steps: ['Aplicamos la fórmula: ' + d$('d(P,\\pi)=\\frac{|' + par(n[0]) + '\\cdot' + par(P[0]) + '+' + par(n[1]) + '\\cdot' + par(P[1]) + '+' + par(n[2]) + '\\cdot' + par(P[2]) + '+' + par(D) + '|}{\\sqrt{' + n.map((x) => par(x) + '^2').join('+') + '}}=\\frac{|' + val + '|}{\\sqrt{' + norm2(n) + '}}=\\frac{' + Math.abs(val) + '}{' + N + '}=' + ftex(ans))],
          data: { tipo: 'pp', n, D, P, dist: Math.abs(val) / N },
        };
      }
      if (p.tipo === 'pl') {
        const n = pythVec(), D1 = rnd.int(-8, 8);
        let D2; do { D2 = rnd.int(-8, 8); } while (D2 === D1);
        const k = rnd.pick([1, 1, 2, -1, -2]);
        const N = isqrt(norm2(n)), ans = fr(Math.abs(D1 - D2), N);
        const c1 = [n[0], n[1], n[2], D1], c2 = [k * n[0], k * n[1], k * n[2], k * D2];
        const st = k === 1 ? [] : ['Dividimos el segundo plano entre ' + k + ' para que tenga los mismos coeficientes que el primero: ' + i$(eqTex([n[0], n[1], n[2], D2]))];
        st.push('Planos paralelos ' + i$('Ax+By+Cz+D_1=0') + ' y ' + i$('Ax+By+Cz+D_2=0') + ': ' + d$('d=\\frac{|D_1-D_2|}{\\sqrt{A^2+B^2+C^2}}=\\frac{|' + D1 + '-(' + D2 + ')|}{\\sqrt{' + norm2(n) + '}}=\\frac{' + Math.abs(D1 - D2) + '}{' + N + '}=' + ftex(ans)));
        return {
          prompt: 'Calcula la distancia entre los planos paralelos ' + d$('\\pi_1:\\ ' + eqTex(c1) + '\\qquad \\pi_2:\\ ' + eqTex(c2)),
          answer: { kind: 'number', label: 'd=', value: ans },
          steps: st,
          data: { tipo: 'pl', c1, c2, dist: Math.abs(D1 - D2) / N },
        };
      }
      for (let tries = 0; tries < 100000; tries++) {
        const v = pythVec(), Q = vrand(-3, 3), P = vrand(-4, 4);
        const w = sub(P, Q), c = cross(w, v);
        const nc = isqrt(norm2(c)), nv = isqrt(norm2(v));
        if (nc <= 0) continue;
        const ans = fr(nc, nv);
        return {
          prompt: 'Calcula la distancia del punto ' + i$(ptex('P', P)) + ' a la recta ' + d$(lineTex('r', Q, v)),
          answer: { kind: 'number', label: 'd=', value: ans },
          steps: [
            'Vector ' + i$('\\vec{QP}=' + vt(w)) + ' y producto vectorial: ' + d$('\\vec{QP}\\times\\vec v=' + crossTex(w, v) + '=' + vt(c)),
            'Módulos: ' + i$('|\\vec{QP}\\times\\vec v|=\\sqrt{' + norm2(c) + '}=' + nc) + ', ' + i$('|\\vec v|=\\sqrt{' + norm2(v) + '}=' + nv),
            'Distancia: ' + d$('d(P,r)=\\frac{|\\vec{QP}\\times\\vec v|}{|\\vec v|}=\\frac{' + nc + '}{' + nv + '}=' + ftex(ans)),
          ],
          data: { tipo: 'pr', Q, v, P, dist: nc / nv },
        };
      }
      throw new Error('no se pudo generar la distancia punto-recta');
    },
  });

  /* ===================== 5. Simétrico respecto de un plano ===================== */
  G.define({
    id: 'simetrico',
    title: 'Simétrico de un punto respecto de un plano',
    help: [
      'Simétrico $P^{\\prime}$ de $P$ respecto de un plano: 1) recta perpendicular al plano por $P$ (director = normal); 2) punto de corte $I$ con el plano; 3) $I$ es el punto medio de $PP^{\\prime}$, luego $P^{\\prime}=2I-P$.',
      'Ejemplo: $P(1,1,1)$ y el plano $z=0$. La recta es $(1,1,1+t)$; corta al plano con $1+t=0$, $t=-1$, $I=(1,1,0)$. Entonces $P^{\\prime}=2(1,1,0)-(1,1,1)=(1,1,-1)$.',
    ],
    params: [],
    generate() {
      for (;;) {
        const n0 = vnz(-3, 3), I = vrand(-3, 3), s = rnd.pick([-3, -2, -1, 1, 2, 3]);
        const pl = planeFrom(n0, I), n = pl.slice(0, 3), D = pl[3];
        // I sigue en el plano; P = I + s n
        const P = add(I, scal(s, n));
        const Ps = sub(I, scal(s, n));
        const val = dot(n, P) + D, N2 = norm2(n);
        if (Math.max(...P.map(Math.abs)) > 12) continue;
        return {
          prompt: 'Halla el simétrico de ' + i$(ptex('P', P)) + ' respecto del plano ' + i$('\\pi:\\ ' + eqTex(pl)),
          answer: { kind: 'matrix', label: "P'=", value: row(Ps) },
          steps: [
            'Recta perpendicular al plano por ' + i$('P') + ' (su director es la normal ' + i$('\\vec n=' + vt(n)) + '): ' + d$(lineTex('r', P, n)),
            'La cortamos con el plano: ' + d$(n.map((a, i) => par(a) + '(' + linTex(P[i], n[i], 't') + ')').join('+') + '+(' + D + ')=0\\ \\Rightarrow\\ ' + N2 + 't+(' + val + ')=0\\ \\Rightarrow\\ t=' + ftex(fr(-val, N2))),
            'Punto de corte (proyección de ' + i$('P') + '): ' + d$('I=' + vt(P) + '+' + par(-s) + vt(n) + '=' + vt(I)),
            i$('I') + ' es el punto medio de ' + i$("PP'") + ': ' + d$("P'=2I-P=2" + vt(I) + '-' + vt(P) + '=' + vt(Ps)),
          ],
          data: { pl, P, I, Ps },
        };
      }
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
