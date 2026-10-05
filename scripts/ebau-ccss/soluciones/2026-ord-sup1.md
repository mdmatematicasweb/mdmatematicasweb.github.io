@@ 1
**a) Ingreso máximo.**
1. **Incógnitas.** $x$ = unidades de $P_1$ e $y$ = unidades de $P_2$ al año.
2. **Restricciones.**
   - Energía: $10x+5y\le3\,500\iff2x+y\le700$.
   - Capital (solo lo usa $P_1$): $5x\le1\,300\iff x\le260$.
   - Mano de obra, al menos $4\,200$ horas para la ayuda: $10x+20y\ge4\,200\iff x+2y\ge420$.
   - No negatividad: $x\ge0$, $y\ge0$.
3. **Función objetivo.** Ingresos: $I(x,y)=800x+400y$.
4. **Vértices:** $(0,210)$ (corte de $x=0$ con $x+2y=420$), $(0,700)$ (corte de $x=0$ con $2x+y=700$), $(260,180)$ (corte de $x=260$ con $2x+y=700$) y $(260,80)$ (corte de $x=260$ con $x+2y=420$).
5. **Valor de $I$ en cada vértice:**

| Vértice | $(0,210)$ | $(0,700)$ | $(260,180)$ | $(260,80)$ |
|---|---|---|---|---|
| $I$ | $84\,000$ | $280\,000$ | $280\,000$ | $240\,000$ |

![Región factible del ejercicio 1 (2026-ord-sup1), con sus vértices: (0, 210), (260, 80), (260, 180), (0, 700)](fig/2026-ord-sup1-e1.svg){fig-alt="Región factible del ejercicio 1 (2026-ord-sup1), con sus vértices: (0, 210), (260, 80), (260, 180), (0, 700)" width="75%" fig-align="center"}

6. **Conclusión.** El máximo se alcanza en dos vértices, $(0,700)$ y $(260,180)$, porque $I=400(2x+y)$ y la recta de la energía $2x+y=700$ es paralela a las rectas de nivel.

**El ingreso óptimo es de $280\,000$ € y se alcanza en todos los puntos del segmento que une $(0,700)$ y $(260,180)$** (por ejemplo, $260$ unidades de $P_1$ y $180$ de $P_2$, o $0$ de $P_1$ y $700$ de $P_2$).

**b) ¿Un único producto?**
1. Solo $P_2$ ($x=0$, $y=700$): se agota la energía ($5\cdot700=3\,500$), se cumplen las horas ($20\cdot700=14\,000\ge4\,200$) y el ingreso es $400\cdot700=280\,000$ €.
2. Solo $P_1$ ($y=0$): como mucho $x=260$ unidades, con $800\cdot260=208\,000$ € $<280\,000$ €.

**Sí:** fabricando solo $P_2$, $700$ unidades, se alcanza el máximo. Con solo $P_1$ no es posible.

@@ 2A
**a) Parámetros $a$ y $b$.**
1. Pasa por $(2,2)$ con $x=2<3$: $f(2)=8+4a+18=2\Rightarrow4a=-24\Rightarrow a=-6$.
2. Continuidad en $x=3$: por la izquierda, $\displaystyle\lim_{x\to3^-}f=27+9a+27=54-54=0$; por la derecha, $f(3)=\dfrac{3b+18}{4}$.
3. Se igualan: $3b+18=0\Rightarrow b=-6$.

**$a=-6$ y $b=-6$.**

**b) i) Asíntotas** (con $a=b=-6$: $f(x)=x^3-6x^2+9x$ si $x<3$ y $f(x)=\dfrac{-6x+18}{x+1}$ si $x\ge3$).
1. Verticales: no hay ($x=-1$ no está en el tramo $x\ge3$ y el tramo cúbico no tiene).
2. Horizontal por la derecha: $\displaystyle\lim_{x\to+\infty}\dfrac{-6x+18}{x+1}=-6$.
3. En $-\infty$ el tramo cúbico no tiene asíntotas.

**Asíntota horizontal $y=-6$ (por la derecha); no hay verticales ni oblicuas.**

