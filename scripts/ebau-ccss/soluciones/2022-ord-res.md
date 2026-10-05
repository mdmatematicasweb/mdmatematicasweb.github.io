@@ 1
**a) Operaciones posibles.** Un producto $M\cdot N$ solo se puede hacer si las columnas de $M$ coinciden con las filas de $N$; una suma, si tienen la misma dimensión.
1. $C\cdot A$: $C$ es $3\times1$ y $A$ es $3\times3$. El número de columnas de $C$ (1) no coincide con el de filas de $A$ (3): **no se puede efectuar.**
2. $A+B$: ambas son $3\times3$, **sí se puede:**
$$A+B=\begin{pmatrix}2&-1&2\\-2&-2&0\\3&-2&1\end{pmatrix}.$$
3. $C^t\cdot B^t$: $C^t$ es $1\times3$ y $B^t$ es $3\times3$, **sí se puede** y el resultado es $1\times3$:
$$C^tB^t=\begin{pmatrix}3&-7&-2\end{pmatrix}\begin{pmatrix}1&-1&1\\-1&-1&-1\\1&-1&1\end{pmatrix}=\begin{pmatrix}8&6&8\end{pmatrix}.$$

**b) Ecuación matricial.**
1. Se agrupan los términos con $X$: $AX=BX+C\Rightarrow AX-BX=C\Rightarrow(A-B)X=C$.
2. $A-B=\begin{pmatrix}0&1&0\\0&0&2\\1&0&-1\end{pmatrix}$ y $|A-B|=2\neq0$, luego es invertible.
3. Se despeja $X$ multiplicando por la izquierda por $(A-B)^{-1}$ (la incógnita está a la derecha): $X=(A-B)^{-1}C$.
4. Se calcula:
$$X=\begin{pmatrix}0&\frac{1}{2}&1\\1&0&0\\0&\frac{1}{2}&0\end{pmatrix}\begin{pmatrix}3\\-7\\-2\end{pmatrix}=\begin{pmatrix}-\frac{11}{2}\\3\\-\frac{7}{2}\end{pmatrix}.$$

@@ 2
1. **Incógnitas.** $x$ = lotes de tipo A e $y$ = lotes de tipo B.
2. **Restricciones.**
   - Cuadernos: $2x+3y\le400$.
   - Estuches: $2x+y\le300$.
   - No más de 100 lotes de tipo B: $y\le100$.
   - No negatividad: $x\ge0$, $y\ge0$.
3. **Función objetivo.** Valor de las ventas: $V(x,y)=35x+45y$.
4. **Vértices:** $(0,0)$, $(0,100)$, $(50,100)$, $(125,50)$ (corte de $2x+3y=400$ con $2x+y=300$) y $(150,0)$.
5. **Valor de $V$ en cada vértice:**

| Vértice | $(0,0)$ | $(0,100)$ | $(50,100)$ | $(125,50)$ | $(150,0)$ |
|---|---|---|---|---|---|
| $V$ | $0$ | $4\,500$ | $6\,250$ | $6\,625$ | $5\,250$ |

![Región factible del ejercicio 2 (2022-ord-res), con sus vértices: (0, 0), (150, 0), (125, 50), (50, 100), (0, 100)](fig/2022-ord-res-e2.svg){fig-alt="Región factible del ejercicio 2 (2022-ord-res), con sus vértices: (0, 0), (150, 0), (125, 50), (50, 100), (0, 100)" width="75%" fig-align="center"}

6. **Conclusión.** El máximo es $6\,625$, en $(125,50)$ (se agotan cuadernos y estuches).

**Debe vender 125 lotes de tipo A y 50 de tipo B, con un valor máximo de ventas de $6\,625$ €.**

@@ 3
**a) Continuidad y derivabilidad.** Cada trozo es continuo y derivable en su intervalo abierto; solo hay que estudiar $x=-1$ y $x=2$.
1. En $x=-1$: $\displaystyle\lim_{x\to-1^-}f=4-16+17=5$ y $f(-1)=\dfrac{1}{3}(10+5)=5$: **continua.**
2. Derivadas laterales en $x=-1$: $f'(-1^-)=8x+16=8$ y $f'(-1^+)=-\dfrac{5}{3}$. No coinciden: **no derivable en $x=-1$** (punto anguloso).
3. En $x=2$: $f(2)=\dfrac{1}{3}(10-10)=0$ y $\displaystyle\lim_{x\to2^+}f=\dfrac{3}{2}$: **discontinuidad de salto finito**, luego tampoco es derivable.

