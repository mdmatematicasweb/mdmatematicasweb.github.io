@@ 1
1. **Incógnitas.** $x$ = botes Júpiter e $y$ = botes Minerva.
2. **Restricciones.**
   - Pintura verde: $10x+5y\le1\,000$.
   - Pintura morada: $5x+5y\le800$.
   - Pintura naranja (solo la usa Júpiter): $5x\le300$, es decir, $x\le60$.
   - No negatividad: $x\ge0$, $y\ge0$.
3. **Función objetivo.** Beneficio: $B(x,y)=30x+20y$.
4. **Vértices:** $(0,0)$, $(0,160)$, $(40,120)$ (corte de $10x+5y=1\,000$ con $5x+5y=800$), $(60,80)$ (corte de $x=60$ con $5x+5y=800$) y $(60,0)$.
5. **Valor de $B$ en cada vértice:**

| Vértice | $(0,0)$ | $(0,160)$ | $(40,120)$ | $(60,80)$ | $(60,0)$ |
|---|---|---|---|---|---|
| $B$ | $0$ | $3\,200$ | $3\,600$ | $3\,400$ | $1\,800$ |

![Región factible del ejercicio 1 (2023-ord-sup-b), con sus vértices: (0, 0), (60, 0), (60, 80), (40, 120), (0, 160)](fig/2023-ord-sup-b-e1.svg){fig-alt="Región factible del ejercicio 1 (2023-ord-sup-b), con sus vértices: (0, 0), (60, 0), (60, 80), (40, 120), (0, 160)" width="75%" fig-align="center"}

6. **Conclusión.** El máximo es $3\,600$, en $(40,120)$: se agotan la pintura verde ($400+600=1\,000$) y la morada ($200+600=800$); de naranja se usan $200$ de $300$ kg.

**Debe fabricar 40 botes Júpiter y 120 Minerva, con un beneficio máximo de $3\,600$ €.**

@@ 2
**a) Dimensiones.**
1. $C^tAC$: $C^t$ es $1\times3$, $A$ es $3\times3$ y $C$ es $3\times1$, luego **$C^tAC$ es $1\times1$.**
2. $CC^tB$: $C$ es $3\times1$ y $C^t$ es $1\times3$, luego $CC^t$ es $3\times3$; con $B$ de $3\times3$, **$CC^tB$ es $3\times3$.**

**b) Inversas.**
1. $|A|=17\neq0$: **$A$ tiene inversa**
$$A^{-1}=\frac{1}{17}\begin{pmatrix}-12&11&-28\\7&-5&22\\21&-15&49\end{pmatrix}.$$
2. $|B|=0$ (la tercera fila es combinación lineal de las otras dos): **$B$ no tiene inversa.**

**c) Sistema matricial.** Se resuelve por reducción, como un sistema ordinario con matrices.
1. Para eliminar $Y$: $4\cdot(2X+3Y=A)-3\cdot(-3X+4Y=B)$ da $17X=4A-3B$.
2. Para eliminar $X$: $3\cdot(2X+3Y=A)+2\cdot(-3X+4Y=B)$ da $17Y=3A+2B$.
3. Se calculan las combinaciones y se divide entre $17$:
$$X=\frac{4A-3B}{17}=\begin{pmatrix}1&-2&3\\2&0&-1\\0&0&1\end{pmatrix},\qquad Y=\frac{3A+2B}{17}=\begin{pmatrix}1&-1&0\\1&0&2\\0&1&-1\end{pmatrix}.$$

@@ 3
**a) Continuidad y derivabilidad.**
1. Cada tramo es un polinomio, continuo y derivable en su intervalo. Solo hay que estudiar $x=3$.
2. Continuidad en $x=3$: $\displaystyle\lim_{x\to3^-}\left(x^2-4x+4\right)=1$ y $f(3)=-3+4=1$: **continua.**
3. Derivadas: $f'(x)=2x-4$ si $x<3$ y $f'(x)=-1$ si $x>3$, con $f'(3^-)=2\neq f'(3^+)=-1$.

**$f$ es continua en $\mathbb R$ y derivable en $\mathbb R\setminus\{3\}$.**

**b) Gráfica.**
1. Para $x<3$: parábola $y=(x-2)^2$ de vértice $(2,0)$ (pasa por $(0,4)$ y $(3,1)$).
2. Para $x\ge3$: semirrecta $y=-x+4$ desde $(3,1)$ (corta al eje $OX$ en $(4,0)$ y sigue hacia abajo).

