@@ 1
**a)** Sean $x$ el número de surtidos de tipo $A$ e $y$ el de tipo $B$. Hay que **maximizar $F(x,y)=2{,}4x+1{,}8y$** sujeto a:

- arándanos: $75x+75y\le3750\iff x+y\le50$,
- frambuesas: $100x+50y\le4000\iff2x+y\le80$,
- $x\le2y$,
- $x\ge0$, $y\ge0$.

**b)** Los vértices de la región son $(0,7)$ (de $x=0$ y $7x+5y=35$), $(0,2)$ (de $x=0$ y $x+2y=4$), $\left(3,\frac{1}{2}\right)$ (de $x+4y=5$ y $x+2y=4$) y $(5,0)$ (de $x+4y=5$ y $7x+5y=35$).

| Vértice | $(0,7)$ | $(0,2)$ | $\left(3,\frac{1}{2}\right)$ | $(5,0)$ |
|---|---|---|---|---|
| $F=2x+y$ | $7$ | $2$ | $\frac{13}{2}$ | $10$ |

**El mínimo se alcanza en el punto $(0,2)$ y vale $2$.**

@@ 2
**a)** $(10I_3-A)$ es $3\times3$ y $B$ es $3\times1$. Para que el producto $(3\times3)\cdot X$ sea $3\times1$, $X$ ha de ser de **dimensión $3\times1$**.

**b)** $10I_3-A=\begin{pmatrix}8&-1&0\\-4&8&0\\-2&-2&5\end{pmatrix}$ y $|10I_3-A|=300\neq0$. Es invertible, luego $X=(10I_3-A)^{-1}B$ existe y es única **para cualquier $B$ de orden $3\times1$.**

**c)** $(10I_3-A)^{-1}=\begin{pmatrix}\frac{2}{15}&\frac{1}{60}&0\\\frac{1}{15}&\frac{2}{15}&0\\\frac{2}{25}&\frac{3}{50}&\frac{1}{5}\end{pmatrix}$ y

$$X=(10I_3-A)^{-1}\begin{pmatrix}5\\20\\-3\end{pmatrix}=\begin{pmatrix}1\\3\\1\end{pmatrix}.$$

(Comprobación: $8\cdot1-3=5$, $-4+24=20$, $-2-6+5=-3$.)

@@ 3
**a)** En $x=-2$: $-2(-2)+2a=4+2a$ y $-2(-2)^2-4a=-8-4a$; igualando, $6a=-12$, **$a=-2$**. En $x=2$: $-2\cdot2^2-4a=-8-4a$ y $-8\cdot2+b=-16+b$; con $a=-2$ queda $0=-16+b$, **$b=16$**.

Derivabilidad: $f'(x)=-2$ si $-4<x<-2$, $f'(x)=-4x$ si $-2<x<2$, $f'(x)=-8$ si $2<x<3$. En $x=-2$: $f'(-2^-)=-2\neq f'(-2^+)=8$. En $x=2$: $f'(2^-)=-8=f'(2^+)$. **$f$ no es derivable en $x=-2$ y sí lo es en $x=2$** (y en el resto de su dominio).

**b)** Con $a=-2$, $b=16$: $f(x)=-2x-4$ en $[-4,-2]$, $f(x)=-2x^2+8$ en $(-2,2]$ y $f(x)=-8x+16$ en $(2,3]$.

- $[-4,-2]$: $f'=-2<0$, **decrece**.
- $(-2,0)$: $f'=-4x>0$, **crece**; $(0,2)$: $f'<0$, **decrece**.
- $(2,3]$: $f'=-8<0$, **decrece**.

**Mínimo relativo en $(-2,0)$ y máximo relativo en $(0,8)$.** En los extremos del intervalo: $f(-4)=4$ y $f(3)=-8$. **Máximo absoluto $8$ en $x=0$ y mínimo absoluto $-8$ en $x=3$.**

**c)** En $[-2,2]$, $f(x)=-2x^2+8\ge0$:
$$A=\int_{-2}^{2}\left(-2x^2+8\right)dx=\left[-\frac{2x^3}{3}+8x\right]_{-2}^{2}=\frac{32}{3}+\frac{32}{3}=\frac{64}{3}.$$
**$A=\dfrac{64}{3}\ \text{u}^2$**

@@ 4
**a)** $f'(x)=4\left(5x^3+4x-2\right)^3\left(15x^2+4\right)\ln\left(2x^5-4x^3+x\right)+\left(5x^3+4x-2\right)^4\dfrac{10x^4-12x^2+1}{2x^5-4x^3+x}.$

