@@ 1
**a)** Sumando las dos ecuaciones: $(A+I_3)X+Y+X-Y=(A-I_3)+I_3\Rightarrow(A+2I_3)X=A$. Con $A+2I_3=\begin{pmatrix}4&1&0\\0&3&2\\2&2&4\end{pmatrix}$, $|A+2I_3|=36\neq0$ y $(A+2I_3)^{-1}=\begin{pmatrix}\frac{2}{9}&-\frac{1}{9}&\frac{1}{18}\\\frac{1}{9}&\frac{4}{9}&-\frac{2}{9}\\-\frac{1}{6}&-\frac{1}{6}&\frac{1}{3}\end{pmatrix}$:
$$X=(A+2I_3)^{-1}A=\begin{pmatrix}\frac{5}{9}&\frac{2}{9}&-\frac{1}{9}\\-\frac{2}{9}&\frac{1}{9}&\frac{4}{9}\\\frac{1}{3}&\frac{1}{3}&\frac{1}{3}\end{pmatrix},\qquad Y=X-I_3=\begin{pmatrix}-\frac{4}{9}&\frac{2}{9}&-\frac{1}{9}\\-\frac{2}{9}&-\frac{8}{9}&\frac{4}{9}\\\frac{1}{3}&\frac{1}{3}&-\frac{2}{3}\end{pmatrix}.$$

**b)** $A+I_3=\begin{pmatrix}3&1&0\\0&2&2\\2&2&3\end{pmatrix}$, con $|A+I_3|=10\neq0$: **rango $3$, es invertible.**

$A-I_3=\begin{pmatrix}1&1&0\\0&0&2\\2&2&1\end{pmatrix}$, con $|A-I_3|=0$ (las columnas primera y segunda son iguales) y un menor $\left|\begin{matrix}1&0\\0&2\end{matrix}\right|=2\neq0$: **rango $2$, no es invertible.**

@@ 2
Sean $x$ los menús *premium* e $y$ los *estándar*. Restricciones: cocina $2x+3y\le58$; empaquetado $2x+y\le50$; almacenamiento $x+4y\le60$; $x\ge0$, $y\ge0$. Beneficio: $B(x,y)=10{,}5x+5{,}5y$.

Vértices: $(0,0)$, $(0,15)$, $\left(\dfrac{52}{5},\dfrac{62}{5}\right)$ (corte de $x+4y=60$ con $2x+3y=58$), $(23,4)$ (corte de $2x+3y=58$ con $2x+y=50$) y $(25,0)$.

| Vértice | $(0,0)$ | $(0,15)$ | $\left(\frac{52}{5},\frac{62}{5}\right)$ | $(23,4)$ | $(25,0)$ |
|---|---|---|---|---|---|
| $B$ | $0$ | $82{,}5$ | $177{,}4$ | $263{,}5$ | $262{,}5$ |

**Deben elaborarse 23 menús *premium* y 4 *estándar*, con un beneficio máximo de $263{,}50$ €.** (Almacenamiento usado: $23+16=39\le60$.)

@@ 3
**a)** En $x=-1$: $\displaystyle\lim_{x\to-1^-}ae^{x+1}=a$ y $\displaystyle\lim_{x\to-1^+}\left(x^2-2\right)=-1$: $a=-1$. En $x=2$: $\displaystyle\lim_{x\to2^-}\left(x^2-2\right)=2$ y $f(2)=b\log(12-2)=b\log10=b$ (logaritmo decimal): $b=2$.

**$a=-1$ y $b=2$.**

**b)** Los cortes: $-x+3=-x^2+5\iff x^2-x-2=0\iff x=-1$ o $x=2$, en los puntos $(-1,4)$ y $(2,1)$. En $[-1,2]$ la parábola (de vértice $(0,5)$, abierta hacia abajo) queda por encima de la recta.
$$A=\int_{-1}^{2}\left[\left(-x^2+5\right)-\left(-x+3\right)\right]dx=\int_{-1}^{2}\left(-x^2+x+2\right)dx=\left[-\frac{x^3}{3}+\frac{x^2}{2}+2x\right]_{-1}^{2}=\frac{10}{3}-\left(-\frac{7}{6}\right)=\frac{9}{2}.$$
**$A=\dfrac{9}{2}\ \text{u}^2$**

@@ 4
**a)** El nivel inicial es $f(0)=10$.

