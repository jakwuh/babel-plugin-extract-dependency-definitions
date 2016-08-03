const path = require('path');

module.exports = {

    entry: './src/index',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.es5.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        fs: 'commonjs fs'
    },

    resolve: {
        alias: {
            'di': 'di.js'
        }
    },
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
