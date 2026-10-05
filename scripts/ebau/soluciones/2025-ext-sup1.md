@@ 1
**Planteamiento.** El grado del numerador es mayor que el del denominador: primero se divide y después se integra.
1. División: $x^3+1=x(x^2+1)-x+1$, luego
$$\frac{x^3+1}{x^2+1}=x-\frac{x-1}{x^2+1}=x-\frac{x}{x^2+1}+\frac{1}{x^2+1}.$$
2. Primitivas (inmediatas: potencia, logaritmo y arcotangente):
$$F(x)=\int f=\frac{x^2}{2}-\frac12\ln(x^2+1)+\operatorname{arctg}x+C.$$
3. Condición $F(0)=5$: $F(0)=0-0+0+C=C=5$.

**$F(x)=\dfrac{x^2}{2}-\dfrac12\ln(x^2+1)+\operatorname{arctg}x+5$.**

@@ 2
**a) Continuidad y derivabilidad.**
1. Se quita el valor absoluto: para $x\ge0$, $f(x)=\dfrac{1}{(1-x)^2}$ y, para $x<0$, $f(x)=\dfrac{1}{(1+x)^2}$.
2. Cada rama es continua en su intervalo (el denominador no se anula en $(-1,1)$). En $x=0$, ambos límites laterales valen $1=f(0)$.

**$f$ es continua en $(-1,1)$.**

3. Derivadas: $f'(x)=\dfrac{2}{(1-x)^3}$ si $x>0$ y $f'(x)=-\dfrac{2}{(1+x)^3}$ si $x<0$.
4. En $x=0$: $f'(0^+)=2\neq-2=f'(0^-)$.

**$f$ es derivable en $(-1,1)\setminus\{0\}$ y no lo es en $x=0$.**

**b) Extremos absolutos.**
1. Signo de $f'$: negativo en $(-1,0)$ y positivo en $(0,1)$.
2. Decrece hasta $x=0$ y crece después: mínimo en $x=0$, con $f(0)=1$.
3. Cuando $x\to\pm1$, el denominador tiende a $0$ y $f(x)\to+\infty$.

**Mínimo absoluto en $x=0$, de valor $f(0)=1$.** No hay máximo absoluto porque $f(x)\to+\infty$ cuando $x\to\pm1$.

@@ 3
**a) Valor de $a$.**
1. Por las propiedades del logaritmo, $f(x)=2\ln|x|-1$, luego $f'(x)=\dfrac2x$.
2. Pendiente de la normal a $f$ en $x=a$: $-\dfrac{1}{f'(a)}=-\dfrac{a}{2}$.
3. Pendiente de la tangente a $g$ en $x=a$: $g'(a)=3a^2$.
4. Rectas paralelas tienen la misma pendiente:
$$-\frac a2=3a^2\;\Rightarrow\;a(6a+1)=0\;\Rightarrow\;\textbf{a}=-\dfrac16\ (a\neq0).$$

**$a=-\dfrac16$**, que está en el dominio $(-1,0)\cup(0,1)$.

**b) Monotonía de $f$.**
1. $f'(x)=\dfrac2x$ es negativa en $(-1,0)$ y positiva en $(0,1)$.

**$f$ decrece en $(-1,0)$ y crece en $(0,1)$.**

@@ 4
**a) Potencias de $A$.**
1. $A^2=\begin{pmatrix}-1&0\\0&-1\end{pmatrix}=-I$.
2. Entonces $A^4=(A^2)^2=I$.
3. $31=4\cdot7+3$, así que $A^{31}=(A^4)^7A^3=A^3=A^2\cdot A=-A$.

$$\textbf{A}^{4}=I,\qquad \textbf{A}^{31}=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.$$

**b) Determinante.**
1. Para una matriz $2\times2$, $|4M|=4^2|M|$.
2. $|A|=1$ y $|A^t|=|A|=1$.
3. Por las propiedades del determinante:
$$|4A^{25}(A^t)^4|=16\,|A|^{25}|A|^4=16\cdot1\cdot1=\mathbf{16}.$$

@@ 5
**a) Determinante de $X$.**
1. Se toman determinantes en $X^3AX^2=B^2$: $|X|^3\,|A|\,|X|^2=|B|^2$.
2. $|A|=8-6=2$ y $|B|=6-2=4$.
3. Entonces $2|X|^5=16$, luego $|X|^5=8$.

**$|X|=\sqrt[5]{8}=2^{3/5}$.**

**b) Matriz $Y$.**
1. $|A|=2\neq0$ y $|B|=4\neq0$, así que $A$ y $B$ son invertibles y la matriz $Y$ existe.
2. Se multiplica por $A^{-3}$ por la izquierda y por $B$ por la derecha: $Y=A^{-3}A^{2}B=A^{-1}B$.
3. $A^{-1}=\begin{pmatrix}2&-1\\-3/2&1\end{pmatrix}$.
4. Producto:

$$\mathbf{Y}=\begin{pmatrix}2&-1\\-3/2&1\end{pmatrix}\begin{pmatrix}3&1\\2&2\end{pmatrix}=\begin{pmatrix}4&0\\-5/2&1/2\end{pmatrix}.$$

@@ 6
**Datos.** Se pasa $r$ a paramétricas: de $y=z$ y $x=-2y$, la recta pasa por $O(0,0,0)$ con $\vec d=(-2,1,1)$.

**a) Distancia de $P$ a $r$.**
1. $\overrightarrow{OP}=(2,1,0)$ y $\overrightarrow{OP}\times\vec d=(1,-2,4)$.
2. Fórmula de la distancia punto-recta:
$$d(P,r)=\frac{|\overrightarrow{OP}\times\vec d|}{|\vec d|}=\frac{\sqrt{21}}{\sqrt6}=\mathbf{\frac{\sqrt{14}}{2}}\approx1{,}87.$$

**b) Plano que contiene a $r$ y a $P$.**
1. El plano pasa por $O$ y contiene a $\vec d$ y a $\overrightarrow{OP}$.
2. Su normal es $\overrightarrow{OP}\times\vec d=(1,-2,4)$.
3. Como pasa por el origen, no hay término independiente.

**$x-2y+4z=0$.**

(Comprobación: la normal es perpendicular a $\vec d$: $-2-2+4=0$.)

@@ 7
**Sucesos y datos.** $A$, $B$ y $C$ son las provincias y $D$ es «defectuoso»: $P(A)=0{,}2$, $P(B)=0{,}5$, $P(C)=0{,}3$ y $P(D|A)=0{,}07$, $P(D|B)=0{,}06$, $P(D|C)=0{,}02$.

**a) Probabilidad total de defectuoso.**
1. $P(D)=0{,}2\cdot0{,}07+0{,}5\cdot0{,}06+0{,}3\cdot0{,}02=0{,}014+0{,}03+0{,}006=\mathbf{0{,}05}$.

**b) Teorema de Bayes.**
1. $P(\overline D)=1-0{,}05=0{,}95$ y $P(\overline D|A)=1-0{,}07=0{,}93$.
2. $P(A|\overline D)=\dfrac{0{,}2\cdot0{,}93}{1-0{,}05}=\dfrac{0{,}186}{0{,}95}=\mathbf{0{,}1958}$ (aprox. $19{,}6\,\%$).

*Interpretación:* de los bolígrafos buenos, el $19{,}6\,\%$ viene de Almería: algo menos que su $20\,\%$ de la producción, porque Almería es la provincia con mayor tasa de defectos.
