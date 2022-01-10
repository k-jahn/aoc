// =============================  Advent of Code  =============================
// Solution Day 15 of 2020
// See https://adventofcode.com/2020/day/15

module.exports = class RambunctiousRecitation {
	constructor(str) {
		this.numbers = str.split(',').map((d) => +d);
	}

	solvePart1() {
		const revNumbers = this.numbers.slice().reverse();
		while (revNumbers.length < 2020) {
			revNumbers.unshift(revNumbers.slice(1).indexOf(revNumbers[0]) + 1);
		}
		return revNumbers[0];
	}

	solvePart2() {
		const lookBack = {};
		this.numbers.forEach((n, i) => {
			lookBack['r' + n.toString(16)] = i + 1;
		});

		let lastN;
		let n = this.numbers[this.numbers.length - 1];
		for (let i = this.numbers.length + 1; i <= 30000000; i++) {
			lastN = n;
			const key = 'r' + lastN.toString(16);
			n = key in lookBack ? i - lookBack[key] - 1 : 0;

			lookBack[key] = i - 1;
		}
		return n;
	}
};
