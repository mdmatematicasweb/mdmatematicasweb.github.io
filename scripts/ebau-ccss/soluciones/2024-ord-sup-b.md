@@ 1
**a)** $M^t=\begin{pmatrix}1&2&1\\0&1&1\\1&0&1\end{pmatrix}$ y
$$M^tV=\begin{pmatrix}(5-a^2)+2(a-1)+a^2\\(a-1)+a^2\\(5-a^2)+a^2\end{pmatrix}=\begin{pmatrix}2a+3\\a^2+a-1\\5\end{pmatrix}=\begin{pmatrix}5\\1\\5\end{pmatrix}.$$
De $2a+3=5$ resulta $a=1$, y se cumple $a^2+a-1=1$. **$a=1$.**

**b)** $|M|=2\neq0$ y $M^{-1}=\begin{pmatrix}\frac{1}{2}&\frac{1}{2}&-\frac{1}{2}\\-1&0&1\\\frac{1}{2}&-\frac{1}{2}&\frac{1}{2}\end{pmatrix}$. De $XM-I_3=N$: $XM=N+I_3$ y $X=(N+I_3)M^{-1}$:
$$X=\begin{pmatrix}4&2&2\\5&3&1\\7&4&1\end{pmatrix}\begin{pmatrix}\frac{1}{2}&\frac{1}{2}&-\frac{1}{2}\\-1&0&1\\\frac{1}{2}&-\frac{1}{2}&\frac{1}{2}\end{pmatrix}=\begin{pmatrix}1&1&1\\0&2&1\\0&3&1\end{pmatrix}.$$

**c)** $V$ es $3\times1$ y $N^t$ es $3\times3$: en $2\cdot V\cdot N^t$ el número de columnas de $V$ ($1$) no coincide con el de filas de $N^t$ ($3$). **No se puede realizar.**

$N+M^t$ es $3\times3$ y $V$ es $3\times1$: **$(N+M^t)\cdot V$ se puede realizar y es de dimensión $3\times1$.**

@@ 2
Sean $x$ los equipos del primer tipo e $y$ los del segundo. Restricciones: Javascript $2x+6y\le150$; Python $3x+4y\le120$; $y\ge6$; $x\ge0$. Hay que maximizar el número de equipos: $F(x,y)=x+y$.

Vértices: $(0,6)$, $(0,25)$, $(12,21)$ (corte de $2x+6y=150$ con $3x+4y=120$) y $(32,6)$ (corte de $3x+4y=120$ con $y=6$).

| Vértice | $(0,6)$ | $(0,25)$ | $(12,21)$ | $(32,6)$ |
|---|---|---|---|---|
| $x+y$ | $6$ | $25$ | $33$ | $38$ |

**Se pueden formar 32 equipos del primer tipo y 6 del segundo (38 equipos).** Desarrolladores utilizados: Javascript $2\cdot32+6\cdot6=100$ y Python $3\cdot32+4\cdot6=120$.

@@ 3
**a)** Dominio: $\mathbb R\setminus\{-3\}$. Con $OX$: $f(x)=0\iff\dfrac{4}{3+x}=1\iff x=1$, punto $(1,0)$. Con $OY$: $f(0)=1-\dfrac{4}{3}=-\dfrac{1}{3}$, punto $\left(0,-\dfrac{1}{3}\right)$.

**b)** Vertical: $x=-3$ (el denominador se anula: $\displaystyle\lim_{x\to-3^-}f=+\infty$ y $\displaystyle\lim_{x\to-3^+}f=-\infty$). Horizontal: $\displaystyle\lim_{x\to\pm\infty}f(x)=1$.

**Asíntotas: $x=-3$ e $y=1$.**

**c)** $f'(x)=\dfrac{4}{(3+x)^2}=1\iff(3+x)^2=4\iff3+x=\pm2\iff x=-1$ o $x=-5$.

**Puntos: $f(-1)=1-\dfrac{4}{2}=-1$, es decir $(-1,-1)$, y $f(-5)=1-\dfrac{4}{-2}=3$, es decir $(-5,3)$.**

**d)** $f''(x)=-\dfrac{8}{(3+x)^3}$. Si $x>-3$, $f''<0$: **cóncava en $(-3,+\infty)$.** Si $x<-3$, $f''>0$: **convexa en $(-\infty,-3)$.** No hay puntos de inflexión ($x=-3$ no está en el dominio).

@@ 4
**a)** En $x=2$: $\displaystyle\lim_{x\to2^-}\left(-x^2+2x\right)=0$ y $f(2)=4-4=0$: **continua.** Derivadas: $f'(x)=-2x+2$ si $x<2$ y $f'(x)=2x-2$ si $x>2$; $f'(2^-)=-2\neq f'(2^+)=2$.

**$f$ es continua en $\mathbb R$ y derivable en $\mathbb R\setminus\{2\}$.**

