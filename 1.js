const input = require('./1.input');

const increaseCounter = (a) => {
	let out = 0;
	for (let i = 1; i < a.length; i++) {
		out += a[i - 1] < a[i] ? 1 : 0;
	}
	return out;
};

console.log(`part a:${increaseCounter(input)}`);

const slidingWindow = (a) => new Array(a.length - 2)
	.fill(null)
	.map((_, i) => a[i] + a[i + 1] + a[i + 2]);

console.log(`part b:${increaseCounter(slidingWindow(input))}`);
