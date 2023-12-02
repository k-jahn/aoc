// =============================  Advent of Code  =============================
// Runner Day 12 of 2022
// See https://adventofcode.com/2022/day/12
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const HillClimbingAlgorithm = require('./12');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./12.testcase').toString().trim();
const input = readFileSync('./12.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testHillClimbingAlgorithm = new HillClimbingAlgorithm(testCase);
console.log(testHillClimbingAlgorithm.solvePart1());
// console.log(testHillClimbingAlgorithm.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputHillClimbingAlgorithm = new HillClimbingAlgorithm(input);
console.log(inputHillClimbingAlgorithm.solvePart1());
// console.log(inputHillClimbingAlgorithm.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
