@@ 1
**a) Valor de $a$.**
1. $M^t=\begin{pmatrix}1&2&1\\0&1&1\\1&0&1\end{pmatrix}$.
2. Se multiplica por $V$:
$$M^tV=\begin{pmatrix}(5-a^2)+2(a-1)+a^2\\(a-1)+a^2\\(5-a^2)+a^2\end{pmatrix}=\begin{pmatrix}2a+3\\a^2+a-1\\5\end{pmatrix}=\begin{pmatrix}5\\1\\5\end{pmatrix}.$$
3. De $2a+3=5$ resulta $a=1$, y se cumple también $a^2+a-1=1$.

**$a=1$.**

**b) Inversa y ecuación matricial.**
1. $|M|=2\neq0$ y $M^{-1}=\begin{pmatrix}\frac{1}{2}&\frac{1}{2}&-\frac{1}{2}\\-1&0&1\\\frac{1}{2}&-\frac{1}{2}&\frac{1}{2}\end{pmatrix}$.
2. Se despeja $X$: de $XM-I_3=N$ se obtiene $XM=N+I_3$ y, multiplicando por la derecha por $M^{-1}$ (la incógnita está a la izquierda de $M$), $X=(N+I_3)M^{-1}$.
3. Con $N+I_3=\begin{pmatrix}4&2&2\\5&3&1\\7&4&1\end{pmatrix}$:
$$X=\begin{pmatrix}4&2&2\\5&3&1\\7&4&1\end{pmatrix}\begin{pmatrix}\frac{1}{2}&\frac{1}{2}&-\frac{1}{2}\\-1&0&1\\\frac{1}{2}&-\frac{1}{2}&\frac{1}{2}\end{pmatrix}=\begin{pmatrix}1&1&1\\0&2&1\\0&3&1\end{pmatrix}.$$

**c) Operaciones posibles.**
1. $2\cdot V\cdot N^t$: $V$ es $3\times1$ y $N^t$ es $3\times3$; el número de columnas de $V$ ($1$) no coincide con el de filas de $N^t$ ($3$). **No se puede realizar.**
2. $(N+M^t)\cdot V$: $N+M^t$ es $3\times3$ (suma de dos matrices $3\times3$) y $V$ es $3\times1$. **Se puede realizar y es de dimensión $3\times1$.**

@@ 2
1. **Incógnitas.** $x$ = equipos del primer tipo e $y$ = equipos del segundo.
2. **Restricciones.**
   - Javascript: $2x+6y\le150$.
   - Python: $3x+4y\le120$.
   - Al menos 6 equipos del segundo tipo: $y\ge6$.
   - No negatividad: $x\ge0$.
3. **Función objetivo.** Hay que maximizar el número de equipos: $F(x,y)=x+y$.
4. **Vértices:** $(0,6)$, $(0,25)$, $(12,21)$ (corte de $2x+6y=150$ con $3x+4y=120$) y $(32,6)$ (corte de $3x+4y=120$ con $y=6$).
5. **Valor de $F$ en cada vértice:**

| Vértice | $(0,6)$ | $(0,25)$ | $(12,21)$ | $(32,6)$ |
|---|---|---|---|---|
| $x+y$ | $6$ | $25$ | $33$ | $38$ |

![Región factible del ejercicio 2 (2024-ord-sup-b), con sus vértices: (0, 6), (32, 6), (12, 21), (0, 25)](fig/2024-ord-sup-b-e2.svg){fig-alt="Región factible del ejercicio 2 (2024-ord-sup-b), con sus vértices: (0, 6), (32, 6), (12, 21), (0, 25)" width="75%" fig-align="center"}

6. **Conclusión.** El máximo es $38$, en $(32,6)$. Desarrolladores utilizados: Javascript $2\cdot32+6\cdot6=100$ y Python $3\cdot32+4\cdot6=120$ (se agotan los de Python).

**Se pueden formar 32 equipos del primer tipo y 6 del segundo (38 equipos), con 100 desarrolladores de Javascript y 120 de Python.**

@@ 3
**a) Dominio y cortes.**
1. Dominio: el denominador no puede anularse, $\mathbb R\setminus\{-3\}$.
2. Con $OX$: $f(x)=0\iff\dfrac{4}{3+x}=1\iff x=1$, punto $(1,0)$.
3. Con $OY$: $f(0)=1-\dfrac{4}{3}=-\dfrac{1}{3}$, punto $\left(0,-\dfrac{1}{3}\right)$.

