@@ 1
**Rectángulo de diagonal $10$ y área máxima.**
1. **Incógnitas.** Lados $x$ e $y$. Por Pitágoras, $x^{2}+y^{2}=100$, luego $y=\sqrt{100-x^{2}}$ (con $0<x<10$).
2. **Función a maximizar.** $A=xy=x\sqrt{100-x^{2}}$.
3. **Derivada.** $A'(x)=\dfrac{100-2x^{2}}{\sqrt{100-x^{2}}}=0\Rightarrow x=5\sqrt2$, y entonces $y=5\sqrt2$.
4. **Es máximo.** $A=0$ en los extremos $x=0$ y $x=10$ y $A>0$ en el interior.

**Es un cuadrado de lado $5\sqrt2\approx7{,}07$ cm** (área $50\ \text{cm}^2$).

@@ 2
1. **Expresión sin valor absoluto.** $f(x)=\dfrac1{x^{2}}$ si $x>0$ y $f(x)=-\dfrac1{x^{2}}$ si $x<0$.

**a) Concavidad y puntos de inflexión.**
1. Primera derivada: $f'(x)=-\dfrac2{x^{3}}$ si $x>0$ y $f'(x)=\dfrac2{x^{3}}$ si $x<0$.
2. Segunda derivada: $f''(x)=\dfrac6{x^{4}}$ si $x>0$ y $f''(x)=-\dfrac6{x^{4}}$ si $x<0$.
3. Signo: $f''>0$ en $(0,+\infty)$ (convexa) y $f''<0$ en $(-\infty,0)$ (cóncava).
4. Inflexión: $f''$ no se anula y el único punto donde cambia de signo, $x=0$, no está en el dominio.

**Convexa en $(0,+\infty)$, cóncava en $(-\infty,0)$. No hay puntos de inflexión** ($x=0$ no está en el dominio).

**b) Asíntotas y gráfica.**
1. Vertical: $\displaystyle\lim_{x\to0^+}f=+\infty$ y $\displaystyle\lim_{x\to0^-}f=-\infty$: **$x=0$**.
2. Horizontal: $\displaystyle\lim_{x\to\pm\infty}f=0$: **$y=0$** (en ambos lados).
3. No hay oblicua, porque existe la horizontal.
4. Gráfica: función impar, decreciente en cada rama. Para $x>0$ es la rama de $1/x^{2}$ (primer cuadrante) y para $x<0$ su simétrica respecto al origen (tercer cuadrante), ambas pegadas a los ejes.

![Gráfica de f(x)=1/(x|x|): asíntota vertical x=0 y horizontal y=0, positiva a la derecha y negativa a la izquierda](fig/2023-ord-sup-e2.svg){fig-alt="Gráfica de f(x)=1/(x|x|): asíntota vertical x=0 y horizontal y=0, positiva a la derecha y negativa a la izquierda" width="75%" fig-align="center"}

@@ 3
**Función a partir de su segunda derivada.**
1. Primera derivada: $f'(x)=\int(2\ln x+1)dx=2x\ln x-x+C$ (por partes: $\int2\ln x\,dx=2x\ln x-2x$).
2. Condición $f'(e)=e$: $2e-e+C=e\Rightarrow C=0$.
3. Función, integrando de nuevo por partes: $f(x)=\int(2x\ln x-x)dx=x^{2}\ln x-\dfrac{x^{2}}2-\dfrac{x^{2}}2+K=x^{2}\ln x-x^{2}+K$.
4. Condición $f(1)=0$: $-1+K=0\Rightarrow K=1$.

**$f(x)=x^{2}\ln x-x^{2}+1$.**

@@ 4
**a) Cortes y recinto.**
1. Si $|x|\ge1$: $f(x)=x^{2}-1$ y $x^{2}-1=x+5\Rightarrow x^{2}-x-6=0\Rightarrow x=-2,\ 3$ (ambos cumplen $|x|\ge1$).
2. Si $|x|<1$: $f(x)=1-x^{2}$ y $1-x^{2}=x+5$ no tiene solución real.
3. Ordenadas: $g(-2)=3$ y $g(3)=8$.

![Recinto entre f(x)=|x²−1| y g(x)=x+5, con cortes en (−2,3) y (3,8)](fig/2023-ord-sup-e4.svg){fig-alt="Recinto entre f(x)=|x²−1| y g(x)=x+5, con cortes en (−2,3) y (3,8)" width="75%" fig-align="center"}

**Puntos de corte: $(-2,3)$ y $(3,8)$.** El recinto está limitado por arriba por la recta $y=x+5$ y por abajo por $|x^{2}-1|$ (dos arcos de parábola hacia arriba y un arco invertido entre $-1$ y $1$).

