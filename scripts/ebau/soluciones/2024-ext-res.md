@@ 1
**Planteamiento.**
1. Rectángulo de lados $x$ e $y$ con área $xy=25$, luego $y=25/x$ (con $x>0$).
2. Las dos diagonales de un rectángulo miden lo mismo, $d=\sqrt{x^2+y^2}$, así que el producto de las dos es $d^2=x^2+\dfrac{625}{x^2}$.
3. Hay que minimizar $g(x)=x^2+\dfrac{625}{x^2}$ en $(0,+\infty)$.

**Optimización.**
1. Derivada: $g'(x)=2x-\dfrac{1250}{x^3}$.
2. Se iguala a cero: $2x^4=1250\Rightarrow x^4=625\Rightarrow x=5$ (solo la raíz positiva tiene sentido).
3. Tipo de punto: $g'<0$ si $x<5$ y $g'>0$ si $x>5$, luego es un mínimo.
4. El otro lado: $y=\dfrac{25}{5}=5$.

**El rectángulo es un cuadrado de $5\times5$ cm** (producto de diagonales mínimo: $50$ cm²).

@@ 2
**a) Parámetros para la asíntota oblicua $y=x-2$.**
1. Se divide el numerador entre el denominador: $\dfrac{ax^3+x-1}{x^2+bx-3}=ax-ab+\dfrac{(ab^2+3a+1)x-3ab-1}{x^2+bx-3}$.
2. El resto tiende a $0$ en el infinito, así que la asíntota oblicua es $y=ax-ab$.
3. Se identifica con $y=x-2$: $a=1$ y $-ab=-2$, es decir, $ab=2$.
4. Con $a=1$, $b=2$.

$$\mathbf{a=1,\ b=2}$$

**b) Asíntotas verticales con $a=0$ y $b=2$.**
1. La función es $f(x)=\dfrac{x-1}{x^2+2x-3}=\dfrac{x-1}{(x-1)(x+3)}$. El denominador se anula en $x=1$ y $x=-3$.
2. En $x=1$ el factor $x-1$ se simplifica: $\lim_{x\to1}f(x)=\dfrac14$, finito (discontinuidad evitable), así que no hay asíntota.
3. En $x=-3$ no se simplifica: $\lim_{x\to-3^+}f=+\infty$ y $\lim_{x\to-3^-}f=-\infty$.

**Única asíntota vertical: $x=-3$.**

@@ 3
**Integral de una función a trozos.**
1. Se parte en el punto de cambio, $x=0$: $\int_{-\pi}^{\pi}f=\int_{-\pi}^{0}(1-e^x)\,dx+\int_0^{\pi}x\cos x\,dx$.
2. Primer trozo:
$$\int_{-\pi}^{0}(1-e^x)\,dx=\Big[x-e^x\Big]_{-\pi}^{0}=-1-(-\pi-e^{-\pi})=\pi-1+e^{-\pi}.$$
3. Segundo trozo, por partes ($u=x$, $dv=\cos x\,dx$): $\int_0^{\pi}x\cos x\,dx=\big[x\operatorname{sen}x+\cos x\big]_0^{\pi}=-1-1=-2$.
4. Se suman:

$$\int_{-\pi}^{\pi}f(x)\,dx=\mathbf{\pi-3+e^{-\pi}}\approx 0{,}185.$$

@@ 4
**Primitiva con condición.**
1. Cambio sugerido: $x-1=t^2$, luego $dx=2t\,dt$, $(x-1)^2=t^4$ y $\ln\dfrac{\sqrt{x-1}}{2}=\ln\dfrac t2$ (con $t>0$ porque $x>1$).
2. La integral queda $2\int t^5\ln\dfrac t2\,dt$. Se hace por partes con $u=\ln\dfrac t2$ y $dv=t^5\,dt$:
$$\int (x-1)^2\ln\frac{\sqrt{x-1}}2\,dx=2\int t^5\ln\frac t2\,dt=\frac{t^6}{3}\ln\frac t2-\int\frac{t^5}{3}\,dt=\frac{t^6}{3}\ln\frac t2-\frac{t^6}{18}+C.$$
3. Se deshace el cambio ($t^6=(x-1)^3$): $F(x)=\dfrac{(x-1)^3}{3}\ln\dfrac{\sqrt{x-1}}2-\dfrac{(x-1)^3}{18}+C$.
4. Condición $F(5)=-\dfrac72$: con $x=5$, $t=2$ y $\ln\dfrac22=\ln1=0$:
$F(5)=\frac{64}{3}\ln1-\frac{64}{18}+C=-\frac{32}{9}+C=-\frac72\Rightarrow C=\frac1{18}$.

$$\mathbf{F(x)=\frac{(x-1)^3}{3}\ln\frac{\sqrt{x-1}}2-\frac{(x-1)^3}{18}+\frac1{18}}$$

@@ 5
**a) Determinante con propiedades.** Sea $D$ el determinante pedido.
1. La fila 1 es $(x,y,z)-(1,1,1)$ y la fila 3 es $(3,0,2)+(1,1,1)$; la fila 2 es $(1,1,1)$.
2. **Linealidad en filas:** el determinante se descompone en suma de determinantes. Los que contienen la fila $(1,1,1)$ dos veces valen $0$ (**dos filas iguales**), así que solo queda el término con $(x,y,z)$ y $(3,0,2)$:
$$D=\begin{vmatrix}x&y&z\\1&1&1\\3&0&2\end{vmatrix}.$$
3. **Intercambio de dos filas:** pasar la fila $(3,0,2)$ al lugar 2 y la $(1,1,1)$ al 3 cambia el signo:
$$D=-\begin{vmatrix}x&y&z\\3&0&2\\1&1&1\end{vmatrix}=-|A|$$
4. Con $|A|=5$:

