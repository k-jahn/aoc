// =============================  Advent of Code  =============================
// Solution Day 11 of 2023
// See https://adventofcode.com/2023/day/11

module.exports = class CosmicExpansion {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.picture = str.split('\n').map((l) => l.split('').map((g) => g === '#'));
	}

	solvePart1() {
		const expanded = this.picture
			.reduce((acc, l) => (l.some((g) => g) ? [...acc, l] : [...acc, [...l], [...l]]), [])
			.map((l, _j, arr) => l.reduce((acc, e, i) => {
				if (arr.some((la) => la[i])) return [...acc, e];
				return [...acc, false, false];
			}, []));
		const stars = expanded
			.map((l, i) => l.reduce((acc, d, j) => (d ? [...acc, [i, j]] : acc), []), [])
			.reduce((a, b) => a.concat(b));
		return stars.reduce((a, s, i, arr) => {
			const following = arr.slice(i + 1);
			return a + following
				.reduce((acc, fs) => acc + Math.abs((fs[0] - s[0])) + Math.abs((fs[1] - s[1])), 0);
		}, 0);
	}

	solvePart2() {
		const stars = this.picture
			.map((l, i) => l.reduce((acc, d, j) => (d ? [...acc, [i, j]] : acc), []), [])
			.reduce((a, b) => a.concat(b));
		let expanded = stars;
		for (let i = this.picture.length - 1; i >= 0; i--) {
			if (expanded.every(([si]) => si !== i)) {
				expanded = expanded.map(([si, sj]) => [si > i ? si + 999999 : si, sj]);
			}
		}
		for (let j = this.picture[0].length - 1; j >= 0; j--) {
			if (expanded.every(([_si, sj]) => sj !== j)) { // eslint-disable-line no-unused-vars
				expanded = expanded.map(([si, sj]) => [si, sj > j ? sj + 999999 : sj]);
			}
		}
		return expanded.reduce((a, s, i, arr) => {
			const following = arr.slice(i + 1);
			return a + following
				.reduce((acc, fs) => acc + Math.abs((fs[0] - s[0])) + Math.abs((fs[1] - s[1])), 0);
		}, 0);
	}
};
