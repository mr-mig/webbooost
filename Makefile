all:
    mkdir -p dist/injectees dist/icons
    browserify -t coffeeify --extension=".coffee" ./src/bg/bg > ./dist/bg.js
    browserify -t coffeeify --extension=".coffee" ./src/page-action/page-action > ./dist/page-action.js
    cp ./src/page-action/*.html ./dist
    cp -r ./injectees ./dist/injectees
    cp -r ./icons ./dist/icons
    cp ./manifest.json ./dist

    dist

dist:
    echo "Put the chrome build here"

clean:
    rm -rf dist/*