// =============================  Advent of Code  =============================
// Solution Day 14 of 2020
// See https://adventofcode.com/2020/day/14

module.exports = class DockingData {
	constructor(str) {
		this.instructions = str.split('\n')
			.map((l) => {
				const [_, type] = l.match(/^([a-z]*)/);
				const out = { type };
				if (type === 'mem') {
					const [__, reg, val] = l.match(/\[(\d+)\] = (\d+)/);
					out.reg = +reg;
					out.val = +val;
				} else {
					const [__, maskStr] = l.match(/mask = ([01X]*)/);
					out.mask = maskStr.split('');
				}
				return out;
			});
		this.mem = {};
	}

	applyMask(number, mask) {
		const le = number.toString(2).split('').reverse();
		const reversedMask = mask.slice().reverse();
		const masked = reversedMask.map((e, i) => (e === 'X' ? le[i] || '0' : e)).reverse().join('');
		return parseInt(masked, 2);
	}

	solvePart1() {
		this.mem = {};
		let currentMask;
		this.instructions.forEach((inst) => {
			if (inst.type === 'mask') currentMask = inst.mask;
			if (inst.type === 'mem') this.mem['r' + inst.reg] = this.applyMask(inst.val, currentMask);
		});
		return Object.values(this.mem)
			.reduce((a, b) => a + b, 0);
	}

	solvePart2() {
		return this;
	}
};
