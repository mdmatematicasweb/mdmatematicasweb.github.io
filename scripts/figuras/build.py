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
NAVY, MINT, CORAL, YELLOW, INK, PAPER = "#262A3D", "#5EC4B6", "#F4736C", "#F5D65B", "#1A1A1A", "#FBF2D6"
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

    def text(self, x, y, s, dx=0, dy=0, anchor="middle", size=14, color=INK, bold=False):
        w = ' font-weight="700"' if bold else ""
        self.el.append(f'<text x="{self.X(x)+dx:.1f}" y="{self.Y(y)+dy:.1f}" text-anchor="{anchor}" font-size="{size}" fill="{color}"{w}>{escape(s)}</text>')

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


if __name__ == "__main__":
    fig_asintotas(); fig_monotonia(); fig_area(); fig_normal()
    fig_dos_planos(); fig_recta_plano(); fig_dos_rectas(); fig_simetrico()
    fig_discontinuidades(); fig_tangente(); fig_derivabilidad(); fig_rolle_vm(); fig_area_signo()
    fig_simetria_normal(); fig_regla_68(); fig_venn()
    fig_sistemas_2d(); fig_det_area(); fig_vectores_2d(); fig_vectorial_mixto()
