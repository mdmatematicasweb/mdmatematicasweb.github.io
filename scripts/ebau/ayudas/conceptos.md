# Biblioteca de ayudas genéricas de Matemáticas II (Ciencias). Cada concepto: «@@ id | título», luego «### R» (recordatorio) y «### M» (método).
# No lleva datos de ningún ejercicio. build.py junta los de los conceptos asignados en asignacion.tsv.

@@ mat-operaciones | Operaciones con matrices
### R
Suma y resta: elemento a elemento (mismas dimensiones). Producto $A\cdot B$: solo si columnas de $A$ = filas de $B$; el elemento $(i,j)$ es la fila $i$ de $A$ por la columna $j$ de $B$. En general $A\cdot B\neq B\cdot A$. La traspuesta $A^t$ cambia filas por columnas y $(A\cdot B)^t=B^t\cdot A^t$.
### M
1. Comprueba las dimensiones antes de multiplicar y anota la dimensión del resultado.
2. Para potencias $A^2,A^3,\dots$ calcula una a una y busca el patrón; después exprésalo en función de $n$.
3. Revisa cada elemento: un solo error de signo arrastra todo lo demás.

@@ mat-inversa | Matriz inversa
### R
$A$ tiene inversa si y solo si $|A|\neq0$. Entonces $A^{-1}=\dfrac{1}{|A|}\,\left(\operatorname{Adj}A\right)^t$, y se cumple $A\cdot A^{-1}=A^{-1}\cdot A=I$.
### M
1. Calcula $|A|$. Si es $0$, no hay inversa.
2. Halla la matriz de adjuntos: cada elemento es el menor con su signo $(-1)^{i+j}$.
3. Traspón la adjunta y divide entre $|A|$.
4. Comprueba que $A\cdot A^{-1}=I$.

@@ mat-ecuacion | Ecuaciones matriciales
### R
Si $|A|\neq0$: de $A\cdot X=B$ sale $X=A^{-1}\cdot B$; de $X\cdot A=B$ sale $X=B\cdot A^{-1}$. El orden importa: la inversa se multiplica por el mismo lado en los dos miembros. La identidad $I$ cumple $A\cdot I=I\cdot A=A$.
### M
1. Agrupa los términos con $X$ en un miembro y los demás en el otro (sin olvidar $I$ y los cambios de signo).
2. Saca $X$ como factor común conservando su lado: $X\cdot(A-I)$ o $(A-I)\cdot X$.
3. Despeja multiplicando por la inversa del lado correcto.
4. Calcula la inversa y el producto; comprueba sustituyendo en la ecuación original.

@@ det-parametro | Determinantes y parámetros
### R
Determinante $3\times3$ (Sarrus): suma de los tres productos de diagonales «hacia abajo» menos los tres «hacia arriba». Propiedad clave: $|A|=0$ si dos filas son proporcionales; $|k\cdot A|=k^n|A|$ para $A$ de orden $n$; $|A\cdot B|=|A|\cdot|B|$.
### M
1. Calcula el determinante en función del parámetro (desarrolla por la fila o columna con más ceros).
2. Iguala a $0$ y resuelve la ecuación: esos son los valores prohibidos.
3. Expresa la conclusión: «tiene inversa para todo $a$ distinto de …».

@@ sis-planteo | Plantear un sistema de ecuaciones
### R
Un sistema lineal se plantea a partir del enunciado: una incógnita por cada cantidad desconocida y una ecuación por cada condición («total», «el doble de», «tanto por ciento de»…).
### M
1. Define con claridad las incógnitas $x,y,z$ y sus unidades.
2. Traduce cada frase del enunciado a una ecuación; comprueba que no sobra ni falta ninguna.
3. Resuelve por Gauss o por sustitución.
4. Interpreta: las soluciones deben tener sentido en el contexto (no negativas, enteras si son personas…).

@@ sis-discusion | Discusión y resolución de sistemas
### R
Teorema de Rouché-Frobenius: si $\operatorname{rg}A=\operatorname{rg}A^*=n$ (nº de incógnitas), compatible determinado; si $\operatorname{rg}A=\operatorname{rg}A^*<n$, compatible indeterminado; si $\operatorname{rg}A<\operatorname{rg}A^*$, incompatible. Gauss: operar con filas hasta obtener una matriz triangular.
### M
1. Escribe la matriz ampliada $A^*$.
2. Triangula con operaciones entre filas, sin dividir por expresiones que puedan valer $0$ (en un parámetro, trátalo aparte).
3. Halla los valores del parámetro que anulan algún pivote y estudia cada caso por separado.
4. Clasifica cada caso y resuelve los compatibles (en el indeterminado, deja una incógnita como parámetro).

