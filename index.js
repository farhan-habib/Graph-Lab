const fs = require("fs");
const path = require("path");

const { Graph } = require("./Classes/graph/Graph.js");
const { Heap } = require("./Classes/heap.js");

//commandline input
//Read the file input from the command line in the form "node index.js <filename>"
const fileName = process.argv[2];

//turn the filename into a filepath
const filePath = path.join(__dirname, fileName);

//get the contents of the file
const fileContents = fs.readFileSync(filePath, "utf8");
// console.log(fileContents)

//split the file into an 2d array which represents the adjacency matrix of the graph.
const adjacenyMatrix = fileContents
	.split("\n")
	.map((row) => row.split(" ").map((n) => +n));

let inputGraph = new Graph();

for (let fromIndex = 0; fromIndex < adjacenyMatrix.length; fromIndex++) {
	inputGraph.addNode(fromIndex.toString());
}

for (let fromIndex = 0; fromIndex < adjacenyMatrix.length; fromIndex++) {
	for (let toIndex = 0; toIndex < adjacenyMatrix.length; toIndex++) {
		if (adjacenyMatrix[fromIndex][toIndex] != 0) {
			inputGraph.addConnection(
				fromIndex.toString(),
				toIndex.toString(),
				adjacenyMatrix[fromIndex][toIndex]
			);
		}
	}
}
{
	/*
.########..########..####.##.....##.##.....##..######.
.##.....##.##.....##..##..###...###.###...###.##....##
.##.....##.##.....##..##..####.####.####.####.##......
.########..########...##..##.###.##.##.###.##..######.
.##........##...##....##..##.....##.##.....##.......##
.##........##....##...##..##.....##.##.....##.##....##
.##........##.....##.####.##.....##.##.....##..######.
*/
	//Prims Algorithm
	let primGraph = new Graph();
	let primConnectionHeap = new Heap((a, b) => a.weight - b.weight);
	let startingNode = inputGraph.nodes[0];
	primGraph.addNode(startingNode);
	let startingNodeInfo = inputGraph.nodeInfo(startingNode);
	for (let i = 0; i < startingNodeInfo.length; i++) {
		primConnectionHeap.add({
			from: startingNode,
			to: startingNodeInfo[i].node,
			weight: startingNodeInfo[i].weight,
		});
	}

	while (primConnectionHeap.peek() != undefined) {
		let currentConnection = primConnectionHeap.remove();
		let curr = currentConnection.to;
		if (primGraph.nodes.includes(curr)) continue;
		primGraph.addNode(curr);
		primGraph.addConnection(
			currentConnection.from,
			curr,
			currentConnection.weight
		);

		let currInfo = inputGraph.nodeInfo(curr);
		for (let i = 0; i < currInfo.length; i++) {
			primConnectionHeap.add({
				from: curr,
				to: currInfo[i].node,
				weight: currInfo[i].weight,
			});
		}
	}
	/**
	 * Output the MST created from prim's algorithm
	 */
	let primOutput = [];
	let primCost = 0;
	for (let i = 0; i < primGraph.nodes.length; i++) {
		primOutput.push(Array(primGraph.nodes.length).fill(0));
		let currNode = primGraph.nodes[i];
		let currNodeConnections = primGraph.nodeInfo(currNode);
		for (let j = 0; j < currNodeConnections.length; j++) {
			primCost += currNodeConnections[j].weight;
			primOutput[i][currNodeConnections[j].node] =
				currNodeConnections[j].weight;
		}
	}

	primOutput = primOutput.map((m) => m.join(" ")).join("\n");
	console.log("## Minimum Spanning Tree");
	console.log();
	console.log(primOutput);
	console.log(`Cost: ${primCost}`);
}
console.log();
{
	/*
.########........##.####.##....##..######..########.########.....###...
.##.....##.......##..##..##...##..##....##....##....##.....##...##.##..
.##.....##.......##..##..##..##...##..........##....##.....##..##...##.
.##.....##.......##..##..#####.....######.....##....########..##.....##
.##.....##.##....##..##..##..##.........##....##....##...##...#########
.##.....##.##....##..##..##...##..##....##....##....##....##..##.....##
.########...######..####.##....##..######.....##....##.....##.##.....##
*/

	//for our implementation of djikstra's algorithm, we want to always go from node A to node F
	//for this project in specific, A will always be at position 0 of the input array, and B will always be at position 5 of the array.

	//for our purposes, if the weight of a graph is negative one, then it is an infinite weight.
	let djikstraDistance = Array(inputGraph.nodes.length).fill({
		from: null,
		weight: -1,
	});
	let start = +inputGraph.nodes[0]; //A
	let end = +inputGraph.nodes[5]; //F
	// djikstraDistance
	djikstraDistance[start] = { from: null, weight: 0 };

	let visited = [];

	let curr = start;

	while (curr != end) {
		visited.push(curr);
		let currEdges = inputGraph.nodeInfo(curr);
		//replace any edges in the djikstrasDistance array with the new weight if the new weight is less than the old weight
		for (let i = 0; i < currEdges.length; i++) {
			let currWeight =
				djikstraDistance[curr].weight + currEdges[i].weight;
			if (
				djikstraDistance[currEdges[i].node].weight == -1 ||
				currWeight < djikstraDistance[currEdges[i].node].weight
			) {
				djikstraDistance[currEdges[i].node] = {
					from: +curr,
					weight: currWeight,
				};
			}
		}
		//find the node with the smallest weight in the djikstraDistance array that is not in the visited array
		let lowestWeight = -1;
		let lowestWeightNode = null;
		for (let i = 0; i < djikstraDistance.length; i++) {
			if (visited.includes(i)) continue;
			if (djikstraDistance[i].weight == -1) continue;
			if (
				lowestWeight == -1 ||
				djikstraDistance[i].weight < lowestWeight
			) {
				lowestWeight = djikstraDistance[i].weight;
				lowestWeightNode = i;
			}
		}
		curr = lowestWeightNode;
	}

	//find djikstra's path
	let djikstraPath = [];
	let currNode = end;
	while (currNode != start) {
		djikstraPath.push(currNode);
		currNode = djikstraDistance[currNode].from;
	}
	djikstraPath.push(start);
	djikstraPath.reverse();

	//for this lab in specific, the nodes in positions 0-6 correspond to the letters A-G
	let correspondingValues = {
		0: "A",
		1: "B",
		2: "C",
		3: "D",
		4: "E",
		5: "F",
		6: "G",
	};
	djikstraPath = djikstraPath.map((m) => correspondingValues[m]);
	let djikstraPathWeight = djikstraDistance[end].weight;

	console.log("## Shortest Path");
	console.log();
	console.log(djikstraPath.join("->"));
	console.log(`Cost: ${djikstraPathWeight.toFixed(1)}`);
}
