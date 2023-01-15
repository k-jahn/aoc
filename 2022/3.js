// =============================  Advent of Code  =============================
// Solution Day 3 of 2022
// See https://adventofcode.com/2022/day/3

module.exports = class RucksackReorganization {
	constructor(str) {
		this.str = str;
		this.elves = str.split('\n');
	}

	prio(e) {
		return ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(e);
	}

	solvePart1() {
		return this.elves
			.map((e) => [e.slice(0, e.length / 2), e.slice(e.length / 2)])
			.map((e) => {
				for (let i = 0; i < e[0].length; i++) {
					const c = e[0].slice(i, i + 1);
					if (e[1].includes(c)) return c;
				}
				return null;
			})
			.map(this.prio)
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		return this.elves
			.reduce((a, _, i, r) => {
				if (i % 3 === 0) {
					return a.concat([r.slice(i, i + 3)]);
				}
				return a;
			}, [])
			.map((group) => {
				for (let i = 0; i < group[0].length; i++) {
					const c = group[0].slice(i, i + 1);
					if (group.slice(1).every((elf) => elf.includes(c))) {
						return c;
					}
				}
				return null;
			})
			.map(this.prio)
			.reduce((a, b) => a + b);
	}
};
