@@ 1
1. **Incógnitas.** $x$ = kg de orégano e $y$ = kg de pimienta por semana.
2. **Horas disponibles.** Horno: $24\cdot5=120$ h. Envasado: $4\cdot40=160$ h.
3. **Restricciones.**
   - Secado: $2x+y\le120$.
   - Envasado: $2x+5y\le160$.
   - Producción mínima: $x+y\ge35$.
   - No negatividad: $x\ge0$, $y\ge0$.
4. **Función objetivo.** Beneficio por kg (precio − coste): orégano $50-5=45$ €, pimienta $70-7=63$ €. Así $B(x,y)=45x+63y$.
5. **Vértices:** $(5,30)$ (corte de $x+y=35$ con $2x+5y=160$), $(35,0)$ (corte de $x+y=35$ con $y=0$), $(60,0)$ (corte de $2x+y=120$ con $y=0$) y $(55,10)$ (corte de $2x+y=120$ con $2x+5y=160$).
6. **Valor de $B$ en cada vértice:**

| Vértice | $(5,30)$ | $(35,0)$ | $(60,0)$ | $(55,10)$ |
|---|---|---|---|---|
| $B$ | $2\,115$ | $1\,575$ | $2\,700$ | $3\,105$ |

![Región factible del ejercicio 1 (2026-ext-sup1), con sus vértices: (35, 0), (60, 0), (55, 10), (5, 30)](fig/2026-ext-sup1-e1.svg){fig-alt="Región factible del ejercicio 1 (2026-ext-sup1), con sus vértices: (35, 0), (60, 0), (55, 10), (5, 30)" width="75%" fig-align="center"}

7. **Conclusión.** El máximo es $3\,105$, en $(55,10)$: se agotan las horas de secado ($110+10=120$) y las de envasado ($110+50=160$).

**Deben producirse 55 kg de orégano y 10 kg de pimienta a la semana, con un beneficio máximo de $3\,105$ €.**

@@ 2A
**a) Parámetros $a$ y $b$.**
1. Continuidad en $x=0$: por la izquierda, $f(0)=\dfrac{-a}{-1}=a$; por la derecha, $\displaystyle\lim_{x\to0^+}f=3$. Así $a=3$.
2. Derivada por la izquierda: para $x<0$, $f'(x)=\dfrac{(x-1)-(x-a)}{(x-1)^2}=\dfrac{a-1}{(x-1)^2}$, con $f'(0^-)=a-1=2$.
3. Derivada por la derecha: para $x>0$, $f'(x)=2x+b$, con $f'(0^+)=b$.
4. Derivabilidad: deben coincidir, $b=2$.

**$a=3$ y $b=2$.**

**b) Estudio de $g(x)=\dfrac{x-3}{x-1}$.**
1. **Asíntota vertical:** $x=1$, porque $\displaystyle\lim_{x\to1^\pm}g=\dfrac{-2}{0^\pm}=\mp\infty$.
2. **Asíntota horizontal:** $y=\displaystyle\lim_{x\to\pm\infty}\dfrac{x-3}{x-1}=1$.
3. **Cortes con los ejes:** con $OX$, $x=3$, punto $(3,0)$; con $OY$, $g(0)=3$, punto $(0,3)$.
4. **Monotonía:** $g'(x)=\dfrac{(x-1)-(x-3)}{(x-1)^2}=\dfrac{2}{(x-1)^2}>0$: **$g$ es creciente en $(-\infty,1)$ y en $(1,+\infty)$** (sin extremos).
5. **Gráfica:** hipérbola con asíntotas $x=1$ e $y=1$.
   - Rama izquierda ($x<1$): pasa por $(0,3)$, sube a $+\infty$ junto a $x=1$ y baja hacia $1$ por encima cuando $x\to-\infty$.
   - Rama derecha ($x>1$): viene de $-\infty$ junto a $x=1$, pasa por $(3,0)$ y se acerca a $1$ por debajo cuando $x\to+\infty$.

