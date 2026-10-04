@@ 1
**a)** $C\cdot A$: $C$ es $3\times1$ y $A$ es $3\times3$; el número de columnas de $C$ (1) no coincide con el de filas de $A$ (3): **no se puede efectuar.**

$A+B$: ambas son $3\times3$, **sí se puede:**
$$A+B=\begin{pmatrix}2&-1&2\\-2&-2&0\\3&-2&1\end{pmatrix}.$$

$C^t\cdot B^t$: $C^t$ es $1\times3$ y $B^t$ es $3\times3$, **sí se puede** y el resultado es $1\times3$:
$$C^tB^t=\begin{pmatrix}3&-7&-2\end{pmatrix}\begin{pmatrix}1&-1&1\\-1&-1&-1\\1&-1&1\end{pmatrix}=\begin{pmatrix}8&6&8\end{pmatrix}.$$

**b)** $AX=BX+C\Rightarrow(A-B)X=C$, con $A-B=\begin{pmatrix}0&1&0\\0&0&2\\1&0&-1\end{pmatrix}$ y $|A-B|=2\neq0$. Entonces $X=(A-B)^{-1}C$:
$$X=\begin{pmatrix}0&\frac{1}{2}&1\\1&0&0\\0&\frac{1}{2}&0\end{pmatrix}\begin{pmatrix}3\\-7\\-2\end{pmatrix}=\begin{pmatrix}-\frac{11}{2}\\3\\-\frac{7}{2}\end{pmatrix}.$$

@@ 2
Sean $x$ los lotes de tipo A e $y$ los de tipo B. Restricciones: cuadernos $2x+3y\le400$; estuches $2x+y\le300$; $y\le100$; $x\ge0$, $y\ge0$. Ventas: $V(x,y)=35x+45y$.

Vértices: $(0,0)$, $(0,100)$, $(50,100)$, $(125,50)$ (corte de $2x+3y=400$ con $2x+y=300$) y $(150,0)$.

| Vértice | $(0,0)$ | $(0,100)$ | $(50,100)$ | $(125,50)$ | $(150,0)$ |
|---|---|---|---|---|---|
| $V$ | $0$ | $4\,500$ | $6\,250$ | $6\,625$ | $5\,250$ |

![Región factible del ejercicio 2 (2022-ord-res), con sus vértices: (0, 0), (150, 0), (125, 50), (50, 100), (0, 100)](fig/2022-ord-res-e2.svg){fig-alt="Región factible del ejercicio 2 (2022-ord-res), con sus vértices: (0, 0), (150, 0), (125, 50), (50, 100), (0, 100)" width="75%" fig-align="center"}

**Debe vender 125 lotes de tipo A y 50 de tipo B, con un valor máximo de ventas de $6\,625$ €.**

@@ 3
**a)** En $x=-1$: $\displaystyle\lim_{x\to-1^-}f=4-16+17=5$ y $f(-1)=\dfrac{1}{3}(10+5)=5$: **continua.** Derivadas laterales: $f'(-1^-)=8x+16=8$ y $f'(-1^+)=-\dfrac{5}{3}$: **no derivable en $x=-1$.**

En $x=2$: $f(2)=\dfrac{1}{3}(10-10)=0$ y $\displaystyle\lim_{x\to2^+}f=\dfrac{3}{2}$: **discontinuidad de salto finito**, luego no derivable.

**$f$ es continua en $\mathbb R\setminus\{2\}$ y derivable en $\mathbb R\setminus\{-1,2\}$.**

**b)** Para $x<-1$: parábola $y=4x^2+16x+17$ (vértice $(-2,1)$, pasa por $(-1,5)$). Para $-1\le x\le2$: segmento de recta de $(-1,5)$ a $(2,0)$. Para $x>2$: recta horizontal $y=\dfrac{3}{2}$ (con el punto «abierto» en $\left(2,\dfrac{3}{2}\right)$).

![Gráfica de f: parábola 4x²+16x+17 hasta x=−1, segmento de (−1,5) a (2,0) y recta horizontal y=3/2 desde x=2 (salto en x=2); recinto sombreado entre x=−2 y x=2](fig/2022-ord-res-e3.svg){fig-alt="Gráfica de f: parábola 4x²+16x+17 hasta x=−1, segmento de (−1,5) a (2,0) y recta horizontal y=3/2 desde x=2 (salto en x=2); recinto sombreado entre x=−2 y x=2" width="75%" fig-align="center"}

