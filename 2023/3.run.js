// =============================  Advent of Code  =============================
// Runner Day 3 of 2023
// See https://adventofcode.com/2023/day/3
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const GearRatios = require('./3');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./3.testcase').toString().trim();
const input = readFileSync('./3.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testGearRatios = new GearRatios(testCase);
console.log(testGearRatios.solvePart1());
console.log(testGearRatios.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputGearRatios = new GearRatios(input);
console.log(inputGearRatios.solvePart1());
console.log(inputGearRatios.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
