@@ 1
**a)** Rectas frontera: $x+2y=7$, $2x-y=4$, $4x-y=1$, $3x+2y=20$. Los vértices del recinto son
$$(1,3),\quad(2,7),\quad(3,2),\quad(4,4),$$
donde $(1,3)$ es el corte de $x+2y=7$ con $4x-y=1$, $(2,7)$ el de $4x-y=1$ con $3x+2y=20$, $(4,4)$ el de $3x+2y=20$ con $2x-y=4$ y $(3,2)$ el de $2x-y=4$ con $x+2y=7$.

**b)** $F(1,3)=10$, $F(2,7)=23$, $F(3,2)=9$ y $F(4,4)=16$.

**El máximo vale $23$ y se alcanza en el punto $(2,7)$.**

@@ 2
**a)** $|A|=a\left(a^2-16\right)=a(a-4)(a+4)$ (desarrollando por la tercera fila). $A$ no es invertible si $|A|=0$: **$a=0$, $a=4$ o $a=-4$.**

**b)** Para $a=5$, $|A|=5\cdot9=45\neq0$. Calculando la adjunta traspuesta:
$$A^{-1}=\begin{pmatrix}\frac{5}{9}&-\frac{2}{9}&0\\-\frac{8}{9}&\frac{5}{9}&0\\0&0&\frac{1}{5}\end{pmatrix}.$$

**c)** $X=A^{-1}B$:
$$X=\begin{pmatrix}\frac{5}{9}&-\frac{2}{9}&0\\-\frac{8}{9}&\frac{5}{9}&0\\0&0&\frac{1}{5}\end{pmatrix}\begin{pmatrix}1\\-2\\10\end{pmatrix}=\begin{pmatrix}1\\-2\\2\end{pmatrix}.$$

@@ 3
**a)** Beneficio $=$ ingresos $-$ costes: $B(x)=I(x)-C(x)=x^3-x-x^3+x^2-6=x^2-x-6$, con $0\le x\le8$.

**b)** $B(x)=(x-3)(x+2)>0\iff x>3$ (pues $x\ge0$). **Obtiene beneficios si está abierta más de 3 horas y hasta 8 horas** ($3<x\le8$).

**c)** $B'(x)=2x-1=0\Rightarrow x=\dfrac{1}{2}$, con $B''=2>0$: mínimo. $B\left(\dfrac{1}{2}\right)=\dfrac{1}{4}-\dfrac{1}{2}-6=-\dfrac{25}{4}$. En el extremo $B(0)=-6$.

**Las mayores pérdidas se tienen a las $0{,}5$ horas (media hora) y ascienden a $6{,}25$ mil euros ($6\,250$ €).**

**d)** $B$ es creciente para $x>\dfrac{1}{2}$, luego el máximo está en el extremo $x=8$: $B(8)=64-8-6=50$.

**Debe permanecer abierta 8 horas, con un beneficio máximo de $50$ mil euros ($50\,000$ €).**

@@ 4
**a)** Continuidad en $x=1$: $a+b+2=\dfrac{4}{2}=2\Rightarrow a+b=0$. Derivabilidad: $f'(x)=2ax+b$ si $x<1$ y $f'(x)=-\dfrac{4}{(x+1)^2}$ si $x>1$; en $x=1$: $2a+b=-1$. Restando, $a=-1$ y $b=1$.

**$a=-1$ y $b=1$.**

**b)** Para $x\le1$: $f(x)=-x^2+x+2=-(x-2)(x+1)$, parábola abierta hacia abajo con vértice $\left(\dfrac{1}{2},\dfrac{9}{4}\right)$ que corta al eje $OX$ en $x=-1$ y $x=2$ (aunque solo hasta $x=1$), al eje $OY$ en $(0,2)$ y llega a $(1,2)$. Para $x>1$: $f(x)=\dfrac{4}{x+1}$, hipérbola decreciente desde $(1,2)$, con asíntota horizontal $y=0$. La función es continua y suave en $x=1$.

