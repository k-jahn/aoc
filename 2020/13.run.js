// =============================  Advent of Code  =============================
// Runner Day 13 of 2020
// See https://adventofcode.com/2020/day/13
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const ShuttleSearch = require('./13');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./13.testcase').toString().trim();
const input = readFileSync('./13.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testShuttleSearch = new ShuttleSearch(testCase);
console.log(testShuttleSearch.solvePart1());
console.log(testShuttleSearch.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputShuttleSearch = new ShuttleSearch(input);
console.log(inputShuttleSearch.solvePart1());
console.log(inputShuttleSearch.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
