// =============================  Advent of Code  =============================
// Runner Day 15 of 2020
// See https://adventofcode.com/2020/day/15
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const RambunctiousRecitation = require('./15');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./15.testcase').toString().trim();
const input = readFileSync('./15.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testRambunctiousRecitation = new RambunctiousRecitation(testCase);
console.log(testRambunctiousRecitation.solvePart1());
console.log(testRambunctiousRecitation.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputRambunctiousRecitation = new RambunctiousRecitation(input);
console.log(inputRambunctiousRecitation.solvePart1());
console.log(inputRambunctiousRecitation.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
