/**
 * External dependencies
 */
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { resolve } = require( 'path' );
const { readdirSync } = require( 'fs' );
const { pickBy, zipObject, mapValues, mapKeys, reduce, includes } = require( 'lodash' );
const { pipe } = require( 'lodash/fp' );
const merge = require( 'webpack-merge' );
const common = require( '../../webpack/common/webpack.config' );
const { getDirectoryNames, getDirectories } = require( '../../webpack/utils/directories' );
const { generateEntries } = require( '../../webpack/entry/tribe' );
const styles = require( '../../webpack/module/rules/styles' );

const directoryNames = getDirectoryNames( resolve( __dirname, './src/modules' ) );
const PLUGIN_SCOPE = 'events';

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
	},
	resolve: {
		alias: {
			icons: resolve( __dirname, 'src/resources/icons' ),
		},
	},
} );

//
// ──────────────────────────────────────────────────────────────────────────────────────────── II ──────────
//   :::::: G E N E R A T E   S T Y L E S   F R O M   V I E W S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────────
//

const stylePath = resolve( __dirname, './src/styles' );
const styleDirectories = getDirectories( stylePath );
const styleDirectoryNames = getDirectoryNames( stylePath );
const styleEntries = zipObject( styleDirectoryNames, styleDirectories );

const hasFile = ( file ) => pipe(
	entryPath => readdirSync( entryPath ),
	filenames => includes( filenames, file )
);

const removeExtension = ( str ) => str.slice( 0, str.lastIndexOf( '.' ) );

const getEntries = ( file ) => pipe(
	fileEntries => pickBy( fileEntries, hasFile( file ) ),
	validEntries => mapValues( validEntries, path => `${ path }/${ file }` ),
	entries => mapKeys( entries, ( _, entry ) => `${ entry }/${ removeExtension( file ) }` )
);

const entries = {
	...getEntries( 'backend.js' )( styleEntries ),
	...getEntries( 'frontend.js' )( styleEntries ),
};

const styleConfig = merge( common, {
	entry: entries,
	output: {
		path: __dirname,
	},
} );

//
// ─── EXPORT CONFIGS ─────────────────────────────────────────────────────────────
//

module.exports = [
	config,
	styleConfig,
];
