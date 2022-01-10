// =============================  Advent of Code  =============================
// Solution Day 11 of 2020
// See https://adventofcode.com/2020/day/11

module.exports = class Seating {
	constructor(str) {
		this.seats = str.split('\n')
			.map((l) => l.split('').map((s) => ({ seat: /[L#]/.test(s), occupied: s === '#' })));
		this.steps = 0;
		this.static = false;
	}

	step({ gn = this.getNeighbors, threshhold = 4 } = {}) {
		let stat = true;
		this.seats = this.seats.map((l, i) => l.map((s, j) => {
			let occupied;
			if (s.seat) {
				const neighbors = gn.call(this, i, j);
				if (s.occupied) {
					if (neighbors.filter((n) => n.seat && n.occupied).length >= threshhold) {
						stat = false;
						occupied = false;
					} else {
						occupied = true;
					}
				} else {
					if (neighbors.every((n) => !(n.seat && n.occupied))) {
						stat = false;
						occupied = true;
					} else {
						occupied = false;
					}
				}
			}
			return { ...s, occupied };
		}));
		this.static = stat;
		this.steps++;
	}

	getNeighbors(i, j) {
		const out = [];
		for (let k = i - 1; k <= i + 1; k++) {
			for (let l = j - 1; l <= j + 1; l++) {
				if ((k !== i || l !== j) && k in this.seats && l in this.seats[k]) {
					out.push(this.seats[k][l]);
				}
			}
		}
		return out;
	}

	getNeighbors2(i, j) {
		const out = [];
		for (let k = -1; k <= 1; k++) {
			for (let l = -1; l <= 1; l++) {
				if (k !== 0 || l !== 0) {
					for (let d = 1; i + k * d in this.seats && j + l * d in this.seats[i + k * d]; d++) {
						const s = this.seats[i + k * d][j + l * d];
						if (s.seat) {
							out.push(s);
							break;
						}
					}
				}
			}
		}
		return out;
	}

	solvePart1() {
		while (!this.static) this.step();
		return this.seats.map((l) => l.reduce((a, e) => (e.seat && e.occupied ? a + 1 : a), 0))
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		while (!this.static) this.step({ gn: this.getNeighbors2, threshhold: 5 });
		return this.seats.map((l) => l.reduce((a, e) => (e.seat && e.occupied ? a + 1 : a), 0))
			.reduce((a, b) => a + b);
	}
};
