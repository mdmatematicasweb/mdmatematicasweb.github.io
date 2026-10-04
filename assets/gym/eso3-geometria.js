/* Ejercicios interactivos — 3º ESO, geometría (temas 8 a 10).
 * Tema 8: eso3-pitagoras, eso3-distancia, eso3-areas.
 * Tema 9: eso3-movimientos, eso3-tales, eso3-semejanza.
 * Tema 10: eso3-euler, eso3-volumen, eso3-area-cuerpos.
 * Las respuestas con π se piden como el coeficiente k de «k·π» (así se corrigen de forma exacta).
 * Verificadores independientes: tests/verify-gym-eso3.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, ftex, d$, i$, gcd, fadd, fsub, fmul, fdiv } = G;
  const { dc, define, sg, again } = G.eso3;
  const TERNAS = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 12, 15], [12, 16, 20], [20, 21, 29], [9, 40, 41], [10, 24, 26], [15, 20, 25]];
  const nz = (lo, hi) => { let v; do { v = rnd.int(lo, hi); } while (v === 0); return v; };
  const frac = (f) => ftex(f);

  /* ===================== Tema 8 ===================== */
  define({
    id: 'eso3-pitagoras',
    title: 'Teorema de Pitágoras',
    help: [
      'En un triángulo rectángulo, la **hipotenusa** $c$ (el lado mayor, opuesto al ángulo recto) y los **catetos** $a$ y $b$ cumplen $c^2=a^2+b^2$. Para un cateto: $a=\\sqrt{c^2-b^2}$.',
      'Ejemplo: catetos $6$ y $8$: $c=\\sqrt{36+64}=10$. Hipotenusa $13$ y cateto $5$: el otro cateto es $\\sqrt{169-25}=12$. Una escalera que se apoya en una pared forma un triángulo rectángulo con el suelo.',
    ],
    params: [{ key: 'tipo', label: 'Qué calcular', options: [['hip', 'La hipotenusa'], ['cat', 'Un cateto'], ['esc', 'Escalera y pared'], ['diag', 'Diagonal de un rectángulo']] }],
    generate(p) {
      const t = rnd.pick(TERNAS), k = 1, [a, b, c] = rnd.pick([[t[0], t[1], t[2]], [t[1], t[0], t[2]]]);
      if (p.tipo === 'hip') return { prompt: 'Un triángulo rectángulo tiene catetos de ' + i$(a) + ' cm y ' + i$(b) + ' cm. ¿Cuánto mide la hipotenusa (en cm)?', answer: { kind: 'number', label: 'c=', value: F(c) },
        steps: ['Pitágoras: ' + d$('c=\\sqrt{' + a + '^2+' + b + '^2}=\\sqrt{' + (a * a) + '+' + (b * b) + '}=\\sqrt{' + (a * a + b * b) + '}=' + c)], mistakes: [{ value: F(a + b), msg: 'la hipotenusa no es la suma de los catetos: hay que elevar al cuadrado, sumar y hacer la raíz.' }], data: { a, b, c, tipo: 'hip' } };
      if (p.tipo === 'cat') return { prompt: 'La hipotenusa de un triángulo rectángulo mide ' + i$(c) + ' cm y un cateto ' + i$(a) + ' cm. ¿Cuánto mide el otro cateto (en cm)?', answer: { kind: 'number', label: 'b=', value: F(b) },
        steps: ['De ' + i$('c^2=a^2+b^2') + ' se despeja ' + i$('b=\\sqrt{c^2-a^2}') + ':', d$('b=\\sqrt{' + c + '^2-' + a + '^2}=\\sqrt{' + (c * c) + '-' + (a * a) + '}=\\sqrt{' + (c * c - a * a) + '}=' + b)], mistakes: [{ value: F(c - a), msg: 'el cateto no es la resta de los lados: se restan los cuadrados y se hace la raíz.' }], data: { a, b, c, tipo: 'cat' } };
      if (p.tipo === 'esc') {
        const [x, y, z] = t;                          // escalera z, pie a x de la pared, altura y
        return { prompt: 'Una escalera de ' + i$(z) + ' m se apoya en una pared con su pie a ' + i$(x) + ' m de ella. ¿A qué altura de la pared llega (en m)?', answer: { kind: 'number', label: 'h=', value: F(y) },
          steps: ['La escalera, el suelo y la pared forman un triángulo rectángulo: la escalera es la hipotenusa.', d$('h=\\sqrt{' + z + '^2-' + x + '^2}=\\sqrt{' + (z * z - x * x) + '}=' + y)], mistakes: [], data: { x, y, z, tipo: 'esc' } };
      }
      const [x, y, z] = t;
      return { prompt: 'Un rectángulo mide ' + i$(x) + ' cm de largo y ' + i$(y) + ' cm de ancho. ¿Cuánto mide su diagonal (en cm)?', answer: { kind: 'number', label: 'd=', value: F(z) },
        steps: ['La diagonal es la hipotenusa del triángulo que forman el largo y el ancho: ' + d$('d=\\sqrt{' + x + '^2+' + y + '^2}=\\sqrt{' + (x * x + y * y) + '}=' + z)], mistakes: [], data: { x, y, z, tipo: 'diag' } };
    },
  });

  define({
    id: 'eso3-distancia',
    title: 'Distancia entre dos puntos',
    help: [
      'La distancia entre $A(x_1,y_1)$ y $B(x_2,y_2)$ es la hipotenusa del triángulo cuyos catetos son las diferencias de coordenadas: $d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.',
      'Ejemplo: $A(1,2)$ y $B(4,6)$: $d=\\sqrt{3^2+4^2}=5$. También sirve para ver si un punto está en la mediatriz de un segmento: debe estar a la misma distancia de los dos extremos.',
    ],
    params: [{ key: 'tipo', label: 'Qué calcular', options: [['dist', 'Distancia'], ['perim', 'Perímetro de un triángulo'], ['medio', 'Punto medio']] }],
    generate(p) {
      const t = rnd.pick(TERNAS), sx = rnd.pick([-1, 1]), sy = rnd.pick([-1, 1]);
      const [dx, dy] = rnd.pick([[t[0], t[1]], [t[1], t[0]]]);
      const x1 = rnd.int(-6, 6), y1 = rnd.int(-6, 6), x2 = x1 + sx * dx, y2 = y1 + sy * dy;
      if (p.tipo === 'dist') return { prompt: 'Calcula la distancia entre ' + i$('A(' + x1 + ',' + y1 + ')') + ' y ' + i$('B(' + x2 + ',' + y2 + ')') + '.', answer: { kind: 'number', label: 'd(A,B)=', value: F(t[2]) },
        steps: ['Diferencias de coordenadas: ' + i$((x2 - x1) + '\\ \\text{y}\\ ' + (y2 - y1)) + '.', d$('d=\\sqrt{' + sg(x2 - x1) + '^2+' + sg(y2 - y1) + '^2}=\\sqrt{' + (dx * dx + dy * dy) + '}=' + t[2])], mistakes: [], data: { x1, y1, x2, y2, tipo: 'dist' } };
      if (p.tipo === 'medio') {
        const mx = F(x1 + x2, 2), my = F(y1 + y2, 2);
        return { prompt: 'Halla el punto medio del segmento de extremos ' + i$('A(' + x1 + ',' + y1 + ')') + ' y ' + i$('B(' + x2 + ',' + y2 + ')') + '.', answer: { kind: 'multi', parts: [{ kind: 'number', label: 'x_M=', value: mx }, { kind: 'number', label: 'y_M=', value: my }] },
          steps: ['El punto medio tiene como coordenadas la media de las de los extremos: ' + d$('M\\left(\\frac{' + x1 + '+' + sg(x2) + '}{2},\\frac{' + y1 + '+' + sg(y2) + '}{2}\\right)=\\left(' + ftex(mx) + ',' + ftex(my) + '\\right)')], mistakes: [], data: { x1, y1, x2, y2, tipo: 'medio' } };
      }
      // perímetro: triángulo rectángulo A(x1,y1), B(x2,y1), C(x2,y2)
      const per = dx + dy + t[2];
      return { prompt: 'Calcula el perímetro del triángulo de vértices ' + i$('A(' + x1 + ',' + y1 + ')') + ', ' + i$('B(' + x2 + ',' + y1 + ')') + ' y ' + i$('C(' + x2 + ',' + y2 + ')') + '.', answer: { kind: 'number', label: 'P=', value: F(per) },
        steps: ['Lado ' + i$('AB') + ' (horizontal): ' + i$('|' + x2 + '-' + sg(x1) + '|=' + dx) + '. Lado ' + i$('BC') + ' (vertical): ' + i$('|' + y2 + '-' + sg(y1) + '|=' + dy) + '.', 'Lado ' + i$('AC') + ' (hipotenusa): ' + i$('\\sqrt{' + dx + '^2+' + dy + '^2}=' + t[2]) + '.', 'Perímetro: ' + i$(dx + '+' + dy + '+' + t[2] + '=' + per) + '.'], mistakes: [], data: { x1, y1, x2, y2, tipo: 'perim' } };
    },
  });

  define({
    id: 'eso3-areas',
    title: 'Áreas de figuras planas',
    help: [
      'Triángulo: $\\frac{b\\cdot h}{2}$. Trapecio: $\\frac{(B+b)\\,h}{2}$. Rombo: $\\frac{D\\cdot d}{2}$. Círculo: $\\pi r^2$. Sector circular de $n^\\circ$: $\\frac{\\pi r^2\\,n}{360}$. Corona circular: $\\pi(R^2-r^2)$.',
      'Las áreas con $\\pi$ se piden como el número $k$ en «$k\\pi$». Ejemplo: círculo de radio $3$: $A=9\\pi$, luego $k=9$. El área se mide en unidades cuadradas.',
    ],
    params: [{ key: 'fig', label: 'Figura', options: [['tri', 'Triángulo'], ['trap', 'Trapecio'], ['rombo', 'Rombo'], ['circ', 'Círculo'], ['sect', 'Sector circular'], ['corona', 'Corona circular']] }],
    generate(p) {
      const f = p.fig;
      if (f === 'tri') { const b = rnd.int(4, 20), h = rnd.int(3, 15); return { prompt: 'Calcula el área de un triángulo de base ' + i$(b) + ' cm y altura ' + i$(h) + ' cm (en cm²).', answer: { kind: 'number', label: 'A=', value: F(b * h, 2) }, steps: [d$('A=\\frac{b\\cdot h}{2}=\\frac{' + b + '\\cdot' + h + '}{2}=' + ftex(F(b * h, 2)))], mistakes: [{ value: F(b * h), msg: 'falta dividir entre 2.' }], data: { f, b, h } }; }
      if (f === 'trap') { const B = rnd.int(8, 20), b = rnd.int(3, B - 2), h = rnd.int(3, 12); return { prompt: 'Calcula el área de un trapecio de bases ' + i$(B) + ' cm y ' + i$(b) + ' cm y altura ' + i$(h) + ' cm (en cm²).', answer: { kind: 'number', label: 'A=', value: F((B + b) * h, 2) }, steps: [d$('A=\\frac{(B+b)\\,h}{2}=\\frac{(' + B + '+' + b + ')\\cdot' + h + '}{2}=' + ftex(F((B + b) * h, 2)))], mistakes: [], data: { f, B, b, h } }; }
      if (f === 'rombo') { const D = rnd.int(6, 24), d = rnd.int(4, 18); return { prompt: 'Calcula el área de un rombo de diagonales ' + i$(D) + ' cm y ' + i$(d) + ' cm (en cm²).', answer: { kind: 'number', label: 'A=', value: F(D * d, 2) }, steps: [d$('A=\\frac{D\\cdot d}{2}=\\frac{' + D + '\\cdot' + d + '}{2}=' + ftex(F(D * d, 2)))], mistakes: [], data: { f, D, d } }; }
      if (f === 'circ') { const r = rnd.int(2, 12); return { prompt: 'Calcula el área de un círculo de radio ' + i$(r) + ' cm. Escríbela como ' + i$('k\\pi') + ' y da ' + i$('k') + '.', answer: { kind: 'number', label: 'k=', value: F(r * r) }, steps: [d$('A=\\pi r^2=\\pi\\cdot' + r + '^2=' + (r * r) + '\\pi')], mistakes: [{ value: F(2 * r), msg: '$2r$ es la longitud de la circunferencia (sin $\\pi$): el área es $\\pi r^2$.' }], data: { f, r } }; }
      if (f === 'sect') {
        const r = rnd.int(3, 12), n = rnd.pick([30, 45, 60, 90, 120, 180, 270]), k = F(r * r * n, 360);
        return { prompt: 'Calcula el área de un sector circular de radio ' + i$(r) + ' cm y ángulo ' + i$(n + '^\\circ') + '. Escríbela como ' + i$('k\\pi') + ' y da ' + i$('k') + '.', answer: { kind: 'number', label: 'k=', value: k },
          steps: [d$('A=\\frac{\\pi r^2\\,n}{360}=\\frac{\\pi\\cdot' + r + '^2\\cdot' + n + '}{360}=' + ftex(k) + '\\pi')], mistakes: [], data: { f, r, n } };
      }
      const R = rnd.int(4, 14), r = rnd.int(1, R - 2);
      return { prompt: 'Una corona circular tiene radio exterior ' + i$(R) + ' cm y radio interior ' + i$(r) + ' cm. Calcula su área como ' + i$('k\\pi') + ' y da ' + i$('k') + '.', answer: { kind: 'number', label: 'k=', value: F(R * R - r * r) },
        steps: [d$('A=\\pi(R^2-r^2)=\\pi(' + R + '^2-' + r + '^2)=' + (R * R - r * r) + '\\pi')], mistakes: [{ value: F((R - r) * (R - r)), msg: '$(R-r)^2$ no es $R^2-r^2$: se restan los cuadrados de los radios.' }], data: { f, R, r } };
    },
  });

  /* ===================== Tema 9 ===================== */
  define({
    id: 'eso3-movimientos',
    title: 'Traslaciones, giros y simetrías',
    help: [
      'Traslación de vector $(a,b)$: $(x,y)\\to(x+a,\\ y+b)$. Giro de $90^\\circ$ respecto del origen: $(x,y)\\to(-y,\\ x)$; de $180^\\circ$: $(x,y)\\to(-x,-y)$. Simetría respecto del eje $OX$: $(x,y)\\to(x,-y)$; respecto del eje $OY$: $(x,y)\\to(-x,y)$.',
      'Ejemplo: el punto $(3,1)$ girado $90^\\circ$ es $(-1,3)$; su simétrico respecto del eje $OY$ es $(-3,1)$; trasladado con $(2,-4)$ es $(5,-3)$. Los movimientos conservan distancias, ángulos y áreas.',
    ],
    params: [{ key: 'mov', label: 'Movimiento', options: [['tras', 'Traslación'], ['g90', 'Giro de 90°'], ['g180', 'Giro de 180°'], ['sx', 'Simetría respecto de OX'], ['sy', 'Simetría respecto de OY']] }],
    generate(p) {
      const x = nz(-7, 7), y = nz(-7, 7), a = nz(-5, 5), b = nz(-5, 5);
      const R = {
        tras: [x + a, y + b, 'la traslación de vector ' + i$('(' + a + ',' + b + ')'), d$('(' + x + ',' + y + ')\\to(' + x + '+' + sg(a) + ',\\ ' + y + '+' + sg(b) + ')=(' + (x + a) + ',' + (y + b) + ')')],
        g90: [-y, x, 'el giro de ' + i$('90^\\circ') + ' en sentido antihorario respecto del origen', d$('(x,y)\\to(-y,x):\\ (' + x + ',' + y + ')\\to(' + (-y) + ',' + x + ')')],
        g180: [-x, -y, 'el giro de ' + i$('180^\\circ') + ' respecto del origen', d$('(x,y)\\to(-x,-y):\\ (' + x + ',' + y + ')\\to(' + (-x) + ',' + (-y) + ')')],
        sx: [x, -y, 'la simetría respecto del eje ' + i$('OX'), d$('(x,y)\\to(x,-y):\\ (' + x + ',' + y + ')\\to(' + x + ',' + (-y) + ')')],
        sy: [-x, y, 'la simetría respecto del eje ' + i$('OY'), d$('(x,y)\\to(-x,y):\\ (' + x + ',' + y + ')\\to(' + (-x) + ',' + y + ')')],
      }[p.mov];
      return { prompt: 'Halla la imagen del punto ' + i$('P(' + x + ',' + y + ')') + ' mediante ' + R[2] + '.', answer: { kind: 'multi', parts: [{ kind: 'number', label: "x'=", value: F(R[0]) }, { kind: 'number', label: "y'=", value: F(R[1]) }] },
        steps: [R[3]], mistakes: [], data: { mov: p.mov, x, y, a, b } };
    },
  });

  define({
    id: 'eso3-tales',
    title: 'Teorema de Tales',
    help: [
      'Si dos rectas se cortan por rectas **paralelas**, los segmentos correspondientes son proporcionales: $\\frac{a}{a\'}=\\frac{b}{b\'}$. Sirve para medir alturas con sombras: a la misma hora, altura y sombra son proporcionales.',
      'Ejemplo: una persona de $1{,}8$ m da una sombra de $1{,}2$ m. Un árbol con sombra de $6$ m tiene altura $x$: $\\frac{x}{1{,}8}=\\frac{6}{1{,}2}\\Rightarrow x=9$ m.',
    ],
    params: [{ key: 'tipo', label: 'Situación', options: [['sombra', 'Sombras'], ['paral', 'Segmentos entre paralelas']] }],
    generate(p) {
      if (p.tipo === 'sombra') {
        const h1 = rnd.pick([F(3, 2), F(9, 5), F(2), F(5, 4)]), s1 = rnd.pick([F(1), F(6, 5), F(3, 2), F(4, 5)]), k = rnd.pick([2, 3, 4, 5, 6]);
        const s2 = fmul(s1, F(k)), h2 = fmul(h1, F(k));
        const t = (f) => dc(f.n / f.d);
        return { prompt: 'Una persona de ' + i$(t(h1)) + ' m proyecta una sombra de ' + i$(t(s1)) + ' m. A la misma hora, un edificio proyecta una sombra de ' + i$(t(s2)) + ' m. ¿Qué altura tiene el edificio (en m)?', answer: { kind: 'number', label: 'h=', value: h2 },
          steps: ['Triángulos semejantes (Tales): ' + d$('\\frac{h}{' + t(s2) + '}=\\frac{' + t(h1) + '}{' + t(s1) + '}'), 'Despejamos: ' + d$('h=\\frac{' + t(h1) + '\\cdot' + t(s2) + '}{' + t(s1) + '}=' + t(h2))], mistakes: [], data: { h1, s1, s2, h2 } };
      }
      const a = rnd.int(2, 9), b = rnd.int(2, 9), k = rnd.pick([F(3, 2), F(2), F(5, 2), F(3), F(1, 2)]);
      const a2 = fmul(F(a), k), b2 = fmul(F(b), k);
      const t = (f) => dc(f.n / f.d);
      return { prompt: 'Tres rectas paralelas cortan a otras dos. En la primera, los segmentos entre paralelas miden ' + i$(a) + ' y ' + i$(b) + '. En la segunda, el primer segmento mide ' + i$(t(a2)) + '. ¿Cuánto mide el segundo?', answer: { kind: 'number', label: 'x=', value: b2 },
        steps: ['Por Tales: ' + d$('\\frac{' + a + '}{' + b + '}=\\frac{' + t(a2) + '}{x}'), 'Despejamos: ' + d$('x=\\frac{' + b + '\\cdot' + t(a2) + '}{' + a + '}=' + t(b2))], mistakes: [], data: { a, b, a2, b2 } };
    },
  });

  define({
    id: 'eso3-semejanza',
    title: 'Semejanza, escalas, áreas y volúmenes',
    help: [
      'Si dos figuras son semejantes con razón $k$: las **longitudes** se multiplican por $k$, las **áreas** por $k^2$ y los **volúmenes** por $k^3$. Una escala $1:E$ es una razón de semejanza $\\frac1E$.',
      'Ejemplo: en un plano a escala $1:200$, un salón de $3$ cm por $2$ cm mide $6$ m por $4$ m y su superficie real es $24$ m² (no $200\\cdot6$). Si $k=3$, el área se multiplica por $9$ y el volumen por $27$.',
    ],
    params: [{ key: 'tipo', label: 'Qué calcular', options: [['escala', 'Longitud real con la escala'], ['area', 'Área de la figura semejante'], ['vol', 'Volumen de la figura semejante'], ['razon', 'Razón de áreas a partir de lados']] }],
    generate(p) {
      if (p.tipo === 'escala') {
        const E = rnd.pick([50, 100, 200, 500, 1000, 25000, 50000]), cm = rnd.int(2, 18) * rnd.pick([1, 5]) / 5 * 1;
        const real = cm * E / 100;
        const unit = real >= 1000 ? 'km' : 'm';
        const val = unit === 'km' ? real / 1000 : real;
        const mf = G.parseFrac(String(Math.round(val * 1e6) / 1e6));
        return { prompt: 'En un plano a escala ' + i$('1:' + E) + ', una distancia mide ' + i$(dc(cm)) + ' cm. ¿Cuántos ' + (unit === 'km' ? 'kilómetros' : 'metros') + ' mide en la realidad?', answer: { kind: 'number', label: '=', value: mf },
          steps: ['La realidad es ' + i$(E) + ' veces mayor: ' + i$(dc(cm) + '\\cdot' + E + '=' + dc(cm * E) + '\\ \\text{cm}') + '.', 'En ' + (unit === 'km' ? 'kilómetros' : 'metros') + ': ' + i$(dc(cm * E) + '\\ \\text{cm}=' + dc(val) + '\\ \\text{' + unit + '}') + '.'], mistakes: [], data: { E, cm, val } };
      }
      if (p.tipo === 'area') {
        const k = rnd.pick([2, 3, 4, 5, 10]), A = rnd.int(3, 30);
        return { prompt: 'Dos figuras son semejantes con razón de semejanza ' + i$('k=' + k) + '. La pequeña tiene un área de ' + i$(A) + ' cm². ¿Qué área tiene la grande (en cm²)?', answer: { kind: 'number', label: 'A=', value: F(A * k * k) },
          steps: ['Las áreas se multiplican por ' + i$('k^2=' + (k * k)) + ': ' + d$(A + '\\cdot' + (k * k) + '=' + (A * k * k))], mistakes: [{ value: F(A * k), msg: 'las áreas se multiplican por $k^2$, no por $k$.' }], data: { k, A, tipo: 'area' } };
      }
      if (p.tipo === 'vol') {
        const k = rnd.pick([2, 3, 4, 5]), V0 = rnd.int(2, 20);
        return { prompt: 'Un cuerpo tiene un volumen de ' + i$(V0) + ' cm³. Se construye otro semejante con razón de semejanza ' + i$('k=' + k) + '. ¿Qué volumen tiene (en cm³)?', answer: { kind: 'number', label: 'V=', value: F(V0 * k * k * k) },
          steps: ['Los volúmenes se multiplican por ' + i$('k^3=' + (k * k * k)) + ': ' + d$(V0 + '\\cdot' + (k * k * k) + '=' + (V0 * k * k * k))], mistakes: [{ value: F(V0 * k), msg: 'los volúmenes se multiplican por $k^3$.' }], data: { k, V0, tipo: 'vol' } };
      }
      const l = rnd.int(2, 9), L = l * rnd.pick([2, 3, 4, 5]), A = rnd.int(2, 15);
      const k = L / l;
      return { prompt: 'Dos pantallas semejantes tienen anchos de ' + i$(l) + ' cm y ' + i$(L) + ' cm. La pequeña tiene un área de ' + i$(A) + ' cm². ¿Cuál es el área de la grande (en cm²)?', answer: { kind: 'number', label: 'A=', value: F(A * k * k) },
        steps: ['Razón de semejanza: ' + i$('k=\\frac{' + L + '}{' + l + '}=' + k) + '.', 'Área de la grande: ' + d$(A + '\\cdot' + k + '^2=' + (A * k * k))], mistakes: [], data: { k, A, l, L, tipo: 'razon' } };
    },
  });

  /* ===================== Tema 10 ===================== */
  define({
    id: 'eso3-euler',
    title: 'Poliedros: caras, vértices y aristas',
    help: [
      'En un poliedro convexo se cumple la **relación de Euler**: $C+V=A+2$ ($C$ caras, $V$ vértices, $A$ aristas). Un prisma de base de $n$ lados tiene $n+2$ caras, $2n$ vértices y $3n$ aristas; una pirámide, $n+1$ caras, $n+1$ vértices y $2n$ aristas.',
      'Ejemplo: un prisma hexagonal: $C=8$, $V=12$, $A=18$ y $8+12=20=18+2$. Cada arista une dos caras y dos vértices.',
    ],
    params: [{ key: 'cuerpo', label: 'Cuerpo', options: [['prisma', 'Prisma'], ['piramide', 'Pirámide']] }],
    generate(p) {
      const n = rnd.int(3, 9);
      const [C, V, A] = p.cuerpo === 'prisma' ? [n + 2, 2 * n, 3 * n] : [n + 1, n + 1, 2 * n];
      const falta = rnd.pick(['C', 'V', 'A']);
      const val = { C, V, A }[falta], nom = { C: 'caras', V: 'vértices', A: 'aristas' }[falta];
      const datos = ['C', 'V', 'A'].filter((x) => x !== falta).map((x) => ({ C: 'caras', V: 'vértices', A: 'aristas' }[x] + ': ' + i$({ C, V, A }[x]))).join('; ');
      return { prompt: 'Un ' + (p.cuerpo === 'prisma' ? 'prisma' : 'pirámide') + ' cuya base tiene ' + i$(n) + ' lados tiene (' + datos + '). Usa la relación de Euler para hallar el número de ' + nom + '.', answer: { kind: 'number', label: '=', value: F(val) },
        steps: ['Relación de Euler: ' + i$('C+V=A+2') + '.', falta === 'C' ? d$('C=A+2-V=' + A + '+2-' + V + '=' + C) : falta === 'V' ? d$('V=A+2-C=' + A + '+2-' + C + '=' + V) : d$('A=C+V-2=' + C + '+' + V + '-2=' + A)], mistakes: [], data: { cuerpo: p.cuerpo, n, C, V, A, falta } };
    },
  });

  define({
    id: 'eso3-volumen',
    title: 'Volumen de cuerpos geométricos',
    help: [
      'Prisma y cilindro: $V=A_{base}\\cdot h$. Pirámide y cono: $V=\\frac13A_{base}\\cdot h$. Esfera: $V=\\frac43\\pi r^3$. Ortoedro: $a\\cdot b\\cdot c$.',
      'Los volúmenes con $\\pi$ se piden como el número $k$ en «$k\\pi$». Ejemplo: cilindro de radio $3$ y altura $5$: $V=\\pi\\cdot9\\cdot5=45\\pi$, $k=45$. Recuerda que $1$ dm³ $=1$ litro.',
    ],
    params: [{ key: 'cuerpo', label: 'Cuerpo', options: [['orto', 'Ortoedro'], ['pira', 'Pirámide de base cuadrada'], ['cil', 'Cilindro'], ['cono', 'Cono'], ['esf', 'Esfera']] }],
    generate(p) {
      const c = p.cuerpo;
      if (c === 'orto') { const a = rnd.int(2, 12), b = rnd.int(2, 12), h = rnd.int(2, 12); return { prompt: 'Calcula el volumen de un ortoedro de ' + i$(a + '\\times' + b + '\\times' + h) + ' cm (en cm³).', answer: { kind: 'number', label: 'V=', value: F(a * b * h) }, steps: [d$('V=' + a + '\\cdot' + b + '\\cdot' + h + '=' + (a * b * h))], mistakes: [], data: { c, a, b, h } }; }
      if (c === 'pira') { const l = rnd.int(2, 12), h = rnd.int(3, 15), V = F(l * l * h, 3); return { prompt: 'Calcula el volumen de una pirámide de base cuadrada de lado ' + i$(l) + ' cm y altura ' + i$(h) + ' cm (en cm³).', answer: { kind: 'number', label: 'V=', value: V }, steps: ['Área de la base: ' + i$(l + '^2=' + (l * l)) + '.', d$('V=\\frac13A_b\\,h=\\frac{' + (l * l) + '\\cdot' + h + '}{3}=' + ftex(V))], mistakes: [{ value: F(l * l * h), msg: 'la pirámide ocupa un tercio del prisma con su misma base y altura.' }], data: { c, l, h } }; }
      if (c === 'cil') { const r = rnd.int(2, 10), h = rnd.int(2, 15); return { prompt: 'Calcula el volumen de un cilindro de radio ' + i$(r) + ' cm y altura ' + i$(h) + ' cm. Escríbelo como ' + i$('k\\pi') + ' y da ' + i$('k') + '.', answer: { kind: 'number', label: 'k=', value: F(r * r * h) }, steps: [d$('V=\\pi r^2h=\\pi\\cdot' + r + '^2\\cdot' + h + '=' + (r * r * h) + '\\pi')], mistakes: [], data: { c, r, h } }; }
      if (c === 'cono') { const r = rnd.int(2, 10), h = rnd.int(3, 15), k = F(r * r * h, 3); return { prompt: 'Calcula el volumen de un cono de radio ' + i$(r) + ' cm y altura ' + i$(h) + ' cm. Escríbelo como ' + i$('k\\pi') + ' y da ' + i$('k') + '.', answer: { kind: 'number', label: 'k=', value: k }, steps: [d$('V=\\frac13\\pi r^2h=\\frac{\\pi\\cdot' + r + '^2\\cdot' + h + '}{3}=' + ftex(k) + '\\pi')], mistakes: [{ value: F(r * r * h), msg: 'falta el factor $\\frac13$ del cono.' }], data: { c, r, h } }; }
      const r = rnd.int(1, 9), k = F(4 * r * r * r, 3);
      return { prompt: 'Calcula el volumen de una esfera de radio ' + i$(r) + ' cm. Escríbelo como ' + i$('k\\pi') + ' y da ' + i$('k') + '.', answer: { kind: 'number', label: 'k=', value: k }, steps: [d$('V=\\frac43\\pi r^3=\\frac43\\pi\\cdot' + r + '^3=' + ftex(k) + '\\pi')], mistakes: [], data: { c, r } };
    },
  });

  define({
    id: 'eso3-area-cuerpos',
    title: 'Área total de cuerpos geométricos',
    help: [
      'Ortoedro: $2(ab+ac+bc)$. Cilindro: $2\\pi r(h+r)$. Cono: $\\pi r(g+r)$, con generatriz $g=\\sqrt{r^2+h^2}$. Pirámide regular: $A_L=\\frac{P_b\\cdot a_p}{2}$ más la base, con $a_p=\\sqrt{h^2+a_b^2}$. Esfera: $4\\pi r^2$.',
      'Con $\\pi$ se pide el número $k$ en «$k\\pi$». Ejemplo: cono de radio $3$ y altura $4$: $g=5$ y $A=\\pi\\cdot3\\cdot(5+3)=24\\pi$.',
    ],
    params: [{ key: 'cuerpo', label: 'Cuerpo', options: [['orto', 'Ortoedro'], ['cil', 'Cilindro'], ['cono', 'Cono'], ['pira', 'Pirámide de base cuadrada'], ['esf', 'Esfera']] }],
    generate(p) {
      const c = p.cuerpo;
      if (c === 'orto') { const a = rnd.int(2, 10), b = rnd.int(2, 10), h = rnd.int(2, 10); const A = 2 * (a * b + a * h + b * h); return { prompt: 'Calcula el área total de un ortoedro de ' + i$(a + '\\times' + b + '\\times' + h) + ' cm (en cm²).', answer: { kind: 'number', label: 'A=', value: F(A) }, steps: [d$('A=2(' + a * b + '+' + a * h + '+' + b * h + ')=' + A)], mistakes: [], data: { c, a, b, h } }; }
      if (c === 'cil') { const r = rnd.int(2, 9), h = rnd.int(2, 12), k = 2 * r * (h + r); return { prompt: 'Calcula el área total de un cilindro de radio ' + i$(r) + ' cm y altura ' + i$(h) + ' cm. Escríbela como ' + i$('k\\pi') + ' y da ' + i$('k') + '.', answer: { kind: 'number', label: 'k=', value: F(k) }, steps: [d$('A=2\\pi r(h+r)=2\\pi\\cdot' + r + '(' + h + '+' + r + ')=' + k + '\\pi')], mistakes: [{ value: F(2 * r * h), msg: 'eso es solo el área lateral: falta sumar las dos bases ($2\\pi r^2$).' }], data: { c, r, h } }; }
      if (c === 'cono') { const t = rnd.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [12, 5, 13], [4, 3, 5]]); const [r, h, g] = t, k = r * (g + r); return { prompt: 'Calcula el área total de un cono de radio ' + i$(r) + ' cm y altura ' + i$(h) + ' cm. Escríbela como ' + i$('k\\pi') + ' y da ' + i$('k') + '.', answer: { kind: 'number', label: 'k=', value: F(k) }, steps: ['Generatriz: ' + i$('g=\\sqrt{' + r + '^2+' + h + '^2}=' + g) + '.', d$('A=\\pi r(g+r)=\\pi\\cdot' + r + '(' + g + '+' + r + ')=' + k + '\\pi')], mistakes: [], data: { c, r, h, g } }; }
      if (c === 'pira') { const t = rnd.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]); const half = t[0], h = t[1], ap = t[2], l = 2 * half; const A = l * l + 2 * l * ap; return { prompt: 'Calcula el área total de una pirámide regular de base cuadrada de lado ' + i$(l) + ' cm y altura ' + i$(h) + ' cm (en cm²).', answer: { kind: 'number', label: 'A=', value: F(A) }, steps: ['Apotema de la pirámide: ' + i$('a_p=\\sqrt{' + h + '^2+' + half + '^2}=' + ap) + '.', 'Área lateral: ' + i$('\\frac{4\\cdot' + l + '\\cdot' + ap + '}{2}=' + 2 * l * ap) + '. Base: ' + i$(l + '^2=' + l * l) + '.', 'Total: ' + i$(2 * l * ap + '+' + l * l + '=' + A) + '.'], mistakes: [], data: { c, l, h, ap, half } }; }
      const r = rnd.int(1, 12);
      return { prompt: 'Calcula el área de una esfera de radio ' + i$(r) + ' cm. Escríbela como ' + i$('k\\pi') + ' y da ' + i$('k') + '.', answer: { kind: 'number', label: 'k=', value: F(4 * r * r) }, steps: [d$('A=4\\pi r^2=4\\pi\\cdot' + r + '^2=' + 4 * r * r + '\\pi')], mistakes: [], data: { c, r } };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
