@@ 1
**a) Potencias.**
1. Se calculan las primeras: $A^2=\begin{pmatrix}1&0\\-2&1\end{pmatrix}$; el elemento $(2,1)$ va valiendo $-1,-2,\dots$
2. Patrón (que se comprueba por inducción): $A^n=\begin{pmatrix}1&0\\-n&1\end{pmatrix}$.
3. La traspuesta de una potencia es la potencia de la traspuesta: $\left(A^t\right)^{30}=\left(A^{30}\right)^t$. Así
$$A^{40}=\begin{pmatrix}1&0\\-40&1\end{pmatrix},\qquad\left(A^t\right)^{30}=\left(A^{30}\right)^t=\begin{pmatrix}1&-30\\0&1\end{pmatrix}.$$

**b) Suma de $A$ y su inversa.**
1. $|A|=1$ y $A^{-1}=\begin{pmatrix}1&0\\1&1\end{pmatrix}$.
2. $A^{-1}+A=\begin{pmatrix}2&0\\0&2\end{pmatrix}=2I_2$.
3. Al cuadrado: $\left(2I_2\right)^2=4I_2$:
$$\left(A^{-1}+A\right)^2=4I_2=\begin{pmatrix}4&0\\0&4\end{pmatrix}.$$

**c) Ecuación matricial.**
1. $A^t+I_2=\begin{pmatrix}2&-1\\0&2\end{pmatrix}$, con determinante $4\neq0$; $A^t-I_2=\begin{pmatrix}0&-1\\0&0\end{pmatrix}$.
2. La incógnita está a la derecha del factor conocido: $X=\left(A^t+I_2\right)^{-1}\left(A^t-I_2\right)$, con $\left(A^t+I_2\right)^{-1}=\begin{pmatrix}\frac{1}{2}&\frac{1}{4}\\0&\frac{1}{2}\end{pmatrix}$.
3. Se multiplica:
$$X=\begin{pmatrix}\frac{1}{2}&\frac{1}{4}\\0&\frac{1}{2}\end{pmatrix}\begin{pmatrix}0&-1\\0&0\end{pmatrix}=\begin{pmatrix}0&-\frac{1}{2}\\0&0\end{pmatrix}.$$

@@ 2
**a) Región factible.**
1. Las rectas frontera son $5x-3y=-9$, $x+y=11$, $6x+y=36$ y $x+2y=6$. Con un punto de prueba (por ejemplo $(2,4)$) se comprueba qué lado cumple cada desigualdad.
2. Los vértices de la región factible son
$$(0,3),\quad(3,8),\quad(5,6),\quad(6,0),$$
que se obtienen cortando $x+2y=6$ con $x=0$, $5x-3y=-9$ con $x+y=11$, $x+y=11$ con $6x+y=36$ y $6x+y=36$ con $y=0$, respectivamente. (La región es el cuadrilátero de esos cuatro vértices.)

![Región factible del ejercicio 2 (2021-ord-sup), con sus vértices: (0, 3), (6, 0), (5, 6), (3, 8)](fig/2021-ord-sup-e2.svg){fig-alt="Región factible del ejercicio 2 (2021-ord-sup), con sus vértices: (0, 3), (6, 0), (5, 6), (3, 8)" width="75%" fig-align="center"}

**b) Pertenencia.** Se sustituye el punto en cada desigualdad. Para $(5,7)$: $5+7=12>11$, no cumple $x+y\le11$. **No pertenece a la región.**

**c) Máximo y mínimo de $F=10x-6y$.**
1. Se evalúa $F$ en los vértices: $F(0,3)=-18$, $F(3,8)=-18$, $F(5,6)=14$, $F(6,0)=60$.
2. El mayor valor es $60$ y el menor $-18$, que se repite en dos vértices.

**Máximo $60$ en $(6,0)$. Mínimo $-18$, que se alcanza en $(0,3)$ y en $(3,8)$ y, por tanto, en todos los puntos del segmento que los une** (porque $F=-18$ es la recta $5x-3y=-9$ multiplicada por 2, es decir, la recta de nivel es paralela a ese lado de la región).

