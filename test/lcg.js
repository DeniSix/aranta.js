
var aranta = require('../index')
  , Random = aranta.Random
  , LinearCongruential = aranta.Algo.LinearCongruential

describe('LinearCongruential', function () {
  it('should return the same numbers', function () {
    var rand1 = new Random(new LinearCongruential(12345))
      , rand2 = new Random(new LinearCongruential(12345))

    for (var i = 0; i < 512; i++) rand1.int().should.equal(rand2.int())
  })

  it('should return the same numbers after reset', function () {
    var rand = new Random(new LinearCongruential(12345))
      , num1 = []
      , num2 = []

    for (var i = 0; i < 512; i++) num1.push(rand.int())
    rand.reset(12345)
    for (var i = 0; i < 512; i++) num2.push(rand.int())

    num1.should.eql(num2)
  })
})
