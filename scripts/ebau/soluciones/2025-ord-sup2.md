@@ 1
**a)** En cada tramo $f$ es derivable. En $x=1$: $f(1^-)=1-e$ y $f(1)=2-1-e=1-e$, luego es continua. Derivadas laterales: $f'(1^-)=-e$ (de $f'=-e^{x}$) y $f'(1^+)=2$. Como son distintas, **$f$ es derivable en $[0,2]\setminus\{1\}$ y no es derivable en $x=1$.**

**b)** En $[0,1)$, $f'=-e^{x}<0$: decrece de $f(0)=0$ hasta $1-e$. En $[1,2]$, $f'=2>0$: crece de $f(1)=1-e$ hasta $f(2)=3-e\approx0{,}28$.

**Mínimo absoluto en $x=1$, valor $1-e$. Máximo absoluto en $x=2$, valor $3-e$** (mayor que $f(0)=0$).

@@ 2
Con $t=x^2-3$, $dt=2x\,dx$, $4x\,dx=2\,dt$. Además $x^4-6x^2+10=(x^2-3)^2+1=t^2+1$. Límites: $x=\sqrt3\to t=0$, $x=2\to t=1$.
$$\int_0^1\frac{2\,dt}{t^2+1}=2\big[\operatorname{arctg}t\big]_0^1=\mathbf{\frac\pi2}.$$

@@ 3
**a)** $x^3-x=-x^2+1\Rightarrow x^3+x^2-x-1=(x+1)^2(x-1)=0$. Cortes en $x=-1$ (doble: las gráficas son tangentes) y $x=1$: **puntos $(-1,0)$ y $(1,0)$.**

![Recinto entre f(x)=x³−x y g(x)=1−x², que se cortan en (−1,0) (tangentes) y (1,0)](fig/2025-ord-sup2-e3.svg){fig-alt="Recinto entre f(x)=x³−x y g(x)=1−x², que se cortan en (−1,0) (tangentes) y (1,0)" width="75%" fig-align="center"}

Esbozo: $g$ es una parábola con vértice $(0,1)$ y cortes con $OX$ en $\pm1$; $f$ es una cúbica que pasa por $(-1,0)$, $(0,0)$, $(1,0)$ (máximo local en $x=-1/\sqrt3$). En $(-1,1)$ la parábola queda por encima de la cúbica.

**b)** $g-f=-(x-1)(x+1)^2\ge0$ en $[-1,1]$:
$$A=\int_{-1}^{1}(-x^3-x^2+x+1)\,dx=2\int_0^1(-x^2+1)\,dx=2\cdot\frac23=\mathbf{\frac43}\ u^2.$$

@@ 4
**a)** $A^2=\begin{pmatrix}-1&0&1\\1&4&4\\-1&-3&-3\end{pmatrix}$ y $A^3=A\cdot A^2=\begin{pmatrix}-1&0&0\\0&-1&0\\0&0&-1\end{pmatrix}=-I$, luego **$A^3+I=O$**.

De $A\cdot A^2=-I$ sale $A(-A^2)=I$:
$$\mathbf{A^{-1}}=-A^2=\begin{pmatrix}1&0&-1\\-1&-4&-4\\1&3&3\end{pmatrix}.$$

**b)** $2025=3\cdot675$, así que $A^{2025}=(A^3)^{675}=(-I)^{675}=\mathbf{-I}$.

@@ 5
**a)** A la fila 1 le restamos la fila 2 y a la fila 3 le restamos $2\cdot$ fila 2 (no cambia el determinante): queda $\left|\begin{matrix}x&y&z\\a&b&c\\u&v&w\end{matrix}\right|$, que es el original con las filas 1 y 2 intercambiadas: **$-1$.**

**b)** Es la traspuesta de la matriz con filas $(z,x,y)$, $(c,a,b)$, $(w,u,v)$. Cada fila es una permutación cíclica de las columnas de una fila del original (no cambia el signo), y las filas 1 y 2 están intercambiadas: **$-1$.**

@@ 6
**a)** La recta perpendicular a $\pi$ por $A$ es $(1+t,\,2+t,\,t)$. Corta a $\pi$: $3+3t+1=0\Rightarrow t=-\dfrac43$, punto medio $M\left(-\dfrac13,\dfrac23,-\dfrac43\right)$.

$A'=2M-A=$ **$\left(-\dfrac53,-\dfrac23,-\dfrac83\right)$.**

**b)** El plano contiene a $\overrightarrow{AB}=(2,-1,0)$ y a la normal de $\pi$, $(1,1,1)$. Su normal es $\overrightarrow{AB}\times(1,1,1)=(-1,-2,3)$ y pasa por $A$:
**$x+2y-3z-5=0$.** (Comprobación: $B$: $3+2-5=0$.)

@@ 7
Sean $E$ expreso, $M$ medio, $A$ americano y $D$ descafeinado. $P(D|E)=0{,}82$, $P(D|M)=0{,}69$, $P(D|A)=0{,}89$.

**a)** $P(E\cap D)=0{,}29\cdot0{,}82=\mathbf{0{,}2378}$.

**b)** $P(D)=0{,}2378+0{,}51\cdot0{,}69+0{,}2\cdot0{,}89=0{,}2378+0{,}3519+0{,}178=0{,}7677$.
$$P(E|D)=\frac{0{,}2378}{0{,}7677}=\mathbf{0{,}3098}.$$
