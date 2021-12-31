const fs = require('fs/promises');

const argmts = process.argv.slice(2);
const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

(async function startAdventOfCodeDay(args) {
	if (!args.length) throw new Error('No Date given');
	let [day, year] = args.map((arg) => parseInt(arg, 10)).filter(Boolean); // eslint-disable-line
	const [className] = args.filter((arg) => !parseInt(arg, 10));

	const currentYear = new Date().getFullYear();
	if (!year) year = currentYear;
	if (year < 100) year += 2000;
	if (year > currentYear || year < 2016) throw new Error('Bad Year');
	if (day < 1 || day > 25) throw new Error('Bad Day');

	await fs.mkdir('./' + year, { recursive: true });
	const solutionFile = await fs.open(`./${year}/${day}.js`, 'wx+')
		.catch((e) => {
			if (e.errno === -17) throw new Error('Day already started!');
			throw e;
		});
	const inputFile = await fs.open(`./${year}/${day}.input.js`, 'wx+')
		.catch((e) => {
			if (e.errno === -17) throw new Error('Day already started!');
			throw e;
		});
	const testCaseFile = await fs.open(`./${year}/${day}.testcase.js`, 'wx+')
		.catch((e) => {
			if (e.errno === -17) throw new Error('Day already started!');
			throw e;
		});

	let validatedClassName;
	if (className && /^[A-Z][a-z]+/.test(className)) {
		validatedClassName = className;
	} else {
		console.warn('No valid ClassName given');
		validatedClassName = 'ClassName';
	}

	await solutionFile.writeFile(
		[
			'// =============================  Advent of Code  =============================',
			`// Solution Day ${day} of ${year}`,
			`// See https://adventofcode.com/${year}/day/${day}`,
			'',
			`const { testCase } = require('./${day}.testcase');`,
			`// const { input } = require('./${day}.input');`,
			'',
			`class ${validatedClassName} {`,
			'	constructor(str) {',
			'		this.str = str;',
			'	}',
			'',
			'	solvePart1() {',
			'		return this.str;',
			'	}',
			'',
			'	solvePart2() {',
			'		return this.str;',
			'	}',
			'}',
			'',
			`const test${validatedClassName} = new ${validatedClassName}(testCase);`,
			`console.log(test${validatedClassName}.solvePart1());`,
			`// console.log(test${validatedClassName}.solvePart2());`,
			'',
			`// const input${validatedClassName} = new ${validatedClassName}(input);`,
			`// console.log(input${validatedClassName}.solvePart1());`,
			`// console.log(input${validatedClassName}.solvePart2());`,
			'',
		].join('\n'),
	);

	await inputFile.writeFile(
		[
			'// =============================  Advent of Code  =============================',
			`// Input Day ${day} of ${year}`,
			`// See https://adventofcode.com/${year}/day/${day}/input`,
			'',
			'module.exports.input = ``;',
			'',
		].join('\n'),
	);

	await testCaseFile.writeFile(
		[
			'// =============================  Advent of Code  =============================',
			`// TestCase Day ${day} of ${year}`,
			`// See https://adventofcode.com/${year}/day/${day}`,
			'',
			'module.exports.testCase = ``;',
			'',
		].join('\n'),
	);

	await inputFile.close();
	await testCaseFile.close();
	await solutionFile.close();

	console.log(`Started Day ${formatBold(day)}, ${formatBold(year)} with ClassName ${formatBold(validatedClassName)}`);
}(argmts));
