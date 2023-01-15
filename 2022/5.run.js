// =============================  Advent of Code  =============================
// Runner Day 5 of 2022
// See https://adventofcode.com/2022/day/5
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const SupplyStacks = require('./5');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./5.testcase').toString().replace(/(^\n)|(\n$)/, '');
const input = readFileSync('./5.input').toString().replace(/(^\n)|(\n$)/, '');

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testSupplyStacks = new SupplyStacks(testCase);
console.log(testSupplyStacks.solvePart1());
console.log(testSupplyStacks.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputSupplyStacks = new SupplyStacks(input);
console.log(inputSupplyStacks.solvePart1());
console.log(inputSupplyStacks.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
