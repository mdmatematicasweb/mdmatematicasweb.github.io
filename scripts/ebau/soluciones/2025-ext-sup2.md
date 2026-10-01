@@ 1
$r$: punto $A(0,2,k)$, $\vec u=(1,-1,2)$. $s$: punto $B(-2,-3,1)$, $\vec v=(-1,2,1)$. Los vectores directores no son proporcionales.

**a)** Se cortan si son coplanarias: $\overrightarrow{AB}=(-2,-5,1-k)$ y
$$\left|\begin{matrix}1&-1&2\\-1&2&1\\-2&-5&1-k\end{matrix}\right|=26-k=0\;\Rightarrow\;\mathbf{k=26}.$$

**b)** Con $k=0$, la normal es $\vec u\times\vec v=(-5,-3,1)$, es decir $5x+3y-z+D=0$. Pasa por $(0,2,0)$: $6+D=0$.
**Plano: $5x+3y-z-6=0$.**

@@ 2
Un punto de la trayectoria es $(x,\sqrt{x+1})$, con $x\ge-1$. El cuadrado de la distancia a $(2,0)$ es
$$d^2(x)=(x-2)^2+x+1,\qquad (d^2)'=2(x-2)+1=0\Rightarrow x=\tfrac32.$$
Como $(d^2)''=2>0$, es un mínimo.

Punto: **$\left(\dfrac32,\dfrac{\sqrt{10}}{2}\right)$**. Distancia: $d=\sqrt{\tfrac14+\tfrac52}=\mathbf{\dfrac{\sqrt{11}}{2}}\approx1{,}66$.

@@ 3
**a)** Para $x\ge0$, $f(x)=\dfrac{1+x}{1-x}$ y $f'(x)=\dfrac{2}{(1-x)^2}$. Para $x<0$, $f(x)=\dfrac{1-x}{1+x}$ y $f'(x)=\dfrac{-2}{(1+x)^2}$.

$f$ es continua en $0$, pero $f'(0^+)=2\neq-2=f'(0^-)$. **$f$ es derivable en $(-1,1)\setminus\{0\}$ y no es derivable en $x=0$.**

**b)** $f'<0$ en $(-1,0)$ y $f'>0$ en $(0,1)$. **Decrece en $(-1,0)$ y crece en $(0,1)$** (mínimo en $x=0$).

@@ 4
**a)** Sacando factores: la fila 2 tiene factor $3$, la fila 3 tiene factor $2$ y la columna 3 tiene factor $2$; queda un factor $12$. La matriz resultante tiene por columnas las filas $1$, $3$ y $2$ de $M$, es decir, es la traspuesta de $M$ con dos filas intercambiadas, así que su determinante es $-|M|$.
$$12\cdot(-|M|)=12\cdot5=\mathbf{60}.$$

**b)** A la fila 1 le sumamos $3\cdot$ fila 3: queda $(2a_{11},\,2a_{12},\,4a_{13})$. Sacamos $2$ de la fila 1 y $2$ de la columna 3:
$$|\cdot|=2\cdot2\cdot|M|=4\cdot(-5)=\mathbf{-20}.$$

@@ 5
**a)** $A^2=\begin{pmatrix}a^2+3b&3a+3\\ab+b&3b+1\end{pmatrix}=\begin{pmatrix}4&0\\0&4\end{pmatrix}$. De $3b+1=4$ sale $b=1$; de $3a+3=0$ sale $a=-1$, y se cumple $a^2+3b=4$ y $ab+b=0$. **$a=-1$, $b=1$.**

**b)** Con esos valores $A^2=4I$, que es invertible, así que $X=(A^2)^{-1}B^t=\tfrac14B^t$ existe:
$$\mathbf{X}=\frac14\begin{pmatrix}1&-1&1\\1&2&1\end{pmatrix}=\begin{pmatrix}1/4&-1/4&1/4\\1/4&1/2&1/4\end{pmatrix}.$$

@@ 6
**a)** Ambas son negativas: $f=-e^x$ es creciente y tiende a $0$ en $-\infty$; $g=-e^{-x}$ es decreciente y tiende a $0$ en $+\infty$. Ambas pasan por $(0,-1)$ (único corte) y están por debajo del eje $OX$; $g$ queda por encima de $f$ para $x>0$ y por debajo para $x<0$.

**b)** Por simetría respecto del eje $OY$:
$$A=2\int_0^1\big(-e^{-x}+e^{x}\big)dx=2\big[e^{x}+e^{-x}\big]_0^1=\mathbf{2\left(e+\dfrac1e-2\right)}\approx2{,}17\ u^2.$$

@@ 7
**a)** $P(X>230)=0{,}33\Rightarrow P\!\left(Z\le\dfrac{30}{\sigma}\right)=0{,}67$. En la tabla, $z=0{,}44$ ($\Phi(0{,}44)=0{,}6700$). Entonces $\dfrac{30}{\sigma}=0{,}44$ y **$\sigma\approx68{,}2$ g**.

**b)** $P(160<X<220)=P(-0{,}8<Z<0{,}4)=\Phi(0{,}4)-\Phi(-0{,}8)=0{,}6554-(1-0{,}7881)=0{,}4435$. **Aproximadamente el $44{,}35\,\%$.**
