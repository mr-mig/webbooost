distdir = ./dist
compiled = ./.tmp

all: clean md compile copy

compile:
	npm build

copy:
	cp $(compiled)/bg/bg.js $(distdir)/bg.js
	cp $(compiled)/browser-action/popup.js $(distdir)/popup.js
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
	npm test

tdd:
	npm run tdd

