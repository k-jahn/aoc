// =============================  Advent of Code  =============================
// Solution Day 8 of 2015
// See https://adventofcode.com/2015/day/8

module.exports = class Matchsticks {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.lines = str.split('\n');
	}

	solvePart1() {
		return this.lines
			.map((line) => {
				const single = line.match(/\\\\|\\"/g)?.length || 0;
				const triple = line.match(/\\x[0-9a-f]{2}/g)?.length || 0;
				return 2 + single + 3 * triple;
			})
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		return this.lines
			.map((line) => {
				const single = line.match(/\\|"/g)?.length || 0;
				return 2 + single;
			})
			.reduce((a, b) => a + b);
	}
};
