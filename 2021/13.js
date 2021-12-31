// =============================  Advent of Code  =============================
// Solution Day 13 of 2021
// See https://adventofcode.com/2021/day/13

// const { testCase } = require('./13.testcase');
const { input } = require('./13.input');

class Origami {
	constructor(str) {
		this.paper = str.split('\n')
			.filter((l) => /^\d+,\d+$/.test(l))
			.map((l) => l.split(',').map((d) => +d))
			.map(([x, y]) => ({ x, y }));
		this.instructions = str.split('\n')
			.map((l) => l.match(/fold along ([xy])=(\d+)/))
			.filter(Boolean)
			.map(([_, dim, c]) => ({ dim, c })); // eslint-disable-line no-unused-vars
	}

	fold() {
		const { dim, c } = this.instructions.shift();

		this.paper = this.paper
			.map((p) => {
				if (p[dim] < c) return p;
				const pFolded = { ...p };
				pFolded[dim] = 2 * c - pFolded[dim];
				return pFolded;
			})
			.filter((e, i, arr) => !arr.some((f, j) => e.x === f.x && e.y === f.y && j > i));
	}

	solvePart1() {
		this.fold();
		return this.paper.length;
	}

	solvePart2() {
		while (this.instructions.length) this.fold();
		return this.toString();
	}

	toString() {
		const [xMax, yMax] = [this.paper.map((p) => p.x), this.paper.map((p) => p.y)]
			.map((d) => Math.max(...d));
		return this.paper
			.reduce((canvas, p) => {
				const nextCanvas = [...canvas];
				nextCanvas[p.y] = nextCanvas[p.y].map((e, i) => (i === p.x ? '#' : e));
				return nextCanvas;
			}, new Array(yMax + 1).fill(new Array(xMax + 1).fill(' ')))
			.map((l) => l.join(''))
			.join('\n');
	}
}

// const testOrigami = new Origami(testCase);
// console.log(testOrigami.solvePart1());
// console.log(testOrigami.solvePart2());

const inputOrigami = new Origami(input);
// console.log(inputOrigami.solvePart1());
console.log(inputOrigami.solvePart2());
