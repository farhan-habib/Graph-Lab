const { GEdge } = require("./GEdge.js");

class GNode {
	#value;
	/**
	 *
	 * @param {String} value the value of the node
	 */
	constructor(value) {
		this.#value = value;
	}

	/**
	 * Get the value of the node
	 * @returns {String} the value of the node
	 */
	get value() {
		return this.#value;
	}

	#connections = [];

	/**
	 * Description
	 * @returns {Array.<{node: String, weight: Number}>} Returns an array containing all of the edges which leave from this node
	 */
	get connections() {
		return this.#connections.map((m) => ({
			node: m.node.value,
			weight: m.weight,
		}));
	}
	/**
	 * Adds a new connection from this node to another
	 * @param {GNode} node The node which the edge is going to
	 * @param {Number} weight  The weight of the edge
	 */
	addConnection(node, weight) {
		let edge = new GEdge(node, weight);
		this.#connections.push(edge);
	}
}

module.exports = { GNode };
