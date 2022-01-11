// =============================  Advent of Code  =============================
// Runner Day 14 of 2020
// See https://adventofcode.com/2020/day/14
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const DockingData = require('./14');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./14.testcase').toString().trim();
const input = readFileSync('./14.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testDockingData = new DockingData(testCase);
console.log(testDockingData.solvePart1());
console.log(testDockingData.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputDockingData = new DockingData(input);
console.log(inputDockingData.solvePart1());
console.log(inputDockingData.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
