@@ 1A
**a)** $|A|=\left|\begin{matrix}m&0&1\\0&1&0\\2&0&m+1\end{matrix}\right|=m(m+1)-2=m^2+m-2=(m-1)(m+2)$. El rango es $3$ si $|A|\neq0$: **$m\neq1$ y $m\neq-2$.**

**b)** $A$ no tiene inversa si $|A|=0$: **$m=1$ o $m=-2$.**

**c)** Para $m=2$: $A=\begin{pmatrix}2&0&1\\0&1&0\\2&0&3\end{pmatrix}$, $|A|=4$ y $A^{-1}=\begin{pmatrix}\frac{3}{4}&0&-\frac{1}{4}\\0&1&0\\-\frac{1}{2}&0&\frac{1}{2}\end{pmatrix}$. De $XA=C$: $X=CA^{-1}$:
$$X=\begin{pmatrix}1&0&2\\0&1&3\end{pmatrix}\begin{pmatrix}\frac{3}{4}&0&-\frac{1}{4}\\0&1&0\\-\frac{1}{2}&0&\frac{1}{2}\end{pmatrix}=\begin{pmatrix}-\frac{1}{4}&0&\frac{3}{4}\\-\frac{3}{2}&1&\frac{3}{2}\end{pmatrix}.$$

**d)** Para $m=1$: $A=\begin{pmatrix}1&0&1\\0&1&0\\2&0&2\end{pmatrix}$, con $|A|=0$ y rango $2$. La matriz ampliada $\left(A\mid B\right)$ también tiene rango $2$ (la tercera ecuación, $2y_1+2y_3=6$, es el doble de la primera, $y_1+y_3=3$). Como $\operatorname{rango}A=\operatorname{rango}(A\mid B)=2<3$ incógnitas: **sistema compatible indeterminado** (infinitas soluciones, $y_2=2$ e $y_1+y_3=3$).

@@ 1B
**a)** Rectas frontera: $4x+2y=5$, $2x+5y=9$, $x+y=3$ e $y=0$. Los vértices de la región factible son
$$\left(\tfrac{7}{16},\tfrac{13}{8}\right),\quad\left(\tfrac{5}{4},0\right),\quad(3,0),\quad(2,1),$$
con $\left(\tfrac{7}{16},\tfrac{13}{8}\right)$ el corte de $4x+2y=5$ con $2x+5y=9$, $\left(\tfrac{5}{4},0\right)$ el de $4x+2y=5$ con $y=0$, $(3,0)$ el de $x+y=3$ con $y=0$ y $(2,1)$ el de $x+y=3$ con $2x+5y=9$.

![Región factible del ejercicio 1B (2026-ord-sup2), con sus vértices: (1,25, 0), (3, 0), (2, 1), (0,44, 1,62)](fig/2026-ord-sup2-e1b.svg){fig-alt="Región factible del ejercicio 1B (2026-ord-sup2), con sus vértices: (1,25, 0), (3, 0), (2, 1), (0,44, 1,62)" width="75%" fig-align="center"}

**b)** Con $x=1$: $4+2y\ge5\Rightarrow y\ge\dfrac{1}{2}$; $2+5y\le9\Rightarrow y\le\dfrac{7}{5}$; $1+y\le3\Rightarrow y\le2$. Por ejemplo, **$(1,1)$** pertenece a la región ($6\ge5$, $7\le9$, $2\le3$).

**c)** $f\left(\tfrac{7}{16},\tfrac{13}{8}\right)=\tfrac{5}{2}$, $f\left(\tfrac{5}{4},0\right)=\tfrac{5}{2}$, $f(3,0)=6$ y $f(2,1)=5$.

**Máximo $6$, en el punto $(3,0)$. Mínimo $\dfrac{5}{2}$, que se alcanza en $\left(\tfrac{7}{16},\tfrac{13}{8}\right)$ y en $\left(\tfrac{5}{4},0\right)$ y, por tanto, en todo el segmento que los une** ($f=2x+y$ es paralela a la recta $4x+2y=5$).

@@ 2
**a)** $P'(t)=-\dfrac{15(t+120)-15t}{(t+120)^2}=-\dfrac{1\,800}{(t+120)^2}<0$ para todo $t\ge0$: **el peso es decreciente, la persona va perdiendo peso.** Además, $\displaystyle\lim_{t\to+\infty}P(t)=75-15=60$.

**El peso mínimo al que podría llegar es de $60$ kg** (se acerca a él sin alcanzarlo).

