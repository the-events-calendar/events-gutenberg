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
export const isTruthy = ( value ) => {
	const validValues = [
		'true',
		'yes',
		'1',
	];
	return validValues.indexOf( value ) !== - 1;
};

/**
 * Test if a string is equivalent to a false value
 *
 * @param {string} value The value to be tested
 * @returns {boolean} true if the value is a valid "false" value.
 */
export const isFalsy = ( value ) => {
	const validValues = [
		'false',
		'no',
		'0',
		'',
	];
	return validValues.indexOf( value ) !== - 1;
};

export const replaceWithObject = ( str = '', pairs = {} ) => {
	const substrs = Object.keys( pairs ).map( escapeRegExp );
	return str.split( RegExp( `(${ substrs.join( '|' ) })` ) )
		.map( part => isUndefined( pairs[ part ] ) ? part : pairs[ part ] )
		.join( '' );
};

/**
 * Interpolate any number of %d on number values
 *
 * @param {string} str The input with the placeholders
 * @param {number} params Any list of numbers to replace with placeholders
 * @returns {string} The updated string
 */
export const interpolateNumbers = ( str = '', ...params ) => {
	const [ number, ...remaining ] = params;

	const position = str.indexOf( '%d' );
	if ( position === -1 || params.length === 0 ) {
		return str;
	}

	const chars = str.split( '' );
	if ( chars[ position ] === '%' && chars[ position + 1 ] === 'd' ) {
		// Remove %d at start of % + 2 steps until d and insert number on it's place.
		chars.splice( position, 2, number );
		return interpolateNumbers( chars.join( '' ), ...remaining );
	} else {
		return chars.join( '' );
	}
};
