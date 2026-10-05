@@ 1
**Asíntota oblicua y parámetros.**
1. Se divide el numerador entre el denominador: $f(x)=ax+b+\dfrac{(a+1)x+b-1}{x^2-1}$. El resto tiende a $0$ cuando $x\to\pm\infty$ (grado $1$ entre grado $2$), así que la asíntota oblicua es $y=ax+b$.
2. Paralela a $y=2x$: misma pendiente, $a=2$.
3. Pasa por $(0,1)$: $1=a\cdot0+b\Rightarrow b=1$.
4. La asíntota es $y=2x+1$.

$$\mathbf{a=2,\quad b=1,\quad\text{asíntota oblicua } y=2x+1}$$

@@ 2
**a) Curvatura e inflexión.**
1. Primera derivada: $f'(x)=\dfrac1{1+(x+\pi)^2}$.
2. Segunda derivada: $f''(x)=\dfrac{-2(x+\pi)}{\left(1+(x+\pi)^2\right)^2}$. El denominador es siempre positivo y el numerador solo se anula en $x=-\pi$.
3. Signo: $f''>0$ si $x<-\pi$ y $f''<0$ si $x>-\pi$.
4. $f''$ cambia de signo en $x=-\pi$: es punto de inflexión, con $f(-\pi)=\operatorname{arctg}0=0$.

**Convexa en $(-\infty,-\pi)$ y cóncava en $(-\pi,+\infty)$; punto de inflexión en $x=-\pi$, con $f(-\pi)=\operatorname{arctg}0=0$**, es decir en $(-\pi,0)$.

**b) Límite.**
1. Al sustituir $x=-\pi$ se obtiene $\dfrac{\operatorname{arctg}0}{\operatorname{sen}(-\pi)}=\dfrac00$: indeterminación.
2. Se aplica L'Hôpital (numerador y denominador son derivables):
$$\lim_{x\to-\pi}\frac{\operatorname{arctg}(x+\pi)}{\operatorname{sen}x}=\lim_{x\to-\pi}\frac{1/(1+(x+\pi)^2)}{\cos x}=\frac{1}{\cos(-\pi)}=\mathbf{-1}.$$

@@ 3
**Función a partir de su derivada.**
1. El grado del numerador es igual al del denominador: se divide. $\dfrac{3x^2+4x+12}{x^2-4}=3+\dfrac{4x+24}{x^2-4}$.
2. Fracciones simples con $x^2-4=(x-2)(x+2)$: $\dfrac{4x+24}{(x-2)(x+2)}=\dfrac{8}{x-2}-\dfrac{4}{x+2}$ (en $x=2$ el numerador vale $32$, entre $4$ da $8$; en $x=-2$ vale $16$, entre $-4$ da $-4$).
3. En $(2,+\infty)$ los argumentos son positivos: $f(x)=3x+8\ln(x-2)-4\ln(x+2)+C$.
4. Condición $f(3)=-4\ln5$: $9+0-4\ln5+C=-4\ln5$ (pues $\ln1=0$), de donde $C=-9$.

$$\mathbf{f(x)=3x-9+8\ln(x-2)-4\ln(x+2)}$$

@@ 4
**Primitiva con condición.** Se busca $F$ de la forma $(x^2+px+q)e^x$ (el integrando es un polinomio por $e^x$, y esa forma se conserva al integrar).
1. Se deriva: $F'=\big(x^2+(p+2)x+(p+q)\big)e^x$.
2. Se iguala a $(x^2-3x+5)e^x$: $p+2=-3$ y $p+q=5$, luego $p=-5$ y $q=10$. (El mismo resultado sale integrando por partes dos veces.)
3. Primitiva general: $F(x)=(x^2-5x+10)e^x+C$.
4. Condición $F(0)=5$: $10+C=5\Rightarrow C=-5$.

$$\mathbf{F(x)=(x^2-5x+10)e^x-5}$$

@@ 5
**a) Inversa de $A^2$.**
1. $|A|=1-m$ (desarrollando el determinante).
2. $|A^2|=|A|^2=(1-m)^2$.
3. $A^2$ tiene inversa si y solo si $|A^2|\neq0$, es decir, $1-m\neq0$.

