#!/usr/bin/env python3
"""Genera las figuras SVG de los apuntes de 2º Bachillerato (paleta de _brand.yml).

Uso:  python3 scripts/figuras/build.py

Cada figura se escribe junto al index.qmd de su tema. No edites los SVG a mano.
"""
import math
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
AP = ROOT / "apuntes" / "2-bachillerato-ciencias"
APC = ROOT / "apuntes" / "2-bachillerato-ccss"   # curso Ciencias Sociales (oculto)
NAVY, MINT, CORAL, YELLOW, INK, PAPER = "#262A3D", "#5EC4B6", "#F4736C", "#FCE678", "#1A1A1A", "#EBF8EE"
S3 = math.sqrt(3)
FONT = "Inter, Helvetica, Arial, sans-serif"


class Fig:
    """Lienzo con ejes: (x0,x1)×(y0,y1) en coordenadas matemáticas."""

    def __init__(self, x0, x1, y0, y1, w=520, h=340, pad=28):
        self.x0, self.x1, self.y0, self.y1, self.w, self.h, self.pad = x0, x1, y0, y1, w, h, pad
        self.el = []

    def X(self, x):
        return self.pad + (x - self.x0) / (self.x1 - self.x0) * (self.w - 2 * self.pad)

    def Y(self, y):
        return self.h - self.pad - (y - self.y0) / (self.y1 - self.y0) * (self.h - 2 * self.pad)

    def pts(self, f, a, b, n=600):
        """Tramos de la gráfica que caen dentro del marco (se recorta a mano: Typst ignora clip-path)."""
        tramos, cur = [], []
        for i in range(n + 1):
            x = a + (b - a) * i / n
            y = f(x)
            if self.y0 <= y <= self.y1:
                cur.append((x, y))
            elif cur:
                tramos.append(cur); cur = []
        if cur:
            tramos.append(cur)
        return tramos

    def path(self, pts):
        return "M" + " L".join(f"{self.X(x):.1f},{self.Y(y):.1f}" for x, y in pts)

    def paths(self, tramos):
        return " ".join(self.path(t) for t in tramos if len(t) > 1)

    def axes(self, xt=(), yt=()):
        e = self.el
        e.append(f'<line x1="{self.X(self.x0):.1f}" y1="{self.Y(0):.1f}" x2="{self.X(self.x1):.1f}" y2="{self.Y(0):.1f}" stroke="{INK}" stroke-width="1.5" marker-end="url(#f)"/>')
        e.append(f'<line x1="{self.X(0):.1f}" y1="{self.Y(self.y0):.1f}" x2="{self.X(0):.1f}" y2="{self.Y(self.y1):.1f}" stroke="{INK}" stroke-width="1.5" marker-end="url(#f)"/>')
        for t in xt:
            e.append(f'<line x1="{self.X(t):.1f}" y1="{self.Y(0)-4:.1f}" x2="{self.X(t):.1f}" y2="{self.Y(0)+4:.1f}" stroke="{INK}"/>')
            self.text(t, 0, fmt(t), dy=18)
        for t in yt:
            e.append(f'<line x1="{self.X(0)-4:.1f}" y1="{self.Y(t):.1f}" x2="{self.X(0)+4:.1f}" y2="{self.Y(t):.1f}" stroke="{INK}"/>')
            self.text(0, t, fmt(t), dx=-10, anchor="end", dy=4)

    def curve(self, f, a, b, color=NAVY, width=3, dash=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.el.append(f'<path d="{self.paths(self.pts(f, a, b))}" fill="none" stroke="{color}" stroke-width="{width}"{d}/>')

    def line(self, p, q, color=INK, width=1.5, dash="6 5"):
        self.el.append(f'<line x1="{self.X(p[0]):.1f}" y1="{self.Y(p[1]):.1f}" x2="{self.X(q[0]):.1f}" y2="{self.Y(q[1]):.1f}" stroke="{color}" stroke-width="{width}" stroke-dasharray="{dash}"/>')

    def region(self, top, bot, a, b, color=YELLOW, n=120):
        up = [(a + (b - a) * i / n, top(a + (b - a) * i / n)) for i in range(n + 1)]
        dn = [(a + (b - a) * i / n, bot(a + (b - a) * i / n)) for i in range(n, -1, -1)]
        self.el.append(f'<path d="{self.path(up + dn)} Z" fill="{color}" stroke="{INK}" stroke-width="1.5"/>')

    def dot(self, x, y, color=CORAL):
        self.el.append(f'<circle cx="{self.X(x):.1f}" cy="{self.Y(y):.1f}" r="5.5" fill="{color}" stroke="{INK}" stroke-width="2"/>')

    def text(self, x, y, s, dx=0, dy=0, anchor="middle", size=14, color=INK, bold=False, raw=False):
        """raw=True inserta s tal cual (con <tspan> para exponentes y subíndices, que no dependen de la fuente)."""
        w = ' font-weight="700"' if bold else ""
        self.el.append(f'<text x="{self.X(x)+dx:.1f}" y="{self.Y(y)+dy:.1f}" text-anchor="{anchor}" font-size="{size}" fill="{color}"{w}>{s if raw else escape(s)}</text>')

    def save(self, path, title):
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" width="{self.w}" height="{self.h}" font-family="{FONT}" role="img">'
               f'<title>{title}</title>'
               f'<defs><marker id="f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="{INK}"/></marker></defs>'
               f'<rect x="1.5" y="1.5" width="{self.w-3}" height="{self.h-3}" fill="{PAPER}" stroke="{INK}" stroke-width="3"/>'
               + "".join(self.el) + "</svg>\n")
        path.write_text(svg)
        print("escrito", path.relative_to(ROOT))


def fmt(t):
    return str(t).replace("-", "−").replace(".", ",")


def fig_asintotas():
    f = lambda x: x * x / (x - 1)
    g = Fig(-4, 5, -6, 10)
    g.axes(xt=(-2, 1, 2, 4), yt=(4, 8))
    g.line((1, -6), (1, 10), color=CORAL, width=2)
    g.curve(lambda x: x + 1, -4, 5, color=MINT, width=2.5, dash="8 6")
    g.curve(f, -4, 0.92)
    g.curve(f, 1.08, 5)
    g.dot(0, 0); g.dot(2, 4)
    g.text(1, 9.2, "x = 1", dx=8, anchor="start", color=CORAL, bold=True)
    g.text(-3.8, -4.6, "y = x + 1", anchor="start", color="#2a8f82", bold=True)
    g.text(3.2, 8.3, "f(x) = x²/(x−1)", color=NAVY, bold=True)
    g.save(AP / "06-limites-continuidad" / "fig-asintotas.svg", "Asíntota vertical x=1 y oblicua y=x+1 de f(x)=x²/(x−1)")


def fig_monotonia():
    f = lambda x: x ** 3 - 3 * x
    g = Fig(-2.4, 2.4, -3, 3)
    g.axes(xt=(-1, 1), yt=(-2, 2))
    g.curve(f, -2.2, -1, color=MINT, width=4)
    g.curve(f, -1, 1, color=CORAL, width=4)
    g.curve(f, 1, 2.2, color=MINT, width=4)
    g.dot(-1, 2, YELLOW); g.dot(1, -2, YELLOW); g.dot(0, 0, NAVY)
    g.text(-1, 2, "máximo", dy=-14, bold=True)
    g.text(1, -2, "mínimo", dy=26, bold=True)
    g.text(0, 0, "inflexión", dx=12, dy=-10, anchor="start", bold=True)
    g.text(-2.3, 2.6, "f′ > 0 crece", anchor="start", color="#2a8f82", bold=True)
    g.text(0.25, 1.3, "f′ < 0 decrece", anchor="start", color=CORAL, bold=True)
    g.save(AP / "08-aplicaciones-derivada" / "fig-monotonia.svg", "f(x)=x³−3x: crece, máximo en (−1,2), decrece, inflexión en (0,0), mínimo en (1,−2)")


