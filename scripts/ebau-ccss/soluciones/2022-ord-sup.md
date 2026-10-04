@@ 1
Sean $x$ los ajedreces e $y$ los dominós diarios. Restricciones: $x+y\ge3$; madera $2x+y\le7$; horas $4x+y\le9$; $x\ge0$, $y\ge0$. Ganancia: $G(x,y)=40x+15y$.

Vértices: $(0,3)$, $(0,7)$, $(1,5)$ (corte de $2x+y=7$ con $4x+y=9$) y $(2,1)$ (corte de $4x+y=9$ con $x+y=3$).

| Vértice | $(0,3)$ | $(0,7)$ | $(1,5)$ | $(2,1)$ |
|---|---|---|---|---|
| $G$ | $45$ | $105$ | $115$ | $95$ |

![Región factible del ejercicio 1 (2022-ord-sup), con sus vértices: (0, 3), (2, 1), (1, 5), (0, 7)](fig/2022-ord-sup-e1.svg){fig-alt="Región factible del ejercicio 1 (2022-ord-sup), con sus vértices: (0, 3), (2, 1), (1, 5), (0, 7)" width="75%" fig-align="center"}

**Deben fabricarse 1 ajedrez y 5 dominós al día, con una ganancia máxima de $115$ €.**

@@ 2
**a)** $XA=A^t-3I_3$, y $|A|=10\neq0$, así que $X=\left(A^t-3I_3\right)A^{-1}$. Con $A^t-3I_3=\begin{pmatrix}4&3&-5\\-6&-2&0\\-2&4&-7\end{pmatrix}$ y $A^{-1}=\begin{pmatrix}-\frac{2}{5}&-\frac{12}{5}&-\frac{11}{5}\\-\frac{4}{5}&-\frac{19}{5}&-\frac{17}{5}\\\frac{1}{2}&3&\frac{5}{2}\end{pmatrix}$:
$$X=\begin{pmatrix}-\frac{13}{2}&-36&-\frac{63}{2}\\4&22&20\\-\frac{59}{10}&-\frac{157}{5}&-\frac{267}{10}\end{pmatrix}.$$

**b)** $C^t$ es $3\times2$ y $D$ es $2\times3$, luego $C^tD$ es $3\times3$:
$$C^tD=\begin{pmatrix}1&-2\\2&-3\\-1&0\end{pmatrix}\begin{pmatrix}a^2&0&-1\\1&-1&a\end{pmatrix}=\begin{pmatrix}a^2-2&2&-1-2a\\2a^2-3&3&-2-3a\\-a^2&0&1\end{pmatrix}.$$
Igualando con $B$: $a^2-2=2$, $-1-2a=3$, $2a^2-3=5$, $-2-3a=4$ y $-a^2=-4$. Todas se cumplen solo para $a=-2$.

**Sí existe: $a=-2$.**

@@ 3
**a)** $B(x)=-(x-4)(x-12)>0\iff4<x<12$. Con $x\le10$: **hay beneficios si fumiga más de 4 y hasta 10 hectáreas** ($4<x\le10$).

**b)** $B'(x)=-2x+16=0\Rightarrow x=8$ y $B''<0$: máximo. $B(8)=-64+128-48=16$. **Debe fumigar 8 hectáreas y el beneficio máximo es de 16 mil euros ($16\,000$ €).**

**c)** $B(x)=7\iff-x^2+16x-48=7\iff x^2-16x+55=0\iff x=5$ o $x=11$. Como $x\le10$, **ha fumigado 5 hectáreas.**

@@ 4
**a)** Continuidad en $x=1$: $a+b+1=2$, es decir $a+b=1$. Derivabilidad: $f'(x)=2ax+b$ si $x<1$ y $f'(x)=-\dfrac{2}{x^2}$ si $x>1$, luego $2a+b=-2$. Restando, $a=-3$ y $b=4$.

**$a=-3$ y $b=4$.**

**b)** Con $a=-3$, $b=4$: si $x\le1$, $f(x)=-3x^2+4x+1$, $f'(x)=-6x+4=0\Rightarrow x=\dfrac{2}{3}$, con $f''=-6<0$: máximo, $f\left(\dfrac{2}{3}\right)=\dfrac{7}{3}$. Si $x>1$, $f'(x)=-\dfrac{2}{x^2}<0$ (no hay extremos), y en $x=1$ es derivable con $f'(1)=-2<0$.

