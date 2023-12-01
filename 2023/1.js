// =============================  Advent of Code  =============================
// Solution Day 1 of 2023
// See https://adventofcode.com/2023/day/1

module.exports = class Trebuchet {
	constructor(str) {
		this.str = str;
		this.lines = str.trim().split('\n');
	}

	solvePart1() {
		return this.lines.reduce((acc, l) => {
			const [_1, d1, d2] = l.match(/(?=.*?(\d))(?=.*(\d))/);
			return acc + parseInt(d1 + d2, 10);
		}, 0);
	}

	solvePart2() {
		const nStr = 'one|two|three|four|five|six|seven|eight|nine';
		const regExp = new RegExp(`(?=.*?(\\d|${nStr}))(?=.*(\\d|${nStr}))`);
		const parse = (str) => (nStr.indexOf(str) !== -1 ? nStr.split('|').indexOf(str) + 1 : +str);
		return this.lines.reduce((acc, l) => {
			const [_1, d1, d2] = l.match(regExp);
			return acc + parse(d1) * 10 + parse(d2);
		}, 0);
	}
};
