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

	// brute force
	solvePart2() {
		let count = 0;
		for (let i = 1; i < this.race.time; i++) {
			if (i * (this.race.time - i) > this.race.distance) count++;
		}
		return count;
	}

	// analytical
	solvePart2Analytical() {
		return this.solveAnalytical(this.race.time, this.race.distance);
	}

	// analytical
	solveAnalytical(t, d) {
		const upper = t / 2 + (t ** 2 / 4 - d) ** 0.5;
		const lower = t / 2 - (t ** 2 / 4 - d) ** 0.5;
		// handle edges - this is why analytical is hard
		const u = Math.floor(upper) === upper ? upper - 1 : Math.floor(upper);
		const l = Math.floor(lower) === lower ? lower + 1 : Math.ceil(lower);
		return u - l + 1;
	}
};
