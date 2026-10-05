@@ 1
1. **Incógnitas.** $x$ = número de misiones, $y$ = número de programas. La inversión total, en millones de euros, es $0{,}2x+0{,}1y$ (200 000 € = $0{,}2$ millones por misión y 100 000 € = $0{,}1$ por programa).
2. **Restricciones.**
   - Presupuesto de $2{,}4$ millones: $0{,}2x+0{,}1y\le2{,}4\iff2x+y\le24$.
   - Hay que superar los 2 millones: $0{,}2x+0{,}1y\ge2\iff2x+y\ge20$.
   - Al menos 4 misiones: $x\ge4$.
   - Misiones no más de la mitad de los programas: $x\le\dfrac y2\iff2x\le y$.
3. **Región factible.** Es la zona del plano entre las rectas $2x+y=20$ y $2x+y=24$, a la derecha de $x=4$ y por encima de $y=2x$ (se comprueba cada semiplano con un punto de prueba).
4. **Vértices** (cortes de dos rectas de la frontera):
   - $x=4$ con $2x+y=20$: $(4,12)$.
   - $x=4$ con $2x+y=24$: $(4,16)$.
   - $y=2x$ con $2x+y=20$: $(5,10)$.
   - $y=2x$ con $2x+y=24$: $(6,12)$.
5. **Función objetivo** $F(x,y)=0{,}6x+0{,}4y$ en cada vértice:

| Vértice | $(4,12)$ | $(4,16)$ | $(5,10)$ | $(6,12)$ |
|---|---|---|---|---|
| $F=0{,}6x+0{,}4y$ | $7{,}2$ | $8{,}8$ | $7$ | $8{,}4$ |

![Región factible del ejercicio 1 (2021-ext-res), con sus vértices: (4, 12), (5, 10), (6, 12), (4, 16)](fig/2021-ext-res-e1.svg){fig-alt="Región factible del ejercicio 1 (2021-ext-res), con sus vértices: (4, 12), (5, 10), (6, 12), (4, 16)" width="75%" fig-align="center"}

6. **Conclusión.** El máximo está en $(4,16)$.

**Hay que llevar a cabo 4 misiones y 16 programas, y el máximo de $F$ es $8{,}8$.** (Inversión: $0{,}2\cdot4+0{,}1\cdot16=2{,}4$ millones, todo el presupuesto.)

@@ 2
**a)**
1. Se multiplica paso a paso: $A^2=A\cdot A$, $A^3=A^2\cdot A$, $A^4=A^3\cdot A$.
2. Resultado:
$$A^2=\begin{pmatrix}2&0&2\\0&1&0\\2&0&2\end{pmatrix},\quad A^3=\begin{pmatrix}4&0&4\\0&1&0\\4&0&4\end{pmatrix},\quad A^4=\begin{pmatrix}8&0&8\\0&1&0\\8&0&8\end{pmatrix}.$$
3. **Patrón.** Los elementos no nulos de las esquinas valen $2,4,8$, es decir, $2^{n-1}$; el elemento central siempre es $1$. Por tanto
$$A^n=\begin{pmatrix}2^{n-1}&0&2^{n-1}\\0&1&0\\2^{n-1}&0&2^{n-1}\end{pmatrix}.$$

**b)**
1. Una matriz cuadrada tiene inversa si y solo si su determinante no es $0$.
2. Se calcula por la primera fila: $|B|=\left|\begin{matrix}1&0&2\\1&1&-1\\2&1&0\end{matrix}\right|=(0+1)+2(1-2)=-1\neq0$.

**Como $|B|\neq0$, existe $B^{-1}$.**

**c)**
1. $B$ es invertible y $C$ tiene 3 filas, así que $B\cdot X=C$ se puede resolver y $X$ es una matriz $3\times1$. Multiplicando por $B^{-1}$ por la izquierda: $X=B^{-1}C$.
2. Se usa la inversa (adjunta traspuesta dividida entre $|B|=-1$): $B^{-1}=\begin{pmatrix}-1&-2&2\\2&4&-3\\1&1&-1\end{pmatrix}$.
3. Se multiplica:
$$X=\begin{pmatrix}-1&-2&2\\2&4&-3\\1&1&-1\end{pmatrix}\begin{pmatrix}1\\-3\\1\end{pmatrix}=\begin{pmatrix}7\\-13\\-3\end{pmatrix}.$$

**La ecuación $BX=C$ tiene solución única**, la matriz columna $X$ anterior.

@@ 3
**a) Continuidad en $x=1$.**
1. Las dos ramas son polinomios, continuos en su zona; solo hay que vigilar $x=1$.
2. Límite por la izquierda: $\displaystyle\lim_{x\to1^-}f=a+b$. Límite por la derecha, igual a $f(1)$: $\displaystyle\lim_{x\to1^+}f=f(1)=1-b+a$.
3. Se igualan: $a+b=1-b+a$, luego $b=1-b$.

