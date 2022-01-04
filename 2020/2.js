// =============================  Advent of Code  =============================
// Solution Day 2 of 2020
// See https://adventofcode.com/2020/day/2

const { readFileSync } = require('fs');

const testCase = readFileSync('./2.testcase').toString().trim();
const input = readFileSync('./2.input').toString().trim();

class Password {
	constructor(str) {
		this.passwords = str.split('\n')
			.map((line) => {
				const [_, min, max, l, psw] = line.match(/(\d+)-(\d+) (.): (.+)/);
				const valid = new RegExp(`^([^${l}]*${l}){${min},${max}}[^${l}]*$`).test(psw);
				const [a, b] = [min, max].map((d) => psw[+d - 1]);
				const newValid = a !== b && (a === l || b === l);
				return {
					min,
					max,
					l,
					psw,
					valid,
					newValid,
				};
			});
	}

	solvePart1() {
		return this.passwords.reduce((a, e) => (e.valid ? a + 1 : a), 0);
	}

	solvePart2() {
		return this.passwords.reduce((a, e) => (e.newValid ? a + 1 : a), 0);
	}
}

const testPassword = new Password(testCase);
console.log(testPassword.solvePart1());
console.log(testPassword.solvePart2());

const inputPassword = new Password(input);
console.log(inputPassword.solvePart1());
console.log(inputPassword.solvePart2());
