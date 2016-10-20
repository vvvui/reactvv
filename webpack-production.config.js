const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, './build');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const entry = {};
const entryList = ['index'];

for (const i in entryList) {
    entry[entryList[i]] = path.join(__dirname, '/src/entry/' + entryList[i] + '.js');
}

const config = {
    entry: entry,
    // devtool: 'source-map',
    output: {
        path: buildPath, // Path of output file
        publicPath: "", // static url
        filename: "[name].[chunkhash].js", // Name of output file
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new webpack.NoErrorsPlugin(),
        new TransferWebpackPlugin([
            {from: 'www'},
        ], path.resolve(__dirname, 'src')),
        new ManifestPlugin({
	        fileName:  'manifest.json'
        })
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
                loaders: ['babel-loader'],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
            },
        ],
    }
};

module.exports = config;
