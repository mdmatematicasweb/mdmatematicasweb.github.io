@@ 1
**a) Formulación.**
1. **Incógnitas.** $x$ = número de surtidos de tipo $A$, $y$ = número de surtidos de tipo $B$.
2. **Función objetivo.** Cada $A$ se vende a 2,40 € y cada $B$ a 1,80 €: hay que **maximizar $F(x,y)=2{,}4x+1{,}8y$**.
3. **Restricciones** (pasando kilos a gramos: 3,75 kg $=3750$ g y 4 kg $=4000$ g):
   - arándanos: $75x+75y\le3750\iff x+y\le50$,
   - frambuesas: $100x+50y\le4000\iff2x+y\le80$,
   - los de tipo $A$ no superan el doble de los de tipo $B$: $x\le2y$,
   - no negatividad: $x\ge0$, $y\ge0$.

**b) Región y mínimo de $F(x,y)=2x+y$.**
1. Fronteras: $x+4y=5$, $x+2y=4$, $7x+5y=35$ y $x=0$. Con un punto de prueba se ve que la región queda por encima de las dos primeras rectas, bajo la tercera y a la derecha de $x=0$.
2. **Vértices** (cortes de dos fronteras): $(0,7)$ (de $x=0$ y $7x+5y=35$), $(0,2)$ (de $x=0$ y $x+2y=4$), $\left(3,\frac{1}{2}\right)$ (de $x+4y=5$ y $x+2y=4$) y $(5,0)$ (de $x+4y=5$ y $7x+5y=35$).
3. Se evalúa $F=2x+y$ en cada vértice:

| Vértice | $(0,7)$ | $(0,2)$ | $\left(3,\frac{1}{2}\right)$ | $(5,0)$ |
|---|---|---|---|---|
| $F=2x+y$ | $7$ | $2$ | $\frac{13}{2}$ | $10$ |

![Región factible del ejercicio 1 (2021-ord-res), con sus vértices: (0, 2), (3, 0,5), (5, 0), (0, 7)](fig/2021-ord-res-e1.svg){fig-alt="Región factible del ejercicio 1 (2021-ord-res), con sus vértices: (0, 2), (3, 0,5), (5, 0), (0, 7)" width="75%" fig-align="center"}

4. El menor valor es $2$.

**El mínimo se alcanza en el punto $(0,2)$ y vale $2$.**

@@ 2
**a) Dimensión de $X$.**
1. $10I_3-A$ es $3\times3$ y $B$ es $3\times1$.
2. Para que el producto $(3\times3)\cdot X$ dé una matriz $3\times1$, $X$ ha de tener 3 filas (columnas de la primera) y 1 columna (las de $B$).

**$X$ es de dimensión $3\times1$.**

**b) ¿Solución para cualquier $B$?**
1. $10I_3-A=\begin{pmatrix}8&-1&0\\-4&8&0\\-2&-2&5\end{pmatrix}$.
2. Se calcula el determinante por la última columna: $|10I_3-A|=5\cdot(64-4)=300\neq0$.
3. Es invertible, luego $X=(10I_3-A)^{-1}B$ existe y es única **para cualquier $B$ de orden $3\times1$.**

**c) Resolución.**
1. Se usa la inversa (por adjuntos): $(10I_3-A)^{-1}=\begin{pmatrix}\frac{2}{15}&\frac{1}{60}&0\\\frac{1}{15}&\frac{2}{15}&0\\\frac{2}{25}&\frac{3}{50}&\frac{1}{5}\end{pmatrix}$.
2. Se multiplica por $B=\begin{pmatrix}5&20&-3\end{pmatrix}^{t}$:
$$X=(10I_3-A)^{-1}\begin{pmatrix}5\\20\\-3\end{pmatrix}=\begin{pmatrix}1\\3\\1\end{pmatrix}.$$
3. Comprobación en la ecuación original: $8\cdot1-3=5$, $-4+24=20$, $-2-6+5=-3$.

@@ 3
**a) Continuidad y derivabilidad.**
1. Cada rama es un polinomio. Hay que igualar los valores de las dos ramas en los puntos de cambio, $x=-2$ y $x=2$.
2. En $x=-2$: $-2(-2)+2a=4+2a$ y $-2(-2)^2-4a=-8-4a$; igualando, $6a=-12$, **$a=-2$**.
3. En $x=2$: $-2\cdot2^2-4a=-8-4a$ y $-8\cdot2+b=-16+b$; con $a=-2$ queda $0=-16+b$, **$b=16$**.
4. **Derivabilidad.** $f'(x)=-2$ si $-4<x<-2$, $f'(x)=-4x$ si $-2<x<2$, $f'(x)=-8$ si $2<x<3$. En $x=-2$: $f'(-2^-)=-2\neq f'(-2^+)=8$. En $x=2$: $f'(2^-)=-8=f'(2^+)$.

