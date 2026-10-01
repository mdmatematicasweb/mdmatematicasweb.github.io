@@ 1
Lados $x$ e $y$ con $x^{2}+y^{2}=100$; $A=xy=x\sqrt{100-x^{2}}$.

$A'(x)=\dfrac{100-2x^{2}}{\sqrt{100-x^{2}}}=0\Rightarrow x=5\sqrt2$, y entonces $y=5\sqrt2$ (máximo, pues $A=0$ en los extremos).

**Es un cuadrado de lado $5\sqrt2\approx7{,}07$ cm** (área $50\ \text{cm}^2$).

@@ 2
$f(x)=\dfrac1{x^{2}}$ si $x>0$ y $f(x)=-\dfrac1{x^{2}}$ si $x<0$.

**a)** $f''(x)=\dfrac6{x^{4}}$ si $x>0$; $f''(x)=-\dfrac6{x^{4}}$ si $x<0$.

**Convexa en $(0,+\infty)$, cóncava en $(-\infty,0)$. No hay puntos de inflexión** ($x=0$ no está en el dominio).

**b)** 
- Vertical: $\displaystyle\lim_{x\to0^+}f=+\infty$, $\displaystyle\lim_{x\to0^-}f=-\infty$: **$x=0$**.
- Horizontal: $\displaystyle\lim_{x\to\pm\infty}f=0$: **$y=0$** (en ambos lados).

Gráfica: función impar, decreciente en cada rama. Para $x>0$ es la rama de $1/x^{2}$ (primer cuadrante) y para $x<0$ su simétrica respecto al origen (tercer cuadrante), ambas pegadas a los ejes.

![Gráfica de f(x)=1/(x|x|): asíntota vertical x=0 y horizontal y=0, positiva a la derecha y negativa a la izquierda](fig/2023-ord-sup-e2.svg){fig-alt="Gráfica de f(x)=1/(x|x|): asíntota vertical x=0 y horizontal y=0, positiva a la derecha y negativa a la izquierda" width="75%" fig-align="center"}

@@ 3
$f'(x)=\int(2\ln x+1)dx=2x\ln x-x+C$. $f'(e)=2e-e+C=e\Rightarrow C=0$.

$f(x)=\int(2x\ln x-x)dx=x^{2}\ln x-\dfrac{x^{2}}2-\dfrac{x^{2}}2+K=x^{2}\ln x-x^{2}+K$.

$f(1)=-1+K=0\Rightarrow K=1$.

**$f(x)=x^{2}\ln x-x^{2}+1$.**

@@ 4
**a)** Si $|x|\ge1$: $x^{2}-1=x+5\Rightarrow x=-2,\ 3$. Si $|x|<1$: $1-x^{2}=x+5$ no tiene solución real.

![Recinto entre f(x)=|x²−1| y g(x)=x+5, con cortes en (−2,3) y (3,8)](fig/2023-ord-sup-e4.svg){fig-alt="Recinto entre f(x)=|x²−1| y g(x)=x+5, con cortes en (−2,3) y (3,8)" width="75%" fig-align="center"}

**Puntos de corte: $(-2,3)$ y $(3,8)$.** El recinto está limitado por arriba por la recta $y=x+5$ y por abajo por $|x^{2}-1|$ (dos arcos de parábola hacia arriba y un arco invertido entre $-1$ y $1$).

**b)** 
$$A=\int_{-2}^{-1}(x+5-x^{2}+1)dx+\int_{-1}^{1}(x+5-1+x^{2})dx+\int_{1}^{3}(x+5-x^{2}+1)dx=\dfrac{13}6+\dfrac{26}3+\dfrac{22}3.$$

**Área $=\dfrac{109}6\ \text{u}^2$.**

@@ 5
**a)** $|A|=4(m-1)$. **$A$ tiene inversa si $m\ne1$.**

**b)** $C^{2}=I$, luego $C^{4}=I$. La ecuación es $\tfrac12AX=B-I\Rightarrow X=2A^{-1}(B-I)$.

Para $m=0$, $|A|=-4\ne0$ y $A^{-1}=\begin{pmatrix}0&\frac12&-\frac12\\\frac12&0&\frac12\\-\frac12&\frac12&0\end{pmatrix}$.

**$X=\begin{pmatrix}-2&-3&4\\1&6&2\\1&-5&2\end{pmatrix}$.**

@@ 6
**a)** $BA=(\alpha x+y+z,\ x+\alpha y+z,\ x+y+\alpha z)=(1,1,1)$. La matriz de coeficientes tiene $|\cdot|=(\alpha-1)^{2}(\alpha+2)$.

- $\alpha\ne1,-2$: $\operatorname{rg}=3$, sistema compatible determinado (SCD).
- $\alpha=1$: las tres ecuaciones son $x+y+z=1$, rango 1: sistema compatible indeterminado (SCI).
- $\alpha=-2$: $\operatorname{rg}=2$ y $\operatorname{rg}$ ampliada $=3$ (sumando las ecuaciones sale $0=3$): sistema incompatible (SI).

**b)** 
- $\alpha=0$ (SCD): $y+z=1$, $x+z=1$, $x+y=1$, **$x=y=z=\dfrac12$**.
- $\alpha=1$ (SCI): **$(x,y,z)=(\lambda,\mu,1-\lambda-\mu)$**, con $\lambda,\mu\in\mathbb{R}$.

@@ 7
Plano por $B$, $C$, $D$: $\overrightarrow{BC}=\left(-1,-\tfrac23,-1\right)$, $\overrightarrow{BD}=(-4,-1,1)$, normal $\propto(1,-3,1)$ y $x-3y+z=0$ (pasa por $B$: $1-3+2=0$).

Recta por $A$ perpendicular: $(2+t,\,-4-3t,\,-3+t)$. Corte: $11+11t=0\Rightarrow t=-1$, pie $M=(1,-1,-4)$.

Simétrico $A'=2M-A$: **$A'=(0,2,-5)$.**

@@ 8
**a)** $\begin{vmatrix}2&-1&0\\3&0&x\\-x&1&-1\end{vmatrix}=x^{2}-2x-3$. Volumen $=|x^{2}-2x-3|=5$:

- $x^{2}-2x-8=0\Rightarrow x=4,\ x=-2$.
- $x^{2}-2x+2=0$ no tiene solución real.

**$x=4$ o $x=-2$.**

**b)** Con $x=1$: $\overrightarrow{OA}\times\overrightarrow{OB}=(2,-1,0)\times(3,0,1)=(-1,-2,3)$.

**Área $=\sqrt{1+4+9}=\sqrt{14}\ \text{u}^2$.**
