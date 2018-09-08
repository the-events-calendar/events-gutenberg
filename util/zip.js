var fs = require('fs');
var archiver = require('archiver');

const json          = JSON.parse( fs.readFileSync( 'package.json' ) );
const zip_whitelist = JSON.parse( fs.readFileSync( 'package-whitelist.json' ) );

// create a file to stream archive data to.
var output = fs.createWriteStream( '/tmp/' + json._zipname + '.' + json.version + '.zip' );
var archive = archiver( 'zip', {
	zlib: { level: 9 } // Sets the compression level.
} );

output.on( 'close', function () {
	console.log( archive.pointer() + ' total bytes' );
	console.log( 'archiver has been finalized and the output file descriptor has closed.' );
} );

archive.on( 'error', function(err) {
	throw err;
} );

archive.pipe(output);

zip_whitelist.forEach( function( file ) {
	if ( '/' === file.slice( -1 ) ) {
		archive.directory( file, file );
		return;
	}

	archive.glob( file );
} );

archive.finalize();