// =============================  Advent of Code  =============================
// Runner Day 21 of 2020
// See https://adventofcode.com/2020/day/21
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const AllergenAssessment = require('./21');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./21.testcase').toString().trim();
const input = readFileSync('./21.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testAllergenAssessment = new AllergenAssessment(testCase);
console.log(testAllergenAssessment.solvePart1());
console.log(testAllergenAssessment.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputAllergenAssessment = new AllergenAssessment(input);
console.log(inputAllergenAssessment.solvePart1());
console.log(inputAllergenAssessment.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
