// =============================  Advent of Code  =============================
// Runner Day 12 of 2015
// See https://adventofcode.com/2015/day/12
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const JSAbacusFrameworkio = require('./12');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./12.testcase').toString().trim();
const input = readFileSync('./12.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testJSAbacusFrameworkio = new JSAbacusFrameworkio(testCase);
console.log(testJSAbacusFrameworkio.solvePart1());
console.log(testJSAbacusFrameworkio.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputJSAbacusFrameworkio = new JSAbacusFrameworkio(input);
console.log(inputJSAbacusFrameworkio.solvePart1());
console.log(inputJSAbacusFrameworkio.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
