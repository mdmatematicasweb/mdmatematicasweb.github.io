@@ 1
**a) Derivabilidad.**
1. En cada tramo $f$ es derivable: $1-e^{x}$ y $2x-1-e$ son funciones elementales.
2. Continuidad en $x=1$: $f(1^-)=1-e$ y $f(1)=2-1-e=1-e$. Coinciden, luego $f$ es continua.
3. Derivadas laterales: $f'(x)=-e^{x}$ si $x<1$, luego $f'(1^-)=-e$; $f'(x)=2$ si $x>1$, luego $f'(1^+)=2$.
4. Como $-e\neq2$, hay un punto anguloso en $x=1$.

**$f$ es derivable en $[0,2]\setminus\{1\}$ y no es derivable en $x=1$.**

**b) Extremos absolutos** (en el intervalo cerrado $[0,2]$).
1. En $[0,1)$: $f'=-e^{x}<0$, luego decrece desde $f(0)=0$ hasta $1-e$.
2. En $[1,2]$: $f'=2>0$, luego crece desde $f(1)=1-e$ hasta $f(2)=3-e\approx0{,}28$.
3. Se comparan los candidatos: $f(0)=0$, $f(1)=1-e\approx-1{,}72$ y $f(2)=3-e\approx0{,}28$.

**Mínimo absoluto en $x=1$, valor $1-e$. Máximo absoluto en $x=2$, valor $3-e$** (mayor que $f(0)=0$).

@@ 2
**Cambio de variable.**
1. Se toma $t=x^2-3$: $dt=2x\,dx$, luego $4x\,dx=2\,dt$.
2. El denominador queda como una suma de cuadrados: $x^4-6x^2+10=(x^2-3)^2+1=t^2+1$.
3. Límites: $x=\sqrt3\to t=0$ y $x=2\to t=1$.
4. Se integra (arcotangente):
$$\int_0^1\frac{2\,dt}{t^2+1}=2\big[\operatorname{arctg}t\big]_0^1=2\cdot\frac\pi4=\mathbf{\frac\pi2}.$$

@@ 3
**a) Puntos de corte y esbozo.**
1. Se igualan: $x^3-x=-x^2+1\Rightarrow x^3+x^2-x-1=0$.
2. Se factoriza: $x^3+x^2-x-1=(x+1)^2(x-1)=0$.
3. Cortes en $x=-1$ (raíz doble: las gráficas son tangentes) y $x=1$. En ambos $f=g=0$.

**Puntos $(-1,0)$ y $(1,0)$.**

![Recinto entre f(x)=x³−x y g(x)=1−x², que se cortan en (−1,0) (tangentes) y (1,0)](fig/2025-ord-sup2-e3.svg){fig-alt="Recinto entre f(x)=x³−x y g(x)=1−x², que se cortan en (−1,0) (tangentes) y (1,0)" width="75%" fig-align="center"}

4. Esbozo: $g$ es una parábola con vértice $(0,1)$ y cortes con $OX$ en $\pm1$; $f$ es una cúbica que pasa por $(-1,0)$, $(0,0)$ y $(1,0)$ (máximo local en $x=-1/\sqrt3$). En $(-1,1)$ la parábola queda por encima de la cúbica.

**b) Área.**
1. En $[-1,1]$, $g\ge f$ (se comprueba en $x=0$: $g(0)=1>f(0)=0$), y $g-f=-(x-1)(x+1)^2\ge0$.
2. La integral de la diferencia es:
$$A=\int_{-1}^{1}(-x^3-x^2+x+1)\,dx=2\int_0^1(-x^2+1)\,dx=2\cdot\frac23=\mathbf{\frac43}\ u^2.$$
(Los términos impares $-x^3$ y $x$ se anulan por la simetría del intervalo.)