**$A^2$ tiene inversa si y sólo si $m\neq1$.**

**b) Ecuación $A^2X=\tfrac12(A+B)$ con $m=0$.**
1. Con $m=0$, $|A|=1\ne0$, luego $A$ y $A^2$ son invertibles.
2. Se multiplica por $(A^2)^{-1}$ por la izquierda: $X=\tfrac12(A^2)^{-1}(A+B)$.
3. Se calculan $A^2$, su inversa y el producto:

$$\mathbf{X=\begin{pmatrix}-15&-\tfrac{13}2&-\tfrac{77}2\\[1mm]0&\tfrac52&2\\[1mm]\tfrac{19}2&\tfrac{13}2&\tfrac{53}2\end{pmatrix}}$$

@@ 6
**Planteamiento.** El número es $\overline{cdu}=100c+10d+u$, con $c$ centenas, $d$ decenas y $u$ unidades.
1. Suma de dígitos: $c+d+u=9$.
2. Diferencia con el número invertido ($\overline{udc}=100u+10d+c$): $(100c+10d+u)-(100u+10d+c)=99(c-u)=198\Rightarrow c-u=2$.
3. Suma de ambos: $(100c+10d+u)+(100u+10d+c)=101(c+u)+20d=828$.

**Resolución.**
1. De la primera, $d=9-(c+u)$. Se sustituye en la tercera: $101(c+u)+20\,(9-(c+u))=81(c+u)+180=828$.
2. $81(c+u)=648\Rightarrow c+u=8$. Con $c-u=2$: $c=5$ y $u=3$.
3. Entonces $d=9-8=1$.

**El número es $513$** (comprobación: $513-315=198$ y $513+315=828$).

@@ 7
**Dato común.** $\overrightarrow{PQ}=(2,-2,0)$.

**a) Plano perpendicular a $PQ$ por su punto medio.**
1. Punto medio: $M(2,-1,1)$.
2. El plano es perpendicular al segmento, así que su normal es $\overrightarrow{PQ}=(2,-2,0)$, que se simplifica a $(1,-1,0)$: $x-y+D=0$.
3. Pasa por $M$: $2-(-1)+D=0\Rightarrow D=-3$.

$$\mathbf{x-y-3=0}$$

**b) Plano por $P$ y $Q$ paralelo a $r$.**
1. Dirección de $r$ (de $1-x=\frac{y-2}{3}=z+1$, es decir, $\frac{x-1}{-1}=\frac{y-2}{3}=\frac{z+1}{1}$): $(-1,3,1)$.
2. El plano contiene a $\overrightarrow{PQ}$ y es paralelo a $r$, así que su normal es perpendicular a ambos: $\overrightarrow{PQ}\times(-1,3,1)\parallel(-1,-1,2)$.
3. Plano por $P(1,0,1)$: $-(x-1)-y+2(z-1)=0$.

$$\mathbf{x+y-2z+1=0}$$

*Comprobación:* contiene a $Q$: $3-2-2+1=0$.

@@ 8
**Datos.** Vectores desde $B$: $\overrightarrow{BA}=(0,1,1)$ y $\overrightarrow{BC}=(0,-1,1)$. Su producto vectorial es $\overrightarrow{BA}\times\overrightarrow{BC}=(2,0,0)$.

**a) Área del triángulo.**
1. El área del triángulo es la mitad del módulo del producto vectorial: $\tfrac12\,|(2,0,0)|=\tfrac12\cdot2$.

**Área $=\tfrac12\cdot2=\mathbf{1\ u^2}$.**

**b) Cuarto vértice del paralelogramo.**
1. Con los vértices consecutivos $A,B,C,D$, los lados opuestos son iguales: $\overrightarrow{BA}=\overrightarrow{CD}$.
2. De aquí, $D=C+\overrightarrow{BA}=A+C-B$.
3. $D=(1,1,2)+(1,-1,2)-(1,0,1)$:

$$\mathbf{D=(1,0,3)}$$
