/**
 * External dependencies
 */
import { get as getValue } from 'lodash';

export function getDetails( state, id ) {
	return state.details;
}

export function get( state, key, defaultValue ) {
	return getValue( state, key, defaultValue );
}
