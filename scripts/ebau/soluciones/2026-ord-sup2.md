@@ 1
**a) Potencia de pérdida máxima.**
1. Derivada (cociente): $P'(t)=\dfrac{4(1+t^2)-4t\cdot2t}{(1+t^2)^2}=\dfrac{4(1-t^2)}{(1+t^2)^2}$.
2. Se anula si $1-t^2=0$, es decir $t=1$ (con $t\ge0$, se descarta $t=-1$).
3. Signo: $P'>0$ si $t<1$ y $P'<0$ si $t>1$, luego en $t=1$ hay un máximo.
4. Valor: $P(1)=\dfrac{4}{2}=2$.

**Máxima potencia de pérdida al cabo de 1 año ($P(1)=2$ W).**

**b) Energía perdida en los tres primeros años.**
1. Se pide $E(3)=\displaystyle\int_0^3P(x)\,dx=\int_0^3\dfrac{4x}{1+x^2}dx$.
2. El numerador es, salvo constante, la derivada del denominador: $\int\dfrac{u'}{u}\,dx=\ln|u|$ con $u=1+x^2$, $u'=2x$.
3. Barrow:
$$E(3)=\displaystyle\int_0^3\dfrac{4x}{1+x^2}dx=\big[2\ln(1+x^2)\big]_0^3=2\ln10-2\ln1=2\ln10.$$

**$E(3)=2\ln10\approx4{,}61$.**

@@ 2
**Planteamiento.**
1. Sean $a$, $b$, $c$ los precios de $A$, $B$ y $C$.
2. Con los descuentos, los precios son $0{,}9a$, $0{,}8b$ y $0{,}8c$, y suman $66$: $0{,}9a+0{,}8b+0{,}8c=66$, es decir, $9a+8b+8c=660$.
3. Sin descuento, 3 de $A$ y 4 de $B$ cuestan $140$: $3a+4b=140$, es decir, $6a+8b=280$.

**a) Precio de 3 de $A$ más 8 de $C$.**
1. Se resta la segunda ecuación (multiplicada por 2) de la primera: $(9a+8b+8c)-(6a+8b)=660-280$.
2. Se queda $3a+8c=660-280$.

**3 de $A$ más 8 de $C$ valen 380 €.**

**b) Precio de cada producto.**
1. Con $c=2a$ en la primera: $9a+8b+16a=660\Rightarrow25a+8b=660$.
2. Se resta la segunda: $(25a+8b)-(6a+8b)=660-280\Rightarrow19a=380\Rightarrow a=20$.
3. De $3a+4b=140$: $b=\dfrac{140-60}{4}=20$.
4. $c=2a=40$.

**$A=20$ €, $B=20$ €, $C=40$ €.**

@@ 3.1
**a) Área del triángulo con los ejes.**
1. Corte con el eje $X$ ($y=z=0$): $4x+20=0\Rightarrow x=-5$. Con el eje $Y$: $5y+20=0\Rightarrow y=-4$. Con el eje $Z$: $-20z+20=0\Rightarrow z=1$.
2. Vértices: $(-5,0,0)$, $(0,-4,0)$ y $(0,0,1)$.
3. Con $a=5$, $b=4$, $c=1$ (las distancias al origen), el área es $\tfrac12\sqrt{(ab)^2+(bc)^2+(ac)^2}=\tfrac12\sqrt{400+16+25}$ (equivale a $\tfrac12|\overrightarrow{AB}\times\overrightarrow{AC}|$).
4. $\sqrt{441}=21$.

**Área $=\dfrac{21}{2}=10{,}5\ \text{u}^2$.**

**b) Planos paralelos a $\pi$ a distancia 2 de $P$.**
1. Los planos paralelos a $\pi$ son $4x+5y-20z+k=0$, con normal $\vec n=(4,5,-20)$ y $|\vec n|=\sqrt{441}=21$.
2. Distancia de $P(2,2,1)$ al plano: $\dfrac{|8+10-20+k|}{21}=2$.
3. Se despeja: $|k-2|=42\Rightarrow k=44$ o $k=-40$.

**$4x+5y-20z+44=0$ y $4x+5y-20z-40=0$.**

@@ 3.2
**Normales.**
1. $\vec n_1=(2,-1,-1)$ y $\vec n_2=(1,-2,1)$.
2. Su producto vectorial: $\vec n_1\times\vec n_2=(-3,-3,-3)\parallel(1,1,1)$.

**a) Recta paralela a ambos planos.**
1. Una recta es paralela a un plano si su dirección es perpendicular a la normal del plano. Debe serlo a las dos normales.
2. Esa dirección es la del producto vectorial: $(1,1,1)$.
3. Pasa por $P(1,1,0)$.

**Recta: $x-1=y-1=z$.**

**b) Plano perpendicular a $\pi_1$ y $\pi_2$ por $P$.**
1. Un plano es perpendicular a $\pi_1$ si su normal es perpendicular a $\vec n_1$ (lo contiene); lo mismo con $\pi_2$.
2. Su normal es perpendicular a $\vec n_1$ y a $\vec n_2$: $\vec n=(1,1,1)$.
3. Plano $x+y+z+D=0$ por $P(1,1,0)$: $2+D=0\Rightarrow D=-2$.

**Plano: $x+y+z-2=0$.**

@@ 4.1
**Límite con desarrollos de Taylor** (también vale L'Hôpital dos veces).
1. El numerador y el denominador tienden a $0$ (indeterminación $\tfrac00$).
2. Desarrollando con $x\to0$: $e^{-ax}=1-ax+\dfrac{a^2x^2}{2}+\dots$ y $(1-ax)\cos2x=(1-ax)(1-2x^2+\dots)=1-ax-2x^2+O(x^3)$.
3. El numerador es la diferencia: $\left(\dfrac{a^2}{2}+2\right)x^2+O(x^3)$.
4. Se divide entre $x^2$: el límite vale $\dfrac{a^2}{2}+2$.
5. Se iguala a $6$: $\dfrac{a^2}{2}+2=6\Rightarrow a^2=8$.

**$a=2\sqrt2$ o $a=-2\sqrt2$.**

@@ 4.2
**Variable.** $X\sim N(50;1{,}8)$ es la talla en cm.

**a) Más de 54 cm.**
1. Se tipifica: $Z=\dfrac{X-50}{1{,}8}$ y $\dfrac{54-50}{1{,}8}=2{,}22$ (a dos decimales).
2. $P(X>54)=P(Z>2{,}22)=1-\Phi(2{,}22)=1-0{,}9868$, con $\Phi(2{,}22)=0{,}9868$ de la tabla.

**$P\approx0{,}0132$.**

**b) Niñas entre 48,2 y 51,8 cm entre 100.**
1. Se tipifican los extremos: $\dfrac{48{,}2-50}{1{,}8}=-1$ y $\dfrac{51{,}8-50}{1{,}8}=1$, es decir $z=\mp1$.
2. $P=\Phi(1)-\Phi(-1)=2\Phi(1)-1=2\cdot0{,}8413-1=0{,}6826$.
3. Número esperado: $100\cdot0{,}6826\approx68{,}3$.

**Unas 68 niñas.**

*Interpretación:* es la regla del $68\,\%$: a una desviación típica de la media entra más de dos tercios de la población.
