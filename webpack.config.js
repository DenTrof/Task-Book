const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const outputPath = path.resolve(__dirname, './dist')

const webpackConfig = {
	entry: {
		app: [
			'react-hot-loader/patch',
			path.resolve(__dirname, './src/index.js')
		]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js'
	},
	module: {
		rules: [

			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(scss|css)$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader',
					// 'sass-loader'
				]
			},
			{
				test: /\.(gif|png|jpg|jpeg|svg)$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, './src/assets/'),
				use: 'url-loader'
			}
		]
	},
	resolve: {
		alias: {
			'components': path.resolve(__dirname, './src/components'),
			'containers': path.resolve(__dirname, './src/containers'),
			'assets': path.resolve(__dirname, './src/assets')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/assets/index.html'),
			filename: 'index.html',
			path: outputPath
		}),
		//new webpack.NamedModulesPlugin(),
		//new webpack.HotModuleReplacementPlugin()
	],

}

module.exports = webpackConfig