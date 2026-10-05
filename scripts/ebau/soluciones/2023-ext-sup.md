@@ 1
**a) Valor de $a$.**
1. Derivada del cociente: $f'(x)=\dfrac{\frac{3x+4}{x+1}-3\left(\ln(x+1)+a\right)}{(3x+4)^{2}}$.
2. En $x=0$: $f'(0)=\dfrac{4-3a}{16}$.
3. Se impone pendiente $1$: $\dfrac{4-3a}{16}=1\Rightarrow4-3a=16$.

**$a=-4$**.

**b) Asíntotas para $a=0$.**
1. Función: $f(x)=\dfrac{\ln(x+1)}{3x+4}$, con dominio $(-1,+\infty)$ (el denominador $3x+4$ solo se anula en $x=-\tfrac43$, fuera del dominio).
2. Vertical: $\displaystyle\lim_{x\to-1^+}f(x)=\dfrac{-\infty}{1}=-\infty$, luego **$x=-1$ es asíntota vertical**.
3. Horizontal: $\displaystyle\lim_{x\to+\infty}\dfrac{\ln(x+1)}{3x+4}=0$ (el logaritmo crece más despacio que cualquier recta), luego **$y=0$ es asíntota horizontal** en $+\infty$.
4. Oblicua: no hay, porque existe la horizontal.

@@ 2
**Lata cilíndrica de $20$ L con chapa mínima.**
1. **Capacidad.** $20\ \text{L}=20\ \text{dm}^3$: $\pi r^{2}h=20\Rightarrow h=\dfrac{20}{\pi r^{2}}$.
2. **Superficie con tapas.** $S(r)=2\pi r^{2}+2\pi rh=2\pi r^{2}+\dfrac{40}{r}$.
3. **Derivada.** $S'(r)=4\pi r-\dfrac{40}{r^{2}}=0\Rightarrow r^{3}=\dfrac{10}{\pi}$.
4. **Es mínimo.** $S''(r)=4\pi+\dfrac{80}{r^{3}}>0$.
5. **Altura.** $h=\dfrac{20}{\pi r^{2}}=2r$.

**$r=\sqrt[3]{10/\pi}\approx1{,}47\ \text{dm}$ y $h=2r\approx2{,}94\ \text{dm}$** (altura igual al diámetro).

@@ 3
**Primitiva con condición inicial.**
1. **Cambio de variable.** Con $x=t^{2}$, $dx=2t\,dt$: $\int\operatorname{arctg}\sqrt{x}\,dx=\int2t\operatorname{arctg}t\,dt$.
2. **Por partes** ($u=\operatorname{arctg}t$, $dv=2t\,dt$): $=t^{2}\operatorname{arctg}t-\int\dfrac{t^{2}}{1+t^{2}}dt=t^{2}\operatorname{arctg}t-t+\operatorname{arctg}t+C$ (porque $\dfrac{t^{2}}{1+t^{2}}=1-\dfrac1{1+t^{2}}$).
3. **Se deshace el cambio** ($t=\sqrt x$): $F(x)=(x+1)\operatorname{arctg}\sqrt{x}-\sqrt{x}+C$.
4. **Condición** $F(0)=1$: $F(0)=C=1$.

**$F(x)=(x+1)\operatorname{arctg}\sqrt{x}-\sqrt{x}+1$.**

@@ 4
**Área bajo $\ln(x+1)$.**
1. $\ln(x+1)=0\iff x=0$, y $f\ge0$ en $[0,e-1]$, así que el área es la integral.
2. Primitiva por partes ($u=\ln(x+1)$, $dv=dx$): $(x+1)\ln(x+1)-x$.
3. Barrow:
$$A=\int_0^{e-1}\ln(x+1)\,dx=\Big[(x+1)\ln(x+1)-x\Big]_0^{e-1}=e-(e-1)-0.$$

**Área $=1\ \text{u}^2$.**

