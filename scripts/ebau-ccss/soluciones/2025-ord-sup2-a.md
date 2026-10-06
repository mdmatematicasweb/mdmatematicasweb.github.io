@@ 1
**a) Precios de las entradas.**
1. Sean $r$, $g$ y $v$ los precios de la entrada del taller de repostería, la demostración de cocina gourmet y la cata de vinos. Las condiciones dan
$$\begin{cases}120r+50g+150v=6\,460\\10r=2v+g\\2r+v=2g+6\end{cases}\qquad\text{es decir}\qquad\begin{cases}120r+50g+150v=6\,460\\10r-g-2v=0\\2r-2g+v=6\end{cases}$$
2. De la segunda, $g=10r-2v$.
3. En la tercera: $2r-20r+4v+v=6\Rightarrow-18r+5v=6$.
4. En la primera: $120r+500r-100v+150v=6\,460\Rightarrow620r+50v=6\,460\Rightarrow62r+5v=646$.
5. Se restan las dos ecuaciones con $r$ y $v$: $80r=640\Rightarrow r=8$.
6. Entonces $5v=6+144=150\Rightarrow v=30$ y $g=80-60=20$.

**Taller de repostería $8$ €, demostración de cocina gourmet $20$ € y cata de vinos $30$ €.** Comprobación: $960+1\,000+4\,500=6\,460$.

**b) Rango de $A$ y de $A^2$.**
1. $|A|=0$, porque la tercera fila es $2F_1+F_2$.
2. Hay un menor de orden 2 no nulo: $\left|\begin{matrix}1&0\\-1&2\end{matrix}\right|=2\neq0$.

**El rango de $A$ es $2$.**

3. Se calcula $A^2=\begin{pmatrix}0&-2&-2\\0&10&10\\0&6&6\end{pmatrix}$.
4. Todas sus filas son proporcionales a $(0,1,1)$ y la matriz no es nula.

**El rango de $A^2$ es $1$.**

@@ 2
1. **Incógnitas.** $x$ = lavadoras e $y$ = frigoríficos revisados.
2. **Restricciones.**
   - Tiempo disponible: $26\ \text{h}\ 40\ \text{min}=1\,600$ min, luego $100x+50y\le1\,600\iff2x+y\le32$.
   - No más de 12 lavadoras: $x\le12$.
   - No más de 16 frigoríficos: $y\le16$.
   - No negatividad: $x\ge0$, $y\ge0$.
3. **Función objetivo.** Se paga a $50$ €/h $=\dfrac{5}{6}$ €/min, así que el ingreso es $I(x,y)=\dfrac{5}{6}\left(100x+50y\right)=\dfrac{250}{3}x+\dfrac{125}{3}y$.
4. **Vértices:** $(0,0)$, $(12,0)$, $(12,8)$, $(8,16)$ y $(0,16)$.
5. **Valor de $I$ en cada vértice:**

| Vértice | $(0,0)$ | $(12,0)$ | $(12,8)$ | $(8,16)$ | $(0,16)$ |
|---|---|---|---|---|---|
| $I$ | $0$ | $1\,000$ | $1\,333{,}33$ | $1\,333{,}33$ | $666{,}67$ |

![Región factible del ejercicio 2 (2025-ord-sup2-a), con sus vértices: (0, 0), (12, 0), (12, 8), (8, 16), (0, 16)](fig/2025-ord-sup2-a-e2.svg){fig-alt="Región factible del ejercicio 2 (2025-ord-sup2-a), con sus vértices: (0, 0), (12, 0), (12, 8), (8, 16), (0, 16)" width="75%" fig-align="center"}

6. **Conclusión.** El máximo se alcanza en los dos vértices $(12,8)$ y $(8,16)$ y, por tanto, en todos los puntos del segmento $2x+y=32$ que los une (aquellos en que se agotan los $1\,600$ minutos).

**Ingreso máximo: $1\,333{,}33$ € (es decir, $\dfrac{4\,000}{3}$ €), por ejemplo revisando 12 lavadoras y 8 frigoríficos, u 8 lavadoras y 16 frigoríficos** (o cualquier combinación entera con $2x+y=32$, $8\le x\le12$: $(11,10)$, $(10,12)$, $(9,14)$).

@@ 3
**a) Parámetros y gráfica.**
1. Al comenzar, $f(0)=c=20$.
2. Máximo en $t=40$: $f'(40)=2a\cdot40+b=0\Rightarrow b=-80a$.
3. Su valor es $36$: $f(40)=1\,600a+40b+c=36$. Se sustituye $b$ y $c$: $1\,600a-3\,200a+20=36\Rightarrow-1\,600a=16\Rightarrow a=-0{,}01$ y $b=0{,}8$.

