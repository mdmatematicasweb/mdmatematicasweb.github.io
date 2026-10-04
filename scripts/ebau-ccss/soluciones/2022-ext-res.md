@@ 1
**a)** $|A|=\left|\begin{matrix}2&-3&-a-1\\-1&a&a+1\\1&-3&-a\end{matrix}\right|=-a(a-4)=-a^2+4a$. La matriz tiene inversa si $|A|\neq0$: **$a\neq0$ y $a\neq4$.**

**b)** Para $a=4$, $A=\begin{pmatrix}2&-3&-5\\-1&4&5\\1&-3&-4\end{pmatrix}$ y, multiplicando,
$$A^2=\begin{pmatrix}2&-3&-5\\-1&4&5\\1&-3&-4\end{pmatrix}=A.$$
Como $A^2=A$, entonces $A^3=A^2\cdot A=A\cdot A=A$ y, por inducción, $A^n=A$ para todo $n\ge1$:

**$A^2=A^3=A^{2022}=A=\begin{pmatrix}2&-3&-5\\-1&4&5\\1&-3&-4\end{pmatrix}$.**

**c)** Para $a=3$, $|A|=3\neq0$ y $XA=I_3$ significa $X=A^{-1}$:
$$X=\begin{pmatrix}1&1&0\\\frac{1}{3}&-\frac{2}{3}&-\frac{4}{3}\\0&1&1\end{pmatrix}.$$

@@ 2
Sean $x$ los trajes e $y$ los vestidos. Restricciones: lino $x+2y\le70$; algodón $3x+2y\le150$; $x\ge0$, $y\ge0$. Beneficio: $B(x,y)=60x+70y$.

Vértices: $(0,0)$, $(0,35)$, $(40,15)$ (corte de $x+2y=70$ con $3x+2y=150$) y $(50,0)$.

| Vértice | $(0,0)$ | $(0,35)$ | $(40,15)$ | $(50,0)$ |
|---|---|---|---|---|
| $B$ | $0$ | $2\,450$ | $3\,450$ | $3\,000$ |

![Región factible del ejercicio 2 (2022-ext-res), con sus vértices: (0, 0), (50, 0), (40, 15), (0, 35)](fig/2022-ext-res-e2.svg){fig-alt="Región factible del ejercicio 2 (2022-ext-res), con sus vértices: (0, 0), (50, 0), (40, 15), (0, 35)" width="75%" fig-align="center"}

**Hay que confeccionar 40 trajes y 15 vestidos, con un beneficio máximo de $3\,450$ €.**

@@ 3
**a)** Continuidad en $x=1$: $a(1+1)^2=4a$ y $\dfrac b2+2$; así $4a=\dfrac b2+2$. Derivabilidad: $f'(x)=2a(x+1)$ si $x<1$ y $f'(x)=bx$ si $x>1$, luego $4a=b$. Sustituyendo, $4a=2a+2\Rightarrow a=1$ y $b=4$.

**$a=1$ y $b=4$.**

**b)** Con $a=1$ y $b=2$: $f(x)=(x+1)^2$ en $[-3,1]$ (arco de parábola de vértice $(-1,0)$, que pasa por $(-3,4)$, $(0,1)$ y $(1,4)$) y $f(x)=x^2+2$ en $(1,2]$ (arco de parábola que empieza, «abierto», en $(1,3)$ y llega a $(2,6)$). Hay un salto en $x=1$ (de $4$ a $3$).

![Gráfica de f para a=1 y b=2: parábola (x+1)² hasta x=1 y x²+2 desde x=1, con salto de 4 a 3; recinto sombreado entre x=−2 y x=1](fig/2022-ext-res-e3.svg){fig-alt="Gráfica de f para a=1 y b=2: parábola (x+1)² hasta x=1 y x²+2 desde x=1, con salto de 4 a 3; recinto sombreado entre x=−2 y x=1" width="75%" fig-align="center"}

Área entre $x=-2$ y $x=1$, con $f\ge0$:
$$A=\int_{-2}^{1}(x+1)^2dx=\left[\frac{(x+1)^3}{3}\right]_{-2}^{1}=\frac{8}{3}-\left(-\frac{1}{3}\right)=3.$$
**$A=3\ \text{u}^2$**

@@ 4
**a)** Dominio: $\mathbb R\setminus\{-2\}$. $f'(x)=\dfrac{(x+2)-(x-3)}{(x+2)^2}=\dfrac{5}{(x+2)^2}>0$: **$f$ es creciente en $(-\infty,-2)$ y en $(-2,+\infty)$** (sin extremos). $f''(x)=-\dfrac{10}{(x+2)^3}$: **$f$ es convexa en $(-\infty,-2)$ ($f''>0$) y cóncava en $(-2,+\infty)$ ($f''<0$)**.

**b)** Asíntota vertical: $\displaystyle\lim_{x\to-2^\pm}f=\mp\infty$ (numerador $-5$), luego **$x=-2$**. Asíntota horizontal: $\displaystyle\lim_{x\to\pm\infty}f=1$, luego **$y=1$**. Cortes: con $OX$, $f=0\Rightarrow x=3$, punto $(3,0)$; con $OY$, $f(0)=-\dfrac{3}{2}$, punto $\left(0,-\dfrac{3}{2}\right)$.

