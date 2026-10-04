#!/usr/bin/env python3
"""Descomprime los zip oficiales de la Junta (Matemáticas Aplicadas a las CC. SS. II) en assets/pau-ccss/<slug>/
y escribe scripts/ebau-ccss/oficial.json.

Uso:  python3 scripts/ebau-ccss/oficial.py <carpeta con sel_AAAA_matematicas_aplicadas.zip>
Origen: https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/examanes_anios_anteriores/selectividad/sel_AAAA_matematicas_aplicadas.zip
Slug de cada examen: AAAA-ord|ext[-res|-sup|-sup1|-sup2][-a|-b]  (a/b: modelos A y B de 2023-2025; son dos exámenes distintos).
Los zip solo traen la convocatoria ordinaria de 2023-2025, así que las extraordinarias de esos años no están.
"""
import hashlib
import json
import re
import shutil
import sys
import unicodedata
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets" / "pau-ccss"


def fold(s):
    return unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()


def classify(year, path):
    """Devuelve (conv, tipo, kind, model) o None. kind: examen | criterios | tabla."""
    p = fold(path)
    name = p.rsplit("/", 1)[-1]
    if not p.endswith(".pdf") or name.startswith("._"):
        return None
    if "tabla" in name:
        kind = "tabla"
    elif "criterio" in name:
        kind = "criterios"
    else:
        kind = "examen"
    if year == 2026:
        conv = "ext" if "extraordinaria" in p else "ord"
        tipo = "sup1" if "incompatibilidad" in p else "sup2" if "incidencias" in p else ""
        return (conv, tipo, kind, "")
    if year in (2021, 2022):
        conv = "ext" if re.search(r"extra", name) else "ord"
    else:
        conv = "ord"
    if year == 2025:
        m = re.search(r"suplente\s*([12])", name)
        tipo = ("sup" + m.group(1)) if m else ""
    elif "suplente" in name:
        tipo = "sup"
    elif "reser" in name:
        tipo = "res"
    else:
        tipo = ""
    model = ""
    if year >= 2023:
        m = re.search(r"(?:^|[^a-z])([ab])(?:[^a-z]|$)", re.sub(r"(suplente|reserva|titular|examen|criterios?|tablas?|normal|matematicas|aplicadas|ccss|ii|cc|ss)", " ", name[:-4]))
        model = m.group(1).upper() if m else ""
    return (conv, tipo, kind, model)


def save_tabla(data):
    """Las tablas de la normal se repiten entre exámenes: una sola copia por contenido en assets/pau-ccss/tablas/."""
    h = hashlib.md5(data).hexdigest()[:8]
    dest = OUT / "tablas" / f"tabla-{h}.pdf"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    return f"assets/pau-ccss/tablas/{dest.name}"


def main(src):
    src = Path(src)
    if OUT.exists():
        shutil.rmtree(OUT)
    manifest = {}
    shared = {}  # (year, conv) -> tabla sin modelo, para copiarla en cada examen del año
    for year in range(2021, 2027):
        with zipfile.ZipFile(src / f"sel_{year}_matematicas_aplicadas.zip") as zf:
            for info in zf.infolist():
                c = classify(year, info.filename)
                if not c:
                    continue
                conv, tipo, kind, model = c
                data = zf.read(info)
                base = f"{year}-{conv}" + (f"-{tipo}" if tipo else "")
                if kind == "tabla" and not (tipo or model) and year in (2023, 2025):
                    shared[(year, conv)] = data  # tabla única del año
                    continue
                slug = base + (f"-{model.lower()}" if model else "")
                label = {"examen": "Examen", "criterios": "Criterios", "tabla": "Tabla de la normal"}[kind]
                if kind == "tabla":
                    manifest.setdefault(slug, []).append({"label": label, "path": save_tabla(data)})
                    continue
                dest = OUT / slug / f"{kind}.pdf"
                dest.parent.mkdir(parents=True, exist_ok=True)
                if dest.exists():
                    sys.exit(f"colisión: {info.filename} -> {dest}")
                dest.write_bytes(data)
                manifest.setdefault(slug, []).append({"label": label, "path": f"assets/pau-ccss/{slug}/{kind}.pdf"})
    for (year, conv), data in shared.items():
        for slug in list(manifest):
            if slug.startswith(f"{year}-{conv}") and not any(x["label"].startswith("Tabla") for x in manifest[slug]):
                manifest[slug].append({"label": "Tabla de la normal", "path": save_tabla(data)})
    order = {"Examen": 0, "Criterios": 1, "Tabla de la normal": 2}
    for v in manifest.values():
        v.sort(key=lambda x: order[x["label"]])
    manifest = dict(sorted(manifest.items()))
    (Path(__file__).resolve().parent / "oficial.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1) + "\n")
    for k, v in manifest.items():
        print(k, [x["label"][:3] for x in v])
    print(len(manifest), "exámenes")


if __name__ == "__main__":
    main(sys.argv[1])
