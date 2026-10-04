@@ 1
**a)** Sean $r$, $g$ y $v$ los precios de la entrada del taller de repostería, la demostración de cocina gourmet y la cata de vinos. Las condiciones dan
$$\begin{cases}120r+50g+150v=6\,460\\10r=2v+g\\2r+v=2g+6\end{cases}\qquad\text{es decir}\qquad\begin{cases}120r+50g+150v=6\,460\\10r-g-2v=0\\2r-2g+v=6\end{cases}$$
De la segunda, $g=10r-2v$. En la tercera: $2r-20r+4v+v=6\Rightarrow-18r+5v=6$. En la primera: $120r+500r-100v+150v=6\,460\Rightarrow620r+50v=6\,460\Rightarrow62r+5v=646$. Restando: $80r=640\Rightarrow r=8$; entonces $5v=6+144=150\Rightarrow v=30$ y $g=80-60=20$.

**Taller de repostería $8$ €, demostración de cocina gourmet $20$ € y cata de vinos $30$ €.** (Comprobación: $960+1\,000+4\,500=6\,460$.)

**b)** $|A|=0$ (la tercera fila es $2F_1+F_2$) y el menor $\left|\begin{matrix}1&0\\-1&2\end{matrix}\right|=2\neq0$: **rango de $A$ igual a $2$.**

$A^2=\begin{pmatrix}0&-2&-2\\0&10&10\\0&6&6\end{pmatrix}$: todas sus filas son proporcionales a $(0,1,1)$ y no es nula: **rango de $A^2$ igual a $1$.**

@@ 2
Sean $x$ las lavadoras e $y$ los frigoríficos. El tiempo disponible es $26\ \text{h}\ 40\ \text{min}=1\,600$ min. Restricciones: $100x+50y\le1\,600\iff2x+y\le32$; $x\le12$; $y\le16$; $x\ge0$, $y\ge0$. Como se paga a $50$ €/h $=\dfrac{5}{6}$ €/min, el ingreso es $I(x,y)=\dfrac{5}{6}\left(100x+50y\right)=\dfrac{250}{3}x+\dfrac{125}{3}y$.

Vértices: $(0,0)$, $(12,0)$, $(12,8)$, $(8,16)$ y $(0,16)$.

| Vértice | $(0,0)$ | $(12,0)$ | $(12,8)$ | $(8,16)$ | $(0,16)$ |
|---|---|---|---|---|---|
| $I$ | $0$ | $1\,000$ | $1\,333{,}33$ | $1\,333{,}33$ | $666{,}67$ |

El máximo se alcanza en los dos vértices $(12,8)$ y $(8,16)$ y, por tanto, en todos los puntos del segmento $2x+y=32$ que los une (aquellos en que se agotan los $1\,600$ minutos).

**Ingreso máximo: $1\,333{,}33$ € (es decir, $\dfrac{4\,000}{3}$ €), por ejemplo revisando 12 lavadoras y 8 frigoríficos, u 8 lavadoras y 16 frigoríficos** (o cualquier combinación entera con $2x+y=32$, $8\le x\le12$: $(11,10)$, $(10,12)$, $(9,14)$).

@@ 3
**a)** $f(0)=c=20$. El máximo en $t=40$ exige $f'(40)=2a\cdot40+b=0\Rightarrow b=-80a$, y $f(40)=1\,600a+40b+c=36$: $1\,600a-3\,200a+20=36\Rightarrow-1\,600a=16\Rightarrow a=-0{,}01$ y $b=0{,}8$.

**$a=-0{,}01$, $b=0{,}8$, $c=20$:** $f(t)=-0{,}01t^2+0{,}8t+20$.

Gráfica: arco de parábola abierta hacia abajo que parte de $(0,20)$, crece hasta el máximo $(40,36)$ y decrece hasta $(60,32)$ (pasa por $(20,32)$, simétrico de $(60,32)$ respecto de $t=40$).

**b)** $g'(x)=\dfrac{2x}{x^2-1}-\dfrac{2x}{x^2+1}=\dfrac{2x\left(x^2+1\right)-2x\left(x^2-1\right)}{x^4-1}=\dfrac{4x}{x^4-1}$.

$h'(x)=2e^{x^2-x}+(2x-1)(2x-1)e^{x^2-x}=e^{x^2-x}\left[(2x-1)^2+2\right]=e^{x^2-x}\left(4x^2-4x+3\right)$.

@@ 4
**a)** En $x=-2$: $\displaystyle\lim_{x\to-2^-}\left(10+\frac{5x}{2}\right)=5$ y $\displaystyle\lim_{x\to-2^+}\left(x^2+1\right)=5=f(-2)$: **continua.** Derivadas: $f'(x)=\dfrac{5}{2}$ si $x<-2$ y $f'(x)=2x$ si $-2<x<2$; $f'(-2^-)=\dfrac{5}{2}\neq f'(-2^+)=-4$: **no derivable en $x=-2$.**

