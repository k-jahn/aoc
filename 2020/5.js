// =============================  Advent of Code  =============================
// Solution Day 5 of 2020
// See https://adventofcode.com/2020/day/5

module.exports = class BinBoarding {
	constructor(str) {
		this.seats = str.split('\n')
			.map((l) => ({
				row: parseInt(l.slice(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2),
				column: parseInt(l.slice(7).replace(/L/g, '0').replace(/R/g, '1'), 2),
			}));
	}

	getSeatId(seat) {
		return seat.row * 8 + seat.column;
	}

	solvePart1() {
		return Math.max(...this.seats.map(this.getSeatId));
	}

	solvePart2() {
		return this.seats.map(this.getSeatId)
			.find((id, _, arr) => !arr.some((e) => e === id + 1) && arr.some((e) => e === id + 2)) + 1;
	}
};
