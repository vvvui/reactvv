const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, '../build');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const entry = {
    0: 'webpack/hot/dev-server',
    1: 'webpack/hot/only-dev-server'
};

const entryList = ['index'];

for (const i in entryList) {
    entry[entryList[i]] = path.join(__dirname, '/src/entry/' + entryList[i] + '.js');
}

const config = {
// Entry points to the project
    entry: entry,
    devServer: {
        contentBase: 'src/www',
        devtool: 'eval',
        hot: true,
        inline: true,
        port: 8000,
        host: '192.168.13.135',
    },
    devtool: 'eval',
    output: {
        path: buildPath,
        filename: "[name].js",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, 'src')),
    ],
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
                loader: "file-loader",
                query: {name: "[name].[hash].[ext]"}
            },
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel-loader'],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
            },
        ],
    },
};

module.exports = config;
