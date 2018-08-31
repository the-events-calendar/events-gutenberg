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

export const removeRule = ( id ) => ( {
	type: types.REMOVE_RULE,
	payload: { id },
} );
