// =============================  Advent of Code  =============================
// Runner Day 4 of 2020
// See https://adventofcode.com/${year}/day/${day}
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const PassportChecker = require('./4');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./4.testcase').toString().trim();
const input = readFileSync('./4.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testPassportChecker = new PassportChecker(testCase);
console.log(testPassportChecker.solvePart1());
console.log(testPassportChecker.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputPassportChecker = new PassportChecker(input);
console.log(inputPassportChecker.solvePart1());
console.log(inputPassportChecker.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
