/* Simulacro de examen tipo PAU de Matemáticas Aplicadas a las CC. SS. II (Andalucía): 4 ejercicios en 1 h 30 min.
 * Ejercicios 1 (álgebra) y 2 (análisis): 3 puntos, a elegir entre dos opciones (A o B). Ejercicios 3 y 4 (probabilidad y estadística): 2 puntos, sin opciones.
 * Basado en assets/gym/examen.js (Ciencias). Los generadores (tipos-ccss-*.js) se registran con MDExamCCSS.implementar().
 */
(function (root) {
  'use strict';
  const G = root.MDGym;

  /* ---------- Bloques del examen y catálogo de tipos (el orden es estable: fija el código del examen) ---------- */
  const BLOQUES = [
    { area: 'algebra', nombre: 'Álgebra', pts: 3, opciones: 2 },
    { area: 'analisis', nombre: 'Análisis', pts: 3, opciones: 2 },
    { area: 'probabilidad', nombre: 'Probabilidad y distribuciones', pts: 2, opciones: 1 },
    { area: 'inferencia', nombre: 'Inferencia estadística', pts: 2, opciones: 1 },
  ];
  const AREAS = BLOQUES.map((b) => [b.area, b.nombre]);
  const CATALOGO = [
    { id: 'ec-matricial', nombre: 'Ecuación matricial', area: 'algebra', tema: 1 },
    { id: 'sis-matricial', nombre: 'Sistema en forma matricial (inversa de una matriz 3×3)', area: 'algebra', tema: 2 },
    { id: 'sistema-plant', nombre: 'Problema de planteamiento (sistema 3×3)', area: 'algebra', tema: 2 },
    { id: 'pl-problema', nombre: 'Programación lineal: región factible y óptimo', area: 'algebra', tema: 3 },
    { id: 'trozos', nombre: 'Función a trozos: continuidad y derivabilidad', area: 'analisis', tema: 6 },
    { id: 'polinomica', nombre: 'Estudio de una función cúbica (extremos e inflexión)', area: 'analisis', tema: 7 },
    { id: 'racional', nombre: 'Función racional: dominio, asíntotas y pendiente', area: 'analisis', tema: 5 },
    { id: 'optimizacion', nombre: 'Optimización: beneficio máximo', area: 'analisis', tema: 7 },
    { id: 'int-primitiva', nombre: 'Primitiva, integral definida y área', area: 'analisis', tema: 8 },
    { id: 'area-curvas', nombre: 'Área entre una parábola y una recta', area: 'analisis', tema: 8 },
    { id: 'prob-total-bayes', nombre: 'Probabilidad total y teorema de Bayes', area: 'probabilidad', tema: 9 },
    { id: 'prob-tablas', nombre: 'Probabilidad con tablas de contingencia', area: 'probabilidad', tema: 9 },
    { id: 'binomial', nombre: 'Distribución binomial', area: 'probabilidad', tema: 10 },
    { id: 'binom-normal', nombre: 'Aproximación de la binomial por la normal', area: 'probabilidad', tema: 10 },
    { id: 'normal-prob', nombre: 'Distribución normal: probabilidades', area: 'probabilidad', tema: 10 },
    { id: 'normal-param', nombre: 'Distribución normal: media o desviación desconocida', area: 'probabilidad', tema: 10 },
    { id: 'ic-media', nombre: 'Intervalo de confianza para la media', area: 'inferencia', tema: 11 },
    { id: 'ic-prop', nombre: 'Intervalo de confianza para una proporción', area: 'inferencia', tema: 11 },
    { id: 'ic-inverso', nombre: 'Datos a partir de un intervalo de confianza', area: 'inferencia', tema: 11 },
    { id: 'tamano', nombre: 'Tamaño mínimo de la muestra', area: 'inferencia', tema: 11 },
    { id: 'media-muestral', nombre: 'Distribución de la media muestral', area: 'inferencia', tema: 11 },
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

  const DURACION = 90;
  const INSTR = [
    'Este examen consta de cuatro ejercicios. Los ejercicios 1 y 2 valen 3 puntos cada uno y tienen dos opciones, A y B: elige una de ellas en cada ejercicio.',
    'Los ejercicios 3 y 4 valen 2 puntos cada uno y no tienen opciones.',
  ];

  /* ---------- Utilidades ---------- */
  const fmtPts = (p) => String(p).replace('.', ',');
  const shuffleWith = (rng, arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const nuevaSemilla = () => Math.random().toString(36).slice(2, 8).padEnd(6, '0');
  const maskDe = (ids) => ids.reduce((m, id) => m | (1 << CATALOGO.findIndex((t) => t.id === id)), 0) >>> 0;
  const idsDeMask = (m) => CATALOGO.filter((_, i) => (m >>> 0) & (1 << i)).map((t) => t.id);

  function codigoDe(cfg) { return ['ccss', cfg.semilla, maskDe(cfg.tipos).toString(16), cfg.duracion || DURACION].join('-'); }
  function parseCodigo(str) {
    const m = /^ccss-([a-z0-9]{3,12})-([0-9a-f]{1,8})-(\d{1,3})$/i.exec(String(str || '').trim());
    if (!m) return null;
    return { semilla: m[1].toLowerCase(), tipos: idsDeMask(parseInt(m[2], 16)), duracion: Number(m[3]) };
  }

  /* ---------- Generación del examen ---------- */
  function generarEjercicio(tipo, semilla, idx, pts) {
    let ultimo;
    for (let intento = 0; intento < 8; intento++) {
      const prev = G.setRandom(G.seeded(semilla + '|ej|' + idx + '|' + intento));
      try {
        const ex = tipo.generate();
        const suma = ex.partes.reduce((s, p) => s + p.pts, 0);
        if (Math.abs(suma - pts) > 1e-9) throw new Error(tipo.id + ': los apartados suman ' + suma + ' y el ejercicio vale ' + pts);
        return ex;
      } catch (e) { ultimo = e; } finally { G.setRandom(prev); }
    }
    throw ultimo;
  }

  /** cfg = {tipos:[ids], semilla, duracion} → examen reproducible. Un bloque sin tipos elegidos no aparece. */
  function armarExamen(cfg) {
    const listos = cfg.tipos.filter((id) => tipos[id] && tipos[id].listo);
    if (!listos.length) throw new Error('Elige al menos un tipo de ejercicio disponible.');
    const rng = G.seeded('tipos|' + cfg.semilla);
    let contador = 0;
    const grupos = [];
    BLOQUES.forEach((bl, bi) => {
      const pool = listos.filter((id) => tipos[id].area === bl.area);
      if (!pool.length) return;
      contador++;
      let bolsa = shuffleWith(rng, pool);
      const ejercicios = [];
      for (let k = 0; k < bl.opciones; k++) {
        const id = bolsa.length ? bolsa.shift() : pool[Math.floor(rng() * pool.length)];
        const t = tipos[id];
        const ex = generarEjercicio(t, cfg.semilla, bi * 2 + k, bl.pts);
        ejercicios.push({ num: contador + (bl.opciones > 1 ? 'AB'[k] : ''), grupo: grupos.length, tipoId: id, tipoNombre: t.nombre, pts: bl.pts, enunciado: ex.enunciado, partes: ex.partes, data: ex.data });
      }
      grupos.push({ titulo: 'EJERCICIO ' + contador, area: bl.area, pts: bl.pts, consigna: bl.opciones > 1 ? 'Resuelve sólo una de las dos opciones, A o B:' : '', n: bl.opciones, elegir: 1, ejercicios });
    });
    const ptsTotal = grupos.reduce((x, g) => x + g.pts, 0);
    return { cfg: Object.assign({}, cfg), codigo: codigoDe(cfg), instr: INSTR, ptsTotal, conTabla: grupos.some((g) => g.area === 'probabilidad' || g.area === 'inferencia'), grupos };
  }

  /* ---------- Corrección ---------- */
  const todosEjercicios = (exam) => [].concat(...exam.grupos.map((g) => g.ejercicios));
  const hayRespuesta = (resp, num) => (resp[num] || []).some((p) => (p || []).some((v) => v !== '' && v !== undefined && v !== null));

  /** Ejercicios que puntúan: el elegido de cada bloque con opciones (por omisión, el primero respondido, o el A). */
  function evaluados(exam, elegidos, resp) {
    const ev = new Set();
    const elegSet = new Set(elegidos || []);
    exam.grupos.forEach((g) => {
      if (g.n <= 1) { g.ejercicios.forEach((e) => ev.add(e.num)); return; }
      const sel = g.ejercicios.filter((e) => elegSet.has(e.num));
      const conResp = g.ejercicios.filter((e) => !elegSet.has(e.num) && hayRespuesta(resp, e.num));
      ev.add(sel.concat(conResp, g.ejercicios)[0].num);
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
      if (evaluado) { nota += puntos; max += e.pts; }
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
  const K_CURSO = 'mdexamccss:curso', K_HIST = 'mdexamccss:historial';
  const ls = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* ... */ } },
  };

  /* ---------- Interfaz ---------- */
  /** Tabla N(0,1) de la Junta (desplegable); sólo si el examen tiene ejercicios de estadística. */
  function tablaN() {
    const d = document.createElement('details'); d.className = 'mdx-tabla'; d.open = true;
    const sm = document.createElement('summary'); sm.textContent = 'Tabla de la distribución normal N(0,1)'; d.appendChild(sm);
    const box = document.createElement('div'); d.appendChild(box);
    G.normalTableCCSS(box);
    const nota = document.createElement('small'); nota.textContent = 'Φ(z) = P(Z ≤ z) para z ≥ 0. Para z < 0: Φ(−z) = 1 − Φ(z).'; d.appendChild(nota);
    return d;
  }
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; };
  const mmss = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  const typ = (node, tex) => { G.typeset(node, tex); return node; };

  function montar(container) {
    let st = { vista: 'config', exam: null, resp: {}, elegidos: [], inicio: 0, timer: null, uis: {} };
    const cfgPrev = { tipos: CATALOGO.filter((t) => t.listo).map((t) => t.id), duracion: DURACION };

    const parar = () => { if (st.timer) { clearInterval(st.timer); st.timer = null; } };
    const limpiar = () => { parar(); container.innerHTML = ''; window.scrollTo(0, 0); };

    /* ===== Configuración ===== */
    function vistaConfig(precarga) {
      limpiar();
      st.vista = 'config';
      const cfg = Object.assign({}, cfgPrev, precarga || {});
      const w = el('div', 'mdx-config');
      w.appendChild(el('p', 'mdx-intro', 'Marca los <b>tipos de ejercicio</b> que ya has estudiado: sólo saldrán esos. Si no marcas ninguno de un bloque (por ejemplo, inferencia), ese ejercicio no aparece y la nota se calcula sobre los demás.'));

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
      const cn = el('input'); cn.type = 'text'; cn.placeholder = 'ej.: ccss-k3j9ab-1f-90'; cn.value = (precarga && precarga.codigo) || '';
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
            c = { tipos: sel, semilla: nuevaSemilla(), duracion: Math.min(180, Math.max(10, Number(dn.value) || DURACION)) };
            cfgPrev.tipos = sel; cfgPrev.duracion = c.duracion;
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
      hoja.appendChild(el('div', 'mdx-cab', '<div class="mdx-cab-t">SIMULACRO DE PRUEBA DE ACCESO A LA UNIVERSIDAD</div><div>Formato PAU · Andalucía</div><div class="mdx-cab-m">MATEMÁTICAS APLICADAS A LAS CIENCIAS SOCIALES II</div>'));
      const ins = el('div', 'mdx-instr'); ins.appendChild(el('b', '', 'Instrucciones:'));
      const ul = el('ul');
      ['Duración: ' + exam.cfg.duracion + ' minutos.'].concat(exam.instr, [
        'Se puede usar la tabla de la distribución normal N(0,1) que aparece debajo; los resultados con decimales se dan con la aproximación que pida cada apartado.',
        'Responde en las casillas. La corrección es automática: escribe enteros, fracciones (<code>a/b</code>), decimales o expresiones como <code>ln(2)/2</code>, <code>sqrt(3)</code> o <code>pi/4</code>.',
        'Se permite calculadora científica no programable.']).forEach((t) => ul.appendChild(el('li', '', t)));
      ins.appendChild(ul); hoja.appendChild(ins);
      if (exam.conTabla) hoja.appendChild(tablaN());

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
      head.appendChild(el('span', 'mdx-ej-t', 'EJERCICIO ' + e.num.replace(/([AB])$/, ' · OPCIÓN $1') + ' <small>(' + fmtPts(e.pts) + ' puntos)</small>'));
      if (g.n > 1) {
        const l = el('label', 'mdx-elijo');
        const c = el('input');
        c.type = 'radio'; c.name = 'mdx-g' + e.grupo; c.checked = st.elegidos.includes(e.num);
        c.onchange = () => {
          const otros = st.exam.grupos[e.grupo].ejercicios.map((x) => x.num);
          st.elegidos = st.elegidos.filter((x) => !otros.includes(x)).concat([e.num]);
          guardar();
        };
        l.appendChild(c); l.appendChild(document.createTextNode(' Hago esta opción'));
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
      if (exam.conTabla) w.appendChild(tablaN());

      // La corrección automática solo mira resultados; en la PAU se puntúa también el procedimiento.
      const rub = el('details', 'mdx-rubrica');
      rub.innerHTML = '<summary>Autoevaluación del procedimiento (la nota de arriba solo mira los resultados)</summary>' +
        '<p>En la PAU el tribunal puntúa el razonamiento. Un resultado correcto sin justificar puede valer poco, y un error de cuentas con buen planteamiento suele perder solo parte del apartado. Repasa tu hoja:</p><ul>' +
        ['Escribo qué voy a calcular y por qué, no solo las cuentas.',
          'Compruebo las condiciones antes de usar un resultado (determinante no nulo, continuidad, derivabilidad, n ≥ 30…).',
          'Nombro la propiedad o el método que uso (Barrow, tipificación, teorema de Bayes…).',
          'Termino con una conclusión en palabras: vértice óptimo, máximo o mínimo, intervalo de confianza…',
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
            (r.evaluado ? '<span class="mdx-ptsr">' + fmtPts(r.puntos) + ' / ' + fmtPts(e.pts) + '</span>' : '<span class="mdx-ptsr">no elegido</span>')));
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
    vistaConfig(pc ? { tipos: pc.tipos, duracion: pc.duracion, codigo: hash } : null);
  }

  root.MDExamCCSS = {
    CATALOGO, AREAS, BLOQUES, tipos, implementar, grafica, GRAFICAS, armarExamen, corregir, evaluados, parseCodigo, codigoDe, nuevaSemilla, textoSolucion, cellsOf, montar,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.MDExamCCSS;
})(typeof globalThis !== 'undefined' ? globalThis : this);
