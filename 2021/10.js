const { test, input } = require('./10.input');

class NavSubSystem {
	constructor(str) {
		this.report = str.split('\n');
		this.pairs = {
			'(': ')',
			'<': '>',
			'{': '}',
			'[': ']',
		};
		this.errorScores = {
			')': 3,
			']': 57,
			'}': 1197,
			'>': 25137,
		};
		this.completionScores = {
			'(': 1,
			'[': 2,
			'{': 3,
			'<': 4,
		};
	}

	checkLine(line) {
		const c = [];
		for (let i = 0; i < line.length; i++) {
			const symbol = line.split('')[i];
			if (symbol in this.pairs) c.push(symbol);
			else {
				const last = c.pop();
				if (symbol !== this.pairs[last]) {
					return {
						error: true,
						symbol,
					};
				}
			}
		}
		return {
			error: false,
			open: c,
		};
	}

	solvePart1() {
		return this.report.map((l) => this.checkLine(l))
			.filter((c) => c.error)
			.map((c) => this.errorScores[c.symbol])
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		const scores = this.report.map((l) => this.checkLine(l))
			.filter((c) => !c.error)
			.map((c) => c.open.reduceRight((a, e) => a * 5 + this.completionScores[e], 0));
		scores.sort((a, b) => a - b);
		return scores[(scores.length - 1) / 2];
	}
}

const testNav = new NavSubSystem(test);

console.log(testNav.solvePart2());

const nav = new NavSubSystem(input);

console.log(nav.solvePart2());
