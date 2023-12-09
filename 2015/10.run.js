// =============================  Advent of Code  =============================
// Runner Day 10 of 2015
// See https://adventofcode.com/2015/day/10
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const ElvesLookElvesSay = require('./10');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./10.testcase').toString().trim();
const input = readFileSync('./10.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testElvesLookElvesSay = new ElvesLookElvesSay(testCase);
console.log(testElvesLookElvesSay.solvePart1());
// console.log(testElvesLookElvesSay.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputElvesLookElvesSay = new ElvesLookElvesSay(input);
console.log(inputElvesLookElvesSay.solvePart1());
console.log(inputElvesLookElvesSay.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
