@@ 1
**a) Valores de $\lambda$ y $\mu$.**
1. $f$ es continua en $x=0$ si existe $\displaystyle\lim_{x\to0}f(x)$ y vale $f(0)=\mu$. En $x=0$ el cociente es de tipo $\tfrac00$ (el denominador $x^2$ es de orden $2$).
2. Se desarrolla $e^{\lambda x}=1+\lambda x+\tfrac{\lambda^2x^2}{2}+\dots$ y $e^x=1+x+\tfrac{x^2}{2}+\dots$. El numerador es
$$e^{\lambda x}-e^x-x=(\lambda-2)x+\tfrac{\lambda^2-1}{2}x^2+\dots$$
3. Para que el límite sea finito, el numerador debe ser $O(x^2)$: el término en $x$ se anula, $\lambda-2=0\Rightarrow\lambda=2$.
4. Con $\lambda=2$ el límite es el coeficiente de $x^2$: $\mu=\dfrac{\lambda^2-1}{2}=\dfrac{4-1}{2}$.

**$\lambda=2$, $\mu=\tfrac32$.**

**b) Recta tangente en $x=1$ (con $\lambda=2$).**
1. Cerca de $x=1$, $f(x)=\dfrac{e^{2x}-e^x-x}{x^2}$. Punto: $f(1)=e^2-e-1$.
2. Derivada (cociente): $f'(x)=\dfrac{(2e^{2x}-e^x-1)x^2-2x(e^{2x}-e^x-x)}{x^4}$.
3. Se evalúa en $x=1$:
$$f'(1)=(2e^2-e-1)-2(e^2-e-1)=e+1.$$
4. Recta tangente: $y-f(1)=f'(1)(x-1)$.

**Tangente: $y=(e^2-e-1)+(e+1)(x-1)$, es decir, $y=(e+1)x+e^2-2e-2$.**

@@ 2
**a) Asíntotas.**
1. *Vertical.* El denominador se anula en $x=-2$ y el numerador allí vale $(-2)^4-3\cdot4+2=6\neq0$. Los límites laterales son infinitos: $\lim_{x\to-2^{\pm}}f=\pm\infty$ (el signo de $(x+2)^3$). **Asíntota vertical $x=-2$.**
2. *Horizontal.* El grado del numerador (4) supera al del denominador (3), luego $f\to\pm\infty$: no hay horizontales.
3. *Oblicua.* Como el grado del numerador supera en 1 al del denominador, puede haberla: $m=\lim\dfrac{f(x)}{x}=1$ y
$$n=\lim_{x\to\pm\infty}\big(f(x)-x\big)=\lim\frac{x^4-3x^2+2-x(x+2)^3}{(x+2)^3}=\lim\frac{-6x^3+\dots}{x^3}=-6.$$

**Asíntota oblicua $y=x-6$** (en $+\infty$ y en $-\infty$). No hay horizontales.

**b) Recta normal en $x=0$.**
1. Punto: $f(0)=\tfrac{2}{8}=\tfrac14$.
2. Derivada: $f'(x)=\dfrac{(4x^3-6x)(x+2)-3(x^4-3x^2+2)}{(x+2)^4}$, y $f'(0)=\dfrac{-6}{16}=-\tfrac38$ (pendiente de la tangente).
3. La normal es perpendicular: pendiente $-\dfrac{1}{f'(0)}=\tfrac83$.

**Normal: $y=\tfrac14+\tfrac83x$.**

@@ 3
**Integral racional.**
1. El grado del numerador (3) supera al del denominador (2): se divide. El cociente es $2x$ y el resto $2x+7$:
$$\frac{2x^3+2x^2-2x+7}{x^2+x-2}=2x+\frac{2x+7}{x^2+x-2}.$$
2. Se factoriza el denominador: $x^2+x-2=(x-1)(x+2)$.
3. Fracciones simples: $\dfrac{2x+7}{(x-1)(x+2)}=\dfrac{A}{x-1}+\dfrac{B}{x+2}$, con $A=\dfrac{2+7}{3}=3$ y $B=\dfrac{-4+7}{-3}=-1$:
$$\frac{2x+7}{(x-1)(x+2)}=\frac{3}{x-1}-\frac{1}{x+2}.$$
4. Se integra término a término:

**$x^2+3\ln|x-1|-\ln|x+2|+C$.**

@@ 4
**Cortes y simetría.**
1. Las gráficas se cortan donde $x^2=a|x|$: $|x|(|x|-a)=0\Rightarrow x=0,\ \pm a$.
2. Las dos funciones son pares, así que el área total es el doble de la de $[0,a]$. En ese intervalo, $g\ge f$ (por ejemplo, en $x=\tfrac a2$: $g=\tfrac{a^2}{2}>f=\tfrac{a^2}{4}$).

**Área.**
3. Barrow:
$$A=2\int_0^a(ax-x^2)\,dx=2\left[\tfrac{a x^2}{2}-\tfrac{x^3}{3}\right]_0^a=2\left(\tfrac{a^3}{2}-\tfrac{a^3}{3}\right)=\frac{a^3}{3}.$$
4. Se impone que el área sea $9$: $\dfrac{a^3}{3}=9\Rightarrow a^3=27$.

**$a=3$.**

@@ 5
**Matriz de coeficientes.** Es cuadrada, con $|M|=\begin{vmatrix}\alpha&1&1\\\alpha&-1&1\\\alpha&0&\alpha\end{vmatrix}=-2\alpha(\alpha-1)$, que se anula en $\alpha=0$ y $\alpha=1$.

**a) Discusión según $\alpha$.** Es un sistema homogéneo, así que siempre es compatible (tiene al menos la solución trivial).
1. Si $\alpha\neq0,1$: $|M|\ne0$ y $\operatorname{rg}M=3$: compatible determinado (SCD), solo la solución trivial.
2. Si $\alpha=0$ o $\alpha=1$: $|M|=0$ y existe un menor no nulo de orden 2, luego $\operatorname{rg}M=2<3$: compatible indeterminado (SCI), con un parámetro libre.

