@@ 1
**a)** $Q$ es $2\times3$ y $P^t$ es $3\times2$:
$$Q\cdot P^t=\begin{pmatrix}50&40&35\\0&60&55\end{pmatrix}\begin{pmatrix}40&34\\38&37\\42&40\end{pmatrix}=\begin{pmatrix}4\,990&4\,580\\4\,590&4\,420\end{pmatrix}.$$
El elemento $(i,j)$ es la producción de la finca $i$ valorada con los precios de la finca $j$. **Los elementos de la diagonal principal son lo que obtiene el agricultor por la venta de la cosecha de cada finca con sus propios precios:** $4\,990$ por la finca 1 y $4\,420$ por la finca 2 (en miles de kg por céntimos de euro por kg, es decir, en decenas de euros: $49\,900$ € y $44\,200$ €).

Total: $4\,990+4\,420=9\,410$ decenas de euros, es decir, **$94\,100$ €.**

**b1)** $MX+N=V\Rightarrow MX=V-N\Rightarrow X=M^{-1}(V-N)$.

**b2)** $V-N=\begin{pmatrix}3&3\\3&3\end{pmatrix}$ y $M^{-1}=\begin{pmatrix}1&0\\-1&1\end{pmatrix}$:
$$X=\begin{pmatrix}1&0\\-1&1\end{pmatrix}\begin{pmatrix}3&3\\3&3\end{pmatrix}=\begin{pmatrix}3&3\\0&0\end{pmatrix}.$$

@@ 2
Sean $x$ las horas extraordinarias de la cadena $A$ e $y$ las de la cadena $B$. Hay que **minimizar $C(x,y)=300x+600y$** sujeto a: portátiles $15x+10y\le360$; tablets $6x+10y\ge216$; $y\le3x$; $x\ge0$, $y\ge0$.

Vértices de la región factible: $(6,18)$ (corte de $y=3x$ con $6x+10y=216$), $(8,24)$ (corte de $y=3x$ con $15x+10y=360$) y $(16,12)$ (corte de $15x+10y=360$ con $6x+10y=216$).

| Vértice | $(6,18)$ | $(8,24)$ | $(16,12)$ |
|---|---|---|---|
| $C$ | $12\,600$ | $16\,800$ | $12\,000$ |

**El coste mínimo es de $12\,000$ €, con 16 horas extraordinarias en $A$ y 12 en $B$.**

@@ 3
**a)** $f(0)=-\dfrac{2}{7}$ y $f'(x)=\dfrac{(6x+5)(-3x+7)+3\left(3x^2+5x-2\right)}{(-3x+7)^2}$, con $f'(0)=\dfrac{35-6}{49}=\dfrac{29}{49}$. Tangente: $y+\dfrac{2}{7}=\dfrac{29}{49}x$.

**$y=\dfrac{29}{49}x-\dfrac{2}{7}$.**

$g(x)=-\ln(3x+1)$, $g(0)=0$ y $g'(x)=-\dfrac{3}{3x+1}$, con $g'(0)=-3$.

**$y=-3x$.**

**b)** $\displaystyle\int_{-2}^{-1}\frac{5}{3x^4}\,dx=\frac{5}{3}\left[-\frac{1}{3x^3}\right]_{-2}^{-1}=\frac{5}{3}\left(\frac{1}{3}-\frac{1}{24}\right)=\frac{35}{72}.$

$\displaystyle\int_{-3}^{0}\frac{e^{x/3}}{5}\,dx=\frac{3}{5}\left[e^{x/3}\right]_{-3}^{0}=\frac{3}{5}\left(1-e^{-1}\right)=\frac{3}{5}-\frac{3}{5e}.$

@@ 4
**a)** El dominio es $\mathbb R\setminus\{2\}$ (el segundo tramo no está definido en $x=2$). En $x=1$: $f(1)=1+2-3=0$ y $\displaystyle\lim_{x\to1^+}\left(1+\frac{1}{x-2}\right)=1-1=0$: **continua en $x=1$.** En $x=2$ hay $\displaystyle\lim_{x\to2^\pm}\frac{1}{x-2}=\pm\infty$: **discontinuidad de salto infinito (asintótica) en $x=2$.**

**$f$ es continua en $\mathbb R\setminus\{2\}$.**

**b)** $f'(x)=3x^2+4x$ si $x<1$ y $f'(x)=-\dfrac{1}{(x-2)^2}$ si $x>1$. En $x=1$: $f'(1^-)=7\neq f'(1^+)=-1$. **$f$ es derivable en $\mathbb R\setminus\{1,2\}$** y no lo es en $x=1$.

