// =============================  Advent of Code  =============================
// Solution Day 16 of 2021
// See https://adventofcode.com/2021/day/16

const { testCases } = require('./16.testcase');
const { input } = require('./16.input');

class PacketDecoder {
	constructor(str) {
		this.inputStream = str;
		this.binary = str.split('')
			.map((l) => ({
				0: '0000',
				1: '0001',
				2: '0010',
				3: '0011',
				4: '0100',
				5: '0101',
				6: '0110',
				7: '0111',
				8: '1000',
				9: '1001',
				A: '1010',
				B: '1011',
				C: '1100',
				D: '1101',
				E: '1110',
				F: '1111',
			}[l])).join('');
		this.packets = this.decode(this.binary);
	}

	decode(str) {
		if (!str || /^0+$/.test(str)) return [];
		const [version, typeId] = [str.slice(0, 3), str.slice(3, 6)].map((l) => parseInt(l, 2));
		const packet = { version, typeId };
		let siblings = [];
		if (typeId === 4) {
			for (let i = 0, getNext = true, dataStr = ''; getNext; i++) {
				const chunk = str.slice(6 + i * 5, 6 + (i + 1) * 5);
				const [control, dataChunk] = [chunk.slice(0, 1), chunk.slice(1)];
				dataStr += dataChunk;
				getNext = control === '1';
				if (!getNext) {
					packet.data = parseInt(dataStr, 2);
					siblings = this.decode(str.slice(6 + (i + 1) * 5));
				}
			}
		} else if (str[6] === '1') {
			const numberOfSubPackets = parseInt(str.slice(7, 18), 2);
			const following = this.decode(str.slice(18));
			packet.children = following.slice(0, numberOfSubPackets);
			siblings = following.slice(numberOfSubPackets);
		} else {
			const subPacketsStrLen = parseInt(str.slice(7, 22), 2);
			const [start, end] = [22, 22 + subPacketsStrLen];
			packet.children = this.decode(str.slice(start, end));
			siblings = this.decode(str.slice(end));
		}
		return [packet].concat(siblings);
	}

	getVersionSum(packets) {
		return packets
			? packets.reduce((a, p) => a + p.version + this.getVersionSum(p.children), 0)
			: 0;
	}

	getExpressionValue(packet) {
		const childValues = packet.children
			? packet.children.map((p) => this.getExpressionValue(p))
			: null;
		switch (packet.typeId) {
			case 0:
				return childValues.reduce((a, b) => a + b);
			case 1:
				return childValues.reduce((a, b) => a * b);
			case 2:
				return childValues.reduce((a, b) => Math.min(a, b));
			case 3:
				return childValues.reduce((a, b) => Math.max(a, b));
			case 4:
				return packet.data;
			case 5:
				return childValues.reduce((a, b) => (a > b ? 1 : 0));
			case 6:
				return childValues.reduce((a, b) => (a < b ? 1 : 0));
			case 7:
				return childValues.reduce((a, b) => (a === b ? 1 : 0));
			default:
				throw new Error();
		}
	}

	solvePart1() {
		return this.getVersionSum(this.packets);
	}

	solvePart2() {
		return this.getExpressionValue(this.packets[0]);
	}
}

const testPacketDecoders = testCases.map((t) => new PacketDecoder(t));
// testPacketDecoders.forEach((d) => console.log(d, '\n', JSON.stringify(d.solvePart1(), null, 2)));
testPacketDecoders.forEach((d) => console.log(d, '\n', d.solvePart2()));
// console.log(testPacketDecoder.solvePart2());

const inputPacketDecoder = new PacketDecoder(input);
console.log(inputPacketDecoder.solvePart1());
console.log(inputPacketDecoder.solvePart2());
