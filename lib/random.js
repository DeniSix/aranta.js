
/**
 * Expose `Random`.
 */

module.exports = Random

/**
 * Setup new `Random` with specified algorithm.
 *
 * @param {Object} algo
 */

function Random(algo) {
  this._algo = algo
  if (typeof this._algo === 'undefined') throw new Error('No PRNG algorithm specified.')
}

/**
 * Get random integer on interval [0, max].
 *
 * @api public
 * @param {Number} [max] High boundary. Default: 0xffffffff.
 */

Random.prototype.int = function(max) {
  res = this._algo.next()

  if (arguments.length > 0) res = res % (max + 1)

  return res
}

/**
 * Get random float value on interval [0.0, 1.0].
 *
 * @api public
 */

Random.prototype.float = function() {
  return this.int() * (1.0 / 4294967295.0)
}

/**
 * Get random boolean value.
 *
 * @param {Number} [chance] Probability of success (`true`). Default: 50.
 * @api public
 */

Random.prototype.bool = function(chance) {
  if (typeof chance === 'undefined') chance = 50
  if (chance < 0) chance = 0
  if (chance > 100) chance = 100

  return this.float() * 100 < chance
}

/**
 * Reset generator state with optional `seed`.
 *
 * @param {Number} [seed]
 * @api public
 */

Random.prototype.reset = function(seed) {
  this._algo.reset(seed)
}
