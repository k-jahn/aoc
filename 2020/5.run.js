// =============================  Advent of Code  =============================
// Runner Day 5 of 2020
// See https://adventofcode.com/2020/day/5
/* eslint-disable no-unused-vars */

const { readFileSync } = require('fs');

const BinBoarding = require('./5');

const testCase = readFileSync('./5.testcase').toString().trim();
const input = readFileSync('./5.input').toString().trim();

const testBinBoarding = new BinBoarding(testCase);
console.log(testBinBoarding.solvePart1());
// console.log(testBinBoarding.solvePart2());

const inputBinBoarding = new BinBoarding(input);
console.log(inputBinBoarding.solvePart1());
console.log(inputBinBoarding.solvePart2());
