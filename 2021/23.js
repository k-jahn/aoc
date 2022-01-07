// =============================  Advent of Code  =============================
// Solution Day 23 of 2021
// See https://adventofcode.com/2021/day/23

// #############
// #89.a.b.c.de#
// ###1#3#5#7###
//   #0#2#4#6#
//   #########
const mask = '#############\n#89.a.b.c.de#\n###1#3#5#7###\n  #0#2#4#6#\n  #########';

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
	}) {
		Object.assign(this, {
			pos,
			color,
			finished,
			energy,
		});
	}

	getMoveEnergy(target) {
		const burrow = Math.min(this.pos, target);
		const burrowSteps = 2 - (burrow % 2);

		const hall = Math.max(this.pos, target);
		const entry = Math.floor(burrow / 2) + 10;
		const hallSteps = (hall < entry ? 2 * (entry - hall) - 1 : 2 * (hall - entry) + 1)
			+ (hall === 8 || hall === 14 ? -1 : 0);

		const unitCost = 10 ** this.color;
		return (burrowSteps + hallSteps) * unitCost;
	}

	moveTo(target) {
		this.energy += this.getMoveEnergy(target);
		this.finished = target < 8;
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
			this.pods.map((p) => p.pos).join('-'),
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
			if (pod.finished) return moves;
			if (pod.pos < 8) {
				// legal moves coming out of burrow
				if (pod.pos % 2 === 0 && bPods.some((b) => b.pos === pod.pos + 1)) return moves;
				const entry = Math.floor(pod.pos / 2) + 10;
				for (let i = entry - 1; i >= 8; i--) {
					if (bPods.some((b) => b.pos === i)) break;
					moves.push(i);
				}
				for (let i = entry; i <= 14; i++) {
					if (bPods.some((b) => b.pos === i)) break;
					moves.push(i);
				}
			} else {
				// legal move going into burrow
				const firstPod = bPods.find((b) => (b.pos === pod.color * 2));
				if (firstPod && firstPod.color !== pod.color) return moves;
				const entry = pod.color + 10;
				if (pod.pos < entry) {
					for (let i = pod.pos + 1; i < entry; i++) {
						if (bPods.some((b) => b.pos === i)) return moves;
					}
				} else {
					for (let i = pod.pos - 1; i >= entry; i--) {
						if (bPods.some((b) => b.pos === i)) return moves;
					}
				}
				moves.push(pod.color * 2 + (firstPod ? 1 : 0));
			}
			return moves;
		});
	}

	toString() {
		let out = mask;
		'0123456789abcde'.split('')
			.forEach((l, i) => {
				const a = this.pods.find((p) => p.pos === i);
				out = out.replace(l, a ? 'ABCD'[a.color] : '.');
			});
		return out;
	}
}

class AmphipodCaveSolver {
	constructor(str) {
		this.startingPods = '0123456789abcde'.split('')
			.map((l) => mask.indexOf(l))
			.map((d) => str[d])
			.map((l, i) => (l !== '.' ? { color: 'ABCD'.indexOf(l), pos: i } : null))
			.filter(Boolean)
			.map((a, _, arr) => new Amphipod({
				...a,
				energy: 0,
				finished: Math.floor(a.pos / 2) === a.color
					&& (!(a.pos % 2) || arr.every((b) => b.pos !== a.pos - 1 || b.color === a.color)),
			}));
		if (this.startingPods.length !== 8
			|| this.startingPods
				.reduce((a, p) => a.map((e, i) => (i === p.color ? e + 1 : e)), [0, 0, 0, 0])
				.some((e) => e !== 2)
		) throw new Error('Bad Input!');
		this.cave = new AmphipodCaveState({ pods: this.startingPods });
	}

	solvePart1() {
		return this.cave.getMinEnergy();
	}

	solvePart2() {
		return this;
	}
}

const testAmphipodCaveSolver = new AmphipodCaveSolver(testCase);
console.log(testAmphipodCaveSolver.solvePart1());
// console.log(testAmphipodCaveSolver.solvePart2());

const inputAmphipodCaveSolver = new AmphipodCaveSolver(input);
const before = Date.now();
console.log(inputAmphipodCaveSolver.solvePart1());
console.log((Date.now() - before) + ' ms');
// console.log(inputAmphipodCaveSolver.solvePart2());