**c)** El recinto acotado va de $x=-1$ (donde $f$ corta al eje $OX$) a $x=1$, con $f\ge0$:
$$A=\int_{-1}^{1}\left(-x^2+x+2\right)dx=\left[-\frac{x^3}{3}+\frac{x^2}{2}+2x\right]_{-1}^{1}=\frac{13}{6}-\left(-\frac{7}{6}\right)=\frac{10}{3}.$$
**$A=\dfrac{10}{3}\ \text{u}^2$**

@@ 5
Sean $D$ «practica deporte» e $I$ «estudia idiomas»: $P(D\cup I)=0{,}8$, $P(D\cap I)=0{,}35$, $P(I^C)=0{,}6$, luego $P(I)=0{,}4$ y $P(D)=P(D\cup I)-P(I)+P(D\cap I)=0{,}8-0{,}4+0{,}35=0{,}75$.

**a)** i) $P(D\cap I^C)=P(D)-P(D\cap I)=0{,}75-0{,}35=\mathbf{0{,}4}$.

ii) $P(I\cap D^C)=P(I)-P(D\cap I)=0{,}4-0{,}35=\mathbf{0{,}05}$.

iii) $P(\text{solo una})=0{,}4+0{,}05=\mathbf{0{,}45}$.

iv) $P(D^C\cap I^C)=1-P(D\cup I)=1-0{,}8=\mathbf{0{,}2}$.

**b)** $P(D)P(I)=0{,}75\cdot0{,}4=0{,}3\neq0{,}35=P(D\cap I)$: **no son independientes.**

@@ 6
$P(A)=0{,}48$, $P(B)=0{,}35$, $P(C)=0{,}17$. Sea $E$ «la vacuna le es efectiva»: $P(E\mid A)=0{,}7$, $P(E\mid B)=0{,}95$, $P(E\mid C)=0{,}94$.

**a)** $P(A\cap E^C)=P(A)\,P(E^C\mid A)=0{,}48\cdot0{,}3=\mathbf{0{,}144}$.

**b)** $P(E)=0{,}48\cdot0{,}7+0{,}35\cdot0{,}95+0{,}17\cdot0{,}94=0{,}336+0{,}3325+0{,}1598=\mathbf{0{,}8283}$.

**c)** $P(C\mid E^C)=\dfrac{P(C)\,P(E^C\mid C)}{P(E^C)}=\dfrac{0{,}17\cdot0{,}06}{1-0{,}8283}=\dfrac{0{,}0102}{0{,}1717}=\dfrac{6}{101}\approx\mathbf{0{,}0594}$.

@@ 7
$\hat p=\dfrac{36}{100}=0{,}36$, $n=100$, $z_{\alpha/2}=1{,}75$ (nivel $92\,\%$).

**a)** $E=1{,}75\sqrt{\dfrac{0{,}36\cdot0{,}64}{100}}=1{,}75\cdot0{,}048=0{,}084$.
$$IC=(0{,}36-0{,}084,\ 0{,}36+0{,}084)=(0{,}276,\ 0{,}444).$$

**b)** $E\le0{,}025\iff n\ge\dfrac{1{,}75^2\cdot0{,}36\cdot0{,}64}{0{,}025^2}=1\,128{,}96$. **El tamaño mínimo es $n=1\,129$.**

@@ 8
$\sigma=\sqrt{9{,}61}=3{,}1$ meses y $n=10$. Suma de los datos: $311{,}9$, luego $\bar x=31{,}19$.

**a)** Nivel $97\,\%$: $z_{\alpha/2}=2{,}17$. $E=2{,}17\cdot\dfrac{3{,}1}{\sqrt{10}}=2{,}1273$.
$$IC=(31{,}19-2{,}1273,\ 31{,}19+2{,}1273)=(29{,}0627,\ 33{,}3173).$$

**b)** $E<0{,}15\iff n>\left(\dfrac{2{,}17\cdot3{,}1}{0{,}15}\right)^2=2\,011{,}22$. **Hace falta una muestra de al menos $n=2\,012$ teléfonos.**
