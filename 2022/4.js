// =============================  Advent of Code  =============================
// Solution Day 4 of 2022
// See https://adventofcode.com/2022/day/4

module.exports = class CampCleanup {
	constructor(str) {
		this.str = str;
		this.pairs = this.str
			.split('\n')
			.map((line) => line.split(',').map((elf) => elf.split('-').map((z) => parseInt(z, 10))));
	}

	isContained([a, b]) {
		return (a[0] >= b[0] && a[1] <= b[1]) || (a[0] <= b[0] && a[1] >= b[1]);
	}

	isOverlap([a, b]) {
		return !((a[0] > b[1]) || (a[1] < b[0]));
	}

	solvePart1() {
		return this.pairs
			.filter(this.isContained)
			.length;
	}

	solvePart2() {
		return this.pairs
			.filter(this.isOverlap)
			.length;
	}
};
