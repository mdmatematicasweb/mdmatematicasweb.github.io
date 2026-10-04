@@ 1
**a)** $A\cdot B=\begin{pmatrix}1&-1&1\\-2&1&0\end{pmatrix}\begin{pmatrix}0&-1\\1&0\\-1&2\end{pmatrix}=\begin{pmatrix}-2&1\\1&2\end{pmatrix}$, con $|AB|=-5\neq0$ y $(AB)^{-1}=\begin{pmatrix}-\frac{2}{5}&\frac{1}{5}\\\frac{1}{5}&\frac{2}{5}\end{pmatrix}$. También $|C|=1\neq0$ y $C^{-1}=\begin{pmatrix}-2&3&1\\-1&1&1\\3&-3&-2\end{pmatrix}$. Entonces, con $I'=\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix}$,
$$X=(AB)^{-1}\,I'\,C^{-1}=\begin{pmatrix}-\frac{2}{5}&\frac{1}{5}\\\frac{1}{5}&\frac{2}{5}\end{pmatrix}\begin{pmatrix}-2&3&1\\-1&1&1\end{pmatrix}=\begin{pmatrix}\frac{3}{5}&-1&-\frac{1}{5}\\-\frac{4}{5}&1&\frac{3}{5}\end{pmatrix}.$$

**b)** $A$ es $2\times3$, luego $A\cdot D$ requiere que $D$ tenga $3$ filas; $E\cdot B$ requiere que $E$ tenga $3$ columnas (pues $B$ es $3\times2$) y $E\cdot B$ tendrá tantas filas como $E$. Para que ambos productos tengan la misma dimensión, $A\cdot D$ ($2\times$ columnas de $D$) $=E\cdot B$ ($($filas de $E)\times2$): $E$ tiene $2$ filas y $D$ tiene $2$ columnas.

**$D$ es $3\times2$ y $E$ es $2\times3$.**

@@ 2
Sean $x$ los bidones de pintura interior e $y$ los de exterior. Restricciones: $x+y\le160$; $x+y\ge60$; $x\ge20$; $y\ge x$. Gasto: $G(x,y)=1{,}5x+0{,}9y$.

Vértices: $(20,40)$ (corte de $x=20$ con $x+y=60$), $(20,140)$ (corte de $x=20$ con $x+y=160$), $(80,80)$ (corte de $y=x$ con $x+y=160$) y $(30,30)$ (corte de $y=x$ con $x+y=60$).

| Vértice | $(20,40)$ | $(20,140)$ | $(80,80)$ | $(30,30)$ |
|---|---|---|---|---|
| $G$ | $66$ | $156$ | $192$ | $72$ |

![Región factible del ejercicio 2 (2024-ord-res-a), con sus vértices: (20, 40), (30, 30), (80, 80), (20, 140)](fig/2024-ord-res-a-e2.svg){fig-alt="Región factible del ejercicio 2 (2024-ord-res-a), con sus vértices: (20, 40), (30, 30), (80, 80), (20, 140)" width="75%" fig-align="center"}

**Deben almacenarse 20 bidones de pintura interior y 40 de exterior, con un gasto diario mínimo de $66$ €.**

@@ 3
**a)** $f(t)=\displaystyle\int\left(400+30\sqrt t\right)dt=400t+20t^{3/2}+K$ y $f(0)=90\,000$, luego $K=90\,000$: $f(t)=90\,000+400t+20t\sqrt t$.

$f(9)=90\,000+3\,600+20\cdot27=94\,140$.

**Dentro de 9 meses habrá $94\,140$ habitantes.**

**b)** $\displaystyle\int_9^{16}f'(t)\,dt=f(16)-f(9)=(90\,000+6\,400+1\,280)-94\,140=97\,680-94\,140=3\,540$.

**Es el aumento de población entre el mes $9$ y el mes $16$: la localidad gana $3\,540$ habitantes.**

**c)** Tres años son $36$ meses. $f(36)-f(0)=400\cdot36+20\cdot216=14\,400+4\,320=18\,720$ nuevos habitantes.

**Ayuda: $18\,720\cdot150=2\,808\,000$ €.**

@@ 4
**a)** Continuidad en $x=1$: $3+e$ y $1+a+2=3+a$; luego $3+e=3+a$ y **$a=e$.**

Derivabilidad: $f'(x)=e^x$ si $x<1$ y $f'(x)=2x+a$ si $x>1$: $f'(1^-)=e$ y $f'(1^+)=2+a=2+e$. Como $e\neq2+e$: **$f$ no es derivable en $x=1$.**

**b)** Con $a=-3$, en $x=0$ la función es $f(x)=3+e^x$: $f(0)=4$ y $f'(0)=e^0=1$.

**$y=x+4$.**

