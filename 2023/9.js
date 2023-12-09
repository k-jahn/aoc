// =============================  Advent of Code  =============================
// Solution Day 9 of 2023
// See https://adventofcode.com/2023/day/9

module.exports = class MirageMaintenance {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.lines = str.split('\n').map((l) => l.split(' ').map((d) => +d));
	}

	solvePart1() {
		const derivatives = this.lines.map((arr) => {
			const out = [];
			let current = arr;
			while (current.some((e) => e)) {
				out.push(current);
				const newArr = new Array(current.length - 1)
					.fill(0)
					.map((_, i) => current[i + 1] - current[i]); // eslint-disable-line no-loop-func
				current = newArr;
			}
			return out;
		});
		return derivatives
			.map((lines) => lines.reduceRight((acc, l) => l[l.length - 1] + acc, 0))
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		const derivatives = this.lines.map((arr) => {
			const out = [];
			let current = arr;
			while (current.some((e) => e)) {
				out.push(current);
				const newArr = new Array(current.length - 1)
					.fill(0)
					.map((_, i) => current[i + 1] - current[i]); // eslint-disable-line no-loop-func
				current = newArr;
			}
			return out;
		});
		return derivatives
			.map((lines) => lines.reduceRight((acc, l) => l[0] - acc, 0))
			.reduce((a, b) => a + b);
	}
};
