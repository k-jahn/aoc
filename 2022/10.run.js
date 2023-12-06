// =============================  Advent of Code  =============================
// Runner Day 10 of 2022
// See https://adventofcode.com/2022/day/10
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const CathodeRayTube = require('./10');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./10.testcase').toString().trim();
const input = readFileSync('./10.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testCathodeRayTube = new CathodeRayTube(testCase);
console.log(testCathodeRayTube.solvePart1());
console.log(testCathodeRayTube.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputCathodeRayTube = new CathodeRayTube(input);
console.log(inputCathodeRayTube.solvePart1());
console.log(inputCathodeRayTube.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
