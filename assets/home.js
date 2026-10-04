/* Portada: laboratorio de la regla de Barrow (a y b arrastrables). */
(function () {
  var root = document.getElementById("barrow-lab");
  if (!root) return;
  var svg = root.querySelector("svg");
  var NS = "http://www.w3.org/2000/svg";
  var X0 = 30, X1 = 470, Y0 = 260, Y1 = 30;
  var XMAX = 6.5, YMAX = 3;

  var f = function (x) { return 0.1 * x * x * x - 0.9 * x * x + 2 * x + 1; };
  var F = function (x) { return 0.025 * Math.pow(x, 4) - 0.3 * x * x * x + x * x + x; };
  var px = function (x) { return X0 + (x / XMAX) * (X1 - X0); };
  var py = function (y) { return Y0 - (y / YMAX) * (Y0 - Y1); };
  var unpx = function (p) { return ((p - X0) / (X1 - X0)) * XMAX; };

  var grid = svg.querySelector(".grid");
  for (var i = 1; i <= 6; i++) {
    var l = document.createElementNS(NS, "line");
    l.setAttribute("x1", px(i)); l.setAttribute("x2", px(i));
    l.setAttribute("y1", 18); l.setAttribute("y2", Y0);
    grid.appendChild(l);
  }
  for (var j = 1; j <= 2; j++) {
    var h = document.createElementNS(NS, "line");
    h.setAttribute("y1", py(j)); h.setAttribute("y2", py(j));
    h.setAttribute("x1", X0); h.setAttribute("x2", X1);
    grid.appendChild(h);
  }

  var curve = [];
  for (var k = 0; k <= 130; k++) {
    var x = (k / 130) * XMAX;
    curve.push((k ? "L" : "M") + px(x).toFixed(1) + " " + py(f(x)).toFixed(1));
  }
  svg.querySelector(".curve").setAttribute("d", curve.join(" "));

  var area = svg.querySelector(".area");
  var ha = svg.querySelector(".ha"), hb = svg.querySelector(".hb");
  var ga = svg.querySelector(".ga"), gb = svg.querySelector(".gb");
  var la = svg.querySelector(".la"), lb = svg.querySelector(".lb");
  var out = root.querySelector(".readout");
  var a = 1.0, b = 4.6;

  function draw() {
    var d = "M" + px(a) + " " + Y0;
    for (var n = 0; n <= 60; n++) {
      var x = a + ((b - a) * n) / 60;
      d += " L" + px(x).toFixed(1) + " " + py(f(x)).toFixed(1);
    }
    d += " L" + px(b) + " " + Y0 + " Z";
    area.setAttribute("d", d);
    [[ha, ga, la, a], [hb, gb, lb, b]].forEach(function (t) {
      t[0].setAttribute("x", px(t[3]) - 11);
      t[1].setAttribute("x1", px(t[3])); t[1].setAttribute("x2", px(t[3]));
      t[2].setAttribute("x", px(t[3]));
    });
    var fa = F(a), fb = F(b);
    out.textContent = "F(" + b.toFixed(1) + ") − F(" + a.toFixed(1) + ") = " +
      fb.toFixed(2) + " − " + fa.toFixed(2) + " = " + (fb - fa).toFixed(2);
  }

  function drag(handle, which) {
    function move(e) {
      var r = svg.getBoundingClientRect();
      var x = unpx(((e.clientX - r.left) / r.width) * 480);
      x = Math.max(0.1, Math.min(XMAX - 0.1, x));
      if (which === "a") a = Math.min(x, b - 0.3); else b = Math.max(x, a + 0.3);
      draw();
    }
    handle.addEventListener("pointerdown", function (e) {
      handle.setPointerCapture(e.pointerId);
      handle.classList.add("grab");
      handle.addEventListener("pointermove", move);
    });
    handle.addEventListener("pointerup", function () {
      handle.classList.remove("grab");
      handle.removeEventListener("pointermove", move);
    });
    handle.addEventListener("keydown", function (e) {
      var s = e.key === "ArrowRight" ? 0.1 : e.key === "ArrowLeft" ? -0.1 : 0;
      if (!s) return;
      e.preventDefault();
      if (which === "a") a = Math.max(0.1, Math.min(a + s, b - 0.3));
      else b = Math.min(XMAX - 0.1, Math.max(b + s, a + 0.3));
      draw();
    });
  }
  drag(ha, "a");
  drag(hb, "b");

  // Barrido inicial: el área crece de a hasta b.
  var target = b, start = null;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { draw(); return; }
  b = a + 0.3;
  draw();
  function tick(t) {
    if (start === null) start = t;
    var p = Math.min(1, (t - start) / 1400);
    b = a + 0.3 + (target - a - 0.3) * (1 - Math.pow(1 - p, 3));
    draw();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

/* Campana de Gauss del curso Ciencias Sociales: P(a < Z < b) con a y b arrastrables y niveles de confianza. */
var bellLab = (function () {
  var root = document.getElementById("bell-lab");
  if (!root) return { start: function () {} };
  var svg = root.querySelector("svg"), NS = "http://www.w3.org/2000/svg";
  var X0 = 30, X1 = 470, Y0 = 260, Y1 = 40, ZMAX = 3.5;
  var px = function (z) { return X0 + ((z + ZMAX) / (2 * ZMAX)) * (X1 - X0); };
  var py = function (y) { return Y0 - (y / 0.4) * (Y0 - Y1); };
  var unpx = function (p) { return ((p - X0) / (X1 - X0)) * 2 * ZMAX - ZMAX; };
  var phi = function (z) { return Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI); };
  function Phi(z) {
    var neg = z < 0, t = Math.abs(z), term = t, sum = t;
    for (var n = 1; n < 80; n++) { term *= t * t / (2 * n + 1); sum += term; }
    var p = 0.5 + phi(t) * sum;
    return neg ? 1 - p : p;
  }
  var fmt = function (x, d) { return x.toFixed(d).replace(".", ",").replace("-", "\u2212"); };
  var grid = svg.querySelector(".grid");
  for (var i = -3; i <= 3; i++) {
    var l = document.createElementNS(NS, "line");
    l.setAttribute("x1", px(i)); l.setAttribute("x2", px(i)); l.setAttribute("y1", 18); l.setAttribute("y2", Y0);
    grid.appendChild(l);
  }
  var d0 = [];
  for (var k = 0; k <= 140; k++) { var z = -ZMAX + (k / 140) * 2 * ZMAX; d0.push((k ? "L" : "M") + px(z).toFixed(1) + " " + py(phi(z)).toFixed(1)); }
  svg.querySelector(".curve").setAttribute("d", d0.join(" "));
  var area = svg.querySelector(".area"), out = root.querySelector(".readout");
  var ha = svg.querySelector(".ha"), hb = svg.querySelector(".hb"), ga = svg.querySelector(".ga"), gb = svg.querySelector(".gb");
  var la = svg.querySelector(".la"), lb = svg.querySelector(".lb");
  var a = -1.96, b = 1.96, anim = null;
  function draw() {
    var d = "M" + px(a) + " " + Y0;
    for (var n = 0; n <= 70; n++) { var x = a + ((b - a) * n) / 70; d += " L" + px(x).toFixed(1) + " " + py(phi(x)).toFixed(1); }
    area.setAttribute("d", d + " L" + px(b) + " " + Y0 + " Z");
    [[ha, ga, la, a], [hb, gb, lb, b]].forEach(function (t) {
      t[0].setAttribute("x", px(t[3]) - 11); t[1].setAttribute("x1", px(t[3])); t[1].setAttribute("x2", px(t[3]));
      t[2].setAttribute("x", px(t[3])); t[2].textContent = fmt(t[3], 2);
    });
    out.textContent = "P(" + fmt(a, 2) + " < Z < " + fmt(b, 2) + ") = " + fmt(Phi(b) - Phi(a), 4);
  }
  function tween(ta, tb, ms) {
    if (anim) cancelAnimationFrame(anim);
    var a0 = a, b0 = b, t0 = null;
    if (reduce) { a = ta; b = tb; draw(); return; }
    (function tick(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - p, 3);
      a = a0 + (ta - a0) * e; b = b0 + (tb - b0) * e; draw();
      if (p < 1) anim = requestAnimationFrame(tick);
    })(performance.now());
  }
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function drag(handle, which) {
    function move(e) {
      var r = svg.getBoundingClientRect(), x = unpx(((e.clientX - r.left) / r.width) * 480);
      x = Math.max(-ZMAX + 0.1, Math.min(ZMAX - 0.1, x));
      if (anim) { cancelAnimationFrame(anim); anim = null; }
      if (which === "a") a = Math.min(x, b - 0.1); else b = Math.max(x, a + 0.1);
      draw();
    }
    handle.addEventListener("pointerdown", function (e) { handle.setPointerCapture(e.pointerId); handle.classList.add("grab"); handle.addEventListener("pointermove", move); });
    handle.addEventListener("pointerup", function () { handle.classList.remove("grab"); handle.removeEventListener("pointermove", move); });
    handle.addEventListener("keydown", function (e) {
      var s = e.key === "ArrowRight" ? 0.05 : e.key === "ArrowLeft" ? -0.05 : 0;
      if (!s) return;
      e.preventDefault();
      if (which === "a") a = Math.max(-ZMAX + 0.1, Math.min(a + s, b - 0.1)); else b = Math.min(ZMAX - 0.1, Math.max(b + s, a + 0.1));
      draw();
    });
  }
  drag(ha, "a"); drag(hb, "b");
  root.querySelectorAll(".bell-pills button").forEach(function (btn) {
    btn.addEventListener("click", function () { var z = parseFloat(btn.dataset.z); tween(-z, z, 700); });
  });
  draw();
  var lanzada = false;
  return {
    start: function () {          // barrido de entrada: la campana se abre desde el centro hasta el 95 %
      if (lanzada) return; lanzada = true;
      a = -0.05; b = 0.05; draw(); tween(-1.96, 1.96, 1500);
    }
  };
})();

/* Portada: slide con las dos cabeceras y selector de curso (se recuerda la elección; sin JavaScript se ven los dos cursos). */
(function () {
  var btns = document.querySelectorAll(".cs-btn");
  var slides = document.getElementById("hero-slides");
  if (!btns.length || !slides) return;
  var ORDEN = ["ciencias", "ccss"], actual = null;
  function set(c, guardar) {
    if (ORDEN.indexOf(c) < 0) c = "ciencias";
    var dir = actual === null ? 0 : ORDEN.indexOf(c) - ORDEN.indexOf(actual);
    document.querySelectorAll(".course").forEach(function (el) { el.hidden = el.dataset.course !== c; });
    document.querySelectorAll(".hero-slide").forEach(function (el) {
      var on = el.dataset.course === c, was = !el.hidden;
      el.hidden = !on;
      el.classList.remove("in-right", "in-left");
      if (on && !was && dir) { void el.offsetWidth; el.classList.add(dir > 0 ? "in-right" : "in-left"); }
    });
    btns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.go === c)); });
    document.querySelectorAll(".hn-dots i").forEach(function (d) { d.classList.toggle("on", d.dataset.go === c); });
    if (c === "ccss") bellLab.start();
    actual = c;
    if (guardar) { try { localStorage.setItem("md:curso", c); } catch (e) { /* sin almacenamiento */ } try { history.replaceState(null, "", "#" + c); } catch (e) { /* ... */ } }
  }
  btns.forEach(function (b) { b.addEventListener("click", function () { set(b.dataset.go, true); }); });
  document.querySelectorAll(".hn-dots i").forEach(function (d) { d.addEventListener("click", function () { set(d.dataset.go, true); }); });
  document.querySelectorAll(".hn-arrow").forEach(function (b) {
    b.addEventListener("click", function () { set(ORDEN[(ORDEN.indexOf(actual) + Number(b.dataset.dir) + ORDEN.length) % ORDEN.length], true); });
  });
  // deslizar con el dedo sobre la cabecera
  var x0 = null;
  slides.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  slides.addEventListener("touchend", function (e) {
    if (x0 === null || e.target.closest("svg")) { x0 = null; return; }
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 60) set(ORDEN[dx < 0 ? 1 : 0], true);
  }, { passive: true });
  var ini = (location.hash || "").replace("#", "");
  if (ORDEN.indexOf(ini) < 0) { try { ini = localStorage.getItem("md:curso"); } catch (e) { ini = null; } }
  set(ini, false);
})();
