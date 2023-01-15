// =============================  Advent of Code  =============================
// Runner Day 6 of 2022
// See https://adventofcode.com/2022/day/6
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const TuningTrouble = require('./6');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./6.testcase').toString().trim();
const input = readFileSync('./6.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testTuningTrouble = new TuningTrouble(testCase);
console.log(testTuningTrouble.solvePart1());
console.log(testTuningTrouble.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputTuningTrouble = new TuningTrouble(input);
console.log(inputTuningTrouble.solvePart1());
console.log(inputTuningTrouble.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
