@@ 1A
**a) Clasificación y resolución.**
1. Matriz de coeficientes: $M=\begin{pmatrix}4&-7&5\\-2&3&-1\\6&-11&9\end{pmatrix}$, con $|M|=0$.
2. Un menor de orden $2$ no nulo: $\left|\begin{matrix}4&-7\\-2&3\end{matrix}\right|=-2\neq0$, luego $\operatorname{rango}M=2$.
3. La tercera ecuación es combinación de las otras dos: $E_3=2E_1+E_2$ ($4\cdot2-2=6$, $-7\cdot2+3=-11$, $5\cdot2-1=9$ y, en los términos independientes, $9\cdot2-4=14$). Por tanto la matriz ampliada también tiene rango $2$.
4. Rouché–Frobenius: $\operatorname{rango}M=\operatorname{rango}\left(M\mid b\right)=2<3$ incógnitas: **sistema compatible indeterminado, con un parámetro.**
5. Se resuelven $E_1$ y $E_2$ tomando $z=\lambda$: $4x-7y=9-5\lambda$ y $-2x+3y=-4+\lambda$.
6. Se multiplica la segunda por $2$ y se suma a la primera: $-y=1-3\lambda$, es decir, $y=3\lambda-1$.
7. De la segunda, $-2x=-4+\lambda-3(3\lambda-1)=-1-8\lambda$, es decir, $x=4\lambda+\dfrac{1}{2}$.

**Soluciones: $(x,y,z)=\left(4\lambda+\dfrac{1}{2},\ 3\lambda-1,\ \lambda\right)$, $\lambda\in\mathbb R$.**

**b) Solución con $y=2z$.**
1. Se impone en la solución general: $y=2z\Rightarrow3\lambda-1=2\lambda\Rightarrow\lambda=1$.

**Sí existe: $(x,y,z)=\left(\dfrac{9}{2},\ 2,\ 1\right)$.**

**c) Solución con $y=-4$.**
1. $y=-4\Rightarrow3\lambda-1=-4\Rightarrow\lambda=-1$.

**Sí existe: $(x,y,z)=\left(-\dfrac{7}{2},\ -4,\ -1\right)$.**

@@ 1B
**a) Recinto y vértices.**
1. Rectas frontera: $3x-4y=6$, $x+y=9$, $x+4y=24$, $3x+2y=6$ y $x=0$.
2. En cada una se sombrea el semiplano que cumple la desigualdad y se toma la zona común.
3. Los vértices del recinto son
$$(0,3),\quad(0,6),\quad(2,0),\quad(4,5),\quad(6,3),$$
donde $(0,3)$ es el corte de $x=0$ con $3x+2y=6$, $(0,6)$ el de $x=0$ con $x+4y=24$, $(4,5)$ el de $x+4y=24$ con $x+y=9$, $(6,3)$ el de $x+y=9$ con $3x-4y=6$ y $(2,0)$ el de $3x-4y=6$ con $3x+2y=6$.

![Región factible del ejercicio 1B (2026-ext-sup2), con sus vértices: (0, 3), (2, 0), (6, 3), (4, 5), (0, 6)](fig/2026-ext-sup2-e1b.svg){fig-alt="Región factible del ejercicio 1B (2026-ext-sup2), con sus vértices: (0, 3), (2, 0), (6, 3), (4, 5), (0, 6)" width="75%" fig-align="center"}

**b) Pertenencia de $P$ y $Q$.** Un punto pertenece al recinto si cumple las cinco desigualdades.
1. $P(3;0{,}9)$: $3\cdot3-4\cdot0{,}9=5{,}4\le6$; $3+0{,}9=3{,}9\le9$; $3+4\cdot0{,}9=6{,}6\le24$; $3\cdot3+2\cdot0{,}9=10{,}8\ge6$; $3\ge0$. **$P$ pertenece al recinto.**
2. $Q(1;5{,}9)$: $1+4\cdot5{,}9=24{,}6>24$, no cumple $x+4y\le24$. **$Q$ no pertenece al recinto.**

**c) Máximo y mínimo de $F(x,y)=2x+3y-2$.**
1. Se evalúa $F$ en los vértices: $F(0,3)=7$, $F(0,6)=16$, $F(2,0)=2$, $F(4,5)=21$, $F(6,3)=19$.

**Máximo $21$ en el punto $(4,5)$ y mínimo $2$ en el punto $(2,0)$.**

@@ 2
**a) Intervalo de crecimiento.**
1. Derivada: $I'(t)=\dfrac{\ln2}{100}\cdot2^t$.
2. $I'(t)>0$ para todo $t$.

**El índice aumenta en todo el intervalo $[0,13]$.**

**b) Semanas para llegar a $10{,}24$.**
1. $I(t)=10{,}24\iff\dfrac{2^t}{100}=10{,}24\iff2^t=1\,024=2^{10}$.
2. Los exponentes deben coincidir: $t=10$.

**Se obtendrá a las $10$ semanas.**

**c) Tasa de crecimiento instantánea a las $5$ semanas.**
1. La tasa instantánea es la derivada: $I'(5)=\dfrac{\ln2}{100}\cdot2^5=0{,}32\ln2\approx0{,}2218$.

