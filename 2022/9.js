// =============================  Advent of Code  =============================
// Solution Day 9 of 2022
// See https://adventofcode.com/2022/day/9

module.exports = class RopeBridge {
	constructor(str) {
		this.str = str;
		this.moves = this.str.split('\n')
			.map((x) => {
				const [direction, s] = x.split(' ');
				return {
					direction,
					steps: +s,
				};
			});

		this.rope2 = new Array(10).fill(null).map(() => [0, 0]);
		this.locations2 = [[0, 0]];
	}

	step(move, { rope, locations }) {
		const nextRope = rope.map((e) => e.slice());
		const nextLocations = locations.map((e) => e.slice());
		for (let i = 0; i < move.steps; i++) {
			switch (move.direction) {
				case 'U':
					nextRope[0][0]++;
					break;
				case 'D':
					nextRope[0][0]--;
					break;
				case 'L':
					nextRope[0][1]--;
					break;
				case 'R':
					nextRope[0][1]++;
					break;
				default:
			}
			for (let j = 1; j < nextRope.length; j++) {
				if (nextRope[j - 1].map((x, k) => x - nextRope[j][k]).some((e) => Math.abs(e) > 1)) {
					nextRope[j] = nextRope[j].map((c, l) => {
						const delta = nextRope[j - 1][l] - c;
						return delta === 0 ? c : c + delta / Math.abs(delta);
					});
				}
			}
			const tailLoc = nextRope[nextRope.length - 1];

			if (nextLocations.every((loc) => loc[0] !== tailLoc[0] || loc[1] !== tailLoc[1])) {
				nextLocations.push(tailLoc.slice(0));
			}
		}
		return { rope: nextRope, locations: nextLocations };
	}

	solvePart1() {
		const rope = new Array(2).fill(null).map(() => [0, 0]);
		const locations = [[0, 0]];
		let status = { rope, locations };
		this.moves.forEach((s) => {
			status = this.step(s, status);
		});
		return status.locations.length;
	}

	solvePart2() {
		const rope = new Array(10).fill(null).map(() => [0, 0]);
		const locations = [[0, 0]];
		let status = { rope, locations };
		this.moves.forEach((s) => {
			status = this.step(s, status);
		});
		return status.locations.length;
	}
};
