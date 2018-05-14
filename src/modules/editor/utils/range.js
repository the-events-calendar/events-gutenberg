/**
 * External dependencies
 */
import { trim, isEmpty } from 'lodash';

/**
 * Parse a string into a range type of string {a} - {b} where a and b are numbers
 *
 * @param {string} input The original string
 * @returns {string} A formatted range string.
 */
export function parser( input ) {
	const range = trim( input );

	if ( isEmpty( range ) ) {
		return range;
	}

	const chars = parseChars( input );

	if ( isEmpty( chars ) ) {
		return chars;
	}

	const [ a, b ] = extractParts( chars );

	if ( !b || b === a ) {
		return a === 0 ? '' : trim( a );
	}

	return a >= b ? `${ trim( b ) } - ${ trim( a ) }` : `${ trim( a ) } - ${ trim( b ) }`;
}

/**
 * Remove any char that is not a: number, dash, dot or comma.
 *
 * @param {string} input The string from where to extract the chars
 * @returns {string} A string with only valid chars
 */
export function parseChars( input ) {
	return input
		.split( ' ' )
		.map( ( part ) => {
			// Remove anything that is not a number a period or a dash
			return part.replace( /[^0-9.,-]/g, '' );
		} )
		.join( ' ' )
		.trim();
}

/**
 * Extract only valid numbers from the string
 *
 * @param {string} chars The chars to be split into parts.
 * @returns {array} An array with the parts
 */
export function extractParts( chars ) {
	return chars
	// Convert , into . so we can parse into numbers
		.replace( /,/g, '.' )
		.split( '-' )
		.map( ( item ) => {
			const re = /([0-9]+(.[0-9]+)?)/g;
			const result = re.exec( item.trim() );
			return null === result ? '' : result[ 1 ];
		} )
		.filter( ( item ) => !isEmpty( item ) )
		.map( ( item ) => parseFloat( item ) )
		.filter( ( item ) => !isNaN( item ) )
		.slice( 0, 2 );
}

/**
 * Test to see if an input range is free of cost
 *
 * @param {string} input Range input
 * @returns {boolean} true if the event has 0 on all parts of the range, false otherwise
 */
export function isFree( input ) {
	const parts = input.split( '-' );

	const test = parts
		.map( ( item ) => parseFloat( item ) )
		.filter( ( item ) => !isNaN( item ) )
		.filter( ( item ) => item === 0 );

	return parts.length === test.length;
}