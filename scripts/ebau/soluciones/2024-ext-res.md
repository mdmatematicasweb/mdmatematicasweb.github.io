@@ 1
Rectángulo de lados $x$ e $y=25/x$. Las dos diagonales miden lo mismo, $d=\sqrt{x^2+y^2}$, así que el producto es $d^2=x^2+\dfrac{625}{x^2}$.

$$g(x)=x^2+\frac{625}{x^2},\qquad g'(x)=2x-\frac{1250}{x^3}=0\ \Rightarrow\ x^4=625\ \Rightarrow\ x=5.$$

$g'<0$ si $x<5$ y $g'>0$ si $x>5$, luego es un mínimo. Entonces $y=5$.

**El rectángulo es un cuadrado de $5\times5$ cm** (producto de diagonales mínimo: $50$ cm²).

@@ 2
**a)** Dividiendo: $\dfrac{ax^3+x-1}{x^2+bx-3}=ax-ab+\dfrac{(ab^2+3a+1)x-3ab-1}{x^2+bx-3}$. La asíntota oblicua es $y=ax-ab$, que debe ser $y=x-2$:

$$a=1,\quad ab=2\ \Rightarrow\ \mathbf{a=1,\ b=2}.$$

**b)** Con $a=0$, $b=2$: $f(x)=\dfrac{x-1}{x^2+2x-3}=\dfrac{x-1}{(x-1)(x+3)}$.

- En $x=1$: $\lim_{x\to1}f(x)=\dfrac14$, finito (discontinuidad evitable), no hay asíntota.
- En $x=-3$: $\lim_{x\to-3^+}f=+\infty$ y $\lim_{x\to-3^-}f=-\infty$.

**Única asíntota vertical: $x=-3$.**

@@ 3
Se parte en el $0$:

$$\int_{-\pi}^{0}(1-e^x)\,dx=\Big[x-e^x\Big]_{-\pi}^{0}=-1-(-\pi-e^{-\pi})=\pi-1+e^{-\pi}.$$

$\int_0^{\pi}x\cos x\,dx$ por partes ($u=x$, $dv=\cos x\,dx$): $\big[x\operatorname{sen}x+\cos x\big]_0^{\pi}=-1-1=-2$.

$$\int_{-\pi}^{\pi}f(x)\,dx=\mathbf{\pi-3+e^{-\pi}}\approx 0{,}185.$$

@@ 4
Con $x-1=t^2$, $dx=2t\,dt$, $\ln\dfrac{\sqrt{x-1}}{2}=\ln\dfrac t2$:

$$\int (x-1)^2\ln\frac{\sqrt{x-1}}2\,dx=2\int t^5\ln\frac t2\,dt=\frac{t^6}{3}\ln\frac t2-\int\frac{t^5}{3}\,dt=\frac{t^6}{3}\ln\frac t2-\frac{t^6}{18}+C.$$

Deshaciendo el cambio: $F(x)=\dfrac{(x-1)^3}{3}\ln\dfrac{\sqrt{x-1}}2-\dfrac{(x-1)^3}{18}+C$.

$F(5)=\frac{64}{3}\ln1-\frac{64}{18}+C=-\frac{32}{9}+C=-\frac72\Rightarrow C=\frac1{18}$.

$$\mathbf{F(x)=\frac{(x-1)^3}{3}\ln\frac{\sqrt{x-1}}2-\frac{(x-1)^3}{18}+\frac1{18}}$$

@@ 5
**a)** Sea $D$ el determinante pedido. Su fila 1 es $(x,y,z)-(1,1,1)$ y su fila 3 es $(3,0,2)+(1,1,1)$. Por linealidad en filas, y como un determinante con dos filas iguales vale $0$ (en particular los términos con $(1,1,1)$ repetido), queda

$$D=\begin{vmatrix}x&y&z\\1&1&1\\3&0&2\end{vmatrix}=-\begin{vmatrix}x&y&z\\3&0&2\\1&1&1\end{vmatrix}=-|A|$$

(al intercambiar dos filas el determinante cambia de signo). Luego $\mathbf{D=-5}$.

**b)** $B\cdot A=(x+3y+z,\ y+z,\ 2y+2z)=(3,0,0)$, de donde $y+z=0$ y $x+3y+z=3$. Con $z=\lambda$: $y=-\lambda$, $x=3+2\lambda$.

$$\mathbf{(x,y,z)=(3+2\lambda,\,-\lambda,\,\lambda),\ \lambda\in\mathbb{R}}$$

(infinitas soluciones).

@@ 6
El sistema es $(A-mI)\vec x=\vec 0$, homogéneo (siempre compatible). Será compatible indeterminado (SCI) si $|A-mI|=0$:

$$|A-mI|=-m(m-2)^2=0\ \Rightarrow\ m=0,\ m=2.$$

**a)** Para $m=0$ y para $m=2$ el rango de la matriz de coeficientes es $2<3$, así que **es SCI para $m=0$ y $m=2$**; para cualquier otro $m$ es compatible determinado (SCD), sólo con la solución trivial.

**b)** $m=2$: $\begin{cases}3x-2y-3z=0\\2x-2y-2z=0\end{cases}$. De la segunda, $x=y+z$; en la primera $3y+3z-2y-3z=y=0$. Así $x=z$.

$$\mathbf{(x,y,z)=(\lambda,0,\lambda),\ \lambda\in\mathbb{R}}$$

@@ 7
$r$: punto $(0,-a,-1)$, dirección $\vec d_r=(1,1,2)$. $s$: con $y=\mu$, $(x,y,z)=(3a+2\mu,\ \mu,\ 2-3a-2\mu)$: punto $(3a,0,2-3a)$, dirección $\vec d_s=(2,1,-2)$.

**a)** No son paralelas. Se cortan si son coplanarias: $\big[\overrightarrow{P_rP_s},\vec d_r,\vec d_s\big]=0$ con $\overrightarrow{P_rP_s}=(3a,a,3-3a)$ y $\vec d_r\times\vec d_s=(-4,6,-1)$:

$$-12a+6a-3+3a=-3a-3=0\ \Rightarrow\ \mathbf{a=-1}.$$

**b)** Con $a=-1$ se cortan en un punto: igualando $r\,(t,\,1+t,\,-1+2t)$ y $s\,(-3+2\mu,\,\mu,\,5-2\mu)$ se obtiene $t=1$, $\mu=2$, punto $(1,2,1)$. La recta que corta perpendicularmente a ambas pasa por ese punto con dirección $\vec d_r\times\vec d_s=(-4,6,-1)$:

$$\mathbf{(x,y,z)=(1,2,1)+\lambda(-4,6,-1)}\ \ \text{es decir}\ \ \frac{x-1}{-4}=\frac{y-2}{6}=\frac{z-1}{-1}.$$

@@ 8
$\vec u\cdot\vec v=-2+a+2a=3a-2$ y $|\vec u|=|\vec v|=\sqrt{5+a^2}$.

**a)** $\cos\dfrac\pi3=\dfrac{3a-2}{5+a^2}=\dfrac12\Rightarrow a^2-6a+9=0\Rightarrow\mathbf{a=3}$ (comprobación: $7/14=1/2$).

**b)** $\vec u\times\vec v$ es ortogonal a $\vec u$, luego $\big((\vec u\times\vec v)-\vec v\big)\cdot\vec u=0-\vec v\cdot\vec u=0\Rightarrow 3a-2=0$:

$$\mathbf{a=\tfrac23}.$$
