@@ 1
Sean $x$ los aficionados locales e $y$ los visitantes. Restricciones: aforo $x+y\le10\,000$; visitantes $y\le3\,000$; al menos dos locales por visitante $x\ge2y$; como máximo cuatro $x\le4y$; $y\ge0$. Con el descuento, la entrada local cuesta $0{,}8\cdot50=40$ €. Importe: $I(x,y)=40x+50y$.

Vértices: $(0,0)$, $(6\,000,3\,000)$ (corte de $x=2y$ con $y=3\,000$), $(7\,000,3\,000)$ (corte de $x+y=10\,000$ con $y=3\,000$) y $(8\,000,2\,000)$ (corte de $x+y=10\,000$ con $x=4y$).

| Vértice | $(0,0)$ | $(6\,000,3\,000)$ | $(7\,000,3\,000)$ | $(8\,000,2\,000)$ |
|---|---|---|---|---|
| $I$ | $0$ | $390\,000$ | $430\,000$ | $420\,000$ |

![Región factible del ejercicio 1 (2023-ord-sup-a), con sus vértices: (0, 0), (8000, 2000), (7000, 3000), (6000, 3000)](fig/2023-ord-sup-a-e1.svg){fig-alt="Región factible del ejercicio 1 (2023-ord-sup-a), con sus vértices: (0, 0), (8000, 2000), (7000, 3000), (6000, 3000)" width="75%" fig-align="center"}

**Deben asistir $7\,000$ aficionados locales y $3\,000$ visitantes, con un importe de $430\,000$ €.**

@@ 2
**a1)** $|A|=\left|\begin{matrix}1&-1&0\\0&m&-2\\1&m&4\end{matrix}\right|=(4m+2m)+(0+2)=6m+2$. Tiene inversa si $|A|\neq0$: **$m\neq-\dfrac{1}{3}$.**

**a2)** Para $m=1$, $|A|=8$ y
$$A^{-1}=\frac{1}{8}\begin{pmatrix}6&4&2\\-2&4&2\\-1&-2&1\end{pmatrix}=\begin{pmatrix}\frac{3}{4}&\frac{1}{2}&\frac{1}{4}\\-\frac{1}{4}&\frac{1}{2}&\frac{1}{4}\\-\frac{1}{8}&-\frac{1}{4}&\frac{1}{8}\end{pmatrix}.$$

**b)** $XB-B^2+B=0\Rightarrow XB=B^2-B$. Multiplicando por $B^{-1}$ por la derecha: $X=\left(B^2-B\right)B^{-1}=B-I$.

**$X=B-I$.**

@@ 3
**a)** Continuidad en $x=2{,}5$: $6{,}25a+2{,}5b+6=-1{,}4\cdot2{,}5+7=3{,}5$, es decir, $6{,}25a+2{,}5b=-2{,}5$. Máximo en $x=1$: $f'(1)=2a+b=0\Rightarrow b=-2a$. Sustituyendo, $6{,}25a-5a=1{,}25a=-2{,}5\Rightarrow a=-2$ y $b=4$.

**$a=-2$ y $b=4$.** (Comprobación: $f(x)=-2x^2+4x+6$ tiene un máximo en $x=1$, $f(1)=8$, y $f''=-4<0$.)

**b)** $g(x)=-2(x-2)(x+1)$: parábola abierta hacia abajo, que corta al eje $OX$ en $x=-1$ y $x=2$, al eje $OY$ en $(0,4)$ y con vértice $\left(\dfrac{1}{2},\dfrac{9}{2}\right)$.
$$A=\int_{-1}^{2}\left(-2x^2+2x+4\right)dx=\left[-\frac{2x^3}{3}+x^2+4x\right]_{-1}^{2}=\frac{20}{3}-\left(-\frac{7}{3}\right)=9.$$
**$A=9\ \text{u}^2$**

@@ 4
**a)** En $x=2$: $\dfrac{2^2}{3}=\dfrac{4}{3}$ y $\dfrac{4}{2+1}=\dfrac{4}{3}$: **continua en $x=2$.** Dentro de cada tramo es continua (el segundo no se anula en el denominador para $x>2$): **$f$ es continua en $[0,+\infty)$.**

