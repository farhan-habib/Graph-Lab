const {GEdge} = require("./Gedge.js");
class GNode{
	#value;
	constructor(value){
		this.#value = value;
	};

	get value(){
		return this.#value;
	};

	#connections = [];
	get connections(){
		return this.#connections.map(m=> ({node: m.node.value, weight: m.weight}));
		// return this.#connections.map(m => {m.node.value, m.weight});
	}
	addConnection(node, weight){
		let edge = new GEdge(node, weight);
		this.#connections.push(edge);
	}


	toString(){
		return this.#value;
	}

};



module.exports = {GNode};