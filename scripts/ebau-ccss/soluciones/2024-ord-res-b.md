@@ 1
**a) Sistema de ecuaciones matriciales.**
1. Se suman las dos ecuaciones para eliminar $Y$: $(2X-Y)+(X+Y)=4A+B\Rightarrow3X=4A+B$, luego $X=\dfrac{4A+B}{3}$.
2. De la segunda ecuación, $Y=B-X$.
3. Se calcula:
$$4A+B=\begin{pmatrix}0&4\\4&0\end{pmatrix}+\begin{pmatrix}3&2\\2&0\end{pmatrix}=\begin{pmatrix}3&6\\6&0\end{pmatrix},\qquad X=\begin{pmatrix}1&2\\2&0\end{pmatrix},\qquad Y=B-X=\begin{pmatrix}2&0\\0&0\end{pmatrix}.$$
4. Comprobación: $2X-Y=\begin{pmatrix}0&4\\4&0\end{pmatrix}=4A$ y $X+Y=B$.

**b) Potencia $C^{2024}$.**
1. Se calculan las primeras potencias: $C^2=\begin{pmatrix}1&0\\2&1\end{pmatrix}$ y $C^3=\begin{pmatrix}1&0\\3&1\end{pmatrix}$.
2. Patrón, que se demuestra por inducción: $C^n=\begin{pmatrix}1&0\\n&1\end{pmatrix}$.

**$C^{2024}=\begin{pmatrix}1&0\\2024&1\end{pmatrix}$.**

**c) Operaciones posibles.** $D$ es $2\times3$, luego $D^t$ es $3\times2$; $A$ y $B$ son $2\times2$.
1. $A^tB+DD^t$: $A^tB$ es $2\times2$ y $DD^t$ es $(2\times3)(3\times2)=2\times2$. **Se puede y el resultado es $2\times2$.**
2. $DB^t+A$: $DB^t$ es $(2\times3)(2\times2)$, y el número de columnas de $D$ ($3$) no coincide con el de filas de $B^t$ ($2$). **No se puede.**
3. $D^tA^t+D$: $D^tA^t$ es $(3\times2)(2\times2)=3\times2$ y $D$ es $2\times3$; no se pueden sumar matrices de distinta dimensión. **No se puede.**

@@ 2
1. **Incógnitas.** $x$ = pulseras de tipo $A$ e $y$ = pulseras de tipo $B$.
2. **Restricciones.**
   - Oro: $x+2y\le50$.
   - Platino: $2x+y\le40$.
   - Plata (solo las de tipo $B$): $y\le25$.
   - No negatividad: $x\ge0$, $y\ge0$.
3. **Función objetivo.** Ingresos: $I(x,y)=150x+200y$.
4. **Vértices:** $(0,0)$, $(0,25)$, $(10,20)$ (corte de $x+2y=50$ con $2x+y=40$) y $(20,0)$.
5. **Valor de $I$ en cada vértice:**

| Vértice | $(0,0)$ | $(0,25)$ | $(10,20)$ | $(20,0)$ |
|---|---|---|---|---|
| $I$ | $0$ | $5\,000$ | $5\,500$ | $3\,000$ |

![Región factible del ejercicio 2 (2024-ord-res-b), con sus vértices: (0, 0), (20, 0), (10, 20), (0, 25)](fig/2024-ord-res-b-e2.svg){fig-alt="Región factible del ejercicio 2 (2024-ord-res-b), con sus vértices: (0, 0), (20, 0), (10, 20), (0, 25)" width="75%" fig-align="center"}

6. **Conclusión.** El máximo es $5\,500$, en $(10,20)$.
7. **Metales sobrantes.** Con $(10,20)$: oro $10+40=50$ g, platino $20+20=40$ g y plata $20$ g.

**Debe fabricar 10 pulseras del tipo $A$ y 20 del tipo $B$, con unos ingresos máximos de $5\,500$ €. Sobran $0$ g de oro, $0$ g de platino y $5$ g de plata.**

@@ 3
**a) Parámetros y derivabilidad.**
1. Continuidad en $x=1$: $\displaystyle\lim_{x\to1^-}f=1+a-1=a$ y $\displaystyle\lim_{x\to1^+}f=b$; luego $a=b$.
2. Continuidad en $x=3$: $\dfrac b3$ (por la izquierda) y $\dfrac{3-1}{3}=\dfrac{2}{3}$ (por la derecha); luego $b=2$.
3. Entonces $a=b=2$.

**$a=b=2$.**

4. Derivadas: $f'(x)=2x+2$ si $x<1$, $f'(x)=-\dfrac{2}{x^2}$ si $1<x<3$ y $f'(x)=\dfrac{1}{3}$ si $x>3$.
5. En $x=1$: $f'(1^-)=4\neq f'(1^+)=-2$.
6. En $x=3$: $f'(3^-)=-\dfrac{2}{9}\neq f'(3^+)=\dfrac{1}{3}$.

