const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// const ESLintPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].[fullhash].js"
    },
    mode:"development",
    resolve: {
        extensions: ['.ts','.js']
    },
    // optimization: {
    //     minimize: true
    // },
    module: {
        rules:[
            {
                test: /\.ts$/i,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(webp|png|jpe?g|gif|svg|mp3|ogg|mp4|weba|woff2?|eot|ttf|otf)$/,
                loader: "file-loader",
                options:{
                    name:'[path][name].[ext]',
                    context: 'public'
                }
            },
            {
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader:'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            title: "PIXI Training",
            inject: "body",
            meta:{
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
            }
        }),
        new CopyPlugin({
            patterns: [{
                from: './src/assets/',
                to: './assets'
            }]
        }),
        new webpack.ProgressPlugin(),
    ],
    // devtool: 'source-map',
    devServer: {
        open:true,
        disableHostCheck:true,
        port: 8080,
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        }
    }
}