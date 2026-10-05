@@ 1
1. **Incógnitas.** $x$ = ajedreces e $y$ = dominós fabricados al día.
2. **Restricciones.**
   - Al menos 3 juegos: $x+y\ge3$.
   - Madera, como máximo 7 kg: $2x+y\le7$.
   - Horas de trabajo, como máximo 9: $4x+y\le9$.
   - No negatividad: $x\ge0$, $y\ge0$.
3. **Función objetivo.** Ganancia: $G(x,y)=40x+15y$.
4. **Vértices:** $(0,3)$, $(0,7)$, $(1,5)$ (corte de $2x+y=7$ con $4x+y=9$) y $(2,1)$ (corte de $4x+y=9$ con $x+y=3$).
5. **Valor de $G$ en cada vértice:**

| Vértice | $(0,3)$ | $(0,7)$ | $(1,5)$ | $(2,1)$ |
|---|---|---|---|---|
| $G$ | $45$ | $105$ | $115$ | $95$ |

![Región factible del ejercicio 1 (2022-ord-sup), con sus vértices: (0, 3), (2, 1), (1, 5), (0, 7)](fig/2022-ord-sup-e1.svg){fig-alt="Región factible del ejercicio 1 (2022-ord-sup), con sus vértices: (0, 3), (2, 1), (1, 5), (0, 7)" width="75%" fig-align="center"}

6. **Conclusión.** El máximo es $115$, en $(1,5)$: se emplean $2\cdot1+5=7$ kg de madera y $4\cdot1+5=9$ horas (se agotan los dos recursos).

**Deben fabricarse 1 ajedrez y 5 dominós al día, con una ganancia máxima de $115$ €.**

@@ 2
**a) Ecuación matricial.**
1. Se despeja el término con $X$: $A^t-XA=3I_3\Rightarrow XA=A^t-3I_3$.
2. $|A|=10\neq0$, luego existe $A^{-1}$. Se multiplica por la derecha por $A^{-1}$ (la incógnita está a la izquierda de $A$): $X=\left(A^t-3I_3\right)A^{-1}$.
3. Matrices: $A^t-3I_3=\begin{pmatrix}4&3&-5\\-6&-2&0\\-2&4&-7\end{pmatrix}$ y $A^{-1}=\begin{pmatrix}-\frac{2}{5}&-\frac{12}{5}&-\frac{11}{5}\\-\frac{4}{5}&-\frac{19}{5}&-\frac{17}{5}\\\frac{1}{2}&3&\frac{5}{2}\end{pmatrix}$.
4. Producto:
$$X=\begin{pmatrix}-\frac{13}{2}&-36&-\frac{63}{2}\\4&22&20\\-\frac{59}{10}&-\frac{157}{5}&-\frac{267}{10}\end{pmatrix}.$$

**b) ¿Existe $a$ con $C^tD=B$?**
1. Dimensiones: $C^t$ es $3\times2$ y $D$ es $2\times3$, luego $C^tD$ es $3\times3$, como $B$.
2. Producto:
$$C^tD=\begin{pmatrix}1&-2\\2&-3\\-1&0\end{pmatrix}\begin{pmatrix}a^2&0&-1\\1&-1&a\end{pmatrix}=\begin{pmatrix}a^2-2&2&-1-2a\\2a^2-3&3&-2-3a\\-a^2&0&1\end{pmatrix}.$$
3. Se iguala elemento a elemento con $B$: $a^2-2=2$, $-1-2a=3$, $2a^2-3=5$, $-2-3a=4$ y $-a^2=-4$.
4. Las cinco ecuaciones se cumplen a la vez solo para $a=-2$ (de $-1-2a=3$ sale $a=-2$, y ese valor cumple también las demás).

**Sí existe: $a=-2$.**

@@ 3
**a) Beneficios positivos.**
1. Se factoriza: $B(x)=-(x-4)(x-12)$, que es positivo entre las raíces: $B(x)>0\iff4<x<12$.
2. Se añade la limitación $x\le10$.

**Hay beneficios si fumiga más de 4 y hasta 10 hectáreas** ($4<x\le10$).