**b)** $P(t)=64\iff\dfrac{15t}{t+120}=11\iff15t=11t+1\,320\iff t=330$.

**Debe hacer régimen $330$ días.**

**c)** $h^2=1{,}68^2=2{,}8224$ y $i(t)>25\iff P(t)>25\cdot2{,}8224=70{,}56$. Al inicio, $P(0)=75$ e $i(0)=\dfrac{75}{2{,}8224}=26{,}57>25$: **sí tenía sobrepeso.** Deja de tenerlo cuando $P(t)=70{,}56$:
$$75-\frac{15t}{t+120}=70{,}56\iff\frac{15t}{t+120}=4{,}44\iff10{,}56t=532{,}8\iff t=\frac{532{,}8}{10{,}56}=50{,}45.$$
**Han de transcurrir unos $50{,}45$ días** (es decir, a partir del día $51$ deja de tener sobrepeso).

@@ 3A
$P(A)=1-0{,}35=0{,}65$. Como $P(A\cup B)=P(A)+P(B)-P(A\cap B)$: $0{,}82=0{,}65+P(B)-0{,}38\Rightarrow P(B)=0{,}55$.

**a)** $P\left(B\mid A^C\right)=\dfrac{P(B)-P(A\cap B)}{P\left(A^C\right)}=\dfrac{0{,}55-0{,}38}{0{,}35}=\dfrac{17}{35}\approx\mathbf{0{,}4857}$.

**b)** $P(\text{solo uno})=P(A\cup B)-P(A\cap B)=0{,}82-0{,}38=\mathbf{0{,}44}$.

**c)** $X$ = número de veces que ocurre $A$ en $10$ repeticiones: $X\sim B(10;\ 0{,}65)$.
$$P(X\ge2)=1-P(X=0)-P(X=1)=1-0{,}35^{10}-10\cdot0{,}65\cdot0{,}35^9=1-0{,}00003-0{,}00051\approx\mathbf{0{,}9995}.$$

@@ 3B
$X\sim N(16,\ 2)$ (la desviación típica es $\sqrt4=2$).

**a)** $P(14{,}5<X<16{,}2)=P\!\left(\dfrac{14{,}5-16}{2}<Z<\dfrac{16{,}2-16}{2}\right)=P(-0{,}75<Z<0{,}1)=0{,}5398-(1-0{,}7734)=\mathbf{0{,}3132}$.

**b)** $P(X\ge a)=0{,}25\iff P(X<a)=0{,}75$. En la tabla $\Phi(0{,}67)=0{,}7486$ y $\Phi(0{,}68)=0{,}7517$, luego $z\approx0{,}675$ y $a=16+2\cdot0{,}675=\mathbf{17{,}35}$.

**c)** $\bar X\sim N\!\left(16,\ \dfrac{2}{\sqrt{64}}\right)=N(16,\ 0{,}25)$.
$$P(\bar X>16{,}3)=P\!\left(Z>\frac{16{,}3-16}{0{,}25}\right)=P(Z>1{,}2)=1-0{,}8849=\mathbf{0{,}1151}.$$

@@ 4
**a)** Estratos: público $12\,000$, concertado $6\,000$ y privado $20\,000-12\,000-6\,000=2\,000$. La fracción muestreada es $\dfrac{500}{20\,000}=0{,}025$:
$$\text{público: }300,\qquad\text{concertado: }150,\qquad\text{privado: }50.$$

**b)** $\hat p=\dfrac{200}{500}=0{,}4$, $n=500$. Nivel $99\,\%$: $\Phi(z_{\alpha/2})=0{,}995$, entre $\Phi(2{,}57)=0{,}9949$ y $\Phi(2{,}58)=0{,}9951$; se toma $z_{\alpha/2}=2{,}575$.

**i)** $E=2{,}575\sqrt{\dfrac{0{,}4\cdot0{,}6}{500}}=2{,}575\cdot0{,}02191=0{,}0564$.
$$IC=(0{,}4-0{,}0564,\ 0{,}4+0{,}0564)=(0{,}3436,\ 0{,}4564).$$
El valor $0{,}43$ **sí pertenece al intervalo**: **no puede afirmarse** que el porcentaje de suspensos no sea del $43\,\%$ (es un valor compatible con los datos).

**ii)** $E<0{,}04\iff n>\dfrac{2{,}575^2\cdot0{,}4\cdot0{,}6}{0{,}04^2}=994{,}59$. **Habría que seleccionar al menos $n=995$ estudiantes.**
