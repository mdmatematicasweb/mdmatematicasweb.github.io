@@ 1
**Planteamiento.** $f(x)=\ln g(x)$ con $g(x)=\dfrac{x^2+1}{x}=x+\dfrac1x>0$ en $(0,+\infty)$, así que $f$ está bien definida. Como $\ln$ es creciente, $f$ y $g$ tienen el mismo crecimiento.
1. Derivada: $f'(x)=\dfrac{g'(x)}{g(x)}=\dfrac{1-\frac1{x^2}}{x+\frac1x}=\dfrac{x^2-1}{x(x^2+1)}$.
2. El denominador $x(x^2+1)$ es positivo en el dominio, así que el signo lo da $x^2-1$, que se anula en $x=1$.

**a) Crecimiento y decrecimiento.**
1. $f'<0$ en $(0,1)$ y $f'>0$ en $(1,+\infty)$.

**Decrece en $(0,1)$ y crece en $(1,+\infty)$.**

**b) Extremos relativos y absolutos.**
1. $f'$ pasa de $-$ a $+$ en $x=1$: mínimo relativo, con $f(1)=\ln2$.
2. Límites en los extremos del dominio: $\lim_{x\to0^+}f=+\infty$ y $\lim_{x\to+\infty}f=+\infty$.
3. Como $f$ sube hacia $+\infty$ en ambos extremos, el mínimo relativo es absoluto, y no hay máximo.

**Mínimo absoluto en $x=1$, valor $\ln2$; no hay máximo (ni relativo ni absoluto).**

@@ 2
**Parámetros con un límite dado.**
1. Al sustituir $x=0$ el numerador y el denominador valen $0$: indeterminación $\dfrac00$. Se usan los desarrollos en $x=0$: $\ln(1+x)-x\approx-\dfrac{x^2}2$, $e^x-1\approx x+\dfrac{x^2}2$, $1-\cos x\approx\dfrac{x^2}2$ y $\operatorname{sen}^2x\approx x^2$.
2. El numerador es
$$bx+\frac{-a+b+1}{2}\,x^2+\cdots$$
3. Si $b\neq0$, el cociente se comporta como $\dfrac bx$ y el límite no sería finito. Hace falta que el término en $x$ se anule: $b=0$.
4. Con $b=0$, el cociente tiende al coeficiente de $x^2$ entre el del denominador ($1$): $\dfrac{-a+1}{2}=5\Rightarrow a=-9$.

$$\mathbf{a=-9,\quad b=0}$$

@@ 3
**Tangente y normal a una función definida por una integral.**
1. Teorema fundamental del cálculo: $f'(x)=\cos x\operatorname{sen}^2x$.
2. Además, la integral se puede calcular (cambio $u=\operatorname{sen}t$): $f(x)=\dfrac{\operatorname{sen}^3x}{3}$.
3. Punto: $f\!\left(\frac\pi4\right)=\dfrac{(\sqrt2/2)^3}{3}=\dfrac{\sqrt2}{12}$.
4. Pendiente de la tangente: $f'\!\left(\frac\pi4\right)=\dfrac{\sqrt2}2\cdot\dfrac12=\dfrac{\sqrt2}{4}$.
5. Pendiente de la normal: $-\dfrac1{f'}=-\dfrac4{\sqrt2}=-2\sqrt2$.

**Tangente:** $y=\dfrac{\sqrt2}{12}+\dfrac{\sqrt2}{4}\left(x-\dfrac\pi4\right)$.

**Normal:** $y=\dfrac{\sqrt2}{12}-2\sqrt2\left(x-\dfrac\pi4\right)$ (pendiente $-1/f'=-4/\sqrt2=-2\sqrt2$).

@@ 4
**Cambio de variable.**
1. Con $t=\sqrt{1+e^x}$: $e^x=t^2-1$, luego $e^x\,dx=2t\,dt$ y $dx=\dfrac{2t}{t^2-1}\,dt$.
2. Además $\sqrt{4+4e^x}=2\sqrt{1+e^x}=2t$.
3. La integral queda racional:
$$\int\frac{dx}{\sqrt{4+4e^x}}=\int\frac{1}{2t}\cdot\frac{2t}{t^2-1}\,dt=\int\frac{dt}{t^2-1}.$$
4. Fracciones simples: $\dfrac1{t^2-1}=\dfrac12\left(\dfrac1{t-1}-\dfrac1{t+1}\right)$, y se integra:
$$\int\frac{dt}{t^2-1}=\frac12\ln\left|\frac{t-1}{t+1}\right|+C.$$
5. Se deshace el cambio ($t=\sqrt{1+e^x}>1$, así que no hace falta el valor absoluto):

$$\mathbf{\frac12\ln\frac{\sqrt{1+e^x}-1}{\sqrt{1+e^x}+1}+C}$$

@@ 5
**Discusión.**
1. Determinante de la matriz de coeficientes: $|M|=-(a-1)(a-2)$.
2. Se anula en $a=1$ y $a=2$: son los valores críticos. Para cualquier otro $a$, $\operatorname{rg}(M)=3$ y el sistema es compatible determinado.

**a) Valor de $a$ para que sea compatible indeterminado.**
1. $a=1$: $\operatorname{rg}(M)=\operatorname{rg}(M|N)=2<3$, **compatible indeterminado (SCI)**.
2. $a=2$: $\operatorname{rg}(M)=2$ y $\operatorname{rg}(M|N)=3$, incompatible (SI).

**Resultado: SCI sólo para $a=1$.** (Para $a\ne1,2$ es compatible determinado.)

**b) Resolución para $a=0$.**
1. $|M|=-2\neq0$: compatible determinado, con solución única.
2. El sistema queda $\begin{cases}y+z=1\\x+2y-z=1\\x+y=0\end{cases}$.
3. De la tercera, $x=-y$. En la segunda: $-y+2y-z=y-z=1$.
4. Junto con la primera ($y+z=1$): sumando, $2y=2$, luego $y=1$ y $z=0$.

