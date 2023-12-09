// =============================  Advent of Code  =============================
// Runner Day 11 of 2015
// See https://adventofcode.com/2015/day/11
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const CorporatePolicy = require('./11');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./11.testcase').toString().trim();
const input = readFileSync('./11.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testCorporatePolicy = new CorporatePolicy(testCase);
console.log(testCorporatePolicy.solvePart1());
// console.log(testCorporatePolicy.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputCorporatePolicy = new CorporatePolicy(input);
console.log(inputCorporatePolicy.solvePart1());
console.log(inputCorporatePolicy.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
