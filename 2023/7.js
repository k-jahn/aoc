// =============================  Advent of Code  =============================
// Solution Day 7 of 2023
// See https://adventofcode.com/2023/day/7

module.exports = class CamelCards {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.hands = str.split('\n')
			.map((line) => {
				const [cards, bid] = line.split(' ');
				return {
					cards: cards.split(''),
					bid: +bid,
				};
			});
	}

	getType(cards) {
		const sorted = cards.slice().sort().join('');
		if (/(.)\1{4}/.test(sorted)) return 6;
		if (/(.)\1{3}/.test(sorted)) return 5;
		if (/^(.)\1{1,2}(.)\2{1,2}$/.test(sorted)) return 4;
		if (/(.)\1\1/.test(sorted)) return 3;
		if (/(.)\1.?(.)\2/.test(sorted)) return 2;
		if (/(.)\1/.test(sorted)) return 1;
		return 0;
	}

	getType2(cards) {
		if (cards.join('') === 'JJJJJ') return 6;
		if (cards.every((card) => card !== 'J')) return this.getType(cards);
		const cardTypes = Array.from(new Set(cards)).filter((t) => t !== 'J');
		const handTypes = cardTypes.map((t) => this.getType(cards.map((c) => (c === 'J' ? t : c))));
		return Math.max(...handTypes);
	}

	getVal(card) {
		return 'AKQJT98765432'.split('').reverse().join('').indexOf(card);
	}

	getVal2(card) {
		return 'AKQT98765432J'.split('').reverse().join('').indexOf(card);
	}

	compareHands(a, b) {
		const [typeA, typeB] = [a, b].map((h) => this.getType(h.cards));
		if (typeA !== typeB) return typeA - typeB;
		for (let i = 0; i < 5; i++) {
			const [cardA, cardB] = [a, b].map((h) => this.getVal(h.cards[i]));
			if (cardA !== cardB) return cardA - cardB;
		}
		return 0;
	}

	compareHands2(a, b) {
		const [typeA, typeB] = [a, b].map((h) => this.getType2(h.cards));
		if (typeA !== typeB) return typeA - typeB;
		for (let i = 0; i < 5; i++) {
			const [cardA, cardB] = [a, b].map((h) => this.getVal2(h.cards[i]));
			if (cardA !== cardB) return cardA - cardB;
		}
		return 0;
	}

	solvePart1() {
		return this.hands
			.slice()
			.sort((a, b) => this.compareHands(a, b))
			.map((hand, i) => hand.bid * (i + 1))
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		return this.hands
			.slice()
			.sort((a, b) => this.compareHands2(a, b))
			.map((hand, i) => hand.bid * (i + 1))
			.reduce((a, b) => a + b);
	}
};
