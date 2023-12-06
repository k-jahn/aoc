// =============================  Advent of Code  =============================
// Runner Day 18 of 2020
// See https://adventofcode.com/2020/day/18
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const OperationOrder = require('./18');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./18.testcase').toString().trim();
const input = readFileSync('./18.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testOperationOrder = new OperationOrder(testCase);
console.log(testOperationOrder.solvePart1());
console.log(testOperationOrder.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputOperationOrder = new OperationOrder(input);
console.log(inputOperationOrder.solvePart1());
console.log(inputOperationOrder.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
