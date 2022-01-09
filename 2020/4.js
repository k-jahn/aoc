// =============================  Advent of Code  =============================
// Solution Day 4 of 2020
// See https://adventofcode.com/2020/day/4

module.exports = class PassportChecker {
	constructor(str) {
		this.psp = str.split('\n\n')
			.map((l) => l.split(/[\n ]/)
				.map((v) => v.split(':'))
				.reduce((a, [key, value]) => {
					const q = {};
					q[key] = value;
					return { ...a, ...q };
				}, {}));
		this.req = {
			byr: (val) => +val >= 1920 && +val <= 2002,
			iyr: (val) => +val >= 2010 && +val <= 2020,
			eyr: (val) => +val >= 2020 && +val <= 2030,
			hgt: (val) => {
				const [_, num, unit] = val.match(/^(\d+)(cm|in)?/);
				return (unit === 'in' && +num >= 59 && +num <= 76)
					|| (unit === 'cm' && +num >= 150 && +num <= 193);
			},
			hcl: (val) => /^#[0-9a-f]{6}$/.test(val),
			ecl: (val) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(val),
			pid: (val) => /^[0-9]{9}$/.test(val),
		};
	}

	solvePart1() {
		return this.psp
			.filter((p) => Object.keys(this.req)
				.every((prop) => p[prop]))
			.length;
	}

	solvePart2() {
		return this.psp
			.filter((p) => Object.keys(this.req)
				.every((prop) => p[prop] && this.req[prop](p[prop])))
			.length;
	}
};
