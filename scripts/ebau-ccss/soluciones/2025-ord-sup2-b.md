@@ 1
**a)** Sean $M>I>m$ los números. Condiciones: $M+I+m=113$; $M=6m+4$ (cociente $6$ y resto $4$); $M=2I+6$ (cociente $2$ y resto $6$). Entonces $m=\dfrac{M-4}{6}$ e $I=\dfrac{M-6}{2}$, y
$$M+\frac{M-6}{2}+\frac{M-4}{6}=113\Rightarrow6M+3M-18+M-4=678\Rightarrow10M=700.$$
**$M=70$, $I=32$ y $m=11$.** (Comprobación: $70+32+11=113$, $70=6\cdot11+4$ y $70=2\cdot32+6$.)

**b)** $A+B=\begin{pmatrix}1&0\\4&4\end{pmatrix}$ con $|A+B|=4$ y $(A+B)^{-1}=\begin{pmatrix}1&0\\-1&\frac{1}{4}\end{pmatrix}$.

Por otro lado, $|A|=5$, $A^{-1}=\dfrac{1}{5}\begin{pmatrix}3&1\\-2&1\end{pmatrix}$ y $|B|=-2$, $B^{-1}=\begin{pmatrix}-\frac{1}{2}&\frac{1}{2}\\1&0\end{pmatrix}$, de modo que
$$A^{-1}+B^{-1}=\begin{pmatrix}\frac{1}{10}&\frac{7}{10}\\\frac{3}{5}&\frac{1}{5}\end{pmatrix}.$$
**No coinciden:** $(A+B)^{-1}\neq A^{-1}+B^{-1}$ (en general, la inversa de una suma no es la suma de las inversas).

@@ 2
Sean $x$ los kg de abono $A$ e $y$ los de $B$. Restricciones: $x\le200$; $2y-3x\le100$; $x+2y\le500$; $x\ge0$, $y\ge0$. Beneficio: $B(x,y)=15x+10y$.

Vértices: $(0,0)$, $(0,50)$, $(100,200)$ (corte de $2y-3x=100$ con $x+2y=500$), $(200,150)$ (corte de $x=200$ con $x+2y=500$) y $(200,0)$.

| Vértice | $(0,0)$ | $(0,50)$ | $(100,200)$ | $(200,150)$ | $(200,0)$ |
|---|---|---|---|---|---|
| $B$ | $0$ | $500$ | $3\,500$ | $4\,500$ | $3\,000$ |

**Debe producir $200$ kg de abono $A$ y $150$ kg de abono $B$, con un beneficio máximo de $4\,500$ €.**

@@ 3
**a)** $f(t)=5\iff10\left(\dfrac{1}{2}\right)^{t/30}=5\iff\left(\dfrac{1}{2}\right)^{t/30}=\dfrac{1}{2}\iff\dfrac{t}{30}=1$.

**Deben pasar $30$ años.**

**b)** $f(10)=10\cdot2^{-1/3}\approx7{,}937$. $f'(t)=10\left(\dfrac{1}{2}\right)^{t/30}\cdot\dfrac{\ln(1/2)}{30}=-\dfrac{\ln2}{3}\cdot2^{-t/30}$, luego $f'(10)=-\dfrac{\ln2}{3}\cdot2^{-1/3}\approx-0{,}1834$.

Tangente: $y-7{,}937=-0{,}1834\,(t-10)$.

**$y=-0{,}1834\,t+9{,}771$** (es decir, $y=10\cdot2^{-1/3}-\dfrac{\ln2}{3}\,2^{-1/3}(t-10)$).

**c)** $\displaystyle\lim_{t\to+\infty}10\left(\frac{1}{2}\right)^{t/30}=0$: **asíntota horizontal $y=0$.** La función está definida y es continua para todo $t\ge0$: **no tiene asíntotas verticales.**

@@ 4
$P(B)=0{,}35$ (*Básico*), $P(I)=0{,}45$ (*Intermedio*), $P(P)=0{,}2$ (*Premium*). Sea $A$ «pantalla del tipo $A$»: $P(A\mid B)=0{,}8$, $P(A\mid P)=0{,}05$ y $P(A)=0{,}53$.

