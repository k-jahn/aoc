// =============================  Advent of Code  =============================
// Solution Day 15 of 2021
// See https://adventofcode.com/2021/day/15

const { testCase } = require('./15.testcase');
const { input } = require('./15.input');

class Cave {
	constructor(str) {
		this.cave = str.split('\n').map((l, i) => l.split('').map((d, j) => {
			const isOrigin = i === 0 && j === 0;
			return {
				risk: +d,
				totalRisk: (isOrigin ? 0 : Infinity),
				visited: false,
				coords: [i, j],
				cave: 'cave',
			};
		}));

		const bigCaveX = str.split('\n')
			.map((l) => [0, 1, 2, 3, 4].map((n) => l.split('').map((d) => ((+d + n - 1) % 9) + 1)).reduce((a, b) => a.concat(b)));
		this.bigCave = [0, 1, 2, 3, 4]
			.map((n) => bigCaveX.map((l) => l.map((d) => ((+d + n - 1) % 9) + 1)))
			.reduce((a, b) => a.concat(b))
			.map((l, i) => l.map((d, j) => {
				const isOrigin = i === 0 && j === 0;
				return {
					risk: +d,
					totalRisk: (isOrigin ? 0 : Infinity),
					visited: false,
					coords: [i, j],
					cave: 'bigCave',
				};
			}));
	}

	visitNext() {
		const node = this.queue.shift();
		if (!node) throw new Error('No more nodes to visit');
		const cave = this[node.cave];
		const [x, y] = node.coords;
		[[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].forEach(([u, v]) => {
			if (!(u in cave) || !(v in cave[u])) return;
			const cNode = cave[u][v];
			if (cNode.visited) return;
			cNode.totalRisk = node.totalRisk + cNode.risk < cNode.totalRisk
				? node.totalRisk + cNode.risk
				: cNode.totalRisk;
			if (this.queue.indexOf(cNode) === -1) this.queue.push(cNode);
		});
		node.visited = true;
		this.queue.sort((a, b) => a.totalRisk - b.totalRisk);
	}

	solvePart1() {
		const c = this.cave;
		this.queue = [c[0][0]];
		const exitNode = c[c.length - 1][c[c.length - 1].length - 1];
		while (!exitNode.visited) this.visitNext();
		return exitNode.totalRisk;
	}

	solvePart2() {
		const c = this.bigCave;
		this.queue = [c[0][0]];
		const exitNode = c[c.length - 1][c[c.length - 1].length - 1];
		while (!exitNode.visited) this.visitNext();
		return exitNode.totalRisk;
	}
}

const testCave = new Cave(testCase);
console.log(testCave.solvePart1());
console.log(testCave.solvePart2());

const inputCave = new Cave(input);
console.log(inputCave.solvePart1());
console.log(inputCave.solvePart2());
