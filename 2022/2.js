// =============================  Advent of Code  =============================
// Solution Day 2 of 2022
// See https://adventofcode.com/2022/day/2

module.exports = class RockPaperScissors {
	constructor(str) {
		this.str = str;
		this.guide = str.split('\n')
			.map((x) => x.split(' '));
		this.dict = {
			A: 1,
			B: 2,
			C: 3,
			X: 1,
			Y: 2,
			Z: 3,
		};
	}

	score1(opponent, me) {
		const [o, m] = [opponent, me].map((x) => this.dict[x]);
		return m + ((m - o + 4) % 3) * 3;
	}

	score2(opponent, me) {
		const [o, m] = [opponent, me].map((x) => this.dict[x]);
		return (m - 1) * 3 + ((m + 3 + o) % 3) + 1;
	}

	solvePart1() {
		return this.guide
			.reduce((acc, e) => acc + this.score1(...e), 0);
	}

	solvePart2() {
		console.log(this.guide.map((e) => this.score2(...e)));
		return this.guide
			.reduce((acc, e) => acc + this.score2(...e), 0);
	}
};
