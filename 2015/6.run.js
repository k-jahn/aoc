// =============================  Advent of Code  =============================
// Runner Day 6 of 2015
// See https://adventofcode.com/2015/day/6
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const ProbablyAFireHazard = require('./6');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./6.testcase').toString().trim();
const input = readFileSync('./6.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testProbablyAFireHazard = new ProbablyAFireHazard(testCase);
console.log(testProbablyAFireHazard.solvePart1());
console.log(testProbablyAFireHazard.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputProbablyAFireHazard = new ProbablyAFireHazard(input);
console.log(inputProbablyAFireHazard.solvePart1());
console.log(inputProbablyAFireHazard.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
