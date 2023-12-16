// =============================  Advent of Code  =============================
// Runner Day 15 of 2023
// See https://adventofcode.com/2023/day/15
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const LensLibrary = require('./15');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./15.testcase').toString().trim();
const input = readFileSync('./15.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testLensLibrary = new LensLibrary(testCase);
console.log(testLensLibrary.solvePart1());
console.log(testLensLibrary.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputLensLibrary = new LensLibrary(input);
console.log(inputLensLibrary.solvePart1());
console.log(inputLensLibrary.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