**c)** Vertical: $\displaystyle\lim_{x\to2^+}f=+\infty$, así que **$x=2$** es asíntota vertical. Horizontal: $\displaystyle\lim_{x\to+\infty}f=1$, luego **$y=1$** es asíntota horizontal en $+\infty$. En $-\infty$ el tramo cúbico no tiene asíntotas.

@@ 5
Sea $I$ «sufre alguna incidencia»: $P(A)=0{,}3$, $P(B)=0{,}2$, $P(C)=0{,}5$, $P(I\mid A)=0{,}02$, $P(I\mid B)=0{,}01$, $P(I\mid C)=0{,}05$.

**a)** $P(I)=0{,}3\cdot0{,}02+0{,}2\cdot0{,}01+0{,}5\cdot0{,}05=0{,}006+0{,}002+0{,}025=0{,}033$, luego $P(I^C)=1-0{,}033=\mathbf{0{,}967}$.

**b)** $P(C\mid I)=\dfrac{0{,}5\cdot0{,}05}{0{,}033}=\dfrac{0{,}025}{0{,}033}=\dfrac{25}{33}\approx\mathbf{0{,}7576}$.

**c)** $P(A\cap I\cap\text{lluvia})=0{,}3\cdot0{,}02\cdot0{,}4=\mathbf{0{,}0024}$.

@@ 6
Sean $Z$ «azucarado», $N$ «naranja», $L$ «limón» y $M$ «menta». Datos: $P(Z)=0{,}6$, $P(L\mid Z)=0{,}25$, y entre los no azucarados ($0{,}4$ del total): $0{,}4$ naranja, $0{,}3$ limón y $0{,}3$ menta; $P(N)=0{,}4$.

Naranja no azucarada: $P(N\cap Z^C)=0{,}4\cdot0{,}4=0{,}16$. Luego $P(N\cap Z)=P(N)-P(N\cap Z^C)=0{,}4-0{,}16=0{,}24$.

**a)** $P(N\mid Z)=\dfrac{P(N\cap Z)}{P(Z)}=\dfrac{0{,}24}{0{,}6}=\mathbf{0{,}4}$.

**b)** Entre los azucarados: limón $0{,}6\cdot0{,}25=0{,}15$, naranja $0{,}24$ y menta $0{,}6-0{,}15-0{,}24=0{,}21$. Entre los no azucarados: menta $0{,}4\cdot0{,}3=0{,}12$. Entonces $P(\text{menta})=0{,}21+0{,}12=0{,}33$ y $P(\text{frutas})=1-0{,}33=0{,}67$.

**Es más probable que sea de sabor a frutas ($0{,}67$) que a menta ($0{,}33$).**

@@ 7
**a)** Muestreo aleatorio simple (con reemplazamiento, ordenadas): $6\cdot6=36$ muestras. La media es como máximo $2$ si la suma es $\le4$: suma $2$: $(1,1)$; suma $3$: $(1,2),(2,1)$; suma $4$: $(1,3),(2,2),(3,1)$. Son $6$ muestras.

**Hay $36$ muestras y la probabilidad es $\dfrac{6}{36}=\dfrac{1}{6}$.**

**b)** No se conoce la proporción muestral: se toma el caso más desfavorable, $\hat p=0{,}5$. Con $z_{\alpha/2}=1{,}96$ y $E\le0{,}15$:
$$n\ge\frac{1{,}96^2\cdot0{,}5\cdot0{,}5}{0{,}15^2}=42{,}68.$$
**Hay que tomar al menos $n=43$ adolescentes.**

@@ 8
$\sigma=18{,}25$ €, $n=361$ y $\bar x=97$ €; $\dfrac{\sigma}{\sqrt n}=\dfrac{18{,}25}{19}=0{,}96053$.

**a)** Nivel $93\,\%$: $\Phi(z_{\alpha/2})=0{,}965$ y en la tabla $\Phi(1{,}81)=0{,}9649$, luego $z_{\alpha/2}=1{,}81$. $E=1{,}81\cdot0{,}96053=1{,}7386$.
$$IC=(97-1{,}7386,\ 97+1{,}7386)=(95{,}2614,\ 98{,}7386).$$

**b)** El error en el intervalo $(95{,}5;\ 98{,}5)$ es $\dfrac{98{,}5-95{,}5}{2}=1{,}5$. Se quiere $E=\dfrac{1{,}5}{3}=0{,}5$. Nivel $91\,\%$: $\Phi(z_{\alpha/2})=0{,}955$ y en la tabla $\Phi(1{,}70)=0{,}9554$, luego $z_{\alpha/2}=1{,}70$.
$$n\ge\left(\frac{1{,}70\cdot18{,}25}{0{,}5}\right)^2=3\,850{,}20.$$
**Hacen falta al menos $n=3\,851$ viviendas.**
