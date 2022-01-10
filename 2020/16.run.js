// =============================  Advent of Code  =============================
// Runner Day 16 of 2020
// See https://adventofcode.com/2020/day/16
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const TicketTranslation = require('./16');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./16.testcase').toString().trim();
const input = readFileSync('./16.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testTicketTranslation = new TicketTranslation(testCase);
console.log(testTicketTranslation.solvePart1());
console.log(testTicketTranslation.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputTicketTranslation = new TicketTranslation(input);
console.log(inputTicketTranslation.solvePart1());
console.log(inputTicketTranslation.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
