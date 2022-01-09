const readline = require('readline');

const prompt = (question) => new Promise((resolve) => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.question(question, (answer) => {
		rl.close();
		resolve(answer);
	});
});

module.exports = async function parseParams(
	{ getDay = true, getYear = true, getClassName = true } = {},
) {
	const argmts = process.argv.slice(2);

	const [dayArg, yearArg] = argmts.map((arg) => parseInt(arg, 10)).filter(Boolean);
	const [classNameArg] = argmts.filter((arg) => !parseInt(arg, 10));
	const out = {};

	if (getDay !== false) {
		let day = dayArg;
		while (!day || day < 1 || day > 25) {
			const dayPrompt = parseInt(await prompt('Day [1-25]: '), 10); // eslint-disable-line no-await-in-loop
			day = dayPrompt;
		}
		out.day = day;
	}

	if (getYear) {
		const lastAdventYear = new Date().getMonth() < 11
			? new Date().getFullYear() - 1
			: new Date().getFullYear();
		let year = yearArg < 100 ? yearArg + 2000 : yearArg;
		if (getYear) {
			while (!year || year < 2016 || year > lastAdventYear) {
				const yearPrompt = parseInt(await prompt(`Year [2016-${lastAdventYear}]: `), 10); // eslint-disable-line no-await-in-loop
				year = yearPrompt < 100 ? yearPrompt + 2000 : yearPrompt;
			}
		}
		out.year = year;
	}

	if (getClassName) {
		let className = classNameArg;
		while (!className || !/^[A-Z][a-z]+/.test(className)) {
			const classNamePrompt = await prompt('ClassName [CamelCase]: '); // eslint-disable-line no-await-in-loop
			className = classNamePrompt;
		}
		out.className = className;
	}

	return out;
};