**$a=-0{,}01$, $b=0{,}8$, $c=20$:** $f(t)=-0{,}01t^2+0{,}8t+20$.

4. Gráfica: arco de parábola abierta hacia abajo que parte de $(0,20)$, crece hasta el máximo $(40,36)$ y decrece hasta $(60,32)$ (pasa por $(20,32)$, simétrico de $(60,32)$ respecto de $t=40$).

![Índice de audiencia f(t)=−0,01t²+0,8t+20: parte de 20, alcanza el máximo 36 a los 40 minutos y baja a 32 en t=60](fig/2025-ord-sup2-a-e3.svg){fig-alt="Índice de audiencia f(t)=−0,01t²+0,8t+20: parte de 20, alcanza el máximo 36 a los 40 minutos y baja a 32 en t=60" width="75%" fig-align="center"}

**b) Derivadas.**
1. $g$ es el logaritmo de un cociente. Se deriva con la regla de la cadena, $\left(\ln u\right)'=\dfrac{u'}{u}$, o separando antes los logaritmos:
$$g'(x)=\dfrac{2x}{x^2-1}-\dfrac{2x}{x^2+1}=\dfrac{2x\left(x^2+1\right)-2x\left(x^2-1\right)}{x^4-1}=\dfrac{4x}{x^4-1}.$$
2. $h$ es un producto, $(uv)'=u'v+uv'$, con $u=2x-1$ y $v=e^{x^2-x}$ (derivada $(2x-1)e^{x^2-x}$, por la regla de la cadena):
$$h'(x)=2e^{x^2-x}+(2x-1)(2x-1)e^{x^2-x}=e^{x^2-x}\left[(2x-1)^2+2\right]=e^{x^2-x}\left(4x^2-4x+3\right).$$

@@ 4
**a) Continuidad y derivabilidad en $x=-2$.**
1. Continuidad: $\displaystyle\lim_{x\to-2^-}\left(10+\frac{5x}{2}\right)=5$ y $\displaystyle\lim_{x\to-2^+}\left(x^2+1\right)=5=f(-2)$: **continua.**
2. Derivadas: $f'(x)=\dfrac{5}{2}$ si $x<-2$ y $f'(x)=2x$ si $-2<x<2$.
3. En $x=-2$: $f'(-2^-)=\dfrac{5}{2}\neq f'(-2^+)=-4$: **no derivable en $x=-2$.**

**b) Recta tangente de pendiente $-1$.**
1. Los tramos laterales tienen pendientes $\pm\dfrac{5}{2}$, así que el punto está en el tramo central: $f'(x)=2x=-1\Rightarrow x=-\dfrac{1}{2}$, que está en $(-2,2)$ (válido).
2. $f\left(-\dfrac{1}{2}\right)=\dfrac{5}{4}$.
3. Tangente: $y-\dfrac{5}{4}=-\left(x+\dfrac{1}{2}\right)$.

**$y=-x+\dfrac{3}{4}$.**

**c) Región y área.**
1. $f\ge0$ en $[-4,4]$ ($10+\frac{5x}{2}=0$ en $x=-4$ y $10-\frac{5x}{2}=0$ en $x=4$); fuera de ese intervalo $f<0$. La región acotada va de $x=-4$ a $x=4$.
2. Es una «tienda» con vértices $(-4,0)$, $(-2,5)$, $(2,5)$ y $(4,0)$ cuyo techo central es la parábola $y=x^2+1$.
3. Se suman las tres integrales:
$$A=\int_{-4}^{-2}\left(10+\frac{5x}{2}\right)dx+\int_{-2}^{2}\left(x^2+1\right)dx+\int_2^4\left(10-\frac{5x}{2}\right)dx=5+\frac{28}{3}+5=\frac{58}{3}.$$

**$A=\dfrac{58}{3}\ \text{u}^2$**

![Gráfica de f: dos rectas y un arco de parábola x²+1 entre ellas, formando una tienda sobre el eje X de x=−4 a x=4; recta tangente y=−x+3/4 en x=−1/2](fig/2025-ord-sup2-a-e4.svg){fig-alt="Gráfica de f: dos rectas y un arco de parábola x²+1 entre ellas, formando una tienda sobre el eje X de x=−4 a x=4; recta tangente y=−x+3/4 en x=−1/2" width="75%" fig-align="center"}

