@@ 1
**Planteamiento.** Hay que calcular el precio por lata de cada receta y proveedor y multiplicarlo por las latas del pedido.

1. **Materias primas.** Con $R=\begin{pmatrix}500&300&200\\600&100&300\end{pmatrix}$ (gramos; recetas en filas) y $P=\begin{pmatrix}0{,}5&0{,}4&0{,}6\\0{,}4&0{,}5&0{,}7\end{pmatrix}$ (euros por kilo; proveedores en filas), el coste de una lata de la receta $i$ con el proveedor $j$ es $\dfrac{1}{1000}\,R\cdot P^t$ (se divide entre $1000$ para pasar de gramos a kilos):
$$\frac{1}{1000}R\,P^t=\begin{pmatrix}0{,}49&0{,}49\\0{,}52&0{,}50\end{pmatrix}\quad\text{(euros por lata; filas: recetas; columnas: proveedores)}.$$
2. **Precio de venta por lata** $=$ materias primas $+$ producción $+$ transporte $+$ beneficio ($0{,}05$ €):

| | Proveedor 1 | Proveedor 2 |
|---|---|---|
| Receta 1 | $0{,}49+0{,}11+0{,}02+0{,}05=0{,}67$ | $0{,}49+0{,}11+0{,}03+0{,}05=0{,}68$ |
| Receta 2 | $0{,}52+0{,}09+0{,}02+0{,}05=0{,}68$ | $0{,}50+0{,}09+0{,}03+0{,}05=0{,}67$ |

3. **Pedido.** Receta 1: $5\,000$ latas del proveedor 1 y $6\,000$ del proveedor 2. Receta 2: $6\,000$ del proveedor 1 y $5\,000$ del proveedor 2.
4. **Importe total:**
$$5\,000\cdot0{,}67+6\,000\cdot0{,}68+6\,000\cdot0{,}68+5\,000\cdot0{,}67=3\,350+4\,080+4\,080+3\,350=14\,860.$$

**La conservera debe cobrar $14\,860$ €.**

@@ 2
1. **Incógnitas.** $x$ = viajes de $B_1$ e $y$ = viajes de $B_2$.
2. **Restricciones.**
   - $B_1$ no hace más de 14 viajes: $x\le14$.
   - $B_1$ hace tantos viajes o más que $B_2$: $x\ge y$.
   - Entre los dos, al menos 10 y como mucho 24: $10\le x+y\le24$.
   - No negatividad: $y\ge0$.
3. **Función objetivo.** Beneficio: $B(x,y)=15\,000x+17\,000y$.
4. **Vértices:** $(5,5)$, $(10,0)$, $(14,0)$, $(14,10)$ y $(12,12)$.
5. **Valor de $B$ en cada vértice:**

| Vértice | $(5,5)$ | $(10,0)$ | $(14,0)$ | $(14,10)$ | $(12,12)$ |
|---|---|---|---|---|---|
| $B$ | $160\,000$ | $150\,000$ | $210\,000$ | $380\,000$ | $384\,000$ |

![Región factible del ejercicio 2 (2023-ord-res-b), con sus vértices: (5, 5), (10, 0), (14, 0), (14, 10), (12, 12)](fig/2023-ord-res-b-e2.svg){fig-alt="Región factible del ejercicio 2 (2023-ord-res-b), con sus vértices: (5, 5), (10, 0), (14, 0), (14, 10), (12, 12)" width="75%" fig-align="center"}

6. **Conclusión.** El máximo es $384\,000$, en $(12,12)$.

**Cada barco debe realizar 12 viajes, con un beneficio máximo de $384\,000$ €.**

@@ 3
**a) Derivadas.**
1. $f$ es un producto, $(uv)'=u'v+uv'$, con $u=\left(x^2-7\right)^3$ (cadena: $3\left(x^2-7\right)^2\cdot2x$) y $v=e^{5-x}$ (derivada $-e^{5-x}$):
$$f'(x)=3\left(x^2-7\right)^2\cdot2x\cdot e^{5-x}-\left(x^2-7\right)^3e^{5-x}=\left(x^2-7\right)^2e^{5-x}\left(6x-x^2+7\right).$$
2. $g$ es un cociente, $\left(\dfrac{u}{v}\right)'=\dfrac{u'v-uv'}{v^2}$, con $u=\ln\left(x^4-2x^2\right)$ ($u'=\dfrac{4x^3-4x}{x^4-2x^2}$) y $v=8-x^3$ ($v'=-3x^2$):
$$g'(x)=\dfrac{\dfrac{4x^3-4x}{x^4-2x^2}\left(8-x^3\right)+3x^2\ln\left(x^4-2x^2\right)}{\left(8-x^3\right)^2}.$$

**b) Región y área.**
1. Cortes: $-x^2+2x+3=-2x+6\iff x^2-4x+3=0\iff x=1$ o $x=3$, en los puntos $(1,4)$ y $(3,0)$.
2. En $[1,3]$ la parábola (vértice $(1,4)$, abierta hacia abajo) queda por encima de la recta.
3. Área (parábola menos recta), con Barrow:
$$A=\int_1^3\left[\left(-x^2+2x+3\right)-\left(-2x+6\right)\right]dx=\int_1^3\left(-x^2+4x-3\right)dx=\left[-\frac{x^3}{3}+2x^2-3x\right]_1^3=0-\left(-\frac{4}{3}\right)=\frac{4}{3}.$$

