@@ 1
**a)** Sumando las dos ecuaciones: $3X=4A+B$, luego $X=\dfrac{4A+B}{3}$ e $Y=B-X$.
$$4A+B=\begin{pmatrix}0&4\\4&0\end{pmatrix}+\begin{pmatrix}3&2\\2&0\end{pmatrix}=\begin{pmatrix}3&6\\6&0\end{pmatrix},\qquad X=\begin{pmatrix}1&2\\2&0\end{pmatrix},\qquad Y=B-X=\begin{pmatrix}2&0\\0&0\end{pmatrix}.$$
(Comprobación: $2X-Y=\begin{pmatrix}0&4\\4&0\end{pmatrix}=4A$ y $X+Y=B$.)

**b)** $C^2=\begin{pmatrix}1&0\\2&1\end{pmatrix}$, $C^3=\begin{pmatrix}1&0\\3&1\end{pmatrix}$ y, por inducción, $C^n=\begin{pmatrix}1&0\\n&1\end{pmatrix}$.

**$C^{2024}=\begin{pmatrix}1&0\\2024&1\end{pmatrix}$.**

**c)** $D$ es $2\times3$, $D^t$ es $3\times2$; $A$ y $B$ son $2\times2$.

- $A^tB+DD^t$: $A^tB$ es $2\times2$ y $DD^t$ es $(2\times3)(3\times2)=2\times2$. **Se puede y el resultado es $2\times2$.**
- $DB^t+A$: $DB^t$ es $(2\times3)(2\times2)$: el número de columnas de $D$ ($3$) no coincide con el de filas de $B^t$ ($2$). **No se puede.**
- $D^tA^t+D$: $D^tA^t$ es $(3\times2)(2\times2)=3\times2$ y $D$ es $2\times3$; no se pueden sumar matrices de distinta dimensión. **No se puede.**

@@ 2
Sean $x$ las pulseras de tipo $A$ e $y$ las de tipo $B$. Restricciones: oro $x+2y\le50$; platino $2x+y\le40$; plata $y\le25$; $x\ge0$, $y\ge0$. Ingresos: $I(x,y)=150x+200y$.

Vértices: $(0,0)$, $(0,25)$, $(10,20)$ (corte de $x+2y=50$ con $2x+y=40$) y $(20,0)$.

| Vértice | $(0,0)$ | $(0,25)$ | $(10,20)$ | $(20,0)$ |
|---|---|---|---|---|
| $I$ | $0$ | $5\,000$ | $5\,500$ | $3\,000$ |

![Región factible del ejercicio 2 (2024-ord-res-b), con sus vértices: (0, 0), (20, 0), (10, 20), (0, 25)](fig/2024-ord-res-b-e2.svg){fig-alt="Región factible del ejercicio 2 (2024-ord-res-b), con sus vértices: (0, 0), (20, 0), (10, 20), (0, 25)" width="75%" fig-align="center"}

**Debe fabricar 10 pulseras del tipo $A$ y 20 del tipo $B$, con unos ingresos máximos de $5\,500$ €.**

Metales usados con $(10,20)$: oro $10+40=50$ g, platino $20+20=40$ g y plata $20$ g. **Sobran $0$ g de oro, $0$ g de platino y $5$ g de plata.**

@@ 3
**a)** Continuidad en $x=1$: $\displaystyle\lim_{x\to1^-}f=1+a-1=a$ y $\displaystyle\lim_{x\to1^+}f=b$; luego $a=b$. En $x=3$: $\dfrac b3$ y $\dfrac{3-1}{3}=\dfrac{2}{3}$; luego $b=2$.

**$a=b=2$.**

Derivabilidad: $f'(x)=2x+2$ si $x<1$, $f'(x)=-\dfrac{2}{x^2}$ si $1<x<3$ y $f'(x)=\dfrac{1}{3}$ si $x>3$.

- En $x=1$: $f'(1^-)=4\neq f'(1^+)=-2$.
- En $x=3$: $f'(3^-)=-\dfrac{2}{9}\neq f'(3^+)=\dfrac{1}{3}$.

**$f$ es derivable en $\mathbb R\setminus\{1,3\}$.**

**b)** Con $b=2$ (y $a=5$, que no influye entre $x=2$ y $x=4$): en $[2,3]$, $f(x)=\dfrac2x$ (hipérbola decreciente de $(2,1)$ a $\left(3,\dfrac{2}{3}\right)$) y en $(3,4]$, $f(x)=\dfrac{x-1}{3}$ (recta de $\left(3,\dfrac{2}{3}\right)$ a $(4,1)$). Ambas son positivas.
$$A=\int_2^3\frac2x\,dx+\int_3^4\frac{x-1}{3}\,dx=2\ln\frac{3}{2}+\left[\frac{(x-1)^2}{6}\right]_3^4=2\ln\frac{3}{2}+\frac{9-4}{6}=2\ln\frac{3}{2}+\frac{5}{6}.$$
**$A=2\ln\dfrac{3}{2}+\dfrac{5}{6}\approx1{,}644\ \text{u}^2$**

![Gráfica de f para a=5 y b=2 entre x=1 y x=5: hipérbola 2/x hasta x=3 y recta (x−1)/3 desde (3,2/3); recinto sombreado entre x=2 y x=4](fig/2024-ord-res-b-e3.svg){fig-alt="Gráfica de f para a=5 y b=2 entre x=1 y x=5: hipérbola 2/x hasta x=3 y recta (x−1)/3 desde (3,2/3); recinto sombreado entre x=2 y x=4" width="75%" fig-align="center"}

