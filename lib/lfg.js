
/**
 * See https://en.wikipedia.org/wiki/Lagged_Fibonacci_generator
 */

/**
 * Expose `LaggedFibonacci`.
 */

module.exports = LaggedFibonacci

/**
 * Int32 max value.
 */

var MAX_UINT32 = 0xffffffff

/**
 * Setup new Lagged Fibonacci random generator with `options`.
 *
 * @param {Number} [seed] initial seed
 *
 * Options:
 *
 *   - `j` min lag
 *   - `k` max lag
 */

function LaggedFibonacci(seed, options) {
  options = options || {}

  // Lags
  this._lagJ = options.j || 24
  this._lagK = options.k || 55

  this._seed = (typeof seed !== 'undefined') ? seed : Date.now()
  this._history = new Array(this._lagK)

  this.reset()
}

/**
 * Reset state with optional `seed`.
 *
 * @param {Number} [seed]
 * @api public
 */

LaggedFibonacci.prototype.reset = function (seed) {
  if (arguments.length > 0) this._seed = seed

  this._index = 0

  /**
   * `Linear congruential generator` used to fill initial LFG history.
   * P.S.: constants (3, 257, MAX_UINT32) are brazely stolen from FreeCiv.
   */

  this._history[0] = this._seed % MAX_UINT32
  for (var i = 1; i < this._lagK; i++) {
    this._history[i] = (3 * this._history[i-1] + 257) % MAX_UINT32
  }
}

/**
 * Get next pseudorandom number.
 *
 * @api public
 */

LaggedFibonacci.prototype.next = function() {
  var result = (this._getHistory(this._lagJ) + this._getHistory(this._lagK)) % MAX_UINT32

  this._history[this._index++] = result
  if (this._index >= this._history.length) this._index = 0

  return result
}

/**
 * Get (index - n) history element.
 *
 * @api private
 */

LaggedFibonacci.prototype._getHistory = function (n) {
  var i = this._index - n
  if (i < 0) i += this._history.length
  return this._history[i]
}
