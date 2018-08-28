const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const plugin = () => new MiniCssExtractPlugin( {
	filename: 'src/resources/css/[name].css',
} );

const loaders = [
	MiniCssExtractPlugin.loader,
	{ loader: 'css-loader', options: { importLoaders: 1 } },
	{ loader: 'postcss-loader' },
];

module.exports = {
	plugin,
	loaders,
	rule: {
		test: /\.(p?css)$/,
		use: loaders,
	},
};
