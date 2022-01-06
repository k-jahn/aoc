// =============================  Advent of Code  =============================
// Solution Day 17 of 2021
// See https://adventofcode.com/2021/day/17

const { readFileSync } = require('fs');

const testCase = readFileSync('./17.testcase').toString().trim();
const input = readFileSync('./17.input').toString().trim();

class ProbeLauncher {
	constructor(str) {
		const [_, x1, x2, y1, y2] = Array.prototype.slice
			.apply(
				str.match(/target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/),
			)
			.map((d) => +d);
		this.range = {
			x: [x1, x2].sort((a, b) => a - b),
			y: [y1, y2].sort((a, b) => a - b),
		};

		// get first legal y
		this.getNextY(1 - this.range.y[0]);
	}

	getNextY(prevY = this.currentY) {
		let candidateY = prevY;
		const candidateS = [];
		while (candidateS.length === 0) {
			if (--candidateY < this.range.y[0]) {
				this.currentY = null;
				this.currentS = null;
				return this;
			}
			for (let s = 0, h = 0, vy = candidateY; h >= this.range.y[0]; s++) {
				if (h <= this.range.y[1]) candidateS.push(s);
				h += vy--;
			}
		}
		this.currentY = candidateY;
		this.currentS = candidateS;
		return this;
	}

	// assumes positive target zone, lazy ^^
	getX() {
		const x = [];
		for (let cx = 0; cx <= this.range.x[1]; cx++) {
			const hitsRange = this.currentS.some((s) => {
				const delta = Math.max(0, cx - s);
				const dist = (cx * (cx + 1)) / 2 - (delta * (delta + 1)) / 2;
				return (dist >= this.range.x[0]) && (dist <= this.range.x[1]);
			});
			if (hitsRange) x.push(cx);
		}
		this.currentX = x;
		return this;
	}

	existsX() {
		this.getX();
		return Boolean(this.currentX.length);
	}

	solvePart1() {
		while (!this.existsX()) this.getNextY();
		return this.currentY > 0 ? (this.currentY * (this.currentY + 1)) / 2 : 0;
	}

	solvePart2() {
		let sum = 0;
		while (this.currentY !== null) {
			sum += this.getX().currentX.length;
			this.getNextY();
		}
		return sum;
	}
}

const testProbeLauncher = new ProbeLauncher(testCase);
console.log(testProbeLauncher.solvePart1());
console.log(testProbeLauncher.solvePart2());

const inputProbeLauncher = new ProbeLauncher(input);
console.log(inputProbeLauncher.solvePart1());
console.log(inputProbeLauncher.solvePart2());
