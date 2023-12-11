// =============================  Advent of Code  =============================
// Solution Day 13 of 2022
// See https://adventofcode.com/2022/day/13

module.exports = class DistressSignal {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.packetPairs = str.split('\n\n').map((line) => line.split('\n').map(JSON.parse));
	}

	compare(a, b) {
		const [na, nb] = [a, b].map((l) => typeof l === 'number');
		if (na && nb) {
			return b - a ? (b - a) / Math.abs(b - a) : 0;
		}
		if (na) return this.compare([a], b);
		if (nb) return this.compare(a, [b]);
		for (let i = 0; i < a.length; i++) {
			if (b[i] === undefined) return -1;
			const result = this.compare(a[i], b[i]);
			if (result) return result;
		}
		if (a.length < b.length) return 1;
		return 0;
	}

	solvePart1() {
		return this.packetPairs
			.map(([a, b]) => this.compare(a, b))
			.map((d, i) => (d !== -1 ? i + 1 : 0))
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		return this.packetPairs
			.reduce((a, b) => a.concat(b))
			.concat([[[2]], [[6]]])
			.sort((a, b) => -this.compare(a, b))
			.reduce((acc, e, i) => {
				const isIt = /^\[\[[26]\]\]$/.test(JSON.stringify(e));
				return isIt ? acc * (i + 1) : acc;
			}, 1);
	}
};
