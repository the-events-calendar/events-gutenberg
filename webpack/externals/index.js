const wpExternals = require( './wp' );
const tribeCommon = require( './tribe/common' );

module.exports = {
	...wpExternals,
	...tribeCommon,
};
