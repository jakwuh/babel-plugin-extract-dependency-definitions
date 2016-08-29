const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {

    entry: './src/index',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.es5.js',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    resolve: {
        alias: {
            'di': 'di.js'
        }
    },
    externals: [nodeExternals()],
    module: {
        loaders: [{
            test: /\.js$/,
            include: [
                path.join(__dirname, 'src'),
                path.join(__dirname, 'node_modules/di.js')
            ],
            loader: 'babel'
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    }

};
