@@ 1
**Condición para que el límite sea finito.**
1. El denominador es $x^3+x^2=x^2(x+1)$, de orden $x^2$ cerca de $0$. Para que el límite sea finito (y no $\pm\infty$), el numerador debe ser $O(x^2)$ (indeterminación $\tfrac00$ resuelta con desarrollos de Taylor o con L'Hôpital).
2. Se desarrolla el numerador cerca de $0$: $\operatorname{sen}x=x-\tfrac{x^3}{6}+\dots$ y $x\ln(x+1)=x\left(x-\tfrac{x^2}{2}+\dots\right)=x^2-\tfrac{x^3}{2}+\dots$.
3. Entonces el numerador es
$$a x+(b+1)x^2+O(x^3).$$
4. El término en $x$ debe anularse: $a=0$.

**Cálculo del límite.**
5. Con $a=0$: $\displaystyle\lim_{x\to0}\frac{(b+1)x^2+O(x^3)}{x^2(x+1)}=b+1$.
6. Se iguala al valor dado: $b+1=2$.

**$a=0$, $b=1$.**

@@ 2
**Derivada.**
1. Por la regla del producto: $f'(x)=e^{x}(\cos x+\operatorname{sen}x)+e^{x}(-\operatorname{sen}x+\cos x)=2e^{x}\cos x$.

**a) Extremos absolutos en $[0,2\pi]$.**
1. $f'(x)=0\iff\cos x=0$, es decir, $x=\tfrac{\pi}{2}$ y $x=\tfrac{3\pi}{2}$ (puntos críticos dentro del intervalo).
2. El teorema de Weierstrass asegura que una función continua en un intervalo cerrado alcanza máximo y mínimo absolutos: se comparan los valores en los puntos críticos y en los extremos del intervalo.
3. $f(0)=1$, $f(\tfrac{\pi}{2})=e^{\pi/2}\approx 4{,}81$, $f(\tfrac{3\pi}{2})=-e^{3\pi/2}\approx-111{,}3$, $f(2\pi)=e^{2\pi}\approx 535{,}5$.
4. El mayor es $f(2\pi)$ y el menor es $f(\tfrac{3\pi}{2})$.

**Máximo absoluto en $x=2\pi$, de valor $e^{2\pi}$; mínimo absoluto en $x=\tfrac{3\pi}{2}$, de valor $-e^{3\pi/2}$.**

**b) Tangente y normal en $x=\tfrac{3\pi}{2}$.**
1. Punto: $f(\tfrac{3\pi}{2})=-e^{3\pi/2}$.
2. Pendiente: $f'(\tfrac{3\pi}{2})=2e^{3\pi/2}\cos\tfrac{3\pi}{2}=0$: la tangente es horizontal.
3. La normal es perpendicular a la tangente, luego es vertical y pasa por el mismo punto.

**Tangente: $y=-e^{3\pi/2}$. Normal: $x=\tfrac{3\pi}{2}$.**

@@ 3
**Recta normal.**
1. En $x=0$: $f(0)=0$ y $f'(x)=3x^2-1$, así que $f'(0)=-1$.
2. La normal es perpendicular a la tangente y tiene pendiente $-\dfrac{1}{f'(0)}=-\dfrac{1}{-1}=1$. Pasa por $(0,0)$: $y=x$.

**Recinto.**
3. Cortes de $f$ con la normal: $x^3-x=x\Rightarrow x^3-2x=0\Rightarrow x(x^2-2)=0\Rightarrow x=0,\ \pm\sqrt2$.
4. Tanto $f$ como la recta son funciones impares, así que el recinto total es simétrico respecto del origen: el área es el doble de la de $[0,\sqrt2]$.
5. En $[0,\sqrt2]$ la recta está por encima de $f$ (por ejemplo, en $x=1$: recta $1$, $f=0$). Se integra la diferencia $x-(x^3-x)=2x-x^3$:
$$A=2\int_0^{\sqrt2}(2x-x^3)\,dx=2\left[x^2-\tfrac{x^4}{4}\right]_0^{\sqrt2}=2(2-1).$$

**$A=2$ u$^2$.**

@@ 4
**Cambio de variable** $t=\sqrt{1+x}$.
1. Se despeja: $x=t^2-1$, luego $dx=2t\,dt$.
2. Los límites cambian: para $x=0$, $t=1$; para $x=3$, $t=2$.
3. Se sustituye y se simplifica ($t$ se cancela):
$$\int_1^2\frac{t^2-1}{t}\,2t\,dt=2\int_1^2(t^2-1)\,dt=2\left[\tfrac{t^3}{3}-t\right]_1^2=2\left(\tfrac23+\tfrac23\right).$$

**$\dfrac{8}{3}$.**

@@ 5
**Planteamiento.**
1. Sean $A$, $B$, $C$ los seguidores de Alberto, Begoña y Carlos.
2. «La suma es 13000»: $A+B+C=13000$.
3. «Carlos pierde un tercio y aún tiene el doble que Alberto»: le quedan $\tfrac23C$, luego $\tfrac23C=2A$.
4. «Alberto más la quinta parte de Begoña son la mitad de Carlos»: $A+\tfrac B5=\tfrac C2$.
$$\begin{cases}A+B+C=13000\\ \tfrac23C=2A\\ A+\tfrac{B}{5}=\tfrac{C}{2}\end{cases}$$

**Resolución.**
5. De la segunda, $C=3A$.
6. En la tercera: $A+\tfrac B5=\tfrac{3A}{2}\Rightarrow\tfrac B5=\tfrac A2\Rightarrow B=\tfrac{5A}{2}$.
7. En la primera: $A+\tfrac52A+3A=13000\Rightarrow \tfrac{13}{2}A=13000\Rightarrow A=2000$.
8. Entonces $B=5000$ y $C=6000$. Comprobación: $2000+5000+6000=13000$ ✓.

**Alberto 2000, Begoña 5000 y Carlos 6000 seguidores.**

@@ 6
**a) Rango según $m$.**
1. Determinante: $|A|=m^2-1=(m-1)(m+1)$, que se anula en $m=\pm1$.
2. Si $m\neq\pm1$: $|A|\neq0$, luego $\operatorname{rg}A=3$.
3. Si $m=1$: las filas son $(1,1,3),(1,1,2),(1,1,3)$. Hay un menor no nulo de orden 2 (por ejemplo, $\begin{vmatrix}1&3\\1&2\end{vmatrix}=-1$) y $|A|=0$: $\operatorname{rg}A=2$.
4. Si $m=-1$: las filas son $(-1,1,3),(1,-1,2),(1,-1,3)$. El menor $\begin{vmatrix}-1&3\\1&2\end{vmatrix}=-5\ne0$ y $|A|=0$: $\operatorname{rg}A=2$.

