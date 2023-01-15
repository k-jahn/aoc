// =============================  Advent of Code  =============================
// Runner Day 1 of 2022
// See https://adventofcode.com/2022/day/1
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const CalorieCounting = require('./1');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./1.testcase').toString().trim();
const input = readFileSync('./1.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testCalorieCounting = new CalorieCounting(testCase);
console.log(testCalorieCounting.solvePart1());
console.log(testCalorieCounting.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputCalorieCounting = new CalorieCounting(input);
console.log(inputCalorieCounting.solvePart1());
console.log(inputCalorieCounting.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
