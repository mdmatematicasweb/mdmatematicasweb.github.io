#!/usr/bin/env python3
"""Genera las páginas «PAU Andalucía por temas» a partir de scripts/ebau/data/*.md.

Uso:  python3 scripts/ebau/build.py

Cada fichero de data/ es un examen (front matter + ejercicios separados por líneas «@@ n | bloque | pts | tema | también»).
Las soluciones van aparte, en soluciones/<slug>.md (mismo nombre que el examen): bloques «@@ n» seguidos del texto
de la solución en Markdown. Se muestran plegadas debajo de cada enunciado.
Las páginas se escriben en ejercicios/2-bachillerato-ciencias/ebau/. No edites esas páginas a mano: edita data/ y vuelve a ejecutar.
"""
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = Path(__file__).resolve().parent / "data"
SOLS = Path(__file__).resolve().parent / "soluciones"
OUT = ROOT / "ejercicios" / "2-bachillerato-ciencias" / "ebau"
OFICIAL = json.loads((Path(__file__).resolve().parent / "oficial.json").read_text())  # copias locales de la Junta (oficial.py)
URLS = {u.rsplit("/", 1)[1]: u for u in (Path(__file__).resolve().parent / "urls.txt").read_text().split()}

TEMAS = {
    1: ("01-matrices", "Matrices"),
    2: ("02-determinantes", "Determinantes"),
    3: ("03-sistemas-ecuaciones-lineales", "Sistemas de ecuaciones lineales"),
    4: ("04-vectores-espacio", "Vectores en el espacio"),
    5: ("05-rectas-planos", "Rectas y planos"),
    6: ("06-limites-continuidad", "Límites y continuidad"),
    7: ("07-derivadas", "Derivadas"),
    8: ("08-aplicaciones-derivada", "Aplicaciones de la derivada"),
    9: ("09-integrales", "Integrales"),
    10: ("10-probabilidad", "Probabilidad"),
    11: ("11-distribuciones", "Distribuciones binomial y normal"),
}
BLOQUE = {
    "A": "Bloque A", "B": "Bloque B", "C": "Bloque C", "D": "Bloque D",
    "Obl": "Parte obligatoria", "O1": "Bloque optativo 1", "O2": "Bloque optativo 2", "O3": "Bloque optativo 3",
}
CONV_ORDER = ["Ordinaria", "Ordinaria · Reserva", "Ordinaria · Suplente", "Ordinaria · Suplente 1", "Ordinaria · Suplente 2",
              "Extraordinaria", "Extraordinaria · Reserva", "Extraordinaria · Suplente", "Extraordinaria · Suplente 1", "Extraordinaria · Suplente 2"]
EXPECTED = {2021: 8, 2022: 8, 2023: 8, 2024: 8, 2025: 7, 2026: 6}
FORMATO = {
    2021: "8 ejercicios (bloques A y B de 4), se hacen 4 cualesquiera.",
    2022: "8 ejercicios (bloques A y B de 4), se hacen 4 cualesquiera.",
    2023: "8 ejercicios (bloques A y B de 4), se hacen 4 cualesquiera.",
    2024: "8 ejercicios en 4 bloques (A, B, C, D) de 2; se hace 1 de cada bloque.",
    2025: "7 ejercicios: 1 obligatorio y 3 bloques optativos de 2; se hace el obligatorio y 1 de cada bloque. Aparece probabilidad y distribución normal.",
    2026: "6 ejercicios: 2 obligatorios y 2 bloques optativos de 2; se hacen los 2 obligatorios y 1 de cada bloque. Aparece probabilidad y distribución normal.",
}


