const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const plugin = new MiniCssExtractPlugin( {
	filename: 'src/resources/css/[name].css',
} );

const loaders = [
	process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : null,
	{ loader: 'css-loader', options: { importLoaders: 1 } },
	{
		loader: 'postcss-loader',
		options: {
			ident: 'postcss',
			plugins: ( loader ) => [
				require( 'postcss-import' )( { root: loader.resourcePath } ),
				require( 'postcss-cssnext' ),
				require( 'postcss-nested' ),
				require( 'postcss-mixins' ),
				require( 'postcss-hexrgba' ),
				require( 'css-mqpacker' ),
			],
		},
	},
];

module.exports = {
	plugin,
	rule: {
		test: /\.(p?css)$/,
		use: loaders,
	},
};
