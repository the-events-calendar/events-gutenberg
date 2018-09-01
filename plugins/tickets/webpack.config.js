/**
 * External dependencies
 */
const { resolve } = require( 'path' );
const { reduce, zipObject } = require( 'lodash' );
const merge = require( 'webpack-merge' );
const common = require( '../../webpack/common/webpack.config' );
const { getDirectoryNames, getDirectories } = require( '../../webpack/utils/directories' );
const { getJSFileNames, getJSFiles } = require( '../../webpack/utils/files' );
const { generateEntries } = require( '../../webpack/entry/tribe' );

const directoryNames = getDirectoryNames( resolve( __dirname, './src/modules' ) );
const PLUGIN_SCOPE = 'tickets';

//
// ────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: G E N E R A T E   E V E N T S   P L U G I N : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────
//

const config = merge( common, {
	entry: generateEntries( __dirname, directoryNames ),
	output: {
		path: __dirname,
		library: [ 'tribe', PLUGIN_SCOPE, '[name]' ],
	}
} );

//
// ─── EXPORT CONFIGS ─────────────────────────────────────────────────────────────
//

module.exports = [
	config
];