def fig_area():
    f = lambda x: 4 - x * x
    h = lambda x: x + 2
    g = Fig(-3.2, 2.6, -2.5, 5)
    g.region(f, h, -2, 1)
    g.axes(xt=(1,), yt=(2,))
    g.curve(f, -3, 2.4)
    g.curve(h, -3.2, 2.6, color=CORAL)
    g.dot(-2, 0, MINT); g.dot(1, 3, MINT)
    g.text(-0.55, 2.2, "A", size=20, bold=True)
    g.text(2.2, -1.3, "f(x) = 4 − x²", anchor="end", color=NAVY, bold=True)
    g.text(2.5, 4.6, "g(x) = x + 2", anchor="end", color=CORAL, bold=True)
    g.save(AP / "09-integrales" / "fig-area.svg", "Área entre f(x)=4−x² y g(x)=x+2 entre x=−2 y x=1")


def fig_normal():
    phi = lambda z: math.exp(-z * z / 2) / math.sqrt(2 * math.pi)
    g = Fig(-3.6, 3.6, -0.05, 0.47)
    g.region(phi, lambda z: 0, -3.4, 1.0, color=MINT)
    g.axes(xt=(-2, -1, 1, 2), yt=())
    g.curve(phi, -3.6, 3.6)
    g.line((1, 0), (1, phi(1)), width=2, dash="0")
    g.text(-2.3, 0.33, "Φ(1) = P(Z ≤ 1)", bold=True)
    g.text(-2.3, 0.33, "≈ 0,8413", dy=20, bold=True)
    g.text(2.1, 0.3, "Z ~ N(0, 1)", color=NAVY, bold=True)
    g.save(AP / "11-distribuciones" / "fig-normal.svg", "Campana de Gauss N(0,1) con el área Φ(1)=P(Z≤1) sombreada")


class Fig3:
    """Varios paneles con una perspectiva caballera sencilla (x hacia el lector, y a la derecha, z arriba)."""

    def __init__(self, n, w=210, h=200, scale=22):
        self.n, self.pw, self.ph, self.k = n, w, h, scale
        self.w, self.h = n * w, h + 34
        self.el = []
        self.i = 0

    def P(self, p):
        x, y, z = p
        X = self.i * self.pw + self.pw / 2 + self.k * (y - 0.5 * x)
        Y = 30 + self.ph / 2 - self.k * (z - 0.4 * x)
        return X, Y

    def panel(self, i, title):
        self.i = i
        if i:
            self.el.append(f'<line x1="{i*self.pw}" y1="10" x2="{i*self.pw}" y2="{self.h-10}" stroke="{INK}" stroke-width="1" stroke-dasharray="3 4"/>')
        self.el.append(f'<text x="{i*self.pw+self.pw/2:.1f}" y="{self.h-14}" text-anchor="middle" font-size="14" font-weight="700" fill="{INK}">{escape(title)}</text>')

    def plane(self, c, u, v, color=MINT, label=None):
        pts = [[c[k] + a * u[k] + b * v[k] for k in range(3)] for a, b in ((-1, -1), (1, -1), (1, 1), (-1, 1))]
        d = "M" + " L".join("%.1f,%.1f" % self.P(q) for q in pts) + " Z"
        self.el.append(f'<path d="{d}" fill="{color}" fill-opacity="0.75" stroke="{INK}" stroke-width="2"/>')
        if label:
            X, Y = self.P(pts[2])
            self.el.append(f'<text x="{X-6:.1f}" y="{Y+16:.1f}" text-anchor="end" font-size="14" font-style="italic" font-weight="700" fill="{INK}">{escape(label)}</text>')

    def seg(self, a, b, color=CORAL, width=3.5, dash=None, label=None, at=1.0):
        (X1, Y1), (X2, Y2) = self.P(a), self.P(b)
        dd = f' stroke-dasharray="{dash}"' if dash else ""
        self.el.append(f'<line x1="{X1:.1f}" y1="{Y1:.1f}" x2="{X2:.1f}" y2="{Y2:.1f}" stroke="{color}" stroke-width="{width}" stroke-linecap="round"{dd}/>')
        if label:
            X, Y = X1 + (X2 - X1) * at, Y1 + (Y2 - Y1) * at
            self.el.append(f'<text x="{X+7:.1f}" y="{Y-5:.1f}" font-size="14" font-style="italic" font-weight="700" fill="{color}">{escape(label)}</text>')

    def dot(self, p, color=YELLOW, label=None):
        X, Y = self.P(p)
        self.el.append(f'<circle cx="{X:.1f}" cy="{Y:.1f}" r="5" fill="{color}" stroke="{INK}" stroke-width="2"/>')
        if label:
            self.el.append(f'<text x="{X+8:.1f}" y="{Y-7:.1f}" font-size="13" font-weight="700" fill="{INK}">{escape(label)}</text>')

    def save(self, path, title):
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" width="{self.w}" height="{self.h}" font-family="{FONT}" role="img">'
               f'<title>{title}</title>'
               f'<rect x="1.5" y="1.5" width="{self.w-3}" height="{self.h-3}" fill="{PAPER}" stroke="{INK}" stroke-width="3"/>'
               + "".join(self.el) + "</svg>\n")
        path.write_text(svg)
        print("escrito", path.relative_to(ROOT))


H = (2.6, 0, 0), (0, 2.6, 0)          # plano horizontal: semiejes
V = (0, 2.4, 0), (0, 0, 2.2)          # plano vertical (contiene y, z)


def fig_dos_planos():
    g = Fig3(3)
    g.panel(0, "Secantes")
    g.plane((0, 0, 0), *H, color=MINT)
    g.plane((0, 0, 0), (0, 1.6, 0), (0, 0, 2.2), color=YELLOW)
    g.seg((0, -1.6, 0), (0, 1.6, 0), color=CORAL, label="r", at=1)
    g.panel(1, "Paralelos")
    g.plane((0, 0, -1.3), *H, color=MINT, label="π")
    g.plane((0, 0, 1.3), *H, color=YELLOW, label="π′")
    g.panel(2, "Coincidentes")
    g.plane((0, 0, 0), *H, color=MINT, label="π = π′")
    g.save(AP / "05-rectas-planos" / "fig-dos-planos.svg", "Posiciones relativas de dos planos: secantes (se cortan en una recta), paralelos y coincidentes")


def fig_recta_plano():
    g = Fig3(3)
    g.panel(0, "Secante")
    g.plane((0, 0, -0.6), *H)
    g.seg((0.4, -1.2, -2.4), (-0.2, 0.6, -0.6), color=CORAL, dash="5 5")
    g.seg((-0.2, 0.6, -0.6), (-0.6, 1.8, 0.6), color=CORAL, label="r")
    g.dot((-0.2, 0.6, -0.6), label="P")
    g.panel(1, "Paralela")
    g.plane((0, 0, -0.8), *H)
    g.seg((1.2, -2.2, 1.0), (-1.2, 2.2, 1.0), label="r")
    g.panel(2, "Contenida")
    g.plane((0, 0, 0), *H)
    g.seg((1.4, -2.0, 0), (-1.4, 2.0, 0), label="r")
    g.save(AP / "05-rectas-planos" / "fig-recta-plano.svg", "Posiciones relativas de recta y plano: secante en un punto, paralela y contenida")


def fig_dos_rectas():
    g = Fig3(4, w=190)
    g.panel(0, "Paralelas")
    g.seg((0, -2.2, 0.8), (0, 2.2, 0.8), label="r", at=1)
    g.seg((0, -2.2, -0.8), (0, 2.2, -0.8), color=NAVY, label="s", at=1)
    g.panel(1, "Coincidentes")
    g.seg((0, -2.2, 0), (0, 2.2, 0), color=NAVY, width=7)
    g.seg((0, -2.2, 0), (0, 2.2, 0), width=3, label="r = s", at=0.62)
    g.panel(2, "Se cortan")
    g.seg((0, -2.2, -1.6), (0, 2.2, 1.6), label="r", at=1)
    g.seg((0, -2.2, 1.6), (0, 2.2, -1.6), color=NAVY, label="s", at=1)
    g.dot((0, 0, 0), label="P")
    g.panel(3, "Se cruzan")
    g.plane((0, 0, -1.2), (2.4, 0, 0), (0, 2.2, 0), color=MINT)
    g.seg((0, -2.0, -1.2), (0, 2.0, -1.2), color=NAVY, label="s", at=1)
    g.seg((2.2, 0, 1.0), (-2.2, 0, 1.0), label="r", at=1)
    g.save(AP / "05-rectas-planos" / "fig-dos-rectas.svg", "Posiciones relativas de dos rectas: paralelas, coincidentes, se cortan en un punto y se cruzan (no coplanarias)")