![Gráfica de f: parábola (x−2)² hasta x=3 y recta −x+4 desde x=3, continua en (3,1) pero con pico; recinto sombreado entre x=2 y x=4](fig/2023-ord-sup-b-e3.svg){fig-alt="Gráfica de f: parábola (x−2)² hasta x=3 y recta −x+4 desde x=3, continua en (3,1) pero con pico; recinto sombreado entre x=2 y x=4" width="75%" fig-align="center"}

**c) Área entre $x=2$ y $x=4$.**
1. En $[2,4]$, $f\ge0$, así que el área es la integral. Se parte en $x=3$.
2. Barrow en cada trozo:
$$A=\int_2^3(x-2)^2dx+\int_3^4(-x+4)\,dx=\left[\frac{(x-2)^3}{3}\right]_2^3+\left[-\frac{x^2}{2}+4x\right]_3^4=\frac{1}{3}+\frac{1}{2}=\frac{5}{6}.$$

**$A=\dfrac{5}{6}\ \text{u}^2$**

@@ 4
**a) Función de gastos.**
1. Beneficio = ingresos − gastos, luego $G(t)=I(t)-B(t)$.
2. $G(t)=-t^2+48t-\left(-t^2+21t-20\right)=27t+20$.
3. Gastos iniciales: $G(0)=20$.

**La función de gastos es $G(t)=27t+20$ y los gastos iniciales son $20$ mil euros ($20\,000$ €).**

**b) Beneficio positivo.**
1. Se factoriza: $B(t)=-(t-1)(t-20)>0\iff1<t<20$.
2. En el intervalo $[0,15]$ queda $t>1$.

**El beneficio es positivo a partir del año $1$** ($t>1$).

**c) Beneficio máximo.**
1. Derivada: $B'(t)=-2t+21=0\Rightarrow t=10{,}5$, dentro de $[0,15]$.
2. $B''<0$: es un máximo.
3. Valor: $B(10{,}5)=-110{,}25+220{,}5-20=90{,}25$.

**El beneficio máximo se alcanza a los $10{,}5$ años y vale $90{,}25$ mil euros ($90\,250$ €).**

**d) Gráfica.**
1. Parábola abierta hacia abajo con vértice $(10{,}5;\ 90{,}25)$.
2. Arranca en $(0,-20)$, corta al eje $OX$ en $t=1$ y llega a $t=15$ con $B(15)=70$.

![Parábola de beneficio B(t)=−t²+21t−20 en [0,15]: parte de −20, corta al eje en t=1, alcanza el máximo 90,25 en t=10,5 y llega a 70 en t=15](fig/2023-ord-sup-b-e4.svg){fig-alt="Parábola de beneficio B(t)=−t²+21t−20 en [0,15]: parte de −20, corta al eje en t=1, alcanza el máximo 90,25 en t=10,5 y llega a 70 en t=15" width="75%" fig-align="center"}

@@ 5
1. **Sucesos y datos.** Sea $D$ «descartado»: $P(A)=0{,}6$, $P(B)=0{,}3$, $P(C)=0{,}1$ (el resto), $P(D\mid A)=0{,}2$, $P(D\mid B)=0{,}5$, $P(D\mid C)=0{,}6$.

**a) Descartado y de tipo $A$ o $B$.**
1. Son casos incompatibles (se suman): $P\big(D\cap(A\cup B)\big)=0{,}6\cdot0{,}2+0{,}3\cdot0{,}5=0{,}12+0{,}15=\mathbf{0{,}27}$.

**b) Descartado (probabilidad total).**
1. Se añade el tipo $C$: $P(D)=0{,}12+0{,}15+0{,}1\cdot0{,}6=0{,}12+0{,}15+0{,}06=\mathbf{0{,}33}$.

**c) Tipo $C$ sabiendo que no se descartó (Bayes).**
1. $P(D^C\mid C)=1-0{,}6=0{,}4$ y $P(D^C)=1-0{,}33=0{,}67$.
2. Bayes:
$$P(C\mid D^C)=\dfrac{P(C)\,P(D^C\mid C)}{P(D^C)}=\dfrac{0{,}1\cdot0{,}4}{1-0{,}33}=\dfrac{0{,}04}{0{,}67}=\dfrac{4}{67}\approx\mathbf{0{,}0597}.$$

*Interpretación:* los procesadores de tipo $C$ son pocos y se descartan mucho, así que entre los aprobados apenas el $6\,\%$ es de tipo $C$.

@@ 6
**Datos previos.** Sea $P$ «usa la plataforma» y $E$ «usa el correo»: $P(P)=0{,}75$, $P(E)=0{,}4$, $P(P^C\cap E^C)=0{,}15$.
1. $P(P\cup E)=1-0{,}15=0{,}85$.

