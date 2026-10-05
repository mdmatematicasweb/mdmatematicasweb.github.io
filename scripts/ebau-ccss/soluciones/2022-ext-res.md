@@ 1
**a) Valores de $a$ con inversa.**
1. $A$ tiene inversa si y solo si $|A|\neq0$.
2. Determinante: $|A|=\left|\begin{matrix}2&-3&-a-1\\-1&a&a+1\\1&-3&-a\end{matrix}\right|=-a(a-4)=-a^2+4a$.
3. Se anula en $a=0$ y $a=4$.

**La matriz tiene inversa si $a\neq0$ y $a\neq4$.**

**b) Potencias para $a=4$.**
1. La matriz es $A=\begin{pmatrix}2&-3&-5\\-1&4&5\\1&-3&-4\end{pmatrix}$.
2. Multiplicando $A\cdot A$ se obtiene
$$A^2=\begin{pmatrix}2&-3&-5\\-1&4&5\\1&-3&-4\end{pmatrix}=A.$$
3. Como $A^2=A$, entonces $A^3=A^2\cdot A=A\cdot A=A$ y, por inducción, $A^n=A$ para todo $n\ge1$. En particular, $A^{2022}=A$.

**$A^2=A^3=A^{2022}=A=\begin{pmatrix}2&-3&-5\\-1&4&5\\1&-3&-4\end{pmatrix}$.**

**c) Matriz $X$ con $XA=I_3$ para $a=3$.**
1. $|A|=-3\cdot(3-4)=3\neq0$: $A$ es invertible.
2. $XA=I_3$ significa que $X$ es la inversa de $A$: $X=A^{-1}$.
3. Se calcula la inversa (adjunta traspuesta dividida entre $|A|=3$):
$$X=\begin{pmatrix}1&1&0\\\frac{1}{3}&-\frac{2}{3}&-\frac{4}{3}\\0&1&1\end{pmatrix}.$$

@@ 2
1. **Incógnitas.** $x$ = trajes e $y$ = vestidos.
2. **Restricciones.**
   - Lino: $x+2y\le70$.
   - Algodón: $3x+2y\le150$.
   - No negatividad: $x\ge0$, $y\ge0$.
3. **Función objetivo.** Beneficio: $B(x,y)=60x+70y$.
4. **Vértices:** $(0,0)$, $(0,35)$, $(40,15)$ (corte de $x+2y=70$ con $3x+2y=150$) y $(50,0)$.
5. **Valor de $B$ en cada vértice:**

| Vértice | $(0,0)$ | $(0,35)$ | $(40,15)$ | $(50,0)$ |
|---|---|---|---|---|
| $B$ | $0$ | $2\,450$ | $3\,450$ | $3\,000$ |

![Región factible del ejercicio 2 (2022-ext-res), con sus vértices: (0, 0), (50, 0), (40, 15), (0, 35)](fig/2022-ext-res-e2.svg){fig-alt="Región factible del ejercicio 2 (2022-ext-res), con sus vértices: (0, 0), (50, 0), (40, 15), (0, 35)" width="75%" fig-align="center"}

6. **Conclusión.** El máximo es $3\,450$, en $(40,15)$: se gastan $40+30=70$ m² de lino y $120+30=150$ m² de algodón (se agotan las dos telas).

**Hay que confeccionar 40 trajes y 15 vestidos, con un beneficio máximo de $3\,450$ €.**

@@ 3
**a) Parámetros $a$ y $b$.**
1. Continuidad en $x=1$: por la izquierda, $a(1+1)^2=4a$; por la derecha, $\dfrac b2+2$. Así $4a=\dfrac b2+2$.
2. Derivabilidad: $f'(x)=2a(x+1)$ si $x<1$ y $f'(x)=bx$ si $x>1$. En $x=1$ deben coincidir: $4a=b$.
3. Se sustituye $b=4a$ en la primera: $4a=2a+2\Rightarrow a=1$ y $b=4$.

**$a=1$ y $b=4$.**

**b) Gráfica y área** (con $a=1$ y $b=2$).
1. En $[-3,1]$: $f(x)=(x+1)^2$, arco de parábola de vértice $(-1,0)$ que pasa por $(-3,4)$, $(0,1)$ y $(1,4)$.
2. En $(1,2]$: $f(x)=x^2+2$, arco de parábola que empieza, «abierto», en $(1,3)$ y llega a $(2,6)$.
3. Hay un salto en $x=1$ (de $4$ a $3$), porque con estos valores $f$ no es continua.

