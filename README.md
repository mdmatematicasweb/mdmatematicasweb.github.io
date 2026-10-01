# MD Matemáticas

Apuntes, ejercicios y actividades interactivas de matemáticas, generados con [Quarto](https://quarto.org).

## Estructura

- `apuntes/<curso>/` — notas de teoría por curso y tema
- `ejercicios/<curso>/` — guías de ejercicios con respuestas colapsables
- `actividades/` — actividades interactivas (GeoGebra embebido, OJS, apps propias)

## Desarrollo local

```sh
quarto preview
```

## Publicación

Push a `main` dispara `.github/workflows/publish.yml`, que renderiza con Quarto y publica en la rama `gh-pages`. Sitio queda disponible en https://mdmatematicasweb.github.io

## Identidad visual

Colores, tipografía definidos en `_brand.yml`. Editar ese archivo pa cambiar paleta/tipografía en todo el sitio de una vez.

## Figuras de los apuntes

Las figuras SVG de los apuntes (`apuntes/**/fig-*.svg`) se generan con `python3 scripts/figuras/build.py`. No se editan a mano.

## Licencia

Contenidos didácticos: CC BY-NC-ND 4.0. Código, diseño, logotipo y nombre: todos los derechos reservados. Detalle en `LICENSE` y en la página `licencia.qmd`.