**$f$ es continua en $\mathbb R\setminus\{2\}$ y derivable en $\mathbb R\setminus\{-1,2\}$.**

**b) Gráfica.**
1. Para $x<-1$: parábola $y=4x^2+16x+17$ (vértice $(-2,1)$, pasa por $(-1,5)$).
2. Para $-1\le x\le2$: segmento de recta de $(-1,5)$ a $(2,0)$.
3. Para $x>2$: recta horizontal $y=\dfrac{3}{2}$, con el punto «abierto» en $\left(2,\dfrac{3}{2}\right)$.

![Gráfica de f: parábola 4x²+16x+17 hasta x=−1, segmento de (−1,5) a (2,0) y recta horizontal y=3/2 desde x=2 (salto en x=2); recinto sombreado entre x=−2 y x=2](fig/2022-ord-res-e3.svg){fig-alt="Gráfica de f: parábola 4x²+16x+17 hasta x=−1, segmento de (−1,5) a (2,0) y recta horizontal y=3/2 desde x=2 (salto en x=2); recinto sombreado entre x=−2 y x=2" width="75%" fig-align="center"}

**c) Área entre $x=-2$ y $x=2$.**
1. En $[-2,2]$, $f\ge0$: la parábola no corta al eje ($4x^2+16x+17$ no se anula, $\Delta<0$) y el segmento llega a $0$ en $x=2$.
2. Se parte la integral en los dos trozos de ese intervalo:
$$A=\int_{-2}^{-1}\left(4x^2+16x+17\right)dx+\int_{-1}^{2}\frac{10-5x}{3}\,dx=\frac{7}{3}+\frac{15}{2}=\frac{59}{6}.$$

**$A=\dfrac{59}{6}\ \text{u}^2$**

@@ 4
**a) Rectas tangentes paralelas a $y=-3x+1$.**
1. Rectas paralelas tienen la misma pendiente: $f'(x_0)=-3$.
2. Derivada: $f'(x)=9x^2-12x$. Se resuelve $f'(x)=-3\iff3x^2-4x+1=0\iff x=1$ o $x=\dfrac{1}{3}$.
3. Para cada punto se usa $y-f(x_0)=f'(x_0)(x-x_0)$:
   - $x=1$: $f(1)=2$ y tangente $y-2=-3(x-1)$, **$y=-3x+5$**.
   - $x=\dfrac{1}{3}$: $f\left(\frac{1}{3}\right)=\dfrac{40}{9}$ y tangente $y-\dfrac{40}{9}=-3\left(x-\dfrac{1}{3}\right)$, **$y=-3x+\dfrac{49}{9}$**.

**b) Primitiva con condición.**
1. Se integra: $F(x)=\displaystyle\int\left(3x^3-6x^2+5\right)dx=\frac{3x^4}{4}-2x^3+5x+K$.
2. Se impone $F(2)=4$: $F(2)=12-16+10+K=4$, de donde $K=-2$.

**$F(x)=\dfrac{3x^4}{4}-2x^3+5x-2$.**

@@ 5
**a)** Intersección, despejada de la unión.
1. $P(A\cap B)=P(A)+P(B)-P(A\cup B)=0{,}7+0{,}6-0{,}8=\mathbf{0{,}5}$.

**b)** Ni $A$ ni $B$ es el complementario de la unión (ley de De Morgan).
1. $P(A^C\cap B^C)=1-P(A\cup B)=1-0{,}8=\mathbf{0{,}2}$.

**c)** $A$ pero no $B$.
1. $P(A\cap B^C)=P(A)-P(A\cap B)=0{,}7-0{,}5=\mathbf{0{,}2}$.

**d)** Probabilidad condicionada.
1. $P(B^C)=1-0{,}6=0{,}4$.
2. $P(A\mid B^C)=\dfrac{P(A\cap B^C)}{P(B^C)}=\dfrac{0{,}2}{0{,}4}=\mathbf{0{,}5}$.

*Interpretación:* si no ocurre $B$, la mitad de las veces ocurre $A$.

