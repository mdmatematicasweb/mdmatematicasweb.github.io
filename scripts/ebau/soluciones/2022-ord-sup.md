@@ 1
**a)** Continuidad en $x=0$: $\sqrt{b}=2\Rightarrow b=4$. En $x=2$: $\sqrt{2a+4}=-\dfrac{2}{2\sqrt2}+\dfrac{3}{\sqrt2}=\sqrt2\Rightarrow 2a+4=2$.

**$a=-1$, $b=4$.**

**b)** Con esos valores $f(x)=\sqrt{4-x}$ en $(0,2]$: $f'(2^-)=\dfrac{-1}{2\sqrt{4-2}}=-\dfrac{1}{2\sqrt2}$, y $f'(2^+)=-\dfrac{1}{2\sqrt2}$. Coinciden, luego existe $f'(2)=-\dfrac{1}{2\sqrt2}$, con $f(2)=\sqrt2$.

**Sí existe; tangente: $y=\sqrt2-\dfrac{1}{2\sqrt2}(x-2)$.**

@@ 2
$f'(x)=\dfrac{2x}{x^2+1}$, $f''(x)=\dfrac{2(1-x^2)}{(x^2+1)^2}$.

**a)** $f'<0$ si $x<0$ y $f'>0$ si $x>0$.

**Decreciente en $(-\infty,0)$; creciente en $(0,+\infty)$.**

**b)** $f''>0$ si $|x|<1$ y $f''<0$ si $|x|>1$.

**Convexa en $(-1,1)$; cóncava en $(-\infty,-1)\cup(1,+\infty)$; puntos de inflexión en $(-1,\ln2)$ y $(1,\ln2)$.**

@@ 3
Por el teorema fundamental del cálculo, $F'(x)=2x\cos x$ en $[0,2\pi]$.

**a)** En $(0,2\pi)$ el signo de $F'$ es el de $\cos x$: positivo en $\left(0,\tfrac\pi2\right)$ y $\left(\tfrac{3\pi}{2},2\pi\right)$; negativo en $\left(\tfrac\pi2,\tfrac{3\pi}2\right)$.

**$F$ crece en $\left(0,\tfrac\pi2\right)\cup\left(\tfrac{3\pi}2,2\pi\right)$ y decrece en $\left(\tfrac\pi2,\tfrac{3\pi}2\right)$.**

**b)** $F(\pi)=\left[2t\operatorname{sen}t+2\cos t\right]_0^\pi=-2-2=-4$ (por partes) y $F'(\pi)=-2\pi$.

**Tangente: $y=-4-2\pi(x-\pi)$, es decir, $y=-2\pi x+2\pi^2-4$.**

@@ 4
Por partes, $u=\operatorname{arctg}x$, $dv=x\,dx$:
$$\int_0^1x\operatorname{arctg}x\,dx=\left[\tfrac{x^2}{2}\operatorname{arctg}x\right]_0^1-\frac12\int_0^1\frac{x^2}{1+x^2}\,dx=\frac\pi8-\frac12\big[x-\operatorname{arctg}x\big]_0^1.$$

**$\dfrac\pi4-\dfrac12$.**

@@ 5
**a)** $|A|=-(m+2)(3m-1)$, que se anula en $m=-2$ y $m=\tfrac13$.
- $m\neq-2,\tfrac13$: $\operatorname{rg}A=\operatorname{rg}A^*=3$: compatible determinado (SCD).
- $m=-2$: $\operatorname{rg}A=\operatorname{rg}A^*=2$: compatible indeterminado (SCI).
- $m=\tfrac13$: $\operatorname{rg}A=2$ y $\operatorname{rg}A^*=3$: incompatible (SI).

**b)** Para $m=-2$ (SCI) las soluciones son $x=z+\tfrac37$, $y=\tfrac57$. Tomando $z=\lambda-\tfrac37$ resulta $x=\lambda$.

**$y_0=\dfrac57$.**

@@ 6
**a)** $A^{-1}=\tfrac14A\iff A^2=4I$. Con $A^2=\begin{pmatrix}a^2+3a&3-3a\\a-a^2&3a+1\end{pmatrix}$, la entrada $(1,2)$ exige $a=1$, y entonces $A^2=4I$ se cumple.

**$a=1$.**

**b)** Para $a=1$, $|A|=-4\neq0$, así que $X=A^{-1}B^t=\tfrac14A\,B^t$:

**$X=\begin{pmatrix}-1&\tfrac94&\tfrac54\\0&\tfrac74&\tfrac34\end{pmatrix}$.**

@@ 7
$r$: punto $(0,1,0)$, dirección $\vec d=(1,-1,0)$. Normal de $\pi$: $\vec n=(1,1,1)$.

**a)** Normal del plano buscado: $\vec d\times\vec n=(-1,-1,2)\parallel(1,1,-2)$. Pasa por $(0,1,0)$:

**$x+y-2z-1=0$.**

**b)** $\vec d\cdot\vec n=0$ (paralela) y $(0,1,0)\notin\pi$, así que $d(r,\pi)=d\big((0,1,0),\pi\big)=\dfrac{|0+1+0|}{\sqrt3}$.

**$d=\dfrac{\sqrt3}{3}$.**

@@ 8
$r$: $(1+t,\,2t,\,-1+5t)$, con $\vec d=(1,2,5)$.
$d_1=\dfrac{|2(1+t)+2t-1+5t-3|}{\sqrt6}=\dfrac{|9t-2|}{\sqrt6}$, $d_2=\dfrac{|(1+t)+4t-(-1+5t)+5|}{\sqrt6}=\dfrac{7}{\sqrt6}$.

**a)** $|9t-2|=7\Rightarrow t=1$ o $t=-\tfrac59$.

**Puntos: $(2,2,4)$ y $\left(\tfrac49,-\tfrac{10}9,-\tfrac{34}9\right)$.**

**b)** $\operatorname{sen}\alpha=\dfrac{|\vec n_1\cdot\vec d|}{|\vec n_1||\vec d|}=\dfrac{|(2,1,1)\cdot(1,2,5)|}{\sqrt6\sqrt{30}}=\dfrac{9}{6\sqrt5}$.

**$\operatorname{sen}\alpha=\dfrac{3\sqrt5}{10}$.**
