/**
 * External dependencies
 */
const { resolve } = require( 'path' );
const merge = require( 'webpack-merge' );
const common = require( '../../webpack/common/webpack.config' );
const wpExternals = require( '../../webpack/externals/wp.js' );
const { getDirectoryNames } = require( '../../webpack/utils/directories' );
const { generateEntries } = require( '../../webpack/entry/tribe' );

const directoryNames = getDirectoryNames( resolve( __dirname, './src/modules' ) );
const PLUGIN_SCOPE = 'common';

const config = merge.strategy( {
	externals: 'replace',
} )(
	common,
	{
		externals: [ wpExternals ], // Only use WP externals
		entry: generateEntries( __dirname, directoryNames ),
		output: {
			path: __dirname,
			library: [ 'tribe', PLUGIN_SCOPE, '[name]' ],
		},
	}
);

module.exports = config;
