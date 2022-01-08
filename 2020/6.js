// =============================  Advent of Code  =============================
// Solution Day 6 of 2020
// See https://adventofcode.com/2020/day/6

module.exports = class Customs {
	constructor(str) {
		this.forms = str.split('\n\n')
			.map((l) => l.split('\n'));
	}

	solvePart1() {
		return this.forms
			.map((g) => g.reduce((a, e) => {
				e.split('').forEach((l) => a.add(l));
				return a;
			}, new Set()).size)
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		return this.forms
			.map((g) => g[0].split('').filter((l) => g.every((f) => f.indexOf(l) !== -1)).length)
			.reduce((a, b) => a + b);
	}
};
