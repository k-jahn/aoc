const { input, test, test2 } = require('./12.input');

class Passages {
	constructor(str) {
		this.psgs = str.split('\n')
			.map((l) => l.split('-'))
			.reduce((acc, [a, b]) => {
				const next = { ...acc };
				next[a] = (next[a] || []).concat([b]);
				next[b] = (next[b] || []).concat([a]);
				return next;
			}, {});
	}

	crawler(prevPath, revisit) {
		const current = prevPath[prevPath.length - 1];
		if (current === 'end') return [prevPath];

		const isStop = (psg) => {
			if (revisit) {
				return psg === 'start'
					||	(/^[a-z]+$/.test(psg)
						&& prevPath.some((p) => p === psg)
						&& prevPath.some((p, i, a) => /^[a-z]+$/.test(p) && a.indexOf(p) !== i));
			}
			return /^[a-z]+$/.test(psg) && prevPath.some((p) => p === psg);
		};

		return this.psgs[current]
			.map((psg) => {
				if (isStop(psg)) return [];
				return this.crawler(prevPath.concat(psg), revisit);
			})
			.reduce((a, b) => a.concat(b));
	}

	solvePart1() {
		return this.crawler(['start']).length;
	}

	solvePart2() {
		return this.crawler(['start'], true).length;
	}
}

const testPassages = new Passages(test);
console.log(testPassages.solvePart2());

const testPassages2 = new Passages(test2);
console.log(testPassages2.solvePart2());

const passages = new Passages(input);
console.log(passages.solvePart2());