**$I'(5)\approx0{,}22$ puntos de índice por semana.**

**d) ¿Se alcanza el índice $90$?**
1. $I$ es creciente, así que su máximo en el trimestre está en $t=13$.
2. $I(13)=\dfrac{2^{13}}{100}=\dfrac{8\,192}{100}=81{,}92<90$.

**No es posible alcanzar un índice de $90$ durante el trimestre** (el máximo es $81{,}92$).

@@ 3
1. **Datos.** $P(A)=0{,}6$, $P\left(A^C\cap B^C\right)=0{,}15$, $P(B\mid A)=0{,}3$.

**a) Alguno de los dos.**
1. Es el complementario de «ninguno»: $P(A\cup B)=1-P\left(A^C\cap B^C\right)=1-0{,}15=\mathbf{0{,}85}$.

**b) Los dos a la vez.**
1. Regla del producto: $P(A\cap B)=P(A)\,P(B\mid A)=0{,}6\cdot0{,}3=\mathbf{0{,}18}$.

**c) Uno y solo uno.**
1. Es la unión menos la intersección: $P(\text{uno y solo uno})=P(A\cup B)-P(A\cap B)=0{,}85-0{,}18=\mathbf{0{,}67}$.

**d) Dependencia.**
1. De la unión: $P(B)=P(A\cup B)-P(A)+P(A\cap B)=0{,}85-0{,}6+0{,}18=0{,}43$.
2. Serían independientes si $P(A)P(B)=P(A\cap B)$. Aquí $P(A)P(B)=0{,}6\cdot0{,}43=0{,}258\neq0{,}18=P(A\cap B)$: **sí son dependientes.**

@@ 4A
**Datos.** $T\sim N(40,\ 5)$.

**a) Viaje «rápido».**
1. Se tipifica y se lee en la tabla ($\Phi(1{,}28)=0{,}8997$):
$$P(T<33{,}6)=P\!\left(Z<\dfrac{33{,}6-40}{5}\right)=P(Z<-1{,}28)=1-P(Z<1{,}28)=1-0{,}8997=\mathbf{0{,}1003}.$$

**b) Al menos $3$ de $5$.**
1. $X$ = «viajes rápidos de $5$»: $X\sim B(5;\ 0{,}1003)$, con $p=0{,}1003$ y $q=0{,}8997$.
2. Se suman los casos $3$, $4$ y $5$:
$$P(X\ge3)=\binom53p^3q^2+\binom54p^4q+p^5=0{,}00817+0{,}00046+0{,}00001\approx\mathbf{0{,}0086}.$$

**c) A lo sumo $15$ de $80$.**
1. $Y$ = «viajes rápidos de $80$»: $Y\sim B(80;\ 0{,}1003)$.
2. Comprobación: $np=8{,}02\ge5$ y $nq=71{,}98\ge5$, se aproxima por $Y'\sim N\!\left(8{,}02,\ \sqrt{80\cdot0{,}1003\cdot0{,}8997}\right)=N(8{,}02;\ 2{,}687)$.
3. Corrección por continuidad y tabla ($\Phi(2{,}78)=0{,}9973$):
$$P(Y\le15)=P(Y'<15{,}5)=P\!\left(Z<\frac{15{,}5-8{,}02}{2{,}687}\right)=P(Z<2{,}78)=\mathbf{0{,}9973}.$$

*Interpretación:* es casi seguro que no más de $15$ de los $80$ trayectos sean rápidos.

@@ 4B
**Datos.** $\sigma=\sqrt{0{,}09}=0{,}3$, $n=10$. Suma de las medidas: $61$, luego $\bar x=\dfrac{61}{10}=6{,}1$.

**a) Intervalo al $97\,\%$.**
1. Valor crítico: $z_{\alpha/2}=2{,}17$ (tabla: $\Phi(2{,}17)=0{,}9850$).
2. Error máximo: $E=2{,}17\cdot\dfrac{0{,}3}{\sqrt{10}}=0{,}2059$.
3. Intervalo:
$$IC=(6{,}1-0{,}2059,\ 6{,}1+0{,}2059)=(5{,}8941,\ 6{,}3059).$$

*Interpretación:* con confianza del $97\,\%$, la hemoglobina glicosilada media está entre $5{,}8941\,\%$ y $6{,}3059\,\%$.

**b) ¿Puede ser $6{,}5$?**
1. Se mira si $6{,}5$ está en el intervalo: queda por encima de $6{,}3059$.

El valor $6{,}5$ **no pertenece al intervalo**: **no puede admitirse** que la cantidad media sea $6{,}5$.

**c) Tamaño mínimo al $98\,\%$.**
1. Valor crítico: $\Phi(z_{\alpha/2})=0{,}99$ y la tabla da $\Phi(2{,}33)=0{,}9901$, el más cercano, luego $z_{\alpha/2}=2{,}33$.
2. Se impone $E\le0{,}1$ y se despeja $n$:
$$E\le0{,}1\iff n\ge\left(\dfrac{2{,}33\cdot0{,}3}{0{,}1}\right)^2=48{,}86.$$
3. Se redondea hacia arriba.

**Hacen falta al menos $n=49$ analíticas.**