@@ 4
**a)** En $x=2$: $-2+2+1=1$ y $\dfrac{1}{2-1}=1$: **continua** (cada tramo lo es en su intervalo). Derivadas: $f'(x)=1-x$ si $x<2$ y $f'(x)=-\dfrac{1}{(x-1)^2}$ si $x>2$; $f'(2^-)=-1=f'(2^+)$: **derivable.**

**$f$ es continua y derivable en $\mathbb R$.**

Monotonía: $f'>0$ en $(-\infty,1)$ y $f'<0$ en $(1,2)$ y en $(2,+\infty)$. **$f$ crece en $(-\infty,1)$ y decrece en $(1,+\infty)$, con máximo en $\left(1,\dfrac{3}{2}\right)$.**

Gráfica: arco de parábola abierta hacia abajo con vértice $\left(1,\dfrac{3}{2}\right)$, que pasa por $(0,1)$ y llega a $(2,1)$; a partir de ahí, la rama de hipérbola $y=\dfrac{1}{x-1}$ decreciente, con asíntota horizontal $y=0$ (pasa por $\left(3,\dfrac{1}{2}\right)$).

![Gráfica de f: parábola con máximo (1, 3/2) hasta (2,1) y hipérbola 1/(x−1) decreciente desde ahí; recinto sombreado entre x=0 y x=4](fig/2024-ord-res-b-e4.svg){fig-alt="Gráfica de f: parábola con máximo (1, 3/2) hasta (2,1) y hipérbola 1/(x−1) decreciente desde ahí; recinto sombreado entre x=0 y x=4" width="75%" fig-align="center"}

**b)** En $[0,4]$, $f>0$:
$$A=\int_0^2\left(-\frac{x^2}{2}+x+1\right)dx+\int_2^4\frac{dx}{x-1}=\left[-\frac{x^3}{6}+\frac{x^2}{2}+x\right]_0^2+\left[\ln(x-1)\right]_2^4=\frac{8}{3}+\ln3.$$
**$A=\dfrac{8}{3}+\ln3\approx3{,}765\ \text{u}^2$**

@@ 5
Sea $R$ «profesa la religión $A$», $M$ «mujer»: $P(R)=0{,}3$, $P(\text{otras})=0{,}5$, $P(M\mid R)=0{,}4$, $P(R\mid M)=0{,}25$.

**a)** $P(\text{ninguna})=1-0{,}3-0{,}5=\mathbf{0{,}2}$.

**b)** $P(R\cap M)=0{,}3\cdot0{,}4=0{,}12$. Como $P(R\cap M)=P(R\mid M)\,P(M)$, $P(M)=\dfrac{0{,}12}{0{,}25}=0{,}48$ y $P(\text{hombre})=1-0{,}48=\mathbf{0{,}52}$.

**c)** $P(R\cap M^C)=0{,}3-0{,}12=0{,}18$ y $P(R^C\cap M)=0{,}48-0{,}12=0{,}36$.
$$P(\text{solo uno})=0{,}18+0{,}36=\mathbf{0{,}54}.$$

@@ 6
Sean $E$ «economista» ($0{,}3$), $L$ «abogado» ($0{,}25$), $O$ «otros» ($0{,}45$) y $D$ «puesto directivo»: $P(D\mid E)=0{,}75$, $P(D\mid L)=0{,}6$, $P(D\mid O)=0{,}15$.

**a)** $P(D)=0{,}3\cdot0{,}75+0{,}25\cdot0{,}6+0{,}45\cdot0{,}15=0{,}225+0{,}15+0{,}0675=0{,}4425$, luego $P(D^C)=1-0{,}4425=\mathbf{0{,}5575}$.

**b)** $P(E\mid D)=\dfrac{0{,}225}{0{,}4425}=\dfrac{30}{59}\approx\mathbf{0{,}5085}$.

@@ 7
**a)** Melones de la variedad $D$: $4\,000-1\,420-980-720=880$. La fracción muestreada es $\dfrac{200}{4\,000}=0{,}05$:
$$A:\ 0{,}05\cdot1\,420=71,\quad B:\ 0{,}05\cdot980=49,\quad C:\ 0{,}05\cdot720=36,\quad D:\ 0{,}05\cdot880=44.$$
**Composición de la muestra: $71$ de $A$, $49$ de $B$, $36$ de $C$ y $44$ de $D$** (total $200$).

**b.1)** $\bar X\sim N\!\left(3{,}85,\ \dfrac{1{,}32}{\sqrt{121}}\right)=N(3{,}85,\ 0{,}12)$.

**b.2)** $P(3{,}6<\bar X<4)=P\!\left(\dfrac{3{,}6-3{,}85}{0{,}12}<Z<\dfrac{4-3{,}85}{0{,}12}\right)=P(-2{,}08<Z<1{,}25)=0{,}8944-(1-0{,}9812)=\mathbf{0{,}8756}$.

@@ 8
**a)** Suma de los tiempos: $270$, luego $\bar x=\dfrac{270}{10}=27$. Nivel $98\,\%$: $\Phi(z_{\alpha/2})=0{,}99$ y en la tabla $\Phi(2{,}33)=0{,}9901$, luego $z_{\alpha/2}=2{,}33$. $E=2{,}33\cdot\dfrac{5}{\sqrt{10}}=3{,}684$.
$$IC=(27-3{,}684,\ 27+3{,}684)=(23{,}316,\ 30{,}684).$$
El valor $35$ **no pertenece al intervalo** y todo el intervalo está por debajo de $35$: **no puede admitirse que el tiempo medio sea superior a $35$ minutos.**

**b)** $X\sim N(27{,}2,\ 5)$. $P(X>20)=P\!\left(Z>\dfrac{20-27{,}2}{5}\right)=P(Z>-1{,}44)=P(Z<1{,}44)=\mathbf{0{,}9251}$.
