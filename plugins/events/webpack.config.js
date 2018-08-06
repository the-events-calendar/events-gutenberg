/**
 * External dependencies
 */
const { resolve } = require( 'path' );
const merge = require( 'webpack-merge' );
const common = require( '../../webpack/common/webpack.config' );
const { getDirectoryNames } = require( '../../webpack/utils/directories' );
const { generateExternals } = require( '../../webpack/externals/tribe/generate' );
const { generateEntries } = require( '../../webpack/entry/tribe' );

const directoryNames = getDirectoryNames( resolve( __dirname, './src/modules' ) );
const PLUGIN_SCOPE = 'events';

const config = merge( common, {
	entry: generateEntries( __dirname, directoryNames ),
	externals: generateExternals( PLUGIN_SCOPE, directoryNames ),
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
