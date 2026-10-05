@@ 1
1. **Desarrollo.** Con $\ln(1+x)=x-\frac{x^2}{2}+\cdots$: $\dfrac{x+1}{\ln(x+1)}=\dfrac{x+1}{x\left(1-\frac x2+\cdots\right)}=\dfrac1x+\dfrac32+O(x)$.
2. **Diferencia.** $\dfrac{x+1}{\ln(x+1)}-\dfrac ax=\dfrac{1-a}{x}+\dfrac32+O(x)$.
3. **Límite finito.** El término $\dfrac{1-a}{x}$ se hace infinito salvo que $1-a=0$: $a=1$. (Equivalente: con L'Hôpital, el límite $\frac{0}{0}$ exige $a=1$.)
4. **Valor.** Con $a=1$ solo queda el término constante, $\dfrac32$.

**$a=1$ y el límite vale $\dfrac32$.**

@@ 2
**a) Valores de $a$ y $b$.**
1. Pasa por $(2,3)$: $f(2)=\dfrac{4a+b}{a-2}=3\Rightarrow4a+b=3a-6\Rightarrow b=-a-6$.
2. Pendiente de la asíntota oblicua: $\displaystyle\lim_{x\to\infty}\frac{f(x)}{x}=\lim\frac{ax^2+b}{x(a-x)}=-a$. Debe valer $-4$, luego $a=4$.
3. Entonces $b=-a-6=-10$.

**$a=4,\ b=-10$**

**b) Tangente y normal en $x=1$** (con $a=2$, $b=3$).
1. La función es $f(x)=\dfrac{2x^2+3}{2-x}$. Derivada del cociente: $f'(x)=\dfrac{-2x^2+8x+3}{(2-x)^2}$.
2. En $x=1$: $f(1)=5$ y $f'(1)=9$.
3. Tangente: $y-5=9(x-1)$, es decir **$y=9x-4$**.
4. Normal: pendiente $-\frac19$, $y-5=-\frac19(x-1)$, es decir **$y=-\dfrac{x}{9}+\dfrac{46}{9}$**.

@@ 3
**Previo.** Se quita el valor absoluto: $f(x)=\begin{cases}x^2-x+1&x<1\\x^2+x-1&x\ge1\end{cases}$, con $f'(x)=2x-1$ si $x<1$ y $f'(x)=2x+1$ si $x>1$.

**a) Crecimiento y decrecimiento.**
1. Para $x<1$, $f'=0$ en $x=\frac12$; $f'<0$ a su izquierda y $f'>0$ a su derecha (hasta $x=1$).
2. Para $x>1$: $f'=2x+1>0$.

**Decrece en $\left(-\infty,\tfrac12\right)$ y crece en $\left(\tfrac12,+\infty\right)$** (mínimo relativo en $x=\frac12$).

**b) Integral.**
1. Se parte en $x=1$, donde cambia la expresión.
2. Cada trozo con Barrow:
$$\int_0^2f=\int_0^1(x^2-x+1)\,dx+\int_1^2(x^2+x-1)\,dx=\frac56+\frac{17}{6}.$$

**$\dfrac{11}{3}$**

@@ 4
**a) Recinto.**
1. Para $x\ge0$ se cumple $xe^x\ge x$ (igualdad solo en $x=0$, pues $xe^x=x\iff x(e^x-1)=0$).
2. El recinto está entre $y=x$ (debajo) y $y=xe^x$ (encima), desde $x=0$ hasta $x=2$.
3. Ambas curvas parten de $(0,0)$; en $x=2$ valen $2$ y $2e^2$.

![Recinto limitado por f(x)=x·eˣ, la recta y=x y la recta x=2](fig/2021-ext-sup-e4.svg){fig-alt="Recinto limitado por f(x)=x·eˣ, la recta y=x y la recta x=2" width="75%" fig-align="center"}

**b) Área.**
1. Una primitiva de $xe^x$ es $(x-1)e^x$ (por partes).
2. Barrow:

