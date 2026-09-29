#set page(
  paper: $if(papersize)$"$papersize$"$else$"a4"$endif$,
$if(margin)$
  margin: ($for(margin/pairs)$$margin.key$: $margin.value$,$endfor$),
$else$
  margin: (x: 2.2cm, top: 2.2cm, bottom: 3cm),
$endif$
  numbering: none,
  columns: $if(columns)$$columns$$else$1$endif$,
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
$if(logo)$
#set page(background: align($logo.location$, box(inset: $logo.inset$, image("$logo.path$", width: $logo.width$$if(logo.alt)$, alt: "$logo.alt$"$endif$))))
$endif$
