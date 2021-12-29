const { test, input } = require('./6in');

const generation = (fishies, g) => {
    let currentFishies = fishies.slice();
    for (let i = 0; i < g; i++) {
        // console.log(i, currentFishies.join(' '))
        let newFishies = 0;
        currentFishies = currentFishies.map(f => {
            if (f > 0) return f - 1;
            newFishies++;
            return 6
        }).concat(new Array(newFishies).fill(8))
    }
    return currentFishies
}

const generationBig = (fishies, g) => {
    let pop = fishies.reduce((a, f) => { a[f]++; return a }, new Array(9).fill(0));
    for (let i = 0; i < g; i++) {
        let newFishies = pop[0];
        pop = pop.slice(1).concat([newFishies])
        pop[6] += newFishies
    }
    return pop.reduce((a, b) => a + b)
}

console.log(generationBig(input, 256))
// console.log(generation(input, 256).length)