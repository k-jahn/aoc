// =============================  Advent of Code  =============================
// Solution Day 17 of 2020
// See https://adventofcode.com/2020/day/17

module.exports = class ConwayCubes {
	constructor(str) {
		this.vol = [
			str.split('\n')
				.map((l) => l.split('').map((d) => d === '#')),
		];
		this.volOffsets = [0, 0, 0];
		this.steps = 0;
	}

	// pads and trims (max 1 line per step)
	pad() {
		const [padZfront, tZf, padZback, tZb] = [0, 1, this.vol.length - 1, this.vol.length - 2]
			.map((s) => (s in this.vol ? this.vol[s].some((line) => line.some((cell) => cell)) : true));
		const [padYfront, tYf, padYback, tYb] = [0, 1, this.vol[0].length - 1, this.vol[0].length - 2]
			.map((s) => (s in this.vol[0]
				? this.vol.some((plane) => plane[s].some((cell) => cell))
				: true));
		const [padXfront, tXf, padXback, tXb] = [
			0, 1, this.vol[0][0].length - 1, this.vol[0][0].length - 2,
		].map((s) => (s in this.vol[0][0]
			? this.vol.some((plane) => plane.some((line) => line[s]))
			: true));

		const [trimZfront, trimZback] = [!padZfront && !tZf, !padZback && !tZb];
		const [trimYfront, trimYback] = [!padYfront && !tYf, !padYback && !tYb];
		const [trimXfront, trimXback] = [!padXfront && !tXf, !padXback && !tXb];

		const a = (l) => new Array(l).fill(null);
		const [l1, l2] = [this.vol[0].length, this.vol[0][0].length];
		let nextVol = (
			padZfront ? [a(l1).map(() => a(l2).fill(false))] : [])
			.concat(this.vol)
			.concat(padZback ? [a(l1).map(() => a(l2).fill(false))] : [])
			.map((plane) => (padYfront ? [a(l2).fill(false)] : [])
				.concat(plane)
				.concat(padYback ? [a(l2).fill(false)] : []))
			.map((plane) => plane.map((line) => (padXfront ? [false] : [])
				.concat(line)
				.concat((padXback ? [false] : []))));

		const t = (bool) => (bool ? 1 : 0);

		nextVol = nextVol
			.map((plane) => plane.map((line) => line.slice(t(trimXfront), line.length - t(trimXback)))
				.slice(t(trimYfront), plane.length - t(trimYback)))
			.slice(t(trimZfront), nextVol.length - t(trimZback));

		this.volOffsets[0] -= t(padZfront);
		this.volOffsets[1] -= t(padYfront);
		this.volOffsets[2] -= t(padXfront);

		this.volOffsets[0] += t(trimZfront);
		this.volOffsets[1] += t(trimYfront);
		this.volOffsets[2] += t(trimXfront);

		this.vol = nextVol;
	}

	getNeighborCount(z, y, x) {
		const neighbors = [];
		for (let u = z - 1; u <= z + 1; u++) {
			for (let v = y - 1; v <= y + 1; v++) {
				for (let w = x - 1; w <= x + 1; w++) {
					if (
						(u !== z || v !== y || w !== x)
						&& (u in this.vol && v in this.vol[u] && w in this.vol[u][v])
					) {
						neighbors.push(this.vol[u][v][w]);
					}
				}
			}
		}
		return neighbors.reduce((a, v) => (v ? a + 1 : a), 0);
	}

	step() {
		this.pad();

		const nextVol = this.vol.map((plane) => plane.map((line) => [...line]));
		for (let i = 0; i < this.vol.length; i++) {
			for (let j = 0; j < this.vol[i].length; j++) {
				for (let k = 0; k < this.vol[i][j].length; k++) {
					const alive = this.vol[i][j][k];
					const n = this.getNeighborCount(i, j, k);
					if (alive && (n !== 2 && n !== 3)) nextVol[i][j][k] = false;
					if (!alive && n === 3) nextVol[i][j][k] = true;
				}
			}
		}
		this.vol = nextVol;
		this.steps++;
	}

	cellsAlive() {
		return this.vol.map((plane) => plane.map((line) => line.reduce((a, e) => (e ? a + 1 : a), 0))
			.reduce((a, b) => a + b)).reduce((a, b) => a + b);
	}

	solvePart1() {
		while (this.steps < 6) this.step();
		this.pad();
		console.log(this.toString());
		return this.cellsAlive();
	}

	toString() {
		return this.vol.map((plane, i) => `z = ${i + this.volOffsets[0]}\n`
			+ plane
				.map((line) => line
					.map((cell) => (cell ? '#' : '.')).join('')).join('\n')).join('\n\n');
	}
};
