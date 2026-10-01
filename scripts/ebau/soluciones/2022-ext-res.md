@@ 1
Para que el límite sea finito en $x=0$ (el denominador es $x^2(1+x)$) el numerador debe ser $O(x^2)$. Con $\operatorname{sen}x=x-\tfrac{x^3}{6}+\dots$ y $x\ln(x+1)=x^2-\tfrac{x^3}{2}+\dots$ el numerador es
$$a x+(b+1)x^2+O(x^3).$$
El término en $x$ debe anularse: $a=0$. Entonces el límite es $\dfrac{(b+1)x^2}{x^2}\to b+1=2$.

**$a=0$, $b=1$.**

@@ 2
$f'(x)=e^{x}(\cos x+\operatorname{sen}x)+e^{x}(-\operatorname{sen}x+\cos x)=2e^{x}\cos x$.

**a)** $f'=0$ en $x=\tfrac{\pi}{2}$ y $x=\tfrac{3\pi}{2}$. Se comparan los valores en los puntos críticos y en los extremos:
$f(0)=1$, $f(\tfrac{\pi}{2})=e^{\pi/2}\approx 4{,}81$, $f(\tfrac{3\pi}{2})=-e^{3\pi/2}\approx-111{,}3$, $f(2\pi)=e^{2\pi}\approx 535{,}5$.

**Máximo absoluto en $x=2\pi$, de valor $e^{2\pi}$; mínimo absoluto en $x=\tfrac{3\pi}{2}$, de valor $-e^{3\pi/2}$.**

**b)** $f(\tfrac{3\pi}{2})=-e^{3\pi/2}$ y $f'(\tfrac{3\pi}{2})=0$ (tangente horizontal).

**Tangente: $y=-e^{3\pi/2}$. Normal: $x=\tfrac{3\pi}{2}$.**

@@ 3
En $x=0$: $f(0)=0$, $f'(0)=-1$, luego la normal tiene pendiente $1$: $y=x$.
Cortes con $f$: $x^3-x=x\Rightarrow x^3-2x=0\Rightarrow x=0,\ \pm\sqrt2$.
Por simetría impar del recinto, el área es el doble de la de $[0,\sqrt2]$, donde la recta está por encima:
$$A=2\int_0^{\sqrt2}(2x-x^3)\,dx=2\left[x^2-\tfrac{x^4}{4}\right]_0^{\sqrt2}=2(2-1).$$

**$A=2$ u$^2$.**

@@ 4
Con $t=\sqrt{1+x}$: $x=t^2-1$, $dx=2t\,dt$; los límites pasan a $t=1$ y $t=2$.
$$\int_1^2\frac{t^2-1}{t}\,2t\,dt=2\int_1^2(t^2-1)\,dt=2\left[\tfrac{t^3}{3}-t\right]_1^2=2\left(\tfrac23+\tfrac23\right).$$

**$\dfrac{8}{3}$.**

@@ 5
$A$, $B$, $C$ = seguidores de Alberto, Begoña, Carlos.
$$\begin{cases}A+B+C=13000\\ \tfrac23C=2A\\ A+\tfrac{B}{5}=\tfrac{C}{2}\end{cases}$$
De la segunda, $C=3A$. En la tercera: $A+\tfrac B5=\tfrac{3A}{2}\Rightarrow B=\tfrac{5A}{2}$. Primera: $A+\tfrac52A+3A=13000\Rightarrow \tfrac{13}{2}A=13000$.

**Alberto 2000, Begoña 5000 y Carlos 6000 seguidores.**

@@ 6
**a)** Desarrollando, $|A|=m^2-1=(m-1)(m+1)$.
- Si $m\neq\pm1$: $\operatorname{rg}A=3$.
- Si $m=1$: filas $(1,1,3),(1,1,2),(1,1,3)$, hay un menor no nulo de orden 2 y $|A|=0$: $\operatorname{rg}A=2$.
- Si $m=-1$: filas $(-1,1,3),(1,-1,2),(1,-1,3)$; el menor $\begin{vmatrix}-1&3\\1&2\end{vmatrix}=-5\ne0$: $\operatorname{rg}A=2$.

**b)** Para $m=0$, $|A|=-1\neq0$, luego $X=A^{-1}B$ existe:
$$X=A^{-1}B=\begin{pmatrix}5&-4\\8&-4\\-2&2\end{pmatrix}.$$

@@ 7
**a)** $\overrightarrow{AB}=(m,-2,-2)$, $\overrightarrow{AC}=(2,-1,-1)$.
$\overrightarrow{AB}\times\overrightarrow{AC}=(0,\,m-4,\,4-m)$, de módulo $\sqrt2\,|m-4|$.
Área $=\tfrac12\sqrt2|m-4|=\tfrac{\sqrt{18}}{2}\Rightarrow|m-4|=3$.

**$m=1$ o $m=7$.**

**b)** Con $m=0$: $\overrightarrow{AB}=(0,-2,-2)$, $\overrightarrow{AC}=(2,-1,-1)$.
$$\cos\widehat A=\frac{\overrightarrow{AB}\cdot\overrightarrow{AC}}{|\overrightarrow{AB}||\overrightarrow{AC}|}=\frac{4}{2\sqrt2\cdot\sqrt6}=\frac{1}{\sqrt3}.$$

**$\cos\widehat A=\dfrac{\sqrt3}{3}$.**

@@ 8
Vectores directores del plano: $(9,2,4)$ y $(3,0,1)$; normal $\vec n=(9,2,4)\times(3,0,1)=(2,3,-6)$, $|\vec n|=7$. Pasa por $(0,-1,3)$:
$$\pi:\ 2x+3y-6z+21=0.$$

**a)** Recta por $P$ perpendicular a $\pi$: $(2+2t,\,3t,\,-4-6t)$. Al sustituir en $\pi$: $4+4t+9t+24+36t+21=0\Rightarrow 49t=-49\Rightarrow t=-1$, luego el pie de la perpendicular es $M(0,-3,2)$. El simétrico es $P'=2M-P$:

**$P'(-2,-6,8)$.**

**b)** $d(P,\pi)=\dfrac{|4+0+24+21|}{7}=\dfrac{49}{7}$.

**$d=7$.**
