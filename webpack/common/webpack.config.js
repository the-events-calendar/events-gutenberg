const js = require( '../module/rules/javascript' );
const styles = require( '../module/rules/styles' );
const images = require( '../module/rules/images' );
const svg = require( '../module/rules/svg' );
const externals = require( '../externals' );

module.exports = {
	devtool: (
		process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map'
	),
	externals,
	output: {
		filename: './src/resources/js/[name].js',
		libraryTarget: 'var',
	},
	module: {
		rules: [
			js,
			styles.rule,
			images,
			svg,
		],
	},
	plugins: [
		styles.plugin(),
	],
};
