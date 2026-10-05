@@ 1
**a) Sistema de ecuaciones matriciales.**
1. Se suman las dos ecuaciones para eliminar $Y$: $(A+I_3)X+Y+X-Y=(A-I_3)+I_3\Rightarrow(A+2I_3)X=A$.
2. $A+2I_3=\begin{pmatrix}4&1&0\\0&3&2\\2&2&4\end{pmatrix}$ tiene $|A+2I_3|=36\neq0$, luego es invertible, con
$$(A+2I_3)^{-1}=\begin{pmatrix}\frac{2}{9}&-\frac{1}{9}&\frac{1}{18}\\\frac{1}{9}&\frac{4}{9}&-\frac{2}{9}\\-\frac{1}{6}&-\frac{1}{6}&\frac{1}{3}\end{pmatrix}.$$
3. Se despeja $X$ multiplicando por la izquierda por $(A+2I_3)^{-1}$: $X=(A+2I_3)^{-1}A$.
4. De la segunda ecuación, $Y=X-I_3$:
$$X=(A+2I_3)^{-1}A=\begin{pmatrix}\frac{5}{9}&\frac{2}{9}&-\frac{1}{9}\\-\frac{2}{9}&\frac{1}{9}&\frac{4}{9}\\\frac{1}{3}&\frac{1}{3}&\frac{1}{3}\end{pmatrix},\qquad Y=X-I_3=\begin{pmatrix}-\frac{4}{9}&\frac{2}{9}&-\frac{1}{9}\\-\frac{2}{9}&-\frac{8}{9}&\frac{4}{9}\\\frac{1}{3}&\frac{1}{3}&-\frac{2}{3}\end{pmatrix}.$$

**b) Rangos e invertibilidad.**
1. $A+I_3=\begin{pmatrix}3&1&0\\0&2&2\\2&2&3\end{pmatrix}$ tiene $|A+I_3|=10\neq0$: **rango $3$, es invertible.**
2. $A-I_3=\begin{pmatrix}1&1&0\\0&0&2\\2&2&1\end{pmatrix}$ tiene $|A-I_3|=0$ (las columnas primera y segunda son iguales).
3. Hay un menor de orden 2 no nulo: $\left|\begin{matrix}1&0\\0&2\end{matrix}\right|=2\neq0$.

**$A-I_3$: rango $2$, no es invertible.**

@@ 2
1. **Incógnitas.** $x$ = menús *premium* e $y$ = menús *estándar* a la semana.
2. **Restricciones.**
   - Cocina: $2x+3y\le58$.
   - Empaquetado: $2x+y\le50$.
   - Almacenamiento: $x+4y\le60$.
   - No negatividad: $x\ge0$, $y\ge0$.
3. **Función objetivo.** Beneficio: $B(x,y)=10{,}5x+5{,}5y$.
4. **Vértices:** $(0,0)$, $(0,15)$, $\left(\dfrac{52}{5},\dfrac{62}{5}\right)$ (corte de $x+4y=60$ con $2x+3y=58$), $(23,4)$ (corte de $2x+3y=58$ con $2x+y=50$) y $(25,0)$.
5. **Valor de $B$ en cada vértice:**

| Vértice | $(0,0)$ | $(0,15)$ | $\left(\frac{52}{5},\frac{62}{5}\right)$ | $(23,4)$ | $(25,0)$ |
|---|---|---|---|---|---|
| $B$ | $0$ | $82{,}5$ | $177{,}4$ | $263{,}5$ | $262{,}5$ |

![Región factible del ejercicio 2 (2025-ord-sup1-a), con sus vértices: (0, 0), (25, 0), (23, 4), (10,4, 12,4), (0, 15)](fig/2025-ord-sup1-a-e2.svg){fig-alt="Región factible del ejercicio 2 (2025-ord-sup1-a), con sus vértices: (0, 0), (25, 0), (23, 4), (10,4, 12,4), (0, 15)" width="75%" fig-align="center"}

6. **Conclusión.** El máximo es $263{,}5$, en $(23,4)$. Almacenamiento usado: $23+16=39\le60$ (sobra espacio).

**Deben elaborarse 23 menús *premium* y 4 *estándar*, con un beneficio máximo de $263{,}50$ €.**

