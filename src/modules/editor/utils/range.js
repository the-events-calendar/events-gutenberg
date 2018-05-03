/**
 * External dependencies
 */
import { trim, isEmpty } from 'lodash';

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
	if ( ! b ) {
		return trim( a );
	}

	return a >= b ? `${ trim( b ) } - ${ trim( a ) }` : `${ trim( a ) } - ${ trim( b ) }`;
}

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
		.filter( ( item ) => ! isEmpty( item ) )
		.map( ( item ) => parseFloat( item ) )
		.filter( ( item ) => ! isNaN( item ) )
		.slice( 0, 2 );
}
