// Simple numbering for non-book documents
#let equation-numbering = "(1)"
#let callout-numbering = "1"
#let subfloat-numbering(n-super, subfloat-idx) = {
  numbering("1a", n-super, subfloat-idx)
}

// Theorem configuration for theorion
// Simple numbering for non-book documents (no heading inheritance)
#let theorem-inherited-levels = 0

// Theorem numbering format (can be overridden by extensions for appendix support)
// This function returns the numbering pattern to use
#let theorem-numbering(loc) = "1.1"

// Default theorem render function
#let theorem-render(prefix: none, title: "", full-title: auto, body) = {
  if full-title != "" and full-title != auto and full-title != none {
    strong[#full-title.]
    h(0.5em)
  }
  body
}
// Some definitions presupposed by pandoc's typst output.
#let content-to-string(content) = {
  if content.has("text") {
    content.text
  } else if content.has("children") {
    content.children.map(content-to-string).join("")
  } else if content.has("body") {
    content-to-string(content.body)
  } else if content == [ ] {
    " "
  }
}

#let horizontalrule = line(start: (25%,0%), end: (75%,0%))

#let endnote(num, contents) = [
  #stack(dir: ltr, spacing: 3pt, super[#num], contents)
]

#show terms.item: it => block(breakable: false)[
  #text(weight: "bold")[#it.term]
  #block(inset: (left: 1.5em, top: -0.4em))[#it.description]
]

// Some quarto-specific definitions.

#show raw.where(block: true): set block(
    fill: luma(230),
    width: 100%,
    inset: 8pt,
    radius: 2pt
  )

#let block_with_new_content(old_block, new_content) = {
  let fields = old_block.fields()
  let _ = fields.remove("body")
  if fields.at("below", default: none) != none {
    // TODO: this is a hack because below is a "synthesized element"
    // according to the experts in the typst discord...
    fields.below = fields.below.abs
  }
  block.with(..fields)(new_content)
}

#let empty(v) = {
  if type(v) == str {
    // two dollar signs here because we're technically inside
    // a Pandoc template :grimace:
    v.matches(regex("^\\s*$")).at(0, default: none) != none
  } else if type(v) == content {
    if v.at("text", default: none) != none {
      return empty(v.text)
    }
    for child in v.at("children", default: ()) {
      if not empty(child) {
        return false
      }
    }
    return true
  }

}

// Subfloats
// This is a technique that we adapted from https://github.com/tingerrr/subpar/
#let quartosubfloatcounter = counter("quartosubfloatcounter")

#let quarto_super(
  kind: str,
  caption: none,
  label: none,
  supplement: str,
  position: none,
  subcapnumbering: "(a)",
  body,
) = {
  context {
    let figcounter = counter(figure.where(kind: kind))
    let n-super = figcounter.get().first() + 1
    set figure.caption(position: position)
    [#figure(
      kind: kind,
      supplement: supplement,
      caption: caption,
      {
        show figure.where(kind: kind): set figure(numbering: _ => {
          let subfloat-idx = quartosubfloatcounter.get().first() + 1
          subfloat-numbering(n-super, subfloat-idx)
        })
        show figure.where(kind: kind): set figure.caption(position: position)

        show figure: it => {
          let num = numbering(subcapnumbering, n-super, quartosubfloatcounter.get().first() + 1)
          show figure.caption: it => block({
            num.slice(2) // I don't understand why the numbering contains output that it really shouldn't, but this fixes it shrug?
            [ ]
            it.body
          })

          quartosubfloatcounter.step()
          it
          counter(figure.where(kind: it.kind)).update(n => n - 1)
        }

        quartosubfloatcounter.update(0)
        body
      }
    )#label]
  }
}

