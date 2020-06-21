source = ./src
distdir = ./dist

all: clean md copy compile

compile:
	npm run build

copy:
	cp -r ./injectees $(distdir)/injectees
	cp -r ./icons $(distdir)
	cp ./manifest.json $(distdir)
	cp $(source)/bg.html $(distdir)
	cp $(source)/popup.html $(distdir)

md:
	mkdir -p dist/injectees $(distdir)/icons

clean:
	rm -rf $(distdir)/*

pack: all
	cd $(distdir) && zip -9 -r ../releases/webboost-$(shell cat $(distdir)/manifest.json | node -pe "JSON.parse(require('fs').readFileSync('/dev/stdin').toString()).version").zip * -x *.DS_Store*

patch:
	./.utils/bump.ts patch ./

minor:
	./.utils/bump.ts minor ./

major:
	./.utils/bump.ts major ./

test:
	npm test

tdd:
	npm run tdd

