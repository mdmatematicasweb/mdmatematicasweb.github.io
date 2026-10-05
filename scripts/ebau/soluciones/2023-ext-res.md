@@ 1
**Dos números no negativos de suma $1$ con $x\sqrt y$ máximo.**
1. **Incógnitas.** Los números son $x$ e $y=1-x$, con $x\in[0,1]$. Hay que maximizar $f(x)=x\sqrt{1-x}$.
2. **Derivada.** $f'(x)=\sqrt{1-x}-\dfrac{x}{2\sqrt{1-x}}=\dfrac{2-3x}{2\sqrt{1-x}}=0\Rightarrow x=\dfrac23$.
3. **Es máximo.** $f'>0$ a la izquierda y $f'<0$ a la derecha; además en los extremos $f(0)=f(1)=0$.
4. **Valor máximo.** $f(2/3)=\dfrac23\sqrt{\dfrac13}=\dfrac{2\sqrt3}{9}$.

**Los números son $\dfrac23$ y $\dfrac13$** (el máximo es $f(2/3)=\dfrac{2\sqrt3}{9}$).

@@ 2
**a) Cálculo de $a$ y $b$.**
1. Se hace la división: $f(x)=x+b+\dfrac{a+b^{2}}{x-b}$, así que la asíntota oblicua es $y=x+b$. Como debe ser $y=x+4$, $b=4$.
2. Pasa por $(1,-2)$: $f(1)=\dfrac{1+a}{1-4}=-2\Rightarrow 1+a=6$.

**$a=5$, $b=4$.**

**b) Recta normal en $x=0$.**
1. Función y derivada: $f(x)=\dfrac{x^{2}+5}{x-4}$ y $f'(x)=\dfrac{x^{2}-8x-5}{(x-4)^{2}}$.
2. En $x=0$: $f(0)=-\dfrac54$ y $f'(0)=-\dfrac5{16}$.
3. La pendiente de la normal es la opuesta del inverso de la de la tangente: $\dfrac{16}{5}$.
4. Ecuación por el punto $\left(0,-\dfrac54\right)$.

**$y=-\dfrac54+\dfrac{16}{5}x$**.

@@ 3
**Función a partir de su primitiva.**
1. Como $F$ es primitiva de $f$, $f(x)=F'(x)=2x\,e^{x^{2}}$.

**a) $f$ es creciente.**
1. Derivada: $f'(x)=(2+4x^{2})e^{x^{2}}$.
2. $f'(x)>0$ para todo $x$ (suma de un positivo y un no negativo, por una exponencial positiva).

**$f$ es creciente.**

**b) Área.**
1. $f(0)=0$ y $f\ge 0$ en $[0,1]$, así que el recinto está entre $x=0$ y $x=1$.
2. Barrow, con la primitiva dada:
$$\int_0^1 2x\,e^{x^{2}}dx=\left[e^{x^{2}}\right]_0^1=e-1.$$

**Área $=e-1\approx 1{,}72\ \text{u}^{2}$.**

@@ 4
**Primitiva con condición inicial.**
1. **Cambio de variable.** Con $t=\sqrt{x}$, $x=t^{2}$ y $dx=2t\,dt$: $\int\cos\sqrt{x}\,dx=\int 2t\cos t\,dt$.
2. **Por partes** ($u=2t$, $dv=\cos t\,dt$): $=2t\operatorname{sen}t+2\cos t+C=2\sqrt{x}\operatorname{sen}\sqrt{x}+2\cos\sqrt{x}+C$.
3. **Condición** $F(0)=5$: $2+C=5\Rightarrow C=3$.

**$F(x)=2\sqrt{x}\operatorname{sen}\sqrt{x}+2\cos\sqrt{x}+3$.**

@@ 5
**a) Potencia $A^{10}$.**
1. Se calculan las primeras potencias: $A^{2}=\begin{pmatrix}0&0&ab\\0&0&0\\0&0&0\end{pmatrix}$ y $A^{3}=A\cdot A^{2}=0$.
2. A partir de ahí todas las potencias son nulas.

**$A^{10}=0$** (matriz nula).

