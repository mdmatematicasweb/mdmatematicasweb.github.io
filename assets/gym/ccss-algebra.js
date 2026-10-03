/* Ejercicios interactivos — 2º Bachillerato Ciencias Sociales, bloque de álgebra (temas 1 a 3).
 * Módulos propios: ccss-mat-contexto (T1), ccss-sis-matricial (T2),
 * ccss-pl-vertices, ccss-pl-optimo, ccss-pl-problema (T3).
 * Verificadores independientes: tests/verify-gym-ccss.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, M, ftex, d$, i$, fstr } = G;
  const num = (f) => f.n / f.d;

  /* ===================== Tema 1 · Matrices en contexto ===================== */
  const PRODS = [['libros', 'cuadernos', 'mochilas'], ['camisetas', 'pantalones', 'sudaderas'], ['bocadillos', 'ensaladas', 'zumos']];
  const MATS = [['harina', 'levadura'], ['madera', 'tornillos'], ['lana', 'algodón']];
  const mt = (rows) => G.mtex(M(rows));
  const dotTex = (row, col) => row.map((x, k) => x + '\\cdot' + col[k]).join('+');

  G.define({
    id: 'ccss-mat-contexto',
    title: 'Matrices en contexto',
    help: [
      'Para multiplicar $A\\cdot B$ el número de columnas de $A$ debe ser igual al de filas de $B$. El elemento $(i,j)$ del producto es la fila $i$ de $A$ por la columna $j$ de $B$ (se suman los productos). El resultado tiene las filas de $A$ y las columnas de $B$.',
      'Ejemplo: $\\begin{pmatrix}2&3\\end{pmatrix}\\begin{pmatrix}4\\\\5\\end{pmatrix}=2\\cdot4+3\\cdot5=23$. En un problema, «unidades (fila) por precio (columna)» da el ingreso de cada fila; con varios pasos se multiplica de derecha a izquierda ordenando bien las dimensiones.',
    ],
    params: [{ key: 'tipo', label: 'Situación', options: [['ventas', 'Ingreso de cada tienda'], ['coste', 'Coste de producción de cada producto'], ['total', 'Coste total del plan semanal']] }],
    generate(p) {
      if (p.tipo === 'ventas') {
        const s = rnd.pick([2, 3]), pr = rnd.pick(PRODS);
        const V = Array.from({ length: s }, () => Array.from({ length: 3 }, () => 5 * rnd.int(1, 8)));
        const pv = [0, 0, 0].map(() => rnd.int(2, 30));
        const R = V.map((r) => r.reduce((t, x, k) => t + x * pv[k], 0));
        return {
          prompt: 'Una cadena de ' + s + ' tiendas vende ' + pr[0] + ', ' + pr[1] + ' y ' + pr[2] + '. La matriz $V$ recoge las unidades vendidas en una semana (filas: tiendas; columnas: ' + pr.join(', ') + ') y $p$ los precios en euros: '
            + d$('V=' + mt(V) + ',\\qquad p=' + mt(pv.map((x) => [x]))) + 'Calcula $V\\cdot p$, el ingreso semanal de cada tienda.',
          answer: { kind: 'matrix', label: 'V\\cdot p=', value: M(R.map((x) => [x])) },
          steps: ['Cada tienda (fila de $V$) se multiplica por la columna de precios: ' + d$('V\\cdot p=' + G.mtexStr(R.map((_, i) => [dotTex(V[i], pv)]))),
            'Operando: ' + d$('V\\cdot p=' + mt(R.map((x) => [x]))),
            'La tienda ' + (R.indexOf(Math.max(...R)) + 1) + ' es la que más ingresa: ' + i$(Math.max(...R)) + ' € a la semana.'],
          mistakes: [],
          data: { tipo: 'ventas', V, p: pv, R },
        };
      }
      const pr = rnd.pick(PRODS), mat = rnd.pick(MATS);
      const A = Array.from({ length: 3 }, () => [rnd.int(1, 5), rnd.int(1, 5)]);
      const q = [rnd.int(2, 9), rnd.int(2, 9)];
      const Aq = A.map((r) => r[0] * q[0] + r[1] * q[1]);
      const base = 'Una fábrica elabora ' + pr[0] + ', ' + pr[1] + ' y ' + pr[2] + ' con dos materias primas (' + mat[0] + ' y ' + mat[1] + '). La matriz $A$ da las unidades de cada materia prima (columnas) que necesita una unidad de cada producto (filas), y $q$ el precio en euros de cada materia prima:'
        + d$('A=' + mt(A) + ',\\qquad q=' + mt(q.map((x) => [x])));
      if (p.tipo === 'coste') {
        return {
          prompt: base + 'Calcula $A\\cdot q$, el coste en materias primas de una unidad de cada producto.',
          answer: { kind: 'matrix', label: 'A\\cdot q=', value: M(Aq.map((x) => [x])) },
          steps: ['Cada producto (fila de $A$) se multiplica por la columna de precios: ' + d$('A\\cdot q=' + G.mtexStr(A.map((r) => [dotTex(r, q)]))), 'Operando: ' + d$('A\\cdot q=' + mt(Aq.map((x) => [x]))),
            'El primer elemento, ' + i$(Aq[0]) + ' €, es el coste de una unidad de ' + pr[0] + '.'],
          mistakes: [],
          data: { tipo: 'coste', A, q, Aq },
        };
      }
      const r = [0, 0, 0].map(() => 5 * rnd.int(2, 8));
      const tot = r.reduce((t, x, k) => t + x * Aq[k], 0);
      const suma = Aq.reduce((t, x) => t + x, 0);
      return {
        prompt: base + 'El plan semanal de producción es $r=' + mt([r]) + '$ (unidades de ' + pr.join(', ') + '). Calcula el coste total en materias primas de la semana, $r\\cdot A\\cdot q$.',
        answer: { kind: 'number', label: 'r\\cdot A\\cdot q=', value: F(tot) },
        steps: ['Primero el coste de una unidad de cada producto: ' + d$('A\\cdot q=' + mt(Aq.map((x) => [x]))),
          'Después se multiplica el plan por ese vector (fila por columna, $1\\times3$ por $3\\times1$): ' + d$('r\\cdot(A\\cdot q)=' + dotTex(r, Aq) + '=' + tot)],
        mistakes: [{ value: F(suma), msg: 'falta multiplicar cada coste por las unidades del plan $r$: se suman productos fila por columna.' }],
        data: { tipo: 'total', A, q, r, tot },
      };
    },
  });

  /* ===================== Tema 2 · Sistema en forma matricial ===================== */
  const SIS_CTX = [
    { t: 'Una empresa fabrica tres productos con tres máquinas.', f: 'máquinas', u: 'horas', c: ['M1', 'M2', 'M3'], x: 'unidades de cada producto' },
    { t: 'Un taller elabora tres tipos de pieza con tres materiales.', f: 'materiales', u: 'kg', c: ['A', 'B', 'C'], x: 'piezas de cada tipo' },
  ];
  G.define({
    id: 'ccss-sis-matricial',
    title: 'Sistema en forma matricial $AX=B$',
    help: [
      'Un sistema de $n$ ecuaciones con $n$ incógnitas se escribe $A\\cdot X=B$. Si $|A|\\neq0$, existe $A^{-1}$ y la solución es $X=A^{-1}\\cdot B$ (la inversa multiplica por la izquierda).',
      'Pasos: 1) calcula $|A|$; 2) halla $A^{-1}=\\frac1{|A|}\\mathrm{Adj}(A)^t$; 3) multiplica $A^{-1}\\cdot B$. Comprueba sustituyendo en $A\\cdot X=B$.',
    ],
    generate() {
      const cx = rnd.pick(SIS_CTX);
      let A, d;
      do { A = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => rnd.int(0, 4))); d = G.det(M(A)); } while (d.n === 0 || Math.abs(d.n) > 9 || A.some((r) => r.every((x) => x === 0)));
      const X = [rnd.int(1, 9), rnd.int(1, 9), rnd.int(1, 9)];
      const B = A.map((r) => r.reduce((t, x, k) => t + x * X[k], 0));
      const Ai = G.inverse(M(A));
      const Xm = G.mmul(Ai, M(B.map((x) => [x])));
      return {
        prompt: cx.t + ' La matriz $A$ da las ' + cx.u + ' de cada una de las ' + cx.f + ' (filas) que necesita una unidad de cada producto (columnas), y $B$ las ' + cx.u + ' disponibles:'
          + d$('A=' + mt(A) + ',\\qquad B=' + mt(B.map((x) => [x]))) + 'Se emplean todas las ' + cx.u + ': $A\\cdot X=B$, donde $X$ son las ' + cx.x + '. Calcula $X=A^{-1}B$.',
        answer: { kind: 'matrix', label: 'X=', value: Xm },
        steps: ['Determinante: ' + i$('|A|=' + d.n + '\\neq0') + ', luego $A$ tiene inversa.',
          'Inversa (adjuntos traspuestos entre $|A|$): ' + d$('A^{-1}=' + G.mtex(Ai)),
          'Solución: ' + d$('X=A^{-1}B=' + G.mtex(Xm)),
          'Comprobación: ' + i$('A\\cdot X=' + mt(B.map((x) => [x]))) + '.'],
        mistakes: [],
        data: { A, B, X },
      };
    },
  });

  /* ===================== Tema 3 · Programación lineal ===================== */
  /** Restricción {a,b,op,c}: a·x + b·y (op) c, con op '<=' o '>='. */
  const sat = (k, x, y) => { const v = fadd3(k.a, x, k.b, y); return k.op === '<=' ? v.n <= k.c * v.d : v.n >= k.c * v.d; };
  const fadd3 = (a, x, b, y) => G.fadd(G.fmul(F(a), x), G.fmul(F(b), y));   // a·x + b·y con x,y fracciones
  /** Vértices de la región {restricciones, x≥0, y≥0}: [{x:F, y:F, tight:[índices]}], ordenados por x y luego y. */
  function vertices(cons) {
    const all = cons.concat([{ a: 1, b: 0, op: '>=', c: 0 }, { a: 0, b: 1, op: '>=', c: 0 }]);
    const out = [];
    for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
      const k1 = all[i], k2 = all[j], D = k1.a * k2.b - k2.a * k1.b;
      if (D === 0) continue;
      const x = F(k1.c * k2.b - k2.c * k1.b, D), y = F(k1.a * k2.c - k2.a * k1.c, D);
      if (!all.every((k) => sat(k, x, y))) continue;
      if (out.some((v) => G.feq(v.x, x) && G.feq(v.y, y))) continue;
      out.push({ x, y });
    }
    out.forEach((v) => { v.tight = all.map((k, i) => (G.feq(fadd3(k.a, v.x, k.b, v.y), F(k.c)) ? i : -1)).filter((i) => i >= 0); });
    return out.sort((u, v) => (num(u.x) - num(v.x)) || (num(u.y) - num(v.y)));
  }
  const intV = (v) => v.x.d === 1 && v.y.d === 1;
  /** Región de tipo 'max' (≤, acotada) o 'min' (≥, no acotada) con vértices enteros y todas las restricciones activas. */
  function genRegion(kind) {
    for (let t = 0; t < 20000; t++) {
      const n = kind === 'max' ? rnd.pick([2, 3]) : rnd.pick([2, 3]);
      const cons = [];
      for (let i = 0; i < n; i++) {
        let a, b;
        do { a = rnd.int(0, 5); b = rnd.int(0, 5); } while ((a === 0 && b === 0) || (kind === 'min' && (a === 0 || b === 0)) || (a > 0 && b > 0 && a === b && i > 0));
        if (a === 0) b = 1; else if (b === 0) a = 1;   // una sola variable: x ≤ c o y ≤ c
        cons.push({ a, b, op: kind === 'max' ? '<=' : '>=', c: rnd.int(2, 24) * (rnd.pick([1, 1, 2])) });
      }
      if (kind === 'max' && !(cons.some((k) => k.a > 0) && cons.some((k) => k.b > 0) && cons.some((k) => k.a > 0 && k.b > 0))) continue;
      const V = vertices(cons);
      if (V.length < (kind === 'max' ? 4 : 3) || V.length > 6 || !V.every(intV)) continue;
      if (V.some((v) => num(v.x) > 40 || num(v.y) > 40)) continue;
      const all = cons.concat([{ a: 1, b: 0, op: '>=', c: 0 }, { a: 0, b: 1, op: '>=', c: 0 }]);
      // cada restricción de la lista debe contribuir con un lado de la región (al menos dos vértices en su recta)
      if (!cons.every((_, i) => V.filter((v) => v.tight.includes(i)).length >= 2)) continue;
      if (kind === 'min' && V.some((v) => num(v.x) === 0 && num(v.y) === 0)) continue;
      return { cons, V, all };
    }
    throw new Error('no se pudo generar la región');
  }
  const ineqTex = (k) => {
    const t = (k.a ? (k.a === 1 ? 'x' : k.a + 'x') : '') + (k.b ? (k.a ? '+' : '') + (k.b === 1 ? 'y' : k.b + 'y') : '');
    return t + (k.op === '<=' ? '\\le ' : '\\ge ') + k.c;
  };
  const eqTex = (k) => ineqTex(k).replace('\\le ', '=').replace('\\ge ', '=');
  const ptTex = (v) => '(' + ftex(v.x) + ',\\,' + ftex(v.y) + ')';
  const restrTxt = (cons) => cons.map((k) => '$' + ineqTex(k) + '$').join(', ') + ', $x\\ge0$, $y\\ge0$';
  const lineSpec = (k) => (k.b === 0 ? null : { m: -k.a / k.b, n: k.c / k.b, label: ineqTex(k).replace(/\\le |\\ge /, '=') });
  /** Recorta un polígono [[x,y],…] con el semiplano de la restricción k (Sutherland–Hodgman). */
  function clip(poly, k) {
    const f = (q) => (k.op === '<=' ? k.c - (k.a * q[0] + k.b * q[1]) : k.a * q[0] + k.b * q[1] - k.c);
    const out = [];
    poly.forEach((cur, i) => {
      const prev = poly[(i + poly.length - 1) % poly.length], fc = f(cur), fp = f(prev);
      if ((fc >= 0) !== (fp >= 0)) { const t = fp / (fp - fc); out.push([prev[0] + t * (cur[0] - prev[0]), prev[1] + t * (cur[1] - prev[1])]); }
      if (fc >= 0) out.push(cur);
    });
    return out;
  }
  function planPL(R, extraPts) {
    const xmax = Math.max(...R.V.map((v) => num(v.x)), ...R.cons.map((k) => (k.a ? k.c / k.a : 0))) * 1.1 + 1;
    const ymax = Math.max(...R.V.map((v) => num(v.y)), ...R.cons.map((k) => (k.b ? k.c / k.b : 0))) * 1.1 + 1;
    const cap = (R.cons[0].op === '>=');
    const xb = cap ? Math.min(xmax, 60) : xmax, yb = cap ? Math.min(ymax, 60) : ymax;
    return {
      type: '2d', x: [-1, xb], y: [-1, yb],
      polygons: [R.cons.reduce((pg, k) => clip(pg, k), [[0, 0], [xb, 0], [xb, yb], [0, yb]])],
      lines: R.cons.map(lineSpec).filter(Boolean),
      vlines: R.cons.filter((k) => k.b === 0).map((k) => k.c / k.a),
      points: R.V.map((v) => ({ x: num(v.x), y: num(v.y), label: '(' + fstr(v.x) + ', ' + fstr(v.y) + ')' })).concat(extraPts || []),
    };
  }
  const vertexSteps = (R) => {
    const names = R.all.map((k, i) => (i < R.cons.length ? '(' + (i + 1) + ')' : i === R.cons.length ? '(x=0)' : '(y=0)'));
    const lines = ['Las rectas frontera son ' + R.cons.map((k, i) => i$('(' + (i + 1) + ')\\ ' + eqTex(k))).join(', ') + ' y los ejes $x=0$, $y=0$. Cada vértice es el corte de dos rectas que cumple todas las desigualdades.'];
    lines.push('Vértices de la región: ' + R.V.map((v) => i$(ptTex(v)) + ' (corte de ' + v.tight.slice(0, 2).map((i) => names[i]).join(' y ') + ')').join('; ') + '.');
    return lines;
  };
  const HELP_PL = [
    'La región factible es el conjunto de puntos que cumplen todas las desigualdades ($x\\ge0$ e $y\\ge0$ incluidas). Sus <b>vértices</b> son los puntos donde se cortan dos rectas frontera y que además cumplen el resto de desigualdades (se comprueba sustituyendo).',
    'Método: 1) escribe cada desigualdad como igualdad y halla los cortes de las rectas de dos en dos (por reducción o sustitución); 2) descarta los cortes que no cumplen alguna desigualdad; 3) los que quedan son los vértices. Ejemplo: $x+y\\le4$ y $x\\le3$ se cortan en $(3,1)$, que cumple $x,y\\ge0$.',
  ];

  G.define({
    id: 'ccss-pl-vertices',
    title: 'Vértices de la región factible',
    help: HELP_PL,
    params: [{ key: 'tipo', label: 'Región', options: [['max', 'Acotada (restricciones ≤)'], ['min', 'No acotada (restricciones ≥)']] }],
    generate(p) {
      const R = genRegion(p.tipo);
      const n = R.V.length;
      return {
        prompt: 'Sea la región del plano definida por ' + restrTxt(R.cons) + '. Calcula sus ' + n + ' vértices y escríbelos ordenados de menor a mayor $x$ (si dos tienen la misma $x$, de menor a mayor $y$).',
        answer: { kind: 'matrix', value: R.V.map((v) => [v.x, v.y]), colLabels: ['x', 'y'] },
        steps: vertexSteps(R).concat(['Ordenados: ' + R.V.map((v) => i$(ptTex(v))).join(', ') + '.']),
        mistakes: [],
        plot: planPL(R),
        data: { tipo: p.tipo, cons: R.cons, V: R.V.map((v) => [num(v.x), num(v.y)]) },
      };
    },
  });

  const pickObj = (R, kind) => {
    for (let t = 0; t < 400; t++) {
      const pp = rnd.int(1, 9), qq = rnd.int(1, 9);
      const vals = R.V.map((v) => pp * num(v.x) + qq * num(v.y));
      const best = kind === 'max' ? Math.max(...vals) : Math.min(...vals);
      if (vals.filter((x) => x === best).length !== 1) continue;
      if (kind === 'max' && vals.indexOf(best) === R.V.findIndex((v) => num(v.x) === 0 && num(v.y) === 0)) continue;
      return { p: pp, q: qq, vals, best, k: vals.indexOf(best) };
    }
    return null;
  };
  const objTex = (o) => (o.p === 1 ? 'x' : o.p + 'x') + '+' + (o.q === 1 ? 'y' : o.q + 'y');
  const evalSteps = (R, o, kind) => ['Función objetivo: ' + i$('F(x,y)=' + objTex(o)) + '. Se evalúa en cada vértice:'
    + d$(R.V.map((v, i) => 'F' + ptTex(v) + '=' + o.p + '\\cdot' + ftex(v.x) + '+' + o.q + '\\cdot' + ftex(v.y) + '=' + o.vals[i]).join('\\qquad ')),
    'El ' + (kind === 'max' ? 'mayor' : 'menor') + ' valor es ' + i$(o.best) + ' y se alcanza en ' + i$(ptTex(R.V[o.k])) + ' (único vértice óptimo).'];

  G.define({
    id: 'ccss-pl-optimo',
    title: 'Máximo o mínimo en una región',
    help: [
      'El máximo y el mínimo de $F(x,y)=ax+by$ en una región factible (cuando existen) se alcanzan en un vértice. Se calculan los vértices, se evalúa $F$ en cada uno y se elige el mayor (máximo) o el menor (mínimo).',
      'Si la región no está acotada, puede no haber máximo; con restricciones $\\ge$ y coeficientes positivos en $F$ sí hay mínimo. Si dos vértices dan el mismo valor óptimo, también lo da todo el lado que los une (aquí el óptimo es único).',
    ],
    params: [{ key: 'tipo', label: 'Calcular', options: [['max', 'Máximo en región acotada'], ['min', 'Mínimo en región no acotada']] }],
    generate(p) {
      let R, o;
      do { R = genRegion(p.tipo); o = pickObj(R, p.tipo); } while (!o);
      return {
        prompt: 'Halla el ' + (p.tipo === 'max' ? 'máximo' : 'mínimo') + ' de $F(x,y)=' + objTex(o) + '$ en la región ' + restrTxt(R.cons) + ', y el punto en el que se alcanza.',
        answer: { kind: 'multi', parts: [{ kind: 'number', label: 'x=', value: R.V[o.k].x }, { kind: 'number', label: 'y=', value: R.V[o.k].y }, { kind: 'number', label: 'F=', value: F(o.best) }] },
        steps: vertexSteps(R).concat(evalSteps(R, o, p.tipo)),
        plot: planPL(R),
        data: { tipo: p.tipo, cons: R.cons, p: o.p, q: o.q, best: o.best, x: num(R.V[o.k].x), y: num(R.V[o.k].y) },
      };
    },
  });

  /* Problemas con enunciado */
  const MAXCTX = [
    { a: 'sillas', b: 'mesas', sa: 'una silla', sb: 'una mesa', r: ['horas de carpintería', 'horas de barnizado'] },
    { a: 'tartas de manzana', b: 'tartas de chocolate', sa: 'una tarta de manzana', sb: 'una tarta de chocolate', r: ['kg de harina', 'horas de horno'] },
    { a: 'camisetas', b: 'pantalones', sa: 'una camiseta', sb: 'un pantalón', r: ['metros de tela', 'horas de costura'] },
  ];
  const MINCTX = [
    { a: 'pienso A', b: 'pienso B', r: ['proteína', 'calcio'] },
    { a: 'legumbres', b: 'arroz', r: ['proteína', 'hierro'] },
  ];
  G.define({
    id: 'ccss-pl-problema',
    title: 'Problemas de programación lineal',
    help: HELP_PL.map((h, i) => (i === 0
      ? 'Pasos de un problema: 1) define $x$ e $y$ (qué cantidades se eligen); 2) escribe la función objetivo y las restricciones (recuerda $x\\ge0$, $y\\ge0$); 3) halla los vértices; 4) evalúa en ellos y elige el óptimo; 5) interpreta con unidades. '
      : h)),
    params: [{ key: 'tipo', label: 'Tipo', options: [['max', 'Maximizar el beneficio'], ['min', 'Minimizar el coste']] }],
    generate(p) {
      let R, o;
      do { R = genRegion(p.tipo); o = pickObj(R, p.tipo); } while (!o);
      const ctx = rnd.pick(p.tipo === 'max' ? MAXCTX : MINCTX);
      const conTxt = R.cons.map((k, i) => {
        if (p.tipo === 'max') {
          if (k.b === 0) return 'se pueden vender como mucho ' + k.c / k.a + ' unidades de ' + ctx.a;
          if (k.a === 0) return 'se pueden vender como mucho ' + k.c / k.b + ' unidades de ' + ctx.b;
          return ctx.sa + ' necesita ' + k.a + ' y ' + ctx.sb + ' necesita ' + k.b + ' ' + ctx.r[i % 2] + ', y se dispone de ' + k.c + ' ' + ctx.r[i % 2];
        }
        if (k.b === 0 || k.a === 0) return null;
        return 'cada kg de ' + ctx.a + ' aporta ' + k.a + (k.a === 1 ? ' unidad' : ' unidades') + ' de ' + ctx.r[i % 2] + ' y cada kg de ' + ctx.b + ' aporta ' + k.b + ', y se necesitan al menos ' + k.c + ' unidades';
      });
      const txt = p.tipo === 'max'
        ? 'Un negocio fabrica ' + ctx.a + ' ($x$ unidades) y ' + ctx.b + ' ($y$ unidades). Restricciones: ' + conTxt.join('; ') + '. Cada unidad de ' + ctx.a + ' deja ' + o.p + ' € de beneficio y cada unidad de ' + ctx.b + ', ' + o.q + ' €. ¿Cuántas unidades de cada una maximizan el beneficio y cuál es?'
        : 'Se mezclan $x$ kg de ' + ctx.a + ' y $y$ kg de ' + ctx.b + '. Restricciones: ' + conTxt.join('; ') + '. El kg de ' + ctx.a + ' cuesta ' + o.p + ' € y el de ' + ctx.b + ', ' + o.q + ' €. ¿Qué cantidades minimizan el coste y cuál es?';
      const plan = ['Variables: ' + i$('x') + ' = ' + (p.tipo === 'max' ? 'unidades de ' : 'kg de ') + ctx.a + ', ' + i$('y') + ' = ' + (p.tipo === 'max' ? 'unidades de ' : 'kg de ') + ctx.b + '.',
        'Función objetivo (' + (p.tipo === 'max' ? 'maximizar' : 'minimizar') + '): ' + i$('F(x,y)=' + objTex(o)) + '. Restricciones: ' + restrTxt(R.cons) + '.'];
      const fin = 'Conclusión: ' + (p.tipo === 'max' ? 'el máximo beneficio es ' : 'el coste mínimo es ') + i$(o.best) + ' € con ' + i$('x=' + fstr(R.V[o.k].x)) + ' e ' + i$('y=' + fstr(R.V[o.k].y)) + '.';
      return {
        prompt: txt,
        answer: { kind: 'multi', parts: [{ kind: 'number', label: 'x=', value: R.V[o.k].x }, { kind: 'number', label: 'y=', value: R.V[o.k].y }, { kind: 'number', label: 'F=', value: F(o.best) }] },
        steps: plan.concat(vertexSteps(R), evalSteps(R, o, p.tipo), [fin]),
        plot: planPL(R),
        data: { tipo: p.tipo, cons: R.cons, p: o.p, q: o.q, best: o.best, x: num(R.V[o.k].x), y: num(R.V[o.k].y) },
      };
    },
  });

  G.ccss = Object.assign(G.ccss || {}, { vertices, genRegion });
})(typeof globalThis !== 'undefined' ? globalThis : this);
