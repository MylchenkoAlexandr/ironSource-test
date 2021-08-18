const path = require( "path" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.join( __dirname, "/build" ),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [ "babel-loader" ]
			},
			{
				test: /\.css$/,
				use: [ "style-loader", "css-loader" ]
			},
			{
				test: /\.scss$/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: { limit: 5000 }
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin( {
			template: "./src/index.html"
		} )
	]
};
