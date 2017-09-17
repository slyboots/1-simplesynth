import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as HtmlWebpackTemplate from "html-webpack-template";

// const HtmlWebpackPlugin = require('html-webpack-plugin');

declare var __dirname: any;

HtmlWebpackTemplate
const config: webpack.Configuration = {
    entry: path.resolve(__dirname, "src", "index.ts"),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Slyboots Simple Synth',
            inject: false,
            template: HtmlWebpackTemplate,
            favicon: "",
            cache: true,
            devServer: "http://localhost:3000"
        } as HtmlWebpackTemplate.Options)
    ],
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    }
};

export default config;