**b) Asíntotas.**
1. Vertical: el denominador se anula en $x=-3$ y el numerador no; $\displaystyle\lim_{x\to-3^-}f=+\infty$ y $\displaystyle\lim_{x\to-3^+}f=-\infty$.
2. Horizontal: $\displaystyle\lim_{x\to\pm\infty}f(x)=1$.

**Asíntotas: $x=-3$ e $y=1$.**

**c) Puntos con tangente de pendiente $1$.**
1. Derivada: $f'(x)=\dfrac{4}{(3+x)^2}$.
2. Se iguala a $1$: $\dfrac{4}{(3+x)^2}=1\iff(3+x)^2=4\iff3+x=\pm2\iff x=-1$ o $x=-5$.
3. Se calculan las ordenadas: $f(-1)=1-\dfrac{4}{2}=-1$ y $f(-5)=1-\dfrac{4}{-2}=3$.

**Puntos $(-1,-1)$ y $(-5,3)$.**

**d) Curvatura.**
1. Segunda derivada: $f''(x)=-\dfrac{8}{(3+x)^3}$.
2. Si $x>-3$, $(3+x)^3>0$ y $f''<0$: **cóncava en $(-3,+\infty)$.**
3. Si $x<-3$, $(3+x)^3<0$ y $f''>0$: **convexa en $(-\infty,-3)$.**
4. No hay puntos de inflexión, porque $x=-3$ no está en el dominio.

@@ 4
**a) Continuidad y derivabilidad.** Cada trozo es un polinomio; solo hay que estudiar $x=2$.
1. Continuidad: $\displaystyle\lim_{x\to2^-}\left(-x^2+2x\right)=0$ y $f(2)=4-4=0$: **continua.**
2. Derivadas: $f'(x)=-2x+2$ si $x<2$ y $f'(x)=2x-2$ si $x>2$.
3. En $x=2$: $f'(2^-)=-2\neq f'(2^+)=2$: no derivable (punto anguloso).

**$f$ es continua en $\mathbb R$ y derivable en $\mathbb R\setminus\{2\}$.**

**b) Recinto y área.**
1. En $[-1,1]$, $f(x)=-x^2+2x$ (parábola abierta hacia abajo con vértice $(1,1)$).
2. La recta $y=2x$ y la parábola se cortan donde $-x^2+2x=2x\iff x=0$ (en ese punto son tangentes).
3. Como $2x-\left(-x^2+2x\right)=x^2\ge0$, la recta queda por encima de la parábola en todo el intervalo $[-1,1]$.
4. Área: integral de la función de arriba menos la de abajo:
$$A=\int_{-1}^{1}\left[2x-\left(-x^2+2x\right)\right]dx=\int_{-1}^{1}x^2\,dx=\left[\frac{x^3}{3}\right]_{-1}^{1}=\frac{2}{3}.$$

**$A=\dfrac{2}{3}\ \text{u}^2$**

![Recinto entre la recta y=2x y la parábola −x²+2x entre x=−1 y x=1, tangentes en el origen; la gráfica de f continúa con x²−2x desde x=2](fig/2024-ord-sup-b-e4.svg){fig-alt="Recinto entre la recta y=2x y la parábola −x²+2x entre x=−1 y x=1, tangentes en el origen; la gráfica de f continúa con x²−2x desde x=2" width="75%" fig-align="center"}

@@ 5
**Datos.** 15 papeletas: $3$ «mercado», $2$ «leña» y $10$ «casa». Se extraen sin reposición, así que las probabilidades de la segunda dependen de la primera.

**a) Las dos primeras son «mercado».**
1. Primera: $\dfrac{3}{15}$. Segunda, quedan $2$ «mercado» de $14$: $\dfrac{2}{14}$.
2. $P=\dfrac{3}{15}\cdot\dfrac{2}{14}=\dfrac{6}{210}=\dfrac{1}{35}\approx\mathbf{0{,}0286}$.

**b) Las dos primeras no son «casa».**
1. No son «casa» las papeletas «mercado» o «leña»: $3+2=5$.
2. $P=\dfrac{5}{15}\cdot\dfrac{4}{14}=\dfrac{20}{210}=\dfrac{2}{21}\approx\mathbf{0{,}0952}$.

**c) Primera «leña» sabiendo que la segunda es «leña».**
1. Sean $L_1$ y $L_2$ «leña en la primera» y «leña en la segunda». $P(L_1\cap L_2)=\dfrac{2}{15}\cdot\dfrac{1}{14}=\dfrac{1}{105}$.
2. Por simetría, $P(L_2)=\dfrac{2}{15}$ (cada papeleta tiene la misma probabilidad de salir en cualquier posición).
3. Probabilidad condicionada:
$$P(L_1\mid L_2)=\frac{1/105}{2/15}=\frac{1}{14}\approx\mathbf{0{,}0714}.$$

