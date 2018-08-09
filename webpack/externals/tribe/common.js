const { getDirectoryNames } = require( '../../utils/directories' );
const { resolve } = require( 'path' );

const directories = getDirectoryNames(
	resolve( __dirname, '../../../plugins/common/src/modules' )
);

const generateExternals = ( entries ) => (
	entries.reduce(
		( result, entry ) => {
			result[ `@moderntribe/common/${ entry }` ] = {
				var: `tribe.common.${ entry }`,
				root: [ 'tribe', 'common', entry ],
			};
			return result;
		},
		{}
	)
);

module.exports = {};