@@ 5
**Datos previos.** Sea $M$ «mujer» ($0{,}66$) y $N$ «cosmética natural»: $P(N\mid M)=0{,}71$ y $P(H\cap N^C)=0{,}1786$.
1. $P(M\cap N)=0{,}66\cdot0{,}71=0{,}4686$.
2. $P(H)=1-0{,}66=0{,}34$, luego $P(H\cap N)=P(H)-P(H\cap N^C)=0{,}34-0{,}1786=0{,}1614$.
3. $P(N)=P(M\cap N)+P(H\cap N)=0{,}4686+0{,}1614=0{,}63$, y por tanto $P(N^C)=1-0{,}63=0{,}37$.

**a) Mujer o cosmética natural.**
1. $P(M\cup N)=P(M)+P(N)-P(M\cap N)=0{,}66+0{,}63-0{,}4686=\mathbf{0{,}8214}$.

**b) Hombre y cosmética natural.**
1. Es la intersección que ya se ha calculado: $P(H\cap N)=\mathbf{0{,}1614}$.

**c) Hombre, sabiendo que no usa cosmética natural.**
1. $P(H\mid N^C)=\dfrac{P(H\cap N^C)}{P(N^C)}=\dfrac{0{,}1786}{0{,}37}=\dfrac{893}{1850}\approx\mathbf{0{,}4827}$.

**d) Incompatibilidad e independencia.**
1. Incompatibles si $P(M\cap N)=0$. Aquí $P(M\cap N)=0{,}4686\neq0$: **no son incompatibles.**
2. Independientes si $P(M\cap N)=P(M)P(N)$. Aquí $P(M)P(N)=0{,}66\cdot0{,}63=0{,}4158\neq0{,}4686=P(M\cap N)$: **no son independientes.**

@@ 6
**a) Distribución y $P(X=4)$.**
1. $X$ = «número de pacientes, de $5$, que mejoran» tiene $n=5$ pruebas independientes con probabilidad de éxito $0{,}6$: $X\sim B(5;\ 0{,}6)$.
2. $P(X=4)=\binom54\,0{,}6^4\cdot0{,}4=5\cdot0{,}1296\cdot0{,}4=\mathbf{0{,}2592}.$

**b) Al menos dos.**
1. Suceso contrario: $P(X\ge2)=1-P(X=0)-P(X=1)$.
2. $P(X\ge2)=1-0{,}4^5-5\cdot0{,}6\cdot0{,}4^4=1-0{,}01024-0{,}0768=\mathbf{0{,}91296}$.

**c) Número esperado.**
1. $E(X)=np=5\cdot0{,}6=\mathbf{3}$ pacientes.

**d) Pacientes para esperar al menos 12.**
1. $E(X)=0{,}6n\ge12\iff n\ge20$.

**Deberían someterse al menos $20$ pacientes.**

@@ 7
**Datos.** Fresas: $\hat p_F=\dfrac{180}{300}=0{,}6$; frambuesas: $\hat p_R=\dfrac{120}{300}=0{,}4$; $n=300$.

**a) Intervalos al $97\,\%$.**
1. Valor crítico: $z_{\alpha/2}=2{,}17$.
2. Como $\hat p_F(1-\hat p_F)=\hat p_R(1-\hat p_R)=0{,}24$, el error es el mismo para las dos: $E=2{,}17\sqrt{\dfrac{0{,}24}{300}}=2{,}17\cdot0{,}02828=0{,}0614$.
3. Intervalos $\hat p\pm E$:
   - Fresas: $IC=(0{,}6-0{,}0614,\ 0{,}6+0{,}0614)=(0{,}5386,\ 0{,}6614)$.
   - Frambuesas: $IC=(0{,}4-0{,}0614,\ 0{,}4+0{,}0614)=(0{,}3386,\ 0{,}4614)$.

*Interpretación:* los dos intervalos tienen la misma amplitud porque $\hat p_F+\hat p_R=1$.

**b) Tamaño mínimo al $95\,\%$.**
1. Valor crítico: $z_{\alpha/2}=1{,}96$.
2. Como $\hat p(1-\hat p)=0{,}24$ en ambos casos, se impone $E\le0{,}02$: $E\le0{,}02\iff n\ge\dfrac{1{,}96^2\cdot0{,}24}{0{,}02^2}=2\,304{,}96$.
3. Se redondea hacia arriba.

**Deberían seleccionarse al menos $2\,305$ kg de frutos.**
