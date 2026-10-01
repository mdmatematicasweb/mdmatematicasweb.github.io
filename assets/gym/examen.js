/* Simulacro de examen tipo PAU (Matemáticas II, Andalucía): generación por tipos de ejercicio,
 * cronómetro y corrección automática. Requiere gym.js. Los generadores (tipos-*.js) se registran con MDExam.implementar().
 */
(function (root) {
  'use strict';
  const G = root.MDGym;

  /* ---------- Catálogo de tipos (el orden es estable: fija el código del examen) ---------- */
  const AREAS = [['algebra', 'Álgebra'], ['geometria', 'Geometría'], ['analisis', 'Análisis'], ['probabilidad', 'Probabilidad y estadística']];
  const CATALOGO = [
    { id: 'sistema-param', nombre: 'Discusión de un sistema con parámetro', area: 'algebra', tema: 3 },
    { id: 'sistema-plant', nombre: 'Problema de planteamiento (sistema de ecuaciones)', area: 'algebra', tema: 3 },
    { id: 'sistema-sci', nombre: 'Sistema compatible indeterminado u homogéneo', area: 'algebra', tema: 3 },
    { id: 'ec-matricial', nombre: 'Ecuación matricial e inversa con parámetro', area: 'algebra', tema: 1 },
    { id: 'matriz-pot-inv', nombre: 'Potencias e inversa de una matriz', area: 'algebra', tema: 1 },
    { id: 'rango-inv-param', nombre: 'Rango según un parámetro', area: 'algebra', tema: 1 },
    { id: 'det-prop', nombre: 'Determinantes y sus propiedades', area: 'algebra', tema: 2 },
    { id: 'rectas-posicion', nombre: 'Posición relativa de rectas', area: 'geometria', tema: 5 },
    { id: 'plano-recta', nombre: 'Plano y recta: ecuaciones y corte', area: 'geometria', tema: 5 },
    { id: 'distancias', nombre: 'Distancias', area: 'geometria', tema: 5 },
    { id: 'simetrico', nombre: 'Simétrico de un punto y distancia', area: 'geometria', tema: 5 },
    { id: 'angulos', nombre: 'Ángulos entre rectas y planos', area: 'geometria', tema: 5 },
    { id: 'areas-vol', nombre: 'Áreas, volúmenes y coplanarios', area: 'geometria', tema: 4 },
    { id: 'vectores', nombre: 'Vectores: producto escalar, ortogonalidad y módulo', area: 'geometria', tema: 4 },
    { id: 'limite-param', nombre: 'Límite con parámetros (L’Hôpital)', area: 'analisis', tema: 6 },
    { id: 'asintotas', nombre: 'Asíntotas de una función con parámetros', area: 'analisis', tema: 6 },
    { id: 'trozos', nombre: 'Continuidad y derivabilidad de una función a trozos', area: 'analisis', tema: 6 },
    { id: 'tangente-normal', nombre: 'Recta tangente y recta normal', area: 'analisis', tema: 7 },
    { id: 'monotonia', nombre: 'Monotonía y extremos relativos', area: 'analisis', tema: 8 },
    { id: 'inflexion', nombre: 'Curvatura y puntos de inflexión', area: 'analisis', tema: 8 },
    { id: 'extremos-abs', nombre: 'Extremos absolutos en un intervalo', area: 'analisis', tema: 8 },
    { id: 'optimizacion', nombre: 'Problema de optimización', area: 'analisis', tema: 8 },
    { id: 'primitiva', nombre: 'Primitiva que pasa por un punto e integral definida', area: 'analisis', tema: 9 },
    { id: 'integral-def', nombre: 'Integral definida (cambio de variable y partes)', area: 'analisis', tema: 9 },
    { id: 'area-curvas', nombre: 'Área entre dos curvas', area: 'analisis', tema: 9 },
    { id: 'prob-total-bayes', nombre: 'Probabilidad total y teorema de Bayes', area: 'probabilidad', tema: 10 },
    { id: 'prob-tablas', nombre: 'Probabilidad con tablas de contingencia', area: 'probabilidad', tema: 10 },
    { id: 'normal-prob', nombre: 'Distribución normal: probabilidades', area: 'probabilidad', tema: 11 },
    { id: 'normal-desconocido', nombre: 'Distribución normal: valor desconocido', area: 'probabilidad', tema: 11 },
  ];
  const tipos = {};
  CATALOGO.forEach((t) => { tipos[t.id] = t; });

  // Gráficas que se muestran en el resultado (nunca durante el examen): grafica(id, data => spec de MDPlot).
  const GRAFICAS = {};
  function grafica(id, fn) { GRAFICAS[id] = fn; }

  function implementar(def) {
    const t = tipos[def.id];
    if (!t) throw new Error('tipo desconocido: ' + def.id);
    t.generate = def.generate;
    t.listo = true;
  }

  /* ---------- Formatos ---------- */
  const OPT1 = 'Resuelve sólo uno de los siguientes ejercicios:';
  const FORMATOS = {
    2026: {
      nombre: 'PAU 2026 · 2 obligatorios + 2 bloques optativos',
      grupos: [
        { titulo: 'PARTE OBLIGATORIA', consigna: 'Resuelve los dos ejercicios siguientes:', n: 2, elegir: 2 },
        { titulo: 'BLOQUE CON OPTATIVIDAD 1', consigna: OPT1, n: 2, elegir: 1 },
        { titulo: 'BLOQUE CON OPTATIVIDAD 2', consigna: OPT1, n: 2, elegir: 1 },
      ],
      num: (gi, k) => (gi === 0 ? String(k + 1) : (gi + 2) + '.' + (k + 1)),
      instr: ['Este examen consta de seis ejercicios distribuidos en una parte con dos ejercicios obligatorios y una parte con dos bloques con optatividad de dos ejercicios cada uno.',
        'Se deben resolver los dos ejercicios obligatorios y solamente un ejercicio de cada uno de los dos bloques con optatividad.'],
    },
    2025: {
      nombre: 'PAU 2025 · 1 obligatorio + 3 bloques optativos',
      grupos: [
        { titulo: 'BLOQUE OBLIGATORIO', consigna: 'Resuelve el siguiente ejercicio:', n: 1, elegir: 1 },
        { titulo: 'BLOQUE CON OPTATIVIDAD 1', consigna: OPT1, n: 2, elegir: 1 },
        { titulo: 'BLOQUE CON OPTATIVIDAD 2', consigna: OPT1, n: 2, elegir: 1 },
        { titulo: 'BLOQUE CON OPTATIVIDAD 3', consigna: OPT1, n: 2, elegir: 1 },
      ],
      num: null,
      instr: ['Este examen consta de siete ejercicios distribuidos en un bloque con un ejercicio obligatorio y tres bloques con dos ejercicios optativos cada uno.',
        'Deberá resolver el ejercicio obligatorio y solamente un ejercicio de cada uno de los tres bloques con optatividad.'],
    },
    2024: {
      nombre: 'PEvAU 2024 · 4 bloques de 2 ejercicios',
      grupos: ['A', 'B', 'C', 'D'].map((l) => ({ titulo: 'BLOQUE ' + l, consigna: OPT1, n: 2, elegir: 1 })),
      num: null,
      instr: ['Este examen consta de 8 ejercicios distribuidos en 4 bloques de 2 ejercicios cada uno.',
        'Se realizará únicamente un ejercicio de cada bloque. En caso de responder a dos ejercicios de un bloque, sólo se corregirá el que aparezca físicamente en primer lugar.'],
    },
    clasico: {
      nombre: 'Clásico (2021–2023) · 8 ejercicios, se hacen 4',
      grupos: [
        { titulo: 'BLOQUE A', consigna: '', n: 4, elegir: 4 },
        { titulo: 'BLOQUE B', consigna: '', n: 4, elegir: 4 },
      ],
      elegirTotal: 4,
      num: null,
      instr: ['Este examen consta de 8 ejercicios distribuidos en 2 bloques (A y B) de 4 ejercicios cada uno.',
        'Se realizarán únicamente cuatro ejercicios, independientemente del bloque al que pertenezcan.'],
    },
  };
  const FMT_ORDEN = ['2026', '2025', '2024', 'clasico'];

  /* ---------- Utilidades ---------- */
  const PTS_EJ = 2.5;
  const fmtPts = (p) => String(p).replace('.', ',');
  const shuffleWith = (rng, arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nuevaSemilla = () => Math.random().toString(36).slice(2, 8).padEnd(6, '0');
  const maskDe = (ids) => ids.reduce((m, id) => m | (1 << CATALOGO.findIndex((t) => t.id === id)), 0) >>> 0;
  const idsDeMask = (m) => CATALOGO.filter((_, i) => (m >>> 0) & (1 << i)).map((t) => t.id);

  function codigoDe(cfg) { return [cfg.formato, cfg.semilla, maskDe(cfg.tipos).toString(16), cfg.duracion || 90].join('-'); }
  function parseCodigo(str) {
    const m = /^(2026|2025|2024|clasico)-([a-z0-9]{3,12})-([0-9a-f]{1,8})-(\d{1,3})$/i.exec(String(str || '').trim());
    if (!m) return null;
    return { formato: m[1], semilla: m[2].toLowerCase(), tipos: idsDeMask(parseInt(m[3], 16)), duracion: Number(m[4]) };
  }

  /* ---------- Generación del examen ---------- */
  function generarEjercicio(tipo, semilla, idx) {
    let ultimo;
    for (let intento = 0; intento < 8; intento++) {
      const prev = G.setRandom(G.seeded(semilla + '|ej|' + idx + '|' + intento));
      try {
        const ex = tipo.generate();
        const suma = ex.partes.reduce((s, p) => s + p.pts, 0);
        if (Math.abs(suma - PTS_EJ) > 1e-9) throw new Error(tipo.id + ': los apartados suman ' + suma);
        return ex;
      } catch (e) { ultimo = e; } finally { G.setRandom(prev); }
    }
    throw ultimo;
  }

  /** cfg = {formato, tipos:[ids], semilla, duracion} → examen reproducible. */
  function armarExamen(cfg) {
    const fmt = FORMATOS[cfg.formato];
    if (!fmt) throw new Error('formato desconocido');
    const listos = cfg.tipos.filter((id) => tipos[id] && tipos[id].listo);
    if (!listos.length) throw new Error('Elige al menos un tipo de ejercicio disponible.');
    const rng = G.seeded('tipos|' + cfg.semilla);
    let bolsa = shuffleWith(rng, listos);
    const robar = (usados) => {
      let cand = bolsa.filter((id) => !usados.has(id));
      if (!cand.length) { bolsa = shuffleWith(rng, listos); cand = bolsa.filter((id) => !usados.has(id)); }
      if (!cand.length) cand = bolsa;
      const id = cand[0];
      bolsa.splice(bolsa.indexOf(id), 1);
      return id;
    };
    let idx = 0, contador = 0;
    const grupos = fmt.grupos.map((g, gi) => {
      const usados = new Set();
      const ejercicios = [];
      for (let k = 0; k < g.n; k++) {
        const id = robar(usados);
        usados.add(id);
        const t = tipos[id];
        const ex = generarEjercicio(t, cfg.semilla, idx++);
        contador++;
        ejercicios.push({ num: fmt.num ? fmt.num(gi, k) : String(contador), grupo: gi, tipoId: id, tipoNombre: t.nombre, enunciado: ex.enunciado, partes: ex.partes, data: ex.data });
      }
      return { titulo: g.titulo, consigna: g.consigna, n: g.n, elegir: g.elegir, ejercicios };
    });
    return { cfg: Object.assign({}, cfg), codigo: codigoDe(cfg), nombreFormato: fmt.nombre, instr: fmt.instr, elegirTotal: fmt.elegirTotal || null, grupos };
  }

  /* ---------- Corrección ---------- */
  const todosEjercicios = (exam) => [].concat(...exam.grupos.map((g) => g.ejercicios));
  const hayRespuesta = (resp, num) => (resp[num] || []).some((p) => (p || []).some((v) => v !== '' && v !== undefined && v !== null));

  /** Ejercicios que puntúan: obligatorios + los elegidos (por omisión, los primeros respondidos). */
  function evaluados(exam, elegidos, resp) {
    const ev = new Set();
    const elegSet = new Set(elegidos || []);
    if (exam.elegirTotal) {
      const orden = todosEjercicios(exam);
      const pref = orden.filter((e) => elegSet.has(e.num));
      const resto = orden.filter((e) => !elegSet.has(e.num) && hayRespuesta(resp, e.num));
      const resto2 = orden.filter((e) => !elegSet.has(e.num) && !hayRespuesta(resp, e.num));
      pref.concat(resto, resto2).slice(0, exam.elegirTotal).forEach((e) => ev.add(e.num));
      return ev;
    }
    exam.grupos.forEach((g) => {
      if (g.elegir >= g.n) { g.ejercicios.forEach((e) => ev.add(e.num)); return; }
      const sel = g.ejercicios.filter((e) => elegSet.has(e.num));
      const conResp = g.ejercicios.filter((e) => !elegSet.has(e.num) && hayRespuesta(resp, e.num));
      sel.concat(conResp, g.ejercicios).filter((e, i, a) => a.indexOf(e) === i).slice(0, g.elegir).forEach((e) => ev.add(e.num));
    });
    return ev;
  }

  function corregir(exam, resp, elegidos) {
    const ev = evaluados(exam, elegidos, resp);
    let nota = 0, max = 0;
    const ejercicios = todosEjercicios(exam).map((e) => {
      const evaluado = ev.has(e.num);
      let puntos = 0;
      const partes = e.partes.map((p, pi) => {
        const raw = ((resp[e.num] || [])[pi]) || [];
        const res = G.checkAnswer(p.answer, raw.length ? raw : Array(cellsOf(p.answer)).fill(''));
        const ok = res.status === 'ok';
        if (ok) puntos += p.pts;
        return { pts: p.pts, ok, res, raw };
      });
      if (evaluado) { nota += puntos; max += PTS_EJ; }
      return { num: e.num, evaluado, puntos, partes };
    });
    return { nota, max, sobre10: max ? Math.round((nota / max) * 100) / 10 : 0, ejercicios };
  }

  function cellsOf(a) {
    if (a.kind === 'matrix') return a.value.length * a.value[0].length;
    if (a.kind === 'multi' || a.kind === 'matrixset') return a.parts.reduce((s, p) => s + cellsOf(p.kind ? p : Object.assign({ kind: 'matrix' }, p)), 0);
    return 1;
  }

  /** Texto legible (plano) de la respuesta correcta. */
  const limpiaTex = (t) => String(t || '').replace(/\\displaystyle|\\operatorname\{([^}]*)\}/g, '$1').replace(/\\[a-zA-Z]+/g, '').replace(/[{}$]/g, '');
  function textoSolucion(a) {
    if (a.kind === 'choice') return a.options[a.value].replace(/\$/g, '');
    if (a.kind === 'matrixset' || a.kind === 'multi') {
      return a.parts.map((p0) => { const p = p0.kind ? p0 : Object.assign({ kind: 'matrix' }, p0); return (p.label ? limpiaTex(p.label) + ' ' : '') + textoSolucion(p); }).join(' ; ');
    }
    if (a.kind === 'expr') return (a.show ? a.show + ' ≈ ' : '') + (Math.round(a.value * 1e4) / 1e4);
    if (a.kind === 'matrix') return a.value.map((r) => '(' + r.map((x) => G.fstr(x)).join(', ') + ')').join(' ; ');
    return G.answerStrings(a).join(', ');
  }

  /* ---------- Almacenamiento ---------- */
  const K_CURSO = 'mdexam:curso', K_HIST = 'mdexam:historial';
  const ls = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* ... */ } },
  };

  /* ---------- Interfaz ---------- */
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
  const mmss = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  const typ = (node, tex) => { G.typeset(node, tex); return node; };

  function montar(container) {
    let st = { vista: 'config', exam: null, resp: {}, elegidos: [], inicio: 0, timer: null, uis: {} };
    const cfgPrev = { formato: '2026', tipos: CATALOGO.filter((t) => t.listo).map((t) => t.id), duracion: 90 };

    const parar = () => { if (st.timer) { clearInterval(st.timer); st.timer = null; } };
    const limpiar = () => { parar(); container.innerHTML = ''; window.scrollTo(0, 0); };

    /* ===== Configuración ===== */
    function vistaConfig(precarga) {
      limpiar();
      st.vista = 'config';
      const cfg = Object.assign({}, cfgPrev, precarga || {});
      const w = el('div', 'mdx-config');
      w.appendChild(el('p', 'mdx-intro', 'Marca los <b>tipos de ejercicio</b> que ya has estudiado: sólo saldrán esos.'));

      const curso = ls.get(K_CURSO);
      if (curso && curso.codigo) {
        const pc = parseCodigo(curso.codigo);
        const dur = pc ? pc.duracion * 60000 : 0;
        const resta = curso.inicio + dur - Date.now();
        const b = el('div', 'mdx-banner');
        b.innerHTML = '<b>Tienes un examen en curso</b> (código <code>' + curso.codigo + '</code>, ' + (resta > 0 ? 'quedan ' + mmss(resta) : 'el tiempo ha terminado') + '). ';
        const bc = el('button', 'gym-btn gym-check', 'Continuar'); bc.type = 'button';
        bc.onclick = () => reanudar(curso);
        const bd = el('button', 'gym-btn', 'Descartar'); bd.type = 'button';
        bd.onclick = () => { ls.del(K_CURSO); vistaConfig(cfg); };
        b.appendChild(bc); b.appendChild(bd);
        w.appendChild(b);
      }

      // formato
      const f = el('fieldset', 'mdx-fs'); f.appendChild(el('legend', '', 'Formato'));
      FMT_ORDEN.forEach((k) => {
        const l = el('label', 'mdx-radio');
        const r = el('input'); r.type = 'radio'; r.name = 'mdx-fmt'; r.value = k; r.checked = cfg.formato === k;
        r.onchange = () => { cfg.formato = k; };
        l.appendChild(r); l.appendChild(el('span', '', FORMATOS[k].nombre));
        f.appendChild(l);
      });
      w.appendChild(f);

      // tipos por área
      const t = el('fieldset', 'mdx-fs'); t.appendChild(el('legend', '', 'Tipos de ejercicio'));
      const checks = {};
      AREAS.forEach(([ak, an]) => {
        const box = el('div', 'mdx-area');
        const h = el('div', 'mdx-area-h');
        h.appendChild(el('b', '', an));
        const all = el('button', 'mdx-mini', 'todos'); all.type = 'button';
        const none = el('button', 'mdx-mini', 'ninguno'); none.type = 'button';
        h.appendChild(all); h.appendChild(none);
        box.appendChild(h);
        const ids = CATALOGO.filter((x) => x.area === ak);
        ids.forEach((x) => {
          const l = el('label', 'mdx-check' + (x.listo ? '' : ' off'));
          const c = el('input'); c.type = 'checkbox'; c.disabled = !x.listo; c.checked = x.listo && cfg.tipos.includes(x.id);
          checks[x.id] = c;
          l.appendChild(c); l.appendChild(el('span', '', x.nombre + (x.listo ? '' : ' <em>(próximamente)</em>')));
          box.appendChild(l);
        });
        all.onclick = () => ids.forEach((x) => { if (x.listo) checks[x.id].checked = true; });
        none.onclick = () => ids.forEach((x) => { checks[x.id].checked = false; });
        t.appendChild(box);
      });
      w.appendChild(t);

      // duración y código
      const o = el('div', 'mdx-opts');
      const ld = el('label', 'mdx-dur', 'Duración (min) ');
      const dn = el('input'); dn.type = 'number'; dn.min = 10; dn.max = 180; dn.value = cfg.duracion; ld.appendChild(dn);
      o.appendChild(ld);
      const lc = el('label', 'mdx-cod', 'Código de examen (opcional) ');
      const cn = el('input'); cn.type = 'text'; cn.placeholder = 'ej.: 2026-k3j9ab-1f-90'; cn.value = (precarga && precarga.codigo) || '';
      lc.appendChild(cn);
      o.appendChild(lc);
      w.appendChild(o);

      const err = el('div', 'mdx-err');
      const go = el('button', 'gym-btn gym-check mdx-go', 'Generar examen'); go.type = 'button';
      go.onclick = () => {
        err.textContent = '';
        try {
          let c;
          if (cn.value.trim()) {
            c = parseCodigo(cn.value);
            if (!c) { err.textContent = 'El código no es válido.'; return; }
          } else {
            const sel = CATALOGO.filter((x) => x.listo && checks[x.id].checked).map((x) => x.id);
            if (!sel.length) { err.textContent = 'Marca al menos un tipo de ejercicio.'; return; }
            c = { formato: cfg.formato, tipos: sel, semilla: nuevaSemilla(), duracion: Math.min(180, Math.max(10, Number(dn.value) || 90)) };
            cfgPrev.formato = c.formato; cfgPrev.tipos = sel; cfgPrev.duracion = c.duracion;
          }
          empezar(c);
        } catch (e) { err.textContent = e.message; }
      };
      w.appendChild(go);
      w.appendChild(err);

      const hist = ls.get(K_HIST) || [];
      if (hist.length) {
        const hb = el('div', 'mdx-hist'); hb.appendChild(el('h4', '', 'Últimos exámenes'));
        const ul = el('ul');
        hist.slice(0, 6).forEach((h) => ul.appendChild(el('li', '', '<b>' + String(h.nota).replace('.', ',') + '</b>/10 · ' + h.fecha + ' · <code>' + h.codigo + '</code>')));
        hb.appendChild(ul); w.appendChild(hb);
      }
      container.appendChild(w);
    }

    /* ===== Examen ===== */
    function empezar(c) {
      const exam = armarExamen(c);
      st.exam = exam; st.resp = {}; st.elegidos = []; st.inicio = Date.now();
      guardar();
      try { history.replaceState(null, '', '#' + exam.codigo); } catch (e) { /* ... */ }
      vistaExamen();
    }
    function reanudar(curso) {
      const c = parseCodigo(curso.codigo);
      if (!c) { ls.del(K_CURSO); return vistaConfig(); }
      st.exam = armarExamen(c); st.resp = curso.resp || {}; st.elegidos = curso.elegidos || []; st.inicio = curso.inicio;
      vistaExamen();
    }
    function guardar() {
      if (!st.exam) return;
      ls.set(K_CURSO, { codigo: st.exam.codigo, inicio: st.inicio, resp: st.resp, elegidos: st.elegidos });
    }
    function recoger() {
      st.exam && todosEjercicios(st.exam).forEach((e) => {
        st.resp[e.num] = e.partes.map((_, pi) => (st.uis[e.num + '|' + pi] ? st.uis[e.num + '|' + pi].raw() : []));
      });
    }

    function vistaExamen() {
      limpiar();
      st.vista = 'examen';
      st.uis = {};
      const exam = st.exam;
      const dur = exam.cfg.duracion * 60000;
      const bar = el('div', 'mdx-bar');
      bar.appendChild(el('span', 'mdx-bar-cod', 'Código <code>' + exam.codigo + '</code>'));
      const tm = el('span', 'mdx-timer', mmss(st.inicio + dur - Date.now()));
      bar.appendChild(tm);
      const ent = el('button', 'gym-btn gym-check', 'Entregar'); ent.type = 'button';
      ent.onclick = () => { if (window.confirm('¿Entregar el examen ahora?')) entregar(); };
      bar.appendChild(ent);
      container.appendChild(bar);

      const hoja = el('div', 'mdx-hoja');
      hoja.appendChild(el('div', 'mdx-cab', '<div class="mdx-cab-t">SIMULACRO DE PRUEBA DE ACCESO A LA UNIVERSIDAD</div><div>Formato PAU · Andalucía</div><div class="mdx-cab-m">MATEMÁTICAS II</div>'));
      const ins = el('div', 'mdx-instr'); ins.appendChild(el('b', '', 'Instrucciones:'));
      const ul = el('ul');
      ['Duración: ' + exam.cfg.duracion + ' minutos.'].concat(exam.instr, [
        'Cada ejercicio tiene un valor máximo de 2,5 puntos.',
        'Responde en las casillas. La corrección es automática: escribe enteros, fracciones (<code>a/b</code>), decimales o expresiones como <code>ln(2)/2</code>, <code>sqrt(3)</code> o <code>pi/4</code>.',
        'Se permite calculadora no programable.']).forEach((t) => ul.appendChild(el('li', '', t)));
      ins.appendChild(ul); hoja.appendChild(ins);

      exam.grupos.forEach((g, gi) => {
        const gb = el('section', 'mdx-grupo');
        gb.appendChild(el('div', 'mdx-grupo-t', '<span>' + g.titulo + '</span>' + (g.consigna ? ' ' + g.consigna : '')));
        g.ejercicios.forEach((e) => gb.appendChild(tarjeta(e, g)));
        hoja.appendChild(gb);
      });
      container.appendChild(hoja);

      const pie = el('div', 'mdx-pie');
      const e2 = el('button', 'gym-btn gym-check mdx-go', 'Entregar examen'); e2.type = 'button';
      e2.onclick = () => { if (window.confirm('¿Entregar el examen ahora?')) entregar(); };
      pie.appendChild(e2);
      container.appendChild(pie);

      const tick = () => {
        const resta = st.inicio + dur - Date.now();
        tm.textContent = mmss(resta);
        tm.classList.toggle('warn', resta < 10 * 60000);
        if (resta <= 0) { parar(); entregar(true); }
      };
      st.timer = setInterval(tick, 1000);
      tick();
    }

    function tarjeta(e, g) {
      const card = el('article', 'mdx-ej');
      const head = el('div', 'mdx-ej-h');
      head.appendChild(el('span', 'mdx-ej-t', 'EJERCICIO ' + e.num + ' <small>(2,5 puntos)</small>'));
      const unico = g.elegir >= g.n && !st.exam.elegirTotal;
      if (!unico) {
        const l = el('label', 'mdx-elijo');
        const c = el('input');
        if (st.exam.elegirTotal) {
          c.type = 'checkbox'; c.checked = st.elegidos.includes(e.num);
          c.onchange = () => {
            if (c.checked && st.elegidos.length >= st.exam.elegirTotal) { c.checked = false; return; }
            st.elegidos = c.checked ? st.elegidos.concat([e.num]) : st.elegidos.filter((x) => x !== e.num);
            guardar();
          };
        } else {
          c.type = 'radio'; c.name = 'mdx-g' + e.grupo; c.checked = st.elegidos.includes(e.num);
          c.onchange = () => {
            const otros = st.exam.grupos[e.grupo].ejercicios.map((x) => x.num);
            st.elegidos = st.elegidos.filter((x) => !otros.includes(x)).concat([e.num]);
            guardar();
          };
        }
        l.appendChild(c); l.appendChild(document.createTextNode(' Hago este ejercicio'));
        head.appendChild(l);
      }
      card.appendChild(head);
      const en = el('div', 'mdx-enun'); typ(en, e.enunciado); card.appendChild(en);
      e.partes.forEach((p, pi) => {
        const pb = el('div', 'mdx-parte');
        const tx = el('div', 'mdx-parte-t');
        typ(tx, '<b>' + String.fromCharCode(97 + pi) + ')</b> <span class="mdx-pts">[' + fmtPts(p.pts) + (p.pts === 1 ? ' punto' : ' puntos') + ']</span> ' + p.texto);
        pb.appendChild(tx);
        const ui = G.makeAnswerUI(p.answer, { onChange: () => { recoger(); guardar(); } });
        const prev = (st.resp[e.num] || [])[pi];
        if (prev) ui.fill(prev);
        st.uis[e.num + '|' + pi] = ui;
        pb.appendChild(ui.root);
        card.appendChild(pb);
      });
      return card;
    }

    /* ===== Entrega y resultado ===== */
    function entregar(auto) {
      parar();
      recoger();
      const res = corregir(st.exam, st.resp, st.elegidos);
      const usado = Math.min(Date.now() - st.inicio, st.exam.cfg.duracion * 60000);
      const hist = ls.get(K_HIST) || [];
      hist.unshift({ fecha: new Date().toLocaleDateString('es-ES'), codigo: st.exam.codigo, nota: res.sobre10, tiempo: Math.round(usado / 60000) });
      ls.set(K_HIST, hist.slice(0, 20));
      ls.del(K_CURSO);
      vistaResultado(res, usado, auto);
    }

    function vistaResultado(res, usado, auto) {
      limpiar();
      st.vista = 'resultado';
      const exam = st.exam;
      const w = el('div', 'mdx-res');
      const nota = el('div', 'mdx-nota');
      nota.innerHTML = '<div class="mdx-nota-n">' + String(res.sobre10).replace('.', ',') + '<small>/10</small></div><div>' + fmtPts(res.nota) + ' de ' + fmtPts(res.max) + ' puntos · tiempo empleado: ' + mmss(usado) + (auto ? ' · <b>se acabó el tiempo</b>' : '') + '</div><div class="mdx-cod-r">Código <code>' + exam.codigo + '</code> (con él, otra persona obtiene el mismo examen)</div>';
      w.appendChild(nota);

      // La corrección automática solo mira resultados; en la PAU se puntúa también el procedimiento.
      const rub = el('details', 'mdx-rubrica');
      rub.innerHTML = '<summary>Autoevaluación del procedimiento (la nota de arriba solo mira los resultados)</summary>' +
        '<p>En la PAU el tribunal puntúa el razonamiento. Un resultado correcto sin justificar puede valer poco, y un error de cuentas con buen planteamiento suele perder solo parte del apartado. Repasa tu hoja:</p><ul>' +
        ['Escribo qué voy a calcular y por qué, no solo las cuentas.',
          'Compruebo las hipótesis antes de usar un resultado (determinante no nulo, continuidad, derivabilidad…).',
          'Nombro el teorema o la propiedad que uso (Rouché, Bolzano, Barrow…).',
          'Termino con una conclusión en palabras: tipo de sistema, posición relativa, máximo o mínimo…',
          'Doy la respuesta final destacada, con unidades si las hay.'].map((t) => '<li><label><input type="checkbox"> ' + t + '</label></li>').join('') + '</ul>';
      w.appendChild(rub);

      const acc = el('div', 'mdx-acc');
      const nuevo = el('button', 'gym-btn gym-check', 'Nuevo examen'); nuevo.type = 'button';
      nuevo.onclick = () => { try { history.replaceState(null, '', location.pathname); } catch (e) { /* ... */ } vistaConfig(); };
      const rep = el('button', 'gym-btn', 'Repetir este examen'); rep.type = 'button';
      rep.onclick = () => empezar(exam.cfg);
      acc.appendChild(nuevo); acc.appendChild(rep);
      w.appendChild(acc);

      exam.grupos.forEach((g) => {
        w.appendChild(el('div', 'mdx-grupo-t', '<span>' + g.titulo + '</span>'));
        g.ejercicios.forEach((e) => {
          const r = res.ejercicios.find((x) => x.num === e.num);
          const card = el('article', 'mdx-ej' + (r.evaluado ? '' : ' mdx-no'));
          card.appendChild(el('div', 'mdx-ej-h', '<span class="mdx-ej-t">EJERCICIO ' + e.num + '</span> <span class="mdx-tipo">' + e.tipoNombre + '</span> ' +
            (r.evaluado ? '<span class="mdx-ptsr">' + fmtPts(r.puntos) + ' / 2,5</span>' : '<span class="mdx-ptsr">no elegido</span>')));
          const en = el('div', 'mdx-enun'); typ(en, e.enunciado); card.appendChild(en);
          let spec = null;
          try { spec = root.MDPlot && GRAFICAS[e.tipoId] ? GRAFICAS[e.tipoId](e.data) : null; } catch (err) { spec = null; }
          if (spec) {
            const gb = el('button', 'gym-btn mdx-res-btn', 'Ver gráfica'); gb.type = 'button';
            const gbox = el('div', 'gym-plot'); gbox.hidden = true;
            gb.onclick = () => { gbox.hidden = !gbox.hidden; if (!gbox.hidden && !gbox.firstChild) root.MDPlot.draw(gbox, spec); };
            card.appendChild(gb); card.appendChild(gbox);
          }
          e.partes.forEach((p, pi) => {
            const pr = r.partes[pi];
            const pb = el('div', 'mdx-parte ' + (r.evaluado ? (pr.ok ? 'okp' : 'badp') : ''));
            typ(pb.appendChild(el('div', 'mdx-parte-t')), '<b>' + String.fromCharCode(97 + pi) + ')</b> <span class="mdx-pts">[' + fmtPts(p.pts) + (p.pts === 1 ? ' punto' : ' puntos') + ']</span> ' + p.texto);
            const ui = G.makeAnswerUI(p.answer, {});
            ui.fill(pr.raw); ui.disable(true);
            if (r.evaluado) ui.mark(pr.res);
            pb.appendChild(ui.root);
            if (!(r.evaluado && pr.ok)) {
              const sol = el('div', 'mdx-sol'); sol.innerHTML = '<b>Solución:</b> '; sol.appendChild(el('code', '', textoSolucion(p.answer).replace(/</g, '&lt;'))); pb.appendChild(sol);
            }
            const bt = el('button', 'gym-btn mdx-res-btn', 'Ver resolución'); bt.type = 'button';
            const box = el('div', 'gym-steps'); box.hidden = true;
            bt.onclick = () => {
              if (!box.childNodes.length) p.steps.forEach((s, n) => {
                const d = el('div', 'gym-step'); d.appendChild(el('span', 'gym-step-n', String(n + 1)));
                const b = el('div', 'gym-step-body'); typ(b, s); d.appendChild(b); box.appendChild(d);
              });
              box.hidden = !box.hidden;
            };
            pb.appendChild(bt); pb.appendChild(box);
            card.appendChild(pb);
          });
          w.appendChild(card);
        });
      });
      container.appendChild(w);
    }
    const i$ = G.i$;

    // arranque: ¿código en la URL?
    const hash = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    const pc = parseCodigo(hash);
    vistaConfig(pc ? { formato: pc.formato, tipos: pc.tipos, duracion: pc.duracion, codigo: hash } : null);
  }

  root.MDExam = {
    CATALOGO, AREAS, FORMATOS, tipos, implementar, grafica, GRAFICAS, armarExamen, corregir, evaluados, parseCodigo, codigoDe, nuevaSemilla, textoSolucion, cellsOf, montar, PTS_EJ,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.MDExam;
})(typeof globalThis !== 'undefined' ? globalThis : this);
