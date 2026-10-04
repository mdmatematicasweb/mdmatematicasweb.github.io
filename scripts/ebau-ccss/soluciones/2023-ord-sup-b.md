@@ 1
Sean $x$ los botes Júpiter e $y$ los Minerva. Restricciones: verde $10x+5y\le1\,000$; morado $5x+5y\le800$; naranja $5x\le300$ (solo lo usa Júpiter); $x\ge0$, $y\ge0$. Beneficio: $B(x,y)=30x+20y$.

Vértices: $(0,0)$, $(0,160)$, $(40,120)$ (corte de $10x+5y=1\,000$ con $5x+5y=800$), $(60,80)$ (corte de $x=60$ con $5x+5y=800$) y $(60,0)$.

| Vértice | $(0,0)$ | $(0,160)$ | $(40,120)$ | $(60,80)$ | $(60,0)$ |
|---|---|---|---|---|---|
| $B$ | $0$ | $3\,200$ | $3\,600$ | $3\,400$ | $1\,800$ |

![Región factible del ejercicio 1 (2023-ord-sup-b), con sus vértices: (0, 0), (60, 0), (60, 80), (40, 120), (0, 160)](fig/2023-ord-sup-b-e1.svg){fig-alt="Región factible del ejercicio 1 (2023-ord-sup-b), con sus vértices: (0, 0), (60, 0), (60, 80), (40, 120), (0, 160)" width="75%" fig-align="center"}

**Debe fabricar 40 botes Júpiter y 120 Minerva, con un beneficio máximo de $3\,600$ €.**

@@ 2
**a)** $C^t$ es $1\times3$, $A$ es $3\times3$ y $C$ es $3\times1$: **$C^tAC$ es $1\times1$.** $C$ es $3\times1$, $C^t$ es $1\times3$ (luego $CC^t$ es $3\times3$) y $B$ es $3\times3$: **$CC^tB$ es $3\times3$.**

**b)** $|A|=17\neq0$: **$A$ tiene inversa**
$$A^{-1}=\frac{1}{17}\begin{pmatrix}-12&11&-28\\7&-5&22\\21&-15&49\end{pmatrix}.$$
$|B|=0$ (la tercera fila es combinación lineal de las otras dos): **$B$ no tiene inversa.**

**c)** Eliminando: $4\cdot(2X+3Y=A)-3\cdot(-3X+4Y=B)$ da $17X=4A-3B$, y $3\cdot(2X+3Y=A)+2\cdot(-3X+4Y=B)$ da $17Y=3A+2B$:
$$X=\frac{4A-3B}{17}=\begin{pmatrix}1&-2&3\\2&0&-1\\0&0&1\end{pmatrix},\qquad Y=\frac{3A+2B}{17}=\begin{pmatrix}1&-1&0\\1&0&2\\0&1&-1\end{pmatrix}.$$

@@ 3
**a)** En $x=3$: $\displaystyle\lim_{x\to3^-}\left(x^2-4x+4\right)=1$ y $f(3)=-3+4=1$: **continua.** Derivadas: $f'(x)=2x-4$ si $x<3$ y $f'(x)=-1$ si $x>3$, con $f'(3^-)=2\neq f'(3^+)=-1$.

**$f$ es continua en $\mathbb R$ y derivable en $\mathbb R\setminus\{3\}$.**

**b)** Para $x<3$: parábola $y=(x-2)^2$ de vértice $(2,0)$ (pasa por $(0,4)$ y $(3,1)$). Para $x\ge3$: semirrecta $y=-x+4$ desde $(3,1)$ (corta al eje $OX$ en $(4,0)$ y sigue hacia abajo).

![Gráfica de f: parábola (x−2)² hasta x=3 y recta −x+4 desde x=3, continua en (3,1) pero con pico; recinto sombreado entre x=2 y x=4](fig/2023-ord-sup-b-e3.svg){fig-alt="Gráfica de f: parábola (x−2)² hasta x=3 y recta −x+4 desde x=3, continua en (3,1) pero con pico; recinto sombreado entre x=2 y x=4" width="75%" fig-align="center"}

**c)** En $[2,4]$, $f\ge0$:
$$A=\int_2^3(x-2)^2dx+\int_3^4(-x+4)\,dx=\left[\frac{(x-2)^3}{3}\right]_2^3+\left[-\frac{x^2}{2}+4x\right]_3^4=\frac{1}{3}+\frac{1}{2}=\frac{5}{6}.$$
**$A=\dfrac{5}{6}\ \text{u}^2$**

@@ 4
**a)** Beneficio $=$ ingresos $-$ gastos, luego $G(t)=I(t)-B(t)=-t^2+48t-\left(-t^2+21t-20\right)=27t+20$.

**La función de gastos es $G(t)=27t+20$ y los gastos iniciales son $G(0)=20$ mil euros ($20\,000$ €).**

**b)** $B(t)=-(t-1)(t-20)>0\iff1<t<20$. En el intervalo $[0,15]$: **el beneficio es positivo a partir del año $1$** ($t>1$).

