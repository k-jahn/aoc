// =============================  Advent of Code  =============================
// Runner Day 7 of 2020
// See https://adventofcode.com/2020/day/7
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const Haversacks = require('./7');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./7.testcase').toString().trim();
const input = readFileSync('./7.input').toString().trim();

console.log(formatBold('TestCase'));

const testHaversacks = new Haversacks(testCase);
console.log(testHaversacks.solvePart1());
console.log(testHaversacks.solvePart2());

console.log(formatBold('\nTask'));

const inputHaversacks = new Haversacks(input);
console.log(inputHaversacks.solvePart1());
console.log(inputHaversacks.solvePart2());
