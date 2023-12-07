// =============================  Advent of Code  =============================
// Runner Day 7 of 2023
// See https://adventofcode.com/2023/day/7
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const CamelCards = require('./7');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./7.testcase').toString().trim();
const input = readFileSync('./7.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testCamelCards = new CamelCards(testCase);
console.log(testCamelCards.solvePart1());
console.log(testCamelCards.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputCamelCards = new CamelCards(input);
console.log(inputCamelCards.solvePart1());
console.log(inputCamelCards.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
