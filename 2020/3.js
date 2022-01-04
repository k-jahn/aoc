// =============================  Advent of Code  =============================
// Solution Day 3 of 2020
// See https://adventofcode.com/2020/day/3

const { readFileSync } = require('fs');

const testCase = readFileSync('./3.testcase').toString().trim();
const input = readFileSync('./3.input').toString().trim();

class Slope {
	constructor(str) {
		this.slope = str.split('\n')
			.map((l) => l.split('').map((d) => d === '#'));
	}

	solvePart1() {
		return this.slope.reduce((a, l, i) => (l[(i * 3) % l.length] ? a + 1 : a), 0);
	}

	solvePart2() {
		return [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
			.map(([r, d]) => this.slope.reduce((a, l, i) => {
				if (i % d) return a;
				return (l[((i / d) * r) % l.length] ? a + 1 : a);
			}, 0))
			.reduce((a, b) => a * b);
	}
}

const testSlope = new Slope(testCase);
console.log(testSlope.solvePart1());
console.log(testSlope.solvePart2());

const inputSlope = new Slope(input);
console.log(inputSlope.solvePart1());
console.log(inputSlope.solvePart2());
