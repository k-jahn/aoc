const { test, input } = require('./7in')

const getMedian = (crabs) => {
    const c = crabs.slice()
    c.sort((a, b) => a - b)
    const median = c[~~(c.length / 2 - 0.5)]
    return {
        median,
        sum: c.reduce((a, e) => a + Math.abs(e - median), 0)
    }
}

const steps = n => n * (n + 1) / 2

const getAverage = (crabs) => {
    const c = crabs.slice()
    const avr = Math.round((c.reduce((a, b) => a + b) / c.length))
    console.log([-2,-1,0,1,2].map(off=>c.reduce((a, e) => a + steps(Math.abs(e - avr+off)), 0)))
    return {
        avr,
        sum: c.reduce((a, e) => a + steps(Math.abs(e - avr)), 0)
    }
}

// actually rounding error

console.log(getAverage(input))