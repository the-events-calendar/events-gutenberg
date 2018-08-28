const { lstatSync, readdirSync } = require( 'fs' );
const { join } = require( 'path' );

const isFile = source => lstatSync( source ).isFile();
const getFiles = source => (
	readdirSync( source ).map( name => join( source, name ) ).filter( isFile )
);
const getFileNames = source => (
	getFiles( source ).map( file => {
		return file.replace( /^.*\//, '' );
	} )
);

const isJS = source => source.endsWith( '.js' );
const getJSFiles = source => getFiles( source ).filter( isJS );
const getJSFileNames = source => getFileNames( source ).filter( isJS );

module.exports = {
	getFiles,
	getFileNames,
	getJSFiles,
	getJSFileNames,
};
