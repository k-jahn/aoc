// =============================  Advent of Code  =============================
// Solution Day 1 of 2015
// See https://adventofcode.com/2015/day/1

module.exports = class NotQuiteLisp {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
	}

	solvePart1() {
		return this.str.replace(/\)/g, '').length - this.str.replace(/\(/g, '').length;
	}

	solvePart2() {
		let f = 0;
		const s = this.str.split('');
		for (let i = 0; i < s.length; i++) {
			f += s[i] === '(' ? 1 : -1;
			if (f < 0) return i + 1;
		}
		throw new Error();
	}
};
