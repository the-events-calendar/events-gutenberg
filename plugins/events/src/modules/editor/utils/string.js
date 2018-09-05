/**
 * External dependencies
 */
import { escapeRegExp, isUndefined } from 'lodash';

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
	return validValues.indexOf( value ) !== -1;
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
	return validValues.indexOf( value ) !== -1;
}

export const replaceWithObject = ( str = '', pairs = {} ) => {
	const substrs = Object.keys( pairs ).map( escapeRegExp );
	return str.split( RegExp( `(${ substrs.join( '|' ) })` ) )
		.map( part => isUndefined( pairs[ part ] ) ? part : pairs[ part ] )
		.join( '' );
};
