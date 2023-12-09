// =============================  Advent of Code  =============================
// Solution Day 14 of 2015
// See https://adventofcode.com/2015/day/14

module.exports = class ReindeerOlympics {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.reindeers = str.split('\n')
			.map((line) => {
				const [_, name, speed, travel, rest] = line.match(/(.*?) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+)/);
				return {
					name,
					speed: +speed,
					travel: +travel,
					rest: +rest,
				};
			});
	}

	distAfter(deer, time) {
		const full = Math.floor(time / (deer.travel + deer.rest));
		const rest = time % (deer.travel + deer.rest);
		return full * deer.travel * deer.speed + Math.min(rest, deer.travel) * deer.speed;
	}

	solvePart1() {
		return Math.max(...this.reindeers.map((deer) => this.distAfter(deer, 2503)));
	}

	solvePart2() {
		const scores = new Array(2503).fill(0).reduce((acc, _, i) => {
			const standing = this.reindeers.map((deer) => this.distAfter(deer, i + 1));
			const bestDist = Math.max(...standing);
			return acc.map((v, j) => (standing[j] === bestDist ? v + 1 : v));
		}, new Array(this.reindeers.length).fill(0));
		return Math.max(...scores);
	}
};
