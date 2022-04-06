Please note that design projects will start when we get back from break.

In this lab, you will implement both Primm's and Djikstra's Algorithm on a graph.

Program specifics:
The input file will be given to your program as the one and only command-line argument. If it's not provided, then the program should produce an error.
All output will apear on the console as specified below.
Your code must be commented appropriately.
Djikstra's Algorithm will ALWAYS be from Node A to Node F
Your program must include the following classes:
Main - handles file input and writing to the console
Graph<V,E> - represents a graph where V is the type of data in the vertex and E is the type of data on the edge
GNode<V> - represents a vertex in the graph
GEdge<E> - represents an edge in the graph
Input File
The input file will contain one graph represented as a weighted adjacency matrix where the weight indicates the cost of the directed edge.

2 2 3 2 0 0 3
2 0 0 0 0 3 0
3 0 0 2 0 3 0
2 0 2 0 3 4 3
0 0 0 3 0 2 4
0 3 3 4 2 0 0
3 0 0 3 4 0 0

Output

The output should consist of:
the graph from Prim's algorithm as a weighted adjancy matrix along with the cost
the path from Djikstra's algorithm and its cost (note the notation)

## Minimum Spanning Tree

0 2 0 2 0 0 3
0 0 0 0 0 3 0
0 0 0 0 0 0 0
0 0 2 0 0 0 0
0 0 0 0 0 0 0
0 0 0 0 2 0 0
0 0 0 0 0 0 0
Cost: 14.0

## Shortest Path

A->B->F
Cost: 5.0
