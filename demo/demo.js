
var CANVAS_SIZE = 512

var algos =
    { MersenneTwister    : new aranta.Random(new aranta.Algo.MersenneTwister)
    , LaggedFibonacci    : new aranta.Random(new aranta.Algo.LaggedFibonacci)
    , LinearCongruential : new aranta.Random(new aranta.Algo.LinearCongruential)
    }

window.drawPoints = function (elem) {
  var random = algos[elem.id]
  var ctx = document.getElementById('canvas').getContext('2d')

  for (var i = 0; i < 4096; i++) {
    var x = random.int(CANVAS_SIZE)
    var y = random.int(CANVAS_SIZE)

    ctx.beginPath();
    ctx.fillStyle = "black"
    ctx.fillRect(x, y, 1, 1)
    ctx.closePath()
  }
}

window.clearCanvas = function () {
  var ctx = document.getElementById('canvas').getContext('2d')

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
}

window.onload = function () {
  var c = document.getElementById('canvas')

  c.width = CANVAS_SIZE
  c.height = CANVAS_SIZE
  c.style.width = CANVAS_SIZE  + 'px'
  c.style.height = CANVAS_SIZE + 'px'
}