![Gráfica de f con (a, b) = (1, 2): parábola (x+1)² hasta x=1 y x²+2 desde x=1, con salto de 4 a 3; recinto sombreado entre x=−2 y x=1](fig/2022-ext-res-e3.svg){fig-alt="Gráfica de f con (a, b) = (1, 2): parábola (x+1)² hasta x=1 y x²+2 desde x=1, con salto de 4 a 3; recinto sombreado entre x=−2 y x=1" width="75%" fig-align="center"}

4. Entre $x=-2$ y $x=1$ solo interviene el primer trozo y $f\ge0$ (es un cuadrado). Barrow:
$$A=\int_{-2}^{1}(x+1)^2dx=\left[\frac{(x+1)^3}{3}\right]_{-2}^{1}=\frac{8}{3}-\left(-\frac{1}{3}\right)=3.$$

**$A=3\ \text{u}^2$**

@@ 4
**a) Dominio, monotonía y curvatura.**
1. Dominio: el denominador no puede anularse, $\mathbb R\setminus\{-2\}$.
2. Primera derivada: $f'(x)=\dfrac{(x+2)-(x-3)}{(x+2)^2}=\dfrac{5}{(x+2)^2}>0$ en todo el dominio.
3. Monotonía: **$f$ es creciente en $(-\infty,-2)$ y en $(-2,+\infty)$** (sin extremos).
4. Segunda derivada: $f''(x)=-\dfrac{10}{(x+2)^3}$. Es positiva si $x<-2$ y negativa si $x>-2$.
5. Curvatura: **$f$ es convexa en $(-\infty,-2)$ ($f''>0$) y cóncava en $(-2,+\infty)$ ($f''<0$)**.

**b) Asíntotas y cortes.**
1. Vertical: el denominador se anula en $x=-2$ y el numerador vale $-5$ ahí; $\displaystyle\lim_{x\to-2^\pm}f=\mp\infty$, luego **$x=-2$**.
2. Horizontal: $\displaystyle\lim_{x\to\pm\infty}f=1$, luego **$y=1$**.
3. Con $OX$: $f=0\Rightarrow x=3$, punto $(3,0)$.
4. Con $OY$: $f(0)=-\dfrac{3}{2}$, punto $\left(0,-\dfrac{3}{2}\right)$.

**c) Gráfica.**
1. Es una hipérbola con asíntotas $x=-2$ e $y=1$.
2. Rama derecha ($x>-2$): pasa por $\left(0,-\dfrac{3}{2}\right)$ y por $(3,0)$, tiende a $-\infty$ junto a $x=-2$ y a $1$ por debajo cuando $x\to+\infty$.
3. Rama izquierda ($x<-2$): queda por encima de $y=1$ (por ejemplo $f(-3)=6$), baja hacia $1$ cuando $x\to-\infty$ y sube a $+\infty$ junto a $x=-2$.

![Hipérbola f(x)=(x−3)/(x+2) con asíntotas x=−2 e y=1; corta a los ejes en (3,0) y (0,−3/2)](fig/2022-ext-res-e4.svg){fig-alt="Hipérbola f(x)=(x−3)/(x+2) con asíntotas x=−2 e y=1; corta a los ejes en (3,0) y (0,−3/2)" width="75%" fig-align="center"}

@@ 5
1. **Sucesos y datos.** Sea $T$ «admite tarjeta» y $M$ «admite móvil»: $P(T)=0{,}8$, $P(M)=0{,}5$, $P(T^C\cap M^C)=0{,}1$.

**a)** i) Alguno de los dos medios es la unión, complementario de «ninguno».
1. $P(T\cup M)=1-0{,}1=\mathbf{0{,}9}$.

ii) Probabilidad condicionada.
1. Intersección: $P(T\cap M)=0{,}8+0{,}5-0{,}9=0{,}4$.
2. $P(M\mid T)=\dfrac{P(M\cap T)}{P(T)}=\dfrac{0{,}4}{0{,}8}=\mathbf{0{,}5}$.

**b) Independencia.**
1. Son independientes si $P(T\cap M)=P(T)P(M)$.
2. $P(T)\cdot P(M)=0{,}8\cdot0{,}5=0{,}4=P(T\cap M)$: **sí son independientes** (equivalentemente, $P(M\mid T)=P(M)$).

*Interpretación:* admitir tarjeta no cambia la probabilidad de admitir pago con móvil.

