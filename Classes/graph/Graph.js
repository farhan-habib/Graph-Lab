const {GNode} = require("./GNode.js");
class Graph {
	#nodes = {};
	constructor() {}
	get nodes() {
		return Object.keys(this.#nodes);
	}
	addNode(name) {
		if(this.#nodes[name] != null) throw new Error(`A node with the name \"${name}\" already exists`);
		let node = new GNode(name);
		this.#nodes[name] = (node);
	}
	addConnection(nodeFrom, nodeTo, weight){
		if(this.#nodes[nodeFrom] == null) throw new Error(`Node \"${nodeFrom}\" does not exist`);
		if(this.#nodes[nodeTo] == null) throw new Error(`Node \"${nodeTo}\" does not exist`);
	this.#nodes[nodeFrom].addConnection(this.#nodes[nodeTo], weight);
	}
	nodeInfo(nodeName) {
		if(this.#nodes[nodeName] == null) throw new Error(`Node \"${nodeName}\" does not exist`);
			return this.#nodes[nodeName].connections;
	}
}

module.exports = { Graph };