@@ fun-dominio | Dominio, cortes y simetrías
### R
Dominio: excluye los puntos donde se anula un denominador, el radicando de una raíz de índice par es negativo o el argumento de un logaritmo no es positivo. Cortes: con el eje $X$ se resuelve $f(x)=0$; con el eje $Y$ se calcula $f(0)$.
### M
1. Halla el dominio y escríbelo como unión de intervalos.
2. Calcula los cortes con los ejes.
3. Estudia el signo de $f$ entre los puntos que anulan $f$ o su denominador.

@@ fun-representar | Representar una función
### R
Una gráfica se construye con: dominio, cortes con los ejes, asíntotas, monotonía y extremos (con $f'$), curvatura y puntos de inflexión (con $f''$), y una tabla de valores. Convexa si $f''>0$ y cóncava si $f''<0$.
### M
1. Dominio y cortes.
2. Asíntotas verticales, horizontales y oblicuas con límites.
3. Signo de $f'$: intervalos de crecimiento y extremos.
4. Signo de $f''$ si hace falta, y unos cuantos puntos.
5. Dibuja y comprueba que la gráfica respeta todos los datos anteriores.

@@ fun-cuadratica-recta | Parábola, recta y funciones definidas a trozos
### R
Parábola $y=ax^2+bx+c$: vértice en $x=-\dfrac{b}{2a}$; abre hacia arriba si $a>0$. Una función a trozos se estudia en cada trozo y en los puntos de cambio. Recta por dos puntos: $y-y_0=m\,(x-x_0)$ con $m=\dfrac{y_1-y_0}{x_1-x_0}$.
### M
1. Para hallar los coeficientes, sustituye cada dato (punto, vértice, pendiente) y resuelve el sistema.
2. Para dibujar, calcula vértice, cortes y una tabla de valores en cada trozo.
3. Comprueba los puntos de unión de los trozos.

@@ lim-asintotas | Límites y asíntotas
### R
Asíntota vertical $x=a$: $\lim_{x\to a}f(x)=\pm\infty$. Horizontal $y=b$: $\lim_{x\to\pm\infty}f(x)=b$. Oblicua $y=mx+n$: $m=\lim\dfrac{f(x)}{x}$, $n=\lim\,(f(x)-mx)$. Indeterminaciones $\dfrac{0}{0}$ (factoriza o L'Hôpital), $\dfrac{\infty}{\infty}$ (mayor grado), $\infty-\infty$ (opera).
### M
1. Para asíntotas verticales, busca los puntos que anulan el denominador y calcula los límites laterales.
2. Para las horizontales, calcula el límite en $+\infty$ y en $-\infty$.
3. Si no hay horizontal en ese lado, prueba la oblicua.
4. Escribe las ecuaciones de las rectas.

@@ continuidad | Continuidad
### R
$f$ es continua en $a$ si $\lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x)=f(a)$. Las funciones elementales son continuas en su dominio; en una función a trozos solo hay que vigilar los puntos de cambio.
### M
1. Localiza los puntos problemáticos (cambios de trozo, ceros de denominadores).
2. Calcula los dos límites laterales y $f(a)$.
3. Iguálalos: si hay parámetros, obtienes una ecuación para cada punto.
4. Concluye indicando el tipo de discontinuidad si no es continua (evitable o de salto).

@@ derivabilidad | Derivabilidad
### R
$f$ derivable en $a$ si es continua en $a$ y las derivadas laterales coinciden: $f'(a^-)=f'(a^+)$. Derivable implica continua, pero no al revés.
### M
1. Impón primero la continuidad en el punto de cambio.
2. Deriva cada trozo y evalúa en el punto, por la izquierda y por la derecha.
3. Iguala las derivadas: segunda ecuación para los parámetros.
4. Resuelve el sistema y comprueba.

@@ derivar | Reglas de derivación
### R
$(u\pm v)'=u'\pm v'$; $(u\cdot v)'=u'v+uv'$; $\left(\dfrac{u}{v}\right)'=\dfrac{u'v-uv'}{v^2}$; regla de la cadena $(f\circ g)'=f'(g)\cdot g'$. Básicas: $(x^n)'=nx^{n-1}$, $(e^{u})'=u'e^{u}$, $(\ln u)'=\dfrac{u'}{u}$.
### M
1. Identifica la estructura: ¿suma, producto, cociente o función compuesta? Empieza por la operación «de fuera».
2. Aplica la regla y simplifica (saca factor común).
3. Comprueba un valor numérico si tienes dudas.

@@ tangente | Recta tangente
### R
Tangente a la gráfica de $f$ en $x=a$: $y-f(a)=f'(a)\,(x-a)$. La pendiente es $f'(a)$. Tangente horizontal: $f'(a)=0$. Rectas paralelas tienen la misma pendiente; perpendiculares, $m\cdot m'=-1$.
### M
1. Calcula $f(a)$ (el punto) y $f'(x)$.
2. Evalúa $f'(a)$ (la pendiente).
3. Sustituye en la ecuación punto-pendiente.
4. Si el punto no es dato, obtén $a$ de la condición del enunciado (pendiente dada, tangente horizontal…).

@@ monotonia | Monotonía y extremos relativos
### R
$f'>0$ en un intervalo: creciente; $f'<0$: decreciente. Un extremo relativo en $x=a$ exige $f'(a)=0$; es mínimo si $f'$ pasa de $-$ a $+$ (o $f''(a)>0$) y máximo si pasa de $+$ a $-$ (o $f''(a)<0$).
### M
1. Halla el dominio y calcula $f'(x)$.
2. Resuelve $f'(x)=0$ y localiza también los puntos donde $f'$ no existe.
3. Con esos puntos divide el dominio y estudia el signo de $f'$ en cada intervalo.
4. Escribe intervalos de crecimiento y decrecimiento, y los extremos con sus coordenadas $(a,f(a))$.

@@ curvatura | Curvatura y puntos de inflexión
### R
$f''>0$: convexa; $f''<0$: cóncava. Punto de inflexión en $x=a$: $f''(a)=0$ y $f''$ cambia de signo.
### M
1. Calcula $f''(x)$ y resuelve $f''(x)=0$.
2. Estudia el signo de $f''$ en los intervalos que quedan.
3. Indica los intervalos de convexidad y concavidad, y las coordenadas de los puntos de inflexión.

@@ optimizacion | Optimización (máximo y mínimo en un contexto)
### R
El óptimo de una función derivable en un intervalo se busca entre los puntos con $f'(x)=0$ y los extremos del intervalo. Se confirma el tipo con el signo de $f'$ o con $f''$.
### M
1. Escribe la función a optimizar con una sola variable (usa la condición del enunciado para eliminar la otra).
2. Fija el dominio que tiene sentido en el contexto.
3. Resuelve $f'(x)=0$ y comprueba que es máximo o mínimo.
4. Responde con unidades y en palabras: ¿en qué valor se alcanza y cuánto vale?

@@ parametros-funcion | Hallar parámetros de una función
### R
Cada dato del enunciado da una ecuación: pasa por $(a,b)\Rightarrow f(a)=b$; extremo en $x=a\Rightarrow f'(a)=0$; pendiente $m$ en $x=a\Rightarrow f'(a)=m$; inflexión en $x=a\Rightarrow f''(a)=0$; área o integral dada $\Rightarrow$ igualar la integral.
### M
1. Lista los datos y escribe una ecuación por cada uno.
2. Resuelve el sistema (suele ser lineal en los parámetros).
3. Comprueba que la función resultante cumple todo, y que el extremo es del tipo pedido.

@@ integral-definida | Integral definida (regla de Barrow)
### R
Regla de Barrow: $\int_a^b f(x)\,dx=F(b)-F(a)$, con $F$ una primitiva de $f$. Si $f\ge0$ en $[a,b]$, la integral es el área bajo la curva; si $f\le0$, es el área cambiada de signo.
### M
1. Halla una primitiva $F$.
2. Evalúa $F(b)-F(a)$ cuidando los signos y las fracciones.
3. Interpreta el signo del resultado.

@@ area | Área de un recinto
### R
Área entre $y=f(x)$ y el eje $X$: $\int_a^b|f(x)|\,dx$, partiendo en los puntos donde $f$ cambia de signo. Área entre dos curvas: $\int_a^b\left(f(x)-g(x)\right)dx$ con $f\ge g$. Los límites de integración son las abscisas de corte.
### M
1. Haz un esbozo del recinto.
2. Calcula los puntos de corte (resolviendo $f=g$ o $f=0$): son los límites.
3. Decide qué función va por encima en cada tramo; si se cruzan, parte la integral.
4. Aplica Barrow y da el área en $\text{u}^2$, siempre positiva.

@@ prob-sucesos | Probabilidad de sucesos y operaciones
### R
$P(A^C)=1-P(A)$; $P(A\cup B)=P(A)+P(B)-P(A\cap B)$; $P(A-B)=P(A\cap B^C)=P(A)-P(A\cap B)$. Leyes de De Morgan: $(A\cup B)^C=A^C\cap B^C$ y $(A\cap B)^C=A^C\cup B^C$. Incompatibles: $P(A\cap B)=0$. Independientes: $P(A\cap B)=P(A)\cdot P(B)$.
### M
1. Traduce cada dato a la notación de sucesos ($A$, $B$, $A\cap B$…).
2. Elige la fórmula que relaciona los datos con la incógnita y despeja.
3. Si hay dos sucesos, organiza los datos en una tabla de contingencia.
4. Comprueba que todas las probabilidades están entre $0$ y $1$.

@@ prob-condicionada | Probabilidad condicionada
### R
$P(A|B)=\dfrac{P(A\cap B)}{P(B)}$ (probabilidad de $A$ sabiendo que ocurrió $B$). Regla del producto: $P(A\cap B)=P(B)\cdot P(A|B)$. $A$ y $B$ son independientes si $P(A|B)=P(A)$.
### M
1. Identifica qué suceso es la condición («sabiendo que», «si ha ocurrido»): va en el denominador.
2. Calcula la intersección y la probabilidad de la condición.
3. Divide e interpreta el resultado en palabras.

@@ prob-total-bayes | Probabilidad total y teorema de Bayes
### R
Si $A_1,\dots,A_n$ forman un sistema completo de sucesos: $P(B)=\sum P(A_i)\,P(B|A_i)$ (probabilidad total) y $P(A_j|B)=\dfrac{P(A_j)\,P(B|A_j)}{P(B)}$ (Bayes).
### M
1. Dibuja un diagrama de árbol: primera etapa con el sistema completo, segunda con $B$ y $B^C$.
2. Multiplica a lo largo de cada rama.
3. Probabilidad total: suma las ramas que terminan en $B$.
4. Bayes: divide la rama pedida entre la probabilidad total.

@@ binomial | Distribución binomial
### R
$X\sim B(n,p)$: $n$ pruebas independientes, probabilidad de éxito $p$ constante. $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$. Media $\mu=np$, desviación típica $\sigma=\sqrt{np(1-p)}$. $P(X\ge1)=1-P(X=0)$.
### M
1. Identifica $n$, $p$ y qué cuenta $X$.
2. Traduce la pregunta: «exactamente» $P(X=k)$, «al menos» y «como máximo» suman o restan casos; usa el complementario cuando abrevie.
3. Calcula con la fórmula y deja el resultado con 4 decimales (o como fracción).

@@ binomial-normal | Binomial aproximada por una normal
### R
Si $np\ge5$ y $n(1-p)\ge5$, $B(n,p)\approx N\left(np,\sqrt{np(1-p)}\right)$. Corrección por continuidad: $P(X=k)\approx P(k-0{,}5\le Y\le k+0{,}5)$; $P(X\le k)\approx P(Y\le k+0{,}5)$; $P(X\ge k)\approx P(Y\ge k-0{,}5)$.
### M
1. Comprueba $np\ge5$ y $n(1-p)\ge5$.
2. Calcula $\mu=np$ y $\sigma=\sqrt{np(1-p)}$.
3. Aplica la corrección por continuidad y tipifica.
4. Lee en la tabla N(0,1) e interpreta.

@@ normal | Distribución normal: cálculo de probabilidades
### R
$X\sim N(\mu,\sigma)$ se tipifica con $Z=\dfrac{X-\mu}{\sigma}\sim N(0,1)$. La tabla da $P(Z\le z)$. Simetría: $P(Z\le-z)=1-P(Z\le z)$; $P(a\le Z\le b)=\Phi(b)-\Phi(a)$. Cualquier valor $z$ se redondea a dos decimales.
### M
1. Escribe la probabilidad pedida con $X$ y tipifica cada extremo.
2. Redondea $z$ a dos decimales y busca $\Phi(z)$ en la tabla (para $z<0$ usa la simetría).
3. Combina: restas para intervalos, $1-\Phi$ para «mayor que».
4. Interpreta el resultado como proporción o probabilidad.

@@ normal-inversa | Normal: hallar un valor o un parámetro
### R
Si se conoce la probabilidad y falta el valor $x$ (percentil) o un parámetro, se busca en la tabla el $z$ cuya $\Phi(z)$ es la probabilidad dada (el más cercano) y se deshace la tipificación: $x=\mu+z\,\sigma$.
### M
1. Plantea $P(X\le x)=p$ y pasa a $P\left(Z\le\dfrac{x-\mu}{\sigma}\right)=p$.
2. Si $p<0{,}5$, usa la simetría para trabajar con $1-p$ y cambia el signo de $z$.
3. Busca $p$ en el interior de la tabla y lee el $z$.
4. Despeja $x$ (o el parámetro desconocido).

@@ mat-rango | Rango de una matriz
### R
El rango es el orden del mayor menor no nulo (o el número de filas no nulas tras triangular por Gauss). $\operatorname{rg}A\le\min(\text{filas},\text{columnas})$. Una matriz cuadrada de orden $n$ tiene $\operatorname{rg}A=n$ si y solo si $|A|\neq0$.
### M
1. Si hay parámetro, calcula primero el determinante (o los menores de orden mayor) y busca los valores que lo anulan.
2. Para cada valor crítico, sustituye y estudia el rango por menores de orden menor o por Gauss.
3. Para los demás valores, el rango es el máximo posible.
4. Escribe el rango según los casos del parámetro.

@@ mat-potencias | Potencias de una matriz
### R
$A^n=A\cdot A\cdots A$. Para hallar $A^n$ se calculan $A^2,A^3,\dots$ hasta ver un patrón (por ejemplo $A^k=0$, $A^k=I$ o $A^k=A$) y se demuestra o se aplica. Si $A^k=I$, entonces $A^{n}=A^{n\bmod k}$.
### M
1. Calcula $A^2$ y $A^3$ con cuidado (orden de los factores).
2. Busca el patrón: ¿se anula?, ¿se repite?, ¿crece de forma regular en un elemento?
3. Expresa $A^n$ usando el patrón y comprueba con $n=1,2$.

@@ det-propiedades | Propiedades de los determinantes
### R
$|A^t|=|A|$; $|A\cdot B|=|A|\cdot|B|$; si se intercambian dos filas, el determinante cambia de signo; si una fila se multiplica por $k$, el determinante se multiplica por $k$ (y $|k\cdot A|=k^n|A|$ en orden $n$); si hay dos filas proporcionales, $|A|=0$; sumar a una fila un múltiplo de otra no cambia el determinante. $|A^{-1}|=\dfrac{1}{|A|}$.
### M
1. Identifica qué operaciones entre filas o columnas relacionan el determinante pedido con el dado.
2. Aplica cada propiedad en orden, anotando cómo cambia el valor.
3. Si no hay relación directa, calcula con Sarrus o por adjuntos desarrollando por la fila o columna con más ceros.

@@ vec-operaciones | Producto escalar, módulo y ángulo de vectores
### R
$\vec{u}\cdot\vec{v}=u_1v_1+u_2v_2+u_3v_3=|\vec{u}||\vec{v}|\cos\alpha$. Módulo $|\vec{u}|=\sqrt{u_1^2+u_2^2+u_3^2}$. Ortogonales: $\vec{u}\cdot\vec{v}=0$. Proyección de $\vec{u}$ sobre $\vec{v}$: $\dfrac{\vec{u}\cdot\vec{v}}{|\vec{v}|}$. Unitario: $\dfrac{\vec{u}}{|\vec{u}|}$.
### M
1. Escribe los vectores (resta extremo menos origen).
2. Calcula el producto escalar y los módulos.
3. Despeja el coseno del ángulo o el parámetro que haga $\vec{u}\cdot\vec{v}=0$.
4. Interpreta el resultado (perpendiculares, ángulo en grados).

@@ vec-areas-volumenes | Producto vectorial, producto mixto, áreas y volúmenes
### R
$\vec{u}\times\vec{v}$ es perpendicular a ambos, con $|\vec{u}\times\vec{v}|=|\vec{u}||\vec{v}|\sin\alpha$ (área del paralelogramo). Área del triángulo $=\dfrac12|\vec{u}\times\vec{v}|$. Producto mixto $[\vec{u},\vec{v},\vec{w}]=\vec{u}\cdot(\vec{v}\times\vec{w})$ (determinante): volumen del paralelepípedo $=|[\vec{u},\vec{v},\vec{w}]|$ y del tetraedro $\dfrac16|[\vec{u},\vec{v},\vec{w}]|$. Tres vectores son coplanarios si $[\vec{u},\vec{v},\vec{w}]=0$.
### M
1. Forma los vectores con origen en un mismo vértice.
2. Calcula el producto vectorial (determinante simbólico) o el mixto (determinante $3\times3$).
3. Aplica la fórmula de área o volumen con su factor ($\tfrac12$ o $\tfrac16$ si es triángulo o tetraedro).
4. Da la unidad: $\text{u}^2$ o $\text{u}^3$.

@@ rp-ecuaciones | Ecuaciones de rectas y planos
### R
Recta por $P$ con dirección $\vec{v}$: $(x,y,z)=P+\lambda\vec{v}$ (paramétricas, continua o implícita). Plano por $P$ con vectores $\vec{u},\vec{v}$: $\begin{vmatrix}x-p_1&y-p_2&z-p_3\\u_1&u_2&u_3\\v_1&v_2&v_3\end{vmatrix}=0$; con normal $\vec{n}=(A,B,C)$: $A(x-p_1)+B(y-p_2)+C(z-p_3)=0$, es decir, $Ax+By+Cz+D=0$.
### M
1. Decide qué datos tienes: punto, dirección, normal, dos puntos, tres puntos.
2. Obtén el punto y los vectores necesarios (resta de puntos, producto vectorial para la normal).
3. Escribe la ecuación pedida y comprueba que los puntos dados la cumplen.

@@ rp-posiciones | Posición relativa de rectas y planos
### R
Dos rectas pueden ser coincidentes, paralelas, secantes o cruzarse: se estudia con los vectores directores y el vector que une dos puntos (rangos o producto mixto). Recta y plano: paralelos, secantes o recta contenida ($\vec{v}\cdot\vec{n}=0$ si es paralela o está contenida). Dos planos: coincidentes, paralelos o secantes (rangos del sistema).
### M
1. Plantea el sistema formado por las ecuaciones y discútelo con rangos (Rouché), o compara vectores directores y normales.
2. Si hay parámetro, obtén los valores críticos con el determinante y estudia cada caso.
3. Si son secantes, resuelve el sistema para hallar el punto o la recta de corte.

@@ rp-distancias | Distancias y ángulos
### R
Distancia de $P$ al plano $\pi:Ax+By+Cz+D=0$: $\dfrac{|Ax_0+By_0+Cz_0+D|}{\sqrt{A^2+B^2+C^2}}$. Distancia de $P$ a una recta $r$ (punto $Q$, dirección $\vec{v}$): $\dfrac{|\overrightarrow{QP}\times\vec{v}|}{|\vec{v}|}$. Entre dos rectas que se cruzan: $\dfrac{|[\overrightarrow{PQ},\vec{u},\vec{v}]|}{|\vec{u}\times\vec{v}|}$. Ángulo entre vectores directores o normales: $\cos\alpha=\dfrac{|\vec{a}\cdot\vec{b}|}{|\vec{a}||\vec{b}|}$ (el de recta y plano usa el seno).
### M
1. Elige la fórmula según los objetos (punto-plano, punto-recta, recta-recta, planos paralelos).
2. Extrae los datos: puntos, vectores directores y normales.
3. Sustituye y simplifica los radicales.
4. Para dos planos o rectas paralelas, reduce a la distancia de un punto de una a la otra.

@@ rp-proyecciones | Proyecciones, simétricos y puntos de una recta o plano
### R
Proyección de $P$ sobre un plano $\pi$: punto de corte de $\pi$ con la recta perpendicular a $\pi$ por $P$. Simétrico de $P$ respecto de ese plano: $P'=2M-P$, con $M$ la proyección. Con una recta se hace igual con el plano perpendicular a la recta por $P$.
### M
1. Construye la recta (o plano) perpendicular que pasa por $P$: dirección $\vec{n}$ (o normal $\vec{v}$).
2. Corta con el plano (o la recta) sustituyendo las paramétricas en la ecuación y resolviendo para el parámetro.
3. Esa intersección $M$ es la proyección; el simétrico es $P'=2M-P$ (en cada coordenada).
4. Comprueba que $M$ es el punto medio de $P$ y $P'$.

@@ lim-indeterminaciones | Límites e indeterminaciones (L'Hôpital)
### R
Indeterminaciones: $\dfrac00,\ \dfrac\infty\infty,\ \infty-\infty,\ 0\cdot\infty,\ 1^\infty$. Regla de L'Hôpital: si $\dfrac{f}{g}$ da $\dfrac00$ o $\dfrac\infty\infty$ y existe $\lim\dfrac{f'}{g'}$, entonces $\lim\dfrac{f}{g}=\lim\dfrac{f'}{g'}$. $1^\infty$: $\lim f^g=e^{\lim g\,(f-1)}$. Otras se transforman a cocientes.
### M
1. Sustituye para ver qué indeterminación aparece.
2. Si es $\infty-\infty$ o $0\cdot\infty$, pásala a cociente (denominador común, racionaliza o escribe $0\cdot\infty=\dfrac{0}{1/\infty}$).
3. Aplica L'Hôpital derivando numerador y denominador por separado; repite si hace falta.
4. Si el límite depende de un parámetro, impón la condición que quita la indeterminación y despeja.

@@ teoremas | Teoremas de Bolzano, Rolle y del valor medio
### R
**Bolzano:** si $f$ es continua en $[a,b]$ y $f(a)\,f(b)<0$, existe $c\in(a,b)$ con $f(c)=0$. **Rolle:** si $f$ es continua en $[a,b]$, derivable en $(a,b)$ y $f(a)=f(b)$, existe $c$ con $f'(c)=0$. **Valor medio (Lagrange):** con las mismas hipótesis, existe $c$ con $f'(c)=\dfrac{f(b)-f(a)}{b-a}$.
### M
1. Comprueba las hipótesis una a una (continuidad, derivabilidad, signos o igualdad de valores en los extremos).
2. Si se cumplen, cita el teorema y concluye la existencia de $c$.
3. Si piden hallar $c$, resuelve $f(c)=0$, $f'(c)=0$ o $f'(c)=\dfrac{f(b)-f(a)}{b-a}$ y elige la solución dentro del intervalo abierto.
4. Para probar que hay una única raíz, combina Bolzano con la monotonía (Rolle por reducción al absurdo).

@@ integral-indefinida | Primitivas inmediatas
### R
$\int x^n\,dx=\dfrac{x^{n+1}}{n+1}+C\ (n\neq-1)$; $\int\dfrac{1}{x}\,dx=\ln|x|+C$; $\int e^{kx}\,dx=\dfrac{e^{kx}}{k}+C$; $\int\dfrac{u'}{u}\,dx=\ln|u|+C$; $\int\sin x\,dx=-\cos x+C$; $\int\cos x\,dx=\sin x+C$. Linealidad: $\int(af+bg)=a\int f+b\int g$. Para $F(x)$ con $F(a)=b$ se usa la constante $C$.
### M
1. Reescribe el integrando como suma de potencias (separa fracciones, pasa raíces a exponente fraccionario).
2. Integra término a término.
3. Si piden una primitiva concreta, impón la condición $F(a)=b$ para hallar $C$.
4. Deriva el resultado para comprobarlo.

@@ integral-metodos | Integrales: cambio de variable, partes y fracciones simples
### R
**Cambio de variable:** $t=g(x)$, $dt=g'(x)\,dx$. **Por partes:** $\int u\,dv=u\,v-\int v\,du$ (regla ALPES: arcos, logaritmos, polinomios, exponenciales, senos). **Racionales:** si el grado del numerador es mayor o igual que el del denominador, se divide; después se descompone en fracciones simples $\dfrac{A}{x-a}+\dfrac{B}{x-b}$.
### M
1. Decide el método: ¿hay una función y su derivada (cambio de variable)?, ¿un producto de tipos distintos (partes)?, ¿un cociente de polinomios (fracciones simples)?
2. Aplica el método y simplifica; si es por partes, elige $u$ y $dv$ y repite si es necesario.
3. Deshaz el cambio y añade $+C$.
4. Si es definida, cambia los límites con la variable o deshaz el cambio antes de aplicar Barrow.
5. Comprueba derivando.