**c)** Hipérbola con asíntotas $x=-2$ e $y=1$: la rama de la derecha ($x>-2$) pasa por $\left(0,-\dfrac{3}{2}\right)$ y por $(3,0)$, y tiende a $-\infty$ junto a $x=-2$ y a $1$ por debajo cuando $x\to+\infty$; la rama de la izquierda ($x<-2$) queda por encima de $y=1$ (por ejemplo $f(-3)=6$), baja hacia $1$ cuando $x\to-\infty$ y sube a $+\infty$ junto a $x=-2$.

![Hipérbola f(x)=(x−3)/(x+2) con asíntotas x=−2 e y=1; corta a los ejes en (3,0) y (0,−3/2)](fig/2022-ext-res-e4.svg){fig-alt="Hipérbola f(x)=(x−3)/(x+2) con asíntotas x=−2 e y=1; corta a los ejes en (3,0) y (0,−3/2)" width="75%" fig-align="center"}

@@ 5
Sean $T$ «admite tarjeta» y $M$ «admite móvil»: $P(T)=0{,}8$, $P(M)=0{,}5$, $P(T^C\cap M^C)=0{,}1$.

**a)** i) $P(T\cup M)=1-0{,}1=\mathbf{0{,}9}$.

ii) $P(T\cap M)=0{,}8+0{,}5-0{,}9=0{,}4$, luego $P(M\mid T)=\dfrac{P(M\cap T)}{P(T)}=\dfrac{0{,}4}{0{,}8}=\mathbf{0{,}5}$.

**b)** $P(T)\cdot P(M)=0{,}8\cdot0{,}5=0{,}4=P(T\cap M)$: **sí son independientes** (equivalentemente, $P(M\mid T)=P(M)$).

@@ 6
Boletos: $A$: $1054$, $B$: $99$, $C$: $1335-1054-99=182$. Sea $NP$ «no premiado»: $P(NP)=0{,}95$. Boletos premiados: $5$ de $B$ y $13$ de $C$, luego
$$P(NP\cap B)=\frac{99-5}{1335}=\frac{94}{1335},\qquad P(NP\cap C)=\frac{182-13}{1335}=\frac{169}{1335},$$
$$P(NP\cap A)=0{,}95-\frac{94}{1335}-\frac{169}{1335}=\frac{4021}{5340}\approx0{,}753.$$
(El dato del $95\,\%$ se usa como probabilidad exacta.)

**b)** $P(A\mid NP)=\dfrac{P(NP\cap A)}{P(NP)}=\dfrac{4021/5340}{0{,}95}=\dfrac{4021}{5073}\approx\mathbf{0{,}7926}$.

**a)** $P(B\mid NP)=\dfrac{94/1335}{0{,}95}\approx0{,}0741$ y $P(C\mid NP)=\dfrac{169/1335}{0{,}95}\approx0{,}1333$. La mayor probabilidad es la de $A$: **el establecimiento $A$** ($0{,}7926$ frente a $0{,}1333$ y $0{,}0741$).

@@ 7
**a)** Tamaño de la población: $60\,000+20\,000+24\,000+16\,000=120\,000$. La fracción muestreada es $\dfrac{144}{24\,000}=0{,}006$, luego la muestra tiene $0{,}006\cdot120\,000=720$ personas: $0{,}006\cdot60\,000=360$, $0{,}006\cdot20\,000=120$, $144$ y $0{,}006\cdot16\,000=96$.

**Muestra total de 720 personas: 360, 120, 144 y 96.**

**b)** Muestras con reemplazamiento (9): $(1,1),(1,4),(1,7),(4,1),(4,4),(4,7),(7,1),(7,4),(7,7)$, con medias $1,\ 2{,}5,\ 4,\ 2{,}5,\ 4,\ 5{,}5,\ 4,\ 5{,}5,\ 7$.

Media: $\mu_{\bar x}=\dfrac{36}{9}=4$. Varianza: $\sigma_{\bar x}^2=\dfrac{9+2{,}25+0+2{,}25+0+2{,}25+0+2{,}25+9}{9}=\dfrac{27}{9}=3$.

**Media $4$ y desviación típica $\sqrt3\approx1{,}7321$.**

@@ 8
$\hat p=\dfrac{630}{2100}=0{,}3$, $n=2100$. Nivel $97{,}5\,\%$: $\Phi(z_{\alpha/2})=0{,}9875$ y en la tabla $\Phi(2{,}24)=0{,}9875$, luego $z_{\alpha/2}=2{,}24$.

**a)** $E=2{,}24\sqrt{\dfrac{0{,}3\cdot0{,}7}{2100}}=2{,}24\cdot0{,}01=0{,}0224$.
$$IC=(0{,}3-0{,}0224,\ 0{,}3+0{,}0224)=(0{,}2776,\ 0{,}3224).$$

**b)** $E=0{,}01\Rightarrow n\ge\dfrac{2{,}24^2\cdot0{,}3\cdot0{,}7}{0{,}01^2}=10\,536{,}96$. **El tamaño mínimo es $n=10\,537$.**
