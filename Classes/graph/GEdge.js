class GEdge {
	#node;
	#weight;
	constructor(node, weight) {
		this.#node = node;
		this.#weight = weight;
	}

	get node() {
		return this.#node;
	}
	get weight() {
		return this.#weight;
	}
}
module.exports = { GEdge };
