// =============================  Advent of Code  =============================
// Runner Day 4 of 2022
// See https://adventofcode.com/2022/day/4
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const CampCleanup = require('./4');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./4.testcase').toString().trim();
const input = readFileSync('./4.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testCampCleanup = new CampCleanup(testCase);
console.log(testCampCleanup.solvePart1());
console.log(testCampCleanup.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputCampCleanup = new CampCleanup(input);
console.log(inputCampCleanup.solvePart1());
console.log(inputCampCleanup.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
