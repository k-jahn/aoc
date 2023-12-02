/* eslint-disable no-restricted-syntax, no-continue */
// =============================  Advent of Code  =============================
// Solution Day 12 of 2022
// See https://adventofcode.com/2022/day/12

class Node {
	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {string} val
	 */
	constructor(x, y, val) {
		this.x = x;
		this.y = y;
		this.value = val;
		this.connections = [];
		this.start = this.value === 'S';
		this.end = this.value === 'E';
		this.height = val.replace('S', 'a').replace('E', 'z').charCodeAt(0) - 97;
	}

	/**
	 * checks if node can be linked and saves reference if applicable
	 * @param {Node} node
	 */
	link(node) {
		// check climbability
		if (node.height - this.height > 1) return;
		this.connections.push(node);
	}
}

module.exports = class HillClimbingAlgorithm {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;

		// build nodes
		this.landscape = str.split('\n')
			.map((line, i) => line.split('').map((val, j) => new Node(i, j, val)))
			// link
			.map((line, i, linesArr) => {
				line.forEach((node, j) => {
					// up / down
					[i - 1, i + 1].forEach((q) => {
						if (q in linesArr) node.link(linesArr[q][j]);
					});
					// left / right
					[j - 1, j + 1].forEach((r) => {
						if (r in line) node.link(line[r]);
					});
				});
				return line;
			})
			.reduce((acc, line) => acc.concat(line));
	}

	solvePart1() {
		const startNode = this.landscape.find((node) => node.start);
		startNode.path = [];
		let current = [startNode];
		const visited = [startNode];
		for (let step = 1; current.length; step++) {
			const next = new Set();
			for (const node of current) {
				for (const connection of node.connections) {
					if (connection.end) return step;
					if (visited.some((visitedNode) => visitedNode === connection)) continue;
					connection.path = node.path.concat([node]);
					visited.push(connection);
					next.add(connection);
				}
			}
			current = Array.from(next);
		}
		return NaN;
	}

	solvePart2() {
		return this;
	}
};
