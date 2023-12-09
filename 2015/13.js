// =============================  Advent of Code  =============================
// Solution Day 13 of 2015
// See https://adventofcode.com/2015/day/13

const permute = (arr) => {
	if (arr.length === 1) return [arr];
	const out = [];
	for (let i = 0; i < arr.length; i++) {
		const el = arr[i];
		const remainder = arr.slice(0, i).concat(arr.slice(i + 1));
		const remainderPermutations = permute(remainder)
			.map((per) => [el].concat(per));
		out.push(...remainderPermutations);
	}
	return out;
};

module.exports = class KnightsOfTheDinnerTable {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.peeps = str.split('\n')
			.reduce((acc, line) => {
				const [_, nameA, polarity, n, nameB] = line
					.match(/([^ ]+) would ([^ ]+) (\d+) happiness units by sitting next to (.*)\./);
				const val = +n * (polarity === 'gain' ? 1 : -1);
				return {
					...acc,
					[nameA]: {
						...(acc[nameA] || {}),
						[nameB]: val,
					},
				};
			}, {});
	}

	solvePart1() {
		const happinesses = permute(Object.keys(this.peeps))
			.map((order) => order.reduce((acc, person, i, arr) => {
				const left = arr[(i - 1 + arr.length) % arr.length];
				const right = arr[(i + 1) % arr.length];
				return acc + this.peeps[person][left] + this.peeps[person][right];
			}, 0));
		return Math.max(...happinesses);
	}

	solvePart2() {
		const happinesses = permute(Object.keys(this.peeps).concat('me'))
			.map((order) => order.reduce((acc, person, i, arr) => {
				if (person === 'me') return acc;
				const left = arr[(i - 1 + arr.length) % arr.length];
				const right = arr[(i + 1) % arr.length];
				return acc + (this.peeps[person][left] || 0) + (this.peeps[person][right] || 0);
			}, 0));
		return happinesses.reduce((a, b) => Math.max(a, b));
	}
};
