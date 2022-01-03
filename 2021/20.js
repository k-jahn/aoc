// =============================  Advent of Code  =============================
// Solution Day 20 of 2021
// See https://adventofcode.com/2021/day/20

const { testCase } = require('./20.testcase');
const { input } = require('./20.input');

class TrenchImage {
	constructor(str) {
		const [enhancementStr, imgStr] = str.split('\n\n');
		this.enhancementAlg = enhancementStr.split('').map((e) => e === '#');
		this.img = imgStr.split('\n')
			.map((l) => l.split('').map((e) => e === '#'));
		this.infColor = false;
		this.steps = 0;
	}

	padImg() {
		let paddedImg = [...this.img];
		if (paddedImg[0].some((p) => p !== this.infColor)) {
			paddedImg = [new Array(paddedImg[0].length).fill(this.infColor)].concat(paddedImg);
		}
		if (paddedImg[paddedImg.length - 1].some((p) => p !== this.infColor)) {
			paddedImg = paddedImg
				.concat([new Array(paddedImg[paddedImg.length - 1].length).fill(this.infColor)]);
		}
		if (paddedImg.some((l) => l[0] !== this.infColor)) {
			paddedImg = paddedImg.map((l) => [this.infColor].concat(l));
		}
		if (paddedImg.some((l) => l[l.length - 1] !== this.infColor)) {
			paddedImg = paddedImg.map((l) => l.concat([this.infColor]));
		}
		this.img = paddedImg;
		return this;
	}

	enhance() {
		this.padImg();
		this.img = this.img
			.map((l, i) => l.map((p, j) => this.enhancePixel([i, j])));
		this.infColor = this.enhancementAlg[this.infColor ? 511 : 0];
		this.steps++;
		return this;
	}

	enhancePixel([x, y]) {
		let ieStr = '';
		for (let u = x - 1; u <= x + 1; u++) {
			for (let v = y - 1; v <= y + 1; v++) {
				if (u in this.img && v in this.img[u]) ieStr += this.img[u][v] ? '1' : '0';
				else ieStr += this.infColor ? '1' : '0';
			}
		}
		return this.enhancementAlg[parseInt(ieStr, 2)];
	}

	get count() {
		return this.img
			.map((l) => l.reduce((a, e) => (e ? a + 1 : a), 0))
			.reduce((a, b) => a + b);
	}

	solvePart1() {
		while (this.steps < 2) this.enhance();
		return this.count;
	}

	solvePart2() {
		while (this.steps < 50) this.enhance();
		return this.count;
	}

	toString() {
		return this.img.map((l) => l.map((p) => (p ? '#' : '.')).join('')).join('\n');
	}
}

const testTrenchImage = new TrenchImage(testCase);
// console.log(
// 	testTrenchImage.toString(),
// 	'\n\n',
// 	testTrenchImage.enhance().toString(),
// 	'\n\n',
// 	testTrenchImage.enhance().toString(),
// );
console.log(testTrenchImage.solvePart2());

const inputTrenchImage = new TrenchImage(input);
// console.log(inputTrenchImage.enhance().enhance().toString());
// console.log(inputTrenchImage.solvePart1());
console.log(inputTrenchImage.solvePart2());
