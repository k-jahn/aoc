const { test, input } = require('./8.input');

class SevenSegmentSearch {
	constructor(str) {
		this.displays = str.split('\n')
			.map((l) => l.split(' | ').map((s) => s.split(' ')))
			.map(([patterns, output]) => ({ patterns, output }));

		this.ideal = {
			abcefg: 0,
			cf: 1,
			acdeg: 2,
			acdfg: 3,
			bcdf: 4,
			abdfg: 5,
			abdefg: 6,
			acf: 7,
			abcdefg: 8,
			abcdfg: 9,
		};
	}

	solvePart1() {
		return this.displays
			.map((display) => display.output
				.reduce((a, d) => ([2, 3, 4, 7].some((len) => len === d.length) ? a + 1 : a), 0))
			.reduce((a, b) => a + b);
	}

	decodeDisplay(dsp) {
		const patterns = dsp.patterns.map((p) => p.split(''))
			.sort((a, b) => a.length - b.length);

		const dict = {};

		// a: present in 7 (len 3) but not in 1 (len 2)
		dict.a = patterns[1].find((l) => patterns[0].indexOf(l) === -1);
		// f: present in 1 (len 2) and in 3/3 len 6 patterns (0,9,6)
		dict.f = patterns[0].find((l) => patterns
			.slice(6, 9)
			.every((len6pat) => len6pat.indexOf(l) !== -1));
		// c: not f, present in 1 (len 2)
		dict.c = patterns[0].find((l) => l !== dict.f);
		// b: present in  4 (len 4) but not 1 (len 2) and 3/3 len 6 patterns (0,9,6)
		dict.b = patterns[2]
			.filter((l) => patterns[1].indexOf(l) === -1)
			.find((l) => patterns.slice(6, 9).every((len6pat) => len6pat.indexOf(l) !== -1));
		// d: present in 4 (len 4) but not 1 (len 2) and not b
		dict.d = patterns[2]
			.find((l) => l !== dict.b && patterns[0].indexOf(l) === -1);
		// g: present in all len 5 patterns (2, 3, 5), not a or d
		dict.g = patterns[3]
			.find((l) => patterns.slice(4, 6)
				.every((pattern) => pattern.indexOf(l) !== -1) && l !== dict.a && l !== dict.d);
		dict.e = patterns[9].find((l) => Object.values(dict).every((j) => j !== l));

		const reverseDict = Object.keys(dict)
			.reduce((a, k) => { const n = { ...a }; n[dict[k]] = k; return n; }, {});

		return dsp.output.map((digit) => this.ideal[digit.split('').map((l) => reverseDict[l]).sort().join('')]);
	}

	solvePart2() {
		return this.displays.map((display) => this.decodeDisplay(display))
			.map((n) => parseInt(n.join(''), 10))
			.reduce((a, b) => a + b);
	}
}

const testSevenSegmentSearch = new SevenSegmentSearch(test);

console.log(testSevenSegmentSearch.solvePart2());

const sevenSegmentSearch = new SevenSegmentSearch(input);

console.log(sevenSegmentSearch.solvePart2());