**b)** En $[-1,1]$, $f(x)=-x^2+2x$ (parábola abierta hacia abajo con vértice $(1,1)$). La recta $y=2x$ y la parábola se cortan donde $-x^2+2x=2x\iff x=0$. Como $2x-\left(-x^2+2x\right)=x^2\ge0$, la recta queda por encima de la parábola en todo el intervalo $[-1,1]$:
$$A=\int_{-1}^{1}\left[2x-\left(-x^2+2x\right)\right]dx=\int_{-1}^{1}x^2\,dx=\left[\frac{x^3}{3}\right]_{-1}^{1}=\frac{2}{3}.$$
**$A=\dfrac{2}{3}\ \text{u}^2$**

@@ 5
**a)** $P=\dfrac{3}{15}\cdot\dfrac{2}{14}=\dfrac{6}{210}=\dfrac{1}{35}\approx\mathbf{0{,}0286}$.

**b)** Las dos primeras no son «casa» si son «mercado» o «leña» ($5$ papeletas): $P=\dfrac{5}{15}\cdot\dfrac{4}{14}=\dfrac{20}{210}=\dfrac{2}{21}\approx\mathbf{0{,}0952}$.

**c)** Sean $L_1$ y $L_2$ «leña en la primera» y «leña en la segunda». $P(L_1\cap L_2)=\dfrac{2}{15}\cdot\dfrac{1}{14}=\dfrac{1}{105}$ y $P(L_2)=\dfrac{2}{15}$ (por simetría).
$$P(L_1\mid L_2)=\frac{1/105}{2/15}=\frac{1}{14}\approx\mathbf{0{,}0714}.$$
(Es lógico: si la segunda es «leña», quedan $14$ papeletas para la primera y solo una es «leña».)

@@ 6
Sean $B$ «básico» ($\dfrac{30}{50}=0{,}6$), $S$ «superior» ($0{,}4$) e $I$ «presenta incidencias»: $P(I^C)=0{,}8$, $P(I\mid B)=0{,}3$.

$P(B\cap I)=0{,}6\cdot0{,}3=0{,}18$; $P(B\cap I^C)=0{,}6-0{,}18=0{,}42$; $P(S\cap I^C)=P(I^C)-P(B\cap I^C)=0{,}8-0{,}42=0{,}38$; $P(S\cap I)=0{,}4-0{,}38=0{,}02$.

**a)** $P(B\cap I^C)=\mathbf{0{,}42}$.

**b)** $P(I^C\mid S)=\dfrac{0{,}38}{0{,}4}=\mathbf{0{,}95}$.

**c)** $P(I)=1-0{,}8=0{,}2$ y $P(B\mid I)=\dfrac{0{,}18}{0{,}2}=\mathbf{0{,}9}$.

**d)** $P\left((B\cap I)\cup(S\cap I^C)\right)=0{,}18+0{,}38=\mathbf{0{,}56}$ (sucesos incompatibles).

@@ 7
$\hat p=\dfrac{370}{400}=0{,}925$, $n=400$.

**a)** Nivel $93\,\%$: $\Phi(z_{\alpha/2})=0{,}965$ y en la tabla $\Phi(1{,}81)=0{,}9649$, luego $z_{\alpha/2}=1{,}81$. $E=1{,}81\sqrt{\dfrac{0{,}925\cdot0{,}075}{400}}=1{,}81\cdot0{,}01317=0{,}0238$.
$$IC=(0{,}925-0{,}0238,\ 0{,}925+0{,}0238)=(0{,}9012,\ 0{,}9488).$$
Todo el intervalo está por encima de $0{,}88$: **la empresa sí cumple los estándares de calidad.**

**b)** Nivel $95\,\%$: $z_{\alpha/2}=1{,}96$. Amplitud $2E<0{,}03\iff E<0{,}015$:
$$n>\frac{1{,}96^2\cdot0{,}925\cdot0{,}075}{0{,}015^2}=1\,184{,}49.$$
**Hay que analizar al menos $n=1\,185$ envíos.**

@@ 8
**a)** $\bar X\sim N\!\left(60,\ \dfrac{30}{\sqrt{100}}\right)=N(60,\ 3)$.
$$P(\bar X>54)=P\!\left(Z>\frac{54-60}{3}\right)=P(Z>-2)=P(Z<2)=\mathbf{0{,}9772}.$$

**b)** $\bar x=40$, $\sigma=20$, $n=25$. Nivel $97\,\%$: $z_{\alpha/2}=2{,}17$. $E=2{,}17\cdot\dfrac{20}{\sqrt{25}}=2{,}17\cdot4=8{,}68$.
$$IC=(40-8{,}68,\ 40+8{,}68)=(31{,}32,\ 48{,}68).$$
**Error máximo $8{,}68$ minutos.**
