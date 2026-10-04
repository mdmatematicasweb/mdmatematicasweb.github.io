#!/usr/bin/env python3
"""Genera las figuras SVG de los apuntes de 3º ESO (paleta de _brand.yml).

Uso:  python3 scripts/eso3/figuras.py

Reutiliza el lienzo `Fig` de scripts/figuras/build.py. Cada figura se escribe junto al index.qmd de su tema.
No edites los SVG a mano.
"""
import math
import sys
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts" / "figuras"))
import build as B  # noqa: E402
from build import Fig, NAVY, MINT, CORAL, YELLOW, INK, PAPER, FONT  # noqa: E402

AP = ROOT / "apuntes" / "3-eso"


def svg(path, w, h, body, title):
    s = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" font-family="{FONT}" role="img">'
         f'<title>{escape(title)}</title><rect x="1.5" y="1.5" width="{w-3}" height="{h-3}" fill="{PAPER}" stroke="{INK}" stroke-width="3"/>'
         + body + "</svg>\n")
    path.write_text(s)
    print("escrito", path.relative_to(ROOT))


def T(x, y, s, size=14, anchor="middle", color=INK, bold=False):
    w = ' font-weight="700"' if bold else ""
    return f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}" font-size="{size}" fill="{color}"{w}>{escape(s)}</text>'


def fig_identidad_notable():
    a, b, o = 170, 90, 50          # lado a, lado b (px) y margen
    body = ""
    body += f'<rect x="{o}" y="{o}" width="{a}" height="{a}" fill="{MINT}" stroke="{INK}" stroke-width="2.5"/>'
    body += f'<rect x="{o+a}" y="{o}" width="{b}" height="{a}" fill="{YELLOW}" stroke="{INK}" stroke-width="2.5"/>'
    body += f'<rect x="{o}" y="{o+a}" width="{a}" height="{b}" fill="{YELLOW}" stroke="{INK}" stroke-width="2.5"/>'
    body += f'<rect x="{o+a}" y="{o+a}" width="{b}" height="{b}" fill="{CORAL}" stroke="{INK}" stroke-width="2.5"/>'
    body += T(o + a / 2, o + a / 2 + 6, "a²", 22, bold=True)
    body += T(o + a + b / 2, o + a / 2 + 6, "a·b", 18, bold=True)
    body += T(o + a / 2, o + a + b / 2 + 6, "a·b", 18, bold=True)
    body += T(o + a + b / 2, o + a + b / 2 + 6, "b²", 18, bold=True)
    body += T(o + a / 2, o - 12, "a", 18, bold=True) + T(o + a + b / 2, o - 12, "b", 18, bold=True)
    body += T(o - 14, o + a / 2 + 6, "a", 18, bold=True) + T(o - 14, o + a + b / 2 + 6, "b", 18, bold=True)
    w = 2 * o + a + b
    svg(AP / "05-polinomios" / "fig-identidad-notable.svg", w, w, body, "Área de (a+b)² dividida en a², b² y dos rectángulos a·b")


def fig_rectas():
    g = Fig(-3, 6, -5, 6)
    g.axes(xt=(-2, 2, 4), yt=(-4, -2, 2, 4))
    g.curve(lambda x: 2 * x - 3, -3, 6, color=MINT, width=3.5)
    g.curve(lambda x: -x + 4, -3, 6, color=CORAL, width=3.5)
    g.curve(lambda x: 2, -3, 6, color=NAVY, width=3.5)
    g.dot(0, -3, YELLOW); g.dot(0, 4, YELLOW)
    g.text(4.1, 4.4, "y = 2x − 3", anchor="start", color="#2a8f82", bold=True)
    g.text(4.2, -1.8, "y = −x + 4", anchor="start", color=CORAL, bold=True)
    g.text(-2.9, 2.5, "y = 2", anchor="start", color=NAVY, bold=True)
    g.save(AP / "12-funciones-lineales-cuadraticas" / "fig-rectas.svg", "Rectas y=2x−3, y=−x+4 e y=2")


def fig_parabola():
    f = lambda x: x * x - 4 * x + 3
    g = Fig(-1, 5, -2, 6)
    g.axes(xt=(1, 2, 3, 4), yt=(-1, 3))
    g.line((2, -2), (2, 6), color=CORAL, width=2)
    g.curve(f, -0.9, 4.9, width=3.5)
    g.dot(2, -1, YELLOW); g.dot(1, 0, CORAL); g.dot(3, 0, CORAL); g.dot(0, 3, CORAL)
    g.text(2, -1, "V(2, −1)", dx=12, dy=22, anchor="start", bold=True)
    g.text(2, 5.4, "x = 2", dx=8, anchor="start", color=CORAL, bold=True)
    g.text(1.7, 5.3, "y = x² − 4x + 3", anchor="end", color=NAVY, bold=True)
    g.save(AP / "12-funciones-lineales-cuadraticas" / "fig-parabola.svg", "Parábola y=x²−4x+3 con vértice (2,−1)")


