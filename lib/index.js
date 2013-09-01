
exports = module.exports

exports.Random = require('./random')

exports.Algo = {}
exports.Algo.MersenneTwister = require('./mt')
exports.Algo.LaggedFibonacci = require('./lfg')
exports.Algo.LinearCongruential = require('./lcg')