// callout rendering
// this is a figure show rule because callouts are crossreferenceable
#show figure: it => {
  if type(it.kind) != str {
    return it
  }
  let kind_match = it.kind.matches(regex("^quarto-callout-(.*)")).at(0, default: none)
  if kind_match == none {
    return it
  }
  let kind = kind_match.captures.at(0, default: "other")
  kind = upper(kind.first()) + kind.slice(1)
  // now we pull apart the callout and reassemble it with the crossref name and counter

  // when we cleanup pandoc's emitted code to avoid spaces this will have to change
  let old_callout = it.body.children.at(1).body.children.at(1)
  let old_title_block = old_callout.body.children.at(0)
  let children = old_title_block.body.body.children
  let old_title = if children.len() == 1 {
    children.at(0)  // no icon: title at index 0
  } else {
    children.at(1)  // with icon: title at index 1
  }

  // TODO use custom separator if available
  // Use the figure's counter display which handles chapter-based numbering
  // (when numbering is a function that includes the heading counter)
  let callout_num = it.counter.display(it.numbering)
  let new_title = if empty(old_title) {
    [#kind #callout_num]
  } else {
    [#kind #callout_num: #old_title]
  }

  let new_title_block = block_with_new_content(
    old_title_block,
    block_with_new_content(
      old_title_block.body,
      if children.len() == 1 {
        new_title  // no icon: just the title
      } else {
        children.at(0) + new_title  // with icon: preserve icon block + new title
      }))

  align(left, block_with_new_content(old_callout,
    block(below: 0pt, new_title_block) +
    old_callout.body.children.at(1)))
}

// 2023-10-09: #fa-icon("fa-info") is not working, so we'll eval "#fa-info()" instead
#let callout(body: [], title: "Callout", background_color: rgb("#dddddd"), icon: none, icon_color: black, body_background_color: white) = {
  block(
    breakable: false, 
    fill: background_color, 
    stroke: (paint: icon_color, thickness: 0.5pt, cap: "round"), 
    width: 100%, 
    radius: 2pt,
    block(
      inset: 1pt,
      width: 100%, 
      below: 0pt, 
      block(
        fill: background_color,
        width: 100%,
        inset: 8pt)[#if icon != none [#text(icon_color, weight: 900)[#icon] ]#title]) +
      if(body != []){
        block(
          inset: 1pt, 
          width: 100%, 
          block(fill: body_background_color, width: 100%, inset: 8pt, body))
      }
    )
}




#let article(
  title: none,
  subtitle: none,
  authors: none,
  keywords: (),
  date: none,
  abstract-title: none,
  abstract: none,
  thanks: none,
  cols: 1,
  lang: "en",
  region: "US",
  font: none,
  fontsize: 11pt,
  title-size: 1.5em,
  subtitle-size: 1.25em,
  heading-family: none,
  heading-weight: "bold",
  heading-style: "normal",
  heading-color: black,
  heading-line-height: 0.65em,
  mathfont: none,
  codefont: none,
  linestretch: 1,
  sectionnumbering: none,
  linkcolor: none,
  citecolor: none,
  filecolor: none,
  toc: false,
  toc_title: none,
  toc_depth: none,
  toc_indent: 1.5em,
  doc,
) = {
  // Set document metadata for PDF accessibility
  set document(title: title, keywords: keywords)
  set document(
    author: authors.map(author => content-to-string(author.name)).join(", ", last: " & "),
  ) if authors != none and authors != ()
  set par(
    justify: true,
    leading: linestretch * 0.65em
  )
  set text(lang: lang,
           region: region,
           size: fontsize)
  set text(font: font) if font != none
  show math.equation: set text(font: mathfont) if mathfont != none
  show raw: set text(font: codefont) if codefont != none

  set heading(numbering: sectionnumbering)

  show link: set text(fill: rgb(content-to-string(linkcolor))) if linkcolor != none
  show ref: set text(fill: rgb(content-to-string(citecolor))) if citecolor != none
  show link: this => {
    if filecolor != none and type(this.dest) == label {
      text(this, fill: rgb(content-to-string(filecolor)))
    } else {
      text(this)
    }
   }

  let has-title-block = title != none or (authors != none and authors != ()) or date != none or abstract != none
  if has-title-block {
    place(
      top,
      float: true,
      scope: "parent",
      clearance: 4mm,
      block(below: 1em, width: 100%)[

        #if title != none {
          align(center, block(inset: 2em)[
            #set par(leading: heading-line-height) if heading-line-height != none
            #set text(font: heading-family) if heading-family != none
            #set text(weight: heading-weight)
            #set text(style: heading-style) if heading-style != "normal"
            #set text(fill: heading-color) if heading-color != black

            #text(size: title-size)[#title #if thanks != none {
              footnote(thanks, numbering: "*")
              counter(footnote).update(n => n - 1)
            }]
            #(if subtitle != none {
              parbreak()
              text(size: subtitle-size)[#subtitle]
            })
          ])
        }

        #if authors != none and authors != () {
          let count = authors.len()
          let ncols = calc.min(count, 3)
          grid(
            columns: (1fr,) * ncols,
            row-gutter: 1.5em,
            ..authors.map(author =>
                align(center)[
                  #author.name \
                  #author.affiliation \
                  #author.email
                ]
            )
          )
        }

        #if date != none {
          align(center)[#block(inset: 1em)[
            #date
          ]]
        }

        #if abstract != none {
          block(inset: 2em)[
          #text(weight: "semibold")[#abstract-title] #h(1em) #abstract
          ]
        }
      ]
    )
  }

  if toc {
    let title = if toc_title == none {
      auto
    } else {
      toc_title
    }
    block(above: 0em, below: 2em)[
    #outline(
      title: toc_title,
      depth: toc_depth,
      indent: toc_indent
    );
    ]
  }

  doc
}