**a)** $P(A)=0{,}35\cdot0{,}8+0{,}45\cdot P(A\mid I)+0{,}2\cdot0{,}05=0{,}28+0{,}01+0{,}45\,P(A\mid I)=0{,}53$, de donde $0{,}45\,P(A\mid I)=0{,}24$.

**$P(A\mid I)=\dfrac{0{,}24}{0{,}45}=\dfrac{8}{15}\approx\mathbf{0{,}5333}$.**

**b)** $P(I\mid A)=\dfrac{P(I)\,P(A\mid I)}{P(A)}=\dfrac{0{,}24}{0{,}53}=\dfrac{24}{53}\approx\mathbf{0{,}4528}$.

@@ 5
Sea $C$ «danza clásica» y $M$ «danza moderna»: $P(A)=0{,}2$, $P(B)=0{,}8$, $P(C\mid A)=0{,}7$, $P(B\cap C)=0{,}32$.

**a)** $P(C)=P(A\cap C)+P(B\cap C)=0{,}2\cdot0{,}7+0{,}32=0{,}14+0{,}32=\mathbf{0{,}46}$.

**b)** $P(C\mid B)=\dfrac{0{,}32}{0{,}8}=0{,}4$, luego $P(M\mid B)=1-0{,}4=\mathbf{0{,}6}$.

**c)** $P(M)=1-0{,}46=0{,}54$ y $P(B\cap M)=0{,}8\cdot0{,}6=0{,}48$. $P(B\mid M)=\dfrac{0{,}48}{0{,}54}=\dfrac{8}{9}\approx\mathbf{0{,}8889}$.

**d)** $P(A\cap C\cap\text{Máster})=0{,}2\cdot0{,}7\cdot0{,}8=\mathbf{0{,}112}$.

@@ 6
$\hat p=\dfrac{240}{600}=0{,}4$, $n=600$, $z_{\alpha/2}=1{,}96$.

**a)** $E=1{,}96\sqrt{\dfrac{0{,}4\cdot0{,}6}{600}}=1{,}96\cdot0{,}02=0{,}0392$.
$$IC=(0{,}4-0{,}0392,\ 0{,}4+0{,}0392)=(0{,}3608,\ 0{,}4392).$$
El valor $0{,}5$ **no pertenece al intervalo**: **no puede suponerse** que la mitad de las familias tenga mascota.

**b)** $E=0{,}025\Rightarrow n\ge\dfrac{1{,}96^2\cdot0{,}4\cdot0{,}6}{0{,}025^2}=1\,475{,}17$. **Hace falta una muestra de al menos $n=1\,476$ familias.**

**c)** La amplitud es $2z_{\alpha/2}\sqrt{\dfrac{\hat p(1-\hat p)}{n}}$. Al aumentar $n$, el error disminuye: **la amplitud del intervalo disminuye.**

@@ 7
**a)** Suma de los pesos: $66{,}3$, luego $\bar x=\dfrac{66{,}3}{13}=5{,}1$ kg. Nivel $98{,}5\,\%$: $\Phi(z_{\alpha/2})=0{,}9925$ y en la tabla $\Phi(2{,}43)=0{,}9925$: $z_{\alpha/2}=2{,}43$. $E=2{,}43\cdot\dfrac{0{,}9}{\sqrt{13}}=0{,}6066$.
$$IC=(5{,}1-0{,}6066,\ 5{,}1+0{,}6066)=(4{,}4934,\ 5{,}7066).$$

**b)** Se interpreta el «$10\,\%$» como el $10\,\%$ del peso medio estimado: $0{,}1\cdot5{,}1=0{,}51$ kg. $E<0{,}51\iff n>\left(\dfrac{2{,}43\cdot0{,}9}{0{,}51}\right)^2=18{,}39$. **Hacen falta al menos $n=19$ mochilas.** (Si el error se exigiera inferior a $0{,}1$ kg, saldría $n>478{,}3$, es decir, $n=479$.)

**c)** $\bar X\sim N\!\left(4{,}9,\ \dfrac{0{,}9}{\sqrt{36}}\right)=N(4{,}9,\ 0{,}15)$.
$$P(\bar X\le5{,}2)=P\!\left(Z\le\frac{5{,}2-4{,}9}{0{,}15}\right)=P(Z\le2)=\mathbf{0{,}9772}.$$
