// =============================  Advent of Code  =============================
// Solution Day 7 of 2020
// See https://adventofcode.com/2020/day/7

module.exports = class Haversacks {
	constructor(str) {
		this.bags = str.split('\n')
			.map((l) => {
				const [name, contentStr] = l.split(' contain ');

				const contents = contentStr === 'no other bags.'
					? []
					: contentStr.split(', ')
						.map((content) => {
							const [_, quantity, cName] = content.match(/^(\d+) (.*?)s?\.?$/);
							return { quantity: +quantity, name: cName };
						});
				return { name: name.slice(0, -1), contents };
			}, {});
	}

	canBagContain(bag, targetName) {
		return bag.contents.some((content) => {
			const cBag = this.bags.find((b) => b.name === content.name);
			return cBag.name === targetName || this.canBagContain(cBag, targetName);
		});
	}

	bagContentCounter(bag) {
		return bag.contents.map((content) => {
			const cBag = this.bags.find((b) => b.name === content.name);
			return content.quantity * (1 + this.bagContentCounter(cBag));
		}).reduce((a, b) => a + b, 0);
	}

	solvePart1() {
		// return this.bags[3];
		return this.bags.filter((bag) => this.canBagContain(bag, 'shiny gold bag')).length;
	}

	solvePart2() {
		const shinyGoldBag = this.bags.find((b) => b.name === 'shiny gold bag');
		return this.bagContentCounter(shinyGoldBag);
	}
};
