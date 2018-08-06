/**
 * External dependencies
 */
const merge = require( 'webpack-merge' );
const common = require( '../../webpack/common/webpack.config' );
const { getDirectoryNames } = require( '../../webpack/utils/directories' );
const { generateExternals } = require( '../../webpack/externals/tribe' );
const { generateEntries } = require( '../../webpack/entry/tribe' );

const directoryNames = getDirectoryNames( './src/modules' );
const PLUGIN_SCOPE = 'common';

const config = merge( common, {
	entry: generateEntries( __dirname, directoryNames ),
	externals: generateExternals( PLUGIN_SCOPE, directoryNames ),
	output: {
		path: __dirname,
		library: [ 'tribe', PLUGIN_SCOPE, '[name]' ],
	},
} );

module.exports = config;
