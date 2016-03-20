distdir = ./dist
TEST_RUNNER_BIN = ./node_modules/mocha/bin/mocha

all: clean md copy compile

compile:
	browserify -t coffeeify --extension=".coffee" ./src/bg/bg > $(distdir)/bg.js
	browserify -t coffeeify --extension=".coffee" ./src/browser-action/popup > $(distdir)/popup.js

copy:
	cp ./src/browser-action/*.html $(distdir)
	cp -r ./injectees $(distdir)
	cp -r ./icons $(distdir)
	cp ./manifest.json $(distdir)

md:
	mkdir -p dist/injectees $(distdir)/icons

clean:

	rm -rf $(distdir)/*

pack: all
	cd $(distdir) && zip -9 -r ../releases/webboost-$(shell cat $(distdir)/manifest.json | node -pe "JSON.parse(require('fs').readFileSync('/dev/stdin').toString()).version").zip * -x *.DS_Store*

patch:
	./.utils/bump patch ./

minor:
	./.utils/bump minor ./

major:
	./.utils/bump major ./

test:
	@${TEST_RUNNER_BIN} --compilers coffee:coffee-script/register tests/*.coffee

tdd:
	@${TEST_RUNNER_BIN} -w --compilers coffee:coffee-script/register tests/*.coffee
