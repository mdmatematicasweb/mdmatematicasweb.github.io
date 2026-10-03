#!/usr/bin/env python3
"""Descomprime los zip oficiales de la Junta (Matemáticas II) en assets/pau/<slug>/ y escribe scripts/ebau/oficial.json.

Uso:  python3 scripts/ebau/oficial.py <carpeta con sel_AAAA_matematicas.zip>
Origen: https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/?q=grados&d=g_b_examenes_anteriores.php
        (zip en .../sguit/examanes_anios_anteriores/selectividad/sel_AAAA_matematicas.zip)
build.py enlaza estas copias en lugar de la web de terceros; si un examen no está aquí, usa urls.txt.
"""
import json
import re
import shutil
import sys
import unicodedata
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets" / "pau"


def fold(s):
    return unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()


def classify(year, path):
    p = fold(path)
    if not p.endswith(".pdf"):
        return None
    if "tabla" in p and "normal" in p and "examen" not in p:
        return ("ord", "", "tabla", "")
    conv = "ext" if ("extra" in p) else "ord"
    if "incompatibilidad" in p:
        tipo = "sup1"
    elif "incidencias" in p:
        tipo = "sup2"
    elif m := re.search(r"suplente\s*([12])", p):
        tipo = "sup" + m.group(1)
    elif "suplente" in p:
        tipo = "sup"
    elif "reser" in p:
        tipo = "res"
    else:
        tipo = ""
    kind = "criterios" if "criterios" in p else "examen"
    base = re.sub(r"(criterios|examen|matematicas|ii|impreso|titular|reserva|reser|suplente\d?|extra|ord)", " ", p.rsplit("/", 1)[-1][:-4])
    ab = re.findall(r"(?<![a-z])([ab])(?![a-z])", base)
    model = ab[0].upper() if year >= 2023 and ab else ""
    return (conv, tipo, kind, model)


def main(src):
    src = Path(src)
    if OUT.exists():
        shutil.rmtree(OUT)
    manifest = {}
    for year in range(2021, 2027):
        z = src / f"sel_{year}_matematicas.zip"
        with zipfile.ZipFile(z) as zf:
            for info in zf.infolist():
                c = classify(year, info.filename)
                if not c:
                    continue
                conv, tipo, kind, model = c
                slug = f"{year}-{conv}" + (f"-{tipo}" if tipo else "")
                name = kind + (f"-{model.lower()}" if model else "") + ".pdf"
                dest = OUT / slug / name
                dest.parent.mkdir(parents=True, exist_ok=True)
                if dest.exists():
                    sys.exit(f"colisión: {info.filename} -> {dest}")
                dest.write_bytes(zf.read(info))
                label = {"examen": "Examen", "criterios": "Criterios", "tabla": "Tabla de la normal"}[kind] + (f" {model}" if model else "")
                manifest.setdefault(slug, []).append({"label": label, "path": f"assets/pau/{slug}/{name}"})
    for v in manifest.values():
        v.sort(key=lambda x: (x["label"].startswith("Tabla"), x["label"].startswith("Criterios"), x["label"]))
    (Path(__file__).resolve().parent / "oficial.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=1) + "\n")
    for k in sorted(manifest):
        print(k, [x["label"] for x in manifest[k]])


if __name__ == "__main__":
    main(sys.argv[1])
