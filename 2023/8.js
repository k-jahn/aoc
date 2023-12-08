// =============================  Advent of Code  =============================
// Solution Day 8 of 2023
// See https://adventofcode.com/2023/day/8

module.exports = class HauntedWasteland {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		const [instStr, linesStr] = str.split('\n\n');
		this.instructions = instStr.split('');
		this.nodes = linesStr.split('\n').reduce((acc, line) => {
			const [_, name, L, R] = line.match(/([A-Z0-9/]{3}).+([A-Z0-9]{3}), ([A-Z0-9]{3})/);
			return {
				...acc,
				[name]: {
					L,
					R,
				},
			};
		}, {});
	}

	solvePart1() {
		let current = 'AAA';
		for (let i = 0; true; i++) {
			if (current === 'ZZZ') return i;
			current = this.nodes[current][this.instructions[i % this.instructions.length]];
		}
	}

	solvePart2Brute(limit = Infinity) {
		let current = Object.keys(this.nodes).filter((n) => /..A/.test(n));
		for (let i = 0; i < limit; i++) {
			if (current.every((n) => /..Z/.test(n))) return i;
			current = current.map((n) => this.nodes[n][this.instructions[i % this.instructions.length]]);
		}
		return null;
	}

	solvePart2() {
		const period = this.instructions.length;
		const starts = Object.keys(this.nodes).filter((n) => /..A/.test(n));
		const loops = starts.map((start) => {
			let current = start;
			const visited = [];
			for (let i = 0; true; i++) {
				visited.push(current);
				for (let q = i - period; q >= 0; q -= period) {
					if (visited[q] === current) {
						const endNodes = visited.slice(q)
							.reduce((acc, v, p) => (/..Z/.test(v) ? [...acc, p + q] : acc), []);
						return {
							endNodes,
							p: i - q,
						};
					}
				}
				current = this.nodes[current][this.instructions[i % this.instructions.length]];
			}
		});

		// observational - 1 endstate per loop, first endnode == period

		// euclidian gcd algorithm
		function gcd(a, b) {
			if (b === 0) return a;
			return gcd(b, (a % b));
		}
		return loops.map((l) => l.p).reduce((a, b) => (a * b) / gcd(a, b));
	}
};
