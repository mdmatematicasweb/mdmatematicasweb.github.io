@@ 1
Sean $x$ las unidades de $A$ e $y$ las de $B$ por hora. Restricciones: $x+y\le10$, $x+y\ge4$, $x\le y+2$ (es decir, $x-y\le2$), $x\ge0$, $y\ge0$. Beneficio: $B(x,y)=60x+25y$.

Vértices: $(0,4)$, $(0,10)$, $(6,4)$ (corte de $x+y=10$ con $x-y=2$) y $(3,1)$ (corte de $x+y=4$ con $x-y=2$).

| Vértice | $(0,4)$ | $(0,10)$ | $(6,4)$ | $(3,1)$ |
|---|---|---|---|---|
| $B$ | $100$ | $250$ | $460$ | $205$ |

![Región factible del ejercicio 1 (2021-ext-sup), con sus vértices: (0, 4), (3, 1), (6, 4), (0, 10)](fig/2021-ext-sup-e1.svg){fig-alt="Región factible del ejercicio 1 (2021-ext-sup), con sus vértices: (0, 4), (3, 1), (6, 4), (0, 10)" width="75%" fig-align="center"}

**Debe fabricar 6 unidades de $A$ y 4 de $B$ por hora, con un beneficio máximo de $460$ €.**

@@ 2
**a)** $|A|=8a-24=0\iff$ **$a=3$.**

**b)** $XA-XB=X(A-B)=C$. Para $a=3$: $A-B=\begin{pmatrix}1&2\\3&5\end{pmatrix}$, con $|A-B|=-1\neq0$ y $(A-B)^{-1}=\begin{pmatrix}-5&2\\3&-1\end{pmatrix}$. Entonces
$$X=C\,(A-B)^{-1}=\begin{pmatrix}1&2\end{pmatrix}\begin{pmatrix}-5&2\\3&-1\end{pmatrix}=\begin{pmatrix}1&0\end{pmatrix}.$$

**c)** Para $a=3$, $A=\begin{pmatrix}3&4\\6&8\end{pmatrix}$ y
$$A^2=\begin{pmatrix}9+24&12+32\\18+48&24+64\end{pmatrix}=\begin{pmatrix}33&44\\66&88\end{pmatrix}=11A.$$
Por tanto $A^3=A^2A=11A^2=11^2A$ y, en general, $A^n=11^{n-1}A$:
$$A^8=11^7A=19\,487\,171\,A.$$

@@ 3
**a)** En $x=0$: $\displaystyle\lim_{x\to0^-}(x+1)^2=1$ y $f(0)=(0-1)^2=1=\lim_{x\to0^+}(x-1)^2$: **continua.** Derivadas: $f'(x)=2(x+1)$ si $-2<x<0$ y $f'(x)=2(x-1)$ si $0<x<2$; $f'(0^-)=2\neq f'(0^+)=-2$.

**$f$ es continua en $[-2,2]$ y derivable en $(-2,2)\setminus\{0\}$** (no derivable en $x=0$).

**b)** $f'=0$ en $x=-1$ y $x=1$ (los vértices de las parábolas). Valores: $f(-2)=1$, $f(-1)=0$, $f(0)=1$, $f(1)=0$, $f(2)=1$.

![Gráfica de f: dos arcos de parábola, (x+1)² en [−2,0) y (x−1)² en [0,2], con forma de W; recinto sombreado entre x=−1 y x=1](fig/2021-ext-sup-e3.svg){fig-alt="Gráfica de f: dos arcos de parábola, (x+1)² en [−2,0) y (x−1)² en [0,2], con forma de W; recinto sombreado entre x=−1 y x=1" width="75%" fig-align="center"}

**Mínimos (absolutos y relativos) $(-1,0)$ y $(1,0)$; máximo relativo $(0,1)$; máximo absoluto $1$, que se alcanza en $x=-2$, $x=0$ y $x=2$.**

**c)** La gráfica son dos arcos de parábola «en forma de W» con mínimos en $(-1,0)$ y $(1,0)$ y pico en $(0,1)$. El recinto entre $x=-1$ y $x=1$ queda sobre el eje $OX$:
$$A=\int_{-1}^{0}(x+1)^2dx+\int_0^1(x-1)^2dx=\left[\frac{(x+1)^3}{3}\right]_{-1}^{0}+\left[\frac{(x-1)^3}{3}\right]_0^1=\frac{1}{3}+\frac{1}{3}=\frac{2}{3}.$$
**$A=\dfrac{2}{3}\ \text{u}^2$**

@@ 4
**a)** La parábola con vértice $(0,8)$ y raíces $\pm4$ es $f'(x)=8-\dfrac{x^2}{2}$ (porque $f'(4)=8-8=0$).

![Gráfica de f′: parábola abierta hacia abajo con vértice (0,8) que corta al eje X en (−4,0) y (4,0); f′>0 entre −4 y 4](fig/2021-ext-sup-e4.svg){fig-alt="Gráfica de f′: parábola abierta hacia abajo con vértice (0,8) que corta al eje X en (−4,0) y (4,0); f′>0 entre −4 y 4" width="75%" fig-align="center"}

