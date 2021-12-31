const { moves, boards } = require('./4in');
const tests = require('./4test');

class Board {
	constructor(vals) {
		if (!vals) throw new TypeError();
		this.values = vals;
		this.played = new Array(this.values.length).fill(new Array(this.values[0].length).fill(false));
		this.bingo = false;
	}

	play(number, turn) {
		if (this.bingo) return;
		for (let i = 0; i < this.values.length; i++) {
			for (let j = 0; j < this.values[0].length; j++) {
				const v = this.values[i][j];
				if (v === number) {
					this.played[i] = this.played[i].map((e, k) => (k === j ? true : e));
					this.bingo = this.checkBingo();
					if (this.bingo) {
						this.turn = turn;
						this.winValue = this.winValue(number);
					}
					return;
				}
			}
		}
	}

	checkBingo() {
		// lines
		if (this.played.some((l) => l.every((n) => n))) return true;
		// columns
		if (this.played[0].some((_, i) => this.played.every((l) => l[i]))) return true;
		return true;
	}

	winValue(number) {
		let sum = 0;
		for (let i = 0; i < this.values.length; i++) {
			for (let j = 0; j < this.values[0].length; j++) {
				sum += this.played[i][j] ? 0 : this.values[i][j];
			}
		}
		return sum * number;
	}
}

const boardObjs = boards.map((b) => new Board(b));

const solve = (mvs, brds) => {
	for (let i = 0; i < mvs.length; i++) {
		const move = mvs[i];
		for (let j = 0; j < brds.length; j++) {
			const board = brds[j];
			board.play(move, i);
		}
	}
	return boards.sort((a, b) => a.turn - b.turn);
};

console.log(solve(tests.moves, tests.boards.map((b) => new Board(b))));
console.log(solve(moves, boardObjs));
