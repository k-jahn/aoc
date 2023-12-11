// =============================  Advent of Code  =============================
// Runner Day 13 of 2022
// See https://adventofcode.com/2022/day/13
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const DistressSignal = require('./13');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./13.testcase').toString().trim();
const input = readFileSync('./13.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testDistressSignal = new DistressSignal(testCase);
console.log(testDistressSignal.solvePart1());
console.log(testDistressSignal.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputDistressSignal = new DistressSignal(input);
console.log(inputDistressSignal.solvePart1());
console.log(inputDistressSignal.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
