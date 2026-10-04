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


def fig_recta_numerica():
    w, h = 640, 150
    x0, x1 = 50, 590                      # de -2 a 2
    X = lambda v: x0 + (v + 2) / 4 * (x1 - x0)
    y = 80
    body = f'<line x1="{x0-20}" y1="{y}" x2="{x1+20}" y2="{y}" stroke="{INK}" stroke-width="2"/>'
    for v in range(-2, 3):
        body += f'<line x1="{X(v)}" y1="{y-9}" x2="{X(v)}" y2="{y+9}" stroke="{INK}" stroke-width="2"/>' + T(X(v), y + 30, str(v).replace("-", "−"), 16)
    for k in range(-8, 9):
        if k % 4: body += f'<line x1="{X(k/4)}" y1="{y-5}" x2="{X(k/4)}" y2="{y+5}" stroke="{INK}" stroke-width="1"/>'
    for v, lab, col, up in [(7 / 4, "7/4", CORAL, True), (-3 / 4, "−3/4", MINT, True), (1 / 3, "1/3", YELLOW, False), (-1.5, "−3/2", YELLOW, False)]:
        body += f'<circle cx="{X(v)}" cy="{y}" r="7" fill="{col}" stroke="{INK}" stroke-width="2"/>' + T(X(v), y - 18 if up else y + 56, lab, 15, bold=True)
    svg(AP / "01-numeros-racionales" / "fig-recta-numerica.svg", w, h + 20, body, "Recta numérica con las fracciones 7/4, −3/4, 1/3 y −3/2")


def fig_progresiones():
    g = Fig(-1.2, 9, -1, 42, w=560, h=300)
    g.axes(xt=(1, 2, 3, 4, 5, 6, 7, 8), yt=(10, 20, 30))
    for n in range(1, 9):
        g.dot(n, 5 + 3 * (n - 1), MINT)
    for n in range(1, 7):
        g.dot(n, 2 * 2 ** (n - 1) if 2 * 2 ** (n - 1) <= 39 else 39, CORAL)
    g.text(6.0, 11, "aritmética: se suma 3", anchor="start", dx=-20, color="#2a8f82", bold=True, size=13)
    g.text(1.2, 36, "geométrica: se multiplica por 2", anchor="start", dx=-10, color=CORAL, bold=True, size=13)
    g.text(8.8, 0, "n", anchor="end", dy=-8, size=13)
    g.save(AP / "03-progresiones" / "fig-progresiones.svg", "Una progresión aritmética (puntos alineados) y una geométrica (crecimiento cada vez más rápido)")


def fig_proporcionalidad():
    g = Fig(-1.4, 12.5, -1, 13, w=560, h=300)
    g.axes(xt=(2, 4, 6, 8, 10, 12), yt=(4, 8, 12))
    g.curve(lambda x: x, 0, 12, color=MINT, width=3.5)
    g.curve(lambda x: 24 / x, 1.9, 12, color=CORAL, width=3.5)
    g.text(9.6, 10.6, "directa: y = x", color="#2a8f82", bold=True, size=13)
    g.text(8.4, 4.6, "inversa: x·y = 24", color=CORAL, bold=True, size=13)
    g.save(AP / "04-proporcionalidad" / "fig-proporcionalidad.svg", "Proporcionalidad directa (recta que pasa por el origen) e inversa (hipérbola)")


def fig_sistemas():
    w, h = 660, 220
    body = ""
    cases = [("una solución", lambda x: 0.5 * x + 0.2, lambda x: -x + 2.6, True), ("infinitas soluciones", lambda x: 0.5 * x + 1, lambda x: 0.5 * x + 1, False), ("ninguna solución", lambda x: 0.5 * x + 0.2, lambda x: 0.5 * x + 1.4, False)]
    for i, (t, f1, f2, pt) in enumerate(cases):
        ox = 20 + i * 215
        gx = lambda x: ox + 20 + (x + 1) / 5 * 160
        gy = lambda y: 160 - (y + 0.5) / 4 * 130
        body += f'<rect x="{ox}" y="30" width="195" height="160" fill="none" stroke="{INK}" stroke-width="1.5"/>'
        body += f'<line x1="{ox+10}" y1="{gy(0)}" x2="{ox+185}" y2="{gy(0)}" stroke="{INK}" stroke-width="1"/><line x1="{gx(0)}" y1="{gy(-0.4)}" x2="{gx(0)}" y2="{gy(3.4)}" stroke="{INK}" stroke-width="1"/>'
        xs = (-0.8, 3.8)
        if i == 1:
            body += f'<line x1="{gx(xs[0])}" y1="{gy(f1(xs[0]))}" x2="{gx(xs[1])}" y2="{gy(f1(xs[1]))}" stroke="{MINT}" stroke-width="5"/>'
            body += f'<line x1="{gx(xs[0])}" y1="{gy(f2(xs[0]))}" x2="{gx(xs[1])}" y2="{gy(f2(xs[1]))}" stroke="{CORAL}" stroke-width="2" stroke-dasharray="6 5"/>'
        else:
            body += f'<line x1="{gx(xs[0])}" y1="{gy(f1(xs[0]))}" x2="{gx(xs[1])}" y2="{gy(f1(xs[1]))}" stroke="{MINT}" stroke-width="3.5"/>'
            body += f'<line x1="{gx(xs[0])}" y1="{gy(f2(xs[0]))}" x2="{gx(xs[1])}" y2="{gy(f2(xs[1]))}" stroke="{CORAL}" stroke-width="3.5"/>'
        if pt:
            xp = (2.6 - 0.2) / 1.5
            body += f'<circle cx="{gx(xp)}" cy="{gy(f1(xp))}" r="6" fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>'
        body += T(ox + 97, 22, t, 15, bold=True)
    svg(AP / "07-sistemas-ecuaciones" / "fig-sistemas.svg", w, h, body, "Dos rectas que se cortan, que coinciden o que son paralelas")


