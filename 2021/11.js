const { test, input } = require('./11.input');

class Octopi {
	constructor(str) {
		this.oc = str.split('\n').map((l) => l.split('').map((d) => +d));
		this.steps = 0;
		this.flashes = 0;
	}

	step() {
		this.oc = this.oc.map((line) => line.map((octopus) => octopus + 1));
		this.oc.map((line, i) => line.map((_, j) => this.checkFlash(([i, j]))));
		this.steps++;
	}

	checkFlash([x, y]) {
		if (this.oc[x][y] !== 0 && this.oc[x][y] > 9) {
			this.flashes++;
			this.oc[x][y] = 0;
			for (let u = x - 1; u <= x + 1; u++) {
				for (let v = y - 1; v <= y + 1; v++) {
					if (u in this.oc && v in this.oc[u] && this.oc[u][v] !== 0) {
						this.oc[u][v]++;
						this.checkFlash([u, v]);
					}
				}
			}
		}
	}

	solvePart1() {
		while (this.steps < 100) this.step();
		return this.flashes;
	}

	solvePart2() {
		const nOctopi = this.oc.map((l) => l.length).reduce((a, b) => a + b);
		let lastFlashes = this.flashes;
		while (this.flashes - lastFlashes < nOctopi) {
			lastFlashes = this.flashes;
			this.step();
		}
		return this.steps;
	}

	toString() {
		return this.oc.map((l) => l.map((d) => (d !== 0 ? d : `\x1b[1m${d}\x1b[0m`)).join('')).join('\n');
	}
}

const testopi = new Octopi(test);

console.log(testopi.toString() + '\n');
console.log(testopi.solvePart2());
console.log(testopi.toString());

const octopi = new Octopi(input);

console.log(octopi.toString() + '\n');
console.log(octopi.solvePart2());
console.log(octopi.toString());
