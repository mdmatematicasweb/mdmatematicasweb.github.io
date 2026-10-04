@@ 1
**a)** De $P^{-1}AP=J$ se obtiene $A=PJP^{-1}$. $|P|=-2\neq0$ y $P^{-1}=\begin{pmatrix}\frac{1}{2}&\frac{1}{2}&\frac{1}{2}\\0&1&0\\\frac{1}{2}&-\frac{1}{2}&-\frac{1}{2}\end{pmatrix}$.
$$PJ=\begin{pmatrix}1&0&1\\0&1&0\\1&-1&-1\end{pmatrix}\begin{pmatrix}2&1&0\\0&2&0\\0&0&-1\end{pmatrix}=\begin{pmatrix}2&1&-1\\0&2&0\\2&-1&1\end{pmatrix},$$
$$A=PJP^{-1}=\begin{pmatrix}2&1&-1\\0&2&0\\2&-1&1\end{pmatrix}\begin{pmatrix}\frac{1}{2}&\frac{1}{2}&\frac{1}{2}\\0&1&0\\\frac{1}{2}&-\frac{1}{2}&-\frac{1}{2}\end{pmatrix}=\begin{pmatrix}\frac{1}{2}&\frac{5}{2}&\frac{3}{2}\\0&2&0\\\frac{3}{2}&-\frac{1}{2}&\frac{1}{2}\end{pmatrix}.$$

**b)** $A^3=\left(PJP^{-1}\right)\left(PJP^{-1}\right)\left(PJP^{-1}\right)=PJ\left(P^{-1}P\right)J\left(P^{-1}P\right)JP^{-1}=PJ^3P^{-1}$, ya que $P^{-1}P=I$.

Comprobación con números: $J^3=\begin{pmatrix}8&12&0\\0&8&0\\0&0&-1\end{pmatrix}$ y
$$PJ^3P^{-1}=\begin{pmatrix}8&12&-1\\0&8&0\\8&4&1\end{pmatrix}\begin{pmatrix}\frac{1}{2}&\frac{1}{2}&\frac{1}{2}\\0&1&0\\\frac{1}{2}&-\frac{1}{2}&-\frac{1}{2}\end{pmatrix}=\begin{pmatrix}\frac{7}{2}&\frac{33}{2}&\frac{9}{2}\\0&8&0\\\frac{9}{2}&\frac{15}{2}&\frac{7}{2}\end{pmatrix}=A^3.$$

@@ 2
Sean $x$ los centros florales e $y$ los candelabros. Restricciones: $12\le x+y\le40$; $y\le\dfrac x3$; $x\ge0$, $y\ge0$. Ingresos: $I(x,y)=32x+35y$.

Vértices: $(12,0)$, $(40,0)$, $(30,10)$ (corte de $x+y=40$ con $x=3y$) y $(9,3)$ (corte de $x+y=12$ con $x=3y$).

| Vértice | $(12,0)$ | $(40,0)$ | $(30,10)$ | $(9,3)$ |
|---|---|---|---|---|
| $I$ | $384$ | $1\,280$ | $1\,310$ | $393$ |

![Región factible del ejercicio 2 (2024-ord-sup-a), con sus vértices: (9, 3), (12, 0), (40, 0), (30, 10)](fig/2024-ord-sup-a-e2.svg){fig-alt="Región factible del ejercicio 2 (2024-ord-sup-a), con sus vértices: (9, 3), (12, 0), (40, 0), (30, 10)" width="75%" fig-align="center"}

**Debe seleccionar 30 centros florales y 10 candelabros, con unos ingresos de $1\,310$ €.**

@@ 3
**a)** $f(x)=-x(x-6)$ es una parábola abierta hacia abajo con vértice $(3,9)$ que corta al eje $OX$ en $x=0$ y $x=6$; $g(x)=\dfrac{x^2}{5}$ es una parábola abierta hacia arriba con vértice en el origen. Se cortan donde $-x^2+6x=\dfrac{x^2}{5}\iff6x=\dfrac{6}{5}x^2\iff x=0$ o $x=5$, en los puntos $(0,0)$ y $(5,5)$. La superficie es la región entre ambas, con $f$ por encima de $g$.

![Superficie de ampliación: región entre las parábolas f(x)=−x²+6x y g(x)=x²/5, que se cortan en (0,0) y (5,5)](fig/2024-ord-sup-a-e3.svg){fig-alt="Superficie de ampliación: región entre las parábolas f(x)=−x²+6x y g(x)=x²/5, que se cortan en (0,0) y (5,5)" width="75%" fig-align="center"}

**b)** $A=\displaystyle\int_0^5\left(-x^2+6x-\frac{x^2}{5}\right)dx=\int_0^5\left(-\frac{6}{5}x^2+6x\right)dx=\left[-\frac{2x^3}{5}+3x^2\right]_0^5=-50+75=25$.

**El área es de $25$ dam$^2$, es decir, $2\,500$ m$^2$ ($1$ dam$^2=100$ m$^2$).** Coste: $2\,500\cdot75=187\,500$ €.

@@ 4
**a)** $g(x)=1$ es constante: **continua y derivable en $[-1,3]$.**

Para $f$, en $x=1$: $\displaystyle\lim_{x\to1^-}\left(2-x^2\right)=1$ y $f(1)=(1-2)^2=1$: **continua.** Derivadas: $f'(x)=-2x$ si $-1<x<1$ y $f'(x)=2(x-2)$ si $1<x<3$; $f'(1^-)=-2=f'(1^+)$: **derivable.**