def fig_simetrico():
    g = Fig3(2, w=260, h=220)
    g.panel(0, "Respecto de un plano")
    g.seg((0, 0.4, -0.2), (0, 0.4, -2.0), color=NAVY, width=2, dash="5 5")
    g.plane((0, 0, -0.2), *H)
    g.seg((0, 0.4, 1.6), (0, 0.4, -0.2), color=NAVY, width=2, dash="5 5")
    g.dot((0, 0.4, 1.6), color=CORAL, label="P")
    g.dot((0, 0.4, -0.2), label="H")
    g.dot((0, 0.4, -2.0), color=CORAL, label="P′")
    g.panel(1, "Respecto de una recta")
    g.seg((0, -2.6, -1.0), (0, 2.6, 1.0), label="r", at=1)
    g.seg((0, -0.9, 1.9), (0, 0.9, -1.9), color=NAVY, width=2, dash="5 5")
    g.dot((0, -0.9, 1.9), color=CORAL, label="P")
    g.dot((0, 0, 0), label="H")
    g.dot((0, 0.9, -1.9), color=CORAL, label="P′")
    g.save(AP / "05-rectas-planos" / "fig-simetrico.svg", "Simétrico de un punto: H es la proyección de P y el punto medio entre P y P′")


def panels(figs, titles, path, alt, gap=10):
    """Varias figuras Fig una al lado de otra con título, en un solo SVG."""
    w = sum(f.w for f in figs) + gap * (len(figs) + 1)
    h = max(f.h for f in figs) + 40 + gap
    out, x = [], gap
    for f, t in zip(figs, titles):
        out.append(f'<text x="{x + f.w / 2:.1f}" y="26" text-anchor="middle" font-size="16" font-weight="700" fill="{INK}">{escape(t)}</text>')
        out.append(f'<g transform="translate({x},34)"><rect x="1" y="1" width="{f.w - 2}" height="{f.h - 2}" fill="{PAPER}" stroke="{INK}" stroke-width="2"/>' + "".join(f.el) + "</g>")
        x += f.w + gap
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" font-family="{FONT}" role="img">'
           f'<title>{alt}</title>'
           f'<defs><marker id="f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="{INK}"/></marker></defs>'
           f'<rect x="1.5" y="1.5" width="{w-3}" height="{h-3}" fill="{PAPER}" stroke="{INK}" stroke-width="3"/>' + "".join(out) + "</svg>\n")
    path.write_text(svg)
    print("escrito", path.relative_to(ROOT))


def fig_discontinuidades():
    kw = dict(w=250, h=210, pad=20)
    a = Fig(-2, 2, -1, 3, **kw)       # evitable
    a.axes(xt=(), yt=())
    a.curve(lambda x: x * x + 1 if x != 0 else 0, -1.7, -0.03, color=NAVY); a.curve(lambda x: x * x + 1, 0.03, 1.7, color=NAVY)
    a.dot(0, 1, PAPER); a.dot(0, 2.2, CORAL)
    a.text(0, 1, "L", dx=-16, dy=22, bold=True); a.text(0, 2.2, "f(a)", dx=22, dy=5, bold=True)
    b = Fig(-2, 2, -2, 3, **kw)       # salto
    b.axes(xt=(), yt=())
    b.curve(lambda x: 0.5 * x + 0.3, -1.8, -0.02, color=NAVY); b.curve(lambda x: 0.5 * x + 2, 0.02, 1.8, color=NAVY)
    b.dot(0, 0.3, PAPER); b.dot(0, 2, CORAL)
    b.text(0, 0.3, "L₁", dx=20, dy=22, bold=True); b.text(0, 2, "L₂", dx=-16, dy=5, bold=True)
    c = Fig(-2, 2, -3, 3, **kw)       # asintótica
    c.axes(xt=(), yt=())
    c.line((0, -3), (0, 3), color=CORAL, width=2, dash="6 5")
    c.curve(lambda x: 0.5 / x, -1.9, -0.17, color=NAVY); c.curve(lambda x: 0.5 / x, 0.17, 1.9, color=NAVY)
    c.text(0, 2.0, "x = a", dx=-8, anchor="end", color=CORAL, bold=True)
    panels([a, b, c], ["Evitable", "Salto finito", "Salto infinito"], AP / "06-limites-continuidad" / "fig-discontinuidades.svg",
           "Tres tipos de discontinuidad: evitable (el límite L existe pero f(a) es otro valor), salto finito (límites laterales distintos) y salto infinito (asíntota vertical)")


def fig_tangente():
    f = lambda x: 0.35 * x * x + 0.5
    g = Fig(-0.8, 5.2, -0.4, 8.2, w=540, h=340)
    g.axes(xt=(), yt=())
    a, h = 1.4, 2.6
    m = 0.7 * a
    g.curve(f, -0.7, 5.1)
    sec = (f(a + h) - f(a)) / h
    g.line((-0.6, f(a) + sec * (-0.6 - a)), (5.1, f(a) + sec * (5.1 - a)), color=MINT, width=2.5, dash="0")
    g.line((-0.6, f(a) + m * (-0.6 - a)), (4.2, f(a) + m * (4.2 - a)), color=CORAL, width=3, dash="0")
    g.line((a, 0), (a, f(a)), dash="4 4", width=1.2); g.line((a + h, 0), (a + h, f(a + h)), dash="4 4", width=1.2)
    g.dot(a, f(a)); g.dot(a + h, f(a + h), YELLOW)
    g.text(a, 0, "a", dy=18, bold=True); g.text(a + h, 0, "a + h", dy=18, bold=True)
    g.text(-0.6, 7.2, "tangente: pendiente f′(a)", anchor="start", color=CORAL, bold=True, dy=-26)
    g.text(-0.6, 7.2, "secante: pendiente [f(a+h) − f(a)] / h", anchor="start", color="#2a8f82", bold=True, dy=-4)
    g.text(0.2, 4.6, "f", color=NAVY, bold=True, size=18)
    g.save(AP / "07-derivadas" / "fig-tangente.svg", "La secante por (a,f(a)) y (a+h,f(a+h)) se acerca a la tangente cuando h tiende a 0; la derivada es la pendiente de la tangente")


def fig_derivabilidad():
    kw = dict(w=250, h=200, pad=20)
    a = Fig(-2, 2, -0.5, 2.5, **kw)
    a.axes(xt=(), yt=())
    a.curve(lambda x: abs(x), -1.9, 1.9, color=NAVY, width=3)
    a.dot(0, 0)
    a.text(-1.0, 1.9, "f′ = −1", color=CORAL, bold=True); a.text(1.0, 1.9, "f′ = +1", color="#2a8f82", bold=True)
    b = Fig(-2, 2, -1, 3, **kw)
    b.axes(xt=(), yt=())
    b.curve(lambda x: x * x, -1.5, 1.5, color=NAVY, width=3)
    b.line((-1.8, 0), (1.8, 0), color=CORAL, width=2.5, dash="0")
    b.dot(0, 0)
    b.text(0, 0, "f′(0) = 0", dy=22, bold=True, color=CORAL)
    c = Fig(-2, 2, -1.2, 1.7, **kw)
    c.axes(xt=(), yt=())
    c.curve(lambda x: math.copysign(abs(x) ** (1 / 3), x), -1.9, 1.9, color=NAVY, width=3)
    c.line((0, -1.2), (0, 1.7), color=CORAL, width=2, dash="6 5")
    c.dot(0, 0)
    c.text(0, 1.45, "tangente vertical", dx=8, anchor="start", color=CORAL, bold=True, size=12)
    panels([a, b, c], ["Pico: no derivable", "Suave: derivable", "Vertical: no derivable"], AP / "07-derivadas" / "fig-derivabilidad.svg",
           "Tres puntos: un pico (|x| en 0, derivadas laterales distintas), un punto suave con tangente horizontal (x² en 0) y una tangente vertical (raíz cúbica en 0)")


