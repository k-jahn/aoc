const input = require('./2.input');

const parsedInput = input.map((e) => e.split(' '))
	.map((e) => [e[0], +e[1]]);

const nav = (course) => course
	.reduce((a, e) => {
		let [x, y] = a;
		const [direction, increment] = e;
		switch (direction) {
			case 'forward':
				x += increment;
				break;
			case 'up':
				y -= increment;
				break;
			case 'down':
				y += increment;
				break;
			default:
		}
		return [x, y];
	}, [0, 0]);

const reduce = (a) => a[0] * a[1];

console.log('Part 1:', reduce(nav(parsedInput)));

const navAim = (course) => course
	.reduce((a, e) => {
		let [x, y, aim] = a;
		const [direction, increment] = e;
		switch (direction) {
			case 'forward':
				x += increment;
				y += increment * aim;
				break;
			case 'up':
				aim -= increment;
				break;
			case 'down':
				aim += increment;
				break;
			default:
		}
		return [x, y, aim];
	}, [0, 0, 0]);

console.log('b', reduce(navAim(parsedInput)));