$$A=\int_0^2(xe^x-x)\,dx=\left[(x-1)e^x-\tfrac{x^2}{2}\right]_0^2=(e^2-2)-(-1).$$

**$A=e^2-1\approx6{,}389\ \text{u}^2$**

@@ 5
**a) Valores de $m$ con inversa.**
1. $A$ tiene inversa si y solo si $|A|\neq0$.
2. Restando la primera fila a las otras dos: $|A|=\begin{vmatrix}m&m&m\\0&1&0\\0&0&2\end{vmatrix}=2m$.

**Existe $A^{-1}$ si y solo si $m\neq0$.**

**b) $\left(\frac12A\right)^{-1}$ para $m=1$.**
1. Se usa $\left(kM\right)^{-1}=\frac1kM^{-1}$: $\left(\tfrac12A\right)^{-1}=2A^{-1}$.
2. $A=\begin{pmatrix}1&1&1\\1&2&1\\1&1&3\end{pmatrix}$ y $|A|=2$.
3. Se calcula $A^{-1}$ (adjunta traspuesta entre $2$) y se multiplica por $2$:

$$\left(\tfrac12A\right)^{-1}=\begin{pmatrix}5&-2&-1\\-2&2&0\\-1&0&1\end{pmatrix}$$

@@ 6
**Incógnitas.** $x$, $y$, $z$ = precios (€) de un café, una tostada y un zumo: $3x+y+2z=7{,}5$ y $4x+y+z=7{,}2$.

**a) Precio de $2x+y+3z$.**
1. Se busca una combinación de las dos ecuaciones que dé $(2,1,3)$: $(2,1,3)=2(3,1,2)-(4,1,1)$.
2. El precio es $2\cdot7{,}5-7{,}2=$ **$7{,}80$ €**.

**b) ¿Puede un zumo costar $2$ €?**
1. Restando las dos ecuaciones: $x-z=-0{,}3$, y de la segunda, $y=8{,}4-5z$.
2. Con $z=2$: $x=1{,}7$ pero $y=-1{,}6<0$, imposible.

**No, un zumo no puede costar 2 €** (la tostada saldría con precio negativo).

@@ 7
**Dato.** Normal de $\pi$: $\vec n=(1,-1,1)$.

**a) Simétrico de $P$.**
1. Recta por $P$ perpendicular a $\pi$: $(1+t,\,-t,\,1+t)$.
2. Se corta con $\pi$: $(1+t)+t+(1+t)+1=3t+3=0\Rightarrow t=-1$.
3. Proyección de $P$ sobre $\pi$ (punto medio): $M(0,1,0)$.
4. El simétrico es $2M-P$:

**$P'=(-1,2,-1)$**

**b) Distancia de $P$ a $\pi$.**
1. Fórmula: $d(P,\pi)=\dfrac{|1-0+1+1|}{\sqrt3}=$ **$\sqrt3$ u**

@@ 8
**Datos.** $r$: punto $(2,1,0)$, dirección $\vec u=(-2,1,-2)$. $s$: de $x+2y=3$, $2y+z=2$ con $y=\mu$: $(3-2\mu,\,\mu,\,2-2\mu)$, punto $(3,0,2)$, dirección $\vec v=(-2,1,-2)$.

**a) Posición relativa.**
1. $\vec u=\vec v$: las rectas son paralelas o coincidentes.
2. El vector que une los puntos es $(3,0,2)-(2,1,0)=(1,-1,2)$, que no es proporcional a $\vec u$: el punto de $s$ no está en $r$.

**Las rectas son paralelas y distintas.**

**b) Plano que contiene a $r$ y a $s$.**
1. Sí existe, porque las rectas paralelas siempre están en un plano.
2. Su normal es perpendicular a $\vec u$ y a $(1,-1,2)$: $\vec u\times(1,-1,2)=(0,2,1)$.
3. Pasa por $(2,1,0)$: $2\cdot1+0+k=0\Rightarrow k=-2$.

**$2y+z-2=0$**
