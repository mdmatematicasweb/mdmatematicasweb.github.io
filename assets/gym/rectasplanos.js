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
  G.rp = { eqTex, planeFrom, lineTex, paramTex, shift, par, crossTex };
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
        mistakes: eq[3] === 0 ? [] : [{ value: row([eq[0], eq[1], eq[2], -eq[3]]), msg: 'el término independiente es $D=-\\vec n\\cdot P$, con signo <b>menos</b>.' }],
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
          mistakes: [{ value: row(sub(Q, scal(t0, v))), msg: 'sustituye $t$ con su signo: el punto es $Q+t\\,\\vec v$ con $t=' + t0 + '$.' }],
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
      '$d(P,\\pi)=\\dfrac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}$ · $d(P,r)=\\dfrac{|\\vec{QP}\\times\\vec v|}{|\\vec v|}$ con $Q$ en la recta y $\\vec v$ su director · rectas que se cruzan: $d=\\dfrac{|[\\vec u,\\vec v,\\vec{PQ}]|}{|\\vec u\\times\\vec v|}$ · planos paralelos: $d=\\dfrac{|D_1-D_2|}{\\sqrt{A^2+B^2+C^2}}$ (con los mismos $A,B,C$).',
      'Ejemplo: $P(1,2,2)$ y $\\pi:\\ 2x-y+2z+3=0$. ' + d$('d=\\frac{|2\\cdot1-2+2\\cdot2+3|}{\\sqrt{4+1+4}}=\\frac{7}{3}') + 'Los denominadores salen enteros en estos ejercicios.',
    ],
    params: [{ key: 'tipo', label: 'Distancia', options: [['pp', 'Punto a plano'], ['pr', 'Punto a recta'], ['pl', 'Entre planos paralelos'], ['rr', 'Entre rectas que se cruzan']] }],
    generate(p) {
      if (p.tipo === 'pp') {
        const n = pythVec(), D = rnd.int(-8, 8), P = vrand(-4, 4);
        const N = isqrt(norm2(n)), val = dot(n, P) + D;
        const ans = fr(Math.abs(val), N);
        return {
          prompt: 'Calcula la distancia del punto ' + i$(ptex('P', P)) + ' al plano ' + i$('\\pi:\\ ' + eqTex([n[0], n[1], n[2], D])),
          answer: { kind: 'number', label: 'd=', value: ans },
          steps: ['Aplicamos la fórmula: ' + d$('d(P,\\pi)=\\frac{|' + par(n[0]) + '\\cdot' + par(P[0]) + '+' + par(n[1]) + '\\cdot' + par(P[1]) + '+' + par(n[2]) + '\\cdot' + par(P[2]) + '+' + par(D) + '|}{\\sqrt{' + n.map((x) => par(x) + '^2').join('+') + '}}=\\frac{|' + val + '|}{\\sqrt{' + norm2(n) + '}}=\\frac{' + Math.abs(val) + '}{' + N + '}=' + ftex(ans))],
          mistakes: [{ value: fr(Math.abs(val)), msg: 'falta dividir entre $\\sqrt{A^2+B^2+C^2}=' + N + '$.' }],
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
          mistakes: [{ value: fr(Math.abs(D1 - D2)), msg: 'falta dividir entre $\\sqrt{A^2+B^2+C^2}=' + N + '$.' }].concat(k === 1 ? [] : [{ value: fr(Math.abs(D1 - k * D2), N), msg: 'antes de aplicar la fórmula, los dos planos deben tener los mismos $A,B,C$: divide la ecuación del segundo plano entre ' + k + '.' }]),
          data: { tipo: 'pl', c1, c2, dist: Math.abs(D1 - D2) / N },
        };
      }
      if (p.tipo === 'rr') {
        for (let tries = 0; tries < 200000; tries++) {
          const u = vnz(-3, 3), v = vnz(-3, 3), P = vrand(-3, 3), Q = vrand(-3, 3);
          const c = cross(u, v), nc = isqrt(norm2(c)), PQ = sub(Q, P), mix = dot(PQ, c);
          if (nc <= 0 || mix === 0) continue;
          const ans = fr(Math.abs(mix), nc);
          return {
            prompt: 'Calcula la distancia entre las rectas que se cruzan ' + d$(lineTex('r', P, u) + '\\qquad ' + lineTex('s', Q, v)),
            answer: { kind: 'number', label: 'd=', value: ans },
            steps: [
              'Vector entre puntos ' + i$('\\vec{PQ}=' + vt(PQ)) + ' y producto vectorial de los directores: ' + d$('\\vec u\\times\\vec v=' + crossTex(u, v) + '=' + vt(c)),
              'Producto mixto: ' + i$('[\\vec u,\\vec v,\\vec{PQ}]=' + mix) + '. Módulo: ' + i$('|\\vec u\\times\\vec v|=\\sqrt{' + norm2(c) + '}=' + nc),
              'Distancia: ' + d$('d(r,s)=\\frac{|[\\vec u,\\vec v,\\vec{PQ}]|}{|\\vec u\\times\\vec v|}=\\frac{' + Math.abs(mix) + '}{' + nc + '}=' + ftex(ans)),
            ],
            mistakes: [{ value: fr(Math.abs(mix)), msg: 'falta dividir entre $|\\vec u\\times\\vec v|=' + nc + '$.' }],
            data: { tipo: 'rr', P, u, Q, v, dist: Math.abs(mix) / nc },
          };
        }
        throw new Error('no se pudo generar la distancia entre rectas');
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
          mistakes: [{ value: fr(nc), msg: 'falta dividir entre $|\\vec v|=' + nv + '$.' }],
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
          mistakes: [{ value: row(I), msg: 'eso es el <b>pie de la perpendicular</b> (la proyección). El simétrico está al otro lado del plano: $P^{\\prime}=2I-P$.' }],
          data: { pl, P, I, Ps },
        };
      }
    },
  });

  /* ===================== 6. Ecuaciones de la recta ===================== */
  G.define({
    id: 'recta',
    title: 'Ecuaciones de la recta',
    help: [
      'Una recta queda determinada por un punto $P$ y un vector director $\\vec v$: $(x,y,z)=P+t\\,\\vec v$, o en paramétricas $x=x_0+at,\\ y=y_0+bt,\\ z=z_0+ct$. Por dos puntos $A,B$: $\\vec v=\\vec{AB}=B-A$. Como intersección de dos planos: $\\vec v=\\vec n_1\\times\\vec n_2$ (perpendicular a las dos normales).',
      'Ejemplo: recta por $A(1,0,2)$ y $B(3,4,1)$: $\\vec{AB}=(2,4,-1)$ y $r:\\ (x,y,z)=(1,0,2)+t(2,4,-1)$. Con $t=2$: $(1+4,\\,0+8,\\,2-2)=(5,8,0)$. Un punto $Q$ está en la recta si existe un mismo $t$ que cumple las tres coordenadas.',
    ],
    params: [{ key: 'tipo', label: 'Ejercicio', options: [['dir2p', 'Director por dos puntos'], ['dirplanos', 'Director (dos planos)'], ['punto', 'Punto para un valor de t'], ['pert', '¿Pertenece el punto?']] }],
    generate(p) {
      if (p.tipo === 'dir2p') {
        let A, B;
        do { A = vrand(-5, 5); B = vrand(-5, 5); } while (isZero(sub(B, A)));
        const v = sub(B, A);
        return {
          prompt: 'Halla un vector director de la recta que pasa por ' + i$(ptex('A', A) + ' y ' + ptex('B', B)) + '. Escribe ' + i$('(a,b,c)') + ' (vale cualquier múltiplo no nulo).',
          answer: { kind: 'matrix', label: '\\vec v=', value: row(v), proportional: true },
          steps: ['Un vector director es el que une los dos puntos: ' + d$('\\vec{AB}=B-A=' + vt(B) + '-' + vt(A) + '=' + vt(v)), 'Cualquier múltiplo no nulo de ' + i$('\\vec{AB}') + ' también lo es.'],
          data: { tipo: 'dir2p', A, B, v },
        };
      }
      if (p.tipo === 'dirplanos') {
        let n1, n2;
        do { n1 = vnz(-3, 3); n2 = vnz(-3, 3); } while (isZero(cross(n1, n2)));
        const v = cross(n1, n2);
        const D1 = rnd.int(-5, 5), D2 = rnd.int(-5, 5);
        return {
          prompt: 'La recta ' + i$('r') + ' es la intersección de los planos ' + d$('\\pi_1:\\ ' + eqTex([n1[0], n1[1], n1[2], D1]) + '\\qquad \\pi_2:\\ ' + eqTex([n2[0], n2[1], n2[2], D2])) + 'Halla un vector director de ' + i$('r') + ' (vale cualquier múltiplo no nulo).',
          answer: { kind: 'matrix', label: '\\vec v=', value: row(v), proportional: true },
          steps: ['La recta está en los dos planos, luego su director es perpendicular a las dos normales ' + i$('\\vec n_1=' + vt(n1)) + ' y ' + i$('\\vec n_2=' + vt(n2)) + '.', 'Por tanto ' + d$('\\vec v=\\vec n_1\\times\\vec n_2=' + crossTex(n1, n2) + '=' + vt(v))],
          mistakes: [],
          data: { tipo: 'dirplanos', n1, n2, v },
        };
      }
      const P = vrand(-4, 4), v = vnz(-3, 3);
      if (p.tipo === 'punto') {
        const t0 = rnd.pick([-3, -2, -1, 2, 3, 4]);
        const Q = add(P, scal(t0, v));
        return {
          prompt: 'Halla el punto de la recta ' + d$('r:' + paramTex(P, v)) + 'que corresponde a ' + i$('t=' + t0) + '.',
          answer: { kind: 'matrix', label: 'Q=', value: row(Q) },
          steps: ['Sustituimos ' + i$('t=' + t0) + ' en cada coordenada: ' + d$('Q=(' + [0, 1, 2].map((i) => P[i] + '+' + par(v[i]) + '\\cdot' + par(t0)).join(',\\ ') + ')=' + vt(Q))],
          mistakes: [{ value: row(sub(P, scal(t0, v))), msg: 'cuidado con el signo de $t$: $Q=P+t\\,\\vec v$ con $t=' + t0 + '$.' }],
          data: { tipo: 'punto', P, v, t0, Q },
        };
      }
      const yes = rnd.int(0, 1), t0 = rnd.pick([-2, -1, 1, 2, 3]);
      let Q = add(P, scal(t0, v));
      if (!yes) {
        do { Q = add(P, scal(t0, v)); Q[rnd.int(0, 2)] += rnd.pick([-2, -1, 1, 2]); } while (isZero(cross(sub(Q, P), v)));
      }
      const k0 = v.findIndex((x) => x !== 0);
      const tt = fr(Q[k0] - P[k0], v[k0]);
      const lines = [0, 1, 2].map((i) => i$(Q[i] + '=' + P[i] + (v[i] < 0 ? '' : '+') + v[i] + 't\\ \\Rightarrow\\ t=' + (v[i] === 0 ? (Q[i] === P[i] ? '\\text{(siempre)}' : '\\text{(imposible)}') : ftex(fr(Q[i] - P[i], v[i])))));
      return {
        prompt: '¿Pertenece el punto ' + i$(ptex('Q', Q)) + ' a la recta ' + d$('r:' + paramTex(P, v)) + '?',
        answer: { kind: 'choice', options: ['Sí pertenece', 'No pertenece'], value: yes ? 0 : 1 },
        steps: ['Igualamos cada coordenada y despejamos ' + i$('t') + ': ' + lines.join(' · '), yes ? 'Sale el mismo ' + i$('t=' + ftex(tt)) + ' en las tres: <b>sí pertenece</b>.' : 'No sale el mismo ' + i$('t') + ' en las tres coordenadas: <b>no pertenece</b>.'],
        data: { tipo: 'pert', P, v, Q, yes },
      };
    },
  });

  /* ===================== 7. Ángulos ===================== */
  G.define({
    id: 'angulos',
    title: 'Ángulos entre rectas y planos',
    help: [
      'Entre dos rectas: $\\cos\\alpha=\\dfrac{|\\vec u\\cdot\\vec v|}{|\\vec u||\\vec v|}$ (directores). Entre dos planos: lo mismo con las normales. Entre recta y plano: $\\operatorname{sen}\\alpha=\\dfrac{|\\vec n\\cdot\\vec v|}{|\\vec n||\\vec v|}$ (seno, porque la normal es perpendicular al plano). El valor absoluto da el ángulo agudo.',
      'Ejemplo: $r$ con director $(1,2,2)$ y $s$ con director $(2,3,6)$. $\\vec u\\cdot\\vec v=2+6+12=20$, $|\\vec u|=3$, $|\\vec v|=7$: $\\cos\\alpha=\\frac{20}{21}$. Si el producto escalar saliera $-20$, se toma $+20$.',
    ],
    params: [{ key: 'tipo', label: 'Entre', options: [['rr', 'Dos rectas'], ['pp', 'Dos planos'], ['rp', 'Recta y plano']] }],
    generate(p) {
      const a = pythVec(), b = pythVec();
      const na = isqrt(norm2(a)), nb = isqrt(norm2(b));
      const dd = dot(a, b), val = fr(Math.abs(dd), na * nb);
      const neg = dd < 0 ? [{ value: fr(dd, na * nb), msg: 'el ángulo entre rectas o planos se toma agudo: usa el <b>valor absoluto</b> del producto escalar.' }] : [];
      if (p.tipo === 'rr') {
        const P = vrand(-3, 3), Q = vrand(-3, 3);
        return {
          prompt: 'Calcula el coseno del ángulo agudo que forman las rectas ' + d$(lineTex('r', P, a) + '\\qquad ' + lineTex('s', Q, b)),
          answer: { kind: 'number', label: '\\cos\\alpha=', value: val },
          steps: ['Usamos los vectores directores ' + i$('\\vec u=' + vt(a)) + ' y ' + i$('\\vec v=' + vt(b)) + ': ' + d$('\\vec u\\cdot\\vec v=' + dd + ',\\quad |\\vec u|=' + na + ',\\quad |\\vec v|=' + nb),
            d$('\\cos\\alpha=\\frac{|' + dd + '|}{' + na + '\\cdot' + nb + '}=' + ftex(val))],
          mistakes: neg,
          data: { tipo: 'rr', a, b, val: Math.abs(dd) / (na * nb) },
        };
      }
      if (p.tipo === 'pp') {
        const D1 = rnd.int(-5, 5), D2 = rnd.int(-5, 5);
        return {
          prompt: 'Calcula el coseno del ángulo agudo que forman los planos ' + d$('\\pi_1:\\ ' + eqTex([a[0], a[1], a[2], D1]) + '\\qquad \\pi_2:\\ ' + eqTex([b[0], b[1], b[2], D2])),
          answer: { kind: 'number', label: '\\cos\\alpha=', value: val },
          steps: ['El ángulo entre planos es el de sus normales ' + i$('\\vec n_1=' + vt(a)) + ' y ' + i$('\\vec n_2=' + vt(b)) + ': ' + d$('\\vec n_1\\cdot\\vec n_2=' + dd + ',\\quad |\\vec n_1|=' + na + ',\\quad |\\vec n_2|=' + nb),
            d$('\\cos\\alpha=\\frac{|' + dd + '|}{' + na + '\\cdot' + nb + '}=' + ftex(val))],
          mistakes: neg,
          data: { tipo: 'pp', a, b, val: Math.abs(dd) / (na * nb) },
        };
      }
      const P = vrand(-3, 3), D = rnd.int(-5, 5);
      return {
        prompt: 'Calcula el <b>seno</b> del ángulo que forman la recta ' + d$(lineTex('r', P, a)) + 'y el plano ' + i$('\\pi:\\ ' + eqTex([b[0], b[1], b[2], D]) ),
        answer: { kind: 'number', label: '\\operatorname{sen}\\alpha=', value: val },
        steps: ['Director de la recta ' + i$('\\vec v=' + vt(a)) + ' y normal del plano ' + i$('\\vec n=' + vt(b)) + ': ' + d$('\\vec n\\cdot\\vec v=' + dd + ',\\quad |\\vec n|=' + nb + ',\\quad |\\vec v|=' + na),
          d$('\\operatorname{sen}\\alpha=\\frac{|\\vec n\\cdot\\vec v|}{|\\vec n||\\vec v|}=\\frac{|' + dd + '|}{' + nb + '\\cdot' + na + '}=' + ftex(val))],
        mistakes: neg,
        data: { tipo: 'rp', a, b, val: Math.abs(dd) / (na * nb) },
      };
    },
  });

  /* ===================== 8. Proyecciones y simétricos ===================== */
  G.define({
    id: 'proyecciones',
    title: 'Proyecciones y simétricos',
    help: [
      'Proyección de $P$ sobre un plano o una recta: es el punto $I$ de ese plano o recta más cercano a $P$ (el pie de la perpendicular). Sobre un plano: recta por $P$ con director la normal. Sobre una recta: plano por $P$ perpendicular a la recta. Se corta y se obtiene $I$. El simétrico es $P^{\\prime}=2I-P$.',
      'Ejemplo: proyección de $P(1,2,3)$ sobre la recta $r:\\ (x,y,z)=(0,0,0)+t(0,0,1)$. El plano por $P$ perpendicular a $r$ es $z=3$; corta a $r$ en $t=3$: $I=(0,0,3)$. El simétrico de $P$ respecto de $r$ es $2(0,0,3)-(1,2,3)=(-1,-2,3)$.',
    ],
    params: [{ key: 'tipo', label: 'Calcular', options: [['pplano', 'Proyección sobre un plano'], ['precta', 'Proyección sobre una recta'], ['srecta', 'Simétrico respecto de una recta']] }],
    generate(p) {
      if (p.tipo === 'pplano') {
        for (;;) {
          const n0 = vnz(-3, 3), I0 = vrand(-3, 3), s = rnd.pick([-3, -2, -1, 1, 2, 3]);
          const pl = planeFrom(n0, I0), n = pl.slice(0, 3), D = pl[3];
          const P = add(I0, scal(s, n));
          if (Math.max(...P.map(Math.abs)) > 12) continue;
          const val = dot(n, P) + D, N2 = norm2(n);
          return {
            prompt: 'Halla la proyección ortogonal de ' + i$(ptex('P', P)) + ' sobre el plano ' + i$('\\pi:\\ ' + eqTex(pl)),
            answer: { kind: 'matrix', label: 'I=', value: row(I0) },
            steps: ['Recta perpendicular al plano por ' + i$('P') + ' (director = normal ' + i$('\\vec n=' + vt(n)) + '): ' + d$(lineTex('r', P, n)),
              'La cortamos con el plano: ' + d$(n.map((a, i) => par(a) + '(' + linTex(P[i], n[i], 't') + ')').join('+') + '+(' + D + ')=0\\ \\Rightarrow\\ ' + N2 + 't+(' + val + ')=0\\ \\Rightarrow\\ t=' + ftex(fr(-val, N2))),
              'Sustituimos: ' + d$('I=' + vt(P) + '+' + par(-s) + vt(n) + '=' + vt(I0))],
            data: { tipo: 'pplano', pl, P, I: I0 },
          };
        }
      }
      for (;;) {
        const v = vnz(-2, 2), Q = vrand(-3, 3), t0 = rnd.pick([-2, -1, 1, 2, 3]);
        const I = add(Q, scal(t0, v));
        let w = cross(v, vnz(-2, 2));
        if (isZero(w)) continue;
        w = reduceV(w); w = scal(rnd.pick([-1, 1, 2]), w);
        const P = add(I, w);
        if (Math.max(...P.map(Math.abs)) > 12) continue;
        const pl = [v[0], v[1], v[2], -dot(v, P)];
        const PQ = sub(P, Q), v2 = norm2(v), num = dot(v, PQ);
        const steps = ['Plano por ' + i$('P') + ' perpendicular a la recta (su normal es el director ' + i$('\\vec v=' + vt(v)) + '): ' + d$('\\pi:\\ ' + eqTex(pl)),
          'Lo cortamos con la recta ' + i$('r') + ': ' + d$(v.map((a, i) => par(a) + '(' + linTex(Q[i], v[i], 't') + ')').join('+') + '+(' + pl[3] + ')=0\\ \\Rightarrow\\ ' + v2 + 't=' + num + '\\ \\Rightarrow\\ t=' + t0),
          'Punto de corte (proyección de ' + i$('P') + '): ' + d$('I=' + vt(Q) + '+' + par(t0) + vt(v) + '=' + vt(I))];
        if (p.tipo === 'precta') {
          return {
            prompt: 'Halla la proyección ortogonal de ' + i$(ptex('P', P)) + ' sobre la recta ' + d$(lineTex('r', Q, v)),
            answer: { kind: 'matrix', label: 'I=', value: row(I) },
            steps,
            data: { tipo: 'precta', Q, v, P, I },
          };
        }
        const Ps = sub(I, w);
        steps.push(i$('I') + ' es el punto medio de ' + i$("PP'") + ': ' + d$("P'=2I-P=2" + vt(I) + '-' + vt(P) + '=' + vt(Ps)));
        return {
          prompt: 'Halla el simétrico de ' + i$(ptex('P', P)) + ' respecto de la recta ' + d$(lineTex('r', Q, v)),
          answer: { kind: 'matrix', label: "P'=", value: row(Ps) },
          steps,
          mistakes: [{ value: row(I), msg: 'eso es la <b>proyección</b> de $P$ sobre la recta. El simétrico está al otro lado: $P^{\\prime}=2I-P$.' }],
          data: { tipo: 'srecta', Q, v, P, I, Ps },
        };
      }
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
