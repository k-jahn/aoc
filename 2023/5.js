/* eslint-disable no-loop-func */
// =============================  Advent of Code  =============================
// Solution Day 5 of 2023
// See https://adventofcode.com/2023/day/5

// class Range {
// 	constructor(from, to) {
// 		if (typeof from !== 'number') throw new Error('arg');
// 		if (from >= to) throw new Error('Bad Range');
// 		this.from = from;
// 		this.to = to;
// 	}

// 	getIntersection(range) {
// 		const [intFrom, intTo] = [Math.max(this.from, range.from), Math.min(this.to, range.to)];
// 		return intFrom < intTo ? new Range(intFrom, intTo) : null;
// 	}

// 	getShifted(offset) {
// 		return new Range(this.from + offset, this.to + offset);
// 	}

// 	getJoined(range) {
// 		return new Range(Math.min(this.from, range.from), Math.max(this.to, range.to));
// 	}

// 	// gets the part(s) not covered by passed range
// 	getRemainders(range) {
// 		const intersection = range.getIntersection(this);
// 		if (!intersection) return [new Range(this.from, this.to)];
// 		const remainders = [];
// 		if (intersection.from !== this.from) {
// 			remainders.push(new Range(this.from, intersection.from - 1));
// 		}
// 		if (intersection.to !== this.to) {
// 			remainders.push(new Range(intersection.to + 1, this.to));
// 		}
// 		return remainders;
// 	}

// 	getTotalRemainders(ranges) {
// 		const joined = Range.joinRanges(ranges);
// 		return joined.reduce((acc, range) => {
// 			const last = acc[acc.length - 1];
// 			return [...acc.slice(0, acc.length - 1), ...last.getRemainders(range)];
// 		}, [this]);
// 	}

// 	// static
// 	static joinRanges(ranges) {
// 		const sorted = [...ranges].sort((a, b) => a.from - b.from);
// 		const out = [];
// 		for (let i = 0, j = 0; i < sorted.length; i += j) {
// 			j = i + 1;
// 			while (j in sorted && sorted[i].to + 1 >= sorted[j].from) j++;
// 			const joined = new Range(sorted[i].from, Math.max(...sorted.slice(i, j).map((r) => r.to)));
// 			out.push(joined);
// 		}
// 		return out;
// 	}
// }

// class MapRule {
// 	constructor(from, to, offset) {
// 		this.range = new Range(from, to);
// 		this.offset = offset;
// 	}

// 	apply(ranges) {
// 		return ranges.reduce((acc, range) => {
// 			const intersection = this.range.getIntersection(range);
// 			if (!intersection) {
// 				return {
// 					remainders: [...acc.remainders, range],
// 					mapped: acc.mapped,
// 				};
// 			}
// 			return {
// 				remainders: [...acc.remainders, ...range.getRemainders(intersection)],
// 				mapped: [...acc.mapped, intersection.getShifted(this.offset)],
// 			};
// 		}, { remainders: [], mapped: [] });
// 	}
// }

// class Map {
// 	constructor(mapStr) {
// 		const [header, ...lines] = mapStr.split('\n');
// 		const [_1, source, destination] = header.match(/([a-z]+)-to-([a-z]+)/);
// 		this.source = source;
// 		this.destination = destination;
// 		this.rules = lines.map((line) => {
// 			const [destStr, sourceStr, l] = line.match(/\d+/g);
// 			return new MapRule(+sourceStr, +sourceStr + (+l), +destStr - (+sourceStr));
// 		});
// 	}

// 	apply(ranges) {
// 		const {
// 			remainders: finalRemainders,
// 			mapped: finalMapped,
// 		} = this.rules.reduce((acc, rule) => {
// 			const { remainders, mapped } = rule.apply(acc.remainders);
// 			return {
// 				remainders,
// 				mapped: [...acc.mapped, ...mapped],
// 			};
// 		}, { remainders: [...ranges], mapped: [] });
// 		return Range.joinRanges([...finalRemainders, ...finalMapped]);
// 	}
// }

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

		// part 2
		// this.maps2 = mapStrings.map((mapStr) => new Map(mapStr));
		// this.seeds2 = this.seeds
		// 	.reduce((acc, val, i, arr) => {
		// 		if (i % 2) return acc;
		// 		return acc.concat([new Range(val, val + arr[i + 1])]);
		// 	}, []);
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
		const rangeMins = this.seeds.map((from, j, arr) => {
			if (j % 2) return Infinity;
			const length = arr[j + 1];
			let min = Infinity;
			for (let i = 0; i < length; i += blockSize) {
				console.log(`range ${(j / 2) + 1}/${arr.length / 2}, ${((100 * (i)) / length).toFixed(2)}%, min: ${min}`);
				const blockLength = Math.min(blockSize, length - i);
				let currentVals = new Array(blockLength).fill(0).map((_, k) => k + i + from);
				let currentId = 'seed';
				let currentMap;
				while (currentId !== 'location') {
					currentMap = this.maps.find((map) => map.source === currentId);
					currentVals = currentVals.map((val) => {
						const transformer = currentMap.transformers
							.find((r) => (r.source <= val && val < r.length + r.source));
						if (transformer) return val + transformer.destination - transformer.source;
						return val;
					});
					currentId = currentMap.destination;
				}
				min = currentVals.reduce((a, b) => Math.min(a, b), min);
			}
			return min;
		});
		return Math.min(...rangeMins);
	}

	// doesnt work
	// solvePart2() {
	// 	let currentId = 'seed';
	// 	let currentRanges = [...this.seeds2];
	// 	console.log(currentRanges)
	// 	while (currentId !== 'location') {
	// 		const currentMap = this.maps2.find((map) => map.source === currentId);
	// 		console.log(JSON.stringify(currentMap, null, 2));
	// 		currentRanges = currentMap.apply(currentRanges);
	// 		console.log(currentRanges)
	// 		currentId = currentMap.destination;
	// 	}
	// 	return Math.min(...currentRanges.map((range) => range.from));
	// }
};
