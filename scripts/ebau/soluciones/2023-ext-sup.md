@@ 1
**a)** $f'(x)=\dfrac{\frac{3x+4}{x+1}-3\left(\ln(x+1)+a\right)}{(3x+4)^{2}}$, luego $f'(0)=\dfrac{4-3a}{16}=1\Rightarrow$ **$a=-4$**.

**b)** $f(x)=\dfrac{\ln(x+1)}{3x+4}$ con dominio $(-1,+\infty)$.

- Vertical: $\displaystyle\lim_{x\to-1^+}f(x)=\dfrac{-\infty}{1}=-\infty$, luego **$x=-1$ es asíntota vertical**.
- Horizontal: $\displaystyle\lim_{x\to+\infty}\dfrac{\ln(x+1)}{3x+4}=0$ (el logaritmo crece más despacio), luego **$y=0$ es asíntota horizontal** en $+\infty$.
- Oblicua: no hay (existe la horizontal).

@@ 2
Capacidad $20\ \text{L}=20\ \text{dm}^3$: $\pi r^{2}h=20\Rightarrow h=\dfrac{20}{\pi r^{2}}$.

Superficie: $S(r)=2\pi r^{2}+2\pi rh=2\pi r^{2}+\dfrac{40}{r}$.

$S'(r)=4\pi r-\dfrac{40}{r^{2}}=0\Rightarrow r^{3}=\dfrac{10}{\pi}$. Como $S''>0$, es un mínimo.

**$r=\sqrt[3]{10/\pi}\approx1{,}47\ \text{dm}$ y $h=2r\approx2{,}94\ \text{dm}$** (altura igual al diámetro).

@@ 3
Con $x=t^{2}$, $dx=2t\,dt$: $\int\operatorname{arctg}\sqrt{x}\,dx=\int2t\operatorname{arctg}t\,dt$.

Por partes: $=t^{2}\operatorname{arctg}t-\int\dfrac{t^{2}}{1+t^{2}}dt=t^{2}\operatorname{arctg}t-t+\operatorname{arctg}t+C$.

Deshaciendo: $F(x)=(x+1)\operatorname{arctg}\sqrt{x}-\sqrt{x}+C$. Como $F(0)=C=1$:

**$F(x)=(x+1)\operatorname{arctg}\sqrt{x}-\sqrt{x}+1$.**

@@ 4
$\ln(x+1)=0\iff x=0$, y $f\ge0$ en $[0,e-1]$. Una primitiva es $(x+1)\ln(x+1)-x$ (por partes).

$$A=\int_0^{e-1}\ln(x+1)\,dx=\Big[(x+1)\ln(x+1)-x\Big]_0^{e-1}=e-(e-1)-0.$$

**Área $=1\ \text{u}^2$.**

@@ 5
$3X-B^{t}=AX\Rightarrow(3I-A)X=B^{t}$. Aquí $3I-A=\begin{pmatrix}1&1&2\\2&0&-1\\-6&-1&0\end{pmatrix}$ y $|3I-A|=1\neq0$, luego es invertible y

$$(3I-A)^{-1}=\begin{pmatrix}-1&-2&-1\\6&12&5\\-2&-5&-2\end{pmatrix}.$$

$$X=(3I-A)^{-1}B^{t}=\begin{pmatrix}-1&-2&-1\\6&12&5\\-2&-5&-2\end{pmatrix}\begin{pmatrix}-1&-3\\0&-1\\-1&5\end{pmatrix}.$$

**$X=\begin{pmatrix}2&0\\-11&-5\\4&1\end{pmatrix}$.**

@@ 6
Sean $a$, $c$ y $m$ las series de animación, ciencia ficción y comedia, y $T=a+c+m$ el total.

$$\begin{cases}0{,}3a+0{,}5c=0{,}2(a+c+m)\\0{,}25a+0{,}5c+0{,}6m=0{,}5(a+c+m)\\c=a+100\end{cases}\iff\begin{cases}a+3c-2m=0\\-0{,}25a+0{,}1m=0\\c-a=100\end{cases}$$

Simplificando la segunda: $-0{,}25a+0{,}1m=0\Rightarrow m=2{,}5a$. En la primera: $a+3(a+100)-5a=0\Rightarrow a=300$.

**Animación: 300; ciencia ficción: 400; comedia: 750** (total 1450). Comprobación: $0{,}3\cdot300+0{,}5\cdot400=290=0{,}2\cdot1450$.

@@ 7
De $x-y+z=0$ y $x+3y=1$: $x=1-3y$, $z=y-x=4y-1$. Puntos $(1-3y,\,y,\,4y-1)$.

Distancia a $OYZ$ ($x=0$): $|x|$. Distancia a $OXZ$ ($y=0$): $|y|$. Igualando: $|1-3y|=|y|$.

- $1-3y=y\Rightarrow y=\tfrac14$.
- $1-3y=-y\Rightarrow y=\tfrac12$.

**Puntos: $\left(\tfrac14,\tfrac14,0\right)$ y $\left(-\tfrac12,\tfrac12,1\right)$.**

@@ 8
**a)** Dirección de $r$: $(1,-1,1)\times(3,0,-2)=(2,5,3)$. La otra recta tiene dirección $(-1,1,2)$ y pasa por $(1,0,3)$.

Normal del plano: $(2,5,3)\times(-1,1,2)=(7,-7,7)\parallel(1,-1,1)$. Plano: $x-y+z=d$ con $(1,0,3)$: $d=4$.

**$x-y+z=4$.**

**b)** El vector normal del plano $2x+5y+3z=41$ es $(2,5,3)$, que coincide con la dirección de $r$: la recta es perpendicular al plano y lo corta, así que **la distancia es $0$**.

*Nota: el enunciado coincide con el examen oficial. Con estos datos $r$ es perpendicular al plano (no paralela) y lo corta, así que la distancia es nula; probablemente es una errata del examen.*
