// =============================  Advent of Code  =============================
// Solution Day 3 of 2015
// See https://adventofcode.com/2015/day/3

module.exports = class PerfectlySphericalHousesInAVacuum {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.directions = str.split('');
	}

	solvePart1() {
		let current = [0, 0];
		const locs = [current];
		this.directions.forEach((d) => {
			if (d === '^') current = [current[0], current[1] + 1];
			if (d === 'v') current = [current[0], current[1] - 1];
			if (d === '<') current = [current[0] - 1, current[1]];
			if (d === '>') current = [current[0] + 1, current[1]];
			if (locs.every((loc) => loc[0] !== current[0] || loc[1] !== current[1])) {
				locs.push(current);
			}
		});
		return locs.length;
	}

	solvePart2() {
		const current = [
			[0, 0],
			[0, 0],
		];
		const locs = [[0, 0]];
		this.directions.forEach((d, i) => {
			const w = i % 2;
			if (d === '^') current[w] = [current[w][0], current[w][1] + 1];
			if (d === 'v') current[w] = [current[w][0], current[w][1] - 1];
			if (d === '<') current[w] = [current[w][0] - 1, current[w][1]];
			if (d === '>') current[w] = [current[w][0] + 1, current[w][1]];
			if (locs.every((loc) => loc[0] !== current[w][0] || loc[1] !== current[w][1])) {
				locs.push(current[w]);
			}
		});
		return locs.length;
	}
};
