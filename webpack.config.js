var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.resolve(__dirname, 'src/');
var BUILD_DIR = path.resolve(__dirname, 'build/');

var config = {
    entry: SRC_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
        {
            test: /(\.jsx|\.js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        }
        ]
    }
};

module.exports = config;
