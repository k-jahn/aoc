const { test, input } = require('./9.input');

class Map {
	constructor(str) {
		this.m = str.split('\n').map((l) => l.split('').map((d) => parseInt(d, 10)));
	}

	getMinima() {
		const out = [];
		for (let i = 0; i < this.m.length; i++) {
			for (let j = 0; j < this.m[i].length; j++) {
				if (this.isMinimum(i, j)) {
					out.push([i, j]);
				}
			}
		}
		return out;
	}

	isMinimum(x, y) {
		return [x - 1, x + 1].every((u) => ((u in this.m) ? this.m[u][y] > this.m[x][y] : true))
			&& [y - 1, y + 1].every((v) => ((v in this.m[x]) ? this.m[x][v] > this.m[x][y] : true));
	}

	toString() {
		const minima = this.getMinima();
		return this.m.map((l, i) => l.map((d, j) => (minima.some(([x, y]) => x === i && y === j) ? '\x1b[41m' + d + '\x1b[0m' : d)).join('')).join('\n');
	}

	solvePart1() {
		return this.getMinima().reduce((a, [x, y]) => 1 + a + this.m[x][y], 0);
	}

	getBasin(x, y) {
		const basin = [[x, y]];
		const crawler = (u, v) => {
			[[u + 1, v], [u - 1, v], [u, v + 1], [u, v - 1]].forEach(([p, q]) => {
				if (
					p in this.m
					&& q in this.m[p]
					&& !basin.some(([a, b]) => a === p && b === q)
					&& this.m[p][q] !== 9
				) {
					basin.push([p, q]);
					crawler(p, q);
				}
			});
		};
		crawler(x, y);
		return basin;
	}

	solvePart2() {
		return this.getMinima()
			.map(([x, y]) => this.getBasin(x, y).length).sort((a, b) => a - b)
			.slice(-3)
			.reduce((a, b) => a * b);
	}
}

const testMap = new Map(test);

console.log(testMap.toString());
console.log(testMap.solvePart2());

const map = new Map(input);

console.log(map.toString());
console.log(map.solvePart2());
