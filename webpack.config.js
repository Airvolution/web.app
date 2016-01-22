var webpack = require('webpack');
module.exports = {
    entry: "./app.ts",
    output: {
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['','webpack.js','.web.js','.js','.ts']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {test: /\.ts/, loader: 'ts-loader'}
        ]
    }

};