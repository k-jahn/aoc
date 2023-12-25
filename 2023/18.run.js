// =============================  Advent of Code  =============================
// Runner Day 18 of 2023
// See https://adventofcode.com/2023/day/18
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const LavaductLagoon = require('./18');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./18.testcase').toString().trim();
const input = readFileSync('./18.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testLavaductLagoon = new LavaductLagoon(testCase);
console.log(testLavaductLagoon.solvePart1());
// console.log(testLavaductLagoon.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputLavaductLagoon = new LavaductLagoon(input);
console.log(inputLavaductLagoon.solvePart1());
// console.log(inputLavaductLagoon.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
