// =============================  Advent of Code  =============================
// Runner Day 2 of 2022
// See https://adventofcode.com/2022/day/2
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const RockPaperScissors = require('./2');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./2.testcase').toString().trim();
const input = readFileSync('./2.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testRockPaperScissors = new RockPaperScissors(testCase);
console.log(testRockPaperScissors.solvePart1());
console.log(testRockPaperScissors.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputRockPaperScissors = new RockPaperScissors(input);
console.log(inputRockPaperScissors.solvePart1());
console.log(inputRockPaperScissors.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