@@ 3
**a) Continuidad.** Cada trozo es continuo en su intervalo; solo hay que estudiar $x=-1$ y $x=2$.
1. En $x=-1$: $\displaystyle\lim_{x\to-1^-}ae^{x+1}=a$ y $\displaystyle\lim_{x\to-1^+}\left(x^2-2\right)=-1$. Deben coincidir: $a=-1$.
2. En $x=2$: $\displaystyle\lim_{x\to2^-}\left(x^2-2\right)=2$ y $f(2)=b\log(12-2)=b\log10=b$ (logaritmo decimal). Deben coincidir: $b=2$.

**$a=-1$ y $b=2$.**

**b) Recinto y área.**
1. Puntos de corte: $-x+3=-x^2+5\iff x^2-x-2=0\iff x=-1$ o $x=2$, en los puntos $(-1,4)$ y $(2,1)$.
2. En $[-1,2]$ la parábola (de vértice $(0,5)$, abierta hacia abajo) queda por encima de la recta.
3. Barrow, integrando «arriba menos abajo»:
$$A=\int_{-1}^{2}\left[\left(-x^2+5\right)-\left(-x+3\right)\right]dx=\int_{-1}^{2}\left(-x^2+x+2\right)dx=\left[-\frac{x^3}{3}+\frac{x^2}{2}+2x\right]_{-1}^{2}=\frac{10}{3}-\left(-\frac{7}{6}\right)=\frac{9}{2}.$$

**$A=\dfrac{9}{2}\ \text{u}^2$**

![Recinto acotado entre la parábola y=−x²+5 y la recta y=−x+3, que se cortan en (−1,4) y (2,1)](fig/2025-ord-sup1-a-e3.svg){fig-alt="Recinto acotado entre la parábola y=−x²+5 y la recta y=−x+3, que se cortan en (−1,4) y (2,1)" width="75%" fig-align="center"}

@@ 4
**a) Nivel inicial y parámetros.**
1. El nivel inicial es $f(0)=10$.
2. Continuidad en $t=2{,}5$: $-2{,}5^2+2\cdot2{,}5+10=8{,}75$ y $2{,}5^2+2{,}5a+b=6{,}25+2{,}5a+b$; luego $6{,}25+2{,}5a+b=8{,}75$.
3. Derivabilidad: $f'(t)=-2t+2$ si $t<2{,}5$ y $f'(t)=2t+a$ si $t>2{,}5$. En $t=2{,}5$: $-3=5+a\Rightarrow a=-8$.
4. Se sustituye en la continuidad: $6{,}25-20+b=8{,}75\Rightarrow b=22{,}5$.

**Comienza con nivel $10$; $a=-8$ y $b=22{,}5$.**

**b) Monotonía, extremos y gráfica.**
1. Tramo 1: $f'(t)=-2t+2=0\Rightarrow t=1$. Crece en $(0,1)$ y decrece en $(1,2{,}5)$, con $f(1)=11$.
2. Tramo 2: $f(t)=t^2-8t+22{,}5$ y $f'(t)=2t-8=0\Rightarrow t=4$. Decrece en $(2{,}5;4)$ y crece en $(4,5)$, con $f(4)=6{,}5$.
3. Valores en los extremos: $f(0)=10$, $f(2{,}5)=8{,}75$, $f(5)=7{,}5$.

**Concentración máxima $11$ a la hora $t=1$ y mínima $6{,}5$ a las $4$ horas.**

4. Gráfica: sube desde $(0,10)$ hasta el máximo $(1,11)$, baja hasta el mínimo $(4;6{,}5)$ (pasando por $(2{,}5;8{,}75)$ sin pico) y sube hasta $(5;7{,}5)$.

![Concentración f(t): sube de 10 a 11 en t=1, baja hasta el mínimo 6,5 en t=4 y sube a 7,5 en t=5; la gráfica es continua y suave en t=2,5](fig/2025-ord-sup1-a-e4.svg){fig-alt="Concentración f(t): sube de 10 a 11 en t=1, baja hasta el mínimo 6,5 en t=4 y sube a 7,5 en t=5; la gráfica es continua y suave en t=2,5" width="75%" fig-align="center"}

@@ 5
1. **Sucesos y datos.** $P(CF)=0{,}62$, $P(T)=0{,}25$, $P(M)=1-0{,}62-0{,}25=0{,}13$. Sea $R$ «recomendación correcta»: $P(R\mid CF)=0{,}7$, $P(R\mid T)=0{,}75$, $P(R\mid M)=0{,}15$.

