all: clean md copy compile

compile:
	browserify -t coffeeify --extension=".coffee" ./src/bg/bg > ./dist/bg.js
	browserify -t coffeeify --extension=".coffee" ./src/page-action/page-action > ./dist/page-action.js

copy:
	cp ./src/page-action/*.html ./dist
	cp -r ./injectees ./dist
	cp -r ./icons ./dist
	cp ./manifest.json ./dist

md:
	mkdir -p dist/injectees dist/icons

clean:

	rm -rf dist/*

pack:
	./.utils/zip webboost.zip dist

patch: all
	./.utils/bump patch dist

minor: all
	./.utils/bump minor dist

major: all
	./.utils/bump major dist
