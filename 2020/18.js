// =============================  Advent of Code  =============================
// Solution Day 18 of 2020
// See https://adventofcode.com/2020/day/18

module.exports = class OperationOrder {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.lines = str.split('\n');
	}

	solvePart1() {
		const evaluate = (str) => {
			let current = str;
			const regEx = /\(([^()]+)\)/;
			while (regEx.test(current)) current = current.replace(regEx, (_, inner) => evaluate(inner));
			const opRegEx = /(\d+) ([+*]) (\d+)/;
			while (opRegEx.test(current)) current = current.replace(opRegEx, (_, a, op, b) => (op === '+' ? (+a) + (+b) : (+a) * (+b)));
			return +current;
		};
		return this.lines
			.map(evaluate)
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		const evaluate = (str) => {
			let current = str;
			const regEx = /\(([^()]+)\)/;
			while (regEx.test(current)) current = current.replace(regEx, (_, inner) => evaluate(inner));
			const addRegEx = /(\d+) \+ (\d+)/;
			while (addRegEx.test(current)) current = current.replace(addRegEx, (_, a, b) => (+a) + (+b));
			const mulRegEx = /(\d+) \* (\d+)/;
			while (mulRegEx.test(current)) current = current.replace(mulRegEx, (_, a, b) => (+a) * (+b));
			return +current;
		};
		return this.lines
			.map(evaluate)
			.reduce((a, b) => a + b);
	}
};
