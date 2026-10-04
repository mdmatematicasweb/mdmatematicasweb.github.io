@@ 1
Sean $x$ las misiones e $y$ los programas. Inversión (en millones de euros): $0{,}2x+0{,}1y$. Restricciones:

- presupuesto: $0{,}2x+0{,}1y\le2{,}4\iff2x+y\le24$,
- inversión superior a 2 millones: $0{,}2x+0{,}1y\ge2\iff2x+y\ge20$,
- al menos 4 misiones: $x\ge4$,
- misiones no más de la mitad de los programas: $x\le\dfrac y2\iff2x\le y$.

Vértices: $(4,12)$, $(4,16)$, $(5,10)$ y $(6,12)$.

| Vértice | $(4,12)$ | $(4,16)$ | $(5,10)$ | $(6,12)$ |
|---|---|---|---|---|
| $F=0{,}6x+0{,}4y$ | $7{,}2$ | $8{,}8$ | $7$ | $8{,}4$ |

**Hay que llevar a cabo 4 misiones y 16 programas, y el máximo de $F$ es $8{,}8$.**

@@ 2
**a)** $A^2=\begin{pmatrix}2&0&2\\0&1&0\\2&0&2\end{pmatrix}$, $A^3=\begin{pmatrix}4&0&4\\0&1&0\\4&0&4\end{pmatrix}$, $A^4=\begin{pmatrix}8&0&8\\0&1&0\\8&0&8\end{pmatrix}$. Por tanto
$$A^n=\begin{pmatrix}2^{n-1}&0&2^{n-1}\\0&1&0\\2^{n-1}&0&2^{n-1}\end{pmatrix}.$$

**b)** $|B|=\left|\begin{matrix}1&0&2\\1&1&-1\\2&1&0\end{matrix}\right|=(0+1)+2(1-2)=-1\neq0$: **existe $B^{-1}$.**

**c)** Como $B$ es invertible y $C$ tiene 3 filas, **la ecuación $BX=C$ tiene solución única** $X=B^{-1}C$, con $B^{-1}=\begin{pmatrix}-1&-2&2\\2&4&-3\\1&1&-1\end{pmatrix}$:
$$X=\begin{pmatrix}-1&-2&2\\2&4&-3\\1&1&-1\end{pmatrix}\begin{pmatrix}1\\-3\\1\end{pmatrix}=\begin{pmatrix}7\\-13\\-3\end{pmatrix}.$$

@@ 3
**a)** En $x=1$: $\displaystyle\lim_{x\to1^-}f=a+b$ y $\displaystyle\lim_{x\to1^+}f=f(1)=1-b+a$. Igualando, $b=1-b$, **$b=\dfrac{1}{2}$.**

**b)** Con $b=\dfrac{1}{2}$: $f'(x)=a$ si $x<1$ y $f'(x)=2x-\dfrac{1}{2}$ si $x>1$. Derivable en $x=1$ si $a=2\cdot1-\dfrac{1}{2}$: **$a=\dfrac{3}{2}$.**

**c)** Con $a<0$ y $b=\dfrac{1}{2}$: si $x<1$, $f'(x)=a<0$ y **$f$ decrece en $(-\infty,1)$**; si $x>1$, $f'(x)=2x-\dfrac{1}{2}>0$ y **$f$ crece en $(1,+\infty)$**. Hay un **mínimo en la abscisa $x=1$** y no hay máximos.

**d)** Con $a=0$ y $b=\dfrac{1}{2}$: $f(x)=\dfrac{1}{2}$ si $x<1$ (recta horizontal) y $f(x)=x^2-\dfrac x2$ si $x\ge1$ (parábola desde $(1,\tfrac{1}{2})$, que pasa por $(2,3)$). La región es positiva en $[0,2]$:
$$A=\int_0^1\frac{1}{2}\,dx+\int_1^2\left(x^2-\frac x2\right)dx=\frac{1}{2}+\left[\frac{x^3}{3}-\frac{x^2}{4}\right]_1^2=\frac{1}{2}+\frac{5}{3}-\frac{1}{12}=\frac{25}{12}.$$
**$A=\dfrac{25}{12}\ \text{u}^2$**

@@ 4
**a)** $c'(t)=0{,}03t^2-0{,}9t+6=0\iff t^2-30t+200=0\iff t=10$ o $t=20$.

