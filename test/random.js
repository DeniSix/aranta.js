
var should = require('should')

var aranta = require('../index')
  , Random = aranta.Random
  , LinearCongruential = aranta.Algo.LinearCongruential
  , random = new Random(new LinearCongruential)

describe('Random', function () {
  it('should throw error when algorithm is not specified', function () {
    (function () {
      new Random()
    }).should.throwError('No PRNG algorithm specified.')
  })

  describe('.int()', function () {
    it('should return integer', function () {
      (random.int() % 1).should.equal(0)
    })

    it('should return integer below 1000', function () {
      random.int(1000).should.be.below(1000)
    })
  })

  describe('.float()', function () {
    it('should return float', function () {
      // TODO: can fail?
      (random.float() % 1).should.not.be.equal(0)
      random.float().should.be.within(0.0, 1.0)
    })
  })

  describe('.bool()', function () {
    it('should return boolean', function () {
      random.bool().should.be.a('boolean')
    })

    it('should be false', function () {
      random.bool(0).should.be.false
    })

    it('should be true', function () {
      random.bool(100).should.be.true
    })
  })
})