**$A=\dfrac{4}{3}\ \text{u}^2$**

![Región acotada entre la recta y=−2x+6 y la parábola y=−x²+2x+3, que se cortan en (1,4) y (3,0)](fig/2023-ord-res-b-e3.svg){fig-alt="Región acotada entre la recta y=−2x+6 y la parábola y=−x²+2x+3, que se cortan en (1,4) y (3,0)" width="75%" fig-align="center"}

@@ 4
**a) Continuidad.**
1. Cada tramo es continuo en su intervalo (constantes y polinomio). Solo hay que mirar $t=1$ y $t=11$.
2. En $t=1$: $-1+12-20=-9=f(1)$.
3. En $t=11$: $-121+132-20=-9=f(11)$.

**$f$ es continua en todo su dominio $[0,24]$.**

**b) Gráfica.**
1. Es la recta constante $y=-9$ en $[0,1]$ y en $[11,24]$.
2. Entre $t=1$ y $t=11$ es un arco de parábola abierta hacia abajo con máximo en $t=6$: $f(6)=-36+72-20=16$.
3. Corta al eje $OX$ en $t=2$ y $t=10$.

![Temperatura f(t): constante −9 °C hasta la hora 1, arco de parábola con máximo 16 °C en t=6 entre las horas 1 y 11, y de nuevo −9 °C hasta t=24](fig/2023-ord-res-b-e4.svg){fig-alt="Temperatura f(t): constante −9 °C hasta la hora 1, arco de parábola con máximo 16 °C en t=6 entre las horas 1 y 11, y de nuevo −9 °C hasta t=24" width="75%" fig-align="center"}

**c) Corte de energía.**
1. Con el equipo funcionando, la temperatura es constante ($-9\,^\circ$C).
2. Cuando se produce el corte la temperatura empieza a subir, y el equipo vuelve a $-9\,^\circ$C cuando se restablece la energía.

**El corte empezó a la $1$ ($t=1$) y terminó a las $11$ ($t=11$); duró $10$ horas.**

**d) ¿Se estropeó algo?**
1. Suelos (se estropean al llegar a $20\,^\circ$C): el máximo de $f$ es $f(6)=16<20$. **Los suelos no se estropean.**
2. Vacunas (se estropean si están por encima de $0\,^\circ$C más de seis horas): $f(t)>0\iff-t^2+12t-20>0\iff2<t<10$.
3. La temperatura está por encima de $0\,^\circ$C durante $10-2=8$ horas, más de seis: **las vacunas sí se estropean.**

@@ 5
**Datos previos.** Sea $M$ «envía mensajes con el móvil» y $V$ «juega a videojuegos»: $P(M\cup V)=0{,}8$, $P(M\cap V)=0{,}45$, $P(V^C)=0{,}4$.
1. $P(V)=1-0{,}4=0{,}6$.
2. De la unión: $P(M)=P(M\cup V)-P(V)+P(M\cap V)=0{,}8-0{,}6+0{,}45=0{,}65$.

**a) Mensajes y no videojuegos.**
1. $P(M\cap V^C)=P(M)-P(M\cap V)=0{,}65-0{,}45=\mathbf{0{,}2}$.

**b) Videojuegos sabiendo que no envía mensajes.**
1. $P(M^C)=1-0{,}65=0{,}35$.
2. $P(V\mid M^C)=\dfrac{P(V\cap M^C)}{P(M^C)}=\dfrac{0{,}6-0{,}45}{0{,}35}=\dfrac{0{,}15}{0{,}35}=\dfrac{3}{7}\approx\mathbf{0{,}4286}$.