def load_exams():
    exams = []
    for f in sorted(DATA.glob("*.md")):
        txt = f.read_text()
        m = re.match(r"---\n(.*?)\n---\n(.*)", txt, re.S)
        if not m:
            sys.exit(f"{f.name}: falta el front matter")
        meta = dict(re.match(r"(\w+):\s*(.*)", l).groups() for l in m.group(1).splitlines() if l.strip())
        exs = []
        for blk in re.split(r"^@@ ", m.group(2), flags=re.M)[1:]:
            head, _, body = blk.partition("\n")
            n, bloque, pts, tema, tambien = [x.strip() for x in head.split("|")]
            exs.append({
                "n": n, "bloque": bloque, "pts": pts, "tema": int(tema),
                "tambien": [int(x) for x in tambien.split(",") if x.strip()],
                "tex": body.strip(),
            })
        exam = {"slug": meta["slug"], "year": int(meta["year"]), "conv": meta["conv"], "curso": meta["curso"], "file": meta["file"], "ejercicios": exs}
        if meta["slug"] not in OFICIAL and meta["file"] not in URLS:
            sys.exit(f"{f.name}: archivo {meta['file']} no está en urls.txt")
        exam["url"] = URLS.get(meta["file"])
        exam["sol_extra"] = []
        fsol = SOLS / f.name
        if fsol.exists():
            by_n = {x["n"]: x for x in exs}
            for blk in re.split(r"^@@ ", fsol.read_text(), flags=re.M)[1:]:
                head, _, body = blk.partition("\n")
                n = head.strip()
                if n in by_n:
                    by_n[n]["sol"] = body.strip()
                else:
                    exam["sol_extra"].append(n)
        exams.append(exam)
    return exams


def validate(exams):
    errs = []
    for e in exams:
        tag = e["slug"]
        if len(e["ejercicios"]) != EXPECTED[e["year"]]:
            errs.append(f"{tag}: {len(e['ejercicios'])} ejercicios, se esperaban {EXPECTED[e['year']]}")
        if e["conv"] not in CONV_ORDER:
            errs.append(f"{tag}: convocatoria desconocida {e['conv']!r}")
        seen = set()
        for x in e["ejercicios"]:
            who = f"{tag} ej.{x['n']}"
            if x["n"] in seen:
                errs.append(f"{who}: repetido")
            seen.add(x["n"])
            if x["bloque"] not in BLOQUE:
                errs.append(f"{who}: bloque {x['bloque']!r}")
            if x["tema"] not in TEMAS or any(t not in TEMAS for t in x["tambien"]) or x["tema"] in x["tambien"]:
                errs.append(f"{who}: temas inválidos")
            t = re.sub(r"\$\$", "", x["tex"])
            if t.count("$") % 2:
                errs.append(f"{who}: $ desparejados")
            parts = [float(p.replace(",", ".")) for p in re.findall(r"\*\((\d+(?:,\d+)?) puntos?\)\*", x["tex"])]
            if len(parts) >= 2 and abs(sum(parts) - float(x["pts"].replace(",", "."))) > 1e-9:
                errs.append(f"{who}: los apartados suman {sum(parts)} y el ejercicio vale {x['pts']}")
            if not x["tex"]:
                errs.append(f"{who}: sin enunciado")
            if x.get("sol") is not None:
                if not x["sol"]:
                    errs.append(f"{who}: solución vacía")
                if re.sub(r"\$\$", "", x["sol"]).count("$") % 2:
                    errs.append(f"{who}: $ desparejados en la solución")
                if re.search(r"^:::", x["sol"], re.M):
                    errs.append(f"{who}: la solución no puede abrir bloques «:::»")
        for n in e["sol_extra"]:
            errs.append(f"{tag}: solución para el ejercicio {n}, que no existe")
    return errs


def pdf_links(e, solo_examen=False):
    """Enlaces a los PDF: copia oficial local (assets/pau) si existe; si no, el PDF de terceros de urls.txt."""
    files = OFICIAL.get(e["slug"])
    if not files:
        return [("PDF del examen", e["url"], True)]
    return [(f["label"], "../../../" + f["path"], True) for f in files if not (solo_examen and f["label"].startswith(("Criterios", "Tabla")))]


def md_links(e, sep, solo_examen=False):
    return sep.join(f"[{l}]({u}){{target=\"_blank\"}}" for l, u, _ in pdf_links(e, solo_examen))


