// =============================  Advent of Code  =============================
// Runner Day 1 of 2023
// See https://adventofcode.com/2023/day/1
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const Trebuchet = require('./1');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./1.testcase').toString().trim();
const input = readFileSync('./1.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testTrebuchet = new Trebuchet(testCase);
// console.log(testTrebuchet.solvePart1());
console.log(testTrebuchet.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputTrebuchet = new Trebuchet(input);
// console.log(inputTrebuchet.solvePart1());
console.log(inputTrebuchet.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
