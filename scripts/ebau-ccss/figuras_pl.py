#!/usr/bin/env python3
"""Dibuja la región factible de los ejercicios de programación lineal de la PAU CCSS y la enlaza en sus soluciones.

Uso:  python3 scripts/ebau-ccss/figuras_pl.py      (después, python3 scripts/ebau-ccss/build.py)

Lee las restricciones de las llamadas `vertices([...])` de scripts/ebau-ccss/verificar_AAAA.py (así la figura sale de los mismos
datos que se verifican), escribe SVG en ejercicios/2-bachillerato-ccss/ebau/fig/<examen>-e<n>.svg con la paleta de la marca
(clase Fig de scripts/figuras/build.py) y añade la imagen a soluciones/<examen>.md, tras el párrafo de los vértices. Es idempotente.
"""
import ast
import importlib.util
import math
import re
import sys
from pathlib import Path

from sympy import Rational

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from _verif import vertices  # noqa: E402

spec = importlib.util.spec_from_file_location("figuras_build", HERE.parent / "figuras" / "build.py")
FB = importlib.util.module_from_spec(spec)
spec.loader.exec_module(FB)
Fig, NAVY, MINT, CORAL, YELLOW, INK = FB.Fig, FB.NAVY, FB.MINT, FB.CORAL, FB.YELLOW, FB.INK
OUT = FB.ROOT / "ejercicios" / "2-bachillerato-ccss" / "ebau" / "fig"
SOLS = HERE / "soluciones"


def lee_restricciones():
    """[(slug, n, [(a, b, c, op), ...])] a partir de los verificadores."""
    res = []
    for f in sorted(HERE.glob("verificar_20*.py")):
        slug = None
        cons = None
        objs = {}
        buf = ""
        for lin in f.read_text().splitlines():
            mo = re.match(r"(\w+) = \{(\w+): (.*) for \2 in V\}", lin)
            if mo:
                objs[mo.group(1)] = (mo.group(2), mo.group(3))
            m = re.match(r's = "([^"]+)"', lin)
            if m:
                slug, cons = m.group(1), None
            buf = (buf + lin) if cons is not None else lin
            m = re.search(r"vertices\((\[.*\])\)", lin) or re.match(r"cons = (\[.*\])$", lin)
            if m and slug:
                cons = eval(m.group(1), {"R": Rational})
            m = re.search(rf'"{re.escape(slug or "~")} ej\.(\w+)"', lin) if slug else None
            if m and cons is not None:
                opts = []
                for kind, name in re.findall(r"(max|min)\((\w+)\.values\(\)\)", buf):
                    if name in objs:
                        opts.append((kind, objs[name]))
                res.append((slug, re.sub(r'(?<=\d)[a-z]+$', '', m.group(1)), cons, opts))
                cons = None
    return res


def fmt(v):
    v = Rational(v)
    if v.q == 1:
        return str(int(v))
    return f"{float(v):.2f}".rstrip("0").replace(".", ",")


