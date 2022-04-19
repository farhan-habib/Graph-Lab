const comparasionUtils  = class {


	//static function that takes in two elements, a and b, and a comparator functions. Returns true if a is less than b, false otherwise.
	static lessThan(a, b, comparator) {
		return comparator(a, b) < 0;
	}


}
/**
 * @template T
 */
class Heap {
	#heap = [];

	// comparator must be a function(a,b)
	// which returns:
	// < 0 if a < b
	// = 0 if a == b
	// > 0 if a > b
	/**
	 *  Returns less than 0 if a < b, 0 if a == b, and greater than 0 if a > b
	 * @param {T} a The first element to be compared
	 * @param {T} b	The second element to be compared
	 * @throws if the comparator function has not been overwritten
	 */
	#comparator = function (a, b) {
		throw "Comparator not defined!";
	};
	/**
	 *
	 * @param {Function} comparator Must be a comparator function that returns less than 0 if a < b, 0 if a == b, and greater than 0 if a > b
	 * @throws if the comparator function is null or not defined.
	 */
	constructor(comparator) {
		if (comparator == null) {
			throw "Comparator can not be null";
		}
		this.#heap = [];
		this.#comparator = comparator;
	}
	/**
	 * Returns root without modifiying the heap.
	 * @returns {T} Root of the heap. Returns undefined if heap is empty.
	 */
	peek() {
		return this.#heap[0];
	}
	/**
	 * Sees if the heap is empty
	 * @returns {Boolean} True if the heap is empty, false otherwise.
	 */
	isEmpty() {
		return this.#heap.length === 0;
	}
	/**
	 * Adds an element to the heap
	 * @param {T} element The element to be added to the heap
	 * @throws Will throw if the element is undefined
	 */
	add(element) {
		if (element == undefined) {
			throw "The element can not be undefined"; //throw if undefined
		}
		this.#heap.push(element); //insert element to end of heap
		//heapify up
		let current = this.#heap.length - 1;
		let parent = Math.floor((current - 1) / 2);
		this.#heapifyup();
	}
	/**
	 * pops the top element off of the heap and returns it
	 * @returns {T} The root of the heap.
	 * @throws If the heap is empty.
	 */
	remove() {

		if (this.#heap.length == 0) {
			return undefined;
		}
		if (this.#heap.length == 1) {
			return this.#heap.pop();
		}
		const removed = this.#heap[0];
		this.#heap[0] = this.#heap.pop();

		this.#heapifydown();
		return removed;
	}
	//Modularized functions

	#heapifyup() {
		let current = this.#heap.length - 1;
		let parent = Math.floor((current - 1) / 2);

		while (current > 0 && comparasionUtils.lessThan(this.#heap[current], this.#heap[parent], this.#comparator)) {
			//swap this.#heap[parent] and this.#heap[current];
			let swap = this.#heap[parent];
			this.#heap[parent] = this.#heap[current];
			this.#heap[current] = swap;
			current = parent;
			parent = Math.floor((current - 1) / 2);
		}
	}
	#heapifydown() {
		let current = 0;

		while (current < this.#heap.length) {

			let left = (2 * current) + 1;
			let right = (2 * current) + 2;
			let smallest = current;
			//checking if index is less than length rather than checking if truthy or falsy in case element put into Heap is Null
			if (right < this.#heap.length && comparasionUtils.lessThan(this.#heap[right], this.#heap[smallest], this.#comparator)) {//right child is defined
				smallest = right;
			}
			if (left < this.#heap.length && comparasionUtils.lessThan(this.#heap[left], this.#heap[smallest], this.#comparator)) {//left child is defined
				smallest = left;
			}
			if (smallest === current) {
				return;
			}
			let swap = this.#heap[current];
			this.#heap[current] = this.#heap[smallest];
			this.#heap[smallest] = swap;
			current = smallest;
		}
	}
}

module.exports = { Heap };