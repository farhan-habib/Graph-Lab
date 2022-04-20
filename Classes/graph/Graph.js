const { GNode } = require("./GNode.js");
class Graph {
	#nodes = {};
	constructor() {}

	/**
	 *
	 * @returns {Array.<String>} a string containing the names of all of the nodes
	 */
	get nodes() {
		return Object.keys(this.#nodes);
	}
	/**
	 * Adds a new node with a specific name to the graph
	 * @param {String} name The name of the node
	 */
	addNode(name) {
		if (this.#nodes[name] != null)
			throw new Error(`A node with the name \"${name}\" already exists`);
		let node = new GNode(name);
		this.#nodes[name] = node;
	}
	/**
	 * Adds an edge between two nodes to the graph
	 * @param {String} nodeFrom The name of the node which the edge originates from
	 * @param {String} nodeTo The name of the node which the edge is going to
	 * @param {Number} weight The weight of the edge
	 */
	addConnection(nodeFrom, nodeTo, weight) {
		if (this.#nodes[nodeFrom] == null)
			throw new Error(`Node \"${nodeFrom}\" does not exist`);
		if (this.#nodes[nodeTo] == null)
			throw new Error(`Node \"${nodeTo}\" does not exist`);
		this.#nodes[nodeFrom].addConnection(this.#nodes[nodeTo], weight);
	}
	/**
	 * Returns all of the edges which originate from a node
	 * @param {String} nodeName The name of the node
	 * @returns {Array.<{node: String, weight: Number}>} An array containing all the nodes of the
	 */
	nodeInfo(nodeName) {
		if (this.#nodes[nodeName] == null)
			throw new Error(`Node \"${nodeName}\" does not exist`);
		return this.#nodes[nodeName].connections;
	}
}

module.exports = { Graph };
