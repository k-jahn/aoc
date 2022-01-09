// =============================  Advent of Code  =============================
// Runner Day 8 of 2020
// See https://adventofcode.com/2020/day/8
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const Handheld = require('./8');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./8.testcase').toString().trim();
const input = readFileSync('./8.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testHandheld = new Handheld(testCase);
console.log(testHandheld.solvePart1());
console.log(testHandheld.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputHandheld = new Handheld(input);
console.log(inputHandheld.solvePart1());
console.log(inputHandheld.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
