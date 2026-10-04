@@ 1
Gramos por lata y precio por kilo: el coste de las materias primas de una lata de la receta $i$ con el proveedor $j$ es $\dfrac{1}{1000}\,R\cdot P^t$, con $R=\begin{pmatrix}500&300&200\\600&100&300\end{pmatrix}$ (recetas en filas) y $P=\begin{pmatrix}0{,}5&0{,}4&0{,}6\\0{,}4&0{,}5&0{,}7\end{pmatrix}$ (proveedores en filas):
$$\frac{1}{1000}R\,P^t=\begin{pmatrix}0{,}49&0{,}49\\0{,}52&0{,}50\end{pmatrix}\quad\text{(euros por lata; filas: recetas; columnas: proveedores)}.$$
Precio de venta por lata $=$ materias primas $+$ producción $+$ transporte $+$ beneficio ($0{,}05$ €):

| | Proveedor 1 | Proveedor 2 |
|---|---|---|
| Receta 1 | $0{,}49+0{,}11+0{,}02+0{,}05=0{,}67$ | $0{,}49+0{,}11+0{,}03+0{,}05=0{,}68$ |
| Receta 2 | $0{,}52+0{,}09+0{,}02+0{,}05=0{,}68$ | $0{,}50+0{,}09+0{,}03+0{,}05=0{,}67$ |

Pedido: receta 1, $5\,000$ latas del proveedor 1 y $6\,000$ del proveedor 2; receta 2, $6\,000$ del proveedor 1 y $5\,000$ del proveedor 2.
$$5\,000\cdot0{,}67+6\,000\cdot0{,}68+6\,000\cdot0{,}68+5\,000\cdot0{,}67=3\,350+4\,080+4\,080+3\,350=14\,860.$$
**La conservera debe cobrar $14\,860$ €.**

@@ 2
Sean $x$ los viajes de $B_1$ e $y$ los de $B_2$. Restricciones: $x\le14$; $x\ge y$; $10\le x+y\le24$; $y\ge0$. Beneficio: $B(x,y)=15\,000x+17\,000y$.

Vértices: $(5,5)$, $(10,0)$, $(14,0)$, $(14,10)$ y $(12,12)$.

| Vértice | $(5,5)$ | $(10,0)$ | $(14,0)$ | $(14,10)$ | $(12,12)$ |
|---|---|---|---|---|---|
| $B$ | $160\,000$ | $150\,000$ | $210\,000$ | $380\,000$ | $384\,000$ |

![Región factible del ejercicio 2 (2023-ord-res-b), con sus vértices: (5, 5), (10, 0), (14, 0), (14, 10), (12, 12)](fig/2023-ord-res-b-e2.svg){fig-alt="Región factible del ejercicio 2 (2023-ord-res-b), con sus vértices: (5, 5), (10, 0), (14, 0), (14, 10), (12, 12)" width="75%" fig-align="center"}

**Cada barco debe realizar 12 viajes, con un beneficio máximo de $384\,000$ €.**

@@ 3
**a)** $f'(x)=3\left(x^2-7\right)^2\cdot2x\cdot e^{5-x}-\left(x^2-7\right)^3e^{5-x}=\left(x^2-7\right)^2e^{5-x}\left(6x-x^2+7\right)$.

$g'(x)=\dfrac{\dfrac{4x^3-4x}{x^4-2x^2}\left(8-x^3\right)+3x^2\ln\left(x^4-2x^2\right)}{\left(8-x^3\right)^2}$.

**b)** Los cortes: $-x^2+2x+3=-2x+6\iff x^2-4x+3=0\iff x=1$ o $x=3$, en los puntos $(1,4)$ y $(3,0)$. En $[1,3]$ la parábola (vértice $(1,4)$, abierta hacia abajo) queda por encima de la recta.
$$A=\int_1^3\left[\left(-x^2+2x+3\right)-\left(-2x+6\right)\right]dx=\int_1^3\left(-x^2+4x-3\right)dx=\left[-\frac{x^3}{3}+2x^2-3x\right]_1^3=0-\left(-\frac{4}{3}\right)=\frac{4}{3}.$$
**$A=\dfrac{4}{3}\ \text{u}^2$**

![Región acotada entre la recta y=−2x+6 y la parábola y=−x²+2x+3, que se cortan en (1,4) y (3,0)](fig/2023-ord-res-b-e3.svg){fig-alt="Región acotada entre la recta y=−2x+6 y la parábola y=−x²+2x+3, que se cortan en (1,4) y (3,0)" width="75%" fig-align="center"}

@@ 4
**a)** En $t=1$: $-1+12-20=-9=f(1)$. En $t=11$: $-121+132-20=-9=f(11)$. **$f$ es continua en todo su dominio $[0,24]$.**

**b)** Es la recta constante $y=-9$ en $[0,1]$ y en $[11,24]$, y entre $t=1$ y $t=11$ un arco de parábola abierta hacia abajo con máximo en $t=6$: $f(6)=-36+72-20=16$. Corta al eje $OX$ en $t=2$ y $t=10$.

