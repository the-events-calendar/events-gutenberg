const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const isProduction = process.env.NODE_ENV === 'production';
const postfix = isProduction ? 'min.css' : 'css';

const plugin = () => new MiniCssExtractPlugin( {
	filename: `src/resources/css/app/[name].${postfix}`,
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
