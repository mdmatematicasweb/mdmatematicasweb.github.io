/* Ejercicios interactivos — 3º ESO, sentido numérico (temas 1 a 4).
 * Tema 1: eso3-mcd-mcm, eso3-frac-operar, eso3-frac-generatriz, eso3-frac-problema.
 * Tema 2: eso3-pot-calculo, eso3-notacion, eso3-radicales.
 * Tema 3: eso3-prog-aritmetica, eso3-prog-geometrica, eso3-prog-problema.
 * Tema 4: eso3-prop-regla3, eso3-porcentajes, eso3-interes.
 * Verificadores independientes: tests/verify-gym-eso3.js.
 */
(function (root) {
  'use strict';
  const G = root.MDGym;
  const { rnd, F, ftex, d$, i$, gcd, fadd, fsub, fmul, fdiv } = G;
  const { dc, define, sg } = G.eso3;
  const mcm = (a, b) => (a / gcd(a, b)) * b;
  const fact = (n) => {                                              // factorización en TeX: 2^3\cdot3
    const out = []; let m = n;
    for (let p = 2; p * p <= m; p++) { let e = 0; while (m % p === 0) { m /= p; e++; } if (e) out.push(p + (e > 1 ? '^{' + e + '}' : '')); }
    if (m > 1) out.push(String(m));
    return out.join('\\cdot');
  };
  const factMap = (n) => { const o = {}; let m = n; for (let p = 2; p * p <= m; p++) while (m % p === 0) { o[p] = (o[p] || 0) + 1; m /= p; } if (m > 1) o[m] = (o[m] || 0) + 1; return o; };
  const fr = (n, d) => ftex(F(n, d));

  /* ===================== Tema 1 ===================== */
  define({
    id: 'eso3-mcd-mcm',
    title: 'Máximo común divisor y mínimo común múltiplo',
    help: [
      'Se descompone cada número en factores primos. El **m.c.d.** es el producto de los factores **comunes** con el **menor** exponente. El **m.c.m.** es el producto de los factores comunes y no comunes con el **mayor** exponente.',
      'Ejemplo: $12=2^2\\cdot3$ y $18=2\\cdot3^2$. m.c.d. $=2\\cdot3=6$; m.c.m. $=2^2\\cdot3^2=36$. Se cumple que $\\text{m.c.d.}\\cdot\\text{m.c.m.}=12\\cdot18$.',
    ],
    params: [{ key: 'ctx', label: 'Enunciado', options: [['num', 'Con números'], ['pro', 'En un problema']] }],
    generate(p) {
      let a, b, g;
      do { g = rnd.pick([2, 3, 4, 5, 6]); a = g * rnd.int(2, 9); b = g * rnd.int(2, 9); } while (a === b || gcd(a, b) < 2 || a > 150 || b > 150);
      const d = gcd(a, b), m = mcm(a, b);
      const steps = [
        'Factorizamos: ' + d$(a + '=' + fact(a) + ',\\qquad ' + b + '=' + fact(b)),
        'El m.c.d. toma los factores comunes con el menor exponente: ' + i$('\\text{m.c.d.}(' + a + ',' + b + ')=' + d) + '.',
        'El m.c.m. toma todos los factores con el mayor exponente: ' + i$('\\text{m.c.m.}(' + a + ',' + b + ')=' + m) + '.',
        'Comprobación: ' + i$(d + '\\cdot' + m + '=' + d * m + '=' + a + '\\cdot' + b) + '.',
      ];
      const parts = [{ kind: 'number', label: '\\text{m.c.d.}=', value: F(d) }, { kind: 'number', label: '\\text{m.c.m.}=', value: F(m) }];
      if (p.ctx === 'pro') {
        return {
          prompt: 'Dos luces parpadean cada ' + a + ' y cada ' + b + ' segundos. Se encienden a la vez. Calcula, en segundos, el tiempo que pasa hasta que coinciden de nuevo (m.c.m.) y el mayor número de segundos que divide a los dos periodos (m.c.d.).',
          answer: { kind: 'multi', parts: [parts[1], parts[0]] },
          steps, mistakes: [], data: { a, b },
        };
      }
      return { prompt: 'Calcula el m.c.d. y el m.c.m. de ' + i$(a) + ' y ' + i$(b) + '.', answer: { kind: 'multi', parts }, steps, mistakes: [], data: { a, b } };
    },
  });

  define({
    id: 'eso3-frac-operar',
    title: 'Operaciones con fracciones',
    help: [
      'Suma y resta: se reducen a **común denominador** (el m.c.m. de los denominadores). Producto: numerador por numerador y denominador por denominador. Cociente: se multiplica por la fracción **inversa**.',
      'Ejemplo: $\\frac12+\\frac13=\\frac36+\\frac26=\\frac56$ y $\\frac23:\\frac45=\\frac23\\cdot\\frac54=\\frac{10}{12}=\\frac56$. En las operaciones combinadas: primero paréntesis, luego productos y cocientes, por último sumas y restas.',
    ],
    params: [{ key: 'op', label: 'Operación', options: [['suma', 'Suma y resta'], ['prod', 'Producto y cociente'], ['comb', 'Operación combinada']] }],
    generate(p) {
      const rf = () => { let n, d; do { d = rnd.int(2, 9); n = rnd.int(1, 9) * rnd.pick([1, 1, -1]); } while (gcd(n, d) !== 1 || Math.abs(n) === d); return F(n, d); };
      let A = rf(), B = rf(), C = rf();
      if (p.op === 'suma') {
        const plus = rnd.pick([true, false]);
        const r = plus ? fadd(A, B) : fsub(A, B);
        const m = mcm(A.d, B.d);
        return {
          prompt: 'Calcula y simplifica: ' + i$(ftex(A) + (plus ? '+' : '-') + (B.n < 0 ? '(' + ftex(B) + ')' : ftex(B))) + '.',
          answer: { kind: 'number', label: '=', value: r },
          steps: ['Común denominador (m.c.m. de ' + A.d + ' y ' + B.d + ' es ' + m + '): ' + d$(fr(A.n * m / A.d, m) + (plus ? '+' : '-') + '(' + fr(B.n * m / B.d, m) + ')'),
            'Operamos los numeradores: ' + d$('\\frac{' + (A.n * m / A.d) + (plus ? '+' : '-') + sg(B.n * m / B.d) + '}{' + m + '}=' + fr((plus ? A.n * m / A.d + B.n * m / B.d : A.n * m / A.d - B.n * m / B.d), m)),
            'Simplificamos: ' + i$('=' + ftex(r)) + '.'],
          mistakes: [{ value: F(plus ? A.n + B.n : A.n - B.n, plus ? A.d + B.d : A.d + B.d), msg: 'no se suman numeradores con numeradores y denominadores con denominadores: hay que reducir a común denominador.' }],
          data: { A, B, plus },
        };
      }
      if (p.op === 'prod') {
        const mul = rnd.pick([true, false]);
        const r = mul ? fmul(A, B) : fdiv(A, B);
        return {
          prompt: 'Calcula y simplifica: ' + i$(ftex(A) + (mul ? '\\cdot' : ':') + (B.n < 0 ? '(' + ftex(B) + ')' : ftex(B))) + '.',
          answer: { kind: 'number', label: '=', value: r },
          steps: [mul ? 'Multiplicamos numeradores y denominadores: ' + d$(ftex(A) + '\\cdot' + (B.n < 0 ? '(' + ftex(B) + ')' : ftex(B)) + '=\\frac{' + (A.n * B.n) + '}{' + (A.d * B.d) + '}')
            : 'Dividir es multiplicar por la inversa: ' + d$(ftex(A) + ':' + (B.n < 0 ? '(' + ftex(B) + ')' : ftex(B)) + '=' + ftex(A) + '\\cdot' + (B.n < 0 ? '(' + ftex(F(B.d, B.n)) + ')' : ftex(F(B.d, B.n))) + '=\\frac{' + (A.n * B.d) + '}{' + (A.d * B.n) + '}'),
            'Simplificamos: ' + i$('=' + ftex(r)) + '.'],
          mistakes: [], data: { A, B, mul },
        };
      }
      const r = fsub(A, fmul(fadd(B, C), F(1, 1)));
      const inner = fadd(B, C), prod = fmul(inner, A);
      const res = fsub(F(1, 2), prod);
      return {
        prompt: 'Calcula: ' + i$('\\frac12-\\left(' + ftex(B) + (C.n < 0 ? '+(' + ftex(C) + ')' : '+' + ftex(C)) + '\\right)\\cdot' + (A.n < 0 ? '(' + ftex(A) + ')' : ftex(A))) + '.',
        answer: { kind: 'number', label: '=', value: res },
        steps: ['Primero el paréntesis: ' + i$(ftex(B) + '+' + (C.n < 0 ? '(' + ftex(C) + ')' : ftex(C)) + '=' + ftex(inner)) + '.',
          'Después el producto: ' + i$(ftex(inner) + '\\cdot' + (A.n < 0 ? '(' + ftex(A) + ')' : ftex(A)) + '=' + ftex(prod)) + '.',
          'Por último la resta: ' + d$('\\frac12-' + (prod.n < 0 ? '(' + ftex(prod) + ')' : ftex(prod)) + '=' + ftex(res))],
        mistakes: [], data: { A, B, C, res },
      };
    },
  });

  define({
    id: 'eso3-frac-generatriz',
    title: 'Fracción generatriz',
    help: [
      '**Exacto**: el número sin coma partido por $1$ seguido de tantos ceros como cifras decimales. **Periódico puro**: (número sin coma $-$ parte entera) partido por tantos $9$ como cifras tiene el periodo. **Periódico mixto**: (número sin coma $-$ parte no periódica) partido por tantos $9$ como cifras tiene el periodo y tantos $0$ como cifras tiene la parte decimal no periódica.',
      'Ejemplos: $0{,}35=\\frac{35}{100}=\\frac7{20}$; $1{,}\\overline{3}=\\frac{13-1}{9}=\\frac{12}{9}=\\frac43$; $0{,}2\\overline{6}=\\frac{26-2}{90}=\\frac{24}{90}=\\frac4{15}$.',
    ],
    params: [{ key: 'tipo', label: 'Tipo de decimal', options: [['exacto', 'Exacto'], ['puro', 'Periódico puro'], ['mixto', 'Periódico mixto']] }],
    generate(p) {
      const ent = rnd.int(0, 4);
      if (p.tipo === 'exacto') {
        const k = rnd.int(1, 3), dec = rnd.int(1, Math.pow(10, k) - 1);
        const txt = ent + ',' + String(dec).padStart(k, '0');
        const num = ent * Math.pow(10, k) + dec, den = Math.pow(10, k);
        return { prompt: 'Halla la fracción irreducible de ' + i$(txt) + '.', answer: { kind: 'number', label: '=', value: F(num, den) },
          steps: ['Es un decimal exacto con ' + k + ' cifra(s) decimal(es): ' + d$(txt + '=\\frac{' + num + '}{' + den + '}'), 'Simplificamos: ' + i$('=' + ftex(F(num, den))) + '.'], mistakes: [], data: { txt, num, den } };
      }
      if (p.tipo === 'puro') {
        const k = rnd.int(1, 2), per = rnd.int(1, Math.pow(10, k) - 2);
        const ps = String(per).padStart(k, '0');
        const num = Number(ent + ps) - ent, den = Math.pow(10, k) - 1;
        const txt = ent + ',\\overline{' + ps + '}';
        return { prompt: 'Halla la fracción irreducible de ' + i$(txt) + '.', answer: { kind: 'number', label: '=', value: F(num, den) },
          steps: ['Es periódico puro, con periodo de ' + k + ' cifra(s): ' + d$(txt + '=\\frac{' + Number(ent + ps) + '-' + ent + '}{' + den + '}=\\frac{' + num + '}{' + den + '}'), 'Simplificamos: ' + i$('=' + ftex(F(num, den))) + '.'], mistakes: [], data: { ent, ps, num, den } };
      }
      const a = rnd.int(1, 2), ant = rnd.int(1, Math.pow(10, a) - 1), as = String(ant).padStart(a, '0'), k = rnd.int(1, 2), per = rnd.int(1, Math.pow(10, k) - 2), ps = String(per).padStart(k, '0');
      const full = Number(ent + as + ps), nonp = Number(ent + as);
      const num = full - nonp, den = (Math.pow(10, k) - 1) * Math.pow(10, a);
      const txt = ent + ',' + as + '\\overline{' + ps + '}';
      return { prompt: 'Halla la fracción irreducible de ' + i$(txt) + '.', answer: { kind: 'number', label: '=', value: F(num, den) },
        steps: ['Es periódico mixto (parte no periódica de ' + a + ' cifra(s) y periodo de ' + k + '): ' + d$(txt + '=\\frac{' + full + '-' + nonp + '}{' + den + '}=\\frac{' + num + '}{' + den + '}'), 'Simplificamos: ' + i$('=' + ftex(F(num, den))) + '.'], mistakes: [], data: { ent, as, ps, num, den } };
    },
  });

  define({
    id: 'eso3-frac-problema',
    title: 'Fracciones en problemas',
    help: [
      'La fracción $\\frac ab$ **de una cantidad** $C$ es $\\frac ab\\cdot C$. Si se gasta una fracción del total, lo que queda es $1$ menos esa fracción.',
      'Ejemplo: se gasta $\\frac13$ y luego $\\frac14$ del total. Se gasta $\\frac13+\\frac14=\\frac7{12}$ y queda $1-\\frac7{12}=\\frac5{12}$. Si queda $\\frac5{12}$ de $240$ €, quedan $100$ €.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['queda', 'Lo que queda'], ['total', 'Hallar el total']] }],
    generate(p) {
      const ds = rnd.pick([[3, 4], [4, 5], [2, 5], [3, 5], [2, 3]]);
      const f1 = F(1, ds[0]), f2 = F(1, ds[1]);
      const gast = fadd(f1, f2), resto = fsub(F(1), gast);
      const unit = resto.d * rnd.int(2, 6) * 10;
      if (p.tipo === 'queda') {
        const total = unit * 1;
        const q = resto.n * total / resto.d;
        return {
          prompt: 'De un depósito de ' + i$(total) + ' L se gasta ' + i$(ftex(f1)) + ' el lunes y ' + i$(ftex(f2)) + ' del total el martes. ¿Cuántos litros quedan?',
          answer: { kind: 'number', label: '\\text{Quedan}=', value: F(q) },
          steps: ['Fracción gastada: ' + i$(ftex(f1) + '+' + ftex(f2) + '=' + ftex(gast)) + '.', 'Fracción que queda: ' + i$('1-' + ftex(gast) + '=' + ftex(resto)) + '.', 'Litros: ' + d$(ftex(resto) + '\\cdot' + total + '=' + q)],
          mistakes: [{ value: F(gast.n * total / gast.d), msg: 'eso es lo que se ha gastado; la pregunta es cuánto queda.' }], data: { f1, f2, total, q },
        };
      }
      const total = unit, q = resto.n * total / resto.d;
      return {
        prompt: 'Una persona gasta ' + i$(ftex(f1)) + ' de su paga en ocio y ' + i$(ftex(f2)) + ' en comida. Le quedan ' + i$(q) + ' €. ¿Cuánto tenía al principio?',
        answer: { kind: 'number', label: '\\text{Paga}=', value: F(total) },
        steps: ['Fracción gastada: ' + i$(ftex(gast)) + '; fracción que queda: ' + i$('1-' + ftex(gast) + '=' + ftex(resto)) + '.', 'Si ' + i$(ftex(resto)) + ' de la paga son ' + i$(q) + ' €, la paga es ' + d$(q + ':' + ftex(resto) + '=' + q + '\\cdot' + ftex(F(resto.d, resto.n)) + '=' + total)],
        mistakes: [], data: { f1, f2, total, q },
      };
    },
  });

  /* ===================== Tema 2 ===================== */
  define({
    id: 'eso3-pot-calculo',
    title: 'Potencias de exponente entero',
    help: [
      '$a^0=1$ y $a^{-n}=\\frac1{a^n}$. Con la misma base: $a^m\\cdot a^n=a^{m+n}$, $a^m:a^n=a^{m-n}$ y $(a^m)^n=a^{m\\cdot n}$.',
      'Ejemplo: $\\frac{2^5\\cdot2^{-3}}{2^{-1}}=2^{5-3-(-1)}=2^3=8$. Con exponente negativo: $\\left(\\frac23\\right)^{-2}=\\left(\\frac32\\right)^2=\\frac94$.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['basico', 'Una potencia'], ['prop', 'Aplicando propiedades']] }],
    generate(p) {
      if (p.tipo === 'basico') {
        const a = rnd.int(2, 6), n = rnd.int(2, 3), neg = rnd.pick([true, false, false]);
        const base = rnd.pick([F(a), F(a, rnd.pick([2, 3, 5]))]);
        const bt = base.d === 1 ? String(base.n) : ftex(base);
        const v = neg ? F(1) : F(1);
        const pw = (f, e) => { let r = F(1); for (let i = 0; i < Math.abs(e); i++) r = fmul(r, f); return e < 0 ? fdiv(F(1), r) : r; };
        const e = neg ? -n : n;
        const val = pw(base, e);
        return { prompt: 'Calcula ' + i$(base.d === 1 && e > 0 ? bt + '^{' + e + '}' : '\\left(' + bt + '\\right)^{' + e + '}') + ' como número o fracción.', answer: { kind: 'number', label: '=', value: val },
          steps: [neg ? 'Un exponente negativo invierte la base: ' + d$('\\left(' + bt + '\\right)^{' + e + '}=\\left(' + ftex(fdiv(F(1), base)) + '\\right)^{' + n + '}') : 'Multiplicamos la base por sí misma ' + n + ' veces.', 'Resultado: ' + i$('=' + ftex(val)) + '.'],
          mistakes: [], data: { base, e } };
      }
      const b = rnd.pick([2, 3, 5]);
      let m, n, k;
      do { m = rnd.int(-3, 6); n = rnd.int(-3, 6); k = rnd.int(-3, 5); } while (m + n - k === 0 || Math.abs(m + n - k) > 4);
      const e = m + n - k;
      const val = e >= 0 ? F(Math.pow(b, e)) : F(1, Math.pow(b, -e));
      return {
        prompt: 'Simplifica y calcula: ' + i$('\\dfrac{' + b + '^{' + m + '}\\cdot' + b + '^{' + n + '}}{' + b + '^{' + k + '}}') + '.',
        answer: { kind: 'number', label: '=', value: val },
        steps: ['Misma base: se suman los exponentes del producto y se restan los del cociente: ' + d$(b + '^{' + m + '+' + sg(n) + '-' + sg(k) + '}=' + b + '^{' + e + '}'), 'Resultado: ' + i$(b + '^{' + e + '}=' + ftex(val)) + '.'],
        mistakes: [], data: { b, m, n, k },
      };
    },
  });

  define({
    id: 'eso3-notacion',
    title: 'Notación científica',
    help: [
      'Un número en notación científica es $a\\cdot10^n$ con $1\\le a<10$ y $n$ entero. Si el número es grande, $n>0$; si es pequeño, $n<0$. Se cuenta cuántos lugares se mueve la coma.',
      'Producto: se multiplican los coeficientes y se suman los exponentes. Cociente: se dividen los coeficientes y se restan los exponentes. Si el coeficiente no queda entre $1$ y $10$, se ajusta. Ejemplo: $(4\\cdot10^3)\\cdot(5\\cdot10^2)=20\\cdot10^5=2\\cdot10^6$.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['escribir', 'Escribir en notación científica'], ['operar', 'Multiplicar o dividir']] }],
    generate(p) {
      if (p.tipo === 'escribir') {
        const a = rnd.int(11, 99) / 10, n = rnd.pick([-7, -6, -5, -4, 5, 6, 7, 8, 9]);
        const dig = String(Math.round(a * 10));
        const txt = n > 0 ? dig + '0'.repeat(Math.max(0, n - 1)) : '0,' + '0'.repeat(-n - 1) + dig;
        const txtf = n > 0 ? String(Math.round(a * 10) * Math.pow(10, n - 1)).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : txt;
        return {
          prompt: 'Escribe ' + i$(txtf) + ' en notación científica ' + i$('a\\cdot10^{n}') + '. Da el coeficiente ' + i$('a') + ' y el exponente ' + i$('n') + '.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'a=', value: G.parseFrac(String(a)) }, { kind: 'number', label: 'n=', value: F(n) }] },
          steps: ['Movemos la coma hasta que haya una sola cifra entera distinta de cero: el coeficiente es ' + i$(dc(a)) + '.', 'La coma se ha movido ' + Math.abs(n) + ' lugares ' + (n > 0 ? 'a la izquierda (exponente positivo)' : 'a la derecha (exponente negativo)') + ': ' + d$(txtf + '=' + dc(a) + '\\cdot10^{' + n + '}')],
          mistakes: [], data: { a, n },
        };
      }
      const A = rnd.int(12, 49), B = rnd.int(12, 49), a = A / 10, b = B / 10, n = rnd.int(2, 8), m = rnd.int(-6, 6);
      const mul = rnd.pick([true, false]);
      let c = Math.round((mul ? A * B / 100 : A / B) * 1e9) / 1e9, e = mul ? n + m : n - m;
      while (c >= 10) { c = Math.round(c / 10 * 1e9) / 1e9; e += 1; }
      while (c < 1) { c = Math.round(c * 10 * 1e9) / 1e9; e -= 1; }
      if (Math.abs(c * 1000 - Math.round(c * 1000)) > 1e-9) return G.modules['eso3-notacion'].generate(p);
      return {
        prompt: 'Calcula en notación científica: ' + i$('(' + dc(a) + '\\cdot10^{' + n + '})' + (mul ? '\\cdot' : ':') + '(' + dc(b) + '\\cdot10^{' + m + '})') + '. Da el coeficiente (con todos los decimales exactos) y el exponente.',
        answer: { kind: 'multi', parts: [{ kind: 'number', label: 'a=', value: G.parseFrac(String(c)) }, { kind: 'number', label: 'n=', value: F(e) }] },
        steps: [mul ? 'Multiplicamos los coeficientes y sumamos los exponentes: ' + i$(dc(a) + '\\cdot' + dc(b) + '=' + dc(Math.round(a * b * 1e6) / 1e6) + ',\\ 10^{' + n + '}\\cdot10^{' + m + '}=10^{' + (n + m) + '}') + '.'
          : 'Dividimos los coeficientes y restamos los exponentes: ' + i$(dc(a) + ':' + dc(b) + '=' + dc(Math.round(a / b * 1e6) / 1e6) + ',\\ 10^{' + n + '-' + sg(m) + '}=10^{' + (n - m) + '}') + '.',
          'Ajustamos para que el coeficiente esté entre $1$ y $10$: ' + d$(dc(c) + '\\cdot10^{' + e + '}')],
        mistakes: [], data: { a, b, n, m, mul, c, e },
      };
    },
  });

  define({
    id: 'eso3-radicales',
    title: 'Radicales',
    help: [
      'Para **sacar factores** de una raíz se factoriza el radicando y se sacan los factores cuyo exponente sea mayor o igual que el índice: $\\sqrt{72}=\\sqrt{2^3\\cdot3^2}=2\\cdot3\\sqrt2=6\\sqrt2$.',
      'Solo se pueden sumar radicales **semejantes** (mismo índice y mismo radicando): $3\\sqrt2+5\\sqrt2=8\\sqrt2$. Antes de sumar, se simplifica cada raíz: $\\sqrt{50}-\\sqrt{18}=5\\sqrt2-3\\sqrt2=2\\sqrt2$.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['extraer', 'Extraer factores'], ['sumar', 'Sumar radicales'], ['producto', 'Multiplicar radicales']] }],
    generate(p) {
      const sqfree = rnd.pick([2, 3, 5, 6, 7]);
      if (p.tipo === 'extraer') {
        const k = rnd.int(2, 7), rad = k * k * sqfree;
        return {
          prompt: 'Simplifica ' + i$('\\sqrt{' + rad + '}') + ' escribiéndolo como ' + i$('a\\sqrt{b}') + ' con ' + i$('b') + ' sin cuadrados.',
          answer: { kind: 'multi', parts: [{ kind: 'number', label: 'a=', value: F(k) }, { kind: 'number', label: 'b=', value: F(sqfree) }] },
          steps: ['Factorizamos: ' + i$(rad + '=' + fact(rad)) + '.', 'Sacamos los cuadrados: ' + d$('\\sqrt{' + rad + '}=\\sqrt{' + k * k + '\\cdot' + sqfree + '}=' + k + '\\sqrt{' + sqfree + '}')],
          mistakes: [], data: { rad, k, sqfree },
        };
      }
      if (p.tipo === 'sumar') {
        const a = rnd.int(1, 5), b = rnd.int(1, 5), c = rnd.int(1, 4);
        const sign2 = rnd.pick([1, -1]);
        const r1 = a * a * sqfree, r2 = b * b * sqfree;
        const res = c + sign2 * 0;
        const tot = a + sign2 * b;
        if (tot === 0) return G.modules['eso3-radicales'].generate(p);
        return {
          prompt: 'Calcula ' + i$('\\sqrt{' + r1 + '}' + (sign2 > 0 ? '+' : '-') + '\\sqrt{' + r2 + '}') + ' y escríbelo como ' + i$('k\\sqrt{' + sqfree + '}') + '. ¿Cuánto vale ' + i$('k') + '?',
          answer: { kind: 'number', label: 'k=', value: F(tot) },
          steps: ['Simplificamos cada raíz: ' + i$('\\sqrt{' + r1 + '}=' + a + '\\sqrt{' + sqfree + '}') + ' y ' + i$('\\sqrt{' + r2 + '}=' + b + '\\sqrt{' + sqfree + '}') + '.', 'Son semejantes, sumamos los coeficientes: ' + d$(a + (sign2 > 0 ? '+' : '-') + b + '=' + tot + '\\ \\Rightarrow\\ ' + tot + '\\sqrt{' + sqfree + '}')],
          mistakes: [{ value: F(a + b), msg: 'comprueba el signo de la operación.' }].filter((x) => sign2 < 0), data: { r1, r2, sqfree, tot },
        };
      }
      const a = rnd.pick([2, 3, 5, 6]), b = rnd.pick([2, 3, 5, 6, 7, 8, 10]);
      const prod = a * b;
      let k = 1, rest = prod;
      for (let q = 2; q * q <= rest; q++) while (rest % (q * q) === 0) { rest /= q * q; k *= q; }
      return {
        prompt: 'Calcula ' + i$('\\sqrt{' + a + '}\\cdot\\sqrt{' + b + '}') + ' como ' + i$('k\\sqrt{m}') + ' con ' + i$('m') + ' sin cuadrados.',
        answer: { kind: 'multi', parts: [{ kind: 'number', label: 'k=', value: F(k) }, { kind: 'number', label: 'm=', value: F(rest) }] },
        steps: ['Con el mismo índice, se multiplican los radicandos: ' + i$('\\sqrt{' + a + '}\\cdot\\sqrt{' + b + '}=\\sqrt{' + prod + '}') + '.', 'Simplificamos: ' + i$('\\sqrt{' + prod + '}=' + (k > 1 ? k : '') + '\\sqrt{' + rest + '}') + '.'],
        mistakes: [], data: { a, b, k, rest },
      };
    },
  });

  /* ===================== Tema 3 ===================== */
  define({
    id: 'eso3-prog-aritmetica',
    title: 'Progresión aritmética',
    help: [
      'En una progresión aritmética cada término es el anterior más la diferencia $d$. Término general: $a_n=a_1+(n-1)d$. Suma de los $n$ primeros: $S_n=\\frac{(a_1+a_n)\\,n}{2}$.',
      'Ejemplo: $5,8,11,\\dots$ tiene $d=3$; $a_{10}=5+9\\cdot3=32$ y $S_{10}=\\frac{(5+32)\\cdot10}{2}=185$.',
    ],
    params: [{ key: 'tipo', label: 'Qué calcular', options: [['termino', 'Un término'], ['suma', 'La suma de n términos'], ['dato', 'Diferencia a partir de dos términos']] }],
    generate(p) {
      const a1 = rnd.int(-5, 20), d = rnd.pick([-4, -3, -2, 2, 3, 4, 5, 6, 7]), n = rnd.int(8, 25);
      const an = a1 + (n - 1) * d;
      const seq = [0, 1, 2, 3].map((k) => a1 + k * d).join(',\\ ') + ',\\dots';
      if (p.tipo === 'termino') {
        return { prompt: 'En la progresión aritmética ' + i$(seq) + ' calcula el término ' + i$('a_{' + n + '}') + '.', answer: { kind: 'number', label: 'a_{' + n + '}=', value: F(an) },
          steps: ['Diferencia: ' + i$('d=' + (a1 + d) + '-' + sg(a1) + '=' + d) + '.', 'Término general: ' + i$('a_n=' + a1 + '+(n-1)\\cdot' + sg(d)) + '.', 'Sustituimos: ' + d$('a_{' + n + '}=' + a1 + '+' + (n - 1) + '\\cdot' + sg(d) + '=' + an)],
          mistakes: [{ value: F(a1 + n * d), msg: 'el término ' + n + ' suma ' + (n - 1) + ' veces la diferencia, no ' + n + '.' }], data: { a1, d, n } };
      }
      if (p.tipo === 'suma') {
        const S = (a1 + an) * n / 2;
        return { prompt: 'Calcula la suma de los ' + i$(n) + ' primeros términos de la progresión aritmética ' + i$(seq) + '.', answer: { kind: 'number', label: 'S_{' + n + '}=', value: F(S) },
          steps: ['Diferencia ' + i$('d=' + d) + ' y último término: ' + i$('a_{' + n + '}=' + a1 + '+' + (n - 1) + '\\cdot' + sg(d) + '=' + an) + '.', 'Suma: ' + d$('S_{' + n + '}=\\frac{(' + a1 + '+' + sg(an) + ')\\cdot' + n + '}{2}=' + S)],
          mistakes: [], data: { a1, d, n } };
      }
      const k = rnd.int(2, 5), a_k = a1 + (k - 1) * d, m = rnd.int(k + 3, k + 9), a_m = a1 + (m - 1) * d;
      return { prompt: 'En una progresión aritmética ' + i$('a_{' + k + '}=' + a_k) + ' y ' + i$('a_{' + m + '}=' + a_m) + '. Calcula la diferencia ' + i$('d') + '.', answer: { kind: 'number', label: 'd=', value: F(d) },
        steps: ['Entre las posiciones ' + k + ' y ' + m + ' hay ' + (m - k) + ' saltos: ' + d$('a_{' + m + '}-a_{' + k + '}=' + (m - k) + 'd'), 'Despejamos: ' + d$('d=\\frac{' + a_m + '-' + sg(a_k) + '}{' + (m - k) + '}=' + d)],
        mistakes: [], data: { k, m, a_k, a_m, d } };
    },
  });

  define({
    id: 'eso3-prog-geometrica',
    title: 'Progresión geométrica',
    help: [
      'En una progresión geométrica cada término es el anterior por la razón $r$. Término general: $a_n=a_1\\cdot r^{n-1}$. Suma: $S_n=\\frac{a_1(r^n-1)}{r-1}$. Si $|r|<1$, la suma de todos los términos es $S=\\frac{a_1}{1-r}$.',
      'Ejemplo: $3,6,12,\\dots$ tiene $r=2$; $a_6=3\\cdot2^5=96$ y $S_6=\\frac{3\\,(2^6-1)}{2-1}=189$. Y $8+4+2+1+\\dots=\\frac{8}{1-\\frac12}=16$.',
    ],
    params: [{ key: 'tipo', label: 'Qué calcular', options: [['termino', 'Un término'], ['suma', 'La suma de n términos'], ['infinita', 'Suma de infinitos términos']] }],
    generate(p) {
      if (p.tipo === 'infinita') {
        const r = rnd.pick([F(1, 2), F(1, 3), F(2, 3), F(1, 4), F(3, 4), F(-1, 2), F(-1, 3)]);
        const a1 = r.d * rnd.int(1, 6) * rnd.pick([1, 2]);
        const S = fdiv(F(a1), fsub(F(1), r));
        const seq = [0, 1, 2].map((k) => { let v = F(a1); for (let i = 0; i < k; i++) v = fmul(v, r); return ftex(v); }).join(',\\ ') + ',\\dots';
        return { prompt: 'Calcula la suma de todos los términos de la progresión geométrica ' + i$(seq) + '.', answer: { kind: 'number', label: 'S=', value: S },
          steps: ['Razón: ' + i$('r=' + ftex(r)) + '. Como ' + i$('|r|<1') + ', la suma de infinitos términos es finita.', 'Aplicamos ' + i$('S=\\frac{a_1}{1-r}') + ': ' + d$('S=\\frac{' + a1 + '}{1-' + (r.n < 0 ? '(' + ftex(r) + ')' : ftex(r)) + '}=' + ftex(S))], mistakes: [], data: { a1, r } };
      }
      const a1 = rnd.int(1, 6), r = rnd.pick([2, 3, -2, 5]), n = rnd.int(4, 8);
      const an = a1 * Math.pow(r, n - 1);
      const seq = [0, 1, 2, 3].map((k) => a1 * Math.pow(r, k)).join(',\\ ') + ',\\dots';
      if (p.tipo === 'termino') {
        return { prompt: 'En la progresión geométrica ' + i$(seq) + ' calcula ' + i$('a_{' + n + '}') + '.', answer: { kind: 'number', label: 'a_{' + n + '}=', value: F(an) },
          steps: ['Razón: ' + i$('r=' + r) + '.', 'Término general: ' + d$('a_{' + n + '}=' + a1 + '\\cdot' + sg(r) + '^{' + (n - 1) + '}=' + an)], mistakes: [{ value: F(a1 * Math.pow(r, n)), msg: 'el exponente es ' + (n - 1) + ', no ' + n + '.' }], data: { a1, r, n } };
      }
      const S = a1 * (Math.pow(r, n) - 1) / (r - 1);
      return { prompt: 'Calcula la suma de los ' + i$(n) + ' primeros términos de la progresión geométrica ' + i$(seq) + '.', answer: { kind: 'number', label: 'S_{' + n + '}=', value: F(S) },
        steps: ['Razón: ' + i$('r=' + r) + '.', 'Aplicamos ' + i$('S_n=\\frac{a_1(r^n-1)}{r-1}') + ': ' + d$('S_{' + n + '}=\\frac{' + a1 + '\\,(' + sg(r) + '^{' + n + '}-1)}{' + sg(r) + '-1}=' + S)], mistakes: [], data: { a1, r, n } };
    },
  });

  define({
    id: 'eso3-prog-problema',
    title: 'Progresiones en problemas',
    help: [
      'Primero decide si el problema es **aritmético** (se añade siempre la misma cantidad) o **geométrico** (se multiplica siempre por el mismo número, por ejemplo un porcentaje). Identifica $a_1$, $d$ o $r$ y $n$.',
      'Para el total acumulado se usa la suma $S_n$. Ejemplo: ahorrar $10$ € y $2$ € más cada semana durante $8$ semanas: $a_8=24$ y $S_8=\\frac{(10+24)\\cdot8}{2}=136$ €.',
    ],
    params: [{ key: 'ctx', label: 'Situación', options: [['butacas', 'Filas de butacas (aritmética)'], ['ahorro', 'Ahorro creciente (aritmética)'], ['bacterias', 'Bacterias (geométrica)'], ['capital', 'Interés compuesto (geométrica)']] }],
    generate(p) {
      if (p.ctx === 'butacas') {
        const a1 = rnd.int(8, 20), d = rnd.int(1, 4), n = rnd.int(10, 24), an = a1 + (n - 1) * d, S = (a1 + an) * n / 2;
        const tot = rnd.pick([true, false]);
        return { prompt: 'En un teatro, la primera fila tiene ' + i$(a1) + ' butacas y cada fila siguiente tiene ' + i$(d) + ' más que la anterior. Hay ' + i$(n) + ' filas. ¿Cuántas butacas ' + (tot ? 'tiene el teatro en total' : 'tiene la última fila') + '?',
          answer: { kind: 'number', label: '=', value: F(tot ? S : an) },
          steps: ['Progresión aritmética con ' + i$('a_1=' + a1 + ',\\ d=' + d) + '. Última fila: ' + d$('a_{' + n + '}=' + a1 + '+' + (n - 1) + '\\cdot' + d + '=' + an)].concat(tot ? ['Total: ' + d$('S_{' + n + '}=\\frac{(' + a1 + '+' + an + ')\\cdot' + n + '}{2}=' + S)] : []),
          mistakes: [], data: { a1, d, n, tot } };
      }
      if (p.ctx === 'ahorro') {
        const a1 = rnd.int(3, 15), d = rnd.int(2, 6), n = rnd.pick([12, 16, 20, 26, 30]), an = a1 + (n - 1) * d, S = (a1 + an) * n / 2;
        return { prompt: 'Ahorras ' + i$(a1) + ' € la primera semana y cada semana ' + i$(d) + ' € más que la anterior. ¿Cuánto has ahorrado en total al cabo de ' + i$(n) + ' semanas?',
          answer: { kind: 'number', label: '\\text{Total}=', value: F(S) },
          steps: ['Aritmética con ' + i$('a_1=' + a1 + ',\\ d=' + d) + ': en la última semana ' + i$('a_{' + n + '}=' + an) + ' €.', 'Suma: ' + d$('S_{' + n + '}=\\frac{(' + a1 + '+' + an + ')\\cdot' + n + '}{2}=' + S)], mistakes: [], data: { a1, d, n } };
      }
      if (p.ctx === 'bacterias') {
        const a1 = rnd.pick([10, 20, 50, 100]), r = rnd.pick([2, 3]), n = rnd.int(3, 7), an = a1 * Math.pow(r, n);
        return { prompt: 'Un cultivo empieza con ' + i$(a1) + ' bacterias y cada hora el número de bacterias se multiplica por ' + i$(r) + '. ¿Cuántas hay al cabo de ' + i$(n) + ' horas?',
          answer: { kind: 'number', label: '=', value: F(an) },
          steps: ['Progresión geométrica de razón ' + i$('r=' + r) + ' y primer término ' + i$(a1) + ' (hora 0).', 'Tras ' + n + ' horas: ' + d$(a1 + '\\cdot' + r + '^{' + n + '}=' + an)], mistakes: [], data: { a1, r, n } };
      }
      const C = rnd.pick([1000, 2000, 4000, 5000]), t = rnd.pick([5, 10, 20]), n = rnd.int(2, 3);
      const f = 1 + t / 100, fin = Math.round(C * Math.pow(f, n) * 100) / 100;
      return { prompt: 'Depositas ' + i$(C) + ' € a un interés compuesto del ' + i$(t) + ' % anual. ¿Cuánto dinero tendrás al cabo de ' + i$(n) + ' años?',
        answer: { kind: 'number', label: '=', value: G.parseFrac(String(fin)) },
        steps: ['Cada año el capital se multiplica por ' + i$('1+\\frac{' + t + '}{100}=' + dc(f)) + ': es una progresión geométrica.', 'Capital final: ' + d$(C + '\\cdot' + dc(f) + '^{' + n + '}=' + dc(fin))], mistakes: [], data: { C, t, n, fin } };
    },
  });

  /* ===================== Tema 4 ===================== */
  define({
    id: 'eso3-prop-regla3',
    title: 'Proporcionalidad directa e inversa',
    help: [
      '**Directa**: si una magnitud se multiplica por un número, la otra también ($y/x$ constante). **Inversa**: si una se multiplica, la otra se divide ($x\\cdot y$ constante). Pregúntate si al aumentar una, la otra aumenta (directa) o disminuye (inversa).',
      'Regla de tres compuesta: se analiza cada magnitud respecto de la incógnita. Ejemplo: $6$ obreros tardan $10$ días; con $15$ obreros: $6\\cdot10=15\\cdot x\\Rightarrow x=4$ días (inversa).',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['directa', 'Directa'], ['inversa', 'Inversa'], ['compuesta', 'Compuesta']] }],
    generate(p) {
      if (p.tipo === 'directa') {
        const k = rnd.pick([F(3, 2), F(5, 2), F(9, 4), F(12), F(7, 2), F(4, 5)]), x1 = rnd.int(2, 9) * k.d, x2 = rnd.int(2, 12) * k.d;
        const y1 = fmul(k, F(x1)), y2 = fmul(k, F(x2));
        return { prompt: x1 + ' kg de un producto cuestan ' + dc(y1.n / y1.d) + ' €. ¿Cuánto cuestan ' + x2 + ' kg?', answer: { kind: 'number', label: '=', value: y2 },
          steps: ['Magnitudes directamente proporcionales. Precio por kg: ' + i$(dc(y1.n / y1.d) + ':' + x1 + '=' + dc(k.n / k.d)) + ' €.', 'Para ' + x2 + ' kg: ' + d$(x2 + '\\cdot' + dc(k.n / k.d) + '=' + dc(y2.n / y2.d))], mistakes: [], data: { x1, x2, y1, y2 } };
      }
      if (p.tipo === 'inversa') {
        const prod = rnd.pick([60, 72, 90, 120, 144, 180]);
        const divs = []; for (let d = 2; d <= 30; d++) if (prod % d === 0) divs.push(d);
        const a = rnd.pick(divs); let b; do { b = rnd.pick(divs); } while (b === a);
        return { prompt: a + ' operarios construyen un muro en ' + prod / a + ' días. ¿Cuántos días tardarían ' + b + ' operarios trabajando al mismo ritmo?', answer: { kind: 'number', label: '=', value: F(prod / b) },
          steps: ['Más operarios, menos días: magnitudes inversamente proporcionales, así que ' + i$('\\text{operarios}\\cdot\\text{días}') + ' es constante.', d$(a + '\\cdot' + prod / a + '=' + b + '\\cdot x\\ \\Rightarrow\\ x=\\frac{' + prod + '}{' + b + '}=' + prod / b)], mistakes: [{ value: F(Math.round(prod / a * b / a * 100) / 100 === prod / b ? prod / a * b / a : (prod / a) * b / a), msg: 'es inversa: con más operarios se tarda menos.' }], data: { a, b, prod } };
      }
      const m1 = rnd.pick([4, 6, 8]), h1 = rnd.pick([3, 4, 6]), q1 = m1 * h1 * rnd.pick([10, 15, 20]);
      const m2 = rnd.pick([2, 3, 5, 10]), h2 = rnd.pick([2, 5, 8, 9]);
      const q2 = fmul(F(q1), F(m2 * h2, m1 * h1));
      return { prompt: m1 + ' máquinas fabrican ' + q1 + ' piezas en ' + h1 + ' horas. ¿Cuántas piezas fabrican ' + m2 + ' máquinas iguales en ' + h2 + ' horas?', answer: { kind: 'number', label: '=', value: q2 },
        steps: ['Las piezas son directamente proporcionales al número de máquinas y a las horas.', d$('x=' + q1 + '\\cdot\\frac{' + m2 + '}{' + m1 + '}\\cdot\\frac{' + h2 + '}{' + h1 + '}=' + ftex(q2))], mistakes: [], data: { m1, h1, q1, m2, h2 } };
    },
  });

  define({
    id: 'eso3-porcentajes',
    title: 'Porcentajes',
    help: [
      'El $r\\,\\%$ de una cantidad $C$ es $\\frac r{100}C$. Un **aumento** del $r\\,\\%$ multiplica por $1+\\frac r{100}$ y una **disminución** por $1-\\frac r{100}$. Para recuperar la cantidad inicial se **divide** entre ese índice.',
      'Variaciones encadenadas: los índices se multiplican. Ejemplo: subir un $20\\,\\%$ y luego bajar un $20\\,\\%$ da $1{,}2\\cdot0{,}8=0{,}96$, es decir, una bajada del $4\\,\\%$.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['descuento', 'Descuento y precio final'], ['iva', 'Con IVA y sin IVA'], ['encadenado', 'Variaciones encadenadas'], ['total', 'Hallar el total']] }],
    generate(p) {
      if (p.tipo === 'descuento') {
        const P0 = rnd.pick([40, 60, 80, 120, 150, 200, 250]), r = rnd.pick([10, 15, 20, 25, 30, 40, 50]);
        const fin = P0 * (100 - r) / 100;
        return { prompt: 'Un artículo cuesta ' + i$(P0) + ' € y tiene un descuento del ' + i$(r) + ' %. ¿Cuál es su precio final?', answer: { kind: 'number', label: '=', value: G.parseFrac(String(fin)) },
          steps: ['Índice de variación: ' + i$('1-\\frac{' + r + '}{100}=' + dc((100 - r) / 100)) + '.', 'Precio final: ' + d$(P0 + '\\cdot' + dc((100 - r) / 100) + '=' + dc(fin))], mistakes: [{ value: G.parseFrac(String(P0 * r / 100)), msg: 'eso es lo que se descuenta; la pregunta es el precio final.' }], data: { P0, r, fin } };
      }
      if (p.tipo === 'iva') {
        const P0 = rnd.pick([50, 100, 200, 250, 400, 500]), con = rnd.pick([true, false]);
        const fin = P0 * 1.21;
        if (con) return { prompt: 'Un producto cuesta ' + i$(P0) + ' € sin IVA. Con el ' + i$('21') + ' % de IVA, ¿cuánto cuesta?', answer: { kind: 'number', label: '=', value: G.parseFrac(String(Math.round(fin * 100) / 100)) },
          steps: ['Índice: ' + i$('1+0{,}21=1{,}21') + '.', d$(P0 + '\\cdot1{,}21=' + dc(Math.round(fin * 100) / 100))], mistakes: [], data: { P0, con } };
        return { prompt: 'Un producto cuesta ' + i$(dc(Math.round(fin * 100) / 100)) + ' € con el ' + i$('21') + ' % de IVA incluido. ¿Cuánto cuesta sin IVA?', answer: { kind: 'number', label: '=', value: F(P0) },
          steps: ['El precio con IVA es el precio sin IVA por ' + i$('1{,}21') + '. Para volver atrás se **divide**.', d$(dc(Math.round(fin * 100) / 100) + ':1{,}21=' + P0)], mistakes: [{ value: G.parseFrac(String(Math.round(fin * 0.79 * 100) / 100)), msg: 'quitar el 21 % del precio final no deshace el aumento: hay que dividir entre $1{,}21$.' }], data: { P0, con } };
      }
      if (p.tipo === 'encadenado') {
        const r1 = rnd.pick([10, 20, 25, 30, 50]), r2 = rnd.pick([10, 20, 25, 30, 50]), up1 = rnd.pick([true, false]), up2 = rnd.pick([true, false]);
        const idx = (up1 ? 100 + r1 : 100 - r1) * (up2 ? 100 + r2 : 100 - r2) / 10000;
        const P0 = rnd.pick([100, 200, 400, 800]);
        const fin = Math.round(P0 * idx * 100) / 100;
        return { prompt: 'Un precio de ' + i$(P0) + ' € ' + (up1 ? 'sube' : 'baja') + ' un ' + i$(r1) + ' % y después ' + (up2 ? 'sube' : 'baja') + ' un ' + i$(r2) + ' %. ¿Cuál es el precio final?', answer: { kind: 'number', label: '=', value: G.parseFrac(String(fin)) },
          steps: ['Índices: ' + i$((up1 ? '1+' : '1-') + dc(r1 / 100) + '=' + dc(up1 ? 1 + r1 / 100 : 1 - r1 / 100)) + ' y ' + i$((up2 ? '1+' : '1-') + dc(r2 / 100) + '=' + dc(up2 ? 1 + r2 / 100 : 1 - r2 / 100)) + '.', 'Se multiplican: ' + d$(P0 + '\\cdot' + dc(up1 ? 1 + r1 / 100 : 1 - r1 / 100) + '\\cdot' + dc(up2 ? 1 + r2 / 100 : 1 - r2 / 100) + '=' + dc(fin))], mistakes: [], data: { P0, r1, r2, up1, up2, fin } };
      }
      const r = rnd.pick([15, 20, 25, 30, 40, 60]), tot = rnd.pick([120, 200, 240, 300, 400, 500, 600]);
      const part = tot * r / 100;
      if (!Number.isInteger(part)) return G.modules['eso3-porcentajes'].generate(p);
      return { prompt: 'El ' + i$(r) + ' % de un número es ' + i$(part) + '. ¿Cuál es el número?', answer: { kind: 'number', label: '=', value: F(tot) },
        steps: ['Si el ' + i$(r) + ' % es ' + i$(part) + ', el número es ' + i$(part) + ' entre ' + i$(dc(r / 100)) + '.', d$(part + ':' + dc(r / 100) + '=' + tot)], mistakes: [], data: { r, tot, part } };
    },
  });

  define({
    id: 'eso3-interes',
    title: 'Interés simple y compuesto',
    help: [
      '**Interés simple**: los intereses no se reinvierten. $I=C\\cdot\\frac r{100}\\cdot t$. **Interés compuesto**: cada año los intereses se suman al capital. $C_t=C\\left(1+\\frac r{100}\\right)^t$.',
      'Ejemplo: $2\\,000$ € al $5\\,\\%$ durante $3$ años. Simple: $I=2000\\cdot0{,}05\\cdot3=300$ €. Compuesto: $2000\\cdot1{,}05^3=2315{,}25$ €, es decir, $315{,}25$ € de intereses.',
    ],
    params: [{ key: 'tipo', label: 'Tipo', options: [['simple', 'Interés simple'], ['compuesto', 'Interés compuesto'], ['compara', 'Diferencia entre ambos']] }],
    generate(p) {
      const C = rnd.pick([1000, 2000, 4000, 5000, 10000]), t = rnd.pick([5, 10, 20]), n = rnd.int(2, 3);
      const simple = Math.round(C * t / 100 * n * 100) / 100, comp = Math.round(C * Math.pow(1 + t / 100, n) * 100) / 100;
      const f = dc(1 + t / 100);
      if (p.tipo === 'simple') return { prompt: 'Un capital de ' + i$(C) + ' € se deposita al ' + i$(t) + ' % de interés simple anual durante ' + i$(n) + ' años. ¿Qué intereses produce?', answer: { kind: 'number', label: 'I=', value: G.parseFrac(String(simple)) },
        steps: [d$('I=C\\cdot\\frac{r}{100}\\cdot t=' + C + '\\cdot' + dc(t / 100) + '\\cdot' + n + '=' + dc(simple))], mistakes: [], data: { C, t, n, simple } };
      if (p.tipo === 'compuesto') return { prompt: 'Un capital de ' + i$(C) + ' € se deposita al ' + i$(t) + ' % de interés compuesto anual durante ' + i$(n) + ' años. ¿Cuánto dinero hay al final?', answer: { kind: 'number', label: 'C_f=', value: G.parseFrac(String(comp)) },
        steps: ['Cada año se multiplica por ' + i$(f) + ': ' + d$('C_f=' + C + '\\cdot' + f + '^{' + n + '}=' + dc(comp))], mistakes: [{ value: G.parseFrac(String(Math.round((C + simple) * 100) / 100)), msg: 'eso es el capital con interés simple: en el compuesto los intereses también producen intereses.' }], data: { C, t, n, comp } };
      const dif = Math.round((comp - C - simple) * 100) / 100;
      return { prompt: 'Compara dos depósitos de ' + i$(C) + ' € al ' + i$(t) + ' % anual durante ' + i$(n) + ' años: uno con interés simple y otro con interés compuesto. ¿Cuántos euros más de intereses produce el compuesto?', answer: { kind: 'number', label: '=', value: G.parseFrac(String(dif)) },
        steps: ['Simple: ' + i$('I=' + C + '\\cdot' + dc(t / 100) + '\\cdot' + n + '=' + dc(simple)) + ' €.', 'Compuesto: ' + i$(C + '\\cdot' + f + '^{' + n + '}=' + dc(comp)) + ' €, es decir, ' + i$(dc(Math.round((comp - C) * 100) / 100)) + ' € de intereses.', 'Diferencia: ' + d$(dc(Math.round((comp - C) * 100) / 100) + '-' + dc(simple) + '=' + dc(dif))], mistakes: [], data: { C, t, n, dif } };
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
