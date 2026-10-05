@@ 1
**a) Valores de $a$ y $b$.**
1. Continuidad en $x=0$: por la izquierda $f(0)=\dfrac{0+1}{0-1}=-1$ y por la derecha $\displaystyle\lim_{x\to0^+}f=\dfrac{b}{1}=b$. Igualando, $b=-1$.
2. Derivada de la rama $x>0$ (cociente): $f'(x)=\dfrac{a(x+1)^2-(ax+b)\cdot2(x+1)}{(x+1)^4}=\dfrac{-ax+a-2b}{(x+1)^3}$.
3. Extremo relativo en $x=2$ (dentro de la rama derecha, donde $f$ es derivable) exige $f'(2)=0$: $\dfrac{-2a+a-2b}{27}=0\Rightarrow -a-2b=0\Rightarrow a=-2b$.
4. Con $b=-1$: $a=2$.

**$a=2$, $b=-1$.**

**b) Derivabilidad** (con $a=2$, $b=-1$).
1. Fuera de $x=0$, cada trozo es una función racional con denominador no nulo, luego es derivable. Solo hay que estudiar $x=0$ (la función es continua ahí).
2. Para $x<0$: $f'(x)=\dfrac{2x(x-1)-(x^2+1)}{(x-1)^2}=\dfrac{x^2-2x-1}{(x-1)^2}$, y $f'(0^-)=\dfrac{-1}{1}=-1$.
3. Para $x>0$: $f'(x)=\dfrac{-2x+4}{(x+1)^3}$ y $f'(0^+)=4$.
4. Las derivadas laterales en $0$ no coinciden ($-1\neq4$): la gráfica tiene un punto anguloso.

**$f$ es derivable en $\mathbb{R}\setminus\{0\}$ y no lo es en $x=0$.**

@@ 2
**Planteamiento.**
1. El área del rectángulo central es $ab=\dfrac{200}{\pi}$, de donde $a=\dfrac{200}{\pi b}$.
2. Tramos rectos: los dos lados de longitud $a$, a $10$ €/m: coste $2a\cdot10=20a$.
3. Tramos circulares: dos semicírculos de diámetro $b$, que juntos forman una circunferencia de longitud $\pi b$, a $20$ €/m: coste $20\pi b$.
4. Coste total, en función de $b$ (se sustituye $a$):
$$C(b)=20a+20\pi b=\frac{4000}{\pi b}+20\pi b,\qquad b>0.$$

**Mínimo.**
5. Derivada: $C'(b)=-\dfrac{4000}{\pi b^2}+20\pi=0\Rightarrow b^2=\dfrac{200}{\pi^2}\Rightarrow b=\dfrac{10\sqrt2}{\pi}$.
6. $C''(b)=\dfrac{8000}{\pi b^3}>0$ para $b>0$: es un **mínimo**.
7. Se calcula $a$: $a=\dfrac{200}{\pi b}=\dfrac{200}{10\sqrt2}=10\sqrt2$.

**$b=\dfrac{10\sqrt2}{\pi}\approx4{,}5$ m y $a=10\sqrt2\approx14{,}1$ m.**

@@ 3
1. Es una integral de un producto de exponencial por seno: se integra **por partes** dos veces y se despeja la integral (reaparece en el segundo miembro). El resultado es
$$\int e^x\operatorname{sen}(2x)\,dx=\frac{e^x(\operatorname{sen}2x-2\cos2x)}{5}+C.$$
2. Comprobación: derivando, $\dfrac{e^x(\operatorname{sen}2x-2\cos2x)+e^x(2\cos2x+4\operatorname{sen}2x)}{5}=e^x\operatorname{sen}2x$ ✓.
3. La primitiva debe pasar por $(0,0)$, es decir, $F(0)=0$: $F(0)=\dfrac{e^0(0-2)}{5}+C=\tfrac{-2}{5}+C=0$, de donde $C=\tfrac25$.

**$F(x)=\dfrac{e^x\left(\operatorname{sen}(2x)-2\cos(2x)\right)}{5}+\dfrac25$.**

@@ 4
**a) Puntos de corte y recinto.**
1. Se igualan las funciones: $1-x^2=2x^2\Rightarrow3x^2=1\Rightarrow x^2=\tfrac13$, es decir, $x=\pm\tfrac{\sqrt3}{3}$.
2. Se sustituye en $g$: $g\left(\pm\tfrac{\sqrt3}{3}\right)=2\cdot\tfrac13=\tfrac23$.

![Recinto entre f(x)=1−x² y g(x)=2x², con cortes en x=±1/√3](fig/2022-ord-res-e4.svg){fig-alt="Recinto entre f(x)=1−x² y g(x)=2x², con cortes en x=±1/√3" width="75%" fig-align="center"}

**Puntos de corte: $\left(\pm\tfrac{\sqrt3}{3},\tfrac23\right)$.**

3. El recinto está entre la parábola $f$ (hacia abajo, vértice $(0,1)$) y la parábola $g$ (hacia arriba, vértice $(0,0)$). Por ejemplo, en $x=0$ se tiene $f(0)=1>g(0)=0$: $f\ge g$ para $|x|\le\tfrac{\sqrt3}{3}$.

