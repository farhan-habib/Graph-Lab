const {GNode} = require("./GNode.js");
class Graph {
	#nodes = {};
	constructor() {}
	get nodes() {
		return this.#nodes;
	}
	addNode(name, value = name) {
		let node = new GNode(value);
		this.#nodes[name] = (node);
	}
	addConnection(nodeFrom, nodeTo, weight){
	this.#nodes[nodeFrom].addConnection(nodeTo, weight);
	}
}

module.exports = { Graph };
