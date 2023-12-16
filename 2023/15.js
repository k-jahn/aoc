// =============================  Advent of Code  =============================
// Solution Day 15 of 2023
// See https://adventofcode.com/2023/day/15

module.exports = class LensLibrary {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.cmds = str.split(',');
	}

	hash(str) {
		return str.split('')
			.reduce((a, l) => {
				const v = l.charCodeAt(0);
				return ((a + v) * 17) % 256;
			}, 0);
	}

	solvePart1(cmds = this.cmds) {
		return cmds
			.map((c) => this.hash(c))
			.reduce((a, b) => a + b);
	}

	solvePart2(cmds = this.cmds) {
		return cmds
			.reduce((acc, e) => {
				const [_, c, op, val] = e.match(/([a-z]+)(.)(\d*)/);
				const hash = this.hash(c);
				return acc.map((v, i) => {
					if (i !== hash) return v;
					if (op === '-') return v.filter((l) => l.c !== c);
					let hasReplaced = false;
					const replaced = v.map((l) => {
						if (l.c !== c) return l;
						hasReplaced = true;
						return { c, op, val };
					});
					return [...replaced, ...(!hasReplaced ? [{ c, op, val }] : [])];
				});
			}, new Array(256).fill(null).map(() => []))
			.reduce((acc, box, i) => {
				const boxVal = box.reduce((accBox, { val }, j) => accBox + (i + 1) * (j + 1) * (+val), 0);
				return acc + boxVal;
			}, 0);
	}
};