@@ 6
**Datos.**
1. Boletos vendidos: $A$: $1054$, $B$: $99$, $C$: $1335-1054-99=182$.
2. Sea $NP$ «no premiado»: $P(NP)=0{,}95$ (el dato del $95\,\%$ se usa como probabilidad exacta).
3. Premiados: $5$ de $B$ y $13$ de $C$. Como no hay datos de premiados de $A$, se obtiene por diferencia.
4. No premiados de $B$ y $C$:
$$P(NP\cap B)=\frac{99-5}{1335}=\frac{94}{1335},\qquad P(NP\cap C)=\frac{182-13}{1335}=\frac{169}{1335}.$$
5. No premiados de $A$ (el total es $0{,}95$):
$$P(NP\cap A)=0{,}95-\frac{94}{1335}-\frac{169}{1335}=\frac{4021}{5340}\approx0{,}753.$$

**a) Establecimiento más probable dado «no premiado».**
1. Se compara $P(\cdot\mid NP)$: $P(B\mid NP)=\dfrac{94/1335}{0{,}95}\approx0{,}0741$ y $P(C\mid NP)=\dfrac{169/1335}{0{,}95}\approx0{,}1333$.
2. Para $A$ sale $0{,}7926$ (apartado b).

La mayor probabilidad es la de $A$: **el establecimiento $A$** ($0{,}7926$ frente a $0{,}1333$ y $0{,}0741$).

**b) Boleto no premiado vendido en $A$.**
1. Probabilidad condicionada:
$$P(A\mid NP)=\dfrac{P(NP\cap A)}{P(NP)}=\dfrac{4021/5340}{0{,}95}=\dfrac{4021}{5073}\approx\mathbf{0{,}7926}.$$

*Interpretación:* casi 8 de cada 10 boletos sin premio salieron de $A$, que es el que más vendió.

@@ 7
**a) Muestreo estratificado con afijación proporcional.**
1. Población total: $60\,000+20\,000+24\,000+16\,000=120\,000$.
2. En afijación proporcional se muestrea la misma fracción de cada estrato. Con el tercero: $\dfrac{144}{24\,000}=0{,}006$.
3. Tamaño total: $0{,}006\cdot120\,000=720$.
4. Composición: $0{,}006\cdot60\,000=360$, $0{,}006\cdot20\,000=120$, $144$ y $0{,}006\cdot16\,000=96$ (suman $720$).

**Muestra total de 720 personas: 360, 120, 144 y 96.**

**b) Muestras de tamaño 2 de $\{1,4,7\}$.**
1. Con reemplazamiento hay $3^2=9$ muestras: $(1,1),(1,4),(1,7),(4,1),(4,4),(4,7),(7,1),(7,4),(7,7)$.
2. Sus medias son $1,\ 2{,}5,\ 4,\ 2{,}5,\ 4,\ 5{,}5,\ 4,\ 5{,}5,\ 7$.
3. Media de las medias: $\mu_{\bar x}=\dfrac{36}{9}=4$ (coincide con la media de la población).
4. Varianza: $\sigma_{\bar x}^2=\dfrac{9+2{,}25+0+2{,}25+0+2{,}25+0+2{,}25+9}{9}=\dfrac{27}{9}=3$.

**Media $4$ y desviación típica $\sqrt3\approx1{,}7321$.**

@@ 8
**Datos.** $\hat p=\dfrac{630}{2100}=0{,}3$, $n=2100$.

**Valor crítico.** Nivel $97{,}5\,\%$: $\Phi(z_{\alpha/2})=0{,}9875$ y en la tabla $\Phi(2{,}24)=0{,}9875$, luego $z_{\alpha/2}=2{,}24$.

**a) Intervalo.**
1. Error máximo: $E=2{,}24\sqrt{\dfrac{0{,}3\cdot0{,}7}{2100}}=2{,}24\cdot0{,}01=0{,}0224$.
2. Intervalo: $\hat p\pm E$:
$$IC=(0{,}3-0{,}0224,\ 0{,}3+0{,}0224)=(0{,}2776,\ 0{,}3224).$$

*Interpretación:* con confianza del $97{,}5\,\%$, entre el $27{,}76\,\%$ y el $32{,}24\,\%$ de los estudiantes proceden de otras provincias.

**b) Tamaño mínimo.**
1. Se impone $E=0{,}01$ (como máximo) y se despeja $n$:
$$E=0{,}01\Rightarrow n\ge\dfrac{2{,}24^2\cdot0{,}3\cdot0{,}7}{0{,}01^2}=10\,536{,}96.$$
2. Se redondea hacia arriba.

**El tamaño mínimo es $n=10\,537$.**
