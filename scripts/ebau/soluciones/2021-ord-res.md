@@ 1
**a) Valores de $a$ y $b$.**
1. $f$ es derivable, luego es continua; empezamos por $x=0$, donde cambia la expresión.
2. Continuidad en $0$: $\displaystyle\lim_{x\to0^-}\frac{ax+b}{x-1}=-b$ y $\ln1=0$, luego $b=0$.
3. Derivabilidad en $0$: para $x<0$, $f'(x)=\dfrac{-a-b}{(x-1)^2}$, con $f'(0^-)=-a$; para $x>0$, $f'(x)=\dfrac1{1+x}$, con $f'(0^+)=1$.
4. Las derivadas laterales deben coincidir: $-a=1$.

**$a=-1,\ b=0$**

**b) Tangente y normal en $x=2$.**
1. En $x=2>0$ la función es $\ln(1+x)$: $f(2)=\ln3$ y $f'(2)=\frac13$.
2. Tangente: $y-f(2)=f'(2)(x-2)$.
3. Normal: es perpendicular a la tangente, con pendiente $-\dfrac{1}{f'(2)}=-3$.

Tangente: **$y=\ln3+\dfrac13(x-2)$**. Normal: **$y=\ln3-3(x-2)$**.

@@ 2
1. **Derivada.** $f'(x)=b\cos x+2c\cos2x$.
2. **Punto crítico en $x=\pi$.** $f'(\pi)=-b+2c=0$.
3. **Normal en $x=0$.** La normal $y=-\frac12x+3$ tiene pendiente $-\frac12$, luego la tangente tiene pendiente $2$ (producto de pendientes $=-1$): $f'(0)=b+2c=2$.
4. **Valor en $x=0$.** La normal pasa por $(0,3)$, que está en la gráfica: $f(0)=a=3$.
5. **Sistema.** De las dos ecuaciones en $b$ y $c$: $b=1$, $c=\frac12$.

**$a=3,\ b=1,\ c=\dfrac12$**

@@ 3
**a) Crecimiento, decrecimiento y extremos.**
1. Dominio $(0,+\infty)$. Derivada: $f'(x)=\dfrac{2\ln x}{x}$.
2. Se anula en $x=1$. El denominador $x$ es positivo, así que el signo lo da $\ln x$.
3. $f'<0$ si $0<x<1$ y $f'>0$ si $x>1$.

**Decrece en $(0,1)$ y crece en $(1,+\infty)$; mínimo relativo en $x=1$ con valor $f(1)=0$.**

**b) Área.**
1. $f(x)=\ln^2x\ge0$, así que el área es la integral entre $x=1$ y $x=e$.
2. Primitiva, integrando por partes (dos veces): $\displaystyle\int\ln^2x\,dx=x\ln^2x-2x\ln x+2x$.
3. Regla de Barrow:

$$A=\bigl[x\ln^2x-2x\ln x+2x\bigr]_1^e=(e-2e+2e)-2=e-2.$$

**$A=e-2\approx0{,}718\ \text{u}^2$**

@@ 4
1. **Cambio de variable.** $t=\sqrt{e^x}=e^{x/2}$, de donde $x=2\ln t$ y $dx=\dfrac{2}{t}\,dt$.
2. **Límites nuevos.** $x=0\to t=1$ y $x=2\to t=e$.
3. **Integral transformada.** Se descompone en fracciones simples, $\dfrac{1}{t(1+t)}=\dfrac1t-\dfrac1{1+t}$.
4. **Cálculo.**
$$I=\int_1^e\frac{2}{t(1+t)}\,dt=2\int_1^e\left(\frac1t-\frac1{1+t}\right)dt=2\left[\ln\frac{t}{1+t}\right]_1^e=2\left(\ln\frac{e}{1+e}+\ln2\right).$$
5. Se simplifica: $\ln e=1$.

**$I=2-2\ln(1+e)+2\ln2\approx0{,}760$**

@@ 5
**a) Infinitas soluciones.**
1. El sistema es homogéneo: siempre es compatible. Tendrá infinitas soluciones si $|A|=0$.
2. Determinante: $\begin{vmatrix}1&1&2\\3&-1&-2\\-1&2&m\end{vmatrix}=-4(m-4)$.
3. Es nulo cuando **$m=4$** (el rango es $2$, menor que el número de incógnitas).
4. Resolución con $m=4$: sumando las dos primeras, $x+y+2z=0$ y $3x-y-2z=0$ dan $4x=0\Rightarrow x=0$ y $y=-2z$. La tercera ecuación se cumple: $2y+4z=0$.

