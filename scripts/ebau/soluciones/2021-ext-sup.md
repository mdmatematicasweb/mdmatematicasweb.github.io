@@ 1
Con $\ln(1+x)=x-\frac{x^2}{2}+\cdots$ se tiene $\dfrac{x+1}{\ln(x+1)}=\dfrac{x+1}{x\left(1-\frac x2+\cdots\right)}=\dfrac1x+\dfrac32+O(x)$.

Entonces $\dfrac{x+1}{\ln(x+1)}-\dfrac ax=\dfrac{1-a}{x}+\dfrac32+O(x)$, que es finito sólo si $a=1$. (Equivalente: con L'Hôpital, el límite $\frac{0}{0}$ exige $a=1$.)

**$a=1$ y el límite vale $\dfrac32$.**

@@ 2
**a)** $f(2)=\dfrac{4a+b}{a-2}=3\Rightarrow b=-a-6$. La pendiente de la asíntota oblicua es $\displaystyle\lim_{x\to\infty}\frac{f(x)}{x}=-a=-4\Rightarrow a=4$. Entonces $b=-10$.

**$a=4,\ b=-10$**

**b)** $f(x)=\dfrac{2x^2+3}{2-x}$, $f'(x)=\dfrac{-2x^2+8x+3}{(2-x)^2}$. En $x=1$: $f(1)=5$, $f'(1)=9$.

Tangente: $y-5=9(x-1)$, es decir **$y=9x-4$**.

Normal: $y-5=-\frac19(x-1)$, es decir **$y=-\dfrac{x}{9}+\dfrac{46}{9}$**.

@@ 3
$f(x)=\begin{cases}x^2-x+1&x<1\\x^2+x-1&x\ge1\end{cases}$, con $f'(x)=2x-1$ si $x<1$ y $f'(x)=2x+1$ si $x>1$.

**a)** Para $x<1$, $f'=0$ en $x=\frac12$ (negativa a su izquierda, positiva a su derecha); para $x>1$, $f'>0$.

**Decrece en $\left(-\infty,\tfrac12\right)$ y crece en $\left(\tfrac12,+\infty\right)$** (mínimo relativo en $x=\frac12$).

**b)** $\displaystyle\int_0^2f=\int_0^1(x^2-x+1)\,dx+\int_1^2(x^2+x-1)\,dx=\frac56+\frac{17}{6}$.

**$\dfrac{11}{3}$**

@@ 4
**a)** Para $x\ge0$ se cumple $xe^x\ge x$ (igualdad sólo en $x=0$, pues $xe^x=x\iff x(e^x-1)=0$). El recinto está entre $y=x$ (debajo) y $y=xe^x$ (encima), desde $x=0$ hasta $x=2$. Ambas curvas parten de $(0,0)$; en $x=2$ valen $2$ y $2e^2$.

![Recinto limitado por f(x)=x·eˣ, la recta y=x y la recta x=2](fig/2021-ext-sup-e4.svg){fig-alt="Recinto limitado por f(x)=x·eˣ, la recta y=x y la recta x=2" width="75%" fig-align="center"}

**b)** Una primitiva de $xe^x$ es $(x-1)e^x$ (por partes):

$$A=\int_0^2(xe^x-x)\,dx=\left[(x-1)e^x-\tfrac{x^2}{2}\right]_0^2=(e^2-2)-(-1).$$

**$A=e^2-1\approx6{,}389\ \text{u}^2$**

@@ 5
**a)** $|A|=2m$ (restando la primera fila a las otras: $\begin{vmatrix}m&m&m\\0&1&0\\0&0&2\end{vmatrix}=2m$).

**Existe $A^{-1}$ si y sólo si $m\neq0$.**

**b)** Para $m=1$: $\left(\tfrac12A\right)^{-1}=2A^{-1}$, con $A=\begin{pmatrix}1&1&1\\1&2&1\\1&1&3\end{pmatrix}$, $|A|=2$.

$$\left(\tfrac12A\right)^{-1}=\begin{pmatrix}5&-2&-1\\-2&2&0\\-1&0&1\end{pmatrix}$$

@@ 6
Sean $x$, $y$, $z$ los precios (€) de un café, una tostada y un zumo: $3x+y+2z=7{,}5$ y $4x+y+z=7{,}2$.

**a)** Buscamos $2x+y+3z$. Se cumple $(2,1,3)=2(3,1,2)-(4,1,1)$, luego el precio es $2\cdot7{,}5-7{,}2=$ **$7{,}80$ €**.

**b)** Restando: $x-z=-0{,}3$ y $y=8{,}4-5z$. Con $z=2$: $x=1{,}7$ pero $y=-1{,}6<0$, imposible.

**No, un zumo no puede costar 2 €** (la tostada saldría con precio negativo).

@@ 7
Vector normal $\vec n=(1,-1,1)$.

**a)** Recta por $P$ perpendicular a $\pi$: $(1+t,\,-t,\,1+t)$. Al cortar con $\pi$: $(1+t)+t+(1+t)+1=3t+3=0\Rightarrow t=-1$, punto medio $M(0,1,0)$. El simétrico es $2M-P$:

**$P'=(-1,2,-1)$**

**b)** $d(P,\pi)=\dfrac{|1-0+1+1|}{\sqrt3}=$ **$\sqrt3$ u**

@@ 8
$r$: punto $(2,1,0)$, dirección $\vec u=(-2,1,-2)$. $s$: de $x+2y=3$, $2y+z=2$ con $y=\mu$: $(3-2\mu,\,\mu,\,2-2\mu)$, punto $(3,0,2)$, dirección $\vec v=(-2,1,-2)$.

**a)** $\vec u=\vec v$: son paralelas. El vector $(3,0,2)-(2,1,0)=(1,-1,2)$ no es proporcional a $\vec u$, luego el punto de $s$ no está en $r$.

**Las rectas son paralelas y distintas.**

**b)** Sí existe: el plano contiene a $r$ y tiene normal $\vec u\times(1,-1,2)=(0,2,1)$, pasando por $(2,1,0)$:

**$2y+z-2=0$**
