// =============================  Advent of Code  =============================
// Solution Day 21 of 2020
// See https://adventofcode.com/2020/day/21

class Food {
	constructor(str) {
		const [_, ingredientStr, allergenStr] = str
			.match(/([^()]*) (?:\(contains (.*)\))?/);
		this.ingredients = ingredientStr.split(' ');
		this.allergens = allergenStr?.split(', ') || [];
	}

	contains(prop, val) {
		return this[prop].some((v) => v === val);
	}

	getUnknownIngredients(known) {
		return this.ingredients.filter((ing) => !(ing in known));
	}
}

module.exports = class AllergenAssessment {
	/**
	 * @param {string} str
	 */
	constructor(str) {
		this.str = str;
		this.foods = str.split('\n')
			.map((foodStr) => new Food(foodStr));
	}

	solvePart1() {
		const removeDuplicates = (arr) => Array.from(new Set(arr));
		const {
			ingredients: allIngredients,
			allergens: allAllergens,
		} = this.foods.reduce((acc, b) => ({
			ingredients: removeDuplicates([
				...acc.ingredients,
				...b.ingredients,
			]),
			allergens: removeDuplicates([
				...acc.allergens,
				...b.allergens,
			]),
		}));
		const known = {};
		let consideredAllergens = allAllergens;
		while (consideredAllergens.length) {
			const oldLength = consideredAllergens.length;
			// strat 1: get unique
			consideredAllergens = consideredAllergens.filter((allergen) => {
				const containingFoods = this.foods
					.filter((food) => food.contains('allergens', allergen));
				const commonIngredients = containingFoods.map((f) => f.getUnknownIngredients(known))
					.reduce((a, b) => a.filter((ing) => b.some((i) => i === ing)));
				if (commonIngredients.length === 1) {
					known[commonIngredients[0]] = allergen;
					return false;
				}
				return true;
			});
			if (consideredAllergens.length === oldLength) throw new Error(`Stalled at ${oldLength}`);
		}

		// get sum
		return allIngredients
			.filter((ing) => !(ing in known))
			.map((ing) => this.foods.filter((food) => food.contains('ingredients', ing)).length)
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		const removeDuplicates = (arr) => Array.from(new Set(arr));
		const {
			// ingredients: allIngredients,
			allergens: allAllergens,
		} = this.foods.reduce((acc, b) => ({
			// ingredients: removeDuplicates([
			// 	...acc.ingredients,
			// 	...b.ingredients,
			// ]),
			allergens: removeDuplicates([
				...acc.allergens,
				...b.allergens,
			]),
		}));
		const known = {};
		let consideredAllergens = allAllergens;
		while (consideredAllergens.length) {
			const oldLength = consideredAllergens.length;
			// strat 1: get unique
			consideredAllergens = consideredAllergens.filter((allergen) => {
				const containingFoods = this.foods
					.filter((food) => food.contains('allergens', allergen));
				const commonIngredients = containingFoods.map((f) => f.getUnknownIngredients(known))
					.reduce((a, b) => a.filter((ing) => b.some((i) => i === ing)));
				if (commonIngredients.length === 1) {
					known[commonIngredients[0]] = allergen;
					return false;
				}
				return true;
			});
			if (consideredAllergens.length === oldLength) throw new Error(`Stalled at ${oldLength}`);
		}

		// get sum
		return Object.entries(known).sort((a, b) => a[1].localeCompare(b[1]))
			.map(([ing]) => ing)
			.join(',');
	}
};
