#!/usr/bin/env python3
"""Genera las páginas «PAU Andalucía por temas» de 2º Bachillerato Ciencias Sociales a partir de scripts/ebau-ccss/data/*.md.

Uso:  python3 scripts/ebau-ccss/build.py

Cada fichero de data/ es un examen (front matter + ejercicios separados por líneas «@@ n | bloque | pts | tema | también»).
Las soluciones van aparte, en soluciones/<slug>.md (mismo nombre que el examen): bloques «@@ n» seguidos del texto
de la solución en Markdown. Se muestran plegadas debajo de cada enunciado.
Las páginas se escriben en ejercicios/2-bachillerato-ccss/ebau/. No edites esas páginas a mano: edita data/ y vuelve a ejecutar.
Los PDF oficiales de la Junta están en assets/pau-ccss/ (los extrae oficial.py).
"""
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = Path(__file__).resolve().parent / "data"
SOLS = Path(__file__).resolve().parent / "soluciones"
OUT = ROOT / "ejercicios" / "2-bachillerato-ccss" / "ebau"
OFICIAL = json.loads((Path(__file__).resolve().parent / "oficial.json").read_text())  # copias locales de la Junta (oficial.py)

TEMAS = {
    1: ("01-matrices-determinantes", "Matrices y determinantes"),
    2: ("02-sistemas-ecuaciones-lineales", "Sistemas de ecuaciones lineales"),
    3: ("03-programacion-lineal", "Programación lineal"),
    4: ("04-funciones", "Funciones"),
    5: ("05-limites-continuidad", "Límites y continuidad"),
    6: ("06-derivadas", "Derivadas"),
    7: ("07-aplicaciones-derivada", "Aplicaciones de la derivada"),
    8: ("08-integrales", "Integrales"),
    9: ("09-probabilidad", "Probabilidad"),
    10: ("10-distribuciones", "Distribuciones binomial y normal"),
    11: ("11-muestreo-inferencia", "Muestreo e inferencia"),
}
BLOQUE = {"A": "Bloque A", "B": "Bloque B", "C": "Bloque C", "D": "Bloque D"}
CONV_ORDER = ["Ordinaria", "Ordinaria · Reserva", "Ordinaria · Suplente", "Ordinaria · Suplente 1", "Ordinaria · Suplente 2",
              "Extraordinaria", "Extraordinaria · Reserva", "Extraordinaria · Suplente", "Extraordinaria · Suplente 1", "Extraordinaria · Suplente 2"]
EXPECTED = {2021: 8, 2022: 8, 2023: 8, 2024: 8, 2025: 7}  # 2026: ejercicios con apartados A) y B); se exige 1, 2, 3 y 4
FORMATO = {
    2021: "8 ejercicios en 4 bloques (A, B, C, D) de 2; se hacen 4 cualesquiera de al menos 3 bloques distintos. Cada uno vale 2,5 puntos.",
    2022: "8 ejercicios en 4 bloques (A, B, C, D) de 2; se hacen 4 cualesquiera de al menos 3 bloques distintos. Cada uno vale 2,5 puntos.",
    2023: "8 ejercicios en 4 bloques (A, B, C, D) de 2; se hacen 4 cualesquiera de al menos 3 bloques distintos. Cada uno vale 2,5 puntos. Dos modelos de cada examen (A y B).",
    2024: "8 ejercicios en 4 bloques (A, B, C, D) de 2; se hacen 4 cualesquiera de al menos 3 bloques distintos. Cada uno vale 2,5 puntos. Dos modelos de cada examen (A y B).",
    2025: "7 ejercicios: 1 en el bloque A y 2 en cada uno de los bloques B, C y D; se hacen 4, uno de cada bloque. Cada uno vale 2,5 puntos. Dos modelos de cada examen (A y B).",
    2026: "4 ejercicios (1 álgebra, 2 análisis, 3 y 4 estadística y probabilidad); en algunos se elige entre los apartados A) y B). Los puntos se indican en cada ejercicio.",
}


AYUDAS = Path(__file__).resolve().parent / "ayudas"


