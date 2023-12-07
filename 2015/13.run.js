// =============================  Advent of Code  =============================
// Runner Day 13 of 2015
// See https://adventofcode.com/2015/day/13
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const KnightsOfTheDinnerTable = require('./13');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./13.testcase').toString().trim();
const input = readFileSync('./13.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testKnightsOfTheDinnerTable = new KnightsOfTheDinnerTable(testCase);
console.log(testKnightsOfTheDinnerTable.solvePart1());
console.log(testKnightsOfTheDinnerTable.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputKnightsOfTheDinnerTable = new KnightsOfTheDinnerTable(input);
console.log(inputKnightsOfTheDinnerTable.solvePart1());
console.log(inputKnightsOfTheDinnerTable.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
