// =============================  Advent of Code  =============================
// Runner Day 4 of 2015
// See https://adventofcode.com/2015/day/4
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const TheIdealStockingStuffer = require('./4');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./4.testcase').toString().trim();
const input = readFileSync('./4.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testTheIdealStockingStuffer = new TheIdealStockingStuffer(testCase);
// console.log(testTheIdealStockingStuffer.solvePart1());
// console.log(testTheIdealStockingStuffer.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputTheIdealStockingStuffer = new TheIdealStockingStuffer(input);
console.log(inputTheIdealStockingStuffer.solvePart1());
console.log(inputTheIdealStockingStuffer.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
