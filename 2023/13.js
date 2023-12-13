// =============================  Advent of Code  =============================
// Solution Day 13 of 2023
// See https://adventofcode.com/2023/day/13

module.exports = class PointOfIncidence {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.pictures = str.split('\n\n')
			.map((picStr) => picStr.split('\n').map((l) => l.split('').map((d) => d === '#')));
	}

	solvePart1(pictures = this.pictures) {
		const getHorz = (picture) => {
			for (let i = 1; i < picture.length; i++) {
				const min = Math.min(i, picture.length - i);
				let pass = true;
				for (let j = 0; j < min; j++) {
					const lower = picture[i - j - 1];
					const upper = picture[i + j];
					if (!lower.every((p, q) => p === upper[q])) {
						pass = false;
					}
				}
				if (pass) return i;
			}
			return 0;
		};
		const getVert = (picture) => {
			for (let i = 1; i < picture[0].length; i++) {
				const min = Math.min(i, picture[0].length - i);
				let pass = true;
				for (let j = 0; j < min; j++) {
					const lower = picture.map((line) => line[i - j - 1]);
					const upper = picture.map((line) => line[i + j]);
					if (!lower.every((p, q) => p === upper[q])) {
						pass = false;
					}
				}
				if (pass) return i;
			}
			return 0;
		};

		return pictures
			.map((picture) => {
				// get horizontal
				const horz = getHorz(picture);
				const vert = getVert(picture);
				return {
					picture,
					horz,
					vert,
				};
			})
			.reduce((acc, pic) => acc + pic.vert + 100 * pic.horz, 0);
	}

	solvePart2(pictures = this.pictures) {
		const getHorz = (picture) => {
			for (let i = 1; i < picture.length; i++) {
				const min = Math.min(i, picture.length - i);
				let pass = 0;
				for (let j = 0; j < min && pass < 2; j++) {
					const lower = picture[i - j - 1];
					const upper = picture[i + j];
					const sum = lower.reduce((a, p, q) => (p === upper[q] ? a : a + 1), 0);
					pass += sum;
				}
				if (pass === 1) return i;
			}
			return 0;
		};
		const getVert = (picture) => {
			for (let i = 1; i < picture[0].length; i++) {
				const min = Math.min(i, picture[0].length - i);
				let pass = 0;
				for (let j = 0; j < min && pass < 2; j++) {
					const lower = picture.map((line) => line[i - j - 1]);
					const upper = picture.map((line) => line[i + j]);
					const sum = lower.reduce((a, p, q) => (p === upper[q] ? a : a + 1), 0);
					pass += sum;
				}
				if (pass === 1) return i;
			}
			return 0;
		};

		return pictures
			.map((picture) => {
				// get horizontal
				const horz = getHorz(picture);
				const vert = getVert(picture);
				return {
					picture,
					horz,
					vert,
				};
			})
			.reduce((acc, pic) => acc + pic.vert + 100 * pic.horz, 0);
	}
};
