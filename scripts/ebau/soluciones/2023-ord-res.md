@@ 1
Sea $x$ la distancia del centro a un extremo de la base: base $2x$, altura $\sqrt{36-x^{2}}$ (vértice superior en la circunferencia).

$A(x)=2x\sqrt{36-x^{2}}$. $A'(x)=\dfrac{2(36-2x^{2})}{\sqrt{36-x^{2}}}=0\Rightarrow x=3\sqrt2$ (es máximo: $A(0)=A(6)=0$).

**Base $6\sqrt2\approx8{,}49$ cm y altura $3\sqrt2\approx4{,}24$ cm** (área $36\ \text{cm}^2$).

@@ 2
Desarrollos en $x=0$: $\operatorname{sen}x-\ln(1+x)=\dfrac{x^{2}}2+\dots$ y $ax^{2}-x+e^{x}-\cos2x=\left(a+\dfrac52\right)x^{2}+\dots$

(Ambos tienden a 0; se puede aplicar L'Hôpital dos veces.) El límite es $\dfrac{1/2}{a+5/2}=-\dfrac17$:

$a+\dfrac52=-\dfrac72\Rightarrow$ **$a=-6$.**

@@ 3
$\dfrac1{9-x^{2}}=\dfrac16\left(\dfrac1{3-x}+\dfrac1{3+x}\right)$, cuya primitiva es $\dfrac16\ln\left|\dfrac{3+x}{3-x}\right|$.

$$\int_6^{12}\dfrac{dx}{9-x^{2}}=\dfrac16\left(\ln\dfrac{15}{9}-\ln\dfrac93\right)=\dfrac16\ln\dfrac{5/3}{3}.$$

**Resultado: $\dfrac16\ln\dfrac59\approx-0{,}098$.**

@@ 4
**a)** $f'(x)=2x=4\Rightarrow x=2$, $f(2)=5$ (y la recta da $4\cdot2-3=5$).

![Recinto entre f(x)=x²+1, su tangente y=4x−3 en (2,5) y el eje de ordenadas](fig/2023-ord-res-e4.svg){fig-alt="Recinto entre f(x)=x²+1, su tangente y=4x−3 en (2,5) y el eje de ordenadas" width="75%" fig-align="center"}

**Punto $(2,5)$.**

**b)** La parábola $y=x^{2}+1$ queda por encima de la recta, que es tangente en $x=2$. El recinto está entre $x=0$ (eje de ordenadas) y $x=2$:

$$A=\int_0^2\left[(x^{2}+1)-(4x-3)\right]dx=\int_0^2(x-2)^{2}dx=\left[\dfrac{(x-2)^{3}}3\right]_0^2=\dfrac83.$$

**Área $=\dfrac83\ \text{u}^2$.**

@@ 5
Sean $x$, $y$, $z$ los litros de $L_1$, $L_2$ y $L_3$ (un litro en total):

$$\begin{cases}x+y+z=1\\120x+100y+60z=100\\90x+90y+180z=100\end{cases}$$

El determinante vale $-1800\ne0$: sistema compatible determinado (SCD). Sí es posible.

**$x=\dfrac29$ L de $L_1$, $y=\dfrac23$ L de $L_2$ y $z=\dfrac19$ L de $L_3$.**

@@ 6
**a)** $|A|=12m^{2}-12m-1$, que se anula si $m=\dfrac{3\pm2\sqrt3}6$.

**$A$ tiene inversa si $m\ne\dfrac{3\pm2\sqrt3}{6}$.**

**b)** Con $m=1$: $|A|=-1\ne0$. $AX=B^{t}\Rightarrow X=A^{-1}B^{t}$, con $A^{-1}=\begin{pmatrix}-2&5&4\\0&1&1\\-3&7&6\end{pmatrix}$ y $B^{t}=\begin{pmatrix}1&0&2\\-1&2&5\\3&1&4\end{pmatrix}$.

**$X=\begin{pmatrix}5&14&37\\2&3&9\\8&20&53\end{pmatrix}$.**

@@ 7
$\overrightarrow{AB}=(1,2,-4)$.

**a)** Puntos $A+\dfrac k4\overrightarrow{AB}$, $k=1,2,3$:

**$\left(\dfrac54,-\dfrac32,2\right)$, $\left(\dfrac32,-1,1\right)$ y $\left(\dfrac74,-\dfrac12,0\right)$** (el segundo es el punto medio).

**b)** Plano $x+2y-4z+D=0$ por $M\left(\dfrac32,-1,1\right)$: $\dfrac32-2-4+D=0\Rightarrow D=\dfrac92$.

**$2x+4y-8z+9=0$.**

@@ 8
Recta $r$: $(x,y,z)=(1,0,-1)+t(1,2,2)$. Corte con $\pi$: $(1+t)+2t+(-1+2t)=5t=0\Rightarrow t=0$, $Q=(1,0,-1)$.

$Q'=Q+s(1,2,2)$ con $|QQ'|=3|s|=2\Rightarrow s=\pm\dfrac23$. Plano $\pi'\equiv x+y+z=k$ con $k=5s=\pm\dfrac{10}3$.

**$\pi'\equiv x+y+z=\dfrac{10}3$ (o también $x+y+z=-\dfrac{10}3$).**
