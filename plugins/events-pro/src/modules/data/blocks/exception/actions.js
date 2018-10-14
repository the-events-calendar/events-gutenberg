/**
 * Internal dependencies
 */
import * as types from './types';

export const addField = () => ( {
	type: types.ADD_EXCEPTION_FIELD,
} );

export const addException = ( payload ) => ( {
	type: types.ADD_EXCEPTION,
	payload,
} );

export const removeField = () => ( {
	type: types.REMOVE_EXCEPTION_FIELD,
} );

export const removeException = ( index ) => ( {
	type: types.REMOVE_EXCEPTION,
	index,
} );

export const editException = ( index, payload ) => ( {
	type: types.EDIT_EXCEPTION,
	index,
	payload,
} );