**$b=\dfrac{1}{2}$.**

**b) Derivabilidad en $x=1$** (con $b=\dfrac{1}{2}$, que ya da continuidad).
1. Se deriva cada rama: $f'(x)=a$ si $x<1$ y $f'(x)=2x-\dfrac{1}{2}$ si $x>1$.
2. Las derivadas laterales en $x=1$ deben coincidir: $a=2\cdot1-\dfrac{1}{2}$.

**$a=\dfrac{3}{2}$.**

**c) Crecimiento con $a<0$ y $b=\dfrac{1}{2}$.**
1. Si $x<1$: $f'(x)=a<0$, **$f$ decrece en $(-\infty,1)$**.
2. Si $x>1$: $f'(x)=2x-\dfrac{1}{2}>0$ (pues $2x>2$), **$f$ crece en $(1,+\infty)$**.
3. En $x=1$ pasa de decrecer a crecer (y $f$ es continua): hay un **mínimo en la abscisa $x=1$**. No hay máximos.

**d) Área con $a=0$ y $b=\dfrac{1}{2}$.**
1. La función queda $f(x)=\dfrac{1}{2}$ si $x<1$ (recta horizontal) y $f(x)=x^2-\dfrac x2$ si $x\ge1$ (parábola desde $(1,\tfrac{1}{2})$, que pasa por $(2,3)$). Es positiva en $[0,2]$, así que no hay que partir por cambios de signo.
2. Se integra tramo a tramo, porque la expresión cambia en $x=1$:
$$A=\int_0^1\frac{1}{2}\,dx+\int_1^2\left(x^2-\frac x2\right)dx=\frac{1}{2}+\left[\frac{x^3}{3}-\frac{x^2}{4}\right]_1^2=\frac{1}{2}+\frac{5}{3}-\frac{1}{12}=\frac{25}{12}.$$
3. Comprobación del segundo tramo: $\left(\dfrac83-1\right)-\left(\dfrac13-\dfrac14\right)=\dfrac53-\dfrac1{12}$.

**$A=\dfrac{25}{12}\ \text{u}^2$**

![Gráfica de f con (a, b) = (0, 1/2): tramo horizontal y=1/2 hasta x=1 y parábola x²−x/2 desde x=1; recinto sombreado entre x=0 y x=2](fig/2021-ext-res-e3.svg){fig-alt="Gráfica de f con (a, b) = (0, 1/2): tramo horizontal y=1/2 hasta x=1 y parábola x²−x/2 desde x=1; recinto sombreado entre x=0 y x=2" width="75%" fig-align="center"}

@@ 4
**a) Crecimiento.** $c$ crece donde $c'>0$.
1. Se resuelve $c'(t)=0$: $0{,}03t^2-0{,}9t+6=0\iff t^2-30t+200=0\iff t=10$ o $t=20$.
2. Se estudia el signo de $c'$ en los tres intervalos en que esos puntos dividen $(0,24)$ (con un valor de prueba en cada uno):
   - $c'>0$ en $(0,10)$.
   - $c'<0$ en $(10,20)$.
   - $c'>0$ en $(20,24)$.

**$c$ es creciente en $(0,10)\cup(20,24)$** (y decreciente en $(10,20)$). La cotización sube hasta las 10 h, baja hasta las 20 h y vuelve a subir hasta el cierre.

**b) Puntos críticos.**
1. Son los que anulan $c'$: $t=10$ y $t=20$.
2. En $t=10$, $c'$ pasa de $+$ a $-$: **máximo relativo en $t=10$**.
3. En $t=20$, $c'$ pasa de $-$ a $+$: **mínimo relativo en $t=20$**.

**c) Recuperar $c$.**
1. $c$ es una primitiva de $c'$: $c(t)=\displaystyle\int\left(0{,}03t^2-0{,}9t+6\right)dt=0{,}01t^3-0{,}45t^2+6t+K$.
2. La condición inicial $c(0)=50$ da $K=50$.

**$c(t)=0{,}01t^3-0{,}45t^2+6t+50$.**

@@ 5
1. **Datos.** $P(A)=0{,}45$, $P(B)=0{,}21$, $P(C)=0{,}34$ (suman $1$). Sea $D$ «defectuoso»: $P(D\mid A)=0{,}01$, $P(D\mid B)=0{,}03$, $P(D\mid C)=0{,}02$.

**a)** Se pide «de la planta $C$ y no defectuoso». Por la regla del producto con $P(D^C\mid C)=1-0{,}02=0{,}98$:
$$P(D^C\cap C)=P(C)\cdot P(D^C\mid C)=0{,}34\cdot0{,}98=\mathbf{0{,}3332}.$$

**b)** Se pide la probabilidad de la planta $A$ sabiendo que no es defectuoso.
1. **Probabilidad total** de no defectuoso (suma de las tres ramas):
$$P(D^C)=0{,}45\cdot0{,}99+0{,}21\cdot0{,}97+0{,}34\cdot0{,}98=0{,}4455+0{,}2037+0{,}3332=0{,}9824.$$
2. **Bayes:** la rama de $A$ dividida entre el total:
$$P(A\mid D^C)=\frac{0{,}4455}{0{,}9824}=\frac{4455}{9824}\approx\mathbf{0{,}4535}.$$

