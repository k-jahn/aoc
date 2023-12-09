// =============================  Advent of Code  =============================
// Solution Day 5 of 2015
// See https://adventofcode.com/2015/day/5

module.exports = class DoesntHeHaveInternElvesForThis {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.strs = str.split('\n');
	}

	solvePart1() {
		return this.strs.filter((str) => {
			if (/ab|cd|pq|xy/.test(str)) return false;
			if (!/(.)\1/.test(str)) return false;
			if (str.replace(/[^aeiou]/g, '').length < 3) return false;
			return true;
		}).length;
	}

	solvePart2() {
		return this.strs.filter((str) => {
			if (!/(..).*\1/.test(str)) return false;
			if (!/(.).\1/.test(str)) return false;
			return true;
		}).length;
	}
};
