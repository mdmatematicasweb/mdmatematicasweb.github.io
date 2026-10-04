@@ 1
**a)** $A^2=\begin{pmatrix}1&0\\-2&1\end{pmatrix}$, y por inducción $A^n=\begin{pmatrix}1&0\\-n&1\end{pmatrix}$. Así
$$A^{40}=\begin{pmatrix}1&0\\-40&1\end{pmatrix},\qquad\left(A^t\right)^{30}=\left(A^{30}\right)^t=\begin{pmatrix}1&-30\\0&1\end{pmatrix}.$$

**b)** $A^{-1}=\begin{pmatrix}1&0\\1&1\end{pmatrix}$, luego $A^{-1}+A=\begin{pmatrix}2&0\\0&2\end{pmatrix}=2I_2$ y
$$\left(A^{-1}+A\right)^2=4I_2=\begin{pmatrix}4&0\\0&4\end{pmatrix}.$$

**c)** $A^t+I_2=\begin{pmatrix}2&-1\\0&2\end{pmatrix}$, con determinante $4\neq0$, y $A^t-I_2=\begin{pmatrix}0&-1\\0&0\end{pmatrix}$. Entonces $X=\left(A^t+I_2\right)^{-1}\left(A^t-I_2\right)$ con $\left(A^t+I_2\right)^{-1}=\begin{pmatrix}\frac{1}{2}&\frac{1}{4}\\0&\frac{1}{2}\end{pmatrix}$:
$$X=\begin{pmatrix}\frac{1}{2}&\frac{1}{4}\\0&\frac{1}{2}\end{pmatrix}\begin{pmatrix}0&-1\\0&0\end{pmatrix}=\begin{pmatrix}0&-\frac{1}{2}\\0&0\end{pmatrix}.$$

@@ 2
**a)** Las rectas frontera son $5x-3y=-9$, $x+y=11$, $6x+y=36$ y $x+2y=6$. Los vértices de la región factible son
$$(0,3),\quad(3,8),\quad(5,6),\quad(6,0),$$
que se obtienen cortando $x+2y=6$ con $x=0$, $5x-3y=-9$ con $x+y=11$, $x+y=11$ con $6x+y=36$ y $6x+y=36$ con $y=0$, respectivamente. (La región es el cuadrilátero de esos cuatro vértices.)

![Región factible del ejercicio 2 (2021-ord-sup), con sus vértices: (0, 3), (6, 0), (5, 6), (3, 8)](fig/2021-ord-sup-e2.svg){fig-alt="Región factible del ejercicio 2 (2021-ord-sup), con sus vértices: (0, 3), (6, 0), (5, 6), (3, 8)" width="75%" fig-align="center"}

**b)** Para $(5,7)$: $5+7=12>11$, no cumple $x+y\le11$. **No pertenece a la región.**

**c)** Valores de $F=10x-6y$ en los vértices: $F(0,3)=-18$, $F(3,8)=-18$, $F(5,6)=14$, $F(6,0)=60$.

**Máximo $60$ en $(6,0)$. Mínimo $-18$, que se alcanza en $(0,3)$ y en $(3,8)$ y, por tanto, en todos los puntos del segmento que los une** (porque $F=-18$ es la recta $5x-3y=-9$ multiplicada por 2).

@@ 3
**a)** Continuidad.

- En $x=-1$: $\displaystyle\lim_{x\to-1^-}\frac1x=-1$ y $\displaystyle\lim_{x\to-1^+}\left(-3x^2+4\right)=1$. Distintos: **discontinuidad de salto finito en $x=-1$.**
- En $x=1$: $\displaystyle\lim_{x\to1^-}\left(-3x^2+4\right)=1$, $\displaystyle\lim_{x\to1^+}(2x-1)=1$ y $f(1)=1$: **continua en $x=1$.**
- En el resto es continua (el dominio es $\mathbb R$ y $\dfrac1x$ solo falla en $x=0$, que no está en su tramo).

Derivabilidad: $f'(x)=-\dfrac{1}{x^2}$ si $x<-1$, $f'(x)=-6x$ si $-1<x<1$, $f'(x)=2$ si $x>1$. En $x=1$: $f'(1^-)=-6\neq f'(1^+)=2$: **no derivable en $x=1$.**

**$f$ es continua en $\mathbb R\setminus\{-1\}$ y derivable en $\mathbb R\setminus\{-1,1\}$.**

**b)** Primer tramo: hipérbola $y=\dfrac1x$ (con $x\le-1$), que parte de $0^-$ y llega a $(-1,-1)$ (punto relleno). Segundo tramo: arco de parábola $y=-3x^2+4$ en $(-1,1)$, de vértice $(0,4)$, con los extremos «abiertos» en $(-1,1)$ y $(1,1)$. Tercer tramo: semirrecta $y=2x-1$ desde $(1,1)$ hacia arriba (pasa por $(2,3)$).

