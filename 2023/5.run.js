// =============================  Advent of Code  =============================
// Runner Day 5 of 2023
// See https://adventofcode.com/2023/day/5
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const IfYouGiveASeedAFertilizer = require('./5');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./5.testcase').toString().trim();
const input = readFileSync('./5.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testIfYouGiveASeedAFertilizer = new IfYouGiveASeedAFertilizer(testCase);
console.log(testIfYouGiveASeedAFertilizer.solvePart1());
console.log(testIfYouGiveASeedAFertilizer.solvePart2Brute());
// console.log(testIfYouGiveASeedAFertilizer.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputIfYouGiveASeedAFertilizer = new IfYouGiveASeedAFertilizer(input);
console.log(inputIfYouGiveASeedAFertilizer.solvePart1());
console.log(inputIfYouGiveASeedAFertilizer.solvePart2Brute());
// console.log(inputIfYouGiveASeedAFertilizer.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