#set table(
  inset: 6pt,
  stroke: none
)
#import "@preview/fontawesome:0.5.0": *
#let brand-color = (
  background: rgb("#fbf2d6"),
  coral: rgb("#f4736c"),
  foreground: rgb("#1a1a1a"),
  ink: rgb("#1a1a1a"),
  link: rgb("#262a3d"),
  mint: rgb("#5ec4b6"),
  navy: rgb("#262a3d"),
  paper: rgb("#fbf2d6"),
  primary: rgb("#5ec4b6"),
  secondary: rgb("#f4736c"),
  success: rgb("#5ec4b6"),
  warning: rgb("#f4736c"),
  yellow: rgb("#f5d65b")
)
#let brand-color-background = (
  background: color.mix((brand-color.background, 15%), (brand-color.background, 85%)),
  coral: color.mix((brand-color.coral, 15%), (brand-color.background, 85%)),
  foreground: color.mix((brand-color.foreground, 15%), (brand-color.background, 85%)),
  ink: color.mix((brand-color.ink, 15%), (brand-color.background, 85%)),
  link: color.mix((brand-color.link, 15%), (brand-color.background, 85%)),
  mint: color.mix((brand-color.mint, 15%), (brand-color.background, 85%)),
  navy: color.mix((brand-color.navy, 15%), (brand-color.background, 85%)),
  paper: color.mix((brand-color.paper, 15%), (brand-color.background, 85%)),
  primary: color.mix((brand-color.primary, 15%), (brand-color.background, 85%)),
  secondary: color.mix((brand-color.secondary, 15%), (brand-color.background, 85%)),
  success: color.mix((brand-color.success, 15%), (brand-color.background, 85%)),
  warning: color.mix((brand-color.warning, 15%), (brand-color.background, 85%)),
  yellow: color.mix((brand-color.yellow, 15%), (brand-color.background, 85%))
)
#set page(fill: brand-color.background)
#set text(fill: brand-color.foreground)
#set table.hline(stroke: (paint: brand-color.foreground))
#set line(stroke: (paint: brand-color.foreground))
#let brand-logo = (:)
#set text()
#show heading: set text(font: ("Bricolage Grotesque",), weight: 700, )
#show raw.where(block: false): set text()
#show raw.where(block: true): set text()
#show link: set text(fill: rgb("#5ec4b6"), )

#set page(
  paper: "a4",
  margin: (bottom: 3cm,top: 2.2cm,x: 2.2cm,),
  numbering: none,
  columns: 1,
  footer: context {
    set text(font: "JetBrains Mono", size: 8pt, fill: rgb("#1A1A1A"))
    line(length: 100%, stroke: 2pt + black)
    v(6pt)
    let cell(bg, fg, sym) = box(
      fill: bg, width: 7pt, height: 7pt,
      align(center + horizon)[#text(fill: fg, weight: 900, size: 6pt)[#sym]]
    )
    box(width: 100%)[
      #box(stroke: 2pt + black)[
        #grid(
          columns: (7pt, 7pt), rows: (7pt, 7pt), gutter: 0pt,
          cell(rgb("#5EC4B6"), rgb("#000000"), "+"),
          cell(rgb("#262A3D"), rgb("#F5D65B"), sym.minus),
          cell(rgb("#F4736C"), rgb("#000000"), sym.times),
          cell(rgb("#F5D65B"), rgb("#000000"), "="),
        )
      ]
      #h(6pt)
      #text(weight: "bold")[MD MATEMÁTICAS]
      #h(1fr)
      #counter(page).display("1 / 1", both: true)
    ]
  },
)

