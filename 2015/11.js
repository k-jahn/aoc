/* eslint-disable no-continue */
// =============================  Advent of Code  =============================
// Solution Day 11 of 2015
// See https://adventofcode.com/2015/day/11

module.exports = class CorporatePolicy {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
	}

	nextValid(str) {
		const increment = (s) => s.replace(/([^z])(z*)$/, (_, d, z) => {
			const from = 'abcdefghijklmnopqrstuvwxy';
			const to = 'bcdefghjjkmmnppqrstuvwxyz';
			const index = from.indexOf(d);
			return to.slice(index, index + 1) + 'a'.repeat(z.length);
		});
		let currentStr = str.replace(/([ilo])(.*)$/, (_, d, r) => {
			const from = 'ilo';
			const to = 'jmp';
			const index = from.indexOf(d);
			return to.slice(index, index + 1) + 'a'.repeat(r.length);
		});
		while (currentStr !== 'zzzzzzzz') {
			currentStr = increment(currentStr);
			if (!/(.)\1.*(.)\2/.test(currentStr)) continue;
			if (!/abc|bcd|cde|def|efg|fgh|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/.test(currentStr)) continue;
			return currentStr;
		}
		throw new Error();
	}

	solvePart1() {
		return this.nextValid(this.str);
	}

	solvePart2() {
		return this.nextValid(this.nextValid(this.str));
	}
};