**$\operatorname{rg}A=3$ si $m\neq\pm1$; $\operatorname{rg}A=2$ si $m=1$ o $m=-1$.**

**b) Ecuación $AX=B$ para $m=0$.**
1. Para $m=0$, $|A|=-1\neq0$: $A$ es invertible.
2. Se multiplica por $A^{-1}$ por la izquierda: $X=A^{-1}B$.
3. Se calcula $A^{-1}$ y se multiplica por $B$:

**$X=A^{-1}B=\begin{pmatrix}5&-4\\8&-4\\-2&2\end{pmatrix}$.**

@@ 7
**a) Valores de $m$.**
1. Vectores desde $A$: $\overrightarrow{AB}=(m,-2,-2)$ y $\overrightarrow{AC}=(2,-1,-1)$.
2. Producto vectorial: $\overrightarrow{AB}\times\overrightarrow{AC}=(0,\,m-4,\,4-m)$, de módulo $\sqrt2\,|m-4|$.
3. El área del triángulo es la mitad del módulo: $\tfrac12\sqrt2|m-4|=\tfrac{\sqrt{18}}{2}$.
4. Se despeja: $\sqrt2|m-4|=\sqrt{18}=3\sqrt2\Rightarrow|m-4|=3$.

**$m=1$ o $m=7$.**

**b) Coseno del ángulo en $A$ para $m=0$.**
1. Con $m=0$: $\overrightarrow{AB}=(0,-2,-2)$ y $\overrightarrow{AC}=(2,-1,-1)$.
2. Producto escalar: $\overrightarrow{AB}\cdot\overrightarrow{AC}=0+2+2=4$. Módulos: $|\overrightarrow{AB}|=2\sqrt2$ y $|\overrightarrow{AC}|=\sqrt6$.
3. Se aplica la fórmula del ángulo entre vectores:
$$\cos\widehat A=\frac{\overrightarrow{AB}\cdot\overrightarrow{AC}}{|\overrightarrow{AB}||\overrightarrow{AC}|}=\frac{4}{2\sqrt2\cdot\sqrt6}=\frac{1}{\sqrt3}.$$

**$\cos\widehat A=\dfrac{\sqrt3}{3}$.**

@@ 8
**Ecuación del plano.**
1. Del plano en paramétricas: vectores directores $(9,2,4)$ y $(3,0,1)$, y punto $(0,-1,3)$ (para $\alpha=\beta=0$).
2. Normal: $\vec n=(9,2,4)\times(3,0,1)=(2,3,-6)$, con $|\vec n|=\sqrt{4+9+36}=7$.
3. Con el punto: $2x+3y-6z+D=0$ y $0-3-18+D=0\Rightarrow D=21$:
$$\pi:\ 2x+3y-6z+21=0.$$

**a) Simétrico de $P$ respecto de $\pi$.**
1. Recta por $P$ perpendicular a $\pi$ (con dirección $\vec n$): $(2+2t,\,3t,\,-4-6t)$.
2. Se corta con $\pi$: $2(2+2t)+3(3t)-6(-4-6t)+21=0\Rightarrow4+4t+9t+24+36t+21=0\Rightarrow49t=-49\Rightarrow t=-1$.
3. El pie de la perpendicular es $M(0,-3,2)$ (el punto medio de $P$ y su simétrico).
4. Simétrico: $P'=2M-P=(0,-6,4)-(2,0,-4)$.

**$P'(-2,-6,8)$.**

**b) Distancia de $P$ a $\pi$.**
1. Fórmula: $d(P,\pi)=\dfrac{|2\cdot2+3\cdot0-6\cdot(-4)+21|}{\sqrt{2^2+3^2+(-6)^2}}=\dfrac{|4+0+24+21|}{7}=\dfrac{49}{7}$.

**$d=7$.**
