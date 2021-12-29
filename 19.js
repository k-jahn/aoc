const { input, test } = require('./19.input');

// mathutils
const addVec = (vec1, vec2) => vec1.map((_, i) => vec1[i] + vec2[i])
const subtractVec = (vec1, vec2) => vec1.map((_, i) => vec1[i] - vec2[i])
const dotProd = (vec1, vec2) => vec1.reduce((a, _, i) => a + vec1[i] * vec2[i], 0)
const matrixProd = (matrix, vec) => matrix.map(e => dotProd(e, vec));



// hack all day
const rotMatrixSet = (function () {
    const set = [];
    for (let i = 1; i <= 3; i++) {
        for (let signI = -1; signI <= 1; signI += 2) {
            for (let j = 1; j <= 3; j++) {
                if (j == i) continue;
                for (let signJ = -1; signJ <= 1; signJ += 2) {
                    const k = [1, 2, 3].find(e => e != i && e != j);
                    // check permutation for last sign
                    const signK = (i + 1 == j || (i == 3 && j == 1)) ? signI * signJ : -signI * signJ;
                    // build matrix
                    set.push([
                        new Array(3).fill().map((_, p) => p == i - 1 ? signI : 0),
                        new Array(3).fill().map((_, p) => p == j - 1 ? signJ : 0),
                        new Array(3).fill().map((_, p) => p == k - 1 ? signK : 0),
                    ]);
                }
            }
        }
    }
    return set;
})();

class Coordinates {
    constructor(raw) {
        if (!Array.isArray(raw) || !raw.every(e => Array.isArray(e) && e.length == 3 && e.every(d => typeof d == 'number'))) {
            debugger
            throw new TypeError('bad raw data')
        }
        this.coo = raw;
    }
    get length() {
        return this.coo.length
    }
    //helpers
    rotated(rotMatrix) {
        return new Coordinates(this.coo.map(e => matrixProd(rotMatrix, e)))
    }
    translated(offSet) {
        return new Coordinates(this.coo.map(e => addVec(e, offSet)));
    }
    centeredOnBeacon(n) {
        return this.translated(subtractVec([0, 0, 0], this.coo[n]))
    }
    get(i) {
        return this.coo[i];
    }
    // check for 12 matches
    matches(coordinates) {
        let matches = 0;
        for (let i = 0; i < coordinates.length; i++) {
            for (let j = 0; j < this.coo.length; j++) {
                const [a, b] = [coordinates.get(i), this.get(j)];
                if (a.every((_, k) => a[k] == b[k])) {
                    matches++
                    if (matches >=12) {
                        return true;
                    }
                }
            }
            if (coordinates.length - i -1 < 12 - matches) break
        }
        return false;
    }
    add(coordinates) {
        const uniqueCoords = [];
        for (let i = 0; i < coordinates.length; i++) {
            const a = coordinates.get(i);
            if (this.coo.every(c => !c.every((_, k) => c[k] == a[k]))) {
                uniqueCoords.push(a)
            }
        }
        return new Coordinates([...this.coo, ...uniqueCoords])
    }
    common(coordinates) {
        const summedCoords = [];
        for (let i = 0; i < coordinates.length; i++) {
            for (let j = 0; j < this.coo.length; j++) {
                const [a, b] = [coordinates.get(i), this.get(j)];
                if (a.every((_, k) => a[k] == b[k])) {
                    summedCoords.push(coordinates.get(i));
                }
            }
        }
        return new Coordinates(summedCoords)
    }

}

class Scanner {
    constructor(beacons, i) {
        const isZero = i == 0;
        this.i = i;
        this.relCoordinates = new Coordinates(beacons);
        this.absCoordinates = isZero ? this.relCoordinates : null;
        this.offset = isZero ? [0, 0, 0] : null;
        this.rot = isZero ? [[1, 0, 0], [0, 1, 0], [0, 0, 1]] : null;
    }



    // pair with reference scanner
    pair(refScanner) {
        for (let i = 0; i < refScanner.absCoordinates.length; i++) {
            for (let j = 1; j < this.relCoordinates.length; j++) {
                const refCoords = refScanner.absCoordinates.centeredOnBeacon(i);
                const testCoords = this.relCoordinates.centeredOnBeacon(j);
                for (const rot of rotMatrixSet) {
                    const rotTestCoords = testCoords.rotated(rot);
                    if (refCoords.matches(rotTestCoords)) {
                        this.rot = rot
                        this.offset = subtractVec(refScanner.absCoordinates.get(i), this.relCoordinates.rotated(rot).get(j));
                        this.absCoordinates = this.relCoordinates.rotated(rot).translated(this.offset)
                        return true
                    }
                }
            }
        }
        return false;
    }
}

// input parser
const parser = str => {
    const rawScanners = str
        .split(/\n*--- scanner \d* ---\n*/g)
        .filter(e => e)
        .map(b => {
            return b.split('\n')
                .filter(e => e)
                .map(e => e.split(',').map(d => +d))
        })
    return rawScanners.map((b, i) => new Scanner(b, i));

}

const parsedTest = parser(test);
const parsedInput = parser(input)

function getAbsBeacons(scanners) {
    console.log(`\nSTARTING scanner matching, (1/${scanners.length})`)
    let paired = [scanners[0]];
    let lastPaired = [...paired];
    while (paired.length < scanners.length) {
        let unpaired = scanners.filter(s => !s.absCoordinates);
        let nextPaired = []
        for (let i = 0; i < unpaired.length; i++) {
            for (let j = 0; j < lastPaired.length; j++) {
                const [u, p] = [unpaired[i], lastPaired[j]];
                if (u.pair(p)) {
                    nextPaired.push(u)
                    paired.push(u);
                    console.log(`Match [${p.i+1},${u.i+1}], (${paired.length}/${scanners.length})`)
                    break;
                }
            }

        }
        if (!nextPaired.length) throw new Error('no more matches found')
        lastPaired = nextPaired;
    }
    console.log('FINISHED\n')
    return {
        scanners: scanners.map(e=>e.offset),
        beacons: scanners.reduce((a, e) => a.add(e.absCoordinates), new Coordinates([]))
    }
}

// const b = getAbsBeacons(parsedTest)
const c = getAbsBeacons(parsedInput)

const taxiCab = (a, b) => a.reduce((c, _, i) => c + Math.abs(a[i] - b[i]), 0)


const getDistance = (arr, comparator) => {
    let max = 0
    for (let i = 0; i < arr.length-1; i++) {
        for (let j = i; j<arr.length; j++) {
            const dist = comparator(arr[i],arr[j]);
            max = max < dist ? dist : max;
        }
    }
    return max
}




console.log(getDistance(c.scanners, taxiCab));
