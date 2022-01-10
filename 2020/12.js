// =============================  Advent of Code  =============================
// Solution Day 12 of 2020
// See https://adventofcode.com/2020/day/12

module.exports = class Navigation {
	constructor(str) {
		this.instructions = str.split('\n')
			.map((l) => {
				const [_, cmd, d] = l.match(/^([NSEWLRF])(\d+)$/);
				return { cmd, val: +d };
			});
		this.location = [0, 0];
		this.heading = 0;
		this.compass = [[0, 1], [-1, 0], [0, -1], [1, 0]];
		this.rot = [
			[[1, 0], [0, 1]],
			[[0, -1], [1, 0]],
			[[-1, 0], [0, -1]],
			[[0, 1], [-1, 0]],
		];
	}

	scalarMult(scal, v) {
		return v.map((e) => scal * e);
	}

	matrixMult(matrix, v) {
		return v.map((_, i) => matrix[i].reduce((a, e, j) => a + e * v[j], 0));
	}

	step(instructions) {
		const { cmd, val } = instructions.shift();
		switch (cmd) {
			case 'N':
				this.location[0] += val;
				break;
			case 'S':
				this.location[0] -= val;
				break;
			case 'W':
				this.location[1] -= val;
				break;
			case 'E':
				this.location[1] += val;
				break;
			case 'L':
				this.heading = (this.heading - (val / 90) + 16) % 4;
				break;
			case 'R':
				this.heading = (this.heading + (val / 90) + 16) % 4;
				break;
			case 'F':
				this.location = this.compass[this.heading].map((d, i) => val * d + this.location[i]);
				break;
			default:
				throw new Error();
		}
	}

	step2(instructions) {
		const { cmd, val } = instructions.shift();
		switch (cmd) {
			case 'N':
				this.wp[0] += val;
				break;
			case 'S':
				this.wp[0] -= val;
				break;
			case 'W':
				this.wp[1] -= val;
				break;
			case 'E':
				this.wp[1] += val;
				break;
			case 'L':
				this.wp = this.matrixMult(this.rot[(16 - (val / 90)) % 4], this.wp);
				break;
			case 'R':
				this.wp = this.matrixMult(this.rot[(16 + (val / 90)) % 4], this.wp);
				break;
			case 'F':
				this.location = this.wp.map((d, i) => val * d + this.location[i]);
				break;
			default:
				throw new Error();
		}
	}

	solvePart1() {
		this.location = [0, 0];
		this.heading = 0;
		const instructions = this.instructions.slice();
		while (instructions.length) this.step(instructions);
		return this.location.reduce((a, b) => a + Math.abs(b), 0);
	}

	solvePart2() {
		this.location = [0, 0];
		this.wp = [1, 10];
		const instructions = this.instructions.slice();
		while (instructions.length) this.step2(instructions);
		return this.location.reduce((a, b) => a + Math.abs(b), 0);
	}
};