def anchor(e, x):
    return f"ebau-{e['slug']}-{x['n'].replace('.', '-')}"


def label(e):
    return f"{e['year']} {e['conv']}"


def conv_key(e):
    return (-e["year"], CONV_ORDER.index(e["conv"]))


def sort_ej(x):
    return [int(p) for p in x["n"].split(".")]


def tema_page(t, exams):
    slug, nombre = TEMAS[t]
    principales = [(e, x) for e in exams for x in e["ejercicios"] if x["tema"] == t]
    relacionados = [(e, x) for e in exams for x in e["ejercicios"] if t in x["tambien"]]
    by_year = defaultdict(list)
    for e, x in principales:
        by_year[e["year"]].append((e, x))
    out = [f'---\ntitle: "PAU Andalucía — {nombre}"\nlang: es\n---\n']
    out.append(f"Ejercicios de **Matemáticas II** de la prueba de acceso a la universidad en Andalucía (PAU, antes PEvAU) de **2021 a 2026** cuyo tema principal es *{nombre.lower()}*: "
               f"**{len(principales)} ejercicios** de convocatorias ordinarias, extraordinarias y de sus reservas o suplentes. "
               f"Repasa antes la [teoría](../../../apuntes/2-bachillerato-ciencias/{slug}/index.qmd)"
               + (f", los [ejercicios del tema](../{slug}/index.qmd) y las [actividades interactivas](../../../actividades/2-bachillerato-ciencias/{slug}/index.qmd).\n"
                  if (ROOT / "actividades" / "2-bachillerato-ciencias" / slug / "index.qmd").exists()
                  else f" y los [ejercicios del tema](../{slug}/index.qmd).\n"))
    out.append("Debajo de cada ejercicio hay una **resolución breve** plegada, con los pasos clave y el resultado: inténtalo antes de abrirla.\n")
    if t in (10, 11):
        out.append("> Probabilidad y distribución normal **no entraron en Matemáticas II hasta la convocatoria de 2025**: los anteriores exámenes (2021–2024) no tienen ejercicios de este tema.\n")
    if not principales:
        out.append("*Ningún ejercicio de este tema en el periodo 2021–2026.*\n")
    for y in sorted(by_year, reverse=True):
        out.append(f"\n## {y}\n")
        last = None
        for e, x in sorted(by_year[y], key=lambda p: (CONV_ORDER.index(p[0]["conv"]), sort_ej(p[1]))):
            if e["conv"] != last:
                out.append(f"\n### {e['conv']} {y}\n")
                last = e["conv"]
            otros = ", ".join(f"[{TEMAS[o][1]}]({TEMAS[o][0]}.qmd)" for o in x["tambien"])
            extra = f"\n\n*Relacionado también con:* {otros}." if otros else ""
            sol = (f"\n\n:::: {{.callout-tip collapse=\"true\" appearance=\"simple\"}}\n## Solución\n\n{x['sol']}\n::::"
                   if x.get("sol") else "")
            out.append(
                f"\n::::: {{.ebau-ej #{anchor(e, x)}}}\n"
                f"**Ejercicio {x['n']}** · {e['conv']} {y} · {BLOQUE[x['bloque']]} · *({x['pts']} puntos)* · {md_links(e, ' · ', True) if e['slug'] in OFICIAL else md_links(e, ' · ')}\n\n"
                f"{x['tex']}{extra}{sol}\n"
                f":::::\n"
            )
    if relacionados:
        out.append("\n## También trabajan este tema\n")
        out.append("Ejercicios cuyo tema principal es otro pero en los que aparece este tema:\n")
        for e, x in sorted(relacionados, key=lambda p: (conv_key(p[0]), sort_ej(p[1]))):
            s2, n2 = TEMAS[x["tema"]]
            out.append(f"- [{label(e)}, ejercicio {x['n']}]({s2}.qmd#{anchor(e, x)}) (tema principal: {n2})")
        out.append("")
    out.append("\n---\n\n*Enunciados: Prueba de Acceso y Admisión a la Universidad (PEvAU hasta 2024, PAU desde 2025), Matemáticas II, Andalucía, Ceuta, Melilla y centros en Marruecos (Distrito Único Andaluz). "
               "Cada ejercicio enlaza al PDF del examen completo. La clasificación por temas es propia y puede discutirse: los ejercicios mixtos figuran en su tema principal.*\n")
    return "\n".join(out)


