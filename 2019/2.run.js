// =============================  Advent of Code  =============================
// Runner Day 2 of 2019
// See https://adventofcode.com/2019/day/2
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const OneTwoZeroOneProgramAlarm = require('./2');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./2.testcase').toString().trim();
const input = readFileSync('./2.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testOneTwoZeroOneProgramAlarm = new OneTwoZeroOneProgramAlarm(testCase);
// console.log(testOneTwoZeroOneProgramAlarm.solvePart1());
// console.log(testOneTwoZeroOneProgramAlarm.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputOneTwoZeroOneProgramAlarm = new OneTwoZeroOneProgramAlarm(input);
console.log(inputOneTwoZeroOneProgramAlarm.solvePart1());
console.log(inputOneTwoZeroOneProgramAlarm.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
