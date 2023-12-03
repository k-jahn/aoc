module.exports = {
	extends: ['airbnb-base'],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-tabs': 0,
		'no-plusplus': 0,
		'no-console': 0,
		'prefer-template': 0,
		'class-methods-use-this': 0,
		'max-classes-per-file': 0,
		'no-unused-vars': ['error', { args: 'after-used', varsIgnorePattern: '^_.*$' }],
		'no-lonely-if': 0,
	},
};