@@ 5
**Ecuación matricial.**
1. Se agrupan los términos con $X$: $3X-B^{t}=AX\Rightarrow3X-AX=B^{t}\Rightarrow(3I-A)X=B^{t}$.
2. Matriz: $3I-A=\begin{pmatrix}1&1&2\\2&0&-1\\-6&-1&0\end{pmatrix}$ y $|3I-A|=1\neq0$, luego es invertible.
3. Se multiplica por la izquierda por $(3I-A)^{-1}$ (la incógnita está a la derecha):
$$(3I-A)^{-1}=\begin{pmatrix}-1&-2&-1\\6&12&5\\-2&-5&-2\end{pmatrix}.$$
4. Producto con $B^{t}$:
$$X=(3I-A)^{-1}B^{t}=\begin{pmatrix}-1&-2&-1\\6&12&5\\-2&-5&-2\end{pmatrix}\begin{pmatrix}-1&-3\\0&-1\\-1&5\end{pmatrix}.$$

**$X=\begin{pmatrix}2&0\\-11&-5\\4&1\end{pmatrix}$.**

@@ 6
1. **Incógnitas.** $a$, $c$ y $m$ son las series de animación, ciencia ficción y comedia, y $T=a+c+m$ el total.
2. **Sistema.** Cada frase del enunciado es una ecuación:
$$\begin{cases}0{,}3a+0{,}5c=0{,}2(a+c+m)\\0{,}25a+0{,}5c+0{,}6m=0{,}5(a+c+m)\\c=a+100\end{cases}\iff\begin{cases}a+3c-2m=0\\-0{,}25a+0{,}1m=0\\c-a=100\end{cases}$$
3. **Segunda ecuación.** $-0{,}25a+0{,}1m=0\Rightarrow m=2{,}5a$.
4. **Primera ecuación.** Con $c=a+100$ y $m=2{,}5a$: $a+3(a+100)-5a=0\Rightarrow a=300$.
5. **Resto.** $c=400$ y $m=750$.
6. **Comprobación.** Total $1450$ y $0{,}3\cdot300+0{,}5\cdot400=290=0{,}2\cdot1450$.

**Animación: 300; ciencia ficción: 400; comedia: 750** (total 1450).

@@ 7
**Puntos de $r$ equidistantes de $OYZ$ y $OXZ$.**
1. **Puntos de la recta.** De $x-y+z=0$ y $x+3y=1$: $x=1-3y$ y $z=y-x=4y-1$. Los puntos son $(1-3y,\,y,\,4y-1)$.
2. **Distancias.** Al plano $OYZ$ ($x=0$): $|x|$. Al plano $OXZ$ ($y=0$): $|y|$.
3. **Igualdad.** $|1-3y|=|y|$:
   - $1-3y=y\Rightarrow y=\tfrac14$.
   - $1-3y=-y\Rightarrow y=\tfrac12$.
4. **Puntos.** Se sustituye cada $y$ en $(1-3y,\,y,\,4y-1)$.

**Puntos: $\left(\tfrac14,\tfrac14,0\right)$ y $\left(-\tfrac12,\tfrac12,1\right)$.**

@@ 8
**a) Plano paralelo a $r$ que contiene a la otra recta.**
1. Dirección de $r$ (producto vectorial de las normales): $(1,-1,1)\times(3,0,-2)=(2,5,3)$.
2. La otra recta, $-x+1=y=\dfrac{z-3}{2}$, tiene dirección $(-1,1,2)$ y pasa por $(1,0,3)$.
3. Normal del plano (perpendicular a ambas direcciones): $(2,5,3)\times(-1,1,2)=(7,-7,7)\parallel(1,-1,1)$.
4. Plano $x-y+z=d$ con el punto $(1,0,3)$: $d=4$.

**$x-y+z=4$.**

**b) Distancia entre la recta $r$ y el plano $2x+5y+3z=41$.**
1. El vector normal del plano es $(2,5,3)$, que coincide con la dirección de $r$.
2. Por tanto la recta es perpendicular al plano y lo corta, así que **la distancia es $0$**.

*Nota: el enunciado coincide con el examen oficial. Con estos datos $r$ es perpendicular al plano (no paralela) y lo corta, así que la distancia es nula; probablemente es una errata del examen.*
