// =============================  Advent of Code  =============================
// Solution Day 6 of 2023
// See https://adventofcode.com/2023/day/6

module.exports = class WaitForIt {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		const [timeLine, distLine] = str.split('\n');
		const [...timesStrs] = timeLine.match(/\d+/g);
		const [...distStrs] = distLine.match(/\d+/g);
		this.races = timesStrs.map((t, i) => ({
			time: +t,
			distance: +distStrs[i],
		}));
		this.race = {
			time: +timesStrs.join(''),
			distance: +distStrs.join(''),
		};
	}

	solvePart1() {
		return this.races
			.map(((race) => {
				let count = 0;
				for (let i = 1; i < race.time; i++) {
					if (i * (race.time - i) > race.distance) count++;
				}
				return count;
			}))
			.reduce((a, b) => a * b);
	}

	solvePart2() {
		let count = 0;
		for (let i = 1; i < this.race.time; i++) {
			if (i * (this.race.time - i) > this.race.distance) count++;
		}
		return count;
	}
};
