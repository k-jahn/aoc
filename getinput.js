// Fetches AoC input from server

const fetch = require('cross-fetch');
const fs = require('fs');

const parseParams = require('./parseparams');

const session = fs.readFileSync('./session').toString();
const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

(async function getInput() {
	const { day, year } = await parseParams({ getClassName: false });
	if (!session) throw new Error('Missing AoC session key in ./session');

	const url = `https://adventofcode.com/${year}/day/${day}/input`;
	const now = Date.now();

	console.log(`Fetching puzzle input from ${url}`);

	const response = await fetch(
		url,
		{
			headers: {
				Cookie: `session=${session}`,
			},
		},
	);
	const str = await response.text();

	console.log(`Received ${response.headers.get('content-length')} bytes [${formatBold(Date.now() - now)}ms]`);

	const fileName = `./${year}/${day}.input`;
	console.log(`Saving to ${fileName}`);
	const inputFile = await fs.promises.open(fileName, 'w+');
	await inputFile.writeFile(str);
	inputFile.close();
	console.log(`${formatBold('Done')}`);
}());
