/**
 * External dependencies
 */
import { setupCreateReducer } from '@nfen/redux-reducer-injector';

/**
 * Internal dependencies
 */
import plugins from './plugins';

export default setupCreateReducer( {
	plugins,
} );
