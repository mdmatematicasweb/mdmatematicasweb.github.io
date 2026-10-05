@@ 1
**a) Horas de cada persona.**
1. Sean $a$, $b$ y $c$ las horas de Ana, Bruno y Carla, y $T=a+b+c$ el total. Los datos dan: $a=\dfrac T3$; $a+b=c+6$; $c=b+4$.
2. Se sustituye $c=b+4$ en la segunda: $a+b=b+4+6\Rightarrow a=10$.
3. Entonces $T=3a=30$ y $b+c=20$. Con $c=b+4$: $2b+4=20\Rightarrow b=8$ y $c=12$.

**Ana $10$ horas, Bruno $8$ horas y Carla $12$ horas.** Comprobación: $10+8=18=12+6$.

**b) Coste para la empresa.**
1. Total de horas: $30$. Salarios: $30\cdot25=750$ €.
2. Seguros sociales: $23{,}6\,\%$ de $750$ €, es decir, $177$ €.
3. Coste total: $750\cdot1{,}236=927$.

**La empresa tiene que abonar $927$ €.**

@@ 2
1. **Incógnitas.** $x$ = cajas «El regalo de la tierra» e $y$ = cajas «El tesoro de la huerta» a la semana.
2. **Restricciones.**
   - Frutas: $3x+2y\le150$.
   - Hortalizas: $3{,}5x+4y\le210$.
   - Mínimos de venta: $x\ge12$ e $y\ge15$.
3. **Función objetivo.** Ingreso: $I(x,y)=19{,}75x+18{,}5y$.
4. **Vértices:** $(12,15)$, $(12,42)$ (corte de $x=12$ con $3{,}5x+4y=210$), $(36,21)$ (corte de $3x+2y=150$ con $3{,}5x+4y=210$) y $(40,15)$ (corte de $3x+2y=150$ con $y=15$).
5. **Valor de $I$ en cada vértice:**

| Vértice | $(12,15)$ | $(12,42)$ | $(36,21)$ | $(40,15)$ |
|---|---|---|---|---|
| $I$ | $514{,}5$ | $1\,014$ | $1\,099{,}5$ | $1\,067{,}5$ |

![Región factible del ejercicio 2 (2025-ord-sup1-b), con sus vértices: (12, 15), (40, 15), (36, 21), (12, 42)](fig/2025-ord-sup1-b-e2.svg){fig-alt="Región factible del ejercicio 2 (2025-ord-sup1-b), con sus vértices: (12, 15), (40, 15), (36, 21), (12, 42)" width="75%" fig-align="center"}

6. **Conclusión.** El máximo es $1\,099{,}5$, en $(36,21)$ (se agotan frutas y hortalizas).

**Debe vender 36 cajas de «El regalo de la tierra» y 21 de «El tesoro de la huerta», con un ingreso máximo de $1\,099{,}50$ €.**

@@ 3
**a) Intervalo sin beneficios.**
1. Se simplifica: $B(t)=\dfrac{3t-(t+2)}{t+2}=\dfrac{2t-2}{t+2}$.
2. El denominador es positivo, así que el signo lo da $2t-2$: negativa para $t<1$, nula en $t=1$ y positiva para $t>1$.

**No tiene beneficios en el intervalo $[0,1]$** (pérdidas hasta el año $1$ y beneficio nulo en $t=1$).

**b) Máximo beneficio.**
1. Derivada: $B'(t)=\dfrac{3(t+2)-3t}{(t+2)^2}=\dfrac{6}{(t+2)^2}>0$.
2. $B$ es creciente, luego el máximo está en el extremo $t=10$: $B(10)=\dfrac{30}{12}-1=\dfrac{3}{2}$.

**El máximo beneficio se alcanza a los $10$ años y asciende a $1{,}5$ millones de euros.**

**c) Beneficio de $800\,000$ €.**
1. En millones, $B(t)=0{,}8\iff\dfrac{3t}{t+2}=1{,}8$.
2. Se despeja: $3t=1{,}8t+3{,}6\iff1{,}2t=3{,}6\iff t=3$.

**Han de pasar $3$ años.**

**d) Beneficio a largo plazo.**
1. $\displaystyle\lim_{t\to+\infty}B(t)=\lim_{t\to+\infty}\left(\frac{3t}{t+2}-1\right)=3-1=2$.

**El beneficio tendería a $2$ millones de euros** (asíntota horizontal $y=2$).

@@ 4
**a) Crecimiento y extremos.**
1. Derivada: $V'(t)=12t^2-48t+36=12(t-1)(t-3)$, con raíces $t=1$ y $t=3$.
2. Signo de $V'$:
   - $V'>0$ en $(0,1)$ y en $(3,6)$: **las ventas crecen.**
   - $V'<0$ en $(1,3)$: **las ventas decrecen.**
3. Valores: $V(0)=100$, $V(1)=116$, $V(3)=100$, $V(6)=316$.

**Máximo relativo en $(1,116)$ y mínimo relativo en $(3,100)$.** En el intervalo $[0,6]$: **máximo absoluto $316$ en $t=6$ y mínimo absoluto $100$ (en $t=0$ y en $t=3$).**

**b) Gráfica.**
1. Cúbica que parte de $(0,100)$, sube hasta el máximo $(1,116)$, baja hasta el mínimo $(3,100)$ y vuelve a subir hasta $(6,316)$.

**c) Área.**
1. $V>0$ en $[0,6]$ (su mínimo es $100$), así que el área es la integral.
2. Barrow:
$$A=\int_0^6\left(4t^3-24t^2+36t+100\right)dt=\left[t^4-8t^3+18t^2+100t\right]_0^6=1\,296-1\,728+648+600=816.$$

