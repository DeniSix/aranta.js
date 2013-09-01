
/**
 * See https://en.wikipedia.org/wiki/Linear_congruential_generator
 */

/**
 * Expose `LinearCongruential`.
 */

module.exports = LinearCongruential

/**
 * Int32 max value.
 */

var MAX_UINT32 = 0xffffffff

/**
 * Setup new Linear Congruential random generator with `seed`.
 *
 * @param {Number} [seed] initial seed
 */

function LinearCongruential(seed) {
  this._seed = (typeof seed !== 'undefined') ? seed : Date.now()

  this.reset()
}

/**
 * Reset state with optional `seed`.
 *
 * @param {Number} [seed]
 * @api public
 */

LinearCongruential.prototype.reset = function(seed) {
  if (arguments.length > 0) this._seed = seed

  this._prev = this._seed % MAX_UINT32
}

/**
 * Get next pseudorandom number.
 *
 * @api public
 */

LinearCongruential.prototype.next = function() {
  return this._prev = (1103515245 * this._prev + 12345) % MAX_UINT32
}