![Hipérbola creciente g(x)=(x−3)/(x−1) con asíntota vertical en la abscisa 1 y horizontal en la ordenada 1; corta a los ejes en (3,0) y (0,3)](fig/2026-ext-sup1-e2a.svg){fig-alt="Hipérbola creciente g(x)=(x−3)/(x−1) con asíntota vertical en la abscisa 1 y horizontal en la ordenada 1; corta a los ejes en (3,0) y (0,3)" width="75%" fig-align="center"}

**c) Área.**
1. Se factoriza: $h(x)=(x-3)(x+2)$ corta al eje $OX$ en $x=-2$ y $x=3$.
2. Es una parábola abierta hacia arriba: $h\le0$ entre las raíces, así que el área es el valor absoluto de la integral.
3. Barrow:
$$A=\left|\int_{-2}^{3}\left(x^2-x-6\right)dx\right|=\left|\left[\frac{x^3}{3}-\frac{x^2}{2}-6x\right]_{-2}^{3}\right|=\left|-\frac{27}{2}-\frac{22}{3}\right|=\frac{125}{6}.$$

**$A=\dfrac{125}{6}\ \text{u}^2$**

@@ 2B
**a) Continuidad en $x=3$.**
1. Por la izquierda: $\displaystyle\lim_{x\to3^-}\left(x^3-3x+2\right)=27-9+2=20$.
2. Por la derecha: $\displaystyle\lim_{x\to3^+}\dfrac{10}{a-x}=\dfrac{10}{a-3}$.
3. Se igualan: $\dfrac{10}{a-3}=20\Rightarrow a-3=\dfrac{1}{2}$.

**$a=\dfrac{7}{2}$.**

**b) Estudio para $a=4$:** $f(x)=x^3-3x+2$ si $0<x\le3$ y $f(x)=\dfrac{10}{4-x}$ si $x>3$.

**i) Asíntotas.**
1. Vertical: $x=4$ (en el tramo $x>3$), con $\displaystyle\lim_{x\to4^-}f=+\infty$ y $\displaystyle\lim_{x\to4^+}f=-\infty$.
2. Horizontal: $\displaystyle\lim_{x\to+\infty}\dfrac{10}{4-x}=0$, es decir, $y=0$.

**Asíntotas: $x=4$ e $y=0$.**

**ii) Derivabilidad y monotonía.**
1. En $x=3$: $\displaystyle\lim_{x\to3^+}f=\dfrac{10}{1}=10\neq f(3)=20$. **No es continua en $x=3$** (salto) y, por tanto, no es derivable allí.
2. En $x=4$ no está definida.
3. Es derivable en $(0,3)\cup(3,4)\cup(4,+\infty)$.
4. Monotonía en $(0,3)$: $f'(x)=3x^2-3=3(x-1)(x+1)$, con $f'<0$ en $(0,1)$ y $f'>0$ en $(1,3)$.
5. Monotonía en $x>3$: $f'(x)=\dfrac{10}{(4-x)^2}>0$.

**$f$ decrece en $(0,1)$ y crece en $(1,3)$, en $(3,4)$ y en $(4,+\infty)$. Mínimo relativo en $(1,0)$; máximo relativo en $(3,20)$** (porque a su derecha la función toma valores cercanos a $10<20$).

@@ 3
**a) Los dos a la vez.**
1. $P(A\cap B)=P(A)-P(A\cap B^C)=0{,}5-0{,}35=\mathbf{0{,}15}$.

**b) $B$ sabiendo que $A$ no ha ocurrido.**
1. $P\left(A^C\right)=0{,}5$.
2. $P\left(A^C\cap B\right)=P\left(A^C\right)-P\left(A^C\cap B^C\right)=0{,}5-0{,}35=0{,}15$.
3. Probabilidad condicionada:
$$P\left(B\mid A^C\right)=\frac{0{,}15}{0{,}5}=\mathbf{0{,}3}.$$

