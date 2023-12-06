// =============================  Advent of Code  =============================
// Solution Day 6 of 2015
// See https://adventofcode.com/2015/day/6

module.exports = class ProbablyAFireHazard {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.instructions = str.split('\n')
			.map((line) => {
				// console.log(line);
				const [_, command, x1, y1, x2, y2] = line.match(/([^0-9]+) (\d+),(\d+) through (\d+),(\d+)/);

				// part 1
				let func;
				if (command === 'toggle') func = (a) => !a;
				else if (command === 'turn on') func = () => true;
				else func = () => false;

				// part 2
				let func2;
				if (command === 'toggle') func2 = (a) => a + 2;
				else if (command === 'turn on') func2 = (a) => a + 1;
				else func2 = (a) => Math.max(a - 1, 0);

				return {
					func,
					func2,
					command,
					from: {
						x: +x1,
						y: +y1,
					},
					to: {
						x: +x2,
						y: +y2,
					},
				};
			});
	}

	solvePart1() {
		const array = new Array(1000).fill(0).map(() => new Array(1000).fill(false));
		this.instructions.forEach((inst) => {
			for (let i = inst.from.x; i <= inst.to.x; i++) {
				for (let j = inst.from.y; j <= inst.to.y; j++) {
					array[i][j] = inst.func(array[i][j]);
				}
			}
		});
		return array.reduce((acc, line) => acc + line.filter((l) => l).length, 0);
	}

	solvePart2() {
		const array = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
		this.instructions.forEach((inst) => {
			for (let i = inst.from.x; i <= inst.to.x; i++) {
				for (let j = inst.from.y; j <= inst.to.y; j++) {
					array[i][j] = inst.func2(array[i][j]);
				}
			}
		});
		return array.reduce((acc, line) => acc + line.reduce((a, b) => a + b), 0);
	}
};
