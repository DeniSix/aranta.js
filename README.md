# Aranta.js

Simple and flexible randomization framework.

[![Build Status](https://travis-ci.org/DeniSix/aranta.js.png)](https://travis-ci.org/DeniSix/aranta.js)

[Online demo](http://jsfiddle.net/DeniSix/g38sA/show/)

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

```html
<script type="text/javascript" src="dist/aranta.js"></script>
<script type="text/javascript">
  var random = new aranta.Random(new aranta.Algo.LinearCongruential())
  console.log(random.int())
</script>
```

or you can use it with [RequireJS](http://www.requirejs.org/), [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) and
[LMD](https://github.com/azproduction/lmd) (i love it :kissing_closed_eyes:).
For more info see how [Browserify](http://browserify.org/) works.

## Random

The main class for usage in your apps.

  - `.constructor(algo)` Create new `Random` instance with specified algorithm.
  - `.int([max])` Get random integer on interval [0, max]. Default `max`: 0xffffffff.
  - `.float()` Get random float value on interval [0.0, 1.0].
  - `.bool([chance])` Get random boolean value with specified probability. Default `chance`: 50.
  - `.reset([seed])` Reset generator state with optional `seed`.

## Algorithms

All algos have identical consrtuctors with optional parameters:

`.constructor([seed], [options])`, where:

  - `seed` initial randomizer seed. Default: `Date.now()`
  - `options` object, unique to each algorithm


Library provides next PRNG algorithms:

  - [LinearCongruential](https://en.wikipedia.org/wiki/Linear_congruential_generator)

    Options:
    - `multiplier`
    - `increment`

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


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/DeniSix/aranta.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

