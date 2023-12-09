// =============================  Advent of Code  =============================
// Solution Day 12 of 2015
// See https://adventofcode.com/2015/day/12

module.exports = class JSAbacusFrameworkio {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
	}

	solvePart1() {
		return [...this.str.match(/(?<=[^"0-9-])-?\d+(?=[^"0-9-])/g)]
			.map((d) => +d)
			.reduce((a, b) => (a + b));
	}

	solvePart2() {
		const data = JSON.parse(this.str);
		const crawler = (x) => {
			if (typeof x === 'number') return x;
			if (typeof x === 'object') {
				if (Array.isArray(x)) {
					return x.map((v) => crawler(v))
						.reduce((a, b) => a + b);
				}
				if (Object.values(x).some((val) => val === 'red')) return 0;
				return Object.values(x).map((v) => crawler(v))
					.reduce((a, b) => a + b);
			}
			return 0;
		};
		return crawler(data);
	}
};
