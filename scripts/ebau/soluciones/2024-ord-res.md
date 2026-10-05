@@ 1
**Derivadas previas.** $f(x)=(x^2+1)e^x$, definida en todo $\mathbb R$.
1. Primera derivada (producto): $f'(x)=(2x+x^2+1)e^x=(x+1)^2e^x$.
2. Segunda derivada: $f''(x)=(x+1)(x+3)e^x$.

**a) Crecimiento y decrecimiento.**
1. $e^x>0$ siempre y $(x+1)^2\ge0$, así que $f'(x)\ge0$ para todo $x$.
2. Solo se anula en $x=-1$.
3. Como $f'$ no cambia de signo, no hay extremo en $x=-1$.

**$f$ es creciente en todo $\mathbb{R}$** (nunca decrece; en $x=-1$ hay tangente horizontal sin extremo).

**b) Curvatura e inflexión.**
1. $f''=0$ en $x=-3$ y $x=-1$.
2. Signo de $f''$: $+$ en $(-\infty,-3)$, $-$ en $(-3,-1)$, $+$ en $(-1,+\infty)$.
3. Convexa donde $f''>0$ y cóncava donde $f''<0$. Hay inflexión donde $f''$ cambia de signo, en los dos puntos.
4. Ordenadas: $f(-3)=10e^{-3}$ y $f(-1)=2e^{-1}$.

**Convexa en $(-\infty,-3)\cup(-1,+\infty)$; cóncava en $(-3,-1)$.** Puntos de inflexión: **$\left(-3,\,10e^{-3}\right)$ y $\left(-1,\,2e^{-1}\right)$.**

@@ 2
**a) Parámetros $a$ y $b$.** $f$ es derivable, luego es continua y sus derivadas laterales coinciden en $x=0$.
1. Continuidad en $x=0$: $\lim_{x\to0^-}f=a\,e^0+b\ln1=a$ y $f(0)=0+\ln1=0$, así que $a=0$.
2. Derivada por la izquierda: $f'(x)=-a\,e^{-x}-\dfrac{b}{1-x}$, luego $f'(0^-)=-a-b$.
3. Derivada por la derecha: $f'(x)=1+\dfrac1{1+x}$, luego $f'(0^+)=1+\dfrac1{1+0}=2$.
4. Derivabilidad: $-a-b=2$. Con $a=0$, $b=-2$.

$$\mathbf{a=0,\quad b=-2}$$

**b) Tangente y normal en $x=0$.**
1. Punto: $f(0)=0$. Pendiente: $f'(0)=2$.
2. Tangente: $y-0=2(x-0)$.
3. Normal: pendiente $-\dfrac12$ (opuesta de la inversa), $y=-\dfrac12x$.

**Tangente: $y=2x$.  Normal: $y=-\dfrac x2$.**

@@ 3
**a) Cortes y esbozo.**
1. Se factoriza: $f(x)=x(x-2)(x-4)$.
2. **Cortes con el eje $OX$: $(0,0)$, $(2,0)$, $(4,0)$; con el eje $OY$: $(0,0)$** (porque $f(0)=0$).
3. Extremos: $f'(x)=3x^2-12x+8=0\Rightarrow x=2\pm\dfrac{2}{\sqrt3}$.
4. Forma: cúbica con $f\to-\infty$ a la izquierda y $+\infty$ a la derecha; $f>0$ en $(0,2)$ (máximo local en $x=2-\tfrac{2}{\sqrt3}\approx0{,}85$) y $f<0$ en $(2,4)$ (mínimo local en $x=2+\tfrac{2}{\sqrt3}\approx3{,}15$).

![Gráfica de f(x)=x³−6x²+8x con cortes en x=0, 2 y 4 y sus extremos relativos](fig/2024-ord-res-e3.svg){fig-alt="Gráfica de f(x)=x³−6x²+8x con cortes en x=0, 2 y 4 y sus extremos relativos" width="75%" fig-align="center"}

**b) Suma de las áreas.**
1. Hay dos recintos acotados: de $x=0$ a $x=2$ (sobre el eje) y de $x=2$ a $x=4$ (bajo el eje).
2. Primitiva: $F(x)=\dfrac{x^4}{4}-2x^3+4x^2$.
3. Barrow en cada tramo: $\int_0^2f=F(2)-F(0)=4$ y $\int_2^4f=F(4)-F(2)=0-4=-4$.
4. El área es siempre positiva, así que se toma el valor absoluto de cada tramo:

$$A=|4|+|-4|=\mathbf{8\ u^2}.$$

*Observación:* la integral de $0$ a $4$ vale $0$ (los dos recintos se compensan), pero el área total no.

@@ 4
**Cambio de variable.**
1. Con $t=e^x$: $dx=\dfrac{dt}{t}$.
2. La integral queda racional: $\displaystyle\int\frac{t^3-1}{t(t-3)}\,dt$.
3. Se divide (grado del numerador mayor): $\dfrac{t^3-1}{t(t-3)}=t+3+\dfrac{9t-1}{t(t-3)}$.
4. Fracciones simples: $\dfrac{9t-1}{t(t-3)}=\dfrac{1/3}{t}+\dfrac{26/3}{t-3}$.
5. Se integra y se deshace el cambio ($t=e^x$, $\ln t=x$):

