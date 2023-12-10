// =============================  Advent of Code  =============================
// Solution Day 1 of 2016
// See https://adventofcode.com/2016/day/1

module.exports = class NoTimeForATaxicab {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.inst = str.split(', ').map((i) => ({ inst: i.slice(0, 1), d: +i.slice(1) }));
	}

	solvePart1() {
		const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
		const { loc: location } = this.inst.reduce((acc, { inst, d }) => {
			const heading = inst === 'R' ? acc.heading + 1 : acc.heading - 1;
			const dir = dirs[(heading + 100000) % 4];
			const loc = acc.loc.map((c, i) => c + dir[i] * d);
			return { loc, heading };
		}, { loc: [0, 0], heading: 0 });
		return location.map(Math.abs).reduce((a, b) => a + b);
	}

	solvePart2() {
		const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
		const { visited } = this.inst.reduce((acc, { inst, d }) => {
			const heading = inst === 'R' ? acc.heading + 1 : acc.heading - 1;
			const dir = dirs[(heading + 100000) % 4];
			let loc = [...acc.loc];
			const traveled = [];
			for (let q = 0; q < d; q++) {
				loc = loc.map((c, i) => c + dir[i]);
				traveled.push(loc);
			}
			return { loc, heading, visited: [...acc.visited, ...traveled] };
		}, { loc: [0, 0], heading: 0, visited: [[0, 0]] });
		console.log(visited);
		const first = visited
			.find((e, i, arr) => arr.slice(i + 1).some((f) => f[0] === e[0] && f[1] === e[1]));
		return first.map(Math.abs).reduce((a, b) => a + b);
	}
};