$f'(x)=\dfrac{2x}{3}$ si $0<x<2$ y $f'(x)=-\dfrac{4}{(x+1)^2}$ si $x>2$. En $x=2$: $f'(2^-)=\dfrac{4}{3}\neq f'(2^+)=-\dfrac{4}{9}$: **no es derivable en $x=2$** (sí en $(0,2)\cup(2,+\infty)$).

**b)** $f'>0$ en $(0,2)$ y $f'<0$ en $(2,+\infty)$. **$f$ crece en $(0,2)$ y decrece en $(2,+\infty)$; máximo en $\left(2,\dfrac{4}{3}\right)$.**

Gráfica: arco de parábola $y=\dfrac{x^2}{3}$ desde $(0,0)$ hasta el pico $\left(2,\dfrac{4}{3}\right)$, y desde ahí la rama de hipérbola $y=\dfrac{4}{x+1}$ decreciente, con asíntota horizontal $y=0$ (pasa por $(3,1)$).

@@ 5
Sean $T$ «jugó sobre tierra» y $G$ «ganó»: $P(T)=\dfrac{25}{40}=\dfrac{5}{8}$, $P(T^C)=\dfrac{3}{8}$, $P(G\mid T)=0{,}9$, $P(G\mid T^C)=0{,}5$.

**a)** $P(G)=\dfrac{5}{8}\cdot0{,}9+\dfrac{3}{8}\cdot0{,}5=0{,}5625+0{,}1875=\mathbf{0{,}75}$.

**b)** $P(G^C\mid T)=1-0{,}9=\mathbf{0{,}1}$.

**c)** $P(T\mid G)=\dfrac{P(T)\,P(G\mid T)}{P(G)}=\dfrac{0{,}5625}{0{,}75}=\mathbf{0{,}75}$.

@@ 6
Sean $W$ «tiene página web» y $C$ «vende por comercio electrónico»: $P(W)=0{,}32$, $P(W^C\cap C^C)=0{,}646$, $P(C\mid W)=0{,}3$.

**a)** $P(W\cup C)=1-P(W^C\cap C^C)=1-0{,}646=\mathbf{0{,}354}$.

**b)** $P(W\cap C)=0{,}32\cdot0{,}3=0{,}096$. Como $P(W\cup C)=P(W)+P(C)-P(W\cap C)$: $0{,}354=0{,}32+P(C)-0{,}096$, de donde $P(C)=\mathbf{0{,}13}$.

**c)** $P(W^C\cap C)=P(C)-P(W\cap C)=0{,}13-0{,}096=\mathbf{0{,}034}$.

**d)** $P(W)P(C)=0{,}32\cdot0{,}13=0{,}0416\neq0{,}096=P(W\cap C)$: **no son independientes.** $P(W\cap C)=0{,}096\neq0$: **no son incompatibles.**

@@ 7
**a)** Nivel $97{,}5\,\%$: $\Phi(z_{\alpha/2})=0{,}9875$, y en la tabla $\Phi(2{,}24)=0{,}9875$: $z_{\alpha/2}=2{,}24$. $E=2{,}24\cdot\dfrac{5}{\sqrt{100}}=1{,}12$.
$$IC=(53-1{,}12,\ 53+1{,}12)=(51{,}88,\ 54{,}12).$$

**b)** $\bar X\sim N\!\left(53,\ \dfrac{5}{\sqrt{64}}\right)=N(53,\ 0{,}625)$.
$$P(\bar X>53{,}25)=P\!\left(Z>\frac{53{,}25-53}{0{,}625}\right)=P(Z>0{,}4)=1-0{,}6554=\mathbf{0{,}3446}.$$

@@ 8
$\hat p=\dfrac{90}{300}=0{,}3$, $n=300$.

**a)** Nivel $97\,\%$: $z_{\alpha/2}=2{,}17$. $E=2{,}17\sqrt{\dfrac{0{,}3\cdot0{,}7}{300}}=2{,}17\cdot0{,}02646=0{,}0574$.
$$IC=(0{,}3-0{,}0574,\ 0{,}3+0{,}0574)=(0{,}2426,\ 0{,}3574).$$

**b)** Nivel $95\,\%$: $z_{\alpha/2}=1{,}96$. $E\le0{,}03\iff n\ge\dfrac{1{,}96^2\cdot0{,}3\cdot0{,}7}{0{,}03^2}=896{,}37$. **Hay que seleccionar al menos $n=897$ asegurados.**