def fig_pitagoras():
    w, h = 520, 350
    s = 24                                  # px por unidad; triángulo 3-4-5
    A = (230, 220); B = (230 + 4 * s, 220); C = (230, 220 - 3 * s)   # ángulo recto en A; cateto horizontal b=4, cateto vertical a=3
    body = f'<rect x="{A[0]}" y="{A[1]}" width="{4*s}" height="{4*s}" fill="{MINT}" fill-opacity="0.85" stroke="{INK}" stroke-width="2.5"/>'      # cuadrado de b=4 (debajo)
    body += f'<rect x="{A[0]-3*s}" y="{C[1]}" width="{3*s}" height="{3*s}" fill="{YELLOW}" stroke="{INK}" stroke-width="2.5"/>'                       # cuadrado de a=3 (izquierda)
    dx, dy = C[0] - B[0], C[1] - B[1]       # B→C
    nx, ny = -dy, dx                          # normal hacia fuera (arriba-derecha)
    P1 = (B[0] + nx, B[1] + ny); P2 = (C[0] + nx, C[1] + ny)
    body += f'<polygon points="{B[0]},{B[1]} {C[0]},{C[1]} {P2[0]},{P2[1]} {P1[0]},{P1[1]}" fill="{CORAL}" fill-opacity="0.85" stroke="{INK}" stroke-width="2.5"/>'
    body += f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="{PAPER}" stroke="{INK}" stroke-width="3"/>'
    body += f'<polyline points="{A[0]},{A[1]-12} {A[0]+12},{A[1]-12} {A[0]+12},{A[1]}" fill="none" stroke="{INK}" stroke-width="2"/>'
    body += T(A[0] + 2 * s, A[1] + 2 * s + 6, "b² = 16", 18, bold=True) + T(A[0] - 1.5 * s, C[1] + 1.5 * s + 6, "a² = 9", 18, bold=True)
    body += T((B[0] + C[0]) / 2 + nx / 2, (B[1] + C[1]) / 2 + ny / 2 + 6, "c² = 25", 18, bold=True)
    body += T(A[0] + 12, A[1] - 1.6 * s, "a", 16, anchor="start", bold=True) + T(A[0] + 2 * s, A[1] - 18, "b", 16, bold=True)
    body += T(w / 2, 26, "a² + b² = c²   (9 + 16 = 25)", 18, bold=True)
    svg(AP / "08-lugares-geometricos" / "fig-pitagoras.svg", w, h, body, "Teorema de Pitágoras: los cuadrados de los catetos, 9 y 16, suman el cuadrado de la hipotenusa, 25")


def fig_tales():
    w, h = 560, 310
    O = (60, 250); A = (480, 250); Bp = (300, 50)           # triángulo grande O-A-B'
    t = 0.45
    A2 = (O[0] + t * (A[0] - O[0]), O[1]); B2 = (O[0] + t * (Bp[0] - O[0]), O[1] + t * (Bp[1] - O[1]))
    body = f'<polygon points="{O[0]},{O[1]} {A[0]},{A[1]} {Bp[0]},{Bp[1]}" fill="{YELLOW}" fill-opacity="0.55" stroke="{INK}" stroke-width="3"/>'
    body += f'<polygon points="{O[0]},{O[1]} {A2[0]},{A2[1]} {B2[0]},{B2[1]}" fill="{MINT}" fill-opacity="0.8" stroke="{INK}" stroke-width="3"/>'
    for P, lab, dx, dy in [(O, "O", -14, 8), (A, "A", 14, 16), (Bp, "B", 0, -12), (A2, "A'", 0, 22), (B2, "B'", -16, -6)]:
        body += f'<circle cx="{P[0]}" cy="{P[1]}" r="4" fill="{INK}"/>' + T(P[0] + dx, P[1] + dy, lab, 17, bold=True)
    body += T(110, 70, "A'B' ∥ AB", 16, anchor="start", color=CORAL, bold=True)
    body += T(w / 2, 298, "OA' / OA = OB' / OB = A'B' / AB", 17, bold=True)
    svg(AP / "09-movimientos-semejanzas" / "fig-tales.svg", w, h, body, "Teorema de Tales: dos triángulos con lados paralelos tienen lados proporcionales")


