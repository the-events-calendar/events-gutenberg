/**
 * External dependencies
 */
const { resolve } = require( 'path' );
const merge = require( 'webpack-merge' );
const common = require( '../../webpack/common/webpack.config' );
const { getDirectoryNames } = require( '../../webpack/utils/directories' );
const { generateEntries } = require( '../../webpack/entry/tribe' );

const directoryNames = getDirectoryNames( resolve( __dirname, './src/modules' ) );
const PLUGIN_SCOPE = 'common';

const config = merge( common, {
	entry: generateEntries( __dirname, directoryNames ),
	output: {
		path: __dirname,
		library: [ 'tribe', PLUGIN_SCOPE, '[name]' ],
	},
	resolve: {
		alias: {
			icons: resolve( __dirname, 'src/resources/icons' ),
		},
	},
} );

module.exports = config;
