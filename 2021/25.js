// =============================  Advent of Code  =============================
// Solution Day 25 of 2021
// See https://adventofcode.com/2021/day/25

module.exports = class Seafloor {
	constructor(str) {
		this.m = str.split('\n').map((l) => l.split(''));
		this.steps = 0;
		this.locked = false;
	}

	step() {
		this.getCandidates();
		if (!this.candidates.v.length && !this.candidates['>'].length) {
			this.locked = true;
			return;
		}
		this.moveSnails('>');
		this.getCandidates();
		this.moveSnails('v');
		this.steps++;
	}

	getCandidates() {
		this.candidates = {
			v: [],
			'>': [],
		};
		for (let i = 0; i < this.m.length; i++) {
			for (let j = 0; j < this.m[i].length; j++) {
				if (this.canSnailMove(i, j)) {
					this.candidates[this.m[i][j]].push([i, j]);
				}
			}
		}
	}

	canSnailMove(x, y) {
		const snail = this.m[x][y];
		if (snail === 'v') {
			return this.checkFree(x + 1, y);
		} if (snail === '>') {
			return this.checkFree(x, y + 1);
		}
		return false;
	}

	moveSnails(direction) {
		this.candidates[direction].forEach(([x, y]) => {
			this.write(x, y, '.');
			const [tx, ty] = this.wrap(direction === 'v' ? x + 1 : x, direction === '>' ? y + 1 : y);
			this.write(tx, ty, direction);
		});
	}

	checkFree(x, y) {
		const [wx, wy] = this.wrap(x, y);
		return this.m[wx][wy] === '.';
	}

	wrap(x, y) {
		const lx = this.m.length;
		const wx = (x + lx) % lx;
		const ly = this.m[wx].length;
		const wy = (y + ly) % ly;
		return [wx, wy];
	}

	write(x, y, s) {
		this.m[x][y] = s;
	}

	toString() {
		return '\n' + this.m.map((l) => l.join('')).join('\n') + '\n';
	}

	solvePart1() {
		while (!this.locked) this.step();

		return this.steps + 1;
	}
};
