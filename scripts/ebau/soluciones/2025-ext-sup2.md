@@ 1
**Datos.** $r$ pasa por $A(0,2,k)$ con $\vec u=(1,-1,2)$; $s$ pasa por $B(-2,-3,1)$ con $\vec v=(-1,2,1)$. Los vectores directores no son proporcionales.

**a) Valor de $k$ para que se corten.**
1. Dos rectas no paralelas se cortan si son coplanarias, es decir, si $\overrightarrow{AB}$, $\vec u$ y $\vec v$ tienen producto mixto nulo.
2. $\overrightarrow{AB}=(-2,-5,1-k)$.
3. Determinante:
$$\left|\begin{matrix}1&-1&2\\-1&2&1\\-2&-5&1-k\end{matrix}\right|=26-k.$$
4. Se anula si $26-k=0$.

**$k=26$.**

**b) Plano que contiene a $r$ y es paralelo a $s$** (con $k=0$).
1. El plano contiene a $r$ (dirección $\vec u$, punto $(0,2,0)$) y es paralelo a $s$ (dirección $\vec v$).
2. Su normal es $\vec u\times\vec v=(-5,-3,1)$, es decir, $5x+3y-z+D=0$ (normal opuesta).
3. Pasa por $(0,2,0)$: $6+D=0$, luego $D=-6$.

**Plano: $5x+3y-z-6=0$.**

@@ 2
**Planteamiento.** Se minimiza la distancia al punto $(2,0)$ desde los puntos de la trayectoria. Es más cómodo minimizar su cuadrado.
1. Un punto de la trayectoria es $(x,\sqrt{x+1})$, con $x\ge-1$.
2. El cuadrado de la distancia a $(2,0)$ es
$$d^2(x)=(x-2)^2+x+1.$$
3. Se deriva e iguala a $0$: $(d^2)'=2(x-2)+1=0\Rightarrow x=\tfrac32$.
4. Como $(d^2)''=2>0$, es un mínimo (en el extremo $x=-1$ la distancia es $3$, mayor que la hallada).
5. Punto: $y=\sqrt{\tfrac32+1}=\sqrt{\tfrac52}=\dfrac{\sqrt{10}}{2}$.
6. Distancia: $d=\sqrt{\tfrac14+\tfrac52}=\sqrt{\tfrac{11}{4}}$.

**Debe nadar hacia el punto $\left(\dfrac32,\dfrac{\sqrt{10}}{2}\right)$, a una distancia $d=\mathbf{\dfrac{\sqrt{11}}{2}}\approx1{,}66$.**

@@ 3
**a) Derivabilidad.**
1. Se quita el valor absoluto. Para $x\ge0$: $f(x)=\dfrac{1+x}{1-x}$ y $f'(x)=\dfrac{2}{(1-x)^2}$.
2. Para $x<0$: $f(x)=\dfrac{1-x}{1+x}$ y $f'(x)=\dfrac{-2}{(1+x)^2}$.
3. $f$ es continua en $0$ (ambos límites laterales valen $1$), pero $f'(0^+)=2\neq-2=f'(0^-)$.

**$f$ es derivable en $(-1,1)\setminus\{0\}$ y no es derivable en $x=0$.**

**b) Monotonía.**
1. $f'<0$ en $(-1,0)$ y $f'>0$ en $(0,1)$.

**Decrece en $(-1,0)$ y crece en $(0,1)$** (mínimo en $x=0$).

@@ 4
**a) Primer determinante.**
1. De la fila 2 se saca el factor $3$ y de la fila 3 el factor $2$; de la columna 3 se saca el factor $2$. En total, un factor $3\cdot2\cdot2=12$.
2. Queda el determinante de la matriz cuyas filas son $(a_{11},a_{31},a_{21})$, $(a_{12},a_{32},a_{22})$ y $(a_{13},a_{33},a_{23})$.
3. Es $M^t$ con las columnas 2 y 3 intercambiadas, así que su determinante es $-|M^t|=-|M|$.
4. Por tanto:
$$12\cdot(-|M|)=12\cdot5=\mathbf{60}.$$

