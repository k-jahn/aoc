// =============================  Advent of Code  =============================
// Runner Day 1 of 2016
// See https://adventofcode.com/2016/day/1
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const NoTimeForATaxicab = require('./1');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./1.testcase').toString().trim();
const input = readFileSync('./1.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testNoTimeForATaxicab = new NoTimeForATaxicab(testCase);
console.log(testNoTimeForATaxicab.solvePart1());
console.log(testNoTimeForATaxicab.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputNoTimeForATaxicab = new NoTimeForATaxicab(input);
console.log(inputNoTimeForATaxicab.solvePart1());
// console.log(inputNoTimeForATaxicab.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
