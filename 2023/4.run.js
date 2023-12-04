// =============================  Advent of Code  =============================
// Runner Day 4 of 2023
// See https://adventofcode.com/2023/day/4
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const Scratchcards = require('./4');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./4.testcase').toString().trim();
const input = readFileSync('./4.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testScratchcards = new Scratchcards(testCase);
console.log(testScratchcards.solvePart1());
console.log(testScratchcards.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputScratchcards = new Scratchcards(input);
console.log(inputScratchcards.solvePart1());
console.log(inputScratchcards.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
