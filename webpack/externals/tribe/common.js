const pickBy = require( 'lodash/pickBy' );

// Little messy but no reason to recalculate common entries when it's already been done
const config = require( '../../../plugins/common/webpack.config.js' );

module.exports = pickBy( config.externals, ( v, k ) => /@tribe\/common/.test( k ) );
