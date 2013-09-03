(function(e){if("function"==typeof bootstrap)bootstrap("aranta",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeAranta=e}else"undefined"!=typeof window?window.aranta=e():global.aranta=e()})(function(){var define,ses,bootstrap,module,exports;
return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

exports = module.exports

exports.Random = require('./random')

exports.Algo = {}
exports.Algo.MersenneTwister = require('./mt')
exports.Algo.LaggedFibonacci = require('./lfg')
exports.Algo.LinearCongruential = require('./lcg')

},{"./lcg":2,"./lfg":3,"./mt":4,"./random":5}],2:[function(require,module,exports){

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

},{}],3:[function(require,module,exports){

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

},{}],4:[function(require,module,exports){

/**
 * 31.08.2013 (DeniSix): Functions renamed to fit our requirements and removed unnecessary.
 *
 * From https://gist.github.com/banksean/300494
 */

/*
  I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.

  If you want to use this as a substitute for Math.random(), use the random()
  method like so:

  var m = new MersenneTwister();
  var randomNumber = m.random();

  You can also call the other genrand_{foo}() methods on the instance.

  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:

  var m = new MersenneTwister(123);

  and that will always produce the same random sequence.

  Sean McCullough (banksean@gmail.com)
*/

/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using reset(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

/**
 * Expose `MersenneTwister`.
 */

module.exports = MersenneTwister

function MersenneTwister(seed) {
  this._seed = (typeof seed !== 'undefined') ? seed : Date.now()

  /* Period parameters */
  this.N = 624;
  this.M = 397;
  this.MATRIX_A = 0x9908b0df;   /* constant vector a */
  this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
  this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

  this.mt = new Array(this.N); /* the array for the state vector */
  this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

  this.reset(this._seed);
}

/* initializes mt[N] with a seed */
MersenneTwister.prototype.reset = function(seed) {
  if (arguments.length > 0) this._seed = seed

  this.mt[0] = this._seed >>> 0;
  for (this.mti=1; this.mti<this.N; this.mti++) {
    var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
    this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + this.mti;
    /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
    /* In the previous versions, MSBs of the seed affect   */
    /* only MSBs of the array mt[].                        */
    /* 2002/01/09 modified by Makoto Matsumoto             */
    this.mt[this.mti] >>>= 0;
    /* for >32 bit machines */
  }
}

/* generates a random number on [0,0xffffffff]-interval */
MersenneTwister.prototype.next = function() {
  var y;
  var mag01 = new Array(0x0, this.MATRIX_A);
  /* mag01[x] = x * MATRIX_A  for x=0,1 */

  if (this.mti >= this.N) { /* generate N words at one time */
    var kk;

    for (kk=0;kk<this.N-this.M;kk++) {
      y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
      this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    for (;kk<this.N-1;kk++) {
      y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
      this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
    }
    y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
    this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

    this.mti = 0;
  }

  y = this.mt[this.mti++];

  /* Tempering */
  y ^= (y >>> 11);
  y ^= (y << 7) & 0x9d2c5680;
  y ^= (y << 15) & 0xefc60000;
  y ^= (y >>> 18);

  return y >>> 0;
}

/* These real versions are due to Isaku Wada, 2002/01/09 added */

},{}],5:[function(require,module,exports){

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

},{}]},{},[1])(1)
});
;