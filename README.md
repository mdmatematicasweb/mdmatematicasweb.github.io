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
