
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
 *
 * Options:
 *
 *   - `multiplier`
 *   - `increment`
 */

function LinearCongruential(seed, options) {
  options = options || {}

  // Default values from ANSI C
  this._multiplier = options.multiplier || 22695477
  this._increment = options.increment || 1

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
  return this._prev = (this._multiplier * this._prev + this._increment) % MAX_UINT32
}
