// =============================  Advent of Code  =============================
// Runner Day 9 of 2023
// See https://adventofcode.com/2023/day/9
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const MirageMaintenance = require('./9');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./9.testcase').toString().trim();
const input = readFileSync('./9.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testMirageMaintenance = new MirageMaintenance(testCase);
console.log(testMirageMaintenance.solvePart1());
console.log(testMirageMaintenance.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputMirageMaintenance = new MirageMaintenance(input);
console.log(inputMirageMaintenance.solvePart1());
console.log(inputMirageMaintenance.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
