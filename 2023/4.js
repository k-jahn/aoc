// =============================  Advent of Code  =============================
// Solution Day 4 of 2023
// See https://adventofcode.com/2023/day/4

module.exports = class Scratchcards {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.lines = str.split('\n');
		this.results = this.lines.map((line) => {
			const [_, id, winStr, numStr] = line.match(/Card +(.*?): +(.*) \| +(.*)/);
			const [win, num] = [winStr, numStr].map((nStr) => nStr.split(/ +/).map((d) => +d));
			return { id, win, num };
		});
		// console.log(this.results);
	}

	solvePart1() {
		return this.results
			.map(({ win, num }) => {
				const winning = num.filter((n) => win.some((e) => e === n));
				return winning.length ? 2 ** (winning.length - 1) : 0;
			})
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		const amounts = new Array(this.results.length).fill(1);
		this.results.forEach(({ num, win }, i) => {
			const winning = num.filter((n) => win.some((e) => e === n)).length;
			for (let j = i + 1; j <= i + winning; j++) {
				amounts[j] += amounts[i];
			}
		});
		return amounts.reduce((a, b) => a + b);
	}
};