**ii) Monotonía y extremos.**
1. Si $x<3$: $f'(x)=3x^2-12x+9=3(x-1)(x-3)$, con $f'>0$ en $(-\infty,1)$ y $f'<0$ en $(1,3)$.
2. Si $x>3$: $f'(x)=\dfrac{-6(x+1)-(-6x+18)}{(x+1)^2}=\dfrac{-24}{(x+1)^2}<0$.
3. En $x=3$ es $f(3)=0$ y la función sigue decreciendo a ambos lados ($f'(3^-)=0$, $f'(3^+)=-\tfrac{3}{2}$): no hay extremo.

**$f$ crece en $(-\infty,1)$ y decrece en $(1,+\infty)$. Máximo relativo en $(1,4)$; no hay mínimos relativos.**

**iii) Esbozo.**
1. Cúbica $y=x(x-3)^2$ viniendo de $-\infty$: corta al eje en $(0,0)$, sube hasta el máximo $(1,4)$ y baja hasta tocar el eje en $(3,0)$.
2. A partir de ahí continúa descendiendo como la hipérbola $y=\dfrac{-6x+18}{x+1}$ (pasa por $\left(5,-2\right)$), acercándose por encima a $y=-6$.

![Gráfica de f para a=b=−6: cúbica con máximo (1,4) que toca al eje X en (3,0) y, desde ahí, rama de hipérbola decreciente con asíntota horizontal y=−6](fig/2026-ord-sup1-e2a.svg){fig-alt="Gráfica de f para a=b=−6: cúbica con máximo (1,4) que toca al eje X en (3,0) y, desde ahí, rama de hipérbola decreciente con asíntota horizontal y=−6" width="75%" fig-align="center"}

@@ 2B
**a) Dominio y asíntotas.**
1. Se simplifica: $f(x)=1-\dfrac{x-6}{x+2}=\dfrac{(x+2)-(x-6)}{x+2}=\dfrac{8}{x+2}$.
2. El denominador se anula en $x=-2$: **dominio $\mathbb R\setminus\{-2\}$.**
3. Vertical: $x=-2$. Horizontal: $y=\displaystyle\lim_{x\to\pm\infty}\dfrac{8}{x+2}=0$.

**Asíntotas: $x=-2$ e $y=0$.**

**b) Monotonía y curvatura.**
1. Primera derivada: $f'(x)=-\dfrac{8}{(x+2)^2}<0$ en todo el dominio.
2. Segunda derivada: $f''(x)=\dfrac{16}{(x+2)^3}$, positiva si $x>-2$ y negativa si $x<-2$.

**$f$ es decreciente en $(-\infty,-2)$ y en $(-2,+\infty)$; no tiene extremos relativos.** **Es convexa en $(-2,+\infty)$ ($f''>0$) y cóncava en $(-\infty,-2)$ ($f''<0$); no tiene puntos de inflexión** (en $x=-2$ no está definida).

**c) Gráfica.**
1. Es la hipérbola $y=\dfrac{8}{x+2}$ con asíntotas $x=-2$ e $y=0$.
2. Rama derecha ($x>-2$): por encima del eje, pasa por $(0,4)$ y $(2,2)$ y baja hacia $0$.
3. Rama izquierda ($x<-2$): por debajo del eje, pasa por $(-4,-4)$ y $(-6,-2)$.

**d) Tangentes de pendiente $-8$.**
1. $f'(x)=-8\iff\dfrac{8}{(x+2)^2}=8\iff(x+2)^2=1\iff x=-1$ o $x=-3$.
2. Para cada punto se usa $y-f(x_0)=f'(x_0)(x-x_0)$:
   - $x=-1$: $f(-1)=8$; tangente $y-8=-8(x+1)$, es decir, **$y=-8x$.**
   - $x=-3$: $f(-3)=-8$; tangente $y+8=-8(x+3)$, es decir, **$y=-8x-32$.**

![Hipérbola f(x)=8/(x+2) con asíntotas x=−2 e y=0 y las dos rectas tangentes de pendiente −8: y=−8x en (−1,8) e y=−8x−32 en (−3,−8)](fig/2026-ord-sup1-e2b.svg){fig-alt="Hipérbola f(x)=8/(x+2) con asíntotas x=−2 e y=0 y las dos rectas tangentes de pendiente −8: y=−8x en (−1,8) e y=−8x−32 en (−3,−8)" width="75%" fig-align="center"}