#show: doc => article(
  title: [Determinantes],
  font: ("Inter",),
  heading-family: ("Bricolage Grotesque",),
  heading-weight: 700,
  heading-color: rgb("#1a1a1a"),
  codefont: ("JetBrains Mono",),
  toc_title: [Table of contents],
  toc_depth: 3,
  doc,
)

= 1. Determinante de una matriz cuadrada
<determinante-de-una-matriz-cuadrada>
El #strong[determinante] $\|A\|$ (o $det A$) asigna un número a cada matriz cuadrada. Sirve para saber si $A$ tiene inversa, calcularla, hallar el rango y resolver sistemas.

#strong[Orden 2]: producto de la diagonal principal menos producto de la diagonal secundaria.

$ mat(delim: "||", a, b; c, d) = a d - b c #h(2em) upright("Ejemplo: ") mat(delim: "||", 3, - 1; 2, 5) = 15 + 2 = 17 $

#strong[Orden 3 --- regla de Sarrus]: suma de los tres productos en la dirección de la diagonal principal menos los tres en la dirección de la secundaria.

$ mat(delim: "||", a_11, a_12, a_13; a_21, a_22, a_23; a_31, a_32, a_33) = a_11 a_22 a_33 + a_12 a_23 a_31 + a_13 a_21 a_32 - a_13 a_22 a_31 - a_11 a_23 a_32 - a_12 a_21 a_33 $

#block[
#callout(
body: 
[
Sarrus solo vale para orden 3. Para orden 4 o mayor se usan adjuntos o se hacen ceros.

]
, 
title: 
[
Note
]
, 
background_color: 
brand-color-background.primary
, 
icon_color: 
brand-color.primary
, 
icon: 
fa-info()
, 
body_background_color: 
brand-color.background
)
]
= 2. Menores y adjuntos: desarrollo por una fila o columna
<menores-y-adjuntos-desarrollo-por-una-fila-o-columna>
- El #strong[menor] $M_(i j)$ es el determinante que queda al quitar la fila $i$ y la columna $j$.
- El #strong[adjunto] es $A_(i j) =\(- 1\)^(i + j)M_(i j)$. Los signos forman el tablero $mat(delim: "(", +, -, +; -, +, -; +, -, +)$.

#strong[Desarrollo por la fila $i$]: $ \|A\|= a_(i 1) A_(i 1) + a_(i 2) A_(i 2) + dots.h + a_(i n) A_(i n) $

Se puede desarrollar por cualquier fila o columna; conviene elegir la que tenga más ceros.

Ejemplo, desarrollando por la primera fila: $ mat(delim: "||", 2, 0, 1; 1, 3, - 1; 0, 4, 2) = 2 mat(delim: "||", 3, - 1; 4, 2) - 0 + 1 mat(delim: "||", 1, 3; 0, 4) = 2 dot.op 10 + 4 = 24 $

= 3. Propiedades
<propiedades>
Sean $A\,B$ matrices cuadradas de orden $n$ y $k$ un número:

#table(
  columns: 2,
  align: (auto,auto,),
  table.header([Propiedad], [Fórmula],),
  table.hline(),
  [Traspuesta], [$\|A^t\|=\|A\|$],
  [Producto], [$\|A B\|=\|A\|\|B\|$],
  [Inversa], [$\|A^(- 1)\|= frac(1, \|A\|)$],
  [Producto por un número], [$\|k A\|= k^n\|A\|$],
  [Potencia], [$\|A^m\|=\|A\|^m$],
)
#strong[Sobre filas (o columnas)]:

+ Si se #strong[intercambian] dos filas, el determinante #strong[cambia de signo].
+ Si una fila se #strong[multiplica por $k$], el determinante queda multiplicado por $k$.
+ Si a una fila se le #strong[suma un múltiplo de otra], el determinante #strong[no cambia].
+ Si una fila es combinación lineal de otras (en particular, dos filas iguales o proporcionales, o una fila de ceros), $\|A\|= 0$.
+ El determinante de una matriz triangular (o diagonal) es el producto de su diagonal.

