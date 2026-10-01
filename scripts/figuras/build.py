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


if __name__ == "__main__":
    fig_asintotas(); fig_monotonia(); fig_area(); fig_normal()
