
REPORTER ?= dot

all: aranta.js minify

aranta.js:
	@./node_modules/.bin/browserify \
		-s aranta \
		lib/index.js > dist/aranta.js

minify:
	@./node_modules/.bin/uglifyjs \
		dist/aranta.js \
		-o dist/aranta.min.js

test: test-unit

test-unit:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--growl

test-cov: lib-cov
	@TEST_COVERAGE=1 $(MAKE) test-unit REPORTER=html-cov > coverage.html

lib-cov: clean
	@./node_modules/.bin/jscoverage lib lib-cov

clean:
	rm -rf lib-cov
	rm -f coverage.html

.PHONY: all aranta.js minify test test-unit test-cov clean
