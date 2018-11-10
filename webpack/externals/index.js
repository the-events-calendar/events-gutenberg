const wpExternals = require( './wp' );
const vendor = require( './vendor' );
const tribeCommon = require( './tribe/common' );

module.exports = {
	...wpExternals,
	...vendor,
	...tribeCommon,
};