$g'(x)=\dfrac{e^{3x^2-5x}(6x-5)\left(6x^2+2\right)^3-e^{3x^2-5x}\cdot3\left(6x^2+2\right)^2\cdot12x}{\left(6x^2+2\right)^6}=\dfrac{e^{3x^2-5x}\left(36x^3-30x^2-24x-10\right)}{\left(6x^2+2\right)^4}.$

**b)** $h(x)=\displaystyle\int\left(4x^3+x^2-4x-1\right)dx=x^4+\frac{x^3}{3}-2x^2-x+C$. Con $h(2)=16+\dfrac{8}{3}-8-2+C=\dfrac{11}{3}$ resulta $C=-5$.

**$h(x)=x^4+\dfrac{x^3}{3}-2x^2-x-5$.**

@@ 5
$P(A)=1-P(A^C)=1-0{,}35=0{,}65$. Como $P(A-B)=P(A)-P(A\cap B)=0{,}3$, $P(A\cap B)=0{,}65-0{,}3=0{,}35$.

**a)** $P(A\cup B)=0{,}65+0{,}55-0{,}35=\mathbf{0{,}85}$.

**b)** $P(B\mid A^C)=\dfrac{P(B\cap A^C)}{P(A^C)}=\dfrac{P(B)-P(A\cap B)}{0{,}35}=\dfrac{0{,}2}{0{,}35}=\dfrac{4}{7}\approx\mathbf{0{,}5714}$.

**c)** $P(A^C\cap B^C)=1-P(A\cup B)=1-0{,}85=\mathbf{0{,}15}$.

**d)** $P(A)\cdot P(B)=0{,}65\cdot0{,}55=0{,}3575\neq0{,}35=P(A\cap B)$: **no son independientes.**

@@ 6
Sea $N$ «reacciona a la prueba del nitrato»: $P(A)=0{,}7$, $P(B)=0{,}3$, $P(N\mid A)=0{,}15$, $P(N\mid B)=0{,}8$.

**a)** $P(N)=0{,}7\cdot0{,}15+0{,}3\cdot0{,}8=0{,}105+0{,}24=\mathbf{0{,}345}$.

**b)** $P(B\mid N)=\dfrac{P(B)\,P(N\mid B)}{P(N)}=\dfrac{0{,}24}{0{,}345}=\dfrac{16}{23}\approx\mathbf{0{,}6957}$.

**c)** $P(A\cap N^C)=P(A)\,P(N^C\mid A)=0{,}7\cdot0{,}85=\mathbf{0{,}595}$.

@@ 7
**a)** Población total: $15\,000+16\,800+11\,400+6\,000=49\,200$. La fracción muestreada es $\dfrac{375}{15\,000}=0{,}025$, luego la muestra tiene $0{,}025\cdot49\,200=1\,230$ personas: $375$ del primer tramo, $0{,}025\cdot16\,800=420$ del segundo, $0{,}025\cdot11\,400=285$ del tercero y $0{,}025\cdot6\,000=150$ del cuarto.

**Muestra total de 1 230 personas: 375, 420, 285 y 150.**

**b)** Muestras con reemplazamiento (9): $(1,1),(1,3),(1,5),(3,1),(3,3),(3,5),(5,1),(5,3),(5,5)$, con medias $1,\,2,\,3,\,2,\,3,\,4,\,3,\,4,\,5$.

Media: $\mu_{\bar x}=\dfrac{27}{9}=3$. Varianza: $\sigma_{\bar x}^2=\dfrac{4+1+0+1+0+1+0+1+4}{9}=\dfrac{12}{9}=\dfrac{4}{3}$.

**Media $3$ y desviación típica $\sqrt{\dfrac{4}{3}}=\dfrac{2}{\sqrt3}\approx1{,}1547$.**

@@ 8
$\hat p=\dfrac{12}{50}=0{,}24$, $n=50$. Nivel $95\,\%$: $z_{\alpha/2}=1{,}96$.

**a)** $E=1{,}96\sqrt{\dfrac{0{,}24\cdot0{,}76}{50}}=1{,}96\cdot0{,}0604=0{,}1184$.
$$IC=(0{,}24-0{,}1184,\ 0{,}24+0{,}1184)=(0{,}1216,\ 0{,}3584).$$

**b)** Amplitud $2E\le0{,}2\iff E\le0{,}1$:
$$n\ge\frac{z_{\alpha/2}^2\,\hat p(1-\hat p)}{E^2}=\frac{1{,}96^2\cdot0{,}24\cdot0{,}76}{0{,}1^2}\approx70{,}07.$$
**Hay que tomar al menos $n=71$ imprentas.**
