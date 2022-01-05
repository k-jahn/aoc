// =============================  Advent of Code  =============================
// Solution Day 24 of 2021
// See https://adventofcode.com/2021/day/24

const { readFileSync } = require('fs');

const testCase = readFileSync('./24.testcase').toString().trim();
const input = readFileSync('./24.input').toString().trim();

class ArithmeticLogicUnit {
	constructor(str, programInput = []) {
		this.rawProgram = {
			instructions: str.split('\n')
				.map((l) => {
					const [_, cmd, work, inp] = l.match(/(...) (.)(?: (-?[0-9]+|[wxyz]))?/);
					const out = {
						cmd,
						work: 'wxyz'.indexOf(work),
					};
					if (inp !== undefined) {
						out.isInpFix = /-?[0-9]+/.test(inp);
						out.inp = out.isInpFix ? +inp : 'wxyz'.indexOf(inp);
					}
					return out;
				}),
		};
		this.rawProgram.inpMask = new Array(this.rawProgram.instructions.filter((inst) => inst.cmd === 'inp').length).fill(true);
		this.optimizedProgram = this.optimize(this.rawProgram);
		this.ram = [0, 0, 0, 0];
		this.modelIndex = 9 ** 14;
		this.programInput = programInput;
	}

	run(program = this.rawProgram, inputArr = this.programInput) {
		const runningInstructions = [...program.instructions];
		const runningInput = inputArr.filter((_, i) => program.inpMask[i]);
		this.ram = [0, 0, 0, 0];
		while (runningInstructions.length) this.step(runningInstructions, runningInput);
		return this;
	}

	step(instructions, inpArr) {
		const instruction = instructions.shift();
		// console.log('\n', program.length);
		// process.stdout.write(JSON.stringify(instruction) + ' ' + JSON.stringify(this.ram) + ' ');
		if (instruction.cmd === 'inp') {
			this.ram[instruction.work] = inpArr.shift();
		} else if (instruction.cmd === 'ini') {
			this.ram[instruction.work] = instruction.inp;
		} else {
			const inp = instruction.isInpFix ? instruction.inp : this.ram[instruction.inp];
			this.ram[instruction.work] = this.performOp(
				instruction.cmd,
				this.ram[instruction.work],
				inp,
			);
		}
		// console.log(this.ram);
	}

	performOp(cmd, w, i) {
		switch (cmd) {
			case 'add':
				return w + i;
			case 'mul':
				return w * i;
			case 'div':
				return Math.floor(w / i);
			case 'mod':
				return w % i;
			case 'eql':
				return i === w ? 1 : 0;
			default:
				throw new Error('bad instruction');
		}
	}

	optimize(program) {
		let out = JSON.parse(JSON.stringify(program)); // deep copy
		out = this.optimizeAssignments(out);
		out = this.optimizeRemoveRedundant(out);
		out = this.optimizeRemoveFixedCalc(out);
		out = this.optimizeRemoveIrrelevant(out);
		return out;
	}

	optimizeAssignments({ instructions, inpMask }) {
		return {
			inpMask,
			instructions: instructions.map((step) => {
				if (
					(step.cmd === 'mul' && step.isInpFix === true && step.inp === 0)
					|| (step.cmd === 'mod' && step.isInpFix === false && step.inp === step.work)
				) {
					return {
						cmd: 'ini',
						work: step.work,
						inp: 0,
					};
				}
				if (
					(step.cmd === 'eql' && step.isInpFix === false && step.inp === step.work)
					|| (step.cmd === 'div' && step.isInpFix === false && step.inp === step.work)
				) {
					return {
						cmd: 'ini',
						work: step.work,
						inp: 1,
					};
				}
				return step;
			}),
		};
	}

	optimizeRemoveRedundant({ instructions, inpMask }) {
		return {
			inpMask,
			instructions: instructions.filter((step) => {
				if (step.isInpFix) {
					if (step.cmd === 'mul' && step.inp === 1) return false;
					if (step.cmd === 'div' && step.inp === 1) return false;
					if (step.cmd === 'add' && step.inp === 0) return false;
				}
				return true;
			}),
		};
	}