**c)** En $[-2,2]$, $f\ge0$ ($4x^2+16x+17$ no se anula, $\Delta<0$):
$$A=\int_{-2}^{-1}\left(4x^2+16x+17\right)dx+\int_{-1}^{2}\frac{10-5x}{3}\,dx=\frac{7}{3}+\frac{15}{2}=\frac{59}{6}.$$
**$A=\dfrac{59}{6}\ \text{u}^2$**

@@ 4
**a)** Pendiente $-3$: $f'(x)=9x^2-12x=-3\iff3x^2-4x+1=0\iff x=1$ o $x=\dfrac{1}{3}$.

- $x=1$: $f(1)=2$ y tangente $y-2=-3(x-1)$, **$y=-3x+5$**.
- $x=\dfrac{1}{3}$: $f\left(\frac{1}{3}\right)=\dfrac{40}{9}$ y tangente $y-\dfrac{40}{9}=-3\left(x-\dfrac{1}{3}\right)$, **$y=-3x+\dfrac{49}{9}$**.

**b)** $F(x)=\displaystyle\int\left(3x^3-6x^2+5\right)dx=\frac{3x^4}{4}-2x^3+5x+K$. Con $F(2)=12-16+10+K=4$ resulta $K=-2$.

**$F(x)=\dfrac{3x^4}{4}-2x^3+5x-2$.**

@@ 5
**a)** $P(A\cap B)=P(A)+P(B)-P(A\cup B)=0{,}7+0{,}6-0{,}8=\mathbf{0{,}5}$.

**b)** $P(A^C\cap B^C)=1-P(A\cup B)=1-0{,}8=\mathbf{0{,}2}$.

**c)** $P(A\cap B^C)=P(A)-P(A\cap B)=0{,}7-0{,}5=\mathbf{0{,}2}$.

**d)** $P(A\mid B^C)=\dfrac{P(A\cap B^C)}{P(B^C)}=\dfrac{0{,}2}{0{,}4}=\mathbf{0{,}5}$.

@@ 6
Sea $A$ «ha bebido alcohol» y $+$ «test positivo»: $P(A)=0{,}05$, $P(+\mid A)=0{,}96$, $P(+\mid A^C)=0{,}1$.

**a)** $P(+)=0{,}05\cdot0{,}96+0{,}95\cdot0{,}1=0{,}048+0{,}095=0{,}143$.
$$P(A\mid+)=\frac{0{,}048}{0{,}143}=\frac{48}{143}\approx\mathbf{0{,}3357}.$$

**b)** $P(-\cap A^C)=0{,}95\cdot0{,}9=\mathbf{0{,}855}$.

**c)** $P(-)=1-0{,}143=0{,}857$ y $P(A^C\mid-)=\dfrac{0{,}855}{0{,}857}=\dfrac{855}{857}\approx\mathbf{0{,}9977}$.

@@ 7
$\hat p=\dfrac{96}{120}=0{,}8$, $n=120$.

**a)** Nivel $95\,\%$: $z_{\alpha/2}=1{,}96$. $E=1{,}96\sqrt{\dfrac{0{,}8\cdot0{,}2}{120}}=1{,}96\cdot0{,}03651=0{,}0716$.
$$IC=(0{,}8-0{,}0716,\ 0{,}8+0{,}0716)=(0{,}7284,\ 0{,}8716).$$

**b)** Nivel $97\,\%$: $z_{\alpha/2}=2{,}17$ (pues $\Phi(2{,}17)=0{,}9850$). Con $E\le0{,}05$:
$$n\ge\frac{2{,}17^2\cdot0{,}8\cdot0{,}2}{0{,}05^2}=301{,}37.$$
**Hacen falta al menos $n=302$ clientes.**

@@ 8
$\sigma=\sqrt{4225}=65$ kWh.

**a)** $\bar x=\dfrac{26\,830}{100}=268{,}3$. Nivel $92\,\%$: $z_{\alpha/2}=1{,}75$ y $E=1{,}75\cdot\dfrac{65}{\sqrt{100}}=11{,}375$.
$$IC=(268{,}3-11{,}375,\ 268{,}3+11{,}375)=(256{,}925,\ 279{,}675).$$

**b)** Nivel $98\,\%$: $\Phi(z_{\alpha/2})=0{,}99$ y en la tabla $\Phi(2{,}33)=0{,}9901$ (el más cercano a $0{,}99$), luego $z_{\alpha/2}=2{,}33$. Con $E\le5$:
$$n\ge\left(\frac{2{,}33\cdot65}{5}\right)^2=917{,}48.$$
**Hacen falta al menos $n=918$ viviendas.**

**c)** La media muestral es el punto medio del intervalo: $\bar x=\dfrac{224{,}08+255{,}92}{2}=\mathbf{240}$ kWh.