def fig_rolle_vm():
    kw = dict(w=300, h=230, pad=24)
    f = lambda x: -(x - 1) * (x - 4) / 2 + 0.5
    a = Fig(0, 5, -0.5, 4, **kw)
    a.axes(xt=(), yt=())
    a.curve(f, 0.3, 4.7, color=NAVY)
    a.line((1, f(1)), (4, f(4)), color=MINT, width=2.5, dash="0")
    a.line((1.2, f(2.5)), (3.8, f(2.5)), color=CORAL, width=2.5, dash="0")
    a.dot(1, f(1), YELLOW); a.dot(4, f(4), YELLOW); a.dot(2.5, f(2.5), CORAL)
    a.text(1, -0.5, "a", dy=-6, bold=True); a.text(4, -0.5, "b", dy=-6, bold=True); a.text(2.5, -0.5, "c", dy=-6, bold=True)
    a.text(2.5, f(2.5), "f′(c) = 0", dy=-14, bold=True, color=CORAL)
    g = lambda x: 0.1 * x ** 3 - 0.5 * x * x + 1.1 * x + 0.5
    b = Fig(0, 5, -0.5, 5, **kw)
    b.axes(xt=(), yt=())
    ga, gb = 0.8, 4.4
    b.curve(g, 0.3, 4.7, color=NAVY)
    m = (g(gb) - g(ga)) / (gb - ga)
    b.line((ga, g(ga)), (gb, g(gb)), color=MINT, width=2.5, dash="0")
    # c con g'(c) = m  (g'(x) = 0.3x² − x + 1.1)
    A_, B_, C_ = 0.3, -1.0, 1.1 - m
    disc = B_ * B_ - 4 * A_ * C_
    cs = [r for r in ((-B_ - math.sqrt(disc)) / (2 * A_), (-B_ + math.sqrt(disc)) / (2 * A_)) if ga < r < gb]
    c0 = cs[0]
    b.line((c0 - 1.1, g(c0) - 1.1 * m), (c0 + 1.1, g(c0) + 1.1 * m), color=CORAL, width=2.5, dash="0")
    b.dot(ga, g(ga), YELLOW); b.dot(gb, g(gb), YELLOW); b.dot(c0, g(c0), CORAL)
    b.text(ga, -0.5, "a", dy=-6, bold=True); b.text(gb, -0.5, "b", dy=-6, bold=True); b.text(c0, -0.5, "c", dy=-6, bold=True)
    b.text(c0, g(c0), "paralela a la cuerda", dy=46, dx=-10, bold=True, color=CORAL, size=12)
    panels([a, b], ["Rolle: f(a) = f(b)", "Valor medio"], AP / "08-aplicaciones-derivada" / "fig-rolle-vm.svg",
           "Teorema de Rolle: con f(a)=f(b) hay un punto con tangente horizontal. Teorema del valor medio: hay un punto cuya tangente es paralela a la cuerda")


def fig_area_signo():
    f = lambda x: x ** 3 - 3 * x
    g = Fig(-2.2, 2.2, -2.6, 2.6, w=540, h=320)
    g.region(f, lambda x: 0, -S3, 0, color=MINT)
    g.region(f, lambda x: 0, 0, S3, color=CORAL)
    g.axes(xt=(), yt=())
    g.curve(f, -2.1, 2.1)
    g.text(-S3, 0, "−√3", dx=-22, dy=18, bold=True); g.text(S3, 0, "√3", dx=22, dy=-12, bold=True)
    g.text(-0.9, 0.9, "+", size=26, bold=True); g.text(0.9, -0.9, "−", size=26, bold=True)
    g.text(0.2, 2.35, "f(x) = x³ − 3x", anchor="start", bold=True)
    g.text(-2.1, -2.0, "∫ = área de arriba − área de abajo", anchor="start", bold=True, size=13)
    g.save(AP / "09-integrales" / "fig-area-signo.svg", "Integral definida como área con signo: la parte sobre el eje X suma y la parte bajo el eje resta; para el área hay que partir en los cortes con el eje")


def fig_simetria_normal():
    phi = lambda z: math.exp(-z * z / 2) / math.sqrt(2 * math.pi)
    kw = dict(w=290, h=210, pad=20)
    a = Fig(-3.4, 3.4, -0.05, 0.47, **kw)
    a.region(phi, lambda z: 0, -3.3, -1, color=CORAL)
    a.axes(xt=(), yt=())
    a.curve(phi, -3.4, 3.4)
    a.line((-1, 0), (-1, phi(1)), dash="0", width=2); a.text(-1, 0, "−z", dy=18, bold=True)
    a.text(0, 0.36, "P(Z < −z)", bold=True)
    b = Fig(-3.4, 3.4, -0.05, 0.47, **kw)
    b.region(phi, lambda z: 0, 1, 3.3, color=CORAL)
    b.axes(xt=(), yt=())
    b.curve(phi, -3.4, 3.4)
    b.line((1, 0), (1, phi(1)), dash="0", width=2); b.text(1, 0, "z", dy=18, bold=True)
    b.text(0, 0.36, "P(Z > z) = 1 − Φ(z)", bold=True)
    panels([a, b], ["Área a la izquierda de −z", "Área a la derecha de z"], AP / "11-distribuciones" / "fig-simetria-normal.svg",
           "Por simetría de la campana, el área a la izquierda de −z es igual que el área a la derecha de z: Φ(−z)=1−Φ(z)")


def fig_regla_68():
    phi = lambda z: math.exp(-z * z / 2) / math.sqrt(2 * math.pi)
    g = Fig(-3.6, 3.6, -0.07, 0.47, w=560, h=300)
    g.region(phi, lambda z: 0, -3, 3, color="#BFE8E1")
    g.region(phi, lambda z: 0, -2, 2, color=MINT)
    g.region(phi, lambda z: 0, -1, 1, color=YELLOW)
    g.axes(xt=(), yt=())
    g.curve(phi, -3.6, 3.6)
    for k, t in zip((-3, -2, -1, 0, 1, 2, 3), ("μ−3σ", "μ−2σ", "μ−σ", "μ", "μ+σ", "μ+2σ", "μ+3σ")):
        g.text(k, 0, t, dy=18, size=12, bold=True)
    g.text(0, 0.21, "≈ 68 %", bold=True, size=15)
    g.text(1.55, 0.045, "≈ 95 %", bold=True, size=12)
    g.text(2.65, 0.12, "≈ 99,7 %", bold=True, size=12, anchor="start")
    g.save(AP / "11-distribuciones" / "fig-regla-68.svg", "Regla 68-95-99,7: probabilidad dentro de uno, dos y tres desviaciones típicas de la media")


def _lens(cx1, cx2, r, n=60):
    d = cx2 - cx1
    a = math.acos(d / (2 * r))
    pts = [(cx1 + r * math.cos(t), r * math.sin(t)) for t in [(-a + 2 * a * i / n) for i in range(n + 1)]]
    pts += [(cx2 - r * math.cos(t), r * math.sin(t)) for t in [(a - 2 * a * i / n) for i in range(n + 1)]]
    return pts


