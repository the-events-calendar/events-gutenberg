/**
 * Internal dependencies
 */
import * as types from './types';

export const addField = () => ( {
	type: types.ADD_RULE_FIELD,
} );

export const addRule = ( payload ) => ( {
	type: types.ADD_RULE,
	payload,
} );

export const removeField = () => ( {
	type: types.REMOVE_RULE_FIELD,
} );

export const removeRule = ( index ) => ( {
	type: types.REMOVE_RULE,
	index,
} );

export const editRule = ( index, payload ) => ( {
	type: types.EDIT_RULE,
	index,
	payload,
} );
