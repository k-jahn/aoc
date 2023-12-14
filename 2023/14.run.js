// =============================  Advent of Code  =============================
// Runner Day 14 of 2023
// See https://adventofcode.com/2023/day/14
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const ParabolicReflectorDish = require('./14');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./14.testcase').toString().trim();
const input = readFileSync('./14.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testParabolicReflectorDish = new ParabolicReflectorDish(testCase);
console.log(testParabolicReflectorDish.solvePart1());
console.log(testParabolicReflectorDish.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputParabolicReflectorDish = new ParabolicReflectorDish(input);
// console.log(inputParabolicReflectorDish.solvePart1());
console.log(inputParabolicReflectorDish.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
