// =============================  Advent of Code  =============================
// Solution Day 3 of 2023
// See https://adventofcode.com/2023/day/3

module.exports = class GearRatios {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.lines = str.split('\n');
	}

	solvePart1() {
		return this.lines.reduce((acc, line, i, lines) => {
			const lineCount = [...line.matchAll(/(?<=([^\d]|^))\d+(?=([^\d]|$))/g)]
				.filter((match) => {
					const { 0: { length }, 1: left, 2: right, index: start } = match;
					// get vertical boundary string (including diagonal!)
					const bounds = [start - left.length, start + length + right.length];
					const [upper, lower] = [-1, 1].map((k) => lines[i + k]?.slice(...bounds) || '');
					// check for symbols (performance optimization potential galore)
					return [left, right, upper, lower].some((boundaryString) => /[^.\d]/.test(boundaryString));
				})
				.map((match) => +match[0])
				.reduce((a, b) => a + b, 0);
			return acc + lineCount;
		}, 0);
	}

	solvePart2() {
		const getNumber = (columnNr, lineNr) => {
			const line = this.lines[lineNr];
			let lower = columnNr;
			let upper = columnNr + 1;
			while (/\d/.test(line.slice(lower - 1, lower))) lower--;
			while (/\d/.test(line.slice(upper, upper + 1))) upper++;
			return +line.slice(lower, upper);
		};

		const getNumbers = (boundary) => {
			const numberMatches = [...boundary.str.matchAll(/\d+/g)];
			return numberMatches.map((match) => getNumber(boundary.column + match.index, boundary.line));
		};

		return this.lines.reduce((acc, line, i, lines) => {
			const lineGearRatios = [...line.matchAll(/\*/g)]
				.map((match) => {
					const { 0: { length }, index: start } = match;
					// get left/right boundary objects (incl coordinates)
					const [left, right] = [[start - 1, start], [start + length, start + length + 1]]
						.map((bounds) => ({
							str: line.slice(...bounds),
							column: bounds[0],
							line: i,
						}));
					// get upper/lower boundary objects
					const bounds = [start - left.str.length, start + length + right.str.length];
					const [upper, lower] = [-1, 1]
						.map((k) => ({
							str: lines[i + k]?.slice(...bounds) || '',
							column: start - left.str.length,
							line: i + k,
						}));
					// extract bounding numbers
					const boundingNumbers = [left, right, upper, lower]
						.map((boundary) => getNumbers(boundary))
						.reduce((a, b) => a.concat(b));
					return boundingNumbers.length === 2 ? boundingNumbers[0] * boundingNumbers[1] : 0;
				})
				.reduce((a, b) => a + b, 0);
			return acc + lineGearRatios;
		}, 0);
	}
};
