// =============================  Advent of Code  =============================
// Solution Day 8 of 2020
// See https://adventofcode.com/2020/day/8

module.exports = class Handheld {
	constructor(str) {
		this.inst = str.split('\n')
			.map((l) => {
				const [_, cmd, n] = l.match(/^(...) ([+-]\d+)/);
				return { cmd, n: +n };
			});
	}

	solvePart1() {
		const runInst = this.inst.map((e) => ({ ...e, visited: false }));
		let acc = 0;
		for (let i = 0; !runInst[i].visited;) {
			if (i > runInst.length) throw new Error('No loop found');
			runInst[i].visited = true;
			const { cmd, n } = runInst[i];
			if (cmd === 'acc') acc += runInst[i].n;
			i += cmd === 'jmp' ? n : 1;
		}
		return acc;
	}

	solvePart2() {
		const runInstSet = this.inst.map((inst) => ({ ...inst, visited: false }))
			.reduce((a, inst, i, arr) => {
				if (/jmp|nop/.test(inst.cmd)) {
					a.push(arr.map((e, j) => (j === i ? { ...e, cmd: e.cmd === 'jmp' ? 'nop' : 'jmp' } : { ...e })));
				}
				return a;
			}, []);
		for (let j = 0; j < runInstSet.length; j++) {
			const runInst = runInstSet[j];
			let acc = 0;
			for (let i = 0; !runInst[i].visited;) {
				runInst[i].visited = true;
				const { cmd, n } = runInst[i];
				if (cmd === 'acc') acc += runInst[i].n;
				i += cmd === 'jmp' ? n : 1;
				if (i > runInst.length - 1) {
					return acc;
				}
			}
		}
		throw new Error('No fix found');
	}
};
