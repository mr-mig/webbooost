distdir = ./dist

all: clean md copy compile

compile:
	browserify -t coffeeify --extension=".coffee" ./src/bg/bg > $(distdir)/bg.js
	browserify -t coffeeify --extension=".coffee" ./src/page-action/page-action > $(distdir)/page-action.js

copy:
	cp ./src/page-action/*.html $(distdir)
	cp -r ./injectees $(distdir)
	cp -r ./icons $(distdir)
	cp ./manifest.json $(distdir)

md:
	mkdir -p dist/injectees $(distdir)/icons

clean:

	rm -rf $(distdir)/*

pack:
	cd $(distdir) && zip -9 -r ../webboost-$(shell cat $(distdir)/manifest.json | node -pe "JSON.parse(require('fs').readFileSync('/dev/stdin').toString()).version").zip * -x *.DS_Store*

patch: all
	./.utils/bump patch $(distdir)

minor: all
	./.utils/bump minor $(distdir)

major: all
	./.utils/bump major $(distdir)