**c)** En $[0,3]$ la función es positiva: $-3x^2+4\ge1$ en $[0,1]$ y $2x-1\ge1$ en $[1,3]$.
$$A=\int_0^1\left(-3x^2+4\right)dx+\int_1^3(2x-1)\,dx=\left[-x^3+4x\right]_0^1+\left[x^2-x\right]_1^3=3+6=9.$$
**$A=9\ \text{u}^2$**

@@ 4
**a)** $f'(x)=2x-6=0\Rightarrow x=3$, y $f''(x)=2>0$: mínimo. $f(3)=9-18+10=1$.

**El coste es mínimo con una producción de $3$ mil kg ($3\,000$ kg) y vale $1$ mil euros ($1\,000$ €).**

**b)** $f(4)=16-24+10=2$ y $f'(4)=2\cdot4-6=2$. Tangente: $y-2=2(x-4)$.

**$y=2x-6$.**

Gráfica: parábola de vértice $(3,1)$, abierta hacia arriba, que corta al eje $OY$ en $(0,10)$ (no corta al eje $OX$ porque $\Delta=36-40<0$) y pasa por $(2,2)$ y $(4,2)$; la recta $y=2x-6$ la toca en $(4,2)$ y corta al eje $OX$ en $(3,0)$.

@@ 5
Sea $M$ «ser mujer». Plantilla total: $1000+600+400=2000$. Mujeres: $0{,}42\cdot1000+0{,}2\cdot600+0{,}5\cdot400=420+120+200=740$.

**a)** $P(M)=\dfrac{740}{2000}=\mathbf{0{,}37}$.

**b)** Hombres: $2000-740=1260$, de los cuales bomberos hay $600-120=480$. $P(\text{bombero}\mid\text{hombre})=\dfrac{480}{1260}=\dfrac{8}{21}\approx\mathbf{0{,}3810}$.

@@ 6
Sea $S$ «suma de los dados $\ge9$»: casos favorables $(3,6),(4,5),(4,6),(5,4),(5,5),(5,6),(6,3),(6,4),(6,5),(6,6)$, es decir $P(S)=\dfrac{10}{36}=\dfrac{5}{18}$ y $P(S^C)=\dfrac{13}{18}$.

**a)** $P(\text{verde}\cap B)=P(S^C)\cdot P(\text{verde}\mid B)=\dfrac{13}{18}\cdot\dfrac{3}{9}=\dfrac{13}{54}\approx\mathbf{0{,}2407}$.

**b)** $P(\text{roja})=P(S)\cdot\dfrac{4}{9}+P(S^C)\cdot\dfrac{6}{9}=\dfrac{5}{18}\cdot\dfrac{4}{9}+\dfrac{13}{18}\cdot\dfrac{6}{9}=\dfrac{20}{162}+\dfrac{78}{162}=\dfrac{49}{81}\approx\mathbf{0{,}6049}$.

@@ 7
$\hat p=0{,}15$, $n=1000$, $z_{\alpha/2}=1{,}96$ (nivel $95\,\%$).

**a)** $E=1{,}96\sqrt{\dfrac{0{,}15\cdot0{,}85}{1000}}=1{,}96\cdot0{,}01129=0{,}0221$.
$$IC=(0{,}15-0{,}0221,\ 0{,}15+0{,}0221)=(0{,}1279,\ 0{,}1721).$$

**b)** $E<0{,}01\iff n>\dfrac{1{,}96^2\cdot0{,}15\cdot0{,}85}{0{,}01^2}=4\,898{,}04$. **Hacen falta al menos $n=4\,899$ ciudadanos.**

@@ 8
**a)** $\bar X\sim N\!\left(1000,\dfrac{16}{\sqrt{64}}\right)=N(1000,\,2)$ (la desviación típica de $X$ es $\sqrt{256}=16$ g).
$$P(\bar X<996)=P\!\left(Z<\frac{996-1000}{2}\right)=P(Z<-2)=1-P(Z<2)=1-0{,}9772=\mathbf{0{,}0228}.$$

**b)** Media muestral: $\bar x=\dfrac{63\,744}{64}=996$ g. Nivel $90\,\%$: $\Phi(z_{\alpha/2})=0{,}95$, que está entre $\Phi(1{,}64)=0{,}9495$ y $\Phi(1{,}65)=0{,}9505$; se toma $z_{\alpha/2}=1{,}645$. Error: $E=1{,}645\cdot\dfrac{16}{\sqrt{64}}=3{,}29$.
$$IC=(996-3{,}29,\ 996+3{,}29)=(992{,}71,\ 999{,}29).$$

**c)** El valor $1000$ g **no pertenece al intervalo**: al $90\,\%$ de confianza el peso medio real es menor que el que indica el paquete. **La denuncia parece tener base.**
