const { exec } = require('child_process');
const fs = require('fs');
const fetch = require('node-fetch-commonjs');
const { JSDOM } = require('jsdom');

const parseParams = require('./parseparams');

const session = fs.readFileSync('./session').toString();
const solutionTemplate = fs.readFileSync('./solution.template').toString();
const runTemplate = fs.readFileSync('./run.template').toString();

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

(async function startAdventOfCodeDay() {
	const { day, year } = await parseParams({ getClassName: false });
	await fs.promises.mkdir('./' + year, { recursive: true });
	const solutionFile = await fs.promises.open(`./${year}/${day}.js`, 'wx+')
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

	if (!session) throw new Error('Missing AoC session key in ./session');

	const url = `https://adventofcode.com/${year}/day/${day}`;
	const now = Date.now();

	console.log(`Scraping puzzle data from ${url}`);

	const response = await fetch(
		url,
		{
			headers: {
				Cookie: `session=${session}`,
			},
		},
	);
	const str = await response.text();
	const dom = new JSDOM(str);

	console.log(`Received ${response.headers.get('content-length')} bytes [${formatBold(Date.now() - now)}ms]`);

	const [_, classNameStr] = dom.window.document.querySelector('h2').textContent.replace()
		.match(new RegExp(`--- Day ${day}: (.*) ---`));
	const className = classNameStr.split(' ')
		.map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
		.join('');
	const testCaseStr = (dom.window.document.querySelector('pre')
		&& dom.window.document.querySelector('pre').textContent) || '';

	console.log(testCaseStr ? 'Found possible testCase' : 'Did not find testCase');

	await solutionFile.writeFile(
		solutionTemplate.replace(/\$\{day\}/g, day)
			.replace(/\$\{year\}/g, year)
			.replace(/\$\{className\}/g, className),
	);

	await runFile.writeFile(
		runTemplate.replace(/\$\{day\}/g, day)
			.replace(/\$\{year\}/g, year)
			.replace(/\$\{className\}/g, className),
	);

	await testCaseFile.writeFile(testCaseStr);

	await testCaseFile.close();
	await solutionFile.close();
	await runFile.close();

	console.log(`Generated Boilerplate for Day ${formatBold(day)}, ${formatBold(year)} with ClassName ${formatBold(className)}`);
	const getInputProc = exec(`npm run getinput ${day} ${year}`);

	getInputProc.stdout.on('data', (data) => console.log(data));
}());
