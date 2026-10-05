@@ 1
**a) Valores de $a$ y $b$.**
1. $f$ es continua (dato), así que los trozos empalman en $x=0$ y en $x=2$.
2. En $x=0$: por la izquierda $f(0)=0^2+2=2$ y por la derecha $\sqrt{b}$. Luego $\sqrt{b}=2\Rightarrow b=4$.
3. En $x=2$: por la derecha $-\dfrac{2}{2\sqrt2}+\dfrac{3}{\sqrt2}=\dfrac{-1+3}{\sqrt2}=\sqrt2$ y por la izquierda $\sqrt{2a+b}=\sqrt{2a+4}$. Igualando, $\sqrt{2a+4}=\sqrt2\Rightarrow2a+4=2$, de donde $a=-1$.

**$a=-1$, $b=4$.**

**b) Derivada en $x=2$ y tangente.**
1. Con esos valores, $f(x)=\sqrt{4-x}$ en $(0,2]$. Por la izquierda: $f'(x)=\dfrac{-1}{2\sqrt{4-x}}$, luego $f'(2^-)=\dfrac{-1}{2\sqrt{4-2}}=-\dfrac{1}{2\sqrt2}$.
2. Por la derecha: la rama es una recta de pendiente $-\dfrac{1}{2\sqrt2}$, luego $f'(2^+)=-\dfrac{1}{2\sqrt2}$.
3. Las derivadas laterales coinciden, así que existe $f'(2)=-\dfrac{1}{2\sqrt2}$. Además $f(2)=\sqrt2$.
4. Recta tangente: $y-f(2)=f'(2)(x-2)$.

**Sí existe; tangente: $y=\sqrt2-\dfrac{1}{2\sqrt2}(x-2)$.**

@@ 2
**Derivadas.**
1. $f'(x)=\dfrac{2x}{x^2+1}$ (la derivada de $\ln u$ es $\dfrac{u'}{u}$).
2. $f''(x)=\dfrac{2(x^2+1)-2x\cdot2x}{(x^2+1)^2}=\dfrac{2(1-x^2)}{(x^2+1)^2}$.

**a) Crecimiento y decrecimiento.**
1. El denominador $x^2+1$ es siempre positivo, así que el signo de $f'$ es el de $2x$.
2. $f'<0$ si $x<0$ y $f'>0$ si $x>0$. (Hay un mínimo en $x=0$, con $f(0)=0$.)

**Decreciente en $(-\infty,0)$; creciente en $(0,+\infty)$.**

**b) Curvatura e inflexión.**
1. El denominador $(x^2+1)^2$ es positivo, así que el signo de $f''$ es el de $1-x^2$.
2. $f''=0$ en $x=\pm1$. $f''>0$ si $|x|<1$ y $f''<0$ si $|x|>1$.
3. Como $f''$ cambia de signo en $x=\pm1$, hay puntos de inflexión; $f(\pm1)=\ln2$.

**Convexa en $(-1,1)$; cóncava en $(-\infty,-1)\cup(1,+\infty)$; puntos de inflexión en $(-1,\ln2)$ y $(1,\ln2)$.**

@@ 3
1. Por el teorema fundamental del cálculo, $F'(x)=2x\cos x$ en $[0,2\pi]$.

**a) Crecimiento y decrecimiento.**
1. En $(0,2\pi)$ se tiene $2x>0$, así que el signo de $F'$ es el de $\cos x$.
2. $\cos x=0$ en $x=\tfrac\pi2$ y $x=\tfrac{3\pi}2$. Positivo en $\left(0,\tfrac\pi2\right)$ y $\left(\tfrac{3\pi}{2},2\pi\right)$; negativo en $\left(\tfrac\pi2,\tfrac{3\pi}2\right)$.

**$F$ crece en $\left(0,\tfrac\pi2\right)\cup\left(\tfrac{3\pi}2,2\pi\right)$ y decrece en $\left(\tfrac\pi2,\tfrac{3\pi}2\right)$.**

