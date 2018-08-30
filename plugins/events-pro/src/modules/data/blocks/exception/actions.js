/**
 * Internal dependencies
 */
import * as types from './types';

export const addField = ( payload ) => ( {
	type: types.ADD_EXCEPTION_FIELD,
	payload,
} );

export const removeField = ( id ) => ( {
	type: types.REMOVE_EXCEPTION_FIELD,
	payload: { id },
} );
