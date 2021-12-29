const { test, input } = require('./5in');

const parse = str => str.split('\n')
    .map(e => e.split(' -> ').map(f => f.split(',').map(g => +g)));


class Map {
    constructor() {
        this.m = [[0]]
    }
    incrementVal(x, y) {
        this.extend(Math.max(x, y))

        this.m[x] = this.m[x].map((e, i) => i == y ? e + 1 : e)
    }
    extend(n) {
        while (this.m.length < n + 2) {
            this.m = this.m.map(l => l.concat([0]))
            this.m = this.m.concat([new Array(this.m[0].length).fill(0)])
        }
    }
    toString() {
        return this.m.map(l => l.map(e => ('   ' + e).slice(-2)).join('')).join('\n')
    }
    amountDanger() {
        return this.m.map(l => l.reduce((a, e) => e > 1 ? a + 1 : a, 0))
            .reduce((a, e) => a + e)
    }
}
function mapDanger(str) {

    const map = new Map()

    const lines = parse(str);

    lines.forEach(e => {
        const vInc = [e[1][0] - e[0][0], e[1][1] - e[0][1]].map(d=> Math.abs(d) ? d / Math.abs(d) : 0)
        let curr = e[0].slice()
        map.incrementVal(...curr)
        while (curr[0] != e[1][0] || curr[1] != e[1][1]) {
            curr = [curr[0]+vInc[0], curr[1] + vInc[1]];
            map.incrementVal(...curr)
        }
    });
    return map.amountDanger();
}

console.log(mapDanger(input))