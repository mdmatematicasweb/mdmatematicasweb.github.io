@@ 1
**a)** $f'(x)=xe^{x}$, $f''(x)=(x+1)e^{x}$. $f''$ cambia de signo en $x=-1$: punto de inflexión $\left(-1,-\dfrac2e\right)$. Pendiente $f'(-1)=-\dfrac1e$.

Tangente: $y+\dfrac2e=-\dfrac1e(x+1)$, es decir **$y=-\dfrac{x}{e}-\dfrac3e$**.

Normal (pendiente $e$): $y+\dfrac2e=e(x+1)$, es decir **$y=ex+e-\dfrac2e$**.

**b)** No hay asíntotas verticales (es continua en $\mathbb R$). En $-\infty$: $\lim(x-1)e^{x}=0$, así que **$y=0$ es asíntota horizontal en $-\infty$**. En $+\infty$ el límite es $+\infty$ y $f(x)/x\to+\infty$, luego **no hay asíntota horizontal ni oblicua en $+\infty$**.

@@ 2
**a)** Es una parábola de vértice $(1,0)$ abierta hacia arriba. La recta horizontal $y=a$ la corta en $x=1\pm\sqrt a$, y el recinto es el segmento parabólico entre ambos puntos, por encima de la parábola y por debajo de la recta.

![Recinto limitado por la parábola f(x)=(x−1)² y la recta y=a (a>0), con los cortes en x=1±√a](fig/2025-ord-sup1-e2.svg){fig-alt="Recinto limitado por la parábola f(x)=(x−1)² y la recta y=a (a>0), con los cortes en x=1±√a" width="75%" fig-align="center"}

**b)** Con $t=x-1$:
$$A=\int_{-\sqrt a}^{\sqrt a}\big(a-t^2\big)dt=2\left[at-\frac{t^3}{3}\right]_0^{\sqrt a}=\frac43a^{3/2}.$$
$\dfrac43a^{3/2}=\dfrac43\Rightarrow\mathbf{a=1}$.

@@ 3
Tramo $x\le0$ (por partes): $\displaystyle\int_{-\pi/4}^{0}x\operatorname{sen}(2x)dx=\Big[-\dfrac{x\cos2x}{2}+\dfrac{\operatorname{sen}2x}{4}\Big]_{-\pi/4}^{0}=0-\Big(0-\dfrac14\Big)=\dfrac14$.

Tramo $x>0$: $\displaystyle\int_0^1(\cos\pi x-1)dx=\Big[\dfrac{\operatorname{sen}\pi x}{\pi}-x\Big]_0^1=-1$.

$$\int_{-\pi/4}^1f=\frac14-1=\mathbf{-\frac34}.$$

@@ 4
**a)** $\overrightarrow{AB}=(-2,4,-4)$, $\overrightarrow{AC}=(-5,-1,0)$, $\overrightarrow{AB}\times\overrightarrow{AC}=(-4,20,22)$.
$$\text{Área}=\tfrac12\sqrt{16+400+484}=\tfrac12\sqrt{900}=\mathbf{15}\ u^2.$$

**b)** $D(0,0,z)$, $\overrightarrow{AD}=(-3,1,z-1)$. El producto mixto es $(\overrightarrow{AB}\times\overrightarrow{AC})\cdot\overrightarrow{AD}=12+20+22(z-1)=22z+10$.

$V=\dfrac{|22z+10|}{6}=20\Rightarrow22z+10=\pm120$. **$D(0,0,5)$ y $D\left(0,0,-\dfrac{65}{11}\right)$.**

@@ 5
**a)** Recta perpendicular a $\pi$ por $P$: $(1+2t,\,t,\,1+2t)$. Corta a $\pi$: $2(1+2t)+t+2(1+2t)+5=9t+9=0\Rightarrow t=-1$, punto medio $M(-1,-1,-1)$.

$P'=2M-P=$ **$(-3,-2,-3)$.**

**b)** Planos $2x+y+2z+D=0$ con $\dfrac{|D-5|}{\sqrt{4+1+4}}=2\Rightarrow|D-5|=6$. **$2x+y+2z+11=0$ y $2x+y+2z-1=0$.**

@@ 6
**a)** $|A|=\alpha(\alpha-4)(\alpha+2)$ (desarrollando por la primera columna). **$A$ admite inversa si $\alpha\neq0,\ \alpha\neq4,\ \alpha\neq-2$.**

**b)** Con $\alpha=1$: $A=\begin{pmatrix}1&5&0\\1&1&1\\0&5&1\end{pmatrix}$, $|A|=-9$. Con la matriz adjunta:
$$\mathbf{A^{-1}}=\frac{1}{9}\begin{pmatrix}4&5&-5\\1&-1&1\\-5&5&4\end{pmatrix}.$$

@@ 7
**a)** $X\sim N(13;\,0{,}1)$:
$P(12{,}9<X<13{,}15)=P(-1<Z<1{,}5)=\Phi(1{,}5)-\Phi(-1)=0{,}9332-(1-0{,}8413)=\mathbf{0{,}7745}$.

**b)** $X\sim N(12{,}9;\,0{,}2)$:
$P(12{,}9<X<13{,}15)=P(0<Z<1{,}25)=\Phi(1{,}25)-0{,}5=0{,}8944-0{,}5=\mathbf{0{,}3944}$.
