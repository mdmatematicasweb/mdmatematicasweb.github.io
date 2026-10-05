@@ 1
**Planteamiento.**
1. Sea $x$ el lado junto al camino (y su lado opuesto) e $y$ cada uno de los otros dos lados.
2. Coste: el lado del camino cuesta $80x$ y los otros tres lados $10x+10y+10y$. Así $80x+10x+20y=28800$, luego $y=1440-4{,}5x$.
3. Área a maximizar: $A(x)=x\,y=1440x-4{,}5x^2$, con $0<x<320$ (para que $y>0$).

**Optimización.**
1. Derivada: $A'(x)=1440-9x=0\Rightarrow x=160$, que está en el dominio.
2. $A''=-9<0$: es un máximo.
3. Entonces $y=1440-720=720$.
4. Área: $160\cdot720=115\,200$.

**Dimensiones: 160 m (lado del camino) por 720 m; área máxima $=115\,200\ \text{m}^2$.**

@@ 2
**Valor de $b$ (punto crítico).**
1. Derivada: $f'(x)=a\cos x-b\operatorname{sen}(bx)$.
2. En $\pi/2$ se cumple $a\cos\dfrac{\pi}{2}=0$, así que $f'(\pi/2)=-b\operatorname{sen}(b\pi/2)=0$.
3. Como $b\neq0$, hace falta $\operatorname{sen}(b\pi/2)=0$, es decir $b\pi/2=k\pi$. Con $0<b<3$ solo vale $b\pi/2=\pi$.

**$b=2$.**

**Valor de $a$ (integral).**
1. Se integra con $b=2$ y se aplica Barrow:
$$\int_0^\pi\big(a\operatorname{sen}x+\cos 2x\big)dx=\Big[-a\cos x+\tfrac{\operatorname{sen}2x}{2}\Big]_0^\pi=2a.$$
2. Se iguala a $4$: $2a=4$.

**$a=2$, $b=2$.**

@@ 3.1
**Producto vectorial.**
1. $\vec u\times\vec v=(-m,-3,2m)$.
2. Módulo: $|\vec u\times\vec v|=\sqrt{m^2+9+4m^2}=\sqrt{5m^2+9}$.

**a) Valor de $m$ para el área dada.**
1. El área del triángulo es la mitad del módulo del producto vectorial: $\tfrac12\sqrt{5m^2+9}=\tfrac{\sqrt{29}}{2}$.
2. Se elevan al cuadrado: $5m^2+9=29\Rightarrow5m^2=20$.

**$m=2$ o $m=-2$.**

**b) Vectores perpendiculares a $\vec u$ y $\vec v$ de módulo $\sqrt{20}$** (con $m=0$).
1. Un vector perpendicular a ambos es paralelo al producto vectorial: $\vec u\times\vec v=(0,-3,0)$.
2. Los vectores buscados son de la forma $(0,k,0)$ con $|k|=\sqrt{20}=2\sqrt5$.

**$(0,2\sqrt5,0)$ y $(0,-2\sqrt5,0)$.**

@@ 3.2
**Posición relativa recta-plano.**
1. Dirección de $r$: $\vec d=(2,1,m-2)$. Normal de $\pi$: $\vec n=(2,-1,2)$.
2. Producto escalar: $\vec d\cdot\vec n=4-1+2(m-2)=2m-1$.

**a) Según $m$.**
1. Si $m\neq\tfrac12$: $\vec d\cdot\vec n\neq0$ y **la recta corta al plano** en un punto.
2. Si $m=\tfrac12$: $r\parallel\pi$. Se comprueba si está contenida con un punto de $r$, $(1,0,2)$: en $\pi$ da $2-0+4-3=3\neq0$, no está en $\pi$.

**Si $m\neq\tfrac12$, secantes; si $m=\tfrac12$, recta paralela al plano (sin puntos comunes).**

**b) Plano que contiene a $r$ y es perpendicular a $\pi$** (con $m=1$).
1. Dirección de $r$: $\vec d=(2,1,-1)$.
2. Si el plano contiene a $r$ y es perpendicular a $\pi$, su normal es perpendicular a $\vec d$ y a $\vec n$: $\vec d\times\vec n=(1,-6,-4)$.
3. Pasa por $(1,0,2)$: $(x-1)-6y-4(z-2)=0$.

**Plano: $x-6y-4z+7=0$.**

@@ 4.1
**a) Clasificación y resolución.**
1. Se suman la 1.ª y la 3.ª ecuación: $2x=6\Rightarrow x=3$. Entonces la 1.ª queda $y+z=-2$.
2. La 2.ª ecuación, con $x=3$: $21+3(y+z)=15\Rightarrow y+z=-2$. Es la misma condición.
3. Así $\operatorname{rg}(A)=\operatorname{rg}(A^*)=2<3$: sistema compatible indeterminado (SCI), con un parámetro.
4. Se toma $y=\lambda$ y entonces $z=-2-\lambda$.

**Soluciones: $(x,y,z)=(3,\lambda,-2-\lambda)$, $\lambda\in\mathbb R$.**

**b) ¿Alguna solución con $y+z+2=0$?**
1. Todas las soluciones cumplen $y+z=-2$, es decir $y+z+2=0$.

**Sí: todas las soluciones del sistema la verifican.**

@@ 4.2
**Variable.** $X\sim N(172;7)$ es la estatura en cm.

**a) Entre 168 y 180 cm.**
1. Se tipifican los extremos (a dos decimales): $\dfrac{168-172}{7}=-0{,}57$ y $\dfrac{180-172}{7}=1{,}14$.
2. $P(168<X<180)=P\!\left(-0{,}57<Z<1{,}14\right)=\Phi(1{,}14)-\Phi(-0{,}57)$.
3. Con la simetría, $\Phi(-0{,}57)=1-\Phi(0{,}57)$:
$$P=\Phi(1{,}14)-\left(1-\Phi(0{,}57)\right)=0{,}8729-0{,}2843.$$

**$P\approx0{,}5886$.**

**b) Grupo del $5\,\%$ más alto.**
1. Se busca $k$ con $P(X\ge k)=0{,}05$, es decir $\Phi(z)=0{,}95$.
2. En la tabla, $0{,}95$ queda justo entre $\Phi(1{,}64)=0{,}9495$ y $\Phi(1{,}65)=0{,}9505$, luego $z=1{,}645$.
3. Se deshace la tipificación: $k=172+1{,}645\cdot7\approx183{,}5$.

**Mide al menos unos 183,5 cm.**

*Interpretación:* solo uno de cada veinte alumnos supera los $183{,}5$ cm.
