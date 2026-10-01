@@ 1
Continuidad en $x=0$: $\displaystyle\lim_{x\to0^-}\frac{\ln(e^x+x^3)}{x}$. Como $\ln(e^x+x^3)=x+O(x^3)$, este límite vale $1$ (o por L'Hôpital: $\dfrac{e^x+3x^2}{e^x+x^3}\to1$). Por la derecha, $f(0)=a$. Así **$a=1$**.

Continuidad en $x=1$: $4\cdot1^2+a=5$ y $b+\operatorname{sen}\pi=b$, luego **$b=5$**.

**$a=1,\ b=5$**

@@ 2
$f(x)=\dfrac{e^{2x}-1}{e^{2x}+1}$.

**a)** $\displaystyle\lim_{x\to+\infty}f=1$ y $\displaystyle\lim_{x\to-\infty}f=\frac{-1}{1}=-1$. **Asíntotas horizontales: $y=1$ (en $+\infty$) e $y=-1$ (en $-\infty$)**; no hay verticales (el denominador no se anula) ni oblicuas.

**b)** $f'(x)=\dfrac{2e^{2x}(e^{2x}+1)-2e^{2x}(e^{2x}-1)}{(e^{2x}+1)^2}=\dfrac{4e^{2x}}{(e^{2x}+1)^2}>0$.

**$f$ es estrictamente creciente en todo $\mathbb{R}$.**

@@ 3
$2\operatorname{sen}^2x-\cos^2x=(1-\cos2x)-\dfrac{1+\cos2x}{2}=\dfrac12-\dfrac32\cos2x$.

$$\int_0^{\pi/2}\left(\tfrac12-\tfrac32\cos2x\right)dx=\left[\tfrac x2-\tfrac34\operatorname{sen}2x\right]_0^{\pi/2}=\frac\pi4.$$

**$\dfrac\pi4$**

@@ 4
**a)** Para $x\ge0$: $x-2=4-x^2\Rightarrow x^2+x-6=0\Rightarrow x=2$. Para $x<0$: $-x-2=4-x^2\Rightarrow x^2-x-6=0\Rightarrow x=-2$.

**Puntos de corte: $(-2,0)$ y $(2,0)$.** El recinto está limitado por arriba por la parábola $g(x)=4-x^2$ (vértice $(0,4)$) y por abajo por la «V» $f(x)=|x|-2$ (vértice $(0,-2)$), entre $x=-2$ y $x=2$.

**b)** Por simetría:

$$A=2\int_0^2\bigl[(4-x^2)-(x-2)\bigr]dx=2\int_0^2(6-x-x^2)\,dx=2\left[6x-\tfrac{x^2}{2}-\tfrac{x^3}{3}\right]_0^2=2\cdot\tfrac{22}{3}.$$

**$A=\dfrac{44}{3}\ \text{u}^2$**

@@ 5
**a)** $|A-\lambda I|=-(\lambda-1)(\lambda-3)(\lambda-4)$.

- $\lambda\neq1,3,4$: $\operatorname{rg}(A-\lambda I)=3$.
- $\lambda=1,\ 3$ o $4$: $\operatorname{rg}(A-\lambda I)=2$ (el determinante es nulo y hay un menor de orden 2 no nulo).

**b)** $A-I=\begin{pmatrix}1&0&2\\-1&1&1\\0&1&3\end{pmatrix}$, de rango $2$. De $x+2z=0$ y $-x+y+z=0$ (la tercera es combinación): $x=-2z$, $y=-3z$.

**Soluciones: $(x,y,z)=(-2\lambda,-3\lambda,\lambda)$.** Con $x=2$: $\lambda=-1$, **solución $(2,3,-1)$**.

@@ 6
$A$ es $2\times3$ y $B$ es $3\times2$.

**a)** $AB=\begin{pmatrix}1&-1\\1+m&2m\end{pmatrix}$ y $|AB|=2m+(1+m)=3m+1$.

**$AB$ no tiene inversa si $m=-\dfrac13$.**

**b)** $BA=\begin{pmatrix}2&m-1&1\\2&2m&2\\m-1&-2m&-1\end{pmatrix}$. Desarrollando, $|BA|=0$ para todo $m$ (es lógico: $BA$ es $3\times3$ pero $\operatorname{rg}(BA)\le\operatorname{rg}(A)\le2$), luego $\operatorname{rg}(BA)\le2$.

El menor de las filas 1.ª y 2.ª y columnas 1.ª y 3.ª vale $\begin{vmatrix}2&1\\2&2\end{vmatrix}=2\neq0$, sin depender de $m$.

**$\operatorname{rg}(BA)=2$ para todo $m\in\mathbb{R}$.**

@@ 7
$r$: punto $R(2,-1,3)$, dirección $\vec u=(3,2,1)$. $s$: de $y=2x-2$ y $z=3-x$, con $x=\mu$: punto $(0,-2,3)$, dirección $\vec v=(1,2,-1)$.

**a)** Normal del plano: $\vec u\times\vec v=(-4,4,4)\parallel(1,-1,-1)$. Plano $x-y-z+k=0$ por $R$: $2+1-3+k=0\Rightarrow k=0$.

**$x-y-z=0$**

**b)** Un plano perpendicular a $s$ tiene normal $\vec v$ y contendría a $r$ sólo si $\vec u\cdot\vec v=0$. Pero $\vec u\cdot\vec v=3+4-1=6\neq0$, luego $r$ no es paralela a ningún plano de normal $\vec v$, y por tanto ninguno la contiene.

@@ 8
$\overrightarrow{AB}=(-3,2,-6)$, $\overrightarrow{AC}=(-11,-1,-3)$.

**a)** $\overrightarrow{AB}\times\overrightarrow{AC}=(-12,57,25)$, de módulo $\sqrt{144+3249+625}=\sqrt{4018}=7\sqrt{82}$.

**Área $=\dfrac{7\sqrt{82}}{2}\approx31{,}7\ \text{u}^2$**

**b)** Es el plano mediador: normal $\overrightarrow{AB}\parallel(3,-2,6)$, pasa por el punto medio $M\left(-\tfrac12,3,0\right)$: $3x-2y+6z+k=0$ con $-\tfrac32-6+k=0\Rightarrow k=\tfrac{15}2$.

**$6x-4y+12z+15=0$**
