// =============================  Advent of Code  =============================
// Solution Day 7 of 2022
// See https://adventofcode.com/2022/day/7

class Directory {
	constructor(name) {
		this.name = name;
		this.children = [];
	}

	add(child) {
		child.setParent(this);
		this.children.push(child);
	}

	getSize() {
		return this.children.reduce((a, child) => a + child.getSize(), 0);
	}

	getDirs() {
		const subDirs = this.children
			.reduce((a, child) => (child instanceof Directory ? [...a, ...child.getDirs()] : a), []);
		return [this, ...subDirs];
	}

	setParent(parent) {
		this.parent = parent;
	}
}

class File {
	constructor(name, size) {
		this.name = name;
		this.size = size;
	}

	getSize() {
		return this.size;
	}

	setParent(parent) {
		this.parent = parent;
	}
}

module.exports = class NoSpaceLeftOnDevice {
	constructor(str) {
		this.str = str;
		this.fs = new Directory('/');
		this.currentDir = this.fs;
		this.str
			.split('\n$ ')
			.slice(1)
			.forEach((c) => this.run(c));
	}

	run(cmd) {
		if (/^ls/.test(cmd)) {
			cmd.split('\n')
				.slice(1)
				.forEach((child) => {
					if (/^dir/.test(child)) {
						this.currentDir.add(new Directory(child.split(' ')[1]));
					} else {
						const [size, name] = child.split(' ');
						this.currentDir.add(new File(name, +size));
					}
				});
		} else if (/^cd/.test(cmd)) {
			const name = cmd.split(' ')[1];
			if (name !== '..') {
				this.currentDir = this.currentDir.children
					.find((child) => child.name === name && child instanceof Directory);
			} else {
				this.currentDir = this.currentDir.parent;
			}
		}
	}

	solvePart1() {
		return this.fs.getDirs()
			.map((dir) => dir.getSize())
			.filter((s) => s <= 100000)
			.reduce((a, b) => a + b);
	}

	solvePart2() {
		const needed = 30000000 - (70000000 - this.fs.getSize());
		return this.fs.getDirs()
			.map((dir) => dir.getSize())
			.filter((s) => s >= needed)
			.reduce((a, b) => (a > b ? b : a));
	}
};