**$A=816$ u$^2$** (miles de euros por año).

![Ventas V(t) en [0,6]: parte de 100, máximo relativo 116 en t=1, mínimo relativo 100 en t=3 y llega a 316 en t=6; sombreada el área bajo la curva](fig/2025-ord-sup1-b-e4.svg){fig-alt="Ventas V(t) en [0,6]: parte de 100, máximo relativo 116 en t=1, mínimo relativo 100 en t=3 y llega a 316 en t=6; sombreada el área bajo la curva" width="75%" fig-align="center"}

@@ 5
1. **Sucesos y datos.** Sea $O$ «operario» ($1-0{,}2-0{,}35=0{,}45$), $I$ «ingeniero» ($0{,}35$), $D$ «directivo» ($0{,}2$) y $M$ «mujer»: $P(M\mid O)=0{,}2$, $P(M\mid I)=0{,}4$, $P(M\mid D)=0{,}3$.

**a) No operario y mujer.**
1. Se suman los dos colectivos que no son operarios:
$$P(O^C\cap M)=0{,}35\cdot0{,}4+0{,}2\cdot0{,}3=0{,}14+0{,}06=\mathbf{0{,}2}.$$

**b) Mujer si no es operario.**
1. $P(O^C)=0{,}35+0{,}2=0{,}55$.
2. $P(M\mid O^C)=\dfrac{0{,}2}{0{,}55}=\dfrac{4}{11}\approx\mathbf{0{,}3636}$.

**c) Colectivo más probable si es hombre.**
1. Hombres por colectivo: $P(O\cap H)=0{,}45\cdot0{,}8=0{,}36$, $P(I\cap H)=0{,}35\cdot0{,}6=0{,}21$, $P(D\cap H)=0{,}2\cdot0{,}7=0{,}14$.
2. Total: $P(H)=0{,}36+0{,}21+0{,}14=0{,}71$.
3. Bayes:
$$P(O\mid H)=\frac{0{,}36}{0{,}71}\approx0{,}507,\quad P(I\mid H)=\frac{0{,}21}{0{,}71}\approx0{,}296,\quad P(D\mid H)=\frac{0{,}14}{0{,}71}\approx0{,}197.$$

**Es más probable que pertenezca al colectivo de los operarios** ($\approx50{,}7\,\%$).

@@ 6
**Datos.** $\bar x=\dfrac{2\,404{,}5}{30}=80{,}15$ g, $\sigma=1$ g, $n=30$.

**Valor crítico.** Nivel $99\,\%$: $\Phi(z_{\alpha/2})=0{,}995$, que está entre $\Phi(2{,}57)=0{,}9949$ y $\Phi(2{,}58)=0{,}9951$. Se toma el punto medio, $z_{\alpha/2}=2{,}575$.

**a) Intervalo.**
1. Error máximo: $E=2{,}575\cdot\dfrac{1}{\sqrt{30}}=0{,}4701$.
2. Intervalo:
$$IC=(80{,}15-0{,}4701,\ 80{,}15+0{,}4701)=(79{,}6799,\ 80{,}6201).$$

*Interpretación:* con confianza del $99\,\%$, el peso medio de las latas está entre $79{,}68$ y $80{,}62$ g.

**b) Tamaño mínimo.**
1. Se impone $E<0{,}3$ y se despeja $n$: $E<0{,}3\iff n>\left(\dfrac{2{,}575\cdot1}{0{,}3}\right)^2=73{,}67$.
2. Se redondea hacia arriba.

**Hace falta una muestra de al menos $n=74$ latas.**

**c) Efecto sobre el error máximo.**
1. El error es $E=z_{\alpha/2}\dfrac{\sigma}{\sqrt n}$.
2. **Si aumenta $n$, $\sqrt n$ aumenta y el error disminuye.**
3. **Si aumenta el nivel de confianza (con $n$ fijo), $z_{\alpha/2}$ aumenta y el error aumenta.**

@@ 7
**a) Varianza de las medias muestrales de tamaño 2.**
1. Media poblacional: $\mu=\dfrac{-4-2+1+4+6}{5}=1$.
2. Varianza poblacional: $\sigma^2=\dfrac{25+9+0+9+25}{5}=\dfrac{68}{5}=13{,}6$.
3. La varianza de las medias muestrales es la poblacional dividida entre el tamaño de la muestra: $\sigma_{\bar x}^2=\dfrac{\sigma^2}{2}=\dfrac{13{,}6}{2}=6{,}8$.

**$\sigma_{\bar x}^2=6{,}8$.**

**b) Muestreo estratificado.**
1. Fracción muestreada: $\dfrac{2\,000}{10\,000}=0{,}2$.
2. Niveles: ejecutivo $1\,000$, medio $3\,000$ y operativo $10\,000-1\,000-3\,000=6\,000$.
3. En cada nivel se aplica $0{,}2$ y se reparte según el porcentaje de mujeres (en el nivel medio, $100-55=45\,\%$):

| Nivel | Empleados | Muestra | Mujeres (%) | Hombres | Mujeres |
|---|---|---|---|---|---|
| Ejecutivo | $1\,000$ | $200$ | $30\,\%$ | $140$ | $60$ |
| Medio | $3\,000$ | $600$ | $45\,\%$ | $330$ | $270$ |
| Operativo | $6\,000$ | $1\,200$ | $55\,\%$ | $540$ | $660$ |

**Deben seleccionarse $200$, $600$ y $1\,200$ empleados en los niveles ejecutivo, medio y operativo, respectivamente; en cada uno: $140$ hombres y $60$ mujeres, $330$ hombres y $270$ mujeres, y $540$ hombres y $660$ mujeres.**
