// =============================  Advent of Code  =============================
// Solution Day 3 of 2021
// See https://adventofcode.com/2021/day/3

const { testCase } = require('./3.testcase');
const { input } = require('./3.input');

class Diagnostic {
	constructor(str) {
		this.diag = str.split('\n')
			.map((l) => l.split('').map((d) => d === '1'));
		this.gamma = this.getGamma();
		this.epsilon = this.getEpsilon();
		this.o2 = this.getO2();
		this.co2 = this.getCO2();
	}

	getGamma() {
		return this.diag[0]
			.map((_, i) => this.diag.reduce((a, e) => (e[i] ? a + 1 : a), 0))
			.map((sum) => sum > this.diag.length / 2);
	}

	getEpsilon() {
		return this.gamma.map((e) => !e);
	}

	getO2() {
		let candidates = [...this.diag];
		const l = candidates[0].length;
		for (let i = 0; i < l && candidates.length > 1; i++) {
			const poll = candidates.reduce((a, c) => (c[i] ? a + 1 : a), 0);
			const nextBit = 2 * poll >= candidates.length;
			candidates = candidates.filter((c) => c[i] === nextBit);
		}
		return candidates[0];
	}

	getCO2() {
		let candidates = [...this.diag];
		const l = candidates[0].length;
		for (let i = 0; i < l && candidates.length > 1; i++) {
			const poll = candidates.reduce((a, c) => (c[i] ? a + 1 : a), 0);
			const nextBit = 2 * poll < candidates.length;
			candidates = candidates.filter((c) => c[i] === nextBit);
		}
		return candidates[0];
	}

	toNumber(arr) {
		return parseInt(arr.map((e) => (e ? '1' : '0')).join(''), 2);
	}

	solvePart1() {
		return this.toNumber(this.gamma) * this.toNumber(this.epsilon);
	}

	solvePart2() {
		return this.toNumber(this.co2) * this.toNumber(this.o2);
	}
}

const testDiagnostic = new Diagnostic(testCase);
console.log(testDiagnostic.solvePart1());
console.log(testDiagnostic.solvePart2());

const inputDiagnostic = new Diagnostic(input);
console.log(inputDiagnostic.solvePart1());
console.log(inputDiagnostic.solvePart2());