**$f$ no es derivable en $x=-2$ y sí lo es en $x=2$** (y en el resto de su dominio).

**b) Monotonía y extremos** (con $a=-2$, $b=16$).
1. La función queda $f(x)=-2x-4$ en $[-4,-2]$, $f(x)=-2x^2+8$ en $(-2,2]$ y $f(x)=-8x+16$ en $(2,3]$.
2. Signo de $f'$ en cada tramo:
   - $[-4,-2]$: $f'=-2<0$, **decrece**.
   - $(-2,0)$: $f'=-4x>0$, **crece**; $(0,2)$: $f'<0$, **decrece**.
   - $(2,3]$: $f'=-8<0$, **decrece**.
3. **Extremos relativos:** mínimo relativo en $(-2,0)$ (pasa de decrecer a crecer) y máximo relativo en $(0,8)$.
4. **Extremos absolutos:** se comparan con los valores en los extremos del intervalo, $f(-4)=4$ y $f(3)=-8$.

**Máximo absoluto $8$ en $x=0$ y mínimo absoluto $-8$ en $x=3$.**

**c) Área.**
1. En $[-2,2]$, $f(x)=-2x^2+8\ge0$ (es una parábola que corta al eje en $\pm2$), luego el área es la integral.
2. Barrow:
$$A=\int_{-2}^{2}\left(-2x^2+8\right)dx=\left[-\frac{2x^3}{3}+8x\right]_{-2}^{2}=\frac{32}{3}+\frac{32}{3}=\frac{64}{3}.$$

**$A=\dfrac{64}{3}\ \text{u}^2$**

@@ 4
**a) Derivadas.**
1. $f$ es un producto de una potencia por un logaritmo: $(uv)'=u'v+uv'$, con $u=\left(5x^3+4x-2\right)^4$ (cadena) y $v=\ln\left(2x^5-4x^3+x\right)$ (cuya derivada es $\dfrac{\text{derivada del argumento}}{\text{argumento}}$):

$f'(x)=4\left(5x^3+4x-2\right)^3\left(15x^2+4\right)\ln\left(2x^5-4x^3+x\right)+\left(5x^3+4x-2\right)^4\dfrac{10x^4-12x^2+1}{2x^5-4x^3+x}.$

2. $g$ es un cociente: $\left(\dfrac uv\right)'=\dfrac{u'v-uv'}{v^2}$, con $u=e^{3x^2-5x}$ y $v=\left(6x^2+2\right)^3$. Se simplifica sacando factor común $e^{3x^2-5x}\left(6x^2+2\right)^2$:

$g'(x)=\dfrac{e^{3x^2-5x}(6x-5)\left(6x^2+2\right)^3-e^{3x^2-5x}\cdot3\left(6x^2+2\right)^2\cdot12x}{\left(6x^2+2\right)^6}=\dfrac{e^{3x^2-5x}\left(36x^3-30x^2-24x-10\right)}{\left(6x^2+2\right)^4}.$

**b) Función $h$ a partir de $h'$.**
1. $h$ es una primitiva de $h'$: $h(x)=\displaystyle\int\left(4x^3+x^2-4x-1\right)dx=x^4+\frac{x^3}{3}-2x^2-x+C$.
2. Se impone $h(2)=\dfrac{11}{3}$: $16+\dfrac{8}{3}-8-2+C=\dfrac{11}{3}$, de donde $C=-5$.

**$h(x)=x^4+\dfrac{x^3}{3}-2x^2-x-5$.**

@@ 5
1. **Datos auxiliares.** $P(A)=1-P(A^C)=1-0{,}35=0{,}65$. Como $P(A-B)=P(A)-P(A\cap B)=0{,}3$, $P(A\cap B)=0{,}65-0{,}3=0{,}35$.

**a)** «Al menos uno» es la unión:
$$P(A\cup B)=0{,}65+0{,}55-0{,}35=\mathbf{0{,}85}.$$

**b)** Condicionada. En el numerador, $P(B\cap A^C)=P(B)-P(A\cap B)$:
$$P(B\mid A^C)=\dfrac{P(B\cap A^C)}{P(A^C)}=\dfrac{P(B)-P(A\cap B)}{0{,}35}=\dfrac{0{,}2}{0{,}35}=\dfrac{4}{7}\approx\mathbf{0{,}5714}.$$

