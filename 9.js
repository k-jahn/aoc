const { test } = require('./9.input')



class Map {
    constructor(str) {
        this.m = str.split('\n').map(l => l.split(''));
    }
    getMinima() {
        const out = [];
        for (let i =0; i < m.length; i++) {
            for (let j=0; j<m[i].length; j++) {
                if (this.isMinimum(i,j)) {
                    out.push([i,j])
                }
            }
        }
        return out;
    }
    isMinimum(x,y) {
        return [x-1, x+1].every(u=> {
            return (u in this.m) ? [y-1, y+1].every(v=> {
                return (v in this.m[u]) ?  this.m[u][v] > this.m[x][y] : true;
            }) :  true;
        })
    }
}

const testMap = new Map(test);

console.log(testMap)