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

	applyMask2(number, mask) {
		const le = number.toString(2).split('').reverse();
		const reversedMask = mask.slice().reverse();
		const masked = reversedMask.map((e, i) => (e === '0' ? (le[i] || e) : e)).reverse().join('');
		return masked;
	}

	addToMem(key, val) {
		this.mem2 = this.mem2.map((entry) => {
			const oKey = this.getOverlapKey(key, entry.key);
			// if (oKey === entry.key) return [];
			if (oKey) {
				return [entry].concat({ key: oKey, val: -entry.val });
			}
			return [entry];
		}).reduce((a, b) => a.concat(b), []);
		this.mem2.push({ key, val });
	}

	getOverlapKey(key1, key2) {
		let oKey = 'r';
		for (let i = 1; i < key1.length; i++) {
			const [a, b] = [key1[i], key2[i]];
			if (a === b) oKey += a;
			else if (a === 'X') oKey += b;
			else if (b === 'X') oKey += a;
			else return null;
		}
		return oKey;
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
		this.mem2 = [];
		let currentMask;
		this.instructions.forEach((inst) => {
			if (inst.type === 'mask') currentMask = inst.mask;
			if (inst.type === 'mem') this.addToMem('r' + this.applyMask2(inst.reg, currentMask), inst.val);
		});
		return this.mem2.map(({ val, key }) => {
			const pow = key.split('').filter((l) => l === 'X').length;
			return val * (2 ** pow);
		}).reduce((a, b) => a + b);
	}
};