def fig_venn():
    kw = dict(w=250, h=190, pad=10)
    cA, cB, r = -0.65, 0.65, 1.1

    def base(fill_circles=None, lens=False, universo=False):
        g = Fig(-2.4, 2.4, -1.7, 1.7, **kw)
        if universo:
            g.el.append(f'<rect x="{g.X(-2.3):.1f}" y="{g.Y(1.6):.1f}" width="{g.X(2.3) - g.X(-2.3):.1f}" height="{g.Y(-1.6) - g.Y(1.6):.1f}" fill="{CORAL}" fill-opacity="0.55" stroke="none"/>')
        for c, col in ((cA, fill_circles), (cB, fill_circles)):
            g.el.append(f'<circle cx="{g.X(c):.1f}" cy="{g.Y(0):.1f}" r="{(g.X(r) - g.X(0)):.1f}" fill="{col or PAPER}" stroke="none"/>')
        if lens:
            g.el.append(f'<path d="{g.path(_lens(cA, cB, r))} Z" fill="{YELLOW}" stroke="none"/>')
        for c in (cA, cB):
            g.el.append(f'<circle cx="{g.X(c):.1f}" cy="{g.Y(0):.1f}" r="{(g.X(r) - g.X(0)):.1f}" fill="none" stroke="{INK}" stroke-width="2.5"/>')
        g.el.append(f'<rect x="{g.X(-2.3):.1f}" y="{g.Y(1.6):.1f}" width="{g.X(2.3) - g.X(-2.3):.1f}" height="{g.Y(-1.6) - g.Y(1.6):.1f}" fill="none" stroke="{INK}" stroke-width="1.5"/>')
        g.text(cA - 0.55, 0, "A", bold=True, size=18, dy=6); g.text(cB + 0.55, 0, "B", bold=True, size=18, dy=6)
        return g
    panels([base(fill_circles=YELLOW), base(lens=True), base(universo=True)], ["A ∪ B", "A ∩ B", "Ni A ni B: Ā ∩ B̄"],
           AP / "10-probabilidad" / "fig-venn.svg", "Diagramas de Venn: unión de A y B, intersección de A y B y el complemento de la unión (ni A ni B)")


def arrow(g, p, q, color=NAVY, width=3, label=None, dx=0, dy=0):
    """Flecha de p a q en coordenadas de la figura (punta rellena)."""
    x1, y1, x2, y2 = g.X(p[0]), g.Y(p[1]), g.X(q[0]), g.Y(q[1])
    ang = math.atan2(y2 - y1, x2 - x1)
    hx, hy = x2 - 10 * math.cos(ang), y2 - 10 * math.sin(ang)
    g.el.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{hx:.1f}" y2="{hy:.1f}" stroke="{color}" stroke-width="{width}" stroke-linecap="round"/>')
    g.el.append(f'<path d="M{x2:.1f},{y2:.1f} L{x2 - 13 * math.cos(ang - 0.4):.1f},{y2 - 13 * math.sin(ang - 0.4):.1f} L{x2 - 13 * math.cos(ang + 0.4):.1f},{y2 - 13 * math.sin(ang + 0.4):.1f} Z" fill="{color}"/>')
    if label:
        g.el.append(f'<text x="{(x1 + x2) / 2 + dx:.1f}" y="{(y1 + y2) / 2 + dy:.1f}" text-anchor="middle" font-size="15" font-style="italic" font-weight="700" fill="{color}">{escape(label)}</text>')


def fig_sistemas_2d():
    kw = dict(w=250, h=210, pad=18)
    a = Fig(-3, 3, -3, 3, **kw)
    a.axes()
    a.curve(lambda x: 0.5 * x + 0.5, -3, 3, color=NAVY, width=3); a.curve(lambda x: -x + 2, -3, 3, color=CORAL, width=3)
    a.dot(1, 1, YELLOW)
    b = Fig(-3, 3, -3, 3, **kw)
    b.axes()
    b.curve(lambda x: 0.5 * x + 1.2, -3, 3, color=NAVY, width=3); b.curve(lambda x: 0.5 * x - 0.8, -3, 3, color=CORAL, width=3)
    c = Fig(-3, 3, -3, 3, **kw)
    c.axes()
    c.curve(lambda x: 0.5 * x + 0.5, -3, 3, color=CORAL, width=7); c.curve(lambda x: 0.5 * x + 0.5, -3, 3, color=NAVY, width=2.5)
    panels([a, b, c], ["Compatible determinado", "Incompatible", "Compatible indeterminado"], AP / "03-sistemas-ecuaciones-lineales" / "fig-sistemas-2d.svg",
           "Un sistema de dos ecuaciones con dos incógnitas: dos rectas que se cortan en un punto (solución única), dos rectas paralelas (sin solución) y dos rectas iguales (infinitas soluciones)")


def fig_det_area():
    u, v = (3, 1), (1, 2.2)
    g = Fig(-0.8, 5, -0.8, 4, w=520, h=320)
    g.el.append(f'<path d="{g.path([(0, 0), u, (u[0] + v[0], u[1] + v[1]), v])} Z" fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>')
    g.axes()
    arrow(g, (0, 0), u, NAVY, 3.5, "u", dy=18); arrow(g, (0, 0), v, CORAL, 3.5, "v", dx=-12)
    g.text(2.0, 1.55, "|det(u, v)| = área", bold=True, size=15)
    g.text(2.0, 1.55, "del paralelogramo", bold=True, size=14, dy=18)
    g.save(AP / "02-determinantes" / "fig-det-area.svg", "El valor absoluto del determinante de dos vectores es el área del paralelogramo que forman")


def fig_vectores_2d():
    kw = dict(w=270, h=230, pad=18)
    a = Fig(-0.8, 5.2, -2.2, 3.6, **kw)
    u, v = (3, 0.7), (1, 2.4)
    a.el.append(f'<path d="{a.path([(0, 0), u, (4, 3.1), v])} Z" fill="{YELLOW}" fill-opacity="0.45" stroke="none"/>')
    a.line(u, (4, 3.1), dash="5 4", width=1.5); a.line(v, (4, 3.1), dash="5 4", width=1.5)
    arrow(a, (0, 0), u, NAVY, 3, "u", dy=18); arrow(a, (0, 0), v, CORAL, 3, "v", dx=-12)
    arrow(a, (0, 0), (4, 3.1), "#2a8f82", 3.5)
    a.text(4, 3.1, "u + v", dx=-6, dy=-12, color="#2a8f82", bold=True, size=15)
    arrow(a, v, u, "#7A5BA6", 2.5)
    a.text(3.2, 0.2, "u − v", color="#7A5BA6", bold=True, size=15, dy=26)
    b = Fig(-0.8, 5.2, -1, 3.8, **kw)
    w = (4.2, 0); t = (2.6, 2.2)
    k = (t[0] * w[0]) / (w[0] ** 2)
    b.line(t, (t[0], 0), dash="5 4", width=1.5)
    arrow(b, (0, 0), w, NAVY, 3, "v", dx=70, dy=20)
    arrow(b, (0, 0), t, CORAL, 3, "u", dx=-14, dy=-6)
    arrow(b, (0, 0), (t[0], 0), "#2a8f82", 5)
    b.text(1.3, 0, "proy", dy=22, bold=True, color="#2a8f82", size=13)
    b.text(0.75, 0.2, "α", bold=True, size=16)
    b.text(3.2, 2.9, "u · v = |u||v| cos α", anchor="start", bold=True, size=13, dx=-80)
    panels([a, b], ["Suma y resta", "Producto escalar y proyección"], AP / "04-vectores-espacio" / "fig-vectores-2d.svg",
           "Suma de vectores por la regla del paralelogramo, resta, y producto escalar como producto de módulos por el coseno del ángulo, con la proyección de u sobre v")


