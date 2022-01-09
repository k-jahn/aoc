// =============================  Advent of Code  =============================
// Runner Day 20 of 2021
// See https://adventofcode.com/2020/day/6
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const TrenchImage = require('./20');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./20.testcase').toString().trim();
const input = readFileSync('./20.input').toString().trim();

console.log((formatBold('TestCase')));

const testCaseStart = Date.now();

const testTrenchImage = new TrenchImage(testCase);
// console.log(
// 	testTrenchImage.toString(),
// 	'\n\n',
// 	testTrenchImage.enhance().toString(),
// 	'\n\n',
// 	testTrenchImage.enhance().toString(),
// );
console.log(testTrenchImage.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputTrenchImage = new TrenchImage(input);
// console.log(inputTrenchImage.enhance().enhance().toString());
// console.log(inputTrenchImage.solvePart1());
console.log(inputTrenchImage.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
