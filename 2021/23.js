// =============================  Advent of Code  =============================
// Solution Day 23 of 2021
// See https://adventofcode.com/2021/day/23

// #############
// #89.a.b.c.de#
// ###1#3#5#7###
//   #0#2#4#6#
//   #########
const mask = '#############\n#89.a.b.c.de#\n###1#3#5#7###\n  #0#2#4#6#\n  #########';

// #############
// #gh.i.j.k.lm#
// ###3#7#b#f###
//   #2#6#a#e#
//   #1#5#9#d#
//   #0#4#8#c#
//   #########
const maskBig = '#############\n#gh.i.j.k.lm#\n###3#7#b#f###\n  #2#6#a#e#\n  #1#5#9#d#\n  #0#4#8#c#\n  #########';

// ABCD
// 0123

const { readFileSync } = require('fs');

const testCase = readFileSync('./23.testcase').toString().trim();
const input = readFileSync('./23.input').toString().trim();

class Amphipod {
	constructor({
		pos,
		color,
		finished,
		energy,
		familySize,
	}) {
		Object.assign(this, {
			pos,
			color,
			finished,
			energy,
			familySize,
		});
	}

	getMoveEnergy(target) {
		const burrow = Math.min(this.pos, target);
		const burrowSteps = this.familySize - (burrow % this.familySize);

		const hall = Math.max(this.pos, target);
		const entry = Math.floor(burrow / this.familySize) + this.familySize * 4 + 2;
		const hallSteps = (hall < entry ? 2 * (entry - hall) - 1 : 2 * (hall - entry) + 1)
			+ (hall === this.familySize * 4 || hall === this.familySize * 4 + 6 ? -1 : 0);

		const unitCost = 10 ** this.color;
		return (burrowSteps + hallSteps) * unitCost;
	}

	moveTo(target) {
		this.energy += this.getMoveEnergy(target);
		this.finished = target < this.familySize * 4;
		this.pos = target;
		return this;
	}
}

class AmphipodCaveState {
	constructor({ pods, steps }) {
		// care, deep copy!!
		this.steps = steps || 0;
		this.pods = pods.map((p) => new Amphipod(p));
	}

	getMinEnergy(mem = {}) {
		const isMemStep = this.steps % 2 === 0;
		const memKey = isMemStep ? [
			this.steps,
			this.pods.reduce((a, p) => a + p.energy, 0),
			this.pods.slice()
				.sort((a, b) => (a.color !== b.color ? a.color - b.color : a.pos - b.pos))
				.map((p) => p.pos)
				.join('-'),
		].join('_') : null;
		if (isMemStep) {
			if (mem[memKey]) return mem[memKey];
		}
		if (this.pods.every((p) => p.finished)) return this.pods.reduce((a, p) => a + p.energy, 0);
		const moves = this.getMoves();
		if (moves.every((m) => m.length === 0)) return Infinity;
		const caveCosts = moves.map((podMoves, i) => {
			const podCosts = podMoves.map((target) => {
				const searchCave = new AmphipodCaveState(this);
				searchCave.movePodAt(i, target);
				return searchCave.getMinEnergy(mem);
			});
			return Math.min(...podCosts);
		});
		if (isMemStep) {
			mem[memKey] = Math.min(...caveCosts); // eslint-disable-line no-param-reassign
		}
		return Math.min(...caveCosts);
	}

	movePodAt(podIndex, target) {
		this.steps++;
		this.pods[podIndex].moveTo(target);
	}

	getMoves() {
		return this.pods.map((pod) => {
			const bPods = this.pods.filter((p) => p !== pod);
			const moves = [];
			const famSize = pod.familySize;
			if (pod.finished) return moves;
			if (pod.pos < this.pods.length) {
				// legal moves coming out of burrow
				if (
					bPods.some((b) => Math.floor(b.pos / famSize) === Math.floor(pod.pos / famSize)
						&& b.pos > pod.pos)
				) return moves;
				const entry = Math.floor(pod.pos / famSize) + 2 + this.pods.length;
				for (let i = entry - 1; i >= this.pods.length; i--) {
					if (bPods.some((b) => b.pos === i)) break;
					moves.push(i);
				}
				for (let i = entry; i <= this.pods.length + 6; i++) {
					if (bPods.some((b) => b.pos === i)) break;
					moves.push(i);
				}
			} else {
				// legal move going into burrow
				const burrowPods = bPods.filter((b) => (Math.floor(b.pos / famSize) === pod.color));
				if (burrowPods.some((b) => b.color !== pod.color)) return moves;
				const entry = pod.color + 2 + this.pods.length;
				if (pod.pos < entry) {
					for (let i = pod.pos + 1; i < entry; i++) {
						if (bPods.some((b) => b.pos === i)) return moves;
					}
				} else {
					for (let i = pod.pos - 1; i >= entry; i--) {
						if (bPods.some((b) => b.pos === i)) return moves;
					}
				}
				moves.push(pod.color * famSize + burrowPods.length);
			}
			return moves;
		});
	}

	toString() {
		let out = this.pods.length > 8 ? maskBig : mask;
		'0123456789abcdefghijklm'.split('')
			.forEach((l, i) => {
				const a = this.pods.find((p) => p.pos === i);
				out = out.replace(l, a ? 'ABCD'[a.color] : '.');
			});
		return out;
	}
}

class AmphipodCaveSolver {
	constructor(str) {
		this.mask = str.split('\n').length > 5 ? maskBig : mask;
		this.startingPods = '0123456789abcdefghijklm'
			.split('')
			.map((l) => this.mask.indexOf(l))
			.filter((i) => i !== -1)
			.map((d) => str[d])
			.map((l, i) => (l !== '.' ? { color: 'ABCD'.indexOf(l), pos: i } : null))
			.filter(Boolean)
			.map((a, _, arr) => new Amphipod({
				...a,
				energy: 0,
				familySize: arr.length / 4,
				finished: a.pos < arr.length
					&& Math.floor(a.pos / (arr.length / 4)) === a.color
					&& new Array(a.pos % (arr.length / 4)).fill('')
						.every((__, i) => arr.find((p) => p.pos === a.pos - i - 1 && p.color === a.color)),
			}));
		if (
			this.startingPods.reduce((a, p) => a.map((e, i) => (i === p.color ? e + 1 : e)), [0, 0, 0, 0])
				.some((e, i, arr) => arr.indexOf(e) !== 0)
		) throw new Error('Bad Input!');
		this.cave = new AmphipodCaveState({ pods: this.startingPods });
	}

	solvePart1() {
		return this.cave.getMinEnergy();
	}

	solvePart2() {
		return this.cave.getMoves();
	}
}

const testAmphipodCaveSolver = new AmphipodCaveSolver(testCase);
const beforeTest = Date.now();
console.log(testAmphipodCaveSolver.solvePart1());
console.log((Date.now() - beforeTest) + ' ms');

const inputAmphipodCaveSolver = new AmphipodCaveSolver(input);
const before = Date.now();
console.log(inputAmphipodCaveSolver.solvePart1());
console.log((Date.now() - before) + ' ms');
// console.log(inputAmphipodCaveSolver.solvePart2());
