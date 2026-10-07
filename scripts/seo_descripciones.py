"""Añade `description:` (meta description) al front matter de apuntes, ejercicios y actividades.
Idempotente: no toca páginas que ya la tienen. No toca ejercicios/**/ebau (generadas por build.py)."""
import re, sys
from pathlib import Path

CURSOS = {
    "3-eso": "3º ESO",
    "2-bachillerato-ciencias": "2º Bachillerato Ciencias (Matemáticas II)",
    "2-bachillerato-ccss": "2º Bachillerato Ciencias Sociales (Matemáticas Aplicadas II)",
}
PLANTILLAS = {
    "apuntes": "Apuntes de {t} de {c} en Andalucía: teoría clara, ejemplos resueltos paso a paso y fórmulas para repasar y preparar el examen.",
    "ejercicios": "Ejercicios de {t} de {c} en Andalucía, con soluciones paso a paso. {x}",
    "actividades": "Actividades interactivas de {t} para {c} en Andalucía: practica online con corrección inmediata.",
}
EXTRA = {
    "2-bachillerato-ciencias": "Incluye ejercicios tipo PAU (Selectividad Andalucía).",
    "2-bachillerato-ccss": "Incluye ejercicios tipo PAU (Selectividad Andalucía).",
    "3-eso": "Con problemas y situaciones competenciales.",
}
raiz = Path(__file__).resolve().parent.parent
n = 0
for seccion, plantilla in PLANTILLAS.items():
    for f in sorted((raiz / seccion).glob("*/*/*.qmd")):
        curso = f.relative_to(raiz / seccion).parts[0]
        if curso not in CURSOS or "fuentes" in f.parts or "ebau" in f.parts:
            continue
        txt = f.read_text(encoding="utf-8")
        m = re.match(r"---\n(.*?)\n---\n", txt, re.S)
        if not m or re.search(r"^description:", m.group(1), re.M):
            continue
        t = re.search(r'^title:\s*"?(.*?)"?\s*$', m.group(1), re.M)
        if not t:
            continue
        titulo = re.split(r" — ", t.group(1))[0].strip()
        d = plantilla.format(t=titulo.lower() if titulo[:1].isupper() and not titulo.isupper() else titulo,
                             c=CURSOS[curso], x=EXTRA[curso]).replace('"', "'")
        nuevo = f'---\n{m.group(1)}\ndescription: "{d}"\n---\n' + txt[m.end():]
        f.write_text(nuevo, encoding="utf-8"); n += 1
print(n, "páginas con description")
