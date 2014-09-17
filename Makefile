all: clean md copy compile
	echo "Put the chrome build here"

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