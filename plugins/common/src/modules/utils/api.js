import { config } from '@moderntribe/common/utils/globals';

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