**$f$ es derivable en $\mathbb R\setminus\{1,3\}$.**

**b) Recinto y área** (con $a=5$ y $b=2$).
1. Entre $x=2$ y $x=4$ solo intervienen los dos últimos trozos (el valor de $a$ no influye).
2. En $[2,3]$, $f(x)=\dfrac2x$ (hipérbola decreciente de $(2,1)$ a $\left(3,\dfrac{2}{3}\right)$); en $(3,4]$, $f(x)=\dfrac{x-1}{3}$ (recta de $\left(3,\dfrac{2}{3}\right)$ a $(4,1)$). Ambas son positivas.

![Gráfica de f para a=5 y b=2 entre x=1 y x=5: hipérbola 2/x hasta x=3 y recta (x−1)/3 desde (3,2/3); recinto sombreado entre x=2 y x=4](fig/2024-ord-res-b-e3.svg){fig-alt="Gráfica de f para a=5 y b=2 entre x=1 y x=5: hipérbola 2/x hasta x=3 y recta (x−1)/3 desde (3,2/3); recinto sombreado entre x=2 y x=4" width="75%" fig-align="center"}

3. Área, integral por tramos:
$$A=\int_2^3\frac2x\,dx+\int_3^4\frac{x-1}{3}\,dx=2\ln\frac{3}{2}+\left[\frac{(x-1)^2}{6}\right]_3^4=2\ln\frac{3}{2}+\frac{9-4}{6}=2\ln\frac{3}{2}+\frac{5}{6}.$$

**$A=2\ln\dfrac{3}{2}+\dfrac{5}{6}\approx1{,}644\ \text{u}^2$**

@@ 4
**a) Continuidad, derivabilidad, monotonía y gráfica.**
1. Continuidad en $x=2$: $-2+2+1=1$ y $\dfrac{1}{2-1}=1$; cada tramo es continuo en su intervalo: **continua.**
2. Derivadas: $f'(x)=1-x$ si $x<2$ y $f'(x)=-\dfrac{1}{(x-1)^2}$ si $x>2$.
3. En $x=2$: $f'(2^-)=-1=f'(2^+)$: **derivable.**

**$f$ es continua y derivable en $\mathbb R$.**

4. Monotonía: $f'>0$ en $(-\infty,1)$ y $f'<0$ en $(1,2)$ y en $(2,+\infty)$.

**$f$ crece en $(-\infty,1)$ y decrece en $(1,+\infty)$, con máximo en $\left(1,\dfrac{3}{2}\right)$.**

5. Gráfica: arco de parábola abierta hacia abajo con vértice $\left(1,\dfrac{3}{2}\right)$, que pasa por $(0,1)$ y llega a $(2,1)$; a partir de ahí, la rama de hipérbola $y=\dfrac{1}{x-1}$ decreciente, con asíntota horizontal $y=0$ (pasa por $\left(3,\dfrac{1}{2}\right)$).

![Gráfica de f: parábola con máximo (1, 3/2) hasta (2,1) y hipérbola 1/(x−1) decreciente desde ahí; recinto sombreado entre x=0 y x=4](fig/2024-ord-res-b-e4.svg){fig-alt="Gráfica de f: parábola con máximo (1, 3/2) hasta (2,1) y hipérbola 1/(x−1) decreciente desde ahí; recinto sombreado entre x=0 y x=4" width="75%" fig-align="center"}

**b) Área.**
1. En $[0,4]$, $f>0$.
2. Se integra por tramos (la expresión cambia en $x=2$):
$$A=\int_0^2\left(-\frac{x^2}{2}+x+1\right)dx+\int_2^4\frac{dx}{x-1}=\left[-\frac{x^3}{6}+\frac{x^2}{2}+x\right]_0^2+\left[\ln(x-1)\right]_2^4=\frac{8}{3}+\ln3.$$

**$A=\dfrac{8}{3}+\ln3\approx3{,}765\ \text{u}^2$**

@@ 5
1. **Sucesos y datos.** Sea $R$ «profesa la religión $A$» y $M$ «mujer»: $P(R)=0{,}3$, $P(\text{otras})=0{,}5$, $P(M\mid R)=0{,}4$, $P(R\mid M)=0{,}25$.

**a) Ninguna religión.**
1. Los tres casos suman $1$: $P(\text{ninguna})=1-0{,}3-0{,}5=\mathbf{0{,}2}$.

**b) Hombre.**
1. $P(R\cap M)=P(R)\,P(M\mid R)=0{,}3\cdot0{,}4=0{,}12$.
2. Como $P(R\cap M)=P(R\mid M)\,P(M)$: $P(M)=\dfrac{0{,}12}{0{,}25}=0{,}48$.
3. Complementario: $P(\text{hombre})=1-0{,}48=\mathbf{0{,}52}$.

