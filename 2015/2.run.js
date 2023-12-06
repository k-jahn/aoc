// =============================  Advent of Code  =============================
// Runner Day 2 of 2015
// See https://adventofcode.com/2015/day/2
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const IWasToldThereWouldBeNoMath = require('./2');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./2.testcase').toString().trim();
const input = readFileSync('./2.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testIWasToldThereWouldBeNoMath = new IWasToldThereWouldBeNoMath(testCase);
console.log(testIWasToldThereWouldBeNoMath.solvePart1());
console.log(testIWasToldThereWouldBeNoMath.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputIWasToldThereWouldBeNoMath = new IWasToldThereWouldBeNoMath(input);
console.log(inputIWasToldThereWouldBeNoMath.solvePart1());
console.log(inputIWasToldThereWouldBeNoMath.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
