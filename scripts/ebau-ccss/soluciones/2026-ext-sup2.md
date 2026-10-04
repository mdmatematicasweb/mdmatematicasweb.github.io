@@ 1A
**a)** Matriz de coeficientes $M=\begin{pmatrix}4&-7&5\\-2&3&-1\\6&-11&9\end{pmatrix}$, con $|M|=0$ y un menor $\left|\begin{matrix}4&-7\\-2&3\end{matrix}\right|=-2\neq0$: $\operatorname{rango}M=2$.

La tercera ecuación es combinación de las otras dos: $E_3=2E_1+E_2$ ($4\cdot2-2=6$, $-7\cdot2+3=-11$, $5\cdot2-1=9$ y, en los términos independientes, $9\cdot2-4=14$). Por tanto la matriz ampliada también tiene rango $2$. Como $\operatorname{rango}M=\operatorname{rango}\left(M\mid b\right)=2<3$ incógnitas: **sistema compatible indeterminado, con un parámetro.**

Se resuelven $E_1$ y $E_2$ tomando $z=\lambda$ como parámetro: $4x-7y=9-5\lambda$ y $-2x+3y=-4+\lambda$. Multiplicando la segunda por $2$ y sumando: $-y=1-3\lambda$, es decir, $y=3\lambda-1$; y de la segunda, $-2x=-4+\lambda-3(3\lambda-1)=-1-8\lambda$, es decir, $x=4\lambda+\dfrac{1}{2}$.

**Soluciones: $(x,y,z)=\left(4\lambda+\dfrac{1}{2},\ 3\lambda-1,\ \lambda\right)$, $\lambda\in\mathbb R$.**

**b)** $y=2z\Rightarrow3\lambda-1=2\lambda\Rightarrow\lambda=1$. **Sí existe: $(x,y,z)=\left(\dfrac{9}{2},\ 2,\ 1\right)$.**

**c)** $y=-4\Rightarrow3\lambda-1=-4\Rightarrow\lambda=-1$. **Sí existe: $(x,y,z)=\left(-\dfrac{7}{2},\ -4,\ -1\right)$.**

@@ 1B
**a)** Rectas frontera: $3x-4y=6$, $x+y=9$, $x+4y=24$, $3x+2y=6$ y $x=0$. Los vértices del recinto son
$$(0,3),\quad(0,6),\quad(2,0),\quad(4,5),\quad(6,3),$$
donde $(0,3)$ es el corte de $x=0$ con $3x+2y=6$, $(0,6)$ el de $x=0$ con $x+4y=24$, $(4,5)$ el de $x+4y=24$ con $x+y=9$, $(6,3)$ el de $x+y=9$ con $3x-4y=6$ y $(2,0)$ el de $3x-4y=6$ con $3x+2y=6$.

![Región factible del ejercicio 1B (2026-ext-sup2), con sus vértices: (0, 3), (2, 0), (6, 3), (4, 5), (0, 6)](fig/2026-ext-sup2-e1b.svg){fig-alt="Región factible del ejercicio 1B (2026-ext-sup2), con sus vértices: (0, 3), (2, 0), (6, 3), (4, 5), (0, 6)" width="75%" fig-align="center"}

**b)** $P(3;0{,}9)$: $3\cdot3-4\cdot0{,}9=5{,}4\le6$; $3+0{,}9=3{,}9\le9$; $3+4\cdot0{,}9=6{,}6\le24$; $3\cdot3+2\cdot0{,}9=10{,}8\ge6$; $3\ge0$. **$P$ pertenece al recinto.**

$Q(1;5{,}9)$: $1+4\cdot5{,}9=24{,}6>24$, no cumple $x+4y\le24$. **$Q$ no pertenece al recinto.**

**c)** $F(0,3)=7$, $F(0,6)=16$, $F(2,0)=2$, $F(4,5)=21$, $F(6,3)=19$.

**Máximo $21$ en el punto $(4,5)$ y mínimo $2$ en el punto $(2,0)$.**