$$\mathbf{\int\frac{e^{3x}-1}{e^x-3}\,dx=\frac{e^{2x}}2+3e^x+\frac x3+\frac{26}3\ln|e^x-3|+C}$$

@@ 5
**Datos.** $|A|=9$ y $|B|=-\dfrac19$, luego $|AB|=|A|\,|B|=-1$.

**a) Determinantes.**
1. Determinante de una inversa: $|M^{-1}|=\dfrac1{|M|}$, y de una potencia, $|M^n|=|M|^n$. Entonces
$\left|\big((AB)^5\big)^{-1}\right|=\dfrac1{|AB|^5}=\dfrac1{(-1)^5}=\mathbf{-1}$.
2. Para una matriz de orden $3$, $|kM|=k^3|M|$, así que $|27AB^6|=27^3\,|A|\,|B|^6$.
3. Con $27=3^3$: $27^3=3^9$, $|A|=9=3^2$ y $|B|^6=3^{-12}$:
$$|27AB^6|=3^9\cdot3^2\cdot3^{-12}=\mathbf{\dfrac13}.$$

**b) Ecuación $AXB=9I$.**
1. $|A|\neq0$ y $|B|\neq0$, así que ambas son invertibles.
2. Se multiplica por $A^{-1}$ por la izquierda y por $B^{-1}$ por la derecha: $X=9A^{-1}B^{-1}$ (existe y es única).
3. Se calcula el producto:

$$\mathbf{X=\begin{pmatrix}0&1&18\\0&1&-63\\9&0&-162\end{pmatrix}}$$

(comprobado: $AXB=9I$).

@@ 6
**a) Rango de $A$ según $a$.**
1. Determinante, desarrollando por la 2.ª columna (solo tiene un elemento no nulo, $3a-1$, en la posición $(3,2)$): $|A|=-(3a-1)(a-2)$.
2. Si $a\ne\frac13$ y $a\neq2$: $|A|\neq0$, luego $\operatorname{rg}(A)=3$.
3. Si $a=\frac13$ o $a=2$: $|A|=0$ y hay un menor de orden 2 no nulo, así que $\operatorname{rg}(A)=2$. Por ejemplo, $\begin{vmatrix}1&1\\2&a\end{vmatrix}=a-2\neq0$ con $a=\frac13$, y $\begin{vmatrix}1&0\\5&5\end{vmatrix}=5$ con $a=2$.

**$\operatorname{rg}(A)=3$ si $a\neq\frac13$ y $a\neq2$; $\operatorname{rg}(A)=2$ si $a=\frac13$ o $a=2$.**

**b) Sistema $AX=B$ con $a=2$.**
1. El sistema es $\begin{cases}x+z=1\\2x+2z=2\\5x+5y=4\end{cases}$.
2. La segunda ecuación es la primera multiplicada por 2: sobra. Queda compatible indeterminado con un parámetro.
3. Con $x=\lambda$: $z=1-x=1-\lambda$ y, de la tercera, $y=\dfrac45-x=\dfrac45-\lambda$.

$$\mathbf{(x,y,z)=\left(\lambda,\ \tfrac45-\lambda,\ 1-\lambda\right),\ \lambda\in\mathbb{R}}$$

@@ 7
**Datos.** La recta $r$ pasa por $(-1,2,3)$ con dirección $(2,2,-1)$ (de $\frac{x+1}2=\frac{y-2}2=\frac{z-3}{-1}$).
1. Punto genérico: $R(-1+2t,\,2+2t,\,3-t)$.
2. Vector desde $P$: $\overrightarrow{PR}=(2t-1,\,2t,\,7-t)$.

**a) Punto de $r$ más cercano a $P$.**
1. El punto más cercano es el pie de la perpendicular: $\overrightarrow{PR}$ perpendicular a la dirección de $r$.
2. $\overrightarrow{PR}\cdot(2,2,-1)=0$: $2(2t-1)+2\cdot2t-(7-t)=9t-9=0\Rightarrow t=1$.

$$\mathbf{R=(1,4,2)}\quad(\text{distancia }\sqrt{41}).$$

**b) Puntos a distancia $\sqrt{50}$.**
1. Se impone $|\overrightarrow{PR}|^2=50$: $(2t-1)^2+(2t)^2+(7-t)^2=9t^2-18t+50=50$.
2. $9t^2-18t=0\Rightarrow 9t(t-2)=0\Rightarrow t=0$ o $t=2$.

$$\mathbf{(-1,2,3)\ \text{ y }\ (3,6,1)}$$

@@ 8
**Datos.**
1. Vectores del plano $\pi_1$: $\overrightarrow{AB}=(0,1,-3)$ y $\overrightarrow{AC}=(-1,1,1)$.
2. Normal de $\pi_1$: $\overrightarrow{AB}\times\overrightarrow{AC}=(4,3,1)$. Normal de $\pi_2$: $(1,-1,1)$.

**Recta paralela a ambos planos por el origen.**
1. Una recta es paralela a un plano si su dirección es perpendicular a la normal del plano.
2. Para que lo sea a los dos, su dirección debe ser perpendicular a las dos normales: $(4,3,1)\times(1,-1,1)=(4,-3,-7)$.
3. Pasa por el origen:

$$\mathbf{(x,y,z)=\lambda(4,-3,-7)}\ \ \text{es decir}\ \ \frac x4=\frac y{-3}=\frac z{-7}.$$
