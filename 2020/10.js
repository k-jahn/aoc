// =============================  Advent of Code  =============================
// Solution Day 10 of 2020
// See https://adventofcode.com/2020/day/10

module.exports = class JoltAdapter {
	constructor(str) {
		this.jolts = str.split('\n').map((d) => +d)
			.sort((a, b) => a - b);
	}

	solvePart1() {
		const freqs = this.jolts
			.concat([Math.max(...this.jolts) + 3])
			.map((e, i, arr) => (i === 0 ? e : e - arr[i - 1]))
			.reduce((ac, e) => {
				const out = {};
				out[e] = ac[e] + 1;
				return { ...ac, ...out };
			}, { 1: 0, 2: 0, 3: 0 });
		return freqs[3] * freqs[1];
	}

	getSegmentCombinations(seg) {
		if (seg.length === 1) return 1;
		let combinations = 0;
		for (let i = 1; i <= 3; i++) {
			if (i in seg && seg[i] - seg[0] <= 3) {
				combinations += this.getSegmentCombinations(seg.slice(i));
			}
		}
		return combinations;
	}

	solvePart2() {
		const chain = [0].concat(this.jolts).concat([Math.max(...this.jolts) + 3]);
		const joints = chain
			.reduce((a, e, i, ar) => (i - 1 in ar && e - ar[i - 1] === 3 ? a.concat([i]) : a), [])
			.concat(chain.length)
			.map((e, i, arr) => chain.slice(i ? arr[i - 1] : 0, e))
			.map((e) => this.getSegmentCombinations(e))
			.reduce((a, b) => a * b);
		return joints;
	}
};
