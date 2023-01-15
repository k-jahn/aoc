// =============================  Advent of Code  =============================
// Solution Day 8 of 2022
// See https://adventofcode.com/2022/day/8

module.exports = class TreetopTreeHouse {
	constructor(str) {
		this.str = str;
		this.trees = this.str.split('\n')
			.map((l) => l.split('').map((t) => +t));
	}

	isVisible(i, j) {
		const v = (arr) => arr.every((t) => t < this.trees[i][j]);
		const row = this.trees[i];
		const col = this.trees.map((r) => r[j]);
		const [left, right] = [row.slice(0, j), row.slice(j + 1)];
		const [up, down] = [col.slice(0, i), col.slice(i + 1)];
		return v(left) || v(right) || v(up) || v(down);
	}

	vScore(i, j) {
		const row = this.trees[i];
		const col = this.trees.map((r) => r[j]);
		const [left, right] = [row.slice(0, j), row.slice(j + 1)];
		const [up, down] = [col.slice(0, i), col.slice(i + 1)];
		left.reverse();
		up.reverse();
		return [left, right, up, down]
			.map((arr) => {
				for (let k = 0; k < arr.length; k++) {
					if (arr[k] >= this.trees[i][j]) return k + 1;
				}
				return arr.length;
			})
			.reduce((a, b) => a * b);
	}

	solvePart1() {
		return this.trees.map((r, i) => r.reduce((a, _, j) => (this.isVisible(i, j) ? a + 1 : a), 0))
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		return this.trees
			.map((r, i) => r.reduce((a, _, j) => {
				const score = this.vScore(i, j);
				return score > a ? score : a;
			}, 0))
			.reduce((a, b) => (b > a ? b : a));
	}
};