**c)** «Ninguno» es el complementario de la unión (De Morgan): $P(A^C\cap B^C)=1-P(A\cup B)=1-0{,}85=\mathbf{0{,}15}$.

**d)** Independientes si $P(A\cap B)=P(A)\cdot P(B)$. Aquí $P(A)\cdot P(B)=0{,}65\cdot0{,}55=0{,}3575\neq0{,}35=P(A\cap B)$: **no son independientes.**

@@ 6
1. **Datos.** Sea $N$ «reacciona a la prueba del nitrato»: $P(A)=0{,}7$, $P(B)=0{,}3$, $P(N\mid A)=0{,}15$, $P(N\mid B)=0{,}8$.

**a)** Probabilidad total (suma de las dos ramas que acaban en $N$):
$$P(N)=0{,}7\cdot0{,}15+0{,}3\cdot0{,}8=0{,}105+0{,}24=\mathbf{0{,}345}.$$

**b)** Bayes: rama de $B$ entre el total.
$$P(B\mid N)=\dfrac{P(B)\,P(N\mid B)}{P(N)}=\dfrac{0{,}24}{0{,}345}=\dfrac{16}{23}\approx\mathbf{0{,}6957}.$$

Interpretación: si reacciona, casi el $70\,\%$ de las veces es del tipo $B$, aunque $B$ sea solo el $30\,\%$ de las bacterias.

**c)** Con $P(N^C\mid A)=1-0{,}15=0{,}85$:
$$P(A\cap N^C)=P(A)\,P(N^C\mid A)=0{,}7\cdot0{,}85=\mathbf{0{,}595}.$$

@@ 7
**a) Muestreo estratificado con afijación proporcional.**
1. En afijación proporcional se muestrea la **misma fracción** de cada estrato. En el primer tramo es $\dfrac{375}{15\,000}=0{,}025$.
2. Población total: $15\,000+16\,800+11\,400+6\,000=49\,200$. Muestra total: $0{,}025\cdot49\,200=1\,230$ personas.
3. Composición: $375$ del primer tramo, $0{,}025\cdot16\,800=420$ del segundo, $0{,}025\cdot11\,400=285$ del tercero y $0{,}025\cdot6\,000=150$ del cuarto.

**Muestra total de 1 230 personas: 375, 420, 285 y 150.**

**b) Medias muestrales.**
1. Muestreo aleatorio simple (con reemplazamiento, importa el orden): $3\cdot3=9$ muestras $(1,1),(1,3),(1,5),(3,1),(3,3),(3,5),(5,1),(5,3),(5,5)$, con medias $1,\,2,\,3,\,2,\,3,\,4,\,3,\,4,\,5$.
2. Media de las medias: $\mu_{\bar x}=\dfrac{27}{9}=3$ (coincide con la media de la población).
3. Varianza (media de los cuadrados de las desviaciones respecto de $3$): $\sigma_{\bar x}^2=\dfrac{4+1+0+1+0+1+0+1+4}{9}=\dfrac{12}{9}=\dfrac{4}{3}$.

**Media $3$ y desviación típica $\sqrt{\dfrac{4}{3}}=\dfrac{2}{\sqrt3}\approx1{,}1547$.**

@@ 8
1. **Datos.** $\hat p=\dfrac{12}{50}=0{,}24$, $n=50$ ($n\hat p=12\ge5$ y $n(1-\hat p)=38\ge5$). Nivel $95\,\%$: $z_{\alpha/2}=1{,}96$.

**a)**
1. Error máximo: $E=1{,}96\sqrt{\dfrac{0{,}24\cdot0{,}76}{50}}=1{,}96\cdot0{,}0604=0{,}1184$.
2. Intervalo:
$$IC=(0{,}24-0{,}1184,\ 0{,}24+0{,}1184)=(0{,}1216,\ 0{,}3584).$$

Interpretación: con una confianza del $95\,\%$, entre el $12{,}2\,\%$ y el $35{,}8\,\%$ de las imprentas usa celulosa reciclada.

**b)**
1. La amplitud es $2E$, así que $2E\le0{,}2\iff E\le0{,}1$.
2. Se despeja $n$:
$$n\ge\frac{z_{\alpha/2}^2\,\hat p(1-\hat p)}{E^2}=\frac{1{,}96^2\cdot0{,}24\cdot0{,}76}{0{,}1^2}\approx70{,}07.$$
3. Se redondea hacia arriba.

**Hay que tomar al menos $n=71$ imprentas.**
