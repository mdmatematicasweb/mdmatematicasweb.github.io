/* Generadores del simulacro CCSS — ejercicio 1 (álgebra, 3 puntos).
 * Tipos: sistema-param, sistema-plant, ec-matricial, matriz-param, prog-lineal.
 * Verificadores independientes: tests/examen-ccss.test.js.
 */
(function (root) {
  'use strict';
  const X = root.MDExamCCSS;
  const U = root.MDExamCCSSUtil;
  const { G, rnd, F, ftex, fstr, d$, i$, part, linTex, systemTex, mt } = U;
  const { fadd, fsub, fmul, fdiv, det, M, mmul, inverse, rankOf, feq } = G;

  const CLASES = ['Compatible determinado', 'Compatible indeterminado', 'Incompatible'];

  /* ===================== Matriz con parámetro: A(m) = L·diag(1, m−r1, m−r2)·U ===================== */
  /** Devuelve {T, r1, r2}: T[i][j] = {a, b} con a·m+b, |A(m)| = (m−r1)(m−r2). */
  function paramMatrix3() {
    for (;;) {
      const r1 = rnd.int(-3, 3), r2 = rnd.int(-3, 3);
      if (r1 === r2) continue;
      const e = () => rnd.pick([-1, 0, 0, 1]);
      const L = [[1, 0, 0], [e(), 1, 0], [e(), e(), 1]];
      const Un = [[1, e(), e()], [0, 1, e()], [0, 0, 1]];
      const D = [{ a: 0, b: 1 }, { a: 1, b: -r1 }, { a: 1, b: -r2 }];
      const T = [0, 1, 2].map((i) => [0, 1, 2].map((j) => {
        let a = 0, b = 0;
        for (let k = 0; k < 3; k++) { const c = L[i][k] * Un[k][j]; a += c * D[k].a; b += c * D[k].b; }
        return { a, b };
      }));
      const flat = [].concat(...T);
      if (flat.some((t) => Math.abs(t.a) > 3 || Math.abs(t.b) > 7)) continue;
      if (T.some((row) => row.every((t) => t.a === 0 && t.b === 0))) continue;
      if (flat.filter((t) => t.a !== 0).length < 3) continue;
      return { T, r1, r2, lo: Math.min(r1, r2), hi: Math.max(r1, r2) };
    }
  }
  const atM = (T, m) => M(T.map((r) => r.map((t) => t.a * m + t.b)));
  const detTex = (r1, r2) => {
    const s = r1 + r2, p = r1 * r2;
    return '|A|=m^2' + (s === 0 ? '' : (-s < 0 ? '-' : '+') + (Math.abs(s) === 1 ? '' : Math.abs(s)) + 'm') + (p === 0 ? '' : (p < 0 ? '-' : '+') + Math.abs(p)) + '=(m' + (r1 === 0 ? '' : (-r1 < 0 ? '-' : '+') + Math.abs(r1)) + ')(m' + (r2 === 0 ? '' : (-r2 < 0 ? '-' : '+') + Math.abs(r2)) + ')';
  };
  const matTexParam = (T) => '\\begin{pmatrix}' + T.map((r) => r.map((t) => linTex(t.a, t.b)).join('&')).join('\\\\') + '\\end{pmatrix}';

  /* ===================== sistema-param ===================== */
  X.implementar({
    id: 'sistema-param',
    generate() {
      for (;;) {
        const { T, lo, hi } = paramMatrix3();
        const b = [rnd.int(-3, 3), rnd.int(-3, 3), rnd.int(-3, 3)];
        if (b.every((x) => x === 0)) continue;
        const roots = [lo, hi];
        const tipo = roots.map((r) => {
          const A = atM(T, r), Ab = A.map((row, i) => row.concat([F(b[i])]));
          const ra = rankOf(A), rab = rankOf(Ab);
          return { r, ra, rab, t: ra < rab ? 2 : (ra === 3 ? 0 : 1) };
        });
        // al menos una raíz con sistema compatible indeterminado (más interesante) o ambas distintas
        if (tipo[0].t === tipo[1].t && rnd.int(0, 2) > 0) continue;
        // un valor m0 no crítico con solución sencilla
        const m0s = [-2, -1, 0, 1, 2, 3, 4].filter((m) => m !== lo && m !== hi);
        const m0 = rnd.pick(m0s);
        const A0 = atM(T, m0), d0 = det(A0);
        if (Math.abs(d0.n / d0.d) > 12) continue;
        const inv = inverse(A0);
        const sol = G.mmul(inv, M(b.map((x) => [x]))).map((r) => r[0]);
        if (sol.some((f) => f.d > 12)) continue;
        const rows = T.map((r) => r.map((t) => ({ a: t.a, b: t.b })));
        const sys = systemTex(rows, b);
        const dt = detTex(lo, hi);
        const cls = (k) => {
          const ti = tipo[k];
          return ['Para ' + i$('m=' + ti.r) + ': ' + i$('\\operatorname{rg}A=' + ti.ra) + ' y ' + i$('\\operatorname{rg}A^*=' + ti.rab) + '. ' +
            (ti.t === 2 ? 'Como los rangos son distintos, el sistema es incompatible.' : ti.t === 1 ? 'Los rangos coinciden y son menores que 3 (el número de incógnitas): compatible indeterminado.' : 'Rangos iguales a 3: compatible determinado.')];
        };
        const Astar = (m) => mt(atM(T, m).map((row, i) => row.concat([F(b[i])]))).replace('pmatrix', 'array').replace(/\\begin\{array\}/, '\\left(\\begin{array}{ccc|c}').replace(/\\end\{array\}/, '\\end{array}\\right)');
        return {
          enunciado: 'Considera el sistema de ecuaciones ' + d$(sys) + 'donde ' + i$('m') + ' es un parámetro real.',
          partes: [
            part('Calcula los valores de ' + i$('m') + ' para los que la matriz de coeficientes no tiene inversa (el determinante se anula). <small>(valores separados por «;»)</small>', 1,
              { kind: 'list', value: [F(lo), F(hi)] },
              ['Matriz de coeficientes: ' + d$('A=' + matTexParam(T)), 'Desarrollando por Sarrus: ' + d$(dt), 'Se anula en ' + i$('m=' + lo) + ' y ' + i$('m=' + hi) + '.']),
            part('Clasifica el sistema para ' + i$('m=' + lo) + '.', 0.75, { kind: 'choice', options: CLASES, value: tipo[0].t },
              cls(0).concat(['Matriz ampliada: ' + d$(Astar(lo))])),
            part('Clasifica el sistema para ' + i$('m=' + hi) + '.', 0.75, { kind: 'choice', options: CLASES, value: tipo[1].t },
              cls(1).concat(['Matriz ampliada: ' + d$(Astar(hi))])),
            part('Resuelve el sistema para ' + i$('m=' + m0) + '.', 0.5,
              { kind: 'multi', parts: [{ kind: 'number', label: 'x=', value: sol[0] }, { kind: 'number', label: 'y=', value: sol[1] }, { kind: 'number', label: 'z=', value: sol[2] }] },
              ['Para ' + i$('m=' + m0) + ', ' + i$('|A|=' + fstr(d0)) + ' ≠ 0: compatible determinado. Por la regla de Cramer o por Gauss:',
                d$('x=' + ftex(sol[0]) + ',\\quad y=' + ftex(sol[1]) + ',\\quad z=' + ftex(sol[2]))]),
          ],
          data: { T, b, lo, hi, tipos: tipo.map((t) => t.t), m0, sol: sol.map((f) => [f.n, f.d]) },
        };
      }
    },
  });

  /* ===================== sistema-plant ===================== */
  const lista = (xs) => (xs.length < 2 ? xs.join('') : xs.slice(0, -1).join(', ') + ' y ' + xs[xs.length - 1]);
  const CTX_PLANT = [
    { intro: 'En una tienda de ropa, tres clientes realizan estas compras de camisetas (x), pantalones (y) y chaquetas (z), con los precios en euros por unidad:',
      sujetos: ['Ana', 'Luis', 'Marta'], uds: ['camisetas', 'pantalones', 'chaquetas'], tot: (v) => 'paga ' + v + ' €', rango: [[8, 25], [20, 45], [35, 80]],
      pregunta: 'cuánto pagaría una persona que compra', fin: ' €', corto: 'precio de una camiseta, de un pantalón y de una chaqueta' },
    { intro: 'En una cafetería, tres mesas piden bocadillos (x), refrescos (y) y cafés (z); los precios, en euros por unidad, son los mismos para todos:',
      sujetos: ['La mesa 1', 'La mesa 2', 'La mesa 3'], uds: ['bocadillos', 'refrescos', 'cafés'], tot: (v) => 'paga ' + v + ' €', rango: [[2, 6], [1, 3], [1, 3]],
      pregunta: 'cuánto pagaría una mesa que pide', fin: ' €', corto: 'precio de un bocadillo, de un refresco y de un café' },
    { intro: 'Un cine tiene tres tipos de entrada: adulto (x), joven (y) y jubilado (z), con precios en euros. En tres sesiones se venden estas entradas:',
      sujetos: ['La sesión de tarde', 'La sesión de noche', 'La sesión matinal'], uds: ['entradas de adulto', 'entradas de joven', 'entradas de jubilado'], tot: (v) => 'recauda ' + v + ' €', rango: [[6, 12], [4, 8], [3, 6]],
      pregunta: 'cuánto se recaudaría con', fin: ' €', corto: 'precio de cada tipo de entrada' },
    { intro: 'Una empresa de reparto transporta tres tipos de paquete: pequeño (x), mediano (y) y grande (z), y cobra una tarifa fija en euros por cada tipo. Estos son tres pedidos:',
      sujetos: ['El pedido A', 'El pedido B', 'El pedido C'], uds: ['paquetes pequeños', 'paquetes medianos', 'paquetes grandes'], tot: (v) => 'se factura por ' + v + ' €', rango: [[3, 8], [5, 12], [9, 20]],
      pregunta: 'cuánto se facturaría por', fin: ' €', corto: 'tarifa de cada tipo de paquete' },
  ];
  X.implementar({
    id: 'sistema-plant',
    generate() {
      const c = rnd.pick(CTX_PLANT);
      for (;;) {
        const sol = c.rango.map(([a, b]) => rnd.int(a, b));
        const A = [0, 1, 2].map(() => [rnd.int(0, 4), rnd.int(0, 4), rnd.int(0, 4)]);
        if (A.some((r) => r.reduce((s, x) => s + x, 0) < 3)) continue;
        const d = det(M(A));
        if (d.n === 0 || Math.abs(d.n / d.d) > 30) continue;
        const b = A.map((r) => r[0] * sol[0] + r[1] * sol[1] + r[2] * sol[2]);
        const q = [rnd.int(1, 4), rnd.int(1, 4), rnd.int(1, 4)];
        const nq = q[0] * sol[0] + q[1] * sol[1] + q[2] * sol[2];
        const filas = A.map((r, i) => c.sujetos[i] + ' compra ' + lista([0, 1, 2].filter((j) => r[j] > 0).map((j) => r[j] + ' ' + c.uds[j])) + ' y ' + c.tot(b[i]) + '.');
        const Ab = A.map((r, i) => r.concat([b[i]]));
        const dets = [0, 1, 2].map((k) => det(M(A.map((r, i) => r.map((x, j) => (j === k ? b[i] : x))))));
        return {
          enunciado: c.intro + '<br>' + filas.join('<br>'),
          partes: [
            part('Plantea el sistema de ecuaciones y escribe su matriz ampliada ' + i$('(A\\,|\\,B)') + ' con las incógnitas ' + i$('x') + ', ' + i$('y') + ', ' + i$('z') + ' en ese orden.', 1,
              { kind: 'matrix', value: M(Ab), colLabels: ['x', 'y', 'z', 'B'] },
              ['Cada compra es una ecuación; los coeficientes son las unidades y el término independiente, el importe:', d$(systemTex(A.map((r) => r.map((x) => ({ a: 0, b: x }))), b)),
                'Matriz ampliada: ' + d$(mt(M(Ab)))]),
            part('Resuelve el sistema: calcula el ' + c.corto + '.', 1.5,
              { kind: 'multi', parts: [{ kind: 'number', label: 'x=', value: F(sol[0]) }, { kind: 'number', label: 'y=', value: F(sol[1]) }, { kind: 'number', label: 'z=', value: F(sol[2]) }] },
              ['Por la regla de Cramer, con ' + i$('|A|=' + fstr(d)) + ' ≠ 0:', d$('|A_x|=' + fstr(dets[0]) + ',\\ |A_y|=' + fstr(dets[1]) + ',\\ |A_z|=' + fstr(dets[2])),
                d$('x=\\dfrac{' + fstr(dets[0]) + '}{' + fstr(d) + '}=' + sol[0] + ',\\quad y=\\dfrac{' + fstr(dets[1]) + '}{' + fstr(d) + '}=' + sol[1] + ',\\quad z=\\dfrac{' + fstr(dets[2]) + '}{' + fstr(d) + '}=' + sol[2])]),
            part('Calcula ' + c.pregunta + ' ' + lista(q.map((n, j) => n + ' ' + c.uds[j])) + '.', 0.5, { kind: 'number', label: 'importe (€)=', value: F(nq) },
              [d$(q[0] + '\\cdot' + sol[0] + '+' + q[1] + '\\cdot' + sol[1] + '+' + q[2] + '\\cdot' + sol[2] + '=' + nq) + 'El importe es de ' + nq + ' €.']),
          ],
          data: { A, b, sol, q, nq },
        };
      }
    },
  });

  /* ===================== ec-matricial ===================== */
  function unimodular(n) {
    for (;;) {
      const e = () => rnd.int(-2, 2);
      const Lw = n === 2 ? [[1, 0], [e(), 1]] : [[1, 0, 0], [e(), 1, 0], [e(), e(), 1]];
      const Up = n === 2 ? [[1, e()], [0, 1]] : [[1, e(), e()], [0, 1, e()], [0, 0, 1]];
      const A = mmul(M(Lw), M(Up));
      if (n === 2 && rnd.int(0, 1)) { A[0] = A[0].map((x) => G.fneg(x)); }
      const mx = Math.max(...[].concat(...A).map((f) => Math.abs(f.n)));
      if (mx <= 6) return A;
    }
  }
  const randM = (r, c, lo, hi) => M(Array.from({ length: r }, () => Array.from({ length: c }, () => rnd.int(lo, hi))));
  X.implementar({
    id: 'ec-matricial',
    generate() {
      const tipo = rnd.pick(['ax2', 'xa2', 'axb2', 'ax3']);
      if (tipo === 'ax3') {
        const A = unimodular(3);
        const Xs = randM(3, 2, -3, 3);
        const B = mmul(A, Xs), inv = inverse(A);
        return {
          enunciado: 'Considera las matrices ' + d$('A=' + mt(A) + ',\\qquad B=' + mt(B)) + 'y la ecuación matricial ' + i$('A\\cdot X=B') + '.',
          partes: [
            part('Calcula el determinante de ' + i$('A') + ' y justifica que ' + i$('A') + ' tiene inversa.', 0.75, { kind: 'number', label: '|A|=', value: det(A) },
              ['Por Sarrus (o por adjuntos): ' + d$('|A|=' + fstr(det(A))) + 'Como es distinto de 0, existe ' + i$('A^{-1}') + '.']),
            part('Calcula la matriz inversa ' + i$('A^{-1}') + '.', 1.25, { kind: 'matrix', value: inv },
              ['Matriz de adjuntos: ' + d$(mt(G.cofactors(A))), 'Traspuesta y división por ' + i$('|A|=' + fstr(det(A))) + ': ' + d$('A^{-1}=\\dfrac{1}{|A|}\\,(\\operatorname{Adj}A)^t=' + mt(inv))]),
            part('Resuelve la ecuación ' + i$('A\\cdot X=B') + '.', 1, { kind: 'matrix', value: Xs },
              ['Se multiplica por la inversa por la izquierda: ' + i$('X=A^{-1}\\cdot B') + '.', d$('X=' + mt(inv) + mt(B) + '=' + mt(Xs))]),
          ],
          data: { tipo, A, B, Xs },
        };
      }
      const A = unimodular(2), Xs = randM(2, 2, -3, 3), inv = inverse(A);
      let eq, Bm, ecu, stepEc, Cm = null;
      if (tipo === 'ax2') { Bm = mmul(A, Xs); eq = 'A\\cdot X=B'; ecu = i$('X=A^{-1}\\cdot B'); stepEc = mt(inv) + mt(Bm); }
      else if (tipo === 'xa2') { Bm = mmul(Xs, A); eq = 'X\\cdot A=B'; ecu = i$('X=B\\cdot A^{-1}') + ' (la inversa se multiplica por la derecha)'; stepEc = mt(Bm) + mt(inv); }
      else { Bm = randM(2, 2, -3, 3); Cm = G.madd(mmul(A, Xs), Bm); eq = 'A\\cdot X+B=C'; ecu = i$('X=A^{-1}\\cdot(C-B)'); stepEc = mt(inv) + '\\left(' + mt(Cm) + '-' + mt(Bm) + '\\right)'; }
      const dat = tipo === 'axb2' ? '\\qquad C=' + mt(Cm) : '';
      return {
        enunciado: 'Considera las matrices ' + d$('A=' + mt(A) + ',\\qquad B=' + mt(Bm) + dat) + 'y la ecuación matricial ' + i$(eq) + '.',
        partes: [
          part('Calcula ' + i$('|A|') + ' y justifica que ' + i$('A') + ' tiene inversa.', 0.75, { kind: 'number', label: '|A|=', value: det(A) },
            [d$('|A|=' + fstr(det(A))) + 'Como es distinto de 0, ' + i$('A') + ' es invertible.']),
          part('Calcula ' + i$('A^{-1}') + '.', 1, { kind: 'matrix', value: inv },
            ['Con la fórmula de la inversa de orden 2: ' + d$('A^{-1}=\\dfrac{1}{|A|}\\,(\\operatorname{Adj}A)^t=' + mt(inv))]),
          part('Despeja y calcula la matriz ' + i$('X') + '.', 1.25, { kind: 'matrix', value: Xs },
            ['Se despeja: ' + ecu + '.', d$('X=' + stepEc + '=' + mt(Xs))]),
        ],
        data: { tipo, A, B: Bm, C: Cm, Xs },
      };
    },
  });

  /* ===================== matriz-param ===================== */
  X.implementar({
    id: 'matriz-param',
    generate() {
      for (;;) {
        const { T, lo, hi } = paramMatrix3();
        const roots = [lo, hi];
        const rk = roots.map((r) => rankOf(atM(T, r)));
        // m0 con |A(m0)| = ±1 o ±2 para que la inversa sea manejable
        const cand = [-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((m) => m !== lo && m !== hi && Math.abs((m - lo) * (m - hi)) <= 2);
        if (!cand.length) continue;
        const m0 = rnd.pick(cand);
        const A0 = atM(T, m0), inv = inverse(A0);
        const dt = detTex(lo, hi);
        return {
          enunciado: 'Considera la matriz ' + d$('A=' + matTexParam(T)) + 'donde ' + i$('m') + ' es un parámetro real.',
          partes: [
            part('Calcula los valores de ' + i$('m') + ' para los que ' + i$('A') + ' no tiene inversa. <small>(valores separados por «;»)</small>', 1, { kind: 'list', value: [F(lo), F(hi)] },
              ['Desarrollando el determinante: ' + d$(dt), 'Se anula en ' + i$('m=' + lo) + ' y ' + i$('m=' + hi) + '.']),
            part('Calcula el rango de ' + i$('A') + ' para esos dos valores de ' + i$('m') + '.', 1,
              { kind: 'multi', parts: [{ kind: 'number', label: '\\operatorname{rg}A\\ (m=' + lo + ')=', value: F(rk[0]) }, { kind: 'number', label: '\\operatorname{rg}A\\ (m=' + hi + ')=', value: F(rk[1]) }] },
              ['Para ' + i$('m=' + lo) + ': ' + d$(mt(atM(T, lo))) + 'Tiene determinante 0 y ' + (rk[0] === 2 ? 'algún menor de orden 2 no nulo: rango 2.' : 'todos los menores de orden 2 nulos: rango 1.'),
                'Para ' + i$('m=' + hi) + ': ' + d$(mt(atM(T, hi))) + 'Rango ' + rk[1] + '.']),
            part('Calcula la inversa de ' + i$('A') + ' para ' + i$('m=' + m0) + '.', 1, { kind: 'matrix', value: inv },
              ['Para ' + i$('m=' + m0) + ': ' + d$('A=' + mt(A0) + ',\\quad |A|=' + fstr(det(A0)) + '\\neq0'), 'Adjuntos, traspuesta y división por el determinante: ' + d$('A^{-1}=' + mt(inv))]),
          ],
          data: { T, lo, hi, rk, m0 },
        };
      }
    },
  });

  /* ===================== prog-lineal ===================== */
  /** Vértices de la región {rest ∪ x≥0, y≥0}: intersecciones de pares de rectas que cumplen todo. rest: {a,b,c,op:'<='|'>='}. */
  function vertices(rest) {
    const all = rest.concat([{ a: 1, b: 0, c: 0, op: '>=' }, { a: 0, b: 1, c: 0, op: '>=' }]);
    const ok = (x, y) => all.every((r) => (r.op === '<=' ? r.a * x + r.b * y <= r.c + 1e-9 : r.a * x + r.b * y >= r.c - 1e-9));
    const out = [];
    for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
      const p = all[i], q = all[j], dd = p.a * q.b - p.b * q.a;
      if (dd === 0) continue;
      const x = (p.c * q.b - p.b * q.c) / dd, y = (p.a * q.c - p.c * q.a) / dd;
      if (ok(x, y) && !out.some(([u, v]) => Math.abs(u - x) < 1e-9 && Math.abs(v - y) < 1e-9)) out.push([x, y]);
    }
    return out.sort((u, v) => u[0] - v[0] || u[1] - v[1]);
  }
  const ineqTex1 = (r) => (r.a === 1 ? '' : r.a) + 'x' + '+' + (r.b === 1 ? '' : r.b) + 'y' + (r.op === '<=' ? '\\le ' : '\\ge ') + r.c;
  X.implementar({
    id: 'prog-lineal',
    generate() {
      const maximo = rnd.int(0, 1) === 0;
      for (let intento = 0; intento < 20000; intento++) {
        const nr = maximo ? rnd.int(2, 3) : 2;
        const rest = [];
        for (let i = 0; i < nr; i++) {
          const a = rnd.int(1, 4), b = rnd.int(1, 4), c = rnd.int(6, 40);
          rest.push({ a, b, c, op: maximo ? '<=' : '>=' });
        }
        const V = vertices(rest);
        if (V.length < 3 || V.length > 5) continue;
        if (!V.every(([x, y]) => Number.isInteger(x) && Number.isInteger(y))) continue;
        if (!maximo && V.length < 3) continue;
        const p = rnd.int(1, 6), q = rnd.int(1, 6);
        if (p === q && rnd.int(0, 1)) continue;
        const vals = V.map(([x, y]) => p * x + q * y);
        const best = maximo ? Math.max(...vals) : Math.min(...vals);
        if (vals.filter((v) => v === best).length !== 1) continue;
        if (best === 0) continue;
        const k = vals.indexOf(best);
        // evitar rectas redundantes (cada restricción debe aportar un lado de la región)
        const mismos = (A, B) => A.length === B.length && A.every(([x, y]) => B.some(([u, v]) => Math.abs(u - x) < 1e-9 && Math.abs(v - y) < 1e-9));
        if (rest.some((r, i) => mismos(vertices(rest.filter((_, j) => j !== i)), V))) continue;
        const desc = rest.map((r) => i$(ineqTex1(r))).join(', ');
        return {
          enunciado: 'Considera la región del plano determinada por las inecuaciones ' + desc + ', ' + i$('x\\ge0') + ' e ' + i$('y\\ge0') + ', y la función ' + i$('F(x,y)=' + p + 'x+' + q + 'y') + '.',
          partes: [
            part('Dibuja la región factible y calcula sus vértices. Escríbelos en la matriz, uno por fila y ordenados de menor a mayor ' + i$('x') + ' (y, si hay empate, de menor a mayor ' + i$('y') + ').', 1,
              { kind: 'matrix', value: M(V), colLabels: ['x', 'y'] },
              ['Se intersecan las rectas de dos en dos (incluidos los ejes) y se conservan los puntos que cumplen todas las inecuaciones.', 'Vértices: ' + i$(V.map(([x, y]) => '(' + x + ',' + y + ')').join(',\\ '))]),
            part('Calcula el ' + (maximo ? 'máximo' : 'mínimo') + ' de ' + i$('F') + ' en la región.', 1, { kind: 'number', label: (maximo ? 'F_{\\max}=' : 'F_{\\min}='), value: F(best) },
              ['Se evalúa ' + i$('F') + ' en cada vértice: ' + i$(V.map(([x, y], j) => 'F(' + x + ',' + y + ')=' + vals[j]).join(',\\ ')),
                'El ' + (maximo ? 'mayor' : 'menor') + ' valor es ' + i$(String(best)) + '.' + (maximo ? '' : ' (La región no está acotada, pero ' + i$('F') + ' tiene coeficientes positivos, así que el mínimo está en un vértice.)')]),
            part('¿En qué punto de la región se alcanza?', 1,
              { kind: 'multi', parts: [{ kind: 'number', label: 'x=', value: F(V[k][0]) }, { kind: 'number', label: 'y=', value: F(V[k][1]) }] },
              ['Se alcanza en el vértice ' + i$('(' + V[k][0] + ',' + V[k][1] + ')') + '.']),
          ],
          data: { maximo, rest, V, p, q, vals, k },
        };
      }
      throw new Error('prog-lineal: no se ha encontrado una región adecuada');
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
