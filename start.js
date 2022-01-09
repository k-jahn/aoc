/* eslint-disable no-template-curly-in-string */

const fs = require('fs');

const solutionTemplate = fs.readFileSync('./solution.template').toString();
const runTemplate = fs.readFileSync('./run.template').toString();
// const getInput = require('./getinput');

const argmts = process.argv.slice(2);
const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

try {
	(async function startAdventOfCodeDay(args) {
		if (!args.length) throw new Error('No Date given');
		let [day, year] = args.map((arg) => parseInt(arg, 10)).filter(Boolean); // eslint-disable-line
		const [className] = args.filter((arg) => !parseInt(arg, 10));

		const currentYear = new Date().getFullYear();
		if (!year) year = currentYear;
		if (year < 100) year += 2000;
		if (year > currentYear || year < 2016) throw new Error('Bad Year');
		if (day < 1 || day > 25) throw new Error('Bad Day');

		await fs.promises.mkdir('./' + year, { recursive: true });
		const solutionFile = await fs.promises.open(`./${year}/${day}.js`, 'wx+')
			.catch((e) => {
				if (e.errno === -17) throw new Error('Day already started!');
				throw e;
			});
		const inputFile = await fs.promises.open(`./${year}/${day}.input`, 'wx+')
			.catch((e) => {
				if (e.errno === -17) throw new Error('Day already started!');
				throw e;
			});
		const testCaseFile = await fs.promises.open(`./${year}/${day}.testcase`, 'wx+')
			.catch((e) => {
				if (e.errno === -17) throw new Error('Day already started!');
				throw e;
			});
		const runFile = await fs.promises.open(`./${year}/${day}.run.js`, 'wx+')
			.catch((e) => {
				if (e.errno === -17) throw new Error('Day already started!');
				throw e;
			});

		let validatedClassName;
		if (className && /^[A-Z][a-z]+/.test(className)) {
			validatedClassName = className;
		} else {
			throw new Error('No valid ClassName given');
		}

		await solutionFile.writeFile(
			solutionTemplate.replace(/\$\{day\}/g, day)
				.replace(/\$\{year\}/g, year)
				.replace(/\$\{validatedClassName\}/g, validatedClassName),
		);

		await runFile.writeFile(
			runTemplate.replace(/\$\{day\}/g, day)
				.replace(/\$\{year\}/g, year)
				.replace(/\$\{validatedClassName\}/g, validatedClassName),
		);

		await inputFile.writeFile('');

		await testCaseFile.writeFile('');

		await inputFile.close();
		await testCaseFile.close();
		await solutionFile.close();

		console.log(`Started Day ${formatBold(day)}, ${formatBold(year)} with ClassName ${formatBold(validatedClassName)}`);
		// getInput(year, day);
	}(argmts));
} catch (e) {
	console.error(e);
}