def dibuja(slug, n, cons, opts=()):
    V = [(Rational(p[0]), Rational(p[1])) for p in vertices(cons)]
    xs = [float(p[0]) for p in V] + [0]
    ys = [float(p[1]) for p in V] + [0]
    dx, dy = (max(xs) - min(xs)) or 1, (max(ys) - min(ys)) or 1
    x0, x1 = min(xs) - 0.14 * dx, max(xs) + 0.2 * dx
    y0, y1 = min(ys) - 0.14 * dy, max(ys) + 0.2 * dy
    if x0 > -0.08 * dx:
        x0 = -0.08 * dx
    if y0 > -0.08 * dy:
        y0 = -0.08 * dy
    g = Fig(x0, x1, y0, y1)
    cx, cy = sum(xs[:-1]) / len(V), sum(ys[:-1]) / len(V)
    orden = sorted(V, key=lambda p: math.atan2(float(p[1]) - cy, float(p[0]) - cx))
    pts = " L".join(f"{g.X(float(p[0])):.1f},{g.Y(float(p[1])):.1f}" for p in orden)
    g.el.append(f'<path d="M{pts} Z" fill="{YELLOW}" fill-opacity="0.75" stroke="none"/>')
    g.axes()
    for a, b, c, op in cons:
        a, b, c = float(a), float(b), float(c)
        if a == 0 and b == 0:
            continue
        cand = []
        if b != 0:
            for X in (x0, x1):
                Y = (c - a * X) / b
                if y0 - 1e-9 <= Y <= y1 + 1e-9:
                    cand.append((X, Y))
        if a != 0:
            for Y in (y0, y1):
                X = (c - b * Y) / a
                if x0 - 1e-9 <= X <= x1 + 1e-9:
                    cand.append((X, Y))
        if len(cand) >= 2:
            p, q = max(((u, w) for u in cand for w in cand), key=lambda t: (t[0][0] - t[1][0]) ** 2 + (t[0][1] - t[1][1]) ** 2)
            g.line(p, q, color=CORAL, width=2, dash="0")
    g.el.append(f'<path d="M{pts} Z" fill="none" stroke="{NAVY}" stroke-width="3"/>')
    optimos = {}
    for kind, (var, expr) in opts:
        val = {p: eval(expr, {"R": Rational, var: p}) for p in V}
        best = (max if kind == "max" else min)(val.values())
        for p in V:
            if val[p] == best:
                optimos.setdefault(p, []).append("máximo" if kind == "max" else "mínimo")
    for p in orden:
        if p in optimos:
            g.el.append(f'<circle cx="{g.X(float(p[0])):.1f}" cy="{g.Y(float(p[1])):.1f}" r="11" fill="none" stroke="{CORAL}" stroke-width="3.5"/>')
            g.dot(float(p[0]), float(p[1]), CORAL)
        else:
            g.dot(float(p[0]), float(p[1]), MINT)
        sx = -1 if float(p[0]) > (x0 + x1) / 2 + 0.25 * (x1 - x0) else 1
        g.text(float(p[0]), float(p[1]), f"({fmt(p[0])}, {fmt(p[1])})" + (" " + " y ".join(optimos[p]) if p in optimos else ""), dx=12 * sx, dy=-10 if float(p[1]) >= cy else 18, anchor="start" if sx > 0 else "end", size=13, color=NAVY, bold=True)
    g.text(cx, cy, "región factible", size=14, color=INK, bold=True)
    name = f"{slug}-e{n.lower()}"
    alt = f"Región factible del ejercicio {n} ({slug}), con sus vértices: " + ", ".join(f"({fmt(p[0])}, {fmt(p[1])})" for p in orden) + "".join(f". Vértice con el {' y '.join(k)}: ({fmt(p[0])}, {fmt(p[1])})" for p, k in optimos.items())
    OUT.mkdir(parents=True, exist_ok=True)
    g.save(OUT / f"{name}.svg", alt)
    return name, alt


def enlaza(slug, n, name, alt):
    p = SOLS / f"{slug}.md"
    txt = p.read_text()
    if f"fig/{name}.svg" in txt:
        return
    m = re.search(rf"^@@ {re.escape(n)}\s*$", txt, re.M)
    assert m, (slug, n)
    nxt = re.search(r"^@@ \w+\s*$", txt[m.end():], re.M)
    end = m.end() + nxt.start() if nxt else len(txt)
    paras = re.split(r"\n\s*\n", txt[m.end():end].strip("\n"))
    k = next((i for i, q in enumerate(paras) if re.search(r"[Vv]értices", q)), 0)
    # tras el párrafo de vértices y la tabla que lo sigue
    while k + 1 < len(paras) and paras[k + 1].lstrip().startswith("|"):
        k += 1
    img = f'![{alt}](fig/{name}.svg){{fig-alt="{alt}" width="75%" fig-align="center"}}'
    paras.insert(k + 1, img)
    p.write_text(txt[:m.end()] + "\n" + "\n\n".join(paras) + "\n\n" + txt[end:])


if __name__ == "__main__":
    n_ok = 0
    for slug, n, cons, opts in lee_restricciones():
        name, alt = dibuja(slug, n, cons, opts)
        enlaza(slug, n, name, alt)
        n_ok += 1
    print(f"OK: {n_ok} figuras de programación lineal")
