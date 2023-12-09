// =============================  Advent of Code  =============================
// Runner Day 5 of 2015
// See https://adventofcode.com/2015/day/5
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const DoesntHeHaveInternElvesForThis = require('./5');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./5.testcase').toString().trim();
const input = readFileSync('./5.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testDoesntHeHaveInternElvesForThis = new DoesntHeHaveInternElvesForThis(testCase);
console.log(testDoesntHeHaveInternElvesForThis.solvePart1());
// console.log(testDoesntHeHaveInternElvesForThis.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputDoesntHeHaveInternElvesForThis = new DoesntHeHaveInternElvesForThis(input);
console.log(inputDoesntHeHaveInternElvesForThis.solvePart1());
console.log(inputDoesntHeHaveInternElvesForThis.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