**b) Recta tangente en $x=\pi$.**
1. Pendiente: $F'(\pi)=2\pi\cos\pi=-2\pi$.
2. Ordenada: se calcula la integral por partes ($u=2t$, $dv=\cos t\,dt$): una primitiva es $2t\operatorname{sen}t+2\cos t$, así que $F(\pi)=\left[2t\operatorname{sen}t+2\cos t\right]_0^\pi=(0-2)-(0+2)=-4$.
3. Tangente: $y-F(\pi)=F'(\pi)(x-\pi)$.

**Tangente: $y=-4-2\pi(x-\pi)$, es decir, $y=-2\pi x+2\pi^2-4$.**

@@ 4
**Integración por partes.**
1. Se elige $u=\operatorname{arctg}x$ (que al derivar se simplifica) y $dv=x\,dx$, con $du=\dfrac{dx}{1+x^2}$ y $v=\dfrac{x^2}{2}$.
2. Se aplica $\int u\,dv=uv-\int v\,du$:
$$\int_0^1x\operatorname{arctg}x\,dx=\left[\tfrac{x^2}{2}\operatorname{arctg}x\right]_0^1-\frac12\int_0^1\frac{x^2}{1+x^2}\,dx=\frac\pi8-\frac12\int_0^1\frac{x^2}{1+x^2}\,dx.$$
3. En la integral restante se escribe $\dfrac{x^2}{1+x^2}=1-\dfrac{1}{1+x^2}$, y queda $\displaystyle\int_0^1\frac{x^2}{1+x^2}\,dx=\big[x-\operatorname{arctg}x\big]_0^1=1-\dfrac\pi4$:
$$\frac\pi8-\frac12\big[x-\operatorname{arctg}x\big]_0^1=\frac\pi8-\frac12\left(1-\frac\pi4\right).$$

**$\dfrac\pi4-\dfrac12$.**

@@ 5
**a) Discusión según $m$.**
1. Determinante de la matriz de coeficientes: $|A|=\begin{vmatrix}2&3&m\\1&m&-1\\3&1&-3\end{vmatrix}=-(m+2)(3m-1)$.
2. Se anula en $m=-2$ y $m=\tfrac13$. Se aplica el teorema de Rouché-Frobenius ($A^*$ es la ampliada).
3. Si $m\neq-2,\tfrac13$: $\operatorname{rg}A=\operatorname{rg}A^*=3$: compatible determinado (SCD).
4. Si $m=-2$: $\operatorname{rg}A=\operatorname{rg}A^*=2<3$: compatible indeterminado (SCI).
5. Si $m=\tfrac13$: $\operatorname{rg}A=2$ y $\operatorname{rg}A^*=3$: incompatible (SI).

**SCD si $m\neq-2,\tfrac13$; SCI si $m=-2$; SI si $m=\tfrac13$.**

**b) Valor de $y_0$ para $m=-2$.**
1. El sistema es $2x+3y-2z=3$, $x-2y-z=-1$, $3x+y-3z=2$ y es SCI: tiene infinitas soluciones con un parámetro.
2. Resolviéndolo, las soluciones son $x=z+\tfrac37$, $y=\tfrac57$ (la tercera ecuación es combinación de las otras dos).
3. Con $z=\lambda-\tfrac37$ se tiene $x=\lambda$, que es justo la forma pedida. Entonces $y$ es constante.

**$y_0=\dfrac57$.**

@@ 6
**a) Condición $A^{-1}=\tfrac14A$.**
1. Multiplicando por $A$: $A^{-1}=\tfrac14A\iff I=\tfrac14A^2\iff A^2=4I$.
2. Se calcula $A^2=\begin{pmatrix}a^2+3a&3-3a\\a-a^2&3a+1\end{pmatrix}$.
3. Igualando a $4I$, la entrada $(1,2)$ exige $3-3a=0\Rightarrow a=1$.
4. Comprobación con $a=1$: $a^2+3a=4$, $a-a^2=0$ y $3a+1=4$ ✓, luego $A^2=4I$ se cumple.

**$a=1$.**

