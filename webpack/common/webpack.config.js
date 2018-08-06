const js = require( '../module/rules/javascript' );
const styles = require( '../module/rules/styles' );
const images = require( '../module/rules/images' );
const svg = require( '../module/rules/svg' );
const wpExternals = require( '../externals/wp' );

module.exports = {
	devtool: (
		process.env.NODE_ENV === 'production'
			? 'source-map'
			: 'cheap-module-eval-source-map'
	),
	externals: wpExternals,
	output: {
		filename: './src/resources/js/[name].js',
		libraryTarget: 'this',
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
		styles.plugin,
	],
};