**a) Recomendación correcta.** Probabilidad total.
1. $P(R)=0{,}62\cdot0{,}7+0{,}25\cdot0{,}75+0{,}13\cdot0{,}15=0{,}434+0{,}1875+0{,}0195=\mathbf{0{,}641}$.

**b) Terror si no es correcta.** Bayes.
1. $P(R^C)=1-0{,}641=0{,}359$ y $P(T)\,P(R^C\mid T)=0{,}25\cdot0{,}25=0{,}0625$.
2. $P(T\mid R^C)=\dfrac{P(T)\,P(R^C\mid T)}{P(R^C)}=\dfrac{0{,}25\cdot0{,}25}{1-0{,}641}=\dfrac{0{,}0625}{0{,}359}=\dfrac{125}{718}\approx\mathbf{0{,}1741}$.

**c) Ciencia ficción, correcta y satisfecho.** Se multiplican las tres probabilidades encadenadas.
1. $P(CF\cap R\cap\text{satisfecho})=0{,}62\cdot0{,}7\cdot0{,}55=\mathbf{0{,}2387}$.

@@ 6
**Datos.** $\sigma=4{,}2$, $n=30$, $\bar x=11{,}3$; $\dfrac{\sigma}{\sqrt n}=0{,}7668$.

**a) Intervalo al $97\,\%$ y afirmación de la gerencia.**
1. Valor crítico: $z_{\alpha/2}=2{,}17$ (tabla: $\Phi(2{,}17)=0{,}9850$).
2. Error máximo: $E=2{,}17\cdot0{,}7668=1{,}664$.
3. Intervalo:
$$IC=(11{,}3-1{,}664,\ 11{,}3+1{,}664)=(9{,}636,\ 12{,}964).$$
4. El valor $9{,}8$ **sí está en el intervalo**.

**La afirmación de la gerencia es posible** (compatible con los datos).

**b) Tamaño mínimo al $95\,\%$.**
1. Valor crítico: $z_{\alpha/2}=1{,}96$.
2. Se impone $E\le0{,}6$ y se despeja $n$: $E\le0{,}6\iff n\ge\left(\dfrac{1{,}96\cdot4{,}2}{0{,}6}\right)^2=188{,}24$.
3. Se redondea hacia arriba.

**Hacen falta al menos $n=189$ usuarios.**

@@ 7
**Datos.** $\hat p=\dfrac{130}{200}=0{,}65$, $n=200$.

**a) Intervalo al $96{,}5\,\%$.**
1. Valor crítico: $\Phi(z_{\alpha/2})=0{,}9825$ y la tabla da $\Phi(2{,}11)=0{,}9826$, el más cercano, luego $z_{\alpha/2}=2{,}11$ (pues $\Phi(2{,}11)=0{,}9826\approx0{,}9825$).
2. Error máximo: $E=2{,}11\sqrt{\dfrac{0{,}65\cdot0{,}35}{200}}=2{,}11\cdot0{,}03373=0{,}0712$.
3. Intervalo:
$$IC=(0{,}65-0{,}0712,\ 0{,}65+0{,}0712)=(0{,}5788,\ 0{,}7212).$$

*Interpretación:* con confianza del $96{,}5\,\%$, entre el $57{,}88\,\%$ y el $72{,}12\,\%$ de las personas están a favor.

**b) Tamaño mínimo al $99\,\%$.**
1. Valor crítico: $\Phi(z_{\alpha/2})=0{,}995$, que está entre $\Phi(2{,}57)=0{,}9949$ y $\Phi(2{,}58)=0{,}9951$. Se toma el punto medio, $z_{\alpha/2}=2{,}575$.
2. Se impone $E\le0{,}02$ y se despeja $n$:
$$n\ge\frac{2{,}575^2\cdot0{,}65\cdot0{,}35}{0{,}02^2}=3\,771{,}17.$$
3. Se redondea hacia arriba.

**Hacen falta al menos $n=3\,772$ personas.**

**c) Efecto de aumentar el nivel de confianza.**
1. El error es $E=z_{\alpha/2}\sqrt{\dfrac{\hat p(1-\hat p)}{n}}$, con $\hat p$ y $n$ fijos.
2. Al aumentar el nivel de confianza, $z_{\alpha/2}$ aumenta.

**El error máximo aumenta** (se gana confianza a costa de precisión).
