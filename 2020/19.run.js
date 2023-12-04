// =============================  Advent of Code  =============================
// Runner Day 19 of 2020
// See https://adventofcode.com/2020/day/19
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const MonsterMessages = require('./19');

const formatBold = (str) => `\x1b[1m${str}\x1b[0m`;

const testCase = readFileSync('./19.testcase').toString().trim();
const input = readFileSync('./19.input').toString().trim();

console.log(formatBold('Testcase'));

const testCaseStart = Date.now();

const testMonsterMessages = new MonsterMessages(testCase);
console.log(testMonsterMessages.solvePart1());
console.log(testMonsterMessages.solvePart2());

console.log((formatBold(Date.now() - testCaseStart) + 'ms'));

console.log(formatBold('\nTask'));

const taskStart = Date.now();

const inputMonsterMessages = new MonsterMessages(input);
console.log(inputMonsterMessages.solvePart1());
console.log(inputMonsterMessages.solvePart2());

console.log((formatBold(Date.now() - taskStart) + 'ms'));