def fig_estadistica():
    w, h = 620, 280
    datos = [(0, 4), (1, 7), (2, 6), (3, 2), (4, 1)]
    body = f'<text x="140" y="26" text-anchor="middle" font-size="15" font-weight="700" fill="{INK}">Diagrama de barras</text>'
    base, top = 220, 50
    body += f'<line x1="40" y1="{base}" x2="250" y2="{base}" stroke="{INK}" stroke-width="2"/><line x1="40" y1="{base}" x2="40" y2="{top-10}" stroke="{INK}" stroke-width="2"/>'
    cols = [MINT, CORAL, YELLOW, "#B8B2E8", NAVY]
    for i, (x, f) in enumerate(datos):
        bx = 58 + i * 38; bh = f * 22
        body += f'<rect x="{bx}" y="{base-bh}" width="28" height="{bh}" fill="{cols[i]}" stroke="{INK}" stroke-width="2"/>' + T(bx + 14, base - bh - 6, str(f), 14, bold=True) + T(bx + 14, base + 20, str(x), 14)
    body += T(145, base + 42, "número de hermanos", 13) + T(26, 40, "f", 13)
    # sectores
    cx, cy, r = 470, 140, 85
    import math as m
    ang = -m.pi / 2
    body += f'<text x="{cx}" y="26" text-anchor="middle" font-size="15" font-weight="700" fill="{INK}">Diagrama de sectores</text>'
    for i, (x, f) in enumerate(datos):
        a2 = ang + 2 * m.pi * f / 20
        x1, y1 = cx + r * m.cos(ang), cy + r * m.sin(ang); x2, y2 = cx + r * m.cos(a2), cy + r * m.sin(a2)
        large = 1 if (a2 - ang) > m.pi else 0
        body += f'<path d="M{cx},{cy} L{x1:.1f},{y1:.1f} A{r},{r} 0 {large} 1 {x2:.1f},{y2:.1f} Z" fill="{cols[i]}" stroke="{INK}" stroke-width="2"/>'
        mid = (ang + a2) / 2
        body += T(cx + 0.62 * r * m.cos(mid), cy + 0.62 * r * m.sin(mid) + 5, f"{x}", 14, bold=True, color=INK if i != 4 else PAPER)
        ang = a2
    body += T(cx, cy + r + 30, "sector de «1 hermano»: 126°", 13)
    svg(AP / "13-estadistica" / "fig-graficos.svg", w, h, body, "Diagrama de barras y diagrama de sectores del número de hermanos de 20 alumnos")


def fig_vertical():
    w, h = 640, 260
    body = ""
    for i, (t, circle) in enumerate([("Es función", False), ("No es función", True)]):
        ox = 20 + i * 315
        body += f'<rect x="{ox}" y="34" width="290" height="200" fill="none" stroke="{INK}" stroke-width="1.5"/>' + T(ox + 145, 24, t, 16, bold=True)
        cx, cy = ox + 145, 140
        body += f'<line x1="{ox+15}" y1="{cy}" x2="{ox+275}" y2="{cy}" stroke="{INK}" stroke-width="1.2"/><line x1="{cx}" y1="44" x2="{cx}" y2="224" stroke="{INK}" stroke-width="1.2"/>'
        if circle:
            body += f'<circle cx="{cx}" cy="{cy}" r="70" fill="none" stroke="{NAVY}" stroke-width="3.5"/>'
            vx = cx + 35
            body += f'<line x1="{vx}" y1="44" x2="{vx}" y2="224" stroke="{CORAL}" stroke-width="2.5" stroke-dasharray="7 5"/>'
            yy = (70**2 - 35**2) ** 0.5
            for sgn in (-1, 1): body += f'<circle cx="{vx}" cy="{cy + sgn*yy}" r="6" fill="{CORAL}" stroke="{INK}" stroke-width="2"/>'
        else:
            pts = " ".join(f"{cx + (x-0)*1:.1f},{cy - (0.012*(x)**2 - 40):.1f}" for x in range(-100, 101, 5))
            body += f'<polyline points="{pts}" fill="none" stroke="{NAVY}" stroke-width="3.5"/>'
            vx = cx + 45
            body += f'<line x1="{vx}" y1="44" x2="{vx}" y2="224" stroke="{MINT}" stroke-width="2.5" stroke-dasharray="7 5"/>'
            body += f'<circle cx="{vx}" cy="{cy - (0.012*45**2 - 40):.1f}" r="6" fill="{MINT}" stroke="{INK}" stroke-width="2"/>'
    svg(AP / "11-funciones" / "fig-vertical.svg", w, h, body, "Una recta vertical corta una vez a la gráfica de una función y dos veces a una circunferencia")


if __name__ == "__main__":
    fig_identidad_notable(); fig_puntos_notables(); fig_movimientos(); fig_desarrollos()
    fig_temperatura(); fig_rectas(); fig_parabola(); fig_arbol()
    fig_recta_numerica(); fig_progresiones(); fig_proporcionalidad(); fig_sistemas()
    fig_pitagoras(); fig_tales(); fig_estadistica(); fig_vertical()