**b) Segundo determinante.**
1. A la fila 1 le sumamos $3\cdot$ fila 3 (no cambia el determinante): queda $(2a_{11},\,2a_{12},\,4a_{13})$.
2. Se saca el factor $2$ de la fila 1 y el factor $2$ de la columna 3: aparece un factor $2\cdot2=4$ y queda $|M|$.
3. Entonces:
$$|\cdot|=4\cdot|M|=4\cdot(-5)=\mathbf{-20}.$$

@@ 5
**a) Valores de $a$ y $b$.**
1. Se calcula $A^2$:
$$A^2=\begin{pmatrix}a^2+3b&3a+3\\ab+b&3b+1\end{pmatrix}=\begin{pmatrix}4&0\\0&4\end{pmatrix}.$$
2. De $3b+1=4$ sale $b=1$; de $3a+3=0$ sale $a=-1$.
3. Se comprueba en los otros elementos: $a^2+3b=1+3=4$ y $ab+b=-1+1=0$.

**$a=-1$, $b=1$.**

**b) Matriz $X$.**
1. Con esos valores, $A^2=4I$, que es invertible, así que existe $(A^2)^{-1}=\tfrac14I$.
2. Se despeja: $X=(A^2)^{-1}B^t=\tfrac14B^t$.
3. $B^t=\begin{pmatrix}1&-1&1\\1&2&1\end{pmatrix}$.

$$\mathbf{X}=\frac14\begin{pmatrix}1&-1&1\\1&2&1\end{pmatrix}=\begin{pmatrix}1/4&-1/4&1/4\\1/4&1/2&1/4\end{pmatrix}.$$

@@ 6
**a) Gráficas.**
1. $f=-e^x$ es creciente y negativa, y tiende a $0$ en $-\infty$.
2. $g=-e^{-x}$ es decreciente y negativa, y tiende a $0$ en $+\infty$.
3. Ambas pasan por $(0,-1)$ (único corte entre ellas) y quedan por debajo del eje $OX$ (asíntota $y=0$).
4. $g$ queda por encima de $f$ para $x>0$ y por debajo para $x<0$.

![Gráficas de f(x)=−eˣ y g(x)=−e⁻ˣ, simétricas respecto del eje Y y con asíntota y=0](fig/2025-ext-sup2-e6.svg){fig-alt="Gráficas de f(x)=−eˣ y g(x)=−e⁻ˣ, simétricas respecto del eje Y y con asíntota y=0" width="75%" fig-align="center"}

**b) Suma de las áreas.**
1. Las gráficas se cortan en $x=0$ y se piden dos recintos: entre $x=-1$ y $0$ y entre $0$ y $1$.
2. Son simétricos respecto del eje $OY$ (cada función es el reflejo de la otra), así que tienen la misma área.
3. En $[0,1]$, $g\ge f$ (pues $-e^{-x}\ge-e^{x}$ si $x\ge0$), luego el área es $\int_0^1(g-f)$ y la suma de las dos áreas es el doble:
$$A=2\int_0^1\big(-e^{-x}+e^{x}\big)dx=2\big[e^{x}+e^{-x}\big]_0^1=\mathbf{2\left(e+\dfrac1e-2\right)}\approx2{,}17\ u^2.$$

@@ 7
**a) Desviación típica.**
1. $P(X>230)=0{,}33\Rightarrow P(X\le230)=0{,}67$, es decir, $P\!\left(Z\le\dfrac{230-200}{\sigma}\right)=0{,}67$.
2. En la tabla, $\Phi(0{,}44)=0{,}6700$: $z=0{,}44$.
3. Se despeja: $\dfrac{30}{\sigma}=0{,}44\Rightarrow\sigma=\dfrac{30}{0{,}44}$.

**$\sigma\approx68{,}2$ g.**

**b) Porcentaje entre $160$ y $220$ g** ($\sigma=50$).
1. Se tipifican los extremos: $z_1=\dfrac{160-200}{50}=-0{,}8$ y $z_2=\dfrac{220-200}{50}=0{,}4$.
2. $P(160<X<220)=P(-0{,}8<Z<0{,}4)=\Phi(0{,}4)-\Phi(-0{,}8)$.
3. Por simetría, $\Phi(-0{,}8)=1-\Phi(0{,}8)=1-0{,}7881$:
$$P=0{,}6554-(1-0{,}7881)=0{,}4435.$$

**Aproximadamente el $44{,}35\,\%$ de las manzanas.**
