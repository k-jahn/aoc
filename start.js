const fs = require('fs');
const { exec } = require('child_process');

const parseParams = require('./parseparams');

const solutionTemplate = fs.readFileSync('./solution.template').toString();
const runTemplate = fs.readFileSync('./run.template').toString();
// const getInput = require('./getinput');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

try {
	(async function startAdventOfCodeDay() {
		const { day, year, className } = await parseParams();
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

		await testCaseFile.writeFile('');

		await testCaseFile.close();
		await solutionFile.close();

		console.log(`Generated Boilerplate for Day ${formatBold(day)}, ${formatBold(year)} with ClassName ${formatBold(className)}`);
		const getInputProc = exec(`npm run getinput ${day} ${year}`);

		getInputProc.stdout.on('data', (data) => console.log(data));
	}());
} catch (e) {
	console.error(e);
}
