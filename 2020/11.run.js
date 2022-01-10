// =============================  Advent of Code  =============================
// Runner Day 11 of 2020
// See https://adventofcode.com/2020/day/11
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const Seating = require('./11');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./11.testcase').toString().trim();
const input = readFileSync('./11.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testSeating = new Seating(testCase);
// console.log(testSeating.solvePart1());
console.log(testSeating.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputSeating = new Seating(input);
// console.log(inputSeating.solvePart1());
console.log(inputSeating.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
