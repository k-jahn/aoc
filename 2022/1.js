// =============================  Advent of Code  =============================
// Solution Day 1 of 2022
// See https://adventofcode.com/2022/day/1

module.exports = class CalorieCounting {
	constructor(str) {
		this.str = str;
		this.elves = this.str.split('\n\n')
			.map((l) => l.split('\n').map((w) => +w));
		this.cals = this.elves.map((e) => e.reduce((a, b) => a + b));
	}

	solvePart1() {
		return Math.max(...this.cals);
	}

	solvePart2() {
		return this.cals.sort((a, b) => b - a)
			.slice(0, 3)
			.reduce((a, b) => a + b);
	}
};
