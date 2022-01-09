// =============================  Advent of Code  =============================
// Runner Day 25 of 2021
// See https://adventofcode.com/${year}/day/25
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const Seafloor = require('./25');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./25.testcase').toString().trim();
const input = readFileSync('./25.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testSeafloor = new Seafloor(testCase);
console.log(testSeafloor.solvePart1());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputSeafloor = new Seafloor(input);
console.log(inputSeafloor.solvePart1());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
