/**
 * External dependencies
 */
import { isObject, get as getValue } from 'lodash';

export function getOrganizers( state ) {
	const { organizers } = state;
	return organizers
		.filter( isObject )
		.map( ( item ) => item.id );
}

export function get( state, key, defaultValue ) {
	return getValue( state, key, defaultValue );
}
