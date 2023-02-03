const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
                
            },
            { test: /\.ts$/i, use: 'ts-loader' },
            {
                test: /\.(jpg|svg|png|jpeg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                    },
            },
        ],
    },
    resolve: {
        extensions: ['.js','.ts'],
    },
    output: {
        //filename: 'index.js',
        filename: filename("js/", ".js"),
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslintPlugin({ extensions: 'ts' }),
        new CopyWebpackPlugin ({
            patterns: [
                { from: 'src/assets', to: 'assets' }
        ]
        }),
        new MiniCssExtractPlugin({
            filename: `[name].css`,
        }),
    ]
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');
    return merge(baseConfig, envConfig);
};
