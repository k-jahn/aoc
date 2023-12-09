// =============================  Advent of Code  =============================
// Solution Day 9 of 2015
// See https://adventofcode.com/2015/day/9

module.exports = class AllInASingleNight {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.map = str.split('\n')
			.reduce((acc, line) => {
				const [_, town1, town2, dist] = line.match(/(.+) to (.+) = (\d+)/);
				return {
					...acc,
					[town1]: {
						...(acc[town1] || {}),
						[town2]: +dist,
					},
					[town2]: {
						...(acc[town2] || {}),
						[town1]: +dist,
					},
				};
			}, {});
	}

	// assumption - every town is fully connected
	getDists() {
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
		// double the effort... hm
		const routes = permute(Object.keys(this.map));
		return routes.map((route) => route.reduce((acc, town, i, arr) => {
			const nextTown = arr[i + 1];
			return nextTown ? acc + this.map[town][nextTown] : acc;
		}, 0));
	}

	solvePart1() {
		return Math.min(...this.getDists());
	}

	solvePart2() {
		return Math.max(...this.getDists());
	}
};
