// =============================  Advent of Code  =============================
// Runner Day 8 of 2015
// See https://adventofcode.com/2015/day/8
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const Matchsticks = require('./8');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./8.testcase').toString().trim();
const input = readFileSync('./8.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testMatchsticks = new Matchsticks(testCase);
console.log(testMatchsticks.solvePart1());
console.log(testMatchsticks.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputMatchsticks = new Matchsticks(input);
console.log(inputMatchsticks.solvePart1());
console.log(inputMatchsticks.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
