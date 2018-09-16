/**
 * External dependencies
 */
import { setupCreateReducer } from '@nfen/redux-reducer-injector';

/**
 * Internal dependencies
 */
import plugins from './plugins';
import ui from './ui';

export default setupCreateReducer( {
	plugins,
	ui,
} );
