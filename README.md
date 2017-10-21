# Baer'a algorithm

1. [Description in English](#english-version)
2. [Description in Polish](#polish-version)

## <a name="english-version"></a> Description in English

### Assumptions
* in simulated system are two processors with speed rate b<sub>1</sub> = 2 and b<sub>2</sub> = 1 
* standard time of task execution is τj = 2, j ∈ ℕ
* input graph of tasks is anti-tree

### Algorithm description
The main assumption of this algorithm is that for specific set of tasks and processors in optimal solution 
may appear only pause in work of processor with smaller speed rate. Let's assume that k<sub>1</sub>, 
k<sub>2</sub> will respectively time of work  processors P<sub>1</sub> and P2<sub>2</sub>. Parameters
k<sub>1</sub> and k<sub>2</sub> are used to keep amount of executed tasks respectively by processor P<sub>1</sub> and P<sub>2</sub>. 
Algorithm work flow is like below.

### Algorithm steps
1. Specify priorities of all tasks. Task counter q := n,  k<sub>1</sub> :=  k<sub>2</sub> := 0
2. Assign available in moment  k<sub>1</sub> task with the most priority to processor P<sub>1</sub>.
q := q - 1, k<sub>1</sub> := k<sub>1</sub> + 1
3. If is any available task in moment k<sub>2</sub>, so assign most important task to processor 
P<sub>2</sub>.  q := q - 1, k<sub>2</sub> := k<sub>2</sub> + 1
4. If is any available task in moment k<sub>1</sub> assign the most important task to processor 
P<sub>1</sub> and set q := q - 1, k<sub>1</sub> := k<sub>1</sub> + 1. If q equals to 1 go to step 5, 
otherwise go to step 2.
5. Assign last task to processor P<sub>1</sub>. C<sub>*max</sub> = k<sub>1</sub> + 1.

>Calculation complexity of this algorithm is O(n), because one task is executed only once time,
 and time of execution is constant.



## <a name="polish-version"></a> Description in polish

### Założenia:

* w systemie są dwa procesory o współczynnikach prędkości b<sub>1</sub> = 2, b<sub>2</sub> = 1
* standardowe czas wykonywania zadań τj = 2, j = 1, 2, …, n 
* zbiór zadań tworzy antydrzewo

### Opis algorytmu:

Idea tego algorytmu jest oparta na twierdzeniu, że dla tak określonego zbioru zadań i
procesorów, w rozwiązaniu optymalnym może wystąpić przestój tylko procesora o mniejszym
współczynniku b. Oznaczamy przez k1 i k2 liczniki czasu wykonywania zadań odpowiednio dla
procesora P1 (szybszego) i P2. Przebieg algorytmu Baera jest następujący.

### Zapis w postaci ciągu kroków:

1. Określ poziomy zadań, licznik zadań q := n, k<sub>1</sub> := k<sub>2</sub> := 0
2. Przydziel dostępne w chwili k<sub>1</sub> zadanie o najwyższym poziomie do procesora P<sub>1</sub>, q := q - 1, 
k<sub>1</sub> := k<sub>1</sub> + 1
3. Jeśli są zadania dostępne w chwili k2, to przydziel jedno z nich o najwyższym poziomie
do procesora P<sub>2</sub>, q := q - 1, k<sub>2</sub> := k<sub>2</sub> + 2
4. Jeśli są zadania dostępne w chwili k<sub>1</sub>, to przydziel zadanie o najwyższym poziomie do
procesora P<sub>1</sub>, q := q - 1, k<sub>1</sub> := k<sub>1</sub> + 1. Jeśli q = 1, to przejdź do kroku 5, w przeciwnym
przypadku powtórz krok 2
5. Przydziel ostatnie zadania do procesora P<sub>1</sub>, C*max := k1 + 1

> Złożoność obliczeniowa tego algorytmu jest O(n), gdyż każde zadania jest rozpatrywane tylko
raz, a czas z tym związany jest stały. 




Baer's algorithm visualization and implementation 

Visualisation
-------------
Visualisation is written in javascript and HTML5. 

Author: [Jakub Książek](https://github.com/Cubix92)


Console program
---------------
Program is implementation written in C lang as console application.
Graph matrix is hardcoded in program as array of int's.
Gantt's graph is printing as console output



Compilation
-----------
```bash
gcc -o bayer bayer.c -lm
```


Author: [Daniel Hornik](https://github.com/daniel1302)
