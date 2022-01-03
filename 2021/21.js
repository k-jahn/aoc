// =============================  Advent of Code  =============================
// Solution Day 21 of 2021
// See https://adventofcode.com/2021/day/21

const { testCase } = require('./21.testcase');
const { input } = require('./21.input');

class DeterministicGame {
	constructor(str) {
		this.players = str.split('\n')
			.map((l) => {
				const [_, n, position] = l.match(/^Player (\d+) starting position: (\d+)$/);
				return {
					position: +position,
					n,
					score: 0,
				};
			});
		[this.isUp] = this.players;
		class DeterministicDie {
			constructor() {
				this.rolls = 0;
			}

			roll() {
				return ((this.rolls++) % 100) + 1;
			}
		}
		this.die = new DeterministicDie();
	}

	move() {
		const dist = this.die.roll() + this.die.roll() + this.die.roll();
		this.isUp.position = ((this.isUp.position + dist - 1) % 10) + 1;
		this.isUp.score += this.isUp.position;
		this.isUp = this.players[(this.players.indexOf(this.isUp) + 1) % this.players.length];
		return this;
	}

	solvePart1() {
		while (this.players.every((p) => p.score < 1000)) this.move();
		return this.isUp.score * this.die.rolls;
	}
}

class DiracGame {
	constructor(str) {
		this.players = str.split('\n')
			.map((l) => {
				const [_, name, position] = l.match(/^(Player \d+) starting position: (\d+)$/);
				return {
					position: +position,
					name,
					score: 0,
				};
			});
		this.isUp = 0;
		this.weight = 1;

		class GameWorld {
			constructor(game) {
				Object.assign(this, game);
			}

			getWins() {
				return [
					{ dist: 3, n: 1 },
					{ dist: 4, n: 3 },
					{ dist: 5, n: 6 },
					{ dist: 6, n: 7 },
					{ dist: 7, n: 6 },
					{ dist: 8, n: 3 },
					{ dist: 9, n: 1 },
				]
					.map(({ dist, n }) => {
						const players = this.players.map((p) => ({ ...p }));
						players[this.isUp].position = ((players[this.isUp].position + dist - 1) % 10) + 1;
						players[this.isUp].score += players[this.isUp].position;
						const weight = this.weight * n;

						if (players[this.isUp].score >= 21) {
							const out = [0, 0];
							out[this.isUp] = weight;
							return out;
						}

						const isUp = (this.isUp + 1) % 2;

						return new GameWorld({
							...this,
							players,
							weight,
							isUp,
						}).getWins();
					})
					.reduce((acc, wins) => [acc[0] + wins[0], acc[1] + wins[1]]);
			}
		}
		this.world = new GameWorld({
			...this,
		});
	}

	solvePart2() {
		return Math.max(...this.world.getWins());
	}
}

const testDeter = new DeterministicGame(testCase);
console.log(testDeter.solvePart1());
// const testDirac = new DiracGame(testCase);
// console.log(testDirac.solvePart2());

// const inputDeter = new DeterministicGame(input);
// console.log(inputDeter.solvePart1());
const inputDirac = new DiracGame(input);
console.log(inputDirac.solvePart2());