@@ 4
**a) Comprobación y matriz inversa.**
1. Se calcula $A^2=\begin{pmatrix}-1&0&1\\1&4&4\\-1&-3&-3\end{pmatrix}$.
2. Se multiplica otra vez: $A^3=A\cdot A^2=\begin{pmatrix}-1&0&0\\0&-1&0\\0&0&-1\end{pmatrix}=-I$, luego **$A^3+I=O$**.
3. De $A\cdot A^2=-I$ sale $A\cdot(-A^2)=I$, de modo que $-A^2$ es la inversa de $A$:
$$\mathbf{A^{-1}}=-A^2=\begin{pmatrix}1&0&-1\\-1&-4&-4\\1&3&3\end{pmatrix}.$$

**b) Potencia $A^{2025}$.**
1. $2025=3\cdot675$.
2. $A^{2025}=(A^3)^{675}=(-I)^{675}=-I$, porque $675$ es impar.

**$A^{2025}=\mathbf{-I}$.**

@@ 5
**a) Primer determinante.**
1. A la fila 1 le restamos la fila 2 y a la fila 3 le restamos $2\cdot$ fila 2. Esto no cambia el determinante.
2. Queda $\left|\begin{matrix}x&y&z\\a&b&c\\u&v&w\end{matrix}\right|$.
3. Es el determinante original con las filas 1 y 2 intercambiadas, y al intercambiar dos filas el determinante cambia de signo.

**El valor es $-1$.**

**b) Segundo determinante.**
1. Se traspone (el determinante no cambia). Las filas son $(z,x,y)$, $(c,a,b)$ y $(w,u,v)$.
2. En cada fila, las columnas del original $(x,y,z)$, $(a,b,c)$, $(u,v,w)$ se han permutado cíclicamente de la misma manera. Una permutación cíclica de tres columnas es par: no cambia el signo.
3. Tras deshacerla, queda el original con las filas 1 y 2 intercambiadas: cambia de signo.

**El valor es $-1$.**

@@ 6
**a) Simétrico de $A$ respecto de $\pi$.**
1. Recta perpendicular a $\pi$ por $A$ (dirección la normal $(1,1,1)$): $(1+t,\,2+t,\,t)$.
2. Se corta con $\pi$: $(1+t)+(2+t)+t+1=3+3t+1=0\Rightarrow t=-\dfrac43$.
3. El punto de corte es el punto medio $M\left(-\dfrac13,\dfrac23,-\dfrac43\right)$.
4. El simétrico cumple $A'=2M-A$:

**$A'=\left(-\dfrac53,-\dfrac23,-\dfrac83\right)$.**

**b) Plano por $A$ y $B$ perpendicular a $\pi$.**
1. El plano contiene a $\overrightarrow{AB}=(2,-1,0)$ y a la normal de $\pi$, $(1,1,1)$ (por ser perpendicular a $\pi$).
2. Su normal es el producto vectorial: $\overrightarrow{AB}\times(1,1,1)=(-1,-2,3)$.
3. Plano por $A(1,2,0)$: $-x-2y+3z+D=0$ con $-1-4+D=0$, luego $D=5$. Cambiando de signo toda la ecuación:

**$x+2y-3z-5=0$.**

(Comprobación: $B$: $3+2-5=0$.)

@@ 7
**Sucesos y datos.** $E$ = expreso, $M$ = medio, $A$ = americano y $D$ = descafeinado: $P(E)=0{,}29$, $P(M)=0{,}51$ y $P(A)=0{,}20$. Si el café lleva cafeína con probabilidad $18\,\%$, $31\,\%$ y $11\,\%$, entonces $P(D|E)=0{,}82$, $P(D|M)=0{,}69$ y $P(D|A)=0{,}89$.

**a) Expreso descafeinado.**
1. Regla del producto: $P(E\cap D)=P(E)\cdot P(D|E)=0{,}29\cdot0{,}82=\mathbf{0{,}2378}$.

**b) Probabilidad a posteriori (Bayes).**
1. Probabilidad total de descafeinado:
$$P(D)=0{,}2378+0{,}51\cdot0{,}69+0{,}2\cdot0{,}89=0{,}2378+0{,}3519+0{,}178=0{,}7677.$$
2. Teorema de Bayes:
$$P(E|D)=\frac{0{,}2378}{0{,}7677}=\mathbf{0{,}3098}.$$

*Interpretación:* entre los cafés descafeinados, algo menos de un tercio son expresos.
