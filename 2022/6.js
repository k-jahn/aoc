// =============================  Advent of Code  =============================
// Solution Day 6 of 2022
// See https://adventofcode.com/2022/day/6

module.exports = class TuningTrouble {
	constructor(str) {
		this.str = str;
	}

	solvePart1() {
		for (let i = 4; i < this.str.length; i++) {
			if (!/(.).*\1/.test(this.str.slice(i - 4, i))) return i;
		}
		throw new Error('Not found');
	}

	solvePart2() {
		for (let i = 14; i < this.str.length; i++) {
			if (!/(.).*\1/.test(this.str.slice(i - 14, i))) return i;
		}
		throw new Error('Not found');
	}
};
