// =============================  Advent of Code  =============================
// Runner Day 8 of 2022
// See https://adventofcode.com/2022/day/8
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const TreetopTreeHouse = require('./8');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./8.testcase').toString().trim();
const input = readFileSync('./8.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testTreetopTreeHouse = new TreetopTreeHouse(testCase);
console.log(testTreetopTreeHouse.solvePart1());
console.log(testTreetopTreeHouse.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputTreetopTreeHouse = new TreetopTreeHouse(input);
console.log(inputTreetopTreeHouse.solvePart1());
console.log(inputTreetopTreeHouse.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
