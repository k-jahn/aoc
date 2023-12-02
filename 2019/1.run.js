// =============================  Advent of Code  =============================
// Runner Day 1 of 2019
// See https://adventofcode.com/2019/day/1
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const TheTyrannyOfTheRocketEquation = require('./1');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./1.testcase').toString().trim();
const input = readFileSync('./1.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testTheTyrannyOfTheRocketEquation = new TheTyrannyOfTheRocketEquation(testCase);
console.log(testTheTyrannyOfTheRocketEquation.solvePart1());
console.log(testTheTyrannyOfTheRocketEquation.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputTheTyrannyOfTheRocketEquation = new TheTyrannyOfTheRocketEquation(input);
console.log(inputTheTyrannyOfTheRocketEquation.solvePart1());
console.log(inputTheTyrannyOfTheRocketEquation.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