def fig_vectorial_mixto():
    g = Fig3(2, w=290, h=240, scale=40)
    g.panel(0, "Producto vectorial: área y perpendicular")
    u, v = (2.0, 0, 0), (0, 2.2, 0)
    g.plane((1.0, 1.1, 0), (1.0, 0, 0), (0, 1.1, 0), color=MINT)
    g.seg((0, 0, 0), u, color=NAVY, width=3.5, label="u", at=1.18); g.seg((0, 0, 0), v, color=CORAL, width=3.5, label="v")
    g.seg((0, 0, 0), (0, 0, 2.2), color="#7A5BA6", width=3.5, label="u × v")
    g.dot((0, 0, 0))
    g.panel(1, "Producto mixto: volumen")
    u, v, w = (1.8, 0, 0), (0, 2.0, 0), (0, 0.4, 1.8)
    add = lambda *ps: tuple(sum(q[i] for q in ps) for i in range(3))
    O = (0, 0, 0)
    for a_, b_ in [(u, add(u, v)), (v, add(u, v)), (u, add(u, w)), (w, add(u, w)), (v, add(v, w)), (w, add(v, w)),
                   (add(u, v), add(u, v, w)), (add(u, w), add(u, v, w)), (add(v, w), add(u, v, w))]:
        g.seg(a_, b_, color=NAVY, width=2.2)
    g.seg(O, u, color=NAVY, width=3.5, label="u", at=1.18); g.seg(O, v, color=CORAL, width=3.5, label="v"); g.seg(O, w, color="#2a8f82", width=3.5, label="w")
    g.dot(O)
    g.save(AP / "04-vectores-espacio" / "fig-vectorial-mixto.svg", "El producto vectorial u×v es perpendicular a u y v y su módulo es el área del paralelogramo; el valor absoluto del producto mixto es el volumen del paralelepípedo")


def _ent(i, j, x, y, color=INK, size=16):
    """Elemento a_ij de una matriz como texto SVG con subíndice (tspan; sin caracteres Unicode de subíndice)."""
    return (f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="middle" font-size="{size}" font-style="italic" fill="{color}">a'
            f'<tspan dy="4" font-size="{size - 5}" font-style="normal">{i}{j}</tspan></text>')


def fig_sarrus():
    """Regla de Sarrus: se repiten las dos primeras columnas; diagonales descendentes suman y ascendentes restan."""
    w, h = 290, 214
    x0, dx, y0, dy = 53, 46, 62, 40

    def panel(signo):
        g = Fig(0, 1, 0, 1, w=w, h=h, pad=0)
        e = g.el
        e.append(f'<rect x="{x0 + 3 * dx - dx / 2 + 4:.1f}" y="{y0 - 26}" width="{2 * dx - 8}" height="{3 * dy - 4}" fill="{MINT}" fill-opacity="0.35" stroke="none"/>')
        col = NAVY if signo > 0 else CORAL
        for k in range(3):
            if signo > 0:
                pts = [(k, 0), (k + 1, 1), (k + 2, 2)]
            else:
                pts = [(k + 2, 0), (k + 1, 1), (k, 2)]
            (ax, ay), (bx, by) = pts[0], pts[2]
            ax, ay, bx, by = x0 + ax * dx, y0 + ay * dy - 5, x0 + bx * dx, y0 + by * dy - 5
            ux, uy = (bx - ax), (by - ay)
            n = math.hypot(ux, uy)
            ux, uy = ux / n * 14, uy / n * 14
            e.append(f'<line x1="{ax - ux:.1f}" y1="{ay - uy:.1f}" x2="{bx + ux:.1f}" y2="{by + uy:.1f}" stroke="{col}" stroke-width="9" stroke-linecap="round" stroke-opacity="0.32"/>')
        for r in range(3):
            for c in range(5):
                e.append(_ent(r + 1, c % 3 + 1, x0 + c * dx, y0 + r * dy, color=INK if c < 3 else "#2a8f82"))
        for xb, sg in ((x0 - dx / 2 + 2, 1), (x0 + 2 * dx + dx / 2 - 2, -1)):
            e.append(f'<path d="M{xb + sg * 7:.1f},{y0 - 28} L{xb:.1f},{y0 - 28} L{xb:.1f},{y0 + 2 * dy + 12} L{xb + sg * 7:.1f},{y0 + 2 * dy + 12}" fill="none" stroke="{INK}" stroke-width="2.5"/>')
        if signo > 0:
            e.append(f'<text x="{w / 2:.0f}" y="{h - 16}" text-anchor="middle" font-size="13" font-weight="700" fill="{NAVY}">+ a11·a22·a33 + a12·a23·a31 + a13·a21·a32</text>')
        else:
            e.append(f'<text x="{w / 2:.0f}" y="{h - 16}" text-anchor="middle" font-size="13" font-weight="700" fill="{CORAL}">− a13·a22·a31 − a11·a23·a32 − a12·a21·a33</text>')
        return g
    panels([panel(1), panel(-1)], ["Diagonales que suman", "Diagonales que restan"], APC / "01-matrices-determinantes" / "fig-sarrus.svg",
           "Regla de Sarrus: se repiten a la derecha las dos primeras columnas; las tres diagonales descendentes suman y las tres ascendentes restan")


def fig_producto_matrices():
    """Producto fila por columna con el ejemplo de ventas e ingresos del tema 1 (Ciencias Sociales)."""
    w, h = 560, 190
    g = Fig(0, 1, 0, 1, w=w, h=h, pad=0)
    e = g.el
    V = [[40, 25, 10], [30, 35, 20]]
    pr = [3, 2, 4]
    res = [210, 240]
    xv, xp, xr = (70, 118, 166), 262, 372
    y0, dy = 78, 44
    ypr = (y0 - 6, y0 + 20, y0 + 46)   # los 3 precios, repartidos en el alto de la matriz
    yt, yb = y0 - 30, y0 + dy + 14
    e.append(f'<rect x="{xv[0] - 22}" y="{y0 - 24}" width="{xv[2] - xv[0] + 44}" height="34" fill="{YELLOW}" stroke="none"/>')
    e.append(f'<rect x="{xp - 22}" y="{yt + 4}" width="44" height="{yb - yt - 8}" fill="{MINT}" fill-opacity="0.55" stroke="none"/>')
    e.append(f'<rect x="{xr - 30}" y="{y0 - 24}" width="60" height="34" fill="{CORAL}" fill-opacity="0.6" stroke="none"/>')

    def brk(xl, xr_):
        for xb, sg in ((xl, 1), (xr_, -1)):
            e.append(f'<path d="M{xb + sg * 7},{yt} L{xb},{yt} L{xb},{yb} L{xb + sg * 7},{yb}" fill="none" stroke="{INK}" stroke-width="2.5"/>')
    brk(xv[0] - 34, xv[2] + 34); brk(xp - 30, xp + 30); brk(xr - 40, xr + 40)
    for r in range(2):
        for c in range(3):
            e.append(f'<text x="{xv[c]}" y="{y0 + r * dy}" text-anchor="middle" font-size="18" fill="{INK}">{V[r][c]}</text>')
        e.append(f'<text x="{xr}" y="{y0 + r * dy}" text-anchor="middle" font-size="18" font-weight="700" fill="{INK}">{res[r]}</text>')
    for v, yy in zip(pr, ypr):
        e.append(f'<text x="{xp}" y="{yy}" text-anchor="middle" font-size="18" fill="{INK}">{v}</text>')
    e.append(f'<text x="{(xv[2] + 34 + xp - 30) / 2:.0f}" y="{y0 + 14}" text-anchor="middle" font-size="26" font-weight="700" fill="{INK}">·</text>')
    e.append(f'<text x="{(xp + 30 + xr - 40) / 2:.0f}" y="{y0 + 14}" text-anchor="middle" font-size="26" font-weight="700" fill="{INK}">=</text>')
    for x, t in ((xv[1], "V (2×3)"), (xp, "p (3×1)"), (xr, "V·p (2×1)")):
        e.append(f'<text x="{x}" y="{yt - 8}" text-anchor="middle" font-size="13" font-weight="700" fill="{INK}">{t}</text>')
    e.append(f'<text x="{w / 2:.0f}" y="{h - 22}" text-anchor="middle" font-size="14" font-weight="700" fill="{INK}">fila 1 de V × columna de p:  40·3 + 25·2 + 10·4 = 210</text>')
    g.save(APC / "01-matrices-determinantes" / "fig-producto-matrices.svg",
           "Producto de una matriz 2×3 por una columna 3×1: el primer elemento del resultado es la fila 1 por la columna")


