// =============================  Advent of Code  =============================
// Runner Day 3 of 2022
// See https://adventofcode.com/2022/day/3
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const RucksackReorganization = require('./3');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./3.testcase').toString().trim();
const input = readFileSync('./3.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testRucksackReorganization = new RucksackReorganization(testCase);
console.log(testRucksackReorganization.solvePart1());
console.log(testRucksackReorganization.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputRucksackReorganization = new RucksackReorganization(input);
console.log(inputRucksackReorganization.solvePart1());
console.log(inputRucksackReorganization.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
