// =============================  Advent of Code  =============================
// Solution Day 18 of 2021
// See https://adventofcode.com/2021/day/18

const { readFileSync } = require('fs');

const testCase = readFileSync('./18.testcase').toString().trim();
const input = readFileSync('./18.input').toString().trim();

class SnailfishNr {
	constructor(str) {
		this.str = str;
		this.reduce();
	}

	add(snailfishNr) {
		return new SnailfishNr(`[${this.str},${snailfishNr.str}]`);
	}

	reduce() {
		while (this.explode().exploded || this.split().splitted);
		return this;
	}

	explode() {
		let d = 0;
		let index = null;
		for (let i = 0; i < this.str.length; i++) {
			const l = this.str[i];
			if (l === '[') d++;
			if (l === ']') d--;
			if (d > 4) {
				index = i;
				break;
			}
		}
		if (index === null) {
			this.exploded = false;
			return this;
		}
		const strL = this.str.slice(0, index);
		const [_, nL, nR, strR] = this.str.slice(index).match(/^\[(\d+),(\d+)\](.+)$/);
		const rStrL = strL.replace(/\d+(?=[^0-9]+$)/, (n) => (+n) + (+nL));
		const rStrR = strR.replace(/(?<=^[^0-9]+)\d+/, (n) => (+n) + (+nR));
		this.str = rStrL + '0' + rStrR;
		this.exploded = true;
		return this;
	}

	split() {
		this.splitted = /\d{2,}/.test(this.str);
		this.str = this.str.replace(/\d{2,}/, (n) => `[${Math.floor(n / 2)},${Math.floor(n / 2) + (n % 2)}]`);
		return this;
	}

	magnitude() {
		let reduceable = this.str;
		while (/\[\d+,\d+\]/.test(reduceable)) reduceable = reduceable.replace(/\[(\d+),(\d+)\]/, (_, a, b) => 3 * (+a) + 2 * (+b));
		return +reduceable;
	}
}

class SnailfishSolver {
	constructor(str) {
		this.nrs = str.split('\n')
			.map((arr) => new SnailfishNr(arr));
	}

	solvePart1() {
		return this.nrs.reduce((a, b) => a.add(b)).magnitude();
	}

	solvePart2() {
		const additionResults = this.nrs
			.map((a, i) => this.nrs.map((b, j) => (i !== j ? a.add(b).magnitude() : 0)));
		return Math.max(
			...additionResults.reduce((a, b) => a.concat(b)),
		);
	}
}

const testSnailfishSolver = new SnailfishSolver(testCase);
console.log(testSnailfishSolver.solvePart1());
console.log(testSnailfishSolver.solvePart2());

const inputSnailfishSolver = new SnailfishSolver(input);
console.log(inputSnailfishSolver.solvePart1());
console.log(inputSnailfishSolver.solvePart2());
