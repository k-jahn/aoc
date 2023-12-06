// =============================  Advent of Code  =============================
// Solution Day 2 of 2019
// See https://adventofcode.com/2019/day/2

module.exports = class OneTwoZeroOneProgramAlarm {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.program = this.str.split(',').map((s) => +s);
	}

	run(prg) {
		const program = prg.slice();
		let pointer = 0;
		for (pointer; program[pointer] !== 99; pointer += 4) {
			const [command, par1, par2, output] = program.slice(pointer);
			switch (command) {
				case 1:
					program[output] = program[par1] + program[par2];
					break;
				case 2:
					program[output] = program[par1] * program[par2];
					break;
				default:
					throw new Error();
			}
		}
		return program[0];
	}

	solvePart1() {
		const program = this.program.slice();
		program[1] = 12;
		program[2] = 2;

		return this.run(program);
	}

	solvePart2() {
		for (let i = 1; i < 100; i++) {
			for (let j = 1; j < 100; j++) {
				const program = this.program.slice();
				program[1] = i;
				program[2] = j;
				if (this.run(program) === 19690720) return 100 * i + j;
			}
		}
		throw new Error();
	}
};