Continuidad en $t=2{,}5$: $-2{,}5^2+2\cdot2{,}5+10=8{,}75$ y $2{,}5^2+2{,}5a+b=6{,}25+2{,}5a+b$; luego $6{,}25+2{,}5a+b=8{,}75$. Derivabilidad: $f'(t)=-2t+2$ si $t<2{,}5$ y $f'(t)=2t+a$ si $t>2{,}5$; en $t=2{,}5$: $-3=5+a\Rightarrow a=-8$. Entonces $6{,}25-20+b=8{,}75\Rightarrow b=22{,}5$.

**Comienza con nivel $10$; $a=-8$ y $b=22{,}5$.**

**b)** Tramo 1: $f'(t)=-2t+2=0\Rightarrow t=1$; crece en $(0,1)$ y decrece en $(1,2{,}5)$, con $f(1)=11$. Tramo 2: $f(t)=t^2-8t+22{,}5$, $f'(t)=2t-8=0\Rightarrow t=4$; decrece en $(2{,}5;4)$ y crece en $(4,5)$, con $f(4)=6{,}5$. Valores: $f(0)=10$, $f(2{,}5)=8{,}75$, $f(5)=7{,}5$.

**Concentración máxima $11$ a la hora $t=1$ y mínima $6{,}5$ a las $4$ horas.** Gráfica: sube desde $(0,10)$ hasta el máximo $(1,11)$, baja hasta el mínimo $(4;6{,}5)$ (pasando por $(2{,}5;8{,}75)$ sin pico) y sube hasta $(5;7{,}5)$.

@@ 5
$P(CF)=0{,}62$, $P(T)=0{,}25$, $P(M)=1-0{,}62-0{,}25=0{,}13$. Sea $R$ «recomendación correcta»: $P(R\mid CF)=0{,}7$, $P(R\mid T)=0{,}75$, $P(R\mid M)=0{,}15$.

**a)** $P(R)=0{,}62\cdot0{,}7+0{,}25\cdot0{,}75+0{,}13\cdot0{,}15=0{,}434+0{,}1875+0{,}0195=\mathbf{0{,}641}$.

**b)** $P(T\mid R^C)=\dfrac{P(T)\,P(R^C\mid T)}{P(R^C)}=\dfrac{0{,}25\cdot0{,}25}{1-0{,}641}=\dfrac{0{,}0625}{0{,}359}=\dfrac{125}{718}\approx\mathbf{0{,}1741}$.

**c)** $P(CF\cap R\cap\text{satisfecho})=0{,}62\cdot0{,}7\cdot0{,}55=\mathbf{0{,}2387}$.

@@ 6
$\sigma=4{,}2$, $n=30$, $\bar x=11{,}3$; $\dfrac{\sigma}{\sqrt n}=0{,}7668$.

**a)** Nivel $97\,\%$: $z_{\alpha/2}=2{,}17$. $E=2{,}17\cdot0{,}7668=1{,}664$.
$$IC=(11{,}3-1{,}664,\ 11{,}3+1{,}664)=(9{,}636,\ 12{,}964).$$
El valor $9{,}8$ **sí está en el intervalo**: **la afirmación de la gerencia es posible** (compatible con los datos).

**b)** Nivel $95\,\%$: $z_{\alpha/2}=1{,}96$. $E\le0{,}6\iff n\ge\left(\dfrac{1{,}96\cdot4{,}2}{0{,}6}\right)^2=188{,}24$. **Hacen falta al menos $n=189$ usuarios.**

@@ 7
$\hat p=\dfrac{130}{200}=0{,}65$, $n=200$.

**a)** Nivel $96{,}5\,\%$: $z_{\alpha/2}=2{,}11$ (pues $\Phi(2{,}11)=0{,}9826\approx0{,}9825$). $E=2{,}11\sqrt{\dfrac{0{,}65\cdot0{,}35}{200}}=2{,}11\cdot0{,}03373=0{,}0712$.
$$IC=(0{,}65-0{,}0712,\ 0{,}65+0{,}0712)=(0{,}5788,\ 0{,}7212).$$

**b)** Nivel $99\,\%$: $\Phi(z_{\alpha/2})=0{,}995$, que está entre $\Phi(2{,}57)=0{,}9949$ y $\Phi(2{,}58)=0{,}9951$; se toma $z_{\alpha/2}=2{,}575$. $E\le0{,}02$:
$$n\ge\frac{2{,}575^2\cdot0{,}65\cdot0{,}35}{0{,}02^2}=3\,771{,}17.$$
**Hacen falta al menos $n=3\,772$ personas.**

**c)** $E=z_{\alpha/2}\sqrt{\dfrac{\hat p(1-\hat p)}{n}}$ con $\hat p$ y $n$ fijos. Al aumentar el nivel de confianza, $z_{\alpha/2}$ aumenta: **el error máximo aumenta.**
