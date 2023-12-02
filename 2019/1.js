// =============================  Advent of Code  =============================
// Solution Day 1 of 2019
// See https://adventofcode.com/2019/day/1

module.exports = class TheTyrannyOfTheRocketEquation {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.modules = str.split('\n').map((s) => +s);
	}

	solvePart1() {
		return this.modules.reduce((acc, m) => acc + Math.floor(m / 3) - 2, 0);
	}

	solvePart2() {
		const getFuelMass = (n) => {
			const nextMass = Math.floor(n / 3) - 2;
			if (nextMass <= 0) return 0;
			return nextMass + getFuelMass(nextMass);
		};
		return this.modules.reduce((acc, m) => acc + getFuelMass(m), 0);
	}
};
