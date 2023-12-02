// =============================  Advent of Code  =============================
// Solution Day 2 of 2023
// See https://adventofcode.com/2023/day/2

module.exports = class CubeConundrum {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.games = str.split('\n')
			.reduce((acc, line) => {
				const [_, id, resultStr] = line.match(/Game ([^:]+): (.*)/);
				const resultObj = resultStr.split('; ')
					.map((subset) => subset.split(', ').reduce((colorAcc, colorStr) => {
						const [__, numberStr, color] = colorStr.match(/(\d+) (.+)/);
						return { ...colorAcc, [color]: +numberStr + (colorAcc[color] || 0) };
					}, {}));
				return { ...acc, [id]: resultObj };
			}, {});
	}

	solvePart1() {
		return Object.entries(this.games).reduce((acc, [id, game]) => {
			const isPossible = game.every((cubesSet) => {
				if (cubesSet.red && cubesSet.red > 12) return false;
				if (cubesSet.green && cubesSet.green > 13) return false;
				if (cubesSet.blue && cubesSet.blue > 14) return false;
				return true;
			});
			return isPossible ? +id + acc : acc;
		}, 0);
	}

	solvePart2() {
		const req = (a, b) => Math.max(a || 0, b || 0);
		return Object.values(this.games).reduce((acc, game) => {
			const minRequired = game.reduce((minAcc, set) => ({
				red: req(minAcc.red, set.red),
				green: req(minAcc.green, set.green),
				blue: req(minAcc.blue, set.blue),
			}));
			return acc + minRequired.red * minRequired.green * minRequired.blue;
		}, 0);
	}
};
