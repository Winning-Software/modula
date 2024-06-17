const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const entries = {
	modula: './src/modula.ts',
}

const appConfig = (env, options) => {
	const isProduction = options.mode === 'production';

	return {
		entry: entries,
		module: {
			rules: [
				{
					test: /\.ts?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
			],
		},
		plugins: [
		],
		optimization: isProduction ? {
			minimize: true,
			minimizer: [
				new TerserPlugin(),
			]
		} : {},
		resolve: {
			extensions: ['.ts', '.js']
		},
		watchOptions: {
			poll: true,
			ignored: /node_modules/
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist/src/'),
			library: 'modula',
			libraryTarget: 'umd',
			globalObject: 'this'
		}
	}
}

const apiConfig = (env, options) => {
	const isProduction = options.mode === 'production';

	return {
		entry: './src/api.ts',
		module: {
			rules: [
				{
					test: /\.ts?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
			]
		},
		resolve: {
			extensions: ['.ts', '.js']
		},
		externals: [nodeExternals()],
		target: 'node',
		output: {
			filename: 'api.js',
			path: path.resolve(__dirname, 'dist/src'),
			library: 'api',
			libraryTarget: 'umd',
			globalObject: 'this'
		}
	}
}

module.exports = [appConfig, apiConfig];