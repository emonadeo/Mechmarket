const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ThemePlugin = require('./src/util/theme-plugin');

const PROD = process.env.NODE_ENV === 'production';
const PUBLIC_PATH = PROD ? '/Mechmarket' : '/';

module.exports = {
    mode: PROD ? 'production' : 'development',
    entry: [path.resolve(__dirname, './src/app.js')],
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        quiet: true,
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: PUBLIC_PATH,
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
            themes: path.resolve(__dirname, './src/themes'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                indentedSyntax: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|woff2|otf)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                },
            },
        ],
    },
    optimization: {
        minimize: PROD,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new ThemePlugin(path.resolve(__dirname, './src/themes')),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
        }),
        new HtmlWebpackPlugin({
            filename: '404.html',
            template: path.resolve(__dirname, './src/index.html'),
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin(),
        new ESLintPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ['You application is running here: http://localhost:8080/'],
            },
        }),
    ],
};