1. Gráfica de $f'$: parábola abierta hacia abajo, con máximo $(0,8)$, que corta al eje $OX$ en $(-4,0)$ y $(4,0)$.
2. $f'>0$ en $(-4,4)$ y $f'<0$ en $(-\infty,-4)\cup(4,+\infty)$. **$f$ crece en $(-4,4)$ y decrece en $(-\infty,-4)\cup(4,+\infty)$; mínimo relativo en $x=-4$ y máximo relativo en $x=4$.**
3. $f(0)=0$ y $f'(0)=8$: tangente $y-0=8(x-0)$. **$y=8x$.**

**b)** $g'(x)=2x\,e^{2x-1}+\left(x^2-3\right)\cdot2e^{2x-1}=e^{2x-1}\left(2x^2+2x-6\right).$

@@ 5
Sea $V$ «victoria»: $P(\text{casa})=0{,}4$, $P(\text{fuera})=0{,}6$, $P(V\mid\text{casa})=0{,}6$, $P(V\mid\text{fuera})=0{,}3$.

**a)** $P(V)=0{,}4\cdot0{,}6+0{,}6\cdot0{,}3=0{,}24+0{,}18=\mathbf{0{,}42}$.

**b)** $P(\text{casa}\mid V^C)=\dfrac{0{,}4\cdot0{,}4}{1-0{,}42}=\dfrac{0{,}16}{0{,}58}=\dfrac{8}{29}\approx\mathbf{0{,}2759}$.

**c)** Victoria con prórroga: $0{,}4\cdot0{,}6\cdot0{,}1+0{,}6\cdot0{,}3\cdot0{,}2=0{,}024+0{,}036=\mathbf{0{,}06}$.

@@ 6
**a)** $P(A)=1-0{,}4=\mathbf{0{,}6}$. Como $P(A)=P(A\cap B)+P(A\cap B^C)$, $P(A\cap B)=0{,}6-0{,}12=\mathbf{0{,}48}$.

**b)** Independientes: $P(A\cap B)=P(A)P(B)\Rightarrow P(B)=\dfrac{0{,}48}{0{,}6}=\mathbf{0{,}8}$.

**c)** $P(B)=1-0{,}2=0{,}8$ (coincide con el valor anterior, así que son independientes).

- $P(A\cup B)=0{,}6+0{,}8-0{,}48=\mathbf{0{,}92}$.
- $P(A^C\cup B^C)=1-P(A\cap B)=1-0{,}48=\mathbf{0{,}52}$.
- $P(A\mid B^C)=\dfrac{P(A\cap B^C)}{P(B^C)}=\dfrac{0{,}12}{0{,}2}=\mathbf{0{,}6}$.

@@ 7
**a)** Muestreo aleatorio simple (con reemplazamiento y teniendo en cuenta el orden): $9\cdot9=81$ muestras. La media vale $5$ cuando los dos números suman $10$: $(1,9),(2,8),(3,7),(4,6),(5,5),(6,4),(7,3),(8,2),(9,1)$, es decir, $9$ muestras.

**Hay $81$ muestras y $P(\bar x=5)=\dfrac{9}{81}=\dfrac{1}{9}$.**

**b)** $\hat p=\dfrac{500}{10\,000}=0{,}05$, $n=10\,000$.

1. Nivel $97\,\%$: $z_{\alpha/2}=2{,}17$ (porque $\Phi(2{,}17)=0{,}9850$). $E=2{,}17\sqrt{\dfrac{0{,}05\cdot0{,}95}{10\,000}}=2{,}17\cdot0{,}00218=0{,}0047$.
$$IC=(0{,}05-0{,}0047,\ 0{,}05+0{,}0047)=(0{,}0453,\ 0{,}0547).$$
2. $0{,}06$ **no pertenece** al intervalo ($0{,}06>0{,}0547$): no se puede aceptar, con ese nivel de confianza, que el $6\,\%$ estuviera infectado.
3. Con la misma proporción y mayor $n$, el error $E=z_{\alpha/2}\sqrt{\dfrac{\hat p(1-\hat p)}{n}}$ es menor: **el nuevo intervalo está contenido en el anterior** (mismo centro $0{,}05$, menor amplitud).

@@ 8
$\sigma=\sqrt{81}=9$, $n=16$.

**a)** Suma de los datos: $640$, luego $\bar x=\dfrac{640}{16}=40$. Para el $95\,\%$, $z_{\alpha/2}=1{,}96$ y $E=1{,}96\cdot\dfrac{9}{\sqrt{16}}=4{,}41$.
$$IC=(40-4{,}41,\ 40+4{,}41)=(35{,}59,\ 44{,}41).$$

**b)** Nivel $98\,\%$: $\Phi(z_{\alpha/2})=0{,}99$. En la tabla $\Phi(2{,}32)=0{,}9898$ y $\Phi(2{,}33)=0{,}9901$, luego $z_{\alpha/2}=2{,}33$. Con $E<2$:
$$n>\left(\frac{2{,}33\cdot9}{2}\right)^2=109{,}93.$$
**Hace falta una muestra de al menos $n=110$ alumnos.**
