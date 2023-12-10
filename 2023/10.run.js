// =============================  Advent of Code  =============================
// Runner Day 10 of 2023
// See https://adventofcode.com/2023/day/10
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const PipeMaze = require('./10');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./10.testcase').toString().trim();
const input = readFileSync('./10.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testPipeMaze = new PipeMaze(testCase);
// console.log(testPipeMaze.solvePart1());
console.log(testPipeMaze.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputPipeMaze = new PipeMaze(input);
// console.log(inputPipeMaze.solvePart1());
console.log(inputPipeMaze.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
