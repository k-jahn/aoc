// =============================  Advent of Code  =============================
// Runner Day 6 of 2023
// See https://adventofcode.com/2023/day/6
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const WaitForIt = require('./6');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./6.testcase').toString().trim();
const input = readFileSync('./6.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testWaitForIt = new WaitForIt(testCase);
// console.log(testWaitForIt.solvePart1());
// console.log(testWaitForIt.solvePart2());
console.log(testWaitForIt.solvePart2Analytical());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputWaitForIt = new WaitForIt(input);
// console.log(inputWaitForIt.solvePart1());
// console.log(inputWaitForIt.solvePart2());
console.log(inputWaitForIt.solvePart2Analytical());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
