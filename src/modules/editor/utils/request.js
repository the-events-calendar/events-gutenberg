/**
 * Extract the headers from an XHR request object.
 *
 * @param {object} xhr Ajax object
 * @returns {object} key / value pairs: key is the name of the header
 */
export function getResponseHeaders( xhr ) {
	return xhr.getAllResponseHeaders().trim()
		// Split the headers on Carry Return  or New Line
		.split( '\u000d\u000a' )
		// Create an array of key/value pais separated by: ; or space
		.map( ( entry ) => entry.split( '\u003a\u0020' ) )
		// Crate a single objects with key / value pairs
		.reduce( ( headers, values ) => {
			if ( values.length === 2 ) {
				const [ key, value ] = values;
				headers[ key ] = value;
			}
			return headers;
		}, {} );
}

export function apiArgs( args = {} ) {
	const DEFAULT = {
		per_page: 10,
		orderby: 'title',
		status: [ 'draft', 'publish' ],
		order: 'asc',
		page: 1,
	};

	return {
		...DEFAULT,
		...args,
	};
}
