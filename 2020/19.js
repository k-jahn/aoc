// =============================  Advent of Code  =============================
// Solution Day 19 of 2020
// See https://adventofcode.com/2020/day/19

module.exports = class MonsterMessages {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		const [rulesStr, testStr] = this.str.split('\n\n');
		this.rules = rulesStr.split('\n')
			.map((line) => {
				const [_, indexStr, rule] = line.match(/^(.*): (.*)/);
				return { index: +indexStr, rule };
			})
			.sort((a, b) => a.index - b.index)
			.map((a) => a.rule);
		this.tests = testStr.split('\n');
	}

	solvePart1() {
		const resolved = new Array(this.rules.length).fill(null);
		const resolve = (n) => {
			if (resolved[n]) return resolved[n];
			let current = this.rules[n];
			const reg = /\d+/;
			while (reg.test(current)) current = current.replace(reg, (match) => resolve(+match));
			current = current.replace(/[ "]/g, '');
			current = /\|/.test(this.rules[n]) ? `(${current})` : current;
			current = current.replace(/\(a\|b\)|\(b\|a\)|\(\.\|\.\)/, '.');
			resolved[n] = current;
			return current;
		};
		const regEx = new RegExp(`^(${resolve(0).replace(/ /g, '')})$`);
		return this.tests.filter((testStr) => regEx.test(testStr)).length;
	}

	solvePart2() {
		const amendedRules = this.rules.slice();
		amendedRules[8] = '(42)+';
		// hardcode, for shame - if this can be regexed properly, i don't know how
		amendedRules[11] = '42 31 | 42 42 31 31 | 42 42 42 31 31 31 | 42 42 42 42 31 31 31 31 | 42 42 42 42 42 31 31 31 31 31 | 42 42 42 42 42 42 31 31 31 31 31 31';
		const resolved = new Array(amendedRules.length).fill(null);
		const resolve = (n) => {
			if (resolved[n]) return resolved[n];
			let current = amendedRules[n];
			const reg = /\d+/;
			while (reg.test(current)) current = current.replace(reg, (match) => resolve(+match));
			current = current.replace(/[ "]/g, '');
			current = /\|/.test(amendedRules[n]) ? `(${current})` : current;
			current = current.replace(/\(a\|b\)|\(b\|a\)|\(\.\|\.\)/, '.');
			resolved[n] = current;
			return current;
		};
		const regEx = new RegExp(`^(${resolve(0).replace(/ /g, '')})$`);
		return this.tests.filter((testStr) => regEx.test(testStr)).length;
	}
};
