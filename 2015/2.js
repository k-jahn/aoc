// =============================  Advent of Code  =============================
// Solution Day 2 of 2015
// See https://adventofcode.com/2015/day/2

module.exports = class IWasToldThereWouldBeNoMath {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.dims = str.split('\n')
			.map((line) => line.split('x').map((d) => +d));
	}

	solvePart1() {
		return this.dims
			.map(([x, y, z]) => {
				const [a, b, c] = [x * y, x * z, y * z];
				return 2 * (a + b + c) + Math.min(a, b, c);
			})
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		return this.dims
			.map(([x, y, z]) => {
				const side = (x + y + z - Math.max(x, y, z)) * 2;
				return side + x * y * z;
			})
			.reduce((a, b) => a + b);
	}
};