def index_page(exams):
    cnt = defaultdict(lambda: defaultdict(int))
    for e in exams:
        for x in e["ejercicios"]:
            cnt[x["tema"]][e["year"]] += 1
    years = sorted({e["year"] for e in exams}, reverse=True)
    total = sum(len(e["ejercicios"]) for e in exams)
    out = ['---\ntitle: "PAU Andalucía 2021–2026 por temas"\nlang: es\n---\n']
    out.append(f"Relación de los **{total} ejercicios** de Matemáticas II de la PAU (antes PEvAU) de Andalucía entre 2021 y 2026, agrupados por el tema de 2º de Bachillerato Ciencias al que pertenecen. "
               f"Incluye las convocatorias **ordinaria** y **extraordinaria** y todos sus exámenes de **reserva** y **suplentes** ({len(exams)} exámenes). "
               "Cada ejercicio indica de qué examen procede, enlaza al PDF completo y tiene debajo una **resolución breve** plegada (pulsa «Solución» después de intentarlo).\n")
    out.append("## Ejercicios por tema y año\n")
    out.append("| Tema | " + " | ".join(str(y) for y in years) + " | Total |")
    out.append("|---|" + "---:|" * (len(years) + 1))
    for t, (slug, nombre) in TEMAS.items():
        row = [f"[{t}. {nombre}]({slug}.qmd)"] + [str(cnt[t][y]) if cnt[t][y] else "·" for y in years] + [f"**{sum(cnt[t].values())}**"]
        out.append("| " + " | ".join(row) + " |")
    out.append("\n## Formato del examen\n")
    for y in years:
        out.append(f"- **{y}**: {FORMATO[y]}")
    out.append("\n## Exámenes incluidos\n")
    out.append("Cada ejercicio vale 2,5 puntos. Enlaces a los PDF de los enunciados:\n")
    for y in years:
        es = sorted([e for e in exams if e["year"] == y], key=lambda e: CONV_ORDER.index(e["conv"]))
        out.append(f"- **{y}**")
        for e in es:
            out.append(f"  - {e['conv']}: " + (md_links(e, " · ") if e["slug"] in OFICIAL else f"[PDF]({e['url']}){{target=\"_blank\"}}"))
        out.append("")
    out.append("\n---\n\n*Enunciados: Prueba de Acceso y Admisión a la Universidad (PEvAU hasta 2024, PAU desde 2025), Matemáticas II, Andalucía, Ceuta, Melilla y centros en Marruecos (Distrito Único Andaluz). "
               "La clasificación por temas es propia. Se ha transcrito cada enunciado a partir del examen oficial; ante cualquier duda, el PDF manda.*\n")
    return "\n".join(out)


def main():
    exams = load_exams()
    errs = validate(exams)
    if errs:
        print("\n".join(errs))
        sys.exit(f"{len(errs)} problemas en los datos")
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "index.qmd").write_text(index_page(exams))
    for t, (slug, _) in TEMAS.items():
        (OUT / f"{slug}.qmd").write_text(tema_page(t, exams))
    n = sum(len(e["ejercicios"]) for e in exams)
    ns = sum(1 for e in exams for x in e["ejercicios"] if x.get("sol"))
    print(f"OK: {len(exams)} exámenes, {n} ejercicios ({ns} con solución) -> {OUT.relative_to(ROOT)}")
    for t, (slug, nombre) in TEMAS.items():
        c = sum(1 for e in exams for x in e["ejercicios"] if x["tema"] == t)
        print(f"  {t:>2} {nombre}: {c}")


if __name__ == "__main__":
    main()
