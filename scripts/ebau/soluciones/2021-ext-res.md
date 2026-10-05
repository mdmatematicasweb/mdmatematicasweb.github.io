@@ 1
1. **Condiciones.** Hay cuatro parámetros y cuatro datos, uno por ecuación.
2. **Punto de inflexión en $(0,4)$.** Está en la gráfica: $f(0)=4\Rightarrow d=4$. Y la segunda derivada se anula: $f''(x)=6ax+2b$, luego $f''(0)=2b=0\Rightarrow b=0$.
3. **Normal en $(1,8)$.** Una normal paralela al eje de ordenadas es vertical, así que la tangente es horizontal: $f'(1)=3a+c=0$.
4. **Punto $(1,8)$ en la gráfica.** $f(1)=a+c+4=8\Rightarrow a+c=4$.
5. **Sistema.** De $3a+c=0$ y $a+c=4$ se obtiene $a=-2$ y $c=6$.

**$a=-2,\; b=0,\; c=6,\; d=4$**, es decir, $f(x)=-2x^3+6x+4$.

@@ 2
**Previo.** El denominador se factoriza: $f(x)=\dfrac{x^2-10}{(x+3)(x-1)}$.

**a) Asíntotas.**
1. Verticales: el denominador se anula en $x=-3$ y $x=1$, y el numerador no ($9-10=-1$ y $1-10=-9$). Luego $\displaystyle\lim_{x\to-3}f=\pm\infty$ y $\displaystyle\lim_{x\to1}f=\pm\infty$.
2. Horizontal: numerador y denominador tienen el mismo grado y los coeficientes principales son $1$, luego $\displaystyle\lim_{x\to\pm\infty}f(x)=1$.
3. Como hay horizontal en los dos lados, no hay oblicuas.

**Asíntotas verticales $x=-3$ y $x=1$; asíntota horizontal $y=1$** (en ambos lados).

**b) Crecimiento y decrecimiento.**
1. Derivada: $f'(x)=\dfrac{2(x+2)(x+5)}{(x-1)^2(x+3)^2}$. El denominador es positivo, así que el signo es el de $(x+2)(x+5)$.
2. Se anula en $x=-5$ y $x=-2$ (los puntos $x=-3$ y $x=1$ no están en el dominio).
3. Signo: $f'>0$ si $x<-5$, $f'<0$ en $(-5,-2)$ y $f'>0$ si $x>-2$.

**Crece en $(-\infty,-5)$, en $(-2,1)$ y en $(1,+\infty)$; decrece en $(-5,-3)$ y en $(-3,-2)$.** Máximo relativo en $x=-5$ y mínimo relativo en $x=-2$.

@@ 3
**a) Tangente por el origen.**
1. Tangente en $x=a$: $y-e^a=e^a(x-a)$ (porque $f'(x)=e^x$).
2. Pasa por el origen $(0,0)$: $-e^a=-ae^a$.
3. Se divide entre $e^a\neq0$: $a=1$.

**$a=1$** (la tangente es $y=ex$).

**b) Área.**
1. Tangente en $x=1$: $y=ex$ (la misma del apartado anterior).
2. En $[0,1]$ se cumple $e^x\ge ex$ (la curva queda por encima de su tangente, porque $e^x$ es convexa), y el recinto está entre el eje de ordenadas $x=0$ y $x=1$.
3. Barrow:

$$A=\int_0^1(e^x-ex)\,dx=\left[e^x-\tfrac{e}{2}x^2\right]_0^1=e-\tfrac e2-1=\tfrac e2-1.$$

**$A=\dfrac e2-1\approx0{,}359\ \text{u}^2$**

@@ 4
1. **Signo del integrando.** $x^2-3x+2=(x-1)(x-2)$ es $\le0$ en $[1,2]$ y $\ge0$ en $[2,3]$.
2. **Dividir la integral.** En $[1,2]$ el valor absoluto cambia el signo; en $[2,3]$ no.
3. **Primitiva.** $F(x)=\frac{x^3}{3}-\frac{3x^2}{2}+2x$: $F(1)=\frac56$, $F(2)=\frac23$, $F(3)=\frac32$.
4. **Cálculo.**
$$\int_1^3|x^2-3x+2|\,dx=-\bigl(F(2)-F(1)\bigr)+\bigl(F(3)-F(2)\bigr)=\tfrac16+\tfrac56.$$

**Resultado: $1$**

@@ 5
**Dato.** $|A|=5$.

