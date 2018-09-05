/**
 * External dependencies
 */
import { escapeRegExp, isUndefined } from 'lodash';

/**
 * Internal dependencies
 */
import { hasAnyOf } from '@moderntribe/events/editor/utils/array';

/**
 * Test if a string is equivalent to a true value
 *
 * @param {string} value The value to be tested
 * @returns {boolean} true if the value is a valid "true" value.
 */
export function isTruthy( value ) {
	const validValues = [
		'true',
		'yes',
		'1',
	];
	return hasAnyOf( validValues, value );
}

/**
 * Test if a string is equivalent to a false value
 *
 * @param {string} value The value to be tested
 * @returns {boolean} true if the value is a valid "false" value.
 */
export function isFalsy( value ) {
	const validValues = [
		'false',
		'no',
		'0',
		'',
	];
	return hasAnyOf( validValues, value );
}

export const replaceWithObject = ( str = '', pairs = {} ) => {
	const substrs = Object.keys( pairs ).map( escapeRegExp );
	return str.split( RegExp( `(${ substrs.join( '|' ) })` ) )
		.map( part => isUndefined( pairs[ part ] ) ? part : pairs[ part ] )
		.join( '' );
};

/**
 * Generate a label with singular, plural values based on the count provided, the function
 * returns a fallback value (`undefined`) by default when the value is either 0 or lower.
 *
 * Labels need to have a %d on it where the number will be replaced
 *
 * @param {int} count The amount to be compared
 * @param {string} singular The label for the singular case
 * @param {string} plural The label for the plural case
 * @param {*} fallback The value to be returned if count is zero or negative
 * @returns {*} return fallback if count is zero or negative otherwise singular or plural
 */
export const numericLabel = ( { count = 0, singular = '', plural = '', fallback } ) => {
	if ( count <= 0 ) {
		return fallback;
	}
	const regex = /%d/gi;
	const targetStr = count === 1 ? singular : plural;
	return targetStr.replace( regex, count );
}
