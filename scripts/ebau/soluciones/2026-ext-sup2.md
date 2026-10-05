@@ 1
**Planteamiento.**
1. Sean $x$ e $y$ los catetos. La hipotenusa mide $20$: $x^2+y^2=400$, luego $y=\sqrt{400-x^2}$.
2. Área a maximizar: $A(x)=\tfrac12\,x\,y=\tfrac12x\sqrt{400-x^2}$, con $0<x<20$.

**Optimización.**
1. $A$ es positiva y se anula en los extremos $x=0$ y $x=20$, así que su máximo está dentro y coincide con el de $A^2=\tfrac14\,(400x^2-x^4)$ (más fácil de derivar).
2. Derivada del polinomio: $(400x^2-x^4)'=800x-4x^3=0\Rightarrow x^2=200$, $x=10\sqrt2$.
3. Es un máximo (el área vale $0$ en los extremos del intervalo).
4. Entonces $y=\sqrt{200}=10\sqrt2$.
5. Área: $\tfrac12\cdot10\sqrt2\cdot10\sqrt2=\tfrac12\cdot200$.

**Catetos: $10\sqrt2\approx14{,}14$ m cada uno; área máxima $=\tfrac12\cdot200=100\ \text{m}^2$.**

*Interpretación:* el triángulo rectángulo de mayor área con hipotenusa fija es el isósceles.

@@ 2
**Sistema equivalente.**
1. Se agrupa: $AX-mX=B\Rightarrow(A-mI)X=B$. La matriz de coeficientes es $A-mI$ y la ampliada $A^*=(A-mI\,|\,B)$.
2. Determinante: $|A-mI|=-(m-2)(m-1)^2$.
3. Se anula en $m=2$ y $m=1$ (doble).

**Discusión (Rouché–Frobenius).**
1. Si $m\neq1$ y $m\neq2$: $|A-mI|\neq0$, rangos $3=3$: **sistema compatible determinado (SCD)**.
2. Si $m=2$: $\operatorname{rg}(A-2I)=2$ y $\operatorname{rg}(A^*)=3$: **sistema incompatible (SI)**.
3. Si $m=1$: $\operatorname{rg}(A-I)=2=\operatorname{rg}(A^*)<3$: **sistema compatible indeterminado (SCI)**.

@@ 3.1
**Límite $\tfrac00$.**
1. Al sustituir $x=0$ salen $0$ en numerador y denominador: indeterminación $\tfrac00$.
2. Con $x\to0$ se usan los desarrollos $\operatorname{sen}u=u-\dfrac{u^3}{6}+\dots$ y $\cos x=1-\dfrac{x^2}{2}+\dots$.
3. Con $u=x^2$: $x^2-\operatorname{sen}(x^2)\sim\dfrac{x^6}{6}$. Además, $1-\cos x\sim\dfrac{x^2}{2}$.
4. El cociente se comporta como $\dfrac{x^6/6}{x^2/2}=\dfrac{x^4}{3}$, que tiende a $0$.

**El límite vale $0$.**

@@ 3.2
**a) Integral entre $0$ y $\pi$.**
1. Se integra por partes. Primera vez: $u=x^2$, $dv=\cos x\,dx$, luego $\int x^2\cos x\,dx=x^2\operatorname{sen}x-\int2x\operatorname{sen}x\,dx$.
2. Segunda vez: $u=2x$, $dv=\operatorname{sen}x\,dx$, luego $\int2x\operatorname{sen}x\,dx=-2x\cos x+2\operatorname{sen}x$.
3. Se juntan: $\displaystyle\int x^2\cos x\,dx=x^2\operatorname{sen}x+2x\cos x-2\operatorname{sen}x$.
4. Barrow:
$$\displaystyle\int_0^\pi x^2\cos x\,dx=\big[x^2\operatorname{sen}x+2x\cos x-2\operatorname{sen}x\big]_0^\pi=-2\pi.$$

**Resultado: $-2\pi$.**

**b) Simetría.**
1. $f(-x)=(-x)^2\cos(-x)=x^2\cos x=f(x)$: $f$ es **par** (simétrica respecto al eje $OY$).
2. En un intervalo simétrico, la integral de una función par es el doble de la de la mitad positiva:
$$\int_{-\pi}^{\pi}f=2\int_0^\pi f=-4\pi.$$

@@ 4.1
**Vectores desde $A$.**
1. $\overrightarrow{AB}=(-2,1,-2)$, $\overrightarrow{AC}=(-1,-1,-1)$, $\overrightarrow{AD}=(0,1,-1)$.
2. Producto vectorial: $\overrightarrow{AB}\times\overrightarrow{AC}=(-3,0,3)$, de módulo $3\sqrt2$. Es la normal del plano $ABC$.

**a) Altura desde $D$.**
1. La altura desde $D$ es la distancia de $D$ al plano $ABC$, que es el volumen del paralelepípedo (producto mixto en valor absoluto) dividido entre el área de su base (módulo del producto vectorial):
$$h=\dfrac{|\overrightarrow{AD}\cdot(\overrightarrow{AB}\times\overrightarrow{AC})|}{|\overrightarrow{AB}\times\overrightarrow{AC}|}=\dfrac{3}{3\sqrt2}.$$

**$h=\dfrac{\sqrt2}{2}$ u.**

**b) Ángulo entre la recta $AD$ y el plano $ABC$.**
1. Normal del plano: $(1,0,-1)$ (paralela a $(-3,0,3)$). Dirección de la recta $AD$: $(0,1,-1)$.
2. El ángulo entre recta y plano usa el seno:
$$\operatorname{sen}\alpha=\dfrac{|(1,0,-1)\cdot(0,1,-1)|}{\sqrt2\cdot\sqrt2}=\dfrac12.$$

**$\alpha=30^\circ$.**

@@ 4.2
**Datos.** Hay 8 dosis: 6 de Virex (V) y 2 de Borez (B). Se sirven al azar y sin reposición.

**a) La segunda dosis es de Virex.**
1. Probabilidad total según la primera dosis. Si la primera es V (probabilidad $\tfrac68$), quedan 5 V entre 7. Si es B (probabilidad $\tfrac28$), quedan 6 V entre 7.
2. Se suman las dos ramas (o se usa la simetría: la segunda dosis tiene la misma probabilidad que la primera):
$$P(V_2)=\tfrac68\cdot\tfrac57+\tfrac28\cdot\tfrac67=\tfrac{30+12}{56}.$$

**$P(V_2)=\dfrac34$.**

**b) Teorema de Bayes.**
1. $P(B_1\cap V_2)=\tfrac28\cdot\tfrac67=\tfrac{3}{14}$.
2. $P(B_1\mid V_2)=\dfrac{P(B_1\cap V_2)}{P(V_2)}=\dfrac{\tfrac28\cdot\tfrac67}{3/4}=\dfrac{3/14}{3/4}$.

**$P(B_1\mid V_2)=\dfrac27$.**
