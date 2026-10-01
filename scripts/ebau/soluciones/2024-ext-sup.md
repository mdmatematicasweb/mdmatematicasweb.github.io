@@ 1
$f(x)=\ln g(x)$ con $g(x)=\dfrac{x^2+1}{x}=x+\dfrac1x>0$ en $(0,+\infty)$. Como $\ln$ es creciente, $f$ y $g$ tienen el mismo crecimiento.

$$f'(x)=\frac{g'(x)}{g(x)}=\frac{1-\frac1{x^2}}{x+\frac1x}=\frac{x^2-1}{x(x^2+1)}.$$

**a)** $f'<0$ en $(0,1)$ y $f'>0$ en $(1,+\infty)$: **decrece en $(0,1)$ y crece en $(1,+\infty)$.**

**b)** Mínimo relativo en $x=1$, con $f(1)=\ln2$. Como $\lim_{x\to0^+}f=+\infty$ y $\lim_{x\to+\infty}f=+\infty$, ese mínimo es absoluto. **Mínimo absoluto en $x=1$, valor $\ln2$; no hay máximo (ni relativo ni absoluto).**

@@ 2
Desarrollos en $x=0$: $\ln(1+x)-x\approx-\dfrac{x^2}2$, $e^x-1\approx x+\dfrac{x^2}2$, $1-\cos x\approx\dfrac{x^2}2$ y $\operatorname{sen}^2x\approx x^2$. El numerador es

$$bx+\frac{-a+b+1}{2}\,x^2+\cdots$$

Para que el límite sea finito hace falta que el término en $x$ se anule: $b=0$. Entonces el límite vale $\dfrac{-a+1}{2}=5\Rightarrow a=-9$.

$$\mathbf{a=-9,\quad b=0}$$

@@ 3
$f'(x)=\cos x\operatorname{sen}^2x$ (teorema fundamental del cálculo) y $f(x)=\dfrac{\operatorname{sen}^3x}{3}$.

En $x=\pi/4$: $f\!\left(\frac\pi4\right)=\dfrac{(\sqrt2/2)^3}{3}=\dfrac{\sqrt2}{12}$ y $f'\!\left(\frac\pi4\right)=\dfrac{\sqrt2}2\cdot\dfrac12=\dfrac{\sqrt2}{4}$.

**Tangente:** $y=\dfrac{\sqrt2}{12}+\dfrac{\sqrt2}{4}\left(x-\dfrac\pi4\right)$.

**Normal:** $y=\dfrac{\sqrt2}{12}-2\sqrt2\left(x-\dfrac\pi4\right)$ (pendiente $-1/f'=-4/\sqrt2=-2\sqrt2$).

@@ 4
Con $t=\sqrt{1+e^x}$: $e^x=t^2-1$, $dx=\dfrac{2t}{t^2-1}\,dt$ y $\sqrt{4+4e^x}=2t$.

$$\int\frac{dx}{\sqrt{4+4e^x}}=\int\frac{1}{2t}\cdot\frac{2t}{t^2-1}\,dt=\int\frac{dt}{t^2-1}=\frac12\ln\left|\frac{t-1}{t+1}\right|+C.$$

$$\mathbf{\frac12\ln\frac{\sqrt{1+e^x}-1}{\sqrt{1+e^x}+1}+C}$$

@@ 5
Determinante de los coeficientes: $|M|=-(a-1)(a-2)$.

**a)** Se anula en $a=1$ y $a=2$.

- $a=1$: $\operatorname{rg}(M)=\operatorname{rg}(M|N)=2<3$, **compatible indeterminado (SCI)**.
- $a=2$: $\operatorname{rg}(M)=2$ y $\operatorname{rg}(M|N)=3$, incompatible (SI).

**Resultado: SCI sólo para $a=1$.** (Para $a\ne1,2$ es compatible determinado.)

**b)** $a=0$ ($|M|=-2\neq0$, SCD): $\begin{cases}y+z=1\\x+2y-z=1\\x+y=0\end{cases}$. De la tercera $x=-y$; en la segunda $y-z=1$; con la primera, $y=1$, $z=0$.

$$\mathbf{(x,y,z)=(-1,1,0)}$$

@@ 6
**a)** $A^2=\begin{pmatrix}-5&18\\-12&19\end{pmatrix}$ y $(A+aI)^2=A^2+2aA+a^2I$.

Elemento $(1,2)$: $18+6a=0\Rightarrow a=-3$. Con $a=-3$ la diagonal es $-5-6+9=-2$ y $19-30+9=-2$, y los elementos fuera de la diagonal son $0$.

$$\mathbf{a=-3,\quad b=-2}$$

**b)** $MX=I-M^2\Rightarrow X=M^{-1}(I-M^2)$. Con $M^{-1}=\begin{pmatrix}-1&1\\1&0\end{pmatrix}$ y $I-M^2=\begin{pmatrix}0&-1\\-1&-1\end{pmatrix}$:

$$\mathbf{X=\begin{pmatrix}-1&0\\0&-1\end{pmatrix}=-I}$$

(comprobación: $-M+M^2=I$).

@@ 7
$\pi$ tiene normal $\vec n_\pi=(1,-1,0)$; $r$ pasa por $(1,0,2)$ con dirección $\vec d=(2,3,1)$.

**a)** El plano buscado contiene a $\vec d$ y a $\vec n_\pi$ (para ser perpendicular a $\pi$). Es posible porque $\vec d$ y $\vec n_\pi$ no son paralelos. Normal: $\vec d\times\vec n_\pi\parallel(-1,-1,5)$, es decir $(1,1,-5)$:

$$x+y-5z+D=0,\ \text{por }(1,0,2):\ D=9\ \Rightarrow\ \mathbf{x+y-5z+9=0}.$$

**b)** El origen está en $\pi$. La dirección debe ser perpendicular a $\vec d$ (por ser perpendicular a $r$) y a $\vec n_\pi$ (por estar contenida en $\pi$): $\vec n_\pi\times\vec d=(-1,-1,5)$.

$$\mathbf{(x,y,z)=\lambda(1,1,-5)}\ \ \text{es decir}\ \ x=y=-\frac z5.$$

@@ 8
$\overrightarrow{OA}=(a,-1,2)$, $\overrightarrow{OB}=(a,1,0)$, $\overrightarrow{OA}\times\overrightarrow{OB}=(-2,2a,2a)$.

**a)** Área $=\dfrac12\sqrt{4+8a^2}=3\Rightarrow 4+8a^2=36\Rightarrow a^2=4$:

$$\mathbf{a=2\ \text{ o }\ a=-2}.$$

**b)** Coplanarios: $\begin{vmatrix}a&-1&2\\a&1&0\\1&1&0\end{vmatrix}=2(a-1)=0$:

$$\mathbf{a=1}.$$
