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
