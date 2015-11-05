Compile code

node_modules/.bin/browserify src/index.js -o dist/bundle.js -t [ babelify --presets [ es2015 ] ] -v --debug