![Temperatura f(t): constante −9 °C hasta t=1, arco de parábola con máximo 16 °C en t=6 entre t=1 y t=11, y de nuevo −9 °C hasta t=24](fig/2023-ord-res-b-e4.svg){fig-alt="Temperatura f(t): constante −9 °C hasta t=1, arco de parábola con máximo 16 °C en t=6 entre t=1 y t=11, y de nuevo −9 °C hasta t=24" width="75%" fig-align="center"}

**c)** Con el equipo funcionando, la temperatura es constante ($-9\,^\circ$C). Cuando se produce el corte la temperatura empieza a subir, y el equipo vuelve a $-9\,^\circ$C cuando se restablece la energía: **el corte empezó a la $1$ ($t=1$) y terminó a las $11$ ($t=11$); duró $10$ horas.**

**d)** El máximo de $f$ es $f(6)=16<20$: **los suelos no se estropean.** $f(t)>0\iff-t^2+12t-20>0\iff2<t<10$: la temperatura está por encima de $0\,^\circ$C durante $10-2=8$ horas, más de seis: **las vacunas sí se estropean.**

@@ 5
Sean $M$ «envía mensajes con el móvil» y $V$ «juega a videojuegos»: $P(M\cup V)=0{,}8$, $P(M\cap V)=0{,}45$, $P(V^C)=0{,}4$, luego $P(V)=0{,}6$ y $P(M)=P(M\cup V)-P(V)+P(M\cap V)=0{,}8-0{,}6+0{,}45=0{,}65$.

**a)** $P(M\cap V^C)=P(M)-P(M\cap V)=0{,}65-0{,}45=\mathbf{0{,}2}$.

**b)** $P(V\mid M^C)=\dfrac{P(V\cap M^C)}{P(M^C)}=\dfrac{0{,}6-0{,}45}{0{,}35}=\dfrac{0{,}15}{0{,}35}=\dfrac{3}{7}\approx\mathbf{0{,}4286}$.

**c)** $P(\text{solo una})=\left(0{,}65-0{,}45\right)+\left(0{,}6-0{,}45\right)=0{,}2+0{,}15=\mathbf{0{,}35}$.

**d)** $P(M^C\cap V^C)=1-P(M\cup V)=1-0{,}8=\mathbf{0{,}2}$.

@@ 6
Sea $p=P(A)$, $P(B)=1-p$ y $E$ «se exporta»: $P(E\mid A)=0{,}4$, $P(E\mid B)=0{,}25$ y $P(E)=0{,}37$.

**a)** $0{,}4p+0{,}25(1-p)=0{,}37\Rightarrow0{,}15p=0{,}12\Rightarrow p=0{,}8$. **$P(A)=0{,}8$.**

**b)** $P(A\mid E^C)=\dfrac{P(A)\,P(E^C\mid A)}{P(E^C)}=\dfrac{0{,}8\cdot0{,}6}{1-0{,}37}=\dfrac{0{,}48}{0{,}63}=\dfrac{16}{21}\approx\mathbf{0{,}7619}$.

@@ 7
$\sigma=\sqrt8=2{,}8284$ meses, $n=100$ y $\bar x=4\cdot12+2=50$ meses.

**a)** Nivel $94\,\%$: $\Phi(z_{\alpha/2})=0{,}97$ y en la tabla $\Phi(1{,}88)=0{,}9699$, luego $z_{\alpha/2}=1{,}88$. $E=1{,}88\cdot\dfrac{2{,}8284}{10}=0{,}5317$.
$$IC=(50-0{,}5317,\ 50+0{,}5317)=(49{,}4683,\ 50{,}5317).$$

**b)** $E<0{,}1\iff n>\dfrac{1{,}88^2\cdot8}{0{,}1^2}=2\,827{,}52$. **Hace falta una muestra de al menos $n=2\,828$ baterías.**

@@ 8
**a)** $\bar X\sim N\!\left(12{,}5,\ \dfrac{2{,}5}{\sqrt{16}}\right)=N(12{,}5,\ 0{,}625)$.
$$P(\bar X>12)=P\!\left(Z>\frac{12-12{,}5}{0{,}625}\right)=P(Z>-0{,}8)=P(Z<0{,}8)=\mathbf{0{,}7881}.$$

**b)** Con $n=25$: $\bar X\sim N\!\left(12{,}5,\ \dfrac{2{,}5}{5}\right)=N(12{,}5,\ 0{,}5)$. «Dista de $12$ a lo sumo $1$» significa $11\le\bar X\le13$:
$$P(11\le\bar X\le13)=P\!\left(\frac{11-12{,}5}{0{,}5}\le Z\le\frac{13-12{,}5}{0{,}5}\right)=P(-3\le Z\le1)=P(Z\le1)-P(Z\le-3).$$
Con la tabla, $P(Z\le1)=0{,}8413$ y $P(Z\le-3)=1-0{,}99865=0{,}00135$:
$$P=0{,}8413-0{,}00135\approx\mathbf{0{,}8400}.$$