**SCD si $\alpha\neq0,1$; SCI si $\alpha=0$ o $\alpha=1$.**

**b) Resolución para $\alpha=1$.**
1. El sistema es $x+y+z=0$, $x-y+z=0$, $x+z=0$.
2. Restando las dos primeras: $2y=0\Rightarrow y=0$.
3. Entonces $x+z=0$ (la tercera ecuación coincide): $x=-z$. Con $z=\lambda$:

**$(x,y,z)=(-\lambda,0,\lambda)$; una solución no trivial: $(-1,0,1)$** (con $\lambda=1$).

@@ 6
**a) Discusión según $m$.**
1. Determinante de la matriz de coeficientes: $|A|=\begin{vmatrix}1&-m&-2\\1&1&1\\1&2&m\end{vmatrix}=m^2-4=(m-2)(m+2)$.
2. Se anula en $m=2$ y $m=-2$. Se aplica el teorema de Rouché-Frobenius ($A^*$ es la ampliada).
3. Si $m\neq\pm2$: $\operatorname{rg}A=\operatorname{rg}A^*=3$: compatible determinado (SCD).
4. Si $m=2$: $\operatorname{rg}A=2$ y $\operatorname{rg}A^*=3$: incompatible (SI).
5. Si $m=-2$: $\operatorname{rg}A=2$ y $\operatorname{rg}A^*=3$: incompatible (SI).

**SCD si $m\neq\pm2$; SI si $m=2$ o $m=-2$.**

**b) Resolución para $m=1$ (SCD).**
1. El sistema es $x-y-2z=1$, $x+y+z=2$, $x+2y+z=3$.
2. Restando las dos últimas: $y=1$.
3. Entonces $x+z=1$ (de la segunda) y $x-2z=2$ (de la primera, con $y=1$). Restando: $3z=-1\Rightarrow z=-\tfrac13$, y $x=1-z=\tfrac43$.
4. Comprobación en la primera: $\tfrac43-1+\tfrac23=1$ ✓.

**$(x,y,z)=\left(\tfrac43,\,1,\,-\tfrac13\right)$.**

@@ 7
**a) Planos paralelos a $\pi$ a distancia $2$.**
1. Los planos paralelos a $\pi$ tienen la misma normal: $2x+y-2z+k=0$. El plano $\pi$ corresponde a $k=-2$.
2. La distancia entre dos planos paralelos es $\dfrac{|k-(-2)|}{\sqrt{2^2+1^2+(-2)^2}}=\dfrac{|k+2|}{3}$.
3. Se impone que valga $2$: $|k+2|=6\Rightarrow k+2=\pm6$, es decir, $k=4$ o $k=-8$.

**$2x+y-2z+4=0$ y $2x+y-2z-8=0$.**

**b) Volumen del tetraedro.**
1. Cortes de $\pi$ con los ejes: con $OX$ ($y=z=0$), $2x=2\Rightarrow A(1,0,0)$; con $OY$, $y=2\Rightarrow B(0,2,0)$; con $OZ$, $-2z=2\Rightarrow C(0,0,-1)$.
2. El volumen del tetraedro es $\tfrac16$ del valor absoluto del producto mixto de los vectores desde el origen:
$$V=\tfrac16\left|[\overrightarrow{OA},\overrightarrow{OB},\overrightarrow{OC}]\right|=\tfrac16\,|1\cdot2\cdot(-1)|.$$

**$V=\tfrac13$ u$^3$.**

@@ 8
**Datos.**
1. $r$: punto $(0,1,0)$ y dirección $\vec d_r=(1,-1,1)$ (de $x=1-y=z$).
2. $s$: sumando las dos ecuaciones, $4x-2z=2\Rightarrow z=2x-1$; sustituyendo, $y=1+5x$. Con $x$ como parámetro: punto $(0,1,-1)$ y dirección $\vec d_s=(1,5,2)$.

**a) Posición relativa.**
1. Las direcciones $(1,-1,1)$ y $(1,5,2)$ no son proporcionales: no son paralelas ni coincidentes.
2. Vector entre los puntos de las rectas: $\vec w=(0,0,-1)$. Se estudia si $\vec d_r$, $\vec d_s$ y $\vec w$ son coplanarios:
$$\begin{vmatrix}1&-1&1\\1&5&2\\0&0&-1\end{vmatrix}=-6\neq0.$$
3. No son coplanarios: las rectas no están en un mismo plano.

**Las rectas se cruzan.**

**b) Plano que contiene a $s$ y es paralelo a $r$.**
1. El plano tiene como vectores directores $\vec d_s$ y $\vec d_r$ y pasa por el punto $(0,1,-1)$ de $s$.
2. Normal: $\vec d_s\times\vec d_r=(1,5,2)\times(1,-1,1)=(7,1,-6)$.
3. Ecuación: $7x+(y-1)-6(z+1)=0$.

**$7x+y-6z-7=0$.**