def fig_equilibrio():
    """Punto de equilibrio de oferta y demanda: sistema 2×2 compatible determinado (tema 02 CCSS)."""
    g = Fig(-1.2, 17, -12, 138, w=520, h=330)
    g.axes()
    g.curve(lambda p: 120 - 4 * p, 0, 17, color=CORAL, width=3.5)
    g.curve(lambda p: 20 + 6 * p, 0, 17, color=NAVY, width=3.5)
    g.line((10, 0), (10, 80), color=INK, width=1.5); g.line((0, 80), (10, 80), color=INK, width=1.5)
    g.dot(10, 80, YELLOW)
    g.text(10, 0, "10", dy=18, bold=True); g.text(0, 80, "80", dx=-10, dy=4, anchor="end", bold=True)
    g.text(0.7, 126, "Demanda  q = 120 − 4p", anchor="start", color="#C4413A", bold=True, size=14)
    g.text(10.6, 112, "Oferta  q = 20 + 6p", anchor="start", color=NAVY, bold=True, size=14, dy=-4)
    g.text(10.6, 34, "equilibrio (10, 80)", anchor="start", bold=True, size=14)
    g.text(17, 0, "precio p (€)", anchor="end", dy=-8, size=13)
    g.text(0, 138, "cantidad q", anchor="start", dx=10, dy=4, size=13)
    g.save(APC / "02-sistemas-ecuaciones-lineales" / "fig-equilibrio.svg", "Rectas de oferta y demanda que se cortan en el punto de equilibrio, precio 10 y cantidad 80")


def _region(g, pts, color=YELLOW, opacity=0.75):
    """Región factible: polígono de vértices pts (coordenadas de la figura)."""
    g.el.append(f'<path d="{g.path(pts)} Z" fill="{color}" fill-opacity="{opacity}" stroke="{INK}" stroke-width="2"/>')


def _recta(g, p1, p2, color, dash="1 0", width=3):
    g.line(p1, p2, color=color, width=width, dash=dash)


def fig_region_panaderia():
    """Ejemplo 1 de programación lineal (CCSS, tema 03): región acotada con cuatro vértices y recta de nivel."""
    g = Fig(-3, 50, -3, 44, w=520, h=370)
    _region(g, [(0, 10), (35, 10), (30, 20), (0, 35)])
    g.axes(xt=(10, 20, 30, 40), yt=(10, 20, 30, 40))
    _recta(g, (18, 44), (40, 0), CORAL)
    _recta(g, (0, 35), (50, 10), NAVY)
    _recta(g, (0, 10), (50, 10), "#2a8f82", dash="7 5", width=2.5)
    g.line((46, 0), (10.8, 44), color=INK, width=1.5, dash="5 4")
    for (a, b), t, dx, dy in (((0, 10), "A (0, 10)", 12, 20), ((35, 10), "D (35, 10)", 0, 24), ((30, 20), "C (30, 20)", 10, -12), ((0, 35), "B (0, 35)", 12, -8)):
        g.dot(a, b, YELLOW if (a, b) != (30, 20) else CORAL)
        g.text(a, b, t, dx=dx, dy=dy, anchor="end" if t.startswith("D") else "start", bold=True, size=14)
    g.text(19.2, 41, "2x + y = 80", anchor="start", color="#C4413A", bold=True, size=13, dx=4)
    g.text(49, 14, "x + 2y = 70", anchor="end", color=NAVY, bold=True, size=13, dy=-4)
    g.text(49.5, 10, "y = 10", anchor="end", color="#2a8f82", bold=True, size=13, dy=18)
    g.text(12.4, 40.6, "F = 2300", anchor="end", bold=True, size=13)
    g.text(50, 0, "x", anchor="end", dy=-8, size=13); g.text(0, 44, "y", anchor="start", dx=8, dy=4, size=13)
    g.save(APC / "03-programacion-lineal" / "fig-region-panaderia.svg", "Región factible de la panadería con vértices A, B, C y D y la recta de nivel F igual a 2300 que pasa por C")


def fig_region_comedor():
    """Ejemplo 2 (CCSS, tema 03): región no acotada de un problema de minimizar."""
    g = Fig(-1, 13, -1.5, 16, w=520, h=370)
    _region(g, [(0, 12), (2, 6), (8, 0), (13, 0), (13, 16), (0, 16)])
    g.axes(xt=(2, 4, 6, 8, 10, 12), yt=(4, 8, 12, 16))
    _recta(g, (-1, 15), (4.5, -1.5), CORAL)
    _recta(g, (-1, 9), (9.5, -1.5), NAVY)
    g.line((0, 26 / 3), (6.5, 0), color=INK, width=1.5, dash="5 4")
    for (a, b), t, dx, dy in (((0, 12), "P (0, 12): 36", 10, -2), ((2, 6), "Q (2, 6): 26", 10, -10), ((8, 0), "R (8, 0): 32", 6, -12)):
        g.dot(a, b, CORAL if (a, b) == (2, 6) else YELLOW)
        g.text(a, b, t, dx=dx, dy=dy, anchor="start", bold=True, size=14)
    g.text(0.5, 14.5, "3x + y = 12", anchor="start", color="#C4413A", bold=True, size=13)
    g.text(9.7, 1.8, "x + y = 8", anchor="start", color=NAVY, bold=True, size=13)
    g.text(0.8, 1.6, "F = 26", anchor="start", bold=True, size=13)
    g.text(13, 0, "x", anchor="end", dy=-8, size=13); g.text(0, 16, "y", anchor="start", dx=16, dy=4, size=13)
    g.save(APC / "03-programacion-lineal" / "fig-region-comedor.svg", "Región factible no acotada del comedor social con vértices P, Q y R; el mínimo del coste está en Q")


def fig_lp_casos():
    kw = dict(w=270, h=230, pad=14)
    a = Fig(-3, 50, -3, 44, **kw)
    _region(a, [(0, 10), (35, 10), (30, 20), (0, 35)])
    a.axes()
    a.line((30, 20), (35, 10), color=CORAL, width=7, dash="1 0")
    a.line((40, 0), (18, 44), color=INK, width=1.5, dash="5 4")   # 40x + 20y = 1600, paralela al lado CD
    a.dot(30, 20, YELLOW); a.dot(35, 10, YELLOW)
    a.text(30, 20, "C", dx=-12, dy=-8, bold=True, size=15); a.text(35, 10, "D", dx=10, dy=-8, bold=True, size=15)
    a.text(3, 4.5, "F = 1600", anchor="start", bold=True, size=12)
    b = Fig(-1, 13, -1.5, 16, **kw)
    _region(b, [(0, 12), (2, 6), (8, 0), (13, 0), (13, 16), (0, 16)])
    b.axes()
    arrow(b, (5, 5), (9.5, 11), NAVY, 3.5)
    b.text(6, 10.5, "F crece", anchor="end", bold=True, size=13, color=NAVY)
    b.text(6, 8.7, "sin límite", anchor="end", bold=True, size=13, color=NAVY)
    panels([a, b], ["Óptimo en todo un lado", "Región no acotada: sin máximo"], APC / "03-programacion-lineal" / "fig-lp-casos.svg",
           "Dos casos especiales: una recta de nivel paralela a un lado de la región, que da infinitas soluciones óptimas, y una región no acotada donde la función objetivo crece sin límite")


def _hueco(g, x, y):
    """Punto abierto (el valor no pertenece a ese tramo)."""
    g.el.append(f'<circle cx="{g.X(x):.1f}" cy="{g.Y(y):.1f}" r="5.5" fill="{PAPER}" stroke="{INK}" stroke-width="2.2"/>')