**$f$ es continua y derivable en $[-1,3]$ (en el interior del intervalo, en los extremos solo hay derivadas laterales).**

**b)** $f$ y $g$ se cortan donde $2-x^2=1$ (en $[-1,1]$, $x=\pm1$) y donde $(x-2)^2=1$ (en $(1,3]$, $x=3$; en $x=1$ también), es decir, en $x=-1$, $x=1$ y $x=3$. En $[-1,1]$ la parábola $2-x^2$ queda sobre la recta $y=1$ (vale $2$ en $x=0$); en $[1,3]$ la parábola $(x-2)^2$ queda bajo la recta (vale $0$ en $x=2$).
$$A=\int_{-1}^{1}\left(2-x^2-1\right)dx+\int_1^3\left(1-(x-2)^2\right)dx=\left[x-\frac{x^3}{3}\right]_{-1}^{1}+\left[x-\frac{(x-2)^3}{3}\right]_1^3=\frac{4}{3}+\frac{4}{3}=\frac{8}{3}.$$
**$A=\dfrac{8}{3}\ \text{u}^2$**

![Recinto entre f (parábolas 2−x² en [−1,1] y (x−2)² en [1,3]) y la recta g(x)=1, con cortes en x=−1, 1 y 3](fig/2024-ord-sup-a-e4.svg){fig-alt="Recinto entre f (parábolas 2−x² en [−1,1] y (x−2)² en [1,3]) y la recta g(x)=1, con cortes en x=−1, 1 y 3" width="75%" fig-align="center"}

@@ 5
Sean $H$ «compra novelas históricas» y $F$ «compra novelas de fantasía»: $P(H)=0{,}45$, $P(F^C)=0{,}4\Rightarrow P(F)=0{,}6$, $P(H\mid F)=0{,}3$.

**a)** $P(H\cap F)=P(F)\,P(H\mid F)=0{,}6\cdot0{,}3=\mathbf{0{,}18}$.

**b)** $P(H\cup F)=0{,}45+0{,}6-0{,}18=0{,}87$, luego $P(H^C\cap F^C)=1-0{,}87=\mathbf{0{,}13}$.

**c)** $P(F\mid H^C)=\dfrac{P(F\cap H^C)}{P(H^C)}=\dfrac{0{,}6-0{,}18}{0{,}55}=\dfrac{0{,}42}{0{,}55}=\dfrac{42}{55}\approx\mathbf{0{,}7636}$.

@@ 6
$P(A)=0{,}25$, $P(B)=0{,}35$, $P(C)=0{,}4$; sea $D$ «defectuosa»: $P(D)=0{,}0205$, $P(D\mid B)=0{,}01$.

**a)** $P(B\mid D^C)=\dfrac{P(B)\,P(D^C\mid B)}{P(D^C)}=\dfrac{0{,}35\cdot0{,}99}{1-0{,}0205}=\dfrac{0{,}3465}{0{,}9795}=\dfrac{231}{653}\approx\mathbf{0{,}3538}$.

**b)** Sea $p=P(D\mid A)=P(D\mid C)$. $P(D)=0{,}25p+0{,}35\cdot0{,}01+0{,}4p=0{,}65p+0{,}0035=0{,}0205$, luego $p=\dfrac{0{,}017}{0{,}65}=\dfrac{17}{650}$.
$$P(A\mid D)=\frac{0{,}25\cdot\frac{17}{650}}{0{,}0205}=\frac{170}{533}\approx\mathbf{0{,}3189}.$$

@@ 7
$\hat p=\dfrac{165}{220}=0{,}75$, $n=220$. Nivel $97{,}5\,\%$: $\Phi(z_{\alpha/2})=0{,}9875$, $z_{\alpha/2}=2{,}24$.

**a)** $E=2{,}24\sqrt{\dfrac{0{,}75\cdot0{,}25}{220}}=2{,}24\cdot0{,}02919=0{,}0654$.
$$IC=(0{,}75-0{,}0654,\ 0{,}75+0{,}0654)=(0{,}6846,\ 0{,}8154).$$
$0{,}70$ **sí está en el intervalo**: puede admitirse que el $70\,\%$ responda positivamente.

**b)** $E<0{,}025\iff n>\dfrac{2{,}24^2\cdot0{,}75\cdot0{,}25}{0{,}025^2}=1\,505{,}28$. **Hace falta una muestra de al menos $n=1\,506$ enfermos.**

@@ 8
Suma de los tiempos: $28{,}68$; $\bar x=2{,}868$ min. $\sigma=0{,}36$, $n=10$.

**a)** Nivel $93{,}5\,\%$: $\Phi(z_{\alpha/2})=0{,}9675$ y en la tabla $\Phi(1{,}85)=0{,}9678$ (el más cercano), luego $z_{\alpha/2}=1{,}85$. $E=1{,}85\cdot\dfrac{0{,}36}{\sqrt{10}}=0{,}2106$.
$$IC=(2{,}868-0{,}2106,\ 2{,}868+0{,}2106)=(2{,}6574,\ 3{,}0786).$$

**b)** $E<0{,}05\iff n>\left(\dfrac{1{,}85\cdot0{,}36}{0{,}05}\right)^2=177{,}42$. **Hay que cronometrar al menos $n=178$ repeticiones.**
