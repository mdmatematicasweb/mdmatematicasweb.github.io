@@ 1
**a) Ecuación matricial.**
1. $A\cdot B=\begin{pmatrix}1&-1&1\\-2&1&0\end{pmatrix}\begin{pmatrix}0&-1\\1&0\\-1&2\end{pmatrix}=\begin{pmatrix}-2&1\\1&2\end{pmatrix}$, con $|AB|=-5\neq0$, luego $(AB)^{-1}=\begin{pmatrix}-\frac{2}{5}&\frac{1}{5}\\\frac{1}{5}&\frac{2}{5}\end{pmatrix}$.
2. También $|C|=1\neq0$ y $C^{-1}=\begin{pmatrix}-2&3&1\\-1&1&1\\3&-3&-2\end{pmatrix}$.
3. La ecuación es $(AB)\,X\,C=I'$ con $I'=\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix}$. Se multiplica por $(AB)^{-1}$ por la izquierda y por $C^{-1}$ por la derecha: $X=(AB)^{-1}\,I'\,C^{-1}$.
4. $I'\,C^{-1}$ son las dos primeras filas de $C^{-1}$, y se multiplica:
$$X=(AB)^{-1}\,I'\,C^{-1}=\begin{pmatrix}-\frac{2}{5}&\frac{1}{5}\\\frac{1}{5}&\frac{2}{5}\end{pmatrix}\begin{pmatrix}-2&3&1\\-1&1&1\end{pmatrix}=\begin{pmatrix}\frac{3}{5}&-1&-\frac{1}{5}\\-\frac{4}{5}&1&\frac{3}{5}\end{pmatrix}.$$

**b) Dimensiones de $D$ y $E$.**
1. $A$ es $2\times3$: para $A\cdot D$, $D$ debe tener $3$ filas. Si $D$ tiene $k$ columnas, $A\cdot D$ es $2\times k$.
2. $B$ es $3\times2$: para $E\cdot B$, $E$ debe tener $3$ columnas. Si $E$ tiene $m$ filas, $E\cdot B$ es $m\times2$.
3. Para que $A\cdot D=E\cdot B$, ambas deben tener la misma dimensión: $m=2$ y $k=2$.

**$D$ es $3\times2$ y $E$ es $2\times3$.**

@@ 2
1. **Incógnitas.** $x$ = bidones de pintura interior e $y$ = bidones de pintura exterior.
2. **Restricciones.**
   - Capacidad máxima: $x+y\le160$.
   - Mínimo en el almacén: $x+y\ge60$.
   - Mínimo de interior: $x\ge20$.
   - Exterior no inferior a interior: $y\ge x$.
3. **Función objetivo.** Gasto diario (hay que minimizarlo): $G(x,y)=1{,}5x+0{,}9y$.
4. **Vértices:** $(20,40)$ (corte de $x=20$ con $x+y=60$), $(20,140)$ (corte de $x=20$ con $x+y=160$), $(80,80)$ (corte de $y=x$ con $x+y=160$) y $(30,30)$ (corte de $y=x$ con $x+y=60$).
5. **Valor de $G$ en cada vértice:**

| Vértice | $(20,40)$ | $(20,140)$ | $(80,80)$ | $(30,30)$ |
|---|---|---|---|---|
| $G$ | $66$ | $156$ | $192$ | $72$ |

![Región factible del ejercicio 2 (2024-ord-res-a), con sus vértices: (20, 40), (30, 30), (80, 80), (20, 140)](fig/2024-ord-res-a-e2.svg){fig-alt="Región factible del ejercicio 2 (2024-ord-res-a), con sus vértices: (20, 40), (30, 30), (80, 80), (20, 140)" width="75%" fig-align="center"}

6. **Conclusión.** El mínimo es $66$, en $(20,40)$: $1{,}5\cdot20+0{,}9\cdot40=66$.

**Deben almacenarse 20 bidones de pintura interior y 40 de exterior, con un gasto diario mínimo de $66$ €.**

@@ 3
**a) Población dentro de 9 meses.**
1. Se obtiene $f$ integrando su derivada: $f(t)=\displaystyle\int\left(400+30\sqrt t\right)dt=400t+20t^{3/2}+K$.
2. Condición inicial $f(0)=90\,000$: $K=90\,000$, es decir, $f(t)=90\,000+400t+20t\sqrt t$.
3. $f(9)=90\,000+3\,600+20\cdot27=94\,140$.

**Dentro de 9 meses habrá $94\,140$ habitantes.**

