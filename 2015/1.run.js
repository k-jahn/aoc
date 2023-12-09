// =============================  Advent of Code  =============================
// Runner Day 1 of 2015
// See https://adventofcode.com/2015/day/1
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const NotQuiteLisp = require('./1');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./1.testcase').toString().trim();
const input = readFileSync('./1.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testNotQuiteLisp = new NotQuiteLisp(testCase);
console.log(testNotQuiteLisp.solvePart1());
// console.log(testNotQuiteLisp.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputNotQuiteLisp = new NotQuiteLisp(input);
console.log(inputNotQuiteLisp.solvePart1());
console.log(inputNotQuiteLisp.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
