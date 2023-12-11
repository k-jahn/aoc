// =============================  Advent of Code  =============================
// Runner Day 11 of 2023
// See https://adventofcode.com/2023/day/11
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const CosmicExpansion = require('./11');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./11.testcase').toString().trim();
const input = readFileSync('./11.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testCosmicExpansion = new CosmicExpansion(testCase);
console.log(testCosmicExpansion.solvePart1());
console.log(testCosmicExpansion.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputCosmicExpansion = new CosmicExpansion(input);
console.log(inputCosmicExpansion.solvePart1());
console.log(inputCosmicExpansion.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