**c) Uno y solo uno.**
1. Son dos casos incompatibles, que se suman:
$$P(\text{uno y solo uno})=P\left(A\cap B^C\right)+P\left(A^C\cap B\right)=0{,}35+0{,}15=\mathbf{0{,}5}.$$

**d) Dependencia e incompatibilidad.**
1. $P(B)=P(A\cap B)+P\left(A^C\cap B\right)=0{,}15+0{,}15=0{,}3$.
2. $P(A)P(B)=0{,}5\cdot0{,}3=0{,}15=P(A\cap B)$: **son independientes (no dependientes).**
3. $P(A\cap B)=0{,}15\neq0$: **no son incompatibles.**

@@ 4A
**a) Torneo.** Paco juega $9$ partidos (uno contra cada uno de los otros $9$ jugadores). $X$ = «partidos ganados»: $X\sim B(9;\ 0{,}8)$.

**i) Exactamente $8$.**
1. $P(X=8)=\dbinom98\,0{,}8^8\cdot0{,}2=9\cdot0{,}8^8\cdot0{,}2\approx\mathbf{0{,}3020}$.

**ii) Como mucho $8$.**
1. Se pasa al suceso contrario: $P(X\le8)=1-P(X=9)=1-0{,}8^9\approx\mathbf{0{,}8658}$.

**b) Partidos perdidos en un año.**
1. $Y$ = «partidos perdidos» de $80$: $Y\sim B(80;\ 0{,}2)$.
2. Comprobación: $np=16\ge5$ y $nq=64\ge5$, se aproxima por $Y'\sim N\!\left(16,\ \sqrt{80\cdot0{,}2\cdot0{,}8}\right)=N(16,\ 3{,}5777)$.
3. «Más de $10$ pero menos de $20$» son $11,\dots,19$: con corrección por continuidad, $10{,}5<Y'<19{,}5$.
4. Se tipifica y se lee en la tabla ($\Phi(0{,}98)=0{,}8365$ y $\Phi(1{,}54)=0{,}9382$):
$$P=P\!\left(\frac{10{,}5-16}{3{,}5777}<Z<\frac{19{,}5-16}{3{,}5777}\right)=P(-1{,}54<Z<0{,}98)=0{,}8365-(1-0{,}9382)=\mathbf{0{,}7747}.$$

@@ 4B
**Datos.** $\hat p=\dfrac{106}{400}=0{,}265$, $n=400$.

**a) Intervalo al $98{,}5\,\%$.**
1. Valor crítico: $z_{\alpha/2}=2{,}43$ (pues $\Phi(2{,}43)=0{,}9925$).
2. Error máximo: $E=2{,}43\sqrt{\dfrac{0{,}265\cdot0{,}735}{400}}=2{,}43\cdot0{,}02207=0{,}0536$.
3. Intervalo: $\hat p\pm E$:
$$IC=(0{,}265-0{,}0536,\ 0{,}265+0{,}0536)=(0{,}2114,\ 0{,}3186).$$

**b) ¿Puede ser el $4\,\%$?**
1. Se mira si $0{,}04$ está en el intervalo: queda muy por debajo de $0{,}2114$.

El valor $0{,}04$ **no pertenece al intervalo**: **no se puede admitir** que el $4\,\%$ de los andaluces practique natación como hábito deportivo.

**c) Tamaño mínimo al $97\,\%$.**
1. Valor crítico: $z_{\alpha/2}=2{,}17$ (tabla: $\Phi(2{,}17)=0{,}9850$).
2. Se impone $E\le0{,}03$ y se despeja $n$:
$$E\le0{,}03\iff n\ge\dfrac{2{,}17^2\cdot0{,}265\cdot0{,}735}{0{,}03^2}=1\,019{,}08.$$
3. Se redondea hacia arriba.

**Tendrían que formar parte de la muestra al menos $n=1\,020$ personas.**
