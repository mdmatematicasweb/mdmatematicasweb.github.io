@@ 1
**Rectángulo de área máxima inscrito en una semicircunferencia.**
1. **Incógnita.** Sea $x$ la distancia del centro a un extremo de la base: la base mide $2x$ y el vértice superior está en la circunferencia, así que la altura es $\sqrt{36-x^{2}}$ (con $0<x<6$).
2. **Función a maximizar.** $A(x)=2x\sqrt{36-x^{2}}$.
3. **Derivada.** $A'(x)=\dfrac{2(36-2x^{2})}{\sqrt{36-x^{2}}}=0\Rightarrow x^{2}=18\Rightarrow x=3\sqrt2$.
4. **Es máximo.** $A(0)=A(6)=0$ y $A>0$ en el interior, luego el único punto crítico es el máximo.
5. **Dimensiones.** Base $2x=6\sqrt2$ y altura $\sqrt{36-18}=3\sqrt2$.

**Base $6\sqrt2\approx8{,}49$ cm y altura $3\sqrt2\approx4{,}24$ cm** (área $36\ \text{cm}^2$).

@@ 2
**Cálculo de $a$.**
1. Al sustituir $x=0$ el numerador y el denominador valen $0$: indeterminación $\dfrac00$. Se estudian los desarrollos en $x=0$ (equivale a aplicar L'Hôpital dos veces).
2. Numerador: $\operatorname{sen}x-\ln(1+x)=\dfrac{x^{2}}2+\dots$
3. Denominador: $ax^{2}-x+e^{x}-\cos2x=\left(a+\dfrac52\right)x^{2}+\dots$ (los términos en $x$ se cancelan: $-x+x=0$).
4. El límite es el cociente de los coeficientes de $x^{2}$: $\dfrac{1/2}{a+5/2}=-\dfrac17$.
5. Se despeja: $a+\dfrac52=-\dfrac72\Rightarrow$ **$a=-6$.**

@@ 3
**Integral de una función racional.**
1. Se factoriza el denominador, $9-x^{2}=(3-x)(3+x)$, y se descompone en fracciones simples: $\dfrac1{9-x^{2}}=\dfrac16\left(\dfrac1{3-x}+\dfrac1{3+x}\right)$.
2. Primitiva: $\dfrac16\ln\left|\dfrac{3+x}{3-x}\right|$.
3. Regla de Barrow, con $x\in[6,12]$ (no se pasa por $x=3$, donde la función no está definida):
$$\int_6^{12}\dfrac{dx}{9-x^{2}}=\dfrac16\left(\ln\dfrac{15}{9}-\ln\dfrac93\right)=\dfrac16\ln\dfrac{5/3}{3}.$$

**Resultado: $\dfrac16\ln\dfrac59\approx-0{,}098$.**

*Interpretación:* es negativo porque $\dfrac1{9-x^{2}}<0$ para $x>3$.

@@ 4
**a) Punto de tangencia.**
1. La pendiente de la tangente es $4$: $f'(x)=2x=4\Rightarrow x=2$.
2. Ordenada: $f(2)=5$, y la recta da $4\cdot2-3=5$, así que el punto es el de tangencia.

![Recinto entre f(x)=x²+1, su tangente y=4x−3 en (2,5) y el eje de ordenadas](fig/2023-ord-res-e4.svg){fig-alt="Recinto entre f(x)=x²+1, su tangente y=4x−3 en (2,5) y el eje de ordenadas" width="75%" fig-align="center"}

**Punto $(2,5)$.**

**b) Área del recinto.**
1. La parábola $y=x^{2}+1$ queda por encima de la recta, que es tangente en $x=2$.
2. El recinto está entre $x=0$ (eje de ordenadas) y $x=2$.
3. Se integra la diferencia, que es un cuadrado perfecto:
$$A=\int_0^2\left[(x^{2}+1)-(4x-3)\right]dx=\int_0^2(x-2)^{2}dx=\left[\dfrac{(x-2)^{3}}3\right]_0^2=\dfrac83.$$

**Área $=\dfrac83\ \text{u}^2$.**