**a) $|2A^3|$.**
1. Para una matriz de orden $3$: $|kM|=k^3|M|$ y $|M^n|=|M|^n$.
2. $|2A^3|=2^3\,|A|^3=8\cdot125=$ **$1000$**.

**b) Los dos determinantes.**

*Primero:*
1. Las columnas son $(2a,2b,2c)$, $\left(-1,\tfrac12,-\tfrac12\right)$ y $(3,3,3)$.
2. Se saca factor $2$ de la columna 1, $-\frac12$ de la columna 2 (queda $(2,-1,1)$) y $3$ de la columna 3 (queda $(1,1,1)$).
3. Quedan las columnas de $A$: vale $2\cdot\left(-\tfrac12\right)\cdot3\,|A|=-3\cdot5=$ **$-15$**.

*Segundo:*
1. Las filas son $(a,b,c)$, $(a+4,b-2,c+2)$ y $(a+1,b+1,c+1)$.
2. Se resta la fila 1 a las otras dos (el determinante no cambia): $(a,b,c)$, $(4,-2,2)$, $(1,1,1)$.
3. La segunda fila es $2\cdot(2,-1,1)$: se saca el factor $2$ y quedan las filas de $A^t$, con $|A^t|=|A|$.
4. Vale $2\,|A|=$ **$10$**.

@@ 6
**Previo.** $|A|=\begin{vmatrix}1&m&m\\1&2m&m+1\\2&m&m\end{vmatrix}=-m(m-1)$, que se anula en $m=0$ y $m=1$.

**a) Discusión según $m$.**
1. $m\neq0,\ m\neq1$: $\operatorname{rg}A=\operatorname{rg}A^*=3$, sistema compatible determinado (SCD).
2. $m=0$: $\operatorname{rg}A=\operatorname{rg}A^*=2<3$, sistema compatible indeterminado (SCI).
3. $m=1$: $\operatorname{rg}A=\operatorname{rg}A^*=2<3$, SCI.

**b) Resolución para $m=1$.**
1. El sistema es $x+y+z=1$, $x+2y+2z=1$, $2x+y+z=2$.
2. Restando las dos primeras: $y+z=0$.
3. Sustituyendo en la primera: $x=1$.
4. Con $z=\lambda$ como parámetro: $y=-\lambda$.

**$(x,y,z)=(1,-\lambda,\lambda),\ \lambda\in\mathbb{R}$**

@@ 7
**Dato.** Normal de $\pi$: $\vec n=(2,-1,1)$, con $|\vec n|=\sqrt6$.

**a) Planos paralelos a distancia $\sqrt6$.**
1. Los planos paralelos a $\pi$ son $2x-y+z+k=0$.
2. Distancia a $\pi$ (que tiene $k=0$): $d=\dfrac{|k|}{\sqrt6}=\sqrt6\Rightarrow|k|=6\Rightarrow k=\pm6$.

**$2x-y+z+6=0$ y $2x-y+z-6=0$**

**b) Simétrico de $P$ respecto de $\pi$.**
1. Recta por $P$ perpendicular a $\pi$: $(1+2t,\,2-t,\,6+t)$.
2. Se corta con $\pi$: $2(1+2t)-(2-t)+(6+t)=6t+6=0\Rightarrow t=-1$.
3. Proyección de $P$ sobre $\pi$: $M(-1,3,5)$.
4. $M$ es el punto medio de $P$ y su simétrico, luego $P'=2M-P$:

**$P'=(-3,4,4)$**

@@ 8
**Dato.** Un punto genérico de $r$ es $R(-\lambda,\,1+2\lambda,\,-1+\lambda)$.

**a) Punto de $r$ equidistante de $B$ y $C$.**
1. Distancias al cuadrado: $|RB|^2=6\lambda^2+2\lambda+2$ y $|RC|^2=6\lambda^2+4\lambda+4$.
2. Se igualan: $2\lambda+2=4\lambda+4\Rightarrow\lambda=-1$.
3. Sustituyendo $\lambda=-1$ en $R$.

**Punto $(1,-1,-2)$** (para $\lambda=-1$).

**b) Área del triángulo $BCD$.**
1. Vectores: $\overrightarrow{BC}=(1,1,-2)$ y $\overrightarrow{BD}=(2,-1,-1)$.
2. Producto vectorial: $\overrightarrow{BC}\times\overrightarrow{BD}=(-3,-3,-3)$, de módulo $3\sqrt3$.
3. El área es la mitad del módulo.

**Área $=\dfrac{3\sqrt3}{2}\ \text{u}^2$**