@@ 3
**a) Continuidad y derivabilidad.** Cada tramo es continuo en su intervalo; se estudian los puntos de cambio, $x=-1$ y $x=1$.
- En $x=-1$: $\displaystyle\lim_{x\to-1^-}\frac1x=-1$ y $\displaystyle\lim_{x\to-1^+}\left(-3x^2+4\right)=1$. Distintos: **discontinuidad de salto finito en $x=-1$.**
- En $x=1$: $\displaystyle\lim_{x\to1^-}\left(-3x^2+4\right)=1$, $\displaystyle\lim_{x\to1^+}(2x-1)=1$ y $f(1)=1$: **continua en $x=1$.**
- En el resto es continua ($\dfrac1x$ solo falla en $x=0$, que no está en su tramo).

**Derivabilidad.** $f'(x)=-\dfrac{1}{x^2}$ si $x<-1$, $f'(x)=-6x$ si $-1<x<1$, $f'(x)=2$ si $x>1$. En $x=1$: $f'(1^-)=-6\neq f'(1^+)=2$: **no derivable en $x=1$** (en $x=-1$ no puede serlo porque no es continua).

**$f$ es continua en $\mathbb R\setminus\{-1\}$ y derivable en $\mathbb R\setminus\{-1,1\}$.**

**b) Gráfica.**
1. Primer tramo: hipérbola $y=\dfrac1x$ (con $x\le-1$), que parte de $0^-$ y llega a $(-1,-1)$ (punto relleno).
2. Segundo tramo: arco de parábola $y=-3x^2+4$ en $(-1,1)$, de vértice $(0,4)$, con los extremos «abiertos» en $(-1,1)$ y $(1,1)$.
3. Tercer tramo: semirrecta $y=2x-1$ desde $(1,1)$ hacia arriba (pasa por $(2,3)$).

![Gráfica de f: hipérbola 1/x para x≤−1, parábola −3x²+4 en (−1,1) y recta 2x−1 para x≥1; salto en x=−1 y recinto sombreado entre x=0 y x=3](fig/2021-ord-sup-e3.svg){fig-alt="Gráfica de f: hipérbola 1/x para x≤−1, parábola −3x²+4 en (−1,1) y recta 2x−1 para x≥1; salto en x=−1 y recinto sombreado entre x=0 y x=3" width="75%" fig-align="center"}

**c) Área entre $x=0$ y $x=3$.**
1. En $[0,3]$ la función es positiva: $-3x^2+4\ge1$ en $[0,1]$ y $2x-1\ge1$ en $[1,3]$, así que el área es la integral.
2. Se parte en $x=1$, donde cambia la expresión:
$$A=\int_0^1\left(-3x^2+4\right)dx+\int_1^3(2x-1)\,dx=\left[-x^3+4x\right]_0^1+\left[x^2-x\right]_1^3=3+6=9.$$

**$A=9\ \text{u}^2$**

@@ 4
**a) Coste mínimo.**
1. Se deriva e iguala a cero: $f'(x)=2x-6=0\Rightarrow x=3$.
2. Segunda derivada: $f''(x)=2>0$, luego es un **mínimo**.
3. Coste en ese punto: $f(3)=9-18+10=1$.

**El coste es mínimo con una producción de $3$ mil kg ($3\,000$ kg) y vale $1$ mil euros ($1\,000$ €).**

**b) Tangente en $x=4$.**
1. Punto: $f(4)=16-24+10=2$.
2. Pendiente: $f'(4)=2\cdot4-6=2$.
3. Recta punto-pendiente: $y-2=2(x-4)$.

**$y=2x-6$.**

4. **Gráfica.** La parábola tiene vértice $(3,1)$ y está abierta hacia arriba; corta al eje $OY$ en $(0,10)$ y no corta al eje $OX$ porque $\Delta=36-40<0$; pasa por $(2,2)$ y $(4,2)$. La recta $y=2x-6$ la toca en $(4,2)$ y corta al eje $OX$ en $(3,0)$.

![Parábola de costes f(x)=x²−6x+10 con vértice (3,1) y su recta tangente y=2x−6 en el punto (4,2)](fig/2021-ord-sup-e4.svg){fig-alt="Parábola de costes f(x)=x²−6x+10 con vértice (3,1) y su recta tangente y=2x−6 en el punto (4,2)" width="75%" fig-align="center"}

@@ 5
1. **Datos.** Sea $M$ «ser mujer». Plantilla total: $1000+600+400=2000$. Mujeres: $0{,}42\cdot1000+0{,}2\cdot600+0{,}5\cdot400=420+120+200=740$.

**a)** Casos favorables entre casos posibles (equivale a la probabilidad total):
$$P(M)=\dfrac{740}{2000}=\mathbf{0{,}37}.$$