def load_ayudas():
    """Conceptos (ayudas/conceptos.md) y su asignación a ejercicios (ayudas/asignacion.tsv)."""
    conceptos = {}
    for blk in re.split(r"^@@ ", (AYUDAS / "conceptos.md").read_text(), flags=re.M)[1:]:
        head, _, body = blk.partition("\n")
        cid, titulo = [x.strip() for x in head.split("|")]
        m = re.fullmatch(r"\s*### R\n(.*?)\n### M\n(.*)", body, re.S)
        if not m:
            sys.exit(f"ayudas/conceptos.md: {cid} necesita «### R» y «### M»")
        conceptos[cid] = {"titulo": titulo, "R": m.group(1).strip(), "M": m.group(2).strip()}
    asign = {}
    for l in (AYUDAS / "asignacion.tsv").read_text().splitlines():
        if not l.strip() or l.startswith("#"):
            continue
        slug, n, ids = l.split("\t")
        ids = [i for i in ids.split(",") if i]
        for i in ids:
            if i not in conceptos:
                sys.exit(f"ayudas/asignacion.tsv: {slug} {n}: concepto desconocido {i!r}")
        asign[(slug, n)] = ids
    return conceptos, asign


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
        exam = {"slug": meta["slug"], "year": int(meta["year"]), "conv": meta["conv"], "modelo": meta.get("modelo", ""),
                "curso": meta["curso"], "ejercicios": exs}
        if meta["slug"] + ".md" != f.name:
            sys.exit(f"{f.name}: el slug {meta['slug']!r} no coincide con el nombre del fichero")
        if meta["slug"] not in OFICIAL:
            sys.exit(f"{f.name}: {meta['slug']} no está en oficial.json (ejecuta oficial.py)")
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


def num_key(n):
    """«3», «3A» -> (3, 'A') para ordenar ejercicios."""
    m = re.fullmatch(r"(\d+)([AB]?)", n)
    return (int(m.group(1)), m.group(2))


def validate(exams):
    errs = []
    _, asign = load_ayudas()
    claves = {(e["slug"], x["n"]) for e in exams for x in e["ejercicios"]}
    for k in sorted(claves - set(asign)):
        errs.append(f"{k[0]} ej.{k[1]}: sin ayudas en ayudas/asignacion.tsv")
    for k in sorted(set(asign) - claves):
        errs.append(f"{k[0]} ej.{k[1]}: asignación de ayudas para un ejercicio que no existe")
    for k, ids in asign.items():
        if not ids:
            errs.append(f"{k[0]} ej.{k[1]}: lista de ayudas vacía")
    for e in exams:
        tag = e["slug"]
        ns = [x["n"] for x in e["ejercicios"]]
        if e["year"] in EXPECTED:
            if len(ns) != EXPECTED[e["year"]]:
                errs.append(f"{tag}: {len(ns)} ejercicios, se esperaban {EXPECTED[e['year']]}")
        else:
            base = {num_key(n)[0] for n in ns}
            if base != {1, 2, 3, 4}:
                errs.append(f"{tag}: faltan ejercicios, hay {sorted(base)}")
        if e["conv"] not in CONV_ORDER:
            errs.append(f"{tag}: convocatoria desconocida {e['conv']!r}")
        if (e["year"] >= 2023 and e["year"] <= 2025) != bool(e["modelo"]):
            errs.append(f"{tag}: modelo A/B {'ausente' if not e['modelo'] else 'inesperado'}")
        seen = set()
        for x in e["ejercicios"]:
            who = f"{tag} ej.{x['n']}"
            try:
                num_key(x["n"])
            except AttributeError:
                errs.append(f"{who}: número inválido")
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
    """Enlaces a los PDF oficiales locales (assets/pau-ccss)."""
    return [(f["label"], "../../../" + f["path"]) for f in OFICIAL[e["slug"]]
            if not (solo_examen and f["label"].startswith(("Criterios", "Tabla")))]


def md_links(e, sep, solo_examen=False):
    return sep.join(f"[{l}]({u}){{target=\"_blank\"}}" for l, u in pdf_links(e, solo_examen))


def anchor(e, x):
    return f"ebau-{e['slug']}-{x['n']}"