**b) Máximo beneficio.**
1. Derivada: $B'(x)=-2x+16=0\Rightarrow x=8$, que está dentro de $[0,10]$.
2. $B''<0$, luego es un máximo.
3. Beneficio: $B(8)=-64+128-48=16$.

**Debe fumigar 8 hectáreas y el beneficio máximo es de 16 mil euros ($16\,000$ €).**

**c) Beneficio de $7\,000$ €.**
1. En miles de euros, $B(x)=7$: $-x^2+16x-48=7\iff x^2-16x+55=0$.
2. Soluciones: $x=5$ o $x=11$.
3. Como $x\le10$, se descarta $x=11$.

**Ha fumigado 5 hectáreas.**

@@ 4
**a) Continuidad y derivabilidad en $x=1$.**
1. Continuidad: $f(1)=a+b+1$ debe coincidir con el límite por la derecha, $\dfrac{2}{1}=2$. Así $a+b=1$.
2. Derivabilidad: $f'(x)=2ax+b$ si $x<1$ y $f'(x)=-\dfrac{2}{x^2}$ si $x>1$. En $x=1$ deben coincidir: $2a+b=-2$.
3. Se restan las dos ecuaciones: $a=-3$ y, entonces, $b=4$.

**$a=-3$ y $b=4$.**

**b) Extremos relativos** (con $a=-3$, $b=4$).
1. Si $x\le1$: $f(x)=-3x^2+4x+1$ y $f'(x)=-6x+4=0\Rightarrow x=\dfrac{2}{3}$.
2. $f''=-6<0$: es un máximo, con $f\left(\dfrac{2}{3}\right)=\dfrac{7}{3}$.
3. Si $x>1$: $f'(x)=-\dfrac{2}{x^2}<0$, siempre decreciente, sin extremos.
4. En $x=1$ la función es derivable con $f'(1)=-2<0$, así que tampoco hay extremo allí.

**Máximo relativo en $\left(\dfrac{2}{3},\dfrac{7}{3}\right)$; no hay mínimos relativos.**

**c) Integral** (con $a=-2$, $b=3$).
1. Se parte en el punto donde cambia la expresión, $x=1$.
2. Se integra cada trozo con Barrow:
$$\int_{-1}^{3}f=\int_{-1}^{1}\left(-2x^2+3x+1\right)dx+\int_1^3\frac2x\,dx=\left[-\frac{2x^3}{3}+\frac{3x^2}{2}+x\right]_{-1}^{1}+\left[2\ln x\right]_1^3=\frac{2}{3}+2\ln3.$$

**$\displaystyle\int_{-1}^{3}f(x)\,dx=\dfrac{2}{3}+2\ln3\approx2{,}864$**

@@ 5
**Casos favorables.** Hay $36$ resultados posibles al lanzar dos dados. Suma $2$: $1$ caso. Suma mayor que $7$ ($8,9,10,11,12$): $5+4+3+2+1=15$ casos.

**a) Gana a la primera.**
1. Casos favorables: $1+15=16$.
2. $P(\text{gana a la primera})=\dfrac{1+15}{36}=\dfrac{16}{36}=\mathbf{\dfrac{4}{9}}$.

**b) Gana en la segunda oportunidad.**
1. Suma mayor que $9$ ($10,11,12$): $3+2+1=6$ casos, probabilidad $\dfrac{6}{36}=\dfrac{1}{6}$.
2. Solo hay segunda tirada si no ganó antes (probabilidad $\dfrac{5}{9}$); los lanzamientos son independientes:
$$P=\frac{5}{9}\cdot\frac{1}{6}=\frac{5}{54}\approx\mathbf{0{,}0926}.$$

**c) Gana el juego.** Son dos casos incompatibles: gana a la primera o gana en la segunda.
1. $P(\text{gana})=\dfrac{4}{9}+\dfrac{5}{54}=\dfrac{24}{54}+\dfrac{5}{54}=\dfrac{29}{54}\approx\mathbf{0{,}5370}$.

