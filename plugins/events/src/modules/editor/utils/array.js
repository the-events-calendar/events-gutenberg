/**
 * Look if a value is present inside of an array.
 *
 * @param {array} collection Collection where to look for
 * @param {*} value The value being search
 * @returns {boolean} true if the value exists in collection
 */
export function hasAnyOf( collection, value ) {
	const search = collection.filter( ( item ) => item === value );
	return search.length > 0;
}