**$(x,y,z)=(0,-2\lambda,\lambda),\ \lambda\in\mathbb{R}$**

**b) Solución con $z=1$ para $m=2$.**
1. Para $m=2$: $|A|=-4(2-4)=8\neq0$.
2. Un sistema homogéneo con determinante no nulo solo tiene la solución trivial $(0,0,0)$.

**No existe ninguna solución con $z=1$.**

@@ 6
**Dato.** $|A|=2$.

**a) $\left|\tfrac13A^{-1}A^t\right|$.**
1. Para una matriz de orden $3$: $|kM|=k^3|M|$, así que sale $\left(\tfrac13\right)^3$.
2. $|A^{-1}|=\dfrac1{|A|}$ y $|A^t|=|A|$.
3. $\left|\tfrac13A^{-1}A^t\right|=\left(\tfrac13\right)^3\cdot\dfrac1{|A|}\cdot|A^t|=\dfrac1{27}\cdot\dfrac12\cdot2=$ **$\dfrac1{27}$**.

**b) Los dos determinantes.**

*Primero:*
1. Se intercambian las columnas 1 y 3: el determinante cambia de signo, y queda con filas $(2a,2b,6c)$, $(d,e,3f)$, $(1,2,9)$.
2. Se saca factor $2$ de la fila 1 y factor $3$ de la columna 3: queda $|A|$ multiplicado por $2\cdot3$.
3. Vale $-(2\cdot3)\,|A|=$ **$-12$**.

*Segundo:*
1. La columna 1 es $2\bigl[(a,d,1)-(b,e,2)\bigr]$. Sumando a la columna 1 el doble de la columna 3, $(b,e,2)$, queda $2\,(a,d,1)$ (el determinante no cambia).
2. Se saca el factor $2$ de la columna 1: queda $2\,\bigl|(a,d,1),(c,f,3),(b,e,2)\bigr|$.
3. Las columnas son las de $A$ con las columnas 2 y 3 intercambiadas, así que ese determinante es $-|A|$.
4. Vale $2\cdot(-|A|)=$ **$-4$**.

@@ 7
1. **Direcciones.** $\vec u=(1,2,1)$ para $r$. Para $s$: $(1,-1,1)\times(3,-1,-1)=(2,4,2)\parallel\vec u$: las rectas son paralelas.
2. **Puntos.** Un punto de $r$: $R(0,-2,1)$. Un punto de $s$ (tomando $x=0$): $S(0,1,3)$, que no está en $r$ (las rectas no coinciden).
3. **Lado del cuadrado.** Dos lados paralelos de un cuadrado distan lo que mide el lado, luego es la distancia entre ambas rectas.
4. **Distancia.**
$$d=\frac{|\overrightarrow{RS}\times\vec u|}{|\vec u|}=\frac{|(0,3,2)\times(1,2,1)|}{\sqrt6}=\frac{|(-1,2,-3)|}{\sqrt6}=\sqrt{\frac{14}{6}}.$$
5. Área del cuadrado $=d^2$.

**Área $=d^2=\dfrac73\ \text{u}^2$**

@@ 8
**Datos.** $r$: punto $R(1,1,2)$, dirección $(1,1,m)$. $s$: de $x+z=2$ y $x-y+2z=3$ resulta $y=z-1$; con $z=\mu$: $(2-\mu,\,\mu-1,\,\mu)$, punto $S(2,-1,0)$, dirección $(-1,1,1)$.

**a) Posición relativa.**
1. Las direcciones $(1,1,m)$ y $(-1,1,1)$ nunca son proporcionales (sus dos primeras componentes lo impiden): no son paralelas ni coincidentes.
2. $\overrightarrow{RS}=(1,-2,-2)$ y se estudia el determinante con las dos direcciones: $\begin{vmatrix}1&1&m\\-1&1&1\\1&-2&-2\end{vmatrix}=m-1$.
3. Casos:
   - $m\neq1$: **se cruzan**.
   - $m=1$: **se cortan** en un punto.

**b) Coseno del ángulo para $m=1$.**
1. Direcciones: $\vec u=(1,1,1)$ y $\vec v=(-1,1,1)$.
2. Producto escalar $\vec u\cdot\vec v=1$ y módulos $\sqrt3$ cada uno.

$$\cos\alpha=\frac{|\vec u\cdot\vec v|}{|\vec u||\vec v|}=\frac{1}{\sqrt3\sqrt3}=\mathbf{\frac13}.$$
