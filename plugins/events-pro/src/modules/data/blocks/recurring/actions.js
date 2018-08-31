/**
 * Internal dependencies
 */
import * as types from './types';

export const addField = ( payload ) => ( {
	type: types.ADD_RECURRING_FIELD,
	payload,
} );

export const removeField = ( id ) => ( {
	type: types.REMOVE_RECURRING_FIELD,
	payload: { id },
} );
