// =============================  Advent of Code  =============================
// Solution Day 10 of 2015
// See https://adventofcode.com/2015/day/10

module.exports = class ElvesLookElvesSay {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
	}

	solvePart1() {
		const toSpoken = (str) => [...str.match(/(.)\1*/g)]
			.map((s) => '' + s.length + s.slice(-1))
			.join('');
		let current = this.str;
		for (let i = 0; i < 40; i++) {
			current = toSpoken(current);
		}
		return current.length;
	}

	solvePart2() {
		const toSpoken = (str) => [...str.match(/(.)\1*/g)]
			.map((s) => '' + s.length + s.slice(-1))
			.join('');
		let current = this.str;
		for (let i = 0; i < 50; i++) {
			current = toSpoken(current);
		}
		return current.length;
	}
};
