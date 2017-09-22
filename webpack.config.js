const path = require('path');

module.exports = {
    entry: './src/js/app.js',
    // entry: './src/js/services/listName-service.js', // test
    output: {
        path: path.resolve(__dirname, './src/dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};
