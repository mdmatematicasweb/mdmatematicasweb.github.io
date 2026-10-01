@@ 1
**a)** Para que sea continua en $0$ el límite debe existir y ser finito. Con $e^{\lambda x}=1+\lambda x+\tfrac{\lambda^2x^2}{2}+\dots$ el numerador es $(\lambda-2)x+\tfrac{\lambda^2-1}{2}x^2+\dots$, y debe ser $O(x^2)$: $\lambda=2$. Entonces
$$\mu=\lim_{x\to0}\frac{e^{2x}-e^x-x}{x^2}=\frac{4-1}{2}.$$

**$\lambda=2$, $\mu=\tfrac32$.**

**b)** $f(x)=\dfrac{e^{2x}-e^x-x}{x^2}$ para $x\ne0$. $f(1)=e^2-e-1$.
$$f'(x)=\frac{(2e^{2x}-e^x-1)x^2-2x(e^{2x}-e^x-x)}{x^4}\ \Rightarrow\ f'(1)=(2e^2-e-1)-2(e^2-e-1)=e+1.$$

**Tangente: $y=(e^2-e-1)+(e+1)(x-1)$, es decir, $y=(e+1)x+e^2-2e-2$.**

@@ 2
**a)** El numerador en $x=-2$ vale $6\neq0$ y $\lim_{x\to-2^{\pm}}f=\pm\infty$: **asíntota vertical $x=-2$**.
Como el grado del numerador (4) supera en 1 al del denominador (3), hay oblicua: $m=\lim\dfrac{f(x)}{x}=1$ y
$$n=\lim_{x\to\pm\infty}\big(f(x)-x\big)=\lim\frac{x^4-3x^2+2-x(x+2)^3}{(x+2)^3}=\lim\frac{-6x^3+\dots}{x^3}=-6.$$
**Asíntota oblicua $y=x-6$** (en $+\infty$ y en $-\infty$). No hay horizontales.

**b)** $f(0)=\tfrac{2}{8}=\tfrac14$. $f'(x)=\dfrac{(4x^3-6x)(x+2)-3(x^4-3x^2+2)}{(x+2)^4}$, y $f'(0)=\dfrac{-6}{16}=-\tfrac38$. La normal tiene pendiente $\tfrac83$.

**Normal: $y=\tfrac14+\tfrac83x$.**

@@ 3
Se divide: $\dfrac{2x^3+2x^2-2x+7}{x^2+x-2}=2x+\dfrac{2x+7}{x^2+x-2}$, y como $x^2+x-2=(x-1)(x+2)$,
$$\frac{2x+7}{(x-1)(x+2)}=\frac{3}{x-1}-\frac{1}{x+2}.$$
Integrando:

**$x^2+3\ln|x-1|-\ln|x+2|+C$.**

@@ 4
Las gráficas se cortan donde $x^2=a|x|$: $x=0,\ \pm a$. Por simetría el área total es el doble de la de $[0,a]$, donde $g\ge f$:
$$A=2\int_0^a(ax-x^2)\,dx=2\left[\tfrac{a x^2}{2}-\tfrac{x^3}{3}\right]_0^a=\frac{a^3}{3}=9.$$

**$a=3$.**

@@ 5
La matriz de coeficientes es cuadrada; $|M|=-2\alpha(\alpha-1)$.

**a)** Sistema homogéneo (siempre compatible):
- $\alpha\neq0,1$: $|M|\ne0$, $\operatorname{rg}=3$: compatible determinado (SCD), sólo la solución trivial.
- $\alpha=0$ o $\alpha=1$: $\operatorname{rg}=2<3$: compatible indeterminado (SCI), con un parámetro.

**b)** Para $\alpha=1$: $x+y+z=0$, $x-y+z=0$, $x+z=0$. Restando las dos primeras, $y=0$, y entonces $x=-z$:

**$(x,y,z)=(-\lambda,0,\lambda)$; una solución no trivial: $(-1,0,1)$.**

@@ 6
**a)** $|A|=m^2-4=(m-2)(m+2)$ (matriz de coeficientes).
- $m\neq\pm2$: $\operatorname{rg}A=\operatorname{rg}A^*=3$: compatible determinado (SCD).
- $m=2$: $\operatorname{rg}A=2$ y $\operatorname{rg}A^*=3$: incompatible (SI).
- $m=-2$: $\operatorname{rg}A=2$ y $\operatorname{rg}A^*=3$: incompatible (SI).

**b)** Con $m=1$ (SCD): $x-y-2z=1$, $x+y+z=2$, $x+2y+z=3$. Restando las dos últimas, $y=1$; entonces $x+z=1$ y $x-2z=2$, de donde $z=-\tfrac13$.

**$(x,y,z)=\left(\tfrac43,\,1,\,-\tfrac13\right)$.**

@@ 7
**a)** Planos paralelos: $2x+y-2z+k=0$. La distancia al plano $\pi$ ($k=-2$) es $\dfrac{|k+2|}{\sqrt{4+1+4}}=\dfrac{|k+2|}{3}=2$, luego $k+2=\pm6$.

**$2x+y-2z+4=0$ y $2x+y-2z-8=0$.**

**b)** Cortes de $\pi$ con los ejes: $A(1,0,0)$, $B(0,2,0)$, $C(0,0,-1)$. Con el origen $O$:
$$V=\tfrac16\left|[\overrightarrow{OA},\overrightarrow{OB},\overrightarrow{OC}]\right|=\tfrac16\,|1\cdot2\cdot(-1)|.$$

**$V=\tfrac13$ u$^3$.**

@@ 8
$r$: punto $(0,1,0)$, dirección $\vec d_r=(1,-1,1)$. Para $s$, sumando las ecuaciones $4x-2z=2$, luego $z=2x-1$, $y=1+5x$: punto $(0,1,-1)$, dirección $\vec d_s=(1,5,2)$.

**a)** Las direcciones no son proporcionales. Con $\vec w=(0,0,-1)$ (entre los puntos),
$$\begin{vmatrix}1&-1&1\\1&5&2\\0&0&-1\end{vmatrix}=-6\neq0.$$

**Las rectas se cruzan.**

**b)** Normal $=\vec d_s\times\vec d_r=(1,5,2)\times(1,-1,1)=(7,1,-6)$; pasa por $(0,1,-1)$: $7x+(y-1)-6(z+1)=0$.

**$7x+y-6z-7=0$.**