*Interpretación:* es lógico: si la segunda es «leña», quedan $14$ papeletas para la primera y solo una es «leña».

@@ 6
1. **Sucesos y datos.** Sea $B$ «básico» ($\dfrac{30}{50}=0{,}6$), $S$ «superior» ($0{,}4$) e $I$ «presenta incidencias»: $P(I^C)=0{,}8$, $P(I\mid B)=0{,}3$.
2. **Tabla de probabilidades.**
   - $P(B\cap I)=0{,}6\cdot0{,}3=0{,}18$.
   - $P(B\cap I^C)=0{,}6-0{,}18=0{,}42$.
   - $P(S\cap I^C)=P(I^C)-P(B\cap I^C)=0{,}8-0{,}42=0{,}38$.
   - $P(S\cap I)=0{,}4-0{,}38=0{,}02$.

**a) Básico y sin incidencias.**
1. $P(B\cap I^C)=\mathbf{0{,}42}$.

**b) Sin incidencias siendo superior.**
1. $P(I^C\mid S)=\dfrac{0{,}38}{0{,}4}=\mathbf{0{,}95}$.

**c) Básico sabiendo que tiene incidencias.**
1. $P(I)=1-0{,}8=0{,}2$.
2. $P(B\mid I)=\dfrac{0{,}18}{0{,}2}=\mathbf{0{,}9}$.

*Interpretación:* el $90\,\%$ de las alarmas con incidencias son básicas.

**d) Unión de dos casos.**
1. Los dos sucesos son incompatibles, así que se suman:
$$P\left((B\cap I)\cup(S\cap I^C)\right)=0{,}18+0{,}38=\mathbf{0{,}56}.$$

@@ 7
**Datos.** $\hat p=\dfrac{370}{400}=0{,}925$, $n=400$.

**a) Intervalo al $93\,\%$ y conclusión.**
1. Valor crítico: $\Phi(z_{\alpha/2})=0{,}965$ y en la tabla $\Phi(1{,}81)=0{,}9649$ (el más cercano), luego $z_{\alpha/2}=1{,}81$.
2. Error máximo: $E=1{,}81\sqrt{\dfrac{0{,}925\cdot0{,}075}{400}}=1{,}81\cdot0{,}01317=0{,}0238$.
3. Intervalo: $\hat p\pm E$:
$$IC=(0{,}925-0{,}0238,\ 0{,}925+0{,}0238)=(0{,}9012,\ 0{,}9488).$$
4. Todo el intervalo está por encima de $0{,}88$.

**La empresa sí cumple los estándares de calidad.**

**b) Tamaño mínimo con amplitud inferior a $0{,}03$ al $95\,\%$.**
1. Valor crítico: $z_{\alpha/2}=1{,}96$.
2. La amplitud es $2E$: $2E<0{,}03\iff E<0{,}015$.
3. Se despeja $n$:
$$n>\frac{1{,}96^2\cdot0{,}925\cdot0{,}075}{0{,}015^2}=1\,184{,}49.$$
4. Se redondea hacia arriba.

**Hay que analizar al menos $n=1\,185$ envíos.**

@@ 8
**a) Tiempo medio de 100 mesas.**
1. Distribución de la media muestral: $\bar X\sim N\!\left(60,\ \dfrac{30}{\sqrt{100}}\right)=N(60,\ 3)$.
2. Se tipifica y se usa la simetría de la normal:
$$P(\bar X>54)=P\!\left(Z>\frac{54-60}{3}\right)=P(Z>-2)=P(Z<2)=\mathbf{0{,}9772}.$$

*Interpretación:* es muy probable (casi el $98\,\%$) que el tiempo medio de las 100 mesas supere los $54$ minutos.

**b) Intervalo al $97\,\%$ y error máximo.**
1. Datos: $\bar x=40$, $\sigma=20$, $n=25$. Valor crítico: $z_{\alpha/2}=2{,}17$ (tabla: $\Phi(2{,}17)=0{,}9850$).
2. Error máximo: $E=2{,}17\cdot\dfrac{20}{\sqrt{25}}=2{,}17\cdot4=8{,}68$.
3. Intervalo: $\bar x\pm E$:
$$IC=(40-8{,}68,\ 40+8{,}68)=(31{,}32,\ 48{,}68).$$

**Error máximo $8{,}68$ minutos.**

*Interpretación:* con confianza del $97\,\%$, el tiempo medio de fabricación de una puerta está entre $31{,}32$ y $48{,}68$ minutos.
