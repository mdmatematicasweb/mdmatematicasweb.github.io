@@ 1
**a)** Continuidad en $0$: $\displaystyle\lim_{x\to0^-}\frac{ax+b}{x-1}=-b$ y $\ln1=0$, luego $b=0$.

Derivabilidad en $0$: para $x<0$, $f'(x)=\dfrac{-a-b}{(x-1)^2}$, con $f'(0^-)=-a$; para $x>0$, $f'(x)=\dfrac1{1+x}$, con $f'(0^+)=1$. Así $-a=1$.

**$a=-1,\ b=0$**

**b)** En $x=2$: $f(2)=\ln3$, $f'(2)=\frac13$.

Tangente: **$y=\ln3+\dfrac13(x-2)$**. Normal: **$y=\ln3-3(x-2)$**.

@@ 2
$f'(x)=b\cos x+2c\cos2x$.

- Punto crítico en $x=\pi$: $f'(\pi)=-b+2c=0$.
- La normal $y=-\frac12x+3$ tiene pendiente $-\frac12$, luego la tangente tiene pendiente $2$: $f'(0)=b+2c=2$. Además la normal pasa por $(0,3)$, luego $f(0)=a=3$.

De las dos primeras: $b=1$, $c=\frac12$.

**$a=3,\ b=1,\ c=\dfrac12$**

@@ 3
**a)** $f'(x)=\dfrac{2\ln x}{x}$: negativa si $0<x<1$, positiva si $x>1$.

**Decrece en $(0,1)$ y crece en $(1,+\infty)$; mínimo relativo en $x=1$ con valor $f(1)=0$.**

**b)** $f\ge0$. Por partes (dos veces), una primitiva es $x\ln^2x-2x\ln x+2x$:

$$A=\bigl[x\ln^2x-2x\ln x+2x\bigr]_1^e=(e-2e+2e)-2=e-2.$$

**$A=e-2\approx0{,}718\ \text{u}^2$**

@@ 4
Con $t=\sqrt{e^x}=e^{x/2}$: $x=2\ln t$, $dx=\dfrac{2}{t}\,dt$; límites $x=0\to t=1$, $x=2\to t=e$.

$$I=\int_1^e\frac{2}{t(1+t)}\,dt=2\int_1^e\left(\frac1t-\frac1{1+t}\right)dt=2\left[\ln\frac{t}{1+t}\right]_1^e=2\left(\ln\frac{e}{1+e}+\ln2\right).$$

**$I=2-2\ln(1+e)+2\ln2\approx0{,}760$**

@@ 5
**a)** $\begin{vmatrix}1&1&2\\3&-1&-2\\-1&2&m\end{vmatrix}=-4(m-4)$. Infinitas soluciones (SCI) cuando el determinante es nulo: **$m=4$** (el rango es $2$ y el sistema es homogéneo, luego compatible).

Con $m=4$: de las dos primeras, $x+y+2z=0$ y $3x-y-2z=0$; sumando, $4x=0\Rightarrow x=0$ y $y=-2z$.

**$(x,y,z)=(0,-2\lambda,\lambda),\ \lambda\in\mathbb{R}$**

**b)** Para $m=2$, $|A|=-4(2-4)=8\neq0$: el sistema homogéneo sólo tiene la solución trivial $(0,0,0)$.

**No existe ninguna solución con $z=1$.**

@@ 6
$|A|=2$.

**a)** $\left|\tfrac13A^{-1}A^t\right|=\left(\tfrac13\right)^3\cdot\dfrac1{|A|}\cdot|A^t|=\dfrac1{27}\cdot\dfrac12\cdot2=$ **$\dfrac1{27}$**.

**b)** Primer determinante: se intercambian las columnas 1 y 3 (cambia el signo), se saca factor $2$ de la fila 1 y $3$ de la columna 3: vale $-(2\cdot3)\,|A|=$ **$-12$**.

Segundo: la columna 1 es $2\bigl[(a,d,1)-(b,e,2)\bigr]$; sumándole la columna 3 $(b,e,2)$ resulta $2\,\bigl|(a,d,1),(c,f,3),(b,e,2)\bigr|$, que equivale a $A^t$ con dos columnas intercambiadas. Vale $2\cdot(-|A|)=$ **$-4$**.

@@ 7
Dirección de $r$: $\vec u=(1,2,1)$. Dirección de $s$: $(1,-1,1)\times(3,-1,-1)=(2,4,2)\parallel\vec u$: las rectas son paralelas.

Un punto de $r$: $R(0,-2,1)$. Un punto de $s$ (tomando $x=0$): $S(0,1,3)$, que no está en $r$.

El lado del cuadrado es la distancia entre ambas rectas:

$$d=\frac{|\overrightarrow{RS}\times\vec u|}{|\vec u|}=\frac{|(0,3,2)\times(1,2,1)|}{\sqrt6}=\frac{|(-1,2,-3)|}{\sqrt6}=\sqrt{\frac{14}{6}}.$$

**Área $=d^2=\dfrac73\ \text{u}^2$**

@@ 8
$r$: punto $R(1,1,2)$, dirección $(1,1,m)$. $s$: de $x+z=2$ y $x-y+2z=3$ resulta $y=z-1$; con $z=\mu$: $(2-\mu,\,\mu-1,\,\mu)$, punto $S(2,-1,0)$, dirección $(-1,1,1)$.

**a)** Las direcciones nunca son proporcionales. $\overrightarrow{RS}=(1,-2,-2)$ y $\begin{vmatrix}1&1&m\\-1&1&1\\1&-2&-2\end{vmatrix}=m-1$.

- $m\neq1$: **se cruzan**.
- $m=1$: **se cortan** en un punto.

**b)** Con $m=1$: $\vec u=(1,1,1)$ y $\vec v=(-1,1,1)$:

$$\cos\alpha=\frac{|\vec u\cdot\vec v|}{|\vec u||\vec v|}=\frac{1}{\sqrt3\sqrt3}=\mathbf{\frac13}.$$
