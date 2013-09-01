# Aranta.js

Simple and flexible randomization framework.

[![Build Status](https://travis-ci.org/DeniSix/aranta.js.png)](https://travis-ci.org/DeniSix/aranta.js)

## Installation

via npm:

    $ npm install aranta

via bower:

    $ bower install aranta

## Quck usage

in node.js:

```js
var aranta = require('aranta')

var random = new aranta.Random(new aranta.Algo.LinearCongruential())
console.log(random.int())
console.log(random.bool())
console.log(random.float())
```

in browser:

```js
var random = new aranta.Random(new aranta.Algo.LinearCongruential())
console.log(random.int())
```

or you can use it with [RequireJS](http://www.requirejs.org/), [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) and [LMD](https://github.com/azproduction/lmd) (i love it :kissing_closed_eyes:). For more info see how [Browserify](http://browserify.org/) works.

## Random

The main class for usage in your apps.

  - `.constructor(algo)` Create new `Random` instance with specified algorithm.
  - `.int(max)` Get random integer on interval [0, max]. Default `max`: 0xffffffff.
  - `.float()` Get random float value on interval [0.0, 1.0].
  - `.bool(chance)` Get random boolean value with specified probability. Default `chance`: 50.
  - `.reset()` Reset generator state with optional `seed`.

## Algorithms

All algos have identical consrtuctors with optional parameters:

`.constructor([seed], [options])`, where:

  - `seed` initial randomizer seed. Default: `Date.now()`
  - `options` object, unique to each algorithm


Library provides next PRNG algorithms:

  - [LinearCongruential](https://en.wikipedia.org/wiki/Linear_congruential_generator)

  - [LaggedFibonacci](https://en.wikipedia.org/wiki/Lagged_Fibonacci_generator)

    Options:
    - `j` lag J
    - `k` lag K

  - [MersenneTwister](https://en.wikipedia.org/wiki/Mersenne_twister)

## Running tests

```
$ npm install
$ make test
```

## License

MIT
