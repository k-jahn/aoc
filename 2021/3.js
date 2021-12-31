const { input, testcase } = require('./3.input');

const relativeRates = (report) => report
	.reduce((a, e) => a.map((d, i) => d + (e[i] === '1' ? 1 / report.length : 0)), new Array(report[0].length).fill(0));

const rates = (report) => relativeRates(report)
	.reduce((a, e) => (e > 0.5 ? { g: a.g + '1', e: a.e + '0' } : { g: a.g + '0', e: a.e + '1' }), { g: '', e: '' });

const fromBinary = (r) => ({ g: parseInt(r.g, 2), e: parseInt(r.e, 2) });

console.log(fromBinary(rates(input)));

const lifeSupport = (report, isOxy) => {
	let current = report;
	for (let i = 0; i < report[0].length; i++) {
		const currentRate = relativeRates(current)[i];
		let filterVal;
		if (currentRate > 0 && currentRate < 1) {
			if (currentRate === 0.5) {
				filterVal = isOxy ? '1' : '0';
			} else {
				filterVal = (currentRate > 0.5 && isOxy) || (currentRate < 0.5 && !isOxy) ? '1' : '0';
			}
			current = current.filter((e) => e[i] === filterVal);
		}
	}
	return current[0];
};

console.log(lifeSupport(input, true));
console.log(lifeSupport(input, false));

console.log(parseInt(lifeSupport(input, true), 2) * parseInt(lifeSupport(input, false), 2));

console.log('testcase');
console.log(lifeSupport(testcase, true));
console.log(lifeSupport(testcase, false));
console.log(parseInt(lifeSupport(testcase, true), 2) * parseInt(lifeSupport(testcase, false), 2));