$$\mathbf{D=-5}$$

**b) Ecuación $B\cdot A=C$.**
1. Producto fila por matriz: $B\cdot A=(x+3y+z,\ y+z,\ 2y+2z)$.
2. Se iguala a $C=(3,0,0)$: $x+3y+z=3$, $y+z=0$ y $2y+2z=0$ (la tercera repite la segunda).
3. Con $z=\lambda$: $y=-\lambda$ y $x=3-3y-z=3+3\lambda-\lambda=3+2\lambda$.

$$\mathbf{(x,y,z)=(3+2\lambda,\,-\lambda,\,\lambda),\ \lambda\in\mathbb{R}}$$

(infinitas soluciones).

@@ 6
**Planteamiento.** Pasando $mI$ al otro miembro, el sistema es $(A-mI)\vec x=\vec 0$, **homogéneo**: siempre tiene la solución trivial (compatible).
1. Será compatible indeterminado (SCI) si hay más soluciones, es decir, si $|A-mI|=0$.
2. Determinante: $|A-mI|=-m(m-2)^2$.
3. Se anula en $m=0$ y $m=2$.

**a) Valores de $m$ con SCI.**
1. Para $m=0$ y para $m=2$ el rango de la matriz de coeficientes es $2<3$.
2. Para cualquier otro $m$, el rango es $3$ y solo hay la solución trivial.

**Es SCI para $m=0$ y $m=2$**; para cualquier otro $m$ es compatible determinado (SCD), sólo con la solución trivial.

**b) Resolución para $m=2$.**
1. El sistema queda $\begin{cases}3x-2y-3z=0\\2x-2y-2z=0\\3x-2y-3z=0\end{cases}$; la tercera repite la primera, así que se queda con dos ecuaciones: $\begin{cases}3x-2y-3z=0\\2x-2y-2z=0\end{cases}$.
2. De la segunda, $x=y+z$.
3. En la primera: $3y+3z-2y-3z=y=0$. Así $x=z$.

$$\mathbf{(x,y,z)=(\lambda,0,\lambda),\ \lambda\in\mathbb{R}}$$

@@ 7
**Datos.**
1. $r$: punto $(0,-a,-1)$ (con $x=0$) y dirección $\vec d_r=(1,1,2)$.
2. $s$: con $y=\mu$, de $x-2y=3a$ y $x+z=2$: $(x,y,z)=(3a+2\mu,\ \mu,\ 2-3a-2\mu)$. Punto $(3a,0,2-3a)$ y dirección $\vec d_s=(2,1,-2)$.

**a) Valor de $a$ para que se corten.**
1. No son paralelas: $\vec d_r$ y $\vec d_s$ no son proporcionales.
2. Se cortan si son coplanarias: $\big[\overrightarrow{P_rP_s},\vec d_r,\vec d_s\big]=0$, con $\overrightarrow{P_rP_s}=(3a,a,3-3a)$.
3. $\vec d_r\times\vec d_s=(-4,6,-1)$ y el producto mixto es el producto escalar:
$$-12a+6a-3+3a=-3a-3=0\ \Rightarrow\ \mathbf{a=-1}.$$

**b) Recta perpendicular común con $a=-1$.**
1. Con $a=-1$ las rectas se cortan en un punto: $r\,(t,\,1+t,\,-1+2t)$ y $s\,(-3+2\mu,\,\mu,\,5-2\mu)$.
2. Igualando: $t=1$, $\mu=2$, punto $(1,2,1)$.
3. La recta perpendicular a ambas tiene la dirección de $\vec d_r\times\vec d_s=(-4,6,-1)$ y pasa por el punto de corte:

$$\mathbf{(x,y,z)=(1,2,1)+\lambda(-4,6,-1)}\ \ \text{es decir}\ \ \frac{x-1}{-4}=\frac{y-2}{6}=\frac{z-1}{-1}.$$

@@ 8
**Datos.** $\vec u\cdot\vec v=-2+a+2a=3a-2$ y $|\vec u|=|\vec v|=\sqrt{5+a^2}$ (para $\vec u$: $1+a^2+4$; para $\vec v$: $4+1+a^2$).

**a) Ángulo de $\pi/3$.**
1. $\cos\dfrac\pi3=\dfrac{\vec u\cdot\vec v}{|\vec u||\vec v|}=\dfrac{3a-2}{5+a^2}=\dfrac12$.
2. $6a-4=5+a^2\Rightarrow a^2-6a+9=0\Rightarrow(a-3)^2=0$.

$\mathbf{a=3}$ (comprobación: $7/14=1/2$).

**b) Ortogonalidad.**
1. $\vec u\times\vec v$ es perpendicular a $\vec u$, luego $(\vec u\times\vec v)\cdot\vec u=0$.
2. Entonces $\big((\vec u\times\vec v)-\vec v\big)\cdot\vec u=0-\vec v\cdot\vec u=0\Rightarrow3a-2=0$:

$$\mathbf{a=\tfrac23}.$$