def temp(h):
    if h <= 6: return 10 + 2 * math.cos(math.pi * h / 6)
    if h <= 15: return 17 - 9 * math.cos(math.pi * (h - 6) / 9)
    return 19 + 7 * math.cos(math.pi * (h - 15) / 9)


def fig_temperatura():
    g = Fig(-3, 25, -2, 30, w=560)
    g.axes(xt=(6, 12, 15, 18, 24), yt=(8, 20, 26))
    g.line((6, 0), (6, 8), color=INK, width=1.2); g.line((15, 0), (15, 26), color=INK, width=1.2)
    g.line((0, 8), (6, 8), color=INK, width=1.2); g.line((0, 26), (15, 26), color=INK, width=1.2)
    g.curve(temp, 0, 24, width=3.5)
    g.dot(6, 8, MINT); g.dot(15, 26, CORAL)
    g.text(6, 8, "mínimo", dx=12, dy=22, anchor="start", bold=True, size=13)
    g.text(15, 26, "máximo", dx=12, dy=-8, anchor="start", bold=True, size=13)
    g.text(24, 0, "hora", anchor="end", dy=-8, size=13); g.text(0, 29, "°C", anchor="start", dx=10, dy=4, size=13)
    g.save(AP / "11-funciones" / "fig-temperatura.svg", "Temperatura a lo largo del día: mínimo 8 grados a las 6 y máximo 26 a las 15")


def fig_arbol():
    w, h = 460, 290
    x0, x1, x2 = 40, 190, 360
    y0 = h / 2
    ys1 = [h / 2 - 70, h / 2 + 70]
    ys2 = [40, 110, 180, 250]
    body = ""
    lab = ["C", "X"]
    for i, y in enumerate(ys1):
        body += f'<line x1="{x0}" y1="{y0}" x2="{x1}" y2="{y}" stroke="{INK}" stroke-width="2.5"/>'
        for j in range(2):
            body += f'<line x1="{x1}" y1="{y}" x2="{x2}" y2="{ys2[2 * i + j]}" stroke="{INK}" stroke-width="2.5"/>'
    for i, y in enumerate(ys1):
        body += f'<circle cx="{x1}" cy="{y}" r="16" fill="{MINT if i == 0 else YELLOW}" stroke="{INK}" stroke-width="2.5"/>' + T(x1, y + 5, lab[i], 16, bold=True)
        for j in range(2):
            yy = ys2[2 * i + j]
            body += f'<circle cx="{x2}" cy="{yy}" r="16" fill="{MINT if j == 0 else YELLOW}" stroke="{INK}" stroke-width="2.5"/>' + T(x2, yy + 5, lab[j], 16, bold=True)
            body += T(x2 + 30, yy + 5, f"{lab[i]}{lab[j]}  ·  ¼", 14, anchor="start", bold=True)
    body += T((x0 + x1) / 2 - 12, (y0 + ys1[0]) / 2 - 8, "½", 14, bold=True) + T((x0 + x1) / 2 - 12, (y0 + ys1[1]) / 2 + 20, "½", 14, bold=True)
    body += f'<circle cx="{x0}" cy="{y0}" r="6" fill="{INK}"/>'
    svg(AP / "14-probabilidad" / "fig-arbol.svg", w, h, body, "Árbol de dos lanzamientos de una moneda con los cuatro resultados de probabilidad un cuarto")


def fig_puntos_notables():
    # triángulo A(0,0) B(6,0) C(2,4) en una cuadrícula de 60 px por unidad
    s, ox, oy = 62, 150, 290
    P = lambda x, y: (ox + s * x, oy - s * y)
    A, Bp, C = (0, 0), (6, 0), (2, 4)
    # circuncentro y circunradio
    ax, ay = A; bx, by = Bp; cx, cy = C
    d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
    ux = ((ax**2 + ay**2) * (by - cy) + (bx**2 + by**2) * (cy - ay) + (cx**2 + cy**2) * (ay - by)) / d
    uy = ((ax**2 + ay**2) * (cx - bx) + (bx**2 + by**2) * (ax - cx) + (cx**2 + cy**2) * (bx - ax)) / d
    R = math.hypot(ax - ux, ay - uy)
    a_, b_, c_ = math.dist(Bp, C), math.dist(A, C), math.dist(A, Bp)
    px = a_ + b_ + c_
    ix = (a_ * ax + b_ * bx + c_ * cx) / px; iy = (a_ * ay + b_ * by + c_ * cy) / px
    area = abs((bx - ax) * (cy - ay) - (cx - ax) * (by - ay)) / 2
    r = 2 * area / px
    pA, pB, pC = P(*A), P(*Bp), P(*C)
    body = f'<polygon points="{pA[0]},{pA[1]} {pB[0]},{pB[1]} {pC[0]},{pC[1]}" fill="{YELLOW}" fill-opacity="0.55" stroke="{INK}" stroke-width="3"/>'
    body += f'<circle cx="{P(ux, uy)[0]:.1f}" cy="{P(ux, uy)[1]:.1f}" r="{R*s:.1f}" fill="none" stroke="{CORAL}" stroke-width="2.5" stroke-dasharray="7 5"/>'
    body += f'<circle cx="{P(ix, iy)[0]:.1f}" cy="{P(ix, iy)[1]:.1f}" r="{r*s:.1f}" fill="none" stroke="{MINT}" stroke-width="3"/>'
    for (q, col, t) in [(P(ux, uy), CORAL, "circuncentro"), (P(ix, iy), "#2a8f82", "incentro")]:
        body += f'<circle cx="{q[0]:.1f}" cy="{q[1]:.1f}" r="5" fill="{col}" stroke="{INK}" stroke-width="1.5"/>'
    body += T(P(ux, uy)[0] + 8, P(ux, uy)[1] + 4, "circuncentro", 13, anchor="start", color=CORAL, bold=True)
    body += T(P(ix, iy)[0] - 8, P(ix, iy)[1] + 4, "incentro", 13, anchor="end", color="#2a8f82", bold=True)
    for q, t, dx, dy in [(pA, "A", -16, 18), (pB, "B", 14, 18), (pC, "C", 0, -12)]:
        body += T(q[0] + dx, q[1] + dy, t, 17, bold=True)
    svg(AP / "08-lugares-geometricos" / "fig-puntos-notables.svg", 560, 460, body, "Triángulo con sus circunferencias circunscrita e inscrita")


