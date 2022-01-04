// =============================  Advent of Code  =============================
// Solution Day 1 of 2020
// See https://adventofcode.com/2020/day/1

const { readFileSync } = require('fs');

const testCase = readFileSync('./1.testcase').toString().trim();
const input = readFileSync('./1.input').toString().trim();

class Expense {
	constructor(str) {
		this.expenses = str.split('\n').map((l) => +l);
	}

	solvePart1() {
		for (let i = 0; i < this.expenses.length - 1; i++) {
			for (let j = i + 1; j < this.expenses.length; j++) {
				if (this.expenses[i] + this.expenses[j] === 2020) {
					return this.expenses[i] * this.expenses[j];
				}
			}
		}
		return null;
	}

	solvePart2() {
		for (let i = 0; i < this.expenses.length - 1; i++) {
			for (let j = i + 1; j < this.expenses.length; j++) {
				for (let k = j + 1; k < this.expenses.length; k++) {
					if (this.expenses[i] + this.expenses[j] + this.expenses[k] === 2020) {
						return this.expenses[i] * this.expenses[j] * this.expenses[k];
					}
				}
			}
		}
		return this.str;
	}
}

const testExpense = new Expense(testCase);
// console.log(testExpense.solvePart1());
console.log(testExpense.solvePart2());

const inputExpense = new Expense(input);
// console.log(inputExpense.solvePart1());
console.log(inputExpense.solvePart2());