**b) Integral de la derivada.**
1. Regla de Barrow: $\displaystyle\int_9^{16}f'(t)\,dt=f(16)-f(9)$.
2. $f(16)=90\,000+6\,400+1\,280=97\,680$, luego
$$\int_9^{16}f'(t)\,dt=f(16)-f(9)=(90\,000+6\,400+1\,280)-94\,140=97\,680-94\,140=3\,540.$$

**Es el aumento de población entre el mes $9$ y el mes $16$: la localidad gana $3\,540$ habitantes.**

**c) Ayuda total.**
1. Tres años son $36$ meses. Nuevos habitantes: $f(36)-f(0)=400\cdot36+20\cdot216=14\,400+4\,320=18\,720$.
2. Ayuda: $18\,720\cdot150$.

**Ayuda: $18\,720\cdot150=2\,808\,000$ €.**

@@ 4
**a) Continuidad y derivabilidad.**
1. Continuidad en $x=1$: por la izquierda, $3+e$; por la derecha, $1+a+2=3+a$. Así $3+e=3+a$ y **$a=e$.**
2. Derivadas: $f'(x)=e^x$ si $x<1$ y $f'(x)=2x+a$ si $x>1$.
3. En $x=1$: $f'(1^-)=e$ y $f'(1^+)=2+a=2+e$. Como $e\neq2+e$: **$f$ no es derivable en $x=1$.**

**b) Recta tangente en $x=0$** (con $a=-3$).
1. Cerca de $x=0$ la función es $f(x)=3+e^x$: $f(0)=4$ y $f'(0)=e^0=1$.
2. Recta: $y-4=1\cdot(x-0)$.

**$y=x+4$.**

**c) Región y área** (con $a=-3$).
1. Para $x\ge1$: $f(x)=x^2-3x+2=(x-1)(x-2)$, parábola que corta al eje $OX$ en $x=1$ y $x=2$ y que es positiva para $x>2$.
2. En $[2,4]$, $f\ge0$. Barrow:
$$A=\int_2^4\left(x^2-3x+2\right)dx=\left[\frac{x^3}{3}-\frac{3x^2}{2}+2x\right]_2^4=\frac{16}{3}-\frac{2}{3}=\frac{14}{3}.$$

**$A=\dfrac{14}{3}\ \text{u}^2$**

![Gráfica de f para a=−3: 3+eˣ hasta x=1 (con salto) y parábola x²−3x+2 desde x=1; recta tangente y=x+4 en x=0 y recinto sombreado entre x=2 y x=4](fig/2024-ord-res-a-e4.svg){fig-alt="Gráfica de f para a=−3: 3+eˣ hasta x=1 (con salto) y parábola x²−3x+2 desde x=1; recta tangente y=x+4 en x=0 y recinto sombreado entre x=2 y x=4" width="75%" fig-align="center"}

@@ 5
1. **Datos.** Sea $F$ «mujer» ($0{,}65$) y $H$ «hombre» ($0{,}35$). Mujeres: $M$ $50\,\%$, $XL$ $10\,\%$, luego $L$ $40\,\%$. Hombres: $L$ $40\,\%$, $XL$ $45\,\%$, luego $M$ $15\,\%$.

**a) Mujeres que no usan $XL$.**
1. Entre las mujeres, el complementario de $XL$: $100\,\%-10\,\%=\mathbf{90\,\%}$.

**b) Clientes que no usan $L$ (probabilidad total).**
1. $P(L)=0{,}65\cdot0{,}4+0{,}35\cdot0{,}4=0{,}26+0{,}14=0{,}4$.
2. Complementario: $1-0{,}4=0{,}6$.

**No usan la talla $L$ el $60\,\%$ de los clientes.**

**c) Mujeres entre quienes usan $M$ (Bayes).**
1. $P(M)=0{,}65\cdot0{,}5+0{,}35\cdot0{,}15=0{,}325+0{,}0525=0{,}3775$.
2. Bayes:
$$P(F\mid M)=\frac{0{,}325}{0{,}3775}=\frac{130}{151}\approx0{,}8609.$$

**El $86{,}09\,\%$ de los clientes que usan la talla $M$ son mujeres.**

@@ 6
1. **Datos.** $P(A)=0{,}75$, $P(B)=0{,}55$, $P(A\cap B)=0{,}35$.

**a) No aprueba $B$ si ha aprobado $A$.**
1. $P(A\cap B^C)=P(A)-P(A\cap B)=0{,}75-0{,}35=0{,}4$.
2. $P(B^C\mid A)=\dfrac{P(A)-P(A\cap B)}{P(A)}=\dfrac{0{,}75-0{,}35}{0{,}75}=\dfrac{0{,}4}{0{,}75}=\dfrac{8}{15}\approx\mathbf{0{,}5333}$.