	optimizeRemoveFixedCalc({ instructions, inpMask }) {
		const modelRam = [
			{ fixed: true, val: 0 },
			{ fixed: true, val: 0 },
			{ fixed: true, val: 0 },
			{ fixed: true, val: 0 },
		];
		const optimizedInstructions = instructions.map((inst) => {
			const modelWork = modelRam[inst.work];
			if (inst.cmd === 'inp') {
				modelWork.fixed = false;
				modelWork.val = null;
				modelWork.possibleVal = [1, 2, 3, 4, 5, 6, 7, 8, 9];
				return [inst];
			}
			if (inst.cmd === 'ini') {
				modelWork.fixed = true;
				modelWork.val = inst.inp;
				return [];
			}
			if (modelWork.fixed) {
				if (inst.isInpFix) {
					modelWork.val = this.performOp(inst.cmd, modelWork.val, inst.inp);
					return [];
				}
				const modelInp = modelRam[inst.inp];
				if (modelInp.fixed) {
					modelWork.val = this.performOp(inst.cmd, modelWork.val, modelInp.val);
					return [];
				}
				const ini = {
					cmd: 'ini',
					work: inst.work,
					inp: modelWork.val,
				};
				modelWork.fixed = false;
				modelWork.val = null;
				return [
					ini,
					inst,
				];
			}

			if (inst.isInpFix) return [inst];
			const modelInp = modelRam[inst.inp];
			if (modelInp.fixed) {
				return {
					...inst,
					isInpFix: true,
					inp: modelInp.val,
				};
			}
			return [inst];
		}).reduce((a, b) => a.concat(b));
		const fixedInstructions = modelRam.map((v) => (v.fixed ? { cdm: 'ini', inp: v.val } : null))
			.filter(Boolean);
		return {
			inpMask,
			instructions: optimizedInstructions.concat(fixedInstructions),
		};
	}

	optimizeRemoveIrrelevant({ instructions }) {
		const optimizedMask = [];
		const relevant = [false, false, false, true];
		const optimzedInstructions = [...instructions]
			.reverse()
			.filter((inst) => {
				if (inst.cmd === 'inp') optimizedMask.push(relevant[inst.work]);

				if (!relevant[inst.work]) return false;

				if (inst.cmd === 'inp' || inst.cmd === 'ini') relevant[inst.work] = false;
				else if (!inst.isInpFix) relevant[inst.inp] = true;
				return true;
			})
			.reverse();
		return {
			instructions: optimzedInstructions,
			inpMask: optimizedMask,
		};
	}

	solvePart1() {
		class ModelNumberGenerator {
			constructor() {
				this.modelIndex = 9 ** 14;
			}

			next() {
				this.modelIndex--;
				return this;
			}

			get modelNoArr() {
				let nr = this.modelIndex;
				const model = [];
				for (let i = 0; i < 14; i++) {
					model.unshift((nr % 9) + 1);
					nr = Math.floor(nr / 9);
				}
				return model;
			}

			get modelNo() {
				return +this.modelNoArr.join('');
			}
		}

		const mng = new ModelNumberGenerator();
		this.ram[3] = 1;
		while (this.ram[3] !== 0) {
			mng.next();
			if ((mng.modelIndex % 200000) === 0) {
				console.log((100 - (mng.modelIndex * 100) / (9 ** 14)), mng.modelNo);
			}
			this.run(this.optimizedProgram, mng.modelNoArr);
		}
		return mng.modelNo;
	}

	solvePart2() {
		return this.str;
	}
}

const testArithmeticLogicUnit = new ArithmeticLogicUnit(testCase);
testArithmeticLogicUnit.run(testArithmeticLogicUnit.rawProgram, '13579246899999'.split('').map((d) => +d));
console.log(
// 	// testArithmeticLogicUnit.rawProgram,
	// testArithmeticLogicUnit.ram,
	// testArithmeticLogicUnit.rawProgram.instructions.length,
);
testArithmeticLogicUnit.run(testArithmeticLogicUnit.optimizedProgram, '13579246899999'.split('').map((d) => +d));
console.log(
	JSON.stringify(testArithmeticLogicUnit.optimizedProgram, null, 2),
	// testArithmeticLogicUnit.ram,
	// testArithmeticLogicUnit.optimizedProgram.instructions.length,
);
// console.log(testArithmeticLogicUnit.optimizedProgram);

// console.log(testArithmeticLogicUnit.solvePart2());

const inputArithmeticLogicUnit = new ArithmeticLogicUnit(input);
// console.log(inputArithmeticLogicUnit.solvePart1());
// console.log(inputArithmeticLogicUnit.solvePart2());
