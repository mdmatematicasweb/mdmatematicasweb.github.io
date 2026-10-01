@@ 1
Punto de inflexión en $(0,4)$: $f(0)=4\Rightarrow d=4$ y $f''(0)=2b=0\Rightarrow b=0$.

Normal vertical (paralela al eje de ordenadas) en $(1,8)$ significa tangente horizontal: $f'(1)=3a+c=0$. Además $f(1)=a+c+4=8\Rightarrow a+c=4$.

Resolviendo: $a=-2$, $c=6$.

**$a=-2,\; b=0,\; c=6,\; d=4$**, es decir, $f(x)=-2x^3+6x+4$.

@@ 2
$f(x)=\dfrac{x^2-10}{(x+3)(x-1)}$.

**a)** Verticales: $\displaystyle\lim_{x\to-3}f=\pm\infty$ y $\displaystyle\lim_{x\to1}f=\pm\infty$, luego **$x=-3$ y $x=1$** son asíntotas verticales. Horizontal: $\displaystyle\lim_{x\to\pm\infty}f(x)=1$, luego **$y=1$** es asíntota horizontal (en ambos lados) y no hay oblicuas.

**b)** $f'(x)=\dfrac{2(x+2)(x+5)}{(x-1)^2(x+3)^2}$, con signo el de $(x+2)(x+5)$.

**Crece en $(-\infty,-5)$, en $(-2,1)$ y en $(1,+\infty)$; decrece en $(-5,-3)$ y en $(-3,-2)$.** Máximo relativo en $x=-5$ y mínimo relativo en $x=-2$.

@@ 3
**a)** Tangente en $a$: $y-e^a=e^a(x-a)$. Pasa por el origen: $-e^a=-ae^a\Rightarrow a=1$. **$a=1$** (la tangente es $y=ex$).

**b)** Tangente en $x=1$: $y=ex$. En $[0,1]$ se cumple $e^x\ge ex$, y el recinto está entre $x=0$ y $x=1$:

$$A=\int_0^1(e^x-ex)\,dx=\left[e^x-\tfrac{e}{2}x^2\right]_0^1=e-\tfrac e2-1=\tfrac e2-1.$$

**$A=\dfrac e2-1\approx0{,}359\ \text{u}^2$**

@@ 4
$x^2-3x+2=(x-1)(x-2)$: es $\le0$ en $[1,2]$ y $\ge0$ en $[2,3]$. Con $F(x)=\frac{x^3}{3}-\frac{3x^2}{2}+2x$: $F(1)=\frac56$, $F(2)=\frac23$, $F(3)=\frac32$.

$$\int_1^3|x^2-3x+2|\,dx=-\bigl(F(2)-F(1)\bigr)+\bigl(F(3)-F(2)\bigr)=\tfrac16+\tfrac56.$$

**Resultado: $1$**

@@ 5
Sabemos $|A|=5$.

**a)** $|2A^3|=2^3\,|A|^3=8\cdot125=$ **$1000$**.

**b)** Primer determinante: sacamos $2$ de la columna 1, $-\frac12$ de la columna 2 (queda $(2,-1,1)$) y $3$ de la columna 3 (queda $(1,1,1)$): vale $2\cdot\left(-\tfrac12\right)\cdot3\,|A|=-3\cdot5=$ **$-15$**.

Segundo: se traspone (el determinante no cambia) y las columnas son $(a,b,c)$, $(a+4,b-2,c+2)$, $(a+1,b+1,c+1)$. Restando la columna 1 a las otras dos: $(a,b,c)$, $(4,-2,2)$, $(1,1,1)$. La segunda es $2\cdot(2,-1,1)$, luego vale $2\,|A|=$ **$10$**.

@@ 6
$|A|=\begin{vmatrix}1&m&m\\1&2m&m+1\\2&m&m\end{vmatrix}=-m(m-1)$.

**a)**
- $m\neq0,\ m\neq1$: $\operatorname{rg}A=\operatorname{rg}A^*=3$, sistema compatible determinado (SCD).
- $m=0$: $\operatorname{rg}A=\operatorname{rg}A^*=2<3$, sistema compatible indeterminado (SCI).
- $m=1$: $\operatorname{rg}A=\operatorname{rg}A^*=2<3$, SCI.

**b)** Para $m=1$: $x+y+z=1$, $x+2y+2z=1$, $2x+y+z=2$. Restando las dos primeras: $y+z=0$, y entonces $x=1$.

**$(x,y,z)=(1,-\lambda,\lambda),\ \lambda\in\mathbb{R}$**

@@ 7
Vector normal $\vec n=(2,-1,1)$, $|\vec n|=\sqrt6$.

**a)** Planos paralelos: $2x-y+z+k=0$, con $d=\dfrac{|k|}{\sqrt6}=\sqrt6\Rightarrow k=\pm6$.

**$2x-y+z+6=0$ y $2x-y+z-6=0$**

**b)** Recta por $P$ perpendicular a $\pi$: $(1+2t,\,2-t,\,6+t)$. Al cortar con $\pi$: $2(1+2t)-(2-t)+(6+t)=6t+6=0\Rightarrow t=-1$, punto $M(-1,3,5)$. El simétrico es $P'=2M-P$:

**$P'=(-3,4,4)$**

@@ 8
$r$: punto genérico $R(-\lambda,\,1+2\lambda,\,-1+\lambda)$.

**a)** $|RB|^2=6\lambda^2+2\lambda+2$ y $|RC|^2=6\lambda^2+4\lambda+4$. Igualando: $2\lambda+2=4\lambda+4\Rightarrow\lambda=-1$.

**Punto $(1,-1,-2)$** (para $\lambda=-1$).

**b)** $\overrightarrow{BC}=(1,1,-2)$, $\overrightarrow{BD}=(2,-1,-1)$, $\overrightarrow{BC}\times\overrightarrow{BD}=(-3,-3,-3)$, de módulo $3\sqrt3$.

**Área $=\dfrac{3\sqrt3}{2}\ \text{u}^2$**

