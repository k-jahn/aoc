// =============================  Advent of Code  =============================
// Solution Day 13 of 2020
// See https://adventofcode.com/2020/day/13
const primes = (function getPrimes(n) {
	const sieve = new Array(n + 1).fill(true);
	const out = [];
	for (let i = 2; i < sieve.length; i++) {
		if (sieve[i]) {
			out.push(i);
			for (let j = 2 * i; j < sieve.length; j += i) sieve[j] = false;
		}
	}
	return out;
}(2000));

module.exports = class ShuttleSearch {
	constructor(str) {
		const [arrival, busses] = str.split('\n');
		this.arrival = +arrival;
		this.busses = busses.split(',')
			.map((b, i) => ({ index: i, id: parseInt(b, 10) }))
			.filter((b) => !Number.isNaN(b.id));
	}

	getLCM(arr) {
		return arr.map((e) => this.getPrimeFactors(e))
			.reduce((a, e) => new Array(Math.max(a.length, e.length)).fill(null)
				.map((_, i) => Math.max(a[i] || 0, e[i] || 0)), [])
			.map((e, i) => primes[i] ** e)
			.reduce((a, b) => a * b, 1);
	}

	getPrimeFactors(n) {
		let m = n;
		const out = [];
		for (let i = 0; m > 1; i++) {
			const p = primes[i];
			let pow = 0;
			while (m % p === 0) {
				m /= p;
				pow++;
			}
			out.push(pow);
		}
		return out;
	}

	solvePart1() {
		const fastest = this.busses.map((b) => ({ ...b, wait: b.id - (this.arrival % b.id) }))
			.reduce((a, b) => (a.wait < b.wait ? a : b));
		return fastest.id * fastest.wait;
	}

	solvePart2() {
		let n = this.busses[0].id;
		for (let i = 1; i < this.busses.length; i++) {
			const bus = this.busses[i];
			const lcm = this.getLCM(this.busses.map((b) => b.id).slice(0, i));
			while (bus.id - (n % bus.id) !== bus.index % bus.id) {
				n += lcm;
			}
		}
		return n;
	}
};
