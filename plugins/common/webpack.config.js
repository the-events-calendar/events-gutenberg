/**
 * External dependencies
 */
const { resolve } = require( 'path' );
const merge = require( 'webpack-merge' );
const common = require( '../../webpack/common/webpack.config' );
const wpExternals = require( '../../webpack/externals/wp.js' );
const vendor = require( '../../webpack/externals/vendor.js' );
const { getDirectoryNames } = require( '../../webpack/utils/directories' );
const { generateEntries } = require( '../../webpack/entry/tribe' );

const directoryNames = getDirectoryNames( resolve( __dirname, './src/modules' ) );
const PLUGIN_SCOPE = 'common';

const vendorEntries = Object.keys( vendor );
const vendorChunk = new RegExp( `(${ vendorEntries.join( '|' ) })` );

const config = merge.strategy( {
	externals: 'replace',
} )(
	common,
	{
		externals: { ...wpExternals, ...vendor },
		entry: {
			...generateEntries( __dirname, directoryNames ),
			vendor: Object.keys( vendor ),
		},
		output: {
			path: __dirname,
			library: [ 'tribe', PLUGIN_SCOPE, '[name]' ],
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: vendorChunk,
						name: 'vendor',
						chunks: 'all',
					},
				},
			},
		},
	}
);

module.exports = config;
