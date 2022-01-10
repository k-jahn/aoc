// =============================  Advent of Code  =============================
// Solution Day 16 of 2020
// See https://adventofcode.com/2020/day/16

module.exports = class TicketTranslation {
	constructor(str) {
		const [rulesStr, myTicketStr, nearbyTicketStr] = str.split(/\n\n[a-z ]+:\n/g);
		this.rules = rulesStr.split('\n')
			.map((l) => {
				const [_, name, x1, x2, y1, y2] = l.match(/^([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)$/);
				return {
					name,
					validator: (num) => (num >= +x1 && num <= +x2) || (num >= +y1 && num <= +y2),
				};
			});
		this.myTicket = myTicketStr.split(',').map((d) => +d);
		this.nearbyTickets = nearbyTicketStr.split('\n')
			.map((l) => l.split(',').map((d) => +d));
	}

	solvePart1() {
		return this.nearbyTickets.reduce((a, t) => {
			const invalidFields = t.filter((val) => !this.rules.some((r) => r.validator(val)))
				.reduce((ac, b) => ac + b, 0);
			return a + invalidFields;
		}, 0);
	}

	solvePart2() {
		const validTickets = this.nearbyTickets
			.filter((ticket) => !ticket.some((val) => !this.rules.some((r) => r.validator(val))));
		let fieldRuleCandidates = this.myTicket
			.map((_, i) => this.rules.filter((r) => validTickets.every((t) => r.validator(t[i]))))
			.map((cans) => ({ finished: false, cans }));
		while (fieldRuleCandidates.some((rc) => !rc.finished)) {
			const nR = fieldRuleCandidates.find((rc) => !rc.finished && rc.cans.length === 1);
			if (!nR) throw new Error();
			nR.finished = true;
			fieldRuleCandidates = fieldRuleCandidates
				.map((rc) => {
					if (!rc.finished) {
						return {
							...rc,
							cans: rc.cans.filter((r) => r.name !== nR.cans[0].name),
						};
					}
					return rc;
				});
		}
		const fields = fieldRuleCandidates.map((rc) => rc.cans[0].name);
		return this.myTicket.filter((_, i) => /^departure/.test(fields[i]))
			.reduce((a, b) => a * b, 1);
	}
};
