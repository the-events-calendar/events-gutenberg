/**
 * Internal dependencies
 */
import * as types from './types';

export const addPlugin = ( name ) => ( {
	type: types.ADD_PLUGIN,
	payload: {
		name,
	},
} );

export const removePlugin = ( name ) => ( {
	type: types.REMOVE_PLUGIN,
	payload: {
		name,
	},
} );

export const activatePlugin = ( name ) => ( {
	type: types.ACTIVATE_PLUGIN,
	payload: {
		name,
	},
} );

export const deactivatePlugin = ( name ) => ( {
	type: types.DEACTIVATE_PLUGIN,
	payload: {
		name,
	},
} );
