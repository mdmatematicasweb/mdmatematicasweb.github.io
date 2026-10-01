@@ 1
$f'(x)=(2x+x^2+1)e^x=(x+1)^2e^x$ y $f''(x)=(x+1)(x+3)e^x$.

**a)** $f'(x)\ge0$ para todo $x$ y sólo se anula en $x=-1$: **$f$ es creciente en todo $\mathbb{R}$** (nunca decrece; en $x=-1$ hay tangente horizontal sin extremo).

**b)** $f''=0$ en $x=-3$ y $x=-1$. Signo: $+$ en $(-\infty,-3)$, $-$ en $(-3,-1)$, $+$ en $(-1,+\infty)$.

**Convexa en $(-\infty,-3)\cup(-1,+\infty)$; cóncava en $(-3,-1)$.** Puntos de inflexión: **$\left(-3,\,10e^{-3}\right)$ y $\left(-1,\,2e^{-1}\right)$.**

@@ 2
**a)** Continuidad en $x=0$: $\lim_{x\to0^-}f=a$ y $f(0)=0$, así que $a=0$.

Derivabilidad: $f'(0^-)=-a-b$ y $f'(0^+)=1+\dfrac1{1+0}=2$. Entonces $-a-b=2$.

$$\mathbf{a=0,\quad b=-2}$$

**b)** $f(0)=0$ y $f'(0)=2$.

**Tangente: $y=2x$.  Normal: $y=-\dfrac x2$.**

@@ 3
**a)** $f(x)=x(x-2)(x-4)$. **Cortes con el eje $OX$: $(0,0)$, $(2,0)$, $(4,0)$; con el eje $OY$: $(0,0)$.** Esbozo: cúbica con $f\to-\infty$ a la izquierda y $+\infty$ a la derecha; $f>0$ en $(0,2)$ (máximo local en $x=2-\tfrac{2}{\sqrt3}\approx0{,}85$) y $f<0$ en $(2,4)$ (mínimo local en $x=2+\tfrac{2}{\sqrt3}\approx3{,}15$).

![Gráfica de f(x)=x³−6x²+8x con cortes en x=0, 2 y 4 y sus extremos relativos](fig/2024-ord-res-e3.svg){fig-alt="Gráfica de f(x)=x³−6x²+8x con cortes en x=0, 2 y 4 y sus extremos relativos" width="75%" fig-align="center"}

**b)** Con $F(x)=\dfrac{x^4}{4}-2x^3+4x^2$: $\int_0^2f=F(2)-F(0)=4$ y $\int_2^4f=F(4)-F(2)=0-4=-4$.

$$A=|4|+|-4|=\mathbf{8\ u^2}.$$

@@ 4
Con $t=e^x$, $dx=\dfrac{dt}{t}$:

$$\int\frac{t^3-1}{t(t-3)}\,dt=\int\left(t+3+\frac{9t-1}{t(t-3)}\right)dt,\qquad\frac{9t-1}{t(t-3)}=\frac{1/3}{t}+\frac{26/3}{t-3}.$$

$$\mathbf{\int\frac{e^{3x}-1}{e^x-3}\,dx=\frac{e^{2x}}2+3e^x+\frac x3+\frac{26}3\ln|e^x-3|+C}$$

@@ 5
$|A|=9$ y $|B|=-\dfrac19$, luego $|AB|=-1$.

**a)** $\left|\big((AB)^5\big)^{-1}\right|=\dfrac1{|AB|^5}=\mathbf{-1}$. Para matrices $3\times3$, $|27AB^6|=27^3\,|A|\,|B|^6=3^9\cdot3^2\cdot3^{-12}=\mathbf{\dfrac13}$.

**b)** $|A|\neq0$ y $|B|\neq0$, así que ambas son invertibles y $X=9A^{-1}B^{-1}$ (existe y es única):

$$\mathbf{X=\begin{pmatrix}0&1&18\\0&1&-63\\9&0&-162\end{pmatrix}}$$

(comprobado: $AXB=9I$).

@@ 6
**a)** $|A|=-(3a-1)(a-2)$ (desarrollando por la 2.ª columna).

- Si $a\ne\frac13$ y $a\neq2$: $\operatorname{rg}(A)=3$.
- Si $a=\frac13$ o $a=2$: $\operatorname{rg}(A)=2$ (hay un menor $2\times2$ no nulo, p. ej. $\begin{vmatrix}1&1\\2&a\end{vmatrix}$ con $a=\frac13$, o $\begin{vmatrix}1&0\\5&5\end{vmatrix}=5$ con $a=2$).

**b)** Con $a=2$: $\begin{cases}x+z=1\\2x+2z=2\\5x+5y=4\end{cases}$. La segunda es la primera multiplicada por 2 (SCI, un parámetro): $z=1-x$, $y=\frac45-x$.

$$\mathbf{(x,y,z)=\left(\lambda,\ \tfrac45-\lambda,\ 1-\lambda\right),\ \lambda\in\mathbb{R}}$$

@@ 7
$r$: punto $(-1,2,3)$, dirección $(2,2,-1)$; un punto genérico es $R(-1+2t,\,2+2t,\,3-t)$ y $\overrightarrow{PR}=(2t-1,\,2t,\,7-t)$.

**a)** El punto más cercano cumple $\overrightarrow{PR}\cdot(2,2,-1)=0$: $9t-9=0\Rightarrow t=1$.

$$\mathbf{R=(1,4,2)}\quad(\text{distancia }\sqrt{41}).$$

**b)** $|\overrightarrow{PR}|^2=9t^2-18t+50=50\Rightarrow 9t(t-2)=0\Rightarrow t=0,\ t=2$.

$$\mathbf{(-1,2,3)\ \text{ y }\ (3,6,1)}$$

@@ 8
$\overrightarrow{AB}=(0,1,-3)$, $\overrightarrow{AC}=(-1,1,1)$. Normal de $\pi_1$: $\overrightarrow{AB}\times\overrightarrow{AC}=(4,3,1)$. Normal de $\pi_2$: $(1,-1,1)$.

Una recta paralela a ambos planos tiene dirección perpendicular a las dos normales: $(4,3,1)\times(1,-1,1)=(4,-3,-7)$.

$$\mathbf{(x,y,z)=\lambda(4,-3,-7)}\ \ \text{es decir}\ \ \frac x4=\frac y{-3}=\frac z{-7}.$$
