// =============================  Advent of Code  =============================
// Runner Day 7 of 2022
// See https://adventofcode.com/2022/day/7
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const NoSpaceLeftOnDevice = require('./7');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./7.testcase').toString().trim();
const input = readFileSync('./7.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testNoSpaceLeftOnDevice = new NoSpaceLeftOnDevice(testCase);
console.log(testNoSpaceLeftOnDevice.solvePart1());
console.log(testNoSpaceLeftOnDevice.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputNoSpaceLeftOnDevice = new NoSpaceLeftOnDevice(input);
console.log(inputNoSpaceLeftOnDevice.solvePart1());
console.log(inputNoSpaceLeftOnDevice.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
