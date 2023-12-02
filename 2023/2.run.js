// =============================  Advent of Code  =============================
// Runner Day 2 of 2023
// See https://adventofcode.com/2023/day/2
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const CubeConundrum = require('./2');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./2.testcase').toString().trim();
const input = readFileSync('./2.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testCubeConundrum = new CubeConundrum(testCase);
console.log(testCubeConundrum.solvePart1());
console.log(testCubeConundrum.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputCubeConundrum = new CubeConundrum(input);
console.log(inputCubeConundrum.solvePart1());
console.log(inputCubeConundrum.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
