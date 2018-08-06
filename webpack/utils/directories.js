const { lstatSync, readdirSync } = require( 'fs' );
const { join } = require( 'path' );

const isDirectory = source => lstatSync( source ).isDirectory();
const getDirectories = source => (
	readdirSync( source ).map( name => join( source, name ) ).filter( isDirectory )
);
const getDirectoryNames = source => (
	getDirectories( source ).map( file => {
		const src = source.replace( './', '' );
		const regex = new RegExp( `${ src }\\/?` );
		return file.replace( regex, '' );
	} )
);

module.exports = { getDirectories, getDirectoryNames };
