const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basePath = path.resolve(__dirname, '../');
const ASSET_PATH = process.env.ASSET_PATH || '/';
const devMode = process.env.NODE_ENV !== 'production';
const babelConfig = require('./getBabelCommonConfig')(false);

module.exports = {
	entry: './demo/app.tsx',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: babelConfig
					},
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				// exclude: /(node_modules|bower_components)/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: true
						}
					}
					// {
					// 	loader: 'postcss-loader',
					// 	options: {
					// 		sourceMap: true
					// 	}
					// }
				]
			},
			{
				test: /\.less$/,
				// exclude: /(node_modules|bower_components)/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: true
						}
					},
					// {
					// 	loader: 'postcss-loader',
					// 	options: {
					// 		sourceMap: true
					// 	}
					// },
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
							sourceMap: true
						}
					}
				]
			}
		]
	},
	devtool: 'source-map', //
	devServer: {
		host: '0.0.0.0', // 支持ip访问
		port: 9601,
		hot: true,
		inline: true, // ???
		compress: true, // gzip,
		contentBase: path.resolve(basePath, './lib')
	},
	resolve: {
		alias: {
			'@': path.resolve(basePath, './components')
		},
		extensions: ['.tsx', '.ts', '.js', '.jsx']
	},

	output: {
		filename: 'components.js',
		path: path.resolve(basePath, './lib'),
		publicPath: ASSET_PATH
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
		}),
		new HtmlWebpackPlugin(
			Object.assign({
				title: 'Orcrist-UI',
				inject: true,
				filename: 'index.html', // string name
				template: 'demo/index.html' // url
				// favicon: path.resolve(__dirname, '../favicon.png')
			})
		)
	],
	optimization: {}
};
