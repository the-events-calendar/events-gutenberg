import { config } from '@moderntribe/common/utils/globals';
import isPlainObject from 'lodash/isPlainObject';
import flattenDeep from 'lodash/flattenDeep';

/**
 * Returns a URL that is part of the WP-JSON endpoint associated with the site where the
 * extensions is being used.
 *
 * @param {string} path The path pointing to the endpoint
 * @param {string} namespace The namespace location of the endpoint
 * @returns {string} The URL used to hit the endpoint
 */
export const endpointUrl = ( path = '', namespace = 'wp/v2' ) => {
	const tribe = config();
	const rest = tribe.rest || {};
	const { url = '' } = rest;
	const namespaces = rest.namespaces || {};
	const core = namespaces.core || namespace;
	return `${ url }${ core }${ path }`;
};

export const adminAjax = () => {
	const tribe = config();
	const adminUrl = tribe.admin_url || '';
	return `${ adminUrl }admin-ajax.php`;
};

/**
 * Encode the components from an object into an array
 *
 * @param {Object} obj The object to serialize
 * @returns {Array} An array with string on it
 */
export const encode = ( obj = {} ) => {
	return flattenDeep( Object
		.keys( obj )
		.map( ( key ) => {
			const item = obj[ key ];
			if ( isPlainObject( item ) ) {
				const children = encode( item ).join();
				const name = decodeURIComponent( `${ key }=[]` );
				return `${ name }=${ children }`;
			}
			return `${ key }=${ encodeURIComponent( item ) }`;
		} ) );
};

/**
 * Serialize an object into a string that is encoded to be sent into a request
 *
 * @param {Object} obj Object to be serializable
 * @returns {string} A string with the serializable value
 */
export const serialize = ( obj = {} ) => {
	return encode( obj ).join( '&' );
};