**a) Ambos medios.**
1. $P(P\cap E)=0{,}75+0{,}4-0{,}85=\mathbf{0{,}3}$.

**b) Solo uno de los dos.**
1. Solo plataforma: $0{,}75-0{,}3=0{,}45$. Solo correo: $0{,}4-0{,}3=0{,}1$.
2. Son incompatibles, se suman: $P(\text{solo uno})=\left(0{,}75-0{,}3\right)+\left(0{,}4-0{,}3\right)=0{,}45+0{,}1=\mathbf{0{,}55}$.

**c) Plataforma sabiendo que no usa correo.**
1. $P(E^C)=1-0{,}4=0{,}6$ y $P(P\cap E^C)=0{,}45$.
2. $P(P\mid E^C)=\dfrac{P(P\cap E^C)}{P(E^C)}=\dfrac{0{,}45}{0{,}6}=\mathbf{0{,}75}$.

**d) Independencia.**
1. Serían independientes si $P(P\cap E)=P(P)P(E)$.
2. $P(P)P(E)=0{,}75\cdot0{,}4=0{,}3=P(P\cap E)$: **son independientes** (también $P(P\mid E^C)=0{,}75=P(P)$).

@@ 7
**Datos.** $\sigma=3$ mm. Valor crítico al $98{,}5\,\%$: $\Phi(z_{\alpha/2})=0{,}9925$ y en la tabla $\Phi(2{,}43)=0{,}9925$, luego $z_{\alpha/2}=2{,}43$.

**a) Intervalo.**
1. Error máximo: $E=2{,}43\cdot\dfrac{3}{\sqrt{144}}=0{,}6075$.
2. Intervalo: $\bar x\pm E$:
$$IC=(81-0{,}6075,\ 81+0{,}6075)=(80{,}3925,\ 81{,}6075).$$

*Interpretación:* con confianza del $98{,}5\,\%$, el diámetro medio está entre $80{,}39$ y $81{,}61$ mm.

**b) Tamaño mínimo para amplitud $\le0{,}9$.**
1. La amplitud del intervalo es $2E$: $2E\le0{,}9\iff E\le0{,}45$.
2. Se despeja $n$:
$$n\ge\left(\frac{2{,}43\cdot3}{0{,}45}\right)^2=262{,}44.$$
3. Se redondea hacia arriba.

**Hace falta una muestra de al menos $n=263$ piezas.**

**c) Diámetro medio muestral con $n=64$.**
1. Distribución: $\bar X\sim N\!\left(80{,}4,\ \dfrac{3}{\sqrt{64}}\right)=N(80{,}4,\ 0{,}375)$.
2. Se tipifica:
$$P(79{,}5<\bar X<80{,}7)=P\!\left(\frac{79{,}5-80{,}4}{0{,}375}<Z<\frac{80{,}7-80{,}4}{0{,}375}\right)=P(-2{,}4<Z<0{,}8).$$
3. Con la tabla, $P(Z<0{,}8)=0{,}7881$ y $P(Z<-2{,}4)=1-0{,}9918$:
$$P(-2{,}4<Z<0{,}8)=0{,}7881-(1-0{,}9918)=\mathbf{0{,}7799}.$$

@@ 8
**Datos.** $\hat p=\dfrac{180}{300}=0{,}6$, $n=300$.

**a) Intervalo al $95\,\%$.**
1. Valor crítico: $z_{\alpha/2}=1{,}96$.
2. Error máximo: $E=1{,}96\sqrt{\dfrac{0{,}6\cdot0{,}4}{300}}=1{,}96\cdot0{,}02828=0{,}0554$.
3. Intervalo: $\hat p\pm E$:
$$IC=(0{,}6-0{,}0554,\ 0{,}6+0{,}0554)=(0{,}5446,\ 0{,}6554).$$

*Interpretación:* con confianza del $95\,\%$, entre el $54{,}46\,\%$ y el $65{,}54\,\%$ de los habitantes creen seguir una dieta saludable.

**b) Tamaño mínimo con un tercio del error.**
1. El error del intervalo $(0{,}54;\ 0{,}66)$ es su semiamplitud: $\dfrac{0{,}66-0{,}54}{2}=0{,}06$, y un tercio de él es $0{,}02$.
2. Se despeja $n$ de $E\le0{,}02$:
$$n\ge\frac{1{,}96^2\cdot0{,}6\cdot0{,}4}{0{,}02^2}=2\,304{,}96.$$
3. Se redondea hacia arriba.

**Hace falta una muestra de al menos $n=2\,305$ habitantes.**
