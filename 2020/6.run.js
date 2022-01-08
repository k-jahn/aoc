// =============================  Advent of Code  =============================
// Runner Day 6 of 2020
// See https://adventofcode.com/2020/day/6
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const Customs = require('./6');

const testCase = readFileSync('./6.testcase').toString().trim();
const input = readFileSync('./6.input').toString().trim();

console.log('TestCase');
const testCustoms = new Customs(testCase);
console.log(testCustoms.solvePart1());
console.log(testCustoms.solvePart2());

console.log('\nTask');
const inputCustoms = new Customs(input);
console.log(inputCustoms.solvePart1());
console.log(inputCustoms.solvePart2());
