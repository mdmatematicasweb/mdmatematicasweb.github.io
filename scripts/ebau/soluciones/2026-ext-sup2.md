@@ 1
Catetos $x,y$ con $x^2+y^2=400$, así $y=\sqrt{400-x^2}$ y el área es $A(x)=\tfrac12x\sqrt{400-x^2}$. Basta maximizar $A^2=\tfrac14\,(400x^2-x^4)$:
$(400x^2-x^4)'=800x-4x^3=0\Rightarrow x^2=200$, $x=10\sqrt2$ (máximo; el área vale 0 en los extremos $x=0$ y $x=20$).

Entonces $y=\sqrt{200}=10\sqrt2$.

**Catetos: $10\sqrt2\approx14{,}14$ m cada uno; área máxima $=\tfrac12\cdot200=100\ \text{m}^2$.**

@@ 2
$(A-mI)X=B$. $|A-mI|=-(m-2)(m-1)^2$.
- Si $m\neq1$ y $m\neq2$: $|A-mI|\neq0$, rangos $3=3$: **sistema compatible determinado (SCD)**.
- Si $m=2$: $\operatorname{rg}(A-2I)=2$ y $\operatorname{rg}(A^*)=3$: **sistema incompatible (SI)**.
- Si $m=1$: $\operatorname{rg}(A-I)=2=\operatorname{rg}(A^*)<3$: **sistema compatible indeterminado (SCI)**.

@@ 3.1
Con $x\to0$: $x^2-\operatorname{sen}(x^2)\sim\dfrac{x^6}{6}$ y $1-\cos x\sim\dfrac{x^2}{2}$.

El cociente se comporta como $\dfrac{x^6/6}{x^2/2}=\dfrac{x^4}{3}$.

**El límite vale $0$.**

@@ 3.2
**a)** Por partes (dos veces): $\displaystyle\int x^2\cos x\,dx=x^2\operatorname{sen}x+2x\cos x-2\operatorname{sen}x$.

$\displaystyle\int_0^\pi x^2\cos x\,dx=\big[x^2\operatorname{sen}x+2x\cos x-2\operatorname{sen}x\big]_0^\pi=-2\pi$.

**Resultado: $-2\pi$.**

**b)** $f(-x)=(-x)^2\cos(-x)=f(x)$: $f$ es **par** (simétrica respecto al eje $OY$). Por tanto
$$\int_{-\pi}^{\pi}f=2\int_0^\pi f=-4\pi.$$

@@ 4.1
$\overrightarrow{AB}=(-2,1,-2)$, $\overrightarrow{AC}=(-1,-1,-1)$, $\overrightarrow{AD}=(0,1,-1)$.

**a)** $\overrightarrow{AB}\times\overrightarrow{AC}=(-3,0,3)$, de módulo $3\sqrt2$. La altura desde $D$ es la distancia de $D$ al plano $ABC$:
$h=\dfrac{|\overrightarrow{AD}\cdot(\overrightarrow{AB}\times\overrightarrow{AC})|}{|\overrightarrow{AB}\times\overrightarrow{AC}|}=\dfrac{3}{3\sqrt2}$.

**$h=\dfrac{\sqrt2}{2}$ u.**

**b)** Normal del plano: $(1,0,-1)$; dirección de la recta $AD$: $(0,1,-1)$.
$\operatorname{sen}\alpha=\dfrac{|(1,0,-1)\cdot(0,1,-1)|}{\sqrt2\cdot\sqrt2}=\dfrac12$.

**$\alpha=30^\circ$.**

@@ 4.2
Hay 8 dosis: 6 de Virex (V) y 2 de Borez (B).

**a)** Por simetría (o por la probabilidad total):
$P(V_2)=\tfrac68\cdot\tfrac57+\tfrac28\cdot\tfrac67=\tfrac{30+12}{56}$.

**$P(V_2)=\dfrac34$.**

**b)** $P(B_1\mid V_2)=\dfrac{P(B_1\cap V_2)}{P(V_2)}=\dfrac{\tfrac28\cdot\tfrac67}{3/4}=\dfrac{3/14}{3/4}$.

**$P(B_1\mid V_2)=\dfrac27$.**
