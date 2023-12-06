// =============================  Advent of Code  =============================
// Runner Day 9 of 2015
// See https://adventofcode.com/2015/day/9
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const AllInASingleNight = require('./9');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./9.testcase').toString().trim();
const input = readFileSync('./9.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testAllInASingleNight = new AllInASingleNight(testCase);
console.log(testAllInASingleNight.solvePart1());
console.log(testAllInASingleNight.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputAllInASingleNight = new AllInASingleNight(input);
console.log(inputAllInASingleNight.solvePart1());
console.log(inputAllInASingleNight.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
