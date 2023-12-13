// =============================  Advent of Code  =============================
// Solution Day 12 of 2023
// See https://adventofcode.com/2023/day/12

module.exports = class HotSprings {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.lines = str.split('\n').map((l) => {
			const [pattern, numbers] = l.split(' ');
			return {
				pattern,
				numbers: numbers.split(',').map((d) => +d),
			};
		});
	}

	// CPU go brr
	solvePart1(lines = this.lines) {
		const build = (str) => {
			if (!/\?/.test(str)) return [str];
			const [_, first, remainder] = str.match(/^([^?]*)\?(.*)/);
			return build(remainder).map((rem) => [`${first}.${rem}`, `${first}#${rem}`])
				.reduce((a, b) => a.concat(b));
		};
		return lines.map(({ pattern, numbers }) => {
			const arrangements = build(pattern);
			const reg = new RegExp(`^\\.*${numbers.map((n) => `#{${n}}`).join('\\.+')}\\.*$`);
			return arrangements.filter((a) => reg.test(a)).length;
		}).reduce((a, b) => a + b);
	}

	/* eslint-disable no-param-reassign */
	solvePart1Efficient(lines = this.lines) {
		const counter = (pattern, numbers, memoize) => {
			const key = pattern + numbers.join('|');
			if (memoize[key]) return memoize[key];
			if (numbers.length === 0) return /#/.test(pattern) ? 0 : 1;

			const [current, ...remaining] = numbers;
			const minRemaining = numbers.reduce((a, b) => a + b, numbers.length - 1);
			let count = 0;
			const regExp = /^[?#]+$/;
			for (let i = 0; i <= pattern.length - minRemaining; i++) {
				if (i >= 2 && pattern.slice(i - 2, i - 1) === '#') break;
				const subStr = pattern.slice(i, i + current);
				const borders = [pattern.slice(i - 1, i), pattern.slice(i + current, i + current + 1)];
				// console.log(borders, borders.every((c) => borderRegExp.test(c)))
				if (regExp.test(subStr) && borders.every((c) => !c || c === '?' || c === '.')) {
					count += counter(pattern.slice(i + current + 1), remaining, memoize);
				}
			}
			memoize[key] = count;
			return count;
		};
		return lines
			.map(({ pattern, numbers }) => {
				// console.log(i, pattern, numbers.join(','));
				const memoizer = {};
				if (/.+\..+/.test(pattern)) {
					const half = Math.floor(pattern.length / 2);
					const indexRight = pattern.slice(half).indexOf('.') !== -1 ? half + pattern.slice(half).indexOf('.') : Infinity;
					const indexLeft = pattern.slice(0, half).lastIndexOf('.') !== -1 ? pattern.slice(0, half).lastIndexOf('.') : Infinity;
					const index = half - indexLeft > indexRight - half ? indexRight : indexLeft;
					let count = 0;
					const left = pattern.slice(0, index);
					const right = pattern.slice(index + 1);
					if (left.length === 0 || right.length === 0) {
						return counter(pattern, numbers, memoizer);
					}
					for (let j = 0; j <= numbers.length; j++) {
						const nLeft = numbers.slice(0, j);
						const nRight = numbers.slice(j);
						count += counter(left, nLeft, memoizer) * counter(right, nRight, memoizer);
					}
					return count;
				}
				return counter(pattern, numbers, memoizer);
			})
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		const longLines = this.lines.map(({ pattern, numbers }) => ({
			pattern: new Array(5).fill(pattern).join('?'),
			numbers: new Array(5).fill(null).map(() => [...numbers]).reduce((a, b) => a.concat(b)),
		}));
		return this.solvePart1Efficient(longLines);
	}

	solvePart2Control() {
		const longLines = this.lines.map(({ pattern, numbers }) => ({
			pattern: new Array(5).fill(pattern).join('?'),
			numbers: new Array(5).fill(null).map(() => [...numbers]).reduce((a, b) => a.concat(b)),
		}));
		return this.solvePart1(longLines);
	}
};