@@ 2
**a)** $I'(t)=\dfrac{\ln2}{100}\cdot2^t>0$ para todo $t$: **el índice aumenta en todo el intervalo $[0,13]$.**

**b)** $I(t)=10{,}24\iff\dfrac{2^t}{100}=10{,}24\iff2^t=1\,024=2^{10}\iff t=10$.

**Se obtendrá a las $10$ semanas.**

**c)** La tasa de crecimiento instantánea es $I'(5)=\dfrac{\ln2}{100}\cdot2^5=0{,}32\ln2\approx0{,}2218$.

**$I'(5)\approx0{,}22$ puntos de índice por semana.**

**d)** $I$ es creciente, luego su máximo en el trimestre está en $t=13$: $I(13)=\dfrac{2^{13}}{100}=\dfrac{8\,192}{100}=81{,}92<90$.

**No es posible alcanzar un índice de $90$ durante el trimestre** (el máximo es $81{,}92$).

@@ 3
$P(A)=0{,}6$, $P\left(A^C\cap B^C\right)=0{,}15$, $P(B\mid A)=0{,}3$.

**a)** $P(A\cup B)=1-P\left(A^C\cap B^C\right)=1-0{,}15=\mathbf{0{,}85}$.

**b)** $P(A\cap B)=P(A)\,P(B\mid A)=0{,}6\cdot0{,}3=\mathbf{0{,}18}$.

**c)** $P(\text{uno y solo uno})=P(A\cup B)-P(A\cap B)=0{,}85-0{,}18=\mathbf{0{,}67}$.

**d)** $P(B)=P(A\cup B)-P(A)+P(A\cap B)=0{,}85-0{,}6+0{,}18=0{,}43$ y $P(A)P(B)=0{,}6\cdot0{,}43=0{,}258\neq0{,}18=P(A\cap B)$: **sí son dependientes.**

@@ 4A
$T\sim N(40,\ 5)$.

**a)** $P(T<33{,}6)=P\!\left(Z<\dfrac{33{,}6-40}{5}\right)=P(Z<-1{,}28)=1-P(Z<1{,}28)=1-0{,}8997=\mathbf{0{,}1003}$.

**b)** $X$ = «viajes rápidos de $5$»: $X\sim B(5;\ 0{,}1003)$.
$$P(X\ge3)=\binom53p^3q^2+\binom54p^4q+p^5\quad(p=0{,}1003,\ q=0{,}8997)=0{,}00817+0{,}00046+0{,}00001\approx\mathbf{0{,}0086}.$$

**c)** $Y$ = «viajes rápidos de $80$»: $Y\sim B(80;\ 0{,}1003)$. Como $np=8{,}02\ge5$ y $nq=71{,}98\ge5$, $Y\approx N\!\left(8{,}02,\ \sqrt{80\cdot0{,}1003\cdot0{,}8997}\right)=N(8{,}02;\ 2{,}687)$. Con corrección por continuidad:
$$P(Y\le15)=P(Y'<15{,}5)=P\!\left(Z<\frac{15{,}5-8{,}02}{2{,}687}\right)=P(Z<2{,}78)=\mathbf{0{,}9973}.$$

@@ 4B
$\sigma=\sqrt{0{,}09}=0{,}3$, $n=10$. Suma de las medidas: $61$, luego $\bar x=6{,}1$.

**a)** Nivel $97\,\%$: $z_{\alpha/2}=2{,}17$. $E=2{,}17\cdot\dfrac{0{,}3}{\sqrt{10}}=0{,}2059$.
$$IC=(6{,}1-0{,}2059,\ 6{,}1+0{,}2059)=(5{,}8941,\ 6{,}3059).$$

**b)** El valor $6{,}5$ **no pertenece al intervalo** (queda por encima de $6{,}3059$): **no puede admitirse** que la cantidad media sea $6{,}5$.

**c)** Nivel $98\,\%$: $z_{\alpha/2}=2{,}33$. $E\le0{,}1\iff n\ge\left(\dfrac{2{,}33\cdot0{,}3}{0{,}1}\right)^2=48{,}86$. **Hacen falta al menos $n=49$ analíticas.**