**b) Inversa de $I+A+A^{2}$.**
1. Se usa $(I-A)(I+A+A^{2})=I-A^{3}=I$ (porque $A^{3}=0$).
2. Por tanto $I+A+A^{2}$ es invertible y su inversa es $I-A$:

$$(I+A+A^{2})^{-1}=\begin{pmatrix}1&-a&b\\0&1&-b\\0&0&1\end{pmatrix}.$$

@@ 6
**a) Rango menor que $3$.**
1. $M=A+(\lambda-1)B=\begin{pmatrix}\lambda&1&\lambda-1\\1&\lambda-1&1\\\lambda-1&1&\lambda\end{pmatrix}$.
2. Determinante: $|M|=-(\lambda-2)^{2}(\lambda+1)$.
3. $\operatorname{rg}M<3\iff|M|=0$.

**$\lambda=2$ o $\lambda=-1$**.

**b) Sistema homogéneo para $\lambda=-1$.**
1. Matriz: $M=\begin{pmatrix}-1&1&-2\\1&-2&1\\-2&1&-1\end{pmatrix}$, de rango 2: sistema compatible indeterminado (SCI) con una incógnita libre.
2. Las dos primeras ecuaciones dan $x=y=z$, y la tercera también se cumple.

**Solución: $(x,y,z)=(t,t,t)$, $t\in\mathbb{R}$.**

@@ 7
**Plano $\pi$.**
1. Vectores del plano: $\overrightarrow{AB}=(1,1,1)$ y $\overrightarrow{AC}=(3,1,0)$.
2. Normal: $\vec n=\overrightarrow{AB}\times\overrightarrow{AC}=(-1,3,-2)$.
3. Ecuación por $A(-1,0,0)$: $-(x+1)+3y-2z=0$, es decir, $\pi\equiv x-3y+2z+1=0$.
4. Comprobación: $B(0,1,1)$ cumple $0-3+2+1=0$ y $C(2,1,0)$ cumple $2-3+0+1=0$.

**Recta $r$.**
1. Se despeja en función de $z=t$: $x=3+2t$, $y=2+t$, $z=t$.
2. Dirección $(2,1,1)$. Como $(2,1,1)\cdot(1,-3,2)=1\neq0$, $r$ no es paralela a $\pi$: la distancia de sus puntos al plano varía con $t$.

**Distancia de un punto de $r$ a $\pi$.**
1. Para $P(3+2t,\,2+t,\,t)$: $(3+2t)-3(2+t)+2t+1=t-2$.
2. $d(P,\pi)=\dfrac{|t-2|}{\sqrt{1+9+4}}=\dfrac{|t-2|}{\sqrt{14}}$.
3. Se impone $d=\sqrt{14}$: $|t-2|=14$, de donde $t=16$ o $t=-12$.
4. Se sustituye en las paramétricas: $t=16$ da $(35,18,16)$ y $t=-12$ da $(-21,-10,-12)$.

**Los puntos de $r$ a distancia $\sqrt{14}$ del plano son $(35,18,16)$ y $(-21,-10,-12)$.**

*Interpretación:* hay dos puntos, uno a cada lado del plano, porque $r$ atraviesa $\pi$ (en $t=2$, el punto $(7,4,2)$).

@@ 8
**a) Cuarto vértice.**
1. En un paralelogramo $PQRS$ se cumple $\overrightarrow{PS}=\overrightarrow{QR}=(2,4,1)$.
2. $S=P+\overrightarrow{QR}=(-1,2,3)+(2,4,1)$.

**$S=(1,6,4)$.**

**b) Recta por el origen perpendicular al plano $PQR$.**
1. Vectores del plano: $\overrightarrow{PQ}=(-1,-1,-3)$ y $\overrightarrow{PR}=(1,3,-2)$.
2. Normal: $\vec n=\overrightarrow{PQ}\times\overrightarrow{PR}=(11,-5,-2)$.
3. La recta tiene esa dirección y pasa por el origen.

**$\dfrac{x}{11}=\dfrac{y}{-5}=\dfrac{z}{-2}$**.