def nombre(e):
    """«Ordinaria · Suplente · Modelo A» (con el modelo si lo hay)."""
    return e["conv"] + (f" · Modelo {e['modelo']}" if e["modelo"] else "")


def label(e):
    return f"{e['year']} {nombre(e)}"


def exam_key(e):
    return (CONV_ORDER.index(e["conv"]), e["modelo"])


def conv_key(e):
    return (-e["year"],) + exam_key(e)


def sort_ej(x):
    return num_key(x["n"])


CONCEPTOS, ASIGN = load_ayudas()


def tema_page(t, exams):
    slug, nombre_t = TEMAS[t]
    principales = [(e, x) for e in exams for x in e["ejercicios"] if x["tema"] == t]
    relacionados = [(e, x) for e in exams for x in e["ejercicios"] if t in x["tambien"]]
    by_year = defaultdict(list)
    for e, x in principales:
        by_year[e["year"]].append((e, x))
    out = [f'---\ntitle: "PAU Andalucía — {nombre_t}"\nlang: es\n---\n']
    out.append(f"Ejercicios de **Matemáticas Aplicadas a las Ciencias Sociales II** de la prueba de acceso a la universidad en Andalucía (PAU, antes PEvAU) de **2021 a 2026** cuyo tema principal es *{nombre_t.lower()}*: "
               f"**{len(principales)} ejercicios** de convocatorias ordinarias y extraordinarias y de sus reservas o suplentes. "
               f"Repasa antes la [teoría](../../../apuntes/2-bachillerato-ccss/{slug}/index.qmd), "
               f"los [ejercicios del tema](../{slug}/index.qmd) y las [actividades interactivas](../../../actividades/2-bachillerato-ccss/{slug}/index.qmd).\n")
    out.append("Debajo de cada ejercicio hay tres desplegables, de menos a más ayuda: **Ayuda 1 · Recordatorio** (la teoría que necesitas, sin tocar los datos), **Ayuda 2 · Método** (los pasos a seguir) y la **resolución breve** con el resultado. Inténtalo con la menor ayuda posible.\n")
    if t in (10, 11):
        out.append("> Se usa la tabla de la normal N(0,1) que acompaña a cada examen: los resultados se dan con los valores de la tabla (z a dos decimales), no con la calculadora.\n")
    if not principales:
        out.append("*Ningún ejercicio de este tema en el periodo 2021–2026.*\n")
    for y in sorted(by_year, reverse=True):
        out.append(f"\n## {y}\n")
        last = None
        for e, x in sorted(by_year[y], key=lambda p: (exam_key(p[0]), sort_ej(p[1]))):
            if nombre(e) != last:
                out.append(f"\n### {nombre(e)} {y}\n")
                last = nombre(e)
            otros = ", ".join(f"[{TEMAS[o][1]}]({TEMAS[o][0]}.qmd)" for o in x["tambien"])
            extra = f"\n\n*Relacionado también con:* {otros}." if otros else ""
            ids = ASIGN[(e["slug"], x["n"])]
            ayuda = "".join(
                f"\n\n:::: {{.callout-note collapse=\"true\" appearance=\"simple\"}}\n## {titulo}\n\n"
                + "\n\n".join(f"**{CONCEPTOS[i]['titulo']}.**\n\n{CONCEPTOS[i][k]}" if len(ids) > 1 else CONCEPTOS[i][k] for i in ids)
                + "\n::::"
                for k, titulo in (("R", "Ayuda 1 · Recordatorio"), ("M", "Ayuda 2 · Método")))
            sol = (f"\n\n:::: {{.callout-tip collapse=\"true\" appearance=\"simple\"}}\n## Solución\n\n{x['sol']}\n::::"
                   if x.get("sol") else "")
            out.append(
                f"\n::::: {{.ebau-ej #{anchor(e, x)}}}\n"
                f"**Ejercicio {x['n']}** · {nombre(e)} {y} · {BLOQUE[x['bloque']]} · *({x['pts']} puntos)* · {md_links(e, ' · ', True)}\n\n"
                f"{x['tex']}{extra}{ayuda}{sol}\n"
                f":::::\n"
            )
    if relacionados:
        out.append("\n## También trabajan este tema\n")
        out.append("Ejercicios cuyo tema principal es otro pero en los que aparece este tema:\n")
        for e, x in sorted(relacionados, key=lambda p: (conv_key(p[0]), sort_ej(p[1]))):
            s2, n2 = TEMAS[x["tema"]]
            out.append(f"- [{label(e)}, ejercicio {x['n']}]({s2}.qmd#{anchor(e, x)}) (tema principal: {n2})")
        out.append("")
    out.append("\n---\n\n*Enunciados: Prueba de Acceso y Admisión a la Universidad (PEvAU hasta 2024, PAU desde 2025), Matemáticas Aplicadas a las Ciencias Sociales II, Andalucía, Ceuta, Melilla y centros en Marruecos (Distrito Único Andaluz). "
               "Cada ejercicio enlaza al PDF oficial del examen completo. La clasificación por temas es propia y puede discutirse: los ejercicios mixtos figuran en su tema principal.*\n")
    return "\n".join(out)


