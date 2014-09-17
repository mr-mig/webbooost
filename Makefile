all:
    mkdir -p dist
    browserify -t coffeeify --extension=".coffee" ./src/bg/bg > ./dist/bg.js
    browserify -t coffeeify --extension=".coffee" ./src/page-action/page-action > ./dist/page-action.js
    cp ./src/page-action/*.html ./dist

dist:

clean:
    rm -rf dist/*