// =============================  Advent of Code  =============================
// Runner Day 3 of 2015
// See https://adventofcode.com/2015/day/3
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const PerfectlySphericalHousesInAVacuum = require('./3');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./3.testcase').toString().trim();
const input = readFileSync('./3.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testPerfectlySphericalHousesInAVacuum = new PerfectlySphericalHousesInAVacuum(testCase);
console.log(testPerfectlySphericalHousesInAVacuum.solvePart1());
console.log(testPerfectlySphericalHousesInAVacuum.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputPerfectlySphericalHousesInAVacuum = new PerfectlySphericalHousesInAVacuum(input);
console.log(inputPerfectlySphericalHousesInAVacuum.solvePart1());
console.log(inputPerfectlySphericalHousesInAVacuum.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
