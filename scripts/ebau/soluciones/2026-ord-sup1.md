@@ 1
**a) La producción está entre 7 y 8 m$^3$.**
1. El exponente cumple $-(t-4)^2\le0$ para todo $t$, con igualdad solo en $t=4$.
2. La exponencial de un número no positivo está entre $0$ (sin llegar a él) y $1$: $0<e^{-(t-4)^2}\le1$.
3. Sumando $7$: $7<f(t)\le8$. El máximo, 8 m$^3$, se alcanza en $t=4$ s.
4. Para que valiera $7$ habría que tener $e^{-(t-4)^2}=0$, y una exponencial nunca se anula.

**La producción varía siempre entre 7 y 8 m$^3$ y nunca llega a ser exactamente 7**, porque $e^{-(t-4)^2}>0$ siempre (no se anula para ningún $t$).

**b) Estabilización.**
1. Se calcula el límite cuando el tiempo crece: $-(t-4)^2\to-\infty$, luego $e^{-(t-4)^2}\to0$.
2. $\displaystyle\lim_{t\to\infty}f(t)=7+\lim_{t\to\infty}e^{-(t-4)^2}=7+0$.

**Se estabiliza en 7 m$^3$.**

*Interpretación:* tras el pico de 8 m$^3$ a los 4 s, la producción baja y se acerca a 7 m$^3$ sin llegar nunca a ese valor (la recta $y=7$ es una asíntota horizontal).

@@ 2
**a) Plano respecto del cual $P$ y $Q$ son simétricos.**
1. Es el plano mediador del segmento $PQ$: perpendicular a $PQ$ y que pasa por su punto medio.
2. Normal: $\overrightarrow{PQ}=(2,4,-2)\parallel(1,2,-1)$.
3. Punto medio: $M=\dfrac{P+Q}{2}=(5,0,2)$.
4. El plano es $x+2y-z+D=0$. Como contiene a $M$, $5-2+D=0\Rightarrow D=-3$.

**Plano: $x+2y-z-3=0$.**

**b) Ángulo entre la recta $PQ$ y el plano $2x+y+z-5=0$.**
1. Vector director de la recta: $(1,2,-1)$. Normal del plano: $(2,1,1)$.
2. El ángulo entre recta y plano se calcula con el seno (es el complementario del ángulo entre la recta y la normal):
$$\operatorname{sen}\alpha=\dfrac{|2+2-1|}{\sqrt6\sqrt6}=\dfrac12.$$
3. De $\operatorname{sen}\alpha=\tfrac12$ y $0^\circ\le\alpha\le90^\circ$ sale $\alpha=30^\circ$.

**$\alpha=30^\circ$.**

@@ 3.1
**Función sin valor absoluto cerca de $x=\tfrac12$.**
1. Para $x\le\tfrac12$: $x^2-1<0$, luego $|x^2-1|=1-x^2$ y $f(x)=2(1-x^2)$.

**Condiciones.**
1. Continuidad en $\tfrac12$: los dos trozos coinciden, $2\left(1-\tfrac14\right)=\tfrac32=\tfrac a4+\tfrac b2$, es decir $a+2b=6$.
2. Derivabilidad: las derivadas laterales coinciden. Por la izquierda, $f'(x)=-4x\to-2$; por la derecha, $f'(x)=2ax+b\to a+b$. Así $a+b=-2$.
3. Se resuelve el sistema $a+2b=6$, $a+b=-2$: restando, $b=8$ y entonces $a=-10$.

**$a=-10$, $b=8$.**

@@ 3.2
**a) Integral entre $0$ y $2$.**
1. En $[0,2]$, $|x|=x$ y $f(x)=\dfrac{x}{x+1}=1-\dfrac{1}{x+1}$.
2. Se integra y se aplica Barrow:
$$\int_0^2f=\big[x-\ln(x+1)\big]_0^2=(2-\ln3)-(0-\ln1).$$

**$2-\ln3$.**

**b) Simetría y integral entre $-2$ y $2$.**
1. $f(-x)=\dfrac{-x}{|-x|+1}=\dfrac{-x}{|x|+1}=-f(x)$: **$f$ es impar** (simétrica respecto al origen).
2. En un intervalo simétrico, el área de $0$ a $2$ (positiva) se compensa con la de $-2$ a $0$ (negativa).

Por tanto $\displaystyle\int_{-2}^2f(x)\,dx=\mathbf{0}$.

@@ 4.1
**Ecuación matricial.**
1. Se agrupan los términos con $X$: $X-2C=B^t+XA\Rightarrow X-XA=B^t+2C\Rightarrow X(I-A)=B^t+2C$.
2. Se multiplica por la derecha por $(I-A)^{-1}$ (la incógnita está a la izquierda): $X=(B^t+2C)(I-A)^{-1}$. Existe porque $|I-A|=1\ne0$.

**Matrices.**
1. $B^t+2C=(1,\ 10,\ 7)$ y $I-A=\begin{pmatrix}0&0&-1\\1&-1&0\\0&-1&0\end{pmatrix}$.
2. $(I-A)^{-1}=\begin{pmatrix}0&1&-1\\0&0&-1\\-1&0&0\end{pmatrix}$.
3. Producto:
$$X=(1,\ 10,\ 7)\begin{pmatrix}0&1&-1\\0&0&-1\\-1&0&0\end{pmatrix}.$$

**$X=\begin{pmatrix}-7&1&-11\end{pmatrix}$.** (Comprobado: $X-2C-B^t-XA=0$.)

@@ 4.2
**Datos.** Total: 120 estudiantes. Cada estudiante cursa un solo idioma (inglés o francés).

**a) Clase A o francés.**
1. Clase A: 40 estudiantes (todos cuentan).
2. Francés fuera de la clase A: $20+5+0=25$.
3. Casos favorables: $40+25=65$ (no se cuenta dos veces a los de la clase A que cursan francés).
4. $P(A\cup F)=\dfrac{40+25}{120}$.

**$P=\dfrac{65}{120}=\dfrac{13}{24}\approx0{,}542$.**

**b) Probabilidad condicionada.**
1. Estudiantes de inglés: $30+15+20+20=85$.
2. De ellos, en la clase C: $20$.
3. $P(C\mid I)=\dfrac{20}{85}$.

**$P(C\mid I)=\dfrac{20}{85}=\dfrac{4}{17}\approx0{,}235$.**

*Interpretación:* menos de uno de cada cuatro estudiantes de inglés es de la clase C.