def fig_movimientos():
    g = Fig(-7, 7, -6, 6, w=560, h=400)
    g.axes(xt=(-6, -4, -2, 2, 4, 6), yt=(-4, -2, 2, 4))
    tri = [(2, 1), (5, 1), (3, 2)]

    def poly(pts, col, label, off):
        p = " ".join(f"{g.X(x):.1f},{g.Y(y):.1f}" for x, y in pts)
        g.el.append(f'<polygon points="{p}" fill="{col}" fill-opacity="0.75" stroke="{INK}" stroke-width="2.5"/>')
        cx = sum(x for x, _ in pts) / 3; cy = sum(y for _, y in pts) / 3
        g.text(cx + off[0], max(y for _, y in pts) + 0.55 + off[1], label, bold=True, size=13)

    poly(tri, MINT, "F", (0, 0))
    poly([(x, y - 4) for x, y in tri], YELLOW, "traslación", (0, 0))
    poly([(-x, y) for x, y in tri], CORAL, "simetría", (0, 0))
    poly([(-y, x) for x, y in tri], "#B8B2E8", "giro 90°", (0, 0))
    g.save(AP / "09-movimientos-semejanzas" / "fig-movimientos.svg", "Una figura, su traslación, su simetría respecto del eje Y y su giro de 90 grados")


def fig_desarrollos():
    w, h = 600, 300
    body = ""
    # cilindro: rectángulo + dos círculos
    r, L = 28, 2 * math.pi * 28   # el rectángulo mide 2πr de ancho
    x0, y0, hh = 30, 110, 90
    body += f'<rect x="{x0}" y="{y0}" width="{L:.1f}" height="{hh}" fill="{MINT}" stroke="{INK}" stroke-width="2.5"/>'
    body += f'<circle cx="{x0 + L/2:.1f}" cy="{y0 - r}" r="{r}" fill="{YELLOW}" stroke="{INK}" stroke-width="2.5"/>'
    body += f'<circle cx="{x0 + L/2:.1f}" cy="{y0 + hh + r}" r="{r}" fill="{YELLOW}" stroke="{INK}" stroke-width="2.5"/>'
    body += T(x0 + L / 2, y0 + hh / 2 + 5, "2πr × h", 15, bold=True)
    body += T(x0 + L / 2, 290, "cilindro", 15, bold=True)
    # cono: sector circular + círculo
    cx, cy, g_ = 400, 40, 120
    ang = 2 * math.pi * 36 / g_     # arco = 2π r con r = 36
    a0 = math.pi / 2 - ang / 2
    p1 = (cx + g_ * math.cos(a0), cy + g_ * math.sin(a0)); p2 = (cx + g_ * math.cos(a0 + ang), cy + g_ * math.sin(a0 + ang))
    large = 1 if ang > math.pi else 0
    body += f'<path d="M{cx},{cy} L{p1[0]:.1f},{p1[1]:.1f} A{g_},{g_} 0 {large} 1 {p2[0]:.1f},{p2[1]:.1f} Z" fill="{CORAL}" fill-opacity="0.8" stroke="{INK}" stroke-width="2.5"/>'
    body += f'<circle cx="{cx + 120}" cy="{cy + 150}" r="36" fill="{YELLOW}" stroke="{INK}" stroke-width="2.5"/>'
    body += T(cx, cy + 60, "sector: πrg", 15, bold=True) + T(cx + 120, cy + 155, "πr²", 15, bold=True)
    body += T(cx + 40, 290, "cono (generatriz g)", 15, bold=True)
    svg(AP / "10-cuerpos-geometricos" / "fig-desarrollos.svg", w, h, body, "Desarrollo del cilindro y del cono")


if __name__ == "__main__":
    fig_identidad_notable(); fig_puntos_notables(); fig_movimientos(); fig_desarrollos()
    fig_temperatura(); fig_rectas(); fig_parabola(); fig_arbol()
