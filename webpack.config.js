let path = require('path');


let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: ['@babel/polyfill', './src/js/Controller/index.js'],

    output: {
      
        path: path.resolve(__dirname, 'dist'),
      
        filename: 'js/bundle.js'
      },

		plugins: [
				new HtmlWebpackPlugin({
					filename: 'index.html',
					template: './src/index.html'
				})
			],
		devServer: {
				     contentBase: './dist'
				  },	

		module: {
			rules: [
				{

					test: /\.js$/,
					exclude: /node_modules/,
					use: 'babel-loader'

							
				}
			]
		}

};