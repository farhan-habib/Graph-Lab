const fs = require("fs");
const path = require("path");


const {Graph} = require("./classes/graph.js");

//commandline input
//Read the file input from the command line in the form "node index.js <filename>"
const fileName = process.argv[2];

//turn the filename into a filepath
const filePath = path.join(__dirname, fileName);

//get the contents of the file
const fileContents = fs.readFileSync(filePath, "utf8");
// console.log(fileContents)

//split the file into an 2d array which represents the adjacency matrix of the graph.
const adjacenyMatrix = fileContents.split("\n").map(row => row.split(" ").map(n => +n));



// let graph = new Graph();
// graph.addNode("test");
// graph.addNode("test2");
// graph.addConnection("test", "test2", 1);


// console.log(graph.nodes);