**c)** Con $a=-3$, para $x\ge1$: $f(x)=x^2-3x+2=(x-1)(x-2)$, parábola que corta al eje $OX$ en $x=1$ y $x=2$ y que es positiva para $x>2$. En $[2,4]$:
$$A=\int_2^4\left(x^2-3x+2\right)dx=\left[\frac{x^3}{3}-\frac{3x^2}{2}+2x\right]_2^4=\frac{16}{3}-\frac{2}{3}=\frac{14}{3}.$$
**$A=\dfrac{14}{3}\ \text{u}^2$**

@@ 5
Sean $F$ «mujer» ($0{,}65$) y $H$ «hombre» ($0{,}35$). Mujeres: $M$ $50\,\%$, $XL$ $10\,\%$, luego $L$ $40\,\%$. Hombres: $L$ $40\,\%$, $XL$ $45\,\%$, luego $M$ $15\,\%$.

**a)** Mujeres que no usan $XL$: $100\,\%-10\,\%=\mathbf{90\,\%}$.

**b)** $P(L)=0{,}65\cdot0{,}4+0{,}35\cdot0{,}4=0{,}26+0{,}14=0{,}4$, luego **no usan la talla $L$ el $60\,\%$ de los clientes.**

**c)** $P(M)=0{,}65\cdot0{,}5+0{,}35\cdot0{,}15=0{,}325+0{,}0525=0{,}3775$.
$$P(F\mid M)=\frac{0{,}325}{0{,}3775}=\frac{130}{151}\approx0{,}8609.$$
**El $86{,}09\,\%$ de los clientes que usan la talla $M$ son mujeres.**

@@ 6
**a)** $P(B^C\mid A)=\dfrac{P(A)-P(A\cap B)}{P(A)}=\dfrac{0{,}75-0{,}35}{0{,}75}=\dfrac{0{,}4}{0{,}75}=\dfrac{8}{15}\approx\mathbf{0{,}5333}$.

**b)** $P(A\cup B)=0{,}75+0{,}55-0{,}35=\mathbf{0{,}95}$.

**c)** $P(A^C\cap B^C)=1-P(A\cup B)=1-0{,}95=\mathbf{0{,}05}$.

**d)** $P(A\mid A\cup B)=\dfrac{P(A)}{P(A\cup B)}=\dfrac{0{,}75}{0{,}95}=\dfrac{15}{19}\approx\mathbf{0{,}7895}$.

**e)** $P(A)P(B)=0{,}75\cdot0{,}55=0{,}4125\neq0{,}35=P(A\cap B)$: **no son independientes.**

@@ 7
**a)** $\hat p=\dfrac{710}{2000}=0{,}355$. Nivel $96{,}5\,\%$: $\Phi(z_{\alpha/2})=0{,}9825$ y en la tabla $\Phi(2{,}11)=0{,}9826$ (el más cercano), luego $z_{\alpha/2}=2{,}11$. $E=2{,}11\sqrt{\dfrac{0{,}355\cdot0{,}645}{2000}}=2{,}11\cdot0{,}0107=0{,}0226$.
$$IC=(0{,}355-0{,}0226,\ 0{,}355+0{,}0226)=(0{,}3324,\ 0{,}3776).$$

**b)** Nivel $98\,\%$: $z_{\alpha/2}=2{,}33$. Con $\hat p=0{,}37$ y $E\le0{,}015$:
$$n\ge\frac{2{,}33^2\cdot0{,}37\cdot0{,}63}{0{,}015^2}=5\,624{,}34.$$
**Hace falta una muestra de al menos $n=5\,625$ universitarias.**

@@ 8
**a)** La media muestral es el punto medio del intervalo: $\bar x=\dfrac{517{,}65+551{,}95}{2}=\mathbf{534{,}8}$ €. El error es la semiamplitud: $E=\dfrac{551{,}95-517{,}65}{2}=17{,}15$. Nivel $95\,\%$: $E=1{,}96\cdot\dfrac{140}{\sqrt n}=17{,}15\Rightarrow\sqrt n=\dfrac{1{,}96\cdot140}{17{,}15}=16\Rightarrow n=256$.

**Media muestral $534{,}8$ € y tamaño de la muestra $n=256$.**

**b)** Nivel $97\,\%$: $z_{\alpha/2}=2{,}17$. $E=2{,}17\cdot\dfrac{140}{\sqrt{78}}=2{,}17\cdot15{,}8519=34{,}3986$.

**Error máximo $\approx34{,}4$ €.**

**c)** $X\sim N(540,\ 150)$. $P(600<X<700)=P\!\left(\dfrac{600-540}{150}<Z<\dfrac{700-540}{150}\right)=P(0{,}4<Z<1{,}07)=0{,}8577-0{,}6554=\mathbf{0{,}2023}$.
