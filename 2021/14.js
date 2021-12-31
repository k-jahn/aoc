// =============================  Advent of Code  =============================
// Solution Day 14 of 2021
// See https://adventofcode.com/2021/day/14

const { testCase } = require('./14.testcase');
const { input } = require('./14.input');

class PolymerisationModule {
	constructor(str) {
		[this.polymer] = str.split('\n\n');
		this.rules = str.split('\n\n')[1]
			.split('\n')
			.map((l) => l.split(' -> '))
			.reduce((a, [pair, ins]) => {
				const n = { ...a };
				n[pair] = ins;
				return n;
			}, {});
		this.steps = 0;

		// optimized for part 2
		this.polymer2 = str.split('\n\n')[0]
			.split('')
			.map((e, i, a) => a.slice(i, i + 2).join(''))
			.slice(0, -1)
			.reduce((a, e) => {
				const n = { ...a };
				n[e] = n[e] ? n[e] + 1 : 1;
				return n;
			}, {});
		this.rules2 = Object.keys(this.rules)
			.reduce((a, key) => {
				const n = { ...a };
				const [p, q] = key;
				n[key] = [p + this.rules[key], this.rules[key] + q];
				return n;
			}, {});
		this.bounding = [this.polymer[0], this.polymer[this.polymer.length - 1]];
		this.steps2 = 0;
	}

	step() {
		let nextPolymer = '';
		for (let i = 0; i < this.polymer.length; i++) {
			nextPolymer += this.polymer[i] + (this.rules[this.polymer.slice(i, i + 2)] || '');
		}
		this.polymer = nextPolymer;
		this.steps++;
	}

	step2() {
		this.polymer2 = Object.keys(this.polymer2)
			.reduce((acc, key) => {
				const n = { ...acc };
				const val = this.polymer2[key];
				this.rules2[key].forEach((m) => {
					n[m] = n[m] ? n[m] + val : val;
				});
				return n;
			}, {});
		this.steps2++;
	}

	freqRange() {
		const freqs = this.polymer
			.split('')
			.reduce((a, e) => {
				const n = { ...a };
				n[e] = n[e] ? n[e] + 1 : 1;
				return n;
			}, {});
		return Math.max(...Object.values(freqs)) - Math.min(...Object.values(freqs));
	}

	freqRange2() {
		const pairFreqs = Object.keys(this.polymer2)
			.reduce((a, key) => {
				const n = { ...a };
				const [p, q] = key;
				const val = this.polymer2[key];
				[p, q].forEach((l) => { n[l] = n[l] ? n[l] + val : val; });
				return n;
			}, {});
		this.bounding.forEach((l) => { pairFreqs[l]++; });
		return (Math.max(...Object.values(pairFreqs)) - Math.min(...Object.values(pairFreqs))) / 2;
	}

	solvePart1() {
		while (this.steps < 10) this.step();
		return this.freqRange();
	}

	solvePart2() {
		while (this.steps2 < 40) this.step2();
		return this.freqRange2();
	}
}

const testPolymerisationModule = new PolymerisationModule(testCase);
// console.log(testPolymerisationModule.solvePart1());
console.log(testPolymerisationModule.solvePart2());

const inputPolymerisationModule = new PolymerisationModule(input);
// console.log(inputPolymerisationModule.solvePart1());
console.log(inputPolymerisationModule.solvePart2());