**c) Solo una de las dos (casos incompatibles, se suman).**
1. $P(\text{solo una})=\left(0{,}65-0{,}45\right)+\left(0{,}6-0{,}45\right)=0{,}2+0{,}15=\mathbf{0{,}35}$.

**d) Ninguna de las dos.**
1. $P(M^C\cap V^C)=1-P(M\cup V)=1-0{,}8=\mathbf{0{,}2}$.

@@ 6
1. **Sucesos y datos.** Sea $p=P(A)$, $P(B)=1-p$ y $E$ «se exporta»: $P(E\mid A)=0{,}4$, $P(E\mid B)=0{,}25$ y $P(E)=0{,}37$.

**a) Probabilidad de que sea de la fábrica $A$.**
1. Probabilidad total: $P(E)=P(A)\,P(E\mid A)+P(B)\,P(E\mid B)$, es decir, $0{,}4p+0{,}25(1-p)=0{,}37$.
2. Se despeja: $0{,}15p=0{,}12\Rightarrow p=0{,}8$.

**$P(A)=0{,}8$.**

**b) Fábrica $A$ sabiendo que no se exporta (Bayes).**
1. $P(E^C\mid A)=1-0{,}4=0{,}6$ y $P(E^C)=1-0{,}37=0{,}63$.
2. Bayes:
$$P(A\mid E^C)=\dfrac{P(A)\,P(E^C\mid A)}{P(E^C)}=\dfrac{0{,}8\cdot0{,}6}{1-0{,}37}=\dfrac{0{,}48}{0{,}63}=\dfrac{16}{21}\approx\mathbf{0{,}7619}.$$

*Interpretación:* de los componentes que no se exportan, algo más de tres cuartas partes vienen de $A$.

@@ 7
**Datos.** $\sigma=\sqrt8=2{,}8284$ meses, $n=100$ y $\bar x=4\cdot12+2=50$ meses (se pasan los años a meses).

**a) Intervalo al $94\,\%$.**
1. Valor crítico: $\Phi(z_{\alpha/2})=0{,}97$ y en la tabla $\Phi(1{,}88)=0{,}9699$ (el más cercano), luego $z_{\alpha/2}=1{,}88$.
2. Error máximo: $E=1{,}88\cdot\dfrac{2{,}8284}{10}=0{,}5317$.
3. Intervalo: $\bar x\pm E$:
$$IC=(50-0{,}5317,\ 50+0{,}5317)=(49{,}4683,\ 50{,}5317).$$

*Interpretación:* con confianza del $94\,\%$, la vida media de las baterías está entre $49{,}47$ y $50{,}53$ meses.

**b) Tamaño mínimo.**
1. Se impone $E<0{,}1$ y se despeja $n$:
$$E<0{,}1\iff n>\dfrac{1{,}88^2\cdot8}{0{,}1^2}=2\,827{,}52.$$
2. Se redondea hacia arriba.

**Hace falta una muestra de al menos $n=2\,828$ baterías.**

@@ 8
**a) Media muestral con $n=16$.**
1. Distribución: $\bar X\sim N\!\left(\mu,\dfrac{\sigma}{\sqrt n}\right)$:
$$\bar X\sim N\!\left(12{,}5,\ \dfrac{2{,}5}{\sqrt{16}}\right)=N(12{,}5,\ 0{,}625).$$
2. Se tipifica y se usa la simetría de la normal, $P(Z>-a)=P(Z<a)$:
$$P(\bar X>12)=P\!\left(Z>\frac{12-12{,}5}{0{,}625}\right)=P(Z>-0{,}8)=P(Z<0{,}8)=\mathbf{0{,}7881}.$$

*Interpretación:* algo menos del $79\,\%$ de las muestras de 16 personas tienen una media superior a 12 días.

**b) Media muestral con $n=25$.**
1. Distribución: $\bar X\sim N\!\left(12{,}5,\ \dfrac{2{,}5}{5}\right)=N(12{,}5,\ 0{,}5)$.
2. «Dista de $12$ a lo sumo $1$» significa $11\le\bar X\le13$.
3. Se tipifica:
$$P(11\le\bar X\le13)=P\!\left(\frac{11-12{,}5}{0{,}5}\le Z\le\frac{13-12{,}5}{0{,}5}\right)=P(-3\le Z\le1)=P(Z\le1)-P(Z\le-3).$$
4. Con la tabla, $P(Z\le1)=0{,}8413$ y $P(Z\le-3)=1-0{,}99865=0{,}00135$:
$$P=0{,}8413-0{,}00135\approx\mathbf{0{,}8400}.$$