$$\mathbf{(x,y,z)=(-1,1,0)}$$

@@ 6
**a) Identidad $(A+aI)^2=bI$.**
1. $A^2=\begin{pmatrix}-5&18\\-12&19\end{pmatrix}$.
2. Desarrollo (como $I$ conmuta con $A$): $(A+aI)^2=A^2+2aA+a^2I$.
3. Elemento $(1,2)$, que debe ser $0$ porque $bI$ es diagonal: $18+6a=0\Rightarrow a=-3$.
4. Con $a=-3$ la diagonal es $-5-6+9=-2$ y $19-30+9=-2$, y los elementos fuera de la diagonal son $0$. Es $-2I$, luego $b=-2$.

$$\mathbf{a=-3,\quad b=-2}$$

**b) Ecuación $MX+M^2=I$.**
1. Se despeja: $MX=I-M^2\Rightarrow X=M^{-1}(I-M^2)$ (la inversa se multiplica por la izquierda; $|M|=-1\neq0$).
2. $M^{-1}=\begin{pmatrix}-1&1\\1&0\end{pmatrix}$ y $I-M^2=\begin{pmatrix}0&-1\\-1&-1\end{pmatrix}$.
3. Producto:

$$\mathbf{X=\begin{pmatrix}-1&0\\0&-1\end{pmatrix}=-I}$$

*Comprobación:* $-M+M^2=I$.

@@ 7
**Datos.** El plano $\pi$ tiene normal $\vec n_\pi=(1,-1,0)$; la recta $r$ pasa por $(1,0,2)$ con dirección $\vec d=(2,3,1)$.

**a) Plano perpendicular a $\pi$ que contiene a $r$.**
1. El plano buscado contiene a $\vec d$ (porque contiene a $r$) y a $\vec n_\pi$ (porque es perpendicular a $\pi$).
2. Es posible porque $\vec d$ y $\vec n_\pi$ no son paralelos.
3. Su normal es perpendicular a ambos: $\vec d\times\vec n_\pi=(1,1,-5)$.
4. Ecuación: $x+y-5z+D=0$. Pasa por $(1,0,2)$: $1+0-10+D=0\Rightarrow D=9$.

$$\mathbf{x+y-5z+9=0}$$

**b) Recta perpendicular a $r$, contenida en $\pi$, por el origen.**
1. El origen está en $\pi$ ($0-0=0$).
2. La dirección debe ser perpendicular a $\vec d$ (por ser perpendicular a $r$) y a $\vec n_\pi$ (por estar contenida en $\pi$): $\vec n_\pi\times\vec d=(-1,-1,5)$, que es proporcional a $(1,1,-5)$.

$$\mathbf{(x,y,z)=\lambda(1,1,-5)}\ \ \text{es decir}\ \ x=y=-\frac z5.$$

@@ 8
**Datos.** $\overrightarrow{OA}=(a,-1,2)$ y $\overrightarrow{OB}=(a,1,0)$, con $\overrightarrow{OA}\times\overrightarrow{OB}=(-2,2a,2a)$.

**a) Área $3$.**
1. Área del triángulo: $\tfrac12\,|\overrightarrow{OA}\times\overrightarrow{OB}|=\tfrac12\sqrt{4+8a^2}$.
2. Se iguala a $3$: $\sqrt{4+8a^2}=6\Rightarrow4+8a^2=36\Rightarrow a^2=4$.

$$\mathbf{a=2\ \text{ o }\ a=-2}.$$

**b) Coplanarios con $C(1,1,0)$.**
1. Cuatro puntos con $O$ en el origen son coplanarios si $\overrightarrow{OA}$, $\overrightarrow{OB}$ y $\overrightarrow{OC}$ lo son: producto mixto cero.
2. Determinante: $\begin{vmatrix}a&-1&2\\a&1&0\\1&1&0\end{vmatrix}=2(a-1)$ (se desarrolla por la tercera columna, que solo tiene el elemento $2$).
3. $2(a-1)=0$:

$$\mathbf{a=1}.$$
