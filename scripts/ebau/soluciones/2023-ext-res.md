@@ 1
Sean los números $x$ e $y=1-x$ con $x\in[0,1]$. Hay que maximizar $f(x)=x\sqrt{1-x}$.

$f'(x)=\sqrt{1-x}-\dfrac{x}{2\sqrt{1-x}}=\dfrac{2-3x}{2\sqrt{1-x}}=0\Rightarrow x=\dfrac23$.

$f'>0$ a la izquierda y $f'<0$ a la derecha, luego es un máximo (en los extremos $f(0)=f(1)=0$).

**Los números son $\dfrac23$ y $\dfrac13$** (el máximo es $f(2/3)=\dfrac{2\sqrt3}{9}$).

@@ 2
**a)** Asíntota oblicua: $f(x)=x+b+\dfrac{a+b^{2}}{x-b}$, luego la asíntota es $y=x+b$ y $b=4$.

Pasa por $(1,-2)$: $\dfrac{1+a}{1-4}=-2\Rightarrow 1+a=6$.

**$a=5$, $b=4$.**

**b)** $f(x)=\dfrac{x^{2}+5}{x-4}$, $f'(x)=\dfrac{x^{2}-8x-5}{(x-4)^{2}}$. En $x=0$: $f(0)=-\dfrac54$ y $f'(0)=-\dfrac5{16}$.

La pendiente de la normal es $\dfrac{16}{5}$: **$y=-\dfrac54+\dfrac{16}{5}x$**.

@@ 3
Como $F$ es primitiva de $f$, $f(x)=F'(x)=2x\,e^{x^{2}}$.

**a)** $f'(x)=(2+4x^{2})e^{x^{2}}>0$ para todo $x$, luego **$f$ es creciente**.

**b)** $f(0)=0$ y $f\ge 0$ en $[0,1]$, así que el recinto está entre $x=0$ y $x=1$:

$$\int_0^1 2x\,e^{x^{2}}dx=\left[e^{x^{2}}\right]_0^1=e-1.$$

**Área $=e-1\approx 1{,}72\ \text{u}^2$.**

@@ 4
Con $t=\sqrt{x}$, $x=t^{2}$, $dx=2t\,dt$: $\int\cos\sqrt{x}\,dx=\int 2t\cos t\,dt$.

Por partes: $=2t\operatorname{sen}t+2\cos t+C=2\sqrt{x}\operatorname{sen}\sqrt{x}+2\cos\sqrt{x}+C$.

Condición $F(0)=5$: $2+C=5\Rightarrow C=3$.

**$F(x)=2\sqrt{x}\operatorname{sen}\sqrt{x}+2\cos\sqrt{x}+3$.**

@@ 5
**a)** $A^{2}=\begin{pmatrix}0&0&ab\\0&0&0\\0&0&0\end{pmatrix}$ y $A^{3}=A\cdot A^{2}=0$. Por tanto **$A^{10}=0$** (matriz nula).

**b)** $(I-A)(I+A+A^{2})=I-A^{3}=I$, luego existe la inversa y es $I-A$:

$$(I+A+A^{2})^{-1}=\begin{pmatrix}1&-a&b\\0&1&-b\\0&0&1\end{pmatrix}.$$

@@ 6
**a)** $M=\begin{pmatrix}\lambda&1&\lambda-1\\1&\lambda-1&1\\\lambda-1&1&\lambda\end{pmatrix}$ y $|M|=-(\lambda-2)^{2}(\lambda+1)$.

$\operatorname{rg}M<3\iff|M|=0\iff$ **$\lambda=2$ o $\lambda=-1$**.

**b)** Para $\lambda=-1$: $M=\begin{pmatrix}-1&1&-2\\1&-2&1\\-2&1&-1\end{pmatrix}$, de rango 2: sistema compatible indeterminado (SCI) con una incógnita libre.

Las dos primeras ecuaciones dan $x=y=z$, y la tercera también se cumple.

**Solución: $(x,y,z)=(t,t,t)$, $t\in\mathbb{R}$.**

@@ 7
Plano: $\overrightarrow{AB}=(1,1,1)$, $\overrightarrow{AC}=(3,1,0)$, $\vec n=\overrightarrow{AB}\times\overrightarrow{AC}=(-1,4,-2)$, luego $\pi\equiv x-4y+2z+1=0$.

Recta: $x=3+2z$, $y=2+z$; dirección $(2,1,1)$. Como $(2,1,1)\cdot(1,-4,2)=0$, $r$ es paralela a $\pi$.

Distancia (constante) de cualquier punto de $r$, p. ej. $(3,2,0)$: $\dfrac{|3-8+0+1|}{\sqrt{21}}=\dfrac{4}{\sqrt{21}}\ne\sqrt{14}$.

**No existe ningún punto de $r$ a distancia $\sqrt{14}$ de $\pi$.**

*Nota: el enunciado coincide con el examen oficial. Con estos datos la recta es paralela al plano y está a distancia $4/\sqrt{21}$, así que no hay solución; probablemente es una errata del examen.*

@@ 8
**a)** En un paralelogramo $PQRS$ se cumple $\overrightarrow{PS}=\overrightarrow{QR}=(2,4,1)$.

$S=P+\overrightarrow{QR}=(-1,2,3)+(2,4,1)$: **$S=(1,6,4)$.**

**b)** $\overrightarrow{PQ}=(-1,-1,-3)$, $\overrightarrow{PR}=(1,3,-2)$, $\vec n=\overrightarrow{PQ}\times\overrightarrow{PR}=(11,-5,-2)$.

La recta por el origen con esa dirección es **$\dfrac{x}{11}=\dfrac{y}{-5}=\dfrac{z}{-2}$**.
