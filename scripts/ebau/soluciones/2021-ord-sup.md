@@ 1
1. **Puntos de cambio.** $f$ es continua; solo hay que vigilar $x=0$ y $x=1$.
2. **Continuidad en $x=0$.** Por la izquierda, $\displaystyle\lim_{x\to0^-}\frac{\ln(e^x+x^3)}{x}$ es del tipo $\frac00$. Como $\ln(e^x+x^3)=x+O(x^3)$, este límite vale $1$ (o por L'Hôpital: $\dfrac{e^x+3x^2}{e^x+x^3}\to1$).
3. Por la derecha, $f(0)=a$. Igualando, **$a=1$**.
4. **Continuidad en $x=1$.** Por la izquierda, $4\cdot1^2+a=5$; por la derecha, $b+\operatorname{sen}\pi=b$. Igualando, **$b=5$**.

**$a=1,\ b=5$**

@@ 2
**a) Asíntotas.**
1. Verticales: el denominador $e^{2x}+1$ nunca se anula, luego no hay.
2. Horizontales: $\displaystyle\lim_{x\to+\infty}f=1$ (el término $e^{2x}$ domina) y $\displaystyle\lim_{x\to-\infty}f=\frac{-1}{1}=-1$ (porque $e^{2x}\to0$).
3. Oblicuas: no hay, porque existe horizontal en los dos lados.

**Asíntotas horizontales: $y=1$ (en $+\infty$) e $y=-1$ (en $-\infty$)**; no hay verticales ni oblicuas.

**b) Crecimiento y decrecimiento.**
1. Derivada del cociente: $f'(x)=\dfrac{2e^{2x}(e^{2x}+1)-2e^{2x}(e^{2x}-1)}{(e^{2x}+1)^2}=\dfrac{4e^{2x}}{(e^{2x}+1)^2}$.
2. Numerador y denominador son positivos para todo $x$, luego $f'>0$.

**$f$ es estrictamente creciente en todo $\mathbb{R}$.**

@@ 3
1. **Reducir la potencia.** Con $\operatorname{sen}^2x=\dfrac{1-\cos2x}{2}$ y $\cos^2x=\dfrac{1+\cos2x}{2}$: $2\operatorname{sen}^2x-\cos^2x=(1-\cos2x)-\dfrac{1+\cos2x}{2}=\dfrac12-\dfrac32\cos2x$.
2. **Primitiva.** $\displaystyle\int\left(\tfrac12-\tfrac32\cos2x\right)dx=\tfrac x2-\tfrac34\operatorname{sen}2x$.
3. **Barrow.**
$$\int_0^{\pi/2}\left(\tfrac12-\tfrac32\cos2x\right)dx=\left[\tfrac x2-\tfrac34\operatorname{sen}2x\right]_0^{\pi/2}=\frac\pi4.$$

**$\dfrac\pi4$**

@@ 4
**a) Cortes y recinto.**
1. Se separa el valor absoluto. Para $x\ge0$: $x-2=4-x^2\Rightarrow x^2+x-6=0\Rightarrow x=2$.
2. Para $x<0$: $-x-2=4-x^2\Rightarrow x^2-x-6=0\Rightarrow x=-2$.
3. Las otras raíces de cada ecuación ($x=-3$ y $x=3$) no están en su rama.

![Recinto entre f(x)=|x|−2 y g(x)=4−x², con cortes en (−2,0) y (2,0)](fig/2021-ord-sup-e4.svg){fig-alt="Recinto entre f(x)=|x|−2 y g(x)=4−x², con cortes en (−2,0) y (2,0)" width="75%" fig-align="center"}

**Puntos de corte: $(-2,0)$ y $(2,0)$.** El recinto está limitado por arriba por la parábola $g(x)=4-x^2$ (vértice $(0,4)$) y por abajo por la «V» $f(x)=|x|-2$ (vértice $(0,-2)$), entre $x=-2$ y $x=2$.

**b) Área.**
1. La figura es simétrica respecto del eje $Y$: el área es el doble de la de $[0,2]$.
2. En $[0,2]$ la función de arriba es $g$ y la de abajo es $f(x)=x-2$.
3. Barrow:

$$A=2\int_0^2\bigl[(4-x^2)-(x-2)\bigr]dx=2\int_0^2(6-x-x^2)\,dx=2\left[6x-\tfrac{x^2}{2}-\tfrac{x^3}{3}\right]_0^2=2\cdot\tfrac{22}{3}.$$

**$A=\dfrac{44}{3}\ \text{u}^2$**

