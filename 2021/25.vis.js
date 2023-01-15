// =============================  Advent of Code  =============================
// Runner Day 25 of 2021
// See https://adventofcode.com/${year}/day/25
//
// to install external dependencies
// sudo apt install ffmpeg ansilove
//
/* eslint-disable no-unused-vars */

const { readFileSync, mkdirSync, rmSync } = require('fs');
const { writeFile, rm } = require('fs/promises');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const Seafloor = require('./25');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;
const formatRed = (str) => `\u001b[31m${str}\x1b[0m`;
const formatGreen = (str) => `\u001b[32m${str}\x1b[0m`;

const input = readFileSync('./25.input').toString().trim();

console.log(formatBold('\nVisualizing'));

const taskStart = Date.now();

console.log('Initializing Seafloor', (formatBold(Date.now() - taskStart) + 'ms'));
const inputSeafloor = new Seafloor(input);
const width = inputSeafloor.m[0].length;

console.log('Removing old data', (formatBold(Date.now() - taskStart) + 'ms'));
const dir = './visualization/25/';
rmSync(dir, { recursive: true });
mkdirSync(dir, { recursive: true });

let locked = false;
const promises = [];
console.log('Rendering Frames', (formatBold(Date.now() - taskStart) + 'ms'));
while (!locked) {
	locked = inputSeafloor.locked;
	const frameStr = inputSeafloor.toString();
	const step = ('000' + inputSeafloor.steps).slice(-3);
	const stepStr = `step: ${formatBold(step)}`;
	const coloredFrameStr = stepStr + frameStr.replace(/>+/g, (l) => formatGreen(l))
		.replace(/v+/g, (l) => formatRed(l))
		.replace(/\./g, ' ');
	const ansi = `${dir}${step}.ansi`;
	const png = `${dir}${step}.png`;
	const framePromise = writeFile(ansi, coloredFrameStr, { flag: 'w+' })
		.then((_) => exec(`ansilove -f 80x50 -c ${width + 1} -o ${png} ${ansi}`));
	promises.push(framePromise);
	inputSeafloor.step();
}
Promise.all(promises)
	.then(() => {
		console.log('Removing ANSI', (formatBold(Date.now() - taskStart) + 'ms'));
		return exec(`rm ${dir}*.ansi`);
	})
	.then(() => {
		console.log('Building MPG', (formatBold(Date.now() - taskStart) + 'ms'));
		return exec('ffmpeg -y -r 9 -f image2 -i %03d.png -vcodec libx264 -crf 25  -pix_fmt yuv420p output.mp4', { cwd: dir });
	})
	.then(() => {
		console.log('Removing PNG', (formatBold(Date.now() - taskStart) + 'ms'));
		return exec(`rm ${dir}*.png`);
	})
	.then((r) => console.log('Done', (formatBold(Date.now() - taskStart) + 'ms')));