**b) Ecuación $AX=B^t$ para $a=1$.**
1. $A=\begin{pmatrix}-1&3\\1&1\end{pmatrix}$ y $|A|=-4\neq0$, así que existe $A^{-1}$.
2. Se multiplica por $A^{-1}$ por la izquierda: $X=A^{-1}B^t$.
3. Por el apartado anterior, $A^{-1}=\tfrac14A$ (para $a=1$): $X=\tfrac14A\,B^t$, con $B^t=\begin{pmatrix}1&3&1\\-1&4&2\end{pmatrix}$.
4. Se calcula el producto:

**$X=\begin{pmatrix}-1&\tfrac94&\tfrac54\\0&\tfrac74&\tfrac34\end{pmatrix}$.**

@@ 7
**Datos.** $r$ pasa por $(0,1,0)$ con dirección $\vec d=(1,-1,0)$. La normal de $\pi$ es $\vec n=(1,1,1)$.

**a) Plano perpendicular a $\pi$ que contiene a $r$.**
1. El plano buscado contiene la dirección $\vec d$ de $r$ y es perpendicular a $\pi$, luego contiene también a la normal $\vec n$ de $\pi$.
2. Su normal es $\vec d\times\vec n=(-1,-1,2)$, proporcional a $(1,1,-2)$.
3. Pasa por $(0,1,0)$: $x+(y-1)-2z=0$.

**$x+y-2z-1=0$.**

**b) Distancia entre $r$ y $\pi$.**
1. $\vec d\cdot\vec n=1-1+0=0$: la recta es paralela al plano, o está contenida en él.
2. El punto $(0,1,0)$ no cumple $x+y+z=0$ ($0+1+0=1\neq0$), así que no está contenida: $r$ es paralela a $\pi$.
3. La distancia es la de cualquier punto de $r$ al plano:
$$d\big((0,1,0),\pi\big)=\dfrac{|0+1+0|}{\sqrt{1+1+1}}.$$

**$d=\dfrac{\sqrt3}{3}$.**

@@ 8
**Datos.** $r$ en paramétricas: $(1+t,\,2t,\,-1+5t)$, con dirección $\vec d=(1,2,5)$.

**a) Puntos de $r$ equidistantes de los planos.**
1. Distancia a $\pi_1$ ($2x+y+z-3=0$, con $\sqrt{4+1+1}=\sqrt6$): $d_1=\dfrac{|2(1+t)+2t-1+5t-3|}{\sqrt6}=\dfrac{|9t-2|}{\sqrt6}$.
2. Distancia a $\pi_2$ ($x+2y-z+5=0$, con $\sqrt{1+4+1}=\sqrt6$): $d_2=\dfrac{|(1+t)+4t-(-1+5t)+5|}{\sqrt6}=\dfrac{7}{\sqrt6}$ (todos los términos con $t$ se cancelan: $r$ es paralela a $\pi_2$).
3. Se igualan: $|9t-2|=7$.
4. Si $9t-2=7$: $t=1$. Si $9t-2=-7$: $t=-\tfrac59$.
5. Se sustituye en $(1+t,2t,-1+5t)$.

**Puntos: $(2,2,4)$ y $\left(\tfrac49,-\tfrac{10}9,-\tfrac{34}9\right)$.**

**b) Seno del ángulo entre $\pi_1$ y $r$.**
1. El seno del ángulo entre un plano y una recta usa la normal $\vec n_1=(2,1,1)$ y la dirección $\vec d=(1,2,5)$:
$$\operatorname{sen}\alpha=\dfrac{|\vec n_1\cdot\vec d|}{|\vec n_1||\vec d|}=\dfrac{|(2,1,1)\cdot(1,2,5)|}{\sqrt6\sqrt{30}}=\dfrac{9}{6\sqrt5}.$$
2. Se racionaliza: $\dfrac{9}{6\sqrt5}=\dfrac{3}{2\sqrt5}=\dfrac{3\sqrt5}{10}$.

**$\operatorname{sen}\alpha=\dfrac{3\sqrt5}{10}$.**