@@ 5
**a) Rango de $A-\lambda I$.**
1. Determinante: $|A-\lambda I|=-(\lambda-1)(\lambda-3)(\lambda-4)$.
2. Se anula en $\lambda=1,3,4$.
3. Casos:
   - $\lambda\neq1,3,4$: $\operatorname{rg}(A-\lambda I)=3$.
   - $\lambda=1,\ 3$ o $4$: $\operatorname{rg}(A-\lambda I)=2$ (el determinante es nulo y hay un menor de orden 2 no nulo).

**b) Sistema homogéneo.**
1. $A-I=\begin{pmatrix}1&0&2\\-1&1&1\\0&1&3\end{pmatrix}$, de rango $2$ (caso $\lambda=1$): el sistema tiene infinitas soluciones.
2. De $x+2z=0$ y $-x+y+z=0$ (la tercera ecuación es combinación de las dos): $x=-2z$, $y=-3z$.
3. Con $z=\lambda$ como parámetro: $(x,y,z)=(-2\lambda,-3\lambda,\lambda)$.

**Soluciones: $(x,y,z)=(-2\lambda,-3\lambda,\lambda)$.**

4. Con $x=2$: $-2\lambda=2\Rightarrow\lambda=-1$.

**Solución con $x=2$: $(2,3,-1)$.**

@@ 6
**Dimensiones.** $A$ es $2\times3$ y $B$ es $3\times2$, luego $AB$ es $2\times2$ y $BA$ es $3\times3$.

**a) $AB$ sin inversa.**
1. $AB=\begin{pmatrix}1&-1\\1+m&2m\end{pmatrix}$.
2. $|AB|=2m+(1+m)=3m+1$. No tiene inversa si el determinante es $0$.

**$AB$ no tiene inversa si $m=-\dfrac13$.**

**b) Rango de $BA$.**
1. $BA=\begin{pmatrix}2&m-1&1\\2&2m&2\\m-1&-2m&-1\end{pmatrix}$.
2. Desarrollando, $|BA|=0$ para todo $m$. Es lógico: $BA$ es $3\times3$ pero $\operatorname{rg}(BA)\le\operatorname{rg}(A)\le2$.
3. Un menor de orden $2$ no nulo: filas 1.ª y 2.ª y columnas 1.ª y 3.ª, $\begin{vmatrix}2&1\\2&2\end{vmatrix}=2\neq0$, sin depender de $m$.

**$\operatorname{rg}(BA)=2$ para todo $m\in\mathbb{R}$.**

@@ 7
**Datos.** $r$: punto $R(2,-1,3)$, dirección $\vec u=(3,2,1)$. $s$: de $y=2x-2$ y $z=3-x$, con $x=\mu$: punto $(0,-2,3)$, dirección $\vec v=(1,2,-1)$.

**a) Plano que contiene a $r$ y es paralelo a $s$.**
1. Contiene a $r$ y es paralelo a $s$: sus vectores directores son $\vec u$ y $\vec v$.
2. Normal: $\vec u\times\vec v=(-4,4,4)\parallel(1,-1,-1)$.
3. Plano $x-y-z+k=0$ por $R(2,-1,3)$: $2+1-3+k=0\Rightarrow k=0$.

**$x-y-z=0$**

**b) Ningún plano perpendicular a $s$ contiene a $r$.**
1. Un plano perpendicular a $s$ tiene normal $\vec v$.
2. Contendría a $r$ solo si $\vec u\cdot\vec v=0$ (la dirección de $r$ debe ser perpendicular a la normal).
3. Pero $\vec u\cdot\vec v=3+4-1=6\neq0$, luego $r$ no es paralela a ningún plano de normal $\vec v$, y por tanto ninguno la contiene.

@@ 8
**Vectores.** $\overrightarrow{AB}=(-3,2,-6)$, $\overrightarrow{AC}=(-11,-1,-3)$.

**a) Área del triángulo.**
1. Producto vectorial: $\overrightarrow{AB}\times\overrightarrow{AC}=(-12,57,25)$.
2. Módulo: $\sqrt{144+3249+625}=\sqrt{4018}=7\sqrt{82}$.
3. El área del triángulo es la mitad del módulo.

**Área $=\dfrac{7\sqrt{82}}{2}\approx31{,}7\ \text{u}^2$**

**b) Plano que equidista de $A$ y $B$.**
1. Es el plano mediador del segmento $AB$: perpendicular a $AB$ por su punto medio.
2. Normal: $\overrightarrow{AB}\parallel(3,-2,6)$.
3. Punto medio: $M\left(-\tfrac12,3,0\right)$.
4. Plano $3x-2y+6z+k=0$ por $M$: $-\tfrac32-6+k=0\Rightarrow k=\tfrac{15}2$.

**$6x-4y+12z+15=0$**