def index_page(exams):
    cnt = defaultdict(lambda: defaultdict(int))
    for e in exams:
        for x in e["ejercicios"]:
            cnt[x["tema"]][e["year"]] += 1
    years = sorted({e["year"] for e in exams}, reverse=True)
    total = sum(len(e["ejercicios"]) for e in exams)
    out = ['---\ntitle: "PAU Andalucía 2021–2026 por temas"\nlang: es\n---\n']
    out.append(f"Relación de los **{total} ejercicios** de Matemáticas Aplicadas a las Ciencias Sociales II de la PAU (antes PEvAU) de Andalucía entre 2021 y 2026, agrupados por el tema de 2º de Bachillerato Ciencias Sociales al que pertenecen. "
               f"Incluye todas las convocatorias que publica la Junta (**ordinaria** y, en 2021, 2022 y 2026, **extraordinaria**) con sus exámenes de **reserva** y **suplentes** ({len(exams)} exámenes). "
               "Cada ejercicio indica de qué examen procede, enlaza al PDF oficial completo y tiene debajo una **resolución breve** plegada (pulsa «Solución» después de intentarlo).\n")
    out.append("> Los ejercicios de los apartados A) y B) de 2026 figuran por separado (por ejemplo, 1A y 1B). Las convocatorias extraordinarias de 2023, 2024 y 2025 no figuran porque la Junta no las incluye en su web de exámenes anteriores.\n")
    out.append("## Ejercicios por tema y año\n")
    out.append("| Tema | " + " | ".join(str(y) for y in years) + " | Total |")
    out.append("|---|" + "---:|" * (len(years) + 1))
    for t, (slug, nombre_t) in TEMAS.items():
        row = [f"[{t}. {nombre_t}]({slug}.qmd)"] + [str(cnt[t][y]) if cnt[t][y] else "·" for y in years] + [f"**{sum(cnt[t].values())}**"]
        out.append("| " + " | ".join(row) + " |")
    out.append("\n## Formato del examen\n")
    for y in years:
        out.append(f"- **{y}**: {FORMATO[y]}")
    out.append("\n## Exámenes incluidos\n")
    out.append("Enlaces a los PDF oficiales (examen, criterios de corrección y tabla de la normal):\n")
    for y in years:
        es = sorted([e for e in exams if e["year"] == y], key=exam_key)
        out.append(f"- **{y}**")
        for e in es:
            out.append(f"  - {nombre(e)}: " + md_links(e, " · "))
        out.append("")
    out.append("\n---\n\n*Enunciados: Prueba de Acceso y Admisión a la Universidad (PEvAU hasta 2024, PAU desde 2025), Matemáticas Aplicadas a las Ciencias Sociales II, Andalucía, Ceuta, Melilla y centros en Marruecos (Distrito Único Andaluz). "
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
    for t, (slug, nombre_t) in TEMAS.items():
        c = sum(1 for e in exams for x in e["ejercicios"] if x["tema"] == t)
        print(f"  {t:>2} {nombre_t}: {c}")


if __name__ == "__main__":
    main()
