@@ 1
**a) Recta tangente y recta normal en el punto de inflexión.**
1. Derivadas (producto): $f'(x)=e^{x}+(x-1)e^{x}=xe^{x}$ y $f''(x)=(x+1)e^{x}$.
2. Punto de inflexión: $f''(x)=0\Rightarrow x=-1$, y $f''$ cambia de signo ahí (negativa a la izquierda, positiva a la derecha). El punto es $\left(-1,-\dfrac2e\right)$, porque $f(-1)=(-2)e^{-1}$.
3. Pendiente de la tangente: $f'(-1)=-\dfrac1e$.
4. Tangente: $y+\dfrac2e=-\dfrac1e(x+1)$, es decir, **$y=-\dfrac{x}{e}-\dfrac3e$**.
5. La normal es perpendicular a la tangente: su pendiente es $-\dfrac{1}{-1/e}=e$. Normal: $y+\dfrac2e=e(x+1)$, es decir, **$y=ex+e-\dfrac2e$**.

**b) Asíntotas.**
1. Verticales: ninguna, porque $f$ es continua en todo $\mathbb R$.
2. En $-\infty$: $\displaystyle\lim_{x\to-\infty}(x-1)e^{x}=0$ (la exponencial gana al polinomio), así que **$y=0$ es asíntota horizontal en $-\infty$**.
3. En $+\infty$: el límite es $+\infty$, luego no hay horizontal; y $\dfrac{f(x)}{x}=\dfrac{(x-1)e^{x}}{x}\to+\infty$, luego tampoco hay oblicua.

**Solo hay la asíntota horizontal $y=0$ en $-\infty$; no hay asíntota horizontal ni oblicua en $+\infty$.**

@@ 2
**a) Recinto.**
1. $f(x)=(x-1)^2$ es una parábola de vértice $(1,0)$ abierta hacia arriba.
2. La recta horizontal $y=a$ la corta en $x=1\pm\sqrt a$ (de $(x-1)^2=a$).
3. El recinto acotado es el segmento parabólico entre ambos puntos: por encima de la parábola y por debajo de la recta.

![Recinto limitado por la parábola f(x)=(x−1)² y la recta y=a (a>0), con los cortes en x=1±√a](fig/2025-ord-sup1-e2.svg){fig-alt="Recinto limitado por la parábola f(x)=(x−1)² y la recta y=a (a>0), con los cortes en x=1±√a" width="75%" fig-align="center"}

**b) Valor de $a$.**
1. Se traslada el recinto con $t=x-1$: ahora la parábola es $t^2$ y los límites son $-\sqrt a$ y $\sqrt a$.
2. Área (recta menos parábola), con simetría respecto de $t=0$:
$$A=\int_{-\sqrt a}^{\sqrt a}\big(a-t^2\big)dt=2\left[at-\frac{t^3}{3}\right]_0^{\sqrt a}=\frac43a^{3/2}.$$
3. Se iguala al área dada: $\dfrac43a^{3/2}=\dfrac43\Rightarrow a^{3/2}=1$.

**$a=1$.**

@@ 3
**Planteamiento.** Se parte la integral en $x=0$, donde cambia la expresión de $f$.

1. **Tramo $x\le0$** (por partes, con $u=x$ y $dv=\operatorname{sen}(2x)\,dx$):
$$\int_{-\pi/4}^{0}x\operatorname{sen}(2x)dx=\Big[-\dfrac{x\cos2x}{2}+\dfrac{\operatorname{sen}2x}{4}\Big]_{-\pi/4}^{0}=0-\Big(0-\dfrac14\Big)=\dfrac14.$$
(En $-\pi/4$: $\cos\left(-\dfrac\pi2\right)=0$ y $\operatorname{sen}\left(-\dfrac\pi2\right)=-1$.)
2. **Tramo $x>0$:**
$$\int_0^1(\cos\pi x-1)dx=\Big[\dfrac{\operatorname{sen}\pi x}{\pi}-x\Big]_0^1=-1.$$
3. **Suma:**
$$\int_{-\pi/4}^1f=\frac14-1=\mathbf{-\frac34}.$$

*Interpretación:* es una integral con signo; en el tramo $x>0$ la función es negativa y su parte negativa pesa más que el tramo positivo.

@@ 4
**a) Área del triángulo.**
1. Vectores desde $A$: $\overrightarrow{AB}=(-2,4,-4)$ y $\overrightarrow{AC}=(-5,-1,0)$.
2. Producto vectorial: $\overrightarrow{AB}\times\overrightarrow{AC}=(-4,20,22)$.
3. El área del triángulo es la mitad del módulo del producto vectorial:
$$\text{Área}=\tfrac12\sqrt{16+400+484}=\tfrac12\sqrt{900}=\mathbf{15}\ u^2.$$