**c) Solo uno de los dos sucesos.**
1. $P(R\cap M^C)=0{,}3-0{,}12=0{,}18$ y $P(R^C\cap M)=0{,}48-0{,}12=0{,}36$.
2. Son incompatibles, se suman:
$$P(\text{solo uno})=0{,}18+0{,}36=\mathbf{0{,}54}.$$

@@ 6
1. **Sucesos y datos.** Sea $E$ «economista» ($0{,}3$), $L$ «abogado» ($0{,}25$), $O$ «otros» ($1-0{,}3-0{,}25=0{,}45$) y $D$ «puesto directivo»: $P(D\mid E)=0{,}75$, $P(D\mid L)=0{,}6$, $P(D\mid O)=0{,}15$.

**a) No ocupa puesto directivo.**
1. Probabilidad total de directivo: $P(D)=0{,}3\cdot0{,}75+0{,}25\cdot0{,}6+0{,}45\cdot0{,}15=0{,}225+0{,}15+0{,}0675=0{,}4425$.
2. Complementario: $P(D^C)=1-0{,}4425=\mathbf{0{,}5575}$.

**b) Economista sabiendo que es directivo (Bayes).**
1. $P(E\mid D)=\dfrac{0{,}225}{0{,}4425}=\dfrac{30}{59}\approx\mathbf{0{,}5085}$.

*Interpretación:* algo más de la mitad de los directivos son economistas.

@@ 7
**a) Muestreo estratificado con afijación proporcional.**
1. Melones de la variedad $D$: $4\,000-1\,420-980-720=880$.
2. Fracción muestreada: $\dfrac{200}{4\,000}=0{,}05$, la misma en todos los estratos.
3. Tamaño en cada estrato:
$$A:\ 0{,}05\cdot1\,420=71,\quad B:\ 0{,}05\cdot980=49,\quad C:\ 0{,}05\cdot720=36,\quad D:\ 0{,}05\cdot880=44.$$

**Composición de la muestra: $71$ de $A$, $49$ de $B$, $36$ de $C$ y $44$ de $D$** (total $200$).

**b.1) Distribución de la media muestral.**
1. Si la población es normal, $\bar X\sim N\!\left(\mu,\dfrac{\sigma}{\sqrt n}\right)$:

$\bar X\sim N\!\left(3{,}85,\ \dfrac{1{,}32}{\sqrt{121}}\right)=N(3{,}85,\ 0{,}12)$.

**b.2) Probabilidad del peso medio.**
1. Se tipifica: $P(3{,}6<\bar X<4)=P\!\left(\dfrac{3{,}6-3{,}85}{0{,}12}<Z<\dfrac{4-3{,}85}{0{,}12}\right)=P(-2{,}08<Z<1{,}25)$.
2. Con la tabla, $\Phi(1{,}25)-\Phi(-2{,}08)=\Phi(1{,}25)-(1-\Phi(2{,}08))$:
$$P(3{,}6<\bar X<4)=P(-2{,}08<Z<1{,}25)=0{,}8944-(1-0{,}9812)=\mathbf{0{,}8756}.$$

*Interpretación:* el $87{,}56\,\%$ de las muestras de 121 sandías tienen un peso medio entre $3{,}6$ y $4$ kg.

@@ 8
**a) Intervalo al $98\,\%$ y conclusión.**
1. Suma de los tiempos: $270$, luego $\bar x=\dfrac{270}{10}=27$.
2. Valor crítico: $\Phi(z_{\alpha/2})=0{,}99$ y en la tabla $\Phi(2{,}33)=0{,}9901$, luego $z_{\alpha/2}=2{,}33$.
3. Error máximo: $E=2{,}33\cdot\dfrac{5}{\sqrt{10}}=3{,}684$.
4. Intervalo: $\bar x\pm E$:
$$IC=(27-3{,}684,\ 27+3{,}684)=(23{,}316,\ 30{,}684).$$
5. El valor $35$ **no pertenece al intervalo** y todo el intervalo está por debajo de $35$.

**No puede admitirse que el tiempo medio sea superior a $35$ minutos.**

**b) Probabilidad de que no haga efecto hasta pasados 20 minutos.**
1. $X\sim N(27{,}2,\ 5)$ y se pide $P(X>20)$.
2. Se tipifica: $P(X>20)=P\!\left(Z>\dfrac{20-27{,}2}{5}\right)=P(Z>-1{,}44)$.
3. Por simetría, $P(Z>-1{,}44)=P(Z<1{,}44)$:
$$P(X>20)=P\!\left(Z>\dfrac{20-27{,}2}{5}\right)=P(Z>-1{,}44)=P(Z<1{,}44)=\mathbf{0{,}9251}.$$

*Interpretación:* a más del $92\,\%$ de los pacientes el medicamento no les hace efecto antes de los 20 minutos.
