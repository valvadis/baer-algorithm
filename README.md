# Baer'a algorithm

# Założenia:

* w systemie są dwa procesory o współczynnikach prędkości b_1 = 2, b2 = 1
* standardowe czas wykonywania zadań τj = 2, j = 1, 2, …, n 
* zbiór zadań tworzy antydrzewo

# Opis algorytmu:

Idea tego algorytmu jest oparta na twierdzeniu, że dla tak określonego zbioru zadań i
procesorów, w rozwiązaniu optymalnym może wystąpić przestój tylko procesora o mniejszym
współczynniku b. Oznaczamy przez k1 i k2 liczniki czasu wykonywania zadań odpowiednio dla
procesora P1 (szybszego) i P2. Przebieg algorytmu Baera jest następujący.

# Zapis w postaci ciągu kroków:

1. Określ poziomy zadań, licznik zadań q:=n, k1 := k2 := 0
2. Przydziel dostępne w chwili k1 zadanie o najwyższym poziomie do procesora P1, q:=q-1,
k1 := k1 + 1
3. Jeśli są zadania dostępne w chwili k2, to przydziel jedno z nich o najwyższym poziomie
do procesora P2, q:=q-1, k2:=k2 + 2
4. Jeśli są zadania dostępne w chwili k1, to przydziel zadanie o najwyższym poziomie do
procesora P1, q:=q-1, k1:=k1+1. Jeśli q = 1, to przejdź do kroku 5, w przeciwnym
przypadku powtórz krok 2
5. Przydziel ostatnie zadania do procesora P1, C*
max := k1 + 1

> Złożoność obliczeniowa tego algorytmu jest O(n), gdyż każde zadania jest rozpatrywane tylko
raz, a czas z tym związany jest stały. 