*Interpretación:* Juan gana algo más de la mitad de las veces.

@@ 6
1. **Sucesos y datos.** Sea $O$ «tener ordenador» y $T$ «tener tablet»: $P(O)=0{,}6$, $P(T)=0{,}5$, $P(O\cap T)=0{,}2$.

**a)** i) Unión.
1. $P(O\cup T)=0{,}6+0{,}5-0{,}2=\mathbf{0{,}9}$.

ii) Probabilidad condicionada.
1. $P(O^C)=1-0{,}6=0{,}4$ y $P(O^C\cap T^C)=1-P(O\cup T)=1-0{,}9=0{,}1$.
2. $P(T^C\mid O^C)=\dfrac{P(O^C\cap T^C)}{P(O^C)}=\dfrac{1-0{,}9}{0{,}4}=\dfrac{0{,}1}{0{,}4}=\mathbf{0{,}25}$.

iii) Ordenador y no tablet.
1. $P(O\cap T^C)=P(O)-P(O\cap T)=0{,}6-0{,}2=\mathbf{0{,}4}$.

**b) Incompatibilidad e independencia.**
1. Incompatibles si $P(O\cap T)=0$. Aquí $P(O\cap T)=0{,}2\neq0$: **no son incompatibles.**
2. Independientes si $P(O\cap T)=P(O)P(T)$. Aquí $P(O)P(T)=0{,}3\neq0{,}2=P(O\cap T)$: **no son independientes.**

@@ 7
**Datos.** $\hat p=\dfrac{378}{540}=0{,}7$, $n=540$.

**Valor crítico.** Nivel $97\,\%$: $\Phi(z_{\alpha/2})=0{,}985$ y la tabla da $\Phi(2{,}17)=0{,}9850$, luego $z_{\alpha/2}=2{,}17$.

**a) Intervalo.**
1. Error máximo: $E=2{,}17\sqrt{\dfrac{0{,}7\cdot0{,}3}{540}}=2{,}17\cdot0{,}01972=0{,}0428$.
2. Intervalo: $\hat p\pm E$:
$$IC=(0{,}7-0{,}0428,\ 0{,}7+0{,}0428)=(0{,}6572,\ 0{,}7428).$$

*Interpretación:* con confianza del $97\,\%$, entre el $65{,}72\,\%$ y el $74{,}28\,\%$ de los mayores de 45 años tienen presbicia.

**b) Tamaño mínimo.**
1. Se impone $E\le0{,}03$ y se despeja $n$:
$$E\le0{,}03\iff n\ge\dfrac{2{,}17^2\cdot0{,}7\cdot0{,}3}{0{,}03^2}=1\,098{,}74.$$
2. Se redondea hacia arriba.

**Hay que seleccionar al menos $n=1\,099$ personas.**

@@ 8
**Datos.** $\sigma=\sqrt{121}=11$ g y $n=10$. Suma de los datos: $9\,915$, luego $\bar x=\dfrac{9\,915}{10}=991{,}5$.

**a) Intervalo al $97\,\%$.**
1. Valor crítico: $z_{\alpha/2}=2{,}17$.
2. Error máximo: $E=2{,}17\cdot\dfrac{11}{\sqrt{10}}=7{,}548$.
3. Intervalo:
$$IC=(991{,}5-7{,}548,\ 991{,}5+7{,}548)=(983{,}95,\ 999{,}05).$$

*Interpretación:* con confianza del $97\,\%$, el peso medio de las tortugas está entre $983{,}95$ y $999{,}05$ g.

**b) Tamaño mínimo al $94\,\%$.**
1. Valor crítico: $\Phi(z_{\alpha/2})=0{,}97$ y la tabla da $\Phi(1{,}88)=0{,}9699$, el valor más cercano, así que $z_{\alpha/2}=1{,}88$.
2. Se impone $E\le5$ y se despeja $n$:
$$n\ge\left(\frac{1{,}88\cdot11}{5}\right)^2=17{,}11.$$
3. Se redondea hacia arriba.

**Hace falta una muestra de al menos $n=18$ tortugas.**
