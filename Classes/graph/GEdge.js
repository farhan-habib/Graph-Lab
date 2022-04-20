class GEdge {
	#node;
	#weight;
	/**
	 * A class which serves as a directed edge from one node to another
	 * @param {GNode} node
	 * @param {Number} weight
	 */
	constructor(node, weight) {
		this.#node = node;
		this.#weight = weight;
	}

	/**
	 * Returns the node that the Edge points to
	 * @returns {GNode}
	 */
	get node() {
		return this.#node;
	}

	/**
	 * Returns the weight of the Edge
	 * @returns {Number}
	 */
	get weight() {
		return this.#weight;
	}
}
module.exports = { GEdge };
