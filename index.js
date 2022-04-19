const fs = require("fs");
const path = require("path");

const { Graph } = require("./classes/graph/graph.js");
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
console.log(primOutput);
console.log(primCost);
