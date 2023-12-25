// =============================  Advent of Code  =============================
// Solution Day 18 of 2023
// See https://adventofcode.com/2023/day/18
class Map {
	constructor() {
		this.map = [[false]];
		this.offset = [0, 0];
	}

	activate(i, j) {
		while (i < this.offset[0]) this.extendINeg();
		while (i >= this.offset[0] + this.map.length) this.extendIPos();
		while (j < this.offset[1]) this.extendJNeg();
		while (j >= this.offset[1] + this.map[0].length) this.extendJPos();
		this.map[i - this.offset[0]][j - this.offset[1]] = true;
	}

	extendINeg() {
		const emptyRow = this.map[0].map(() => false);
		this.map = [emptyRow, ...this.map];
		this.offset = [this.offset[0] - 1, this.offset[1]];
	}

	extendIPos() {
		const emptyRow = this.map[0].map(() => false);
		this.map = [...this.map, emptyRow];
	}

	extendJNeg() {
		this.map = this.map.map((l) => [false, ...l]);
		this.offset = [this.offset[0], this.offset[1] - 1];
	}

	extendJPos() {
		this.map = this.map.map((l) => [...l, false]);
	}

	show() {
		const str = this.map.map((l) => l.map((f) => (f ? '#' : '.')).join('')).join('\n');
		console.log(str);
	}

	countEnclosed() {
		let sum = this.map.reduce((a, l) => a + l.reduce((a2, d) => (d ? a2 + 1 : a2), 0), 0);
		const isRelevant = (i, j) => i in this.map && j in this.map[i] && !this.map[i][j];
		const fill = (i, j) => {
			if (!isRelevant(i, j)) return [];
			const visited = [];
			let current = [[i, j]];
			while (current.length) {
				const potentialNext = [];
				current.forEach(([ci, cj]) => {
					this.map[ci][cj] = true;
					[[1, 0], [-1, 0], [0, -1], [0, 1]].forEach(([di, dj]) => {
						if (!potentialNext.some(([pi, pj]) => pi === ci + di && pj === cj + dj)) {
							potentialNext.push([di + ci, dj + cj]);
						}
					});
				});
				visited.push(...current);
				current = potentialNext.filter((c) => isRelevant(...c));
			}
			return visited;
		};

		for (let i = 0; i < this.map.length; i++) {
			for (let j = 0; j < this.map[0].length; j++) {
				if (!this.map[i][j]) {
					const filled = fill(i, j);
					const bordersEdge = filled.some(([fi, fj]) => {
						if (fi === 0) return true;
						if (fi === this.map.length - 1) return true;
						if (fj === 0) return true;
						if (fj === this.map[0].length - 1) return true;
						return false;
					});
					sum += bordersEdge ? 0 : filled.length;
				}
			}
		}
		return sum;
	}
}
module.exports = class LavaductLagoon {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		const dirs = {
			R: [0, 1],
			L: [0, -1],
			U: [-1, 0],
			D: [1, 0],
		};
		this.str = str;
		this.inst = this.str.split('\n')
			.map((l) => {
				const [_, d, n, color] = l.match(/^([A-Z]) (\d+) \(#(.+)\)/);
				return {
					direction: dirs[d],
					n: +n,
					color,
				};
			});
	}

	solvePart1() {
		const map = new Map();
		let curr = [0, 0];
		this.inst.forEach(({ direction, n }) => {
			for (let i = 0; i < n; i++) {
				curr = [curr[0] + direction[0], curr[1] + direction[1]];
				map.activate(...curr);
			}
		});
		// map.show();
		return map.countEnclosed();
	}

	solvePart2() {
		return this;
	}
};
