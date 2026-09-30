/* MD Matemáticas — motor de ejercicios interactivos ("gym").
 * Genera y corrige ejercicios en el navegador, sin backend.
 * Un módulo de tema (p. ej. matrices.js) registra generadores con MDGym.define().
 */
(function (root) {
  'use strict';

  /* ---------- Aleatorio ---------- */
  const rnd = {
    int: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),
    pick: (arr) => arr[Math.floor(Math.random() * arr.length)],
    shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  };

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

  /* ---------- Corrección ---------- */
  const flatten = (A) => [].concat(...A);

  /** spec: {kind:'matrix'|'number'|'list', value}. raw: textos de las casillas. */
  function checkAnswer(spec, raw) {
    if (spec.kind === 'matrix') {
      const exp = flatten(spec.value);
      const got = raw.map(parseFrac);
      if (got.some((g) => g === null)) return { status: 'incomplete', cells: got.map((g) => g !== null) };
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
      const toks = String(raw[0]).split(/[;,\s]+/).filter(Boolean);
      const got = toks.map(parseFrac);
      if (!got.length || got.some((g) => g === null)) return { status: 'incomplete', cells: [false] };
      const uniq = (xs) => xs.filter((x, i) => xs.findIndex((y) => feq(x, y)) === i);
      const a = uniq(got), b = uniq(spec.value);
      const ok = a.length === b.length && a.every((x) => b.some((y) => feq(x, y)));
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
    if (spec.kind === 'matrix') return flatten(spec.value).map(fstr);
    if (spec.kind === 'number') return [fstr(spec.value)];
    if (spec.kind === 'choice') return [String(spec.value)];
    return [spec.value.map(fstr).join(', ')];
  }

  /* ---------- Interfaz ---------- */
  const modules = {};
  function define(mod) { modules[mod.id] = mod; }

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

  function mount(el, mod) {
    const key = 'mdgym:' + mod.id;
    const stats = loadStats(key);
    const st = { ch: null, done: false, used: false };

    el.classList.add('gym');
    el.innerHTML =
      '<div class="gym-head"><h3 class="gym-title"></h3>' +
      '<div class="gym-stats"><span>Racha <b data-s="streak">0</b></span><span>Resueltos <b data-s="solved">0</b></span><span>Mejor <b data-s="best">0</b></span></div></div>' +
      '<div class="gym-params"></div>' +
      (mod.tip ? '<p class="gym-tip"></p>' : '') +
      '<div class="gym-prompt"></div>' +
      '<div class="gym-answer"></div>' +
      '<div class="gym-feedback" role="status" aria-live="polite"></div>' +
      '<div class="gym-actions">' +
      '<button type="button" class="gym-btn gym-check">Comprobar</button>' +
      '<button type="button" class="gym-btn gym-sol">Ver solución</button>' +
      '<button type="button" class="gym-btn gym-res">Ver resolución</button>' +
      '<button type="button" class="gym-btn gym-new">Nuevo reto</button>' +
      '<button type="button" class="gym-btn gym-next" hidden>Siguiente ▶</button>' +
      '<button type="button" class="gym-btn gym-class-btn">Modo clase</button>' +
      '</div>' +
      '<div class="gym-steps" hidden></div>';

    const q = (s) => el.querySelector(s);
    q('.gym-title').textContent = mod.title;
    if (mod.tip) typeset(q('.gym-tip'), mod.tip);

    const params = {};
    (mod.params || []).forEach((p) => {
      params[p.key] = p.default !== undefined ? p.default : p.options[0][0];
      const lab = document.createElement('label');
      lab.className = 'gym-param';
      lab.innerHTML = '<span></span><select></select>';
      lab.firstChild.textContent = p.label;
      const sel = lab.querySelector('select');
      p.options.forEach(([v, t]) => {
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
      const row = document.createElement('div');
      row.className = 'gym-answer-row';
      if (spec.label) {
        const l = document.createElement('span');
        l.className = 'gym-label';
        typeset(l, i$(spec.label));
        row.appendChild(l);
      }
      const mk = (aria, cls) => {
        const inp = document.createElement('input');
        inp.type = 'text'; inp.autocomplete = 'off'; inp.spellcheck = false;
        inp.className = cls; inp.setAttribute('aria-label', aria);
        inp.addEventListener('input', () => inp.classList.remove('ok', 'bad'));
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); check(); } });
        return inp;
      };
      if (spec.kind === 'choice') {
        const g = document.createElement('div');
        g.className = 'gym-choices';
        const name = 'gym-' + mod.id + '-' + Math.random().toString(36).slice(2, 8);
        spec.options.forEach((t, i) => {
          const lab = document.createElement('label');
          lab.className = 'gym-choice';
          lab.innerHTML = '<input type="radio"><span></span>';
          const r = lab.querySelector('input');
          r.name = name; r.value = String(i);
          typeset(lab.querySelector('span'), t);
          r.addEventListener('change', () => g.querySelectorAll('label').forEach((l) => l.classList.remove('ok', 'bad')));
          g.appendChild(lab);
        });
        row.appendChild(g);
      } else if (spec.kind === 'matrix') {
        const g = document.createElement('div');
        g.className = 'gym-matrix';
        g.style.setProperty('--cols', cols(spec.value));
        spec.value.forEach((r, i) => r.forEach((_, j) => g.appendChild(mk('fila ' + (i + 1) + ', columna ' + (j + 1), 'gym-cell'))));
        row.appendChild(g);
      } else {
        const inp = mk(spec.kind === 'list' ? 'valores separados por comas' : 'respuesta', spec.kind === 'list' ? 'gym-line' : 'gym-cell gym-single');
        if (spec.kind === 'list') inp.placeholder = 'ej.: -1, 2';
        row.appendChild(inp);
      }
      box.appendChild(row);
    }

    function newChallenge() {
      st.ch = mod.generate(Object.assign({}, params));
      st.done = false; st.used = false;
      typeset(q('.gym-prompt'), st.ch.prompt);
      buildAnswer(st.ch.answer);
      setFeedback('');
      q('.gym-steps').hidden = true;
      q('.gym-steps').innerHTML = '';
      q('.gym-next').hidden = true;
      q('.gym-check').disabled = false;
      const first = inputs()[0];
      if (first && !el.classList.contains('gym-quiet')) first.focus({ preventScroll: true });
    }

    function breakStreak() { if (stats.streak) { stats.streak = 0; paintStats(); } }

    function check() {
      if (st.done) return;
      const isChoice = st.ch.answer.kind === 'choice';
      const res = checkAnswer(st.ch.answer, rawValues());
      inputs().forEach((inp, i) => {
        mark(inp, null);
        if (isChoice) { if (inp.checked && res.status !== 'incomplete') mark(inp, res.cells[0] ? 'ok' : 'bad'); return; }
        if (res.status === 'incomplete') { if (!res.cells[i] || res.cells.length === 1) mark(inp, 'bad'); }
        else mark(inp, res.cells[i] ? 'ok' : 'bad');
      });
      if (res.status === 'incomplete') { setFeedback(isChoice ? 'Elige una opción.' : 'Rellena todas las casillas con enteros, fracciones (a/b) o decimales.', 'warn'); return; }
      if (res.status === 'wrong') { setFeedback(isChoice ? 'Esa opción no es la correcta.' : 'Hay casillas mal. Revisa las marcadas en rojo.', 'bad'); breakStreak(); return; }
      st.done = true;
      setFeedback(st.used ? 'Correcto (con ayuda: no suma a la racha).' : '¡Correcto!', 'ok');
      if (!st.used) {
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

    function setClass(on) {
      el.classList.toggle('gym-class', on);
      document.documentElement.classList.toggle('gym-lock', on);
      q('.gym-class-btn').textContent = on ? 'Salir (Esc)' : 'Modo clase';
    }

    q('.gym-check').addEventListener('click', check);
    q('.gym-sol').addEventListener('click', showSolution);
    q('.gym-res').addEventListener('click', toggleSteps);
    q('.gym-new').addEventListener('click', newChallenge);
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
    modules, define, mount, mountAll,
  };
  root.MDGym = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
