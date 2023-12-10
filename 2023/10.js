// =============================  Advent of Code  =============================
// Solution Day 10 of 2023
// See https://adventofcode.com/2023/day/10

module.exports = class PipeMaze {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;

		this.connectorTypes = {
			'|': [[1, 0], [-1, 0]],
			'-': [[0, 1], [0, -1]],
			L: [[0, 1], [-1, 0]],
			F: [[0, 1], [1, 0]],
			J: [[0, -1], [-1, 0]],
			7: [[0, -1], [1, 0]],
			S: [[0, -1], [1, 0], [0, 1], [-1, 0]],
			'.': [],
		};

		this.nodes = str.split('\n')
			.map((l, i) => l.split('').map((symbol, j) => ({
				symbol,
				coord: [i, j],
				connectors: this.connectorTypes[symbol],
				connections: [],
			})))
			.map((line, _i, linesArr) => {
				line.forEach((node) => {
					const [ci, cj] = node.coord;
					const newConnections = node.connectors
						.map(([i, j]) => ({
							reverse: [i, j].map((n) => n * -1),
							node: i + ci in linesArr && j + cj in line ? linesArr[i + ci][j + cj] : null,
						}))
						.filter((n) => {
							if (node.connections.find((c) => c === n)) return false;
							return n.node?.connectors
								.some(([ai, aj]) => {
									const [bi, bj] = n.reverse;
									return ai === bi && aj === bj;
								});
						})
						.map((n) => n.node);
					node.connections = [...node.connections, ...newConnections]; // eslint-disable-line no-param-reassign, max-len
				});
				return line;
			})
			.reduce((a, b) => a.concat(b));

		this.li = str.split('\n').length;
		this.lj = this.nodes.length / this.li;
	}

	solvePart1() {
		const start = this.nodes.find((s) => s.symbol === 'S');
		const visited = [];
		for (let next = start; next;) {
			visited.push(next);
			next = next.connections.find((n) => !visited.find((m) => m === n));
		}
		return visited.length / 2;
	}

	solvePart2() {
		// console.log(this.str);
		const start = this.nodes.find((s) => s.symbol === 'S');
		const visited = [];
		for (let next = start; next;) {
			visited.push(next);
			next = next.connections.find((n) => !visited.find((m) => m === n));
		}

		const landscape = new Array(this.li)
			.fill(null)
			.map((_1, i) => new Array(this.lj).fill(null).map((_2, j) => {
				const vNode = visited.find((n) => i === n.coord[0] && j === n.coord[1]);
				return Boolean(vNode);
			}));

		// this.draw(landscape);
		const regions = [];
		const polarity = 1; // not gonna script this
		visited.forEach((node, q) => {
			// this.draw(landscape);
			const next = visited[(q + 1) % visited.length];
			const prev = visited[(q - 1 + visited.length) % visited.length];
			const dirNext = [0, 1].map((d) => next.coord[d] - node.coord[d]);
			const dirPrev = [0, 1].map((d) => node.coord[d] - prev.coord[d]);
			const insideNeighbors = [dirPrev, dirNext]
				.map((dir) => [node.coord[0] - polarity * dir[1], node.coord[1] + polarity * dir[0]]);
			insideNeighbors.forEach((neighbor) => {
				const region = this.getRegion(landscape, neighbor);
				if (!region.length) return;
				region.forEach(([i, j]) => {
					landscape[i][j] = true;
				});

				regions.push(region);
				// this.draw(landscape);
			});
		});
		return regions.reduce((a, b) => a.concat(b)).length;
	}

	getRegion(landscape, coords) {
		if (landscape[coords[0]][coords[1]]) return [];
		const visited = [coords];
		const coordInArr = ([i, j], arr) => arr.some(([ai, aj]) => ai === i && aj === j);
		for (let current = [coords]; current.length;) {
			const next = current
				.map(([l, j]) => [[l + 1, j], [l - 1, j], [l, j - 1], [l, j + 1]])
				.reduce((a, b) => a.concat(b))
				.filter(([i, j], q, arr) => {
					if (!(i in landscape && j in landscape[i])) return false;
					if (landscape[i][j]) return false;
					if (coordInArr([i, j], arr.slice(0, q))) return false;
					if (coordInArr([i, j], visited)) return false;
					return true;
				});
			visited.push(...next);
			current = next;
		}
		return visited;
	}

	draw(landscape) {
		const str = landscape.map((line) => line.map((p) => (p ? '#' : '.')).join('')).join('\n');
		console.log(str + '\n');
	}
};
