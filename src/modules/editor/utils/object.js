import { pickBy, isString, isEmpty, mapValues, transform, isEqual, isObject } from 'lodash';
import { isTruthy, isFalsy } from './string';

export function removeEmptyStrings( object ) {
	return pickBy( object, ( item ) => {
		// Return any object that is not a string
		if ( ! isString( item ) ) {
			return true;
		}

		// Return only values that are not empty
		return ! isEmpty( item );
	} );
}

export function castBooleanStrings( object ) {
	return mapValues( object, ( value ) => {
		if ( ! isString( value ) ) {
			return value;
		}

		const falsy = isFalsy( value );
		const truthy = isTruthy( value );

		// We just return the truthy value as if "truthy" is false "falsy" is true which means the
		// string should be converted into false value, otherwise just return regular value
		return ( falsy || truthy ) ? truthy : value;
	} );
}

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function diff( object, base ) {
	return changes( object, base );
}

function changes( object, base ) {
	return transform( object, ( result, value, key ) => {
		if ( ! isEqual( value, base[ key ] ) ) {
			const isAnObject = isObject( value ) && isObject( base[ key ] );
			result[ key ] = isAnObject ? changes( value, base[ key ] ) : value;
		}
	} );
}
