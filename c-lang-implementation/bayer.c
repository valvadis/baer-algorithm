#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>
#define MAX_LEVEL 4
#define END_VALUE 0xDEADBEEF

/**
 * Funkcja zlicza ilość węzłów w grafie przedstawiającym zależnośći zadań
 */
int countNodes(int levels) 
{
	if (levels < 1) {
		return 2;
	}

	return pow(2, levels) + countNodes(--levels);
}


/**
 * Funkcja sprawdza czy przekazany graf jest antydrzewem, jeśli nie to
 * zwraca 0 i wyświetla odpowiedni komunikat
 * graph - wskaźnik na typ integer, wskazuje na macież grafu.
 */

int matrixTest(int *graph) {
	int x;
	int y;
	int nodes = countNodes(MAX_LEVEL-1);
	int realIndex;
	int children;
	for (x=0; x<nodes; x++) {
		children = 0;
		for (y=0; y<nodes; y++) {
			realIndex = x + nodes*y;
			if (graph[realIndex] == 1) {
				children++;
			}
		}
		if (children > 1) {
			printf("Sorry, but set matrix must by representation of anti-tree \n");
			return 0;
		}
	}

	return 1;
}
/**
 * Funkcja wyznacza poziomy węzłów
 */
int findJumps(int *graph, int x, int jumps) {
	int nodes = countNodes(MAX_LEVEL-1);
	int y;


	for(y=nodes-1; y>=0; y--) {
		int realIndex = x + nodes*y;
		if (graph[realIndex] == 1) {
			return findJumps(graph, y, ++jumps);
		}
	}

	return jumps;
}

/**
 * Funkcja zbiera węzeł o najwyższym poziomie z tablicy węzłów
 */
int findMaxIndex(int *levels, int nodes) {
	int maxValue = 0;
	int maxIndex = -1;
	int i;
	for (i=nodes-1;i>=1;i--) {
		if (levels[i] > maxValue) {
			maxIndex = i;
			maxValue = levels[i];
		}
	}
	if (maxIndex > 0) {
		levels[maxIndex] = 0;
	}

	return maxIndex;
}

/**
 * Pobiera kolejny węzeł z tablicy
 */
int getNextNode(int *levels, int nodes) {
	int node = findMaxIndex(levels, nodes);

	if (node == -1) {
		node = 0;
	}

	return node+1;
}

/** 
 * Narysowanie wizualizacji, przekazane tablice proc1Arr i proc2Arr trzymają kolejne numery zadan
 * A tablice Amount trzymają ilośc każdego na procesorze
 */
void printVisualalization(int *proc1Arr, int *proc2Arr, int proc1Amount, int proc2Amount) {
	int j;
	printf("-------");
	for (j=0;j<proc2Amount;j++) {
		printf("----------");
	}
	printf("\n| P1 |");
	for (j=0;j<proc1Amount;j+=2) {
		printf(" %2d | %2d |", proc1Arr[j], proc1Arr[j+1]);
	}
	printf("\n-------");
	for (j=0;j<proc2Amount;j++) {
		printf("----------");
	}
	printf("\n| P2 |");
	for (j=0;j<proc2Amount;j++) {
		printf("    %2d   |", proc2Arr[j]);
	}
	printf("\n------");
	for (j=0;j<proc2Amount;j++) {
		printf("----------");
	}
	printf("\n");
}

void main() {
	int alocatedSize =  countNodes(MAX_LEVEL-1);
	alocatedSize *= alocatedSize;

	int *graph = malloc(alocatedSize * sizeof(int));
	/**
	 * Zakodowana maciez antydrzewa
	 */
	int arr[256] = {
	/*	 	 1,	 2,	 3,	 4,	 5,	 6,	 7,	 8,	 9,	10,	11,	12,	13,	14,	15,	16*/
	/* 1*/	 0,	 1,	 0,	 0,	 0,	 1,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 2*/	 0,	 0,	 1,	 0,	 1,	 0,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 3*/	 0,	 0,	 0,	 1,	 0,	 0,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 4*/	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 5*/	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 6*/	 0,	 0,	 0,	 0,	 0,	 0,	 1,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 7*/	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 1,	 1,	0,	0,	0,	0,	0,	0,	0,
	/* 8*/	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 9*/	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 10*/	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 11*/	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 12*/	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 13*/	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 14*/	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 15*/	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0,
	/* 16*/	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	 0,	0,	0,	0,	0,	0,	0,	0
	};	
	//9 8 4 7 5 3 6 2 1
	
	memcpy(graph, arr, sizeof(int)*alocatedSize);
	
	if (matrixTest(graph) == 0) {
		return;
	}

	int nodes = countNodes(MAX_LEVEL-1);
	int *levels = malloc(sizeof(int)*nodes);


	int x = 0;
	for (x=0; x< nodes; x++) {
		levels[x] = findJumps(graph, x, 0);
	}


	int maxLevel=-1;
	int maxNode;
	int _nodes = 1;
	for (x=1; x<nodes; x++) {
		if (levels[x] > 0) {
			_nodes++;
		} else {
			break;
		}
	}
	

	/* Właściwa część algorytmu */
	int *proc1 = malloc(sizeof(int) * nodes);
	int *proc2 = malloc(sizeof(int) * nodes);
	int _proc1 = 0;
	int _proc2 = 0;
	int j = _nodes;
	while(j > 0) {
		proc1[_proc1++] = getNextNode(levels, _nodes);
		j--;
		if (j>1) {
			proc2[_proc2++] = getNextNode(levels, _nodes);
			proc1[_proc1++] = getNextNode(levels, _nodes);
			j-=2;
		} else {
			proc2[_proc2++] = 0;
			proc1[_proc1++] = getNextNode(levels, _nodes);
			j--;
		}

	}

	printVisualalization(proc1, proc2, _proc1, _proc2);
	
}