@@ 3A
**Datos.** $\sigma=2$, $n=81$, $\bar x=20$. Nivel $98{,}5\,\%$: $\Phi(z_{\alpha/2})=0{,}9925$ y en la tabla $\Phi(2{,}43)=0{,}9925$, luego $z_{\alpha/2}=2{,}43$.

**a) Intervalo y error máximo.**
1. Error máximo: $E=2{,}43\cdot\dfrac{2}{\sqrt{81}}=0{,}54$.
2. Intervalo: $\bar x\pm E$:
$$IC=(20-0{,}54,\ 20+0{,}54)=(19{,}46,\ 20{,}54).$$

**Error máximo $0{,}54$.**

**b) Tamaño mínimo para amplitud menor que $2{,}16$.**
1. La amplitud es $2E$: $2E<2{,}16\iff E<1{,}08$.
2. Se despeja $n$: $n>\left(\dfrac{2{,}43\cdot2}{1{,}08}\right)^2=20{,}25$.
3. Se redondea hacia arriba.

**Hace falta una muestra de al menos $n=21$.**

**c) Efecto de bajar el nivel de confianza.**
1. La amplitud es $2z_{\alpha/2}\dfrac{\sigma}{\sqrt n}$.
2. Al disminuir el nivel de confianza, $z_{\alpha/2}$ disminuye.

**La amplitud disminuye** (el intervalo es más estrecho, pero con menos confianza).

@@ 3B
**Datos previos.**
1. $P(B)=1-0{,}7=0{,}3$.
2. $P(A\cap B)=P(A)+P(B)-P(A\cup B)=0{,}4+0{,}3-0{,}58=0{,}12$.

**a) Independencia e incompatibilidad.**
1. Independientes si $P(A\cap B)=P(A)P(B)$: $P(A)P(B)=0{,}4\cdot0{,}3=0{,}12=P(A\cap B)$, luego **son independientes.**
2. Incompatibles si $P(A\cap B)=0$: $P(A\cap B)=0{,}12\neq0$, luego **no son incompatibles.**

**b) i) Alguno de los contrarios.**
1. Por De Morgan, $A^C\cup B^C=(A\cap B)^C$: $P\left(A^C\cup B^C\right)=1-P(A\cap B)=1-0{,}12=\mathbf{0{,}88}$.

**ii) $B$ sabiendo que no ocurre $A$.**
1. $P\left(B\mid A^C\right)=\dfrac{P(B)-P(A\cap B)}{1-P(A)}=\dfrac{0{,}3-0{,}12}{0{,}6}=\mathbf{0{,}3}$.

*Interpretación:* coincide con $P(B)$, como era de esperar por la independencia.

**iii) Uno y solo uno.**
1. Son dos casos incompatibles ($A$ sin $B$ y $B$ sin $A$), que se suman:
$$P(\text{uno y solo uno})=\left(0{,}4-0{,}12\right)+\left(0{,}3-0{,}12\right)=0{,}28+0{,}18=\mathbf{0{,}46}.$$

@@ 4
**a) Probabilidad de tardar menos de 15 minutos.**
1. $X\sim N(18,\ 4)$: se tipifica $Z=\dfrac{X-18}{4}$.
2. Se usa que $P(Z<-0{,}75)=1-P(Z<0{,}75)$ y se lee en la tabla $\Phi(0{,}75)=0{,}7734$:
$$P(X<15)=P\!\left(Z<\dfrac{15-18}{4}\right)=P(Z<-0{,}75)=1-P(Z<0{,}75)=1-0{,}7734=\mathbf{0{,}2266}.$$

*Interpretación:* algo más de $2$ de cada $10$ usuarios tardan menos de $15$ minutos.

**b) Al menos 110 sin incidencias.**
1. Sea $Y$ el número de usuarios, de $120$, que completan el trayecto sin incidencias: $Y\sim B(120;\ 0{,}9)$.
2. Comprobación: $np=108\ge5$ y $nq=12\ge5$, se aproxima por $Y'\sim N\!\left(108,\ \sqrt{120\cdot0{,}9\cdot0{,}1}\right)=N(108,\ 3{,}2863)$.
3. Corrección por continuidad y tabla ($\Phi(0{,}46)=0{,}6772$):
$$P(Y\ge110)=P(Y'>109{,}5)=P\!\left(Z>\frac{109{,}5-108}{3{,}2863}\right)=P(Z>0{,}46)=1-0{,}6772=\mathbf{0{,}3228}.$$