- $c'>0$ en $(0,10)$.
- $c'<0$ en $(10,20)$.
- $c'>0$ en $(20,24)$.

**$c$ es creciente en $(0,10)\cup(20,24)$** (y decreciente en $(10,20)$).

**b)** Los puntos críticos son $t=10$ y $t=20$. En $t=10$ pasa de crecer a decrecer: **máximo relativo en $t=10$**. En $t=20$ pasa de decrecer a crecer: **mínimo relativo en $t=20$**.

**c)** $c(t)=\displaystyle\int\left(0{,}03t^2-0{,}9t+6\right)dt=0{,}01t^3-0{,}45t^2+6t+K$, con $c(0)=50\Rightarrow K=50$.

**$c(t)=0{,}01t^3-0{,}45t^2+6t+50$.**

@@ 5
$P(A)=0{,}45$, $P(B)=0{,}21$, $P(C)=0{,}34$. Sea $D$ «defectuoso»: $P(D\mid A)=0{,}01$, $P(D\mid B)=0{,}03$, $P(D\mid C)=0{,}02$.

**a)** $P(D^C\cap C)=P(C)\cdot P(D^C\mid C)=0{,}34\cdot0{,}98=\mathbf{0{,}3332}$.

**b)** $P(D^C)=0{,}45\cdot0{,}99+0{,}21\cdot0{,}97+0{,}34\cdot0{,}98=0{,}4455+0{,}2037+0{,}3332=0{,}9824$.
$$P(A\mid D^C)=\frac{0{,}4455}{0{,}9824}=\frac{4455}{9824}\approx\mathbf{0{,}4535}.$$

@@ 6
**a)** Contagiar a cada una tiene probabilidad $0{,}8$, de forma independiente. $P(\text{las dos})=0{,}8\cdot0{,}8=\mathbf{0{,}64}$; $P(\text{alguna})=1-0{,}2\cdot0{,}2=1-0{,}04=\mathbf{0{,}96}$.

**b)** Sea $C$ «contagiado» y $+$ «resultado positivo»: $P(C)=0{,}8$, $P(+\mid C)=0{,}9$, $P(+\mid C^C)=0{,}05$.
$$P(+)=0{,}8\cdot0{,}9+0{,}2\cdot0{,}05=0{,}72+0{,}01=0{,}73,\qquad P(C\mid+)=\frac{0{,}72}{0{,}73}=\frac{72}{73}\approx\mathbf{0{,}9863}.$$

@@ 7
$\hat p=\dfrac{175}{500}=0{,}35$, $n=500$.

**a)** Nivel $94\,\%$: $\Phi(z_{\alpha/2})=0{,}97$. En la tabla $\Phi(1{,}88)=0{,}9699$ y $\Phi(1{,}89)=0{,}9706$, luego $z_{\alpha/2}=1{,}88$. Error: $E=1{,}88\sqrt{\dfrac{0{,}35\cdot0{,}65}{500}}=1{,}88\cdot0{,}02133=0{,}0401$.
$$IC=(0{,}35-0{,}0401,\ 0{,}35+0{,}0401)=(0{,}3099,\ 0{,}3901).$$

**b)** Nivel $97\,\%$: $\Phi(z_{\alpha/2})=0{,}985$ y en la tabla $\Phi(2{,}17)=0{,}9850$, luego $z_{\alpha/2}=2{,}17$. Con $E\le0{,}02$:
$$n\ge\frac{2{,}17^2\cdot0{,}35\cdot0{,}65}{0{,}02^2}=2\,678{,}19.$$
**Hay que seleccionar al menos $n=2\,679$ individuos.**

@@ 8
**a)** Nivel $97\,\%$: $z_{\alpha/2}=2{,}17$ (pues $\Phi(2{,}17)=0{,}9850$). Error: $E=2{,}17\cdot\dfrac{7}{\sqrt{300}}=2{,}17\cdot0{,}4041=0{,}877$.
$$IC=(168-0{,}877,\ 168+0{,}877)=(167{,}123,\ 168{,}877).$$

**b)** Nivel $94\,\%$: $z_{\alpha/2}=1{,}88$ (pues $\Phi(1{,}88)=0{,}9699\approx0{,}97$). Con $E<1{,}2$:
$$n>\left(\frac{1{,}88\cdot7}{1{,}2}\right)^2=120{,}27.$$
**Hay que tomar al menos $n=121$ mujeres.**