**c)** $B'(t)=-2t+21=0\Rightarrow t=10{,}5$ y $B''<0$: máximo. $B(10{,}5)=-110{,}25+220{,}5-20=90{,}25$.

**El beneficio máximo se alcanza a los $10{,}5$ años y vale $90{,}25$ mil euros ($90\,250$ €).**

**d)** Parábola abierta hacia abajo con vértice $(10{,}5;\ 90{,}25)$, que arranca en $(0,-20)$, corta al eje $OX$ en $t=1$ y llega a $t=15$ con $B(15)=70$.

![Parábola de beneficio B(t)=−t²+21t−20 en [0,15]: parte de −20, corta al eje en t=1, alcanza el máximo 90,25 en t=10,5 y llega a 70 en t=15](fig/2023-ord-sup-b-e4.svg){fig-alt="Parábola de beneficio B(t)=−t²+21t−20 en [0,15]: parte de −20, corta al eje en t=1, alcanza el máximo 90,25 en t=10,5 y llega a 70 en t=15" width="75%" fig-align="center"}

@@ 5
Sea $D$ «descartado»: $P(A)=0{,}6$, $P(B)=0{,}3$, $P(C)=0{,}1$, $P(D\mid A)=0{,}2$, $P(D\mid B)=0{,}5$, $P(D\mid C)=0{,}6$.

**a)** $P\big(D\cap(A\cup B)\big)=0{,}6\cdot0{,}2+0{,}3\cdot0{,}5=0{,}12+0{,}15=\mathbf{0{,}27}$.

**b)** $P(D)=0{,}12+0{,}15+0{,}1\cdot0{,}6=0{,}12+0{,}15+0{,}06=\mathbf{0{,}33}$.

**c)** $P(C\mid D^C)=\dfrac{P(C)\,P(D^C\mid C)}{P(D^C)}=\dfrac{0{,}1\cdot0{,}4}{1-0{,}33}=\dfrac{0{,}04}{0{,}67}=\dfrac{4}{67}\approx\mathbf{0{,}0597}$.

@@ 6
Sean $P$ «usa la plataforma» y $E$ «usa el correo»: $P(P)=0{,}75$, $P(E)=0{,}4$, $P(P^C\cap E^C)=0{,}15$, luego $P(P\cup E)=0{,}85$.

**a)** $P(P\cap E)=0{,}75+0{,}4-0{,}85=\mathbf{0{,}3}$.

**b)** $P(\text{solo uno})=\left(0{,}75-0{,}3\right)+\left(0{,}4-0{,}3\right)=0{,}45+0{,}1=\mathbf{0{,}55}$.

**c)** $P(P\mid E^C)=\dfrac{P(P\cap E^C)}{P(E^C)}=\dfrac{0{,}45}{0{,}6}=\mathbf{0{,}75}$.

**d)** $P(P)P(E)=0{,}75\cdot0{,}4=0{,}3=P(P\cap E)$: **son independientes** (también $P(P\mid E^C)=0{,}75=P(P)$).

@@ 7
$\sigma=3$ mm. Nivel $98{,}5\,\%$: $\Phi(z_{\alpha/2})=0{,}9925$ y en la tabla $\Phi(2{,}43)=0{,}9925$: $z_{\alpha/2}=2{,}43$.

**a)** $E=2{,}43\cdot\dfrac{3}{\sqrt{144}}=0{,}6075$.
$$IC=(81-0{,}6075,\ 81+0{,}6075)=(80{,}3925,\ 81{,}6075).$$

**b)** Amplitud $2E\le0{,}9\iff E\le0{,}45$:
$$n\ge\left(\frac{2{,}43\cdot3}{0{,}45}\right)^2=262{,}44.$$
**Hace falta una muestra de al menos $n=263$ piezas.**

**c)** $\bar X\sim N\!\left(80{,}4,\ \dfrac{3}{\sqrt{64}}\right)=N(80{,}4,\ 0{,}375)$.
$$P(79{,}5<\bar X<80{,}7)=P\!\left(\frac{79{,}5-80{,}4}{0{,}375}<Z<\frac{80{,}7-80{,}4}{0{,}375}\right)=P(-2{,}4<Z<0{,}8)=0{,}7881-(1-0{,}9918)=\mathbf{0{,}7799}.$$

@@ 8
$\hat p=\dfrac{180}{300}=0{,}6$, $n=300$.

**a)** Nivel $95\,\%$: $z_{\alpha/2}=1{,}96$. $E=1{,}96\sqrt{\dfrac{0{,}6\cdot0{,}4}{300}}=1{,}96\cdot0{,}02828=0{,}0554$.
$$IC=(0{,}6-0{,}0554,\ 0{,}6+0{,}0554)=(0{,}5446,\ 0{,}6554).$$

**b)** El error en $(0{,}54;\ 0{,}66)$ es $\dfrac{0{,}66-0{,}54}{2}=0{,}06$, y un tercio de él es $0{,}02$:
$$n\ge\frac{1{,}96^2\cdot0{,}6\cdot0{,}4}{0{,}02^2}=2\,304{,}96.$$
**Hace falta una muestra de al menos $n=2\,305$ habitantes.**
