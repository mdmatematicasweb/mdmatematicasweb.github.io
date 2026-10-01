/* Gráficas interactivas con JSXGraph (carga diferida desde cdnjs).
 * MDPlot.draw(contenedor, spec) dibuja una gráfica a partir de los datos de un reto:
 *   2D: {type:'2d', x:[xmin,xmax], y:[ymin,ymax]?, curves:[{f, label}], points:[{x, y, label}],
 *        lines:[{m, n, label}], vlines:[x], hlines:[y], fill:[{f, g, a, b}]}
 *   3D: {type:'3d', r: semilado de la caja, points:[{p:[x,y,z], label}], lines:[{p, v, label}],
 *        planes:[{eq:[a,b,c,d], label}], segments:[{a:[x,y,z], b:[x,y,z], solid?}]}
 * Las funciones f, g son funciones JS de una variable.
 */
(function (root) {
  'use strict';
  const VER = '1.13.3';
  const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/' + VER + '/';
  const COL = ['#262A3D', '#F4736C', '#2E9C8E', '#C9A21F', '#7A5BA6'];
  const FILL = '#5EC4B6';
  let loading = null;
  let uid = 0;

  function load() {
    if (root.JXG) return Promise.resolve(root.JXG);
    if (loading) return loading;
    loading = new Promise((resolve, reject) => {
      const css = document.createElement('link');
      css.rel = 'stylesheet'; css.href = CDN + 'jsxgraph.css';
      document.head.appendChild(css);
      const s = document.createElement('script');
      s.src = CDN + 'jsxgraphcore.js';
      s.onload = () => resolve(root.JXG);
      s.onerror = () => { loading = null; reject(new Error('No se pudo cargar JSXGraph')); };
      document.head.appendChild(s);
    });
    return loading;
  }

  /** Rango vertical razonable: percentiles de la curva muestreada, más los puntos marcados. */
  function autoY(spec) {
    const [a, b] = spec.x;
    const ys = [];
    (spec.curves || []).forEach((c) => {
      for (let i = 0; i <= 200; i++) { const y = c.f(a + (b - a) * i / 200); if (Number.isFinite(y)) ys.push(y); }
    });
    (spec.points || []).forEach((p) => ys.push(p.y));
    (spec.hlines || []).forEach((y) => ys.push(y));
    if (!ys.length) return [-5, 5];
    ys.sort((p, q) => p - q);
    let lo = ys[Math.floor(ys.length * 0.1)], hi = ys[Math.ceil(ys.length * 0.9) - 1];
    (spec.points || []).forEach((p) => { lo = Math.min(lo, p.y); hi = Math.max(hi, p.y); });
    lo = Math.min(lo, 0); hi = Math.max(hi, 0);
    const pad = Math.max((hi - lo) * 0.12, 0.5);
    return [lo - pad, hi + pad];
  }

  function draw2d(JXG, id, spec) {
    const [x0, x1] = spec.x;
    const [y0, y1] = spec.y || autoY(spec);
    const board = JXG.JSXGraph.initBoard(id, {
      boundingbox: [x0, y1, x1, y0], keepaspectratio: false, axis: true, showCopyright: false,
      showNavigation: true, pan: { enabled: true, needTwoFingers: true }, zoom: { wheel: true, needShift: true },
      defaultAxes: { x: { ticks: { label: { fontSize: 11 } } }, y: { ticks: { label: { fontSize: 11 } } } },
    });
    (spec.fill || []).forEach((r) => {
      const xs = [], ys = [];
      for (let i = 0; i <= 120; i++) { const x = r.a + (r.b - r.a) * i / 120; xs.push(x); ys.push(r.f(x)); }
      for (let i = 120; i >= 0; i--) { const x = r.a + (r.b - r.a) * i / 120; xs.push(x); ys.push(r.g ? r.g(x) : 0); }
      board.create('curve', [xs, ys], { strokeWidth: 0, fillColor: FILL, fillOpacity: 0.35, highlight: false });
    });
    (spec.curves || []).forEach((c, i) => {
      board.create('functiongraph', [c.f, x0 - (x1 - x0), x1 + (x1 - x0)], {
        strokeColor: COL[i % COL.length], strokeWidth: 2.5, highlight: false,
        name: c.label || '', withLabel: !!c.label, label: { fontSize: 13, strokeColor: COL[i % COL.length] },
      });
    });
    (spec.lines || []).forEach((l, i) => {
      board.create('line', [[0, l.n], [1, l.m + l.n]], { strokeColor: COL[(i + 1) % COL.length], strokeWidth: 2, dash: 2, name: l.label || '', withLabel: !!l.label, highlight: false });
    });
    (spec.vlines || []).forEach((x) => board.create('line', [[x, 0], [x, 1]], { strokeColor: '#888', strokeWidth: 1.5, dash: 3, fixed: true, highlight: false }));
    (spec.hlines || []).forEach((y) => board.create('line', [[0, y], [1, y]], { strokeColor: '#888', strokeWidth: 1.5, dash: 3, fixed: true, highlight: false }));
    (spec.points || []).forEach((p) => board.create('point', [p.x, p.y], { name: p.label || '', fixed: true, size: 3.5, fillColor: '#F4736C', strokeColor: '#000', label: { fontSize: 12, offset: [8, 8] } }));
    return board;
  }

  /* ---------- 3D ---------- */
  const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  const cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const unit = (v) => { const n = Math.hypot(...v); return v.map((x) => x / n); };

  function draw3d(JXG, id, spec) {
    const R = spec.r || 6;
    const board = JXG.JSXGraph.initBoard(id, {
      boundingbox: [-8, 8, 8, -8], keepaspectratio: true, axis: false, showCopyright: false, showNavigation: false,
      pan: { enabled: false }, zoom: { enabled: false },
    });
    const box = [[-R, R], [-R, R], [-R, R]];
    const view = board.create('view3d', [[-6, -6], [12, 12], box], {
      projection: 'parallel', trackball: { enabled: true },
      az: { slider: { visible: false, start: 1.0 } }, el: { slider: { visible: false, start: 0.35 } }, bank: { slider: { visible: false } },
      xPlaneRear: { visible: false }, yPlaneRear: { visible: false }, zPlaneRear: { fillOpacity: 0.08 },
      axesPosition: 'center',
      xAxis: { strokeColor: '#999', name: 'x', withLabel: true, label: { fontSize: 12 } },
      yAxis: { strokeColor: '#999', name: 'y', withLabel: true, label: { fontSize: 12 } },
      zAxis: { strokeColor: '#999', name: 'z', withLabel: true, label: { fontSize: 12 } },
    });
    (spec.planes || []).forEach((pl, i) => {
      const n = pl.eq.slice(0, 3), d = pl.eq[3];
      const n2 = dot(n, n);
      const P0 = n.map((x) => -d * x / n2);
      const e1 = unit(Math.abs(n[0]) < 0.9 * Math.sqrt(n2) ? cross(n, [1, 0, 0]) : cross(n, [0, 1, 0]));
      const e2 = unit(cross(n, e1));
      // Cuadrado del plano centrado en el pie de la perpendicular desde el origen (polygon3d respeta fillColor).
      const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => view.create('point3d', P0.map((x, k) => x + R * (a * e1[k] + b * e2[k])), { visible: false }));
      view.create('polygon3d', corners, {
        fillColor: i === 0 ? '#5EC4B6' : '#F5D65B', fillOpacity: 0.45, highlight: false,
        borders: { strokeColor: '#555', strokeWidth: 0.6 },
      });
    });
    (spec.lines || []).forEach((l, i) => {
      view.create('line3d', [l.p, l.v, [-3 * R, 3 * R]], { strokeColor: COL[(i + 1) % COL.length], strokeWidth: 3.5, highlight: false });
    });
    (spec.segments || []).forEach((s) => {
      const a = view.create('point3d', s.a, { visible: false }), b = view.create('point3d', s.b, { visible: false });
      view.create('line3d', [a, b], { strokeColor: '#000', strokeWidth: 2, dash: s.solid ? 0 : 2, highlight: false });
    });
    (spec.points || []).forEach((p) => {
      view.create('point3d', p.p, { name: p.label || '', size: 5, fillColor: '#F4736C', strokeColor: '#000', fixed: true, label: { fontSize: 13 } });
    });
    return board;
  }

  /** Dibuja spec en el contenedor (lo vacía antes). Devuelve una promesa. */
  function draw(el, spec) {
    el.innerHTML = '';
    const box = document.createElement('div');
    box.id = 'mdplot-' + (++uid);
    box.className = 'mdplot-board jxgbox';
    el.appendChild(box);
    const note = document.createElement('div');
    note.className = 'mdplot-note';
    note.textContent = spec.type === '3d' ? 'Arrastra para girar la figura.' : 'Mayús + rueda para hacer zoom; arrastra con dos dedos para mover.';
    el.appendChild(note);
    return load().then((JXG) => (spec.type === '3d' ? draw3d(JXG, box.id, spec) : draw2d(JXG, box.id, spec)))
      .catch((e) => { el.textContent = e.message + '. Comprueba la conexión.'; });
  }

  root.MDPlot = { draw, load };
})(typeof globalThis !== 'undefined' ? globalThis : this);
