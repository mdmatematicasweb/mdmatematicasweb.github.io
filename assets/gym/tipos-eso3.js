/* Situaciones competenciales de 3º ESO (se registran en MDPrueba3). Cada una: enunciado de la vida cotidiana y cuatro apartados de 0,5 puntos.
 * Contrato: generate() → { enunciado, partes: [{ texto, pts, answer, steps }], data }.
 * Verificadores independientes: tests/verify-eso3-comp.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym, P = root.MDPrueba3;
  const { rnd, F, ftex, d$, i$, gcd, fadd, fsub, fmul, fdiv } = G;
  const { dc, mathComma, sg } = G.eso3;
  const PT = 0.5;
  const pick = (a) => rnd.pick(a);
  const dec = (x) => G.parseFrac(String(Math.round(x * 1e6) / 1e6));          // decimal exacto como fracción
  const cent = (c) => dc(c / 100);                                             // céntimos → euros (texto con coma)
  const num = (label, value) => ({ kind: 'number', label, value });
  /** Resultado redondeado a nd decimales (se corrige contra el valor redondeado; la consigna dice cuántos decimales). */
  const apx = (label, x, nd) => { const v = Math.round(x * Math.pow(10, nd)) / Math.pow(10, nd); return { kind: 'expr', label, value: v, show: String(v).replace('.', ',') }; };
  const parte = (texto, answer, steps) => ({ texto, pts: PT, answer, steps });
  const fin = (def) => P.implementar({ id: def.id, generate() {
    const ex = def.generate();
    ex.enunciado = mathComma(ex.enunciado);
    ex.partes.forEach((p) => { p.texto = mathComma(p.texto); p.steps = p.steps.map(mathComma); });
    return ex;
  } });
  const nzr = (lo, hi) => { let v; do { v = rnd.int(lo, hi); } while (v === 0); return v; };
  const TRIPLES = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]];

  /* ===================== Sentido numérico y financiero ===================== */
  fin({ id: 'oferta', generate() {
    for (;;) {
      const nA = pick([4, 6, 8, 10, 12]), nB = pick([4, 6, 8, 10, 12, 20]); if (nA === nB) continue;
      const uA = pick([45, 50, 60, 65, 70, 75, 80, 90]), dB = pick([-15, -10, -5, 5, 10, 15]), uB = uA + dB;
      const barato = uA <= uB ? 'A' : 'B', caro = barato === 'A' ? 'B' : 'A';
      const dif = Math.abs(uA - uB), N = pick([60, 120, 240]), ahorro = N * dif;
      const r = pick([10, 20, 25, 50]), PC = (barato === 'A' ? nA * uA : nB * uB);
      if ((PC * (100 - r)) % 100 !== 0 || dif === 0) continue;
      const pr = (PC * (100 - r)) / 100;
      return { enunciado: 'En el supermercado hay dos ofertas de yogures: el pack A trae ' + i$(nA) + ' unidades por ' + i$(cent(nA * uA)) + ' € y el pack B trae ' + i$(nB) + ' unidades por ' + i$(cent(nB * uB)) + ' €.',
        partes: [
          parte('¿Cuánto cuesta cada yogur en el pack A (en €)?', num('A=', dec(uA / 100)), ['Se divide el precio entre las unidades: ' + d$(cent(nA * uA) + ':' + nA + '=' + cent(uA))]),
          parte('¿Cuánto cuesta cada yogur en el pack B (en €)?', num('B=', dec(uB / 100)), ['Se divide el precio entre las unidades: ' + d$(cent(nB * uB) + ':' + nB + '=' + cent(uB))]),
          parte('Una cantina compra ' + i$(N) + ' yogures siempre en el pack más barato por unidad en vez de en el más caro. ¿Cuántos euros ahorra?', num('\\text{ahorro}=', dec(ahorro / 100)), ['El pack más barato es el ' + barato + ' y el más caro el ' + caro + '; la diferencia por yogur es ' + i$(cent(dif)) + ' €.', d$(N + '\\cdot' + cent(dif) + '=' + cent(ahorro))]),
          parte('El pack más barato tiene además un descuento del ' + i$(r) + ' %. ¿Cuál es el precio final de ese pack (en €)?', num('P=', dec(pr / 100)), ['Índice: ' + i$('1-' + dc(r / 100) + '=' + dc((100 - r) / 100)) + '.', d$(cent(PC) + '\\cdot' + dc((100 - r) / 100) + '=' + cent(pr))]),
        ], data: { nA, nB, uA, uB, N, r, PC, pr, ahorro } };
    }
  } });

  fin({ id: 'factura', generate() {
    for (;;) {
      const n = pick([2, 3, 4, 5, 8, 10]), p = pick([12, 15, 20, 25, 30, 40, 50]), d = pick([10, 20, 25]);
      const sub = n * p, desc = sub * d / 100, base = sub - desc, tot = base * 1.21, iva = base * 0.21;
      if (Math.abs(tot * 100 - Math.round(tot * 100)) > 1e-7 || Math.abs(iva * 100 - Math.round(iva * 100)) > 1e-7) continue;
      return { enunciado: 'Un taller compra ' + i$(n) + ' piezas a ' + i$(p) + ' € cada una. Le hacen un descuento del ' + i$(d) + ' % sobre el importe y después se aplica el ' + i$(21) + ' % de IVA.',
        partes: [
          parte('¿Cuál es el importe de las piezas antes del descuento (en €)?', num('=', dec(sub)), [d$(n + '\\cdot' + p + '=' + sub)]),
          parte('¿A cuánto asciende el descuento (en €)?', num('=', dec(desc)), [d$(sub + '\\cdot' + dc(d / 100) + '=' + dc(desc))]),
          parte('¿Cuánto es el IVA que se paga (en €)?', num('=', dec(iva)), ['Base imponible: ' + i$(sub + '-' + dc(desc) + '=' + dc(base)) + ' €.', d$(dc(base) + '\\cdot0{,}21=' + dc(iva))]),
          parte('¿Cuál es el total de la factura (en €)?', num('=', dec(tot)), [d$(dc(base) + '+' + dc(iva) + '=' + dc(tot)), 'También se puede calcular directamente: ' + i$(dc(base) + '\\cdot1{,}21=' + dc(tot))]),
        ], data: { n, p, d, sub, desc, base, iva, tot } };
    }
  } });

  fin({ id: 'ahorro', generate() {
    const a1 = pick([10, 15, 20, 25]), dd = pick([5, 10, 15]), n = pick([8, 10, 12]);
    const an = a1 + (n - 1) * dd, S = (a1 + an) * n / 2, obj = Math.ceil((S + 50) / 100) * 100 + pick([0, 100]);
    const C = pick([1000, 2000, 4000]), r = pick([5, 10]), t = 2, fin2 = Math.round(C * Math.pow(1 + r / 100, t) * 100) / 100;
    return { enunciado: 'Marta quiere ahorrar para una bici de ' + i$(obj) + ' €. Ahorra ' + i$(a1) + ' € el primer mes y cada mes ' + i$(dd) + ' € más que el anterior, durante ' + i$(n) + ' meses.',
      partes: [
        parte('¿Cuánto ahorra el último mes (en €)?', num('a_{' + n + '}=', F(an)), [d$('a_{' + n + '}=' + a1 + '+' + (n - 1) + '\\cdot' + dd + '=' + an)]),
        parte('¿Cuánto ha ahorrado en total al cabo de los ' + i$(n) + ' meses (en €)?', num('S=', F(S)), [d$('S_{' + n + '}=\\frac{(' + a1 + '+' + an + ')\\cdot' + n + '}{2}=' + S)]),
        parte('¿Cuánto le falta para comprar la bici (en €)?', num('=', F(obj - S)), [d$(obj + '-' + S + '=' + (obj - S))]),
        parte('Su tío guarda ' + i$(C) + ' € en un depósito al ' + i$(r) + ' % de interés compuesto anual. ¿Cuánto tendrá a los ' + i$(t) + ' años (en €)?', num('C_f=', dec(fin2)), [d$(C + '\\cdot' + dc(1 + r / 100) + '^{' + t + '}=' + dc(fin2))]),
      ], data: { a1, dd, n, an, S, obj, C, r, t, fin2 } };
  } });

  fin({ id: 'receta', generate() {
    const p0 = pick([4, 6, 8]), p1 = p0 * pick([2, 3]) / 2 * 1 || p0, h = pick([200, 250, 300, 400]), az = pick([100, 150, 120, 60]);
    const P1 = pick([10, 12, 15]);
    const f = F(P1, p0), hh = fmul(F(h), f), aa = fmul(F(az), f);
    const E = pick([50, 100, 200]), cx = pick([4, 5, 6, 8]), cy = pick([3, 4, 5]), lx = cx * E / 100, ly = cy * E / 100;
    return { enunciado: 'Una receta de bizcocho para ' + i$(p0) + ' personas lleva ' + i$(h) + ' g de harina y ' + i$(az) + ' g de azúcar. En el plano de la cocina, a escala ' + i$('1:' + E) + ', la cocina mide ' + i$(cx) + ' cm por ' + i$(cy) + ' cm.',
      partes: [
        parte('¿Cuántos gramos de harina hacen falta para ' + i$(P1) + ' personas?', num('=', hh), ['Proporcionalidad directa: ' + d$('\\frac{' + h + '}{' + p0 + '}\\cdot' + P1 + '=' + ftex(hh))]),
        parte('¿Cuántos gramos de azúcar hacen falta para ' + i$(P1) + ' personas?', num('=', aa), [d$('\\frac{' + az + '}{' + p0 + '}\\cdot' + P1 + '=' + ftex(aa))]),
        parte('¿Cuánto mide de largo la cocina real (en m)?', dec(lx) && num('=', dec(lx)), ['La realidad es ' + i$(E) + ' veces mayor: ' + d$(cx + '\\cdot' + E + '=' + (cx * E) + '\\text{ cm}=' + dc(lx) + '\\text{ m}')]),
        parte('¿Cuál es la superficie real de la cocina (en m²)?', num('=', dec(lx * ly)), ['Ancho real: ' + i$(dc(ly)) + ' m.', d$(dc(lx) + '\\cdot' + dc(ly) + '=' + dc(lx * ly))]),
      ], data: { p0, h, az, P1, E, cx, cy } };
  } });

  /* ===================== Sentido algebraico ===================== */
  fin({ id: 'tarifas', generate() {
    for (;;) {
      const pb = pick([4, 5, 6, 8]), pa = pb - pick([1, 2]), cuota = pick([6, 8, 10, 12, 15, 20]);
      if (pa <= 0 || cuota % (pb - pa) !== 0) continue;
      const x = cuota / (pb - pa), n0 = pick([5, 10, 15]), nMas = x + pick([5, 10]);
      return { enunciado: 'Una compañía ofrece dos tarifas de datos móviles. La tarifa A cuesta ' + i$(cuota) + ' € de cuota fija más ' + i$(pa) + ' € por GB. La tarifa B no tiene cuota y cuesta ' + i$(pb) + ' € por GB.',
        partes: [
          parte('¿Cuánto cuesta consumir ' + i$(n0) + ' GB con la tarifa A (en €)?', num('A=', F(cuota + pa * n0)), [d$('A(x)=' + cuota + '+' + pa + 'x\\ \\Rightarrow\\ A(' + n0 + ')=' + (cuota + pa * n0))]),
          parte('¿Y con la tarifa B (en €)?', num('B=', F(pb * n0)), [d$('B(x)=' + pb + 'x\\ \\Rightarrow\\ B(' + n0 + ')=' + (pb * n0))]),
          parte('¿Con cuántos GB cuestan lo mismo las dos tarifas?', num('x=', F(x)), ['Igualamos: ' + d$(cuota + '+' + pa + 'x=' + pb + 'x\\ \\Rightarrow\\ ' + cuota + '=' + (pb - pa) + 'x\\ \\Rightarrow\\ x=' + x)]),
          parte('Si se consumen ' + i$(nMas) + ' GB, ¿cuántos euros se ahorran con la tarifa más barata?', num('=', F((pb - pa) * nMas - cuota)), ['Con ' + i$(nMas) + ' GB: A cuesta ' + i$(cuota + pa * nMas) + ' € y B cuesta ' + i$(pb * nMas) + ' €.', d$(pb * nMas + '-' + (cuota + pa * nMas) + '=' + ((pb - pa) * nMas - cuota))]),
        ], data: { pb, pa, cuota, x, n0, nMas } };
    }
  } });

  fin({ id: 'edades', generate() {
    for (;;) {
      const H = rnd.int(9, 17), d = rnd.int(24, 34), Pd = H + d;
      const t = (3 * H - Pd) / 2;
      if (!Number.isInteger(t) || t <= 0 || t >= H) continue;
      const S = H + Pd, f = rnd.int(4, 9);
      return { enunciado: 'La suma de las edades de un padre y su hijo es ' + i$(S) + ' años y el padre tiene ' + i$(d) + ' años más que el hijo. Sean ' + i$('p') + ' y ' + i$('h') + ' sus edades.',
        partes: [
          parte('¿Cuántos años tiene el hijo?', num('h=', F(H)), ['Sistema: ' + d$('\\begin{cases}p+h=' + S + '\\\\p-h=' + d + '\\end{cases}'), 'Sumando: ' + i$('2p=' + (S + d)) + '; restando: ' + i$('2h=' + (S - d)) + ', luego ' + i$('h=' + H) + '.']),
          parte('¿Cuántos años tiene el padre?', num('p=', F(Pd)), [i$('p=' + S + '-' + H + '=' + Pd) + '.']),
          parte('¿Hace cuántos años tenía el padre el triple de la edad del hijo?', num('t=', F(t)), ['Hace ' + i$('t') + ' años: ' + d$(Pd + '-t=3(' + H + '-t)\\ \\Rightarrow\\ ' + Pd + '-t=' + 3 * H + '-3t\\ \\Rightarrow\\ 2t=' + (3 * H - Pd) + '\\ \\Rightarrow\\ t=' + t)]),
          parte('¿Dentro de cuántos años la suma de sus edades será ' + i$(S + 2 * f) + '?', num('x=', F(f)), ['Cada año suma ' + i$(2) + ' a la suma de las edades: ' + d$(S + '+2x=' + (S + 2 * f) + '\\ \\Rightarrow\\ x=' + f)]),
        ], data: { H, Pd, d, S, t, f } };
    }
  } });

  fin({ id: 'parcela', generate() {
    const w = rnd.int(6, 20), k = rnd.int(2, 8), l = w + k, A = w * l, pm = pick([8, 10, 12, 15]);
    return { enunciado: 'Una parcela rectangular tiene ' + i$(A) + ' m² y su largo mide ' + i$(k) + ' m más que su ancho. Se quiere vallar con una valla que cuesta ' + i$(pm) + ' € el metro.',
      partes: [
        parte('Si el ancho es ' + i$('x') + ', la ecuación es ' + i$('x(x+' + k + ')=' + A) + '. ¿Cuánto mide el ancho (en m)?', num('x=', F(w)), [d$('x^2+' + k + 'x-' + A + '=0\\ \\Rightarrow\\ x=\\frac{-' + k + '\\pm' + (2 * w + k) + '}{2}'), 'La solución negativa no tiene sentido: ' + i$('x=' + w) + ' m.']),
        parte('¿Cuánto mide el largo (en m)?', num('l=', F(l)), [d$(w + '+' + k + '=' + l)]),
        parte('¿Cuál es el perímetro (en m)?', num('P=', F(2 * (w + l))), [d$('2(' + w + '+' + l + ')=' + 2 * (w + l))]),
        parte('¿Cuánto cuesta vallar toda la parcela (en €)?', num('=', F(2 * (w + l) * pm)), [d$(2 * (w + l) + '\\cdot' + pm + '=' + 2 * (w + l) * pm)]),
      ], data: { w, k, l, A, pm } };
  } });

  fin({ id: 'mezcla', generate() {
    for (;;) {
      const pa = pick([6, 8, 9, 10]), pb = pick([12, 14, 15, 16, 18]), a = rnd.int(4, 20), b = rnd.int(4, 20), T = a + b, TP = a * pa + b * pb;
      if (pb <= pa) continue;
      return { enunciado: 'Una tienda mezcla dos tipos de frutos secos, uno a ' + i$(pa) + ' €/kg y otro a ' + i$(pb) + ' €/kg, para preparar ' + i$(T) + ' kg de mezcla que cuestan ' + i$(TP) + ' € en total. Sean ' + i$('a') + ' y ' + i$('b') + ' los kg de cada tipo.',
        partes: [
          parte('Plantea el sistema y halla los kg del tipo más barato (' + i$('a') + ').', num('a=', F(a)), ['Sistema: ' + d$('\\begin{cases}a+b=' + T + '\\\\' + pa + 'a+' + pb + 'b=' + TP + '\\end{cases}'), 'De la primera ' + i$('a=' + T + '-b') + '; sustituyendo: ' + i$((pb - pa) + 'b=' + (TP - pa * T)) + ', luego ' + i$('b=' + b) + ' y ' + i$('a=' + a) + '.']),
          parte('¿Cuántos kg del tipo más caro (' + i$('b') + ')?', num('b=', F(b)), ['Del apartado anterior: ' + i$('b=' + b) + '.']),
          parte('¿Cuánto cuesta el kg de la mezcla (en €)? (Redondea a las centésimas.)', apx('\\text{euros/kg}=', TP / T, 2), [d$(TP + ':' + T + '\\approx' + dc(Math.round(TP / T * 100) / 100))]),
          parte('¿Qué porcentaje de la mezcla es del tipo más caro? (Redondea a las unidades.)', apx('\\%=', b / T * 100, 0), [d$('\\frac{' + b + '}{' + T + '}\\cdot100\\approx' + dc(Math.round(b / T * 1000) / 10) + '\\,\\%')]),
        ], data: { pa, pb, a, b, T, TP } };
    }
  } });

  /* ===================== Sentido de la medida y espacial ===================== */
  fin({ id: 'rampa', generate() {
    const [a, b, c] = pick(TRIPLES), k = pick([0.5, 1, 2]), h = a * k, L = b * k, R = c * k, pm = pick([12, 15, 20]);
    return { enunciado: 'Para salvar un desnivel de ' + i$(dc(h)) + ' m se construye una rampa triangular. El suelo horizontal mide ' + i$(dc(L)) + ' m. La pared lateral de la rampa (un triángulo rectángulo) se va a pintar.',
      partes: [
        parte('¿Cuánto mide la rampa, es decir, la hipotenusa (en m)?', num('c=', dec(R)), ['Pitágoras: ' + d$('c=\\sqrt{' + dc(h) + '^2+' + dc(L) + '^2}=\\sqrt{' + dc(h * h + L * L) + '}=' + dc(R))]),
        parte('¿Cuál es el perímetro del triángulo (en m)?', num('P=', dec(h + L + R)), [d$(dc(h) + '+' + dc(L) + '+' + dc(R) + '=' + dc(h + L + R))]),
        parte('¿Cuál es el área de la pared (en m²)?', num('A=', dec(h * L / 2)), [d$('A=\\frac{' + dc(L) + '\\cdot' + dc(h) + '}{2}=' + dc(h * L / 2))]),
        parte('Pintar cuesta ' + i$(pm) + ' € por m². ¿Cuánto cuesta pintar la pared (en €)?', num('=', dec(h * L / 2 * pm)), [d$(dc(h * L / 2) + '\\cdot' + pm + '=' + dc(h * L / 2 * pm))]),
      ], data: { a, b, c, k, h, L, R, pm } };
  } });

  fin({ id: 'deposito', generate() {
    const r = pick([4, 5, 6, 8, 10]), h = pick([10, 12, 15, 20]), q = pick([20, 25, 30, 40]);
    const V = Math.PI * r * r * h, Vl = V, tmin = Vl / q, Al = 2 * Math.PI * r * h / 100;
    const rd = (x, n) => dc(Math.round(x * Math.pow(10, n)) / Math.pow(10, n));
    return { enunciado: 'Un depósito cilíndrico tiene ' + i$(r) + ' dm de radio y ' + i$(h) + ' dm de altura (1 dm³ = 1 litro). Se llena con un grifo que echa ' + i$(q) + ' litros por minuto. Usa ' + i$('\\pi') + ' de la calculadora.',
      partes: [
        parte('¿Cuántos litros caben en el depósito? (Redondea a las unidades.)', apx('V=', Vl, 0), [d$('V=\\pi r^2h=\\pi\\cdot' + r + '^2\\cdot' + h + '\\approx' + rd(Vl, 0))]),
        parte('¿Cuántos minutos tarda en llenarse? (Redondea a las décimas.)', apx('t=', tmin, 1), [d$('t=\\frac{' + rd(Vl, 1) + '}{' + q + '}\\approx' + rd(tmin, 1))]),
        parte('¿Qué superficie lateral tiene en m²? (Redondea a las centésimas.)', apx('A_L=', Al, 2), ['En dm²: ' + i$('2\\pi rh\\approx' + rd(2 * Math.PI * r * h, 1)) + '; ' + i$('1\\ \\text{m}^2=100\\ \\text{dm}^2') + '.', d$('A_L\\approx' + rd(Al, 2) + '\\ \\text{m}^2')]),
        parte('Si se llena hasta el ' + i$(80) + ' % de su capacidad, ¿cuántos litros hay? (Redondea a las unidades.)', apx('=', 0.8 * Vl, 0), [d$('0{,}8\\cdot' + rd(Vl, 1) + '\\approx' + rd(0.8 * Vl, 0))]),
      ], data: { r, h, q, V, Vl, tmin, Al } };
  } });

  fin({ id: 'maqueta', generate() {
    const E = pick([20, 50, 100, 200, 500]), L = rnd.int(4, 12), W = rnd.int(3, 9), H = rnd.int(2, 8);
    const real = (x) => x * E / 100;
    return { enunciado: 'Una maqueta de un edificio está hecha a escala ' + i$('1:' + E) + '. La base de la maqueta mide ' + i$(L) + ' cm por ' + i$(W) + ' cm y su altura es de ' + i$(H) + ' cm.',
      partes: [
        parte('¿Cuántos metros de largo tiene el edificio real?', num('=', dec(real(L))), [d$(L + '\\cdot' + E + '=' + (L * E) + '\\text{ cm}=' + dc(real(L)) + '\\text{ m}')]),
        parte('¿Cuántos metros de altura tiene el edificio real?', num('=', dec(real(H))), [d$(H + '\\cdot' + E + '=' + (H * E) + '\\text{ cm}=' + dc(real(H)) + '\\text{ m}')]),
        parte('¿Cuál es el área de la base real (en m²)?', num('=', dec(real(L) * real(W))), ['Ancho real: ' + i$(dc(real(W))) + ' m.', d$(dc(real(L)) + '\\cdot' + dc(real(W)) + '=' + dc(real(L) * real(W)))]),
        parte('¿Por cuánto se multiplica el área de la base de la maqueta para obtener la real?', num('\\times', F(E * E)), ['Las áreas se multiplican por ' + i$('k^2=' + E + '^2=' + E * E) + '.']),
      ], data: { E, L, W, H } };
  } });

  fin({ id: 'mapa', generate() {
    const t = pick(TRIPLES), k = pick([1, 2]), sx = pick([-1, 1]), sy = pick([-1, 1]);
    const [dx, dy] = pick([[t[0], t[1]], [t[1], t[0]]]).map((v) => v * k), dist = t[2] * k;
    const x1 = rnd.int(-4, 4), y1 = rnd.int(-4, 4), x2 = x1 + sx * dx, y2 = y1 + sy * dy;
    const ph = pick([F(3, 2), F(9, 5), F(2)]), ps = pick([F(1), F(6, 5), F(4, 5)]), sa = fmul(ps, F(pick([3, 5, 10])));
    const h = fmul(ph, fdiv(sa, ps));
    const tx = (f) => dc(f.n / f.d);
    return { enunciado: 'En un mapa con cuadrícula de 1 km, dos pueblos están en ' + i$('A(' + x1 + ',' + y1 + ')') + ' y ' + i$('B(' + x2 + ',' + y2 + ')') + '. Una persona de ' + i$(tx(ph)) + ' m proyecta una sombra de ' + i$(tx(ps)) + ' m; a la misma hora, la torre de un pueblo proyecta una sombra de ' + i$(tx(sa)) + ' m.',
      partes: [
        parte('¿A qué distancia en línea recta están los pueblos (en km)?', num('d=', F(dist)), ['Diferencias: ' + i$(dx + '\\ \\text{y}\\ ' + dy) + '.', d$('d=\\sqrt{' + dx + '^2+' + dy + '^2}=\\sqrt{' + (dx * dx + dy * dy) + '}=' + dist)]),
        parte('¿Cuál es la abscisa del punto medio del camino entre ambos?', num('x_M=', F(x1 + x2, 2)), [d$('x_M=\\frac{' + x1 + '+' + sg(x2) + '}{2}=' + ftex(F(x1 + x2, 2)))]),
        parte('¿Cuál es la ordenada del punto medio?', num('y_M=', F(y1 + y2, 2)), [d$('y_M=\\frac{' + y1 + '+' + sg(y2) + '}{2}=' + ftex(F(y1 + y2, 2)))]),
        parte('¿Qué altura tiene la torre (en m)?', num('h=', h), ['Tales: ' + d$('\\frac{h}{' + tx(sa) + '}=\\frac{' + tx(ph) + '}{' + tx(ps) + '}\\ \\Rightarrow\\ h=' + tx(h))]),
      ], data: { x1, y1, x2, y2, dist, ph, ps, sa, h } };
  } });

  /* ===================== Funciones ===================== */
  fin({ id: 'lanzamiento', generate() {
    const v0 = pick([10, 20, 30, 40]), tv = v0 / 10, hmax = v0 * v0 / 20, t1 = pick([1, 2, 3]).valueOf(), h1 = -5 * t1 * t1 + v0 * t1, suelo = v0 / 5;
    return { enunciado: 'Se lanza una pelota hacia arriba desde el suelo. Su altura (en metros) a los ' + i$('t') + ' segundos es ' + i$('h(t)=-5t^2+' + v0 + 't') + '.',
      partes: [
        parte('¿A qué altura está a los ' + i$(t1) + ' segundos (en m)?', num('h=', F(h1)), [d$('h(' + t1 + ')=-5\\cdot' + t1 + '^2+' + v0 + '\\cdot' + t1 + '=' + h1)]),
        parte('¿En qué instante alcanza la altura máxima (en s)?', num('t=', F(tv)), ['Vértice de la parábola: ' + d$('t_v=-\\frac{b}{2a}=-\\frac{' + v0 + '}{-10}=' + tv)]),
        parte('¿Cuál es la altura máxima (en m)?', num('h_{máx}=', F(hmax)), [d$('h(' + tv + ')=-5\\cdot' + tv + '^2+' + v0 + '\\cdot' + tv + '=' + hmax)]),
        parte('¿A los cuántos segundos vuelve al suelo?', num('t=', F(suelo)), [d$('-5t^2+' + v0 + 't=0\\ \\Rightarrow\\ t(-5t+' + v0 + ')=0\\ \\Rightarrow\\ t=0\\ \\text{o}\\ t=' + suelo), 'Vuelve al suelo a los ' + i$(suelo) + ' s (el doble del tiempo de subida).']),
      ], data: { v0, tv, hmax, t1, h1, suelo } };
  } });

  fin({ id: 'coste', generate() {
    for (;;) {
      const cv = pick([4, 5, 6, 8]), p = cv + pick([2, 3, 4, 5]), cf = (p - cv) * rnd.int(20, 60);
      const xe = cf / (p - cv), x0 = pick([10, 20, 50]), x2 = xe + pick([10, 20, 40]);
      return { enunciado: 'Un taller fabrica camisetas con unos costes fijos de ' + i$(cf) + ' € al mes y ' + i$(cv) + ' € de coste por camiseta. Cada camiseta se vende a ' + i$(p) + ' €. Sea ' + i$('x') + ' el número de camisetas.',
        partes: [
          parte('¿Cuál es el coste de fabricar ' + i$(x0) + ' camisetas (en €)?', num('C=', F(cf + cv * x0)), [d$('C(x)=' + cf + '+' + cv + 'x\\ \\Rightarrow\\ C(' + x0 + ')=' + (cf + cv * x0))]),
          parte('¿Cuál es el beneficio al vender ' + i$(x0) + ' camisetas (en €)? (Si hay pérdidas, número negativo.)', num('B=', F(p * x0 - cf - cv * x0)), [d$('B(x)=' + p + 'x-(' + cf + '+' + cv + 'x)=' + (p - cv) + 'x-' + cf), d$('B(' + x0 + ')=' + (p * x0 - cf - cv * x0))]),
          parte('¿Cuántas camisetas hay que vender para no tener pérdidas ni ganancias?', num('x=', F(xe)), [d$((p - cv) + 'x-' + cf + '=0\\ \\Rightarrow\\ x=\\frac{' + cf + '}{' + (p - cv) + '}=' + xe)]),
          parte('¿Cuál es el beneficio si se venden ' + i$(x2) + ' camisetas (en €)?', num('B=', F((p - cv) * x2 - cf)), [d$('B(' + x2 + ')=' + (p - cv) + '\\cdot' + x2 + '-' + cf + '=' + ((p - cv) * x2 - cf))]),
        ], data: { cv, p, cf, xe, x0, x2 } };
    }
  } });

  fin({ id: 'tabla', generate() {
    for (;;) {
      const xs = [0, 1, 2, 3, 4], ys = xs.map(() => rnd.int(2, 30));
      const mx = Math.max(...ys), mn = Math.min(...ys);
      if (ys.filter((y) => y === mx).length > 1 || ys.filter((y) => y === mn).length > 1) continue;
      const i = pick([0, 1]), j = pick([3, 4]), m = (ys.reduce((s, y) => s + y, 0)) / 5;
      const tvm = F(ys[j] - ys[i], j - i);
      return { enunciado: 'La tabla recoge el número de visitas diarias a una web durante cinco días: ' + d$('\\begin{array}{c|ccccc}\\text{día}&0&1&2&3&4\\\\\\hline\\text{visitas}&' + ys.join('&') + '\\end{array}'),
        partes: [
          parte('¿Cuál es el máximo de visitas?', num('=', F(mx)), ['El mayor valor de la fila de visitas es ' + i$(mx) + '.']),
          parte('¿En qué día hubo menos visitas?', num('\\text{día}=', F(ys.indexOf(mn))), ['El menor valor es ' + i$(mn) + ', en el día ' + i$(ys.indexOf(mn)) + '.']),
          parte('¿Cuál es la tasa de variación media entre los días ' + i$(i) + ' y ' + i$(j) + ' (visitas por día)?', num('\\text{T.V.M.}=', tvm), [d$('\\frac{' + ys[j] + '-' + ys[i] + '}{' + j + '-' + i + '}=' + ftex(tvm))]),
          parte('¿Cuántas visitas hubo de media al día?', num('\\bar{x}=', dec(m)), [d$('\\frac{' + ys.join('+') + '}{5}=\\frac{' + ys.reduce((s, y) => s + y, 0) + '}{5}=' + dc(m))]),
        ], data: { ys, mx, mn, i, j, m } };
    }
  } });

  fin({ id: 'ingresos', generate() {
    for (;;) {
      const b = pick([2, 4, 5]), pstar = rnd.int(4, 10), a = 2 * b * pstar, p1 = pstar - rnd.int(1, 2), imax = a * pstar - b * pstar * pstar;
      const p2 = pstar + 2;
      if (p1 <= 0 || a - b * p2 <= 0) continue;
      return { enunciado: 'Una pastelería vende cada día ' + i$('q=' + a + '-' + b + 'p') + ' tartas si cada tarta cuesta ' + i$('p') + ' €.',
        partes: [
          parte('¿Cuántas tartas vende si el precio es ' + i$(p1) + ' €?', num('q=', F(a - b * p1)), [d$('q=' + a + '-' + b + '\\cdot' + p1 + '=' + (a - b * p1))]),
          parte('¿Cuántos euros ingresa con ese precio?', num('I=', F(p1 * (a - b * p1))), ['Ingresos = precio por tartas vendidas: ' + d$(p1 + '\\cdot' + (a - b * p1) + '=' + p1 * (a - b * p1))]),
          parte('¿Qué precio hace máximos los ingresos? (Los ingresos son ' + i$('I(p)=p(' + a + '-' + b + 'p)=-' + b + 'p^2+' + a + 'p') + '.)', num('p=', F(pstar)), [d$('p_v=-\\frac{' + a + '}{2\\cdot(-' + b + ')}=' + pstar)]),
          parte('¿Cuál es el ingreso máximo (en €)?', num('I=', F(imax)), [d$('I(' + pstar + ')=' + pstar + '\\cdot(' + a + '-' + b + '\\cdot' + pstar + ')=' + imax)]),
        ], data: { a, b, pstar, p1, imax } };
    }
  } });

  /* ===================== Sentido estocástico ===================== */
  const med = (a) => { const s = a.slice().sort((x, y) => x - y), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
  fin({ id: 'encuesta', generate() {
    for (;;) {
      const n = pick([5, 8, 10]), d = Array.from({ length: n }, () => rnd.int(4, 12)), m = d.reduce((s, x) => s + x, 0) / n;
      const cnt = {}; d.forEach((x) => { cnt[x] = (cnt[x] || 0) + 1; });
      const mc = Math.max(...Object.values(cnt)), modas = Object.keys(cnt).filter((k) => cnt[k] === mc);
      if (modas.length !== 1 || mc < 2 || Math.abs(m * 100 - Math.round(m * 100)) > 1e-9) continue;
      const s = d.slice().sort((a, b) => a - b), md = med(d);
      return { enunciado: 'Se pregunta a ' + i$(n) + ' alumnos cuántas horas duermen por la noche: ' + i$(d.join(',\\ ')) + '.',
        partes: [
          parte('¿Cuántas horas duermen de media?', num('\\bar{x}=', dec(m)), [d$('\\bar{x}=\\frac{' + d.join('+') + '}{' + n + '}=' + dc(m))]),
          parte('¿Cuál es la mediana?', num('Me=', dec(md)), ['Ordenados: ' + i$(s.join(',\\ ')) + '.', 'La mediana es ' + i$(dc(md)) + '.']),
          parte('¿Cuál es la moda?', num('Mo=', F(Number(modas[0]))), ['El valor que más se repite es ' + i$(modas[0]) + ' (' + mc + ' veces).']),
          parte('¿Cuál es el rango?', num('R=', F(s[n - 1] - s[0])), [d$(s[n - 1] + '-' + s[0] + '=' + (s[n - 1] - s[0]))]),
        ], data: { d, m, md, mo: Number(modas[0]) } };
    }
  } });

  fin({ id: 'frecuencias', generate() {
    for (;;) {
      const N = pick([20, 40, 50, 100, 200]);
      const c = [0, 0, 0, 0]; let rest = N;
      for (let i = 0; i < 3; i++) { c[i] = rnd.int(Math.ceil(N * 0.1), Math.floor(N * 0.35)); rest -= c[i]; }
      c[3] = rest; if (c[3] < Math.ceil(N * 0.1) || c[3] > Math.floor(N * 0.4)) continue;
      const names = ['fútbol', 'baloncesto', 'natación', 'atletismo'];
      const hAng = c[1] / N * 360;
      if (Math.abs(hAng - Math.round(hAng * 10) / 10) > 1e-9) continue;
      return { enunciado: 'En una encuesta a ' + i$(N) + ' alumnos sobre su deporte favorito se obtiene: ' + names.map((n, i) => n + ' ' + c[i]).join(', ') + '.',
        partes: [
          parte('¿Qué porcentaje prefiere ' + names[0] + '?', num('\\%=', dec(c[0] / N * 100)), [d$('\\frac{' + c[0] + '}{' + N + '}\\cdot100=' + dc(c[0] / N * 100) + '\\,\\%')]),
          parte('¿Qué frecuencia relativa (decimal) tiene ' + names[2] + '?', num('h=', dec(c[2] / N)), [d$('h=\\frac{' + c[2] + '}{' + N + '}=' + dc(c[2] / N))]),
          parte('¿Qué ángulo (en grados) tiene el sector de ' + names[1] + ' en un diagrama de sectores?', num('\\alpha=', dec(hAng)), [d$('360^\\circ\\cdot\\frac{' + c[1] + '}{' + N + '}=' + dc(hAng) + '^\\circ')]),
          parte('¿Cuántos alumnos más prefieren ' + names[0] + ' que ' + names[3] + ' (puede salir negativo)?', num('=', F(c[0] - c[3])), [d$(c[0] + '-' + c[3] + '=' + (c[0] - c[3]))]),
        ], data: { N, c } };
    }
  } });

  fin({ id: 'bolsa', generate() {
    for (;;) {
      const r = rnd.int(2, 7), a = rnd.int(2, 7), v = rnd.int(2, 7), t = r + a + v;
      if (2 * r >= t) continue;
      return { enunciado: 'Una bolsa contiene ' + i$(r) + ' bolas rojas, ' + i$(a) + ' azules y ' + i$(v) + ' verdes. Se saca una bola al azar.',
        partes: [
          parte('¿Cuál es la probabilidad de que sea roja?', num('P(R)=', F(r, t)), ['Casos posibles ' + i$(t) + ': ' + d$('P(R)=\\frac{' + r + '}{' + t + '}' + (F(r, t).d === t ? '' : '=' + ftex(F(r, t))))]),
          parte('¿Y de que no sea verde?', num('P(\\bar{V})=', F(r + a, t)), [d$('P(\\bar{V})=1-\\frac{' + v + '}{' + t + '}=\\frac{' + (r + a) + '}{' + t + '}=' + ftex(F(r + a, t)))]),
          parte('¿Y de que sea azul o verde?', num('P(A\\cup V)=', F(a + v, t)), ['Son incompatibles: ' + d$('\\frac{' + a + '}{' + t + '}+\\frac{' + v + '}{' + t + '}=' + ftex(F(a + v, t)))]),
          parte('¿Cuántas bolas rojas habría que añadir para que la probabilidad de sacar roja sea ' + i$('\\frac12') + '?', num('x=', F(t - 2 * r)), ['Con ' + i$('x') + ' rojas más: ' + d$('\\frac{' + r + '+x}{' + t + '+x}=\\frac12\\ \\Rightarrow\\ ' + 2 * r + '+2x=' + t + '+x\\ \\Rightarrow\\ x=' + (t - 2 * r))]),
        ], data: { r, a, v, t } };
    }
  } });

  fin({ id: 'urnas', generate() {
    const r = rnd.int(3, 7), a = rnd.int(2, 6), t = r + a;
    return { enunciado: 'Una urna tiene ' + i$(r) + ' bolas rojas y ' + i$(a) + ' azules. Se extraen dos bolas una detrás de otra.',
      partes: [
        parte('Con reemplazamiento (se devuelve la primera), ¿cuál es la probabilidad de que las dos sean rojas?', num('P=', fmul(F(r, t), F(r, t))), [d$('\\frac{' + r + '}{' + t + '}\\cdot\\frac{' + r + '}{' + t + '}=' + ftex(fmul(F(r, t), F(r, t))))]),
        parte('Sin reemplazamiento, ¿cuál es la probabilidad de que las dos sean rojas?', num('P=', fmul(F(r, t), F(r - 1, t - 1))), [d$('\\frac{' + r + '}{' + t + '}\\cdot\\frac{' + (r - 1) + '}{' + (t - 1) + '}=' + ftex(fmul(F(r, t), F(r - 1, t - 1))))]),
        parte('Sin reemplazamiento, ¿cuál es la probabilidad de que sean de distinto color?', num('P=', fadd(fmul(F(r, t), F(a, t - 1)), fmul(F(a, t), F(r, t - 1)))), [d$('\\frac{' + r + '}{' + t + '}\\cdot\\frac{' + a + '}{' + (t - 1) + '}+\\frac{' + a + '}{' + t + '}\\cdot\\frac{' + r + '}{' + (t - 1) + '}=' + ftex(fadd(fmul(F(r, t), F(a, t - 1)), fmul(F(a, t), F(r, t - 1)))))]),
        parte('¿Cuántos resultados distintos (ordenados) hay al sacar dos bolas sin reemplazamiento, tratando las bolas como distintas?', num('=', F(t * (t - 1))), ['Primera bola: ' + i$(t) + ' opciones; segunda: ' + i$(t - 1) + '. Por el principio de multiplicación: ' + d$(t + '\\cdot' + (t - 1) + '=' + t * (t - 1))]),
      ], data: { r, a, t } };
  } });
})(typeof globalThis !== 'undefined' ? globalThis : this);
