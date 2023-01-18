// =============================  Advent of Code  =============================
// Runner Day 9 of 2022
// See https://adventofcode.com/2022/day/9
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const RopeBridge = require('./9');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./9.testcase').toString().trim();
const input = readFileSync('./9.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testRopeBridge = new RopeBridge(testCase);
console.log(testRopeBridge.solvePart1());
console.log(testRopeBridge.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputRopeBridge = new RopeBridge(input);
console.log(inputRopeBridge.solvePart1());
console.log(inputRopeBridge.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