**b) Área.**
1. Se integra la diferencia $f-g=1-3x^2$ entre los puntos de corte. Como es par, el área es el doble de la de $[0,\tfrac{\sqrt3}{3}]$:
$$A=\int_{-\sqrt3/3}^{\sqrt3/3}(1-3x^2)\,dx=2\left[x-x^3\right]_0^{\sqrt3/3}=2\left(\tfrac{\sqrt3}{3}-\tfrac{\sqrt3}{9}\right).$$

**$A=\dfrac{4\sqrt3}{9}$ u$^2$.**

@@ 5
**a) Inversa.**
1. Determinante: $|A|=2\neq0$, luego existe $A^{-1}$.
2. Se calcula la matriz de adjuntos, se traspone y se divide entre $|A|=2$:
$$A^{-1}=\begin{pmatrix}0&\tfrac12&\tfrac12\\1&-1&0\\-1&\tfrac32&-\tfrac12\end{pmatrix}.$$

**b) Ecuación matricial.**
1. Se desarrolla el cuadrado, cuidando el orden (el producto no es conmutativo): $(A-X)^2=A^2-AX-XA+X^2$.
2. La ecuación $AX+A^2-AX-XA+X^2=X^2+I$ queda, tras cancelar $AX$ y $X^2$: $A^2-XA=I$.
3. Se despeja: $XA=A^2-I$. Se multiplica por la derecha por $A^{-1}$ (la incógnita está a la izquierda de $A$): $X=A^2A^{-1}-A^{-1}=A-A^{-1}$.
4. Se calcula:

**$X=A-A^{-1}=\begin{pmatrix}1&\tfrac32&\tfrac12\\0&2&1\\2&-\tfrac52&-\tfrac12\end{pmatrix}$.**

@@ 6
**Planteamiento.**
1. Sean $x$, $y$, $z$ los minutos dedicados a las fases I, II y III. Total: $8\text{ h}=480$ min; fase NO-REM (las tres fases): $0{,}75\cdot480=360$ min.
2. Condiciones: la suma es $360$; la fase II es el doble que las fases I y III juntas; la fase III es el cuádruple que la I:
$$\begin{cases}x+y+z=360\\ y=2(x+z)\\ z=4x\end{cases}$$

**Resolución.**
3. Se sustituye la segunda en la primera: $(x+z)+2(x+z)=360\Rightarrow3(x+z)=360\Rightarrow x+z=120$, y así $y=240$.
4. Con $z=4x$: $x+4x=120\Rightarrow5x=120\Rightarrow x=24$ y $z=96$.
5. Comprobación: $24+240+96=360$ ✓.

**Fase I: 24 min; Fase II: 240 min; Fase III: 96 min.**

@@ 7
**Datos.**
1. $r$ es el eje $Y$: punto $O(0,0,0)$ y dirección $(0,1,0)$.
2. $s$: de $x+y=1$ y $x-y=1$ resulta $x=1$, $y=0$, con $z$ libre: punto $(1,0,0)$ y dirección $(0,0,1)$.

**a) Plano que contiene a $r$ y es paralelo a $s$.**
1. El plano contiene la dirección $(0,1,0)$ de $r$ y es paralelo a la dirección $(0,0,1)$ de $s$: esos son sus dos vectores directores.
2. Normal: $(0,1,0)\times(0,0,1)=(1,0,0)$.
3. Pasa por $O$ (por contener a $r$): $x=0$.

**Plano $x=0$.**

**b) Plano que contiene a $r$ y es perpendicular a $s$.**
1. El plano es perpendicular a $s$ si su normal es la dirección de $s$: $\vec n=(0,0,1)$.
2. Contiene a $r$ y por tanto pasa por $O$: $0\cdot x+0\cdot y+1\cdot z=0$.
3. Comprobación: la dirección de $r$, $(0,1,0)$, cumple $\vec n\cdot(0,1,0)=0$, luego $r$ está contenida en el plano.

**Plano $z=0$.**

@@ 8
**a) Puntos de $r$ equidistantes.**
1. Se pasa $r$ a paramétricas. De $y=1$ y $2x+z=1$, con $x=t$: $(t,\,1,\,1-2t)$.
2. Distancia de un punto de $r$ a $\pi_1$: $d(P,\pi_1)=\dfrac{|t+1+2|}{\sqrt{2}}=\dfrac{|t+3|}{\sqrt2}$.
3. Distancia a $\pi_2$: $d(P,\pi_2)=\dfrac{|t-(1-2t)-1|}{\sqrt{2}}=\dfrac{|3t-2|}{\sqrt2}$.
4. Se igualan: $|t+3|=|3t-2|$, es decir, $t+3=\pm(3t-2)$.
5. Si $t+3=3t-2$: $t=\tfrac52$. Si $t+3=-(3t-2)$: $4t=-1$, $t=-\tfrac14$.
6. Se sustituye cada $t$ en $(t,1,1-2t)$.

**Puntos: $\left(\tfrac52,1,-4\right)$ y $\left(-\tfrac14,1,\tfrac32\right)$.**

**b) Ángulo entre los planos.**
1. Normales: $\vec n_1=(1,1,0)$ y $\vec n_2=(1,0,-1)$.
2. El ángulo entre planos es el de sus normales:
$$\cos\varphi=\frac{|\vec n_1\cdot\vec n_2|}{|\vec n_1||\vec n_2|}=\frac{|(1,1,0)\cdot(1,0,-1)|}{\sqrt2\sqrt2}=\frac12.$$

**$\varphi=60^\circ$ ($\pi/3$ rad).**
