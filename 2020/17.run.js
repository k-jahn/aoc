// =============================  Advent of Code  =============================
// Runner Day 17 of 2020
// See https://adventofcode.com/2020/day/17
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const ConwayCubes = require('./17');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./17.testcase').toString().trim();
const input = readFileSync('./17.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testConwayCubes = new ConwayCubes(testCase);
console.log(testConwayCubes.solvePart1());
// console.log(testConwayCubes.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputConwayCubes = new ConwayCubes(input);
console.log(inputConwayCubes.solvePart1());
// console.log(inputConwayCubes.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
