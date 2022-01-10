// =============================  Advent of Code  =============================
// Runner Day 10 of 2020
// See https://adventofcode.com/2020/day/10
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const JoltAdapter = require('./10');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./10.testcase').toString().trim();
const input = readFileSync('./10.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testJoltAdapter = new JoltAdapter(testCase);
console.log(testJoltAdapter.solvePart1());
console.log(testJoltAdapter.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputJoltAdapter = new JoltAdapter(input);
console.log(inputJoltAdapter.solvePart1());
console.log(inputJoltAdapter.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
