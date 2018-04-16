/**
 * Extract the heeaders from an XHR request object.
 *
 * @param xhr Ajax object
 * @returns object with key / value pairs: key is the name of the header and the value represents the header value
 */
export function getResponseHeaders( xhr ) {
	return xhr.getAllResponseHeaders().trim()
		// Split the headers on Carry Return  or New Line
		.split( '\u000d\u000a' )
		// Create an array of key/value pais separated by: ; or space
		.map( ( entry ) => entry.split( '\u003a\u0020' ) )
		// Crate an array of objects with key / value pairs
		.map( (values) => {
			if ( values.length === 2 ) {
				const [ key, value ] = values;
				const header = {};
				header[ key ] = value;
				return header;
			}
		})
		// Merge arrays into a single object.
		.reduce( (previousValue, currentValue) => {
			return Object.assign({}, previousValue, currentValue);
		}, {} );
}