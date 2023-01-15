// =============================  Advent of Code  =============================
// Solution Day 5 of 2022
// See https://adventofcode.com/2022/day/5

module.exports = class SupplyStacks {
	constructor(str) {
		this.str = str;
		const [positionStr, instructionsStr] = this.str.split('\n\n');
		this.instructions = instructionsStr.split('\n')
			.map((l) => {
				const [_, x, from, to] = l.match(/move (\d+) from (\d+) to (\d+)/);
				return [x, from, to];
			});
		const p = positionStr.split('\n')
			.map((l) => l.split('').filter((_, i) => (i - 1) % 4 === 0));
		this.positions = p.pop().map(() => []);
		p.forEach((l) => l.forEach((e, i) => {
			if (e !== ' ') {
				this.positions[i].unshift(e);
			}
		}));
		this.positions2 = JSON.parse(JSON.stringify(this.positions));
	}

	move(x, a, b) {
		for (let i = 0; i < x; i++) this.positions[b - 1].push(this.positions[a - 1].pop());
	}

	move2(x, a, b) {
		const c = [];
		for (let i = 0; i < x; i++) c.unshift(this.positions2[a - 1].pop());
		this.positions2[b - 1].push(...c);
	}

	solvePart1() {
		this.instructions.forEach((e) => this.move(...e));
		return this.positions.reduce((a, e) => a + e[e.length - 1], '');
	}

	solvePart2() {
		this.instructions.forEach((e) => this.move2(...e));
		return this.positions2.reduce((a, e) => a + e[e.length - 1], '');
	}
};
