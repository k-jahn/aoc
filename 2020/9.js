// =============================  Advent of Code  =============================
// Solution Day 9 of 2020
// See https://adventofcode.com/2020/day/9

module.exports = class Decrypter {
	constructor(str) {
		this.numbers = str.split('\n').map((d) => +d);
	}

	solvePart1() {
		return this.numbers.slice(25)
			.find((n, i) => {
				const subArr = this.numbers.slice(i, i + 25);
				return !subArr.some((a, j) => subArr.slice(j + 1).some((b) => a + b === n));
			});
	}

	solvePart2() {
		const target = this.solvePart1();
		for (let i = 0; i < this.numbers.length; i++) {
			for (let j = i, acc = 0; acc <= target; j++) {
				acc += this.numbers[j];
				if (acc === target) {
					const subSet = this.numbers.slice(i, j + 1);
					return Math.min(...subSet) + Math.max(...subSet);
				}
			}
		}
		return this;
	}
};