def fig_polinomicas():
    """Tema 04 CCSS: recta de costes e ingresos (umbral de rentabilidad) y parábola de ingresos."""
    kw = dict(w=270, h=240, pad=16)
    a = Fig(-24, 138, -700, 8300, **kw)
    a.axes(xt=(40, 80, 120), yt=(2000, 4000, 6000))
    a.curve(lambda x: 60 * x, 0, 138, color=CORAL, width=3.5)
    a.curve(lambda x: 2000 + 35 * x, 0, 138, color=NAVY, width=3.5)
    a.line((80, 0), (80, 4800), width=1.3); a.dot(80, 4800, YELLOW)
    a.text(80, 4800, "(80; 4800)", dx=-6, dy=-14, anchor="end", bold=True, size=12)
    a.text(112, 6720, "I", color="#C4413A", bold=True, size=15, dx=8, dy=-16)
    a.text(112, 5920, "C", color=NAVY, bold=True, size=15, dx=8, dy=22)
    b = Fig(-4, 34, -140, 1060, **kw)
    b.axes(xt=(10, 20, 30), yt=(300, 600, 900))
    b.curve(lambda q: 120 * q - 4 * q * q, 0, 30, color=CORAL, width=3.5)
    b.line((15, 0), (15, 900), width=1.3); b.dot(15, 900, YELLOW)
    b.text(15, 900, "vértice (15, 900)", dy=-12, bold=True, size=12)
    panels([a, b], ["Recta: umbral de rentabilidad", "Parábola: ingreso I(p)"], APC / "04-funciones" / "fig-polinomicas.svg",
           "A la izquierda, la recta de ingresos y la de costes se cortan en el umbral de rentabilidad de 80 unidades. A la derecha, la parábola de ingresos con su vértice en precio 15 e ingreso 900")


def fig_racional():
    """Tema 04 CCSS: coste medio (hipérbola con asíntotas) y función racional (x+1)/(x-1)."""
    kw = dict(w=270, h=240, pad=16)
    a = Fig(-10, 108, -8, 88, **kw)
    a.axes(xt=(25, 50, 75, 100), yt=(20, 40, 60, 80))
    a.line((0, 20), (108, 20), color=INK, width=1.5)
    a.curve(lambda x: 20 + 500 / x, 6, 108, color=CORAL, width=3.5)
    a.text(104, 20, "y = 20", anchor="end", dy=18, bold=True, size=12)
    a.text(95, 42, "Cm(x) = 20 + 500/x", anchor="end", dy=-6, bold=True, size=12, color="#C4413A")
    b = Fig(-5, 7, -5, 6, **kw)
    b.axes(xt=(-4, -2, 2, 4, 6), yt=(-4, -2, 2, 4))
    b.line((1, -5), (1, 6), color=INK, width=1.5); b.line((-5, 1), (7, 1), color=INK, width=1.5)
    f = lambda x: (x + 1) / (x - 1)
    b.curve(f, -5, 0.9995, color=NAVY, width=3.5); b.curve(f, 1.0005, 7, color=NAVY, width=3.5)
    b.dot(0, -1, YELLOW); b.dot(-1, 0, YELLOW)
    b.text(1, 5.3, "x = 1", anchor="end", dx=-6, bold=True, size=12); b.text(-4.8, 1, "y = 1", anchor="start", dy=-8, bold=True, size=12)
    panels([a, b], ["Coste medio de producción", "f(x) = (x + 1)/(x − 1)"], APC / "04-funciones" / "fig-racional.svg",
           "A la izquierda el coste medio, una hipérbola que se acerca a la asíntota horizontal y igual a 20. A la derecha la función racional x más 1 entre x menos 1, con asíntotas vertical x igual a 1 y horizontal y igual a 1")


def fig_exp_log():
    """Tema 04 CCSS: exponenciales creciente y decreciente, y logaritmo como inversa de la exponencial."""
    a = Fig(-3.2, 3.2, -1.2, 8.4, w=270, h=240, pad=16)
    a.axes(xt=(-2, -1, 1, 2), yt=(2, 4, 6))
    a.curve(lambda x: 2 ** x, -3.2, 3.2, color=NAVY, width=3.5)
    a.curve(lambda x: 0.5 ** x, -3.2, 3.2, color=CORAL, width=3.5)
    a.dot(0, 1, YELLOW)
    a.text(1.9, 7.4, 'y = 2<tspan dy="-6" font-size="9">x</tspan>', anchor="end", color=NAVY, bold=True, size=13, raw=True)
    a.text(-1.85, 4.0, '(1/2)<tspan dy="-6" font-size="9">x</tspan>', anchor="start", color="#C4413A", bold=True, size=13, raw=True)
    b = Fig(-2, 7.2, -2, 7.2, w=240, h=240, pad=16)
    b.axes(xt=(2, 4, 6), yt=(2, 4, 6))
    b.line((-2, -2), (7.2, 7.2), color=INK, width=1.5)
    b.curve(lambda x: 2 ** x, -2, 2.8, color=NAVY, width=3.5)
    b.curve(lambda x: math.log2(x), 0.02, 7.2, color=CORAL, width=3.5)
    b.dot(0, 1, YELLOW); b.dot(1, 0, YELLOW)
    b.text(0.3, 6.8, 'y = 2<tspan dy="-6" font-size="9">x</tspan>', anchor="start", color=NAVY, bold=True, size=13, raw=True)
    b.text(7.1, 3.7, 'y = log<tspan dy="4" font-size="9">2</tspan><tspan dy="-4"> x</tspan>', anchor="end", color="#C4413A", bold=True, size=13, raw=True)
    b.text(6.4, 7.0, "y = x", anchor="end", bold=True, size=12, dx=-6, dy=18)
    panels([a, b], ["Exponencial: crece o decrece", "El logaritmo es la inversa"], APC / "04-funciones" / "fig-exp-log.svg",
           "A la izquierda las exponenciales 2 elevado a x, creciente, y un medio elevado a x, decreciente, que pasan por el punto (0,1). A la derecha la exponencial y el logaritmo en base 2, simétricos respecto de la recta y igual a x")


def fig_trozos():
    """Tema 04 CCSS: tarifa de agua (continua, a trozos) y tarifa de envío (con saltos)."""
    kw = dict(w=270, h=240, pad=16)
    a = Fig(-3, 32, -4, 48, **kw)
    a.axes(xt=(10, 20, 30), yt=(10, 20, 30, 40))
    a.curve(lambda x: 5 + 0.9 * x, 0, 10, color=NAVY, width=3.5)
    a.curve(lambda x: 1.5 * x - 1, 10, 32, color=CORAL, width=3.5)
    a.line((10, 0), (10, 14), width=1.3); a.dot(10, 14, YELLOW)
    a.dot(0, 5, YELLOW)
    a.text(0, 5, "5", dx=14, dy=18, bold=True, size=12)
    a.text(10, 14, "(10, 14)", dx=-8, dy=-10, anchor="end", bold=True, size=12)
    a.text(20, 29, "1,5x − 1", color="#C4413A", bold=True, size=12, dx=-10, dy=30)
    b = Fig(-1, 8.6, -1.2, 12.5, **kw)
    b.axes(xt=(2, 5, 8), yt=(4, 7, 10))
    for (x0, x1, v) in ((0, 2, 4), (2, 5, 7), (5, 8.4, 10)):
        b.line((x0, v), (x1, v), color=NAVY, width=3.5, dash="1 0")
        _hueco(b, x0, v)
    for x1, v in ((2, 4), (5, 7)):
        b.dot(x1, v, NAVY)
    b.line((8.4, 10), (8.4, 10), color=NAVY, width=3.5, dash="1 0")
    b.text(8.5, 10, "→", anchor="end", dy=-8, bold=True, size=14)
    panels([a, b], ["Tarifa de agua (continua)", "Tarifa de envío (con saltos)"], APC / "04-funciones" / "fig-trozos.svg",
           "A la izquierda, la factura del agua: dos rectas que se unen en el punto (10,14). A la derecha, el precio de un envío según el peso: tres tramos horizontales con saltos en 2 y 5 kilos")


if __name__ == "__main__":
    fig_asintotas(); fig_monotonia(); fig_area(); fig_normal()
    fig_dos_planos(); fig_recta_plano(); fig_dos_rectas(); fig_simetrico()
    fig_discontinuidades(); fig_tangente(); fig_derivabilidad(); fig_rolle_vm(); fig_area_signo()
    fig_simetria_normal(); fig_regla_68(); fig_venn()
    fig_sistemas_2d(); fig_det_area(); fig_vectores_2d(); fig_vectorial_mixto()
    fig_sarrus(); fig_producto_matrices()
    fig_equilibrio()
    fig_region_panaderia(); fig_region_comedor(); fig_lp_casos()
    fig_polinomicas(); fig_racional(); fig_exp_log(); fig_trozos()
