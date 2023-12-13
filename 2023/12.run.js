// =============================  Advent of Code  =============================
// Runner Day 12 of 2023
// See https://adventofcode.com/2023/day/12
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const HotSprings = require('./12');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./12.testcase').toString().trim();
const input = readFileSync('./12.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testHotSprings = new HotSprings(testCase);
// console.log(testHotSprings.solvePart1());
// console.log(testHotSprings.solvePart1Efficient());
console.log(testHotSprings.solvePart2());
// console.log(testHotSprings.solvePart2Control());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputHotSprings = new HotSprings(input);
// console.log(inputHotSprings.solvePart1());
// console.log(inputHotSprings.solvePart1Efficient());
// console.log(inputHotSprings.solvePart1Efficient());
// console.log(inputHotSprings.solvePart1Efficient());
console.log(inputHotSprings.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
