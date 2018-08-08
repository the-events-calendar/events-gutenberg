const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const plugin = new MiniCssExtractPlugin( {
	filename: 'src/resources/css/[name].css',
} );

const loaders = [
	{ loader: 'css-loader', options: { importLoaders: 1 } },
	{ loader: 'postcss-loader'	},
];

if ( process.env.NODE_ENV === 'production' ) {
	loaders.unshift( MiniCssExtractPlugin.loader );
}

module.exports = {
	plugin,
	loaders,
	rule: {
		test: /\.(p?css)$/,
		use: loaders,
	},
};