@@ 5
1. **Incógnitas.** $x$, $y$, $z$ son los litros de $L_1$, $L_2$ y $L_3$ que se mezclan para obtener un litro.
2. **Sistema.** Un litro en total, $100$ mg de sodio y $100$ mg de magnesio:
$$\begin{cases}x+y+z=1\\120x+100y+60z=100\\90x+90y+180z=100\end{cases}$$
3. **Discusión.** El determinante de la matriz de coeficientes vale $-1800\ne0$: sistema compatible determinado (SCD). Sí es posible.
4. **Resolución.** Por Cramer o Gauss.
5. **Comprobación.** Las tres cantidades son positivas y suman $1$: $\dfrac29+\dfrac69+\dfrac19=1$.

**$x=\dfrac29$ L de $L_1$, $y=\dfrac23$ L de $L_2$ y $z=\dfrac19$ L de $L_3$.**

@@ 6
**a) Valores de $m$ con inversa.**
1. $A$ tiene inversa si y solo si $|A|\neq0$.
2. Determinante: $|A|=12m^{2}-12m-1$.
3. Se anula si $m=\dfrac{3\pm2\sqrt3}6$.

**$A$ tiene inversa si $m\ne\dfrac{3\pm2\sqrt3}{6}$.**

**b) Ecuación $AX=B^{t}$ con $m=1$.**
1. Con $m=1$, $|A|=-1\ne0$, luego existe $A^{-1}$.
2. Se multiplica por la izquierda por $A^{-1}$ (la incógnita está a la derecha de $A$): $X=A^{-1}B^{t}$.
3. Matrices: $A^{-1}=\begin{pmatrix}-2&5&4\\0&1&1\\-3&7&6\end{pmatrix}$ y $B^{t}=\begin{pmatrix}1&0&2\\-1&2&5\\3&1&4\end{pmatrix}$.
4. Producto:

**$X=\begin{pmatrix}5&14&37\\2&3&9\\8&20&53\end{pmatrix}$.**

@@ 7
**Vector del segmento.** $\overrightarrow{AB}=(1,2,-4)$.

**a) Puntos que dividen $AB$ en cuatro partes iguales.**
1. Se avanza desde $A$ un cuarto del vector cada vez: $A+\dfrac k4\overrightarrow{AB}$, con $k=1,2,3$.
2. Se calculan los tres puntos:

**$\left(\dfrac54,-\dfrac32,2\right)$, $\left(\dfrac32,-1,1\right)$ y $\left(\dfrac74,-\dfrac12,0\right)$** (el segundo es el punto medio).

**b) Plano perpendicular por el punto medio.**
1. La normal es $\overrightarrow{AB}=(1,2,-4)$: el plano es $x+2y-4z+D=0$.
2. Debe pasar por $M\left(\dfrac32,-1,1\right)$: $\dfrac32-2-4+D=0\Rightarrow D=\dfrac92$.
3. Se multiplica por $2$ para quitar denominadores.

**$2x+4y-8z+9=0$.**

@@ 8
1. **Ecuaciones de $r$.** De $x-1=\dfrac y2=\dfrac{z+1}2$: $r$ pasa por $(1,0,-1)$ con dirección $(1,2,2)$, es decir, $(x,y,z)=(1,0,-1)+t(1,2,2)$.
2. **Punto $Q$.** Se sustituye en $\pi\equiv x+y+z=0$: $(1+t)+2t+(-1+2t)=5t=0\Rightarrow t=0$, y $Q=(1,0,-1)$.
3. **Punto $Q'$.** $Q'=Q+s(1,2,2)$, con $|QQ'|=3|s|=2$ (el módulo de $(1,2,2)$ es $3$), luego $s=\pm\dfrac23$.
4. **Plano $\pi'$.** Es paralelo a $\pi$: $x+y+z=k$. Como $Q'$ está en él, $k=5s=\pm\dfrac{10}3$ (el valor de $x+y+z$ en $Q+s(1,2,2)$ es $5s$ porque $Q$ da $0$).

**$\pi'\equiv x+y+z=\dfrac{10}3$ (o también $x+y+z=-\dfrac{10}3$).**
