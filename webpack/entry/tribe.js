const { resolve } = require( 'path' );

const generateEntries = ( source, directoryNames ) => (
	directoryNames.reduce( ( result, directory ) => {
		result[ directory ] = resolve( source, `src/modules/${ directory }/index.js` );
		return result;
	}, {} )
);

module.exports = { generateEntries };