**b)** Pendiente $-1$: en el tramo central $f'(x)=2x=-1\Rightarrow x=-\dfrac{1}{2}$ (válido, pues está en $(-2,2)$); los otros tramos tienen pendientes $\pm\dfrac{5}{2}$. $f\left(-\dfrac{1}{2}\right)=\dfrac{5}{4}$. Tangente: $y-\dfrac{5}{4}=-\left(x+\dfrac{1}{2}\right)$.

**$y=-x+\dfrac{3}{4}$.**

**c)** $f\ge0$ en $[-4,4]$ ($10+\frac{5x}{2}=0$ en $x=-4$ y $10-\frac{5x}{2}=0$ en $x=4$); fuera de ese intervalo $f<0$. La región acotada va de $x=-4$ a $x=4$: una «tienda» con vértices $(-4,0)$, $(-2,5)$, $(2,5)$ y $(4,0)$ cuyo techo central es la parábola $y=x^2+1$.
$$A=\int_{-4}^{-2}\left(10+\frac{5x}{2}\right)dx+\int_{-2}^{2}\left(x^2+1\right)dx+\int_2^4\left(10-\frac{5x}{2}\right)dx=5+\frac{28}{3}+5=\frac{58}{3}.$$
**$A=\dfrac{58}{3}\ \text{u}^2$**

@@ 5
Sean $M$ «mujer» ($0{,}66$) y $N$ «cosmética natural»: $P(N\mid M)=0{,}71$, $P(H\cap N^C)=0{,}1786$.

$P(M\cap N)=0{,}66\cdot0{,}71=0{,}4686$. $P(H)=1-0{,}66=0{,}34$, luego $P(H\cap N)=P(H)-P(H\cap N^C)=0{,}34-0{,}1786=0{,}1614$.

**b)** $P(N)=P(M\cap N)+P(H\cap N)=0{,}4686+0{,}1614=\mathbf{0{,}63}$.

**a)** $P(M\cup N)=P(M)+P(N)-P(M\cap N)=0{,}66+0{,}63-0{,}4686=\mathbf{0{,}8214}$.

**c)** $P(H\mid N)=\dfrac{P(H\cap N)}{P(N)}=\dfrac{0{,}1614}{0{,}63}=\dfrac{269}{1050}\approx\mathbf{0{,}2562}$.

**d)** $P(M\cap N)=0{,}4686\neq0$: **no son incompatibles.** $P(M)P(N)=0{,}66\cdot0{,}63=0{,}4158\neq0{,}4686=P(M\cap N)$: **no son independientes.**

@@ 6
**a)** $X$ = «número de pacientes, de $5$, que mejoran»: $X\sim B(5;\ 0{,}6)$.
$$P(X=4)=\binom54\,0{,}6^4\cdot0{,}4=5\cdot0{,}1296\cdot0{,}4=\mathbf{0{,}2592}.$$

**b)** $P(X\ge2)=1-P(X=0)-P(X=1)=1-0{,}4^5-5\cdot0{,}6\cdot0{,}4^4=1-0{,}01024-0{,}0768=\mathbf{0{,}91296}$.

**c)** $E(X)=np=5\cdot0{,}6=\mathbf{3}$ pacientes.

**d)** $E(X)=0{,}6n\ge12\iff n\ge20$. **Deberían someterse al menos $20$ pacientes.**

@@ 7
Fresas: $\hat p_F=\dfrac{180}{300}=0{,}6$; frambuesas: $\hat p_R=\dfrac{120}{300}=0{,}4$; $n=300$.

**a)** Nivel $97\,\%$: $z_{\alpha/2}=2{,}17$. Como $\hat p_F(1-\hat p_F)=\hat p_R(1-\hat p_R)=0{,}24$, el error es el mismo: $E=2{,}17\sqrt{\dfrac{0{,}24}{300}}=2{,}17\cdot0{,}02828=0{,}0614$.

- Fresas: $IC=(0{,}6-0{,}0614,\ 0{,}6+0{,}0614)=(0{,}5386,\ 0{,}6614)$.
- Frambuesas: $IC=(0{,}4-0{,}0614,\ 0{,}4+0{,}0614)=(0{,}3386,\ 0{,}4614)$.

**b)** Nivel $95\,\%$: $z_{\alpha/2}=1{,}96$. Como $\hat p(1-\hat p)=0{,}24$ en ambos casos: $E\le0{,}02\iff n\ge\dfrac{1{,}96^2\cdot0{,}24}{0{,}02^2}=2\,304{,}96$.

**Deberían seleccionarse al menos $2\,305$ kg de frutos.**
