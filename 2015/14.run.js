// =============================  Advent of Code  =============================
// Runner Day 14 of 2015
// See https://adventofcode.com/2015/day/14
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const ReindeerOlympics = require('./14');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./14.testcase').toString().trim();
const input = readFileSync('./14.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

// const testReindeerOlympics = new ReindeerOlympics(testCase);
// console.log(testReindeerOlympics.solvePart1());
// console.log(testReindeerOlympics.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputReindeerOlympics = new ReindeerOlympics(input);
console.log(inputReindeerOlympics.solvePart1());
console.log(inputReindeerOlympics.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