**Máximo relativo en $\left(\dfrac{2}{3},\dfrac{7}{3}\right)$; no hay mínimos relativos.**

**c)** Con $a=-2$, $b=3$:
$$\int_{-1}^{3}f=\int_{-1}^{1}\left(-2x^2+3x+1\right)dx+\int_1^3\frac2x\,dx=\left[-\frac{2x^3}{3}+\frac{3x^2}{2}+x\right]_{-1}^{1}+\left[2\ln x\right]_1^3=\frac{2}{3}+2\ln3.$$
**$\displaystyle\int_{-1}^{3}f(x)\,dx=\dfrac{2}{3}+2\ln3\approx2{,}864$**

@@ 5
Hay $36$ resultados posibles. Suma $2$: $1$ caso; suma mayor que $7$ ($8,9,10,11,12$): $5+4+3+2+1=15$ casos.

**a)** $P(\text{gana a la primera})=\dfrac{1+15}{36}=\dfrac{16}{36}=\mathbf{\dfrac{4}{9}}$.

**b)** Suma mayor que $9$ ($10,11,12$): $3+2+1=6$ casos, probabilidad $\dfrac{6}{36}=\dfrac{1}{6}$. Gana en la segunda oportunidad si no ganó antes y gana ahora:
$$P=\frac{5}{9}\cdot\frac{1}{6}=\frac{5}{54}\approx\mathbf{0{,}0926}.$$

**c)** $P(\text{gana})=\dfrac{4}{9}+\dfrac{5}{54}=\dfrac{24}{54}+\dfrac{5}{54}=\dfrac{29}{54}\approx\mathbf{0{,}5370}$.

@@ 6
Sean $O$ «tener ordenador» y $T$ «tener tablet»: $P(O)=0{,}6$, $P(T)=0{,}5$, $P(O\cap T)=0{,}2$.

**a)** i) $P(O\cup T)=0{,}6+0{,}5-0{,}2=\mathbf{0{,}9}$.

ii) $P(T^C\mid O^C)=\dfrac{P(O^C\cap T^C)}{P(O^C)}=\dfrac{1-0{,}9}{0{,}4}=\dfrac{0{,}1}{0{,}4}=\mathbf{0{,}25}$.

iii) $P(O\cap T^C)=P(O)-P(O\cap T)=0{,}6-0{,}2=\mathbf{0{,}4}$.

**b)** $P(O\cap T)=0{,}2\neq0$: **no son incompatibles.** $P(O)P(T)=0{,}3\neq0{,}2=P(O\cap T)$: **no son independientes.**

@@ 7
$\hat p=\dfrac{378}{540}=0{,}7$, $n=540$, $z_{\alpha/2}=2{,}17$ (nivel $97\,\%$, pues $\Phi(2{,}17)=0{,}9850$).

**a)** $E=2{,}17\sqrt{\dfrac{0{,}7\cdot0{,}3}{540}}=2{,}17\cdot0{,}01972=0{,}0428$.
$$IC=(0{,}7-0{,}0428,\ 0{,}7+0{,}0428)=(0{,}6572,\ 0{,}7428).$$

**b)** $E\le0{,}03\iff n\ge\dfrac{2{,}17^2\cdot0{,}7\cdot0{,}3}{0{,}03^2}=1\,098{,}74$. **Hay que seleccionar al menos $n=1\,099$ personas.**

@@ 8
$\sigma=\sqrt{121}=11$ g y $n=10$. Suma de los datos: $9\,915$, luego $\bar x=\dfrac{9\,915}{10}=991{,}5$.

**a)** Nivel $97\,\%$: $z_{\alpha/2}=2{,}17$. $E=2{,}17\cdot\dfrac{11}{\sqrt{10}}=7{,}548$.
$$IC=(991{,}5-7{,}548,\ 991{,}5+7{,}548)=(983{,}95,\ 999{,}05).$$

**b)** Nivel $94\,\%$: $\Phi(z_{\alpha/2})=0{,}97$, $z_{\alpha/2}=1{,}88$ (pues $\Phi(1{,}88)=0{,}9699$). Con $E\le5$:
$$n\ge\left(\frac{1{,}88\cdot11}{5}\right)^2=17{,}11.$$
**Hace falta una muestra de al menos $n=18$ tortugas.**