Interpretación: el $45{,}35\,\%$ de los vehículos no defectuosos salen de la planta $A$ (algo por encima de su cuota, $45\,\%$, porque es la que menos defectos tiene).

@@ 6
**a)**
1. Contagiar a cada persona sana tiene probabilidad $0{,}8$, y los contagios son independientes.
2. Las dos: $P(\text{las dos})=0{,}8\cdot0{,}8=\mathbf{0{,}64}$.
3. Alguna (al menos una), por el complementario de «ninguna»: $P(\text{alguna})=1-0{,}2\cdot0{,}2=1-0{,}04=\mathbf{0{,}96}$.

**b)**
1. Sea $C$ «contagiado» y $+$ «resultado positivo»: $P(C)=0{,}8$, $P(+\mid C)=0{,}9$, $P(+\mid C^C)=0{,}05$.
2. **Probabilidad total** de positivo:
$$P(+)=0{,}8\cdot0{,}9+0{,}2\cdot0{,}05=0{,}72+0{,}01=0{,}73.$$
3. **Bayes** para $P(C\mid+)$:
$$P(C\mid+)=\frac{0{,}72}{0{,}73}=\frac{72}{73}\approx\mathbf{0{,}9863}.$$

Interpretación: con un positivo, el contagio es casi seguro ($98{,}63\,\%$).

@@ 7
1. **Datos.** $\hat p=\dfrac{175}{500}=0{,}35$, $n=500$ (se cumplen $n\hat p=175\ge5$ y $n(1-\hat p)=325\ge5$).

**a) Intervalo al $94\,\%$.**
1. $1-\alpha=0{,}94$, luego $\Phi(z_{\alpha/2})=1-\dfrac{0{,}06}{2}=0{,}97$. En la tabla $\Phi(1{,}88)=0{,}9699$ y $\Phi(1{,}89)=0{,}9706$, y $0{,}97$ está más cerca del primero: $z_{\alpha/2}=1{,}88$.
2. Error máximo: $E=1{,}88\sqrt{\dfrac{0{,}35\cdot0{,}65}{500}}=1{,}88\cdot0{,}02133=0{,}0401$.
3. Intervalo:
$$IC=(0{,}35-0{,}0401,\ 0{,}35+0{,}0401)=(0{,}3099,\ 0{,}3901).$$

Interpretación: con una confianza del $94\,\%$, entre el $31{,}0\,\%$ y el $39{,}0\,\%$ de los individuos usa el transporte público.

**b) Tamaño muestral con $E\le0{,}02$ y confianza $97\,\%$.**
1. $\Phi(z_{\alpha/2})=1-\dfrac{0{,}03}{2}=0{,}985$ y en la tabla $\Phi(2{,}17)=0{,}9850$, luego $z_{\alpha/2}=2{,}17$.
2. Se despeja $n$ de $E=z_{\alpha/2}\sqrt{\dfrac{\hat p(1-\hat p)}{n}}\le0{,}02$:
$$n\ge\frac{2{,}17^2\cdot0{,}35\cdot0{,}65}{0{,}02^2}=2\,678{,}19.$$
3. Se redondea **hacia arriba** (si fuera 2 678 no se alcanzaría la precisión).

**Hay que seleccionar al menos $n=2\,679$ individuos.**

@@ 8
**a) Intervalo al $97\,\%$ para la media** (se conoce $\sigma=7$ y la media muestral $168$ con $n=300$).
1. $\Phi(z_{\alpha/2})=0{,}985$ da $z_{\alpha/2}=2{,}17$ (pues $\Phi(2{,}17)=0{,}9850$).
2. Error máximo: $E=2{,}17\cdot\dfrac{7}{\sqrt{300}}=2{,}17\cdot0{,}4041=0{,}877$.
3. Intervalo:
$$IC=(168-0{,}877,\ 168+0{,}877)=(167{,}123,\ 168{,}877).$$

Interpretación: con una confianza del $97\,\%$, la estatura media de las mujeres está entre $167{,}12$ y $168{,}88$ cm.

**b) Tamaño mínimo con $E<1{,}2$ al $94\,\%$.**
1. Para el $94\,\%$, $z_{\alpha/2}=1{,}88$ (pues $\Phi(1{,}88)=0{,}9699\approx0{,}97$).
2. Se despeja $n$ de $E=z_{\alpha/2}\dfrac{\sigma}{\sqrt n}<1{,}2$:
$$n>\left(\frac{1{,}88\cdot7}{1{,}2}\right)^2=120{,}27.$$
3. $n$ debe ser entero y mayor que $120{,}27$.

**Hay que tomar al menos $n=121$ mujeres.**