**b)** Se pide una probabilidad condicionada: entre los hombres, ¿qué proporción son bomberos?
1. Hombres: $2000-740=1260$.
2. Bomberos hombres: $600-120=480$.
$$P(\text{bombero}\mid\text{hombre})=\dfrac{480}{1260}=\dfrac{8}{21}\approx\mathbf{0{,}3810}.$$

@@ 6
1. **Suceso $S$:** «suma de los dados $\ge9$». Casos favorables $(3,6),(4,5),(4,6),(5,4),(5,5),(5,6),(6,3),(6,4),(6,5),(6,6)$ (10 de los 36), es decir $P(S)=\dfrac{10}{36}=\dfrac{5}{18}$ y $P(S^C)=\dfrac{13}{18}$.
2. **Árbol.** Primera etapa: dados ($S$: urna $A$; $S^C$: urna $B$). Segunda etapa: color de la bola.

**a)** Regla del producto en la rama «dados $<9$, urna $B$, verde»:
$$P(\text{verde}\cap B)=P(S^C)\cdot P(\text{verde}\mid B)=\dfrac{13}{18}\cdot\dfrac{3}{9}=\dfrac{13}{54}\approx\mathbf{0{,}2407}.$$

**b)** Probabilidad total: se suman las dos ramas que acaban en roja.
$$P(\text{roja})=P(S)\cdot\dfrac{4}{9}+P(S^C)\cdot\dfrac{6}{9}=\dfrac{5}{18}\cdot\dfrac{4}{9}+\dfrac{13}{18}\cdot\dfrac{6}{9}=\dfrac{20}{162}+\dfrac{78}{162}=\dfrac{49}{81}\approx\mathbf{0{,}6049}.$$

@@ 7
1. **Datos.** $\hat p=0{,}15$, $n=1000$ ($n\hat p=150\ge5$ y $n(1-\hat p)=850\ge5$). Nivel $95\,\%$: $z_{\alpha/2}=1{,}96$.

**a)**
1. Error máximo: $E=1{,}96\sqrt{\dfrac{0{,}15\cdot0{,}85}{1000}}=1{,}96\cdot0{,}01129=0{,}0221$.
2. Intervalo:
$$IC=(0{,}15-0{,}0221,\ 0{,}15+0{,}0221)=(0{,}1279,\ 0{,}1721).$$

Interpretación: con una confianza del $95\,\%$, entre el $12{,}8\,\%$ y el $17{,}2\,\%$ de la población está enferma.

**b)**
1. Error inferior al $1\,\%$: $E<0{,}01$.
2. Se despeja $n$: $E<0{,}01\iff n>\dfrac{1{,}96^2\cdot0{,}15\cdot0{,}85}{0{,}01^2}=4\,898{,}04$.
3. Se redondea hacia arriba.

**Hacen falta al menos $n=4\,899$ ciudadanos.**

@@ 8
**a) Distribución de la media muestral.**
1. $X\sim N(1000,\,16)$ (la desviación típica es $\sqrt{256}=16$ g).
2. Para muestras de tamaño $64$: $\bar X\sim N\!\left(1000,\dfrac{16}{\sqrt{64}}\right)=N(1000,\,2)$.
3. Se tipifica y se usa la simetría de la tabla:
$$P(\bar X<996)=P\!\left(Z<\frac{996-1000}{2}\right)=P(Z<-2)=1-P(Z<2)=1-0{,}9772=\mathbf{0{,}0228}.$$

**b) Intervalo al $90\,\%$.**
1. Media muestral: $\bar x=\dfrac{63\,744}{64}=996$ g.
2. Nivel $90\,\%$: $\Phi(z_{\alpha/2})=0{,}95$, que está entre $\Phi(1{,}64)=0{,}9495$ y $\Phi(1{,}65)=0{,}9505$; se toma $z_{\alpha/2}=1{,}645$.
3. Error máximo: $E=1{,}645\cdot\dfrac{16}{\sqrt{64}}=3{,}29$.
4. Intervalo:
$$IC=(996-3{,}29,\ 996+3{,}29)=(992{,}71,\ 999{,}29).$$

**c) Interpretación.** El valor $1000$ g **no pertenece al intervalo**: al $90\,\%$ de confianza el peso medio real es menor que el que indica el paquete. **La denuncia parece tener base.**
