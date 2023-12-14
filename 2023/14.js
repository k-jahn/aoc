/* eslint-disable no-unused-vars */
// =============================  Advent of Code  =============================
// Solution Day 14 of 2023
// See https://adventofcode.com/2023/day/14

module.exports = class ParabolicReflectorDish {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.lines = str.split('\n').map((l) => l.split(''));
	}

	show(lines) {
		console.log(lines.map((l) => l.join('')).join('\n'));
		console.log('\n');
	}

	turn(lines) {
		return lines[0].map((_, i, a) => lines.map((l) => l[a.length - i - 1]));
	}

	turnR(lines) {
		return lines[0].map((_, i) => lines.map((l) => l[i]).reverse());
	}

	roll(lines) {
		return lines.map((l) => l
			.join('')
			.replace(/[.O]+/g, (s) => s.replace(/\./g, '') + s.replace(/O/g, '')).split(''));
	}

	solvePart1(lines = this.lines) {
		this.show(lines);
		const turned = this.turn(lines);
		this.show(turned);
		const rolled = this.roll(turned);
		return rolled.reduce((acc, l) => {
			const positions = l.map((e, i, a) => (e === 'O' ? a.length - i : 0));
			return acc + positions.reduce((a, b) => a + b);
		}, 0);
	}

	solvePart2(lines = this.lines) {
		let current = lines;
		current = this.turn(current);
		const mem = {};
		let cycle = [];
		for (let i = 0; i < 1000000000; i++) {
			if (i % 4 === 0) {
				const key = current.map((l) => l.join('')).join('\n');
				if (mem[key]) {
					cycle = [mem[key], i / 4];
					break;
				}
				mem[key] = i / 4;
			}
			current = this.roll(current);
			current = this.turnR(current);
		}
		const cyclePos = ((1000000000 - cycle[0]) % (cycle[1] - cycle[0])) + cycle[0];
		const [endState] = Object.entries(mem).find(([state, i]) => i === cyclePos);
		// return {...mem, cycle, cyclePos, endState}
		return endState.split(('\n'))
			.map((l) => l.split(''))
			.reduce((acc, l) => {
				const positions = l.map((e, i, a) => (e === 'O' ? a.length - i : 0));
				return acc + positions.reduce((a, b) => a + b);
			}, 0);
	}
};
