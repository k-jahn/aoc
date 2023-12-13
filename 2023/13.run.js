// =============================  Advent of Code  =============================
// Runner Day 13 of 2023
// See https://adventofcode.com/2023/day/13
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const PointOfIncidence = require('./13');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./13.testcase').toString().trim();
const input = readFileSync('./13.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testPointOfIncidence = new PointOfIncidence(testCase);
console.log(testPointOfIncidence.solvePart1());
// console.log(testPointOfIncidence.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputPointOfIncidence = new PointOfIncidence(input);
console.log(inputPointOfIncidence.solvePart1());
// console.log(inputPointOfIncidence.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
