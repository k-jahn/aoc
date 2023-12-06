/* eslint-disable no-loop-func */
// =============================  Advent of Code  =============================
// Solution Day 5 of 2023
// See https://adventofcode.com/2023/day/5

module.exports = class IfYouGiveASeedAFertilizer {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		const [seedStr, ...mapStrings] = str.split('\n\n');
		const [...seedStrs] = seedStr.match(/\d+/g);
		this.seeds = seedStrs.map((s) => +s);
		this.maps = mapStrings.map((mapStr) => {
			const [header, ...lines] = mapStr.split('\n');
			const [_1, source, destination] = header.match(/([a-z]+)-to-([a-z]+)/);
			const transformers = lines.map((line) => {
				const [destStr, sourceStr, l] = line.match(/\d+/g);
				return {
					source: +sourceStr,
					destination: +destStr,
					length: +l,
				};
			});
			return {
				source,
				destination,
				transformers,
			};
		});
	}

	solvePart1() {
		let currentId = 'seed';
		let currentVals = [...this.seeds];
		while (currentId !== 'location') {
			const currentMap = this.maps.find((map) => map.source === currentId);
			currentVals = currentVals.map((val) => {
				const transformer = currentMap.transformers
					.find((r) => (r.source <= val && val < r.length + r.source));
				if (transformer) return val + transformer.destination - transformer.source;
				return val;
			});
			currentId = currentMap.destination;
		}
		return Math.min(...currentVals);
	}

	solvePart2Brute() {
		const blockSize = 2000 ** 2;
		const ranges = this.seeds
			.reduce((acc, _, i, arr) => (i % 2 ? acc : [...acc, arr.slice(i, i + 2)]), []);

		const masterMapper = (() => {
			let currentId = 'seed';
			const sortedMaps = [];
			while (currentId !== 'location') {
				const currentMap = this.maps.find((map) => map.source === currentId);
				sortedMaps.push(currentMap);
				currentId = currentMap.destination;
			}
			const mapFuncs = sortedMaps.map((map) => {
				const f = (val) => {
					for (let i = 0; i < map.transformers.length; i++) {
						const transformer = map.transformers[i];
						if (val >= transformer.source && val - transformer.source < transformer.length) {
							return val + transformer.destination - transformer.source;
						}
					}
					return val;
				};
				return f;
			});
			return (val) => mapFuncs.reduce((acc, func) => func(acc), val);
		})();

		const rangeMins = ranges.map(([from, length], j) => {
			let min = Infinity;
			for (let i = 0; i < length; i += blockSize) {
				console.log(`range ${j + 1}/${ranges.length}, ${((100 * (i)) / length).toFixed(2)}%, min: ${min}`);
				const blockLength = Math.min(blockSize, length - i);
				const currentVals = new Array(blockLength).fill(0).map((_, k) => k + i + from);
				min = currentVals.map((val) => masterMapper(val))
					.reduce((a, b) => Math.min(a, b), min);
			}
			return min;
		});
		return Math.min(...rangeMins);
	}
};
