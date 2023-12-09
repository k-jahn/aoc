const md5 = require('md5');
// =============================  Advent of Code  =============================
// Solution Day 4 of 2015
// See https://adventofcode.com/2015/day/4

module.exports = class TheIdealStockingStuffer {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
	}

	solvePart1() {
		for (let i = 0; true; i++) {
			// if (i % 1000 === 0) console.log(i);
			const md5str = md5(this.str + i);
			if (md5str.slice(0, 5) === '00000') return i;
		}
	}

	solvePart2() {
		for (let i = 0; true; i++) {
			if (i % 10000 === 0) console.log(i);
			const md5str = md5(this.str + i);
			if (md5str.slice(0, 6) === '000000') return i;
		}
	}
};
