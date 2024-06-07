const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const entries = {
	modula: './src/modula.ts',
}

module.exports = (env, options) => {
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