/* MD Matemáticas — motor de ejercicios interactivos ("gym").
 * Genera y corrige ejercicios en el navegador, sin backend.
 * Un módulo de tema (p. ej. matrices.js) registra generadores con MDGym.define().
 */
(function (root) {
  'use strict';

  /* ---------- Aleatorio (sustituible por un PRNG con semilla para reproducir exámenes) ---------- */
  let rand = Math.random;
  const rnd = {
    float: () => rand(),
    int: (a, b) => a + Math.floor(rand() * (b - a + 1)),
    pick: (arr) => arr[Math.floor(rand() * arr.length)],
    shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  };
  /** Sustituye el generador aleatorio (null = Math.random). Devuelve el anterior. */
  function setRandom(fn) { const prev = rand; rand = fn || Math.random; return prev; }
  /** PRNG mulberry32 con semilla de texto. */
  function seeded(seedStr) {
    let h = 1779033703 ^ String(seedStr).length;
    for (let i = 0; i < String(seedStr).length; i++) { h = Math.imul(h ^ String(seedStr).charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    let a = (h ^ (h >>> 16)) >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------- Fracciones exactas ---------- */
  const gcd = (a, b) => {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { [a, b] = [b, a % b]; }
    return a;
  };
  function F(n, d = 1) {
    if (d === 0) throw new Error('división por cero');
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d) || 1;
    return { n: n / g, d: d / g };
  }
  const fadd = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d);
  const fsub = (a, b) => F(a.n * b.d - b.n * a.d, a.d * b.d);
  const fmul = (a, b) => F(a.n * b.n, a.d * b.d);
  const fdiv = (a, b) => F(a.n * b.d, a.d * b.n);
  const fneg = (a) => F(-a.n, a.d);
  const feq = (a, b) => a.n === b.n && a.d === b.d;
  const fzero = (a) => a.n === 0;
  const fstr = (a) => (a.d === 1 ? String(a.n) : a.n + '/' + a.d);
  const ftex = (a) => (a.d === 1 ? String(a.n) : (a.n < 0 ? '-' : '') + '\\frac{' + Math.abs(a.n) + '}{' + a.d + '}');
  const ftexp = (a) => (a.n < 0 ? '(' + ftex(a) + ')' : ftex(a));

  /** Lee "3", "-4", "3/2", "1.5", "1,5", "−2". Devuelve fracción o null. */
  function parseFrac(s) {
    if (typeof s !== 'string') return null;
    s = s.trim().replace(/−/g, '-').replace(/\s+/g, '').replace(/,/g, '.');
    const m = /^([+-]?\d+(?:\.\d+)?)(?:\/([+-]?\d+(?:\.\d+)?))?$/.exec(s);
    if (!m) return null;
    const num = decExact(m[1]);
    if (m[2] === undefined) return num;
    const den = decExact(m[2]);
    if (fzero(den)) return null;
    return fdiv(num, den);
  }
  function decExact(t) {
    const neg = t.startsWith('-');
    const body = t.replace(/^[+-]/, '');
    const p = body.split('.');
    const k = p[1] ? p[1].length : 0;
    const v = parseInt(p[0] + (p[1] || ''), 10);
    return F(neg ? -v : v, Math.pow(10, k));
  }

  /* ---------- Matrices de fracciones ---------- */
  const M = (rows) => rows.map((r) => r.map((x) => (typeof x === 'number' ? F(x) : x)));
  const mz = (r, c) => Array.from({ length: r }, () => Array.from({ length: c }, () => F(0)));
  const mI = (n) => M(Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))));
  const rows = (A) => A.length;
  const cols = (A) => A[0].length;
  const mcopy = (A) => A.map((r) => r.slice());
  const mT = (A) => A[0].map((_, j) => A.map((r) => r[j]));
  const madd = (A, B) => A.map((r, i) => r.map((x, j) => fadd(x, B[i][j])));
  const msub = (A, B) => A.map((r, i) => r.map((x, j) => fsub(x, B[i][j])));
  const mscale = (A, k) => A.map((r) => r.map((x) => fmul(x, k)));
  const meq = (A, B) => rows(A) === rows(B) && cols(A) === cols(B) && A.every((r, i) => r.every((x, j) => feq(x, B[i][j])));
  function mmul(A, B) {
    const C = mz(rows(A), cols(B));
    for (let i = 0; i < rows(A); i++)
      for (let j = 0; j < cols(B); j++) {
        let s = F(0);
        for (let k = 0; k < cols(A); k++) s = fadd(s, fmul(A[i][k], B[k][j]));
        C[i][j] = s;
      }
    return C;
  }
  function mpow(A, n) {
    let R = mI(rows(A)), B = A;
    while (n > 0) {
      if (n & 1) R = mmul(R, B);
      B = mmul(B, B);
      n = Math.floor(n / 2);
    }
    return R;
  }
  function minorM(A, i, j) {
    return A.filter((_, r) => r !== i).map((r) => r.filter((_, c) => c !== j));
  }
  function det(A) {
    const n = rows(A);
    if (n === 1) return A[0][0];
    if (n === 2) return fsub(fmul(A[0][0], A[1][1]), fmul(A[0][1], A[1][0]));
    let s = F(0);
    for (let j = 0; j < n; j++) {
      if (fzero(A[0][j])) continue;
      const t = fmul(A[0][j], det(minorM(A, 0, j)));
      s = j % 2 === 0 ? fadd(s, t) : fsub(s, t);
    }
    return s;
  }
  function cofactors(A) {
    return A.map((r, i) => r.map((_, j) => {
      const d = det(minorM(A, i, j));
      return (i + j) % 2 === 0 ? d : fneg(d);
    }));
  }
  function inverse(A) {
    const d = det(A);
    if (fzero(d)) return null;
    return mscale(mT(cofactors(A)), F(d.d, d.n));
  }
  function rankOf(A) {
    const B = mcopy(A);
    let r = 0;
    for (let c = 0; c < cols(B) && r < rows(B); c++) {
      let p = -1;
      for (let i = r; i < rows(B); i++) if (!fzero(B[i][c])) { p = i; break; }
      if (p < 0) continue;
      [B[r], B[p]] = [B[p], B[r]];
      for (let i = r + 1; i < rows(B); i++) {
        if (fzero(B[i][c])) continue;
        const k = fdiv(B[i][c], B[r][c]);
        B[i] = B[i].map((x, j) => fsub(x, fmul(k, B[r][j])));
      }
      r++;
    }
    return r;
  }

  /* ---------- TeX ---------- */
  const mtex = (A, env = 'pmatrix') => '\\begin{' + env + '}' + A.map((r) => r.map(ftex).join('&')).join('\\\\') + '\\end{' + env + '}';
  const mtexStr = (S, env = 'pmatrix') => '\\begin{' + env + '}' + S.map((r) => r.join('&')).join('\\\\') + '\\end{' + env + '}';
  const d$ = (s) => '$$' + s + '$$';
  const i$ = (s) => '$' + s + '$';

  /* ---------- Expresiones numéricas seguras (respuestas «expr») ---------- */
  const FUN = { sqrt: Math.sqrt, ln: Math.log, exp: Math.exp, sin: Math.sin, cos: Math.cos, tan: Math.tan, atan: Math.atan, abs: Math.abs };
  const FUN_ALIAS = { sen: 'sin', tg: 'tan', arctg: 'atan', arctan: 'atan', raiz: 'sqrt', log: 'ln' };
  /** Evalúa "1/2+ln(2)", "sqrt(3)", "pi/4", "2e-1", "3π"... Devuelve número o null. */
  function parseExpr(input) {
    if (typeof input !== 'string') return null;
    let src = input.trim().toLowerCase().replace(/\u2212/g, '-').replace(/\u00d7|\u00b7/g, '*').replace(/\u03c0/g, 'pi')
      .replace(/\u221a/g, 'sqrt').replace(/\u00b2/g, '^2').replace(/\u00b3/g, '^3').replace(/,/g, '.').replace(/\s+/g, '');
    if (!src) return null;
    const tok = [];
    const re = /(\d+\.?\d*|\.\d+)|([a-z]+)|([-+*\/^()])/y;
    let m, pos = 0;
    while (pos < src.length) {
      re.lastIndex = pos;
      m = re.exec(src);
      if (!m) return null;
      pos = re.lastIndex;
      if (m[1] !== undefined) tok.push({ t: 'n', v: parseFloat(m[1]) });
      else if (m[2] !== undefined) {
        let w = m[2];
        // separa palabras pegadas como "2pi" (ya van aparte) o "pie" (pi·e) o "ln2"
        while (w.length) {
          const cand = ['sqrt', 'arctan', 'arctg', 'raiz', 'sen', 'sin', 'cos', 'tan', 'atan', 'abs', 'exp', 'log', 'ln', 'tg', 'pi', 'e'].find((k) => w.startsWith(k));
          if (!cand) return null;
          tok.push({ t: 'i', v: cand });
          w = w.slice(cand.length);
        }
      } else tok.push({ t: 'o', v: m[3] });
    }
    let i = 0;
    const peek = () => tok[i];
    function expr() {
      let v = term();
      while (peek() && peek().t === 'o' && (peek().v === '+' || peek().v === '-')) {
        const op = tok[i++].v; const r = term(); v = op === '+' ? v + r : v - r;
      }
      return v;
    }
    function term() {
      let v = unary();
      for (;;) {
        const k = peek();
        if (!k) break;
        if (k.t === 'o' && (k.v === '*' || k.v === '/')) { i++; const r = unary(); v = k.v === '*' ? v * r : v / r; }
        else if (k.t === 'n' || k.t === 'i' || (k.t === 'o' && k.v === '(')) v = v * power();   // multiplicación implícita
        else break;
      }
      return v;
    }
    function unary() {
      const k = peek();
      if (k && k.t === 'o' && (k.v === '-' || k.v === '+')) { i++; const v = unary(); return k.v === '-' ? -v : v; }
      return power();
    }
    function power() {
      const b = primary();
      const k = peek();
      if (k && k.t === 'o' && k.v === '^') { i++; const e = unary(); return Math.pow(b, e); }
      return b;
    }
    function primary() {
      const k = tok[i++];
      if (!k) throw new Error('fin');
      if (k.t === 'n') return k.v;
      if (k.t === 'o' && k.v === '(') { const v = expr(); const c = tok[i++]; if (!c || c.v !== ')') throw new Error(')'); return v; }
      if (k.t === 'i') {
        if (k.v === 'pi') return Math.PI;
        if (k.v === 'e') return Math.E;
        const fn = FUN[FUN_ALIAS[k.v] || k.v];
        if (!fn) throw new Error('fn');
        const arg = peek() && peek().t === 'o' && peek().v === '(' ? primary() : power();
        return fn(arg);
      }
      throw new Error('tok');
    }
    try {
      const v = expr();
      if (i !== tok.length || !Number.isFinite(v)) return null;
      return v;
    } catch (e) { return null; }
  }
  const exprClose = (a, b) => Math.abs(a - b) <= 5e-4 * Math.max(1, Math.abs(b));

  /* ---------- Corrección ---------- */
  const flatten = (A) => [].concat(...A);

  /** spec: {kind:'matrix'|'number'|'list', value}. raw: textos de las casillas. */
  // Respuesta compuesta: spec.parts = [{kind:'matrix'|'list'|'number', label, value, colLabels?}, ...]
  const asParts = (spec) => spec.parts.map((p) => (p.kind ? p : Object.assign({ kind: 'matrix' }, p)));
  const cellCount = (part) => (part.kind === 'matrix' ? part.value.length * part.value[0].length : 1);
  function checkAnswer(spec, raw) {
    if (spec.kind === 'matrixset' || spec.kind === 'multi') {
      let off = 0, status = 'ok';
      const cells = [];
      asParts(spec).forEach((part) => {
        const k = cellCount(part);
        const r = checkAnswer(part, raw.slice(off, off + k));
        off += k;
        cells.push(...r.cells);
        if (r.status === 'incomplete') status = 'incomplete';
        else if (r.status === 'wrong' && status !== 'incomplete') status = 'wrong';
      });
      return { status, cells };
    }
    if (spec.kind === 'matrix') {
      const exp = flatten(spec.value);
      const got = raw.map(parseFrac);
      if (got.some((g) => g === null)) return { status: 'incomplete', cells: got.map((g) => g !== null) };
      if (spec.proportional) {
        // vale cualquier múltiplo no nulo del vector esperado (p. ej. ecuación de un plano)
        const i0 = exp.findIndex((x) => !fzero(x));
        const k = fdiv(got[i0], exp[i0]);
        const ok = !fzero(k) && got.every((g, i) => feq(g, fmul(k, exp[i])));
        return { status: ok ? 'ok' : 'wrong', cells: got.map(() => ok) };
      }
      const cells = got.map((g, i) => feq(g, exp[i]));
      return { status: cells.every(Boolean) ? 'ok' : 'wrong', cells };
    }
    if (spec.kind === 'number') {
      const g = parseFrac(raw[0]);
      if (g === null) return { status: 'incomplete', cells: [false] };
      const ok = feq(g, spec.value);
      return { status: ok ? 'ok' : 'wrong', cells: [ok] };
    }
    if (spec.kind === 'list') {
      // La coma puede ser separador («-1, 2») o coma decimal («0,5»): se prueban las dos lecturas.
      // Con «;» la coma es siempre decimal.
      const s = String(raw[0]);
      const lecturas = (s.includes(';') ? [/[;\s]+/] : [/[,\s]+/, /\s+/])
        .map((sep) => s.split(sep).filter(Boolean).map(parseFrac))
        .filter((got) => got.length && got.every((g) => g !== null));
      if (!lecturas.length) return { status: 'incomplete', cells: [false] };
      const uniq = (xs) => xs.filter((x, i) => xs.findIndex((y) => feq(x, y)) === i);
      const b = uniq(spec.value);
      const ok = lecturas.some((got) => { const a = uniq(got); return a.length === b.length && a.every((x) => b.some((y) => feq(x, y))); });
      return { status: ok ? 'ok' : 'wrong', cells: [ok] };
    }
    if (spec.kind === 'expr') {
      const g = parseExpr(raw[0]);
      if (g === null) return { status: 'incomplete', cells: [false] };
      const ok = exprClose(g, spec.value);
      return { status: ok ? 'ok' : 'wrong', cells: [ok] };
    }
    if (spec.kind === 'choice') {
      if (raw[0] === '' || raw[0] === undefined) return { status: 'incomplete', cells: [false] };
      const ok = String(raw[0]) === String(spec.value);
      return { status: ok ? 'ok' : 'wrong', cells: [ok] };
    }
    throw new Error('tipo de respuesta desconocido: ' + spec.kind);
  }
  /** Textos que dan la respuesta correcta (para "Ver solución" y tests). */
  function answerStrings(spec) {
    if (spec.kind === 'matrixset' || spec.kind === 'multi') return [].concat(...asParts(spec).map(answerStrings));
    if (spec.kind === 'matrix') return flatten(spec.value).map(fstr);
    if (spec.kind === 'number') return [fstr(spec.value)];
    if (spec.kind === 'choice') return [String(spec.value)];
    if (spec.kind === 'expr') return [spec.show || String(Math.round(spec.value * 1e4) / 1e4)];
    return [spec.value.map(fstr).join('; ')];
  }

  /* ---------- Interfaz ---------- */
  const modules = {};
  function define(mod) {
    // Un "error típico" que coincide con la respuesta correcta (caso degenerado) no es un error: se descarta.
    const gen = mod.generate;
    mod.generate = (p) => {
      const ch = gen(p);
      if (ch.mistakes) {
        ch.mistakes = ch.mistakes.filter((m) =>
          checkAnswer(ch.answer, answerStrings(Object.assign({}, ch.answer, { value: m.value, show: undefined }))).status !== 'ok');
      }
      return ch;
    };
    modules[mod.id] = mod;
  }

  function typeset(el, str) {
    const k = root.katex;
    if (!k || !k.renderToString) { el.textContent = str; return; }
    el.innerHTML = str.replace(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g, (_, dsp, inl) =>
      k.renderToString(dsp !== undefined ? dsp : inl, { displayMode: dsp !== undefined, throwOnError: false }));
  }

  function loadStats(key) {
    try { return Object.assign({ streak: 0, solved: 0, best: 0 }, JSON.parse(localStorage.getItem(key))); }
    catch (e) { return { streak: 0, solved: 0, best: 0 }; }
  }
  function saveStats(key, s) {
    try { localStorage.setItem(key, JSON.stringify(s)); } catch (e) { /* sin almacenamiento */ }
  }

  /** Constructor de casillas de respuesta independiente del «gym» (lo usa el examen). */
  function makeAnswerUI(spec, opts) {
    opts = opts || {};
    const box = document.createElement('div');
    box.className = 'gym-answer';
    const cells = [];          // {get, set, mark(cls), els}
    const mkInput = (aria, cls) => {
      const inp = document.createElement('input');
      inp.type = 'text'; inp.autocomplete = 'off'; inp.spellcheck = false;
      inp.className = cls; inp.setAttribute('aria-label', aria);
      inp.addEventListener('input', () => { inp.classList.remove('ok', 'bad'); if (opts.onChange) opts.onChange(); });
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && opts.onEnter) { e.preventDefault(); opts.onEnter(); } });
      cells.push({ get: () => inp.value, set: (v) => { inp.value = v; }, mark: (c) => { inp.classList.remove('ok', 'bad'); if (c) inp.classList.add(c); }, dis: (d) => { inp.disabled = d; } });
      return inp;
    };
    const matrixGrid = (value, colLabels, tag) => {
      const g = document.createElement('div');
      g.className = 'gym-matrix';
      g.style.setProperty('--cols', cols(value));
      if (colLabels) { g.classList.add('has-labels'); colLabels.forEach((t) => { const c = document.createElement('span'); c.className = 'gym-collabel'; typeset(c, i$(t)); g.appendChild(c); }); }
      value.forEach((r, i) => r.forEach((_, j) => g.appendChild(mkInput((tag || '') + 'fila ' + (i + 1) + ', columna ' + (j + 1), 'gym-cell'))));
      return g;
    };
    const addRow = (label, node) => {
      const row = document.createElement('div');
      row.className = 'gym-answer-row';
      if (label) { const l = document.createElement('span'); l.className = 'gym-label'; typeset(l, i$(label)); row.appendChild(l); }
      row.appendChild(node);
      box.appendChild(row);
    };
    const partNode = (sp, tag) => {
      if (sp.kind === 'choice') {
        const g = document.createElement('div');
        g.className = 'gym-choices';
        const name = 'mdx-' + Math.random().toString(36).slice(2, 10);
        const radios = [];
        sp.options.forEach((t, i) => {
          const lab = document.createElement('label');
          lab.className = 'gym-choice';
          lab.innerHTML = '<input type="radio"><span></span>';
          const r = lab.querySelector('input');
          r.name = name; r.value = String(i);
          typeset(lab.querySelector('span'), t);
          r.addEventListener('change', () => { g.querySelectorAll('label').forEach((l) => l.classList.remove('ok', 'bad')); if (opts.onChange) opts.onChange(); });
          radios.push(r); g.appendChild(lab);
        });
        cells.push({
          get: () => (radios.find((r) => r.checked) || { value: '' }).value,
          set: (v) => radios.forEach((r) => { r.checked = r.value === String(v); }),
          mark: (c) => { g.querySelectorAll('label').forEach((l) => l.classList.remove('ok', 'bad')); const r = radios.find((x) => x.checked); if (r && c) r.closest('label').classList.add(c); },
          dis: (d) => radios.forEach((r) => { r.disabled = d; }),
        });
        return g;
      }
      if (sp.kind === 'matrix') return matrixGrid(sp.value, sp.colLabels, tag);
      const wide = sp.kind === 'list' || sp.kind === 'expr';
      const inp = mkInput(sp.kind === 'list' ? 'valores separados por punto y coma' : 'respuesta', wide ? 'gym-line' : 'gym-cell gym-single');
      if (sp.kind === 'list') inp.placeholder = 'ej.: -1; 2,5';
      if (sp.kind === 'expr') {
        inp.placeholder = 'ej.: 1/2+ln(2)';
        // Muestra cómo se ha leído la expresión («1/2pi» es π/2, no 1/(2π)).
        const w = document.createElement('span');
        w.className = 'gym-expr';
        const prev = document.createElement('span');
        prev.className = 'gym-expr-preview';
        prev.setAttribute('aria-live', 'polite');
        inp.addEventListener('input', () => {
          const v = parseExpr(inp.value);
          prev.textContent = !inp.value.trim() ? '' : v === null ? 'no se entiende la expresión' : 'se lee como ≈ ' + String(Math.round(v * 1e4) / 1e4).replace('.', ',');
        });
        w.appendChild(inp); w.appendChild(prev);
        return w;
      }
      return inp;
    };
    if (spec.kind === 'matrixset' || spec.kind === 'multi') asParts(spec).forEach((pt) => addRow(pt.label, partNode(pt, (pt.label || '') + ': ')));
    else addRow(spec.label, partNode(spec));
    return {
      root: box,
      raw: () => cells.map((c) => c.get()),
      fill: (vals) => cells.forEach((c, i) => c.set(vals[i] === undefined ? '' : vals[i])),
      /** res = resultado de checkAnswer; pinta cada casilla. */
      mark: (res) => cells.forEach((c, i) => c.mark(res.cells[i] ? 'ok' : (res.status === 'incomplete' && !res.cells[i]) ? 'bad' : 'bad')),
      clearMarks: () => cells.forEach((c) => c.mark(null)),
      disable: (d) => cells.forEach((c) => c.dis(d)),
      count: () => cells.length,
    };
  }

  /** Sustituye cada parámetro "rand" (Aleatorio) por una de sus opciones reales. */
  function resolveParams(mod, params) {
    const out = {};
    (mod.params || []).forEach((p) => {
      let v = params[p.key];
      if (v === 'rand') v = rnd.pick(p.options)[0];
      out[p.key] = v;
    });
    return out;
  }
  const HELP_TITLES = ['Recordatorio', 'Método'];

  function mount(el, mod) {
    const key = 'mdgym:' + mod.id;
    const stats = loadStats(key);
    const st = { ch: null, done: false, used: false, helped: false, phase: 0 };

    el.classList.add('gym');
    el.innerHTML =
      '<div class="gym-head"><h3 class="gym-title"></h3>' +
      '<div class="gym-stats"><span>Racha <b data-s="streak">0</b></span><span>Resueltos <b data-s="solved">0</b></span><span>Mejor <b data-s="best">0</b></span></div></div>' +
      '<div class="gym-params"></div>' +
      '<div class="gym-prompt"></div>' +
      '<div class="gym-answer"></div>' +
      '<div class="gym-feedback" role="status" aria-live="polite"></div>' +
      '<div class="gym-actions">' +
      '<button type="button" class="gym-btn gym-check">Comprobar</button>' +
      '<button type="button" class="gym-btn gym-help-btn">Ayuda</button>' +
      '<button type="button" class="gym-btn gym-sol">Ver solución</button>' +
      '<button type="button" class="gym-btn gym-res">Ver resolución</button>' +
      '<button type="button" class="gym-btn gym-plot-btn" hidden>Ver gráfica</button>' +
      '<button type="button" class="gym-btn gym-new">Nuevo reto</button>' +
      '<button type="button" class="gym-btn gym-next" hidden>Siguiente ▶</button>' +
      '<button type="button" class="gym-btn gym-class-btn">Modo clase</button>' +
      '</div>' +
      '<div class="gym-help" hidden></div>' +
      '<div class="gym-steps" hidden></div>' +
      '<div class="gym-plot" hidden></div>';

    const q = (s) => el.querySelector(s);
    q('.gym-title').textContent = mod.title;

    const params = {};
    (mod.params || []).forEach((p) => {
      params[p.key] = p.noRand ? (p.default !== undefined ? p.default : p.options[0][0]) : 'rand';
      const lab = document.createElement('label');
      lab.className = 'gym-param';
      lab.innerHTML = '<span></span><select></select>';
      lab.firstChild.textContent = p.label;
      const sel = lab.querySelector('select');
      (p.noRand ? p.options : [['rand', 'Aleatorio']].concat(p.options)).forEach(([v, t]) => {
        const o = document.createElement('option');
        o.value = v; o.textContent = t;
        if (v === params[p.key]) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener('change', () => { params[p.key] = sel.value; newChallenge(); });
      q('.gym-params').appendChild(lab);
    });
    if (!(mod.params || []).length) q('.gym-params').hidden = true;

    function paintStats() {
      Object.keys(stats).forEach((k) => { const b = q('[data-s="' + k + '"]'); if (b) b.textContent = stats[k]; });
      saveStats(key, stats);
    }
    const inputs = () => Array.from(q('.gym-answer').querySelectorAll('input'));
    const rawValues = () => (st.ch.answer.kind === 'choice'
      ? [(inputs().find((i) => i.checked) || { value: '' }).value]
      : inputs().map((i) => i.value));
    const mark = (inp, cls) => {
      const t = inp.type === 'radio' ? inp.closest('label') : inp;
      t.classList.remove('ok', 'bad');
      if (cls) t.classList.add(cls);
    };
    const setFeedback = (msg, cls) => { const f = q('.gym-feedback'); f.textContent = msg; f.className = 'gym-feedback ' + (cls || ''); };

    function buildAnswer(spec) {
      const box = q('.gym-answer');
      box.innerHTML = '';
      const mk = (aria, cls) => {
        const inp = document.createElement('input');
        inp.type = 'text'; inp.autocomplete = 'off'; inp.spellcheck = false;
        inp.className = cls; inp.setAttribute('aria-label', aria);
        inp.addEventListener('input', () => inp.classList.remove('ok', 'bad'));
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); check(); } });
        return inp;
      };
      const matrixGrid = (value, colLabels, tag) => {
        const g = document.createElement('div');
        g.className = 'gym-matrix';
        g.style.setProperty('--cols', cols(value));
        if (colLabels) g.classList.add('has-labels');
        if (colLabels) colLabels.forEach((t) => {
          const c = document.createElement('span');
          c.className = 'gym-collabel';
          typeset(c, i$(t));
          g.appendChild(c);
        });
        value.forEach((r, i) => r.forEach((_, j) => g.appendChild(mk((tag || '') + 'fila ' + (i + 1) + ', columna ' + (j + 1), 'gym-cell'))));
        return g;
      };
      const addRow = (label, node) => {
        const row = document.createElement('div');
        row.className = 'gym-answer-row';
        if (label) {
          const l = document.createElement('span');
          l.className = 'gym-label';
          typeset(l, i$(label));
          row.appendChild(l);
        }
        row.appendChild(node);
        box.appendChild(row);
      };
      const partNode = (sp, tag) => {
        if (sp.kind === 'choice') {
          const g = document.createElement('div');
          g.className = 'gym-choices';
          const name = 'gym-' + mod.id + '-' + Math.random().toString(36).slice(2, 8);
          sp.options.forEach((t, i) => {
            const lab = document.createElement('label');
            lab.className = 'gym-choice';
            lab.innerHTML = '<input type="radio"><span></span>';
            const r = lab.querySelector('input');
            r.name = name; r.value = String(i);
            typeset(lab.querySelector('span'), t);
            r.addEventListener('change', () => g.querySelectorAll('label').forEach((l) => l.classList.remove('ok', 'bad')));
            g.appendChild(lab);
          });
          return g;
        }
        if (sp.kind === 'matrix') return matrixGrid(sp.value, sp.colLabels, tag);
        const inp = mk(sp.kind === 'list' ? 'valores separados por punto y coma' : 'respuesta', sp.kind === 'list' ? 'gym-line' : 'gym-cell gym-single');
        if (sp.kind === 'list') inp.placeholder = 'ej.: -1; 2,5';
        return inp;
      };
      if (spec.kind === 'matrixset' || spec.kind === 'multi') asParts(spec).forEach((pt) => addRow(pt.label, partNode(pt, (pt.label || '') + ': ')));
      else addRow(spec.label, partNode(spec));
    }

    /* --- Ayuda en dos fases: sólo teoría, no rompe ni suma racha --- */
    const helpList = () => {
      const h = (st.ch && st.ch.help) || mod.help || (mod.tip ? [mod.tip] : []);
      return typeof h === 'function' ? h(st.params) : h;
    };
    function resetHelp() {
      st.phase = 0; st.helped = false;
      q('.gym-help').hidden = true; q('.gym-help').innerHTML = '';
      const list = helpList();
      const b = q('.gym-help-btn');
      b.hidden = !list.length; b.textContent = 'Ayuda';
    }
    function helpStep() {
      const list = helpList();
      const box = q('.gym-help');
      if (st.phase >= list.length) {          // tercera pulsación: ocultar (la ayuda ya cuenta como usada)
        st.phase = 0; box.hidden = true; box.innerHTML = '';
        q('.gym-help-btn').textContent = 'Ayuda';
        return;
      }
      if (!st.done) st.helped = true;
      st.phase++;
      box.innerHTML = '';
      list.slice(0, st.phase).forEach((h, i) => {
        const d = document.createElement('div');
        d.className = 'gym-help-phase';
        const t = document.createElement('div');
        t.className = 'gym-help-title';
        t.textContent = HELP_TITLES[i] || 'Ayuda';
        const body = document.createElement('div');
        body.className = 'gym-help-body';
        typeset(body, h);
        d.appendChild(t); d.appendChild(body);
        box.appendChild(d);
      });
      box.hidden = false;
      q('.gym-help-btn').textContent = st.phase < list.length ? 'Más ayuda' : 'Ocultar ayuda';
    }

    function newChallenge() {
      st.params = resolveParams(mod, params);
      st.ch = mod.generate(Object.assign({}, st.params));
      st.done = false; st.used = false;
      typeset(q('.gym-prompt'), st.ch.prompt);
      buildAnswer(st.ch.answer);
      setFeedback('');
      resetHelp();
      q('.gym-steps').hidden = true;
      q('.gym-steps').innerHTML = '';
      q('.gym-next').hidden = true;
      q('.gym-check').disabled = false;
      q('.gym-plot').hidden = true;
      q('.gym-plot').innerHTML = '';
      q('.gym-plot-btn').hidden = !(st.ch.plot && root.MDPlot);
      q('.gym-plot-btn').textContent = 'Ver gráfica';
      const first = inputs()[0];
      if (first && !el.classList.contains('gym-quiet')) first.focus({ preventScroll: true });
    }

    function breakStreak() { if (stats.streak) { stats.streak = 0; paintStats(); } }

    /** Busca si la respuesta coincide con un error típico declarado por el reto. */
    function findMistake(spec, raw) {
      const list = st.ch.mistakes || [];
      for (let i = 0; i < list.length; i++) {
        const m = list[i];
        if (checkAnswer(Object.assign({}, spec, { value: m.value }), raw).status === 'ok') return m;
      }
      return null;
    }

    function check() {
      if (st.done) return;
      const isChoice = st.ch.answer.kind === 'choice';
      const raw = rawValues();
      const res = checkAnswer(st.ch.answer, raw);
      inputs().forEach((inp, i) => {
        mark(inp, null);
        if (isChoice) { if (inp.checked && res.status !== 'incomplete') mark(inp, res.cells[0] ? 'ok' : 'bad'); return; }
        if (res.status === 'incomplete') { if (!res.cells[i] || res.cells.length === 1) mark(inp, 'bad'); }
        else mark(inp, res.cells[i] ? 'ok' : 'bad');
      });
      if (res.status === 'incomplete') { setFeedback(isChoice ? 'Elige una opción.' : 'Rellena todas las casillas con enteros, fracciones (a/b) o decimales.', 'warn'); return; }
      if (res.status === 'wrong') {
        const m = (st.ch.answer.kind === 'matrixset' || st.ch.answer.kind === 'multi') ? null : findMistake(st.ch.answer, raw);
        let msg = isChoice ? 'Esa opción no es la correcta.' : 'Hay casillas mal. Revisa las marcadas en rojo.';
        if (st.ch.answer.kind === 'list') {
          const exp = st.ch.answer.value;
          const got = String(raw[0]).split(/[;,\s]+/).filter(Boolean).map(parseFrac);
          const extra = got.some((g) => !exp.some((e) => feq(e, g)));
          const missing = exp.some((e) => !got.some((g) => feq(e, g)));
          msg = extra ? 'Alguno de los valores no cumple la condición. Sustitúyelo para comprobarlo.'
            : missing ? 'Te faltan valores: hay más de una solución.' : msg;
        }
        setFeedback(m ? 'Ojo: ' + m.msg : msg, 'bad');
        breakStreak();
        return;
      }
      st.done = true;
      const assisted = st.used || st.helped;
      setFeedback(assisted ? 'Correcto (con ayuda: no suma a la racha).' : '¡Correcto!', 'ok');
      if (!assisted) {
        stats.streak++; stats.solved++;
        stats.best = Math.max(stats.best, stats.streak);
        paintStats();
      }
      q('.gym-next').hidden = false;
      q('.gym-check').disabled = true;
      q('.gym-next').focus({ preventScroll: true });
    }

    function markUsed() { if (!st.done && !st.used) { st.used = true; breakStreak(); } }

    function showSolution() {
      markUsed();
      const vals = answerStrings(st.ch.answer);
      inputs().forEach((inp, i) => {
        if (inp.type === 'radio') { inp.checked = inp.value === vals[0]; mark(inp, inp.checked ? 'ok' : null); }
        else { inp.value = vals[i]; mark(inp, 'ok'); }
      });
      st.done = true;
      setFeedback('Solución mostrada. Esta no suma a la racha.', 'warn');
      q('.gym-next').hidden = false;
      q('.gym-check').disabled = true;
    }

    function toggleSteps() {
      const box = q('.gym-steps');
      if (!box.hidden) { box.hidden = true; return; }
      markUsed();
      box.innerHTML = '';
      const h = document.createElement('div');
      h.className = 'gym-steps-title';
      h.textContent = 'Resolución paso a paso';
      box.appendChild(h);
      st.ch.steps.forEach((s, n) => {
        const d = document.createElement('div');
        d.className = 'gym-step';
        const num = document.createElement('span');
        num.className = 'gym-step-n';
        num.textContent = n + 1;
        const body = document.createElement('div');
        body.className = 'gym-step-body';
        typeset(body, s);
        d.appendChild(num); d.appendChild(body);
        box.appendChild(d);
      });
      box.hidden = false;
    }

    // La gráfica cuenta como ayuda: no rompe la racha, pero ese reto no la suma.
    function togglePlot() {
      const box = q('.gym-plot');
      if (!box.hidden) { box.hidden = true; q('.gym-plot-btn').textContent = 'Ver gráfica'; return; }
      if (!st.done) st.helped = true;
      box.hidden = false;
      q('.gym-plot-btn').textContent = 'Ocultar gráfica';
      if (!box.firstChild) root.MDPlot.draw(box, st.ch.plot);
    }

    function setClass(on) {
      el.classList.toggle('gym-class', on);
      document.documentElement.classList.toggle('gym-lock', on);
      q('.gym-class-btn').textContent = on ? 'Salir (Esc)' : 'Modo clase';
    }

    q('.gym-check').addEventListener('click', check);
    q('.gym-help-btn').addEventListener('click', helpStep);
    q('.gym-sol').addEventListener('click', showSolution);
    q('.gym-res').addEventListener('click', toggleSteps);
    q('.gym-new').addEventListener('click', newChallenge);
    q('.gym-plot-btn').addEventListener('click', togglePlot);
    q('.gym-next').addEventListener('click', newChallenge);
    q('.gym-class-btn').addEventListener('click', () => setClass(!el.classList.contains('gym-class')));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && el.classList.contains('gym-class')) setClass(false); });

    paintStats();
    el.classList.add('gym-quiet');   // no robar el foco al cargar la página
    newChallenge();
    el.classList.remove('gym-quiet');
  }

  function mountAll(scope) {
    (scope || document).querySelectorAll('[data-gym]').forEach((el) => {
      const mod = modules[el.getAttribute('data-gym')];
      if (mod) mount(el, mod);
      else el.textContent = 'Módulo desconocido: ' + el.getAttribute('data-gym');
    });
  }

  const api = {
    rnd, gcd, F, fadd, fsub, fmul, fdiv, fneg, feq, fzero, fstr, ftex, ftexp, parseFrac,
    M, mz, mI, rows, cols, mcopy, mT, madd, msub, mscale, meq, mmul, mpow, minorM, det, cofactors, inverse, rankOf,
    mtex, mtexStr, d$, i$, flatten, checkAnswer, answerStrings,
    modules, define, mount, mountAll, resolveParams, setRandom, seeded, parseExpr, makeAnswerUI, typeset,
  };
  root.MDGym = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
