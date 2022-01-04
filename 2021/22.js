// =============================  Advent of Code  =============================
// Solution Day 22 of 2021
// See https://adventofcode.com/2021/day/22

const {
	// testCase1,
	// testCase2,
	testCase3,
} = require('./22.testcase');
const { input } = require('./22.input');

class Reactor {
	constructor(str) {
		this.steps = str.split('\n')
			.map((l) => {
				const [_, on, x1, x2, y1, y2, z1, z2] = l.match(/^(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)$/);
				return {
					val: on === 'on',
					range: [
						[x1, x2].map((d) => +d).sort((a, b) => a - b),
						[y1, y2].map((d) => +d).sort((a, b) => a - b),
						[z1, z2].map((d) => +d).sort((a, b) => a - b),
					],
				};
			});

		// part 1
		this.r = [[[false]]];
		this.dim = [
			[0, 0],
			[0, 0],
			[0, 0],
		];

		// part 2
		this.lit = [];
	}

	// Part 1
	stepModel() {
		const { val, range } = this.steps.shift();
		if (range.some((d) => Math.min(...d.map(Math.abs)) > 50)) {
			return;
		}

		[0, 1].map((n) => range.map((d) => d[n]))
			.forEach((p) => this.extendModel(p));
		const rr = range.map((e, i) => e.map((d) => d - this.dim[i][0]));
		this.r = this.r.map((s, x) => s.map((l, y) => l.map((p, z) => {
			if ([x, y, z].every((v, i) => v >= rr[i][0] && v <= rr[i][1])) return val;
			return p;
		})));
	}

	extendModel(p) {
		for (let i = 0; i < 3; i++) {
			while (p[i] < this.dim[i][0]) {
				if (i === 0) {
					this.r = [new Array(this.r[0].length).fill(new Array(this.r[0][0].length).fill(false))]
						.concat(this.r);
				} else if (i === 1) {
					this.r = this.r.map((s) => [new Array(this.r[0][0].length).fill(false)].concat(s));
				} else {
					this.r = this.r.map((s) => s.map((l) => [false].concat(l)));
				}
				this.dim[i] = this.dim[i].map((e, j) => (j === 0 ? e - 1 : e));
			}
			while (p[i] > this.dim[i][1]) {
				if (i === 0) {
					this.r = this.r
						.concat([new Array(this.r[0].length).fill(new Array(this.r[0][0].length).fill(false))]);
				} else if (i === 1) {
					this.r = this.r.map((s) => s.concat([new Array(this.r[0][0].length).fill(false)]));
				} else {
					this.r = this.r.map((s) => s.map((l) => l.concat([false])));
				}
				this.dim[i] = this.dim[i].map((e, j) => (j === 1 ? e + 1 : e));
			}
		}
	}

	solvePart1() {
		while (this.steps.length) this.stepModel();
		return this.r
			.map((s) => s.map((l) => l.reduce((a, d) => (d ? a + 1 : a), 0)).reduce((a, b) => a + b))
			.reduce((a, b) => a + b);
	}

	// Part 2
	add() {
		const { val, range } = this.steps.shift();
		this.intersect(range);
		if (val) this.lit.push({ val, range });
	}

	intersect(r) {
		this.lit = this.lit.map((cuboid) => {
			const intersectionCuboid = [0, 1, 2].map((dim) => [
				Math.max(cuboid.range[dim][0], r[dim][0]),
				Math.min(cuboid.range[dim][1], r[dim][1]),
			]);
			if (intersectionCuboid.some(([a, b]) => b - a <= 0)) return [cuboid];
			if (
				intersectionCuboid.every((d, i) => d[0] === cuboid.range[i][0]
				&& d[1] === cuboid.range[i][1])
			) {
				return [];
			}
			return [
				cuboid,
				{
					val: !cuboid.val,
					range: intersectionCuboid,
				},
			];
		}).reduce((a, b) => a.concat(b), []);
	}

	solvePart2() {
		while (this.steps.length) this.add();
		return this.lit.reduce((a, { val, range }) => {
			const vol = range.reduce((p, [l, h]) => p * (h - l + 1), 1);
			return val ? a + vol : a - vol;
		}, 0);
	}
}

// const testReactor1 = new Reactor(testCase1);
// console.log(testReactor1.solvePart2());

const testReactor3 = new Reactor(testCase3);
console.log(testReactor3.solvePart2());

const inputReactor = new Reactor(input);
// console.log(inputReactor.solvePart1());
console.log(inputReactor.solvePart2());
