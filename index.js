
module.exports = process.env.TEST_COVERAGE
  ? require('./lib-cov/index')
  : require('./lib/index')
