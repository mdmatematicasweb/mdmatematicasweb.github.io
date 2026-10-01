@@ 1
**a)** Como $-(t-4)^2\le0$, se tiene $0<e^{-(t-4)^2}\le1$, luego $7<f(t)\le8$: la producción está siempre entre 7 y 8 m$^3$. El máximo, 8 m$^3$, se alcanza en $t=4$ s. **Nunca llega a ser exactamente 7**, porque $e^{-(t-4)^2}>0$ siempre (no se anula para ningún $t$).

**b)** $\displaystyle\lim_{t\to\infty}f(t)=7+\lim_{t\to\infty}e^{-(t-4)^2}=7+0$. **Se estabiliza en 7 m$^3$.**

@@ 2
**a)** El plano es el mediador de $PQ$: normal $\overrightarrow{PQ}=(2,4,-2)\parallel(1,2,-1)$ y pasa por el punto medio $M(5,0,2)$:
$x+2y-z+D=0$, con $5-2+D=0\Rightarrow D=-3$.

**Plano: $x+2y-z-3=0$.**

**b)** Dirección de la recta: $(1,2,-1)$; normal del plano: $(2,1,1)$.
$\operatorname{sen}\alpha=\dfrac{|2+2-1|}{\sqrt6\sqrt6}=\dfrac12$.

**$\alpha=30^\circ$.**

@@ 3.1
Para $x\le\tfrac12$: $x^2-1<0$, luego $f(x)=2(1-x^2)$.
- Continuidad en $\tfrac12$: $2\left(1-\tfrac14\right)=\tfrac32=\tfrac a4+\tfrac b2\Rightarrow a+2b=6$.
- Derivabilidad: $f'(x)=-4x\to-2$ por la izquierda; $f'(x)=2ax+b\to a+b$ por la derecha. $a+b=-2$.

Resolviendo el sistema: $b=8$.

**$a=-10$, $b=8$.**

@@ 3.2
**a)** En $[0,2]$, $f(x)=\dfrac{x}{x+1}=1-\dfrac{1}{x+1}$:
$\displaystyle\int_0^2f=\big[x-\ln(x+1)\big]_0^2$.

**$2-\ln3$.**

**b)** $f(-x)=\dfrac{-x}{|x|+1}=-f(x)$: $f$ es **impar** (simétrica respecto al origen). Por tanto $\displaystyle\int_{-2}^2f(x)\,dx=\mathbf{0}$.

@@ 4.1
$X-2C=B^t+XA\Rightarrow X(I-A)=B^t+2C\Rightarrow X=(B^t+2C)(I-A)^{-1}$ (con $I-A$ invertible, $|I-A|=1\ne0$).

$B^t+2C=(1,\ 10,\ 7)$ y $I-A=\begin{pmatrix}0&0&-1\\1&-1&0\\0&-1&0\end{pmatrix}$.

**$X=\begin{pmatrix}-7&1&-11\end{pmatrix}$.** (Comprobado: $X-2C-B^t-XA=0$.)

@@ 4.2
Total: 120. Cada estudiante cursa un solo idioma.

**a)** Clase A: 40 estudiantes (todos). Francés fuera de la clase A: $20+5+0=25$. Entonces $P(A\cup F)=\dfrac{40+25}{120}$.

**$P=\dfrac{65}{120}=\dfrac{13}{24}\approx0{,}542$.**

**b)** Estudiantes de inglés: $30+15+20+20=85$; de ellos, en la clase C: 20.

**$P(C\mid I)=\dfrac{20}{85}=\dfrac{4}{17}\approx0{,}235$.**
