
/**
 * https://en.wikipedia.org/wiki/Pearson%27s_chi-squared_test
 */

var chi = require('chi-square')
  , aranta = require('../index')

function calculateChiSquare(algo) {
  var BUF_SIZE = 8192
    , PASSES_COUNT = 512

  var random = new aranta.Random(new algo)
    , buf = new Buffer(BUF_SIZE)
    , avg = 0

  for (var k = 0; k < PASSES_COUNT; k++) {
    for (var i = 0; i < BUF_SIZE; i++) {
      buf.writeUInt8(random.int(255), i)
    }

    avg += chi.calculate(buf)
  }

  return avg / PASSES_COUNT
}

describe('Randomness of', function () {
  for (var name in aranta.Algo) {
    describe(name, function () {
      var algo = aranta.Algo[name]
      it('should be near 0.5', function () {
        calculateChiSquare(algo).should.be.within(0.3, 0.7)
      })
    })
  }
})