**b) Aprueba alguna.**
1. $P(A\cup B)=0{,}75+0{,}55-0{,}35=\mathbf{0{,}95}$.

**c) No aprueba ninguna.**
1. Complementario de la unión: $P(A^C\cap B^C)=1-P(A\cup B)=1-0{,}95=\mathbf{0{,}05}$.

**d) Ha aprobado $A$ sabiendo que aprobó alguna.**
1. $A$ está contenido en $A\cup B$, así que $A\cap(A\cup B)=A$:
$$P(A\mid A\cup B)=\dfrac{P(A)}{P(A\cup B)}=\dfrac{0{,}75}{0{,}95}=\dfrac{15}{19}\approx\mathbf{0{,}7895}.$$

**e) Independencia.**
1. Serían independientes si $P(A\cap B)=P(A)P(B)$.
2. $P(A)P(B)=0{,}75\cdot0{,}55=0{,}4125\neq0{,}35=P(A\cap B)$: **no son independientes.**

@@ 7
**a) Intervalo al $96{,}5\,\%$.**
1. Proporción muestral: $\hat p=\dfrac{710}{2000}=0{,}355$.
2. Valor crítico: $\Phi(z_{\alpha/2})=0{,}9825$ y en la tabla $\Phi(2{,}11)=0{,}9826$ (el más cercano), luego $z_{\alpha/2}=2{,}11$.
3. Error máximo: $E=2{,}11\sqrt{\dfrac{0{,}355\cdot0{,}645}{2000}}=2{,}11\cdot0{,}0107=0{,}0226$.
4. Intervalo: $\hat p\pm E$:
$$IC=(0{,}355-0{,}0226,\ 0{,}355+0{,}0226)=(0{,}3324,\ 0{,}3776).$$

*Interpretación:* con confianza del $96{,}5\,\%$, entre el $33{,}24\,\%$ y el $37{,}76\,\%$ de las universitarias andaluzas cursan carreras STEM.

**b) Tamaño mínimo al $98\,\%$.**
1. Valor crítico: $\Phi(z_{\alpha/2})=0{,}99$ y $z_{\alpha/2}=2{,}33$ (tabla: $\Phi(2{,}33)=0{,}9901$).
2. Con $\hat p=0{,}37$ y $E\le0{,}015$:
$$n\ge\frac{2{,}33^2\cdot0{,}37\cdot0{,}63}{0{,}015^2}=5\,624{,}34.$$
3. Se redondea hacia arriba.

**Hace falta una muestra de al menos $n=5\,625$ universitarias.**

@@ 8
**a) Media y tamaño de la muestra.**
1. La media muestral es el punto medio del intervalo: $\bar x=\dfrac{517{,}65+551{,}95}{2}=\mathbf{534{,}8}$ €.
2. El error máximo es la semiamplitud: $E=\dfrac{551{,}95-517{,}65}{2}=17{,}15$.
3. Nivel $95\,\%$ ($z_{\alpha/2}=1{,}96$): $E=1{,}96\cdot\dfrac{140}{\sqrt n}=17{,}15\Rightarrow\sqrt n=\dfrac{1{,}96\cdot140}{17{,}15}=16\Rightarrow n=256$.

**Media muestral $534{,}8$ € y tamaño de la muestra $n=256$.**

**b) Error máximo con 78 hipotecas al $97\,\%$.**
1. Valor crítico: $z_{\alpha/2}=2{,}17$.
2. $E=2{,}17\cdot\dfrac{140}{\sqrt{78}}=2{,}17\cdot15{,}8519=34{,}3986$.

**Error máximo $\approx34{,}4$ €.**

**c) Probabilidad en otra ciudad.**
1. $X\sim N(540,\ 150)$. Se tipifica con $Z=\dfrac{X-540}{150}$.
2. Con la tabla, $\Phi(1{,}07)-\Phi(0{,}4)=0{,}8577-0{,}6554$:
$$P(600<X<700)=P\!\left(\dfrac{600-540}{150}<Z<\dfrac{700-540}{150}\right)=P(0{,}4<Z<1{,}07)=0{,}8577-0{,}6554=\mathbf{0{,}2023}.$$

*Interpretación:* en torno al $20\,\%$ de las hipotecas de esa ciudad tienen una cuota entre $600$ y $700$ €.