**b) Puntos $D$ del eje $OZ$.**
1. Un punto del eje $OZ$ es $D(0,0,z)$, y $\overrightarrow{AD}=(-3,1,z-1)$.
2. Producto mixto: $(\overrightarrow{AB}\times\overrightarrow{AC})\cdot\overrightarrow{AD}=12+20+22(z-1)=22z+10$.
3. El volumen del tetraedro es $V=\dfrac{|22z+10|}{6}=20$, luego $22z+10=\pm120$.
4. Dos soluciones: $z=5$ y $z=-\dfrac{65}{11}$.

**$D(0,0,5)$ y $D\left(0,0,-\dfrac{65}{11}\right)$.**

@@ 5
**a) Simétrico de $P$ respecto de $\pi$.**
1. Recta perpendicular a $\pi$ por $P$ (dirección la normal $(2,1,2)$): $(1+2t,\,t,\,1+2t)$.
2. Se corta con $\pi$: $2(1+2t)+t+2(1+2t)+5=9t+9=0\Rightarrow t=-1$.
3. El punto de corte es la proyección de $P$ sobre el plano, el punto medio $M(-1,-1,-1)$.
4. El simétrico cumple $M=\dfrac{P+P'}{2}$, luego $P'=2M-P$:

**$P'=(-3,-2,-3)$.**

**b) Planos paralelos a $\pi$ a distancia $2$.**
1. Los paralelos tienen la forma $2x+y+2z+D=0$ (misma normal).
2. La distancia entre dos planos paralelos es $\dfrac{|D-5|}{\sqrt{4+1+4}}=\dfrac{|D-5|}{3}=2$, luego $|D-5|=6$.
3. $D=11$ o $D=-1$.

**$2x+y+2z+11=0$ y $2x+y+2z-1=0$.**

@@ 6
**a) Cuándo hay inversa.**
1. $A$ tiene inversa si y solo si $|A|\neq0$.
2. Desarrollando por la primera columna: $|A|=\alpha(\alpha-4)(\alpha+2)$.
3. Se anula en $\alpha=0$, $\alpha=4$ y $\alpha=-2$.

**$A$ admite inversa si $\alpha\neq0,\ \alpha\neq4,\ \alpha\neq-2$.**

**b) Inversa para $\alpha=1$.**
1. La matriz es $A=\begin{pmatrix}1&5&0\\1&1&1\\0&5&1\end{pmatrix}$ y $|A|=-9\neq0$, luego existe $A^{-1}$.
2. Se calcula la matriz adjunta, se traspone y se divide entre $|A|=-9$.

**Con la matriz adjunta:**
$$\mathbf{A^{-1}}=\frac{1}{9}\begin{pmatrix}4&5&-5\\1&-1&1\\-5&5&4\end{pmatrix}.$$

(Comprobación: $A\cdot A^{-1}=I$.)

@@ 7
**Valores de la tabla.** Los extremos se tipifican con $Z=\dfrac{X-\mu}{\sigma}$ y se redondean a dos decimales.

**a) Circunstancias ideales:** $X\sim N(13;\,0{,}1)$.
1. $z_1=\dfrac{12{,}9-13}{0{,}1}=-1$ y $z_2=\dfrac{13{,}15-13}{0{,}1}=1{,}5$.
2. $P(12{,}9<X<13{,}15)=P(-1<Z<1{,}5)=\Phi(1{,}5)-\Phi(-1)$.
3. Por simetría, $\Phi(-1)=1-\Phi(1)=1-0{,}8413$. Con $\Phi(1{,}5)=0{,}9332$:
$$P=0{,}9332-(1-0{,}8413)=\mathbf{0{,}7745}.$$

**b) El 15 de julio:** $X\sim N(12{,}9;\,0{,}2)$.
1. $z_1=\dfrac{12{,}9-12{,}9}{0{,}2}=0$ y $z_2=\dfrac{13{,}15-12{,}9}{0{,}2}=1{,}25$.
2. $P(12{,}9<X<13{,}15)=P(0<Z<1{,}25)=\Phi(1{,}25)-0{,}5=0{,}8944-0{,}5=\mathbf{0{,}3944}$.

*Interpretación:* tras la avería, la máquina descentrada y más imprecisa produce rodamientos óptimos solo en torno al $39\,\%$ de los casos, frente al $77\,\%$ en condiciones ideales.
