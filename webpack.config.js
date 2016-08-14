var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
	entry:[
		'./js/controller.js'
	],
	output: {
		path: __dirname ,
		filename: 'bundle.js'
	},
	//plugins: [HTMLWebpackPluginConfig]
}