#block[
#callout(
body: 
[
Ojo: $\|A + B\|eq.not\|A\|+\|B\|$ en general, y $\|k A\|eq.not k\|A\|$ (es $k^n\|A\|$).

]
, 
title: 
[
Warning
]
, 
background_color: 
brand-color-background.warning
, 
icon_color: 
brand-color.warning
, 
icon: 
fa-exclamation-triangle()
, 
body_background_color: 
brand-color.background
)
]
#strong[Truco para calcular]: usa la propiedad 3 para hacer ceros en una columna y desarrolla por ella. En un determinante $4 times 4$ conviene dejar un solo elemento no nulo en una columna.

= 4. Matriz inversa con determinantes
<matriz-inversa-con-determinantes>
$A$ es #strong[invertible] $arrow.l.r.double\|A\|eq.not 0$. En ese caso:

$ A^(- 1) = frac(1, \|A\|) thin #scale(x: 120%, y: 120%)[\(] "Adj" A #scale(x: 120%, y: 120%)[\)]^t $

donde $"Adj" A$ es la matriz formada por los adjuntos $A_(i j)$.

#strong[Pasos]: (1) calcula $\|A\|$ y comprueba que no es 0; (2) calcula la matriz de adjuntos; (3) trasponla; (4) divide entre $\|A\|$.

Para orden 2: $mat(delim: "(", a, b; c, d)^(- 1) = frac(1, a d - b c) mat(delim: "(", d, - b; - c, a)$.

Ejemplo: $A = mat(delim: "(", 1, 2, 3; 0, 1, 4; 5, 6, 0)$ tiene $\|A\|= 1$. Sus adjuntos dan $ "Adj" A = mat(delim: "(", - 24, 20, - 5; 18, - 15, 4; 5, - 4, 1) quad arrow.r.double quad A^(- 1) = mat(delim: "(", - 24, 18, 5; 20, - 15, - 4; - 5, 4, 1) $

= 5. Rango por menores
<rango-por-menores>
El #strong[rango] de $A$ es el orden del mayor menor no nulo.

Método:

+ Busca un menor de orden 1 no nulo (un elemento $eq.not 0$): $"rg" gt.eq 1$.
+ Busca un menor de orden 2 no nulo: $"rg" gt.eq 2$.
+ Orla ese menor con una fila y una columna más; si todos los menores de orden 3 que lo contienen son 0, el rango es 2. Y así sucesivamente.

Con un parámetro $m$: calcula los menores del orden máximo, iguala a 0, y estudia por separado los valores problemáticos de $m$.

Ejemplo: $mat(delim: "(", 1, 2, 3; 2, 4, 6; 1, 0, 1)$ tiene $\|A\|= 0$ (la fila 2 es el doble de la 1) y el menor $mat(delim: "||", 1, 2; 1, 0) = - 2 eq.not 0$, luego el rango es 2.

= 6. Ecuaciones con determinantes
<ecuaciones-con-determinantes>
- Para que una matriz cuadrada con parámetro #strong[no sea invertible]: resuelve $\|A\|= 0$.
- Para resolver $\|A\|= 0$ con una incógnita $x$: desarrolla, factoriza y busca las raíces.
- Determinante de Vandermonde: $ mat(delim: "||", 1, 1, 1; a, b, c; a^2, b^2, c^2) =\(b - a\)\(c - a\)\(c - b\) $

#block[
#callout(
body: 
[
- $\|A\|eq.not 0 arrow.l.r.double A$ invertible $arrow.l.r.double "rg" A = n$.
- $\|A B\|=\|A\|\|B\|$, $\|A^(- 1)\|= 1\/\|A\|$, $\|k A\|= k^n\|A\|$.
- Intercambiar filas cambia el signo; sumar múltiplos de otra fila no cambia nada.
- $A^(- 1) = frac(1, \|A\|)\("Adj" A\)^t$.
- Rango: mayor orden de un menor no nulo.

]
, 
title: 
[
Resumen rápido
]
, 
background_color: 
brand-color-background.success
, 
icon_color: 
brand-color.success
, 
icon: 
fa-lightbulb()
, 
body_background_color: 
brand-color.background
)
]



