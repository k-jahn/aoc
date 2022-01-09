// =============================  Advent of Code  =============================
// Runner Day 9 of 2020
// See https://adventofcode.com/2020/day/9
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const Decrypter = require('./9');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./9.testcase').toString().trim();
const input = readFileSync('./9.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testDecrypter = new Decrypter(testCase);
// console.log(testDecrypter.solvePart1());
// console.log(testDecrypter.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputDecrypter = new Decrypter(input);
console.log(inputDecrypter.solvePart1());
console.log(inputDecrypter.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