@@ 6
1. **Sucesos y datos.** Sea $A$ «ha bebido alcohol» y $+$ «test positivo»: $P(A)=0{,}05$, $P(+\mid A)=0{,}96$, $P(+\mid A^C)=0{,}1$.

**a)** Es una probabilidad a posteriori (Bayes).
1. Total de positivos (probabilidad total): $P(+)=0{,}05\cdot0{,}96+0{,}95\cdot0{,}1=0{,}048+0{,}095=0{,}143$.
2. Bayes:
$$P(A\mid+)=\frac{0{,}048}{0{,}143}=\frac{48}{143}\approx\mathbf{0{,}3357}.$$

*Interpretación:* solo uno de cada tres positivos ha bebido de verdad, porque casi todos los conductores no beben y el test falla un $10\,\%$ con ellos.

**b)** Negativo y no ha bebido.
1. $P(-\cap A^C)=P(A^C)\cdot P(-\mid A^C)=0{,}95\cdot0{,}9=\mathbf{0{,}855}$.

**c)** Probabilidad condicionada.
1. $P(-)=1-0{,}143=0{,}857$.
2. $P(A^C\mid-)=\dfrac{0{,}855}{0{,}857}=\dfrac{855}{857}\approx\mathbf{0{,}9977}$.

*Interpretación:* un resultado negativo es casi seguro que corresponde a un conductor que no ha bebido.

@@ 7
**Datos.** $\hat p=\dfrac{96}{120}=0{,}8$, $n=120$.

**a) Intervalo al $95\,\%$.**
1. Valor crítico: $z_{\alpha/2}=1{,}96$.
2. Error máximo: $E=1{,}96\sqrt{\dfrac{0{,}8\cdot0{,}2}{120}}=1{,}96\cdot0{,}03651=0{,}0716$.
3. Intervalo: $\hat p\pm E$:
$$IC=(0{,}8-0{,}0716,\ 0{,}8+0{,}0716)=(0{,}7284,\ 0{,}8716).$$

*Interpretación:* con confianza del $95\,\%$, entre el $72{,}84\,\%$ y el $87{,}16\,\%$ de los clientes volverían al taller.

**b) Tamaño mínimo con $E\le0{,}05$ al $97\,\%$.**
1. Valor crítico: $\Phi(z_{\alpha/2})=0{,}985$; la tabla da exactamente $\Phi(2{,}17)=0{,}9850$, luego $z_{\alpha/2}=2{,}17$.
2. Se despeja $n$ de $E\le0{,}05$:
$$n\ge\frac{2{,}17^2\cdot0{,}8\cdot0{,}2}{0{,}05^2}=301{,}37.$$
3. Se redondea hacia arriba.

**Hacen falta al menos $n=302$ clientes.**

@@ 8
**Datos.** $\sigma=\sqrt{4225}=65$ kWh.

**a) Intervalo al $92\,\%$.**
1. Media muestral: $\bar x=\dfrac{26\,830}{100}=268{,}3$.
2. Valor crítico: $z_{\alpha/2}=1{,}75$ y error máximo $E=1{,}75\cdot\dfrac{65}{\sqrt{100}}=11{,}375$.
3. Intervalo:
$$IC=(268{,}3-11{,}375,\ 268{,}3+11{,}375)=(256{,}925,\ 279{,}675).$$

*Interpretación:* con confianza del $92\,\%$, el consumo medio mensual por vivienda está entre $256{,}925$ y $279{,}675$ kWh.

**b) Tamaño mínimo con $E\le5$ al $98\,\%$.**
1. Valor crítico: $\Phi(z_{\alpha/2})=0{,}99$ y en la tabla $\Phi(2{,}33)=0{,}9901$ (el más cercano a $0{,}99$), luego $z_{\alpha/2}=2{,}33$.
2. Se despeja $n$ de $E\le5$:
$$n\ge\left(\frac{2{,}33\cdot65}{5}\right)^2=917{,}48.$$
3. Se redondea hacia arriba.

**Hacen falta al menos $n=918$ viviendas.**

**c) Media muestral del nuevo intervalo.**
1. El intervalo es simétrico alrededor de la media muestral, que es su punto medio:
$$\bar x=\dfrac{224{,}08+255{,}92}{2}=\mathbf{240}\text{ kWh}.$$