**b) Área.**
1. Se parte la integral en los puntos $x=-1$ y $x=1$, donde cambia la expresión de $f$.
2. En $[-2,-1]$ y $[1,3]$ la distancia vertical es $x+5-(x^{2}-1)$; en $[-1,1]$ es $x+5-(1-x^{2})$:
$$A=\int_{-2}^{-1}(x+5-x^{2}+1)dx+\int_{-1}^{1}(x+5-1+x^{2})dx+\int_{1}^{3}(x+5-x^{2}+1)dx=\dfrac{13}6+\dfrac{26}3+\dfrac{22}3.$$

**Área $=\dfrac{109}6\ \text{u}^2$.**

@@ 5
**a) Valores de $m$ con inversa.**
1. $A$ tiene inversa si y solo si $|A|\neq0$.
2. Determinante: $|A|=4(m-1)$.

**$A$ tiene inversa si $m\ne1$.**

**b) Ecuación matricial con $m=0$.**
1. Potencia: $C^{2}=I$, luego $C^{4}=I$.
2. Se despeja el término con $X$: $\tfrac12AX+C^{4}=B\Rightarrow\tfrac12AX=B-I$.
3. Con $m=0$, $|A|=-4\ne0$, luego existe $A^{-1}$. Se multiplica por $2A^{-1}$ por la izquierda: $X=2A^{-1}(B-I)$.
4. Inversa: $A^{-1}=\begin{pmatrix}0&\frac12&-\frac12\\\frac12&0&\frac12\\-\frac12&\frac12&0\end{pmatrix}$.
5. Producto:

**$X=\begin{pmatrix}-2&-3&4\\1&6&2\\1&-5&2\end{pmatrix}$.**

@@ 6
**a) Discusión según $\alpha$.**
1. Se calcula $BA=(\alpha x+y+z,\ x+\alpha y+z,\ x+y+\alpha z)$ y se iguala a $(1,1,1)$: tres ecuaciones lineales en $x,y,z$.
2. La matriz de coeficientes es $\begin{pmatrix}\alpha&1&1\\1&\alpha&1\\1&1&\alpha\end{pmatrix}$ y su determinante vale $(\alpha-1)^{2}(\alpha+2)$.
3. Se estudia cada caso:
   - $\alpha\ne1,-2$: $\operatorname{rg}=3$, sistema compatible determinado (SCD).
   - $\alpha=1$: las tres ecuaciones son $x+y+z=1$, rango 1: sistema compatible indeterminado (SCI).
   - $\alpha=-2$: $\operatorname{rg}=2$ y $\operatorname{rg}$ ampliada $=3$ (sumando las ecuaciones sale $0=3$): sistema incompatible (SI).

**b) Resolución.**
1. Para $\alpha=0$ (SCD): $y+z=1$, $x+z=1$, $x+y=1$. Sumando, $2(x+y+z)=3$, y restando cada ecuación se obtiene $x=y=z=\dfrac12$.
2. Para $\alpha=1$ (SCI): una sola ecuación independiente, $x+y+z=1$; se toman $x$ e $y$ como parámetros.

**$\alpha=0$: $x=y=z=\dfrac12$. $\alpha=1$: $(x,y,z)=(\lambda,\mu,1-\lambda-\mu)$**, con $\lambda,\mu\in\mathbb{R}$.

@@ 7
**Simétrico de $A$ respecto del plano $BCD$.**
1. **Plano.** Vectores $\overrightarrow{BC}=\left(-1,-\tfrac23,-1\right)$ y $\overrightarrow{BD}=(-4,-1,1)$. Su producto vectorial es proporcional a $(1,-3,1)$, luego el plano es $x-3y+z=0$. Se comprueba con $B$: $1-3+2=0$.
2. **Recta perpendicular por $A$.** Dirección la normal: $(2+t,\,-4-3t,\,-3+t)$.
3. **Pie de la perpendicular.** Se sustituye en el plano: $11+11t=0\Rightarrow t=-1$, $M=(1,-1,-4)$.
4. **Simétrico.** $M$ es el punto medio de $A$ y $A'$, así que $A'=2M-A$.

**$A'=(0,2,-5)$.**

@@ 8
**a) Volumen del paralelepípedo.**
1. El volumen es el valor absoluto del producto mixto, es decir, del determinante de los tres vectores.
2. $\begin{vmatrix}2&-1&0\\3&0&x\\-x&1&-1\end{vmatrix}=x^{2}-2x-3$.
3. Se impone $|x^{2}-2x-3|=5$:
   - $x^{2}-2x-8=0\Rightarrow x=4,\ x=-2$.
   - $x^{2}-2x+2=0$ no tiene solución real.

**$x=4$ o $x=-2$.**

**b) Área de la cara $OAB$ con $x=1$.**
1. Los lados de la cara son $\overrightarrow{OA}=(2,-1,0)$ y $\overrightarrow{OB}=(3,0,1)$.
2. $\overrightarrow{OA}\times\overrightarrow{OB}=(2,-1,0)\times(3,0,1)=(-1,-2,3)$.
3. El área del paralelogramo es el módulo del producto vectorial.

**Área $=\sqrt{1+4+9}=\sqrt{14}\ \text{u}^2$.**
