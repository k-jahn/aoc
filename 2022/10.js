// =============================  Advent of Code  =============================
// Solution Day 10 of 2022
// See https://adventofcode.com/2022/day/10

module.exports = class CathodeRayTube {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.instructions = str.split('\n')
			.map((x) => {
				const [instruction, val] = x.split(' ');
				return { instruction, value: +val };
			});
	}

	solvePart1() {
		let reg = 1;
		let t = 1;
		const run = this.instructions.map(({instruction, value}) => {
			t += instruction === 'noop' ? 1 : 2;
			if (instruction === 'addx') reg += value || 0;
			return { t, r: reg };
		});
		const reversed = [...run].reverse();
		return [20, 60, 100, 140, 180, 220]
			.map((cycle) => {
				const state = reversed.find((s) => s.t <= cycle)
				return state.r * cycle;
			})
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		let reg = 1;
		let t = 1;
		const run = this.instructions.map(({instruction, value}) => {
			t += instruction === 'noop' ? 1 : 2;
			if (instruction === 'addx') reg += value || 0;
			return { t, r: reg };
		});
		const reversed = [...run].reverse();
		return new Array(40 * 6).fill(0)
			.map((_, i) => i + 1)
			.map((cycle) => {
				const state = reversed.find((s) => s.t <= cycle);
				return state?.r || 1;
			})
			.map((v, i) => Math.abs((i % 40) - v) < 2)
			.reduce((acc, _, i, arr) => {
				if (i % 40) return acc;
				const line = arr.slice(i, i + 40).map((v) => (v ? '#' : ' ')).join('');
				return acc + '\n' + line;
			}, '');
	}
};
