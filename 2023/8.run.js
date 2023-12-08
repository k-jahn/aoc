// =============================  Advent of Code  =============================
// Runner Day 8 of 2023
// See https://adventofcode.com/2023/day/8
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const HauntedWasteland = require('./8');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./8.testcase').toString().trim();
const input = readFileSync('./8.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testHauntedWasteland = new HauntedWasteland(testCase);
// console.log(testHauntedWasteland.solvePart1());
console.log(testHauntedWasteland.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputHauntedWasteland = new HauntedWasteland(input);
// console.log(inputHauntedWasteland.solvePart1());
console.log(inputHauntedWasteland.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
