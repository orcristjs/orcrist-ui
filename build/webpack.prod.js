const path = require('path');
const webpack = require('webpack');
const basePath = path.resolve(__dirname, '../');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const {
	getProjectPath,
	resolve,
	injectRequire
} = require('./utils/projectHelper');
const babelConfig = require('./getBabelCommonConfig')(false);
const pkg = require(getProjectPath('package.json'));

const svgRegex = /\.svg(\?v=\d+\.\d+\.\d+)?$/;
const svgOptions = {
	limit: 10000,
	minetype: 'image/svg+xml'
};

const devMode = process.env.NODE_ENV !== 'production';

const imageOptions = {
	limit: 10000
};

module.exports = {
	entry: './components/index.ts',
	mode: 'none',

	devtool: 'source-map',
	node: [
		'child_process',
		'cluster',
		'dgram',
		'dns',
		'fs',
		'module',
		'net',
		'readline',
		'repl',
		'tls'
	].reduce(
		(acc, name) => ({
			...acc,
			[name]: 'empty'
		}),
		{}
	),
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
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.less$/,
				// exclude: /(node_modules|bower_components)/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: resolve('less-loader'),
						options: {
							javascriptEnabled: true,
							sourceMap: true
						}
					}
				]
			},
			// Images
			{
				test: svgRegex,
				loader: 'url-loader',
				options: svgOptions
			},
			{
				test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
				loader: 'url-loader',
				options: imageOptions
			}
		]
	},
	resolve: {
		modules: ['node_modules', path.join(__dirname, '../node_modules')],
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		alias: {
			'@': path.resolve(basePath, './components'),
			[pkg.name]: process.cwd() // -> /User/.../wamuu-ui/
		},
		extensions: ['.tsx', '.ts', '.js']
	},
	externals: {
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		'react-dom': {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom'
		}
	},
	output: {
		filename: 'components.js',
		library: pkg.name,
		libraryTarget: 'umd',
		path: path.resolve(basePath, './lib')
	},
	plugins: [
		new MiniCssExtractPlugin({
			// 类似 webpackOptions.output里面的配置 可以忽略
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new CleanWebpackPlugin(),
		new webpack.BannerPlugin(`
	${pkg.name} v${pkg.version}

	Copyright 2020-present Orcrist UI.
	All rights reserved.
				`),
		new WebpackBar({
			name: `🚚  Orcrist UI : We'll fight as long as we live ~`,
			color: '#2f54eb'
		})
	],
	optimization: {}
};
