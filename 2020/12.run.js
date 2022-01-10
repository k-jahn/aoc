// =============================  Advent of Code  =============================
// Runner Day 12 of 2020
// See https://adventofcode.com/2020/day/12
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const Navigation = require('./12');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./12.testcase').toString().trim();
const input = readFileSync('./12.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testNavigation = new Navigation(testCase);
console.log(testNavigation.solvePart1());
console.log(testNavigation.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputNavigation = new Navigation(input);
// console.log(inputNavigation.solvePart1());
console.log(inputNavigation.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
